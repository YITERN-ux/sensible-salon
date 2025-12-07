// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .about-content, .about-images, .contact-info, .book-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Staggered Animation for Grid Items =====
const animateGridItems = (entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.service-card, .gallery-item, .testimonial-card');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
            obs.unobserve(entry.target);
        }
    });
};

const gridObserver = new IntersectionObserver(animateGridItems, {
    threshold: 0.2
});

document.querySelectorAll('.services-grid, .gallery-grid, .testimonials-slider').forEach(grid => {
    gridObserver.observe(grid);
});

// ===== Parallax Effect on Hero =====
const hero = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ===== Dynamic Year in Footer =====
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// ===== Cursor Effect (Optional enhancement) =====
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
document.body.appendChild(cursor);

const cursorDot = cursor.querySelector('.cursor-dot');
const cursorRing = cursor.querySelector('.cursor-ring');

// Add cursor styles
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        display: none;
    }
    
    @media (min-width: 1024px) {
        .custom-cursor {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
        }
        
        .cursor-dot {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #c9a96e;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        
        .cursor-ring {
            position: absolute;
            width: 32px;
            height: 32px;
            border: 1px solid rgba(201, 169, 110, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease;
        }
        
        .cursor-hover .cursor-ring {
            width: 50px;
            height: 50px;
            border-color: rgba(201, 169, 110, 0.8);
        }
        
        .cursor-hover .cursor-dot {
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(cursorStyles);

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effect for interactive elements
document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

console.log('🎨 Sensible Korean Salon website loaded successfully!');
