   const promises = Array.from(imageElements).map(imageElement =>
    Vibrant.from(imageElement).getPalette().then(palette => {
      if (palette.Vibrant) vibrantColors.push(palette.Vibrant.getHex());
      if (palette.LightVibrant) lightVibrantColors.push(palette.LightVibrant.getHex());
      if (palette.DarkVibrant) darkVibrantColors.push(palette.DarkVibrant.getHex());
    }).catch(err => {
      console.error('Error extracting color from ' + imageElement.src, err);
    })
  );