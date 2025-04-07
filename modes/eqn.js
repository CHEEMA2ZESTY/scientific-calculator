export function eqnModeUI() {
    return `
      EQN Mode:
      1. Quadratic Equation
      2. Simultaneous Equations
      Select Option:
    `;
  }
  
  export function handleEqnModeInput(input) {
    if (input === "1") {
      const a = parseFloat(prompt("Quadratic Equation: ax² + bx + c = 0\nEnter coefficient a:"));
      const b = parseFloat(prompt("Enter coefficient b:"));
      const c = parseFloat(prompt("Enter constant c:"));
      const discriminant = b ** 2 - 4 * a * c;
  
      if (isNaN(a) || isNaN(b) || isNaN(c)) return "Invalid Input";
      if (discriminant < 0) return "No Real Roots";
  
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return `x₁ = ${root1}, x₂ = ${root2}`;
    } else if (input === "2") {
      const a1 = parseFloat(prompt("Equation 1: a₁x + b₁y = c₁\nEnter a₁:"));
      const b1 = parseFloat(prompt("Enter b₁:"));
      const c1 = parseFloat(prompt("Enter c₁:"));
      const a2 = parseFloat(prompt("Equation 2: a₂x + b₂y = c₂\nEnter a₂:"));
      const b2 = parseFloat(prompt("Enter b₂:"));
      const c2 = parseFloat(prompt("Enter c₂:"));
  
      if ([a1, b1, c1, a2, b2, c2].some(isNaN)) return "Invalid Input";
  
      const det = a1 * b2 - a2 * b1;
      if (det === 0) return "No Unique Solution";
  
      const x = (c1 * b2 - c2 * b1) / det;
      const y = (a1 * c2 - a2 * c1) / det;
      return `x = ${x}, y = ${y}`;
    }
  
    return "Invalid Option";
  }
  