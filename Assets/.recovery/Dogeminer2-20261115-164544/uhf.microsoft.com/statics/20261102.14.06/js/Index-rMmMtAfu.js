var xe = "function", nr = "object", ar = "undefined", An = "prototype", Co = "hasOwnProperty", rr = Object, ho = rr[An], $i = rr.assign, Fu = rr.create, xo = rr.defineProperty, Vn = ho[Co], Ji = null;
function Tt(n) {
  n === void 0 && (n = !0);
  var r = n === !1 ? null : Ji;
  return r || (typeof globalThis !== ar && (r = globalThis), !r && typeof self !== ar && (r = self), !r && typeof window !== ar && (r = window), !r && typeof globalThis !== ar && (r = globalThis), Ji = r), r;
}
function bi(n) {
  throw new TypeError(n);
}
function yo(n) {
  var r = Fu;
  if (r)
    return r(n);
  if (n == null)
    return {};
  var e = typeof n;
  e !== nr && e !== xe && bi("Object prototype may only be an Object:" + n);
  function t() {
  }
  return t[An] = n, new t();
}
(Tt() || {}).Symbol;
(Tt() || {}).Reflect;
var $t = function(n, r) {
  return $t = rr.setPrototypeOf || // tslint:disable-next-line: only-arrow-functions
  { __proto__: [] } instanceof Array && function(e, t) {
    e.__proto__ = t;
  } || // tslint:disable-next-line: only-arrow-functions
  function(e, t) {
    for (var i in t)
      t[Co](i) && (e[i] = t[i]);
  }, $t(n, r);
};
function Br(n, r) {
  typeof r !== xe && r !== null && bi("Class extends value " + String(r) + " is not a constructor or null"), $t(n, r);
  function e() {
    this.constructor = n;
  }
  n[An] = r === null ? yo(r) : (e[An] = r[An], new e());
}
function Vi(n, r) {
  for (var e = 0, t = r.length, i = n.length; e < t; e++, i++)
    n[i] = r[e];
  return n;
}
/*!
 * Microsoft Dynamic Proto Utility, 1.1.11
 * Copyright (c) Microsoft and contributors. All rights reserved.
 */
