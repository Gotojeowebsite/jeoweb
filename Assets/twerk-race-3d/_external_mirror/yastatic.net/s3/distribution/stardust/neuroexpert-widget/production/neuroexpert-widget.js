(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.iframe.svelte-149ck22{all:unset;width:100%;height:100%;display:block;z-index:var(--z-index)}.widget.svelte-149ck22{all:unset;visibility:hidden;width:368px;height:100%;border-radius:1.5rem;box-shadow:0 4px 4px 0 var(--fill-12);pointer-events:none}.widget.svelte-149ck22.visible{visibility:visible;pointer-events:all}@media (max-width: 768px){.widget.svelte-149ck22{width:100%}}@font-face{font-family:Neuroexpert-YS-Text;src:url(https://yastatic.net/s3/home/fonts/ys/4/text-regular.woff2) format("woff2"),url(https://yastatic.net/s3/home/fonts/ys/4/text-regular.woff) format("woff");font-weight:400;font-style:normal}.container.svelte-13k5vl5{--fill-6: #f0f0f0;--fill-9: #e8e8e8;--fill-12: rgba(0, 0, 0, .12);--text-primary: #000;--bg-primary: #fff;--bg-logo: #2b294f;box-sizing:border-box;padding:16px;height:100%;display:flex;flex-direction:column;gap:16px;align-items:flex-end;font-family:Neuroexpert-YS-Text,sans-serif;pointer-events:none;z-index:var(--z-index)}.container.svelte-13k5vl5.fixed{position:fixed;bottom:0;right:0}.container.svelte-13k5vl5 :where(.svelte-13k5vl5),.container.svelte-13k5vl5 :where(.svelte-13k5vl5):before,.container.svelte-13k5vl5 :where(.svelte-13k5vl5):after{box-sizing:inherit}.button-wrapper.svelte-13k5vl5{font-size:16px}.toggle-button.svelte-13k5vl5{all:unset;box-sizing:border-box;width:12em;height:3em;padding:.5em;display:flex;align-items:center;gap:.75em;background-color:var(--fill-6);border-radius:1.5em;cursor:pointer;transition:.2s;pointer-events:all}.toggle-button.svelte-13k5vl5:hover{background-color:var(--fill-9)}.logo-wrapper.svelte-13k5vl5{width:2em;height:2em;display:flex;align-items:center;justify-content:center;border-radius:50em;background-color:var(--bg-logo);pointer-events:none}.logo.svelte-13k5vl5,.custom-logo.svelte-13k5vl5{pointer-events:none}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
var yt = Array.isArray, vr = Array.prototype.indexOf, dr = Array.from, _r = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, xt = Object.getOwnPropertyDescriptors, hr = Object.prototype, pr = Array.prototype, We = Object.getPrototypeOf, lt = Object.isExtensible;
function gr(e) {
  return e();
}
function Me(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
const M = 2, Et = 4, Oe = 8, Ke = 16, V = 32, ne = 64, xe = 128, D = 256, Ee = 512, P = 1024, H = 2048, X = 4096, te = 8192, Pe = 16384, wr = 32768, Ge = 65536, br = 1 << 17, mr = 1 << 19, It = 1 << 20, je = 1 << 21, Z = Symbol("$state"), yr = Symbol("legacy props");
function St(e) {
  return e === this.v;
}
function xr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Ze(e) {
  return !xr(e, this.v);
}
function Er(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Ir() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Sr(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Tr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Ar(e) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Or() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Pr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Nr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let ie = !1;
function Lr() {
  ie = !0;
}
const Dr = 1, kr = 2, Rr = 4, Cr = 8, Fr = 16, Mr = 2, O = Symbol(), jr = "http://www.w3.org/1999/xhtml";
function qr(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let w = null;
function ft(e) {
  w = e;
}
function Tt(e, t = !1, r) {
  var n = w = {
    p: w,
    c: null,
    d: !1,
    e: null,
    m: !1,
    s: e,
    x: null,
    l: null
  };
  ie && !t && (w.l = {
    s: null,
    u: null,
    r1: [],
    r2: Qe(!1)
  }), Mt(() => {
    n.d = !0;
  });
}
function At(e) {
  const t = w;
  if (t !== null) {
    const s = t.e;
    if (s !== null) {
      var r = p, n = h;
      t.e = null;
      try {
        for (var a = 0; a < s.length; a++) {
          var i = s[a];
          K(i.effect), B(i.reaction), et(i.fn);
        }
      } finally {
        K(r), B(n);
      }
    }
    w = t.p, t.m = !0;
  }
  return (
    /** @type {T} */
    {}
  );
}
function Ne() {
  return !ie || w !== null && w.l === null;
}
function G(e) {
  if (typeof e != "object" || e === null || Z in e)
    return e;
  const t = We(e);
  if (t !== hr && t !== pr)
    return e;
  var r = /* @__PURE__ */ new Map(), n = yt(e), a = /* @__PURE__ */ z(0), i = h, s = (u) => {
    var l = h;
    B(i);
    var f = u();
    return B(l), f;
  };
  return n && r.set("length", /* @__PURE__ */ z(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(u, l, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && Or();
        var d = r.get(l);
        return d === void 0 ? (d = s(() => /* @__PURE__ */ z(f.value)), r.set(l, d)) : T(
          d,
          s(() => G(f.value))
        ), !0;
      },
      deleteProperty(u, l) {
        var f = r.get(l);
        if (f === void 0)
          l in u && (r.set(
            l,
            s(() => /* @__PURE__ */ z(O))
          ), Ce(a));
        else {
          if (n && typeof l == "string") {
            var d = (
              /** @type {Source<number>} */
              r.get("length")
            ), c = Number(l);
            Number.isInteger(c) && c < d.v && T(d, c);
          }
          T(f, O), Ce(a);
        }
        return !0;
      },
      get(u, l, f) {
        var v;
        if (l === Z)
          return e;
        var d = r.get(l), c = l in u;
        if (d === void 0 && (!c || (v = ee(u, l)) != null && v.writable) && (d = s(() => /* @__PURE__ */ z(G(c ? u[l] : O))), r.set(l, d)), d !== void 0) {
          var o = b(d);
          return o === O ? void 0 : o;
        }
        return Reflect.get(u, l, f);
      },
      getOwnPropertyDescriptor(u, l) {
        var f = Reflect.getOwnPropertyDescriptor(u, l);
        if (f && "value" in f) {
          var d = r.get(l);
          d && (f.value = b(d));
        } else if (f === void 0) {
          var c = r.get(l), o = c == null ? void 0 : c.v;
          if (c !== void 0 && o !== O)
            return {
              enumerable: !0,
              configurable: !0,
              value: o,
              writable: !0
            };
        }
        return f;
      },
      has(u, l) {
        var o;
        if (l === Z)
          return !0;
        var f = r.get(l), d = f !== void 0 && f.v !== O || Reflect.has(u, l);
        if (f !== void 0 || p !== null && (!d || (o = ee(u, l)) != null && o.writable)) {
          f === void 0 && (f = s(() => /* @__PURE__ */ z(d ? G(u[l]) : O)), r.set(l, f));
          var c = b(f);
          if (c === O)
            return !1;
        }
        return d;
      },
      set(u, l, f, d) {
        var F;
        var c = r.get(l), o = l in u;
        if (n && l === "length")
          for (var v = f; v < /** @type {Source<number>} */
          c.v; v += 1) {
            var g = r.get(v + "");
            g !== void 0 ? T(g, O) : v in u && (g = s(() => /* @__PURE__ */ z(O)), r.set(v + "", g));
          }
        c === void 0 ? (!o || (F = ee(u, l)) != null && F.writable) && (c = s(() => /* @__PURE__ */ z(void 0)), T(
          c,
          s(() => G(f))
        ), r.set(l, c)) : (o = c.v !== O, T(
          c,
          s(() => G(f))
        ));
        var y = Reflect.getOwnPropertyDescriptor(u, l);
        if (y != null && y.set && y.set.call(d, f), !o) {
          if (n && typeof l == "string") {
            var x = (
              /** @type {Source<number>} */
              r.get("length")
            ), k = Number(l);
            Number.isInteger(k) && k >= x.v && T(x, k + 1);
          }
          Ce(a);
        }
        return !0;
      },
      ownKeys(u) {
        b(a);
        var l = Reflect.ownKeys(u).filter((c) => {
          var o = r.get(c);
          return o === void 0 || o.v !== O;
        });
        for (var [f, d] of r)
          d.v !== O && !(f in u) && l.push(f);
        return l;
      },
      setPrototypeOf() {
        Pr();
      }
    }
  );
}
function Ce(e, t = 1) {
  T(e, e.v + t);
}
// @__NO_SIDE_EFFECTS__
function oe(e) {
  var t = M | H, r = h !== null && (h.f & M) !== 0 ? (
    /** @type {Derived} */
    h
  ) : null;
  return p === null || r !== null && (r.f & D) !== 0 ? t |= D : p.f |= It, {
    ctx: w,
    deps: null,
    effects: null,
    equals: St,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: r ?? p
  };
}
// @__NO_SIDE_EFFECTS__
function Je(e) {
  const t = /* @__PURE__ */ oe(e);
  return t.equals = Ze, t;
}
function Ot(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      Q(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Ur(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & M) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Pt(e) {
  var t, r = p;
  K(Ur(e));
  try {
    Ot(e), t = Jt(e);
  } finally {
    K(r);
  }
  return t;
}
function Nt(e) {
  var t = Pt(e), r = (W || (e.f & D) !== 0) && e.deps !== null ? X : P;
  j(e, r), e.equals(t) || (e.v = t, e.wv = Gt());
}
const ce = /* @__PURE__ */ new Map();
function Qe(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: St,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function z(e, t) {
  const r = Qe(e);
  return $r(r), r;
}
// @__NO_SIDE_EFFECTS__
function be(e, t = !1) {
  var n;
  const r = Qe(e);
  return t || (r.equals = Ze), ie && w !== null && w.l !== null && ((n = w.l).s ?? (n.s = [])).push(r), r;
}
function Br(e, t) {
  return T(
    e,
    re(() => b(e))
  ), t;
}
function T(e, t, r = !1) {
  h !== null && !U && Ne() && (h.f & (M | Ke)) !== 0 && !(A != null && A.includes(e)) && Nr();
  let n = r ? G(t) : t;
  return Hr(e, n);
}
function Hr(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    ve ? ce.set(e, t) : ce.set(e, r), e.v = t, (e.f & M) !== 0 && ((e.f & H) !== 0 && Pt(
      /** @type {Derived} */
      e
    ), j(e, (e.f & D) === 0 ? P : X)), e.wv = Gt(), Lt(e, H), Ne() && p !== null && (p.f & P) !== 0 && (p.f & (V | ne)) === 0 && (C === null ? en([e]) : C.push(e));
  }
  return t;
}
function Lt(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = Ne(), a = r.length, i = 0; i < a; i++) {
      var s = r[i], u = s.f;
      (u & H) === 0 && (!n && s === p || (j(s, t), (u & (P | D)) !== 0 && ((u & M) !== 0 ? Lt(
        /** @type {Derived} */
        s,
        X
      ) : De(
        /** @type {Effect} */
        s
      ))));
    }
}
var qe, Dt, kt, Rt;
function Vr() {
  if (qe === void 0) {
    qe = window, Dt = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    kt = ee(t, "firstChild").get, Rt = ee(t, "nextSibling").get, lt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), lt(r) && (r.__t = void 0);
  }
}
function Ct(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Xe(e) {
  return kt.call(e);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return Rt.call(e);
}
function ge(e, t) {
  return /* @__PURE__ */ Xe(e);
}
function Yr(e, t) {
  {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Xe(
        /** @type {Node} */
        e
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ $e(r) : r;
  }
}
function zr(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ $e(n);
  return n;
}
function Ft(e) {
  p === null && h === null && Sr(), h !== null && (h.f & D) !== 0 && p === null && Ir(), ve && Er();
}
function Wr(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function ae(e, t, r, n = !0) {
  var a = p, i = {
    ctx: w,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | H,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: a,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (r)
    try {
      tt(i), i.f |= wr;
    } catch (l) {
      throw Q(i), l;
    }
  else t !== null && De(i);
  var s = r && i.deps === null && i.first === null && i.nodes_start === null && i.teardown === null && (i.f & (It | xe)) === 0;
  if (!s && n && (a !== null && Wr(i, a), h !== null && (h.f & M) !== 0)) {
    var u = (
      /** @type {Derived} */
      h
    );
    (u.effects ?? (u.effects = [])).push(i);
  }
  return i;
}
function Mt(e) {
  const t = ae(Oe, null, !1);
  return j(t, P), t.teardown = e, t;
}
function Ue(e) {
  Ft();
  var t = p !== null && (p.f & V) !== 0 && w !== null && !w.m;
  if (t) {
    var r = (
      /** @type {ComponentContext} */
      w
    );
    (r.e ?? (r.e = [])).push({
      fn: e,
      effect: p,
      reaction: h
    });
  } else {
    var n = et(e);
    return n;
  }
}
function Kr(e) {
  return Ft(), jt(e);
}
function Gr(e) {
  const t = ae(ne, e, !0);
  return (r = {}) => new Promise((n) => {
    r.outro ? He(t, () => {
      Q(t), n(void 0);
    }) : (Q(t), n(void 0));
  });
}
function et(e) {
  return ae(Et, e, !1);
}
function jt(e) {
  return ae(Oe, e, !0);
}
function qt(e, t = [], r = oe) {
  const n = t.map(r);
  return Ut(() => e(...n.map(b)));
}
function Ut(e, t = 0) {
  return ae(Oe | Ke | t, e, !0);
}
function Be(e, t = !0) {
  return ae(Oe | V, e, !0, t);
}
function Bt(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = ve, n = h;
    ut(!0), B(null);
    try {
      t.call(null);
    } finally {
      ut(r), B(n);
    }
  }
}
function Ht(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    var n = r.next;
    (r.f & ne) !== 0 ? r.parent = null : Q(r, t), r = n;
  }
}
function Zr(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & V) === 0 && Q(t), t = r;
  }
}
function Q(e, t = !0) {
  var r = !1;
  (t || (e.f & mr) !== 0) && e.nodes_start !== null && (Jr(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), r = !0), Ht(e, t && !r), Ae(e, 0), j(e, Pe);
  var n = e.transitions;
  if (n !== null)
    for (const i of n)
      i.stop();
  Bt(e);
  var a = e.parent;
  a !== null && a.first !== null && Vt(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = null;
}
function Jr(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ $e(e)
    );
    e.remove(), e = r;
  }
}
function Vt(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function He(e, t) {
  var r = [];
  Yt(e, r, !0), Qr(r, () => {
    Q(e), t && t();
  });
}
function Qr(e, t) {
  var r = e.length;
  if (r > 0) {
    var n = () => --r || t();
    for (var a of e)
      a.out(n);
  } else
    t();
}
function Yt(e, t, r) {
  if ((e.f & te) === 0) {
    if (e.f ^= te, e.transitions !== null)
      for (const s of e.transitions)
        (s.is_global || r) && t.push(s);
    for (var n = e.first; n !== null; ) {
      var a = n.next, i = (n.f & Ge) !== 0 || (n.f & V) !== 0;
      Yt(n, t, i ? r : !1), n = a;
    }
  }
}
function st(e) {
  zt(e, !0);
}
function zt(e, t) {
  if ((e.f & te) !== 0) {
    e.f ^= te, (e.f & P) === 0 && (e.f ^= P), de(e) && (j(e, H), De(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, a = (r.f & Ge) !== 0 || (r.f & V) !== 0;
      zt(r, a ? t : !1), r = n;
    }
    if (e.transitions !== null)
      for (const i of e.transitions)
        (i.is_global || t) && i.in();
  }
}
let Ie = [];
function Xr() {
  var e = Ie;
  Ie = [], Me(e);
}
function Wt(e) {
  Ie.length === 0 && queueMicrotask(Xr), Ie.push(e);
}
let me = !1, Ve = !1, Se = null, J = !1, ve = !1;
function ut(e) {
  ve = e;
}
let ye = [];
let h = null, U = !1;
function B(e) {
  h = e;
}
let p = null;
function K(e) {
  p = e;
}
let A = null;
function $r(e) {
  h !== null && h.f & je && (A === null ? A = [e] : A.push(e));
}
let S = null, L = 0, C = null;
function en(e) {
  C = e;
}
let Kt = 1, Te = 0, W = !1;
function Gt() {
  return ++Kt;
}
function de(e) {
  var c;
  var t = e.f;
  if ((t & H) !== 0)
    return !0;
  if ((t & X) !== 0) {
    var r = e.deps, n = (t & D) !== 0;
    if (r !== null) {
      var a, i, s = (t & Ee) !== 0, u = n && p !== null && !W, l = r.length;
      if (s || u) {
        var f = (
          /** @type {Derived} */
          e
        ), d = f.parent;
        for (a = 0; a < l; a++)
          i = r[a], (s || !((c = i == null ? void 0 : i.reactions) != null && c.includes(f))) && (i.reactions ?? (i.reactions = [])).push(f);
        s && (f.f ^= Ee), u && d !== null && (d.f & D) === 0 && (f.f ^= D);
      }
      for (a = 0; a < l; a++)
        if (i = r[a], de(
          /** @type {Derived} */
          i
        ) && Nt(
          /** @type {Derived} */
          i
        ), i.wv > e.wv)
          return !0;
    }
    (!n || p !== null && !W) && j(e, P);
  }
  return !1;
}
function tn(e, t) {
  for (var r = t; r !== null; ) {
    if ((r.f & xe) !== 0)
      try {
        r.fn(e);
        return;
      } catch {
        r.f ^= xe;
      }
    r = r.parent;
  }
  throw me = !1, e;
}
function ot(e) {
  return (e.f & Pe) === 0 && (e.parent === null || (e.parent.f & xe) === 0);
}
function Le(e, t, r, n) {
  if (me) {
    if (r === null && (me = !1), ot(t))
      throw e;
    return;
  }
  if (r !== null && (me = !0), tn(e, t), ot(t))
    throw e;
}
function Zt(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null)
    for (var a = 0; a < n.length; a++) {
      var i = n[a];
      A != null && A.includes(e) || ((i.f & M) !== 0 ? Zt(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (r ? j(i, H) : (i.f & P) !== 0 && j(i, X), De(
        /** @type {Effect} */
        i
      )));
    }
}
function Jt(e) {
  var v;
  var t = S, r = L, n = C, a = h, i = W, s = A, u = w, l = U, f = e.f;
  S = /** @type {null | Value[]} */
  null, L = 0, C = null, W = (f & D) !== 0 && (U || !J || h === null), h = (f & (V | ne)) === 0 ? e : null, A = null, ft(e.ctx), U = !1, Te++, e.f |= je;
  try {
    var d = (
      /** @type {Function} */
      (0, e.fn)()
    ), c = e.deps;
    if (S !== null) {
      var o;
      if (Ae(e, L), c !== null && L > 0)
        for (c.length = L + S.length, o = 0; o < S.length; o++)
          c[L + o] = S[o];
      else
        e.deps = c = S;
      if (!W)
        for (o = L; o < c.length; o++)
          ((v = c[o]).reactions ?? (v.reactions = [])).push(e);
    } else c !== null && L < c.length && (Ae(e, L), c.length = L);
    if (Ne() && C !== null && !U && c !== null && (e.f & (M | X | H)) === 0)
      for (o = 0; o < /** @type {Source[]} */
      C.length; o++)
        Zt(
          C[o],
          /** @type {Effect} */
          e
        );
    return a !== null && a !== e && (Te++, C !== null && (n === null ? n = C : n.push(.../** @type {Source[]} */
    C))), d;
  } finally {
    S = t, L = r, C = n, h = a, W = i, A = s, ft(u), U = l, e.f ^= je;
  }
}
function rn(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = vr.call(r, e);
    if (n !== -1) {
      var a = r.length - 1;
      a === 0 ? r = t.reactions = null : (r[n] = r[a], r.pop());
    }
  }
  r === null && (t.f & M) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (S === null || !S.includes(t)) && (j(t, X), (t.f & (D | Ee)) === 0 && (t.f ^= Ee), Ot(
    /** @type {Derived} **/
    t
  ), Ae(
    /** @type {Derived} **/
    t,
    0
  ));
}
function Ae(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      rn(e, r[n]);
}
function tt(e) {
  var t = e.f;
  if ((t & Pe) === 0) {
    j(e, P);
    var r = p, n = w, a = J;
    p = e, J = !0;
    try {
      (t & Ke) !== 0 ? Zr(e) : Ht(e), Bt(e);
      var i = Jt(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Kt;
      var s = e.deps, u;
    } catch (l) {
      Le(l, e, r, n || e.ctx);
    } finally {
      J = a, p = r;
    }
  }
}
function nn() {
  try {
    Tr();
  } catch (e) {
    if (Se !== null)
      Le(e, Se, null);
    else
      throw e;
  }
}
function an() {
  var e = J;
  try {
    var t = 0;
    for (J = !0; ye.length > 0; ) {
      t++ > 1e3 && nn();
      var r = ye, n = r.length;
      ye = [];
      for (var a = 0; a < n; a++) {
        var i = fn(r[a]);
        ln(i);
      }
      ce.clear();
    }
  } finally {
    Ve = !1, J = e, Se = null;
  }
}
function ln(e) {
  var t = e.length;
  if (t !== 0)
    for (var r = 0; r < t; r++) {
      var n = e[r];
      if ((n.f & (Pe | te)) === 0)
        try {
          de(n) && (tt(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null ? Vt(n) : n.fn = null));
        } catch (a) {
          Le(a, n, null, n.ctx);
        }
    }
}
function De(e) {
  Ve || (Ve = !0, queueMicrotask(an));
  for (var t = Se = e; t.parent !== null; ) {
    t = t.parent;
    var r = t.f;
    if ((r & (ne | V)) !== 0) {
      if ((r & P) === 0) return;
      t.f ^= P;
    }
  }
  ye.push(t);
}
function fn(e) {
  for (var t = [], r = e; r !== null; ) {
    var n = r.f, a = (n & (V | ne)) !== 0, i = a && (n & P) !== 0;
    if (!i && (n & te) === 0) {
      if ((n & Et) !== 0)
        t.push(r);
      else if (a)
        r.f ^= P;
      else
        try {
          de(r) && tt(r);
        } catch (l) {
          Le(l, r, null, r.ctx);
        }
      var s = r.first;
      if (s !== null) {
        r = s;
        continue;
      }
    }
    var u = r.parent;
    for (r = r.next; r === null && u !== null; )
      r = u.next, u = u.parent;
  }
  return t;
}
function b(e) {
  var t = e.f, r = (t & M) !== 0;
  if (h !== null && !U) {
    if (!(A != null && A.includes(e))) {
      var n = h.deps;
      e.rv < Te && (e.rv = Te, S === null && n !== null && n[L] === e ? L++ : S === null ? S = [e] : (!W || !S.includes(e)) && S.push(e));
    }
  } else if (r && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var a = (
      /** @type {Derived} */
      e
    ), i = a.parent;
    i !== null && (i.f & D) === 0 && (a.f ^= D);
  }
  return r && (a = /** @type {Derived} */
  e, de(a) && Nt(a)), ve && ce.has(e) ? ce.get(e) : e.v;
}
function re(e) {
  var t = U;
  try {
    return U = !0, e();
  } finally {
    U = t;
  }
}
const sn = -7169;
function j(e, t) {
  e.f = e.f & sn | t;
}
function un(e) {
  if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
    if (Z in e)
      Ye(e);
    else if (!Array.isArray(e))
      for (let t in e) {
        const r = e[t];
        typeof r == "object" && r && Z in r && Ye(r);
      }
  }
}
function Ye(e, t = /* @__PURE__ */ new Set()) {
  if (typeof e == "object" && e !== null && // We don't want to traverse DOM elements
  !(e instanceof EventTarget) && !t.has(e)) {
    t.add(e), e instanceof Date && e.getTime();
    for (let n in e)
      try {
        Ye(e[n], t);
      } catch {
      }
    const r = We(e);
    if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
      const n = xt(r);
      for (let a in n) {
        const i = n[a].get;
        if (i)
          try {
            i.call(e);
          } catch {
          }
      }
    }
  }
}
const on = ["touchstart", "touchmove"];
function cn(e) {
  return on.includes(e);
}
function vn(e) {
  var t = h, r = p;
  B(null), K(null);
  try {
    return e();
  } finally {
    B(t), K(r);
  }
}
const Qt = /* @__PURE__ */ new Set(), ze = /* @__PURE__ */ new Set();
function dn(e, t, r, n = {}) {
  function a(i) {
    if (n.capture || se.call(t, i), !i.cancelBubble)
      return vn(() => r == null ? void 0 : r.call(this, i));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? Wt(() => {
    t.addEventListener(e, a, n);
  }) : t.addEventListener(e, a, n), a;
}
function _n(e, t, r, n, a) {
  var i = { capture: n, passive: a }, s = dn(e, t, r, i);
  (t === document.body || t === window || t === document) && Mt(() => {
    t.removeEventListener(e, s, i);
  });
}
function hn(e) {
  for (var t = 0; t < e.length; t++)
    Qt.add(e[t]);
  for (var r of ze)
    r(e);
}
function se(e) {
  var F;
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, a = ((F = e.composedPath) == null ? void 0 : F.call(e)) || [], i = (
    /** @type {null | Element} */
    a[0] || e.target
  ), s = 0, u = e.__root;
  if (u) {
    var l = a.indexOf(u);
    if (l !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var f = a.indexOf(t);
    if (f === -1)
      return;
    l <= f && (s = l);
  }
  if (i = /** @type {Element} */
  a[s] || e.target, i !== t) {
    _r(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || r;
      }
    });
    var d = h, c = p;
    B(null), K(null);
    try {
      for (var o, v = []; i !== null; ) {
        var g = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var y = i["__" + n];
          if (y != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i))
            if (yt(y)) {
              var [x, ...k] = y;
              x.apply(i, [e, ...k]);
            } else
              y.call(i, e);
        } catch (q) {
          o ? v.push(q) : o = q;
        }
        if (e.cancelBubble || g === t || g === null)
          break;
        i = g;
      }
      if (o) {
        for (let q of v)
          queueMicrotask(() => {
            throw q;
          });
        throw o;
      }
    } finally {
      e.__root = t, delete e.currentTarget, B(d), K(c);
    }
  }
}
function pn(e) {
  var t = document.createElement("template");
  return t.innerHTML = e, t.content;
}
function Xt(e, t) {
  var r = (
    /** @type {Effect} */
    p
  );
  r.nodes_start === null && (r.nodes_start = e, r.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function ke(e, t) {
  var r = (t & Mr) !== 0, n, a = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = pn(a ? e : "<!>" + e), n = /** @type {Node} */
    /* @__PURE__ */ Xe(n));
    var i = (
      /** @type {TemplateNode} */
      r || Dt ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return Xt(i, i), i;
  };
}
function gn() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Ct();
  return e.append(t, r), Xt(t, r), e;
}
function ue(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function wn(e, t) {
  return bn(e, t);
}
const $ = /* @__PURE__ */ new Map();
function bn(e, { target: t, anchor: r, props: n = {}, events: a, context: i, intro: s = !0 }) {
  Vr();
  var u = /* @__PURE__ */ new Set(), l = (c) => {
    for (var o = 0; o < c.length; o++) {
      var v = c[o];
      if (!u.has(v)) {
        u.add(v);
        var g = cn(v);
        t.addEventListener(v, se, { passive: g });
        var y = $.get(v);
        y === void 0 ? (document.addEventListener(v, se, { passive: g }), $.set(v, 1)) : $.set(v, y + 1);
      }
    }
  };
  l(dr(Qt)), ze.add(l);
  var f = void 0, d = Gr(() => {
    var c = r ?? t.appendChild(Ct());
    return Be(() => {
      if (i) {
        Tt({});
        var o = (
          /** @type {ComponentContext} */
          w
        );
        o.c = i;
      }
      a && (n.$$events = a), f = e(c, n) || {}, i && At();
    }), () => {
      var g;
      for (var o of u) {
        t.removeEventListener(o, se);
        var v = (
          /** @type {number} */
          $.get(o)
        );
        --v === 0 ? (document.removeEventListener(o, se), $.delete(o)) : $.set(o, v);
      }
      ze.delete(l), c !== r && ((g = c.parentNode) == null || g.removeChild(c));
    };
  });
  return mn.set(f, d), f;
}
let mn = /* @__PURE__ */ new WeakMap();
function ct(e, t, [r, n] = [0, 0]) {
  var a = e, i = null, s = null, u = O, l = r > 0 ? Ge : 0, f = !1;
  const d = (o, v = !0) => {
    f = !0, c(v, o);
  }, c = (o, v) => {
    u !== (u = o) && (u ? (i ? st(i) : v && (i = Be(() => v(a))), s && He(s, () => {
      s = null;
    })) : (s ? st(s) : v && (s = Be(() => v(a, [r + 1, n]))), i && He(i, () => {
      i = null;
    })));
  };
  Ut(() => {
    f = !1, t(d), f || c(null, null);
  }, l);
}
function $t(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (t = 0; t < a; t++) e[t] && (r = $t(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function yn() {
  for (var e, t, r = 0, n = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = $t(e)) && (n && (n += " "), n += t);
  return n;
}
function xn(e) {
  return typeof e == "object" ? yn(e) : e ?? "";
}
const vt = [...` 	
\r\f \v\uFEFF`];
function En(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (t && (n = n ? n + " " + t : t), r) {
    for (var a in r)
      if (r[a])
        n = n ? n + " " + a : a;
      else if (n.length)
        for (var i = a.length, s = 0; (s = n.indexOf(a, s)) >= 0; ) {
          var u = s + i;
          (s === 0 || vt.includes(n[s - 1])) && (u === n.length || vt.includes(n[u])) ? n = (s === 0 ? "" : n.substring(0, s)) + n.substring(u + 1) : s = u;
        }
  }
  return n === "" ? null : n;
}
function dt(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var a in e) {
    var i = e[a];
    i != null && i !== "" && (n += " " + a + ": " + i + r);
  }
  return n;
}
function In(e, t) {
  if (t) {
    var r = "", n, a;
    return Array.isArray(t) ? (n = t[0], a = t[1]) : n = t, n && (r += dt(n)), a && (r += dt(a, !0)), r = r.trim(), r === "" ? null : r;
  }
  return String(e);
}
function er(e, t, r, n, a, i) {
  var s = e.__className;
  if (s !== r || s === void 0) {
    var u = En(r, n, i);
    u == null ? e.removeAttribute("class") : e.className = u, e.__className = r;
  } else if (i && a !== i)
    for (var l in i) {
      var f = !!i[l];
      (a == null || f !== !!a[l]) && e.classList.toggle(l, f);
    }
  return i;
}
function Fe(e, t = {}, r, n) {
  for (var a in r) {
    var i = r[a];
    t[a] !== i && (r[a] == null ? e.style.removeProperty(a) : e.style.setProperty(a, i, n));
  }
}
function tr(e, t, r, n) {
  var a = e.__style;
  if (a !== t) {
    var i = In(t, n);
    i == null ? e.removeAttribute("style") : e.style.cssText = i, e.__style = t;
  } else n && (Array.isArray(n) ? (Fe(e, r == null ? void 0 : r[0], n[0]), Fe(e, r == null ? void 0 : r[1], n[1], "important")) : Fe(e, r, n));
  return n;
}
const Sn = Symbol("is custom element"), Tn = Symbol("is html");
function _t(e, t, r, n) {
  var a = An(e);
  a[t] !== (a[t] = r) && (r == null ? e.removeAttribute(t) : typeof r != "string" && On(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function An(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [Sn]: e.nodeName.includes("-"),
      [Tn]: e.namespaceURI === jr
    })
  );
}
var ht = /* @__PURE__ */ new Map();
function On(e) {
  var t = ht.get(e.nodeName);
  if (t) return t;
  ht.set(e.nodeName, t = []);
  for (var r, n = e, a = Element.prototype; a !== n; ) {
    r = xt(n);
    for (var i in r)
      r[i].set && t.push(i);
    n = We(n);
  }
  return t;
}
function pt(e, t) {
  return e === t || (e == null ? void 0 : e[Z]) === t;
}
function rr(e = {}, t, r, n) {
  return et(() => {
    var a, i;
    return jt(() => {
      a = i, i = [], re(() => {
        e !== r(...i) && (t(e, ...i), a && pt(r(...a), e) && t(null, ...a));
      });
    }), () => {
      Wt(() => {
        i && pt(r(...i), e) && t(null, ...i);
      });
    };
  }), e;
}
function Pn(e = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    w
  ), r = t.l.u;
  if (!r) return;
  let n = () => un(t.s);
  if (e) {
    let a = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const s = /* @__PURE__ */ oe(() => {
      let u = !1;
      const l = t.s;
      for (const f in l)
        l[f] !== i[f] && (i[f] = l[f], u = !0);
      return u && a++, a;
    });
    n = () => b(s);
  }
  r.b.length && Kr(() => {
    gt(t, n), Me(r.b);
  }), Ue(() => {
    const a = re(() => r.m.map(gr));
    return () => {
      for (const i of a)
        typeof i == "function" && i();
    };
  }), r.a.length && Ue(() => {
    gt(t, n), Me(r.a);
  });
}
function gt(e, t) {
  if (e.l.s)
    for (const r of e.l.s) b(r);
  t();
}
let we = !1;
function Nn(e) {
  var t = we;
  try {
    return we = !1, [e(), we];
  } finally {
    we = t;
  }
}
function wt(e) {
  var t;
  return ((t = e.ctx) == null ? void 0 : t.d) ?? !1;
}
function E(e, t, r, n) {
  var he;
  var a = (r & Dr) !== 0, i = !ie || (r & kr) !== 0, s = (r & Cr) !== 0, u = (r & Fr) !== 0, l = !1, f;
  s ? [f, l] = Nn(() => (
    /** @type {V} */
    e[t]
  )) : f = /** @type {V} */
  e[t];
  var d = Z in e || yr in e, c = s && (((he = ee(e, t)) == null ? void 0 : he.set) ?? (d && t in e && ((m) => e[t] = m))) || void 0, o = (
    /** @type {V} */
    n
  ), v = !0, g = !1, y = () => (g = !0, v && (v = !1, u ? o = re(
    /** @type {() => V} */
    n
  ) : o = /** @type {V} */
  n), o);
  f === void 0 && n !== void 0 && (c && i && Ar(), f = y(), c && c(f));
  var x;
  if (i)
    x = () => {
      var m = (
        /** @type {V} */
        e[t]
      );
      return m === void 0 ? y() : (v = !0, g = !1, m);
    };
  else {
    var k = (a ? oe : Je)(
      () => (
        /** @type {V} */
        e[t]
      )
    );
    k.f |= br, x = () => {
      var m = b(k);
      return m !== void 0 && (o = /** @type {V} */
      void 0), m === void 0 ? o : m;
    };
  }
  if ((r & Rr) === 0)
    return x;
  if (c) {
    var F = e.$$legacy;
    return function(m, Y) {
      return arguments.length > 0 ? ((!i || !Y || F || l) && c(Y ? x() : m), m) : x();
    };
  }
  var q = !1, _e = /* @__PURE__ */ be(f), N = /* @__PURE__ */ oe(() => {
    var m = x(), Y = b(_e);
    return q ? (q = !1, Y) : _e.v = m;
  });
  return s && b(N), a || (N.equals = Ze), function(m, Y) {
    if (arguments.length > 0) {
      const le = Y ? b(N) : i && s ? G(m) : m;
      if (!N.equals(le)) {
        if (q = !0, T(_e, le), g && o !== void 0 && (o = le), wt(N))
          return m;
        re(() => b(N));
      }
      return m;
    }
    return wt(N) ? N.v : b(N);
  };
}
function Ln(e) {
  w === null && qr(), ie && w.l !== null ? Dn(w).m.push(e) : Ue(() => {
    const t = re(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function Dn(e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    e.l
  );
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
const kn = "5";
var mt;
typeof window < "u" && ((mt = window.__svelte ?? (window.__svelte = {})).v ?? (mt.v = /* @__PURE__ */ new Set())).add(kn);
Lr();
const Rn = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='21'%20height='18'%20fill='none'%3e%3cpath%20fill='%23fff'%20fill-rule='evenodd'%20d='M5.314%203.3q1.003-.899%202.93-.898h.076l.025.001c.672.009%201.3.298%201.81.735.32.277.741.462%201.204.462a1.8%201.8%200%200%200%201.8-1.8c0-.957-.72-1.8-2.006-1.8H8.217Q4.786%200%202.991%201.61%201.224%203.219%201.223%205.833q0%201.478.502%202.613a7%207%200%200%200%201.451%202.058q.744.705%201.717%201.408L.801%2018h3.378l4.566-6.81-1.584-1.082q-1.451-.976-2.164-1.9-.686-.95-.686-2.56%200-1.451%201.003-2.349m11.337-1.55a1.25%201.25%200%201%201-2.5%200%201.25%201.25%200%200%201%202.5%200m2.75%200a.75.75%200%201%201-1.5%200%20.75.75%200%200%201%201.5%200m-6%204.775a1.875%201.875%200%201%201-3.75%200%201.875%201.875%200%200%201%203.75%200m4.25%200a1.5%201.5%200%201%201-3%200%201.5%201.5%200%200%201%203%200m2.25%201a1%201%200%201%200%200-2%201%201%200%200%200%200%202m-8.375%205.825a1.875%201.875%200%201%200%200-3.75%201.875%201.875%200%200%200%200%203.75m4.625-.375a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203m4.75-1.5a1%201%200%201%201-2%200%201%201%200%200%201%202%200M11.4%2018a1.75%201.75%200%201%200%200-3.5%201.75%201.75%200%200%200%200%203.5m4-.5a1.25%201.25%200%201%200%200-2.5%201.25%201.25%200%200%200%200%202.5m4-1.25a.75.75%200%201%201-1.5%200%20.75.75%200%200%201%201.5%200'%20clip-rule='evenodd'/%3e%3c/svg%3e";
var Cn = /* @__PURE__ */ ke('<iframe title="neuroexpert-widget" src="about:blank" allow="clipboard-write"></iframe>');
function bt(e, t) {
  let r = E(t, "iframeElement", 12), n = E(t, "isIframe", 8, !1), a = E(t, "isOpen", 8, !0), i = E(t, "zIndex", 8, 1e3);
  var s = Cn();
  let u, l;
  rr(s, (f) => r(f), () => r()), qt(
    (f) => {
      u = er(s, 1, xn(n() ? "iframe" : "widget"), "svelte-149ck22", u, f), l = tr(s, "", l, { "--z-index": i() });
    },
    [() => ({ visible: a() })],
    Je
  ), ue(e, s);
}
const Fn = (e, t) => {
  T(t, !b(t));
};
var Mn = /* @__PURE__ */ ke('<img class="custom-logo svelte-13k5vl5" width="32" height="32" alt="Logo">'), jn = /* @__PURE__ */ ke('<span class="logo-wrapper svelte-13k5vl5"><img class="logo svelte-13k5vl5" width="20" height="16" alt="Logo"></span>'), qn = /* @__PURE__ */ ke('<div><!> <div class="button-wrapper svelte-13k5vl5"><button class="toggle-button svelte-13k5vl5"><!> Нужна помощь?</button></div></div>');
function Un(e, t) {
  Tt(t, !1);
  const r = ["by", "ru"];
  let n = E(t, "consumer", 8, void 0), a = E(t, "projectId", 8, void 0), i = E(t, "hasOutsideClick", 8, !0), s = E(t, "isIframe", 8, !1), u = E(t, "isInternal", 8, !1), l = E(t, "parentId", 8, void 0), f = E(t, "zIndex", 8, 1e3), d = E(t, "uid", 8, void 0), c = E(t, "theme", 8, "auto"), o = E(t, "tld", 8, void 0), v = E(t, "customLabel", 8, void 0), g = E(t, "hasHeader", 8, !1), y = E(t, "beta", 8, !1), x = /* @__PURE__ */ be(), k = /* @__PURE__ */ be(!1), F = /* @__PURE__ */ be();
  const q = () => {
    if (o() && r.includes(o()))
      return o();
    const _ = window.location.origin.split(".").pop();
    return _ && r.includes(_) ? _ : "ru";
  }, N = u() ? "https://expert.yandex-team.ru" : n() ? `https://alicepro.yandex.${q()}` : "https://expert.yandex.ru", he = (_) => {
    !i() || s() || _.target !== b(F) && T(k, !1);
  }, m = (_) => {
    const I = new Uint8Array(_);
    return window.crypto.getRandomValues(I), Array.from(I, (pe) => pe.toString(16).padStart(2, "0")).join("");
  }, Y = () => {
    const _ = localStorage.getItem("neuroexpert-user-salt");
    if (_) return _;
    const I = m(16);
    return localStorage.setItem("neuroexpert-user-salt", I), I;
  }, le = () => a() ? n() ? `${N}/expert/${a()}/iframe-boltalka` : `${N}/expert/projects/${a()}/${s() ? "iframe" : "widget"}` : `${N}/expert/iframe-boltalka`, nr = () => {
    const _ = new URL(le());
    return c() !== "auto" && _.searchParams.set("theme", c()), a() && _.searchParams.set("userSalt", Y()), n() && _.searchParams.set("consumer", n()), d() && _.searchParams.set("uid", d()), v() && _.searchParams.set("customLabel", v()), g() && _.searchParams.set("hasHeader", String(g())), y() && _.searchParams.set("beta", String(y())), _.toString();
  }, rt = (() => {
    var _;
    if (v() && a())
      try {
        return (_ = JSON.parse(`{
  "production": {
    "54f6f5e30bf811f19435fe681ff4b802": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/star.png",
    "8f0afa2458d011f0b81a2adde7e90ca6": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/alice-devices.svg",
    "a91b9a88a5c511f09524261771723f18": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/corp-bro.svg",
    "e8b0fdbe3c9311f0a45aa6ff32bd5860": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/history.ru.png",
    "e5a66bca8d9711f0991776989734f535": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/alice-pro.png",
    "dbf67ea3d5ce11f086bd261771723f18": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/support.svg",
    "12f4ab2c0d9c11f18d682e7dfacf48ee": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/support.svg",
    "4eb5dd940cc411f1bbb8c2e3e0e0ab3c": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/trans-russia.png",
    "f9176e3ed03311f0a5db8e7d0d775479": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/rsk.svg",
    "db57349f9d5811f0bd52eab7ff754a80": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/perco.png",
    "17ebf312d5bb11f08aaf52372231acfc": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/ai-ico-chat.png"
  },
  "testing": {
    "822c38217f5811f098fe2aa6398a8adf": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/history.ru.png",
    "6bba7e10b25b11f08f889201b50f60c8": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/alice-pro.png",
    "38dbe3e0df5411f0ac809201b50f60c8": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/support.svg",
    "82eaf24fa3bb11f08ee89201b50f60c8": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/star.png",
    "17ebf312d5bb11f08aaf52372231acfc": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/ai-ico-chat.png"
  },
  "development": {
    "822c38217f5811f098fe2aa6398a8adf": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/history.ru.png",
    "6bba7e10b25b11f08f889201b50f60c8": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/alice-pro.png",
    "38dbe3e0df5411f0ac809201b50f60c8": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/support.svg",
    "82eaf24fa3bb11f08ee89201b50f60c8": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/ai-ico-chat.png",
    "17ebf312d5bb11f08aaf52372231acfc": "https://browserweb.s3.yandex.net/neuro-expert/widget-white-label-icons/ai-ico-chat.png"
  }
}
`).production) == null ? void 0 : _[a()];
      } catch (I) {
        console.error(new Error("Failed to get custom logo from whitelabel projects list", { cause: I }));
      }
  })();
  Ln(() => {
    Br(x, b(x).src = nr());
  }), Pn();
  var nt = gn();
  _n("click", qe, he);
  var ir = Yr(nt);
  {
    var ar = (_) => {
      bt(_, {
        isIframe: !0,
        get zIndex() {
          return f();
        },
        get iframeElement() {
          return b(x);
        },
        set iframeElement(I) {
          T(x, I);
        },
        $$legacy: !0
      });
    }, lr = (_) => {
      var I = qn();
      let pe, it;
      var at = ge(I);
      bt(at, {
        get isOpen() {
          return b(k);
        },
        get iframeElement() {
          return b(x);
        },
        set iframeElement(R) {
          T(x, R);
        },
        $$legacy: !0
      });
      var fr = zr(at, 2), Re = ge(fr);
      Re.__click = [Fn, k];
      var sr = ge(Re);
      {
        var ur = (R) => {
          var fe = Mn();
          _t(fe, "src", rt), ue(R, fe);
        }, or = (R) => {
          var fe = jn(), cr = ge(fe);
          _t(cr, "src", Rn), ue(R, fe);
        };
        ct(sr, (R) => {
          rt ? R(ur) : R(or, !1);
        });
      }
      rr(Re, (R) => T(F, R), () => b(F)), qt(
        (R) => {
          pe = er(I, 1, "container svelte-13k5vl5", null, pe, R), it = tr(I, "", it, { "--z-index": f() });
        },
        [() => ({ fixed: !l() })],
        Je
      ), ue(_, I);
    };
    ct(ir, (_) => {
      s() ? _(ar) : _(lr, !1);
    });
  }
  ue(e, nt), At();
}
hn(["click"]);
const Bn = (e) => {
  if (!e) throw new Error("Widget settings are required");
  const {
    beta: t,
    consumer: r,
    customLabel: n,
    hasHeader: a,
    hasOutsideClick: i,
    isIframe: s,
    isInternal: u,
    parentId: l,
    projectId: f,
    theme: d,
    tld: c,
    uid: o,
    zIndex: v
  } = e;
  if (!f && !r)
    throw new Error("Either projectId or consumer is required");
  const g = l ? document.getElementById(l) : null;
  wn(Un, {
    target: g ?? document.body,
    props: {
      beta: t,
      consumer: r,
      customLabel: n,
      hasHeader: a,
      hasOutsideClick: i,
      isIframe: s,
      isInternal: u,
      parentId: l,
      projectId: f,
      theme: d,
      tld: c,
      uid: o,
      zIndex: v
    }
  });
};
window.initNeuroexpert = Bn;
export {
  Bn as initNeuroexpert
};
