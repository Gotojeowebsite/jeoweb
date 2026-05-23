const qc = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(qc);
let Hc = !1, Un = !1, Fc = !1;
function jc() {
  Un = !0;
}
jc();
const Fa = 1, ja = 2, Eo = 4, Wc = 8, Yc = 16, Gc = 1, Xc = 2, Lo = 4, Kc = 8, Qc = 16, Zc = 4, Jc = 1, $c = 2, Po = "[", fa = "[!", Gs = "]", dn = {}, yt = Symbol(), eu = "http://www.w3.org/1999/xhtml", tu = "http://www.w3.org/2000/svg", ru = "@attach", Io = !1;
var Vn = Array.isArray, nu = Array.prototype.indexOf, Xs = Array.from, Oa = Object.keys, fn = Object.defineProperty, Br = Object.getOwnPropertyDescriptor, zo = Object.getOwnPropertyDescriptors, au = Object.prototype, su = Array.prototype, Ks = Object.getPrototypeOf, Hi = Object.isExtensible;
function Sn(t) {
  return typeof t == "function";
}
const je = () => {
};
function Fi(t) {
  return typeof t?.then == "function";
}
function iu(t) {
  return t();
}
function Ss(t) {
  for (var e = 0; e < t.length; e++)
    t[e]();
}
function Mo() {
  var t, e, r = new Promise((n, a) => {
    t = n, e = a;
  });
  return { promise: r, resolve: t, reject: e };
}
const Xt = 2, Qs = 4, Wa = 8, Zr = 16, Vr = 32, Jr = 64, Zs = 128, lr = 256, Na = 512, Et = 1024, Kt = 2048, zr = 4096, gr = 8192, _n = 16384, Ya = 32768, $r = 65536, ji = 1 << 17, ou = 1 << 18, bn = 1 << 19, Oo = 1 << 20, As = 1 << 21, Ga = 1 << 22, on = 1 << 23, kr = Symbol("$state"), Js = Symbol("legacy props"), lu = Symbol(""), ea = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), cu = 1, Xa = 3, pn = 8;
function Ka(t) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function uu() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function du(t) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function fu() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function vu(t) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function gu() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hu() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function mu(t) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function _u() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function bu() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function pu() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function wu() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function va(t) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function yu() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function xu() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let xe = !1;
function Mt(t) {
  xe = t;
}
let Pe;
function xt(t) {
  if (t === null)
    throw va(), dn;
  return Pe = t;
}
function mr() {
  return xt(
    /** @type {TemplateNode} */
    /* @__PURE__ */ wr(Pe)
  );
}
function A(t) {
  if (xe) {
    if (/* @__PURE__ */ wr(Pe) !== null)
      throw va(), dn;
    Pe = t;
  }
}
function mt(t = 1) {
  if (xe) {
    for (var e = t, r = Pe; e--; )
      r = /** @type {TemplateNode} */
      /* @__PURE__ */ wr(r);
    Pe = r;
  }
}
function na(t = !0) {
  for (var e = 0, r = Pe; ; ) {
    if (r.nodeType === pn) {
      var n = (
        /** @type {Comment} */
        r.data
      );
      if (n === Gs) {
        if (e === 0) return r;
        e -= 1;
      } else (n === Po || n === fa) && (e += 1);
    }
    var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ wr(r)
    );
    t && r.remove(), r = a;
  }
}
function No(t) {
  if (!t || t.nodeType !== pn)
    throw va(), dn;
  return (
    /** @type {Comment} */
    t.data
  );
}
function Bo(t) {
  return t === this.v;
}
function $s(t, e) {
  return t != t ? e == e : t !== e || t !== null && typeof t == "object" || typeof t == "function";
}
function Do(t) {
  return !$s(t, this.v);
}
let nt = null;
function Xr(t) {
  nt = t;
}
function zn(t) {
  return (
    /** @type {T} */
    ei().get(t)
  );
}
function ga(t, e) {
  return ei().set(t, e), e;
}
function Tu(t) {
  return ei().has(t);
}
function ue(t, e = !1, r) {
  nt = {
    p: nt,
    c: null,
    e: null,
    s: t,
    x: null,
    l: Un && !e ? { s: null, u: null, $: [] } : null
  };
}
function de(t) {
  var e = (
    /** @type {ComponentContext} */
    nt
  ), r = e.e;
  if (r !== null) {
    e.e = null;
    for (var n of r)
      tl(n);
  }
  return t !== void 0 && (e.x = t), nt = e.p, t ?? /** @type {T} */
  {};
}
function qn() {
  return !Un || nt !== null && nt.l === null;
}
function ei(t) {
  return nt === null && Ka(), nt.c ??= new Map(ku(nt) || void 0);
}
function ku(t) {
  let e = t.p;
  for (; e !== null; ) {
    const r = e.c;
    if (r !== null)
      return r;
    e = e.p;
  }
  return null;
}
let sn = [];
function Ro() {
  var t = sn;
  sn = [], Ss(t);
}
function _r(t) {
  if (sn.length === 0 && !Ln) {
    var e = sn;
    queueMicrotask(() => {
      e === sn && Ro();
    });
  }
  sn.push(t);
}
function Cu() {
  for (; sn.length > 0; )
    Ro();
}
const Su = /* @__PURE__ */ new WeakMap();
function Uo(t) {
  var e = Ie;
  if (e === null)
    return Fe.f |= on, t;
  if (e.f & Ya)
    Mn(t, e);
  else {
    if (!(e.f & Zs))
      throw !e.parent && t instanceof Error && Vo(t), t;
    e.b.error(t);
  }
}
function Mn(t, e) {
  for (; e !== null; ) {
    if (e.f & Zs)
      try {
        e.b.error(t);
        return;
      } catch (r) {
        t = r;
      }
    e = e.parent;
  }
  throw t instanceof Error && Vo(t), t;
}
function Vo(t) {
  const e = Su.get(t);
  e && (fn(t, "message", {
    value: e.message
  }), fn(t, "stack", {
    value: e.stack
  }));
}
const xa = /* @__PURE__ */ new Set();
let it = null, La = null, Es = /* @__PURE__ */ new Set(), Tr = [], Qa = null, Ls = !1, Ln = !1;
class er {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  #t = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #e = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #a = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #i = null;
  /**
   * Async effects inside a newly-created `<svelte:boundary>`
   * — these do not prevent the batch from committing
   * @type {Effect[]}
   */
  #c = [];
  /**
   * Template effects and `$effect.pre` effects, which run when
   * a batch is committed
   * @type {Effect[]}
   */
  #s = [];
  /**
   * The same as `#render_effects`, but for `$effect` (which runs after)
   * @type {Effect[]}
   */
  #n = [];
  /**
   * Block effects, which may need to re-run on subsequent flushes
   * in order to update internal sources (e.g. each block items)
   * @type {Effect[]}
   */
  #r = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Effect[]}
   */
  #o = [];
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Effect[]}
   */
  #u = [];
  /**
   * A set of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`
   * @type {Set<Effect>}
   */
  skipped_effects = /* @__PURE__ */ new Set();
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    Tr = [], La = null;
    var r = er.apply(this);
    for (const s of e)
      this.#d(s);
    if (this.#a === 0) {
      this.#f();
      var n = this.#s, a = this.#n;
      this.#s = [], this.#n = [], this.#r = [], La = this, it = null, Wi(n), Wi(a), this.#i?.resolve();
    } else
      this.#l(this.#s), this.#l(this.#n), this.#l(this.#r);
    r();
    for (const s of this.#c)
      Nn(s);
    this.#c = [];
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   */
  #d(e) {
    e.f ^= Et;
    for (var r = e.first; r !== null; ) {
      var n = r.f, a = (n & (Vr | Jr)) !== 0, s = a && (n & Et) !== 0, i = s || (n & gr) !== 0 || this.skipped_effects.has(r);
      if (!i && r.fn !== null) {
        a ? r.f ^= Et : n & Qs ? this.#n.push(r) : n & Et || (n & Ga && r.b?.is_pending() ? this.#c.push(r) : ma(r) && (r.f & Zr && this.#r.push(r), Nn(r)));
        var d = r.first;
        if (d !== null) {
          r = d;
          continue;
        }
      }
      var c = r.parent;
      for (r = r.next; r === null && c !== null; )
        r = c.next, c = c.parent;
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #l(e) {
    for (const r of e)
      (r.f & Kt ? this.#o : this.#u).push(r), Nt(r, Et);
    e.length = 0;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, r) {
    this.#t.has(e) || this.#t.set(e, r), this.current.set(e, e.v);
  }
  activate() {
    it = this;
  }
  deactivate() {
    it = null, La = null;
    for (const e of Es)
      if (Es.delete(e), e(), it !== null)
        break;
  }
  flush() {
    if (Tr.length > 0) {
      if (this.activate(), qo(), it !== null && it !== this)
        return;
    } else this.#a === 0 && this.#f();
    this.deactivate();
  }
  /**
   * Append and remove branches to/from the DOM
   */
  #f() {
    for (const e of this.#e)
      e();
    if (this.#e.clear(), xa.size > 1) {
      this.#t.clear();
      let e = !0;
      for (const r of xa) {
        if (r === this) {
          e = !1;
          continue;
        }
        for (const [n, a] of this.current) {
          if (r.current.has(n))
            if (e)
              r.current.set(n, a);
            else
              continue;
          Ho(n);
        }
        if (Tr.length > 0) {
          it = r;
          const n = er.apply(r);
          for (const a of Tr)
            r.#d(a);
          Tr = [], n();
        }
      }
      it = null;
    }
    xa.delete(this);
  }
  increment() {
    this.#a += 1;
  }
  decrement() {
    if (this.#a -= 1, this.#a === 0) {
      for (const e of this.#o)
        Nt(e, Kt), vn(e);
      for (const e of this.#u)
        Nt(e, zr), vn(e);
      this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    this.#e.add(e);
  }
  settled() {
    return (this.#i ??= Mo()).promise;
  }
  static ensure() {
    if (it === null) {
      const e = it = new er();
      xa.add(it), Ln || er.enqueue(() => {
        it === e && e.flush();
      });
    }
    return it;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    _r(e);
  }
  /**
   * @param {Batch} current_batch
   */
  static apply(e) {
    return je;
  }
}
function o(t) {
  var e = Ln;
  Ln = !0;
  try {
    for (var r; ; ) {
      if (Cu(), Tr.length === 0 && (it?.flush(), Tr.length === 0))
        return Qa = null, /** @type {T} */
        r;
      qo();
    }
  } finally {
    Ln = e;
  }
}
function qo() {
  var t = Pn;
  Ls = !0;
  try {
    var e = 0;
    for (Ki(!0); Tr.length > 0; ) {
      var r = er.ensure();
      if (e++ > 1e3) {
        var n, a;
        Au();
      }
      r.process(Tr), Gr.clear();
    }
  } finally {
    Ls = !1, Ki(t), Qa = null;
  }
}
function Au() {
  try {
    gu();
  } catch (t) {
    Mn(t, Qa);
  }
}
let nn = null;
function Wi(t) {
  var e = t.length;
  if (e !== 0) {
    for (var r = 0; r < e; ) {
      var n = t[r++];
      if (!(n.f & (_n | gr)) && ma(n) && (nn = [], Nn(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null && n.ac === null ? sl(n) : n.fn = null), nn?.length > 0)) {
        Gr.clear();
        for (const a of nn)
          Nn(a);
        nn = [];
      }
    }
    nn = null;
  }
}
function Ho(t) {
  if (t.reactions !== null)
    for (const e of t.reactions) {
      const r = e.f;
      r & Xt ? Ho(
        /** @type {Derived} */
        e
      ) : r & (Ga | Zr) && (Nt(e, Kt), vn(
        /** @type {Effect} */
        e
      ));
    }
}
function vn(t) {
  for (var e = Qa = t; e.parent !== null; ) {
    e = e.parent;
    var r = e.f;
    if (Ls && e === Ie && r & Zr)
      return;
    if (r & (Jr | Vr)) {
      if (!(r & Et)) return;
      e.f ^= Et;
    }
  }
  Tr.push(e);
}
function Fo(t) {
  let e = 0, r = Lr(0), n;
  return () => {
    Ru() && (x(r), en(() => (e === 0 && (n = ye(() => t(() => ta(r)))), e += 1, () => {
      _r(() => {
        e -= 1, e === 0 && (n?.(), n = void 0, ta(r));
      });
    })));
  };
}
var Eu = $r | bn | Zs;
function Lu(t, e, r) {
  new Pu(t, e, r);
}
class Pu {
  /** @type {Boundary | null} */
  parent;
  #t = !1;
  /** @type {TemplateNode} */
  #e;
  /** @type {TemplateNode | null} */
  #a = xe ? Pe : null;
  /** @type {BoundaryProps} */
  #i;
  /** @type {((anchor: Node) => void)} */
  #c;
  /** @type {Effect} */
  #s;
  /** @type {Effect | null} */
  #n = null;
  /** @type {Effect | null} */
  #r = null;
  /** @type {Effect | null} */
  #o = null;
  /** @type {DocumentFragment | null} */
  #u = null;
  #d = 0;
  #l = 0;
  #f = !1;
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #v = null;
  #_ = () => {
    this.#v && Dr(this.#v, this.#d);
  };
  #b = Fo(() => (this.#v = Lr(this.#d), () => {
    this.#v = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(e, r, n) {
    this.#e = e, this.#i = r, this.#c = n, this.parent = /** @type {Effect} */
    Ie.b, this.#t = !!this.#i.pending, this.#s = qr(() => {
      if (Ie.b = this, xe) {
        const a = this.#a;
        mr(), /** @type {Comment} */
        a.nodeType === pn && /** @type {Comment} */
        a.data === fa ? this.#w() : this.#p();
      } else {
        try {
          this.#n = pt(() => n(this.#e));
        } catch (a) {
          this.error(a);
        }
        this.#l > 0 ? this.#h() : this.#t = !1;
      }
    }, Eu), xe && (this.#e = Pe);
  }
  #p() {
    try {
      this.#n = pt(() => this.#c(this.#e));
    } catch (e) {
      this.error(e);
    }
    this.#t = !1;
  }
  #w() {
    const e = this.#i.pending;
    e && (this.#r = pt(() => e(this.#e)), er.enqueue(() => {
      this.#n = this.#g(() => (er.ensure(), pt(() => this.#c(this.#e)))), this.#l > 0 ? this.#h() : (hr(
        /** @type {Effect} */
        this.#r,
        () => {
          this.#r = null;
        }
      ), this.#t = !1);
    }));
  }
  /**
   * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_pending() {
    return this.#t || !!this.parent && this.parent.is_pending();
  }
  has_pending_snippet() {
    return !!this.#i.pending;
  }
  /**
   * @param {() => Effect | null} fn
   */
  #g(e) {
    var r = Ie, n = Fe, a = nt;
    Qt(this.#s), Ot(this.#s), Xr(this.#s.ctx);
    try {
      return e();
    } catch (s) {
      return Uo(s), null;
    } finally {
      Qt(r), Ot(n), Xr(a);
    }
  }
  #h() {
    const e = (
      /** @type {(anchor: Node) => void} */
      this.#i.pending
    );
    this.#n !== null && (this.#u = document.createDocumentFragment(), Iu(this.#n, this.#u)), this.#r === null && (this.#r = pt(() => e(this.#e)));
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #m(e) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#m(e);
      return;
    }
    this.#l += e, this.#l === 0 && (this.#t = !1, this.#r && hr(this.#r, () => {
      this.#r = null;
    }), this.#u && (this.#e.before(this.#u), this.#u = null), _r(() => {
      er.ensure().flush();
    }));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(e) {
    this.#m(e), this.#d += e, Es.add(this.#_);
  }
  get_effect_pending() {
    return this.#b(), x(
      /** @type {Source<number>} */
      this.#v
    );
  }
  /** @param {unknown} error */
  error(e) {
    var r = this.#i.onerror;
    let n = this.#i.failed;
    if (this.#f || !r && !n)
      throw e;
    this.#n && (Lt(this.#n), this.#n = null), this.#r && (Lt(this.#r), this.#r = null), this.#o && (Lt(this.#o), this.#o = null), xe && (xt(
      /** @type {TemplateNode} */
      this.#a
    ), mt(), xt(na()));
    var a = !1, s = !1;
    const i = () => {
      if (a) {
        xu();
        return;
      }
      a = !0, s && wu(), er.ensure(), this.#d = 0, this.#o !== null && hr(this.#o, () => {
        this.#o = null;
      }), this.#t = this.has_pending_snippet(), this.#n = this.#g(() => (this.#f = !1, pt(() => this.#c(this.#e)))), this.#l > 0 ? this.#h() : this.#t = !1;
    };
    var d = Fe;
    try {
      Ot(null), s = !0, r?.(e, i), s = !1;
    } catch (c) {
      Mn(c, this.#s && this.#s.parent);
    } finally {
      Ot(d);
    }
    n && _r(() => {
      this.#o = this.#g(() => {
        this.#f = !0;
        try {
          return pt(() => {
            n(
              this.#e,
              () => e,
              () => i
            );
          });
        } catch (c) {
          return Mn(
            c,
            /** @type {Effect} */
            this.#s.parent
          ), null;
        } finally {
          this.#f = !1;
        }
      });
    });
  }
}
function Iu(t, e) {
  for (var r = t.nodes_start, n = t.nodes_end; r !== null; ) {
    var a = r === n ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ wr(r)
    );
    e.append(r), r = a;
  }
}
function jo(t, e, r) {
  const n = qn() ? ha : Gt;
  if (e.length === 0) {
    r(t.map(n));
    return;
  }
  var a = it, s = (
    /** @type {Effect} */
    Ie
  ), i = zu(), d = xe;
  Promise.all(e.map((c) => /* @__PURE__ */ Mu(c))).then((c) => {
    a?.activate(), i();
    try {
      r([...t.map(n), ...c]);
    } catch (u) {
      s.f & _n || Mn(u, s);
    }
    d && Mt(!1), a?.deactivate(), Wo();
  }).catch((c) => {
    Mn(c, s);
  });
}
function zu() {
  var t = Ie, e = Fe, r = nt, n = it, a = xe;
  if (a)
    var s = Pe;
  return function() {
    Qt(t), Ot(e), Xr(r), n?.activate(), a && (Mt(!0), xt(s));
  };
}
function Wo() {
  Qt(null), Ot(null), Xr(null);
}
// @__NO_SIDE_EFFECTS__
function ha(t) {
  var e = Xt | Kt, r = Fe !== null && Fe.f & Xt ? (
    /** @type {Derived} */
    Fe
  ) : null;
  return Ie === null || r !== null && r.f & lr ? e |= lr : Ie.f |= bn, {
    ctx: nt,
    deps: null,
    effects: null,
    equals: Bo,
    f: e,
    fn: t,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      yt
    ),
    wv: 0,
    parent: r ?? Ie,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Mu(t, e) {
  let r = (
    /** @type {Effect | null} */
    Ie
  );
  r === null && uu();
  var n = (
    /** @type {Boundary} */
    r.b
  ), a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Lr(
    /** @type {V} */
    yt
  ), i = !Fe, d = /* @__PURE__ */ new Map();
  return Hu(() => {
    var c = Mo();
    a = c.promise;
    try {
      Promise.resolve(t()).then(c.resolve, c.reject);
    } catch (g) {
      c.reject(g);
    }
    var u = (
      /** @type {Batch} */
      it
    ), f = n.is_pending();
    i && (n.update_pending_count(1), f || (u.increment(), d.get(u)?.reject(ea), d.set(u, c)));
    const v = (g, h = void 0) => {
      f || u.activate(), h ? h !== ea && (s.f |= on, Dr(s, h)) : (s.f & on && (s.f ^= on), Dr(s, g)), i && (n.update_pending_count(-1), f || u.decrement()), Wo();
    };
    c.promise.then(v, (g) => v(null, g || "unknown"));
  }), Za(() => {
    for (const c of d.values())
      c.reject(ea);
  }), new Promise((c) => {
    function u(f) {
      function v() {
        f === a ? c(s) : u(a);
      }
      f.then(v, v);
    }
    u(a);
  });
}
// @__NO_SIDE_EFFECTS__
function J(t) {
  const e = /* @__PURE__ */ ha(t);
  return ll(e), e;
}
// @__NO_SIDE_EFFECTS__
function Gt(t) {
  const e = /* @__PURE__ */ ha(t);
  return e.equals = Do, e;
}
function Yo(t) {
  var e = t.effects;
  if (e !== null) {
    t.effects = null;
    for (var r = 0; r < e.length; r += 1)
      Lt(
        /** @type {Effect} */
        e[r]
      );
  }
}
function Ou(t) {
  for (var e = t.parent; e !== null; ) {
    if (!(e.f & Xt))
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function ti(t) {
  var e, r = Ie;
  Qt(Ou(t));
  try {
    Yo(t), e = fl(t);
  } finally {
    Qt(r);
  }
  return e;
}
function Go(t) {
  var e = ti(t);
  if (t.equals(e) || (t.v = e, t.wv = ul()), !wn) {
    var r = (Wr || t.f & lr) && t.deps !== null ? zr : Et;
    Nt(t, r);
  }
}
const Gr = /* @__PURE__ */ new Map();
function Lr(t, e) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: t,
    reactions: null,
    equals: Bo,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function Ye(t, e) {
  const r = Lr(t);
  return ll(r), r;
}
// @__NO_SIDE_EFFECTS__
function Tt(t, e = !1, r = !0) {
  const n = Lr(t);
  return e || (n.equals = Do), Un && r && nt !== null && nt.l !== null && (nt.l.s ??= []).push(n), n;
}
function _e(t, e, r = !1) {
  Fe !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!vr || Fe.f & ji) && qn() && Fe.f & (Xt | Zr | Ga | ji) && !Rr?.includes(t) && pu();
  let n = r ? tr(e) : e;
  return Dr(t, n);
}
function Dr(t, e) {
  if (!t.equals(e)) {
    var r = t.v;
    wn ? Gr.set(t, e) : Gr.set(t, r), t.v = e;
    var n = er.ensure();
    n.capture(t, r), t.f & Xt && (t.f & Kt && ti(
      /** @type {Derived} */
      t
    ), Nt(t, t.f & lr ? zr : Et)), t.wv = ul(), Xo(t, Kt), qn() && Ie !== null && Ie.f & Et && !(Ie.f & (Vr | Jr)) && (or === null ? ju([t]) : or.push(t));
  }
  return e;
}
function Yi(t, e = 1) {
  var r = x(t), n = e === 1 ? r++ : r--;
  return _e(t, r), n;
}
function ta(t) {
  _e(t, t.v + 1);
}
function Xo(t, e) {
  var r = t.reactions;
  if (r !== null)
    for (var n = qn(), a = r.length, s = 0; s < a; s++) {
      var i = r[s], d = i.f;
      if (!(!n && i === Ie)) {
        var c = (d & Kt) === 0;
        c && Nt(i, e), d & Xt ? Xo(
          /** @type {Derived} */
          i,
          zr
        ) : c && (d & Zr && nn !== null && nn.push(
          /** @type {Effect} */
          i
        ), vn(
          /** @type {Effect} */
          i
        ));
      }
    }
}
function tr(t) {
  if (typeof t != "object" || t === null || kr in t)
    return t;
  const e = Ks(t);
  if (e !== au && e !== su)
    return t;
  var r = /* @__PURE__ */ new Map(), n = Vn(t), a = /* @__PURE__ */ Ye(0), s = cn, i = (d) => {
    if (cn === s)
      return d();
    var c = Fe, u = cn;
    Ot(null), Zi(s);
    var f = d();
    return Ot(c), Zi(u), f;
  };
  return n && r.set("length", /* @__PURE__ */ Ye(
    /** @type {any[]} */
    t.length
  )), new Proxy(
    /** @type {any} */
    t,
    {
      defineProperty(d, c, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && _u();
        var f = r.get(c);
        return f === void 0 ? f = i(() => {
          var v = /* @__PURE__ */ Ye(u.value);
          return r.set(c, v), v;
        }) : _e(f, u.value, !0), !0;
      },
      deleteProperty(d, c) {
        var u = r.get(c);
        if (u === void 0) {
          if (c in d) {
            const f = i(() => /* @__PURE__ */ Ye(yt));
            r.set(c, f), ta(a);
          }
        } else
          _e(u, yt), ta(a);
        return !0;
      },
      get(d, c, u) {
        if (c === kr)
          return t;
        var f = r.get(c), v = c in d;
        if (f === void 0 && (!v || Br(d, c)?.writable) && (f = i(() => {
          var h = tr(v ? d[c] : yt), m = /* @__PURE__ */ Ye(h);
          return m;
        }), r.set(c, f)), f !== void 0) {
          var g = x(f);
          return g === yt ? void 0 : g;
        }
        return Reflect.get(d, c, u);
      },
      getOwnPropertyDescriptor(d, c) {
        var u = Reflect.getOwnPropertyDescriptor(d, c);
        if (u && "value" in u) {
          var f = r.get(c);
          f && (u.value = x(f));
        } else if (u === void 0) {
          var v = r.get(c), g = v?.v;
          if (v !== void 0 && g !== yt)
            return {
              enumerable: !0,
              configurable: !0,
              value: g,
              writable: !0
            };
        }
        return u;
      },
      has(d, c) {
        if (c === kr)
          return !0;
        var u = r.get(c), f = u !== void 0 && u.v !== yt || Reflect.has(d, c);
        if (u !== void 0 || Ie !== null && (!f || Br(d, c)?.writable)) {
          u === void 0 && (u = i(() => {
            var g = f ? tr(d[c]) : yt, h = /* @__PURE__ */ Ye(g);
            return h;
          }), r.set(c, u));
          var v = x(u);
          if (v === yt)
            return !1;
        }
        return f;
      },
      set(d, c, u, f) {
        var v = r.get(c), g = c in d;
        if (n && c === "length")
          for (var h = u; h < /** @type {Source<number>} */
          v.v; h += 1) {
            var m = r.get(h + "");
            m !== void 0 ? _e(m, yt) : h in d && (m = i(() => /* @__PURE__ */ Ye(yt)), r.set(h + "", m));
          }
        if (v === void 0)
          (!g || Br(d, c)?.writable) && (v = i(() => /* @__PURE__ */ Ye(void 0)), _e(v, tr(u)), r.set(c, v));
        else {
          g = v.v !== yt;
          var _ = i(() => tr(u));
          _e(v, _);
        }
        var w = Reflect.getOwnPropertyDescriptor(d, c);
        if (w?.set && w.set.call(f, u), !g) {
          if (n && typeof c == "string") {
            var p = (
              /** @type {Source<number>} */
              r.get("length")
            ), b = Number(c);
            Number.isInteger(b) && b >= p.v && _e(p, b + 1);
          }
          ta(a);
        }
        return !0;
      },
      ownKeys(d) {
        x(a);
        var c = Reflect.ownKeys(d).filter((v) => {
          var g = r.get(v);
          return g === void 0 || g.v !== yt;
        });
        for (var [u, f] of r)
          f.v !== yt && !(u in d) && c.push(u);
        return c;
      },
      setPrototypeOf() {
        bu();
      }
    }
  );
}
function Gi(t) {
  try {
    if (t !== null && typeof t == "object" && kr in t)
      return t[kr];
  } catch {
  }
  return t;
}
function Nu(t, e) {
  return Object.is(Gi(t), Gi(e));
}
var On, Ko, Qo, Zo;
function Ps() {
  if (On === void 0) {
    On = window, Ko = /Firefox/.test(navigator.userAgent);
    var t = Element.prototype, e = Node.prototype, r = Text.prototype;
    Qo = Br(e, "firstChild").get, Zo = Br(e, "nextSibling").get, Hi(t) && (t.__click = void 0, t.__className = void 0, t.__attributes = null, t.__style = void 0, t.__e = void 0), Hi(r) && (r.__t = void 0);
  }
}
function ar(t = "") {
  return document.createTextNode(t);
}
// @__NO_SIDE_EFFECTS__
function Ht(t) {
  return Qo.call(t);
}
// @__NO_SIDE_EFFECTS__
function wr(t) {
  return Zo.call(t);
}
function L(t, e) {
  if (!xe)
    return /* @__PURE__ */ Ht(t);
  var r = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ Ht(Pe)
  );
  if (r === null)
    r = Pe.appendChild(ar());
  else if (e && r.nodeType !== Xa) {
    var n = ar();
    return r?.before(n), xt(n), n;
  }
  return xt(r), r;
}
function K(t, e = !1) {
  if (!xe) {
    var r = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Ht(
        /** @type {Node} */
        t
      )
    );
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ wr(r) : r;
  }
  if (e && Pe?.nodeType !== Xa) {
    var n = ar();
    return Pe?.before(n), xt(n), n;
  }
  return Pe;
}
function D(t, e = 1, r = !1) {
  let n = xe ? Pe : t;
  for (var a; e--; )
    a = n, n = /** @type {TemplateNode} */
    /* @__PURE__ */ wr(n);
  if (!xe)
    return n;
  if (r && n?.nodeType !== Xa) {
    var s = ar();
    return n === null ? a?.after(s) : n.before(s), xt(s), s;
  }
  return xt(n), /** @type {TemplateNode} */
  n;
}
function ri(t) {
  t.textContent = "";
}
function ni() {
  return !1;
}
function Bu(t, e) {
  if (e) {
    const r = document.body;
    t.autofocus = !0, _r(() => {
      document.activeElement === r && t.focus();
    });
  }
}
function ai(t) {
  xe && /* @__PURE__ */ Ht(t) !== null && ri(t);
}
let Xi = !1;
function Jo() {
  Xi || (Xi = !0, document.addEventListener(
    "reset",
    (t) => {
      Promise.resolve().then(() => {
        if (!t.defaultPrevented)
          for (
            const e of
            /**@type {HTMLFormElement} */
            t.target.elements
          )
            e.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function Hn(t) {
  var e = Fe, r = Ie;
  Ot(null), Qt(null);
  try {
    return t();
  } finally {
    Ot(e), Qt(r);
  }
}
function $o(t, e, r, n = r) {
  t.addEventListener(e, () => Hn(r));
  const a = t.__on_r;
  a ? t.__on_r = () => {
    a(), n(!0);
  } : t.__on_r = () => n(!0), Jo();
}
function el(t) {
  Ie === null && Fe === null && vu(), Fe !== null && Fe.f & lr && Ie === null && fu(), wn && du();
}
function Du(t, e) {
  var r = e.last;
  r === null ? e.last = e.first = t : (r.next = t, t.prev = r, e.last = t);
}
function yr(t, e, r, n = !0) {
  var a = Ie;
  a !== null && a.f & gr && (t |= gr);
  var s = {
    ctx: nt,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: t | Kt,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: a,
    b: a && a.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      Nn(s), s.f |= Ya;
    } catch (c) {
      throw Lt(s), c;
    }
  else e !== null && vn(s);
  if (n) {
    var i = s;
    if (r && i.deps === null && i.teardown === null && i.nodes_start === null && i.first === i.last && // either `null`, or a singular child
    !(i.f & bn) && (i = i.first), i !== null && (i.parent = a, a !== null && Du(i, a), Fe !== null && Fe.f & Xt && !(t & Jr))) {
      var d = (
        /** @type {Derived} */
        Fe
      );
      (d.effects ??= []).push(i);
    }
  }
  return s;
}
function Ru() {
  return Fe !== null && !vr;
}
function Za(t) {
  const e = yr(Wa, null, !1);
  return Nt(e, Et), e.teardown = t, e;
}
function kt(t) {
  el();
  var e = (
    /** @type {Effect} */
    Ie.f
  ), r = !Fe && (e & Vr) !== 0 && (e & Ya) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      nt
    );
    (n.e ??= []).push(t);
  } else
    return tl(t);
}
function tl(t) {
  return yr(Qs | Oo, t, !1);
}
function Uu(t) {
  return el(), yr(Wa | Oo, t, !0);
}
function Vu(t) {
  er.ensure();
  const e = yr(Jr | bn, t, !0);
  return () => {
    Lt(e);
  };
}
function qu(t) {
  er.ensure();
  const e = yr(Jr | bn, t, !0);
  return (r = {}) => new Promise((n) => {
    r.outro ? hr(e, () => {
      Lt(e), n(void 0);
    }) : (Lt(e), n(void 0));
  });
}
function Fn(t) {
  return yr(Qs, t, !1);
}
function Ft(t, e) {
  var r = (
    /** @type {ComponentContextLegacy} */
    nt
  ), n = { effect: null, ran: !1, deps: t };
  r.l.$.push(n), n.effect = en(() => {
    t(), !n.ran && (n.ran = !0, ye(e));
  });
}
function sr() {
  var t = (
    /** @type {ComponentContextLegacy} */
    nt
  );
  en(() => {
    for (var e of t.l.$) {
      e.deps();
      var r = e.effect;
      r.f & Et && Nt(r, zr), ma(r) && Nn(r), e.ran = !1;
    }
  });
}
function Hu(t) {
  return yr(Ga | bn, t, !0);
}
function en(t, e = 0) {
  return yr(Wa | e, t, !0);
}
function j(t, e = [], r = []) {
  jo(e, r, (n) => {
    yr(Wa, () => t(...n.map(x)), !0);
  });
}
function qr(t, e = 0) {
  var r = yr(Zr | e, t, !0);
  return r;
}
function pt(t, e = !0) {
  return yr(Vr | bn, t, !0, e);
}
function rl(t) {
  var e = t.teardown;
  if (e !== null) {
    const r = wn, n = Fe;
    Qi(!0), Ot(null);
    try {
      e.call(null);
    } finally {
      Qi(r), Ot(n);
    }
  }
}
function nl(t, e = !1) {
  var r = t.first;
  for (t.first = t.last = null; r !== null; ) {
    const a = r.ac;
    a !== null && Hn(() => {
      a.abort(ea);
    });
    var n = r.next;
    r.f & Jr ? r.parent = null : Lt(r, e), r = n;
  }
}
function Fu(t) {
  for (var e = t.first; e !== null; ) {
    var r = e.next;
    e.f & Vr || Lt(e), e = r;
  }
}
function Lt(t, e = !0) {
  var r = !1;
  (e || t.f & ou) && t.nodes_start !== null && t.nodes_end !== null && (al(
    t.nodes_start,
    /** @type {TemplateNode} */
    t.nodes_end
  ), r = !0), nl(t, e && !r), Ba(t, 0), Nt(t, _n);
  var n = t.transitions;
  if (n !== null)
    for (const s of n)
      s.stop();
  rl(t);
  var a = t.parent;
  a !== null && a.first !== null && sl(t), t.next = t.prev = t.teardown = t.ctx = t.deps = t.fn = t.nodes_start = t.nodes_end = t.ac = null;
}
function al(t, e) {
  for (; t !== null; ) {
    var r = t === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ wr(t)
    );
    t.remove(), t = r;
  }
}
function sl(t) {
  var e = t.parent, r = t.prev, n = t.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), e !== null && (e.first === t && (e.first = n), e.last === t && (e.last = r));
}
function hr(t, e) {
  var r = [];
  si(t, r, !0), il(r, () => {
    Lt(t), e && e();
  });
}
function il(t, e) {
  var r = t.length;
  if (r > 0) {
    var n = () => --r || e();
    for (var a of t)
      a.out(n);
  } else
    e();
}
function si(t, e, r) {
  if (!(t.f & gr)) {
    if (t.f ^= gr, t.transitions !== null)
      for (const i of t.transitions)
        (i.is_global || r) && e.push(i);
    for (var n = t.first; n !== null; ) {
      var a = n.next, s = (n.f & $r) !== 0 || (n.f & Vr) !== 0;
      si(n, e, s ? r : !1), n = a;
    }
  }
}
function ln(t) {
  ol(t, !0);
}
function ol(t, e) {
  if (t.f & gr) {
    t.f ^= gr, t.f & Et || (Nt(t, Kt), vn(t));
    for (var r = t.first; r !== null; ) {
      var n = r.next, a = (r.f & $r) !== 0 || (r.f & Vr) !== 0;
      ol(r, a ? e : !1), r = n;
    }
    if (t.transitions !== null)
      for (const s of t.transitions)
        (s.is_global || e) && s.in();
  }
}
let Pn = !1;
function Ki(t) {
  Pn = t;
}
let wn = !1;
function Qi(t) {
  wn = t;
}
let Fe = null, vr = !1;
function Ot(t) {
  Fe = t;
}
let Ie = null;
function Qt(t) {
  Ie = t;
}
let Rr = null;
function ll(t) {
  Fe !== null && !Hc && (Rr === null ? Rr = [t] : Rr.push(t));
}
let Vt = null, $t = 0, or = null;
function ju(t) {
  or = t;
}
let cl = 1, aa = 0, cn = aa;
function Zi(t) {
  cn = t;
}
let Wr = !1;
function ul() {
  return ++cl;
}
function ma(t) {
  var e = t.f;
  if (e & Kt)
    return !0;
  if (e & zr) {
    var r = t.deps, n = (e & lr) !== 0;
    if (r !== null) {
      var a, s, i = (e & Na) !== 0, d = n && Ie !== null && !Wr, c = r.length;
      if ((i || d) && (Ie === null || !(Ie.f & _n))) {
        var u = (
          /** @type {Derived} */
          t
        ), f = u.parent;
        for (a = 0; a < c; a++)
          s = r[a], (i || !s?.reactions?.includes(u)) && (s.reactions ??= []).push(u);
        i && (u.f ^= Na), d && f !== null && !(f.f & lr) && (u.f ^= lr);
      }
      for (a = 0; a < c; a++)
        if (s = r[a], ma(
          /** @type {Derived} */
          s
        ) && Go(
          /** @type {Derived} */
          s
        ), s.wv > t.wv)
          return !0;
    }
    (!n || Ie !== null && !Wr) && Nt(t, Et);
  }
  return !1;
}
function dl(t, e, r = !0) {
  var n = t.reactions;
  if (n !== null && !Rr?.includes(t))
    for (var a = 0; a < n.length; a++) {
      var s = n[a];
      s.f & Xt ? dl(
        /** @type {Derived} */
        s,
        e,
        !1
      ) : e === s && (r ? Nt(s, Kt) : s.f & Et && Nt(s, zr), vn(
        /** @type {Effect} */
        s
      ));
    }
}
function fl(t) {
  var e = Vt, r = $t, n = or, a = Fe, s = Wr, i = Rr, d = nt, c = vr, u = cn, f = t.f;
  Vt = /** @type {null | Value[]} */
  null, $t = 0, or = null, Wr = (f & lr) !== 0 && (vr || !Pn || Fe === null), Fe = f & (Vr | Jr) ? null : t, Rr = null, Xr(t.ctx), vr = !1, cn = ++aa, t.ac !== null && (Hn(() => {
    t.ac.abort(ea);
  }), t.ac = null);
  try {
    t.f |= As;
    var v = (
      /** @type {Function} */
      t.fn
    ), g = v(), h = t.deps;
    if (Vt !== null) {
      var m;
      if (Ba(t, $t), h !== null && $t > 0)
        for (h.length = $t + Vt.length, m = 0; m < Vt.length; m++)
          h[$t + m] = Vt[m];
      else
        t.deps = h = Vt;
      if (!Wr || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      f & Xt && /** @type {import('#client').Derived} */
      t.reactions !== null)
        for (m = $t; m < h.length; m++)
          (h[m].reactions ??= []).push(t);
    } else h !== null && $t < h.length && (Ba(t, $t), h.length = $t);
    if (qn() && or !== null && !vr && h !== null && !(t.f & (Xt | zr | Kt)))
      for (m = 0; m < /** @type {Source[]} */
      or.length; m++)
        dl(
          or[m],
          /** @type {Effect} */
          t
        );
    return a !== null && a !== t && (aa++, or !== null && (n === null ? n = or : n.push(.../** @type {Source[]} */
    or))), t.f & on && (t.f ^= on), g;
  } catch (_) {
    return Uo(_);
  } finally {
    t.f ^= As, Vt = e, $t = r, or = n, Fe = a, Wr = s, Rr = i, Xr(d), vr = c, cn = u;
  }
}
function Wu(t, e) {
  let r = e.reactions;
  if (r !== null) {
    var n = nu.call(r, t);
    if (n !== -1) {
      var a = r.length - 1;
      a === 0 ? r = e.reactions = null : (r[n] = r[a], r.pop());
    }
  }
  r === null && e.f & Xt && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Vt === null || !Vt.includes(e)) && (Nt(e, zr), e.f & (lr | Na) || (e.f ^= Na), Yo(
    /** @type {Derived} **/
    e
  ), Ba(
    /** @type {Derived} **/
    e,
    0
  ));
}
function Ba(t, e) {
  var r = t.deps;
  if (r !== null)
    for (var n = e; n < r.length; n++)
      Wu(t, r[n]);
}
function Nn(t) {
  var e = t.f;
  if (!(e & _n)) {
    Nt(t, Et);
    var r = Ie, n = Pn;
    Ie = t, Pn = !0;
    try {
      e & Zr ? Fu(t) : nl(t), rl(t);
      var a = fl(t);
      t.teardown = typeof a == "function" ? a : null, t.wv = cl;
      var s;
      Io && Fc && t.f & Kt && t.deps;
    } finally {
      Pn = n, Ie = r;
    }
  }
}
async function Ja() {
  await Promise.resolve(), o();
}
function x(t) {
  var e = t.f, r = (e & Xt) !== 0;
  if (Fe !== null && !vr) {
    var n = Ie !== null && (Ie.f & _n) !== 0;
    if (!n && !Rr?.includes(t)) {
      var a = Fe.deps;
      if (Fe.f & As)
        t.rv < aa && (t.rv = aa, Vt === null && a !== null && a[$t] === t ? $t++ : Vt === null ? Vt = [t] : (!Wr || !Vt.includes(t)) && Vt.push(t));
      else {
        (Fe.deps ??= []).push(t);
        var s = t.reactions;
        s === null ? t.reactions = [Fe] : s.includes(Fe) || s.push(Fe);
      }
    }
  } else if (r && /** @type {Derived} */
  t.deps === null && /** @type {Derived} */
  t.effects === null) {
    var i = (
      /** @type {Derived} */
      t
    ), d = i.parent;
    d !== null && !(d.f & lr) && (i.f ^= lr);
  }
  if (wn) {
    if (Gr.has(t))
      return Gr.get(t);
    if (r) {
      i = /** @type {Derived} */
      t;
      var c = i.v;
      return (!(i.f & Et) && i.reactions !== null || vl(i)) && (c = ti(i)), Gr.set(i, c), c;
    }
  } else r && (i = /** @type {Derived} */
  t, ma(i) && Go(i));
  if (t.f & on)
    throw t.v;
  return t.v;
}
function vl(t) {
  if (t.v === yt) return !0;
  if (t.deps === null) return !1;
  for (const e of t.deps)
    if (Gr.has(e) || e.f & Xt && vl(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function ye(t) {
  var e = vr;
  try {
    return vr = !0, t();
  } finally {
    vr = e;
  }
}
const Yu = ~(Kt | zr | Et);
function Nt(t, e) {
  t.f = t.f & Yu | e;
}
function Te(t) {
  if (!(typeof t != "object" || !t || t instanceof EventTarget)) {
    if (kr in t)
      Is(t);
    else if (!Array.isArray(t))
      for (let e in t) {
        const r = t[e];
        typeof r == "object" && r && kr in r && Is(r);
      }
  }
}
function Is(t, e = /* @__PURE__ */ new Set()) {
  if (typeof t == "object" && t !== null && // We don't want to traverse DOM elements
  !(t instanceof EventTarget) && !e.has(t)) {
    e.add(t), t instanceof Date && t.getTime();
    for (let n in t)
      try {
        Is(t[n], e);
      } catch {
      }
    const r = Ks(t);
    if (r !== Object.prototype && r !== Array.prototype && r !== Map.prototype && r !== Set.prototype && r !== Date.prototype) {
      const n = zo(r);
      for (let a in n) {
        const s = n[a].get;
        if (s)
          try {
            s.call(t);
          } catch {
          }
      }
    }
  }
}
const gl = /* @__PURE__ */ new Set(), zs = /* @__PURE__ */ new Set();
function ii(t, e, r, n = {}) {
  function a(s) {
    if (n.capture || $n.call(e, s), !s.cancelBubble)
      return Hn(() => r?.call(this, s));
  }
  return t.startsWith("pointer") || t.startsWith("touch") || t === "wheel" ? _r(() => {
    e.addEventListener(t, a, n);
  }) : e.addEventListener(t, a, n), a;
}
function Da(t, e, r, n = {}) {
  var a = ii(e, t, r, n);
  return () => {
    t.removeEventListener(e, a, n);
  };
}
function tt(t, e, r, n, a) {
  var s = { capture: n, passive: a }, i = ii(t, e, r, s);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Za(() => {
    e.removeEventListener(t, i, s);
  });
}
function jt(t) {
  for (var e = 0; e < t.length; e++)
    gl.add(t[e]);
  for (var r of zs)
    r(t);
}
let Ji = null;
function $n(t) {
  var e = this, r = (
    /** @type {Node} */
    e.ownerDocument
  ), n = t.type, a = t.composedPath?.() || [], s = (
    /** @type {null | Element} */
    a[0] || t.target
  );
  Ji = t;
  var i = 0, d = Ji === t && t.__root;
  if (d) {
    var c = a.indexOf(d);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      t.__root = e;
      return;
    }
    var u = a.indexOf(e);
    if (u === -1)
      return;
    c <= u && (i = c);
  }
  if (s = /** @type {Element} */
  a[i] || t.target, s !== e) {
    fn(t, "currentTarget", {
      configurable: !0,
      get() {
        return s || r;
      }
    });
    var f = Fe, v = Ie;
    Ot(null), Qt(null);
    try {
      for (var g, h = []; s !== null; ) {
        var m = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var _ = s["__" + n];
          if (_ != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          t.target === s))
            if (Vn(_)) {
              var [w, ...p] = _;
              w.apply(s, [t, ...p]);
            } else
              _.call(s, t);
        } catch (b) {
          g ? h.push(b) : g = b;
        }
        if (t.cancelBubble || m === e || m === null)
          break;
        s = m;
      }
      if (g) {
        for (let b of h)
          queueMicrotask(() => {
            throw b;
          });
        throw g;
      }
    } finally {
      t.__root = e, delete t.currentTarget, Ot(f), Qt(v);
    }
  }
}
function oi(t) {
  var e = document.createElement("template");
  return e.innerHTML = t.replaceAll("<!>", "<!---->"), e.content;
}
function rr(t, e) {
  var r = (
    /** @type {Effect} */
    Ie
  );
  r.nodes_start === null && (r.nodes_start = t, r.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function R(t, e) {
  var r = (e & Jc) !== 0, n = (e & $c) !== 0, a, s = !t.startsWith("<!>");
  return () => {
    if (xe)
      return rr(Pe, null), Pe;
    a === void 0 && (a = oi(s ? t : "<!>" + t), r || (a = /** @type {Node} */
    /* @__PURE__ */ Ht(a)));
    var i = (
      /** @type {TemplateNode} */
      n || Ko ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (r) {
      var d = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ht(i)
      ), c = (
        /** @type {TemplateNode} */
        i.lastChild
      );
      rr(d, c);
    } else
      rr(i, i);
    return i;
  };
}
// @__NO_SIDE_EFFECTS__
function Gu(t, e, r = "svg") {
  var n = !t.startsWith("<!>"), a = `<${r}>${n ? t : "<!>" + t}</${r}>`, s;
  return () => {
    if (xe)
      return rr(Pe, null), Pe;
    if (!s) {
      var i = (
        /** @type {DocumentFragment} */
        oi(a)
      ), d = (
        /** @type {Element} */
        /* @__PURE__ */ Ht(i)
      );
      s = /** @type {Element} */
      /* @__PURE__ */ Ht(d);
    }
    var c = (
      /** @type {TemplateNode} */
      s.cloneNode(!0)
    );
    return rr(c, c), c;
  };
}
// @__NO_SIDE_EFFECTS__
function jn(t, e) {
  return /* @__PURE__ */ Gu(t, e, "svg");
}
function Ct(t = "") {
  if (!xe) {
    var e = ar(t + "");
    return rr(e, e), e;
  }
  var r = Pe;
  return r.nodeType !== Xa && (r.before(r = ar()), xt(r)), rr(r, r), r;
}
function le() {
  if (xe)
    return rr(Pe, null), Pe;
  var t = document.createDocumentFragment(), e = document.createComment(""), r = ar();
  return t.append(e, r), rr(e, r), t;
}
function k(t, e) {
  if (xe) {
    Ie.nodes_end = Pe, mr();
    return;
  }
  t !== null && t.before(
    /** @type {Node} */
    e
  );
}
function Xu(t) {
  return t.endsWith("capture") && t !== "gotpointercapture" && t !== "lostpointercapture";
}
const Ku = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function Qu(t) {
  return Ku.includes(t);
}
const Zu = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function Ju(t) {
  return t = t.toLowerCase(), Zu[t] ?? t;
}
const $u = ["touchstart", "touchmove"];
function ed(t) {
  return $u.includes(t);
}
const td = (
  /** @type {const} */
  ["textarea", "script", "style", "title"]
);
function rd(t) {
  return td.includes(
    /** @type {typeof RAW_TEXT_ELEMENTS[number]} */
    t
  );
}
let Ra = !0;
function $i(t) {
  Ra = t;
}
function ee(t, e) {
  var r = e == null ? "" : typeof e == "object" ? e + "" : e;
  r !== (t.__t ??= t.nodeValue) && (t.__t = r, t.nodeValue = r + "");
}
function hl(t, e) {
  return ml(t, e);
}
function nd(t, e) {
  Ps(), e.intro = e.intro ?? !1;
  const r = e.target, n = xe, a = Pe;
  try {
    for (var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Ht(r)
    ); s && (s.nodeType !== pn || /** @type {Comment} */
    s.data !== Po); )
      s = /** @type {TemplateNode} */
      /* @__PURE__ */ wr(s);
    if (!s)
      throw dn;
    Mt(!0), xt(
      /** @type {Comment} */
      s
    );
    const i = ml(t, { ...e, anchor: s });
    return Mt(!1), /**  @type {Exports} */
    i;
  } catch (i) {
    if (i instanceof Error && i.message.split(`
`).some((d) => d.startsWith("https://svelte.dev/e/")))
      throw i;
    return i !== dn && console.warn("Failed to hydrate: ", i), e.recover === !1 && hu(), Ps(), ri(r), Mt(!1), hl(t, e);
  } finally {
    Mt(n), xt(a);
  }
}
const kn = /* @__PURE__ */ new Map();
function ml(t, { target: e, anchor: r, props: n = {}, events: a, context: s, intro: i = !0 }) {
  Ps();
  var d = /* @__PURE__ */ new Set(), c = (v) => {
    for (var g = 0; g < v.length; g++) {
      var h = v[g];
      if (!d.has(h)) {
        d.add(h);
        var m = ed(h);
        e.addEventListener(h, $n, { passive: m });
        var _ = kn.get(h);
        _ === void 0 ? (document.addEventListener(h, $n, { passive: m }), kn.set(h, 1)) : kn.set(h, _ + 1);
      }
    }
  };
  c(Xs(gl)), zs.add(c);
  var u = void 0, f = qu(() => {
    var v = r ?? e.appendChild(ar());
    return Lu(
      /** @type {TemplateNode} */
      v,
      {
        pending: () => {
        }
      },
      (g) => {
        if (s) {
          ue({});
          var h = (
            /** @type {ComponentContext} */
            nt
          );
          h.c = s;
        }
        if (a && (n.$$events = a), xe && rr(
          /** @type {TemplateNode} */
          g,
          null
        ), Ra = i, u = t(g, n) || {}, Ra = !0, xe && (Ie.nodes_end = Pe, Pe === null || Pe.nodeType !== pn || /** @type {Comment} */
        Pe.data !== Gs))
          throw va(), dn;
        s && de();
      }
    ), () => {
      for (var g of d) {
        e.removeEventListener(g, $n);
        var h = (
          /** @type {number} */
          kn.get(g)
        );
        --h === 0 ? (document.removeEventListener(g, $n), kn.delete(g)) : kn.set(g, h);
      }
      zs.delete(c), v !== r && v.parentNode?.removeChild(v);
    };
  });
  return Ms.set(u, f), u;
}
let Ms = /* @__PURE__ */ new WeakMap();
function ad(t, e) {
  const r = Ms.get(t);
  return r ? (Ms.delete(t), r(e)) : Promise.resolve();
}
function me(t, e, ...r) {
  var n = t, a = je, s;
  qr(() => {
    a !== (a = e()) && (s && (Lt(s), s = null), s = pt(() => (
      /** @type {SnippetFn} */
      a(n, ...r)
    )));
  }, $r), xe && (n = Pe);
}
function _a(t) {
  nt === null && Ka(), Un && nt.l !== null ? od(nt).m.push(t) : kt(() => {
    const e = ye(t);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function sd(t) {
  nt === null && Ka(), _a(() => () => ye(t));
}
function id(t, e, { bubbles: r = !1, cancelable: n = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: r, cancelable: n });
}
function li() {
  const t = nt;
  return t === null && Ka(), (e, r, n) => {
    const a = (
      /** @type {Record<string, Function | Function[]>} */
      t.s.$$events?.[
        /** @type {string} */
        e
      ]
    );
    if (a) {
      const s = Vn(a) ? a.slice() : [a], i = id(
        /** @type {string} */
        e,
        r,
        n
      );
      for (const d of s)
        d.call(t.x, i);
      return !i.defaultPrevented;
    }
    return !0;
  };
}
function od(t) {
  var e = (
    /** @type {ComponentContextLegacy} */
    t.l
  );
  return e.u ??= { a: [], b: [], m: [] };
}
const _s = 0, Ta = 1, bs = 2;
function _l(t, e, r, n, a) {
  xe && mr();
  var s = t, i = qn(), d = nt, c = yt, u, f, v, g = i ? Lr(
    /** @type {V} */
    void 0
  ) : /* @__PURE__ */ Tt(
    /** @type {V} */
    void 0,
    !1,
    !1
  ), h = i ? Lr(void 0) : /* @__PURE__ */ Tt(void 0, !1, !1), m = !1;
  function _(p, b) {
    m = !0, b && (Qt(w), Ot(w), Xr(d));
    try {
      p === _s && r && (u ? ln(u) : u = pt(() => r(s))), p === Ta && n && (f ? ln(f) : f = pt(() => n(s, g))), p === bs && a && (v ? ln(v) : v = pt(() => a(s, h))), p !== _s && u && hr(u, () => u = null), p !== Ta && f && hr(f, () => f = null), p !== bs && v && hr(v, () => v = null);
    } finally {
      b && (Xr(null), Ot(null), Qt(null), Ln || o());
    }
  }
  var w = qr(() => {
    if (c === (c = e())) return;
    let p = xe && Fi(c) === (s.data === fa);
    if (p && (s = na(), xt(s), Mt(!1), p = !0), Fi(c)) {
      var b = c;
      m = !1, b.then(
        (C) => {
          b === c && (Dr(g, C), _(Ta, !0));
        },
        (C) => {
          if (b === c && (Dr(h, C), _(bs, !0), !a))
            throw h.v;
        }
      ), xe ? r && (u = pt(() => r(s))) : _r(() => {
        m || _(_s, !0);
      });
    } else
      Dr(g, c), _(Ta, !1);
    return p && Mt(!0), () => c = yt;
  });
  xe && (s = Pe);
}
function V(t, e, r = !1) {
  xe && mr();
  var n = t, a = null, s = null, i = yt, d = r ? $r : 0, c = !1;
  const u = (h, m = !0) => {
    c = !0, g(m, h);
  };
  var f = null;
  function v() {
    f !== null && (f.lastChild.remove(), n.before(f), f = null);
    var h = i ? a : s, m = i ? s : a;
    h && ln(h), m && hr(m, () => {
      i ? s = null : a = null;
    });
  }
  const g = (h, m) => {
    if (i === (i = h)) return;
    let _ = !1;
    if (xe) {
      const P = No(n) === fa;
      !!i === P && (n = na(), xt(n), Mt(!1), _ = !0);
    }
    var w = ni(), p = n;
    if (w && (f = document.createDocumentFragment(), f.append(p = ar())), i ? a ??= m && pt(() => m(p)) : s ??= m && pt(() => m(p)), w) {
      var b = (
        /** @type {Batch} */
        it
      ), C = i ? a : s, T = i ? s : a;
      C && b.skipped_effects.delete(C), T && b.skipped_effects.add(T), b.add_callback(v);
    } else
      v();
    _ && Mt(!0);
  };
  qr(() => {
    c = !1, e(u), c || g(null, null);
  }, d), xe && (n = Pe);
}
function $a(t, e) {
  return e;
}
function ld(t, e, r) {
  for (var n = t.items, a = [], s = e.length, i = 0; i < s; i++)
    si(e[i].e, a, !0);
  var d = s > 0 && a.length === 0 && r !== null;
  if (d) {
    var c = (
      /** @type {Element} */
      /** @type {Element} */
      r.parentNode
    );
    ri(c), c.append(
      /** @type {Element} */
      r
    ), n.clear(), xr(t, e[0].prev, e[s - 1].next);
  }
  il(a, () => {
    for (var u = 0; u < s; u++) {
      var f = e[u];
      d || (n.delete(f.k), xr(t, f.prev, f.next)), Lt(f.e, !d);
    }
  });
}
function Pr(t, e, r, n, a, s = null) {
  var i = t, d = { flags: e, items: /* @__PURE__ */ new Map(), first: null }, c = (e & Eo) !== 0;
  if (c) {
    var u = (
      /** @type {Element} */
      t
    );
    i = xe ? xt(
      /** @type {Comment | Text} */
      /* @__PURE__ */ Ht(u)
    ) : u.appendChild(ar());
  }
  xe && mr();
  var f = null, v = !1, g = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ Gt(() => {
    var p = r();
    return Vn(p) ? p : p == null ? [] : Xs(p);
  }), m, _;
  function w() {
    cd(
      _,
      m,
      d,
      g,
      i,
      a,
      e,
      n,
      r
    ), s !== null && (m.length === 0 ? f ? ln(f) : f = pt(() => s(i)) : f !== null && hr(f, () => {
      f = null;
    }));
  }
  qr(() => {
    _ ??= /** @type {Effect} */
    Ie, m = /** @type {V[]} */
    x(h);
    var p = m.length;
    if (v && p === 0)
      return;
    v = p === 0;
    let b = !1;
    if (xe) {
      var C = No(i) === fa;
      C !== (p === 0) && (i = na(), xt(i), Mt(!1), b = !0);
    }
    if (xe) {
      for (var T = null, P, y = 0; y < p; y++) {
        if (Pe.nodeType === pn && /** @type {Comment} */
        Pe.data === Gs) {
          i = /** @type {Comment} */
          Pe, b = !0, Mt(!1);
          break;
        }
        var E = m[y], z = n(E, y);
        P = Os(
          Pe,
          d,
          T,
          null,
          E,
          z,
          y,
          a,
          e,
          r
        ), d.items.set(z, P), T = P;
      }
      p > 0 && xt(na());
    }
    if (xe)
      p === 0 && s && (f = pt(() => s(i)));
    else if (ni()) {
      var B = /* @__PURE__ */ new Set(), F = (
        /** @type {Batch} */
        it
      );
      for (y = 0; y < p; y += 1) {
        E = m[y], z = n(E, y);
        var N = d.items.get(z) ?? g.get(z);
        N ? e & (Fa | ja) && bl(N, E, y, e) : (P = Os(
          null,
          d,
          null,
          null,
          E,
          z,
          y,
          a,
          e,
          r,
          !0
        ), g.set(z, P)), B.add(z);
      }
      for (const [W, O] of d.items)
        B.has(W) || F.skipped_effects.add(O.e);
      F.add_callback(w);
    } else
      w();
    b && Mt(!0), x(h);
  }), xe && (i = Pe);
}
function cd(t, e, r, n, a, s, i, d, c) {
  var u = (i & Wc) !== 0, f = (i & (Fa | ja)) !== 0, v = e.length, g = r.items, h = r.first, m = h, _, w = null, p, b = [], C = [], T, P, y, E;
  if (u)
    for (E = 0; E < v; E += 1)
      T = e[E], P = d(T, E), y = g.get(P), y !== void 0 && (y.a?.measure(), (p ??= /* @__PURE__ */ new Set()).add(y));
  for (E = 0; E < v; E += 1) {
    if (T = e[E], P = d(T, E), y = g.get(P), y === void 0) {
      var z = n.get(P);
      if (z !== void 0) {
        n.delete(P), g.set(P, z);
        var B = w ? w.next : m;
        xr(r, w, z), xr(r, z, B), ps(z, B, a), w = z;
      } else {
        var F = m ? (
          /** @type {TemplateNode} */
          m.e.nodes_start
        ) : a;
        w = Os(
          F,
          r,
          w,
          w === null ? r.first : w.next,
          T,
          P,
          E,
          s,
          i,
          c
        );
      }
      g.set(P, w), b = [], C = [], m = w.next;
      continue;
    }
    if (f && bl(y, T, E, i), y.e.f & gr && (ln(y.e), u && (y.a?.unfix(), (p ??= /* @__PURE__ */ new Set()).delete(y))), y !== m) {
      if (_ !== void 0 && _.has(y)) {
        if (b.length < C.length) {
          var N = C[0], W;
          w = N.prev;
          var O = b[0], M = b[b.length - 1];
          for (W = 0; W < b.length; W += 1)
            ps(b[W], N, a);
          for (W = 0; W < C.length; W += 1)
            _.delete(C[W]);
          xr(r, O.prev, M.next), xr(r, w, O), xr(r, M, N), m = N, w = M, E -= 1, b = [], C = [];
        } else
          _.delete(y), ps(y, m, a), xr(r, y.prev, y.next), xr(r, y, w === null ? r.first : w.next), xr(r, w, y), w = y;
        continue;
      }
      for (b = [], C = []; m !== null && m.k !== P; )
        m.e.f & gr || (_ ??= /* @__PURE__ */ new Set()).add(m), C.push(m), m = m.next;
      if (m === null)
        continue;
      y = m;
    }
    b.push(y), w = y, m = y.next;
  }
  if (m !== null || _ !== void 0) {
    for (var U = _ === void 0 ? [] : Xs(_); m !== null; )
      m.e.f & gr || U.push(m), m = m.next;
    var H = U.length;
    if (H > 0) {
      var S = i & Eo && v === 0 ? a : null;
      if (u) {
        for (E = 0; E < H; E += 1)
          U[E].a?.measure();
        for (E = 0; E < H; E += 1)
          U[E].a?.fix();
      }
      ld(r, U, S);
    }
  }
  u && _r(() => {
    if (p !== void 0)
      for (y of p)
        y.a?.apply();
  }), t.first = r.first && r.first.e, t.last = w && w.e;
  for (var I of n.values())
    Lt(I.e);
  n.clear();
}
function bl(t, e, r, n) {
  n & Fa && Dr(t.v, e), n & ja ? Dr(
    /** @type {Value<number>} */
    t.i,
    r
  ) : t.i = r;
}
function Os(t, e, r, n, a, s, i, d, c, u, f) {
  var v = (c & Fa) !== 0, g = (c & Yc) === 0, h = v ? g ? /* @__PURE__ */ Tt(a, !1, !1) : Lr(a) : a, m = c & ja ? Lr(i) : i, _ = {
    i: m,
    v: h,
    k: s,
    a: null,
    // @ts-expect-error
    e: null,
    prev: r,
    next: n
  };
  try {
    if (t === null) {
      var w = document.createDocumentFragment();
      w.append(t = ar());
    }
    return _.e = pt(() => d(
      /** @type {Node} */
      t,
      h,
      m,
      u
    ), xe), _.e.prev = r && r.e, _.e.next = n && n.e, r === null ? f || (e.first = _) : (r.next = _, r.e.next = _.e), n !== null && (n.prev = _, n.e.prev = _.e), _;
  } finally {
  }
}
function ps(t, e, r) {
  for (var n = t.next ? (
    /** @type {TemplateNode} */
    t.next.e.nodes_start
  ) : r, a = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : r, s = (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ); s !== null && s !== n; ) {
    var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ wr(s)
    );
    a.before(s), s = i;
  }
}
function xr(t, e, r) {
  e === null ? t.first = r : (e.next = r, e.e.next = r && r.e), r !== null && (r.prev = e, r.e.prev = e && e.e);
}
function pl(t, e, r = !1, n = !1, a = !1) {
  var s = t, i = "";
  j(() => {
    var d = (
      /** @type {Effect} */
      Ie
    );
    if (i === (i = e() ?? "")) {
      xe && mr();
      return;
    }
    if (d.nodes_start !== null && (al(
      d.nodes_start,
      /** @type {TemplateNode} */
      d.nodes_end
    ), d.nodes_start = d.nodes_end = null), i !== "") {
      if (xe) {
        Pe.data;
        for (var c = mr(), u = c; c !== null && (c.nodeType !== pn || /** @type {Comment} */
        c.data !== ""); )
          u = c, c = /** @type {TemplateNode} */
          /* @__PURE__ */ wr(c);
        if (c === null)
          throw va(), dn;
        rr(Pe, u), s = xt(c);
        return;
      }
      var f = i + "";
      r ? f = `<svg>${f}</svg>` : n && (f = `<math>${f}</math>`);
      var v = oi(f);
      if ((r || n) && (v = /** @type {Element} */
      /* @__PURE__ */ Ht(v)), rr(
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ht(v),
        /** @type {TemplateNode} */
        v.lastChild
      ), r || n)
        for (; /* @__PURE__ */ Ht(v); )
          s.before(
            /** @type {Node} */
            /* @__PURE__ */ Ht(v)
          );
      else
        s.before(v);
    }
  });
}
function Pt(t, e, r, n, a) {
  xe && mr();
  var s = e.$$slots?.[r], i = !1;
  s === !0 && (s = e[r === "default" ? "children" : r], i = !0), s === void 0 || s(t, i ? () => n : n);
}
function es(t) {
  const e = {};
  t.children && (e.default = !0);
  for (const r in t.$$slots)
    e[r] = !0;
  return e;
}
function rn(t, e, r) {
  xe && mr();
  var n = t, a, s, i = null, d = null;
  function c() {
    s && (hr(s), s = null), i && (i.lastChild.remove(), n.before(i), i = null), s = d, d = null;
  }
  qr(() => {
    if (a !== (a = e())) {
      var u = ni();
      if (a) {
        var f = n;
        u && (i = document.createDocumentFragment(), i.append(f = ar()), s && it.skipped_effects.add(s)), d = pt(() => r(f, a));
      }
      u ? it.add_callback(c) : c();
    }
  }, $r), xe && (n = Pe);
}
function St(t, e, r, n, a, s) {
  let i = xe;
  xe && mr();
  var d, c, u = null;
  xe && Pe.nodeType === cu && (u = /** @type {Element} */
  Pe, mr());
  var f = (
    /** @type {TemplateNode} */
    xe ? Pe : t
  ), v;
  qr(() => {
    const g = e() || null;
    var h = g === "svg" ? tu : null;
    g !== d && (v && (g === null ? hr(v, () => {
      v = null, c = null;
    }) : g === c ? ln(v) : (Lt(v), $i(!1))), g && g !== c && (v = pt(() => {
      if (u = xe ? (
        /** @type {Element} */
        u
      ) : h ? document.createElementNS(h, g) : document.createElement(g), rr(u, u), n) {
        xe && rd(g) && u.append(document.createComment(""));
        var m = (
          /** @type {TemplateNode} */
          xe ? /* @__PURE__ */ Ht(u) : u.appendChild(ar())
        );
        xe && (m === null ? Mt(!1) : xt(m)), n(u, m);
      }
      Ie.nodes_end = u, f.before(u);
    })), d = g, d && (c = d), $i(!0));
  }, $r), i && (Mt(!0), xt(f));
}
function ci(t, e) {
  Fn(() => {
    var r = t.getRootNode(), n = (
      /** @type {ShadowRoot} */
      r.host ? (
        /** @type {ShadowRoot} */
        r
      ) : (
        /** @type {Document} */
        r.head ?? /** @type {Document} */
        r.ownerDocument.head
      )
    );
    if (!n.querySelector("#" + e.hash)) {
      const a = document.createElement("style");
      a.id = e.hash, a.textContent = e.code, n.appendChild(a);
    }
  });
}
function Cr(t, e, r) {
  Fn(() => {
    var n = ye(() => e(t, r?.()) || {});
    if (r && n?.update) {
      var a = !1, s = (
        /** @type {any} */
        {}
      );
      en(() => {
        var i = r();
        Te(i), a && $s(s, i) && (s = i, n.update(i));
      }), a = !0;
    }
    if (n?.destroy)
      return () => (
        /** @type {Function} */
        n.destroy()
      );
  });
}
function ud(t, e) {
  var r = void 0, n;
  qr(() => {
    r !== (r = e()) && (n && (Lt(n), n = null), r && (n = pt(() => {
      Fn(() => (
        /** @type {(node: Element) => void} */
        r(t)
      ));
    })));
  });
}
function wl(t) {
  var e, r, n = "";
  if (typeof t == "string" || typeof t == "number") n += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var a = t.length;
    for (e = 0; e < a; e++) t[e] && (r = wl(t[e])) && (n && (n += " "), n += r);
  } else for (r in t) t[r] && (n && (n += " "), n += r);
  return n;
}
function dd() {
  for (var t, e, r = 0, n = "", a = arguments.length; r < a; r++) (t = arguments[r]) && (e = wl(t)) && (n && (n += " "), n += e);
  return n;
}
function Ae(t) {
  return typeof t == "object" ? dd(t) : t ?? "";
}
const eo = [...` 	
\r\f \v\uFEFF`];
function fd(t, e, r) {
  var n = t == null ? "" : "" + t;
  if (e && (n = n ? n + " " + e : e), r) {
    for (var a in r)
      if (r[a])
        n = n ? n + " " + a : a;
      else if (n.length)
        for (var s = a.length, i = 0; (i = n.indexOf(a, i)) >= 0; ) {
          var d = i + s;
          (i === 0 || eo.includes(n[i - 1])) && (d === n.length || eo.includes(n[d])) ? n = (i === 0 ? "" : n.substring(0, i)) + n.substring(d + 1) : i = d;
        }
  }
  return n === "" ? null : n;
}
function to(t, e = !1) {
  var r = e ? " !important;" : ";", n = "";
  for (var a in t) {
    var s = t[a];
    s != null && s !== "" && (n += " " + a + ": " + s + r);
  }
  return n;
}
function ws(t) {
  return t[0] !== "-" || t[1] !== "-" ? t.toLowerCase() : t;
}
function vd(t, e) {
  if (e) {
    var r = "", n, a;
    if (Array.isArray(e) ? (n = e[0], a = e[1]) : n = e, t) {
      t = String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var s = !1, i = 0, d = !1, c = [];
      n && c.push(...Object.keys(n).map(ws)), a && c.push(...Object.keys(a).map(ws));
      var u = 0, f = -1;
      const _ = t.length;
      for (var v = 0; v < _; v++) {
        var g = t[v];
        if (d ? g === "/" && t[v - 1] === "*" && (d = !1) : s ? s === g && (s = !1) : g === "/" && t[v + 1] === "*" ? d = !0 : g === '"' || g === "'" ? s = g : g === "(" ? i++ : g === ")" && i--, !d && s === !1 && i === 0) {
          if (g === ":" && f === -1)
            f = v;
          else if (g === ";" || v === _ - 1) {
            if (f !== -1) {
              var h = ws(t.substring(u, f).trim());
              if (!c.includes(h)) {
                g !== ";" && v++;
                var m = t.substring(u, v).trim();
                r += " " + m + ";";
              }
            }
            u = v + 1, f = -1;
          }
        }
      }
    }
    return n && (r += to(n)), a && (r += to(a, !0)), r = r.trim(), r === "" ? null : r;
  }
  return t == null ? null : String(t);
}
function we(t, e, r, n, a, s) {
  var i = t.__className;
  if (xe || i !== r || i === void 0) {
    var d = fd(r, n, s);
    (!xe || d !== t.getAttribute("class")) && (d == null ? t.removeAttribute("class") : e ? t.className = d : t.setAttribute("class", d)), t.__className = r;
  } else if (s && a !== s)
    for (var c in s) {
      var u = !!s[c];
      (a == null || u !== !!a[c]) && t.classList.toggle(c, u);
    }
  return s;
}
function ys(t, e = {}, r, n) {
  for (var a in r) {
    var s = r[a];
    e[a] !== s && (r[a] == null ? t.style.removeProperty(a) : t.style.setProperty(a, s, n));
  }
}
function Pa(t, e, r, n) {
  var a = t.__style;
  if (xe || a !== e) {
    var s = vd(e, n);
    (!xe || s !== t.getAttribute("style")) && (s == null ? t.removeAttribute("style") : t.style.cssText = s), t.__style = e;
  } else n && (Array.isArray(n) ? (ys(t, r?.[0], n[0]), ys(t, r?.[1], n[1], "important")) : ys(t, r, n));
  return n;
}
function Ns(t, e, r = !1) {
  if (t.multiple) {
    if (e == null)
      return;
    if (!Vn(e))
      return yu();
    for (var n of t.options)
      n.selected = e.includes(ro(n));
    return;
  }
  for (n of t.options) {
    var a = ro(n);
    if (Nu(a, e)) {
      n.selected = !0;
      return;
    }
  }
  (!r || e !== void 0) && (t.selectedIndex = -1);
}
function gd(t) {
  var e = new MutationObserver(() => {
    Ns(t, t.__value);
  });
  e.observe(t, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Za(() => {
    e.disconnect();
  });
}
function ro(t) {
  return "__value" in t ? t.__value : t.value;
}
const an = Symbol("class"), An = Symbol("style"), yl = Symbol("is custom element"), xl = Symbol("is html");
function ui(t) {
  if (xe) {
    var e = !1, r = () => {
      if (!e) {
        if (e = !0, t.hasAttribute("value")) {
          var n = t.value;
          ae(t, "value", null), t.value = n;
        }
        if (t.hasAttribute("checked")) {
          var a = t.checked;
          ae(t, "checked", null), t.checked = a;
        }
      }
    };
    t.__on_r = r, _r(r), Jo();
  }
}
function hd(t, e) {
  var r = ts(t);
  r.value === (r.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  t.value === e && (e !== 0 || t.nodeName !== "PROGRESS") || (t.value = e ?? "");
}
function md(t, e) {
  var r = ts(t);
  r.checked !== (r.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (t.checked = e);
}
function di(t, e) {
  e ? t.hasAttribute("selected") || t.setAttribute("selected", "") : t.removeAttribute("selected");
}
function ae(t, e, r, n) {
  var a = ts(t);
  xe && (a[e] = t.getAttribute(e), e === "src" || e === "srcset" || e === "href" && t.nodeName === "LINK") || a[e] !== (a[e] = r) && (e === "loading" && (t[lu] = r), r == null ? t.removeAttribute(e) : typeof r != "string" && Tl(t).includes(e) ? t[e] = r : t.setAttribute(e, r));
}
function _d(t, e, r, n, a = !1, s = !1) {
  if (xe && a && t.tagName === "INPUT") {
    var i = (
      /** @type {HTMLInputElement} */
      t
    ), d = i.type === "checkbox" ? "defaultChecked" : "defaultValue";
    d in r || ui(i);
  }
  var c = ts(t), u = c[yl], f = !c[xl];
  let v = xe && u;
  v && Mt(!1);
  var g = e || {}, h = t.tagName === "OPTION";
  for (var m in e)
    m in r || (r[m] = null);
  r.class ? r.class = Ae(r.class) : (n || r[an]) && (r.class = null), r[An] && (r.style ??= null);
  var _ = Tl(t);
  for (const y in r) {
    let E = r[y];
    if (h && y === "value" && E == null) {
      t.value = t.__value = "", g[y] = E;
      continue;
    }
    if (y === "class") {
      var w = t.namespaceURI === "http://www.w3.org/1999/xhtml";
      we(t, w, E, n, e?.[an], r[an]), g[y] = E, g[an] = r[an];
      continue;
    }
    if (y === "style") {
      Pa(t, E, e?.[An], r[An]), g[y] = E, g[An] = r[An];
      continue;
    }
    var p = g[y];
    if (!(E === p && !(E === void 0 && t.hasAttribute(y)))) {
      g[y] = E;
      var b = y[0] + y[1];
      if (b !== "$$")
        if (b === "on") {
          const z = {}, B = "$$" + y;
          let F = y.slice(2);
          var C = Qu(F);
          if (Xu(F) && (F = F.slice(0, -7), z.capture = !0), !C && p) {
            if (E != null) continue;
            t.removeEventListener(F, g[B], z), g[B] = null;
          }
          if (E != null)
            if (C)
              t[`__${F}`] = E, jt([F]);
            else {
              let N = function(W) {
                g[y].call(this, W);
              };
              g[B] = ii(F, t, N, z);
            }
          else C && (t[`__${F}`] = void 0);
        } else if (y === "style")
          ae(t, y, E);
        else if (y === "autofocus")
          Bu(
            /** @type {HTMLElement} */
            t,
            !!E
          );
        else if (!u && (y === "__value" || y === "value" && E != null))
          t.value = t.__value = E;
        else if (y === "selected" && h)
          di(
            /** @type {HTMLOptionElement} */
            t,
            E
          );
        else {
          var T = y;
          f || (T = Ju(T));
          var P = T === "defaultValue" || T === "defaultChecked";
          if (E == null && !u && !P)
            if (c[y] = null, T === "value" || T === "checked") {
              let z = (
                /** @type {HTMLInputElement} */
                t
              );
              const B = e === void 0;
              if (T === "value") {
                let F = z.defaultValue;
                z.removeAttribute(T), z.defaultValue = F, z.value = z.__value = B ? F : null;
              } else {
                let F = z.defaultChecked;
                z.removeAttribute(T), z.defaultChecked = F, z.checked = B ? F : !1;
              }
            } else
              t.removeAttribute(y);
          else P || _.includes(T) && (u || typeof E != "string") ? (t[T] = E, T in c && (c[T] = yt)) : typeof E != "function" && ae(t, T, E);
        }
    }
  }
  return v && Mt(!0), g;
}
function dt(t, e, r = [], n = [], a, s = !1, i = !1) {
  jo(r, n, (d) => {
    var c = void 0, u = {}, f = t.nodeName === "SELECT", v = !1;
    if (qr(() => {
      var h = e(...d.map(x)), m = _d(
        t,
        c,
        h,
        a,
        s,
        i
      );
      v && f && "value" in h && Ns(
        /** @type {HTMLSelectElement} */
        t,
        h.value
      );
      for (let w of Object.getOwnPropertySymbols(u))
        h[w] || Lt(u[w]);
      for (let w of Object.getOwnPropertySymbols(h)) {
        var _ = h[w];
        w.description === ru && (!c || _ !== c[w]) && (u[w] && Lt(u[w]), u[w] = pt(() => ud(t, () => _))), m[w] = _;
      }
      c = m;
    }), f) {
      var g = (
        /** @type {HTMLSelectElement} */
        t
      );
      Fn(() => {
        Ns(
          g,
          /** @type {Record<string | symbol, any>} */
          c.value,
          !0
        ), gd(g);
      });
    }
    v = !0;
  });
}
function ts(t) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    t.__attributes ??= {
      [yl]: t.nodeName.includes("-"),
      [xl]: t.namespaceURI === eu
    }
  );
}
var no = /* @__PURE__ */ new Map();
function Tl(t) {
  var e = t.getAttribute("is") || t.nodeName, r = no.get(e);
  if (r) return r;
  no.set(e, r = []);
  for (var n, a = t, s = Element.prototype; s !== a; ) {
    n = zo(a);
    for (var i in n)
      n[i].set && r.push(i);
    a = Ks(a);
  }
  return r;
}
const bd = () => performance.now(), Nr = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (t) => requestAnimationFrame(t)
  ),
  now: () => bd(),
  tasks: /* @__PURE__ */ new Set()
};
function kl() {
  const t = Nr.now();
  Nr.tasks.forEach((e) => {
    e.c(t) || (Nr.tasks.delete(e), e.f());
  }), Nr.tasks.size !== 0 && Nr.tick(kl);
}
function pd(t) {
  let e;
  return Nr.tasks.size === 0 && Nr.tick(kl), {
    promise: new Promise((r) => {
      Nr.tasks.add(e = { c: t, f: r });
    }),
    abort() {
      Nr.tasks.delete(e);
    }
  };
}
function ka(t, e) {
  Hn(() => {
    t.dispatchEvent(new CustomEvent(e));
  });
}
function wd(t) {
  if (t === "float") return "cssFloat";
  if (t === "offset") return "cssOffset";
  if (t.startsWith("--")) return t;
  const e = t.split("-");
  return e.length === 1 ? e[0] : e[0] + e.slice(1).map(
    /** @param {any} word */
    (r) => r[0].toUpperCase() + r.slice(1)
  ).join("");
}
function ao(t) {
  const e = {}, r = t.split(";");
  for (const n of r) {
    const [a, s] = n.split(":");
    if (!a || s === void 0) break;
    const i = wd(a.trim());
    e[i] = s.trim();
  }
  return e;
}
const yd = (t) => t;
function xd(t, e, r, n) {
  var a = (t & Zc) !== 0, s = "both", i, d = e.inert, c = e.style.overflow, u, f;
  function v() {
    return Hn(() => i ??= r()(e, n?.() ?? /** @type {P} */
    {}, {
      direction: s
    }));
  }
  var g = {
    is_global: a,
    in() {
      e.inert = d, ka(e, "introstart"), u = Bs(e, v(), f, 1, () => {
        ka(e, "introend"), u?.abort(), u = i = void 0, e.style.overflow = c;
      });
    },
    out(w) {
      e.inert = !0, ka(e, "outrostart"), f = Bs(e, v(), u, 0, () => {
        ka(e, "outroend"), w?.();
      });
    },
    stop: () => {
      u?.abort(), f?.abort();
    }
  }, h = (
    /** @type {Effect} */
    Ie
  );
  if ((h.transitions ??= []).push(g), Ra) {
    var m = a;
    if (!m) {
      for (var _ = (
        /** @type {Effect | null} */
        h.parent
      ); _ && _.f & $r; )
        for (; (_ = _.parent) && !(_.f & Zr); )
          ;
      m = !_ || (_.f & Ya) !== 0;
    }
    m && Fn(() => {
      ye(() => g.in());
    });
  }
}
function Bs(t, e, r, n, a) {
  var s = n === 1;
  if (Sn(e)) {
    var i, d = !1;
    return _r(() => {
      if (!d) {
        var w = e({ direction: s ? "in" : "out" });
        i = Bs(t, w, r, n, a);
      }
    }), {
      abort: () => {
        d = !0, i?.abort();
      },
      deactivate: () => i.deactivate(),
      reset: () => i.reset(),
      t: () => i.t()
    };
  }
  if (r?.deactivate(), !e?.duration)
    return a(), {
      abort: je,
      deactivate: je,
      reset: je,
      t: () => n
    };
  const { delay: c = 0, css: u, tick: f, easing: v = yd } = e;
  var g = [];
  if (s && r === void 0 && (f && f(0, 1), u)) {
    var h = ao(u(0, 1));
    g.push(h, h);
  }
  var m = () => 1 - n, _ = t.animate(g, { duration: c, fill: "forwards" });
  return _.onfinish = () => {
    _.cancel();
    var w = r?.t() ?? 1 - n;
    r?.abort();
    var p = n - w, b = (
      /** @type {number} */
      e.duration * Math.abs(p)
    ), C = [];
    if (b > 0) {
      var T = !1;
      if (u)
        for (var P = Math.ceil(b / 16.666666666666668), y = 0; y <= P; y += 1) {
          var E = w + p * v(y / P), z = ao(u(E, 1 - E));
          C.push(z), T ||= z.overflow === "hidden";
        }
      T && (t.style.overflow = "hidden"), m = () => {
        var B = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          _.currentTime
        );
        return w + p * v(B / b);
      }, f && pd(() => {
        if (_.playState !== "running") return !1;
        var B = m();
        return f(B, 1 - B), !0;
      });
    }
    _ = t.animate(C, { duration: b, fill: "forwards" }), _.onfinish = () => {
      m = () => n, f?.(n, 1 - n), a();
    };
  }, {
    abort: () => {
      _ && (_.cancel(), _.effect = null, _.onfinish = je);
    },
    deactivate: () => {
      a = je;
    },
    reset: () => {
      n === 0 && f?.(1, 0);
    },
    t: () => m()
  };
}
function fi(t, e, r = e) {
  var n = /* @__PURE__ */ new WeakSet();
  $o(t, "input", async (a) => {
    var s = a ? t.defaultValue : t.value;
    if (s = xs(t) ? Ts(s) : s, r(s), it !== null && n.add(it), await Ja(), s !== (s = e())) {
      var i = t.selectionStart, d = t.selectionEnd;
      t.value = s ?? "", d !== null && (t.selectionStart = i, t.selectionEnd = Math.min(d, t.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  (xe && t.defaultValue !== t.value || // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  ye(e) == null && t.value) && (r(xs(t) ? Ts(t.value) : t.value), it !== null && n.add(it)), en(() => {
    var a = e();
    if (t === document.activeElement) {
      var s = (
        /** @type {Batch} */
        La ?? it
      );
      if (n.has(s))
        return;
    }
    xs(t) && a === Ts(t.value) || t.type === "date" && !a && !t.value || a !== t.value && (t.value = a ?? "");
  });
}
function Td(t, e, r = e) {
  $o(t, "change", (n) => {
    var a = n ? t.defaultChecked : t.checked;
    r(a);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  (xe && t.defaultChecked !== t.checked || // If defaultChecked is set, then checked == defaultChecked
  ye(e) == null) && r(t.checked), en(() => {
    var n = e();
    t.checked = !!n;
  });
}
function xs(t) {
  var e = t.type;
  return e === "number" || e === "range";
}
function Ts(t) {
  return t === "" ? null : +t;
}
function so(t, e) {
  return t === e || t?.[kr] === e;
}
function Wn(t = {}, e, r, n) {
  return Fn(() => {
    var a, s;
    return en(() => {
      a = s, s = [], ye(() => {
        t !== r(...s) && (e(t, ...s), a && so(r(...a), t) && e(null, ...a));
      });
    }), () => {
      _r(() => {
        s && so(r(...s), t) && e(null, ...s);
      });
    };
  }), t;
}
function Wt(t = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    nt
  ), r = e.l.u;
  if (!r) return;
  let n = () => Te(e.s);
  if (t) {
    let a = 0, s = (
      /** @type {Record<string, any>} */
      {}
    );
    const i = /* @__PURE__ */ ha(() => {
      let d = !1;
      const c = e.s;
      for (const u in c)
        c[u] !== s[u] && (s[u] = c[u], d = !0);
      return d && a++, a;
    });
    n = () => x(i);
  }
  r.b.length && Uu(() => {
    io(e, n), Ss(r.b);
  }), kt(() => {
    const a = ye(() => r.m.map(iu));
    return () => {
      for (const s of a)
        typeof s == "function" && s();
    };
  }), r.a.length && kt(() => {
    io(e, n), Ss(r.a);
  });
}
function io(t, e) {
  if (t.l.s)
    for (const r of t.l.s) x(r);
  e();
}
function qt(t, e) {
  var r = (
    /** @type {Record<string, Function[] | Function>} */
    t.$$events?.[e.type]
  ), n = Vn(r) ? r.slice() : r == null ? [] : [r];
  for (var a of n)
    a.call(this, e);
}
function Cl(t, e, r) {
  if (t == null)
    return e(void 0), je;
  const n = ye(
    () => t.subscribe(
      e,
      // @ts-expect-error
      r
    )
  );
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const Cn = [];
function Ds(t, e = je) {
  let r = null;
  const n = /* @__PURE__ */ new Set();
  function a(d) {
    if ($s(t, d) && (t = d, r)) {
      const c = !Cn.length;
      for (const u of n)
        u[1](), Cn.push(u, t);
      if (c) {
        for (let u = 0; u < Cn.length; u += 2)
          Cn[u][0](Cn[u + 1]);
        Cn.length = 0;
      }
    }
  }
  function s(d) {
    a(d(
      /** @type {T} */
      t
    ));
  }
  function i(d, c = je) {
    const u = [d, c];
    return n.add(u), n.size === 1 && (r = e(a, s) || je), d(
      /** @type {T} */
      t
    ), () => {
      n.delete(u), n.size === 0 && r && (r(), r = null);
    };
  }
  return { set: a, update: s, subscribe: i };
}
function Sl(t) {
  let e;
  return Cl(t, (r) => e = r)(), e;
}
let Ca = !1, Rs = Symbol();
function gn(t, e, r) {
  const n = r[e] ??= {
    store: null,
    source: /* @__PURE__ */ Tt(void 0),
    unsubscribe: je
  };
  if (n.store !== t && !(Rs in r))
    if (n.unsubscribe(), n.store = t ?? null, t == null)
      n.source.v = void 0, n.unsubscribe = je;
    else {
      var a = !0;
      n.unsubscribe = Cl(t, (s) => {
        a ? n.source.v = s : _e(n.source, s);
      }), a = !1;
    }
  return t && Rs in r ? Sl(t) : x(n.source);
}
function kd(t, e) {
  return t.set(e), e;
}
function ba() {
  const t = {};
  function e() {
    Za(() => {
      for (var r in t)
        t[r].unsubscribe();
      fn(t, Rs, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [t, e];
}
function Sa(t, e, r) {
  return t.set(r), e;
}
function Cd(t) {
  var e = Ca;
  try {
    return Ca = !1, [t(), Ca];
  } finally {
    Ca = e;
  }
}
const Sd = {
  get(t, e) {
    if (!t.exclude.includes(e))
      return t.props[e];
  },
  set(t, e) {
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    if (!t.exclude.includes(e) && e in t.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: t.props[e]
      };
  },
  has(t, e) {
    return t.exclude.includes(e) ? !1 : e in t.props;
  },
  ownKeys(t) {
    return Reflect.ownKeys(t.props).filter((e) => !t.exclude.includes(e));
  }
};
// @__NO_SIDE_EFFECTS__
function Bt(t, e, r) {
  return new Proxy(
    { props: t, exclude: e },
    Sd
  );
}
const Ad = {
  get(t, e) {
    if (!t.exclude.includes(e))
      return x(t.version), e in t.special ? t.special[e]() : t.props[e];
  },
  set(t, e, r) {
    if (!(e in t.special)) {
      var n = Ie;
      try {
        Qt(t.parent_effect), t.special[e] = l(
          {
            get [e]() {
              return t.props[e];
            }
          },
          /** @type {string} */
          e,
          Lo
        );
      } finally {
        Qt(n);
      }
    }
    return t.special[e](r), Yi(t.version), !0;
  },
  getOwnPropertyDescriptor(t, e) {
    if (!t.exclude.includes(e) && e in t.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: t.props[e]
      };
  },
  deleteProperty(t, e) {
    return t.exclude.includes(e) || (t.exclude.push(e), Yi(t.version)), !0;
  },
  has(t, e) {
    return t.exclude.includes(e) ? !1 : e in t.props;
  },
  ownKeys(t) {
    return Reflect.ownKeys(t.props).filter((e) => !t.exclude.includes(e));
  }
};
function hn(t, e) {
  return new Proxy(
    {
      props: t,
      exclude: e,
      special: {},
      version: Lr(0),
      // TODO this is only necessary because we need to track component
      // destruction inside `prop`, because of `bind:this`, but it
      // seems likely that we can simplify `bind:this` instead
      parent_effect: (
        /** @type {Effect} */
        Ie
      )
    },
    Ad
  );
}
const Ed = {
  get(t, e) {
    let r = t.props.length;
    for (; r--; ) {
      let n = t.props[r];
      if (Sn(n) && (n = n()), typeof n == "object" && n !== null && e in n) return n[e];
    }
  },
  set(t, e, r) {
    let n = t.props.length;
    for (; n--; ) {
      let a = t.props[n];
      Sn(a) && (a = a());
      const s = Br(a, e);
      if (s && s.set)
        return s.set(r), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(t, e) {
    let r = t.props.length;
    for (; r--; ) {
      let n = t.props[r];
      if (Sn(n) && (n = n()), typeof n == "object" && n !== null && e in n) {
        const a = Br(n, e);
        return a && !a.configurable && (a.configurable = !0), a;
      }
    }
  },
  has(t, e) {
    if (e === kr || e === Js) return !1;
    for (let r of t.props)
      if (Sn(r) && (r = r()), r != null && e in r) return !0;
    return !1;
  },
  ownKeys(t) {
    const e = [];
    for (let r of t.props)
      if (Sn(r) && (r = r()), !!r) {
        for (const n in r)
          e.includes(n) || e.push(n);
        for (const n of Object.getOwnPropertySymbols(r))
          e.includes(n) || e.push(n);
      }
    return e;
  }
};
function un(...t) {
  return new Proxy({ props: t }, Ed);
}
function l(t, e, r, n) {
  var a = !Un || (r & Xc) !== 0, s = (r & Kc) !== 0, i = (r & Qc) !== 0, d = (
    /** @type {V} */
    n
  ), c = !0, u = () => (c && (c = !1, d = i ? ye(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), d), f;
  if (s) {
    var v = kr in t || Js in t;
    f = Br(t, e)?.set ?? (v && e in t ? (C) => t[e] = C : void 0);
  }
  var g, h = !1;
  s ? [g, h] = Cd(() => (
    /** @type {V} */
    t[e]
  )) : g = /** @type {V} */
  t[e], g === void 0 && n !== void 0 && (g = u(), f && (a && mu(), f(g)));
  var m;
  if (a ? m = () => {
    var C = (
      /** @type {V} */
      t[e]
    );
    return C === void 0 ? u() : (c = !0, C);
  } : m = () => {
    var C = (
      /** @type {V} */
      t[e]
    );
    return C !== void 0 && (d = /** @type {V} */
    void 0), C === void 0 ? d : C;
  }, a && !(r & Lo))
    return m;
  if (f) {
    var _ = t.$$legacy;
    return (
      /** @type {() => V} */
      function(C, T) {
        return arguments.length > 0 ? ((!a || !T || _ || h) && f(T ? m() : C), C) : m();
      }
    );
  }
  var w = !1, p = (r & Gc ? ha : Gt)(() => (w = !1, m()));
  s && x(p);
  var b = (
    /** @type {Effect} */
    Ie
  );
  return (
    /** @type {() => V} */
    function(C, T) {
      if (arguments.length > 0) {
        const P = T ? x(p) : a && s ? tr(C) : C;
        return _e(p, P), w = !0, d !== void 0 && (d = P), C;
      }
      return wn && w || b.f & _n ? p.v : x(p);
    }
  );
}
function Ld(t) {
  return new Pd(t);
}
class Pd {
  /** @type {any} */
  #t;
  /** @type {Record<string, any>} */
  #e;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    var r = /* @__PURE__ */ new Map(), n = (s, i) => {
      var d = /* @__PURE__ */ Tt(i, !1, !1);
      return r.set(s, d), d;
    };
    const a = new Proxy(
      { ...e.props || {}, $$events: {} },
      {
        get(s, i) {
          return x(r.get(i) ?? n(i, Reflect.get(s, i)));
        },
        has(s, i) {
          return i === Js ? !0 : (x(r.get(i) ?? n(i, Reflect.get(s, i))), Reflect.has(s, i));
        },
        set(s, i, d) {
          return _e(r.get(i) ?? n(i, d), d), Reflect.set(s, i, d);
        }
      }
    );
    this.#e = (e.hydrate ? nd : hl)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: a,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover
    }), (!e?.props?.$$host || e.sync === !1) && o(), this.#t = a.$$events;
    for (const s of Object.keys(this.#e))
      s === "$set" || s === "$destroy" || s === "$on" || fn(this, s, {
        get() {
          return this.#e[s];
        },
        /** @param {any} value */
        set(i) {
          this.#e[s] = i;
        },
        enumerable: !0
      });
    this.#e.$set = /** @param {Record<string, any>} next */
    (s) => {
      Object.assign(a, s);
    }, this.#e.$destroy = () => {
      ad(this.#e);
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    this.#e.$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, r) {
    this.#t[e] = this.#t[e] || [];
    const n = (...a) => r.call(this, ...a);
    return this.#t[e].push(n), () => {
      this.#t[e] = this.#t[e].filter(
        /** @param {any} fn */
        (a) => a !== n
      );
    };
  }
  $destroy() {
    this.#e.$destroy();
  }
}
let Al;
typeof HTMLElement == "function" && (Al = class extends HTMLElement {
  /** The Svelte component constructor */
  $$ctor;
  /** Slots */
  $$s;
  /** @type {any} The Svelte component instance */
  $$c;
  /** Whether or not the custom element is connected */
  $$cn = !1;
  /** @type {Record<string, any>} Component props data */
  $$d = {};
  /** `true` if currently in the process of reflecting component props back to attributes */
  $$r = !1;
  /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
  $$p_d = {};
  /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
  $$l = {};
  /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
  $$l_u = /* @__PURE__ */ new Map();
  /** @type {any} The managed render effect for reflecting attributes */
  $$me;
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(t, e, r) {
    super(), this.$$ctor = t, this.$$s = e, r && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(t, e, r) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(e), this.$$c) {
      const n = this.$$c.$on(t, e);
      this.$$l_u.set(e, n);
    }
    super.addEventListener(t, e, r);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(t, e, r) {
    if (super.removeEventListener(t, e, r), this.$$c) {
      const n = this.$$l_u.get(e);
      n && (n(), this.$$l_u.delete(e));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let t = function(n) {
        return (a) => {
          const s = document.createElement("slot");
          n !== "default" && (s.name = n), k(a, s);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const e = {}, r = Id(this);
      for (const n of this.$$s)
        n in r && (n === "default" && !this.$$d.children ? (this.$$d.children = t(n), e.default = !0) : e[n] = t(n));
      for (const n of this.attributes) {
        const a = this.$$g_p(n.name);
        a in this.$$d || (this.$$d[a] = Ia(a, n.value, this.$$p_d, "toProp"));
      }
      for (const n in this.$$p_d)
        !(n in this.$$d) && this[n] !== void 0 && (this.$$d[n] = this[n], delete this[n]);
      this.$$c = Ld({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: e,
          $$host: this
        }
      }), this.$$me = Vu(() => {
        en(() => {
          this.$$r = !0;
          for (const n of Oa(this.$$c)) {
            if (!this.$$p_d[n]?.reflect) continue;
            this.$$d[n] = this.$$c[n];
            const a = Ia(
              n,
              this.$$d[n],
              this.$$p_d,
              "toAttribute"
            );
            a == null ? this.removeAttribute(this.$$p_d[n].attribute || n) : this.setAttribute(this.$$p_d[n].attribute || n, a);
          }
          this.$$r = !1;
        });
      });
      for (const n in this.$$l)
        for (const a of this.$$l[n]) {
          const s = this.$$c.$on(n, a);
          this.$$l_u.set(a, s);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(t, e, r) {
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = Ia(t, r, this.$$p_d, "toProp"), this.$$c?.$set({ [t]: this.$$d[t] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(t) {
    return Oa(this.$$p_d).find(
      (e) => this.$$p_d[e].attribute === t || !this.$$p_d[e].attribute && e.toLowerCase() === t
    ) || t;
  }
});
function Ia(t, e, r, n) {
  const a = r[t]?.type;
  if (e = a === "Boolean" && typeof e != "boolean" ? e != null : e, !n || !r[t])
    return e;
  if (n === "toAttribute")
    switch (a) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (a) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function Id(t) {
  const e = {};
  return t.childNodes.forEach((r) => {
    e[
      /** @type {Element} node */
      r.slot || "default"
    ] = !0;
  }), e;
}
function oe(t, e, r, n, a, s) {
  let i = class extends Al {
    constructor() {
      super(t, r, a), this.$$p_d = e;
    }
    static get observedAttributes() {
      return Oa(e).map(
        (d) => (e[d].attribute || d).toLowerCase()
      );
    }
  };
  return Oa(e).forEach((d) => {
    fn(i.prototype, d, {
      get() {
        return this.$$c && d in this.$$c ? this.$$c[d] : this.$$d[d];
      },
      set(c) {
        c = Ia(d, c, e), this.$$d[d] = c;
        var u = this.$$c;
        if (u) {
          var f = Br(u, d)?.get;
          f ? u[d] = c : u.$set({ [d]: c });
        }
      }
    });
  }), n.forEach((d) => {
    fn(i.prototype, d, {
      get() {
        return this.$$c?.[d];
      }
    });
  }), t.element = /** @type {any} */
  i, i;
}
var zd = /* @__PURE__ */ R('<span><!> <span class="v-visible-sr"> </span></span>');
function El(t, e) {
  ue(e, !0);
  const r = l(e, "type", 7), n = l(e, "name", 7), a = l(e, "class", 7, ""), s = l(e, "children", 7), i = (h, m) => {
    let _ = "s-award-bling";
    return h && (_ += " " + h), m && (_ += " s-award-bling__" + m), _;
  }, d = /* @__PURE__ */ J(() => i(a(), r()));
  var c = {
    get type() {
      return r();
    },
    set type(h) {
      r(h), o();
    },
    get name() {
      return n();
    },
    set name(h) {
      n(h), o();
    },
    get class() {
      return a();
    },
    set class(h = "") {
      a(h), o();
    },
    get children() {
      return s();
    },
    set children(h) {
      s(h), o();
    }
  }, u = zd(), f = L(u);
  me(f, () => s() ?? je);
  var v = D(f, 2), g = L(v, !0);
  return A(v), A(u), j(() => {
    we(u, 1, Ae(x(d))), ee(g, n());
  }), k(t, u), de(c);
}
oe(El, { type: {}, name: {}, class: {}, children: {} }, [], [], !0);
function Ke(t, e) {
  ue(e, !0);
  const r = l(e, "src", 7), n = l(e, "title", 7, ""), a = l(e, "native", 7, !1), s = l(e, "class", 7, ""), i = (v, g, h, m) => {
    let _ = v;
    return g && (_ = _.replace("</svg>", "<title>" + g + "</title></svg>"), _ = _.replace(' aria-hidden="true"', "")), h && (_ = _.replace(/class="/, 'class="native ')), m && (_ = _.replace(/class="/, 'class="' + m + " ")), _;
  };
  let d = /* @__PURE__ */ J(() => i(r(), n(), a(), s()));
  var c = {
    get src() {
      return r();
    },
    set src(v) {
      r(v), o();
    },
    get title() {
      return n();
    },
    set title(v = "") {
      n(v), o();
    },
    get native() {
      return a();
    },
    set native(v = !1) {
      a(v), o();
    },
    get class() {
      return s();
    },
    set class(v = "") {
      s(v), o();
    }
  }, u = le(), f = K(u);
  return pl(f, () => x(d)), k(t, u), de(c);
}
oe(Ke, { src: {}, title: {}, native: {}, class: {} }, [], [], !0);
const Ll = '<svg aria-hidden="true" class="svg-icon iconAlert" width="18" height="18"  viewBox="0 0 18 18"><path  d="M7.95 2.71c.58-.94 1.52-.94 2.1 0l7.69 12.58c.58.94.15 1.71-.96 1.71H1.22C.1 17-.32 16.23.26 15.29zM8 6v5h2V6zm0 7v2h2v-2z"/></svg>', Pl = '<svg aria-hidden="true" class="svg-icon iconAlertCircle" width="18" height="18"  viewBox="0 0 18 18"><path  d="M9 17c-4.36 0-8-3.64-8-8s3.64-8 8-8 8 3.64 8 8-3.64 8-8 8M8 4v6h2V4zm0 8v2h2v-2z"/></svg>', Md = '<svg aria-hidden="true" class="svg-icon iconAnswer" width="18" height="18"  viewBox="0 0 18 18"><path  d="M14 15H3c-1.09 0-2-.91-2-2V4c0-1.1.9-2 2-2h12c1.09 0 2 .91 2 2v14zm-1.02-3L9.82 4H8.14l-3.06 8h1.68l.65-1.79h3.15l.69 1.79zm-2.93-3.12H7.9l1.06-2.92z"/></svg>', Od = '<svg aria-hidden="true" class="svg-icon iconArchiveSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M1 3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2zm11 1H2v7c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2zM4.5 6h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"/></svg>', Nd = '<svg aria-hidden="true" class="svg-icon iconArrowUp" width="18" height="18"  viewBox="0 0 18 18"><path  d="M1 12h16L9 4z"/></svg>', Il = '<svg aria-hidden="true" class="svg-icon iconCheckmark" width="18" height="18"  viewBox="0 0 18 18"><path  d="M16 4.41 14.59 3 6 11.59 2.41 8 1 9.41l5 5z"/></svg>', zl = '<svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4z"/></svg>', vi = '<svg aria-hidden="true" class="svg-icon iconClear" width="18" height="18"  viewBox="0 0 18 18"><path  d="M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z"/></svg>', Bd = '<svg aria-hidden="true" class="svg-icon iconClearSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"/></svg>', Dd = '<svg aria-hidden="true" class="svg-icon iconCreditCard" width="18" height="18"  viewBox="0 0 18 18"><path  d="M3 3h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m0 6v4h12V9zm0-3h12V5H3z"/></svg>', Rd = '<svg aria-hidden="true" class="svg-icon iconDocumentAlt" width="18" height="18"  viewBox="0 0 18 18"><path  d="M5 3a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm2 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-2 4.5c0-.28.22-.5.5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m.5 1.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1M5 14.5c0-.28.22-.5.5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/><path  d="M5.9 2h6.35A2.75 2.75 0 0 1 15 4.75v9.35c.62-.6 1-1.43 1-2.35v-7.5C16 2.45 14.54 1 12.75 1h-4.5c-.92 0-1.75.38-2.35 1" opacity=".4"/></svg>', Ud = '<svg aria-hidden="true" class="svg-icon iconEllipsisVertical" width="17" height="18"  viewBox="0 0 17 18"><path  d="M7 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m0 5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M8.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/></svg>', Vd = '<svg aria-hidden="true" class="svg-icon iconEyeSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M7.05 2C2.63 2 0 7.5 0 7.5S2.63 13 7.05 13C11.38 13 14 7.5 14 7.5S11.38 2 7.05 2M7 11.17A3.6 3.6 0 0 1 3.5 7.5 3.6 3.6 0 0 1 7 3.83c1.94 0 3.5 1.65 3.5 3.67A3.57 3.57 0 0 1 7 11.17m0-1.84c.97 0 1.75-.81 1.75-1.83S7.97 5.67 7 5.67s-1.75.81-1.75 1.83S6.03 9.33 7 9.33"/></svg>', Ml = '<svg aria-hidden="true" class="svg-icon iconFire" width="18" height="18"  viewBox="0 0 18 18"><path fill="#FF6700" d="M13.18 9c-.8.33-1.46.6-1.97 1.3A9 9 0 0 0 10 13.89a10 10 0 0 0 1.32-.8 2.5 2.5 0 0 1-.63 2.91h.78a3 3 0 0 0 1.66-.5 4 4 0 0 0 1.26-1.61c.4-.96.47-1.7.55-2.73q.08-1.88-.46-3.68a2 2 0 0 1-.4.91q-.32.4-.9.62" opacity=".6"/><path fill="#EF2E2E" d="M10.4 12.11a7 7 0 0 1 .78-1.76c.3-.47.81-.8 1.37-1.08 0 0-.05-3.27-1.55-5.27S7.63 1.25 6.05 1.39c0 0 4.19 2.94 1.18 5.67-2.14 1.92-3.64 3.81-3.1 5.94a4.1 4.1 0 0 0 3.1 3 4 4 0 0 1 1.08-3.89C9.42 10.92 8 9.79 8 9.79q1.03.04 1.81.72a2 2 0 0 1 .58 1.6"/></svg>', qd = '<svg aria-hidden="true" class="svg-icon iconMessage" width="18" height="18"  viewBox="0 0 18 18"><path  d="M1 4v14l3-3h11c1.09 0 2-.91 2-2V4c0-1.09-.91-2-2-2H3a2 2 0 0 0-2 2m3 9-1 1V4h12v9zm1-6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1m1 2a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"/></svg>', Hd = '<svg aria-hidden="true" class="svg-icon iconNotInterestedSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M13 7A6 6 0 1 1 1 7a6 6 0 0 1 12 0m-2 0q-.01-1.13-.56-2.03l-5.47 5.47Q5.88 11 7 11a4 4 0 0 0 4-4M3.56 9.03l5.47-5.47Q8.12 3 7 3a4 4 0 0 0-3.44 6.03"/></svg>', Fd = '<svg aria-hidden="true" class="svg-icon iconPencilSm" width="14" height="14"  viewBox="0 0 14 14"><path fill="#F1B600" d="m2 10.12 6.37-6.43 1.88 1.88L3.88 12H2z"/><path fill="#E87C87" d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0"/></svg>', sa = '<svg aria-hidden="true" class="svg-icon iconPerson" width="18" height="18"  viewBox="0 0 18 18"><path  d="M15 15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1c0-2.63 4-4 4-4s.23-.4 0-1c-.84-.62-.94-1.59-1-4 .17-2.41 1.87-3 3-3s2.83.59 3 3c-.06 2.41-.16 3.38-1 4-.23.59 0 1 0 1s4 1.37 4 4z"/></svg>', jd = '<svg aria-hidden="true" class="svg-icon iconQuestion" width="18" height="18"  viewBox="0 0 18 18"><path  d="m4 15-3 3V4c0-1.1.9-2 2-2h12c1.09 0 2 .91 2 2v9c0 1.09-.91 2-2 2zm7.75-3.97c.72-.83.98-1.86.98-2.94 0-1.65-.7-3.22-2.3-3.83a4.4 4.4 0 0 0-3.02 0 3.8 3.8 0 0 0-2.32 3.83q0 1.93 1.03 3a3.8 3.8 0 0 0 2.85 1.07q.94 0 1.71-.34.97.66 1.06.7.34.2.7.3l.59-1.13a5 5 0 0 1-1.28-.66m-1.27-.9a5 5 0 0 0-1.5-.8l-.45.9q.5.18.98.5-.3.1-.65.11-.92 0-1.52-.68c-.86-1-.86-3.12 0-4.11.8-.9 2.35-.9 3.15 0 .9 1.01.86 3.03-.01 4.08"/></svg>', Wd = '<svg aria-hidden="true" class="svg-icon iconSearch" width="18" height="18"  viewBox="0 0 18 18"><path  d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0"/></svg>', Yd = '<svg aria-hidden="true" class="svg-icon iconShield" width="18" height="18"  viewBox="0 0 18 18"><path  d="m2 4 7-3 7 3v5.02C16 13.69 10.69 17 9 17s-7-3.31-7-7.98zm6.14 5.2L7 12h4L9.86 9.2a.6.6 0 0 1 .25-.59c.56-.36.89-.95.89-1.61 0-1.09-.94-2-2.02-2A2 2 0 0 0 7 7c0 .66.33 1.25.89 1.61.2.13.3.36.25.59"/></svg>', Gd = '<svg aria-hidden="true" class="svg-icon iconShieldXSm" width="9" height="10"  viewBox="0 0 9 10"><path fill="var(--white)" d="M0 1.84 4.5 0 9 1.84v3.17C9 7.53 6.3 10 4.5 10S0 7.53 0 5.01z"/><path fill="var(--black-400)" d="M1 2.5 4.5 1 8 2.5v2.51C8 7.35 5.35 9 4.5 9S1 7.34 1 5.01zm2.98 3.02L3.2 7h2.6l-.78-1.48a.4.4 0 0 1 .15-.38c.34-.24.73-.7.73-1.14 0-.71-.5-1.23-1.41-1.23-.92 0-1.39.52-1.39 1.23 0 .44.4.9.73 1.14q.19.14.15.38"/></svg>', Xd = '<svg aria-hidden="true" class="svg-icon iconTackSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M5.3 10.3 8 13c1.08-1.08 1.32-3.67.58-5.4l1.6-1.68c1.05.29 2.5-.1 3.34-.93q.3-.29.48-.63L9.65 0Q9.3.2 9 .5a4 4 0 0 0-.93 3.48L6.4 5.65C4.62 4.8 2.53 4.61 1 6l2.7 2.7-2.5 2.6L0 14l2.7-1.2z"/></svg>', Kd = '<svg aria-hidden="true" class="svg-icon iconTrashSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M11 2a1 1 0 0 1 1 1v1H2V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zm0 3H3v6c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2z"/></svg>';
var Qd = /* @__PURE__ */ R('<img class="s-avatar--image" alt="" role="presentation"/>'), Zd = /* @__PURE__ */ R('<span class="s-avatar--letter" aria-hidden="true"> </span>'), Jd = /* @__PURE__ */ R('<!> <span class="v-visible-sr"> </span> <!>', 1);
function Ol(t, e) {
  ue(e, !0);
  const r = l(e, "name", 7), n = l(e, "size", 7, 16), a = l(e, "href", 7), s = l(e, "src", 7), i = l(e, "letter", 7), d = l(e, "badge", 7, !1), c = l(e, "class", 7, ""), u = l(e, "role", 7), f = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "name",
    "size",
    "href",
    "src",
    "letter",
    "badge",
    "class",
    "role"
  ]), v = (w, p) => {
    const b = "s-avatar";
    let C = b;
    return w && (C += ` ${w}`), p !== 16 && (C += ` ${b}__${p}`), C;
  }, g = /* @__PURE__ */ J(() => v(c(), n()));
  var h = {
    get name() {
      return r();
    },
    set name(w) {
      r(w), o();
    },
    get size() {
      return n();
    },
    set size(w = 16) {
      n(w), o();
    },
    get href() {
      return a();
    },
    set href(w) {
      a(w), o();
    },
    get src() {
      return s();
    },
    set src(w) {
      s(w), o();
    },
    get letter() {
      return i();
    },
    set letter(w) {
      i(w), o();
    },
    get badge() {
      return d();
    },
    set badge(w = !1) {
      d(w), o();
    },
    get class() {
      return c();
    },
    set class(w = "") {
      c(w), o();
    },
    get role() {
      return u();
    },
    set role(w) {
      u(w), o();
    }
  }, m = le(), _ = K(m);
  return St(_, () => a() ? "a" : "span", !1, (w, p) => {
    dt(w, () => ({
      class: x(g),
      href: a(),
      role: u() || a() && "link",
      ...f
    }));
    var b = Jd(), C = K(b);
    {
      var T = (F) => {
        var N = Qd();
        j(() => ae(N, "src", s())), k(F, N);
      }, P = (F) => {
        var N = le(), W = K(N);
        {
          var O = (M) => {
            var U = Zd(), H = L(U, !0);
            A(U), j(() => ee(H, i())), k(M, U);
          };
          V(
            W,
            (M) => {
              i() && M(O);
            },
            !0
          );
        }
        k(F, N);
      };
      V(C, (F) => {
        s() ? F(T) : F(P, !1);
      });
    }
    var y = D(C, 2), E = L(y, !0);
    A(y);
    var z = D(y, 2);
    {
      var B = (F) => {
        Ke(F, {
          class: "s-avatar--badge",
          get src() {
            return Gd;
          },
          native: !0
        });
      };
      V(z, (F) => {
        d() && F(B);
      });
    }
    j(() => ee(E, r())), k(p, b);
  }), k(t, m), de(h);
}
oe(
  Ol,
  {
    name: {},
    size: {},
    href: {},
    src: {},
    letter: {},
    badge: {},
    class: {},
    role: {}
  },
  [],
  [],
  !0
);
var $d = /* @__PURE__ */ R('<!> <span class="s-btn--badge"><span class="s-btn--number"><!></span></span>', 1);
function rs(t, e) {
  ue(e, !0);
  const r = l(e, "branding", 7, ""), n = l(e, "size", 7, ""), a = l(e, "variant", 7, ""), s = l(e, "weight", 7, ""), i = l(e, "href", 7, void 0), d = l(e, "disabled", 7, !1), c = l(e, "dropdown", 7, !1), u = l(e, "icon", 7, !1), f = l(e, "link", 7, !1), v = l(e, "loading", 7, !1), g = l(e, "selected", 7, !1), h = l(e, "unset", 7, !1), m = l(e, "class", 7, ""), _ = l(e, "children", 7), w = l(e, "badge", 7), p = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "branding",
    "size",
    "variant",
    "weight",
    "href",
    "disabled",
    "dropdown",
    "icon",
    "link",
    "loading",
    "selected",
    "unset",
    "class",
    "children",
    "badge"
  ]), b = (E, z, B, F, N, W, O, M, U, H, S) => {
    const I = "s-btn";
    let q = I;
    const Q = [z, B, F, N];
    return E && (q += " " + E), Q.forEach((Z) => {
      Z && (q += ` ${I}__${Z}`);
    }), W && (q += ` ${I}__dropdown`), O && (q += ` ${I}__link`), M && (q += ` ${I}__icon`), U && (q += ` ${I}__unset`), H && (q += " is-loading"), S && (q += " is-selected"), q;
  }, C = /* @__PURE__ */ J(() => b(m(), r(), n(), a(), s(), c(), f(), u(), h(), v(), g()));
  var T = {
    get branding() {
      return r();
    },
    set branding(E = "") {
      r(E), o();
    },
    get size() {
      return n();
    },
    set size(E = "") {
      n(E), o();
    },
    get variant() {
      return a();
    },
    set variant(E = "") {
      a(E), o();
    },
    get weight() {
      return s();
    },
    set weight(E = "") {
      s(E), o();
    },
    get href() {
      return i();
    },
    set href(E = void 0) {
      i(E), o();
    },
    get disabled() {
      return d();
    },
    set disabled(E = !1) {
      d(E), o();
    },
    get dropdown() {
      return c();
    },
    set dropdown(E = !1) {
      c(E), o();
    },
    get icon() {
      return u();
    },
    set icon(E = !1) {
      u(E), o();
    },
    get link() {
      return f();
    },
    set link(E = !1) {
      f(E), o();
    },
    get loading() {
      return v();
    },
    set loading(E = !1) {
      v(E), o();
    },
    get selected() {
      return g();
    },
    set selected(E = !1) {
      g(E), o();
    },
    get unset() {
      return h();
    },
    set unset(E = !1) {
      h(E), o();
    },
    get class() {
      return m();
    },
    set class(E = "") {
      m(E), o();
    },
    get children() {
      return _();
    },
    set children(E) {
      _(E), o();
    },
    get badge() {
      return w();
    },
    set badge(E) {
      w(E), o();
    }
  }, P = le(), y = K(P);
  return St(y, () => i() ? "a" : "button", !1, (E, z) => {
    dt(E, () => ({
      href: i(),
      class: x(C),
      disabled: !i() && d() || null,
      "aria-disabled": i() && d() ? "true" : null,
      ...p
    }));
    var B = le(), F = K(B);
    {
      var N = (O) => {
        var M = le(), U = K(M);
        me(U, _), k(O, M);
      }, W = (O) => {
        var M = $d(), U = K(M);
        me(U, _);
        var H = D(U, 2), S = L(H), I = L(S);
        me(I, w), A(S), A(H), k(O, M);
      };
      V(F, (O) => {
        w() ? O(W, !1) : O(N);
      });
    }
    k(z, B);
  }), k(t, P), de(T);
}
oe(
  rs,
  {
    branding: {},
    size: {},
    variant: {},
    weight: {},
    href: {},
    disabled: {},
    dropdown: {},
    icon: {},
    link: {},
    loading: {},
    selected: {},
    unset: {},
    class: {},
    children: {},
    badge: {}
  },
  [],
  [],
  !0
);
var ef = /* @__PURE__ */ R('<div class="d-flex ai-center ps-relative w100"><textarea></textarea> <pre aria-hidden="true"> <br/></pre></div>');
const tf = {
  hash: "svelte-1kve02k",
  code: ".hmn48.svelte-1kve02k {min-height:48px;}textarea.svelte-1kve02k {resize:none;}"
};
function rf(t, e) {
  const r = hn(e, ["children", "$$slots", "$$events", "$$legacy", "$$host"]), n = hn(r, ["id", "variant", "value"]);
  ue(e, !1), ci(t, tf);
  const a = /* @__PURE__ */ Tt();
  let s = l(e, "id", 12), i = l(e, "variant", 12, "default"), d = l(e, "value", 12, "");
  const c = (m) => {
    let _ = "s-textarea ws-pre-wrap break-word hmx3 lh-lg", w = `${_} ps-absolute i0 h100`, p = `${_} v-hidden overflow-hidden`;
    if (m === "chat") {
      let b = " py12 pr64 hmn48";
      w += b, p += b;
    }
    return { textarea: w, grower: p };
  };
  Ft(() => Te(i()), () => {
    _e(a, c(i()));
  }), sr();
  var u = {
    get id() {
      return s();
    },
    set id(m) {
      s(m), o();
    },
    get variant() {
      return i();
    },
    set variant(m) {
      i(m), o();
    },
    get value() {
      return d();
    },
    set value(m) {
      d(m), o();
    }
  }, f = ef(), v = L(f);
  ai(v), dt(
    v,
    () => ({
      class: (x(a), ye(() => x(a).textarea)),
      rows: "1",
      id: s(),
      ...n
    }),
    void 0,
    void 0,
    "svelte-1kve02k"
  );
  var g = D(v, 2), h = L(g, !0);
  return mt(), A(g), A(f), j(() => {
    we(g, 1, Ae((x(a), ye(() => x(a).grower))), "svelte-1kve02k"), ee(h, d());
  }), fi(v, d), tt("input", v, function(m) {
    qt.call(this, e, m);
  }), tt("keydown", v, function(m) {
    qt.call(this, e, m);
  }), k(t, f), de(u);
}
oe(rf, { id: {}, variant: {}, value: {} }, [], [], !0);
function ns(t, e) {
  const r = hn(e, ["children", "$$slots", "$$events", "$$legacy", "$$host"]), n = hn(r, [
    "href",
    "variant",
    "disabled",
    "dropdown",
    "underlined",
    "visited",
    "class"
  ]);
  ue(e, !1);
  const a = /* @__PURE__ */ Tt();
  let s = l(e, "href", 12, void 0), i = l(e, "variant", 12, ""), d = l(e, "disabled", 12, !1), c = l(e, "dropdown", 12, !1), u = l(e, "underlined", 12, !1), f = l(e, "visited", 12, !1), v = l(e, "class", 12, "");
  const g = (w, p, b, C, T) => {
    const P = "s-link";
    let y = P;
    return w && (y += ` ${w}`), p && (y += ` ${P}__${p}`), b && (y += ` ${P}__dropdown`), C && (y += ` ${P}__underlined`), T && (y += ` ${P}__visited`), y;
  };
  Ft(
    () => (Te(v()), Te(i()), Te(c()), Te(u()), Te(f())),
    () => {
      _e(a, g(v(), i(), c(), u(), f()));
    }
  ), sr();
  var h = {
    get href() {
      return s();
    },
    set href(w) {
      s(w), o();
    },
    get variant() {
      return i();
    },
    set variant(w) {
      i(w), o();
    },
    get disabled() {
      return d();
    },
    set disabled(w) {
      d(w), o();
    },
    get dropdown() {
      return c();
    },
    set dropdown(w) {
      c(w), o();
    },
    get underlined() {
      return u();
    },
    set underlined(w) {
      u(w), o();
    },
    get visited() {
      return f();
    },
    set visited(w) {
      f(w), o();
    },
    get class() {
      return v();
    },
    set class(w) {
      v(w), o();
    }
  }, m = le(), _ = K(m);
  return St(_, () => s() ? "a" : "button", !1, (w, p) => {
    dt(w, () => ({
      href: s(),
      class: x(a),
      disabled: !s() && d() || null,
      "aria-disabled": s() && d() ? "true" : null,
      ...n
    })), tt("click", w, function(T) {
      qt.call(this, e, T);
    });
    var b = le(), C = K(b);
    Pt(C, e, "default", {}), k(p, b);
  }), k(t, m), de(h);
}
oe(
  ns,
  {
    href: {},
    variant: {},
    disabled: {},
    dropdown: {},
    underlined: {},
    visited: {},
    class: {}
  },
  ["default"],
  [],
  !0
);
var nf = /* @__PURE__ */ R('<div><div class="v-visible-sr"> </div></div>');
function gi(t, e) {
  ue(e, !1);
  const r = /* @__PURE__ */ Tt();
  let n = l(e, "label", 12, "Loading…"), a = l(e, "size", 12, ""), s = l(e, "class", 12, "");
  const i = (v, g) => {
    let h = "s-spinner";
    return v && (h += " " + v), g && (h += " s-spinner__" + g), h;
  };
  Ft(() => (Te(s()), Te(a())), () => {
    _e(r, i(s(), a()));
  }), sr();
  var d = {
    get label() {
      return n();
    },
    set label(v) {
      n(v), o();
    },
    get size() {
      return a();
    },
    set size(v) {
      a(v), o();
    },
    get class() {
      return s();
    },
    set class(v) {
      s(v), o();
    }
  }, c = nf(), u = L(c), f = L(u, !0);
  return A(u), A(c), j(() => {
    we(c, 1, Ae(x(r))), ee(f, n());
  }), k(t, c), de(d);
}
oe(gi, { label: {}, size: {}, class: {} }, [], [], !0);
var af = /* @__PURE__ */ R('<div><div class="v-visible-sr"> </div></div>');
function sf(t, e) {
  ue(e, !1);
  const r = /* @__PURE__ */ Tt();
  let n = l(e, "label", 12, "Loading…"), a = l(e, "variant", 12, "");
  const s = (f) => {
    const v = "s-skeleton";
    let g = v;
    return f && (g += ` ${v}__${f}`), g;
  };
  Ft(() => Te(a()), () => {
    _e(r, s(a()));
  }), sr();
  var i = {
    get label() {
      return n();
    },
    set label(f) {
      n(f), o();
    },
    get variant() {
      return a();
    },
    set variant(f) {
      a(f), o();
    }
  }, d = af(), c = L(d), u = L(c, !0);
  return A(c), A(d), j(() => {
    we(d, 1, Ae(x(r))), ee(u, n());
  }), k(t, d), de(i);
}
oe(sf, { label: {}, variant: {} }, [], [], !0);
var of = /* @__PURE__ */ R('<span class="s-label--status"> </span>'), lf = /* @__PURE__ */ R('<abbr class="s-required-symbol">*</abbr>'), cf = /* @__PURE__ */ R("<label><!> <!><!></label>");
function hi(t, e) {
  ue(e, !0);
  const r = l(e, "id", 7), n = l(e, "size", 7, ""), a = l(e, "optional", 7, !1), s = l(e, "required", 7, !1), i = l(e, "class", 7, ""), d = l(e, "i18nOptionalText", 7, "Optional"), c = l(e, "i18nRequiredText", 7, "Required"), u = l(e, "children", 7), f = (C, T) => {
    const P = "s-label";
    let y = P;
    return C && (y += " " + C), T && (y += ` ${P}__${T}`), y;
  }, v = /* @__PURE__ */ J(() => f(i(), n()));
  var g = {
    get id() {
      return r();
    },
    set id(C) {
      r(C), o();
    },
    get size() {
      return n();
    },
    set size(C = "") {
      n(C), o();
    },
    get optional() {
      return a();
    },
    set optional(C = !1) {
      a(C), o();
    },
    get required() {
      return s();
    },
    set required(C = !1) {
      s(C), o();
    },
    get class() {
      return i();
    },
    set class(C = "") {
      i(C), o();
    },
    get i18nOptionalText() {
      return d();
    },
    set i18nOptionalText(C = "Optional") {
      d(C), o();
    },
    get i18nRequiredText() {
      return c();
    },
    set i18nRequiredText(C = "Required") {
      c(C), o();
    },
    get children() {
      return u();
    },
    set children(C) {
      u(C), o();
    }
  }, h = cf(), m = L(h);
  me(m, u);
  var _ = D(m, 2);
  {
    var w = (C) => {
      var T = of(), P = L(T, !0);
      A(T), j(() => ee(P, d())), k(C, T);
    };
    V(_, (C) => {
      a() && C(w);
    });
  }
  var p = D(_);
  {
    var b = (C) => {
      var T = lf();
      j(() => ae(T, "title", c())), k(C, T);
    };
    V(p, (C) => {
      s() && C(b);
    });
  }
  return A(h), j(() => {
    we(h, 1, Ae(x(v))), ae(h, "for", r());
  }), k(t, h), de(g);
}
oe(
  hi,
  {
    id: {},
    size: {},
    optional: {},
    required: {},
    class: {},
    i18nOptionalText: {},
    i18nRequiredText: {},
    children: {}
  },
  [],
  [],
  !0
);
var uf = /* @__PURE__ */ R('<p class="s-description mb0 mtn2"><!></p>'), df = /* @__PURE__ */ R("<div><!></div>"), ff = /* @__PURE__ */ R("<div><!></div>"), vf = /* @__PURE__ */ R('<div class="s-input-icon"><!></div>'), gf = /* @__PURE__ */ R('<p class="s-input-message"><!></p>'), hf = /* @__PURE__ */ R('<div><!> <!> <div class="d-flex"><!> <div class="ps-relative w100"><!> <input/> <!></div></div> <!></div>');
function mf(t, e) {
  const r = es(e), n = hn(e, ["children", "$$slots", "$$events", "$$legacy", "$$host"]), a = hn(n, [
    "id",
    "label",
    "disabled",
    "hideLabel",
    "fillSide",
    "name",
    "optional",
    "placeholder",
    "readonly",
    "required",
    "size",
    "state",
    "type",
    "class",
    "i18nOptionalText",
    "i18nRequiredText"
  ]);
  ue(e, !1);
  const s = /* @__PURE__ */ Tt();
  let i = l(e, "id", 12), d = l(e, "label", 12), c = l(e, "disabled", 12, !1), u = l(e, "hideLabel", 12, !1), f = l(e, "fillSide", 12, "prepend"), v = l(e, "name", 12, void 0), g = l(e, "optional", 12, !1), h = l(e, "placeholder", 12, ""), m = l(e, "readonly", 12, !1), _ = l(e, "required", 12, !1), w = l(e, "size", 12, ""), p = l(e, "state", 12, ""), b = l(e, "type", 12, "text"), C = l(e, "class", 12, ""), T = l(e, "i18nOptionalText", 12, void 0), P = l(e, "i18nRequiredText", 12, void 0);
  const y = (X, se) => {
    const Y = "s-input";
    let $ = Y;
    return X && ($ += " " + X), se && ($ += ` ${Y}__${se}`), $;
  };
  Ft(() => (Te(C()), Te(w())), () => {
    _e(s, y(C(), w()));
  }), sr();
  var E = {
    get id() {
      return i();
    },
    set id(X) {
      i(X), o();
    },
    get label() {
      return d();
    },
    set label(X) {
      d(X), o();
    },
    get disabled() {
      return c();
    },
    set disabled(X) {
      c(X), o();
    },
    get hideLabel() {
      return u();
    },
    set hideLabel(X) {
      u(X), o();
    },
    get fillSide() {
      return f();
    },
    set fillSide(X) {
      f(X), o();
    },
    get name() {
      return v();
    },
    set name(X) {
      v(X), o();
    },
    get optional() {
      return g();
    },
    set optional(X) {
      g(X), o();
    },
    get placeholder() {
      return h();
    },
    set placeholder(X) {
      h(X), o();
    },
    get readonly() {
      return m();
    },
    set readonly(X) {
      m(X), o();
    },
    get required() {
      return _();
    },
    set required(X) {
      _(X), o();
    },
    get size() {
      return w();
    },
    set size(X) {
      w(X), o();
    },
    get state() {
      return p();
    },
    set state(X) {
      p(X), o();
    },
    get type() {
      return b();
    },
    set type(X) {
      b(X), o();
    },
    get class() {
      return C();
    },
    set class(X) {
      C(X), o();
    },
    get i18nOptionalText() {
      return T();
    },
    set i18nOptionalText(X) {
      T(X), o();
    },
    get i18nRequiredText() {
      return P();
    },
    set i18nRequiredText(X) {
      P(X), o();
    }
  }, z = hf();
  let B;
  var F = L(z);
  {
    let X = /* @__PURE__ */ Gt(() => u() ? "v-visible-sr" : "");
    hi(F, {
      get id() {
        return i();
      },
      get class() {
        return x(X);
      },
      get size() {
        return w();
      },
      get required() {
        return _();
      },
      get i18nRequiredText() {
        return P();
      },
      get optional() {
        return g();
      },
      get i18nOptionalText() {
        return T();
      },
      children: (se, Y) => {
        mt();
        var $ = Ct();
        j(() => ee($, d())), k(se, $);
      },
      $$slots: { default: !0 }
    });
  }
  var N = D(F, 2);
  {
    var W = (X) => {
      var se = uf(), Y = L(se);
      Pt(Y, e, "description", {}), A(se), j(() => ae(se, "id", `${i()}-description`)), k(X, se);
    };
    V(N, (X) => {
      ye(() => r.description) && X(W);
    });
  }
  var O = D(N, 2), M = L(O);
  {
    var U = (X) => {
      var se = df();
      let Y;
      var $ = L(se);
      Pt($, e, "fill", {}), A(se), j((ie) => Y = we(se, 1, "s-input-fill", null, Y, ie), [
        () => ({
          "order-first": f() === "prepend",
          "order-last": f() === "append"
        })
      ]), k(X, se);
    };
    V(M, (X) => {
      ye(() => r.fill) && X(U);
    });
  }
  var H = D(M, 2), S = L(H);
  {
    var I = (X) => {
      var se = ff();
      let Y;
      var $ = L(se);
      {
        let ie = /* @__PURE__ */ Gt(() => b() === "credit-card" ? Dd : Wd);
        Ke($, {
          get src() {
            return x(ie);
          }
        });
      }
      A(se), j((ie) => Y = we(se, 1, "s-input-icon", null, Y, ie), [
        () => ({
          "s-input-icon__creditcard": b() === "credit-card",
          "s-input-icon__search": b() === "search"
        })
      ]), k(X, se);
    };
    V(S, (X) => {
      (b() === "search" || b() === "credit-card") && X(I);
    });
  }
  var q = D(S, 2);
  dt(
    q,
    (X) => ({
      id: i(),
      "aria-describedby": (Te(i()), ye(() => r.message ? `${i()}-message` : r.description ? `${i()}-description` : void 0)),
      "aria-invalid": p() === "error",
      class: x(s),
      type: b() === "credit-card" ? "text" : b(),
      disabled: c(),
      name: v(),
      placeholder: h(),
      readonly: m(),
      required: _(),
      ...a,
      [an]: X
    }),
    [
      () => ({
        "s-input__creditcard": b() === "credit-card",
        "s-input__search": b() === "search",
        blr0: r.fill && f() === "prepend",
        brr0: r.fill && f() === "append"
      })
    ],
    void 0,
    void 0,
    !0
  );
  var Q = D(q, 2);
  {
    var Z = (X) => {
      var se = vf(), Y = L(se);
      {
        var $ = (he) => {
          Ke(he, {
            get src() {
              return Pl;
            }
          });
        }, ie = (he) => {
          var ke = le(), Me = K(ke);
          {
            var te = (be) => {
              Ke(be, {
                get src() {
                  return Il;
                }
              });
            }, fe = (be) => {
              Ke(be, {
                get src() {
                  return Ll;
                }
              });
            };
            V(
              Me,
              (be) => {
                p() === "success" ? be(te) : be(fe, !1);
              },
              !0
            );
          }
          k(he, ke);
        };
        V(Y, (he) => {
          p() === "error" ? he($) : he(ie, !1);
        });
      }
      A(se), k(X, se);
    };
    V(Q, (X) => {
      p() && X(Z);
    });
  }
  A(H), A(O);
  var ge = D(O, 2);
  {
    var ve = (X) => {
      var se = gf(), Y = L(se);
      Pt(Y, e, "message", {}), A(se), j(() => ae(se, "id", `${i()}-message`)), k(X, se);
    };
    V(ge, (X) => {
      ye(() => r.message) && X(ve);
    });
  }
  return A(z), j((X) => B = we(z, 1, "d-flex fd-column gy4", null, B, X), [
    () => ({
      "has-error": p() === "error",
      "has-success": p() === "success",
      "has-warning": p() === "warning"
    })
  ]), tt("change", q, function(X) {
    qt.call(this, e, X);
  }), tt("input", q, function(X) {
    qt.call(this, e, X);
  }), tt("keydown", q, function(X) {
    qt.call(this, e, X);
  }), tt("keyup", q, function(X) {
    qt.call(this, e, X);
  }), tt("focus", q, function(X) {
    qt.call(this, e, X);
  }), tt("blur", q, function(X) {
    qt.call(this, e, X);
  }), tt("paste", q, function(X) {
    qt.call(this, e, X);
  }), k(t, z), de(E);
}
oe(
  mf,
  {
    id: {},
    label: {},
    disabled: {},
    hideLabel: {},
    fillSide: {},
    name: {},
    optional: {},
    placeholder: {},
    readonly: {},
    required: {},
    size: {},
    state: {},
    type: {},
    class: {},
    i18nOptionalText: {},
    i18nRequiredText: {}
  },
  ["description", "fill", "message"],
  [],
  !0
);
const Nl = (t) => {
  const e = (r) => {
    const n = r.target;
    t.contains(n) || t.dispatchEvent(new CustomEvent("outclick", { detail: n }));
  };
  return document.addEventListener("click", e, !0), {
    destroy() {
      document.removeEventListener("click", e, !0);
    }
  };
}, _f = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "button:not([disabled]):not([aria-hidden])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])'
], bf = (t) => {
  const e = document.defaultView?.getComputedStyle(t);
  return !!(e && e.getPropertyValue("display") !== "none" && e.getPropertyValue("visibility") !== "hidden");
}, oo = async (t) => (await Ja(), [...t.querySelectorAll(_f.join(", "))].filter(bf)), Us = (t) => {
  t[0] && t[0].focus();
}, lo = (t) => {
  t[t.length - 1] && t[t.length - 1].focus();
}, pf = ({ allFocusableItems: t, currentlyFocusedItem: e }) => {
  if (!e) {
    lo(t);
    return;
  }
  const r = t.indexOf(e);
  if (r === 0) {
    lo(t);
    return;
  }
  const n = t[r - 1];
  n && n.focus();
}, wf = ({ allFocusableItems: t, currentlyFocusedItem: e }) => {
  if (!e) {
    Us(t);
    return;
  }
  const r = t.indexOf(e);
  if (t.length - 1 === r) {
    Us(t);
    return;
  }
  const n = t[r + 1];
  n && n.focus();
}, Bl = (t, { active: e, initialFocusElement: r, returnFocusElement: n }) => {
  let a;
  const s = async (c) => {
    const { key: u, shiftKey: f } = c;
    if (u === "Tab") {
      c.preventDefault(), c.stopPropagation();
      const v = await oo(t), g = document.activeElement;
      f ? pf({ allFocusableItems: v, currentlyFocusedItem: g }) : wf({ allFocusableItems: v, currentlyFocusedItem: g });
    }
  }, i = async () => {
    const c = await oo(t);
    a ??= document.activeElement, r ? r.focus() : Us(c), document.addEventListener("keydown", s);
  }, d = () => {
    n ? n.focus() : a?.focus(), document.removeEventListener("keydown", s), a = null;
  };
  return e && i(), {
    update: ({ active: c }) => {
      c ? i() : d();
    },
    destroy: d
  };
};
var yf = /* @__PURE__ */ R('<div class="d-flex g8 s-modal--footer"><!></div>'), xf = /* @__PURE__ */ R('<aside role="dialog"><div role="document"><h1 class="s-modal--header"><!></h1> <div class="s-modal--body"><!></div> <!> <!></div></aside>');
function Tf(t, e) {
  const r = es(e);
  ue(e, !1);
  const n = /* @__PURE__ */ Tt();
  let a = l(e, "id", 12), s = l(e, "visible", 12, !1), i = l(e, "state", 12, ""), d = l(e, "class", 12, ""), c = l(e, "i18nCloseButtonLabel", 12, "Close"), u = l(e, "preventCloseOnClickOutside", 12, !1), f = l(e, "hideCloseButton", 12, !1);
  const v = (N) => {
    let W = "s-modal--dialog";
    return N && (W += " " + N), W;
  }, g = li(), h = () => {
    s() && (s(!1), g("close"));
  }, m = (N) => {
    N.key === "Escape" && h();
  };
  Ft(() => Te(d()), () => {
    _e(n, v(d()));
  }), sr();
  var _ = {
    get id() {
      return a();
    },
    set id(N) {
      a(N), o();
    },
    get visible() {
      return s();
    },
    set visible(N) {
      s(N), o();
    },
    get state() {
      return i();
    },
    set state(N) {
      i(N), o();
    },
    get class() {
      return d();
    },
    set class(N) {
      d(N), o();
    },
    get i18nCloseButtonLabel() {
      return c();
    },
    set i18nCloseButtonLabel(N) {
      c(N), o();
    },
    get preventCloseOnClickOutside() {
      return u();
    },
    set preventCloseOnClickOutside(N) {
      u(N), o();
    },
    get hideCloseButton() {
      return f();
    },
    set hideCloseButton(N) {
      f(N), o();
    }
  };
  Wt();
  var w = xf();
  tt("keydown", On, m);
  let p;
  var b = L(w), C = L(b), T = L(C);
  Pt(T, e, "header", {}), A(C);
  var P = D(C, 2), y = L(P);
  Pt(y, e, "body", {}), A(P);
  var E = D(P, 2);
  {
    var z = (N) => {
      var W = yf(), O = L(W);
      Pt(O, e, "footer", {}), A(W), k(N, W);
    };
    V(E, (N) => {
      ye(() => r.footer) && N(z);
    });
  }
  var B = D(E, 2);
  {
    var F = (N) => {
      rs(N, {
        variant: "muted",
        icon: !0,
        get "aria-label"() {
          return c();
        },
        class: "s-modal--close",
        onclick: h,
        children: (W, O) => {
          Ke(W, {
            get src() {
              return vi;
            },
            class: "modal-close"
          });
        },
        $$slots: { default: !0 }
      });
    };
    V(B, (N) => {
      f() || N(F);
    });
  }
  return A(b), Cr(b, (N) => Nl?.(N)), Cr(b, (N, W) => Bl?.(N, W), () => ({ active: s() })), A(w), j(
    (N) => {
      p = we(w, 1, "s-modal", null, p, N), ae(w, "aria-hidden", !s()), ae(w, "aria-labelledby", `${a()}-title`), ae(w, "aria-describedby", `${a()}-description`), we(b, 1, Ae(x(n))), ae(C, "id", `${a()}-title`), ae(P, "id", `${a()}-description`);
    },
    [
      () => ({
        "s-modal__danger": i() === "danger",
        "s-modal__celebration": i() === "celebration"
      })
    ]
  ), tt("outclick", b, () => !u() && h()), k(t, w), de(_);
}
oe(
  Tf,
  {
    id: {},
    visible: {},
    state: {},
    class: {},
    i18nCloseButtonLabel: {},
    preventCloseOnClickOutside: {},
    hideCloseButton: {}
  },
  ["header", "body", "footer"],
  [],
  !0
);
var kf = /* @__PURE__ */ R('<div class="d-flex"><!></div>'), Cf = /* @__PURE__ */ R('<div><!> <p class="m0 fl-grow1"><!></p> <!></div>');
function Sf(t, e) {
  ue(e, !0);
  const r = l(e, "variant", 7, void 0), n = l(e, "important", 7, !1), a = l(e, "role", 7, "status"), s = l(e, "icon", 7, void 0), i = l(e, "iconTitle", 7, void 0), d = l(e, "class", 7, ""), c = l(e, "children", 7), u = l(e, "actions", 7), f = (T, P, y) => {
    const E = "s-notice";
    let z = E;
    return T && (z += ` ${T}`), P && (z += ` ${E}__${P}`), y && (z += ` ${E}__important`), (s() || u()) && (z += " d-flex ai-center gx8"), u() && (z += "  p8 pl16"), z;
  }, v = /* @__PURE__ */ J(() => f(d(), r(), n()));
  var g = {
    get variant() {
      return r();
    },
    set variant(T = void 0) {
      r(T), o();
    },
    get important() {
      return n();
    },
    set important(T = !1) {
      n(T), o();
    },
    get role() {
      return a();
    },
    set role(T = "status") {
      a(T), o();
    },
    get icon() {
      return s();
    },
    set icon(T = void 0) {
      s(T), o();
    },
    get iconTitle() {
      return i();
    },
    set iconTitle(T = void 0) {
      i(T), o();
    },
    get class() {
      return d();
    },
    set class(T = "") {
      d(T), o();
    },
    get children() {
      return c();
    },
    set children(T) {
      c(T), o();
    },
    get actions() {
      return u();
    },
    set actions(T) {
      u(T), o();
    }
  }, h = Cf(), m = L(h);
  {
    var _ = (T) => {
      Ke(T, {
        get src() {
          return s();
        },
        get title() {
          return i();
        }
      });
    };
    V(m, (T) => {
      s() && T(_);
    });
  }
  var w = D(m, 2), p = L(w);
  me(p, c), A(w);
  var b = D(w, 2);
  {
    var C = (T) => {
      var P = kf(), y = L(P);
      me(y, u), A(P), k(T, P);
    };
    V(b, (T) => {
      u() && T(C);
    });
  }
  return A(h), j(() => {
    we(h, 1, Ae(x(v))), ae(h, "role", a());
  }), k(t, h), de(g);
}
oe(
  Sf,
  {
    variant: {},
    important: {},
    role: {},
    icon: {},
    iconTitle: {},
    class: {},
    children: {},
    actions: {}
  },
  [],
  [],
  !0
);
function Af(t, e) {
  ue(e, !0);
  const r = l(e, "children", 7), n = l(e, "type", 7), a = l(e, "i18nCloseButtonLabel", 7, "Close"), s = l(e, "class", 7, ""), i = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "children",
    "type",
    "i18nCloseButtonLabel",
    "class"
  ]);
  var d = {
    get children() {
      return r();
    },
    set children(c) {
      r(c), o();
    },
    get type() {
      return n();
    },
    set type(c) {
      n(c), o();
    },
    get i18nCloseButtonLabel() {
      return a();
    },
    set i18nCloseButtonLabel(c = "Close") {
      a(c), o();
    },
    get class() {
      return s();
    },
    set class(c = "") {
      s(c), o();
    }
  };
  {
    let c = /* @__PURE__ */ J(() => "s-notice--btn " + s());
    rs(t, un(
      {
        get class() {
          return x(c);
        }
      },
      () => i,
      {
        children: (u, f) => {
          var v = le(), g = K(v);
          {
            var h = (_) => {
              Ke(_, {
                get src() {
                  return vi;
                },
                get title() {
                  return a();
                }
              });
            }, m = (_) => {
              var w = le(), p = K(w);
              {
                var b = (C) => {
                  var T = le(), P = K(T);
                  me(P, r), k(C, T);
                };
                V(
                  p,
                  (C) => {
                    r() && C(b);
                  },
                  !0
                );
              }
              k(_, w);
            };
            V(g, (_) => {
              n() === "close" ? _(h) : _(m, !1);
            });
          }
          k(u, v);
        },
        $$slots: { default: !0 }
      }
    ));
  }
  return de(d);
}
oe(Af, { children: {}, type: {}, i18nCloseButtonLabel: {}, class: {} }, [], [], !0);
const Ef = Array(12).fill(0);
var Lf = /* @__PURE__ */ R('<div class="sonner-loading-bar"></div>'), Pf = /* @__PURE__ */ R('<div><div class="sonner-spinner"></div></div>');
function Dl(t, e) {
  ue(e, !0);
  let r = l(e, "visible", 7), n = l(e, "class", 7);
  var a = {
    get visible() {
      return r();
    },
    set visible(d) {
      r(d), o();
    },
    get class() {
      return n();
    },
    set class(d) {
      n(d), o();
    }
  }, s = Pf(), i = L(s);
  return Pr(i, 23, () => Ef, (d, c) => `spinner-bar-${c}`, (d, c) => {
    var u = Lf();
    k(d, u);
  }), A(i), A(s), j(
    (d) => {
      we(s, 1, d), ae(s, "data-visible", r());
    },
    [
      () => Ae(["sonner-loading-wrapper", n()].filter(Boolean).join(" "))
    ]
  ), k(t, s), de(a);
}
oe(Dl, { visible: {}, class: {} }, [], [], !0);
function Or(...t) {
  return t.filter(Boolean).join(" ");
}
const If = typeof document < "u", zf = typeof window < "u" ? window : void 0;
function Mf(t) {
  let e = t.activeElement;
  for (; e?.shadowRoot; ) {
    const r = e.shadowRoot.activeElement;
    if (r === e)
      break;
    e = r;
  }
  return e;
}
class Of {
  #t;
  #e;
  constructor(e = {}) {
    const { window: r = zf, document: n = r?.document } = e;
    r !== void 0 && (this.#t = n, this.#e = Fo((a) => {
      const s = Da(r, "focusin", a), i = Da(r, "focusout", a);
      return () => {
        s(), i();
      };
    }));
  }
  get current() {
    return this.#e?.(), this.#t ? Mf(this.#t) : null;
  }
}
new Of();
class Nf {
  #t;
  #e;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(e) {
    this.#t = e, this.#e = Symbol(e);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#e;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return Tu(this.#e);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const e = zn(this.#e);
    if (e === void 0)
      throw new Error(`Context "${this.#t}" not found`);
    return e;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(e) {
    const r = zn(this.#e);
    return r === void 0 ? e : r;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(e) {
    return ga(this.#e, e);
  }
}
const Bf = new Nf("<Toaster/>");
let co = 0;
class Df {
  #t = /* @__PURE__ */ Ye(tr([]));
  get toasts() {
    return x(this.#t);
  }
  set toasts(e) {
    _e(this.#t, e, !0);
  }
  #e = /* @__PURE__ */ Ye(tr([]));
  get heights() {
    return x(this.#e);
  }
  set heights(e) {
    _e(this.#e, e, !0);
  }
  #a = (e) => {
    const r = this.toasts.findIndex((n) => n.id === e);
    return r === -1 ? null : r;
  };
  addToast = (e) => {
    If && this.toasts.unshift(e);
  };
  updateToast = ({ id: e, data: r, type: n, message: a }) => {
    const s = this.toasts.findIndex((d) => d.id === e), i = this.toasts[s];
    this.toasts[s] = {
      ...i,
      ...r,
      id: e,
      title: a,
      type: n,
      updated: !0
    };
  };
  create = (e) => {
    const { message: r, ...n } = e, a = typeof e?.id == "number" || e.id && e.id?.length > 0 ? e.id : co++, s = e.dismissable === void 0 ? !0 : e.dismissable, i = e.type === void 0 ? "default" : e.type;
    return ye(() => {
      this.toasts.find((c) => c.id === a) ? this.updateToast({ id: a, data: e, type: i, message: r, dismissable: s }) : this.addToast({ ...n, id: a, title: r, dismissable: s, type: i });
    }), a;
  };
  dismiss = (e) => (ye(() => {
    if (e === void 0) {
      this.toasts = this.toasts.map((n) => ({ ...n, dismiss: !0 }));
      return;
    }
    const r = this.toasts.findIndex((n) => n.id === e);
    this.toasts[r] && (this.toasts[r] = { ...this.toasts[r], dismiss: !0 });
  }), e);
  remove = (e) => {
    if (e === void 0) {
      this.toasts = [];
      return;
    }
    const r = this.#a(e);
    if (r !== null)
      return this.toasts.splice(r, 1), e;
  };
  message = (e, r) => this.create({ ...r, type: "default", message: e });
  error = (e, r) => this.create({ ...r, type: "error", message: e });
  success = (e, r) => this.create({ ...r, type: "success", message: e });
  info = (e, r) => this.create({ ...r, type: "info", message: e });
  warning = (e, r) => this.create({ ...r, type: "warning", message: e });
  loading = (e, r) => this.create({ ...r, type: "loading", message: e });
  promise = (e, r) => {
    if (!r)
      return;
    let n;
    r.loading !== void 0 && (n = this.create({
      ...r,
      promise: e,
      type: "loading",
      message: typeof r.loading == "string" ? r.loading : r.loading()
    }));
    const a = e instanceof Promise ? e : e();
    let s = n !== void 0;
    return a.then((i) => {
      if (typeof i == "object" && i && "ok" in i && typeof i.ok == "boolean" && !i.ok) {
        s = !1;
        const d = Rf(i);
        this.create({ id: n, type: "error", message: d });
      } else if (r.success !== void 0) {
        s = !1;
        const d = typeof r.success == "function" ? r.success(i) : r.success;
        this.create({ id: n, type: "success", message: d });
      }
    }).catch((i) => {
      if (r.error !== void 0) {
        s = !1;
        const d = typeof r.error == "function" ? r.error(i) : r.error;
        this.create({ id: n, type: "error", message: d });
      }
    }).finally(() => {
      s && (this.dismiss(n), n = void 0), r.finally?.();
    }), n;
  };
  custom = (e, r) => {
    const n = r?.id || co++;
    return this.create({ component: e, id: n, ...r }), n;
  };
  removeHeight = (e) => {
    this.heights = this.heights.filter((r) => r.toastId !== e);
  };
  setHeight = (e) => {
    const r = this.#a(e.toastId);
    if (r === null) {
      this.heights.push(e);
      return;
    }
    this.heights[r] = e;
  };
  reset = () => {
    this.toasts = [], this.heights = [];
  };
}
function Rf(t) {
  return t && typeof t == "object" && "status" in t ? `HTTP error! Status: ${t.status}` : `Error! ${t}`;
}
const rt = new Df();
function Uf(t, e) {
  return rt.create({ message: t, ...e });
}
class Vf {
  /**
   * A derived state of the toasts that are not dismissed.
   */
  #t = /* @__PURE__ */ J(() => rt.toasts.filter((e) => !e.dismiss));
  get toasts() {
    return x(this.#t);
  }
}
const qf = Uf;
Object.assign(qf, {
  success: rt.success,
  info: rt.info,
  warning: rt.warning,
  error: rt.error,
  custom: rt.custom,
  message: rt.message,
  promise: rt.promise,
  dismiss: rt.dismiss,
  loading: rt.loading,
  getActiveToasts: () => rt.toasts.filter((t) => !t.dismiss)
});
function Ua(t) {
  return t.label !== void 0;
}
function Hf() {
  let t = /* @__PURE__ */ Ye(tr(typeof document < "u" ? document.hidden : !1));
  return kt(() => Da(document, "visibilitychange", () => {
    _e(t, document.hidden, !0);
  })), {
    get current() {
      return x(t);
    }
  };
}
const uo = 4e3, Ff = 14, jf = 45, Wf = 200, Yf = 0.05, Gf = {
  toast: "",
  title: "",
  description: "",
  loader: "",
  closeButton: "",
  cancelButton: "",
  actionButton: "",
  action: "",
  warning: "",
  error: "",
  success: "",
  default: "",
  info: "",
  loading: ""
};
function Xf(t) {
  const [e, r] = t.split("-"), n = [];
  return e && n.push(e), r && n.push(r), n;
}
function fo(t) {
  return 1 / (1.5 + Math.abs(t) / 20);
}
var Kf = /* @__PURE__ */ R("<div><!></div>"), Qf = (
  // height index is used to calculate the offset as it gets updated before the toast array, which means we can calculate the new layout faster.
  // use scaledRectHeight as it's more precise
  // toast was transitioning its scale, so scaledRectHeight isn't accurate
  // save the offset for the exit swipe animation
  // let the toast know it has started
  // get the elapsed time since the timer started
  // if the toast has been updated after the initial render,
  // we want to reset the timer and set the remaining time to the
  // new duration
  // ensure we maintain correct pointer capture even when going outside of the toast (e.g. when swiping)
  // remove only if threshold is met
  // Determine swipe direction if not already locked
  // handle vertical swipes
  // smoothly transition to dampened movement
  // ensure we don't jump when transition to dampened movement
  // handle horizontal swipes
  // Smoothly transition to dampened movement
  // Ensure we don't jump when transitioning to dampened movement
  (t, e, r, n, a) => {
    x(e) || !x(r) || (n(), a().onDismiss?.(a()));
  }
), Zf = /* @__PURE__ */ R('<button data-close-button=""><!></button>'), Jf = /* @__PURE__ */ R('<div data-icon=""><!> <!></div>'), $f = /* @__PURE__ */ R('<div data-description=""><!></div>'), ev = (t, e, r, n) => {
  Ua(e().cancel) && x(r) && (e().cancel?.onClick?.(t), n());
}, tv = /* @__PURE__ */ R('<button data-button="" data-cancel=""> </button>'), rv = (t, e, r) => {
  Ua(e().action) && (e().action?.onClick(t), !t.defaultPrevented && r());
}, nv = /* @__PURE__ */ R('<button data-button=""> </button>'), av = /* @__PURE__ */ R('<!> <div data-content=""><div data-title=""><!></div> <!></div> <!> <!>', 1), sv = /* @__PURE__ */ R('<li data-sonner-toast=""><!> <!></li>');
function Rl(t, e) {
  ue(e, !0);
  const r = (ce) => {
    var De = le(), He = K(De);
    {
      var et = (Re) => {
        var Qe = Kf(), It = L(Qe);
        me(It, b), A(Qe), j(
          (zt) => {
            we(Qe, 1, zt), ae(Qe, "data-visible", x(Y) === "loading");
          },
          [
            () => Ae(Or(x(Ze)?.loader, n()?.classes?.loader, "sonner-loader"))
          ]
        ), k(Re, Qe);
      }, st = (Re) => {
        {
          let Qe = /* @__PURE__ */ J(() => Or(x(Ze)?.loader, n().classes?.loader)), It = /* @__PURE__ */ J(() => x(Y) === "loading");
          Dl(Re, {
            get class() {
              return x(Qe);
            },
            get visible() {
              return x(It);
            }
          });
        }
      };
      V(He, (Re) => {
        b() ? Re(et) : Re(st, !1);
      });
    }
    k(ce, De);
  };
  let n = l(e, "toast", 7), a = l(e, "index", 7), s = l(e, "expanded", 7), i = l(e, "invert", 7), d = l(e, "position", 7), c = l(e, "visibleToasts", 7), u = l(e, "expandByDefault", 7), f = l(e, "closeButton", 7), v = l(e, "interacting", 7), g = l(e, "cancelButtonStyle", 7, ""), h = l(e, "actionButtonStyle", 7, ""), m = l(e, "duration", 7), _ = l(e, "descriptionClass", 7, ""), w = l(e, "classes", 7), p = l(e, "unstyled", 7, !1), b = l(e, "loadingIcon", 7), C = l(e, "successIcon", 7), T = l(e, "errorIcon", 7), P = l(e, "warningIcon", 7), y = l(e, "closeIcon", 7), E = l(e, "infoIcon", 7), z = l(e, "defaultRichColors", 7, !1), B = l(e, "swipeDirections", 7), F = l(e, "closeButtonAriaLabel", 7);
  const N = { ...Gf };
  let W = /* @__PURE__ */ Ye(!1), O = /* @__PURE__ */ Ye(!1), M = /* @__PURE__ */ Ye(!1), U = /* @__PURE__ */ Ye(!1), H = /* @__PURE__ */ Ye(!1), S = /* @__PURE__ */ Ye(0), I = /* @__PURE__ */ Ye(0), q = n().duration || m() || uo, Q = /* @__PURE__ */ Ye(null), Z = /* @__PURE__ */ Ye(void 0), ge = /* @__PURE__ */ Ye(null), ve = /* @__PURE__ */ Ye(null);
  const X = /* @__PURE__ */ J(() => a() === 0), se = /* @__PURE__ */ J(() => a() + 1 <= c()), Y = /* @__PURE__ */ J(() => n().type), $ = /* @__PURE__ */ J(() => n().dismissable !== !1), ie = /* @__PURE__ */ J(() => n().class || ""), he = /* @__PURE__ */ J(() => n().descriptionClass || ""), ke = /* @__PURE__ */ J(() => rt.heights.findIndex((ce) => ce.toastId === n().id) || 0), Me = /* @__PURE__ */ J(() => n().closeButton ?? f()), te = /* @__PURE__ */ J(() => n().duration ?? m() ?? uo);
  let fe = null;
  const be = /* @__PURE__ */ J(() => d().split("-")), Oe = /* @__PURE__ */ J(() => rt.heights.reduce(
    (ce, De, He) => He >= x(ke) ? ce : ce + De.height,
    0
  )), Ve = Hf(), $e = /* @__PURE__ */ J(() => n().invert || i()), vt = /* @__PURE__ */ J(() => x(Y) === "loading"), Ze = /* @__PURE__ */ J(() => ({ ...N, ...w() })), re = /* @__PURE__ */ J(() => n().title), Ue = /* @__PURE__ */ J(() => n().description);
  let Ce = /* @__PURE__ */ Ye(0), Ee = /* @__PURE__ */ Ye(0);
  const qe = /* @__PURE__ */ J(() => Math.round(x(ke) * Ff + x(Oe)));
  kt(() => {
    x(re), x(Ue);
    let ce;
    s() || u() ? ce = 1 : ce = 1 - a() * Yf;
    const De = ye(() => x(Z));
    if (De === void 0) return;
    De.style.setProperty("height", "auto");
    const He = De.offsetHeight, et = De.getBoundingClientRect().height, st = Math.round(et / ce + Number.EPSILON & 100) / 100;
    De.style.removeProperty("height");
    let Re;
    Math.abs(st - He) < 1 ? Re = st : Re = He, _e(I, Re, !0), rt.setHeight({ toastId: n().id, height: Re });
  });
  function Je() {
    _e(O, !0), _e(S, x(qe), !0), rt.removeHeight(n().id), setTimeout(
      () => {
        rt.remove(n().id);
      },
      Wf
    );
  }
  let At;
  const cr = /* @__PURE__ */ J(() => n().promise && x(Y) === "loading" || n().duration === Number.POSITIVE_INFINITY);
  function ot() {
    _e(Ce, (/* @__PURE__ */ new Date()).getTime(), !0), At = setTimeout(
      () => {
        n().onAutoClose?.(n()), Je();
      },
      q
    );
  }
  function _t() {
    if (x(Ee) < x(Ce)) {
      const ce = (/* @__PURE__ */ new Date()).getTime() - x(Ce);
      q = q - ce;
    }
    _e(Ee, (/* @__PURE__ */ new Date()).getTime(), !0);
  }
  kt(() => {
    n().updated && (clearTimeout(At), q = x(te), ot());
  }), kt(() => (x(cr) || (s() || v() || Ve.current ? _t() : ot()), () => clearTimeout(At))), _a(() => {
    _e(W, !0);
    const ce = x(Z)?.getBoundingClientRect().height;
    return _e(I, ce, !0), rt.setHeight({ toastId: n().id, height: ce }), () => {
      rt.removeHeight(n().id);
    };
  }), kt(() => {
    n().delete && ye(() => {
      Je(), n().onDismiss?.(n());
    });
  });
  const lt = (ce) => {
    if (x(vt)) return;
    _e(S, x(qe), !0);
    const De = ce.target;
    De.setPointerCapture(ce.pointerId), De.tagName !== "BUTTON" && (_e(M, !0), fe = { x: ce.clientX, y: ce.clientY });
  }, Zt = () => {
    if (x(U) || !x($)) return;
    fe = null;
    const ce = Number(x(Z)?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), De = Number(x(Z)?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), He = (/* @__PURE__ */ new Date()).getTime() - (x(Q)?.getTime() ?? 0), et = x(ge) === "x" ? ce : De, st = Math.abs(et) / He;
    if (Math.abs(et) >= jf || st > 0.11) {
      _e(S, x(qe), !0), n().onDismiss?.(n()), x(ge) === "x" ? _e(ve, ce > 0 ? "right" : "left", !0) : _e(ve, De > 0 ? "down" : "up", !0), Je(), _e(U, !0);
      return;
    } else
      x(Z)?.style.setProperty("--swipe-amount-x", "0px"), x(Z)?.style.setProperty("--swipe-amount-y", "0px");
    _e(H, !1), _e(M, !1), _e(ge, null);
  }, Hr = (ce) => {
    if (!fe || !x($) || (window.getSelection()?.toString().length ?? -1) > 0) return;
    const He = ce.clientY - fe.y, et = ce.clientX - fe.x, st = B() ?? Xf(d());
    !x(ge) && (Math.abs(et) > 1 || Math.abs(He) > 1) && _e(ge, Math.abs(et) > Math.abs(He) ? "x" : "y", !0);
    let Re = { x: 0, y: 0 };
    if (x(ge) === "y") {
      if (st.includes("top") || st.includes("bottom"))
        if (st.includes("top") && He < 0 || st.includes("bottom") && He > 0)
          Re.y = He;
        else {
          const Qe = He * fo(He);
          Re.y = Math.abs(Qe) < Math.abs(He) ? Qe : He;
        }
    } else if (x(ge) === "x" && (st.includes("left") || st.includes("right")))
      if (st.includes("left") && et < 0 || st.includes("right") && et > 0)
        Re.x = et;
      else {
        const Qe = et * fo(et);
        Re.x = Math.abs(Qe) < Math.abs(et) ? Qe : et;
      }
    (Math.abs(Re.x) > 0 || Math.abs(Re.y) > 0) && _e(H, !0), x(Z)?.style.setProperty("--swipe-amount-x", `${Re.x}px`), x(Z)?.style.setProperty("--swipe-amount-y", `${Re.y}px`);
  }, ne = () => {
    _e(M, !1), _e(ge, null), fe = null;
  }, ct = /* @__PURE__ */ J(() => n().icon ? n().icon : x(Y) === "success" ? C() : x(Y) === "error" ? T() : x(Y) === "warning" ? P() : x(Y) === "info" ? E() : x(Y) === "loading" ? b() : null);
  var wt = {
    get toast() {
      return n();
    },
    set toast(ce) {
      n(ce), o();
    },
    get index() {
      return a();
    },
    set index(ce) {
      a(ce), o();
    },
    get expanded() {
      return s();
    },
    set expanded(ce) {
      s(ce), o();
    },
    get invert() {
      return i();
    },
    set invert(ce) {
      i(ce), o();
    },
    get position() {
      return d();
    },
    set position(ce) {
      d(ce), o();
    },
    get visibleToasts() {
      return c();
    },
    set visibleToasts(ce) {
      c(ce), o();
    },
    get expandByDefault() {
      return u();
    },
    set expandByDefault(ce) {
      u(ce), o();
    },
    get closeButton() {
      return f();
    },
    set closeButton(ce) {
      f(ce), o();
    },
    get interacting() {
      return v();
    },
    set interacting(ce) {
      v(ce), o();
    },
    get cancelButtonStyle() {
      return g();
    },
    set cancelButtonStyle(ce = "") {
      g(ce), o();
    },
    get actionButtonStyle() {
      return h();
    },
    set actionButtonStyle(ce = "") {
      h(ce), o();
    },
    get duration() {
      return m();
    },
    set duration(ce) {
      m(ce), o();
    },
    get descriptionClass() {
      return _();
    },
    set descriptionClass(ce = "") {
      _(ce), o();
    },
    get classes() {
      return w();
    },
    set classes(ce) {
      w(ce), o();
    },
    get unstyled() {
      return p();
    },
    set unstyled(ce = !1) {
      p(ce), o();
    },
    get loadingIcon() {
      return b();
    },
    set loadingIcon(ce) {
      b(ce), o();
    },
    get successIcon() {
      return C();
    },
    set successIcon(ce) {
      C(ce), o();
    },
    get errorIcon() {
      return T();
    },
    set errorIcon(ce) {
      T(ce), o();
    },
    get warningIcon() {
      return P();
    },
    set warningIcon(ce) {
      P(ce), o();
    },
    get closeIcon() {
      return y();
    },
    set closeIcon(ce) {
      y(ce), o();
    },
    get infoIcon() {
      return E();
    },
    set infoIcon(ce) {
      E(ce), o();
    },
    get defaultRichColors() {
      return z();
    },
    set defaultRichColors(ce = !1) {
      z(ce), o();
    },
    get swipeDirections() {
      return B();
    },
    set swipeDirections(ce) {
      B(ce), o();
    },
    get closeButtonAriaLabel() {
      return F();
    },
    set closeButtonAriaLabel(ce) {
      F(ce), o();
    }
  }, Se = sv();
  ae(Se, "tabindex", 0);
  let Dt;
  Se.__pointermove = Hr, Se.__pointerup = Zt, Se.__pointerdown = lt;
  var ft = L(Se);
  {
    var gt = (ce) => {
      var De = Zf();
      De.__click = [Qf, vt, $, Je, n];
      var He = L(De);
      me(He, () => y() ?? je), A(De), j(
        (et) => {
          ae(De, "aria-label", F()), ae(De, "data-disabled", x(vt)), we(De, 1, et);
        },
        [
          () => Ae(Or(x(Ze)?.closeButton, n()?.classes?.closeButton))
        ]
      ), k(ce, De);
    };
    V(ft, (ce) => {
      x(Me) && !n().component && x(Y) !== "loading" && y() !== null && ce(gt);
    });
  }
  var Fr = D(ft, 2);
  {
    var Jt = (ce) => {
      const De = /* @__PURE__ */ J(() => n().component);
      var He = le(), et = K(He);
      rn(et, () => x(De), (st, Re) => {
        Re(st, un(() => n().componentProps, { closeToast: Je }));
      }), k(ce, He);
    }, jr = (ce) => {
      var De = av(), He = K(De);
      {
        var et = (Le) => {
          var bt = Jf(), ir = L(bt);
          {
            var ur = (pe) => {
              var ze = le(), Xe = K(ze);
              {
                var We = (ut) => {
                  var Ut = le(), tn = K(Ut);
                  rn(tn, () => n().icon, (Xn, Kn) => {
                    Kn(Xn, {});
                  }), k(ut, Ut);
                }, at = (ut) => {
                  r(ut);
                };
                V(Xe, (ut) => {
                  n().icon ? ut(We) : ut(at, !1);
                });
              }
              k(pe, ze);
            };
            V(ir, (pe) => {
              (n().promise || x(Y) === "loading") && pe(ur);
            });
          }
          var dr = D(ir, 2);
          {
            var G = (pe) => {
              var ze = le(), Xe = K(ze);
              {
                var We = (ut) => {
                  var Ut = le(), tn = K(Ut);
                  rn(tn, () => n().icon, (Xn, Kn) => {
                    Kn(Xn, {});
                  }), k(ut, Ut);
                }, at = (ut) => {
                  var Ut = le(), tn = K(Ut);
                  {
                    var Xn = (yn) => {
                      var Qn = le(), vs = K(Qn);
                      me(vs, () => C() ?? je), k(yn, Qn);
                    }, Kn = (yn) => {
                      var Qn = le(), vs = K(Qn);
                      {
                        var Nc = (xn) => {
                          var Zn = le(), gs = K(Zn);
                          me(gs, () => T() ?? je), k(xn, Zn);
                        }, Bc = (xn) => {
                          var Zn = le(), gs = K(Zn);
                          {
                            var Dc = (Tn) => {
                              var Jn = le(), hs = K(Jn);
                              me(hs, () => P() ?? je), k(Tn, Jn);
                            }, Rc = (Tn) => {
                              var Jn = le(), hs = K(Jn);
                              {
                                var Uc = (ms) => {
                                  var qi = le(), Vc = K(qi);
                                  me(Vc, () => E() ?? je), k(ms, qi);
                                };
                                V(
                                  hs,
                                  (ms) => {
                                    x(Y) === "info" && ms(Uc);
                                  },
                                  !0
                                );
                              }
                              k(Tn, Jn);
                            };
                            V(
                              gs,
                              (Tn) => {
                                x(Y) === "warning" ? Tn(Dc) : Tn(Rc, !1);
                              },
                              !0
                            );
                          }
                          k(xn, Zn);
                        };
                        V(
                          vs,
                          (xn) => {
                            x(Y) === "error" ? xn(Nc) : xn(Bc, !1);
                          },
                          !0
                        );
                      }
                      k(yn, Qn);
                    };
                    V(
                      tn,
                      (yn) => {
                        x(Y) === "success" ? yn(Xn) : yn(Kn, !1);
                      },
                      !0
                    );
                  }
                  k(ut, Ut);
                };
                V(Xe, (ut) => {
                  n().icon ? ut(We) : ut(at, !1);
                });
              }
              k(pe, ze);
            };
            V(dr, (pe) => {
              n().type !== "loading" && pe(G);
            });
          }
          A(bt), j((pe) => we(bt, 1, pe), [
            () => Ae(Or(x(Ze)?.icon, n()?.classes?.icon))
          ]), k(Le, bt);
        };
        V(He, (Le) => {
          (x(Y) || n().icon || n().promise) && n().icon !== null && (x(ct) !== null || n().icon) && Le(et);
        });
      }
      var st = D(He, 2), Re = L(st), Qe = L(Re);
      {
        var It = (Le) => {
          var bt = le(), ir = K(bt);
          {
            var ur = (G) => {
              const pe = /* @__PURE__ */ J(() => n().title);
              var ze = le(), Xe = K(ze);
              rn(Xe, () => x(pe), (We, at) => {
                at(We, un(() => n().componentProps));
              }), k(G, ze);
            }, dr = (G) => {
              var pe = Ct();
              j(() => ee(pe, n().title)), k(G, pe);
            };
            V(ir, (G) => {
              typeof n().title != "string" ? G(ur) : G(dr, !1);
            });
          }
          k(Le, bt);
        };
        V(Qe, (Le) => {
          n().title && Le(It);
        });
      }
      A(Re);
      var zt = D(Re, 2);
      {
        var Rt = (Le) => {
          var bt = $f(), ir = L(bt);
          {
            var ur = (G) => {
              const pe = /* @__PURE__ */ J(() => n().description);
              var ze = le(), Xe = K(ze);
              rn(Xe, () => x(pe), (We, at) => {
                at(We, un(() => n().componentProps));
              }), k(G, ze);
            }, dr = (G) => {
              var pe = Ct();
              j(() => ee(pe, n().description)), k(G, pe);
            };
            V(ir, (G) => {
              typeof n().description != "string" ? G(ur) : G(dr, !1);
            });
          }
          A(bt), j((G) => we(bt, 1, G), [
            () => Ae(Or(_(), x(he), x(Ze)?.description, n().classes?.description))
          ]), k(Le, bt);
        };
        V(zt, (Le) => {
          n().description && Le(Rt);
        });
      }
      A(st);
      var Ne = D(st, 2);
      {
        var Ge = (Le) => {
          var bt = le(), ir = K(bt);
          {
            var ur = (G) => {
              var pe = le(), ze = K(pe);
              rn(ze, () => n().cancel, (Xe, We) => {
                We(Xe, {});
              }), k(G, pe);
            }, dr = (G) => {
              var pe = le(), ze = K(pe);
              {
                var Xe = (We) => {
                  var at = tv();
                  at.__click = [ev, n, $, Je];
                  var ut = L(at, !0);
                  A(at), j(
                    (Ut) => {
                      Pa(at, n().cancelButtonStyle ?? g()), we(at, 1, Ut), ee(ut, n().cancel.label);
                    },
                    [
                      () => Ae(Or(x(Ze)?.cancelButton, n()?.classes?.cancelButton))
                    ]
                  ), k(We, at);
                };
                V(
                  ze,
                  (We) => {
                    Ua(n().cancel) && We(Xe);
                  },
                  !0
                );
              }
              k(G, pe);
            };
            V(ir, (G) => {
              typeof n().cancel == "function" ? G(ur) : G(dr, !1);
            });
          }
          k(Le, bt);
        };
        V(Ne, (Le) => {
          n().cancel && Le(Ge);
        });
      }
      var ht = D(Ne, 2);
      {
        var Yt = (Le) => {
          var bt = le(), ir = K(bt);
          {
            var ur = (G) => {
              var pe = le(), ze = K(pe);
              rn(ze, () => n().action, (Xe, We) => {
                We(Xe, {});
              }), k(G, pe);
            }, dr = (G) => {
              var pe = le(), ze = K(pe);
              {
                var Xe = (We) => {
                  var at = nv();
                  at.__click = [rv, n, Je];
                  var ut = L(at, !0);
                  A(at), j(
                    (Ut) => {
                      Pa(at, n().actionButtonStyle ?? h()), we(at, 1, Ut), ee(ut, n().action.label);
                    },
                    [
                      () => Ae(Or(x(Ze)?.actionButton, n()?.classes?.actionButton))
                    ]
                  ), k(We, at);
                };
                V(
                  ze,
                  (We) => {
                    Ua(n().action) && We(Xe);
                  },
                  !0
                );
              }
              k(G, pe);
            };
            V(ir, (G) => {
              typeof n().action == "function" ? G(ur) : G(dr, !1);
            });
          }
          k(Le, bt);
        };
        V(ht, (Le) => {
          n().action && Le(Yt);
        });
      }
      j((Le) => we(Re, 1, Le), [
        () => Ae(Or(x(Ze)?.title, n()?.classes?.title))
      ]), k(ce, De);
    };
    V(Fr, (ce) => {
      n().component ? ce(Jt) : ce(jr, !1);
    });
  }
  return A(Se), Wn(Se, (ce) => _e(Z, ce), () => x(Z)), j(
    (ce, De, He, et) => {
      we(Se, 1, ce), ae(Se, "data-rich-colors", n().richColors ?? z()), ae(Se, "data-styled", !(n().component || n().unstyled || p())), ae(Se, "data-mounted", x(W)), ae(Se, "data-promise", De), ae(Se, "data-swiped", x(H)), ae(Se, "data-removed", x(O)), ae(Se, "data-visible", x(se)), ae(Se, "data-y-position", x(be)[0]), ae(Se, "data-x-position", x(be)[1]), ae(Se, "data-index", a()), ae(Se, "data-front", x(X)), ae(Se, "data-swiping", x(M)), ae(Se, "data-dismissable", x($)), ae(Se, "data-type", x(Y)), ae(Se, "data-invert", x($e)), ae(Se, "data-swipe-out", x(U)), ae(Se, "data-swipe-direction", x(ve)), ae(Se, "data-expanded", He), Dt = Pa(Se, `${e.style} ${n().style}`, Dt, et);
    },
    [
      () => Ae(Or(e.class, x(ie), x(Ze)?.toast, n()?.classes?.toast, x(Ze)?.[x(Y)], n()?.classes?.[x(Y)])),
      () => !!n().promise,
      () => !!(s() || u() && x(W)),
      () => ({
        "--index": a(),
        "--toasts-before": a(),
        "--z-index": rt.toasts.length - a(),
        "--offset": `${x(O) ? x(S) : x(qe)}px`,
        "--initial-height": u() ? "auto" : `${x(I)}px`
      })
    ]
  ), tt("dragend", Se, ne), k(t, Se), de(wt);
}
jt(["pointermove", "pointerup", "pointerdown", "click"]);
oe(
  Rl,
  {
    toast: {},
    index: {},
    expanded: {},
    invert: {},
    position: {},
    visibleToasts: {},
    expandByDefault: {},
    closeButton: {},
    interacting: {},
    cancelButtonStyle: {},
    actionButtonStyle: {},
    duration: {},
    descriptionClass: {},
    classes: {},
    unstyled: {},
    loadingIcon: {},
    successIcon: {},
    errorIcon: {},
    warningIcon: {},
    closeIcon: {},
    infoIcon: {},
    defaultRichColors: {},
    swipeDirections: {},
    closeButtonAriaLabel: {}
  },
  [],
  [],
  !0
);
var iv = /* @__PURE__ */ jn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>');
function Ul(t) {
  var e = iv();
  k(t, e);
}
oe(Ul, {}, [], [], !0);
var ov = /* @__PURE__ */ jn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>');
function Vl(t) {
  var e = ov();
  k(t, e);
}
oe(Vl, {}, [], [], !0);
var lv = /* @__PURE__ */ jn('<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>');
function ql(t) {
  var e = lv();
  k(t, e);
}
oe(ql, {}, [], [], !0);
var cv = /* @__PURE__ */ jn('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>');
function Hl(t) {
  var e = cv();
  k(t, e);
}
oe(Hl, {}, [], [], !0);
var uv = /* @__PURE__ */ jn('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');
function Fl(t) {
  var e = uv();
  k(t, e);
}
oe(Fl, {}, [], [], !0);
const vo = 3, Vs = "24px", qs = "16px", go = 4e3, dv = 356, ho = 14, ks = "dark", Aa = "light";
function fv(t, e) {
  const r = {};
  return [t, e].forEach((n, a) => {
    const s = a === 1, i = s ? "--mobile-offset" : "--offset", d = s ? qs : Vs;
    function c(u) {
      ["top", "right", "bottom", "left"].forEach((f) => {
        r[`${i}-${f}`] = typeof u == "number" ? `${u}px` : u;
      });
    }
    typeof n == "number" || typeof n == "string" ? c(n) : typeof n == "object" ? ["top", "right", "bottom", "left"].forEach((u) => {
      const f = n[u];
      f === void 0 ? r[`${i}-${u}`] = d : r[`${i}-${u}`] = typeof f == "number" ? `${f}px` : f;
    }) : c(d);
  }), r;
}
var vv = /* @__PURE__ */ R("<ol></ol>"), gv = /* @__PURE__ */ R('<section aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-nbs0zk"><!></section>');
const hv = {
  hash: "svelte-nbs0zk",
  code: `html[dir='ltr'],
	[data-sonner-toaster][dir='ltr'] {--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%);}html[dir='rtl'],
	[data-sonner-toaster][dir='rtl'] {--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%);}[data-sonner-toaster] {position:fixed;width:var(--width);font-family:ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Helvetica Neue,
			Arial,
			Noto Sans,
			sans-serif,
			Apple Color Emoji,
			Segoe UI Emoji,
			Segoe UI Symbol,
			Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform 400ms ease;}

	@media (hover: none) and (pointer: coarse) {[data-sonner-toaster][data-lifted='true'] {transform:none;}
	}[data-sonner-toaster][data-x-position='right'] {right:var(--offset-right);}[data-sonner-toaster][data-x-position='left'] {left:var(--offset-left);}[data-sonner-toaster][data-x-position='center'] {left:50%;transform:translateX(-50%);}[data-sonner-toaster][data-y-position='top'] {top:var(--offset-top);}[data-sonner-toaster][data-y-position='bottom'] {bottom:var(--offset-bottom);}[data-sonner-toast] {--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform 400ms,
			opacity 400ms,
			height 400ms,
			box-shadow 200ms;box-sizing:border-box;outline:none;overflow-wrap:anywhere;}[data-sonner-toast][data-styled='true'] {padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px;}[data-sonner-toast]:focus-visible {box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),
			0 0 0 2px rgba(0, 0, 0, 0.2);}[data-sonner-toast][data-y-position='top'] {top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap));}[data-sonner-toast][data-y-position='bottom'] {bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap));}[data-sonner-toast][data-styled='true'] [data-description] {font-weight:400;line-height:1.4;color:#3f3f3f;}[data-rich-colors='true'][data-sonner-toast][data-styled='true']
		[data-description] {color:inherit;}[data-sonner-toaster][data-sonner-theme='dark'] [data-description] {color:hsl(0, 0%, 91%);}[data-sonner-toast][data-styled='true'] [data-title] {font-weight:500;line-height:1.5;color:inherit;}[data-sonner-toast][data-styled='true'] [data-icon] {display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end);}[data-sonner-toast][data-promise='true'] [data-icon] > svg {opacity:0;transform:scale(0.8);transform-origin:center;
		animation: sonner-fade-in 300ms ease forwards;}[data-sonner-toast][data-styled='true'] [data-icon] > * {flex-shrink:0;}[data-sonner-toast][data-styled='true'] [data-icon] svg {margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end);}[data-sonner-toast][data-styled='true'] [data-content] {display:flex;flex-direction:column;gap:2px;}[data-sonner-toast][data-styled='true'] [data-button] {border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity 400ms,
			box-shadow 200ms;}[data-sonner-toast][data-styled='true'] [data-button]:focus-visible {box-shadow:0 0 0 2px rgba(0, 0, 0, 0.4);}[data-sonner-toast][data-styled='true'] [data-button]:first-of-type {margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);}[data-sonner-toast][data-styled='true'] [data-cancel] {color:var(--normal-text);background:rgba(0, 0, 0, 0.08);}[data-sonner-toaster][data-sonner-theme='dark']
		[data-sonner-toast][data-styled='true']
		[data-cancel] {background:rgba(255, 255, 255, 0.3);}[data-sonner-toast][data-styled='true'] [data-close-button] {position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity 100ms,
			background 200ms,
			border-color 200ms;}[data-sonner-toast][data-styled='true'] [data-close-button]:focus-visible {box-shadow:0px 4px 12px rgba(0, 0, 0, 0.1),
			0 0 0 2px rgba(0, 0, 0, 0.2);}[data-sonner-toast][data-styled='true'] [data-disabled='true'] {cursor:not-allowed;}[data-sonner-toast][data-styled='true']:hover [data-close-button]:hover {background:var(--gray2);border-color:var(--gray5);}[data-sonner-toast][data-swiping='true']::before {content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1;}[data-sonner-toast][data-y-position='top'][data-swiping='true']::before {bottom:50%;transform:scaleY(3) translateY(50%);}[data-sonner-toast][data-y-position='bottom'][data-swiping='true']::before {top:50%;transform:scaleY(3) translateY(-50%);}[data-sonner-toast][data-swiping='false'][data-removed='true']::before {content:'';position:absolute;inset:0;transform:scaleY(2);}[data-sonner-toast][data-expanded='true']::after {content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%;}[data-sonner-toast][data-mounted='true'] {--y: translateY(0);opacity:1;}[data-sonner-toast][data-expanded='false'][data-front='false'] {--scale: var(--toasts-before) * 0.05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before)))
			scale(calc(-1 * var(--scale)));height:var(--front-toast-height);}[data-sonner-toast] > * {transition:opacity 400ms;}[data-sonner-toast][data-x-position='right'] {right:0;}[data-sonner-toast][data-x-position='left'] {left:0;}[data-sonner-toast][data-expanded='false'][data-front='false'][data-styled='true']
		> * {opacity:0;}[data-sonner-toast][data-visible='false'] {opacity:0;pointer-events:none;}[data-sonner-toast][data-mounted='true'][data-expanded='true'] {--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height);}[data-sonner-toast][data-removed='true'][data-front='true'][data-swipe-out='false'] {--y: translateY(calc(var(--lift) * -100%));opacity:0;}[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='true'] {--y: translateY(
			calc(var(--lift) * var(--offset) + var(--lift) * -100%)
		);opacity:0;}[data-sonner-toast][data-removed='true'][data-front='false'][data-swipe-out='false'][data-expanded='false'] {--y: translateY(40%);opacity:0;transition:transform 500ms,
			opacity 200ms;}[data-sonner-toast][data-removed='true'][data-front='false']::before {height:calc(var(--initial-height) + 20%);}[data-sonner-toast][data-swiping='true'] {transform:var(--y) translateY(var(--swipe-amount-y, 0px))
			translateX(var(--swipe-amount-x, 0px));transition:none;}[data-sonner-toast][data-swiped='true'] {user-select:none;}[data-sonner-toast][data-swipe-out='true'][data-y-position='bottom'],
	[data-sonner-toast][data-swipe-out='true'][data-y-position='top'] {animation-duration:200ms;animation-timing-function:ease-out;animation-fill-mode:forwards;}[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='left'] {
		animation-name: swipe-out-left;}[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='right'] {
		animation-name: swipe-out-right;}[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='up'] {
		animation-name: swipe-out-up;}[data-sonner-toast][data-swipe-out='true'][data-swipe-direction='down'] {
		animation-name: swipe-out-down;}

	@keyframes swipe-out-left {
		from {
			transform: var(--y) translateX(var(--swipe-amount-x));
			opacity: 1;
		}

		to {
			transform: var(--y) translateX(calc(var(--swipe-amount-x) - 100%));
			opacity: 0;
		}
	}

	@keyframes swipe-out-right {
		from {
			transform: var(--y) translateX(var(--swipe-amount-x));
			opacity: 1;
		}

		to {
			transform: var(--y) translateX(calc(var(--swipe-amount-x) + 100%));
			opacity: 0;
		}
	}

	@keyframes swipe-out-up {
		from {
			transform: var(--y) translateY(var(--swipe-amount-y));
			opacity: 1;
		}

		to {
			transform: var(--y) translateY(calc(var(--swipe-amount-y) - 100%));
			opacity: 0;
		}
	}

	@keyframes swipe-out-down {
		from {
			transform: var(--y) translateY(var(--swipe-amount-y));
			opacity: 1;
		}

		to {
			transform: var(--y) translateY(calc(var(--swipe-amount-y) + 100%));
			opacity: 0;
		}
	}

	@media (max-width: 600px) {[data-sonner-toaster] {position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%;}[data-sonner-toaster][dir='rtl'] {left:calc(var(--mobile-offset-left) * -1);}[data-sonner-toaster] [data-sonner-toast] {left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2);}[data-sonner-toaster][data-x-position='left'] {left:var(--mobile-offset-left);}[data-sonner-toaster][data-y-position='bottom'] {bottom:var(--mobile-offset-bottom);}[data-sonner-toaster][data-y-position='top'] {top:var(--mobile-offset-top);}[data-sonner-toaster][data-x-position='center'] {left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none;}
	}[data-sonner-toaster][data-sonner-theme='light'] {--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 87%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 93%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 84%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%);}[data-sonner-toaster][data-sonner-theme='light']
		[data-sonner-toast][data-invert='true'] {--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);}[data-sonner-toaster][data-sonner-theme='dark']
		[data-sonner-toast][data-invert='true'] {--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12);}[data-sonner-toaster][data-sonner-theme='dark'] {--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 43%, 17%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 9%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%);}[data-sonner-toaster][data-sonner-theme='dark']
		[data-sonner-toast]
		[data-close-button] {background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text);}[data-sonner-toaster][data-sonner-theme='dark']
		[data-sonner-toast]
		[data-close-button]:hover {background:var(--normal-bg-hover);border-color:var(--normal-border-hover);}[data-rich-colors='true'][data-sonner-toast][data-type='success'] {background:var(--success-bg);border-color:var(--success-border);color:var(--success-text);}[data-rich-colors='true'][data-sonner-toast][data-type='success']
		[data-close-button] {background:var(--success-bg);border-color:var(--success-border);color:var(--success-text);}[data-rich-colors='true'][data-sonner-toast][data-type='info'] {background:var(--info-bg);border-color:var(--info-border);color:var(--info-text);}[data-rich-colors='true'][data-sonner-toast][data-type='info']
		[data-close-button] {background:var(--info-bg);border-color:var(--info-border);color:var(--info-text);}[data-rich-colors='true'][data-sonner-toast][data-type='warning'] {background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text);}[data-rich-colors='true'][data-sonner-toast][data-type='warning']
		[data-close-button] {background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text);}[data-rich-colors='true'][data-sonner-toast][data-type='error'] {background:var(--error-bg);border-color:var(--error-border);color:var(--error-text);}[data-rich-colors='true'][data-sonner-toast][data-type='error']
		[data-close-button] {background:var(--error-bg);border-color:var(--error-border);color:var(--error-text);}.sonner-loading-wrapper {--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10;}.sonner-loading-wrapper[data-visible='false'] {transform-origin:center;
		animation: sonner-fade-out 0.2s ease forwards;}.sonner-spinner {position:relative;top:50%;left:50%;height:var(--size);width:var(--size);}.sonner-loading-bar {
		animation: sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%;}.sonner-loading-bar:nth-child(1) {animation-delay:-1.2s;transform:rotate(0.0001deg) translate(146%);}.sonner-loading-bar:nth-child(2) {animation-delay:-1.1s;transform:rotate(30deg) translate(146%);}.sonner-loading-bar:nth-child(3) {animation-delay:-1s;transform:rotate(60deg) translate(146%);}.sonner-loading-bar:nth-child(4) {animation-delay:-0.9s;transform:rotate(90deg) translate(146%);}.sonner-loading-bar:nth-child(5) {animation-delay:-0.8s;transform:rotate(120deg) translate(146%);}.sonner-loading-bar:nth-child(6) {animation-delay:-0.7s;transform:rotate(150deg) translate(146%);}.sonner-loading-bar:nth-child(7) {animation-delay:-0.6s;transform:rotate(180deg) translate(146%);}.sonner-loading-bar:nth-child(8) {animation-delay:-0.5s;transform:rotate(210deg) translate(146%);}.sonner-loading-bar:nth-child(9) {animation-delay:-0.4s;transform:rotate(240deg) translate(146%);}.sonner-loading-bar:nth-child(10) {animation-delay:-0.3s;transform:rotate(270deg) translate(146%);}.sonner-loading-bar:nth-child(11) {animation-delay:-0.2s;transform:rotate(300deg) translate(146%);}.sonner-loading-bar:nth-child(12) {animation-delay:-0.1s;transform:rotate(330deg) translate(146%);}

	@keyframes sonner-fade-in {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes sonner-fade-out {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(0.8);
		}
	}

	@keyframes sonner-spin {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0.15;
		}
	}

	@media (prefers-reduced-motion) {[data-sonner-toast],
		[data-sonner-toast] > *,
		.sonner-loading-bar {transition:none !important;
			animation: none !important;}
	}.sonner-loader {position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);transform-origin:center;transition:opacity 200ms,
			transform 200ms;}.sonner-loader[data-visible='false'] {opacity:0;transform:scale(0.8) translate(-50%, -50%);}`
};
function mi(t, e) {
  ue(e, !0), ci(t, hv);
  function r(re) {
    return re !== "system" ? re : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? ks : Aa;
  }
  let n = l(e, "invert", 7, !1), a = l(e, "position", 7, "bottom-right"), s = l(e, "hotkey", 23, () => ["altKey", "KeyT"]), i = l(e, "expand", 7, !1), d = l(e, "closeButton", 7, !1), c = l(e, "offset", 7, Vs), u = l(e, "mobileOffset", 7, qs), f = l(e, "theme", 7, "light"), v = l(e, "richColors", 7, !1), g = l(e, "duration", 7, go), h = l(e, "visibleToasts", 7, vo), m = l(e, "toastOptions", 23, () => ({})), _ = l(e, "dir", 7, "auto"), w = l(e, "gap", 7, ho), p = l(e, "loadingIcon", 7), b = l(e, "successIcon", 7), C = l(e, "errorIcon", 7), T = l(e, "warningIcon", 7), P = l(e, "closeIcon", 7), y = l(e, "infoIcon", 7), E = l(e, "containerAriaLabel", 7, "Notifications"), z = l(e, "class", 7), B = l(e, "closeButtonAriaLabel", 7, "Close toast"), F = l(e, "onblur", 7), N = l(e, "onfocus", 7), W = l(e, "onmouseenter", 7), O = l(e, "onmousemove", 7), M = l(e, "onmouseleave", 7), U = l(e, "ondragend", 7), H = l(e, "onpointerdown", 7), S = l(e, "onpointerup", 7), I = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "invert",
    "position",
    "hotkey",
    "expand",
    "closeButton",
    "offset",
    "mobileOffset",
    "theme",
    "richColors",
    "duration",
    "visibleToasts",
    "toastOptions",
    "dir",
    "gap",
    "loadingIcon",
    "successIcon",
    "errorIcon",
    "warningIcon",
    "closeIcon",
    "infoIcon",
    "containerAriaLabel",
    "class",
    "closeButtonAriaLabel",
    "onblur",
    "onfocus",
    "onmouseenter",
    "onmousemove",
    "onmouseleave",
    "ondragend",
    "onpointerdown",
    "onpointerup"
  ]);
  function q() {
    if (_() !== "auto") return _();
    if (typeof window > "u" || typeof document > "u") return "ltr";
    const re = document.documentElement.getAttribute("dir");
    return re === "auto" || !re ? (ye(() => _(window.getComputedStyle(document.documentElement).direction ?? "ltr")), _()) : (ye(() => _(re)), re);
  }
  const Q = /* @__PURE__ */ J(() => Array.from(new Set([
    a(),
    ...rt.toasts.filter((re) => re.position).map((re) => re.position)
  ].filter(Boolean))));
  let Z = /* @__PURE__ */ Ye(!1), ge = /* @__PURE__ */ Ye(!1), ve = /* @__PURE__ */ Ye(tr(r(f()))), X = /* @__PURE__ */ Ye(void 0), se = /* @__PURE__ */ Ye(null), Y = /* @__PURE__ */ Ye(!1);
  const $ = /* @__PURE__ */ J(() => s().join("+").replace(/Key/g, "").replace(/Digit/g, ""));
  kt(() => {
    rt.toasts.length <= 1 && _e(Z, !1);
  }), kt(() => {
    const re = rt.toasts.filter((Ue) => Ue.dismiss && !Ue.delete);
    if (re.length > 0) {
      const Ue = rt.toasts.map((Ce) => re.find((qe) => qe.id === Ce.id) ? { ...Ce, delete: !0 } : Ce);
      rt.toasts = Ue;
    }
  }), kt(() => () => {
    x(X) && x(se) && (x(se).focus({ preventScroll: !0 }), _e(se, null), _e(Y, !1));
  }), _a(() => (rt.reset(), Da(document, "keydown", (Ue) => {
    s().every((Ee) => Ue[Ee] || Ue.code === Ee) && (_e(Z, !0), x(X)?.focus()), Ue.code === "Escape" && (document.activeElement === x(X) || x(X)?.contains(document.activeElement)) && _e(Z, !1);
  }))), kt(() => {
    if (f() !== "system" && _e(ve, f()), typeof window < "u") {
      f() === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? _e(ve, ks) : _e(ve, Aa));
      const re = window.matchMedia("(prefers-color-scheme: dark)"), Ue = ({ matches: Ce }) => {
        _e(ve, Ce ? ks : Aa, !0);
      };
      "addEventListener" in re ? re.addEventListener("change", Ue) : re.addListener(Ue);
    }
  });
  const ie = (re) => {
    F()?.(re), x(Y) && !re.currentTarget.contains(re.relatedTarget) && (_e(Y, !1), x(se) && (x(se).focus({ preventScroll: !0 }), _e(se, null)));
  }, he = (re) => {
    N()?.(re), !(re.target instanceof HTMLElement && re.target.dataset.dismissable === "false") && (x(Y) || (_e(Y, !0), _e(se, re.relatedTarget, !0)));
  }, ke = (re) => {
    H()?.(re), !(re.target instanceof HTMLElement && re.target.dataset.dismissable === "false") && _e(ge, !0);
  }, Me = (re) => {
    W()?.(re), _e(Z, !0);
  }, te = (re) => {
    M()?.(re), x(ge) || _e(Z, !1);
  }, fe = (re) => {
    O()?.(re), _e(Z, !0);
  }, be = (re) => {
    U()?.(re), _e(Z, !1);
  }, Oe = (re) => {
    S()?.(re), _e(ge, !1);
  };
  Bf.set(new Vf());
  var Ve = {
    get invert() {
      return n();
    },
    set invert(re = !1) {
      n(re), o();
    },
    get position() {
      return a();
    },
    set position(re = "bottom-right") {
      a(re), o();
    },
    get hotkey() {
      return s();
    },
    set hotkey(re = ["altKey", "KeyT"]) {
      s(re), o();
    },
    get expand() {
      return i();
    },
    set expand(re = !1) {
      i(re), o();
    },
    get closeButton() {
      return d();
    },
    set closeButton(re = !1) {
      d(re), o();
    },
    get offset() {
      return c();
    },
    set offset(re = Vs) {
      c(re), o();
    },
    get mobileOffset() {
      return u();
    },
    set mobileOffset(re = qs) {
      u(re), o();
    },
    get theme() {
      return f();
    },
    set theme(re = "light") {
      f(re), o();
    },
    get richColors() {
      return v();
    },
    set richColors(re = !1) {
      v(re), o();
    },
    get duration() {
      return g();
    },
    set duration(re = go) {
      g(re), o();
    },
    get visibleToasts() {
      return h();
    },
    set visibleToasts(re = vo) {
      h(re), o();
    },
    get toastOptions() {
      return m();
    },
    set toastOptions(re = {}) {
      m(re), o();
    },
    get dir() {
      return _();
    },
    set dir(re = "auto") {
      _(re), o();
    },
    get gap() {
      return w();
    },
    set gap(re = ho) {
      w(re), o();
    },
    get loadingIcon() {
      return p();
    },
    set loadingIcon(re) {
      p(re), o();
    },
    get successIcon() {
      return b();
    },
    set successIcon(re) {
      b(re), o();
    },
    get errorIcon() {
      return C();
    },
    set errorIcon(re) {
      C(re), o();
    },
    get warningIcon() {
      return T();
    },
    set warningIcon(re) {
      T(re), o();
    },
    get closeIcon() {
      return P();
    },
    set closeIcon(re) {
      P(re), o();
    },
    get infoIcon() {
      return y();
    },
    set infoIcon(re) {
      y(re), o();
    },
    get containerAriaLabel() {
      return E();
    },
    set containerAriaLabel(re = "Notifications") {
      E(re), o();
    },
    get class() {
      return z();
    },
    set class(re) {
      z(re), o();
    },
    get closeButtonAriaLabel() {
      return B();
    },
    set closeButtonAriaLabel(re = "Close toast") {
      B(re), o();
    },
    get onblur() {
      return F();
    },
    set onblur(re) {
      F(re), o();
    },
    get onfocus() {
      return N();
    },
    set onfocus(re) {
      N(re), o();
    },
    get onmouseenter() {
      return W();
    },
    set onmouseenter(re) {
      W(re), o();
    },
    get onmousemove() {
      return O();
    },
    set onmousemove(re) {
      O(re), o();
    },
    get onmouseleave() {
      return M();
    },
    set onmouseleave(re) {
      M(re), o();
    },
    get ondragend() {
      return U();
    },
    set ondragend(re) {
      U(re), o();
    },
    get onpointerdown() {
      return H();
    },
    set onpointerdown(re) {
      H(re), o();
    },
    get onpointerup() {
      return S();
    },
    set onpointerup(re) {
      S(re), o();
    }
  }, $e = gv();
  ae($e, "tabindex", -1);
  var vt = L($e);
  {
    var Ze = (re) => {
      var Ue = le(), Ce = K(Ue);
      Pr(Ce, 18, () => x(Q), (Ee) => Ee, (Ee, qe, Je, At) => {
        const cr = /* @__PURE__ */ J(() => {
          const [lt, Zt] = qe.split("-");
          return { y: lt, x: Zt };
        }), ot = /* @__PURE__ */ J(() => fv(c(), u()));
        var _t = vv();
        dt(
          _t,
          (lt, Zt) => ({
            tabindex: -1,
            dir: lt,
            class: z(),
            "data-sonner-toaster": !0,
            "data-sonner-theme": x(ve),
            "data-y-position": x(cr).y,
            "data-x-position": x(cr).x,
            style: e.style,
            onblur: ie,
            onfocus: he,
            onmouseenter: Me,
            onmousemove: fe,
            onmouseleave: te,
            ondragend: be,
            onpointerdown: ke,
            onpointerup: Oe,
            ...I,
            [An]: Zt
          }),
          [
            q,
            () => ({
              "--front-toast-height": `${rt.heights[0]?.height}px`,
              "--width": `${dv}px`,
              "--gap": `${w()}px`,
              "--offset-top": x(ot)["--offset-top"],
              "--offset-right": x(ot)["--offset-right"],
              "--offset-bottom": x(ot)["--offset-bottom"],
              "--offset-left": x(ot)["--offset-left"],
              "--mobile-offset-top": x(ot)["--mobile-offset-top"],
              "--mobile-offset-right": x(ot)["--mobile-offset-right"],
              "--mobile-offset-bottom": x(ot)["--mobile-offset-bottom"],
              "--mobile-offset-left": x(ot)["--mobile-offset-left"]
            })
          ],
          void 0,
          "svelte-nbs0zk"
        ), Pr(_t, 23, () => rt.toasts.filter((lt) => !lt.position && x(Je) === 0 || lt.position === qe), (lt) => lt.id, (lt, Zt, Hr, ne) => {
          {
            const ct = (Re) => {
              var Qe = le(), It = K(Qe);
              {
                var zt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  me(ht, () => b() ?? je), k(Ne, Ge);
                }, Rt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  {
                    var Yt = (Le) => {
                      Ul(Le);
                    };
                    V(
                      ht,
                      (Le) => {
                        b() !== null && Le(Yt);
                      },
                      !0
                    );
                  }
                  k(Ne, Ge);
                };
                V(It, (Ne) => {
                  b() ? Ne(zt) : Ne(Rt, !1);
                });
              }
              k(Re, Qe);
            }, wt = (Re) => {
              var Qe = le(), It = K(Qe);
              {
                var zt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  me(ht, () => C() ?? je), k(Ne, Ge);
                }, Rt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  {
                    var Yt = (Le) => {
                      Vl(Le);
                    };
                    V(
                      ht,
                      (Le) => {
                        C() !== null && Le(Yt);
                      },
                      !0
                    );
                  }
                  k(Ne, Ge);
                };
                V(It, (Ne) => {
                  C() ? Ne(zt) : Ne(Rt, !1);
                });
              }
              k(Re, Qe);
            }, Se = (Re) => {
              var Qe = le(), It = K(Qe);
              {
                var zt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  me(ht, () => T() ?? je), k(Ne, Ge);
                }, Rt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  {
                    var Yt = (Le) => {
                      ql(Le);
                    };
                    V(
                      ht,
                      (Le) => {
                        T() !== null && Le(Yt);
                      },
                      !0
                    );
                  }
                  k(Ne, Ge);
                };
                V(It, (Ne) => {
                  T() ? Ne(zt) : Ne(Rt, !1);
                });
              }
              k(Re, Qe);
            }, Dt = (Re) => {
              var Qe = le(), It = K(Qe);
              {
                var zt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  me(ht, () => y() ?? je), k(Ne, Ge);
                }, Rt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  {
                    var Yt = (Le) => {
                      Hl(Le);
                    };
                    V(
                      ht,
                      (Le) => {
                        y() !== null && Le(Yt);
                      },
                      !0
                    );
                  }
                  k(Ne, Ge);
                };
                V(It, (Ne) => {
                  y() ? Ne(zt) : Ne(Rt, !1);
                });
              }
              k(Re, Qe);
            }, ft = (Re) => {
              var Qe = le(), It = K(Qe);
              {
                var zt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  me(ht, () => P() ?? je), k(Ne, Ge);
                }, Rt = (Ne) => {
                  var Ge = le(), ht = K(Ge);
                  {
                    var Yt = (Le) => {
                      Fl(Le);
                    };
                    V(
                      ht,
                      (Le) => {
                        P() !== null && Le(Yt);
                      },
                      !0
                    );
                  }
                  k(Ne, Ge);
                };
                V(It, (Ne) => {
                  P() ? Ne(zt) : Ne(Rt, !1);
                });
              }
              k(Re, Qe);
            };
            let gt = /* @__PURE__ */ J(() => m()?.duration ?? g()), Fr = /* @__PURE__ */ J(() => m()?.class ?? ""), Jt = /* @__PURE__ */ J(() => m()?.descriptionClass || ""), jr = /* @__PURE__ */ J(() => m()?.style ?? ""), ce = /* @__PURE__ */ J(() => m().classes || {}), De = /* @__PURE__ */ J(() => m().unstyled ?? !1), He = /* @__PURE__ */ J(() => m()?.cancelButtonStyle ?? ""), et = /* @__PURE__ */ J(() => m()?.actionButtonStyle ?? ""), st = /* @__PURE__ */ J(() => m()?.closeButtonAriaLabel ?? B());
            Rl(lt, {
              get index() {
                return x(Hr);
              },
              get toast() {
                return x(Zt);
              },
              get defaultRichColors() {
                return v();
              },
              get duration() {
                return x(gt);
              },
              get class() {
                return x(Fr);
              },
              get descriptionClass() {
                return x(Jt);
              },
              get invert() {
                return n();
              },
              get visibleToasts() {
                return h();
              },
              get closeButton() {
                return d();
              },
              get interacting() {
                return x(ge);
              },
              get position() {
                return qe;
              },
              get style() {
                return x(jr);
              },
              get classes() {
                return x(ce);
              },
              get unstyled() {
                return x(De);
              },
              get cancelButtonStyle() {
                return x(He);
              },
              get actionButtonStyle() {
                return x(et);
              },
              get closeButtonAriaLabel() {
                return x(st);
              },
              get expandByDefault() {
                return i();
              },
              get expanded() {
                return x(Z);
              },
              get loadingIcon() {
                return p();
              },
              successIcon: ct,
              errorIcon: wt,
              warningIcon: Se,
              infoIcon: Dt,
              closeIcon: ft,
              $$slots: {
                successIcon: !0,
                errorIcon: !0,
                warningIcon: !0,
                infoIcon: !0,
                closeIcon: !0
              }
            });
          }
        }), A(_t), Wn(_t, (lt) => _e(X, lt), () => x(X)), j(() => _t.dir = _t.dir), k(Ee, _t);
      }), k(re, Ue);
    };
    V(vt, (re) => {
      rt.toasts.length > 0 && re(Ze);
    });
  }
  return A($e), j(() => ae($e, "aria-label", `${E() ?? ""} ${x($) ?? ""}`)), k(t, $e), de(Ve);
}
oe(
  mi,
  {
    invert: {},
    position: {},
    hotkey: {},
    expand: {},
    closeButton: {},
    offset: {},
    mobileOffset: {},
    theme: {},
    richColors: {},
    duration: {},
    visibleToasts: {},
    toastOptions: {},
    dir: {},
    gap: {},
    loadingIcon: {},
    successIcon: {},
    errorIcon: {},
    warningIcon: {},
    closeIcon: {},
    infoIcon: {},
    containerAriaLabel: {},
    class: {},
    closeButtonAriaLabel: {},
    onblur: {},
    onfocus: {},
    onmouseenter: {},
    onmousemove: {},
    onmouseleave: {},
    ondragend: {},
    onpointerdown: {},
    onpointerup: {}
  },
  [],
  [],
  !0
);
function mv(t, e) {
  ue(e, !1), Wt(), mi(t, {
    position: "top-center",
    class: "wmn6 sm:wmn-initial",
    style: "z-index: calc(var(--zi-modals) + 1); top: calc(var(--theme-topbar-height, calc(var(--su-static48) + var(--su-static8))) + var(--su-static16))"
  }), de();
}
oe(mv, {}, [], [], !0);
var _v = /* @__PURE__ */ R('<nav class="pl24"><ul class="list-reset s-pagination"><!></ul></nav>');
function jl(t, e) {
  ue(e, !1);
  let r = l(e, "i18nNavigationLabel", 12, "Pagination");
  var n = {
    get i18nNavigationLabel() {
      return r();
    },
    set i18nNavigationLabel(d) {
      r(d), o();
    }
  }, a = _v(), s = L(a), i = L(s);
  return Pt(i, e, "default", {}), A(s), A(a), j(() => ae(a, "aria-label", r())), k(t, a), de(n);
}
oe(jl, { i18nNavigationLabel: {} }, ["default"], [], !0);
var bv = /* @__PURE__ */ R("<li><a><!></a></li>");
function za(t, e) {
  ue(e, !1);
  let r = l(e, "url", 12), n = l(e, "selected", 12, !1);
  var a = {
    get url() {
      return r();
    },
    set url(u) {
      r(u), o();
    },
    get selected() {
      return n();
    },
    set selected(u) {
      n(u), o();
    }
  }, s = bv(), i = L(s);
  let d;
  var c = L(i);
  return Pt(c, e, "default", {}), A(i), A(s), j(
    (u) => {
      d = we(i, 1, "s-pagination--item", null, d, u), ae(i, "aria-current", n() ? "page" : void 0), ae(i, "href", r());
    },
    [() => ({ "is-selected": n() })]
  ), tt("click", i, function(u) {
    qt.call(this, e, u);
  }), k(t, s), de(a);
}
oe(za, { url: {}, selected: {} }, ["default"], [], !0);
var pv = /* @__PURE__ */ R('<li class="s-pagination--item s-pagination--item__clear">…</li>');
function Wl(t) {
  var e = pv();
  k(t, e);
}
oe(Wl, {}, [], [], !0);
const mo = (t, e) => {
  if (e <= 5)
    return Array.from({ length: e }, (s, i) => i + 1);
  const r = [];
  r.push(1);
  let n = Math.max(2, t - 2), a = Math.min(e - 1, t + 2);
  n === 2 && (a = 5), a === e - 1 && (n = e - 4), n > 2 && r.push("…");
  for (let s = n; s <= a; s++)
    r.push(s);
  return a < e - 1 && r.push("…"), r.push(e), r;
};
var wv = /* @__PURE__ */ R(' <span class="v-visible-sr"> </span>', 1), yv = /* @__PURE__ */ R('<span class="v-visible-sr"> </span> ', 1), xv = /* @__PURE__ */ R(' <span class="v-visible-sr"> </span>', 1), Tv = /* @__PURE__ */ R("<!> <!> <!>", 1);
function kv(t, e) {
  ue(e, !1);
  let r = l(e, "page", 12), n = l(e, "totalPages", 12), a = l(e, "urlGenerator", 12), s = l(e, "followLink", 12, !0), i = l(e, "i18nNextText", 12, "Next"), d = l(e, "i18nPrevText", 12, "Prev"), c = l(e, "i18nPageText", 12, "page"), u = l(e, "i18nNavigationLabel", 12, "Pagination");
  const f = li(), v = (h) => (m) => {
    s() || (m.preventDefault(), f("pagechange", h));
  };
  var g = {
    get page() {
      return r();
    },
    set page(h) {
      r(h), o();
    },
    get totalPages() {
      return n();
    },
    set totalPages(h) {
      n(h), o();
    },
    get urlGenerator() {
      return a();
    },
    set urlGenerator(h) {
      a(h), o();
    },
    get followLink() {
      return s();
    },
    set followLink(h) {
      s(h), o();
    },
    get i18nNextText() {
      return i();
    },
    set i18nNextText(h) {
      i(h), o();
    },
    get i18nPrevText() {
      return d();
    },
    set i18nPrevText(h) {
      d(h), o();
    },
    get i18nPageText() {
      return c();
    },
    set i18nPageText(h) {
      c(h), o();
    },
    get i18nNavigationLabel() {
      return u();
    },
    set i18nNavigationLabel(h) {
      u(h), o();
    }
  };
  return Wt(), jl(t, {
    get i18nNavigationLabel() {
      return u();
    },
    children: (h, m) => {
      var _ = Tv(), w = K(_);
      {
        var p = (P) => {
          var y = /* @__PURE__ */ J(() => v(r() - 1));
          {
            let E = /* @__PURE__ */ Gt(() => (Te(a()), Te(r()), ye(() => a()(r() - 1))));
            za(P, {
              get url() {
                return x(E);
              },
              $$events: {
                click(...z) {
                  x(y)?.apply(this, z);
                }
              },
              children: (z, B) => {
                mt();
                var F = wv(), N = K(F), W = D(N), O = L(W, !0);
                A(W), j(() => {
                  ee(N, `${d() ?? ""} `), ee(O, c());
                }), k(z, F);
              },
              $$slots: { default: !0 }
            });
          }
        };
        V(w, (P) => {
          r() > 1 && P(p);
        });
      }
      var b = D(w, 2);
      Pr(
        b,
        3,
        () => (Te(mo), Te(r()), Te(n()), ye(() => mo(r(), n()))),
        (P, y) => P.toString() + y,
        (P, y) => {
          var E = le(), z = K(E);
          {
            var B = (N) => {
              var W = /* @__PURE__ */ J(() => v(x(y)));
              {
                let O = /* @__PURE__ */ Gt(() => (Te(a()), x(y), ye(() => a()(x(y))))), M = /* @__PURE__ */ Gt(() => x(y) === r());
                za(N, {
                  get url() {
                    return x(O);
                  },
                  get selected() {
                    return x(M);
                  },
                  $$events: {
                    click(...U) {
                      x(W)?.apply(this, U);
                    }
                  },
                  children: (U, H) => {
                    var S = yv(), I = K(S), q = L(I, !0);
                    A(I);
                    var Q = D(I);
                    j(() => {
                      ee(q, c()), ee(Q, ` ${x(y) ?? ""}`);
                    }), k(U, S);
                  },
                  $$slots: { default: !0 }
                });
              }
            }, F = (N) => {
              Wl(N);
            };
            V(z, (N) => {
              typeof x(y) == "number" ? N(B) : N(F, !1);
            });
          }
          k(P, E);
        }
      );
      var C = D(b, 2);
      {
        var T = (P) => {
          var y = /* @__PURE__ */ J(() => v(r() + 1));
          {
            let E = /* @__PURE__ */ Gt(() => (Te(a()), Te(r()), ye(() => a()(r() + 1))));
            za(P, {
              get url() {
                return x(E);
              },
              $$events: {
                click(...z) {
                  x(y)?.apply(this, z);
                }
              },
              children: (z, B) => {
                mt();
                var F = xv(), N = K(F), W = D(N), O = L(W, !0);
                A(W), j(() => {
                  ee(N, `${i() ?? ""} `), ee(O, c());
                }), k(z, F);
              },
              $$slots: { default: !0 }
            });
          }
        };
        V(C, (P) => {
          r() < n() && P(T);
        });
      }
      k(h, _);
    },
    $$slots: { default: !0 }
  }), de(g);
}
oe(
  kv,
  {
    page: {},
    totalPages: {},
    urlGenerator: {},
    followLink: {},
    i18nNextText: {},
    i18nPrevText: {},
    i18nPageText: {},
    i18nNavigationLabel: {}
  },
  [],
  [],
  !0
);
const Ur = Math.min, Sr = Math.max, Va = Math.round, Ea = Math.floor, Ar = (t) => ({
  x: t,
  y: t
}), Cv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Sv = {
  start: "end",
  end: "start"
};
function Av(t, e, r) {
  return Sr(t, Ur(e, r));
}
function pa(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Kr(t) {
  return t.split("-")[0];
}
function wa(t) {
  return t.split("-")[1];
}
function Ev(t) {
  return t === "x" ? "y" : "x";
}
function _i(t) {
  return t === "y" ? "height" : "width";
}
const Lv = /* @__PURE__ */ new Set(["top", "bottom"]);
function Yr(t) {
  return Lv.has(Kr(t)) ? "y" : "x";
}
function bi(t) {
  return Ev(Yr(t));
}
function Pv(t, e, r) {
  r === void 0 && (r = !1);
  const n = wa(t), a = bi(t), s = _i(a);
  let i = a === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return e.reference[s] > e.floating[s] && (i = qa(i)), [i, qa(i)];
}
function Iv(t) {
  const e = qa(t);
  return [Hs(t), e, Hs(e)];
}
function Hs(t) {
  return t.replace(/start|end/g, (e) => Sv[e]);
}
const _o = ["left", "right"], bo = ["right", "left"], zv = ["top", "bottom"], Mv = ["bottom", "top"];
function Ov(t, e, r) {
  switch (t) {
    case "top":
    case "bottom":
      return r ? e ? bo : _o : e ? _o : bo;
    case "left":
    case "right":
      return e ? zv : Mv;
    default:
      return [];
  }
}
function Nv(t, e, r, n) {
  const a = wa(t);
  let s = Ov(Kr(t), r === "start", n);
  return a && (s = s.map((i) => i + "-" + a), e && (s = s.concat(s.map(Hs)))), s;
}
function qa(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Cv[e]);
}
function Bv(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function pi(t) {
  return typeof t != "number" ? Bv(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Bn(t) {
  const {
    x: e,
    y: r,
    width: n,
    height: a
  } = t;
  return {
    width: n,
    height: a,
    top: r,
    left: e,
    right: e + n,
    bottom: r + a,
    x: e,
    y: r
  };
}
function po(t, e, r) {
  let {
    reference: n,
    floating: a
  } = t;
  const s = Yr(e), i = bi(e), d = _i(i), c = Kr(e), u = s === "y", f = n.x + n.width / 2 - a.width / 2, v = n.y + n.height / 2 - a.height / 2, g = n[d] / 2 - a[d] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: f,
        y: n.y - a.height
      };
      break;
    case "bottom":
      h = {
        x: f,
        y: n.y + n.height
      };
      break;
    case "right":
      h = {
        x: n.x + n.width,
        y: v
      };
      break;
    case "left":
      h = {
        x: n.x - a.width,
        y: v
      };
      break;
    default:
      h = {
        x: n.x,
        y: n.y
      };
  }
  switch (wa(e)) {
    case "start":
      h[i] -= g * (r && u ? -1 : 1);
      break;
    case "end":
      h[i] += g * (r && u ? -1 : 1);
      break;
  }
  return h;
}
const Dv = async (t, e, r) => {
  const {
    placement: n = "bottom",
    strategy: a = "absolute",
    middleware: s = [],
    platform: i
  } = r, d = s.filter(Boolean), c = await (i.isRTL == null ? void 0 : i.isRTL(e));
  let u = await i.getElementRects({
    reference: t,
    floating: e,
    strategy: a
  }), {
    x: f,
    y: v
  } = po(u, n, c), g = n, h = {}, m = 0;
  for (let _ = 0; _ < d.length; _++) {
    const {
      name: w,
      fn: p
    } = d[_], {
      x: b,
      y: C,
      data: T,
      reset: P
    } = await p({
      x: f,
      y: v,
      initialPlacement: n,
      placement: g,
      strategy: a,
      middlewareData: h,
      rects: u,
      platform: i,
      elements: {
        reference: t,
        floating: e
      }
    });
    f = b ?? f, v = C ?? v, h = {
      ...h,
      [w]: {
        ...h[w],
        ...T
      }
    }, P && m <= 50 && (m++, typeof P == "object" && (P.placement && (g = P.placement), P.rects && (u = P.rects === !0 ? await i.getElementRects({
      reference: t,
      floating: e,
      strategy: a
    }) : P.rects), {
      x: f,
      y: v
    } = po(u, g, c)), _ = -1);
  }
  return {
    x: f,
    y: v,
    placement: g,
    strategy: a,
    middlewareData: h
  };
};
async function Rv(t, e) {
  var r;
  e === void 0 && (e = {});
  const {
    x: n,
    y: a,
    platform: s,
    rects: i,
    elements: d,
    strategy: c
  } = t, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: v = "floating",
    altBoundary: g = !1,
    padding: h = 0
  } = pa(e, t), m = pi(h), w = d[g ? v === "floating" ? "reference" : "floating" : v], p = Bn(await s.getClippingRect({
    element: (r = await (s.isElement == null ? void 0 : s.isElement(w))) == null || r ? w : w.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(d.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), b = v === "floating" ? {
    x: n,
    y: a,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d.floating)), T = await (s.isElement == null ? void 0 : s.isElement(C)) ? await (s.getScale == null ? void 0 : s.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, P = Bn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: d,
    rect: b,
    offsetParent: C,
    strategy: c
  }) : b);
  return {
    top: (p.top - P.top + m.top) / T.y,
    bottom: (P.bottom - p.bottom + m.bottom) / T.y,
    left: (p.left - P.left + m.left) / T.x,
    right: (P.right - p.right + m.right) / T.x
  };
}
const Uv = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: r,
      y: n,
      placement: a,
      rects: s,
      platform: i,
      elements: d,
      middlewareData: c
    } = e, {
      element: u,
      padding: f = 0
    } = pa(t, e) || {};
    if (u == null)
      return {};
    const v = pi(f), g = {
      x: r,
      y: n
    }, h = bi(a), m = _i(h), _ = await i.getDimensions(u), w = h === "y", p = w ? "top" : "left", b = w ? "bottom" : "right", C = w ? "clientHeight" : "clientWidth", T = s.reference[m] + s.reference[h] - g[h] - s.floating[m], P = g[h] - s.reference[h], y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
    let E = y ? y[C] : 0;
    (!E || !await (i.isElement == null ? void 0 : i.isElement(y))) && (E = d.floating[C] || s.floating[m]);
    const z = T / 2 - P / 2, B = E / 2 - _[m] / 2 - 1, F = Ur(v[p], B), N = Ur(v[b], B), W = F, O = E - _[m] - N, M = E / 2 - _[m] / 2 + z, U = Av(W, M, O), H = !c.arrow && wa(a) != null && M !== U && s.reference[m] / 2 - (M < W ? F : N) - _[m] / 2 < 0, S = H ? M < W ? M - W : M - O : 0;
    return {
      [h]: g[h] + S,
      data: {
        [h]: U,
        centerOffset: M - U - S,
        ...H && {
          alignmentOffset: S
        }
      },
      reset: H
    };
  }
}), Vv = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var r, n;
      const {
        placement: a,
        middlewareData: s,
        rects: i,
        initialPlacement: d,
        platform: c,
        elements: u
      } = e, {
        mainAxis: f = !0,
        crossAxis: v = !0,
        fallbackPlacements: g,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: _ = !0,
        ...w
      } = pa(t, e);
      if ((r = s.arrow) != null && r.alignmentOffset)
        return {};
      const p = Kr(a), b = Yr(d), C = Kr(d) === d, T = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), P = g || (C || !_ ? [qa(d)] : Iv(d)), y = m !== "none";
      !g && y && P.push(...Nv(d, _, m, T));
      const E = [d, ...P], z = await Rv(e, w), B = [];
      let F = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (f && B.push(z[p]), v) {
        const M = Pv(a, i, T);
        B.push(z[M[0]], z[M[1]]);
      }
      if (F = [...F, {
        placement: a,
        overflows: B
      }], !B.every((M) => M <= 0)) {
        var N, W;
        const M = (((N = s.flip) == null ? void 0 : N.index) || 0) + 1, U = E[M];
        if (U && (!(v === "alignment" ? b !== Yr(U) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        F.every((I) => Yr(I.placement) === b ? I.overflows[0] > 0 : !0)))
          return {
            data: {
              index: M,
              overflows: F
            },
            reset: {
              placement: U
            }
          };
        let H = (W = F.filter((S) => S.overflows[0] <= 0).sort((S, I) => S.overflows[1] - I.overflows[1])[0]) == null ? void 0 : W.placement;
        if (!H)
          switch (h) {
            case "bestFit": {
              var O;
              const S = (O = F.filter((I) => {
                if (y) {
                  const q = Yr(I.placement);
                  return q === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  q === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((q) => q > 0).reduce((q, Q) => q + Q, 0)]).sort((I, q) => I[1] - q[1])[0]) == null ? void 0 : O[0];
              S && (H = S);
              break;
            }
            case "initialPlacement":
              H = d;
              break;
          }
        if (a !== H)
          return {
            reset: {
              placement: H
            }
          };
      }
      return {};
    }
  };
};
function Yl(t) {
  const e = Ur(...t.map((s) => s.left)), r = Ur(...t.map((s) => s.top)), n = Sr(...t.map((s) => s.right)), a = Sr(...t.map((s) => s.bottom));
  return {
    x: e,
    y: r,
    width: n - e,
    height: a - r
  };
}
function qv(t) {
  const e = t.slice().sort((a, s) => a.y - s.y), r = [];
  let n = null;
  for (let a = 0; a < e.length; a++) {
    const s = e[a];
    !n || s.y - n.y > n.height / 2 ? r.push([s]) : r[r.length - 1].push(s), n = s;
  }
  return r.map((a) => Bn(Yl(a)));
}
const Hv = function(t) {
  return t === void 0 && (t = {}), {
    name: "inline",
    options: t,
    async fn(e) {
      const {
        placement: r,
        elements: n,
        rects: a,
        platform: s,
        strategy: i
      } = e, {
        padding: d = 2,
        x: c,
        y: u
      } = pa(t, e), f = Array.from(await (s.getClientRects == null ? void 0 : s.getClientRects(n.reference)) || []), v = qv(f), g = Bn(Yl(f)), h = pi(d);
      function m() {
        if (v.length === 2 && v[0].left > v[1].right && c != null && u != null)
          return v.find((w) => c > w.left - h.left && c < w.right + h.right && u > w.top - h.top && u < w.bottom + h.bottom) || g;
        if (v.length >= 2) {
          if (Yr(r) === "y") {
            const F = v[0], N = v[v.length - 1], W = Kr(r) === "top", O = F.top, M = N.bottom, U = W ? F.left : N.left, H = W ? F.right : N.right, S = H - U, I = M - O;
            return {
              top: O,
              bottom: M,
              left: U,
              right: H,
              width: S,
              height: I,
              x: U,
              y: O
            };
          }
          const w = Kr(r) === "left", p = Sr(...v.map((F) => F.right)), b = Ur(...v.map((F) => F.left)), C = v.filter((F) => w ? F.left === b : F.right === p), T = C[0].top, P = C[C.length - 1].bottom, y = b, E = p, z = E - y, B = P - T;
          return {
            top: T,
            bottom: P,
            left: y,
            right: E,
            width: z,
            height: B,
            x: y,
            y: T
          };
        }
        return g;
      }
      const _ = await s.getElementRects({
        reference: {
          getBoundingClientRect: m
        },
        floating: n.floating,
        strategy: i
      });
      return a.reference.x !== _.reference.x || a.reference.y !== _.reference.y || a.reference.width !== _.reference.width || a.reference.height !== _.reference.height ? {
        reset: {
          rects: _
        }
      } : {};
    }
  };
}, Fv = /* @__PURE__ */ new Set(["left", "top"]);
async function jv(t, e) {
  const {
    placement: r,
    platform: n,
    elements: a
  } = t, s = await (n.isRTL == null ? void 0 : n.isRTL(a.floating)), i = Kr(r), d = wa(r), c = Yr(r) === "y", u = Fv.has(i) ? -1 : 1, f = s && c ? -1 : 1, v = pa(e, t);
  let {
    mainAxis: g,
    crossAxis: h,
    alignmentAxis: m
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return d && typeof m == "number" && (h = d === "end" ? m * -1 : m), c ? {
    x: h * f,
    y: g * u
  } : {
    x: g * u,
    y: h * f
  };
}
const Wv = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var r, n;
      const {
        x: a,
        y: s,
        placement: i,
        middlewareData: d
      } = e, c = await jv(e, t);
      return i === ((r = d.offset) == null ? void 0 : r.placement) && (n = d.arrow) != null && n.alignmentOffset ? {} : {
        x: a + c.x,
        y: s + c.y,
        data: {
          ...c,
          placement: i
        }
      };
    }
  };
};
function as() {
  return typeof window < "u";
}
function Yn(t) {
  return Gl(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function nr(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Mr(t) {
  var e;
  return (e = (Gl(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Gl(t) {
  return as() ? t instanceof Node || t instanceof nr(t).Node : !1;
}
function br(t) {
  return as() ? t instanceof Element || t instanceof nr(t).Element : !1;
}
function Ir(t) {
  return as() ? t instanceof HTMLElement || t instanceof nr(t).HTMLElement : !1;
}
function wo(t) {
  return !as() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof nr(t).ShadowRoot;
}
const Yv = /* @__PURE__ */ new Set(["inline", "contents"]);
function ya(t) {
  const {
    overflow: e,
    overflowX: r,
    overflowY: n,
    display: a
  } = pr(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + n + r) && !Yv.has(a);
}
const Gv = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Xv(t) {
  return Gv.has(Yn(t));
}
const Kv = [":popover-open", ":modal"];
function ss(t) {
  return Kv.some((e) => {
    try {
      return t.matches(e);
    } catch {
      return !1;
    }
  });
}
const Qv = ["transform", "translate", "scale", "rotate", "perspective"], Zv = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Jv = ["paint", "layout", "strict", "content"];
function wi(t) {
  const e = yi(), r = br(t) ? pr(t) : t;
  return Qv.some((n) => r[n] ? r[n] !== "none" : !1) || (r.containerType ? r.containerType !== "normal" : !1) || !e && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !e && (r.filter ? r.filter !== "none" : !1) || Zv.some((n) => (r.willChange || "").includes(n)) || Jv.some((n) => (r.contain || "").includes(n));
}
function $v(t) {
  let e = Qr(t);
  for (; Ir(e) && !Dn(e); ) {
    if (wi(e))
      return e;
    if (ss(e))
      return null;
    e = Qr(e);
  }
  return null;
}
function yi() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const e1 = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function Dn(t) {
  return e1.has(Yn(t));
}
function pr(t) {
  return nr(t).getComputedStyle(t);
}
function is(t) {
  return br(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function Qr(t) {
  if (Yn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    wo(t) && t.host || // Fallback.
    Mr(t)
  );
  return wo(e) ? e.host : e;
}
function Xl(t) {
  const e = Qr(t);
  return Dn(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Ir(e) && ya(e) ? e : Xl(e);
}
function ia(t, e, r) {
  var n;
  e === void 0 && (e = []), r === void 0 && (r = !0);
  const a = Xl(t), s = a === ((n = t.ownerDocument) == null ? void 0 : n.body), i = nr(a);
  if (s) {
    const d = Fs(i);
    return e.concat(i, i.visualViewport || [], ya(a) ? a : [], d && r ? ia(d) : []);
  }
  return e.concat(a, ia(a, [], r));
}
function Fs(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Kl(t) {
  const e = pr(t);
  let r = parseFloat(e.width) || 0, n = parseFloat(e.height) || 0;
  const a = Ir(t), s = a ? t.offsetWidth : r, i = a ? t.offsetHeight : n, d = Va(r) !== s || Va(n) !== i;
  return d && (r = s, n = i), {
    width: r,
    height: n,
    $: d
  };
}
function xi(t) {
  return br(t) ? t : t.contextElement;
}
function In(t) {
  const e = xi(t);
  if (!Ir(e))
    return Ar(1);
  const r = e.getBoundingClientRect(), {
    width: n,
    height: a,
    $: s
  } = Kl(e);
  let i = (s ? Va(r.width) : r.width) / n, d = (s ? Va(r.height) : r.height) / a;
  return (!i || !Number.isFinite(i)) && (i = 1), (!d || !Number.isFinite(d)) && (d = 1), {
    x: i,
    y: d
  };
}
const t1 = /* @__PURE__ */ Ar(0);
function Ql(t) {
  const e = nr(t);
  return !yi() || !e.visualViewport ? t1 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function r1(t, e, r) {
  return e === void 0 && (e = !1), !r || e && r !== nr(t) ? !1 : e;
}
function mn(t, e, r, n) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  const a = t.getBoundingClientRect(), s = xi(t);
  let i = Ar(1);
  e && (n ? br(n) && (i = In(n)) : i = In(t));
  const d = r1(s, r, n) ? Ql(s) : Ar(0);
  let c = (a.left + d.x) / i.x, u = (a.top + d.y) / i.y, f = a.width / i.x, v = a.height / i.y;
  if (s) {
    const g = nr(s), h = n && br(n) ? nr(n) : n;
    let m = g, _ = Fs(m);
    for (; _ && n && h !== m; ) {
      const w = In(_), p = _.getBoundingClientRect(), b = pr(_), C = p.left + (_.clientLeft + parseFloat(b.paddingLeft)) * w.x, T = p.top + (_.clientTop + parseFloat(b.paddingTop)) * w.y;
      c *= w.x, u *= w.y, f *= w.x, v *= w.y, c += C, u += T, m = nr(_), _ = Fs(m);
    }
  }
  return Bn({
    width: f,
    height: v,
    x: c,
    y: u
  });
}
function os(t, e) {
  const r = is(t).scrollLeft;
  return e ? e.left + r : mn(Mr(t)).left + r;
}
function Zl(t, e) {
  const r = t.getBoundingClientRect(), n = r.left + e.scrollLeft - os(t, r), a = r.top + e.scrollTop;
  return {
    x: n,
    y: a
  };
}
function n1(t) {
  let {
    elements: e,
    rect: r,
    offsetParent: n,
    strategy: a
  } = t;
  const s = a === "fixed", i = Mr(n), d = e ? ss(e.floating) : !1;
  if (n === i || d && s)
    return r;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Ar(1);
  const f = Ar(0), v = Ir(n);
  if ((v || !v && !s) && ((Yn(n) !== "body" || ya(i)) && (c = is(n)), Ir(n))) {
    const h = mn(n);
    u = In(n), f.x = h.x + n.clientLeft, f.y = h.y + n.clientTop;
  }
  const g = i && !v && !s ? Zl(i, c) : Ar(0);
  return {
    width: r.width * u.x,
    height: r.height * u.y,
    x: r.x * u.x - c.scrollLeft * u.x + f.x + g.x,
    y: r.y * u.y - c.scrollTop * u.y + f.y + g.y
  };
}
function a1(t) {
  return Array.from(t.getClientRects());
}
function s1(t) {
  const e = Mr(t), r = is(t), n = t.ownerDocument.body, a = Sr(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), s = Sr(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let i = -r.scrollLeft + os(t);
  const d = -r.scrollTop;
  return pr(n).direction === "rtl" && (i += Sr(e.clientWidth, n.clientWidth) - a), {
    width: a,
    height: s,
    x: i,
    y: d
  };
}
const yo = 25;
function i1(t, e) {
  const r = nr(t), n = Mr(t), a = r.visualViewport;
  let s = n.clientWidth, i = n.clientHeight, d = 0, c = 0;
  if (a) {
    s = a.width, i = a.height;
    const f = yi();
    (!f || f && e === "fixed") && (d = a.offsetLeft, c = a.offsetTop);
  }
  const u = os(n);
  if (u <= 0) {
    const f = n.ownerDocument, v = f.body, g = getComputedStyle(v), h = f.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, m = Math.abs(n.clientWidth - v.clientWidth - h);
    m <= yo && (s -= m);
  } else u <= yo && (s += u);
  return {
    width: s,
    height: i,
    x: d,
    y: c
  };
}
const o1 = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function l1(t, e) {
  const r = mn(t, !0, e === "fixed"), n = r.top + t.clientTop, a = r.left + t.clientLeft, s = Ir(t) ? In(t) : Ar(1), i = t.clientWidth * s.x, d = t.clientHeight * s.y, c = a * s.x, u = n * s.y;
  return {
    width: i,
    height: d,
    x: c,
    y: u
  };
}
function xo(t, e, r) {
  let n;
  if (e === "viewport")
    n = i1(t, r);
  else if (e === "document")
    n = s1(Mr(t));
  else if (br(e))
    n = l1(e, r);
  else {
    const a = Ql(t);
    n = {
      x: e.x - a.x,
      y: e.y - a.y,
      width: e.width,
      height: e.height
    };
  }
  return Bn(n);
}
function Jl(t, e) {
  const r = Qr(t);
  return r === e || !br(r) || Dn(r) ? !1 : pr(r).position === "fixed" || Jl(r, e);
}
function c1(t, e) {
  const r = e.get(t);
  if (r)
    return r;
  let n = ia(t, [], !1).filter((d) => br(d) && Yn(d) !== "body"), a = null;
  const s = pr(t).position === "fixed";
  let i = s ? Qr(t) : t;
  for (; br(i) && !Dn(i); ) {
    const d = pr(i), c = wi(i);
    !c && d.position === "fixed" && (a = null), (s ? !c && !a : !c && d.position === "static" && !!a && o1.has(a.position) || ya(i) && !c && Jl(t, i)) ? n = n.filter((f) => f !== i) : a = d, i = Qr(i);
  }
  return e.set(t, n), n;
}
function u1(t) {
  let {
    element: e,
    boundary: r,
    rootBoundary: n,
    strategy: a
  } = t;
  const i = [...r === "clippingAncestors" ? ss(e) ? [] : c1(e, this._c) : [].concat(r), n], d = i[0], c = i.reduce((u, f) => {
    const v = xo(e, f, a);
    return u.top = Sr(v.top, u.top), u.right = Ur(v.right, u.right), u.bottom = Ur(v.bottom, u.bottom), u.left = Sr(v.left, u.left), u;
  }, xo(e, d, a));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function d1(t) {
  const {
    width: e,
    height: r
  } = Kl(t);
  return {
    width: e,
    height: r
  };
}
function f1(t, e, r) {
  const n = Ir(e), a = Mr(e), s = r === "fixed", i = mn(t, !0, s, e);
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Ar(0);
  function u() {
    c.x = os(a);
  }
  if (n || !n && !s)
    if ((Yn(e) !== "body" || ya(a)) && (d = is(e)), n) {
      const h = mn(e, !0, s, e);
      c.x = h.x + e.clientLeft, c.y = h.y + e.clientTop;
    } else a && u();
  s && !n && a && u();
  const f = a && !n && !s ? Zl(a, d) : Ar(0), v = i.left + d.scrollLeft - c.x - f.x, g = i.top + d.scrollTop - c.y - f.y;
  return {
    x: v,
    y: g,
    width: i.width,
    height: i.height
  };
}
function Cs(t) {
  return pr(t).position === "static";
}
function To(t, e) {
  if (!Ir(t) || pr(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let r = t.offsetParent;
  return Mr(t) === r && (r = r.ownerDocument.body), r;
}
function $l(t, e) {
  const r = nr(t);
  if (ss(t))
    return r;
  if (!Ir(t)) {
    let a = Qr(t);
    for (; a && !Dn(a); ) {
      if (br(a) && !Cs(a))
        return a;
      a = Qr(a);
    }
    return r;
  }
  let n = To(t, e);
  for (; n && Xv(n) && Cs(n); )
    n = To(n, e);
  return n && Dn(n) && Cs(n) && !wi(n) ? r : n || $v(t) || r;
}
const v1 = async function(t) {
  const e = this.getOffsetParent || $l, r = this.getDimensions, n = await r(t.floating);
  return {
    reference: f1(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: n.width,
      height: n.height
    }
  };
};
function g1(t) {
  return pr(t).direction === "rtl";
}
const h1 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: n1,
  getDocumentElement: Mr,
  getClippingRect: u1,
  getOffsetParent: $l,
  getElementRects: v1,
  getClientRects: a1,
  getDimensions: d1,
  getScale: In,
  isElement: br,
  isRTL: g1
};
function ec(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function m1(t, e) {
  let r = null, n;
  const a = Mr(t);
  function s() {
    var d;
    clearTimeout(n), (d = r) == null || d.disconnect(), r = null;
  }
  function i(d, c) {
    d === void 0 && (d = !1), c === void 0 && (c = 1), s();
    const u = t.getBoundingClientRect(), {
      left: f,
      top: v,
      width: g,
      height: h
    } = u;
    if (d || e(), !g || !h)
      return;
    const m = Ea(v), _ = Ea(a.clientWidth - (f + g)), w = Ea(a.clientHeight - (v + h)), p = Ea(f), C = {
      rootMargin: -m + "px " + -_ + "px " + -w + "px " + -p + "px",
      threshold: Sr(0, Ur(1, c)) || 1
    };
    let T = !0;
    function P(y) {
      const E = y[0].intersectionRatio;
      if (E !== c) {
        if (!T)
          return i();
        E ? i(!1, E) : n = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !ec(u, t.getBoundingClientRect()) && i(), T = !1;
    }
    try {
      r = new IntersectionObserver(P, {
        ...C,
        // Handle <iframe>s
        root: a.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(P, C);
    }
    r.observe(t);
  }
  return i(!0), s;
}
function _1(t, e, r, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: a = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: d = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = n, u = xi(t), f = a || s ? [...u ? ia(u) : [], ...ia(e)] : [];
  f.forEach((p) => {
    a && p.addEventListener("scroll", r, {
      passive: !0
    }), s && p.addEventListener("resize", r);
  });
  const v = u && d ? m1(u, r) : null;
  let g = -1, h = null;
  i && (h = new ResizeObserver((p) => {
    let [b] = p;
    b && b.target === u && h && (h.unobserve(e), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var C;
      (C = h) == null || C.observe(e);
    })), r();
  }), u && !c && h.observe(u), h.observe(e));
  let m, _ = c ? mn(t) : null;
  c && w();
  function w() {
    const p = mn(t);
    _ && !ec(_, p) && r(), _ = p, m = requestAnimationFrame(w);
  }
  return r(), () => {
    var p;
    f.forEach((b) => {
      a && b.removeEventListener("scroll", r), s && b.removeEventListener("resize", r);
    }), v?.(), (p = h) == null || p.disconnect(), h = null, c && cancelAnimationFrame(m);
  };
}
const tc = Wv, rc = Vv, b1 = Uv, nc = Hv, p1 = (t, e, r) => {
  const n = /* @__PURE__ */ new Map(), a = {
    platform: h1,
    ...r
  }, s = {
    ...a.platform,
    _c: n
  };
  return Dv(t, e, {
    ...a,
    platform: s
  });
}, ac = (t) => {
  let e, r;
  const n = {
    autoUpdate: !0
  };
  let a = t ?? {};
  const s = (f) => ({ ...n, ...t || {}, ...f || {} }), i = (f) => {
    e && r && (a = s(f), p1(e, r, a).then((v) => {
      Object.assign(r.style, {
        position: v.strategy,
        left: `${v.x}px`,
        top: `${v.y}px`
      }), a?.onComputed && a.onComputed(v);
    }));
  }, d = (f) => {
    if ("subscribe" in f)
      return u(f), {};
    e = f, i();
  }, c = (f, v) => {
    let g;
    r = f, a = s(v), setTimeout(() => i(v), 0), i(v);
    const h = () => {
      g && (g(), g = void 0);
    }, m = (_ = a) => new Promise((w) => {
      const { autoUpdate: p } = _ || {};
      h(), p !== !1 && Ja().then(() => {
        w(_1(e, r, () => i(_), p === !0 ? {} : p));
      });
    });
    return m().then((_) => g = _), {
      update(_) {
        i(_), m().then((w) => g = w);
      },
      destroy() {
        h();
      }
    };
  }, u = (f) => {
    const v = f.subscribe((g) => {
      e === void 0 ? (e = g, i()) : (Object.assign(e, g), i());
    });
    sd(v);
  };
  return [d, c, i];
}, w1 = (t) => ({
  name: "arrow",
  options: t,
  fn(e) {
    const r = Sl(t.element);
    return r ? b1({
      element: r,
      padding: t.padding
    }).fn(e) : {};
  }
}), sc = "popover-context";
function Ti(t) {
  let e = zn(sc);
  if (e === void 0)
    throw new Error(`<${t} /> is missing a parent <Popover /> component.`);
  return e;
}
function ic(t, e) {
  const r = hn(e, ["children", "$$slots", "$$events", "$$legacy", "$$host"]);
  ue(e, !1);
  const n = () => gn(H, "$pstate", s), a = () => gn(T, "$arrowEl", s), [s, i] = ba(), d = /* @__PURE__ */ Tt();
  let c = l(e, "id", 12), u = l(e, "autoshow", 12, !1), f = l(e, "visible", 12, void 0), v = l(e, "placement", 12, "bottom"), g = l(e, "strategy", 12, "absolute"), h = l(e, "trapFocus", 12, !1), m = l(e, "dismissible", 12, !0), _ = l(e, "tooltip", 12, !1);
  const w = 300, p = 100;
  let b, C;
  const T = Ds(), [P, y, E] = ac({
    placement: v(),
    strategy: g(),
    middleware: [tc(10), rc(), nc(), w1({ element: T })],
    onComputed({ placement: Z, middlewareData: ge }) {
      if (Sa(H, ye(n).computedPlacement = Z, ye(n)), ge.arrow && a()) {
        const { x: ve, y: X } = ge.arrow;
        Object.assign(a().style, {
          left: ve != null ? `${ve}px` : "",
          top: X != null ? `${X}px` : ""
        });
      }
    }
  }), z = li(), B = (Z = 0) => {
    window.clearTimeout(C), !x(d) && (n().visible || (C = window.setTimeout(
      () => {
        Sa(H, ye(n).visible = !0, ye(n)), z("open");
      },
      Z
    )));
  }, F = () => {
    _() && B(w);
  }, N = () => {
    _() && W(p);
  }, W = (Z = 0) => {
    window.clearTimeout(C), !x(d) && n().visible && (C = window.setTimeout(
      () => {
        Sa(H, ye(n).visible = !1, ye(n)), _() || b.focus(), z("close");
      },
      Z
    ));
  }, O = () => {
    n().visible ? W() : B();
  }, M = (Z) => {
    !m() || Z.detail === b || W();
  }, U = (Z) => {
    Z.key === "Escape" && m() && W();
  }, H = Ds({
    id: c(),
    controlled: r.visible !== void 0,
    visible: u(),
    dismissible: m(),
    trapFocus: h(),
    computedPlacement: v(),
    tooltip: _(),
    floatingRef: (Z) => {
      b = Z, P(Z);
    },
    floatingContent: y,
    arrowEl: T,
    onOutclick: M,
    open: B,
    openTooltip: F,
    close: W,
    closeTooltip: N,
    toggle: O
  });
  ga(sc, H), Ft(() => Te(r), () => {
    _e(d, r.visible !== void 0);
  }), Ft(() => (x(d), Te(f())), () => {
    x(d) && Sa(H, ye(n).visible = f(), ye(n));
  }), Ft(() => Te(v()), () => {
    E({ placement: v() });
  }), sr();
  var S = {
    get id() {
      return c();
    },
    set id(Z) {
      c(Z), o();
    },
    get autoshow() {
      return u();
    },
    set autoshow(Z) {
      u(Z), o();
    },
    get visible() {
      return f();
    },
    set visible(Z) {
      f(Z), o();
    },
    get placement() {
      return v();
    },
    set placement(Z) {
      v(Z), o();
    },
    get strategy() {
      return g();
    },
    set strategy(Z) {
      g(Z), o();
    },
    get trapFocus() {
      return h();
    },
    set trapFocus(Z) {
      h(Z), o();
    },
    get dismissible() {
      return m();
    },
    set dismissible(Z) {
      m(Z), o();
    },
    get tooltip() {
      return _();
    },
    set tooltip(Z) {
      _(Z), o();
    }
  };
  Wt();
  var I = le();
  tt("keydown", On, U);
  var q = K(I);
  Pt(
    q,
    e,
    "default",
    {
      get visible() {
        return n(), ye(() => n().visible);
      },
      open: B,
      close: W
    }
  ), k(t, I);
  var Q = de(S);
  return i(), Q;
}
oe(
  ic,
  {
    id: {},
    autoshow: {},
    visible: {},
    placement: {},
    strategy: {},
    trapFocus: {},
    dismissible: {},
    tooltip: {}
  },
  ["default"],
  [],
  !0
);
var y1 = /* @__PURE__ */ R("<span><!></span>");
function oc(t, e) {
  ue(e, !1);
  const r = () => gn(c, "$pstate", n), [n, a] = ba();
  let s = l(e, "elementId", 12, null), i = /* @__PURE__ */ Tt(), d = /* @__PURE__ */ Tt(), c = Ti("PopoverReference");
  const u = (w, p, b) => {
    const C = w ? document.getElementById(w) : p.firstElementChild;
    if (!C)
      throw new Error("No reference element found.");
    return b.floatingRef(C), C;
  }, f = (w, p) => {
    if (w.tagName.toLowerCase() !== "button" && w.role !== "button")
      throw new Error("Reference element must have a role of 'button' for uncontrolled popovers.");
    w.setAttribute("aria-controls", `${p.id}-popover`);
    const b = p.dismissible ? p.toggle : p.open;
    return w.addEventListener("click", b), () => w.removeEventListener("click", b);
  }, v = (w, p) => (w.addEventListener("mouseenter", p.openTooltip), w.addEventListener("mouseleave", p.closeTooltip), w.addEventListener("focusin", p.openTooltip), w.addEventListener("focusout", p.closeTooltip), w.setAttribute("aria-describedby", `${p.id}-popover`), () => {
    w.removeEventListener("mouseenter", p.openTooltip), w.removeEventListener("mouseleave", p.closeTooltip), w.removeEventListener("focusin", p.openTooltip), w.removeEventListener("focusout", p.closeTooltip);
  });
  _a(() => {
    _e(d, u(s(), x(i), r())), !r().controlled && (r().tooltip ? v(x(d), r()) : f(x(d), r()));
  }), Ft(() => (r(), x(d)), () => {
    !r().controlled && !r().tooltip && x(d)?.setAttribute("aria-expanded", (!!r().visible).toString());
  }), sr();
  var g = {
    get elementId() {
      return s();
    },
    set elementId(w) {
      s(w), o();
    }
  };
  Wt();
  var h = y1(), m = L(h);
  Pt(m, e, "default", {}), A(h), Wn(h, (w) => _e(i, w), () => x(i)), k(t, h);
  var _ = de(g);
  return a(), _;
}
oe(oc, { elementId: {} }, ["default"], [], !0);
var x1 = /* @__PURE__ */ R('<button type="button"><!></button>');
function T1(t, e) {
  ue(e, !1);
  const r = () => gn(s, "$pstate", n), [n, a] = ba(), s = Ti("PopoverCloseButton");
  let i = l(e, "label", 12, "Close"), d = l(e, "class", 12, "");
  var c = {
    get label() {
      return i();
    },
    set label(g) {
      i(g), o();
    },
    get class() {
      return d();
    },
    set class(g) {
      d(g), o();
    }
  };
  Wt();
  var u = x1(), f = L(u);
  Ke(f, {
    get src() {
      return vi;
    }
  }), A(u), j(() => {
    ae(u, "aria-label", i()), we(u, 1, `s-popover--close s-btn s-btn__muted ps-absolute${d() ? ` ${d()}` : ""}`);
  }), tt("click", u, function(...g) {
    r().close?.apply(this, g);
  }), tt("click", u, function(g) {
    qt.call(this, e, g);
  }), k(t, u);
  var v = de(c);
  return a(), v;
}
oe(T1, { label: {}, class: {} }, [], [], !0);
var k1 = /* @__PURE__ */ R('<div><div class="s-popover--arrow"></div> <div class="s-popover--content p12 mn12"><div class="ps-relative"><!></div></div></div>');
function lc(t, e) {
  ue(e, !1);
  const r = () => gn(c, "$pstate", a), n = () => gn(f, "$arrowEl", a), [a, s] = ba();
  let i = l(e, "role", 12, null), d = l(e, "class", 12, ""), c = Ti("PopoverContent"), u = /* @__PURE__ */ Tt("s-popover");
  const f = r().arrowEl;
  r().tooltip && _e(u, x(u) + " s-popover__tooltip"), d() && _e(u, x(u) + (" " + d()));
  var v = {
    get role() {
      return i();
    },
    set role(b) {
      i(b), o();
    },
    get class() {
      return d();
    },
    set class(b) {
      d(b), o();
    }
  };
  Wt();
  var g = k1();
  g.__focusin = function(...b) {
    r().openTooltip?.apply(this, b);
  }, g.__focusout = function(...b) {
    r().closeTooltip?.apply(this, b);
  };
  var h = L(g);
  Wn(h, (b) => kd(f, b), () => n());
  var m = D(h, 2), _ = L(m), w = L(_);
  Pt(w, e, "default", {}), A(_), A(m), A(g), Cr(g, (b) => r().floatingContent?.(b)), Cr(g, (b, C) => Bl?.(b, C), () => ({ active: r().trapFocus && !!r().visible })), Cr(g, (b) => Nl?.(b)), j(() => {
    ae(g, "id", (r(), ye(() => `${r().id}-popover`))), we(g, 1, (x(u), r(), ye(() => `${x(u)}${r().visible ? " is-visible" : ""}`))), ae(g, "role", (Te(i()), r(), ye(() => i() || (r().tooltip ? "tooltip" : "dialog")))), ae(g, "data-popper-placement", (r(), ye(() => r().computedPlacement)));
  }), tt("outclick", g, function(...b) {
    r().onOutclick?.apply(this, b);
  }), tt("mouseenter", g, function(...b) {
    r().openTooltip?.apply(this, b);
  }), tt("mouseleave", g, function(...b) {
    r().closeTooltip?.apply(this, b);
  }), k(t, g);
  var p = de(v);
  return s(), p;
}
jt(["focusin", "focusout"]);
oe(lc, { role: {}, class: {} }, ["default"], [], !0);
var C1 = /* @__PURE__ */ R("<!> ", 1), S1 = /* @__PURE__ */ R('<div class="s-post-summary--content-type"><!></div>');
function cc(t, e) {
  ue(e, !1);
  let r = l(e, "name", 12), n = l(e, "href", 12), a = l(e, "i18nContentTypeText", 12, void 0);
  const s = {
    announcement: "Announcement",
    "how-to-guide": "How-to guide",
    "knowledge-article": "Knowledge article",
    policy: "Policy"
  };
  var i = {
    get name() {
      return r();
    },
    set name(u) {
      r(u), o();
    },
    get href() {
      return n();
    },
    set href(u) {
      n(u), o();
    },
    get i18nContentTypeText() {
      return a();
    },
    set i18nContentTypeText(u) {
      a(u), o();
    }
  }, d = S1(), c = L(d);
  return ns(c, {
    get href() {
      return n();
    },
    class: "s-link s-link__grayscale",
    children: (u, f) => {
      var v = C1(), g = K(v);
      Ke(g, {
        get src() {
          return Rd;
        }
      });
      var h = D(g);
      j(() => ee(h, ` ${Te(a()), Te(r()), ye(() => a() || s[r()]) ?? ""}`)), k(u, v);
    },
    $$slots: { default: !0 }
  }), A(d), k(t, d), de(i);
}
oe(cc, { name: {}, href: {}, i18nContentTypeText: {} }, [], [], !0);
var A1 = /* @__PURE__ */ R("<!> <!>", 1), E1 = /* @__PURE__ */ R("<!> <!>", 1), L1 = /* @__PURE__ */ R("<span><!></span>");
function oa(t, e) {
  ue(e, !0);
  const r = l(e, "award", 7), n = l(e, "filled", 7, !1), a = l(e, "icon", 7, void 0), s = l(e, "iconTitle", 7, void 0), i = l(e, "size", 7, void 0), d = l(e, "variant", 7, void 0), c = l(e, "i18nAwardName", 7, void 0), u = l(e, "class", 7, ""), f = l(e, "children", 7), v = (b, C, T, P) => {
    const y = "s-badge";
    let E = y;
    return u() && (E += ` ${u()}`), b && (E += ` ${y}__filled`), C && (E += ` ${y}__icon`), T && (E += ` ${y}__${T}`), P && (E += ` ${y}__${P}`), E;
  }, g = /* @__PURE__ */ J(() => v(n(), a(), i(), d()));
  var h = {
    get award() {
      return r();
    },
    set award(b) {
      r(b), o();
    },
    get filled() {
      return n();
    },
    set filled(b = !1) {
      n(b), o();
    },
    get icon() {
      return a();
    },
    set icon(b = void 0) {
      a(b), o();
    },
    get iconTitle() {
      return s();
    },
    set iconTitle(b = void 0) {
      s(b), o();
    },
    get size() {
      return i();
    },
    set size(b = void 0) {
      i(b), o();
    },
    get variant() {
      return d();
    },
    set variant(b = void 0) {
      d(b), o();
    },
    get i18nAwardName() {
      return c();
    },
    set i18nAwardName(b = void 0) {
      c(b), o();
    },
    get class() {
      return u();
    },
    set class(b = "") {
      u(b), o();
    },
    get children() {
      return f();
    },
    set children(b) {
      f(b), o();
    }
  }, m = L1(), _ = L(m);
  {
    var w = (b) => {
      {
        let C = /* @__PURE__ */ J(() => c() || r());
        El(b, {
          get type() {
            return r();
          },
          get name() {
            return x(C);
          },
          children: (T, P) => {
            var y = A1(), E = K(y);
            {
              var z = (F) => {
                Ke(F, {
                  get src() {
                    return a();
                  },
                  get title() {
                    return s();
                  }
                });
              };
              V(E, (F) => {
                a() && F(z);
              });
            }
            var B = D(E, 2);
            me(B, f), k(T, y);
          },
          $$slots: { default: !0 }
        });
      }
    }, p = (b) => {
      var C = E1(), T = K(C);
      {
        var P = (E) => {
          Ke(E, {
            get src() {
              return a();
            },
            get title() {
              return s();
            }
          });
        };
        V(T, (E) => {
          a() && E(P);
        });
      }
      var y = D(T, 2);
      me(y, f), k(b, C);
    };
    V(_, (b) => {
      r() ? b(w) : b(p, !1);
    });
  }
  return A(m), j(() => we(m, 1, Ae(x(g)))), k(t, m), de(h);
}
oe(
  oa,
  {
    award: {},
    filled: {},
    icon: {},
    iconTitle: {},
    size: {},
    variant: {},
    i18nAwardName: {},
    class: {},
    children: {}
  },
  [],
  [],
  !0
);
function uc(t, e) {
  ue(e, !1);
  let r = l(e, "state", 12), n = l(e, "i18nText", 12, void 0);
  const a = {
    archived: Od,
    closed: Hd,
    deleted: Kd,
    draft: Fd,
    pinned: Xd,
    review: Vd
  }, s = {
    archived: "muted",
    closed: "danger",
    deleted: "danger",
    draft: "info",
    pinned: "muted",
    review: "warning"
  }, i = (c) => c.charAt(0).toUpperCase() + c.slice(1);
  var d = {
    get state() {
      return r();
    },
    set state(c) {
      r(c), o();
    },
    get i18nText() {
      return n();
    },
    set i18nText(c) {
      n(c), o();
    }
  };
  Wt();
  {
    let c = /* @__PURE__ */ Gt(() => r() === "deleted" || r() === "pinned");
    oa(t, {
      class: "s-post-summary--stats-item",
      get filled() {
        return x(c);
      },
      get icon() {
        return Te(r()), ye(() => a[r()]);
      },
      get variant() {
        return Te(r()), ye(() => s[r()]);
      },
      children: (u, f) => {
        mt();
        var v = Ct();
        j((g) => ee(v, g), [
          () => (Te(n()), Te(r()), ye(() => n() || i(r())))
        ]), k(u, v);
      },
      $$slots: { default: !0 }
    });
  }
  return de(d);
}
oe(uc, { state: {}, i18nText: {} }, [], [], !0);
var P1 = /* @__PURE__ */ R('<span class="s-post-summary--stats-item-unit"> </span>'), I1 = /* @__PURE__ */ R('<div><span class="s-post-summary--stats-item-number"><!> </span> <!></div>');
function En(t, e) {
  ue(e, !1);
  const r = /* @__PURE__ */ Tt();
  let n = l(e, "number", 12), a = l(e, "unit", 12), s = l(e, "hotness", 12, void 0), i = l(e, "variant", 12, void 0), d = l(e, "class", 12, "");
  const c = (p, b, C) => {
    const T = "s-post-summary--stats-item";
    let P = T;
    return p && (P += ` ${p}`), C === "answers" && n() && Number(n()) > 0 && (P += " has-answers"), b && (P += ` is-${b}`), C === "bounty" && (P += " s-badge s-badge__bounty"), C === "votes" && (P += ` ${T}__emphasized`), P;
  };
  Ft(
    () => (Te(d()), Te(s()), Te(i())),
    () => {
      _e(r, c(d(), s(), i()));
    }
  ), sr();
  var u = {
    get number() {
      return n();
    },
    set number(p) {
      n(p), o();
    },
    get unit() {
      return a();
    },
    set unit(p) {
      a(p), o();
    },
    get hotness() {
      return s();
    },
    set hotness(p) {
      s(p), o();
    },
    get variant() {
      return i();
    },
    set variant(p) {
      i(p), o();
    },
    get class() {
      return d();
    },
    set class(p) {
      d(p), o();
    }
  }, f = I1(), v = L(f), g = L(v);
  {
    var h = (p) => {
      var b = Ct("+");
      k(p, b);
    };
    V(g, (p) => {
      i() === "bounty" && p(h);
    });
  }
  var m = D(g, 1, !0);
  A(v);
  var _ = D(v, 2);
  {
    var w = (p) => {
      var b = P1(), C = L(b, !0);
      A(b), j(() => ee(C, a())), k(p, b);
    };
    V(_, (p) => {
      i() !== "bounty" && p(w);
    });
  }
  return A(f), j(() => {
    we(f, 1, Ae(x(r))), ee(m, n());
  }), k(t, f), de(u);
}
oe(En, { number: {}, unit: {}, hotness: {}, variant: {}, class: {} }, [], [], !0);
var z1 = /* @__PURE__ */ R("<p> </p>");
function dc(t, e) {
  ue(e, !1);
  const r = /* @__PURE__ */ Tt();
  let n = l(e, "excerpt", 12), a = l(e, "size", 12, void 0);
  const s = (u) => {
    const f = "s-post-summary--content-excerpt";
    let v = f;
    return u && (v += ` ${f}__${u}`), v;
  };
  Ft(() => Te(a()), () => {
    _e(r, s(a()));
  }), sr();
  var i = {
    get excerpt() {
      return n();
    },
    set excerpt(u) {
      n(u), o();
    },
    get size() {
      return a();
    },
    set size(u) {
      a(u), o();
    }
  }, d = z1(), c = L(d, !0);
  return A(d), j(() => {
    we(d, 1, Ae(x(r))), ee(c, n());
  }), k(t, d), de(i);
}
oe(dc, { excerpt: {}, size: {} }, [], [], !0);
var M1 = /* @__PURE__ */ R('<time class="s-user-card--time"> </time>'), O1 = /* @__PURE__ */ R('<div class="s-badge s-badge__xs s-badge__moderator">Mod</div>'), N1 = /* @__PURE__ */ R('<div class="s-badge s-badge__xs s-badge__staff">Staff</div>'), B1 = /* @__PURE__ */ R('<div class="s-badge s-badge__xs s-badge__admin">Admin</div>'), D1 = /* @__PURE__ */ R(" <!> <!> <!>", 1), R1 = /* @__PURE__ */ R('<li class="s-user-card--rep"> </li>'), U1 = /* @__PURE__ */ R('<li class="s-award-bling s-award-bling__gold"> </li>'), V1 = /* @__PURE__ */ R('<li class="s-award-bling s-award-bling__silver"> </li>'), q1 = /* @__PURE__ */ R('<li class="s-award-bling s-award-bling__bronze"> </li>'), H1 = /* @__PURE__ */ R('<ul class="s-user-card--awards"><!> <!> <!> <!></ul>'), F1 = /* @__PURE__ */ R('<div class="s-user-card--role"> </div>'), j1 = /* @__PURE__ */ R('<div class="s-user-card--location"> </div>'), W1 = /* @__PURE__ */ R('<time class="s-user-card--time"> </time>'), Y1 = /* @__PURE__ */ R('<div class="s-user-card--tags d-flex g4"><!></div>'), G1 = /* @__PURE__ */ R('<div class="s-user-card--type"><!></div>'), X1 = /* @__PURE__ */ R('<div><!> <!> <div class="s-user-card--info as-stretch"><!> <!> <!> <!> <!> <!></div> <!></div>');
function ki(t, e) {
  ue(e, !0);
  const r = l(e, "name", 7), n = l(e, "avatar", 7), a = l(e, "deleted", 7, !1), s = l(e, "highlighted", 7, !1), i = l(e, "href", 7), d = l(e, "location", 7), c = l(e, "reputation", 7), u = l(e, "role", 7), f = l(e, "size", 7), v = l(e, "timestamp", 7), g = l(e, "gold", 7), h = l(e, "silver", 7), m = l(e, "bronze", 7), _ = l(e, "admin", 7, !1), w = l(e, "moderator", 7, !1), p = l(e, "staff", 7, !1), b = l(e, "class", 7, ""), C = l(e, "tags", 7), T = l(e, "type", 7), P = (te, fe, be, Oe) => {
    const Ve = "s-user-card";
    let $e = Ve;
    return te && ($e += ` ${te}`), fe && ($e += ` ${Ve}__deleted`), be && ($e += ` ${Ve}__highlighted`), Oe && ($e += ` ${Ve}__${Oe}`), $e;
  }, y = (te) => {
    switch (te) {
      case "full":
        return 48;
      case "small":
        return 24;
      case "minimal":
        return 16;
      default:
        return 32;
    }
  }, E = /* @__PURE__ */ J(() => P(b(), a(), s(), f())), z = /* @__PURE__ */ J(() => y(f())), B = /* @__PURE__ */ J(() => `w${x(z)} h${x(z)}`);
  var F = {
    get name() {
      return r();
    },
    set name(te) {
      r(te), o();
    },
    get avatar() {
      return n();
    },
    set avatar(te) {
      n(te), o();
    },
    get deleted() {
      return a();
    },
    set deleted(te = !1) {
      a(te), o();
    },
    get highlighted() {
      return s();
    },
    set highlighted(te = !1) {
      s(te), o();
    },
    get href() {
      return i();
    },
    set href(te) {
      i(te), o();
    },
    get location() {
      return d();
    },
    set location(te) {
      d(te), o();
    },
    get reputation() {
      return c();
    },
    set reputation(te) {
      c(te), o();
    },
    get role() {
      return u();
    },
    set role(te) {
      u(te), o();
    },
    get size() {
      return f();
    },
    set size(te) {
      f(te), o();
    },
    get timestamp() {
      return v();
    },
    set timestamp(te) {
      v(te), o();
    },
    get gold() {
      return g();
    },
    set gold(te) {
      g(te), o();
    },
    get silver() {
      return h();
    },
    set silver(te) {
      h(te), o();
    },
    get bronze() {
      return m();
    },
    set bronze(te) {
      m(te), o();
    },
    get admin() {
      return _();
    },
    set admin(te = !1) {
      _(te), o();
    },
    get moderator() {
      return w();
    },
    set moderator(te = !1) {
      w(te), o();
    },
    get staff() {
      return p();
    },
    set staff(te = !1) {
      p(te), o();
    },
    get class() {
      return b();
    },
    set class(te = "") {
      b(te), o();
    },
    get tags() {
      return C();
    },
    set tags(te) {
      C(te), o();
    },
    get type() {
      return T();
    },
    set type(te) {
      T(te), o();
    }
  }, N = X1(), W = L(N);
  {
    var O = (te) => {
      var fe = M1(), be = L(fe, !0);
      A(fe), j(() => ee(be, v())), k(te, fe);
    };
    V(W, (te) => {
      v() && f() !== "minimal" && f() !== "small" && te(O);
    });
  }
  var M = D(W, 2);
  {
    var U = (te) => {
      Ke(te, {
        get src() {
          return sa;
        },
        get class() {
          return `bar-md fc-white bg-black-225 s-user-card--avatar ${x(B) ?? ""}`;
        },
        get title() {
          return r();
        }
      });
    }, H = (te) => {
      {
        let fe = /* @__PURE__ */ J(() => !a() && i() ? i() : void 0);
        Ol(te, {
          class: "s-user-card--avatar",
          get name() {
            return r();
          },
          get href() {
            return x(fe);
          },
          get src() {
            return n();
          },
          get size() {
            return x(z);
          }
        });
      }
    };
    V(M, (te) => {
      a() ? te(U) : te(H, !1);
    });
  }
  var S = D(M, 2), I = L(S);
  {
    var q = (te) => {
      var fe = le(), be = K(fe);
      St(be, () => i() && !a() ? "a" : "div", !1, (Oe, Ve) => {
        dt(Oe, () => ({ class: "s-user-card--link", href: a() ? null : i() }));
        var $e = D1(), vt = K($e), Ze = D(vt);
        {
          var re = (Je) => {
            var At = O1();
            k(Je, At);
          };
          V(Ze, (Je) => {
            !a() && w() && Je(re);
          });
        }
        var Ue = D(Ze, 2);
        {
          var Ce = (Je) => {
            var At = N1();
            k(Je, At);
          };
          V(Ue, (Je) => {
            !a() && p() && Je(Ce);
          });
        }
        var Ee = D(Ue, 2);
        {
          var qe = (Je) => {
            var At = B1();
            k(Je, At);
          };
          V(Ee, (Je) => {
            !a() && _() && Je(qe);
          });
        }
        j(() => ee(vt, `${r() ?? ""} `)), k(Ve, $e);
      }), k(te, fe);
    };
    V(I, (te) => {
      r() && te(q);
    });
  }
  var Q = D(I, 2);
  {
    var Z = (te) => {
      var fe = H1(), be = L(fe);
      {
        var Oe = (Ce) => {
          var Ee = R1(), qe = L(Ee, !0);
          A(Ee), j(() => ee(qe, c())), k(Ce, Ee);
        };
        V(be, (Ce) => {
          c() && Ce(Oe);
        });
      }
      var Ve = D(be, 2);
      {
        var $e = (Ce) => {
          var Ee = U1(), qe = L(Ee, !0);
          A(Ee), j(() => ee(qe, g())), k(Ce, Ee);
        };
        V(Ve, (Ce) => {
          g() && Ce($e);
        });
      }
      var vt = D(Ve, 2);
      {
        var Ze = (Ce) => {
          var Ee = V1(), qe = L(Ee, !0);
          A(Ee), j(() => ee(qe, h())), k(Ce, Ee);
        };
        V(vt, (Ce) => {
          h() && Ce(Ze);
        });
      }
      var re = D(vt, 2);
      {
        var Ue = (Ce) => {
          var Ee = q1(), qe = L(Ee, !0);
          A(Ee), j(() => ee(qe, m())), k(Ce, Ee);
        };
        V(re, (Ce) => {
          m() && Ce(Ue);
        });
      }
      A(fe), k(te, fe);
    };
    V(Q, (te) => {
      !a() && (c() || g() || h() || m()) && te(Z);
    });
  }
  var ge = D(Q, 2);
  {
    var ve = (te) => {
      var fe = F1(), be = L(fe, !0);
      A(fe), j(() => ee(be, u())), k(te, fe);
    };
    V(ge, (te) => {
      !a() && u() && te(ve);
    });
  }
  var X = D(ge, 2);
  {
    var se = (te) => {
      var fe = j1(), be = L(fe, !0);
      A(fe), j(() => ee(be, d())), k(te, fe);
    };
    V(X, (te) => {
      !a() && d() && te(se);
    });
  }
  var Y = D(X, 2);
  {
    var $ = (te) => {
      var fe = W1(), be = L(fe, !0);
      A(fe), j(() => ee(be, v())), k(te, fe);
    };
    V(Y, (te) => {
      v() && (f() === "minimal" || f() === "small") && te($);
    });
  }
  var ie = D(Y, 2);
  {
    var he = (te) => {
      var fe = Y1(), be = L(fe);
      me(be, C), A(fe), k(te, fe);
    };
    V(ie, (te) => {
      !a() && C() && te(he);
    });
  }
  A(S);
  var ke = D(S, 2);
  {
    var Me = (te) => {
      var fe = G1(), be = L(fe);
      me(be, T), A(fe), k(te, fe);
    };
    V(ke, (te) => {
      !a() && T() && te(Me);
    });
  }
  return A(N), j(() => we(N, 1, Ae(x(E)))), k(t, N), de(F);
}
oe(
  ki,
  {
    name: {},
    avatar: {},
    deleted: {},
    highlighted: {},
    href: {},
    location: {},
    reputation: {},
    role: {},
    size: {},
    timestamp: {},
    gold: {},
    silver: {},
    bronze: {},
    admin: {},
    moderator: {},
    staff: {},
    class: {},
    tags: {},
    type: {}
  },
  [],
  [],
  !0
);
var K1 = /* @__PURE__ */ R('<div class="s-activity-indicator"><div class="v-visible-sr"> </div></div>'), Q1 = /* @__PURE__ */ R("<!> ", 1), Z1 = /* @__PURE__ */ R('<div class="s-post-summary--meta-tags"><!></div>'), J1 = /* @__PURE__ */ R('<!> <span class="v-visible-sr"> </span>', 1), $1 = /* @__PURE__ */ R("<!> <!>", 1), eg = /* @__PURE__ */ R('<div><div class="s-post-summary--stats"><!> <!> <!> <!> <!> <!></div> <div class="s-post-summary--content"><!> <h3 class="s-post-summary--content-title"><!> <!></h3> <!> <div class="s-post-summary--meta"><!> <!></div> <!> <!></div></div>');
function tg(t, e) {
  const r = es(e);
  ue(e, !1);
  const n = /* @__PURE__ */ Tt();
  let a = l(e, "href", 12), s = l(e, "title", 12), i = l(e, "timestamp", 12), d = l(e, "userAvatar", 12), c = l(e, "userName", 12), u = l(e, "userProfileUrl", 12), f = l(e, "userReputation", 12), v = l(e, "acceptedAnswer", 12, !1), g = l(e, "activityIndicator", 12, !1), h = l(e, "answers", 12, void 0), m = l(e, "bounty", 12, void 0), _ = l(e, "contentType", 12, void 0), w = l(e, "excerpt", 12, ""), p = l(e, "excerptSize", 12, void 0), b = l(e, "gated", 12, !1), C = l(e, "hotness", 12, void 0), T = l(e, "ignored", 12, !1), P = l(e, "minimal", 12, !1), y = l(e, "readTime", 12, void 0), E = l(e, "state", 12, void 0), z = l(e, "views", 12, void 0), B = l(e, "votes", 12, void 0), F = l(e, "watched", 12, !1), N = l(e, "i18nAcceptedAnswerIconTitle", 12, "Has accepted answer"), W = l(e, "i18nActivityIndicatorText", 12, "New activity"), O = l(e, "i18nAnswersUnit", 28, () => Number(h()) === 1 ? "answer" : "answers"), M = l(e, "i18nActionMenuButtonText", 12, "Menu"), U = l(e, "i18nContentTypeText", 12, void 0), H = l(e, "i18nGatedTitle", 12, void 0), S = l(e, "i18nStateBadgeText", 12, void 0), I = l(e, "i18nViewsUnit", 28, () => Number(z()) === 1 ? "view" : "views"), q = l(e, "i18nVotesUnit", 28, () => Number(B()) === 1 ? "vote" : "votes"), Q = l(e, "class", 12, "");
  const Z = (ne, ct, wt, Se, Dt) => {
    const ft = "s-post-summary";
    let gt = ft;
    return ne && (gt += ` ${ne}`), ct && (gt += ` ${ft}__ignored`), wt && (gt += ` ${ft}__minimal`), Dt && (gt += ` ${ft}__watched`), Se === "deleted" && (gt += ` ${ft}__${Se}`), gt;
  };
  Ft(
    () => (Te(Q()), Te(T()), Te(P()), Te(E()), Te(F())),
    () => {
      _e(n, Z(Q(), T(), P(), E(), F()));
    }
  ), sr();
  var ge = {
    get href() {
      return a();
    },
    set href(ne) {
      a(ne), o();
    },
    get title() {
      return s();
    },
    set title(ne) {
      s(ne), o();
    },
    get timestamp() {
      return i();
    },
    set timestamp(ne) {
      i(ne), o();
    },
    get userAvatar() {
      return d();
    },
    set userAvatar(ne) {
      d(ne), o();
    },
    get userName() {
      return c();
    },
    set userName(ne) {
      c(ne), o();
    },
    get userProfileUrl() {
      return u();
    },
    set userProfileUrl(ne) {
      u(ne), o();
    },
    get userReputation() {
      return f();
    },
    set userReputation(ne) {
      f(ne), o();
    },
    get acceptedAnswer() {
      return v();
    },
    set acceptedAnswer(ne) {
      v(ne), o();
    },
    get activityIndicator() {
      return g();
    },
    set activityIndicator(ne) {
      g(ne), o();
    },
    get answers() {
      return h();
    },
    set answers(ne) {
      h(ne), o();
    },
    get bounty() {
      return m();
    },
    set bounty(ne) {
      m(ne), o();
    },
    get contentType() {
      return _();
    },
    set contentType(ne) {
      _(ne), o();
    },
    get excerpt() {
      return w();
    },
    set excerpt(ne) {
      w(ne), o();
    },
    get excerptSize() {
      return p();
    },
    set excerptSize(ne) {
      p(ne), o();
    },
    get gated() {
      return b();
    },
    set gated(ne) {
      b(ne), o();
    },
    get hotness() {
      return C();
    },
    set hotness(ne) {
      C(ne), o();
    },
    get ignored() {
      return T();
    },
    set ignored(ne) {
      T(ne), o();
    },
    get minimal() {
      return P();
    },
    set minimal(ne) {
      P(ne), o();
    },
    get readTime() {
      return y();
    },
    set readTime(ne) {
      y(ne), o();
    },
    get state() {
      return E();
    },
    set state(ne) {
      E(ne), o();
    },
    get views() {
      return z();
    },
    set views(ne) {
      z(ne), o();
    },
    get votes() {
      return B();
    },
    set votes(ne) {
      B(ne), o();
    },
    get watched() {
      return F();
    },
    set watched(ne) {
      F(ne), o();
    },
    get i18nAcceptedAnswerIconTitle() {
      return N();
    },
    set i18nAcceptedAnswerIconTitle(ne) {
      N(ne), o();
    },
    get i18nActivityIndicatorText() {
      return W();
    },
    set i18nActivityIndicatorText(ne) {
      W(ne), o();
    },
    get i18nAnswersUnit() {
      return O();
    },
    set i18nAnswersUnit(ne) {
      O(ne), o();
    },
    get i18nActionMenuButtonText() {
      return M();
    },
    set i18nActionMenuButtonText(ne) {
      M(ne), o();
    },
    get i18nContentTypeText() {
      return U();
    },
    set i18nContentTypeText(ne) {
      U(ne), o();
    },
    get i18nGatedTitle() {
      return H();
    },
    set i18nGatedTitle(ne) {
      H(ne), o();
    },
    get i18nStateBadgeText() {
      return S();
    },
    set i18nStateBadgeText(ne) {
      S(ne), o();
    },
    get i18nViewsUnit() {
      return I();
    },
    set i18nViewsUnit(ne) {
      I(ne), o();
    },
    get i18nVotesUnit() {
      return q();
    },
    set i18nVotesUnit(ne) {
      q(ne), o();
    },
    get class() {
      return Q();
    },
    set class(ne) {
      Q(ne), o();
    }
  };
  Wt();
  var ve = eg(), X = L(ve), se = L(X);
  {
    var Y = (ne) => {
      uc(ne, {
        get state() {
          return E();
        },
        get i18nText() {
          return S();
        }
      });
    };
    V(se, (ne) => {
      E() && ne(Y);
    });
  }
  var $ = D(se, 2);
  {
    var ie = (ne) => {
      En(ne, {
        variant: "votes",
        get unit() {
          return q();
        },
        get number() {
          return B();
        }
      });
    };
    V($, (ne) => {
      (B() || B() === 0) && ne(ie);
    });
  }
  var he = D($, 2);
  {
    var ke = (ne) => {
      var ct = le(), wt = K(ct);
      {
        var Se = (ft) => {
          oa(ft, {
            class: "s-post-summary--stats-item",
            variant: "answered",
            get icon() {
              return zl;
            },
            get iconTitle() {
              return N();
            },
            children: (gt, Fr) => {
              mt();
              var Jt = Ct();
              j(() => ee(Jt, `${h() ?? ""}
                    ${O() ?? ""}`)), k(gt, Jt);
            },
            $$slots: { default: !0 }
          });
        }, Dt = (ft) => {
          En(ft, {
            variant: "answers",
            get unit() {
              return O();
            },
            get number() {
              return h();
            }
          });
        };
        V(wt, (ft) => {
          v() ? ft(Se) : ft(Dt, !1);
        });
      }
      k(ne, ct);
    };
    V(he, (ne) => {
      (h() || h() === 0) && ne(ke);
    });
  }
  var Me = D(he, 2);
  {
    var te = (ne) => {
      En(ne, {
        variant: "views",
        get unit() {
          return I();
        },
        get number() {
          return z();
        },
        get hotness() {
          return C();
        }
      });
    };
    V(Me, (ne) => {
      (z() || z() === 0) && ne(te);
    });
  }
  var fe = D(Me, 2);
  {
    var be = (ne) => {
      En(ne, {
        get unit() {
          return y();
        },
        number: ""
      });
    };
    V(fe, (ne) => {
      y() && ne(be);
    });
  }
  var Oe = D(fe, 2);
  {
    var Ve = (ne) => {
      oa(ne, {
        class: "s-post-summary--stats-item",
        variant: "bounty",
        children: (ct, wt) => {
          mt();
          var Se = Ct();
          j(() => ee(Se, `+${m() ?? ""}`)), k(ct, Se);
        },
        $$slots: { default: !0 }
      });
    };
    V(Oe, (ne) => {
      m() && ne(Ve);
    });
  }
  A(X);
  var $e = D(X, 2), vt = L($e);
  {
    var Ze = (ne) => {
      cc(ne, {
        get name() {
          return Te(_()), ye(() => _().name);
        },
        get href() {
          return Te(_()), ye(() => _().url);
        },
        get i18nContentTypeText() {
          return U();
        }
      });
    };
    V(vt, (ne) => {
      _() && ne(Ze);
    });
  }
  var re = D(vt, 2), Ue = L(re);
  {
    var Ce = (ne) => {
      var ct = K1(), wt = L(ct), Se = L(wt, !0);
      A(wt), A(ct), j(() => ee(Se, W())), k(ne, ct);
    };
    V(Ue, (ne) => {
      g() && ne(Ce);
    });
  }
  var Ee = D(Ue, 2);
  ns(Ee, {
    get href() {
      return a();
    },
    children: (ne, ct) => {
      var wt = Q1(), Se = K(wt);
      {
        var Dt = (gt) => {
          Ke(gt, {
            get src() {
              return Yd;
            },
            get title() {
              return H();
            }
          });
        };
        V(Se, (gt) => {
          b() && gt(Dt);
        });
      }
      var ft = D(Se);
      j(() => ee(ft, ` ${s() ?? ""}`)), k(ne, wt);
    },
    $$slots: { default: !0 }
  }), A(re);
  var qe = D(re, 2);
  {
    var Je = (ne) => {
      dc(ne, {
        get excerpt() {
          return w();
        },
        get size() {
          return p();
        }
      });
    };
    V(qe, (ne) => {
      w() && ne(Je);
    });
  }
  var At = D(qe, 2), cr = L(At);
  {
    var ot = (ne) => {
      var ct = Z1(), wt = L(ct);
      Pt(wt, e, "tags", {}), A(ct), k(ne, ct);
    };
    V(cr, (ne) => {
      ye(() => r.tags) && ne(ot);
    });
  }
  var _t = D(cr, 2);
  ki(_t, {
    get href() {
      return u();
    },
    size: "minimal",
    get avatar() {
      return d();
    },
    get name() {
      return c();
    },
    get reputation() {
      return f();
    },
    get timestamp() {
      return i();
    }
  }), A(At);
  var lt = D(At, 2);
  Pt(lt, e, "answerPreviews", {});
  var Zt = D(lt, 2);
  {
    var Hr = (ne) => {
      ic(ne, {
        id: ye(() => Math.random().toString(36).slice(2)),
        placement: "bottom-end",
        children: (ct, wt) => {
          var Se = $1(), Dt = K(Se);
          oc(Dt, {
            children: (gt, Fr) => {
              rs(gt, {
                class: "s-post-summary--content-menu-button",
                variant: "muted",
                children: (Jt, jr) => {
                  var ce = J1(), De = K(ce);
                  Ke(De, {
                    get src() {
                      return Ud;
                    }
                  });
                  var He = D(De, 2), et = L(He, !0);
                  A(He), j(() => ee(et, M())), k(Jt, ce);
                },
                $$slots: { default: !0 }
              });
            },
            $$slots: { default: !0 }
          });
          var ft = D(Dt, 2);
          lc(ft, {
            class: "px0 py4 wmx2",
            children: (gt, Fr) => {
              var Jt = le(), jr = K(Jt);
              Pt(jr, e, "actionMenu", {}), k(gt, Jt);
            },
            $$slots: { default: !0 }
          }), k(ct, Se);
        },
        $$slots: { default: !0 }
      });
    };
    V(Zt, (ne) => {
      ye(() => r.actionMenu) && ne(Hr);
    });
  }
  return A($e), A(ve), j(() => we(ve, 1, Ae(x(n)))), k(t, ve), de(ge);
}
oe(
  tg,
  {
    href: {},
    title: {},
    timestamp: {},
    userAvatar: {},
    userName: {},
    userProfileUrl: {},
    userReputation: {},
    acceptedAnswer: {},
    activityIndicator: {},
    answers: {},
    bounty: {},
    contentType: {},
    excerpt: {},
    excerptSize: {},
    gated: {},
    hotness: {},
    ignored: {},
    minimal: {},
    readTime: {},
    state: {},
    views: {},
    votes: {},
    watched: {},
    i18nAcceptedAnswerIconTitle: {},
    i18nActivityIndicatorText: {},
    i18nAnswersUnit: {},
    i18nActionMenuButtonText: {},
    i18nContentTypeText: {},
    i18nGatedTitle: {},
    i18nStateBadgeText: {},
    i18nViewsUnit: {},
    i18nVotesUnit: {},
    class: {}
  },
  ["tags", "answerPreviews", "actionMenu"],
  [],
  !0
);
var rg = /* @__PURE__ */ R('<div class="s-post-summary--answer"><div class="s-post-summary--stats"><!> <!></div> <p class="s-post-summary--answer-excerpt"> </p> <div class="s-post-summary--meta"><!> <!></div></div>');
function ng(t, e) {
  ue(e, !1);
  let r = l(e, "excerpt", 12), n = l(e, "href", 12), a = l(e, "timestamp", 12), s = l(e, "userAvatar", 12), i = l(e, "userName", 12), d = l(e, "userProfileUrl", 12), c = l(e, "userReputation", 12), u = l(e, "votes", 12), f = l(e, "accepted", 12, !1), v = l(e, "i18nAcceptedAnswerText", 12, "Accepted answer"), g = l(e, "i18nVotesUnit", 28, () => Number(u()) === 1 ? "vote" : "votes"), h = l(e, "i18nViewAnswersText", 12, "View answers");
  var m = {
    get excerpt() {
      return r();
    },
    set excerpt(B) {
      r(B), o();
    },
    get href() {
      return n();
    },
    set href(B) {
      n(B), o();
    },
    get timestamp() {
      return a();
    },
    set timestamp(B) {
      a(B), o();
    },
    get userAvatar() {
      return s();
    },
    set userAvatar(B) {
      s(B), o();
    },
    get userName() {
      return i();
    },
    set userName(B) {
      i(B), o();
    },
    get userProfileUrl() {
      return d();
    },
    set userProfileUrl(B) {
      d(B), o();
    },
    get userReputation() {
      return c();
    },
    set userReputation(B) {
      c(B), o();
    },
    get votes() {
      return u();
    },
    set votes(B) {
      u(B), o();
    },
    get accepted() {
      return f();
    },
    set accepted(B) {
      f(B), o();
    },
    get i18nAcceptedAnswerText() {
      return v();
    },
    set i18nAcceptedAnswerText(B) {
      v(B), o();
    },
    get i18nVotesUnit() {
      return g();
    },
    set i18nVotesUnit(B) {
      g(B), o();
    },
    get i18nViewAnswersText() {
      return h();
    },
    set i18nViewAnswersText(B) {
      h(B), o();
    }
  }, _ = rg(), w = L(_), p = L(w);
  En(p, {
    variant: "votes",
    get unit() {
      return g();
    },
    get number() {
      return u();
    }
  });
  var b = D(p, 2);
  {
    var C = (B) => {
      oa(B, {
        class: "s-post-summary--stats-item",
        variant: "answered",
        get icon() {
          return zl;
        },
        children: (F, N) => {
          mt();
          var W = Ct();
          j(() => ee(W, v())), k(F, W);
        },
        $$slots: { default: !0 }
      });
    };
    V(b, (B) => {
      f() && B(C);
    });
  }
  A(w);
  var T = D(w, 2), P = L(T, !0);
  A(T);
  var y = D(T, 2), E = L(y);
  ns(E, {
    get href() {
      return n();
    },
    children: (B, F) => {
      mt();
      var N = Ct();
      j(() => ee(N, h())), k(B, N);
    },
    $$slots: { default: !0 }
  });
  var z = D(E, 2);
  return ki(z, {
    get href() {
      return d();
    },
    size: "minimal",
    get avatar() {
      return s();
    },
    get name() {
      return i();
    },
    get reputation() {
      return c();
    },
    get timestamp() {
      return a();
    }
  }), A(y), A(_), j(() => ee(P, r())), k(t, _), de(m);
}
oe(
  ng,
  {
    excerpt: {},
    href: {},
    timestamp: {},
    userAvatar: {},
    userName: {},
    userProfileUrl: {},
    userReputation: {},
    votes: {},
    accepted: {},
    i18nAcceptedAnswerText: {},
    i18nVotesUnit: {},
    i18nViewAnswersText: {}
  },
  [],
  [],
  !0
);
const fc = "select-context";
function ag(t) {
  const e = zn(fc);
  if (e === void 0)
    throw new Error(`<${t} /> is missing a parent <Select /> component.`);
  return e;
}
var sg = /* @__PURE__ */ R('<p class="s-description mb0 mtn2"><!></p>'), ig = /* @__PURE__ */ R('<div class="s-input-icon"><!></div>'), og = /* @__PURE__ */ R('<p class="s-input-message"><!></p>'), lg = /* @__PURE__ */ R("<div><!> <!> <div><select><!></select> <!></div> <!></div>");
function cg(t, e) {
  const r = es(e);
  ue(e, !1);
  const n = /* @__PURE__ */ Tt();
  let a = l(e, "id", 12), s = l(e, "label", 12), i = l(e, "selected", 12, void 0), d = l(e, "disabled", 12, !1), c = l(e, "hideLabel", 12, !1), u = l(e, "name", 12, void 0), f = l(e, "size", 12, ""), v = l(e, "state", 12, ""), g = l(e, "labelPlacement", 12, "top");
  const h = (O, M) => {
    const U = "s-select";
    let H = U;
    return O && (H += ` ${U}__${O}`), M === "left" && (H += " ml8"), H;
  }, m = Ds({ selected: i() });
  ga(fc, m);
  const _ = (O) => {
    const M = O.target;
    m.set({ selected: M.value });
  };
  Ft(
    () => (Te(f()), Te(g())),
    () => {
      _e(n, h(f(), g()));
    }
  ), sr();
  var w = {
    get id() {
      return a();
    },
    set id(O) {
      a(O), o();
    },
    get label() {
      return s();
    },
    set label(O) {
      s(O), o();
    },
    get selected() {
      return i();
    },
    set selected(O) {
      i(O), o();
    },
    get disabled() {
      return d();
    },
    set disabled(O) {
      d(O), o();
    },
    get hideLabel() {
      return c();
    },
    set hideLabel(O) {
      c(O), o();
    },
    get name() {
      return u();
    },
    set name(O) {
      u(O), o();
    },
    get size() {
      return f();
    },
    set size(O) {
      f(O), o();
    },
    get state() {
      return v();
    },
    set state(O) {
      v(O), o();
    },
    get labelPlacement() {
      return g();
    },
    set labelPlacement(O) {
      g(O), o();
    }
  };
  Wt();
  var p = lg();
  let b;
  var C = L(p);
  {
    let O = /* @__PURE__ */ Gt(() => c() ? "v-visible-sr" : "");
    hi(C, {
      get id() {
        return a();
      },
      get class() {
        return x(O);
      },
      get size() {
        return f();
      },
      children: (M, U) => {
        mt();
        var H = Ct();
        j(() => ee(H, s())), k(M, H);
      },
      $$slots: { default: !0 }
    });
  }
  var T = D(C, 2);
  {
    var P = (O) => {
      var M = sg(), U = L(M);
      Pt(U, e, "description", {}), A(M), j(() => ae(M, "id", `${a()}-description`)), k(O, M);
    };
    V(T, (O) => {
      Te(c()), Te(g()), ye(() => r.description && !c() && g() === "top") && O(P);
    });
  }
  var y = D(T, 2), E = L(y), z = L(E);
  Pt(z, e, "default", {}), A(E);
  var B = D(E, 2);
  {
    var F = (O) => {
      var M = ig(), U = L(M);
      {
        var H = (I) => {
          Ke(I, {
            get src() {
              return Pl;
            }
          });
        }, S = (I) => {
          var q = le(), Q = K(q);
          {
            var Z = (ve) => {
              Ke(ve, {
                get src() {
                  return Il;
                }
              });
            }, ge = (ve) => {
              Ke(ve, {
                get src() {
                  return Ll;
                }
              });
            };
            V(
              Q,
              (ve) => {
                v() === "success" ? ve(Z) : ve(ge, !1);
              },
              !0
            );
          }
          k(I, q);
        };
        V(U, (I) => {
          v() === "error" ? I(H) : I(S, !1);
        });
      }
      A(M), k(O, M);
    };
    V(B, (O) => {
      v() && O(F);
    });
  }
  A(y);
  var N = D(y, 2);
  {
    var W = (O) => {
      var M = og(), U = L(M);
      Pt(U, e, "message", {}), A(M), j(() => ae(M, "id", `${a()}-message`)), k(O, M);
    };
    V(N, (O) => {
      ye(() => r.message) && O(W);
    });
  }
  return A(p), j(
    (O) => {
      b = we(p, 1, `d-flex ${g() === "top" ? " fd-column gy4" : "ai-center"}`, null, b, O), we(y, 1, Ae(x(n))), ae(E, "id", a()), ae(E, "name", u()), E.disabled = d(), ae(E, "aria-describedby", (Te(a()), ye(() => r.message ? `${a()}-message` : r.description ? `${a()}-description` : void 0))), ae(E, "aria-invalid", v() === "error");
    },
    [
      () => ({
        "has-error": v() === "error",
        "has-success": v() === "success",
        "has-warning": v() === "warning"
      })
    ]
  ), tt("change", E, _), tt("change", E, function(O) {
    qt.call(this, e, O);
  }), tt("focus", E, function(O) {
    qt.call(this, e, O);
  }), tt("blur", E, function(O) {
    qt.call(this, e, O);
  }), k(t, p), de(w);
}
oe(
  cg,
  {
    id: {},
    label: {},
    selected: {},
    disabled: {},
    hideLabel: {},
    name: {},
    size: {},
    state: {},
    labelPlacement: {}
  },
  ["description", "default", "message"],
  [],
  !0
);
var ug = /* @__PURE__ */ R("<option> </option>");
function dg(t, e) {
  ue(e, !1);
  const r = () => gn(c, "$state", n), [n, a] = ba();
  let s = l(e, "value", 12, ""), i = l(e, "text", 12, ""), d = l(e, "disabled", 12, !1), c = ag("SelectItem");
  var u = {
    get value() {
      return s();
    },
    set value(m) {
      s(m), o();
    },
    get text() {
      return i();
    },
    set text(m) {
      i(m), o();
    },
    get disabled() {
      return d();
    },
    set disabled(m) {
      d(m), o();
    }
  };
  Wt();
  var f = ug(), v = L(f, !0);
  A(f);
  var g = {};
  j(() => {
    f.disabled = d(), di(f, (r(), Te(s()), ye(() => r().selected === s()))), ae(f, "data-selected", (r(), Te(s()), ye(() => r().selected === s()))), ee(v, i() || s()), g !== (g = s()) && (f.value = (f.__value = s()) ?? "");
  }), k(t, f);
  var h = de(u);
  return a(), h;
}
oe(dg, { value: {}, text: {}, disabled: {} }, [], [], !0);
var fg = /* @__PURE__ */ R('<span class="s-tag--sponsor"><!></span>'), vg = /* @__PURE__ */ R('<button class="s-tag--dismiss" type="button"><span class="v-visible-sr"> </span><!></button>'), gg = /* @__PURE__ */ R("<!> <!><!>", 1);
function hg(t, e) {
  ue(e, !0);
  const r = l(e, "size", 7, ""), n = l(e, "variant", 7, ""), a = l(e, "href", 7), s = l(e, "dismissable", 7, !1), i = l(e, "ignored", 7, !1), d = l(e, "watched", 7, !1), c = l(e, "i18nDismissButtonText", 7, "Dismiss tag"), u = l(e, "class", 7, ""), f = l(e, "ondismiss", 7, () => {
  }), v = l(e, "children", 7), g = l(e, "sponsor", 7), h = l(e, "role", 7), m = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "size",
    "variant",
    "href",
    "dismissable",
    "ignored",
    "watched",
    "i18nDismissButtonText",
    "class",
    "ondismiss",
    "children",
    "sponsor",
    "role"
  ]), _ = (T, P, y, E, z) => {
    const B = "s-tag";
    let F = B;
    const N = [P, y];
    return T && (F += " " + T), N.forEach((W) => {
      W && (F += ` ${B}__${W}`);
    }), E && (F += ` ${B}__ignored`), z && (F += ` ${B}__watched`), F;
  }, w = /* @__PURE__ */ J(() => _(u(), r(), n(), i(), d()));
  var p = {
    get size() {
      return r();
    },
    set size(T = "") {
      r(T), o();
    },
    get variant() {
      return n();
    },
    set variant(T = "") {
      n(T), o();
    },
    get href() {
      return a();
    },
    set href(T) {
      a(T), o();
    },
    get dismissable() {
      return s();
    },
    set dismissable(T = !1) {
      s(T), o();
    },
    get ignored() {
      return i();
    },
    set ignored(T = !1) {
      i(T), o();
    },
    get watched() {
      return d();
    },
    set watched(T = !1) {
      d(T), o();
    },
    get i18nDismissButtonText() {
      return c();
    },
    set i18nDismissButtonText(T = "Dismiss tag") {
      c(T), o();
    },
    get class() {
      return u();
    },
    set class(T = "") {
      u(T), o();
    },
    get ondismiss() {
      return f();
    },
    set ondismiss(T = () => {
    }) {
      f(T), o();
    },
    get children() {
      return v();
    },
    set children(T) {
      v(T), o();
    },
    get sponsor() {
      return g();
    },
    set sponsor(T) {
      g(T), o();
    },
    get role() {
      return h();
    },
    set role(T) {
      h(T), o();
    }
  }, b = le(), C = K(b);
  return St(C, () => a() ? "a" : "span", !1, (T, P) => {
    dt(T, () => ({
      class: x(w),
      href: a(),
      role: h() || a() && "link",
      ...m
    }));
    var y = gg(), E = K(y);
    {
      var z = (W) => {
        var O = fg(), M = L(O);
        me(M, g), A(O), k(W, O);
      };
      V(E, (W) => {
        g() && W(z);
      });
    }
    var B = D(E, 2);
    me(B, v);
    var F = D(B);
    {
      var N = (W) => {
        var O = vg();
        O.__click = function(...S) {
          f()?.apply(this, S);
        };
        var M = L(O), U = L(M, !0);
        A(M);
        var H = D(M);
        Ke(H, {
          get src() {
            return Bd;
          }
        }), A(O), j(() => ee(U, c())), k(W, O);
      };
      V(F, (W) => {
        s() && !a() && W(N);
      });
    }
    k(P, y);
  }), k(t, b), de(p);
}
jt(["click"]);
oe(
  hg,
  {
    size: {},
    variant: {},
    href: {},
    dismissable: {},
    ignored: {},
    watched: {},
    i18nDismissButtonText: {},
    class: {},
    ondismiss: {},
    children: {},
    sponsor: {},
    role: {}
  },
  [],
  [],
  !0
);
const vc = '<svg aria-hidden="true" class="svg-spot spotEmptyLg" width="96" height="96"  viewBox="0 0 96 96"><path  d="M8 12a4 4 0 0 1 4-4h79a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4zm0 33a4 4 0 0 1 4-4h79a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4zM4 78.63a1.5 1.5 0 0 1-3 0V75.5A4.5 4.5 0 0 1 5.5 71h2.44a1.5 1.5 0 0 1 0 3H5.5c-.83 0-1.5.67-1.5 1.5zm9.27-6.13c0-.83.68-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.72 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 1 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.71 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 1 1 0 3H38.2a1.5 1.5 0 0 1-1.5-1.5m11.72 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.71 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.72 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.71 0c0-.83.67-1.5 1.5-1.5h2.44a4.5 4.5 0 0 1 4.5 4.5v3.13a1.5 1.5 0 0 1-3 0V75.5a1.5 1.5 0 0 0-1.5-1.5h-2.44a1.5 1.5 0 0 1-1.5-1.5M2.5 85.88c.83 0 1.5.67 1.5 1.5v3.15A1.5 1.5 0 0 0 5.5 92h2.44a1.5 1.5 0 0 1 0 3H5.4A4.5 4.5 0 0 1 1 90.5v-3.12c0-.83.67-1.5 1.5-1.5m88 0c.83 0 1.5.67 1.5 1.5v3.12a4.5 4.5 0 0 1-4.5 4.5h-2.44a1.5 1.5 0 0 1 0-3h2.44a1.5 1.5 0 0 0 1.5-1.5v-3.12c0-.83.67-1.5 1.5-1.5M13.27 93.5c0-.83.68-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.72 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.71 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 1 1 0 3H38.2a1.5 1.5 0 0 1-1.5-1.5m11.72 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.71 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5m11.72 0c0-.83.67-1.5 1.5-1.5h4.88a1.5 1.5 0 0 1 0 3h-4.88a1.5 1.5 0 0 1-1.5-1.5" opacity=".2"/><path  d="M14.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m8.5-2.5c0-.83.67-1.5 1.5-1.5h57a1.5 1.5 0 0 1 0 3h-57a1.5 1.5 0 0 1-1.5-1.5M5.5 1A4.5 4.5 0 0 0 1 5.5v20A4.5 4.5 0 0 0 5.5 30h81a4.5 4.5 0 0 0 4.5-4.5v-20A4.5 4.5 0 0 0 86.5 1zM4 5.5C4 4.67 4.67 4 5.5 4h81c.83 0 1.5.67 1.5 1.5v20c0 .83-.67 1.5-1.5 1.5h-81A1.5 1.5 0 0 1 4 25.5zm13 43a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m7.5-1.5a1.5 1.5 0 0 0 0 3h57a1.5 1.5 0 0 0 0-3zm-19-13A4.5 4.5 0 0 0 1 38.5v20A4.5 4.5 0 0 0 5.5 63h81a4.5 4.5 0 0 0 4.5-4.5v-20a4.5 4.5 0 0 0-4.5-4.5zM4 38.5c0-.83.67-1.5 1.5-1.5h81c.83 0 1.5.67 1.5 1.5v20c0 .83-.67 1.5-1.5 1.5h-81A1.5 1.5 0 0 1 4 58.5z"/></svg>', mg = (t) => (e, r) => {
  const n = typeof e == "string" ? `${t}${e}` : e;
  return fetch(n, r);
}, _g = mg("/stackheartbeat"), Er = (t) => t == null ? "" : new DOMParser().parseFromString(t, "text/html").documentElement.textContent || "";
class ls {
  type = "TagClicked";
  parameters;
  constructor(e, r) {
    this.parameters = {
      source: e,
      tagName: r
    };
  }
}
class gc {
  type = "PopularUnansweredQuestionClicked";
  parameters;
  constructor(e) {
    this.parameters = {
      source: window.location.href,
      questionId: e.toString()
    };
  }
}
function Rn(t) {
  const e = new Blob([JSON.stringify(t)], { type: "application/json" });
  navigator.sendBeacon("/stackheartbeat/track", e);
}
const bg = (t) => {
  if (t >= 999500)
    return (t / 1e6).toFixed(1) + "m";
  if (t >= 1e5)
    return Math.round(t / 1e3).toLocaleString("en-US") + "k";
  if (t >= 999.5) {
    const e = (t / 1e3).toFixed(1);
    return parseFloat(e).toString() + "k";
  } else if (t >= 0)
    return t.toLocaleString("en-US");
  return t.toString();
};
var pg = /* @__PURE__ */ R("<time> </time>");
function Ci(t, e) {
  ue(e, !0);
  let r = l(e, "time", 7), n = l(e, "classNames", 7);
  const a = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  function s(h) {
    if (isNaN(h.getTime()))
      return "";
    const _ = (/* @__PURE__ */ new Date()).getTime() - h.getTime(), w = Math.round(_ / 1e3);
    if (w < 60) return a.format(-w, "second");
    const p = Math.round(w / 60);
    if (p < 60) return a.format(-p, "minute");
    const b = Math.round(p / 60);
    if (b < 24) return a.format(-b, "hour");
    const C = Math.round(b / 24);
    return a.format(-C, "day");
  }
  const i = new Date(r()), d = !isNaN(i.getTime()), c = d ? s(i) : "", u = d ? Intl.DateTimeFormat("en", { dateStyle: "full", timeStyle: "long" }).format(i) : "";
  var f = {
    get time() {
      return r();
    },
    set time(h) {
      r(h), o();
    },
    get classNames() {
      return n();
    },
    set classNames(h) {
      n(h), o();
    }
  }, v = pg(), g = L(v, !0);
  return A(v), j(() => {
    ae(v, "datetime", u), ae(v, "title", u), we(v, 1, n()), ee(g, c);
  }), k(t, v), de(f);
}
oe(Ci, { time: {}, classNames: {} }, [], [], !0);
var wg = /* @__PURE__ */ R('<img class="s-avatar--image" alt="User avatar"/>'), yg = /* @__PURE__ */ R('<a class="s-avatar s-user-card--avatar"><!></a>'), xg = /* @__PURE__ */ R('<div class="s-avatar s-user-card--avatar"><!></div>'), Tg = /* @__PURE__ */ R('<a class="s-user-card--link"> </a>'), kg = /* @__PURE__ */ R('<span class="s-user-card--link"> </span>'), Cg = /* @__PURE__ */ R('<div class="s-user-card s-user-card__minimal"><!> <div class="s-user-card--info"><!> <ul class="s-user-card--awards"><li class="s-user-card--rep"> </li></ul></div> <!></div>');
function hc(t, e) {
  ue(e, !0);
  const r = l(e, "userId", 7), n = l(e, "displayName", 7), a = l(e, "profileImage", 7), s = l(e, "reputation", 7), i = l(e, "createdDateTime", 7), d = l(e, "baseUrl", 7);
  var c = {
    get userId() {
      return r();
    },
    set userId(y) {
      r(y), o();
    },
    get displayName() {
      return n();
    },
    set displayName(y) {
      n(y), o();
    },
    get profileImage() {
      return a();
    },
    set profileImage(y) {
      a(y), o();
    },
    get reputation() {
      return s();
    },
    set reputation(y) {
      s(y), o();
    },
    get createdDateTime() {
      return i();
    },
    set createdDateTime(y) {
      i(y), o();
    },
    get baseUrl() {
      return d();
    },
    set baseUrl(y) {
      d(y), o();
    }
  }, u = Cg(), f = L(u);
  {
    var v = (y) => {
      var E = yg(), z = L(E);
      {
        var B = (N) => {
          var W = wg();
          j(() => ae(W, "src", a())), k(N, W);
        }, F = (N) => {
          Ke(N, {
            get src() {
              return sa;
            },
            class: "s-avatar--image"
          });
        };
        V(z, (N) => {
          a() ? N(B) : N(F, !1);
        });
      }
      A(E), j(() => ae(E, "href", `${d()}users/${r()}`)), k(y, E);
    }, g = (y) => {
      var E = xg(), z = L(E);
      Ke(z, {
        get src() {
          return sa;
        },
        class: "s-avatar--image"
      }), A(E), k(y, E);
    };
    V(f, (y) => {
      r() ? y(v) : y(g, !1);
    });
  }
  var h = D(f, 2), m = L(h);
  {
    var _ = (y) => {
      var E = Tg(), z = L(E, !0);
      A(E), j(() => {
        ae(E, "href", `${d()}users/${r()}`), ee(z, n() || "Unknown");
      }), k(y, E);
    }, w = (y) => {
      var E = kg(), z = L(E, !0);
      A(E), j(() => ee(z, n() || "Unknown")), k(y, E);
    };
    V(m, (y) => {
      r() ? y(_) : y(w, !1);
    });
  }
  var p = D(m, 2), b = L(p), C = L(b, !0);
  A(b), A(p), A(h);
  var T = D(h, 2);
  {
    var P = (y) => {
      Ci(y, {
        get time() {
          return i();
        },
        classNames: "s-user-card--time"
      });
    };
    V(T, (y) => {
      i() && y(P);
    });
  }
  return A(u), j((y) => ee(C, y), [() => bg(s() || 0)]), k(t, u), de(c);
}
oe(
  hc,
  {
    userId: {},
    displayName: {},
    profileImage: {},
    reputation: {},
    createdDateTime: {},
    baseUrl: {}
  },
  [],
  [],
  !0
);
var Sg = (t, e, r) => e(r()?.postId), Ag = (t, e, r) => e(t, x(r)), Eg = /* @__PURE__ */ R('<a class="s-tag"> </a>'), Lg = /* @__PURE__ */ R('<div class="s-sidebarwidget--content s-sidebarwidget__items"><div class="s-sidebarwidget--item"><!> <p class="fw-normal m0">Popular unanswered question</p></div> <div class="s-sidebarwidget--item"><a class="s-link fs-body3 break-word"> </a></div> <div class="s-sidebarwidget--item d-flex g4 fw-wrap"></div> <!></div>');
function mc(t, e) {
  ue(e, !0);
  const r = l(e, "question", 7), n = l(e, "baseUrl", 7), a = (r()?.tags || "").split(";").filter((p) => p.trim() !== "");
  function s(p) {
    Rn(new ls("popular-unanswered-question", p));
  }
  function i(p) {
    Rn(new gc(p));
  }
  function d(p, b) {
    (p.button === 0 || p.button === 1) && s(Er(b));
  }
  var c = {
    get question() {
      return r();
    },
    set question(p) {
      r(p), o();
    },
    get baseUrl() {
      return n();
    },
    set baseUrl(p) {
      n(p), o();
    }
  }, u = Lg(), f = L(u), v = L(f);
  Ke(v, {
    get src() {
      return Ml;
    },
    title: "Popular unanswered question",
    native: !0
  }), mt(2), A(f);
  var g = D(f, 2), h = L(g);
  h.__click = [Sg, i, r];
  var m = L(h, !0);
  A(h), A(g);
  var _ = D(g, 2);
  Pr(_, 21, () => a, $a, (p, b) => {
    var C = Eg();
    C.__mouseup = [Ag, d, b];
    var T = L(C, !0);
    A(C), j(
      (P) => {
        ae(C, "href", `${n()}questions/tagged/${x(b)}`), ee(T, P);
      },
      [() => Er(x(b))]
    ), k(p, C);
  }), A(_);
  var w = D(_, 2);
  {
    let p = /* @__PURE__ */ J(() => r()?.userId), b = /* @__PURE__ */ J(() => r()?.displayName), C = /* @__PURE__ */ J(() => r()?.profileImage), T = /* @__PURE__ */ J(() => r()?.reputation), P = /* @__PURE__ */ J(() => r()?.createdDateTime);
    hc(w, {
      get userId() {
        return x(p);
      },
      get displayName() {
        return x(b);
      },
      get profileImage() {
        return x(C);
      },
      get reputation() {
        return x(T);
      },
      get createdDateTime() {
        return x(P);
      },
      get baseUrl() {
        return n();
      }
    });
  }
  return A(u), j(
    (p) => {
      ae(h, "href", `${n()}questions/${r()?.postId}`), ee(m, p);
    },
    [() => Er(r()?.postTitle)]
  ), k(t, u), de(c);
}
jt(["click", "mouseup"]);
oe(mc, { question: {}, baseUrl: {} }, [], [], !0);
const Pg = async (t) => {
  let e = "/heartbeat/data";
  t && (e += "?timeFrame=" + t);
  const r = await _g(e);
  if (!r.ok)
    throw new Error(r.statusText);
  const n = await r.json();
  if (n.numberOfUsersActive === 0 && n.numberOfQuestionsAsked === 0 && n.numberOfQuestionsAnswered === 0 && n.numberOfCommentsPosted === 0 && n.numberOfSuccessfulUpvotes === 0)
    throw new Error("No activity data available");
  return n;
}, _c = {
  getHeartbeat: Pg
};
var Ig = (t, e, r) => e(t, x(r)), zg = /* @__PURE__ */ R('<a class="s-tag"> </a>'), Mg = /* @__PURE__ */ R('<div class="s-sidebarwidget--content s-sidebarwidget__items"><div class="s-sidebarwidget--item"><!> <p class="fw-normal m0 ml4">Popular tags</p></div> <div class="s-sidebarwidget--item d-flex g4 fw-wrap"></div></div>');
function bc(t, e) {
  ue(e, !0);
  const r = l(e, "tags", 7), n = l(e, "baseUrl", 7);
  function a(v) {
    Rn(new ls("popular-tags", v));
  }
  function s(v, g) {
    (v.button === 0 || v.button === 1) && a(Er(g));
  }
  var i = {
    get tags() {
      return r();
    },
    set tags(v) {
      r(v), o();
    },
    get baseUrl() {
      return n();
    },
    set baseUrl(v) {
      n(v), o();
    }
  }, d = Mg(), c = L(d), u = L(c);
  Ke(u, {
    native: !0,
    get src() {
      return Ml;
    },
    title: "Popular tags"
  }), mt(2), A(c);
  var f = D(c, 2);
  return Pr(f, 21, r, $a, (v, g) => {
    var h = zg();
    h.__mouseup = [Ig, s, g];
    var m = L(h, !0);
    A(h), j(
      (_) => {
        ae(h, "href", `${n()}questions/tagged/${x(g)}`), ee(m, _);
      },
      [() => Er(x(g))]
    ), k(v, h);
  }), A(f), A(d), k(t, d), de(i);
}
jt(["mouseup"]);
oe(bc, { tags: {}, baseUrl: {} }, [], [], !0);
var Og = /* @__PURE__ */ R('<ul id="heartbeat-items" class="s-sidebarwidget--content s-sidebarwidget__items"><li class="s-sidebarwidget--item g6 ai-center"><div class="s-activity-indicator s-activity-indicator__success"><div class="v-visible-sr">Users online activity</div></div> <div class="wmn0 ow-break-word"> </div></li> <li class="s-sidebarwidget--item g6 ai-center"><div class="wmn0 ow-break-word"><!> </div></li> <li class="s-sidebarwidget--item g6 ai-center"><div class="wmn0 ow-break-word"><!> </div></li> <li class="s-sidebarwidget--item g6 ai-center"><div class="wmn0 ow-break-word"><!> </div></li> <li class="s-sidebarwidget--item g6 ai-center"><div class="wmn0 ow-break-word"><!> </div></li></ul> <!> <!>', 1), Ng = /* @__PURE__ */ R(`<div class="s-sidebarwidget--content s-sidebarwidget__items"><div class="s-empty-state wmx4 my16 d-flex gx16"><div class="flex--item"><!></div> <div class="flex--item ta-left"><p class="fs-body2">Could not load activity</p> <p>We're unable to load activity right now. Please check back shortly.</p></div></div></div>`), Bg = /* @__PURE__ */ R('<div class="s-sidebarwidget--content s-sidebarwidget__items"><!></div>'), Dg = /* @__PURE__ */ R('<div class="s-sidebarwidget s-anchors pb12"><div class="d-flex jc-space-between ai-end"><div class="s-sidebarwidget--header">Community activity</div> <div class="fc-orange-400 fs-caption mr16">Last 1 hr</div></div> <!></div>');
function Rg(t, e) {
  ue(e, !1);
  const r = (c, u, f) => {
    const v = c === 1 ? u : f ?? `${u}s`;
    return `${c} ${v}`;
  }, a = new URL(window.location.toString()).searchParams.get("timeFrame") || "PT1H", s = "https://stackoverflow.com/";
  Wt();
  var i = Dg(), d = D(L(i), 2);
  _l(
    d,
    () => _c.getHeartbeat(a),
    (c) => {
      var u = Bg(), f = L(u);
      gi(f, {}), A(u), k(c, u);
    },
    (c, u) => {
      var f = Og(), v = K(f), g = L(v), h = D(L(g), 2), m = L(h, !0);
      A(h), A(g);
      var _ = D(g, 2), w = L(_), p = L(w);
      Ke(p, {
        get src() {
          return jd;
        },
        title: "Number of questions asked"
      });
      var b = D(p);
      A(w), A(_);
      var C = D(_, 2), T = L(C), P = L(T);
      Ke(P, {
        get src() {
          return Md;
        },
        title: "Number of questions that received an answer"
      });
      var y = D(P);
      A(T), A(C);
      var E = D(C, 2), z = L(E), B = L(z);
      Ke(B, {
        get src() {
          return qd;
        },
        title: "Number of comments posted"
      });
      var F = D(B);
      A(z), A(E);
      var N = D(E, 2), W = L(N), O = L(W);
      Ke(O, {
        get src() {
          return Nd;
        },
        title: "Number of upvotes on posts"
      });
      var M = D(O);
      A(W), A(N), A(v);
      var U = D(v, 2);
      {
        var H = (q) => {
          {
            let Q = /* @__PURE__ */ Gt(() => x(u).popularTags || []);
            bc(q, {
              get tags() {
                return x(Q);
              },
              baseUrl: s
            });
          }
        };
        V(U, (q) => {
          x(u).popularTags && x(u).popularTags.length > 0 && q(H);
        });
      }
      var S = D(U, 2);
      {
        var I = (q) => {
          mc(q, {
            get question() {
              return x(u).popularUnansweredQuestion;
            },
            baseUrl: s
          });
        };
        V(S, (q) => {
          x(u).popularUnansweredQuestion !== null && q(I);
        });
      }
      j(
        (q, Q, Z, ge, ve) => {
          ee(m, q), ee(b, ` ${Q ?? ""}`), ee(y, ` ${Z ?? ""}`), ee(F, ` ${ge ?? ""}`), ee(M, ` ${ve ?? ""}`);
        },
        [
          () => r(x(u).numberOfUsersActive, "user online", "users online"),
          () => r(x(u).numberOfQuestionsAsked, "question"),
          () => r(x(u).numberOfQuestionsAnswered, "answer"),
          () => r(x(u).numberOfCommentsPosted, "comment"),
          () => r(x(u).numberOfSuccessfulUpvotes, "upvote")
        ]
      ), k(c, f);
    },
    (c) => {
      var u = Ng(), f = L(u), v = L(f), g = L(v);
      Ke(g, {
        get src() {
          return vc;
        }
      }), A(v), mt(2), A(f), A(u), k(c, u);
    }
  ), A(i), k(t, i), de();
}
oe(Rg, {}, [], [], !1);
const Ug = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconQuestion" aria-hidden="true"><path d="M16.65 2A1.5 1.5 0 0 1 18 3.5v10h-1.5V15H7.9l-3.46 2.77-.09.07a1.5 1.5 0 0 1-2.34-1.13V3.5C2 2.67 2.68 2 3.5 2h13.14M3.51 15v1.6l3.45-2.77.41-.33h9.13v-10h-13zm7.24-2.97h-1.5v-1.55h1.5zM10 5.06c1.09 0 2.15.8 2.15 1.97 0 .8-.5 1.43-1.13 1.74a1 1 0 0 0-.24.18l-.03.03v.58h-1.5v-.6c0-.83.69-1.33 1.1-1.53.22-.1.3-.27.3-.4 0-.17-.2-.47-.65-.47-.46 0-.65.3-.65.47h-1.5c0-1.18 1.06-1.97 2.15-1.97"/></svg>', Vg = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconTag" aria-hidden="true"><path d="M9.21 2c.46 0 .9.18 1.23.5l7.14 7.09-1.06 1.06 1.06 1.06-5.6 5.68c-.67.69-1.77.7-2.46.03l-7-6.84A1.8 1.8 0 0 1 2 9.34V3.55C2 2.69 2.7 2 3.55 2zM3.55 3.5a.1.1 0 0 0-.05.05v5.78q0 .1.08.18l6.99 6.83c.1.1.25.1.35 0l5.6-5.7L9.4 3.58a.3.3 0 0 0-.18-.07zm5.4 4.16L7.57 9.04 6.19 7.66l1.38-1.4z"/></svg>';
var qg = /* @__PURE__ */ R('<span class="s-avatar s-avatar__16"><img class="s-avatar--image" alt="User avatar"/></span>'), Hg = /* @__PURE__ */ R('<span class="s-avatar s-avatar__16"><!></span>'), Fg = /* @__PURE__ */ R('<a class="s-user-card--group"><!> <span class="s-user-card--username"> </span></a>'), jg = /* @__PURE__ */ R('<div class="s-user-card--group"><!></div> <span class="s-user-card--username"> </span>', 1), Wg = /* @__PURE__ */ R('<span class="s-user-card--time" data-controller="s-tooltip"><!></span>'), Yg = /* @__PURE__ */ R('<div class="s-user-card d-flex gs8"><!> <!></div>');
function pc(t, e) {
  ue(e, !0);
  const r = l(e, "userId", 7), n = l(e, "displayName", 7), a = l(e, "profileImage", 7), s = l(e, "createdDateTime", 7), i = l(e, "baseUrl", 7);
  var d = {
    get userId() {
      return r();
    },
    set userId(m) {
      r(m), o();
    },
    get displayName() {
      return n();
    },
    set displayName(m) {
      n(m), o();
    },
    get profileImage() {
      return a();
    },
    set profileImage(m) {
      a(m), o();
    },
    get createdDateTime() {
      return s();
    },
    set createdDateTime(m) {
      s(m), o();
    },
    get baseUrl() {
      return i();
    },
    set baseUrl(m) {
      i(m), o();
    }
  }, c = Yg(), u = L(c);
  {
    var f = (m) => {
      var _ = Fg(), w = L(_);
      {
        var p = (P) => {
          var y = qg(), E = L(y);
          A(y), j(() => ae(E, "src", a())), k(P, y);
        }, b = (P) => {
          var y = Hg(), E = L(y);
          Ke(E, {
            get src() {
              return sa;
            },
            class: "s-avatar--image"
          }), A(y), k(P, y);
        };
        V(w, (P) => {
          a() ? P(p) : P(b, !1);
        });
      }
      var C = D(w, 2), T = L(C, !0);
      A(C), A(_), j(() => {
        ae(_, "href", `${i()}users/${r()}`), ee(T, n() || "Unknown");
      }), k(m, _);
    }, v = (m) => {
      var _ = jg(), w = K(_), p = L(w);
      Ke(p, {
        get src() {
          return sa;
        },
        class: "s-avatar--image"
      }), A(w);
      var b = D(w, 2), C = L(b, !0);
      A(b), j(() => ee(C, n() || "Unknown")), k(m, _);
    };
    V(u, (m) => {
      r() ? m(f) : m(v, !1);
    });
  }
  var g = D(u, 2);
  {
    var h = (m) => {
      var _ = Wg(), w = L(_);
      Ci(w, {
        get time() {
          return s();
        },
        classNames: "s-user-card--time"
      }), A(_), k(m, _);
    };
    V(g, (m) => {
      s() && m(h);
    });
  }
  return A(c), k(t, c), de(d);
}
oe(
  pc,
  {
    userId: {},
    displayName: {},
    profileImage: {},
    createdDateTime: {},
    baseUrl: {}
  },
  [],
  [],
  !0
);
var Gg = (t, e, r) => e(r()?.postId), Xg = (t, e, r) => e(t, x(r)), Kg = /* @__PURE__ */ R('<a class="s-tag"> </a>'), Qg = /* @__PURE__ */ R('<div class="s-sidebarwidget mt32"><div class="s-sidebarwidget--header"><!> <p class="fw-normal m0 ml4">Popular unanswered question</p></div> <div class="s-sidebarwidget--content d-block"><!> <div class="d-block mt8"><a class="s-link fs-body3 break-word"> </a></div> <div class="d-flex g8 fw-wrap mt12"></div></div></div>');
function wc(t, e) {
  ue(e, !0);
  const r = l(e, "question", 7), n = l(e, "baseUrl", 7), a = (r()?.tags || "").split(";").filter((b) => b.trim() !== "");
  function s(b) {
    Rn(new ls("popular-unanswered-question", b));
  }
  function i(b) {
    Rn(new gc(b));
  }
  function d(b, C) {
    (b.button === 0 || b.button === 1) && s(Er(C));
  }
  var c = {
    get question() {
      return r();
    },
    set question(b) {
      r(b), o();
    },
    get baseUrl() {
      return n();
    },
    set baseUrl(b) {
      n(b), o();
    }
  }, u = Qg(), f = L(u), v = L(f);
  Ke(v, {
    get src() {
      return Ug;
    },
    title: "Popular unanswered question"
  }), mt(2), A(f);
  var g = D(f, 2), h = L(g);
  {
    let b = /* @__PURE__ */ J(() => r()?.userId), C = /* @__PURE__ */ J(() => r()?.displayName), T = /* @__PURE__ */ J(() => r()?.profileImage), P = /* @__PURE__ */ J(() => r()?.createdDateTime);
    pc(h, {
      get userId() {
        return x(b);
      },
      get displayName() {
        return x(C);
      },
      get profileImage() {
        return x(T);
      },
      get createdDateTime() {
        return x(P);
      },
      get baseUrl() {
        return n();
      }
    });
  }
  var m = D(h, 2), _ = L(m);
  _.__click = [Gg, i, r];
  var w = L(_, !0);
  A(_), A(m);
  var p = D(m, 2);
  return Pr(p, 21, () => a, $a, (b, C) => {
    var T = Kg();
    T.__mouseup = [Xg, d, C];
    var P = L(T, !0);
    A(T), j(
      (y) => {
        ae(T, "href", `${n()}questions/tagged/${x(C)}`), ee(P, y);
      },
      [() => Er(x(C))]
    ), k(b, T);
  }), A(p), A(g), A(u), j(
    (b) => {
      ae(_, "href", `${n()}questions/${r()?.postId}`), ee(w, b);
    },
    [() => Er(r()?.postTitle)]
  ), k(t, u), de(c);
}
jt(["click", "mouseup"]);
oe(wc, { question: {}, baseUrl: {} }, [], [], !0);
var Zg = /* @__PURE__ */ R('<div><!> <div class="v-visible-sr"> </div></div>');
function yc(t, e) {
  ue(e, !0);
  const r = l(e, "label", 7), n = l(e, "variant", 7, ""), a = l(e, "size", 7, ""), s = l(e, "content", 7), i = l(e, "class", 7, ""), d = (_, w, p) => {
    const b = "s-activity-indicator";
    let C = b;
    return w && (C += ` ${b}__${w}`), p && (C += ` ${b}__${p}`), _ && (C += ` ${_}`), C;
  }, c = /* @__PURE__ */ J(() => d(i(), n(), a()));
  var u = {
    get label() {
      return r();
    },
    set label(_) {
      r(_), o();
    },
    get variant() {
      return n();
    },
    set variant(_ = "") {
      n(_), o();
    },
    get size() {
      return a();
    },
    set size(_ = "") {
      a(_), o();
    },
    get content() {
      return s();
    },
    set content(_) {
      s(_), o();
    },
    get class() {
      return i();
    },
    set class(_ = "") {
      i(_), o();
    }
  }, f = Zg(), v = L(f);
  {
    var g = (_) => {
      var w = Ct();
      j(() => ee(w, s())), k(_, w);
    };
    V(v, (_) => {
      s() && a() !== "sm" && _(g);
    });
  }
  var h = D(v, 2), m = L(h, !0);
  return A(h), A(f), j(() => {
    we(f, 1, Ae(x(c))), ee(m, r());
  }), k(t, f), de(u);
}
oe(yc, { label: {}, variant: {}, size: {}, content: {}, class: {} }, [], [], !0);
function Be(t, e) {
  ue(e, !0);
  const r = l(e, "src", 7), n = l(e, "title", 7, ""), a = l(e, "native", 7, !1), s = l(e, "class", 7, ""), i = (v, g, h, m) => {
    let _ = v;
    return g && (_ = _.replace("</svg>", "<title>" + g + "</title></svg>"), _ = _.replace(' aria-hidden="true"', "")), h && (_ = _.replace(/class="/, 'class="native ')), m && (_ = _.replace(/class="/, 'class="' + m + " ")), _;
  };
  let d = /* @__PURE__ */ J(() => i(r(), n(), a(), s()));
  var c = {
    get src() {
      return r();
    },
    set src(v) {
      r(v), o();
    },
    get title() {
      return n();
    },
    set title(v = "") {
      n(v), o();
    },
    get native() {
      return a();
    },
    set native(v = !1) {
      a(v), o();
    },
    get class() {
      return s();
    },
    set class(v = "") {
      s(v), o();
    }
  }, u = le(), f = K(u);
  return pl(f, () => x(d)), k(t, u), de(c);
}
oe(Be, { src: {}, title: {}, native: {}, class: {} }, [], [], !0);
const Jg = '<svg aria-hidden="true" class="svg-icon iconCreditCard" width="18" height="18"  viewBox="0 0 18 18"><path  d="M3 3h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m0 6v4h12V9zm0-3h12V5H3z"/></svg>', $g = '<svg aria-hidden="true" class="svg-icon iconDocumentAlt" width="18" height="18"  viewBox="0 0 18 18"><path  d="M5 3a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm2 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-2 4.5c0-.28.22-.5.5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m.5 1.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1M5 14.5c0-.28.22-.5.5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/><path  d="M5.9 2h6.35A2.75 2.75 0 0 1 15 4.75v9.35c.62-.6 1-1.43 1-2.35v-7.5C16 2.45 14.54 1 12.75 1h-4.5c-.92 0-1.75.38-2.35 1" opacity=".4"/></svg>', eh = '<svg aria-hidden="true" class="svg-icon iconShield" width="18" height="18"  viewBox="0 0 18 18"><path  d="m2 4 7-3 7 3v5.02C16 13.69 10.69 17 9 17s-7-3.31-7-7.98zm6.14 5.2L7 12h4L9.86 9.2a.6.6 0 0 1 .25-.59c.56-.36.89-.95.89-1.61 0-1.09-.94-2-2.02-2A2 2 0 0 0 7 7c0 .66.33 1.25.89 1.61.2.13.3.36.25.59"/></svg>', th = '<svg aria-hidden="true" class="svg-icon iconShieldXSm" width="9" height="10"  viewBox="0 0 9 10"><path fill="var(--white)" d="M0 1.84 4.5 0 9 1.84v3.17C9 7.53 6.3 10 4.5 10S0 7.53 0 5.01z"/><path fill="var(--black-400)" d="M1 2.5 4.5 1 8 2.5v2.51C8 7.35 5.35 9 4.5 9S1 7.34 1 5.01zm2.98 3.02L3.2 7h2.6l-.78-1.48a.4.4 0 0 1 .15-.38c.34-.24.73-.7.73-1.14 0-.71-.5-1.23-1.41-1.23-.92 0-1.39.52-1.39 1.23 0 .44.4.9.73 1.14q.19.14.15.38"/></svg>', ko = '<svg aria-hidden="true" class="svg-icon iconStarVerifiedSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M7.7.72c-.4-.3-.94-.3-1.34 0l-1.26.92q-.23.17-.5.2l-1.54.25c-.49.07-.87.45-.95.94l-.23 1.55q-.05.27-.2.5L.74 6.32c-.3.4-.3.94 0 1.34l.92 1.26q.17.21.2.5l.24 1.54c.08.49.46.87.95.94l1.54.24q.27.05.5.2l1.26.93c.4.3.94.3 1.34 0l1.26-.92q.21-.16.5-.21l1.54-.24c.48-.07.87-.45.94-.94l.24-1.55q.05-.27.2-.5l.93-1.25c.3-.4.3-.94 0-1.34l-.93-1.26q-.15-.21-.2-.5l-.24-1.54A1.1 1.1 0 0 0 11 2.1l-1.55-.24q-.27-.05-.5-.2zm-.4 1.72.9 2.5q.07.17.27.2l2.65.08c.28 0 .4.36.17.53L9.21 7.38a.3.3 0 0 0-.1.32l.74 2.54a.3.3 0 0 1-.46.33L7.19 9.1a.3.3 0 0 0-.33 0l-2.19 1.48a.3.3 0 0 1-.46-.33l.74-2.54a.3.3 0 0 0-.1-.32l-2.1-1.63a.3.3 0 0 1 .18-.53l2.65-.09a.3.3 0 0 0 .27-.2l.9-2.49a.3.3 0 0 1 .56 0"/></svg>';
var rh = /* @__PURE__ */ R('<img class="s-avatar--image" alt="" role="presentation"/>'), nh = /* @__PURE__ */ R('<span class="s-avatar--letter" aria-hidden="true"> </span>'), ah = /* @__PURE__ */ R('<!> <span class="v-visible-sr"> </span> <!> <!>', 1);
function Ha(t, e) {
  ue(e, !0);
  const r = l(e, "name", 7), n = l(e, "size", 7, 16), a = l(e, "href", 7), s = l(e, "src", 7), i = l(e, "letter", 7), d = l(e, "status", 7), c = l(e, "badge", 7, !1), u = l(e, "class", 7, ""), f = l(e, "role", 7), v = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "name",
    "size",
    "href",
    "src",
    "letter",
    "status",
    "badge",
    "class",
    "role"
  ]), g = (p, b) => {
    const C = "s-avatar";
    let T = C;
    return p && (T += ` ${p}`), b !== 16 && (T += ` ${C}__${b}`), T;
  }, h = /* @__PURE__ */ J(() => g(u(), n()));
  var m = {
    get name() {
      return r();
    },
    set name(p) {
      r(p), o();
    },
    get size() {
      return n();
    },
    set size(p = 16) {
      n(p), o();
    },
    get href() {
      return a();
    },
    set href(p) {
      a(p), o();
    },
    get src() {
      return s();
    },
    set src(p) {
      s(p), o();
    },
    get letter() {
      return i();
    },
    set letter(p) {
      i(p), o();
    },
    get status() {
      return d();
    },
    set status(p) {
      d(p), o();
    },
    get badge() {
      return c();
    },
    set badge(p = !1) {
      c(p), o();
    },
    get class() {
      return u();
    },
    set class(p = "") {
      u(p), o();
    },
    get role() {
      return f();
    },
    set role(p) {
      f(p), o();
    }
  }, _ = le(), w = K(_);
  return St(w, () => a() ? "a" : "span", !1, (p, b) => {
    dt(p, () => ({
      class: x(h),
      href: a(),
      role: f() || a() && "link",
      ...v
    }));
    var C = ah(), T = K(C);
    {
      var P = (O) => {
        var M = rh();
        j(() => ae(M, "src", s())), k(O, M);
      }, y = (O) => {
        var M = le(), U = K(M);
        {
          var H = (S) => {
            var I = nh(), q = L(I, !0);
            A(I), j(() => ee(q, i())), k(S, I);
          };
          V(
            U,
            (S) => {
              i() && S(H);
            },
            !0
          );
        }
        k(O, M);
      };
      V(T, (O) => {
        s() ? O(P) : O(y, !1);
      });
    }
    var E = D(T, 2), z = L(E, !0);
    A(E);
    var B = D(E, 2);
    {
      var F = (O) => {
        {
          let M = /* @__PURE__ */ J(() => n() <= 24 ? "sm" : "");
          yc(O, {
            label: "Online",
            variant: "success",
            get size() {
              return x(M);
            },
            class: "s-avatar--indicator"
          });
        }
      };
      V(B, (O) => {
        d() === "online" && O(F);
      });
    }
    var N = D(B, 2);
    {
      var W = (O) => {
        Be(O, {
          class: "s-avatar--badge",
          get src() {
            return th;
          },
          native: !0
        });
      };
      V(N, (O) => {
        c() && O(W);
      });
    }
    j(() => ee(z, r())), k(b, C);
  }), k(t, _), de(m);
}
oe(
  Ha,
  {
    name: {},
    size: {},
    href: {},
    src: {},
    letter: {},
    status: {},
    badge: {},
    class: {},
    role: {}
  },
  [],
  [],
  !0
);
var sh = /* @__PURE__ */ R('<span><span class="v-visible-sr"> </span></span>');
function Si(t, e) {
  ue(e, !0);
  const r = l(e, "type", 7), n = l(e, "filled", 7), a = l(e, "size", 7), s = l(e, "name", 7), i = l(e, "class", 7, ""), d = (h, m, _, w) => {
    let p = "s-bling";
    return h && (p += " " + h), m && (p += " s-bling__" + m), w && (p += " s-bling__filled"), _ && (p += " s-bling__" + _), p;
  }, c = /* @__PURE__ */ J(() => d(i(), r(), a(), n()));
  var u = {
    get type() {
      return r();
    },
    set type(h) {
      r(h), o();
    },
    get filled() {
      return n();
    },
    set filled(h) {
      n(h), o();
    },
    get size() {
      return a();
    },
    set size(h) {
      a(h), o();
    },
    get name() {
      return s();
    },
    set name(h) {
      s(h), o();
    },
    get class() {
      return i();
    },
    set class(h = "") {
      i(h), o();
    }
  }, f = sh(), v = L(f), g = L(v, !0);
  return A(v), A(f), j(() => {
    we(f, 1, Ae(x(c))), ee(g, s());
  }), k(t, f), de(u);
}
oe(Si, { type: {}, filled: {}, size: {}, name: {}, class: {} }, [], [], !0);
var ih = /* @__PURE__ */ R("<span><!> <!> </span>");
function la(t, e) {
  ue(e, !0);
  const r = l(e, "text", 7), n = l(e, "label", 7, void 0), a = l(e, "type", 7, void 0), s = l(e, "size", 7, ""), i = l(e, "icon", 7, void 0), d = l(e, "squared", 7, !1), c = l(e, "important", 7, !1), u = l(e, "state", 7, void 0), f = l(e, "award", 7, void 0), v = l(e, "userType", 7, void 0), g = l(e, "class", 7, ""), h = /* @__PURE__ */ J(() => () => {
    const z = "s-badge";
    let B = z;
    return g() && (B += ` ${g()}`), s() && (B += ` ${z}__${s()}`), d() && (B += ` ${z}__squared`), c() && (B += ` ${z}__important`), a() === "state" && u() ? B += ` ${z}__${u()}` : a() === "user" && v() ? B += ` ${z}__${v()}` : a() === "tag" && f() && (B += ` ${z}__${f()}`), B;
  }), m = /* @__PURE__ */ J(() => () => a() === "general" || a() === "reputation" || a() === "activity" || a() === "achievement" && f() !== void 0), _ = /* @__PURE__ */ J(() => () => a() === "reputation" ? "rep" : a() === "activity" ? "activity" : a() === "achievement" && f() ? f() : ""), w = /* @__PURE__ */ J(() => () => !(a() === "tag" && f()));
  var p = {
    get text() {
      return r();
    },
    set text(z) {
      r(z), o();
    },
    get label() {
      return n();
    },
    set label(z = void 0) {
      n(z), o();
    },
    get type() {
      return a();
    },
    set type(z = void 0) {
      a(z), o();
    },
    get size() {
      return s();
    },
    set size(z = "") {
      s(z), o();
    },
    get icon() {
      return i();
    },
    set icon(z = void 0) {
      i(z), o();
    },
    get squared() {
      return d();
    },
    set squared(z = !1) {
      d(z), o();
    },
    get important() {
      return c();
    },
    set important(z = !1) {
      c(z), o();
    },
    get state() {
      return u();
    },
    set state(z = void 0) {
      u(z), o();
    },
    get award() {
      return f();
    },
    set award(z = void 0) {
      f(z), o();
    },
    get userType() {
      return v();
    },
    set userType(z = void 0) {
      v(z), o();
    },
    get class() {
      return g();
    },
    set class(z = "") {
      g(z), o();
    }
  }, b = ih(), C = L(b);
  {
    var T = (z) => {
      {
        let B = /* @__PURE__ */ J(() => x(_)()), F = /* @__PURE__ */ J(() => x(w)()), N = /* @__PURE__ */ J(() => n() ?? "badge");
        Si(z, {
          get type() {
            return x(B);
          },
          get filled() {
            return x(F);
          },
          get name() {
            return x(N);
          },
          get size() {
            return s();
          }
        });
      }
    };
    V(C, (z) => {
      x(m)() && z(T);
    });
  }
  var P = D(C, 2);
  {
    var y = (z) => {
      Be(z, {
        get src() {
          return i();
        }
      });
    };
    V(P, (z) => {
      i() && z(y);
    });
  }
  var E = D(P);
  return A(b), j(
    (z) => {
      we(b, 1, z), ee(E, ` ${r() ?? ""}`);
    },
    [() => Ae(x(h)())]
  ), k(t, b), de(p);
}
oe(
  la,
  {
    text: {},
    label: {},
    type: {},
    size: {},
    icon: {},
    squared: {},
    important: {},
    state: {},
    award: {},
    userType: {},
    class: {}
  },
  [],
  [],
  !0
);
var oh = /* @__PURE__ */ R('<div><div class="s-loader--sr-text"> </div></div>');
function xc(t, e) {
  ue(e, !0);
  const r = l(e, "label", 7, "Loading…"), n = l(e, "size", 7, void 0), a = (f) => {
    const v = "s-loader";
    let g = v;
    return f && (g += ` ${v}__${f}`), g;
  }, s = /* @__PURE__ */ J(() => a(n()));
  var i = {
    get label() {
      return r();
    },
    set label(f = "Loading…") {
      r(f), o();
    },
    get size() {
      return n();
    },
    set size(f = void 0) {
      n(f), o();
    }
  }, d = oh(), c = L(d), u = L(c, !0);
  return A(c), A(d), j(() => {
    we(d, 1, Ae(x(s))), ee(u, r());
  }), k(t, d), de(i);
}
oe(xc, { label: {}, size: {} }, [], [], !0);
var lh = /* @__PURE__ */ R('<!> <span class="s-btn--badge"><span class="s-btn--number"><!></span></span>', 1), ch = /* @__PURE__ */ R("<!><!>", 1);
function Ai(t, e) {
  ue(e, !0);
  const r = l(e, "branding", 7, ""), n = l(e, "size", 7, ""), a = l(e, "variant", 7, ""), s = l(e, "weight", 7, ""), i = l(e, "href", 7, void 0), d = l(e, "disabled", 7, !1), c = l(e, "dropdown", 7, !1), u = l(e, "icon", 7, !1), f = l(e, "link", 7, !1), v = l(e, "loading", 7, !1), g = l(e, "i18nLoadingText", 7, "Loading…"), h = l(e, "selected", 7, !1), m = l(e, "unset", 7, !1), _ = l(e, "class", 7, ""), w = l(e, "children", 7), p = l(e, "badge", 7), b = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "branding",
    "size",
    "variant",
    "weight",
    "href",
    "disabled",
    "dropdown",
    "icon",
    "link",
    "loading",
    "i18nLoadingText",
    "selected",
    "unset",
    "class",
    "children",
    "badge"
  ]), C = (z, B, F, N, W, O, M, U, H, S) => {
    const I = "s-btn";
    let q = I;
    const Q = [B, F, N, W];
    return z && (q += " " + z), Q.forEach((Z) => {
      Z && (q += ` ${I}__${Z}`);
    }), O && (q += ` ${I}__dropdown`), M && (q += ` ${I}__link`), U && (q += ` ${I}__icon`), H && (q += ` ${I}__unset`), S && (q += " is-selected"), q;
  }, T = /* @__PURE__ */ J(() => C(_(), r(), n(), a(), s(), c(), f(), u(), m(), h()));
  var P = {
    get branding() {
      return r();
    },
    set branding(z = "") {
      r(z), o();
    },
    get size() {
      return n();
    },
    set size(z = "") {
      n(z), o();
    },
    get variant() {
      return a();
    },
    set variant(z = "") {
      a(z), o();
    },
    get weight() {
      return s();
    },
    set weight(z = "") {
      s(z), o();
    },
    get href() {
      return i();
    },
    set href(z = void 0) {
      i(z), o();
    },
    get disabled() {
      return d();
    },
    set disabled(z = !1) {
      d(z), o();
    },
    get dropdown() {
      return c();
    },
    set dropdown(z = !1) {
      c(z), o();
    },
    get icon() {
      return u();
    },
    set icon(z = !1) {
      u(z), o();
    },
    get link() {
      return f();
    },
    set link(z = !1) {
      f(z), o();
    },
    get loading() {
      return v();
    },
    set loading(z = !1) {
      v(z), o();
    },
    get i18nLoadingText() {
      return g();
    },
    set i18nLoadingText(z = "Loading…") {
      g(z), o();
    },
    get selected() {
      return h();
    },
    set selected(z = !1) {
      h(z), o();
    },
    get unset() {
      return m();
    },
    set unset(z = !1) {
      m(z), o();
    },
    get class() {
      return _();
    },
    set class(z = "") {
      _(z), o();
    },
    get children() {
      return w();
    },
    set children(z) {
      w(z), o();
    },
    get badge() {
      return p();
    },
    set badge(z) {
      p(z), o();
    }
  }, y = le(), E = K(y);
  return St(E, () => i() ? "a" : "button", !1, (z, B) => {
    dt(z, () => ({
      href: i(),
      class: x(T),
      disabled: !i() && d() || null,
      "aria-disabled": i() && d() ? "true" : null,
      ...b
    }));
    var F = ch(), N = K(F);
    {
      var W = (H) => {
        xc(H, {
          size: "sm",
          get label() {
            return g();
          }
        });
      };
      V(N, (H) => {
        v() && H(W);
      });
    }
    var O = D(N);
    {
      var M = (H) => {
        var S = le(), I = K(S);
        me(I, w), k(H, S);
      }, U = (H) => {
        var S = lh(), I = K(S);
        me(I, w);
        var q = D(I, 2), Q = L(q), Z = L(Q);
        me(Z, p), A(Q), A(q), k(H, S);
      };
      V(O, (H) => {
        p() ? H(U, !1) : H(M);
      });
    }
    k(B, F);
  }), k(t, y), de(P);
}
oe(
  Ai,
  {
    branding: {},
    size: {},
    variant: {},
    weight: {},
    href: {},
    disabled: {},
    dropdown: {},
    icon: {},
    link: {},
    loading: {},
    i18nLoadingText: {},
    selected: {},
    unset: {},
    class: {},
    children: {},
    badge: {}
  },
  [],
  [],
  !0
);
var uh = /* @__PURE__ */ R('<abbr class="s-required-symbol">*</abbr>'), dh = /* @__PURE__ */ R("<label><!> <!> <!></label>");
function Gn(t, e) {
  ue(e, !0);
  const r = l(e, "id", 7), n = l(e, "size", 7, ""), a = l(e, "required", 7, !1), s = l(e, "status", 7), i = l(e, "statusText", 7, void 0), d = l(e, "class", 7, ""), c = l(e, "i18nRequiredText", 7, "Required"), u = l(e, "children", 7), f = (C, T) => {
    const P = "s-label";
    let y = P;
    return C && (y += " " + C), T && (y += ` ${P}__${T}`), y;
  }, v = /* @__PURE__ */ J(() => f(d(), n()));
  var g = {
    get id() {
      return r();
    },
    set id(C) {
      r(C), o();
    },
    get size() {
      return n();
    },
    set size(C = "") {
      n(C), o();
    },
    get required() {
      return a();
    },
    set required(C = !1) {
      a(C), o();
    },
    get status() {
      return s();
    },
    set status(C) {
      s(C), o();
    },
    get statusText() {
      return i();
    },
    set statusText(C = void 0) {
      i(C), o();
    },
    get class() {
      return d();
    },
    set class(C = "") {
      d(C), o();
    },
    get i18nRequiredText() {
      return c();
    },
    set i18nRequiredText(C = "Required") {
      c(C), o();
    },
    get children() {
      return u();
    },
    set children(C) {
      u(C), o();
    }
  }, h = dh(), m = L(h);
  me(m, u);
  var _ = D(m, 2);
  {
    var w = (C) => {
      var T = uh();
      j(() => ae(T, "title", c())), k(C, T);
    };
    V(_, (C) => {
      a() && C(w);
    });
  }
  var p = D(_, 2);
  {
    var b = (C) => {
      la(C, {
        type: "state",
        get state() {
          return s();
        },
        get text() {
          return i();
        }
      });
    };
    V(p, (C) => {
      i() && C(b);
    });
  }
  return A(h), j(() => {
    we(h, 1, Ae(x(v))), ae(h, "for", r());
  }), k(t, h), de(g);
}
oe(
  Gn,
  {
    id: {},
    size: {},
    required: {},
    status: {},
    statusText: {},
    class: {},
    i18nRequiredText: {},
    children: {}
  },
  [],
  [],
  !0
);
var fh = /* @__PURE__ */ R('<div> <p class="s-description"> </p></div>'), vh = /* @__PURE__ */ R('<p class="s-description"> </p>'), gh = /* @__PURE__ */ R(" <!>", 1), hh = /* @__PURE__ */ R('<input type="checkbox"/> <!>', 1);
function Ei(t, e) {
  ue(e, !0);
  let r = l(e, "id", 7), n = l(e, "name", 7), a = l(e, "label", 7), s = l(e, "checked", 15, !1), i = l(e, "indeterminate", 7, !1), d = l(e, "checkmark", 7, !1), c = l(e, "description", 7, ""), u = l(e, "disabled", 7, !1), f = l(e, "state", 7, ""), v = l(e, "value", 7, ""), g = l(e, "class", 7, ""), h = l(e, "onchange", 7), m;
  kt(() => {
    m && (m.indeterminate = i(), i() && s() && (s(!1), m.checked = !1));
  });
  const _ = (T, P, y) => {
    const E = "s-checkbox";
    let z = E;
    return T && (z += " " + T), P && (z += ` ${E}__checkmark`), y && (z += ` has-${y}`), z;
  }, w = /* @__PURE__ */ J(() => _(g(), d(), f()));
  var p = {
    get id() {
      return r();
    },
    set id(T) {
      r(T), o();
    },
    get name() {
      return n();
    },
    set name(T) {
      n(T), o();
    },
    get label() {
      return a();
    },
    set label(T) {
      a(T), o();
    },
    get checked() {
      return s();
    },
    set checked(T = !1) {
      s(T), o();
    },
    get indeterminate() {
      return i();
    },
    set indeterminate(T = !1) {
      i(T), o();
    },
    get checkmark() {
      return d();
    },
    set checkmark(T = !1) {
      d(T), o();
    },
    get description() {
      return c();
    },
    set description(T = "") {
      c(T), o();
    },
    get disabled() {
      return u();
    },
    set disabled(T = !1) {
      u(T), o();
    },
    get state() {
      return f();
    },
    set state(T = "") {
      f(T), o();
    },
    get value() {
      return v();
    },
    set value(T = "") {
      v(T), o();
    },
    get class() {
      return g();
    },
    set class(T = "") {
      g(T), o();
    },
    get onchange() {
      return h();
    },
    set onchange(T) {
      h(T), o();
    }
  }, b = le(), C = K(b);
  return St(C, () => d() ? "label" : "div", !1, (T, P) => {
    dt(T, () => ({ class: x(w), for: d() ? r() : void 0 }));
    var y = hh(), E = K(y);
    ui(E), E.__change = (W) => {
      i() && (s(!1), m && (m.checked = !1, m.indeterminate = !0)), h()?.(W);
    }, Wn(E, (W) => m = W, () => m);
    var z, B = D(E, 2);
    {
      var F = (W) => {
        var O = le(), M = K(O);
        {
          var U = (S) => {
            var I = fh(), q = L(I), Q = D(q), Z = L(Q, !0);
            A(Q), A(I), j(() => {
              ee(q, `${a() ?? ""} `), ee(Z, c());
            }), k(S, I);
          }, H = (S) => {
            var I = Ct();
            j(() => ee(I, a())), k(S, I);
          };
          V(M, (S) => {
            c() ? S(U) : S(H, !1);
          });
        }
        k(W, O);
      }, N = (W) => {
        Gn(W, {
          get id() {
            return r();
          },
          children: (O, M) => {
            mt();
            var U = gh(), H = K(U), S = D(H);
            {
              var I = (q) => {
                var Q = vh(), Z = L(Q, !0);
                A(Q), j(() => ee(Z, c())), k(q, Q);
              };
              V(S, (q) => {
                c() && q(I);
              });
            }
            j(() => ee(H, `${a() ?? ""} `)), k(O, U);
          },
          $$slots: { default: !0 }
        });
      };
      V(B, (W) => {
        d() ? W(F) : W(N, !1);
      });
    }
    j(() => {
      E.disabled = u(), ae(E, "id", r()), ae(E, "name", n()), z !== (z = v()) && (E.value = (E.__value = v()) ?? "");
    }), Td(E, s), k(P, y);
  }), k(t, b), de(p);
}
jt(["change"]);
oe(
  Ei,
  {
    id: {},
    name: {},
    label: {},
    checked: {},
    indeterminate: {},
    checkmark: {},
    description: {},
    disabled: {},
    state: {},
    value: {},
    class: {},
    onchange: {}
  },
  [],
  [],
  !0
);
var mh = /* @__PURE__ */ R('<div> <p class="s-description"> </p></div>'), _h = /* @__PURE__ */ R('<p class="s-description"> </p>'), bh = /* @__PURE__ */ R(" <!>", 1), ph = /* @__PURE__ */ R('<input type="radio"/> <!>', 1);
function Li(t, e) {
  ue(e, !0);
  let r = l(e, "id", 7), n = l(e, "name", 7), a = l(e, "label", 7), s = l(e, "checked", 7, !1), i = l(e, "checkmark", 7, !1), d = l(e, "description", 7, ""), c = l(e, "disabled", 7, !1), u = l(e, "state", 7, ""), f = l(e, "value", 7, ""), v = l(e, "class", 7, ""), g = l(e, "onchange", 7);
  const h = (b, C, T) => {
    const P = "s-radio";
    let y = P;
    return b && (y += " " + b), C && (y += ` ${P}__checkmark`), T && (y += ` has-${T}`), y;
  }, m = /* @__PURE__ */ J(() => h(v(), i(), u()));
  var _ = {
    get id() {
      return r();
    },
    set id(b) {
      r(b), o();
    },
    get name() {
      return n();
    },
    set name(b) {
      n(b), o();
    },
    get label() {
      return a();
    },
    set label(b) {
      a(b), o();
    },
    get checked() {
      return s();
    },
    set checked(b = !1) {
      s(b), o();
    },
    get checkmark() {
      return i();
    },
    set checkmark(b = !1) {
      i(b), o();
    },
    get description() {
      return d();
    },
    set description(b = "") {
      d(b), o();
    },
    get disabled() {
      return c();
    },
    set disabled(b = !1) {
      c(b), o();
    },
    get state() {
      return u();
    },
    set state(b = "") {
      u(b), o();
    },
    get value() {
      return f();
    },
    set value(b = "") {
      f(b), o();
    },
    get class() {
      return v();
    },
    set class(b = "") {
      v(b), o();
    },
    get onchange() {
      return g();
    },
    set onchange(b) {
      g(b), o();
    }
  }, w = le(), p = K(w);
  return St(p, () => i() ? "label" : "div", !1, (b, C) => {
    dt(b, () => ({ class: x(m), for: i() ? r() : void 0 }));
    var T = ph(), P = K(T);
    ui(P), P.__change = function(...B) {
      g()?.apply(this, B);
    };
    var y = D(P, 2);
    {
      var E = (B) => {
        var F = le(), N = K(F);
        {
          var W = (M) => {
            var U = mh(), H = L(U), S = D(H), I = L(S, !0);
            A(S), A(U), j(() => {
              ee(H, `${a() ?? ""} `), ee(I, d());
            }), k(M, U);
          }, O = (M) => {
            var U = Ct();
            j(() => ee(U, a())), k(M, U);
          };
          V(N, (M) => {
            d() ? M(W) : M(O, !1);
          });
        }
        k(B, F);
      }, z = (B) => {
        Gn(B, {
          get id() {
            return r();
          },
          children: (F, N) => {
            mt();
            var W = bh(), O = K(W), M = D(O);
            {
              var U = (H) => {
                var S = _h(), I = L(S, !0);
                A(S), j(() => ee(I, d())), k(H, S);
              };
              V(M, (H) => {
                d() && H(U);
              });
            }
            j(() => ee(O, `${a() ?? ""} `)), k(F, W);
          },
          $$slots: { default: !0 }
        });
      };
      V(y, (B) => {
        i() ? B(E) : B(z, !1);
      });
    }
    j(() => {
      md(P, s()), P.disabled = c(), ae(P, "id", r()), ae(P, "name", n()), hd(P, f());
    }), k(C, T);
  }), k(t, w), de(_);
}
jt(["change"]);
oe(
  Li,
  {
    id: {},
    name: {},
    label: {},
    checked: {},
    checkmark: {},
    description: {},
    disabled: {},
    state: {},
    value: {},
    class: {},
    onchange: {}
  },
  [],
  [],
  !0
);
var wh = /* @__PURE__ */ R('<fieldset><legend class="s-label"> </legend> <!></fieldset>');
function Pi(t, e) {
  ue(e, !0);
  let r = l(e, "type", 7), n = l(e, "label", 7), a = l(e, "name", 7), s = l(e, "options", 7), i = l(e, "value", 15), d = l(e, "disabled", 7, !1), c = l(e, "horizontal", 7, !1), u = l(e, "state", 7, ""), f = l(e, "class", 7, ""), v = l(e, "onValueChange", 7);
  const g = /* @__PURE__ */ J(() => s().map((y, E) => ({
    ...y,
    name: a(),
    id: y.id ?? `${a()}-${E}`
  }))), h = (y) => y ? r() === "radio" ? i() === y : Array.isArray(i()) && i().includes(y) : !1, m = (y, E) => {
    y && (r() === "radio" && E ? i(y) : r() === "checkbox" && E ? i([...Array.isArray(i()) ? i() : [], y]) : r() === "checkbox" && !E && i(Array.isArray(i()) ? i().filter((z) => z !== y) : []));
  }, _ = (y, E, z) => {
    const B = "s-form-group";
    let F = B;
    return y && (F += " " + y), E && (F += ` ${B}__horizontal`), z && (F += ` has-${z}`), F;
  }, w = /* @__PURE__ */ J(() => _(f(), c(), u()));
  kt(() => {
    v() && v()(i());
  });
  var p = {
    get type() {
      return r();
    },
    set type(y) {
      r(y), o();
    },
    get label() {
      return n();
    },
    set label(y) {
      n(y), o();
    },
    get name() {
      return a();
    },
    set name(y) {
      a(y), o();
    },
    get options() {
      return s();
    },
    set options(y) {
      s(y), o();
    },
    get value() {
      return i();
    },
    set value(y) {
      i(y), o();
    },
    get disabled() {
      return d();
    },
    set disabled(y = !1) {
      d(y), o();
    },
    get horizontal() {
      return c();
    },
    set horizontal(y = !1) {
      c(y), o();
    },
    get state() {
      return u();
    },
    set state(y = "") {
      u(y), o();
    },
    get class() {
      return f();
    },
    set class(y = "") {
      f(y), o();
    },
    get onValueChange() {
      return v();
    },
    set onValueChange(y) {
      v(y), o();
    }
  }, b = wh(), C = L(b), T = L(C, !0);
  A(C);
  var P = D(C, 2);
  return Pr(P, 17, () => x(g), (y) => y.value, (y, E) => {
    var z = le(), B = K(z);
    {
      var F = (W) => {
        const O = /* @__PURE__ */ J(() => x(E));
        {
          let M = /* @__PURE__ */ J(() => x(O).checked !== void 0 ? x(O).checked : h(x(E).value));
          Ei(W, un(() => x(O), {
            get checked() {
              return x(M);
            },
            onchange: (U) => {
              const H = U.currentTarget.checked;
              m(x(E).value, H), x(O).onchange?.(U);
            }
          }));
        }
      }, N = (W) => {
        const O = /* @__PURE__ */ J(() => x(E));
        {
          let M = /* @__PURE__ */ J(() => h(x(E).value ?? ""));
          Li(W, un(() => x(O), {
            get checked() {
              return x(M);
            },
            onchange: (U) => {
              m(x(E).value, U.currentTarget.checked), x(O).onchange?.(U);
            }
          }));
        }
      };
      V(B, (W) => {
        r() === "checkbox" ? W(F) : W(N, !1);
      });
    }
    k(y, z);
  }), A(b), j(() => {
    we(b, 1, Ae(x(w))), b.disabled = d(), ee(T, n());
  }), k(t, b), de(p);
}
oe(
  Pi,
  {
    type: {},
    label: {},
    name: {},
    options: {},
    value: {},
    disabled: {},
    horizontal: {},
    state: {},
    class: {},
    onValueChange: {}
  },
  [],
  [],
  !0
);
function yh(t, e) {
  ue(e, !0);
  let r = l(e, "label", 7), n = l(e, "name", 7), a = l(e, "options", 7), s = l(e, "value", 31, () => tr([])), i = l(e, "disabled", 7, !1), d = l(e, "horizontal", 7, !1), c = l(e, "state", 7, ""), u = l(e, "class", 7, ""), f = l(e, "onValueChange", 7);
  var v = {
    get label() {
      return r();
    },
    set label(g) {
      r(g), o();
    },
    get name() {
      return n();
    },
    set name(g) {
      n(g), o();
    },
    get options() {
      return a();
    },
    set options(g) {
      a(g), o();
    },
    get value() {
      return s();
    },
    set value(g = []) {
      s(g), o();
    },
    get disabled() {
      return i();
    },
    set disabled(g = !1) {
      i(g), o();
    },
    get horizontal() {
      return d();
    },
    set horizontal(g = !1) {
      d(g), o();
    },
    get state() {
      return c();
    },
    set state(g = "") {
      c(g), o();
    },
    get class() {
      return u();
    },
    set class(g = "") {
      u(g), o();
    },
    get onValueChange() {
      return f();
    },
    set onValueChange(g) {
      f(g), o();
    }
  };
  return Pi(t, {
    type: "checkbox",
    get class() {
      return u();
    },
    get disabled() {
      return i();
    },
    get horizontal() {
      return d();
    },
    get label() {
      return r();
    },
    get name() {
      return n();
    },
    get options() {
      return a();
    },
    get state() {
      return c();
    },
    get onValueChange() {
      return f();
    },
    get value() {
      return s();
    },
    set value(g) {
      s(g);
    }
  }), de(v);
}
oe(
  yh,
  {
    label: {},
    name: {},
    options: {},
    value: {},
    disabled: {},
    horizontal: {},
    state: {},
    class: {},
    onValueChange: {}
  },
  [],
  [],
  !0
);
const xh = '<svg width="140" height="140" viewBox="0 0 140 140" class="svg-spot SpotEmpty" aria-hidden="true"><rect width="100" height="35" x="10" y="95" fill="#9d9cff"/><path fill="var(--purple-600)" d="M20 110h80v-5H20zM20 120h50v-5H20zM110 95v4L10 96.46V95z"/><rect width="100" height="35" x="30" y="60" fill="#0f2466"/><path fill="var(--blue-400)" d="M130 60v4L30 61.46V60zM40 75h80v-5H40zM40 85h50v-5H40z"/><path fill="#998b7a" d="M80 60H10V25h70zm10-2h-5v-3h5zm10 0h-5v-3h5zm10 0h-5v-3h5zm-20-8h-5v-5h5zm10 0h-5v-5h5zm10 0h-5v-5h5zM90 40h-5v-5h5zm10 0h-5v-5h5zm10 0h-5v-5h5zM90 30h-5v-5h5zm10 0h-5v-5h5zm10 0h-5v-5h5z"/><path fill="var(--black-600)" d="M67 50H18v-5h49zm8-10H18v-5h57z"/></svg>';
var Th = /* @__PURE__ */ R("<div><!> <!> <p><!></p> <!></div>");
function kh(t, e) {
  ue(e, !0);
  let r = l(e, "title", 7), n = l(e, "titleTag", 7, "h4"), a = l(e, "class", 7), s = l(e, "description", 7), i = l(e, "actions", 7);
  var d = {
    get title() {
      return r();
    },
    set title(w) {
      r(w), o();
    },
    get titleTag() {
      return n();
    },
    set titleTag(w = "h4") {
      n(w), o();
    },
    get class() {
      return a();
    },
    set class(w) {
      a(w), o();
    },
    get description() {
      return s();
    },
    set description(w) {
      s(w), o();
    },
    get actions() {
      return i();
    },
    set actions(w) {
      i(w), o();
    }
  }, c = Th(), u = L(c);
  Be(u, {
    get src() {
      return xh;
    },
    native: !0
  });
  var f = D(u, 2);
  {
    var v = (w) => {
      var p = le(), b = K(p);
      St(b, n, !1, (C, T) => {
        we(C, 0, "s-empty-state--title");
        var P = Ct();
        j(() => ee(P, r())), k(T, P);
      }), k(w, p);
    };
    V(f, (w) => {
      r() && w(v);
    });
  }
  var g = D(f, 2), h = L(g);
  me(h, s), A(g);
  var m = D(g, 2);
  {
    var _ = (w) => {
      var p = le(), b = K(p);
      me(b, i), k(w, p);
    };
    V(m, (w) => {
      i() && w(_);
    });
  }
  return A(c), j(() => we(c, 1, Ae(["s-empty-state", a()]))), k(t, c), de(d);
}
oe(
  kh,
  {
    title: {},
    titleTag: {},
    class: {},
    description: {},
    actions: {}
  },
  [],
  [],
  !0
);
var Ch = /* @__PURE__ */ R('<div class="d-flex ai-center ps-relative w100"><textarea></textarea> <pre aria-hidden="true"> <br/></pre></div>');
const Sh = {
  hash: "svelte-1a3bcdv",
  code: ".hmn48.svelte-1a3bcdv {min-height:48px;}textarea.svelte-1a3bcdv {resize:none;}"
};
function Ah(t, e) {
  ue(e, !0), ci(t, Sh);
  let r = l(e, "id", 7), n = l(e, "variant", 7, "default"), a = l(e, "value", 7, ""), s = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "id",
    "variant",
    "value"
  ]);
  const i = (h) => {
    let m = "s-textarea ws-pre-wrap break-word hmx3 lh-lg h100", _ = `${m} ps-absolute i0`, w = `${m} v-hidden overflow-hidden`;
    if (h === "chat") {
      let p = " py12 pr64 hmn48";
      _ += p, w += p;
    }
    return { textarea: _, grower: w };
  };
  let d = /* @__PURE__ */ J(() => i(n()));
  var c = {
    get id() {
      return r();
    },
    set id(h) {
      r(h), o();
    },
    get variant() {
      return n();
    },
    set variant(h = "default") {
      n(h), o();
    },
    get value() {
      return a();
    },
    set value(h = "") {
      a(h), o();
    }
  }, u = Ch(), f = L(u);
  ai(f), dt(f, () => ({ class: x(d).textarea, rows: "1", id: r(), ...s }), void 0, void 0, "svelte-1a3bcdv");
  var v = D(f, 2), g = L(v, !0);
  return mt(), A(v), A(u), j(() => {
    we(v, 1, Ae(x(d).grower), "svelte-1a3bcdv"), ee(g, a());
  }), fi(f, a), k(t, u), de(c);
}
oe(Ah, { id: {}, variant: {}, value: {} }, [], [], !0);
function Ii(t, e) {
  ue(e, !0);
  const r = l(e, "href", 7, void 0), n = l(e, "variant", 7, ""), a = l(e, "disabled", 7, !1), s = l(e, "dropdown", 7, !1), i = l(e, "underlined", 7, !1), d = l(e, "class", 7, ""), c = l(e, "children", 7), u = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "href",
    "variant",
    "disabled",
    "dropdown",
    "underlined",
    "class",
    "children"
  ]), f = (_, w, p, b) => {
    const C = "s-link";
    let T = C;
    return _ && (T += ` ${_}`), w && (T += ` ${C}__${w}`), p && (T += ` ${C}__dropdown`), b && (T += ` ${C}__underlined`), T;
  }, v = /* @__PURE__ */ J(() => f(d(), n(), s(), i()));
  var g = {
    get href() {
      return r();
    },
    set href(_ = void 0) {
      r(_), o();
    },
    get variant() {
      return n();
    },
    set variant(_ = "") {
      n(_), o();
    },
    get disabled() {
      return a();
    },
    set disabled(_ = !1) {
      a(_), o();
    },
    get dropdown() {
      return s();
    },
    set dropdown(_ = !1) {
      s(_), o();
    },
    get underlined() {
      return i();
    },
    set underlined(_ = !1) {
      i(_), o();
    },
    get class() {
      return d();
    },
    set class(_ = "") {
      d(_), o();
    },
    get children() {
      return c();
    },
    set children(_) {
      c(_), o();
    }
  }, h = le(), m = K(h);
  return St(m, () => r() ? "a" : "button", !1, (_, w) => {
    dt(_, () => ({
      href: r(),
      class: x(v),
      disabled: !r() && a() || null,
      "aria-disabled": r() && a() ? "true" : null,
      ...u
    }));
    var p = le(), b = K(p);
    me(b, c), k(w, p);
  }), k(t, h), de(g);
}
oe(
  Ii,
  {
    href: {},
    variant: {},
    disabled: {},
    dropdown: {},
    underlined: {},
    class: {},
    children: {}
  },
  [],
  [],
  !0
);
function Eh(t, e) {
  ue(e, !0);
  let r = l(e, "class", 7, ""), n = l(e, "type", 7, "ul"), a = l(e, "children", 7);
  const s = (f) => {
    let g = "s-menu";
    return f && (g += ` ${f}`), g;
  }, i = /* @__PURE__ */ J(() => s(r()));
  var d = {
    get class() {
      return r();
    },
    set class(f = "") {
      r(f), o();
    },
    get type() {
      return n();
    },
    set type(f = "ul") {
      n(f), o();
    },
    get children() {
      return a();
    },
    set children(f) {
      a(f), o();
    }
  }, c = le(), u = K(c);
  return St(u, n, !1, (f, v) => {
    dt(f, () => ({
      class: x(i),
      role: n() !== "fieldset" ? "menu" : void 0
    }));
    var g = le(), h = K(g);
    me(h, a), k(v, g);
  }), k(t, c), de(d);
}
oe(Eh, { class: {}, type: {}, children: {} }, [], [], !0);
var Lh = /* @__PURE__ */ R('<li role="separator"></li>');
function Ph(t, e) {
  ue(e, !0);
  let r = l(e, "class", 7, "");
  const n = (d) => {
    let u = "s-menu--divider";
    return d && (u += ` ${d}`), u;
  }, a = /* @__PURE__ */ J(() => n(r()));
  var s = {
    get class() {
      return r();
    },
    set class(d = "") {
      r(d), o();
    }
  }, i = Lh();
  return j(() => we(i, 1, Ae(x(a)))), k(t, i), de(s);
}
oe(Ph, { class: {} }, [], [], !0);
var Ih = /* @__PURE__ */ R("<!> <!>", 1), zh = /* @__PURE__ */ R('<li role="menuitem"><!></li>');
function Mh(t, e) {
  ue(e, !0);
  let r = l(e, "href", 7), n = l(e, "danger", 7, !1), a = l(e, "icon", 7), s = l(e, "selected", 7, !1), i = l(e, "class", 7, ""), d = l(e, "onclick", 7), c = l(e, "children", 7), u = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "href",
    "danger",
    "icon",
    "selected",
    "class",
    "onclick",
    "children"
  ]);
  const f = (p) => `s-menu--item${p ? ` ${p}` : ""}`, v = (p, b, C) => {
    const T = "s-menu--action";
    let P = T;
    return b && (P += ` ${T}__danger`), C && (P += " is--selected"), P;
  }, g = /* @__PURE__ */ J(() => f(i())), h = /* @__PURE__ */ J(() => v("", n(), s()));
  var m = {
    get href() {
      return r();
    },
    set href(p) {
      r(p), o();
    },
    get danger() {
      return n();
    },
    set danger(p = !1) {
      n(p), o();
    },
    get icon() {
      return a();
    },
    set icon(p) {
      a(p), o();
    },
    get selected() {
      return s();
    },
    set selected(p = !1) {
      s(p), o();
    },
    get class() {
      return i();
    },
    set class(p = "") {
      i(p), o();
    },
    get onclick() {
      return d();
    },
    set onclick(p) {
      d(p), o();
    },
    get children() {
      return c();
    },
    set children(p) {
      c(p), o();
    }
  }, _ = zh(), w = L(_);
  return St(w, () => r() ? "a" : "button", !1, (p, b) => {
    dt(p, () => ({
      href: r(),
      onclick: d(),
      class: x(h),
      ...u
    }));
    var C = Ih(), T = K(C);
    {
      var P = (E) => {
        Be(E, {
          get src() {
            return a();
          },
          class: "s-menu--icon"
        });
      };
      V(T, (E) => {
        a() && E(P);
      });
    }
    var y = D(T, 2);
    me(y, c), k(b, C);
  }), A(_), j(() => we(_, 1, Ae(x(g)))), k(t, _), de(m);
}
oe(
  Mh,
  {
    href: {},
    danger: {},
    icon: {},
    selected: {},
    class: {},
    onclick: {},
    children: {}
  },
  [],
  [],
  !0
);
var Oh = /* @__PURE__ */ R("<div><!> <!></div>");
function Nh(t, e) {
  ue(e, !0);
  const r = l(e, "id", 7), n = l(e, "name", 7), a = l(e, "label", 7), s = l(e, "type", 7), i = l(e, "checked", 7, !1), d = l(e, "description", 7, ""), c = l(e, "disabled", 7, !1), u = l(e, "icon", 7), f = l(e, "value", 7, ""), v = l(e, "class", 7, ""), g = (P) => `s-menu--item${P ? ` ${P}` : ""}`, h = /* @__PURE__ */ J(() => g(v()));
  var m = {
    get id() {
      return r();
    },
    set id(P) {
      r(P), o();
    },
    get name() {
      return n();
    },
    set name(P) {
      n(P), o();
    },
    get label() {
      return a();
    },
    set label(P) {
      a(P), o();
    },
    get type() {
      return s();
    },
    set type(P) {
      s(P), o();
    },
    get checked() {
      return i();
    },
    set checked(P = !1) {
      i(P), o();
    },
    get description() {
      return d();
    },
    set description(P = "") {
      d(P), o();
    },
    get disabled() {
      return c();
    },
    set disabled(P = !1) {
      c(P), o();
    },
    get icon() {
      return u();
    },
    set icon(P) {
      u(P), o();
    },
    get value() {
      return f();
    },
    set value(P = "") {
      f(P), o();
    },
    get class() {
      return v();
    },
    set class(P = "") {
      v(P), o();
    }
  }, _ = Oh(), w = L(_);
  {
    var p = (P) => {
      Be(P, {
        get src() {
          return u();
        },
        class: "s-menu--icon"
      });
    };
    V(w, (P) => {
      u() && P(p);
    });
  }
  var b = D(w, 2);
  {
    var C = (P) => {
      Ei(P, {
        class: "s-menu--action",
        get checked() {
          return i();
        },
        get description() {
          return d();
        },
        get disabled() {
          return c();
        },
        get id() {
          return r();
        },
        get label() {
          return a();
        },
        get name() {
          return n();
        },
        get value() {
          return f();
        },
        checkmark: !0
      });
    }, T = (P) => {
      Li(P, {
        class: "s-menu--action",
        get checked() {
          return i();
        },
        get description() {
          return d();
        },
        get disabled() {
          return c();
        },
        get id() {
          return r();
        },
        get label() {
          return a();
        },
        get name() {
          return n();
        },
        get value() {
          return f();
        },
        checkmark: !0
      });
    };
    V(b, (P) => {
      s() === "checkbox" ? P(C) : P(T, !1);
    });
  }
  return A(_), j(() => we(_, 1, Ae(x(h)))), k(t, _), de(m);
}
oe(
  Nh,
  {
    id: {},
    name: {},
    label: {},
    type: {},
    checked: {},
    description: {},
    disabled: {},
    icon: {},
    value: {},
    class: {}
  },
  [],
  [],
  !0
);
function Bh(t, e) {
  ue(e, !0);
  let r = l(e, "class", 7, ""), n = l(e, "type", 7, "li"), a = l(e, "children", 7);
  const s = (f) => {
    let g = "s-menu--title";
    return f && (g += ` ${f}`), g;
  }, i = /* @__PURE__ */ J(() => s(r()));
  var d = {
    get class() {
      return r();
    },
    set class(f = "") {
      r(f), o();
    },
    get type() {
      return n();
    },
    set type(f = "li") {
      n(f), o();
    },
    get children() {
      return a();
    },
    set children(f) {
      a(f), o();
    }
  }, c = le(), u = K(c);
  return St(u, n, !1, (f, v) => {
    dt(f, () => ({
      class: x(i),
      role: n() === "li" ? "separator" : void 0
    }));
    var g = le(), h = K(g);
    me(h, a), k(v, g);
  }), k(t, c), de(d);
}
oe(Bh, { class: {}, type: {}, children: {} }, [], [], !0);
const cs = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconAlert" aria-hidden="true"><path d="M10 2q.41.01.64.37l8.76 14.58a.75.75 0 0 1-.65 1.14H1.25a.75.75 0 0 1-.65-1.14L9.36 2.37l.05-.09A.8.8 0 0 1 10 2M2.57 16.6h14.86L10 4.2zM11 15.52H9v-2h2zm0-2.97H9v-5.5h2z"/></svg>', us = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconAlertFill" aria-hidden="true"><path d="M10 2q.41.01.64.37l8.76 14.58a.75.75 0 0 1-.65 1.14H1.25a.75.75 0 0 1-.65-1.14L9.36 2.37l.05-.08A.8.8 0 0 1 10 2M9 13.53v2h2v-2zm0-6.47v5.5h2v-5.5z"/></svg>', Co = '<svg width="16" height="16" viewBox="0 0 16 16" class="svg-icon IconAnswer16" aria-hidden="true"><path d="M13.5 1c.83 0 1.5.67 1.5 1.5v10.8a1.5 1.5 0 0 1-2.42 1.19l-.09-.08-2.66-2.4H2.5L2.35 12A1.5 1.5 0 0 1 1 10.66L1 10.5v-8C1 1.67 1.67 1 2.5 1zm-11 1.5v8h7.91l.43.4 2.66 2.4V2.5zM11 5.6 6.78 9.82 5 8.04v-2.3l1.78 1.78L11 3.3z"/></svg>', js = '<svg width="16" height="16" viewBox="0 0 16 16" class="svg-icon IconAnswer16Fill" aria-hidden="true"><path d="M13.5 1c.83 0 1.5.67 1.5 1.5v10.8a1.5 1.5 0 0 1-2.5 1.11l-2.67-2.4H2.5A1.5 1.5 0 0 1 1 10.5V2.5C1 1.67 1.67 1 2.5 1zM6.78 7.52 5 5.74v2.3l1.78 1.78L11 5.6V3.3z"/></svg>', Dh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconArrowLeft" aria-hidden="true"><path d="m10.77 16.2-1.04 1.1L4.2 12h2.17zm0-12.91L4.91 9H18v1.5H2.63l-.15-.14-.56-.54.56-.54 7.25-7.07z"/></svg>', Rh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconArrowRight" aria-hidden="true"><path d="m17.52 9.28.56.54-.56.54-7.25 6.93-1.04-1.08 5.97-5.71H2V9h15.24zM15.7 7.5h-2.15L9.23 3.29l1.04-1.08z"/></svg>', ds = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconCheck" aria-hidden="true"><path d="m18.16 5-.53.53L7.55 15.61l-.53.53-5.03-5.03 1.06-1.06 3.97 3.97 9.55-9.55.53-.53z"/></svg>', Uh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconCompose" aria-hidden="true"><path d="M6.22 5.5H3.5V16c0 .28.22.5.5.5h10.5v-2.72H16V18H4a2 2 0 0 1-2-2V4h4.22zm7.5-2.74a2.5 2.5 0 0 1 3.52 0l.17.2c.8.97.74 2.41-.17 3.32L9.5 14H6v-3.5zM7.5 11.12v1.38h1.38l5.42-5.41-1.39-1.4zm8.68-7.3a1 1 0 0 0-1.4 0l-.8.81 1.39 1.4.8-.8a1 1 0 0 0 0-1.4"/></svg>', zi = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconCross" aria-hidden="true"><path d="m9.75 8.69 1.06 1.06 4.9 4.9-1.06 1.06-4.9-4.9-4.9 4.9-1.06-1.06 4.9-4.9-4.9-4.9 1.06-1.06zm4.9-4.9 1.06 1.06-4.07 4.08-1.07-1.07z"/></svg>', Vh = '<svg width="16" height="16" viewBox="0 0 16 16" class="svg-icon IconCross16" aria-hidden="true"><path d="M12.5 4.38 8.88 8l3.62 3.62-.88.88L8 8.88 4.38 12.5l-.88-.88L7.12 8 3.5 4.38l.88-.88L8 7.12l3.62-3.62z"/></svg>', qh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconDocument" aria-hidden="true"><path d="M16 7.1v9.23c0 .86-.66 1.58-1.5 1.66l-.17.01h-8.8v-1.5h8.8q.16-.02.17-.17V7h-3.64V3.5h-5.2q-.15.02-.16.17V16.5H4V3.67C4 2.75 4.75 2 5.67 2H11zm-2.79 7.4H7V13h6.21zm0-3H7V10h6.21zm-4-3H7V7h2.22z"/></svg>', Hh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconEye" aria-hidden="true"><path d="M10 4a9.2 9.2 0 0 1 6.63 2.85 12 12 0 0 1 2.01 2.76l.03.05v.02h.01L18 10l.68.31v.01l-.01.02-.03.05a7 7 0 0 1-.47.83c-.33.53-.84 1.23-1.54 1.93A9.2 9.2 0 0 1 10 16a9.2 9.2 0 0 1-6.63-2.85 12 12 0 0 1-2.02-2.76l-.02-.05v-.02h-.01L2 10l-.68-.31v-.03l.03-.05a7 7 0 0 1 .48-.83c.33-.53.84-1.23 1.54-1.93A9.2 9.2 0 0 1 10 4m0 1.5a7.7 7.7 0 0 0-5.57 2.4A10 10 0 0 0 2.85 10q.09.17.25.42c.29.46.73 1.07 1.33 1.68A7.7 7.7 0 0 0 10 14.5a7.7 7.7 0 0 0 5.57-2.4 10 10 0 0 0 1.58-2.1l-.25-.42c-.29-.46-.73-1.07-1.33-1.68A7.7 7.7 0 0 0 10 5.5m0 1.34a3.16 3.16 0 1 1 0 6.32 3.16 3.16 0 0 1 0-6.32m0 1.5a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32M2 10l-.68.31a.8.8 0 0 1 0-.62zm16.68-.31q.15.31 0 .62L18 10z"/></svg>', Fh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconFlag" aria-hidden="true"><path d="M9.25 2v1.5h6.74v8.99H9.24V11H4.52v7h-1.5V2zM4.52 9.5h4.73V11h5.24V5H9.24V3.5H4.52z"/></svg>', jh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconHelp" aria-hidden="true"><path d="M17.33 4.64a9.08 9.08 0 0 1-12.7 12.7l1.08-1.09A7.58 7.58 0 0 0 16.25 5.71zM10 .92c2.47 0 4.7.98 6.34 2.58l-1.06 1.06A7.58 7.58 0 0 0 4.56 15.28L3.5 16.34A9.08 9.08 0 0 1 10 .91M11 15H9v-2h2zm-.83-10c2.23 0 3.47 1.17 3.47 3.03 0 2.2-2.62 2.7-2.62 3.97H9c0-2.44 2.5-2.53 2.5-3.97 0-.66-.34-1.17-1.27-1.17-.87 0-1.29.57-1.37 1.5H6.73A3.4 3.4 0 0 1 10.17 5"/></svg>', Wh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconInfo" aria-hidden="true"><path d="M17.33 4.64a9.08 9.08 0 0 1-12.7 12.7l1.08-1.09A7.58 7.58 0 0 0 16.25 5.71zM10 .92c2.47 0 4.7.98 6.34 2.58l-1.06 1.06A7.58 7.58 0 0 0 4.56 15.28L3.5 16.34A9.08 9.08 0 0 1 10 .91"/><path d="M10.76 15h-2V8h2zm0-8h-2V5h2z"/></svg>', Yh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconKey" aria-hidden="true"><path d="M18.5 7.44 17.44 8.5l1.06 1.06-5.5 5.5-1.72-1.72-1.72 1.91-.23.25H8.5V17H6.75v2H1v-3.99l.22-.22L6.94 9l-2-2L11.5.44zm-16 8.19v1.87h2.75v-2H7V14h1.67l1.55-1.72L8 10.06zM7.06 7 13 12.94l4.44-4.44-5.94-5.94zm7.83.83-1.06 1.06L11 6.06 12.06 5z"/></svg>', Gh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconNotification" aria-hidden="true"><path d="M8.32 15a1.65 1.65 0 0 0 3.3 0h1.5a3.15 3.15 0 0 1-6.3 0zM9.97 2c1.29 0 2.52.53 3.42 1.46s1.4 2.18 1.4 3.49c0 1.87.32 3.17.67 4.05h-1.6a13 13 0 0 1-.56-4.05c0-.92-.36-1.8-.99-2.45a3.27 3.27 0 0 0-4.68 0 3.5 3.5 0 0 0-.98 2.45c0 2.56-.54 4.25-1.1 5.34l-.13.21h10.66a.75.75 0 0 1 0 1.5H3.86a.75.75 0 0 1-.52-1.29l.1-.08h-.01l.03-.02q.05-.04.17-.16.23-.23.59-.86c.44-.84.93-2.3.93-4.64 0-1.3.5-2.56 1.4-3.5A4.8 4.8 0 0 1 9.97 2"/></svg>', Xh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconSearch" aria-hidden="true"><path d="M8.25 1a7.25 7.25 0 0 1 6.67 10.1l-1.17-1.17a5.75 5.75 0 1 0-.94 1.82l1.07 1.07 4.15 4.15-1.06 1.06-4.15-4.15A7.25 7.25 0 1 1 8.25 1"/></svg>', Kh = '<svg width="20" height="20" viewBox="0 0 20 20" class="svg-icon IconStar" aria-hidden="true"><path d="M12.25 7h7.28l-5.89 4.29.68 2.08-2.07-1.5-.04-.12-.33-1.04.88-.64 2.16-1.56h-3.76l-.34-1.04L10 4.94l-.82 2.53-.34 1.04H5.08l2.16 1.56.88.64-.33 1.04-.83 2.54 2.16-1.57.87-.64 5.12 3.72.78 2.41L10 13.93l-5.9 4.28 2.26-6.92L.46 7h7.29L10 .08z"/></svg>', Qh = '<svg width="16" height="16" viewBox="0 0 16 16" class="svg-icon IconVote16Down" aria-hidden="true"><path d="M8 13.25a.6.6 0 0 1-.53-.3l-6.26-10A.63.63 0 0 1 1.74 2h12.52a.63.63 0 0 1 .53.96l-6.26 10-.05.06a.6.6 0 0 1-.48.23m5.14-10H2.86L8 11.45z"/></svg>', Zh = '<svg width="16" height="16" viewBox="0 0 16 16" class="svg-icon IconVote16DownFill" aria-hidden="true"><path d="M8 13.25a.6.6 0 0 1-.53-.3l-6.26-10A.63.63 0 0 1 1.74 2h12.52a.63.63 0 0 1 .53.96l-6.26 10-.05.06a.6.6 0 0 1-.48.23"/></svg>', Mi = '<svg width="16" height="16" viewBox="0 0 16 16" class="svg-icon IconVote16Up" aria-hidden="true"><path d="M8 1.78q.33 0 .53.3l6.26 10a.63.63 0 0 1-.53.95H1.73a.63.63 0 0 1-.52-.96l6.26-10 .05-.06c.11-.14.3-.23.48-.23m-5.14 10h10.28L8 3.58z"/></svg>', Jh = '<svg width="16" height="16" viewBox="0 0 16 16" class="svg-icon IconVote16UpFill" aria-hidden="true"><path d="M8 1.78q.33 0 .53.3l6.26 10a.63.63 0 0 1-.53.95H1.73a.63.63 0 0 1-.52-.96l6.26-10 .05-.06c.11-.14.3-.23.48-.23"/></svg>', Tc = (t) => {
  const e = (r) => {
    const n = r.target;
    t.contains(n) || t.dispatchEvent(new CustomEvent("outclick", { detail: n }));
  };
  return document.addEventListener("click", e, !0), {
    destroy() {
      document.removeEventListener("click", e, !0);
    }
  };
}, $h = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "button:not([disabled]):not([aria-hidden])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])'
], em = (t) => {
  const e = document.defaultView?.getComputedStyle(t);
  return !!(e && e.getPropertyValue("display") !== "none" && e.getPropertyValue("visibility") !== "hidden");
}, So = async (t) => (await Ja(), [...t.querySelectorAll($h.join(", "))].filter(em)), Ws = (t) => {
  t[0] && t[0].focus();
}, Ao = (t) => {
  t[t.length - 1] && t[t.length - 1].focus();
}, tm = ({ allFocusableItems: t, currentlyFocusedItem: e }) => {
  if (!e) {
    Ao(t);
    return;
  }
  const r = t.indexOf(e);
  if (r === 0) {
    Ao(t);
    return;
  }
  const n = t[r - 1];
  n && n.focus();
}, rm = ({ allFocusableItems: t, currentlyFocusedItem: e }) => {
  if (!e) {
    Ws(t);
    return;
  }
  const r = t.indexOf(e);
  if (t.length - 1 === r) {
    Ws(t);
    return;
  }
  const n = t[r + 1];
  n && n.focus();
}, kc = (t, { active: e, initialFocusElement: r, returnFocusElement: n }) => {
  let a;
  const s = async (c) => {
    const { key: u, shiftKey: f } = c;
    if (u === "Tab") {
      c.preventDefault(), c.stopPropagation();
      const v = await So(t), g = document.activeElement;
      f ? tm({ allFocusableItems: v, currentlyFocusedItem: g }) : rm({ allFocusableItems: v, currentlyFocusedItem: g });
    }
  }, i = async () => {
    const c = await So(t);
    a ??= document.activeElement, r ? r.focus() : Ws(c), document.addEventListener("keydown", s);
  }, d = () => {
    n ? n.focus() : a?.focus(), document.removeEventListener("keydown", s), a = null;
  };
  return e && i(), {
    update: ({ active: c }) => {
      c ? i() : d();
    },
    destroy: d
  };
};
var nm = /* @__PURE__ */ R('<div class="d-flex g8 s-modal--footer"><!></div>'), am = /* @__PURE__ */ R('<aside role="dialog"><div role="document"><h1 class="s-modal--header"><!></h1> <div class="s-modal--body"><!></div> <!> <!></div></aside>');
function sm(t, e) {
  ue(e, !0);
  let r = l(e, "id", 7), n = l(e, "visible", 7, !1), a = l(e, "state", 7, ""), s = l(e, "class", 7, ""), i = l(e, "i18nCloseButtonLabel", 7, "Close"), d = l(e, "preventCloseOnClickOutside", 7, !1), c = l(e, "hideCloseButton", 7, !1), u = l(e, "onclose", 7), f = l(e, "header", 7), v = l(e, "body", 7), g = l(e, "footer", 7);
  const h = (O) => {
    let M = "s-modal--dialog";
    return O && (M += " " + O), M;
  }, m = /* @__PURE__ */ J(() => h(s())), _ = () => {
    n() && (n(!1), u()?.());
  }, w = (O) => {
    O.key === "Escape" && _();
  };
  var p = {
    get id() {
      return r();
    },
    set id(O) {
      r(O), o();
    },
    get visible() {
      return n();
    },
    set visible(O = !1) {
      n(O), o();
    },
    get state() {
      return a();
    },
    set state(O = "") {
      a(O), o();
    },
    get class() {
      return s();
    },
    set class(O = "") {
      s(O), o();
    },
    get i18nCloseButtonLabel() {
      return i();
    },
    set i18nCloseButtonLabel(O = "Close") {
      i(O), o();
    },
    get preventCloseOnClickOutside() {
      return d();
    },
    set preventCloseOnClickOutside(O = !1) {
      d(O), o();
    },
    get hideCloseButton() {
      return c();
    },
    set hideCloseButton(O = !1) {
      c(O), o();
    },
    get onclose() {
      return u();
    },
    set onclose(O) {
      u(O), o();
    },
    get header() {
      return f();
    },
    set header(O) {
      f(O), o();
    },
    get body() {
      return v();
    },
    set body(O) {
      v(O), o();
    },
    get footer() {
      return g();
    },
    set footer(O) {
      g(O), o();
    }
  }, b = am();
  tt("keydown", On, w);
  let C;
  var T = L(b), P = L(T), y = L(P);
  me(y, () => f() ?? je), A(P);
  var E = D(P, 2), z = L(E);
  me(z, () => v() ?? je), A(E);
  var B = D(E, 2);
  {
    var F = (O) => {
      var M = nm(), U = L(M);
      me(U, () => g() ?? je), A(M), k(O, M);
    };
    V(B, (O) => {
      g() && O(F);
    });
  }
  var N = D(B, 2);
  {
    var W = (O) => {
      Ai(O, {
        weight: "clear",
        icon: !0,
        get "aria-label"() {
          return i();
        },
        class: "s-modal--close",
        onclick: _,
        children: (M, U) => {
          Be(M, {
            get src() {
              return zi;
            },
            class: "modal-close"
          });
        },
        $$slots: { default: !0 }
      });
    };
    V(N, (O) => {
      c() || O(W);
    });
  }
  return A(T), Cr(T, (O) => Tc?.(O)), Cr(T, (O, M) => kc?.(O, M), () => ({ active: n() })), A(b), j(
    (O) => {
      C = we(b, 1, "s-modal", null, C, O), ae(b, "aria-hidden", !n()), ae(b, "aria-labelledby", `${r()}-title`), ae(b, "aria-describedby", `${r()}-description`), we(T, 1, Ae(x(m))), ae(P, "id", `${r()}-title`), ae(E, "id", `${r()}-description`);
    },
    [
      () => ({
        "s-modal__danger": a() === "danger",
        "s-modal__celebration": a() === "celebration"
      })
    ]
  ), tt("outclick", T, () => !d() && _()), k(t, b), de(p);
}
oe(
  sm,
  {
    id: {},
    visible: {},
    state: {},
    class: {},
    i18nCloseButtonLabel: {},
    preventCloseOnClickOutside: {},
    hideCloseButton: {},
    onclose: {},
    header: {},
    body: {},
    footer: {}
  },
  [],
  [],
  !0
);
var im = /* @__PURE__ */ R("<nav><ul><!></ul></nav>");
function om(t, e) {
  ue(e, !0);
  let r = l(e, "label", 7), n = l(e, "orientation", 7, "horizontal"), a = l(e, "overflow", 7, "wrap"), s = l(e, "size", 7, ""), i = l(e, "class", 7, ""), d = l(e, "children", 7);
  const c = (m, _, w, p) => {
    const b = "s-navigation";
    let C = b;
    return _ === "vertical" && (C += ` ${b}__vertical`), w === "scroll" && (C += ` ${b}__scroll`), p && (C += ` ${b}__${p}`), m && (C += ` ${m}`), C;
  }, u = /* @__PURE__ */ J(() => c(i(), n(), a(), s()));
  var f = {
    get label() {
      return r();
    },
    set label(m) {
      r(m), o();
    },
    get orientation() {
      return n();
    },
    set orientation(m = "horizontal") {
      n(m), o();
    },
    get overflow() {
      return a();
    },
    set overflow(m = "wrap") {
      a(m), o();
    },
    get size() {
      return s();
    },
    set size(m = "") {
      s(m), o();
    },
    get class() {
      return i();
    },
    set class(m = "") {
      i(m), o();
    },
    get children() {
      return d();
    },
    set children(m) {
      d(m), o();
    }
  }, v = im(), g = L(v), h = L(g);
  return me(h, d), A(g), A(v), j(() => {
    ae(v, "aria-label", r()), we(g, 1, Ae(x(u)));
  }), k(t, v), de(f);
}
oe(
  om,
  {
    label: {},
    orientation: {},
    overflow: {},
    size: {},
    class: {},
    children: {}
  },
  [],
  [],
  !0
);
function lm(t) {
  const e = t - 1;
  return e * e * e + 1;
}
function cm(t, { delay: e = 0, duration: r = 400, easing: n = lm, axis: a = "y" } = {}) {
  const s = getComputedStyle(t), i = +s.opacity, d = a === "y" ? "height" : "width", c = parseFloat(s[d]), u = a === "y" ? ["top", "bottom"] : ["left", "right"], f = u.map(
    (p) => (
      /** @type {'Left' | 'Right' | 'Top' | 'Bottom'} */
      `${p[0].toUpperCase()}${p.slice(1)}`
    )
  ), v = parseFloat(s[`padding${f[0]}`]), g = parseFloat(s[`padding${f[1]}`]), h = parseFloat(s[`margin${f[0]}`]), m = parseFloat(s[`margin${f[1]}`]), _ = parseFloat(
    s[`border${f[0]}Width`]
  ), w = parseFloat(
    s[`border${f[1]}Width`]
  );
  return {
    delay: e,
    duration: r,
    easing: n,
    css: (p) => `overflow: hidden;opacity: ${Math.min(p * 20, 1) * i};${d}: ${p * c}px;padding-${u[0]}: ${p * v}px;padding-${u[1]}: ${p * g}px;margin-${u[0]}: ${p * h}px;margin-${u[1]}: ${p * m}px;border-${u[0]}-width: ${p * _}px;border-${u[1]}-width: ${p * w}px;min-${d}: 0`
  };
}
var um = /* @__PURE__ */ R('<!> <!> <span class="s-navigation--item-text"> </span> <div class="ml-auto"><!></div>', 1), dm = /* @__PURE__ */ R("<li><!> <!></li>");
function fm(t, e) {
  ue(e, !0);
  let r = l(e, "text", 7), n = l(e, "href", 7, void 0), a = l(e, "selected", 7, !1), s = l(e, "icon", 7, void 0), i = l(e, "iconSelected", 7, void 0), d = l(e, "avatar", 7, void 0), c = l(e, "class", 7, ""), u = l(e, "animate", 7, !1), f = l(e, "dropdown", 7), v = l(e, "trailing", 7), g = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "text",
    "href",
    "selected",
    "icon",
    "iconSelected",
    "avatar",
    "class",
    "animate",
    "dropdown",
    "trailing"
  ]);
  const h = (T, P, y) => {
    const E = "s-navigation--item";
    let z = "w100 " + E;
    return y && (z += ` ${E}__dropdown`), P && (z += " is-selected"), T && (z += ` ${T}`), z;
  }, m = /* @__PURE__ */ J(() => h(c(), a(), !!f())), _ = (T) => u() ? cm(T) : {};
  var w = {
    get text() {
      return r();
    },
    set text(T) {
      r(T), o();
    },
    get href() {
      return n();
    },
    set href(T = void 0) {
      n(T), o();
    },
    get selected() {
      return a();
    },
    set selected(T = !1) {
      a(T), o();
    },
    get icon() {
      return s();
    },
    set icon(T = void 0) {
      s(T), o();
    },
    get iconSelected() {
      return i();
    },
    set iconSelected(T = void 0) {
      i(T), o();
    },
    get avatar() {
      return d();
    },
    set avatar(T = void 0) {
      d(T), o();
    },
    get class() {
      return c();
    },
    set class(T = "") {
      c(T), o();
    },
    get animate() {
      return u();
    },
    set animate(T = !1) {
      u(T), o();
    },
    get dropdown() {
      return f();
    },
    set dropdown(T) {
      f(T), o();
    },
    get trailing() {
      return v();
    },
    set trailing(T) {
      v(T), o();
    }
  }, p = dm(), b = L(p);
  St(b, () => n() ? "a" : "button", !1, (T, P) => {
    dt(T, () => ({
      href: n(),
      class: x(m),
      "aria-current": a() ? "true" : void 0,
      ...g
    }));
    var y = um(), E = K(y);
    {
      var z = (U) => {
        {
          let H = /* @__PURE__ */ J(() => a() ? i() : s());
          Be(U, {
            get src() {
              return x(H);
            },
            class: "s-navigation--icon"
          });
        }
      };
      V(E, (U) => {
        s() && i() && U(z);
      });
    }
    var B = D(E, 2);
    {
      var F = (U) => {
        Ha(U, {
          get name() {
            return r();
          },
          get src() {
            return d();
          },
          class: "s-navigation--avatar"
        });
      };
      V(B, (U) => {
        d() && U(F);
      });
    }
    var N = D(B, 2), W = L(N, !0);
    A(N);
    var O = D(N, 2), M = L(O);
    me(M, () => v() ?? je), A(O), j(() => {
      ae(N, "data-text", r()), ee(W, r());
    }), k(P, y);
  });
  var C = D(b, 2);
  return me(C, () => f() ?? je), A(p), xd(3, p, () => _), k(t, p), de(w);
}
oe(
  fm,
  {
    text: {},
    href: {},
    selected: {},
    icon: {},
    iconSelected: {},
    avatar: {},
    class: {},
    animate: {},
    dropdown: {},
    trailing: {}
  },
  [],
  [],
  !0
);
var vm = /* @__PURE__ */ R('<li role="separator"> <!></li>');
function gm(t, e) {
  ue(e, !0);
  let r = l(e, "title", 7), n = l(e, "class", 7, ""), a = l(e, "trailing", 7);
  const s = (v) => {
    let h = "d-flex jc-space-between " + "s-navigation--title";
    return v && (h += ` ${v}`), h;
  }, i = /* @__PURE__ */ J(() => s(n()));
  var d = {
    get title() {
      return r();
    },
    set title(v) {
      r(v), o();
    },
    get class() {
      return n();
    },
    set class(v = "") {
      n(v), o();
    },
    get trailing() {
      return a();
    },
    set trailing(v) {
      a(v), o();
    }
  }, c = vm(), u = L(c), f = D(u);
  return me(f, () => a() ?? je), A(c), j(() => {
    we(c, 1, Ae(x(i))), ee(u, `${r() ?? ""} `);
  }), k(t, c), de(d);
}
oe(gm, { title: {}, class: {}, trailing: {} }, [], [], !0);
var hm = /* @__PURE__ */ R('<div class="s-notice--actions"><!> <!></div>'), mm = /* @__PURE__ */ R('<div><span class="s-notice--icon"><!></span> <!> <!></div>');
function _m(t, e) {
  ue(e, !0);
  const r = l(e, "variant", 7, ""), n = l(e, "important", 7, !1), a = l(e, "role", 7, "status"), s = l(e, "iconTitle", 7), i = l(e, "class", 7, ""), d = l(e, "dismissible", 7, !1), c = l(e, "onDismiss", 7, () => {
  }), u = l(e, "children", 7), f = l(e, "actions", 7), v = l(e, "i18nDismissButtonLabel", 7, "Dismiss");
  let g = /* @__PURE__ */ Ye(!0);
  const h = () => {
    _e(g, !1), c()?.();
  }, m = (y, E, z) => {
    const B = "s-notice";
    let F = B;
    return y && (F += ` ${y}`), E && (F += ` ${B}__${E}`), z && (F += ` ${B}__important`), F;
  }, _ = (y) => y == "danger" ? { icon: us, title: s() || "Danger" } : y == "warning" ? { icon: cs, title: s() || "Warning" } : y == "info" ? { icon: Wh, title: s() || "Information" } : y == "success" ? { icon: ds, title: s() || "Success" } : y == "featured" ? { icon: Kh, title: s() || "Featured" } : y == "activity" ? { icon: Gh, title: s() || "Activity" } : { icon: jh, title: s() || "Help" }, w = /* @__PURE__ */ J(() => m(i(), r(), n())), p = /* @__PURE__ */ J(() => _(r()));
  var b = {
    get variant() {
      return r();
    },
    set variant(y = "") {
      r(y), o();
    },
    get important() {
      return n();
    },
    set important(y = !1) {
      n(y), o();
    },
    get role() {
      return a();
    },
    set role(y = "status") {
      a(y), o();
    },
    get iconTitle() {
      return s();
    },
    set iconTitle(y) {
      s(y), o();
    },
    get class() {
      return i();
    },
    set class(y = "") {
      i(y), o();
    },
    get dismissible() {
      return d();
    },
    set dismissible(y = !1) {
      d(y), o();
    },
    get onDismiss() {
      return c();
    },
    set onDismiss(y = () => {
    }) {
      c(y), o();
    },
    get children() {
      return u();
    },
    set children(y) {
      u(y), o();
    },
    get actions() {
      return f();
    },
    set actions(y) {
      f(y), o();
    },
    get i18nDismissButtonLabel() {
      return v();
    },
    set i18nDismissButtonLabel(y = "Dismiss") {
      v(y), o();
    }
  }, C = le(), T = K(C);
  {
    var P = (y) => {
      var E = mm(), z = L(E), B = L(z);
      Be(B, {
        get src() {
          return x(p).icon;
        },
        get title() {
          return x(p).title;
        }
      }), A(z);
      var F = D(z, 2);
      me(F, u);
      var N = D(F, 2);
      {
        var W = (O) => {
          var M = hm(), U = L(M);
          {
            var H = (q) => {
              var Q = le(), Z = K(Q);
              me(Z, f), k(q, Q);
            };
            V(U, (q) => {
              f() && q(H);
            });
          }
          var S = D(U, 2);
          {
            var I = (q) => {
              Ii(q, {
                class: "s-notice--dismiss",
                onclick: h,
                get "aria-label"() {
                  return v();
                },
                children: (Q, Z) => {
                  Be(Q, {
                    get src() {
                      return zi;
                    }
                  });
                },
                $$slots: { default: !0 }
              });
            };
            V(S, (q) => {
              d() && q(I);
            });
          }
          A(M), k(O, M);
        };
        V(N, (O) => {
          (f() || d()) && O(W);
        });
      }
      A(E), j(() => {
        we(E, 1, Ae(x(w))), ae(E, "role", a());
      }), k(y, E);
    };
    V(T, (y) => {
      x(g) && y(P);
    });
  }
  return k(t, C), de(b);
}
oe(
  _m,
  {
    variant: {},
    important: {},
    role: {},
    iconTitle: {},
    class: {},
    dismissible: {},
    onDismiss: {},
    children: {},
    actions: {},
    i18nDismissButtonLabel: {}
  },
  [],
  [],
  !0
);
function bm(t, e) {
  ue(e, !0);
  const r = l(e, "children", 7), n = l(e, "link", 7, !0), a = l(e, "class", 7, ""), s = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "children",
    "link",
    "class"
  ]), i = /* @__PURE__ */ J(() => n() ? " s-link__underlined" : "");
  var d = {
    get children() {
      return r();
    },
    set children(c) {
      r(c), o();
    },
    get link() {
      return n();
    },
    set link(c = !0) {
      n(c), o();
    },
    get class() {
      return a();
    },
    set class(c = "") {
      a(c), o();
    }
  };
  {
    let c = /* @__PURE__ */ J(() => a() + x(i));
    Ai(t, un(
      {
        get link() {
          return n();
        },
        get class() {
          return x(c);
        }
      },
      () => s,
      {
        children: (u, f) => {
          var v = le(), g = K(v);
          me(g, r), k(u, v);
        },
        $$slots: { default: !0 }
      }
    ));
  }
  return de(d);
}
oe(bm, { children: {}, link: {}, class: {} }, [], [], !0);
var pm = /* @__PURE__ */ R('<nav class="pl24"><ul class="list-reset s-pagination"><!></ul></nav>');
function Cc(t, e) {
  ue(e, !0);
  let r = l(e, "i18nNavigationLabel", 7, "Pagination"), n = l(e, "children", 7);
  var a = {
    get i18nNavigationLabel() {
      return r();
    },
    set i18nNavigationLabel(c = "Pagination") {
      r(c), o();
    },
    get children() {
      return n();
    },
    set children(c) {
      n(c), o();
    }
  }, s = pm(), i = L(s), d = L(i);
  return me(d, () => n() ?? je), A(i), A(s), j(() => ae(s, "aria-label", r())), k(t, s), de(a);
}
oe(Cc, { i18nNavigationLabel: {}, children: {} }, [], [], !0);
var wm = /* @__PURE__ */ R("<li><a><!></a></li>");
function Ma(t, e) {
  ue(e, !0);
  let r = l(e, "url", 7), n = l(e, "selected", 7, !1), a = l(e, "itemNav", 7, !1), s = l(e, "onclick", 7), i = l(e, "children", 7);
  var d = {
    get url() {
      return r();
    },
    set url(g) {
      r(g), o();
    },
    get selected() {
      return n();
    },
    set selected(g = !1) {
      n(g), o();
    },
    get itemNav() {
      return a();
    },
    set itemNav(g = !1) {
      a(g), o();
    },
    get onclick() {
      return s();
    },
    set onclick(g) {
      s(g), o();
    },
    get children() {
      return i();
    },
    set children(g) {
      i(g), o();
    }
  }, c = wm(), u = L(c);
  let f;
  u.__click = function(...g) {
    s()?.apply(this, g);
  };
  var v = L(u);
  return me(v, () => i() ?? je), A(u), A(c), j(
    (g) => {
      f = we(u, 1, "s-pagination--item", null, f, g), ae(u, "aria-current", n() ? "page" : void 0), ae(u, "href", r());
    },
    [
      () => ({
        "is-selected": n(),
        "s-pagination--item__nav": a()
      })
    ]
  ), k(t, c), de(d);
}
jt(["click"]);
oe(
  Ma,
  {
    url: {},
    selected: {},
    itemNav: {},
    onclick: {},
    children: {}
  },
  [],
  [],
  !0
);
var ym = /* @__PURE__ */ R('<li class="s-pagination--item s-pagination--item__clear">…</li>');
function Sc(t) {
  var e = ym();
  k(t, e);
}
oe(Sc, {}, [], [], !0);
const xm = (t, e) => {
  if (e <= 5)
    return Array.from({ length: e }, (s, i) => i + 1);
  const r = [];
  r.push(1);
  let n = Math.max(2, t - 2), a = Math.min(e - 1, t + 2);
  n === 2 && (a = 5), a === e - 1 && (n = e - 4), n > 2 && r.push("…");
  for (let s = n; s <= a; s++)
    r.push(s);
  return a < e - 1 && r.push("…"), r.push(e), r;
};
var Tm = /* @__PURE__ */ R('<span class="v-visible-sr"> </span> ', 1), km = /* @__PURE__ */ R("<!> <!> <!>", 1);
function Cm(t, e) {
  ue(e, !0);
  let r = l(e, "page", 7), n = l(e, "totalPages", 7), a = l(e, "urlGenerator", 7), s = l(e, "followLink", 7, !0), i = l(e, "i18nNextText", 7, "Next"), d = l(e, "i18nPrevText", 7, "Prev"), c = l(e, "i18nPageText", 7, "page"), u = l(e, "i18nNavigationLabel", 7, "Pagination"), f = l(e, "onpagechange", 7);
  const v = (h) => (m) => {
    s() || (m.preventDefault(), f()?.(h));
  };
  var g = {
    get page() {
      return r();
    },
    set page(h) {
      r(h), o();
    },
    get totalPages() {
      return n();
    },
    set totalPages(h) {
      n(h), o();
    },
    get urlGenerator() {
      return a();
    },
    set urlGenerator(h) {
      a(h), o();
    },
    get followLink() {
      return s();
    },
    set followLink(h = !0) {
      s(h), o();
    },
    get i18nNextText() {
      return i();
    },
    set i18nNextText(h = "Next") {
      i(h), o();
    },
    get i18nPrevText() {
      return d();
    },
    set i18nPrevText(h = "Prev") {
      d(h), o();
    },
    get i18nPageText() {
      return c();
    },
    set i18nPageText(h = "page") {
      c(h), o();
    },
    get i18nNavigationLabel() {
      return u();
    },
    set i18nNavigationLabel(h = "Pagination") {
      u(h), o();
    },
    get onpagechange() {
      return f();
    },
    set onpagechange(h) {
      f(h), o();
    }
  };
  return Cc(t, {
    get i18nNavigationLabel() {
      return u();
    },
    children: (h, m) => {
      var _ = km(), w = K(_);
      {
        var p = (P) => {
          {
            let y = /* @__PURE__ */ J(() => a()(r() - 1)), E = /* @__PURE__ */ J(() => v(r() - 1));
            Ma(P, {
              get url() {
                return x(y);
              },
              get onclick() {
                return x(E);
              },
              itemNav: !0,
              children: (z, B) => {
                Be(z, {
                  get src() {
                    return Dh;
                  },
                  get title() {
                    return d();
                  }
                });
              },
              $$slots: { default: !0 }
            });
          }
        };
        V(w, (P) => {
          r() > 1 && P(p);
        });
      }
      var b = D(w, 2);
      Pr(b, 19, () => xm(r(), n()), (P, y) => P.toString() + y, (P, y) => {
        var E = le(), z = K(E);
        {
          var B = (N) => {
            {
              let W = /* @__PURE__ */ J(() => a()(x(y))), O = /* @__PURE__ */ J(() => v(x(y))), M = /* @__PURE__ */ J(() => x(y) === r());
              Ma(N, {
                get url() {
                  return x(W);
                },
                get onclick() {
                  return x(O);
                },
                get selected() {
                  return x(M);
                },
                children: (U, H) => {
                  var S = Tm(), I = K(S), q = L(I, !0);
                  A(I);
                  var Q = D(I);
                  j(() => {
                    ee(q, c()), ee(Q, ` ${x(y) ?? ""}`);
                  }), k(U, S);
                },
                $$slots: { default: !0 }
              });
            }
          }, F = (N) => {
            Sc(N);
          };
          V(z, (N) => {
            typeof x(y) == "number" ? N(B) : N(F, !1);
          });
        }
        k(P, E);
      });
      var C = D(b, 2);
      {
        var T = (P) => {
          {
            let y = /* @__PURE__ */ J(() => a()(r() + 1)), E = /* @__PURE__ */ J(() => v(r() + 1));
            Ma(P, {
              get url() {
                return x(y);
              },
              get onclick() {
                return x(E);
              },
              itemNav: !0,
              children: (z, B) => {
                Be(z, {
                  get src() {
                    return Rh;
                  },
                  get title() {
                    return i();
                  }
                });
              },
              $$slots: { default: !0 }
            });
          }
        };
        V(C, (P) => {
          r() < n() && P(T);
        });
      }
      k(h, _);
    },
    $$slots: { default: !0 }
  }), de(g);
}
oe(
  Cm,
  {
    page: {},
    totalPages: {},
    urlGenerator: {},
    followLink: {},
    i18nNextText: {},
    i18nPrevText: {},
    i18nPageText: {},
    i18nNavigationLabel: {},
    onpagechange: {}
  },
  [],
  [],
  !0
);
const Ac = "popover-context";
function Oi(t) {
  let e = zn(Ac);
  if (e === void 0)
    throw new Error(`<${t} /> is missing a parent <Popover /> component.`);
  return e;
}
function ca(t, e) {
  ue(e, !0);
  let r = l(e, "id", 7), n = l(e, "autoshow", 7, !1), a = l(e, "visible", 7, void 0), s = l(e, "placement", 7, "bottom"), i = l(e, "strategy", 7, "absolute"), d = l(e, "trapFocus", 7, !1), c = l(e, "dismissible", 7, !0), u = l(e, "tooltip", 7, !1), f = l(e, "onopen", 7), v = l(e, "onclose", 7), g = l(e, "onoutclick", 7), h = l(e, "children", 7);
  const m = 300, _ = 100;
  let w, p;
  const b = /* @__PURE__ */ J(() => a() !== void 0), [C, T, P] = ac({
    placement: s(),
    strategy: i(),
    middleware: [tc(10), rc(), nc()],
    onComputed({ placement: S }) {
      x(O).computedPlacement = S;
    }
  }), y = (S = 0) => {
    window.clearTimeout(p), !x(b) && (x(O).visible || (p = window.setTimeout(
      () => {
        x(O).visible = !0, f()?.();
      },
      S
    )));
  }, E = () => {
    u() && y(m);
  }, z = () => {
    u() && B(_);
  }, B = (S = 0) => {
    window.clearTimeout(p), !x(b) && x(O).visible && (p = window.setTimeout(
      () => {
        x(O).visible = !1, u() || w.focus(), v()?.();
      },
      S
    ));
  }, F = () => {
    x(O).visible ? B() : y();
  }, N = (S) => {
    !c() || S.detail === w || (g()?.(), B());
  }, W = (S) => {
    S.key === "Escape" && c() && B();
  }, O = /* @__PURE__ */ Ye(tr({
    id: r(),
    controlled: a() !== void 0,
    visible: n(),
    dismissible: c(),
    trapFocus: d(),
    computedPlacement: s(),
    tooltip: u(),
    floatingRef: (S) => {
      w = S, C(S);
    },
    floatingContent: T,
    onOutclick: N,
    open: y,
    openTooltip: E,
    close: B,
    closeTooltip: z,
    toggle: F
  }));
  kt(() => {
    x(O).controlled = x(b);
  }), kt(() => {
    x(b) && (x(O).visible = a());
  }), ga(Ac, x(O)), kt(() => {
    P({ placement: s() });
  });
  var M = {
    get id() {
      return r();
    },
    set id(S) {
      r(S), o();
    },
    get autoshow() {
      return n();
    },
    set autoshow(S = !1) {
      n(S), o();
    },
    get visible() {
      return a();
    },
    set visible(S = void 0) {
      a(S), o();
    },
    get placement() {
      return s();
    },
    set placement(S = "bottom") {
      s(S), o();
    },
    get strategy() {
      return i();
    },
    set strategy(S = "absolute") {
      i(S), o();
    },
    get trapFocus() {
      return d();
    },
    set trapFocus(S = !1) {
      d(S), o();
    },
    get dismissible() {
      return c();
    },
    set dismissible(S = !0) {
      c(S), o();
    },
    get tooltip() {
      return u();
    },
    set tooltip(S = !1) {
      u(S), o();
    },
    get onopen() {
      return f();
    },
    set onopen(S) {
      f(S), o();
    },
    get onclose() {
      return v();
    },
    set onclose(S) {
      v(S), o();
    },
    get onoutclick() {
      return g();
    },
    set onoutclick(S) {
      g(S), o();
    },
    get children() {
      return h();
    },
    set children(S) {
      h(S), o();
    }
  }, U = le();
  tt("keydown", On, W);
  var H = K(U);
  return me(H, () => h() ?? je, () => ({ visible: x(O).visible, open: y, close: B })), k(t, U), de(M);
}
oe(
  ca,
  {
    id: {},
    autoshow: {},
    visible: {},
    placement: {},
    strategy: {},
    trapFocus: {},
    dismissible: {},
    tooltip: {},
    onopen: {},
    onclose: {},
    onoutclick: {},
    children: {}
  },
  [],
  [],
  !0
);
const Sm = (t, e, r) => {
  e.close(), r()?.(t);
};
var Am = /* @__PURE__ */ R('<button type="button"><!></button>');
function Em(t, e) {
  ue(e, !0);
  let r = l(e, "label", 7, "Close"), n = l(e, "class", 7, ""), a = l(e, "onclick", 7);
  const s = Oi("PopoverCloseButton");
  var i = {
    get label() {
      return r();
    },
    set label(u = "Close") {
      r(u), o();
    },
    get class() {
      return n();
    },
    set class(u = "") {
      n(u), o();
    },
    get onclick() {
      return a();
    },
    set onclick(u) {
      a(u), o();
    }
  }, d = Am();
  d.__click = [Sm, s, a];
  var c = L(d);
  return Be(c, {
    get src() {
      return zi;
    }
  }), A(d), j(() => {
    ae(d, "aria-label", r()), we(d, 1, `s-popover--close s-btn s-btn__tonal ps-absolute${n() ? ` ${n()}` : ""}`);
  }), k(t, d), de(i);
}
jt(["click"]);
oe(Em, { label: {}, class: {}, onclick: {} }, [], [], !0);
var Lm = /* @__PURE__ */ R('<div><div><div class="ps-relative"><!></div></div></div>');
function ua(t, e) {
  ue(e, !0);
  let r = l(e, "role", 7, null), n = l(e, "ariaLabel", 7), a = l(e, "ariaLabelledby", 7), s = l(e, "class", 7, ""), i = l(e, "contentClass", 7, ""), d = l(e, "children", 7), c = Oi("PopoverContent"), u = /* @__PURE__ */ J(() => {
    let b = "s-popover";
    return c.tooltip && (b += " s-popover__tooltip"), s() && (b += " " + s()), b;
  }), f = /* @__PURE__ */ J(() => {
    let b = "s-popover--content";
    return i() && (b += " " + i()), b;
  }), v = /* @__PURE__ */ J(() => `${x(u)}${c.visible ? " is-visible" : ""}`), g = /* @__PURE__ */ J(() => r() || (c.tooltip ? "tooltip" : "dialog"));
  var h = {
    get role() {
      return r();
    },
    set role(b = null) {
      r(b), o();
    },
    get ariaLabel() {
      return n();
    },
    set ariaLabel(b) {
      n(b), o();
    },
    get ariaLabelledby() {
      return a();
    },
    set ariaLabelledby(b) {
      a(b), o();
    },
    get class() {
      return s();
    },
    set class(b = "") {
      s(b), o();
    },
    get contentClass() {
      return i();
    },
    set contentClass(b = "") {
      i(b), o();
    },
    get children() {
      return d();
    },
    set children(b) {
      d(b), o();
    }
  }, m = Lm();
  m.__focusin = function(...b) {
    c.openTooltip?.apply(this, b);
  }, m.__focusout = function(...b) {
    c.closeTooltip?.apply(this, b);
  };
  var _ = L(m), w = L(_), p = L(w);
  return me(p, () => d() ?? je), A(w), A(_), A(m), Cr(m, (b) => c.floatingContent?.(b)), Cr(m, (b, C) => kc?.(b, C), () => ({ active: c.trapFocus && !!c.visible })), Cr(m, (b) => Tc?.(b)), j(() => {
    ae(m, "id", `${c.id}-popover`), we(m, 1, Ae(x(v))), ae(m, "role", x(g)), ae(m, "aria-label", n()), ae(m, "aria-labelledby", a()), ae(m, "data-popper-placement", c.computedPlacement), we(_, 1, Ae(x(f)));
  }), tt("outclick", m, function(...b) {
    c.onOutclick?.apply(this, b);
  }), tt("mouseenter", m, function(...b) {
    c.openTooltip?.apply(this, b);
  }), tt("mouseleave", m, function(...b) {
    c.closeTooltip?.apply(this, b);
  }), k(t, m), de(h);
}
jt(["focusin", "focusout"]);
oe(
  ua,
  {
    role: {},
    ariaLabel: {},
    ariaLabelledby: {},
    class: {},
    contentClass: {},
    children: {}
  },
  [],
  [],
  !0
);
var Pm = /* @__PURE__ */ R("<span><!></span>");
function da(t, e) {
  ue(e, !0);
  let r = l(e, "elementId", 7, null), n = l(e, "children", 7), a, s, i = Oi("PopoverReference");
  const d = (_) => _.tagName.toLowerCase() === "button" || _.getAttribute("role") === "button", c = (_) => d(_) ? _ : _.children.length > 0 ? c(_.children[0]) : null, u = (_, w, p) => {
    let b = null;
    if (_)
      b = document.getElementById(_);
    else if (b = w.firstElementChild, !i.tooltip && !i.controlled && (b = c(b), !b))
      throw new Error("Reference element must have a role of 'button' for uncontrolled popovers.");
    if (!b)
      throw new Error("No reference element found.");
    return p.floatingRef(b), b;
  }, f = (_, w) => {
    _.setAttribute("aria-controls", `${w.id}-popover`);
    const p = w.dismissible ? w.toggle : w.open;
    return _.addEventListener("click", p), () => _.removeEventListener("click", p);
  }, v = (_, w) => (_.addEventListener("mouseenter", w.openTooltip), _.addEventListener("mouseleave", w.closeTooltip), _.addEventListener("focusin", w.openTooltip), _.addEventListener("focusout", w.closeTooltip), _.setAttribute("aria-describedby", `${w.id}-popover`), () => {
    _.removeEventListener("mouseenter", w.openTooltip), _.removeEventListener("mouseleave", w.closeTooltip), _.removeEventListener("focusin", w.openTooltip), _.removeEventListener("focusout", w.closeTooltip);
  });
  _a(() => {
    s = u(r(), a, i), !i.controlled && (i.tooltip ? v(s, i) : f(s, i));
  }), kt(() => {
    !i.controlled && !i.tooltip && s?.setAttribute("aria-expanded", (!!i.visible).toString());
  });
  var g = {
    get elementId() {
      return r();
    },
    set elementId(_ = null) {
      r(_), o();
    },
    get children() {
      return n();
    },
    set children(_) {
      n(_), o();
    }
  }, h = Pm(), m = L(h);
  return me(m, () => n() ?? je), A(h), Wn(h, (_) => a = _, () => a), k(t, h), de(g);
}
oe(da, { elementId: {}, children: {} }, [], [], !0);
var Im = /* @__PURE__ */ R("<!> ", 1), zm = /* @__PURE__ */ R('<div class="s-post-summary--content-type"><!></div>');
function Ec(t, e) {
  ue(e, !1);
  let r = l(e, "name", 12), n = l(e, "href", 12), a = l(e, "i18nContentTypeText", 12, void 0);
  const s = {
    announcement: "Announcement",
    "how-to-guide": "How-to guide",
    "knowledge-article": "Knowledge article",
    policy: "Policy"
  };
  var i = {
    get name() {
      return r();
    },
    set name(u) {
      r(u), o();
    },
    get href() {
      return n();
    },
    set href(u) {
      n(u), o();
    },
    get i18nContentTypeText() {
      return a();
    },
    set i18nContentTypeText(u) {
      a(u), o();
    }
  }, d = zm(), c = L(d);
  return Ii(c, {
    get href() {
      return n();
    },
    class: "s-link s-link__grayscale",
    children: (u, f) => {
      var v = Im(), g = K(v);
      Be(g, {
        get src() {
          return $g;
        }
      });
      var h = D(g);
      j(() => ee(h, ` ${Te(a()), Te(r()), ye(() => a() || s[r()]) ?? ""}`)), k(u, v);
    },
    $$slots: { default: !0 }
  }), A(d), k(t, d), de(i);
}
oe(Ec, { name: {}, href: {}, i18nContentTypeText: {} }, [], [], !0);
var Mm = /* @__PURE__ */ R("<p> </p>");
function Ni(t, e) {
  ue(e, !1);
  const r = /* @__PURE__ */ Tt();
  let n = l(e, "excerpt", 12), a = l(e, "lines", 12, 3), s = l(e, "truncate", 12, !0);
  const i = (f, v) => {
    let h = "s-post-summary--excerpt";
    return f === 0 ? h = "d-none" : v && (h += ` v-truncate${f}`), h;
  };
  Ft(() => (Te(a()), Te(s())), () => {
    _e(r, i(a(), s()));
  }), sr();
  var d = {
    get excerpt() {
      return n();
    },
    set excerpt(f) {
      n(f), o();
    },
    get lines() {
      return a();
    },
    set lines(f) {
      a(f), o();
    },
    get truncate() {
      return s();
    },
    set truncate(f) {
      s(f), o();
    }
  }, c = Mm(), u = L(c, !0);
  return A(c), j(() => {
    we(c, 1, Ae(x(r))), ee(u, n());
  }), k(t, c), de(d);
}
oe(Ni, { excerpt: {}, lines: {}, truncate: {} }, [], [], !0);
function Ys(t, e) {
  ue(e, !1);
  let r = l(e, "state", 12), n = l(e, "i18nText", 12, void 0);
  const a = {
    archived: qh,
    closed: Fh,
    draft: Uh,
    pinned: Yh,
    review: Hh
  }, s = {
    archived: void 0,
    closed: "danger",
    draft: "info",
    pinned: "tonal",
    review: "warning"
  }, i = (c) => c.charAt(0).toUpperCase() + c.slice(1);
  var d = {
    get state() {
      return r();
    },
    set state(c) {
      r(c), o();
    },
    get i18nText() {
      return n();
    },
    set i18nText(c) {
      n(c), o();
    }
  };
  Wt();
  {
    let c = /* @__PURE__ */ Gt(() => (Te(n()), Te(r()), ye(() => n() || i(r()))));
    la(t, {
      get text() {
        return x(c);
      },
      type: "state",
      get icon() {
        return Te(r()), ye(() => a[r()]);
      },
      get state() {
        return Te(r()), ye(() => s[r()]);
      }
    });
  }
  return de(d);
}
oe(Ys, { state: {}, i18nText: {} }, [], [], !0);
var Om = /* @__PURE__ */ jn('<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.44543" y="1.44543" width="45.1091" height="45.1091" stroke="var(--black-300)" stroke-width="2.89086" stroke-dasharray="5.78 5.78"></rect><rect x="10" y="14" width="12" height="3.12" fill="var(--black-500)"></rect><rect x="26" y="14" width="12" height="3.12" fill="var(--black-500)"></rect><rect x="14" y="31.12" width="20" height="3.12" fill="var(--black-500)"></rect></svg>');
function Lc(t, e) {
  ue(e, !0);
  const r = l(e, "size", 7);
  var n = {
    get size() {
      return r();
    },
    set size(s) {
      r(s), o();
    }
  }, a = Om();
  return j(() => {
    ae(a, "width", r()), ae(a, "height", r());
  }), k(t, a), de(n);
}
oe(Lc, { size: {} }, [], [], !0);
var Nm = /* @__PURE__ */ R('<span class="s-user-card--username s-user-card--username__op"> </span>'), Bm = /* @__PURE__ */ R('<span><a class="s-link s-link__underlined"> </a> </span>'), Dm = /* @__PURE__ */ R("<!> <!>", 1), Rm = /* @__PURE__ */ R('<span class="s-user-card--username"> </span>'), Um = /* @__PURE__ */ R("<!> <!>", 1), Vm = /* @__PURE__ */ R('<ul class="s-user-card--group"><!></ul>'), qm = /* @__PURE__ */ R('<ul class="s-user-card--group"><!></ul>'), Hm = /* @__PURE__ */ R("<!> <!> <!> <!> <!>", 1), Fm = /* @__PURE__ */ R("<span> </span>"), jm = /* @__PURE__ */ R("<!> <!>", 1), Wm = /* @__PURE__ */ R('<div class="s-user-card--group"><!> <span class="s-user-card--username s-user-card--deleted"> </span></div> <!>', 1), Ym = /* @__PURE__ */ R('<div class="s-user-card--column"><div class="s-user-card--row"><!></div> <div class="s-user-card--row s-user-card--recognition"><!> <!></div></div>'), Gm = /* @__PURE__ */ R('<ul class="s-user-card--group"><!></ul>'), Xm = /* @__PURE__ */ R('<ul class="s-user-card--group"><!></ul>'), Km = /* @__PURE__ */ R('<div class="s-user-card--row s-user-card--recognition"><!> <!></div>'), Qm = /* @__PURE__ */ R("<li> </li>"), Zm = /* @__PURE__ */ R("<li> </li>"), Jm = /* @__PURE__ */ R('<ul class="s-user-card--group s-user-card--group__split"><!> <!></ul>'), $m = /* @__PURE__ */ R('<div class="s-user-card--column"><!> <!> <!></div>'), e0 = /* @__PURE__ */ R('<div class="s-user-card--row"><!> <div class="s-user-card--column"><div class="s-user-card--row"><!> <!></div> <!></div></div> <!>', 1), t0 = /* @__PURE__ */ R("<div><!></div>");
function Bi(t, e) {
  ue(e, !0);
  const r = (M) => {
    var U = le(), H = K(U);
    {
      var S = (I) => {
        var q = le(), Q = K(q);
        St(Q, () => i() ? "a" : "div", !1, (Z, ge) => {
          dt(Z, () => ({ class: "s-user-card--group", href: i() }));
          var ve = Um(), X = K(ve);
          {
            var se = (ie) => {
              Ha(ie, {
                get name() {
                  return a();
                },
                get src() {
                  return s();
                },
                get size() {
                  return x(z);
                }
              });
            };
            V(X, (ie) => {
              s() && ie(se);
            });
          }
          var Y = D(X, 2);
          {
            var $ = (ie) => {
              var he = le(), ke = K(he);
              {
                var Me = (fe) => {
                  ca(fe, {
                    id: "user-card-original-poster-popover",
                    tooltip: !0,
                    children: (be, Oe) => {
                      var Ve = Dm(), $e = K(Ve);
                      da($e, {
                        children: (Ze, re) => {
                          var Ue = Nm(), Ce = L(Ue, !0);
                          A(Ue), j(() => ee(Ce, a())), k(Ze, Ue);
                        },
                        $$slots: { default: !0 }
                      });
                      var vt = D($e, 2);
                      ua(vt, {
                        children: (Ze, re) => {
                          var Ue = Bm(), Ce = L(Ue), Ee = L(Ce, !0);
                          A(Ce);
                          var qe = D(Ce);
                          A(Ue), j(() => {
                            ae(Ce, "href", i()), ee(Ee, a()), ee(qe, ` ${p() ?? ""}`);
                          }), k(Ze, Ue);
                        },
                        $$slots: { default: !0 }
                      }), k(be, Ve);
                    },
                    $$slots: { default: !0 }
                  });
                }, te = (fe) => {
                  var be = Rm(), Oe = L(be, !0);
                  A(be), j(() => ee(Oe, a())), k(fe, be);
                };
                V(ke, (fe) => {
                  w() ? fe(Me) : fe(te, !1);
                });
              }
              k(ie, he);
            };
            V(Y, (ie) => {
              a() && ie($);
            });
          }
          k(ge, ve);
        }), k(I, q);
      };
      V(H, (I) => {
        (s() || a()) && I(S);
      });
    }
    k(M, U);
  }, n = (M) => {
    var U = Hm(), H = K(U);
    r(H);
    var S = D(H, 2);
    {
      var I = (se) => {
        var Y = Vm(), $ = L(Y);
        me($, f), A(Y), k(se, Y);
      };
      V(S, (se) => {
        f() && se(I);
      });
    }
    var q = D(S, 2);
    {
      var Q = (se) => {
        var Y = le(), $ = K(Y);
        me($, _), k(se, Y);
      };
      V(q, (se) => {
        _() && se(Q);
      });
    }
    var Z = D(q, 2);
    {
      var ge = (se) => {
        var Y = qm(), $ = L(Y);
        me($, u), A(Y), k(se, Y);
      };
      V(Z, (se) => {
        u() && se(ge);
      });
    }
    var ve = D(Z, 2);
    {
      var X = (se) => {
        var Y = le(), $ = K(Y);
        me($, c), k(se, Y);
      };
      V(ve, (se) => {
        c() && se(X);
      });
    }
    k(M, U);
  }, a = l(e, "name", 7), s = l(e, "avatar", 7), i = l(e, "profileUrl", 7), d = l(e, "size", 7), c = l(e, "time", 7), u = l(e, "blings", 7), f = l(e, "badges", 7), v = l(e, "recognition", 7), g = l(e, "location", 7), h = l(e, "designation", 7), m = l(e, "bio", 7), _ = l(e, "additionalBlings", 7), w = l(e, "originalPoster", 7), p = l(e, "i18nOpTooltipText", 7, "is the original poster."), b = l(e, "i18nDeletedTooltipText", 7, "Deleted user"), C = l(e, "deleted", 7), T = l(e, "class", 7, ""), P = (M, U, H) => {
    const S = "s-user-card";
    let I = S;
    return M && (I += ` ${M}`), U && (I += ` ${S}__${U}`), H && (I += ` ${S}__deleted`), I;
  }, y = (M) => {
    switch (M) {
      case "sm":
        return 16;
      case "lg":
        return 48;
      default:
        return 24;
    }
  }, E = /* @__PURE__ */ J(() => P(T(), d(), C())), z = /* @__PURE__ */ J(() => y(d()));
  var B = {
    get name() {
      return a();
    },
    set name(M) {
      a(M), o();
    },
    get avatar() {
      return s();
    },
    set avatar(M) {
      s(M), o();
    },
    get profileUrl() {
      return i();
    },
    set profileUrl(M) {
      i(M), o();
    },
    get size() {
      return d();
    },
    set size(M) {
      d(M), o();
    },
    get time() {
      return c();
    },
    set time(M) {
      c(M), o();
    },
    get blings() {
      return u();
    },
    set blings(M) {
      u(M), o();
    },
    get badges() {
      return f();
    },
    set badges(M) {
      f(M), o();
    },
    get recognition() {
      return v();
    },
    set recognition(M) {
      v(M), o();
    },
    get location() {
      return g();
    },
    set location(M) {
      g(M), o();
    },
    get designation() {
      return h();
    },
    set designation(M) {
      h(M), o();
    },
    get bio() {
      return m();
    },
    set bio(M) {
      m(M), o();
    },
    get additionalBlings() {
      return _();
    },
    set additionalBlings(M) {
      _(M), o();
    },
    get originalPoster() {
      return w();
    },
    set originalPoster(M) {
      w(M), o();
    },
    get i18nOpTooltipText() {
      return p();
    },
    set i18nOpTooltipText(M = "is the original poster.") {
      p(M), o();
    },
    get i18nDeletedTooltipText() {
      return b();
    },
    set i18nDeletedTooltipText(M = "Deleted user") {
      b(M), o();
    },
    get deleted() {
      return C();
    },
    set deleted(M) {
      C(M), o();
    },
    get class() {
      return T();
    },
    set class(M = "") {
      T(M), o();
    }
  }, F = t0(), N = L(F);
  {
    var W = (M) => {
      var U = Wm(), H = K(U), S = L(H);
      ca(S, {
        id: "user-card-deleted-popover",
        tooltip: !0,
        children: (ge, ve) => {
          var X = jm(), se = K(X);
          da(se, {
            children: ($, ie) => {
              {
                let he = /* @__PURE__ */ J(() => d() === "sm" ? 16 : 24);
                Lc($, {
                  get size() {
                    return x(he);
                  }
                });
              }
            },
            $$slots: { default: !0 }
          });
          var Y = D(se, 2);
          ua(Y, {
            children: ($, ie) => {
              var he = Fm(), ke = L(he, !0);
              A(he), j(() => ee(ke, b())), k($, he);
            },
            $$slots: { default: !0 }
          }), k(ge, X);
        },
        $$slots: { default: !0 }
      });
      var I = D(S, 2), q = L(I, !0);
      A(I), A(H);
      var Q = D(H, 2);
      {
        var Z = (ge) => {
          var ve = le(), X = K(ve);
          me(X, c), k(ge, ve);
        };
        V(Q, (ge) => {
          c() && ge(Z);
        });
      }
      j(() => ee(q, a())), k(M, U);
    }, O = (M) => {
      var U = le(), H = K(U);
      {
        var S = (q) => {
          var Q = le(), Z = K(Q);
          {
            var ge = (X) => {
              var se = Ym(), Y = L(se), $ = L(Y);
              n($), A(Y);
              var ie = D(Y, 2), he = L(ie);
              Be(he, {
                get src() {
                  return ko;
                }
              });
              var ke = D(he, 2);
              me(ke, v), A(ie), A(se), k(X, se);
            }, ve = (X) => {
              n(X);
            };
            V(Z, (X) => {
              v() && d() === void 0 ? X(ge) : X(ve, !1);
            });
          }
          k(q, Q);
        }, I = (q) => {
          var Q = e0(), Z = K(Q), ge = L(Z);
          {
            var ve = (be) => {
              Ha(be, {
                get name() {
                  return a();
                },
                get href() {
                  return i();
                },
                get src() {
                  return s();
                },
                get size() {
                  return x(z);
                }
              });
            };
            V(ge, (be) => {
              s() && be(ve);
            });
          }
          var X = D(ge, 2), se = L(X), Y = L(se);
          {
            var $ = (be) => {
              var Oe = le(), Ve = K(Oe);
              St(Ve, () => i() ? "a" : "div", !1, ($e, vt) => {
                dt($e, () => ({ class: "s-user-card--username", href: i() }));
                var Ze = Ct();
                j(() => ee(Ze, a())), k(vt, Ze);
              }), k(be, Oe);
            };
            V(Y, (be) => {
              a() && be($);
            });
          }
          var ie = D(Y, 2);
          {
            var he = (be) => {
              var Oe = Gm(), Ve = L(Oe);
              me(Ve, f), A(Oe), k(be, Oe);
            };
            V(ie, (be) => {
              f() && be(he);
            });
          }
          A(se);
          var ke = D(se, 2);
          {
            var Me = (be) => {
              var Oe = Xm(), Ve = L(Oe);
              me(Ve, u), A(Oe), k(be, Oe);
            };
            V(ke, (be) => {
              u() && be(Me);
            });
          }
          A(X), A(Z);
          var te = D(Z, 2);
          {
            var fe = (be) => {
              var Oe = $m(), Ve = L(Oe);
              {
                var $e = (Ce) => {
                  var Ee = Km(), qe = L(Ee);
                  Be(qe, {
                    get src() {
                      return ko;
                    }
                  });
                  var Je = D(qe, 2);
                  me(Je, v), A(Ee), k(Ce, Ee);
                };
                V(Ve, (Ce) => {
                  v() && Ce($e);
                });
              }
              var vt = D(Ve, 2);
              {
                var Ze = (Ce) => {
                  var Ee = Jm(), qe = L(Ee);
                  {
                    var Je = (ot) => {
                      var _t = Qm(), lt = L(_t, !0);
                      A(_t), j(() => ee(lt, h())), k(ot, _t);
                    };
                    V(qe, (ot) => {
                      h() && ot(Je);
                    });
                  }
                  var At = D(qe, 2);
                  {
                    var cr = (ot) => {
                      var _t = Zm(), lt = L(_t, !0);
                      A(_t), j(() => ee(lt, g())), k(ot, _t);
                    };
                    V(At, (ot) => {
                      g() && ot(cr);
                    });
                  }
                  A(Ee), k(Ce, Ee);
                };
                V(vt, (Ce) => {
                  (h() || g()) && Ce(Ze);
                });
              }
              var re = D(vt, 2);
              {
                var Ue = (Ce) => {
                  var Ee = le(), qe = K(Ee);
                  me(qe, m), k(Ce, Ee);
                };
                V(re, (Ce) => {
                  m() && Ce(Ue);
                });
              }
              A(Oe), k(be, Oe);
            };
            V(te, (be) => {
              (v() || h() || g() || m()) && be(fe);
            });
          }
          k(q, Q);
        };
        V(
          H,
          (q) => {
            d() !== "lg" ? q(S) : q(I, !1);
          },
          !0
        );
      }
      k(M, U);
    };
    V(N, (M) => {
      C() ? M(W) : M(O, !1);
    });
  }
  return A(F), j(() => we(F, 1, Ae(x(E)))), k(t, F), de(B);
}
oe(
  Bi,
  {
    name: {},
    avatar: {},
    profileUrl: {},
    size: {},
    time: {},
    blings: {},
    badges: {},
    recognition: {},
    location: {},
    designation: {},
    bio: {},
    additionalBlings: {},
    originalPoster: {},
    i18nOpTooltipText: {},
    i18nDeletedTooltipText: {},
    deleted: {},
    class: {}
  },
  [],
  [],
  !0
);
class ra {
  static largeNumberFormat = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  });
  static standardNumberFormat = new Intl.NumberFormat("en-US", {
    notation: "standard"
  });
  /**
   * Formats a count/number into a human-readable string with compact notation for large numbers.
   *
   * @param count - The number to format
   * @param compactThreshold - (Optional) The number at which to switch from standard to compact format
   * @returns A formatted string:
   *   - Less than 10,000: standard format with commas (e.g., "1,234", "999", "-1,234")
   *   - 10,000 or more: compact format with lowercase suffixes (e.g., "10k", "1.2m", "-10k")
   */
  static formatCount(e, r = 1e4) {
    const n = Math.abs(e), a = e < 0 ? "-" : "";
    for (const s of ra.getFormatters(
      r
    ))
      if (s.condition(n))
        return a + s.format(n);
    return e.toString();
  }
  /**
   * Returns formatters that switch between standard and compact notation.
   * @param compactThreshold - The number at which to switch from standard to compact format
   */
  static getFormatters(e) {
    return [
      {
        condition: (r) => r < e,
        format: (r) => ra.standardNumberFormat.format(r)
      },
      {
        condition: (r) => r >= e,
        format: (r) => ra.largeNumberFormat.format(r).toLowerCase()
      }
    ];
  }
}
const { formatCount: fr } = ra;
var Di = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ri(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Pc = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Di, function() {
    var r = 1e3, n = 6e4, a = 36e5, s = "millisecond", i = "second", d = "minute", c = "hour", u = "day", f = "week", v = "month", g = "quarter", h = "year", m = "date", _ = "Invalid Date", w = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, b = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(M) {
      var U = ["th", "st", "nd", "rd"], H = M % 100;
      return "[" + M + (U[(H - 20) % 10] || U[H] || U[0]) + "]";
    } }, C = function(M, U, H) {
      var S = String(M);
      return !S || S.length >= U ? M : "" + Array(U + 1 - S.length).join(H) + M;
    }, T = { s: C, z: function(M) {
      var U = -M.utcOffset(), H = Math.abs(U), S = Math.floor(H / 60), I = H % 60;
      return (U <= 0 ? "+" : "-") + C(S, 2, "0") + ":" + C(I, 2, "0");
    }, m: function M(U, H) {
      if (U.date() < H.date()) return -M(H, U);
      var S = 12 * (H.year() - U.year()) + (H.month() - U.month()), I = U.clone().add(S, v), q = H - I < 0, Q = U.clone().add(S + (q ? -1 : 1), v);
      return +(-(S + (H - I) / (q ? I - Q : Q - I)) || 0);
    }, a: function(M) {
      return M < 0 ? Math.ceil(M) || 0 : Math.floor(M);
    }, p: function(M) {
      return { M: v, y: h, w: f, d: u, D: m, h: c, m: d, s: i, ms: s, Q: g }[M] || String(M || "").toLowerCase().replace(/s$/, "");
    }, u: function(M) {
      return M === void 0;
    } }, P = "en", y = {};
    y[P] = b;
    var E = "$isDayjsObject", z = function(M) {
      return M instanceof W || !(!M || !M[E]);
    }, B = function M(U, H, S) {
      var I;
      if (!U) return P;
      if (typeof U == "string") {
        var q = U.toLowerCase();
        y[q] && (I = q), H && (y[q] = H, I = q);
        var Q = U.split("-");
        if (!I && Q.length > 1) return M(Q[0]);
      } else {
        var Z = U.name;
        y[Z] = U, I = Z;
      }
      return !S && I && (P = I), I || !S && P;
    }, F = function(M, U) {
      if (z(M)) return M.clone();
      var H = typeof U == "object" ? U : {};
      return H.date = M, H.args = arguments, new W(H);
    }, N = T;
    N.l = B, N.i = z, N.w = function(M, U) {
      return F(M, { locale: U.$L, utc: U.$u, x: U.$x, $offset: U.$offset });
    };
    var W = function() {
      function M(H) {
        this.$L = B(H.locale, null, !0), this.parse(H), this.$x = this.$x || H.x || {}, this[E] = !0;
      }
      var U = M.prototype;
      return U.parse = function(H) {
        this.$d = function(S) {
          var I = S.date, q = S.utc;
          if (I === null) return /* @__PURE__ */ new Date(NaN);
          if (N.u(I)) return /* @__PURE__ */ new Date();
          if (I instanceof Date) return new Date(I);
          if (typeof I == "string" && !/Z$/i.test(I)) {
            var Q = I.match(w);
            if (Q) {
              var Z = Q[2] - 1 || 0, ge = (Q[7] || "0").substring(0, 3);
              return q ? new Date(Date.UTC(Q[1], Z, Q[3] || 1, Q[4] || 0, Q[5] || 0, Q[6] || 0, ge)) : new Date(Q[1], Z, Q[3] || 1, Q[4] || 0, Q[5] || 0, Q[6] || 0, ge);
            }
          }
          return new Date(I);
        }(H), this.init();
      }, U.init = function() {
        var H = this.$d;
        this.$y = H.getFullYear(), this.$M = H.getMonth(), this.$D = H.getDate(), this.$W = H.getDay(), this.$H = H.getHours(), this.$m = H.getMinutes(), this.$s = H.getSeconds(), this.$ms = H.getMilliseconds();
      }, U.$utils = function() {
        return N;
      }, U.isValid = function() {
        return this.$d.toString() !== _;
      }, U.isSame = function(H, S) {
        var I = F(H);
        return this.startOf(S) <= I && I <= this.endOf(S);
      }, U.isAfter = function(H, S) {
        return F(H) < this.startOf(S);
      }, U.isBefore = function(H, S) {
        return this.endOf(S) < F(H);
      }, U.$g = function(H, S, I) {
        return N.u(H) ? this[S] : this.set(I, H);
      }, U.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, U.valueOf = function() {
        return this.$d.getTime();
      }, U.startOf = function(H, S) {
        var I = this, q = !!N.u(S) || S, Q = N.p(H), Z = function(he, ke) {
          var Me = N.w(I.$u ? Date.UTC(I.$y, ke, he) : new Date(I.$y, ke, he), I);
          return q ? Me : Me.endOf(u);
        }, ge = function(he, ke) {
          return N.w(I.toDate()[he].apply(I.toDate("s"), (q ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ke)), I);
        }, ve = this.$W, X = this.$M, se = this.$D, Y = "set" + (this.$u ? "UTC" : "");
        switch (Q) {
          case h:
            return q ? Z(1, 0) : Z(31, 11);
          case v:
            return q ? Z(1, X) : Z(0, X + 1);
          case f:
            var $ = this.$locale().weekStart || 0, ie = (ve < $ ? ve + 7 : ve) - $;
            return Z(q ? se - ie : se + (6 - ie), X);
          case u:
          case m:
            return ge(Y + "Hours", 0);
          case c:
            return ge(Y + "Minutes", 1);
          case d:
            return ge(Y + "Seconds", 2);
          case i:
            return ge(Y + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, U.endOf = function(H) {
        return this.startOf(H, !1);
      }, U.$set = function(H, S) {
        var I, q = N.p(H), Q = "set" + (this.$u ? "UTC" : ""), Z = (I = {}, I[u] = Q + "Date", I[m] = Q + "Date", I[v] = Q + "Month", I[h] = Q + "FullYear", I[c] = Q + "Hours", I[d] = Q + "Minutes", I[i] = Q + "Seconds", I[s] = Q + "Milliseconds", I)[q], ge = q === u ? this.$D + (S - this.$W) : S;
        if (q === v || q === h) {
          var ve = this.clone().set(m, 1);
          ve.$d[Z](ge), ve.init(), this.$d = ve.set(m, Math.min(this.$D, ve.daysInMonth())).$d;
        } else Z && this.$d[Z](ge);
        return this.init(), this;
      }, U.set = function(H, S) {
        return this.clone().$set(H, S);
      }, U.get = function(H) {
        return this[N.p(H)]();
      }, U.add = function(H, S) {
        var I, q = this;
        H = Number(H);
        var Q = N.p(S), Z = function(X) {
          var se = F(q);
          return N.w(se.date(se.date() + Math.round(X * H)), q);
        };
        if (Q === v) return this.set(v, this.$M + H);
        if (Q === h) return this.set(h, this.$y + H);
        if (Q === u) return Z(1);
        if (Q === f) return Z(7);
        var ge = (I = {}, I[d] = n, I[c] = a, I[i] = r, I)[Q] || 1, ve = this.$d.getTime() + H * ge;
        return N.w(ve, this);
      }, U.subtract = function(H, S) {
        return this.add(-1 * H, S);
      }, U.format = function(H) {
        var S = this, I = this.$locale();
        if (!this.isValid()) return I.invalidDate || _;
        var q = H || "YYYY-MM-DDTHH:mm:ssZ", Q = N.z(this), Z = this.$H, ge = this.$m, ve = this.$M, X = I.weekdays, se = I.months, Y = I.meridiem, $ = function(ke, Me, te, fe) {
          return ke && (ke[Me] || ke(S, q)) || te[Me].slice(0, fe);
        }, ie = function(ke) {
          return N.s(Z % 12 || 12, ke, "0");
        }, he = Y || function(ke, Me, te) {
          var fe = ke < 12 ? "AM" : "PM";
          return te ? fe.toLowerCase() : fe;
        };
        return q.replace(p, function(ke, Me) {
          return Me || function(te) {
            switch (te) {
              case "YY":
                return String(S.$y).slice(-2);
              case "YYYY":
                return N.s(S.$y, 4, "0");
              case "M":
                return ve + 1;
              case "MM":
                return N.s(ve + 1, 2, "0");
              case "MMM":
                return $(I.monthsShort, ve, se, 3);
              case "MMMM":
                return $(se, ve);
              case "D":
                return S.$D;
              case "DD":
                return N.s(S.$D, 2, "0");
              case "d":
                return String(S.$W);
              case "dd":
                return $(I.weekdaysMin, S.$W, X, 2);
              case "ddd":
                return $(I.weekdaysShort, S.$W, X, 3);
              case "dddd":
                return X[S.$W];
              case "H":
                return String(Z);
              case "HH":
                return N.s(Z, 2, "0");
              case "h":
                return ie(1);
              case "hh":
                return ie(2);
              case "a":
                return he(Z, ge, !0);
              case "A":
                return he(Z, ge, !1);
              case "m":
                return String(ge);
              case "mm":
                return N.s(ge, 2, "0");
              case "s":
                return String(S.$s);
              case "ss":
                return N.s(S.$s, 2, "0");
              case "SSS":
                return N.s(S.$ms, 3, "0");
              case "Z":
                return Q;
            }
            return null;
          }(ke) || Q.replace(":", "");
        });
      }, U.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, U.diff = function(H, S, I) {
        var q, Q = this, Z = N.p(S), ge = F(H), ve = (ge.utcOffset() - this.utcOffset()) * n, X = this - ge, se = function() {
          return N.m(Q, ge);
        };
        switch (Z) {
          case h:
            q = se() / 12;
            break;
          case v:
            q = se();
            break;
          case g:
            q = se() / 3;
            break;
          case f:
            q = (X - ve) / 6048e5;
            break;
          case u:
            q = (X - ve) / 864e5;
            break;
          case c:
            q = X / a;
            break;
          case d:
            q = X / n;
            break;
          case i:
            q = X / r;
            break;
          default:
            q = X;
        }
        return I ? q : N.a(q);
      }, U.daysInMonth = function() {
        return this.endOf(v).$D;
      }, U.$locale = function() {
        return y[this.$L];
      }, U.locale = function(H, S) {
        if (!H) return this.$L;
        var I = this.clone(), q = B(H, S, !0);
        return q && (I.$L = q), I;
      }, U.clone = function() {
        return N.w(this.$d, this);
      }, U.toDate = function() {
        return new Date(this.valueOf());
      }, U.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, U.toISOString = function() {
        return this.$d.toISOString();
      }, U.toString = function() {
        return this.$d.toUTCString();
      }, M;
    }(), O = W.prototype;
    return F.prototype = O, [["$ms", s], ["$s", i], ["$m", d], ["$H", c], ["$W", u], ["$M", v], ["$y", h], ["$D", m]].forEach(function(M) {
      O[M[1]] = function(U) {
        return this.$g(U, M[0], M[1]);
      };
    }), F.extend = function(M, U) {
      return M.$i || (M(U, W, F), M.$i = !0), F;
    }, F.locale = B, F.isDayjs = z, F.unix = function(M) {
      return F(1e3 * M);
    }, F.en = y[P], F.Ls = y, F.p = {}, F;
  });
})(Pc);
var r0 = Pc.exports;
const fs = /* @__PURE__ */ Ri(r0);
var Ic = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Di, function() {
    return function(r, n, a) {
      r = r || {};
      var s = n.prototype, i = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function d(u, f, v, g) {
        return s.fromToBase(u, f, v, g);
      }
      a.en.relativeTime = i, s.fromToBase = function(u, f, v, g, h) {
        for (var m, _, w, p = v.$locale().relativeTime || i, b = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], C = b.length, T = 0; T < C; T += 1) {
          var P = b[T];
          P.d && (m = g ? a(u).diff(v, P.d, !0) : v.diff(u, P.d, !0));
          var y = (r.rounding || Math.round)(Math.abs(m));
          if (w = m > 0, y <= P.r || !P.r) {
            y <= 1 && T > 0 && (P = b[T - 1]);
            var E = p[P.l];
            h && (y = h("" + y)), _ = typeof E == "string" ? E.replace("%d", y) : E(y, f, P.l, w);
            break;
          }
        }
        if (f) return _;
        var z = w ? p.future : p.past;
        return typeof z == "function" ? z(_) : z.replace("%s", _);
      }, s.to = function(u, f) {
        return d(u, f, this, !0);
      }, s.from = function(u, f) {
        return d(u, f, this);
      };
      var c = function(u) {
        return u.$u ? a.utc() : a();
      };
      s.toNow = function(u) {
        return this.to(c(this), u);
      }, s.fromNow = function(u) {
        return this.from(c(this), u);
      };
    };
  });
})(Ic);
var n0 = Ic.exports;
const a0 = /* @__PURE__ */ Ri(n0);
var zc = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(Di, function() {
    return function(r, n, a) {
      a.updateLocale = function(s, i) {
        var d = a.Ls[s];
        if (d) return (i ? Object.keys(i) : []).forEach(function(c) {
          d[c] = i[c];
        }), d;
      };
    };
  });
})(zc);
var s0 = zc.exports;
const i0 = /* @__PURE__ */ Ri(s0);
fs.extend(a0);
fs.extend(i0);
const o0 = {
  // strict thresholds
  thresholds: [
    { l: "s", r: 1 },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" }
  ],
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d seconds ago",
    ss: "%d seconds ago",
    m: "1 minute ago",
    mm: "%d minutes ago",
    h: "1 hour ago",
    hh: "%d hours ago",
    d: "yesterday",
    dd: "%d days ago"
  },
  rounding: Math.floor
};
fs.updateLocale("en", o0);
class l0 {
  /**
   * Formats a UTC time string into a human-readable relative or absolute time format.
   *
   * @param utcTime - A UTC time string (e.g., "2026-01-15T15:45:30Z")
   * @returns A formatted time string:
   *   - Within 2 days: relative time (e.g., "2 hours ago", "yesterday")
   *   - Same year: short date with time (e.g., "Jan 15 at 15:45")
   *   - Different year: full date with time (e.g., "Jan 15, 2025 at 15:45")
   */
  static formatTime(e) {
    const r = /* @__PURE__ */ new Date(), n = new Date(e), a = Math.floor(
      (r.getTime() - n.getTime()) / 1e3
    ), d = 24 * (60 * 60), c = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }, u = [
      {
        condition: (v) => v <= 2 * d,
        format: (v) => fs(v).fromNow(!0)
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        condition: (v) => r.getFullYear() === n.getFullYear(),
        format: (v) => new Intl.DateTimeFormat("en-US", c).format(v).replace(/,([^,]*)$/, " at$1")
      }
    ];
    let f = new Intl.DateTimeFormat("en-US", {
      ...c,
      year: "numeric"
    }).format(n).replace(/,([^,]*)$/, " at$1");
    for (const v of u)
      if (v.condition(a)) {
        f = v.format(n);
        break;
      }
    return f;
  }
}
const { formatTime: c0 } = l0;
var u0 = /* @__PURE__ */ R('<a class="s-user-card--time"> </a>'), d0 = /* @__PURE__ */ R("<time> </time>"), f0 = /* @__PURE__ */ R("<!> <!>", 1);
function Ui(t, e) {
  ue(e, !0);
  const r = l(e, "text", 7), n = l(e, "timestamp", 7), a = l(e, "href", 7);
  var s = {
    get text() {
      return r();
    },
    set text(i) {
      r(i), o();
    },
    get timestamp() {
      return n();
    },
    set timestamp(i) {
      n(i), o();
    },
    get href() {
      return a();
    },
    set href(i) {
      a(i), o();
    }
  };
  return ca(t, {
    id: "user-card-time-popover",
    tooltip: !0,
    children: (i, d) => {
      var c = f0(), u = K(c);
      da(u, {
        children: (g, h) => {
          var m = u0(), _ = L(m, !0);
          A(m), j(
            (w) => {
              ae(m, "href", a()), ee(_, w);
            },
            [
              () => r() || c0(typeof n() == "string" ? n() : n().toISOString())
            ]
          ), k(g, m);
        },
        $$slots: { default: !0 }
      });
      var f = D(u, 2);
      {
        var v = (g) => {
          ua(g, {
            children: (h, m) => {
              var _ = d0(), w = L(_, !0);
              A(_), j(() => ee(w, n())), k(h, _);
            },
            $$slots: { default: !0 }
          });
        };
        V(f, (g) => {
          n() && g(v);
        });
      }
      k(i, c);
    },
    $$slots: { default: !0 }
  }), de(s);
}
oe(Ui, { text: {}, timestamp: {}, href: {} }, [], [], !0);
var v0 = /* @__PURE__ */ R("<li><!> </li>");
function Vi(t, e) {
  ue(e, !0);
  const r = l(e, "type", 7), n = l(e, "name", 7), a = l(e, "text", 7);
  var s = {
    get type() {
      return r();
    },
    set type(u) {
      r(u), o();
    },
    get name() {
      return n();
    },
    set name(u) {
      n(u), o();
    },
    get text() {
      return a();
    },
    set text(u) {
      a(u), o();
    }
  }, i = v0(), d = L(i);
  Si(d, {
    get name() {
      return n();
    },
    get type() {
      return r();
    },
    size: "sm"
  });
  var c = D(d);
  return A(i), j(() => {
    we(i, 1, Ae(r() === "rep" ? "s-user-card--rep" : "")), ee(c, ` ${a() ?? ""}`);
  }), k(t, i), de(s);
}
oe(Vi, { type: {}, name: {}, text: {} }, [], [], !0);
var g0 = /* @__PURE__ */ R('<div class="s-post-summary--stats-bounty"><span>+</span> <span class="v-visible-sr"> </span></div>'), h0 = /* @__PURE__ */ R('<div class="s-post-summary--stats-bounty"><span>+</span> <span class="v-visible-sr"> </span></div>'), m0 = /* @__PURE__ */ R('<div class="s-post-summary--stats-item"> </div>'), _0 = /* @__PURE__ */ R('<div class="s-post-summary--stats-item"> </div>'), b0 = /* @__PURE__ */ R('<div class="s-post-summary--sm-hide ml-auto"><!></div>'), p0 = /* @__PURE__ */ R('<div class="s-post-summary--tags"><!> <!></div>'), w0 = /* @__PURE__ */ R('<div class="s-post-summary--answers"><!></div>'), y0 = /* @__PURE__ */ R('<div><div class="s-post-summary--stats s-post-summary--sm-hide"><div class="s-post-summary--stats-votes"><!> <span class="v-visible-sr"> </span></div> <div class="s-post-summary--stats-answers"><!> <span class="v-visible-sr"> </span></div> <!></div> <div class="s-post-summary--content"><div class="s-post-summary--sm-show"><!></div> <div class="s-post-summary--content-meta"><!> <div class="s-post-summary--stats s-post-summary--sm-show"><div class="s-post-summary--stats-votes"><!> </div> <div class="s-post-summary--stats-answers"><!> <span class="v-visible-sr"> </span></div> <!></div> <div class="s-post-summary--stats-item"> </div> <!> <!> <!></div> <div class="s-post-summary--title"><a class="s-post-summary--title-link"><!> </a></div> <!> <!> <!></div></div>');
function x0(t, e) {
  ue(e, !0);
  const r = (G) => {
    var pe = le(), ze = K(pe);
    {
      var Xe = (We) => {
        Vi(We, {
          get name() {
            return O();
          },
          type: "rep",
          get text() {
            return f();
          }
        });
      };
      V(ze, (We) => {
        f() && We(Xe);
      });
    }
    k(G, pe);
  }, n = l(e, "href", 7), a = l(e, "title", 7), s = l(e, "readableTimestamp", 7), i = l(e, "utcTimestamp", 7), d = l(e, "userAvatar", 7), c = l(e, "userName", 7), u = l(e, "userProfileUrl", 7), f = l(e, "userReputation", 7), v = l(e, "acceptedAnswer", 7, !1), g = l(e, "answers", 7, void 0), h = l(e, "bounty", 7, void 0), m = l(e, "comments", 7, void 0), _ = l(e, "contentType", 7, void 0), w = l(e, "excerpt", 7, ""), p = l(e, "excerptLines", 7, 3), b = l(e, "gated", 7, !1), C = l(e, "readTime", 7, void 0), T = l(e, "state", 7, void 0), P = l(e, "views", 7, void 0), y = l(e, "votes", 7, void 0), E = l(e, "i18nAcceptedAnswerIconTitle", 7, "Has accepted answer"), z = l(e, "i18nAnswersUnit", 7), B = l(e, "i18nBountyUnit", 7, "bounty"), F = l(e, "i18nCommentsUnit", 7, void 0), N = l(e, "i18nContentTypeText", 7, void 0), W = l(e, "i18nGatedTitle", 7, void 0), O = l(e, "i18nReputationBlingName", 7, "reputation bling"), M = l(e, "i18nStateBadgeText", 7, void 0), U = l(e, "i18nViewsUnit", 7, void 0), H = l(e, "i18nVotesUnit", 7, void 0), S = l(e, "class", 7, ""), I = l(e, "tags", 7), q = l(e, "answerPreviews", 7), Q = /* @__PURE__ */ J(() => z() ?? (g() === 1 ? "answer" : "answers")), Z = /* @__PURE__ */ J(() => F() ?? (m() === 1 ? "comment" : "comments")), ge = /* @__PURE__ */ J(() => U() ?? (P() === 1 ? "view" : "views")), ve = /* @__PURE__ */ J(() => H() ?? (y() === 1 ? "vote" : "votes")), X = (G, pe, ze) => {
    const Xe = "s-post-summary";
    let We = Xe;
    return G && (We += ` ${G}`), ze && (We += ` ${Xe}__answered`), pe === "deleted" && (We += ` ${Xe}__${pe}`), We;
  }, se = /* @__PURE__ */ J(() => X(S(), T(), v()));
  var Y = {
    get href() {
      return n();
    },
    set href(G) {
      n(G), o();
    },
    get title() {
      return a();
    },
    set title(G) {
      a(G), o();
    },
    get readableTimestamp() {
      return s();
    },
    set readableTimestamp(G) {
      s(G), o();
    },
    get utcTimestamp() {
      return i();
    },
    set utcTimestamp(G) {
      i(G), o();
    },
    get userAvatar() {
      return d();
    },
    set userAvatar(G) {
      d(G), o();
    },
    get userName() {
      return c();
    },
    set userName(G) {
      c(G), o();
    },
    get userProfileUrl() {
      return u();
    },
    set userProfileUrl(G) {
      u(G), o();
    },
    get userReputation() {
      return f();
    },
    set userReputation(G) {
      f(G), o();
    },
    get acceptedAnswer() {
      return v();
    },
    set acceptedAnswer(G = !1) {
      v(G), o();
    },
    get answers() {
      return g();
    },
    set answers(G = void 0) {
      g(G), o();
    },
    get bounty() {
      return h();
    },
    set bounty(G = void 0) {
      h(G), o();
    },
    get comments() {
      return m();
    },
    set comments(G = void 0) {
      m(G), o();
    },
    get contentType() {
      return _();
    },
    set contentType(G = void 0) {
      _(G), o();
    },
    get excerpt() {
      return w();
    },
    set excerpt(G = "") {
      w(G), o();
    },
    get excerptLines() {
      return p();
    },
    set excerptLines(G = 3) {
      p(G), o();
    },
    get gated() {
      return b();
    },
    set gated(G = !1) {
      b(G), o();
    },
    get readTime() {
      return C();
    },
    set readTime(G = void 0) {
      C(G), o();
    },
    get state() {
      return T();
    },
    set state(G = void 0) {
      T(G), o();
    },
    get views() {
      return P();
    },
    set views(G = void 0) {
      P(G), o();
    },
    get votes() {
      return y();
    },
    set votes(G = void 0) {
      y(G), o();
    },
    get i18nAcceptedAnswerIconTitle() {
      return E();
    },
    set i18nAcceptedAnswerIconTitle(G = "Has accepted answer") {
      E(G), o();
    },
    get i18nAnswersUnit() {
      return z();
    },
    set i18nAnswersUnit(G) {
      z(G), o();
    },
    get i18nBountyUnit() {
      return B();
    },
    set i18nBountyUnit(G = "bounty") {
      B(G), o();
    },
    get i18nCommentsUnit() {
      return F();
    },
    set i18nCommentsUnit(G = void 0) {
      F(G), o();
    },
    get i18nContentTypeText() {
      return N();
    },
    set i18nContentTypeText(G = void 0) {
      N(G), o();
    },
    get i18nGatedTitle() {
      return W();
    },
    set i18nGatedTitle(G = void 0) {
      W(G), o();
    },
    get i18nReputationBlingName() {
      return O();
    },
    set i18nReputationBlingName(G = "reputation bling") {
      O(G), o();
    },
    get i18nStateBadgeText() {
      return M();
    },
    set i18nStateBadgeText(G = void 0) {
      M(G), o();
    },
    get i18nViewsUnit() {
      return U();
    },
    set i18nViewsUnit(G = void 0) {
      U(G), o();
    },
    get i18nVotesUnit() {
      return H();
    },
    set i18nVotesUnit(G = void 0) {
      H(G), o();
    },
    get class() {
      return S();
    },
    set class(G = "") {
      S(G), o();
    },
    get tags() {
      return I();
    },
    set tags(G) {
      I(G), o();
    },
    get answerPreviews() {
      return q();
    },
    set answerPreviews(G) {
      q(G), o();
    }
  }, $ = y0(), ie = L($), he = L(ie), ke = L(he);
  {
    var Me = (G) => {
      var pe = Ct("+");
      k(G, pe);
    };
    V(ke, (G) => {
      Number(y()) > 0 && G(Me);
    });
  }
  var te = D(ke), fe = D(te), be = L(fe, !0);
  A(fe), A(he);
  var Oe = D(he, 2), Ve = L(Oe);
  {
    var $e = (G) => {
      Be(G, {
        get src() {
          return js;
        },
        get title() {
          return E();
        }
      });
    }, vt = (G) => {
      Be(G, {
        get src() {
          return Co;
        }
      });
    };
    V(Ve, (G) => {
      v() ? G($e) : G(vt, !1);
    });
  }
  var Ze = D(Ve), re = D(Ze), Ue = L(re, !0);
  A(re), A(Oe);
  var Ce = D(Oe, 2);
  {
    var Ee = (G) => {
      var pe = g0(), ze = D(L(pe)), Xe = D(ze), We = L(Xe, !0);
      A(Xe), A(pe), j(
        (at) => {
          ee(ze, ` ${at ?? ""} `), ee(We, B());
        },
        [() => fr(h() || 0)]
      ), k(G, pe);
    };
    V(Ce, (G) => {
      h() && G(Ee);
    });
  }
  A(ie);
  var qe = D(ie, 2), Je = L(qe), At = L(Je);
  {
    var cr = (G) => {
      Ys(G, {
        get state() {
          return T();
        },
        get i18nText() {
          return M();
        }
      });
    };
    V(At, (G) => {
      T() && T() !== "deleted" && G(cr);
    });
  }
  A(Je);
  var ot = D(Je, 2), _t = L(ot);
  Bi(_t, {
    get profileUrl() {
      return u();
    },
    size: "sm",
    get avatar() {
      return d();
    },
    get name() {
      return c();
    },
    get blings() {
      return r;
    },
    time: (pe) => {
      Ui(pe, {
        get text() {
          return s();
        },
        get timestamp() {
          return i();
        }
      });
    },
    $$slots: { time: !0 }
  });
  var lt = D(_t, 2), Zt = L(lt), Hr = L(Zt);
  Be(Hr, {
    get src() {
      return Mi;
    }
  });
  var ne = D(Hr);
  A(Zt);
  var ct = D(Zt, 2), wt = L(ct);
  {
    var Se = (G) => {
      Be(G, {
        get src() {
          return js;
        }
      });
    }, Dt = (G) => {
      Be(G, {
        get src() {
          return Co;
        }
      });
    };
    V(wt, (G) => {
      v() ? G(Se) : G(Dt, !1);
    });
  }
  var ft = D(wt), gt = D(ft), Fr = L(gt, !0);
  A(gt), A(ct);
  var Jt = D(ct, 2);
  {
    var jr = (G) => {
      var pe = h0(), ze = D(L(pe)), Xe = D(ze), We = L(Xe, !0);
      A(Xe), A(pe), j(
        (at) => {
          ee(ze, ` ${at ?? ""} `), ee(We, B());
        },
        [() => fr(h() || 0)]
      ), k(G, pe);
    };
    V(Jt, (G) => {
      h() && G(jr);
    });
  }
  A(lt);
  var ce = D(lt, 2), De = L(ce);
  A(ce);
  var He = D(ce, 2);
  {
    var et = (G) => {
      var pe = m0(), ze = L(pe);
      A(pe), j(
        (Xe) => ee(ze, `${Xe ?? ""}
                    ${x(Z) ?? ""}`),
        [() => fr(m() || 0)]
      ), k(G, pe);
    };
    V(He, (G) => {
      m() && G(et);
    });
  }
  var st = D(He, 2);
  {
    var Re = (G) => {
      var pe = _0(), ze = L(pe, !0);
      A(pe), j(() => ee(ze, C())), k(G, pe);
    };
    V(st, (G) => {
      C() && G(Re);
    });
  }
  var Qe = D(st, 2);
  {
    var It = (G) => {
      var pe = b0(), ze = L(pe);
      Ys(ze, {
        get state() {
          return T();
        },
        get i18nText() {
          return M();
        }
      }), A(pe), k(G, pe);
    };
    V(Qe, (G) => {
      T() && T() !== "deleted" && G(It);
    });
  }
  A(ot);
  var zt = D(ot, 2), Rt = L(zt), Ne = L(Rt);
  {
    var Ge = (G) => {
      Be(G, {
        get src() {
          return eh;
        },
        class: "s-post-summary--title-icon",
        get title() {
          return W();
        }
      });
    };
    V(Ne, (G) => {
      b() && G(Ge);
    });
  }
  var ht = D(Ne);
  A(Rt), A(zt);
  var Yt = D(zt, 2);
  {
    var Le = (G) => {
      Ni(G, {
        get excerpt() {
          return w();
        },
        get lines() {
          return p();
        }
      });
    };
    V(Yt, (G) => {
      w() && p() > 0 && G(Le);
    });
  }
  var bt = D(Yt, 2);
  {
    var ir = (G) => {
      var pe = p0(), ze = L(pe);
      {
        var Xe = (ut) => {
          Ec(ut, {
            get name() {
              return _().name;
            },
            get href() {
              return _().url;
            },
            get i18nContentTypeText() {
              return N();
            }
          });
        };
        V(ze, (ut) => {
          _() && ut(Xe);
        });
      }
      var We = D(ze, 2);
      {
        var at = (ut) => {
          var Ut = le(), tn = K(Ut);
          me(tn, I), k(ut, Ut);
        };
        V(We, (ut) => {
          I() && ut(at);
        });
      }
      A(pe), k(G, pe);
    };
    V(bt, (G) => {
      (_() || I()) && G(ir);
    });
  }
  var ur = D(bt, 2);
  {
    var dr = (G) => {
      var pe = w0(), ze = L(pe);
      me(ze, q), A(pe), k(G, pe);
    };
    V(ur, (G) => {
      q() && G(dr);
    });
  }
  return A(qe), A($), j(
    (G, pe, ze, Xe) => {
      we($, 1, Ae(x(se))), ee(te, `${(y() || "0") ?? ""} `), ee(be, x(ve)), ee(Ze, ` ${G ?? ""} `), ee(Ue, x(Q)), ee(ne, ` ${pe ?? ""}`), ee(ft, ` ${ze ?? ""} `), ee(Fr, x(Q)), ee(De, `${Xe ?? ""}
                ${x(ge) ?? ""}`), ae(Rt, "href", n()), ee(ht, ` ${a() ?? ""}`);
    },
    [
      () => fr(g() || 0),
      () => fr(y() || 0),
      () => fr(g() || 0),
      () => fr(P() || 0)
    ]
  ), k(t, $), de(Y);
}
oe(
  x0,
  {
    href: {},
    title: {},
    readableTimestamp: {},
    utcTimestamp: {},
    userAvatar: {},
    userName: {},
    userProfileUrl: {},
    userReputation: {},
    acceptedAnswer: {},
    answers: {},
    bounty: {},
    comments: {},
    contentType: {},
    excerpt: {},
    excerptLines: {},
    gated: {},
    readTime: {},
    state: {},
    views: {},
    votes: {},
    i18nAcceptedAnswerIconTitle: {},
    i18nAnswersUnit: {},
    i18nBountyUnit: {},
    i18nCommentsUnit: {},
    i18nContentTypeText: {},
    i18nGatedTitle: {},
    i18nReputationBlingName: {},
    i18nStateBadgeText: {},
    i18nViewsUnit: {},
    i18nVotesUnit: {},
    class: {},
    tags: {},
    answerPreviews: {}
  },
  [],
  [],
  !0
);
var T0 = /* @__PURE__ */ R('<div class="s-post-summary--stats-answers"><!> </div>'), k0 = /* @__PURE__ */ R('<div><div class="s-post-summary--content-meta"><!> <div class="s-post-summary--stats"><div class="s-post-summary--stats-votes"><!> </div> <!></div></div> <!></div>');
function C0(t, e) {
  ue(e, !0);
  const r = (N) => {
    var W = le(), O = K(W);
    {
      var M = (U) => {
        Vi(U, {
          get name() {
            return h();
          },
          type: "rep",
          get text() {
            return u();
          }
        });
      };
      V(O, (U) => {
        u() && U(M);
      });
    }
    k(N, W);
  }, n = l(e, "excerpt", 7), a = l(e, "readableTimestamp", 7), s = l(e, "utcTimestamp", 7), i = l(e, "userAvatar", 7), d = l(e, "userName", 7), c = l(e, "userProfileUrl", 7), u = l(e, "userReputation", 7), f = l(e, "votes", 7), v = l(e, "accepted", 7, !1), g = l(e, "i18nAcceptedAnswerText", 7, "Accepted answer"), h = l(e, "i18nReputationBlingName", 7, "reputation bling"), m = (N) => {
    const W = "s-post-summary--answer";
    let O = W;
    return N && (O += ` ${W}__accepted`), O;
  }, _ = /* @__PURE__ */ J(() => m(v()));
  var w = {
    get excerpt() {
      return n();
    },
    set excerpt(N) {
      n(N), o();
    },
    get readableTimestamp() {
      return a();
    },
    set readableTimestamp(N) {
      a(N), o();
    },
    get utcTimestamp() {
      return s();
    },
    set utcTimestamp(N) {
      s(N), o();
    },
    get userAvatar() {
      return i();
    },
    set userAvatar(N) {
      i(N), o();
    },
    get userName() {
      return d();
    },
    set userName(N) {
      d(N), o();
    },
    get userProfileUrl() {
      return c();
    },
    set userProfileUrl(N) {
      c(N), o();
    },
    get userReputation() {
      return u();
    },
    set userReputation(N) {
      u(N), o();
    },
    get votes() {
      return f();
    },
    set votes(N) {
      f(N), o();
    },
    get accepted() {
      return v();
    },
    set accepted(N = !1) {
      v(N), o();
    },
    get i18nAcceptedAnswerText() {
      return g();
    },
    set i18nAcceptedAnswerText(N = "Accepted answer") {
      g(N), o();
    },
    get i18nReputationBlingName() {
      return h();
    },
    set i18nReputationBlingName(N = "reputation bling") {
      h(N), o();
    }
  }, p = k0(), b = L(p), C = L(b);
  Bi(C, {
    get profileUrl() {
      return c();
    },
    size: "sm",
    get avatar() {
      return i();
    },
    get name() {
      return d();
    },
    get blings() {
      return r;
    },
    time: (W) => {
      Ui(W, {
        get text() {
          return a();
        },
        get timestamp() {
          return s();
        }
      });
    },
    $$slots: { time: !0 }
  });
  var T = D(C, 2), P = L(T), y = L(P);
  Be(y, {
    get src() {
      return Mi;
    }
  });
  var E = D(y);
  A(P);
  var z = D(P, 2);
  {
    var B = (N) => {
      var W = T0(), O = L(W);
      Be(O, {
        get src() {
          return js;
        },
        class: "s-post-summary--stats-answers--icon"
      });
      var M = D(O);
      A(W), j(() => ee(M, ` ${g() ?? ""}`)), k(N, W);
    };
    V(z, (N) => {
      v() && N(B);
    });
  }
  A(T), A(b);
  var F = D(b, 2);
  return Ni(F, {
    get excerpt() {
      return n();
    },
    truncate: !1
  }), A(p), j(
    (N) => {
      we(p, 1, Ae(x(_))), ee(E, ` ${N ?? ""}`);
    },
    [() => fr(f() || 0)]
  ), k(t, p), de(w);
}
oe(
  C0,
  {
    excerpt: {},
    readableTimestamp: {},
    utcTimestamp: {},
    userAvatar: {},
    userName: {},
    userProfileUrl: {},
    userReputation: {},
    votes: {},
    accepted: {},
    i18nAcceptedAnswerText: {},
    i18nReputationBlingName: {}
  },
  [],
  [],
  !0
);
function S0(t, e) {
  ue(e, !0);
  let r = l(e, "label", 7), n = l(e, "name", 7), a = l(e, "options", 7), s = l(e, "value", 15), i = l(e, "disabled", 7, !1), d = l(e, "horizontal", 7, !1), c = l(e, "state", 7, ""), u = l(e, "class", 7, ""), f = l(e, "onValueChange", 7);
  var v = {
    get label() {
      return r();
    },
    set label(g) {
      r(g), o();
    },
    get name() {
      return n();
    },
    set name(g) {
      n(g), o();
    },
    get options() {
      return a();
    },
    set options(g) {
      a(g), o();
    },
    get value() {
      return s();
    },
    set value(g) {
      s(g), o();
    },
    get disabled() {
      return i();
    },
    set disabled(g = !1) {
      i(g), o();
    },
    get horizontal() {
      return d();
    },
    set horizontal(g = !1) {
      d(g), o();
    },
    get state() {
      return c();
    },
    set state(g = "") {
      c(g), o();
    },
    get class() {
      return u();
    },
    set class(g = "") {
      u(g), o();
    },
    get onValueChange() {
      return f();
    },
    set onValueChange(g) {
      f(g), o();
    }
  };
  return Pi(t, {
    type: "radio",
    get class() {
      return u();
    },
    get disabled() {
      return i();
    },
    get horizontal() {
      return d();
    },
    get label() {
      return r();
    },
    get name() {
      return n();
    },
    get options() {
      return a();
    },
    get state() {
      return c();
    },
    get onValueChange() {
      return f();
    },
    get value() {
      return s();
    },
    set value(g) {
      s(g);
    }
  }), de(v);
}
oe(
  S0,
  {
    label: {},
    name: {},
    options: {},
    value: {},
    disabled: {},
    horizontal: {},
    state: {},
    class: {},
    onValueChange: {}
  },
  [],
  [],
  !0
);
const Mc = "select-context";
function A0(t) {
  const e = zn(Mc);
  if (e === void 0)
    throw new Error(`<${t} /> is missing a parent <Select /> component.`);
  return e;
}
var E0 = /* @__PURE__ */ R('<p class="s-description mb0 mtn2"><!></p>'), L0 = /* @__PURE__ */ R('<div class="s-input-icon"><!></div>'), P0 = /* @__PURE__ */ R('<p class="s-input-message"><!></p>'), I0 = /* @__PURE__ */ R("<div><!> <!> <div><select><!></select> <!></div> <!></div>");
function z0(t, e) {
  ue(e, !0);
  let r = l(e, "id", 7), n = l(e, "label", 7), a = l(e, "labelStatus", 7), s = l(e, "labelStatusText", 7), i = l(e, "selected", 15, void 0), d = l(e, "disabled", 7, !1), c = l(e, "hideLabel", 7, !1), u = l(e, "name", 7, void 0), f = l(e, "size", 7, ""), v = l(e, "state", 7, ""), g = l(e, "labelPlacement", 7, "top"), h = l(e, "children", 7), m = l(e, "description", 7), _ = l(e, "message", 7), w = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "id",
    "label",
    "labelStatus",
    "labelStatusText",
    "selected",
    "disabled",
    "hideLabel",
    "name",
    "size",
    "state",
    "labelPlacement",
    "children",
    "description",
    "message"
  ]);
  const p = (I, q) => {
    const Q = "s-select";
    let Z = Q;
    return I && (Z += ` ${Q}__${I}`), q === "left" && (Z += " ml8"), Z;
  };
  let b = /* @__PURE__ */ J(() => p(f(), g())), C = /* @__PURE__ */ Ye(tr({ selected: i() }));
  kt(() => {
    x(C).selected = i();
  }), ga(Mc, x(C));
  const T = (I) => {
    const q = I.target;
    x(C).selected = q.value, i(q.value), e.onchange?.(I);
  };
  var P = {
    get id() {
      return r();
    },
    set id(I) {
      r(I), o();
    },
    get label() {
      return n();
    },
    set label(I) {
      n(I), o();
    },
    get labelStatus() {
      return a();
    },
    set labelStatus(I) {
      a(I), o();
    },
    get labelStatusText() {
      return s();
    },
    set labelStatusText(I) {
      s(I), o();
    },
    get selected() {
      return i();
    },
    set selected(I = void 0) {
      i(I), o();
    },
    get disabled() {
      return d();
    },
    set disabled(I = !1) {
      d(I), o();
    },
    get hideLabel() {
      return c();
    },
    set hideLabel(I = !1) {
      c(I), o();
    },
    get name() {
      return u();
    },
    set name(I = void 0) {
      u(I), o();
    },
    get size() {
      return f();
    },
    set size(I = "") {
      f(I), o();
    },
    get state() {
      return v();
    },
    set state(I = "") {
      v(I), o();
    },
    get labelPlacement() {
      return g();
    },
    set labelPlacement(I = "top") {
      g(I), o();
    },
    get children() {
      return h();
    },
    set children(I) {
      h(I), o();
    },
    get description() {
      return m();
    },
    set description(I) {
      m(I), o();
    },
    get message() {
      return _();
    },
    set message(I) {
      _(I), o();
    }
  }, y = I0();
  let E;
  var z = L(y);
  {
    let I = /* @__PURE__ */ J(() => c() ? "v-visible-sr" : g() === "left" ? "pb0" : "");
    Gn(z, {
      get id() {
        return r();
      },
      get class() {
        return x(I);
      },
      get size() {
        return f();
      },
      get status() {
        return a();
      },
      get statusText() {
        return s();
      },
      children: (q, Q) => {
        mt();
        var Z = Ct();
        j(() => ee(Z, n())), k(q, Z);
      },
      $$slots: { default: !0 }
    });
  }
  var B = D(z, 2);
  {
    var F = (I) => {
      var q = E0(), Q = L(q);
      me(Q, m), A(q), j(() => ae(q, "id", `${r()}-description`)), k(I, q);
    };
    V(B, (I) => {
      m() && !c() && g() === "top" && I(F);
    });
  }
  var N = D(B, 2), W = L(N);
  dt(W, () => ({
    id: r(),
    name: u(),
    disabled: d(),
    "aria-describedby": _() ? `${r()}-message` : m() ? `${r()}-description` : void 0,
    "aria-invalid": v() === "error",
    onchange: T,
    ...w
  }));
  var O = L(W);
  me(O, () => h() ?? je), A(W);
  var M = D(W, 2);
  {
    var U = (I) => {
      var q = L0(), Q = L(q);
      {
        var Z = (ve) => {
          Be(ve, {
            get src() {
              return us;
            }
          });
        }, ge = (ve) => {
          var X = le(), se = K(X);
          {
            var Y = (ie) => {
              Be(ie, {
                get src() {
                  return ds;
                }
              });
            }, $ = (ie) => {
              Be(ie, {
                get src() {
                  return cs;
                }
              });
            };
            V(
              se,
              (ie) => {
                v() === "success" ? ie(Y) : ie($, !1);
              },
              !0
            );
          }
          k(ve, X);
        };
        V(Q, (ve) => {
          v() === "error" ? ve(Z) : ve(ge, !1);
        });
      }
      A(q), k(I, q);
    };
    V(M, (I) => {
      v() && I(U);
    });
  }
  A(N);
  var H = D(N, 2);
  {
    var S = (I) => {
      var q = P0(), Q = L(q);
      me(Q, _), A(q), j(() => ae(q, "id", `${r()}-message`)), k(I, q);
    };
    V(H, (I) => {
      _() && I(S);
    });
  }
  return A(y), j(
    (I) => {
      E = we(y, 1, "s-form-group", null, E, I), we(N, 1, Ae(x(b)));
    },
    [
      () => ({
        "s-form-group__horizontal": g() === "left",
        "ai-center": g() === "left",
        "has-error": v() === "error",
        "has-success": v() === "success",
        "has-warning": v() === "warning"
      })
    ]
  ), k(t, y), de(P);
}
oe(
  z0,
  {
    id: {},
    label: {},
    labelStatus: {},
    labelStatusText: {},
    selected: {},
    disabled: {},
    hideLabel: {},
    name: {},
    size: {},
    state: {},
    labelPlacement: {},
    children: {},
    description: {},
    message: {}
  },
  [],
  [],
  !0
);
var M0 = /* @__PURE__ */ R("<option> </option>");
function O0(t, e) {
  ue(e, !0);
  let r = l(e, "value", 7, ""), n = l(e, "text", 7, ""), a = l(e, "disabled", 7, !1), s = A0("SelectItem"), i = /* @__PURE__ */ J(() => s.selected === r());
  var d = {
    get value() {
      return r();
    },
    set value(v = "") {
      r(v), o();
    },
    get text() {
      return n();
    },
    set text(v = "") {
      n(v), o();
    },
    get disabled() {
      return a();
    },
    set disabled(v = !1) {
      a(v), o();
    }
  }, c = M0(), u = L(c, !0);
  A(c);
  var f = {};
  return j(() => {
    c.disabled = a(), di(c, x(i)), ae(c, "data-selected", x(i)), ee(u, n() || r()), f !== (f = r()) && (c.value = (c.__value = r()) ?? "");
  }), k(t, c), de(d);
}
oe(O0, { value: {}, text: {}, disabled: {} }, [], [], !0);
var N0 = /* @__PURE__ */ R('<span class="s-tag--sponsor"><!></span>'), B0 = /* @__PURE__ */ R("<a><!> <!></a>"), D0 = /* @__PURE__ */ R('<span class="s-tag--sponsor"><!></span>'), R0 = /* @__PURE__ */ R("<!> <!>", 1), U0 = /* @__PURE__ */ R('<div class="v-visible-sr"> </div>'), V0 = /* @__PURE__ */ R('<div class="v-visible-sr"> </div>'), q0 = /* @__PURE__ */ R('<div class="v-visible-sr"> </div>'), H0 = /* @__PURE__ */ R('<div class="v-visible-sr"> </div>'), F0 = /* @__PURE__ */ R('<div class="v-visible-sr"> </div>'), j0 = /* @__PURE__ */ R('<button class="s-tag--dismiss" type="button"><span class="v-visible-sr"> </span><!></button>'), W0 = /* @__PURE__ */ R("<!> <!> <!> <!> <!> <!> <!>", 1);
function Y0(t, e) {
  ue(e, !0);
  const r = l(e, "size", 7, ""), n = l(e, "variant", 7, ""), a = l(e, "href", 7), s = l(e, "dismissable", 7, !1), i = l(e, "ignored", 7, !1), d = l(e, "watched", 7, !1), c = l(e, "i18nDismissButtonText", 7, "Dismiss tag"), u = l(e, "i18nSponsorTagText", 7, "Sponsored tag"), f = l(e, "i18nWatchedTagText", 7, "Watched tag"), v = l(e, "i18nIgnoredTagText", 7, "Ignored tag"), g = l(e, "i18nModeratorTagText", 7, "Moderator tag"), h = l(e, "i18nRequiredTagText", 7, "Required tag"), m = l(e, "class", 7, ""), _ = l(e, "ondismiss", 7, () => {
  }), w = l(e, "children", 7), p = l(e, "sponsor", 7), b = l(e, "role", 7), C = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "size",
    "variant",
    "href",
    "dismissable",
    "ignored",
    "watched",
    "i18nDismissButtonText",
    "i18nSponsorTagText",
    "i18nWatchedTagText",
    "i18nIgnoredTagText",
    "i18nModeratorTagText",
    "i18nRequiredTagText",
    "class",
    "ondismiss",
    "children",
    "sponsor",
    "role"
  ]), T = (B, F, N, W, O) => {
    const M = "s-tag";
    let U = M;
    const H = [F, N];
    return B && (U += " " + B), H.forEach((S) => {
      S && (U += ` ${M}__${S}`);
    }), W && (U += ` ${M}__ignored`), O && (U += ` ${M}__watched`), U;
  }, P = /* @__PURE__ */ J(() => T(m(), r(), n(), i(), d()));
  var y = {
    get size() {
      return r();
    },
    set size(B = "") {
      r(B), o();
    },
    get variant() {
      return n();
    },
    set variant(B = "") {
      n(B), o();
    },
    get href() {
      return a();
    },
    set href(B) {
      a(B), o();
    },
    get dismissable() {
      return s();
    },
    set dismissable(B = !1) {
      s(B), o();
    },
    get ignored() {
      return i();
    },
    set ignored(B = !1) {
      i(B), o();
    },
    get watched() {
      return d();
    },
    set watched(B = !1) {
      d(B), o();
    },
    get i18nDismissButtonText() {
      return c();
    },
    set i18nDismissButtonText(B = "Dismiss tag") {
      c(B), o();
    },
    get i18nSponsorTagText() {
      return u();
    },
    set i18nSponsorTagText(B = "Sponsored tag") {
      u(B), o();
    },
    get i18nWatchedTagText() {
      return f();
    },
    set i18nWatchedTagText(B = "Watched tag") {
      f(B), o();
    },
    get i18nIgnoredTagText() {
      return v();
    },
    set i18nIgnoredTagText(B = "Ignored tag") {
      v(B), o();
    },
    get i18nModeratorTagText() {
      return g();
    },
    set i18nModeratorTagText(B = "Moderator tag") {
      g(B), o();
    },
    get i18nRequiredTagText() {
      return h();
    },
    set i18nRequiredTagText(B = "Required tag") {
      h(B), o();
    },
    get class() {
      return m();
    },
    set class(B = "") {
      m(B), o();
    },
    get ondismiss() {
      return _();
    },
    set ondismiss(B = () => {
    }) {
      _(B), o();
    },
    get children() {
      return w();
    },
    set children(B) {
      w(B), o();
    },
    get sponsor() {
      return p();
    },
    set sponsor(B) {
      p(B), o();
    },
    get role() {
      return b();
    },
    set role(B) {
      b(B), o();
    }
  }, E = le(), z = K(E);
  return St(z, () => a() && !s() ? "a" : "span", !1, (B, F) => {
    dt(B, () => ({
      class: x(P),
      href: a() && !s() ? a() : void 0,
      role: b() || (a() && !s() ? "link" : void 0),
      ...C
    }));
    var N = W0(), W = K(N);
    {
      var O = ($) => {
        var ie = B0(), he = L(ie);
        {
          var ke = (te) => {
            var fe = N0(), be = L(fe);
            me(be, p), A(fe), k(te, fe);
          };
          V(he, (te) => {
            p() && te(ke);
          });
        }
        var Me = D(he, 2);
        me(Me, w), A(ie), j(() => ae(ie, "href", a())), k($, ie);
      }, M = ($) => {
        var ie = R0(), he = K(ie);
        {
          var ke = (te) => {
            var fe = D0(), be = L(fe);
            me(be, p), A(fe), k(te, fe);
          };
          V(he, (te) => {
            p() && te(ke);
          });
        }
        var Me = D(he, 2);
        me(Me, w), k($, ie);
      };
      V(W, ($) => {
        a() && s() ? $(O) : $(M, !1);
      });
    }
    var U = D(W, 2);
    {
      var H = ($) => {
        var ie = U0(), he = L(ie, !0);
        A(ie), j(() => ee(he, u())), k($, ie);
      };
      V(U, ($) => {
        p() && $(H);
      });
    }
    var S = D(U, 2);
    {
      var I = ($) => {
        var ie = V0(), he = L(ie, !0);
        A(ie), j(() => ee(he, f())), k($, ie);
      };
      V(S, ($) => {
        d() && $(I);
      });
    }
    var q = D(S, 2);
    {
      var Q = ($) => {
        var ie = q0(), he = L(ie, !0);
        A(ie), j(() => ee(he, v())), k($, ie);
      };
      V(q, ($) => {
        i() && $(Q);
      });
    }
    var Z = D(q, 2);
    {
      var ge = ($) => {
        var ie = H0(), he = L(ie, !0);
        A(ie), j(() => ee(he, g())), k($, ie);
      };
      V(Z, ($) => {
        n() === "moderator" && $(ge);
      });
    }
    var ve = D(Z, 2);
    {
      var X = ($) => {
        var ie = F0(), he = L(ie, !0);
        A(ie), j(() => ee(he, h())), k($, ie);
      };
      V(ve, ($) => {
        n() === "required" && $(X);
      });
    }
    var se = D(ve, 2);
    {
      var Y = ($) => {
        var ie = j0();
        ie.__click = function(...te) {
          _()?.apply(this, te);
        };
        var he = L(ie), ke = L(he, !0);
        A(he);
        var Me = D(he);
        Be(Me, {
          get src() {
            return Vh;
          }
        }), A(ie), j(() => ee(ke, c())), k($, ie);
      };
      V(se, ($) => {
        s() && $(Y);
      });
    }
    k(F, N);
  }), k(t, E), de(y);
}
jt(["click"]);
oe(
  Y0,
  {
    size: {},
    variant: {},
    href: {},
    dismissable: {},
    ignored: {},
    watched: {},
    i18nDismissButtonText: {},
    i18nSponsorTagText: {},
    i18nWatchedTagText: {},
    i18nIgnoredTagText: {},
    i18nModeratorTagText: {},
    i18nRequiredTagText: {},
    class: {},
    ondismiss: {},
    children: {},
    sponsor: {},
    role: {}
  },
  [],
  [],
  !0
);
var G0 = /* @__PURE__ */ R('<p class="s-description"><!></p>'), X0 = /* @__PURE__ */ R('<div class="s-input-icon"><!></div>'), K0 = /* @__PURE__ */ R('<p class="s-input-message"><!></p>'), Q0 = /* @__PURE__ */ R('<div><!> <!> <div class="ps-relative w100 d-flex"><textarea></textarea> <!></div> <!></div>');
function Z0(t, e) {
  ue(e, !0);
  let r = l(e, "id", 7), n = l(e, "label", 7), a = l(e, "labelStatus", 7), s = l(e, "labelStatusText", 7), i = l(e, "disabled", 7, !1), d = l(e, "hideLabel", 7, !1), c = l(e, "name", 7, void 0), u = l(e, "placeholder", 7, ""), f = l(e, "readonly", 7, !1), v = l(e, "required", 7, !1), g = l(e, "size", 7, ""), h = l(e, "state", 7, ""), m = l(e, "class", 7, ""), _ = l(e, "i18nRequiredText", 7, void 0), w = l(e, "description", 7), p = l(e, "message", 7), b = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "id",
    "label",
    "labelStatus",
    "labelStatusText",
    "disabled",
    "hideLabel",
    "name",
    "placeholder",
    "readonly",
    "required",
    "size",
    "state",
    "class",
    "i18nRequiredText",
    "description",
    "message"
  ]);
  const C = (S, I) => {
    const q = "s-textarea";
    let Q = q;
    return S && (Q += " " + S), I && (Q += ` ${q}__${I}`), Q;
  };
  let T = /* @__PURE__ */ J(() => C(m(), g()));
  var P = {
    get id() {
      return r();
    },
    set id(S) {
      r(S), o();
    },
    get label() {
      return n();
    },
    set label(S) {
      n(S), o();
    },
    get labelStatus() {
      return a();
    },
    set labelStatus(S) {
      a(S), o();
    },
    get labelStatusText() {
      return s();
    },
    set labelStatusText(S) {
      s(S), o();
    },
    get disabled() {
      return i();
    },
    set disabled(S = !1) {
      i(S), o();
    },
    get hideLabel() {
      return d();
    },
    set hideLabel(S = !1) {
      d(S), o();
    },
    get name() {
      return c();
    },
    set name(S = void 0) {
      c(S), o();
    },
    get placeholder() {
      return u();
    },
    set placeholder(S = "") {
      u(S), o();
    },
    get readonly() {
      return f();
    },
    set readonly(S = !1) {
      f(S), o();
    },
    get required() {
      return v();
    },
    set required(S = !1) {
      v(S), o();
    },
    get size() {
      return g();
    },
    set size(S = "") {
      g(S), o();
    },
    get state() {
      return h();
    },
    set state(S = "") {
      h(S), o();
    },
    get class() {
      return m();
    },
    set class(S = "") {
      m(S), o();
    },
    get i18nRequiredText() {
      return _();
    },
    set i18nRequiredText(S = void 0) {
      _(S), o();
    },
    get description() {
      return w();
    },
    set description(S) {
      w(S), o();
    },
    get message() {
      return p();
    },
    set message(S) {
      p(S), o();
    }
  }, y = Q0();
  let E;
  var z = L(y);
  {
    let S = /* @__PURE__ */ J(() => d() ? "v-visible-sr" : "");
    Gn(z, {
      get id() {
        return r();
      },
      get class() {
        return x(S);
      },
      get size() {
        return g();
      },
      get required() {
        return v();
      },
      get i18nRequiredText() {
        return _();
      },
      get status() {
        return a();
      },
      get statusText() {
        return s();
      },
      children: (I, q) => {
        mt();
        var Q = Ct();
        j(() => ee(Q, n())), k(I, Q);
      },
      $$slots: { default: !0 }
    });
  }
  var B = D(z, 2);
  {
    var F = (S) => {
      var I = G0(), q = L(I);
      me(q, w), A(I), j(() => ae(I, "id", `${r()}-description`)), k(S, I);
    };
    V(B, (S) => {
      w() && S(F);
    });
  }
  var N = D(B, 2), W = L(N);
  ai(W), dt(W, () => ({
    id: r(),
    "aria-describedby": p() ? `${r()}-message` : w() ? `${r()}-description` : void 0,
    "aria-invalid": h() === "error",
    class: x(T),
    disabled: i(),
    name: c(),
    placeholder: u(),
    readonly: f(),
    required: v(),
    ...b
  }));
  var O = D(W, 2);
  {
    var M = (S) => {
      var I = X0(), q = L(I);
      {
        var Q = (ge) => {
          Be(ge, {
            get src() {
              return us;
            }
          });
        }, Z = (ge) => {
          var ve = le(), X = K(ve);
          {
            var se = ($) => {
              Be($, {
                get src() {
                  return ds;
                }
              });
            }, Y = ($) => {
              Be($, {
                get src() {
                  return cs;
                }
              });
            };
            V(
              X,
              ($) => {
                h() === "success" ? $(se) : $(Y, !1);
              },
              !0
            );
          }
          k(ge, ve);
        };
        V(q, (ge) => {
          h() === "error" ? ge(Q) : ge(Z, !1);
        });
      }
      A(I), k(S, I);
    };
    V(O, (S) => {
      h() && S(M);
    });
  }
  A(N);
  var U = D(N, 2);
  {
    var H = (S) => {
      var I = K0(), q = L(I);
      me(q, p), A(I), j(() => ae(I, "id", `${r()}-message`)), k(S, I);
    };
    V(U, (S) => {
      p() && S(H);
    });
  }
  return A(y), j((S) => E = we(y, 1, "s-form-group", null, E, S), [
    () => ({
      "has-error": h() === "error",
      "has-success": h() === "success",
      "has-warning": h() === "warning"
    })
  ]), k(t, y), de(P);
}
oe(
  Z0,
  {
    id: {},
    label: {},
    labelStatus: {},
    labelStatusText: {},
    disabled: {},
    hideLabel: {},
    name: {},
    placeholder: {},
    readonly: {},
    required: {},
    size: {},
    state: {},
    class: {},
    i18nRequiredText: {},
    description: {},
    message: {}
  },
  [],
  [],
  !0
);
var J0 = /* @__PURE__ */ R('<p class="s-description"><!></p>'), $0 = /* @__PURE__ */ R("<div><!></div>"), e_ = /* @__PURE__ */ R("<div><!></div>"), t_ = /* @__PURE__ */ R('<div class="s-input-icon"><!></div>'), r_ = /* @__PURE__ */ R('<p class="s-input-message"><!></p>'), n_ = /* @__PURE__ */ R('<div><!> <!> <div class="d-flex"><!> <div class="ps-relative w100"><!> <input/> <!></div></div> <!></div>');
function a_(t, e) {
  ue(e, !0);
  let r = l(e, "id", 7), n = l(e, "label", 7), a = l(e, "labelStatus", 7), s = l(e, "labelStatusText", 7), i = l(e, "disabled", 7, !1), d = l(e, "hideLabel", 7, !1), c = l(e, "fillSide", 7, "prepend"), u = l(e, "name", 7, void 0), f = l(e, "placeholder", 7, ""), v = l(e, "readonly", 7, !1), g = l(e, "required", 7, !1), h = l(e, "size", 7, ""), m = l(e, "state", 7, ""), _ = l(e, "type", 7, "text"), w = l(e, "class", 7, ""), p = l(e, "i18nRequiredText", 7, void 0), b = l(e, "description", 7), C = l(e, "fill", 7), T = l(e, "message", 7), P = l(e, "value", 15, void 0), y = /* @__PURE__ */ Bt(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "$$host",
    "id",
    "label",
    "labelStatus",
    "labelStatusText",
    "disabled",
    "hideLabel",
    "fillSide",
    "name",
    "placeholder",
    "readonly",
    "required",
    "size",
    "state",
    "type",
    "class",
    "i18nRequiredText",
    "description",
    "fill",
    "message",
    "value"
  ]);
  const E = (Y, $) => {
    const ie = "s-input";
    let he = ie;
    return Y && (he += " " + Y), $ && (he += ` ${ie}__${$}`), he;
  };
  let z = /* @__PURE__ */ J(() => E(w(), h()));
  var B = {
    get id() {
      return r();
    },
    set id(Y) {
      r(Y), o();
    },
    get label() {
      return n();
    },
    set label(Y) {
      n(Y), o();
    },
    get labelStatus() {
      return a();
    },
    set labelStatus(Y) {
      a(Y), o();
    },
    get labelStatusText() {
      return s();
    },
    set labelStatusText(Y) {
      s(Y), o();
    },
    get disabled() {
      return i();
    },
    set disabled(Y = !1) {
      i(Y), o();
    },
    get hideLabel() {
      return d();
    },
    set hideLabel(Y = !1) {
      d(Y), o();
    },
    get fillSide() {
      return c();
    },
    set fillSide(Y = "prepend") {
      c(Y), o();
    },
    get name() {
      return u();
    },
    set name(Y = void 0) {
      u(Y), o();
    },
    get placeholder() {
      return f();
    },
    set placeholder(Y = "") {
      f(Y), o();
    },
    get readonly() {
      return v();
    },
    set readonly(Y = !1) {
      v(Y), o();
    },
    get required() {
      return g();
    },
    set required(Y = !1) {
      g(Y), o();
    },
    get size() {
      return h();
    },
    set size(Y = "") {
      h(Y), o();
    },
    get state() {
      return m();
    },
    set state(Y = "") {
      m(Y), o();
    },
    get type() {
      return _();
    },
    set type(Y = "text") {
      _(Y), o();
    },
    get class() {
      return w();
    },
    set class(Y = "") {
      w(Y), o();
    },
    get i18nRequiredText() {
      return p();
    },
    set i18nRequiredText(Y = void 0) {
      p(Y), o();
    },
    get description() {
      return b();
    },
    set description(Y) {
      b(Y), o();
    },
    get fill() {
      return C();
    },
    set fill(Y) {
      C(Y), o();
    },
    get message() {
      return T();
    },
    set message(Y) {
      T(Y), o();
    },
    get value() {
      return P();
    },
    set value(Y = void 0) {
      P(Y), o();
    }
  }, F = n_();
  let N;
  var W = L(F);
  {
    let Y = /* @__PURE__ */ J(() => d() ? "v-visible-sr" : "");
    Gn(W, {
      get id() {
        return r();
      },
      get class() {
        return x(Y);
      },
      get size() {
        return h();
      },
      get required() {
        return g();
      },
      get i18nRequiredText() {
        return p();
      },
      get status() {
        return a();
      },
      get statusText() {
        return s();
      },
      children: ($, ie) => {
        mt();
        var he = Ct();
        j(() => ee(he, n())), k($, he);
      },
      $$slots: { default: !0 }
    });
  }
  var O = D(W, 2);
  {
    var M = (Y) => {
      var $ = J0(), ie = L($);
      me(ie, b), A($), j(() => ae($, "id", `${r()}-description`)), k(Y, $);
    };
    V(O, (Y) => {
      b() && Y(M);
    });
  }
  var U = D(O, 2), H = L(U);
  {
    var S = (Y) => {
      var $ = $0();
      let ie;
      var he = L($);
      me(he, C), A($), j((ke) => ie = we($, 1, "s-input-fill", null, ie, ke), [
        () => ({
          "order-first": c() === "prepend",
          "order-last": c() === "append"
        })
      ]), k(Y, $);
    };
    V(H, (Y) => {
      C() && Y(S);
    });
  }
  var I = D(H, 2), q = L(I);
  {
    var Q = (Y) => {
      var $ = e_();
      let ie;
      var he = L($);
      {
        let ke = /* @__PURE__ */ J(() => _() === "credit-card" ? Jg : Xh);
        Be(he, {
          get src() {
            return x(ke);
          }
        });
      }
      A($), j((ke) => ie = we($, 1, "s-input-icon", null, ie, ke), [
        () => ({
          "s-input-icon__creditcard": _() === "credit-card",
          "s-input-icon__search": _() === "search"
        })
      ]), k(Y, $);
    };
    V(q, (Y) => {
      (_() === "search" || _() === "credit-card") && Y(Q);
    });
  }
  var Z = D(q, 2);
  dt(
    Z,
    (Y) => ({
      id: r(),
      "aria-describedby": T() ? `${r()}-message` : b() ? `${r()}-description` : void 0,
      "aria-invalid": m() === "error",
      class: x(z),
      type: _() === "credit-card" ? "text" : _(),
      disabled: i(),
      name: u(),
      placeholder: f(),
      readonly: v(),
      required: g(),
      ...y,
      [an]: Y
    }),
    [
      () => ({
        "s-input__creditcard": _() === "credit-card",
        "s-input__search": _() === "search",
        blr0: C() && c() === "prepend",
        brr0: C() && c() === "append"
      })
    ],
    void 0,
    void 0,
    !0
  );
  var ge = D(Z, 2);
  {
    var ve = (Y) => {
      var $ = t_(), ie = L($);
      {
        var he = (Me) => {
          Be(Me, {
            get src() {
              return us;
            }
          });
        }, ke = (Me) => {
          var te = le(), fe = K(te);
          {
            var be = (Ve) => {
              Be(Ve, {
                get src() {
                  return ds;
                }
              });
            }, Oe = (Ve) => {
              Be(Ve, {
                get src() {
                  return cs;
                }
              });
            };
            V(
              fe,
              (Ve) => {
                m() === "success" ? Ve(be) : Ve(Oe, !1);
              },
              !0
            );
          }
          k(Me, te);
        };
        V(ie, (Me) => {
          m() === "error" ? Me(he) : Me(ke, !1);
        });
      }
      A($), k(Y, $);
    };
    V(ge, (Y) => {
      m() && Y(ve);
    });
  }
  A(I), A(U);
  var X = D(U, 2);
  {
    var se = (Y) => {
      var $ = r_(), ie = L($);
      me(ie, T), A($), j(() => ae($, "id", `${r()}-message`)), k(Y, $);
    };
    V(X, (Y) => {
      T() && Y(se);
    });
  }
  return A(F), j((Y) => N = we(F, 1, "s-form-group", null, N, Y), [
    () => ({
      "has-error": m() === "error",
      "has-success": m() === "success",
      "has-warning": m() === "warning"
    })
  ]), fi(Z, P), k(t, F), de(B);
}
oe(
  a_,
  {
    id: {},
    label: {},
    labelStatus: {},
    labelStatusText: {},
    disabled: {},
    hideLabel: {},
    fillSide: {},
    name: {},
    placeholder: {},
    readonly: {},
    required: {},
    size: {},
    state: {},
    type: {},
    class: {},
    i18nRequiredText: {},
    description: {},
    fill: {},
    message: {},
    value: {}
  },
  [],
  [],
  !0
);
function s_(t, e) {
  ue(e, !1), Wt(), mi(t, {
    position: "top-center",
    class: "wmn6 sm:wmn-initial",
    style: "z-index: calc(var(--zi-modals) + 1); top: calc(var(--theme-topbar-height, calc(var(--su48) + var(--su8))) + var(--su16))"
  }), de();
}
oe(s_, {}, [], [], !0);
var i_ = /* @__PURE__ */ R("<!> <!>", 1), o_ = /* @__PURE__ */ R("<li><!></li>");
function l_(t, e) {
  ue(e, !0);
  const r = l(e, "type", 7), n = l(e, "tooltip", 7);
  var a = {
    get type() {
      return r();
    },
    set type(u) {
      r(u), o();
    },
    get tooltip() {
      return n();
    },
    set tooltip(u) {
      n(u), o();
    }
  }, s = o_(), i = L(s);
  {
    var d = (u) => {
      ca(u, {
        id: "user-card-badge-new-popover",
        tooltip: !0,
        children: (f, v) => {
          var g = i_(), h = K(g);
          da(h, {
            children: (_, w) => {
              la(_, {
                get text() {
                  return r();
                },
                type: "user",
                get userType() {
                  return r();
                },
                size: "sm"
              });
            },
            $$slots: { default: !0 }
          });
          var m = D(h, 2);
          ua(m, {
            children: (_, w) => {
              var p = le(), b = K(p);
              me(b, n), k(_, p);
            },
            $$slots: { default: !0 }
          }), k(f, g);
        },
        $$slots: { default: !0 }
      });
    }, c = (u) => {
      la(u, {
        get text() {
          return r();
        },
        type: "user",
        get userType() {
          return r();
        },
        size: "sm"
      });
    };
    V(i, (u) => {
      n() ? u(d) : u(c, !1);
    });
  }
  return A(s), k(t, s), de(a);
}
oe(l_, { type: {}, tooltip: {} }, [], [], !0);
var c_ = /* @__PURE__ */ R('<span class="s-vote--upvotes"> </span>'), u_ = /* @__PURE__ */ R('<span class="s-vote--downvotes"> </span>'), d_ = /* @__PURE__ */ R('<span class="v-visible-sr"> </span>'), f_ = /* @__PURE__ */ R('<!> <span class="s-vote--total"> </span> <!> <!>', 1), v_ = /* @__PURE__ */ R('<!> <span class="v-visible-sr"> </span>', 1), g_ = /* @__PURE__ */ R('<!> <span class="v-visible-sr"> </span>', 1), h_ = /* @__PURE__ */ R('<!> <span class="v-visible-sr"> </span>', 1), m_ = /* @__PURE__ */ R('<!> <span class="v-visible-sr"> </span>', 1), __ = /* @__PURE__ */ R('<!> <button class="s-vote--btn"><!></button>', 1), b_ = /* @__PURE__ */ R('<div><button class="s-vote--btn"><!> <!></button> <!></div>');
function p_(t, e) {
  ue(e, !0);
  const r = (S) => {
    var I = le(), q = K(I);
    St(q, () => x(P) ? "button" : "span", !1, (Q, Z) => {
      var ge = () => x(P) ? _e(T, !x(T)) : null;
      dt(Q, () => ({
        class: "s-vote--votes",
        role: x(P) ? "button" : void 0,
        onclick: ge
      }));
      var ve = f_(), X = K(ve);
      {
        var se = (te) => {
          var fe = c_(), be = L(fe);
          A(fe), j((Oe) => ee(be, `+${Oe ?? ""}`), [() => fr(a(), 1e3)]), k(te, fe);
        };
        V(X, (te) => {
          a() !== void 0 && te(se);
        });
      }
      var Y = D(X, 2), $ = L(Y, !0);
      A(Y);
      var ie = D(Y, 2);
      {
        var he = (te) => {
          var fe = u_(), be = L(fe);
          A(fe), j((Oe) => ee(be, `-${Oe ?? ""}`), [() => fr(s(), 1e3)]), k(te, fe);
        };
        V(ie, (te) => {
          s() !== void 0 && te(he);
        });
      }
      var ke = D(ie, 2);
      {
        var Me = (te) => {
          var fe = d_(), be = L(fe, !0);
          A(fe), j(() => ee(be, x(T) ? _() : m())), k(te, fe);
        };
        V(ke, (te) => {
          x(P) && te(Me);
        });
      }
      j((te) => ee($, te), [
        () => n() !== 0 ? fr(n(), 1e3) : u()
      ]), k(Z, ve);
    }), k(S, I);
  }, n = l(e, "total", 7), a = l(e, "upvotes", 7), s = l(e, "downvotes", 7), i = l(e, "horizontal", 7), d = l(e, "upvoteOnly", 7, !1), c = l(e, "status", 7, null), u = l(e, "i18nVote", 7, "Vote"), f = l(e, "i18nUpvote", 7, "Upvote"), v = l(e, "i18nUpvoted", 7, "Upvoted"), g = l(e, "i18nDownvote", 7, "Downvote"), h = l(e, "i18nDownvoted", 7, "Downvoted"), m = l(e, "i18nExpand", 7, "Show vote details"), _ = l(e, "i18nExpanded", 7, "Hide vote details"), w = l(e, "onupvoteclick", 7, () => {
  }), p = l(e, "ondownvoteclick", 7, () => {
  }), b = l(e, "class", 7, ""), C = (S, I, q) => {
    let Q = "s-vote";
    return S && (Q += " " + S), I && (Q += " s-vote__expanded"), q && (Q += " s-vote__horizontal"), Q;
  };
  let T = /* @__PURE__ */ Ye(!1), P = /* @__PURE__ */ J(() => a() !== void 0 && s() !== void 0 && !i());
  const y = /* @__PURE__ */ J(() => C(b(), x(T), i()));
  var E = {
    get total() {
      return n();
    },
    set total(S) {
      n(S), o();
    },
    get upvotes() {
      return a();
    },
    set upvotes(S) {
      a(S), o();
    },
    get downvotes() {
      return s();
    },
    set downvotes(S) {
      s(S), o();
    },
    get horizontal() {
      return i();
    },
    set horizontal(S) {
      i(S), o();
    },
    get upvoteOnly() {
      return d();
    },
    set upvoteOnly(S = !1) {
      d(S), o();
    },
    get status() {
      return c();
    },
    set status(S = null) {
      c(S), o();
    },
    get i18nVote() {
      return u();
    },
    set i18nVote(S = "Vote") {
      u(S), o();
    },
    get i18nUpvote() {
      return f();
    },
    set i18nUpvote(S = "Upvote") {
      f(S), o();
    },
    get i18nUpvoted() {
      return v();
    },
    set i18nUpvoted(S = "Upvoted") {
      v(S), o();
    },
    get i18nDownvote() {
      return g();
    },
    set i18nDownvote(S = "Downvote") {
      g(S), o();
    },
    get i18nDownvoted() {
      return h();
    },
    set i18nDownvoted(S = "Downvoted") {
      h(S), o();
    },
    get i18nExpand() {
      return m();
    },
    set i18nExpand(S = "Show vote details") {
      m(S), o();
    },
    get i18nExpanded() {
      return _();
    },
    set i18nExpanded(S = "Hide vote details") {
      _(S), o();
    },
    get onupvoteclick() {
      return w();
    },
    set onupvoteclick(S = () => {
    }) {
      w(S), o();
    },
    get ondownvoteclick() {
      return p();
    },
    set ondownvoteclick(S = () => {
    }) {
      p(S), o();
    },
    get class() {
      return b();
    },
    set class(S = "") {
      b(S), o();
    }
  }, z = b_(), B = L(z);
  B.__click = function(...S) {
    w()?.apply(this, S);
  };
  var F = L(B);
  {
    var N = (S) => {
      var I = v_(), q = K(I);
      Be(q, {
        get src() {
          return Jh;
        }
      });
      var Q = D(q, 2), Z = L(Q, !0);
      A(Q), j(() => ee(Z, v())), k(S, I);
    }, W = (S) => {
      var I = g_(), q = K(I);
      Be(q, {
        get src() {
          return Mi;
        }
      });
      var Q = D(q, 2), Z = L(Q, !0);
      A(Q), j(() => ee(Z, f())), k(S, I);
    };
    V(F, (S) => {
      c() === "upvoted" ? S(N) : S(W, !1);
    });
  }
  var O = D(F, 2);
  {
    var M = (S) => {
      r(S);
    };
    V(O, (S) => {
      d() && S(M);
    });
  }
  A(B);
  var U = D(B, 2);
  {
    var H = (S) => {
      var I = __(), q = K(I);
      r(q);
      var Q = D(q, 2);
      Q.__click = function(...X) {
        p()?.apply(this, X);
      };
      var Z = L(Q);
      {
        var ge = (X) => {
          var se = h_(), Y = K(se);
          Be(Y, {
            get src() {
              return Zh;
            }
          });
          var $ = D(Y, 2), ie = L($, !0);
          A($), j(() => ee(ie, h())), k(X, se);
        }, ve = (X) => {
          var se = m_(), Y = K(se);
          Be(Y, {
            get src() {
              return Qh;
            }
          });
          var $ = D(Y, 2), ie = L($, !0);
          A($), j(() => ee(ie, g())), k(X, se);
        };
        V(Z, (X) => {
          c() === "downvoted" ? X(ge) : X(ve, !1);
        });
      }
      A(Q), k(S, I);
    };
    V(U, (S) => {
      d() || S(H);
    });
  }
  return A(z), j(() => we(z, 1, Ae(x(y)))), k(t, z), de(E);
}
jt(["click"]);
oe(
  p_,
  {
    total: {},
    upvotes: {},
    downvotes: {},
    horizontal: {},
    upvoteOnly: {},
    status: {},
    i18nVote: {},
    i18nUpvote: {},
    i18nUpvoted: {},
    i18nDownvote: {},
    i18nDownvoted: {},
    i18nExpand: {},
    i18nExpanded: {},
    onupvoteclick: {},
    ondownvoteclick: {},
    class: {}
  },
  [],
  [],
  !0
);
var w_ = (t, e, r) => e(t, x(r)), y_ = /* @__PURE__ */ R('<a class="s-tag"> </a>'), x_ = /* @__PURE__ */ R('<div class="s-sidebarwidget mt32"><div class="s-sidebarwidget--header"><h2><!> <span class="ml4">Popular tags</span></h2></div> <div class="s-sidebarwidget--content d-flex g8 fw-wrap"></div></div>');
function Oc(t, e) {
  ue(e, !0);
  const r = l(e, "tags", 7), n = l(e, "baseUrl", 7);
  function a(g) {
    Rn(new ls("popular-tags", g));
  }
  function s(g, h) {
    (g.button === 0 || g.button === 1) && a(Er(h));
  }
  var i = {
    get tags() {
      return r();
    },
    set tags(g) {
      r(g), o();
    },
    get baseUrl() {
      return n();
    },
    set baseUrl(g) {
      n(g), o();
    }
  }, d = x_(), c = L(d), u = L(c), f = L(u);
  Be(f, {
    get src() {
      return Vg;
    },
    title: "Popular tags"
  }), mt(2), A(u), A(c);
  var v = D(c, 2);
  return Pr(v, 21, r, $a, (g, h) => {
    var m = y_();
    m.__mouseup = [w_, s, h];
    var _ = L(m, !0);
    A(m), j(
      (w) => {
        ae(m, "href", `${n()}questions/tagged/${x(h)}`), ee(_, w);
      },
      [() => Er(x(h))]
    ), k(g, m);
  }), A(v), A(d), k(t, d), de(i);
}
jt(["mouseup"]);
oe(Oc, { tags: {}, baseUrl: {} }, [], [], !0);
var T_ = /* @__PURE__ */ R("<!> <!>", 1), k_ = /* @__PURE__ */ R(`<div class="s-sidebarwidget s-anchors pb12"><div class="s-sidebarwidget--content s-sidebarwidget__items"><div class="s-empty-state wmx4 my16 d-flex gx16"><div class="flex--item"><!></div> <div class="flex--item ta-left"><p class="fs-body2">Could not load activity</p> <p>We're unable to load activity right now. Please check back shortly.</p></div></div></div></div>`), C_ = /* @__PURE__ */ R('<div class="s-sidebarwidget s-anchors pb12"><div class="s-sidebarwidget--content s-sidebarwidget__items"><!></div></div>');
function S_(t, e) {
  ue(e, !1);
  const n = new URL(window.location.toString()).searchParams.get("timeFrame") || "PT1H", a = "https://beta.stackoverflow.com/";
  Wt();
  var s = le(), i = K(s);
  _l(
    i,
    () => _c.getHeartbeat(n),
    (d) => {
      var c = C_(), u = L(c), f = L(u);
      gi(f, {}), A(u), A(c), k(d, c);
    },
    (d, c) => {
      var u = T_(), f = K(u);
      {
        var v = (m) => {
          {
            let _ = /* @__PURE__ */ Gt(() => x(c).popularTags || []);
            Oc(m, {
              get tags() {
                return x(_);
              },
              baseUrl: a
            });
          }
        };
        V(f, (m) => {
          x(c).popularTags && x(c).popularTags.length > 0 && m(v);
        });
      }
      var g = D(f, 2);
      {
        var h = (m) => {
          wc(m, {
            get question() {
              return x(c).popularUnansweredQuestion;
            },
            baseUrl: a
          });
        };
        V(g, (m) => {
          x(c).popularUnansweredQuestion !== null && m(h);
        });
      }
      k(d, u);
    },
    (d) => {
      var c = k_(), u = L(c), f = L(u), v = L(f), g = L(v);
      Ke(g, {
        get src() {
          return vc;
        }
      }), A(v), mt(2), A(f), A(u), A(c), k(d, c);
    }
  ), k(t, s), de();
}
oe(S_, {}, [], [], !1);
export {
  Rg as LivelinessCard,
  S_ as Shine_PopularWidgets
};
//# sourceMappingURL=stackheartbeat-module.CsTm_aGn.js.map
