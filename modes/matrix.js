export function matrixModeUI() {
    return `
      Matrix Mode:
      1. Add 2x2 Matrices
      2. Subtract 2x2 Matrices
      3. Multiply 2x2 Matrices
      Select Option:
    `;
  }
  
  function getMatrixInput(promptLabel) {
    alert(`${promptLabel} (2x2 Matrix): Enter row-wise`);
    const a = parseFloat(prompt("Enter a11:"));
    const b = parseFloat(prompt("Enter a12:"));
    const c = parseFloat(prompt("Enter a21:"));
    const d = parseFloat(prompt("Enter a22:"));
    return [[a, b], [c, d]];
  }
  
  function matrixToString(matrix) {
    return `[${matrix[0][0]}, ${matrix[0][1]}]\n[${matrix[1][0]}, ${matrix[1][1]}]`;
  }
  
  export function handleMatrixModeInput(input) {
    const A = getMatrixInput("Matrix A");
    const B = getMatrixInput("Matrix B");
  
    switch (input) {
      case "1": {
        const result = [
          [A[0][0] + B[0][0], A[0][1] + B[0][1]],
          [A[1][0] + B[1][0], A[1][1] + B[1][1]],
        ];
        return matrixToString(result);
      }
      case "2": {
        const result = [
          [A[0][0] - B[0][0], A[0][1] - B[0][1]],
          [A[1][0] - B[1][0], A[1][1] - B[1][1]],
        ];
        return matrixToString(result);
      }
      case "3": {
        const result = [
          [
            A[0][0] * B[0][0] + A[0][1] * B[1][0],
            A[0][0] * B[0][1] + A[0][1] * B[1][1],
          ],
          [
            A[1][0] * B[0][0] + A[1][1] * B[1][0],
            A[1][0] * B[0][1] + A[1][1] * B[1][1],
          ],
        ];
        return matrixToString(result);
      }
      default:
        return "Invalid Option";
    }
  }
  