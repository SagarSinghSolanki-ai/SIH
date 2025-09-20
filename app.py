from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os
import logging
from datetime import datetime
import traceback

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
    """Detect pests or diseases from image or symptoms"""
    try:
        data = request.get_json()
        
        if 'pest_model' not in model_manager.models:
            return jsonify({'error': 'Pest detection model not loaded. Please load a model with name "pest_model"'}), 404
        
        prediction = model_manager.predict('pest_model', data)
        
        return jsonify({
            'prediction': prediction,
            'recommendation': 'Based on the symptoms, here are the recommended treatments:',
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in pest detection: {str(e)}")
        return jsonify({'error': str(e)}), 500

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
    
    # Load any existing models on startup
    models_dir = 'models'
    if os.path.exists(models_dir):
        for file in os.listdir(models_dir):
            if file.endswith(('.pkl', '.joblib', '.h5', '.pth')):
                model_name = file.split('.')[0]
                model_path = os.path.join(models_dir, file)
                model_type = 'sklearn' if file.endswith(('.pkl', '.joblib')) else 'tensorflow' if file.endswith('.h5') else 'pytorch'
                model_manager.load_model(model_name, model_path, model_type)
    
    app.run(debug=True, host='0.0.0.0', port=5000)

