# Agricultural AI Model API

A Flask-based REST API for serving machine learning models in agricultural applications. This API supports various model types including scikit-learn, TensorFlow, and PyTorch models.

## Features

- **Multi-model Support**: Load and serve different types of ML models (sklearn, TensorFlow, PyTorch)
- **Agricultural Endpoints**: Specialized endpoints for crop prediction, pest detection, and yield prediction
- **CORS Enabled**: Cross-origin resource sharing for web applications
- **Error Handling**: Comprehensive error handling and logging
- **Health Monitoring**: Health check endpoints for monitoring

## Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create models directory:**
   ```bash
   mkdir models
   ```

3. **Place your saved models in the `models/` directory**

## Usage

### Starting the API Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

### API Endpoints

#### 1. Health Check
```http
GET /api/health
```
Returns the health status and loaded models.

#### 2. Load Model
```http
POST /api/load-model
Content-Type: application/json

{
    "model_name": "crop_model",
    "model_path": "models/crop_model.pkl",
    "model_type": "sklearn"
}
```

#### 3. Make Prediction
```http
POST /api/predict
Content-Type: application/json

{
    "model_name": "crop_model",
    "input_data": {
        "soil_ph": 6.5,
        "rainfall": 1200,
        "temperature": 25,
        "humidity": 70
    }
}
```

#### 4. List Models
```http
GET /api/models
```
Returns all loaded models and their information.

#### 5. Agricultural Specific Endpoints

##### Crop Prediction
```http
POST /api/crop-prediction
Content-Type: application/json

{
    "soil_ph": 6.5,
    "rainfall": 1200,
    "temperature": 25,
    "humidity": 70,
    "soil_type": "clay",
    "region": "tropical"
}
```

##### Pest Detection
```http
POST /api/pest-detection
Content-Type: application/json

{
    "symptoms": ["yellow_leaves", "spots"],
    "crop_type": "rice",
    "season": "monsoon"
}
```

##### Yield Prediction
```http
POST /api/yield-prediction
Content-Type: application/json

{
    "crop_type": "rice",
    "area": 2.5,
    "fertilizer_used": 50,
    "pesticide_used": 10,
    "rainfall": 1200,
    "temperature": 25
}
```

## Model Types Supported

### Scikit-learn Models (.pkl, .joblib)
```python
import joblib
model = joblib.load('models/model.pkl')
```

### TensorFlow Models (.h5)
```python
import tensorflow as tf
model = tf.keras.models.load_model('models/model.h5')
```

### PyTorch Models (.pth)
```python
import torch
model = torch.load('models/model.pth', map_location='cpu')
```

## Example Usage

### Python Client
```python
import requests

# Load a model
response = requests.post('http://localhost:5000/api/load-model', json={
    'model_name': 'crop_model',
    'model_path': 'models/crop_model.pkl',
    'model_type': 'sklearn'
})

# Make a prediction
response = requests.post('http://localhost:5000/api/predict', json={
    'model_name': 'crop_model',
    'input_data': {
        'soil_ph': 6.5,
        'rainfall': 1200,
        'temperature': 25,
        'humidity': 70
    }
})

print(response.json())
```

### JavaScript Client
```javascript
// Load a model
fetch('http://localhost:5000/api/load-model', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        model_name: 'crop_model',
        model_path: 'models/crop_model.pkl',
        model_type: 'sklearn'
    })
})
.then(response => response.json())
.then(data => console.log(data));

// Make a prediction
fetch('http://localhost:5000/api/predict', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        model_name: 'crop_model',
        input_data: {
            soil_ph: 6.5,
            rainfall: 1200,
            temperature: 25,
            humidity: 70
        }
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Integration with Existing Node.js Backend

To integrate this Flask API with your existing Node.js backend, you can make HTTP requests from your Node.js server:

```javascript
// In your server.js
const axios = require('axios');

// Make prediction request to Flask API
async function getCropPrediction(soilData) {
    try {
        const response = await axios.post('http://localhost:5000/api/crop-prediction', soilData);
        return response.data;
    } catch (error) {
        console.error('Error calling ML API:', error);
        return null;
    }
}

// Use in your existing endpoints
app.post('/api/agricultural-advice', async (req, res) => {
    const { soilData } = req.body;
    
    // Get ML prediction
    const prediction = await getCropPrediction(soilData);
    
    // Combine with your existing logic
    const advice = {
        ...prediction,
        weatherAdvice: getAgriculturalAdvice(weatherData)
    };
    
    res.json(advice);
});
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing parameters)
- `404`: Not Found (model not loaded)
- `500`: Internal Server Error

Error responses include detailed error messages:
```json
{
    "error": "Model crop_model not loaded"
}
```

## Logging

The API includes comprehensive logging for debugging and monitoring. Logs include:
- Model loading events
- Prediction requests
- Error details
- Performance metrics

## Production Deployment

For production deployment, consider using a WSGI server like Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Security Considerations

- Validate input data before processing
- Implement authentication if needed
- Use HTTPS in production
- Limit file upload sizes
- Sanitize file paths

## Troubleshooting

### Common Issues

1. **Model not loading**: Check file path and model format
2. **Prediction errors**: Verify input data format matches model expectations
3. **Memory issues**: Large models may require more memory
4. **CORS errors**: Ensure CORS is properly configured

### Debug Mode

Run with debug mode for detailed error messages:
```bash
python app.py
```

The API will run in debug mode by default when started with `python app.py`.


