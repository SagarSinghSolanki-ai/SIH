# Pest Detection API Documentation

## Overview
This API provides AI-powered pest detection for agricultural images using a trained TensorFlow model.

## Features
- 🐛 **Pest Detection**: Identify 10 different pest types from plant images
- 📊 **Confidence Scoring**: Get confidence levels for predictions
- 💡 **Smart Advice**: Receive prevention and treatment recommendations
- 🔍 **Multiple Predictions**: See top 3 possible matches

## API Endpoints

### 1. Health Check
```
GET /health
```
Returns the API status and model loading status.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### 2. Pest Detection
```
POST /api/pest-detection
```
Analyze an image for pest detection.

**Request Body:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

**Response:**
```json
{
  "success": true,
  "predicted_pest": "aphid",
  "confidence": 0.95,
  "top3_predictions": [
    {"class": "aphid", "confidence": 0.95},
    {"class": "mite", "confidence": 0.03},
    {"class": "healthy", "confidence": 0.02}
  ],
  "advice": {
    "severity": "moderate",
    "description": "Small, soft-bodied insects that feed on plant sap...",
    "prevention": ["Use reflective mulches...", "Introduce beneficial insects..."],
    "treatment": ["Spray with neem oil...", "Use insecticidal soap..."]
  }
}
```

## Supported Pest Types
1. **Aphid** - Small, soft-bodied insects
2. **Armyworm** - Caterpillar larvae
3. **Beetle** - Hard-shelled insects
4. **Caterpillar** - Larval stage of moths/butterflies
5. **Grasshopper** - Large jumping insects
6. **Leafhopper** - Small, wedge-shaped insects
7. **Mite** - Tiny arachnids
8. **Thrips** - Tiny, slender insects
9. **Whitefly** - Small, white-winged insects
10. **Healthy** - No pest damage detected

## Installation

1. **Install Dependencies:**
```bash
pip install -r requirements_pest.txt
```

2. **Start the API:**
```bash
python pest_detection_api.py
```

The API will be available at `http://localhost:5000`

## Usage Examples

### Python
```python
import requests
import base64

# Load and encode image
with open("plant_image.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

# Send request
response = requests.post(
    "http://localhost:5000/api/pest-detection",
    json={"image": f"data:image/jpeg;base64,{image_data}"}
)

result = response.json()
print(f"Detected: {result['predicted_pest']}")
print(f"Confidence: {result['confidence']*100:.1f}%")
```

### JavaScript
```javascript
// Convert image to base64
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = image.width;
canvas.height = image.height;
ctx.drawImage(image, 0, 0);
const base64Image = canvas.toDataURL('image/jpeg');

// Send request
fetch('http://localhost:5000/api/pest-detection', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        image: base64Image
    })
})
.then(response => response.json())
.then(data => {
    console.log('Prediction:', data.predicted_pest);
    console.log('Confidence:', data.confidence);
});
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing image)
- `500` - Internal Server Error (model not loaded, processing error)

Error responses include a descriptive message:
```json
{
  "success": false,
  "error": "No image provided"
}
```

## Model Information
- **Input Size**: 128x128 pixels
- **Format**: RGB images
- **Framework**: TensorFlow/Keras
- **Architecture**: EfficientNetB3 (transfer learning)

## Requirements
- Python 3.7+
- TensorFlow 2.13.0
- Flask 2.3.3
- Pillow 10.0.0
- NumPy 1.24.3
- Flask-CORS 4.0.0
