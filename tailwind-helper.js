export const helpers = {
  withOpacityValue(variable) {
    return ({ opacityValue }) => {
      if (opacityValue === undefined) {
        return `rgb(var(${variable}))`;
      }
      return `rgb(var(${variable}) / ${opacityValue})`;
    };
  },
  
  toRGB(colors) {
    const tempColors = { ...colors };
    
    // Loop through each color entry
    for (const [key, value] of Object.entries(tempColors)) {
      // If the value is a hex string (e.g., "#ff0000"), convert to RGB
      if (typeof value === 'string' && value.startsWith('#') && value.length === 7) {
        const aRgbHex = value.replace('#', '').match(/.{1,2}/g);
        tempColors[key] = `${parseInt(aRgbHex[0], 16)} ${parseInt(aRgbHex[1], 16)} ${parseInt(aRgbHex[2], 16)}`;
      }
      // If the value is an object (like `colors.red`), recursively convert to RGB
      else if (typeof value === 'object' && value !== null) {
        tempColors[key] = helpers.toRGB(value);
      }
    }
    return tempColors;
  },
};
