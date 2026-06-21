// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

let scrollObj = { frame: 1 };
let frameCache = new Map();
const frameCount = 696;
const preloadRadius = 15;
const retainRadius = 40;
let introTimeline = null;
let cinematicInitialized = false;

// ==========================================
// 1. INITIALIZATION & ROUTING (PJAX)
// ==========================================
window.addEventListener('load', () => {
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('Abdullah%20Anti-Grivaty/') || window.location.pathname.endsWith('Abdullah%20Anti-Grivaty');
    
    if (isHome) {
        playIntroSequence(false);
    } else {
        const loaderContainer = document.getElementById('loader-container');
        if(loaderContainer) loaderContainer.style.display = 'none';
        if(!cinematicInitialized) { initCinematicSequence(); cinematicInitialized = true; }
        document.body.classList.add('loaded');
        initAllModules();
        if(window.apBot) window.apBot.init();
    }
});


function playIntroSequence(isPjax = false) {
    const loaderContainer = document.getElementById('loader-container');
    const skipBtn = document.getElementById('skip-intro-btn');
    if(!loaderContainer) return;

    loaderContainer.style.display = 'flex';
    gsap.set(loaderContainer, { opacity: 1 });
    
    // Fix Bug: Reset rest of letters BEFORE setting A and P, to prevent overriding
    gsap.set("#rest-1 .char-letter, #rest-2 .char-letter", { filter: "none", opacity: 1, x: 0, y: 0, rotate: 0, rotateX: 0, scale: 1 });
    gsap.set("#letter-A", { x: -800, y: 0, opacity: 0, rotate: -20, rotateX: 0, scale: 1, filter: "none" });
    gsap.set("#letter-P", { x: 0, y: -800, opacity: 0, rotate: 0, rotateX: 0, scale: 2, filter: "none" });
    gsap.set(".subtitle-letter", { opacity: 0, y: 10, filter: "blur(4px)" });
    gsap.set("#luxury-line", { width: "0%", opacity: 0 });
    document.querySelectorAll('.dialogue-bubble').forEach(e => e.remove());

    // Reveal logo wrapper after setup to prevent FOUC
    gsap.set("#logo-wrapper", { visibility: "visible" });

    if(!isPjax) createAmbientParticles();
    
    if(introTimeline) introTimeline.kill();
    introTimeline = gsap.timeline();
    const tl = introTimeline;

    // Fade in skip button
    if(skipBtn) {
        gsap.to(skipBtn, { opacity: 1, pointerEvents: 'auto', duration: 0.5 });
        skipBtn.onclick = () => {
            if(introTimeline) introTimeline.kill();
            finishIntro();
        };
    }
    
    const chat = (selector, text, position, duration = 1.5) => {
        tl.call(() => {
            const el = document.querySelector(selector);
            if (!el) return;
            const bubble = document.createElement('div');
            bubble.className = 'dialogue-bubble';
            bubble.innerText = text;
            el.appendChild(bubble);
            gsap.to(bubble, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" });
            gsap.to(bubble, { opacity: 0, y: -10, scale: 0.8, duration: 0.3, delay: duration, onComplete: () => bubble.remove() });
        }, null, position);
    };

    const rest1 = document.getElementById('rest-1');
    if(rest1 && rest1.children.length > 1) {
        rest1.children[0].id = 'letter-b';
        rest1.children[rest1.children.length-1].id = 'letter-h';
    }
    const rest2 = document.getElementById('rest-2');
    if(rest2 && rest2.children.length > 2) {
        rest2.children[1].id = 'letter-r';
        rest2.children[3].id = 'letter-y';
    }

    tl.from("#rest-1 .char-letter", { y: 50, opacity: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.5)" })
      .to("#rest-1 .char-letter", { rotate: 5, yoyo: true, repeat: 3, duration: 0.15, stagger: 0.05 }, "+=0.2");
      
    chat('#letter-b', "Bro, where's A?", "+=0.2");
    chat('#letter-h', "Overslept. Again.", "+=1.8");

    tl.to("#letter-A", { opacity: 1, x: -100, rotate: 10, duration: 0.4, ease: "power2.in" }, "+=1.8");
    chat('#letter-A', "I CAN'T STOP!!", "<");

    tl.to("#letter-A", { x: 0, rotate: 0, duration: 0.1, ease: "none" })
      .to("#title-container", { x: 15, y: 5, duration: 0.05, yoyo: true, repeat: 5 }, "<")
      .to("#rest-1 .char-letter", { y: -40, x: "random(-20, 20)", rotate: "random(-45, 45)", duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1 }, "<")
      .to("#letter-A", { rotate: 180, x: -20, y: -20, duration: 0.3, ease: "power2.out" }, "<")
      .to("#letter-A", { y: 0, duration: 0.2, ease: "bounce.out" }, ">");

    tl.to({}, { duration: 0.5 }); 
    chat('#letter-A', "Nailed it.", "+=0");
    tl.to("#letter-A", { rotate: 0, x: 0, duration: 0.5, ease: "back.out(1.5)" }, "+=1.5");
    chat('#letter-b', "Idiot.", "+=0");

    tl.to("#rest-1 .char-letter", { x: 0, y: 0, rotate: 0, duration: 0.4, ease: "back.out(2)" }, "+=1.5");

    tl.from("#rest-2 .char-letter", { y: 30, opacity: 0, stagger: 0.05, duration: 0.5, ease: "back.out(1.5)" }, "+=0.5");

    chat('#letter-r', "Great, P is missing too.", "+=0.5");
    tl.to("#rest-2 .char-letter", { rotateX: 45, duration: 0.3 }, "+=2"); 
    chat('#letter-y', "Look up!", "+=0.2");

    tl.to("#letter-P", { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power4.in" }, "+=1.5")
      .to("#title-container", { y: 20, duration: 0.05, yoyo: true, repeat: 3 }, "<0.6")
      .to("#rest-2 .char-letter", { y: -20, rotateX: 0, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, "<0.6");
    
    chat('#letter-P', "Did someone order a hero?", "+=0.2");

    tl.to({}, { duration: 2 })
      .to(".char-letter, #letter-A, #letter-P", { filter: "drop-shadow(0px 0px 15px rgba(59, 130, 246, 0.6))", duration: 1 });

    tl.to('#luxury-line', { opacity: 1, width: '100%', duration: 0.8, ease: "power3.inOut" }, "-=0.5")
      .to(".subtitle-letter", { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.04, duration: 0.5, ease: "power2.out" }, "-=0.4");

    tl.to('#loader-container', { 
        opacity: 0, 
        duration: 1.5, 
        ease: "power2.inOut",
        delay: 1,
        onComplete: finishIntro
    });
}

function finishIntro() {
    const loaderContainer = document.getElementById('loader-container');
    const skipBtn = document.getElementById('skip-intro-btn');
    if(skipBtn) {
        gsap.to(skipBtn, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
    }
    gsap.to(loaderContainer, { 
        opacity: 0, 
        duration: 0.8, 
        onComplete: () => {
            if(loaderContainer) loaderContainer.style.display = 'none';
            if(!cinematicInitialized) { initCinematicSequence(); cinematicInitialized = true; }
            document.body.classList.add('loaded');
            initAllModules();
            if(window.apBot && !window.apBot.initialized) { window.apBot.init(); window.apBot.initialized = true; }
        }
    });
}

function createAmbientParticles() {
    let container = document.getElementById('ambient-particles');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ambient-particles';
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.overflow = 'hidden';
        container.style.zIndex = '0';
        const loader = document.getElementById('loader-container');
        if(loader) loader.prepend(container);
    }
    
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        container.appendChild(particle);

        if (window.gsap) {
            gsap.to(particle, {
                y: `-=${Math.random() * 100 + 50}`,
                x: `+=${Math.random() * 50 - 25}`,
                opacity: 0,
                duration: Math.random() * 5 + 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 5
            });
        }
    }
}

// PJAX Routing Interception
document.addEventListener('click', (e) => {
    if(e.target.closest('#mobile-menu') && e.target.tagName === 'A') {
        toggleMobileMenu(false);
    }

    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    if (href === window.location.pathname.split('/').pop()) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
        return;
    }

    e.preventDefault();
    navigateTo(href);
});

window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, false);
});

