export function showModeSelector(display, callback) {
    display.value = `MODE
  1. EQN
  2. Base-N
  3. Complex
  4. Matrix
  Select: `;
    display.focus();
    
    const listener = (e) => {
      const val = e.target.value.trim().slice(-1);
      if (["1", "2", "3", "4"].includes(val)) {
        document.removeEventListener("input", listener, true);
        callback(val);
      }
    };
  
    document.addEventListener("input", listener, true);
  }
  