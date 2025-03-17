document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // Slider on Hero
  // =======================
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");
  const controlLeft = document.querySelector(".control-left");
  const controlRight = document.querySelector(".control-right");

  if (!sliderWrapper || slides.length === 0) return; // Prevent errors if elements are missing

  let currentIndex = 0;
  let totalSlides = slides.length;
  let isSliding = false;
  let sliderInterval;

  function updateHeroSlider() {
    // Renamed function to avoid conflicts
    if (isSliding) return;
    isSliding = true;

    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    setTimeout(() => {
      isSliding = false;
    }, 500);
  }

  controlRight?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateHeroSlider();
    resetAutoSlide();
  });

  controlLeft?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateHeroSlider();
    resetAutoSlide();
  });

  function startAutoSlide() {
    sliderInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateHeroSlider();
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(sliderInterval);
    startAutoSlide();
  }

  startAutoSlide(); // Start the slider automatically

  // =======================
  // Counter Animation
  // =======================
  function startCounter(counterElement) {
    let target = parseInt(counterElement.getAttribute("data-target"));
    let current = 0;
    let increment = target / 100; // Adjust speed

    function updateCounter() {
      current += increment;
      if (current >= target) {
        counterElement.innerText = target;
      } else {
        counterElement.innerText = Math.floor(current);
        requestAnimationFrame(updateCounter);
      }
    }

    updateCounter();
  }

  // Observe when the counter section is visible
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target); // Stop after first activation
        }
      });
    },
    { threshold: 0.5 } // Adjust visibility threshold
  );

  counters.forEach((counter) => observer.observe(counter));

  // =======================
  // Service Tabs
  // =======================
  const serviceImages = {
    diagnostic: "img/service-1.jpg",
    engine: "img/service-2.jpg",
    tires: "img/service-3.jpg",
    oil: "img/service-4.jpg",
  };

  const tabs = document.querySelectorAll(".service-tab");
  const serviceImage = document.getElementById("service-image");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const service = this.getAttribute("data-service");

      if (serviceImages[service]) {
        serviceImage.style.opacity = "0";
        setTimeout(() => {
          serviceImage.src = serviceImages[service];
          serviceImage.style.opacity = "1";
        }, 300);
      }
    });

    tab.addEventListener("mouseover", function () {
      this.classList.add("hover-effect");
      setTimeout(() => {
        this.classList.remove("hover-effect");
      }, 300);
    });
  });

  // =======================
  // Scroll to Top Button
  // =======================
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.opacity = window.scrollY > 200 ? "1" : "0";
      scrollTopBtn.style.pointerEvents = window.scrollY > 200 ? "auto" : "none";
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // // =======================
  // // Testimonials
  // // =======================
  // let testimonialCurrentIndex = 0;
  // const slidesPerScroll = 3;
  // const totalTestimonialSlides = 9;
  // const totalGroups = Math.ceil(totalTestimonialSlides / slidesPerScroll);
  // const testimonialSliderWrapper = document.querySelector(
  //   ".testimonial-wrapper"
  // );
  // const dots = document.querySelectorAll(".dot");
  // const testimonialItems = document.querySelectorAll(".testimonial-item");

  // function changeTestimonialSlide(index) {
  //   testimonialCurrentIndex = index;
  //   updateTestimonialSlider(); // Use renamed function
  // }

  function updateTestimonialSlider() {
    // Renamed function to avoid conflicts
    const slideWidth = document.querySelector(".testimonial-item").offsetWidth;
    const newTransform = -(
      testimonialCurrentIndex * (slideWidth * slidesPerScroll) +
      testimonialCurrentIndex * 20 * slidesPerScroll
    ); // Adjust for gap
    testimonialSliderWrapper.style.transform = `translateX(${newTransform}px)`;

    testimonialItems.forEach((item) => {
      item.querySelector(".testimonial-text").classList.remove("active-text");
    });

    const middleIndex = testimonialCurrentIndex * slidesPerScroll + 1;
    if (middleIndex < totalTestimonialSlides) {
      testimonialItems[middleIndex]
        .querySelector(".testimonial-text")
        .classList.add("active-text");
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle("active-dot", i === testimonialCurrentIndex);
    });
  }

  setInterval(() => {
    testimonialCurrentIndex = (testimonialCurrentIndex + 1) % totalGroups;
    updateTestimonialSlider();
  }, 4000);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => changeTestimonialSlide(index));
  });

  updateTestimonialSlider(); // Initialize slider
});
