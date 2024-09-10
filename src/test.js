class a {
  constructor(v) { this.v = v; }
  add(v) { this.v += v; return this; }
  fart() { console.log('toot'); }
}
class b extends a {
  constructor(v) { 
    super(v); 
    this.w = -v;
    //Object.getOwnPropertyNames(a.prototype).filter((v) => v != 'constructor')
  }
  //add(v) { super['add'](v); this.w -= v; return this; }

  list() { console.log(Object.getOwnPropertyNames(a.prototype).filter((v) => v != 'constructor')); }
}

let x = new a(4);
let y = new b(4);

console.log(x);
console.log(y);

console.log(x.add(1));
console.log(y.add(1));

y.list();