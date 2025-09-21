from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import base64
from PIL import Image
import io
import pickle
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pest detection model and metadata
model = None
class_names = None

def load_model():
    global model, class_names
    
    try:
        # Load the TensorFlow model
        model_path = 'models/pest_model.h5'
        if os.path.exists(model_path):
            model = tf.keras.models.load_model(model_path)
            print("✅ Pest detection model loaded successfully")
        else:
            print("❌ Model file not found")
            return False
            
        # Load metadata
        metadata_path = 'models/pest_model_metadata.pkl'
        if os.path.exists(metadata_path):
            with open(metadata_path, 'rb') as f:
                metadata = pickle.load(f)
                class_names = metadata.get('class_names', [
                    'aphid', 'armyworm', 'beetle', 'caterpillar', 'grasshopper',
                    'leafhopper', 'mite', 'thrips', 'whitefly', 'healthy'
                ])
            print("✅ Metadata loaded successfully")
        else:
            # Default class names if metadata not found
            class_names = [
                'aphid', 'armyworm', 'beetle', 'caterpillar', 'grasshopper',
                'leafhopper', 'mite', 'thrips', 'whitefly', 'healthy'
            ]
            print("⚠️ Using default class names")
            
        return True
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return False

def preprocess_image(base64_image):
    """Preprocess the base64 image for the model"""
    try:
        # Remove data URL prefix if present
        if ',' in base64_image:
            base64_image = base64_image.split(',')[1]
        
        # Decode base64 image
        image_data = base64.b64decode(base64_image)
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize to 128x128 (model input size)
        image = image.resize((128, 128))
        
        # Convert to numpy array and normalize
        image_array = np.array(image) / 255.0
        
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        
        return image_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        raise e

