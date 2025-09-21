document.addEventListener('DOMContentLoaded', () => {

    
    // --- 3D Tilt Effect ---
const mainContent = document.querySelector('.main-content');

mainContent.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = mainContent.getBoundingClientRect();
    const mouseX = e.clientX - left; // Mouse X position inside the element
    const mouseY = e.clientY - top;  // Mouse Y position inside the element

    const centerX = width / 2;
    const centerY = height / 2;

    const maxRotation = 10; // The maximum degrees it will tilt

    // Calculate the rotation based on mouse position from the center
    const rotateX = ((mouseY - centerY) / centerY) * -maxRotation;
    const rotateY = ((mouseX - centerX) / centerX) * maxRotation;

    // Apply the 3D rotation
    mainContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset the tilt when the mouse leaves the element
mainContent.addEventListener('mouseleave', () => {
    mainContent.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
    

        let currentLanguage = 'en';

        const translations = {
            en: {
                // Static Page Text and About Section
                mainTitle: 'AI Powered Query Support for Farmers',
                mainSubtitle: '"Ask your farming questions and get instant answers & expert advisory"',
                navHome: 'HOME',
                navAbout: 'ABOUT',
                navContact: 'CONTACT',
                navQuery: 'QUERY',
                loginButton: 'LOGIN',
                tabAgri: 'AGRICULTURE',
                tabAnimal: 'Animal Husbandry',
                gridCrop: 'CROP ADVISORY',
                gridPest: 'PEST PREVENTION ADVISORY',
                gridIrrigation: 'IRRIGATION GUIDE',
                gridMarket: 'MARKET PRICES UPDATES',
                gridChart: 'PREVIOUS YEARS CHART',
                gridWeather: 'WEATHER FORECAST',
                gridOthers: 'OTHERS...',
                searchPlaceholder: 'Search',
                langEnglish: 'English',
                langHindi: 'हिन्दी',
                langMalayalam: 'മലയാളം',
                chatHeader: 'AI Assistant',
                aboutTitle: 'About Us',
                aboutIntro: 'Our platform, AI Powered Query Support for Farmers, is designed to empower farmers with instant, reliable, and personalized agricultural guidance. We combine the strength of Artificial Intelligence with expert agricultural knowledge to address the day-to-day challenges faced by farmers.',
                aboutSubIntro: 'Through our system, farmers can ask questions in their own language and receive precise, easy-to-understand answers tailored to their soil, crop, and weather conditions.',
                aboutFeaturesTitle: 'Our Key Features',
                featureCropTitle: 'Crop Advisory',
                featureCropText: 'Get expert recommendations on crop selection, cultivation practices, and harvesting techniques.',
                featurePestTitle: 'Pest Prevention',
                featurePestText: 'Early detection and prevention tips to protect crops from pests and diseases.',
                featureIrrigationTitle: 'Irrigation Guide',
                featureIrrigationText: 'Smart irrigation strategies based on crop type and weather conditions.',
                featureMarketTitle: 'Market Prices',
                featureMarketText: 'Stay updated with real-time market prices to maximize profits.',
                featureChartTitle: 'Previous Years Chart',
                featureChartText: 'Analyze past crop and market trends for better planning.',
                featureOthersTitle: 'Others',
                featureOthersText: 'Additional support like fertilizer guidance, soil health tips, and government schemes.',
                aboutWhyUsTitle: 'Why Choose Us?',
                whyLanguageTitle: 'Multi-Language Support',
                whyLanguageText: 'Farmers can interact in their local language.',
                whyChatbotTitle: 'AI-Powered Chatbot',
                whyChatbotText: 'Provides instant query resolution with expert-backed responses.',
                whyPersonalizedTitle: 'Personalized Advisory',
                whyPersonalizedText: 'Recommendations tailored to specific soil, crop, and weather data.',
                whyImageTitle: 'Image Recognition',
                whyImageText: 'Detect plant diseases via image input.',
                aboutMission: 'Our mission is to bridge the gap between technology and agriculture, making farming more efficient, profitable, and sustainable for every farmer.',
                
                // Dynamic Content for Info Panel
                infoDisplayContent: {
                    crop: { title: 'Crop Advisory', text: 'Get expert advice on planting seasons, soil preparation, and cultivation techniques for a variety of crops to maximize your yield.'},
                    pest: { title: 'Pest Prevention', text: 'Learn about common agricultural pests and diseases. Find organic and effective methods for prevention and treatment to protect your harvest.'},
                    irrigation: { title: 'Irrigation Guide', text: 'Discover efficient watering schedules and techniques. Our guide helps you conserve water while ensuring your crops get the hydration they need.'},
                    market: { title: 'Market Price Updates', text: 'Stay informed with real-time market prices for various crops in your region. Make informed decisions about when and where to sell your produce.'},
                    chart: { title: 'Previous Years Chart', text: 'Analyze historical data on crop yields, prices, and weather patterns. Use this information to forecast trends and plan for future seasons.'},
                    others: { title: 'Other Resources', text: 'Explore additional resources, government schemes, and community forums. Connect with other farmers and experts in the agricultural sector.'}
                },
                
                // Crop Advisory Form Translations
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
                close: 'Close',
                recommendationsTitle: 'AI Recommendations',
                newAnalysis: 'New Analysis',
                
                // Contact Section Text
                contactTitle: 'We are here for you, contact us at <span class="highlight">anytime</span>',
                contactSubtitle: 'Have any questions about our services or just want to talk with us? Please reach out.',
                contactChatTitle: 'Chat Now',
                contactChatText: 'Right from this website',
                contactChatButton: 'Start chat →',
                contactEmailTitle: 'Email Us',
                contactEmailText: 'From your email app',
                // contactEmailLink: 'singh.angadd755@gmail.com',
                contactCallTitle: 'Call or text us',
                contactCallText: 'From your phone',
                contactPhoneLink: '9888090755',
                contactFooter: 'We’ll get back to you as soon as possible. Our team is available 8am-6pm on weekdays.',
            },
            hi: {
                // All Hindi translations
                mainTitle: 'किसानों के लिए एआई संचालित क्वेरी सहायता',
                mainSubtitle: '"अपने खेती के प्रश्न पूछें और तुरंत उत्तर और विशेषज्ञ सलाह प्राप्त करें"',
                navHome: 'होम',
                navAbout: 'हमारे बारे में',
                navContact: 'संपर्क करें',
                navQuery: 'प्रश्न',
                loginButton: 'लॉग इन',
                tabAgri: 'कृषि',
                tabAnimal: 'पशुपालन',
                gridCrop: 'फसल सलाह',
                gridPest: 'कीट रोकथाम सलाह',
                gridIrrigation: 'सिंचाई गाइड',
                gridMarket: 'बाजार मूल्य अपडेट',
                gridChart: 'पिछले वर्षों का चार्ट',
                gridWeather: 'मौसम पूर्वानुमान',
                gridOthers: 'अन्य...',
                searchPlaceholder: 'खोजें',
                langEnglish: 'English',
                langHindi: 'हिन्दी',
                langMalayalam: 'മലയാളം',
                chatHeader: 'एआई सहायक',
                infoDisplayContent: {
                    crop: { title: 'फसल सलाह', text: 'अपनी उपज को अधिकतम करने के लिए विभिन्न प्रकार की फसलों के लिए रोपण के मौसम, मिट्टी की तैयारी और खेती की तकनीकों पर विशेषज्ञ सलाह प्राप्त करें।'},
                    pest: { title: 'कीट की रोकथाम', text: 'आम कृषि कीटों और बीमारियों के बारे में जानें। अपनी फसल की सुरक्षा के लिए रोकथाम और उपचार के लिए जैविक और प्रभावी तरीके खोजें।'},
                    irrigation: { title: 'सिंचाई गाइड', text: 'कुशल पानी देने के कार्यक्रम और तकनीकों की खोज करें। हमारी मार्गदर्शिका आपके फसलों को आवश्यक जलयोजन सुनिश्चित करते हुए पानी बचाने में मदद करती है।'},
                    market: { title: 'बाजार मूल्य अपडेट', text: 'अपने क्षेत्र में विभिन्न फसलों के लिए वास्तविक समय के बाजार मूल्यों से अवगत रहें। अपनी उपज कब और कहाँ बेचनी है, इसके बारे में सूचित निर्णय लें।'},
                    chart: { title: 'पिछले वर्षों का चार्ट', text: 'फसल की पैदावार, कीमतों और मौसम के पैटर्न पर ऐतिहासिक डेटा का विश्लेषण करें। रुझानों का पूर्वानुमान लगाने और भविष्य के मौसमों की योजना बनाने के लिए इस जानकारी का उपयोग करें।'},
                    others: { title: 'अन्य संसाधन', text: 'अतिरिक्त संसाधनों, सरकारी योजनाओं और सामुदायिक मंचों का अन्वेषण करें। कृषि क्षेत्र के अन्य किसानों और विशेषज्ञों से जुड़ें।'}
                },
                aboutTitle: 'हमारे बारे में',
                aboutIntro: 'हमारा प्लेटफ़ॉर्म, किसानों के लिए एआई संचालित क्वेरी सपोर्ट, किसानों को तत्काल, विश्वसनीय और व्यक्तिगत कृषि मार्गदर्शन के साथ सशक्त बनाने के लिए डिज़ाइन किया गया है। हम किसानों के सामने आने वाली दिन-प्रतिदिन की चुनौतियों का समाधान करने के लिए विशेषज्ञ कृषि ज्ञान के साथ आर्टिफिशियल इंटेलिजेंस की ताकत को जोड़ते हैं।',
                aboutSubIntro: 'हमारे सिस्टम के माध्यम से, किसान अपनी भाषा में प्रश्न पूछ सकते हैं और अपनी मिट्टी, फसल और मौसम की स्थिति के अनुरूप सटीक, आसानी से समझ में आने वाले उत्तर प्राप्त कर सकते हैं।',
                aboutFeaturesTitle: 'हमारी मुख्य विशेषताएं',
                featureCropTitle: 'फसल सलाह',
                featureCropText: 'फसल चयन, खेती प्रथाओं और कटाई तकनीकों पर विशेषज्ञ सिफारिशें प्राप्त करें।',
                featurePestTitle: 'कीट की रोकथाम',
                featurePestText: 'फसलों को कीटों और बीमारियों से बचाने के लिए शीघ्र पहचान और रोकथाम के उपाय।',
                featureIrrigationTitle: 'सिंचाई गाइड',
                featureIrrigationText: 'फसल के प्रकार और मौसम की स्थिति के आधार पर स्मार्ट सिंचाई रणनीतियाँ।',
                featureMarketTitle: 'बाजार मूल्य',
                featureMarketText: 'मुनाफे को अधिकतम करने के लिए वास्तविक समय के बाजार मूल्यों से अपडेट रहें।',
                featureChartTitle: 'पिछले वर्षों का चार्ट',
                featureChartText: 'बेहतर योजना के लिए पिछले फसल और बाजार के रुझानों का विश्लेषण करें।',
                featureOthersTitle: 'अन्य',
                featureOthersText: 'उर्वरक मार्गदर्शन, मिट्टी स्वास्थ्य युक्तियाँ और सरकारी योजनाओं जैसी अतिरिक्त सहायता।',
                aboutWhyUsTitle: 'हमें क्यों चुनें?',
                whyLanguageTitle: 'बहु-भाषा समर्थन',
                whyLanguageText: 'किसान अपनी स्थानीय भाषा में बातचीत कर सकते हैं।',
                whyChatbotTitle: 'एआई-पावर्ड चैटबॉट',
                whyChatbotText: 'विशेषज्ञ-समर्थित प्रतिक्रियाओं के साथ तत्काल क्वेरी समाधान प्रदान करता है।',
                whyPersonalizedTitle: 'व्यक्तिगत सलाह',
                whyPersonalizedText: 'विशिष्ट मिट्टी, फसल और मौसम डेटा के अनुरूप सिफारिशें।',
                whyImageTitle: 'छवि पहचान',
                whyImageText: 'छवि इनपुट के माध्यम से पौधों की बीमारियों का पता लगाएं।',
                aboutMission: 'हमारा मिशन प्रौद्योगिकी और कृषि के बीच की खाई को पाटना है, जिससे हर किसान के लिए खेती अधिक कुशल, लाभदायक और टिकाऊ हो सके।',
                contactTitle: 'हम आपके लिए यहाँ हैं, किसी भी समय हमसे <span class="highlight">संपर्क करें</span>',
                contactSubtitle: 'क्या आपके पास हमारी सेवाओं के बारे में कोई प्रश्न हैं या आप हमसे बात करना चाहते हैं? कृपया हमसे संपर्क करें।',
                contactChatTitle: 'अभी चैट करें',
                contactChatText: 'सीधे इस वेबसाइट से',
                contactChatButton: 'चैट शुरू करें →',
                contactEmailTitle: 'हमें ईमेल करें',
                contactEmailText: 'आपके ईमेल ऐप से',
                contactEmailLink: 'हमें एक ईमेल भेजें',
                contactCallTitle: 'हमें कॉल या टेक्स्ट करें',
                contactCallText: 'आपके फोन से',
                contactPhoneLink: '9888090755',
                contactFooter: 'हम जल्द से जल्द आपसे संपर्क करेंगे। हमारी टीम सप्ताह के दिनों में सुबह 8 बजे से शाम 6 बजे तक उपलब्ध है।',
                
                // Crop Advisory Form Translations (Hindi)
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
                close: 'बंद करें',
                recommendationsTitle: 'AI सिफारिशें',
                newAnalysis: 'नया विश्लेषण',
            },
            ml: {
                // All Malayalam translations
                mainTitle: 'കർഷകർക്കുള്ള എഐ പവേർഡ് ക്വറി സപ്പോർട്ട്',
                mainSubtitle: '"നിങ്ങളുടെ விவசாய ചോദ്യങ്ങൾ ചോദിക്കൂ, തൽക്ഷണ ഉത്തരങ്ങളും വിദഗ്ദ്ധോപദേശവും നേടൂ"',
                navHome: 'ഹോം',
                navAbout: 'ഞങ്ങളെക്കുറിച്ച്',
                navContact: 'ബന്ധപ്പെടുക',
                navQuery: 'ചോദ്യം',
                loginButton: 'ലോഗിൻ',
                tabAgri: 'കൃഷി',
                tabAnimal: 'മൃഗസംരക്ഷണം',
                gridCrop: 'വിള ഉപദേശം',
                gridPest: 'കീട പ്രതിരോധ ഉപദേശം',
                gridIrrigation: 'ജലസേചന ഗൈഡ്',
                gridMarket: 'വിപണി വില അപ്ഡേറ്റുകൾ',
                gridChart: 'മുൻ വർഷങ്ങളിലെ ചാർട്ട്',
                gridWeather: 'കാലാവസ്ഥ പ്രവചനം',
                gridOthers: 'മറ്റുള്ളവ...',
                searchPlaceholder: 'തിരയുക',
                langEnglish: 'English',
                langHindi: 'हिन्दी',
                langMalayalam: 'മലയാളം',
                chatHeader: 'എഐ അസിസ്റ്റന്റ്',
                infoDisplayContent: {
                    crop: { title: 'വിള ഉപദേശം', text: 'നിങ്ങളുടെ വിളവ് വർദ്ധിപ്പിക്കുന്നതിന് വൈവിധ്യമാർന്ന വിളകൾക്കായി നടീൽ സീസണുകൾ, മണ്ണ് ഒരുക്കൽ, കൃഷി രീതികൾ എന്നിവയെക്കുറിച്ചുള്ള വിദഗ്ദ്ധോപദേശം നേടുക.'},
                    pest: { title: 'കീട പ്രതിരോധം', text: 'സാധാരണ കാർഷിക കീടങ്ങളെയും രോഗങ്ങളെയും കുറിച്ച് അറിയുക. നിങ്ങളുടെ വിളവെടുപ്പ് സംരക്ഷിക്കുന്നതിനുള്ള പ്രതിരോധത്തിനും ചികിത്സയ്ക്കുമായി ജൈവപരവും ഫലപ്രദവുമായ മാർഗ്ഗങ്ങൾ കണ്ടെത്തുക.'},
                    irrigation: { title: 'ജലസേചന ഗൈഡ്', text: 'കാര്യക്ഷമമായ നനവ് ഷെഡ്യൂളുകളും സാങ്കേതികതകളും കണ്ടെത്തുക. നിങ്ങളുടെ വിളകൾക്ക് ആവശ്യമായ ജലാംശം ലഭിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കിക്കൊണ്ട് വെള്ളം സംരക്ഷിക്കാൻ ഞങ്ങളുടെ ഗൈഡ് നിങ്ങളെ സഹായിക്കുന്നു.'},
                    market: { title: 'വിപണി വില അപ്ഡേറ്റുകൾ', text: 'നിങ്ങളുടെ പ്രദേശത്തെ വിവിധ വിളകളുടെ തത്സമയ മാർക്കറ്റ് വിലകൾ ഉപയോഗിച്ച് അപ്ഡേറ്റ് ചെയ്യുക. നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ എപ്പോൾ, എവിടെ വിൽക്കണം എന്നതിനെക്കുറിച്ച് അറിവുള്ള തീരുമാനങ്ങൾ എടുക്കുക.'},
                    chart: { title: 'മുൻ വർഷങ്ങളിലെ ചാർട്ട്', text: 'വിളവ്, വില, കാലാവസ്ഥാ രീതികൾ എന്നിവയുടെ ചരിത്രപരമായ ഡാറ്റ വിശകലനം ചെയ്യുക. പ്രവണതകൾ പ്രവചിക്കുന്നതിനും ഭാവി സീസണുകൾക്കായി ആസൂത്രണം ചെയ്യുന്നതിനും ഈ വിവരങ്ങൾ ഉപയോഗിക്കുക.'},
                    others: { title: 'മറ്റ് വിഭവങ്ങൾ', text: 'അധിക വിഭവങ്ങൾ, സർക്കാർ പദ്ധതികൾ, കമ്മ്യൂണിറ്റി ഫോറങ്ങൾ എന്നിവ പര്യവേക്ഷണം ചെയ്യുക. കാർഷിക മേഖലയിലെ മറ്റ് കർഷകരുമായും വിദഗ്ധരുമായും ബന്ധപ്പെടുക.'}
                },
                aboutTitle: 'ഞങ്ങളെക്കുറിച്ച്',
                aboutIntro: 'കർഷകർക്ക് തൽക്ഷണവും വിശ്വസനീയവും വ്യക്തിഗതവുമായ കാർഷിക മാർഗ്ഗനിർദ്ദേശം നൽകുന്നതിനായി രൂപകൽപ്പന ചെയ്തിട്ടുള്ളതാണ് ഞങ്ങളുടെ പ്ലാറ്റ്ഫോം. കർഷകർ നേരിടുന്ന ദൈനംദിന വെല്ലുവിളികളെ അഭിമുഖീകരിക്കുന്നതിന് ഞങ്ങൾ ആർട്ടിഫിഷ്യൽ ഇൻ്റലിജൻസിൻ്റെ ശക്തിയെ വിദഗ്ദ്ധ കാർഷിക പരിജ്ഞാനവുമായി സംയോജിപ്പിക്കുന്നു.',
                aboutSubIntro: 'ഞങ്ങളുടെ സിസ്റ്റത്തിലൂടെ, കർഷകർക്ക് അവരുടെ സ്വന്തം ഭാഷയിൽ ചോദ്യങ്ങൾ ചോദിക്കാനും അവരുടെ മണ്ണ്, വിള, കാലാവസ്ഥ എന്നിവയ്ക്ക് അനുയോജ്യമായ കൃത്യവും മനസ്സിലാക്കാൻ എളുപ്പമുള്ളതുമായ ഉത്തരങ്ങൾ സ്വീകരിക്കാനും കഴിയും.',
                aboutFeaturesTitle: 'ഞങ്ങളുടെ പ്രധാന സവിശേഷതകൾ',
                featureCropTitle: 'വിള ഉപദേശം',
                featureCropText: 'വിള തിരഞ്ഞെടുക്കൽ, കൃഷിരീതികൾ, വിളവെടുപ്പ് രീതികൾ എന്നിവയെക്കുറിച്ചുള്ള വിദഗ്ദ്ധ ശുപാർശകൾ നേടുക.',
                featurePestTitle: 'കീട പ്രതിരോധം',
                featurePestText: 'വിളകളെ കീടങ്ങളിൽ നിന്നും രോഗങ്ങളിൽ നിന്നും സംരക്ഷിക്കുന്നതിനുള്ള മുൻകൂട്ടിയുള്ള കണ്ടെത്തലും പ്രതിരോധ നുറുങ്ങുകളും.',
                featureIrrigationTitle: 'ജലസേചന ഗൈഡ്',
                featureIrrigationText: 'വിളയുടെ തരവും കാലാവസ്ഥയും അടിസ്ഥാനമാക്കിയുള്ള സ്മാർട്ട് ജലസേചന തന്ത്രങ്ങൾ.',
                featureMarketTitle: 'വിപണി വില',
                featureMarketText: 'ലാഭം വർദ്ധിപ്പിക്കുന്നതിന് തത്സമയ വിപണി വിലകൾ ഉപയോഗിച്ച് അപ്ഡേറ്റ് ചെയ്യുക.',
                featureChartTitle: 'മുൻ വർഷങ്ങളിലെ ചാർട്ട്',
                featureChartText: 'മെച്ചപ്പെട്ട ആസൂത്രണത്തിനായി കഴിഞ്ഞ വിളയുടെയും വിപണിയുടെയും പ്രവണതകൾ വിശകലനം ചെയ്യുക.',
                featureOthersTitle: 'മറ്റുള്ളവ',
                featureOthersText: 'വളം മാർഗ്ഗനിർദ്ദേശം, മണ്ണിൻ്റെ ആരോഗ്യ നുറുങ്ങുകൾ, സർക്കാർ പദ്ധതികൾ എന്നിവ പോലുള്ള അധിക പിന്തുണ.',
                aboutWhyUsTitle: 'എന്തുകൊണ്ട് ഞങ്ങളെ തിരഞ്ഞെടുക്കണം?',
                whyLanguageTitle: 'ബഹുഭാഷാ പിന്തുണ',
                whyLanguageText: 'കർഷകർക്ക് അവരുടെ പ്രാദേശിക ഭാഷയിൽ സംവദിക്കാം.',
                whyChatbotTitle: 'എഐ-പവേർഡ് ചാറ്റ്ബോട്ട്',
                whyChatbotText: 'വിദഗ്ദ്ധ പിന്തുണയുള്ള പ്രതികരണങ്ങളോടെ തൽക്ഷണ ചോദ്യ പരിഹാരം നൽകുന്നു.',
                whyPersonalizedTitle: 'വ്യക്തിഗത ഉപദേശം',
                whyPersonalizedText: 'പ്രത്യേക മണ്ണ്, വിള, കാലാവസ്ഥാ ഡാറ്റ എന്നിവയ്ക്ക് അനുയോജ്യമായ ശുപാർശകൾ.',
                whyImageTitle: 'ചിത്രം തിരിച്ചറിയൽ',
                whyImageText: 'ചിത്രം ഇൻപുട്ട് വഴി സസ്യരോഗങ്ങൾ കണ്ടെത്തുക.',
                aboutMission: 'സാങ്കേതികവിദ്യയും കൃഷിയും തമ്മിലുള്ള അന്തരം നികത്തുക, ഓരോ കർഷകനും കൃഷി കൂടുതൽ കാര്യക്ഷമവും ലാഭകരവും സുസ്ഥിരവുമാക്കുക എന്നതാണ് ഞങ്ങളുടെ ദൗത്യം.',
                contactTitle: 'ഞങ്ങൾ നിങ്ങൾക്കായി ഇവിടെയുണ്ട്, എപ്പോൾ വേണമെങ്കിലും ഞങ്ങളെ <span class="highlight">ബന്ധപ്പെടുക</span>',
                contactSubtitle: 'ഞങ്ങളുടെ സേവനങ്ങളെക്കുറിച്ച് എന്തെങ്കിലും ചോദ്യങ്ങളുണ്ടോ അല്ലെങ്കിൽ ഞങ്ങളുമായി സംസാരിക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ? ദയവായി ബന്ധപ്പെടുക.',
                contactChatTitle: 'ഇപ്പോൾ ചാറ്റ് ചെയ്യുക',
                contactChatText: 'ഈ വെബ്സൈറ്റിൽ നിന്ന് നേരിട്ട്',
                contactChatButton: 'ചാറ്റ് ആരംഭിക്കുക →',
                contactEmailTitle: 'ഞങ്ങൾക്ക് ഇമെയിൽ അയക്കുക',
                contactEmailText: 'നിങ്ങളുടെ ഇമെയിൽ അപ്ലിക്കേഷനിൽ നിന്ന്',
                contactEmailLink: 'ഞങ്ങൾക്ക് ഒരു ഇമെയിൽ അയയ്ക്കുക',
                contactCallTitle: 'വിളിക്കുക അല്ലെങ്കിൽ ടെക്സ്റ്റ് ചെയ്യുക',
                contactCallText: 'നിങ്ങളുടെ ഫോണിൽ നിന്ന്',
                contactPhoneLink: '9888090755',
                contactFooter: 'ഞങ്ങൾ എത്രയും പെട്ടെന്ന് നിങ്ങളെ ബന്ധപ്പെടും. ഞങ്ങളുടെ ടീം പ്രവൃത്തി ദിവസങ്ങളിൽ രാവിലെ 8 മുതൽ വൈകുന്നേരം 6 വരെ ലഭ്യമാണ്.',
                
                // Crop Advisory Form Translations (Malayalam)
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
                close: 'അടയ്ക്കുക',
                recommendationsTitle: 'AI ശുപാർശകൾ',
                newAnalysis: 'പുതിയ വിശകലനം',
            }
        };
        
        // --- ELEMENT SELECTIONS ---
        const dropdownButton = document.querySelector('.dropdown-button');
        const dropdownOptions = document.querySelector('.dropdown-options');
        const selectedLangSpan = document.getElementById('selected-lang');
        const homeButton = document.getElementById('nav-home-button');
        const aboutButton = document.getElementById('nav-about-button');
        const contactButton = document.getElementById('nav-contact-button');
        const aboutSection = document.getElementById('about-section');
        const contactSection = document.getElementById('contact-section');
        const navButtons = document.querySelectorAll('.nav-button');
        const tabButtons = document.querySelectorAll('.tab-button');
        const gridItems = document.querySelectorAll('.grid-item');
        const infoTitle = document.getElementById('info-title');
        const infoText = document.getElementById('info-text');
        const infoDisplay = document.getElementById('info-display');
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const chatContainer = document.querySelector('.chat-container');
        // const chatBubble = document.querySelector('.chat-bubble');
        const chatBubble = document.querySelector('.chat-bar');
        const chatCloseBtn = document.querySelector('.chat-close');
        const chatMessages = document.querySelector('.chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatSendBtn = document.getElementById('chat-send-btn');

        // --- FUNCTIONS ---
        const setLanguage = (lang) => {
            currentLanguage = lang;
            document.documentElement.lang = lang;
            const elements = document.querySelectorAll('[data-translate-key]');
            
            elements.forEach(el => {
                const key = el.dataset.translateKey;
                if (translations[lang] && translations[lang][key]) {
                    if (key === 'contactTitle') {
                        el.innerHTML = translations[lang][key];
                    } else {
                        el.textContent = translations[lang][key];
                    }
                }
            });
            
            selectedLangSpan.textContent = translations[lang][lang`${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
            searchInput.placeholder = translations[lang].searchPlaceholder;
        };

        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            let highlightedElements = [];

            document.querySelectorAll('.search-highlight').forEach(el => el.classList.remove('search-highlight'));

            if (query === '') return;

            const contentElements = document.querySelectorAll('p, h1, h2, h3, li, strong, span');
            let firstMatch = null;

            contentElements.forEach(el => {
                if (el.textContent.toLowerCase().includes(query) && el.offsetParent !== null) {
                    highlightedElements.push(el);
                    el.classList.add('search-highlight');
                    if (!firstMatch) firstMatch = el;
                }
            });

            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    highlightedElements.forEach(el => el.classList.remove('search-highlight'));
                }, 2500);
            } else {
                alert('Text not found.');
            }
        };

        const addWelcomeMessage = () => {
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot-message');
            botMessage.textContent = "Hello! How can I help you with your farming questions today?";
            chatMessages.appendChild(botMessage);
        };

        let sessionId = null; // store chat session

    const getBotResponse = async (userMessage) => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    lang: currentLanguage,
                    sessionId: sessionId
                })
            });

            const data = await res.json();
            if (data.error) {
                return "⚠ " + data.error;
            }

            sessionId = data.sessionId; // save session for continuity
            return data.reply;
        } catch (err) {
            console.error("Chat fetch error:", err);
            return "⚠ Unable to connect to server.";
        }
    };

        const sendMessage = async () => {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        // user message
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user-message');
        userMessage.textContent = messageText;
        chatMessages.appendChild(userMessage);

        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // show loading
        const loadingMessage = document.createElement('div');
        loadingMessage.classList.add('message', 'bot-message', 'loading');
        loadingMessage.textContent = "Typing...";
        chatMessages.appendChild(loadingMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const botResponseText = await getBotResponse(messageText);

            // remove loading
            chatMessages.removeChild(loadingMessage);

            // add bot response
            const botMessage = document.createElement('div');
            botMessage.classList.add('message', 'bot-message');
            botMessage.textContent = botResponseText;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Auto-speak bot response if voice output is enabled
            autoSpeakBotResponse(botResponseText);
        } catch (err) {
            chatMessages.removeChild(loadingMessage);
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('message', 'bot-message');
            errorMessage.textContent = "⚠ Error fetching reply.";
            chatMessages.appendChild(errorMessage);
        }
    };

        // --- EVENT LISTENERS ---
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); performSearch(); }
        });

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
        
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // e.preventDefault(); This was removed in a previous step to allow the QUERY link to work
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const targetId = button.dataset.target;
                const allGrids = document.querySelectorAll('.grid-container');
                
                allGrids.forEach(grid => grid.classList.remove('active'));
                
                const targetGrid = document.querySelector(targetId);
                if (targetGrid) targetGrid.classList.add('active');
            });
        });

        gridItems.forEach(item => {
            item.addEventListener('click', () => {
                aboutSection.classList.add('hidden');
                contactSection.classList.add('hidden');
                const key = item.dataset.key;
                
                // Special handling for crop advisory - open in new page
                if (key === 'crop') {
                    window.open('crop-advisory.html', '_blank');
                    return;
                }
                
                // Special handling for pest detection - open in new page
                if (key === 'pest') {
                    window.open('pest-detection.html', '_blank');
                    return;
                }
                
                const content = translations[currentLanguage].infoDisplayContent[key];
                
                if (content) {
                    infoTitle.textContent = content.title;
                    infoText.textContent = content.text;
                    infoDisplay.classList.remove('hidden');
                    infoDisplay.scrollIntoView({ behavior: 'smooth' });
                    gridItems.forEach(grid => grid.classList.remove('active-item'));
                    item.classList.add('active-item');
                }
            });
        });
        
        aboutButton.addEventListener('click', (e) => {
            e.preventDefault();
            infoDisplay.classList.add('hidden');
            contactSection.classList.add('hidden');
            aboutSection.classList.remove('hidden');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });

        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            infoDisplay.classList.add('hidden');
            aboutSection.classList.add('hidden');
            contactSection.classList.remove('hidden');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });

        homeButton.addEventListener('click', (e) => {
            e.preventDefault();
            infoDisplay.classList.add('hidden');
            aboutSection.classList.add('hidden');
            contactSection.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // chatBubble.addEventListener('click', () => {
        //     chatContainer.classList.add('active');
        //     if (chatMessages.children.length === 0) {
        //         addWelcomeMessage();
        //     }
        // });

        // chatCloseBtn.addEventListener('click', () => {
        //     chatContainer.classList.remove('active');
        // });
        chatBubble.addEventListener('click', () => {
        const chatWindow = document.querySelector('.chat-window'); // Get at window element
        chatWindow.classList.add('active'); // Add active class to the
        chatBubble.style.display = 'none';
        if (chatMessages.children.length === 0) {
            addWelcomeMessage();
        }
    });

    chatCloseBtn.addEventListener('click', () => {
        const chatWindow = document.querySelector('.chat-window'); // Get the chat window element
        chatWindow.classList.remove('active'); // Remove active class from the window
        chatBubble.style.display = 'flex';
    });

        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { sendMessage(); }
        });

        // --- VOICE ASSISTANT FUNCTIONALITY ---
        const voiceInputBtn = document.getElementById('voice-input-btn');
        const voiceOutputBtn = document.getElementById('voice-output-btn');
        
        let recognition = null;
        let synthesis = window.speechSynthesis;
        let isListening = false;
        let isSpeaking = false;
        
        // Language codes for speech recognition and synthesis
        const voiceLanguages = {
            en: { recognition: 'en-US', synthesis: 'en-US' },
            hi: { recognition: 'hi-IN', synthesis: 'hi-IN' },
            ml: { recognition: 'ml-IN', synthesis: 'ml-IN' }
        };
        
        // Voice translations
        const voiceTranslations = {
            en: {
                listening: 'Listening...',
                speakNow: 'Speak now',
                notSupported: 'Voice recognition not supported',
                noSpeech: 'No speech detected. Please try again.',
                error: 'Voice recognition error',
                voiceOutput: 'Voice Output',
                voiceInput: 'Voice Input'
            },
            hi: {
                listening: 'सुन रहा हूं...',
                speakNow: 'अब बोलें',
                notSupported: 'वॉइस रिकॉग्निशन समर्थित नहीं है',
                noSpeech: 'कोई भाषण नहीं मिला। कृपया पुनः प्रयास करें।',
                error: 'वॉइस रिकॉग्निशन त्रुटि',
                voiceOutput: 'वॉइस आउटपुट',
                voiceInput: 'वॉइस इनपुट'
            },
            ml: {
                listening: 'കേൾക്കുന്നു...',
                speakNow: 'ഇപ്പോൾ സംസാരിക്കുക',
                notSupported: 'വോയ്സ് തിരിച്ചറിയൽ പിന്തുണയ്ക്കുന്നില്ല',
                noSpeech: 'ഒരു സംസാരവും കണ്ടെത്തിയില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.',
                error: 'വോയ്സ് തിരിച്ചറിയൽ പിഴവ്',
                voiceOutput: 'വോയ്സ് ഔട്ട്പുട്ട്',
                voiceInput: 'വോയ്സ് ഇൻപുട്ട്'
            }
        };
        
        // Initialize speech recognition
        function initSpeechRecognition() {
            if ('webkitSpeechRecognition' in window) {
                recognition = new webkitSpeechRecognition();
            } else if ('SpeechRecognition' in window) {
                recognition = new SpeechRecognition();
            } else {
                console.log('Speech recognition not supported');
                voiceInputBtn.style.display = 'none';
                return false;
            }
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            
            recognition.onstart = function() {
                isListening = true;
                voiceInputBtn.classList.add('listening');
                showVoiceStatus(voiceTranslations[currentLanguage].listening);
            };
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                chatInput.value = transcript;
                hideVoiceStatus();
                voiceInputBtn.classList.remove('listening');
                isListening = false;
                
                // Auto-send the message
                sendMessage();
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                hideVoiceStatus();
                voiceInputBtn.classList.remove('listening');
                isListening = false;
                
                let errorMessage = voiceTranslations[currentLanguage].error;
                if (event.error === 'no-speech') {
                    errorMessage = voiceTranslations[currentLanguage].noSpeech;
                }
                showVoiceStatus(errorMessage, true);
            };
            
            recognition.onend = function() {
                voiceInputBtn.classList.remove('listening');
                isListening = false;
                hideVoiceStatus();
            };
            
            return true;
        }
        
        // Start voice input
        function startVoiceInput() {
            if (!recognition) {
                if (!initSpeechRecognition()) {
                    alert(voiceTranslations[currentLanguage].notSupported);
                    return;
                }
            }
            
            if (isListening) {
                recognition.stop();
                return;
            }
            
            const lang = voiceLanguages[currentLanguage].recognition;
            recognition.lang = lang;
            recognition.start();
        }
        
        // Speak text
        function speakText(text) {
            if (isSpeaking) {
                synthesis.cancel();
                isSpeaking = false;
                voiceOutputBtn.classList.remove('speaking');
                return;
            }
            
            if (synthesis.speaking) {
                synthesis.cancel();
            }
            
            const utterance = new SpeechSynthesisUtterance(text);
            const lang = voiceLanguages[currentLanguage].synthesis;
            utterance.lang = lang;
            
            // Try to find a voice for the current language
            const voices = synthesis.getVoices();
            const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0])) || voices[0];
            if (voice) {
                utterance.voice = voice;
            }
            
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            utterance.onstart = function() {
                isSpeaking = true;
                voiceOutputBtn.classList.add('speaking');
            };
            
            utterance.onend = function() {
                isSpeaking = false;
                voiceOutputBtn.classList.remove('speaking');
            };
            
            utterance.onerror = function(event) {
                console.error('Speech synthesis error:', event.error);
                isSpeaking = false;
                voiceOutputBtn.classList.remove('speaking');
            };
            
            synthesis.speak(utterance);
        }
        
        // Show voice status
        function showVoiceStatus(message, isError = false) {
            let statusEl = document.querySelector('.voice-status');
            if (!statusEl) {
                statusEl = document.createElement('div');
                statusEl.className = 'voice-status';
                voiceInputBtn.appendChild(statusEl);
            }
            
            statusEl.textContent = message;
            statusEl.style.backgroundColor = isError ? '#ff6b6b' : '#4A4A4A';
            statusEl.classList.add('show');
            
            if (!isError) {
                setTimeout(() => {
                    hideVoiceStatus();
                }, 3000);
            }
        }
        
        // Hide voice status
        function hideVoiceStatus() {
            const statusEl = document.querySelector('.voice-status');
            if (statusEl) {
                statusEl.classList.remove('show');
            }
        }
        
        // Event listeners for voice functionality
        voiceInputBtn.addEventListener('click', startVoiceInput);
        
        voiceOutputBtn.addEventListener('click', () => {
            const lastBotMessage = document.querySelector('.bot-message:last-child');
            if (lastBotMessage) {
                const text = lastBotMessage.textContent;
                speakText(text);
            } else {
                showVoiceStatus('No message to speak', true);
            }
        });
        
        // Auto-speak bot responses
        function autoSpeakBotResponse(message) {
            if (voiceOutputBtn.classList.contains('active')) {
                setTimeout(() => {
                    speakText(message);
                }, 500);
            }
        }
        
        // Toggle voice output
        voiceOutputBtn.addEventListener('dblclick', () => {
            voiceOutputBtn.classList.toggle('active');
            const status = voiceOutputBtn.classList.contains('active') ? 'ON' : 'OFF';
            showVoiceStatus(`Voice Output ${status}`);
        });
        
        // Update voice translations when language changes
        function updateVoiceTranslations() {
            const lang = currentLanguage;
            const voiceTrans = voiceTranslations[lang] || voiceTranslations.en;
            
            voiceInputBtn.title = voiceTrans.voiceInput;
            voiceOutputBtn.title = voiceTrans.voiceOutput;
        }

        // --- WEATHER FUNCTIONALITY ---
        const weatherSection = document.getElementById('weather-section');
        const weatherCloseBtn = document.querySelector('.weather-close');
        const weatherSearchBtn = document.getElementById('weather-search-btn');
        const weatherLocationBtn = document.getElementById('weather-location-btn');
        const weatherCityInput = document.getElementById('weather-city-input');
        const weatherError = document.getElementById('weather-error');

        // Add weather translations
        const weatherTranslations = {
            en: {
                weatherTitle: 'Weather Forecast',
                weatherPlaceholder: 'Enter city name...',
                weatherSearch: 'Search',
                weatherLocation: 'Use My Location',
                weatherForecastTitle: '5-Day Forecast',
                weatherAdviceTitle: 'Agricultural Advice',
                weatherError: 'Unable to fetch weather data. Please check your internet connection and try again.'
            },
            hi: {
                weatherTitle: 'मौसम पूर्वानुमान',
                weatherPlaceholder: 'शहर का नाम दर्ज करें...',
                weatherSearch: 'खोजें',
                weatherLocation: 'मेरा स्थान उपयोग करें',
                weatherForecastTitle: '5-दिन का पूर्वानुमान',
                weatherAdviceTitle: 'कृषि सलाह',
                weatherError: 'मौसम डेटा प्राप्त करने में असमर्थ। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।'
            },
            ml: {
                weatherTitle: 'കാലാവസ്ഥ പ്രവചനം',
                weatherPlaceholder: 'നഗരത്തിന്റെ പേര് നൽകുക...',
                weatherSearch: 'തിരയുക',
                weatherLocation: 'എന്റെ സ്ഥാനം ഉപയോഗിക്കുക',
                weatherForecastTitle: '5-ദിവസ പ്രവചനം',
                weatherAdviceTitle: 'കൃഷി ഉപദേശം',
                weatherError: 'കാലാവസ്ഥ ഡാറ്റ ലഭിക്കാൻ കഴിയുന്നില്ല. ദയവായി നിങ്ങളുടെ ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക.'
            }
        };

        // Function to show weather section
        function showWeatherSection() {
            weatherSection.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        // Function to hide weather section
        function hideWeatherSection() {
            weatherSection.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Function to fetch weather data
        async function fetchWeatherData(city = null, lat = null, lon = null) {
            try {
                weatherError.classList.add('hidden');
                
                let url = '/api/weather?';
                if (lat && lon) {
                    url += `lat=${lat}&lon=${lon}`;
                } else if (city) {
                    url += `city=${encodeURIComponent(city)}`;
                } else {
                    throw new Error('No location provided');
                }

                const response = await fetch(url);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Weather data not available');
                }

                displayWeatherData(data);
            } catch (error) {
                console.error('Weather fetch error:', error);
                weatherError.classList.remove('hidden');
                weatherError.querySelector('p').textContent = error.message;
            }
        }

        // Function to fetch weather forecast
        async function fetchWeatherForecast(city = null, lat = null, lon = null) {
            try {
                let url = '/api/weather/forecast?';
                if (lat && lon) {
                    url += `lat=${lat}&lon=${lon}`;
                } else if (city) {
                    url += `city=${encodeURIComponent(city)}`;
                } else {
                    throw new Error('No location provided');
                }

                const response = await fetch(url);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Weather forecast not available');
                }

                displayWeatherForecast(data);
            } catch (error) {
                console.error('Weather forecast fetch error:', error);
            }
        }

        // Function to display weather data
        function displayWeatherData(data) {
            // Update current weather
            document.getElementById('weather-temp-value').textContent = data.temperature.current;
            document.getElementById('weather-desc').textContent = data.weather.description;
            document.getElementById('weather-feels-like').textContent = `${data.temperature.feelsLike}°C`;
            document.getElementById('weather-humidity').textContent = `${data.humidity}%`;
            document.getElementById('weather-wind').textContent = `${data.wind.speed} m/s`;
            document.getElementById('weather-pressure').textContent = `${data.pressure} hPa`;

            // Update weather icon
            const iconImg = document.getElementById('weather-icon-img');
            iconImg.src = `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`;
            iconImg.alt = data.weather.description;

            // Display agricultural advice
            const adviceList = document.getElementById('advice-list');
            adviceList.innerHTML = '';
            data.agriculturalAdvice.forEach(advice => {
                const adviceItem = document.createElement('div');
                adviceItem.className = 'advice-item';
                adviceItem.textContent = advice;
                adviceList.appendChild(adviceItem);
            });
        }

        // Function to display weather forecast
        function displayWeatherForecast(data) {
            const forecastDays = document.getElementById('forecast-days');
            forecastDays.innerHTML = '';

            data.forecast.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'forecast-day';
                
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                
                dayElement.innerHTML = `
                    <h4>${dayName}</h4>
                    <img src="https://openweathermap.org/img/wn/${day.weather.icon}@2x.png" alt="${day.weather.description}">
                    <div class="forecast-temp">
                        <div>${day.temperature.max}°</div>
                        <div>${day.temperature.min}°</div>
                    </div>
                `;
                
                forecastDays.appendChild(dayElement);
            });
        }

        // Function to get user's location
        function getUserLocation() {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by this browser.');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherData(null, lat, lon);
                    fetchWeatherForecast(null, lat, lon);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to get your location. Please enter a city name instead.');
                }
            );
        }

        // Event listeners for weather functionality
        weatherCloseBtn.addEventListener('click', hideWeatherSection);

        weatherSearchBtn.addEventListener('click', () => {
            const city = weatherCityInput.value.trim();
            if (city) {
                fetchWeatherData(city);
                fetchWeatherForecast(city);
            } else {
                alert('Please enter a city name');
            }
        });

        weatherLocationBtn.addEventListener('click', getUserLocation);

        weatherCityInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                weatherSearchBtn.click();
            }
        });

        // Add weather grid item click handler
        document.addEventListener('click', (e) => {
            if (e.target.closest('.grid-item[data-key="weather"]')) {
                showWeatherSection();
                // Try to get location automatically
                getUserLocation();
            }
        });

        // --- LOGIN FUNCTIONALITY ---
        const loginBtn = document.getElementById('login-btn');
        const loginSection = document.getElementById('login-section');
        const loginCloseBtn = document.querySelector('.login-close');
        const loginForm = document.getElementById('login-form');
        const loginError = document.getElementById('login-error');
        const signupLink = document.getElementById('signup-link');
        const googleBtn = document.querySelector('.google-btn');
        const facebookBtn = document.querySelector('.facebook-btn');

        // Show login modal
        function showLoginModal() {
            loginSection.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        // Hide login modal
        function hideLoginModal() {
            loginSection.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore scrolling
            loginForm.reset();
            loginError.classList.add('hidden');
        }

        // Handle login form submission
        function handleLoginSubmit(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // Basic validation
            if (!email || !password) {
                showLoginError('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                showLoginError('Please enter a valid email address');
                return;
            }

            // Simulate login process
            showLoginLoading(true);
            
            // Simulate API call delay
            setTimeout(() => {
                // For demo purposes, accept any email/password combination
                // In a real application, you would validate against a server
                if (email && password) {
                    // Store login state
                    if (rememberMe) {
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('rememberMe', 'true');
                    } else {
                        sessionStorage.setItem('userEmail', email);
                    }
                    
                    // Update login button to show user is logged in
                    updateLoginButton(email);
                    hideLoginModal();
                    showLoginSuccess();
                } else {
                    showLoginError('Invalid email or password');
                }
                showLoginLoading(false);
            }, 1500);
        }

        // Show login error message
        function showLoginError(message) {
            loginError.textContent = message;
            loginError.classList.remove('hidden');
            setTimeout(() => {
                loginError.classList.add('hidden');
            }, 5000);
        }

        // Show login success message
        function showLoginSuccess() {
            // Create a temporary success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                z-index: 1001;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            successMsg.textContent = 'Login successful! Welcome back!';
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        }

        // Show/hide loading state
        function showLoginLoading(show) {
            const submitBtn = document.querySelector('.login-submit-btn');
            if (show) {
                submitBtn.textContent = 'LOGGING IN...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
            } else {
                submitBtn.textContent = 'LOGIN';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        }

        // Update login button after successful login
        function updateLoginButton(email) {
            const userEmail = email.split('@')[0]; // Get username part
            loginBtn.textContent = `Hi, ${userEmail}`;
            loginBtn.style.background = '#4CAF50';
            loginBtn.title = `Logged in as ${email}`;
        }

        // Check if user is already logged in
        function checkLoginStatus() {
            const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
            if (userEmail) {
                updateLoginButton(userEmail);
            }
        }

        // Email validation
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Handle social login
        function handleSocialLogin(provider) {
            showLoginLoading(true);
            
            // Simulate social login process
            setTimeout(() => {
                const email = `user@${provider}.com`;
                updateLoginButton(email);
                hideLoginModal();
                showLoginSuccess();
                showLoginLoading(false);
            }, 1000);
        }

        // Event listeners for login functionality
        loginBtn.addEventListener('click', showLoginModal);
        loginCloseBtn.addEventListener('click', hideLoginModal);
        loginForm.addEventListener('submit', handleLoginSubmit);
        
        googleBtn.addEventListener('click', () => handleSocialLogin('google'));
        facebookBtn.addEventListener('click', () => handleSocialLogin('facebook'));
        
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideLoginModal();
            // In a real app, you would show a signup modal here
            alert('Sign up functionality would be implemented here');
        });

        // Close modal when clicking outside
        loginSection.addEventListener('click', (e) => {
            if (e.target === loginSection) {
                hideLoginModal();
            }
        });

        // Check login status on page load
        checkLoginStatus();

        // Update weather translations when language changes
        function updateWeatherTranslations() {
            const lang = currentLanguage;
            const weatherTrans = weatherTranslations[lang] || weatherTranslations.en;
            
            document.querySelector('[data-translate-key="weatherTitle"]').textContent = weatherTrans.weatherTitle;
            document.querySelector('[data-translate-key="weatherPlaceholder"]').placeholder = weatherTrans.weatherPlaceholder;
            document.querySelector('[data-translate-key="weatherSearch"]').textContent = weatherTrans.weatherSearch;
            document.querySelector('[data-translate-key="weatherLocation"]').textContent = weatherTrans.weatherLocation;
            document.querySelector('[data-translate-key="weatherForecastTitle"]').textContent = weatherTrans.weatherForecastTitle;
            document.querySelector('[data-translate-key="weatherAdviceTitle"]').textContent = weatherTrans.weatherAdviceTitle;
            document.querySelector('[data-translate-key="weatherError"]').textContent = weatherTrans.weatherError;
        }

        // Override the existing setLanguage function to include weather and voice translations
        const originalSetLanguage = setLanguage;
        setLanguage = function(lang) {
            originalSetLanguage(lang);
            updateWeatherTranslations();
            updateVoiceTranslations();
            currentLanguage = lang; // Update current language for voice
        };



        // --- INITIALIZATION ---
        setLanguage('en'); 
    });