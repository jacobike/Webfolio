import { updateBackgroundColors } from './background-lower.js';
import { updateGradientColors } from './background-upper.js';

// Initialize Swiper
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  

  on: {
    init: function () {
      const initialImage = document.querySelector('.swiper-slide-active .gallery-image');
      if (initialImage) {
        if (initialImage.complete && initialImage.naturalHeight !== 0) {
          updateBackgroundColors(initialImage);
        } else {
          initialImage.onload = () => {
            updateBackgroundColors(initialImage);
          };
        }
      }

      // Initialize gradient colors with all images
      const images = document.querySelectorAll('.gallery-image');
      if (images.length > 0) {
        updateGradientColors(images);
      }
    },
    slideChangeTransitionStart: function () {
      const image = document.querySelector('.swiper-slide-active .gallery-image');
      if (image) {
        if (image.complete && image.naturalHeight !== 0) {
          updateBackgroundColors(image);
        } else {
          image.onload = () => {
            updateBackgroundColors(image);
          };
        }
      }
    }
  }
});

// Ensure Swiper events are registered
swiper.init();
