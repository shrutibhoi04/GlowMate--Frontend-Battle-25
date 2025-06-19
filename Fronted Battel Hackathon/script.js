document.addEventListener('DOMContentLoaded', function() {

  const exploreBtn = document.getElementById('exploreBtn');
  const loader = document.getElementById('loader');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const mainContent = document.getElementById('mainContent');
  const productPage = document.getElementById('productPage');
  const backBtn = document.getElementById('backBtn');


  exploreBtn.addEventListener('click', function() {
    showLoader();
    startProgressAnimation();
  });


  function showLoader() {
    loader.style.display = 'flex';
  }

 
  function startProgressAnimation() {
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5; 

      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
  
        setTimeout(() => {
          showProductPage();
        }, 500);
      }

      progressFill.style.width = progress + '%';
      progressText.textContent = Math.floor(progress) + '%';
    }, 200);
  }


  function showProductPage() {

    loader.style.display = 'none';
    

    mainContent.classList.add('hide');
    

    setTimeout(() => {
      mainContent.style.display = 'none';
      productPage.classList.add('show');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  }


  backBtn.addEventListener('click', function() {
    goBackToHome();
  });


  function goBackToHome() {

    productPage.classList.remove('show');
    
    setTimeout(() => {
      productPage.style.display = 'none';
      mainContent.style.display = 'block';
      mainContent.classList.remove('hide');
      
  
      resetLoader();
      
 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  }


  function resetLoader() {
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
  }


  function initializeProductButtons() {
    document.querySelectorAll('.product-button').forEach(button => {
      button.addEventListener('click', function() {
        handleAddToCart(this);
      });
    });
  }

 
  function handleAddToCart(button) {
    const productName = button.getAttribute('data-product');
    const originalText = button.textContent;
    

    if (button.classList.contains('processing')) {
      return;
    }
    
    button.classList.add('processing');
    
  
    button.classList.add('pulse');
    

    button.textContent = 'Adding...';
    button.style.pointerEvents = 'none';
    
    setTimeout(() => {
   
      button.textContent = 'Added! ✓';
      button.classList.remove('pulse');
      button.classList.add('added');
      
  
      button.style.transform = 'scale(1.05)';
      
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
      

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('added', 'processing');
        button.style.pointerEvents = '';
      }, 3000);
      
    }, 800);
  }

 
  function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const messageDiv = document.getElementById('newsletterMessage');

    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
          showNewsletterMessage('Thank you for subscribing! You\'ll receive our latest beauty tips and exclusive offers.', 'success');
          emailInput.value = '';
        } else {
          showNewsletterMessage('Please enter a valid email address.', 'error');
        }
      });
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function showNewsletterMessage(message, type) {
      messageDiv.textContent = message;
      messageDiv.className = `newsletter-message show ${type}`;
      
  
      setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
          messageDiv.className = 'newsletter-message';
        }, 400);
      }, 5000);
    }
  }


  function animateProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }


  initializeProductButtons();


  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  
  function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }


  function addPulseAnimation() {
    document.querySelectorAll('.product-button').forEach(button => {
      button.addEventListener('click', function() {
        button.classList.add('pulse');
      });
    });
  }


  function addExploreButtonLoadingState() {
    exploreBtn.addEventListener('click', function() {
      showLoader();
      startProgressAnimation();
    });
  }

  initializeNewsletter();


  animateProductCards();


  function init() {
    initializeProductButtons();
    addPulseAnimation();
    initializeSmoothScrolling();
    addExploreButtonLoadingState();
    initializeNewsletter();
  }

 
  init();
});