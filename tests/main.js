import { eParentTo, e, eText, ePrepare, eWebcomponent } from "../embel.esm.js";
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

TestSubject("eText", () => {
  TestCase(
    "Datatype conversions",
    [
      ["Hello, World!", "Hello, World!"],
      [12, "12"],
      [false, "false"],
      [null, ""],
    ],
    (input, expected) => {
      const node = ePrepare(() => eText(input));
      const output = node.textContent;
      return {
        didFail: output != expected,
        description: `Expected content "${expected}", but got "${output}"`,
      };
    },
  );

  TestCase("Fails", [[{ one: 2 }], [[5, 3]], [new DummyClass()]], (input) => {
    try {
      ePrepare(() => eText(input));
      return {
        didFail: true,
        description: `Didn't give an error for data: ${JSON.stringify(input)}`,
      };
    } catch (e) {
      return {
        didFail: !(e instanceof TypeError),
        description: "Error not of type TypeError",
      };
    }
  });

  TestCase(
    "Appends",
    [
      [
        [document.createElement("div"), () => eText("Hello, World!")],
        `<div>Hello, World!</div>`,
      ],
      [
        [document.createElement("span"), () => [eText("One"), eText("Two")]],
        `<span>OneTwo</span>`,
      ],
    ],
    ([parent, body], expected) => {
      eParentTo(parent, body);
      return {
        didFail: parent.outerHTML != expected,
        description: `Outer HTML was "${parent.outerHTML}" instead of "${expected}"`,
      };
    },
  );
});

TestSubject("eWebComponent", () => {
  TestCase(
    "Kind",
    [
      ["x-tag", "X-TAG"],
      ["someValue", "SOMEVALUE"],
    ],
    (input, expected) => {
      let didFail = true;
      let description = "Simply failed";

      ePrepare(() => {
        const tag = eWebcomponent(input);
        const output = tag.tagName;

        didFail = output != expected;
        description = `Got "${output}", but expected "${expected}"`;
      });

      return { didFail, description };
    },
  );

  TestCase(
    "Children",
    [
      [
        "x-form",
        () => [
          e.Input({ type: "text", value: "Hello" }),
          e.Input({ type: "password" }),
        ],
        '<x-form><input type="text" value="Hello"><input type="password"></x-form>',
      ],
    ],
    (component_name, body, expected) => {
      let didFail = true;
      let description = "Simply failed";

      ePrepare(() => {
        const tag = eWebcomponent(component_name, body);
        const output = tag.outerHTML;

        didFail = expected != output;
        description = `Got "${output}", but expected "${expected}"`;
      });

      return { didFail, description };
    },
  );

  TestCase(
    "Appending",
    [
      [() => e.Div(), `<div><x-custom>Hello</x-custom></div>`],
      [() => e.A({ href: "#" }), `<a href="#"><x-custom>Hello</x-custom></a>`],
    ],
    (parent, expected) => {
      let didFail = true;
      let description = "Simply failed";

      ePrepare(() => {
        const parent_el = parent();
        eParentTo(parent_el, () => {
          eWebcomponent("x-custom", "Hello");
        });
        const output = parent_el.outerHTML;

        didFail = output != expected;
        description = `Expected "${expected}", but got "${output}"`;
      });

      return { didFail, description };
    },
  );
});
