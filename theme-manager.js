// theme-manager.js
document.addEventListener('DOMContentLoaded', () => {
  const savedAccent = localStorage.getItem('user-accent-color');
  const savedBgColor = localStorage.getItem('user-bg-color');
  const savedBgImage = localStorage.getItem('user-background-image');

  // Elements
  const accentPicker = document.getElementById('accentColorInput');
  const accentValue = document.getElementById('accentColorValue');
  const accentReset = document.getElementById('accentReset');

  const bgPicker = document.getElementById('bgColorInput');
  const bgValue = document.getElementById('bgColorValue');
  const bgReset = document.getElementById('bgReset');

  const bgImageInput = document.getElementById('bgImageInput');
  const bgClearBtn = document.getElementById('bgImageClear');

  // Initialize Accent Color
  if (savedAccent) {
    document.documentElement.style.setProperty('--primary', savedAccent);
    if (accentPicker) accentPicker.value = savedAccent;
    if (accentValue) accentValue.textContent = savedAccent;
  }

  if (accentPicker) {
    accentPicker.addEventListener('input', (e) => {
      const hexCode = e.target.value;
      if (accentValue) accentValue.textContent = hexCode;
      updateAccentColor(hexCode);
    });
  }

  if (accentReset) {
    accentReset.addEventListener('click', () => {
      const defaultAccent = '#7c3aed';
      if (accentPicker) accentPicker.value = defaultAccent;
      if (accentValue) accentValue.textContent = defaultAccent;
      updateAccentColor(defaultAccent);
      localStorage.removeItem('user-accent-color');
    });
  }

  // Initialize Background Color
  if (savedBgColor) {
    document.documentElement.style.setProperty('--bg', savedBgColor);
    if (bgPicker) bgPicker.value = savedBgColor;
    if (bgValue) bgValue.textContent = savedBgColor;
  }

  if (bgPicker) {
    bgPicker.addEventListener('input', (e) => {
      const hexCode = e.target.value;
      if (bgValue) bgValue.textContent = hexCode;
      updateBgColor(hexCode);
    });
  }

  if (bgReset) {
    bgReset.addEventListener('click', () => {
      const defaultBg = '#0c0b14';
      if (bgPicker) bgPicker.value = defaultBg;
      if (bgValue) bgValue.textContent = defaultBg;
      updateBgColor(defaultBg);
      localStorage.removeItem('user-bg-color');
    });
  }

  // Initialize Background Image
  if (bgImageInput) {
    bgImageInput.addEventListener('change', handleBackgroundUpload);
  }
  
  if (bgClearBtn) {
    bgClearBtn.addEventListener('click', clearCustomBackground);
  }

  if (savedBgImage) {
    applyCustomBackground(savedBgImage);
  }
});

function updateAccentColor(hexCode) {
  document.documentElement.style.setProperty('--primary', hexCode);
  localStorage.setItem('user-accent-color', hexCode);
}

function updateBgColor(hexCode) {
  document.documentElement.style.setProperty('--bg', hexCode);
  localStorage.setItem('user-bg-color', hexCode);
}

function handleBackgroundUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Img = e.target.result;
    applyCustomBackground(base64Img);
    localStorage.setItem('user-background-image', base64Img);
  };
  reader.readAsDataURL(file);
}

function applyCustomBackground(imgSource) {
  let bgLayer = document.getElementById('custom-bg-layer');
  let overlay = document.getElementById('a11y-overlay');
  
  if (!bgLayer) {
    bgLayer = document.createElement('img');
    bgLayer.id = 'custom-bg-layer';
    bgLayer.className = 'custom-background-layer';
    document.body.prepend(bgLayer);
  }
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'a11y-overlay';
    overlay.className = 'accessibility-overlay';
    document.body.prepend(overlay);
  }
  
  bgLayer.src = imgSource;
  document.body.classList.add('has-bg-image');
}

function clearCustomBackground() {
  const bgLayer = document.getElementById('custom-bg-layer');
  const overlay = document.getElementById('a11y-overlay');
  if (bgLayer) bgLayer.remove();
  if (overlay) overlay.remove();
  localStorage.removeItem('user-background-image');
  document.body.classList.remove('has-bg-image');
}
