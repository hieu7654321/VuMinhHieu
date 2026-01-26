# VuMinhHieu

link preview: https://allbirds-9858.myshopify.com/
password: meeffa

Put FAQ inside theme.liquid
```
  <!doctype html>
  <html
    {% if request.design_mode %}
      class="shopify-design-mode"
    {% endif %}
    lang="{{ request.locale.iso_code }}"
  >
    <head>
      {%- if settings.favicon != blank -%}
        <link
          rel="icon"
          type="image/png"
          href="{{ settings.favicon | image_url: width: 32, height: 32 }}"
        >
      {%- endif -%}
  
      {% comment %} This a way to wait for main content to load when navigating to a new page so that the view transitions can work consistently {% endcomment %}
      {% if settings.transition_to_main_product or settings.page_transition_enabled %}
        <link
          rel="expect"
          href="#MainContent"
          blocking="render"
          id="view-transition-render-blocker"
        >
      {% endif %}
  
      {%- render 'meta-tags' -%}
      {%- render 'stylesheets' -%}
      {%- render 'fonts' -%}
      {%- render 'scripts' -%}
      {%- render 'theme-styles-variables' -%}
      {%- render 'color-schemes' -%}
  
      {% if request.design_mode %}
        {%- render 'theme-editor' -%}
      {% endif %}
  
      {{ content_for_header }}
    </head>
  
    <body class="page-width-{{ settings.page_width }} card-hover-effect-{{ settings.card_hover_effect }}">
      {% render 'skip-to-content-link', href: '#MainContent', text: 'accessibility.skip_to_text' %}
      <div id="header-group">
        {% sections 'header-group' %}
      </div>
  
      <script>
        // Inline header height calculation to prevent layout shift
        // Note: Updates in calculateHeaderGroupHeight() and updateTransparentHeaderOffset()utilities.js should be kept in sync with this function
        (function setHeaderHeighCustomProperties() {
          /*
           * Header calculation functions for maintaining CSS variables
           * Mimic calculateHeaderGroupHeight() in utilities.js
           */
          const header = document.querySelector('header-component');
          const headerGroup = document.querySelector('#header-group');
          const hasHeaderSection = headerGroup?.querySelector('.header-section');
  
          if (!header || !headerGroup) return;
  
          const headerHeight = header.offsetHeight;
  
          // Calculate the total height of the header group
          let headerGroupHeight = 0;
          const children = headerGroup.children;
          for (let i = 0; i < children.length; i++) {
            const element = children[i];
            if (element === header || !(element instanceof HTMLElement)) continue;
            headerGroupHeight += element.offsetHeight;
          }
  
          // Check for transparent header special case
          if (header.hasAttribute('transparent') && header.parentElement?.nextElementSibling) {
            headerGroupHeight += headerHeight;
          }
  
          // Set CSS variables
          document.body.style.setProperty('--header-height', `${headerHeight}px`);
          document.body.style.setProperty('--header-group-height', `${headerGroupHeight}px`);
  
          /**
           * Updates CSS custom properties for transparent header offset calculation
           * Mimic updateTransparentHeaderOffset() in utilities.js
           */
  
          if (!hasHeaderSection || !header?.hasAttribute('transparent')) {
            document.body.style.setProperty('--transparent-header-offset-boolean', '0');
            return;
          }
  
          const hasImmediateSection = hasHeaderSection.nextElementSibling?.classList.contains('shopify-section');
  
          const shouldApplyOffset = !hasImmediateSection ? '1' : '0';
          document.body.style.setProperty('--transparent-header-offset-boolean', shouldApplyOffset);
        })();
      </script>
  
      <main
        id="MainContent"
        class="content-for-layout"
        role="main"
        data-page-transition-enabled="{{ settings.page_transition_enabled }}"
        data-product-transition="{{ settings.transition_to_main_product }}"
        data-template="{{ template }}"
      >
        {{ content_for_layout }}
      </main>
      <h1>FAQs on Design & Development</h1>
      <div class="container">
          <div class="faq-item">
              <div class="question"><span class="qbold">1. How much does a new website cost?</span><span class="mark">+</span></div>
              <div class="answer">
                  <h4><strong>Interdum velit euismod in pellentesque massa placerat duis. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nibh nisi condimentum.</strong></h4>
                  <p>- Mattis nunc sed blandit libero volutpat.</p>
                  <p>- Tortor at risus viverra adipiscing at in tellus.</p>
                  <p>- Purus ut faucibus pulvinar elementum.</p>
                  <p>- Blandit turpis cursus in hac habitasse.</p>
              </div>
          </div>
          <div class="faq-item">
              <div class="question"><span class="qbold">2. Do you only create Wordpress websites?</span><span class="mark">+</span></div>
              <div class="answer">
                  <h4><strong>Interdum velit euismod in pellentesque massa placerat duis. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nibh nisi condimentum.</strong></h4>
                  <p>- Mattis nunc sed blandit libero volutpat.</p>
                  <p>- Tortor at risus viverra adipiscing at in tellus.</p>
                  <p>- Purus ut faucibus pulvinar elementum.</p>
                  <p>- Blandit turpis cursus in hac habitasse.</p>
              </div>
          </div>
          <div class="faq-item">
              <div class="question"><span class="qbold">3. Will you maintain my website for me?</span><span class="mark">+</span></div>
              <div class="answer">
                  <h4><strong>Interdum velit euismod in pellentesque massa placerat duis. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nibh nisi condimentum.</strong></h4>
                  <p>- Mattis nunc sed blandit libero volutpat.</p>
                  <p>- Tortor at risus viverra adipiscing at in tellus.</p>
                  <p>- Purus ut faucibus pulvinar elementum.</p>
                  <p>- Blandit turpis cursus in hac habitasse.</p>
              </div>
          </div>
          <div class="faq-item">
              <div class="question"><span class="qbold">4. Will my website be mobile-friendly?</span><span class="mark">+</span></div>
              <div class="answer">
                  <h4><strong>Interdum velit euismod in pellentesque massa placerat duis. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nibh nisi condimentum.</strong></h4>
                  <p>- Mattis nunc sed blandit libero volutpat.</p>
                  <p>- Tortor at risus viverra adipiscing at in tellus.</p>
                  <p>- Purus ut faucibus pulvinar elementum.</p>
                  <p>- Blandit turpis cursus in hac habitasse.</p>
              </div>
          </div>
          <div class="faq-item">
              <div class="question"><span class="qbold">5. How long does it take to build a website?</span><span class="mark">+</span></div>
              <div class="answer">
                  <h4><strong>Interdum velit euismod in pellentesque massa placerat duis. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nibh nisi condimentum.</strong></h4>
                  <p>- Mattis nunc sed blandit libero volutpat.</p>
                  <p>- Tortor at risus viverra adipiscing at in tellus.</p>
                  <p>- Purus ut faucibus pulvinar elementum.</p>
                  <p>- Blandit turpis cursus in hac habitasse.</p>
              </div>
          </div>
      </div>
  
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background-color: lightgray;
          }
          h1 {
              text-align: center;
          }
          .container {
              max-width: 800px;
              margin: auto;
              background-color: lightgray;
              padding: 20px;
          }
          .faq-item {
              margin-bottom: 5px;
              background-color: white;
              overflow: hidden;
          }
          .question {
              padding: 20px;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: white;
              transition: background-color 0.3s ease, color 0.3s ease;
              font-size: 20px;
          }
          .question:hover {
              background-color: rgb(70, 70, 255);
              color: white;
          }
          .qbold {
              font-weight: bold;
          }
          .answer {
              margin-left: 20px;
              display: none;
              background-color: white;
              padding-bottom: 20px;
          }
          .mark {
              margin-left: 10px;
              font-size: 40px;
              line-height: 1;
              user-select: none;
              font-weight: normal; 
          }
  
          @media (max-width: 768px) {
              .question {
                  padding: 12px;
                  font-size: 16px;
              }
              .answer {
                  padding: 12px;
              }
              .container {
                  padding: 15px;
              }
          }
          @media (max-width: 480px) {
              .question {
                  font-size: 14px;
                  padding: 10px;
              }
              .qbold {
                  line-height: 1.4;
              }
          }
      </style>
  
      <script>
          document.addEventListener("DOMContentLoaded", function() {
              const faqItems = document.querySelectorAll('.faq-item');
              let openItem = null;
              
              faqItems.forEach(item => {
                  const question = item.querySelector('.question');
                  const answer = item.querySelector('.answer');
                  const mark = question.querySelector('.mark');
                  answer.style.display = 'none';
                  
                  question.addEventListener('click', () => {
                      if (openItem === item) {
                          answer.style.display = 'none';
                          question.style.backgroundColor = 'white';
                          question.style.color = 'black';
                          mark.textContent = '+';
                          openItem = null;
                          answer.style.maxHeight = '0';
                      } else {
                          if (openItem) {
                              const prevAnswer = openItem.querySelector('.answer');
                              const prevQuestion = openItem.querySelector('.question');
                              const prevMark = prevQuestion.querySelector('.mark');
                              prevAnswer.style.display = 'none';
                              prevQuestion.style.backgroundColor = 'white';
                              prevQuestion.style.color = 'black';
                              prevMark.textContent = '+';
                              answer.style.maxHeight = '0';
                          }
                          
                          answer.style.display = 'block';
                          question.style.backgroundColor = 'rgb(70, 70, 255)';
                          question.style.color = 'white';
                          mark.textContent = '−';
                          openItem = item;
                          answer.style.maxHeight = answer.scrollHeight + 'px';
                      }
                  });
              });
          });
      </script>
  
      <div class="popup-overlay" id="popupOverlay">
          <div class="popup-container">
              <div class="popup-image"></div>
              <div class="popup-content">
                  <h1>Stay updated.</h1>
                  <p>Enter your email below to join our awesome mailing list.</p>
                  <input 
                      type="email" 
                      class="email-input" 
                      id="emailInput" 
                      placeholder="Your email"
                  >
                  <div class="error-message" id="errorMessage">Please enter a valid email address</div>
                  <div class="popup-buttons">
                      <button class="btn btn-submit" id="submitBtn">Submit</button>
                      <button class="btn btn-no-thanks" id="noThanksBtn">No thanks</button>
                  </div>
              </div>
          </div>
      </div>
  
      {% sections 'footer-group' %}
  
      {% render 'search-modal' %}
  
      {% if settings.quick_add or settings.mobile_quick_add %}
        {% render 'quick-add-modal' %}
      {% endif %}
    </body>
  
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
  
      body {
        font-family: Arial, Helvetica, sans-serif;
      }
  
      .popup-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        animation: fadeIn 0.3s ease-in-out;
      }
      .popup-overlay.show {
        display: flex;
        justify-content: center;
        align-items: center;
      }
  
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .popup-container {
        display: flex;
        width: 90%;
        max-width: 800px;
        background: rgb(51, 51, 51);
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.4s ease-out;
        padding: 16px;
      }
  
      @keyframes slideUp {
        from {
          transform: translateY(50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .popup-image {
        width: 50%;
        background: url(https://www.absolutearts.com/portfolio3/a/ankor/still_life-1537370472l.jpg) no-repeat center center/cover;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 24px;
      }
  
      .popup-content {
        width: 50%;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #fff;
      }
      .popup-content h1 {
        font-size: 72px;
        margin-bottom: 20px;
        color: #333;
        line-height: 1;
      }
      .popup-content p {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 25px;
        color: #555;
      }
  
      .email-input {
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
        border: 2px solid black;
        border-radius: 5px;
        font-size: 14px;
        transition: border-color 0.3s;
      }
      .email-input:focus {
        outline: none;
        border-color: #667eea;
      }
  
      .popup-buttons {
        gap: 10px;
      }
  
      .btn {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
      }
  
      .btn-submit {
        background: #667eea;
        color: #fff;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .btn-submit:hover:not(:disabled) {
        background: #5568d3;
        transform: translateY(-2px);
      }
      .btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
  
      .btn-no-thanks {
        font-weight: bold;
        text-decoration: underline;
        background-color: #fff;
      }
      .btn-no-thanks:hover {
        transform: translateY(-2px);
      }
  
      .error-message {
        color: #e74c3c;
        font-size: 12px;
        margin-top: -15px;
        margin-bottom: 15px;
        display: none;
      }
      .error-message.show {
        display: block;
      }
  
      @media (max-width: 600px) {
        .popup-container {
          flex-direction: column;
        }
        .popup-image {
          width: 100%;
          min-height: 200px;
        }
        .popup-content {
          width: 100%;
          padding: 30px;
        }
        .popup-content h1 {
          font-size: 28px;
        }
      }
    </style>
  
    <script>
          const COOKIE_NAME = 'popup_closed';
          const COOKIE_EXPIRY = 7;
  
          function setCookie(name, value, days) {
              const date = new Date();
              date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
              const expires = "expires=" + date.toUTCString();
              document.cookie = name + "=" + value + ";" + expires + ";path=/";
          }
  
          function getCookie(name) {
              const nameEQ = name + "=";
              const cookies = document.cookie.split(';');
              for (let cookie of cookies) {
                  cookie = cookie.trim();
                  if (cookie.indexOf(nameEQ) === 0) {
                      return cookie.substring(nameEQ.length);
                  }
              }
              return null;
          }
  
          function validateEmail(email) {
              const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return regex.test(email);
          }
  
          function closePopup() {
              const popup = document.getElementById('popupOverlay');
              popup.classList.remove('show');
              setCookie(COOKIE_NAME, 'true', COOKIE_EXPIRY);
          }
  
          function showPopup() {
              if (!getCookie(COOKIE_NAME)) {
                  const popup = document.getElementById('popupOverlay');
                  popup.classList.add('show');
              }
          }
  
          document.getElementById('submitBtn').addEventListener('click', () => {
              const email = document.getElementById('emailInput').value;
              const errorMsg = document.getElementById('errorMessage');
  
              if (!validateEmail(email)) {
                  errorMsg.classList.add('show');
                  return;
              }
  
              errorMsg.classList.remove('show');
              closePopup();
          });
  
          document.getElementById('noThanksBtn').addEventListener('click', closePopup);
  
          document.getElementById('emailInput').addEventListener('input', () => {
              document.getElementById('errorMessage').classList.remove('show');
          });
  
          window.addEventListener('load', showPopup);
      </script>
  </html>
```
