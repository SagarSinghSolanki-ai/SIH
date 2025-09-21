from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os
import logging
from datetime import datetime
import traceback
import tensorflow as tf
from PIL import Image
import base64
from io import BytesIO

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Global variable to store loaded models
models = {}

class ModelManager:
    """Manages loading and prediction of machine learning models"""
    
    def __init__(self):
        self.models = {}
        self.model_info = {}
    
    def load_model(self, model_name, model_path, model_type='sklearn'):
        """Load a machine learning model from file"""
        try:
            if model_type == 'sklearn':
                model = joblib.load(model_path)
            elif model_type == 'tensorflow':
                import tensorflow as tf
                model = tf.keras.models.load_model(model_path)
            elif model_type == 'pytorch':
                import torch
                model = torch.load(model_path, map_location='cpu')
                model.eval()
            else:
                raise ValueError(f"Unsupported model type: {model_type}")
            
            self.models[model_name] = model
            self.model_info[model_name] = {
                'path': model_path,
                'type': model_type,
                'loaded_at': datetime.now().isoformat()
            }
            
            logger.info(f"Successfully loaded model: {model_name}")
            return True
            
        except Exception as e:
            logger.error(f"Error loading model {model_name}: {str(e)}")
            return False
    
    def predict(self, model_name, input_data):
        """Make prediction using specified model"""
        try:
            if model_name not in self.models:
                raise ValueError(f"Model {model_name} not loaded")
            
            model = self.models[model_name]
            model_type = self.model_info[model_name]['type']
            
            # Convert input to appropriate format
            if isinstance(input_data, dict):
                # Convert dict to numpy array or DataFrame
                if model_type == 'sklearn':
                    # For sklearn models, convert to 2D array
                    input_array = np.array(list(input_data.values())).reshape(1, -1)
                else:
                    input_array = np.array(list(input_data.values()))
            elif isinstance(input_data, list):
                input_array = np.array(input_data)
            else:
                input_array = input_data
            
            # Make prediction based on model type
            if model_type == 'sklearn':
                prediction = model.predict(input_array)
                if hasattr(model, 'predict_proba'):
                    probabilities = model.predict_proba(input_array)
                    return {
                        'prediction': prediction.tolist(),
                        'probabilities': probabilities.tolist()
                    }
                return {'prediction': prediction.tolist()}
            
            elif model_type == 'tensorflow':
                prediction = model.predict(input_array)
                return {'prediction': prediction.tolist()}
            
            elif model_type == 'pytorch':
                import torch
                with torch.no_grad():
                    input_tensor = torch.FloatTensor(input_array)
                    prediction = model(input_tensor)
                    return {'prediction': prediction.tolist()}
            
        except Exception as e:
            logger.error(f"Error making prediction with {model_name}: {str(e)}")
            raise e
    
    def preprocess_image(self, image_data, target_size=(128, 128)):
        """Preprocess image for pest detection"""
        try:
            # Handle base64 encoded image
            if isinstance(image_data, str) and image_data.startswith('data:image'):
                # Remove data URL prefix
                image_data = image_data.split(',')[1]
            
            # Decode base64 image
            if isinstance(image_data, str):
                image_bytes = base64.b64decode(image_data)
            else:
                image_bytes = image_data
            
            # Open image with PIL
            image = Image.open(BytesIO(image_bytes))
            
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize image
            image = image.resize(target_size)
            
            # Convert to numpy array and normalize
            image_array = np.array(image) / 255.0
            
            # Add batch dimension
            image_array = np.expand_dims(image_array, axis=0)
            
            return image_array
            
        except Exception as e:
            logger.error(f"Error preprocessing image: {str(e)}")
            raise e

# Initialize model manager
model_manager = ModelManager()

@app.route('/')
def home():
    """Home endpoint with API information"""
    return jsonify({
        'message': 'Agricultural AI Model API',
        'version': '1.0.0',
        'endpoints': {
            'load_model': 'POST /api/load-model',
            'predict': 'POST /api/predict',
            'models': 'GET /api/models',
            'health': 'GET /api/health'
        }
    })

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'loaded_models': list(model_manager.models.keys())
    })

