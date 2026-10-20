import { eParentTo, e, eText } from "../embel.esm.js";
import { TestCase, TestSubject } from "./testing.js";

class DummyClass {}

TestSubject("eParentTo", () => {
  TestCase(
    "Throws",
    [
      [[null, () => {}], TypeError],
      [["hello", () => {}], TypeError],
      [[82, () => {}], TypeError],
      [[new DummyClass(), () => {}], TypeError],
      [[document.createDocumentFragment(), null], TypeError],
      [[document.createDocumentFragment(), "hello"], TypeError],
      [[document.createDocumentFragment(), 82], TypeError],
      [[document.createDocumentFragment(), new DummyClass()], TypeError],
    ],
    (inputs, expected) => {
      try {
        eParentTo(...inputs);
        return {
          didFail: true,
          description: `Expected an error, but didn't receive it`,
        };
      } catch (e) {
        return {
          didFail: !(e instanceof expected),
          description: `Error not of expected kind`,
        };
      }
    },
  );

  // TODO: Move case
  TestCase(
    "Success",
    [[document.createDocumentFragment(), () => {}]],
    (...inputs) => {
      eParentTo(...inputs);
      return {
        didFail: false,
        description: null,
      };
    },
  );

  TestCase(
    "Generation",
    [
      [() => {}, ``],
      [() => e.Span("Hello"), `<span>Hello</span>`],
      [() => eText("Hello"), `Hello`],
      [() => [e.Span("Hello"), e.P("Two")], `<span>Hello</span><p>Two</p>`],
    ],
    (input, expected) => {
      const d = document.createElement("div");
      eParentTo(d, input);

      return {
        didFail: d.innerHTML != expected,
        description: `Didn't generate the expected children "${expected}", but got "${d.innerHTML}"`,
      };
    },
  );
});
