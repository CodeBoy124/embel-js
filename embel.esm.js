/**
 * Matches possible values you can insert into builtin Embel components.
 * The argument system is designed to be flexible, so you can work however you like (even putting the children before the attributes)
 * @template {Node} T
 * @typedef {(null|string|number|Node|(parent: T) => void|{[field: string]: string|function})} eComponentArg_T
 */

/**
 * The standard definition of builtin Embel HTML tags
 * @template {Node} T
 * @typedef {(...args: eComponentArg_T<T>[]) => T} eComponentDef_T
 */

/**
 * The parent that is currently used to parent new elements to
 * @ignore
 * @type {Node}
 */
let internal_activeParent = document.body;

/**
 * The internal function responsible for creating all elements (so also parsing arguments and parenting to a parent)
 * @ignore
 * @template {Node} T
 * @param {string} kind What html tag to use for the element
 * @param {eComponentArg_T<T>[]} args The attributes, children, etc. of the new element
 * @returns {T} The new element
 * @throws {TypeError} if the type of kind isn't a string (so you're trying to create an tag false or 1)
 * @throws {TypeError} if an argument isn't of a supported type/format
 */
function internal_componentGeneric(kind, ...args) {
  if (typeof kind != "string")
    throw new TypeError(
      "Cannot create component with a name of any type other than string",
      { cause: kind },
    );

  let new_element = document.createElement(kind.toLowerCase());

  // Process arguments
  for (let arg of args) {
    if (typeof arg == "string" || typeof arg == "number") {
      new_element.appendChild(eText(arg));
    } else if (arg instanceof Node || arg instanceof Node) {
      new_element.appendChild(arg);
    } else if (typeof arg == "function") {
      const old_parent = internal_activeParent;
      internal_activeParent = new_element;
      arg(internal_activeParent);
      internal_activeParent = old_parent;
    } else if (typeof arg == "object" && !Array.isArray(arg)) {
      for (let field in arg) {
        if (arg[field] == null) continue;
        if (typeof arg[field] == "function") {
          new_element.addEventListener(field, arg[field]);
        }
        new_element.setAttribute(field, arg[field]);
      }
    } else if (arg != null) {
      throw new TypeError("Unknown type or parameter in component arguments", {
        cause: arg,
      });
    }
  }

  internal_activeParent.appendChild(new_element);
  return new_element;
}

/**
 * Change the parent (where things a parented to) to something else temporarely
 * @template {Node} T
 * @param {T} new_parent The new temporary parent
 * @param {(parent: T) => void} body The content it has inside it
 * @throws {TypeError} if the new_parent isn't an Node instance
 * @throws {TypeError} if the body isn't a valid function
 *
 * @example
 * let todo_list_container = null;
 * // ... some code where todo_list_container gets assigned to an element
 * function addTodoItem(title) {
 *  eParentTo(todo_list_container, () => TodoItem(title));
 * }
 */
export function eParentTo(new_parent, body = () => {}) {
  if (!(new_parent instanceof Node))
    throw new TypeError(
      "Cannot parent to a parent of any type apart from Node",
      { cause: new_parent },
    );
  if (typeof body != "function")
    throw new TypeError("Body of parent has to be a function", { cause: body });

  const old_parent = internal_activeParent;
  internal_activeParent = new_parent;
  body(internal_activeParent);
  internal_activeParent = old_parent;
}

/**
 * An object with all tags, so you can have great autocomplete and code readability
 */