// Navigation Engine

async function navigateTo(url, pushState = true) {
    const mainContent = document.getElementById('page-content');
    const panels = document.querySelectorAll('.epic-panel');
    const logo = document.querySelector('.epic-logo');
    const canvas = document.querySelector('.cinematic-bg canvas');
    
    const isHome = url.endsWith('index.html') || url === '/' || url.endsWith('Abdullah%20Anti-Grivaty/') || url.endsWith('Abdullah%20Anti-Grivaty');

    if(panels.length === 0) {
        window.location.href = url;
        return;
    }

    const tl = gsap.timeline();

    if(isHome) {
        // Fade in intro loader
        const loaderContainer = document.getElementById('loader-container');
        if(loaderContainer) {
            loaderContainer.style.display = 'flex';
            tl.to(loaderContainer, { opacity: 1, duration: 0.5 }, 0);
        }
    } else {
        // Epic Shutter Transition (In)
        gsap.set(panels, { transformOrigin: 'top' });
        
        // 3D fold current page
        // Removed parent perspective to prevent position:fixed bug
        tl.to(mainContent, { transformPerspective: 1000, opacity: 0, rotationX: 10, scale: 0.9, y: -50, duration: 0.6, ease: "power2.inOut" }, 0);
        
        // Canvas warp
        tl.to(scrollObj, { frame: scrollObj.frame + 20, duration: 0.8, ease: "power3.inOut" }, 0);
        if(canvas) {
            tl.to(canvas, { scale: 1.15, filter: "brightness(0.3)", duration: 0.8, ease: "power3.inOut" }, 0);
        }
        
        // Drop shutters
        tl.to(panels, { scaleY: 1, duration: 0.6, stagger: 0.1, ease: "power3.inOut" }, 0.1);
        
        // Flash logo
        tl.fromTo(logo, 
            { opacity: 0, scale: 0.8, letterSpacing: "-2px" },
            { opacity: 1, scale: 1.1, letterSpacing: "15px", duration: 0.6, ease: "power3.out" }, 0.4
        );
    }

    await tl; 
    
    try {
        const response = await fetch(url);
        const htmlText = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        document.title = doc.title;
        
        const newContent = doc.getElementById('page-content');
        if (newContent) {
            mainContent.innerHTML = newContent.innerHTML;
        }

        document.body.className = doc.body.className;
        document.body.classList.add('loaded'); 

        if (pushState) {
            window.history.pushState({}, '', url);
        }

        window.scrollTo(0, 0);

        initAllModules();
        ScrollTrigger.refresh();

        if(isHome) {
            playIntroSequence(true);
        } else {
            // Epic Shutter Transition (Out)
            const tlOut = gsap.timeline();
            
            // Logo vanishes
            tlOut.to(logo, { opacity: 0, scale: 1.5, filter: "blur(10px)", duration: 0.4, ease: "power2.in" }, 0);
            
            // Shutters lift
            gsap.set(panels, { transformOrigin: 'bottom' });
            tlOut.to(panels, { scaleY: 0, duration: 0.6, stagger: 0.1, ease: "power3.inOut" }, 0.2);
            
            // Content unfolds from 3D
            tlOut.fromTo(mainContent, 
                { transformPerspective: 1000, opacity: 0, rotationX: -10, scale: 0.9, y: 50 },
                { opacity: 1, rotationX: 0, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4
            );
            
            // Canvas stabilizes
            if(canvas) {
                tlOut.to(canvas, { scale: 1.05, filter: "brightness(1)", duration: 1, ease: "power3.out" }, 0.2);
            }
        }

    } catch (err) {
        console.error("PJAX Navigation Error:", err);
        window.location.href = url;
    }
}


// ... the rest of the file ...
function initAllModules() {
    initCustomCursor();
    initAnimatedCounters();
    initStickyHeader();
    setupSectionReveals();
    updateActiveNav();
    initMagneticButtons();
    initMobileMenu();
    initInsightsLogic();
    initReadingProgress();
}

function updateActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if(!cursor) return;
    
    const interactables = document.querySelectorAll('.interactive-el, a, button, input');

    const clone = cursor.cloneNode(true);
    cursor.parentNode.replaceChild(clone, cursor);
    const newCursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', (e) => {
        gsap.to(newCursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const cursorText = el.getAttribute('data-cursor');
            if(cursorText) {
                newCursor.classList.add('with-text');
                newCursor.innerText = cursorText;
            } else {
                newCursor.classList.add('hovered');
                newCursor.innerText = '';
            }
        });
        el.addEventListener('mouseleave', () => {
            newCursor.classList.remove('hovered', 'with-text');
            newCursor.innerText = '';
        });
    });
}

