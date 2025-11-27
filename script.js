// ========================================================================
// === 1. GOLD PRICE CARD LOGIC (Data Fetching and Clock Update) ===
// ========================================================================

// Function to update the current date and time on the card.
function updateDateTime() {
    const now = new Date();
    // Format date as DD/MM/YYYY
    const date = now.toLocaleDateString("en-GB"); 
    // Format time as HH:MM (12-hour format with AM/PM)
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); 
    
    // Update the HTML elements
    const dateEl = document.getElementById("date");
    const timePostEl = document.getElementById("time-post");
    const timeEl = document.getElementById("time");
    
    if (dateEl) dateEl.innerText = date;
    if (timePostEl) timePostEl.innerText = '9:00 ព្រឹក'; // Static post time
    if (timeEl) timeEl.innerText = time; // Current time
}

// Helper function to remove decimal points from price values
function formatValue(value) {
    if (typeof value === "number") return Math.floor(value);
    if (typeof value === "string") return value.split(".")[0];
    return value;
}

// Function to fetch the gold price data from the Google Web App
async function loadGoldPrice() {
    // The URL of your Google Sheets Web App
    const url = "https://script.google.com/macros/s/AKfycbxW_WSe6CtMLPzdvgnWe_V_Uy5BLEinCb9OmylVOwfqR61CawoPmF1bmDn-HRVOyy9V/exec";
    
    try {
        const res = await fetch(url);
        const data = await res.json();

        // Update the price display
        const barPrice = document.getElementById("barPrice");
        const phiPrice = document.getElementById("phiPrice");
        const nutiemPrice = document.getElementById("nutiemPrice");
        
        if (barPrice) barPrice.innerText = "$ " + formatValue(data.bar);
        if (phiPrice) phiPrice.innerText = "$ " + formatValue(data.phi);
        if (nutiemPrice) nutiemPrice.innerText = "$ " + formatValue(data.nutiem);

    } catch (err) {
        console.error("Error loading gold price data:", err);
        // Fallback for error state
        if (document.getElementById("barPrice")) document.getElementById("barPrice").innerText = "---";
        if (document.getElementById("phiPrice")) document.getElementById("phiPrice").innerText = "---";
        if (document.getElementById("nutiemPrice")) document.getElementById("nutiemPrice").innerText = "Error";
    }
}


// ========================================================================
// === 2. TRANSLATION DATA AND LOGIC ===
// ========================================================================

