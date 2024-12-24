// darkmode.js

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('colorSwitchButton');
    const lowbg = document.querySelector('.lowbg');
    let isBlack = true;
  
    button.addEventListener('click', function () {
      isBlack = !isBlack;
      document.documentElement.style.setProperty('--lowbg-color', isBlack ? 'black' : 'white');
    });
  });
  