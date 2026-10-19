# EmbelJS reference

1. [[type] eComponentArg_T](#type-ecomponentarg_t)
2. [[type] eComponentDef_T](#type-ecomponentdef_t)
3. [[function] eParentTo(new_parent, body) => `void`](#function-eparenttonew_parent-body--void)
4. [[function] eText(txt) => `Text`](#function-etexttxt--text)
5. [[function] eWebcomponent(kind, ...args) => `HTMLElement`](#function-ewebcomponent--htmlelement)
6. [[function] eCss(styles) => `(element: HTMLElement) => void`](#function-ecssstyles--element-htmlelement--void)
7. [[function] ePrepare(body) => `DocumentFragment`](#function-epreparebody--documentfragment)
8. [[function] eFragment(body) => `void`](#function-efragmentbody--void)
9. [[constant] e](#constant-e)

## [type] eComponentArg_T

Matches possible values you can insert into builtin Embel components.
The argument system is designed to be flexible, so you can work however you like (even putting the children before the attributes)

**Generics**

- `T` (extends `HTMLElement`)

**Matches**

- `null` that can be ignored
- `string` for text content to add
- `number` for text content to add
- `HTMLElement` for appending it to the component (⚠️ WARNING: If you use builtin EmbelJS tag functions, you shouldn't add them as a seperate argument, but instead inside a scoped function like bellow)
- `(parent: T) => void` A scoped function to generate child elements
- `{[field: string]: string|function}` An object containing attributes (so a `string` value) and/or event listeners (so a `function` value)

## [type] eComponentDef_T

The standard definition of builtin Embel HTML tags

**Generics**

- `T` (extends `HTMLElement`)

**Matches**

- `(...args: eComponentArg_T<T>[]) => T` Any function that takes component arguments and returns a HTMLElement

## [function] eParentTo(new_parent, body) => `void`

Change the parent (where things a parented to) to something else temporarely

**Generics**

- `T` (extends `HTMLElement`)

**Returns**: `void`

**Throws**

- `TypeError` if the new_parent isn't an HTMLElement instance
- `TypeError` if the body isn't a valid function

**Parameters**
| Name | Type | Description |
| ---------- | --------------------- | ---------------------------- |
| new_parent | `T` | The new temporary parent |
| body | `(parent: T) => void` | The content it has inside it |

**Example**

```js
let todo_list_container = null;
// ... some code where todo_list_container gets assigned to an element
function addTodoItem(title) {
  eParentTo(todo_list_container, () => TodoItem(title));
}
```

## [function] eText(txt) => `Text`

Creates a text node

**Returns**: `Text` (The created node)

**Parameters**
| Name | Type | Description |
| ---------- | --------------------- | ---------------------------- |
| txt | `string` | The text to put inside it |

**Example**

```js
let count_node = null;
const click_handler = () => {
  count_node.textContent = "clicked";
};
e.Button({ click: click_handler }, () => {
  count_node = eText("not clicked");
});
```

## [function] eWebComponent() => `HTMLElement`

Creates a component with a tag based on the name param

**Returns**: `HTMLElement` The created webcomponent

**Throws**

- `TypeError` if you're trying to create a webcomponent with a kind other than string, such as a number, boolean, etc.

**Parameters**
| Name | Type | Description |
| ---------- | --------------------- | ---------------------------- |
| kind | `string` | The webcomponent to create |
| args | `eComponentArg_T[]` | The attributes, body, etc. of this new webcomponent |

**Example**

```js
e.Main(() => {
  eWebcomponent("x-custom-tag", { click: () => alert("Hello") });
});
```

## [function] eCss(styles) => `(element: HTMLElement) => void`

This function assigns CSS values to an element

**Returns**: `(element: HTMLElement) => void` A function that can be put inside eComponentArg_T

**Throws**

- `TypeError` If the styles argument is not an object
- `TypeError` If the returned function doesn't receive a HTMLElement instance

| Name   | Type                  | Description                                                                |
| ------ | --------------------- | -------------------------------------------------------------------------- |
| styles | `CSSStyleDeclaration` | The styles to use (you can also use null or an array for a property value) |

**Example**

```js
const yellow_bullet_styles = eCss({
  backgroundColor: "yellow",
  width: "100px",
  height: "50px",
  borderRadius: ["0", "10px", "10px", "0"],
  border: null,
});
e.Div(yellow_bullet_styles);
```

## [function] ePrepare(body) => `DocumentFragment`

A function for only generating the elements, not appending them to a parent

**Returns**: `DocumentFragment` A fragment containing the child(ren)

**Throws**

- `TypeError` if the body isn't a function

**Parameters**
| Name | Type | Description |
| ---------- | --------------------- | ---------------------------- |
| body | `(parent: DocumentFragment) => void` | The function for generating the child(ren) |

**Example**

```js
some_parent.replaceChild(
  some_child,
  ePrepare(() => e.H1("New child")),
);
```

## [function] eFragment(body) => `void`

A function that creates a fragment and appends it to the parent. So far I don't know any reason this would be used, but if there is a usecase, it's here

**Returns**: `void`

**Throws**

- `TypeError` if the body isn't a function

**Parameters**
| Name | Type | Description |
| ---------- | --------------------- | ---------------------------- |
| body | `(parent: DocumentFragment) => void` | The function for generating the children |

## [constant] e

An object with all tags, so you can have great autocomplete and code readability.

**Generics**

- `T` (extends `HTMLElement`) this depends on the tag you're trying to access (div returns HTMLDivElement, button a HTMLButtonElement, etc.)

**Signature**: `{[tag: string]: eComponentDef_T<T>}`

**Keys**

- `A`
- `Abbr`
- `Address`
- `Area`
- `Article`
- `Aside`
- `Audio`
- `B`
- `Base`
- `Bdi`
- `Bdo`
- `Blockquote`
- `Body`
- `Br`
- `Button`
- `Canvas`
- `Caption`
- `Cite`
- `Code`
- `Col`
- `Colgroup`
- `Data`
- `Datalist`
- `Dd`
- `Del`
- `Details`
- `Dfn`
- `Dialog`
- `Div`
- `Dl`
- `Dt`
- `Em`
- `Embed`
- `Fieldset`
- `Figcaption`
- `Figure`
- `Footer`
- `Form`
- `H1`
- `H2`
- `H3`
- `H4`
- `H5`
- `H6`
- `Head`
- `Header`
- `Hgroup`
- `Hr`
- `Html`
- `I`
- `Iframe`
- `Img`
- `Input`
- `Ins`
- `Kbd`
- `Label`
- `Legend`
- `Li`
- `Link`
- `Main`
- `Map`
- `Mark`
- `Menu`
- `Meta`
- `Meter`
- `Nav`
- `Noscript`
- `Object`
- `Ol`
- `Optgroup`
- `Option`
- `Output`
- `P`
- `Param`
- `Picture`
- `Pre`
- `Progress`
- `Q`
- `Rp`
- `Rt`
- `Ruby`
- `S`
- `Samp`
- `Script`
- `Search`
- `Section`
- `Select`
- `Small`
- `Source`
- `Span`
- `Strong`
- `Style`
- `Sub`
- `Summary`
- `Sup`
- `Svg`
- `Table`
- `Tbody`
- `Td`
- `Template`
- `Textarea`
- `Tfoot`
- `Th`
- `Thead`
- `Time`
- `Title`
- `Tr`
- `Track`
- `U`
- `Ul`
- `Var`
- `Video`
- `Wbr`
