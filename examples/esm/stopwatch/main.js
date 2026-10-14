import { e } from "../../../embel.esm.js";

const { Span, Pre, Button } = e;

class Stopwatch {
  constructor() {
    this.elapsed_time = 0;
    this.interval_id = null;
    /** @type {null|HTMLPreElement} */
    this.output_ref = null;
    this.render();
  }

  startTimer() {
    if (this.interval_id != null) return;
    this.interval_id = setInterval(() => {
      this.elapsed_time += 0.01;
      this.output_ref.innerText = `${this.elapsed_time.toFixed(2)}s`;
    }, 10);
  }

  stopTimer() {
    clearInterval(this.interval_id);
    this.interval_id = null;
  }

  resetTimer() {
    this.elapsed_time = 0;
    this.output_ref.innerText = `${this.elapsed_time.toFixed(2)}s`;
  }

  render() {
    Span(() => {
      this.output_ref = Pre(
        { style: "display: inline;" },
        `${this.elapsed_time.toFixed(2)}s`,
      );
      Button({ click: () => this.startTimer() }, "Start");
      Button({ click: () => this.stopTimer() }, "Stop");
      Button({ click: () => this.resetTimer() }, "Reset");
    });
  }
}

new Stopwatch();