const translations = {
    // Nav Links
    'nav-link-1': { 'ENG': 'Home', 'KH': 'ទំព័រដើម' },
    'nav-link-2': { 'ENG': 'Accounts', 'KH': 'គណនី' },
    'nav-link-3': { 'ENG': 'Courses', 'KH': 'វគ្គសិក្សា' },
    'nav-link-4': { 'ENG': 'Our Team', 'KH': 'ក្រុមការងារ' }, 
    'nav-login': { 'ENG': 'Sign In', 'KH': 'ចូលគណនី' },
    'nav-cta': { 'ENG': 'Start Trading', 'KH': 'ចាប់ផ្តើមជួញដូរ' },
    // Hero
    'hero-heading': { 'ENG': 'The market offers opportunities every day.', 'KH': 'ទីផ្សារផ្តល់ឱកាសជារៀងរាល់ថ្ងៃ' },
    'hero-subtext': { 'ENG': 'We can identify chances in the market and turn them into profits.', 'KH': 'យើងអាចស្វែងរកឱកាសក្នុងទីផ្សារបម្លែងទៅជាផលចំណេញ' },
    'section-heading-gold': { 'ENG': 'Daily Gold Price', 'KH': 'តម្លៃហាងឆេងមាស' },
    'hero-cta-large': { 'ENG': 'Start Trading Now', 'KH': 'ចាប់ផ្តើមវិនិយោគឥឡូវនេះ' },
    'hero-explore': { 'ENG': 'Explore Features →', 'KH': 'ស្វែងយល់ពីមុខងារ →' },
    'trusted-by-text': { 'ENG': 'Trusted by major funds and over 500K traders worldwide:', 'KH': 'ត្រូវបានជឿទុកចិត្តដោយមូលនិធិធំៗ និងពាណិជ្ជករជាង 50 ម៉ឺននាក់ទូទាំងពិភពលោក៖' },

    // Key Stats Section
    'stat-1-num': { 'ENG': '100B+', 'KH': '100B+' },
    'stat-1-label': { 'ENG': 'Daily Trading Volume', 'KH': 'បរិមាណជួញដូរប្រចាំថ្ងៃ' },
    'stat-2-num': { 'ENG': '0.5 ms', 'KH': '0.5 ms' },
    'stat-2-label': { 'ENG': 'Execution Speed', 'KH': 'ល្បឿននៃការអនុវត្ត' },
    'stat-3-num': { 'ENG': '99.9%', 'KH': '99.9%' },
    'stat-3-label': { 'ENG': 'Platform Uptime', 'KH': 'ប្រតិបត្តិការវេទិកា' },
    'stat-4-num': { 'ENG': '500K+', 'KH': '500K+' },
    'stat-4-label': { 'ENG': 'Active Traders', 'KH': 'ពាណិជ្ជករសកម្ម' },

    // Account Section
    'section-heading-features': { 'ENG': 'Choose your path to mastery.', 'KH': 'ជ្រើសរើសគណនីរបស់អ្នកដើម្បីភាពជោគជ័យ។' },
    
    // Account 1 (Standard)
    'account-1-title': { 'ENG': 'Standard Account', 'KH': 'គណនី Standard' },
    'account-1-body': { 'ENG': 'Best for beginners. Low minimum deposit and comprehensive educational resources.', 'KH': 'ល្អបំផុតសម្រាប់អ្នកចាប់ផ្តើមដំបូង។ ប្រាក់បញ្ញើអប្បបរមាទាប និងធនធានអប់រំទូលំទូលាយ។' },
    'acc-1-b1': { 'ENG': 'Spreads from 1.5 pips', 'KH': 'Spreads ចាប់ពី 1.5 pips' },
    'acc-1-b2': { 'ENG': '0% Commission', 'KH': 'កម្រៃជើងសារ 0%' },
    'acc-1-b3': { 'ENG': 'Demo Account Access', 'KH': 'សិទ្ធិចូលប្រើគណនី Demo' },
    'account-1-cta': { 'ENG': 'Open Standard', 'KH': 'បើកគណនី Standard' },

    // Account 2 (Pro)
    'account-2-title': { 'ENG': 'Pro Account', 'KH': 'គណនី Pro' },
    'account-2-body': { 'ENG': 'Designed for active traders. Tight spreads and dedicated account manager.', 'KH': 'រចនាឡើងសម្រាប់ពាណិជ្ជករសកម្ម។ Spreads តូចចង្អៀត និងអ្នកគ្រប់គ្រងគណនីឧទ្ទិស។' },
    'acc-2-b1': { 'ENG': 'Spreads from 0.8 pips', 'KH': 'Spreads ចាប់ពី 0.8 pips' },
    'acc-2-b2': { 'ENG': 'Low Commission ($3/Lot)', 'KH': 'កម្រៃជើងសារទាប ($3/Lot)' },
    'acc-2-b3': { 'ENG': 'Market Analyst Webinars', 'KH': 'Webinars អ្នកវិភាគទីផ្សារ' },
    'account-2-cta': { 'ENG': 'Upgrade to Pro', 'KH': 'ដំឡើងទៅ Pro' },

    // Account 3 (VIP)
    'account-3-title': { 'ENG': 'VIP Elite', 'KH': 'VIP Elite' },
    'account-3-body': { 'ENG': 'For institutional and high-volume traders. Deepest liquidity and custom support.', 'KH': 'សម្រាប់ពាណិជ្ជករស្ថាប័ន និងបរិមាណខ្ពស់។ សាច់ប្រាក់ងាយស្រួលជ្រៅបំផុត និងការគាំទ្រផ្ទាល់ខ្លួន។' },
    'acc-3-b1': { 'ENG': 'Spreads from 0.0 pips', 'KH': 'Spreads ចាប់ពី 0.0 pips' },
    'acc-3-b2': { 'ENG': 'Negotiable Commission', 'KH': 'កម្រៃជើងសារចរចាបាន' },
    'acc-3-b3': { 'ENG': 'Dedicated API Access', 'KH': 'សិទ្ធិចូលប្រើ API ឧទ្ទិស' },
    'account-3-cta': { 'ENG': 'Contact Sales', 'KH': 'ទាក់ទងផ្នែកលក់' },
    
    // Course Section
    'course-heading': { 'ENG': 'Unlock Your Success with Our Trading Courses.', 'KH': 'ដោះសោភាពជោគជ័យរបស់អ្នកជាមួយវគ្គសិក្សាជួញដូររបស់យើង។' },
    'course-subtext': { 'ENG': 'Choose the course level that matches your current trading expertise and goals.', 'KH': 'ជ្រើសរើសកម្រិតវគ្គសិក្សាដែលស័ក្តិសមនឹងជំនាញ និងគោលដៅជួញដូររបស់អ្នក។' },

    // Course 1 (Beginner)
    'c-feat-1': { 'ENG': 'The Foundation: Beginner Mastery', 'KH': 'មូលដ្ឋានគ្រឹះ៖ ជំនាញសម្រាប់អ្នកចាប់ផ្តើម' },
    'course-cta-1': { 'ENG': 'View Details', 'KH': 'មើលព័ត៌មានលម្អិត' },
    
    // Course 2 (Advanced)
    'c-feat-2': { 'ENG': 'The X Formula: Advanced Trading', 'KH': 'រូបមន្ត X៖ ការជួញដូរកម្រិតខ្ពស់' },
    'course-cta-2': { 'ENG': 'Coming Soon', 'KH': 'មកឆាប់ៗនេះ' },

    // Course 3 (Expert/Mentorship)
    'c-feat-3': { 'ENG': 'Elite Mentorship: Algorithmic Edge', 'KH': 'ការណែនាំពិសេស៖ គែម Algorithmic' },
    'course-cta-3': { 'ENG': 'Coming Soon', 'KH': 'មកឆាប់ៗនេះ' },

    // Team Section
    'team-heading': { 'ENG': 'Meet Our Leadership Team', 'KH': 'ជួបជាមួយក្រុមអ្នកដឹកនាំរបស់យើង។' },
    'team-subtext': { 'ENG': 'The experts guiding Market X Trader to deliver innovation and reliability.', 'KH': 'អ្នកជំនាញដែលដឹកនាំ Market X Trader ដើម្បីផ្តល់នូវភាពច្នៃប្រឌិត និងភាពជឿជាក់។' },

    // Member 1
    'team-name-1': { 'ENG': 'Mr. Noy Vathana', 'KH': 'លោក ណយ វឌ្ឍនា' },
    'team-role-1': { 'ENG': '(CEO)', 'KH': 'នាយកប្រតិបត្តិ (CEO)' },
    'team-bio-1': { 'ENG': 'Experienced in Forex, specializing in fundamental market and gold analysis.', 'KH': 'មានបទពិសោធក្នុងវិស័យ Forex និងជំនាញក្នុងការវិភាគមូលដ្ឋានទីផ្សារ និងមាស' },

    // Member 2
    'team-name-2': { 'ENG': 'Ms. Lina Heng', 'KH': 'កញ្ញា ហេង លីណា' },
    'team-role-2': { 'ENG': 'Chief Technology Officer (CTO)', 'KH': 'ប្រធានផ្នែកបច្ចេកវិទ្យា (CTO)' },
    'team-bio-2': { 'ENG': 'Leading the development of our ultra-low latency trading platform and proprietary algorithms.', 'KH': 'ដឹកនាំការអភិវឌ្ឍវេទិកាជួញដូរ latency ទាបបំផុត និង algorithms កម្មសិទ្ធិរបស់យើង។' },

    // Member 3
    'team-name-3': { 'ENG': 'Dr. Sokun Visal', 'KH': 'បណ្ឌិត សុគន្ធ វិសាល' },
    'team-role-3': { 'ENG': 'Chief Risk Officer (CRO)', 'KH': 'ប្រធានផ្នែកគ្រប់គ្រងហានិភ័យ (CRO)' },
    'team-bio-3': { 'ENG': 'A PhD in Quantitative Finance, ensuring robust risk management and regulatory compliance.', 'KH': 'បណ្ឌិតផ្នែកហិរញ្ញវត្ថុបរិមាណ (Quantitative Finance) ធានានូវការគ្រប់គ្រងហានិភ័យរឹងមាំ និងការអនុលោមតាមបទប្បញ្ញត្តិ។' },
    
    // CTA Footer
    'cta-heading': { 
        'ENG': 'Start looking for your market opportunity in the forex market now?', 
        'KH': 'កុំបង្អង់យូរ! ឱកាសទីផ្សារ Forex កំពុងរង់ចាំអ្នក?' 
    },
    'cta-body': { 
        'ENG': 'Register with the Market X Trader and find your opportunity.', 
        'KH': 'ចុះឈ្មោះជាមួយ Market X Trader ឥឡូវនេះ ដើម្បីចាប់យកជោគវាសនាហិរញ្ញវត្ថុរបស់អ្នក។' 
    },
    'cta-register': { 'ENG': 'Register Now', 'KH': 'ចុះឈ្មោះឥឡូវនេះ' },
};