function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = counter.hasAttribute('data-decimal');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                let current = 0;
                const duration = 2000;
                const frameRate = 1000 / 60;
                const totalFrames = Math.round(duration / frameRate);
                const increment = target / totalFrames;
                
                const updateCounter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(updateCounter);
                    }
                    counter.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
                }, frameRate);
            }
        });
    });
}

function initStickyHeader() {
    const header = document.getElementById('main-header');
    if(!header) return;
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100 && currentScroll > lastScroll && !document.getElementById('mobile-menu').classList.contains('active')) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    if(!btn) return;
    
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', () => {
        const isActive = newBtn.classList.contains('active');
        toggleMobileMenu(!isActive);
    });
}

function toggleMobileMenu(show) {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = menu.querySelectorAll('.mobile-nav-items a');
    
    if(!btn || !menu) return;

    if(show) {
        btn.classList.add('active');
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        gsap.fromTo(links, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.2 }
        );
    } else {
        btn.classList.remove('active');
        
        gsap.to(links, { opacity: 0, y: -20, duration: 0.3, stagger: 0.05, ease: "power2.in" });
        
        setTimeout(() => {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }, 400); 
    }
}

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-3d-container');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });
}

function initInsightsLogic() {
    const searchInput = document.getElementById('insights-search');
    const filterPills = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.insight-card-wrapper');

    if(!searchInput && filterPills.length === 0) return;

    const filterCards = () => {
        const term = searchInput ? searchInput.value.toLowerCase() : '';
        const activeFilter = document.querySelector('.filter-pill.active')?.getAttribute('data-filter') || 'all';

        cards.forEach(card => {
            const title = card.querySelector('h4').innerText.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(term);
            const matchesCategory = activeFilter === 'all' || category === activeFilter;

            if(matchesSearch && matchesCategory) {
                card.style.display = 'block';
                gsap.to(card, {opacity: 1, scale: 1, duration: 0.3});
            } else {
                gsap.to(card, {opacity: 0, scale: 0.95, duration: 0.3, onComplete: () => {
                    card.style.display = 'none';
                }});
            }
        });
    };

    if(searchInput) {
        searchInput.addEventListener('input', filterCards);
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterCards();
        });
    });
}

