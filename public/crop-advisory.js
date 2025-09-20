document.addEventListener('DOMContentLoaded', () => {
    let currentLanguage = 'en';

    const translations = {
        en: {
            mainTitle: 'AI Powered Query Support for Farmers',
            mainSubtitle: '"Ask your farming questions and get instant answers & expert advisory"',
            loginButton: 'LOGIN',
            langEnglish: 'English',
            langHindi: 'हिन्दी',
            langMalayalam: 'മലയാളം',
            cropAdvisoryTitle: 'Crop Advisory with AI Prediction',
            cropAdvisorySubtitle: 'Get personalized crop recommendations based on your soil conditions and location',
            locationLabel: 'Location',
            cropTypeLabel: 'Preferred Crop Type',
            soilPhLabel: 'Soil pH (6.0 - 8.0)',
            nitrogenLabel: 'Nitrogen (N) mg/kg',
            phosphorusLabel: 'Phosphorus (P) mg/kg',
            potassiumLabel: 'Potassium (K) mg/kg',
            temperatureLabel: 'Average Temperature (°C)',
            humidityLabel: 'Humidity (%)',
            rainfallLabel: 'Annual Rainfall (mm)',
            areaLabel: 'Farm Area (acres)',
            getRecommendations: 'Get AI Recommendations',
            resetForm: 'Reset Form',
            close: 'Close',
            recommendationsTitle: 'AI Recommendations',
            newAnalysis: 'New Analysis',
        },
        hi: {
            mainTitle: 'किसानों के लिए एआई संचालित क्वेरी सहायता',
            mainSubtitle: '"अपने खेती के प्रश्न पूछें और तुरंत उत्तर और विशेषज्ञ सलाह प्राप्त करें"',
            loginButton: 'लॉग इन',
            langEnglish: 'English',
            langHindi: 'हिन्दी',
            langMalayalam: 'മലയാളം',
            cropAdvisoryTitle: 'फसल सलाह AI भविष्यवाणी के साथ',
            cropAdvisorySubtitle: 'अपनी मिट्टी की स्थिति और स्थान के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें',
            locationLabel: 'स्थान',
            cropTypeLabel: 'पसंदीदा फसल प्रकार',
            soilPhLabel: 'मिट्टी का pH (6.0 - 8.0)',
            nitrogenLabel: 'नाइट्रोजन (N) mg/kg',
            phosphorusLabel: 'फॉस्फोरस (P) mg/kg',
            potassiumLabel: 'पोटैशियम (K) mg/kg',
            temperatureLabel: 'औसत तापमान (°C)',
            humidityLabel: 'आर्द्रता (%)',
            rainfallLabel: 'वार्षिक वर्षा (mm)',
            areaLabel: 'खेत का क्षेत्रफल (एकड़)',
            getRecommendations: 'AI सिफारिशें प्राप्त करें',
            resetForm: 'फॉर्म रीसेट करें',
            close: 'बंद करें',
            recommendationsTitle: 'AI सिफारिशें',
            newAnalysis: 'नया विश्लेषण',
        },
        ml: {
            mainTitle: 'കർഷകർക്കുള്ള എഐ പവേർഡ് ക്വറി സപ്പോർട്ട്',
            mainSubtitle: '"നിങ്ങളുടെ விவசായ ചോദ്യങ്ങൾ ചോദിക്കൂ, തൽക്ഷണ ഉത്തരങ്ങളും വിദഗ്ദ്ധോപദേശവും നേടൂ"',
            loginButton: 'ലോഗിൻ',
            langEnglish: 'English',
            langHindi: 'हिन्दी',
            langMalayalam: 'മലയാളം',
            cropAdvisoryTitle: 'വിള ഉപദേശം AI പ്രവചനത്തോടെ',
            cropAdvisorySubtitle: 'നിങ്ങളുടെ മണ്ണിന്റെ അവസ്ഥയും സ്ഥലവും അടിസ്ഥാനമാക്കി വ്യക്തിഗത വിള ശുപാർശകൾ നേടുക',
            locationLabel: 'സ്ഥലം',
            cropTypeLabel: 'പ്രിയപ്പെട്ട വിള തരം',
            soilPhLabel: 'മണ്ണിന്റെ pH (6.0 - 8.0)',
            nitrogenLabel: 'നൈട്രജൻ (N) mg/kg',
            phosphorusLabel: 'ഫോസ്ഫറസ് (P) mg/kg',
            potassiumLabel: 'പൊട്ടാസ്യം (K) mg/kg',
            temperatureLabel: 'ശരാശരി താപനില (°C)',
            humidityLabel: 'ആർദ്രത (%)',
            rainfallLabel: 'വാർഷിക മഴ (mm)',
            areaLabel: 'കൃഷിഭൂമി വിസ്തീർണ്ണം (ഏക്കർ)',
            getRecommendations: 'AI ശുപാർശകൾ നേടുക',
            resetForm: 'ഫോം റീസെറ്റ് ചെയ്യുക',
            close: 'അടയ്ക്കുക',
            recommendationsTitle: 'AI ശുപാർശകൾ',
            newAnalysis: 'പുതിയ വിശകലനം',
        }
    };

    // --- ELEMENT SELECTIONS ---
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownOptions = document.querySelector('.dropdown-options');
    const selectedLangSpan = document.getElementById('selected-lang');
    const backToHomeBtn = document.getElementById('back-to-home');
    const cropForm = document.getElementById('crop-advisory-form');
    const resetFormBtn = document.getElementById('reset-form');
    const newAnalysisBtn = document.getElementById('new-analysis');

    // --- FUNCTIONS ---
    const setLanguage = (lang) => {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        const elements = document.querySelectorAll('[data-translate-key]');
        
        elements.forEach(el => {
            const key = el.dataset.translateKey;
            if (translations[lang] && translations[lang][key]) {
                if (key === 'mainSubtitle') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        
        selectedLangSpan.textContent = translations[lang][`lang${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
    };

    // --- EVENT LISTENERS ---
    dropdownButton.addEventListener('click', () => {
        dropdownOptions.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownButton.parentElement.contains(e.target)) {
            dropdownOptions.classList.remove('active');
        }
    });

    dropdownOptions.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const lang = e.target.dataset.lang;
            setLanguage(lang);
            dropdownOptions.classList.remove('active');
        }
    });

    backToHomeBtn.addEventListener('click', () => {
        window.close();
    });

    cropForm.addEventListener('submit', handleCropAdvisorySubmit);

    resetFormBtn.addEventListener('click', () => {
        cropForm.reset();
        document.getElementById('crop-results').classList.add('hidden');
    });

    newAnalysisBtn.addEventListener('click', () => {
        cropForm.reset();
        document.getElementById('crop-results').classList.add('hidden');
    });

    function handleCropAdvisorySubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const soilData = {
            soil_ph: parseFloat(formData.get('soilPh')),
            nitrogen: parseFloat(formData.get('nitrogen')),
            phosphorus: parseFloat(formData.get('phosphorus')),
            potassium: parseFloat(formData.get('potassium')),
            temperature: parseFloat(formData.get('temperature')),
            humidity: parseFloat(formData.get('humidity')),
            rainfall: parseFloat(formData.get('rainfall')),
            area: parseFloat(formData.get('area'))
        };
        
        const location = formData.get('location');
        const cropType = formData.get('cropType');
        
        // Show loading state
        showCropLoading();
        
        // Call the API
        fetch('/api/crop-advisory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                soilData: soilData,
                location: location,
                cropType: cropType
            })
        })
        .then(response => response.json())
        .then(data => {
            displayCropResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
            showCropError('Failed to get recommendations. Please try again.');
        });
    }

    function showCropLoading() {
        const resultsDiv = document.getElementById('crop-results');
        const predictionsDiv = document.getElementById('crop-predictions');
        
        resultsDiv.classList.remove('hidden');
        predictionsDiv.innerHTML = '<div class="loading">🔄 Analyzing your data with AI...</div>';
    }

    function displayCropResults(data) {
        const predictionsDiv = document.getElementById('crop-predictions');
        const adviceDiv = document.getElementById('crop-advice');
        
        // Display ML predictions
        let predictionsHTML = '<div class="prediction-section">';
        predictionsHTML += '<h4>🤖 AI Model Predictions</h4>';
        
        if (data.mlPrediction && data.mlPrediction.prediction) {
            predictionsHTML += '<div class="prediction-item">';
            predictionsHTML += '<strong>Recommended Crops:</strong> ';
            predictionsHTML += Array.isArray(data.mlPrediction.prediction) 
                ? data.mlPrediction.prediction.join(', ') 
                : data.mlPrediction.prediction;
            predictionsHTML += '</div>';
        }
        
        if (data.recommendations) {
            predictionsHTML += '<div class="recommendation-grid">';
            predictionsHTML += `<div class="rec-item"><strong>Best Crops:</strong> ${data.recommendations.bestCrops.join(', ')}</div>`;
            predictionsHTML += `<div class="rec-item"><strong>Planting Season:</strong> ${data.recommendations.plantingSeason}</div>`;
            predictionsHTML += `<div class="rec-item"><strong>Soil Preparation:</strong> ${data.recommendations.soilPreparation}</div>`;
            predictionsHTML += `<div class="rec-item"><strong>Fertilizer:</strong> ${data.recommendations.fertilizer}</div>`;
            predictionsHTML += `<div class="rec-item"><strong>Irrigation:</strong> ${data.recommendations.irrigation}</div>`;
            predictionsHTML += `<div class="rec-item"><strong>Pest Management:</strong> ${data.recommendations.pestManagement}</div>`;
            predictionsHTML += '</div>';
        }
        
        predictionsHTML += '</div>';
        predictionsDiv.innerHTML = predictionsHTML;
        
        // Display AI advice
        if (data.aiAdvice) {
            adviceDiv.innerHTML = `
                <div class="advice-section">
                    <h4>🧠 Expert AI Advice</h4>
                    <div class="advice-content">${data.aiAdvice}</div>
                </div>
            `;
        }
    }

    function showCropError(message) {
        const predictionsDiv = document.getElementById('crop-predictions');
        predictionsDiv.innerHTML = `<div class="error">❌ ${message}</div>`;
    }

    // --- INITIALIZATION ---
    setLanguage('en');
});

