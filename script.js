// =========================================
// 🎵 AUDIO SETUP
// =========================================
const sfxHover = new Audio('hover.mp3');
const sfxClick = new Audio('click.mp3');
const sfxBuildup = new Audio('buildup.mp3');
const sfxExplosion = new Audio('explosion.mp3');
const sfxWhoosh = new Audio('whoosh.mp3');
const sfxReveal = new Audio('choir.mp3');

// Set volume levels for optimal cinematic balance
sfxHover.volume = 0.2;
sfxBuildup.volume = 0.6;
sfxWhoosh.volume = 0.5;
sfxExplosion.volume = 0.7;
sfxReveal.volume = 0.8;

// =========================================
// CUSTOM CURSOR & PARALLAX LOGIC
// =========================================
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');
const launchBtn = document.getElementById('launch-btn');
const heroSection = document.getElementById('hero-section');
const blobs = document.querySelectorAll('.blob');

// Update cursor position and parallax background
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

// Magnetic & Hover effect on button with Sound Effect
launchBtn.addEventListener('mouseenter', () => {
    cursorGlow.classList.add('hovering');
    
    // Play hover sound
    sfxHover.currentTime = 0; 
    sfxHover.play();
});

launchBtn.addEventListener('mousemove', (e) => {
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
    // 0. Disable interactions & Play Click Sound
    document.body.style.pointerEvents = 'none';
    const btnGlow = this.querySelector('.btn-glow');
    btnGlow.classList.add('ripple-effect');
    
    // 🎵 Trigger sound sequence
    sfxClick.play();
    setTimeout(() => sfxBuildup.play(), 500);

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
    
    // 2. Energy Core Sequence
    await sleep(500);
    const energyCoreContainer = document.getElementById('energy-core-container');
    energyCoreContainer.classList.add('active');
    
    // Wait for core to pulse and explode
    await sleep(2400);
    energyCoreContainer.style.display = 'none';
    
    // 🎵 Play the explosion sound as core transitions away
    sfxExplosion.play();
    
    // 3 & 4. Text Sequence
    const words = ["Education", "Innovation", "Technology", "Future", "Begins Now"];
    const sequenceContainer = document.getElementById('sequence-word');
    
    for (let word of words) {
        sequenceContainer.innerText = word;
        sequenceContainer.classList.remove('word-animate');
        // Trigger reflow to restart the word-animation
        void sequenceContainer.offsetWidth; 
        sequenceContainer.classList.add('word-animate');
        
        // 🎵 Play Whoosh sound effect for every word
        sfxWhoosh.currentTime = 0;
        sfxWhoosh.play();
        
        await sleep(800);
    }
    
    sequenceContainer.style.display = 'none';

    // 5. Final Logo Reveal
    await sleep(200);
    const finalReveal = document.getElementById('final-reveal');
    finalReveal.classList.add('active');
    
    // 🎵 Play the final premium choir/reveal chord
    sfxReveal.play();

    // Add subtle camera shake for impact
    document.body.classList.add('shake-effect');
    setTimeout(() => document.body.classList.remove('shake-effect'), 200);

    // Let the user admire the final reveal
    await sleep(3500);

    // 6. Portal Transition & Redirect
    const portal = document.getElementById('portal-overlay');
    portal.classList.add('portal-open');
    
    await sleep(1500); // Wait for portal animation to complete
    
    // Redirect to final destination
    window.location.href = 'https://eduguru.lk';
});
