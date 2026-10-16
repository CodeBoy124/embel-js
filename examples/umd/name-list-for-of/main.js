const { H1, Ul, Li } = e;

const name_list = ["Matthew", "Mark", "Luke", "John"];

H1("Hello, World");
Ul(() => {
  for (let name of name_list) {
    Li(name);
  }
});
