console.log("DEBUG: Script starting execution...");
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
document.querySelectorAll('a[href^="#"]:not(.floating-book-btn)').forEach(anchor => {
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
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .about-content, .about-images, .contact-info, .book-card, .ba-featured, .ba-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

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

// ===== Interactive Before/After Sliders =====
const sliders = document.querySelectorAll('.ba-slider-container');

sliders.forEach(slider => {
    const handle = slider.querySelector('.ba-handle');
    const overlayImage = slider.querySelector('.ba-overlay');

    if (handle && overlayImage) {
        let isDragging = false;

        const updateSliderPosition = (clientX) => {
            const rect = slider.getBoundingClientRect();
            let percentage = ((clientX - rect.left) / rect.width) * 100;
            percentage = Math.max(0, Math.min(100, percentage));

            // Clip from right side (revealing from left)
            overlayImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            handle.style.left = `${percentage}%`;
        };

        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSliderPosition(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault(); // Prevent text selection
                updateSliderPosition(e.clientX);
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSliderPosition(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                // Only prevent default if we are dragging
                updateSliderPosition(e.touches[0].clientX);
            }
        }, { passive: false });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
});

// ===== Parallax Effect on Hero =====
const hero = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    // Disable parallax on mobile to prevent overlap with About section
    if (window.innerWidth <= 768) return;

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

// ===== Service Card Interactive Pricing =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent triggering when clicking inner interactive elements if any (e.g. links)
        if (e.target.tagName === 'A') return;

        // Accordion behavior: Close others
        serviceCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });

        // Toggle current
        card.classList.toggle('active');
    });
});

// ===== Booking Widget Logic =====
const serviceSelect = document.getElementById('serviceSelect');
const stylistSelect = document.getElementById('stylistSelect');

// Select BOTH buttons (Floating + Static)
const bookingBtns = [
    document.getElementById('floating-book-btn'),
    document.getElementById('static-book-btn')
].filter(btn => btn !== null);

function updateBookingLink() {
    if (!serviceSelect || !stylistSelect) return;

    const service = serviceSelect.value;
    const stylist = stylistSelect.value;

    let message = `Hi Sensible Salon! I'd like to book a *${service}*`;

    if (stylist !== 'Any Stylist') {
        message += ` with stylist *${stylist}*`;
    }

    message += `. Please let me know available slots.`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/60195048386?text=${encodedMessage}`;

    // Update ALL booking buttons
    bookingBtns.forEach(btn => {
        btn.href = whatsappUrl;
        if (btn.target !== '_blank') {
            btn.target = '_blank';
        }
    });
}

if (serviceSelect && stylistSelect) {
    serviceSelect.addEventListener('change', updateBookingLink);
    stylistSelect.addEventListener('change', updateBookingLink);

    // Initialize link
    updateBookingLink();
}

// ===== Floating Book Button Logic (Scroll Visibility) =====
const floatingBtn = document.getElementById('floating-book-btn');

if (floatingBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    });
}

console.log('🎨 Sensible Korean Salon website loaded successfully!');

// ===== About Us Image Swap =====
function initAboutImageSwap() {
    const mainImg = document.querySelector('.about-img-main .about-img');
    const secImg = document.querySelector('.about-img-secondary .about-img');

    if (!mainImg || !secImg) return;

    setInterval(() => {
        // 1. Fade out
        mainImg.style.opacity = '0';
        secImg.style.opacity = '0';

        setTimeout(() => {
            // 2. Swap Sources & Alts
            const tempSrc = mainImg.src;
            const tempAlt = mainImg.alt;

            mainImg.src = secImg.src;
            mainImg.alt = secImg.alt;

            secImg.src = tempSrc;
            secImg.alt = tempAlt;

            // 3. Fade in
            mainImg.style.opacity = '1';
            secImg.style.opacity = '1';
        }, 500); // 0.5s transition
    }, 10000); // 10 seconds interval
}

// ===== Gallery Lightbox =====
function initLightbox() {
    // 1. Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Gallery Image" class="lightbox-img">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // 2. Open Lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
            }
        });
    });

    // 3. Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initAboutImageSwap();
    initLightbox();
});
