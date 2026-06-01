document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Navbar Background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // 3. Dynamic Glow Effect based on mouse movement
    const bgGradient = document.querySelector('.bg-gradient');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
        
        // Slightly move the gradient centers based on mouse position to create a dynamic depth effect
        bgGradient.style.background = `
            radial-gradient(circle at ${15 + (x * 0.05)}% ${50 + (y * 0.05)}%, var(--accent-teal-glow), transparent 40%),
            radial-gradient(circle at ${85 - (x * 0.05)}% ${30 - (y * 0.05)}%, var(--accent-gold-glow), transparent 40%)
        `;
    });
});
