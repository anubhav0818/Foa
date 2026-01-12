export const viewSizeCalculator = (value, isPixel = false) => {
  const windowSize = window.innerWidth / window.innerHeight < 2.5;

  let calculatedValue;

  if (windowSize) {
    calculatedValue = isPixel
      ? (value / 1660) * 100
      : ((value * 16) / 1660) * 100;
  } else {
    calculatedValue = isPixel
      ? (value / 1660) * 100 * 0.78
      : ((value * 16) / 1660) * 100 * 0.78;
  }

  // return ${calculatedValue}vw;
  return `${calculatedValue?.toFixed(2)}vw `; // Ensuring two decimal places

  // return addUnit ? ${calculatedValue}vw : calculatedValue;
};