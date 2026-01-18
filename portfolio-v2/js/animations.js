/**
 * ANIMATIONS.JS
 * GSAP scroll-triggered animations
 * Note: Using immediateRender: false to prevent elements from being hidden before animation triggers
 */

(function() {
    'use strict';

    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Default scroll trigger config
    const defaultScrollConfig = {
        immediateRender: false
    };

    // ============================================
    // HERO ANIMATIONS
    // ============================================

    // Hero entrance animation (no scroll trigger needed - plays on load)
    const heroTimeline = gsap.timeline({ delay: 0.3 });

    heroTimeline
        .from('.hero-label', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.title-line', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-tagline', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-stats', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-cta', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-scroll', {
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.2');

    // ============================================
    // SECTION HEADERS
    // ============================================

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.section-number').forEach(number => {
        gsap.from(number, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: number,
                start: 'top 85%'
            }
        });
    });

    // ============================================
    // ABOUT SECTION
    // ============================================

    if (document.querySelector('.about-grid')) {
        gsap.from('.about-content', {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 70%'
            }
        });

        gsap.from('.about-card', {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 70%'
            }
        });
    }

    // ============================================
    // TIMELINE ITEMS
    // ============================================

    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');

        if (marker) {
            gsap.from(marker, {
                scale: 0,
                duration: 0.4,
                ease: 'back.out(2)',
                immediateRender: false,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 75%'
                }
            });
        }

        if (content) {
            gsap.from(content, {
                x: 50,
                opacity: 0,
                duration: 0.8,
                delay: 0.1,
                ease: 'power3.out',
                immediateRender: false,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 75%'
                }
            });
        }
    });

    // ============================================
    // PROJECT CARDS
    // ============================================

    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: (index % 3) * 0.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });

    // Project filter animation
    if (document.querySelector('.project-filter')) {
        gsap.from('.project-filter', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: '.project-filter',
                start: 'top 85%'
            }
        });
    }

    // ============================================
    // SKILL CATEGORIES
    // ============================================

    gsap.utils.toArray('.skill-category').forEach((category, index) => {
        gsap.from(category, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: category,
                start: 'top 85%'
            }
        });

        // Animate skill tags within
        const tags = category.querySelectorAll('.skill-tag');
        if (tags.length > 0) {
            gsap.from(tags, {
                scale: 0.8,
                opacity: 0,
                duration: 0.4,
                stagger: 0.03,
                delay: 0.2,
                ease: 'back.out(1.5)',
                immediateRender: false,
                scrollTrigger: {
                    trigger: category,
                    start: 'top 85%'
                }
            });
        }
    });

    // ============================================
    // CONTACT SECTION
    // ============================================

    if (document.querySelector('.contact-grid')) {
        gsap.from('.contact-info', {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 70%'
            }
        });

        gsap.from('.contact-form', {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 70%'
            }
        });
    }

    gsap.utils.toArray('.contact-link').forEach((link, index) => {
        gsap.from(link, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: '.contact-links',
                start: 'top 80%'
            }
        });
    });

    // ============================================
    // FORM INPUTS ANIMATION
    // ============================================

    gsap.utils.toArray('.form-group').forEach((group, index) => {
        gsap.from(group, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 70%'
            }
        });
    });

    // ============================================
    // HOVER ANIMATIONS
    // ============================================

    // Project card hover enhancement
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Button hover animations
    document.querySelectorAll('.btn').forEach(btn => {
        const svg = btn.querySelector('svg');
        if (svg) {
            btn.addEventListener('mouseenter', () => {
                gsap.to(svg, {
                    x: 3,
                    y: -3,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(svg, {
                    x: 0,
                    y: 0,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        }
    });

    // ============================================
    // REFRESH SCROLLTRIGGER ON LOAD
    // ============================================

    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Refresh on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

})();
