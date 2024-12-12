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
    const rgbColors = Object.entries(tempColors);
    for (const [key, value] of rgbColors) {
      if (typeof value === 'string') {
        if (value.replace('#', '').length === 6) {
          const aRgbHex = value.replace('#', '').match(/.{1,2}/g);
          tempColors[key] = `${parseInt(aRgbHex[0], 16)} ${parseInt(
            aRgbHex[1],
            16
          )} ${parseInt(aRgbHex[2], 16)}`;
        }
      } else {
        tempColors[key] = helpers.toRGB(value);
      }
    }
    return tempColors;
  },
};
