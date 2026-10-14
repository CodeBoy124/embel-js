import { e, embelParentTo } from "../../../embel.esm.js";

const { Div, Input, Span, A, Button } = e;

function TodoItem(text) {
  /** @type {HTMLDivElement} */ let containerElement = null;
  /** @type {HTMLInputElement} */ let checkboxElement = null;
  /** @type {HTMLSpanElement} */ let nameElement = null;

  const deleteItem = () => containerElement.remove();
  const checkOffItem = () => {
    nameElement.style.textDecoration = checkboxElement.checked
      ? "line-through"
      : "";
  };

  containerElement = Div(() => {
    checkboxElement = Input({ type: "checkbox", change: checkOffItem });
    nameElement = Span(text);
    A({ click: deleteItem }, "❌");
  });
}

function TodoList() {
  /** @type {HTMLInputElement} */ let inputElement = null;
  /** @type {HTMLDivElement} */ let listContainer = null;

  const addItem = () => {
    embelParentTo(listContainer, () => TodoItem(inputElement.value));
    inputElement.value = "";
  };

  listContainer = Div(() => {
    inputElement = Input({ type: "text" });
    Button({ click: addItem }, "Add");
  });
}

TodoList();
