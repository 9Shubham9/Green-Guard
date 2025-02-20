// === Initialize EmailJS (if available) ===
if (typeof emailjs !== 'undefined') {
    emailjs.init("oGeEECfRlHEH3wWWa"); // Replace with your EmailJS user ID
}

// === Mobile Menu Toggle ===
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// === Smooth Scrolling for in-page links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Dynamic Navbar on Scroll ===
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// === Drag and Drop File Upload for Identify Page ===
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const analyzeButton = document.getElementById('analyzeButton');
const resultBox = document.getElementById('resultBox');
const resultContent = document.getElementById('resultContent');

// Trigger file dialog when clicking on the upload area
uploadArea.addEventListener('click', () => {
    fileInput.click();
});


if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#2ecc71';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });
}

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });
}

function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Display the uploaded image inside the upload area
            uploadArea.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; border-radius: 10px;">`;
            analyzeButton.disabled = false;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
}

// === Analyze Button Click for Identify Page ===
if (analyzeButton) {
    analyzeButton.addEventListener('click', () => {
        // Disable button to prevent multiple clicks
        analyzeButton.disabled = true;
        analyzeButton.textContent = 'Analyzing...';

        // Simulate a delay for analysis (replace with your actual model/API call)
        setTimeout(() => {
            if (resultBox && resultContent) {
                resultBox.style.display = 'block';
                resultContent.innerHTML = `
                    <div class="result-item">
                        <h4>Disease Detected:</h4>
                        <p>Leaf Spot</p>
                    </div>
                    <div class="result-item">
                        <h4>Confidence:</h4>
                        <p>92%</p>
                    </div>
                    <div class="result-item">
                        <h4>Recommendation:</h4>
                        <p>Apply fungicide and remove affected leaves.</p>
                    </div>
                `;
            }
            // Re-enable the button
            analyzeButton.disabled = false;
            analyzeButton.textContent = 'Analyze Image';
        }, 2000);
    });
}

// === Contact Form Submission with EmailJS ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Send the form data using EmailJS
        emailjs.sendForm('service_92f056e', 'template_1akpora', contactForm)
            .then((response) => {
                alert('Thank you for contacting us! Your message has been sent.');
                contactForm.reset();
            }, (error) => {
                alert('There was an error sending your message. Please try again later.');
            });
    });
}

// === Scroll Animations for Elements with .scroll-animate Class ===
const scrollElements = document.querySelectorAll('.scroll-animate');

function elementInView(el) {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight);
}

function displayScrollElement(element) {
    element.classList.add('animated');
}

function handleScrollAnimation() {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();
