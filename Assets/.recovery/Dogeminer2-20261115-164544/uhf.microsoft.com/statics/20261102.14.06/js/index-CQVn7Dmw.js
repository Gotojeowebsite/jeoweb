import { r as EM } from "./index-B8sDcx8i.js";
var Mb = { exports: {} }, jt = {}, Ub = { exports: {} }, Lb = {};
(function(se) {
  /**
   * @license React
   * scheduler.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var Fe = !1, Re = 5;
    function Fa(O, k) {
      var Q = O.length;
      O.push(k), f(O, k, Q);
    }
    function Mt(O) {
      return O.length === 0 ? null : O[0];
    }
    function Yt(O) {
      if (O.length === 0)
        return null;
      var k = O[0], Q = O.pop();
      return Q !== k && (O[0] = Q, au(O, Q, 0)), k;
    }
    function f(O, k, Q) {
      for (var he = Q; he > 0; ) {
        var Ce = he - 1 >>> 1, Ct = O[Ce];
        if (P(Ct, k) > 0)
          O[Ce] = k, O[he] = Ct, he = Ce;
        else
          return;
      }
    }
    function au(O, k, Q) {
      for (var he = Q, Ce = O.length, Ct = Ce >>> 1; he < Ct; ) {
        var Ve = (he + 1) * 2 - 1, qt = O[Ve], Be = Ve + 1, xe = O[Be];
        if (P(qt, k) < 0)
          Be < Ce && P(xe, qt) < 0 ? (O[he] = xe, O[Be] = k, he = Be) : (O[he] = qt, O[Ve] = k, he = Ve);
        else if (Be < Ce && P(xe, k) < 0)
          O[he] = xe, O[Be] = k, he = Be;
        else
          return;
      }
    }
    function P(O, k) {
      var Q = O.sortIndex - k.sortIndex;
      return Q !== 0 ? Q : O.id - k.id;
    }
    var Y = 1, bt = 2, B = 3, oe = 4, z = 5;
    function pe(O, k) {
    }
    var sa = typeof performance == "object" && typeof performance.now == "function";
    if (sa) {
      var gr = performance;
      se.unstable_now = function() {
        return gr.now();
      };
    } else {
      var Va = Date, gn = Va.now();
      se.unstable_now = function() {
        return Va.now() - gn;
      };
    }
    var re = 1073741823, Ut = -1, ce = 250, Lt = 5e3, fe = 1e4, Ba = re, Ge = [], St = [], ot = 1, Ue = null, ae = B, Pt = !1, en = !1, Hn = !1, ru = typeof setTimeout == "function" ? setTimeout : null, bn = typeof clearTimeout == "function" ? clearTimeout : null, bi = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function br(O) {
      for (var k = Mt(St); k !== null; ) {
        if (k.callback === null)
          Yt(St);
        else if (k.startTime <= O)
          Yt(St), k.sortIndex = k.expirationTime, Fa(Ge, k);
        else
          return;
        k = Mt(St);
      }
    }
    function Sr(O) {
      if (Hn = !1, br(O), !en)
        if (Mt(Ge) !== null)
          en = !0, $t(Si);
        else {
          var k = Mt(St);
          k !== null && jn(Sr, k.startTime - O);
        }
    }
    function Si(O, k) {
      en = !1, Hn && (Hn = !1, Ri()), Pt = !0;
      var Q = ae;
      try {
        var he;
        if (!Fe) return iu(O, k);
      } finally {
        Ue = null, ae = Q, Pt = !1;
      }
    }
    function iu(O, k) {
      var Q = k;
      for (br(Q), Ue = Mt(Ge); Ue !== null && !(Ue.expirationTime > Q && (!O || ou())); ) {
        var he = Ue.callback;
        if (typeof he == "function") {
          Ue.callback = null, ae = Ue.priorityLevel;
          var Ce = Ue.expirationTime <= Q, Ct = he(Ce);
          Q = se.unstable_now(), typeof Ct == "function" ? Ue.callback = Ct : Ue === Mt(Ge) && Yt(Ge), br(Q);
        } else
          Yt(Ge);
        Ue = Mt(Ge);
      }
      if (Ue !== null)
        return !0;
      var Ve = Mt(St);
      return Ve !== null && jn(Sr, Ve.startTime - Q), !1;
    }
    function Ci(O, k) {
      switch (O) {
        case Y:
        case bt:
        case B:
        case oe:
        case z:
          break;
        default:
          O = B;
      }
      var Q = ae;
      ae = O;
      try {
        return k();
      } finally {
        ae = Q;
      }
    }
    function hs(O) {
      var k;
      switch (ae) {
        case Y:
        case bt:
        case B:
          k = B;
          break;
        default:
          k = ae;
          break;
      }
      var Q = ae;
      ae = k;
      try {
        return O();
      } finally {
        ae = Q;
      }
    }
    function lu(O) {
      var k = ae;
      return function() {
        var Q = ae;
        ae = k;
        try {
          return O.apply(this, arguments);
        } finally {
          ae = Q;
        }
      };
    }
    function kn(O, k, Q) {
      var he = se.unstable_now(), Ce;
      if (typeof Q == "object" && Q !== null) {
        var Ct = Q.delay;
        typeof Ct == "number" && Ct > 0 ? Ce = he + Ct : Ce = he;
      } else
        Ce = he;
      var Ve;
      switch (O) {
        case Y:
          Ve = Ut;
          break;
        case bt:
          Ve = ce;
          break;
        case z:
          Ve = Ba;
          break;
        case oe:
          Ve = fe;
          break;
        case B:
        default:
          Ve = Lt;
          break;
      }
      var qt = Ce + Ve, Be = {
        id: ot++,
        callback: k,
        priorityLevel: O,
        startTime: Ce,
        expirationTime: qt,
        sortIndex: -1
      };
      return Ce > he ? (Be.sortIndex = Ce, Fa(St, Be), Mt(Ge) === null && Be === Mt(St) && (Hn ? Ri() : Hn = !0, jn(Sr, Ce - he))) : (Be.sortIndex = qt, Fa(Ge, Be), !en && !Pt && (en = !0, $t(Si))), Be;
    }
    function Ei() {
    }
    function Fn() {
      !en && !Pt && (en = !0, $t(Si));
    }
    function ca() {
      return Mt(Ge);
    }
    function _t(O) {
      O.callback = null;
    }
    function Vn() {
      return ae;
    }
    var tn = !1, nn = null, an = -1, Bn = Re, uu = -1;
    function ou() {
      var O = se.unstable_now() - uu;
      return !(O < Bn);
    }
    function ms() {
    }
    function ys(O) {
      if (O < 0 || O > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      O > 0 ? Bn = Math.floor(1e3 / O) : Bn = Re;
    }
    var fa = function() {
      if (nn !== null) {
        var O = se.unstable_now();
        uu = O;
        var k = !0, Q = !0;
        try {
          Q = nn(k, O);
        } finally {
          Q ? Sn() : (tn = !1, nn = null);
        }
      } else
        tn = !1;
    }, Sn;
    if (typeof bi == "function")
      Sn = function() {
        bi(fa);
      };
    else if (typeof MessageChannel < "u") {
      var Cn = new MessageChannel(), Ti = Cn.port2;
      Cn.port1.onmessage = fa, Sn = function() {
        Ti.postMessage(null);
      };
    } else
      Sn = function() {
        ru(fa, 0);
      };
    function $t(O) {
      nn = O, tn || (tn = !0, Sn());
    }
    function jn(O, k) {
      an = ru(function() {
        O(se.unstable_now());
      }, k);
    }
    function Ri() {
      bn(an), an = -1;
    }
    var su = ms, cu = null;
    se.unstable_IdlePriority = z, se.unstable_ImmediatePriority = Y, se.unstable_LowPriority = oe, se.unstable_NormalPriority = B, se.unstable_Profiling = cu, se.unstable_UserBlockingPriority = bt, se.unstable_cancelCallback = _t, se.unstable_continueExecution = Fn, se.unstable_forceFrameRate = ys, se.unstable_getCurrentPriorityLevel = Vn, se.unstable_getFirstCallbackNode = ca, se.unstable_next = hs, se.unstable_pauseExecution = Ei, se.unstable_requestPaint = su, se.unstable_runWithPriority = Ci, se.unstable_scheduleCallback = kn, se.unstable_shouldYield = ou, se.unstable_wrapCallback = lu, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(Lb);
Ub.exports = Lb;
var TM = Ub.exports;
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
  var se = EM, Fe = TM, Re = se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Fa = !1;
  function Mt(e) {
    Fa = e;
  }
  function Yt(e) {
    if (!Fa) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      au("warn", e, n);
    }
  }
  function f(e) {
    if (!Fa) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      au("error", e, n);
    }
  }
  function au(e, t, n) {
    {
      var a = Re.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var P = 0, Y = 1, bt = 2, B = 3, oe = 4, z = 5, pe = 6, sa = 7, gr = 8, Va = 9, gn = 10, re = 11, Ut = 12, ce = 13, Lt = 14, fe = 15, Ba = 16, Ge = 17, St = 18, ot = 19, Ue = 21, ae = 22, Pt = 23, en = 24, Hn = 25, ru = !0, bn = !1, bi = !1, br = !1, Sr = !1, Si = !0, iu = !0, Ci = !0, hs = !0, lu = /* @__PURE__ */ new Set(), kn = {}, Ei = {};
  function Fn(e, t) {
    ca(e, t), ca(e + "Capture", t);
  }
  function ca(e, t) {
    kn[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), kn[e] = t;
    {
      var n = e.toLowerCase();
      Ei[n] = e, e === "onDoubleClick" && (Ei.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      lu.add(t[a]);
  }
  var _t = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Vn = Object.prototype.hasOwnProperty;
  function tn(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function nn(e) {
    try {
      return an(e), !1;
    } catch {
      return !0;
    }
  }
  function an(e) {
    return "" + e;
  }
  function Bn(e, t) {
    if (nn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, tn(e)), an(e);
  }
  function uu(e) {
    if (nn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tn(e)), an(e);
  }
  function ou(e, t) {
    if (nn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, tn(e)), an(e);
  }
  function ms(e, t) {
    if (nn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, tn(e)), an(e);
  }
  function ys(e) {
    if (nn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", tn(e)), an(e);
  }
  function fa(e) {
    if (nn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", tn(e)), an(e);
  }
  var Sn = 0, Cn = 1, Ti = 2, $t = 3, jn = 4, Ri = 5, su = 6, cu = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", O = cu + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", k = new RegExp("^[" + cu + "][" + O + "]*$"), Q = {}, he = {};
  function Ce(e) {
    return Vn.call(he, e) ? !0 : Vn.call(Q, e) ? !1 : k.test(e) ? (he[e] = !0, !0) : (Q[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function Ct(e, t, n) {
    return t !== null ? t.type === Sn : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function Ve(e, t, n, a) {
    if (n !== null && n.type === Sn)
      return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean": {
        if (a)
          return !1;
        if (n !== null)
          return !n.acceptsBooleans;
        var r = e.toLowerCase().slice(0, 5);
        return r !== "data-" && r !== "aria-";
      }
      default:
        return !1;
    }
  }
  function qt(e, t, n, a) {
    if (t === null || typeof t > "u" || Ve(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case $t:
          return !t;
        case jn:
          return t === !1;
        case Ri:
          return isNaN(t);
        case su:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Be(e) {
    return Qe.hasOwnProperty(e) ? Qe[e] : null;
  }
  function xe(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Ti || t === $t || t === jn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Qe = {}, _b = [
    "children",
    "dangerouslySetInnerHTML",
    // TODO: This prevents the assignment of defaultValue to regular
    // elements (not just inputs). Now that ReactDOMInput assigns to the
    // defaultValue property -- do we need this?
    "defaultValue",
    "defaultChecked",
    "innerHTML",
    "suppressContentEditableWarning",
    "suppressHydrationWarning",
    "style"
  ];
  _b.forEach(function(e) {
    Qe[e] = new xe(
      e,
      Sn,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0], n = e[1];
    Qe[t] = new xe(
      t,
      Cn,
      !1,
      // mustUseProperty
      n,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Qe[e] = new xe(
      e,
      Ti,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Qe[e] = new xe(
      e,
      Ti,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "allowFullScreen",
    "async",
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    "autoFocus",
    "autoPlay",
    "controls",
    "default",
    "defer",
    "disabled",
    "disablePictureInPicture",
    "disableRemotePlayback",
    "formNoValidate",
    "hidden",
    "loop",
    "noModule",
    "noValidate",
    "open",
    "playsInline",
    "readOnly",
    "required",
    "reversed",
    "scoped",
    "seamless",
    // Microdata
    "itemScope"
  ].forEach(function(e) {
    Qe[e] = new xe(
      e,
      $t,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "checked",
    // Note: `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`. We have special logic for handling this.
    "multiple",
    "muted",
    "selected"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    Qe[e] = new xe(
      e,
      $t,
      !0,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "capture",
    "download"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    Qe[e] = new xe(
      e,
      jn,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "cols",
    "rows",
    "size",
    "span"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    Qe[e] = new xe(
      e,
      su,
      !1,
      // mustUseProperty
      e,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["rowSpan", "start"].forEach(function(e) {
    Qe[e] = new xe(
      e,
      Ri,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  });
  var gs = /[\-\:]([a-z])/g, bs = function(e) {
    return e[1].toUpperCase();
  };
  [
    "accent-height",
    "alignment-baseline",
    "arabic-form",
    "baseline-shift",
    "cap-height",
    "clip-path",
    "clip-rule",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "dominant-baseline",
    "enable-background",
    "fill-opacity",
    "fill-rule",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "glyph-name",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "horiz-adv-x",
    "horiz-origin-x",
    "image-rendering",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "overline-position",
    "overline-thickness",
    "paint-order",
    "panose-1",
    "pointer-events",
    "rendering-intent",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "strikethrough-position",
    "strikethrough-thickness",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "underline-position",
    "underline-thickness",
    "unicode-bidi",
    "unicode-range",
    "units-per-em",
    "v-alphabetic",
    "v-hanging",
    "v-ideographic",
    "v-mathematical",
    "vector-effect",
    "vert-adv-y",
    "vert-origin-x",
    "vert-origin-y",
    "word-spacing",
    "writing-mode",
    "xmlns:xlink",
    "x-height"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(gs, bs);
    Qe[t] = new xe(
      t,
      Cn,
      !1,
      // mustUseProperty
      e,
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "xlink:actuate",
    "xlink:arcrole",
    "xlink:role",
    "xlink:show",
    "xlink:title",
    "xlink:type"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(gs, bs);
    Qe[t] = new xe(
      t,
      Cn,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/1999/xlink",
      !1,
      // sanitizeURL
      !1
    );
  }), [
    "xml:base",
    "xml:lang",
    "xml:space"
    // NOTE: if you add a camelCased prop to this list,
    // you'll need to set attributeName to name.toLowerCase()
    // instead in the assignment below.
  ].forEach(function(e) {
    var t = e.replace(gs, bs);
    Qe[t] = new xe(
      t,
      Cn,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Qe[e] = new xe(
      e,
      Cn,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  });
  var wb = "xlinkHref";
  Qe[wb] = new xe(
    "xlinkHref",
    Cn,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    Qe[e] = new xe(
      e,
      Cn,
      !1,
      // mustUseProperty
      e.toLowerCase(),
      // attributeName
      null,
      // attributeNamespace
      !0,
      // sanitizeURL
      !0
    );
  });
  var Ab = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Vv = !1;
  function Bv(e) {
    !Vv && Ab.test(e) && (Vv = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function zb(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      Bn(n, t), a.sanitizeURL && Bv("" + n);
      var i = a.attributeName, l = null;
      if (a.type === jn) {
        if (e.hasAttribute(i)) {
          var u = e.getAttribute(i);
          return u === "" ? !0 : qt(t, n, a, !1) ? u : u === "" + n ? n : u;
        }
      } else if (e.hasAttribute(i)) {
        if (qt(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === $t)
          return n;
        l = e.getAttribute(i);
      }
      return qt(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function jv(e, t, n, a) {
    {
      if (!Ce(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return Bn(n, t), r === "" + n ? n : r;
    }
  }
  function Ss(e, t, n, a) {
    var r = Be(t);
    if (!Ct(t, r, a)) {
      if (qt(t, n, r, a) && (n = null), a || r === null) {
        if (Ce(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (Bn(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var u = r.propertyName;
        if (n === null) {
          var o = r.type;
          e[u] = o === $t ? !1 : "";
        } else
          e[u] = n;
        return;
      }
      var s = r.attributeName, c = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(s);
      else {
        var v = r.type, d;
        v === $t || v === jn && n === !0 ? d = "" : (Bn(n, s), d = "" + n, r.sanitizeURL && Bv(d.toString())), c ? e.setAttributeNS(c, s, d) : e.setAttribute(s, d);
      }
    }
  }
  var Cr = Symbol.for("react.element"), ja = Symbol.for("react.portal"), Er = Symbol.for("react.fragment"), Cs = Symbol.for("react.strict_mode"), Es = Symbol.for("react.profiler"), Ts = Symbol.for("react.provider"), Rs = Symbol.for("react.context"), Tr = Symbol.for("react.forward_ref"), fu = Symbol.for("react.suspense"), du = Symbol.for("react.suspense_list"), xi = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Nb = Symbol.for("react.scope"), Hb = Symbol.for("react.debug_trace_mode"), Yv = Symbol.for("react.offscreen"), kb = Symbol.for("react.legacy_hidden"), Fb = Symbol.for("react.cache"), Vb = Symbol.for("react.tracing_marker"), $v = Symbol.iterator, Bb = "@@iterator";
  function Ya(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = $v && e[$v] || e[Bb];
    return typeof t == "function" ? t : null;
  }
  var J = Object.assign, Di = 0, qv, Gv, Qv, Xv, Kv, Zv, Jv;
  function Wv() {
  }
  Wv.__reactDisabledLog = !0;
  function jb() {
    {
      if (Di === 0) {
        qv = console.log, Gv = console.info, Qv = console.warn, Xv = console.error, Kv = console.group, Zv = console.groupCollapsed, Jv = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: Wv,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      Di++;
    }
  }
  function Yb() {
    {
      if (Di--, Di === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: J({}, e, {
            value: qv
          }),
          info: J({}, e, {
            value: Gv
          }),
          warn: J({}, e, {
            value: Qv
          }),
          error: J({}, e, {
            value: Xv
          }),
          group: J({}, e, {
            value: Kv
          }),
          groupCollapsed: J({}, e, {
            value: Zv
          }),
          groupEnd: J({}, e, {
            value: Jv
          })
        });
      }
      Di < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var xs = Re.ReactCurrentDispatcher, Ds;
  function da(e, t, n) {
    {
      if (Ds === void 0)
        try {
          throw Error();
        } catch (r) {
          var a = r.stack.trim().match(/\n( *(at )?)/);
          Ds = a && a[1] || "";
        }
      return `
` + Ds + e;
    }
  }
  var Os = !1, vu;
  {
    var $b = typeof WeakMap == "function" ? WeakMap : Map;
    vu = new $b();
  }
  function Ms(e, t) {
    if (!e || Os)
      return "";
    {
      var n = vu.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    Os = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var i;
    i = xs.current, xs.current = null, jb();
    try {
      if (t) {
        var l = function() {
          throw Error();
        };
        if (Object.defineProperty(l.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(l, []);
          } catch (y) {
            a = y;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (y) {
            a = y;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (y) {
          a = y;
        }
        e();
      }
    } catch (y) {
      if (y && a && typeof y.stack == "string") {
        for (var u = y.stack.split(`
`), o = a.stack.split(`
`), s = u.length - 1, c = o.length - 1; s >= 1 && c >= 0 && u[s] !== o[c]; )
          c--;
        for (; s >= 1 && c >= 0; s--, c--)
          if (u[s] !== o[c]) {
            if (s !== 1 || c !== 1)
              do
                if (s--, c--, c < 0 || u[s] !== o[c]) {
                  var v = `
` + u[s].replace(" at new ", " at ");
                  return e.displayName && v.includes("<anonymous>") && (v = v.replace("<anonymous>", e.displayName)), typeof e == "function" && vu.set(e, v), v;
                }
              while (s >= 1 && c >= 0);
            break;
          }
      }
    } finally {
      Os = !1, xs.current = i, Yb(), Error.prepareStackTrace = r;
    }
    var d = e ? e.displayName || e.name : "", m = d ? da(d) : "";
    return typeof e == "function" && vu.set(e, m), m;
  }
  function qb(e, t, n) {
    return Ms(e, !0);
  }
  function Us(e, t, n) {
    return Ms(e, !1);
  }
  function Gb(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function Ls(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return Ms(e, Gb(e));
    if (typeof e == "string")
      return da(e);
    switch (e) {
      case fu:
        return da("Suspense");
      case du:
        return da("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Tr:
          return Us(e.render);
        case xi:
          return Ls(e.type, t, n);
        case st: {
          var a = e, r = a._payload, i = a._init;
          try {
            return Ls(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function Qb(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case z:
        return da(e.type);
      case Ba:
        return da("Lazy");
      case ce:
        return da("Suspense");
      case ot:
        return da("SuspenseList");
      case P:
      case bt:
      case fe:
        return Us(e.type);
      case re:
        return Us(e.type.render);
      case Y:
        return qb(e.type);
      default:
        return "";
    }
  }
  function Iv(e) {
    try {
      var t = "", n = e;
      do
        t += Qb(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function Xb(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function Pv(e) {
    return e.displayName || "Context";
  }
  function de(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Er:
        return "Fragment";
      case ja:
        return "Portal";
      case Es:
        return "Profiler";
      case Cs:
        return "StrictMode";
      case fu:
        return "Suspense";
      case du:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Rs:
          var t = e;
          return Pv(t) + ".Consumer";
        case Ts:
          var n = e;
          return Pv(n._context) + ".Provider";
        case Tr:
          return Xb(e, e.render, "ForwardRef");
        case xi:
          var a = e.displayName || null;
          return a !== null ? a : de(e.type) || "Memo";
        case st: {
          var r = e, i = r._payload, l = r._init;
          try {
            return de(l(i));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function Kb(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function ep(e) {
    return e.displayName || "Context";
  }
  function $(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case en:
        return "Cache";
      case Va:
        var a = n;
        return ep(a) + ".Consumer";
      case gn:
        var r = n;
        return ep(r._context) + ".Provider";
      case St:
        return "DehydratedFragment";
      case re:
        return Kb(n, n.render, "ForwardRef");
      case sa:
        return "Fragment";
      case z:
        return n;
      case oe:
        return "Portal";
      case B:
        return "Root";
      case pe:
        return "Text";
      case Ba:
        return de(n);
      case gr:
        return n === Cs ? "StrictMode" : "Mode";
      case ae:
        return "Offscreen";
      case Ut:
        return "Profiler";
      case Ue:
        return "Scope";
      case ce:
        return "Suspense";
      case ot:
        return "SuspenseList";
      case Hn:
        return "TracingMarker";
      case Y:
      case P:
      case Ge:
      case bt:
      case Lt:
      case fe:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var tp = Re.ReactDebugCurrentFrame, wt = null, Oi = !1;
  function Mi() {
    {
      if (wt === null)
        return null;
      var e = wt._debugOwner;
      if (e !== null && typeof e < "u")
        return $(e);
    }
    return null;
  }
  function Zb() {
    return wt === null ? "" : Iv(wt);
  }
  function ct() {
    tp.getCurrentStack = null, wt = null, Oi = !1;
  }
  function Ee(e) {
    tp.getCurrentStack = e === null ? null : Zb, wt = e, Oi = !1;
  }
  function Jb() {
    return wt;
  }
  function En(e) {
    Oi = e;
  }
  function Gt(e) {
    return "" + e;
  }
  function va(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return fa(e), e;
      default:
        return "";
    }
  }
  var Wb = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function _s(e, t) {
    Wb[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function np(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ap(e) {
    return e._valueTracker;
  }
  function Ib(e) {
    e._valueTracker = null;
  }
  function Pb(e) {
    var t = "";
    return e && (np(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function eS(e) {
    var t = np(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    fa(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(u) {
          fa(u), a = "" + u, i.call(this, u);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(u) {
          fa(u), a = "" + u;
        },
        stopTracking: function() {
          Ib(e), delete e[t];
        }
      };
      return l;
    }
  }
  function pu(e) {
    ap(e) || (e._valueTracker = eS(e));
  }
  function rp(e) {
    if (!e)
      return !1;
    var t = ap(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = Pb(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function hu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ip = !1, lp = !1, up = !1, op = !1;
  function sp(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function ws(e, t) {
    var n = e, a = t.checked, r = J({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function cp(e, t) {
    _s("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !lp && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mi() || "A component", t.type), lp = !0), t.value !== void 0 && t.defaultValue !== void 0 && !ip && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mi() || "A component", t.type), ip = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: va(t.value != null ? t.value : a),
      controlled: sp(t)
    };
  }
  function fp(e, t) {
    var n = e, a = t.checked;
    a != null && Ss(n, "checked", a, !1);
  }
  function As(e, t) {
    var n = e;
    {
      var a = sp(t);
      !n._wrapperState.controlled && a && !op && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), op = !0), n._wrapperState.controlled && !a && !up && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), up = !0);
    }
    fp(e, t);
    var r = va(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Gt(r)) : n.value !== Gt(r) && (n.value = Gt(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? zs(n, t.type, r) : t.hasOwnProperty("defaultValue") && zs(n, t.type, va(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function dp(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = Gt(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var u = a.name;
    u !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, u !== "" && (a.name = u);
  }
  function tS(e, t) {
    var n = e;
    As(n, t), nS(n, t);
  }
  function nS(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      Bn(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var l = r[i];
        if (!(l === e || l.form !== e.form)) {
          var u = eo(l);
          if (!u)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          rp(l), As(l, u);
        }
      }
    }
  }
  function zs(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || hu(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Gt(e._wrapperState.initialValue) : e.defaultValue !== Gt(n) && (e.defaultValue = Gt(n)));
  }
  var vp = !1, pp = !1, hp = !1;
  function mp(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? se.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || pp || (pp = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (hp || (hp = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !vp && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), vp = !0);
  }
  function aS(e, t) {
    t.value != null && e.setAttribute("value", Gt(va(t.value)));
  }
  var rS = Array.isArray;
  function ft(e) {
    return rS(e);
  }
  var Ns;
  Ns = !1;
  function yp() {
    var e = Mi();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var gp = ["value", "defaultValue"];
  function iS(e) {
    {
      _s("select", e);
      for (var t = 0; t < gp.length; t++) {
        var n = gp[t];
        if (e[n] != null) {
          var a = ft(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, yp()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, yp());
        }
      }
    }
  }
  function Rr(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, u = 0; u < i.length; u++)
        l["$" + i[u]] = !0;
      for (var o = 0; o < r.length; o++) {
        var s = l.hasOwnProperty("$" + r[o].value);
        r[o].selected !== s && (r[o].selected = s), s && a && (r[o].defaultSelected = !0);
      }
    } else {
      for (var c = Gt(va(n)), v = null, d = 0; d < r.length; d++) {
        if (r[d].value === c) {
          r[d].selected = !0, a && (r[d].defaultSelected = !0);
          return;
        }
        v === null && !r[d].disabled && (v = r[d]);
      }
      v !== null && (v.selected = !0);
    }
  }
  function Hs(e, t) {
    return J({}, t, {
      value: void 0
    });
  }
  function bp(e, t) {
    var n = e;
    iS(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !Ns && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Ns = !0);
  }
  function lS(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? Rr(n, !!t.multiple, a, !1) : t.defaultValue != null && Rr(n, !!t.multiple, t.defaultValue, !0);
  }
  function uS(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? Rr(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? Rr(n, !!t.multiple, t.defaultValue, !0) : Rr(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function oS(e, t) {
    var n = e, a = t.value;
    a != null && Rr(n, !!t.multiple, a, !1);
  }
  var Sp = !1;
  function ks(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = J({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Gt(n._wrapperState.initialValue)
    });
    return a;
  }
  function Cp(e, t) {
    var n = e;
    _s("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Sp && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mi() || "A component"), Sp = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (ft(r)) {
            if (r.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            r = r[0];
          }
          i = r;
        }
      }
      i == null && (i = ""), a = i;
    }
    n._wrapperState = {
      initialValue: va(a)
    };
  }
  function Ep(e, t) {
    var n = e, a = va(t.value), r = va(t.defaultValue);
    if (a != null) {
      var i = Gt(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Gt(r));
  }
  function Tp(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function sS(e, t) {
    Ep(e, t);
  }
  var Yn = "http://www.w3.org/1999/xhtml", cS = "http://www.w3.org/1998/Math/MathML", Fs = "http://www.w3.org/2000/svg";
  function Vs(e) {
    switch (e) {
      case "svg":
        return Fs;
      case "math":
        return cS;
      default:
        return Yn;
    }
  }
  function Bs(e, t) {
    return e == null || e === Yn ? Vs(t) : e === Fs && t === "foreignObject" ? Yn : e;
  }
  var fS = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, mu, Rp = fS(function(e, t) {
    if (e.namespaceURI === Fs && !("innerHTML" in e)) {
      mu = mu || document.createElement("div"), mu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = mu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Et = 1, $n = 3, De = 8, qn = 9, js = 11, yu = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === $n) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, dS = {
    animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
    background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
    backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
    border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
    borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
    borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
    borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
    borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
    borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
    borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
    borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
    borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
    borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
    borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
    borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
    borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
    borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
    columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
    columns: ["columnCount", "columnWidth"],
    flex: ["flexBasis", "flexGrow", "flexShrink"],
    flexFlow: ["flexDirection", "flexWrap"],
    font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
    fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
    gap: ["columnGap", "rowGap"],
    grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
    gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
    gridColumn: ["gridColumnEnd", "gridColumnStart"],
    gridColumnGap: ["columnGap"],
    gridGap: ["columnGap", "rowGap"],
    gridRow: ["gridRowEnd", "gridRowStart"],
    gridRowGap: ["rowGap"],
    gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
    listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
    margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
    marker: ["markerEnd", "markerMid", "markerStart"],
    mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
    maskPosition: ["maskPositionX", "maskPositionY"],
    outline: ["outlineColor", "outlineStyle", "outlineWidth"],
    overflow: ["overflowX", "overflowY"],
    padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
    placeContent: ["alignContent", "justifyContent"],
    placeItems: ["alignItems", "justifyItems"],
    placeSelf: ["alignSelf", "justifySelf"],
    textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
    textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
    transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
    wordWrap: ["overflowWrap"]
  }, Ui = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    // SVG-related properties
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  };
  function vS(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var pS = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ui).forEach(function(e) {
    pS.forEach(function(t) {
      Ui[vS(t, e)] = Ui[e];
    });
  });
  function Ys(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Ui.hasOwnProperty(e) && Ui[e]) ? t + "px" : (ms(t, e), ("" + t).trim());
  }
  var hS = /([A-Z])/g, mS = /^ms-/;
  function yS(e) {
    return e.replace(hS, "-$1").toLowerCase().replace(mS, "-ms-");
  }
  var xp = function() {
  };
  {
    var gS = /^(?:webkit|moz|o)[A-Z]/, bS = /^-ms-/, SS = /-(.)/g, Dp = /;\s*$/, xr = {}, $s = {}, Op = !1, Mp = !1, CS = function(e) {
      return e.replace(SS, function(t, n) {
        return n.toUpperCase();
      });
    }, ES = function(e) {
      xr.hasOwnProperty(e) && xr[e] || (xr[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        CS(e.replace(bS, "ms-"))
      ));
    }, TS = function(e) {
      xr.hasOwnProperty(e) && xr[e] || (xr[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, RS = function(e, t) {
      $s.hasOwnProperty(t) && $s[t] || ($s[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Dp, "")));
    }, xS = function(e, t) {
      Op || (Op = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, DS = function(e, t) {
      Mp || (Mp = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    xp = function(e, t) {
      e.indexOf("-") > -1 ? ES(e) : gS.test(e) ? TS(e) : Dp.test(t) && RS(e, t), typeof t == "number" && (isNaN(t) ? xS(e, t) : isFinite(t) || DS(e, t));
    };
  }
  var OS = xp;
  function MS(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : yS(a)) + ":", t += Ys(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function Up(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || OS(a, t[a]);
        var i = Ys(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function US(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function Lp(e) {
    var t = {};
    for (var n in e)
      for (var a = dS[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function LS(e, t) {
    {
      if (!t)
        return;
      var n = Lp(e), a = Lp(t), r = {};
      for (var i in n) {
        var l = n[i], u = a[i];
        if (u && l !== u) {
          var o = l + "," + u;
          if (r[o])
            continue;
          r[o] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", US(e[l]) ? "Removing" : "Updating", l, u);
        }
      }
    }
  }
  var _S = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
    // NOTE: menuitem's close tag should be omitted, but that causes problems.
  }, wS = J({
    menuitem: !0
  }, _S), AS = "__html";
  function qs(e, t) {
    if (t) {
      if (wS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(AS in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function $a(e, t) {
    if (e.indexOf("-") === -1)
      return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var gu = {
    // HTML
    accept: "accept",
    acceptcharset: "acceptCharset",
    "accept-charset": "acceptCharset",
    accesskey: "accessKey",
    action: "action",
    allowfullscreen: "allowFullScreen",
    alt: "alt",
    as: "as",
    async: "async",
    autocapitalize: "autoCapitalize",
    autocomplete: "autoComplete",
    autocorrect: "autoCorrect",
    autofocus: "autoFocus",
    autoplay: "autoPlay",
    autosave: "autoSave",
    capture: "capture",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    challenge: "challenge",
    charset: "charSet",
    checked: "checked",
    children: "children",
    cite: "cite",
    class: "className",
    classid: "classID",
    classname: "className",
    cols: "cols",
    colspan: "colSpan",
    content: "content",
    contenteditable: "contentEditable",
    contextmenu: "contextMenu",
    controls: "controls",
    controlslist: "controlsList",
    coords: "coords",
    crossorigin: "crossOrigin",
    dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
    data: "data",
    datetime: "dateTime",
    default: "default",
    defaultchecked: "defaultChecked",
    defaultvalue: "defaultValue",
    defer: "defer",
    dir: "dir",
    disabled: "disabled",
    disablepictureinpicture: "disablePictureInPicture",
    disableremoteplayback: "disableRemotePlayback",
    download: "download",
    draggable: "draggable",
    enctype: "encType",
    enterkeyhint: "enterKeyHint",
    for: "htmlFor",
    form: "form",
    formmethod: "formMethod",
    formaction: "formAction",
    formenctype: "formEncType",
    formnovalidate: "formNoValidate",
    formtarget: "formTarget",
    frameborder: "frameBorder",
    headers: "headers",
    height: "height",
    hidden: "hidden",
    high: "high",
    href: "href",
    hreflang: "hrefLang",
    htmlfor: "htmlFor",
    httpequiv: "httpEquiv",
    "http-equiv": "httpEquiv",
    icon: "icon",
    id: "id",
    imagesizes: "imageSizes",
    imagesrcset: "imageSrcSet",
    innerhtml: "innerHTML",
    inputmode: "inputMode",
    integrity: "integrity",
    is: "is",
    itemid: "itemID",
    itemprop: "itemProp",
    itemref: "itemRef",
    itemscope: "itemScope",
    itemtype: "itemType",
    keyparams: "keyParams",
    keytype: "keyType",
    kind: "kind",
    label: "label",
    lang: "lang",
    list: "list",
    loop: "loop",
    low: "low",
    manifest: "manifest",
    marginwidth: "marginWidth",
    marginheight: "marginHeight",
    max: "max",
    maxlength: "maxLength",
    media: "media",
    mediagroup: "mediaGroup",
    method: "method",
    min: "min",
    minlength: "minLength",
    multiple: "multiple",
    muted: "muted",
    name: "name",
    nomodule: "noModule",
    nonce: "nonce",
    novalidate: "noValidate",
    open: "open",
    optimum: "optimum",
    pattern: "pattern",
    placeholder: "placeholder",
    playsinline: "playsInline",
    poster: "poster",
    preload: "preload",
    profile: "profile",
    radiogroup: "radioGroup",
    readonly: "readOnly",
    referrerpolicy: "referrerPolicy",
    rel: "rel",
    required: "required",
    reversed: "reversed",
    role: "role",
    rows: "rows",
    rowspan: "rowSpan",
    sandbox: "sandbox",
    scope: "scope",
    scoped: "scoped",
    scrolling: "scrolling",
    seamless: "seamless",
    selected: "selected",
    shape: "shape",
    size: "size",
    sizes: "sizes",
    span: "span",
    spellcheck: "spellCheck",
    src: "src",
    srcdoc: "srcDoc",
    srclang: "srcLang",
    srcset: "srcSet",
    start: "start",
    step: "step",
    style: "style",
    summary: "summary",
    tabindex: "tabIndex",
    target: "target",
    title: "title",
    type: "type",
    usemap: "useMap",
    value: "value",
    width: "width",
    wmode: "wmode",
    wrap: "wrap",
    // SVG
    about: "about",
    accentheight: "accentHeight",
    "accent-height": "accentHeight",
    accumulate: "accumulate",
    additive: "additive",
    alignmentbaseline: "alignmentBaseline",
    "alignment-baseline": "alignmentBaseline",
    allowreorder: "allowReorder",
    alphabetic: "alphabetic",
    amplitude: "amplitude",
    arabicform: "arabicForm",
    "arabic-form": "arabicForm",
    ascent: "ascent",
    attributename: "attributeName",
    attributetype: "attributeType",
    autoreverse: "autoReverse",
    azimuth: "azimuth",
    basefrequency: "baseFrequency",
    baselineshift: "baselineShift",
    "baseline-shift": "baselineShift",
    baseprofile: "baseProfile",
    bbox: "bbox",
    begin: "begin",
    bias: "bias",
    by: "by",
    calcmode: "calcMode",
    capheight: "capHeight",
    "cap-height": "capHeight",
    clip: "clip",
    clippath: "clipPath",
    "clip-path": "clipPath",
    clippathunits: "clipPathUnits",
    cliprule: "clipRule",
    "clip-rule": "clipRule",
    color: "color",
    colorinterpolation: "colorInterpolation",
    "color-interpolation": "colorInterpolation",
    colorinterpolationfilters: "colorInterpolationFilters",
    "color-interpolation-filters": "colorInterpolationFilters",
    colorprofile: "colorProfile",
    "color-profile": "colorProfile",
    colorrendering: "colorRendering",
    "color-rendering": "colorRendering",
    contentscripttype: "contentScriptType",
    contentstyletype: "contentStyleType",
    cursor: "cursor",
    cx: "cx",
    cy: "cy",
    d: "d",
    datatype: "datatype",
    decelerate: "decelerate",
    descent: "descent",
    diffuseconstant: "diffuseConstant",
    direction: "direction",
    display: "display",
    divisor: "divisor",
    dominantbaseline: "dominantBaseline",
    "dominant-baseline": "dominantBaseline",
    dur: "dur",
    dx: "dx",
    dy: "dy",
    edgemode: "edgeMode",
    elevation: "elevation",
    enablebackground: "enableBackground",
    "enable-background": "enableBackground",
    end: "end",
    exponent: "exponent",
    externalresourcesrequired: "externalResourcesRequired",
    fill: "fill",
    fillopacity: "fillOpacity",
    "fill-opacity": "fillOpacity",
    fillrule: "fillRule",
    "fill-rule": "fillRule",
    filter: "filter",
    filterres: "filterRes",
    filterunits: "filterUnits",
    floodopacity: "floodOpacity",
    "flood-opacity": "floodOpacity",
    floodcolor: "floodColor",
    "flood-color": "floodColor",
    focusable: "focusable",
    fontfamily: "fontFamily",
    "font-family": "fontFamily",
    fontsize: "fontSize",
    "font-size": "fontSize",
    fontsizeadjust: "fontSizeAdjust",
    "font-size-adjust": "fontSizeAdjust",
    fontstretch: "fontStretch",
    "font-stretch": "fontStretch",
    fontstyle: "fontStyle",
    "font-style": "fontStyle",
    fontvariant: "fontVariant",
    "font-variant": "fontVariant",
    fontweight: "fontWeight",
    "font-weight": "fontWeight",
    format: "format",
    from: "from",
    fx: "fx",
    fy: "fy",
    g1: "g1",
    g2: "g2",
    glyphname: "glyphName",
    "glyph-name": "glyphName",
    glyphorientationhorizontal: "glyphOrientationHorizontal",
    "glyph-orientation-horizontal": "glyphOrientationHorizontal",
    glyphorientationvertical: "glyphOrientationVertical",
    "glyph-orientation-vertical": "glyphOrientationVertical",
    glyphref: "glyphRef",
    gradienttransform: "gradientTransform",
    gradientunits: "gradientUnits",
    hanging: "hanging",
    horizadvx: "horizAdvX",
    "horiz-adv-x": "horizAdvX",
    horizoriginx: "horizOriginX",
    "horiz-origin-x": "horizOriginX",
    ideographic: "ideographic",
    imagerendering: "imageRendering",
    "image-rendering": "imageRendering",
    in2: "in2",
    in: "in",
    inlist: "inlist",
    intercept: "intercept",
    k1: "k1",
    k2: "k2",
    k3: "k3",
    k4: "k4",
    k: "k",
    kernelmatrix: "kernelMatrix",
    kernelunitlength: "kernelUnitLength",
    kerning: "kerning",
    keypoints: "keyPoints",
    keysplines: "keySplines",
    keytimes: "keyTimes",
    lengthadjust: "lengthAdjust",
    letterspacing: "letterSpacing",
    "letter-spacing": "letterSpacing",
    lightingcolor: "lightingColor",
    "lighting-color": "lightingColor",
    limitingconeangle: "limitingConeAngle",
    local: "local",
    markerend: "markerEnd",
    "marker-end": "markerEnd",
    markerheight: "markerHeight",
    markermid: "markerMid",
    "marker-mid": "markerMid",
    markerstart: "markerStart",
    "marker-start": "markerStart",
    markerunits: "markerUnits",
    markerwidth: "markerWidth",
    mask: "mask",
    maskcontentunits: "maskContentUnits",
    maskunits: "maskUnits",
    mathematical: "mathematical",
    mode: "mode",
    numoctaves: "numOctaves",
    offset: "offset",
    opacity: "opacity",
    operator: "operator",
    order: "order",
    orient: "orient",
    orientation: "orientation",
    origin: "origin",
    overflow: "overflow",
    overlineposition: "overlinePosition",
    "overline-position": "overlinePosition",
    overlinethickness: "overlineThickness",
    "overline-thickness": "overlineThickness",
    paintorder: "paintOrder",
    "paint-order": "paintOrder",
    panose1: "panose1",
    "panose-1": "panose1",
    pathlength: "pathLength",
    patterncontentunits: "patternContentUnits",
    patterntransform: "patternTransform",
    patternunits: "patternUnits",
    pointerevents: "pointerEvents",
    "pointer-events": "pointerEvents",
    points: "points",
    pointsatx: "pointsAtX",
    pointsaty: "pointsAtY",
    pointsatz: "pointsAtZ",
    prefix: "prefix",
    preservealpha: "preserveAlpha",
    preserveaspectratio: "preserveAspectRatio",
    primitiveunits: "primitiveUnits",
    property: "property",
    r: "r",
    radius: "radius",
    refx: "refX",
    refy: "refY",
    renderingintent: "renderingIntent",
    "rendering-intent": "renderingIntent",
    repeatcount: "repeatCount",
    repeatdur: "repeatDur",
    requiredextensions: "requiredExtensions",
    requiredfeatures: "requiredFeatures",
    resource: "resource",
    restart: "restart",
    result: "result",
    results: "results",
    rotate: "rotate",
    rx: "rx",
    ry: "ry",
    scale: "scale",
    security: "security",
    seed: "seed",
    shaperendering: "shapeRendering",
    "shape-rendering": "shapeRendering",
    slope: "slope",
    spacing: "spacing",
    specularconstant: "specularConstant",
    specularexponent: "specularExponent",
    speed: "speed",
    spreadmethod: "spreadMethod",
    startoffset: "startOffset",
    stddeviation: "stdDeviation",
    stemh: "stemh",
    stemv: "stemv",
    stitchtiles: "stitchTiles",
    stopcolor: "stopColor",
    "stop-color": "stopColor",
    stopopacity: "stopOpacity",
    "stop-opacity": "stopOpacity",
    strikethroughposition: "strikethroughPosition",
    "strikethrough-position": "strikethroughPosition",
    strikethroughthickness: "strikethroughThickness",
    "strikethrough-thickness": "strikethroughThickness",
    string: "string",
    stroke: "stroke",
    strokedasharray: "strokeDasharray",
    "stroke-dasharray": "strokeDasharray",
    strokedashoffset: "strokeDashoffset",
    "stroke-dashoffset": "strokeDashoffset",
    strokelinecap: "strokeLinecap",
    "stroke-linecap": "strokeLinecap",
    strokelinejoin: "strokeLinejoin",
    "stroke-linejoin": "strokeLinejoin",
    strokemiterlimit: "strokeMiterlimit",
    "stroke-miterlimit": "strokeMiterlimit",
    strokewidth: "strokeWidth",
    "stroke-width": "strokeWidth",
    strokeopacity: "strokeOpacity",
    "stroke-opacity": "strokeOpacity",
    suppresscontenteditablewarning: "suppressContentEditableWarning",
    suppresshydrationwarning: "suppressHydrationWarning",
    surfacescale: "surfaceScale",
    systemlanguage: "systemLanguage",
    tablevalues: "tableValues",
    targetx: "targetX",
    targety: "targetY",
    textanchor: "textAnchor",
    "text-anchor": "textAnchor",
    textdecoration: "textDecoration",
    "text-decoration": "textDecoration",
    textlength: "textLength",
    textrendering: "textRendering",
    "text-rendering": "textRendering",
    to: "to",
    transform: "transform",
    typeof: "typeof",
    u1: "u1",
    u2: "u2",
    underlineposition: "underlinePosition",
    "underline-position": "underlinePosition",
    underlinethickness: "underlineThickness",
    "underline-thickness": "underlineThickness",
    unicode: "unicode",
    unicodebidi: "unicodeBidi",
    "unicode-bidi": "unicodeBidi",
    unicoderange: "unicodeRange",
    "unicode-range": "unicodeRange",
    unitsperem: "unitsPerEm",
    "units-per-em": "unitsPerEm",
    unselectable: "unselectable",
    valphabetic: "vAlphabetic",
    "v-alphabetic": "vAlphabetic",
    values: "values",
    vectoreffect: "vectorEffect",
    "vector-effect": "vectorEffect",
    version: "version",
    vertadvy: "vertAdvY",
    "vert-adv-y": "vertAdvY",
    vertoriginx: "vertOriginX",
    "vert-origin-x": "vertOriginX",
    vertoriginy: "vertOriginY",
    "vert-origin-y": "vertOriginY",
    vhanging: "vHanging",
    "v-hanging": "vHanging",
    videographic: "vIdeographic",
    "v-ideographic": "vIdeographic",
    viewbox: "viewBox",
    viewtarget: "viewTarget",
    visibility: "visibility",
    vmathematical: "vMathematical",
    "v-mathematical": "vMathematical",
    vocab: "vocab",
    widths: "widths",
    wordspacing: "wordSpacing",
    "word-spacing": "wordSpacing",
    writingmode: "writingMode",
    "writing-mode": "writingMode",
    x1: "x1",
    x2: "x2",
    x: "x",
    xchannelselector: "xChannelSelector",
    xheight: "xHeight",
    "x-height": "xHeight",
    xlinkactuate: "xlinkActuate",
    "xlink:actuate": "xlinkActuate",
    xlinkarcrole: "xlinkArcrole",
    "xlink:arcrole": "xlinkArcrole",
    xlinkhref: "xlinkHref",
    "xlink:href": "xlinkHref",
    xlinkrole: "xlinkRole",
    "xlink:role": "xlinkRole",
    xlinkshow: "xlinkShow",
    "xlink:show": "xlinkShow",
    xlinktitle: "xlinkTitle",
    "xlink:title": "xlinkTitle",
    xlinktype: "xlinkType",
    "xlink:type": "xlinkType",
    xmlbase: "xmlBase",
    "xml:base": "xmlBase",
    xmllang: "xmlLang",
    "xml:lang": "xmlLang",
    xmlns: "xmlns",
    "xml:space": "xmlSpace",
    xmlnsxlink: "xmlnsXlink",
    "xmlns:xlink": "xmlnsXlink",
    xmlspace: "xmlSpace",
    y1: "y1",
    y2: "y2",
    y: "y",
    ychannelselector: "yChannelSelector",
    z: "z",
    zoomandpan: "zoomAndPan"
  }, _p = {
    "aria-current": 0,
    // state
    "aria-description": 0,
    "aria-details": 0,
    "aria-disabled": 0,
    // state
    "aria-hidden": 0,
    // state
    "aria-invalid": 0,
    // state
    "aria-keyshortcuts": 0,
    "aria-label": 0,
    "aria-roledescription": 0,
    // Widget Attributes
    "aria-autocomplete": 0,
    "aria-checked": 0,
    "aria-expanded": 0,
    "aria-haspopup": 0,
    "aria-level": 0,
    "aria-modal": 0,
    "aria-multiline": 0,
    "aria-multiselectable": 0,
    "aria-orientation": 0,
    "aria-placeholder": 0,
    "aria-pressed": 0,
    "aria-readonly": 0,
    "aria-required": 0,
    "aria-selected": 0,
    "aria-sort": 0,
    "aria-valuemax": 0,
    "aria-valuemin": 0,
    "aria-valuenow": 0,
    "aria-valuetext": 0,
    // Live Region Attributes
    "aria-atomic": 0,
    "aria-busy": 0,
    "aria-live": 0,
    "aria-relevant": 0,
    // Drag-and-Drop Attributes
    "aria-dropeffect": 0,
    "aria-grabbed": 0,
    // Relationship Attributes
    "aria-activedescendant": 0,
    "aria-colcount": 0,
    "aria-colindex": 0,
    "aria-colspan": 0,
    "aria-controls": 0,
    "aria-describedby": 0,
    "aria-errormessage": 0,
    "aria-flowto": 0,
    "aria-labelledby": 0,
    "aria-owns": 0,
    "aria-posinset": 0,
    "aria-rowcount": 0,
    "aria-rowindex": 0,
    "aria-rowspan": 0,
    "aria-setsize": 0
  }, Dr = {}, zS = new RegExp("^(aria)-[" + O + "]*$"), NS = new RegExp("^(aria)[A-Z][" + O + "]*$");
  function HS(e, t) {
    {
      if (Vn.call(Dr, t) && Dr[t])
        return !0;
      if (NS.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = _p.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Dr[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), Dr[t] = !0, !0;
      }
      if (zS.test(t)) {
        var r = t.toLowerCase(), i = _p.hasOwnProperty(r) ? r : null;
        if (i == null)
          return Dr[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), Dr[t] = !0, !0;
      }
    }
    return !0;
  }
  function kS(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = HS(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function FS(e, t) {
    $a(e, t) || kS(e, t);
  }
  var wp = !1;
  function VS(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !wp && (wp = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var Ap = function() {
  };
  {
    var dt = {}, zp = /^on./, BS = /^on[^A-Z]/, jS = new RegExp("^(aria)-[" + O + "]*$"), YS = new RegExp("^(aria)[A-Z][" + O + "]*$");
    Ap = function(e, t, n, a) {
      if (Vn.call(dt, t) && dt[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), dt[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var u = l.hasOwnProperty(r) ? l[r] : null;
        if (u != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, u), dt[t] = !0, !0;
        if (zp.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), dt[t] = !0, !0;
      } else if (zp.test(t))
        return BS.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), dt[t] = !0, !0;
      if (jS.test(t) || YS.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), dt[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), dt[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), dt[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), dt[t] = !0, !0;
      var o = Be(t), s = o !== null && o.type === Sn;
      if (gu.hasOwnProperty(r)) {
        var c = gu[r];
        if (c !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, c), dt[t] = !0, !0;
      } else if (!s && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), dt[t] = !0, !0;
      return typeof n == "boolean" && Ve(t, n, o, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), dt[t] = !0, !0) : s ? !0 : Ve(t, n, o, !1) ? (dt[t] = !0, !1) : ((n === "false" || n === "true") && o !== null && o.type === $t && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), dt[t] = !0), !0);
    };
  }
  var $S = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = Ap(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function qS(e, t, n) {
    $a(e, t) || $S(e, t, n);
  }
  var Np = 1, Gs = 2, Li = 4, GS = Np | Gs | Li, _i = null;
  function QS(e) {
    _i !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), _i = e;
  }
  function XS() {
    _i === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), _i = null;
  }
  function KS(e) {
    return e === _i;
  }
  function Qs(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === $n ? t.parentNode : t;
  }
  var Xs = null, Or = null, Mr = null;
  function Hp(e) {
    var t = Ea(e);
    if (t) {
      if (typeof Xs != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = eo(n);
        Xs(t.stateNode, t.type, a);
      }
    }
  }
  function ZS(e) {
    Xs = e;
  }
  function kp(e) {
    Or ? Mr ? Mr.push(e) : Mr = [e] : Or = e;
  }
  function JS() {
    return Or !== null || Mr !== null;
  }
  function Fp() {
    if (Or) {
      var e = Or, t = Mr;
      if (Or = null, Mr = null, Hp(e), t)
        for (var n = 0; n < t.length; n++)
          Hp(t[n]);
    }
  }
  var Vp = function(e, t) {
    return e(t);
  }, Bp = function() {
  }, Ks = !1;
  function WS() {
    var e = JS();
    e && (Bp(), Fp());
  }
  function jp(e, t, n) {
    if (Ks)
      return e(t, n);
    Ks = !0;
    try {
      return Vp(e, t, n);
    } finally {
      Ks = !1, WS();
    }
  }
  function IS(e, t, n) {
    Vp = e, Bp = n;
  }
  function PS(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function eC(e, t, n) {
    switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        return !!(n.disabled && PS(t));
      default:
        return !1;
    }
  }
  function wi(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = eo(n);
    if (a === null)
      return null;
    var r = a[t];
    if (eC(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Zs = !1;
  if (_t)
    try {
      var Ai = {};
      Object.defineProperty(Ai, "passive", {
        get: function() {
          Zs = !0;
        }
      }), window.addEventListener("test", Ai, Ai), window.removeEventListener("test", Ai, Ai);
    } catch {
      Zs = !1;
    }
  function Yp(e, t, n, a, r, i, l, u, o) {
    var s = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, s);
    } catch (c) {
      this.onError(c);
    }
  }
  var $p = Yp;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var Js = document.createElement("react");
    $p = function(t, n, a, r, i, l, u, o, s) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var c = document.createEvent("Event"), v = !1, d = !0, m = window.event, y = Object.getOwnPropertyDescriptor(window, "event");
      function g() {
        Js.removeEventListener(b, w, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = m);
      }
      var R = Array.prototype.slice.call(arguments, 3);
      function w() {
        v = !0, g(), n.apply(a, R), d = !1;
      }
      var _, Z = !1, G = !1;
      function p(h) {
        if (_ = h.error, Z = !0, _ === null && h.colno === 0 && h.lineno === 0 && (G = !0), h.defaultPrevented && _ != null && typeof _ == "object")
          try {
            _._suppressLogging = !0;
          } catch {
          }
      }
      var b = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", p), Js.addEventListener(b, w, !1), c.initEvent(b, !1, !1), Js.dispatchEvent(c), y && Object.defineProperty(window, "event", y), v && d && (Z ? G && (_ = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : _ = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(_)), window.removeEventListener("error", p), !v)
        return g(), Yp.apply(this, arguments);
    };
  }
  var tC = $p, Ur = !1, bu = null, Su = !1, Ws = null, nC = {
    onError: function(e) {
      Ur = !0, bu = e;
    }
  };
  function Is(e, t, n, a, r, i, l, u, o) {
    Ur = !1, bu = null, tC.apply(nC, arguments);
  }
  function aC(e, t, n, a, r, i, l, u, o) {
    if (Is.apply(this, arguments), Ur) {
      var s = Ps();
      Su || (Su = !0, Ws = s);
    }
  }
  function rC() {
    if (Su) {
      var e = Ws;
      throw Su = !1, Ws = null, e;
    }
  }
  function iC() {
    return Ur;
  }
  function Ps() {
    if (Ur) {
      var e = bu;
      return Ur = !1, bu = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Lr(e) {
    return e._reactInternals;
  }
  function lC(e) {
    return e._reactInternals !== void 0;
  }
  function uC(e, t) {
    e._reactInternals = t;
  }
  var N = (
    /*                      */
    0
  ), _r = (
    /*                */
    1
  ), Oe = (
    /*                    */
    2
  ), ee = (
    /*                       */
    4
  ), qa = (
    /*                */
    16
  ), zi = (
    /*                 */
    32
  ), qp = (
    /*                     */
    64
  ), te = (
    /*                   */
    128
  ), Gn = (
    /*            */
    256
  ), Ga = (
    /*                          */
    512
  ), wr = (
    /*                     */
    1024
  ), pa = (
    /*                      */
    2048
  ), Qn = (
    /*                    */
    4096
  ), Qa = (
    /*                   */
    8192
  ), ec = (
    /*             */
    16384
  ), oC = (
    /*               */
    32767
  ), Cu = (
    /*                   */
    32768
  ), vt = (
    /*                */
    65536
  ), tc = (
    /* */
    131072
  ), Gp = (
    /*                       */
    1048576
  ), nc = (
    /*                    */
    2097152
  ), Xa = (
    /*                 */
    4194304
  ), ac = (
    /*                */
    8388608
  ), ha = (
    /*               */
    16777216
  ), rc = (
    /*              */
    33554432
  ), ic = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    ee | wr | 0
  ), lc = Oe | ee | qa | zi | Ga | Qn | Qa, Ni = ee | qp | Ga | Qa, Ar = pa | qa, Xn = Xa | ac | nc, sC = Re.ReactCurrentOwner;
  function Ka(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Oe | Qn)) !== N && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === B ? n : null;
  }
  function Qp(e) {
    if (e.tag === ce) {
      var t = e.memoizedState;
      if (t === null) {
        var n = e.alternate;
        n !== null && (t = n.memoizedState);
      }
      if (t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function Xp(e) {
    return e.tag === B ? e.stateNode.containerInfo : null;
  }
  function cC(e) {
    return Ka(e) === e;
  }
  function fC(e) {
    {
      var t = sC.current;
      if (t !== null && t.tag === Y) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", $(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = Lr(e);
    return r ? Ka(r) === r : !1;
  }
  function Kp(e) {
    if (Ka(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function Zp(e) {
    var t = e.alternate;
    if (!t) {
      var n = Ka(e);
      if (n === null)
        throw new Error("Unable to find node on an unmounted component.");
      return n !== e ? null : e;
    }
    for (var a = e, r = t; ; ) {
      var i = a.return;
      if (i === null)
        break;
      var l = i.alternate;
      if (l === null) {
        var u = i.return;
        if (u !== null) {
          a = r = u;
          continue;
        }
        break;
      }
      if (i.child === l.child) {
        for (var o = i.child; o; ) {
          if (o === a)
            return Kp(i), e;
          if (o === r)
            return Kp(i), t;
          o = o.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = l;
      else {
        for (var s = !1, c = i.child; c; ) {
          if (c === a) {
            s = !0, a = i, r = l;
            break;
          }
          if (c === r) {
            s = !0, r = i, a = l;
            break;
          }
          c = c.sibling;
        }
        if (!s) {
          for (c = l.child; c; ) {
            if (c === a) {
              s = !0, a = l, r = i;
              break;
            }
            if (c === r) {
              s = !0, r = l, a = i;
              break;
            }
            c = c.sibling;
          }
          if (!s)
            throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
        }
      }
      if (a.alternate !== r)
        throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
    }
    if (a.tag !== B)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function Jp(e) {
    var t = Zp(e);
    return t !== null ? Wp(t) : null;
  }
  function Wp(e) {
    if (e.tag === z || e.tag === pe)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Wp(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function dC(e) {
    var t = Zp(e);
    return t !== null ? Ip(t) : null;
  }
  function Ip(e) {
    if (e.tag === z || e.tag === pe)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== oe) {
        var n = Ip(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Pp = Fe.unstable_scheduleCallback, vC = Fe.unstable_cancelCallback, pC = Fe.unstable_shouldYield, hC = Fe.unstable_requestPaint, je = Fe.unstable_now, mC = Fe.unstable_getCurrentPriorityLevel, Eu = Fe.unstable_ImmediatePriority, uc = Fe.unstable_UserBlockingPriority, Za = Fe.unstable_NormalPriority, yC = Fe.unstable_LowPriority, oc = Fe.unstable_IdlePriority, gC = Fe.unstable_yieldValue, bC = Fe.unstable_setDisableYieldValue, zr = null, nt = null, D = null, Tn = !1, rn = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function SC(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      iu && (e = J({}, e, {
        getLaneLabelMap: DC,
        injectProfilingHooks: xC
      })), zr = t.inject(e), nt = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function CC(e, t) {
    if (nt && typeof nt.onScheduleFiberRoot == "function")
      try {
        nt.onScheduleFiberRoot(zr, e, t);
      } catch (n) {
        Tn || (Tn = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function EC(e, t) {
    if (nt && typeof nt.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & te) === te;
        if (Ci) {
          var a;
          switch (t) {
            case Nt:
              a = Eu;
              break;
            case Zn:
              a = uc;
              break;
            case Jn:
              a = Za;
              break;
            case Uu:
              a = oc;
              break;
            default:
              a = Za;
              break;
          }
          nt.onCommitFiberRoot(zr, e, a, n);
        }
      } catch (r) {
        Tn || (Tn = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function TC(e) {
    if (nt && typeof nt.onPostCommitFiberRoot == "function")
      try {
        nt.onPostCommitFiberRoot(zr, e);
      } catch (t) {
        Tn || (Tn = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function RC(e) {
    if (nt && typeof nt.onCommitFiberUnmount == "function")
      try {
        nt.onCommitFiberUnmount(zr, e);
      } catch (t) {
        Tn || (Tn = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Ye(e) {
    if (typeof gC == "function" && (bC(e), Mt(e)), nt && typeof nt.setStrictMode == "function")
      try {
        nt.setStrictMode(zr, e);
      } catch (t) {
        Tn || (Tn = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function xC(e) {
    D = e;
  }
  function DC() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < cc; n++) {
        var a = QC(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function OC(e) {
    D !== null && typeof D.markCommitStarted == "function" && D.markCommitStarted(e);
  }
  function eh() {
    D !== null && typeof D.markCommitStopped == "function" && D.markCommitStopped();
  }
  function Hi(e) {
    D !== null && typeof D.markComponentRenderStarted == "function" && D.markComponentRenderStarted(e);
  }
  function Nr() {
    D !== null && typeof D.markComponentRenderStopped == "function" && D.markComponentRenderStopped();
  }
  function MC(e) {
    D !== null && typeof D.markComponentPassiveEffectMountStarted == "function" && D.markComponentPassiveEffectMountStarted(e);
  }
  function UC() {
    D !== null && typeof D.markComponentPassiveEffectMountStopped == "function" && D.markComponentPassiveEffectMountStopped();
  }
  function LC(e) {
    D !== null && typeof D.markComponentPassiveEffectUnmountStarted == "function" && D.markComponentPassiveEffectUnmountStarted(e);
  }
  function _C() {
    D !== null && typeof D.markComponentPassiveEffectUnmountStopped == "function" && D.markComponentPassiveEffectUnmountStopped();
  }
  function wC(e) {
    D !== null && typeof D.markComponentLayoutEffectMountStarted == "function" && D.markComponentLayoutEffectMountStarted(e);
  }
  function AC() {
    D !== null && typeof D.markComponentLayoutEffectMountStopped == "function" && D.markComponentLayoutEffectMountStopped();
  }
  function th(e) {
    D !== null && typeof D.markComponentLayoutEffectUnmountStarted == "function" && D.markComponentLayoutEffectUnmountStarted(e);
  }
  function nh() {
    D !== null && typeof D.markComponentLayoutEffectUnmountStopped == "function" && D.markComponentLayoutEffectUnmountStopped();
  }
  function zC(e, t, n) {
    D !== null && typeof D.markComponentErrored == "function" && D.markComponentErrored(e, t, n);
  }
  function NC(e, t, n) {
    D !== null && typeof D.markComponentSuspended == "function" && D.markComponentSuspended(e, t, n);
  }
  function HC(e) {
    D !== null && typeof D.markLayoutEffectsStarted == "function" && D.markLayoutEffectsStarted(e);
  }
  function kC() {
    D !== null && typeof D.markLayoutEffectsStopped == "function" && D.markLayoutEffectsStopped();
  }
  function FC(e) {
    D !== null && typeof D.markPassiveEffectsStarted == "function" && D.markPassiveEffectsStarted(e);
  }
  function VC() {
    D !== null && typeof D.markPassiveEffectsStopped == "function" && D.markPassiveEffectsStopped();
  }
  function ah(e) {
    D !== null && typeof D.markRenderStarted == "function" && D.markRenderStarted(e);
  }
  function BC() {
    D !== null && typeof D.markRenderYielded == "function" && D.markRenderYielded();
  }
  function rh() {
    D !== null && typeof D.markRenderStopped == "function" && D.markRenderStopped();
  }
  function jC(e) {
    D !== null && typeof D.markRenderScheduled == "function" && D.markRenderScheduled(e);
  }
  function YC(e, t) {
    D !== null && typeof D.markForceUpdateScheduled == "function" && D.markForceUpdateScheduled(e, t);
  }
  function sc(e, t) {
    D !== null && typeof D.markStateUpdateScheduled == "function" && D.markStateUpdateScheduled(e, t);
  }
  var A = (
    /*                         */
    0
  ), X = (
    /*                 */
    1
  ), ie = (
    /*                    */
    2
  ), be = (
    /*               */
    8
  ), Rn = (
    /*              */
    16
  ), ih = Math.clz32 ? Math.clz32 : GC, $C = Math.log, qC = Math.LN2;
  function GC(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - ($C(t) / qC | 0) | 0;
  }
  var cc = 31, C = (
    /*                        */
    0
  ), $e = (
    /*                          */
    0
  ), F = (
    /*                        */
    1
  ), Hr = (
    /*    */
    2
  ), Kn = (
    /*             */
    4
  ), Ja = (
    /*            */
    8
  ), xn = (
    /*                     */
    16
  ), ki = (
    /*                */
    32
  ), kr = (
    /*                       */
    4194240
  ), Fi = (
    /*                        */
    64
  ), fc = (
    /*                        */
    128
  ), dc = (
    /*                        */
    256
  ), vc = (
    /*                        */
    512
  ), pc = (
    /*                        */
    1024
  ), hc = (
    /*                        */
    2048
  ), mc = (
    /*                        */
    4096
  ), yc = (
    /*                        */
    8192
  ), gc = (
    /*                        */
    16384
  ), bc = (
    /*                       */
    32768
  ), Sc = (
    /*                       */
    65536
  ), Cc = (
    /*                       */
    131072
  ), Ec = (
    /*                       */
    262144
  ), Tc = (
    /*                       */
    524288
  ), Rc = (
    /*                       */
    1048576
  ), xc = (
    /*                       */
    2097152
  ), Tu = (
    /*                            */
    130023424
  ), Fr = (
    /*                             */
    4194304
  ), Dc = (
    /*                             */
    8388608
  ), Oc = (
    /*                             */
    16777216
  ), Mc = (
    /*                             */
    33554432
  ), Uc = (
    /*                             */
    67108864
  ), lh = Fr, Vi = (
    /*          */
    134217728
  ), uh = (
    /*                          */
    268435455
  ), Bi = (
    /*               */
    268435456
  ), Wa = (
    /*                        */
    536870912
  ), At = (
    /*                   */
    1073741824
  );
  function QC(e) {
    {
      if (e & F)
        return "Sync";
      if (e & Hr)
        return "InputContinuousHydration";
      if (e & Kn)
        return "InputContinuous";
      if (e & Ja)
        return "DefaultHydration";
      if (e & xn)
        return "Default";
      if (e & ki)
        return "TransitionHydration";
      if (e & kr)
        return "Transition";
      if (e & Tu)
        return "Retry";
      if (e & Vi)
        return "SelectiveHydration";
      if (e & Bi)
        return "IdleHydration";
      if (e & Wa)
        return "Idle";
      if (e & At)
        return "Offscreen";
    }
  }
  var me = -1, Ru = Fi, xu = Fr;
  function ji(e) {
    switch (Ia(e)) {
      case F:
        return F;
      case Hr:
        return Hr;
      case Kn:
        return Kn;
      case Ja:
        return Ja;
      case xn:
        return xn;
      case ki:
        return ki;
      case Fi:
      case fc:
      case dc:
      case vc:
      case pc:
      case hc:
      case mc:
      case yc:
      case gc:
      case bc:
      case Sc:
      case Cc:
      case Ec:
      case Tc:
      case Rc:
      case xc:
        return e & kr;
      case Fr:
      case Dc:
      case Oc:
      case Mc:
      case Uc:
        return e & Tu;
      case Vi:
        return Vi;
      case Bi:
        return Bi;
      case Wa:
        return Wa;
      case At:
        return At;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Du(e, t) {
    var n = e.pendingLanes;
    if (n === C)
      return C;
    var a = C, r = e.suspendedLanes, i = e.pingedLanes, l = n & uh;
    if (l !== C) {
      var u = l & ~r;
      if (u !== C)
        a = ji(u);
      else {
        var o = l & i;
        o !== C && (a = ji(o));
      }
    } else {
      var s = n & ~r;
      s !== C ? a = ji(s) : i !== C && (a = ji(i));
    }
    if (a === C)
      return C;
    if (t !== C && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === C) {
      var c = Ia(a), v = Ia(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        c >= v || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        c === xn && (v & kr) !== C
      )
        return t;
    }
    (a & Kn) !== C && (a |= n & xn);
    var d = e.entangledLanes;
    if (d !== C)
      for (var m = e.entanglements, y = a & d; y > 0; ) {
        var g = Pa(y), R = 1 << g;
        a |= m[g], y &= ~R;
      }
    return a;
  }
  function XC(e, t) {
    for (var n = e.eventTimes, a = me; t > 0; ) {
      var r = Pa(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function KC(e, t) {
    switch (e) {
      case F:
      case Hr:
      case Kn:
        return t + 250;
      case Ja:
      case xn:
      case ki:
      case Fi:
      case fc:
      case dc:
      case vc:
      case pc:
      case hc:
      case mc:
      case yc:
      case gc:
      case bc:
      case Sc:
      case Cc:
      case Ec:
      case Tc:
      case Rc:
      case xc:
        return t + 5e3;
      case Fr:
      case Dc:
      case Oc:
      case Mc:
      case Uc:
        return me;
      case Vi:
      case Bi:
      case Wa:
      case At:
        return me;
      default:
        return f("Should have found matching lanes. This is a bug in React."), me;
    }
  }
  function ZC(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Pa(l), o = 1 << u, s = i[u];
      s === me ? ((o & a) === C || (o & r) !== C) && (i[u] = KC(o, t)) : s <= t && (e.expiredLanes |= o), l &= ~o;
    }
  }
  function JC(e) {
    return ji(e.pendingLanes);
  }
  function Lc(e) {
    var t = e.pendingLanes & ~At;
    return t !== C ? t : t & At ? At : C;
  }
  function WC(e) {
    return (e & F) !== C;
  }
  function _c(e) {
    return (e & uh) !== C;
  }
  function oh(e) {
    return (e & Tu) === e;
  }
  function IC(e) {
    var t = F | Kn | xn;
    return (e & t) === C;
  }
  function PC(e) {
    return (e & kr) === e;
  }
  function Ou(e, t) {
    var n = Hr | Kn | Ja | xn;
    return (t & n) !== C;
  }
  function eE(e, t) {
    return (t & e.expiredLanes) !== C;
  }
  function sh(e) {
    return (e & kr) !== C;
  }
  function ch() {
    var e = Ru;
    return Ru <<= 1, (Ru & kr) === C && (Ru = Fi), e;
  }
  function tE() {
    var e = xu;
    return xu <<= 1, (xu & Tu) === C && (xu = Fr), e;
  }
  function Ia(e) {
    return e & -e;
  }
  function Yi(e) {
    return Ia(e);
  }
  function Pa(e) {
    return 31 - ih(e);
  }
  function wc(e) {
    return Pa(e);
  }
  function zt(e, t) {
    return (e & t) !== C;
  }
  function Vr(e, t) {
    return (e & t) === t;
  }
  function q(e, t) {
    return e | t;
  }
  function Mu(e, t) {
    return e & ~t;
  }
  function fh(e, t) {
    return e & t;
  }
  function RM(e) {
    return e;
  }
  function nE(e, t) {
    return e !== $e && e < t ? e : t;
  }
  function Ac(e) {
    for (var t = [], n = 0; n < cc; n++)
      t.push(e);
    return t;
  }
  function $i(e, t, n) {
    e.pendingLanes |= t, t !== Wa && (e.suspendedLanes = C, e.pingedLanes = C);
    var a = e.eventTimes, r = wc(t);
    a[r] = n;
  }
  function aE(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Pa(a), i = 1 << r;
      n[r] = me, a &= ~i;
    }
  }
  function dh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function rE(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = C, e.pingedLanes = C, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Pa(l), o = 1 << u;
      a[u] = C, r[u] = me, i[u] = me, l &= ~o;
    }
  }
  function zc(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Pa(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function iE(e, t) {
    var n = Ia(t), a;
    switch (n) {
      case Kn:
        a = Hr;
        break;
      case xn:
        a = Ja;
        break;
      case Fi:
      case fc:
      case dc:
      case vc:
      case pc:
      case hc:
      case mc:
      case yc:
      case gc:
      case bc:
      case Sc:
      case Cc:
      case Ec:
      case Tc:
      case Rc:
      case xc:
      case Fr:
      case Dc:
      case Oc:
      case Mc:
      case Uc:
        a = ki;
        break;
      case Wa:
        a = Bi;
        break;
      default:
        a = $e;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== $e ? $e : a;
  }
  function vh(e, t, n) {
    if (rn)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = wc(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function ph(e, t) {
    if (rn)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = wc(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var o = u.alternate;
          (o === null || !a.has(o)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function hh(e, t) {
    return null;
  }
  var Nt = F, Zn = Kn, Jn = xn, Uu = Wa, qi = $e;
  function ln() {
    return qi;
  }
  function qe(e) {
    qi = e;
  }
  function lE(e, t) {
    var n = qi;
    try {
      return qi = e, t();
    } finally {
      qi = n;
    }
  }
  function uE(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function oE(e, t) {
    return e > t ? e : t;
  }
  function Nc(e, t) {
    return e !== 0 && e < t;
  }
  function mh(e) {
    var t = Ia(e);
    return Nc(Nt, t) ? Nc(Zn, t) ? _c(t) ? Jn : Uu : Zn : Nt;
  }
  function Lu(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var yh;
  function sE(e) {
    yh = e;
  }
  function cE(e) {
    yh(e);
  }
  var Hc;
  function fE(e) {
    Hc = e;
  }
  var gh;
  function dE(e) {
    gh = e;
  }
  var bh;
  function vE(e) {
    bh = e;
  }
  var Sh;
  function pE(e) {
    Sh = e;
  }
  var kc = !1, _u = [], ma = null, ya = null, ga = null, Gi = /* @__PURE__ */ new Map(), Qi = /* @__PURE__ */ new Map(), ba = [], hE = [
    "mousedown",
    "mouseup",
    "touchcancel",
    "touchend",
    "touchstart",
    "auxclick",
    "dblclick",
    "pointercancel",
    "pointerdown",
    "pointerup",
    "dragend",
    "dragstart",
    "drop",
    "compositionend",
    "compositionstart",
    "keydown",
    "keypress",
    "keyup",
    "input",
    "textInput",
    // Intentionally camelCase
    "copy",
    "cut",
    "paste",
    "click",
    "change",
    "contextmenu",
    "reset",
    "submit"
  ];
  function mE(e) {
    return hE.indexOf(e) > -1;
  }
  function yE(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Ch(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ma = null;
        break;
      case "dragenter":
      case "dragleave":
        ya = null;
        break;
      case "mouseover":
      case "mouseout":
        ga = null;
        break;
      case "pointerover":
      case "pointerout": {
        var n = t.pointerId;
        Gi.delete(n);
        break;
      }
      case "gotpointercapture":
      case "lostpointercapture": {
        var a = t.pointerId;
        Qi.delete(a);
        break;
      }
    }
  }
  function Xi(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var l = yE(t, n, a, r, i);
      if (t !== null) {
        var u = Ea(t);
        u !== null && Hc(u);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var o = e.targetContainers;
    return r !== null && o.indexOf(r) === -1 && o.push(r), e;
  }
  function gE(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return ma = Xi(ma, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return ya = Xi(ya, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var u = r;
        return ga = Xi(ga, e, t, n, a, u), !0;
      }
      case "pointerover": {
        var o = r, s = o.pointerId;
        return Gi.set(s, Xi(Gi.get(s) || null, e, t, n, a, o)), !0;
      }
      case "gotpointercapture": {
        var c = r, v = c.pointerId;
        return Qi.set(v, Xi(Qi.get(v) || null, e, t, n, a, c)), !0;
      }
    }
    return !1;
  }
  function Eh(e) {
    var t = nr(e.target);
    if (t !== null) {
      var n = Ka(t);
      if (n !== null) {
        var a = n.tag;
        if (a === ce) {
          var r = Qp(n);
          if (r !== null) {
            e.blockedOn = r, Sh(e.priority, function() {
              gh(n);
            });
            return;
          }
        } else if (a === B) {
          var i = n.stateNode;
          if (Lu(i)) {
            e.blockedOn = Xp(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function bE(e) {
    for (var t = bh(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < ba.length && Nc(t, ba[a].priority); a++)
      ;
    ba.splice(a, 0, n), a === 0 && Eh(n);
  }
  function wu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Bc(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        QS(i), r.target.dispatchEvent(i), XS();
      } else {
        var l = Ea(a);
        return l !== null && Hc(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Th(e, t, n) {
    wu(e) && n.delete(t);
  }
  function SE() {
    kc = !1, ma !== null && wu(ma) && (ma = null), ya !== null && wu(ya) && (ya = null), ga !== null && wu(ga) && (ga = null), Gi.forEach(Th), Qi.forEach(Th);
  }
  function Ki(e, t) {
    e.blockedOn === t && (e.blockedOn = null, kc || (kc = !0, Fe.unstable_scheduleCallback(Fe.unstable_NormalPriority, SE)));
  }
  function Zi(e) {
    if (_u.length > 0) {
      Ki(_u[0], e);
      for (var t = 1; t < _u.length; t++) {
        var n = _u[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    ma !== null && Ki(ma, e), ya !== null && Ki(ya, e), ga !== null && Ki(ga, e);
    var a = function(u) {
      return Ki(u, e);
    };
    Gi.forEach(a), Qi.forEach(a);
    for (var r = 0; r < ba.length; r++) {
      var i = ba[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; ba.length > 0; ) {
      var l = ba[0];
      if (l.blockedOn !== null)
        break;
      Eh(l), l.blockedOn === null && ba.shift();
    }
  }
  var Br = Re.ReactCurrentBatchConfig, Fc = !0;
  function Rh(e) {
    Fc = !!e;
  }
  function CE() {
    return Fc;
  }
  function EE(e, t, n) {
    var a = xh(t), r;
    switch (a) {
      case Nt:
        r = TE;
        break;
      case Zn:
        r = RE;
        break;
      case Jn:
      default:
        r = Vc;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function TE(e, t, n, a) {
    var r = ln(), i = Br.transition;
    Br.transition = null;
    try {
      qe(Nt), Vc(e, t, n, a);
    } finally {
      qe(r), Br.transition = i;
    }
  }
  function RE(e, t, n, a) {
    var r = ln(), i = Br.transition;
    Br.transition = null;
    try {
      qe(Zn), Vc(e, t, n, a);
    } finally {
      qe(r), Br.transition = i;
    }
  }
  function Vc(e, t, n, a) {
    Fc && xE(e, t, n, a);
  }
  function xE(e, t, n, a) {
    var r = Bc(e, t, n, a);
    if (r === null) {
      ef(e, t, a, Au, n), Ch(e, a);
      return;
    }
    if (gE(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Ch(e, a), t & Li && mE(e)) {
      for (; r !== null; ) {
        var i = Ea(r);
        i !== null && cE(i);
        var l = Bc(e, t, n, a);
        if (l === null && ef(e, t, a, Au, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    ef(e, t, a, null, n);
  }
  var Au = null;
  function Bc(e, t, n, a) {
    Au = null;
    var r = Qs(a), i = nr(r);
    if (i !== null) {
      var l = Ka(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === ce) {
          var o = Qp(l);
          if (o !== null)
            return o;
          i = null;
        } else if (u === B) {
          var s = l.stateNode;
          if (Lu(s))
            return Xp(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Au = i, null;
  }
  function xh(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return Nt;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return Zn;
      case "message": {
        var t = mC();
        switch (t) {
          case Eu:
            return Nt;
          case uc:
            return Zn;
          case Za:
          case yC:
            return Jn;
          case oc:
            return Uu;
          default:
            return Jn;
        }
      }
      default:
        return Jn;
    }
  }
  function DE(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function OE(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function ME(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function UE(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Ji = null, jc = null, Wi = null;
  function LE(e) {
    return Ji = e, jc = Oh(), !0;
  }
  function _E() {
    Ji = null, jc = null, Wi = null;
  }
  function Dh() {
    if (Wi)
      return Wi;
    var e, t = jc, n = t.length, a, r = Oh(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return Wi = r.slice(e, u), Wi;
  }
  function Oh() {
    return "value" in Ji ? Ji.value : Ji.textContent;
  }
  function zu(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function Nu() {
    return !0;
  }
  function Mh() {
    return !1;
  }
  function Ht(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var u in e)
        if (e.hasOwnProperty(u)) {
          var o = e[u];
          o ? this[u] = o(i) : this[u] = i[u];
        }
      var s = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return s ? this.isDefaultPrevented = Nu : this.isDefaultPrevented = Mh, this.isPropagationStopped = Mh, this;
    }
    return J(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Nu);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Nu);
      },
      /**
       * We release all dispatched `SyntheticEvent`s after each event loop, adding
       * them back into the pool. This allows a way to hold onto a reference that
       * won't be added back into the pool.
       */
      persist: function() {
      },
      /**
       * Checks if this event should be released back into the pool.
       *
       * @return {boolean} True if this should not be released, false otherwise.
       */
      isPersistent: Nu
    }), t;
  }
  var jr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Yc = Ht(jr), Ii = J({}, jr, {
    view: 0,
    detail: 0
  }), wE = Ht(Ii), $c, qc, Pi;
  function AE(e) {
    e !== Pi && (Pi && e.type === "mousemove" ? ($c = e.screenX - Pi.screenX, qc = e.screenY - Pi.screenY) : ($c = 0, qc = 0), Pi = e);
  }
  var Hu = J({}, Ii, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Qc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (AE(e), $c);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : qc;
    }
  }), Uh = Ht(Hu), zE = J({}, Hu, {
    dataTransfer: 0
  }), NE = Ht(zE), HE = J({}, Ii, {
    relatedTarget: 0
  }), Gc = Ht(HE), kE = J({}, jr, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), FE = Ht(kE), VE = J({}, jr, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), BE = Ht(VE), jE = J({}, jr, {
    data: 0
  }), Lh = Ht(jE), YE = Lh, $E = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, qE = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  };
  function GE(e) {
    if (e.key) {
      var t = $E[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = zu(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? qE[e.keyCode] || "Unidentified" : "";
  }
  var QE = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function XE(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = QE[e];
    return a ? !!n[a] : !1;
  }
  function Qc(e) {
    return XE;
  }
  var KE = J({}, Ii, {
    key: GE,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Qc,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? zu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? zu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), ZE = Ht(KE), JE = J({}, Hu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), _h = Ht(JE), WE = J({}, Ii, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qc
  }), IE = Ht(WE), PE = J({}, jr, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eT = Ht(PE), tT = J({}, Hu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : (
        // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
        "wheelDeltaX" in e ? -e.wheelDeltaX : 0
      );
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : (
        // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
        "wheelDeltaY" in e ? -e.wheelDeltaY : (
          // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
          "wheelDelta" in e ? -e.wheelDelta : 0
        )
      );
    },
    deltaZ: 0,
    // Browsers without "deltaMode" is reporting in raw wheel delta where one
    // notch on the scroll is always +/- 120, roughly equivalent to pixels.
    // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
    // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
    deltaMode: 0
  }), nT = Ht(tT), aT = [9, 13, 27, 32], wh = 229, Xc = _t && "CompositionEvent" in window, el = null;
  _t && "documentMode" in document && (el = document.documentMode);
  var rT = _t && "TextEvent" in window && !el, Ah = _t && (!Xc || el && el > 8 && el <= 11), zh = 32, Nh = String.fromCharCode(zh);
  function iT() {
    Fn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Fn("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Fn("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Fn("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var Hh = !1;
  function lT(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function uT(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function oT(e, t) {
    return e === "keydown" && t.keyCode === wh;
  }
  function kh(e, t) {
    switch (e) {
      case "keyup":
        return aT.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== wh;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Fh(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function Vh(e) {
    return e.locale === "ko";
  }
  var Yr = !1;
  function sT(e, t, n, a, r) {
    var i, l;
    if (Xc ? i = uT(t) : Yr ? kh(t, a) && (i = "onCompositionEnd") : oT(t, a) && (i = "onCompositionStart"), !i)
      return null;
    Ah && !Vh(a) && (!Yr && i === "onCompositionStart" ? Yr = LE(r) : i === "onCompositionEnd" && Yr && (l = Dh()));
    var u = ju(n, i);
    if (u.length > 0) {
      var o = new Lh(i, t, null, a, r);
      if (e.push({
        event: o,
        listeners: u
      }), l)
        o.data = l;
      else {
        var s = Fh(a);
        s !== null && (o.data = s);
      }
    }
  }
  function cT(e, t) {
    switch (e) {
      case "compositionend":
        return Fh(t);
      case "keypress":
        var n = t.which;
        return n !== zh ? null : (Hh = !0, Nh);
      case "textInput":
        var a = t.data;
        return a === Nh && Hh ? null : a;
      default:
        return null;
    }
  }
  function fT(e, t) {
    if (Yr) {
      if (e === "compositionend" || !Xc && kh(e, t)) {
        var n = Dh();
        return _E(), Yr = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!lT(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ah && !Vh(t) ? null : t.data;
      default:
        return null;
    }
  }
  function dT(e, t, n, a, r) {
    var i;
    if (rT ? i = cT(t, a) : i = fT(t, a), !i)
      return null;
    var l = ju(n, "onBeforeInput");
    if (l.length > 0) {
      var u = new YE("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: u,
        listeners: l
      }), u.data = i;
    }
  }
  function vT(e, t, n, a, r, i, l) {
    sT(e, t, n, a, r), dT(e, t, n, a, r);
  }
  var pT = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Bh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!pT[e.type] : t === "textarea";
  }
  /**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   */
  function hT(e) {
    if (!_t)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function mT() {
    Fn("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function jh(e, t, n, a) {
    kp(a);
    var r = ju(t, "onChange");
    if (r.length > 0) {
      var i = new Yc("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var tl = null, nl = null;
  function yT(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function gT(e) {
    var t = [];
    jh(t, nl, e, Qs(e)), jp(bT, t);
  }
  function bT(e) {
    im(e, 0);
  }
  function ku(e) {
    var t = Kr(e);
    if (rp(t))
      return e;
  }
  function ST(e, t) {
    if (e === "change")
      return t;
  }
  var Yh = !1;
  _t && (Yh = hT("input") && (!document.documentMode || document.documentMode > 9));
  function CT(e, t) {
    tl = e, nl = t, tl.attachEvent("onpropertychange", qh);
  }
  function $h() {
    tl && (tl.detachEvent("onpropertychange", qh), tl = null, nl = null);
  }
  function qh(e) {
    e.propertyName === "value" && ku(nl) && gT(e);
  }
  function ET(e, t, n) {
    e === "focusin" ? ($h(), CT(t, n)) : e === "focusout" && $h();
  }
  function TT(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ku(nl);
  }
  function RT(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function xT(e, t) {
    if (e === "click")
      return ku(t);
  }
  function DT(e, t) {
    if (e === "input" || e === "change")
      return ku(t);
  }
  function OT(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || zs(e, "number", e.value);
  }
  function MT(e, t, n, a, r, i, l) {
    var u = n ? Kr(n) : window, o, s;
    if (yT(u) ? o = ST : Bh(u) ? Yh ? o = DT : (o = TT, s = ET) : RT(u) && (o = xT), o) {
      var c = o(t, n);
      if (c) {
        jh(e, c, a, r);
        return;
      }
    }
    s && s(t, u, n), t === "focusout" && OT(u);
  }
  function UT() {
    ca("onMouseEnter", ["mouseout", "mouseover"]), ca("onMouseLeave", ["mouseout", "mouseover"]), ca("onPointerEnter", ["pointerout", "pointerover"]), ca("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function LT(e, t, n, a, r, i, l) {
    var u = t === "mouseover" || t === "pointerover", o = t === "mouseout" || t === "pointerout";
    if (u && !KS(a)) {
      var s = a.relatedTarget || a.fromElement;
      if (s && (nr(s) || yl(s)))
        return;
    }
    if (!(!o && !u)) {
      var c;
      if (r.window === r)
        c = r;
      else {
        var v = r.ownerDocument;
        v ? c = v.defaultView || v.parentWindow : c = window;
      }
      var d, m;
      if (o) {
        var y = a.relatedTarget || a.toElement;
        if (d = n, m = y ? nr(y) : null, m !== null) {
          var g = Ka(m);
          (m !== g || m.tag !== z && m.tag !== pe) && (m = null);
        }
      } else
        d = null, m = n;
      if (d !== m) {
        var R = Uh, w = "onMouseLeave", _ = "onMouseEnter", Z = "mouse";
        (t === "pointerout" || t === "pointerover") && (R = _h, w = "onPointerLeave", _ = "onPointerEnter", Z = "pointer");
        var G = d == null ? c : Kr(d), p = m == null ? c : Kr(m), b = new R(w, Z + "leave", d, a, r);
        b.target = G, b.relatedTarget = p;
        var h = null, E = nr(r);
        if (E === n) {
          var U = new R(_, Z + "enter", m, a, r);
          U.target = p, U.relatedTarget = G, h = U;
        }
        eR(e, b, h, d, m);
      }
    }
  }
  function _T(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var kt = typeof Object.is == "function" ? Object.is : _T;
  function al(e, t) {
    if (kt(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Vn.call(t, i) || !kt(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function Gh(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function wT(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function Qh(e, t) {
    for (var n = Gh(e), a = 0, r = 0; n; ) {
      if (n.nodeType === $n) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = Gh(wT(n));
    }
  }
  function AT(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, u = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return zT(e, r, i, l, u);
  }
  function zT(e, t, n, a, r) {
    var i = 0, l = -1, u = -1, o = 0, s = 0, c = e, v = null;
    e: for (; ; ) {
      for (var d = null; c === t && (n === 0 || c.nodeType === $n) && (l = i + n), c === a && (r === 0 || c.nodeType === $n) && (u = i + r), c.nodeType === $n && (i += c.nodeValue.length), (d = c.firstChild) !== null; )
        v = c, c = d;
      for (; ; ) {
        if (c === e)
          break e;
        if (v === t && ++o === n && (l = i), v === a && ++s === r && (u = i), (d = c.nextSibling) !== null)
          break;
        c = v, v = c.parentNode;
      }
      c = d;
    }
    return l === -1 || u === -1 ? null : {
      start: l,
      end: u
    };
  }
  function NT(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), u = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > u) {
        var o = u;
        u = l, l = o;
      }
      var s = Qh(e, l), c = Qh(e, u);
      if (s && c) {
        if (r.rangeCount === 1 && r.anchorNode === s.node && r.anchorOffset === s.offset && r.focusNode === c.node && r.focusOffset === c.offset)
          return;
        var v = n.createRange();
        v.setStart(s.node, s.offset), r.removeAllRanges(), l > u ? (r.addRange(v), r.extend(c.node, c.offset)) : (v.setEnd(c.node, c.offset), r.addRange(v));
      }
    }
  }
  function Xh(e) {
    return e && e.nodeType === $n;
  }
  function Kh(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Xh(e) ? !1 : Xh(t) ? Kh(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function HT(e) {
    return e && e.ownerDocument && Kh(e.ownerDocument.documentElement, e);
  }
  function kT(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function Zh() {
    for (var e = window, t = hu(); t instanceof e.HTMLIFrameElement; ) {
      if (kT(t))
        e = t.contentWindow;
      else
        return t;
      t = hu(e.document);
    }
    return t;
  }
  function Kc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function FT() {
    var e = Zh();
    return {
      focusedElem: e,
      selectionRange: Kc(e) ? BT(e) : null
    };
  }
  function VT(e) {
    var t = Zh(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && HT(n)) {
      a !== null && Kc(n) && jT(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === Et && r.push({
          element: i,
          left: i.scrollLeft,
          top: i.scrollTop
        });
      typeof n.focus == "function" && n.focus();
      for (var l = 0; l < r.length; l++) {
        var u = r[l];
        u.element.scrollLeft = u.left, u.element.scrollTop = u.top;
      }
    }
  }
  function BT(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = AT(e), t || {
      start: 0,
      end: 0
    };
  }
  function jT(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : NT(e, t);
  }
  var YT = _t && "documentMode" in document && document.documentMode <= 11;
  function $T() {
    Fn("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var $r = null, Zc = null, rl = null, Jc = !1;
  function qT(e) {
    if ("selectionStart" in e && Kc(e))
      return {
        start: e.selectionStart,
        end: e.selectionEnd
      };
    var t = e.ownerDocument && e.ownerDocument.defaultView || window, n = t.getSelection();
    return {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    };
  }
  function GT(e) {
    return e.window === e ? e.document : e.nodeType === qn ? e : e.ownerDocument;
  }
  function Jh(e, t, n) {
    var a = GT(n);
    if (!(Jc || $r == null || $r !== hu(a))) {
      var r = qT($r);
      if (!rl || !al(rl, r)) {
        rl = r;
        var i = ju(Zc, "onSelect");
        if (i.length > 0) {
          var l = new Yc("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = $r;
        }
      }
    }
  }
  function QT(e, t, n, a, r, i, l) {
    var u = n ? Kr(n) : window;
    switch (t) {
      case "focusin":
        (Bh(u) || u.contentEditable === "true") && ($r = u, Zc = n, rl = null);
        break;
      case "focusout":
        $r = null, Zc = null, rl = null;
        break;
      case "mousedown":
        Jc = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        Jc = !1, Jh(e, a, r);
        break;
      case "selectionchange":
        if (YT)
          break;
      case "keydown":
      case "keyup":
        Jh(e, a, r);
    }
  }
  function Fu(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var qr = {
    animationend: Fu("Animation", "AnimationEnd"),
    animationiteration: Fu("Animation", "AnimationIteration"),
    animationstart: Fu("Animation", "AnimationStart"),
    transitionend: Fu("Transition", "TransitionEnd")
  }, Wc = {}, Wh = {};
  _t && (Wh = document.createElement("div").style, "AnimationEvent" in window || (delete qr.animationend.animation, delete qr.animationiteration.animation, delete qr.animationstart.animation), "TransitionEvent" in window || delete qr.transitionend.transition);
  function Vu(e) {
    if (Wc[e])
      return Wc[e];
    if (!qr[e])
      return e;
    var t = qr[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Wh)
        return Wc[e] = t[n];
    return e;
  }
  var Ih = Vu("animationend"), Ph = Vu("animationiteration"), em = Vu("animationstart"), tm = Vu("transitionend"), nm = /* @__PURE__ */ new Map(), am = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Sa(e, t) {
    nm.set(e, t), Fn(t, [e]);
  }
  function XT() {
    for (var e = 0; e < am.length; e++) {
      var t = am[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Sa(n, "on" + a);
    }
    Sa(Ih, "onAnimationEnd"), Sa(Ph, "onAnimationIteration"), Sa(em, "onAnimationStart"), Sa("dblclick", "onDoubleClick"), Sa("focusin", "onFocus"), Sa("focusout", "onBlur"), Sa(tm, "onTransitionEnd");
  }
  function KT(e, t, n, a, r, i, l) {
    var u = nm.get(t);
    if (u !== void 0) {
      var o = Yc, s = t;
      switch (t) {
        case "keypress":
          if (zu(a) === 0)
            return;
        case "keydown":
        case "keyup":
          o = ZE;
          break;
        case "focusin":
          s = "focus", o = Gc;
          break;
        case "focusout":
          s = "blur", o = Gc;
          break;
        case "beforeblur":
        case "afterblur":
          o = Gc;
          break;
        case "click":
          if (a.button === 2)
            return;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          o = Uh;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          o = NE;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          o = IE;
          break;
        case Ih:
        case Ph:
        case em:
          o = FE;
          break;
        case tm:
          o = eT;
          break;
        case "scroll":
          o = wE;
          break;
        case "wheel":
          o = nT;
          break;
        case "copy":
        case "cut":
        case "paste":
          o = BE;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          o = _h;
          break;
      }
      var c = (i & Li) !== 0;
      {
        var v = !c && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", d = IT(n, u, a.type, c, v);
        if (d.length > 0) {
          var m = new o(u, s, null, a, r);
          e.push({
            event: m,
            listeners: d
          });
        }
      }
    }
  }
  XT(), UT(), mT(), $T(), iT();
  function ZT(e, t, n, a, r, i, l) {
    KT(e, t, n, a, r, i);
    var u = (i & GS) === 0;
    u && (LT(e, t, n, a, r), MT(e, t, n, a, r), QT(e, t, n, a, r), vT(e, t, n, a, r));
  }
  var il = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Ic = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(il));
  function rm(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, aC(a, t, void 0, e), e.currentTarget = null;
  }
  function JT(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, u = i.currentTarget, o = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        rm(e, o, u), a = l;
      }
    else
      for (var s = 0; s < t.length; s++) {
        var c = t[s], v = c.instance, d = c.currentTarget, m = c.listener;
        if (v !== a && e.isPropagationStopped())
          return;
        rm(e, m, d), a = v;
      }
  }
  function im(e, t) {
    for (var n = (t & Li) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      JT(i, l, n);
    }
    rC();
  }
  function WT(e, t, n, a, r) {
    var i = Qs(n), l = [];
    ZT(l, e, a, n, i, t), im(l, t);
  }
  function ye(e, t) {
    Ic.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = Ox(t), r = tR(e);
    a.has(r) || (lm(t, e, Gs, n), a.add(r));
  }
  function Pc(e, t, n) {
    Ic.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Li), lm(n, e, a, t);
  }
  var Bu = "_reactListening" + Math.random().toString(36).slice(2);
  function ll(e) {
    if (!e[Bu]) {
      e[Bu] = !0, lu.forEach(function(n) {
        n !== "selectionchange" && (Ic.has(n) || Pc(n, !1, e), Pc(n, !0, e));
      });
      var t = e.nodeType === qn ? e : e.ownerDocument;
      t !== null && (t[Bu] || (t[Bu] = !0, Pc("selectionchange", !1, t)));
    }
  }
  function lm(e, t, n, a, r) {
    var i = EE(e, t, n), l = void 0;
    Zs && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? ME(e, t, i, l) : OE(e, t, i) : l !== void 0 ? UE(e, t, i, l) : DE(e, t, i);
  }
  function um(e, t) {
    return e === t || e.nodeType === De && e.parentNode === t;
  }
  function ef(e, t, n, a, r) {
    var i = a;
    if (!(t & Np) && !(t & Gs)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var o = u.tag;
          if (o === B || o === oe) {
            var s = u.stateNode.containerInfo;
            if (um(s, l))
              break;
            if (o === oe)
              for (var c = u.return; c !== null; ) {
                var v = c.tag;
                if (v === B || v === oe) {
                  var d = c.stateNode.containerInfo;
                  if (um(d, l))
                    return;
                }
                c = c.return;
              }
            for (; s !== null; ) {
              var m = nr(s);
              if (m === null)
                return;
              var y = m.tag;
              if (y === z || y === pe) {
                u = i = m;
                continue e;
              }
              s = s.parentNode;
            }
          }
          u = u.return;
        }
      }
    }
    jp(function() {
      return WT(e, t, n, i);
    });
  }
  function ul(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function IT(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, u = a ? l : t, o = [], s = e, c = null; s !== null; ) {
      var v = s, d = v.stateNode, m = v.tag;
      if (m === z && d !== null && (c = d, u !== null)) {
        var y = wi(s, u);
        y != null && o.push(ul(s, y, c));
      }
      if (r)
        break;
      s = s.return;
    }
    return o;
  }
  function ju(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, u = i.tag;
      if (u === z && l !== null) {
        var o = l, s = wi(r, n);
        s != null && a.unshift(ul(r, s, o));
        var c = wi(r, t);
        c != null && a.push(ul(r, c, o));
      }
      r = r.return;
    }
    return a;
  }
  function Gr(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== z);
    return e || null;
  }
  function PT(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Gr(i))
      r++;
    for (var l = 0, u = a; u; u = Gr(u))
      l++;
    for (; r - l > 0; )
      n = Gr(n), r--;
    for (; l - r > 0; )
      a = Gr(a), l--;
    for (var o = r; o--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Gr(n), a = Gr(a);
    }
    return null;
  }
  function om(e, t, n, a, r) {
    for (var i = t._reactName, l = [], u = n; u !== null && u !== a; ) {
      var o = u, s = o.alternate, c = o.stateNode, v = o.tag;
      if (s !== null && s === a)
        break;
      if (v === z && c !== null) {
        var d = c;
        if (r) {
          var m = wi(u, i);
          m != null && l.unshift(ul(u, m, d));
        } else if (!r) {
          var y = wi(u, i);
          y != null && l.push(ul(u, y, d));
        }
      }
      u = u.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function eR(e, t, n, a, r) {
    var i = a && r ? PT(a, r) : null;
    a !== null && om(e, t, a, i, !1), r !== null && n !== null && om(e, n, r, i, !0);
  }
  function tR(e, t) {
    return e + "__bubble";
  }
  var Tt = !1, ol = "dangerouslySetInnerHTML", Yu = "suppressContentEditableWarning", Ca = "suppressHydrationWarning", sm = "autoFocus", er = "children", tr = "style", $u = "__html", tf, qu, sl, cm, Gu, fm, dm;
  tf = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, qu = function(e, t) {
    FS(e, t), VS(e, t), qS(e, t, {
      registrationNameDependencies: kn,
      possibleRegistrationNames: Ei
    });
  }, fm = _t && !document.documentMode, sl = function(e, t, n) {
    if (!Tt) {
      var a = Qu(n), r = Qu(t);
      r !== a && (Tt = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, cm = function(e) {
    if (!Tt) {
      Tt = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, Gu = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, dm = function(e, t) {
    var n = e.namespaceURI === Yn ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var nR = /\r\n?/g, aR = /\u0000|\uFFFD/g;
  function Qu(e) {
    ys(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(nR, `
`).replace(aR, "");
  }
  function Xu(e, t, n, a) {
    var r = Qu(t), i = Qu(e);
    if (i !== r && (a && (Tt || (Tt = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && ru))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function vm(e) {
    return e.nodeType === qn ? e : e.ownerDocument;
  }
  function rR() {
  }
  function Ku(e) {
    e.onclick = rR;
  }
  function iR(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === tr)
          l && Object.freeze(l), Up(t, l);
        else if (i === ol) {
          var u = l ? l[$u] : void 0;
          u != null && Rp(t, u);
        } else if (i === er)
          if (typeof l == "string") {
            var o = e !== "textarea" || l !== "";
            o && yu(t, l);
          } else typeof l == "number" && yu(t, "" + l);
        else i === Yu || i === Ca || i === sm || (kn.hasOwnProperty(i) ? l != null && (typeof l != "function" && Gu(i, l), i === "onScroll" && ye("scroll", t)) : l != null && Ss(t, i, l, r));
      }
  }
  function lR(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === tr ? Up(e, l) : i === ol ? Rp(e, l) : i === er ? yu(e, l) : Ss(e, i, l, a);
    }
  }
  function uR(e, t, n, a) {
    var r, i = vm(n), l, u = a;
    if (u === Yn && (u = Vs(e)), u === Yn) {
      if (r = $a(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var o = i.createElement("div");
        o.innerHTML = "<script><\/script>";
        var s = o.firstChild;
        l = o.removeChild(s);
      } else if (typeof t.is == "string")
        l = i.createElement(e, {
          is: t.is
        });
      else if (l = i.createElement(e), e === "select") {
        var c = l;
        t.multiple ? c.multiple = !0 : t.size && (c.size = t.size);
      }
    } else
      l = i.createElementNS(u, e);
    return u === Yn && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Vn.call(tf, e) && (tf[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function oR(e, t) {
    return vm(t).createTextNode(e);
  }
  function sR(e, t, n, a) {
    var r = $a(t, n);
    qu(t, n);
    var i;
    switch (t) {
      case "dialog":
        ye("cancel", e), ye("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        ye("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < il.length; l++)
          ye(il[l], e);
        i = n;
        break;
      case "source":
        ye("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        ye("error", e), ye("load", e), i = n;
        break;
      case "details":
        ye("toggle", e), i = n;
        break;
      case "input":
        cp(e, n), i = ws(e, n), ye("invalid", e);
        break;
      case "option":
        mp(e, n), i = n;
        break;
      case "select":
        bp(e, n), i = Hs(e, n), ye("invalid", e);
        break;
      case "textarea":
        Cp(e, n), i = ks(e, n), ye("invalid", e);
        break;
      default:
        i = n;
    }
    switch (qs(t, i), iR(t, e, a, i, r), t) {
      case "input":
        pu(e), dp(e, n, !1);
        break;
      case "textarea":
        pu(e), Tp(e);
        break;
      case "option":
        aS(e, n);
        break;
      case "select":
        lS(e, n);
        break;
      default:
        typeof i.onClick == "function" && Ku(e);
        break;
    }
  }
  function cR(e, t, n, a, r) {
    qu(t, a);
    var i = null, l, u;
    switch (t) {
      case "input":
        l = ws(e, n), u = ws(e, a), i = [];
        break;
      case "select":
        l = Hs(e, n), u = Hs(e, a), i = [];
        break;
      case "textarea":
        l = ks(e, n), u = ks(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Ku(e);
        break;
    }
    qs(t, u);
    var o, s, c = null;
    for (o in l)
      if (!(u.hasOwnProperty(o) || !l.hasOwnProperty(o) || l[o] == null))
        if (o === tr) {
          var v = l[o];
          for (s in v)
            v.hasOwnProperty(s) && (c || (c = {}), c[s] = "");
        } else o === ol || o === er || o === Yu || o === Ca || o === sm || (kn.hasOwnProperty(o) ? i || (i = []) : (i = i || []).push(o, null));
    for (o in u) {
      var d = u[o], m = l != null ? l[o] : void 0;
      if (!(!u.hasOwnProperty(o) || d === m || d == null && m == null))
        if (o === tr)
          if (d && Object.freeze(d), m) {
            for (s in m)
              m.hasOwnProperty(s) && (!d || !d.hasOwnProperty(s)) && (c || (c = {}), c[s] = "");
            for (s in d)
              d.hasOwnProperty(s) && m[s] !== d[s] && (c || (c = {}), c[s] = d[s]);
          } else
            c || (i || (i = []), i.push(o, c)), c = d;
        else if (o === ol) {
          var y = d ? d[$u] : void 0, g = m ? m[$u] : void 0;
          y != null && g !== y && (i = i || []).push(o, y);
        } else o === er ? (typeof d == "string" || typeof d == "number") && (i = i || []).push(o, "" + d) : o === Yu || o === Ca || (kn.hasOwnProperty(o) ? (d != null && (typeof d != "function" && Gu(o, d), o === "onScroll" && ye("scroll", e)), !i && m !== d && (i = [])) : (i = i || []).push(o, d));
    }
    return c && (LS(c, u[tr]), (i = i || []).push(tr, c)), i;
  }
  function fR(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && fp(e, r);
    var i = $a(n, a), l = $a(n, r);
    switch (lR(e, t, i, l), n) {
      case "input":
        As(e, r);
        break;
      case "textarea":
        Ep(e, r);
        break;
      case "select":
        uS(e, r);
        break;
    }
  }
  function dR(e) {
    {
      var t = e.toLowerCase();
      return gu.hasOwnProperty(t) && gu[t] || null;
    }
  }
  function vR(e, t, n, a, r, i, l) {
    var u, o;
    switch (u = $a(t, n), qu(t, n), t) {
      case "dialog":
        ye("cancel", e), ye("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ye("load", e);
        break;
      case "video":
      case "audio":
        for (var s = 0; s < il.length; s++)
          ye(il[s], e);
        break;
      case "source":
        ye("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ye("error", e), ye("load", e);
        break;
      case "details":
        ye("toggle", e);
        break;
      case "input":
        cp(e, n), ye("invalid", e);
        break;
      case "option":
        mp(e, n);
        break;
      case "select":
        bp(e, n), ye("invalid", e);
        break;
      case "textarea":
        Cp(e, n), ye("invalid", e);
        break;
    }
    qs(t, n);
    {
      o = /* @__PURE__ */ new Set();
      for (var c = e.attributes, v = 0; v < c.length; v++) {
        var d = c[v].name.toLowerCase();
        switch (d) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            o.add(c[v].name);
        }
      }
    }
    var m = null;
    for (var y in n)
      if (n.hasOwnProperty(y)) {
        var g = n[y];
        if (y === er)
          typeof g == "string" ? e.textContent !== g && (n[Ca] !== !0 && Xu(e.textContent, g, i, l), m = [er, g]) : typeof g == "number" && e.textContent !== "" + g && (n[Ca] !== !0 && Xu(e.textContent, g, i, l), m = [er, "" + g]);
        else if (kn.hasOwnProperty(y))
          g != null && (typeof g != "function" && Gu(y, g), y === "onScroll" && ye("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var R = void 0, w = Be(y);
          if (n[Ca] !== !0) {
            if (!(y === Yu || y === Ca || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            y === "value" || y === "checked" || y === "selected")) {
              if (y === ol) {
                var _ = e.innerHTML, Z = g ? g[$u] : void 0;
                if (Z != null) {
                  var G = dm(e, Z);
                  G !== _ && sl(y, _, G);
                }
              } else if (y === tr) {
                if (o.delete(y), fm) {
                  var p = MS(g);
                  R = e.getAttribute("style"), p !== R && sl(y, R, p);
                }
              } else if (u && !Sr)
                o.delete(y.toLowerCase()), R = jv(e, y, g), g !== R && sl(y, R, g);
              else if (!Ct(y, w, u) && !qt(y, g, w, u)) {
                var b = !1;
                if (w !== null)
                  o.delete(w.attributeName), R = zb(e, y, g, w);
                else {
                  var h = a;
                  if (h === Yn && (h = Vs(t)), h === Yn)
                    o.delete(y.toLowerCase());
                  else {
                    var E = dR(y);
                    E !== null && E !== y && (b = !0, o.delete(E)), o.delete(y);
                  }
                  R = jv(e, y, g);
                }
                var U = Sr;
                !U && g !== R && !b && sl(y, R, g);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    o.size > 0 && n[Ca] !== !0 && cm(o), t) {
      case "input":
        pu(e), dp(e, n, !0);
        break;
      case "textarea":
        pu(e), Tp(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Ku(e);
        break;
    }
    return m;
  }
  function pR(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function nf(e, t) {
    {
      if (Tt)
        return;
      Tt = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function af(e, t) {
    {
      if (Tt)
        return;
      Tt = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function rf(e, t, n) {
    {
      if (Tt)
        return;
      Tt = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function lf(e, t) {
    {
      if (t === "" || Tt)
        return;
      Tt = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function hR(e, t, n) {
    switch (t) {
      case "input":
        tS(e, n);
        return;
      case "textarea":
        sS(e, n);
        return;
      case "select":
        oS(e, n);
        return;
    }
  }
  var cl = function() {
  }, fl = function() {
  };
  {
    var mR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], pm = [
      "applet",
      "caption",
      "html",
      "table",
      "td",
      "th",
      "marquee",
      "object",
      "template",
      // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
      // TODO: Distinguish by namespace here -- for <title>, including it here
      // errs on the side of fewer warnings
      "foreignObject",
      "desc",
      "title"
    ], yR = pm.concat(["button"]), gR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], hm = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    fl = function(e, t) {
      var n = J({}, e || hm), a = {
        tag: t
      };
      return pm.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), yR.indexOf(t) !== -1 && (n.pTagInButtonScope = null), mR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var bR = function(e, t) {
      switch (t) {
        case "select":
          return e === "option" || e === "optgroup" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return gR.indexOf(t) === -1;
        case "body":
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "head":
        case "html":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
      }
      return !0;
    }, SR = function(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }, mm = {};
    cl = function(e, t, n) {
      n = n || hm;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = bR(e, r) ? null : a, l = i ? null : SR(e, n), u = i || l;
      if (u) {
        var o = u.tag, s = !!i + "|" + e + "|" + o;
        if (!mm[s]) {
          mm[s] = !0;
          var c = e, v = "";
          if (e === "#text" ? /\S/.test(t) ? c = "Text nodes" : (c = "Whitespace text nodes", v = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : c = "<" + e + ">", i) {
            var d = "";
            o === "table" && e === "tr" && (d += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", c, o, v, d);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", c, o);
        }
      }
    };
  }
  var Zu = "suppressHydrationWarning", Ju = "$", Wu = "/$", dl = "$?", vl = "$!", CR = "style", uf = null, of = null;
  function ER(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case qn:
      case js: {
        t = a === qn ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Bs(null, "");
        break;
      }
      default: {
        var i = a === De ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = Bs(l, t);
        break;
      }
    }
    {
      var u = t.toLowerCase(), o = fl(null, u);
      return {
        namespace: n,
        ancestorInfo: o
      };
    }
  }
  function TR(e, t, n) {
    {
      var a = e, r = Bs(a.namespace, t), i = fl(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function xM(e) {
    return e;
  }
  function RR(e) {
    uf = CE(), of = FT();
    var t = null;
    return Rh(!1), t;
  }
  function xR(e) {
    VT(of), Rh(uf), uf = null, of = null;
  }
  function DR(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (cl(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var u = "" + t.children, o = fl(l.ancestorInfo, e);
        cl(null, u, o);
      }
      i = l.namespace;
    }
    var s = uR(e, t, n, i);
    return ml(r, s), mf(s, t), s;
  }
  function OR(e, t) {
    e.appendChild(t);
  }
  function MR(e, t, n, a, r) {
    switch (sR(e, t, n, a), t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!n.autoFocus;
      case "img":
        return !0;
      default:
        return !1;
    }
  }
  function UR(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var u = "" + a.children, o = fl(l.ancestorInfo, t);
        cl(null, u, o);
      }
    }
    return cR(e, t, n, a);
  }
  function sf(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function LR(e, t, n, a) {
    {
      var r = n;
      cl(null, e, r.ancestorInfo);
    }
    var i = oR(e, t);
    return ml(a, i), i;
  }
  function _R() {
    var e = window.event;
    return e === void 0 ? Jn : xh(e.type);
  }
  var cf = typeof setTimeout == "function" ? setTimeout : void 0, wR = typeof clearTimeout == "function" ? clearTimeout : void 0, ff = -1, ym = typeof Promise == "function" ? Promise : void 0, AR = typeof queueMicrotask == "function" ? queueMicrotask : typeof ym < "u" ? function(e) {
    return ym.resolve(null).then(e).catch(zR);
  } : cf;
  function zR(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function NR(e, t, n, a) {
    switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n.autoFocus && e.focus();
        return;
      case "img": {
        n.src && (e.src = n.src);
        return;
      }
    }
  }
  function HR(e, t, n, a, r, i) {
    fR(e, t, n, a, r), mf(e, r);
  }
  function gm(e) {
    yu(e, "");
  }
  function kR(e, t, n) {
    e.nodeValue = n;
  }
  function FR(e, t) {
    e.appendChild(t);
  }
  function VR(e, t) {
    var n;
    e.nodeType === De ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function BR(e, t, n) {
    e.insertBefore(t, n);
  }
  function jR(e, t, n) {
    e.nodeType === De ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function YR(e, t) {
    e.removeChild(t);
  }
  function $R(e, t) {
    e.nodeType === De ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function df(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === De) {
        var i = r.data;
        if (i === Wu)
          if (a === 0) {
            e.removeChild(r), Zi(t);
            return;
          } else
            a--;
        else (i === Ju || i === dl || i === vl) && a++;
      }
      n = r;
    } while (n);
    Zi(t);
  }
  function qR(e, t) {
    e.nodeType === De ? df(e.parentNode, t) : e.nodeType === Et && df(e, t), Zi(e);
  }
  function GR(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function QR(e) {
    e.nodeValue = "";
  }
  function XR(e, t) {
    e = e;
    var n = t[CR], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Ys("display", a);
  }
  function KR(e, t) {
    e.nodeValue = t;
  }
  function ZR(e) {
    e.nodeType === Et ? e.textContent = "" : e.nodeType === qn && e.documentElement && e.removeChild(e.documentElement);
  }
  function JR(e, t, n) {
    return e.nodeType !== Et || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function WR(e, t) {
    return t === "" || e.nodeType !== $n ? null : e;
  }
  function IR(e) {
    return e.nodeType !== De ? null : e;
  }
  function bm(e) {
    return e.data === dl;
  }
  function vf(e) {
    return e.data === vl;
  }
  function PR(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function ex(e, t) {
    e._reactRetry = t;
  }
  function Iu(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === Et || t === $n)
        break;
      if (t === De) {
        var n = e.data;
        if (n === Ju || n === vl || n === dl)
          break;
        if (n === Wu)
          return null;
      }
    }
    return e;
  }
  function pl(e) {
    return Iu(e.nextSibling);
  }
  function tx(e) {
    return Iu(e.firstChild);
  }
  function nx(e) {
    return Iu(e.firstChild);
  }
  function ax(e) {
    return Iu(e.nextSibling);
  }
  function rx(e, t, n, a, r, i, l) {
    ml(i, e), mf(e, n);
    var u;
    {
      var o = r;
      u = o.namespace;
    }
    var s = (i.mode & X) !== A;
    return vR(e, t, n, u, a, s, l);
  }
  function ix(e, t, n, a) {
    return ml(n, e), n.mode & X, pR(e, t);
  }
  function lx(e, t) {
    ml(t, e);
  }
  function ux(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === De) {
        var a = t.data;
        if (a === Wu) {
          if (n === 0)
            return pl(t);
          n--;
        } else (a === Ju || a === vl || a === dl) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Sm(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === De) {
        var a = t.data;
        if (a === Ju || a === vl || a === dl) {
          if (n === 0)
            return t;
          n--;
        } else a === Wu && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function ox(e) {
    Zi(e);
  }
  function sx(e) {
    Zi(e);
  }
  function cx(e) {
    return e !== "head" && e !== "body";
  }
  function fx(e, t, n, a) {
    var r = !0;
    Xu(t.nodeValue, n, a, r);
  }
  function dx(e, t, n, a, r, i) {
    if (t[Zu] !== !0) {
      var l = !0;
      Xu(a.nodeValue, r, i, l);
    }
  }
  function vx(e, t) {
    t.nodeType === Et ? nf(e, t) : t.nodeType === De || af(e, t);
  }
  function px(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Et ? nf(n, t) : t.nodeType === De || af(n, t));
    }
  }
  function hx(e, t, n, a, r) {
    (r || t[Zu] !== !0) && (a.nodeType === Et ? nf(n, a) : a.nodeType === De || af(n, a));
  }
  function mx(e, t, n) {
    rf(e, t);
  }
  function yx(e, t) {
    lf(e, t);
  }
  function gx(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && rf(a, t);
    }
  }
  function bx(e, t) {
    {
      var n = e.parentNode;
      n !== null && lf(n, t);
    }
  }
  function Sx(e, t, n, a, r, i) {
    (i || t[Zu] !== !0) && rf(n, a);
  }
  function Cx(e, t, n, a, r) {
    (r || t[Zu] !== !0) && lf(n, a);
  }
  function Ex(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function Tx(e) {
    ll(e);
  }
  var Qr = Math.random().toString(36).slice(2), Xr = "__reactFiber$" + Qr, pf = "__reactProps$" + Qr, hl = "__reactContainer$" + Qr, hf = "__reactEvents$" + Qr, Rx = "__reactListeners$" + Qr, xx = "__reactHandles$" + Qr;
  function Dx(e) {
    delete e[Xr], delete e[pf], delete e[hf], delete e[Rx], delete e[xx];
  }
  function ml(e, t) {
    t[Xr] = e;
  }
  function Pu(e, t) {
    t[hl] = e;
  }
  function Cm(e) {
    e[hl] = null;
  }
  function yl(e) {
    return !!e[hl];
  }
  function nr(e) {
    var t = e[Xr];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[hl] || n[Xr], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = Sm(e); r !== null; ) {
            var i = r[Xr];
            if (i)
              return i;
            r = Sm(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Ea(e) {
    var t = e[Xr] || e[hl];
    return t && (t.tag === z || t.tag === pe || t.tag === ce || t.tag === B) ? t : null;
  }
  function Kr(e) {
    if (e.tag === z || e.tag === pe)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function eo(e) {
    return e[pf] || null;
  }
  function mf(e, t) {
    e[pf] = t;
  }
  function Ox(e) {
    var t = e[hf];
    return t === void 0 && (t = e[hf] = /* @__PURE__ */ new Set()), t;
  }
  var Em = {}, Tm = Re.ReactDebugCurrentFrame;
  function to(e) {
    if (e) {
      var t = e._owner, n = Ls(e.type, e._source, t ? t.type : null);
      Tm.setExtraStackFrame(n);
    } else
      Tm.setExtraStackFrame(null);
  }
  function un(e, t, n, a, r) {
    {
      var i = Function.call.bind(Vn);
      for (var l in e)
        if (i(e, l)) {
          var u = void 0;
          try {
            if (typeof e[l] != "function") {
              var o = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw o.name = "Invariant Violation", o;
            }
            u = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (s) {
            u = s;
          }
          u && !(u instanceof Error) && (to(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), to(null)), u instanceof Error && !(u.message in Em) && (Em[u.message] = !0, to(r), f("Failed %s type: %s", n, u.message), to(null));
        }
    }
  }
  var yf = [], no;
  no = [];
  var Wn = -1;
  function Ta(e) {
    return {
      current: e
    };
  }
  function at(e, t) {
    if (Wn < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== no[Wn] && f("Unexpected Fiber popped."), e.current = yf[Wn], yf[Wn] = null, no[Wn] = null, Wn--;
  }
  function rt(e, t, n) {
    Wn++, yf[Wn] = e.current, no[Wn] = n, e.current = t;
  }
  var gf;
  gf = {};
  var Ft = {};
  Object.freeze(Ft);
  var In = Ta(Ft), Dn = Ta(!1), bf = Ft;
  function Zr(e, t, n) {
    return n && On(t) ? bf : In.current;
  }
  function Rm(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Jr(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return Ft;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var u = $(e) || "Unknown";
        un(a, i, "context", u);
      }
      return r && Rm(e, t, i), i;
    }
  }
  function ao() {
    return Dn.current;
  }
  function On(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function ro(e) {
    at(Dn, e), at(In, e);
  }
  function Sf(e) {
    at(Dn, e), at(In, e);
  }
  function xm(e, t, n) {
    {
      if (In.current !== Ft)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      rt(In, t, e), rt(Dn, n, e);
    }
  }
  function Dm(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = $(e) || "Unknown";
          gf[i] || (gf[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var u in l)
        if (!(u in r))
          throw new Error(($(e) || "Unknown") + '.getChildContext(): key "' + u + '" is not defined in childContextTypes.');
      {
        var o = $(e) || "Unknown";
        un(r, l, "child context", o);
      }
      return J({}, n, l);
    }
  }
  function io(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Ft;
      return bf = In.current, rt(In, n, e), rt(Dn, Dn.current, e), !0;
    }
  }
  function Om(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Dm(e, t, bf);
        a.__reactInternalMemoizedMergedChildContext = r, at(Dn, e), at(In, e), rt(In, r, e), rt(Dn, n, e);
      } else
        at(Dn, e), rt(Dn, n, e);
    }
  }
  function Mx(e) {
    {
      if (!cC(e) || e.tag !== Y)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case B:
            return t.stateNode.context;
          case Y: {
            var n = t.type;
            if (On(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Ra = 0, lo = 1, Pn = null, Cf = !1, Ef = !1;
  function Mm(e) {
    Pn === null ? Pn = [e] : Pn.push(e);
  }
  function Ux(e) {
    Cf = !0, Mm(e);
  }
  function Um() {
    Cf && xa();
  }
  function xa() {
    if (!Ef && Pn !== null) {
      Ef = !0;
      var e = 0, t = ln();
      try {
        var n = !0, a = Pn;
        for (qe(Nt); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Pn = null, Cf = !1;
      } catch (i) {
        throw Pn !== null && (Pn = Pn.slice(e + 1)), Pp(Eu, xa), i;
      } finally {
        qe(t), Ef = !1;
      }
    }
    return null;
  }
  var Wr = [], Ir = 0, uo = null, oo = 0, Qt = [], Xt = 0, ar = null, ea = 1, ta = "";
  function Lx(e) {
    return ir(), (e.flags & Gp) !== N;
  }
  function _x(e) {
    return ir(), oo;
  }
  function wx() {
    var e = ta, t = ea, n = t & ~Ax(t);
    return n.toString(32) + e;
  }
  function rr(e, t) {
    ir(), Wr[Ir++] = oo, Wr[Ir++] = uo, uo = e, oo = t;
  }
  function Lm(e, t, n) {
    ir(), Qt[Xt++] = ea, Qt[Xt++] = ta, Qt[Xt++] = ar, ar = e;
    var a = ea, r = ta, i = so(a) - 1, l = a & ~(1 << i), u = n + 1, o = so(t) + i;
    if (o > 30) {
      var s = i - i % 5, c = (1 << s) - 1, v = (l & c).toString(32), d = l >> s, m = i - s, y = so(t) + m, g = u << m, R = g | d, w = v + r;
      ea = 1 << y | R, ta = w;
    } else {
      var _ = u << i, Z = _ | l, G = r;
      ea = 1 << o | Z, ta = G;
    }
  }
  function Tf(e) {
    ir();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      rr(e, n), Lm(e, n, a);
    }
  }
  function so(e) {
    return 32 - ih(e);
  }
  function Ax(e) {
    return 1 << so(e) - 1;
  }
  function Rf(e) {
    for (; e === uo; )
      uo = Wr[--Ir], Wr[Ir] = null, oo = Wr[--Ir], Wr[Ir] = null;
    for (; e === ar; )
      ar = Qt[--Xt], Qt[Xt] = null, ta = Qt[--Xt], Qt[Xt] = null, ea = Qt[--Xt], Qt[Xt] = null;
  }
  function zx() {
    return ir(), ar !== null ? {
      id: ea,
      overflow: ta
    } : null;
  }
  function Nx(e, t) {
    ir(), Qt[Xt++] = ea, Qt[Xt++] = ta, Qt[Xt++] = ar, ea = t.id, ta = t.overflow, ar = e;
  }
  function ir() {
    Ke() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var Xe = null, Kt = null, on = !1, lr = !1, Da = null;
  function Hx() {
    on && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function _m() {
    lr = !0;
  }
  function kx() {
    return lr;
  }
  function Fx(e) {
    var t = e.stateNode.containerInfo;
    return Kt = nx(t), Xe = e, on = !0, Da = null, lr = !1, !0;
  }
  function Vx(e, t, n) {
    return Kt = ax(t), Xe = e, on = !0, Da = null, lr = !1, n !== null && Nx(e, n), !0;
  }
  function wm(e, t) {
    switch (e.tag) {
      case B: {
        vx(e.stateNode.containerInfo, t);
        break;
      }
      case z: {
        var n = (e.mode & X) !== A;
        hx(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case ce: {
        var a = e.memoizedState;
        a.dehydrated !== null && px(a.dehydrated, t);
        break;
      }
    }
  }
  function Am(e, t) {
    wm(e, t);
    var n = $O();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= qa) : a.push(n);
  }
  function xf(e, t) {
    {
      if (lr)
        return;
      switch (e.tag) {
        case B: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case z:
              var a = t.type;
              t.pendingProps, mx(n, a);
              break;
            case pe:
              var r = t.pendingProps;
              yx(n, r);
              break;
          }
          break;
        }
        case z: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case z: {
              var o = t.type, s = t.pendingProps, c = (e.mode & X) !== A;
              Sx(
                i,
                l,
                u,
                o,
                s,
                // TODO: Delete this argument when we remove the legacy root API.
                c
              );
              break;
            }
            case pe: {
              var v = t.pendingProps, d = (e.mode & X) !== A;
              Cx(
                i,
                l,
                u,
                v,
                // TODO: Delete this argument when we remove the legacy root API.
                d
              );
              break;
            }
          }
          break;
        }
        case ce: {
          var m = e.memoizedState, y = m.dehydrated;
          if (y !== null) switch (t.tag) {
            case z:
              var g = t.type;
              t.pendingProps, gx(y, g);
              break;
            case pe:
              var R = t.pendingProps;
              bx(y, R);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function zm(e, t) {
    t.flags = t.flags & ~Qn | Oe, xf(e, t);
  }
  function Nm(e, t) {
    switch (e.tag) {
      case z: {
        var n = e.type;
        e.pendingProps;
        var a = JR(t, n);
        return a !== null ? (e.stateNode = a, Xe = e, Kt = tx(a), !0) : !1;
      }
      case pe: {
        var r = e.pendingProps, i = WR(t, r);
        return i !== null ? (e.stateNode = i, Xe = e, Kt = null, !0) : !1;
      }
      case ce: {
        var l = IR(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: zx(),
            retryLane: At
          };
          e.memoizedState = u;
          var o = qO(l);
          return o.return = e, e.child = o, Xe = e, Kt = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function Df(e) {
    return (e.mode & X) !== A && (e.flags & te) === N;
  }
  function Of(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Mf(e) {
    if (on) {
      var t = Kt;
      if (!t) {
        Df(e) && (xf(Xe, e), Of()), zm(Xe, e), on = !1, Xe = e;
        return;
      }
      var n = t;
      if (!Nm(e, t)) {
        Df(e) && (xf(Xe, e), Of()), t = pl(n);
        var a = Xe;
        if (!t || !Nm(e, t)) {
          zm(Xe, e), on = !1, Xe = e;
          return;
        }
        Am(a, n);
      }
    }
  }
  function Bx(e, t, n) {
    var a = e.stateNode, r = !lr, i = rx(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function jx(e) {
    var t = e.stateNode, n = e.memoizedProps, a = ix(t, n, e);
    if (a) {
      var r = Xe;
      if (r !== null)
        switch (r.tag) {
          case B: {
            var i = r.stateNode.containerInfo, l = (r.mode & X) !== A;
            fx(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case z: {
            var u = r.type, o = r.memoizedProps, s = r.stateNode, c = (r.mode & X) !== A;
            dx(
              u,
              o,
              s,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              c
            );
            break;
          }
        }
    }
    return a;
  }
  function Yx(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    lx(n, e);
  }
  function $x(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return ux(n);
  }
  function Hm(e) {
    for (var t = e.return; t !== null && t.tag !== z && t.tag !== B && t.tag !== ce; )
      t = t.return;
    Xe = t;
  }
  function co(e) {
    if (e !== Xe)
      return !1;
    if (!on)
      return Hm(e), on = !0, !1;
    if (e.tag !== B && (e.tag !== z || cx(e.type) && !sf(e.type, e.memoizedProps))) {
      var t = Kt;
      if (t)
        if (Df(e))
          km(e), Of();
        else
          for (; t; )
            Am(e, t), t = pl(t);
    }
    return Hm(e), e.tag === ce ? Kt = $x(e) : Kt = Xe ? pl(e.stateNode) : null, !0;
  }
  function qx() {
    return on && Kt !== null;
  }
  function km(e) {
    for (var t = Kt; t; )
      wm(e, t), t = pl(t);
  }
  function Pr() {
    Xe = null, Kt = null, on = !1, lr = !1;
  }
  function Fm() {
    Da !== null && (_g(Da), Da = null);
  }
  function Ke() {
    return on;
  }
  function Uf(e) {
    Da === null ? Da = [e] : Da.push(e);
  }
  var Gx = Re.ReactCurrentBatchConfig, Qx = null;
  function Xx() {
    return Gx.transition;
  }
  var sn = {
    recordUnsafeLifecycleWarnings: function(e, t) {
    },
    flushPendingUnsafeLifecycleWarnings: function() {
    },
    recordLegacyContextWarning: function(e, t) {
    },
    flushLegacyContextWarning: function() {
    },
    discardPendingWarnings: function() {
    }
  };
  {
    var Kx = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & be && (t = n), n = n.return;
      return t;
    }, ur = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, gl = [], bl = [], Sl = [], Cl = [], El = [], Tl = [], or = /* @__PURE__ */ new Set();
    sn.recordUnsafeLifecycleWarnings = function(e, t) {
      or.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && gl.push(e), e.mode & be && typeof t.UNSAFE_componentWillMount == "function" && bl.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Sl.push(e), e.mode & be && typeof t.UNSAFE_componentWillReceiveProps == "function" && Cl.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && El.push(e), e.mode & be && typeof t.UNSAFE_componentWillUpdate == "function" && Tl.push(e));
    }, sn.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      gl.length > 0 && (gl.forEach(function(d) {
        e.add($(d) || "Component"), or.add(d.type);
      }), gl = []);
      var t = /* @__PURE__ */ new Set();
      bl.length > 0 && (bl.forEach(function(d) {
        t.add($(d) || "Component"), or.add(d.type);
      }), bl = []);
      var n = /* @__PURE__ */ new Set();
      Sl.length > 0 && (Sl.forEach(function(d) {
        n.add($(d) || "Component"), or.add(d.type);
      }), Sl = []);
      var a = /* @__PURE__ */ new Set();
      Cl.length > 0 && (Cl.forEach(function(d) {
        a.add($(d) || "Component"), or.add(d.type);
      }), Cl = []);
      var r = /* @__PURE__ */ new Set();
      El.length > 0 && (El.forEach(function(d) {
        r.add($(d) || "Component"), or.add(d.type);
      }), El = []);
      var i = /* @__PURE__ */ new Set();
      if (Tl.length > 0 && (Tl.forEach(function(d) {
        i.add($(d) || "Component"), or.add(d.type);
      }), Tl = []), t.size > 0) {
        var l = ur(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var u = ur(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, u);
      }
      if (i.size > 0) {
        var o = ur(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, o);
      }
      if (e.size > 0) {
        var s = ur(e);
        Yt(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, s);
      }
      if (n.size > 0) {
        var c = ur(n);
        Yt(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, c);
      }
      if (r.size > 0) {
        var v = ur(r);
        Yt(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
    };
    var fo = /* @__PURE__ */ new Map(), Vm = /* @__PURE__ */ new Set();
    sn.recordLegacyContextWarning = function(e, t) {
      var n = Kx(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!Vm.has(e.type)) {
        var a = fo.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], fo.set(n, a)), a.push(e));
      }
    }, sn.flushLegacyContextWarning = function() {
      fo.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add($(i) || "Component"), Vm.add(i.type);
          });
          var r = ur(a);
          try {
            Ee(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            ct();
          }
        }
      });
    }, sn.discardPendingWarnings = function() {
      gl = [], bl = [], Sl = [], Cl = [], El = [], Tl = [], fo = /* @__PURE__ */ new Map();
    };
  }
  var Lf, _f, wf, Af, zf, Bm = function(e, t) {
  };
  Lf = !1, _f = !1, wf = {}, Af = {}, zf = {}, Bm = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = $(t) || "Component";
      Af[n] || (Af[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function Zx(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function Rl(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & be || Si) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== Y) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !Zx(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = $(e) || "Component";
        wf[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), wf[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, l;
        if (i) {
          var u = i;
          if (u.tag !== Y)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          l = u.stateNode;
        }
        if (!l)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var o = l;
        ou(a, "ref");
        var s = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === s)
          return t.ref;
        var c = function(v) {
          var d = o.refs;
          v === null ? delete d[s] : d[s] = v;
        };
        return c._stringRef = s, c;
      } else {
        if (typeof a != "string")
          throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
        if (!n._owner)
          throw new Error("Element ref was specified as a string (" + a + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
      }
    }
    return a;
  }
  function vo(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function po(e) {
    {
      var t = $(e) || "Component";
      if (zf[t])
        return;
      zf[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function jm(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function Ym(e) {
    function t(p, b) {
      if (e) {
        var h = p.deletions;
        h === null ? (p.deletions = [b], p.flags |= qa) : h.push(b);
      }
    }
    function n(p, b) {
      if (!e)
        return null;
      for (var h = b; h !== null; )
        t(p, h), h = h.sibling;
      return null;
    }
    function a(p, b) {
      for (var h = /* @__PURE__ */ new Map(), E = b; E !== null; )
        E.key !== null ? h.set(E.key, E) : h.set(E.index, E), E = E.sibling;
      return h;
    }
    function r(p, b) {
      var h = yr(p, b);
      return h.index = 0, h.sibling = null, h;
    }
    function i(p, b, h) {
      if (p.index = h, !e)
        return p.flags |= Gp, b;
      var E = p.alternate;
      if (E !== null) {
        var U = E.index;
        return U < b ? (p.flags |= Oe, b) : U;
      } else
        return p.flags |= Oe, b;
    }
    function l(p) {
      return e && p.alternate === null && (p.flags |= Oe), p;
    }
    function u(p, b, h, E) {
      if (b === null || b.tag !== pe) {
        var U = Uv(h, p.mode, E);
        return U.return = p, U;
      } else {
        var x = r(b, h);
        return x.return = p, x;
      }
    }
    function o(p, b, h, E) {
      var U = h.type;
      if (U === Er)
        return c(p, b, h.props.children, E, h.key);
      if (b !== null && (b.elementType === U || // Keep this check inline so it only runs on the false path:
      Xg(b, h) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof U == "object" && U !== null && U.$$typeof === st && jm(U) === b.type)) {
        var x = r(b, h.props);
        return x.ref = Rl(p, b, h), x.return = p, x._debugSource = h._source, x._debugOwner = h._owner, x;
      }
      var H = Mv(h, p.mode, E);
      return H.ref = Rl(p, b, h), H.return = p, H;
    }
    function s(p, b, h, E) {
      if (b === null || b.tag !== oe || b.stateNode.containerInfo !== h.containerInfo || b.stateNode.implementation !== h.implementation) {
        var U = Lv(h, p.mode, E);
        return U.return = p, U;
      } else {
        var x = r(b, h.children || []);
        return x.return = p, x;
      }
    }
    function c(p, b, h, E, U) {
      if (b === null || b.tag !== sa) {
        var x = ka(h, p.mode, E, U);
        return x.return = p, x;
      } else {
        var H = r(b, h);
        return H.return = p, H;
      }
    }
    function v(p, b, h) {
      if (typeof b == "string" && b !== "" || typeof b == "number") {
        var E = Uv("" + b, p.mode, h);
        return E.return = p, E;
      }
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Cr: {
            var U = Mv(b, p.mode, h);
            return U.ref = Rl(p, null, b), U.return = p, U;
          }
          case ja: {
            var x = Lv(b, p.mode, h);
            return x.return = p, x;
          }
          case st: {
            var H = b._payload, j = b._init;
            return v(p, j(H), h);
          }
        }
        if (ft(b) || Ya(b)) {
          var ue = ka(b, p.mode, h, null);
          return ue.return = p, ue;
        }
        vo(p, b);
      }
      return typeof b == "function" && po(p), null;
    }
    function d(p, b, h, E) {
      var U = b !== null ? b.key : null;
      if (typeof h == "string" && h !== "" || typeof h == "number")
        return U !== null ? null : u(p, b, "" + h, E);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Cr:
            return h.key === U ? o(p, b, h, E) : null;
          case ja:
            return h.key === U ? s(p, b, h, E) : null;
          case st: {
            var x = h._payload, H = h._init;
            return d(p, b, H(x), E);
          }
        }
        if (ft(h) || Ya(h))
          return U !== null ? null : c(p, b, h, E, null);
        vo(p, h);
      }
      return typeof h == "function" && po(p), null;
    }
    function m(p, b, h, E, U) {
      if (typeof E == "string" && E !== "" || typeof E == "number") {
        var x = p.get(h) || null;
        return u(b, x, "" + E, U);
      }
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Cr: {
            var H = p.get(E.key === null ? h : E.key) || null;
            return o(b, H, E, U);
          }
          case ja: {
            var j = p.get(E.key === null ? h : E.key) || null;
            return s(b, j, E, U);
          }
          case st:
            var ue = E._payload, W = E._init;
            return m(p, b, h, W(ue), U);
        }
        if (ft(E) || Ya(E)) {
          var Te = p.get(h) || null;
          return c(b, Te, E, U, null);
        }
        vo(b, E);
      }
      return typeof E == "function" && po(b), null;
    }
    function y(p, b, h) {
      {
        if (typeof p != "object" || p === null)
          return b;
        switch (p.$$typeof) {
          case Cr:
          case ja:
            Bm(p, h);
            var E = p.key;
            if (typeof E != "string")
              break;
            if (b === null) {
              b = /* @__PURE__ */ new Set(), b.add(E);
              break;
            }
            if (!b.has(E)) {
              b.add(E);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", E);
            break;
          case st:
            var U = p._payload, x = p._init;
            y(x(U), b, h);
            break;
        }
      }
      return b;
    }
    function g(p, b, h, E) {
      for (var U = null, x = 0; x < h.length; x++) {
        var H = h[x];
        U = y(H, U, p);
      }
      for (var j = null, ue = null, W = b, Te = 0, I = 0, Se = null; W !== null && I < h.length; I++) {
        W.index > I ? (Se = W, W = null) : Se = W.sibling;
        var lt = d(p, W, h[I], E);
        if (lt === null) {
          W === null && (W = Se);
          break;
        }
        e && W && lt.alternate === null && t(p, W), Te = i(lt, Te, I), ue === null ? j = lt : ue.sibling = lt, ue = lt, W = Se;
      }
      if (I === h.length) {
        if (n(p, W), Ke()) {
          var tt = I;
          rr(p, tt);
        }
        return j;
      }
      if (W === null) {
        for (; I < h.length; I++) {
          var Bt = v(p, h[I], E);
          Bt !== null && (Te = i(Bt, Te, I), ue === null ? j = Bt : ue.sibling = Bt, ue = Bt);
        }
        if (Ke()) {
          var yt = I;
          rr(p, yt);
        }
        return j;
      }
      for (var gt = a(p, W); I < h.length; I++) {
        var ut = m(gt, p, I, h[I], E);
        ut !== null && (e && ut.alternate !== null && gt.delete(ut.key === null ? I : ut.key), Te = i(ut, Te, I), ue === null ? j = ut : ue.sibling = ut, ue = ut);
      }
      if (e && gt.forEach(function(gi) {
        return t(p, gi);
      }), Ke()) {
        var oa = I;
        rr(p, oa);
      }
      return j;
    }
    function R(p, b, h, E) {
      var U = Ya(h);
      if (typeof U != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        h[Symbol.toStringTag] === "Generator" && (_f || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), _f = !0), h.entries === U && (Lf || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Lf = !0);
        var x = U.call(h);
        if (x)
          for (var H = null, j = x.next(); !j.done; j = x.next()) {
            var ue = j.value;
            H = y(ue, H, p);
          }
      }
      var W = U.call(h);
      if (W == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Te = null, I = null, Se = b, lt = 0, tt = 0, Bt = null, yt = W.next(); Se !== null && !yt.done; tt++, yt = W.next()) {
        Se.index > tt ? (Bt = Se, Se = null) : Bt = Se.sibling;
        var gt = d(p, Se, yt.value, E);
        if (gt === null) {
          Se === null && (Se = Bt);
          break;
        }
        e && Se && gt.alternate === null && t(p, Se), lt = i(gt, lt, tt), I === null ? Te = gt : I.sibling = gt, I = gt, Se = Bt;
      }
      if (yt.done) {
        if (n(p, Se), Ke()) {
          var ut = tt;
          rr(p, ut);
        }
        return Te;
      }
      if (Se === null) {
        for (; !yt.done; tt++, yt = W.next()) {
          var oa = v(p, yt.value, E);
          oa !== null && (lt = i(oa, lt, tt), I === null ? Te = oa : I.sibling = oa, I = oa);
        }
        if (Ke()) {
          var gi = tt;
          rr(p, gi);
        }
        return Te;
      }
      for (var nu = a(p, Se); !yt.done; tt++, yt = W.next()) {
        var Nn = m(nu, p, tt, yt.value, E);
        Nn !== null && (e && Nn.alternate !== null && nu.delete(Nn.key === null ? tt : Nn.key), lt = i(Nn, lt, tt), I === null ? Te = Nn : I.sibling = Nn, I = Nn);
      }
      if (e && nu.forEach(function(CM) {
        return t(p, CM);
      }), Ke()) {
        var SM = tt;
        rr(p, SM);
      }
      return Te;
    }
    function w(p, b, h, E) {
      if (b !== null && b.tag === pe) {
        n(p, b.sibling);
        var U = r(b, h);
        return U.return = p, U;
      }
      n(p, b);
      var x = Uv(h, p.mode, E);
      return x.return = p, x;
    }
    function _(p, b, h, E) {
      for (var U = h.key, x = b; x !== null; ) {
        if (x.key === U) {
          var H = h.type;
          if (H === Er) {
            if (x.tag === sa) {
              n(p, x.sibling);
              var j = r(x, h.props.children);
              return j.return = p, j._debugSource = h._source, j._debugOwner = h._owner, j;
            }
          } else if (x.elementType === H || // Keep this check inline so it only runs on the false path:
          Xg(x, h) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof H == "object" && H !== null && H.$$typeof === st && jm(H) === x.type) {
            n(p, x.sibling);
            var ue = r(x, h.props);
            return ue.ref = Rl(p, x, h), ue.return = p, ue._debugSource = h._source, ue._debugOwner = h._owner, ue;
          }
          n(p, x);
          break;
        } else
          t(p, x);
        x = x.sibling;
      }
      if (h.type === Er) {
        var W = ka(h.props.children, p.mode, E, h.key);
        return W.return = p, W;
      } else {
        var Te = Mv(h, p.mode, E);
        return Te.ref = Rl(p, b, h), Te.return = p, Te;
      }
    }
    function Z(p, b, h, E) {
      for (var U = h.key, x = b; x !== null; ) {
        if (x.key === U)
          if (x.tag === oe && x.stateNode.containerInfo === h.containerInfo && x.stateNode.implementation === h.implementation) {
            n(p, x.sibling);
            var H = r(x, h.children || []);
            return H.return = p, H;
          } else {
            n(p, x);
            break;
          }
        else
          t(p, x);
        x = x.sibling;
      }
      var j = Lv(h, p.mode, E);
      return j.return = p, j;
    }
    function G(p, b, h, E) {
      var U = typeof h == "object" && h !== null && h.type === Er && h.key === null;
      if (U && (h = h.props.children), typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Cr:
            return l(_(p, b, h, E));
          case ja:
            return l(Z(p, b, h, E));
          case st:
            var x = h._payload, H = h._init;
            return G(p, b, H(x), E);
        }
        if (ft(h))
          return g(p, b, h, E);
        if (Ya(h))
          return R(p, b, h, E);
        vo(p, h);
      }
      return typeof h == "string" && h !== "" || typeof h == "number" ? l(w(p, b, "" + h, E)) : (typeof h == "function" && po(p), n(p, b));
    }
    return G;
  }
  var ei = Ym(!0), $m = Ym(!1);
  function Jx(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = yr(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = yr(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function Wx(e, t) {
    for (var n = e.child; n !== null; )
      FO(n, t), n = n.sibling;
  }
  var Nf = Ta(null), Hf;
  Hf = {};
  var ho = null, ti = null, kf = null, mo = !1;
  function yo() {
    ho = null, ti = null, kf = null, mo = !1;
  }
  function qm() {
    mo = !0;
  }
  function Gm() {
    mo = !1;
  }
  function Qm(e, t, n) {
    rt(Nf, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Hf && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Hf;
  }
  function Ff(e, t) {
    var n = Nf.current;
    at(Nf, t), e._currentValue = n;
  }
  function Vf(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (Vr(a.childLanes, t) ? r !== null && !Vr(r.childLanes, t) && (r.childLanes = q(r.childLanes, t)) : (a.childLanes = q(a.childLanes, t), r !== null && (r.childLanes = q(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Ix(e, t, n) {
    Px(e, t, n);
  }
  function Px(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === Y) {
              var u = Yi(n), o = na(me, u);
              o.tag = bo;
              var s = a.updateQueue;
              if (s !== null) {
                var c = s.shared, v = c.pending;
                v === null ? o.next = o : (o.next = v.next, v.next = o), c.pending = o;
              }
            }
            a.lanes = q(a.lanes, n);
            var d = a.alternate;
            d !== null && (d.lanes = q(d.lanes, n)), Vf(a.return, n, e), i.lanes = q(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === gn)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === St) {
        var m = a.return;
        if (m === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        m.lanes = q(m.lanes, n);
        var y = m.alternate;
        y !== null && (y.lanes = q(y.lanes, n)), Vf(m, n, e), r = a.sibling;
      } else
        r = a.child;
      if (r !== null)
        r.return = a;
      else
        for (r = a; r !== null; ) {
          if (r === e) {
            r = null;
            break;
          }
          var g = r.sibling;
          if (g !== null) {
            g.return = r.return, r = g;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function ni(e, t) {
    ho = e, ti = null, kf = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (zt(n.lanes, t) && Vl(), n.firstContext = null);
    }
  }
  function Me(e) {
    mo && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (kf !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (ti === null) {
        if (ho === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        ti = n, ho.dependencies = {
          lanes: C,
          firstContext: n
        };
      } else
        ti = ti.next = n;
    }
    return t;
  }
  var sr = null;
  function Bf(e) {
    sr === null ? sr = [e] : sr.push(e);
  }
  function eD() {
    if (sr !== null) {
      for (var e = 0; e < sr.length; e++) {
        var t = sr[e], n = t.interleaved;
        if (n !== null) {
          t.interleaved = null;
          var a = n.next, r = t.pending;
          if (r !== null) {
            var i = r.next;
            r.next = a, n.next = i;
          }
          t.pending = n;
        }
      }
      sr = null;
    }
  }
  function Xm(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Bf(t)) : (n.next = r.next, r.next = n), t.interleaved = n, go(e, a);
  }
  function tD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Bf(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function nD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Bf(t)) : (n.next = r.next, r.next = n), t.interleaved = n, go(e, a);
  }
  function Rt(e, t) {
    return go(e, t);
  }
  var aD = go;
  function go(e, t) {
    e.lanes = q(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = q(n.lanes, t)), n === null && (e.flags & (Oe | Qn)) !== N && $g(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = q(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = q(n.childLanes, t) : (r.flags & (Oe | Qn)) !== N && $g(e), a = r, r = r.return;
    if (a.tag === B) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Km = 0, Zm = 1, bo = 2, jf = 3, So = !1, Yf, Co;
  Yf = !1, Co = null;
  function $f(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: C
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function Jm(e, t) {
    var n = t.updateQueue, a = e.updateQueue;
    if (n === a) {
      var r = {
        baseState: a.baseState,
        firstBaseUpdate: a.firstBaseUpdate,
        lastBaseUpdate: a.lastBaseUpdate,
        shared: a.shared,
        effects: a.effects
      };
      t.updateQueue = r;
    }
  }
  function na(e, t) {
    var n = {
      eventTime: e,
      lane: t,
      tag: Km,
      payload: null,
      callback: null,
      next: null
    };
    return n;
  }
  function Oa(e, t, n) {
    var a = e.updateQueue;
    if (a === null)
      return null;
    var r = a.shared;
    if (Co === r && !Yf && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Yf = !0), tO()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, aD(e, n);
    } else
      return nD(e, r, t, n);
  }
  function Eo(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (sh(n)) {
        var i = r.lanes;
        i = fh(i, e.pendingLanes);
        var l = q(i, n);
        r.lanes = l, zc(e, l);
      }
    }
  }
  function qf(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, l = null, u = n.firstBaseUpdate;
        if (u !== null) {
          var o = u;
          do {
            var s = {
              eventTime: o.eventTime,
              lane: o.lane,
              tag: o.tag,
              payload: o.payload,
              callback: o.callback,
              next: null
            };
            l === null ? i = l = s : (l.next = s, l = s), o = o.next;
          } while (o !== null);
          l === null ? i = l = t : (l.next = t, l = t);
        } else
          i = l = t;
        n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: l,
          shared: r.shared,
          effects: r.effects
        }, e.updateQueue = n;
        return;
      }
    }
    var c = n.lastBaseUpdate;
    c === null ? n.firstBaseUpdate = t : c.next = t, n.lastBaseUpdate = t;
  }
  function rD(e, t, n, a, r, i) {
    switch (n.tag) {
      case Zm: {
        var l = n.payload;
        if (typeof l == "function") {
          qm();
          var u = l.call(i, a, r);
          {
            if (e.mode & be) {
              Ye(!0);
              try {
                l.call(i, a, r);
              } finally {
                Ye(!1);
              }
            }
            Gm();
          }
          return u;
        }
        return l;
      }
      case jf:
        e.flags = e.flags & ~vt | te;
      case Km: {
        var o = n.payload, s;
        if (typeof o == "function") {
          qm(), s = o.call(i, a, r);
          {
            if (e.mode & be) {
              Ye(!0);
              try {
                o.call(i, a, r);
              } finally {
                Ye(!1);
              }
            }
            Gm();
          }
        } else
          s = o;
        return s == null ? a : J({}, a, s);
      }
      case bo:
        return So = !0, a;
    }
    return a;
  }
  function To(e, t, n, a) {
    var r = e.updateQueue;
    So = !1, Co = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, u = r.shared.pending;
    if (u !== null) {
      r.shared.pending = null;
      var o = u, s = o.next;
      o.next = null, l === null ? i = s : l.next = s, l = o;
      var c = e.alternate;
      if (c !== null) {
        var v = c.updateQueue, d = v.lastBaseUpdate;
        d !== l && (d === null ? v.firstBaseUpdate = s : d.next = s, v.lastBaseUpdate = o);
      }
    }
    if (i !== null) {
      var m = r.baseState, y = C, g = null, R = null, w = null, _ = i;
      do {
        var Z = _.lane, G = _.eventTime;
        if (Vr(a, Z)) {
          if (w !== null) {
            var b = {
              eventTime: G,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: $e,
              tag: _.tag,
              payload: _.payload,
              callback: _.callback,
              next: null
            };
            w = w.next = b;
          }
          m = rD(e, r, _, m, t, n);
          var h = _.callback;
          if (h !== null && // If the update was already committed, we should not queue its
          // callback again.
          _.lane !== $e) {
            e.flags |= qp;
            var E = r.effects;
            E === null ? r.effects = [_] : E.push(_);
          }
        } else {
          var p = {
            eventTime: G,
            lane: Z,
            tag: _.tag,
            payload: _.payload,
            callback: _.callback,
            next: null
          };
          w === null ? (R = w = p, g = m) : w = w.next = p, y = q(y, Z);
        }
        if (_ = _.next, _ === null) {
          if (u = r.shared.pending, u === null)
            break;
          var U = u, x = U.next;
          U.next = null, _ = x, r.lastBaseUpdate = U, r.shared.pending = null;
        }
      } while (!0);
      w === null && (g = m), r.baseState = g, r.firstBaseUpdate = R, r.lastBaseUpdate = w;
      var H = r.shared.interleaved;
      if (H !== null) {
        var j = H;
        do
          y = q(y, j.lane), j = j.next;
        while (j !== H);
      } else i === null && (r.shared.lanes = C);
      Wl(y), e.lanes = y, e.memoizedState = m;
    }
    Co = null;
  }
  function iD(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Wm() {
    So = !1;
  }
  function Ro() {
    return So;
  }
  function Im(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, iD(l, n));
      }
  }
  var xl = {}, Ma = Ta(xl), Dl = Ta(xl), xo = Ta(xl);
  function Do(e) {
    if (e === xl)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Pm() {
    var e = Do(xo.current);
    return e;
  }
  function Gf(e, t) {
    rt(xo, t, e), rt(Dl, e, e), rt(Ma, xl, e);
    var n = ER(t);
    at(Ma, e), rt(Ma, n, e);
  }
  function ai(e) {
    at(Ma, e), at(Dl, e), at(xo, e);
  }
  function Qf() {
    var e = Do(Ma.current);
    return e;
  }
  function ey(e) {
    Do(xo.current);
    var t = Do(Ma.current), n = TR(t, e.type);
    t !== n && (rt(Dl, e, e), rt(Ma, n, e));
  }
  function Xf(e) {
    Dl.current === e && (at(Ma, e), at(Dl, e));
  }
  var lD = 0, ty = 1, ny = 1, Ol = 2, cn = Ta(lD);
  function Kf(e, t) {
    return (e & t) !== 0;
  }
  function ri(e) {
    return e & ty;
  }
  function Zf(e, t) {
    return e & ty | t;
  }
  function uD(e, t) {
    return e | t;
  }
  function Ua(e, t) {
    rt(cn, t, e);
  }
  function ii(e) {
    at(cn, e);
  }
  function oD(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Oo(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === ce) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || bm(a) || vf(a))
            return t;
        }
      } else if (t.tag === ot && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & te) !== N;
        if (r)
          return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e)
        return null;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var xt = (
    /*   */
    0
  ), Le = (
    /* */
    1
  ), Mn = (
    /*  */
    2
  ), _e = (
    /*    */
    4
  ), Ze = (
    /*   */
    8
  ), Jf = [];
  function Wf() {
    for (var e = 0; e < Jf.length; e++) {
      var t = Jf[e];
      t._workInProgressVersionPrimary = null;
    }
    Jf.length = 0;
  }
  function sD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var M = Re.ReactCurrentDispatcher, Ml = Re.ReactCurrentBatchConfig, If, li;
  If = /* @__PURE__ */ new Set();
  var cr = C, le = null, we = null, Ae = null, Mo = !1, Ul = !1, Ll = 0, cD = 0, fD = 25, S = null, Zt = null, La = -1, Pf = !1;
  function ne() {
    {
      var e = S;
      Zt === null ? Zt = [e] : Zt.push(e);
    }
  }
  function T() {
    {
      var e = S;
      Zt !== null && (La++, Zt[La] !== e && dD(e));
    }
  }
  function ui(e) {
    e != null && !ft(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", S, typeof e);
  }
  function dD(e) {
    {
      var t = $(le);
      if (!If.has(t) && (If.add(t), Zt !== null)) {
        for (var n = "", a = 30, r = 0; r <= La; r++) {
          for (var i = Zt[r], l = r === La ? e : i, u = r + 1 + ". " + i; u.length < a; )
            u += " ";
          u += l + `
`, n += u;
        }
        f(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, n);
      }
    }
  }
  function it() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function ed(e, t) {
    if (Pf)
      return !1;
    if (t === null)
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", S), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, S, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!kt(e[n], t[n]))
        return !1;
    return !0;
  }
  function oi(e, t, n, a, r, i) {
    cr = i, le = t, Zt = e !== null ? e._debugHookTypes : null, La = -1, Pf = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = C, e !== null && e.memoizedState !== null ? M.current = Ry : Zt !== null ? M.current = Ty : M.current = Ey;
    var l = n(a, r);
    if (Ul) {
      var u = 0;
      do {
        if (Ul = !1, Ll = 0, u >= fD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, Pf = !1, we = null, Ae = null, t.updateQueue = null, La = -1, M.current = xy, l = n(a, r);
      } while (Ul);
    }
    M.current = jo, t._debugHookTypes = Zt;
    var o = we !== null && we.next !== null;
    if (cr = C, le = null, we = null, Ae = null, S = null, Zt = null, La = -1, e !== null && (e.flags & Xn) !== (t.flags & Xn) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & X) !== A && f("Internal React error: Expected static flag was missing. Please notify the React team."), Mo = !1, o)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function si() {
    var e = Ll !== 0;
    return Ll = 0, e;
  }
  function ay(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Rn) !== A ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Mu(e.lanes, n);
  }
  function ry() {
    if (M.current = jo, Mo) {
      for (var e = le.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Mo = !1;
    }
    cr = C, le = null, we = null, Ae = null, Zt = null, La = -1, S = null, yy = !1, Ul = !1, Ll = 0;
  }
  function Un() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ae === null ? le.memoizedState = Ae = e : Ae = Ae.next = e, Ae;
  }
  function Jt() {
    var e;
    if (we === null) {
      var t = le.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = we.next;
    var n;
    if (Ae === null ? n = le.memoizedState : n = Ae.next, n !== null)
      Ae = n, n = Ae.next, we = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      we = e;
      var a = {
        memoizedState: we.memoizedState,
        baseState: we.baseState,
        baseQueue: we.baseQueue,
        queue: we.queue,
        next: null
      };
      Ae === null ? le.memoizedState = Ae = a : Ae = Ae.next = a;
    }
    return Ae;
  }
  function iy() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function td(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function nd(e, t, n) {
    var a = Un(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: C,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = mD.bind(null, le, i);
    return [a.memoizedState, l];
  }
  function ad(e, t, n) {
    var a = Jt(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = we, l = i.baseQueue, u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var o = l.next, s = u.next;
        l.next = s, u.next = o;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = u, r.pending = null;
    }
    if (l !== null) {
      var c = l.next, v = i.baseState, d = null, m = null, y = null, g = c;
      do {
        var R = g.lane;
        if (Vr(cr, R)) {
          if (y !== null) {
            var _ = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: $e,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            };
            y = y.next = _;
          }
          if (g.hasEagerState)
            v = g.eagerState;
          else {
            var Z = g.action;
            v = e(v, Z);
          }
        } else {
          var w = {
            lane: R,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          };
          y === null ? (m = y = w, d = v) : y = y.next = w, le.lanes = q(le.lanes, R), Wl(R);
        }
        g = g.next;
      } while (g !== null && g !== c);
      y === null ? d = v : y.next = m, kt(v, a.memoizedState) || Vl(), a.memoizedState = v, a.baseState = d, a.baseQueue = y, r.lastRenderedState = v;
    }
    var G = r.interleaved;
    if (G !== null) {
      var p = G;
      do {
        var b = p.lane;
        le.lanes = q(le.lanes, b), Wl(b), p = p.next;
      } while (p !== G);
    } else l === null && (r.lanes = C);
    var h = r.dispatch;
    return [a.memoizedState, h];
  }
  function rd(e, t, n) {
    var a = Jt(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, u = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var o = l.next, s = o;
      do {
        var c = s.action;
        u = e(u, c), s = s.next;
      } while (s !== o);
      kt(u, a.memoizedState) || Vl(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function DM(e, t, n) {
  }
  function OM(e, t, n) {
  }
  function id(e, t, n) {
    var a = le, r = Un(), i, l = Ke();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), li || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), li = !0);
    } else {
      if (i = t(), !li) {
        var u = t();
        kt(i, u) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), li = !0);
      }
      var o = ls();
      if (o === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ou(o, cr) || ly(a, t, i);
    }
    r.memoizedState = i;
    var s = {
      value: i,
      getSnapshot: t
    };
    return r.queue = s, Ao(oy.bind(null, a, s, e), [e]), a.flags |= pa, _l(Le | Ze, uy.bind(null, a, s, i, t), void 0, null), i;
  }
  function Uo(e, t, n) {
    var a = le, r = Jt(), i = t();
    if (!li) {
      var l = t();
      kt(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), li = !0);
    }
    var u = r.memoizedState, o = !kt(u, i);
    o && (r.memoizedState = i, Vl());
    var s = r.queue;
    if (Al(oy.bind(null, a, s, e), [e]), s.getSnapshot !== t || o || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    Ae !== null && Ae.memoizedState.tag & Le) {
      a.flags |= pa, _l(Le | Ze, uy.bind(null, a, s, i, t), void 0, null);
      var c = ls();
      if (c === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Ou(c, cr) || ly(a, t, i);
    }
    return i;
  }
  function ly(e, t, n) {
    e.flags |= ec;
    var a = {
      getSnapshot: t,
      value: n
    }, r = le.updateQueue;
    if (r === null)
      r = iy(), le.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function uy(e, t, n, a) {
    t.value = n, t.getSnapshot = a, sy(t) && cy(e);
  }
  function oy(e, t, n) {
    var a = function() {
      sy(t) && cy(e);
    };
    return n(a);
  }
  function sy(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !kt(n, a);
    } catch {
      return !0;
    }
  }
  function cy(e) {
    var t = Rt(e, F);
    t !== null && ke(t, e, F, me);
  }
  function Lo(e) {
    var t = Un();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: C,
      dispatch: null,
      lastRenderedReducer: td,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = yD.bind(null, le, n);
    return [t.memoizedState, a];
  }
  function ld(e) {
    return ad(td);
  }
  function ud(e) {
    return rd(td);
  }
  function _l(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = le.updateQueue;
    if (i === null)
      i = iy(), le.updateQueue = i, i.lastEffect = r.next = r;
    else {
      var l = i.lastEffect;
      if (l === null)
        i.lastEffect = r.next = r;
      else {
        var u = l.next;
        l.next = r, r.next = u, i.lastEffect = r;
      }
    }
    return r;
  }
  function od(e) {
    var t = Un();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function _o(e) {
    var t = Jt();
    return t.memoizedState;
  }
  function wl(e, t, n, a) {
    var r = Un(), i = a === void 0 ? null : a;
    le.flags |= e, r.memoizedState = _l(Le | t, n, void 0, i);
  }
  function wo(e, t, n, a) {
    var r = Jt(), i = a === void 0 ? null : a, l = void 0;
    if (we !== null) {
      var u = we.memoizedState;
      if (l = u.destroy, i !== null) {
        var o = u.deps;
        if (ed(i, o)) {
          r.memoizedState = _l(t, n, l, i);
          return;
        }
      }
    }
    le.flags |= e, r.memoizedState = _l(Le | t, n, l, i);
  }
  function Ao(e, t) {
    return (le.mode & Rn) !== A ? wl(rc | pa | ac, Ze, e, t) : wl(pa | ac, Ze, e, t);
  }
  function Al(e, t) {
    return wo(pa, Ze, e, t);
  }
  function sd(e, t) {
    return wl(ee, Mn, e, t);
  }
  function zo(e, t) {
    return wo(ee, Mn, e, t);
  }
  function cd(e, t) {
    var n = ee;
    return n |= Xa, (le.mode & Rn) !== A && (n |= ha), wl(n, _e, e, t);
  }
  function No(e, t) {
    return wo(ee, _e, e, t);
  }
  function fy(e, t) {
    if (typeof t == "function") {
      var n = t, a = e();
      return n(a), function() {
        n(null);
      };
    } else if (t != null) {
      var r = t;
      r.hasOwnProperty("current") || f("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(r).join(", ") + "}");
      var i = e();
      return r.current = i, function() {
        r.current = null;
      };
    }
  }
  function fd(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = ee;
    return r |= Xa, (le.mode & Rn) !== A && (r |= ha), wl(r, _e, fy.bind(null, t, e), a);
  }
  function Ho(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wo(ee, _e, fy.bind(null, t, e), a);
  }
  function vD(e, t) {
  }
  var ko = vD;
  function dd(e, t) {
    var n = Un(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Fo(e, t) {
    var n = Jt(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (ed(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function vd(e, t) {
    var n = Un(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function Vo(e, t) {
    var n = Jt(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (ed(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function pd(e) {
    var t = Un();
    return t.memoizedState = e, e;
  }
  function dy(e) {
    var t = Jt(), n = we, a = n.memoizedState;
    return py(t, a, e);
  }
  function vy(e) {
    var t = Jt();
    if (we === null)
      return t.memoizedState = e, e;
    var n = we.memoizedState;
    return py(t, n, e);
  }
  function py(e, t, n) {
    var a = !IC(cr);
    if (a) {
      if (!kt(n, t)) {
        var r = ch();
        le.lanes = q(le.lanes, r), Wl(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Vl()), e.memoizedState = n, n;
  }
  function pD(e, t, n) {
    var a = ln();
    qe(uE(a, Zn)), e(!0);
    var r = Ml.transition;
    Ml.transition = {};
    var i = Ml.transition;
    Ml.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (qe(a), Ml.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && Yt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function hd() {
    var e = Lo(!1), t = e[0], n = e[1], a = pD.bind(null, n), r = Un();
    return r.memoizedState = a, [t, a];
  }
  function hy() {
    var e = ld(), t = e[0], n = Jt(), a = n.memoizedState;
    return [t, a];
  }
  function my() {
    var e = ud(), t = e[0], n = Jt(), a = n.memoizedState;
    return [t, a];
  }
  var yy = !1;
  function hD() {
    return yy;
  }
  function md() {
    var e = Un(), t = ls(), n = t.identifierPrefix, a;
    if (Ke()) {
      var r = wx();
      a = ":" + n + "R" + r;
      var i = Ll++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = cD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Bo() {
    var e = Jt(), t = e.memoizedState;
    return t;
  }
  function mD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = Na(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (gy(e))
      by(t, r);
    else {
      var i = Xm(e, t, r, a);
      if (i !== null) {
        var l = mt();
        ke(i, e, a, l), Sy(i, t, a);
      }
    }
    Cy(e, a);
  }
  function yD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = Na(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (gy(e))
      by(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === C && (i === null || i.lanes === C)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = M.current, M.current = fn;
          try {
            var o = t.lastRenderedState, s = l(o, n);
            if (r.hasEagerState = !0, r.eagerState = s, kt(s, o)) {
              tD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            M.current = u;
          }
        }
      }
      var c = Xm(e, t, r, a);
      if (c !== null) {
        var v = mt();
        ke(c, e, a, v), Sy(c, t, a);
      }
    }
    Cy(e, a);
  }
  function gy(e) {
    var t = e.alternate;
    return e === le || t !== null && t === le;
  }
  function by(e, t) {
    Ul = Mo = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Sy(e, t, n) {
    if (sh(n)) {
      var a = t.lanes;
      a = fh(a, e.pendingLanes);
      var r = q(a, n);
      t.lanes = r, zc(e, r);
    }
  }
  function Cy(e, t, n) {
    sc(e, t);
  }
  var jo = {
    readContext: Me,
    useCallback: it,
    useContext: it,
    useEffect: it,
    useImperativeHandle: it,
    useInsertionEffect: it,
    useLayoutEffect: it,
    useMemo: it,
    useReducer: it,
    useRef: it,
    useState: it,
    useDebugValue: it,
    useDeferredValue: it,
    useTransition: it,
    useMutableSource: it,
    useSyncExternalStore: it,
    useId: it,
    unstable_isNewReconciler: bn
  }, Ey = null, Ty = null, Ry = null, xy = null, Ln = null, fn = null, Yo = null;
  {
    var yd = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, V = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Ey = {
      readContext: function(e) {
        return Me(e);
      },
      useCallback: function(e, t) {
        return S = "useCallback", ne(), ui(t), dd(e, t);
      },
      useContext: function(e) {
        return S = "useContext", ne(), Me(e);
      },
      useEffect: function(e, t) {
        return S = "useEffect", ne(), ui(t), Ao(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return S = "useImperativeHandle", ne(), ui(n), fd(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return S = "useInsertionEffect", ne(), ui(t), sd(e, t);
      },
      useLayoutEffect: function(e, t) {
        return S = "useLayoutEffect", ne(), ui(t), cd(e, t);
      },
      useMemo: function(e, t) {
        S = "useMemo", ne(), ui(t);
        var n = M.current;
        M.current = Ln;
        try {
          return vd(e, t);
        } finally {
          M.current = n;
        }
      },
      useReducer: function(e, t, n) {
        S = "useReducer", ne();
        var a = M.current;
        M.current = Ln;
        try {
          return nd(e, t, n);
        } finally {
          M.current = a;
        }
      },
      useRef: function(e) {
        return S = "useRef", ne(), od(e);
      },
      useState: function(e) {
        S = "useState", ne();
        var t = M.current;
        M.current = Ln;
        try {
          return Lo(e);
        } finally {
          M.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return S = "useDebugValue", ne(), void 0;
      },
      useDeferredValue: function(e) {
        return S = "useDeferredValue", ne(), pd(e);
      },
      useTransition: function() {
        return S = "useTransition", ne(), hd();
      },
      useMutableSource: function(e, t, n) {
        return S = "useMutableSource", ne(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return S = "useSyncExternalStore", ne(), id(e, t, n);
      },
      useId: function() {
        return S = "useId", ne(), md();
      },
      unstable_isNewReconciler: bn
    }, Ty = {
      readContext: function(e) {
        return Me(e);
      },
      useCallback: function(e, t) {
        return S = "useCallback", T(), dd(e, t);
      },
      useContext: function(e) {
        return S = "useContext", T(), Me(e);
      },
      useEffect: function(e, t) {
        return S = "useEffect", T(), Ao(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return S = "useImperativeHandle", T(), fd(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return S = "useInsertionEffect", T(), sd(e, t);
      },
      useLayoutEffect: function(e, t) {
        return S = "useLayoutEffect", T(), cd(e, t);
      },
      useMemo: function(e, t) {
        S = "useMemo", T();
        var n = M.current;
        M.current = Ln;
        try {
          return vd(e, t);
        } finally {
          M.current = n;
        }
      },
      useReducer: function(e, t, n) {
        S = "useReducer", T();
        var a = M.current;
        M.current = Ln;
        try {
          return nd(e, t, n);
        } finally {
          M.current = a;
        }
      },
      useRef: function(e) {
        return S = "useRef", T(), od(e);
      },
      useState: function(e) {
        S = "useState", T();
        var t = M.current;
        M.current = Ln;
        try {
          return Lo(e);
        } finally {
          M.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return S = "useDebugValue", T(), void 0;
      },
      useDeferredValue: function(e) {
        return S = "useDeferredValue", T(), pd(e);
      },
      useTransition: function() {
        return S = "useTransition", T(), hd();
      },
      useMutableSource: function(e, t, n) {
        return S = "useMutableSource", T(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return S = "useSyncExternalStore", T(), id(e, t, n);
      },
      useId: function() {
        return S = "useId", T(), md();
      },
      unstable_isNewReconciler: bn
    }, Ry = {
      readContext: function(e) {
        return Me(e);
      },
      useCallback: function(e, t) {
        return S = "useCallback", T(), Fo(e, t);
      },
      useContext: function(e) {
        return S = "useContext", T(), Me(e);
      },
      useEffect: function(e, t) {
        return S = "useEffect", T(), Al(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return S = "useImperativeHandle", T(), Ho(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return S = "useInsertionEffect", T(), zo(e, t);
      },
      useLayoutEffect: function(e, t) {
        return S = "useLayoutEffect", T(), No(e, t);
      },
      useMemo: function(e, t) {
        S = "useMemo", T();
        var n = M.current;
        M.current = fn;
        try {
          return Vo(e, t);
        } finally {
          M.current = n;
        }
      },
      useReducer: function(e, t, n) {
        S = "useReducer", T();
        var a = M.current;
        M.current = fn;
        try {
          return ad(e, t, n);
        } finally {
          M.current = a;
        }
      },
      useRef: function(e) {
        return S = "useRef", T(), _o();
      },
      useState: function(e) {
        S = "useState", T();
        var t = M.current;
        M.current = fn;
        try {
          return ld(e);
        } finally {
          M.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return S = "useDebugValue", T(), ko();
      },
      useDeferredValue: function(e) {
        return S = "useDeferredValue", T(), dy(e);
      },
      useTransition: function() {
        return S = "useTransition", T(), hy();
      },
      useMutableSource: function(e, t, n) {
        return S = "useMutableSource", T(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return S = "useSyncExternalStore", T(), Uo(e, t);
      },
      useId: function() {
        return S = "useId", T(), Bo();
      },
      unstable_isNewReconciler: bn
    }, xy = {
      readContext: function(e) {
        return Me(e);
      },
      useCallback: function(e, t) {
        return S = "useCallback", T(), Fo(e, t);
      },
      useContext: function(e) {
        return S = "useContext", T(), Me(e);
      },
      useEffect: function(e, t) {
        return S = "useEffect", T(), Al(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return S = "useImperativeHandle", T(), Ho(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return S = "useInsertionEffect", T(), zo(e, t);
      },
      useLayoutEffect: function(e, t) {
        return S = "useLayoutEffect", T(), No(e, t);
      },
      useMemo: function(e, t) {
        S = "useMemo", T();
        var n = M.current;
        M.current = Yo;
        try {
          return Vo(e, t);
        } finally {
          M.current = n;
        }
      },
      useReducer: function(e, t, n) {
        S = "useReducer", T();
        var a = M.current;
        M.current = Yo;
        try {
          return rd(e, t, n);
        } finally {
          M.current = a;
        }
      },
      useRef: function(e) {
        return S = "useRef", T(), _o();
      },
      useState: function(e) {
        S = "useState", T();
        var t = M.current;
        M.current = Yo;
        try {
          return ud(e);
        } finally {
          M.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return S = "useDebugValue", T(), ko();
      },
      useDeferredValue: function(e) {
        return S = "useDeferredValue", T(), vy(e);
      },
      useTransition: function() {
        return S = "useTransition", T(), my();
      },
      useMutableSource: function(e, t, n) {
        return S = "useMutableSource", T(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return S = "useSyncExternalStore", T(), Uo(e, t);
      },
      useId: function() {
        return S = "useId", T(), Bo();
      },
      unstable_isNewReconciler: bn
    }, Ln = {
      readContext: function(e) {
        return yd(), Me(e);
      },
      useCallback: function(e, t) {
        return S = "useCallback", V(), ne(), dd(e, t);
      },
      useContext: function(e) {
        return S = "useContext", V(), ne(), Me(e);
      },
      useEffect: function(e, t) {
        return S = "useEffect", V(), ne(), Ao(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return S = "useImperativeHandle", V(), ne(), fd(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return S = "useInsertionEffect", V(), ne(), sd(e, t);
      },
      useLayoutEffect: function(e, t) {
        return S = "useLayoutEffect", V(), ne(), cd(e, t);
      },
      useMemo: function(e, t) {
        S = "useMemo", V(), ne();
        var n = M.current;
        M.current = Ln;
        try {
          return vd(e, t);
        } finally {
          M.current = n;
        }
      },
      useReducer: function(e, t, n) {
        S = "useReducer", V(), ne();
        var a = M.current;
        M.current = Ln;
        try {
          return nd(e, t, n);
        } finally {
          M.current = a;
        }
      },
      useRef: function(e) {
        return S = "useRef", V(), ne(), od(e);
      },
      useState: function(e) {
        S = "useState", V(), ne();
        var t = M.current;
        M.current = Ln;
        try {
          return Lo(e);
        } finally {
          M.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return S = "useDebugValue", V(), ne(), void 0;
      },
      useDeferredValue: function(e) {
        return S = "useDeferredValue", V(), ne(), pd(e);
      },
      useTransition: function() {
        return S = "useTransition", V(), ne(), hd();
      },
      useMutableSource: function(e, t, n) {
        return S = "useMutableSource", V(), ne(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return S = "useSyncExternalStore", V(), ne(), id(e, t, n);
      },
      useId: function() {
        return S = "useId", V(), ne(), md();
      },
      unstable_isNewReconciler: bn
    }, fn = {
      readContext: function(e) {
        return yd(), Me(e);
      },
      useCallback: function(e, t) {
        return S = "useCallback", V(), T(), Fo(e, t);
      },
      useContext: function(e) {
        return S = "useContext", V(), T(), Me(e);
      },
      useEffect: function(e, t) {
        return S = "useEffect", V(), T(), Al(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return S = "useImperativeHandle", V(), T(), Ho(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return S = "useInsertionEffect", V(), T(), zo(e, t);
      },
      useLayoutEffect: function(e, t) {
        return S = "useLayoutEffect", V(), T(), No(e, t);
      },
      useMemo: function(e, t) {
        S = "useMemo", V(), T();
        var n = M.current;
        M.current = fn;
        try {
          return Vo(e, t);
        } finally {
          M.current = n;
        }
      },
      useReducer: function(e, t, n) {
        S = "useReducer", V(), T();
        var a = M.current;
        M.current = fn;
        try {
          return ad(e, t, n);
        } finally {
          M.current = a;
        }
      },
      useRef: function(e) {
        return S = "useRef", V(), T(), _o();
      },
      useState: function(e) {
        S = "useState", V(), T();
        var t = M.current;
        M.current = fn;
        try {
          return ld(e);
        } finally {
          M.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return S = "useDebugValue", V(), T(), ko();
      },
      useDeferredValue: function(e) {
        return S = "useDeferredValue", V(), T(), dy(e);
      },
      useTransition: function() {
        return S = "useTransition", V(), T(), hy();
      },
      useMutableSource: function(e, t, n) {
        return S = "useMutableSource", V(), T(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return S = "useSyncExternalStore", V(), T(), Uo(e, t);
      },
      useId: function() {
        return S = "useId", V(), T(), Bo();
      },
      unstable_isNewReconciler: bn
    }, Yo = {
      readContext: function(e) {
        return yd(), Me(e);
      },
      useCallback: function(e, t) {
        return S = "useCallback", V(), T(), Fo(e, t);
      },
      useContext: function(e) {
        return S = "useContext", V(), T(), Me(e);
      },
      useEffect: function(e, t) {
        return S = "useEffect", V(), T(), Al(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return S = "useImperativeHandle", V(), T(), Ho(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return S = "useInsertionEffect", V(), T(), zo(e, t);
      },
      useLayoutEffect: function(e, t) {
        return S = "useLayoutEffect", V(), T(), No(e, t);
      },
      useMemo: function(e, t) {
        S = "useMemo", V(), T();
        var n = M.current;
        M.current = fn;
        try {
          return Vo(e, t);
        } finally {
          M.current = n;
        }
      },
      useReducer: function(e, t, n) {
        S = "useReducer", V(), T();
        var a = M.current;
        M.current = fn;
        try {
          return rd(e, t, n);
        } finally {
          M.current = a;
        }
      },
      useRef: function(e) {
        return S = "useRef", V(), T(), _o();
      },
      useState: function(e) {
        S = "useState", V(), T();
        var t = M.current;
        M.current = fn;
        try {
          return ud(e);
        } finally {
          M.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return S = "useDebugValue", V(), T(), ko();
      },
      useDeferredValue: function(e) {
        return S = "useDeferredValue", V(), T(), vy(e);
      },
      useTransition: function() {
        return S = "useTransition", V(), T(), my();
      },
      useMutableSource: function(e, t, n) {
        return S = "useMutableSource", V(), T(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return S = "useSyncExternalStore", V(), T(), Uo(e, t);
      },
      useId: function() {
        return S = "useId", V(), T(), Bo();
      },
      unstable_isNewReconciler: bn
    };
  }
  var _a = Fe.unstable_now, Dy = 0, $o = -1, zl = -1, qo = -1, gd = !1, Go = !1;
  function Oy() {
    return gd;
  }
  function gD() {
    Go = !0;
  }
  function bD() {
    gd = !1, Go = !1;
  }
  function SD() {
    gd = Go, Go = !1;
  }
  function My() {
    return Dy;
  }
  function Uy() {
    Dy = _a();
  }
  function bd(e) {
    zl = _a(), e.actualStartTime < 0 && (e.actualStartTime = _a());
  }
  function Ly(e) {
    zl = -1;
  }
  function Qo(e, t) {
    if (zl >= 0) {
      var n = _a() - zl;
      e.actualDuration += n, t && (e.selfBaseDuration = n), zl = -1;
    }
  }
  function _n(e) {
    if ($o >= 0) {
      var t = _a() - $o;
      $o = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case B:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case Ut:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function Sd(e) {
    if (qo >= 0) {
      var t = _a() - qo;
      qo = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case B:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case Ut:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function wn() {
    $o = _a();
  }
  function Cd() {
    qo = _a();
  }
  function Ed(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function dn(e, t) {
    if (e && e.defaultProps) {
      var n = J({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var Td = {}, Rd, xd, Dd, Od, Md, _y, Xo, Ud, Ld, _d, Nl;
  {
    Rd = /* @__PURE__ */ new Set(), xd = /* @__PURE__ */ new Set(), Dd = /* @__PURE__ */ new Set(), Od = /* @__PURE__ */ new Set(), Ud = /* @__PURE__ */ new Set(), Md = /* @__PURE__ */ new Set(), Ld = /* @__PURE__ */ new Set(), _d = /* @__PURE__ */ new Set(), Nl = /* @__PURE__ */ new Set();
    var wy = /* @__PURE__ */ new Set();
    Xo = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        wy.has(n) || (wy.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, _y = function(e, t) {
      if (t === void 0) {
        var n = de(e) || "Component";
        Md.has(n) || (Md.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(Td, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(Td);
  }
  function wd(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & be) {
        Ye(!0);
        try {
          i = n(a, r);
        } finally {
          Ye(!1);
        }
      }
      _y(t, i);
    }
    var l = i == null ? r : J({}, r, i);
    if (e.memoizedState = l, e.lanes === C) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Ad = {
    isMounted: fC,
    enqueueSetState: function(e, t, n) {
      var a = Lr(e), r = mt(), i = Na(a), l = na(r, i);
      l.payload = t, n != null && (Xo(n, "setState"), l.callback = n);
      var u = Oa(a, l, i);
      u !== null && (ke(u, a, i, r), Eo(u, a, i)), sc(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = Lr(e), r = mt(), i = Na(a), l = na(r, i);
      l.tag = Zm, l.payload = t, n != null && (Xo(n, "replaceState"), l.callback = n);
      var u = Oa(a, l, i);
      u !== null && (ke(u, a, i, r), Eo(u, a, i)), sc(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = Lr(e), a = mt(), r = Na(n), i = na(a, r);
      i.tag = bo, t != null && (Xo(t, "forceUpdate"), i.callback = t);
      var l = Oa(n, i, r);
      l !== null && (ke(l, n, r, a), Eo(l, n, r)), YC(n, r);
    }
  };
  function Ay(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var o = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & be) {
          Ye(!0);
          try {
            o = u.shouldComponentUpdate(a, i, l);
          } finally {
            Ye(!1);
          }
        }
        o === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", de(t) || "Component");
      }
      return o;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !al(n, a) || !al(r, i) : !0;
  }
  function CD(e, t, n) {
    var a = e.stateNode;
    {
      var r = de(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Nl.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & be) === A && (Nl.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Nl.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & be) === A && (Nl.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Ld.has(t) && (Ld.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", de(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !Dd.has(t) && (Dd.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", de(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || ft(u)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function zy(e, t) {
    t.updater = Ad, e.stateNode = t, uC(t, e), t._reactInternalInstance = Td;
  }
  function Ny(e, t, n) {
    var a = !1, r = Ft, i = Ft, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === Rs && l._context === void 0
      );
      if (!u && !_d.has(t)) {
        _d.add(t);
        var o = "";
        l === void 0 ? o = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? o = " However, it is set to a " + typeof l + "." : l.$$typeof === Ts ? o = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? o = " Did you accidentally pass the Context.Consumer instead?" : o = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", de(t) || "Component", o);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Me(l);
    else {
      r = Zr(e, t, !0);
      var s = t.contextTypes;
      a = s != null, i = a ? Jr(e, r) : Ft;
    }
    var c = new t(n, i);
    if (e.mode & be) {
      Ye(!0);
      try {
        c = new t(n, i);
      } finally {
        Ye(!1);
      }
    }
    var v = e.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null;
    zy(e, c);
    {
      if (typeof t.getDerivedStateFromProps == "function" && v === null) {
        var d = de(t) || "Component";
        xd.has(d) || (xd.add(d), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", d, c.state === null ? "null" : "undefined", d));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function") {
        var m = null, y = null, g = null;
        if (typeof c.componentWillMount == "function" && c.componentWillMount.__suppressDeprecationWarning !== !0 ? m = "componentWillMount" : typeof c.UNSAFE_componentWillMount == "function" && (m = "UNSAFE_componentWillMount"), typeof c.componentWillReceiveProps == "function" && c.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? y = "componentWillReceiveProps" : typeof c.UNSAFE_componentWillReceiveProps == "function" && (y = "UNSAFE_componentWillReceiveProps"), typeof c.componentWillUpdate == "function" && c.componentWillUpdate.__suppressDeprecationWarning !== !0 ? g = "componentWillUpdate" : typeof c.UNSAFE_componentWillUpdate == "function" && (g = "UNSAFE_componentWillUpdate"), m !== null || y !== null || g !== null) {
          var R = de(t) || "Component", w = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Od.has(R) || (Od.add(R), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, R, w, m !== null ? `
  ` + m : "", y !== null ? `
  ` + y : "", g !== null ? `
  ` + g : ""));
        }
      }
    }
    return a && Rm(e, r, i), c;
  }
  function ED(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", $(e) || "Component"), Ad.enqueueReplaceState(t, t.state, null));
  }
  function Hy(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = $(e) || "Component";
        Rd.has(i) || (Rd.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Ad.enqueueReplaceState(t, t.state, null);
    }
  }
  function zd(e, t, n, a) {
    CD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, $f(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Me(i);
    else {
      var l = Zr(e, t, !0);
      r.context = Jr(e, l);
    }
    {
      if (r.state === n) {
        var u = de(t) || "Component";
        Ud.has(u) || (Ud.add(u), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & be && sn.recordLegacyContextWarning(e, r), sn.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var o = t.getDerivedStateFromProps;
    if (typeof o == "function" && (wd(e, t, o, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (ED(e, r), To(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var s = ee;
      s |= Xa, (e.mode & Rn) !== A && (s |= ha), e.flags |= s;
    }
  }
  function TD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, o = Ft;
    if (typeof u == "object" && u !== null)
      o = Me(u);
    else {
      var s = Zr(e, t, !0);
      o = Jr(e, s);
    }
    var c = t.getDerivedStateFromProps, v = typeof c == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !v && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== o) && Hy(e, r, n, o), Wm();
    var d = e.memoizedState, m = r.state = d;
    if (To(e, n, r, a), m = e.memoizedState, i === n && d === m && !ao() && !Ro()) {
      if (typeof r.componentDidMount == "function") {
        var y = ee;
        y |= Xa, (e.mode & Rn) !== A && (y |= ha), e.flags |= y;
      }
      return !1;
    }
    typeof c == "function" && (wd(e, t, c, n), m = e.memoizedState);
    var g = Ro() || Ay(e, t, i, n, d, m, o);
    if (g) {
      if (!v && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var R = ee;
        R |= Xa, (e.mode & Rn) !== A && (R |= ha), e.flags |= R;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var w = ee;
        w |= Xa, (e.mode & Rn) !== A && (w |= ha), e.flags |= w;
      }
      e.memoizedProps = n, e.memoizedState = m;
    }
    return r.props = n, r.state = m, r.context = o, g;
  }
  function RD(e, t, n, a, r) {
    var i = t.stateNode;
    Jm(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : dn(t.type, l);
    i.props = u;
    var o = t.pendingProps, s = i.context, c = n.contextType, v = Ft;
    if (typeof c == "object" && c !== null)
      v = Me(c);
    else {
      var d = Zr(t, n, !0);
      v = Jr(t, d);
    }
    var m = n.getDerivedStateFromProps, y = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !y && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== o || s !== v) && Hy(t, i, a, v), Wm();
    var g = t.memoizedState, R = i.state = g;
    if (To(t, a, i, r), R = t.memoizedState, l === o && g === R && !ao() && !Ro() && !bi)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || g !== e.memoizedState) && (t.flags |= ee), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || g !== e.memoizedState) && (t.flags |= wr), !1;
    typeof m == "function" && (wd(t, n, m, a), R = t.memoizedState);
    var w = Ro() || Ay(t, n, u, a, g, R, v) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    bi;
    return w ? (!y && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, R, v), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, R, v)), typeof i.componentDidUpdate == "function" && (t.flags |= ee), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= wr)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || g !== e.memoizedState) && (t.flags |= ee), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || g !== e.memoizedState) && (t.flags |= wr), t.memoizedProps = a, t.memoizedState = R), i.props = a, i.state = R, i.context = v, w;
  }
  function fr(e, t) {
    return {
      value: e,
      source: t,
      stack: Iv(t),
      digest: null
    };
  }
  function Nd(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function xD(e, t) {
    return !0;
  }
  function Hd(e, t) {
    try {
      var n = xD(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === Y)
          return;
        console.error(a);
      }
      var u = r ? $(r) : null, o = u ? "The above error occurred in the <" + u + "> component:" : "The above error occurred in one of your React components:", s;
      if (e.tag === B)
        s = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var c = $(e) || "Anonymous";
        s = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + c + ".");
      }
      var v = o + `
` + l + `

` + ("" + s);
      console.error(v);
    } catch (d) {
      setTimeout(function() {
        throw d;
      });
    }
  }
  var DD = typeof WeakMap == "function" ? WeakMap : Map;
  function ky(e, t, n) {
    var a = na(me, n);
    a.tag = jf, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      gO(r), Hd(e, t);
    }, a;
  }
  function kd(e, t, n) {
    var a = na(me, n);
    a.tag = jf;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        Kg(e), Hd(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      Kg(e), Hd(e, t), typeof r != "function" && mO(this);
      var o = t.value, s = t.stack;
      this.componentDidCatch(o, {
        componentStack: s !== null ? s : ""
      }), typeof r != "function" && (zt(e.lanes, F) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", $(e) || "Unknown"));
    }), a;
  }
  function Fy(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new DD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = bO.bind(null, e, t, n);
      rn && Il(e, n), t.then(i, i);
    }
  }
  function OD(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function MD(e, t) {
    var n = e.tag;
    if ((e.mode & X) === A && (n === P || n === re || n === fe)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function Vy(e) {
    var t = e;
    do {
      if (t.tag === ce && oD(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function By(e, t, n, a, r) {
    if ((e.mode & X) === A) {
      if (e === t)
        e.flags |= vt;
      else {
        if (e.flags |= te, n.flags |= tc, n.flags &= -52805, n.tag === Y) {
          var i = n.alternate;
          if (i === null)
            n.tag = Ge;
          else {
            var l = na(me, F);
            l.tag = bo, Oa(n, l, F);
          }
        }
        n.lanes = q(n.lanes, F);
      }
      return e;
    }
    return e.flags |= vt, e.lanes = r, e;
  }
  function UD(e, t, n, a, r) {
    if (n.flags |= Cu, rn && Il(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      MD(n), Ke() && n.mode & X && _m();
      var l = Vy(t);
      if (l !== null) {
        l.flags &= ~Gn, By(l, t, n, e, r), l.mode & X && Fy(e, i, r), OD(l, e, i);
        return;
      } else {
        if (!WC(r)) {
          Fy(e, i, r), mv();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (Ke() && n.mode & X) {
      _m();
      var o = Vy(t);
      if (o !== null) {
        (o.flags & vt) === N && (o.flags |= Gn), By(o, t, n, e, r), Uf(fr(a, n));
        return;
      }
    }
    a = fr(a, n), oO(a);
    var s = t;
    do {
      switch (s.tag) {
        case B: {
          var c = a;
          s.flags |= vt;
          var v = Yi(r);
          s.lanes = q(s.lanes, v);
          var d = ky(s, c, v);
          qf(s, d);
          return;
        }
        case Y:
          var m = a, y = s.type, g = s.stateNode;
          if ((s.flags & te) === N && (typeof y.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && !Vg(g))) {
            s.flags |= vt;
            var R = Yi(r);
            s.lanes = q(s.lanes, R);
            var w = kd(s, m, R);
            qf(s, w);
            return;
          }
          break;
      }
      s = s.return;
    } while (s !== null);
  }
  function LD() {
    return null;
  }
  var Hl = Re.ReactCurrentOwner, vn = !1, Fd, kl, Vd, Bd, jd, dr, Yd, Ko, Fl;
  Fd = {}, kl = {}, Vd = {}, Bd = {}, jd = {}, dr = !1, Yd = {}, Ko = {}, Fl = {};
  function pt(e, t, n, a) {
    e === null ? t.child = $m(t, null, n, a) : t.child = ei(t, e.child, n, a);
  }
  function _D(e, t, n, a) {
    t.child = ei(t, e.child, null, a), t.child = ei(t, null, n, a);
  }
  function jy(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && un(
        i,
        a,
        // Resolved props
        "prop",
        de(n)
      );
    }
    var l = n.render, u = t.ref, o, s;
    ni(t, r), Hi(t);
    {
      if (Hl.current = t, En(!0), o = oi(e, t, l, a, u, r), s = si(), t.mode & be) {
        Ye(!0);
        try {
          o = oi(e, t, l, a, u, r), s = si();
        } finally {
          Ye(!1);
        }
      }
      En(!1);
    }
    return Nr(), e !== null && !vn ? (ay(e, t, r), aa(e, t, r)) : (Ke() && s && Tf(t), t.flags |= _r, pt(e, t, o, r), t.child);
  }
  function Yy(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (HO(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = yi(i), t.tag = fe, t.type = l, Gd(t, i), $y(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && un(
          u,
          a,
          // Resolved props
          "prop",
          de(i)
        ), n.defaultProps !== void 0) {
          var o = de(i) || "Unknown";
          Fl[o] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", o), Fl[o] = !0);
        }
      }
      var s = Ov(n.type, null, a, t, t.mode, r);
      return s.ref = t.ref, s.return = t, t.child = s, s;
    }
    {
      var c = n.type, v = c.propTypes;
      v && un(
        v,
        a,
        // Resolved props
        "prop",
        de(c)
      );
    }
    var d = e.child, m = Wd(e, r);
    if (!m) {
      var y = d.memoizedProps, g = n.compare;
      if (g = g !== null ? g : al, g(y, a) && e.ref === t.ref)
        return aa(e, t, r);
    }
    t.flags |= _r;
    var R = yr(d, a);
    return R.ref = t.ref, R.return = t, t.child = R, R;
  }
  function $y(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === st) {
        var l = i, u = l._payload, o = l._init;
        try {
          i = o(u);
        } catch {
          i = null;
        }
        var s = i && i.propTypes;
        s && un(
          s,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          de(i)
        );
      }
    }
    if (e !== null) {
      var c = e.memoizedProps;
      if (al(c, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (vn = !1, t.pendingProps = a = c, Wd(e, r))
          (e.flags & tc) !== N && (vn = !0);
        else return t.lanes = e.lanes, aa(e, t, r);
    }
    return $d(e, t, n, a, r);
  }
  function qy(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || br)
      if ((t.mode & X) === A) {
        var l = {
          baseLanes: C,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, us(t, n);
      } else if (zt(n, At)) {
        var v = {
          baseLanes: C,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = v;
        var d = i !== null ? i.baseLanes : n;
        us(t, d);
      } else {
        var u = null, o;
        if (i !== null) {
          var s = i.baseLanes;
          o = q(s, n);
        } else
          o = n;
        t.lanes = t.childLanes = At;
        var c = {
          baseLanes: o,
          cachePool: u,
          transitions: null
        };
        return t.memoizedState = c, t.updateQueue = null, us(t, o), null;
      }
    else {
      var m;
      i !== null ? (m = q(i.baseLanes, n), t.memoizedState = null) : m = n, us(t, m);
    }
    return pt(e, t, r, n), t.child;
  }
  function wD(e, t, n) {
    var a = t.pendingProps;
    return pt(e, t, a, n), t.child;
  }
  function AD(e, t, n) {
    var a = t.pendingProps.children;
    return pt(e, t, a, n), t.child;
  }
  function zD(e, t, n) {
    {
      t.flags |= ee;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return pt(e, t, i, n), t.child;
  }
  function Gy(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ga, t.flags |= nc);
  }
  function $d(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && un(
        i,
        a,
        // Resolved props
        "prop",
        de(n)
      );
    }
    var l;
    {
      var u = Zr(t, n, !0);
      l = Jr(t, u);
    }
    var o, s;
    ni(t, r), Hi(t);
    {
      if (Hl.current = t, En(!0), o = oi(e, t, n, a, l, r), s = si(), t.mode & be) {
        Ye(!0);
        try {
          o = oi(e, t, n, a, l, r), s = si();
        } finally {
          Ye(!1);
        }
      }
      En(!1);
    }
    return Nr(), e !== null && !vn ? (ay(e, t, r), aa(e, t, r)) : (Ke() && s && Tf(t), t.flags |= _r, pt(e, t, o, r), t.child);
  }
  function Qy(e, t, n, a, r) {
    {
      switch (WO(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), o = u.state;
          i.updater.enqueueSetState(i, o, null);
          break;
        }
        case !0: {
          t.flags |= te, t.flags |= vt;
          var s = new Error("Simulated error coming from DevTools"), c = Yi(r);
          t.lanes = q(t.lanes, c);
          var v = kd(t, fr(s, t), c);
          qf(t, v);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var d = n.propTypes;
        d && un(
          d,
          a,
          // Resolved props
          "prop",
          de(n)
        );
      }
    }
    var m;
    On(n) ? (m = !0, io(t)) : m = !1, ni(t, r);
    var y = t.stateNode, g;
    y === null ? (Jo(e, t), Ny(t, n, a), zd(t, n, a, r), g = !0) : e === null ? g = TD(t, n, a, r) : g = RD(e, t, n, a, r);
    var R = qd(e, t, n, g, m, r);
    {
      var w = t.stateNode;
      g && w.props !== a && (dr || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", $(t) || "a component"), dr = !0);
    }
    return R;
  }
  function qd(e, t, n, a, r, i) {
    Gy(e, t);
    var l = (t.flags & te) !== N;
    if (!a && !l)
      return r && Om(t, n, !1), aa(e, t, i);
    var u = t.stateNode;
    Hl.current = t;
    var o;
    if (l && typeof n.getDerivedStateFromError != "function")
      o = null, Ly();
    else {
      Hi(t);
      {
        if (En(!0), o = u.render(), t.mode & be) {
          Ye(!0);
          try {
            u.render();
          } finally {
            Ye(!1);
          }
        }
        En(!1);
      }
      Nr();
    }
    return t.flags |= _r, e !== null && l ? _D(e, t, o, i) : pt(e, t, o, i), t.memoizedState = u.state, r && Om(t, n, !0), t.child;
  }
  function Xy(e) {
    var t = e.stateNode;
    t.pendingContext ? xm(e, t.pendingContext, t.pendingContext !== t.context) : t.context && xm(e, t.context, !1), Gf(e, t.containerInfo);
  }
  function ND(e, t, n) {
    if (Xy(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Jm(e, t), To(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var u = l.element;
    if (r.isDehydrated) {
      var o = {
        element: u,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, s = t.updateQueue;
      if (s.baseState = o, t.memoizedState = o, t.flags & Gn) {
        var c = fr(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return Ky(e, t, u, n, c);
      } else if (u !== i) {
        var v = fr(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Ky(e, t, u, n, v);
      } else {
        Fx(t);
        var d = $m(t, null, u, n);
        t.child = d;
        for (var m = d; m; )
          m.flags = m.flags & ~Oe | Qn, m = m.sibling;
      }
    } else {
      if (Pr(), u === i)
        return aa(e, t, n);
      pt(e, t, u, n);
    }
    return t.child;
  }
  function Ky(e, t, n, a, r) {
    return Pr(), Uf(r), t.flags |= Gn, pt(e, t, n, a), t.child;
  }
  function HD(e, t, n) {
    ey(t), e === null && Mf(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = sf(a, r);
    return u ? l = null : i !== null && sf(a, i) && (t.flags |= zi), Gy(e, t), pt(e, t, l, n), t.child;
  }
  function kD(e, t) {
    return e === null && Mf(t), null;
  }
  function FD(e, t, n, a) {
    Jo(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, o = u(l);
    t.type = o;
    var s = t.tag = kO(o), c = dn(o, r), v;
    switch (s) {
      case P:
        return Gd(t, o), t.type = o = yi(o), v = $d(null, t, o, c, a), v;
      case Y:
        return t.type = o = Cv(o), v = Qy(null, t, o, c, a), v;
      case re:
        return t.type = o = Ev(o), v = jy(null, t, o, c, a), v;
      case Lt: {
        if (t.type !== t.elementType) {
          var d = o.propTypes;
          d && un(
            d,
            c,
            // Resolved for outer only
            "prop",
            de(o)
          );
        }
        return v = Yy(
          null,
          t,
          o,
          dn(o.type, c),
          // The inner type can have defaults too
          a
        ), v;
      }
    }
    var m = "";
    throw o !== null && typeof o == "object" && o.$$typeof === st && (m = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + o + ". " + ("Lazy element type must resolve to a class or function." + m));
  }
  function VD(e, t, n, a, r) {
    Jo(e, t), t.tag = Y;
    var i;
    return On(n) ? (i = !0, io(t)) : i = !1, ni(t, r), Ny(t, n, a), zd(t, n, a, r), qd(null, t, n, !0, i, r);
  }
  function BD(e, t, n, a) {
    Jo(e, t);
    var r = t.pendingProps, i;
    {
      var l = Zr(t, n, !1);
      i = Jr(t, l);
    }
    ni(t, a);
    var u, o;
    Hi(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var s = de(n) || "Unknown";
        Fd[s] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", s, s), Fd[s] = !0);
      }
      t.mode & be && sn.recordLegacyContextWarning(t, null), En(!0), Hl.current = t, u = oi(null, t, n, r, i, a), o = si(), En(!1);
    }
    if (Nr(), t.flags |= _r, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var c = de(n) || "Unknown";
      kl[c] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", c, c, c), kl[c] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var v = de(n) || "Unknown";
        kl[v] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), kl[v] = !0);
      }
      t.tag = Y, t.memoizedState = null, t.updateQueue = null;
      var d = !1;
      return On(n) ? (d = !0, io(t)) : d = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, $f(t), zy(t, u), zd(t, n, r, a), qd(null, t, n, !0, d, a);
    } else {
      if (t.tag = P, t.mode & be) {
        Ye(!0);
        try {
          u = oi(null, t, n, r, i, a), o = si();
        } finally {
          Ye(!1);
        }
      }
      return Ke() && o && Tf(t), pt(null, t, u, a), Gd(t, n), t.child;
    }
  }
  function Gd(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = Mi();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), jd[r] || (jd[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = de(t) || "Unknown";
        Fl[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Fl[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = de(t) || "Unknown";
        Bd[u] || (f("%s: Function components do not support getDerivedStateFromProps.", u), Bd[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var o = de(t) || "Unknown";
        Vd[o] || (f("%s: Function components do not support contextType.", o), Vd[o] = !0);
      }
    }
  }
  var Qd = {
    dehydrated: null,
    treeContext: null,
    retryLane: $e
  };
  function Xd(e) {
    return {
      baseLanes: e,
      cachePool: LD(),
      transitions: null
    };
  }
  function jD(e, t) {
    var n = null;
    return {
      baseLanes: q(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function YD(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return Kf(e, Ol);
  }
  function $D(e, t) {
    return Mu(e.childLanes, t);
  }
  function Zy(e, t, n) {
    var a = t.pendingProps;
    IO(t) && (t.flags |= te);
    var r = cn.current, i = !1, l = (t.flags & te) !== N;
    if (l || YD(r, e) ? (i = !0, t.flags &= ~te) : (e === null || e.memoizedState !== null) && (r = uD(r, ny)), r = ri(r), Ua(t, r), e === null) {
      Mf(t);
      var u = t.memoizedState;
      if (u !== null) {
        var o = u.dehydrated;
        if (o !== null)
          return KD(t, o);
      }
      var s = a.children, c = a.fallback;
      if (i) {
        var v = qD(t, s, c, n), d = t.child;
        return d.memoizedState = Xd(n), t.memoizedState = Qd, v;
      } else
        return Kd(t, s);
    } else {
      var m = e.memoizedState;
      if (m !== null) {
        var y = m.dehydrated;
        if (y !== null)
          return ZD(e, t, l, a, y, m, n);
      }
      if (i) {
        var g = a.fallback, R = a.children, w = QD(e, t, R, g, n), _ = t.child, Z = e.child.memoizedState;
        return _.memoizedState = Z === null ? Xd(n) : jD(Z, n), _.childLanes = $D(e, n), t.memoizedState = Qd, w;
      } else {
        var G = a.children, p = GD(e, t, G, n);
        return t.memoizedState = null, p;
      }
    }
  }
  function Kd(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Zd(r, a);
    return i.return = e, e.child = i, i;
  }
  function qD(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, u, o;
    return (r & X) === A && i !== null ? (u = i, u.childLanes = C, u.pendingProps = l, e.mode & ie && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), o = ka(n, r, a, null)) : (u = Zd(l, r), o = ka(n, r, a, null)), u.return = e, o.return = e, u.sibling = o, e.child = u, o;
  }
  function Zd(e, t, n) {
    return Jg(e, t, C, null);
  }
  function Jy(e, t) {
    return yr(e, t);
  }
  function GD(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Jy(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & X) === A && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= qa) : u.push(i);
    }
    return t.child = l, l;
  }
  function QD(e, t, n, a, r) {
    var i = t.mode, l = e.child, u = l.sibling, o = {
      mode: "hidden",
      children: n
    }, s;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & X) === A && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var c = t.child;
      s = c, s.childLanes = C, s.pendingProps = o, t.mode & ie && (s.actualDuration = 0, s.actualStartTime = -1, s.selfBaseDuration = l.selfBaseDuration, s.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      s = Jy(l, o), s.subtreeFlags = l.subtreeFlags & Xn;
    var v;
    return u !== null ? v = yr(u, a) : (v = ka(a, i, r, null), v.flags |= Oe), v.return = t, s.return = t, s.sibling = v, t.child = s, v;
  }
  function Zo(e, t, n, a) {
    a !== null && Uf(a), ei(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Kd(t, i);
    return l.flags |= Oe, t.memoizedState = null, l;
  }
  function XD(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Zd(l, i), o = ka(a, i, r, null);
    return o.flags |= Oe, u.return = t, o.return = t, u.sibling = o, t.child = u, (t.mode & X) !== A && ei(t, e.child, null, r), o;
  }
  function KD(e, t, n) {
    return (e.mode & X) === A ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = F) : vf(t) ? e.lanes = Ja : e.lanes = At, null;
  }
  function ZD(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & Gn) {
        t.flags &= ~Gn;
        var p = Nd(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Zo(e, t, l, p);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= te, null;
        var b = a.children, h = a.fallback, E = XD(e, t, b, h, l), U = t.child;
        return U.memoizedState = Xd(l), t.memoizedState = Qd, E;
      }
    else {
      if (Hx(), (t.mode & X) === A)
        return Zo(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (vf(r)) {
        var u, o, s;
        {
          var c = PR(r);
          u = c.digest, o = c.message, s = c.stack;
        }
        var v;
        o ? v = new Error(o) : v = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var d = Nd(v, u, s);
        return Zo(e, t, l, d);
      }
      var m = zt(l, e.childLanes);
      if (vn || m) {
        var y = ls();
        if (y !== null) {
          var g = iE(y, l);
          if (g !== $e && g !== i.retryLane) {
            i.retryLane = g;
            var R = me;
            Rt(e, g), ke(y, e, g, R);
          }
        }
        mv();
        var w = Nd(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Zo(e, t, l, w);
      } else if (bm(r)) {
        t.flags |= te, t.child = e.child;
        var _ = SO.bind(null, e);
        return ex(r, _), null;
      } else {
        Vx(t, r, i.treeContext);
        var Z = a.children, G = Kd(t, Z);
        return G.flags |= Qn, G;
      }
    }
  }
  function Wy(e, t, n) {
    e.lanes = q(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = q(a.lanes, t)), Vf(e.return, t, n);
  }
  function JD(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === ce) {
        var r = a.memoizedState;
        r !== null && Wy(a, n, e);
      } else if (a.tag === ot)
        Wy(a, n, e);
      else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === e)
        return;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e)
          return;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
  }
  function WD(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Oo(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function ID(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Yd[e])
      if (Yd[e] = !0, typeof e == "string")
        switch (e.toLowerCase()) {
          case "together":
          case "forwards":
          case "backwards": {
            f('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
            break;
          }
          case "forward":
          case "backward": {
            f('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
            break;
          }
          default:
            f('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
            break;
        }
      else
        f('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
  }
  function PD(e, t) {
    e !== void 0 && !Ko[e] && (e !== "collapsed" && e !== "hidden" ? (Ko[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Ko[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function Iy(e, t) {
    {
      var n = ft(e), a = !n && typeof Ya(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function e0(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (ft(e)) {
        for (var n = 0; n < e.length; n++)
          if (!Iy(e[n], n))
            return;
      } else {
        var a = Ya(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Iy(i.value, l))
                return;
              l++;
            }
        } else
          f('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function Jd(e, t, n, a, r) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: r
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = n, i.tailMode = r);
  }
  function Py(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    ID(r), PD(i, r), e0(l, r), pt(e, t, l, n);
    var u = cn.current, o = Kf(u, Ol);
    if (o)
      u = Zf(u, Ol), t.flags |= te;
    else {
      var s = e !== null && (e.flags & te) !== N;
      s && JD(t, t.child, n), u = ri(u);
    }
    if (Ua(t, u), (t.mode & X) === A)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var c = WD(t.child), v;
          c === null ? (v = t.child, t.child = null) : (v = c.sibling, c.sibling = null), Jd(
            t,
            !1,
            // isBackwards
            v,
            c,
            i
          );
          break;
        }
        case "backwards": {
          var d = null, m = t.child;
          for (t.child = null; m !== null; ) {
            var y = m.alternate;
            if (y !== null && Oo(y) === null) {
              t.child = m;
              break;
            }
            var g = m.sibling;
            m.sibling = d, d = m, m = g;
          }
          Jd(
            t,
            !0,
            // isBackwards
            d,
            null,
            // last
            i
          );
          break;
        }
        case "together": {
          Jd(
            t,
            !1,
            // isBackwards
            null,
            // tail
            null,
            // last
            void 0
          );
          break;
        }
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function t0(e, t, n) {
    Gf(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = ei(t, null, a, n) : pt(e, t, a, n), t.child;
  }
  var eg = !1;
  function n0(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || eg || (eg = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var o = t.type.propTypes;
      o && un(o, i, "prop", "Context.Provider");
    }
    if (Qm(t, r, u), l !== null) {
      var s = l.value;
      if (kt(s, u)) {
        if (l.children === i.children && !ao())
          return aa(e, t, n);
      } else
        Ix(t, r, n);
    }
    var c = i.children;
    return pt(e, t, c, n), t.child;
  }
  var tg = !1;
  function a0(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (tg || (tg = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), ni(t, n);
    var l = Me(a);
    Hi(t);
    var u;
    return Hl.current = t, En(!0), u = i(l), En(!1), Nr(), t.flags |= _r, pt(e, t, u, n), t.child;
  }
  function Vl() {
    vn = !0;
  }
  function Jo(e, t) {
    (t.mode & X) === A && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Oe);
  }
  function aa(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), Ly(), Wl(t.lanes), zt(n, t.childLanes) ? (Jx(e, t), t.child) : null;
  }
  function r0(e, t, n) {
    {
      var a = t.return;
      if (a === null)
        throw new Error("Cannot swap the root fiber.");
      if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, t === a.child)
        a.child = n;
      else {
        var r = a.child;
        if (r === null)
          throw new Error("Expected parent to have a child.");
        for (; r.sibling !== t; )
          if (r = r.sibling, r === null)
            throw new Error("Expected to find the previous sibling.");
        r.sibling = n;
      }
      var i = a.deletions;
      return i === null ? (a.deletions = [e], a.flags |= qa) : i.push(e), n.flags |= Oe, n;
    }
  }
  function Wd(e, t) {
    var n = e.lanes;
    return !!zt(n, t);
  }
  function i0(e, t, n) {
    switch (t.tag) {
      case B:
        Xy(t), t.stateNode, Pr();
        break;
      case z:
        ey(t);
        break;
      case Y: {
        var a = t.type;
        On(a) && io(t);
        break;
      }
      case oe:
        Gf(t, t.stateNode.containerInfo);
        break;
      case gn: {
        var r = t.memoizedProps.value, i = t.type._context;
        Qm(t, i, r);
        break;
      }
      case Ut:
        {
          var l = zt(n, t.childLanes);
          l && (t.flags |= ee);
          {
            var u = t.stateNode;
            u.effectDuration = 0, u.passiveEffectDuration = 0;
          }
        }
        break;
      case ce: {
        var o = t.memoizedState;
        if (o !== null) {
          if (o.dehydrated !== null)
            return Ua(t, ri(cn.current)), t.flags |= te, null;
          var s = t.child, c = s.childLanes;
          if (zt(n, c))
            return Zy(e, t, n);
          Ua(t, ri(cn.current));
          var v = aa(e, t, n);
          return v !== null ? v.sibling : null;
        } else
          Ua(t, ri(cn.current));
        break;
      }
      case ot: {
        var d = (e.flags & te) !== N, m = zt(n, t.childLanes);
        if (d) {
          if (m)
            return Py(e, t, n);
          t.flags |= te;
        }
        var y = t.memoizedState;
        if (y !== null && (y.rendering = null, y.tail = null, y.lastEffect = null), Ua(t, cn.current), m)
          break;
        return null;
      }
      case ae:
      case Pt:
        return t.lanes = C, qy(e, t, n);
    }
    return aa(e, t, n);
  }
  function ng(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return r0(e, t, Ov(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || ao() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        vn = !0;
      else {
        var i = Wd(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & te) === N)
          return vn = !1, i0(e, t, n);
        (e.flags & tc) !== N ? vn = !0 : vn = !1;
      }
    } else if (vn = !1, Ke() && Lx(t)) {
      var l = t.index, u = _x();
      Lm(t, u, l);
    }
    switch (t.lanes = C, t.tag) {
      case bt:
        return BD(e, t, t.type, n);
      case Ba: {
        var o = t.elementType;
        return FD(e, t, o, n);
      }
      case P: {
        var s = t.type, c = t.pendingProps, v = t.elementType === s ? c : dn(s, c);
        return $d(e, t, s, v, n);
      }
      case Y: {
        var d = t.type, m = t.pendingProps, y = t.elementType === d ? m : dn(d, m);
        return Qy(e, t, d, y, n);
      }
      case B:
        return ND(e, t, n);
      case z:
        return HD(e, t, n);
      case pe:
        return kD(e, t);
      case ce:
        return Zy(e, t, n);
      case oe:
        return t0(e, t, n);
      case re: {
        var g = t.type, R = t.pendingProps, w = t.elementType === g ? R : dn(g, R);
        return jy(e, t, g, w, n);
      }
      case sa:
        return wD(e, t, n);
      case gr:
        return AD(e, t, n);
      case Ut:
        return zD(e, t, n);
      case gn:
        return n0(e, t, n);
      case Va:
        return a0(e, t, n);
      case Lt: {
        var _ = t.type, Z = t.pendingProps, G = dn(_, Z);
        if (t.type !== t.elementType) {
          var p = _.propTypes;
          p && un(
            p,
            G,
            // Resolved for outer only
            "prop",
            de(_)
          );
        }
        return G = dn(_.type, G), Yy(e, t, _, G, n);
      }
      case fe:
        return $y(e, t, t.type, t.pendingProps, n);
      case Ge: {
        var b = t.type, h = t.pendingProps, E = t.elementType === b ? h : dn(b, h);
        return VD(e, t, b, E, n);
      }
      case ot:
        return Py(e, t, n);
      case Ue:
        break;
      case ae:
        return qy(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ci(e) {
    e.flags |= ee;
  }
  function ag(e) {
    e.flags |= Ga, e.flags |= nc;
  }
  var rg, Id, ig, lg;
  rg = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === z || r.tag === pe)
        OR(e, r.stateNode);
      else if (r.tag !== oe) {
        if (r.child !== null) {
          r.child.return = r, r = r.child;
          continue;
        }
      }
      if (r === t)
        return;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t)
          return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  }, Id = function(e, t) {
  }, ig = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = Qf(), o = UR(l, n, i, a, r, u);
      t.updateQueue = o, o && ci(t);
    }
  }, lg = function(e, t, n, a) {
    n !== a && ci(t);
  };
  function Bl(e, t) {
    if (!Ke())
      switch (e.tailMode) {
        case "hidden": {
          for (var n = e.tail, a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        }
        case "collapsed": {
          for (var r = e.tail, i = null; r !== null; )
            r.alternate !== null && (i = r), r = r.sibling;
          i === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : i.sibling = null;
          break;
        }
      }
  }
  function Je(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = C, a = N;
    if (t) {
      if ((e.mode & ie) !== A) {
        for (var o = e.selfBaseDuration, s = e.child; s !== null; )
          n = q(n, q(s.lanes, s.childLanes)), a |= s.subtreeFlags & Xn, a |= s.flags & Xn, o += s.treeBaseDuration, s = s.sibling;
        e.treeBaseDuration = o;
      } else
        for (var c = e.child; c !== null; )
          n = q(n, q(c.lanes, c.childLanes)), a |= c.subtreeFlags & Xn, a |= c.flags & Xn, c.return = e, c = c.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & ie) !== A) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = q(n, q(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var u = e.child; u !== null; )
          n = q(n, q(u.lanes, u.childLanes)), a |= u.subtreeFlags, a |= u.flags, u.return = e, u = u.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function l0(e, t, n) {
    if (qx() && (t.mode & X) !== A && (t.flags & te) === N)
      return km(t), Pr(), t.flags |= Gn | Cu | vt, !1;
    var a = co(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (Yx(t), Je(t), (t.mode & ie) !== A) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Pr(), (t.flags & te) === N && (t.memoizedState = null), t.flags |= ee, Je(t), (t.mode & ie) !== A) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return Fm(), !0;
  }
  function ug(e, t, n) {
    var a = t.pendingProps;
    switch (Rf(t), t.tag) {
      case bt:
      case Ba:
      case fe:
      case P:
      case re:
      case sa:
      case gr:
      case Ut:
      case Va:
      case Lt:
        return Je(t), null;
      case Y: {
        var r = t.type;
        return On(r) && ro(t), Je(t), null;
      }
      case B: {
        var i = t.stateNode;
        if (ai(t), Sf(t), Wf(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = co(t);
          if (l)
            ci(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & Gn) !== N) && (t.flags |= wr, Fm());
          }
        }
        return Id(e, t), Je(t), null;
      }
      case z: {
        Xf(t);
        var o = Pm(), s = t.type;
        if (e !== null && t.stateNode != null)
          ig(e, t, s, a, o), e.ref !== t.ref && ag(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return Je(t), null;
          }
          var c = Qf(), v = co(t);
          if (v)
            Bx(t, o, c) && ci(t);
          else {
            var d = DR(s, a, o, c, t);
            rg(d, t, !1, !1), t.stateNode = d, MR(d, s, a, o) && ci(t);
          }
          t.ref !== null && ag(t);
        }
        return Je(t), null;
      }
      case pe: {
        var m = a;
        if (e && t.stateNode != null) {
          var y = e.memoizedProps;
          lg(e, t, y, m);
        } else {
          if (typeof m != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var g = Pm(), R = Qf(), w = co(t);
          w ? jx(t) && ci(t) : t.stateNode = LR(m, g, R, t);
        }
        return Je(t), null;
      }
      case ce: {
        ii(t);
        var _ = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Z = l0(e, t, _);
          if (!Z)
            return t.flags & vt ? t : null;
        }
        if ((t.flags & te) !== N)
          return t.lanes = n, (t.mode & ie) !== A && Ed(t), t;
        var G = _ !== null, p = e !== null && e.memoizedState !== null;
        if (G !== p && G) {
          var b = t.child;
          if (b.flags |= Qa, (t.mode & X) !== A) {
            var h = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            h || Kf(cn.current, ny) ? uO() : mv();
          }
        }
        var E = t.updateQueue;
        if (E !== null && (t.flags |= ee), Je(t), (t.mode & ie) !== A && G) {
          var U = t.child;
          U !== null && (t.treeBaseDuration -= U.treeBaseDuration);
        }
        return null;
      }
      case oe:
        return ai(t), Id(e, t), e === null && Tx(t.stateNode.containerInfo), Je(t), null;
      case gn:
        var x = t.type._context;
        return Ff(x, t), Je(t), null;
      case Ge: {
        var H = t.type;
        return On(H) && ro(t), Je(t), null;
      }
      case ot: {
        ii(t);
        var j = t.memoizedState;
        if (j === null)
          return Je(t), null;
        var ue = (t.flags & te) !== N, W = j.rendering;
        if (W === null)
          if (ue)
            Bl(j, !1);
          else {
            var Te = sO() && (e === null || (e.flags & te) === N);
            if (!Te)
              for (var I = t.child; I !== null; ) {
                var Se = Oo(I);
                if (Se !== null) {
                  ue = !0, t.flags |= te, Bl(j, !1);
                  var lt = Se.updateQueue;
                  return lt !== null && (t.updateQueue = lt, t.flags |= ee), t.subtreeFlags = N, Wx(t, n), Ua(t, Zf(cn.current, Ol)), t.child;
                }
                I = I.sibling;
              }
            j.tail !== null && je() > Mg() && (t.flags |= te, ue = !0, Bl(j, !1), t.lanes = lh);
          }
        else {
          if (!ue) {
            var tt = Oo(W);
            if (tt !== null) {
              t.flags |= te, ue = !0;
              var Bt = tt.updateQueue;
              if (Bt !== null && (t.updateQueue = Bt, t.flags |= ee), Bl(j, !0), j.tail === null && j.tailMode === "hidden" && !W.alternate && !Ke())
                return Je(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            je() * 2 - j.renderingStartTime > Mg() && n !== At && (t.flags |= te, ue = !0, Bl(j, !1), t.lanes = lh);
          }
          if (j.isBackwards)
            W.sibling = t.child, t.child = W;
          else {
            var yt = j.last;
            yt !== null ? yt.sibling = W : t.child = W, j.last = W;
          }
        }
        if (j.tail !== null) {
          var gt = j.tail;
          j.rendering = gt, j.tail = gt.sibling, j.renderingStartTime = je(), gt.sibling = null;
          var ut = cn.current;
          return ue ? ut = Zf(ut, Ol) : ut = ri(ut), Ua(t, ut), gt;
        }
        return Je(t), null;
      }
      case Ue:
        break;
      case ae:
      case Pt: {
        hv(t);
        var oa = t.memoizedState, gi = oa !== null;
        if (e !== null) {
          var nu = e.memoizedState, Nn = nu !== null;
          Nn !== gi && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !br && (t.flags |= Qa);
        }
        return !gi || (t.mode & X) === A ? Je(t) : zt(zn, At) && (Je(t), t.subtreeFlags & (Oe | ee) && (t.flags |= Qa)), null;
      }
      case en:
        return null;
      case Hn:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function u0(e, t, n) {
    switch (Rf(t), t.tag) {
      case Y: {
        var a = t.type;
        On(a) && ro(t);
        var r = t.flags;
        return r & vt ? (t.flags = r & ~vt | te, (t.mode & ie) !== A && Ed(t), t) : null;
      }
      case B: {
        t.stateNode, ai(t), Sf(t), Wf();
        var i = t.flags;
        return (i & vt) !== N && (i & te) === N ? (t.flags = i & ~vt | te, t) : null;
      }
      case z:
        return Xf(t), null;
      case ce: {
        ii(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Pr();
        }
        var u = t.flags;
        return u & vt ? (t.flags = u & ~vt | te, (t.mode & ie) !== A && Ed(t), t) : null;
      }
      case ot:
        return ii(t), null;
      case oe:
        return ai(t), null;
      case gn:
        var o = t.type._context;
        return Ff(o, t), null;
      case ae:
      case Pt:
        return hv(t), null;
      case en:
        return null;
      default:
        return null;
    }
  }
  function og(e, t, n) {
    switch (Rf(t), t.tag) {
      case Y: {
        var a = t.type.childContextTypes;
        a != null && ro(t);
        break;
      }
      case B: {
        t.stateNode, ai(t), Sf(t), Wf();
        break;
      }
      case z: {
        Xf(t);
        break;
      }
      case oe:
        ai(t);
        break;
      case ce:
        ii(t);
        break;
      case ot:
        ii(t);
        break;
      case gn:
        var r = t.type._context;
        Ff(r, t);
        break;
      case ae:
      case Pt:
        hv(t);
        break;
    }
  }
  var sg = null;
  sg = /* @__PURE__ */ new Set();
  var Wo = !1, We = !1, o0 = typeof WeakSet == "function" ? WeakSet : Set, L = null, fi = null, di = null;
  function s0(e) {
    Is(null, function() {
      throw e;
    }), Ps();
  }
  var c0 = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & ie)
      try {
        wn(), t.componentWillUnmount();
      } finally {
        _n(e);
      }
    else
      t.componentWillUnmount();
  };
  function cg(e, t) {
    try {
      wa(_e, e);
    } catch (n) {
      ve(e, t, n);
    }
  }
  function Pd(e, t, n) {
    try {
      c0(e, n);
    } catch (a) {
      ve(e, t, a);
    }
  }
  function f0(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      ve(e, t, a);
    }
  }
  function fg(e, t) {
    try {
      vg(e);
    } catch (n) {
      ve(e, t, n);
    }
  }
  function vi(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (Ci && hs && e.mode & ie)
            try {
              wn(), a = n(null);
            } finally {
              _n(e);
            }
          else
            a = n(null);
        } catch (r) {
          ve(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", $(e));
      } else
        n.current = null;
  }
  function Io(e, t, n) {
    try {
      n();
    } catch (a) {
      ve(e, t, a);
    }
  }
  var dg = !1;
  function d0(e, t) {
    RR(e.containerInfo), L = t, v0();
    var n = dg;
    return dg = !1, n;
  }
  function v0() {
    for (; L !== null; ) {
      var e = L, t = e.child;
      (e.subtreeFlags & ic) !== N && t !== null ? (t.return = e, L = t) : p0();
    }
  }
  function p0() {
    for (; L !== null; ) {
      var e = L;
      Ee(e);
      try {
        h0(e);
      } catch (n) {
        ve(e, e.return, n);
      }
      ct();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, L = t;
        return;
      }
      L = e.return;
    }
  }
  function h0(e) {
    var t = e.alternate, n = e.flags;
    if ((n & wr) !== N) {
      switch (Ee(e), e.tag) {
        case P:
        case re:
        case fe:
          break;
        case Y: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !dr && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", $(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", $(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : dn(e.type, a), r);
            {
              var u = sg;
              l === void 0 && !u.has(e.type) && (u.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", $(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case B: {
          {
            var o = e.stateNode;
            ZR(o.containerInfo);
          }
          break;
        }
        case z:
        case pe:
        case oe:
        case Ge:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      ct();
    }
  }
  function pn(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & Ze) !== xt ? LC(t) : (e & _e) !== xt && th(t), (e & Mn) !== xt && Pl(!0), Io(t, n, u), (e & Mn) !== xt && Pl(!1), (e & Ze) !== xt ? _C() : (e & _e) !== xt && nh());
        }
        l = l.next;
      } while (l !== i);
    }
  }
  function wa(e, t) {
    var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var r = a.next, i = r;
      do {
        if ((i.tag & e) === e) {
          (e & Ze) !== xt ? MC(t) : (e & _e) !== xt && wC(t);
          var l = i.create;
          (e & Mn) !== xt && Pl(!0), i.destroy = l(), (e & Mn) !== xt && Pl(!1), (e & Ze) !== xt ? UC() : (e & _e) !== xt && AC();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var o = void 0;
              (i.tag & _e) !== N ? o = "useLayoutEffect" : (i.tag & Mn) !== N ? o = "useInsertionEffect" : o = "useEffect";
              var s = void 0;
              u === null ? s = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof u.then == "function" ? s = `

It looks like you wrote ` + o + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + o + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : s = " You returned: " + u, f("%s must not return anything besides a function, which is used for clean-up.%s", o, s);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function m0(e, t) {
    if ((t.flags & ee) !== N)
      switch (t.tag) {
        case Ut: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = My(), u = t.alternate === null ? "mount" : "update";
          Oy() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var o = t.return;
          e: for (; o !== null; ) {
            switch (o.tag) {
              case B:
                var s = o.stateNode;
                s.passiveEffectDuration += n;
                break e;
              case Ut:
                var c = o.stateNode;
                c.passiveEffectDuration += n;
                break e;
            }
            o = o.return;
          }
          break;
        }
      }
  }
  function y0(e, t, n, a) {
    if ((n.flags & Ni) !== N)
      switch (n.tag) {
        case P:
        case re:
        case fe: {
          if (!We)
            if (n.mode & ie)
              try {
                wn(), wa(_e | Le, n);
              } finally {
                _n(n);
              }
            else
              wa(_e | Le, n);
          break;
        }
        case Y: {
          var r = n.stateNode;
          if (n.flags & ee && !We)
            if (t === null)
              if (n.type === n.elementType && !dr && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", $(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", $(n) || "instance")), n.mode & ie)
                try {
                  wn(), r.componentDidMount();
                } finally {
                  _n(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : dn(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !dr && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", $(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", $(n) || "instance")), n.mode & ie)
                try {
                  wn(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  _n(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !dr && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", $(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", $(n) || "instance")), Im(n, u, r));
          break;
        }
        case B: {
          var o = n.updateQueue;
          if (o !== null) {
            var s = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case z:
                  s = n.child.stateNode;
                  break;
                case Y:
                  s = n.child.stateNode;
                  break;
              }
            Im(n, o, s);
          }
          break;
        }
        case z: {
          var c = n.stateNode;
          if (t === null && n.flags & ee) {
            var v = n.type, d = n.memoizedProps;
            NR(c, v, d);
          }
          break;
        }
        case pe:
          break;
        case oe:
          break;
        case Ut: {
          {
            var m = n.memoizedProps, y = m.onCommit, g = m.onRender, R = n.stateNode.effectDuration, w = My(), _ = t === null ? "mount" : "update";
            Oy() && (_ = "nested-update"), typeof g == "function" && g(n.memoizedProps.id, _, n.actualDuration, n.treeBaseDuration, n.actualStartTime, w);
            {
              typeof y == "function" && y(n.memoizedProps.id, _, R, w), pO(n);
              var Z = n.return;
              e: for (; Z !== null; ) {
                switch (Z.tag) {
                  case B:
                    var G = Z.stateNode;
                    G.effectDuration += R;
                    break e;
                  case Ut:
                    var p = Z.stateNode;
                    p.effectDuration += R;
                    break e;
                }
                Z = Z.return;
              }
            }
          }
          break;
        }
        case ce: {
          x0(e, n);
          break;
        }
        case ot:
        case Ge:
        case Ue:
        case ae:
        case Pt:
        case Hn:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    We || n.flags & Ga && vg(n);
  }
  function g0(e) {
    switch (e.tag) {
      case P:
      case re:
      case fe: {
        if (e.mode & ie)
          try {
            wn(), cg(e, e.return);
          } finally {
            _n(e);
          }
        else
          cg(e, e.return);
        break;
      }
      case Y: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && f0(e, e.return, t), fg(e, e.return);
        break;
      }
      case z: {
        fg(e, e.return);
        break;
      }
    }
  }
  function b0(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === z) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? GR(r) : XR(a.stateNode, a.memoizedProps);
          } catch (l) {
            ve(e, e.return, l);
          }
        }
      } else if (a.tag === pe) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? QR(i) : KR(i, a.memoizedProps);
          } catch (l) {
            ve(e, e.return, l);
          }
      } else if (!((a.tag === ae || a.tag === Pt) && a.memoizedState !== null && a !== e)) {
        if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
      }
      if (a === e)
        return;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e)
          return;
        n === a && (n = null), a = a.return;
      }
      n === a && (n = null), a.sibling.return = a.return, a = a.sibling;
    }
  }
  function vg(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode, a;
      switch (e.tag) {
        case z:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & ie)
          try {
            wn(), r = t(a);
          } finally {
            _n(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", $(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", $(e)), t.current = a;
    }
  }
  function S0(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function pg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, pg(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === z) {
        var n = e.stateNode;
        n !== null && Dx(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function C0(e) {
    for (var t = e.return; t !== null; ) {
      if (hg(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function hg(e) {
    return e.tag === z || e.tag === B || e.tag === oe;
  }
  function mg(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || hg(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== z && t.tag !== pe && t.tag !== St; ) {
        if (t.flags & Oe || t.child === null || t.tag === oe)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Oe))
        return t.stateNode;
    }
  }
  function E0(e) {
    var t = C0(e);
    switch (t.tag) {
      case z: {
        var n = t.stateNode;
        t.flags & zi && (gm(n), t.flags &= ~zi);
        var a = mg(e);
        tv(e, a, n);
        break;
      }
      case B:
      case oe: {
        var r = t.stateNode.containerInfo, i = mg(e);
        ev(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function ev(e, t, n) {
    var a = e.tag, r = a === z || a === pe;
    if (r) {
      var i = e.stateNode;
      t ? jR(n, i, t) : VR(n, i);
    } else if (a !== oe) {
      var l = e.child;
      if (l !== null) {
        ev(l, t, n);
        for (var u = l.sibling; u !== null; )
          ev(u, t, n), u = u.sibling;
      }
    }
  }
  function tv(e, t, n) {
    var a = e.tag, r = a === z || a === pe;
    if (r) {
      var i = e.stateNode;
      t ? BR(n, i, t) : FR(n, i);
    } else if (a !== oe) {
      var l = e.child;
      if (l !== null) {
        tv(l, t, n);
        for (var u = l.sibling; u !== null; )
          tv(u, t, n), u = u.sibling;
      }
    }
  }
  var Ie = null, hn = !1;
  function T0(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case z: {
            Ie = a.stateNode, hn = !1;
            break e;
          }
          case B: {
            Ie = a.stateNode.containerInfo, hn = !0;
            break e;
          }
          case oe: {
            Ie = a.stateNode.containerInfo, hn = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (Ie === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      yg(e, t, n), Ie = null, hn = !1;
    }
    S0(n);
  }
  function Aa(e, t, n) {
    for (var a = n.child; a !== null; )
      yg(e, t, a), a = a.sibling;
  }
  function yg(e, t, n) {
    switch (RC(n), n.tag) {
      case z:
        We || vi(n, t);
      case pe: {
        {
          var a = Ie, r = hn;
          Ie = null, Aa(e, t, n), Ie = a, hn = r, Ie !== null && (hn ? $R(Ie, n.stateNode) : YR(Ie, n.stateNode));
        }
        return;
      }
      case St: {
        Ie !== null && (hn ? qR(Ie, n.stateNode) : df(Ie, n.stateNode));
        return;
      }
      case oe: {
        {
          var i = Ie, l = hn;
          Ie = n.stateNode.containerInfo, hn = !0, Aa(e, t, n), Ie = i, hn = l;
        }
        return;
      }
      case P:
      case re:
      case Lt:
      case fe: {
        if (!We) {
          var u = n.updateQueue;
          if (u !== null) {
            var o = u.lastEffect;
            if (o !== null) {
              var s = o.next, c = s;
              do {
                var v = c, d = v.destroy, m = v.tag;
                d !== void 0 && ((m & Mn) !== xt ? Io(n, t, d) : (m & _e) !== xt && (th(n), n.mode & ie ? (wn(), Io(n, t, d), _n(n)) : Io(n, t, d), nh())), c = c.next;
              } while (c !== s);
            }
          }
        }
        Aa(e, t, n);
        return;
      }
      case Y: {
        if (!We) {
          vi(n, t);
          var y = n.stateNode;
          typeof y.componentWillUnmount == "function" && Pd(n, t, y);
        }
        Aa(e, t, n);
        return;
      }
      case Ue: {
        Aa(e, t, n);
        return;
      }
      case ae: {
        if (
          // TODO: Remove this dead flag
          n.mode & X
        ) {
          var g = We;
          We = g || n.memoizedState !== null, Aa(e, t, n), We = g;
        } else
          Aa(e, t, n);
        break;
      }
      default: {
        Aa(e, t, n);
        return;
      }
    }
  }
  function R0(e) {
    e.memoizedState;
  }
  function x0(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && sx(i);
        }
      }
    }
  }
  function gg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new o0()), t.forEach(function(a) {
        var r = CO.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), rn)
            if (fi !== null && di !== null)
              Il(di, fi);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function D0(e, t, n) {
    fi = n, di = e, Ee(t), bg(t, e), Ee(t), fi = null, di = null;
  }
  function mn(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          T0(e, t, i);
        } catch (o) {
          ve(i, t, o);
        }
      }
    var l = Jb();
    if (t.subtreeFlags & lc)
      for (var u = t.child; u !== null; )
        Ee(u), bg(u, e), u = u.sibling;
    Ee(l);
  }
  function bg(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case P:
      case re:
      case Lt:
      case fe: {
        if (mn(t, e), An(e), r & ee) {
          try {
            pn(Mn | Le, e, e.return), wa(Mn | Le, e);
          } catch (H) {
            ve(e, e.return, H);
          }
          if (e.mode & ie) {
            try {
              wn(), pn(_e | Le, e, e.return);
            } catch (H) {
              ve(e, e.return, H);
            }
            _n(e);
          } else
            try {
              pn(_e | Le, e, e.return);
            } catch (H) {
              ve(e, e.return, H);
            }
        }
        return;
      }
      case Y: {
        mn(t, e), An(e), r & Ga && a !== null && vi(a, a.return);
        return;
      }
      case z: {
        mn(t, e), An(e), r & Ga && a !== null && vi(a, a.return);
        {
          if (e.flags & zi) {
            var i = e.stateNode;
            try {
              gm(i);
            } catch (H) {
              ve(e, e.return, H);
            }
          }
          if (r & ee) {
            var l = e.stateNode;
            if (l != null) {
              var u = e.memoizedProps, o = a !== null ? a.memoizedProps : u, s = e.type, c = e.updateQueue;
              if (e.updateQueue = null, c !== null)
                try {
                  HR(l, c, s, o, u, e);
                } catch (H) {
                  ve(e, e.return, H);
                }
            }
          }
        }
        return;
      }
      case pe: {
        if (mn(t, e), An(e), r & ee) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var v = e.stateNode, d = e.memoizedProps, m = a !== null ? a.memoizedProps : d;
          try {
            kR(v, m, d);
          } catch (H) {
            ve(e, e.return, H);
          }
        }
        return;
      }
      case B: {
        if (mn(t, e), An(e), r & ee && a !== null) {
          var y = a.memoizedState;
          if (y.isDehydrated)
            try {
              ox(t.containerInfo);
            } catch (H) {
              ve(e, e.return, H);
            }
        }
        return;
      }
      case oe: {
        mn(t, e), An(e);
        return;
      }
      case ce: {
        mn(t, e), An(e);
        var g = e.child;
        if (g.flags & Qa) {
          var R = g.stateNode, w = g.memoizedState, _ = w !== null;
          if (R.isHidden = _, _) {
            var Z = g.alternate !== null && g.alternate.memoizedState !== null;
            Z || lO();
          }
        }
        if (r & ee) {
          try {
            R0(e);
          } catch (H) {
            ve(e, e.return, H);
          }
          gg(e);
        }
        return;
      }
      case ae: {
        var G = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & X
        ) {
          var p = We;
          We = p || G, mn(t, e), We = p;
        } else
          mn(t, e);
        if (An(e), r & Qa) {
          var b = e.stateNode, h = e.memoizedState, E = h !== null, U = e;
          if (b.isHidden = E, E && !G && (U.mode & X) !== A) {
            L = U;
            for (var x = U.child; x !== null; )
              L = x, M0(x), x = x.sibling;
          }
          b0(U, E);
        }
        return;
      }
      case ot: {
        mn(t, e), An(e), r & ee && gg(e);
        return;
      }
      case Ue:
        return;
      default: {
        mn(t, e), An(e);
        return;
      }
    }
  }
  function An(e) {
    var t = e.flags;
    if (t & Oe) {
      try {
        E0(e);
      } catch (n) {
        ve(e, e.return, n);
      }
      e.flags &= ~Oe;
    }
    t & Qn && (e.flags &= ~Qn);
  }
  function O0(e, t, n) {
    fi = n, di = t, L = e, Sg(e, t, n), fi = null, di = null;
  }
  function Sg(e, t, n) {
    for (var a = (e.mode & X) !== A; L !== null; ) {
      var r = L, i = r.child;
      if (r.tag === ae && a) {
        var l = r.memoizedState !== null, u = l || Wo;
        if (u) {
          nv(e, t, n);
          continue;
        } else {
          var o = r.alternate, s = o !== null && o.memoizedState !== null, c = s || We, v = Wo, d = We;
          Wo = u, We = c, We && !d && (L = r, U0(r));
          for (var m = i; m !== null; )
            L = m, Sg(
              m,
              // New root; bubble back up to here and stop.
              t,
              n
            ), m = m.sibling;
          L = r, Wo = v, We = d, nv(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & Ni) !== N && i !== null ? (i.return = r, L = i) : nv(e, t, n);
    }
  }
  function nv(e, t, n) {
    for (; L !== null; ) {
      var a = L;
      if ((a.flags & Ni) !== N) {
        var r = a.alternate;
        Ee(a);
        try {
          y0(t, r, a, n);
        } catch (l) {
          ve(a, a.return, l);
        }
        ct();
      }
      if (a === e) {
        L = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, L = i;
        return;
      }
      L = a.return;
    }
  }
  function M0(e) {
    for (; L !== null; ) {
      var t = L, n = t.child;
      switch (t.tag) {
        case P:
        case re:
        case Lt:
        case fe: {
          if (t.mode & ie)
            try {
              wn(), pn(_e, t, t.return);
            } finally {
              _n(t);
            }
          else
            pn(_e, t, t.return);
          break;
        }
        case Y: {
          vi(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Pd(t, t.return, a);
          break;
        }
        case z: {
          vi(t, t.return);
          break;
        }
        case ae: {
          var r = t.memoizedState !== null;
          if (r) {
            Cg(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, L = n) : Cg(e);
    }
  }
  function Cg(e) {
    for (; L !== null; ) {
      var t = L;
      if (t === e) {
        L = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, L = n;
        return;
      }
      L = t.return;
    }
  }
  function U0(e) {
    for (; L !== null; ) {
      var t = L, n = t.child;
      if (t.tag === ae) {
        var a = t.memoizedState !== null;
        if (a) {
          Eg(e);
          continue;
        }
      }
      n !== null ? (n.return = t, L = n) : Eg(e);
    }
  }
  function Eg(e) {
    for (; L !== null; ) {
      var t = L;
      Ee(t);
      try {
        g0(t);
      } catch (a) {
        ve(t, t.return, a);
      }
      if (ct(), t === e) {
        L = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, L = n;
        return;
      }
      L = t.return;
    }
  }
  function L0(e, t, n, a) {
    L = t, _0(t, e, n, a);
  }
  function _0(e, t, n, a) {
    for (; L !== null; ) {
      var r = L, i = r.child;
      (r.subtreeFlags & Ar) !== N && i !== null ? (i.return = r, L = i) : w0(e, t, n, a);
    }
  }
  function w0(e, t, n, a) {
    for (; L !== null; ) {
      var r = L;
      if ((r.flags & pa) !== N) {
        Ee(r);
        try {
          A0(t, r, n, a);
        } catch (l) {
          ve(r, r.return, l);
        }
        ct();
      }
      if (r === e) {
        L = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, L = i;
        return;
      }
      L = r.return;
    }
  }
  function A0(e, t, n, a) {
    switch (t.tag) {
      case P:
      case re:
      case fe: {
        if (t.mode & ie) {
          Cd();
          try {
            wa(Ze | Le, t);
          } finally {
            Sd(t);
          }
        } else
          wa(Ze | Le, t);
        break;
      }
    }
  }
  function z0(e) {
    L = e, N0();
  }
  function N0() {
    for (; L !== null; ) {
      var e = L, t = e.child;
      if ((L.flags & qa) !== N) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            L = r, F0(r, e);
          }
          {
            var i = e.alternate;
            if (i !== null) {
              var l = i.child;
              if (l !== null) {
                i.child = null;
                do {
                  var u = l.sibling;
                  l.sibling = null, l = u;
                } while (l !== null);
              }
            }
          }
          L = e;
        }
      }
      (e.subtreeFlags & Ar) !== N && t !== null ? (t.return = e, L = t) : H0();
    }
  }
  function H0() {
    for (; L !== null; ) {
      var e = L;
      (e.flags & pa) !== N && (Ee(e), k0(e), ct());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, L = t;
        return;
      }
      L = e.return;
    }
  }
  function k0(e) {
    switch (e.tag) {
      case P:
      case re:
      case fe: {
        e.mode & ie ? (Cd(), pn(Ze | Le, e, e.return), Sd(e)) : pn(Ze | Le, e, e.return);
        break;
      }
    }
  }
  function F0(e, t) {
    for (; L !== null; ) {
      var n = L;
      Ee(n), B0(n, t), ct();
      var a = n.child;
      a !== null ? (a.return = n, L = a) : V0(e);
    }
  }
  function V0(e) {
    for (; L !== null; ) {
      var t = L, n = t.sibling, a = t.return;
      if (pg(t), t === e) {
        L = null;
        return;
      }
      if (n !== null) {
        n.return = a, L = n;
        return;
      }
      L = a;
    }
  }
  function B0(e, t) {
    switch (e.tag) {
      case P:
      case re:
      case fe: {
        e.mode & ie ? (Cd(), pn(Ze, e, t), Sd(e)) : pn(Ze, e, t);
        break;
      }
    }
  }
  function j0(e) {
    switch (e.tag) {
      case P:
      case re:
      case fe: {
        try {
          wa(_e | Le, e);
        } catch (n) {
          ve(e, e.return, n);
        }
        break;
      }
      case Y: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          ve(e, e.return, n);
        }
        break;
      }
    }
  }
  function Y0(e) {
    switch (e.tag) {
      case P:
      case re:
      case fe: {
        try {
          wa(Ze | Le, e);
        } catch (t) {
          ve(e, e.return, t);
        }
        break;
      }
    }
  }
  function $0(e) {
    switch (e.tag) {
      case P:
      case re:
      case fe: {
        try {
          pn(_e | Le, e, e.return);
        } catch (n) {
          ve(e, e.return, n);
        }
        break;
      }
      case Y: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Pd(e, e.return, t);
        break;
      }
    }
  }
  function q0(e) {
    switch (e.tag) {
      case P:
      case re:
      case fe:
        try {
          pn(Ze | Le, e, e.return);
        } catch (t) {
          ve(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var jl = Symbol.for;
    jl("selector.component"), jl("selector.has_pseudo_class"), jl("selector.role"), jl("selector.test_id"), jl("selector.text");
  }
  var G0 = [];
  function Q0() {
    G0.forEach(function(e) {
      return e();
    });
  }
  var X0 = Re.ReactCurrentActQueue;
  function K0(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Tg() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && X0.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var Z0 = Math.ceil, av = Re.ReactCurrentDispatcher, rv = Re.ReactCurrentOwner, Pe = Re.ReactCurrentBatchConfig, yn = Re.ReactCurrentActQueue, ze = (
    /*             */
    0
  ), Rg = (
    /*               */
    1
  ), et = (
    /*                */
    2
  ), Wt = (
    /*                */
    4
  ), ra = 0, Yl = 1, vr = 2, Po = 3, $l = 4, xg = 5, iv = 6, K = ze, ht = null, ge = null, Ne = C, zn = C, lv = Ta(C), He = ra, ql = null, es = C, Gl = C, ts = C, Ql = null, Dt = null, uv = 0, Dg = 500, Og = 1 / 0, J0 = 500, ia = null;
  function Xl() {
    Og = je() + J0;
  }
  function Mg() {
    return Og;
  }
  var ns = !1, ov = null, pi = null, pr = !1, za = null, Kl = C, sv = [], cv = null, W0 = 50, Zl = 0, fv = null, dv = !1, as = !1, I0 = 50, hi = 0, rs = null, Jl = me, is = C, Ug = !1;
  function ls() {
    return ht;
  }
  function mt() {
    return (K & (et | Wt)) !== ze ? je() : (Jl !== me || (Jl = je()), Jl);
  }
  function Na(e) {
    var t = e.mode;
    if ((t & X) === A)
      return F;
    if ((K & et) !== ze && Ne !== C)
      return Yi(Ne);
    var n = Xx() !== Qx;
    if (n) {
      if (Pe.transition !== null) {
        var a = Pe.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return is === $e && (is = ch()), is;
    }
    var r = ln();
    if (r !== $e)
      return r;
    var i = _R();
    return i;
  }
  function P0(e) {
    var t = e.mode;
    return (t & X) === A ? F : tE();
  }
  function ke(e, t, n, a) {
    TO(), Ug && f("useInsertionEffect must not schedule updates."), dv && (as = !0), $i(e, n, a), (K & et) !== C && e === ht ? DO(t) : (rn && vh(e, t, n), OO(t), e === ht && ((K & et) === ze && (Gl = q(Gl, n)), He === $l && Ha(e, Ne)), Ot(e, a), n === F && K === ze && (t.mode & X) === A && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !yn.isBatchingLegacy && (Xl(), Um()));
  }
  function eO(e, t, n) {
    var a = e.current;
    a.lanes = t, $i(e, t, n), Ot(e, n);
  }
  function tO(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (K & et) !== ze
    );
  }
  function Ot(e, t) {
    var n = e.callbackNode;
    ZC(e, t);
    var a = Du(e, e === ht ? Ne : C);
    if (a === C) {
      n !== null && Gg(n), e.callbackNode = null, e.callbackPriority = $e;
      return;
    }
    var r = Ia(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(yn.current !== null && n !== bv)) {
      n == null && i !== F && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && Gg(n);
    var l;
    if (r === F)
      e.tag === Ra ? (yn.isBatchingLegacy !== null && (yn.didScheduleLegacyUpdate = !0), Ux(wg.bind(null, e))) : Mm(wg.bind(null, e)), yn.current !== null ? yn.current.push(xa) : AR(function() {
        (K & (et | Wt)) === ze && xa();
      }), l = null;
    else {
      var u;
      switch (mh(a)) {
        case Nt:
          u = Eu;
          break;
        case Zn:
          u = uc;
          break;
        case Jn:
          u = Za;
          break;
        case Uu:
          u = oc;
          break;
        default:
          u = Za;
          break;
      }
      l = Sv(u, Lg.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function Lg(e, t) {
    if (bD(), Jl = me, is = C, (K & (et | Wt)) !== ze)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = ua();
    if (a && e.callbackNode !== n)
      return null;
    var r = Du(e, e === ht ? Ne : C);
    if (r === C)
      return null;
    var i = !Ou(e, r) && !eE(e, r) && !t, l = i ? fO(e, r) : os(e, r);
    if (l !== ra) {
      if (l === vr) {
        var u = Lc(e);
        u !== C && (r = u, l = vv(e, u));
      }
      if (l === Yl) {
        var o = ql;
        throw hr(e, C), Ha(e, r), Ot(e, je()), o;
      }
      if (l === iv)
        Ha(e, r);
      else {
        var s = !Ou(e, r), c = e.current.alternate;
        if (s && !aO(c)) {
          if (l = os(e, r), l === vr) {
            var v = Lc(e);
            v !== C && (r = v, l = vv(e, v));
          }
          if (l === Yl) {
            var d = ql;
            throw hr(e, C), Ha(e, r), Ot(e, je()), d;
          }
        }
        e.finishedWork = c, e.finishedLanes = r, nO(e, l, r);
      }
    }
    return Ot(e, je()), e.callbackNode === n ? Lg.bind(null, e) : null;
  }
  function vv(e, t) {
    var n = Ql;
    if (Lu(e)) {
      var a = hr(e, t);
      a.flags |= Gn, Ex(e.containerInfo);
    }
    var r = os(e, t);
    if (r !== vr) {
      var i = Dt;
      Dt = n, i !== null && _g(i);
    }
    return r;
  }
  function _g(e) {
    Dt === null ? Dt = e : Dt.push.apply(Dt, e);
  }
  function nO(e, t, n) {
    switch (t) {
      case ra:
      case Yl:
        throw new Error("Root did not complete. This is a bug in React.");
      case vr: {
        mr(e, Dt, ia);
        break;
      }
      case Po: {
        if (Ha(e, n), oh(n) && // do not delay if we're inside an act() scope
        !Qg()) {
          var a = uv + Dg - je();
          if (a > 10) {
            var r = Du(e, C);
            if (r !== C)
              break;
            var i = e.suspendedLanes;
            if (!Vr(i, n)) {
              mt(), dh(e, i);
              break;
            }
            e.timeoutHandle = cf(mr.bind(null, e, Dt, ia), a);
            break;
          }
        }
        mr(e, Dt, ia);
        break;
      }
      case $l: {
        if (Ha(e, n), PC(n))
          break;
        if (!Qg()) {
          var l = XC(e, n), u = l, o = je() - u, s = EO(o) - o;
          if (s > 10) {
            e.timeoutHandle = cf(mr.bind(null, e, Dt, ia), s);
            break;
          }
        }
        mr(e, Dt, ia);
        break;
      }
      case xg: {
        mr(e, Dt, ia);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function aO(e) {
    for (var t = e; ; ) {
      if (t.flags & ec) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, u = i.value;
              try {
                if (!kt(l(), u))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var o = t.child;
      if (t.subtreeFlags & ec && o !== null) {
        o.return = t, t = o;
        continue;
      }
      if (t === e)
        return !0;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e)
          return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return !0;
  }
  function Ha(e, t) {
    t = Mu(t, ts), t = Mu(t, Gl), aE(e, t);
  }
  function wg(e) {
    if (SD(), (K & (et | Wt)) !== ze)
      throw new Error("Should not already be working.");
    ua();
    var t = Du(e, C);
    if (!zt(t, F))
      return Ot(e, je()), null;
    var n = os(e, t);
    if (e.tag !== Ra && n === vr) {
      var a = Lc(e);
      a !== C && (t = a, n = vv(e, a));
    }
    if (n === Yl) {
      var r = ql;
      throw hr(e, C), Ha(e, t), Ot(e, je()), r;
    }
    if (n === iv)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, mr(e, Dt, ia), Ot(e, je()), null;
  }
  function rO(e, t) {
    t !== C && (zc(e, q(t, F)), Ot(e, je()), (K & (et | Wt)) === ze && (Xl(), xa()));
  }
  function pv(e, t) {
    var n = K;
    K |= Rg;
    try {
      return e(t);
    } finally {
      K = n, K === ze && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !yn.isBatchingLegacy && (Xl(), Um());
    }
  }
  function iO(e, t, n, a, r) {
    var i = ln(), l = Pe.transition;
    try {
      return Pe.transition = null, qe(Nt), e(t, n, a, r);
    } finally {
      qe(i), Pe.transition = l, K === ze && Xl();
    }
  }
  function la(e) {
    za !== null && za.tag === Ra && (K & (et | Wt)) === ze && ua();
    var t = K;
    K |= Rg;
    var n = Pe.transition, a = ln();
    try {
      return Pe.transition = null, qe(Nt), e ? e() : void 0;
    } finally {
      qe(a), Pe.transition = n, K = t, (K & (et | Wt)) === ze && xa();
    }
  }
  function Ag() {
    return (K & (et | Wt)) !== ze;
  }
  function us(e, t) {
    rt(lv, zn, e), zn = q(zn, t);
  }
  function hv(e) {
    zn = lv.current, at(lv, e);
  }
  function hr(e, t) {
    e.finishedWork = null, e.finishedLanes = C;
    var n = e.timeoutHandle;
    if (n !== ff && (e.timeoutHandle = ff, wR(n)), ge !== null)
      for (var a = ge.return; a !== null; ) {
        var r = a.alternate;
        og(r, a), a = a.return;
      }
    ht = e;
    var i = yr(e.current, null);
    return ge = i, Ne = zn = t, He = ra, ql = null, es = C, Gl = C, ts = C, Ql = null, Dt = null, eD(), sn.discardPendingWarnings(), i;
  }
  function zg(e, t) {
    do {
      var n = ge;
      try {
        if (yo(), ry(), ct(), rv.current = null, n === null || n.return === null) {
          He = Yl, ql = t, ge = null;
          return;
        }
        if (Ci && n.mode & ie && Qo(n, !0), iu)
          if (Nr(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            NC(n, a, Ne);
          } else
            zC(n, t, Ne);
        UD(e, n.return, n, t, Ne), Fg(n);
      } catch (r) {
        t = r, ge === n && n !== null ? (n = n.return, ge = n) : n = ge;
        continue;
      }
      return;
    } while (!0);
  }
  function Ng() {
    var e = av.current;
    return av.current = jo, e === null ? jo : e;
  }
  function Hg(e) {
    av.current = e;
  }
  function lO() {
    uv = je();
  }
  function Wl(e) {
    es = q(e, es);
  }
  function uO() {
    He === ra && (He = Po);
  }
  function mv() {
    (He === ra || He === Po || He === vr) && (He = $l), ht !== null && (_c(es) || _c(Gl)) && Ha(ht, Ne);
  }
  function oO(e) {
    He !== $l && (He = vr), Ql === null ? Ql = [e] : Ql.push(e);
  }
  function sO() {
    return He === ra;
  }
  function os(e, t) {
    var n = K;
    K |= et;
    var a = Ng();
    if (ht !== e || Ne !== t) {
      if (rn) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Il(e, Ne), r.clear()), ph(e, t);
      }
      ia = hh(), hr(e, t);
    }
    ah(t);
    do
      try {
        cO();
        break;
      } catch (i) {
        zg(e, i);
      }
    while (!0);
    if (yo(), K = n, Hg(a), ge !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return rh(), ht = null, Ne = C, He;
  }
  function cO() {
    for (; ge !== null; )
      kg(ge);
  }
  function fO(e, t) {
    var n = K;
    K |= et;
    var a = Ng();
    if (ht !== e || Ne !== t) {
      if (rn) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Il(e, Ne), r.clear()), ph(e, t);
      }
      ia = hh(), Xl(), hr(e, t);
    }
    ah(t);
    do
      try {
        dO();
        break;
      } catch (i) {
        zg(e, i);
      }
    while (!0);
    return yo(), Hg(a), K = n, ge !== null ? (BC(), ra) : (rh(), ht = null, Ne = C, He);
  }
  function dO() {
    for (; ge !== null && !pC(); )
      kg(ge);
  }
  function kg(e) {
    var t = e.alternate;
    Ee(e);
    var n;
    (e.mode & ie) !== A ? (bd(e), n = yv(t, e, zn), Qo(e, !0)) : n = yv(t, e, zn), ct(), e.memoizedProps = e.pendingProps, n === null ? Fg(e) : ge = n, rv.current = null;
  }
  function Fg(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Cu) === N) {
        Ee(t);
        var r = void 0;
        if ((t.mode & ie) === A ? r = ug(n, t, zn) : (bd(t), r = ug(n, t, zn), Qo(t, !1)), ct(), r !== null) {
          ge = r;
          return;
        }
      } else {
        var i = u0(n, t);
        if (i !== null) {
          i.flags &= oC, ge = i;
          return;
        }
        if ((t.mode & ie) !== A) {
          Qo(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Cu, a.subtreeFlags = N, a.deletions = null;
        else {
          He = iv, ge = null;
          return;
        }
      }
      var o = t.sibling;
      if (o !== null) {
        ge = o;
        return;
      }
      t = a, ge = t;
    } while (t !== null);
    He === ra && (He = xg);
  }
  function mr(e, t, n) {
    var a = ln(), r = Pe.transition;
    try {
      Pe.transition = null, qe(Nt), vO(e, t, n, a);
    } finally {
      Pe.transition = r, qe(a);
    }
    return null;
  }
  function vO(e, t, n, a) {
    do
      ua();
    while (za !== null);
    if (RO(), (K & (et | Wt)) !== ze)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (OC(i), r === null)
      return eh(), null;
    if (i === C && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = C, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = $e;
    var l = q(r.lanes, r.childLanes);
    rE(e, l), e === ht && (ht = null, ge = null, Ne = C), ((r.subtreeFlags & Ar) !== N || (r.flags & Ar) !== N) && (pr || (pr = !0, cv = n, Sv(Za, function() {
      return ua(), null;
    })));
    var u = (r.subtreeFlags & (ic | lc | Ni | Ar)) !== N, o = (r.flags & (ic | lc | Ni | Ar)) !== N;
    if (u || o) {
      var s = Pe.transition;
      Pe.transition = null;
      var c = ln();
      qe(Nt);
      var v = K;
      K |= Wt, rv.current = null, d0(e, r), Uy(), D0(e, r, i), xR(e.containerInfo), e.current = r, HC(i), O0(r, e, i), kC(), hC(), K = v, qe(c), Pe.transition = s;
    } else
      e.current = r, Uy();
    var d = pr;
    if (pr ? (pr = !1, za = e, Kl = i) : (hi = 0, rs = null), l = e.pendingLanes, l === C && (pi = null), d || Yg(e.current, !1), EC(r.stateNode, a), rn && e.memoizedUpdaters.clear(), Q0(), Ot(e, je()), t !== null)
      for (var m = e.onRecoverableError, y = 0; y < t.length; y++) {
        var g = t[y], R = g.stack, w = g.digest;
        m(g.value, {
          componentStack: R,
          digest: w
        });
      }
    if (ns) {
      ns = !1;
      var _ = ov;
      throw ov = null, _;
    }
    return zt(Kl, F) && e.tag !== Ra && ua(), l = e.pendingLanes, zt(l, F) ? (gD(), e === fv ? Zl++ : (Zl = 0, fv = e)) : Zl = 0, xa(), eh(), null;
  }
  function ua() {
    if (za !== null) {
      var e = mh(Kl), t = oE(Jn, e), n = Pe.transition, a = ln();
      try {
        return Pe.transition = null, qe(t), hO();
      } finally {
        qe(a), Pe.transition = n;
      }
    }
    return !1;
  }
  function pO(e) {
    sv.push(e), pr || (pr = !0, Sv(Za, function() {
      return ua(), null;
    }));
  }
  function hO() {
    if (za === null)
      return !1;
    var e = cv;
    cv = null;
    var t = za, n = Kl;
    if (za = null, Kl = C, (K & (et | Wt)) !== ze)
      throw new Error("Cannot flush passive effects while already rendering.");
    dv = !0, as = !1, FC(n);
    var a = K;
    K |= Wt, z0(t.current), L0(t, t.current, n, e);
    {
      var r = sv;
      sv = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        m0(t, l);
      }
    }
    VC(), Yg(t.current, !0), K = a, xa(), as ? t === rs ? hi++ : (hi = 0, rs = t) : hi = 0, dv = !1, as = !1, TC(t);
    {
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
    }
    return !0;
  }
  function Vg(e) {
    return pi !== null && pi.has(e);
  }
  function mO(e) {
    pi === null ? pi = /* @__PURE__ */ new Set([e]) : pi.add(e);
  }
  function yO(e) {
    ns || (ns = !0, ov = e);
  }
  var gO = yO;
  function Bg(e, t, n) {
    var a = fr(n, t), r = ky(e, a, F), i = Oa(e, r, F), l = mt();
    i !== null && ($i(i, F, l), Ot(i, l));
  }
  function ve(e, t, n) {
    if (s0(n), Pl(!1), e.tag === B) {
      Bg(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === B) {
        Bg(a, e, n);
        return;
      } else if (a.tag === Y) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !Vg(i)) {
          var l = fr(n, e), u = kd(a, l, F), o = Oa(a, u, F), s = mt();
          o !== null && ($i(o, F, s), Ot(o, s));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function bO(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = mt();
    dh(e, n), MO(e), ht === e && Vr(Ne, n) && (He === $l || He === Po && oh(Ne) && je() - uv < Dg ? hr(e, C) : ts = q(ts, n)), Ot(e, r);
  }
  function jg(e, t) {
    t === $e && (t = P0(e));
    var n = mt(), a = Rt(e, t);
    a !== null && ($i(a, t, n), Ot(a, n));
  }
  function SO(e) {
    var t = e.memoizedState, n = $e;
    t !== null && (n = t.retryLane), jg(e, n);
  }
  function CO(e, t) {
    var n = $e, a;
    switch (e.tag) {
      case ce:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case ot:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), jg(e, n);
  }
  function EO(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Z0(e / 1960) * 1960;
  }
  function TO() {
    if (Zl > W0)
      throw Zl = 0, fv = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    hi > I0 && (hi = 0, rs = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function RO() {
    sn.flushLegacyContextWarning(), sn.flushPendingUnsafeLifecycleWarnings();
  }
  function Yg(e, t) {
    Ee(e), ss(e, ha, $0), t && ss(e, rc, q0), ss(e, ha, j0), t && ss(e, rc, Y0), ct();
  }
  function ss(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== N ? a = a.child : ((a.flags & t) !== N && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var cs = null;
  function $g(e) {
    {
      if ((K & et) !== ze || !(e.mode & X))
        return;
      var t = e.tag;
      if (t !== bt && t !== B && t !== Y && t !== P && t !== re && t !== Lt && t !== fe)
        return;
      var n = $(e) || "ReactComponent";
      if (cs !== null) {
        if (cs.has(n))
          return;
        cs.add(n);
      } else
        cs = /* @__PURE__ */ new Set([n]);
      var a = wt;
      try {
        Ee(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? Ee(e) : ct();
      }
    }
  }
  var yv;
  {
    var xO = null;
    yv = function(e, t, n) {
      var a = Wg(xO, t);
      try {
        return ng(e, t, n);
      } catch (i) {
        if (kx() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (yo(), ry(), og(e, t), Wg(t, a), t.mode & ie && bd(t), Is(null, ng, null, e, t, n), iC()) {
          var r = Ps();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var qg = !1, gv;
  gv = /* @__PURE__ */ new Set();
  function DO(e) {
    if (Oi && !hD())
      switch (e.tag) {
        case P:
        case re:
        case fe: {
          var t = ge && $(ge) || "Unknown", n = t;
          if (!gv.has(n)) {
            gv.add(n);
            var a = $(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case Y: {
          qg || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), qg = !0);
          break;
        }
      }
  }
  function Il(e, t) {
    if (rn) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        vh(e, a, t);
      });
    }
  }
  var bv = {};
  function Sv(e, t) {
    {
      var n = yn.current;
      return n !== null ? (n.push(t), bv) : Pp(e, t);
    }
  }
  function Gg(e) {
    if (e !== bv)
      return vC(e);
  }
  function Qg() {
    return yn.current !== null;
  }
  function OO(e) {
    {
      if (e.mode & X) {
        if (!Tg())
          return;
      } else if (!K0() || K !== ze || e.tag !== P && e.tag !== re && e.tag !== fe)
        return;
      if (yn.current === null) {
        var t = wt;
        try {
          Ee(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, $(e));
        } finally {
          t ? Ee(e) : ct();
        }
      }
    }
  }
  function MO(e) {
    e.tag !== Ra && Tg() && yn.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Pl(e) {
    Ug = e;
  }
  var It = null, mi = null, UO = function(e) {
    It = e;
  };
  function yi(e) {
    {
      if (It === null)
        return e;
      var t = It(e);
      return t === void 0 ? e : t.current;
    }
  }
  function Cv(e) {
    return yi(e);
  }
  function Ev(e) {
    {
      if (It === null)
        return e;
      var t = It(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = yi(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: Tr,
              render: n
            };
            return e.displayName !== void 0 && (a.displayName = e.displayName), a;
          }
        }
        return e;
      }
      return t.current;
    }
  }
  function Xg(e, t) {
    {
      if (It === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case Y: {
          typeof a == "function" && (r = !0);
          break;
        }
        case P: {
          (typeof a == "function" || i === st) && (r = !0);
          break;
        }
        case re: {
          (i === Tr || i === st) && (r = !0);
          break;
        }
        case Lt:
        case fe: {
          (i === xi || i === st) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = It(n);
        if (l !== void 0 && l === It(a))
          return !0;
      }
      return !1;
    }
  }
  function Kg(e) {
    {
      if (It === null || typeof WeakSet != "function")
        return;
      mi === null && (mi = /* @__PURE__ */ new WeakSet()), mi.add(e);
    }
  }
  var LO = function(e, t) {
    {
      if (It === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      ua(), la(function() {
        Tv(e.current, a, n);
      });
    }
  }, _O = function(e, t) {
    {
      if (e.context !== Ft)
        return;
      ua(), la(function() {
        eu(t, e, null, null);
      });
    }
  };
  function Tv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, u = e.type, o = null;
      switch (l) {
        case P:
        case fe:
        case Y:
          o = u;
          break;
        case re:
          o = u.render;
          break;
      }
      if (It === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var s = !1, c = !1;
      if (o !== null) {
        var v = It(o);
        v !== void 0 && (n.has(v) ? c = !0 : t.has(v) && (l === Y ? c = !0 : s = !0));
      }
      if (mi !== null && (mi.has(e) || a !== null && mi.has(a)) && (c = !0), c && (e._debugNeedsRemount = !0), c || s) {
        var d = Rt(e, F);
        d !== null && ke(d, e, F, me);
      }
      r !== null && !c && Tv(r, t, n), i !== null && Tv(i, t, n);
    }
  }
  var wO = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return Rv(e.current, a, n), n;
    }
  };
  function Rv(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, u = null;
      switch (i) {
        case P:
        case fe:
        case Y:
          u = l;
          break;
        case re:
          u = l.render;
          break;
      }
      var o = !1;
      u !== null && t.has(u) && (o = !0), o ? AO(e, n) : a !== null && Rv(a, t, n), r !== null && Rv(r, t, n);
    }
  }
  function AO(e, t) {
    {
      var n = zO(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case z:
            t.add(a.stateNode);
            return;
          case oe:
            t.add(a.stateNode.containerInfo);
            return;
          case B:
            t.add(a.stateNode.containerInfo);
            return;
        }
        if (a.return === null)
          throw new Error("Expected to reach root first.");
        a = a.return;
      }
    }
  }
  function zO(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === z)
        a = !0, t.add(n.stateNode);
      else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e)
        return a;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e)
          return a;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return !1;
  }
  var xv;
  {
    xv = !1;
    try {
      var Zg = Object.preventExtensions({});
    } catch {
      xv = !0;
    }
  }
  function NO(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = N, this.subtreeFlags = N, this.deletions = null, this.lanes = C, this.childLanes = C, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !xv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Vt = function(e, t, n, a) {
    return new NO(e, t, n, a);
  };
  function Dv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function HO(e) {
    return typeof e == "function" && !Dv(e) && e.defaultProps === void 0;
  }
  function kO(e) {
    if (typeof e == "function")
      return Dv(e) ? Y : P;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Tr)
        return re;
      if (t === xi)
        return Lt;
    }
    return bt;
  }
  function yr(e, t) {
    var n = e.alternate;
    n === null ? (n = Vt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = N, n.subtreeFlags = N, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & Xn, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case bt:
      case P:
      case fe:
        n.type = yi(e.type);
        break;
      case Y:
        n.type = Cv(e.type);
        break;
      case re:
        n.type = Ev(e.type);
        break;
    }
    return n;
  }
  function FO(e, t) {
    e.flags &= Xn | Oe;
    var n = e.alternate;
    if (n === null)
      e.childLanes = C, e.lanes = t, e.child = null, e.subtreeFlags = N, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = N, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function VO(e, t, n) {
    var a;
    return e === lo ? (a = X, t === !0 && (a |= be, a |= Rn)) : a = A, rn && (a |= ie), Vt(B, null, null, a);
  }
  function Ov(e, t, n, a, r, i) {
    var l = bt, u = e;
    if (typeof e == "function")
      Dv(e) ? (l = Y, u = Cv(u)) : u = yi(u);
    else if (typeof e == "string")
      l = z;
    else
      e: switch (e) {
        case Er:
          return ka(n.children, r, i, t);
        case Cs:
          l = gr, r |= be, (r & X) !== A && (r |= Rn);
          break;
        case Es:
          return BO(n, r, i, t);
        case fu:
          return jO(n, r, i, t);
        case du:
          return YO(n, r, i, t);
        case Yv:
          return Jg(n, r, i, t);
        case kb:
        case Nb:
        case Fb:
        case Vb:
        case Hb:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Ts:
                l = gn;
                break e;
              case Rs:
                l = Va;
                break e;
              case Tr:
                l = re, u = Ev(u);
                break e;
              case xi:
                l = Lt;
                break e;
              case st:
                l = Ba, u = null;
                break e;
            }
          var o = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (o += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var s = a ? $(a) : null;
            s && (o += `

Check the render method of \`` + s + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + o));
        }
      }
    var c = Vt(l, n, t, r);
    return c.elementType = e, c.type = u, c.lanes = i, c._debugOwner = a, c;
  }
  function Mv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = Ov(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function ka(e, t, n, a) {
    var r = Vt(sa, e, a, t);
    return r.lanes = n, r;
  }
  function BO(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Vt(Ut, e, a, t | ie);
    return r.elementType = Es, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function jO(e, t, n, a) {
    var r = Vt(ce, e, a, t);
    return r.elementType = fu, r.lanes = n, r;
  }
  function YO(e, t, n, a) {
    var r = Vt(ot, e, a, t);
    return r.elementType = du, r.lanes = n, r;
  }
  function Jg(e, t, n, a) {
    var r = Vt(ae, e, a, t);
    r.elementType = Yv, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Uv(e, t, n) {
    var a = Vt(pe, e, null, t);
    return a.lanes = n, a;
  }
  function $O() {
    var e = Vt(z, null, null, A);
    return e.elementType = "DELETED", e;
  }
  function qO(e) {
    var t = Vt(St, null, null, A);
    return t.stateNode = e, t;
  }
  function Lv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Vt(oe, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function Wg(e, t) {
    return e === null && (e = Vt(bt, null, null, A)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function GO(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = ff, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = $e, this.eventTimes = Ac(C), this.expirationTimes = Ac(me), this.pendingLanes = C, this.suspendedLanes = C, this.pingedLanes = C, this.expiredLanes = C, this.mutableReadLanes = C, this.finishedLanes = C, this.entangledLanes = C, this.entanglements = Ac(C), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < cc; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case lo:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Ra:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function Ig(e, t, n, a, r, i, l, u, o, s) {
    var c = new GO(e, t, n, u, o), v = VO(t, i);
    c.current = v, v.stateNode = c;
    {
      var d = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      v.memoizedState = d;
    }
    return $f(v), c;
  }
  var _v = "18.3.1";
  function QO(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return uu(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: ja,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var wv, Av;
  wv = !1, Av = {};
  function Pg(e) {
    if (!e)
      return Ft;
    var t = Lr(e), n = Mx(t);
    if (t.tag === Y) {
      var a = t.type;
      if (On(a))
        return Dm(t, a, n);
    }
    return n;
  }
  function XO(e, t) {
    {
      var n = Lr(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = Jp(n);
      if (r === null)
        return null;
      if (r.mode & be) {
        var i = $(n) || "Component";
        if (!Av[i]) {
          Av[i] = !0;
          var l = wt;
          try {
            Ee(r), n.mode & be ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? Ee(l) : ct();
          }
        }
      }
      return r.stateNode;
    }
  }
  function eb(e, t, n, a, r, i, l, u) {
    var o = !1, s = null;
    return Ig(e, t, o, s, n, a, r, i, l);
  }
  function tb(e, t, n, a, r, i, l, u, o, s) {
    var c = !0, v = Ig(n, a, c, e, r, i, l, u, o);
    v.context = Pg(null);
    var d = v.current, m = mt(), y = Na(d), g = na(m, y);
    return g.callback = t ?? null, Oa(d, g, y), eO(v, y, m), v;
  }
  function eu(e, t, n, a) {
    CC(t, e);
    var r = t.current, i = mt(), l = Na(r);
    jC(l);
    var u = Pg(n);
    t.context === null ? t.context = u : t.pendingContext = u, Oi && wt !== null && !wv && (wv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, $(wt) || "Unknown"));
    var o = na(i, l);
    o.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), o.callback = a);
    var s = Oa(r, o, l);
    return s !== null && (ke(s, r, l, i), Eo(s, r, l)), l;
  }
  function fs(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case z:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function KO(e) {
    switch (e.tag) {
      case B: {
        var t = e.stateNode;
        if (Lu(t)) {
          var n = JC(t);
          rO(t, n);
        }
        break;
      }
      case ce: {
        la(function() {
          var r = Rt(e, F);
          if (r !== null) {
            var i = mt();
            ke(r, e, F, i);
          }
        });
        var a = F;
        zv(e, a);
        break;
      }
    }
  }
  function nb(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = nE(n.retryLane, t));
  }
  function zv(e, t) {
    nb(e, t);
    var n = e.alternate;
    n && nb(n, t);
  }
  function ZO(e) {
    if (e.tag === ce) {
      var t = Vi, n = Rt(e, t);
      if (n !== null) {
        var a = mt();
        ke(n, e, t, a);
      }
      zv(e, t);
    }
  }
  function JO(e) {
    if (e.tag === ce) {
      var t = Na(e), n = Rt(e, t);
      if (n !== null) {
        var a = mt();
        ke(n, e, t, a);
      }
      zv(e, t);
    }
  }
  function ab(e) {
    var t = dC(e);
    return t === null ? null : t.stateNode;
  }
  var rb = function(e) {
    return null;
  };
  function WO(e) {
    return rb(e);
  }
  var ib = function(e) {
    return !1;
  };
  function IO(e) {
    return ib(e);
  }
  var lb = null, ub = null, ob = null, sb = null, cb = null, fb = null, db = null, vb = null, pb = null;
  {
    var hb = function(e, t, n) {
      var a = t[n], r = ft(e) ? e.slice() : J({}, e);
      return n + 1 === t.length ? (ft(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = hb(e[a], t, n + 1), r);
    }, mb = function(e, t) {
      return hb(e, t, 0);
    }, yb = function(e, t, n, a) {
      var r = t[a], i = ft(e) ? e.slice() : J({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], ft(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = yb(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, gb = function(e, t, n) {
      if (t.length !== n.length) {
        Yt("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            Yt("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return yb(e, t, n, 0);
    }, bb = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = ft(e) ? e.slice() : J({}, e);
      return i[r] = bb(e[r], t, n + 1, a), i;
    }, Sb = function(e, t, n) {
      return bb(e, t, 0, n);
    }, Nv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    lb = function(e, t, n, a) {
      var r = Nv(e, t);
      if (r !== null) {
        var i = Sb(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = J({}, e.memoizedProps);
        var l = Rt(e, F);
        l !== null && ke(l, e, F, me);
      }
    }, ub = function(e, t, n) {
      var a = Nv(e, t);
      if (a !== null) {
        var r = mb(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = J({}, e.memoizedProps);
        var i = Rt(e, F);
        i !== null && ke(i, e, F, me);
      }
    }, ob = function(e, t, n, a) {
      var r = Nv(e, t);
      if (r !== null) {
        var i = gb(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = J({}, e.memoizedProps);
        var l = Rt(e, F);
        l !== null && ke(l, e, F, me);
      }
    }, sb = function(e, t, n) {
      e.pendingProps = Sb(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Rt(e, F);
      a !== null && ke(a, e, F, me);
    }, cb = function(e, t) {
      e.pendingProps = mb(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Rt(e, F);
      n !== null && ke(n, e, F, me);
    }, fb = function(e, t, n) {
      e.pendingProps = gb(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Rt(e, F);
      a !== null && ke(a, e, F, me);
    }, db = function(e) {
      var t = Rt(e, F);
      t !== null && ke(t, e, F, me);
    }, vb = function(e) {
      rb = e;
    }, pb = function(e) {
      ib = e;
    };
  }
  function PO(e) {
    var t = Jp(e);
    return t === null ? null : t.stateNode;
  }
  function eM(e) {
    return null;
  }
  function tM() {
    return wt;
  }
  function nM(e) {
    var t = e.findFiberByHostInstance, n = Re.ReactCurrentDispatcher;
    return SC({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: lb,
      overrideHookStateDeletePath: ub,
      overrideHookStateRenamePath: ob,
      overrideProps: sb,
      overridePropsDeletePath: cb,
      overridePropsRenamePath: fb,
      setErrorHandler: vb,
      setSuspenseHandler: pb,
      scheduleUpdate: db,
      currentDispatcherRef: n,
      findHostInstanceByFiber: PO,
      findFiberByHostInstance: t || eM,
      // React Refresh
      findHostInstancesForRefresh: wO,
      scheduleRefresh: LO,
      scheduleRoot: _O,
      setRefreshHandler: UO,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: tM,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: _v
    });
  }
  var Cb = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function Hv(e) {
    this._internalRoot = e;
  }
  ds.prototype.render = Hv.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : vs(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== De) {
        var a = ab(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    eu(e, t, null, null);
  }, ds.prototype.unmount = Hv.prototype.unmount = function() {
    typeof arguments[0] == "function" && f("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Ag() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), la(function() {
        eu(null, e, null, null);
      }), Cm(t);
    }
  };
  function aM(e, t) {
    if (!vs(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    Eb(e);
    var n = !1, a = !1, r = "", i = Cb;
    t != null && (t.hydrate ? Yt("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Cr && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = eb(e, lo, null, n, a, r, i);
    Pu(l.current, e);
    var u = e.nodeType === De ? e.parentNode : e;
    return ll(u), new Hv(l);
  }
  function ds(e) {
    this._internalRoot = e;
  }
  function rM(e) {
    e && bE(e);
  }
  ds.prototype.unstable_scheduleHydration = rM;
  function iM(e, t, n) {
    if (!vs(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    Eb(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", o = Cb;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError));
    var s = tb(t, null, e, lo, a, i, l, u, o);
    if (Pu(s.current, e), ll(e), r)
      for (var c = 0; c < r.length; c++) {
        var v = r[c];
        sD(s, v);
      }
    return new ds(s);
  }
  function vs(e) {
    return !!(e && (e.nodeType === Et || e.nodeType === qn || e.nodeType === js));
  }
  function tu(e) {
    return !!(e && (e.nodeType === Et || e.nodeType === qn || e.nodeType === js || e.nodeType === De && e.nodeValue === " react-mount-point-unstable "));
  }
  function Eb(e) {
    e.nodeType === Et && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), yl(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var lM = Re.ReactCurrentOwner, Tb;
  Tb = function(e) {
    if (e._reactRootContainer && e.nodeType !== De) {
      var t = ab(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = kv(e), r = !!(a && Ea(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Et && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function kv(e) {
    return e ? e.nodeType === qn ? e.documentElement : e.firstChild : null;
  }
  function Rb() {
  }
  function uM(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var d = fs(l);
          i.call(d);
        };
      }
      var l = tb(
        t,
        a,
        e,
        Ra,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        Rb
      );
      e._reactRootContainer = l, Pu(l.current, e);
      var u = e.nodeType === De ? e.parentNode : e;
      return ll(u), la(), l;
    } else {
      for (var o; o = e.lastChild; )
        e.removeChild(o);
      if (typeof a == "function") {
        var s = a;
        a = function() {
          var d = fs(c);
          s.call(d);
        };
      }
      var c = eb(
        e,
        Ra,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        Rb
      );
      e._reactRootContainer = c, Pu(c.current, e);
      var v = e.nodeType === De ? e.parentNode : e;
      return ll(v), la(function() {
        eu(t, c, n, a);
      }), c;
    }
  }
  function oM(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function ps(e, t, n, a, r) {
    Tb(n), oM(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = uM(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var u = r;
        r = function() {
          var o = fs(l);
          u.call(o);
        };
      }
      eu(t, l, e, r);
    }
    return fs(l);
  }
  var xb = !1;
  function sM(e) {
    {
      xb || (xb = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = lM.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", de(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === Et ? e : XO(e, "findDOMNode");
  }
  function cM(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !tu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = yl(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return ps(null, e, t, !0, n);
  }
  function fM(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !tu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = yl(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return ps(null, e, t, !1, n);
  }
  function dM(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !tu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !lC(e))
      throw new Error("parentComponent must be a valid React Component");
    return ps(e, t, n, !1, a);
  }
  var Db = !1;
  function vM(e) {
    if (Db || (Db = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !tu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = yl(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = kv(e), a = n && !Ea(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return la(function() {
        ps(null, null, e, !1, function() {
          e._reactRootContainer = null, Cm(e);
        });
      }), !0;
    } else {
      {
        var r = kv(e), i = !!(r && Ea(r)), l = e.nodeType === Et && tu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  sE(KO), fE(ZO), dE(JO), vE(ln), pE(lE), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), ZS(hR), IS(pv, iO, la);
  function pM(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!vs(t))
      throw new Error("Target container is not a DOM element.");
    return QO(e, t, null, n);
  }
  function hM(e, t, n, a) {
    return dM(e, t, n, a);
  }
  var Fv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [Ea, Kr, eo, kp, Fp, pv]
  };
  function mM(e, t) {
    return Fv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), aM(e, t);
  }
  function yM(e, t, n) {
    return Fv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), iM(e, t, n);
  }
  function gM(e) {
    return Ag() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), la(e);
  }
  var bM = nM({
    findFiberByHostInstance: nr,
    bundleType: 1,
    version: _v,
    rendererPackageName: "react-dom"
  });
  if (!bM && _t && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var Ob = window.location.protocol;
    /^(https?|file):$/.test(Ob) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (Ob === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fv, jt.createPortal = pM, jt.createRoot = mM, jt.findDOMNode = sM, jt.flushSync = gM, jt.hydrate = cM, jt.hydrateRoot = yM, jt.render = fM, jt.unmountComponentAtNode = vM, jt.unstable_batchedUpdates = pv, jt.unstable_renderSubtreeIntoContainer = hM, jt.version = _v, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
Mb.exports = jt;
var UM = Mb.exports;
export {
  UM as r
};

// SIG // Begin signature block
// SIG // MIIozwYJKoZIhvcNAQcCoIIowDCCKLwCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // B6fkuYuxnXqeHbaFKujQHTo8u9bOkYB1klocj4WGwXWg
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
// SIG // 1oyoRnADZawiFsVo9J/cDu15ErRCfDQRhwSiBTGCGmQw
// SIG // ghpgAgEBMHkwYjELMAkGA1UEBhMCVVMxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEzMDEGA1UEAxMq
// SIG // QXp1cmUgUlNBIFB1YmxpYyBTZXJ2aWNlcyBDb2RlIFNp
// SIG // Z25pbmcgUENBAhMzAAAA0wKI2Gm93wIJAAAAAADTMA0G
// SIG // CWCGSAFlAwQCAQUAoIGQMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMC8GCSqGSIb3DQEJBDEiBCDGsZq2nV9A
// SIG // oM7nVEZM5epB4eI4yNCuCYLwPSN7e3CoDzBCBgorBgEE
// SIG // AYI3AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHSh
// SIG // GoAYaHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqG
// SIG // SIb3DQEBAQUABIIBgF4gnT8Ae8oqZOE7YTgIRJg2ijUO
// SIG // a71bcusSDwx/brXBUrSM+1KZpIYSYWpx4UWyPni+Jppr
// SIG // jxqmsN8Hsp6weA/sWVR/2aqLKUf28GhOZ2vr0idiTat6
// SIG // EDxn0ew/8R2QWr22rhxpMpOKoqS0jSmiXzbdWKHzftiI
// SIG // 4obnnkGgSkW6A1xyoulRHTINk5pidV9r6u/dsnXEW0HT
// SIG // O4rpVmdYK6SauCtTu7DScnHquOfLtyDGy7dxYWkHM75S
// SIG // N1WcU3Hxoj5lOGTY4S9w4ihUFAnyMB1/n9KQLT9cDK4c
// SIG // SBdYb9bBq6mj9SkVKQKglJroM057VWUi+QcxG69wXTJH
// SIG // bPYyPJWxISCdM30inyOrcR8uFg92tp82y8zjmefJF165
// SIG // kuGlHO5lhMOI0UVzU26bZzFwwRvwuxTNqEf4EAk3Z7Mk
// SIG // 6whi4jUyw+D1Ih9wmmmgGxC8hImcK6yY7cUvawF2OwIm
// SIG // MJWnws+SGLB2/L6V4mHKIfSlpttyQ1pT5f95UwTRIieA
// SIG // qKGCF6kwghelBgorBgEEAYI3AwMBMYIXlTCCF5EGCSqG
// SIG // SIb3DQEHAqCCF4Iwghd+AgEDMQ8wDQYJYIZIAWUDBAIB
// SIG // BQAwggFWBgsqhkiG9w0BCRABBKCCAUUEggFBMIIBPQIB
// SIG // AQYKKwYBBAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCCL
// SIG // rvapoqBQ9KwbwqqpA1YtvqHuLxfXmAmN4/UAx410JwIG
// SIG // at3oACYxGA8yMDI2MTEwMjE0MDc0OFowBIACAfSggdmk
// SIG // gdYwgdMxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOjU1
// SIG // MUEtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNloIIR+zCCBygwggUQoAMC
// SIG // AQICEzMAAAIb0LK4Amf3cs8AAQAAAhswDQYJKoZIhvcN
// SIG // AQELBQAwfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UE
// SIG // AxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAw
// SIG // HhcNMjUwODE0MTg0ODMwWhcNMjYxMTEzMTg0ODMwWjCB
// SIG // 0zELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWlj
// SIG // cm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVk
// SIG // MScwJQYDVQQLEx5uU2hpZWxkIFRTUyBFU046NTUxQS0w
// SIG // NUUwLUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEBAQUA
// SIG // A4ICDwAwggIKAoICAQCOxZ3nZlmTMHld7mD+XYaw6MDP
// SIG // fSyDqNXF8UlX7DjEgNXJojcs7xsimbNi6XcBkeDnRQhD
// SIG // w+tJFkalCoWRE276jdgoniDa4ZgFGSwecdhHS5VIJCDn
// SIG // xOGRjJ6mUZfegC8ZFW48ilC0CJOxHvoD+B2hTscPARtv
// SIG // vdsnBPKtsoeFH5ZozL0NAcjiTlCjj5tkOzSSPvpu+Em9
// SIG // 0ZT5LzPFAGntQCGMmcWorEi6xIhMTvMIJHjbYQuGSFVU
// SIG // 4WorbDqHUwC8gt7vqHFEhw+PRIEvavw723HmeNTj62Da
// SIG // sB1TXnembKGprN2lRxxgET3ANEVR3970KhbHtN2dSJwH
// SIG // 4xqLtFPqqx7t7loapfUHtueP9ke+ut8X4EkQiVL2INcB
// SIG // SB6S9dn4VmaO8vA/5037T9yuH76vh7wWScXsRfogl+eY
// SIG // 14M3/rxnn2RtonV/4/macph/J0J5mbGsalLS1paQOTfo
// SIG // PeM9Vl+W/Gtz7WuEIiUzm/1qAsQUjXZCIFN+k4E4GvcA
// SIG // YI+T54fT6Vq2NBqO6D7b8EPXapvzbnTQtDK1RZPai1r8
// SIG // didGBK/WO9nT92aXUWzFZjM6cKuN90H/s3qk3JK3i+f4
// SIG // 8Y3p0UuKbuTGiz4H1Z9A97MmLd+4rLIMAH3NIc+PVm7y
// SIG // dl95xkn26bjOPsMWC8ldMNOcbmqUbhl1sVFr+ut/OQID
// SIG // AQABo4IBSTCCAUUwHQYDVR0OBBYEFLa+n3f+XEumk0rw
// SIG // 6Rq4nYC82YhQMB8GA1UdIwQYMBaAFJ+nFV0AXmJdg/Tl
// SIG // 0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCGTmh0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3JsL01p
// SIG // Y3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEw
// SIG // KDEpLmNybDBsBggrBgEFBQcBAQRgMF4wXAYIKwYBBQUH
// SIG // MAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lv
// SIG // cHMvY2VydHMvTWljcm9zb2Z0JTIwVGltZS1TdGFtcCUy
// SIG // MFBDQSUyMDIwMTAoMSkuY3J0MAwGA1UdEwEB/wQCMAAw
// SIG // FgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0PAQH/
// SIG // BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4ICAQBmRTVfFAPg
// SIG // 5MzcZOG3fZNdKEh88Ggx9KwWwFCoU5mosk7HIk6WUgEW
// SIG // mam860Y0+QLlnyV0bxoKm+AU2j+MNZ5PkWJbnd0CP0qd
// SIG // nGmxDc9/l9HNIYdFzEQw51chXMMnBxlRfRyN/GdrvJ02
// SIG // /x5cH9eTobpLKtHY4fpLUscxbXWbdS8oX54uMg+XjmvG
// SIG // Ka4MKgR35p3SU4BcDn+9k4o3mf949h4/QtFyFlfRDofy
// SIG // f9mZI8yVuWLcw7znVDT1GZP9kYdr78V3L5YsOvBxjKRX
// SIG // 2ZTL/hNvArDoW11Hpk8fEx0iLWmTxjaYL8bMKrQsKwfS
// SIG // 5MV5DpDs1zcxGYRH/eYtZSFtpYeBfUVthyG9HbZv4G6n
// SIG // 5g9HlD/QGFpoA3oAgF9waz67+cmggHLJkoDxxPIKadQj
// SIG // /i9boPi/LCDdcEV/h/YPAUfL96+wL7nwoyX6TbBrTlfa
// SIG // QrRP9sI8uFqi/1lfKhtrB804tgaJq4pPYVa9vBnMcgUJ
// SIG // PGMHDDo+3m5G8IT+OdRx//GGU4YyfqIo71e3j29lMTZJ
// SIG // 8gGT/fiItNEEnoftoY9NNCfNrc59a7X91HJwLpaXmiez
// SIG // c+OcZdNIpLFeWUk+aDpH+6Uaic/9QJignqY34ReN/IMs
// SIG // 9cuqyv3X5VMbWtjNEKM/AEUAe/gQjBoTRqMKt/vl5QYj
// SIG // f6hdTRQ/quWhnzCCB3EwggVZoAMCAQICEzMAAAAVxedr
// SIG // ngKbSZkAAAAAABUwDQYJKoZIhvcNAQELBQAwgYgxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29m
// SIG // dCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDEw
// SIG // MB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIyNVow
// SIG // fDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggIiMA0G
// SIG // CSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDk4aZM57Ry
// SIG // IQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/bErg
// SIG // 4r25PhdgM/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1jRPP
// SIG // dzLAEBjoYH1qUoNEt6aORmsHFPPFdvWGUNzBRMhxXFEx
// SIG // N6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41JmTa
// SIG // mDu6GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP1uyF
// SIG // Vk3v3byNpOORj7I5LFGc6XBpDco2LXCOMcg1KL3jtIck
// SIG // w+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL64NF50Zu
// SIG // yjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg3viS
// SIG // kR4dPf0gz3N9QZpGdc3EXzTdEonW/aUgfX782Z5F37Zy
// SIG // L9t9X4C626p+Nuw2TPYrbqgSUei/BQOj0XOmTTd0lBw0
// SIG // gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlMjgK8
// SIG // QmguEOqEUUbi0b1qGFphAXPKZ6Je1yh2AuIzGHLXpyDw
// SIG // wvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU2LlQ+QuJYfM2
// SIG // BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzFER1y
// SIG // 7435UsSFF5PAPBXbGjfHCBUYP3irRbb1Hode2o+eFnJp
// SIG // xq57t7c+auIurQIDAQABo4IB3TCCAdkwEgYJKwYBBAGC
// SIG // NxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS/mTE
// SIG // mr6CkTxGNSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0AXmJd
// SIG // g/Tl0mWnG1M1GelyMFwGA1UdIARVMFMwUQYMKwYBBAGC
// SIG // N0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93d3cu
// SIG // bWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBvc2l0
// SIG // b3J5Lmh0bTATBgNVHSUEDDAKBggrBgEFBQcDCDAZBgkr
// SIG // BgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMC
// SIG // AYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBTV
// SIG // 9lbLj+iiXGJo0T2UkFvXzpoYxDBWBgNVHR8ETzBNMEug
// SIG // SaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtp
// SIG // L2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcmwwWgYIKwYBBQUHAQEETjBMMEoGCCsGAQUF
// SIG // BzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // L2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNy
// SIG // dDANBgkqhkiG9w0BAQsFAAOCAgEAnVV9/Cqt4SwfZwEx
// SIG // JFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0xM7U518JxNj/a
// SIG // ZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6th54
// SIG // 2DYunKmCVgADsAW+iehp4LoJ7nvfam++Kctu2D9IdQHZ
// SIG // GN5tggz1bSNU5HhTdSRXud2f8449xvNo32X2pFaq95W2
// SIG // KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBewVIVC
// SIG // s/wMnosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7bj8s
// SIG // CXgU6ZGyqVvfSaN0DLzskYDSPeZKPmY7T7uG+jIa2Zb0
// SIG // j/aRAfbOxnT99kxybxCrdTDFNLB62FD+CljdQDzHVG2d
// SIG // Y3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZc9d/
// SIG // HltEAY5aGZFrDZ+kKNxnGSgkujhLmm77IVRrakURR6nx
// SIG // t67I6IleT53S0Ex2tVdUCbFpAUR+fKFhbHP+CrvsQWY9
// SIG // af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKiexcd
// SIG // FYmNcP7ntdAoGokLjzbaukz5m/8K6TT4JDVnK+ANuOaM
// SIG // mdbhIurwJ0I9JZTmdHRbatGePu1+oDEzfbzL6Xu/OHBE
// SIG // 0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQdVTNY
// SIG // s6FwZvKhggNWMIICPgIBATCCAQGhgdmkgdYwgdMxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29m
// SIG // dCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEnMCUG
// SIG // A1UECxMeblNoaWVsZCBUU1MgRVNOOjU1MUEtMDVFMC1E
// SIG // OTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFt
// SIG // cCBTZXJ2aWNloiMKAQEwBwYFKw4DAhoDFQCGhXqvj0zg
// SIG // YF3jUrVFgHVnR/jO4KCBgzCBgKR+MHwxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1l
// SIG // LVN0YW1wIFBDQSAyMDEwMA0GCSqGSIb3DQEBCwUAAgUA
// SIG // 7pLxkDAiGA8yMDI2MTEwMjExMjUwNFoYDzIwMjYxMTAz
// SIG // MTEyNTA0WjB0MDoGCisGAQQBhFkKBAExLDAqMAoCBQDu
// SIG // kvGQAgEAMAcCAQACAg7GMAcCAQACAhJ8MAoCBQDulEMQ
// SIG // AgEAMDYGCisGAQQBhFkKBAIxKDAmMAwGCisGAQQBhFkK
// SIG // AwKgCjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZI
// SIG // hvcNAQELBQADggEBADG3gGQz7IGfAnk2pQDyUUdPrkAx
// SIG // qOLBY7CHCrtEZ3Ak/hv8ED6SJKdKVOOvb6y8FjBTImZf
// SIG // kdf36W1TAvtNqhzJmV2yvugFiyh5s/sYDX5ZMtAsvIWf
// SIG // ESCGQfv2Atnvi8kJllkqBvHffarKJo9pb93qJuui9ZTE
// SIG // vcQmNGGE+StCDOTmiSU6m6e0CSBIUTEJj2ivgEL8VBir
// SIG // qvY/S1LE+95glDvdzFZq6fhHZ+v0hJz0yXehaiUitlrF
// SIG // OvX++v+j2tUVcTweks+cRLUuxBrJc975lcAKboHnK1dQ
// SIG // MUptBGjxPzIvjBPA4YKVGDYaaYaUiYkWQZCd2QSWKEfk
// SIG // L34BZu4xggQNMIIECQIBATCBkzB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMAITMwAAAhvQsrgCZ/dyzwABAAAC
// SIG // GzANBglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkD
// SIG // MQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCDR
// SIG // uPZuTW5I5JcDCNWmurUFAd/2fgIqZefWZhBZMv/bjjCB
// SIG // +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EIDAlFJW4
// SIG // PaOYxxAIVd0u4kDAOlRU1nptzp18lTzdDYuAMIGYMIGA
// SIG // pH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAIb0LK4Amf3cs8AAQAAAhswIgQgq/qLcRXYs+Qg1PaP
// SIG // rtboUDNIKQ+x1hfDReUTdTmQorQwDQYJKoZIhvcNAQEL
// SIG // BQAEggIAZovngDpCGS+dMOAaCdymxyDPorkVV43zB+Kc
// SIG // BExMG6v53QidBVO8nMrXak+pWwByd2YRQ2C5FgOFGPnp
// SIG // gOP0hTf1WD9CUU0thl+Sl07aK74BwKOPcQYTojxUJwpE
// SIG // XthfY6CrS518ZUduSKoNhqfy/gjtxzcIjJVc/KjJnK99
// SIG // 6N73DApREkHsJY3xC8hOBrFBmBW5906ZHLJP0f3ZX/Sz
// SIG // tVX5M46O1sftUaxLYoYi5fZMfN9vJrD1JQhPsOhU9tIk
// SIG // JVvCd3idYscCNcJr+mZiP2YkDhpQZMZtlQxB0ZOrTIec
// SIG // 4FCbXV/P9Kh8jxAGBGUbklDh8WphZ+Mc4B/roYjAW2WA
// SIG // kQWYLYWlWpbTLX6FOEiO4+TOy4VPIFP6qHMkC95SxjB6
// SIG // LlAmy7wQJ7Jz2frct3QRmZTwJ4zVFQt8g3bp2W/jzthM
// SIG // 5fhV36qi53TzJQzUIuE80BdLmeApaFsvWEJft60KYZyi
// SIG // g+nhEoYo22UWnzH2AvpY0EI2pP60amcyhn3nuJOW75Wu
// SIG // CLjieaPhD9hoFNRnXux/XXXkJLatCRXYnsu5GIIX+mc8
// SIG // 4fnZ6rF09ZkBluYNgjI5/AZ1c7BI57m4TjlTSOD7xjLF
// SIG // 3wH8keBB3bKEfHVjimaYn+XQVG9X4zEFUbpHKrMVmY4m
// SIG // SZ08xy63p6pRe9K+AFfSEbuiDPmS+6c=
// SIG // End signature block