def get_pest_advice(pest_name):
    """Get advice based on detected pest"""
    advice_database = {
        'aphid': {
            'severity': 'moderate',
            'description': 'Small, soft-bodied insects that feed on plant sap, causing yellowing and stunted growth.',
            'prevention': [
                'Use reflective mulches to deter aphids',
                'Introduce beneficial insects like ladybugs',
                'Keep plants healthy with proper watering',
                'Remove weeds that can harbor aphids'
            ],
            'treatment': [
                'Spray with neem oil solution',
                'Use insecticidal soap',
                'Apply diatomaceous earth around plants',
                'Remove heavily infested plant parts'
            ]
        },
        'armyworm': {
            'severity': 'high',
            'description': 'Caterpillar larvae that can quickly defoliate crops, especially grasses and grains.',
            'prevention': [
                'Monitor fields regularly for eggs and larvae',
                'Use pheromone traps to detect adults',
                'Practice crop rotation',
                'Maintain field hygiene'
            ],
            'treatment': [
                'Apply Bacillus thuringiensis (Bt)',
                'Use spinosad-based insecticides',
                'Hand-pick larvae when possible',
                'Apply neem oil as a deterrent'
            ]
        },
        'beetle': {
            'severity': 'moderate',
            'description': 'Hard-shelled insects that feed on leaves, flowers, and fruits.',
            'prevention': [
                'Use floating row covers',
                'Plant trap crops to divert beetles',
                'Maintain good garden hygiene',
                'Use companion planting'
            ],
            'treatment': [
                'Hand-pick beetles in early morning',
                'Apply neem oil or pyrethrin',
                'Use diatomaceous earth',
                'Introduce beneficial nematodes'
            ]
        },
        'caterpillar': {
            'severity': 'moderate',
            'description': 'Larval stage of moths and butterflies that feed on leaves and stems.',
            'prevention': [
                'Use floating row covers',
                'Plant trap crops',
                'Encourage natural predators',
                'Practice crop rotation'
            ],
            'treatment': [
                'Apply Bacillus thuringiensis (Bt)',
                'Hand-pick caterpillars',
                'Use spinosad-based products',
                'Apply neem oil'
            ]
        },
        'grasshopper': {
            'severity': 'high',
            'description': 'Large jumping insects that can cause significant defoliation.',
            'prevention': [
                'Maintain healthy soil with good drainage',
                'Use trap crops',
                'Keep vegetation short around crops',
                'Encourage natural predators'
            ],
            'treatment': [
                'Apply carbaryl or malathion',
                'Use neem oil as deterrent',
                'Hand-pick when numbers are low',
                'Apply diatomaceous earth'
            ]
        },
        'leafhopper': {
            'severity': 'low',
            'description': 'Small, wedge-shaped insects that feed on plant sap and can transmit diseases.',
            'prevention': [
                'Use reflective mulches',
                'Maintain good air circulation',
                'Remove weeds and debris',
                'Use resistant varieties when available'
            ],
            'treatment': [
                'Spray with insecticidal soap',
                'Apply neem oil',
                'Use pyrethrin-based products',
                'Introduce beneficial insects'
            ]
        },
        'mite': {
            'severity': 'moderate',
            'description': 'Tiny arachnids that feed on plant cells, causing stippling and webbing.',
            'prevention': [
                'Maintain proper humidity levels',
                'Avoid over-fertilizing with nitrogen',
                'Use reflective mulches',
                'Keep plants well-watered'
            ],
            'treatment': [
                'Spray with water to dislodge mites',
                'Apply neem oil or insecticidal soap',
                'Use predatory mites',
                'Apply sulfur-based products'
            ]
        },
        'thrips': {
            'severity': 'moderate',
            'description': 'Tiny, slender insects that feed on plant cells, causing silvering and distortion.',
            'prevention': [
                'Use reflective mulches',
                'Maintain good air circulation',
                'Remove weeds and debris',
                'Use sticky traps for monitoring'
            ],
            'treatment': [
                'Apply neem oil or insecticidal soap',
                'Use spinosad-based products',
                'Introduce beneficial insects',
                'Apply diatomaceous earth'
            ]
        },
        'whitefly': {
            'severity': 'moderate',
            'description': 'Small, white-winged insects that feed on plant sap and excrete honeydew.',
            'prevention': [
                'Use yellow sticky traps',
                'Maintain good air circulation',
                'Remove weeds and debris',
                'Use reflective mulches'
            ],
            'treatment': [
                'Spray with insecticidal soap',
                'Apply neem oil',
                'Use pyrethrin-based products',
                'Introduce beneficial insects like Encarsia'
            ]
        },
        'healthy': {
            'severity': 'beneficial',
            'description': 'No significant pest damage detected. Plant appears healthy.',
            'prevention': [
                'Continue current care practices',
                'Monitor regularly for early signs of problems',
                'Maintain proper watering and fertilization',
                'Practice good garden hygiene'
            ],
            'treatment': [
                'No treatment needed',
                'Continue preventive measures',
                'Monitor for any changes',
                'Maintain optimal growing conditions'
            ]
        }
    }
    
    return advice_database.get(pest_name.lower(), advice_database['healthy'])

@app.route('/api/pest-detection', methods=['POST'])
def detect_pest():
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({
                'success': False,
                'error': 'No image provided'
            }), 400
        
        if model is None:
            return jsonify({
                'success': False,
                'error': 'Model not loaded'
            }), 500
        
        # Preprocess the image
        processed_image = preprocess_image(data['image'])
        
        # Make prediction
        predictions = model.predict(processed_image)
        probabilities = predictions[0]
        
        # Get top 3 predictions
        top_indices = np.argsort(probabilities)[-3:][::-1]
        top_predictions = []
        
        for idx in top_indices:
            top_predictions.append({
                'class': class_names[idx],
                'confidence': float(probabilities[idx])
            })
        
        predicted_pest = top_predictions[0]['class']
        confidence = top_predictions[0]['confidence']
        
        # Get advice
        advice = get_pest_advice(predicted_pest)
        
        return jsonify({
            'success': True,
            'predicted_pest': predicted_pest,
            'confidence': confidence,
            'top3_predictions': top_predictions,
            'advice': advice
        })
        
    except Exception as e:
        print(f"Error in pest detection: {e}")
        return jsonify({
            'success': False,
            'error': 'Failed to analyze image'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    print("🚀 Starting Pest Detection API...")
    if load_model():
        print("✅ Model loaded successfully!")
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        print("❌ Failed to load model. Exiting...")
