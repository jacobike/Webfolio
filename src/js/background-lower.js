export function updateBackgroundColors(imageElement) {
  Vibrant.from(imageElement).getPalette()
    .then(palette => {
      const muted = palette.Muted ? palette.Muted.getHex() : '#000000';
      const darkMuted = palette.DarkMuted ? palette.DarkMuted.getHex() : '#000000';
      const lightMuted = palette.LightMuted ? palette.LightMuted.getHex() : '#FFFFFF';

      console.log('Background colors extracted:', { muted, darkMuted, lightMuted });

      // Smoothly update the background colors
      smoothTransitionBackgroundColors(muted, darkMuted, lightMuted);
    })
    .catch(err => {
      console.error('Error extracting color from ' + imageElement.src, err);
    });
}

function interpolateColor(color1, color2, factor) {
  const result = color1.slice(1).match(/.{2}/g).map((hex, index) => {
    const int1 = parseInt(hex, 16);
    const int2 = parseInt(color2.slice(1).match(/.{2}/g)[index], 16);
    return Math.round(int1 + (int2 - int1) * factor).toString(16).padStart(2, '0');
  }).join('');
  return `#${result}`;
}

function smoothTransitionColors(currentColors, nextColors, duration = 2000, propertyPrefix = '--color') {
  const steps = 60; // Number of steps in the transition
  const interval = duration / steps;
  let step = 0;

  const interpolateStep = () => {
    step++;
    const factor = step / steps;
    const interpolatedColors = currentColors.map((color, index) => interpolateColor(color, nextColors[index], factor));

    const root = document.documentElement;
    interpolatedColors.forEach((color, index) => {
      root.style.setProperty(`${propertyPrefix}${index + 1}`, color);
    });

    if (step < steps) {
      requestAnimationFrame(interpolateStep);
    }
  };

  interpolateStep();
}

export function smoothTransitionBackgroundColors(muted, darkMuted, lightMuted) {
  const root = document.documentElement;
  const currentColors = [
    getComputedStyle(root).getPropertyValue('--color1').trim() || '#000000',
    getComputedStyle(root).getPropertyValue('--color2').trim() || '#000000',
    getComputedStyle(root).getPropertyValue('--color3').trim() || '#FFFFFF',
  ];

  const nextColors = [muted, darkMuted, lightMuted];

  smoothTransitionColors(currentColors, nextColors, 2000, '--color');
}

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.gallery-image');
  if (images.length > 0) {
    const firstImage = images[0];
    if (firstImage.complete && firstImage.naturalHeight !== 0) {
      updateBackgroundColors(firstImage);
    } else {
      firstImage.onload = () => updateBackgroundColors(firstImage);
    }
  } else {
    console.log('No images found, ensure query selector is correct and images are loaded.');
  }
});


