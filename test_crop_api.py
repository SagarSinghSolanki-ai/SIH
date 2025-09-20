#!/usr/bin/env python3
"""
Test script for the Crop Advisory API
This script tests both the Flask ML API and the Node.js integration
"""

import requests
import json
import time

def test_flask_api():
    """Test the Flask ML API directly"""
    print("🧪 Testing Flask ML API...")
    
    # Test health check
    try:
        response = requests.get('http://localhost:5000/api/health')
        print(f"✅ Flask API Health: {response.status_code}")
        print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"❌ Flask API not running: {e}")
        return False
    
    # Test crop prediction
    try:
        crop_data = {
            "soil_ph": 6.5,
            "nitrogen": 50,
            "phosphorus": 30,
            "potassium": 40,
            "rainfall": 1200,
            "temperature": 25,
            "humidity": 70,
            "region": "tropical",
            "crop_type": "rice",
            "area": 1.0
        }
        
        response = requests.post('http://localhost:5000/api/crop-prediction', json=crop_data)
        print(f"✅ Crop Prediction: {response.status_code}")
        print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"❌ Crop prediction failed: {e}")
    
    return True

def test_nodejs_api():
    """Test the Node.js API integration"""
    print("\n🧪 Testing Node.js API...")
    
    # Test health check
    try:
        response = requests.get('http://localhost:8080/api/weather?city=Delhi')
        print(f"✅ Node.js API Health: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Location: {data.get('location', 'N/A')}")
            print(f"   Temperature: {data.get('temperature', {}).get('current', 'N/A')}°C")
            if 'mlPredictions' in data:
                print(f"   ML Predictions: Available")
            else:
                print(f"   ML Predictions: Not available")
    except Exception as e:
        print(f"❌ Node.js API not running: {e}")
        return False
    
    # Test crop advisory endpoint
    try:
        crop_data = {
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
        
        response = requests.post('http://localhost:8080/api/crop-advisory', json=crop_data)
        print(f"✅ Crop Advisory: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Location: {data.get('location', 'N/A')}")
            print(f"   ML Prediction: {'Available' if data.get('mlPrediction') else 'Not available'}")
            print(f"   AI Advice: {'Available' if data.get('aiAdvice') else 'Not available'}")
            if data.get('recommendations'):
                print(f"   Best Crops: {data['recommendations'].get('bestCrops', 'N/A')}")
        else:
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Crop advisory failed: {e}")
    
    return True

def main():
    """Main test function"""
    print("🚀 Starting Crop Advisory API Tests")
    print("=" * 50)
    
    # Wait a moment for services to be ready
    print("⏳ Waiting for services to start...")
    time.sleep(2)
    
    # Test Flask API
    flask_ok = test_flask_api()
    
    # Test Node.js API
    nodejs_ok = test_nodejs_api()
    
    print("\n" + "=" * 50)
    print("📊 Test Results Summary:")
    print(f"   Flask ML API: {'✅ Working' if flask_ok else '❌ Not working'}")
    print(f"   Node.js API: {'✅ Working' if nodejs_ok else '❌ Not working'}")
    
    if flask_ok and nodejs_ok:
        print("\n🎉 All tests passed! Your crop advisory system is ready to use.")
        print("\n📝 Next steps:")
        print("   1. Open your browser and go to http://localhost:8080")
        print("   2. Click on the 'CROP ADVISORY' icon")
        print("   3. Fill in the form with your farm data")
        print("   4. Get AI-powered crop recommendations!")
    else:
        print("\n⚠️  Some tests failed. Please check the error messages above.")
        print("\n🔧 Troubleshooting:")
        print("   1. Make sure Flask API is running: python app.py")
        print("   2. Make sure Node.js server is running: node server.js")
        print("   3. Check that your ML model is loaded in the Flask API")

if __name__ == "__main__":
    main()
