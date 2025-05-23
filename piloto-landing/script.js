document.addEventListener('DOMContentLoaded', function() {
    // Controle de alternância entre visualização desktop e mobile
    const viewToggleBtn = document.getElementById('viewToggle');
    const bodyElement = document.body;
    const toggleText = viewToggleBtn.querySelector('span');
    const toggleIcon = viewToggleBtn.querySelector('i');
    
    let isMobileView = false;
    
    viewToggleBtn.addEventListener('click', function() {
        if (isMobileView) {
            // Mudar para visualização desktop
            bodyElement.classList.remove('mobile-view');
            toggleText.textContent = 'Visualizar em Mobile';
            toggleIcon.className = 'fas fa-mobile-alt';
            isMobileView = false;
        } else {
            // Mudar para visualização mobile
            bodyElement.classList.add('mobile-view');
            toggleText.textContent = 'Visualizar em Desktop';
            toggleIcon.className = 'fas fa-desktop';
            isMobileView = true;
            
            // Rolar para o topo ao mudar para visualização mobile
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Forçar a reprodução do vídeo após a mudança de visualização
        const iframe = document.getElementById('piloto-video');
        if (iframe) {
            // Recarregar o iframe para forçar a reprodução
            iframe.src = iframe.src;
        }
    });

    // Carregar a API do YouTube
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Função para garantir que o vídeo seja reproduzido automaticamente
    function garantirReproducaoAutomatica() {
        // Tentar reproduzir o vídeo usando a API do YouTube
        if (typeof YT !== 'undefined' && YT.Player) {
            try {
                var iframe = document.getElementById('piloto-video');
                if (iframe) {
                    var player = new YT.Player('piloto-video', {
                        events: {
                            'onReady': function(event) {
                                event.target.playVideo();
                                console.log('Vídeo iniciado via API do YouTube');
                            }
                        }
                    });
                }
            } catch (e) {
                console.log('Erro ao iniciar o vídeo:', e);
            }
        }
    }
    
    // Tentar reproduzir o vídeo quando a página carregar
    window.addEventListener('load', function() {
        garantirReproducaoAutomatica();
        
        // Tentar novamente após 2 segundos (caso a API do YouTube não tenha carregado ainda)
        setTimeout(garantirReproducaoAutomatica, 2000);
    });
    
    // Adicionar evento de clique para garantir a reprodução em dispositivos móveis
    document.addEventListener('click', function() {
        garantirReproducaoAutomatica();
    }, { once: true });
    
    // Verificar periodicamente se o vídeo está reproduzindo
    setInterval(garantirReproducaoAutomatica, 5000);

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = '#ffffff';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.background = '#ffffff';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Slider functionality
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;
    
    // Show only the current testimonial on mobile
    function updateTestimonials() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            testimonialCards.forEach((card, index) => {
                if (index === currentTestimonial) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            testimonialCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    // Removida a criação dos pontos de navegação (dots)
    
    function updateTestimonialDots() {
        // Função mantida vazia para compatibilidade com o código existente
    }
    
    // Auto-rotate testimonials on mobile
    setInterval(() => {
        if (window.innerWidth < 768) {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateTestimonialDots();
            updateTestimonials();
        }
    }, 5000);
    
    // Update testimonials on resize
    window.addEventListener('resize', updateTestimonials);
    
    // Initial update
    updateTestimonials();
    
    // Animation on scroll (simple version)
    const animateElements = document.querySelectorAll('.benefit-card, .testimonial-card, .faq-item');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class
    const style = document.createElement('style');
    style.innerHTML = `
        .benefit-card, .testimonial-card, .faq-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .benefit-card.animate, .testimonial-card.animate, .faq-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .benefit-card:nth-child(2), .testimonial-card:nth-child(2), .faq-item:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .benefit-card:nth-child(3), .testimonial-card:nth-child(3), .faq-item:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .benefit-card:nth-child(4), .testimonial-card:nth-child(4), .faq-item:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
});
