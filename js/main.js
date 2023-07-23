import commands from "../config/commands.js";

class Terminal {
  constructor() {
    this.inputArray = "";
    this.total_inputs = "";
    this.currentInput = "";
    this.currentInputListener = "";
    this.shell = document.querySelector("#shell");
    this.newCommandLine = ` <div class="command">
    <div class="username">yaman1337:</div>
    <input type="text" class="command-input" autofocus="true" spellcheck="false">
    </div>`;
    this.commands = commands;
    this.dimensionChanger = document.querySelector("#width-changer");
    this.terminal = document.querySelector("#terminal");
    this.terminalMinizer = document.querySelector("#terminal-minimizer");
    this.dimensionChanger.addEventListener("click", (e) => {
      this.changeDimensions();
    });
    this.terminalMinizer.addEventListener("click", (e) => {
      this.minimizeTerminal();
    });
    this.terminal.addEventListener("click", (e) => {
      this.currentInput.focus()
    })
  }

  init() {
    this.inputArray = document.querySelectorAll(".command-input");
    this.total_inputs = this.inputArray.length;
    this.currentInput = this.inputArray[this.total_inputs - 1];

    this.currentInputListener = this.currentInput.addEventListener(
      "keypress",
      async (e) => {
        if (e.key !== "Enter") {
          return;
        }

        // preserve the history of terminal
        this.currentInput.removeAttribute("autofocus");
        this.currentInput.setAttribute("value", this.currentInput.value);
        this.currentInput.setAttribute("readonly", "true");

        // process input
        await this.processInput(this.currentInput.value);

        // reset the listeners and command inputs
        this.shell.innerHTML += this.newCommandLine;
        window.removeEventListener("keypresss", this.currentInputListener);
        this.init();
      }
    );
  }

  async processInput(input) {
    input = input.trim()
    switch (input) {
      case "clear":
        this.clearTerminal();
        break;
      default:
        let output = this.commands[input];
        if (!output)
          this.renderOutput(
            `<p style="color:red" >Invalid Command: Type help for see list of commands available.</p>`
          );
        else this.renderOutput(output);
    }
  }

  clearTerminal() {
    this.shell.innerHTML = "";
  }

  renderOutput(output) {
    this.shell.innerHTML += output;
  }

  changeDimensions() {
    const documentProps = document.documentElement;

    if (documentProps.clientWidth === this.terminal.clientWidth) {
      this.terminal.setAttribute("style", "height: 90%; width: 90%");
    } else {
      this.terminal.setAttribute("style", "height: 100%; width: 100%");
    }
  }

  minimizeTerminal() {
    const terminalDot = document.querySelector(".terminal-icon > .dot");
    this.terminal.classList.toggle("close");
    terminalDot.classList.toggle("open");

    document.querySelector(".terminal-icon").addEventListener("click", (e) => {
      if (!terminalDot.classList.contains("open")) {
        this.terminal.classList.toggle("close");
        terminalDot.classList.toggle("open");
      }
    });
  }
}

const terminal = new Terminal();
terminal.init();
