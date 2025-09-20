#!/usr/bin/env python3
"""
Example script showing how to load your ML model with NPK features
This script demonstrates the correct way to load your model for the crop advisory system
"""

import joblib
import numpy as np
import requests
import json

def load_and_test_model():
    """Load your model and test it with NPK data"""
    
    # Step 1: Load your saved model
    try:
        # Replace 'your_model.pkl' with your actual model file name
        model = joblib.load('models/your_model.pkl')
        print("✅ Model loaded successfully!")
        
        # Step 2: Check what features your model expects
        if hasattr(model, 'feature_names_in_'):
            print(f"📋 Model expects these features: {list(model.feature_names_in_)}")
        else:
            print("📋 Model feature names not available, but typically expects:")
            print("   - soil_ph, nitrogen, phosphorus, potassium, temperature, humidity, rainfall")
        
        # Step 3: Prepare test data with NPK values
        test_data = {
            'soil_ph': 6.5,
            'nitrogen': 50,      # mg/kg
            'phosphorus': 30,    # mg/kg  
            'potassium': 40,     # mg/kg
            'temperature': 25,   # °C
            'humidity': 70,      # %
            'rainfall': 1200     # mm
        }
        
        # Step 4: Convert to numpy array for prediction
        # Make sure the order matches your model's training data
        feature_values = [
            test_data['soil_ph'],
            test_data['nitrogen'],
            test_data['phosphorus'], 
            test_data['potassium'],
            test_data['temperature'],
            test_data['humidity'],
            test_data['rainfall']
        ]
        
        # Reshape for single prediction
        X_test = np.array(feature_values).reshape(1, -1)
        
        # Step 5: Make prediction
        prediction = model.predict(X_test)
        print(f"🌱 Model prediction: {prediction[0]}")
        
        # If your model has probability predictions
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(X_test)
            print(f"📊 Prediction probabilities: {probabilities[0]}")
        
        return True
        
    except FileNotFoundError:
        print("❌ Model file not found!")
        print("   Please place your model file in the 'models/' directory")
        print("   Example: models/crop_model.pkl")
        return False
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return False

def test_api_integration():
    """Test the API integration with NPK data"""
    
    print("\n🧪 Testing API Integration...")
    
    # Test data with NPK values
    test_data = {
        "soilData": {
            "soil_ph": 6.5,
            "nitrogen": 50,
            "phosphorus": 30,
            "potassium": 40,
            "temperature": 25,
            "humidity": 70,
            "rainfall": 1200,
            "area": 1.0
        },
        "location": "Kerala",
        "cropType": "rice"
    }
    
    try:
        # Test Node.js API
        response = requests.post('http://localhost:8080/api/crop-advisory', json=test_data)
        if response.status_code == 200:
            print("✅ Node.js API working with NPK data!")
            result = response.json()
            print(f"   Location: {result.get('location')}")
            print(f"   ML Prediction: {'Available' if result.get('mlPrediction') else 'Not available'}")
        else:
            print(f"❌ Node.js API error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ API test failed: {e}")

def main():
    """Main function"""
    print("🚀 NPK Integration Test")
    print("=" * 40)
    
    # Test model loading
    model_loaded = load_and_test_model()
    
    if model_loaded:
        print("\n✅ Your model is ready for NPK integration!")
        print("\n📝 Next steps:")
        print("   1. Make sure your model file is named 'crop_model.pkl'")
        print("   2. Place it in the 'models/' directory")
        print("   3. Start the Flask API: python app.py")
        print("   4. Start the Node.js server: node server.js")
        print("   5. Test the crop advisory form!")
        
        # Test API if servers are running
        test_api_integration()
    else:
        print("\n⚠️  Please fix the model loading issues first")

if __name__ == "__main__":
    main()

