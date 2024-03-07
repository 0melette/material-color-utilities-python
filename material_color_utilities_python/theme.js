function parseColor(argb) {
    return '#' + (argb & 0xFFFFFF).toString(16).padStart(6, '0');
}

function isLight(color) {
    // whether we dsipaly the text in white or black
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;
    // HSP equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp > 127.5; 
}

function createColorBox(colorName, colorValue) {
    const box = document.createElement('div');
    box.className = 'color-box';
    const hexColor = parseColor(colorValue);
    box.style.backgroundColor = hexColor;
    box.textContent = `${colorName}: ${hexColor}`;
    if (isLight(colorValue)) {
      box.style.color = '#000'; // Dark text on light backgrounds
    }
    document.body.appendChild(box);
  }

function applyColors(theme) {
    const scheme = theme.schemes.light.props; // or 'dark', depending on what you want
    Object.keys(scheme).forEach(key => {
        createColorBox(key, scheme[key]);
    });
}

// Fetch the theme.json file and apply colors
fetch('theme.json')
    .then(response => response.json())
    .then(applyColors);
