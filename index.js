/* ==========================================================================
   Socialab Media Solutions — index.js
   Plain vanilla JS. No Bootstrap JS bundle needed.
   Handles: mobile nav, header scroll style, feature tabs, service "read more",
   FAQ accordion, scroll-to-top button, and a light scroll reveal.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.querySelector('.mobile-nav-toggle');
  var navMenu = document.querySelector('.navmenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('show');
    });

    var navClose = navMenu.querySelector('.nav-close');
    if (navClose) {
      navClose.addEventListener('click', function () {
        navMenu.classList.remove('show');
      });
    }

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('show');
      });
    });
  }

  /* ---------------- Header style on scroll ---------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader);
  }

  /* ---------------- Feature tabs (Clarity / Ease / Results) ---------------- */
  var tabButtons = document.querySelectorAll('[data-tab-target]');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-tab-target');
      var group = btn.closest('.feature-tabs-wrapper');
      if (!group) return;

      group.querySelectorAll('[data-tab-target]').forEach(function (b) {
        b.classList.remove('active');
      });
      group.querySelectorAll('.tab-pane').forEach(function (pane) {
        pane.classList.remove('active');
      });

      btn.classList.add('active');
      var pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });

  /* ---------------- Service card "Read More" ---------------- */
  document.querySelectorAll('.read-more[data-more-target]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(link.getAttribute('data-more-target'));
      if (!target) return;

      var isOpen = target.classList.toggle('show');
      link.innerHTML = isOpen
        ? 'Read Less <i class="bi bi-arrow-up"></i>'
        : 'Read More <i class="bi bi-arrow-right"></i>';
    });
  });

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('h3');
    if (!question) return;

    question.addEventListener('click', function () {
      var alreadyOpen = item.classList.contains('open');

      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });

      if (!alreadyOpen) item.classList.add('open');
    });
  });
  

  /* ---------------- Scroll to top button ---------------- */
  var scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    var onScrollTop = function () {
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    };
    onScrollTop();
    window.addEventListener('scroll', onScrollTop);

    scrollTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Light scroll reveal (also covers data-aos) ---------------- */
  var revealEls = document.querySelectorAll('.reveal, [data-aos]');

  revealEls.forEach(function (el) {
    var delay = el.getAttribute('data-aos-delay');
    if (delay) {
      el.style.transitionDelay = (parseInt(delay, 10) / 1000) + 's';
    }
  });

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

});
