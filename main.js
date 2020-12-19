paper.install(window);
paper.setup(document.getElementById('mainCan'));

function rand(m, n) {
  return m + Math.floor((n - m + 1)*Math.random());
};

function rsa_e(p1, p2) {
  var n = p1*p2;
  console.log('p1=',p1,'p2=',p2,'n=',n);
  var fi = (p1-1n)*(p2-1n);
  var e = 3n;
  console.log('e=',e,'fi=',fi);
  var d = (2n*fi+1n)/e;
  console.log('d=',d);
  return {
    n: n,
    fi: fi,
    e: e,
    d: d
  };
}

function rsa_d(n, e, m) {
  return (m**e)%n;
}

var alice = {
  p1: 53n,
  p2: 59n,
  n: 0n,
  fi: 0n,
  e: 0n,
  d: 0n,
  c: 0n,
  f: 0n
};

var bob = {
  n: 0n,
  e: 0n,
  m: 0n,
  c: 0n
};

alice.n = rsa_e(alice.p1, alice.p2).n;
console.log(rsa_e(alice.p1, alice.p2).d);
alice.fi = rsa_e(alice.p1, alice.p2).fi;
alice.e = rsa_e(alice.p1, alice.p2).e;
alice.d = rsa_e(alice.p1, alice.p2).d;

bob.n = alice.n;
bob.e = alice.e;

bob.m = BigInt(rand(10,99));
bob.c = rsa_d(bob.n, bob.e, bob.m);
alice.c = bob.c;
console.log(alice.n, alice.d, alice.c);
alice.f = rsa_d(alice.n, alice.d, alice.c);

var firstT = new PointText(150, 50);
var secondT = new PointText(550, 50);
firstT.fontSize = 20;
secondT.fontSize = 20;
firstT.content = "Алиса\nf = " + alice.c + "^" + alice.d + "mod(" + alice.n + ") = " + alice.f;
secondT.content = "Боб" + "\nm = " + bob.m + "\n<-------- c = " + bob.m + "^" + bob.e + "mod(" + bob.n + ") = " + bob.c;

var too = new Tool();
 too.onMouseDown = function(event) {
   var t = new PointText(150, 50);
   t.fillColor = 'black';
   t.content = String(bob.m + ' = ');
 }

paper.view.draw();
