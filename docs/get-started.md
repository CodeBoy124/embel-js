# Get started

Welcome to this guide to get started with Embel. To follow along it is best to have some experience with HTML and Javascript

We'll be using the UMD variant of Embel, since it is easier to run.

## 1 - Setup

Firstly, let's setup a simple project. Create the following files

```
getting-started-with-embel/
├── index.html
├── main.js
└── embel.umd.js
```

### HTML

Since EmbelJS is entirely frontend based (all content is generated after the script loads), the index.html is fairly standard. Enter the following HTML code:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Getting started with EmbelJS</title>
  </head>
  <body>
    <script src="./embel.umd.js"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

As you can see, we're not adding any content, only metadata and the script imports.

### EmbelJS

Right now, the embel.umd.js file is probably entirely empty, so let's add it. Go to the online [`embel.umd.js`](../embel.umd.js) file and copy it's contents to your local embel.umd.js

## 2 - Hello world

Now we're ready to create some content! Open your local `main.js` file.

To create HTML tags we use `e`, that is a object with functions to generate all possible HTML elements.

Let's start with a `<h1>` tag. It is customary to capitolize the first letter, so our tag is found under `e.H1`. Let's see it in action. Write the following code:

```js
e.H1("Hello, World!");
```

if you want it even cleaner, you can destructure `e` as seen bellow. For our one line it's probably not with it, but if you have an entire file, it looks much better

```js
const { H1 } = e;
H1("Hello, World!");
```

## 3 - Loops

Great! Now we have a simple hello world program. Let's now expand it. Say you like cheese a lot, and want to display cheese 10x below one another. You could do that as follows:

```js
const { H1, P } = e;

H1("Hello, World!");
for (let i = 0; i < 10; i++) {
  P("I like cheese!");
}
```

Pretty simple right!

## 4 - Adding depth

So far all our elements have been added right underneath one another, but not all HTML content works that way. Let's say you take our previous example and want to put it inside an `ul` element. We can use a function to scope the elements inside the `ul`

```js
const { H1, Ul, Li } = e;

H1("Hello, World!");
Ul(() => {
  for (let i = 0; i < 10; i++) {
    Li("I like cheese!");
  }
});
```

## 5 - Attributes

Perhaps we now would like a tooltip, that makes it even clearer how many times we like cheese. We could add a `title` attribute to the `li`'s

```js
const { H1, Ul, Li } = e;

H1("Hello, World!");
Ul(() => {
  for (let i = 0; i < 10; i++) {
    Li({ title: i + "x cheese!" }, "I like cheese!");
  }
});
```

## 6 - Events and references

Let's now switch over to a different example, namely a counter.
The following starting code, already has the events configured. Just like we assigned attributes using an object, we can also define event handlers using objects. Internally every object value that is a function will be marked an event handler, and every object value that is a string, is assigned as an attribute

```js
const { P, Button } = e;

let amount_of_clicks = 0;

function increase() {
  amount_of_clicks++;
  // TODO: Update UI
}

function decrease() {
  amount_of_clicks--;
  // TODO: Update UI
}

Button({ click: increase }, "+");
P("Clicked 0x");
Button({ click: decrease }, "-");
```

This code allows us to press the button's and it changes the variable, but the UI isn't updated. For that we need **references**. There are many ways to go about this, but every element returns itself, so let's use that for now.

```js
const { P, Button } = e;

let p_reference = null;
let amount_of_clicks = 0;

function increase() {
  amount_of_clicks++;
  p_reference.innerText = "Clicked " + amount_of_clicks + "x";
}

function decrease() {
  amount_of_clicks--;
  p_reference.innerText = "Clicked " + amount_of_clicks + "x";
}

Button({ click: increase }, "+");
p_reference = P("Clicked 0x");
Button({ click: decrease }, "-");
```

Initially you might think this would fail, but since the user only interacts with the UI after it has been created, `p_reference` will no longer be `null`.

## 7 - Text node

Now we're getting into more advanced concepts. As you might have noticed in the previous code, the entire text has to be updated. There is a way in wich we can update a part of that text without updating the rest. This can be achieved using Text nodes

```js
const { P, Button } = e;

let count_reference = null;
let amount_of_clicks = 0;

function increase() {
  amount_of_clicks++;
  count_reference.textContent = amount_of_clicks;
}

function decrease() {
  amount_of_clicks--;
  count_reference.textContent = amount_of_clicks;
}

Button({ click: increase }, "+");
P(() => {
  eText("Clicked ");
  count_refernce = eText("0");
  eText("x");
});
Button({ click: decrease }, "-");
```

## 8 - Functions

Last but not least, let's discuss reusability.
Everything we've written so far can also be put in functions (or even classes). This promotes single responsiblity, keeps code readable and allows for reusability.

Let's say you have have multiple articles you want to display. You could create a component as follows:

```js
const { H1, P } = e;

function MyArticle(title, paragraphs) {
  H1(title);
  for (let paragraph of paragraphs) {
    P(paragraph);
  }
}

function App() {
  MyArticle("Lorem Ipsum", [
    "Ipsamdicta ad laborum et quas, nesciunt.",
    "Modineque hic cumque eveniet dolore",
  ]);

  MyArticle("Lorem Ipsum", [
    "Ipsamdicta ad laborum et quas, nesciunt.",
    "Modineque hic cumque eveniet dolore",
  ]);
}

App();
```
