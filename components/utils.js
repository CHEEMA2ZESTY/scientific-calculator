export function isNumeric(value) {
    return !isNaN(value) && isFinite(value);
  }
  
  export function formatResult(value, precision = 2) {
    return Number.isInteger(value) ? value.toString() : value.toFixed(precision);
  }
  