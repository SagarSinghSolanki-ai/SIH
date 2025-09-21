// Irrigation Guide JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('irrigationForm');
    const predictBtn = document.getElementById('predictBtn');
    const loading = document.getElementById('loading');
    const resultCard = document.getElementById('resultCard');
    const predictionText = document.getElementById('predictionText');
    const confidenceText = document.getElementById('confidenceText');
    const recommendationList = document.getElementById('recommendationList');

    // Real API prediction function
    async function predictIrrigation(cropType, soilMoisture, temperature, humidity, rainfall) {
        try {
            const response = await fetch('http://localhost:5000/api/predict-irrigation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    crop_type: cropType,
                    soil_moisture: soilMoisture,
                    temperature: temperature,
                    humidity: humidity,
                    rainfall: rainfall
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'Prediction failed');
            }
            
            return {
                irrigationNeeded: data.irrigation_needed,
                confidence: data.confidence,
                recommendations: data.recommendations
            };
            
        } catch (error) {
            console.error('Error calling irrigation API:', error);
            
            // Fallback to mock prediction if API fails
            console.log('Falling back to mock prediction...');
            return await mockPrediction(cropType, soilMoisture, temperature, humidity, rainfall);
        }
    }

    // Fallback mock prediction function
    async function mockPrediction(cropType, soilMoisture, temperature, humidity, rainfall) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock prediction logic
        let irrigationNeeded = false;
        let confidence = 0.5;
        
        // Simple heuristic-based prediction
        if (soilMoisture < 30) {
            irrigationNeeded = true;
            confidence = 0.85;
        } else if (soilMoisture < 50 && temperature > 30) {
            irrigationNeeded = true;
            confidence = 0.75;
        } else if (rainfall < 5 && humidity < 40) {
            irrigationNeeded = true;
            confidence = 0.70;
        } else if (soilMoisture > 70) {
            irrigationNeeded = false;
            confidence = 0.80;
        } else {
            irrigationNeeded = false;
            confidence = 0.65;
        }
        
        // Adjust based on crop type
        const waterIntensiveCrops = ['Rice', 'Sugarcane', 'Cotton'];
        if (waterIntensiveCrops.includes(cropType)) {
            if (soilMoisture < 60) {
                irrigationNeeded = true;
                confidence = Math.min(confidence + 0.1, 0.95);
            }
        }
        
        return {
            irrigationNeeded,
            confidence: Math.round(confidence * 100) / 100,
            recommendations: getMockRecommendations(cropType, soilMoisture, temperature, humidity, rainfall, irrigationNeeded, confidence)
        };
    }

    // Mock recommendations function for fallback
    function getMockRecommendations(cropType, soilMoisture, temperature, humidity, rainfall, irrigationNeeded, confidence) {
        const recommendations = [];
        
        if (irrigationNeeded) {
            recommendations.push("🌊 Irrigation is recommended for your crops");
            
            if (soilMoisture < 30) {
                recommendations.push("💧 Soil moisture is critically low - immediate irrigation needed");
            } else if (soilMoisture < 50) {
                recommendations.push("⚠️ Soil moisture is below optimal levels");
            }
            
            if (temperature > 35) {
                recommendations.push("🌡️ High temperature increases water demand - consider more frequent irrigation");
            }
            
            if (humidity < 40) {
                recommendations.push("💨 Low humidity increases evaporation - water early morning or evening");
            }
            
            if (rainfall < 10) {
                recommendations.push("🌧️ Limited rainfall - rely on irrigation for water supply");
            }
            
            recommendations.push("⏰ Best irrigation time: Early morning (6-8 AM) or evening (6-8 PM)");
            recommendations.push("💧 Water deeply and slowly to encourage deep root growth");
            
        } else {
            recommendations.push("✅ No irrigation needed at this time");
            
            if (soilMoisture > 70) {
                recommendations.push("💧 Soil moisture is adequate - avoid overwatering");
            }
            
            if (rainfall > 20) {
                recommendations.push("🌧️ Recent rainfall provides sufficient moisture");
            }
            
            recommendations.push("👀 Monitor soil moisture regularly - check again in 2-3 days");
            recommendations.push("🌱 Focus on other crop management practices like pest control and fertilization");
        }
        
        // General recommendations
        recommendations.push("📊 Check soil moisture 2-3 times per week");
        recommendations.push("🌡️ Monitor weather forecasts for rain predictions");
        recommendations.push("📈 Keep records of irrigation schedules and crop response");
        
        return recommendations;
    }

    function getRecommendations(cropType, soilMoisture, temperature, humidity, rainfall, irrigationNeeded, confidence) {
        const recommendations = [];
        
        if (irrigationNeeded) {
            recommendations.push("🌊 Irrigation is recommended for your crops");
            
            if (soilMoisture < 30) {
                recommendations.push("💧 Soil moisture is critically low - immediate irrigation needed");
            } else if (soilMoisture < 50) {
                recommendations.push("⚠️ Soil moisture is below optimal levels");
            }
            
            if (temperature > 35) {
                recommendations.push("🌡️ High temperature increases water demand - consider more frequent irrigation");
            }
            
            if (humidity < 40) {
                recommendations.push("💨 Low humidity increases evaporation - water early morning or evening");
            }
            
            if (rainfall < 10) {
                recommendations.push("🌧️ Limited rainfall - rely on irrigation for water supply");
            }
            
            // Crop-specific recommendations
            if (cropType === 'Rice') {
                recommendations.push("🌾 Rice requires consistent water - maintain 2-3 inches of standing water");
            } else if (cropType === 'Wheat') {
                recommendations.push("🌾 Wheat needs moderate irrigation - avoid overwatering during grain filling");
            } else if (cropType === 'Tomato') {
                recommendations.push("🍅 Tomatoes prefer deep, infrequent watering - avoid wetting leaves");
            } else if (cropType === 'Cotton') {
                recommendations.push("🌿 Cotton needs careful water management - avoid water stress during flowering");
            }
            
            recommendations.push("⏰ Best irrigation time: Early morning (6-8 AM) or evening (6-8 PM)");
            recommendations.push("💧 Water deeply and slowly to encourage deep root growth");
            
        } else {
            recommendations.push("✅ No irrigation needed at this time");
            
            if (soilMoisture > 70) {
                recommendations.push("💧 Soil moisture is adequate - avoid overwatering");
            }
            
            if (rainfall > 20) {
                recommendations.push("🌧️ Recent rainfall provides sufficient moisture");
            }
            
            recommendations.push("👀 Monitor soil moisture regularly - check again in 2-3 days");
            recommendations.push("🌱 Focus on other crop management practices like pest control and fertilization");
        }
        
        // General recommendations
        recommendations.push("📊 Check soil moisture 2-3 times per week");
        recommendations.push("🌡️ Monitor weather forecasts for rain predictions");
        recommendations.push("📈 Keep records of irrigation schedules and crop response");
        
        return recommendations;
    }

    function displayResult(prediction, confidence, cropType, soilMoisture, temperature, humidity, rainfall) {
        const { irrigationNeeded, recommendations } = prediction;
        
        // Update prediction text
        if (irrigationNeeded) {
            predictionText.innerHTML = '🚨 <span style="color: #e74c3c; font-weight: bold;">IRRIGATION NEEDED</span>';
        } else {
            predictionText.innerHTML = '✅ <span style="color: #27ae60; font-weight: bold;">NO IRRIGATION NEEDED</span>';
        }
        
        // Update confidence text
        const confidenceColor = confidence > 0.8 ? '#27ae60' : confidence > 0.6 ? '#f39c12' : '#e74c3c';
        confidenceText.innerHTML = `Confidence: <span style="color: ${confidenceColor}; font-weight: bold;">${(confidence * 100).toFixed(1)}%</span>`;
        
        // Display recommendations (use provided recommendations or generate them)
        const recs = recommendations || getRecommendations(cropType, soilMoisture, temperature, humidity, rainfall, irrigationNeeded, confidence);
        
        recommendationList.innerHTML = '';
        recs.forEach(rec => {
            const li = document.createElement('li');
            li.innerHTML = rec;
            recommendationList.appendChild(li);
        });
        
        // Show result card
        resultCard.classList.add('show');
        resultCard.scrollIntoView({ behavior: 'smooth' });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const cropType = document.getElementById('cropType').value;
        const soilMoisture = parseFloat(document.getElementById('soilMoisture').value);
        const temperature = parseFloat(document.getElementById('temperature').value);
        const humidity = parseFloat(document.getElementById('humidity').value);
        const rainfall = parseFloat(document.getElementById('rainfall').value);
        
        // Validate inputs
        if (!cropType || isNaN(soilMoisture) || isNaN(temperature) || isNaN(humidity) || isNaN(rainfall)) {
            alert('Please fill in all fields with valid values.');
            return;
        }
        
        if (soilMoisture < 0 || soilMoisture > 100) {
            alert('Soil moisture must be between 0 and 100%.');
            return;
        }
        
        if (temperature < -10 || temperature > 50) {
            alert('Temperature must be between -10°C and 50°C.');
            return;
        }
        
        if (humidity < 0 || humidity > 100) {
            alert('Humidity must be between 0 and 100%.');
            return;
        }
        
        if (rainfall < 0 || rainfall > 500) {
            alert('Rainfall must be between 0 and 500mm.');
            return;
        }
        
        // Show loading state
        predictBtn.disabled = true;
        loading.classList.add('show');
        resultCard.classList.remove('show');
        
        try {
            // Make prediction
            const prediction = await predictIrrigation(cropType, soilMoisture, temperature, humidity, rainfall);
            
            // Display result
            displayResult(prediction, prediction.confidence, cropType, soilMoisture, temperature, humidity, rainfall);
            
        } catch (error) {
            console.error('Prediction error:', error);
            alert(`An error occurred while making the prediction: ${error.message}. Please try again.`);
        } finally {
            // Hide loading state
            predictBtn.disabled = false;
            loading.classList.remove('show');
        }
    });

    // Add some helpful input validation and formatting
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Ensure positive values for most inputs
            if (this.id !== 'temperature' && this.value < 0) {
                this.value = 0;
            }
        });
    });

    // Add tooltips or help text for better UX
    const soilMoistureInput = document.getElementById('soilMoisture');
    soilMoistureInput.addEventListener('focus', function() {
        this.placeholder = '0-30%: Dry, 30-60%: Optimal, 60-100%: Wet';
    });
    
    soilMoistureInput.addEventListener('blur', function() {
        this.placeholder = 'e.g., 45.5';
    });

    // Add sample data button for testing
    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.type = 'button';
    sampleDataBtn.textContent = '📋 Load Sample Data';
    sampleDataBtn.style.cssText = `
        background: #17a2b8;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;
        font-size: 1rem;
    `;
    
    sampleDataBtn.addEventListener('click', function() {
        document.getElementById('cropType').value = 'Rice';
        document.getElementById('soilMoisture').value = '35.5';
        document.getElementById('temperature').value = '28.0';
        document.getElementById('humidity').value = '65.0';
        document.getElementById('rainfall').value = '8.5';
    });
    
    form.appendChild(sampleDataBtn);
});