@app.route('/api/load-model', methods=['POST'])
def load_model():
    """Load a machine learning model"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        model_name = data.get('model_name')
        model_path = data.get('model_path')
        model_type = data.get('model_type', 'sklearn')
        
        if not model_name or not model_path:
            return jsonify({'error': 'model_name and model_path are required'}), 400
        
        if not os.path.exists(model_path):
            return jsonify({'error': f'Model file not found: {model_path}'}), 404
        
        success = model_manager.load_model(model_name, model_path, model_type)
        
        if success:
            return jsonify({
                'message': f'Model {model_name} loaded successfully',
                'model_info': model_manager.model_info[model_name]
            })
        else:
            return jsonify({'error': f'Failed to load model {model_name}'}), 500
            
    except Exception as e:
        logger.error(f"Error in load_model: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    """Make prediction using loaded model"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        model_name = data.get('model_name')
        input_data = data.get('input_data')
        
        if not model_name or input_data is None:
            return jsonify({'error': 'model_name and input_data are required'}), 400
        
        if model_name not in model_manager.models:
            return jsonify({'error': f'Model {model_name} not loaded'}), 404
        
        prediction = model_manager.predict(model_name, input_data)
        
        return jsonify({
            'model_name': model_name,
            'input_data': input_data,
            'prediction': prediction,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in predict: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/models')
def list_models():
    """List all loaded models"""
    return jsonify({
        'loaded_models': list(model_manager.models.keys()),
        'model_info': model_manager.model_info
    })

# Agricultural specific endpoints
@app.route('/api/crop-prediction', methods=['POST'])
def crop_prediction():
    """Predict crop recommendation based on soil and weather data"""
    try:
        data = request.get_json()
        
        # Example input format for crop prediction with NPK
        # {
        #     "soil_ph": 6.5,
        #     "nitrogen": 50,
        #     "phosphorus": 30,
        #     "potassium": 40,
        #     "rainfall": 1200,
        #     "temperature": 25,
        #     "humidity": 70,
        #     "region": "tropical"
        # }
        
        if 'crop_model' not in model_manager.models:
            return jsonify({'error': 'Crop prediction model not loaded. Please load a model with name "crop_model"'}), 404
        
        prediction = model_manager.predict('crop_model', data)
        
        return jsonify({
            'prediction': prediction,
            'recommendation': 'Based on the provided NPK levels and conditions, the recommended crops are:',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in crop prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/pest-detection', methods=['POST'])
def pest_detection():
    """Detect pests from uploaded image"""
    try:
        # Check if model is loaded
        if 'pest_model' not in model_manager.models:
            return jsonify({'error': 'Pest detection model not loaded'}), 404
        
        # Get pest metadata
        if 'pest_metadata' not in model_manager.models:
            return jsonify({'error': 'Pest metadata not loaded'}), 404
        
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400
        
        # Preprocess the image
        image_array = model_manager.preprocess_image(data['image'])
        
        # Make prediction
        prediction = model_manager.predict('pest_model', image_array)
        
        # Get class names from metadata
        class_names = model_manager.models['pest_metadata']['class_names']
        
        # Get the predicted class and confidence
        predicted_class_idx = np.argmax(prediction['prediction'][0])
        confidence = float(np.max(prediction['prediction'][0]))
        predicted_class = class_names[predicted_class_idx]
        
        # Get top 3 predictions
        top3_indices = np.argsort(prediction['prediction'][0])[-3:][::-1]
        top3_predictions = []
        for idx in top3_indices:
            top3_predictions.append({
                'class': class_names[idx],
                'confidence': float(prediction['prediction'][0][idx])
            })
        
        # Get pest prevention advice
        pest_advice = get_pest_advice(predicted_class)
        
        return jsonify({
            'success': True,
            'predicted_pest': predicted_class,
            'confidence': confidence,
            'top3_predictions': top3_predictions,
            'all_classes': class_names,
            'advice': pest_advice,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in pest detection: {str(e)}")
        return jsonify({'error': str(e), 'success': False}), 500

def get_pest_advice(pest_name):
    """Get prevention and treatment advice for detected pest"""
    advice_database = {
        'bees': {
            'description': 'Honey bees or other beneficial bees',
            'prevention': [
                'Plant bee-friendly flowers to attract beneficial bees',
                'Avoid using pesticides during flowering season',
                'Provide water sources for bees',
                'Maintain diverse plant species'
            ],
            'treatment': [
                'Bees are beneficial - no treatment needed',
                'If aggressive, contact local beekeeper for relocation',
                'Avoid disturbing bee hives'
            ],
            'severity': 'Beneficial'
        },
        'beetle': {
            'description': 'Various beetle species that can damage crops',
            'prevention': [
                'Use crop rotation to break pest cycles',
                'Remove crop debris after harvest',
                'Use floating row covers',
                'Plant trap crops to divert beetles'
            ],
            'treatment': [
                'Hand-pick beetles in early morning',
                'Apply neem oil spray',
                'Use beneficial nematodes',
                'Consider organic insecticides if severe'
            ],
            'severity': 'Moderate'
        },
        'catterpillar': {
            'description': 'Caterpillar larvae that feed on plant leaves',
            'prevention': [
                'Use Bacillus thuringiensis (Bt) spray',
                'Attract beneficial insects like parasitic wasps',
                'Remove weeds that host caterpillars',
                'Use pheromone traps'
            ],
            'treatment': [
                'Hand-pick caterpillars when possible',
                'Apply Bt spray every 7-10 days',
                'Use spinosad for organic control',
                'Introduce beneficial insects'
            ],
            'severity': 'High'
        },
        'earthworms': {
            'description': 'Earthworms - beneficial for soil health',
            'prevention': [
                'Maintain organic matter in soil',
                'Avoid excessive tillage',
                'Keep soil moist but not waterlogged',
                'Add compost regularly'
            ],
            'treatment': [
                'Earthworms are beneficial - no treatment needed',
                'Maintain healthy soil conditions',
                'Avoid chemical fertilizers that harm earthworms'
            ],
            'severity': 'Beneficial'
        },
        'earwig': {
            'description': 'Earwigs that can damage young plants',
            'prevention': [
                'Remove hiding places like mulch and debris',
                'Use sticky traps',
                'Keep garden clean and tidy',
                'Plant resistant varieties'
            ],
            'treatment': [
                'Hand-pick at night with flashlight',
                'Use diatomaceous earth',
                'Apply neem oil',
                'Set up oil traps'
            ],
            'severity': 'Low'
        },
        'grasshopper': {
            'description': 'Grasshoppers that consume plant foliage',
            'prevention': [
                'Use row covers for young plants',
                'Plant trap crops',
                'Maintain healthy soil',
                'Attract birds and beneficial insects'
            ],
            'treatment': [
                'Hand-pick when possible',
                'Use Nosema locustae (grasshopper bait)',
                'Apply neem oil spray',
                'Use floating row covers'
            ],
            'severity': 'High'
        },
        'moth': {
            'description': 'Adult moths that lay eggs on plants',
            'prevention': [
                'Use pheromone traps',
                'Plant trap crops',
                'Remove weeds and debris',
                'Use row covers during peak moth season'
            ],
            'treatment': [
                'Use pheromone traps to monitor',
                'Apply Bt spray for larvae control',
                'Introduce beneficial insects',
                'Use light traps at night'
            ],
            'severity': 'Moderate'
        },
        'slug': {
            'description': 'Slugs that feed on plant leaves and stems',
            'prevention': [
                'Remove hiding places and debris',
                'Use copper barriers',
                'Improve drainage',
                'Plant slug-resistant varieties'
            ],
            'treatment': [
                'Hand-pick at night with flashlight',
                'Use beer traps',
                'Apply diatomaceous earth',
                'Use iron phosphate baits'
            ],
            'severity': 'Moderate'
        },
        'snail': {
            'description': 'Snails that damage plant foliage',
            'prevention': [
                'Remove hiding places',
                'Use copper barriers',
                'Improve garden drainage',
                'Plant resistant varieties'
            ],
            'treatment': [
                'Hand-pick in early morning',
                'Use beer traps',
                'Apply diatomaceous earth',
                'Use iron phosphate baits'
            ],
            'severity': 'Moderate'
        },
        'wasp': {
            'description': 'Wasps - mostly beneficial for pest control',
            'prevention': [
                'Plant nectar-rich flowers',
                'Provide water sources',
                'Avoid disturbing nests',
                'Maintain diverse plant species'
            ],
            'treatment': [
                'Most wasps are beneficial - no treatment needed',
                'If aggressive, contact pest control professional',
                'Avoid swatting or disturbing nests'
            ],
            'severity': 'Beneficial'
        },
        'weevil': {
            'description': 'Weevils that damage plant roots and foliage',
            'prevention': [
                'Use crop rotation',
                'Remove crop debris',
                'Use beneficial nematodes',
                'Plant resistant varieties'
            ],
            'treatment': [
                'Apply beneficial nematodes to soil',
                'Use neem oil spray',
                'Hand-pick adults when possible',
                'Use diatomaceous earth'
            ],
            'severity': 'High'
        }
    }
    
    return advice_database.get(pest_name.lower(), {
        'description': f'Unknown pest: {pest_name}',
        'prevention': ['Consult with local agricultural extension office', 'Monitor plant health regularly'],
        'treatment': ['Identify the pest correctly', 'Consult with agricultural expert'],
        'severity': 'Unknown'
    })

@app.route('/api/yield-prediction', methods=['POST'])
def yield_prediction():
    """Predict crop yield based on various factors"""
    try:
        data = request.get_json()
        
        if 'yield_model' not in model_manager.models:
            return jsonify({'error': 'Yield prediction model not loaded. Please load a model with name "yield_model"'}), 404
        
        prediction = model_manager.predict('yield_model', data)
        
        return jsonify({
            'prediction': prediction,
            'recommendation': 'Based on the current conditions, the predicted yield is:',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in yield prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Create models directory if it doesn't exist
    os.makedirs('models', exist_ok=True)
    
    # Load pest recognition model on startup
    try:
        # Load the pest model
        pest_model_path = 'models/pest_model.h5'
        if os.path.exists(pest_model_path):
            model_manager.load_model('pest_model', pest_model_path, 'tensorflow')
            logger.info("Pest recognition model loaded successfully")
        else:
            logger.warning("Pest model not found at models/pest_model.h5")
        
        # Load pest metadata
        pest_metadata_path = 'models/pest_model_metadata.pkl'
        if os.path.exists(pest_metadata_path):
            pest_metadata = joblib.load(pest_metadata_path)
            model_manager.models['pest_metadata'] = pest_metadata
            model_manager.model_info['pest_metadata'] = {
                'path': pest_metadata_path,
                'type': 'metadata',
                'loaded_at': datetime.now().isoformat()
            }
            logger.info("Pest metadata loaded successfully")
        else:
            logger.warning("Pest metadata not found at models/pest_model_metadata.pkl")
            
    except Exception as e:
        logger.error(f"Error loading pest model: {str(e)}")
    
    # Load any other existing models on startup
    models_dir = 'models'
    if os.path.exists(models_dir):
        for file in os.listdir(models_dir):
            if file.endswith(('.pkl', '.joblib', '.h5', '.pth')) and file not in ['pest_model.h5', 'pest_model_metadata.pkl']:
                model_name = file.split('.')[0]
                model_path = os.path.join(models_dir, file)
                model_type = 'sklearn' if file.endswith(('.pkl', '.joblib')) else 'tensorflow' if file.endswith('.h5') else 'pytorch'
                model_manager.load_model(model_name, model_path, model_type)
    
    app.run(debug=True, host='0.0.0.0', port=5000)

