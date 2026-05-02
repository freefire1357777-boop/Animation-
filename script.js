// =========================================
// CUSTOM CURSOR & PARALLAX LOGIC
// =========================================
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');
const launchBtn = document.getElementById('launch-btn');
const heroSection = document.getElementById('hero-section');
const blobs = document.querySelectorAll('.blob');

// Update cursor position
document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    // Smooth custom cursor
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    
    // Glow follows with slight delay
    setTimeout(() => {
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    }, 50);

    // Parallax effect for blobs
    const xPos = (x / window.innerWidth - 0.5) * 40;
    const yPos = (y / window.innerHeight - 0.5) * 40;
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.5;
        blob.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
    });
});

// Magnetic & Hover effect on button
launchBtn.addEventListener('mousemove', (e) => {
    cursorGlow.classList.add('hovering');
    const rect = launchBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    launchBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
});

launchBtn.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('hovering');
    launchBtn.style.transform = `translate(0px, 0px) scale(1)`;
});

// =========================================
// PARTICLE SYSTEM
// =========================================
const particlesContainer = document.getElementById('particles-container');
const particleCount = 40;

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 2; // 2px to 6px
        const left = Math.random() * 100; // 0vw to 100vw
        const duration = Math.random() * 5 + 3; // 3s to 8s
        const delay = Math.random() * 5; // 0s to 5s
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}vw`;
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// =========================================
// CINEMATIC LAUNCH SEQUENCE
// =========================================
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

launchBtn.addEventListener('click', async function(e) {
    // 0. Disable interactions & Button Ripple
    document.body.style.pointerEvents = 'none';
    const btnGlow = this.querySelector('.btn-glow');
    btnGlow.classList.add('ripple-effect');
    
    // 1. Cinematic Activation
    document.body.classList.add('cinematic-mode');
    document.body.classList.add('shake-effect');
    
    // Zoom in hero section and fade out
    heroSection.style.transform = 'scale(1.5) translateZ(100px)';
    heroSection.style.opacity = '0';
    
    await sleep(1000);
    heroSection.style.display = 'none';
    document.body.classList.remove('shake-effect');

    // Show Initializing
    const statusText = document.getElementById('status-text');
    statusText.classList.add('show');
    
    await sleep(2000);
    statusText.classList.remove('show');
    
    // 2. Energy Core
    await sleep(500);
    const energyCoreContainer = document.getElementById('energy-core-container');
    energyCoreContainer.classList.add('active');
    
    // Wait for core to pulse and explode (animation takes ~2.5s)
    await sleep(2400);
    energyCoreContainer.style.display = 'none';
    
    // 3 & 4. Text Sequence
    const words = ["Education", "Innovation", "Technology", "Future", "Begins Now"];
    const sequenceContainer = document.getElementById('sequence-word');
    
    for (let word of words) {
        sequenceContainer.innerText = word;
        sequenceContainer.classList.remove('word-animate');
        // Trigger reflow to restart animation
        void sequenceContainer.offsetWidth; 
        sequenceContainer.classList.add('word-animate');
        await sleep(800); // Wait for word animation to almost finish
    }
    
    sequenceContainer.style.display = 'none';

    // 5. Final Logo Reveal
    await sleep(200);
    const finalReveal = document.getElementById('final-reveal');
    finalReveal.classList.add('active');
    
    // Add subtle camera shake for impact
    document.body.classList.add('shake-effect');
    setTimeout(() => document.body.classList.remove('shake-effect'), 200);

    // Let the user admire the final logo
    await sleep(3500);

    // 6. Portal Transition & Redirect
    const portal = document.getElementById('portal-overlay');
    portal.classList.add('portal-open');
    
    await sleep(1500); // Wait for portal to fill screen
    
    // Redirect to actual site
    window.location.href = 'https://eduguru.lk';
});