export const e = {
  A: /** @type {eComponentDef_T<HTMLAnchorElement>} */ (...args) =>
    internal_componentGeneric("A", ...args),
  Abbr: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Abbr", ...args),
  Address: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Address", ...args),
  Area: /** @type {eComponentDef_T<HTMLAreaElement>} */ (...args) =>
    internal_componentGeneric("Area", ...args),
  Article: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Article", ...args),
  Aside: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Aside", ...args),
  Audio: /** @type {eComponentDef_T<HTMLAudioElement>} */ (...args) =>
    internal_componentGeneric("Audio", ...args),
  B: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("B", ...args),
  Base: /** @type {eComponentDef_T<HTMLBaseElement>} */ (...args) =>
    internal_componentGeneric("Base", ...args),
  Bdi: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Bdi", ...args),
  Bdo: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Bdo", ...args),
  Blockquote: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Blockquote", ...args),
  Body: /** @type {eComponentDef_T<HTMLBodyElement>} */ (...args) =>
    internal_componentGeneric("Body", ...args),
  Br: /** @type {eComponentDef_T<HTMLBRElement>} */ (...args) =>
    internal_componentGeneric("Br", ...args),
  Button: /** @type {eComponentDef_T<HTMLButtonElement>} */ (...args) =>
    internal_componentGeneric("Button", ...args),
  Canvas: /** @type {eComponentDef_T<HTMLCanvasElement>} */ (...args) =>
    internal_componentGeneric("Canvas", ...args),
  Caption: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Caption", ...args),
  Cite: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Cite", ...args),
  Code: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Code", ...args),
  Col: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Col", ...args),
  Colgroup: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Colgroup", ...args),
  Data: /** @type {eComponentDef_T<HTMLDataElement>} */ (...args) =>
    internal_componentGeneric("Data", ...args),
  Datalist: /** @type {eComponentDef_T<HTMLDataListElement>} */ (...args) =>
    internal_componentGeneric("Datalist", ...args),
  Dd: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Dd", ...args),
  Del: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Del", ...args),
  Details: /** @type {eComponentDef_T<HTMLDetailsElement>} */ (...args) =>
    internal_componentGeneric("Details", ...args),
  Dfn: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Dfn", ...args),
  Dialog: /** @type {eComponentDef_T<HTMLDialogElement>} */ (...args) =>
    internal_componentGeneric("Dialog", ...args),
  Div: /** @type {eComponentDef_T<HTMLDivElement>} */ (...args) =>
    internal_componentGeneric("Div", ...args),
  Dl: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Dl", ...args),
  Dt: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Dt", ...args),
  Em: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Em", ...args),
  Embed: /** @type {eComponentDef_T<HTMLEmbedElement>} */ (...args) =>
    internal_componentGeneric("Embed", ...args),
  Fieldset: /** @type {eComponentDef_T<HTMLFieldSetElement>} */ (...args) =>
    internal_componentGeneric("Fieldset", ...args),
  Figcaption: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Figcaption", ...args),
  Figure: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Figure", ...args),
  Footer: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Footer", ...args),
  Form: /** @type {eComponentDef_T<HTMLFormElement>} */ (...args) =>
    internal_componentGeneric("Form", ...args),
  H1: /** @type {eComponentDef_T<HTMLHeadingElement>} */ (...args) =>
    internal_componentGeneric("H1", ...args),
  H2: /** @type {eComponentDef_T<HTMLHeadingElement>} */ (...args) =>
    internal_componentGeneric("H2", ...args),
  H3: /** @type {eComponentDef_T<HTMLHeadingElement>} */ (...args) =>
    internal_componentGeneric("H3", ...args),
  H4: /** @type {eComponentDef_T<HTMLHeadingElement>} */ (...args) =>
    internal_componentGeneric("H4", ...args),
  H5: /** @type {eComponentDef_T<HTMLHeadingElement>} */ (...args) =>
    internal_componentGeneric("H5", ...args),
  H6: /** @type {eComponentDef_T<HTMLHeadingElement>} */ (...args) =>
    internal_componentGeneric("H6", ...args),
  Head: /** @type {eComponentDef_T<HTMLHeadElement>} */ (...args) =>
    internal_componentGeneric("Head", ...args),
  Header: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Header", ...args),
  Hgroup: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Hgroup", ...args),
  Hr: /** @type {eComponentDef_T<HTMLHRElement>} */ (...args) =>
    internal_componentGeneric("Hr", ...args),
  Html: /** @type {eComponentDef_T<HTMLHtmlElement>} */ (...args) =>
    internal_componentGeneric("Html", ...args),
  I: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("I", ...args),
  Iframe: /** @type {eComponentDef_T<HTMLIFrameElement>} */ (...args) =>
    internal_componentGeneric("Iframe", ...args),
  Img: /** @type {eComponentDef_T<HTMLImageElement>} */ (...args) =>
    internal_componentGeneric("Img", ...args),
  Input: /** @type {eComponentDef_T<HTMLInputElement>} */ (...args) =>
    internal_componentGeneric("Input", ...args),
  Ins: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Ins", ...args),
  Kbd: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Kbd", ...args),
  Label: /** @type {eComponentDef_T<HTMLLabelElement>} */ (...args) =>
    internal_componentGeneric("Label", ...args),
  Legend: /** @type {eComponentDef_T<HTMLLegendElement>} */ (...args) =>
    internal_componentGeneric("Legend", ...args),
  Li: /** @type {eComponentDef_T<HTMLLIElement>} */ (...args) =>
    internal_componentGeneric("Li", ...args),
  Link: /** @type {eComponentDef_T<HTMLLinkElement>} */ (...args) =>
    internal_componentGeneric("Link", ...args),
  Main: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Main", ...args),
  Map: /** @type {eComponentDef_T<HTMLMapElement>} */ (...args) =>
    internal_componentGeneric("Map", ...args),
  Mark: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Mark", ...args),
  Menu: /** @type {eComponentDef_T<HTMLMenuElement>} */ (...args) =>
    internal_componentGeneric("Menu", ...args),
  Meta: /** @type {eComponentDef_T<HTMLMetaElement>} */ (...args) =>
    internal_componentGeneric("Meta", ...args),
  Meter: /** @type {eComponentDef_T<HTMLMeterElement>} */ (...args) =>
    internal_componentGeneric("Meter", ...args),
  Nav: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Nav", ...args),
  Noscript: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Noscript", ...args),
  Object: /** @type {eComponentDef_T<HTMLObjectElement>} */ (...args) =>
    internal_componentGeneric("Object", ...args),
  Ol: /** @type {eComponentDef_T<HTMLOListElement>} */ (...args) =>
    internal_componentGeneric("Ol", ...args),
  Optgroup: /** @type {eComponentDef_T<HTMLOptGroupElement>} */ (...args) =>
    internal_componentGeneric("Optgroup", ...args),
  Option: /** @type {eComponentDef_T<HTMLOptionElement>} */ (...args) =>
    internal_componentGeneric("Option", ...args),
  Output: /** @type {eComponentDef_T<HTMLOutputElement>} */ (...args) =>
    internal_componentGeneric("Output", ...args),
  P: /** @type {eComponentDef_T<HTMLParagraphElement>} */ (...args) =>
    internal_componentGeneric("P", ...args),
  Param: /** @type {eComponentDef_T<HTMLParamElement>} */ (...args) =>
    internal_componentGeneric("Param", ...args),
  Picture: /** @type {eComponentDef_T<HTMLPictureElement>} */ (...args) =>
    internal_componentGeneric("Picture", ...args),
  Pre: /** @type {eComponentDef_T<HTMLPreElement>} */ (...args) =>
    internal_componentGeneric("Pre", ...args),
  Progress: /** @type {eComponentDef_T<HTMLProgressElement>} */ (...args) =>
    internal_componentGeneric("Progress", ...args),
  Q: /** @type {eComponentDef_T<HTMLQuoteElement>} */ (...args) =>
    internal_componentGeneric("Q", ...args),
  Rp: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Rp", ...args),
  Rt: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Rt", ...args),
  Ruby: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Ruby", ...args),
  S: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("S", ...args),
  Samp: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Samp", ...args),
  Script: /** @type {eComponentDef_T<HTMLScriptElement>} */ (...args) =>
    internal_componentGeneric("Script", ...args),
  Search: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Search", ...args),
  Section: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Section", ...args),
  Select: /** @type {eComponentDef_T<HTMLSelectElement>} */ (...args) =>
    internal_componentGeneric("Select", ...args),
  Small: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Small", ...args),
  Source: /** @type {eComponentDef_T<HTMLSourceElement>} */ (...args) =>
    internal_componentGeneric("Source", ...args),
  Span: /** @type {eComponentDef_T<HTMLSpanElement>} */ (...args) =>
    internal_componentGeneric("Span", ...args),
  Strong: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Strong", ...args),
  Style: /** @type {eComponentDef_T<HTMLStyleElement>} */ (...args) =>
    internal_componentGeneric("Style", ...args),
  Sub: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Sub", ...args),
  Summary: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Summary", ...args),
  Sup: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Sup", ...args),
  Svg: /** @type {eComponentDef_T<HTMLOrSVGImageElement>} */ (...args) =>
    internal_componentGeneric("Svg", ...args),
  Table: /** @type {eComponentDef_T<HTMLTableElement>} */ (...args) =>
    internal_componentGeneric("Table", ...args),
  Tbody: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Tbody", ...args),
  Td: /** @type {eComponentDef_T<HTMLTableDataCellElement>} */ (...args) =>
    internal_componentGeneric("Td", ...args),
  Template: /** @type {eComponentDef_T<HTMLTemplateElement>} */ (...args) =>
    internal_componentGeneric("Template", ...args),
  Textarea: /** @type {eComponentDef_T<HTMLTextAreaElement>} */ (...args) =>
    internal_componentGeneric("Textarea", ...args),
  Tfoot: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Tfoot", ...args),
  Th: /** @type {eComponentDef_T<HTMLTableHeaderCellElement>} */ (...args) =>
    internal_componentGeneric("Th", ...args),
  Thead: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Thead", ...args),
  Time: /** @type {eComponentDef_T<HTMLTimeElement>} */ (...args) =>
    internal_componentGeneric("Time", ...args),
  Title: /** @type {eComponentDef_T<HTMLTitleElement>} */ (...args) =>
    internal_componentGeneric("Title", ...args),
  Tr: /** @type {eComponentDef_T<HTMLTableRowElement>} */ (...args) =>
    internal_componentGeneric("Tr", ...args),
  Track: /** @type {eComponentDef_T<HTMLTrackElement>} */ (...args) =>
    internal_componentGeneric("Track", ...args),
  U: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("U", ...args),
  Ul: /** @type {eComponentDef_T<HTMLUListElement>} */ (...args) =>
    internal_componentGeneric("Ul", ...args),
  Var: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Var", ...args),
  Video: /** @type {eComponentDef_T<HTMLVideoElement>} */ (...args) =>
    internal_componentGeneric("Video", ...args),
  Wbr: /** @type {eComponentDef_T<HTMLElement>} */ (...args) =>
    internal_componentGeneric("Wbr", ...args),
};