// Function to update the content based on the selected language
function updateContent(lang) {
    const body = document.body;

    // 1. Change Font based on language (add class to Body)
    if (lang === 'KH') {
        body.classList.add('lang-khmer-active');
    } else {
        body.classList.remove('lang-khmer-active');
    }

    // 2. Set Language Switcher UI
    document.querySelector('.lang-eng')?.classList.remove('active-lang');
    document.querySelector('.lang-kh')?.classList.remove('active-lang');
    
    if (lang === 'KH') {
        document.querySelector('.lang-kh')?.classList.add('active-lang');
    } else {
        document.querySelector('.lang-eng')?.classList.add('active-lang');
    }

    // 3. Translate all text content via ID
    for (const id in translations) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = translations[id][lang];
        }
    }
}


// ========================================================================
// === 3. MAIN INITIALIZATION (DOM Content Loaded) ===
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // === 3.1. Gold Price Card Initialization (Run first, then set interval) ===
    updateDateTime();
    loadGoldPrice();
    // Auto-refresh every 60 seconds (60000 milliseconds)
    setInterval(updateDateTime, 60000);
    setInterval(loadGoldPrice, 60000);


    // === 3.2. Particles.js Configuration (Blue Theme) ===
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#3e64ff", "#a0b2d0", "#1f4287"] }, 
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#ffffff" } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false } },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6a8cff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }
            },
            "retina_detect": true
        });
    }

    
    // === 3.3. Mobile Menu Toggle Logic (Assuming you will add CSS for this) ===
    const navbar = document.querySelector('.navbar');
    const mobileMenuButton = document.createElement('div');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '☰'; 
    
    const logoContainer = document.querySelector('.logo-container');
    if (navbar && logoContainer) {
        navbar.insertBefore(mobileMenuButton, logoContainer.nextElementSibling);
    } else if (navbar) {
        navbar.appendChild(mobileMenuButton);
    }

    const navMenu = document.querySelector('.nav-menu');
    mobileMenuButton.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        mobileMenuButton.innerHTML = navMenu?.classList.contains('active') ? '✕' : '☰';
    });

    // === 3.4. Scroll Animation (Fade-In) ===
    // 📌 ចំណុចកែ៖ បន្ថែម 'footer' ទៅក្នុង selector
    const sections = document.querySelectorAll('section, header, footer'); // 👈 កែសម្រួលនៅទីនេះ
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 📌 កែសម្រួល៖ បន្ថែម observer.unobserve(entry.target); ដើម្បីបញ្ឈប់ការតាមដាន
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 📌 កែសម្រួល៖ ឥឡូវ sections គឺជា sections, header, និង footer
    sections.forEach(element => { 
        element.classList.add('fade-in'); 
        observer.observe(element);
    });

    // === 3.5. Nav Bar Highlighting Logic ===
    const navSections = document.querySelectorAll(
        '#hero-section, #features-section, #course-section, #team-section' 
    );

    const navObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const navObserver = new IntersectionObserver((entries) => {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });

        entries.forEach(entry => {
            const navLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
            
            if (entry.isIntersecting && navLink) {
                navLink.classList.add('active');
            } 
        });
    }, navObserverOptions);

    navSections.forEach(section => {
        navObserver.observe(section);
    });

    // === 3.6. Language Switcher Logic ===
    const langSwitcher = document.querySelector('.language-switcher');
    
    // Set default language on load
    updateContent('ENG'); 

    if (langSwitcher) {
        langSwitcher.addEventListener('click', () => {
            const currentLangIsEng = document.querySelector('.lang-eng')?.classList.contains('active-lang');

            const newLang = currentLangIsEng ? 'KH' : 'ENG';
            
            updateContent(newLang); 
        });
    }
    const textElement = document.getElementById('hero-subtext');
    const fullText = textElement.textContent;
    textElement.textContent = ''; // clear initial text

    let index = 0;
    function typeWriter() {
    if (index < fullText.length) {
        textElement.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // typing speed in ms
    } else {
        textElement.classList.add('blink'); // cursor blink at the end
    }
    }

    typeWriter();

});