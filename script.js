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
document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .about-content, .about-images, .contact-info, .book-card, .ba-featured, .ba-card').forEach(el => {
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

document.querySelectorAll('.services-grid, .gallery-grid, .testimonials-slider, .ba-grid').forEach(grid => {
    gridObserver.observe(grid);
});

// ===== Before/After Slider =====
const baSlider = document.getElementById('baSlider');
const baSliderHandle = document.getElementById('baSliderHandle');
const baBeforeImage = document.querySelector('.ba-before');

if (baSlider && baSliderHandle && baBeforeImage) {
    let isDragging = false;

    const updateSliderPosition = (clientX) => {
        const rect = baSlider.getBoundingClientRect();
        let percentage = ((clientX - rect.left) / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));

        baBeforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        baSliderHandle.style.left = `${percentage}%`;
    };

    // Mouse events
    baSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSliderPosition(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSliderPosition(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch events for mobile
    baSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSliderPosition(e.touches[0].clientX);
    });

    baSlider.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault();
            updateSliderPosition(e.touches[0].clientX);
        }
    });

    baSlider.addEventListener('touchend', () => {
        isDragging = false;
    });
}

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
document.querySelectorAll('a, button, .service-card, .gallery-item, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// ===== Salon Tour Carousel =====
const tourTrack = document.getElementById('tourTrack');
const tourPrev = document.getElementById('tourPrev');
const tourNext = document.getElementById('tourNext');
const tourDots = document.getElementById('tourDots');

if (tourTrack && tourPrev && tourNext && tourDots) {
    const slides = tourTrack.querySelectorAll('.tour-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('tour-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        tourDots.appendChild(dot);
    });

    const dots = tourDots.querySelectorAll('.tour-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        tourTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Auto-slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on interaction
    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    };

    tourNext.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    tourPrev.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Also pause when clicking dots
    dots.forEach(dot => {
        dot.addEventListener('click', resetInterval);
    });
}

// ===== FAQ Accordion =====
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = question.nextElementSibling;

        // Toggle active class
        item.classList.toggle('active');

        // Toggle max-height for smooth transition
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = 0;
        }

        // Close other items (optional - keeps it clean)
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherQuestion.nextElementSibling;
                otherItem.classList.remove('active');
                otherAnswer.style.maxHeight = 0;
            }
        });
    });
});

console.log('🎨 Sensible Korean Salon website loaded successfully!');