/**
 * Creates a text node
 * @param {string} txt The text to put inside it
 * @returns {Text} The created node
 *
 * @example
 * let count_node = null;
 * const click_handler = () => {
 *  count_node.textContent = "clicked"
 * }
 * e.Button({click: click_handler}, () => {
 *  count_node = eText("not clicked");
 * })
 */
export function eText(txt) {
  let new_node = document.createTextNode(txt);
  internal_activeParent.appendChild(new_node);
  return new_node;
}

/**
 * Creates a component with a tag based on the name param
 * @param {string} kind The webcomponent to create
 * @param  {eComponentArg_T[]} args The attributes, body, etc. of this new webcomponent
 * @returns {HTMLElement} The created webcomponent
 * @throws {TypeError} if you're trying to create a webcomponent with a kind other than string, such as a number, boolean, etc.
 *
 * @example
 * e.Main(() => {
 *  eWebcomponent("x-custom-tag", {click: () => alert("Hello")});
 * })
 */
export function eWebcomponent(kind, ...args) {
  if (typeof kind != "string")
    throw new TypeError(
      "Cannot create a webcomponent with a name of any type other than string",
      { cause: kind },
    );
  return internal_componentGeneric(kind, ...args);
}

/**
 * A function that transforms js values into a string that can be used by css
 * @param {any} value The value to transform into a css string
 * @returns {string} The generated value
 */
