// ==========================================
// SMOOTH SCROLLING
// ==========================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==========================================
// CURSOR TRAIL EFFECT
// ==========================================
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#FF4F00', '#0E4C92', '#D9D9D9'];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('mousemove', (e) => {
    if (particles.length < 100) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==========================================
// TYPING EFFECT
// ==========================================
const typedTextSpan = document.getElementById('typedText');
const texts = [
    'Fullstack Developer',
    'DevOps Engineer',
    'AI/ML Engineer', 
    'Problem Solver',
    'Tech Enthusiast'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ==========================================
// MATRIX BACKGROUND
// ==========================================
const matrixBg = document.getElementById('matrixBg');
const matrixChars = '01';
let matrixText = '';

for (let i = 0; i < 100; i++) {
    matrixText += matrixChars[Math.floor(Math.random() * matrixChars.length)];
}

matrixBg.textContent = matrixText;
matrixBg.style.color = '#FF4F00';
matrixBg.style.fontSize = '20px';
matrixBg.style.fontFamily = 'Courier New';
matrixBg.style.wordWrap = 'break-word';

// ==========================================
// SCROLL ANIMATIONS (AOS)
// ==========================================
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            const delay = element.getAttribute('data-delay') || 0;
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, delay);
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ==========================================
// SKILL BARS ANIMATION
// ==========================================
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        const progressBar = item.querySelector('.skill-progress');
        
        const elementTop = item.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            setTimeout(() => {
                progressBar.style.width = level + '%';
            }, 200);
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ==========================================
// PROJECT FILTER
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fadeIn animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ==========================================
// NAVIGATION LINK EFFECTS
// ==========================================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Visual feedback
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// THEME TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
let darkMode = false;

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    
    if (darkMode) {
        document.documentElement.style.setProperty('--light-gray', '#333333');
        document.documentElement.style.setProperty('--white', '#1a1a1a');
        document.documentElement.style.setProperty('--dark', '#D9D9D9');
    } else {
        document.documentElement.style.setProperty('--light-gray', '#D9D9D9');
        document.documentElement.style.setProperty('--white', '#FFFFFF');
        document.documentElement.style.setProperty('--dark', '#222222');
    }
});

// ==========================================
// FORM SUBMISSION
// ==========================================
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const button = form.querySelector('.btn-submit');
    const originalHTML = button.innerHTML;
    
    // Simulate sending
    button.innerHTML = '<span>SENDING...</span>';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
        button.innerHTML = '<span>MESSAGE SENT!</span><span>✓</span>';
        button.style.backgroundColor = '#0E4C92';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = '';
            button.style.pointerEvents = '';
            form.reset();
        }, 3000);
    }, 2000);
    
    // Log form data (in production, send to server)
    const formData = new FormData(form);
    console.log('Form Data:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
}

// ==========================================
// DOWNLOAD RESUME
// ==========================================
function downloadResume() {
    // Create a simple text resume
    const resumeText = `
AHMED AZOOZ
Software Engineer
Email: ahmed.mohammed.azzooz@gmail.com
Phone: +20 111 332 1344
Location: New Cairo, Egypt
LinkedIn: https://www.linkedin.com/in/ahmed-azoozz/
GitHub: https://github.com/A3zooz/

EDUCATION
BSc. Computer Science & Engineering
The German University in Cairo (2019-2024)
GPA: 3.97 | High Honors | 70% Scholarship

EXPERIENCE
- Software Engineer Intern at Janan Tech (Oct 2025 - Present)
- Fullstack Engineer Intern at Qupil (Apr 2025 - Jun 2025)
- Software Engineer Intern at GUC (Aug 2022 - Apr 2023)

SKILLS
Languages: JavaScript/TypeScript, Python, Java
Frameworks: React, React Native, NestJS, Express, Spring Boot
Tools: Docker, MongoDB, PostgreSQL, Git, TensorFlow

Visit my portfolio for more details!
    `;
    
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ahmed_Azooz_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// ==========================================
// LOGO ANIMATION
// ==========================================
const logo = document.getElementById('logo');
let logoClickCount = 0;

logo.addEventListener('click', () => {
    logoClickCount++;
    
    if (logoClickCount === 5) {
        // Easter egg!
        document.body.style.animation = 'rainbow 3s ease';
        setTimeout(() => {
            document.body.style.animation = '';
            logoClickCount = 0;
        }, 3000);
    }
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ==========================================
// INTERACTIVE CARD EFFECTS
// ==========================================
const interactiveCards = document.querySelectorAll('.interactive-card');

interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(-8px, -8px) rotate(-1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ==========================================
// PROJECT CARD HOVER EFFECTS
// ==========================================
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const number = this.querySelector('.project-number');
        number.style.transform = 'rotate(360deg)';
        number.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const number = this.querySelector('.project-number');
        number.style.transform = 'rotate(0deg)';
    });
});

