const { Button, Span, Div } = e;

class MyOOPCounter {
  constructor() {
    this.value = 0;
    this.value_ref = null;
    this.render();
  }

  doIncrease() {
    this.value_ref.innerText = ++this.value;
  }

  doDecrease() {
    this.value_ref.innerText = --this.value;
  }

  render() {
    Div(() => {
      Button({ click: () => this.doIncrease() }, "+");
      this.value_ref = Span(this.value);
      Button({ click: () => this.doDecrease() }, "-");
    });
  }
}

new MyOOPCounter();
