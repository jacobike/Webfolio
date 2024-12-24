function calculateAverageColor(colors) {
  const avgColor = colors.reduce((acc, color) => {
    acc[0] += parseInt(color.slice(1, 3), 16);
    acc[1] += parseInt(color.slice(3, 5), 16);
    acc[2] += parseInt(color.slice(5, 7), 16);
    return acc;
  }, [0, 0, 0]).map(c => Math.round(c / colors.length).toString(16).padStart(2, '0'));

  return `#${avgColor[0]}${avgColor[1]}${avgColor[2]}`;
}

export function updateGradientColors(imageElements) {
  let vibrantColors = [];
  let lightVibrantColors = [];
  let darkVibrantColors = [];

  const promises = Array.from(imageElements).map(imageElement =>
    Vibrant.from(imageElement).getPalette().then(palette => {
      if (palette.Vibrant) vibrantColors.push(palette.Vibrant.getHex());
      if (palette.LightVibrant) lightVibrantColors.push(palette.LightVibrant.getHex());
      if (palette.DarkVibrant) darkVibrantColors.push(palette.DarkVibrant.getHex());
    }).catch(err => {
      console.error('Error extracting color from ' + imageElement.src, err);
    })
  );

  Promise.all(promises).then(() => {
    const averageVibrantColor = calculateAverageColor(vibrantColors);
    const averageLightVibrantColor = calculateAverageColor(lightVibrantColors);
    const averageDarkVibrantColor = calculateAverageColor(darkVibrantColors);
    const averageColor = calculateAverageColor([...vibrantColors, ...lightVibrantColors, ...darkVibrantColors]);

    console.log('Average gradient colors:', {
      averageVibrantColor,
      averageLightVibrantColor,
      averageDarkVibrantColor,
      averageColor
    });

    updateGradientColorVariables(averageVibrantColor, averageLightVibrantColor, averageDarkVibrantColor, averageColor);
  });
}

function updateGradientColorVariables(vibrant, lightVibrant, darkVibrant, average) {
  const root = document.documentElement;
  root.style.setProperty('--gradient-color-1', vibrant);
  root.style.setProperty('--gradient-color-2', lightVibrant);
  root.style.setProperty('--gradient-color-3', darkVibrant);
  root.style.setProperty('--gradient-color-4', average);

  console.log('Updated gradient colors:', {
    '--gradient-color-1': vibrant,
    '--gradient-color-2': lightVibrant,
    '--gradient-color-3': darkVibrant,
    '--gradient-color-4': average,
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.gallery-image');
  if (images.length > 0) {
    updateGradientColors(images);
  } else {
    console.log('No images found, ensure query selector is correct and images are loaded.');
  }
});

window.updateGradientColors = updateGradientColors;
