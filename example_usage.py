"""
Example usage of the pest detection model
This file demonstrates how to use the trained pest detection model
"""

import tensorflow as tf
import numpy as np
from PIL import Image
import pickle
import os

def load_model_and_metadata():
    """Load the trained model and metadata"""
    try:
        # Load the model
        model = tf.keras.models.load_model('models/pest_model.h5')
        print("✅ Model loaded successfully")
        
        # Load metadata
        with open('models/pest_model_metadata.pkl', 'rb') as f:
            metadata = pickle.load(f)
        
        class_names = metadata.get('class_names', [
            'aphid', 'armyworm', 'beetle', 'caterpillar', 'grasshopper',
            'leafhopper', 'mite', 'thrips', 'whitefly', 'healthy'
        ])
        
        print("✅ Metadata loaded successfully")
        print(f"Classes: {class_names}")
        
        return model, class_names
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None, None

def preprocess_image(image_path, target_size=(128, 128)):
    """Preprocess an image for prediction"""
    try:
        # Load and resize image
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize(target_size)
        
        # Convert to numpy array and normalize
        image_array = np.array(image) / 255.0
        
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        
        return image_array
        
    except Exception as e:
        print(f"❌ Error preprocessing image: {e}")
        return None

def predict_pest(model, image_array, class_names):
    """Make prediction on preprocessed image"""
    try:
        # Get predictions
        predictions = model.predict(image_array)
        probabilities = predictions[0]
        
        # Get top 3 predictions
        top_indices = np.argsort(probabilities)[-3:][::-1]
        top_predictions = []
        
        for idx in top_indices:
            top_predictions.append({
                'class': class_names[idx],
                'confidence': float(probabilities[idx])
            })
        
        return top_predictions
        
    except Exception as e:
        print(f"❌ Error making prediction: {e}")
        return None

def main():
    """Main function to demonstrate usage"""
    print("🚀 Pest Detection Model Example Usage")
    print("=" * 50)
    
    # Load model and metadata
    model, class_names = load_model_and_metadata()
    if model is None:
        print("❌ Failed to load model. Exiting...")
        return
    
    # Example image path (replace with actual image path)
    image_path = "path/to/your/test/image.jpg"
    
    if not os.path.exists(image_path):
        print(f"❌ Image not found: {image_path}")
        print("Please provide a valid image path")
        return
    
    # Preprocess image
    print(f"📸 Processing image: {image_path}")
    image_array = preprocess_image(image_path)
    if image_array is None:
        print("❌ Failed to preprocess image")
        return
    
    # Make prediction
    print("🔍 Making prediction...")
    predictions = predict_pest(model, image_array, class_names)
    if predictions is None:
        print("❌ Failed to make prediction")
        return
    
    # Display results
    print("\n📊 Prediction Results:")
    print("-" * 30)
    for i, pred in enumerate(predictions, 1):
        confidence_percent = pred['confidence'] * 100
        print(f"{i}. {pred['class'].upper()}: {confidence_percent:.2f}%")
    
    # Get the top prediction
    top_prediction = predictions[0]
    print(f"\n🎯 Top Prediction: {top_prediction['class'].upper()}")
    print(f"   Confidence: {top_prediction['confidence']*100:.2f}%")

if __name__ == "__main__":
    main()
