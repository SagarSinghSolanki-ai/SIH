"""
Test Crop API - Simple test script for the crop advisory API
"""

import requests
import json

def test_crop_api():
    """Test the crop advisory API"""
    try:
        # Test data
        test_data = {
            "crop": "rice",
            "season": "kharif",
            "location": "kerala"
        }
        
        print("🧪 Testing Crop Advisory API...")
        print(f"Test data: {test_data}")
        
        # Make request to the API
        response = requests.post(
            "http://localhost:8080/api/crop-advisory",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ API Response:")
            print(json.dumps(result, indent=2))
        else:
            print(f"❌ API Error: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the server is running on localhost:8080")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_weather_api():
    """Test the weather API"""
    try:
        print("\n🌤️ Testing Weather API...")
        
        # Test with city name
        response = requests.get("http://localhost:8080/api/weather?city=Kochi")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Weather API Response:")
            print(json.dumps(result, indent=2))
        else:
            print(f"❌ Weather API Error: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the server is running on localhost:8080")
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    """Main function"""
    print("🧪 API Testing Suite")
    print("=" * 30)
    
    # Test crop API
    test_crop_api()
    
    # Test weather API
    test_weather_api()
    
    print("\n✅ Testing completed!")

if __name__ == "__main__":
    main()
