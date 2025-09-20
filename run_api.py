#!/usr/bin/env python3
"""
Script to run the Agricultural AI Model API
This script provides an easy way to start the Flask API server
"""

import os
import sys
import subprocess
import argparse

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import numpy
        import pandas
        import sklearn
        print("✓ All required dependencies are installed")
        return True
    except ImportError as e:
        print(f"✗ Missing dependency: {e}")
        print("Please install dependencies with: pip install -r requirements.txt")
        return False

def create_directories():
    """Create necessary directories"""
    directories = ['models', 'logs']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"✓ Created directory: {directory}")

def run_api(host='0.0.0.0', port=5000, debug=True):
    """Run the Flask API server"""
    print(f"Starting Agricultural AI Model API on {host}:{port}")
    print(f"Debug mode: {debug}")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        from app import app
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except Exception as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description='Run Agricultural AI Model API')
    parser.add_argument('--host', default='0.0.0.0', help='Host to bind to (default: 0.0.0.0)')
    parser.add_argument('--port', type=int, default=5000, help='Port to bind to (default: 5000)')
    parser.add_argument('--no-debug', action='store_true', help='Disable debug mode')
    parser.add_argument('--check-deps', action='store_true', help='Only check dependencies')
    
    args = parser.parse_args()
    
    print("Agricultural AI Model API")
    print("=" * 30)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    if args.check_deps:
        print("Dependency check completed successfully")
        return
    
    # Create directories
    create_directories()
    
    # Run the API
    run_api(host=args.host, port=args.port, debug=not args.no_debug)

if __name__ == "__main__":
    main()


