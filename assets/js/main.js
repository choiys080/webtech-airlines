/**
* Template Name: Moderna
* Template URL: https://bootstrapmade.com/free-bootstrap-template-corporate-moderna/
* Updated: May 7 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-carousel', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-wrap',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Init Clients swiper sliders
   */
  function initClientsSwiper() {
    document.querySelectorAll('.clients-swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initClientsSwiper);

  document.addEventListener('DOMContentLoaded', () => {
    // 모든 아이콘 박스 선택
    const iconBoxes = document.querySelectorAll('.icon-box');
  
    iconBoxes.forEach(box => {
      box.addEventListener('click', (e) => {
        // Remove 'selected' class from all icon boxes
        iconBoxes.forEach(b => b.classList.remove('selected'));
  
        // 아이콘 박스 클릭 이벤트 처리
        e.currentTarget.classList.add('selected');
  
        // 선택된 답변 저장
        const selectedAnswer = e.currentTarget.dataset.answer;
        console.log('Selected Answer:', selectedAnswer);
        
        // You can store the selected answer in local storage or some form data
        localStorage.setItem('question' + document.querySelector('#question-title a').innerText.slice(1), selectedAnswer);
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    // MBTI 계산 및 결과 표시
    const answers = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0
    };
  
    const questions = [
      { key: 'question1', dimension: ['E', 'I'] },
      { key: 'question2', dimension: ['S', 'N'] },
      { key: 'question3', dimension: ['T', 'F'] },
      { key: 'question4', dimension: ['J', 'P'] },
      { key: 'question5', dimension: ['E', 'I'] },
      { key: 'question6', dimension: ['S', 'N'] },
      { key: 'question7', dimension: ['T', 'F'] },
      { key: 'question8', dimension: ['J', 'P'] },
      { key: 'question9', dimension: ['E', 'I'] },
      { key: 'question10', dimension: ['S', 'N'] },
      { key: 'question11', dimension: ['T', 'F'] },
      { key: 'question12', dimension: ['J', 'P'] }
    ];
  
    questions.forEach(question => {
      const answer = localStorage.getItem(question.key);
      if (answer) {
        answers[answer]++;
      }
    });
  
    const mbti = [
      answers.E > answers.I ? 'E' : 'I',
      answers.S > answers.N ? 'S' : 'N',
      answers.T > answers.F ? 'T' : 'F',
      answers.J > answers.P ? 'J' : 'P'
    ].join('');
  
    document.getElementById('mbti-result').innerText = mbti;
  
    const skillMfContainer = document.getElementById('mbti-skill-mf');
    const totalQuestions = questions.length / 2; // Number of questions per dimension
  
    Object.keys(answers).forEach(key => {
      const percentage = (answers[key] / totalQuestions) * 100;
      const skillElement = document.createElement('div');
      skillElement.innerHTML = `
        <span>${key}</span> <span class="pull-right">${percentage.toFixed(2)}%</span>
        <div class="progress">
          <div class="progress-bar ${key.toLowerCase()}" role="progressbar" style="width: ${percentage}%" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`;
      skillMfContainer.appendChild(skillElement);
    });
  
    // Redirect to the specific MBTI type page
    setTimeout(() => {
      window.location.href = mbti + ".html";
    }, 3000); // Redirects after 3 seconds
  });

  document.getElementById('scroll-arrow').addEventListener('click', function() {
    // 원하는 위치로 스크롤 (여기서는 페이지 맨 아래로 스크롤)
    window.scrollTo({
      top: document.body.scrollHeight, // 페이지 맨 아래로
      behavior: 'smooth' // 부드러운 스크롤
    });
  });

})();