function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    if(!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

function initCinematicSequence() {
    const canvas = document.getElementById('scroll-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); 
    
    let loadingSet = new Set();
    
    const getFramePath = (index) => `assets/frames/frame_${index.toString().padStart(4, '0')}.jpg`;

    const drawToCanvas = (img) => {
        if (!img) return;
        if (canvas.width !== img.width || canvas.height !== img.height) {
            canvas.width = img.width;
            canvas.height = img.height;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const getFrame = (index, drawOnLoad = false, targetFrameRef = null) => {
        if (frameCache.has(index)) return frameCache.get(index);
        
        if (!loadingSet.has(index)) {
            loadingSet.add(index);
            const img = new Image();
            img.onload = () => {
                loadingSet.delete(index);
                frameCache.set(index, img);
                if (drawOnLoad && targetFrameRef === Math.round(scrollObj.frame)) {
                    drawToCanvas(img);
                }
            };
            img.src = getFramePath(index);
        }
        return null;
    };

    const renderFrame = (index) => {
        const img = getFrame(index, true, index);
        if (img) {
            drawToCanvas(img);
        } else {
            let closestDist = Infinity;
            let closestImg = null;
            for (let [key, value] of frameCache.entries()) {
                let dist = Math.abs(key - index);
                if (dist < closestDist) { closestDist = dist; closestImg = value; }
            }
            if (closestImg) drawToCanvas(closestImg);
        }
    };

    const manageCache = (currentIndex) => {
        for (let key of frameCache.keys()) {
            if (Math.abs(key - currentIndex) > retainRadius) {
                const img = frameCache.get(key);
                img.src = ""; 
                frameCache.delete(key);
            }
        }
    };

    const preloadNearby = (currentIndex) => {
        for (let i = 1; i <= preloadRadius; i++) {
            let next = currentIndex + i;
            let prev = currentIndex - i;
            if (next <= frameCount) getFrame(next);
            if (prev >= 1) getFrame(prev);
        }
    };

    const initialImg = new Image();
    initialImg.onload = () => {
        frameCache.set(1, initialImg);
        drawToCanvas(initialImg);
        preloadNearby(1);
    };
    initialImg.src = getFramePath(1);

    gsap.to(scrollObj, {
        frame: frameCount,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5
        },
        onUpdate: () => {
            requestAnimationFrame(() => {
                const targetFrame = Math.max(1, Math.min(frameCount, Math.round(scrollObj.frame)));
                renderFrame(targetFrame);
                preloadNearby(targetFrame);
                manageCache(targetFrame);
            });
        }
    });
}

function setupSectionReveals() {
    gsap.utils.toArray('.reveal-section').forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none reverse" } }
        );
    });
}
