// base-n.js

export function baseNModeUI() {
    return `
  Base-N Mode:
  1. Decimal to Binary
  2. Decimal to Hex
  3. Binary to Decimal
  4. Hex to Decimal
  Select Option:
    `;
  }
  
  export function handleBaseNModeInput(input) {
    switch (input) {
      case "1":
        const dec1 = parseInt(prompt("Enter Decimal:"));
        return `Binary: ${dec1.toString(2)}`;
      case "2":
        const dec2 = parseInt(prompt("Enter Decimal:"));
        return `Hex: ${dec2.toString(16).toUpperCase()}`;
      case "3":
        const bin = prompt("Enter Binary:");
        return `Decimal: ${parseInt(bin, 2)}`;
      case "4":
        const hex = prompt("Enter Hexadecimal:");
        return `Decimal: ${parseInt(hex, 16)}`;
      default:
        return "Invalid Option";
    }
  }
  