var Le, Ae = "undefined", rt = "constructor", Yn = "prototype", et = "function", tt = "_dynInstFuncs", Jt = "_isDynProxy", kr = "_dynClass", zu = "_dynCls$", Vt = "_dynInstChk", _e = Vt, wo = "_dfOpts", Zi = "_unknown_", Ri = "__proto__", Ue = "_dyn" + Ri, na = "__dynProto$Gbl", yt = "_dynInstProto", Be = "useBaseInst", Zt = "setInstFuncs", It = Object, Se = It.getPrototypeOf, ra = It.getOwnPropertyNames;
function Hu() {
  var n;
  return typeof globalThis !== Ae && (n = globalThis), !n && typeof self !== Ae && (n = self), !n && typeof window !== Ae && (n = window), !n && typeof globalThis !== Ae && (n = globalThis), n || {};
}
var ea = Hu(), ni = ea[na] || (ea[na] = {
  o: (Le = {}, Le[Zt] = !0, Le[Be] = !0, Le),
  n: 1e3
  // Start new global index @ 1000 so we "fix" some cases when mixed with 1.1.6 or earlier
});
function Zn(n, r) {
  return n && It[Yn].hasOwnProperty.call(n, r);
}
function je(n) {
  return n && (n === It[Yn] || n === Array[Yn]);
}
function Oi(n) {
  return je(n) || n === Function[Yn];
}
function mr(n) {
  var r;
  if (n) {
    if (Se)
      return Se(n);
    var e = n[Ri] || n[Yn] || (n[rt] ? n[rt][Yn] : null);
    r = n[Ue] || e, Zn(n, Ue) || (delete n[yt], r = n[Ue] = n[yt] || n[Ue], n[yt] = e);
  }
  return r;
}
function it(n, r) {
  var e = [];
  if (ra)
    e = ra(n);
  else
    for (var t in n)
      typeof t == "string" && Zn(n, t) && e.push(t);
  if (e && e.length > 0)
    for (var i = 0; i < e.length; i++)
      r(e[i]);
}
function Ni(n, r, e) {
  return r !== rt && typeof n[r] === et && (e || Zn(n, r)) && r !== Ri && r !== Yn;
}
function at(n) {
  throw new TypeError("DynamicProto: " + n);
}
function Yr() {
  return Object.create ? function(n) {
    var r = Object.create;
    return r ? r(n) : {};
  }(null) : {};
}
function Ku(n) {
  var r = Yr();
  return it(n, function(e) {
    !r[e] && Ni(n, e, !1) && (r[e] = n[e]);
  }), r;
}
function Pi(n, r) {
  for (var e = n.length - 1; e >= 0; e--)
    if (n[e] === r)
      return !0;
  return !1;
}
function Yu(n, r, e, t) {
  function i(v, d, l) {
    var S = d[l];
    if (S[Jt] && t) {
      var E = v[tt] || {};
      E[_e] !== !1 && (S = (E[d[kr]] || {})[l] || S);
    }
    return function() {
      return S.apply(v, arguments);
    };
  }
  var a = Yr();
  it(e, function(v) {
    a[v] = i(r, e, v);
  });
  for (var o = mr(n), u = []; o && !Oi(o) && !Pi(u, o); )
    it(o, function(v) {
      !a[v] && Ni(o, v, !Se) && (a[v] = i(r, o, v));
    }), u.push(o), o = mr(o);
  return a;
}
function qu(n, r, e, t) {
  var i = null;
  if (n && Zn(e, kr)) {
    var a = n[tt] || Yr();
    if (i = (a[e[kr]] || Yr())[r], i || at("Missing [" + r + "] " + et), !i[Vt] && a[_e] !== !1) {
      for (var o = !Zn(n, r), u = mr(n), v = []; o && u && !Oi(u) && !Pi(v, u); ) {
        var d = u[r];
        if (d) {
          o = d === t;
          break;
        }
        v.push(u), u = mr(u);
      }
      try {
        o && (n[r] = i), i[Vt] = 1;
      } catch {
        a[_e] = !1;
      }
    }
  }
  return i;
}
function Gu(n, r, e) {
  var t = r[n];
  return t === e && (t = mr(r)[n]), typeof t !== et && at("[" + n + "] is not a " + et), t;
}
function Wu(n, r, e, t, i) {
  function a(v, d) {
    var l = function() {
      var S = qu(this, d, v, l) || Gu(d, v, l);
      return S.apply(this, arguments);
    };
    return l[Jt] = 1, l;
  }
  if (!je(n)) {
    var o = e[tt] = e[tt] || Yr();
    if (!je(o)) {
      var u = o[r] = o[r] || Yr();
      o[_e] !== !1 && (o[_e] = !!i), je(u) || it(e, function(v) {
        Ni(e, v, !1) && e[v] !== t[v] && (u[v] = e[v], delete e[v], (!Zn(n, v) || n[v] && !n[v][Jt]) && (n[v] = a(n, v)));
      });
    }
  }
}
function Xu(n, r) {
  if (Se) {
    for (var e = [], t = mr(r); t && !Oi(t) && !Pi(e, t); ) {
      if (t === n)
        return !0;
      e.push(t), t = mr(t);
    }
    return !1;
  }
  return !0;
}
function wt(n, r) {
  return Zn(n, Yn) ? n.name || r || Zi : ((n || {})[rt] || {}).name || r || Zi;
}
function nn(n, r, e, t) {
  Zn(n, Yn) || at("theClass is an invalid class definition.");
  var i = n[Yn];
  Xu(i, r) || at("[" + wt(n) + "] not in hierarchy of [" + wt(r) + "]");
  var a = null;
  Zn(i, kr) ? a = i[kr] : (a = zu + wt(n, "_") + "$" + ni.n, ni.n++, i[kr] = a);
  var o = nn[wo], u = !!o[Be];
  u && t && t[Be] !== void 0 && (u = !!t[Be]);
  var v = Ku(r), d = Yu(i, r, v, u);
  e(r, d);
  var l = !!Se && !!o[Zt];
  l && t && (l = !!t[Zt]), Wu(i, a, r, v, l !== !1);
}
nn[wo] = ni.o;
var Dr = "initialize", Cr = "name", ri = "getNotifyMgr", fr = "identifier", Z = "push", $n = "isInitialized", hr = "config", bt = "instrumentationKey", Dn = "logger", X = "length", fe = "time", fn = "processNext", bo = "getProcessTelContext", se = "addNotificationListener", ce = "removeNotificationListener", ta = "stopPollingInternalLogs", ae = "onComplete", pt = "getPlugin", ot = "flush", ke = "_extensions", Ee = "splice", Bn = "teardown", ut = "messageId", Fr = "message", qr = "isAsync", ei = "_doTeardown", Te = "update", Kn = "getNext", xr = "diagLog", Ie = "setNextPlugin", Gr = "createNew", ti = "cookieCfg", ye = "indexOf", Qn = "substring", ii = "userAgent", Mi = "split", Ro = "setEnabled", te = "substr", Rt = "nodeType", Li = "apply", sr = "replace", ia = "enableDebugExceptions", Bu = "logInternalMessage", ju = "toLowerCase", xn = "call", Jn = "type", Ai = "handler", Mr = "listeners", ai = "isChildEvt", zr = "getCtx", zn = "setCtx", oi = "complete", aa = "traceId", oa = "spanId", ua = "traceFlags", B = "", fa = "channels", dn = "core", sa = "createPerfMgr", ui = "disabled", Ui = "extensionConfig", Qu = "extensions", qn = "processTelemetry", cr = "priority", Qe = "eventsSent", ve = "eventsDiscarded", $e = "eventsSendRequest", Ur = "perfEvent", Ot = "errorToConsole", Je = "warnToConsole", ft = "getPerfMgr", Oo = "toISOString", No = "endsWith", Po = "startsWith", ca = "indexOf", fi = "trim", Mo = "toString", $u = "__proto__", Ve = "constructor", va = xo, si = rr.freeze, la = rr.keys, ki = String[An], Ju = ki[fi], Vu = ki[No], Zu = ki[Po], nf = Date[An], rf = nf[Oo], ef = Array.isArray, Lo = ho[Mo], Ao = Vn[Mo], tf = Ao[
  xn
  /* @min:%2ecall */
](rr), af = /-([a-z])/g, of = /([^\w\d_$])/g, uf = /^(\d+[\w\d_$])/, st = Object.getPrototypeOf;
function ff(n) {
  if (n) {
    if (st)
      return st(n);
    var r = n[$u] || n[An] || n[Ve];
    if (r)
      return r;
  }
  return null;
}
function sn(n) {
  return n === void 0 || typeof n === ar;
}
function V(n) {
  return n === null || sn(n);
}
function sf(n) {
  return !V(n);
}
function cf(n, r) {
  return !!(n && Vn[
    xn
    /* @min:%2ecall */
  ](n, r));
}
function yr(n) {
  return !!(n && typeof n === nr);
}
function an(n) {
  return !!(n && typeof n === xe);
}
function ci(n) {
  var r = n;
  return r && Un(r) && (r = r[
    sr
    /* @min:%2ereplace */
  ](af, function(e, t) {
    return t.toUpperCase();
  }), r = r[
    sr
    /* @min:%2ereplace */
  ](of, "_"), r = r[
    sr
    /* @min:%2ereplace */
  ](uf, function(e, t) {
    return "_" + t;
  })), r;
}
function yn(n, r) {
  if (n)
    for (var e in n)
      Vn[
        xn
        /* @min:%2ecall */
      ](n, e) && r[
        xn
        /* @min:%2ecall */
      ](n, e, n[e]);
}
function vf(n, r) {
  var e = !1;
  return n && r && !(e = n === r) && (e = Vu ? n[No](r) : lf(n, r)), e;
}
function lf(n, r) {
  var e = !1, t = r ? r[
    X
    /* @min:%2elength */
  ] : 0, i = n ? n[
    X
    /* @min:%2elength */
  ] : 0;
  if (t && i && i >= t && !(e = n === r)) {
    for (var a = i - 1, o = t - 1; o >= 0; o--) {
      if (n[a] != r[o])
        return !1;
      a--;
    }
    e = !0;
  }
  return e;
}
function da(n, r) {
  var e = !1;
  return n && r && !(e = n === r) && (e = Zu ? n[Po](r) : df(n, r)), e;
}
function df(n, r) {
  var e = !1, t = r ? r[
    X
    /* @min:%2elength */
  ] : 0;
  if (n && t && n[
    X
    /* @min:%2elength */
  ] >= t && !(e = n === r)) {
    for (var i = 0; i < t; i++)
      if (n[i] !== r[i])
        return !1;
    e = !0;
  }
  return e;
}
function mn(n, r) {
  return n && r ? n[
    ye
    /* @min:%2eindexOf */
  ](r) !== -1 : !1;
}
var Q = ef || gf;
function gf(n) {
  return !!(n && Lo[
    xn
    /* @min:%2ecall */
  ](n) === "[object Array]");
}
function _f(n) {
  return !!(n && Lo[
    xn
    /* @min:%2ecall */
  ](n) === "[object Error]");
}
function Un(n) {
  return typeof n == "string";
}
function wr(n) {
  return typeof n == "number";
}
function pe(n) {
  return typeof n == "boolean";
}
function ga(n) {
  var r = !1;
  if (n && typeof n == "object") {
    var e = st ? st(n) : ff(n);
    e ? (e[Ve] && Vn[
      xn
      /* @min:%2ecall */
    ](e, Ve) && (e = e[Ve]), r = typeof e === xe && Ao[
      xn
      /* @min:%2ecall */
    ](e) === tf) : r = !0;
  }
  return r;
}
function vi(n) {
  if (n)
    return rf ? n[Oo]() : Sf(n);
}
function Sf(n) {
  if (n && n.getUTCFullYear) {
    var r = function(e) {
      var t = String(e);
      return t[
        X
        /* @min:%2elength */
      ] === 1 && (t = "0" + t), t;
    };
    return n.getUTCFullYear() + "-" + r(n.getUTCMonth() + 1) + "-" + r(n.getUTCDate()) + "T" + r(n.getUTCHours()) + ":" + r(n.getUTCMinutes()) + ":" + r(n.getUTCSeconds()) + "." + String((n.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z";
  }
}
function U(n, r, e) {
  var t = n[
    X
    /* @min:%2elength */
  ];
  try {
    for (var i = 0; i < t && !(i in n && r[
      xn
      /* @min:%2ecall */
    ](e || n, n[i], i, n) === -1); i++)
      ;
  } catch {
  }
}
function vr(n, r, e) {
  if (n) {
    if (n[ca])
      return n[ca](r, e);
    var t = n[
      X
      /* @min:%2elength */
    ], i = e || 0;
    try {
      for (var a = Math.max(i >= 0 ? i : t - Math.abs(i), 0); a < t; a++)
        if (a in n && n[a] === r)
          return a;
    } catch {
    }
  }
  return -1;
}
function Cn(n) {
  return n && (n = Ju && n[fi] ? n[fi]() : n[
    sr
    /* @min:%2ereplace */
  ] ? n[
    sr
    /* @min:%2ereplace */
  ](/^\s+|(?=\s)\s+$/g, B) : n), n;
}
var _a = !{ toString: null }.propertyIsEnumerable("toString"), Nt = [
  "toString",
  "toLocaleString",
  "valueOf",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "constructor"
];
function Wr(n) {
  var r = typeof n;
  if (r !== xe && (r !== nr || n === null) && bi("objKeys called on non-object"), !_a && la)
    return la(n);
  var e = [];
  for (var t in n)
    n && Vn[
      xn
      /* @min:%2ecall */
    ](n, t) && e[
      Z
      /* @min:%2epush */
    ](t);
  if (_a)
    for (var i = Nt[
      X
      /* @min:%2elength */
    ], a = 0; a < i; a++)
      n && Vn[
        xn
        /* @min:%2ecall */
      ](n, Nt[a]) && e[
        Z
        /* @min:%2epush */
      ](Nt[a]);
  return e;
}
function Gn(n, r, e, t) {
  if (va)
    try {
      var i = {
        enumerable: !0,
        configurable: !0
      };
      return e && (i.get = e), t && (i.set = t), va(n, r, i), !0;
    } catch {
    }
  return !1;
}
function Ef(n) {
  return n;
}
function Uo(n) {
  return si && yn(n, function(r, e) {
    (Q(e) || yr(e)) && si(e);
  }), Hr(n);
}
var Hr = si || Ef;
function lr() {
  var n = Date;
  return n.now ? n.now() : new n().getTime();
}
function ko(n) {
  return _f(n) ? n[
    Cr
    /* @min:%2ename */
  ] : B;
}
function jn(n, r, e, t, i) {
  var a = e;
  return n && (a = n[r], a !== e && (!i || i(a)) && (!t || t(e)) && (a = e, n[r] = a)), a;
}
function Fe(n, r, e) {
  var t;
  return n ? (t = n[r], !t && V(t) && (t = sn(e) ? {} : e, n[r] = t)) : t = sn(e) ? {} : e, t;
}
function Ln(n, r) {
  return V(n) ? r : n;
}
function Sa(n) {
  return !!n;
}
function On(n) {
  throw new Error(n);
}
function Tf(n, r) {
  var e = null, t = null;
  return an(n) ? e = n : t = n, function() {
    var i = arguments;
    if (e && (t = e()), t)
      return t[r][
        Li
        /* @min:%2eapply */
      ](t, i);
  };
}
function Fi(n, r, e, t, i) {
  n && r && e && (n[r] = Tf(e, t));
}
function If(n, r, e, t) {
  return n && r && yr(n) && Q(e) && U(e, function(i) {
    Un(i) && Fi(n, i, r, i);
  }), n;
}
function ie(n) {
  return n && $i && (n = rr($i({}, n))), n;
}
function zi(n, r, e, t, i, a) {
  var o = arguments, u = o[0] || {}, v = o[
    X
    /* @min:%2elength */
  ], d = !1, l = 1;
  for (v > 0 && pe(u) && (d = u, u = o[l] || {}, l++), yr(u) || (u = {}); l < v; l++) {
    var S = o[l], E = Q(S), s = yr(S);
    for (var c in S) {
      var f = E && c in S || s && Vn[
        xn
        /* @min:%2ecall */
      ](S, c);
      if (f) {
        var T = S[c], m = void 0;
        if (d && T && ((m = Q(T)) || ga(T))) {
          var R = u[c];
          m ? Q(R) || (R = []) : ga(R) || (R = {}), T = zi(d, R, T);
        }
        T !== void 0 && (u[c] = T);
      }
    }
  }
  return u;
}
function pf(n) {
  var r = {};
  return yn(n, function(e, t) {
    r[e] = t, r[t] = e;
  }), Uo(r);
}
function wn(n) {
  var r = {};
  return yn(n, function(e, t) {
    r[e] = t[1], r[t[0]] = t[1];
  }), Uo(r);
}
var Sr = pf({
  /**
   * Unknown.
   */
  Unknown: 0,
  /**
   * Status set to non-retryable.
   */
  NonRetryableStatus: 1,
  /**
   * The event is invalid.
   */
  InvalidEvent: 2,
  /**
   * The size of the event is too large.
   */
  SizeLimitExceeded: 3,
  /**
   * The server is not accepting events from this instrumentation key.
   */
  KillSwitch: 4,
  /**
   * The event queue is full.
   */
  QueueFull: 5
  /* eEventsDiscardedReason.QueueFull */
}), Fo = "window", mf = "document", Df = "navigator", Cf = "location", hf = "console", xf = "performance", zo = "JSON", yf = "crypto", wf = "msCrypto", bf = "ReactNative", Rf = "msie", Of = "trident/", Ho = "XMLHttpRequest", Pt = null, Mt = null, Lr = null, Lt = null;
function Ko(n, r) {
  var e = !1;
  if (n) {
    try {
      if (e = r in n, !e) {
        var t = n[An];
        t && (e = r in t);
      }
    } catch {
    }
    if (!e)
      try {
        var i = new n();
        e = !sn(i[r]);
      } catch {
      }
  }
  return e;
}
function Sn(n) {
  var r = Tt();
  return r && r[n] ? r[n] : n === Fo && Yo() ? window : null;
}
function Yo() {
  return !!(typeof window === nr && window);
}
function we() {
  return Yo() ? window : Sn(Fo);
}
function qo() {
  return !!(typeof document === nr && document);
}
function dr() {
  return qo() ? document : Sn(mf);
}
function Go() {
  return !!(typeof navigator === nr && navigator);
}
function Or() {
  return Go() ? navigator : Sn(Df);
}
function mt(n) {
  return typeof location === nr && location ? location : Sn(Cf);
}
function Nf() {
  return typeof console !== ar ? console : Sn(hf);
}
function Pf() {
  return Sn(xf);
}
function Hi() {
  return !!(typeof JSON === nr && JSON || Sn(zo) !== null);
}
function Wo() {
  return Hi() ? JSON || Sn(zo) : null;
}
function Mf() {
  return Sn(yf);
}
function Lf() {
  return Sn(wf);
}
function Ea() {
  var n = Or();
  return n && n.product ? n.product === bf : !1;
}
function li() {
  var n = Or();
  if (n && (n[
    ii
    /* @min:%2euserAgent */
  ] !== Mt || Pt === null)) {
    Mt = n[
      ii
      /* @min:%2euserAgent */
    ];
    var r = (Mt || B)[
      ju
      /* @min:%2etoLowerCase */
    ]();
    Pt = mn(r, Rf) || mn(r, Of);
  }
  return Pt;
}
function Nn(n) {
  var r = Object[An].toString[
    xn
    /* @min:%2ecall */
  ](n), e = B;
  return r === "[object Error]" ? e = "{ stack: '" + n.stack + "', message: '" + n.message + "', name: '" + n[
    Cr
    /* @min:%2ename */
  ] + "'" : Hi() && (e = Wo().stringify(n)), r + e;
}
function Ta() {
  return Lt === null && (Lt = Go() && !!Or().sendBeacon), Lt;
}
function Ia(n) {
  var r = !1;
  try {
    r = !!Sn("fetch");
    var e = Sn("Request");
    r && n && e && (r = Ko(e, "keepalive"));
  } catch {
  }
  return r;
}
function Af() {
  return Lr === null && (Lr = typeof XDomainRequest !== ar, Lr && Xo() && (Lr = Lr && !Ko(Sn(Ho), "withCredentials"))), Lr;
}
function Xo() {
  var n = !1;
  try {
    var r = Sn(Ho);
    n = !!r;
  } catch {
  }
  return n;
}
var At = ["eventsSent", "eventsDiscarded", "eventsSendRequest", "perfEvent"], ct = null, ze;
function Uf(n, r) {
  return function() {
    var e = arguments, t = Bo(r);
    if (t) {
      var i = t.listener;
      i && i[n] && i[n][
        Li
        /* @min:%2eapply */
      ](i, e);
    }
  };
}
function kf() {
  var n = Sn("Microsoft");
  return n && (ct = n.ApplicationInsights), ct;
}
function Bo(n) {
  var r = ct;
  return !r && n.disableDbgExt !== !0 && (r = ct || kf()), r ? r.ChromeDbgExt : null;
}
function Ff(n) {
  if (!ze) {
    ze = {};
    for (var r = 0; r < At[
      X
      /* @min:%2elength */
    ]; r++)
      ze[At[r]] = Uf(At[r], n);
  }
  return ze;
}
var zf = "AI (Internal): ", Hf = "AI: ", Kf = "AITR_";
function pa(n) {
  return n ? '"' + n[
    sr
    /* @min:%2ereplace */
  ](/\"/g, B) + '"' : B;
}
function ma(n, r) {
  var e = Nf();
  if (e) {
    var t = "log";
    e[n] && (t = n), an(e[t]) && e[t](r);
  }
}
var di = (
  /** @class */
  function() {
    function n(r, e, t, i) {
      t === void 0 && (t = !1);
      var a = this;
      a[
        ut
        /* @min:%2emessageId */
      ] = r, a[
        Fr
        /* @min:%2emessage */
      ] = (t ? Hf : zf) + r;
      var o = B;
      Hi() && (o = Wo().stringify(i));
      var u = (e ? " message:" + pa(e) : B) + (i ? " props:" + pa(o) : B);
      a[
        Fr
        /* @min:%2emessage */
      ] += u;
    }
    return n.dataType = "MessageData", n;
  }()
);
function jo(n, r) {
  return (n || {})[
    Dn
    /* @min:%2elogger */
  ] || new be(r);
}
var be = (
  /** @class */
  function() {
    function n(r) {
      this.identifier = "DiagnosticLogger", this.queue = [];
      var e = 0, t = {}, i, a, o, u;
      nn(n, this, function(v) {
        l(r || {}), v.consoleLoggingLevel = function() {
          return i;
        }, v.telemetryLoggingLevel = function() {
          return a;
        }, v.maxInternalMessageLimit = function() {
          return o;
        }, v[
          ia
          /* @min:%2eenableDebugExceptions */
        ] = function() {
          return u;
        }, v.throwInternal = function(s, c, f, T, m) {
          m === void 0 && (m = !1);
          var R = new di(c, f, m, T);
          if (u)
            throw Nn(R);
          var b = s === 1 ? Ot : Je;
          if (sn(R[
            Fr
            /* @min:%2emessage */
          ]))
            E("throw" + (s === 1 ? "Critical" : "Warning"), R);
          else {
            if (m) {
              var N = +R[
                ut
                /* @min:%2emessageId */
              ];
              !t[N] && i >= s && (v[b](R[
                Fr
                /* @min:%2emessage */
              ]), t[N] = !0);
            } else
              i >= s && v[b](R[
                Fr
                /* @min:%2emessage */
              ]);
            d(s, R);
          }
        }, v[
          Je
          /* @min:%2ewarnToConsole */
        ] = function(s) {
          ma("warn", s), E("warning", s);
        }, v[
          Ot
          /* @min:%2eerrorToConsole */
        ] = function(s) {
          ma("error", s), E("error", s);
        }, v.resetInternalMessageCount = function() {
          e = 0, t = {};
        }, v[
          Bu
          /* @min:%2elogInternalMessage */
        ] = d;
        function d(s, c) {
          if (!S()) {
            var f = !0, T = Kf + c[
              ut
              /* @min:%2emessageId */
            ];
            if (t[T] ? f = !1 : t[T] = !0, f && (s <= a && (v.queue[
              Z
              /* @min:%2epush */
            ](c), e++, E(s === 1 ? "error" : "warn", c)), e === o)) {
              var m = "Internal events throttle limit per PageView reached for this app.", R = new di(23, m, !1);
              v.queue[
                Z
                /* @min:%2epush */
              ](R), s === 1 ? v[
                Ot
                /* @min:%2eerrorToConsole */
              ](m) : v[
                Je
                /* @min:%2ewarnToConsole */
              ](m);
            }
          }
        }
        function l(s) {
          i = Ln(s.loggingLevelConsole, 0), a = Ln(s.loggingLevelTelemetry, 1), o = Ln(s.maxMessageLimit, 25), u = Ln(s.enableDebug, Ln(s[
            ia
            /* @min:%2eenableDebugExceptions */
          ], !1));
        }
        function S() {
          return e >= o;
        }
        function E(s, c) {
          var f = Bo(r || {});
          f && f[
            xr
            /* @min:%2ediagLog */
          ] && f[
            xr
            /* @min:%2ediagLog */
          ](s, c);
        }
      });
    }
    return n.__ieDyn = 1, n;
  }()
);
function Qo(n) {
  return n || new be();
}
function gn(n, r, e, t, i, a) {
  a === void 0 && (a = !1), Qo(n).throwInternal(r, e, t, i, a);
}
function Ze(n, r) {
  Qo(n)[
    Je
    /* @min:%2ewarnToConsole */
  ](r);
}
var Kr = "ctx", gi = "ParentContextKey", le = "ChildrenContextKey", Yf = null, nt = (
  /** @class */
  function() {
    function n(r, e, t) {
      var i = this, a = !1;
      if (i.start = lr(), i[
        Cr
        /* @min:%2ename */
      ] = r, i[
        qr
        /* @min:%2eisAsync */
      ] = t, i[
        ai
        /* @min:%2eisChildEvt */
      ] = function() {
        return !1;
      }, an(e)) {
        var o;
        a = Gn(i, "payload", function() {
          return !o && an(e) && (o = e(), e = null), o;
        });
      }
      i[
        zr
        /* @min:%2egetCtx */
      ] = function(u) {
        return u ? u === n[gi] || u === n[le] ? i[u] : (i[Kr] || {})[u] : null;
      }, i[
        zn
        /* @min:%2esetCtx */
      ] = function(u, v) {
        if (u)
          if (u === n[gi])
            i[u] || (i[
              ai
              /* @min:%2eisChildEvt */
            ] = function() {
              return !0;
            }), i[u] = v;
          else if (u === n[le])
            i[u] = v;
          else {
            var d = i[Kr] = i[Kr] || {};
            d[u] = v;
          }
      }, i[
        oi
        /* @min:%2ecomplete */
      ] = function() {
        var u = 0, v = i[
          zr
          /* @min:%2egetCtx */
        ](n[le]);
        if (Q(v))
          for (var d = 0; d < v[
            X
            /* @min:%2elength */
          ]; d++) {
            var l = v[d];
            l && (u += l[
              fe
              /* @min:%2etime */
            ]);
          }
        i[
          fe
          /* @min:%2etime */
        ] = lr() - i.start, i.exTime = i[
          fe
          /* @min:%2etime */
        ] - u, i[
          oi
          /* @min:%2ecomplete */
        ] = function() {
        }, !a && an(e) && (i.payload = e());
      };
    }
    return n.ParentContextKey = "parent", n.ChildrenContextKey = "childEvts", n;
  }()
), qf = (
  /** @class */
  function() {
    function n(r) {
      this.ctx = {}, nn(n, this, function(e) {
        e.create = function(t, i, a) {
          return new nt(t, i, a);
        }, e.fire = function(t) {
          t && (t[
            oi
            /* @min:%2ecomplete */
          ](), r && an(r[
            Ur
            /* @min:%2eperfEvent */
          ]) && r[
            Ur
            /* @min:%2eperfEvent */
          ](t));
        }, e[
          zn
          /* @min:%2esetCtx */
        ] = function(t, i) {
          if (t) {
            var a = e[Kr] = e[Kr] || {};
            a[t] = i;
          }
        }, e[
          zr
          /* @min:%2egetCtx */
        ] = function(t) {
          return (e[Kr] || {})[t];
        };
      });
    }
    return n.__ieDyn = 1, n;
  }()
), Ut = "CoreUtils.doPerf";
function hn(n, r, e, t, i) {
  if (n) {
    var a = n;
    if (a[ft] && (a = a[ft]()), a) {
      var o = void 0, u = a[
        zr
        /* @min:%2egetCtx */
      ](Ut);
      try {
        if (o = a.create(r(), t, i), o) {
          if (u && o[
            zn
            /* @min:%2esetCtx */
          ] && (o[
            zn
            /* @min:%2esetCtx */
          ](nt[gi], u), u[
            zr
            /* @min:%2egetCtx */
          ] && u[
            zn
            /* @min:%2esetCtx */
          ])) {
            var v = u[
              zr
              /* @min:%2egetCtx */
            ](nt[le]);
            v || (v = [], u[
              zn
              /* @min:%2esetCtx */
            ](nt[le], v)), v[
              Z
              /* @min:%2epush */
            ](o);
          }
          return a[
            zn
            /* @min:%2esetCtx */
          ](Ut, o), e(o);
        }
      } catch (d) {
        o && o[
          zn
          /* @min:%2esetCtx */
        ] && o[
          zn
          /* @min:%2esetCtx */
        ]("exception", d);
      } finally {
        o && a.fire(o), a[
          zn
          /* @min:%2esetCtx */
        ](Ut, u);
      }
    }
  }
  return e();
}
function Gf() {
  return Yf;
}
var $o = 4294967296, Ir = 4294967295, Jo = !1, oe = 123456789, ue = 987654321;
function Wf(n) {
  n < 0 && (n >>>= 0), oe = 123456789 + n & Ir, ue = 987654321 - n & Ir, Jo = !0;
}
function Xf() {
  try {
    var n = lr() & 2147483647;
    Wf((Math.random() * $o ^ n) + n);
  } catch {
  }
}
function me(n) {
  var r = 0, e = Mf() || Lf();
  return e && e.getRandomValues && (r = e.getRandomValues(new Uint32Array(1))[0] & Ir), r === 0 && li() && (Jo || Xf(), r = Bf() & Ir), r === 0 && (r = Math.floor($o * Math.random() | 0)), n || (r >>>= 0), r;
}
function Bf(n) {
  ue = 36969 * (ue & 65535) + (ue >> 16) & Ir, oe = 18e3 * (oe & 65535) + (oe >> 16) & Ir;
  var r = (ue << 16) + (oe & 65535) >>> 0 & Ir | 0;
  return n || (r >>>= 0), r;
}
function Ki(n) {
  n === void 0 && (n = 22);
  for (var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = me() >>> 0, t = 0, i = B; i[
    X
    /* @min:%2elength */
  ] < n; )
    t++, i += r.charAt(e & 63), e >>>= 6, t === 5 && (e = (me() << 2 & 4294967295 | e & 3) >>> 0, t = 0);
  return i;
}
var Da = xo, Vo = "2.8.18", jf = "." + Ki(6), Qf = 0;
function $f(n, r, e) {
  if (Da)
    try {
      return Da(n, r, {
        value: e,
        enumerable: !1,
        configurable: !0
      }), !0;
    } catch {
    }
  return !1;
}
function Zo(n) {
  return n[
    Rt
    /* @min:%2enodeType */
  ] === 1 || n[
    Rt
    /* @min:%2enodeType */
  ] === 9 || !+n[
    Rt
    /* @min:%2enodeType */
  ];
}
function Jf(n, r) {
  var e = r[n.id];
  if (!e) {
    e = {};
    try {
      Zo(r) && ($f(r, n.id, e) || (r[n.id] = e));
    } catch {
    }
  }
  return e;
}
function Re(n, r) {
  return r === void 0 && (r = !1), ci(n + Qf++ + (r ? "." + Vo : B) + jf);
}
function nu(n) {
  var r = {
    id: Re("_aiData-" + (n || B) + "." + Vo),
    accept: function(e) {
      return Zo(e);
    },
    get: function(e, t, i, a) {
      var o = e[r.id];
      return o ? o[ci(t)] : (a && (o = Jf(r, e), o[ci(t)] = i), i);
    },
    kill: function(e, t) {
      if (e && e[t])
        try {
          delete e[t];
        } catch {
        }
    }
  };
  return r;
}
var Ca = "toGMTString", ha = "toUTCString", Yi = "cookie", kt = "expires", _i = "enabled", xa = "isCookieUseDisabled", ya = "disableCookiesUsage", or = "_ckMgr", He = null, Ft = null, wa = null, De = dr(), ba = {}, vt = {};
function Vf(n, r) {
  var e = de[or] || vt[or];
  return e || (e = de[or] = de(n, r), vt[or] = e), e;
}
function Ke(n) {
  return n ? n.isEnabled() : !0;
}
function Zf(n) {
  var r = n[
    ti
    /* @min:%2ecookieCfg */
  ] = n[
    ti
    /* @min:%2ecookieCfg */
  ] || {};
  if (jn(r, "domain", n.cookieDomain, sf, V), jn(r, "path", n.cookiePath || "/", null, V), V(r[_i])) {
    var e = void 0;
    sn(n[xa]) || (e = !n[xa]), sn(n[ya]) || (e = !n[ya]), r[_i] = e;
  }
  return r;
}
function ru(n, r) {
  return r && n && Q(n.ignoreCookies) ? n.ignoreCookies[
    ye
    /* @min:%2eindexOf */
  ](r) !== -1 : !1;
}
function ns(n, r) {
  return r && n && Q(n.blockedCookies) && n.blockedCookies[
    ye
    /* @min:%2eindexOf */
  ](r) !== -1 ? !0 : ru(n, r);
}
function jr(n, r) {
  var e;
  if (n)
    e = n.getCookieMgr();
  else if (r) {
    var t = r[
      ti
      /* @min:%2ecookieCfg */
    ];
    t[or] ? e = t[or] : e = de(r);
  }
  return e || (e = Vf(r, (n || {})[
    Dn
    /* @min:%2elogger */
  ])), e;
}
function de(n, r) {
  var e, t = Zf(n || vt), i = t.path || "/", a = t.domain, o = t[_i] !== !1, u = (e = {
    isEnabled: function() {
      var v = o && Ra(r), d = vt[or];
      return v && d && u !== d && (v = Ke(d)), v;
    }
  }, e[
    Ro
    /* @min:setEnabled */
  ] = function(v) {
    o = v !== !1;
  }, e.set = function(v, d, l, S, E) {
    var s = !1;
    if (Ke(u) && !ns(t, v)) {
      var c = {}, f = Cn(d || B), T = f[
        ye
        /* @min:%2eindexOf */
      ](";");
      if (T !== -1 && (f = Cn(d[
        Qn
        /* @min:%2esubstring */
      ](0, T)), c = eu(d[
        Qn
        /* @min:%2esubstring */
      ](T + 1))), jn(c, "domain", S || a, Sa, sn), !V(l)) {
        var m = li();
        if (sn(c[kt])) {
          var R = lr(), b = R + l * 1e3;
          if (b > 0) {
            var N = /* @__PURE__ */ new Date();
            N.setTime(b), jn(c, kt, Oa(N, m ? Ca : ha) || Oa(N, m ? Ca : ha) || B, Sa);
          }
        }
        m || jn(c, "max-age", B + l, null, sn);
      }
      var k = mt();
      k && k.protocol === "https:" && (jn(c, "secure", null, null, sn), Ft === null && (Ft = !es((Or() || {})[
        ii
        /* @min:%2euserAgent */
      ])), Ft && jn(c, "SameSite", "None", null, sn)), jn(c, "path", E || i, null, sn);
      var G = t.setCookie || Pa;
      G(v, Na(f, c)), s = !0;
    }
    return s;
  }, e.get = function(v) {
    var d = B;
    return Ke(u) && !ru(t, v) && (d = (t.getCookie || rs)(v)), d;
  }, e.del = function(v, d) {
    var l = !1;
    return Ke(u) && (l = u.purge(v, d)), l;
  }, e.purge = function(v, d) {
    var l, S = !1;
    if (Ra(r)) {
      var E = (l = {}, l.path = d || "/", l[kt] = "Thu, 01 Jan 1970 00:00:01 GMT", l);
      li() || (E["max-age"] = "0");
      var s = t.delCookie || Pa;
      s(v, Na(B, E)), S = !0;
    }
    return S;
  }, e);
  return u[or] = u, u;
}
function Ra(n) {
  if (He === null) {
    He = !1;
    try {
      var r = De || {};
      He = r[Yi] !== void 0;
    } catch (e) {
      gn(n, 2, 68, "Cannot access document.cookie - " + ko(e), { exception: Nn(e) });
    }
  }
  return He;
}
function eu(n) {
  var r = {};
  if (n && n[
    X
    /* @min:%2elength */
  ]) {
    var e = Cn(n)[
      Mi
      /* @min:%2esplit */
    ](";");
    U(e, function(t) {
      if (t = Cn(t || B), t) {
        var i = t[
          ye
          /* @min:%2eindexOf */
        ]("=");
        i === -1 ? r[t] = null : r[Cn(t[
          Qn
          /* @min:%2esubstring */
        ](0, i))] = Cn(t[
          Qn
          /* @min:%2esubstring */
        ](i + 1));
      }
    });
  }
  return r;
}
function Oa(n, r) {
  return an(n[r]) ? n[r]() : null;
}
function Na(n, r) {
  var e = n || B;
  return yn(r, function(t, i) {
    e += "; " + t + (V(i) ? B : "=" + i);
  }), e;
}
function rs(n) {
  var r = B;
  if (De) {
    var e = De[Yi] || B;
    wa !== e && (ba = eu(e), wa = e), r = Cn(ba[n] || B);
  }
  return r;
}
function Pa(n, r) {
  De && (De[Yi] = n + "=" + r);
}
function es(n) {
  return Un(n) ? !!(mn(n, "CPU iPhone OS 12") || mn(n, "iPad; CPU OS 12") || mn(n, "Macintosh; Intel Mac OS X 10_14") && mn(n, "Version/") && mn(n, "Safari") || mn(n, "Macintosh; Intel Mac OS X 10_14") && vf(n, "AppleWebKit/605.1.15 (KHTML, like Gecko)") || mn(n, "Chrome/5") || mn(n, "Chrome/6") || mn(n, "UnrealEngine") && !mn(n, "Chrome") || mn(n, "UCBrowser/12") || mn(n, "UCBrowser/11")) : !1;
}
var tu = "on", Ma = "attachEvent", La = "addEventListener", Aa = "detachEvent", Ua = "removeEventListener", Si = "events", Ce = "visibilitychange", Dt = "pagehide", iu = "pageshow", au = "unload", ou = "beforeunload", uu = Re("aiEvtPageHide"), fu = Re("aiEvtPageShow"), ts = /\.[\.]+/g, is = /[\.]+$/, as = 1, lt = nu("events"), os = /^([^.]*)(?:\.(.+)|)/;
function ka(n) {
  return n && n[
    sr
    /* @min:%2ereplace */
  ] ? n[
    sr
    /* @min:%2ereplace */
  ](/^[\s\.]+|(?=[\s\.])[\.\s]+$/g, B) : n;
}
function qi(n, r) {
  var e;
  if (r) {
    var t = B;
    Q(r) ? (t = B, U(r, function(a) {
      a = ka(a), a && (a[0] !== "." && (a = "." + a), t += a);
    })) : t = ka(r), t && (t[0] !== "." && (t = "." + t), n = (n || B) + t);
  }
  var i = os.exec(n || B) || [];
  return e = {}, e[
    Jn
    /* @min:type */
  ] = i[1], e.ns = (i[2] || B).replace(ts, ".").replace(is, B)[
    Mi
    /* @min:%2esplit */
  ](".").sort().join("."), e;
}
function su(n, r, e) {
  e === void 0 && (e = !0);
  var t = lt.get(n, Si, {}, e), i = t[r];
  return i || (i = t[r] = []), i;
}
function cu(n, r, e, t) {
  n && r && r[
    Jn
    /* @min:%2etype */
  ] && (n[Ua] ? n[Ua](r[
    Jn
    /* @min:%2etype */
  ], e, t) : n[Aa] && n[Aa](tu + r[
    Jn
    /* @min:%2etype */
  ], e));
}
function us(n, r, e, t) {
  var i = !1;
  return n && r && r[
    Jn
    /* @min:%2etype */
  ] && e && (n[La] ? (n[La](r[
    Jn
    /* @min:%2etype */
  ], e, t), i = !0) : n[Ma] && (n[Ma](tu + r[
    Jn
    /* @min:%2etype */
  ], e), i = !0)), i;
}
function Fa(n, r, e, t) {
  for (var i = r[
    X
    /* @min:%2elength */
  ]; i--; ) {
    var a = r[i];
    a && (!e.ns || e.ns === a.evtName.ns) && (!t || t(a)) && (cu(n, a.evtName, a[
      Ai
      /* @min:%2ehandler */
    ], a.capture), r[
      Ee
      /* @min:%2esplice */
    ](i, 1));
  }
}
function fs(n, r, e) {
  if (r[
    Jn
    /* @min:%2etype */
  ])
    Fa(n, su(n, r[
      Jn
      /* @min:%2etype */
    ]), r, e);
  else {
    var t = lt.get(n, Si, {});
    yn(t, function(i, a) {
      Fa(n, a, r, e);
    }), Wr(t)[
      X
      /* @min:%2elength */
    ] === 0 && lt.kill(n, Si);
  }
}
function Oe(n, r) {
  var e;
  return r ? (Q(r) ? e = [n].concat(r) : e = [n, r], e = qi("xx", e).ns[
    Mi
    /* @min:%2esplit */
  ](".")) : e = n, e;
}
function zt(n, r, e, t, i) {
  var a;
  i === void 0 && (i = !1);
  var o = !1;
  if (n)
    try {
      var u = qi(r, t);
      if (o = us(n, u, e, i), o && lt.accept(n)) {
        var v = (a = {
          guid: as++,
          evtName: u
        }, a[
          Ai
          /* @min:handler */
        ] = e, a.capture = i, a);
        su(n, u.type)[
          Z
          /* @min:%2epush */
        ](v);
      }
    } catch {
    }
  return o;
}
function Ht(n, r, e, t, i) {
  if (i === void 0 && (i = !1), n)
    try {
      var a = qi(r, t), o = !1;
      fs(n, a, function(u) {
        return a.ns && !e || u[
          Ai
          /* @min:%2ehandler */
        ] === e ? (o = !0, !0) : !1;
      }), o || cu(n, a, e, i);
    } catch {
    }
}
function ss(n, r, e) {
  var t = !1, i = we();
  i && (t = zt(i, n, r, e), t = zt(i.body, n, r, e) || t);
  var a = dr();
  return a && (t = zt(a, n, r, e) || t), t;
}
function cs(n, r, e) {
  var t = we();
  t && (Ht(t, n, r, e), Ht(t.body, n, r, e));
  var i = dr();
  i && Ht(i, n, r, e);
}
function Xr(n, r, e, t) {
  var i = !1;
  return r && n && n[
    X
    /* @min:%2elength */
  ] > 0 && U(n, function(a) {
    a && (!e || vr(e, a) === -1) && (i = ss(a, r, t) || i);
  }), i;
}
function vs(n, r, e, t) {
  var i = !1;
  return r && n && Q(n) && (i = Xr(n, r, e, t), !i && e && e[
    X
    /* @min:%2elength */
  ] > 0 && (i = Xr(n, r, null, t))), i;
}
function he(n, r, e) {
  n && Q(n) && U(n, function(t) {
    t && cs(t, r, e);
  });
}
function ls(n, r, e) {
  return vs([ou, au, Dt], n, r, e);
}
function ds(n, r) {
  he([ou, au, Dt], n, r);
}
function vu(n, r, e) {
  function t(o) {
    var u = dr();
    n && u && u.visibilityState === "hidden" && n(o);
  }
  var i = Oe(uu, e), a = Xr([Dt], n, r, i);
  return (!r || vr(r, Ce) === -1) && (a = Xr([Ce], t, r, i) || a), !a && r && (a = vu(n, null, e)), a;
}
function gs(n, r) {
  var e = Oe(uu, r);
  he([Dt], n, e), he([Ce], null, e);
}
function lu(n, r, e) {
  function t(o) {
    var u = dr();
    n && u && u.visibilityState === "visible" && n(o);
  }
  var i = Oe(fu, e), a = Xr([iu], n, r, i);
  return a = Xr([Ce], t, r, i) || a, !a && r && (a = lu(n, null, e)), a;
}
function _s(n, r) {
  var e = Oe(fu, r);
  he([iu], n, e), he([Ce], null, e);
}
function du() {
  var n = Ei();
  return n[
    Qn
    /* @min:%2esubstring */
  ](0, 8) + "-" + n[
    Qn
    /* @min:%2esubstring */
  ](8, 12) + "-" + n[
    Qn
    /* @min:%2esubstring */
  ](12, 16) + "-" + n[
    Qn
    /* @min:%2esubstring */
  ](16, 20) + "-" + n[
    Qn
    /* @min:%2esubstring */
  ](20);
}
function Ss() {
  var n = Pf();
  return n && n.now ? n.now() : lr();
}
function Ei() {
  for (var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], r = B, e, t = 0; t < 4; t++)
    e = me(), r += n[e & 15] + n[e >> 4 & 15] + n[e >> 8 & 15] + n[e >> 12 & 15] + n[e >> 16 & 15] + n[e >> 20 & 15] + n[e >> 24 & 15] + n[e >> 28 & 15];
  var i = n[8 + (me() & 3) | 0];
  return r[
    te
    /* @min:%2esubstr */
  ](0, 8) + r[
    te
    /* @min:%2esubstr */
  ](9, 4) + "4" + r[
    te
    /* @min:%2esubstr */
  ](13, 3) + i + r[
    te
    /* @min:%2esubstr */
  ](16, 3) + r[
    te
    /* @min:%2esubstr */
  ](19, 12);
}
var Es = "00000000000000000000000000000000", Ts = "0000000000000000";
function gu(n, r, e) {
  return n && n[
    X
    /* @min:%2elength */
  ] === r && n !== e ? !!n.match(/^[\da-f]*$/i) : !1;
}
function _u(n) {
  return gu(n, 32, Es);
}
function Su(n) {
  return gu(n, 16, Ts);
}
var Is = nu("plugin");
function pr(n) {
  return Is.get(n, "state", {}, !0);
}
function Eu(n, r) {
  for (var e = [], t = null, i = n[
    Kn
    /* @min:%2egetNext */
  ](), a; i; ) {
    var o = i[
      pt
      /* @min:%2egetPlugin */
    ]();
    if (o) {
      t && an(t[
        Ie
        /* @min:%2esetNextPlugin */
      ]) && an(o[
        qn
        /* @min:%2eprocessTelemetry */
      ]) && t[
        Ie
        /* @min:%2esetNextPlugin */
      ](o);
      var u = !1;
      an(o[
        $n
        /* @min:%2eisInitialized */
      ]) ? u = o[
        $n
        /* @min:%2eisInitialized */
      ]() : (a = pr(o), u = a[
        $n
        /* @min:%2eisInitialized */
      ]), u || e[
        Z
        /* @min:%2epush */
      ](o), t = o, i = i[
        Kn
        /* @min:%2egetNext */
      ]();
    }
  }
  U(e, function(v) {
    var d = n[dn]();
    v[
      Dr
      /* @min:%2einitialize */
    ](n.getCfg(), d, r, n[
      Kn
      /* @min:%2egetNext */
    ]()), a = pr(v), !v[dn] && !a[dn] && (a[dn] = d), a[
      $n
      /* @min:%2eisInitialized */
    ] = !0, delete a[
      Bn
      /* @min:%2eteardown */
    ];
  });
}
function Kt(n) {
  return n.sort(function(r, e) {
    var t = 0;
    if (e) {
      var i = an(e[qn]);
      an(r[qn]) ? t = i ? r[cr] - e[cr] : 1 : i && (t = -1);
    } else
      t = r ? 1 : -1;
    return t;
  });
}
function ps(n) {
  var r = {};
  return {
    getName: function() {
      return r[
        Cr
        /* @min:%2ename */
      ];
    },
    setName: function(e) {
      r[
        Cr
        /* @min:%2ename */
      ] = e;
    },
    getTraceId: function() {
      return r[
        aa
        /* @min:%2etraceId */
      ];
    },
    setTraceId: function(e) {
      _u(e) && (r[
        aa
        /* @min:%2etraceId */
      ] = e);
    },
    getSpanId: function() {
      return r[
        oa
        /* @min:%2espanId */
      ];
    },
    setSpanId: function(e) {
      Su(e) && (r[
        oa
        /* @min:%2espanId */
      ] = e);
    },
    getTraceFlags: function() {
      return r[
        ua
        /* @min:%2etraceFlags */
      ];
    },
    setTraceFlags: function(e) {
      r[
        ua
        /* @min:%2etraceFlags */
      ] = e;
    }
  };
}
var ms = "TelemetryPluginChain", za = "_hasRun", Ha = "_getTelCtx", Ka = 0;
function Ds(n, r, e) {
  for (; n; ) {
    if (n[
      pt
      /* @min:%2egetPlugin */
    ]() === e)
      return n;
    n = n[
      Kn
      /* @min:%2egetNext */
    ]();
  }
  return gr([e], r[
    hr
    /* @min:%2econfig */
  ] || {}, r);
}
function Gi(n, r, e, t) {
  var i = null, a = [];
  t !== null && (i = t ? Ds(n, e, t) : n);
  var o = {
    _next: v,
    ctx: {
      core: function() {
        return e;
      },
      diagLog: function() {
        return jo(e, r);
      },
      getCfg: function() {
        return r;
      },
      getExtCfg: d,
      getConfig: l,
      hasNext: function() {
        return !!i;
      },
      getNext: function() {
        return i;
      },
      setNext: function(E) {
        i = E;
      },
      iterate: S,
      onComplete: u
    }
  };
  function u(E, s) {
    for (var c = [], f = 2; f < arguments.length; f++)
      c[f - 2] = arguments[f];
    E && a[
      Z
      /* @min:%2epush */
    ]({
      func: E,
      self: sn(s) ? o.ctx : s,
      args: c
    });
  }
  function v() {
    var E = i;
    if (i = E ? E[
      Kn
      /* @min:%2egetNext */
    ]() : null, !E) {
      var s = a;
      s && s[
        X
        /* @min:%2elength */
      ] > 0 && (U(s, function(c) {
        try {
          c.func[
            xn
            /* @min:%2ecall */
          ](c.self, c.args);
        } catch (f) {
          gn(e[
            Dn
            /* @min:%2elogger */
          ], 2, 73, "Unexpected Exception during onComplete - " + Nn(f));
        }
      }), a = []);
    }
    return E;
  }
  function d(E, s, c) {
    s === void 0 && (s = {}), c === void 0 && (c = 0);
    var f;
    if (r) {
      var T = r[
        Ui
        /* @min:%2eextensionConfig */
      ];
      T && E && (f = T[E]);
    }
    if (!f)
      f = s;
    else if (yr(s) && c !== 0) {
      var m = zi(!0, s, f);
      r && c === 2 && yn(s, function(R) {
        if (V(m[R])) {
          var b = r[R];
          V(b) || (m[R] = b);
        }
      }), f = m;
    }
    return f;
  }
  function l(E, s, c) {
    c === void 0 && (c = !1);
    var f, T = d(E, null);
    return T && !V(T[s]) ? f = T[s] : r && !V(r[s]) && (f = r[s]), V(f) ? c : f;
  }
  function S(E) {
    for (var s; s = o._next(); ) {
      var c = s[
        pt
        /* @min:%2egetPlugin */
      ]();
      c && E(c);
    }
  }
  return o;
}
function br(n, r, e, t) {
  var i = Gi(n, r, e, t), a = i.ctx;
  function o(v) {
    var d = i._next();
    return d && d[
      qn
      /* @min:%2eprocessTelemetry */
    ](v, a), !d;
  }
  function u(v, d) {
    return v === void 0 && (v = null), Q(v) && (v = gr(v, r, e, d)), br(v || a[
      Kn
      /* @min:%2egetNext */
    ](), r, e, d);
  }
  return a[
    fn
    /* @min:%2eprocessNext */
  ] = o, a[
    Gr
    /* @min:%2ecreateNew */
  ] = u, a;
}
function dt(n, r, e) {
  var t = r[
    hr
    /* @min:%2econfig */
  ] || {}, i = Gi(n, t, r, e), a = i.ctx;
  function o(v) {
    var d = i._next();
    return d && d.unload(a, v), !d;
  }
  function u(v, d) {
    return v === void 0 && (v = null), Q(v) && (v = gr(v, t, r, d)), dt(v || a[
      Kn
      /* @min:%2egetNext */
    ](), r, d);
  }
  return a[
    fn
    /* @min:%2eprocessNext */
  ] = o, a[
    Gr
    /* @min:%2ecreateNew */
  ] = u, a;
}
function Wi(n, r, e) {
  var t = r[
    hr
    /* @min:%2econfig */
  ] || {}, i = Gi(n, t, r, e), a = i.ctx;
  function o(v) {
    return a.iterate(function(d) {
      an(d[
        Te
        /* @min:%2eupdate */
      ]) && d[
        Te
        /* @min:%2eupdate */
      ](a, v);
    });
  }
  function u(v, d) {
    return v === void 0 && (v = null), Q(v) && (v = gr(v, t, r, d)), Wi(v || a[
      Kn
      /* @min:%2egetNext */
    ](), r, d);
  }
  return a[
    fn
    /* @min:%2eprocessNext */
  ] = o, a[
    Gr
    /* @min:%2ecreateNew */
  ] = u, a;
}
function gr(n, r, e, t) {
  var i = null, a = !t;
  if (Q(n) && n[
    X
    /* @min:%2elength */
  ] > 0) {
    var o = null;
    U(n, function(u) {
      if (!a && t === u && (a = !0), a && u && an(u[
        qn
        /* @min:%2eprocessTelemetry */
      ])) {
        var v = Cs(u, r, e);
        i || (i = v), o && o._setNext(v), o = v;
      }
    });
  }
  return t && !i ? gr([t], r, e) : i;
}
function Cs(n, r, e) {
  var t = null, i = an(n[
    qn
    /* @min:%2eprocessTelemetry */
  ]), a = an(n[
    Ie
    /* @min:%2esetNextPlugin */
  ]), o;
  n ? o = n[
    fr
    /* @min:%2eidentifier */
  ] + "-" + n[
    cr
    /* @min:%2epriority */
  ] + "-" + Ka++ : o = "Unknown-0-" + Ka++;
  var u = {
    getPlugin: function() {
      return n;
    },
    getNext: function() {
      return t;
    },
    processTelemetry: l,
    unload: S,
    update: E,
    _id: o,
    _setNext: function(s) {
      t = s;
    }
  };
  function v() {
    var s;
    return n && an(n[Ha]) && (s = n[Ha]()), s || (s = br(u, r, e)), s;
  }
  function d(s, c, f, T, m) {
    var R = !1, b = n ? n[
      fr
      /* @min:%2eidentifier */
    ] : ms, N = s[za];
    return N || (N = s[za] = {}), s.setNext(t), n && hn(s[
      dn
      /* @min:%2ecore */
    ](), function() {
      return b + ":" + f;
    }, function() {
      N[o] = !0;
      try {
        var k = t ? t._id : B;
        k && (N[k] = !1), R = c(s);
      } catch (D) {
        var G = t ? N[t._id] : !0;
        G && (R = !0), (!t || !G) && gn(s[
          xr
          /* @min:%2ediagLog */
        ](), 1, 73, "Plugin [" + b + "] failed during " + f + " - " + Nn(D) + ", run flags: " + Nn(N));
      }
    }, T, m), R;
  }
  function l(s, c) {
    c = c || v();
    function f(T) {
      if (!n || !i)
        return !1;
      var m = pr(n);
      return m[
        Bn
        /* @min:%2eteardown */
      ] || m[ui] ? !1 : (a && n[
        Ie
        /* @min:%2esetNextPlugin */
      ](t), n[
        qn
        /* @min:%2eprocessTelemetry */
      ](s, T), !0);
    }
    d(c, f, "processTelemetry", function() {
      return { item: s };
    }, !s.sync) || c[
      fn
      /* @min:%2eprocessNext */
    ](s);
  }
  function S(s, c) {
    function f() {
      var T = !1;
      if (n) {
        var m = pr(n), R = n[dn] || m[
          dn
          /* @min:%2ecore */
        ];
        n && (!R || R === s.core()) && !m[
          Bn
          /* @min:%2eteardown */
        ] && (m[
          dn
          /* @min:%2ecore */
        ] = null, m[
          Bn
          /* @min:%2eteardown */
        ] = !0, m[
          $n
          /* @min:%2eisInitialized */
        ] = !1, n[
          Bn
          /* @min:%2eteardown */
        ] && n[
          Bn
          /* @min:%2eteardown */
        ](s, c) === !0 && (T = !0));
      }
      return T;
    }
    d(s, f, "unload", function() {
    }, c[
      qr
      /* @min:%2eisAsync */
    ]) || s[
      fn
      /* @min:%2eprocessNext */
    ](c);
  }
  function E(s, c) {
    function f() {
      var T = !1;
      if (n) {
        var m = pr(n), R = n[dn] || m[
          dn
          /* @min:%2ecore */
        ];
        n && (!R || R === s.core()) && !m[
          Bn
          /* @min:%2eteardown */
        ] && n[
          Te
          /* @min:%2eupdate */
        ] && n[
          Te
          /* @min:%2eupdate */
        ](s, c) === !0 && (T = !0);
      }
      return T;
    }
    d(s, f, "update", function() {
    }, !1) || s[
      fn
      /* @min:%2eprocessNext */
    ](c);
  }
  return Hr(u);
}
var Ct = 500, hs = "Channel has invalid priority - ";
function Ya(n, r, e) {
  r && Q(r) && r[
    X
    /* @min:%2elength */
  ] > 0 && (r = r.sort(function(t, i) {
    return t[
      cr
      /* @min:%2epriority */
    ] - i[
      cr
      /* @min:%2epriority */
    ];
  }), U(r, function(t) {
    t[
      cr
      /* @min:%2epriority */
    ] < Ct && On(hs + t[
      fr
      /* @min:%2eidentifier */
    ]);
  }), n[
    Z
    /* @min:%2epush */
  ]({
    queue: Hr(r),
    chain: gr(r, e[
      hr
      /* @min:%2econfig */
    ], e)
  }));
}
function xs(n, r) {
  function e() {
    return br(null, r[
      hr
      /* @min:%2econfig */
    ], r, null);
  }
  function t(d, l, S, E) {
    var s = d ? d[
      X
      /* @min:%2elength */
    ] + 1 : 1;
    function c() {
      s--, s === 0 && (E && E(), E = null);
    }
    s > 0 && U(d, function(f) {
      if (f && f.queue[
        X
        /* @min:%2elength */
      ] > 0) {
        var T = f.chain, m = l[
          Gr
          /* @min:%2ecreateNew */
        ](T);
        m[
          ae
          /* @min:%2eonComplete */
        ](c), S(m);
      } else
        s--;
    }), c();
  }
  function i(d, l) {
    var S = l || {
      reason: 0
      /* TelemetryUpdateReason.Unknown */
    };
    return t(n, d, function(E) {
      E[
        fn
        /* @min:%2eprocessNext */
      ](S);
    }, function() {
      d[
        fn
        /* @min:%2eprocessNext */
      ](S);
    }), !0;
  }
  function a(d, l) {
    var S = l || {
      reason: 0,
      isAsync: !1
    };
    return t(n, d, function(E) {
      E[
        fn
        /* @min:%2eprocessNext */
      ](S);
    }, function() {
      d[
        fn
        /* @min:%2eprocessNext */
      ](S), u = !1;
    }), !0;
  }
  function o(d) {
    var l = null;
    return n && n[
      X
      /* @min:%2elength */
    ] > 0 && U(n, function(S) {
      if (S && S.queue[
        X
        /* @min:%2elength */
      ] > 0 && (U(S.queue, function(E) {
        if (E[
          fr
          /* @min:%2eidentifier */
        ] === d)
          return l = E, -1;
      }), l))
        return -1;
    }), l;
  }
  var u = !1, v = {
    identifier: "ChannelControllerPlugin",
    priority: Ct,
    initialize: function(d, l, S, E) {
      u = !0, U(n, function(s) {
        s && s.queue[
          X
          /* @min:%2elength */
        ] > 0 && Eu(br(s.chain, d, l), S);
      });
    },
    isInitialized: function() {
      return u;
    },
    processTelemetry: function(d, l) {
      t(n, l || e(), function(S) {
        S[
          fn
          /* @min:%2eprocessNext */
        ](d);
      }, function() {
        l[
          fn
          /* @min:%2eprocessNext */
        ](d);
      });
    },
    update: i,
    pause: function() {
      t(n, e(), function(d) {
        d.iterate(function(l) {
          l.pause && l.pause();
        });
      }, null);
    },
    resume: function() {
      t(n, e(), function(d) {
        d.iterate(function(l) {
          l.resume && l.resume();
        });
      }, null);
    },
    teardown: a,
    getChannel: o,
    flush: function(d, l, S, E) {
      var s = 1, c = !1, f = null;
      E = E || 5e3;
      function T() {
        s--, c && s === 0 && (f && (clearTimeout(f), f = null), l && l(c), l = null);
      }
      return t(n, e(), function(m) {
        m.iterate(function(R) {
          if (R[
            ot
            /* @min:%2eflush */
          ]) {
            s++;
            var b = !1;
            R[
              ot
              /* @min:%2eflush */
            ](d, function() {
              b = !0, T();
            }, S) || b || (d && f == null ? f = setTimeout(function() {
              f = null, T();
            }, E) : T());
          }
        });
      }, function() {
        c = !0, T();
      }), !0;
    },
    _setQueue: function(d) {
      n = d;
    }
  };
  return v;
}
function ys(n, r, e) {
  var t = [];
  if (n && U(n, function(a) {
    return Ya(t, a, e);
  }), r) {
    var i = [];
    U(r, function(a) {
      a[
        cr
        /* @min:%2epriority */
      ] > Ct && i[
        Z
        /* @min:%2epush */
      ](a);
    }), Ya(t, i, e);
  }
  return t;
}
function Tu() {
  var n = [];
  function r(t) {
    t && n[
      Z
      /* @min:%2epush */
    ](t);
  }
  function e(t, i) {
    U(n, function(a) {
      try {
        a(t, i);
      } catch (o) {
        gn(t[
          xr
          /* @min:%2ediagLog */
        ](), 2, 73, "Unexpected error calling unload handler - " + Nn(o));
      }
    }), n = [];
  }
  return {
    add: r,
    run: e
  };
}
var er = "getPlugin", Xi = (
  /** @class */
  function() {
    function n() {
      var r = this, e, t, i, a, o;
      d(), nn(n, r, function(l) {
        l[
          Dr
          /* @min:%2einitialize */
        ] = function(S, E, s, c) {
          v(S, E, c), e = !0;
        }, l[
          Bn
          /* @min:%2eteardown */
        ] = function(S, E) {
          var s, c = l[
            dn
            /* @min:%2ecore */
          ];
          if (!c || S && c !== S[
            dn
            /* @min:%2ecore */
          ]())
            return;
          var f, T = !1, m = S || dt(null, c, i && i[er] ? i[er]() : i), R = E || (s = {
            reason: 0
            /* TelemetryUnloadReason.ManualTeardown */
          }, s[
            qr
            /* @min:isAsync */
          ] = !1, s);
          function b() {
            if (!T) {
              T = !0, a.run(m, E);
              var N = o;
              o = [], U(N, function(k) {
                k.rm();
              }), f === !0 && m[
                fn
                /* @min:%2eprocessNext */
              ](R), d();
            }
          }
          return !l[
            ei
            /* @min:%2e_doTeardown */
          ] || l[
            ei
            /* @min:%2e_doTeardown */
          ](m, R, b) !== !0 ? b() : f = !0, f;
        }, l[
          Te
          /* @min:%2eupdate */
        ] = function(S, E) {
          var s = l[
            dn
            /* @min:%2ecore */
          ];
          if (!s || S && s !== S[
            dn
            /* @min:%2ecore */
          ]())
            return;
          var c, f = !1, T = S || Wi(null, s, i && i[er] ? i[er]() : i), m = E || {
            reason: 0
            /* TelemetryUpdateReason.Unknown */
          };
          function R() {
            f || (f = !0, v(T.getCfg(), T.core(), T[
              Kn
              /* @min:%2egetNext */
            ]()));
          }
          return !l._doUpdate || l._doUpdate(T, m, R) !== !0 ? R() : c = !0, c;
        }, l._addHook = function(S) {
          S && (Q(S) ? o = o.concat(S) : o[
            Z
            /* @min:%2epush */
          ](S));
        }, Fi(l, "_addUnloadCb", function() {
          return a;
        }, "add");
      }), r[
        xr
        /* @min:%2ediagLog */
      ] = function(l) {
        return u(l)[
          xr
          /* @min:%2ediagLog */
        ]();
      }, r[
        $n
        /* @min:%2eisInitialized */
      ] = function() {
        return e;
      }, r.setInitialized = function(l) {
        e = l;
      }, r[
        Ie
        /* @min:%2esetNextPlugin */
      ] = function(l) {
        i = l;
      }, r[
        fn
        /* @min:%2eprocessNext */
      ] = function(l, S) {
        S ? S[
          fn
          /* @min:%2eprocessNext */
        ](l) : i && an(i[
          qn
          /* @min:%2eprocessTelemetry */
        ]) && i[
          qn
          /* @min:%2eprocessTelemetry */
        ](l, null);
      }, r._getTelCtx = u;
      function u(l) {
        l === void 0 && (l = null);
        var S = l;
        if (!S) {
          var E = t || br(null, {}, r[
            dn
            /* @min:%2ecore */
          ]);
          i && i[er] ? S = E[
            Gr
            /* @min:%2ecreateNew */
          ](null, i[er]) : S = E[
            Gr
            /* @min:%2ecreateNew */
          ](null, i);
        }
        return S;
      }
      function v(l, S, E) {
        l && jn(l, Ui, [], null, V), !E && S && (E = S[
          bo
          /* @min:%2egetProcessTelContext */
        ]()[
          Kn
          /* @min:%2egetNext */
        ]());
        var s = i;
        i && i[er] && (s = i[er]()), r[
          dn
          /* @min:%2ecore */
        ] = S, t = br(E, l, S, s);
      }
      function d() {
        e = !1, r[
          dn
          /* @min:%2ecore */
        ] = null, t = null, i = null, o = [], a = Tu();
      }
    }
    return n.__ieDyn = 1, n;
  }()
), ws = (
  /** @class */
  function(n) {
    Br(r, n);
    function r() {
      var e = n.call(this) || this;
      e.identifier = "TelemetryInitializerPlugin", e.priority = 199;
      var t, i;
      a(), nn(r, e, function(o, u) {
        o.addTelemetryInitializer = function(v) {
          var d = {
            id: t++,
            fn: v
          };
          i[
            Z
            /* @min:%2epush */
          ](d);
          var l = {
            remove: function() {
              U(i, function(S, E) {
                if (S.id === d.id)
                  return i[
                    Ee
                    /* @min:%2esplice */
                  ](E, 1), -1;
              });
            }
          };
          return l;
        }, o[
          qn
          /* @min:%2eprocessTelemetry */
        ] = function(v, d) {
          for (var l = !1, S = i[
            X
            /* @min:%2elength */
          ], E = 0; E < S; ++E) {
            var s = i[E];
            if (s)
              try {
                if (s.fn[
                  Li
                  /* @min:%2eapply */
                ](null, [v]) === !1) {
                  l = !0;
                  break;
                }
              } catch (c) {
                gn(d[
                  xr
                  /* @min:%2ediagLog */
                ](), 1, 64, "One of telemetry initializers failed, telemetry item will not be sent: " + ko(c), { exception: Nn(c) }, !0);
              }
          }
          l || o[
            fn
            /* @min:%2eprocessNext */
          ](v, d);
        }, o[
          ei
          /* @min:%2e_doTeardown */
        ] = function() {
          a();
        };
      });
      function a() {
        t = 0, i = [];
      }
      return e;
    }
    return r.__ieDyn = 1, r;
  }(Xi)
), Iu = "Plugins must provide initialize method", qa = "_notificationManager", Ga = "SDK is still unloading...", bs = "SDK is not initialized", Rs = {
  // Have the Diagnostic Logger default to log critical errors to the console
  loggingLevelConsole: 1
  /* eLoggingSeverity.CRITICAL */
};
function Os(n, r) {
  return new qf(r);
}
function Ns(n, r, e) {
  var t, i = [], a = {};
  return U(e, function(o) {
    (V(o) || V(o[
      Dr
      /* @min:%2einitialize */
    ])) && On(Iu);
    var u = o[
      cr
      /* @min:%2epriority */
    ], v = o[
      fr
      /* @min:%2eidentifier */
    ];
    o && u && (V(a[u]) ? a[u] = v : Ze(n, "Two extensions have same priority #" + u + " - " + a[u] + ", " + v)), (!u || u < r) && i[
      Z
      /* @min:%2epush */
    ](o);
  }), t = {
    all: e
  }, t[
    dn
    /* @min:core */
  ] = i, t;
}
function Wa(n, r) {
  var e = !1;
  return U(r, function(t) {
    if (t === n)
      return e = !0, -1;
  }), e;
}
function Ps() {
  var n;
  return yo((n = {}, n[
    se
    /* @min:addNotificationListener */
  ] = function(r) {
  }, n[
    ce
    /* @min:removeNotificationListener */
  ] = function(r) {
  }, n[
    Qe
    /* @min:eventsSent */
  ] = function(r) {
  }, n[
    ve
    /* @min:eventsDiscarded */
  ] = function(r, e) {
  }, n[
    $e
    /* @min:eventsSendRequest */
  ] = function(r, e) {
  }, n));
}
var Ms = (
  /** @class */
  function() {
    function n() {
      var r, e, t, i, a, o, u, v, d, l, S, E, s, c, f, T, m, R, b, N, k = 0, G = !1;
      nn(n, this, function(D) {
        cn(), D[
          $n
          /* @min:%2eisInitialized */
        ] = function() {
          return e;
        }, D[
          Dr
          /* @min:%2einitialize */
        ] = function(x, M, K, F) {
          c && On(Ga), D[
            $n
            /* @min:%2eisInitialized */
          ]() && On("Core should not be initialized more than once"), r = x || {}, D[
            hr
            /* @min:%2econfig */
          ] = r, V(x[
            bt
            /* @min:%2einstrumentationKey */
          ]) && On("Please provide instrumentation key"), i = F, D[qa] = F, Wn(), In(), Mn(), K && (D[
            Dn
            /* @min:%2elogger */
          ] = K);
          var Y = Fe(r, Qu, []);
          d = [], d[
            Z
            /* @min:%2epush */
          ].apply(d, Vi(Vi([], M, !1), Y)), E = Fe(r, fa, []), on(null), (!s || s[
            X
            /* @min:%2elength */
          ] === 0) && On("No " + fa + " available"), e = !0, D.releaseQueue();
        }, D.getTransmissionControls = function() {
          var x = [];
          return s && U(s, function(M) {
            x[
              Z
              /* @min:%2epush */
            ](M.queue);
          }), Hr(x);
        }, D.track = function(x) {
          x.iKey = x.iKey || r[
            bt
            /* @min:%2einstrumentationKey */
          ], x[
            fe
            /* @min:%2etime */
          ] = x[
            fe
            /* @min:%2etime */
          ] || vi(/* @__PURE__ */ new Date()), x.ver = x.ver || "4.0", !c && D[
            $n
            /* @min:%2eisInitialized */
          ]() ? $()[
            fn
            /* @min:%2eprocessNext */
          ](x) : t[
            Z
            /* @min:%2epush */
          ](x);
        }, D[
          bo
          /* @min:%2egetProcessTelContext */
        ] = $, D[
          ri
          /* @min:%2egetNotifyMgr */
        ] = function() {
          return i || (i = Ps(), D[qa] = i), i;
        }, D[
          se
          /* @min:%2eaddNotificationListener */
        ] = function(x) {
          i && i[
            se
            /* @min:%2eaddNotificationListener */
          ](x);
        }, D[
          ce
          /* @min:%2eremoveNotificationListener */
        ] = function(x) {
          i && i[
            ce
            /* @min:%2eremoveNotificationListener */
          ](x);
        }, D.getCookieMgr = function() {
          return u || (u = de(r, D[
            Dn
            /* @min:%2elogger */
          ])), u;
        }, D.setCookieMgr = function(x) {
          u = x;
        }, D[
          ft
          /* @min:%2egetPerfMgr */
        ] = function() {
          if (!a && !o && Ln(r.enablePerfMgr)) {
            var x = Ln(r[
              sa
              /* @min:%2ecreatePerfMgr */
            ]);
            an(x) && (o = x(D, D[
              ri
              /* @min:%2egetNotifyMgr */
            ]()));
          }
          return a || o || Gf();
        }, D.setPerfMgr = function(x) {
          a = x;
        }, D.eventCnt = function() {
          return t[
            X
            /* @min:%2elength */
          ];
        }, D.releaseQueue = function() {
          if (e && t[
            X
            /* @min:%2elength */
          ] > 0) {
            var x = t;
            t = [], U(x, function(M) {
              $()[
                fn
                /* @min:%2eprocessNext */
              ](M);
            });
          }
        }, D.pollInternalLogs = function(x) {
          return T = x || null, G = !1, k && (clearInterval(k), k = null), J(!0);
        };
        function J(x) {
          if (!k && !G) {
            var M = x || D[
              Dn
              /* @min:%2elogger */
            ] && D[
              Dn
              /* @min:%2elogger */
            ].queue[
              X
              /* @min:%2elength */
            ] > 0;
            if (M) {
              var K = Ln(r.diagnosticLogInterval);
              (!K || !(K > 0)) && (K = 1e4), k = setInterval(function() {
                clearInterval(k), k = 0, L();
              }, K);
            }
          }
          return k;
        }
        D[
          ta
          /* @min:%2estopPollingInternalLogs */
        ] = function() {
          G = !0, k && (clearInterval(k), k = 0, L());
        }, If(D, function() {
          return f;
        }, ["addTelemetryInitializer"]), D.unload = function(x, M, K) {
          var F;
          x === void 0 && (x = !0), e || On(bs), c && On(Ga);
          var Y = (F = {
            reason: 50
            /* TelemetryUnloadReason.SdkUnload */
          }, F[
            qr
            /* @min:isAsync */
          ] = x, F.flushComplete = !1, F), tn = dt(rn(), D);
          tn[
            ae
            /* @min:%2eonComplete */
          ](function() {
            cn(), M && M(Y);
          }, D);
          function ln(Tn) {
            Y.flushComplete = Tn, c = !0, R.run(tn, Y), D[
              ta
              /* @min:%2estopPollingInternalLogs */
            ](), tn[
              fn
              /* @min:%2eprocessNext */
            ](Y);
          }
          L(), vn(x, ln, 6, K) || ln(!1);
        }, D[
          pt
          /* @min:%2egetPlugin */
        ] = un, D.addPlugin = function(x, M, K, F) {
          if (!x) {
            F && F(!1), kn(Iu);
            return;
          }
          var Y = un(x[
            fr
            /* @min:%2eidentifier */
          ]);
          if (Y && !M) {
            F && F(!1), kn("Plugin [" + x[
              fr
              /* @min:%2eidentifier */
            ] + "] is already loaded!");
            return;
          }
          var tn = {
            reason: 16
            /* TelemetryUpdateReason.PluginAdded */
          };
          function ln(pn) {
            d[
              Z
              /* @min:%2epush */
            ](x), tn.added = [x], on(tn), F && F(!0);
          }
          if (Y) {
            var Tn = [Y.plugin], _n = {
              reason: 2,
              isAsync: !!K
            };
            H(Tn, _n, function(pn) {
              pn ? (tn.removed = Tn, tn.reason |= 32, ln()) : F && F(!1);
            });
          } else
            ln();
        }, D.evtNamespace = function() {
          return m;
        }, D[
          ot
          /* @min:%2eflush */
        ] = vn, D.getTraceCtx = function(x) {
          return N || (N = ps()), N;
        }, D.setTraceCtx = function(x) {
          N = x || null;
        }, Fi(D, "addUnloadCb", function() {
          return R;
        }, "add");
        function cn() {
          e = !1, r = zi(!0, {}, Rs), D[
            hr
            /* @min:%2econfig */
          ] = r, D[
            Dn
            /* @min:%2elogger */
          ] = new be(r), D[
            ke
            /* @min:%2e_extensions */
          ] = [], f = new ws(), t = [], i = null, a = null, o = null, u = null, v = null, l = null, d = [], S = null, E = null, s = null, c = !1, T = null, m = Re("AIBaseCore", !0), R = Tu(), N = null;
        }
        function $() {
          var x = br(rn(), r, D);
          return x[
            ae
            /* @min:%2eonComplete */
          ](J), x;
        }
        function on(x) {
          var M = Ns(D[
            Dn
            /* @min:%2elogger */
          ], Ct, d);
          l = M[
            dn
            /* @min:%2ecore */
          ], v = null;
          var K = M.all;
          if (s = Hr(ys(E, K, D)), S) {
            var F = vr(K, S);
            F !== -1 && K[
              Ee
              /* @min:%2esplice */
            ](F, 1), F = vr(l, S), F !== -1 && l[
              Ee
              /* @min:%2esplice */
            ](F, 1), S._setQueue(s);
          } else
            S = xs(s, D);
          K[
            Z
            /* @min:%2epush */
          ](S), l[
            Z
            /* @min:%2epush */
          ](S), D[
            ke
            /* @min:%2e_extensions */
          ] = Kt(K), S[
            Dr
            /* @min:%2einitialize */
          ](r, D, K);
          var Y = $();
          Eu(Y, K), D[
            ke
            /* @min:%2e_extensions */
          ] = Hr(Kt(l || [])).slice(), x && En(x);
        }
        function un(x) {
          var M, K = null, F = null;
          return U(D[
            ke
            /* @min:%2e_extensions */
          ], function(Y) {
            if (Y[
              fr
              /* @min:%2eidentifier */
            ] === x && Y !== S && Y !== f)
              return F = Y, -1;
          }), !F && S && (F = S.getChannel(x)), F && (K = (M = {
            plugin: F
          }, M[
            Ro
            /* @min:setEnabled */
          ] = function(Y) {
            pr(F)[ui] = !Y;
          }, M.isEnabled = function() {
            var Y = pr(F);
            return !Y[
              Bn
              /* @min:%2eteardown */
            ] && !Y[ui];
          }, M.remove = function(Y, tn) {
            var ln;
            Y === void 0 && (Y = !0);
            var Tn = [F], _n = (ln = {
              reason: 1
              /* TelemetryUnloadReason.PluginUnload */
            }, ln[
              qr
              /* @min:isAsync */
            ] = Y, ln);
            H(Tn, _n, function(pn) {
              pn && on({
                reason: 32,
                removed: Tn
              }), tn && tn(pn);
            });
          }, M)), K;
        }
        function rn() {
          if (!v) {
            var x = (l || []).slice();
            vr(x, f) === -1 && x[
              Z
              /* @min:%2epush */
            ](f), v = gr(Kt(x), r, D);
          }
          return v;
        }
        function H(x, M, K) {
          if (x && x[
            X
            /* @min:%2elength */
          ] > 0) {
            var F = gr(x, r, D), Y = dt(F, D);
            Y[
              ae
              /* @min:%2eonComplete */
            ](function() {
              var tn = !1, ln = [];
              U(d, function(_n, pn) {
                Wa(_n, x) ? tn = !0 : ln[
                  Z
                  /* @min:%2epush */
                ](_n);
              }), d = ln;
              var Tn = [];
              E && (U(E, function(_n, pn) {
                var Pr = [];
                U(_n, function(_r) {
                  Wa(_r, x) ? tn = !0 : Pr[
                    Z
                    /* @min:%2epush */
                  ](_r);
                }), Tn[
                  Z
                  /* @min:%2epush */
                ](Pr);
              }), E = Tn), K && K(tn), J();
            }), Y[
              fn
              /* @min:%2eprocessNext */
            ](M);
          } else
            K(!1);
        }
        function L() {
          if (D[
            Dn
            /* @min:%2elogger */
          ] && D[
            Dn
            /* @min:%2elogger */
          ].queue) {
            var x = D[
              Dn
              /* @min:%2elogger */
            ].queue.slice(0);
            D[
              Dn
              /* @min:%2elogger */
            ].queue[
              X
              /* @min:%2elength */
            ] = 0, U(x, function(M) {
              var K, F = (K = {}, K[
                Cr
                /* @min:name */
              ] = T || "InternalMessageId: " + M[
                ut
                /* @min:%2emessageId */
              ], K.iKey = Ln(r[
                bt
                /* @min:%2einstrumentationKey */
              ]), K.time = vi(/* @__PURE__ */ new Date()), K.baseType = di.dataType, K.baseData = { message: M[
                Fr
                /* @min:%2emessage */
              ] }, K);
              D.track(F);
            });
          }
        }
        function vn(x, M, K, F) {
          return S ? S[
            ot
            /* @min:%2eflush */
          ](x, M, K || 6, F) : (M && M(!1), !0);
        }
        function Wn() {
          var x = Ln(r.disableDbgExt);
          x === !0 && b && (i[
            ce
            /* @min:%2eremoveNotificationListener */
          ](b), b = null), i && !b && x !== !0 && (b = Ff(r), i[
            se
            /* @min:%2eaddNotificationListener */
          ](b));
        }
        function In() {
          var x = Ln(r.enablePerfMgr);
          !x && o && (o = null), x && Fe(r, sa, Os);
        }
        function Mn() {
          var x = Fe(r, Ui, {});
          x.NotificationManager = i;
        }
        function En(x) {
          var M = Wi(rn(), D);
          M[
            ae
            /* @min:%2eonComplete */
          ](J), (!D._updateHook || D._updateHook(M, x) !== !0) && M[
            fn
            /* @min:%2eprocessNext */
          ](x);
        }
        function kn(x) {
          var M = D[
            Dn
            /* @min:%2elogger */
          ];
          M ? (gn(M, 2, 73, x), J()) : On(x);
        }
      });
    }
    return n.__ieDyn = 1, n;
  }()
);
function Ye(n, r, e, t) {
  U(n, function(i) {
    if (i && i[r])
      if (e)
        setTimeout(function() {
          return t(i);
        }, 0);
      else
        try {
          t(i);
        } catch {
        }
  });
}
var Ls = (
  /** @class */
  function() {
    function n(r) {
      this.listeners = [];
      var e = !!(r || {}).perfEvtsSendAll;
      nn(n, this, function(t) {
        t[
          se
          /* @min:%2eaddNotificationListener */
        ] = function(i) {
          t.listeners[
            Z
            /* @min:%2epush */
          ](i);
        }, t[
          ce
          /* @min:%2eremoveNotificationListener */
        ] = function(i) {
          for (var a = vr(t[
            Mr
            /* @min:%2elisteners */
          ], i); a > -1; )
            t.listeners[
              Ee
              /* @min:%2esplice */
            ](a, 1), a = vr(t[
              Mr
              /* @min:%2elisteners */
            ], i);
        }, t[
          Qe
          /* @min:%2eeventsSent */
        ] = function(i) {
          Ye(t[
            Mr
            /* @min:%2elisteners */
          ], Qe, !0, function(a) {
            a[
              Qe
              /* @min:%2eeventsSent */
            ](i);
          });
        }, t[
          ve
          /* @min:%2eeventsDiscarded */
        ] = function(i, a) {
          Ye(t[
            Mr
            /* @min:%2elisteners */
          ], ve, !0, function(o) {
            o[
              ve
              /* @min:%2eeventsDiscarded */
            ](i, a);
          });
        }, t[
          $e
          /* @min:%2eeventsSendRequest */
        ] = function(i, a) {
          Ye(t[
            Mr
            /* @min:%2elisteners */
          ], $e, a, function(o) {
            o[
              $e
              /* @min:%2eeventsSendRequest */
            ](i, a);
          });
        }, t[
          Ur
          /* @min:%2eperfEvent */
        ] = function(i) {
          i && (e || !i[
            ai
            /* @min:%2eisChildEvt */
          ]()) && Ye(t[
            Mr
            /* @min:%2elisteners */
          ], Ur, !1, function(a) {
            i[
              qr
              /* @min:%2eisAsync */
            ] ? setTimeout(function() {
              return a[
                Ur
                /* @min:%2eperfEvent */
              ](i);
            }, 0) : a[
              Ur
              /* @min:%2eperfEvent */
            ](i);
          });
        };
      });
    }
    return n.__ieDyn = 1, n;
  }()
), As = (
  /** @class */
  function(n) {
    Br(r, n);
    function r() {
      var e = n.call(this) || this;
      return nn(r, e, function(t, i) {
        t[
          Dr
          /* @min:%2einitialize */
        ] = function(u, v, d, l) {
          i[
            Dr
            /* @min:%2einitialize */
          ](u, v, d || new be(u), l || new Ls(u));
        }, t.track = function(u) {
          hn(t[
            ft
            /* @min:%2egetPerfMgr */
          ](), function() {
            return "AppInsightsCore:track";
          }, function() {
            u === null && (o(u), On("Invalid telemetry item")), a(u), i.track(u);
          }, function() {
            return { item: u };
          }, !u.sync);
        };
        function a(u) {
          V(u[
            Cr
            /* @min:%2ename */
          ]) && (o(u), On("telemetry name required"));
        }
        function o(u) {
          var v = t[
            ri
            /* @min:%2egetNotifyMgr */
          ]();
          v && v[
            ve
            /* @min:%2eeventsDiscarded */
          ](
            [u],
            2
            /* eEventsDiscardedReason.InvalidEvent */
          );
        }
      }), e;
    }
    return r.__ieDyn = 1, r;
  }(Ms)
), Qr = "", Us = "https://browser.events.data.microsoft.com/OneCollector/1.0/", Xa = "version", Yt = "properties", Xn, ks = "3.2.18", pu = "1DS-Web-JS-" + ks, Fs = "Microsoft_ApplicationInsights_BypassAjaxInstrumentation", Ba = "withCredentials", zs = "timeout", Hs = (Xn = {}, Xn[
  0
  /* FieldValueSanitizerType.NotSet */
] = 0, Xn[
  2
  /* FieldValueSanitizerType.Number */
] = 6, Xn[
  1
  /* FieldValueSanitizerType.String */
] = 1, Xn[
  3
  /* FieldValueSanitizerType.Boolean */
] = 7, Xn[
  4098
  /* FieldValueSanitizerType.Number */
] = 6, Xn[
  4097
  /* FieldValueSanitizerType.String */
] = 1, Xn[
  4099
  /* FieldValueSanitizerType.Boolean */
] = 7, Xn);
dr();
we();
function ur(n) {
  return !(n === Qr || V(n));
}
function Ks(n) {
  if (n) {
    var r = n.indexOf("-");
    if (r > -1)
      return n.substring(0, r);
  }
  return Qr;
}
function Ys(n) {
  return !!(n && wr(n) && n >= 1 && n <= 4);
}
function qs(n, r, e) {
  if (!r && !ur(r) || typeof n != "string")
    return null;
  var t = typeof r;
  if (t === "string" || t === "number" || t === "boolean" || Q(r))
    r = { value: r };
  else if (t === "object" && !Vn.call(r, "value"))
    r = { value: e ? JSON.stringify(r) : r };
  else if (V(r.value) || r.value === Qr || !Un(r.value) && !wr(r.value) && !pe(r.value) && !Q(r.value))
    return null;
  if (Q(r.value) && !Bs(r.value))
    return null;
  if (!V(r.kind)) {
    if (Q(r.value) || !Ws(r.kind))
      return null;
    r.value = r.value.toString();
  }
  return r;
}
function Gs(n, r, e) {
  var t = -1;
  if (!sn(n))
    if (r > 0 && (r === 32 ? t = 8192 : r <= 13 && (t = r << 5)), Xs(e))
      t === -1 && (t = 0), t |= e;
    else {
      var i = Hs[Ii(n)] || -1;
      t !== -1 && i !== -1 ? t |= i : i === 6 && (t = i);
    }
  return t;
}
function Rr(n, r, e) {
  e === void 0 && (e = !0);
  var t;
  return n && (t = n.get(r), e && t && decodeURIComponent && (t = decodeURIComponent(t))), t || Qr;
}
function ja(n) {
  n === void 0 && (n = "D");
  var r = du();
  return n === "B" ? r = "{" + r + "}" : n === "P" ? r = "(" + r + ")" : n === "N" && (r = r.replace(/-/g, Qr)), r;
}
function gt(n, r, e, t, i) {
  var a = {}, o = !1, u = 0, v = arguments.length, d = Object[An], l = arguments;
  for (d.toString.call(l[0]) === "[object Boolean]" && (o = l[0], u++); u < v; u++) {
    var n = l[u];
    yn(n, function(E, s) {
      o && s && yr(s) ? Q(s) ? (a[E] = a[E] || [], U(s, function(c, f) {
        c && yr(c) ? a[E][f] = gt(!0, a[E][f], c) : a[E][f] = c;
      })) : a[E] = gt(!0, a[E], s) : a[E] = s;
    });
  }
  return a;
}
var Hn = Ss;
function Ws(n) {
  return n === 0 || n > 0 && n <= 13 || n === 32;
}
function Xs(n) {
  return n >= 0 && n <= 9;
}
function Bs(n) {
  return n.length > 0;
}
function Ti(n, r) {
  var e = n;
  e.timings = e.timings || {}, e.timings.processTelemetryStart = e.timings.processTelemetryStart || {}, e.timings.processTelemetryStart[r] = Hn();
}
function Ii(n) {
  var r = 0;
  if (n != null) {
    var e = typeof n;
    e === "string" ? r = 1 : e === "number" ? r = 2 : e === "boolean" ? r = 3 : e === nr && (r = 4, Q(n) ? (r = 4096, n.length > 0 && (r |= Ii(n[0]))) : Vn.call(n, "value") && (r = 8192 | Ii(n.value)));
  }
  return r;
}
function js() {
  return !!Sn("chrome");
}
function Qs(n, r, e, t, i, a) {
  i === void 0 && (i = !1);
  function o(v, d, l) {
    try {
      v[d] = l;
    } catch {
    }
  }
  var u = new XMLHttpRequest();
  return o(u, Fs, t), e && o(u, Ba, e), u.open(n, r, !i), e && o(u, Ba, e), !i && a && o(u, zs, a), u;
}
var $s = (
  /** @class */
  function(n) {
    Br(r, n);
    function r() {
      var e = n.call(this) || this;
      return e.pluginVersionStringArr = [], nn(r, e, function(t, i) {
        (!t.logger || !t.logger.queue) && (t.logger = new be({
          loggingLevelConsole: 1
          /* eLoggingSeverity.CRITICAL */
        })), t.initialize = function(a, o, u, v) {
          hn(t, function() {
            return "AppInsightsCore.initialize";
          }, function() {
            var d = t.pluginVersionStringArr;
            if (a) {
              a.endpointUrl || (a.endpointUrl = Us);
              var l = a.propertyStorageOverride;
              l && (!l.getProperty || !l.setProperty) && On("Invalid property storage override passed."), a.channels && U(a.channels, function(s) {
                s && U(s, function(c) {
                  if (c.identifier && c.version) {
                    var f = c.identifier + "=" + c.version;
                    d.push(f);
                  }
                });
              });
            }
            t.getWParam = function() {
              return typeof document < "u" || a.enableWParam ? 0 : -1;
            }, o && U(o, function(s) {
              if (s && s.identifier && s.version) {
                var c = s.identifier + "=" + s.version;
                d.push(c);
              }
            }), t.pluginVersionString = d.join(";"), t.pluginVersionStringArr = d;
            try {
              i.initialize(a, o, u, v), t.pollInternalLogs("InternalLog");
            } catch (s) {
              var S = t.logger, E = Nn(s);
              E.indexOf("channels") !== -1 && (E += `
 - Channels must be provided through config.channels only!`), gn(S, 1, 514, "SDK Initialization Failed - no telemetry will be sent: " + E);
            }
          }, function() {
            return { config: a, extensions: o, logger: u, notificationManager: v };
          });
        }, t.track = function(a) {
          hn(t, function() {
            return "AppInsightsCore.track";
          }, function() {
            var o = a;
            if (o) {
              o.timings = o.timings || {}, o.timings.trackStart = Hn(), Ys(o.latency) || (o.latency = 1);
              var u = o.ext = o.ext || {};
              u.sdk = u.sdk || {}, u.sdk.ver = pu;
              var v = o.baseData = o.baseData || {};
              v[Yt] = v[Yt] || {};
              var d = v[Yt];
              d[Xa] = d[Xa] || t.pluginVersionString || Qr;
            }
            i.track(o);
          }, function() {
            return { item: a };
          }, !a.sync);
        };
      }), e;
    }
    return r.__ieDyn = 1, r;
  }(As)
), Js = "device", mu = "locale", Bi = "ver", Vs = "browser", Zs = "browserVer", nc = "popSample", rc = "eventFlags", ji = "name", ec = "serviceName", Rn = wn({
  UserExt: [0, "user"],
  DeviceExt: [1, Js],
  TraceExt: [2, "trace"],
  WebExt: [3, "web"],
  AppExt: [4, "app"],
  OSExt: [5, "os"],
  SdkExt: [6, "sdk"],
  IntWebExt: [7, "intweb"],
  UtcExt: [8, "utc"],
  LocExt: [9, "loc"],
  CloudExt: [10, "cloud"],
  DtExt: [11, "dt"]
}), tc = wn({
  id: [0, "id"],
  ver: [1, Bi],
  appName: [2, ji],
  locale: [3, mu],
  expId: [4, "expId"],
  env: [5, "env"]
}), ic = wn({
  domain: [0, "domain"],
  browser: [1, Vs],
  browserVer: [2, Zs],
  screenRes: [3, "screenRes"],
  userConsent: [4, "userConsent"],
  consentDetails: [5, "consentDetails"]
}), ac = wn({
  locale: [0, mu],
  localId: [1, "localId"],
  id: [2, "id"]
}), oc = wn({
  osName: [0, ji],
  ver: [1, Bi]
}), uc = wn({
  ver: [0, Bi],
  seq: [1, "seq"],
  installId: [2, "installId"],
  epoch: [3, "epoch"]
}), fc = wn({
  msfpc: [0, "msfpc"],
  anid: [1, "anid"],
  serviceName: [2, ec]
}), sc = wn({
  popSample: [0, nc],
  eventFlags: [1, rc]
}), cc = wn({
  tz: [0, "tz"]
}), vc = wn({
  sessionId: [0, "sesId"]
}), lc = wn({
  localId: [0, "localId"],
  deviceClass: [1, "deviceClass"],
  make: [2, "make"],
  model: [3, "model"]
}), dc = wn({
  role: [0, "role"],
  roleInstance: [1, "roleInstance"],
  roleVer: [2, "roleVer"]
}), gc = wn({
  traceId: [0, "traceID"],
  traceName: [1, ji],
  parentId: [2, "parentID"]
}), _c = wn({
  traceId: [0, "traceId"],
  spanId: [1, "spanId"],
  traceFlags: [2, "traceFlags"]
}), ge;
function Du() {
  return ge === void 0 && (ge = !!hu(
    0
    /* StorageType.LocalStorage */
  )), ge;
}
function Cu() {
  return Du() ? hu(
    0
    /* StorageType.LocalStorage */
  ) : null;
}
function hu(n) {
  var r = null, e, t;
  try {
    var i = Tt();
    if (!i)
      return null;
    t = /* @__PURE__ */ new Date(), r = n === 0 ? i.localStorage : i.sessionStorage, r && an(r.setItem) && (r.setItem(t, t), e = r.getItem(t) !== t, r.removeItem(t), e && (r = null));
  } catch {
    r = null;
  }
  return r;
}
function Sc(n, r, e) {
  var t = Cu();
  if (t !== null)
    try {
      return t.setItem(r, e), !0;
    } catch (i) {
      ge = !1, gn(n, 1, 504, "Browser failed write to local storage. " + i);
    }
  return !1;
}
function Ec(n, r) {
  var e = Cu();
  if (e !== null)
    try {
      return e.getItem(r);
    } catch (t) {
      ge = !1, gn(n, 1, 503, "Browser failed read of local storage. " + t);
    }
  return null;
}
function Tc() {
  return this.getId();
}
function Ic(n) {
  this.setId(n);
}
var xu = (
  /** @class */
  function() {
    function n() {
      nn(n, this, function(r) {
        r.setId = function(e) {
          r.customId = e;
        }, r.getId = function() {
          return Un(r.customId) ? r.customId : r.automaticId;
        };
      });
    }
    return n._staticInit = function() {
      Gn(n.prototype, "id", Tc, Ic);
    }(), n;
  }()
), Qa = "ai_session", pc = (
  /** @class */
  function() {
    function n(r, e) {
      var t, i = jo(r), a = jr(r), o;
      nn(n, this, function(u) {
        var v = d(e);
        an(e.sessionExpirationMs) || (v.sessionExpirationMs = function() {
          return n.acquisitionSpan;
        }), an(e.sessionRenewalMs) || (v.sessionRenewalMs = function() {
          return n.renewalSpan;
        }), u.config = v, o = function() {
          return u.config.namePrefix && u.config.namePrefix() ? Qa + u.config.namePrefix() : Qa;
        }, u.automaticSession = new xu(), u.update = function() {
          u.automaticSession.getId() || l();
          var f = u.automaticSession, T = u.config, m = (/* @__PURE__ */ new Date()).getTime(), R = m - f.acquisitionDate > T.sessionExpirationMs(), b = m - f.renewalDate > T.sessionRenewalMs();
          if (R || b)
            E();
          else {
            var N = t;
            (!N || m - N > n.cookieUpdateInterval) && (f.renewalDate = m, s(f.getId(), f.acquisitionDate, f.renewalDate));
          }
        }, u.backup = function() {
          var f = u.automaticSession;
          c(f.getId(), f.acquisitionDate, f.renewalDate);
        };
        function d(f) {
          return {
            sessionRenewalMs: f.sessionRenewalMs && function() {
              return f.sessionRenewalMs;
            },
            sessionExpirationMs: f.sessionExpirationMs && function() {
              return f.sessionExpirationMs;
            },
            cookieDomain: f.cookieDomain && function() {
              return f.cookieDomain;
            },
            namePrefix: f.namePrefix && function() {
              return f.namePrefix;
            },
            sessionAsGuid: function() {
              return f.sessionAsGuid;
            },
            idLength: function() {
              return f.idLength ? f.idLength : 22;
            }
          };
        }
        function l() {
          var f = a.get(o());
          if (f && an(f.split))
            S(f);
          else {
            var T = Ec(i, o());
            T && S(T);
          }
          u.automaticSession.getId() || E();
        }
        function S(f) {
          var T = u.automaticSession, m = f.split("|");
          m.length > 0 && T.setId(m[0]);
          try {
            if (m.length > 1) {
              var R = +m[1];
              T.acquisitionDate = +new Date(R), T.acquisitionDate = T.acquisitionDate > 0 ? T.acquisitionDate : 0;
            }
            if (m.length > 2) {
              var b = +m[2];
              T.renewalDate = +new Date(b), T.renewalDate = T.renewalDate > 0 ? T.renewalDate : 0;
            }
          } catch (N) {
            gn(i, 1, 510, "Error parsing ai_session cookie, session will be reset: " + N);
          }
          T.renewalDate === 0 && gn(i, 2, 517, "AI session renewal date is 0, session will be reset.");
        }
        function E() {
          var f = u.automaticSession, T = (/* @__PURE__ */ new Date()).getTime(), m = u.config.sessionAsGuid();
          !sn(m) && m ? pe(m) ? f.setId(ja()) : f.setId(ja(m)) : f.setId(Ki(v && v.idLength ? v.idLength() : 22)), f.acquisitionDate = T, f.renewalDate = T, s(f.getId(), f.acquisitionDate, f.renewalDate), Du() || gn(i, 2, 505, "Browser does not support local storage. Session durations will be inaccurate.");
        }
        function s(f, T, m) {
          var R = T + u.config.sessionExpirationMs(), b = m + u.config.sessionRenewalMs(), N = /* @__PURE__ */ new Date(), k = [f, T, m];
          R < b ? N.setTime(R) : N.setTime(b);
          var G = u.config.cookieDomain ? u.config.cookieDomain() : null;
          a.set(o(), k.join("|") + ";expires=" + N.toUTCString(), null, G), t = (/* @__PURE__ */ new Date()).getTime();
        }
        function c(f, T, m) {
          Sc(i, o(), [f, T, m].join("|"));
        }
      });
    }
    return n.acquisitionSpan = 864e5, n.renewalSpan = 18e5, n.cookieUpdateInterval = 6e4, n;
  }()
), Qi = [
  "AX",
  "EX",
  "SF",
  "CS",
  "CF",
  "CT",
  "CU",
  "DC",
  "DF",
  "H5",
  "HL",
  "WS",
  "WP"
  // WINDOWSPHONE
];
function $a(n, r) {
  r === void 0 && (r = Qi);
  var e = null;
  if (n)
    for (var t = n.split(","), i = 0; i < t.length; i++)
      mc(t[i], r) && (e ? e += "," + t[i] : e = t[i]);
  return e;
}
function mc(n, r) {
  if (r === void 0 && (r = Qi), !n || n.length < 4)
    return !1;
  for (var e = !1, t = 256, i = n.substring(0, 3).toString().toUpperCase(), a = 0; a < r.length; a++)
    if (r[a] + ":" === i && n.length <= t) {
      e = !0;
      break;
    }
  return e;
}
function Dc() {
  return this.getExpId();
}
var Cc = (
  /** @class */
  function() {
    function n(r, e) {
      var t = null, i = Qi.slice(0), a = "Treatments", o = jr(e), u = r;
      nn(n, this, function(v) {
        if (qo()) {
          var d = dr().documentElement;
          d && (v.locale = d.lang);
        }
        v.env = r.env ? r.env : l("awa-").env, v.getExpId = function() {
          return u.expId ? s(u.expId) : E();
        };
        function l(c) {
          var f, T = {}, m = dr();
          if (m) {
            f = m && m.querySelectorAll("meta");
            for (var R = 0; R < f.length; R++) {
              var b = f[R];
              if (b.name) {
                var N = b.name.toLowerCase();
                if (N.indexOf(c) === 0) {
                  var k = b.name.replace(c, "");
                  T[k] = b.content;
                }
              }
            }
          }
          return T;
        }
        function S(c) {
          c !== t && (t = $a(c, i));
        }
        function E() {
          var c = Rr(o, a);
          return S(c), t;
        }
        function s(c) {
          return S(c), t;
        }
      });
    }
    return n.validateAppExpId = $a, n._staticInit = function() {
      Gn(n.prototype, "expId", Dc);
    }(), n;
  }()
), hc = (
  /** @class */
  /* @__PURE__ */ function() {
    function n() {
    }
    return n;
  }()
), xc = (
  /** @class */
  /* @__PURE__ */ function() {
    function n() {
    }
    return n;
  }()
);
function yc() {
  return this.getMsfpc();
}
function wc() {
  return this.getAnid();
}
var bc = (
  /** @class */
  function() {
    function n(r, e) {
      var t = jr(e);
      nn(n, this, function(i) {
        r.serviceName && (i.serviceName = r.serviceName), i.getMsfpc = function() {
          return Rr(t, "MSFPC");
        }, i.getAnid = function() {
          return Rr(t, "ANON").slice(0, 34);
        };
      });
    }
    return n._staticInit = function() {
      var r = n.prototype;
      Gn(r, "msfpc", yc), Gn(r, "anid", wc);
    }(), n;
  }()
), Rc = (
  /** @class */
  /* @__PURE__ */ function() {
    function n() {
      var r = (/* @__PURE__ */ new Date()).getTimezoneOffset(), e = r % 60, t = (r - e) / 60, i = "+";
      t > 0 && (i = "-"), t = Math.abs(t), e = Math.abs(e), this.tz = i + (t < 10 ? "0" + t : t.toString()) + ":" + (e < 10 ? "0" + e : e.toString());
    }
    return n;
  }()
), tr = {
  WIN: /(windows|win32)/i,
  WINRT: / arm;/i,
  WINPHONE: /windows\sphone\s\d+\.\d+/i,
  OSX: /(macintosh|mac os x)/i,
  IOS: /(ipad|iphone|ipod)(?=.*like mac os x)/i,
  LINUX: /(linux|joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)/i,
  ANDROID: /android/i,
  CROS: /CrOS/i
}, Ja = {
  "5.1": "XP",
  "6.0": "Vista",
  "6.1": "7",
  "6.2": "8",
  "6.3": "8.1",
  "10.0": "10"
}, Oc = "([\\d,.]+)", yu = "([\\d,_,.]+)", $r = "Unknown", Va = [
  { r: tr.WINPHONE, os: "Windows Phone" },
  { r: tr.WINRT, os: "Windows RT" },
  {
    r: tr.WIN,
    os: "Windows"
    /* OPERATING_SYSTEMS.WINDOWS */
  },
  {
    r: tr.IOS,
    os: "iOS"
    /* OPERATING_SYSTEMS.IOS */
  },
  {
    r: tr.ANDROID,
    os: "Android"
    /* OPERATING_SYSTEMS.ANDROID */
  },
  { r: tr.LINUX, os: "Linux" },
  { r: tr.CROS, os: "Chrome OS" },
  { s: "x11", os: "Unix" },
  { s: "blackberry", os: "BlackBerry" },
  { s: "symbian", os: "Symbian" },
  { s: "nokia", os: "Nokia" },
  {
    r: tr.OSX,
    os: "Mac OS X"
    /* OPERATING_SYSTEMS.MACOSX */
  }
];
function Nc(n) {
  for (var r = 0; r < Va.length; r++) {
    var e = Va[r];
    if (e.r && n.match(e.r))
      return e.os;
    if (e.s && n.indexOf(e.s) !== -1)
      return e.os;
  }
  return $r;
}
function Pc(n, r) {
  return r === "Windows" ? Za(n, "Windows NT") : r === "Android" ? Za(n, r) : r === "Mac OS X" ? Mc(n) : r === "iOS" ? Lc(n) : $r;
}
function Za(n, r) {
  var e = n.match(new RegExp(r + " " + Oc));
  return e ? Ja[e[1]] ? Ja[e[1]] : e[1] : $r;
}
function Mc(n) {
  var r = n.match(new RegExp("Mac OS X " + yu));
  if (r) {
    var e = r[1].replace(/_/g, ".");
    if (e) {
      var t = wu(e);
      if (t) {
        var i = e.split(t);
        return i[0];
      } else
        return e;
    }
  }
  return $r;
}
function Lc(n) {
  var r = n.match(new RegExp("OS " + yu));
  if (r) {
    var e = r[1].replace(/_/g, ".");
    if (e) {
      var t = wu(e);
      if (t) {
        var i = e.split(t);
        return i[0];
      } else
        return e;
    }
  }
  return $r;
}
function wu(n) {
  return n.indexOf(".") > -1 ? "." : n.indexOf("_") > -1 ? "_" : null;
}
var Ac = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(r) {
      if (r.populateOperatingSystemInfo) {
        var e = this, t = Or() || {}, i = r.userAgent || t.userAgent || "", a = r.userAgentData || t.userAgentData || {};
        if (i) {
          var o = Nc(i.toLowerCase());
          e.name = o, e.ver = Pc(i, o);
        }
        (!e.name || e.name === $r) && Un(a.platform) && (e.name = a.platform);
      }
    }
    return n;
  }()
), qt = "MicrosoftApplicationsTelemetryDeviceId";
function Uc(n, r, e, t) {
  r ? r.setProperty(e, t) : n.set(e, t, 31536e3);
}
function kc(n, r, e) {
  return r ? r.getProperty(e) || "" : Rr(n, e);
}
var Fc = (
  /** @class */
  function() {
    function n(r, e) {
      var t = 0;
      nn(n, this, function(i) {
        var a = r.propertyStorageOverride;
        i.seq = t, i.epoch = me(!1).toString();
        var o = jr(e, r);
        if (o.isEnabled() || a) {
          var u = kc(o, a, qt);
          u || (u = du()), Uc(o, a, qt, u), i.installId = u;
        } else
          o.purge(qt);
        i.getSequenceId = function() {
          return ++t;
        };
      });
    }
    return n.__ieDyn = 1, n;
  }()
), zc = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(r, e, t, i) {
      var a = this;
      if (a.traceId = e || Ei(), r.enableDistributedTracing && !t && (t = Ei().substring(0, 16)), a.parentId = t, r.enableApplicationInsightsTrace) {
        a.name = i;
        var o = mt();
        o && o.pathname && (a.name = o.pathname);
      }
    }
    return n;
  }()
), bu = "setLocalId";
function Hc() {
  return this.getLocalId();
}
function Kc(n) {
  this[bu](n);
}
var Yc = (
  /** @class */
  function() {
    function n(r, e, t) {
      var i = e, a, o = jr(t, r);
      nn(n, this, function(u) {
        if (o && o.isEnabled() && (c(), i.enableApplicationInsightsUser)) {
          var v = Rr(o, n.userCookieName);
          if (v) {
            var d = v.split(n.cookieSeparator);
            d.length > 0 && (u.id = d[0]);
          }
          if (!u.id) {
            u.id = Ki(r && !sn(r.idLength) ? r.idLength : 22);
            var l = vi(/* @__PURE__ */ new Date());
            u.accountAcquisitionDate = l;
            var S = [u.id, l], E = i.cookieDomain ? i.cookieDomain : void 0;
            o.set(n.userCookieName, S.join(n.cookieSeparator), 31536e3, E);
          }
        }
        if (typeof navigator < "u") {
          var s = navigator;
          u.locale = s.userLanguage || s.language;
        }
        u.getLocalId = function() {
          return a || c();
        }, u[bu] = function(f) {
          a = f;
        };
        function c() {
          if (!i.hashIdentifiers && !i.dropIdentifiers) {
            var f = Rr(o, "MUID");
            f && (a = "t:" + f);
          }
          return a;
        }
      });
    }
    return n.cookieSeparator = "|", n.userCookieName = "ai_user", n._staticInit = function() {
      Gn(n.prototype, "localId", Hc, Kc);
    }(), n;
  }()
), qc = 1048576, Gc = 2097152, Wc = 4194304, Xc = (
  /** @class */
  /* @__PURE__ */ function() {
    function n(r) {
      var e = this;
      e.popSample = 100, e.eventFlags = 0, r.hashIdentifiers && (e.eventFlags = e.eventFlags | qc), r.dropIdentifiers && (e.eventFlags = e.eventFlags | Gc), r.scrubIpOnly && (e.eventFlags = e.eventFlags | Wc);
    }
    return n;
  }()
), no = [
  "Required",
  "Analytics",
  "SocialMedia",
  "Advertising"
], _t = "([\\d,.]+)", Ru = "Unknown", Ou = "Edg/", Gt = [
  {
    ua: "OPR/",
    b: "Opera"
    /* BROWSERS.OPERA */
  },
  {
    ua: "PhantomJS",
    b: "PhantomJS"
    /* BROWSERS.PHANTOMJS */
  },
  {
    ua: "Edge",
    b: "Edge"
    /* BROWSERS.EDGE */
  },
  {
    ua: Ou,
    b: "Edge"
    /* BROWSERS.EDGE */
  },
  {
    ua: "Electron",
    b: "Electron"
    /* BROWSERS.ELECTRON */
  },
  {
    ua: "Chrome",
    b: "Chrome"
    /* BROWSERS.CHROME */
  },
  {
    ua: "Trident",
    b: "MSIE"
    /* BROWSERS.MSIE */
  },
  {
    ua: "MSIE ",
    b: "MSIE"
    /* BROWSERS.MSIE */
  },
  {
    ua: "Firefox",
    b: "Firefox"
    /* BROWSERS.FIREFOX */
  },
  {
    ua: "Safari",
    b: "Safari"
    /* BROWSERS.SAFARI */
  },
  {
    ua: "SkypeShell",
    b: "SkypeShell"
    /* BROWSERS.SKYPE_SHELL */
  }
  // Check for Skype shell
], Wt = [
  {
    br: "Microsoft Edge",
    b: "Edge"
    /* BROWSERS.EDGE */
  },
  {
    br: "Google Chrome",
    b: "Chrome"
    /* BROWSERS.CHROME */
  },
  {
    br: "Opera",
    b: "Opera"
    /* BROWSERS.OPERA */
  }
];
function Nu(n, r) {
  return r.indexOf(n) > -1;
}
function Bc(n, r) {
  for (var e = 0; e < r.length; e++)
    if (n == r[e].brand)
      return r[e].version;
  return null;
}
function jc(n) {
  if (n)
    for (var r = 0; r < Gt.length; r++) {
      var e = Gt[r].ua;
      if (Nu(e, n))
        return Gt[r].b;
    }
  return Ru;
}
function Qc(n, r) {
  return r === "MSIE" ? $c(n) : Jc(r, n);
}
function $c(n) {
  var r = n.match(new RegExp("MSIE " + _t));
  if (r)
    return r[1];
  var e = n.match(new RegExp("rv:" + _t));
  if (e)
    return e[1];
}
function Jc(n, r) {
  n === "Safari" ? n = "Version" : n === "Edge" && Nu(Ou, r) && (n = "Edg");
  var e = r.match(new RegExp(n + "/" + _t));
  return e || n === "Opera" && (e = r.match(new RegExp("OPR/" + _t)), e) ? e[1] : Ru;
}
function Vc() {
  var n = { h: 0, w: 0 }, r = we();
  return r && r.screen && (n.h = screen.height, n.w = screen.width), n;
}
function Zc() {
  return this.getUserConsent();
}
var nv = (
  /** @class */
  function() {
    function n(r, e) {
      var t = jr(e), i = r || {};
      nn(n, this, function(a) {
        var o = mt();
        if (o) {
          var u = o.hostname;
          u && (a.domain = o.protocol === "file:" ? "local" : u);
        }
        if (i.populateBrowserInfo) {
          var v = i.userAgent, d = (i.userAgentData || {}).brands, l = Or();
          l && (v = v || l.userAgent || "", d = d || (l.userAgentData || {}).brands), E(v, d);
          var S = Vc();
          a.screenRes = S.w + "X" + S.h;
        }
        sn(i.gpcDataSharingOptIn) ? a.gpcDataSharingOptIn = null : a.gpcDataSharingOptIn = i.gpcDataSharingOptIn, a.getUserConsent = function() {
          return i.userConsented || !!Rr(t, i.userConsentCookieName || "MSCC");
        }, a.getUserConsentDetails = function() {
          var s = null;
          try {
            var c = i.callback;
            if (c && c.userConsentDetails) {
              var f = c.userConsentDetails();
              if (f) {
                i.disableConsentDetailsSanitize ? s = f : s = {};
                for (var T = 0; T < no.length; T++) {
                  var m = no[T];
                  s[m] = f[m] || !1;
                }
              }
            }
            var R = a.gpcDataSharingOptIn;
            return R !== null && (s = s || {}, s.GPC_DataSharingOptIn = !!R), s ? JSON.stringify(s) : null;
          } catch {
          }
        };
        function E(s, c) {
          if (Q(c))
            try {
              for (var f = 0; f < Wt.length; f++) {
                var T = Bc(Wt[f].br, c);
                if (T) {
                  a.browser = Wt[f].b, a.browserVer = T;
                  return;
                }
              }
            } catch {
            }
          if (s) {
            var m = jc(s);
            a.browser = m, a.browserVer = Qc(s, m);
          }
        }
        Gn(a, "userConsent", a.getUserConsent);
      });
    }
    return n._staticInit = function() {
      Gn(n.prototype, "userConsent", Zc);
    }(), n;
  }()
);
function bn(n, r, e, t, i) {
  var a = r.ext[Rn[n]];
  if (a)
    try {
      yn(t, function(o, u) {
        if (Un(u) || wr(u) || pe(u)) {
          var v = a[e[o]];
          !i && (v || Un(v) || wr(v) || pe(v)) && (u = v), a[e[o]] = u;
        }
      });
    } catch {
    }
  return a;
}
var rv = (
  /** @class */
  function() {
    function n(r, e, t) {
      nn(n, this, function(i) {
        i.app = new Cc(e, t), i.cloud = new hc(), i.user = new Yc(r, e, t), i.os = new Ac(e), i.web = new nv(e, t);
        var a = new Fc(r, t), o = new bc(e, t), u = new Xc(e);
        i.loc = new Rc(), i.device = new xc();
        var v = new pc(t, e);
        i.session = new xu();
        var d = ev(new zc(e), E()), l = !(e || {}).eventContainExtFields;
        function S() {
          var s = i.session;
          if (s && Un(s.customId))
            return s.customId;
          v.update();
          var c = v.automaticSession;
          if (c) {
            var f = c.getId();
            f && Un(f) && (s.automaticId = f);
          }
          return s.automaticId;
        }
        i.getTraceCtx = function() {
          return d;
        }, i.getSessionId = S, i.applyApplicationContext = function(s) {
          var c, f = i.app;
          bn(4, s, tc, (c = {}, c[
            0
            /* eAppExtensionKeys.id */
          ] = f.id, c[
            1
            /* eAppExtensionKeys.ver */
          ] = f.ver, c[
            2
            /* eAppExtensionKeys.appName */
          ] = f.name, c[
            3
            /* eAppExtensionKeys.locale */
          ] = f.locale, c[
            4
            /* eAppExtensionKeys.expId */
          ] = f.getExpId(), c[
            5
            /* eAppExtensionKeys.env */
          ] = f.env, c), l);
        }, i.applyUserContext = function(s) {
          var c, f = i.user;
          bn(0, s, ac, (c = {}, c[
            1
            /* eUserExtensionKeys.localId */
          ] = f.getLocalId(), c[
            0
            /* eUserExtensionKeys.locale */
          ] = f.locale, c[
            2
            /* eUserExtensionKeys.id */
          ] = f.id, c), l);
        }, i.applyWebContext = function(s) {
          var c, f = i.web;
          bn(3, s, ic, (c = {}, c[
            0
            /* eWebExtensionKeys.domain */
          ] = f.domain, c[
            1
            /* eWebExtensionKeys.browser */
          ] = f.browser, c[
            2
            /* eWebExtensionKeys.browserVer */
          ] = f.browserVer, c[
            3
            /* eWebExtensionKeys.screenRes */
          ] = f.screenRes, c[
            5
            /* eWebExtensionKeys.consentDetails */
          ] = f.getUserConsentDetails(), c[
            4
            /* eWebExtensionKeys.userConsent */
          ] = f.getUserConsent(), c), l);
        }, i.applyOsContext = function(s) {
          var c, f = i.os;
          bn(5, s, oc, (c = {}, c[
            0
            /* eOSExtKeys.osName */
          ] = f.name, c[
            1
            /* eOSExtKeys.ver */
          ] = f.ver, c), l);
        }, i.applySdkContext = function(s) {
          var c;
          bn(6, s, uc, (c = {}, c[
            2
            /* eSDKExtKeys.installId */
          ] = a.installId, c[
            1
            /* eSDKExtKeys.seq */
          ] = a.getSequenceId(), c[
            3
            /* eSDKExtKeys.epoch */
          ] = a.epoch, c), l);
        }, i.applyIntWebContext = function(s) {
          var c;
          bn(7, s, fc, (c = {}, c[
            0
            /* eIntWebExtKeys.msfpc */
          ] = o.getMsfpc(), c[
            1
            /* eIntWebExtKeys.anid */
          ] = o.getAnid(), c[
            2
            /* eIntWebExtKeys.serviceName */
          ] = o.serviceName, c), l);
        }, i.applyUtcContext = function(s) {
          var c, f = (c = {}, c[
            0
            /* eUtcExtKeys.popSample */
          ] = u.popSample, c);
          u.eventFlags > 0 && (f[
            1
            /* eUtcExtKeys.eventFlags */
          ] = u.eventFlags), bn(8, s, sc, f, l);
        }, i.applyLocContext = function(s) {
          var c;
          bn(9, s, cc, (c = {}, c[
            0
            /* eLocExtKeys.tz */
          ] = i.loc.tz, c), l);
        }, i.applySessionContext = function(s) {
          var c;
          bn(4, s, vc, (c = {}, c[
            0
            /* eSessionExtKeys.sessionId */
          ] = S(), c), l);
        }, i.applyDeviceContext = function(s) {
          var c, f = i.device;
          bn(1, s, lc, (c = {}, c[
            0
            /* eDeviceExtKeys.localId */
          ] = f.localId, c[
            2
            /* eDeviceExtKeys.make */
          ] = f.make, c[
            3
            /* eDeviceExtKeys.model */
          ] = f.model, c[
            1
            /* eDeviceExtKeys.deviceClass */
          ] = f.deviceClass, c), l);
        }, i.applyCloudContext = function(s) {
          var c, f = i.cloud;
          bn(10, s, dc, (c = {}, c[
            0
            /* eCloudExtKeys.role */
          ] = f.role, c[
            1
            /* eCloudExtKeys.roleInstance */
          ] = f.roleInstance, c[
            2
            /* eCloudExtKeys.roleVer */
          ] = f.roleVer, c), l);
        }, i.applyAITraceContext = function(s) {
          var c;
          if (e.enableApplicationInsightsTrace) {
            var f = E();
            f && bn(2, s, gc, (c = {}, c[
              0
              /* eTraceExtKeys.traceId */
            ] = f.getTraceId(), c[
              1
              /* eTraceExtKeys.traceName */
            ] = f.getName(), c[
              2
              /* eTraceExtKeys.parentId */
            ] = f.getSpanId(), c), !1);
          }
        }, i.applyDistributedTraceContext = function(s) {
          var c, f = E();
          if (f) {
            var T = (c = {}, c[
              0
              /* eDistributedTraceExtKeys.traceId */
            ] = f.getTraceId(), c[
              1
              /* eDistributedTraceExtKeys.spanId */
            ] = f.getSpanId(), c), m = f.getTraceFlags();
            V(m) || (T[
              2
              /* eDistributedTraceExtKeys.traceFlags */
            ] = m), bn(11, s, _c, T, !1);
          }
        };
        function E() {
          var s = d;
          return t && t.getTraceCtx && (s = t.getTraceCtx(!1) || d), s;
        }
      });
    }
    return n.__ieDyn = 1, n;
  }()
);
function ev(n, r) {
  var e = n || {};
  return {
    getName: function() {
      return e.name;
    },
    setName: function(t) {
      r && r.setName(t), e.name = t;
    },
    getTraceId: function() {
      return e.traceId;
    },
    setTraceId: function(t) {
      r && r.setTraceId(t), _u(t) && (e.traceId = t);
    },
    getSpanId: function() {
      return e.parentId;
    },
    setSpanId: function(t) {
      r && r.setSpanId(t), Su(t) && (e.parentId = t);
    },
    getTraceFlags: function() {
      return e.traceFlags;
    },
    setTraceFlags: function(t) {
      r && r.setTraceFlags(t), e.traceFlags = t;
    }
  };
}
var tv = [
  Rn[
    4
    /* eExtensions.AppExt */
  ],
  Rn[
    0
    /* eExtensions.UserExt */
  ],
  Rn[
    3
    /* eExtensions.WebExt */
  ],
  Rn[
    5
    /* eExtensions.OSExt */
  ],
  Rn[
    6
    /* eExtensions.SdkExt */
  ],
  Rn[
    7
    /* eExtensions.IntWebExt */
  ],
  Rn[
    8
    /* eExtensions.UtcExt */
  ],
  Rn[
    9
    /* eExtensions.LocExt */
  ],
  Rn[
    1
    /* eExtensions.DeviceExt */
  ],
  Rn[
    2
    /* eExtensions.TraceExt */
  ],
  Rn[
    11
    /* eExtensions.DtExt */
  ],
  Rn[
    10
    /* eExtensions.CloudExt */
  ]
], iv = (
  /** @class */
  function(n) {
    Br(r, n);
    function r() {
      var e = n.call(this) || this;
      e.identifier = "SystemPropertiesCollector", e.priority = 3, e.version = "3.2.18";
      var t, i, a;
      return nn(r, e, function(o, u) {
        v(), o.initialize = function(l, S, E) {
          u.initialize(l, S, E), a = o._getTelCtx().getExtCfg(o.identifier), t = new rv(l, a, S), S && S.setTraceCtx && S.setTraceCtx(t.getTraceCtx());
        }, o.processTelemetry = function(l, S) {
          Ti(l, o.identifier), S = o._getTelCtx(S);
          var E = l.ext = l.ext ? l.ext : {};
          l.data = l.data ? l.data : {}, U(tv, function(s) {
            E[s] = E[s] || {};
          }), t && (t.applyUtcContext(l), t.applyApplicationContext(l), t.applyUserContext(l), t.applyWebContext(l), t.applyOsContext(l), t.applySdkContext(l), t.applyIntWebContext(l), t.applyLocContext(l), t.applySessionContext(l), t.applyDeviceContext(l), a.enableApplicationInsightsTrace && t.applyAITraceContext(l), a.enableDistributedTracing && t.applyDistributedTraceContext(l), t.applyCloudContext(l)), U(Wr(E), function(s) {
            Wr(E[s]).length === 0 && delete E[s];
          }), d(i, l.data), o.processNext(l, S);
        }, o.getPropertiesContext = function() {
          return t;
        }, o.setProperty = function(l, S) {
          i[l] = S;
        }, o._doTeardown = function(l, S) {
          var E = (l || {}).core();
          if (E && E.getTraceCtx && t) {
            var s = E.getTraceCtx(!1);
            s && s === t.getTraceCtx() && E.setTraceCtx(null);
          }
          v();
        };
        function v() {
          t = null, i = {};
        }
        function d(l, S) {
          l && yn(l, function(E, s) {
            S[E] || (S[E] = s);
          });
        }
      }), e;
    }
    return r.__ieDyn = 1, r;
  }(Xi)
), qe = "REAL_TIME", av = "NEAR_REAL_TIME", ov = "BEST_EFFORT", ir = "", Xt = "POST", uv = "Microsoft_ApplicationInsights_BypassAjaxInstrumentation", pi = "drop", fv = "send", ro = "requeue", sv = "rspFail", cv = "oth", vv = "no-cache, no-store", eo = "application/x-json-stream", to = "cache-control", Bt = "content-type", lv = "kill-tokens", io = "kill-duration", dv = "kill-duration-seconds", ao = "time-delta-millis", mi = "client-version", Pu = "client-id", Di = "time-delta-to-apply-millis", Ci = "upload-time", hi = "apikey", xi = "AuthMsaDeviceTicket", oo = "AuthXToken", gv = "NoResponseBody", St = "msfpc", uo = "trace", jt = "user";
function Mu(n) {
  var r = (n.ext || {}).intweb;
  return r && ur(r[St]) ? r[St] : null;
}
function fo(n) {
  for (var r = null, e = 0; r === null && e < n.length; e++)
    r = Mu(n[e]);
  return r;
}
var Et = (
  /** @class */
  function() {
    function n(r, e) {
      var t = e ? [].concat(e) : [], i = this, a = fo(t);
      i.iKey = function() {
        return r;
      }, i.Msfpc = function() {
        return a || ir;
      }, i.count = function() {
        return t.length;
      }, i.events = function() {
        return t;
      }, i.addEvent = function(o) {
        return o ? (t.push(o), a || (a = Mu(o)), !0) : !1;
      }, i.split = function(o, u) {
        var v;
        if (o < t.length) {
          var d = t.length - o;
          V(u) || (d = u < d ? u : d), v = t.splice(o, d), a = fo(t);
        }
        return new n(r, v);
      };
    }
    return n.create = function(r, e) {
      return new n(r, e);
    }, n;
  }()
), _v = (
  /** @class */
  function() {
    function n() {
      var r = !0, e = !0, t = !0, i = "use-collector-delta", a = !1;
      nn(n, this, function(o) {
        o.allowRequestSending = function() {
          return r;
        }, o.firstRequestSent = function() {
          t && (t = !1, a || (r = !1));
        }, o.shouldAddClockSkewHeaders = function() {
          return e;
        }, o.getClockSkewHeaderValue = function() {
          return i;
        }, o.setClockSkew = function(u) {
          a || (u ? (i = u, e = !0, a = !0) : e = !1, r = !0);
        };
      });
    }
    return n.__ieDyn = 1, n;
  }()
), Sv = 1e3, Ev = (
  /** @class */
  function() {
    function n() {
      var r = {};
      function e(t) {
        var i = [];
        return t && U(t, function(a) {
          i.push(Cn(a));
        }), i;
      }
      nn(n, this, function(t) {
        t.setKillSwitchTenants = function(i, a) {
          if (i && a)
            try {
              var o = e(i.split(","));
              if (a === "this-request-only")
                return o;
              for (var u = parseInt(a, 10) * Sv, v = 0; v < o.length; ++v)
                r[o[v]] = lr() + u;
            } catch {
              return [];
            }
          return [];
        }, t.isTenantKilled = function(i) {
          var a = r, o = Cn(i);
          return a[o] !== void 0 && a[o] > lr() ? !0 : (delete a[o], !1);
        };
      });
    }
    return n.__ieDyn = 1, n;
  }()
), Tv = 0.8, Iv = 1.2, so = 3e3, pv = 6e5;
function mv(n) {
  return !(n >= 300 && n < 500 && n != 408 && n != 429 || n == 501 || n == 505);
}
function Lu(n) {
  var r = 0, e = so * Tv, t = so * Iv, i = Math.floor(Math.random() * (t - e)) + e;
  return r = Math.pow(2, n) * i, Math.min(r, pv);
}
var Dv = 20, Cv = 3984588, Au = 65e3, Uu = 2e6, hv = Math.min(Uu, Au), co = "metadata", Ge = "f", xv = /\./, yv = (
  /** @class */
  function() {
    function n(r, e, t, i) {
      var a = "data", o = "baseData", u = "ext", v = !!i, d = !0, l = e, S = {};
      nn(n, this, function(E) {
        E.createPayload = function(f, T, m, R, b, N) {
          return {
            apiKeys: [],
            payloadBlob: ir,
            overflow: null,
            sizeExceed: [],
            failedEvts: [],
            batches: [],
            numEvents: 0,
            retryCnt: f,
            isTeardown: T,
            isSync: m,
            isBeacon: R,
            sendType: N,
            sendReason: b
          };
        }, E.appendPayload = function(f, T, m) {
          var R = f && T && !f.overflow;
          return R && hn(r, function() {
            return "Serializer:appendPayload";
          }, function() {
            for (var b = T.events(), N = f.payloadBlob, k = f.numEvents, G = !1, D = [], J = [], cn = f.isBeacon, $ = cn ? Au : Cv, on = cn ? hv : Uu, un = 0, rn = 0; un < b.length; ) {
              var H = b[un];
              if (H) {
                if (k >= m) {
                  f.overflow = T.split(un);
                  break;
                }
                var L = E.getEventBlob(H);
                if (L && L.length <= on) {
                  var vn = L.length, Wn = N.length;
                  if (Wn + vn > $) {
                    f.overflow = T.split(un);
                    break;
                  }
                  N && (N += `
`), N += L, rn++, rn > Dv && (N.substr(0, 1), rn = 0), G = !0, k++;
                } else
                  L ? D.push(H) : J.push(H), b.splice(un, 1), un--;
              }
              un++;
            }
            if (D && D.length > 0 && f.sizeExceed.push(Et.create(T.iKey(), D)), J && J.length > 0 && f.failedEvts.push(Et.create(T.iKey(), J)), G) {
              f.batches.push(T), f.payloadBlob = N, f.numEvents = k;
              var In = T.iKey();
              vr(f.apiKeys, In) === -1 && f.apiKeys.push(In);
            }
          }, function() {
            return { payload: f, theBatch: { iKey: T.iKey(), evts: T.events() }, max: m };
          }), R;
        }, E.getEventBlob = function(f) {
          try {
            return hn(r, function() {
              return "Serializer.getEventBlob";
            }, function() {
              var T = {};
              T.name = f.name, T.time = f.time, T.ver = f.ver, T.iKey = "o:" + Ks(f.iKey);
              var m = {}, R = f[u];
              R && (T[u] = m, yn(R, function(k, G) {
                var D = m[k] = {};
                c(G, D, "ext." + k, !0, null, null, !0);
              }));
              var b = T[a] = {};
              b.baseType = f.baseType;
              var N = b[o] = {};
              return c(f.baseData, N, o, !1, [o], function(k, G, D) {
                vo(m, k, G, D);
              }, d), c(f.data, b, a, !1, [], function(k, G, D) {
                vo(m, k, G, D);
              }, d), JSON.stringify(T);
            }, function() {
              return { item: f };
            });
          } catch {
            return null;
          }
        };
        function s(f, T) {
          var m = S[f];
          return m === void 0 && (f.length >= 7 && (m = da(f, "ext.metadata") || da(f, "ext.web")), S[f] = m), m;
        }
        function c(f, T, m, R, b, N, k) {
          yn(f, function(G, D) {
            var J = null;
            if (D || ur(D)) {
              var cn = m, $ = G, on = b, un = T;
              if (v && !R && xv.test(G)) {
                var rn = G.split("."), H = rn.length;
                if (H > 1) {
                  on && (on = on.slice());
                  for (var L = 0; L < H - 1; L++) {
                    var vn = rn[L];
                    un = un[vn] = un[vn] || {}, cn += "." + vn, on && on.push(vn);
                  }
                  $ = rn[H - 1];
                }
              }
              var Wn = R && s(cn);
              if (!Wn && l && l.handleField(cn, $) ? J = l.value(cn, $, D, t) : J = qs($, D, t), J) {
                var In = J.value;
                if (un[$] = In, N && N(on, $, J), typeof In == "object" && !Q(In)) {
                  var Mn = on;
                  Mn && (Mn = Mn.slice(), Mn.push($)), c(D, In, cn + "." + $, R, Mn, N);
                }
              }
            }
          });
        }
      });
    }
    return n.__ieDyn = 1, n;
  }()
);
function vo(n, r, e, t) {
  if (t && n) {
    var i = Gs(t.value, t.kind, t.propertyType);
    if (i > -1) {
      var a = n[co];
      a || (a = n[co] = { f: {} });
      var o = a[Ge];
      if (o || (o = a[Ge] = {}), r)
        for (var u = 0; u < r.length; u++) {
          var v = r[u];
          o[v] || (o[v] = { f: {} });
          var d = o[v][Ge];
          d || (d = o[v][Ge] = {}), o = d;
        }
      o = o[e] = {}, Q(t.value) ? o.a = {
        t: i
      } : o.t = i;
    }
  }
}
var Er, Qt = "sendAttempt", lo = "&" + gv + "=true", wv = (Er = {}, Er[
  1
  /* EventBatchNotificationReason.Paused */
] = ro, Er[
  100
  /* EventBatchNotificationReason.RequeueEvents */
] = ro, Er[
  200
  /* EventBatchNotificationReason.Complete */
] = "sent", Er[
  8004
  /* EventBatchNotificationReason.KillSwitch */
] = pi, Er[
  8003
  /* EventBatchNotificationReason.SizeLimitExceeded */
] = pi, Er), yi = {}, wi = {};
function Nr(n, r, e) {
  yi[n] = r, e !== !1 && (wi[r] = n);
}
Nr(xi, xi, !1);
Nr(mi, mi);
Nr(Pu, "Client-Id");
Nr(hi, hi);
Nr(Di, Di);
Nr(Ci, Ci);
Nr(oo, oo);
function go(n) {
  try {
    return n.responseText;
  } catch {
  }
  return ir;
}
function _o(n, r) {
  var e = !1;
  if (n && r) {
    var t = Wr(n);
    if (t && t.length > 0)
      for (var i = r.toLowerCase(), a = 0; a < t.length; a++) {
        var o = t[a];
        if (o && cf(r, o) && o.toLowerCase() === i) {
          e = !0;
          break;
        }
      }
  }
  return e;
}
function Ar(n, r, e, t) {
  r && e && e.length > 0 && (t && yi[r] ? (n.hdrs[yi[r]] = e, n.useHdrs = !0) : n.url += "&" + r + "=" + e);
}
function So(n, r) {
  return r && (wr(r) ? n = [r].concat(n) : Q(r) && (n = r.concat(n))), n;
}
var bv = (
  /** @class */
  function() {
    function n(r, e, t, i, a) {
      this._responseHandlers = [];
      var o = "?cors=true&" + Bt.toLowerCase() + "=" + eo, u = new Ev(), v = !1, d = new _v(), l = !1, S = 0, E, s, c, f, T = !0, m = [], R = {}, b = [], N = null, k = !1, G, D = !1, J = !1, cn, $, on, un, rn;
      nn(n, this, function(H) {
        var L = !0;
        H.initialize = function(g, C, h, y, O) {
          var q;
          O || (O = {}), o = g + o, J = sn(O.avoidOptions) ? !0 : !O.avoidOptions, f = C, G = C.getCookieMgr(), k = !f.config.disableEventTimings;
          var z = !!f.config.enableCompoundKey;
          E = h, s = E.diagLog();
          var _ = O.valueSanitizer, p = O.stringifyObjects;
          sn(O.enableCompoundKey) || (z = !!O.enableCompoundKey), cn = O.xhrTimeout, $ = !!O.disableXhrSync, on = !!O.disableFetchKeepAlive, rn = O.addNoResponse !== !1, l = !Ea(), N = new yv(f, _, p, z), V(O.useSendBeacon) || (l = !!O.useSendBeacon);
          var I = y, w = O.alwaysUseXhrOverride ? y : null, P = O.alwaysUseXhrOverride ? y : null, A = [
            3,
            2
            /* TransportType.Fetch */
          ];
          if (!y) {
            T = !1;
            var W = mt();
            W && W.protocol && W.protocol.toLowerCase() === "file:" && (L = !1);
            var j = [];
            Ea() ? (j = [
              2,
              1
              /* TransportType.Xhr */
            ], A = [
              2,
              1,
              3
              /* TransportType.Beacon */
            ]) : j = [
              1,
              2,
              3
              /* TransportType.Beacon */
            ], j = So(j, O.transports), y = vn(j, !1), y || Ze(s, "No available transport to send events"), I = vn(j, !0);
          }
          w || (A = So(A, O.unloadTransports), w = vn(A, !0)), un = !T && (l && Ta() || !on && Ia(!0)), c = (q = {}, q[
            0
            /* EventSendType.Batched */
          ] = y, q[
            1
            /* EventSendType.Synchronous */
          ] = I || vn([
            1,
            2,
            3
            /* TransportType.Beacon */
          ], !0), q[
            2
            /* EventSendType.SendBeacon */
          ] = w || I || vn([
            1
            /* TransportType.Xhr */
          ], !0), q[
            3
            /* EventSendType.SyncFetch */
          ] = P || vn([
            2,
            3
            /* TransportType.Beacon */
          ], !0) || I || vn([
            1
            /* TransportType.Xhr */
          ], !0), q);
        };
        function vn(g, C) {
          for (var h = 0, y = null, O = 0; y == null && O < g.length; )
            h = g[O], h === 1 ? Af() ? y = Wn : Xo() && (y = Mn) : h === 2 && Ia(C) && (!C || C && !on) ? y = In : l && h === 3 && Ta() && (y = kn), O++;
          return y ? {
            _transport: h,
            _isSync: C,
            sendPOST: y
          } : null;
        }
        H._getDbgPlgTargets = function() {
          return [c[
            0
            /* EventSendType.Batched */
          ], u, N, c];
        };
        function Wn(g, C, h) {
          var y = new XDomainRequest();
          y.open(Xt, g.urlString), g.timeout && (y.timeout = g.timeout), y.onload = function() {
            var O = go(y);
            En(C, 200, {}, O), Zr(O);
          }, y.onerror = function() {
            En(C, 400, {});
          }, y.ontimeout = function() {
            En(C, 500, {});
          }, y.onprogress = function() {
          }, h ? y.send(g.data) : a.set(function() {
            y.send(g.data);
          }, 0);
        }
        function In(g, C, h) {
          var y, O = g.urlString, q = !1, z = !1, _ = (y = {
            body: g.data,
            method: Xt
          }, y[uv] = !0, y);
          h && (_.keepalive = !0, g._sendReason === 2 && (q = !0, rn && (O += lo))), L && (_.credentials = "include"), g.headers && Wr(g.headers).length > 0 && (_.headers = g.headers), fetch(O, _).then(function(p) {
            var I = {}, w = ir, P = p.headers;
            P && P.forEach(function(A, W) {
              I[W] = A;
            }), p.body && p.text().then(function(A) {
              w = A;
            }), z || (z = !0, En(C, p.status, I, w), Zr(w));
          }).catch(function(p) {
            z || (z = !0, En(C, 0, {}));
          }), q && !z && (z = !0, En(C, 200, {})), !z && g.timeout > 0 && a.set(function() {
            z || (z = !0, En(C, 500, {}));
          }, g.timeout);
        }
        function Mn(g, C, h) {
          var y = g.urlString;
          function O(p, I, w) {
            if (!p[w] && I && I.getResponseHeader) {
              var P = I.getResponseHeader(w);
              P && (p[w] = Cn(P));
            }
            return p;
          }
          function q(p) {
            var I = {};
            return p.getAllResponseHeaders ? I = ht(p.getAllResponseHeaders()) : (I = O(I, p, ao), I = O(I, p, io), I = O(I, p, dv)), I;
          }
          function z(p, I) {
            En(C, p.status, q(p), I);
          }
          h && g.disableXhrSync && (h = !1);
          var _ = Qs(Xt, y, L, !0, h, g.timeout);
          yn(g.headers, function(p, I) {
            _.setRequestHeader(p, I);
          }), _.onload = function() {
            var p = go(_);
            z(_, p), Zr(p);
          }, _.onerror = function() {
            z(_);
          }, _.ontimeout = function() {
            z(_);
          }, _.send(g.data);
        }
        function En(g, C, h, y) {
          try {
            g(C, h, y);
          } catch (O) {
            gn(s, 2, 518, Nn(O));
          }
        }
        function kn(g, C, h) {
          var y = g, O = 200, q = y._thePayload, z = g.urlString + (rn ? lo : ir);
          try {
            var _ = Or();
            if (!_.sendBeacon(z, g.data))
              if (q) {
                var p = [];
                U(q.batches, function(I) {
                  if (p && I && I.count() > 0) {
                    for (var w = I.events(), P = 0; P < w.length; P++)
                      if (!_.sendBeacon(z, N.getEventBlob(w[P]))) {
                        p.push(I.split(P));
                        break;
                      }
                  } else
                    p.push(I.split(0));
                }), Pn(p, 8003, q.sendType, !0);
              } else
                O = 0;
          } catch (I) {
            Ze(s, "Failed to send telemetry using sendBeacon API. Ex:" + Nn(I)), O = 0;
          } finally {
            En(C, O, {}, ir);
          }
        }
        function x(g) {
          return g === 2 || g === 3;
        }
        function M(g) {
          return D && x(g) && (g = 2), g;
        }
        H.addQueryStringParameter = function(g, C) {
          for (var h = 0; h < m.length; h++)
            if (m[h].name === g) {
              m[h].value = C;
              return;
            }
          m.push({ name: g, value: C });
        }, H.addHeader = function(g, C) {
          R[g] = C;
        }, H.canSendRequest = function() {
          return K() && d.allowRequestSending();
        }, H.sendQueuedRequests = function(g, C) {
          sn(g) && (g = 0), D && (g = M(g), C = 2), Y(b, g, 0) && ln(
            F(),
            0,
            !1,
            g,
            C || 0
            /* SendRequestReason.Undefined */
          );
        }, H.isCompletelyIdle = function() {
          return !v && S === 0 && b.length === 0;
        }, H.setUnloading = function(g) {
          D = g;
        }, H.addBatch = function(g) {
          if (g && g.count() > 0) {
            if (u.isTenantKilled(g.iKey()))
              return !1;
            b.push(g);
          }
          return !0;
        }, H.teardown = function() {
          b.length > 0 && ln(
            F(),
            0,
            !0,
            2,
            2
            /* SendRequestReason.Unload */
          );
        }, H.pause = function() {
          v = !0;
        }, H.resume = function() {
          v = !1, H.sendQueuedRequests(
            0,
            4
            /* SendRequestReason.Resumed */
          );
        }, H.sendSynchronousBatch = function(g, C, h) {
          g && g.count() > 0 && (V(C) && (C = 1), D && (C = M(C), h = 2), ln(
            [g],
            0,
            !1,
            C,
            h || 0
            /* SendRequestReason.Undefined */
          ));
        };
        function K() {
          return !v && S < e;
        }
        function F() {
          var g = b;
          return b = [], g;
        }
        function Y(g, C, h) {
          var y = !1;
          return g && g.length > 0 && !v && c[C] && N && (y = C !== 0 || K() && (h > 0 || d.allowRequestSending())), y;
        }
        function tn(g) {
          var C = {};
          return g && U(g, function(h, y) {
            C[y] = {
              iKey: h.iKey(),
              evts: h.events()
            };
          }), C;
        }
        function ln(g, C, h, y, O) {
          if (!(!g || g.length === 0)) {
            if (v) {
              Pn(g, 1, y);
              return;
            }
            y = M(y);
            try {
              var q = g, z = y !== 0;
              hn(f, function() {
                return "HttpManager:_sendBatches";
              }, function(_) {
                _ && (g = g.slice(0));
                for (var p = [], I = null, w = Hn(), P = c[y] || (z ? c[
                  1
                  /* EventSendType.Synchronous */
                ] : c[
                  0
                  /* EventSendType.Batched */
                ]), A = P && P._transport, W = un && (D || x(y) || A === 3 || P._isSync && A === 2); Y(g, y, C); ) {
                  var j = g.shift();
                  j && j.count() > 0 && (u.isTenantKilled(j.iKey()) ? p.push(j) : (I = I || N.createPayload(C, h, z, W, O, y), N.appendPayload(I, j, r) ? I.overflow !== null && (g = [I.overflow].concat(g), I.overflow = null, pn(I, w, Hn(), O), w = Hn(), I = null) : (pn(I, w, Hn(), O), w = Hn(), g = [j].concat(g), I = null)));
                }
                I && pn(I, w, Hn(), O), g.length > 0 && (b = g.concat(b)), Pn(p, 8004, y);
              }, function() {
                return { batches: tn(q), retryCount: C, isTeardown: h, isSynchronous: z, sendReason: O, useSendBeacon: x(y), sendType: y };
              }, !z);
            } catch (_) {
              gn(s, 2, 48, "Unexpected Exception sending batch: " + Nn(_));
            }
          }
        }
        function Tn(g, C) {
          var h = {
            url: o,
            hdrs: {},
            useHdrs: !1
            // Assume no headers
          };
          C ? (h.hdrs = gt(h.hdrs, R), h.useHdrs = Wr(h.hdrs).length > 0) : yn(R, function(_, p) {
            wi[_] ? Ar(h, wi[_], p, !1) : (h.hdrs[_] = p, h.useHdrs = !0);
          }), Ar(h, Pu, "NO_AUTH", C), Ar(h, mi, pu, C);
          var y = ir;
          U(g.apiKeys, function(_) {
            y.length > 0 && (y += ","), y += _;
          }), Ar(h, hi, y, C), Ar(h, Ci, lr().toString(), C);
          var O = Pe(g);
          if (ur(O) && (h.url += "&ext.intweb.msfpc=" + O), d.shouldAddClockSkewHeaders() && Ar(h, Di, d.getClockSkewHeaderValue(), C), f.getWParam) {
            var q = f.getWParam();
            q >= 0 && (h.url += "&w=" + q);
          }
          for (var z = 0; z < m.length; z++)
            h.url += "&" + m[z].name + "=" + m[z].value;
          return h;
        }
        function _n(g, C, h) {
          g[C] = g[C] || {}, g[C][E.identifier] = h;
        }
        function pn(g, C, h, y) {
          if (g && g.payloadBlob && g.payloadBlob.length > 0) {
            var O = !!H.sendHook, q = c[g.sendType];
            !x(g.sendType) && g.isBeacon && g.sendReason === 2 && (q = c[
              2
              /* EventSendType.SendBeacon */
            ] || c[
              3
              /* EventSendType.SyncFetch */
            ] || q);
            var z = J;
            (g.isBeacon || q._transport === 3) && (z = !1);
            var _ = Tn(g, z);
            z = z || _.useHdrs;
            var p = Hn();
            hn(f, function() {
              return "HttpManager:_doPayloadSend";
            }, function() {
              for (var I = 0; I < g.batches.length; I++)
                for (var w = g.batches[I], P = w.events(), A = 0; A < P.length; A++) {
                  var W = P[A];
                  if (k) {
                    var j = W.timings = W.timings || {};
                    _n(j, "sendEventStart", p), _n(j, "serializationStart", C), _n(j, "serializationCompleted", h);
                  }
                  W[Qt] > 0 ? W[Qt]++ : W[Qt] = 1;
                }
              Pn(g.batches, 1e3 + (y || 0), g.sendType, !0);
              var en = {
                data: g.payloadBlob,
                urlString: _.url,
                headers: _.hdrs,
                _thePayload: g,
                _sendReason: y,
                timeout: cn,
                disableXhrSync: $,
                disableFetchKeepAlive: on
              };
              z && (_o(en.headers, to) || (en.headers[to] = vv), _o(en.headers, Bt) || (en.headers[Bt] = eo));
              var re = null;
              q && (re = function(Me) {
                d.firstRequestSent();
                var ee = function(xt, ku) {
                  _r(xt, ku, g, y);
                }, Fn = g.isTeardown || g.isSync;
                try {
                  q.sendPOST(Me, ee, Fn), H.sendListener && H.sendListener(en, Me, Fn, g.isBeacon);
                } catch (xt) {
                  Ze(s, "Unexpected exception sending payload. Ex:" + Nn(xt)), En(ee, 0, {});
                }
              }), hn(f, function() {
                return "HttpManager:_doPayloadSend.sender";
              }, function() {
                if (re)
                  if (g.sendType === 0 && S++, O && !g.isBeacon && q._transport !== 3) {
                    var Me = {
                      data: en.data,
                      urlString: en.urlString,
                      headers: gt({}, en.headers),
                      timeout: en.timeout,
                      disableXhrSync: en.disableXhrSync,
                      disableFetchKeepAlive: en.disableFetchKeepAlive
                    }, ee = !1;
                    hn(f, function() {
                      return "HttpManager:_doPayloadSend.sendHook";
                    }, function() {
                      try {
                        H.sendHook(Me, function(Fn) {
                          ee = !0, !T && !Fn._thePayload && (Fn._thePayload = Fn._thePayload || en._thePayload, Fn._sendReason = Fn._sendReason || en._sendReason), re(Fn);
                        }, g.isSync || g.isTeardown);
                      } catch {
                        ee || re(en);
                      }
                    });
                  } else
                    re(en);
              });
            }, function() {
              return { thePayload: g, serializationStart: C, serializationCompleted: h, sendReason: y };
            }, g.isSync);
          }
          g.sizeExceed && g.sizeExceed.length > 0 && Pn(g.sizeExceed, 8003, g.sendType), g.failedEvts && g.failedEvts.length > 0 && Pn(g.failedEvts, 8002, g.sendType);
        }
        function Pr(g, C) {
          k && U(g, function(h) {
            var y = h.timings = h.timings || {};
            _n(y, "sendEventCompleted", C);
          });
        }
        function _r(g, C, h, y) {
          var O = 9e3, q = null, z = !1, _ = !1;
          try {
            var p = !0;
            if (typeof g !== ar) {
              if (C) {
                d.setClockSkew(C[ao]);
                var I = C[io] || C["kill-duration-seconds"];
                U(u.setKillSwitchTenants(C[lv], I), function(P) {
                  U(h.batches, function(A) {
                    if (A.iKey() === P) {
                      q = q || [];
                      var W = A.split(0);
                      h.numEvents -= W.count(), q.push(W);
                    }
                  });
                });
              }
              if (g == 200 || g == 204) {
                O = 200;
                return;
              }
              (!mv(g) || h.numEvents <= 0) && (p = !1), O = 9e3 + g % 1e3;
            }
            if (p) {
              O = 100;
              var w = h.retryCnt;
              h.sendType === 0 && (w < t ? (z = !0, Vr(function() {
                h.sendType === 0 && S--, ln(
                  h.batches,
                  w + 1,
                  h.isTeardown,
                  D ? 2 : h.sendType,
                  5
                  /* SendRequestReason.Retry */
                );
              }, D, Lu(w))) : (_ = !0, D && (O = 8001)));
            }
          } finally {
            z || (d.setClockSkew(), Jr(h, O, y, _)), Pn(q, 8004, h.sendType);
          }
        }
        function Jr(g, C, h, y) {
          try {
            y && E._backOffTransmission(), C === 200 && (!y && !g.isSync && E._clearBackOff(), Ne(g.batches)), Pn(g.batches, C, g.sendType, !0);
          } finally {
            g.sendType === 0 && (S--, h !== 5 && H.sendQueuedRequests(g.sendType, h));
          }
        }
        function Ne(g) {
          if (k) {
            var C = Hn();
            U(g, function(h) {
              h && h.count() > 0 && Pr(h.events(), C);
            });
          }
        }
        function Vr(g, C, h) {
          C ? g() : a.set(g, h);
        }
        function ht(g) {
          var C = {};
          if (Un(g)) {
            var h = Cn(g).split(/[\r\n]+/);
            U(h, function(y) {
              if (y) {
                var O = y.indexOf(": ");
                if (O !== -1) {
                  var q = Cn(y.substring(0, O)).toLowerCase(), z = Cn(y.substring(O + 1));
                  C[q] = z;
                } else
                  C[Cn(y)] = 1;
              }
            });
          }
          return C;
        }
        function Pe(g) {
          for (var C = 0; C < g.batches.length; C++) {
            var h = g.batches[C].Msfpc();
            if (h)
              return encodeURIComponent(h);
          }
          return ir;
        }
        function Zr(g) {
          var C = H._responseHandlers;
          try {
            for (var h = 0; h < C.length; h++)
              try {
                C[h](g);
              } catch (O) {
                gn(s, 1, 519, "Response handler failed: " + O);
              }
            if (g) {
              var y = JSON.parse(g);
              ur(y.webResult) && ur(y.webResult[St]) && G.set("MSFPC", y.webResult[St], 365 * 86400);
            }
          } catch {
          }
        }
        function Pn(g, C, h, y) {
          if (g && g.length > 0 && i) {
            var O = i[ne(C)];
            if (O) {
              var q = h !== 0;
              hn(f, function() {
                return "HttpManager:_sendBatchesNotification";
              }, function() {
                Vr(function() {
                  try {
                    O.call(i, g, C, q, h);
                  } catch (z) {
                    gn(s, 1, 74, "send request notification failed: " + z);
                  }
                }, y || q, 0);
              }, function() {
                return { batches: tn(g), reason: C, isSync: q, sendSync: y, sendType: h };
              }, !q);
            }
          }
        }
        function ne(g) {
          var C = wv[g];
          return ur(C) || (C = cv, g >= 9e3 && g <= 9999 ? C = sv : g >= 8e3 && g <= 8999 ? C = pi : g >= 1e3 && g <= 1999 && (C = fv)), C;
        }
      });
    }
    return n.__ieDyn = 1, n;
  }()
);
function Rv(n, r) {
  for (var e = [], t = 2; t < arguments.length; t++)
    e[t - 2] = arguments[t];
  return setTimeout(n, r, e);
}
function Ov(n) {
  clearTimeout(n);
}
function We(n, r) {
  return {
    set: n || Rv,
    clear: r || Ov
  };
}
var Nv = 0.25, Eo = 500, Pv = 20, To = 6, Io = 2, Mv = 4, po = 2, Lv = 1, Tr = "eventsDiscarded", Xe = "overrideInstrumentationKey", mo = "maxEventRetryAttempts", Do = "maxUnloadEventRetryAttempts", Av = "addUnloadCb", Uv = (
  /** @class */
  function(n) {
    Br(r, n);
    function r() {
      var e = n.call(this) || this;
      e.identifier = "PostChannel", e.priority = 1011, e.version = "3.2.18";
      var t, i = !1, a = [], o = null, u = !1, v = 0, d = 500, l = 0, S = 1e4, E = {}, s = qe, c = null, f = null, T = 0, m = 0, R, b, N = {}, k, G, D = -1, J, cn = !0, $ = !1, on = To, un = Io, rn, H;
      return nn(r, e, function(L, vn) {
        K(), L._getDbgPlgTargets = function() {
          return [b];
        }, L.initialize = function(_, p, I) {
          hn(p, function() {
            return "PostChannel:initialize";
          }, function() {
            var w = p;
            vn.initialize(_, p, I);
            try {
              var P = !!p[Av];
              rn = Oe(Re(L.identifier), p.evtNamespace && p.evtNamespace());
              var A = L._getTelCtx();
              _.extensionConfig[L.identifier] = _.extensionConfig[L.identifier] || {}, t = A.getExtCfg(L.identifier), H = We(t.setTimeoutOverride, t.clearTimeoutOverride), cn = !t.disableOptimizeObj && js(), Wn(w), t.eventsLimitInMem > 0 && (S = t.eventsLimitInMem), t.immediateEventLimit > 0 && (d = t.immediateEventLimit), t.autoFlushEventsLimit > 0 && (k = t.autoFlushEventsLimit), wr(t[mo]) && (on = t[mo]), wr(t[Do]) && (un = t[Do]), z(), t.httpXHROverride && t.httpXHROverride.sendPOST && (R = t.httpXHROverride), ur(_.anonCookieName) && b.addQueryStringParameter("anoncknm", _.anonCookieName), b.sendHook = t.payloadPreprocessor, b.sendListener = t.payloadListener;
              var W = t.overrideEndpointUrl ? t.overrideEndpointUrl : _.endpointUrl;
              L._notificationManager = p.getNotifyMgr(), b.initialize(W, L.core, L, R, t);
              var j = _.disablePageUnloadEvents || [];
              ls(In, j, rn), vu(In, j, rn), lu(Mn, _.disablePageShowEvents, rn);
            } catch (en) {
              throw L.setInitialized(!1), en;
            }
          }, function() {
            return { coreConfig: _, core: p, extensions: I };
          });
        }, L.processTelemetry = function(_, p) {
          Ti(_, L.identifier), p = L._getTelCtx(p);
          var I = p.getExtCfg(L.identifier), w = !!t.disableTelemetry;
          I && (w = w || !!I.disableTelemetry);
          var P = _;
          !w && !i && (t[Xe] && (P.iKey = t[Xe]), I && I[Xe] && (P.iKey = I[Xe]), En(P, !0), $ ? tn(
            2,
            2
            /* SendRequestReason.Unload */
          ) : M()), L.processNext(P, p);
        }, L._doTeardown = function(_, p) {
          tn(
            2,
            2
            /* SendRequestReason.Unload */
          ), i = !0, b.teardown(), ds(null, rn), gs(null, rn), _s(null, rn), K();
        };
        function Wn(_) {
          var p = _.getWParam;
          _.getWParam = function() {
            var I = 0;
            return t.ignoreMc1Ms0CookieProcessing && (I = I | 2), I | p();
          };
        }
        function In(_) {
          var p = _ || we().event;
          p.type !== "beforeunload" && ($ = !0, b.setUnloading($)), tn(
            2,
            2
            /* SendRequestReason.Unload */
          );
        }
        function Mn(_) {
          $ = !1, b.setUnloading($);
        }
        function En(_, p) {
          if (_.sendAttempt || (_.sendAttempt = 0), _.latency || (_.latency = 1), _.ext && _.ext[uo] && delete _.ext[uo], _.ext && _.ext[jt] && _.ext[jt].id && delete _.ext[jt].id, cn && (_.ext = ie(_.ext), _.baseData && (_.baseData = ie(_.baseData)), _.data && (_.data = ie(_.data))), _.sync) {
            if (T || u)
              _.latency = 3, _.sync = !1;
            else if (b) {
              cn && (_ = ie(_)), b.sendSynchronousBatch(
                Et.create(_.iKey, [_]),
                _.sync === !0 ? 1 : _.sync,
                3
                /* SendRequestReason.SyncEvent */
              );
              return;
            }
          }
          var I = _.latency, w = l, P = S;
          I === 4 && (w = v, P = d);
          var A = !1;
          if (w < P)
            A = !pn(_, p);
          else {
            var W = 1, j = Pv;
            I === 4 && (W = 4, j = 1), A = !0, Pr(_.iKey, _.latency, W, j) && (A = !pn(_, p));
          }
          A && ne(Tr, [_], Sr.QueueFull);
        }
        L.setEventQueueLimits = function(_, p) {
          S = _ > 0 ? _ : 1e4, k = p > 0 ? p : 0, z();
          var I = l > _;
          if (!I && G > 0)
            for (var w = 1; !I && w <= 3; w++) {
              var P = N[w];
              P && P.batches && U(P.batches, function(A) {
                A && A.count() >= G && (I = !0);
              });
            }
          _n(!0, I);
        }, L.pause = function() {
          Y(), u = !0, b.pause();
        }, L.resume = function() {
          u = !1, b.resume(), M();
        }, L.addResponseHandler = function(_) {
          b._responseHandlers.push(_);
        }, L._loadTransmitProfiles = function(_) {
          ht(), yn(_, function(p, I) {
            var w = I.length;
            if (w >= 2) {
              var P = w > 2 ? I[2] : 0;
              if (I.splice(0, w - 2), I[1] < 0 && (I[0] = -1), I[1] > 0 && I[0] > 0) {
                var A = I[0] / I[1];
                I[0] = Math.ceil(A) * I[1];
              }
              P >= 0 && I[1] >= 0 && P > I[1] && (P = I[1]), I.push(P), E[p] = I;
            }
          });
        }, L.flush = function(_, p, I) {
          if (_ === void 0 && (_ = !0), !u)
            if (I = I || 1, _)
              o == null ? (Y(), Jr(1, 0, I), o = F(function() {
                o = null, Ne(p, I);
              }, 0)) : a.push(p);
            else {
              var w = Y();
              kn(1, 1, I), p != null && p(), w && M();
            }
        }, L.setMsaAuthTicket = function(_) {
          b.addHeader(xi, _);
        }, L.hasEvents = x, L._setTransmitProfile = function(_) {
          s !== _ && E[_] !== void 0 && (Y(), s = _, M());
        };
        function kn(_, p, I) {
          var w = Jr(_, p, I);
          return b.sendQueuedRequests(p, I), w;
        }
        function x() {
          return l > 0;
        }
        function M() {
          if (D >= 0 && Jr(D, 0, J) && b.sendQueuedRequests(0, J), v > 0 && !f && !u) {
            var _ = E[s][2];
            _ >= 0 && (f = F(function() {
              f = null, kn(
                4,
                0,
                1
                /* SendRequestReason.NormalSchedule */
              ), M();
            }, _));
          }
          var p = E[s][1];
          !c && !o && p >= 0 && !u && (x() ? c = F(function() {
            c = null, kn(
              m === 0 ? 3 : 1,
              0,
              1
              /* SendRequestReason.NormalSchedule */
            ), m++, m %= 2, M();
          }, p) : m = 0);
        }
        L._backOffTransmission = function() {
          T < Mv && (T++, Y(), M());
        }, L._clearBackOff = function() {
          T && (T = 0, Y(), M());
        };
        function K() {
          t = null, i = !1, a = [], o = null, u = !1, v = 0, d = 500, l = 0, S = 1e4, E = {}, s = qe, c = null, f = null, T = 0, m = 0, R = null, N = {}, k = void 0, G = 0, D = -1, J = null, cn = !0, $ = !1, on = To, un = Io, rn = null, H = We(), b = new bv(Eo, po, Lv, {
            requeue: Zr,
            send: C,
            sent: h,
            drop: y,
            rspFail: O,
            oth: q
          }, H), Pe(), ln(), z();
        }
        function F(_, p) {
          p === 0 && T && (p = 1);
          var I = 1e3;
          return T && (I = Lu(T - 1)), H.set(_, p * I);
        }
        function Y() {
          return c !== null ? (H.clear(c), c = null, m = 0, !0) : !1;
        }
        function tn(_, p) {
          Y(), o && (H.clear(o), o = null), u || kn(1, _, p);
        }
        function ln() {
          N[
            4
            /* EventLatencyValue.Immediate */
          ] = {
            batches: [],
            iKeyMap: {}
          }, N[
            3
            /* EventLatencyValue.RealTime */
          ] = {
            batches: [],
            iKeyMap: {}
          }, N[
            2
            /* EventLatencyValue.CostDeferred */
          ] = {
            batches: [],
            iKeyMap: {}
          }, N[
            1
            /* EventLatencyValue.Normal */
          ] = {
            batches: [],
            iKeyMap: {}
          };
        }
        function Tn(_, p, I) {
          var w = N[p];
          w || (p = 1, w = N[p]);
          var P = w.iKeyMap[_];
          return !P && I && (P = Et.create(_), w.batches.push(P), w.iKeyMap[_] = P), P;
        }
        function _n(_, p) {
          b.canSendRequest() && !T && (k > 0 && l > k && (p = !0), p && o == null && L.flush(
            _,
            null,
            20
            /* SendRequestReason.MaxQueuedEvents */
          ));
        }
        function pn(_, p) {
          cn && (_ = ie(_));
          var I = _.latency, w = Tn(_.iKey, I, !0);
          return w.addEvent(_) ? (I !== 4 ? (l++, p && _.sendAttempt === 0 && _n(!_.sync, G > 0 && w.count() >= G)) : v++, !0) : !1;
        }
        function Pr(_, p, I, w) {
          for (; I <= p; ) {
            var P = Tn(_, p, !0);
            if (P && P.count() > 0) {
              var A = P.split(0, w), W = A.count();
              if (W > 0)
                return I === 4 ? v -= W : l -= W, g(Tr, [A], Sr.QueueFull), !0;
            }
            I++;
          }
          return _r(), !1;
        }
        function _r() {
          for (var _ = 0, p = 0, I = function(P) {
            var A = N[P];
            A && A.batches && U(A.batches, function(W) {
              P === 4 ? _ += W.count() : p += W.count();
            });
          }, w = 1; w <= 4; w++)
            I(w);
          l = p, v = _;
        }
        function Jr(_, p, I) {
          var w = !1, P = p === 0;
          return !P || b.canSendRequest() ? hn(L.core, function() {
            return "PostChannel._queueBatches";
          }, function() {
            for (var A = [], W = 4; W >= _; ) {
              var j = N[W];
              j && j.batches && j.batches.length > 0 && (U(j.batches, function(en) {
                b.addBatch(en) ? w = w || en && en.count() > 0 : A = A.concat(en.events()), W === 4 ? v -= en.count() : l -= en.count();
              }), j.batches = [], j.iKeyMap = {}), W--;
            }
            A.length > 0 && ne(Tr, A, Sr.KillSwitch), w && D >= _ && (D = -1, J = 0);
          }, function() {
            return { latency: _, sendType: p, sendReason: I };
          }, !P) : (D = D >= 0 ? Math.min(D, _) : _, J = Math.max(J, I)), w;
        }
        function Ne(_, p) {
          kn(1, 0, p), _r(), Vr(function() {
            _ && _(), a.length > 0 ? o = F(function() {
              o = null, Ne(a.shift(), p);
            }, 0) : (o = null, M());
          });
        }
        function Vr(_) {
          b.isCompletelyIdle() ? _() : o = F(function() {
            o = null, Vr(_);
          }, Nv);
        }
        function ht() {
          Y(), Pe(), s = qe, M();
        }
        function Pe() {
          E = {}, E[qe] = [2, 1, 0], E[av] = [6, 3, 0], E[ov] = [18, 9, 0];
        }
        function Zr(_, p) {
          var I = [], w = on;
          $ && (w = un), U(_, function(P) {
            P && P.count() > 0 && U(P.events(), function(A) {
              A && (A.sync && (A.latency = 4, A.sync = !1), A.sendAttempt < w ? (Ti(A, L.identifier), En(A, !1)) : I.push(A));
            });
          }), I.length > 0 && ne(Tr, I, Sr.NonRetryableStatus), $ && tn(
            2,
            2
            /* SendRequestReason.Unload */
          );
        }
        function Pn(_, p) {
          var I = L._notificationManager || {}, w = I[_];
          if (w)
            try {
              w.apply(I, p);
            } catch (P) {
              gn(L.diagLog(), 1, 74, _ + " notification failed: " + P);
            }
        }
        function ne(_, p) {
          for (var I = [], w = 2; w < arguments.length; w++)
            I[w - 2] = arguments[w];
          p && p.length > 0 && Pn(_, [p].concat(I));
        }
        function g(_, p) {
          for (var I = [], w = 2; w < arguments.length; w++)
            I[w - 2] = arguments[w];
          p && p.length > 0 && U(p, function(P) {
            P && P.count() > 0 && Pn(_, [P.events()].concat(I));
          });
        }
        function C(_, p, I) {
          _ && _.length > 0 && Pn("eventsSendRequest", [p >= 1e3 && p <= 1999 ? p - 1e3 : 0, I !== !0]);
        }
        function h(_, p) {
          g("eventsSent", _, p), M();
        }
        function y(_, p) {
          g(Tr, _, p >= 8e3 && p <= 8999 ? p - 8e3 : Sr.Unknown);
        }
        function O(_) {
          g(Tr, _, Sr.NonRetryableStatus), M();
        }
        function q(_, p) {
          g(Tr, _, Sr.Unknown), M();
        }
        function z() {
          !t || !t.disableAutoBatchFlushLimit ? G = Math.max(Eo * (po + 1), S / 6) : G = 0;
        }
        Gn(L, "_setTimeoutOverride", function() {
          return H.set;
        }, function(_) {
          H = We(_, H.clear);
        }), Gn(L, "_clearTimeoutOverride", function() {
          return H.clear;
        }, function(_) {
          H = We(H.set, _);
        });
      }), e;
    }
    return r.__ieDyn = 1, r;
  }(Xi)
), kv = (
  /** @class */
  function(n) {
    Br(r, n);
    function r() {
      var e = n.call(this) || this, t, i;
      return nn(r, e, function(a, o) {
        a.initialize = function(u, v) {
          var d = e;
          hn(e, function() {
            return "ApplicationInsights:initialize";
          }, function() {
            t = new Uv(), i = new iv();
            var l = [i];
            v && (l = l.concat(v)), u || On("You must provide a config object!");
            var S = u.channels;
            if (S && S.length > 0) {
              for (var E = !1, s = 0; s < S[0].length; s++)
                if (S[0][s].identifier === t.identifier) {
                  E = !0;
                  break;
                }
              E || S[0].push(t);
            } else
              u.channels = [[t]];
            var c = u.extensionConfig = u.extensionConfig || [];
            c[t.identifier] = c[t.identifier] || u && u.channelConfiguration || {}, c[i.identifier] = c[i.identifier] || u && u.propertyConfiguration || {};
            try {
              o.initialize(u, l);
            } catch (f) {
              gn(d.logger, 1, 514, "Failed to initialize SDK." + Nn(f));
            }
          }, function() {
            return { config: u, extensions: v };
          });
        }, a.getPropertyManager = function() {
          return i;
        }, a.getPostChannel = function() {
          return t;
        };
      }), e;
    }
    return r.__ieDyn = 1, r;
  }($s)
);
export {
  $s as AppInsightsCore,
  kv as ApplicationInsights,
  ov as BE_PROFILE,
  Xi as BaseTelemetryPlugin,
  hc as Cloud,
  xc as Device,
  be as DiagnosticLogger,
  Sr as EventsDiscardedReason,
  As as InternalAppInsightsCore,
  Rc as Loc,
  av as NRT_PROFILE,
  Ls as NotificationManager,
  Uv as PostChannel,
  iv as PropertiesPlugin,
  qe as RT_PROFILE,
  xu as Session,
  rv as TelemetryContext,
  di as _InternalLogMessage,
  Ra as cookieAvailable,
  vi as getISOString,
  Q as isArray,
  Ta as isBeaconsSupported,
  pe as isBoolean,
  Ys as isLatency,
  wr as isNumber,
  Ea as isReactNative,
  Un as isString,
  ur as isValueAssigned
};

