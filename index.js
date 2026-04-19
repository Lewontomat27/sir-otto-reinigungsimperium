document.addEventListener('DOMContentLoaded', () => {
    
    // 1. VORHER-NACHHER SLIDER LOGIK
    const slider = document.querySelector('.slider-input');
    const beforeImage = document.querySelector('.image-before');
    const sliderLine = document.querySelector('.slider-line');

    if (slider && beforeImage) {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            // Verschiebe die Breite des "Vorher"-Containers
            beforeImage.style.width = `${value}%`;
            // Optional: Verschiebe eine Linie mit (falls im CSS definiert)
            if (sliderLine) {
                sliderLine.style.left = `${value}%`;
            }
        });
    }

    // 2. SMOOTH SCROLL FÜR NAVIGATION
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset wegen Sticky Header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. MINI-ANIMATION BEIM SCROLLEN (Observer)
    const cards = document.querySelectorAll('.card, .step-card, .benefit-item');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // 4. FORMULAR FEEDBACK
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
            btn.style.backgroundColor = 'var(--success-green)';
            // Hier würde normalerweise das AJAX-Sending passieren
        });
    }
});