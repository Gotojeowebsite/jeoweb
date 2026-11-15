const we = /* @__PURE__ */ new WeakSet(), ps = ["uri", "targetUri", "refUri", "referrerUri", "referrerUrl", "url", "pageUrl"], fs = /[A-Z0-9._%+-]+(?:@|%40|%2540)[A-Z0-9%-]+(?:(?:\.|%2E|%252E)[A-Z0-9%-]+)+/gi, gs = /([?&#])([^=&#]+)=([^&#]*)/g;
function ms(s) {
  return s.replace(gs, (t, e, i) => {
    let r = i;
    for (let o = 0; o < 3; o++)
      r = r.replace(/%([0-9a-f]{2})/gi, (n, a) => String.fromCharCode(parseInt(a, 16)));
    return r.toLowerCase() === "username" ? `${e}${i}=REDACTED` : t;
  }).replace(fs, "REDACTED");
}
function bs(s) {
  return typeof s == "object" && s !== null;
}
function _e(s) {
  if (bs(s))
    for (const t of ps) {
      const e = s[t];
      typeof e == "string" && (s[t] = ms(e));
    }
}
function vs(s) {
  _e(s.baseData), _e(s.data);
}
function Cs(s) {
  we.has(s) || (s.addTelemetryInitializer(vs), we.add(s));
}
function ys(s) {
  return typeof s == "object" && s !== null && "addTelemetryInitializer" in s && typeof s.addTelemetryInitializer == "function";
}
function ze() {
  var e;
  const t = (e = window.telemetry) == null ? void 0 : e.webAnalyticsPlugin;
  return ys(t) ? (Cs(t), !0) : !1;
}
function We() {
  return ze() ? !0 : (console.info("UHF: URL telemetry redaction is not registered. The host must call window.registerUhfTelemetryRedaction() after 1DS initialization and before sending events."), !1);
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = globalThis, ae = Ut.ShadowRoot && (Ut.ShadyCSS === void 0 || Ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ve = Symbol(), Se = /* @__PURE__ */ new WeakMap();
let ws = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ae && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Se.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Se.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _s = (s) => new ws(typeof s == "string" ? s : s + "", void 0, Ve), Ss = (s, t) => {
  if (ae) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = Ut.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, $e = ae ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return _s(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $s, defineProperty: As, getOwnPropertyDescriptor: Es, getOwnPropertyNames: xs, getOwnPropertySymbols: Ts, getPrototypeOf: Os } = Object, B = globalThis, Ae = B.trustedTypes, Ls = Ae ? Ae.emptyScript : "", Jt = B.reactiveElementPolyfillSupport, ft = (s, t) => s, Dt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Ls : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, le = (s, t) => !$s(s, t), Ee = { attribute: !0, type: String, converter: Dt, reflect: !1, useDefault: !1, hasChanged: le };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), B.litPropertyMetadata ?? (B.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let et = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ee) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && As(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = Es(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const a = r == null ? void 0 : r.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ee;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ft("elementProperties"))) return;
    const t = Os(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ft("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ft("properties"))) {
      const e = this.properties, i = [...xs(e), ...Ts(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift($e(r));
    } else t !== void 0 && e.push($e(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ss(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Dt).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Dt;
      this._$Em = r;
      const c = l.fromAttribute(e, a.type);
      this[r] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, o) {
    var n;
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? le)(o, e) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, n] of r) {
        const { wrapped: a } = n, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, n, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
et.elementStyles = [], et.shadowRootOptions = { mode: "open" }, et[ft("elementProperties")] = /* @__PURE__ */ new Map(), et[ft("finalized")] = /* @__PURE__ */ new Map(), Jt == null || Jt({ ReactiveElement: et }), (B.reactiveElementVersions ?? (B.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis, xe = (s) => s, kt = gt.trustedTypes, Te = kt ? kt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ke = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, Je = "?" + N, Ps = `<${Je}>`, W = document, mt = () => W.createComment(""), bt = (s) => s === null || typeof s != "object" && typeof s != "function", he = Array.isArray, Is = (s) => he(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Qt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oe = /-->/g, Le = />/g, q = RegExp(`>|${Qt}(?:([^\\s"'>=/]+)(${Qt}*=${Qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pe = /'/g, Ie = /"/g, Qe = /^(?:script|style|textarea|title)$/i, Us = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), u = Us(1), rt = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), G = W.createTreeWalker(W, 129);
function Ye(s, t) {
  if (!he(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Te !== void 0 ? Te.createHTML(t) : t;
}
const Ds = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = pt;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let c, p, d = -1, b = 0;
    for (; b < l.length && (n.lastIndex = b, p = n.exec(l), p !== null); ) b = n.lastIndex, n === pt ? p[1] === "!--" ? n = Oe : p[1] !== void 0 ? n = Le : p[2] !== void 0 ? (Qe.test(p[2]) && (r = RegExp("</" + p[2], "g")), n = q) : p[3] !== void 0 && (n = q) : n === q ? p[0] === ">" ? (n = r ?? pt, d = -1) : p[1] === void 0 ? d = -2 : (d = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? q : p[3] === '"' ? Ie : Pe) : n === Ie || n === Pe ? n = q : n === Oe || n === Le ? n = pt : (n = q, r = void 0);
    const v = n === q && s[a + 1].startsWith("/>") ? " " : "";
    o += n === pt ? l + Ps : d >= 0 ? (i.push(c), l.slice(0, d) + Ke + l.slice(d) + N + v) : l + N + (d === -2 ? a : v);
  }
  return [Ye(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class vt {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const a = t.length - 1, l = this.parts, [c, p] = Ds(t, e);
    if (this.el = vt.createElement(c, i), G.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = G.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Ke)) {
          const b = p[n++], v = r.getAttribute(d).split(N), E = /([.?@])?(.*)/.exec(b);
          l.push({ type: 1, index: o, name: E[2], strings: v, ctor: E[1] === "." ? Ns : E[1] === "?" ? Bs : E[1] === "@" ? Ms : qt }), r.removeAttribute(d);
        } else d.startsWith(N) && (l.push({ type: 6, index: o }), r.removeAttribute(d));
        if (Qe.test(r.tagName)) {
          const d = r.textContent.split(N), b = d.length - 1;
          if (b > 0) {
            r.textContent = kt ? kt.emptyScript : "";
            for (let v = 0; v < b; v++) r.append(d[v], mt()), G.nextNode(), l.push({ type: 2, index: ++o });
            r.append(d[b], mt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Je) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(N, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += N.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = W.createElement("template");
    return i.innerHTML = t, i;
  }
}
function it(s, t, e = s, i) {
  var n, a;
  if (t === rt) return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = bt(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = it(s, r._$AS(s, t.values), r, i)), t;
}
class ks {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? W).importNode(e, !0);
    G.currentNode = r;
    let o = G.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let c;
        l.type === 2 ? c = new $t(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Rs(o, this, t)), this._$AV.push(c), l = i[++a];
      }
      n !== (l == null ? void 0 : l.index) && (o = G.nextNode(), n++);
    }
    return G.currentNode = W, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class $t {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = it(this, t, e), bt(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Is(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(W.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = vt.createElement(Ye(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const n = new ks(r, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Ue.get(t.strings);
    return e === void 0 && Ue.set(t.strings, e = new vt(t)), e;
  }
  k(t) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new $t(this.O(mt()), this.O(mt()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = xe(t).nextSibling;
      xe(t).remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class qt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = C;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = it(this, t, e, 0), n = !bt(t) || t !== this._$AH && t !== rt, n && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = it(this, a[i + l], e, l), c === rt && (c = this._$AH[l]), n || (n = !bt(c) || c !== this._$AH[l]), c === C ? t = C : t !== C && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ns extends qt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
}
class Bs extends qt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class Ms extends qt {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = it(this, t, e, 0) ?? C) === rt) return;
    const i = this._$AH, r = t === C && i !== C || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== C && (i === C || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Rs {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    it(this, t);
  }
}
const Yt = gt.litHtmlPolyfillSupport;
Yt == null || Yt(vt, $t), (gt.litHtmlVersions ?? (gt.litHtmlVersions = [])).push("3.3.3");
const Hs = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new $t(t.insertBefore(mt(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis;
class st extends et {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Hs(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return rt;
  }
}
var je;
st._$litElement$ = !0, st.finalized = !0, (je = z.litElementHydrateSupport) == null || je.call(z, { LitElement: st });
const Zt = z.litElementPolyfillSupport;
Zt == null || Zt({ LitElement: st });
(z.litElementVersions ?? (z.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const g = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fs = { attribute: !0, type: String, converter: Dt, reflect: !1, hasChanged: le }, qs = (s = Fs, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(n, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(n, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(a) {
      const l = this[n];
      t.call(this, a), this.requestUpdate(n, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function h(s) {
  return (t, e) => typeof e == "object" ? qs(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(s) {
  return h({ ...s, state: !0, attribute: !1 });
}
const w = [];
for (let s = 0; s < 256; ++s)
  w.push((s + 256).toString(16).slice(1));
function Gs(s, t = 0) {
  return (w[s[t + 0]] + w[s[t + 1]] + w[s[t + 2]] + w[s[t + 3]] + "-" + w[s[t + 4]] + w[s[t + 5]] + "-" + w[s[t + 6]] + w[s[t + 7]] + "-" + w[s[t + 8]] + w[s[t + 9]] + "-" + w[s[t + 10]] + w[s[t + 11]] + w[s[t + 12]] + w[s[t + 13]] + w[s[t + 14]] + w[s[t + 15]]).toLowerCase();
}
let Xt;
const js = new Uint8Array(16);
function zs() {
  if (!Xt) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Xt = crypto.getRandomValues.bind(crypto);
  }
  return Xt(js);
}
const Ws = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), De = { randomUUID: Ws };
function Vs(s, t, e) {
  var r;
  if (De.randomUUID && !s)
    return De.randomUUID();
  s = s || {};
  const i = s.random ?? ((r = s.rng) == null ? void 0 : r.call(s)) ?? zs();
  if (i.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, Gs(i);
}
class Gt {
  constructor() {
    this.subscribers = /* @__PURE__ */ new Map();
  }
  subscribe(t) {
    const e = Vs();
    return this.subscribers.set(e, t), e;
  }
  unsubscribe(t) {
    this.subscribers.delete(t);
  }
  notify(t) {
    for (const e of this.subscribers.values())
      e(t);
  }
}
class Ks extends Gt {
  // Default breakpoint
  constructor() {
    super(), this.currentBreakpoint = "desktop", this.setupObserver();
  }
  setupObserver() {
    "ResizeObserver" in globalThis ? (this.resizeObserver = new ResizeObserver(() => {
      this.calculateBreakpoint();
    }), this.resizeObserver.observe(document.body)) : window.addEventListener("resize", () => this.calculateBreakpoint()), this.calculateBreakpoint();
  }
  calculateBreakpoint() {
    const t = window.innerWidth;
    let e = this.currentBreakpoint;
    t < 860 ? this.currentBreakpoint = "mobile" : this.currentBreakpoint = "desktop", e !== this.currentBreakpoint && this.notify(this.currentBreakpoint);
  }
  get breakpoint() {
    return this.currentBreakpoint;
  }
  get isMobile() {
    return this.currentBreakpoint === "mobile";
  }
}
const Ot = new Ks();
var _ = /* @__PURE__ */ ((s) => (s.BREAKPOINT_CHANGED = "BreakpointEvents/BREAKPOINT_CHANGED", s))(_ || {});
class x {
  constructor(t, e = !1) {
    this.id = "", this.breakpointPrefix = "uhf-breakpoint--", this.host = t, this.host.addController(this), this.addClassesToHost = e;
  }
  hostConnected() {
    this.addClassesToHost && this.host.updateComplete.then(() => {
      this.host.classList.add(this.getBreakpointClasses());
    }), this.id = Ot.subscribe(() => {
      this.addClassesToHost && (Array.from(this.host.classList).filter((t) => t.startsWith(this.breakpointPrefix)).forEach((t) => this.host.classList.remove(t)), this.host.classList.add(this.getBreakpointClasses())), this.host.dispatchEvent(new CustomEvent("BreakpointEvents/BREAKPOINT_CHANGED", {
        detail: { breakpoint: this.breakpoint, isMobile: this.isMobile },
        bubbles: !1
      }));
    });
  }
  hostDisconnected() {
    Ot.unsubscribe(this.id);
  }
  // Public API
  get isMobile() {
    return Ot.isMobile;
  }
  get breakpoint() {
    return Ot.breakpoint;
  }
  getBreakpointClasses() {
    return `${this.breakpointPrefix}${this.breakpoint}`;
  }
}
const Js = 0.1, Lt = 256, Qs = 2048, Pt = /^[A-Za-z0-9_.-]+$/, It = {
  partnerId: "x-uhf-partner-id",
  headerId: "x-uhf-header-id",
  footerId: "x-uhf-footer-id",
  siteURL: "x-uhf-site-url"
};
function Ys() {
  return Js;
}
function Zs() {
  try {
    return typeof location > "u" ? "" : location.href;
  } catch {
    return "";
  }
}
class Xs {
  constructor(t = Ys(), e = () => Math.random()) {
    this.sourceSampleRate = t, this.random = e;
  }
  createSampledHeaders(t = document, e = Zs()) {
    if (this.sourceSampleRate === 0 || this.random() >= this.sourceSampleRate)
      return null;
    let i;
    try {
      i = this.readContext(t, e);
    } catch {
      return null;
    }
    if (!i)
      return null;
    const r = {
      [It.partnerId]: i.partnerId,
      [It.siteURL]: i.siteURL
    };
    return i.headerId && (r[It.headerId] = i.headerId), i.footerId && (r[It.footerId] = i.footerId), r;
  }
  readContext(t, e) {
    const i = t.querySelector("uhf-header"), r = t.querySelector("uhf-footer"), o = this.readAttribute(i, "partnerid", Lt, Pt), n = this.readAttribute(r, "partnerid", Lt, Pt);
    if (o === null || n === null || o && n && o !== n)
      return null;
    const a = o ?? n, l = this.readAttribute(i, "headerid", Lt, Pt) ?? void 0, c = this.readAttribute(r, "footerid", Lt, Pt) ?? void 0;
    if (!a)
      return null;
    const p = this.sanitizeSiteUrl(e);
    return p ? {
      partnerId: a,
      headerId: l,
      footerId: c,
      siteURL: p
    } : null;
  }
  sanitizeSiteUrl(t) {
    try {
      const e = new URL(t);
      if (e.protocol !== "https:" && e.protocol !== "http:" || e.username || e.password)
        return;
      const i = e.pathname === "/" ? "" : e.pathname.replace(/\/+$/, "");
      return this.validateValue(`${e.origin}${i}`, Qs);
    } catch {
      return;
    }
  }
  readAttribute(t, e, i, r) {
    const o = t == null ? void 0 : t.getAttribute(e);
    if (o == null)
      return;
    const n = this.validateValue(o, i);
    return n && r.test(n) ? n : null;
  }
  validateValue(t, e) {
    const i = t == null ? void 0 : t.trim();
    if (!(!i || i.length > e || /[\u0000-\u001f\u007f]/.test(i)))
      return i;
  }
}
const tr = new Xs(), te = "uhf-tas-cache", Ze = 1, er = 6e5;
function sr() {
  const t = Number("600000");
  return !Number.isFinite(t) || t < 0 ? er : t;
}
function rr(s) {
  if (!s || typeof s != "object") return !1;
  const t = s;
  return !(t.v !== Ze || typeof t.writtenAt != "number" || !Number.isFinite(t.writtenAt) || t.writtenAt <= 0 || !t.payload || typeof t.payload != "object");
}
class ir {
  constructor(t = sr()) {
    this.ttlMs = t;
  }
  read(t = Date.now()) {
    if (this.ttlMs === 0) return null;
    let e;
    try {
      e = localStorage.getItem(te);
    } catch {
      return null;
    }
    if (e === null) return null;
    let i;
    try {
      i = JSON.parse(e);
    } catch {
      return null;
    }
    return !rr(i) || t < i.writtenAt || t - i.writtenAt > this.ttlMs ? null : i.payload;
  }
  write(t, e = Date.now()) {
    if (this.ttlMs === 0) return;
    const i = { v: Ze, writtenAt: e, payload: t };
    let r;
    try {
      r = JSON.stringify(i);
    } catch (o) {
      const n = o instanceof Error ? o.message : String(o);
      console.error("Unable to serialize UHF assignment cache entry: " + n);
      return;
    }
    try {
      localStorage.setItem(te, r);
    } catch (o) {
      const n = o instanceof Error ? o.message : String(o);
      console.error("Unable to write UHF assignment cache entry: " + n);
    }
  }
  clear() {
    try {
      localStorage.removeItem(te);
    } catch {
    }
  }
}
const ke = new ir();
var $ = /* @__PURE__ */ ((s) => (s.LIGHT = "light", s.DARK = "dark", s))($ || {}), Ct = /* @__PURE__ */ ((s) => (s.RTL = "rtl", s.LTR = "ltr", s))(Ct || {});
class or extends Gt {
  constructor(t = !0) {
    super(), this.tasEnabled = t, this.mutationObserver = null, this.context = {
      headerTheme: "light",
      footerTheme: "light",
      alignment: this.getInitialAlignment(),
      assignment: void 0,
      locale: "en-us"
    }, this.fetchTasAssignment(), this.watchHtmlDirection();
  }
  getInitialAlignment() {
    const t = document.documentElement;
    return (t.getAttribute("dir") || t.dir || "ltr").toLowerCase() === "rtl" ? "rtl" : "ltr";
  }
  watchHtmlDirection() {
    const t = document.documentElement;
    this.mutationObserver = new MutationObserver((e) => {
      e.forEach((i) => {
        if (i.type === "attributes" && i.attributeName === "dir") {
          const r = this.getInitialAlignment();
          this.context.alignment !== r && this.updateContext({ alignment: r });
        }
      });
    }), this.mutationObserver.observe(t, {
      attributes: !0,
      attributeFilter: ["dir"]
    });
  }
  updateContext(t) {
    const e = { ...this.context };
    this.context = { ...this.context, ...t }, JSON.stringify(e) !== JSON.stringify(this.context) && this.notify(t);
  }
  getContext() {
    return this.context;
  }
  async fetchTasAssignment() {
    if (!this.tasEnabled)
      return;
    let t = "x-exp-clientid";
    const e = ke.read();
    if (e) {
      this.updateContext({ assignment: e });
      return;
    }
    try {
      const i = {
        "Content-Type": "application/json",
        ...tr.createSampledHeaders()
      }, r = localStorage.getItem(t);
      r && (i["x-exp-clientid"] = r);
      let o = await fetch("https://uhf-exp-fd-gbcrdgggfbggh0g3.b02.azurefd.net/api/v1/tas", {
        method: "GET",
        headers: i
      });
      if (!o.ok)
        throw new Error(`Error: ${o.status} ${o.statusText}`);
      const n = await o.json();
      !r && n.clientId && localStorage.setItem(t, n.clientId), ke.write(n), this.updateContext({ assignment: n });
    } catch (i) {
      console.error("Unable to fetch UHF assignment: " + i.message);
    }
  }
}
const Xe = new or();
class H {
  constructor(t) {
    this.host = t, this.host.addController(this), this.contextService = Xe;
  }
  hostConnected() {
    this.id = this.contextService.subscribe(this.onContextChanged.bind(this));
  }
  hostDisconnected() {
    this.id && this.contextService.unsubscribe(this.id);
  }
  onContextChanged(t) {
    this.host.dispatchEvent(new CustomEvent("ContextEvents/CONTEXT_CHANGED", {
      detail: t,
      bubbles: !1
    }));
  }
  setContext(t) {
    this.contextService.updateContext(t);
  }
  getAlignmentClasses() {
    return `uhf-alignment--${this.alignment}`;
  }
  get alignment() {
    return this.contextService.getContext().alignment || Ct.LTR;
  }
  get locale() {
    return this.contextService.getContext().locale || "en-us";
  }
  getLocaleLabel() {
    return ((this.locale ?? "").trim().split(/[-_]/)[0] || "en").toUpperCase();
  }
  get assignment() {
    return this.contextService.getContext().assignment;
  }
  getHeaderThemeClasses() {
    return `uhf-theme--${this.headerTheme}`;
  }
  get headerTheme() {
    return this.contextService.getContext().headerTheme || $.LIGHT;
  }
  getFooterThemeClasses() {
    return `uhf-theme--${this.footerTheme}`;
  }
  get footerTheme() {
    return this.contextService.getContext().footerTheme || $.LIGHT;
  }
}
class nr extends Gt {
  constructor() {
    super(), this.state = {
      searchState: { isSearchOpen: !1 },
      mobileState: { isContextualNavOpen: !1, isGlobalNavOpen: !1 },
      meControlState: { config: void 0, activeAccount: void 0 }
    };
  }
  setState(t) {
    const e = { ...this.state }, i = t(e);
    this.state = { ...this.state, ...i }, JSON.stringify(e) !== JSON.stringify(this.state) && this.notify(i);
  }
  getState() {
    return this.state;
  }
}
const ar = new nr();
var O = /* @__PURE__ */ ((s) => (s.STATE_CHANGED = "StateEvents/STATE_CHANGED", s))(O || {});
class Z {
  constructor(t) {
    (this.host = t).addController(this), this.stateService = ar;
  }
  hostConnected() {
    this.id = this.stateService.subscribe(this.onStateChanged.bind(this));
  }
  hostDisconnected() {
    this.id && this.stateService.unsubscribe(this.id);
  }
  onStateChanged(t) {
    this.host.dispatchEvent(new CustomEvent("StateEvents/STATE_CHANGED", {
      detail: t,
      bubbles: !1
    }));
  }
  getState() {
    return this.stateService.getState();
  }
  setState(t) {
    this.stateService.setState(t);
  }
}
var lr = Object.defineProperty, hr = (s, t, e, i) => {
  for (var r = void 0, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = n(t, e, r) || r);
  return r && lr(t, e, r), r;
};
class f extends st {
  constructor(t = !1) {
    super(), this.debug = !1, this.originalChildren = [], this.passthroughChildren = !1, this.passthroughChildren = t;
  }
  connectedCallback() {
    if (!this.passthroughChildren) {
      let t = [];
      Array.from(this.children).forEach((e) => {
        t.push(e.cloneNode(!0)), e.remove();
      }), this.originalChildren = t;
    }
    super.connectedCallback();
  }
  createRenderRoot() {
    return this;
  }
  getChildren() {
    return this.originalChildren.map((t) => t.cloneNode(!0));
  }
  getChildrenBySlot(t) {
    return t === "default" ? this.originalChildren.filter((e) => !(e instanceof Element) || !e.getAttribute("slot")).map((e) => e.cloneNode(!0)) : this.originalChildren.filter((e) => e instanceof Element && e.getAttribute("slot") === t).map((e) => e.cloneNode(!0));
  }
  findFirstCustomAncestor() {
    let t = this.parentElement;
    for (; t; ) {
      if (t.tagName.includes("-"))
        return t;
      t = t.parentElement;
    }
    return null;
  }
  checkIfSlotExists(t) {
    return this.originalChildren.some((e) => e instanceof Element && e.getAttribute("slot") === t);
  }
}
hr([
  h({ type: Boolean })
], f.prototype, "debug");
var cr = Object.defineProperty, ur = Object.getOwnPropertyDescriptor, At = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ur(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && cr(t, e, r), r;
};
let ot = class extends f {
  constructor() {
    super(), this.partnerId = "", this.headerId = "", this.theme = "light", this.locale = "en-us", this.onBreakpointChanged = () => {
      this.requestUpdate();
    }, this.onStateChanged = (s) => {
      const t = s.detail;
      t.searchState !== void 0 && this.classList.toggle("search-open", t.searchState.isSearchOpen ?? !1);
    }, this.breakpointController = new x(this), this.contextController = new H(this), this.stateController = new Z(this);
  }
  connectedCallback() {
    const s = this.theme === "dark" ? $.DARK : $.LIGHT;
    this.contextController.setContext({
      headerTheme: s,
      locale: this.locale,
      headerId: this.headerId,
      partnerId: this.partnerId
    }), super.connectedCallback(), this.addEventListener(O.STATE_CHANGED, this.onStateChanged), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(O.STATE_CHANGED, this.onStateChanged), this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), super.disconnectedCallback();
  }
  willUpdate(s) {
    var t;
    if (s.has("theme")) {
      const e = $[(t = this.theme) == null ? void 0 : t.toUpperCase()] || $.LIGHT;
      this.contextController.setContext({ headerTheme: e });
    }
  }
  updated() {
    this.dispatchEvent(new CustomEvent("uhf-header-rendered", {
      bubbles: !0,
      composed: !0,
      detail: {
        view: this.breakpointController.isMobile ? "mobile" : "desktop"
      }
    }));
  }
  // get the children of the action container
  // need this for mobile view when the actions are rendered
  // outside the action container
  getActionChildren() {
    const s = super.getChildrenBySlot("actions");
    if (!s || s.length === 0) return [];
    const t = s[0];
    return Array.from(t.children).map((e) => e.cloneNode(!0));
  }
  getActionChildByTag(s) {
    return this.getActionChildren().filter(
      (t) => t instanceof Element && t.tagName.toLowerCase() === s
    );
  }
  render() {
    let s = [
      this.breakpointController.getBreakpointClasses(),
      this.contextController.getHeaderThemeClasses()
    ];
    return this.breakpointController.isMobile ? u`
                ${super.getChildrenBySlot("skip-link")}
                <uhf-cookie-banner></uhf-cookie-banner>
                ${super.getChildrenBySlot("promo-banner")}
                <header 
                    class="uhf-header ${s.join(" ")}"
                    itemscope
                    itemtype="https://schema.org/WPHeader"
                >
                    <div class="uhf-header-l0">
                        <div class="uhf-header-l0__actions">
                            ${this.getActionChildByTag("uhf-global-nav")}
                            ${this.getActionChildByTag("uhf-search")}
                        </div>
                        ${super.getChildrenBySlot("brand")}
                        <div class="uhf-header-l0__actions">
                            ${this.getActionChildByTag("uhf-cart")}
                            ${this.getActionChildByTag("uhf-mecontrol")}
                        </div>
                    </div>
                    ${super.checkIfSlotExists("contextual-nav") ? u`
                        <div class="uhf-header-l1">
                            ${super.getChildrenBySlot("contextual-nav")}
                        </div>
                    ` : ""}
                </header>
                ${super.getChildrenBySlot("site-promo-banner")}
            ` : u`
            ${super.getChildrenBySlot("skip-link")}
            <uhf-cookie-banner></uhf-cookie-banner>
            ${super.getChildrenBySlot("promo-banner")}
            <header class="uhf-header ${s.join(" ")}" itemscope itemtype="https://schema.org/WPHeader">
                <div class="uhf-header__container">
                    ${super.getChildrenBySlot("brand")}
                    ${super.getChildrenBySlot("contextual-nav")}
                    ${super.getChildrenBySlot("actions")}
                </div>
            </header>
            ${super.getChildrenBySlot("site-promo-banner")}
        `;
  }
};
At([
  h({ type: String })
], ot.prototype, "partnerId", 2);
At([
  h({ type: String })
], ot.prototype, "headerId", 2);
At([
  h({ type: String })
], ot.prototype, "theme", 2);
At([
  h({ type: String })
], ot.prototype, "locale", 2);
ot = At([
  g("uhf-header")
], ot);
var dr = Object.getOwnPropertyDescriptor, pr = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? dr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = n(r) || r);
  return r;
};
let Ne = class extends f {
  // this is just a simple container element
  // basically the equivalent of a div
  constructor() {
    super(!0);
  }
};
Ne = pr([
  g("uhf-actions")
], Ne);
var fr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, ts = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? gr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && fr(t, e, r), r;
};
let ee = class extends f {
  constructor() {
    super(), this.pipe = "true", this.breakpointController = new x(this, !0);
  }
  render() {
    return u`
            <div itemscope itemtype="https://schema.org/Organization" style="display:contents">
                <meta itemprop="url" content="https://www.microsoft.com"/>
                <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject" style="display:contents">
                    ${super.getChildrenBySlot("microsoft-logo")}
                </div>
                ${this.checkIfSlotExists("brand-logo") ? u`
                    <div class="uhf-site-logo-container ${this.pipe === "true" ? "show-pipe" : ""}">
                        ${super.getChildrenBySlot("brand-logo")}
                    </div>` : ""}
            </div>
        `;
  }
};
ts([
  h({ type: String })
], ee.prototype, "pipe", 2);
ee = ts([
  g("uhf-brand")
], ee);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = (s) => s ?? C;
var mr = Object.defineProperty, br = Object.getOwnPropertyDescriptor, D = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? br(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && mr(t, e, r), r;
};
let P = class extends f {
  constructor() {
    super(), this.brand = "", this.overflowText = "More", this.homeUrl = "", this.homeText = "", this.navLabel = "", this.theme = "", this.logoImageUrl = "", this.logoAlt = "", this.onBreakpointChanged = () => {
      this.requestUpdate();
    }, this.breakpointController = new x(this), this.stateController = new Z(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), super.disconnectedCallback();
  }
  render() {
    return this.breakpointController.isMobile ? u`
                <uhf-contextual-nav-mobile 
                    brand=${this.brand} 
                    homeUrl=${this.homeUrl} 
                    homeText=${this.homeText}
                    logoimageurl=${nt(this.logoImageUrl)}
                    logoalt=${nt(this.logoAlt)}
                    data-nav-label=${this.navLabel}>
                    ${super.getChildren()}
                </uhf-contextual-nav-mobile>
            ` : u`
            <uhf-contextual-nav-desktop overflowText=${this.overflowText} data-nav-label=${this.navLabel}>
                ${super.getChildren()}
            </uhf-contextual-nav-desktop>
       `;
  }
};
D([
  h({ type: String })
], P.prototype, "brand", 2);
D([
  h({ type: String })
], P.prototype, "overflowText", 2);
D([
  h({ type: String })
], P.prototype, "homeUrl", 2);
D([
  h({ type: String })
], P.prototype, "homeText", 2);
D([
  h({ type: String, attribute: "data-nav-label" })
], P.prototype, "navLabel", 2);
D([
  h({ type: String })
], P.prototype, "theme", 2);
D([
  h({ type: String, attribute: "logoimageurl" })
], P.prototype, "logoImageUrl", 2);
D([
  h({ type: String, attribute: "logoalt" })
], P.prototype, "logoAlt", 2);
P = D([
  g("uhf-contextual-nav")
], P);
var vr = Object.defineProperty, Cr = Object.getOwnPropertyDescriptor, jt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Cr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && vr(t, e, r), r;
};
let yt = class extends f {
  constructor() {
    super(...arguments), this.brand = "", this.overflowText = "More", this.navLabel = "";
  }
  render() {
    const s = JSON.stringify({
      compnm: "UHF",
      view: "UHF",
      pa: "UniversalHeader",
      hn: this.overflowText,
      ehn: "More",
      cN: `CatNav_${this.overflowText}_nonnav`,
      ecn: "CatNav_More_nonnav"
    });
    return u`
            <nav class="uhf-contextual-nav" role="navigation" aria-label=${nt(this.navLabel)} itemscope itemtype="https://schema.org/SiteNavigationElement">
                <uhf-overflow-menu
                    overflowText=${this.overflowText}
                    triggerDataM=${s}
                    containerSelector=".uhf-header__container"
                >
                    ${super.getChildrenBySlot("default")}
                    ${super.getChildrenBySlot("CTA").map((t) => (t instanceof Element && t.setAttribute("slot", "after"), t))}
                </uhf-overflow-menu>
            </nav>
        `;
  }
};
jt([
  h({ type: String })
], yt.prototype, "brand", 2);
jt([
  h({ type: String })
], yt.prototype, "overflowText", 2);
jt([
  h({ type: String, attribute: "data-nav-label" })
], yt.prototype, "navLabel", 2);
yt = jt([
  g("uhf-contextual-nav-desktop")
], yt);
const yr = (s) => s.filter((t) => {
  const e = getComputedStyle(t);
  if (e.display === "none" || e.visibility === "hidden") return !1;
  let i = t.parentElement;
  for (; i; ) {
    const r = getComputedStyle(i);
    if (r.display === "none" || r.visibility === "hidden") return !1;
    i = i.parentElement;
  }
  return !0;
}), es = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
  '[role="menuitem"]',
  '[role="option"]'
];
class ss {
  constructor(t, e) {
    this.focusedIndex = -1, this.menuItems = [], this.host = t, this.containerQuery = e, this.host.addController(this);
  }
  hostConnected() {
  }
  getFocusableMenuItems() {
    const t = this.containerQuery ? this.host.querySelector(this.containerQuery) : this.host;
    if (!t) return [];
    const e = t.querySelectorAll(es.join(", "));
    return yr(Array.from(e));
  }
  focusFirstMenuItem() {
    this.menuItems = this.getFocusableMenuItems(), this.menuItems.length > 0 && (this.focusedIndex = 0, this.menuItems[0].focus(), this.updateMenuItemAttributes());
  }
  focusLastMenuItem() {
    this.menuItems = this.getFocusableMenuItems(), this.menuItems.length > 0 && (this.focusedIndex = this.menuItems.length - 1, this.menuItems[this.focusedIndex].focus(), this.updateMenuItemAttributes());
  }
  focusNextItem() {
    this.menuItems = this.getFocusableMenuItems(), this.menuItems.length !== 0 && (this.focusedIndex = (this.focusedIndex + 1) % this.menuItems.length, this.menuItems[this.focusedIndex].focus(), this.updateMenuItemAttributes());
  }
  focusPreviousItem() {
    this.menuItems = this.getFocusableMenuItems(), this.menuItems.length !== 0 && (this.focusedIndex = this.focusedIndex <= 0 ? this.menuItems.length - 1 : this.focusedIndex - 1, this.menuItems[this.focusedIndex].focus(), this.updateMenuItemAttributes());
  }
  updateMenuItemAttributes() {
    this.menuItems.forEach((t, e) => {
      e === this.focusedIndex ? t.classList.add("focused") : t.classList.remove("focused");
    });
  }
  activateCurrentItem() {
    this.focusedIndex >= 0 && this.menuItems[this.focusedIndex] && this.menuItems[this.focusedIndex].click();
  }
  setFocusIndex(t) {
    this.focusedIndex = t, this.updateMenuItemAttributes();
  }
  getItemCount() {
    return this.menuItems = this.getFocusableMenuItems(), this.menuItems.length;
  }
}
class wr extends Gt {
  constructor() {
    super(), window.addEventListener("keydown", (t) => this.notify(t));
  }
}
const _r = new wr();
class ce {
  constructor(t, e, i) {
    this.keyboardService = _r, this.handleKeyDown = (r) => {
      switch (r.key) {
        case "ArrowDown":
          r.preventDefault(), this.callbacks.onArrowDown ? this.callbacks.onArrowDown(this.focusController) : this.focusController.focusNextItem();
          break;
        case "ArrowUp":
          r.preventDefault(), this.callbacks.onArrowUp ? this.callbacks.onArrowUp(this.focusController) : this.focusController.focusPreviousItem();
          break;
        case "Home":
          r.preventDefault(), this.callbacks.onHome ? this.callbacks.onHome(this.focusController) : this.focusController.focusFirstMenuItem();
          break;
        case "End":
          r.preventDefault(), this.callbacks.onEnd ? this.callbacks.onEnd(this.focusController) : this.focusController.focusLastMenuItem();
          break;
        case "Escape":
          r.preventDefault(), this.callbacks.onEscape && this.callbacks.onEscape(this.focusController);
          break;
        case "Tab":
          this.callbacks.onTab && this.callbacks.onTab(this.focusController, r);
          break;
        case "Enter":
          this.callbacks.onEnter && this.callbacks.onEnter(this.focusController);
          break;
        case " ":
          this.callbacks.onSpace && this.callbacks.onSpace(this.focusController);
          break;
      }
    }, this.listen = () => {
      this.id || (this.id = this.keyboardService.subscribe(this.handleKeyDown));
    }, this.deafen = () => {
      this.id && (this.keyboardService.unsubscribe(this.id), this.id = void 0);
    }, (this.host = t).addController(this), this.focusController = new ss(this.host, i), this.callbacks = e;
  }
  hostConnected() {
  }
  hostDisconnected() {
    this.deafen();
  }
}
var U = /* @__PURE__ */ ((s) => (s.POSITION_CALCULATED = "PositionEvents/POSITION_CALCULATED", s))(U || {});
class Sr {
  // margin from the edge of the viewport
  constructor(t, e, i, r, o = 0) {
    this.calculateMobilePosition = () => {
      var dt, Et;
      const n = (dt = this.host.findFirstCustomAncestor()) == null ? void 0 : dt.querySelector(this.anchorSelector), a = (Et = this.host.findFirstCustomAncestor()) == null ? void 0 : Et.querySelector(this.popoutSelector);
      if (!n || !a) return;
      a.style.removeProperty("top"), a.style.removeProperty("left"), a.style.removeProperty("width");
      const l = n.getBoundingClientRect(), c = window.scrollY, p = l.top + c, d = l.height;
      let b = "100%", v = 0, E = p + d;
      a.style.width = b, a.style.left = `${v}px`, a.style.top = `${E}px`, a.style.visibility = "visible", this.host.dispatchEvent(new CustomEvent("PositionEvents/POSITION_CALCULATED", { bubbles: !0 }));
    }, this.calculatePosition = () => {
      var be, ve, Ce;
      const n = (be = this.host.findFirstCustomAncestor()) == null ? void 0 : be.querySelector(this.anchorSelector), a = (ve = this.host.findFirstCustomAncestor()) == null ? void 0 : ve.querySelector(this.popoutSelector);
      if (!n || !a) return;
      a.style.visibility = "hidden";
      const l = n.getBoundingClientRect(), c = window.scrollX, p = window.scrollY, d = document.documentElement.clientWidth, b = c + d, v = 0, E = l.top + p, dt = l.left + c, Et = l.width + c, us = l.height, tt = Math.max(a.scrollWidth, a.offsetWidth), xt = (Ce = a.offsetParent) == null ? void 0 : Ce.getBoundingClientRect(), ds = this.isRtl();
      let F = 0, Tt = 0;
      for (const Kt of this.positions)
        if (Kt === "bottom") {
          if (Tt = E + us, ds) {
            let T = dt + l.width - tt;
            if (T < v + this.margin) {
              F = Math.min(c + this.margin, b - tt - this.margin);
              break;
            }
            F = T;
          } else {
            let T = dt;
            if (T + tt > b - this.margin) {
              F = Math.max(b - tt - this.margin, c + this.margin);
              break;
            }
            F = T;
          }
          break;
        } else if (Kt === "left") {
          let T = -tt;
          if (l.x + T < v + this.margin)
            continue;
          F = T, Tt = xt ? l.top - xt.top : E;
          break;
        } else if (Kt === "right") {
          let T = Et, ye = T + tt;
          if (l.x + ye > b - this.margin)
            continue;
          F = T, Tt = xt ? l.top - xt.top : E;
          break;
        }
      a.style.top = `${Tt}px`, a.style.left = `${F}px`, a.style.visibility = "visible", this.host.dispatchEvent(new CustomEvent("PositionEvents/POSITION_CALCULATED", { bubbles: !0 }));
    }, (this.host = t).addController(this), this.positions = e, this.anchorSelector = i, this.popoutSelector = r, this.margin = o, this.positions.push(
      "bottom"
      /* BOTTOM */
    );
  }
  hostConnected() {
  }
  isRtl() {
    return Xe.getContext().alignment === Ct.RTL;
  }
}
var $r = Object.defineProperty, Ar = Object.getOwnPropertyDescriptor, X = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Ar(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && $r(t, e, r), r;
};
let M = class extends f {
  constructor() {
    super(), this.brand = "", this.homeUrl = "", this.homeText = "", this.navLabel = "", this.logoImageUrl = "", this.logoAlt = "", this.onStateChanged = (s) => {
      var e;
      const t = s.detail;
      if (((e = t.mobileState) == null ? void 0 : e.isContextualNavOpen) !== void 0) {
        const i = t.mobileState.isContextualNavOpen;
        this.updateToggleState(i), i || this.keyboardController.deafen();
      }
    }, this.toggleMenu = () => {
      let s = !this.stateController.getState().mobileState.isContextualNavOpen;
      this.stateController.setState((t) => ({ mobileState: { ...t.mobileState, isContextualNavOpen: s } }));
    }, this.updateToggleState = (s) => {
      const t = this.querySelector("button.uhf-contextual-nav-trigger uhf-icon");
      t && t.setAttribute("iconName", s ? "ChevronUp" : "ChevronDown");
      const e = this.querySelector("uhf-popout.uhf-contextual-nav-popout");
      e && (s ? e.setAttribute("open", "") : e.removeAttribute("open"));
    }, this.handlePopoutOpened = (s) => {
      s.stopPropagation(), this.keyboardController.focusController.focusFirstMenuItem(), this.keyboardController.listen();
    }, this.handleOutsideClick = (s) => {
      this.stateController.getState().mobileState.isContextualNavOpen && !this.contains(s.target) && this.toggleMenu();
    }, this.breakpointController = new x(this), this.stateController = new Z(this), this.keyboardController = new ce(this, {
      onTab: (s, t) => {
        if (t.shiftKey)
          s.focusedIndex <= 0 ? this.toggleMenu() : (t.preventDefault(), s.focusPreviousItem());
        else {
          const e = s.getItemCount();
          s.focusedIndex >= e - 1 ? this.toggleMenu() : (t.preventDefault(), s.focusNextItem());
        }
      }
    }, "uhf-popout.uhf-contextual-nav-popout");
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this.handleOutsideClick), this.addEventListener(U.POSITION_CALCULATED, this.handlePopoutOpened), this.addEventListener(O.STATE_CHANGED, this.onStateChanged);
  }
  disconnectedCallback() {
    document.removeEventListener("click", this.handleOutsideClick), this.removeEventListener(U.POSITION_CALCULATED, this.handlePopoutOpened), this.removeEventListener(O.STATE_CHANGED, this.onStateChanged), super.disconnectedCallback();
  }
  render() {
    return u`
            <button class="uhf-contextual-nav-trigger" @click=${this.toggleMenu}>
                ${this.logoImageUrl ? u`<img src="${this.logoImageUrl}" alt="${this.logoAlt}" />` : this.brand}
                <uhf-icon iconName="ChevronDown" size=12></uhf-icon>
            </button>
            <nav class="uhf-contextual-nav ${this.breakpointController.getBreakpointClasses()}" role="navigation" aria-label=${nt(this.navLabel)} itemscope itemtype="https://schema.org/SiteNavigationElement">
                <uhf-popout 
                    targetSelector="button.uhf-contextual-nav-trigger"
                    positions="bottom"
                    margin="0"
                    class="uhf-contextual-nav-popout"
                >
                    <ul>
                        ${this.homeUrl && this.homeText ? u`<li><a class="uhf-nav-item uhf-nav-link" href="${this.homeUrl}">${this.homeText}</a></li>` : ""}
                        ${super.getChildren().map((s) => u`<li>${s}</li>`)}
                    </ul>
                </uhf-popout>
            </nav>
        `;
  }
};
X([
  h({ type: String })
], M.prototype, "brand", 2);
X([
  h({ type: String })
], M.prototype, "homeUrl", 2);
X([
  h({ type: String })
], M.prototype, "homeText", 2);
X([
  h({ type: String, attribute: "data-nav-label" })
], M.prototype, "navLabel", 2);
X([
  h({ type: String, attribute: "logoimageurl" })
], M.prototype, "logoImageUrl", 2);
X([
  h({ type: String, attribute: "logoalt" })
], M.prototype, "logoAlt", 2);
M = X([
  g("uhf-contextual-nav-mobile")
], M);
class rs {
  constructor(t, e, i) {
    (this.host = t).addController(this), this.onResize = i, this.resizeElement = e, this.setupResizeObserver();
  }
  hostDisconnected() {
    this.cleanupResizeObserver();
  }
  setupResizeObserver() {
    "ResizeObserver" in globalThis ? (this.resizeObserver = new ResizeObserver(() => {
      this.onResize();
    }), this.resizeObserver.observe(this.resizeElement)) : globalThis.addEventListener("resize", this.onResize);
  }
  cleanupResizeObserver() {
    this.resizeObserver ? this.resizeObserver.disconnect() : globalThis.removeEventListener("resize", this.onResize);
  }
}
class Er {
  constructor(t, e = {}) {
    var i;
    this._isOverflowing = !1, this._visibleItems = 0, this._itemWidthCache = /* @__PURE__ */ new Map(), this._triggerWidth = 0, this._beforeWidth = 0, this._afterWidth = 0, this._hasMeasured = !1, this._calculateOverflow = async () => {
      var d;
      if (!this._menuContainer) return;
      const r = this._menuItems, o = !this._hasMeasured || this._itemsChanged(r);
      o && await this._measureMenuItems(r);
      const n = await this._getAvailableWidth();
      if (n === 0) return;
      const a = n - this._options.overflowBuffer - this._triggerWidth - this._beforeWidth - this._afterWidth;
      let l = 0, c = 0;
      for (const b of r) {
        const v = this._itemWidthCache.get(b) || 0;
        if (l += v, l <= a) {
          c++, b.classList.remove("hidden");
          continue;
        }
        break;
      }
      const p = this._visibleItems;
      this._visibleItems = c, this._isOverflowing = c < r.length, this._beforeContent.forEach((b) => b.classList.remove("hidden")), this._afterContent.forEach((b) => b.classList.remove("hidden")), this._isOverflowing && ((d = this._overflowTrigger) == null || d.classList.remove("hidden")), this._menuContainer.classList.add("overflow-ready"), (p !== this._visibleItems || o) && this._updateOverflowMenu(this.overflowDropdownContent);
    }, (this.host = t).addController(this), this._options = {
      overflowBuffer: e.overflowBuffer ?? 100,
      containerSelector: e.containerSelector ?? "",
      fixedSiblingWidths: e.fixedSiblingWidths ?? {}
    }, (i = this.host.updateComplete) == null || i.then(() => {
      const r = this._flexContainer || this.host.querySelector(".uhf-overflow-menu");
      this.resizeController = new rs(t, r, this._calculateOverflow);
    });
  }
  hostUpdated() {
    if (this._hasMeasured) {
      const t = this._menuItems;
      this._itemsChanged(t) && this._calculateOverflow();
    } else
      this._calculateOverflow();
  }
  /**
   * Measure every menu item and cache its width.  Items must be in the
   * layout (not display:none) for offsetWidth to be accurate.  On the
   * very first call the entire menu is still visibility:hidden (via CSS)
   * so the user never sees the momentarily-unhidden items.
   */
  async _measureMenuItems(t) {
    var r;
    this._itemWidthCache.clear();
    for (const o of t) {
      const n = await this._getEffectiveWidth(o);
      this._itemWidthCache.set(o, n), o.classList.add("hidden");
    }
    let e = 0;
    for (const o of this._beforeContent)
      e += await this._getEffectiveWidth(o);
    this._beforeWidth = e;
    let i = 0;
    for (const o of this._afterContent)
      i += await this._getEffectiveWidth(o);
    this._afterWidth = i, (r = this._overflowTrigger) == null || r.classList.remove("hidden"), this._triggerWidth = this._overflowTrigger ? await this._getEffectiveWidth(this._overflowTrigger) : 0, this._hasMeasured = !0;
  }
  /**
   * Compute the space available for menu items by measuring the ancestor
   * flex container and subtracting everything that isn't the overflow
   * menu's region.
   */
  async _getAvailableWidth() {
    const t = this._flexChild, e = this._flexContainer;
    if (!e || !t) return 0;
    const i = this._menuItems, r = this._overflowTrigger, o = this._beforeContent, n = this._afterContent;
    i.forEach((v) => v.classList.add("hidden")), r && r.classList.add("hidden"), o.forEach((v) => v.classList.add("hidden")), n.forEach((v) => v.classList.add("hidden"));
    const a = getComputedStyle(e), l = e.clientWidth - parseFloat(a.paddingLeft) - parseFloat(a.paddingRight), c = parseFloat(a.gap) || 0;
    let p = 0, d = 0;
    for (const v of Array.from(e.children)) {
      if (d++, v === t) continue;
      const E = v.tagName.toUpperCase();
      if (this._options.fixedSiblingWidths[E]) {
        p += this._options.fixedSiblingWidths[E];
        continue;
      }
      p += await this._getEffectiveWidth(v);
    }
    const b = d > 1 ? (d - 1) * c : 0;
    return l - p - b;
  }
  /**
   * Get the effective rendered width of an element. Elements with
   * display:contents or display:inline (e.g. custom elements without
   * explicit display) report offsetWidth as 0.  For those, recursively
   * sum the widths of their children until real boxes are found.
   */
  async _getEffectiveWidth(t) {
    if (t instanceof st && t.isUpdatePending && await t.updateComplete, t.offsetWidth > 0) return t.offsetWidth;
    let e = 0;
    for (const i of Array.from(t.children))
      e += await this._getEffectiveWidth(i);
    return e;
  }
  /**
   * Check whether the current DOM items differ from the cached set
   * (e.g. after a Lit re-render that creates new element clones).
   */
  _itemsChanged(t) {
    return t.length !== this._itemWidthCache.size ? !0 : t.some((e) => !this._itemWidthCache.has(e));
  }
  /**
   * Populate the overflow trigger's dropdown body with the given items.
   */
  _updateOverflowMenu(t) {
    const e = this.host.querySelector(".overflow-trigger div.uhf-dropdown-body");
    t && e && (e.innerHTML = "", t.forEach((i) => e.appendChild(i)));
  }
  // ── DOM Getters ──────────────────────────────────────────────────
  /** The inner wrapper div rendered by uhf-overflow-menu. */
  get _menuContainer() {
    return this.host.querySelector(".uhf-overflow-menu") || null;
  }
  /**
   * The ancestor flex container used to compute available width.
   * Uses the explicit `containerSelector` option when set, otherwise
   * walks up the DOM to find the nearest flex/grid parent.
   */
  get _flexContainer() {
    if (this._options.containerSelector)
      return this.host.closest(this._options.containerSelector) || null;
    let t = this.host.parentElement;
    for (; t; ) {
      const e = getComputedStyle(t).display;
      if (["flex", "inline-flex", "grid", "inline-grid"].includes(e))
        return t;
      t = t.parentElement;
    }
    return null;
  }
  /**
   * The direct child of the flex container that contains (or is an
   * ancestor of) this overflow menu.  Used to exclude "our" region
   * when summing sibling widths.
   */
  get _flexChild() {
    const t = this._flexContainer;
    if (!t) return null;
    let e = this.host;
    for (; e && e.parentElement !== t; )
      e = e.parentElement;
    return e;
  }
  /** The overflow dropdown trigger element. */
  get _overflowTrigger() {
    return this.host.querySelector(".overflow-trigger") || null;
  }
  /** Navigable items inside the items container. */
  get _menuItems() {
    const t = this.host.querySelector("div.uhf-overflow-menu-items");
    return t ? Array.from(t.children).filter(
      (e) => e.matches("uhf-dropdown, .uhf-nav-link")
    ) : [];
  }
  /** Non-collapsible content rendered before the collapsible items. */
  get _beforeContent() {
    const t = this.host.querySelector("div.uhf-overflow-menu-before");
    return t ? Array.from(t.children) : [];
  }
  /** Non-collapsible content rendered after the collapsible items. */
  get _afterContent() {
    const t = this.host.querySelector("div.uhf-overflow-menu-after");
    return t ? Array.from(t.children) : [];
  }
  // ── Overflow Item Conversion ─────────────────────────────────────
  _isNavLink(t) {
    return t.matches(".uhf-nav-link, a[href]");
  }
  _isDropdown(t) {
    return t.matches("uhf-dropdown");
  }
  _convertNavLinkToDropdownLink(t) {
    var l;
    const e = t.getAttribute("href") || "#", i = ((l = t.textContent) == null ? void 0 : l.trim()) || "", r = t.getAttribute("name") || "", o = t.getAttribute("data-m") || "", n = t.getAttribute("id") || "", a = document.createElement("a");
    return a.className = "uhf-nav-item uhf-dropdown-link", a.href = e, n && (a.id = n), a.setAttribute("name", r), a.setAttribute("data-m", o), a.textContent = i, a;
  }
  _convertDropdownToFlyout(t) {
    var l;
    const e = t.getAttribute("text") || ((l = t.textContent) == null ? void 0 : l.trim()) || "", i = t.getAttribute("name") || "", r = t.getAttribute("data-m") || "", o = t.getAttribute("id") || "", n = this._getDropdownDestination(t), a = document.createElement("uhf-flyout");
    return a.setAttribute("text", e), o && (a.id = o), a.setAttribute("name", i), a.setAttribute("data-m", r), a.replaceChildren(...n.content), a;
  }
  _getDropdownDestination(t) {
    const e = t.querySelectorAll("uhf-dropdown-column");
    if (e.length > 0)
      return {
        type: "multicolumn",
        content: Array.from(e).map((r) => this._convertColumnToTemplate(r))
      };
    const i = t.querySelectorAll(".uhf-dropdown-link, a[href]");
    return i.length > 0 ? {
      type: "submenu",
      content: Array.from(i).map((r) => this._convertLinkToTemplate(r))
    } : { type: "unknown", content: [] };
  }
  _convertColumnToTemplate(t) {
    var a;
    const e = ((a = t.querySelector(".uhf-dropdown-column-title")) == null ? void 0 : a.textContent) || t.getAttribute("title") || "", i = t.querySelectorAll(".uhf-dropdown-link, a[href]"), r = t.getAttribute("data-m") || "", o = Array.from(i).map(
      (l) => this._convertLinkToTemplate(l)
    ), n = document.createElement("uhf-flyout");
    return n.setAttribute("text", e), n.setAttribute("data-m", r), n.replaceChildren(...o), n;
  }
  _convertLinkToTemplate(t) {
    var l;
    const e = t.getAttribute("href") || "#", i = ((l = t.textContent) == null ? void 0 : l.trim()) || "", r = t.getAttribute("name") || "", o = t.getAttribute("data-m") || "", n = t.getAttribute("id") || "", a = document.createElement("a");
    return a.className = "uhf-nav-item uhf-dropdown-link", a.href = e, n && (a.id = n), a.setAttribute("name", r), a.setAttribute("data-m", o), a.textContent = i, a;
  }
  get overflowDropdownContent() {
    const t = [];
    return this.overflowItems.forEach((e) => {
      this._isNavLink(e) ? t.push(this._convertNavLinkToDropdownLink(e)) : this._isDropdown(e) && t.push(this._convertDropdownToFlyout(e));
    }), t;
  }
  // ── Public API ───────────────────────────────────────────────────
  get isOverflowing() {
    return this._isOverflowing;
  }
  get visibleItems() {
    return this._visibleItems;
  }
  get overflowItems() {
    return this._menuItems.slice(this._visibleItems);
  }
}
var xr = Object.defineProperty, Tr = Object.getOwnPropertyDescriptor, at = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Tr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && xr(t, e, r), r;
};
let V = class extends f {
  constructor() {
    super(...arguments), this.overflowText = "More", this.triggerDataM = "", this.containerSelector = "", this.overflowBuffer = 100, this.fixedSiblingWidths = "";
  }
  firstUpdated() {
    const s = {
      overflowBuffer: this.overflowBuffer,
      containerSelector: this.containerSelector || void 0
    };
    if (this.fixedSiblingWidths)
      try {
        s.fixedSiblingWidths = JSON.parse(this.fixedSiblingWidths);
      } catch {
      }
    this.overflowController = new Er(this, s);
  }
  render() {
    return u`
            <div class="uhf-overflow-menu">
                <div class="uhf-overflow-menu-before">
                    ${super.getChildrenBySlot("before")}
                </div>
                <div class="uhf-overflow-menu-items">
                    ${super.getChildrenBySlot("default")}
                </div>
                <uhf-dropdown
                    class="overflow-trigger"
                    text=${this.overflowText}
                    data-m=${this.triggerDataM}
                >
                </uhf-dropdown>
                <div class="uhf-overflow-menu-after">
                    ${super.getChildrenBySlot("after")}
                </div>
            </div>
        `;
  }
};
at([
  h({ type: String })
], V.prototype, "overflowText", 2);
at([
  h({ type: String })
], V.prototype, "triggerDataM", 2);
at([
  h({ type: String })
], V.prototype, "containerSelector", 2);
at([
  h({ type: Number })
], V.prototype, "overflowBuffer", 2);
at([
  h({ type: String })
], V.prototype, "fixedSiblingWidths", 2);
V = at([
  g("uhf-overflow-menu")
], V);
class Or {
  constructor(t, e) {
    this.host = t, this.host.addController(this), this.initialForm = e, this.formData = { ...e };
  }
  hostConnected() {
  }
  resetForm() {
    this.formData = { ...this.initialForm };
  }
  setFormData(t, e) {
    this.formData[t] = e;
  }
  get data() {
    return this.formData;
  }
}
class Lr {
  constructor(t, e) {
    this.isLoading = !1, this.error = null, (this.host = t).addController(this), this.baseUrl = e;
  }
  hostConnected() {
  }
  hostDisconnected() {
    this.abortController && this.abortController.abort();
  }
  setIsLoading(t) {
    this.isLoading = t, this.host.dispatchEvent(new CustomEvent("ApiEvents/LOADING_CHANGED", {
      detail: { isLoading: t },
      bubbles: !1
    }));
  }
  async fetchData(t, e) {
    this.setIsLoading(!0), this.error = null, this.abortController && this.abortController.abort(), this.abortController = new AbortController();
    try {
      const i = await fetch(
        `${this.baseUrl}${t}`,
        {
          ...e,
          signal: (e == null ? void 0 : e.signal) || this.abortController.signal
        }
      );
      if (!i.ok)
        throw new Error(`Error: ${i.status} ${i.statusText}`);
      return await i.json();
    } catch (i) {
      return this.error = i.message, null;
    } finally {
      this.setIsLoading(!1), this.abortController = null;
    }
  }
  setBaseUrl(t) {
    this.baseUrl = t;
  }
}
var L = /* @__PURE__ */ ((s) => (s.TERM_CLICKED = "SearchEvents/TERM_CLICKED", s.AUTO_SUGGEST_UPDATED = "SearchEvents/AUTO_SUGGEST_UPDATED", s))(L || {});
function Pr(s, t) {
  let e;
  return function(...i) {
    const r = this;
    clearTimeout(e), e = setTimeout(() => {
      s.apply(r, i);
    }, t);
  };
}
const is = (s, t, e, i, r, o) => {
  setTimeout(() => {
    s() ? t() : r > 0 ? is(s, t, i, i, r - 1, o) : console.warn(o);
  }, e);
};
class Ir {
  constructor(t) {
    this.handleOutsideClick = (e) => {
      this.isOpen && !this.host.contains(e.target) && this.toggle();
    }, this.onEscapeClicked = (e) => {
      let i = this.host.querySelector("input[type='search']");
      i && i === document.activeElement ? this.toggle() : (e.setFocusIndex(-1), i == null || i.focus());
    }, this.getImageUrl = (e) => e.startsWith("http") ? e : `https:${e}`, this.getSafeUrl = (e, i) => {
      const r = e == null ? void 0 : e.trim();
      if (!r) return null;
      const o = r.startsWith("//") ? `https:${r}` : r;
      try {
        const n = new URL(o, window.location.origin);
        if (n.protocol !== "http:" && n.protocol !== "https:")
          return null;
        const a = i == null ? void 0 : i.trim();
        return a && n.searchParams.append("icid", a), n.href;
      } catch {
        return null;
      }
    }, this.setAutoSuggestWidth = () => {
      var r;
      let e = (r = this.host.querySelector("input")) == null ? void 0 : r.scrollWidth, i = this.host.querySelector("uhf-popout");
      e && i && (i.style.width = `${e}px`);
    }, this.toggle = () => {
      let e = !this.isOpen;
      this.stateController.setState((i) => ({ searchState: { ...i.searchState, isSearchOpen: e } })), e ? (this.keyboardController.listen(), this.fetchSuggestions(!0)) : (this.formController.resetForm(), this.keyboardController.deafen(), this.keyboardController.focusController.setFocusIndex(-1), this.host.dispatchEvent(new CustomEvent(L.AUTO_SUGGEST_UPDATED, { detail: { autoSuggestResults: [] }, bubbles: !1 })));
    }, this.fetchSuggestions = (e = !1) => {
      var i;
      (i = this.apiController) == null || i.fetchData(`?${this.createAutoSuggestQueryString(e)}`).then((r) => {
        let o = this.processAutoSuggestResults(r);
        this.host.dispatchEvent(new CustomEvent(L.AUTO_SUGGEST_UPDATED, { detail: { autoSuggestResults: o }, bubbles: !1 }));
      });
    }, this.host = t, this.host.addController(this), this.stateController = new Z(this.host), this.formController = new Or(this.host, { q: "" }), this.contextController = new H(this.host), this.keyboardController = new ce(this.host, {
      onEscape: this.onEscapeClicked
    }, "uhf-popout"), this.debouncedAutoSuggestFetch = Pr(this.fetchSuggestions, 300), this.host.updateComplete.then(() => {
      this.resizeController = new rs(this.host, this.host.querySelector("input.uhf-search-input"), this.setAutoSuggestWidth), this.apiController = new Lr(this.host, this.host.autoSuggestUrl), this.setAutoSuggestWidth();
    });
  }
  hostConnected() {
    document.addEventListener("click", this.handleOutsideClick);
  }
  hostDisconnected() {
    document.removeEventListener("click", this.handleOutsideClick);
  }
  createAutoSuggestQueryString(t = !1) {
    let e = this.host, i = {
      market: this.contextController.locale,
      clientId: e.clientId,
      sources: e.source,
      counts: e.productCount
    };
    return t ? (i.feature = "zerostate", i.site = window.location.origin.includes("localhost") ? "https://www.microsoft.com/en-us/" : window.location.origin + window.location.pathname) : i.query = this.query.trim(), new URLSearchParams(i).toString();
  }
  processAutoSuggestResults(t) {
    var o;
    let e = [], i = 0;
    const r = this.query;
    return (o = t == null ? void 0 : t.ResultSets) == null || o.forEach((n) => {
      n.Type == "product" ? n.Suggests.forEach((l) => {
        let c = document.createElement("uhf-autosuggest-item");
        c.setAttribute("text", l.Title);
        const p = this.getSafeUrl(l.Url, l.Icid);
        p && c.setAttribute("url", p), l.ImageUrl && c.setAttribute("imageUrl", this.getImageUrl(l.ImageUrl)), c.setAttribute("secondaryText", l.Source), c.setAttribute("position", i.toString()), c.setAttribute("query", r);
        const d = l.Pid;
        d && c.setAttribute("pid", d), l.Icid && c.setAttribute("icid", l.Icid), e.push(c), i++;
      }) : n.Type == "term" && n.Suggests.forEach((l) => {
        let c = document.createElement("uhf-autosuggest-item");
        if (c.setAttribute("text", l.Txt), c.setAttribute("position", i.toString()), c.setAttribute("query", r), l.Url) {
          const p = this.getSafeUrl(l.Url, l.Icid);
          p && c.setAttribute("url", p);
        }
        !c.hasAttribute("url") && l.Txt.trim() && c.setAttribute("url", this.buildSearchUrl(l.Txt)), l.Icid && c.setAttribute("icid", l.Icid), e.push(c), i++;
      });
    }), e;
  }
  setForm(t, e) {
    this.formController.setFormData(t, e), this.host.requestUpdate(), this.debouncedAutoSuggestFetch();
  }
  buildSearchUrl(t) {
    const e = this.host.searchUrl.indexOf("#"), i = e >= 0 ? this.host.searchUrl.slice(0, e) : this.host.searchUrl, r = e >= 0 ? this.host.searchUrl.slice(e) : "", o = i.includes("?") ? "&" : "?";
    let n = `${i}${o}${this.host.queryParameterName}=${encodeURIComponent(t.trim())}`;
    return this.host.searchParams && (n += `&${this.host.searchParams}`), `${n}${r}`;
  }
  submit() {
    const t = this.query.trim();
    t && (this.host.dispatchEvent(new CustomEvent(L.AUTO_SUGGEST_UPDATED, { detail: { autoSuggestResults: [] }, bubbles: !1 })), window.location.href = this.buildSearchUrl(t));
  }
  get isOpen() {
    return this.stateController.getState().searchState.isSearchOpen || !1;
  }
  get query() {
    const t = this.host.queryParameterName || "q";
    return this.formController.data[t] ?? "";
  }
}
var Ur = Object.defineProperty, Dr = Object.getOwnPropertyDescriptor, A = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Dr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Ur(t, e, r), r;
};
let S = class extends f {
  constructor() {
    super(), this.searchUrl = "", this.autoSuggestUrl = "https://www.microsoft.com/msstoreapiprod/api/autosuggest", this.zeroStateUrl = "", this.placeholder = "Search...", this.searchLabel = "", this.queryParameterName = "q", this.clientId = "7F27B536-CF6B-4C65-8638-A0F8CBDFCA65", this.productCount = "5,1,5", this.source = "Microsoft-Terms,Iris-Products,DCatAll-Products", this.cancelLabel = "Cancel", this.searchParams = "", this.suggestionsAvailableText = "{0} suggestions available", this.autoSuggestResults = [], this.suggestionAnnouncement = "", this.onBreakpointChanged = () => {
      this.requestUpdate();
    }, this.onStateChanged = (s) => {
      var e;
      const t = s.detail;
      if (((e = t.searchState) == null ? void 0 : e.isSearchOpen) !== void 0) {
        let i = t.searchState.isSearchOpen;
        this.classList.toggle("search-open", i);
        const r = this.querySelector(".uhf-search-container");
        r && r.classList.toggle("hidden", !i);
        const o = this.querySelector(".uhf-search-button");
        o && o.classList.toggle("hidden", i), i && this.querySelector("input").focus();
      }
    }, this.handleAutoSuggestUpdate = (s) => {
      const { autoSuggestResults: t } = s.detail;
      this.autoSuggestResults = t;
      const e = t.length;
      if (e > 0) {
        const i = this.suggestionsAvailableText.replace("{0}", e.toString());
        this.suggestionAnnouncement = "", queueMicrotask(() => {
          this.suggestionAnnouncement = i;
        });
      } else
        this.suggestionAnnouncement = "";
    }, this.handleTermClicked = (s) => {
      s.stopImmediatePropagation();
      const { term: t } = s.detail;
      this.searchController.setForm(this.queryParameterName, t), this.searchController.submit();
    }, this.onChange = (s) => {
      const t = s.target;
      this.searchController.setForm(this.queryParameterName, t.value);
    }, this.onSearchKeyDown = (s) => {
      var i, r;
      if (s.key !== "Enter" || s.isComposing || s.repeat || s.defaultPrevented || !this.searchController.query.trim())
        return;
      const t = this.querySelector(".uhf-search-submit-button"), { telemetry: e } = window;
      if (t)
        try {
          (r = (i = e == null ? void 0 : e.webAnalyticsPlugin) == null ? void 0 : i.capturePageAction) == null || r.call(i, t, { actionType: "KE" });
        } catch {
        }
    }, this.onSubmit = (s) => {
      s.preventDefault(), this.searchController.submit();
    }, this.searchController = new Ir(this), this.breakpointController = new x(this), this.stateController = new Z(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(L.AUTO_SUGGEST_UPDATED, this.handleAutoSuggestUpdate), this.addEventListener(L.TERM_CLICKED, this.handleTermClicked), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), this.addEventListener(O.STATE_CHANGED, this.onStateChanged);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener(L.AUTO_SUGGEST_UPDATED, this.handleAutoSuggestUpdate), this.removeEventListener(L.TERM_CLICKED, this.handleTermClicked), this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), this.removeEventListener(O.STATE_CHANGED, this.onStateChanged), this.searchController.isOpen && this.searchController.toggle();
  }
  render() {
    return u`
            <div class="uhf-search-container hidden">
                ${this.breakpointController.isMobile ? u`
                    <button 
                        class="uhf-search-cancel ${this.breakpointController.getBreakpointClasses()}" 
                        @click=${this.searchController.toggle} 
                        aria-label="Back"
                        data-m='{"compnm":"UHF","view":"UHF","pa":"UniversalSearch","cN":"Close Search","ecn":"Close Search"}'
                    >
                        <uhf-icon iconName="Back" size=15></uhf-icon>
                    </button>
                ` : ""}
                <form class="uhf-search-form" itemscope itemtype="https://schema.org/SearchAction" @submit=${this.onSubmit}>
                    <meta itemprop="target" content="${this.searchUrl}?${this.queryParameterName}={search_term_string}"/>
                    <input 
                        type="search" 
                        name="${this.queryParameterName}" 
                        class="uhf-search-input ${this.breakpointController.getBreakpointClasses()}" 
                        .placeholder="${this.placeholder}" 
                        title="${this.placeholder}"
                        @input=${this.onChange}
                        @keydown=${this.onSearchKeyDown}
                        .value="${this.searchController.query}" 
                        autocomplete="off"
                        role="combobox"
                        tabindex="0"
                        aria-expanded="${this.searchController.isOpen}"
                        aria-controls="uhf-autosuggest-popout"
                        itemprop="query-input"
                        data-bi-srchq="${this.searchController.query}"
                        data-m='{"compnm": "UHF", "view": "UHF", "pa": "UniversalSearch", "cN":"SearchBox", "ecn":"SearchBox"}'
                    />
                    <button type="submit" 
                    class="uhf-search-submit-button" 
                    aria-label="${this.searchLabel}"
                    title="${this.searchLabel}"
                    data-bi-srchq="${this.searchController.query}"
                    data-m=${JSON.stringify({ compnm: "UHF", view: "UHF", pa: "UniversalSearch", cN: "Search_nav", ecn: "Search_nav", bhvr: 61, srchq: this.searchController.query, srchtype: "manual" })}
                    >
                    <uhf-icon iconName="Search" size="16"></uhf-icon>
                    </button>
                </form>
                ${this.breakpointController.isMobile ? "" : u`
                    <button class="uhf-search-cancel" @click=${this.searchController.toggle}
                        data-m='{"compnm":"UHF","view":"UHF","pa":"UniversalSearch","cN":"Close Search","ecn":"Close Search"}'>
                        ${this.cancelLabel}
                    </button>
                `}
            </div>
            <button 
                class="uhf-nav-item uhf-nav-button uhf-search-button" 
                @click=${this.searchController.toggle}
                aria-label="${this.placeholder || this.searchLabel}"
                title="${this.placeholder}"
                data-m='{"compnm": "UHF", "view": "UHF", "pa": "UniversalSearch", "cN":"Search_nav", "ecn":"Search_nav", "bhvr": 62}'
            >
                <span class="uhf-search-text">${this.searchLabel}</span>
                <uhf-icon iconName="Search"></uhf-icon>
            </button>
            <uhf-popout 
                class="uhf-autosuggest"
                ?open="${this.autoSuggestResults.length > 0 && this.searchController.isOpen}"
                targetSelector="input.uhf-search-input"
                positions="bottom"
                style=""
                id="uhf-autosuggest-popout"
                role="listbox"
                disableMobilePositioning
            >
                ${this.autoSuggestResults}
            </uhf-popout>
            <div class="uhf-search-status" role="status" aria-live="polite" aria-atomic="true">
                ${this.suggestionAnnouncement}
            </div>
        `;
  }
};
A([
  h({ type: String })
], S.prototype, "searchUrl", 2);
A([
  h({ type: String })
], S.prototype, "autoSuggestUrl", 2);
A([
  h({ type: String })
], S.prototype, "zeroStateUrl", 2);
A([
  h({ type: String })
], S.prototype, "placeholder", 2);
A([
  h({ type: String, attribute: "search-label" })
], S.prototype, "searchLabel", 2);
A([
  h({ type: String })
], S.prototype, "queryParameterName", 2);
A([
  h({ type: String })
], S.prototype, "clientId", 2);
A([
  h({ type: String })
], S.prototype, "productCount", 2);
A([
  h({ type: String })
], S.prototype, "source", 2);
A([
  h({ type: String, attribute: "cancel-label" })
], S.prototype, "cancelLabel", 2);
A([
  h({ type: String, attribute: "search-params" })
], S.prototype, "searchParams", 2);
A([
  h({ type: String, attribute: "suggestions-available-text" })
], S.prototype, "suggestionsAvailableText", 2);
A([
  R()
], S.prototype, "autoSuggestResults", 2);
A([
  R()
], S.prototype, "suggestionAnnouncement", 2);
S = A([
  g("uhf-search")
], S);
var kr = Object.defineProperty, Nr = Object.getOwnPropertyDescriptor, ue = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Nr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && kr(t, e, r), r;
};
let Nt = class extends f {
  constructor() {
    super(...arguments), this.iconName = "", this.size = 16;
  }
  render() {
    return u`
            <i class="ms-Icon ms-Icon--${this.iconName}" style="font-size: ${this.size}px;"></i>
        `;
  }
};
ue([
  h({ type: String })
], Nt.prototype, "iconName", 2);
ue([
  h({ type: Number })
], Nt.prototype, "size", 2);
Nt = ue([
  g("uhf-icon")
], Nt);
var Br = Object.defineProperty, Mr = Object.getOwnPropertyDescriptor, lt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Mr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Br(t, e, r), r;
};
let K = class extends f {
  constructor() {
    super(), this.cartUrl = "", this.cartCountUrl = "https://www.microsoft.com/store/buy/cartcount", this.cartLabel = "", this.cartCountText = "items in cart", this.cartCount = 0, this.normalizeCartCountUrl = () => this.cartCountUrl && this.cartCountUrl.startsWith("//") ? `https:${this.cartCountUrl}` : this.cartCountUrl, this.handleCartUpdates = (s) => {
      var t;
      try {
        if (typeof s.data != "string") return;
        if (((t = this.getAttribute("data-src-dmn-chk")) == null ? void 0 : t.trim().toLowerCase()) !== "false") {
          const o = this.normalizeCartCountUrl();
          if (!o) return;
          let n;
          try {
            n = new URL(o).origin;
          } catch {
            console.warn("[UHF Cart] Invalid cartCountUrl:", o);
            return;
          }
          if (s.origin !== n) return;
        }
        const e = s.data.indexOf("="), i = e === -1 ? s.data : s.data.slice(0, e), r = e === -1 ? "" : s.data.slice(e + 1);
        if (i !== "DR_Cart_Count") return;
        this.cartCount = /^\d+$/.test(r) ? parseInt(r, 10) : 0;
      } catch (e) {
        console.warn("[UHF Cart] Cart count processing failed", e);
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("message", this.handleCartUpdates);
  }
  disconnectedCallback() {
    window.removeEventListener("message", this.handleCartUpdates), super.disconnectedCallback();
  }
  render() {
    return u`
            <iframe id="uhf-cart-count-iframe" src="${this.normalizeCartCountUrl()}"></iframe>
            <a 
                href="${this.cartUrl}" 
                class="uhf-nav-item uhf-nav-button uhf-cart" 
                aria-label="${this.cartLabel}" 
                title="${this.cartCount} ${this.cartCountText}"
                data-m='{"compnm": "UHF", "view": "UHF", "pa": "UniversalHeader", "cN":"GlobalNav_Cart_Nav", "bhvr": 82}'
            >
                <span class="uhf-cart-text">${this.cartLabel}</span>
                <uhf-icon iconName="ShoppingCart"></uhf-icon>
                <span class="uhf-cart-count ${this.cartCount === 0 ? "hidden" : ""}">${this.cartCount}</span>
            </a>
        `;
  }
};
lt([
  h({ type: String })
], K.prototype, "cartUrl", 2);
lt([
  h({ type: String })
], K.prototype, "cartCountUrl", 2);
lt([
  h({ type: String, attribute: "cart-label" })
], K.prototype, "cartLabel", 2);
lt([
  h({ type: String, attribute: "cart-count-text" })
], K.prototype, "cartCountText", 2);
lt([
  R()
], K.prototype, "cartCount", 2);
K = lt([
  g("uhf-cart")
], K);
var Rr = Object.defineProperty, Hr = Object.getOwnPropertyDescriptor, de = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Hr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Rr(t, e, r), r;
};
let Bt = class extends f {
  constructor() {
    super(), this.text = "Menu", this.dataM = "", this.onBreakpointChanged = () => {
      this.requestUpdate();
    }, this.breakpointController = new x(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), super.disconnectedCallback();
  }
  render() {
    return this.breakpointController.isMobile ? u`
                <uhf-dropdown-mobile text=${this.text} ?debug=${this.debug} data-m=${this.dataM}>
                    ${super.getChildren()}
                </uhf-dropdown-mobile>
            ` : u`
            <uhf-dropdown-desktop text=${this.text} ?debug=${this.debug} data-m=${this.dataM}>
                ${super.getChildren()}
            </uhf-dropdown-desktop>
        `;
  }
};
de([
  h({ type: String })
], Bt.prototype, "text", 2);
de([
  h({ type: String, attribute: "data-m" })
], Bt.prototype, "dataM", 2);
Bt = de([
  g("uhf-dropdown")
], Bt);
class Fr {
  constructor() {
    this.subscribers = [], window.addEventListener("keydown", (t) => this.notify(t));
  }
  notify(t) {
    if (this.subscribers.length === 0) return;
    const e = this.subscribers[this.subscribers.length - 1];
    e(t);
  }
  subscribe(t) {
    this.subscribers.push(t);
  }
  unsubscribe() {
    this.subscribers.pop();
  }
  clearAll() {
    this.subscribers = [];
  }
}
const qr = new Fr();
var j = /* @__PURE__ */ ((s) => (s.TOGGLE = "DropdownEvents/TOGGLE", s.CLOSE_VIA_TAB = "DropdownEvents/CLOSE_VIA_TAB", s))(j || {});
class os {
  constructor(t) {
    this.isOpen = !1, this.margin = 16, this.keyboardService = qr, this.handleKeyDown = (e) => {
      var i;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(), this.focusController.focusNextItem();
          break;
        case "ArrowUp":
          e.preventDefault(), this.focusController.focusPreviousItem();
          break;
        case "Home":
          e.preventDefault(), this.focusController.focusFirstMenuItem();
          break;
        case "End":
          e.preventDefault(), this.focusController.focusLastMenuItem();
          break;
        case "Escape":
          e.preventDefault(), this.toggle(), (i = this.host.querySelector(this.buttonQuery)) == null || i.focus();
          break;
        case "Tab":
          if (e.shiftKey)
            this.focusController.focusedIndex <= 0 ? (this.toggle(), this.host.dispatchEvent(new CustomEvent("DropdownEvents/CLOSE_VIA_TAB", {
              bubbles: !0,
              detail: { originalEvent: e }
            }))) : (e.preventDefault(), this.focusController.focusPreviousItem());
          else {
            const r = this.focusController.getItemCount();
            this.focusController.focusedIndex >= r - 1 ? (this.toggle(), this.host.dispatchEvent(new CustomEvent("DropdownEvents/CLOSE_VIA_TAB", {
              bubbles: !0,
              detail: { originalEvent: e }
            }))) : (e.preventDefault(), this.focusController.focusNextItem());
          }
          break;
        case "Enter":
        case " ":
          this.focusController.focusedIndex >= 0 && (e.preventDefault(), this.focusController.activateCurrentItem());
          break;
      }
    }, this.handleOutsideClick = (e) => {
      !this.host.contains(e.target) && this.isOpen && (this.toggle(), this.keyboardService.clearAll());
    }, this.toggle = () => {
      this.isOpen = !this.isOpen, this.isOpen ? this.keyboardService.subscribe(this.handleKeyDown) : (this.keyboardService.unsubscribe(), this.focusController.focusedIndex = -1), this.host.dispatchEvent(new CustomEvent("DropdownEvents/TOGGLE", {
        detail: { isOpen: this.isOpen },
        bubbles: !1
      }));
    }, this.afterPopoutOpened = (e) => {
      e.stopImmediatePropagation();
    }, this.host = t, this.host.addController(this), this.focusController = new ss(this.host, "uhf-popout"), this.buttonQuery = "button.uhf-nav-item";
  }
  hostConnected() {
    document.addEventListener("click", this.handleOutsideClick);
  }
  hostDisconnected() {
    document.removeEventListener("click", this.handleOutsideClick);
  }
}
var Gr = Object.defineProperty, jr = Object.getOwnPropertyDescriptor, pe = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? jr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Gr(t, e, r), r;
};
let Mt = class extends f {
  constructor() {
    super(), this.text = "Menu", this.dataM = "", this.hasColumns = !1, this.onChildClosedViaTab = (s) => {
      if (s.target === this || !this.dropdownController.isOpen) return;
      s.stopPropagation();
      const { originalEvent: t } = s.detail, i = s.target.querySelector("button.uhf-flyout-trigger"), r = this.querySelector("uhf-popout.uhf-dropdown-menu");
      if (!r) return;
      const n = Array.from(r.querySelectorAll(es.join(", "))).filter((l) => !l.closest("uhf-flyout-desktop uhf-popout")), a = i ? n.indexOf(i) : -1;
      t.shiftKey ? a >= 0 && (t.preventDefault(), i.focus(), this.dropdownController.focusController.focusedIndex = a) : a >= 0 && a < n.length - 1 ? (t.preventDefault(), n[a + 1].focus(), this.dropdownController.focusController.focusedIndex = a + 1) : this.dropdownController.toggle();
    }, this.onToggle = () => {
      const s = this.dropdownController.isOpen, t = this.querySelector("button.uhf-nav-item");
      t && (t.classList.toggle("open", s), t.setAttribute("aria-expanded", String(s)));
      const e = this.querySelector("uhf-popout");
      e && (s ? e.setAttribute("open", "") : e.removeAttribute("open"));
    }, this.dropdownController = new os(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasColumns = this.checkHasColumns(), this.addEventListener(U.POSITION_CALCULATED, this.dropdownController.afterPopoutOpened), this.addEventListener(j.TOGGLE, this.onToggle), this.addEventListener(j.CLOSE_VIA_TAB, this.onChildClosedViaTab);
  }
  disconnectedCallback() {
    this.removeEventListener(U.POSITION_CALCULATED, this.dropdownController.afterPopoutOpened), this.removeEventListener(j.TOGGLE, this.onToggle), this.removeEventListener(j.CLOSE_VIA_TAB, this.onChildClosedViaTab), super.disconnectedCallback();
  }
  checkHasColumns() {
    return super.getChildren().some((t) => t.nodeName.toLowerCase() === "uhf-dropdown-column");
  }
  render() {
    return u`
            <button 
                @click="${this.dropdownController.toggle}" 
                class="uhf-nav-item uhf-nav-button uhf-dropdown-trigger ${this.dropdownController.isOpen ? "open" : ""}" 
                role="button" 
                aria-haspopup="true"
                aria-expanded="${this.dropdownController.isOpen}"
                data-m=${this.dataM}
            >
                ${this.text}
                <uhf-icon iconName="ChevronDown" size=8></uhf-icon>
            </button>

            <uhf-popout 
                targetSelector="button.uhf-nav-item"
                ?open="${this.dropdownController.isOpen}"
                class="uhf-dropdown-menu"
            >
                ${super.getChildrenBySlot("header")}
                <div class="uhf-dropdown-body ${this.hasColumns ? "has-columns" : "no-columns"}">
                    ${super.getChildrenBySlot("default")}
                </div>
                ${super.getChildrenBySlot("footer")}
            </uhf-popout>
        `;
  }
};
pe([
  h({ type: String })
], Mt.prototype, "text", 2);
pe([
  h({ type: String, attribute: "data-m" })
], Mt.prototype, "dataM", 2);
Mt = pe([
  g("uhf-dropdown-desktop")
], Mt);
var zr = Object.defineProperty, Wr = Object.getOwnPropertyDescriptor, ns = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Wr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && zr(t, e, r), r;
};
let se = class extends f {
  constructor() {
    super(), this.text = "", this.isOpen = !1, this.toggle = () => {
      this.isOpen = !this.isOpen, this.updateToggleState();
    }, this.onStateChanged = (s) => {
      var e, i;
      const t = s.detail;
      t.mobileState && (!((e = t.mobileState) != null && e.isContextualNavOpen) || !((i = t.mobileState) != null && i.isGlobalNavOpen)) && this.isOpen && (this.isOpen = !1, this.updateToggleState());
    }, this.updateToggleState = () => {
      const s = this.querySelector("button.uhf-dropdown-trigger-mobile");
      s && s.classList.toggle("open", this.isOpen);
      const t = this.querySelector("uhf-icon");
      t && t.setAttribute("iconName", this.isOpen ? "ChevronUp" : "ChevronDown");
      const e = this.querySelector(".uhf-dropdown-container");
      e && e.classList.toggle("hidden", !this.isOpen);
    }, this.stateController = new Z(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(O.STATE_CHANGED, this.onStateChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(O.STATE_CHANGED, this.onStateChanged), super.disconnectedCallback();
  }
  render() {
    return u`
            <button class="uhf-dropdown-trigger-mobile ${this.isOpen ? "open" : ""}" @click=${this.toggle}>
                <span class="uhf-dropdown-trigger-mobile-text">${this.text}</span>
                <uhf-icon iconName="${this.isOpen ? "ChevronUp" : "ChevronDown"}" size=12></uhf-icon>
            </button>
            <div class="uhf-dropdown-container ${this.isOpen ? "" : "hidden"}">
                <ul>
                    ${super.getChildren().map((s) => u`<li>${s}</li>`)}
                </ul>
            </div>
        `;
  }
};
ns([
  h({ type: String })
], se.prototype, "text", 2);
se = ns([
  g("uhf-dropdown-mobile")
], se);
var Vr = Object.getOwnPropertyDescriptor, Kr = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Vr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = n(r) || r);
  return r;
};
let Be = class extends f {
  constructor() {
    super(), this.breakpointController = new x(this, !0);
  }
  render() {
    return u`
            <ul class="uhf-dropdown-header">
                ${super.getChildren().map((s) => u`<li>${s}</li>`)} 
            </ul>
        `;
  }
};
Be = Kr([
  g("uhf-dropdown-header")
], Be);
var Jr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, fe = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Qr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Jr(t, e, r), r;
};
let Rt = class extends f {
  constructor() {
    super(), this.columnTitle = "", this.showTooltip = "true", this.onBreakpointChanged = () => {
      this.requestUpdate();
    }, this.breakpointController = new x(this, !0);
  }
  connectedCallback() {
    super.connectedCallback(), this.columnTitle || (this.columnTitle = this.getAttribute("title") || ""), this.showTooltip === "false" && this.setAttribute("title", ""), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), super.disconnectedCallback();
  }
  render() {
    return this.breakpointController.isMobile ? u`
                <uhf-dropdown-mobile text="${this.columnTitle}">
                    ${super.getChildren()}
                </uhf-dropdown-mobile>
            ` : u`
            <div class="uhf-dropdown-column-title">${this.columnTitle}</div>
            <ul>
                ${super.getChildren().map((s) => u`<li>${s}</li>`)}
            </ul>
        `;
  }
};
fe([
  h({ type: String })
], Rt.prototype, "columnTitle", 2);
fe([
  h({ type: String, attribute: "show-tooltip" })
], Rt.prototype, "showTooltip", 2);
Rt = fe([
  g("uhf-dropdown-column")
], Rt);
var Yr = Object.getOwnPropertyDescriptor, Zr = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Yr(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = n(r) || r);
  return r;
};
let Me = class extends f {
  constructor() {
    super(), this.breakpointController = new x(this, !0);
  }
  render() {
    return u`
            ${super.getChildren()}
        `;
  }
};
Me = Zr([
  g("uhf-dropdown-footer")
], Me);
var Xr = Object.defineProperty, ti = Object.getOwnPropertyDescriptor, ge = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ti(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Xr(t, e, r), r;
};
let Ht = class extends f {
  constructor() {
    super(), this.text = "", this.dataM = "", this.onBreakpointChanged = () => {
      this.requestUpdate();
    }, this.breakpointController = new x(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), super.disconnectedCallback();
  }
  render() {
    return this.breakpointController.isMobile ? u`
                <uhf-dropdown-mobile text="${this.text}" data-m=${this.dataM}>
                    ${super.getChildren()}
                </uhf-dropdown-mobile>
            ` : u`
            <uhf-flyout-desktop text="${this.text}" data-m=${this.dataM}>
                ${super.getChildren()}
            </uhf-flyout-desktop>
        `;
  }
};
ge([
  h({ type: String })
], Ht.prototype, "text", 2);
ge([
  h({ type: String, attribute: "data-m" })
], Ht.prototype, "dataM", 2);
Ht = ge([
  g("uhf-flyout")
], Ht);
var ei = Object.defineProperty, si = Object.getOwnPropertyDescriptor, me = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? si(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && ei(t, e, r), r;
};
let Ft = class extends f {
  constructor() {
    super(), this.text = "", this.dataM = "", this.onToggle = () => {
      const s = this.flyoutController.isOpen, t = this.querySelector("button.uhf-flyout-trigger");
      t && (t.classList.toggle("open", s), t.setAttribute("aria-expanded", String(s)));
      const e = this.querySelector("uhf-popout");
      e && (s ? e.setAttribute("open", "") : e.removeAttribute("open"));
    }, this.onMouseEnter = () => {
      this.flyoutController.isOpen || this.flyoutController.toggle();
    }, this.onMouseLeave = (s) => {
      const t = s.relatedTarget, e = this.querySelector("uhf-popout");
      this.flyoutController.isOpen && e && !e.contains(t) && this.flyoutController.toggle();
    }, this.flyoutController = new os(this), this.contextController = new H(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(U.POSITION_CALCULATED, this.flyoutController.afterPopoutOpened), this.addEventListener(j.TOGGLE, this.onToggle);
  }
  disconnectedCallback() {
    this.removeEventListener(U.POSITION_CALCULATED, this.flyoutController.afterPopoutOpened), this.removeEventListener(j.TOGGLE, this.onToggle), super.disconnectedCallback();
  }
  render() {
    return u`
        <div 
            class="uhf-nav-item-wrapper"
            @mouseenter=${this.onMouseEnter}
            @mouseleave=${this.onMouseLeave}
        >
            <button 
                class="uhf-nav-item uhf-dropdown-button uhf-flyout-trigger ${this.flyoutController.isOpen ? "open" : ""}" 
                @click=${this.flyoutController.toggle}
                aria-haspopup="true"
                aria-expanded="${this.flyoutController.isOpen}"
                data-m=${this.dataM}
            >
                <span class="uhf-flyout-text">${this.text}</span>
                <uhf-icon 
                    iconName="${this.contextController.alignment === Ct.LTR ? "ChevronRight" : "ChevronLeft"}" 
                    size=8
                >
                </uhf-icon>
            </button>
            <uhf-popout 
                class="uhf-flyout"
                ?open="${this.flyoutController.isOpen}"
                targetSelector="button.uhf-flyout-trigger"
                positions="${this.contextController.alignment === Ct.RTL ? "left,right" : "right,left"}"
            >
                ${super.getChildren()}
            </uhf-popout>
        </div>
        `;
  }
};
me([
  h({ type: String })
], Ft.prototype, "text", 2);
me([
  h({ type: String, attribute: "data-m" })
], Ft.prototype, "dataM", 2);
Ft = me([
  g("uhf-flyout-desktop")
], Ft);
var ri = Object.getOwnPropertyDescriptor, ii = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ri(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = n(r) || r);
  return r;
};
let Re = class extends f {
  constructor() {
    super(), this.contextController = new H(this);
  }
  firstUpdated() {
    requestAnimationFrame(() => this.updateLocaleLinks());
  }
  normalizeLocale(s) {
    return (s ?? "").trim().replace(/_/g, "-").toLowerCase();
  }
  buildHref(s, t) {
    return `${s.origin}${t}${s.search}${s.hash}`;
  }
  updateLocaleLinks() {
    const s = this.normalizeLocale(this.contextController.locale), t = new URL(window.location.href), e = t.pathname;
    Array.from(this.querySelectorAll("a[data-uhf-locale]")).forEach((r) => {
      const o = r.getAttribute("data-uhf-locale");
      if (!o) return;
      const n = this.resolveLocale(o, s), a = this.replaceLocaleInPath(e, s, n);
      r.setAttribute("href", this.buildHref(t, a));
    });
  }
  resolveLocale(s, t) {
    const e = this.normalizeLocale(s);
    if (e.includes("-"))
      return e;
    const i = this.normalizeLocale(t).split("-").filter(Boolean);
    return i.length <= 1 ? e : [e, ...i.slice(1)].join("-");
  }
  replaceLocaleInPath(s, t, e) {
    const i = s.split("/").filter(Boolean);
    if (i.length === 0)
      return "/" + e;
    const r = this.normalizeLocale(t), o = i.map((a) => this.normalizeLocale(a)), n = o.findIndex((a) => a === r);
    if (n >= 0)
      i[n] = e;
    else {
      const a = o.findIndex((l) => this.looksLikeLocale(l));
      a >= 0 ? i[a] = e : i.unshift(e);
    }
    return "/" + i.join("/");
  }
  looksLikeLocale(s) {
    return /^[a-z]{2,3}(-[a-z]{4})?(-([a-z]{2}|\d{3}))?(-[a-z0-9]{5,8})*$/i.test(s);
  }
  render() {
    const s = this.contextController.getLocaleLabel();
    return u` <uhf-dropdown class="uhf-header-locale-picker" text="${s}"> ${super.getChildren()} </uhf-dropdown> `;
  }
};
Re = ii([
  g("uhf-locale-picker")
], Re);
var oi = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, as = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ni(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && oi(t, e, r), r;
};
let re = class extends f {
  constructor() {
    super(), this.theme = "light", this.contextController = new H(this);
  }
  connectedCallback() {
    const s = this.theme === "dark" ? $.DARK : $.LIGHT;
    this.contextController.setContext({ footerTheme: s }), super.connectedCallback();
  }
  willUpdate(s) {
    if (s.has("theme")) {
      const t = this.theme === "dark" ? $.DARK : $.LIGHT;
      this.contextController.setContext({ footerTheme: t });
    }
  }
  render() {
    return u`
            <footer id="uhf-footer" class="uhf-footer c-uhff ${this.contextController.getFooterThemeClasses()}" itemscope itemtype="https://schema.org/WPFooter">
                ${super.getChildrenBySlot("uhf-footer-nav")}
                <div class="uhf-footer-base">
                    <div class="uhf-footer-legal-links">
                        ${this.checkIfSlotExists("uhf-footer-locale-picker") ? u`
                            <div class="uhf-footer-locale-picker-container">
                                <uhf-icon iconName="World" size="20"></uhf-icon>
                                ${super.getChildrenBySlot("uhf-footer-locale-picker")}
                            </div>
                        ` : ""}
                        ${super.getChildrenBySlot("uhf-footer-california-privacy-link")}
                        ${super.getChildrenBySlot("uhf-footer-consumer-health-privacy-link")}
                    </div>
                    ${super.getChildrenBySlot("uhf-footer-menu")}
                </div>
                ${super.getChildrenBySlot("uhf-footer-regional-content")}
            </footer>
        `;
  }
};
as([
  h({ type: String })
], re.prototype, "theme", 2);
re = as([
  g("uhf-footer")
], re);
var ai = Object.getOwnPropertyDescriptor, li = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ai(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = n(r) || r);
  return r;
};
let He = class extends f {
  constructor() {
    super();
  }
  render() {
    return u`
            <nav class="uhf-footer-nav" aria-label="Footer Resource links" itemscope itemtype="https://schema.org/SiteNavigationElement">
                ${super.getChildren()}
            </nav>
        `;
  }
};
He = li([
  g("uhf-footer-nav")
], He);
var hi = Object.defineProperty, ci = Object.getOwnPropertyDescriptor, ls = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? ci(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && hi(t, e, r), r;
};
let ie = class extends f {
  constructor() {
    super(), this.heading = "";
  }
  render() {
    return u`
                <h2 class="uhf-footer-nav-group-heading">${this.heading}</h2>
                <ul class="uhf-footer-nav-group-links">
                    ${super.getChildren().map((s) => u`<li>${s}</li>`)}
                </ul>
        `;
  }
};
ls([
  h({ type: String })
], ie.prototype, "heading", 2);
ie = ls([
  g("uhf-footer-nav-group")
], ie);
var ui = Object.defineProperty, di = Object.getOwnPropertyDescriptor, hs = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? di(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && ui(t, e, r), r;
};
let oe = class extends f {
  constructor() {
    super(), this.navLabel = "";
  }
  firstUpdated() {
    var t;
    let s = (t = document.getElementById("uhf-Footer_ManageCookies")) == null ? void 0 : t.parentElement;
    s && s.classList.add("hidden");
  }
  render() {
    return u`
            <nav class="uhf-footer-menu" aria-label=${nt(this.navLabel)} itemscope itemtype="https://schema.org/SiteNavigationElement">
                <ul>
                    ${super.getChildren().map((s) => u`<li>${s}</li>`)}
                    <li>© Microsoft ${(/* @__PURE__ */ new Date()).getFullYear()}</li>
                </ul>
            </nav>
        `;
  }
};
hs([
  h({ type: String, attribute: "data-nav-label" })
], oe.prototype, "navLabel", 2);
oe = hs([
  g("uhf-footer-menu")
], oe);
var pi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, k = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? fi(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && pi(t, e, r), r;
};
let I = class extends f {
  constructor() {
    super(), this.text = "", this.url = "", this.imageUrl = null, this.secondaryText = null, this.position = 0, this.query = "", this.pid = "", this.icid = "", this.onTermClick = (s) => {
      this.dispatchEvent(new CustomEvent(L.TERM_CLICKED, {
        detail: {
          term: s.target.innerText.trim()
        },
        bubbles: !0
      }));
    }, this.handleSuggestionInteraction = () => {
      this.dispatchEvent(new CustomEvent(L.AUTO_SUGGEST_UPDATED, {
        detail: { autoSuggestResults: [] },
        bubbles: !0
      }));
    };
  }
  // Builds declarative data-m JSON for an autosuggest item. The 1DS SDK
  // auto-emits a typed BC 60 (SEARCHAUTOCOMPLETE) beacon on click — no
  // manual JS call required. 
  buildDataM() {
    const s = this.text.trim(), t = !!this.imageUrl, e = {
      compnm: "UHF",
      view: "UHF",
      pa: "UniversalSearch",
      cN: s,
      ecn: s,
      bhvr: 60,
      cT: t ? "4" : "0",
      srchq: this.query,
      srchtype: "auto suggest",
      asdisplayed: !0,
      aslinkpos: String(this.position),
      qrylngth: String(this.query.length),
      resultselected: s
    };
    return this.pid && (e.pid = this.pid), JSON.stringify(e);
  }
  renderText() {
    const s = this.query.trim();
    if (!s)
      return this.text;
    const t = this.text, e = t.toLowerCase(), i = s.toLowerCase(), r = [];
    let o = 0, n = e.indexOf(i);
    for (; n !== -1; )
      r.push(t.slice(o, n)), r.push(u`<strong>${t.slice(n, n + s.length)}</strong>`), o = n + s.length, n = e.indexOf(i, o);
    return r.push(t.slice(o)), r;
  }
  render() {
    return this.imageUrl ? u`
                <li role="presentation">
                    <a href="${this.url}" class="uhf-autosuggest-link" role="option" tabindex="0"
                        @click=${this.handleSuggestionInteraction}
                        @auxclick=${this.handleSuggestionInteraction}
                        data-bi-srchq="${this.query}"
                        data-m=${this.buildDataM()}>
                        <img src="${this.imageUrl}" alt="${this.text}" />
                        <div class="uhf-autosuggest-item-text">
                            <span>${this.renderText()}</span>
                            ${this.secondaryText ? u`<span>${this.secondaryText}</span>` : ""}
                        </div>
                    </a>
                </li>
            ` : this.url ? u`
                <li role="presentation">
                    <a href="${this.url}" class="uhf-autosuggest-term-link" role="option" tabindex="0"
                        @click=${this.handleSuggestionInteraction}
                        @auxclick=${this.handleSuggestionInteraction}
                        data-bi-srchq="${this.query}"
                        data-m=${this.buildDataM()}>
                        ${this.renderText()}
                    </a>
                </li>
            ` : u`
            <li class="uhf-autosuggest-term" @click=${this.onTermClick} role="presentation"
                data-bi-srchq="${this.query}"
                data-m=${this.buildDataM()}>
                <span role="option" tabindex="0">${this.renderText()}</span>
            </li>
        `;
  }
};
k([
  h({ type: String })
], I.prototype, "text", 2);
k([
  h({ type: String })
], I.prototype, "url", 2);
k([
  h({ type: String })
], I.prototype, "imageUrl", 2);
k([
  h({ type: String })
], I.prototype, "secondaryText", 2);
k([
  h({ type: Number })
], I.prototype, "position", 2);
k([
  h({ type: String })
], I.prototype, "query", 2);
k([
  h({ type: String })
], I.prototype, "pid", 2);
k([
  h({ type: String })
], I.prototype, "icid", 2);
I = k([
  g("uhf-autosuggest-item")
], I);
var gi = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, ht = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? mi(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && gi(t, e, r), r;
};
let J = class extends f {
  constructor() {
    super(!0), this.targetSelector = "", this.positions = "bottom,right,left", this.margin = 15, this.open = !1, this.disableMobilePositioning = !1, this.calculatePosition = () => {
      var s, t;
      this.open && (this.breakpointController.isMobile && !this.disableMobilePositioning ? (s = this.positionController) == null || s.calculateMobilePosition() : (t = this.positionController) == null || t.calculatePosition());
    }, this.breakpointController = new x(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.positionController = new Sr(
      this,
      this.positions.split(","),
      this.targetSelector,
      "uhf-popout",
      this.margin
    ), window.addEventListener("resize", this.calculatePosition);
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.calculatePosition), super.disconnectedCallback();
  }
  firstUpdated(s) {
    this.calculatePosition();
  }
  updated(s) {
    this.open ? (this.classList.remove("hidden"), setTimeout(() => {
      this.calculatePosition();
    }, 0)) : this.classList.add("hidden");
  }
  render() {
    return u``;
  }
};
ht([
  h({ type: String })
], J.prototype, "targetSelector", 2);
ht([
  h({ type: String })
], J.prototype, "positions", 2);
ht([
  h({ type: Number })
], J.prototype, "margin", 2);
ht([
  h({ type: Boolean })
], J.prototype, "open", 2);
ht([
  h({ type: Boolean })
], J.prototype, "disableMobilePositioning", 2);
J = ht([
  g("uhf-popout")
], J);
var bi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, zt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? vi(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && bi(t, e, r), r;
};
let wt = class extends f {
  constructor() {
    super(), this.dataM = "", this.extensibleLinks = "", this.signInLabel = "", this.ensureTelemetryRedaction = () => {
      ze();
    }, this.redirectWrapperFocus = (s) => {
      const t = s.target;
      if (t != null && t.matches('div[role="button"]')) {
        const e = t.querySelector("button");
        e && e.focus();
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.dataM = '{"compnm": "UHF", "view": "UHF", "pa": "UniversalHeader", "hn": "Account", "cN": "GlobalNav_Account_cont", "ecn": "GlobalNav_Account_cont", "ehn": "Account", "bhvr": 100}', this.observeRoleButtonTabIndex(), this.addEventListener("focusin", this.redirectWrapperFocus), this.addEventListener("click", this.ensureTelemetryRedaction, !0);
  }
  disconnectedCallback() {
    var s, t;
    this.removeEventListener("focusin", this.redirectWrapperFocus), this.removeEventListener("click", this.ensureTelemetryRedaction, !0), (s = this.mutationObserver) == null || s.disconnect(), (t = this.reactRoot) == null || t.unmount(), super.disconnectedCallback();
  }
  /**
   * The @mecontrol/fluent-web library wraps the trigger button in a
   * div[role="button"] when the flyout is expanded. This wrapper persists
   * after the flyout closes and remains in the tab order, causing an extra
   * tab stop on the mecontrol. This observer removes the wrapper from the
   * sequential tab order so only the inner <button> is tabbable.
   */
  observeRoleButtonTabIndex() {
    this.fixRoleButtonTabIndex(), this.setStaticAccountContentNames(), this.mutationObserver = new MutationObserver(() => {
      this.fixRoleButtonTabIndex(), this.setStaticAccountContentNames();
    }), this.mutationObserver.observe(this, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ["tabindex", "data-bi-cn"] });
  }
  setStaticAccountContentNames() {
    const s = this.querySelector("button:not(.uhf-mecontrol-signin-label)"), t = this.querySelectorAll('[data-tid="me-control-menu-item-my-account"]'), e = s ? [s, ...t] : [...t];
    for (const i of e) {
      const r = i === s ? "GlobalNav_Account_cont" : "GlobalNav_Account_SignIn";
      i.getAttribute("data-bi-cn") !== r && i.setAttribute("data-bi-cn", r), i === s && i.getAttribute("data-m") !== this.dataM && i.setAttribute("data-m", this.dataM);
    }
  }
  fixRoleButtonTabIndex() {
    this.querySelectorAll('div[role="button"] > button').forEach((t) => {
      const e = t.parentElement;
      e && e.getAttribute("tabindex") !== "-1" && e.setAttribute("tabindex", "-1");
    });
  }
  async firstUpdated() {
    await this.loadReactApp();
  }
  async loadReactApp() {
    try {
      const [s, { default: t }, { default: e }] = await Promise.all([
        import("./index-B8sDcx8i.js").then((i) => i.R),
        import("./client-BY9SflKR.js").then((i) => i.c),
        import("./MeControl-D4RjoPZp.js").then((i) => i.M)
        // Your React component
      ]);
      this.reactRoot = t.createRoot(this), this.reactRoot.render(s.createElement(e, { extensibleLinks: this.extensibleLinks, signInLabelText: this.signInLabel || void 0 }));
    } catch (s) {
      console.error("Failed to load React app:", s);
    }
  }
  render() {
    return u`
        `;
  }
};
zt([
  h({ type: String, reflect: !0, attribute: "data-m" })
], wt.prototype, "dataM", 2);
zt([
  h({ type: String })
], wt.prototype, "extensibleLinks", 2);
zt([
  h({ type: String, attribute: "sign-in-label" })
], wt.prototype, "signInLabel", 2);
wt = zt([
  g("uhf-mecontrol")
], wt);
var Ci = Object.defineProperty, yi = Object.getOwnPropertyDescriptor, ct = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? yi(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Ci(t, e, r), r;
};
let Q = class extends f {
  constructor() {
    super(), this.text = "All Microsoft", this.solo = !1, this.dataM = "", this.navLabel = "", this.menuLabel = "", this.onBreakpointChanged = () => {
      this.requestUpdate();
    }, this.breakpointController = new x(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), super.disconnectedCallback();
  }
  render() {
    return this.breakpointController.isMobile ? u`
                <uhf-global-nav-mobile
                    ?solo=${this.solo}
                    data-m=${this.dataM}
                    data-nav-label=${this.navLabel}
                    menu-label=${this.menuLabel.trim() || this.navLabel.trim() || this.text}>
                    ${super.getChildren()}
                </uhf-global-nav-mobile>
            ` : u`
            <uhf-global-nav-desktop text=${this.text} data-m=${this.dataM} data-nav-label=${this.navLabel}>
                ${super.getChildren()}
            </uhf-global-nav-desktop>
        `;
  }
};
ct([
  h({ type: String })
], Q.prototype, "text", 2);
ct([
  h({ type: Boolean })
], Q.prototype, "solo", 2);
ct([
  h({ type: String, attribute: "data-m" })
], Q.prototype, "dataM", 2);
ct([
  h({ type: String, attribute: "data-nav-label" })
], Q.prototype, "navLabel", 2);
ct([
  h({ type: String, attribute: "menu-label" })
], Q.prototype, "menuLabel", 2);
Q = ct([
  g("uhf-global-nav")
], Q);
var wi = Object.defineProperty, _i = Object.getOwnPropertyDescriptor, Wt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? _i(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && wi(t, e, r), r;
};
let _t = class extends f {
  constructor() {
    super(...arguments), this.text = "All Microsoft", this.dataM = "", this.navLabel = "";
  }
  render() {
    return u`
            <nav class="uhf-global-nav" aria-label=${nt(this.navLabel)} itemscope itemtype="https://schema.org/SiteNavigationElement">
                <uhf-dropdown text=${this.text} data-m=${this.dataM}>
                    ${super.getChildren()}
                </uhf-dropdown>
            </nav>
            
        `;
  }
};
Wt([
  h({ type: String })
], _t.prototype, "text", 2);
Wt([
  h({ type: String, attribute: "data-m" })
], _t.prototype, "dataM", 2);
Wt([
  h({ type: String, attribute: "data-nav-label" })
], _t.prototype, "navLabel", 2);
_t = Wt([
  g("uhf-global-nav-desktop")
], _t);
var Si = Object.defineProperty, $i = Object.getOwnPropertyDescriptor, Vt = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? $i(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Si(t, e, r), r;
};
let St = class extends f {
  constructor() {
    super(), this.solo = !1, this.dataM = "", this.menuLabel = "", this.contextualNavItems = [], this.tooltipHasFocus = !1, this.tooltipHasPointer = !1, this.tooltipDismissed = !1, this.onStateChanged = (s) => {
      var e;
      const t = s.detail;
      if (((e = t.mobileState) == null ? void 0 : e.isGlobalNavOpen) !== void 0) {
        const i = t.mobileState.isGlobalNavOpen;
        this.updateToggleState(i), i || this.keyboardController.deafen();
      }
    }, this.handleOutsideClick = (s) => {
      this.stateController.getState().mobileState.isGlobalNavOpen && !this.contains(s.target) && this.toggle();
    }, this.handlePopoutOpened = (s) => {
      s.stopPropagation(), this.keyboardController.focusController.focusFirstMenuItem(), this.keyboardController.listen();
    }, this.getContextualNavItems = () => {
      let s = document.querySelectorAll("uhf-popout.uhf-contextual-nav-popout > ul > li");
      return Array.from(s).map((t) => t.cloneNode(!0));
    }, this.toggle = () => {
      let s = !this.stateController.getState().mobileState.isGlobalNavOpen;
      this.stateController.setState((t) => ({ mobileState: { ...t.mobileState, isGlobalNavOpen: s } }));
    }, this.updateToggleState = (s) => {
      const t = this.querySelector("button.uhf-nav-button");
      t && t.setAttribute("aria-expanded", String(s));
      const e = this.querySelector("button.uhf-nav-button uhf-icon");
      e && e.setAttribute("iconName", s ? "Cancel" : "GlobalNavButton"), s && (this.tooltipDismissed = !0), this.updateTooltipVisibility();
      const i = this.querySelector("uhf-popout.uhf-global-nav-popout");
      i && (s ? i.setAttribute("open", "") : i.removeAttribute("open"));
    }, this.updateTooltipVisibility = () => {
      const s = this.querySelector(".uhf-global-nav-tooltip");
      s && (s.hidden = !this.isTooltipVisible);
    }, this.handleTooltipFocusChange = (s) => {
      this.tooltipHasFocus = s.type === "focus", this.tooltipHasFocus && (this.tooltipDismissed = !1), this.updateTooltipVisibility();
    }, this.handleTooltipPointerChange = (s) => {
      this.tooltipHasPointer = s.type === "mouseenter", this.tooltipHasPointer && (this.tooltipDismissed = !1), this.updateTooltipVisibility();
    }, this.handleTooltipKeydown = (s) => {
      s.key === "Escape" && this.isTooltipVisible && (this.tooltipDismissed = !0, this.updateTooltipVisibility());
    }, this.getItems = () => super.getChildren().map((s) => u`<li>${s}</li>`), this.stateController = new Z(this), this.keyboardController = new ce(this, {
      onEscape: () => {
        var s;
        this.toggle(), (s = this.querySelector("button.uhf-nav-button")) == null || s.focus();
      },
      onTab: (s, t) => {
        if (t.shiftKey)
          s.focusedIndex <= 0 ? this.toggle() : (t.preventDefault(), s.focusPreviousItem());
        else {
          const e = s.getItemCount();
          s.focusedIndex >= e - 1 ? this.toggle() : (t.preventDefault(), s.focusNextItem());
        }
      }
    }, "uhf-popout.uhf-global-nav-popout");
  }
  connectedCallback() {
    var s;
    super.connectedCallback(), document.addEventListener("click", this.handleOutsideClick), document.addEventListener("keydown", this.handleTooltipKeydown), this.addEventListener(U.POSITION_CALCULATED, this.handlePopoutOpened), this.addEventListener(O.STATE_CHANGED, this.onStateChanged), this.solo && ((s = document.querySelector("div.uhf-header-l1")) == null || s.classList.add("hidden"), this.loadContextualNavItems());
  }
  disconnectedCallback() {
    document.removeEventListener("click", this.handleOutsideClick), document.removeEventListener("keydown", this.handleTooltipKeydown), this.removeEventListener(U.POSITION_CALCULATED, this.handlePopoutOpened), this.removeEventListener(O.STATE_CHANGED, this.onStateChanged), super.disconnectedCallback();
  }
  async loadContextualNavItems() {
    await this.updateComplete;
    const s = document.querySelector("uhf-contextual-nav-mobile");
    if (s != null && s.updateComplete && await s.updateComplete, this.contextualNavItems = this.getContextualNavItems(), this.contextualNavItems.length > 0) {
      const t = this.querySelector("uhf-popout.uhf-global-nav-popout ul");
      if (t) {
        const e = document.createDocumentFragment();
        this.contextualNavItems.forEach((i) => e.appendChild(i)), t.prepend(e);
      }
    }
  }
  get isTooltipVisible() {
    return (this.tooltipHasFocus || this.tooltipHasPointer) && !this.tooltipDismissed && !this.stateController.getState().mobileState.isGlobalNavOpen;
  }
  render() {
    const s = this.stateController.getState().mobileState.isGlobalNavOpen;
    return u`
            <span
                class="uhf-global-nav-trigger"
                @mouseenter=${this.handleTooltipPointerChange}
                @mouseleave=${this.handleTooltipPointerChange}
            >
                <button
                    class="uhf-nav-item uhf-nav-button"
                    @click=${this.toggle}
                    @focus=${this.handleTooltipFocusChange}
                    @blur=${this.handleTooltipFocusChange}
                    aria-label=${this.menuLabel}
                    aria-expanded=${String(s)}
                    data-m=${this.dataM}
                >
                    <uhf-icon iconName=${s ? "Cancel" : "GlobalNavButton"} size=20></uhf-icon>
                </button>
                <span
                    class="uhf-global-nav-tooltip"
                    role="tooltip"
                    ?hidden=${!this.isTooltipVisible}
                >${this.menuLabel}</span>
            </span>
            <uhf-popout 
                class="uhf-global-nav-popout" 
                targetSelector="button.uhf-nav-button" 
                positions="bottom"
                ?open=${s}
                itemscope
                itemtype="https://schema.org/SiteNavigationElement"
            >
                <ul>
                    ${this.getItems()}
                </ul>
            </uhf-popout>
        `;
  }
};
Vt([
  h({ type: Boolean })
], St.prototype, "solo", 2);
Vt([
  h({ type: String, attribute: "data-m" })
], St.prototype, "dataM", 2);
Vt([
  h({ type: String, attribute: "menu-label" })
], St.prototype, "menuLabel", 2);
St = Vt([
  g("uhf-global-nav-mobile")
], St);
var Ai = Object.getOwnPropertyDescriptor, Ei = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Ai(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = n(r) || r);
  return r;
};
let Fe = class extends f {
  constructor() {
    super(), this.initCookieBanner = () => {
      window.WcpConsent.init(this.contextController.locale, "msccBannerV2", (s, t) => {
        window.siteConsent = t, t.isConsentRequired && this.manageFooter(t);
      });
    }, this.manageFooter = async (s) => {
      var i;
      const t = document.querySelector("uhf-footer-menu");
      if (!t) {
        console.error("[UHF] Unable to load manage cookies button: uhf-footer-menu element not found");
        return;
      }
      await t.updateComplete;
      let e = (i = document.getElementById("uhf-Footer_ManageCookies")) == null ? void 0 : i.parentElement;
      if (e) {
        e.classList.remove("hidden");
        let r = e.getElementsByTagName("a")[0];
        r && r.addEventListener("click", this.manageConsent.bind(this, s));
      } else
        console.error("[UHF] Unable to load manage cookies button: Footer item with id uhf-Footer_ManageCookies not found");
    }, this.manageConsent = (s, t) => {
      t.preventDefault(), s.manageConsent();
    }, this.contextController = new H(this);
  }
  firstUpdated() {
    window.WcpConsent ? this.initCookieBanner() : is(() => !!window.WcpConsent, this.initCookieBanner, 1e3, 100, 50, "Unable to load WcpConsent: WcpConsent is not defined");
  }
  render() {
    return u`
            <div id="msccBannerV2"></div>
        `;
  }
};
Fe = Ei([
  g("uhf-cookie-banner")
], Fe);
var xi = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, y = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Ti(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && xi(t, e, r), r;
};
const qe = "uhf_hide_promo_banner", Oi = "uhf_hide_epb", Ge = 7;
let m = class extends f {
  constructor() {
    super(), this.logoUrl = "", this.title = "", this.paragraph = "", this.actionText = "", this.actionUrl = "", this.actionAriaLabel = "", this.dismissText = "No thanks", this.dismissAriaLabel = "Dismiss promo banner", this.logoAltText = "", this.cookieExpiry = Ge, this.targetBrowser = "all", this.showOnMobile = !1, this.forceVisible = !1, this.bannerConfig = "", this.isVisible = !1, this.isAnimatingOut = !1, this.isAnimatingIn = !1, this.selectedConfig = null, this.hasTriggeredEntranceAnimation = !1, this.onBreakpointChanged = () => {
      this.updateBannerVisibility();
    }, this.handleDismiss = () => {
      this.isAnimatingOut = !0, this.trackDismissal();
    }, this.handleAnimationEnd = () => {
      this.isAnimatingOut && (this.setCookieOnRootDomain(qe, "true", "/", this.cookieExpiry), this.isVisible = !1, this.isAnimatingOut = !1, this.dispatchEvent(new CustomEvent("banner-closed", {
        bubbles: !0,
        composed: !0,
        detail: { height: this.getHeight() }
      }))), this.isAnimatingIn && (this.isAnimatingIn = !1);
    }, this.handleImageError = (s) => {
    }, this.breakpointController = new x(this), this.contextController = new H(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.processConfig(), this.updateBannerVisibility(), this.addEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged);
  }
  disconnectedCallback() {
    this.removeEventListener(_.BREAKPOINT_CHANGED, this.onBreakpointChanged), super.disconnectedCallback();
  }
  /**
   * Process the banner-config JSON and select appropriate banner config.
   * Banner data must come from Alpine CMS - no fallbacks in production.
   */
  processConfig() {
    if (this.bannerConfig)
      try {
        const s = JSON.parse(this.bannerConfig);
        if (!Array.isArray(s) || s.length === 0)
          return;
        const t = s.filter((e) => {
          const i = typeof e.browser == "string", r = typeof e.title == "string" || typeof e.paragraph == "string";
          return i && r;
        });
        if (t.length === 0)
          return;
        this.selectedConfig = this.filterAndSelectBanner(t), this.selectedConfig && this.applyConfig(this.selectedConfig);
      } catch {
      }
  }
  /**
   * Filter banner configs by browser and Windows 10 requirement (matches legacy logic)
   */
  filterAndSelectBanner(s) {
    const t = m.isWindows10(), e = m.getCurrentBrowser();
    if (!e) {
      const r = s.filter(
        (o) => {
          var n, a;
          return ((n = o.browser) == null ? void 0 : n.toLowerCase()) === "all" && (t || ((a = o.extensionType) == null ? void 0 : a.toLowerCase()) !== "windows10only".toLowerCase());
        }
      );
      return r.length > 0 ? r[0] : null;
    }
    if (e === "firefox" || e === "edge" || e === "chrome" || e === "ie11") {
      const r = s.filter(
        (o) => {
          var n, a, l, c;
          return (((n = o.browser) == null ? void 0 : n.toLowerCase()) === e || ((a = o.browser) == null ? void 0 : a.toLowerCase()) === "non-anaheim" || ((l = o.browser) == null ? void 0 : l.toLowerCase()) === "all") && (t || ((c = o.extensionType) == null ? void 0 : c.toLowerCase()) !== "windows10only".toLowerCase());
        }
      );
      return r.length > 0 ? r[0] : null;
    } else if (e === "anaheim") {
      const r = s.filter(
        (o) => {
          var n, a, l;
          return (((n = o.browser) == null ? void 0 : n.toLowerCase()) === e || ((a = o.browser) == null ? void 0 : a.toLowerCase()) === "all") && (t || ((l = o.extensionType) == null ? void 0 : l.toLowerCase()) !== "windows10only".toLowerCase());
        }
      );
      return r.length > 0 ? r[0] : null;
    } else if (e === "opera" || e === "brave") {
      const r = s.filter(
        (o) => {
          var n, a, l, c;
          return (((n = o.browser) == null ? void 0 : n.toLowerCase()) === e || ((a = o.browser) == null ? void 0 : a.toLowerCase()) === "non-anaheim" || ((l = o.browser) == null ? void 0 : l.toLowerCase()) === "all") && (t || ((c = o.extensionType) == null ? void 0 : c.toLowerCase()) !== "windows10only".toLowerCase());
        }
      );
      return r.length > 0 ? r[0] : null;
    }
    const i = s.filter(
      (r) => {
        var o, n;
        return ((o = r.browser) == null ? void 0 : o.toLowerCase()) === "all" && (t || ((n = r.extensionType) == null ? void 0 : n.toLowerCase()) !== "windows10only".toLowerCase());
      }
    );
    return i.length > 0 ? i[0] : null;
  }
  /**
   * Apply selected config to component properties
   */
  applyConfig(s) {
    var e;
    const t = this.contextController.headerTheme === $.DARK;
    this.title = s.title || "", this.paragraph = s.paragraph || "", this.actionText = s.actionLinkText || "", this.actionUrl = s.extensionUrl || "", this.actionAriaLabel = s.actionLinkAriaLabel || "", this.dismissText = s.dismissText || "No thanks", this.dismissAriaLabel = s.dismissAriaLabel || "Dismiss promo banner", this.cookieExpiry = s.cookieExpiration || Ge, this.targetBrowser = s.browser || "all", this.logoUrl = t ? s.logoUrlDarkTheme || "" : s.logoUrlLightTheme || "", this.logoAltText = ((e = s.logoAltText) == null ? void 0 : e.trim()) || this.title || "", this.updateWrapperThemeClass();
  }
  updateWrapperThemeClass() {
    this.classList.remove("theme-light-wrapper", "theme-dark-wrapper"), this.classList.add(this.getWrapperThemeClass());
  }
  /**
   * Trigger entrance animation only once to prevent double animation.
   */
  triggerEntranceAnimation() {
    this.hasTriggeredEntranceAnimation || (this.hasTriggeredEntranceAnimation = !0, this.isAnimatingIn = !0, this.updateWrapperThemeClass());
  }
  static isWindows10() {
    return navigator.userAgent.toLowerCase().indexOf("windows nt 10.0") >= 0;
  }
  /**
   * Check if the banner should be visible based on browser, device, and cookie.
   * Banner only shows if Alpine CMS provides valid config data.
   */
  updateBannerVisibility() {
    if (this.forceVisible) {
      if (!this.title && !this.paragraph) {
        this.isVisible = !1;
        return;
      }
      this.isVisible = !0, this.triggerEntranceAnimation();
      return;
    }
    if (this.getCookie(qe) === "true" || this.getCookie(Oi) === "true") {
      this.isVisible = !1;
      return;
    }
    if (!this.showOnMobile && this.breakpointController.isMobile) {
      this.isVisible = !1;
      return;
    }
    if (this.bannerConfig && !this.selectedConfig) {
      this.isVisible = !1;
      return;
    }
    if (!this.bannerConfig && this.targetBrowser !== "all") {
      const s = m.getCurrentBrowser();
      if (!this.matchesBrowser(s, this.targetBrowser)) {
        this.isVisible = !1;
        return;
      }
    }
    if (!this.title && !this.paragraph) {
      this.isVisible = !1;
      return;
    }
    this.isVisible = !0, this.triggerEntranceAnimation();
  }
  /**
   * Check if current browser matches target browser config
   */
  matchesBrowser(s, t) {
    return t === "all" ? !0 : t === "non-anaheim" ? s !== "anaheim" : s === t;
  }
  /**
   * Detect Edge Chromium browser
   */
  static isEdgeChromium() {
    return m.includesUserAgentDataBrand("microsoft edge");
  }
  /**
   * Detect Brave browser
   */
  static isBrave() {
    return !!window.navigator.brave || m.includesUserAgentDataBrand("brave");
  }
  /**
   * Check if UserAgentData brands includes specified brand
   */
  static includesUserAgentDataBrand(s) {
    const t = window.navigator;
    if (t.userAgentData) {
      const e = t.userAgentData.brands;
      for (let i = 0; i < e.length; i++)
        if (e[i].brand.toLowerCase() === s.toLowerCase())
          return !0;
    }
    return !1;
  }
  /**
   * Detect Opera browser
   */
  static isOpera() {
    const s = window.navigator;
    return !!window.opr || s.userAgent.toLowerCase().indexOf("opr/") >= 0;
  }
  /**
   * Detect current browser type
   */
  static getCurrentBrowser() {
    const s = navigator.userAgent.toLowerCase();
    return m.isEdgeChromium() ? "anaheim" : window.chrome && (window.chrome.webstore || window.chrome.runtime) && s.indexOf("edg") <= -1 ? "chrome" : m.isBrave() ? "brave" : m.isOpera() ? "opera" : window.chrome && s.indexOf("chrome") >= 0 ? "chrome" : typeof window.InstallTrigger < "u" ? "firefox" : s.indexOf("trident") >= 0 && s.indexOf("rv:11") >= 0 ? "ie11" : s.indexOf("edge/") >= 0 ? "edge" : s.indexOf("edg/") >= 0 ? "anaheim" : null;
  }
  /**
   * Get the current height of the banner
   */
  getHeight() {
    return this.getBoundingClientRect().height;
  }
  /**
   * Get cookie value by name
   */
  getCookie(s) {
    var i;
    const e = `; ${document.cookie}`.split(`; ${s}=`);
    return e.length === 2 && ((i = e.pop()) == null ? void 0 : i.split(";").shift()) || null;
  }
  /**
   * Set cookie on the root domain
   */
  setCookieOnRootDomain(s, t, e, i) {
    const r = document.location.hostname.split(".");
    let o = r.pop() || "";
    if (o === "localhost")
      this.setCookie(s, t, e, i);
    else
      for (; this.getCookie(s) !== t && r.length !== 0; ) {
        const n = r.pop();
        n && (o = n + "." + o, this.setCookie(s, t, e, i, o));
      }
  }
  /**
   * Set a cookie
   */
  setCookie(s, t, e, i, r) {
    const o = /* @__PURE__ */ new Date();
    o.setTime(o.getTime() + i * 24 * 60 * 60 * 1e3);
    const n = `expires=${o.toUTCString()}`, a = r ? `domain=${r};` : "";
    document.cookie = `${s}=${t};${n};path=${e};${a}`;
  }
  /**
   * Track banner dismissal via WEDCS
   */
  trackDismissal() {
    typeof window.MscomCustomEvent == "function" && window.MscomCustomEvent("wcs.cn", "PromoBannerDismissed", "wcs.cot", 4);
  }
  /**
   * Get theme-specific classes
   */
  getThemeClass() {
    return this.contextController.headerTheme === $.DARK ? "theme-dark" : "theme-light";
  }
  /**
   * Get wrapper theme class for full-width background
   */
  getWrapperThemeClass() {
    return this.contextController.headerTheme === $.DARK ? "theme-dark-wrapper" : "theme-light-wrapper";
  }
  render() {
    if (!this.isVisible)
      return C;
    const s = this.isAnimatingOut ? "uhf-promo-banner--rollup" : this.isAnimatingIn ? "uhf-promo-banner--rollin" : "";
    return u`
            <div 
                class="uhf-promo-banner ${this.getThemeClass()} ${s}"
                role="region"
                aria-label="Promotional banner"
                @animationend=${this.handleAnimationEnd}
            >
            <div class="uhf-promo-banner__container">
                <div class="uhf-promo-banner__content">
                    ${this.logoUrl ? u`
                        <img 
                            class="uhf-promo-banner__logo" 
                            src="${this.logoUrl}" 
                            alt="${this.logoAltText}"
                            @error=${this.handleImageError}
                        />
                    ` : C}
                    <div class="uhf-promo-banner__text">
                        ${this.title ? u`<span class="uhf-promo-banner__title">${this.title}</span>` : C}
                        ${this.paragraph ? u`<span class="uhf-promo-banner__paragraph">${this.paragraph}</span>` : C}
                    </div>
                </div>
                <div class="uhf-promo-banner__actions">
                    <button
                        class="uhf-promo-banner__dismiss"
                        @click=${this.handleDismiss}
                        aria-label="${this.dismissAriaLabel}"
                        data-m='{"compnm": "UHF", "view": "UHF", "pa": "UniversalHeader", "hn": "PromoBanner", "cN": "PB-dismiss_nonnav", "ecn": "PB-dismiss_nonnav", "ehn": "PromoBanner"}'
                    >
                        ${this.dismissText}
                    </button>
                    ${this.actionUrl && this.actionText.trim().length > 0 ? u`
                        <a 
                            class="uhf-promo-banner__action"
                            href="${this.actionUrl}"
                            aria-label="${this.actionAriaLabel || this.actionText}"
                            data-m='{"compnm": "UHF", "view": "UHF", "pa": "UniversalHeader", "hn": "PromoBanner", "cN": "PB-launch_nav", "ecn": "PB-launch_nav", "ehn": "PromoBanner"}'
                        >
                            ${this.actionText}
                        </a>
                    ` : C}
                </div>
            </div>
            </div>
        `;
  }
};
y([
  h({ type: String, attribute: "logo-url" })
], m.prototype, "logoUrl", 2);
y([
  h({ type: String })
], m.prototype, "title", 2);
y([
  h({ type: String })
], m.prototype, "paragraph", 2);
y([
  h({ type: String, attribute: "action-text" })
], m.prototype, "actionText", 2);
y([
  h({ type: String, attribute: "action-url" })
], m.prototype, "actionUrl", 2);
y([
  h({ type: String, attribute: "action-aria-label" })
], m.prototype, "actionAriaLabel", 2);
y([
  h({ type: String, attribute: "dismiss-text" })
], m.prototype, "dismissText", 2);
y([
  h({ type: String, attribute: "dismiss-aria-label" })
], m.prototype, "dismissAriaLabel", 2);
y([
  h({ type: String, attribute: "logo-alt-text" })
], m.prototype, "logoAltText", 2);
y([
  h({ type: Number, attribute: "cookie-expiry" })
], m.prototype, "cookieExpiry", 2);
y([
  h({ type: String, attribute: "target-browser" })
], m.prototype, "targetBrowser", 2);
y([
  h({ type: Boolean, attribute: "show-on-mobile" })
], m.prototype, "showOnMobile", 2);
y([
  h({ type: Boolean, attribute: "force-visible" })
], m.prototype, "forceVisible", 2);
y([
  h({ type: String, attribute: "banner-config" })
], m.prototype, "bannerConfig", 2);
y([
  R()
], m.prototype, "isVisible", 2);
y([
  R()
], m.prototype, "isAnimatingOut", 2);
y([
  R()
], m.prototype, "isAnimatingIn", 2);
y([
  R()
], m.prototype, "selectedConfig", 2);
m = y([
  g("uhf-promo-banner")
], m);
var Li = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, ut = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Pi(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Li(t, e, r), r;
};
let Y = class extends f {
  constructor() {
    super(), this.text = "", this.url = "", this.linkLabel = "", this.backgroundColor = "", this.isVisible = !0, this.contextController = new H(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.isVisible = !!this.text;
  }
  /**
   * Get theme-specific classes
   */
  getThemeClass() {
    return this.contextController.headerTheme === $.DARK ? "theme-dark" : "theme-light";
  }
  /**
   * Get custom background style if provided
   */
  getBackgroundStyle() {
    return this.backgroundColor ? `background-color: ${this.backgroundColor};` : "";
  }
  render() {
    if (!this.isVisible || !this.text)
      return C;
    const s = this.linkLabel.trim(), t = this.url ? u`<a href="${this.url}" aria-label="${s || this.text}">${this.text} &gt;</a>` : u`<span>${this.text}</span>`;
    return u`
            <div 
                class="uhf-site-promo-banner ${this.getThemeClass()}"
                style="${this.getBackgroundStyle()}"
                role="region"
                aria-label="Site promotional banner"
            >
                ${t}
            </div>
        `;
  }
};
ut([
  h({ type: String })
], Y.prototype, "text", 2);
ut([
  h({ type: String })
], Y.prototype, "url", 2);
ut([
  h({ type: String, attribute: "data-link-label" })
], Y.prototype, "linkLabel", 2);
ut([
  h({ type: String, attribute: "background-color" })
], Y.prototype, "backgroundColor", 2);
ut([
  R()
], Y.prototype, "isVisible", 2);
Y = ut([
  g("uhf-site-promo-banner")
], Y);
var Ii = Object.defineProperty, Ui = Object.getOwnPropertyDescriptor, cs = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Ui(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && Ii(t, e, r), r;
};
let ne = class extends f {
  constructor() {
    super(), this.condition = !1;
  }
  render() {
    return this.condition ? super.getChildrenBySlot("treatment") : super.getChildrenBySlot("control");
  }
};
cs([
  h({ type: Boolean })
], ne.prototype, "condition", 2);
ne = cs([
  g("uhf-feature-gate")
], ne);
window.registerUhfTelemetryRedaction = We;
We();
export {
  $ as T,
  Xe as c,
  ar as s
};

// SIG // Begin signature block
// SIG // MIIo4gYJKoZIhvcNAQcCoIIo0zCCKM8CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // Yon8UkyS6UqePnyd99ifT0+tlzMsoJpUBsuZSOerlIeg
// SIG // gg3SMIIGvDCCBKSgAwIBAgITMwAAANLYbEaxncayoAAA
// SIG // AAAA0jANBgkqhkiG9w0BAQwFADBiMQswCQYDVQQGEwJV
// SIG // UzEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MTMwMQYDVQQDEypBenVyZSBSU0EgUHVibGljIFNlcnZp
// SIG // Y2VzIENvZGUgU2lnbmluZyBQQ0EwHhcNMjYwMzA1MTkw
// SIG // NjE4WhcNMjcwMzAzMTkwNjE4WjCBgjELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEsMCoGA1UEAxMjQXp1cmUgUHVibGljIFNl
// SIG // cnZpY2VzIFJTQSBDb2RlIFNpZ24wggGiMA0GCSqGSIb3
// SIG // DQEBAQUAA4IBjwAwggGKAoIBgQCzWKZG9P7t0hKBimeC
// SIG // eMptumOPqwHZzspivt8o8D+6mS0L1WzQjEvrAtSYvzQI
// SIG // MJXDWAf7ItbG2MxPPOVPtHNQaA8+mr9GdNgsb9bJM2hK
// SIG // 4y4P1elGhGGX8NimfQZW9TeSAZsYe0OfRjMdwIphuyjh
// SIG // 8kbARy3/mnDliXCdGj0u1Ft1qw87+bT6FlZ8Pv+OykUW
// SIG // /WAM28r56qu1C5qm6Xx5LvRBxzk+i4K+Mu17yN3ALlad
// SIG // 5w9uetGBa3WK1eN8ftCd2K0SV0AzpPVcuWbuYhhdifMW
// SIG // trtg4r7pgWxQDBu6gSicXRt7oBFY56ilLxNqzs+UrhTq
// SIG // Kq1taSw1qC3s0KzyxEC/Bz2+OFjnfbeZQxF2dMJ1r2Vw
// SIG // E5nW65uckXepwgofsKgs806jTkt4Br8Kd0PAwmC9qF4T
// SIG // xereCls2gIQmvAJxkACZnCbXGJp7XZ6Xsw+nykQzpiov
// SIG // dlNLwTm/zzkDQSws7z+7m6jZEB3d7hiOqsuz47MEfmUJ
// SIG // qluOioDD6d8CAwEAAaOCAcgwggHEMA4GA1UdDwEB/wQE
// SIG // AwIHgDAfBgNVHSUEGDAWBggrBgEFBQcDAwYKKwYBBAGC
// SIG // N1sBATAdBgNVHQ4EFgQUYqV4NR+DJwhQtHAKZqMo4HsM
// SIG // aRkwVAYDVR0RBE0wS6RJMEcxLTArBgNVBAsTJE1pY3Jv
// SIG // c29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEW
// SIG // MBQGA1UEBRMNNDY5OTgxKzUwNzE4NzAfBgNVHSMEGDAW
// SIG // gBTxL7qRFnzefVInMfV6+9VYWWk6PTBvBgNVHR8EaDBm
// SIG // MGSgYqBghl5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2NybC9BenVyZSUyMFJTQSUyMFB1YmxpYyUy
// SIG // MFNlcnZpY2VzJTIwQ29kZSUyMFNpZ25pbmclMjBQQ0Eu
// SIG // Y3JsMHwGCCsGAQUFBwEBBHAwbjBsBggrBgEFBQcwAoZg
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9j
// SIG // ZXJ0cy9BenVyZSUyMFJTQSUyMFB1YmxpYyUyMFNlcnZp
// SIG // Y2VzJTIwQ29kZSUyMFNpZ25pbmclMjBQQ0EuY3J0MAwG
// SIG // A1UdEwEB/wQCMAAwDQYJKoZIhvcNAQEMBQADggIBAKMM
// SIG // UX0YVUUCTqE50xhl9Pk0hRfkLD14eIdvc+/cwwgKs2mR
// SIG // DMG66/dGboyhlj1pogVsnvh0ByqJoFQYP/bqzQIgXJZM
// SIG // 778xRQ3b5REzU+6sEFdnDBdWe2lT3SoEZD4gPGcqj6BZ
// SIG // w/1dJDLeenv9hUIqZMGE28IZx26CIVXoieUq9Bj69Z0n
// SIG // o0bzuzx20QwOqZ6yhiUT9UtOzSF55T3DJlx3COEYfQQP
// SIG // Oomvj2V6lIVpum3v7OFSjGzTJaCcY/JKYqDHrcDCdmau
// SIG // 3zAiCMkNJk5Nmsg5BPjes7MML/cC+6fSs+L3N1c8ilGt
// SIG // Y7ghulNnBnJv+UZuD7ig5gANLk4wK/I5Y2BtxAtNowsy
// SIG // nthb9Tnck5nYJ6i3HyWUc24TuXXAF++dG+H8Yes16vJL
// SIG // HqH5b2xywVJelLFpYOj7kvGT8jJFZKUAJe1c//D1rBkA
// SIG // Y+BT39mkAEd81B59pTHOwVS9uVxcwGa3yEXryhWbh44q
// SIG // LQE9kfh8bypq2vLeSYZQX5kn3Lxyzk+W41MmabZHSu2R
// SIG // X7ve201BkkpGuq8PL7IdQT8uba6Wqv7Pewiz4HsUfc0l
// SIG // +PhcXgfn1ArJiUW1Sww92sLFk7C0UCufMjtxvxMwkfJc
// SIG // edZWVele21OzOEXSzFf5OkPg6ne7JOvZeJYmCaFITJE+
// SIG // 9ha6TSs+TczP61FR7+ptMIIHDjCCBPagAwIBAgITMwAA
// SIG // AAKyxJOIeFns0wAAAAAAAjANBgkqhkiG9w0BAQwFADBb
// SIG // MQswCQYDVQQGEwJVUzEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSwwKgYDVQQDEyNNaWNyb3NvZnQg
// SIG // UlNBIFNlcnZpY2VzIFJvb3QgQ0EgMjAyMTAeFw0yMTA5
// SIG // MDIxNzQxMTlaFw0zNjA5MDIxNzUxMTlaMGIxCzAJBgNV
// SIG // BAYTAlVTMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xMzAxBgNVBAMTKkF6dXJlIFJTQSBQdWJsaWMg
// SIG // U2VydmljZXMgQ29kZSBTaWduaW5nIFBDQTCCAiIwDQYJ
// SIG // KoZIhvcNAQEBBQADggIPADCCAgoCggIBAKXd/Sy91nFg
// SIG // seVJOFgeRhVxrcahyp1YGSN0FpOEgEREVb3ND/QgI7I0
// SIG // yd7XG6OE8Vomr5FMxvK8TvJ4Lc6LP9BDz2GSa1M0LlzH
// SIG // KX757/24C0ZndzccA1qQi00+BmmOr4plmxRzTFv4Phdw
// SIG // 8yBPF9GDvClqV8ASvvbitfjaD7dVPOFLb7N7fvt/qWog
// SIG // GN5eis0FXCqVJdmPZZaX2h4iG0otsAhfq8yvSlJ0YwO4
// SIG // i5GDeLQwTsMN1Rf2UAHQKCUYkFsLSQ0mqbaRbDZhB+2p
// SIG // FL/q/c2a6hlHLnapYyfwlNFXkDhwAFWEzfwFHER2oR42
// SIG // UayfN9tsO/p2tWk33CrnHdndJDrIZ6oQ3D+Ngol/TR8B
// SIG // AgXCIM6se6YlLDTsxRwh9QUDq7KVhKy58HGKJUqwgIW0
// SIG // E7cvlzUl0Hft/ebhALZyFDkhof9C5Cq4c/486XLjQq0n
// SIG // buKsFNhQU0yvABR3eohw63Kps66Uma48oE0JmqOxmzrP
// SIG // vrITYcsnByKleiHn+4yq+Ts/KrtqkQwQcuikMPrZwXCt
// SIG // sYkxMUyUn8gr8oew22WDeIQECAM1Cz9TcdJadsrToKqX
// SIG // Qa2bAn/AABAYyogPPONfGvojTI3DlYD42etMa/gPeZJa
// SIG // vX+z7x8d/4eYBnJ9WFSi9q0v+vLOGc3fyM2KQtq5eVbH
// SIG // X5rVyWc6bJ35AgMBAAGjggHCMIIBvjAQBgkrBgEEAYI3
// SIG // FQEEAwIBADAdBgNVHQ4EFgQU8S+6kRZ83n1SJzH1evvV
// SIG // WFlpOj0wVAYDVR0gBE0wSzBJBgRVHSAAMEEwPwYIKwYB
// SIG // BQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTAZBgkrBgEE
// SIG // AYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYw
// SIG // DwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBQODLFk
// SIG // ab0tsdVrJqZH6lZOgMPtijBmBgNVHR8EXzBdMFugWaBX
// SIG // hlVodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBSU0ElMjBTZXJ2aWNlcyUy
// SIG // MFJvb3QlMjBDQSUyMDIwMjEuY3JsMHMGCCsGAQUFBwEB
// SIG // BGcwZTBjBggrBgEFBQcwAoZXaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tL3BraW9wcy9jZXJ0cy9NaWNyb3NvZnQl
// SIG // MjBSU0ElMjBTZXJ2aWNlcyUyMFJvb3QlMjBDQSUyMDIw
// SIG // MjEuY3J0MA0GCSqGSIb3DQEBDAUAA4ICAQBin7PMBnXj
// SIG // nIJ0x++LnudLDWWnZ8dZmJ14DuZfUss/doUThLAM4crr
// SIG // HaTbJoulUUELNd2AnOpX/Z4tenUMT3sjYIdPYyJfIYWP
// SIG // RqfI6Nbz+JVK7RRvn2nl5EEMIuRE6UKS9ZGBbf02a7sb
// SIG // 04E/7BN/NhhrmtS/tVFjfRrrVh9zXku45rqWuCwUTzg3
// SIG // EqxKQ8OGbtjBQtq/Syb/clm5BHsoh3XhMnb9VLv3G1du
// SIG // Nf90FL5/o88XZ4L18nx1lfky2nllY4HIA8PK8AarqAW4
// SIG // iKSTA3EGqn8s/47WtQKT+qED2YbZXVOYL+L7vQDCnFbw
// SIG // hgAx6ucuMz7Ae1rqibg3AjsC7U5M3oA/vqAHDKDA3mdM
// SIG // 5D6L/ZEdQgaG20HhUOSQ+CiQD3TyHSiVCfVMuTv83IiK
// SIG // Cni3LW/23tHC2tbN57rlhMcoyjIi+IVd7j7s41MFBaDw
// SIG // JrmfXn/YM+lR/5QqvO7zWAbbr/XU531v3jr/jBilmrqt
// SIG // 6U/b7y8TXyA9nYxV9iSMFmcbyIi2xgdcAHhxnpXcvcvy
// SIG // FWET6YiJiyeSJZwwJv8gwXiBF+Zh0IHArl6KVsbAdsAT
// SIG // uP1TCEBpPynXZmkviIEWPtnv315ZjTC7nPoOpSnOVaO7
// SIG // wZztrOefZunI5fBxw7mG1oyoRnADZawiFsVo9J/cDu15
// SIG // ErRCfDQRhwSiBTGCGmgwghpkAgEBMHkwYjELMAkGA1UE
// SIG // BhMCVVMxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEzMDEGA1UEAxMqQXp1cmUgUlNBIFB1YmxpYyBT
// SIG // ZXJ2aWNlcyBDb2RlIFNpZ25pbmcgUENBAhMzAAAA0ths
// SIG // RrGdxrKgAAAAAADSMA0GCWCGSAFlAwQCAQUAoIGQMBkG
// SIG // CSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMC8GCSqGSIb3
// SIG // DQEJBDEiBCBxvHynk0sTAByOj2ABmNXv55RvQtKa1+/W
// SIG // G7ptFG4m7jBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBgChlf6GW
// SIG // J74v2r5HlmLBGUzq2SkoiORguxz0gIkwZMeSE/wP3k1N
// SIG // NVB1epGdSGoOwXza1DnNNWOj1l92Y03claFOybFDc/2+
// SIG // srIa91ensmA0M/BvXXP0LK8omsejEo6DC3JqvMeU9Nfq
// SIG // C/cwgFpuzLvd5EWAFvcVhVCNVA1Be6YcBMiiMurT0rYa
// SIG // aB+Z9jhsjoZqz4CG49wgQdJlgxnJO3f+j2ChI0e/bo2F
// SIG // W7TtxJSUv7bkVpIzXvh8HT0Xtt1NZ9kR7D+L6nhyfL/3
// SIG // LofA/jvkYjxn7+UmjV1ERWRbnXId4TL10Q4nKnxk8xzo
// SIG // A81wcHkLV61vlEFCKkrVLjcSNZr9sgXid5dZJ4isd2BL
// SIG // rA46N9TG3PQqrtAR3ZY3KyXyXeQ3xbgWJnln24Ud8LZm
// SIG // x728iv94g4NWvJ+ce+41NZAh8U1n8TcexAj0mdjjXFDR
// SIG // s07GVkgsnI2VL3VfrFDxpxA2AqGuxT68Pxv0nlqAR/aS
// SIG // W4+MvpPsoMTuBGlfj3H0/qGCF60wghepBgorBgEEAYI3
// SIG // AwMBMYIXmTCCF5UGCSqGSIb3DQEHAqCCF4YwgheCAgED
// SIG // MQ8wDQYJYIZIAWUDBAIBBQAwggFaBgsqhkiG9w0BCRAB
// SIG // BKCCAUkEggFFMIIBQQIBAQYKKwYBBAGEWQoDATAxMA0G
// SIG // CWCGSAFlAwQCAQUABCChjK0kAwbZvfo1a/oHbnsYDLBO
// SIG // v3dt4szMhkh7Iy3upgIGatuCxJGuGBMyMDI2MTEwMjE0
// SIG // MDg1MS40MzFaMASAAgH0oIHZpIHWMIHTMQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNyb3NvZnQgSXJl
// SIG // bGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJzAlBgNVBAsT
// SIG // Hm5TaGllbGQgVFNTIEVTTjozNjA1LTA1RTAtRDk0NzEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZaCCEfswggcoMIIFEKADAgECAhMzAAACE7BDNWbP
// SIG // r5XoAAEAAAITMA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwMB4XDTI1MDgxNDE4NDgx
// SIG // N1oXDTI2MTExMzE4NDgxN1owgdMxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5k
// SIG // IE9wZXJhdGlvbnMgTGltaXRlZDEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjM2MDUtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 9Jl64LoZxDINSFgz+9KS5Ozv5m548ePVzc9RXWe4T4/M
// SIG // plfga4eq12RGdp5cVvnjde5vxfq2ax/jnu7vUW4rZN4m
// SIG // OUm5vh+kcYsQlYQ53FwgIB3nEjcQHomrG3mZe/ozjFSA
// SIG // r6JbglKtIeAySPzAcFzyAer5lLNUHBEvQMM8BOjMyapC
// SIG // vh0xsg4xKFcVEJQLKEfCGBffMZI/amutHFb3CUTZ7aVp
// SIG // G2KHEFUNlZ1vwMKvxXTPRDnbwPGzyyqJJznfsLNHQ4vX
// SIG // t2ttS1PeCoGI0hN1Peq8yGsIXM9oocwC06DGNSM/4LAx
// SIG // 2uKvwmUn6NwLc0+tmvny6w28rZLejskRfnVWofEv1mWY
// SIG // 0jHUnHrwSGBS8gVP9gcBs6P5g0OpJPMfxdUkHXRkcMPP
// SIG // W0hIP8NbW8W5Sup8HuwnSKbjpyAlGBUdM/V5rZb0sZmk
// SIG // n714r6ULGK+cLLAN6R3FhX6N0nj64F27LTK2BbS0pJZa
// SIG // Xjo0eDNz1QcxeIFLUgF+RBsLYDn8E8cCkexK8Nlt3Gi9
// SIG // zJf55w6UfTZ+kwTMxMqFxh7+Tfx7+aBObZ+nx961Atiq
// SIG // Ay7zVV69o/LWRdKPZdvZn9ESyGbTnPfjkBERv22prSlE
// SIG // TlRwzP6bmEVOKWLWVwxuwh7bUWUuUb1cj93zvttQYGQa
// SIG // t5E9ALLJNmlvLKCskB7raLsCAwEAAaOCAUkwggFFMB0G
// SIG // A1UdDgQWBBQTnhBKx+FryphQWMRipH49sMFAOjAfBgNV
// SIG // HSMEGDAWgBSfpxVdAF5iXYP05dJlpxtTNRnpcjBfBgNV
// SIG // HR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jvc29m
// SIG // dC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBUaW1l
// SIG // LVN0YW1wJTIwUENBJTIwMjAxMCgxKS5jcmwwbAYIKwYB
// SIG // BQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8vd3d3
// SIG // Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01pY3Jv
// SIG // c29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEp
// SIG // LmNydDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQMMAoG
// SIG // CCsGAQUFBwMIMA4GA1UdDwEB/wQEAwIHgDANBgkqhkiG
// SIG // 9w0BAQsFAAOCAgEAgmxaJrGqQ2D6UJhZ6Ql2SZFOaNuG
// SIG // bW3LzB+ES+l2BB1MJtBRSFdi/hVY33NpxsJQhQ5TLVp0
// SIG // DXYOkIoPQc17rH+IVhemO8jCt+U6I1TIw6cR7c+tEo/J
// SIG // jp6EqEU1c4/mraMjgHhQ+raC/OUAm98A1r4bIPHtsBmL
// SIG // ROGmeE5XLIFaBIZWHvh2COXITKObXVd5wGtJ1dZZdwaH
// SIG // ACXF506jta+uoUdyzAeuNlTPLTrZ8nyhxGwk9Vh6eiDQ
// SIG // 7CQMWSSa8DJS9PUXjeoi9vTdS7ZMXqu+tv6Qz3xtoBF5
// SIG // +YFK4uE+miGs90Fxm0VK2lWrmFhjkRl5zyoHOdwG7spN
// SIG // YkDomCPNWIudUQmQYKpt/Hsspfcb+xpnWIDQdMzgE8pj
// SIG // 1vpwLgWEnH7LtT4dZCeoDo9PK40RxBD8kKJ769ngkEwf
// SIG // wCD2EX/MQk79eIvOhpnH12GuVByvaKZk5XZvqtPONNwr
// SIG // 8q/qA3877IuWwWgnaeX+prpw0dZ/QLtbGGVrgP+TRQjt
// SIG // +2dcZA5P3X4LwANhiPsy0Ol4XCdj7OxBLFvOzsCPDPaV
// SIG // nkp+dfDFG+NOBir7aqTJ68622pymg1V+6gc/1RvxC/wg
// SIG // vYyG033ecJqv0On0ZRNYr+i/OkwgA3HP1aLD0aHrEpw6
// SIG // lt0263iRkCvrcdcOW8w3jC8TJuaGWyC2S9jEjzgwggdx
// SIG // MIIFWaADAgECAhMzAAAAFcXna54Cm0mZAAAAAAAVMA0G
// SIG // CSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZp
// SIG // Y2F0ZSBBdXRob3JpdHkgMjAxMDAeFw0yMTA5MzAxODIy
// SIG // MjVaFw0zMDA5MzAxODMyMjVaMHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwMIICIjANBgkqhkiG9w0BAQEFAAOC
// SIG // Ag8AMIICCgKCAgEA5OGmTOe0ciELeaLL1yR5vQ7VgtP9
// SIG // 7pwHB9KpbE51yMo1V/YBf2xK4OK9uT4XYDP/XE/HZveV
// SIG // U3Fa4n5KWv64NmeFRiMMtY0Tz3cywBAY6GB9alKDRLem
// SIG // jkZrBxTzxXb1hlDcwUTIcVxRMTegCjhuje3XD9gmU3w5
// SIG // YQJ6xKr9cmmvHaus9ja+NSZk2pg7uhp7M62AW36MEByd
// SIG // Uv626GIl3GoPz130/o5Tz9bshVZN7928jaTjkY+yOSxR
// SIG // nOlwaQ3KNi1wjjHINSi947SHJMPgyY9+tVSP3PoFVZht
// SIG // aDuaRr3tpK56KTesy+uDRedGbsoy1cCGMFxPLOJiss25
// SIG // 4o2I5JasAUq7vnGpF1tnYN74kpEeHT39IM9zfUGaRnXN
// SIG // xF803RKJ1v2lIH1+/NmeRd+2ci/bfV+AutuqfjbsNkz2
// SIG // K26oElHovwUDo9Fzpk03dJQcNIIP8BDyt0cY7afomXw/
// SIG // TNuvXsLz1dhzPUNOwTM5TI4CvEJoLhDqhFFG4tG9ahha
// SIG // YQFzymeiXtcodgLiMxhy16cg8ML6EgrXY28MyTZki1ug
// SIG // poMhXV8wdJGUlNi5UPkLiWHzNgY1GIRH29wb0f2y1BzF
// SIG // a/ZcUlFdEtsluq9QBXpsxREdcu+N+VLEhReTwDwV2xo3
// SIG // xwgVGD94q0W29R6HXtqPnhZyacaue7e3PmriLq0CAwEA
// SIG // AaOCAd0wggHZMBIGCSsGAQQBgjcVAQQFAgMBAAEwIwYJ
// SIG // KwYBBAGCNxUCBBYEFCqnUv5kxJq+gpE8RjUpzxD/LwTu
// SIG // MB0GA1UdDgQWBBSfpxVdAF5iXYP05dJlpxtTNRnpcjBc
// SIG // BgNVHSAEVTBTMFEGDCsGAQQBgjdMg30BATBBMD8GCCsG
// SIG // AQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL0RvY3MvUmVwb3NpdG9yeS5odG0wEwYDVR0l
// SIG // BAwwCgYIKwYBBQUHAwgwGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB/wQF
// SIG // MAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxiaNE9lJBb
// SIG // 186aGMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDovL2Ny
// SIG // bC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMv
// SIG // TWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMuY3JsMFoGCCsG
// SIG // AQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNSb29D
// SIG // ZXJBdXRfMjAxMC0wNi0yMy5jcnQwDQYJKoZIhvcNAQEL
// SIG // BQADggIBAJ1VffwqreEsH2cBMSRb4Z5yS/ypb+pcFLY+
// SIG // TkdkeLEGk5c9MTO1OdfCcTY/2mRsfNB1OW27DzHkwo/7
// SIG // bNGhlBgi7ulmZzpTTd2YurYeeNg2LpypglYAA7AFvono
// SIG // aeC6Ce5732pvvinLbtg/SHUB2RjebYIM9W0jVOR4U3Uk
// SIG // V7ndn/OOPcbzaN9l9qRWqveVtihVJ9AkvUCgvxm2EhIR
// SIG // XT0n4ECWOKz3+SmJw7wXsFSFQrP8DJ6LGYnn8AtqgcKB
// SIG // GUIZUnWKNsIdw2FzLixre24/LAl4FOmRsqlb30mjdAy8
// SIG // 7JGA0j3mSj5mO0+7hvoyGtmW9I/2kQH2zsZ0/fZMcm8Q
// SIG // q3UwxTSwethQ/gpY3UA8x1RtnWN0SCyxTkctwRQEcb9k
// SIG // +SS+c23Kjgm9swFXSVRk2XPXfx5bRAGOWhmRaw2fpCjc
// SIG // ZxkoJLo4S5pu+yFUa2pFEUep8beuyOiJXk+d0tBMdrVX
// SIG // VAmxaQFEfnyhYWxz/gq77EFmPWn9y8FBSX5+k77L+Dvk
// SIG // txW/tM4+pTFRhLy/AsGConsXHRWJjXD+57XQKBqJC482
// SIG // 2rpM+Zv/Cuk0+CQ1ZyvgDbjmjJnW4SLq8CdCPSWU5nR0
// SIG // W2rRnj7tfqAxM328y+l7vzhwRNGQ8cirOoo6CGJ/2XBj
// SIG // U02N7oJtpQUQwXEGahC0HVUzWLOhcGbyoYIDVjCCAj4C
// SIG // AQEwggEBoYHZpIHWMIHTMQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MS0wKwYDVQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVy
// SIG // YXRpb25zIExpbWl0ZWQxJzAlBgNVBAsTHm5TaGllbGQg
// SIG // VFNTIEVTTjozNjA1LTA1RTAtRDk0NzElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIjCgEB
// SIG // MAcGBSsOAwIaAxUAmBE8SCjxgjacmy8/VEdk7NxpR6ag
// SIG // gYMwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MDANBgkqhkiG9w0BAQsFAAIFAO6Shm4wIhgPMjAyNjEx
// SIG // MDIwMzQ3NThaGA8yMDI2MTEwMzAzNDc1OFowdDA6Bgor
// SIG // BgEEAYRZCgQBMSwwKjAKAgUA7pKGbgIBADAHAgEAAgIb
// SIG // hzAHAgEAAgISXDAKAgUA7pPX7gIBADA2BgorBgEEAYRZ
// SIG // CgQCMSgwJjAMBgorBgEEAYRZCgMCoAowCAIBAAIDB6Eg
// SIG // oQowCAIBAAIDAYagMA0GCSqGSIb3DQEBCwUAA4IBAQDH
// SIG // 4St02N18SQ9PjWgVxe1Cie7LwsoYtgHicfQfXFclmEcS
// SIG // O8EahM9X5BW0u8gQd6wbSzx27whR0KgEeboA7N9c0MKf
// SIG // krgwqOUM4pHGxSbrR2v8lpWz9C+Nnt0SATWZ44UAn4vd
// SIG // sd5er7EkBJSL57xlYv1Vmf2NWcZ9dPhYqhPhPkP3cV+R
// SIG // j/FmshJmUvdJrQqpLM9iwEDBwsBstGbi94qBXOo0xZ7K
// SIG // IOCaMg8IHtxlKmcOobVyOdbY9UBXv4rIChTCC3qHDr6c
// SIG // ZQhRIzA7GuD9YJEo9t28uQcGbweHpOR/SnDPNhHjt2H8
// SIG // 7uKC4RUb4nydzZzaUGy2hzKZQPjbYXVYMYIEDTCCBAkC
// SIG // AQEwgZMwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UE
// SIG // AxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAC
// SIG // EzMAAAITsEM1Zs+vlegAAQAAAhMwDQYJYIZIAWUDBAIB
// SIG // BQCgggFKMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRAB
// SIG // BDAvBgkqhkiG9w0BCQQxIgQgPpPTij8ECGIUGOYPuFsu
// SIG // GERDaq0VSuqGSk8T4SOL5x8wgfoGCyqGSIb3DQEJEAIv
// SIG // MYHqMIHnMIHkMIG9BCDM4QltFIUz8J4DjAzP4nVodZvQ
// SIG // xYGleUIfp86Oa5xYaDCBmDCBgKR+MHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwAhMzAAACE7BDNWbPr5XoAAEA
// SIG // AAITMCIEIJpviCFDEMeDx7gJth85r4NIFkEXvbbVfnKB
// SIG // Y0muyaTYMA0GCSqGSIb3DQEBCwUABIICAIJS1J3cWubk
// SIG // 9vP2HwIQiR/xr2rJskg9X1AFVW6FXFkbEG3OaGCYPJvs
// SIG // 00R1UeodjUpvEFrn5BjUWKA/SnWJEYyLdNxqtIqNY2EX
// SIG // X6JAgDn51H7gmy8b3s705Lz+4ljVDmDTg8h53djYV3Xx
// SIG // 9gaYEpH+wVZCBBY/3bjJe8S+6MHGKTVzFrjaXAOu30Gj
// SIG // kj94uvck9zrJIdVMe5rWH4Hqvk/FaHySV1/zrB1pStvY
// SIG // ec8Q8Xc89wWqc+BMFXCXXDiRgh2nYPYFYDOsXEr7q3oV
// SIG // WprU0gzKOzM/7x5CT7Cq6xM8nkw4UPnJGCjr5YeuFKAn
// SIG // iGu04wZC0TnGgmXQsB4BrfdKffAdKtazq4/3lovUV1sP
// SIG // 6FBpaRnhoyZ6xG2QI6obX7uqOWOnUf3xHkkydS64guuF
// SIG // NsuZF0GYGYmj68K5EJK8a0HHmTGAbNDIKqUjIeFK7OAR
// SIG // MKJkWzbBSpePVETUVfev91CPcr4HedKrejLyfYhqfFy2
// SIG // FjEYuCgQC7yyaZfDS9EdruRg5+mnRelUWuuOmqftSnE/
// SIG // 2upicmf8D964cGZ1QsguffA7uCXYKZmWsUgrlm2QnVFZ
// SIG // /vMf5Fe8zVK3FnqKqob86551FKc/nydyOcjEP+YHeLdG
// SIG // GDQ/kzxX7I1XlU7FnVCutxwJdJcb74vDdnv3cVw19y5x
// SIG // XhrR0i8ItpX7
// SIG // End signature block