// SIG // Begin signature block
// SIG // MIIo0wYJKoZIhvcNAQcCoIIoxDCCKMACAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // xA8JG8UPBQa2m4PPngNa7gatd7sbkJnLnG0sXBlpBRWg
// SIG // gg3DMIIGrTCCBJWgAwIBAgITMwAAANMCiNhpvd8CCQAA
// SIG // AAAA0zANBgkqhkiG9w0BAQwFADBiMQswCQYDVQQGEwJV
// SIG // UzEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MTMwMQYDVQQDEypBenVyZSBSU0EgUHVibGljIFNlcnZp
// SIG // Y2VzIENvZGUgU2lnbmluZyBQQ0EwHhcNMjYwMzA1MTkw
// SIG // NjE5WhcNMjcwMzAzMTkwNjE5WjCBgjELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEsMCoGA1UEAxMjQXp1cmUgUHVibGljIFNl
// SIG // cnZpY2VzIFJTQSBDb2RlIFNpZ24wggGiMA0GCSqGSIb3
// SIG // DQEBAQUAA4IBjwAwggGKAoIBgQDJrDsZxGHNBYj5RPkR
// SIG // yGEIGZlcCQkqE7SdGa6c2FPAMGu1JLqHur8qNWjR5swe
// SIG // kMMn0WSz2+QE0c848wHvqVVLpWV+Un3Q01Dnyzjifae4
// SIG // h+kzhQTUIhX2rKQbGHdqBe7LXyCgkfDrTNLXsI1xAXAw
// SIG // A42Ar+PpVd1ktqLSsM6pwqrM/FFfEizl9h5gtrEIZODp
// SIG // +jo9vESxKvHGp/Ifca7e/IluDeJffP4ME/fFtUzUCLH/
// SIG // IweugiUcsaTmewSny4odYLtmZK/zpBuPjGTLpUnn4HMy
// SIG // WXLUSOFlgvFrLKCPZxbNxXxBo5EUquzrFbpg9NmQVipJ
// SIG // QsKDSKNHluTwNicItFpZpiPMc7Y2LG11dNAil3yJEBLF
// SIG // MQ/5RqQptcWmgSKoG8Tx7x+RCYQj4Sjl2yJt+4OykVn9
// SIG // /kQ5wo6v6TmIHHZsKdmgIkMCKBuIRcB2FaGwLY+UGMP1
// SIG // xmiwIaekgjUgVwXX8Kv/2SYI9XXrjyUME4NLj0JTBIO7
// SIG // YX201gYYOL8CAwEAAaOCAbkwggG1MA4GA1UdDwEB/wQE
// SIG // AwIHgDAfBgNVHSUEGDAWBggrBgEFBQcDAwYKKwYBBAGC
// SIG // N1sBATAdBgNVHQ4EFgQU6DIfaqBAAm33/QFJGYifZUeQ
// SIG // B3AwRQYDVR0RBD4wPKQ6MDgxHjAcBgNVBAsTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEWMBQGA1UEBRMNNDY5OTgx
// SIG // KzUwNzE4MTAfBgNVHSMEGDAWgBTxL7qRFnzefVInMfV6
// SIG // +9VYWWk6PTBvBgNVHR8EaDBmMGSgYqBghl5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NybC9BenVy
// SIG // ZSUyMFJTQSUyMFB1YmxpYyUyMFNlcnZpY2VzJTIwQ29k
// SIG // ZSUyMFNpZ25pbmclMjBQQ0EuY3JsMHwGCCsGAQUFBwEB
// SIG // BHAwbjBsBggrBgEFBQcwAoZgaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tL3BraW9wcy9jZXJ0cy9BenVyZSUyMFJT
// SIG // QSUyMFB1YmxpYyUyMFNlcnZpY2VzJTIwQ29kZSUyMFNp
// SIG // Z25pbmclMjBQQ0EuY3J0MAwGA1UdEwEB/wQCMAAwDQYJ
// SIG // KoZIhvcNAQEMBQADggIBAKJEWoxuo4PDUOPrpeqZZBdc
// SIG // EBjIoYQZjSvEIMTd0fcf89rWN/fr6cbAs3fZtR1LQ2kR
// SIG // Wo2mYixmAQpm6ijAYu3Qg+/NIHofviOVCDqHmaQGEiwi
// SIG // oBsb7Et9V7B9rqsksJslTyCJUJYuIXaKv37suPC7cFpX
// SIG // aaWaNLn0juz1sPKdklvTO23fwcahgRO9nqd9gTi9j6dw
// SIG // /nEJURWo32dl+rxdylnuRd6RHpkJKdlPVXRrr/ZL8sby
// SIG // akoCUN4zNVivUMLmUspYRJIV2TpkZonQnrmTm6TpXGVg
// SIG // Cjj56duTzVa/GRAKLVBHNm8je6esjgoswv6eHmYkmgJR
// SIG // jvZ+eHNloLnXfqByg3CxJ0Gd+nja5RTavYplIc9zfOgq
// SIG // Ng5e6NW8E0Q/AI115WfpM+ncWenWqdPs1YLinyUdRDxi
// SIG // DTmhYTyN1p3FojGtyM+mrQVIvC2l8zQr/LNCTvz/dj2h
// SIG // WqsF/7SDnK4wE812YAp6pPfgtr6BfVD0LMJu+s6f2PXe
// SIG // oLskA4Ac2PoJz5N7FmeY7Wn5shZBf4hOqCJssd5ZBpUb
// SIG // tGYh3iCnQSJP9EokoxVxe7D5HmkqTRNnXqIDQ5zW6bL3
// SIG // SDCYFEG5EWtqV9Ytd0Mjplx/s5+w1TnYbXIKbPzi4Hnb
// SIG // 3Xr0m8YnMuVyhmxGyHZ2CjMpQclgocs2QNsOyr7evLGD
// SIG // MIIHDjCCBPagAwIBAgITMwAAAAKyxJOIeFns0wAAAAAA
// SIG // AjANBgkqhkiG9w0BAQwFADBbMQswCQYDVQQGEwJVUzEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSww
// SIG // KgYDVQQDEyNNaWNyb3NvZnQgUlNBIFNlcnZpY2VzIFJv
// SIG // b3QgQ0EgMjAyMTAeFw0yMTA5MDIxNzQxMTlaFw0zNjA5
// SIG // MDIxNzUxMTlaMGIxCzAJBgNVBAYTAlVTMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMzAxBgNVBAMT
// SIG // KkF6dXJlIFJTQSBQdWJsaWMgU2VydmljZXMgQ29kZSBT
// SIG // aWduaW5nIFBDQTCCAiIwDQYJKoZIhvcNAQEBBQADggIP
// SIG // ADCCAgoCggIBAKXd/Sy91nFgseVJOFgeRhVxrcahyp1Y
// SIG // GSN0FpOEgEREVb3ND/QgI7I0yd7XG6OE8Vomr5FMxvK8
// SIG // TvJ4Lc6LP9BDz2GSa1M0LlzHKX757/24C0ZndzccA1qQ
// SIG // i00+BmmOr4plmxRzTFv4Phdw8yBPF9GDvClqV8ASvvbi
// SIG // tfjaD7dVPOFLb7N7fvt/qWogGN5eis0FXCqVJdmPZZaX
// SIG // 2h4iG0otsAhfq8yvSlJ0YwO4i5GDeLQwTsMN1Rf2UAHQ
// SIG // KCUYkFsLSQ0mqbaRbDZhB+2pFL/q/c2a6hlHLnapYyfw
// SIG // lNFXkDhwAFWEzfwFHER2oR42UayfN9tsO/p2tWk33Crn
// SIG // HdndJDrIZ6oQ3D+Ngol/TR8BAgXCIM6se6YlLDTsxRwh
// SIG // 9QUDq7KVhKy58HGKJUqwgIW0E7cvlzUl0Hft/ebhALZy
// SIG // FDkhof9C5Cq4c/486XLjQq0nbuKsFNhQU0yvABR3eohw
// SIG // 63Kps66Uma48oE0JmqOxmzrPvrITYcsnByKleiHn+4yq
// SIG // +Ts/KrtqkQwQcuikMPrZwXCtsYkxMUyUn8gr8oew22WD
// SIG // eIQECAM1Cz9TcdJadsrToKqXQa2bAn/AABAYyogPPONf
// SIG // GvojTI3DlYD42etMa/gPeZJavX+z7x8d/4eYBnJ9WFSi
// SIG // 9q0v+vLOGc3fyM2KQtq5eVbHX5rVyWc6bJ35AgMBAAGj
// SIG // ggHCMIIBvjAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4E
// SIG // FgQU8S+6kRZ83n1SJzH1evvVWFlpOj0wVAYDVR0gBE0w
// SIG // SzBJBgRVHSAAMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBv
// SIG // c2l0b3J5Lmh0bTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBi
// SIG // AEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB
// SIG // /zAfBgNVHSMEGDAWgBQODLFkab0tsdVrJqZH6lZOgMPt
// SIG // ijBmBgNVHR8EXzBdMFugWaBXhlVodHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpb3BzL2NybC9NaWNyb3NvZnQl
// SIG // MjBSU0ElMjBTZXJ2aWNlcyUyMFJvb3QlMjBDQSUyMDIw
// SIG // MjEuY3JsMHMGCCsGAQUFBwEBBGcwZTBjBggrBgEFBQcw
// SIG // AoZXaHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9w
// SIG // cy9jZXJ0cy9NaWNyb3NvZnQlMjBSU0ElMjBTZXJ2aWNl
// SIG // cyUyMFJvb3QlMjBDQSUyMDIwMjEuY3J0MA0GCSqGSIb3
// SIG // DQEBDAUAA4ICAQBin7PMBnXjnIJ0x++LnudLDWWnZ8dZ
// SIG // mJ14DuZfUss/doUThLAM4crrHaTbJoulUUELNd2AnOpX
// SIG // /Z4tenUMT3sjYIdPYyJfIYWPRqfI6Nbz+JVK7RRvn2nl
// SIG // 5EEMIuRE6UKS9ZGBbf02a7sb04E/7BN/NhhrmtS/tVFj
// SIG // fRrrVh9zXku45rqWuCwUTzg3EqxKQ8OGbtjBQtq/Syb/
// SIG // clm5BHsoh3XhMnb9VLv3G1duNf90FL5/o88XZ4L18nx1
// SIG // lfky2nllY4HIA8PK8AarqAW4iKSTA3EGqn8s/47WtQKT
// SIG // +qED2YbZXVOYL+L7vQDCnFbwhgAx6ucuMz7Ae1rqibg3
// SIG // AjsC7U5M3oA/vqAHDKDA3mdM5D6L/ZEdQgaG20HhUOSQ
// SIG // +CiQD3TyHSiVCfVMuTv83IiKCni3LW/23tHC2tbN57rl
// SIG // hMcoyjIi+IVd7j7s41MFBaDwJrmfXn/YM+lR/5QqvO7z
// SIG // WAbbr/XU531v3jr/jBilmrqt6U/b7y8TXyA9nYxV9iSM
// SIG // FmcbyIi2xgdcAHhxnpXcvcvyFWET6YiJiyeSJZwwJv8g
// SIG // wXiBF+Zh0IHArl6KVsbAdsATuP1TCEBpPynXZmkviIEW
// SIG // Ptnv315ZjTC7nPoOpSnOVaO7wZztrOefZunI5fBxw7mG
// SIG // 1oyoRnADZawiFsVo9J/cDu15ErRCfDQRhwSiBTGCGmgw
// SIG // ghpkAgEBMHkwYjELMAkGA1UEBhMCVVMxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEzMDEGA1UEAxMq
// SIG // QXp1cmUgUlNBIFB1YmxpYyBTZXJ2aWNlcyBDb2RlIFNp
// SIG // Z25pbmcgUENBAhMzAAAA0wKI2Gm93wIJAAAAAADTMA0G
// SIG // CWCGSAFlAwQCAQUAoIGQMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMC8GCSqGSIb3DQEJBDEiBCD27L8RVP3V
// SIG // gwnb6tQxrQiC8EI+fjrellSVZ8gPs8iMvDBCBgorBgEE
// SIG // AYI3AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHSh
// SIG // GoAYaHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqG
// SIG // SIb3DQEBAQUABIIBgAiBaD0/uWrVgJRqKZEPffY4ZOtn
// SIG // kL8XU/mH/APM5seCu6P+vPdJvp8PJvbqwpHTknxj/7vu
// SIG // +Q5Y0HKhl+b9OdsV7ua1je9lJmqpHZf47f9o9HOIOVz4
// SIG // z0jzJQ6sTF9T/gM7cHTSc6i6WpfCmG6j9R4G3DhEHNze
// SIG // Eb7Tz2EEft4m4SkQ1G7sw4uDIFiZnDOAs3Fz/UEbpvin
// SIG // 3lVn2UGL5EvIy/xEkrMMVs/vRw+ymFNhReOwdxkpBUwZ
// SIG // xUSzK6IrlGsP8/jp6HINdgol8GBT/RWAFiPQWOSXL61y
// SIG // 3Gda24wQnQBjuRSc1qkelKHZ/+fSJvpK+M/SYWsda+Na
// SIG // 74Q/2alM1gtaR1kMTT3cvZJpHPQaAiZLsywa6OkOdeOi
// SIG // n2FAKGfP+ZEcSwbR+L0T+L6X+0O4Q1ovZBN2GLKI+qE0
// SIG // ORDtpQbVOi1ocLS+uKaRHB2hoaDAC7FunhVNgSZ/MYZT
// SIG // TJDR8oZHEDlt8WvaBRMdWPaoal5JN83kCmi5I4sA1bBG
// SIG // 36GCF60wghepBgorBgEEAYI3AwMBMYIXmTCCF5UGCSqG
// SIG // SIb3DQEHAqCCF4YwgheCAgEDMQ8wDQYJYIZIAWUDBAIB
// SIG // BQAwggFaBgsqhkiG9w0BCRABBKCCAUkEggFFMIIBQQIB
// SIG // AQYKKwYBBAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCDr
// SIG // b3QC3oid/DUe+pTUSroxUf0WcpnpeWKbvDF9RMjcCgIG
// SIG // at3oACXyGBMyMDI2MTEwMjE0MDc0NC41OTNaMASAAgH0
// SIG // oIHZpIHWMIHTMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYD
// SIG // VQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25z
// SIG // IExpbWl0ZWQxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVT
// SIG // Tjo1NTFBLTA1RTAtRDk0NzElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEfswggcoMIIF
// SIG // EKADAgECAhMzAAACG9CyuAJn93LPAAEAAAIbMA0GCSqG
// SIG // SIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwMB4XDTI1MDgxNDE4NDgzMFoXDTI2MTExMzE4NDgz
// SIG // MFowgdMxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOjU1
// SIG // MUEtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAg8AMIICCgKCAgEAjsWd52ZZkzB5Xe5g/l2G
// SIG // sOjAz30sg6jVxfFJV+w4xIDVyaI3LO8bIpmzYul3AZHg
// SIG // 50UIQ8PrSRZGpQqFkRNu+o3YKJ4g2uGYBRksHnHYR0uV
// SIG // SCQg58ThkYyeplGX3oAvGRVuPIpQtAiTsR76A/gdoU7H
// SIG // DwEbb73bJwTyrbKHhR+WaMy9DQHI4k5Qo4+bZDs0kj76
// SIG // bvhJvdGU+S8zxQBp7UAhjJnFqKxIusSITE7zCCR422EL
// SIG // hkhVVOFqK2w6h1MAvILe76hxRIcPj0SBL2r8O9tx5njU
// SIG // 4+tg2rAdU153pmyhqazdpUccYBE9wDRFUd/e9CoWx7Td
// SIG // nUicB+Mai7RT6qse7e5aGqX1B7bnj/ZHvrrfF+BJEIlS
// SIG // 9iDXAUgekvXZ+FZmjvLwP+dN+0/crh++r4e8FknF7EX6
// SIG // IJfnmNeDN/68Z59kbaJ1f+P5mnKYfydCeZmxrGpS0taW
// SIG // kDk36D3jPVZflvxrc+1rhCIlM5v9agLEFI12QiBTfpOB
// SIG // OBr3AGCPk+eH0+latjQajug+2/BD12qb82500LQytUWT
// SIG // 2ota/HYnRgSv1jvZ0/dml1FsxWYzOnCrjfdB/7N6pNyS
// SIG // t4vn+PGN6dFLim7kxos+B9WfQPezJi3fuKyyDAB9zSHP
// SIG // j1Zu8nZfecZJ9um4zj7DFgvJXTDTnG5qlG4ZdbFRa/rr
// SIG // fzkCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBS2vp93/lxL
// SIG // ppNK8OkauJ2AvNmIUDAfBgNVHSMEGDAWgBSfpxVdAF5i
// SIG // XYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQhk5o
// SIG // dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2Ny
// SIG // bC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENBJTIw
// SIG // MjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwGCCsG
// SIG // AQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUtU3Rh
// SIG // bXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMBAf8E
// SIG // AjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4GA1Ud
// SIG // DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEAZkU1
// SIG // XxQD4OTM3GTht32TXShIfPBoMfSsFsBQqFOZqLJOxyJO
// SIG // llIBFpmpvOtGNPkC5Z8ldG8aCpvgFNo/jDWeT5FiW53d
// SIG // Aj9KnZxpsQ3Pf5fRzSGHRcxEMOdXIVzDJwcZUX0cjfxn
// SIG // a7ydNv8eXB/Xk6G6SyrR2OH6S1LHMW11m3UvKF+eLjIP
// SIG // l45rximuDCoEd+ad0lOAXA5/vZOKN5n/ePYeP0LRchZX
// SIG // 0Q6H8n/ZmSPMlbli3MO851Q09RmT/ZGHa+/Fdy+WLDrw
// SIG // cYykV9mUy/4TbwKw6FtdR6ZPHxMdIi1pk8Y2mC/GzCq0
// SIG // LCsH0uTFeQ6Q7Nc3MRmER/3mLWUhbaWHgX1FbYchvR22
// SIG // b+Bup+YPR5Q/0BhaaAN6AIBfcGs+u/nJoIByyZKA8cTy
// SIG // CmnUI/4vW6D4vywg3XBFf4f2DwFHy/evsC+58KMl+k2w
// SIG // a05X2kK0T/bCPLhaov9ZXyobawfNOLYGiauKT2FWvbwZ
// SIG // zHIFCTxjBww6Pt5uRvCE/jnUcf/xhlOGMn6iKO9Xt49v
// SIG // ZTE2SfIBk/34iLTRBJ6H7aGPTTQnza3OfWu1/dRycC6W
// SIG // l5ons3PjnGXTSKSxXllJPmg6R/ulGonP/UCYoJ6mN+EX
// SIG // jfyDLPXLqsr91+VTG1rYzRCjPwBFAHv4EIwaE0ajCrf7
// SIG // 5eUGI3+oXU0UP6rloZ8wggdxMIIFWaADAgECAhMzAAAA
// SIG // FcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUAMIGI
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylNaWNy
// SIG // b3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkg
// SIG // MjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAxODMy
// SIG // MjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwMIIC
// SIG // IjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA5OGm
// SIG // TOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1V/YB
// SIG // f2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeFRiMM
// SIG // tY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDcwUTI
// SIG // cVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus9ja+
// SIG // NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130/o5T
// SIG // z9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHINSi9
// SIG // 47SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTesy+uD
// SIG // RedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGpF1tn
// SIG // YN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+/Nme
// SIG // Rd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fzpk03
// SIG // dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNOwTM5
// SIG // TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLiMxhy
// SIG // 16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5UPkL
// SIG // iWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9QBXps
// SIG // xREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6HXtqP
// SIG // nhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIGCSsG
// SIG // AQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYEFCqn
// SIG // Uv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEGDCsG
// SIG // AQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3MvUmVw
// SIG // b3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUHAwgw
// SIG // GQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYDVR0P
// SIG // BAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0jBBgw
// SIG // FoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0fBE8w
// SIG // TTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQuY29t
// SIG // L3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0XzIw
// SIG // MTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBKBggr
// SIG // BgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0y
// SIG // My5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1VffwqreEs
// SIG // H2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1OdfC
// SIG // cTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpTTd2Y
// SIG // urYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinLbtg/
// SIG // SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l9qRW
// SIG // qveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJw7wX
// SIG // sFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2FzLixr
// SIG // e24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7hvoy
// SIG // GtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY3UA8
// SIG // x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFXSVRk
// SIG // 2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFUa2pF
// SIG // EUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz/gq7
// SIG // 7EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/AsGC
// SIG // onsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1Zyvg
// SIG // DbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328y+l7
// SIG // vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEGahC0
// SIG // HVUzWLOhcGbyoYIDVjCCAj4CAQEwggEBoYHZpIHWMIHT
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // JzAlBgNVBAsTHm5TaGllbGQgVFNTIEVTTjo1NTFBLTA1
// SIG // RTAtRDk0NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgU2VydmljZaIjCgEBMAcGBSsOAwIaAxUAhoV6
// SIG // r49M4GBd41K1RYB1Z0f4zuCggYMwgYCkfjB8MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsF
// SIG // AAIFAO6S8ZAwIhgPMjAyNjExMDIxMTI1MDRaGA8yMDI2
// SIG // MTEwMzExMjUwNFowdDA6BgorBgEEAYRZCgQBMSwwKjAK
// SIG // AgUA7pLxkAIBADAHAgEAAgIOxjAHAgEAAgISfDAKAgUA
// SIG // 7pRDEAIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEE
// SIG // AYRZCgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0G
// SIG // CSqGSIb3DQEBCwUAA4IBAQAxt4BkM+yBnwJ5NqUA8lFH
// SIG // T65AMajiwWOwhwq7RGdwJP4b/BA+kiSnSlTjr2+svBYw
// SIG // UyJmX5HX9+ltUwL7TaocyZldsr7oBYsoebP7GA1+WTLQ
// SIG // LLyFnxEghkH79gLZ74vJCZZZKgbx332qyiaPaW/d6ibr
// SIG // ovWUxL3EJjRhhPkrQgzk5oklOpuntAkgSFExCY9or4BC
// SIG // /FQYq6r2P0tSxPveYJQ73cxWaun4R2fr9ISc9Ml3oWol
// SIG // IrZaxTr1/vr/o9rVFXE8HpLPnES1LsQayXPe+ZXACm6B
// SIG // 5ytXUDFKbQRo8T8yL4wTwOGClRg2GmmGlImJFkGQndkE
// SIG // lihH5C9+AWbuMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTACEzMAAAIb0LK4Amf3cs8A
// SIG // AQAAAhswDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3
// SIG // DQEJAzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQx
// SIG // IgQgCE3J/z0zfymVDazJ2Ho8kyAm5qaIRIuOT+jWSi7N
// SIG // 8tkwgfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCAw
// SIG // JRSVuD2jmMcQCFXdLuJAwDpUVNZ6bc6dfJU83Q2LgDCB
// SIG // mDCBgKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // AhMzAAACG9CyuAJn93LPAAEAAAIbMCIEIKv6i3EV2LPk
// SIG // INT2j67W6FAzSCkPsdYXw0XlE3U5kKK0MA0GCSqGSIb3
// SIG // DQEBCwUABIICAAiFDKYSK80rEYF9EJif+K7jMINWED4N
// SIG // SoG1jv4Dpyo4QnngMT5hUYqQy5um+9htLA2ApTq7CKf2
// SIG // QGXViHc/rnInD13JbKR/51tNxdlpuEFLTFqqt9OtkbZg
// SIG // 6r9etywiMDlLxo0FaB8IJ32kK69/YNy+MBr5+VGvGgYJ
// SIG // McjQGGwboAbtbpwK4MvIc6Y3jPCefpX8pVVXBuQZGQZS
// SIG // cOXfOuM+l4/FNtL3D8oPQTkmhHQ2CG+Cz5Gtp395Ubgc
// SIG // cd3iu4Kn3mXbVuDFZlUIIRDftiXrxKt6++zf/kTM0p4R
// SIG // 1TCTMH22UqZQ8b1h7ARLneVYGBnYNg11fjnnLi1T6M5S
// SIG // /mj0iRNIOw0ozrJnrY49PJi8wytzb8PMiSUyEyZOMdt5
// SIG // Akhip3gOY/t8vhFuXC6X7nDqLwO2t7bq4b1LzzRc2L1v
// SIG // XDGCLdIcYHKaRd7XfwSdAXm/s756hCCHAvZtkuG6hjOY
// SIG // pFRghogR+4t0NIDQbFNO38Ij5n9LZh6UysDAf/PdzzIM
// SIG // sgLPimN6nAgM1Et+hO2REWOrPmJf0WsuapRiB8b7ZeJY
// SIG // aoYPfq5cHucOncAzDzbkrAvjQGV3/6ZeE7g3godLh2Bh
// SIG // tZP/GREtas3XwPVVGGIMi0JKWgLBmQEqWkM2h0g3LjBN
// SIG // Y9epwCkSBWDkGEyL359RhHkN4gdY/pXt+gSW
// SIG // End signature block
