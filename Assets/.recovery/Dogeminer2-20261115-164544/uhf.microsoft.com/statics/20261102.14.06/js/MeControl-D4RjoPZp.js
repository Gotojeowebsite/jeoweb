var xe = Object.defineProperty;
var Ne = (t, e, r) => e in t ? xe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var C = (t, e, r) => Ne(t, typeof e != "symbol" ? e + "" : e, r);
import { r as y, a as p } from "./index-B8sDcx8i.js";
import { s as W, T as Ie, c as P } from "./index-478qN5s3.js";
const ke = (t) => {
  if (!(t != null && t.friendlyName))
    return "ME";
  const [e, r] = t.friendlyName.split(" ", 2);
  return `${e[0]}${r ? r[0] : ""}`;
}, be = { signOutButtonText: "Sign out", signOutButtonAriaLabel: "Sign out from {{upn}}", signInText: "Sign In", triggerTooltipText: "Account manager for {{displayName}}", genericErrorExistsAriaLabel: "There is an issue with your accounts", accountLinkButtonText: "View account", addAccountText: "Sign in with a different account", addAccountTooltipText: "Sign in with a different account", addAccountAriaLabel: "Sign in with a different account", signOutAndForgetTooltipText: "Sign Out and Forget", signOutAndForgetAriaLabel: "Open sign out menu for {{upn}}", switchAccountTooltipText: "Switch to {{upn}}", switchAccountAriaLabel: "Switch to {{upn}}", changePictureTooltipText: "Add or change your picture", changePictureAriaLabel: "Add or change your picture", showMoreOptionsTooltipText: "Add or change your picture", showMoreOptionsAriaLabel: "Add or change your picture", menuListAriaLabel: "Account manager", menuAriaLabel: "Account manager" }, Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: be
}, Symbol.toStringTag, { value: "Module" })), Fe = (t, e) => {
  const r = t ? "triggerTooltipText" : "signInText", n = e == null ? void 0 : e.stringTranslate("fluentweb", r), o = n && n !== r ? n : be[r];
  if (!t)
    return o;
  const s = t.friendlyName || t.preferredUsername, a = t.tenantName ? `${s} (${t.tenantName})` : s;
  return o.replace("{{displayName}}", () => a);
};
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const Pe = {}, Le = {}, Ue = {}, De = {}, We = {}, Ge = {}, ze = {}, He = {}, Ve = {}, ae = {}, qe = {}, Ze = {}, H = { weekday: "long" }, L = { weekday: "short" }, $e = {}, Be = {}, ce = {}, je = {}, Je = {}, Ye = {}, J = {
  day: "numeric",
  month: "short"
}, Ke = {}, Qe = {}, Xe = {
  ...J
}, et = {}, tt = {
  ...L
}, rt = {}, le = {
  ...H
}, ue = {
  ...H
}, nt = {}, ot = {}, st = {
  ...L
}, it = {
  ...L
};
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
let ee;
const at = (t) => (ee === void 0 && (ee = ct(t)), ee), ct = (t) => {
  const e = Intl.DateTimeFormat(t), r = e.resolvedOptions().timeZone;
  if (!r || r.toLowerCase() === "etc/unknown")
    return !0;
  try {
    e.format(/* @__PURE__ */ new Date());
  } catch (n) {
    if (n && n.message && (n.message.indexOf("Invalid time zone specified") || n.message.indexOf("Unsupported time zone specified")))
      return !0;
  }
  return !1;
};
function lt() {
  const t = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  if (t % 60 === 0) {
    const e = t / 60;
    return e === 0 ? "Etc/GMT" : e > 0 ? "Etc/GMT+" + e : "Etc/GMT" + e;
  }
  return "UTC";
}
const ut = (t, e) => e && e.timeZone || !at(t) ? e : {
  ...e,
  timeZone: lt()
}, dt = (t, e) => {
  const r = ut(t, e);
  return Intl.DateTimeFormat(t, r);
};
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class mt {
  constructor() {
    // We're keying this using JSON.stringify because with a WeakMap we've have a key pair
    // (locale - string & options - object) and stringify is native so it is so fars it is
    // not worth maintaing the two-level cache (map for string and weak map for object)
    C(this, "localeFormatCache", /* @__PURE__ */ new Map());
  }
  get(e, r) {
    const n = `${e}:${JSON.stringify(r)}`;
    let o = this.localeFormatCache.get(n);
    return o || (o = dt(e, r), this.localeFormatCache.set(n, o)), o;
  }
  /**
   * Clears the cache of stored Intl.DateTimeFormat instances.
   **/
  reset() {
    this.localeFormatCache.clear();
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const ht = {
  hh: {
    symbol: "hh",
    intl: {
      options: {
        // hour12: true,
        hourCycle: "h12",
        hour: "2-digit"
      },
      part: "hour"
    }
  },
  h: {
    symbol: "h",
    intl: {
      options: {
        // hour12: true,
        hourCycle: "h12",
        hour: "numeric"
      },
      part: "hour"
    }
  },
  HH: {
    symbol: "HH",
    intl: {
      options: {
        // hour12: false,
        hourCycle: "h23",
        hour: "2-digit"
      },
      part: "hour"
    }
  },
  H: {
    symbol: "H",
    intl: {
      options: {
        // hour12: false,
        hourCycle: "h23",
        hour: "numeric"
      },
      part: "hour"
    }
  },
  mm: {
    symbol: "mm",
    intl: {
      options: {
        minute: "2-digit"
      },
      part: "minute"
    }
  },
  m: {
    symbol: "m",
    intl: {
      options: {
        minute: "numeric"
      },
      part: "minute"
    }
  },
  ss: {
    symbol: "ss",
    intl: {
      options: {
        second: "2-digit"
      },
      part: "second"
    }
  },
  s: {
    symbol: "s",
    intl: {
      options: {
        second: "numeric"
      },
      part: "second"
    }
  },
  period: {
    symbol: ["t", "tt"],
    intl: {
      options: {
        hour12: !0,
        hour: "numeric"
      },
      part: ["dayPeriod", "dayperiod"]
    }
  }
}, pt = {
  a: {
    symbol: "a",
    intl: {
      options: {
        hour12: !0,
        hour: "numeric"
      },
      part: ["dayPeriod", "dayperiod"]
    }
  },
  // we should use hourCycle https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle
  // but for now it is not working consistently across varous versions of Electron and Node
  h: {
    symbol: "h",
    intl: {
      options: {
        // hour12: true,
        hourCycle: "h12",
        hour: "numeric"
      },
      part: "hour"
    }
  },
  hh: {
    symbol: "hh",
    intl: {
      options: {
        // hour12: true,
        hourCycle: "h12",
        hour: "2-digit"
      },
      part: "hour"
    }
  },
  H: {
    symbol: "H",
    intl: {
      options: {
        // hour12: false,
        hourCycle: "h23",
        hour: "numeric"
      },
      part: "hour"
    }
  },
  HH: {
    symbol: "HH",
    intl: {
      options: {
        // hour12: false,
        hourCycle: "h23",
        hour: "2-digit"
      },
      part: "hour"
    }
  },
  k: {
    symbol: "k",
    intl: {
      options: {
        hour: "numeric",
        hourCycle: "h24"
        // hour12: false,
      },
      part: "hour"
    }
  },
  kk: {
    symbol: "kk",
    intl: {
      options: {
        hour: "2-digit",
        // hour12: false,
        hourCycle: "h24"
      },
      part: "hour"
    }
  },
  K: {
    symbol: "K",
    intl: {
      options: {
        hour: "numeric",
        hourCycle: "h11"
        // hour12: true,
      },
      part: "hour"
    }
  },
  KK: {
    symbol: "KK",
    intl: {
      options: {
        hour: "2-digit",
        hourCycle: "h11"
        // hour12: true,
      },
      part: "hour"
    }
  },
  m: {
    symbol: "m",
    intl: {
      options: {
        minute: "numeric"
      },
      part: "minute"
    }
  },
  mm: {
    symbol: "mm",
    intl: {
      options: {
        minute: "2-digit"
      },
      part: "minute"
    }
  },
  s: {
    symbol: "s",
    intl: {
      options: {
        second: "numeric"
      },
      part: "second"
    }
  },
  ss: {
    symbol: "ss",
    intl: {
      options: {
        second: "2-digit"
      },
      part: "second"
    }
  },
  "zone-short": {
    symbol: [
      "x",
      "xx",
      "xxx",
      "xxxx",
      "xxxxx",
      "X",
      "XX",
      "XXX",
      "XXXX",
      "XXXXX",
      "z",
      "zz",
      "zzz",
      "Z",
      "ZZ",
      "ZZZ",
      "ZZZZ",
      "ZZZZZ",
      "O",
      "OOOO"
    ],
    intl: {
      options: {
        timeZoneName: "short"
      },
      part: "timeZoneName"
    }
  },
  "zone-long": {
    symbol: ["zzzz", "v", "vvvv", "V", "VV", "VVV", "VVVV"],
    intl: {
      options: {
        timeZoneName: "long"
      },
      part: "timeZoneName"
    }
  },
  b: {
    symbol: "b",
    intl: {
      options: {
        dayPeriod: "short"
      },
      part: ["dayPeriod", "dayperiod"]
    }
  },
  B: {
    symbol: "B",
    intl: {
      options: {
        dayPeriod: "long"
      },
      part: ["dayPeriod", "dayperiod"]
    }
  }
}, Y = {};
Y.windows = ht;
Y.macos = pt;
const gt = {
  d: {
    symbol: "d",
    intl: {
      options: {
        day: "numeric"
      },
      part: "day"
    }
  },
  dd: {
    symbol: "dd",
    intl: {
      options: {
        day: "2-digit"
      },
      part: "day"
    }
  },
  ddd: {
    symbol: "ddd",
    intl: {
      options: {
        weekday: "short"
      },
      part: "weekday"
    }
  },
  dddd: {
    symbol: "dddd",
    intl: {
      options: {
        weekday: "long"
      },
      part: "weekday"
    }
  },
  M: {
    symbol: "M",
    intl: {
      options: {
        month: "numeric"
      },
      part: "month"
    }
  },
  MM: {
    symbol: "MM",
    intl: {
      options: {
        month: "2-digit"
      },
      part: "month"
    }
  },
  MMM: {
    symbol: "MMM",
    intl: {
      options: {
        month: "short"
      },
      part: "month"
    }
  },
  MMMM: {
    symbol: "MMMM",
    intl: {
      options: {
        month: "long"
      },
      part: "month"
    }
  },
  "year-short": {
    symbol: ["y", "yy"],
    intl: {
      options: {
        year: "2-digit"
      },
      part: "year"
    }
  },
  "year-long": {
    symbol: ["yyyy", "yyyyy"],
    intl: {
      options: {
        year: "numeric"
      },
      part: "year"
    }
  },
  era: {
    symbol: ["g", "gg"],
    intl: {
      options: {
        era: "narrow"
      },
      part: "era"
    }
  }
}, ft = {
  "era-short": {
    symbol: ["G", "GG", "GGG"],
    intl: {
      options: {
        era: "short"
      },
      part: "era"
    }
  },
  GGGG: {
    symbol: "GGGG",
    intl: {
      options: {
        era: "long"
      },
      part: "era"
    }
  },
  GGGGG: {
    symbol: "GGGG",
    intl: {
      options: {
        era: "narrow"
      },
      part: "era"
    }
  },
  "year-numeric": {
    symbol: [
      "y",
      "yyy",
      "yyyy",
      "yyyyy",
      "Y",
      "YYY",
      "YYYY",
      "YYYYY",
      "u",
      "uuu",
      "uuuu",
      "uuuuu"
    ],
    intl: {
      options: {
        year: "numeric"
      },
      part: "year"
    }
  },
  "year-short": {
    symbol: ["yy", "YY", "uu"],
    intl: {
      options: {
        year: "2-digit"
      },
      part: "year"
    }
  },
  "month-numeric": {
    symbol: ["M", "L"],
    intl: {
      options: {
        month: "numeric"
      },
      part: "month"
    }
  },
  "month-2-digit": {
    symbol: ["MM", "LL"],
    intl: {
      options: {
        month: "2-digit"
      },
      part: "month"
    }
  },
  "month-short": {
    symbol: ["MMM", "LLL"],
    intl: {
      options: {
        month: "short"
      },
      part: "month"
    }
  },
  "month-long": {
    symbol: ["MMMM", "LLLL"],
    intl: {
      options: {
        month: "long"
      },
      part: "month"
    }
  },
  "month-narrow": {
    symbol: ["MMMMM", "LLLLL"],
    intl: {
      options: {
        month: "narrow"
      },
      part: "month"
    }
  },
  d: {
    symbol: "d",
    intl: {
      options: {
        day: "numeric"
      },
      part: "day"
    }
  },
  dd: {
    symbol: "dd",
    intl: {
      options: {
        day: "2-digit"
      },
      part: "day"
    }
  },
  "weekday-long": {
    symbol: [
      "E",
      "EE",
      "EEE",
      "EEEE",
      "e",
      "ee",
      "eee",
      "eeee",
      "c",
      "cc",
      "ccc",
      "cccc"
    ],
    intl: {
      options: {
        weekday: "long"
      },
      part: "weekday"
    }
  },
  "weekday-narrow": {
    symbol: ["EEEEE", "eeeee", "ccccc"],
    intl: {
      options: {
        weekday: "narrow"
      },
      part: "weekday"
    }
  },
  "weekday-short": {
    symbol: ["EEEEEE", "eeeeee", "cccccc"],
    intl: {
      options: {
        weekday: "short"
      },
      part: "weekday"
    }
  }
}, K = {};
K.windows = gt;
K.macos = ft;
const yt = {
  macos: [
    /l/g,
    // deprecared
    /w/g,
    // week of year
    /W/g,
    // week of month
    /D/g,
    // day of year
    /F/g,
    // day of week in month
    /g/g,
    // modified julian day
    /U/g,
    // cyclic year
    /q/g,
    // quarter
    /Q/g
    // quarter
  ]
};
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const At = {
  h: !0,
  H: !0,
  k: !0,
  K: !0,
  m: !0,
  s: !0
}, vt = {
  hh: !0,
  HH: !0,
  kk: !0,
  KK: !0,
  mm: !0,
  ss: !0
}, bt = {
  H: !0,
  HH: !0,
  K: !0,
  KK: !0
}, de = "'", Te = "~", Tt = /''/g, wt = new RegExp(Te, "g");
class St {
  constructor(e, r, n) {
    C(this, "timeTranslationMap");
    C(this, "dateTranslationMap");
    C(this, "formats", /* @__PURE__ */ new Map());
    C(this, "locale");
    C(this, "cachedDateTimeFormat");
    C(this, "unsupportedMask");
    this.timeTranslationMap = this.expandMap(Y[r] || Y.windows), this.dateTranslationMap = this.expandMap(K[r] || K.windows), this.locale = e, this.cachedDateTimeFormat = n, this.unsupportedMask = yt[r];
  }
  timeToString(e, r) {
    const n = this.getFormat(r, this.timeTranslationMap);
    return this.applyFormat(n, e);
  }
  dateToString(e, r) {
    const n = this.getFormat(r, this.dateTranslationMap);
    return this.applyFormat(n, e);
  }
  timeHasTimeZone(e) {
    var n;
    const r = this.getFormat(e, this.timeTranslationMap);
    if (r.intlOptions.timeZoneName)
      return !0;
    for (let o = 0; o < r.parts.length; o++) {
      const s = r.parts[o];
      if (typeof s != "string" && ((n = s.intlOptionsOverride) != null && n.timeZoneName))
        return !0;
    }
    return !1;
  }
  dateHasWeekday(e) {
    var n;
    const r = this.getFormat(e, this.dateTranslationMap);
    if (r.intlOptions.weekday)
      return !0;
    for (let o = 0; o < r.parts.length; o++) {
      const s = r.parts[o];
      if (typeof s != "string" && ((n = s.intlOptionsOverride) != null && n.weekday))
        return !0;
    }
    return !1;
  }
  getWeekdayName(e, r) {
    const n = {
      intlOptions: { weekday: r.weekday },
      parts: [
        { replacePart: "weekday" }
      ]
    };
    return this.applyFormat(n, e);
  }
  getTimeZoneName(e, r) {
    const n = {
      intlOptions: { timeZoneName: r.timeZoneName },
      parts: [
        { replacePart: "timeZoneName" }
      ]
    };
    return this.applyFormat(n, e);
  }
  expandMap(e) {
    const r = {};
    return Object.values(e).reduce(this.expandMapReducer, r), r;
  }
  expandMapReducer(e, r) {
    const n = r.symbol;
    if (!Array.isArray(n))
      e[n] = r;
    else
      for (let o = 0; o < n.length; o++)
        e[n[o]] = r;
    return e;
  }
  getFormat(e, r) {
    let n = this.formats.get(e);
    return n || (n = this.buildFormat(e, r), this.formats.set(e, n)), n;
  }
  buildFormat(e, r) {
    let n = {}, o = [], s = 0, a, i = !1, l = "";
    const d = this.escapeQuotes(this.stripUnsupported(e));
    for (; s < d.length; ) {
      if (a = !1, d[s] === de) {
        i && l && (o.push(l), l = ""), i = !i, s++;
        continue;
      }
      if (i) {
        l += d[s], s++;
        continue;
      }
      for (let h = d.length; h > s; h--) {
        const m = d.slice(s, h);
        if (r[m]) {
          a = !0;
          const u = r[m], A = At[m] || !1, g = vt[m] || !1, x = bt[m] || !1;
          this.didValuesChange(n, u.intl.options) ? o.push({
            replacePart: u.intl.part,
            force1Digit: A,
            force2Digits: g,
            force0forMidnight: x,
            intlOptionsOverride: u.intl.options
          }) : (n = Object.assign(n, u.intl.options), o.push({ replacePart: u.intl.part, force1Digit: A, force2Digits: g, force0forMidnight: x })), s = h;
          break;
        }
      }
      a || (o.push(this.unescapeQuotes(d[s])), s += 1);
    }
    return { intlOptions: n, parts: o };
  }
  stripUnsupported(e) {
    if (!this.unsupportedMask)
      return e;
    let r = e;
    for (let n = 0; n < this.unsupportedMask.length; n++)
      r = r.replace(this.unsupportedMask[n], "");
    return r;
  }
  escapeQuotes(e) {
    return e && e.replace(Tt, Te);
  }
  unescapeQuotes(e) {
    return e && e.replace(wt, de);
  }
  didValuesChange(e, r) {
    const n = { change: !1, newOptions: r, oldOptions: e };
    return Object.keys(r).reduce(this.didValuesChangeReducer, n), (r.hourCycle || e.hourCycle) && !!r.hour12 != !!e.hour12 && (n.change = !0), n.change;
  }
  didValuesChangeReducer(e, r) {
    return e.change || e.oldOptions[r] && e.oldOptions[r] !== e.newOptions[r] && (e.change = !0), e;
  }
  partsToObject(e) {
    const r = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n].type;
      o !== "literal" && (r[o] = e[n].value);
    }
    return r;
  }
  applyFormat(e, r) {
    const n = this.getPartValues(e.intlOptions, r);
    let o = "";
    for (let s = 0; s < e.parts.length; s++)
      o = `${o}${this.getValue(e.parts[s], n, r)}`;
    return o.replace(/\s+/g, " ").trim();
  }
  getValue(e, r, n) {
    if (typeof e == "string")
      return e;
    const o = e.intlOptionsOverride ? this.getPartValues(e.intlOptionsOverride, n) : r;
    let s;
    if (Array.isArray(e.replacePart))
      for (let a = 0; a < e.replacePart.length; a++) {
        const i = e.replacePart[a], l = o[i];
        if (l) {
          s = l;
          break;
        }
      }
    else
      s = o[e.replacePart];
    return e.force0forMidnight && s === "24" && (s = "0"), e.force1Digit && s && typeof s == "string" && s.length === 2 && s[0] === "0" ? s[1] : e.force2Digits && s && typeof s == "string" && s.length === 1 ? `0${s}` : typeof s == "string" ? s : "";
  }
  getPartValues(e, r) {
    const o = this.cachedDateTimeFormat.get(this.locale, e).formatToParts(r).map((s) => ({
      type: s.type,
      value: s.value
    }));
    return this.partsToObject(o);
  }
}
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class Et {
  /**
   * Instantiates DateTimeFormatter
   * @param locale The desired locale to which to format the date and time value (default: en-US)
   */
  constructor(e = "en-US") {
    C(this, "locale");
    // We're keying this using JSON.stringify because with a WeakMap we've have a key pair
    // (locale - string & options - object) and stringify is native so it is so fars it is
    // not worth maintaing the two-level cache (map for string and weak map for object)
    C(this, "cachedDateTimeFormat", new mt());
    C(this, "formatter");
    this.locale = e;
  }
  /**
   * Resets the formatter and clears the cached date/time formats
   **/
  resetFormatter() {
    this.formatter = void 0, this.cachedDateTimeFormat.reset();
  }
  /**
   * Localizes the date/time value
   * @param date The date/time to localize
   * @param format The format to be used for the localization
   * @returns The localized date/time string
   */
  formatDateTime(e, r) {
    return typeof this.locale == "string" ? this.cachedDateTimeFormat.get(this.locale, r).format(e) : this.formatOsDateTime(e, r, this.locale);
  }
  formatOsDateTime(e, r, n) {
    if (!n)
      throw new Error("Cannot call the OS date and time formatter without specifying the OS locale info.");
    this.formatter || (this.formatter = new St(n.regionalFormat, n.platform, this.cachedDateTimeFormat));
    let o;
    switch (typeof this.locale == "string" ? o = this.locale : o = this.locale.regionalFormat, r) {
      case Pe: {
        if (!n.shortTime)
          throw new Error("localeInfo.shortTime was not provided!");
        return this.formatter.timeToString(e, n.shortTime);
      }
      case Le:
      case Ge:
      case Ue: {
        if (!n.shortDate)
          throw new Error("localeInfo.shortDate was not provided!");
        return this.formatter.dateToString(e, n.shortDate);
      }
      case We: {
        if (!n.shortDate || !n.longTime)
          throw new Error("localeInfo.shortDate or localeInfo.longTime was not provided!");
        const a = this.formatter.dateToString(e, n.shortDate), i = this.formatter.timeToString(e, n.longTime);
        return this.combineDateAndTime(a, i);
      }
      case nt:
      case ot:
      case De: {
        if (!n.shortDate || !n.shortTime)
          throw new Error("localeInfo.shortDate or localeInfo.shortTime was not provided!");
        const a = this.formatter.dateToString(e, n.shortDate), i = this.formatter.timeToString(e, n.shortTime);
        return this.combineDateAndTime(a, i);
      }
      case rt: {
        if (!n.shortTime)
          throw new Error("localeInfo.shortTime was not provided!");
        if (n.platform === "macos") {
          const a = n.shortTime.includes("a");
          return this.formatter.timeToString(e, a ? "h a" : "H");
        } else {
          const a = n.shortTime.includes("tt"), i = n.shortTime.includes("t");
          return this.formatter.timeToString(e, a ? "h tt" : i ? "h t" : "H");
        }
      }
      case ce:
      case Ye:
      case Ve:
      case ae: {
        if (!n.longTime)
          throw new Error("localeInfo.longTime was not provided!");
        const a = this.formatter.timeToString(e, n.longTime);
        return r === ae || r === ce ? this.ensureTimeZone(a, e, n.longTime, r, n) : a;
      }
      case Xe:
      case Qe: {
        if (!n.longDate || !n.longTime)
          throw new Error("localeInfo.longDate or localeInfo.longTime was not provided!");
        const a = this.formatter.dateToString(e, n.longDate), i = this.formatter.timeToString(e, n.longTime);
        return this.combineDateAndTime(a, i);
      }
      case et: {
        if (!n.shortTime)
          throw new Error("localeInfo.shortTime was not provided!");
        const a = this.cachedDateTimeFormat.get(o, J).format(e), i = this.formatter.timeToString(e, n.shortTime);
        return `${a}, ${i}`;
      }
      case tt: {
        if (!n.shortTime)
          throw new Error("localeInfo.shortTime was not provided!");
        const a = this.cachedDateTimeFormat.get(o, L).format(e), i = this.cachedDateTimeFormat.get(o, J).format(e), l = this.formatter.timeToString(e, n.shortTime), d = this.ensureTimeZone(l, e, n.shortTime, r, n);
        return `${a}, ${i}, ${d}`;
      }
      case je:
      case Je: {
        let a = n.longDate;
        if (n.fullDate && n.fullDate !== "UNKNOWN" && (a = n.fullDate), !a || !n.longTime)
          throw new Error("localeInfo.longDate or localeInfo.longTime was not provided!");
        const i = this.formatter.dateToString(e, a), l = this.formatter.timeToString(e, n.longTime), d = this.ensureTimeZone(l, e, n.longTime, r, n);
        return this.combineDateAndTime(i, d);
      }
      case H:
      case L:
        return this.cachedDateTimeFormat.get(o, r).format(e);
      case ue:
      case it: {
        if (!n.longDate || !n.longTime)
          throw new Error("localeInfo.longDate or localeInfo.longTime was not provided!");
        return `${r === ue ? this.cachedDateTimeFormat.get(o, H).format(e) : this.cachedDateTimeFormat.get(o, L).format(e)}, ${this.formatter.timeToString(e, n.longTime)}`;
      }
      case le:
      case st: {
        if (!n.shortTime)
          throw new Error("localeInfo.shortTime was not provided!");
        return `${r === le ? this.cachedDateTimeFormat.get(o, H).format(e) : this.cachedDateTimeFormat.get(o, L).format(e)}, ${this.formatter.timeToString(e, n.shortTime)}`;
      }
      case J:
      case ze:
      case Ke:
      case He: {
        if (!n.longDate)
          throw new Error("localeInfo.longDate was not provided!");
        return this.formatter.dateToString(e, n.longDate);
      }
      case Be:
      case $e: {
        if (n.fullDate && n.fullDate !== "UNKNOWN")
          return this.formatter.dateToString(e, n.fullDate);
        if (!n.longDate)
          throw new Error("localeInfo.longDate was not provided!");
        return this.formatter.dateToString(e, n.longDate);
      }
      case qe:
      case Ze: {
        if (!n.longDate || !n.longTime)
          throw new Error("localeInfo.longDate or localeInfo.longTime was not provided!");
        const a = this.formatter.dateToString(e, n.longDate), i = this.formatter.timeToString(e, n.longTime), l = this.ensureTimeZone(i, e, n.longTime, r, n);
        return this.combineDateAndTime(a, l);
      }
    }
    let s;
    try {
      s = JSON.stringify(r);
    } catch {
    }
    throw new Error("Incorrect OS locale info format specified:" + (s || r));
  }
  combineDateAndTime(e, r) {
    return `${e} ${r}`;
  }
  ensureTimeZone(e, r, n, o, s) {
    var i, l;
    if ((i = this.formatter) != null && i.timeHasTimeZone(n))
      return e;
    const a = (l = this.formatter) == null ? void 0 : l.getTimeZoneName(r, o);
    return `${e} ${a}`;
  }
}
const _t = [
  "bn-bd",
  "bn-in",
  "ca-es-valencia",
  "en-gb",
  "es-mx",
  "fr-ca",
  "ku-arab",
  "nn-no",
  "pa-arab-pk",
  "pa-in",
  "pt-br",
  "pt-pt",
  "sr-cyrl-ba",
  "sa-cyrl-rs",
  "sr-latn-rs",
  "zh-hans",
  "zh-hant"
];
class te {
  /**
   * Construct an instance of this class
   * @param locale The locale for which to construct this context
   * @param strings The strings for this locale
   */
  constructor(e, r) {
    this.strings = {}, this.formatter = new Et(e), this.strings = r;
  }
  /**
   * Format a Date object
   * @param date The date to format
   * @param dateFormat The format to apply
   * @returns The formatted date
   */
  formatDateTime(e, r) {
    return this.formatter.formatDateTime(e, r);
  }
  /**
   * [UNIMPLEMENTED] Translate a given string
   * @param namespace The namespace in which to search for the string key
   * @param key The string key
   * @param args Any format arguments that should be applied to the localized string
   * @returns The localized string
   */
  stringTranslate(e, r, n) {
    const o = this.strings[r] || r;
    return n ? o.replace(/{(\w+)}/g, (s, a) => n[a] || s) : o;
  }
}
function Ot(t, e) {
  const [r, n] = y.useState(null);
  let o = t.toLowerCase();
  return _t.indexOf(o) === -1 && ([o] = o.split("-")), y.useEffect(() => {
    let s = !1;
    return e || import(
      /* webpackChunkName: "mecontrol-locale" */
      `../strings/${o}.js`
    ).then(({ default: a }) => {
      s || n(new te(t, a));
    }).catch(() => {
      Promise.resolve().then(() => Re).then(({ default: a }) => {
        s || n(new te(t, a));
      }).catch(() => {
        s || n(new te(t, {}));
      });
    }), () => {
      s = !0;
    };
  }, [o, t, e]), r;
}
function Ct(t) {
  const [e, r] = y.useState(!1);
  return y.useEffect(() => {
    if (!t) {
      r(!1);
      return;
    }
    let n = !1;
    const o = new Image();
    return o.onload = () => {
      n || r(!0);
    }, o.onerror = () => {
      n || r(!1);
    }, o.src = t, () => {
      n = !0, o.onload = null, o.onerror = null;
    };
  }, [t]), e;
}
var me = function(t, e, r) {
  if (r || arguments.length === 2) for (var n = 0, o = e.length, s; n < o; n++)
    (s || !(n in e)) && (s || (s = Array.prototype.slice.call(e, 0, n)), s[n] = e[n]);
  return t.concat(s || Array.prototype.slice.call(e));
}, Mt = "REDACTED", he = ["eyJhbGciOiJIUzI1NiJ9", "dGVzdFBheWxvYWQ", "c2ln"].join("."), xt = [
  {
    description: "ESTS/EvoSts encrypted primary refresh token cookie (base64 blob).",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "epct",
    testVectors: {
      positive: [
        "https://login.live.com/ppsecure/post.srf?nonce=1&epct=PAQABDgEAAABRXZvU3RzQXJ0aWZhY3Rz&x=1",
        '{"apiName":"https://x/post.srf?epct=PAQABDgEAAAA"}',
        "https://x/post.srf?a=1&amp;epct=PAQABDgEAAAA&amp;b=2",
        "https://x/post.srf?EPCT=PAQABDgEAAAA",
        '{"epct":"PAQABDgEAAABsomekey"}'
      ],
      negative: [
        "https://x/post.srf?epctenabled=true",
        "https://x/post.srf?myepct=1",
        "https://x/post.srf?epct="
      ]
    }
  },
  {
    description: "ESTS/EvoSts encrypted primary refresh token canary value.",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "epctrc",
    testVectors: {
      positive: [
        "https://x/post.srf?epctrc=AAAACANARYvalue&y=1",
        "https://x/post.srf?a=1&amp;epctrc=AAAACANARYvalue"
      ],
      negative: ["https://x/post.srf?epctrcx=1", "https://x/post.srf?epctrc="]
    }
  },
  {
    description: "OAuth authorization code (incl. Google 4/0A... codes).",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "code",
    testVectors: {
      positive: [
        "https://login.live.com/GetSessionState.srf?seclog=0&code=f9704efa5c717c5c3ccd&mkt=EN-US",
        "https://x/post.srf?code=4/0AdkVLPzabcdefg&state=1"
      ],
      negative: [
        "https://x/authorize?code_challenge=abc",
        "https://x/authorize?code_verifier=abc",
        "https://x/authorize?codee=1",
        "https://x/authorize?code="
      ]
    }
  },
  {
    description: "PKCE code challenge.",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "code_challenge",
    testVectors: {
      positive: [
        "https://login.live.com/oauth20_authorize.srf?code_challenge=PsxABCDEF&code_challenge_method=S256",
        "https://x/authorize?a=1&amp;code_challenge=PsxABCDEF"
      ],
      negative: [
        "https://x/authorize?code_challenge_method=S256",
        "https://x/authorize?code_challenge="
      ]
    }
  },
  {
    description: "PKCE code verifier (the secret paired with the challenge).",
    matchType: "named-param",
    key: "code_verifier",
    testVectors: {
      positive: ["https://x/token?code_verifier=abcdefghijklmnop"],
      negative: ["https://x/token?code_verifierx=1", "https://x/token?code_verifier="]
    }
  },
  {
    description: "OAuth state parameter (often carries a double-encoded return URL / nonce).",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "state",
    testVectors: {
      positive: [
        "https://login.live.com/oauth20_authorize.srf?state=Kdt8-abcdefg&client_id=1",
        "https://x/authorize?a=1&amp;state=3B08F153abcdef"
      ],
      negative: ["https://x/authorize?stateProvince=WA", "https://x/authorize?state="]
    }
  },
  {
    description: "OIDC session_state value.",
    matchType: "named-param",
    key: "session_state",
    testVectors: {
      positive: ["https://x/authorize?session_state=abc123def456"],
      negative: ["https://x/authorize?session_state="]
    }
  },
  {
    description: "OAuth/OIDC nonce.",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "nonce",
    testVectors: {
      positive: ["https://x/post.srf?nonce=639191abcdef&epct=1"],
      negative: [
        "https://x/authorize?sso_nonce=abc",
        "https://x/authorize?noncex=1",
        "https://x/post.srf?nonce="
      ]
    }
  },
  {
    description: "ESTS single-sign-on nonce.",
    matchType: "named-param",
    key: "sso_nonce",
    testVectors: {
      positive: [
        "https://login.microsoftonline.com/common/oauth2/authorize?nonce=&sso_nonce=AwABEgEAAAAsecret"
      ],
      negative: ["https://x/authorize?sso_nonce="]
    }
  },
  {
    description: "Login hint (username/email PII).",
    matchType: "named-param",
    key: "login_hint",
    testVectors: {
      positive: ["https://x/authorize?login_hint=user@contoso.com"],
      negative: ["https://x/authorize?login_hint="]
    }
  },
  {
    description: "ESTS anti-CSRF canary token.",
    matchType: "named-param",
    key: "ests_canary",
    testVectors: {
      positive: ["https://x/authorize?ests_canary=abcdef123456"],
      negative: ["https://x/authorize?ests_canary="]
    }
  },
  {
    description: "OIDC id_token (JWT).",
    matchType: "named-param",
    credScanCategory: "CSCAN-AZURE0140",
    key: "id_token",
    testVectors: {
      positive: ["https://x/callback?id_token=abcdefIDTOKENvalue123"],
      negative: ["https://x/callback?id_token="]
    }
  },
  {
    description: "OAuth access token.",
    matchType: "named-param",
    key: "access_token",
    testVectors: {
      positive: ["https://x/callback?access_token=abcdefACCESSvalue123"],
      negative: ["https://x/callback?access_token="]
    }
  },
  {
    description: "OAuth refresh token.",
    matchType: "named-param",
    key: "refresh_token",
    testVectors: {
      positive: ["https://x/token?refresh_token=0.AAAAabcdefg"],
      negative: ["https://x/token?refresh_token="]
    }
  },
  {
    description: "SAML / JWT bearer assertion.",
    matchType: "named-param",
    credScanCategory: "CSCAN-AZURE0140",
    key: "assertion",
    testVectors: {
      positive: ["https://x/token?assertion=abcdefASSERTvalue123"],
      negative: ["https://x/token?assertion="]
    }
  },
  {
    description: "OAuth client assertion (JWT).",
    matchType: "named-param",
    key: "client_assertion",
    testVectors: {
      positive: ["https://x/token?client_assertion=abcdefCLIENTvalue123"],
      negative: ["https://x/token?client_assertion="]
    }
  },
  {
    description: "OAuth client secret.",
    matchType: "named-param",
    key: "client_secret",
    testVectors: {
      positive: ["https://x/token?client_secret=Abc123secretvalue"],
      negative: ["https://x/token?client_secret="]
    }
  },
  {
    description: "Generic secret parameter.",
    matchType: "named-param",
    key: "secret",
    testVectors: {
      positive: ["https://test.com?a=b&secret=secretvalue"],
      negative: ["https://x?secretless=1", "https://x?secret="]
    }
  },
  {
    description: "Password parameter.",
    matchType: "named-param",
    credScanCategory: "CSCAN-GENERAL0060",
    key: "password",
    testVectors: {
      positive: ["https://x/login?password=Hunter2abc"],
      negative: ["https://x/login?password="]
    }
  },
  {
    description: "Password parameter (alternate spelling).",
    matchType: "named-param",
    credScanCategory: "CSCAN-GENERAL0060",
    key: "passwd",
    testVectors: {
      positive: ["https://x/login?passwd=Hunter2abc"],
      negative: ["https://x/login?passwd="]
    }
  },
  {
    description: "Password parameter (short spelling).",
    matchType: "named-param",
    credScanCategory: "CSCAN-GENERAL0060",
    key: "pwd",
    testVectors: {
      positive: ["https://x/login?pwd=Hunter2abc"],
      negative: ["https://x/login?pwdhash=1", "https://x/login?pwd="]
    }
  },
  {
    description: "Shared-access / URL signature.",
    matchType: "named-param",
    key: "sig",
    testVectors: {
      positive: ["https://x/resource?sig=abc123signature"],
      negative: ["https://x/resource?signx=1", "https://x/resource?sig="]
    }
  },
  {
    description: "URL signature.",
    matchType: "named-param",
    key: "signature",
    testVectors: {
      positive: ["https://x/resource?signature=abc123signature"],
      negative: ["https://x/resource?signature="]
    }
  },
  {
    description: "SAML AuthnRequest (base64 blob).",
    matchType: "named-param",
    key: "samlrequest",
    testVectors: {
      positive: ["https://x/saml?SAMLRequest=fVLBaBase64Blob"],
      negative: ["https://x/saml?SAMLRequest="]
    }
  },
  {
    description: "SAML Response (base64 blob).",
    matchType: "named-param",
    key: "samlresponse",
    testVectors: {
      positive: ["https://x/saml?SAMLResponse=fVLBaBase64Blob"],
      negative: ["https://x/saml?SAMLResponse="]
    }
  },
  {
    description: "Return URL (may carry nested credentials / tokens).",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "ru",
    testVectors: {
      positive: ["https://account.live.com/qrcr?ru=https%3a%2f%2flogin.live.com%2flogin.srf"],
      negative: ["https://x?run=1", "https://x?true=1", "https://x?ru="]
    }
  },
  {
    description: "Signed return URL (may carry nested credentials / tokens).",
    matchType: "named-param",
    credScanCategory: "CSCAN-MSFT0010",
    key: "sru",
    testVectors: {
      positive: ["https://x?sru=https%3a%2f%2flogin.live.com%2flogin.srf%3fcode_challenge%3dabc"],
      negative: ["https://x?srus=1", "https://x?sru="]
    }
  },
  {
    description: "Google hosted-domain hint (PII).",
    matchType: "named-param",
    key: "hd",
    testVectors: {
      positive: ["https://x/authorize?hd=contoso.com"],
      negative: [
        "https://x/authorize?hdr=1",
        "https://x/authorize?head=1",
        "https://x/authorize?hd="
      ]
    }
  }
], Nt = [
  {
    description: "JSON Web Token / JWS (id_token, access_token, assertion) appearing anywhere in the payload.",
    matchType: "value-shape",
    credScanCategory: "CSCAN-AZURE0140",
    // Group: (whole token). 2- or 3-segment base64url separated by dots, starting with the
    // canonical `eyJ` header prefix (base64 of `{"`).
    pattern: "(eyJ[A-Za-z0-9_\\-]+\\.[A-Za-z0-9_\\-]+(?:\\.[A-Za-z0-9_\\-]+)?)",
    testVectors: {
      positive: ["bearer ".concat(he), '{"stack":"at foo (token '.concat(he, ')"}')],
      negative: ["not a jwt: eyJonly", "plain.text.value", "eyJmissingdot"]
    }
  },
  {
    description: "Google OAuth authorization code (4/0A... shape) appearing without a `code=` key.",
    matchType: "value-shape",
    // Group: (whole token).
    pattern: "(4\\/0[A-Za-z0-9._\\-]{6,})",
    testVectors: {
      positive: ["redirected to 4/0AdkVLPzabcdefghij"],
      negative: ["4/0", "ratio 4/0abc is 12/0", "40Aabcdefg"]
    }
  },
  {
    description: "Leading opaque MSA/WLID token (`?**!<token>` or `?**,<token>`) with no key=value form.",
    matchType: "value-shape",
    credScanCategory: "CSCAN-MSFT0010",
    // Groups: (marker `?**!` or `?**,`)(token up to next delimiter).
    pattern: `(\\?\\*\\*[!,])([^&#"'\\s]*)`,
    testVectors: {
      positive: [
        "https://login.live.com/GetSessionState.srf?**!4W8JTHywU3rfiTzi0mo&seclog=0",
        "https://login.live.com/oauth20_authorize.srf?**,easi2abcdef&xsup=1"
      ],
      negative: ["https://x/post.srf?code=1", "https://x/post.srf?**&x=1"]
    }
  }
], It = me(me([], xt, !0), Nt, !0);
function kt(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Rt(t) {
  for (var e = 0, r = 0; r < t.length; r += 1) {
    var n = t.charAt(r);
    n === "\\" ? r += 1 : n === "(" && t.charAt(r + 1) !== "?" && (e += 1);
  }
  return e;
}
function G(t) {
  return t ? Mt : "";
}
function Ft(t) {
  return t.map(function(e) {
    return e.key;
  }).slice().sort(function(e, r) {
    return r.length - e.length;
  }).map(kt).join("|");
}
function Pt(t) {
  var e = t.filter(function(s) {
    return s.matchType === "named-param";
  }), r = t.filter(function(s) {
    return s.matchType === "value-shape";
  }), n = [];
  if (e.length > 0) {
    var o = Ft(e);
    n.push({
      source: `(^|&amp;|[\\s"'?&#])(`.concat(o, ')=((?:[^&#"\\\\]|\\\\.)*)'),
      groupCount: 3,
      redact: function(s) {
        return "".concat(s[0]).concat(s[1], "=").concat(G(s[2]));
      }
    }), n.push({
      source: "(%3F|%26|%253F|%2526)(".concat(o, ')(?:%3D|%253D)((?:[^&#"\\\\]|\\\\.)*?)(?=%3F|%26|%253F|%2526|\\?|&|#|$)'),
      groupCount: 3,
      redact: function(s) {
        return "".concat(s[0]).concat(s[1], "%3D").concat(G(s[2]));
      }
    }), n.push({
      source: '("(?:'.concat(o, ')"\\s*:\\s*")((?:[^"\\\\]|\\\\.)*)'),
      groupCount: 2,
      redact: function(s) {
        return "".concat(s[0]).concat(G(s[1]));
      }
    });
  }
  return r.forEach(function(s) {
    var a = s.pattern, i = Rt(a);
    n.push({
      source: a,
      groupCount: i,
      redact: function(l) {
        return i >= 2 ? "".concat(l[0]).concat(G(l[1])) : G(l[0]);
      }
    });
  }), n;
}
function Lt(t) {
  var e = Pt(t);
  if (e.length === 0)
    return { redact: function(a) {
      return a;
    }, redactPayload: function(a) {
      return a;
    } };
  var r = new RegExp(e.map(function(a) {
    return a.source;
  }).join("|"), "gi"), n = function() {
    for (var a = [], i = 0; i < arguments.length; i++)
      a[i] = arguments[i];
    for (var l = a[0], d = 1, h = 0; h < e.length; h += 1) {
      for (var m = e[h], u = [], A = !1, g = 0; g < m.groupCount; g += 1) {
        var x = a[d + g], F = typeof x == "string" ? x : void 0;
        u.push(F), F !== void 0 && (A = !0);
      }
      if (A)
        return m.redact(u);
      d += m.groupCount;
    }
    return l;
  }, o = function(a) {
    if (!a)
      return a;
    try {
      return a.replace(r, n);
    } catch {
      return a;
    }
  }, s = function(a) {
    try {
      return JSON.parse(o(JSON.stringify(a)));
    } catch {
      return a;
    }
  };
  return { redact: o, redactPayload: s };
}
var Ut = Lt(It);
function we(t) {
  return Ut.redactPayload(t);
}
var oe = function() {
  return oe = Object.assign || function(t) {
    for (var e, r = 1, n = arguments.length; r < n; r++) {
      e = arguments[r];
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
  }, oe.apply(this, arguments);
}, R;
(function(t) {
  t.Redact = "redact", t.LegacyBehavior = "legacy-behavior", t.Passthrough = "passthrough";
})(R || (R = {}));
var Dt = {
  rolloutEnabled: !0,
  emergencyPassthrough: !1
}, pe = oe({}, Dt);
function Se() {
  return pe.emergencyPassthrough ? R.Passthrough : pe.rolloutEnabled ? R.Redact : R.LegacyBehavior;
}
var Wt = (
  /** @class */
  function() {
    function t() {
    }
    return t.prototype.addEvent = function(e) {
      var r = Se() === R.Redact ? we(e) : e;
      console.log("Logged event: ".concat(JSON.stringify(r, void 0, 2)));
    }, t;
  }()
), V = function() {
  return V = Object.assign || function(t) {
    for (var e, r = 1, n = arguments.length; r < n; r++) {
      e = arguments[r];
      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
  }, V.apply(this, arguments);
}, N;
(function(t) {
  t[t.NotStarted = 0] = "NotStarted", t[t.InProgress = 1] = "InProgress", t[t.Done = 2] = "Done", t[t.Failed = 3] = "Failed";
})(N || (N = {}));
var Gt = (
  /** @class */
  function() {
    function t() {
      this.eventBuffer = [], this.oneDsLoadState = N.NotStarted;
    }
    return t.prototype.initialize = function(e) {
      var r = this;
      if (this.oneDsLoadState !== N.NotStarted)
        return Promise.reject(new Error("OneDsTelemetryProvider has already been initialized"));
      var n = V(V({ instrumentationKey: e.instrumentationKey }, e.endpointUrl && { endpointUrl: e.endpointUrl }), { disablePageUnloadEvents: ["unload"], extensions: [], extensionConfig: [], channelConfiguration: {
        eventsLimitInMem: 50,
        ignoreMc1Ms0CookieProcessing: !0
      }, propertyConfiguration: {
        hashIdentifiers: !0,
        // this prevents the SDK from sending PII
        gpcDataSharingOptIn: !1
        // this sets the GPC flag to false (compliance requirement)
      }, cookieCfg: {
        ignoreCookies: ["ANON", "MicrosoftApplicationsTelemetryDeviceId"]
        // this prevents the SDK from sending ANID which is a PII
      }, disableCookiesUsage: !0 }), o = import(
        /* webpackChunkName: "oneds-analytics-js" */
        "./Index-rMmMtAfu.js"
      ).then(
        // resolve
        function(s) {
          r.oneDs = new s.ApplicationInsights(), r.oneDs.initialize(n), r.oneDsLoadState = N.Done, r.eventBuffer.forEach(function(a) {
            r.oneDs.track(t.formatEvent(a));
          }), r.eventBuffer = [];
        },
        // reject
        function() {
          r.oneDsLoadState = N.Failed;
        }
      );
      return this.oneDsLoadState = N.InProgress, o;
    }, t.prototype.addEvent = function(e) {
      var r = this;
      if (this.oneDsLoadState !== N.Failed)
        try {
          if (this.oneDsLoadState === N.Done) {
            this.oneDs.track(t.formatEvent(e)), this.eventBuffer.length > 0 && (this.eventBuffer.forEach(function(n) {
              r.oneDs.track(t.formatEvent(n));
            }), this.eventBuffer = []);
            return;
          }
          this.eventBuffer.push(e);
        } catch (n) {
          console.warn("Failed to log telemetry: ".concat(n instanceof Error ? n.message : n));
        }
    }, t.formatEvent = function(e) {
      var r = V({}, e);
      switch (r._table = void 0, Se()) {
        case R.Passthrough:
          break;
        case R.LegacyBehavior:
          r = t.removeQueryParams(r);
          break;
        default:
          r = t.redactEvent(r);
          break;
      }
      var n = {
        name: e._table,
        data: r
      };
      return n.sync = !1, n.baseData = {}, n;
    }, t.redactEvent = function(e) {
      return we(e);
    }, t.removeQueryParams = function(e) {
      try {
        var r = JSON.stringify(e);
        return r = r.replace(/\?([a-zA-Z0-9~+\-._%:/]+=[a-zA-Z0-9~+\-._%:/]*&?)+/g, "?**"), JSON.parse(r);
      } catch {
        return e;
      }
    }, t;
  }()
);
const zt = "4.17.7";
var E;
(function(t) {
  t.Error = "MeControlWeb__Error", t.PageView = "MeControlWeb_PageView", t.OutgoingRequest = "MeControlWeb_OutgoingRequest";
})(E || (E = {}));
const ge = "b8ffe739c47a401190627519795ca4d2-044a8309-9d4b-430b-9d47-6e87775cbab6-6888";
class Ht {
  constructor() {
    this.partner = "defaultPartner", this.version = zt;
  }
  /**
   * initializes the telemetry provider
   * @param enableTelemetry configurable boolean to enable/disable telemetry
   * @param partner partner name
   */
  initialize(e, r) {
    this.telemetryProvider || (e && ge ? (this.telemetryProvider = new Gt(), this.telemetryProvider.initialize({
      instrumentationKey: ge
    })) : this.telemetryProvider = new Wt(), this.partner = r);
  }
  /**
   * Get the telemetry provider
   * @returns The telemetry provider
   */
  getInstance() {
    if (!this.telemetryProvider)
      throw new Error("Telemetry provider has not been initialized");
    return this.telemetryProvider;
  }
  /**
   * logs telemetry event
   * @param data telemetry event
   */
  logEvent(e) {
    const r = {
      partner: this.partner,
      version: this.version
    }, n = Object.assign(Object.assign({}, e), { metaData: r });
    this.getInstance().addEvent(n);
  }
  /**
   * logs error event by constructing the error event object
   * @param error error to report
   */
  logError(e) {
    this.logEvent({
      _table: E.Error,
      errorMessage: e.message,
      errorName: e.name,
      errorInfo: e.stack || ""
    });
  }
}
const O = new Ht();
class Vt extends y.Component {
  /**
   * Construct an ErrorBoundary instance
   * @param props ErrorBoundary properties
   */
  constructor(e) {
    super(e), this.state = { hasError: !1 };
  }
  /**
   * Lifecycle method invoked after an error has been thrown by a descendant component.
   * @returns a value to update state.
   */
  static getDerivedStateFromError() {
    return { hasError: !0 };
  }
  /**
   * Lifecycle method invoked after an error has been thrown by a descendant component.
   * @param {Error} error The error that was thrown by descendant component.
   */
  componentDidCatch(e) {
    O.logError(e);
  }
  /**
   * Required lifecycle method to update UI
   * @returns HTML elements
   */
  render() {
    const { hasError: e } = this.state, { children: r } = this.props;
    return !e && r;
  }
}
const qt = (t, e, r, n, o) => p.createElement(
  "div",
  { style: o },
  p.createElement("img", { src: t, alt: e, style: n }),
  p.createElement("span", { style: { margin: 8, fontSize: 14, whiteSpace: "nowrap" } }, r)
), Zt = (t, e, r) => p.createElement("img", { src: t, alt: e, style: r }), $t = (t, e, r) => p.createElement(
  "div",
  { style: r },
  p.createElement("span", null, t),
  p.createElement("span", { style: { margin: 8, fontSize: 14, whiteSpace: "nowrap" } }, e)
), Bt = (t) => p.createElement("span", null, t), jt = function({ ariaLabel: e, onClick: r, placeholderStyles: n, initials: o, pictureUrl: s, showUserName: a = !1, userName: i }) {
  const l = {
    height: 36,
    width: 36,
    backgroundColor: "transparent",
    borderColor: "white",
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    fontSize: 14,
    cursor: "pointer",
    color: "white",
    alignItems: "center",
    justifyContent: "center"
  }, d = {
    width: "inherit",
    height: "inherit",
    borderRadius: "inherit"
  }, h = Object.assign(Object.assign({}, d), { display: "inline-flex", alignItems: "center", width: "20px", height: "20px" }), m = Ct(s ?? null);
  let u;
  return m && a ? u = qt(s, o, i, d, h) : m && !a ? u = Zt(s, o, d) : !m && a ? u = $t(o, i, h) : u = Bt(o), p.createElement("button", { type: "button", onClick: r, "aria-label": e, style: Object.assign(Object.assign({}, l), n) }, u);
}, Jt = p.lazy(() => import(
  /* [ME_CONTROL_WEBPACK_MAGIC_COMMENT_PREFETCH] */
  "./nova-fluent-me-control-wrapper-C-LAsqFx.js"
)), Yt = function({ handlers: e, currentAccount: r, locale: n, theme: o, rememberedAccounts: s, additionalLinks: a, placeholderStyles: i, inline: l = !0, partner: d, enableTelemetry: h = !0, defaultExpanded: m = !1, showUserName: u = !1, accountLink: A, themeOverrides: g, popoverPosition: x, popoverAlign: F, renderTrigger: U }) {
  O.initialize(h, d);
  const T = Ot(n), c = Fe(r, T), [b, f] = y.useState(!1), S = p.createElement(jt, { ariaLabel: c, onClick: () => {
    f(!0), r || e.signIn();
  }, initials: ke(r), pictureUrl: r == null ? void 0 : r.profilePicUrl, placeholderStyles: i, showUserName: u, userName: r == null ? void 0 : r.friendlyName }), _ = U ?? S, D = (U || b || m) && r;
  return p.useEffect(() => {
    O.logEvent({
      _table: E.PageView,
      userView: D ? "PlaceholderClicked" : "PlaceholderLoaded"
    });
  }, [D]), p.createElement(
    Vt,
    null,
    p.createElement("div", null, D ? p.createElement(
      p.Suspense,
      { fallback: p.createElement("div", null, _) },
      p.createElement(Jt, { startWithMenuOpened: !0, locale: n, theme: o, handlers: e, placeholderComponent: _, currentAccount: r, rememberedAccounts: s, additionalLinks: a, inline: l, accountLink: A, themeOverrides: g, popoverPosition: x, popoverAlign: F })
    ) : _)
  );
};
class se {
  /**
   * Constructor for the IFrameManager
   * @param parent The parent element that the iframe should be attached to
   */
  constructor(e) {
    this._iFrame = null, this.expectedTargetOrigin = "", this.parent = e || document.body;
  }
  /**
   * Get an instance of the managed iframe
   * @returns An instance of the iframe
   */
  getFrame() {
    return this._iFrame || (this._iFrame = document.createElement("iframe"), this._iFrame.setAttribute("sandbox", "allow-forms allow-scripts allow-same-origin"), this._iFrame.style.display = "none", this.parent.appendChild(this._iFrame)), this._iFrame;
  }
  /**
   * fetches token for graph call to fetch picture by posting the data to the iframe
   * @param data data to post
   */
  postMessageToIframe(e) {
    const r = this.getFrame();
    r.contentWindow && r.contentWindow.postMessage(e, this.expectedTargetOrigin);
  }
  /**
   * Navigates the iframe to a given URI
   * @param url The URI to navigate the iframe to
   * @param additionalQsParams Any additional query string params to append to the URI before initiating navigation
   * @param expectedTargetOrigin The expected origin of the iframe if different from the origin of the URI
   */
  navigate(e, r = {}, n) {
    const o = this.getFrame(), s = new URL(e), a = Object.keys(r);
    for (let i = 0; i < a.length; i += 1)
      s.searchParams.append(a[i], r[a[i]]);
    this.expectedTargetOrigin = n || s.origin, o.src = s.toString();
  }
  /**
   * Waits for messages from the iframe to the parent
   * @param timeout The amount of time, in milliseconds, to wait for a response
   * @param expectedMessages The number of expected messages that should be received from the iframe
   * @returns A promise that resolves with the set of messages received from the iframe
   */
  waitForMessages(e, r) {
    return new Promise((n, o) => {
      let s = !1;
      const a = [], i = (l) => {
        l.origin === this.expectedTargetOrigin && (a.push(l.data), a.length >= r && (window.removeEventListener("message", i), s = !0, n(a)));
      };
      window.addEventListener("message", i, !1), setTimeout(() => {
        s || o(new Error(`Timeout waiting for messages from iframe from origin ${this.expectedTargetOrigin} after ${e}ms`));
      }, e);
    });
  }
  /**
   * Sets up a load event listener on the iframe that fires once
   * @param callback The callback function to execute when the iframe loads
   */
  onLoad(e) {
    this.getFrame().addEventListener("load", e, { once: !0 });
  }
}
const fe = 50 * 1e3;
let Z, $;
function Kt(t) {
  const { userList: e } = t;
  return e && e.length > 0 ? e.map((r) => {
    var n;
    return {
      id: r.memberName,
      accountType: (n = r.idp) === null || n === void 0 ? void 0 : n.toUpperCase(),
      preferredUsername: r.memberName,
      firstName: r.firstName,
      lastName: r.lastName,
      friendlyName: `${r.firstName} ${r.lastName}`.trim() || r.displayName.trim() || ""
    };
  }) : [];
}
function Qt({ msaUrl: t, aadUrl: e, getRememberedAccounts: r }, n) {
  if (r)
    return r().then((s) => ({
      rememberedAccounts: s,
      failures: []
    }));
  const o = [];
  if (t) {
    $ || ($ = new se(n)), $.navigate(t);
    let s = 1;
    t.includes("idpflag=proxy") && (s = 2), o.push($.waitForMessages(fe, s)), O.logEvent({
      _table: E.OutgoingRequest,
      requestType: "RememberedAccountsRequest",
      requestUrl: new URL(t).origin,
      requestStatus: "Initiated"
    });
  }
  if (e) {
    Z || (Z = new se(n)), Z.navigate(e);
    let s = 1;
    e.includes("idpflag=proxy") && (s = 2), o.push(Z.waitForMessages(fe, s)), O.logEvent({
      _table: E.OutgoingRequest,
      requestType: "RememberedAccountsRequest",
      requestUrl: new URL(e).origin,
      requestStatus: "Initiated"
    });
  }
  return new Promise((s, a) => {
    let i = [];
    const l = [];
    let d = !1;
    Promise.allSettled(o).then((h) => {
      h.forEach((m) => {
        m.status === "rejected" ? l.push(m.reason) : (m.value && m.value.length > 0 && m.value.forEach((u) => {
          i = i.concat(Kt(JSON.parse(u)));
        }), d = !0);
      }), d ? (O.logEvent({
        _table: E.OutgoingRequest,
        requestType: "RememberedAccountsRequest",
        requestUrl: `${e && new URL(e).origin} & ${t && new URL(t).origin}`,
        requestStatus: `Success with ${i.length - 1} accounts`
        // -1 to account for the current account
      }), s({ rememberedAccounts: i, failures: l })) : (O.logEvent({
        _table: E.OutgoingRequest,
        requestType: "RememberedAccountsRequest",
        requestUrl: `${e && new URL(e).origin} & ${t && new URL(t).origin}`,
        requestStatus: `Failed to fetch remembered accounts: ${JSON.stringify(l)}}`
      }), a(l));
    }).catch((h) => {
      O.logEvent({
        _table: E.OutgoingRequest,
        requestType: "RememberedAccountsRequest",
        requestUrl: `${e && new URL(e).origin} & ${t && new URL(t).origin}`,
        requestStatus: `Failed to fetch remembered accounts: ${JSON.stringify(h)}}`
      });
    });
  });
}
function Xt(t) {
  const r = new URL(t.redirect_uri).origin, n = new se();
  function o(s) {
    return t.state === s.state ? s.status === "INI" ? (n.postMessageToIframe(t.GetFrameInitResponse()), n.waitForMessages(1e4, 1).then((a) => o(a[0]))) : Promise.resolve([s]) : Promise.reject(new Error("Invalid state from IFrame when fetching profile picture"));
  }
  return n.navigate(t.getCodeReqUrl(), void 0, r), n.waitForMessages(1e4, 1).then((s) => o(s[0]));
}
function er(t, e, r = !0) {
  const n = new URL(t);
  return n && Object.keys(e).forEach((o) => {
    const s = e[o];
    Object.prototype.hasOwnProperty.call(e, o) && (r || s) && n.searchParams.set(o, s != null ? String(s) : "");
  }), n.toString();
}
function B(t) {
  return t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t === 62 ? 43 : t === 63 ? 47 : 65;
}
function tr(t) {
  const e = (3 - t.length % 3) % 3;
  let r = "", n, o, s, a;
  for (n = t.length, o = t.length, s = 0, a = 0; a < o; a++)
    n = a % 3, s |= t[a] << (16 >>> n & 24), (n === 2 || t.length - a === 1) && (r += String.fromCharCode(B(s >>> 18 & 63), B(s >>> 12 & 63), B(s >>> 6 & 63), B(s & 63)), s = 0);
  if (e === 0)
    return r;
  const i = r.substring(0, r.length - e);
  return e === 1 ? `${i}=` : `${i}==`;
}
function ie(t) {
  return tr(t).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
var Ee = function(t, e, r, n) {
  function o(s) {
    return s instanceof r ? s : new r(function(a) {
      a(s);
    });
  }
  return new (r || (r = Promise))(function(s, a) {
    function i(h) {
      try {
        d(n.next(h));
      } catch (m) {
        a(m);
      }
    }
    function l(h) {
      try {
        d(n.throw(h));
      } catch (m) {
        a(m);
      }
    }
    function d(h) {
      h.done ? s(h.value) : o(h.value).then(i, l);
    }
    d((n = n.apply(t, e || [])).next());
  });
};
function ye() {
  const t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", e = "0123456789abcdef";
  let r = 0, n = "";
  for (let o = 0; o < 36; o++)
    t[o] !== "-" && t[o] !== "4" && (r = Math.random() * 16 | 0), t[o] === "x" ? n += e[r] : t[o] === "y" ? (r &= 3, r |= 8, n += e[r]) : n += t[o];
  return n;
}
function rr(t) {
  const r = new Uint8Array(32);
  return t.getRandomValues(r), ie(r);
}
function nr(t) {
  let e, r = 0;
  const n = t.length;
  for (let s = 0; s < n; s++)
    e = t.charCodeAt(s), e < 128 ? r += 1 : e < 2048 ? r += 2 : e < 65536 ? r += 3 : e < 2097152 ? r += 4 : e < 67108864 ? r += 5 : r += 6;
  const o = new Uint8Array(r);
  for (let s = 0, a = 0; s < r; a++)
    e = t.charCodeAt(a), e < 128 ? o[s++] = e : e < 2048 ? (o[s++] = 192 + (e >>> 6), o[s++] = 128 + (e & 63)) : e < 65536 ? (o[s++] = 224 + (e >>> 12), o[s++] = 128 + (e >>> 6 & 63), o[s++] = 128 + (e & 63)) : e < 2097152 ? (o[s++] = 240 + (e >>> 18), o[s++] = 128 + (e >>> 12 & 63), o[s++] = 128 + (e >>> 6 & 63), o[s++] = 128 + (e & 63)) : e < 67108864 ? (o[s++] = 248 + (e >>> 24), o[s++] = 128 + (e >>> 18 & 63), o[s++] = 128 + (e >>> 12 & 63), o[s++] = 128 + (e >>> 6 & 63), o[s++] = 128 + (e & 63)) : (o[s++] = 252 + (e >>> 30), o[s++] = 128 + (e >>> 24 & 63), o[s++] = 128 + (e >>> 18 & 63), o[s++] = 128 + (e >>> 12 & 63), o[s++] = 128 + (e >>> 6 & 63), o[s++] = 128 + (e & 63));
  return o;
}
function _e(t, e) {
  return Ee(this, void 0, void 0, function* () {
    const r = nr(e);
    function n(o) {
      return window.crypto.subtle ? window.crypto.subtle.digest("SHA-256", o).then((s) => ie(new Uint8Array(s))) : Promise.resolve("");
    }
    return window.crypto ? yield n(r) : new Promise((o) => {
      if (t.subtle) {
        const s = t.subtle.digest("SHA-256", r);
        s.oncomplete = (a) => {
          const i = a.target.result;
          o(ie(new Uint8Array(i)));
        };
      }
    });
  });
}
function or() {
  return Ee(this, void 0, void 0, function* () {
    let { crypto: t } = window;
    window.msCrypto && !t && (t = window.msCrypto);
    const e = rr(t), r = yield _e(t, e);
    return {
      verifier: e,
      challenge: r
    };
  });
}
class sr {
  /**
   * constructs MSGraphOAuth2Builder object
   * @param account account to get picture for
   * @param accountId user account id (generated or from currentAccount)
   * @param graphResources graph resources to request
   * @param state state of transaction
   * @param redirect_uri redirect uri (CDN endpoint with iframe content)
   */
  constructor(e, r, n, o, s) {
    this.account = e, this.accountId = r, this.graphResources = n, this.state = o, this.code = { challenge: "", verifier: "" }, this.client_id = "7eadcef8-456d-4611-9480-4fff72b8b9e2", this.scope = "user.read", this.code_challenge_method = "S256", this.grant_type = "authorization_code", this.response_type = "code", this.response_mode = "fragment", this.prompt = "none", this.response_type = "code", this.response_mode = "fragment", this.redirect_uri = s ?? "https://amcdn.msftauth.net/me/callgraph";
  }
  /**
   * @returns Promise resolves to string url to request code
   */
  initCodeFlow() {
    return or().then((e) => {
      var r;
      this.code = e, this.state = (r = this.state) !== null && r !== void 0 ? r : ye();
    });
  }
  /**
   * @returns code request url
   */
  getCodeReqUrl() {
    return er("https://login.microsoftonline.com/common/oauth2/v2.0/authorize", this.GetCodeQueryParams(), !1);
  }
  /**
   * @returns code request query params
   */
  GetCodeQueryParams() {
    var e, r;
    const n = {
      client_id: this.client_id,
      scope: this.scope,
      code_challenge: (e = this.code) === null || e === void 0 ? void 0 : e.challenge,
      code_challenge_method: this.code_challenge_method,
      prompt: this.prompt,
      redirect_uri: this.redirect_uri,
      response_mode: this.response_mode,
      response_type: this.response_type,
      state: (r = this.state) !== null && r !== void 0 ? r : ye()
    };
    if (this.account.accountType === "AAD" && this.account.sessionId)
      n.sid = this.account.sessionId;
    else if (this.account.preferredUsername)
      n.login_hint = this.account.preferredUsername;
    else
      throw new Error("Fatal Error: Account is missing critical id info.");
    return n;
  }
  /**
   * @returns values sent to iframe to request token
   */
  GetFrameInitResponse() {
    if (!this.state)
      throw new Error("Critical error: Missing state of transaction.");
    return {
      accountId: this.accountId,
      state: this.state,
      qParams: {
        code_verifier: this.code.verifier,
        client_id: this.client_id,
        scope: this.scope,
        redirect_uri: this.redirect_uri,
        grant_type: this.grant_type
      },
      graphResources: this.graphResources
    };
  }
}
const ir = (t) => `${t.accountType}:${t.preferredUsername && t.preferredUsername.toLowerCase()}`, ar = (t) => {
  const e = t && ir(t) || "";
  if (O.logEvent({
    _table: E.OutgoingRequest,
    requestType: "GraphPictureRequest",
    requestUrl: "https://graph.microsoft.com",
    requestStatus: "Initiated"
  }), e === "")
    return O.logEvent({
      _table: E.OutgoingRequest,
      requestType: "GraphPictureRequest",
      requestUrl: "https://graph.microsoft.com",
      requestStatus: "Failed to retrieve account id for graph picture"
    }), Promise.resolve();
  const r = window.crypto || window.msCrypto;
  function n(o) {
    var s;
    let a;
    if (o !== void 0) {
      const i = o[0], l = (s = i.payload.resource) !== null && s !== void 0 ? s : i.payload.pictureUrl;
      i.status === "OK" && l && (a = l);
    }
    return O.logEvent({
      _table: E.OutgoingRequest,
      requestType: "GraphPictureRequest",
      requestUrl: "https://graph.microsoft.com",
      requestStatus: "Success"
    }), a;
  }
  return _e(r, e).then((o) => {
    const s = [
      {
        key: o,
        resourceType: "pictureUrl",
        resourceName: "pictureUrl",
        resourceUrl: "https://graph.microsoft.com/v1.0/me/photos/96x96/$value",
        resource: null
      }
    ], a = new sr(t, o, s);
    return a.initCodeFlow().then(() => Xt(a).then(n).catch((i) => {
      O.logEvent({
        _table: E.OutgoingRequest,
        requestType: "GraphPictureRequest",
        requestUrl: "https://graph.microsoft.com",
        requestStatus: `Failed to retrieve graph picture ${JSON.stringify(i)}`
      });
    }));
  });
}, Oe = (t, e) => {
  if (t.protocol !== "javascript")
    for (let r = 0; r < Object.keys(e).length; r += 1) {
      const n = Object.keys(e)[r], o = e[n];
      o && t.searchParams.set(n, o || "");
    }
  return t.toString();
}, X = (t, e, r) => {
  const n = {}, o = new URL(t, window.location.origin);
  return o.searchParams.has("ru") || (n.ru = window.location.href), e && (n.login_hint = e), r && (n.sessionId = r), Oe(o, n);
}, k = (t, e) => t || (e ? e() : "/"), cr = (t) => typeof t == "string" ? X(t) : t(), I = (t, e) => typeof t == "string" ? e ? Oe(new URL(t, window.location.origin), { idpflag: e.idpflag }) : t : t(), lr = (t, e) => typeof t == "string" ? X(
  t,
  void 0,
  e.currentAccount.sessionId
) : t(e), ur = (t, e) => typeof t == "string" ? X(t) : t(e), dr = (t, e) => typeof t == "string" ? X(t, e.nextAccount.memberName, void 0) : t(e), j = (t) => {
  window.open(t, "_top");
};
var v = /* @__PURE__ */ ((t) => (t[t.Converged = 1] = "Converged", t[t.Msa = 2] = "Msa", t[t.Aad = 4] = "Aad", t))(v || {}), w = /* @__PURE__ */ ((t) => (t.PartnerManaged = "partnerManaged", t.WebDualStack = "webDualStack", t.WebAadOnly = "webAadOnly", t.WebAadWithMsaFed = "webAadWithMsaFed", t.WebMsaOnly = "webMsaOnly", t.WebAadWithMsaProxy = "webAadWithMsaProxy", t.WebMsaWithAadProxy = "webMsaWithAadProxy", t.AdalJsWithMsaFed = "adalJsWithMsaFed", t.AdalJsAadOnly = "adalJsAadOnly", t.MsalJsAadOnly = "msalJsAadOnly", t.MsalJsWithMsa = "msalJsWithMsa", t.V1BackCompat = "v1BackCompat", t))(w || {}), M = /* @__PURE__ */ ((t) => (t.AAD = "aad", t.MSA = "msa", t.MSA_FED = "msaFed", t))(M || {}), z = /* @__PURE__ */ ((t) => (t.SignedIn = "signedIn", t.SignedInIDPOnly = "signedInIDPOnly", t.NotSignedIn = "notSignedIn", t))(z || {});
const mr = function(e, r) {
  const n = (i) => i && i.signOutUrl && i.signOutAndForgetUrl && i.rememberedAccountsUrl && i.forgetUrl ? !0 : (console.warn("MeControl: Invalid AAD auth configuration"), !1), o = (i) => i && i.signOutUrl && i.signOutAndForgetUrl && i.forgetUrl ? !0 : (console.warn("MeControl: Invalid AAD auth configuration for AAD Proxy"), !1), s = (i) => i && i.signOutAndForgetUrl && i.rememberedAccountsUrl ? !0 : (console.warn("MeControl: Invalid MSA auth configuration"), !1), a = () => e ? !e.meControlOptions || !e.meControlOptions.authProviderConfig || !e.meControlOptions.authProviderConfig.type ? (console.error("MeControl: Config does not meet basic requirements"), !1) : !0 : !1;
  return y.useMemo(() => {
    const i = () => r, l = (c, b) => {
      const f = {
        signIn: () => {
          j(cr(c.appSignInUrl));
        },
        signOut: () => {
          const S = {
            currentAccount: i()
          };
          j(lr(c.appSignOutUrl, S));
        }
      };
      return c.appSwitchUrl && (f.addNewAccount = () => {
        const S = {
          currentAccount: i(),
          signInType: b
        };
        j(ur(c.appSwitchUrl, S));
      }), c.appSwitchToUrl && (f.switchTo = ({ accountId: S }) => {
        const _ = {
          currentAccount: i(),
          nextAccount: { memberName: S }
        };
        j(dr(c.appSwitchToUrl, _));
      }), f;
    }, d = (c) => ({
      ...l(T, c)
    }), h = () => {
      const c = T;
      return !n(c.aad) || !s(c.msa) ? d(v.Converged) : {
        ...l(c, v.Converged),
        rememberedAccountsParams: {
          aadUrl: I(c.aad.rememberedAccountsUrl),
          msaUrl: I(c.msa.rememberedAccountsUrl)
        }
      };
    }, m = () => {
      let c;
      return T == null || T.type, w.WebAadWithMsaFed, c = T, n(c.aad) ? {
        ...l(c, v.Aad),
        rememberedAccountsParams: {
          aadUrl: I(c.aad.rememberedAccountsUrl)
        }
      } : d(v.Aad);
    }, u = () => {
      const c = T;
      return s(c.msa) ? {
        ...l(c, v.Msa),
        rememberedAccountsParams: {
          msaUrl: I(c.msa.rememberedAccountsUrl)
        }
      } : d(v.Msa);
    }, A = () => {
      const c = T;
      return n(c.aad) ? {
        ...l(c, v.Converged),
        rememberedAccountsParams: {
          aadUrl: I(c.aad.rememberedAccountsUrl, { idpflag: "proxy" })
        }
      } : d(v.Converged);
    }, g = () => {
      const c = T;
      return !o(c.aad) || !s(c.msa) ? d(v.Converged) : {
        ...l(c, v.Converged),
        rememberedAccountsParams: {
          msaUrl: I(c.msa.rememberedAccountsUrl, { idpflag: "proxy" })
        }
      };
    }, x = () => {
      const c = T, b = c.signInExperienceTypes;
      return {
        signIn: () => c.signIn({ signInType: b }),
        signOut: () => c.signOutFromApp({ currentAccount: i() }),
        addNewAccount: () => {
          var f;
          return (f = c == null ? void 0 : c.switch) == null ? void 0 : f.call(c, { currentAccount: i(), signInType: b });
        },
        switchTo: ({ accountId: f }) => {
          var S;
          return (S = c == null ? void 0 : c.switchTo) == null ? void 0 : S.call(c, {
            currentAccount: i(),
            nextAccount: { memberName: f }
          });
        },
        rememberedAccountsParams: {
          getRememberedAccounts: () => {
            var f;
            return c && c.getRememberedAccounts ? (f = c == null ? void 0 : c.getRememberedAccounts) == null ? void 0 : f.call(c).then((S) => S && S.length > 0 ? S.map((_) => {
              var D;
              return {
                id: _.uaid,
                accountType: _.type == M.AAD ? "AAD" : "MSA",
                preferredUsername: _.memberName,
                friendlyName: _.displayName,
                profilePicUrl: (D = _.profile) == null ? void 0 : D.profilePictureUrl,
                sessionId: _.sessionId
              };
            }) : []) : new Promise(() => []);
          }
        }
      };
    }, F = () => {
      const c = T;
      return {
        signIn: () => c.signIn({ signInType: v.Aad }),
        signOut: () => c.signOutFromApp({ currentAccount: i() }),
        addNewAccount: () => {
          var b;
          return (b = c == null ? void 0 : c.switch) == null ? void 0 : b.call(c, {
            currentAccount: i(),
            signInType: v.Aad
          });
        },
        switchTo: ({ accountId: b }) => {
          var f;
          return (f = c == null ? void 0 : c.switchTo) == null ? void 0 : f.call(c, {
            currentAccount: i(),
            nextAccount: { memberName: b }
          });
        },
        rememberedAccountsParams: {
          aadUrl: I(c.aad.rememberedAccountsUrl)
        }
      };
    }, U = () => {
      const c = T;
      return {
        signIn: () => c.signIn({ signInType: v.Aad }),
        signOut: () => c.signOutFromApp({ currentAccount: i() }),
        addNewAccount: () => {
          var b;
          return (b = c == null ? void 0 : c.switch) == null ? void 0 : b.call(c, {
            currentAccount: i(),
            signInType: v.Aad
          });
        },
        switchTo: ({ accountId: b }) => {
          var f;
          return (f = c == null ? void 0 : c.switchTo) == null ? void 0 : f.call(c, {
            currentAccount: i(),
            nextAccount: { memberName: b }
          });
        },
        rememberedAccountsParams: {
          aadUrl: I(c.aad.rememberedAccountsUrl)
        }
      };
    };
    if (!a())
      return {};
    let T = e.meControlOptions.authProviderConfig;
    switch (T.type) {
      case w.WebDualStack:
        return h();
      case w.WebAadWithMsaFed:
        return m();
      case w.WebAadOnly:
        return m();
      case w.WebMsaOnly:
        return u();
      case w.WebAadWithMsaProxy:
        return A();
      case w.WebMsaWithAadProxy:
        return g();
      case w.PartnerManaged:
        return x();
      case w.AdalJsAadOnly:
      case w.AdalJsWithMsaFed:
        return F();
      case w.MsalJsAadOnly:
      case w.MsalJsWithMsa:
        return U();
      default:
        return d(v.Converged);
    }
  }, [
    e,
    r
  ]);
}, hr = function(e, r, n, o) {
  const [s, a] = y.useState(void 0);
  return y.useEffect(() => {
    e && Qt({ msaUrl: r, aadUrl: n, getRememberedAccounts: o }).then((i) => {
      a(i.rememberedAccounts);
    }).catch(() => {
    });
  }, [r, n, o, e]), s;
}, pr = (t) => {
  if (t)
    try {
      const e = JSON.parse(t);
      return e == null ? void 0 : e.map((r) => ({
        href: r.url || "/",
        displayText: r.text || ""
      }));
    } catch {
      return;
    }
}, gr = function(e, r, n) {
  const o = (i, l) => {
    if (i) {
      if (typeof i == "string")
        return i;
      if (r)
        return i({
          commandId: l,
          currentAccount: r
        });
    }
  }, s = () => {
    var i;
    return (i = e == null ? void 0 : e.commands) == null ? void 0 : i.map((l) => ({
      href: o(l.url, l.id) || "/",
      displayText: l.text
    }));
  };
  return y.useMemo(() => s() ?? pr(n), [e, n]);
};
var q = /* @__PURE__ */ ((t) => (t.SignedIn = "1", t.SignedInIdp = "2", t.NotSignedIn = "3", t))(q || {}), Q = /* @__PURE__ */ ((t) => (t.MSA = "msa", t.AAD = "aad", t))(Q || {}), Ce = /* @__PURE__ */ ((t) => (t.AAD = "aad", t.MSA = "msa", t.MSA_FED = "msaFed", t))(Ce || {});
const re = (t, e) => e === Q.AAD ? {
  appSignOutUrl: k(t.aadInfo.signOutUrl, t.aadInfo.generateSignOutReturnUrl),
  appSignInUrl: k(t.aadInfo.signInUrl, t.aadInfo.generateSignInReturnUrl)
} : {
  appSignOutUrl: k(t.msaInfo.signOutUrl, t.msaInfo.generateSignOutReturnUrl),
  appSignInUrl: k(t.msaInfo.signInUrl, t.msaInfo.generateSignInReturnUrl)
}, Ae = (t) => ({
  signOutUrl: k(t.signOutUrl, t.generateSignOutReturnUrl),
  rememberedAccountsUrl: t.meUrl,
  signOutAndForgetUrl: k(t.signOutUrl, t.generateSignOutReturnUrl),
  forgetUrl: k(t.signOutUrl, t.generateSignOutReturnUrl)
}), ve = (t) => ({
  signOutAndForgetUrl: k(t.signOutUrl, t.generateSignOutReturnUrl),
  rememberedAccountsUrl: t.meUrl
}), fr = (t) => {
  let e;
  return t.aadInfo && t.msaInfo ? e = {
    type: w.WebDualStack,
    ...re(t, t.preferredIdp),
    aad: Ae(t.aadInfo),
    msa: ve(t.msaInfo)
  } : t.aadInfo ? e = {
    type: w.WebAadOnly,
    ...re(t, Q.AAD),
    aad: Ae(t.aadInfo)
  } : e = {
    type: w.WebMsaOnly,
    ...re(t, Q.MSA),
    msa: ve(t.msaInfo)
  }, e;
}, Me = (t) => {
  switch (t) {
    case q.SignedIn:
      return z.SignedIn;
    case q.SignedInIdp:
      return z.SignedInIDPOnly;
    case q.NotSignedIn:
      return z.NotSignedIn;
    default:
      return z.NotSignedIn;
  }
}, yr = (t) => ({
  type: M.MSA,
  cid: t.cid,
  firstName: t.firstName,
  lastName: t.lastName,
  memberName: t.memberName,
  displayName: t.nickName || `${t.firstName} ${t.lastName}`,
  authenticatedState: Me(t.authenticatedState),
  pictureUrl: t.tileUrl
}), Ar = (t) => ({
  type: M.AAD,
  firstName: t.firstName,
  lastName: t.lastName,
  memberName: t.memberName,
  displayName: t.displayName || `${t.firstName} ${t.lastName}`,
  roleName: t.roleName,
  orgLogoUrl: t.orgLogoUrl,
  orgName: t.orgName,
  sessionId: t.sessionId,
  authenticatedState: Me(t.authenticatedState),
  pictureUrl: t.tileUrl
}), vr = (t) => !t || t === q.NotSignedIn || String(t).toLowerCase() === "notsignedin", br = (t) => {
  if (!(!t || vr(t.authenticatedState) || !t.memberName))
    return t.idp === Ce.MSA ? yr(t) : Ar(t);
}, Tr = (t) => {
  if (!(!t || !t.meControlOptions))
    return {
      meControlOptions: {
        apiGeneration: "GEN2",
        authProviderConfig: fr(t.meControlOptions.rpData),
        currentAccount: br(t.meControlOptions.userData)
      }
    };
}, wr = () => {
  const [t, e] = y.useState(W.getState().meControlState);
  y.useEffect(() => {
    const o = W.subscribe((s) => {
      s.meControlState && JSON.stringify(s.meControlState) !== JSON.stringify(t) && e(s.meControlState);
    });
    return () => {
      W.unsubscribe(o);
    };
  }, []);
  const r = (o) => {
    W.setState((s) => ({ meControlState: { ...s.meControlState, config: o } }));
  }, n = (o) => {
    if (W.setState((s) => ({ meControlState: { ...s.meControlState, activeAccount: o } })), o && o.memberName && !o.pictureUrl) {
      const s = {
        id: o.memberName,
        accountType: o.type == M.AAD ? "AAD" : "MSA",
        preferredUsername: o.memberName,
        friendlyName: o.displayName,
        sessionId: o.sessionId,
        tenantId: o.type === M.AAD ? o.tenantId : void 0,
        tenantName: o.type === M.AAD ? o.orgName : void 0
      };
      ar(s).then((a) => {
        a && W.setState((i) => ({
          meControlState: {
            ...i.meControlState,
            activeAccount: { ...o, pictureUrl: a }
          }
        }));
      }).catch(() => {
        console.error("MeControl: Failed to get profile picture from graph");
      });
    }
  };
  return { config: t.config, activeAccount: t.activeAccount, setConfig: r, setActiveAccount: n };
}, Sr = () => {
  const [t, e] = y.useState(P.getContext().headerTheme || Ie.LIGHT);
  return y.useEffect(() => {
    const r = P.subscribe((n) => {
      n.headerTheme && e(n.headerTheme);
    });
    return () => P.unsubscribe(r);
  }, []), t;
}, ne = "en-us", Er = () => {
  const [t, e] = y.useState(
    () => P.getContext().locale || ne
  );
  return y.useEffect(() => {
    const r = P.subscribe((n) => {
      n.locale !== void 0 && e(n.locale || ne);
    });
    return e(P.getContext().locale || ne), () => P.unsubscribe(r);
  }, []), t;
}, _r = ({ text: t }) => {
  const e = y.useRef(null), r = y.useCallback(() => {
    var o, s;
    const n = (s = (o = e.current) == null ? void 0 : o.parentElement) == null ? void 0 : s.querySelector("button:not(.uhf-mecontrol-signin-label)");
    n == null || n.click();
  }, []);
  return /* @__PURE__ */ p.createElement(
    "button",
    {
      ref: e,
      type: "button",
      tabIndex: -1,
      className: "uhf-mecontrol-signin-label",
      onClick: r,
      "data-bi-cn": "GlobalNav_Account_cont",
      "data-m": '{"compnm":"UHF","view":"UHF","pa":"UniversalHeader","cN":"GlobalNav_Account_cont","ecn":"GlobalNav_Account_cont","bhvr":100}'
    },
    t
  );
}, Or = (t) => {
  const { config: e, activeAccount: r, setConfig: n, setActiveAccount: o } = wr(), s = Sr(), a = Er(), i = mr(
    e,
    r || {}
  ), l = hr(
    e !== void 0,
    i && i.rememberedAccountsParams && i.rememberedAccountsParams.msaUrl,
    i && i.rememberedAccountsParams && i.rememberedAccountsParams.aadUrl,
    i && i.rememberedAccountsParams && i.rememberedAccountsParams.getRememberedAccounts
  ), d = gr(
    e && e.meControlOptions && e.meControlOptions.appContextConfig,
    r,
    t.extensibleLinks
  );
  y.useEffect(() => {
    (!window.msCommonShell || !window.MeControl) && h();
  }, []);
  const h = () => {
    window.msCommonShell = {}, window.msCommonShell.load = (u) => {
      if (u.meControlOptions.apiGeneration === "GEN2") {
        let A = u;
        n(A), A.meControlOptions.currentAccount && o(A.meControlOptions.currentAccount);
      } else {
        let g = Tr(u);
        g && (n(g), g.meControlOptions.currentAccount && o(g.meControlOptions.currentAccount));
      }
    }, window.MeControl = {}, window.MeControl.API = {}, window.MeControl.API.setActiveAccount = (u) => {
      o(u);
    }, window.onShellReadyToLoad && window.onShellReadyToLoad();
  }, m = (u) => {
    if (!u)
      return null;
    let A = u.memberName, g = u.pictureUrl;
    return u.profile && (A = u.profile.profileName ?? A, g = u.profile.profilePictureUrl ?? g), {
      accountType: u.type === M.MSA ? "MSA" : "AAD",
      preferredUsername: A,
      friendlyName: u.displayName,
      profilePicUrl: g,
      sessionId: u.sessionId,
      tenantId: u.type === M.AAD ? u.tenantId : void 0,
      tenantName: u.type === M.AAD ? u.orgName : void 0
    };
  };
  return /* @__PURE__ */ p.createElement(p.Fragment, null, !r && t.signInLabelText && /* @__PURE__ */ p.createElement(_r, { text: t.signInLabelText }), /* @__PURE__ */ p.createElement(
    Yt,
    {
      handlers: i,
      locale: a,
      theme: s,
      partner: "UHFPortal",
      currentAccount: m(r),
      rememberedAccounts: l,
      additionalLinks: d
    }
  ));
}, Nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Or
}, Symbol.toStringTag, { value: "Module" }));
export {
  Nr as M,
  Ot as a,
  O as t,
  Ct as u
};

// SIG // Begin signature block
// SIG // MIIo1gYJKoZIhvcNAQcCoIIoxzCCKMMCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // OwDbmsyNcHec7xf8FqNmovOVm/FEDPl5gVdw5fq6aLyg
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
// SIG // 1oyoRnADZawiFsVo9J/cDu15ErRCfDQRhwSiBTGCGmsw
// SIG // ghpnAgEBMHkwYjELMAkGA1UEBhMCVVMxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEzMDEGA1UEAxMq
// SIG // QXp1cmUgUlNBIFB1YmxpYyBTZXJ2aWNlcyBDb2RlIFNp
// SIG // Z25pbmcgUENBAhMzAAAA0wKI2Gm93wIJAAAAAADTMA0G
// SIG // CWCGSAFlAwQCAQUAoIGQMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMC8GCSqGSIb3DQEJBDEiBCDfUUj3DuNZ
// SIG // bbv+GmkA3hi0yhN0UMAJnDrPDxfQFcsTejBCBgorBgEE
// SIG // AYI3AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHSh
// SIG // GoAYaHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqG
// SIG // SIb3DQEBAQUABIIBgHpaQ4O1Ll8sn6M79+OGEL/L8sPk
// SIG // gLwEg1iClD0RV6evWmcUVh+y5wQl9+JlikzE99tR8SNp
// SIG // Qh0L2PL2RuxILlA2h9XcMXtgXPejYCf3QwOjzMkOO/J0
// SIG // IBhanuDEauJaOaqNV7/moURsTpB+sjMhzcq7to6/p6Kx
// SIG // G4T/rKB6FbA0lO7uBu7lAxIn8N3W90wPg/dbe0WfG4/E
// SIG // p+csdug7Qd2RmWLudFR5G9Eyr7YwFO/kMtV243jOpLyk
// SIG // 4QJe/d7YidonFznb9CeMzmVHH0rcCeZTYknh21pq45l9
// SIG // t94V/jBq+FxHlgNoLw/FM8VN4E33vcQpyTZi6v/+INhF
// SIG // 7/ftjpq28yU8wCIXm2z6N7CQgzAsKDoTAeAKmoFNxAi2
// SIG // GnGnPX8JwLmjiL6N8VMP2bYckyafeLc7f5fq7CVuoJZX
// SIG // 3XRGP0Ql60bDsOqy0Vxl6AvdR+NSyq9C+YrHJR2tbj7E
// SIG // 7cVUn0UWittcuy0iXXDS/IbHtmtXkdmEnclMI+oyaVY2
// SIG // 1KGCF7AwghesBgorBgEEAYI3AwMBMYIXnDCCF5gGCSqG
// SIG // SIb3DQEHAqCCF4kwgheFAgEDMQ8wDQYJYIZIAWUDBAIB
// SIG // BQAwggFaBgsqhkiG9w0BCRABBKCCAUkEggFFMIIBQQIB
// SIG // AQYKKwYBBAGEWQoDATAxMA0GCWCGSAFlAwQCAQUABCDv
// SIG // psPvlAeRI0Ikjsq0BdcMv9XIby0yeKLq0y+MmyEwMAIG
// SIG // attKIRDdGBMyMDI2MTEwMjE0MDg0OS41OTZaMASAAgH0
// SIG // oIHZpIHWMIHTMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYD
// SIG // VQQLEyRNaWNyb3NvZnQgSXJlbGFuZCBPcGVyYXRpb25z
// SIG // IExpbWl0ZWQxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVT
// SIG // Tjo2QjA1LTA1RTAtRDk0NzElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEf4wggcoMIIF
// SIG // EKADAgECAhMzAAACEUUYOZtDz/xsAAEAAAIRMA0GCSqG
// SIG // SIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwMB4XDTI1MDgxNDE4NDgxM1oXDTI2MTExMzE4NDgx
// SIG // M1owgdMxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOjZC
// SIG // MDUtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAg8AMIICCgKCAgEAz7m7MxAdL5Vayrk7jsMo
// SIG // 3GnhN85ktHCZEvEcj4BIccHKd/NKC7uPvpX5dhO63W6V
// SIG // M5iCxklG8qQeVVrPaKvj8dYYJC7DNt4NN3XlVdC/vove
// SIG // JuPPhTJ/u7X+pYmV2qehTVPOOB1/hpmt51SzgxZczMdn
// SIG // Fl+X2e1PgutSA5CAh9/Xz5NW0CxnYVz8g0Vpxg+Bq32a
// SIG // mktRXr8m3BSEgUs8jgWRPVzPHEczpbhloGGEfHaROmHh
// SIG // VKIqN+JhMweEjU2NXM2W6hm32j/QH/I/KWqNNfYchHaG
// SIG // 0xJljVTYoUKPpcQDuhH9dQKEgvGxj2U5/3Fq1em4dO6I
// SIG // h04m6R+ttxr6Y8oRJH9ZhZ3sciFBIvZh7E2YFXOjP4MG
// SIG // ybSylQTPDEFAtHHgpkskeEUhsPDR9VvWWhekhQx3qXaA
// SIG // Kh+AkLmz/hpE3e0y+RIKO2AREjULJAKgf+R9QnNvqMeM
// SIG // kz9PGrjsijqWGzB2k2JNyaUYKlbmQweOabsCioiY2fJb
// SIG // imjVyFAGk5AeYddUFxvJGgRVCH7BeBPKAq7MMOmSCTOM
// SIG // Z0Sw6zyNx4Uhh5Y0uJ0ZOoTKnB3KfdN/ba/eKHFeEhi3
// SIG // WqAfzTxiy0rMvhsfsXZK7zoclqaRvVl8Q48J174+eyri
// SIG // ypY9HhU+ohgiYi4uQGDDVdTDeKDtoC/hD2Cn+ARzwE1r
// SIG // FfECAwEAAaOCAUkwggFFMB0GA1UdDgQWBBRifUUDwOnq
// SIG // Icvfb53+yV0EZn7OcDAfBgNVHSMEGDAWgBSfpxVdAF5i
// SIG // XYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQhk5o
// SIG // dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2Ny
// SIG // bC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENBJTIw
// SIG // MjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwGCCsG
// SIG // AQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUtU3Rh
// SIG // bXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMBAf8E
// SIG // AjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4GA1Ud
// SIG // DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEApEKd
// SIG // nMeIIUiU6PatZ/qbrwiDzYUMKRczC4Bp/XY1S9NmHI+2
// SIG // c3dcpwH2SOmDfdvIIqt7mRrgvBPYOvJ9CtZS5eeIrsOb
// SIG // C0b0ggKTv2wrTgWG+qktqNFEhQeipdURNLN68uHAm5ed
// SIG // wBytd1kwy5r6B93klxDsldOmVWtw/ngj7knN09muCmwr
// SIG // 17JnsMFcoIN/H59s+1RYN7Vid4+7nj8FcvYy9rbZOMnd
// SIG // BzsTiosF1M+aMIJX2k3EVFVsuDL7/R5ppI9Tg7eWQOWK
// SIG // MZHPdsA3ZqWzDuhJqTzoFSQShnZenC+xq/z9BhHPFFbU
// SIG // tfjAoG6EDPjSQJYXmogja8OEa19xwnh3wVufeP+ck+/0
// SIG // gxNi7g+kO6WaOm052F4siD8xi6Uv75L7798lHvPThcxH
// SIG // HsgXqMY592d1wUof3tL/eDaQ0UhnYCU8yGkU2XJnctON
// SIG // nBKAvURAvf2qiIWDj4Lpcm0zA7VuofuJR1Tpuyc5p1ja
// SIG // 52bNZBBVqAOwyDhAmqWsJXAjYXnssC/fJkee314Fh+GI
// SIG // yMgvAPRScgqRZqV16dTBYvoe+w1n/wWs/ySTUsxDw4T/
// SIG // AITcu5PAsLnCVpArDrFLRTFyut+eHUoG6UYZfj8/RsuQ
// SIG // 42INse1pb/cPm7G2lcLJtkIKT80xvB1LiaNvPTBVEcmN
// SIG // SvFUM0xrXZXcYcxVXiYwggdxMIIFWaADAgECAhMzAAAA
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
// SIG // HVUzWLOhcGbyoYIDWTCCAkECAQEwggEBoYHZpIHWMIHT
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // JzAlBgNVBAsTHm5TaGllbGQgVFNTIEVTTjo2QjA1LTA1
// SIG // RTAtRDk0NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgU2VydmljZaIjCgEBMAcGBSsOAwIaAxUAKyp8
// SIG // q2VdgAq1VGkzd7PZwV6zNc2ggYMwgYCkfjB8MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsF
// SIG // AAIFAO6S9nkwIhgPMjAyNjExMDIxMTQ2MDFaGA8yMDI2
// SIG // MTEwMzExNDYwMVowdzA9BgorBgEEAYRZCgQBMS8wLTAK
// SIG // AgUA7pL2eQIBADAKAgEAAgIOEwIB/zAHAgEAAgIR3DAK
// SIG // AgUA7pRH+QIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgor
// SIG // BgEEAYRZCgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYag
// SIG // MA0GCSqGSIb3DQEBCwUAA4IBAQAkSym4ODiZjzk3cJb7
// SIG // k8ClrCbStuI+X6SVXp9aOo2yXggI3+aPbVo3RkWlThzZ
// SIG // CzSf38imusXH47pdPBTNdbToqjZKr50ohPfduQIEq5Ry
// SIG // +iGMLOUKBh2kC4fz2Jt0sqhm7MLjb0LqPyKodaXpPKiY
// SIG // cePrtvcedgewD/wGCjmOci6w8t5KtewP7agcbSMWxJY8
// SIG // Rqk3UuBH1ROLnyhaN024mU6swCNwbeVb41m1GqhPQxG/
// SIG // Qk5fss6R8rJ4XrKNlmILtYrNuZcWINYSLJLyYJpi1B8n
// SIG // xUD8N3jrk0+AGIXhX5Vk6l8PNZw8taaY6LgoUtQATT4I
// SIG // BpPRFD3zhDquHgZBMYIEDTCCBAkCAQEwgZMwfDELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0
// SIG // IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAIRRRg5m0PP
// SIG // /GwAAQAAAhEwDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqG
// SIG // SIb3DQEJAzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0B
// SIG // CQQxIgQgDi3+ArtCQ5ujM/SXz7DjeibGwS0wjR/Aoq5m
// SIG // 9PlsaFgwgfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9
// SIG // BCAsrTOpmu+HTq1aXFwvlhjF8p2nUCNNCEX/OWLHNDMm
// SIG // tzCBmDCBgKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwAhMzAAACEUUYOZtDz/xsAAEAAAIRMCIEIAzu2AgZ
// SIG // gNod8ZkAaBwSeP24eU20DHZNLaty41VDJJpYMA0GCSqG
// SIG // SIb3DQEBCwUABIICAEbhbOE+ankHBfvbDBSrF5yj/6oF
// SIG // dWsGMlNbZ9zaiE2JZHOlKs73TgQ1UgiU9qRMDNfmy0xZ
// SIG // nzwqwTyRTkdY6u6EYu1b2gBP7129no6bsq3BaibAL/D3
// SIG // kUOYVrtRoT9aMtSjmXCZg6pP/SGSlCbPlzprh1FnH0/4
// SIG // p/HRwHjOuhDch0cHQB7MdqqCmi1Cm2zBE996S3S4v0FW
// SIG // x3OCYA58r/bD2q5GgNTER6yF3rTnhrGqtjIEHq5COo6G
// SIG // U9VCwBWNgnWcUQ1Jhf/reannE2+Eub1d6v2JQ3U/ijyw
// SIG // MbV9ObghfMIL6i/sP7iDGx6lUFWDSA3DSJdaxRjqtmfS
// SIG // 1SA2cSaD7i1sI7k82XPTvCHTqlMZh36w+YKkNjLy0m1p
// SIG // Zbrz2EDqee2eHoecP/LafBcaAfdAHYuxzKi4flGwI1sQ
// SIG // 0ImiTSm7L2Aa6uXcFzarZhT3hJ+VI/BtN/OPrtZCIb4q
// SIG // uy2iHvc+n1D+0HY+0KA3kommwrqITwbfr6PxeJH7VGKG
// SIG // MxBSGobLDw+VUoPYqZhhrG3t52q2OwU0UKbbrqDwwCir
// SIG // bN2IjMG92aBQ5qNeO1uKoG0rNdNx2XvZmUAzUHkaud18
// SIG // qgHS5hJhGScHDOMpwBGgBF7gab6ZGZY7sh0snkTK+hQB
// SIG // 2tL7I9X0nrezxf27BbofpX5mB/+wMZBuxNS8y7wy
// SIG // End signature block
