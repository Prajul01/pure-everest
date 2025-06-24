
    // Self-initializing header script
    (function() {
        // Wait for DOM to be ready
        function initHeader() {
            console.log('Initializing header from header.html...');

            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('.nav');
            const getQuoteBtn = document.getElementById('getQuoteBtn');
            const quoteModal = document.getElementById('quoteModal');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const quoteForm = document.getElementById('quoteForm');
            const header = document.querySelector('.header');

            // Update active nav link
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });

            // Header scroll effect
            if (header) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            }

            // Mobile menu toggle
            if (menuToggle && nav) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nav.classList.toggle('active');
                });

                document.addEventListener('click', (e) => {
                    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                        nav.classList.remove('active');
                    }
                });
            }

            // Quote modal functionality
            if (getQuoteBtn && quoteModal && closeModalBtn) {
                console.log('Setting up quote modal...');

                getQuoteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Opening modal...');
                    quoteModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });

                closeModalBtn.addEventListener('click', () => {
                    quoteModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });

                quoteModal.addEventListener('click', (e) => {
                    if (e.target === quoteModal) {
                        quoteModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });
            }
            // Form submission
            if (quoteForm) {
                quoteForm.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    const formData = new FormData(quoteForm);
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        product: formData.get('product'),
                        quantity: formData.get('quantity'),
                        phone: formData.get('phone'),
                        country: formData.get('country')
                    };

                    const submitBtn = quoteForm.querySelector('.submit-btn');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Submitting...';
                    submitBtn.disabled = true;

                    try {

                        const response = await fetch('https://script.google.com/macros/s/AKfycbwjuK4r97Ly-wr6zrS1xzdBomfWa2GkAZWMX1BcgG0PIv6X-hJQvvkn8L9uSLPaJcO0qw/exec', {
                            method: 'POST',
                            mode: 'no-cors', // Use no-cors to bypass CORS checks
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        });

                        // With no-cors, response is opaque; assume success if no network error
                        alert('Thank you! Your quote request has been submitted.');
                        quoteForm.reset();
                        quoteModal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    } catch (error) {
                        console.error('Error:', error);
                        alert('There was an error. Please try again. Check console for details.');
                    } finally {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                });
            }        }

        // Initialize immediately if DOM is ready, otherwise wait
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHeader);
        } else {
            // Small delay to ensure all elements are rendered
            setTimeout(initHeader, 100);
        }
    })();
