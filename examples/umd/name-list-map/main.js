const { H1, Ul, Li } = e;

const name_list = ["Matthew", "Mark", "Luke", "John"];

// A seperate function is needed, because Li would differently also get an index number and such if we put it directly into map, and we don't want to show/use that
const Item = (n) => Li(n);

H1("Hello, World");
Ul(() => {
  name_list.map(Item);
});