// ==========================================
// TIMELINE DOTS PULSE ON HOVER
// ==========================================
const timelineDots = document.querySelectorAll('.timeline-dot');

timelineDots.forEach(dot => {
    dot.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.5)';
        this.style.backgroundColor = '#0E4C92';
    });
    
    dot.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.backgroundColor = '';
    });
});

// ==========================================
// BADGE ITEMS CLICK EFFECT
// ==========================================
const badgeItems = document.querySelectorAll('.badge-item');

badgeItems.forEach(badge => {
    badge.addEventListener('click', function() {
        // Ripple effect
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = '#FF4F00';
        
        setTimeout(() => {
            this.style.transform = '';
            this.style.backgroundColor = '';
        }, 500);
    });
});

// ==========================================
// STAT BOX COUNTER ANIMATION
// ==========================================
function animateStatBoxes() {
    const statBoxes = document.querySelectorAll('.stat-box');
    
    statBoxes.forEach(box => {
        const elementTop = box.getBoundingClientRect().top;
        
        if (elementTop < window.innerHeight - 100) {
            box.style.animation = 'pulse 2s ease infinite';
        }
    });
}

window.addEventListener('scroll', animateStatBoxes);
window.addEventListener('load', animateStatBoxes);

// ==========================================
// PARALLAX EFFECT FOR FLOATING SHAPES
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.05;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// FORM INPUT FOCUS EFFECTS
// ==========================================
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#FF4F00';
        this.style.boxShadow = '5px 5px 0 #0E4C92';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
    });
});

// ==========================================
// CONSOLE ART
// ==========================================
console.log('%c' + `
 ▄▄▄       ██░ ██  ███▄ ▄███▓▓█████ ▓█████▄ 
▒████▄    ▓██░ ██▒▓██▒▀█▀ ██▒▓█   ▀ ▒██▀ ██▌
▒██  ▀█▄  ▒██▀▀██░▓██    ▓██░▒███   ░██   █▌
░██▄▄▄▄██ ░▓█ ░██ ▒██    ▒██ ▒▓█  ▄ ░▓█▄   ▌
 ▓█   ▓██▒░▓█▒░██▓▒██▒   ░██▒░▒████▒░▒████▓ 
 ▒▒   ▓▒█░ ▒ ░░▒░▒░ ▒░   ░  ░░░ ▒░ ░ ▒▒▓  ▒ 
  ▒   ▒▒ ░ ▒ ░▒░ ░░  ░      ░ ░ ░  ░ ░ ▒  ▒ 
  ░   ▒    ░  ░░ ░░      ░      ░    ░ ░  ░ 
      ░  ░ ░  ░  ░       ░      ░  ░   ░    
`, 'color: #FF4F00; font-weight: bold;');

console.log('%c👨‍💻 Welcome to Ahmed Azooz\'s Portfolio!', 'color: #0E4C92; font-size: 16px; font-weight: bold;');
console.log('%c🚀 Built with pure HTML, CSS & JavaScript', 'color: #FF4F00; font-size: 14px;');
console.log('%c💡 Feel free to explore the code!', 'color: #222222; font-size: 14px;');

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', (e) => {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'P' to go to projects
    if (e.key === 'p' || e.key === 'P') {
        scrollToSection('projects');
    }
    
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        scrollToSection('contact');
    }
});

// ==========================================
// RANDOM GLITCH EFFECT
// ==========================================
function randomGlitch() {
    const elements = [
        ...document.querySelectorAll('.project-title'),
        ...document.querySelectorAll('.section-title')
    ];
    
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    if (randomElement) {
        randomElement.style.transform = 'translate(2px, -2px)';
        randomElement.style.color = '#FF4F00';
        
        setTimeout(() => {
            randomElement.style.transform = '';
            randomElement.style.color = '';
        }, 100);
    }
}

// Trigger random glitch every 10 seconds
setInterval(randomGlitch, 10000);

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// DETECT SECTION IN VIEW
// ==========================================
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.borderBottom = '';
        if (link.getAttribute('href').substring(1) === current) {
            link.style.borderBottom = '3px solid #FF4F00';
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);
