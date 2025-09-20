"""
Example usage of the Agricultural AI Model API
This script demonstrates how to interact with the Flask API
"""

import requests
import json

# API base URL
BASE_URL = "http://localhost:5000"

def test_api():
    """Test the API endpoints"""
    
    print("=== Agricultural AI Model API Test ===\n")
    
    # 1. Health check
    print("1. Health Check:")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    
    # 2. Load a model (example - you need to have a model file)
    print("2. Loading Model:")
    load_data = {
        "model_name": "crop_model",
        "model_path": "models/crop_model.pkl",  # Replace with your actual model path
        "model_type": "sklearn"
    }
    
    # Note: This will fail if the model file doesn't exist
    try:
        response = requests.post(f"{BASE_URL}/api/load-model", json=load_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}\n")
    except Exception as e:
        print(f"Error loading model: {e}\n")
    
    # 3. List loaded models
    print("3. List Models:")
    response = requests.get(f"{BASE_URL}/api/models")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    
    # 4. Make a prediction (example)
    print("4. Making Prediction:")
    prediction_data = {
        "model_name": "crop_model",
        "input_data": {
            "soil_ph": 6.5,
            "rainfall": 1200,
            "temperature": 25,
            "humidity": 70
        }
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/predict", json=prediction_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}\n")
    except Exception as e:
        print(f"Error making prediction: {e}\n")
    
    # 5. Agricultural specific endpoints
    print("5. Crop Prediction:")
    crop_data = {
        "soil_ph": 6.5,
        "rainfall": 1200,
        "temperature": 25,
        "humidity": 70,
        "soil_type": "clay",
        "region": "tropical"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/crop-prediction", json=crop_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}\n")
    except Exception as e:
        print(f"Error in crop prediction: {e}\n")

def create_sample_model():
    """Create a sample model for testing"""
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.datasets import make_classification
    import joblib
    import os
    
    print("Creating sample model...")
    
    # Create sample data
    X, y = make_classification(n_samples=100, n_features=4, n_classes=3, random_state=42)
    
    # Train a simple model
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    model.fit(X, y)
    
    # Create models directory if it doesn't exist
    os.makedirs('models', exist_ok=True)
    
    # Save the model
    model_path = 'models/sample_crop_model.pkl'
    joblib.dump(model, model_path)
    print(f"Sample model saved to: {model_path}")
    
    return model_path

if __name__ == "__main__":
    # Create a sample model first
    model_path = create_sample_model()
    
    # Test the API
    test_api()


