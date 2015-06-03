
function print() {
  console.log.apply(this, arguments);
}

function Foo() {
  print("%s Hello, World", ':)');
}

Foo();
