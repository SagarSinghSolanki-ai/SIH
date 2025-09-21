"""
Run API - Simple script to start the pest detection API
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    try:
        print("📦 Installing required packages...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements_pest.txt"])
        print("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False

def start_api():
    """Start the pest detection API"""
    try:
        print("🚀 Starting Pest Detection API...")
        subprocess.run([sys.executable, "pest_detection_api.py"])
    except KeyboardInterrupt:
        print("\n⏹️ API stopped by user")
    except Exception as e:
        print(f"❌ Error starting API: {e}")

def main():
    """Main function"""
    print("🐛 Pest Detection API Launcher")
    print("=" * 40)
    
    # Check if requirements file exists
    if not os.path.exists("requirements_pest.txt"):
        print("❌ requirements_pest.txt not found")
        return
    
    # Install requirements
    if not install_requirements():
        print("❌ Failed to install requirements")
        return
    
    # Start API
    start_api()

if __name__ == "__main__":
    main()
