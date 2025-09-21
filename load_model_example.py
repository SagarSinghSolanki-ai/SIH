"""
Load model example - demonstrates how to load the pest detection model
"""

import tensorflow as tf
import pickle
import os

def load_pest_model():
    """Load the pest detection model and return it"""
    try:
        model_path = 'models/pest_model.h5'
        if os.path.exists(model_path):
            model = tf.keras.models.load_model(model_path)
            print("✅ Pest detection model loaded successfully")
            return model
        else:
            print("❌ Model file not found at:", model_path)
            return None
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return None

def load_model_metadata():
    """Load model metadata and return class names"""
    try:
        metadata_path = 'models/pest_model_metadata.pkl'
        if os.path.exists(metadata_path):
            with open(metadata_path, 'rb') as f:
                metadata = pickle.load(f)
            
            class_names = metadata.get('class_names', [
                'aphid', 'armyworm', 'beetle', 'caterpillar', 'grasshopper',
                'leafhopper', 'mite', 'thrips', 'whitefly', 'healthy'
            ])
            
            print("✅ Model metadata loaded successfully")
            print(f"Classes: {class_names}")
            return class_names
        else:
            print("❌ Metadata file not found at:", metadata_path)
            return None
    except Exception as e:
        print(f"❌ Error loading metadata: {e}")
        return None

def main():
    """Main function to demonstrate model loading"""
    print("🚀 Loading Pest Detection Model")
    print("=" * 40)
    
    # Load model
    model = load_pest_model()
    if model is None:
        print("❌ Failed to load model")
        return
    
    # Load metadata
    class_names = load_model_metadata()
    if class_names is None:
        print("❌ Failed to load metadata")
        return
    
    # Display model summary
    print("\n📊 Model Summary:")
    print("-" * 20)
    model.summary()
    
    print(f"\n🎯 Model loaded successfully!")
    print(f"   Input shape: {model.input_shape}")
    print(f"   Output shape: {model.output_shape}")
    print(f"   Number of classes: {len(class_names)}")

if __name__ == "__main__":
    main()
