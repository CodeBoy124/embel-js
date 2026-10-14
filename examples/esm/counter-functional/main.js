import { e } from "../../../embel.esm.js";

const { Button, Span, Div } = e;

function MyCounter() {
  let value = 0;
  let value_ref = null;

  const doIncrease = () => {
    value_ref.innerText = ++value;
  };
  const doDecrease = () => {
    value_ref.innerText = --value;
  };

  Div(() => {
    Button({ click: doIncrease }, "+");
    value_ref = Span(value);
    Button({ click: doDecrease }, "-");
  });
}

MyCounter();
