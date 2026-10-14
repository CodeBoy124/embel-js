const { Div, Span } = e;

function Embedding({ deepness = 1 }, body = null) {
  Div({ class: "container" }, () => {
    Span({ class: "txt" }, (this_element) => {
      this_element.style.fontSize = `${Math.round(100 * deepness)}px`;
      eText("{");
    });
    if (body) {
      body();
    }
    Span({ class: "txt" }, (this_element) => {
      this_element.style.fontSize = `${Math.round(100 * deepness)}px`;
      eText("}");
    });
  });
}

function Title() {
  Span({ class: "title" }, "Embel");
}

function App() {
  Div({ class: "app" }, () => {
    Embedding({ deepness: 1 }, () => {
      Embedding({ deepness: 0.5 }, () => {
        Embedding({ deepness: 0.25 });
      });
    });
    Title();
  });
}

App();
