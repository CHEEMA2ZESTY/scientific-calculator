export function complexModeUI() {
    return `
      Complex Mode:
      1. Add
      2. Subtract
      3. Multiply
      Select Option:
    `;
  }
  
  function parseComplex(input) {
    const match = input.match(/^([-+]?[0-9.]+)?([-+][0-9.]+)?i?$/i);
    const real = parseFloat(match[1]) || 0;
    const imag = parseFloat(match[2]) || 0;
    return { real, imag };
  }
  
  export function handleComplexModeInput(input) {
    const num1 = parseComplex(prompt("Enter first complex number (e.g., 2+3i):"));
    const num2 = parseComplex(prompt("Enter second complex number (e.g., 1-2i):"));
    let result = { real: 0, imag: 0 };
  
    switch (input) {
      case "1":
        result.real = num1.real + num2.real;
        result.imag = num1.imag + num2.imag;
        break;
      case "2":
        result.real = num1.real - num2.real;
        result.imag = num1.imag - num2.imag;
        break;
      case "3":
        result.real = num1.real * num2.real - num1.imag * num2.imag;
        result.imag = num1.real * num2.imag + num1.imag * num2.real;
        break;
      default:
        return "Invalid Option";
    }
  
    const sign = result.imag >= 0 ? "+" : "-";
    return `${result.real}${sign}${Math.abs(result.imag)}i`;
  }
  