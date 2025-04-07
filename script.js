// ✨ Base variables
const display = document.getElementById("calc-display");
const buttons = document.querySelectorAll(".btn");
const copyBtn = document.getElementById("copy");
const precisionSelect = document.getElementById("precision");
const toggleMode = document.getElementById("toggle-mode");
const toggleScientific = document.getElementById("toggle-scientific");
const modeIndicator = document.getElementById("mode-indicator");
const degRadBtn = document.querySelector(".convert");
const backspaceBtn = document.getElementById("backspace");

const memButtons = {
  mc: document.getElementById("mc"),
  mr: document.getElementById("mr"),
  mplus: document.getElementById("mplus")
};

let currentInput = "";
let memory = 0;
let degreeMode = true;
let lastResult = null;
let resultDisplayed = false;
let backspaceHoldTimer = null;

// ✨ Update display
function updateDisplay(value) {
  display.value = value;
}

// ✨ Append value
function appendValue(val) {
  if (resultDisplayed) {
    if (/[+\-*/^]/.test(val)) {
      currentInput = lastResult + val;
    } else {
      currentInput = val;
    }
    resultDisplayed = false;
  } else {
    currentInput += val;
  }
  updateDisplay(currentInput);
}

// ✨ Evaluate input
function evaluateInput() {
  try {
    const precision = parseInt(precisionSelect.value);

    let expression = currentInput
      .replace(/π/g, `Math.PI`)
      .replace(/e/g, `Math.E`)
      .replace(/sin\s*\(?([\d.]+)\)?/gi, (_, x) =>
        `Math.sin(${degreeMode ? `(${x} * Math.PI / 180)` : x})`
      )
      .replace(/cos\s*\(?([\d.]+)\)?/gi, (_, x) =>
        `Math.cos(${degreeMode ? `(${x} * Math.PI / 180)` : x})`
      )
      .replace(/tan\s*\(?([\d.]+)\)?/gi, (_, x) =>
        `Math.tan(${degreeMode ? `(${x} * Math.PI / 180)` : x})`
      )
      .replace(/log\s*\(?([\d.]+)\)?/gi, (_, x) => {
        if (+x <= 0) throw new Error("Math Error");
        return `Math.log10(${x})`;
      });

    let result = eval(expression);
    if (!isFinite(result)) throw Error("Math Error");

    lastResult = result;
    resultDisplayed = true;

    result = Number.isInteger(result)
      ? result.toString()
      : precision
      ? result.toFixed(precision)
      : result.toString();

    updateDisplay(result);
    currentInput = result.toString();
  } catch {
    updateDisplay("Syntax Error");
    currentInput = "";
  }
}

// ✨ Clear all
document.getElementById("clear").addEventListener("click", () => {
  currentInput = "";
  updateDisplay("");
  resultDisplayed = false;
});

// ✨ Evaluate "="
document.getElementById("equals").addEventListener("click", evaluateInput);

// ✨ Clipboard copy
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(display.value);
  copyBtn.textContent = "✅ Copied!";
  setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1000);
});

// ✨ Buttons input
buttons.forEach((btn) => {
  if (["clear", "equals", "backspace"].includes(btn.id)) return;
  btn.addEventListener("click", () => {
    appendValue(btn.textContent);
  });
});

// ✨ Backspace button
backspaceBtn.addEventListener("mousedown", () => {
  backspaceHoldTimer = setTimeout(() => {
    currentInput = "";
    updateDisplay("");
  }, 600);
});
backspaceBtn.addEventListener("mouseup", () => {
  clearTimeout(backspaceHoldTimer);
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  }
});

// ✨ Function buttons
document.querySelectorAll(".function").forEach((btn) => {
  btn.addEventListener("click", () => {
    try {
      const func = btn.dataset.func;
      const x = parseFloat(display.value);
      let result = 0;

      switch (func) {
        case "sqrt":
          if (x < 0) throw Error();
          result = Math.sqrt(x);
          break;
        case "square":
          result = Math.pow(x, 2);
          break;
        case "pow":
          const y = parseFloat(prompt("Enter exponent:"));
          if (isNaN(y)) throw Error();
          result = Math.pow(x, y);
          break;
      }

      if (!isFinite(result)) throw Error();

      const precision = parseInt(precisionSelect.value);
      result = Number.isInteger(result) ? result.toString() : result.toFixed(precision);
      updateDisplay(result);
      currentInput = result.toString();
      resultDisplayed = true;
    } catch {
      updateDisplay("Math Error");
      currentInput = "";
    }
  });
});

// ✨ Constants (π, e)
document.querySelectorAll(".constant").forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value === "pi" ? "π" : "e";
    appendValue(value);
  });
});

// ✨ Memory buttons
memButtons.mc.addEventListener("click", () => (memory = 0));
memButtons.mr.addEventListener("click", () => appendValue(memory.toString()));
memButtons.mplus.addEventListener("click", () => {
  memory += parseFloat(display.value || 0);
});

// ✨ Degree <-> Radian toggle
degRadBtn.addEventListener("click", () => {
  degreeMode = !degreeMode;
  degRadBtn.textContent = degreeMode ? "DEG" : "RAD";
});

// ✨ Toggle scientific layout
toggleScientific.addEventListener("click", () => {
  document.body.classList.toggle("scientific");
  const mode = document.body.classList.contains("scientific") ? "Scientific" : "Basic";
  modeIndicator.textContent = mode;
});

// ✨ Toggle dark/light mode
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleMode.textContent = document.body.classList.contains("dark") ? "🌙 Light Mode" : "☀️ Dark Mode";
});

// ✨ Mode selection
const modeBtn = document.getElementById("mode-btn");
let currentMode = null;
let handleModeInput = null;

modeBtn.addEventListener("click", () => {
  const mode = prompt("Select Mode:\n1. EQN Mode\n2. Base-N\n3. Complex Numbers\n4. Matrix");
  if (!mode) return;

  switch (mode) {
    case "1":
      loadMode("eqn", "EQN Mode");
      break;
    case "2":
      loadMode("base-n", "Base-N Mode");
      break;
    case "3":
      loadMode("complex", "Complex Mode");
      break;
    case "4":
      loadMode("matrix", "Matrix Mode");
      break;
    default:
      alert("Invalid mode.");
  }
});

async function loadMode(modeName, label) {
  try {
    const module = await import(`./modes/${modeName}.js`);

    const camelName = modeName.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const uiFn = `${camelName}ModeUI`;
    const handlerFn = `handle${capitalizeModeName(modeName)}ModeInput`;

    const ui = module[uiFn];
    const handler = module[handlerFn];

    if (typeof ui === "function" && typeof handler === "function") {
      handleModeInput = { handler, ui };
      updateDisplay(ui());
      currentMode = modeName;
      modeIndicator.textContent = label;
      waitForUserInput();
    } else {
      throw new Error(`Missing UI or handler for ${modeName}`);
    }
  } catch (err) {
    alert(`Failed to load ${label}`);
    console.error(err);
  }
}

function waitForUserInput() {
  const input = prompt(handleModeInput.ui());
  if (handleModeInput.handler) {
    const result = handleModeInput.handler(input);
    updateDisplay(result);
    currentInput = result.toString();
    resultDisplayed = true;
  }
}

function capitalizeModeName(str) {
  return str
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
