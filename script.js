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

    // 4. Blueprint Process Tabs Logic
    const tabNodes = document.querySelectorAll('.bp-tab-node');
    const tabPanels = document.querySelectorAll('.bp-tab-panel');
    const tabLines = document.querySelectorAll('.bp-tab-line');

    tabNodes.forEach((node, index) => {
        node.addEventListener('click', () => {
            // Remove active from all nodes and panels
            tabNodes.forEach(n => n.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Handle active lines for progress effect
            tabLines.forEach((line, i) => {
                if (i < index) {
                    line.classList.add('active-line');
                } else {
                    line.classList.remove('active-line');
                }
            });

            // Add active to clicked node
            node.classList.add('active');

            // Show corresponding panel
            const targetTab = node.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 5. Phase Switcher & Content Visibility Logic
    const phaseBtns = document.querySelectorAll('.cta-button-phase');
    const phaseNavs = document.querySelectorAll('.phase-navigator');
    const phase2Section = document.getElementById('phase2-section');
    const experienceSec = document.getElementById('experience');
    const blueprintSec = document.getElementById('blueprint');
    const optionsSec = document.getElementById('options');
    const optionsHeader = document.getElementById('options-header');
    const phase1RoadmapBlock = document.getElementById('phase1-roadmap-block');
    const roadmapConnectorLine = document.getElementById('roadmap-connector-line');
    const phase2RoadmapBlock = document.getElementById('phase2-roadmap-block');
    const optionsBranchConnector = document.getElementById('options-branch-connector');

    function switchPhase(phase) {
        if (phase === 'phase1') {
            if (experienceSec) experienceSec.style.display = 'block';
            if (blueprintSec) blueprintSec.style.display = 'block';
            if (optionsSec) optionsSec.style.display = 'block';
            if (optionsHeader) optionsHeader.style.display = 'block';
            if (phase1RoadmapBlock) phase1RoadmapBlock.style.display = 'block';
            if (roadmapConnectorLine) roadmapConnectorLine.style.display = 'block';
            if (phase2RoadmapBlock) phase2RoadmapBlock.style.display = 'block';
            if (optionsBranchConnector) optionsBranchConnector.style.display = 'block';
            if (phase2Section) phase2Section.style.display = 'none';
        } else if (phase === 'phase2') {
            if (experienceSec) experienceSec.style.display = 'none';
            if (blueprintSec) blueprintSec.style.display = 'none';
            
            // Show options but hide Phase 1 components, headers, and connector lines
            if (optionsSec) optionsSec.style.display = 'block';
            if (optionsHeader) optionsHeader.style.display = 'none';
            if (phase1RoadmapBlock) phase1RoadmapBlock.style.display = 'none';
            if (roadmapConnectorLine) roadmapConnectorLine.style.display = 'none';
            if (phase2RoadmapBlock) phase2RoadmapBlock.style.display = 'none';
            if (optionsBranchConnector) optionsBranchConnector.style.display = 'none';
            
            if (phase2Section) phase2Section.style.display = 'block';
        }
    }

    phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and navigators
            phaseBtns.forEach(b => b.classList.remove('active'));
            phaseNavs.forEach(n => n.classList.remove('active'));

            // Add active to current button
            btn.classList.add('active');

            // Show corresponding navigator
            const targetPhase = btn.getAttribute('data-phase');
            document.getElementById(`nav-${targetPhase}`).classList.add('active');

            // Toggle page content visibility
            switchPhase(targetPhase);
        });
    });

    // Auto-switch phase based on clicked anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#phase2-')) {
                const btnPhase2 = document.querySelector('.cta-button-phase[data-phase="phase2"]');
                if (btnPhase2 && !btnPhase2.classList.contains('active')) {
                    btnPhase2.click();
                }
            } else if (targetId === '#experience' || targetId === '#blueprint' || targetId === '#hero') {
                const btnPhase1 = document.querySelector('.cta-button-phase[data-phase="phase1"]');
                if (btnPhase1 && !btnPhase1.classList.contains('active')) {
                    btnPhase1.click();
                }
            }
        });
    });
});
