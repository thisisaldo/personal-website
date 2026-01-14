// Scroll animation observer
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

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    // Create cursor glow effect
    createCursorGlow();

    // Add magnetic effect to buttons
    addMagneticEffect();

    // Add parallax effect to hero
    addParallaxEffect();

    // Update scroll progress
    updateScrollProgress();
});

// Scroll progress indicator
function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Cursor glow effect
function createCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}

// Magnetic effect for buttons and cards
function addMagneticEffect() {
    const magneticElements = document.querySelectorAll('.cta-button, .link-button, .card');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.15;
            const moveY = y * 0.15;

            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        el.addEventListener('mouseleave', function() {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// Parallax effect for hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero-content');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Email copy functionality
function copyEmail() {
    const email = 'hello@thisisaldo.com';
    const notification = document.getElementById('emailNotification');
    const emailBtn = document.getElementById('emailBtn');
    const originalContent = emailBtn.innerHTML;

    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show notification
        notification.classList.add('show');

        // Change button content temporarily with checkmark icon
        emailBtn.innerHTML = `
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Copied!</span>
        `;

        // Reset after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            emailBtn.innerHTML = originalContent;
        }, 3000);
    }).catch(() => {
        // Fallback: show notification anyway
        notification.textContent = 'Email: ' + email;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = 'Email copied to clipboard!';
        }, 5000);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
