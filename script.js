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

    // 2. Navbar Background change on scroll (Light Mode)
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Dynamic Glow Effect based on mouse movement
    const bgGradient = document.querySelector('.bg-gradient');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth * 100;
        const y = e.clientY / window.innerHeight * 100;
        
        // Dynamic depth effect with soft light colors
        bgGradient.style.background = `
            radial-gradient(circle at ${15 + (x * 0.05)}% ${50 + (y * 0.05)}%, rgba(30,58,138,0.06), transparent 50%),
            radial-gradient(circle at ${85 - (x * 0.05)}% ${30 - (y * 0.05)}%, rgba(180,83,9,0.05), transparent 50%)
        `;
    });

    // 4. Blueprint Accordion Logic
    const accordionHeaders = document.querySelectorAll('.bp-acc-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.bp-acc-content');
            
            // Close others (Accordion style)
            document.querySelectorAll('.blueprint-acc-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                    otherItem.querySelector('.bp-acc-content').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('expanded');
            if (item.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
});