function internal_cssValue(value) {
  if (!Array.isArray(value)) return value;
  return value
    .map(internal_cssValue)
    .filter((v) => v != null)
    .join(" ");
}

/**
 * This function assigns CSS values to an element
 * @param {CSSStyleDeclaration} styles The styles to use (you can also use null or an array for a property value)
 * @returns {(element: HTMLElement) => void} A function that can be put inside eComponentArg_T
 * @throws {TypeError} If the styles argument is not an object
 * @throws {TypeError} If the returned function doesn't receive a HTMLElement instance
 *
 * @example
 * const yellow_bullet_styles = eCss({
 *  backgroundColor: "yellow",
 *  width: "100px",
 *  height: "50px",
 *  borderRadius: ["0", "10px", "10px", "0"],
 *  border: null
 * });
 * e.Div(yellow_bullet_styles)
 */
export function eCss(styles) {
  if (typeof styles != "object" || Array.isArray(styles)) {
    throw new TypeError(
      "Stylesheet must be an object. Not any other type or an array",
      { cause: styles },
    );
  }
  return (element) => {
    if ((!element) instanceof HTMLElement) {
      throw new TypeError("Element isn't a HTMLElement instance", {
        cause: element,
      });
    }
    for (let styleKey in styles) {
      if (styles[styleKey] == null) continue;
      element.style[styleKey] = internal_cssValue(styles[styleKey]);
    }
  };
}

/**
 * A function for only generating the elements, not appending them to a parent
 * @param {(parent: DocumentFragment) => void} body The function for generating the child(ren)
 * @returns {DocumentFragment} A fragment containing the child(ren)
 * @throws {TypeError} if the body isn't a function
 *
 * @example
 * some_parent.replaceChild(some_child, ePrepare(() => e.H1("New child")))
 */
export function ePrepare(body) {
  if (typeof body != "function")
    throw new TypeError("Fragment body isn't a function");
  const frag = document.createDocumentFragment();
  const old_parent = internal_activeParent;
  internal_activeParent = frag;
  body(internal_activeParent);
  internal_activeParent = old_parent;
  return frag;
}

/**
 * A function that creates a fragment and appends it to the parent. So far I don't know any reason this would be used, but if there is a usecase, it's here
 * @param {(parent: DocumentFragment) => void} body The function for generating the children
 * @returns {void}
 * @throws {TypeError} if the body isn't a function
 */
export function eFragment(body) {
  const frag = ePrepare(body);
  internal_activeParent.appendChild(frag);
}
