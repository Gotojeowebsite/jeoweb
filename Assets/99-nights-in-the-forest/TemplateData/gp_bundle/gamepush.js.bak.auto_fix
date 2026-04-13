/*! For license information please see gamepush.js.LICENSE.txt */
(() => {
  var e,
    t,
    n,
    i,
    r = {
      2616: (e) => {
        "use strict";
        e.exports = function (e) {
          var t = [];
          return (
            (t.toString = function () {
              return this.map(function (t) {
                var n = e(t);
                return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
              }).join("");
            }),
            (t.i = function (e, n, i) {
              "string" == typeof e && (e = [[null, e, ""]]);
              var r = {};
              if (i)
                for (var s = 0; s < this.length; s++) {
                  var a = this[s][0];
                  null != a && (r[a] = !0);
                }
              for (var o = 0; o < e.length; o++) {
                var c = [].concat(e[o]);
                (i && r[c[0]]) ||
                  (n &&
                    (c[2]
                      ? (c[2] = "".concat(n, " and ").concat(c[2]))
                      : (c[2] = n)),
                  t.push(c));
              }
            }),
            t
          );
        };
      },
      9639: function (e, t, n) {
        var i, r, s;
        function a(e) {
          return (a =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        (s = function () {
          "use strict";
          var e = 6e4,
            t = 36e5,
            n = "millisecond",
            i = "second",
            r = "minute",
            s = "hour",
            o = "day",
            c = "week",
            l = "month",
            h = "quarter",
            u = "year",
            d = "date",
            p = "Invalid Date",
            f =
              /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            m =
              /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            v = {
              name: "en",
              weekdays:
                "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                  "_"
                ),
              months:
                "January_February_March_April_May_June_July_August_September_October_November_December".split(
                  "_"
                ),
              ordinal: function (e) {
                var t = ["th", "st", "nd", "rd"],
                  n = e % 100;
                return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
              },
            },
            y = function (e, t, n) {
              var i = String(e);
              return !i || i.length >= t
                ? e
                : "" + Array(t + 1 - i.length).join(n) + e;
            },
            g = {
              s: y,
              z: function (e) {
                var t = -e.utcOffset(),
                  n = Math.abs(t),
                  i = Math.floor(n / 60),
                  r = n % 60;
                return (t <= 0 ? "+" : "-") + y(i, 2, "0") + ":" + y(r, 2, "0");
              },
              m: function e(t, n) {
                if (t.date() < n.date()) return -e(n, t);
                var i = 12 * (n.year() - t.year()) + (n.month() - t.month()),
                  r = t.clone().add(i, l),
                  s = n - r < 0,
                  a = t.clone().add(i + (s ? -1 : 1), l);
                return +(-(i + (n - r) / (s ? r - a : a - r)) || 0);
              },
              a: function (e) {
                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
              },
              p: function (e) {
                return (
                  {
                    M: l,
                    y: u,
                    w: c,
                    d: o,
                    D: d,
                    h: s,
                    m: r,
                    s: i,
                    ms: n,
                    Q: h,
                  }[e] ||
                  String(e || "")
                    .toLowerCase()
                    .replace(/s$/, "")
                );
              },
              u: function (e) {
                return void 0 === e;
              },
            },
            w = "en",
            P = {};
          P[w] = v;
          var b = "$isDayjsObject",
            E = function (e) {
              return e instanceof _ || !(!e || !e[b]);
            },
            T = function e(t, n, i) {
              var r;
              if (!t) return w;
              if ("string" == typeof t) {
                var s = t.toLowerCase();
                P[s] && (r = s), n && ((P[s] = n), (r = s));
                var a = t.split("-");
                if (!r && a.length > 1) return e(a[0]);
              } else {
                var o = t.name;
                (P[o] = t), (r = o);
              }
              return !i && r && (w = r), r || (!i && w);
            },
            S = function (e, t) {
              if (E(e)) return e.clone();
              var n = "object" == a(t) ? t : {};
              return (n.date = e), (n.args = arguments), new _(n);
            },
            A = g;
          (A.l = T),
            (A.i = E),
            (A.w = function (e, t) {
              return S(e, {
                locale: t.$L,
                utc: t.$u,
                x: t.$x,
                $offset: t.$offset,
              });
            });
          var _ = (function () {
              function a(e) {
                (this.$L = T(e.locale, null, !0)),
                  this.parse(e),
                  (this.$x = this.$x || e.x || {}),
                  (this[b] = !0);
              }
              var v = a.prototype;
              return (
                (v.parse = function (e) {
                  (this.$d = (function (e) {
                    var t = e.date,
                      n = e.utc;
                    if (null === t) return new Date(NaN);
                    if (A.u(t)) return new Date();
                    if (t instanceof Date) return new Date(t);
                    if ("string" == typeof t && !/Z$/i.test(t)) {
                      var i = t.match(f);
                      if (i) {
                        var r = i[2] - 1 || 0,
                          s = (i[7] || "0").substring(0, 3);
                        return n
                          ? new Date(
                              Date.UTC(
                                i[1],
                                r,
                                i[3] || 1,
                                i[4] || 0,
                                i[5] || 0,
                                i[6] || 0,
                                s
                              )
                            )
                          : new Date(
                              i[1],
                              r,
                              i[3] || 1,
                              i[4] || 0,
                              i[5] || 0,
                              i[6] || 0,
                              s
                            );
                      }
                    }
                    return new Date(t);
                  })(e)),
                    this.init();
                }),
                (v.init = function () {
                  var e = this.$d;
                  (this.$y = e.getFullYear()),
                    (this.$M = e.getMonth()),
                    (this.$D = e.getDate()),
                    (this.$W = e.getDay()),
                    (this.$H = e.getHours()),
                    (this.$m = e.getMinutes()),
                    (this.$s = e.getSeconds()),
                    (this.$ms = e.getMilliseconds());
                }),
                (v.$utils = function () {
                  return A;
                }),
                (v.isValid = function () {
                  return !(this.$d.toString() === p);
                }),
                (v.isSame = function (e, t) {
                  var n = S(e);
                  return this.startOf(t) <= n && n <= this.endOf(t);
                }),
                (v.isAfter = function (e, t) {
                  return S(e) < this.startOf(t);
                }),
                (v.isBefore = function (e, t) {
                  return this.endOf(t) < S(e);
                }),
                (v.$g = function (e, t, n) {
                  return A.u(e) ? this[t] : this.set(n, e);
                }),
                (v.unix = function () {
                  return Math.floor(this.valueOf() / 1e3);
                }),
                (v.valueOf = function () {
                  return this.$d.getTime();
                }),
                (v.startOf = function (e, t) {
                  var n = this,
                    a = !!A.u(t) || t,
                    h = A.p(e),
                    p = function (e, t) {
                      var i = A.w(
                        n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e),
                        n
                      );
                      return a ? i : i.endOf(o);
                    },
                    f = function (e, t) {
                      return A.w(
                        n
                          .toDate()
                          [e].apply(
                            n.toDate("s"),
                            (a ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)
                          ),
                        n
                      );
                    },
                    m = this.$W,
                    v = this.$M,
                    y = this.$D,
                    g = "set" + (this.$u ? "UTC" : "");
                  switch (h) {
                    case u:
                      return a ? p(1, 0) : p(31, 11);
                    case l:
                      return a ? p(1, v) : p(0, v + 1);
                    case c:
                      var w = this.$locale().weekStart || 0,
                        P = (m < w ? m + 7 : m) - w;
                      return p(a ? y - P : y + (6 - P), v);
                    case o:
                    case d:
                      return f(g + "Hours", 0);
                    case s:
                      return f(g + "Minutes", 1);
                    case r:
                      return f(g + "Seconds", 2);
                    case i:
                      return f(g + "Milliseconds", 3);
                    default:
                      return this.clone();
                  }
                }),
                (v.endOf = function (e) {
                  return this.startOf(e, !1);
                }),
                (v.$set = function (e, t) {
                  var a,
                    c = A.p(e),
                    h = "set" + (this.$u ? "UTC" : ""),
                    p = ((a = {}),
                    (a[o] = h + "Date"),
                    (a[d] = h + "Date"),
                    (a[l] = h + "Month"),
                    (a[u] = h + "FullYear"),
                    (a[s] = h + "Hours"),
                    (a[r] = h + "Minutes"),
                    (a[i] = h + "Seconds"),
                    (a[n] = h + "Milliseconds"),
                    a)[c],
                    f = c === o ? this.$D + (t - this.$W) : t;
                  if (c === l || c === u) {
                    var m = this.clone().set(d, 1);
                    m.$d[p](f),
                      m.init(),
                      (this.$d = m.set(
                        d,
                        Math.min(this.$D, m.daysInMonth())
                      ).$d);
                  } else p && this.$d[p](f);
                  return this.init(), this;
                }),
                (v.set = function (e, t) {
                  return this.clone().$set(e, t);
                }),
                (v.get = function (e) {
                  return this[A.p(e)]();
                }),
                (v.add = function (n, a) {
                  var h,
                    d = this;
                  n = Number(n);
                  var p = A.p(a),
                    f = function (e) {
                      var t = S(d);
                      return A.w(t.date(t.date() + Math.round(e * n)), d);
                    };
                  if (p === l) return this.set(l, this.$M + n);
                  if (p === u) return this.set(u, this.$y + n);
                  if (p === o) return f(1);
                  if (p === c) return f(7);
                  var m =
                      ((h = {}), (h[r] = e), (h[s] = t), (h[i] = 1e3), h)[p] ||
                      1,
                    v = this.$d.getTime() + n * m;
                  return A.w(v, this);
                }),
                (v.subtract = function (e, t) {
                  return this.add(-1 * e, t);
                }),
                (v.format = function (e) {
                  var t = this,
                    n = this.$locale();
                  if (!this.isValid()) return n.invalidDate || p;
                  var i = e || "YYYY-MM-DDTHH:mm:ssZ",
                    r = A.z(this),
                    s = this.$H,
                    a = this.$m,
                    o = this.$M,
                    c = n.weekdays,
                    l = n.months,
                    h = n.meridiem,
                    u = function (e, n, r, s) {
                      return (e && (e[n] || e(t, i))) || r[n].slice(0, s);
                    },
                    d = function (e) {
                      return A.s(s % 12 || 12, e, "0");
                    },
                    f =
                      h ||
                      function (e, t, n) {
                        var i = e < 12 ? "AM" : "PM";
                        return n ? i.toLowerCase() : i;
                      };
                  return i.replace(m, function (e, i) {
                    return (
                      i ||
                      (function (e) {
                        switch (e) {
                          case "YY":
                            return String(t.$y).slice(-2);
                          case "YYYY":
                            return A.s(t.$y, 4, "0");
                          case "M":
                            return o + 1;
                          case "MM":
                            return A.s(o + 1, 2, "0");
                          case "MMM":
                            return u(n.monthsShort, o, l, 3);
                          case "MMMM":
                            return u(l, o);
                          case "D":
                            return t.$D;
                          case "DD":
                            return A.s(t.$D, 2, "0");
                          case "d":
                            return String(t.$W);
                          case "dd":
                            return u(n.weekdaysMin, t.$W, c, 2);
                          case "ddd":
                            return u(n.weekdaysShort, t.$W, c, 3);
                          case "dddd":
                            return c[t.$W];
                          case "H":
                            return String(s);
                          case "HH":
                            return A.s(s, 2, "0");
                          case "h":
                            return d(1);
                          case "hh":
                            return d(2);
                          case "a":
                            return f(s, a, !0);
                          case "A":
                            return f(s, a, !1);
                          case "m":
                            return String(a);
                          case "mm":
                            return A.s(a, 2, "0");
                          case "s":
                            return String(t.$s);
                          case "ss":
                            return A.s(t.$s, 2, "0");
                          case "SSS":
                            return A.s(t.$ms, 3, "0");
                          case "Z":
                            return r;
                        }
                        return null;
                      })(e) ||
                      r.replace(":", "")
                    );
                  });
                }),
                (v.utcOffset = function () {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                }),
                (v.diff = function (n, a, d) {
                  var p,
                    f = this,
                    m = A.p(a),
                    v = S(n),
                    y = (v.utcOffset() - this.utcOffset()) * e,
                    g = this - v,
                    w = function () {
                      return A.m(f, v);
                    };
                  switch (m) {
                    case u:
                      p = w() / 12;
                      break;
                    case l:
                      p = w();
                      break;
                    case h:
                      p = w() / 3;
                      break;
                    case c:
                      p = (g - y) / 6048e5;
                      break;
                    case o:
                      p = (g - y) / 864e5;
                      break;
                    case s:
                      p = g / t;
                      break;
                    case r:
                      p = g / e;
                      break;
                    case i:
                      p = g / 1e3;
                      break;
                    default:
                      p = g;
                  }
                  return d ? p : A.a(p);
                }),
                (v.daysInMonth = function () {
                  return this.endOf(l).$D;
                }),
                (v.$locale = function () {
                  return P[this.$L];
                }),
                (v.locale = function (e, t) {
                  if (!e) return this.$L;
                  var n = this.clone(),
                    i = T(e, t, !0);
                  return i && (n.$L = i), n;
                }),
                (v.clone = function () {
                  return A.w(this.$d, this);
                }),
                (v.toDate = function () {
                  return new Date(this.valueOf());
                }),
                (v.toJSON = function () {
                  return this.isValid() ? this.toISOString() : null;
                }),
                (v.toISOString = function () {
                  return this.$d.toISOString();
                }),
                (v.toString = function () {
                  return this.$d.toUTCString();
                }),
                a
              );
            })(),
            I = _.prototype;
          return (
            (S.prototype = I),
            [
              ["$ms", n],
              ["$s", i],
              ["$m", r],
              ["$H", s],
              ["$W", o],
              ["$M", l],
              ["$y", u],
              ["$D", d],
            ].forEach(function (e) {
              I[e[1]] = function (t) {
                return this.$g(t, e[0], e[1]);
              };
            }),
            (S.extend = function (e, t) {
              return e.$i || (e(t, _, S), (e.$i = !0)), S;
            }),
            (S.locale = T),
            (S.isDayjs = E),
            (S.unix = function (e) {
              return S(1e3 * e);
            }),
            (S.en = P[w]),
            (S.Ls = P),
            (S.p = {}),
            S
          );
        }),
          "object" == a(t)
            ? (e.exports = s())
            : void 0 ===
                (r = "function" == typeof (i = s) ? i.call(t, n, t, e) : i) ||
              (e.exports = r);
      },
      5585: (e) => {
        !(function (t) {
          e.exports = t;
          var n = {
            on: function (e, t) {
              return s(this, e).push(t), this;
            },
            once: function (e, t) {
              var n = this;
              return (i.originalListener = t), s(n, e).push(i), n;
              function i() {
                r.call(n, e, i), t.apply(this, arguments);
              }
            },
            off: r,
            emit: function (e, t) {
              var n = this,
                i = s(n, e, !0);
              if (!i) return !1;
              var r = arguments.length;
              if (1 === r) i.forEach(o);
              else if (2 === r) i.forEach(c);
              else {
                var a = Array.prototype.slice.call(arguments, 1);
                i.forEach(l);
              }
              return !!i.length;
              function o(e) {
                e.call(n);
              }
              function c(e) {
                e.call(n, t);
              }
              function l(e) {
                e.apply(n, a);
              }
            },
          };
          function i(e) {
            for (var t in n) e[t] = n[t];
            return e;
          }
          function r(e, t) {
            var n,
              i = this;
            if (arguments.length) {
              if (t) {
                if ((n = s(i, e, !0))) {
                  if (!(n = n.filter(a)).length) return r.call(i, e);
                  i.listeners[e] = n;
                }
              } else if (
                (n = i.listeners) &&
                (delete n[e], !Object.keys(n).length)
              )
                return r.call(i);
            } else delete i.listeners;
            return i;
            function a(e) {
              return e !== t && e.originalListener !== t;
            }
          }
          function s(e, t, n) {
            if (!n || e.listeners) {
              var i = e.listeners || (e.listeners = {});
              return i[t] || (i[t] = []);
            }
          }
          i(t.prototype), (t.mixin = i);
        })(function e() {
          if (!(this instanceof e)) return new e();
        });
      },
      4809: (e, t, n) => {
        "use strict";
        n.d(t, { ZP: () => m });
        var i = n(3559),
          r = n(9691);
        function s(e) {
          return (s =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var a = new Map(),
          o = new Map(),
          c = !0,
          l = !1;
        function h(e) {
          return e.replace(/[\s,]+/g, " ").trim();
        }
        function u(e) {
          var t,
            n,
            u,
            d = h(e);
          if (!a.has(d)) {
            var p = (0, r.Qc)(e, { experimentalFragmentVariables: l });
            if (!p || "Document" !== p.kind)
              throw new Error("Not a valid GraphQL document.");
            a.set(
              d,
              (function (e) {
                var t = new Set(e.definitions);
                t.forEach(function (e) {
                  e.loc && delete e.loc,
                    Object.keys(e).forEach(function (n) {
                      var i = e[n];
                      i && "object" === s(i) && t.add(i);
                    });
                });
                var n = e.loc;
                return n && (delete n.startToken, delete n.endToken), e;
              })(
                ((t = p),
                (n = new Set()),
                (u = []),
                t.definitions.forEach(function (e) {
                  if ("FragmentDefinition" === e.kind) {
                    var t = e.name.value,
                      i = h((s = e.loc).source.body.substring(s.start, s.end)),
                      r = o.get(t);
                    r && !r.has(i)
                      ? c &&
                        console.warn(
                          "Warning: fragment with name " +
                            t +
                            " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"
                        )
                      : r || o.set(t, (r = new Set())),
                      r.add(i),
                      n.has(i) || (n.add(i), u.push(e));
                  } else u.push(e);
                  var s;
                }),
                (0, i.pi)((0, i.pi)({}, t), { definitions: u }))
              )
            );
          }
          return a.get(d);
        }
        function d(e) {
          for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
          "string" == typeof e && (e = [e]);
          var i = e[0];
          return (
            t.forEach(function (t, n) {
              t && "Document" === t.kind ? (i += t.loc.source.body) : (i += t),
                (i += e[n + 1]);
            }),
            u(i)
          );
        }
        var p,
          f = d;
        ((p = d || (d = {})).gql = f),
          (p.resetCaches = function () {
            a.clear(), o.clear();
          }),
          (p.disableFragmentWarnings = function () {
            c = !1;
          }),
          (p.enableExperimentalFragmentVariables = function () {
            l = !0;
          }),
          (p.disableExperimentalFragmentVariables = function () {
            l = !1;
          }),
          (d.default = d);
        const m = d;
      },
      4943: (e) => {
        "use strict";
        (e.exports = i), (e.exports.isMobile = i), (e.exports.default = i);
        var t =
            /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i,
          n = /android|ipad|playbook|silk/i;
        function i(e) {
          e || (e = {});
          var i = e.ua;
          if (
            (i || "undefined" == typeof navigator || (i = navigator.userAgent),
            i &&
              i.headers &&
              "string" == typeof i.headers["user-agent"] &&
              (i = i.headers["user-agent"]),
            "string" != typeof i)
          )
            return !1;
          var r = t.test(i) || (!!e.tablet && n.test(i));
          return (
            !r &&
              e.tablet &&
              e.featureDetect &&
              navigator &&
              navigator.maxTouchPoints > 1 &&
              -1 !== i.indexOf("Macintosh") &&
              -1 !== i.indexOf("Safari") &&
              (r = !0),
            r
          );
        }
      },
      2096: () => {
        "function" != typeof Promise.prototype.finally &&
          (Promise.prototype.finally = function (e) {
            var t = this;
            return this.then(function (n) {
              return t.constructor.resolve(e()).then(function () {
                return n;
              });
            }).catch(function (n) {
              return t.constructor.resolve(e()).then(function () {
                throw n;
              });
            });
          });
      },
      3559: (e, t, n) => {
        "use strict";
        n.d(t, { pi: () => i });
        var i = function () {
          return (i =
            Object.assign ||
            function (e) {
              for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in (t = arguments[n]))
                  Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
              return e;
            }).apply(this, arguments);
        };
        Object.create, Object.create;
      },
      6256: function (e, t, n) {
        var i;
        function r(e) {
          return (r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        (e = n.nmd(e)),
          (function (s, a) {
            "use strict";
            var o = "function",
              c = "undefined",
              l = "object",
              h = "string",
              u = "model",
              d = "name",
              p = "type",
              f = "vendor",
              m = "version",
              v = "architecture",
              y = "console",
              g = "mobile",
              w = "tablet",
              P = "smarttv",
              b = "wearable",
              E = "embedded",
              T = "Amazon",
              S = "Apple",
              A = "ASUS",
              _ = "BlackBerry",
              I = "Google",
              C = "Huawei",
              O = "LG",
              R = "Microsoft",
              k = "Motorola",
              D = "Samsung",
              M = "Sharp",
              N = "Sony",
              L = "Xiaomi",
              F = "Zebra",
              x = "Facebook",
              j = "Chromium OS",
              $ = "Mac OS",
              U = function (e) {
                for (var t = {}, n = 0; n < e.length; n++)
                  t[e[n].toUpperCase()] = e[n];
                return t;
              },
              G = function (e, t) {
                return r(e) === h && -1 !== B(t).indexOf(B(e));
              },
              B = function (e) {
                return e.toLowerCase();
              },
              W = function (e, t) {
                if (r(e) === h)
                  return (
                    (e = e.replace(/^\s\s*/, "")),
                    r(t) === c ? e : e.substring(0, 350)
                  );
              },
              q = function (e, t) {
                for (var n, i, s, c, h, u, d = 0; d < t.length && !h; ) {
                  var p = t[d],
                    f = t[d + 1];
                  for (n = i = 0; n < p.length && !h && p[n]; )
                    if ((h = p[n++].exec(e)))
                      for (s = 0; s < f.length; s++)
                        (u = h[++i]),
                          r((c = f[s])) === l && c.length > 0
                            ? 2 === c.length
                              ? r(c[1]) == o
                                ? (this[c[0]] = c[1].call(this, u))
                                : (this[c[0]] = c[1])
                              : 3 === c.length
                              ? r(c[1]) !== o || (c[1].exec && c[1].test)
                                ? (this[c[0]] = u ? u.replace(c[1], c[2]) : a)
                                : (this[c[0]] = u
                                    ? c[1].call(this, u, c[2])
                                    : a)
                              : 4 === c.length &&
                                (this[c[0]] = u
                                  ? c[3].call(this, u.replace(c[1], c[2]))
                                  : a)
                            : (this[c] = u || a);
                  d += 2;
                }
              },
              V = function (e, t) {
                for (var n in t)
                  if (r(t[n]) === l && t[n].length > 0) {
                    for (var i = 0; i < t[n].length; i++)
                      if (G(t[n][i], e)) return "?" === n ? a : n;
                  } else if (G(t[n], e)) return "?" === n ? a : n;
                return e;
              },
              Y = {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2e3: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM",
              },
              z = {
                browser: [
                  [/\b(?:crmo|crios)\/([\w\.]+)/i],
                  [m, [d, "Chrome"]],
                  [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                  [m, [d, "Edge"]],
                  [
                    /(opera mini)\/([-\w\.]+)/i,
                    /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                    /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                  ],
                  [d, m],
                  [/opios[\/ ]+([\w\.]+)/i],
                  [m, [d, "Opera Mini"]],
                  [/\bopr\/([\w\.]+)/i],
                  [m, [d, "Opera"]],
                  [
                    /(kindle)\/([\w\.]+)/i,
                    /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                    /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                    /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                    /(?:ms|\()(ie) ([\w\.]+)/i,
                    /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                    /(heytap|ovi)browser\/([\d\.]+)/i,
                    /(weibo)__([\d\.]+)/i,
                  ],
                  [d, m],
                  [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                  [m, [d, "UCBrowser"]],
                  [
                    /microm.+\bqbcore\/([\w\.]+)/i,
                    /\bqbcore\/([\w\.]+).+microm/i,
                  ],
                  [m, [d, "WeChat(Win) Desktop"]],
                  [/micromessenger\/([\w\.]+)/i],
                  [m, [d, "WeChat"]],
                  [/konqueror\/([\w\.]+)/i],
                  [m, [d, "Konqueror"]],
                  [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                  [m, [d, "IE"]],
                  [/ya(?:search)?browser\/([\w\.]+)/i],
                  [m, [d, "Yandex"]],
                  [/(avast|avg)\/([\w\.]+)/i],
                  [[d, /(.+)/, "$1 Secure Browser"], m],
                  [/\bfocus\/([\w\.]+)/i],
                  [m, [d, "Firefox Focus"]],
                  [/\bopt\/([\w\.]+)/i],
                  [m, [d, "Opera Touch"]],
                  [/coc_coc\w+\/([\w\.]+)/i],
                  [m, [d, "Coc Coc"]],
                  [/dolfin\/([\w\.]+)/i],
                  [m, [d, "Dolphin"]],
                  [/coast\/([\w\.]+)/i],
                  [m, [d, "Opera Coast"]],
                  [/miuibrowser\/([\w\.]+)/i],
                  [m, [d, "MIUI Browser"]],
                  [/fxios\/([-\w\.]+)/i],
                  [m, [d, "Firefox"]],
                  [/\bqihu|(qi?ho?o?|360)browser/i],
                  [[d, "360 Browser"]],
                  [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                  [[d, /(.+)/, "$1 Browser"], m],
                  [/(comodo_dragon)\/([\w\.]+)/i],
                  [[d, /_/g, " "], m],
                  [
                    /(electron)\/([\w\.]+) safari/i,
                    /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                    /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                  ],
                  [d, m],
                  [
                    /(metasr)[\/ ]?([\w\.]+)/i,
                    /(lbbrowser)/i,
                    /\[(linkedin)app\]/i,
                  ],
                  [d],
                  [
                    /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
                  ],
                  [[d, x], m],
                  [
                    /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                    /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                    /safari (line)\/([\w\.]+)/i,
                    /\b(line)\/([\w\.]+)\/iab/i,
                    /(chromium|instagram)[\/ ]([-\w\.]+)/i,
                  ],
                  [d, m],
                  [/\bgsa\/([\w\.]+) .*safari\//i],
                  [m, [d, "GSA"]],
                  [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                  [m, [d, "TikTok"]],
                  [/headlesschrome(?:\/([\w\.]+)| )/i],
                  [m, [d, "Chrome Headless"]],
                  [/ wv\).+(chrome)\/([\w\.]+)/i],
                  [[d, "Chrome WebView"], m],
                  [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                  [m, [d, "Android Browser"]],
                  [
                    /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i,
                  ],
                  [d, m],
                  [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                  [m, [d, "Mobile Safari"]],
                  [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                  [m, d],
                  [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                  [
                    d,
                    [
                      m,
                      V,
                      {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/",
                      },
                    ],
                  ],
                  [/(webkit|khtml)\/([\w\.]+)/i],
                  [d, m],
                  [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                  [[d, "Netscape"], m],
                  [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                  [m, [d, "Firefox Reality"]],
                  [
                    /ekiohf.+(flow)\/([\w\.]+)/i,
                    /(swiftfox)/i,
                    /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                    /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                    /(firefox)\/([\w\.]+)/i,
                    /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                    /(links) \(([\w\.]+)/i,
                    /panasonic;(viera)/i,
                  ],
                  [d, m],
                  [/(cobalt)\/([\w\.]+)/i],
                  [d, [m, /master.|lts./, ""]],
                ],
                cpu: [
                  [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                  [[v, "amd64"]],
                  [/(ia32(?=;))/i],
                  [[v, B]],
                  [/((?:i[346]|x)86)[;\)]/i],
                  [[v, "ia32"]],
                  [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                  [[v, "arm64"]],
                  [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                  [[v, "armhf"]],
                  [/windows (ce|mobile); ppc;/i],
                  [[v, "arm"]],
                  [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                  [[v, /ower/, "", B]],
                  [/(sun4\w)[;\)]/i],
                  [[v, "sparc"]],
                  [
                    /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                  ],
                  [[v, B]],
                ],
                device: [
                  [
                    /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                  ],
                  [u, [f, D], [p, w]],
                  [
                    /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                    /samsung[- ]([-\w]+)/i,
                    /sec-(sgh\w+)/i,
                  ],
                  [u, [f, D], [p, g]],
                  [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                  [u, [f, S], [p, g]],
                  [
                    /\((ipad);[-\w\),; ]+apple/i,
                    /applecoremedia\/[\w\.]+ \((ipad)/i,
                    /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                  ],
                  [u, [f, S], [p, w]],
                  [/(macintosh);/i],
                  [u, [f, S]],
                  [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                  [u, [f, M], [p, g]],
                  [
                    /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i,
                  ],
                  [u, [f, C], [p, w]],
                  [
                    /(?:huawei|honor)([-\w ]+)[;\)]/i,
                    /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                  ],
                  [u, [f, C], [p, g]],
                  [
                    /\b(poco[\w ]+)(?: bui|\))/i,
                    /\b; (\w+) build\/hm\1/i,
                    /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                    /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                    /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                  ],
                  [
                    [u, /_/g, " "],
                    [f, L],
                    [p, g],
                  ],
                  [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                  [
                    [u, /_/g, " "],
                    [f, L],
                    [p, w],
                  ],
                  [
                    /; (\w+) bui.+ oppo/i,
                    /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                  ],
                  [u, [f, "OPPO"], [p, g]],
                  [
                    /vivo (\w+)(?: bui|\))/i,
                    /\b(v[12]\d{3}\w?[at])(?: bui|;)/i,
                  ],
                  [u, [f, "Vivo"], [p, g]],
                  [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                  [u, [f, "Realme"], [p, g]],
                  [
                    /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                    /\bmot(?:orola)?[- ](\w*)/i,
                    /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                  ],
                  [u, [f, k], [p, g]],
                  [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                  [u, [f, k], [p, w]],
                  [
                    /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                  ],
                  [u, [f, O], [p, w]],
                  [
                    /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                    /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                    /\blg-?([\d\w]+) bui/i,
                  ],
                  [u, [f, O], [p, g]],
                  [
                    /(ideatab[-\w ]+)/i,
                    /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                  ],
                  [u, [f, "Lenovo"], [p, w]],
                  [
                    /(?:maemo|nokia).*(n900|lumia \d+)/i,
                    /nokia[-_ ]?([-\w\.]*)/i,
                  ],
                  [
                    [u, /_/g, " "],
                    [f, "Nokia"],
                    [p, g],
                  ],
                  [/(pixel c)\b/i],
                  [u, [f, I], [p, w]],
                  [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                  [u, [f, I], [p, g]],
                  [
                    /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                  ],
                  [u, [f, N], [p, g]],
                  [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                  [
                    [u, "Xperia Tablet"],
                    [f, N],
                    [p, w],
                  ],
                  [
                    / (kb2005|in20[12]5|be20[12][59])\b/i,
                    /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                  ],
                  [u, [f, "OnePlus"], [p, g]],
                  [
                    /(alexa)webm/i,
                    /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                    /(kf[a-z]+)( bui|\)).+silk\//i,
                  ],
                  [u, [f, T], [p, w]],
                  [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                  [
                    [u, /(.+)/g, "Fire Phone $1"],
                    [f, T],
                    [p, g],
                  ],
                  [/(playbook);[-\w\),; ]+(rim)/i],
                  [u, f, [p, w]],
                  [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                  [u, [f, _], [p, g]],
                  [
                    /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                  ],
                  [u, [f, A], [p, w]],
                  [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                  [u, [f, A], [p, g]],
                  [/(nexus 9)/i],
                  [u, [f, "HTC"], [p, w]],
                  [
                    /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                    /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                    /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                  ],
                  [f, [u, /_/g, " "], [p, g]],
                  [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                  [u, [f, "Acer"], [p, w]],
                  [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                  [u, [f, "Meizu"], [p, g]],
                  [
                    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                    /(hp) ([\w ]+\w)/i,
                    /(asus)-?(\w+)/i,
                    /(microsoft); (lumia[\w ]+)/i,
                    /(lenovo)[-_ ]?([-\w]+)/i,
                    /(jolla)/i,
                    /(oppo) ?([\w ]+) bui/i,
                  ],
                  [f, u, [p, g]],
                  [
                    /(kobo)\s(ereader|touch)/i,
                    /(archos) (gamepad2?)/i,
                    /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                    /(kindle)\/([\w\.]+)/i,
                    /(nook)[\w ]+build\/(\w+)/i,
                    /(dell) (strea[kpr\d ]*[\dko])/i,
                    /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                    /(trinity)[- ]*(t\d{3}) bui/i,
                    /(gigaset)[- ]+(q\w{1,9}) bui/i,
                    /(vodafone) ([\w ]+)(?:\)| bui)/i,
                  ],
                  [f, u, [p, w]],
                  [/(surface duo)/i],
                  [u, [f, R], [p, w]],
                  [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                  [u, [f, "Fairphone"], [p, g]],
                  [/(u304aa)/i],
                  [u, [f, "AT&T"], [p, g]],
                  [/\bsie-(\w*)/i],
                  [u, [f, "Siemens"], [p, g]],
                  [/\b(rct\w+) b/i],
                  [u, [f, "RCA"], [p, w]],
                  [/\b(venue[\d ]{2,7}) b/i],
                  [u, [f, "Dell"], [p, w]],
                  [/\b(q(?:mv|ta)\w+) b/i],
                  [u, [f, "Verizon"], [p, w]],
                  [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                  [u, [f, "Barnes & Noble"], [p, w]],
                  [/\b(tm\d{3}\w+) b/i],
                  [u, [f, "NuVision"], [p, w]],
                  [/\b(k88) b/i],
                  [u, [f, "ZTE"], [p, w]],
                  [/\b(nx\d{3}j) b/i],
                  [u, [f, "ZTE"], [p, g]],
                  [/\b(gen\d{3}) b.+49h/i],
                  [u, [f, "Swiss"], [p, g]],
                  [/\b(zur\d{3}) b/i],
                  [u, [f, "Swiss"], [p, w]],
                  [/\b((zeki)?tb.*\b) b/i],
                  [u, [f, "Zeki"], [p, w]],
                  [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                  [[f, "Dragon Touch"], u, [p, w]],
                  [/\b(ns-?\w{0,9}) b/i],
                  [u, [f, "Insignia"], [p, w]],
                  [/\b((nxa|next)-?\w{0,9}) b/i],
                  [u, [f, "NextBook"], [p, w]],
                  [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                  [[f, "Voice"], u, [p, g]],
                  [/\b(lvtel\-)?(v1[12]) b/i],
                  [[f, "LvTel"], u, [p, g]],
                  [/\b(ph-1) /i],
                  [u, [f, "Essential"], [p, g]],
                  [/\b(v(100md|700na|7011|917g).*\b) b/i],
                  [u, [f, "Envizen"], [p, w]],
                  [/\b(trio[-\w\. ]+) b/i],
                  [u, [f, "MachSpeed"], [p, w]],
                  [/\btu_(1491) b/i],
                  [u, [f, "Rotor"], [p, w]],
                  [/(shield[\w ]+) b/i],
                  [u, [f, "Nvidia"], [p, w]],
                  [/(sprint) (\w+)/i],
                  [f, u, [p, g]],
                  [/(kin\.[onetw]{3})/i],
                  [
                    [u, /\./g, " "],
                    [f, R],
                    [p, g],
                  ],
                  [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                  [u, [f, F], [p, w]],
                  [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                  [u, [f, F], [p, g]],
                  [/smart-tv.+(samsung)/i],
                  [f, [p, P]],
                  [/hbbtv.+maple;(\d+)/i],
                  [
                    [u, /^/, "SmartTV"],
                    [f, D],
                    [p, P],
                  ],
                  [
                    /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i,
                  ],
                  [
                    [f, O],
                    [p, P],
                  ],
                  [/(apple) ?tv/i],
                  [f, [u, "Apple TV"], [p, P]],
                  [/crkey/i],
                  [
                    [u, "Chromecast"],
                    [f, I],
                    [p, P],
                  ],
                  [/droid.+aft(\w)( bui|\))/i],
                  [u, [f, T], [p, P]],
                  [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                  [u, [f, M], [p, P]],
                  [/(bravia[\w ]+)( bui|\))/i],
                  [u, [f, N], [p, P]],
                  [/(mitv-\w{5}) bui/i],
                  [u, [f, L], [p, P]],
                  [/Hbbtv.*(technisat) (.*);/i],
                  [f, u, [p, P]],
                  [
                    /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                    /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                  ],
                  [
                    [f, W],
                    [u, W],
                    [p, P],
                  ],
                  [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                  [[p, P]],
                  [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                  [f, u, [p, y]],
                  [/droid.+; (shield) bui/i],
                  [u, [f, "Nvidia"], [p, y]],
                  [/(playstation [345portablevi]+)/i],
                  [u, [f, N], [p, y]],
                  [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                  [u, [f, R], [p, y]],
                  [/((pebble))app/i],
                  [f, u, [p, b]],
                  [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                  [u, [f, S], [p, b]],
                  [/droid.+; (glass) \d/i],
                  [u, [f, I], [p, b]],
                  [/droid.+; (wt63?0{2,3})\)/i],
                  [u, [f, F], [p, b]],
                  [/(quest( 2| pro)?)/i],
                  [u, [f, x], [p, b]],
                  [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                  [f, [p, E]],
                  [/(aeobc)\b/i],
                  [u, [f, T], [p, E]],
                  [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                  [u, [p, g]],
                  [
                    /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i,
                  ],
                  [u, [p, w]],
                  [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                  [[p, w]],
                  [
                    /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                  ],
                  [[p, g]],
                  [/(android[-\w\. ]{0,9});.+buil/i],
                  [u, [f, "Generic"]],
                ],
                engine: [
                  [/windows.+ edge\/([\w\.]+)/i],
                  [m, [d, "EdgeHTML"]],
                  [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                  [m, [d, "Blink"]],
                  [
                    /(presto)\/([\w\.]+)/i,
                    /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                    /ekioh(flow)\/([\w\.]+)/i,
                    /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                    /(icab)[\/ ]([23]\.[\d\.]+)/i,
                    /\b(libweb)/i,
                  ],
                  [d, m],
                  [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                  [m, d],
                ],
                os: [
                  [/microsoft (windows) (vista|xp)/i],
                  [d, m],
                  [
                    /(windows) nt 6\.2; (arm)/i,
                    /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                    /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                  ],
                  [d, [m, V, Y]],
                  [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                  [
                    [d, "Windows"],
                    [m, V, Y],
                  ],
                  [
                    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                    /ios;fbsv\/([\d\.]+)/i,
                    /cfnetwork\/.+darwin/i,
                  ],
                  [
                    [m, /_/g, "."],
                    [d, "iOS"],
                  ],
                  [
                    /(mac os x) ?([\w\. ]*)/i,
                    /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                  ],
                  [
                    [d, $],
                    [m, /_/g, "."],
                  ],
                  [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                  [m, d],
                  [
                    /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                    /(blackberry)\w*\/([\w\.]*)/i,
                    /(tizen|kaios)[\/ ]([\w\.]+)/i,
                    /\((series40);/i,
                  ],
                  [d, m],
                  [/\(bb(10);/i],
                  [m, [d, _]],
                  [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                  [m, [d, "Symbian"]],
                  [
                    /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                  ],
                  [m, [d, "Firefox OS"]],
                  [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                  [m, [d, "webOS"]],
                  [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                  [m, [d, "watchOS"]],
                  [/crkey\/([\d\.]+)/i],
                  [m, [d, "Chromecast"]],
                  [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                  [[d, j], m],
                  [
                    /panasonic;(viera)/i,
                    /(netrange)mmh/i,
                    /(nettv)\/(\d+\.[\w\.]+)/i,
                    /(nintendo|playstation) ([wids345portablevuch]+)/i,
                    /(xbox); +xbox ([^\);]+)/i,
                    /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                    /(mint)[\/\(\) ]?(\w*)/i,
                    /(mageia|vectorlinux)[; ]/i,
                    /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                    /(hurd|linux) ?([\w\.]*)/i,
                    /(gnu) ?([\w\.]*)/i,
                    /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                    /(haiku) (\w+)/i,
                  ],
                  [d, m],
                  [/(sunos) ?([\w\.\d]*)/i],
                  [[d, "Solaris"], m],
                  [
                    /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                    /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                    /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                    /(unix) ?([\w\.]*)/i,
                  ],
                  [d, m],
                ],
              },
              J = function e(t, n) {
                if ((r(t) === l && ((n = t), (t = a)), !(this instanceof e)))
                  return new e(t, n).getResult();
                var i = r(s) !== c && s.navigator ? s.navigator : a,
                  u = t || (i && i.userAgent ? i.userAgent : ""),
                  d = i && i.userAgentData ? i.userAgentData : a,
                  p = n
                    ? (function (e, t) {
                        var n = {};
                        for (var i in e)
                          t[i] && t[i].length % 2 == 0
                            ? (n[i] = t[i].concat(e[i]))
                            : (n[i] = e[i]);
                        return n;
                      })(z, n)
                    : z,
                  f = i && i.userAgent == u;
                return (
                  (this.getBrowser = function () {
                    var e,
                      t = {};
                    return (
                      (t.name = a),
                      (t.version = a),
                      q.call(t, u, p.browser),
                      (t.major =
                        r((e = t.version)) === h
                          ? e.replace(/[^\d\.]/g, "").split(".")[0]
                          : a),
                      f &&
                        i &&
                        i.brave &&
                        r(i.brave.isBrave) == o &&
                        (t.name = "Brave"),
                      t
                    );
                  }),
                  (this.getCPU = function () {
                    var e = {};
                    return (e.architecture = a), q.call(e, u, p.cpu), e;
                  }),
                  (this.getDevice = function () {
                    var e = {};
                    return (
                      (e.vendor = a),
                      (e.model = a),
                      (e.type = a),
                      q.call(e, u, p.device),
                      f && !e.type && d && d.mobile && (e.type = g),
                      f &&
                        "Macintosh" == e.model &&
                        i &&
                        r(i.standalone) !== c &&
                        i.maxTouchPoints &&
                        i.maxTouchPoints > 2 &&
                        ((e.model = "iPad"), (e.type = w)),
                      e
                    );
                  }),
                  (this.getEngine = function () {
                    var e = {};
                    return (
                      (e.name = a), (e.version = a), q.call(e, u, p.engine), e
                    );
                  }),
                  (this.getOS = function () {
                    var e = {};
                    return (
                      (e.name = a),
                      (e.version = a),
                      q.call(e, u, p.os),
                      f &&
                        !e.name &&
                        d &&
                        "Unknown" != d.platform &&
                        (e.name = d.platform
                          .replace(/chrome os/i, j)
                          .replace(/macos/i, $)),
                      e
                    );
                  }),
                  (this.getResult = function () {
                    return {
                      ua: this.getUA(),
                      browser: this.getBrowser(),
                      engine: this.getEngine(),
                      os: this.getOS(),
                      device: this.getDevice(),
                      cpu: this.getCPU(),
                    };
                  }),
                  (this.getUA = function () {
                    return u;
                  }),
                  (this.setUA = function (e) {
                    return (
                      (u = r(e) === h && e.length > 350 ? W(e, 350) : e), this
                    );
                  }),
                  this.setUA(u),
                  this
                );
              };
            (J.VERSION = "1.0.35"),
              (J.BROWSER = U([d, m, "major"])),
              (J.CPU = U([v])),
              (J.DEVICE = U([u, f, p, y, g, P, w, b, E])),
              (J.ENGINE = J.OS = U([d, m])),
              r(t) !== c
                ? (r(e) !== c && e.exports && (t = e.exports = J),
                  (t.UAParser = J))
                : r(n.amdD) === o && n.amdO
                ? (i = function () {
                    return J;
                  }.call(t, n, t, e)) === a || (e.exports = i)
                : r(s) !== c && (s.UAParser = J);
            var K = r(s) !== c && (s.jQuery || s.Zepto);
            if (K && !K.ua) {
              var Z = new J();
              (K.ua = Z.getResult()),
                (K.ua.get = function () {
                  return Z.getUA();
                }),
                (K.ua.set = function (e) {
                  Z.setUA(e);
                  var t = Z.getResult();
                  for (var n in t) K.ua[n] = t[n];
                });
            }
          })(
            "object" ===
              ("undefined" == typeof window ? "undefined" : r(window))
              ? window
              : this
          );
      },
      8205: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(2616),
          r = n.n(i)()(function (e) {
            return e[1];
          });
        r.push([
          e.id,
          ".gs-global-loader{position:fixed;z-index:99999;top:8px;right:8px;width:48px;height:48px}@media only screen and (min-width: 1024px){.gs-global-loader{top:inherit;right:16px;bottom:16px}}.gs-loader{position:relative;width:40px;height:40px;border-radius:50%;display:flex}.gs-loader__outter{box-sizing:border-box;position:absolute;border:4px solid #f50057;border-left-color:transparent;width:100%;height:100%;border-radius:50%;-webkit-animation:loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;animation:loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite}.gs-loader__inner{box-sizing:border-box;position:absolute;border:4px solid #f50057;border-radius:50%;width:20px;height:20px;left:calc(50% - 10px);top:calc(50% - 10px);border-top-color:transparent;-webkit-animation:loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;animation:loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite}@keyframes loader-outter{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes loader-inner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}.gs-loader-hidden{display:none}",
          "",
        ]);
        const s = r;
      },
      4610: (e, t, n) => {
        "use strict";
        n.d(t, { _: () => v });
        var i = n(9312),
          r = n(824),
          s = n(1654),
          a = n(6803);
        function o(e) {
          return (o =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function c(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, i.key, i);
          }
        }
        function l(e, t) {
          return !t || ("object" !== o(t) && "function" != typeof t) ? h(e) : t;
        }
        function h(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        }
        function u(e) {
          var t = "function" == typeof Map ? new Map() : void 0;
          return (u = function (e) {
            if (
              null === e ||
              ((n = e),
              -1 === Function.toString.call(n).indexOf("[native code]"))
            )
              return e;
            var n;
            if ("function" != typeof e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            if (void 0 !== t) {
              if (t.has(e)) return t.get(e);
              t.set(e, i);
            }
            function i() {
              return d(e, arguments, m(this).constructor);
            }
            return (
              (i.prototype = Object.create(e.prototype, {
                constructor: {
                  value: i,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
              f(i, e)
            );
          })(e);
        }
        function d(e, t, n) {
          return (d = p()
            ? Reflect.construct
            : function (e, t, n) {
                var i = [null];
                i.push.apply(i, t);
                var r = new (Function.bind.apply(e, i))();
                return n && f(r, n.prototype), r;
              }).apply(null, arguments);
        }
        function p() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(
                Reflect.construct(Date, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        }
        function f(e, t) {
          return (f =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e;
            })(e, t);
        }
        function m(e) {
          return (m = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              })(e);
        }
        var v = (function (e) {
          !(function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && f(e, t);
          })(v, e);
          var t,
            n,
            o,
            u,
            d =
              ((t = v),
              (n = p()),
              function () {
                var e,
                  i = m(t);
                if (n) {
                  var r = m(this).constructor;
                  e = Reflect.construct(i, arguments, r);
                } else e = i.apply(this, arguments);
                return l(this, e);
              });
          function v(e, t, n, r, a, o, c) {
            var u, p, f, m, y;
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, v),
              (y = d.call(this, e));
            var g,
              w = Array.isArray(t)
                ? 0 !== t.length
                  ? t
                  : void 0
                : t
                ? [t]
                : void 0,
              P = n;
            !P &&
              w &&
              (P = null === (g = w[0].loc) || void 0 === g ? void 0 : g.source);
            var b,
              E = r;
            !E &&
              w &&
              (E = w.reduce(function (e, t) {
                return t.loc && e.push(t.loc.start), e;
              }, [])),
              E && 0 === E.length && (E = void 0),
              r && n
                ? (b = r.map(function (e) {
                    return (0, s.k)(n, e);
                  }))
                : w &&
                  (b = w.reduce(function (e, t) {
                    return (
                      t.loc && e.push((0, s.k)(t.loc.source, t.loc.start)), e
                    );
                  }, []));
            var T = c;
            if (null == T && null != o) {
              var S = o.extensions;
              (0, i.Z)(S) && (T = S);
            }
            return (
              Object.defineProperties(h(y), {
                name: { value: "GraphQLError" },
                message: { value: e, enumerable: !0, writable: !0 },
                locations: {
                  value: null !== (u = b) && void 0 !== u ? u : void 0,
                  enumerable: null != b,
                },
                path: { value: null != a ? a : void 0, enumerable: null != a },
                nodes: { value: null != w ? w : void 0 },
                source: {
                  value: null !== (p = P) && void 0 !== p ? p : void 0,
                },
                positions: {
                  value: null !== (f = E) && void 0 !== f ? f : void 0,
                },
                originalError: { value: o },
                extensions: {
                  value: null !== (m = T) && void 0 !== m ? m : void 0,
                  enumerable: null != T,
                },
              }),
              null != o && o.stack
                ? (Object.defineProperty(h(y), "stack", {
                    value: o.stack,
                    writable: !0,
                    configurable: !0,
                  }),
                  l(y))
                : (Error.captureStackTrace
                    ? Error.captureStackTrace(h(y), v)
                    : Object.defineProperty(h(y), "stack", {
                        value: Error().stack,
                        writable: !0,
                        configurable: !0,
                      }),
                  y)
            );
          }
          return (
            (o = v),
            (u = [
              {
                key: "toString",
                value: function () {
                  return (function (e) {
                    var t = e.message;
                    if (e.nodes)
                      for (var n = 0, i = e.nodes; n < i.length; n++) {
                        var r = i[n];
                        r.loc && (t += "\n\n" + (0, a.Q)(r.loc));
                      }
                    else if (e.source && e.locations)
                      for (var s = 0, o = e.locations; s < o.length; s++) {
                        var c = o[s];
                        t += "\n\n" + (0, a.z)(e.source, c);
                      }
                    return t;
                  })(this);
                },
              },
              {
                key: r.YF,
                get: function () {
                  return "Object";
                },
              },
            ]) && c(o.prototype, u),
            v
          );
        })(u(Error));
      },
      7303: (e, t, n) => {
        "use strict";
        n.d(t, { h: () => r });
        var i = n(4610);
        function r(e, t, n) {
          return new i._("Syntax Error: ".concat(n), void 0, e, [t]);
        }
      },
      1087: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(3077),
          r = n(7986);
        function s(e) {
          var t = e.prototype.toJSON;
          "function" == typeof t || (0, i.Z)(0),
            (e.prototype.inspect = t),
            r.Z && (e.prototype[r.Z] = t);
        }
      },
      3767: (e, t, n) => {
        "use strict";
        function i(e, t) {
          if (!Boolean(e)) throw new Error(t);
        }
        n.d(t, { Z: () => i });
      },
      6589: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(7986);
        function r(e) {
          return (r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function s(e) {
          return a(e, []);
        }
        function a(e, t) {
          switch (r(e)) {
            case "string":
              return JSON.stringify(e);
            case "function":
              return e.name ? "[function ".concat(e.name, "]") : "[function]";
            case "object":
              return null === e
                ? "null"
                : (function (e, t) {
                    if (-1 !== t.indexOf(e)) return "[Circular]";
                    var n = [].concat(t, [e]),
                      r = (function (e) {
                        var t = e[String(i.Z)];
                        return "function" == typeof t
                          ? t
                          : "function" == typeof e.inspect
                          ? e.inspect
                          : void 0;
                      })(e);
                    if (void 0 !== r) {
                      var s = r.call(e);
                      if (s !== e) return "string" == typeof s ? s : a(s, n);
                    } else if (Array.isArray(e))
                      return (function (e, t) {
                        if (0 === e.length) return "[]";
                        if (t.length > 2) return "[Array]";
                        for (
                          var n = Math.min(10, e.length),
                            i = e.length - n,
                            r = [],
                            s = 0;
                          s < n;
                          ++s
                        )
                          r.push(a(e[s], t));
                        return (
                          1 === i
                            ? r.push("... 1 more item")
                            : i > 1 && r.push("... ".concat(i, " more items")),
                          "[" + r.join(", ") + "]"
                        );
                      })(e, n);
                    return (function (e, t) {
                      var n = Object.keys(e);
                      return 0 === n.length
                        ? "{}"
                        : t.length > 2
                        ? "[" +
                          (function (e) {
                            var t = Object.prototype.toString
                              .call(e)
                              .replace(/^\[object /, "")
                              .replace(/]$/, "");
                            if (
                              "Object" === t &&
                              "function" == typeof e.constructor
                            ) {
                              var n = e.constructor.name;
                              if ("string" == typeof n && "" !== n) return n;
                            }
                            return t;
                          })(e) +
                          "]"
                        : "{ " +
                          n
                            .map(function (n) {
                              return n + ": " + a(e[n], t);
                            })
                            .join(", ") +
                          " }";
                    })(e, n);
                  })(e, t);
            default:
              return String(e);
          }
        }
      },
      9495: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => i });
        const i = function (e, t) {
          return e instanceof t;
        };
      },
      3077: (e, t, n) => {
        "use strict";
        function i(e, t) {
          if (!Boolean(e))
            throw new Error(null != t ? t : "Unexpected invariant triggered.");
        }
        n.d(t, { Z: () => i });
      },
      9312: (e, t, n) => {
        "use strict";
        function i(e) {
          return (i =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function r(e) {
          return "object" == i(e) && null !== e;
        }
        n.d(t, { Z: () => r });
      },
      7986: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => i });
        const i =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : void 0;
      },
      2387: (e, t, n) => {
        "use strict";
        n.d(t, { Ye: () => r, WU: () => s });
        var i = n(1087),
          r = (function () {
            function e(e, t, n) {
              (this.start = e.start),
                (this.end = t.end),
                (this.startToken = e),
                (this.endToken = t),
                (this.source = n);
            }
            return (
              (e.prototype.toJSON = function () {
                return { start: this.start, end: this.end };
              }),
              e
            );
          })();
        (0, i.Z)(r);
        var s = (function () {
          function e(e, t, n, i, r, s, a) {
            (this.kind = e),
              (this.start = t),
              (this.end = n),
              (this.line = i),
              (this.column = r),
              (this.value = a),
              (this.prev = s),
              (this.next = null);
          }
          return (
            (e.prototype.toJSON = function () {
              return {
                kind: this.kind,
                value: this.value,
                line: this.line,
                column: this.column,
              };
            }),
            e
          );
        })();
        (0, i.Z)(s);
      },
      7420: (e, t, n) => {
        "use strict";
        function i(e) {
          var t = e.split(/\r\n|[\n\r]/g),
            n = (function (e) {
              for (
                var t, n = !0, i = !0, r = 0, s = null, a = 0;
                a < e.length;
                ++a
              )
                switch (e.charCodeAt(a)) {
                  case 13:
                    10 === e.charCodeAt(a + 1) && ++a;
                  case 10:
                    (n = !1), (i = !0), (r = 0);
                    break;
                  case 9:
                  case 32:
                    ++r;
                    break;
                  default:
                    i && !n && (null === s || r < s) && (s = r), (i = !1);
                }
              return null !== (t = s) && void 0 !== t ? t : 0;
            })(e);
          if (0 !== n) for (var i = 1; i < t.length; i++) t[i] = t[i].slice(n);
          for (var s = 0; s < t.length && r(t[s]); ) ++s;
          for (var a = t.length; a > s && r(t[a - 1]); ) --a;
          return t.slice(s, a).join("\n");
        }
        function r(e) {
          for (var t = 0; t < e.length; ++t)
            if (" " !== e[t] && "\t" !== e[t]) return !1;
          return !0;
        }
        n.d(t, { W7: () => i });
      },
      4643: (e, t, n) => {
        "use strict";
        n.d(t, { B: () => i });
        var i = Object.freeze({
          QUERY: "QUERY",
          MUTATION: "MUTATION",
          SUBSCRIPTION: "SUBSCRIPTION",
          FIELD: "FIELD",
          FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
          FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
          INLINE_FRAGMENT: "INLINE_FRAGMENT",
          VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
          SCHEMA: "SCHEMA",
          SCALAR: "SCALAR",
          OBJECT: "OBJECT",
          FIELD_DEFINITION: "FIELD_DEFINITION",
          ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
          INTERFACE: "INTERFACE",
          UNION: "UNION",
          ENUM: "ENUM",
          ENUM_VALUE: "ENUM_VALUE",
          INPUT_OBJECT: "INPUT_OBJECT",
          INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION",
        });
      },
      6450: (e, t, n) => {
        "use strict";
        n.d(t, { h: () => i });
        var i = Object.freeze({
          NAME: "Name",
          DOCUMENT: "Document",
          OPERATION_DEFINITION: "OperationDefinition",
          VARIABLE_DEFINITION: "VariableDefinition",
          SELECTION_SET: "SelectionSet",
          FIELD: "Field",
          ARGUMENT: "Argument",
          FRAGMENT_SPREAD: "FragmentSpread",
          INLINE_FRAGMENT: "InlineFragment",
          FRAGMENT_DEFINITION: "FragmentDefinition",
          VARIABLE: "Variable",
          INT: "IntValue",
          FLOAT: "FloatValue",
          STRING: "StringValue",
          BOOLEAN: "BooleanValue",
          NULL: "NullValue",
          ENUM: "EnumValue",
          LIST: "ListValue",
          OBJECT: "ObjectValue",
          OBJECT_FIELD: "ObjectField",
          DIRECTIVE: "Directive",
          NAMED_TYPE: "NamedType",
          LIST_TYPE: "ListType",
          NON_NULL_TYPE: "NonNullType",
          SCHEMA_DEFINITION: "SchemaDefinition",
          OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
          SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
          OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
          FIELD_DEFINITION: "FieldDefinition",
          INPUT_VALUE_DEFINITION: "InputValueDefinition",
          INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
          UNION_TYPE_DEFINITION: "UnionTypeDefinition",
          ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
          ENUM_VALUE_DEFINITION: "EnumValueDefinition",
          INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
          DIRECTIVE_DEFINITION: "DirectiveDefinition",
          SCHEMA_EXTENSION: "SchemaExtension",
          SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
          OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
          INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
          UNION_TYPE_EXTENSION: "UnionTypeExtension",
          ENUM_TYPE_EXTENSION: "EnumTypeExtension",
          INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension",
        });
      },
      2496: (e, t, n) => {
        "use strict";
        n.d(t, { h: () => o, u: () => c });
        var i = n(7303),
          r = n(2387),
          s = n(7525),
          a = n(7420),
          o = (function () {
            function e(e) {
              var t = new r.WU(s.T.SOF, 0, 0, 0, 0, null);
              (this.source = e),
                (this.lastToken = t),
                (this.token = t),
                (this.line = 1),
                (this.lineStart = 0);
            }
            var t = e.prototype;
            return (
              (t.advance = function () {
                return (
                  (this.lastToken = this.token), (this.token = this.lookahead())
                );
              }),
              (t.lookahead = function () {
                var e = this.token;
                if (e.kind !== s.T.EOF)
                  do {
                    var t;
                    e =
                      null !== (t = e.next) && void 0 !== t
                        ? t
                        : (e.next = h(this, e));
                  } while (e.kind === s.T.COMMENT);
                return e;
              }),
              e
            );
          })();
        function c(e) {
          return (
            e === s.T.BANG ||
            e === s.T.DOLLAR ||
            e === s.T.AMP ||
            e === s.T.PAREN_L ||
            e === s.T.PAREN_R ||
            e === s.T.SPREAD ||
            e === s.T.COLON ||
            e === s.T.EQUALS ||
            e === s.T.AT ||
            e === s.T.BRACKET_L ||
            e === s.T.BRACKET_R ||
            e === s.T.BRACE_L ||
            e === s.T.PIPE ||
            e === s.T.BRACE_R
          );
        }
        function l(e) {
          return isNaN(e)
            ? s.T.EOF
            : e < 127
            ? JSON.stringify(String.fromCharCode(e))
            : '"\\u'.concat(
                ("00" + e.toString(16).toUpperCase()).slice(-4),
                '"'
              );
        }
        function h(e, t) {
          for (var n = e.source, a = n.body, o = a.length, c = t.end; c < o; ) {
            var l = a.charCodeAt(c),
              h = e.line,
              f = 1 + c - e.lineStart;
            switch (l) {
              case 65279:
              case 9:
              case 32:
              case 44:
                ++c;
                continue;
              case 10:
                ++c, ++e.line, (e.lineStart = c);
                continue;
              case 13:
                10 === a.charCodeAt(c + 1) ? (c += 2) : ++c,
                  ++e.line,
                  (e.lineStart = c);
                continue;
              case 33:
                return new r.WU(s.T.BANG, c, c + 1, h, f, t);
              case 35:
                return d(n, c, h, f, t);
              case 36:
                return new r.WU(s.T.DOLLAR, c, c + 1, h, f, t);
              case 38:
                return new r.WU(s.T.AMP, c, c + 1, h, f, t);
              case 40:
                return new r.WU(s.T.PAREN_L, c, c + 1, h, f, t);
              case 41:
                return new r.WU(s.T.PAREN_R, c, c + 1, h, f, t);
              case 46:
                if (46 === a.charCodeAt(c + 1) && 46 === a.charCodeAt(c + 2))
                  return new r.WU(s.T.SPREAD, c, c + 3, h, f, t);
                break;
              case 58:
                return new r.WU(s.T.COLON, c, c + 1, h, f, t);
              case 61:
                return new r.WU(s.T.EQUALS, c, c + 1, h, f, t);
              case 64:
                return new r.WU(s.T.AT, c, c + 1, h, f, t);
              case 91:
                return new r.WU(s.T.BRACKET_L, c, c + 1, h, f, t);
              case 93:
                return new r.WU(s.T.BRACKET_R, c, c + 1, h, f, t);
              case 123:
                return new r.WU(s.T.BRACE_L, c, c + 1, h, f, t);
              case 124:
                return new r.WU(s.T.PIPE, c, c + 1, h, f, t);
              case 125:
                return new r.WU(s.T.BRACE_R, c, c + 1, h, f, t);
              case 34:
                return 34 === a.charCodeAt(c + 1) && 34 === a.charCodeAt(c + 2)
                  ? v(n, c, h, f, t, e)
                  : m(n, c, h, f, t);
              case 45:
              case 48:
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
                return p(n, c, l, h, f, t);
              case 65:
              case 66:
              case 67:
              case 68:
              case 69:
              case 70:
              case 71:
              case 72:
              case 73:
              case 74:
              case 75:
              case 76:
              case 77:
              case 78:
              case 79:
              case 80:
              case 81:
              case 82:
              case 83:
              case 84:
              case 85:
              case 86:
              case 87:
              case 88:
              case 89:
              case 90:
              case 95:
              case 97:
              case 98:
              case 99:
              case 100:
              case 101:
              case 102:
              case 103:
              case 104:
              case 105:
              case 106:
              case 107:
              case 108:
              case 109:
              case 110:
              case 111:
              case 112:
              case 113:
              case 114:
              case 115:
              case 116:
              case 117:
              case 118:
              case 119:
              case 120:
              case 121:
              case 122:
                return g(n, c, h, f, t);
            }
            throw (0, i.h)(n, c, u(l));
          }
          var y = e.line,
            w = 1 + c - e.lineStart;
          return new r.WU(s.T.EOF, o, o, y, w, t);
        }
        function u(e) {
          return e < 32 && 9 !== e && 10 !== e && 13 !== e
            ? "Cannot contain the invalid character ".concat(l(e), ".")
            : 39 === e
            ? "Unexpected single quote character ('), did you mean to use a double quote (\")?"
            : "Cannot parse the unexpected character ".concat(l(e), ".");
        }
        function d(e, t, n, i, a) {
          var o,
            c = e.body,
            l = t;
          do {
            o = c.charCodeAt(++l);
          } while (!isNaN(o) && (o > 31 || 9 === o));
          return new r.WU(s.T.COMMENT, t, l, n, i, a, c.slice(t + 1, l));
        }
        function p(e, t, n, a, o, c) {
          var h = e.body,
            u = n,
            d = t,
            p = !1;
          if ((45 === u && (u = h.charCodeAt(++d)), 48 === u)) {
            if ((u = h.charCodeAt(++d)) >= 48 && u <= 57)
              throw (0, i.h)(
                e,
                d,
                "Invalid number, unexpected digit after 0: ".concat(l(u), ".")
              );
          } else (d = f(e, d, u)), (u = h.charCodeAt(d));
          if (
            (46 === u &&
              ((p = !0),
              (u = h.charCodeAt(++d)),
              (d = f(e, d, u)),
              (u = h.charCodeAt(d))),
            (69 !== u && 101 !== u) ||
              ((p = !0),
              (43 !== (u = h.charCodeAt(++d)) && 45 !== u) ||
                (u = h.charCodeAt(++d)),
              (d = f(e, d, u)),
              (u = h.charCodeAt(d))),
            46 === u ||
              (function (e) {
                return (
                  95 === e || (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
                );
              })(u))
          )
            throw (0, i.h)(
              e,
              d,
              "Invalid number, expected digit but got: ".concat(l(u), ".")
            );
          return new r.WU(
            p ? s.T.FLOAT : s.T.INT,
            t,
            d,
            a,
            o,
            c,
            h.slice(t, d)
          );
        }
        function f(e, t, n) {
          var r = e.body,
            s = t,
            a = n;
          if (a >= 48 && a <= 57) {
            do {
              a = r.charCodeAt(++s);
            } while (a >= 48 && a <= 57);
            return s;
          }
          throw (0, i.h)(
            e,
            s,
            "Invalid number, expected digit but got: ".concat(l(a), ".")
          );
        }
        function m(e, t, n, a, o) {
          for (
            var c, h, u, d, p = e.body, f = t + 1, m = f, v = 0, g = "";
            f < p.length &&
            !isNaN((v = p.charCodeAt(f))) &&
            10 !== v &&
            13 !== v;

          ) {
            if (34 === v)
              return (
                (g += p.slice(m, f)), new r.WU(s.T.STRING, t, f + 1, n, a, o, g)
              );
            if (v < 32 && 9 !== v)
              throw (0, i.h)(
                e,
                f,
                "Invalid character within String: ".concat(l(v), ".")
              );
            if ((++f, 92 === v)) {
              switch (((g += p.slice(m, f - 1)), (v = p.charCodeAt(f)))) {
                case 34:
                  g += '"';
                  break;
                case 47:
                  g += "/";
                  break;
                case 92:
                  g += "\\";
                  break;
                case 98:
                  g += "\b";
                  break;
                case 102:
                  g += "\f";
                  break;
                case 110:
                  g += "\n";
                  break;
                case 114:
                  g += "\r";
                  break;
                case 116:
                  g += "\t";
                  break;
                case 117:
                  var w =
                    ((c = p.charCodeAt(f + 1)),
                    (h = p.charCodeAt(f + 2)),
                    (u = p.charCodeAt(f + 3)),
                    (d = p.charCodeAt(f + 4)),
                    (y(c) << 12) | (y(h) << 8) | (y(u) << 4) | y(d));
                  if (w < 0) {
                    var P = p.slice(f + 1, f + 5);
                    throw (0, i.h)(
                      e,
                      f,
                      "Invalid character escape sequence: \\u".concat(P, ".")
                    );
                  }
                  (g += String.fromCharCode(w)), (f += 4);
                  break;
                default:
                  throw (0, i.h)(
                    e,
                    f,
                    "Invalid character escape sequence: \\".concat(
                      String.fromCharCode(v),
                      "."
                    )
                  );
              }
              m = ++f;
            }
          }
          throw (0, i.h)(e, f, "Unterminated string.");
        }
        function v(e, t, n, o, c, h) {
          for (
            var u = e.body, d = t + 3, p = d, f = 0, m = "";
            d < u.length && !isNaN((f = u.charCodeAt(d)));

          ) {
            if (
              34 === f &&
              34 === u.charCodeAt(d + 1) &&
              34 === u.charCodeAt(d + 2)
            )
              return (
                (m += u.slice(p, d)),
                new r.WU(s.T.BLOCK_STRING, t, d + 3, n, o, c, (0, a.W7)(m))
              );
            if (f < 32 && 9 !== f && 10 !== f && 13 !== f)
              throw (0, i.h)(
                e,
                d,
                "Invalid character within String: ".concat(l(f), ".")
              );
            10 === f
              ? (++d, ++h.line, (h.lineStart = d))
              : 13 === f
              ? (10 === u.charCodeAt(d + 1) ? (d += 2) : ++d,
                ++h.line,
                (h.lineStart = d))
              : 92 === f &&
                34 === u.charCodeAt(d + 1) &&
                34 === u.charCodeAt(d + 2) &&
                34 === u.charCodeAt(d + 3)
              ? ((m += u.slice(p, d) + '"""'), (p = d += 4))
              : ++d;
          }
          throw (0, i.h)(e, d, "Unterminated string.");
        }
        function y(e) {
          return e >= 48 && e <= 57
            ? e - 48
            : e >= 65 && e <= 70
            ? e - 55
            : e >= 97 && e <= 102
            ? e - 87
            : -1;
        }
        function g(e, t, n, i, a) {
          for (
            var o = e.body, c = o.length, l = t + 1, h = 0;
            l !== c &&
            !isNaN((h = o.charCodeAt(l))) &&
            (95 === h ||
              (h >= 48 && h <= 57) ||
              (h >= 65 && h <= 90) ||
              (h >= 97 && h <= 122));

          )
            ++l;
          return new r.WU(s.T.NAME, t, l, n, i, a, o.slice(t, l));
        }
      },
      1654: (e, t, n) => {
        "use strict";
        function i(e, t) {
          for (
            var n, i = /\r\n|[\n\r]/g, r = 1, s = t + 1;
            (n = i.exec(e.body)) && n.index < t;

          )
            (r += 1), (s = t + 1 - (n.index + n[0].length));
          return { line: r, column: s };
        }
        n.d(t, { k: () => i });
      },
      9691: (e, t, n) => {
        "use strict";
        n.d(t, { Qc: () => h });
        var i = n(7303),
          r = n(6450),
          s = n(2387),
          a = n(7525),
          o = n(1112),
          c = n(4643),
          l = n(2496);
        function h(e, t) {
          return new u(e, t).parseDocument();
        }
        var u = (function () {
          function e(e, t) {
            var n = (0, o.T)(e) ? e : new o.H(e);
            (this._lexer = new l.h(n)), (this._options = t);
          }
          var t = e.prototype;
          return (
            (t.parseName = function () {
              var e = this.expectToken(a.T.NAME);
              return { kind: r.h.NAME, value: e.value, loc: this.loc(e) };
            }),
            (t.parseDocument = function () {
              var e = this._lexer.token;
              return {
                kind: r.h.DOCUMENT,
                definitions: this.many(a.T.SOF, this.parseDefinition, a.T.EOF),
                loc: this.loc(e),
              };
            }),
            (t.parseDefinition = function () {
              if (this.peek(a.T.NAME))
                switch (this._lexer.token.value) {
                  case "query":
                  case "mutation":
                  case "subscription":
                    return this.parseOperationDefinition();
                  case "fragment":
                    return this.parseFragmentDefinition();
                  case "schema":
                  case "scalar":
                  case "type":
                  case "interface":
                  case "union":
                  case "enum":
                  case "input":
                  case "directive":
                    return this.parseTypeSystemDefinition();
                  case "extend":
                    return this.parseTypeSystemExtension();
                }
              else {
                if (this.peek(a.T.BRACE_L))
                  return this.parseOperationDefinition();
                if (this.peekDescription())
                  return this.parseTypeSystemDefinition();
              }
              throw this.unexpected();
            }),
            (t.parseOperationDefinition = function () {
              var e = this._lexer.token;
              if (this.peek(a.T.BRACE_L))
                return {
                  kind: r.h.OPERATION_DEFINITION,
                  operation: "query",
                  name: void 0,
                  variableDefinitions: [],
                  directives: [],
                  selectionSet: this.parseSelectionSet(),
                  loc: this.loc(e),
                };
              var t,
                n = this.parseOperationType();
              return (
                this.peek(a.T.NAME) && (t = this.parseName()),
                {
                  kind: r.h.OPERATION_DEFINITION,
                  operation: n,
                  name: t,
                  variableDefinitions: this.parseVariableDefinitions(),
                  directives: this.parseDirectives(!1),
                  selectionSet: this.parseSelectionSet(),
                  loc: this.loc(e),
                }
              );
            }),
            (t.parseOperationType = function () {
              var e = this.expectToken(a.T.NAME);
              switch (e.value) {
                case "query":
                  return "query";
                case "mutation":
                  return "mutation";
                case "subscription":
                  return "subscription";
              }
              throw this.unexpected(e);
            }),
            (t.parseVariableDefinitions = function () {
              return this.optionalMany(
                a.T.PAREN_L,
                this.parseVariableDefinition,
                a.T.PAREN_R
              );
            }),
            (t.parseVariableDefinition = function () {
              var e = this._lexer.token;
              return {
                kind: r.h.VARIABLE_DEFINITION,
                variable: this.parseVariable(),
                type: (this.expectToken(a.T.COLON), this.parseTypeReference()),
                defaultValue: this.expectOptionalToken(a.T.EQUALS)
                  ? this.parseValueLiteral(!0)
                  : void 0,
                directives: this.parseDirectives(!0),
                loc: this.loc(e),
              };
            }),
            (t.parseVariable = function () {
              var e = this._lexer.token;
              return (
                this.expectToken(a.T.DOLLAR),
                { kind: r.h.VARIABLE, name: this.parseName(), loc: this.loc(e) }
              );
            }),
            (t.parseSelectionSet = function () {
              var e = this._lexer.token;
              return {
                kind: r.h.SELECTION_SET,
                selections: this.many(
                  a.T.BRACE_L,
                  this.parseSelection,
                  a.T.BRACE_R
                ),
                loc: this.loc(e),
              };
            }),
            (t.parseSelection = function () {
              return this.peek(a.T.SPREAD)
                ? this.parseFragment()
                : this.parseField();
            }),
            (t.parseField = function () {
              var e,
                t,
                n = this._lexer.token,
                i = this.parseName();
              return (
                this.expectOptionalToken(a.T.COLON)
                  ? ((e = i), (t = this.parseName()))
                  : (t = i),
                {
                  kind: r.h.FIELD,
                  alias: e,
                  name: t,
                  arguments: this.parseArguments(!1),
                  directives: this.parseDirectives(!1),
                  selectionSet: this.peek(a.T.BRACE_L)
                    ? this.parseSelectionSet()
                    : void 0,
                  loc: this.loc(n),
                }
              );
            }),
            (t.parseArguments = function (e) {
              var t = e ? this.parseConstArgument : this.parseArgument;
              return this.optionalMany(a.T.PAREN_L, t, a.T.PAREN_R);
            }),
            (t.parseArgument = function () {
              var e = this._lexer.token,
                t = this.parseName();
              return (
                this.expectToken(a.T.COLON),
                {
                  kind: r.h.ARGUMENT,
                  name: t,
                  value: this.parseValueLiteral(!1),
                  loc: this.loc(e),
                }
              );
            }),
            (t.parseConstArgument = function () {
              var e = this._lexer.token;
              return {
                kind: r.h.ARGUMENT,
                name: this.parseName(),
                value:
                  (this.expectToken(a.T.COLON), this.parseValueLiteral(!0)),
                loc: this.loc(e),
              };
            }),
            (t.parseFragment = function () {
              var e = this._lexer.token;
              this.expectToken(a.T.SPREAD);
              var t = this.expectOptionalKeyword("on");
              return !t && this.peek(a.T.NAME)
                ? {
                    kind: r.h.FRAGMENT_SPREAD,
                    name: this.parseFragmentName(),
                    directives: this.parseDirectives(!1),
                    loc: this.loc(e),
                  }
                : {
                    kind: r.h.INLINE_FRAGMENT,
                    typeCondition: t ? this.parseNamedType() : void 0,
                    directives: this.parseDirectives(!1),
                    selectionSet: this.parseSelectionSet(),
                    loc: this.loc(e),
                  };
            }),
            (t.parseFragmentDefinition = function () {
              var e,
                t = this._lexer.token;
              return (
                this.expectKeyword("fragment"),
                !0 ===
                (null === (e = this._options) || void 0 === e
                  ? void 0
                  : e.experimentalFragmentVariables)
                  ? {
                      kind: r.h.FRAGMENT_DEFINITION,
                      name: this.parseFragmentName(),
                      variableDefinitions: this.parseVariableDefinitions(),
                      typeCondition:
                        (this.expectKeyword("on"), this.parseNamedType()),
                      directives: this.parseDirectives(!1),
                      selectionSet: this.parseSelectionSet(),
                      loc: this.loc(t),
                    }
                  : {
                      kind: r.h.FRAGMENT_DEFINITION,
                      name: this.parseFragmentName(),
                      typeCondition:
                        (this.expectKeyword("on"), this.parseNamedType()),
                      directives: this.parseDirectives(!1),
                      selectionSet: this.parseSelectionSet(),
                      loc: this.loc(t),
                    }
              );
            }),
            (t.parseFragmentName = function () {
              if ("on" === this._lexer.token.value) throw this.unexpected();
              return this.parseName();
            }),
            (t.parseValueLiteral = function (e) {
              var t = this._lexer.token;
              switch (t.kind) {
                case a.T.BRACKET_L:
                  return this.parseList(e);
                case a.T.BRACE_L:
                  return this.parseObject(e);
                case a.T.INT:
                  return (
                    this._lexer.advance(),
                    { kind: r.h.INT, value: t.value, loc: this.loc(t) }
                  );
                case a.T.FLOAT:
                  return (
                    this._lexer.advance(),
                    { kind: r.h.FLOAT, value: t.value, loc: this.loc(t) }
                  );
                case a.T.STRING:
                case a.T.BLOCK_STRING:
                  return this.parseStringLiteral();
                case a.T.NAME:
                  switch ((this._lexer.advance(), t.value)) {
                    case "true":
                      return { kind: r.h.BOOLEAN, value: !0, loc: this.loc(t) };
                    case "false":
                      return { kind: r.h.BOOLEAN, value: !1, loc: this.loc(t) };
                    case "null":
                      return { kind: r.h.NULL, loc: this.loc(t) };
                    default:
                      return {
                        kind: r.h.ENUM,
                        value: t.value,
                        loc: this.loc(t),
                      };
                  }
                case a.T.DOLLAR:
                  if (!e) return this.parseVariable();
              }
              throw this.unexpected();
            }),
            (t.parseStringLiteral = function () {
              var e = this._lexer.token;
              return (
                this._lexer.advance(),
                {
                  kind: r.h.STRING,
                  value: e.value,
                  block: e.kind === a.T.BLOCK_STRING,
                  loc: this.loc(e),
                }
              );
            }),
            (t.parseList = function (e) {
              var t = this,
                n = this._lexer.token;
              return {
                kind: r.h.LIST,
                values: this.any(
                  a.T.BRACKET_L,
                  function () {
                    return t.parseValueLiteral(e);
                  },
                  a.T.BRACKET_R
                ),
                loc: this.loc(n),
              };
            }),
            (t.parseObject = function (e) {
              var t = this,
                n = this._lexer.token;
              return {
                kind: r.h.OBJECT,
                fields: this.any(
                  a.T.BRACE_L,
                  function () {
                    return t.parseObjectField(e);
                  },
                  a.T.BRACE_R
                ),
                loc: this.loc(n),
              };
            }),
            (t.parseObjectField = function (e) {
              var t = this._lexer.token,
                n = this.parseName();
              return (
                this.expectToken(a.T.COLON),
                {
                  kind: r.h.OBJECT_FIELD,
                  name: n,
                  value: this.parseValueLiteral(e),
                  loc: this.loc(t),
                }
              );
            }),
            (t.parseDirectives = function (e) {
              for (var t = []; this.peek(a.T.AT); )
                t.push(this.parseDirective(e));
              return t;
            }),
            (t.parseDirective = function (e) {
              var t = this._lexer.token;
              return (
                this.expectToken(a.T.AT),
                {
                  kind: r.h.DIRECTIVE,
                  name: this.parseName(),
                  arguments: this.parseArguments(e),
                  loc: this.loc(t),
                }
              );
            }),
            (t.parseTypeReference = function () {
              var e,
                t = this._lexer.token;
              return (
                this.expectOptionalToken(a.T.BRACKET_L)
                  ? ((e = this.parseTypeReference()),
                    this.expectToken(a.T.BRACKET_R),
                    (e = { kind: r.h.LIST_TYPE, type: e, loc: this.loc(t) }))
                  : (e = this.parseNamedType()),
                this.expectOptionalToken(a.T.BANG)
                  ? { kind: r.h.NON_NULL_TYPE, type: e, loc: this.loc(t) }
                  : e
              );
            }),
            (t.parseNamedType = function () {
              var e = this._lexer.token;
              return {
                kind: r.h.NAMED_TYPE,
                name: this.parseName(),
                loc: this.loc(e),
              };
            }),
            (t.parseTypeSystemDefinition = function () {
              var e = this.peekDescription()
                ? this._lexer.lookahead()
                : this._lexer.token;
              if (e.kind === a.T.NAME)
                switch (e.value) {
                  case "schema":
                    return this.parseSchemaDefinition();
                  case "scalar":
                    return this.parseScalarTypeDefinition();
                  case "type":
                    return this.parseObjectTypeDefinition();
                  case "interface":
                    return this.parseInterfaceTypeDefinition();
                  case "union":
                    return this.parseUnionTypeDefinition();
                  case "enum":
                    return this.parseEnumTypeDefinition();
                  case "input":
                    return this.parseInputObjectTypeDefinition();
                  case "directive":
                    return this.parseDirectiveDefinition();
                }
              throw this.unexpected(e);
            }),
            (t.peekDescription = function () {
              return this.peek(a.T.STRING) || this.peek(a.T.BLOCK_STRING);
            }),
            (t.parseDescription = function () {
              if (this.peekDescription()) return this.parseStringLiteral();
            }),
            (t.parseSchemaDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("schema");
              var n = this.parseDirectives(!0),
                i = this.many(
                  a.T.BRACE_L,
                  this.parseOperationTypeDefinition,
                  a.T.BRACE_R
                );
              return {
                kind: r.h.SCHEMA_DEFINITION,
                description: t,
                directives: n,
                operationTypes: i,
                loc: this.loc(e),
              };
            }),
            (t.parseOperationTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseOperationType();
              this.expectToken(a.T.COLON);
              var n = this.parseNamedType();
              return {
                kind: r.h.OPERATION_TYPE_DEFINITION,
                operation: t,
                type: n,
                loc: this.loc(e),
              };
            }),
            (t.parseScalarTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("scalar");
              var n = this.parseName(),
                i = this.parseDirectives(!0);
              return {
                kind: r.h.SCALAR_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: i,
                loc: this.loc(e),
              };
            }),
            (t.parseObjectTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("type");
              var n = this.parseName(),
                i = this.parseImplementsInterfaces(),
                s = this.parseDirectives(!0),
                a = this.parseFieldsDefinition();
              return {
                kind: r.h.OBJECT_TYPE_DEFINITION,
                description: t,
                name: n,
                interfaces: i,
                directives: s,
                fields: a,
                loc: this.loc(e),
              };
            }),
            (t.parseImplementsInterfaces = function () {
              var e;
              if (!this.expectOptionalKeyword("implements")) return [];
              if (
                !0 ===
                (null === (e = this._options) || void 0 === e
                  ? void 0
                  : e.allowLegacySDLImplementsInterfaces)
              ) {
                var t = [];
                this.expectOptionalToken(a.T.AMP);
                do {
                  t.push(this.parseNamedType());
                } while (
                  this.expectOptionalToken(a.T.AMP) ||
                  this.peek(a.T.NAME)
                );
                return t;
              }
              return this.delimitedMany(a.T.AMP, this.parseNamedType);
            }),
            (t.parseFieldsDefinition = function () {
              var e;
              return !0 ===
                (null === (e = this._options) || void 0 === e
                  ? void 0
                  : e.allowLegacySDLEmptyFields) &&
                this.peek(a.T.BRACE_L) &&
                this._lexer.lookahead().kind === a.T.BRACE_R
                ? (this._lexer.advance(), this._lexer.advance(), [])
                : this.optionalMany(
                    a.T.BRACE_L,
                    this.parseFieldDefinition,
                    a.T.BRACE_R
                  );
            }),
            (t.parseFieldDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription(),
                n = this.parseName(),
                i = this.parseArgumentDefs();
              this.expectToken(a.T.COLON);
              var s = this.parseTypeReference(),
                o = this.parseDirectives(!0);
              return {
                kind: r.h.FIELD_DEFINITION,
                description: t,
                name: n,
                arguments: i,
                type: s,
                directives: o,
                loc: this.loc(e),
              };
            }),
            (t.parseArgumentDefs = function () {
              return this.optionalMany(
                a.T.PAREN_L,
                this.parseInputValueDef,
                a.T.PAREN_R
              );
            }),
            (t.parseInputValueDef = function () {
              var e = this._lexer.token,
                t = this.parseDescription(),
                n = this.parseName();
              this.expectToken(a.T.COLON);
              var i,
                s = this.parseTypeReference();
              this.expectOptionalToken(a.T.EQUALS) &&
                (i = this.parseValueLiteral(!0));
              var o = this.parseDirectives(!0);
              return {
                kind: r.h.INPUT_VALUE_DEFINITION,
                description: t,
                name: n,
                type: s,
                defaultValue: i,
                directives: o,
                loc: this.loc(e),
              };
            }),
            (t.parseInterfaceTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("interface");
              var n = this.parseName(),
                i = this.parseImplementsInterfaces(),
                s = this.parseDirectives(!0),
                a = this.parseFieldsDefinition();
              return {
                kind: r.h.INTERFACE_TYPE_DEFINITION,
                description: t,
                name: n,
                interfaces: i,
                directives: s,
                fields: a,
                loc: this.loc(e),
              };
            }),
            (t.parseUnionTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("union");
              var n = this.parseName(),
                i = this.parseDirectives(!0),
                s = this.parseUnionMemberTypes();
              return {
                kind: r.h.UNION_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: i,
                types: s,
                loc: this.loc(e),
              };
            }),
            (t.parseUnionMemberTypes = function () {
              return this.expectOptionalToken(a.T.EQUALS)
                ? this.delimitedMany(a.T.PIPE, this.parseNamedType)
                : [];
            }),
            (t.parseEnumTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("enum");
              var n = this.parseName(),
                i = this.parseDirectives(!0),
                s = this.parseEnumValuesDefinition();
              return {
                kind: r.h.ENUM_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: i,
                values: s,
                loc: this.loc(e),
              };
            }),
            (t.parseEnumValuesDefinition = function () {
              return this.optionalMany(
                a.T.BRACE_L,
                this.parseEnumValueDefinition,
                a.T.BRACE_R
              );
            }),
            (t.parseEnumValueDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription(),
                n = this.parseName(),
                i = this.parseDirectives(!0);
              return {
                kind: r.h.ENUM_VALUE_DEFINITION,
                description: t,
                name: n,
                directives: i,
                loc: this.loc(e),
              };
            }),
            (t.parseInputObjectTypeDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("input");
              var n = this.parseName(),
                i = this.parseDirectives(!0),
                s = this.parseInputFieldsDefinition();
              return {
                kind: r.h.INPUT_OBJECT_TYPE_DEFINITION,
                description: t,
                name: n,
                directives: i,
                fields: s,
                loc: this.loc(e),
              };
            }),
            (t.parseInputFieldsDefinition = function () {
              return this.optionalMany(
                a.T.BRACE_L,
                this.parseInputValueDef,
                a.T.BRACE_R
              );
            }),
            (t.parseTypeSystemExtension = function () {
              var e = this._lexer.lookahead();
              if (e.kind === a.T.NAME)
                switch (e.value) {
                  case "schema":
                    return this.parseSchemaExtension();
                  case "scalar":
                    return this.parseScalarTypeExtension();
                  case "type":
                    return this.parseObjectTypeExtension();
                  case "interface":
                    return this.parseInterfaceTypeExtension();
                  case "union":
                    return this.parseUnionTypeExtension();
                  case "enum":
                    return this.parseEnumTypeExtension();
                  case "input":
                    return this.parseInputObjectTypeExtension();
                }
              throw this.unexpected(e);
            }),
            (t.parseSchemaExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("schema");
              var t = this.parseDirectives(!0),
                n = this.optionalMany(
                  a.T.BRACE_L,
                  this.parseOperationTypeDefinition,
                  a.T.BRACE_R
                );
              if (0 === t.length && 0 === n.length) throw this.unexpected();
              return {
                kind: r.h.SCHEMA_EXTENSION,
                directives: t,
                operationTypes: n,
                loc: this.loc(e),
              };
            }),
            (t.parseScalarTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("scalar");
              var t = this.parseName(),
                n = this.parseDirectives(!0);
              if (0 === n.length) throw this.unexpected();
              return {
                kind: r.h.SCALAR_TYPE_EXTENSION,
                name: t,
                directives: n,
                loc: this.loc(e),
              };
            }),
            (t.parseObjectTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("type");
              var t = this.parseName(),
                n = this.parseImplementsInterfaces(),
                i = this.parseDirectives(!0),
                s = this.parseFieldsDefinition();
              if (0 === n.length && 0 === i.length && 0 === s.length)
                throw this.unexpected();
              return {
                kind: r.h.OBJECT_TYPE_EXTENSION,
                name: t,
                interfaces: n,
                directives: i,
                fields: s,
                loc: this.loc(e),
              };
            }),
            (t.parseInterfaceTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("interface");
              var t = this.parseName(),
                n = this.parseImplementsInterfaces(),
                i = this.parseDirectives(!0),
                s = this.parseFieldsDefinition();
              if (0 === n.length && 0 === i.length && 0 === s.length)
                throw this.unexpected();
              return {
                kind: r.h.INTERFACE_TYPE_EXTENSION,
                name: t,
                interfaces: n,
                directives: i,
                fields: s,
                loc: this.loc(e),
              };
            }),
            (t.parseUnionTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("union");
              var t = this.parseName(),
                n = this.parseDirectives(!0),
                i = this.parseUnionMemberTypes();
              if (0 === n.length && 0 === i.length) throw this.unexpected();
              return {
                kind: r.h.UNION_TYPE_EXTENSION,
                name: t,
                directives: n,
                types: i,
                loc: this.loc(e),
              };
            }),
            (t.parseEnumTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("enum");
              var t = this.parseName(),
                n = this.parseDirectives(!0),
                i = this.parseEnumValuesDefinition();
              if (0 === n.length && 0 === i.length) throw this.unexpected();
              return {
                kind: r.h.ENUM_TYPE_EXTENSION,
                name: t,
                directives: n,
                values: i,
                loc: this.loc(e),
              };
            }),
            (t.parseInputObjectTypeExtension = function () {
              var e = this._lexer.token;
              this.expectKeyword("extend"), this.expectKeyword("input");
              var t = this.parseName(),
                n = this.parseDirectives(!0),
                i = this.parseInputFieldsDefinition();
              if (0 === n.length && 0 === i.length) throw this.unexpected();
              return {
                kind: r.h.INPUT_OBJECT_TYPE_EXTENSION,
                name: t,
                directives: n,
                fields: i,
                loc: this.loc(e),
              };
            }),
            (t.parseDirectiveDefinition = function () {
              var e = this._lexer.token,
                t = this.parseDescription();
              this.expectKeyword("directive"), this.expectToken(a.T.AT);
              var n = this.parseName(),
                i = this.parseArgumentDefs(),
                s = this.expectOptionalKeyword("repeatable");
              this.expectKeyword("on");
              var o = this.parseDirectiveLocations();
              return {
                kind: r.h.DIRECTIVE_DEFINITION,
                description: t,
                name: n,
                arguments: i,
                repeatable: s,
                locations: o,
                loc: this.loc(e),
              };
            }),
            (t.parseDirectiveLocations = function () {
              return this.delimitedMany(a.T.PIPE, this.parseDirectiveLocation);
            }),
            (t.parseDirectiveLocation = function () {
              var e = this._lexer.token,
                t = this.parseName();
              if (void 0 !== c.B[t.value]) return t;
              throw this.unexpected(e);
            }),
            (t.loc = function (e) {
              var t;
              if (
                !0 !==
                (null === (t = this._options) || void 0 === t
                  ? void 0
                  : t.noLocation)
              )
                return new s.Ye(e, this._lexer.lastToken, this._lexer.source);
            }),
            (t.peek = function (e) {
              return this._lexer.token.kind === e;
            }),
            (t.expectToken = function (e) {
              var t = this._lexer.token;
              if (t.kind === e) return this._lexer.advance(), t;
              throw (0, i.h)(
                this._lexer.source,
                t.start,
                "Expected ".concat(p(e), ", found ").concat(d(t), ".")
              );
            }),
            (t.expectOptionalToken = function (e) {
              var t = this._lexer.token;
              if (t.kind === e) return this._lexer.advance(), t;
            }),
            (t.expectKeyword = function (e) {
              var t = this._lexer.token;
              if (t.kind !== a.T.NAME || t.value !== e)
                throw (0, i.h)(
                  this._lexer.source,
                  t.start,
                  'Expected "'.concat(e, '", found ').concat(d(t), ".")
                );
              this._lexer.advance();
            }),
            (t.expectOptionalKeyword = function (e) {
              var t = this._lexer.token;
              return (
                t.kind === a.T.NAME &&
                t.value === e &&
                (this._lexer.advance(), !0)
              );
            }),
            (t.unexpected = function (e) {
              var t = null != e ? e : this._lexer.token;
              return (0, i.h)(
                this._lexer.source,
                t.start,
                "Unexpected ".concat(d(t), ".")
              );
            }),
            (t.any = function (e, t, n) {
              this.expectToken(e);
              for (var i = []; !this.expectOptionalToken(n); )
                i.push(t.call(this));
              return i;
            }),
            (t.optionalMany = function (e, t, n) {
              if (this.expectOptionalToken(e)) {
                var i = [];
                do {
                  i.push(t.call(this));
                } while (!this.expectOptionalToken(n));
                return i;
              }
              return [];
            }),
            (t.many = function (e, t, n) {
              this.expectToken(e);
              var i = [];
              do {
                i.push(t.call(this));
              } while (!this.expectOptionalToken(n));
              return i;
            }),
            (t.delimitedMany = function (e, t) {
              this.expectOptionalToken(e);
              var n = [];
              do {
                n.push(t.call(this));
              } while (this.expectOptionalToken(e));
              return n;
            }),
            e
          );
        })();
        function d(e) {
          var t = e.value;
          return p(e.kind) + (null != t ? ' "'.concat(t, '"') : "");
        }
        function p(e) {
          return (0, l.u)(e) ? '"'.concat(e, '"') : e;
        }
      },
      6803: (e, t, n) => {
        "use strict";
        n.d(t, { Q: () => r, z: () => s });
        var i = n(1654);
        function r(e) {
          return s(e.source, (0, i.k)(e.source, e.start));
        }
        function s(e, t) {
          var n = e.locationOffset.column - 1,
            i = o(n) + e.body,
            r = t.line - 1,
            s = e.locationOffset.line - 1,
            c = t.line + s,
            l = 1 === t.line ? n : 0,
            h = t.column + l,
            u = "".concat(e.name, ":").concat(c, ":").concat(h, "\n"),
            d = i.split(/\r\n|[\n\r]/g),
            p = d[r];
          if (p.length > 120) {
            for (
              var f = Math.floor(h / 80), m = h % 80, v = [], y = 0;
              y < p.length;
              y += 80
            )
              v.push(p.slice(y, y + 80));
            return (
              u +
              a(
                [["".concat(c), v[0]]].concat(
                  v.slice(1, f + 1).map(function (e) {
                    return ["", e];
                  }),
                  [
                    [" ", o(m - 1) + "^"],
                    ["", v[f + 1]],
                  ]
                )
              )
            );
          }
          return (
            u +
            a([
              ["".concat(c - 1), d[r - 1]],
              ["".concat(c), p],
              ["", o(h - 1) + "^"],
              ["".concat(c + 1), d[r + 1]],
            ])
          );
        }
        function a(e) {
          var t = e.filter(function (e) {
              return e[0], void 0 !== e[1];
            }),
            n = Math.max.apply(
              Math,
              t.map(function (e) {
                return e[0].length;
              })
            );
          return t
            .map(function (e) {
              var t,
                i = e[0],
                r = e[1];
              return o(n - (t = i).length) + t + (r ? " | " + r : " |");
            })
            .join("\n");
        }
        function o(e) {
          return Array(e + 1).join(" ");
        }
      },
      1112: (e, t, n) => {
        "use strict";
        n.d(t, { H: () => c, T: () => l });
        var i = n(824),
          r = n(6589),
          s = n(3767),
          a = n(9495);
        function o(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, i.key, i);
          }
        }
        var c = (function () {
          function e(e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "GraphQL request",
              n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : { line: 1, column: 1 };
            "string" == typeof e ||
              (0, s.Z)(
                0,
                "Body must be a string. Received: ".concat((0, r.Z)(e), ".")
              ),
              (this.body = e),
              (this.name = t),
              (this.locationOffset = n),
              this.locationOffset.line > 0 ||
                (0, s.Z)(
                  0,
                  "line in locationOffset is 1-indexed and must be positive."
                ),
              this.locationOffset.column > 0 ||
                (0, s.Z)(
                  0,
                  "column in locationOffset is 1-indexed and must be positive."
                );
          }
          var t, n;
          return (
            (t = e),
            (n = [
              {
                key: i.YF,
                get: function () {
                  return "Source";
                },
              },
            ]) && o(t.prototype, n),
            e
          );
        })();
        function l(e) {
          return (0, a.Z)(e, c);
        }
      },
      7525: (e, t, n) => {
        "use strict";
        n.d(t, { T: () => i });
        var i = Object.freeze({
          SOF: "<SOF>",
          EOF: "<EOF>",
          BANG: "!",
          DOLLAR: "$",
          AMP: "&",
          PAREN_L: "(",
          PAREN_R: ")",
          SPREAD: "...",
          COLON: ":",
          EQUALS: "=",
          AT: "@",
          BRACKET_L: "[",
          BRACKET_R: "]",
          BRACE_L: "{",
          PIPE: "|",
          BRACE_R: "}",
          NAME: "Name",
          INT: "Int",
          FLOAT: "Float",
          STRING: "String",
          BLOCK_STRING: "BlockString",
          COMMENT: "Comment",
        });
      },
      824: (e, t, n) => {
        "use strict";
        n.d(t, { YF: () => i }),
          "function" == typeof Symbol &&
            null != Symbol.iterator &&
            Symbol.iterator,
          "function" == typeof Symbol &&
            null != Symbol.asyncIterator &&
            Symbol.asyncIterator;
        var i =
          "function" == typeof Symbol && null != Symbol.toStringTag
            ? Symbol.toStringTag
            : "@@toStringTag";
      },
      3379: (e, t, n) => {
        "use strict";
        var i,
          r = (function () {
            var e = {};
            return function (t) {
              if (void 0 === e[t]) {
                var n = document.querySelector(t);
                if (
                  window.HTMLIFrameElement &&
                  n instanceof window.HTMLIFrameElement
                )
                  try {
                    n = n.contentDocument.head;
                  } catch (e) {
                    n = null;
                  }
                e[t] = n;
              }
              return e[t];
            };
          })(),
          s = [];
        function a(e) {
          for (var t = -1, n = 0; n < s.length; n++)
            if (s[n].identifier === e) {
              t = n;
              break;
            }
          return t;
        }
        function o(e, t) {
          for (var n = {}, i = [], r = 0; r < e.length; r++) {
            var o = e[r],
              c = t.base ? o[0] + t.base : o[0],
              l = n[c] || 0,
              h = "".concat(c, " ").concat(l);
            n[c] = l + 1;
            var u = a(h),
              d = { css: o[1], media: o[2], sourceMap: o[3] };
            -1 !== u
              ? (s[u].references++, s[u].updater(d))
              : s.push({ identifier: h, updater: m(d, t), references: 1 }),
              i.push(h);
          }
          return i;
        }
        function c(e) {
          var t = document.createElement("style"),
            i = e.attributes || {};
          if (void 0 === i.nonce) {
            var s = n.nc;
            s && (i.nonce = s);
          }
          if (
            (Object.keys(i).forEach(function (e) {
              t.setAttribute(e, i[e]);
            }),
            "function" == typeof e.insert)
          )
            e.insert(t);
          else {
            var a = r(e.insert || "head");
            if (!a)
              throw new Error(
                "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
              );
            a.appendChild(t);
          }
          return t;
        }
        var l,
          h =
            ((l = []),
            function (e, t) {
              return (l[e] = t), l.filter(Boolean).join("\n");
            });
        function u(e, t, n, i) {
          var r = n
            ? ""
            : i.media
            ? "@media ".concat(i.media, " {").concat(i.css, "}")
            : i.css;
          if (e.styleSheet) e.styleSheet.cssText = h(t, r);
          else {
            var s = document.createTextNode(r),
              a = e.childNodes;
            a[t] && e.removeChild(a[t]),
              a.length ? e.insertBefore(s, a[t]) : e.appendChild(s);
          }
        }
        function d(e, t, n) {
          var i = n.css,
            r = n.media,
            s = n.sourceMap;
          if (
            (r ? e.setAttribute("media", r) : e.removeAttribute("media"),
            s &&
              "undefined" != typeof btoa &&
              (i +=
                "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                  btoa(unescape(encodeURIComponent(JSON.stringify(s)))),
                  " */"
                )),
            e.styleSheet)
          )
            e.styleSheet.cssText = i;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(i));
          }
        }
        var p = null,
          f = 0;
        function m(e, t) {
          var n, i, r;
          if (t.singleton) {
            var s = f++;
            (n = p || (p = c(t))),
              (i = u.bind(null, n, s, !1)),
              (r = u.bind(null, n, s, !0));
          } else
            (n = c(t)),
              (i = d.bind(null, n, t)),
              (r = function () {
                !(function (e) {
                  if (null === e.parentNode) return !1;
                  e.parentNode.removeChild(e);
                })(n);
              });
          return (
            i(e),
            function (t) {
              if (t) {
                if (
                  t.css === e.css &&
                  t.media === e.media &&
                  t.sourceMap === e.sourceMap
                )
                  return;
                i((e = t));
              } else r();
            }
          );
        }
        e.exports = function (e, t) {
          (t = t || {}).singleton ||
            "boolean" == typeof t.singleton ||
            (t.singleton =
              (void 0 === i &&
                (i = Boolean(
                  window && document && document.all && !window.atob
                )),
              i));
          var n = o((e = e || []), t);
          return function (e) {
            if (
              ((e = e || []),
              "[object Array]" === Object.prototype.toString.call(e))
            ) {
              for (var i = 0; i < n.length; i++) {
                var r = a(n[i]);
                s[r].references--;
              }
              for (var c = o(e, t), l = 0; l < n.length; l++) {
                var h = a(n[l]);
                0 === s[h].references && (s[h].updater(), s.splice(h, 1));
              }
              n = c;
            }
          };
        };
      },
      433: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => es });
        var i = n(4943),
          r = n.n(i),
          s = n(8276),
          a = n(8293),
          o = n(5979),
          c = n(3379),
          l = n.n(c),
          h = n(8205);
        l()(h.Z, { insert: "head", singleton: !1 }), h.Z.locals;
        var u,
          d,
          p,
          f,
          m,
          v,
          y = n(6558),
          g = n(9503),
          w = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          P = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          b = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class E {
          constructor(e = []) {
            (this.storages = e),
              u.add(this),
              d.set(this, void 0),
              p.set(this, ""),
              f.set(this, !0),
              m.set(this, void 0),
              (this.isEmptyOnBoot = !0),
              (this.temp = {}),
              P(this, d, (0, a._)(), "f"),
              (this.ready = b(this, d, "f").ready);
          }
          get _storages() {
            return this.storages;
          }
          get activeStorages() {
            return b(this, f, "f") ? this.storages : this.localStorages;
          }
          get localStorages() {
            return this.storages.filter(
              (e) => !0 === e.isLocal || null === e.isLocal
            );
          }
          setStorages(e, t) {
            (this.storages = e),
              P(this, m, t, "f"),
              Promise.all([
                this._get(e, "context"),
                this._get(b(this, m, "f"), "config"),
              ]).then(([e, t]) => {
                P(this, p, e || "", "f"),
                  (this.isEmptyOnBoot = !t),
                  b(this, d, "f").done();
              });
          }
          replaceStorages(e) {
            this.storages = e;
          }
          _get(e, t) {
            const n = (0, a._)();
            return (
              Promise.all(
                e.map((e) => {
                  const n = (0, a._)(a.s);
                  return (
                    e
                      .get(t)
                      .then((e) => {
                        n.done(e);
                      })
                      .catch(n.abort),
                    n.ready.catch((e) => (y.kg.warn(e), null))
                  );
                })
              ).then((e) => {
                n.done(e.find((e) => null != e));
              }),
              n.ready
            );
          }
          _set(e, t, n) {
            return Promise.all(e.map((e) => e.set(t, n)));
          }
          set(e, t, n) {
            return this._set(e, `${t}${b(this, p, "f")}`, n);
          }
          setRaw(e, t, n) {
            return this._set(e, `${t}`, n);
          }
          get(e, t) {
            return this._get(e, `${t}${b(this, p, "f")}`);
          }
          getRaw(e, t) {
            return this._get(e, `${t}`);
          }
          isEmptyContext() {
            return !b(this, p, "f");
          }
          setContext(e) {
            P(this, p, e, "f"),
              this._set(this.localStorages, "context", b(this, p, "f"));
          }
          migrateToContext(e) {
            return w(this, void 0, void 0, function* () {
              P(this, p, "", "f");
              const [t, n, i] = yield Promise.all([
                  this.loadPlayer(),
                  this.loadSecretCode(),
                  this.loadLanguage(),
                ]),
                r = n || (null == t ? void 0 : t.secretCode);
              return (
                P(this, p, e, "f"),
                yield Promise.all([
                  this.savePlayer(t, b(this, f, "f")),
                  this.saveSecretCode(r),
                  this.saveLanguage(i),
                ]),
                P(this, p, "", "f"),
                yield Promise.all([
                  this.savePlayer(null, b(this, f, "f")),
                  this.saveSecretCode(null),
                  this.saveLanguage(null),
                ]),
                [t, r]
              );
            });
          }
          clearContext(e, t) {
            return w(this, void 0, void 0, function* () {
              const n = b(this, p, "f");
              P(this, p, e, "f"),
                yield Promise.all([
                  this.savePlayer(null, t),
                  this.saveSecretCode(null),
                  this.saveLanguage(null),
                ]),
                P(this, p, n, "f");
            });
          }
          extractFromContext(e, t = !1) {
            return w(this, void 0, void 0, function* () {
              const n = b(this, p, "f");
              P(this, p, e, "f");
              const [i, r, s] = yield Promise.all(
                  t
                    ? [
                        this.loadPlayerFromLocalStorage(),
                        this.loadSecretCodeFromLocalStorage(),
                        this.loadLanguage(),
                      ]
                    : [
                        this.loadPlayer(),
                        this.loadSecretCode(),
                        this.loadLanguage(),
                      ]
                ),
                a = r || (null == i ? void 0 : i.secretCode);
              return P(this, p, n, "f"), [i, a, s];
            });
          }
          copyFromContext(e, t, n) {
            return w(this, void 0, void 0, function* () {
              const i = b(this, p, "f"),
                [r, s, a] = yield this.extractFromContext(e);
              P(this, p, t, "f"),
                yield Promise.all([
                  this.savePlayer(r, n),
                  this.saveSecretCode(s),
                  this.saveLanguage(a),
                ]),
                P(this, p, i, "f");
            });
          }
          checkIsMigrated(e) {
            return w(this, void 0, void 0, function* () {
              let t = !1;
              try {
                t = yield this.get(b(this, m, "f"), `migrated:${e}`);
              } catch (e) {}
              return !!t;
            });
          }
          setMigrated(e) {
            return w(this, void 0, void 0, function* () {
              return this.set(b(this, m, "f"), `migrated:${e}`, !0);
            });
          }
          loadPlayer() {
            return this.get(this.activeStorages, "players").then(
              b(this, u, "m", v)
            );
          }
          loadPlayerFromPlatformCloud() {
            const e = this.storages.filter((e) => !e.isLocal);
            return this.get(e, "players").then(([e] = [null]) => e);
          }
          loadPlayerFromLocalStorage() {
            return this.get(this.localStorages, "players").then(
              b(this, u, "m", v)
            );
          }
          savePlayer(e, t) {
            return this.set(t ? this.storages : this.localStorages, "players", [
              e,
            ]).catch(y.kg.warn);
          }
          loadSecretCode() {
            return w(this, void 0, void 0, function* () {
              return this.get(this.activeStorages, "sk").catch(y.kg.warn);
            });
          }
          loadSecretCodeFromLocalStorage() {
            return w(this, void 0, void 0, function* () {
              return this.get(this.localStorages, "sk").catch(y.kg.warn);
            });
          }
          saveSecretCode(e) {
            return this.set(this.activeStorages, "sk", e).catch(y.kg.warn);
          }
          setLocalRaw(e, t) {
            return this.setRaw(this.localStorages, e, t).catch(y.kg.warn);
          }
          getLocalRaw(e) {
            return this.getRaw(this.localStorages, e).catch(y.kg.warn);
          }
          loadLanguage() {
            return this.get(b(this, m, "f"), "lang").catch(
              (e) => (y.kg.warn(e), null)
            );
          }
          saveLanguage(e) {
            return this.set(b(this, m, "f"), "lang", e).catch(y.kg.warn);
          }
          loadConfig() {
            return this._get(b(this, m, "f"), "config")
              .then((e) => Object.assign(Object.assign({}, g.lR), e))
              .catch((e) => (y.kg.warn(e), g.lR));
          }
          saveConfig(e) {
            return this._set(b(this, m, "f"), "config", e).catch(y.kg.warn);
          }
          loadAdsInfo() {
            const e = this._get(b(this, m, "f"), "adsInfo")
              .then((e) => Object.assign(Object.assign({}, g.GH), e))
              .catch((e) => (y.kg.warn(e), g.GH));
            return e.then((e) => (this.temp.adsInfo = e)), e;
          }
          saveAdsInfo(e) {
            return this._set(b(this, m, "f"), "adsInfo", e).catch(y.kg.warn);
          }
          saveIsExistsShortcut(e) {
            this.set(b(this, m, "f"), "isExistsShortcut", e);
          }
          loadIsExistsShortcut() {
            return this.get(b(this, m, "f"), "isExistsShortcut");
          }
          isCrazyGamesAccountLinked(e) {
            var t;
            return w(this, void 0, void 0, function* () {
              return Boolean(
                null !==
                  (t = yield this.getRaw(
                    this.localStorages,
                    `crazyGames.account${e}.linked`
                  )) &&
                  void 0 !== t &&
                  t
              );
            });
          }
          setCrazyGamesAccountLinked(e) {
            return w(this, void 0, void 0, function* () {
              yield this.setRaw(
                this.localStorages,
                `crazyGames.account${e}.linked`,
                !0
              );
            });
          }
          setSaveInPlatformStorage(e) {
            P(this, f, e, "f");
          }
        }
        (d = new WeakMap()),
          (p = new WeakMap()),
          (f = new WeakMap()),
          (m = new WeakMap()),
          (u = new WeakSet()),
          (v = function (e) {
            if (!e) return null;
            const [t] = e;
            return t;
          });
        var T = n(6388),
          S = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        class A extends Error {
          constructor() {
            super("throttled invocation was canceled"),
              (this.name = "CanceledError");
          }
        }
        class _ {
          constructor(e, t) {
            this.canceled = !1;
            const n = new Promise((e) => {
              (this.timeout = setTimeout(e, t)), (this.resolve = e);
            });
            this.ready = e.then(
              () => n,
              () => n
            );
          }
          flush() {
            clearTimeout(this.timeout), this.resolve();
          }
          cancel() {
            (this.canceled = !0), clearTimeout(this.timeout), this.resolve();
          }
          then(e) {
            return this.ready.then(() => {
              if (this.canceled) throw new A();
              return e();
            });
          }
        }
        function I(e, t, n = {}) {
          const i = null != t && Number.isFinite(t) ? Math.max(t, 0) : 0,
            r = n.getNextArgs || ((e, t) => t);
          let s,
            a = Promise.resolve(),
            o = new _(a, 0),
            c = null;
          function l() {
            const t = s;
            (c = null), (s = null);
            const n = (() =>
              S(this, void 0, void 0, function* () {
                return yield e.apply(this, t);
              }))();
            return (o = new _(n, i)), n;
          }
          function h(...e) {
            return (s = s ? r(s, e) : e), c || (c = o.then(l.bind(this))), c;
          }
          return (
            (h.cancel = () =>
              S(this, void 0, void 0, function* () {
                const e = a;
                o.cancel(),
                  (c = null),
                  (s = null),
                  (a = Promise.resolve()),
                  (o = new _(a, 0)),
                  yield e;
              })),
            (h.flush = () =>
              S(this, void 0, void 0, function* () {
                o.flush(), yield a;
              })),
            h
          );
        }
        function C(e) {
          return function (t, n, i) {
            const r = i.value;
            return (i.value = I(r, e)), i;
          };
        }
        I.CanceledError = A;
        const O = (e) => {
          if ("Problem" === (null == e ? void 0 : e.__typename))
            throw e.message;
        };
        new TextEncoder();
        var R = n(6480),
          k = function (e, t, n, i) {
            var r,
              s = arguments.length,
              a =
                s < 3
                  ? t
                  : null === i
                  ? (i = Object.getOwnPropertyDescriptor(t, n))
                  : i;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              a = Reflect.decorate(e, t, n, i);
            else
              for (var o = e.length - 1; o >= 0; o--)
                (r = e[o]) &&
                  (a = (s < 3 ? r(a) : s > 3 ? r(t, n, a) : r(t, n)) || a);
            return s > 3 && a && Object.defineProperty(t, n, a), a;
          },
          D = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        class M extends T.Z {
          constructor(e) {
            super(), (this.gp = e);
          }
          open(e = { orderBy: ["score"] }) {
            return D(this, void 0, void 0, function* () {
              e.orderBy &&
                "string" == typeof e.orderBy &&
                (e.orderBy = [e.orderBy]);
              const t = (
                Array.isArray(e.orderBy) ? e.orderBy : ["score"]
              ).filter((e) => "" !== e);
              e = Object.assign(Object.assign({}, e), { orderBy: t });
              const [n] = yield Promise.all([
                this.fetch(e),
                this.gp.loadOverlay(),
              ]);
              this._events.emit("open"),
                yield this.gp.overlay.openLeaderboard(e, n),
                this._events.emit("close");
            });
          }
          openScoped(e) {
            return D(this, void 0, void 0, function* () {
              const [t] = yield Promise.all([
                  this.fetchScoped(e),
                  this.gp.loadOverlay(),
                ]),
                n = Object.assign({}, e),
                i = t.fields.map((e) => e.key);
              (n.orderBy = e.includeFields
                ? i.filter((t) => !e.includeFields.includes(t))
                : i),
                this._events.emit("open"),
                yield this.gp.overlay.openLeaderboard(n, t),
                this._events.emit("close");
            });
          }
          fetch(e = {}) {
            return D(this, void 0, void 0, function* () {
              const t = (0, a._)();
              this.gp.loader.inc();
              const { showNearest: n, withMe: i, limit: r } = e,
                s = Object.assign(Object.assign({}, e), {
                  showNearest: (0, R.pY)(n),
                  withMe: (0, R.oo)(n, i),
                });
              try {
                const { result: e, playerResult: n } =
                  yield this.gp._services.leaderboardsService.getRating(s);
                O(e),
                  O(n),
                  N(e, n, s.showNearest, s.withMe, (0, R.wQ)(r, e.leaderboard)),
                  t.done(e),
                  this._events.emit("fetch", e);
              } catch (e) {
                t.abort(e), this._events.emit("error:fetch");
              } finally {
                this.gp.loader.dec();
              }
              return t.ready;
            });
          }
          fetchScoped(e) {
            return D(this, void 0, void 0, function* () {
              const t = (0, a._)();
              this.gp.loader.inc();
              const { showNearest: n, withMe: i, limit: r } = e,
                s = Object.assign(Object.assign({}, e), {
                  showNearest: (0, R.pY)(n),
                  withMe: (0, R.oo)(n, i),
                });
              try {
                const e =
                    yield this.gp._services.leaderboardsService.getRatingVariant(
                      s
                    ),
                  { result: n, playerResult: i } = e;
                O(n),
                  O(i),
                  N(n, i, s.showNearest, s.withMe, (0, R.wQ)(r, n.leaderboard)),
                  t.done(n),
                  this._events.emit("fetch", n);
              } catch (e) {
                t.abort(e), this._events.emit("error:fetch");
              } finally {
                this.gp.loader.dec();
              }
              return t.ready;
            });
          }
          fetchPlayerRating(e = {}) {
            return D(this, void 0, void 0, function* () {
              const t = (0, a._)();
              this.gp.loader.inc();
              const { showNearest: n } = e,
                i = Object.assign(Object.assign({}, e), {
                  showNearest: (0, R.pY)(n),
                });
              try {
                const e =
                  yield this.gp._services.leaderboardsService.getPlayerRating(
                    i
                  );
                O(e), t.done(e), this._events.emit("fetchPlayer", e);
              } catch (e) {
                t.abort(e), this._events.emit("error:fetchPlayer", e);
              } finally {
                this.gp.loader.dec();
              }
              return t.ready;
            });
          }
          fetchPlayerRatingScoped(e) {
            return D(this, void 0, void 0, function* () {
              const t = (0, a._)();
              this.gp.loader.inc();
              const { showNearest: n } = e,
                i = Object.assign(Object.assign({}, e), {
                  showNearest: (0, R.pY)(n),
                });
              try {
                const e =
                  yield this.gp._services.leaderboardsService.getPlayerRatingVariant(
                    i
                  );
                O(e), t.done(e), this._events.emit("fetchPlayerScoped", e);
              } catch (e) {
                t.abort(e), this._events.emit("error:fetchPlayerScoped", e);
              } finally {
                this.gp.loader.dec();
              }
              return t.ready;
            });
          }
          publishRecord(e) {
            return D(this, void 0, void 0, function* () {
              const t = (0, a._)();
              this.gp.loader.inc();
              try {
                const n =
                  yield this.gp._services.leaderboardsService.publishRecord(e);
                t.done(n), this._events.emit("publishRecord", n);
              } catch (e) {
                t.abort(e), this._events.emit("error:publishRecord", e);
              } finally {
                this.gp.loader.dec();
              }
              return t.ready;
            });
          }
        }
        function N(e, t, n, i, r) {
          (e.countOfPlayersAbove = (0, R.q3)(
            e.players,
            (null == t ? void 0 : t.abovePlayers) || []
          )),
            (e.topPlayers = [...e.players]),
            (e.countOfTopPlayers = e.topPlayers.length),
            (e.abovePlayers = [
              ...((null == t ? void 0 : t.abovePlayers) || []),
            ]),
            (e.belowPlayers = [
              ...((null == t ? void 0 : t.belowPlayers) || []),
            ]),
            (e.player = (null == t ? void 0 : t.player) || null),
            (e.players = (function (e, t, n, i, r, s, a) {
              if (!i || !t || "none" === t) return e;
              if (e.some((e) => e.id === i.id && e.position === i.position))
                return e.map((e) => (i.id === e.id ? i : e));
              const o = e.length,
                c = i.position - 1;
              if (c > o) {
                const t = e.findIndex((e) => e.id === i.id);
                t >= 0 &&
                  e.forEach((e, n) => {
                    n >= t && (e.position -= 1);
                  });
              }
              if (
                (r && 0 !== r.length && c > n - 1 && (e = [...r, ...e]),
                s && 0 !== s.length && c > n - 1 && (e = [...e, ...s]),
                c < o)
              )
                e.splice(c, 0, i),
                  e.forEach((e, t) => {
                    t <= c || e.position++;
                  }),
                  e.length > o && e.pop();
              else
                switch (t) {
                  case "first":
                    e.unshift(i);
                    break;
                  case "last":
                    e.push(i);
                }
              return (
                (e = Array.from(new Map(e.map((e) => [e.id, e])).values())),
                a && (e = e.sort((e, t) => e.position - t.position)),
                e
              );
            })(
              e.players,
              (0, R.oo)(n, i),
              (0, R.wQ)(r, e.leaderboard),
              null == t ? void 0 : t.player,
              null == t ? void 0 : t.abovePlayers,
              null == t ? void 0 : t.belowPlayers,
              (0, R.pY)(n)
            ));
        }
        k([C(500)], M.prototype, "open", null),
          k([C(500)], M.prototype, "openScoped", null),
          k([C(500)], M.prototype, "fetch", null),
          k([C(500)], M.prototype, "fetchScoped", null),
          k([C(500)], M.prototype, "fetchPlayerRating", null),
          k([C(500)], M.prototype, "fetchPlayerRatingScoped", null),
          k([C(500)], M.prototype, "publishRecord", null);
        var L = n(5942),
          F = n(6045),
          x = n(264);
        const j = [],
          $ = (e) => (
            j.push(e),
            () => {
              j.splice(j.indexOf(e), 1);
            }
          );
        let U = performance.now();
        const G = (e) => {
          const t = e - U;
          (U = e), j.forEach((e) => e(t)), requestAnimationFrame(G);
        };
        requestAnimationFrame(G);
        var B,
          W,
          q,
          V,
          Y,
          z,
          J,
          K,
          Z,
          X,
          H,
          Q,
          ee,
          te,
          ne,
          ie,
          re,
          se,
          ae,
          oe,
          ce,
          le,
          he,
          ue,
          de = n(180),
          pe = n(3357),
          fe = function (e, t, n, i) {
            var r,
              s = arguments.length,
              a =
                s < 3
                  ? t
                  : null === i
                  ? (i = Object.getOwnPropertyDescriptor(t, n))
                  : i;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              a = Reflect.decorate(e, t, n, i);
            else
              for (var o = e.length - 1; o >= 0; o--)
                (r = e[o]) &&
                  (a = (s < 3 ? r(a) : s > 3 ? r(t, n, a) : r(t, n)) || a);
            return s > 3 && a && Object.defineProperty(t, n, a), a;
          },
          me = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          ve = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          ye = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const ge = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
          we = {
            local: de.pQ.Local,
            platform: de.pQ.Platform,
            cloud: de.pQ.Cloud,
          };
        class Pe extends x.Z {
          constructor(e = {}, t, n, i, r, s) {
            super(e, t, i),
              (this.playerAdapter = n),
              (this.coreSDk = i),
              B.add(this),
              (this.isLoggedIn = !1),
              (this.isLoggedInByPlatform = !1),
              (this.hasAnyCredentials = !1),
              (this.secretCode = ""),
              (this.tempSecredCode = ""),
              (this._hasFirstSync = !1),
              (this.isFirstRequest = !1),
              (this.credentials = ""),
              (this.stats = {
                activeDays: 0,
                activeDaysConsecutive: 0,
                playtimeAll: 0,
                playtimeToday: 0,
              }),
              W.set(this, ""),
              q.set(this, void 0),
              V.set(this, ""),
              Y.set(this, !1),
              z.set(this, {}),
              J.set(this, !1),
              (this._platformData = {}),
              K.set(this, void 0),
              Z.set(this, () => {}),
              X.set(this, {}),
              H.set(this, {}),
              Q.set(this, void 0),
              se.set(this, function (e = {}) {
                return me(this, void 0, void 0, function* () {
                  const {
                    silent: t = !0,
                    override: n = !1,
                    storage: i = "preferred",
                  } = e;
                  this.gp.loader.inc();
                  const r = (0, a._)();
                  ye(this, X, "f")[i] = this.gp.serverTime;
                  const s = we[i] || this.gp.platform.config.progressSaveFormat;
                  let o = !1;
                  const {
                    isLocalSave: c,
                    isCloudSave: l,
                    isPlatformSave: h,
                  } = (0, pe.q)(s);
                  yield this.gp._storage
                    .savePlayer(this.toJSON(), !c)
                    .catch(y.kg.warn);
                  try {
                    yield ye(this, B, "m", ie).call(
                      this,
                      t,
                      e._isFromLoginWindow
                    );
                    const i =
                      this.gp.platform.config.alwaysSyncPublicFields &&
                      this.isPublicFieldsDirty;
                    if (
                      i ||
                      (ye(this, q, "f").isDirty() && l) ||
                      l ||
                      this.isFirstRequest
                    ) {
                      const e = this.toJSON();
                      !l &&
                        i &&
                        this.fields.forEach((t) => {
                          t.public || delete e[t.key];
                        });
                      const a = yield this.gp._services.playerService.sync(
                        Object.assign(
                          { override: n, playerState: e },
                          ye(this, q, "f").export()
                        ),
                        { withToken: this.isFirstRequest }
                      );
                      switch (a.__typename) {
                        case "PlayerSyncConflict": {
                          this.gp.loader.dec();
                          const e = a;
                          let n;
                          h
                            ? (n = this.toJSON())
                            : (yield this.gp.loadOverlay(),
                              (o = !0),
                              yield this.playerAdapter.authFinished,
                              (n = yield this.gp.overlay.pickPlayerOnConflict(
                                e
                              ))),
                            this.has("name") &&
                              !n.name &&
                              (n.name = this.get("name")),
                            this.has("avatar") &&
                              !n.avatar &&
                              (n.avatar = this.get("avatar")),
                            this.gp.loader.inc();
                          const i = yield this.gp._services.playerService.sync(
                            Object.assign(
                              { playerState: n, override: !0 },
                              ye(this, q, "f").export()
                            ),
                            { withToken: this.isFirstRequest }
                          );
                          if ("Player" !== i.__typename) return void r.abort();
                          t || ye(this, B, "m", le).call(this, ""),
                            o && this.gp.overlay.close(),
                            yield ye(this, B, "m", oe).call(this, i, s),
                            r.done(),
                            yield ye(this, B, "m", ce).call(this, i.state);
                          break;
                        }
                        case "Player": {
                          const { state: e } = a;
                          t || ye(this, B, "m", le).call(this, ""),
                            yield ye(this, B, "m", oe).call(this, a, s),
                            r.done(),
                            yield ye(this, B, "m", ce).call(this, e),
                            this.playerAdapter.publishRecord(e);
                          break;
                        }
                      }
                    } else if (t)
                      yield this.gp._storage
                        .savePlayer(this.toJSON(), !c)
                        .catch(y.kg.warn);
                    else {
                      const e =
                          yield this.gp._storage.loadPlayerFromPlatformCloud(),
                        t = yield this.gp._services.playerService.getPlayer({
                          withToken: !0,
                        });
                      let n = e;
                      (!e || new x.Z(e, this.fields, this.gp).isStub) &&
                        (n = t.state),
                        (t.state = n),
                        ye(this, B, "m", oe).call(this, t, s),
                        r.done(),
                        yield ye(this, B, "m", ce).call(this, n),
                        this.playerAdapter.publishRecord(n);
                    }
                    r.done();
                  } catch (e) {
                    r.abort(e);
                  } finally {
                    (this._hasFirstSync = !0),
                      (this.isPublicFieldsDirty = !1),
                      (this.isFirstRequest = !1),
                      this.gp.loader.dec();
                  }
                  const u = {
                    options: {
                      silent: t,
                      override: n,
                      storage: i,
                      progressSaveFormat: s,
                    },
                  };
                  return (
                    r.ready
                      .then(() => this._events.emit("sync", !0, u))
                      .catch(() => this._events.emit("sync", !1, u)),
                    r.ready
                  );
                });
              }),
              ae.set(this, function () {
                return me(this, void 0, void 0, function* () {
                  this.gp.loader.inc();
                  try {
                    const e = yield this.gp._services.playerService.getPlayer({
                        withToken: !0,
                      }),
                      t = yield this.gp._storage.loadPlayerFromLocalStorage();
                    if (null == t ? void 0 : t.saveFormat) {
                      const { isCloudSave: n } = (0, pe.q)(t.saveFormat),
                        { isCloudSave: i } = (0, pe.q)(
                          this.gp.platform.config.progressSaveFormat
                        );
                      !n &&
                        i &&
                        (e.state = Object.assign(
                          Object.assign({}, e.state),
                          t
                        ));
                    }
                    yield ye(this, B, "m", oe).call(
                      this,
                      e,
                      this.gp.platform.saveFormat.format
                    ),
                      yield ye(this, B, "m", ce).call(this, e.state),
                      this._events.emit("load", !0);
                  } catch (e) {
                    y.kg.error(e), this._events.emit("load", !1);
                  } finally {
                    this.gp.loader.dec(), (this.isFirstRequest = !1);
                  }
                });
              }),
              (this.gp = this.coreSDk),
              ve(this, Q, (0, a._)(), "f"),
              (this.ready = ye(this, Q, "f").ready),
              ve(this, K, s, "f"),
              ve(this, q, r, "f"),
              ve(
                this,
                V,
                `,${this.coreSDk.platform.type}${
                  ye(this, B, "a", ee) ? `:${this.gp.platform.tag}` : ""
                },${this.coreSDk.isDev ? "d" : "p"},`,
                "f"
              ),
              r.on("syncPlayer", () => {
                this.ready.then(() =>
                  this.sync().finally(() => r.commitSyncPlayer())
                );
              }),
              this._events.on("login", (e) =>
                me(this, void 0, void 0, function* () {
                  e && (yield ye(this, q, "f").syncPurchases());
                })
              );
          }
          get avatar() {
            return this.get("avatar") || this.gp.generateAvatar(this.id, 64);
          }
          set avatar(e) {
            this.set("avatar", e);
          }
          get _isRequredDataUpdate() {
            return !this.get("name") || this._isRequredAvatarUpdate;
          }
          get _isRequredAvatarUpdate() {
            const e = this.get("avatar");
            return (
              !e ||
              (!this._hasFirstSync && this.playerAdapter.isPlatformAvatar(e))
            );
          }
          get _authInfo() {
            return Object.assign(Object.assign({}, this._platformData), {
              secretCode: this.secretCode || ye(this, W, "f"),
            });
          }
          get(e) {
            return "secretCode" === e
              ? this.secretCode || ye(this, W, "f")
              : "credentials" === e
              ? this.credentials || this.playerAdapter.userId
              : super.get(e);
          }
          loadProgress(e, t) {
            return me(this, void 0, void 0, function* () {
              const [n] = yield this.gp._storage.extractFromContext(t);
              let i = !n;
              if ((n && (this.fromJSON(n), this.isStub && (i = !0)), i)) {
                const n = yield Promise.all(
                    e.map((e) => this.gp._storage.extractFromContext(e))
                  ),
                  i =
                    null == n
                      ? void 0
                      : n.find(
                          ([e]) => e && !new x.Z(e, this.fields, this.gp).isStub
                        ),
                  [r] = i || [];
                r &&
                  (delete r.platformType,
                  delete r.secretCode,
                  delete r.credentials,
                  (r.id = this.id),
                  this.fromJSON(r),
                  this.gp._storage.setContext(t),
                  ve(this, J, !0, "f"),
                  yield ye(this, se, "f").call(this),
                  this.gp._storage.setMigrated(t));
              }
            });
          }
          _init(e) {
            return me(this, void 0, void 0, function* () {
              this.gp.ready.then(() => {
                (this.id
                  ? ye(this, ae, "f").call(this)
                  : ye(this, se, "f").call(this)
                ).finally(() =>
                  me(this, void 0, void 0, function* () {
                    this.isLoggedInByPlatform &&
                      (yield ye(this, q, "f").syncPurchases()),
                      e.done(),
                      this._events.emit("ready");
                  })
                );
              });
            });
          }
          fetchFields() {
            return me(this, void 0, void 0, function* () {
              try {
                (this.fields =
                  (yield this.gp._services.playerService.fetchFields()).items),
                  this._events.emit("fetchFields", !0);
              } catch (e) {
                this._events.emit("fetchFields", !1);
              }
            });
          }
          sync(e = {}) {
            return me(this, void 0, void 0, function* () {
              return ye(this, se, "f").call(this, e);
            });
          }
          enableAutoSync(
            { interval: e, override: t = !1, storage: n = "preferred" } = {
              interval: 0,
            }
          ) {
            if (ye(this, H, "f")[n])
              return void y.kg.error(
                `AutoSync for ${n} storage already enabled. Call disableAutoSync() before re-enabling.`
              );
            if (!e) return void y.kg.error("Interval is not defined");
            let i = 0;
            ye(this, H, "f")[n] = $(() =>
              me(this, void 0, void 0, function* () {
                (new Date(this.gp.serverTime).getTime() -
                  (ye(this, X, "f")[n]
                    ? new Date(ye(this, X, "f")[n]).getTime()
                    : 0)) /
                  1e3 >=
                  e &&
                  this.updateTime > i &&
                  ((i = Date.now()),
                  yield ye(this, se, "f").call(this, {
                    override: t,
                    storage: n,
                  }));
              })
            );
          }
          disableAutoSync({ storage: e = "preferred" } = {}) {
            ye(this, H, "f")[e]
              ? (ye(this, H, "f")[e](), delete ye(this, H, "f")[e])
              : y.kg.error(
                  `AutoSync for ${e} storage disable attempt: not active`
                );
          }
          load() {
            return me(this, void 0, void 0, function* () {
              return ye(this, ae, "f").call(this);
            });
          }
          login(e = {}) {
            var t;
            return me(this, void 0, void 0, function* () {
              let n = !1;
              if (this.gp.platform._hasAuthModal)
                return (yield this.playerAdapter.loginPlayer(this, {
                  isAuthModal: !0,
                })).id
                  ? (yield ye(this, se, "f")
                      .call(this, { silent: !1 })
                      .then(() => {
                        (n = !0), this._events.emit("login", !0);
                      })
                      .catch((e) => {
                        y.kg.error(e), this._events.emit("login", !1);
                      }),
                    n)
                  : (this._events.emit("login", !1), n);
              if (
                !this.gp.platform.hasIntegratedAuth &&
                !this.gp.platform.isSecretCodeAuthAvailable
              )
                return this._events.emit("login", !1), n;
              try {
                yield this.gp.loadOverlay();
                const { type: i, secretCode: r } = yield this.gp.overlay.login({
                  withSecretCode:
                    this.gp.platform.isSecretCodeAuthAvailable &&
                    (null === (t = e.withSecretCode) || void 0 === t || t),
                });
                switch (i) {
                  case "PLATFORM_AUTH":
                    yield ye(this, se, "f")
                      .call(this, { silent: !1, _isFromLoginWindow: !0 })
                      .then(() => {
                        (n = !0), this._events.emit("login", !0);
                      })
                      .catch((e) => {
                        y.kg.error(e), this._events.emit("login", !1);
                      });
                    break;
                  case "SECRET_KEY_AUTH_LOGIN":
                    ye(this, B, "m", le).call(this, r),
                      yield ye(this, ae, "f")
                        .call(this)
                        .then(() => {
                          (n = !0), this._events.emit("login", !0);
                        })
                        .catch((e) => {
                          y.kg.error(e), this._events.emit("login", !1);
                        });
                }
                this.gp.overlay.close();
              } catch (e) {
                y.kg.error(e), this._events.emit("login", !1);
              }
              return n;
            });
          }
          logout() {
            return me(this, void 0, void 0, function* () {
              if (this.gp.platform.isLogoutAvailable)
                if (this.isLoggedIn)
                  try {
                    const e = yield this.playerAdapter.logoutPlayer();
                    yield this._onLogout(e);
                  } catch (e) {
                    y.kg.error(e), this._events.emit("logout", !1);
                  }
                else this._events.emit("logout", !1);
              else this._events.emit("logout", !1);
            });
          }
          _onLogout(e) {
            return me(this, void 0, void 0, function* () {
              this.resetCredentials(),
                (this.isLoggedIn = !1),
                yield ye(this, B, "m", ne).call(this),
                this._events.emit("logout", e),
                yield ye(this, ae, "f").call(this);
            });
          }
          resetCredentials() {
            ve(this, W, "", "f"),
              (this.credentials = ""),
              ye(this, B, "m", le).call(this, ""),
              (this._hasFirstSync = !1),
              (this.isFirstRequest = !0),
              ve(this, J, !1, "f");
          }
          _setPlayerAdapter(e) {
            this.playerAdapter = e;
          }
          _setupOnBoot() {
            ye(this, B, "m", ne)
              .call(this)
              .finally(() => this._init(ye(this, Q, "f")));
          }
        }
        (W = new WeakMap()),
          (q = new WeakMap()),
          (V = new WeakMap()),
          (Y = new WeakMap()),
          (z = new WeakMap()),
          (J = new WeakMap()),
          (K = new WeakMap()),
          (Z = new WeakMap()),
          (X = new WeakMap()),
          (H = new WeakMap()),
          (Q = new WeakMap()),
          (se = new WeakMap()),
          (ae = new WeakMap()),
          (B = new WeakSet()),
          (ee = function () {
            return (
              this.gp.platform.type === L.z.CUSTOM ||
              this.gp.platform.type === L.z.PARTNER
            );
          }),
          (te = function (e, t) {
            return e
              ? t && (null == t ? void 0 : t.id) === e.id
                ? new Date(e.modifiedAt).getTime() >
                  new Date(null == t ? void 0 : t.modifiedAt).getTime() + 3500
                  ? e
                  : t
                : e
              : t;
          }),
          (ne = function () {
            var e;
            return me(this, void 0, void 0, function* () {
              const { platformData: t, key: n } = yield this.playerAdapter
                .getPlayerContext()
                .catch((e) => (y.kg.error(e), { platformData: null, key: "" }));
              (this._platformData = t || {}),
                ye(this, K, "f").call(this, this._authInfo),
                (this.credentials = String("0" != n && n ? n : ""));
              const i = this._wasReset;
              let r;
              if (
                ((this._wasReset = !1),
                (this.isFirstRequest = !0),
                (r = ye(this, B, "a", ee)
                  ? `,${this.gp.platform.type}:${this.gp.platform.config.tag},${
                      this.gp.isDev ? "d" : "p"
                    },${this.credentials}`
                  : `,${this.gp.platform.type},${this.gp.isDev ? "d" : "p"},${
                      this.credentials
                    }`),
                null == t ? void 0 : t.savedState)
              ) {
                y.kg.info("found saved state...");
                const e = `,${this.gp.platform.type},${
                    this.gp.isDev ? "d" : "p"
                  },null`,
                  [t] = yield this.gp._storage.extractFromContext(e);
                t &&
                  (this.fromJSON(t),
                  yield ye(this, se, "f").call(this),
                  yield this.gp._storage.copyFromContext(
                    r,
                    e,
                    this.gp.platform.saveFormat.isPlatformSave
                  ));
              }
              const s = [
                  L.z.POKI,
                  L.z.VK_PLAY,
                  L.z.CRAZY_GAMES,
                  L.z.WG_PLAYGROUND,
                  L.z.BEELINE,
                  L.z.KONGREGATE,
                  L.z.GOOGLE_PLAY,
                  L.z.ANDROID,
                  L.z.APP_GALLERY,
                  L.z.GALAXY_STORE,
                  L.z.ONE_STORE,
                  L.z.AMAZON_APPSTORE,
                  L.z.XIAOMI_GETAPPS,
                  L.z.APTOIDE,
                  L.z.RUSTORE,
                  L.z.PLAYDECK,
                  L.z.TELEGRAM,
                  L.z.CUSTOM,
                  L.z.Y8,
                  L.z.PARTNER,
                  L.z.ARKADIUM,
                  L.z.PLAYGAMA,
                ].includes(this.gp.platform.type),
                a = [
                  L.z.APP_GALLERY,
                  L.z.GALAXY_STORE,
                  L.z.ONE_STORE,
                  L.z.AMAZON_APPSTORE,
                  L.z.XIAOMI_GETAPPS,
                  L.z.APTOIDE,
                  L.z.RUSTORE,
                  L.z.ANDROID,
                ].includes(this.gp.platform.type),
                o = yield this.gp._storage.checkIsMigrated(r),
                c = [];
              if (
                (a &&
                  !o &&
                  c.push(`,GOOGLE_PLAY,${this.gp.isDev ? "d" : "p"},`),
                s && !o && c.push(`,NONE,${this.gp.isDev ? "d" : "p"},`),
                c.length > 0 && (yield this.loadProgress(c, r)),
                !this.gp._storage.isEmptyOnBoot &&
                  this.gp._storage.isEmptyContext() &&
                  this.isStub)
              ) {
                y.kg.info("Applying migration...");
                const [e, t] = yield this.gp._storage.migrateToContext(r);
                (this.secretCode = t),
                  this.fromJSON(e),
                  ve(this, W, e.secretCode, "f"),
                  ye(this, K, "f").call(this, this._authInfo),
                  yield ye(this, se, "f").call(this);
              }
              ve(this, Y, !!n, "f"), this.gp._storage.setContext(r);
              const [l, h, u] = yield Promise.all([
                this.gp._storage.loadPlayer(),
                this.gp._storage.loadSecretCode(),
                this.gp._storage.loadPlayerFromLocalStorage(),
              ]);
              if (
                this.isStub &&
                !this.credentials &&
                (null == l ? void 0 : l.credentials) &&
                (null === (e = null == l ? void 0 : l.credentials) ||
                void 0 === e
                  ? void 0
                  : e.length) > 0
              ) {
                const [e] = yield this.gp._storage.extractFromContext(
                  `${ye(this, V, "f")}${this.credentials}`
                );
                e ||
                  (yield this.gp._storage.copyFromContext(
                    ye(this, V, "f"),
                    `${ye(this, V, "f")}${this.credentials}`,
                    this.gp.platform.saveFormat.isPlatformSave
                  ),
                  ve(this, J, !0, "f")),
                  yield this.gp._storage.clearContext(
                    ye(this, V, "f"),
                    this.gp.platform.saveFormat.isPlatformSave
                  ),
                  (ye(this, z, "f")[this.credentials] = !0);
              }
              const d = ye(this, B, "m", te).call(this, u, l);
              if (
                (this.fromJSON(d || {}),
                ve(this, W, (null == d ? void 0 : d.secretCode) || "", "f"),
                (this.secretCode = h),
                ye(this, K, "f").call(this, this._authInfo),
                ye(this, Y, "f") && this.isStub && !i)
              ) {
                const [e] = yield this.gp._storage.extractFromContext(
                  ye(this, V, "f")
                );
                e &&
                  (delete e.platformType,
                  delete e.secretCode,
                  delete e.credentials,
                  (e.name = this.name),
                  (e.avatar = this.avatar),
                  (e.id = this.id),
                  this.fromJSON(e),
                  ve(this, J, !0, "f"),
                  yield ye(this, se, "f").call(this));
              }
            });
          }),
          (ie = function (e, t) {
            return me(this, void 0, void 0, function* () {
              let n;
              if (
                (e
                  ? this._isRequredDataUpdate &&
                    (n = this.playerAdapter.getPlayer())
                  : (n = this.playerAdapter.loginPlayer(this, {
                      isAuthModal: t,
                    })),
                n)
              ) {
                const t = yield n.catch((e) => {
                  if (
                    "cancelled" === (null == e ? void 0 : e.message) ||
                    "cancelled" === e
                  )
                    throw e;
                  return { name: "", photoLarge: "" };
                });
                yield ye(this, B, "m", re).call(this, t, e);
              }
            });
          }),
          (re = function (e, t) {
            return me(this, void 0, void 0, function* () {
              var n;
              t || (yield ye(this, B, "m", ne).call(this)),
                e.name && !this.get("name") && (this.name = e.name),
                (this.name =
                  (n = this.name) && ge.test(n) ? n.replace(/@.*/, "") : n),
                e.photoLarge &&
                  this._isRequredAvatarUpdate &&
                  (this.avatar = e.photoLarge);
            });
          }),
          (oe = function (e, t) {
            return me(this, void 0, void 0, function* () {
              this.id,
                ye(this, q, "f").canUpdateServerTime &&
                  ye(this, q, "f").updateServerTime(e.serverTime),
                (this._firstReqHash = e.firstReqHash),
                (this.stats = e.stats),
                ye(this, B, "m", he).call(this, e.token),
                this.playerAdapter.setCredentials(e.state.credentials);
              const n =
                  Date.parse(e.state.modifiedAt) - Date.parse(this.modifiedAt) >
                  3500,
                i = this.secretCode || ye(this, W, "f"),
                { isCloudSave: r, isLocalSave: s } = (0, pe.q)(t);
              if (
                (this.credentials &&
                  this.credentials !== e.state.credentials) ||
                0 === this.id ||
                (i && i != e.state.secretCode) ||
                r
              ) {
                if (
                  (this.fromJSON(e.state),
                  this.gp.platform.config.alwaysSyncPublicFields &&
                    !r &&
                    !this.isFirstRequest)
                ) {
                  const e = this.fields.filter((e) => !e.public),
                    t = yield this.gp._storage.loadPlayer();
                  e.forEach((e) => {
                    this.set(e.key, t[e.key]);
                  });
                }
              } else
                this.gp.platform.config.alwaysSyncPublicFields
                  ? this.fields
                      .filter((e) => e.public)
                      .forEach((t) => {
                        this.set(t.key, e.state[t.key]);
                      })
                  : n && this.fromJSON(e.state);
              (yield ye(this, B, "m", ue).call(
                this,
                this.credentials,
                this.id,
                e.selected
              )) ||
                (yield this.gp._storage.clearContext(
                  ye(this, V, "f"),
                  this.gp.platform.saveFormat.isPlatformSave
                ),
                (ye(this, z, "f")[this.credentials] = !0)),
                ve(this, J, !1, "f"),
                ve(this, W, e.state.secretCode, "f"),
                this._events.emit("sync:before"),
                ye(this, K, "f").call(this, this._authInfo),
                yield this.gp._storage.savePlayer(this.toJSON(), !s);
              const a = Date.parse(e.sessionStart),
                o = a > 0 ? Date.parse(this.gp.serverTime) - a : 0;
              let c = this.stats.playtimeAll + o / 1e3,
                l = this.stats.playtimeToday + o / 1e3;
              ye(this, Z, "f").call(this),
                ve(
                  this,
                  Z,
                  $((e) => {
                    (c += e / 1e3),
                      (l += e / 1e3),
                      c - this.stats.playtimeAll >= 1 &&
                        this._syncIncrementVariable(),
                      (this.stats.playtimeAll = Math.floor(c)),
                      (this.stats.playtimeToday = Math.floor(l));
                  }),
                  "f"
                ),
                ye(this, q, "f").reset(),
                ye(this, q, "f").markTriggersActivated(
                  e.rewardsData.activatedTriggersNow
                ),
                ye(this, q, "f").markTriggersClaimed(
                  e.rewardsData.claimedTriggersNow
                ),
                ye(this, q, "f").markRewardsGiven(e.rewardsData.givenRewards),
                ye(this, q, "f").markAchievementsUnlocked(
                  e.rewardsData.givenAchievements
                ),
                ye(this, q, "f").markPurchasesGiven(
                  e.rewardsData.givenProducts
                ),
                ye(this, q, "f").markSchedulersDaysClaimed(
                  e.rewardsData.claimedSchedulersDaysNow
                ),
                ye(this, q, "f").setPlayerSegments(
                  e.segments,
                  e.newSegments,
                  e.leftSegments
                ),
                ye(this, q, "f").setAchievementsList(e.achievementsList),
                ye(this, q, "f").setPurchasedList(e.purchasesListV2),
                ye(this, q, "f").setRewardsList(e.rewards),
                ye(this, q, "f").setTriggersList(e.triggers),
                ye(this, q, "f").setPlayerSchedulersList(e.playerSchedulers),
                ye(this, q, "f").setPlayerEventsList(e.playerEvents),
                ye(this, q, "f").setExperiments(e.experiments),
                ye(this, q, "f").setUniques(e.uniques);
            });
          }),
          (ce = function (e) {
            return me(this, void 0, void 0, function* () {
              this.isStub
                ? ((this.tempSecredCode = e.secretCode),
                  ye(this, B, "m", le).call(this, e.secretCode))
                : this.tempSecredCode &&
                  this.tempSecredCode === e.secretCode &&
                  (ye(this, B, "m", le).call(this, ""),
                  (this.tempSecredCode = "")),
                (this.isLoggedInByPlatform = this.playerAdapter.hasCredetials),
                (this.isLoggedIn = this.isLoggedInByPlatform),
                (this.hasAnyCredentials = this.isLoggedIn || !!this.secretCode),
                this.secretCode &&
                  this.secretCode != e.secretCode &&
                  ye(this, B, "m", le).call(this, e.secretCode),
                this.hasAnyCredentials ||
                  (ye(this, B, "m", le).call(this, e.secretCode),
                  (this.hasAnyCredentials = !0));
            });
          }),
          (le = function (e) {
            (this.secretCode = e),
              this.gp._storage.saveSecretCode(this.secretCode),
              ye(this, K, "f").call(this, this._authInfo);
          }),
          (he = function (e) {
            e && this.gp.channels._connect(e);
          }),
          (ue = function (e, t, n) {
            return me(this, void 0, void 0, function* () {
              if (ye(this, J, "f") && n === F.Sb.Client) return !1;
              if (e && !ye(this, z, "f")[e]) {
                const [e] = yield this.gp._storage.extractFromContext(
                  ye(this, V, "f"),
                  !0
                );
                if (e && e.id === t) return !1;
              }
              return !0;
            });
          }),
          fe([C(300)], Pe.prototype, "fetchFields", null),
          fe([C(300)], Pe.prototype, "sync", null),
          fe([C(300)], Pe.prototype, "load", null);
        class be extends T.Z {
          constructor() {
            super(),
              document.documentElement.addEventListener(
                "fullscreenchange",
                () => {
                  let e = this.isEnabled;
                  this._events.emit("change", e),
                    this._events.emit(e ? "open" : "close");
                }
              );
          }
          get isEnabled() {
            return Boolean(
              document.fullscreenElement || document.webkitFullscreenElement
            );
          }
          open() {
            this.isEnabled ||
              (document.documentElement.requestFullscreen
                ? document.documentElement.requestFullscreen()
                : document.documentElement.webkitRequestFullscreen &&
                  document.documentElement.webkitRequestFullscreen());
          }
          close() {
            this.isEnabled &&
              (document.exitFullscreen
                ? document.exitFullscreen()
                : document.webkitExitFullscreen &&
                  document.webkitExitFullscreen());
          }
          toggle() {
            this.isEnabled ? this.close() : this.open();
          }
        }
        var Ee,
          Te = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          };
        class Se {
          constructor() {
            (this.counters = []),
              (this.visitParams = {}),
              (this._experimentsVisitParams = {}),
              (this._segmentsVisitParams = {}),
              Ee.set(this, 0);
          }
          addCounter(e) {
            return (
              (t = this),
              (n = void 0),
              (r = function* () {
                this.counters.push(e);
              }),
              new ((i = void 0) || (i = Promise))(function (e, s) {
                function a(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(t) {
                  var n;
                  t.done
                    ? e(t.value)
                    : ((n = t.value),
                      n instanceof i
                        ? n
                        : new i(function (e) {
                            e(n);
                          })).then(a, o);
                }
                c((r = r.apply(t, n || [])).next());
              })
            );
            var t, n, i, r;
          }
          replaceCounters(e) {
            this.counters = e;
          }
          hit(e) {
            this.counters.forEach((t) => t.hit(e));
          }
          goal(e, t) {
            this.counters.forEach((n) => n.goal(e, t));
          }
          trackPurchase(e, t) {
            this.pushDataLayerEvent({
              event: "purchase",
              ecommerce: {
                transaction_id: (null == e ? void 0 : e._id) || "",
                items: [
                  {
                    item_id: t.id,
                    item_name: t.name,
                    price: t.price,
                    quantity: 1,
                    discount: 0,
                  },
                ],
              },
            });
          }
          setVisitParams(e) {
            (this.visitParams = e),
              (function (e, t, n, i) {
                if ("a" === n && !i)
                  throw new TypeError(
                    "Private accessor was defined without a getter"
                  );
                if ("function" == typeof t ? e !== t || !i : !t.has(e))
                  throw new TypeError(
                    "Cannot read private member from an object whose class did not declare it"
                  );
                return "m" === n
                  ? i
                  : "a" === n
                  ? i.call(e)
                  : i
                  ? i.value
                  : t.get(e);
              })(this, Ee, "f") ||
                Te(
                  this,
                  Ee,
                  window.setTimeout(() => {
                    Te(this, Ee, 0, "f");
                    const e = Object.assign(
                      Object.assign(
                        Object.assign({}, this._experimentsVisitParams),
                        this._segmentsVisitParams
                      ),
                      this.visitParams
                    );
                    this.counters.forEach((t) => t.setVisitParams(e));
                  }, 100),
                  "f"
                );
          }
          pushDataLayerEvent(e) {
            window.dataLayer &&
              window.dataLayer.push(JSON.parse(JSON.stringify(e)));
          }
        }
        Ee = new WeakMap();
        var Ae = n(9639),
          _e = n.n(Ae),
          Ie = n(8751);
        const Ce = "gs_logs_enabled";
        class Oe {
          constructor(e, t, n) {
            (this.gp = e),
              (this.debugConfig = n),
              (this.isEnabled = !1),
              (this.bindEventsWithName = (e, t, n) => {
                t.forEach((t) => e.on(t, (...e) => n(t, ...e)));
              }),
              (this.gp = e),
              this.init(t);
          }
          init(e) {
            return (
              (t = this),
              (n = void 0),
              (r = function* () {
                try {
                  const t = yield this.debugConfig.getLogs(this.gp.name);
                  if (null === t) {
                    const e = localStorage.getItem(Ce);
                    this.setEnabled("true" === e);
                  } else this.setEnabled("1" === t);
                  (e || this.isEnabled) && this.setupLogsAndPostMessages();
                } catch (e) {
                  console.warn("Failed to initialize LoggerSetup:", e);
                }
              }),
              new ((i = void 0) || (i = Promise))(function (e, s) {
                function a(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(t) {
                  var n;
                  t.done
                    ? e(t.value)
                    : ((n = t.value),
                      n instanceof i
                        ? n
                        : new i(function (e) {
                            e(n);
                          })).then(a, o);
                }
                c((r = r.apply(t, n || [])).next());
              })
            );
            var t, n, i, r;
          }
          setEnabled(e) {
            this.isEnabled = e;
            try {
              localStorage.setItem(Ce, e.toString());
            } catch (e) {
              console.warn("Failed to save logs state to localStorage:", e);
            }
          }
          setupLogsAndPostMessages() {
            const e =
              (e) =>
              (...t) => {
                var n;
                if (
                  (console.info(
                    "%c%s",
                    [
                      "padding: 2px 4px;",
                      `background: ${
                        "ss" === this.gp.name ? "#0048FE" : "#47b929"
                      };`,
                      "color: white;",
                    ].join(""),
                    `âš™ï¸[${_e()().format("HH:mm:ss")}] ${
                      "ss" === this.gp.name ? "SS" : "GP"
                    } > ${e}`,
                    ...t
                  ),
                  window.parent && window.parent !== window)
                )
                  try {
                    const i =
                      "sync" === t[0]
                        ? [...t, { __meta: { isStub: this.gp.player.isStub } }]
                        : t;
                    null === (n = window.parent) ||
                      void 0 === n ||
                      n.postMessage(
                        {
                          type: `${e.toUpperCase()}_${t[0].toUpperCase()}`,
                          payload: {
                            result: t.slice(1)[0],
                            fullPayload: i,
                            timestamp: Date.now(),
                          },
                        },
                        "*"
                      );
                    const r = (e) => {
                      if ("object" == typeof e && null !== e)
                        try {
                          return JSON.stringify(e, null, 2);
                        } catch (t) {
                          return String(e);
                        }
                      return String(e);
                    };
                    window.parent.postMessage(
                      {
                        type: "LOG",
                        payload: {
                          type: Ie.p.INFO,
                          title: `INFO: ${r(t[0])}`,
                          text: t.slice(1).map(r).join(", "),
                        },
                      },
                      "*"
                    );
                  } catch (e) {
                    console.warn("Failed to send postMessage:", e);
                  }
              };
            this.bindEventsWithName(
              this.gp,
              [
                "init",
                "change:language",
                "change:avatarGenerator",
                "change:orientation",
                "overlay:ready",
                "pause",
                "resume",
                "gameStart",
                "gameplayStart",
                "gameplayStop",
              ],
              e("General")
            ),
              this.bindEventsWithName(
                this.gp.player,
                [
                  "change",
                  "sync",
                  "load",
                  "login",
                  "logout",
                  "fetchFields",
                  "ready",
                  "field:minimum",
                  "field:maximum",
                  "field:increment",
                ],
                e("Player")
              ),
              this.bindEventsWithName(
                this.gp.payments,
                [
                  "open",
                  "close",
                  "fetchProducts",
                  "purchase",
                  "consume",
                  "error:fetchProducts",
                  "error:purchase",
                  "error:consume",
                  "subscribe",
                  "unsubscribe",
                  "error:subscribe",
                  "error:unsubscribe",
                ],
                e("Payments")
              ),
              this.bindEventsWithName(
                this.gp.ads,
                [
                  "start",
                  "close",
                  "fullscreen:start",
                  "fullscreen:close",
                  "preloader:start",
                  "preloader:close",
                  "rewarded:reward",
                  "rewarded:start",
                  "rewarded:close",
                  "sticky:start",
                  "sticky:refresh",
                  "sticky:render",
                  "sticky:close",
                ],
                e("Ads")
              ),
              this.bindEventsWithName(
                this.gp.socials,
                ["share", "post", "invite", "joinCommunity"],
                e("Socials")
              ),
              this.bindEventsWithName(
                this.gp.achievements,
                [
                  "open",
                  "close",
                  "fetch",
                  "unlock",
                  "progress",
                  "error:fetch",
                  "error:unlock",
                  "error:progress",
                ],
                e("Achievements")
              ),
              this.bindEventsWithName(
                this.gp.rewards,
                [
                  "fetch",
                  "give",
                  "accept",
                  "error:fetch",
                  "error:give",
                  "error:accept",
                ],
                e("Rewards")
              ),
              this.bindEventsWithName(
                this.gp.triggers,
                ["activate", "claim"],
                e("Triggers")
              ),
              this.bindEventsWithName(
                this.gp.events,
                ["join", "error:join"],
                e("Events")
              ),
              this.bindEventsWithName(
                this.gp.schedulers,
                [
                  "claimDay",
                  "error:claimDay",
                  "claimDayAdditional",
                  "error:claimDayAdditional",
                  "claimAllDay",
                  "error:claimAllDay",
                  "claimAllDays",
                  "error:claimAllDays",
                ],
                e("Schedulers")
              ),
              this.bindEventsWithName(
                this.gp.gamesCollections,
                ["open", "close", "fetch", "error:fetch"],
                e("Games Collections")
              ),
              this.bindEventsWithName(
                this.gp.fullscreen,
                ["open", "close", "change"],
                e("Fullscreen")
              ),
              this.bindEventsWithName(
                this.gp.documents,
                ["open", "close", "fetch", "error:fetch"],
                e("Documents")
              ),
              this.bindEventsWithName(
                this.gp.variables,
                ["change", "fetch", "error:fetch"],
                e("Variables")
              ),
              this.bindEventsWithName(
                this.gp.leaderboard,
                [
                  "open",
                  "close",
                  "fetch",
                  "fetchPlayer",
                  "error:fetch",
                  "error:fetchPlayer",
                  "openScoped",
                  "fetchScoped",
                  "fetchPlayerScoped",
                  "error:fetchScoped",
                  "error:fetchPlayerScoped",
                  "publishRecord",
                  "error:publishRecord",
                ],
                e("Leaderboard")
              ),
              this.bindEventsWithName(
                this.gp.images,
                [
                  "upload",
                  "choose",
                  "fetch",
                  "fetchMore",
                  "error:choose",
                  "error:fetch",
                  "error:fetchMore",
                  "error:upload",
                ],
                e("Images")
              ),
              this.bindEventsWithName(
                this.gp.files,
                [
                  "upload",
                  "choose",
                  "fetch",
                  "fetchMore",
                  "error:choose",
                  "error:fetch",
                  "error:fetchMore",
                  "error:upload",
                ],
                e("Files")
              ),
              this.bindEventsWithName(
                this.gp.app,
                ["addShortcut", "review", "error:review"],
                e("App")
              ),
              this.bindEventsWithName(
                this.gp.segments,
                ["enter", "leave"],
                e("Segments")
              ),
              this.bindEventsWithName(
                this.gp.channels,
                [
                  "event",
                  "fetchInvites",
                  "error:fetchInvites",
                  "sendInvite",
                  "error:sendInvite",
                  "cancelInvite",
                  "error:cancelInvite",
                  "acceptInvite",
                  "error:acceptInvite",
                  "rejectInvite",
                  "error:rejectInvite",
                  "join",
                  "error:join",
                  "leave",
                  "error:leave",
                  "cancelJoin",
                  "error:cancelJoin",
                  "fetchJoinRequests",
                  "error:fetchJoinRequests",
                  "acceptJoinRequest",
                  "error:acceptJoinRequest",
                  "rejectJoinRequest",
                  "error:rejectJoinRequest",
                  "fetchMessages",
                  "error:fetchMessages",
                  "sendMessage",
                  "error:sendMessage",
                  "editMessage",
                  "error:editMessage",
                  "deleteMessage",
                  "error:deleteMessage",
                  "mute",
                  "error:mute",
                  "unmute",
                  "error:unmute",
                  "fetchMembers",
                  "error:fetchMembers",
                  "kick",
                  "error:kick",
                  "fetchChannels",
                  "error:fetchChannels",
                  "createChannel",
                  "error:createChannel",
                  "updateChannel",
                  "error:updateChannel",
                  "deleteChannel",
                  "error:deleteChannel",
                  "openChat",
                  "error:openChat",
                  "closeChat",
                ],
                e("Channels")
              ),
              this.bindEventsWithName(
                this.gp.schedulers,
                [
                  "register",
                  "error:register",
                  "check",
                  "error:check",
                  "delete",
                  "error:delete",
                ],
                e("Uniques")
              ),
              this.bindEventsWithName(
                this.gp.sounds,
                [
                  "mute",
                  "unmute",
                  "mute:music",
                  "unmute:music",
                  "mute:sfx",
                  "unmute:sfx",
                ],
                e("Sounds")
              );
          }
        }
        var Re = n(2447),
          ke = n(2954),
          De = n(3607),
          Me = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        function Ne() {
          var e;
          return Me(this, void 0, void 0, function* () {
            const t = new URL(window.location.href),
              { searchParams: n, hostname: i, hash: r } = t,
              { platformType: s } = (function () {
                const { platformType: e } = window.__GS_BOOT_CONFIG__ || {};
                return { platformType: e };
              })(),
              a = yield (function () {
                return Me(this, void 0, void 0, function* () {
                  const e = (0, De._X)(),
                    { cordova: t } = window;
                  if (t)
                    try {
                      yield (function () {
                        const e = (0, De._X)({ timeout: 5e3 });
                        return (
                          document.addEventListener(
                            "deviceready",
                            () => e.done(),
                            !1
                          ),
                          e.ready
                        );
                      })();
                      const { device: n } = window;
                      "Android" === (null == n ? void 0 : n.platform)
                        ? e.done(!0)
                        : t.exec(
                            () => {
                              e.done(!0);
                            },
                            () => {
                              e.done(!1);
                            },
                            "GooglePlayServicesChecker",
                            "check",
                            []
                          );
                    } catch (t) {
                      console.warn(t), e.done(!1);
                    }
                  else e.done(!1);
                  return e.ready;
                });
              })();
            return (function (e) {
              return (
                !!e.hostname.includes(
                  ["games", "s3", "yandex", "net"].join(".")
                ) ||
                (!!e.hash.includes("origin=https") &&
                  (e.hash.includes("app-id=") || e.searchParams.has("app-id")))
              );
            })(t)
              ? { platformType: L.z.YANDEX }
              : i.includes("gamemonetize.co")
              ? { platformType: L.z.GAME_MONETIZE }
              : i.includes("gamedistribution.co")
              ? { platformType: L.z.GAME_DISTRIBUTION }
              : i.includes("crazygames.com")
              ? { platformType: L.z.CRAZY_GAMES }
              : i.includes(".gamepix.com")
              ? { platformType: L.z.GAMEPIX }
              : i.includes(".wgplayground.com")
              ? { platformType: L.z.WG_PLAYGROUND }
              : i.includes("poki.com") ||
                n.has("pokiDebug") ||
                i.includes("poki-gdn.com")
              ? { platformType: L.z.POKI }
              : (n.has("api_id") && n.has("viewer_id") && n.has("auth_key")) ||
                (n.get("vk_user_id") && n.get("sign") && n.get("vk_app_id"))
              ? { platformType: L.z.VK }
              : n.has("auth_sig") && n.has("session_key")
              ? { platformType: L.z.OK }
              : n.has("gp_beeline_token")
              ? { platformType: L.z.BEELINE }
              : i.includes(".konggames.com") ||
                (n.has("kongregate_game_version") && n.has("kongregate_host"))
              ? { platformType: L.z.KONGREGATE }
              : i.includes("static.developer.sberdevices.ru") ||
                (Array.isArray(window.appInitialData) &&
                  window.appInitialData.some(
                    (e) => "app_context" === (null == e ? void 0 : e.type)
                  ))
              ? { platformType: L.z.SMARTMARKET }
              : (function (e) {
                  const { searchParams: t } = e;
                  if (!(t.get("lang") || "").includes("_")) return !1;
                  if (!t.has("currency")) return !1;
                  if (t.has("uid") && t.has("sign") && t.has("appid"))
                    return !0;
                  const n = t.get("status");
                  return (
                    Number(t.get("appid")) > 0 ||
                    (n.length > 0 && !Number.isNaN(t.get("status")))
                  );
                })(t)
              ? { platformType: L.z.VK_PLAY }
              : s
              ? { platformType: s }
              : a
              ? { platformType: L.z.GOOGLE_PLAY }
              : "true" === n.get("telegram") && "true" === n.get("playdeck")
              ? { platformType: L.z.PLAYDECK }
              : r.includes("tgWebAppData") || r.includes("tgWebAppPlatform")
              ? { platformType: L.z.TELEGRAM }
              : (function (e) {
                  var t, n;
                  const i =
                      null === (t = e.get("_platform")) || void 0 === t
                        ? void 0
                        : t.toUpperCase(),
                    r =
                      null === (n = e.get("_platform-key")) || void 0 === n
                        ? void 0
                        : n.trim();
                  return (
                    i === L.z.PARTNER &&
                    (r.startsWith("gp-") || r.startsWith("ss-"))
                  );
                })(n)
              ? {
                  platformType: L.z.PARTNER,
                  platformKey: n.get("_platform-key") || "",
                }
              : (function (e) {
                  var t, n;
                  const i =
                      null === (t = e.get("_platform")) || void 0 === t
                        ? void 0
                        : t.toUpperCase(),
                    r =
                      null === (n = e.get("_platform-key")) || void 0 === n
                        ? void 0
                        : n.trim();
                  return i === L.z.CUSTOM && !!r;
                })(n)
              ? {
                  platformType: L.z.CUSTOM,
                  platformKey: n.get("_platform-key") || "",
                }
              : n.has("apiId") && n.has("viewerId") && n.has("authKey")
              ? { platformType: L.z.FOTOSTRANA }
              : i.includes(".y8.com")
              ? { platformType: L.z.Y8 }
              : (function (e) {
                  return !!e.hostname.includes(
                    ["coolmathgames", "com"].join(".")
                  );
                })(t)
              ? { platformType: L.z.COOLMATH }
              : (function (e) {
                  return !!e.hostname.includes(["playdia", "com"].join("."));
                })(t)
              ? { platformType: L.z.PLAYDIA }
              : (function () {
                  var e;
                  return (
                    (null === (e = window.__GS_BOOT_CFG__) || void 0 === e
                      ? void 0
                      : e.platformType) === L.z.YOUTUBE
                  );
                })()
              ? { platformType: L.z.YOUTUBE }
              : i.includes(".arkadiumhosted.com")
              ? { platformType: L.z.ARKADIUM }
              : i.includes(".playgama.com") || i.includes("playgama.net")
              ? { platformType: L.z.PLAYGAMA }
              : (null === (e = n.get("_platform")) || void 0 === e
                  ? void 0
                  : e.toUpperCase()) !== L.z.CUSTOM
              ? { platformType: n.get("_platform") }
              : { platformType: L.z.NONE };
          });
        }
        var Le,
          Fe,
          xe,
          je = n(3080),
          $e = n(2231),
          Ue = n(2665),
          Ge = n(4687),
          Be = n(7791),
          We = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          qe = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class Ve {
          constructor(e) {
            (this.queryBuilder = e),
              Le.set(this, {}),
              Fe.set(this, function (e = {}, t) {
                return We(this, void 0, void 0, function* () {
                  const n = (0, a._)();
                  e.limit = e.limit || 10;
                  try {
                    const i = yield t(e),
                      r = i.length === e.limit;
                    (qe(this, Le, "f")[this.queryBuilder(e)] = Object.assign(
                      Object.assign({}, e),
                      { canLoadMore: r }
                    )),
                      n.done({ items: i, canLoadMore: r });
                  } catch (e) {
                    n.abort(e);
                  }
                  return n.ready;
                });
              }),
              xe.set(this, function (e = {}, t) {
                return We(this, void 0, void 0, function* () {
                  const n = this.queryBuilder(e),
                    i = qe(this, Le, "f")[n];
                  if (!i) return yield this.fetch(e, t);
                  if (!i.canLoadMore) return { items: [], canLoadMore: !1 };
                  const r = (0, a._)(),
                    s = (i.offset || 0) + (i.limit || 0);
                  i.limit = e.limit || i.limit;
                  const o = Object.assign({}, qe(this, Le, "f")[n]),
                    c = Object.assign(Object.assign({}, i), { offset: s });
                  qe(this, Le, "f")[n] = c;
                  try {
                    const e = yield t(c),
                      i = e.length === c.limit;
                    (qe(this, Le, "f")[n].canLoadMore = i),
                      r.done({ items: e, canLoadMore: i });
                  } catch (e) {
                    (qe(this, Le, "f")[n] = o), r.abort(e);
                  }
                  return r.ready;
                });
              });
          }
          fetch(e = {}, t) {
            return qe(this, Fe, "f").call(this, e, t);
          }
          fetchMore(e = {}, t) {
            return We(this, void 0, void 0, function* () {
              return qe(this, xe, "f").call(this, e, t);
            });
          }
        }
        (Le = new WeakMap()), (Fe = new WeakMap()), (xe = new WeakMap());
        var Ye,
          ze,
          Je,
          Ke,
          Ze,
          Xe,
          He,
          Qe,
          et,
          tt,
          nt = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          it = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          },
          rt = function (e, t) {
            var n = {};
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) &&
                t.indexOf(i) < 0 &&
                (n[i] = e[i]);
            if (
              null != e &&
              "function" == typeof Object.getOwnPropertySymbols
            ) {
              var r = 0;
              for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                t.indexOf(i[r]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
                  (n[i[r]] = e[i[r]]);
            }
            return n;
          };
        class st extends T.Z {
          constructor(e, t) {
            super(),
              (this.gp = e),
              (this._config = t),
              Ye.set(
                this,
                new Ve((e) =>
                  [
                    "channels",
                    (e.tags || []).join(","),
                    e.search || "",
                    (e.ids || []).join(","),
                    e.onlyJoined || !1,
                    e.onlyOwned || !1,
                  ].join(":")
                )
              ),
              ze.set(this, new Ve((e) => `channelsMembers:${e.channelId}`)),
              Je.set(this, new Ve((e) => `invites:${e.channelId}`)),
              Ke.set(this, new Ve((e) => `channelsInvites:${e.channelId}`)),
              Ze.set(this, new Ve((e) => "sentInvites")),
              Xe.set(
                this,
                new Ve((e) => `channelsJoinRequests:${e.channelId}`)
              ),
              He.set(this, new Ve((e) => "sentJoinRequests")),
              Qe.set(
                this,
                new Ve(
                  (e) =>
                    `channelsJoinRequests:${e.channelId}:${(e.tags || []).join(
                      ","
                    )}`
                )
              ),
              et.set(
                this,
                new Ve(
                  (e) =>
                    `channelsJoinRequests:${e.playerId}:${(e.tags || []).join(
                      ","
                    )}`
                )
              ),
              tt.set(
                this,
                new Ve(
                  (e) =>
                    `channelsJoinRequests:${e.playerId}:${(e.tags || []).join(
                      ","
                    )}`
                )
              );
          }
          get canBeOnline() {
            return this._config.acl.canConnectOnline;
          }
          get isMainChatEnabled() {
            return this._config.project.enableMainChat && this.mainChatId > 0;
          }
          get mainChatId() {
            return this._config.project.mainChatId;
          }
          _handleResponse(e, t) {
            e.then((e) => this._events.emit(t, e)),
              e.catch((e) => {
                y.kg.error(e), this._events.emit(`error:${t}`, e);
              });
          }
          sendInvite(e) {
            const t = this.gp._services.channelsService.invites.sendInvite(e);
            return this._handleResponse(t, "sendInvite"), t;
          }
          cancelInvite(e) {
            const t = this.gp._services.channelsService.invites.cancelInvite(e);
            return this._handleResponse(t, "cancelInvite"), t;
          }
          acceptInvite(e) {
            const t = this.gp._services.channelsService.invites.acceptInvite(e);
            return this._handleResponse(t, "acceptInvite"), t;
          }
          rejectInvite(e) {
            const t = this.gp._services.channelsService.invites.rejectInvite(e);
            return this._handleResponse(t, "rejectInvite"), t;
          }
          join(e) {
            const t = this.gp._services.channelsService.members.join(e);
            return this._handleResponse(t, "join"), t;
          }
          leave(e) {
            const t = this.gp._services.channelsService.members.leave(e);
            return this._handleResponse(t, "leave"), t;
          }
          cancelJoin(e) {
            const t = this.gp._services.channelsService.members.cancelJoin(e);
            return this._handleResponse(t, "cancelJoin"), t;
          }
          acceptJoinRequest(e) {
            const t =
              this.gp._services.channelsService.joinRequests.acceptJoinRequest(
                e
              );
            return this._handleResponse(t, "acceptJoinRequest"), t;
          }
          rejectJoinRequest(e) {
            const t =
              this.gp._services.channelsService.joinRequests.rejectJoinRequest(
                e
              );
            return this._handleResponse(t, "rejectJoinRequest"), t;
          }
          fetchMessages(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Qe, "f").fetch(e, (e) =>
                this.gp._services.channelsService.messages
                  .fetchMessages(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMessages"), t;
            });
          }
          fetchMoreMessages(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Qe, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.messages
                  .fetchMessages(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMoreMessages"), t;
            });
          }
          fetchPersonalMessages(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, et, "f").fetch(e, (e) =>
                this.gp._services.channelsService.messages
                  .fetchPersonalMessages(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchPersonalMessages"), t;
            });
          }
          fetchMorePersonalMessages(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, et, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.messages
                  .fetchPersonalMessages(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMorePersonalMessages"), t;
            });
          }
          fetchFeedMessages(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, tt, "f").fetch(e, (e) =>
                this.gp._services.channelsService.messages
                  .fetchFeedMessages(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchFeedMessages"), t;
            });
          }
          fetchMoreFeedMessages(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, tt, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.messages
                  .fetchFeedMessages(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMoreFeedMessages"), t;
            });
          }
          sendMessage(e) {
            const t = this.gp._services.channelsService.messages.sendMessage(e);
            return this._handleResponse(t, "sendMessage"), t;
          }
          sendFeedMessage(e) {
            const t =
              this.gp._services.channelsService.messages.sendFeedMessage(e);
            return this._handleResponse(t, "sendMessage"), t;
          }
          sendPersonalMessage(e) {
            const t =
              this.gp._services.channelsService.messages.sendPersonalMessage(e);
            return this._handleResponse(t, "sendMessage"), t;
          }
          editMessage(e) {
            const t = this.gp._services.channelsService.messages.editMessage(e);
            return this._handleResponse(t, "editMessage"), t;
          }
          deleteMessage(e) {
            const t =
              this.gp._services.channelsService.messages.deleteMessage(e);
            return this._handleResponse(t, "deleteMessage"), t;
          }
          mute(e) {
            var { seconds: t = 0 } = e;
            const n = rt(e, ["seconds"]);
            if (t > 0) {
              const e = new Date();
              e.setSeconds(e.getSeconds() + t), (n.unmuteAt = e.toISOString());
            }
            const i = this.gp._services.channelsService.members.mute(n);
            return this._handleResponse(i, "mute"), i;
          }
          unmute(e) {
            const t = this.gp._services.channelsService.members.unmute(e);
            return this._handleResponse(t, "unmute"), t;
          }
          fetchMembers(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, ze, "f").fetch(e, (e) =>
                this.gp._services.channelsService.members
                  .fetchMembers(e)
                  .then((e) => e.players)
              );
              return this._handleResponse(t, "fetchMembers"), t;
            });
          }
          fetchMoreMembers(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, ze, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.members
                  .fetchMembers(e)
                  .then((e) => e.players)
              );
              return this._handleResponse(t, "fetchMoreMembers"), t;
            });
          }
          fetchInvites(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Je, "f").fetch(e, (e) =>
                this.gp._services.channelsService.invites
                  .fetchInvites(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchInvites"), t;
            });
          }
          fetchMoreInvites(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Je, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.invites
                  .fetchInvites(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMoreInvites"), t;
            });
          }
          fetchChannelInvites(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Ke, "f").fetch(e, (e) =>
                this.gp._services.channelsService.invites
                  .fetchChannelInvites(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchChannelInvites"), t;
            });
          }
          fetchMoreChannelInvites(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Ke, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.invites
                  .fetchChannelInvites(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMoreChannelInvites"), t;
            });
          }
          fetchSentInvites(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Ze, "f").fetch(e, (e) =>
                this.gp._services.channelsService.invites
                  .fetchSentInvites(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchSentInvites"), t;
            });
          }
          fetchMoreSentInvites(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Ze, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.invites
                  .fetchSentInvites(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMoreSentInvites"), t;
            });
          }
          fetchJoinRequests(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Xe, "f").fetch(e, (e) =>
                this.gp._services.channelsService.joinRequests
                  .fetchJoinRequests(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchJoinRequests"), t;
            });
          }
          fetchMoreJoinRequests(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, Xe, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.joinRequests
                  .fetchJoinRequests(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMoreJoinRequests"), t;
            });
          }
          fetchSentJoinRequests(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, He, "f").fetch(e, (e) =>
                this.gp._services.channelsService.joinRequests
                  .fetchSentJoinRequests(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchSentJoinRequests"), t;
            });
          }
          fetchMoreSentJoinRequests(e) {
            return nt(this, void 0, void 0, function* () {
              const t = it(this, He, "f").fetchMore(e, (e) =>
                this.gp._services.channelsService.joinRequests
                  .fetchSentJoinRequests(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(t, "fetchMoreSentJoinRequests"), t;
            });
          }
          kick(e) {
            const t = this.gp._services.channelsService.members.kick(e);
            return this._handleResponse(t, "kick"), t;
          }
          setValue(e) {
            return nt(this, void 0, void 0, function* () {
              const t =
                this.gp._services.channelsService.state.setChannelStateValue(e);
              this._handleResponse(t, "setValue");
              try {
                return { success: !0, value: (yield t).value };
              } catch (e) {
                return { success: !1, value: null };
              }
            });
          }
          addValue(e) {
            return nt(this, void 0, void 0, function* () {
              const t =
                this.gp._services.channelsService.state.incrementChannelStateValue(
                  e
                );
              this._handleResponse(t, "setValue");
              try {
                return { success: !0, value: (yield t).value };
              } catch (e) {
                return { success: !1, value: null };
              }
            });
          }
          openChat({ id: e, tags: t } = { id: 0, tags: [] }) {
            return nt(this, void 0, void 0, function* () {
              let n = e;
              if (
                (!e &&
                  this._config.project.enableMainChat &&
                  (n = this._config.project.mainChatId),
                n)
              ) {
                this.gp.loader.inc();
                try {
                  const e = this.gp.loadOverlay(),
                    i = yield this.fetchChannel({ channelId: n });
                  if (
                    !(
                      i.ownerId === this.gp.player.id ? i.ownerAcl : i.memberAcl
                    ).canViewMessages
                  )
                    throw (y.kg.error("access_denied"), Error("access_denied"));
                  i.isJoined ||
                    (yield this.join({ channelId: n }),
                    (i.membersCount += 1),
                    (i.membersOnlineCount += 1),
                    (i.isJoined = !0));
                  const [r] = yield Promise.all([
                    this.fetchMessages({ channelId: n, limit: 100, tags: t }),
                    e,
                  ]);
                  this.gp.loader.dec(),
                    this._events.emit("openChat"),
                    yield this.openChatOverlay(i, r, t),
                    this._events.emit("closeChat");
                } catch (e) {
                  this._events.emit("error:openChat", e),
                    this.gp.loader.dec(),
                    y.kg.error(e);
                }
              } else y.kg.error("empty_channel_id");
            });
          }
          openPersonalChat(
            { playerId: e, tags: t } = { playerId: 0, tags: [] }
          ) {
            return nt(this, void 0, void 0, function* () {
              if (e) {
                this.gp.loader.inc();
                try {
                  const n = this.gp.loadOverlay(),
                    i = yield this.fetchPersonalChannel({ playerId: e }),
                    [r] = yield Promise.all([
                      this.fetchPersonalMessages({
                        playerId: e,
                        limit: 100,
                        tags: t,
                      }),
                      n,
                    ]);
                  this.gp.loader.dec(),
                    this._events.emit("openChat"),
                    yield this.openChatOverlay(i, r, t),
                    this._events.emit("closeChat");
                } catch (e) {
                  this._events.emit("error:openChat", e),
                    this.gp.loader.dec(),
                    y.kg.error(e);
                }
              } else y.kg.error("empty_player_id");
            });
          }
          openFeed({ playerId: e, tags: t } = { playerId: 0, tags: [] }) {
            return nt(this, void 0, void 0, function* () {
              if (e) {
                this.gp.loader.inc();
                try {
                  const n = this.gp.loadOverlay(),
                    i = yield this.fetchFeedChannel({ playerId: e }),
                    [r] = yield Promise.all([
                      this.fetchFeedMessages({
                        playerId: e,
                        limit: 100,
                        tags: t,
                      }),
                      n,
                    ]);
                  this.gp.loader.dec(),
                    this._events.emit("openChat"),
                    yield this.openChatOverlay(i, r, t),
                    this._events.emit("closeChat");
                } catch (e) {
                  this._events.emit("error:openFeed", e),
                    this.gp.loader.dec(),
                    y.kg.error(e);
                }
              } else y.kg.error("empty_player_id");
            });
          }
          openChatOverlay(e, t, n) {
            return nt(this, void 0, void 0, function* () {
              const { playerId: i, activeOverlay: r } = this.processTags(
                  e.tags,
                  this.gp.player.id
                ),
                s = i ? parseInt(i, 10) : this.gp.player.id,
                a = {
                  playerId: s,
                  tags: n,
                  channelName: e.name,
                  channelType: r,
                };
              if ("personal" === r || "feed" === r) {
                const e = yield this.gp.players.fetch({ ids: [s] }),
                  [t] = e.players;
                if (!t) throw "player_not_found";
                a.channelName = t.state.name || null;
              }
              yield this.gp.overlay.openChat(e, t, a);
            });
          }
          processTags(e, t) {
            let n = "channel",
              i = "";
            return (
              e.forEach((e) => {
                e.startsWith("@feed:")
                  ? ((n = "feed"),
                    (i = e
                      .split(":")
                      .filter((e) => !isNaN(parseInt(e, 10)))
                      .join("")))
                  : e.startsWith("@personal:") &&
                    ((n = "personal"),
                    (i = e
                      .split(":")
                      .filter((e) => !isNaN(parseInt(e, 10)))
                      .filter((e) => e !== t.toString())
                      .join("")));
              }),
              { playerId: i, activeOverlay: n }
            );
          }
          fetchChannel(e) {
            return nt(this, void 0, void 0, function* () {
              const t =
                this.gp._services.channelsService.channels.fetchChannel(e);
              return this._handleResponse(t, "fetchChannel"), t;
            });
          }
          fetchPersonalChannel(e) {
            return nt(this, void 0, void 0, function* () {
              const t =
                this.gp._services.channelsService.channels.fetchPersonalChannel(
                  e
                );
              return this._handleResponse(t, "fetchPersonalChannel"), t;
            });
          }
          fetchFeedChannel(e) {
            return nt(this, void 0, void 0, function* () {
              const t =
                this.gp._services.channelsService.channels.fetchFeedChannel(e);
              return this._handleResponse(t, "fetchFeedChannel"), t;
            });
          }
          fetchChannels(e) {
            var { ids: t = [] } = e,
              n = rt(e, ["ids"]);
            return nt(this, void 0, void 0, function* () {
              const e = n;
              (t = t.map((e) => Number(String(e).trim())).filter(Boolean))
                .length > 0 && (e.ids = t);
              const i = it(this, Ye, "f").fetch(n, (e) =>
                this.gp._services.channelsService.channels
                  .fetchChannels(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(i, "fetchChannels"), i;
            });
          }
          fetchMoreChannels(e) {
            var { ids: t = [] } = e,
              n = rt(e, ["ids"]);
            return nt(this, void 0, void 0, function* () {
              const e = n;
              (t =
                null == t
                  ? void 0
                  : t.map((e) => Number(String(e).trim())).filter(Boolean))
                .length > 0 && (e.ids = t);
              const i = it(this, Ye, "f").fetchMore(n, (e) =>
                this.gp._services.channelsService.channels
                  .fetchChannels(e)
                  .then((e) => e.items)
              );
              return this._handleResponse(i, "fetchMoreChannels"), i;
            });
          }
          createChannel(e) {
            const t =
              this.gp._services.channelsService.channels.createChannel(e);
            return this._handleResponse(t, "createChannel"), t;
          }
          updateChannel(e) {
            const t =
              this.gp._services.channelsService.channels.updateChannel(e);
            return this._handleResponse(t, "updateChannel"), t;
          }
          deleteChannel(e) {
            const t =
              this.gp._services.channelsService.channels.deleteChannel(e);
            return this._handleResponse(t, "deleteChannel"), t;
          }
          _connect(e) {
            return nt(this, void 0, void 0, function* () {
              const t = () => this.gp._services.channelsService.ping(e);
              if ((window.setInterval(t, 45e3), t(), !this.canBeOnline)) return;
              const n = new TextDecoder(),
                i =
                  yield this.gp._services.channelsService.createCentrifugeClient(
                    e,
                    "wss://ws.eponesh.com/connection/websocket?format=protobuf",
                    "https://ws.eponesh.com/connection/http_stream?format=protobuf",
                    "https://ws.eponesh.com/connection/sse?format=protobuf"
                  );
              i &&
                i
                  .on("connected", (e) => {
                    console.info(`connected over ${e.transport}`);
                  })
                  .on("connecting", function (e) {
                    console.info(`connecting: ${e.code}, ${e.reason}`);
                  })
                  .on("disconnected", function (e) {
                    console.info(`disconnected: ${e.code}, ${e.reason}`);
                  })
                  .on("publication", (e) => {
                    const t = JSON.parse(n.decode(e.data));
                    (null == t ? void 0 : t.type) &&
                      (this._events.emit("event", t),
                      this._events.emit(t.type, t.data));
                  })
                  .connect();
            });
          }
        }
        (Ye = new WeakMap()),
          (ze = new WeakMap()),
          (Je = new WeakMap()),
          (Ke = new WeakMap()),
          (Ze = new WeakMap()),
          (Xe = new WeakMap()),
          (He = new WeakMap()),
          (Qe = new WeakMap()),
          (et = new WeakMap()),
          (tt = new WeakMap());
        var at = n(1437),
          ot = n(4835),
          ct = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        class lt extends T.Z {
          constructor(e) {
            super(), (this.gp = e);
          }
          open({ type: e }) {
            return ct(this, void 0, void 0, function* () {
              this.gp.loader.inc();
              try {
                const [t] = yield Promise.all([
                  this.fetch({ type: e }),
                  this.gp.loadOverlay(),
                  (0, at.p)(ot.Z.app.trophy).catch(y.kg.error),
                ]);
                this.gp.loader.dec(),
                  t
                    ? ((t.format = "HTML"),
                      this._events.emit("open"),
                      yield this.gp.overlay.openDocument(t).catch(y.kg.error),
                      this._events.emit("close"))
                    : y.kg.error(new Error("document not found"));
              } catch (e) {
                this.gp.loader.dec(), y.kg.error(e);
              }
            });
          }
          fetch({ type: e, format: t = "HTML" }) {
            return ct(this, void 0, void 0, function* () {
              const n = (0, a._)();
              this.gp.loader.inc();
              try {
                const i = yield this.gp._services.documentsService.fetch({
                  type: e,
                  format: t,
                });
                if (!i) throw new Error("can't fetch privacy policy");
                (i.format = t), n.done(i), this._events.emit("fetch", i);
              } catch (e) {
                n.abort(e), this._events.emit("error:fetch", e);
              } finally {
                this.gp.loader.dec();
              }
              return n.ready;
            });
          }
        }
        var ht,
          ut = function (e, t, n, i) {
            var r,
              s = arguments.length,
              a =
                s < 3
                  ? t
                  : null === i
                  ? (i = Object.getOwnPropertyDescriptor(t, n))
                  : i;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              a = Reflect.decorate(e, t, n, i);
            else
              for (var o = e.length - 1; o >= 0; o--)
                (r = e[o]) &&
                  (a = (s < 3 ? r(a) : s > 3 ? r(t, n, a) : r(t, n)) || a);
            return s > 3 && a && Object.defineProperty(t, n, a), a;
          },
          dt = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const pt = {
          data: (e) => String(e || ""),
          stats: (e) => Number(e) || 0,
          flag: (e) => Boolean(e) || !1,
          image: (e) => String(e || ""),
          doc_html: (e) => String(e || ""),
          file: (e) => String(e || ""),
        };
        class ft extends T.Z {
          constructor(e, t, n) {
            super(),
              (this.gp = e),
              (this.platformAdapter = t),
              (this.state = {}),
              (this.list = []),
              ht.set(this, function (e) {
                (this.state = {}),
                  (this.list = e),
                  e.forEach((e) => {
                    var t;
                    const n =
                      (null === (t = pt[e.type]) || void 0 === t
                        ? void 0
                        : t.call(pt, e.value)) || e.value;
                    this.state[e.key] = n;
                  }),
                  this._events.emit("change");
              }),
              dt(this, ht, "f").call(this, n);
          }
          get isPlatformVariablesAvailable() {
            return this.platformAdapter.isSupportsRemoteVariables;
          }
          get(e) {
            return this.state[e];
          }
          has(e) {
            return Boolean(this.get(e));
          }
          type(e) {
            var t;
            return (
              (null === (t = this.list.find((t) => t.key === e)) || void 0 === t
                ? void 0
                : t.type) || "data"
            );
          }
          fetch() {
            return (
              (e = this),
              (t = void 0),
              (i = function* () {
                try {
                  const e =
                    (yield this.gp._services.projectService.fetchVariables())
                      .items;
                  return (
                    dt(this, ht, "f").call(this, e),
                    this._events.emit("fetch", e),
                    e
                  );
                } catch (e) {
                  y.kg.error(e), this._events.emit("error:fetch", e);
                }
              }),
              new ((n = void 0) || (n = Promise))(function (r, s) {
                function a(e) {
                  try {
                    c(i.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    c(i.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof n
                        ? t
                        : new n(function (e) {
                            e(t);
                          })).then(a, o);
                }
                c((i = i.apply(e, t || [])).next());
              })
            );
            var e, t, n, i;
          }
          fetchPlatformVariables(e) {
            const t = this.platformAdapter.getVariables(e);
            return (
              t
                .then((e) => this._events.emit("fetchPlatformVariables", e))
                .catch((e) => {
                  y.kg.error(e),
                    this._events.emit(
                      "error:fetchPlatformVariables",
                      (null == e ? void 0 : e.message) || e
                    );
                }),
              t
            );
          }
        }
        (ht = new WeakMap()),
          ut([C(300)], ft.prototype, "fetch", null),
          ut([C(300)], ft.prototype, "fetchPlatformVariables", null);
        var mt,
          vt,
          yt,
          gt,
          wt = n(6041),
          Pt = function (e, t, n, i) {
            var r,
              s = arguments.length,
              a =
                s < 3
                  ? t
                  : null === i
                  ? (i = Object.getOwnPropertyDescriptor(t, n))
                  : i;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              a = Reflect.decorate(e, t, n, i);
            else
              for (var o = e.length - 1; o >= 0; o--)
                (r = e[o]) &&
                  (a = (s < 3 ? r(a) : s > 3 ? r(t, n, a) : r(t, n)) || a);
            return s > 3 && a && Object.defineProperty(t, n, a), a;
          },
          bt = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          Et = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          },
          Tt = function (e, t) {
            var n = {};
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) &&
                t.indexOf(i) < 0 &&
                (n[i] = e[i]);
            if (
              null != e &&
              "function" == typeof Object.getOwnPropertySymbols
            ) {
              var r = 0;
              for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                t.indexOf(i[r]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
                  (n[i[r]] = e[i[r]]);
            }
            return n;
          };
        const St = "empty_url",
          At = "empty_content",
          _t = "empty_filename";
        class It extends Ve {
          constructor() {
            super(Ct),
              mt.set(this, void 0),
              vt.set(this, {}),
              yt.set(this, function (e, t) {
                var { url: n, filename: i } = e,
                  r = Tt(e, ["url", "filename"]);
                return bt(this, void 0, void 0, function* () {
                  if (!n) throw (y.kg.error(St), new Error(St));
                  if (!i) throw (y.kg.error(_t), new Error(_t));
                  if (Et(this, vt, "f")[n]) {
                    const e = new File(
                      [Et(this, vt, "f")[n]],
                      i,
                      Et(this, vt, "f")[n]
                    );
                    return t(Object.assign(Object.assign({}, r), { file: e }));
                  }
                  try {
                    const e = yield fetch(n).then((e) => e.blob());
                    return t(
                      Object.assign(Object.assign({}, r), {
                        file: new File([e], i, { type: e.type }),
                      })
                    );
                  } catch (e) {
                    throw (y.kg.error(e), e);
                  }
                });
              }),
              gt.set(this, function (e, t) {
                return bt(this, void 0, void 0, function* () {
                  const { content: n, filename: i } = e,
                    r = Tt(e, ["content", "filename"]);
                  if (!n.trim()) throw (y.kg.error(At), new Error(At));
                  if (!i) throw (y.kg.error(_t), new Error(_t));
                  return t(
                    Object.assign(Object.assign({}, r), {
                      file: new File([n], i),
                    })
                  );
                });
              });
            const { openFile: e } = (function () {
              let e = null;
              const t = document.createElement("input");
              (t.type = "file"),
                (t.id = "gp-file-input"),
                (t.style.cssText =
                  "position: fixed; top: -999px; left: -999px; z-index: 0;"),
                (t.onchange = (e) => i(e.target)),
                (t.tabIndex = -1),
                document.body.appendChild(t);
              const n = () => {
                  setTimeout(() => e.done(null), 1e3),
                    document.body.removeEventListener("focus", n, !0);
                },
                i = (t) => {
                  const [i] = t.files ? Array.from(t.files) : [];
                  document.body.removeEventListener("focus", n, !0), e.done(i);
                };
              return {
                input: t,
                openFile: (i = "*") => {
                  return (
                    (r = this),
                    (s = void 0),
                    (c = function* () {
                      null == e || e.abort(),
                        (e = (0, a._)()),
                        (t.accept = i),
                        t.click(),
                        document.body.addEventListener("focus", n, !0);
                      const r = yield e.ready;
                      if (r) return r;
                      throw new Error("cancelled");
                    }),
                    new ((o = void 0) || (o = Promise))(function (e, t) {
                      function n(e) {
                        try {
                          a(c.next(e));
                        } catch (e) {
                          t(e);
                        }
                      }
                      function i(e) {
                        try {
                          a(c.throw(e));
                        } catch (e) {
                          t(e);
                        }
                      }
                      function a(t) {
                        var r;
                        t.done
                          ? e(t.value)
                          : ((r = t.value),
                            r instanceof o
                              ? r
                              : new o(function (e) {
                                  e(r);
                                })).then(n, i);
                      }
                      a((c = c.apply(r, s || [])).next());
                    })
                  );
                  var r, s, o, c;
                },
              };
            })();
            !(function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, mt, e, "f");
          }
          chooseFile(e) {
            return bt(this, void 0, void 0, function* () {
              const t = (0, a._)();
              try {
                const n = yield Et(this, mt, "f").call(this, e),
                  i = URL.createObjectURL(n);
                (Et(this, vt, "f")[i] = n), t.done({ file: n, tempUrl: i });
              } catch (e) {
                t.abort(e);
              }
              return t.ready;
            });
          }
          upload(e, t) {
            return bt(this, void 0, void 0, function* () {
              const n = (0, a._)();
              try {
                e.file ||
                  (e.file = yield Et(this, mt, "f").call(this, e.accept));
                const i = yield t(e);
                n.done(i);
              } catch (e) {
                n.abort(e);
              }
              return n.ready;
            });
          }
          uploadUrl(e, t) {
            return bt(this, void 0, void 0, function* () {
              return Et(this, yt, "f").call(this, e, t);
            });
          }
          uploadContent(e, t) {
            return bt(this, void 0, void 0, function* () {
              return Et(this, gt, "f").call(this, e, t);
            });
          }
        }
        function Ct(e) {
          return `p${e.playerId || 0}:${(e.tags || []).join(",")}`;
        }
        (mt = new WeakMap()),
          (vt = new WeakMap()),
          (yt = new WeakMap()),
          (gt = new WeakMap()),
          Pt([C(300)], It.prototype, "uploadUrl", null),
          Pt([C(300)], It.prototype, "uploadContent", null);
        var Ot,
          Rt = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          kt = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const Dt = "image/png,.jpeg,.jpg";
        class Mt extends T.Z {
          constructor(e, t) {
            super(), (this.gp = e), (this.acl = t), Ot.set(this, new It());
          }
          get canUpload() {
            return this.acl.canUploadImages;
          }
          resize(e, t, n, i) {
            return (0, wt.ZP)(e, t, n, i);
          }
          chooseFile() {
            return Rt(this, void 0, void 0, function* () {
              const e = kt(this, Ot, "f").chooseFile(Dt);
              return (
                e.then((e) => this._events.emit("choose", e)),
                e.catch((e) => this._events.emit("error:choose", e)),
                e
              );
            });
          }
          upload(e = {}) {
            return Rt(this, void 0, void 0, function* () {
              const t = kt(this, Ot, "f").upload(
                Object.assign(Object.assign({}, e), { accept: Dt }),
                ({ file: e, tags: t }) =>
                  Rt(this, void 0, void 0, function* () {
                    const n = this.gp.app.title,
                      i = yield this.gp.platform.requestPermissions({
                        allowUploadImages: !0,
                      });
                    if (!i.success)
                      throw new Error("permission_not_allowed_by_user");
                    if (this.gp.platform.isSupportsImageUploading) {
                      const r = yield this.gp.platform.uploadImage({
                        file: e,
                        tags: t,
                        albumName: n,
                        accessToken: i.payload.token,
                      });
                      return this.gp._services.imagesService.saveByURL({
                        src: r.src,
                        tags: t,
                        crop: {
                          height: r.height,
                          width: r.width,
                          left: 0,
                          top: 0,
                        },
                      });
                    }
                    return this.gp._services.imagesService.upload({
                      file: e,
                      tags: t,
                      accessPayload: i.payload,
                    });
                  })
              );
              return (
                this.gp.loader.inc(),
                t.then((e) => this._events.emit("upload", e)),
                t.catch((e) => this._events.emit("error:upload", e)),
                t.finally(() => this.gp.loader.dec()),
                t
              );
            });
          }
          uploadUrl(e = { url: "" }) {
            return Rt(this, void 0, void 0, function* () {
              return kt(this, Ot, "f").uploadUrl(
                Object.assign(Object.assign({}, e), { filename: "image.jpeg" }),
                (e) => this.upload(e)
              );
            });
          }
          fetch(e = {}) {
            return Rt(this, void 0, void 0, function* () {
              const t = kt(this, Ot, "f").fetch(e, (e) =>
                this.gp._services.imagesService.fetch(e).then((e) => e.items)
              );
              return (
                this.gp.loader.inc(),
                t.then((e) => this._events.emit("fetch", e)),
                t.catch((e) => this._events.emit("error:fetch", e)),
                t.finally(() => this.gp.loader.dec()),
                t
              );
            });
          }
          fetchMore(e = {}) {
            return Rt(this, void 0, void 0, function* () {
              const t = kt(this, Ot, "f").fetchMore(e, (e) =>
                this.gp._services.imagesService.fetch(e).then((e) => e.items)
              );
              return (
                this.gp.loader.inc(),
                t.then((e) => this._events.emit("fetchMore", e)),
                t.catch((e) => this._events.emit("error:fetchMore", e)),
                t.finally(() => this.gp.loader.dec()),
                t
              );
            });
          }
        }
        Ot = new WeakMap();
        var Nt,
          Lt = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          Ft = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class xt extends T.Z {
          constructor(e, t) {
            super(), (this.gp = e), (this.acl = t), Nt.set(this, new It());
          }
          get canUpload() {
            return this.acl.canUploadFiles;
          }
          chooseFile(e) {
            return Lt(this, void 0, void 0, function* () {
              const t = Ft(this, Nt, "f").chooseFile(e);
              return (
                t.then((e) => this._events.emit("choose", e)),
                t.catch((e) => this._events.emit("error:choose", e)),
                t
              );
            });
          }
          upload(e) {
            return Lt(this, void 0, void 0, function* () {
              const t = Ft(this, Nt, "f").upload(e, (e) =>
                this.gp._services.filesService.upload(e)
              );
              return (
                this.gp.loader.inc(),
                t.then((e) => this._events.emit("upload", e)),
                t.catch((e) => this._events.emit("error:upload", e)),
                t.finally(() => this.gp.loader.dec()),
                t
              );
            });
          }
          uploadContent(e) {
            return Lt(this, void 0, void 0, function* () {
              return Ft(this, Nt, "f").uploadContent(e, (e) => this.upload(e));
            });
          }
          uploadUrl(e) {
            return Lt(this, void 0, void 0, function* () {
              return Ft(this, Nt, "f").uploadUrl(e, (e) => this.upload(e));
            });
          }
          loadContent(e) {
            return Lt(this, void 0, void 0, function* () {
              const t = fetch(new URL(e).toString()).then((t) => {
                if (t.ok) return t.text();
                throw new Error(`Failed to load ${e}, errorCode: ${t.status}`);
              });
              return (
                this.gp.loader.inc(),
                t.then((e) => this._events.emit("loadContent", e)),
                t.catch((e) => this._events.emit("error:loadContent", e)),
                t.finally(() => this.gp.loader.dec()),
                t
              );
            });
          }
          fetch(e = {}) {
            return Lt(this, void 0, void 0, function* () {
              const t = Ft(this, Nt, "f").fetch(e, (e) =>
                this.gp._services.filesService.fetch(e).then((e) => e.items)
              );
              return (
                this.gp.loader.inc(),
                t.then((e) => this._events.emit("fetch", e)),
                t.catch((e) => this._events.emit("error:fetch", e)),
                t.finally(() => this.gp.loader.dec()),
                t
              );
            });
          }
          fetchMore(e = {}) {
            return Lt(this, void 0, void 0, function* () {
              const t = Ft(this, Nt, "f").fetchMore(e, (e) =>
                this.gp._services.filesService.fetch(e).then((e) => e.items)
              );
              return (
                this.gp.loader.inc(),
                t.then((e) => this._events.emit("fetchMore", e)),
                t.catch((e) => this._events.emit("error:fetchMore", e)),
                t.finally(() => this.gp.loader.dec()),
                t
              );
            });
          }
        }
        Nt = new WeakMap();
        var jt = n(1049);
        class $t extends T.Z {
          constructor(e) {
            super(), (this.gp = e);
          }
          fetch({ ids: e }) {
            return (
              (t = this),
              (n = void 0),
              (r = function* () {
                if (0 === e.map(Number).filter(Boolean).length)
                  throw (y.kg.error("empty_ids"), new Error("empty_ids"));
                const t = (0, a._)();
                return (
                  this.gp.loader.inc(),
                  t.ready
                    .then((e) => this._events.emit("fetch", e))
                    .catch((e) => this._events.emit("fetch:error", e)),
                  this.gp._services.playerService
                    .fetchPlayers({ ids: e })
                    .then(t.done)
                    .catch(t.abort)
                    .finally(() => this.gp.loader.dec()),
                  t.ready
                );
              }),
              new ((i = void 0) || (i = Promise))(function (e, s) {
                function a(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(t) {
                  var n;
                  t.done
                    ? e(t.value)
                    : ((n = t.value),
                      n instanceof i
                        ? n
                        : new i(function (e) {
                            e(n);
                          })).then(a, o);
                }
                c((r = r.apply(t, n || [])).next());
              })
            );
            var t, n, i, r;
          }
        }
        let Ut;
        try {
          new EventTarget(), (Ut = !0);
        } catch (e) {
          Ut = !1;
        }
        var Gt = Ut
            ? EventTarget
            : class {
                constructor() {
                  this.e = {};
                }
                addEventListener(e, t, n = !1) {
                  this.t(e).push(t);
                }
                removeEventListener(e, t, n = !1) {
                  const i = this.t(e),
                    r = i.indexOf(t);
                  r > -1 && i.splice(r, 1);
                }
                dispatchEvent(e) {
                  return (
                    (e.target = this),
                    Object.freeze(e),
                    this.t(e.type).forEach((t) => t(e)),
                    !0
                  );
                }
                t(e) {
                  return (this.e[e] = this.e[e] || []);
                }
              },
          Bt = Ut
            ? Event
            : class {
                constructor(e) {
                  this.type = e;
                }
              };
        class Wt extends Bt {
          constructor(e, t) {
            super(e),
              (this.newState = t.newState),
              (this.oldState = t.oldState),
              (this.originalEvent = t.originalEvent);
          }
        }
        const qt = "active",
          Vt = "passive",
          Yt = "hidden",
          zt = "frozen",
          Jt = "terminated",
          Kt = "object" == typeof safari && safari.pushNotification,
          Zt = [
            "focus",
            "blur",
            "visibilitychange",
            "freeze",
            "resume",
            "pageshow",
            "onpageshow" in self ? "pagehide" : "unload",
          ],
          Xt = (e) => (e.preventDefault(), (e.returnValue = "Are you sure?")),
          Ht = [
            [qt, Vt, Yt, Jt],
            [qt, Vt, Yt, zt],
            [Yt, Vt, qt],
            [zt, Yt],
            [zt, qt],
            [zt, Vt],
          ].map((e) => e.reduce((e, t, n) => ((e[t] = n), e), {})),
          Qt = () =>
            document.visibilityState === Yt
              ? Yt
              : document.hasFocus()
              ? qt
              : Vt,
          en = new (class extends Gt {
            constructor() {
              super();
              const e = Qt();
              (this.s = e),
                (this.i = []),
                (this.a = this.a.bind(this)),
                Zt.forEach((e) => addEventListener(e, this.a, !0)),
                Kt &&
                  addEventListener("beforeunload", (e) => {
                    this.n = setTimeout(() => {
                      e.defaultPrevented ||
                        e.returnValue.length > 0 ||
                        this.r(e, Yt);
                    }, 0);
                  });
            }
            get state() {
              return this.s;
            }
            get pageWasDiscarded() {
              return document.wasDiscarded || !1;
            }
            addUnsavedChanges(e) {
              !this.i.indexOf(e) > -1 &&
                (0 === this.i.length && addEventListener("beforeunload", Xt),
                this.i.push(e));
            }
            removeUnsavedChanges(e) {
              const t = this.i.indexOf(e);
              t > -1 &&
                (this.i.splice(t, 1),
                0 === this.i.length && removeEventListener("beforeunload", Xt));
            }
            r(e, t) {
              if (t !== this.s) {
                const n = ((e, t) => {
                  for (let n, i = 0; (n = Ht[i]); ++i) {
                    const i = n[e],
                      r = n[t];
                    if (i >= 0 && r >= 0 && r > i)
                      return Object.keys(n).slice(i, r + 1);
                  }
                  return [];
                })(this.s, t);
                for (let t = 0; t < n.length - 1; ++t) {
                  const i = n[t],
                    r = n[t + 1];
                  (this.s = r),
                    this.dispatchEvent(
                      new Wt("statechange", {
                        oldState: i,
                        newState: r,
                        originalEvent: e,
                      })
                    );
                }
              }
            }
            a(e) {
              switch ((Kt && clearTimeout(this.n), e.type)) {
                case "pageshow":
                case "resume":
                  this.r(e, Qt());
                  break;
                case "focus":
                  this.r(e, qt);
                  break;
                case "blur":
                  this.s === qt && this.r(e, Qt());
                  break;
                case "pagehide":
                case "unload":
                  this.r(e, e.persisted ? zt : Jt);
                  break;
                case "visibilitychange":
                  this.s !== zt && this.s !== Jt && this.r(e, Qt());
                  break;
                case "freeze":
                  this.r(e, zt);
              }
            }
          })(),
          tn = ["hidden", "frozen", "terminated"];
        function nn({ url: e, blur: t = 0, fade: n = 0 }) {
          e
            ? ((function (e) {
                document
                  .querySelectorAll(".gp-custom-background")
                  .forEach((t) => {
                    t.childNodes.forEach((e) => {
                      e.style.opacity = "0";
                    }),
                      setTimeout(() => {
                        t.remove();
                      }, 1e3 * e);
                  });
              })(n),
              (function (e) {
                const t = document.createElement("div");
                document.body.style.setProperty(
                  "background",
                  "transparent",
                  "important"
                ),
                  t.classList.add("gp-custom-background"),
                  (function (e, t) {
                    const n = document.createElement("div");
                    (n.style.cssText = `\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        z-index: -1;\n        background: transparent;\n        backdrop-filter: blur(${e.blur}px);\n        \n        transition: ${e.fade}s;\n    `),
                      n.classList.add("gp-custom-background-blur"),
                      t.append(n);
                  })(e, t),
                  (function (e, t) {
                    const n = document.createElement("div");
                    (n.style.cssText = `\n        background-image: url(${e.url});\n        background-size: cover;\n        background-repeat: no-repeat;\n        background-position: center;\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        z-index: -2;\n        opacity: 0;\n        transition: ${e.fade}s;\n    `),
                      n.classList.add("gp-custom-background-img"),
                      t.append(n),
                      setTimeout(() => {
                        n.style.opacity = "1";
                      }, 100);
                  })(e, t),
                  document.body.append(t);
              })({ url: e, blur: t, fade: n }))
            : y.kg.warn("Empty background url");
        }
        var rn = function (e, t, n, i) {
          return new (n || (n = Promise))(function (r, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? r(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(a, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        };
        class sn {
          getLanguage(e) {
            return rn(this, void 0, void 0, function* () {
              const t = decodeURIComponent(window.location.toString()),
                n = new RegExp(`_${e}_lang=(?<lang>\\w{2})`).exec(t);
              return n ? n.groups.lang : null;
            });
          }
          getLogs(e) {
            return rn(this, void 0, void 0, function* () {
              const t = decodeURIComponent(window.location.toString()),
                n = new RegExp(`_${e}_logs=(?<logs>\\w+)`).exec(t);
              return n ? n.groups.logs : null;
            });
          }
        }
        var an,
          on = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          cn = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const ln = Object.values(g.Uo);
        class hn {
          constructor() {
            an.set(this, [new sn()]);
          }
          getLanguage(e) {
            return on(this, void 0, void 0, function* () {
              for (const t of cn(this, an, "f")) {
                const n = yield t.getLanguage(e);
                if (null === n) continue;
                const i = n.toLowerCase();
                return ln.includes(i) ? i : null;
              }
              return null;
            });
          }
          getLogs(e) {
            return on(this, void 0, void 0, function* () {
              for (const t of cn(this, an, "f")) {
                const n = yield t.getLogs(e);
                if (null !== n) return n;
              }
              return null;
            });
          }
        }
        an = new WeakMap();
        var un = n(3793);
        const dn = () => window.matchMedia("(orientation: portrait)").matches,
          pn = (e) => {
            const t = dn();
            return (t && e === un.LH.Portrait) || (!t && e === un.LH.Landscape);
          };
        var fn,
          mn = n(8866),
          vn = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class yn {
          constructor() {
            fn.set(this, new Set()),
              document.addEventListener("pointerdown", (e) => {
                vn(this, fn, "f").add(e.pointerId);
              }),
              document.addEventListener("pointerup", (e) => {
                vn(this, fn, "f").delete(e.pointerId);
              });
          }
          waitForPointersUp() {
            return (
              (e = this),
              (t = void 0),
              (i = function* () {
                const e = new Promise((e) => {
                  if (0 === vn(this, fn, "f").size) return e();
                  const t = (n) => {
                    if (
                      (vn(this, fn, "f").delete(n.pointerId),
                      0 === vn(this, fn, "f").size)
                    )
                      return document.removeEventListener("pointerup", t), e();
                  };
                  document.addEventListener("pointerup", t);
                });
                yield Promise.race([e, (0, mn.Z)(1500)]);
              }),
              new ((n = void 0) || (n = Promise))(function (r, s) {
                function a(e) {
                  try {
                    c(i.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    c(i.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof n
                        ? t
                        : new n(function (e) {
                            e(t);
                          })).then(a, o);
                }
                c((i = i.apply(e, t || [])).next());
              })
            );
            var e, t, n, i;
          }
        }
        fn = new WeakMap();
        const gn = {
            [un.W2.Add]: (e, t) => {
              e.player.add(t.key, t.value);
            },
            [un.W2.Remove]: (e, t) => {
              e.player.add(t.key, -t.value);
            },
            [un.W2.Set]: (e, t) => {
              e.player.set(t.key, t.value);
            },
          },
          wn = { [un.x1.PlayerField]: gn };
        var Pn,
          bn,
          En,
          Tn,
          Sn,
          An,
          _n,
          In,
          Cn,
          On,
          Rn,
          kn,
          Dn,
          Mn,
          Nn,
          Ln,
          Fn,
          xn,
          jn,
          $n,
          Un,
          Gn,
          Bn = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          Wn = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          qn = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const Vn = "reward_not_found";
        class Yn extends T.Z {
          constructor(e, t, n, i) {
            var r;
            super(),
              (this.gp = e),
              (this.platformAdapter = n),
              Pn.add(this),
              bn.set(this, void 0),
              En.set(this, []),
              Tn.set(this, []),
              Sn.set(this, []),
              An.set(this, []),
              _n.set(this, {}),
              In.set(this, {}),
              Cn.set(this, {}),
              On.set(this, {}),
              Wn(this, Tn, i, "f"),
              qn(this, Pn, "m", $n).call(this),
              Wn(this, bn, t, "f"),
              qn(this, bn, "f").on("setRewardsList", (e) =>
                qn(this, Pn, "m", Mn).call(
                  this,
                  e.playerRewards,
                  e.notSentGivenList,
                  e.notSentAcceptedList
                )
              ),
              qn(this, bn, "f").on("markRewardsGiven", (e) => {
                e.forEach((e) => {
                  const t = qn(this, Pn, "m", Rn).call(this, e);
                  if (!t) return void y.kg.error(`reward not found', ID ${e}`);
                  qn(this, Pn, "m", Ln).call(this, t.id);
                  const n = qn(this, Pn, "m", Dn).call(this, t.id);
                  this._events.emit("give", n),
                    t.isAutoAccept && this._events.emit("accept", n);
                });
              }),
              null === (r = this.platformAdapter._events) ||
                void 0 === r ||
                r.on("gift", () => {
                  qn(this, Pn, "m", Nn).call(this);
                }),
              this.gp.on("change:language", (e) => {
                qn(this, Tn, "f").forEach((t) => {
                  (t.name = t.names[e] || t.names.en),
                    (t.description = t.descriptions[e] || t.descriptions.en);
                }),
                  qn(this, Pn, "m", $n).call(this);
              }),
              qn(this, Tn, "f").forEach((e) => {
                (e.description =
                  e.descriptions[this.gp.language] || e.descriptions.en),
                  (e.name = e.names[this.gp.language] || e.names.en),
                  (e.icon = (0, wt.ZP)(e.icon, 256, 256, !1)),
                  (e.iconSmall = (0, wt.ZP)(e.icon, 48, 48, !1));
              }),
              qn(this, Pn, "m", Nn).call(this),
              this.gp.on("gameStart", () =>
                Bn(this, void 0, void 0, function* () {
                  yield this.gp.player.ready,
                    qn(this, Sn, "f").forEach((e) => {
                      const t = qn(this, Pn, "m", Rn).call(this, e.rewardId);
                      if (null == t ? void 0 : t.isAutoAccept) {
                        const n = e.countTotal - e.countAccepted;
                        if (n > 0)
                          for (let e = 0; e < n; e++) this.accept({ id: t.id });
                      }
                    });
                })
              );
          }
          get list() {
            return [...qn(this, Tn, "f")];
          }
          get givenList() {
            return [...qn(this, Sn, "f")];
          }
          give(e) {
            return Bn(this, void 0, void 0, function* () {
              const t = Number(e.id) || e.tag,
                n = (0, a._)(),
                i = (t) => {
                  n.abort(t), this._events.emit("error:give", t, { input: e });
                };
              if (qn(this, En, "f").includes(t)) return i(Vn), n.ready;
              const r = qn(this, Pn, "m", Rn).call(this, t);
              if (!r) return i(Vn), n.ready;
              if (e.lazy) {
                let e = { rewardId: r.id, countTotal: 1, countAccepted: 0 };
                qn(this, Pn, "m", Ln).call(this, r.id),
                  qn(this, bn, "f").addGivenReward({ id: r.id, count: 1 });
                const t = qn(this, Pn, "m", kn).call(this, r.id);
                return (
                  (e.countTotal = t.countTotal),
                  (e.countAccepted = t.countAccepted),
                  this._events.emit("give", { reward: r, playerReward: e }),
                  r.isAutoAccept && (yield this.accept({ id: r.id })),
                  n.done({ reward: r, playerReward: e }),
                  n.ready
                );
              }
              this.gp.loader.inc();
              const s = r.id;
              try {
                const e = yield this.gp._services.rewardsService.give({
                    id: s,
                  }),
                  { reward: t } = e,
                  i = (function (e, t) {
                    var n = {};
                    for (var i in e)
                      Object.prototype.hasOwnProperty.call(e, i) &&
                        t.indexOf(i) < 0 &&
                        (n[i] = e[i]);
                    if (
                      null != e &&
                      "function" == typeof Object.getOwnPropertySymbols
                    ) {
                      var r = 0;
                      for (
                        i = Object.getOwnPropertySymbols(e);
                        r < i.length;
                        r++
                      )
                        t.indexOf(i[r]) < 0 &&
                          Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
                          (n[i[r]] = e[i[r]]);
                    }
                    return n;
                  })(e, ["reward"]);
                qn(this, Pn, "m", Ln).call(this, t.id);
                const r = qn(this, Pn, "m", kn).call(this, t.id);
                (i.countTotal = r.countTotal),
                  (i.countAccepted = r.countAccepted),
                  this._events.emit("give", { reward: t, playerReward: i }),
                  t.isAutoAccept && (yield this.accept({ id: t.id })),
                  n.done({ reward: t, playerReward: i });
              } catch (r) {
                "reward_not_found" === r && qn(this, En, "f").push(t),
                  "string" == typeof r
                    ? (y.kg.error(r), i(r))
                    : (n.abort(r),
                      this._events.emit("error:give", r, { input: e }));
              } finally {
                this.gp.loader.dec();
              }
              return n.ready;
            });
          }
          accept(e) {
            return Bn(this, void 0, void 0, function* () {
              const t = Number(e.id) || e.tag,
                n = (0, a._)(),
                i = (t) => {
                  n.abort(t),
                    this._events.emit("error:accept", t, { input: e });
                };
              if (qn(this, En, "f").includes(t)) return i(Vn), n.ready;
              if (!this.hasUnaccepted(t))
                return i("reward_already_accepted"), n.ready;
              const { reward: r, playerReward: s } = qn(this, Pn, "m", Dn).call(
                this,
                t
              );
              return s
                ? (qn(this, Pn, "m", xn).call(this, s),
                  this.platformAdapter.consumePlayerReward(r),
                  qn(this, bn, "f").addAcceptedReward({
                    id: s.rewardId,
                    count: 1,
                  }),
                  this._events.emit("accept", { reward: r, playerReward: s }),
                  n.done({ reward: r, playerReward: s }),
                  n.ready)
                : (i("player_reward_not_found"), n.ready);
            });
          }
          has(e) {
            var t;
            return (
              (null ===
                (t = qn(this, Pn, "m", Dn).call(this, e).playerReward) ||
              void 0 === t
                ? void 0
                : t.countTotal) > 0
            );
          }
          hasAccepted(e) {
            var t;
            return (
              (null ===
                (t = qn(this, Pn, "m", Dn).call(this, e).playerReward) ||
              void 0 === t
                ? void 0
                : t.countAccepted) > 0
            );
          }
          hasUnaccepted(e) {
            const { playerReward: t } = qn(this, Pn, "m", Dn).call(this, e);
            return !!t && t.countTotal > t.countAccepted;
          }
          getReward(e) {
            return qn(this, Pn, "m", Dn).call(this, e);
          }
        }
        function zn(e, t = 1) {
          e.countAccepted += t;
        }
        (bn = new WeakMap()),
          (En = new WeakMap()),
          (Tn = new WeakMap()),
          (Sn = new WeakMap()),
          (An = new WeakMap()),
          (_n = new WeakMap()),
          (In = new WeakMap()),
          (Cn = new WeakMap()),
          (On = new WeakMap()),
          (Pn = new WeakSet()),
          (Rn = function (e) {
            return qn(this, _n, "f")[e] || qn(this, In, "f")[e];
          }),
          (kn = function (e) {
            return qn(this, Cn, "f")[e];
          }),
          (Dn = function (e) {
            const t = { reward: null, playerReward: null },
              n = qn(this, Pn, "m", Rn).call(this, e);
            if (!n) return t;
            t.reward = n;
            const i = qn(this, Pn, "m", kn).call(this, n.id);
            return (
              (t.playerReward = i || {
                rewardId: n.id,
                countAccepted: 0,
                countTotal: 0,
              }),
              t
            );
          }),
          (Mn = function (e, t, n) {
            let i = [...n];
            const r = t.reduce((t, { id: n, count: i }) => {
                const r = e.find((e) => e.rewardId === n);
                return r
                  ? ((r.countTotal += i), t)
                  : (qn(this, Tn, "f").find((e) => e.id === n) &&
                      t.push({ rewardId: n, countTotal: i, countAccepted: 0 }),
                    t);
              }, []),
              s = [...e, ...r].reduce((e, t) => {
                if (qn(this, Tn, "f").find((e) => e.id === t.rewardId)) {
                  const n = i.find((e) => e.id === t.rewardId);
                  n &&
                    ((i = i.filter((e) => e.id !== t.rewardId)),
                    zn(t, n.count)),
                    e.push(t);
                }
                return e;
              }, []);
            Wn(this, Sn, qn(this, Pn, "m", Fn).call(this, s), "f"),
              qn(this, Pn, "m", Un).call(this);
          }),
          (Nn = function () {
            this.platformAdapter
              .getPlayerRewards(qn(this, Tn, "f"))
              .then((e) => {
                Wn(this, An, e || [], "f"),
                  qn(this, Pn, "m", Gn).call(this),
                  Wn(
                    this,
                    Sn,
                    qn(this, Pn, "m", Fn).call(this, qn(this, Sn, "f")),
                    "f"
                  ),
                  qn(this, Pn, "m", Un).call(this);
              })
              .catch((e) => {
                console.error("Rewards: error getting platform rewards:", e);
              });
          }),
          (Ln = function (e) {
            if (!qn(this, Pn, "m", Rn).call(this, e)) return;
            const t = qn(this, Pn, "m", kn).call(this, e);
            t
              ? (t.countTotal += 1)
              : (qn(this, Sn, "f").unshift({
                  rewardId: e,
                  countTotal: 1,
                  countAccepted: 0,
                }),
                qn(this, Pn, "m", Un).call(this));
          }),
          (Fn = function (e) {
            const t = {};
            return (
              e.forEach((e) => {
                t[e.rewardId] = Object.assign({}, e);
              }),
              Object.values(qn(this, On, "f")).forEach((e) => {
                const n = t[e.rewardId];
                n
                  ? (n.countTotal = n.countTotal + e.countTotal)
                  : qn(this, Tn, "f").find((t) => t.id === e.rewardId) &&
                    (t[e.rewardId] = {
                      rewardId: e.rewardId,
                      countTotal: e.countTotal,
                      countAccepted: 0,
                    });
              }),
              Object.values(t).filter(
                (e) => !!qn(this, Tn, "f").find((t) => t.id === e.rewardId)
              )
            );
          }),
          (xn = function (e) {
            const t = qn(this, Pn, "m", Rn).call(this, e.rewardId);
            t
              ? (zn(e), qn(this, Pn, "m", jn).call(this, t))
              : y.kg.error(`Reward ${e.rewardId} not found`);
          }),
          (jn = function (e) {
            try {
              (t = this.gp),
                e.mutations.forEach((e) => {
                  const n = wn[e.type];
                  if (!n) throw new Error(`Unknown mutation type: ${e.type}`);
                  const i = n[e.action];
                  if (!i)
                    throw new Error(`Unknown mutation action: ${e.action}`);
                  i(t, e);
                });
            } catch (e) {
              y.kg.error("failed to apply reward", e);
            }
            var t;
          }),
          ($n = function () {
            Wn(this, _n, {}, "f"),
              Wn(this, In, {}, "f"),
              qn(this, Tn, "f").forEach((e) => {
                (qn(this, _n, "f")[e.id] = e), (qn(this, In, "f")[e.tag] = e);
              });
          }),
          (Un = function () {
            Wn(this, Cn, {}, "f"),
              qn(this, Sn, "f").forEach((e) => {
                qn(this, Cn, "f")[e.rewardId] = e;
              });
          }),
          (Gn = function () {
            Wn(this, On, {}, "f"),
              qn(this, An, "f").forEach((e) => {
                qn(this, On, "f")[e.rewardId] = e;
              });
          });
        var Jn,
          Kn,
          Zn,
          Xn,
          Hn,
          Qn,
          ei,
          ti,
          ni,
          ii,
          ri,
          si,
          ai = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          oi = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          ci = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const li = "trigger_not_found";
        class hi extends T.Z {
          constructor(e, t, n) {
            super(),
              (this.gp = e),
              Jn.add(this),
              Kn.set(this, void 0),
              Zn.set(this, []),
              Xn.set(this, []),
              Hn.set(this, {}),
              Qn.set(this, {}),
              ei.set(this, {}),
              oi(
                this,
                Zn,
                [
                  ...n.triggers,
                  ...n.schedulers.reduce((e, t) => [...e, ...t.triggers], []),
                  ...n.events.reduce((e, t) => [...e, ...t.triggers], []),
                ],
                "f"
              ),
              ci(this, Jn, "m", ri).call(this),
              oi(this, Kn, t, "f"),
              ci(this, Kn, "f").on("setTriggersList", (e) => {
                oi(
                  this,
                  Xn,
                  e.playerTriggers.filter(
                    (e) => !!ci(this, Hn, "f")[e.triggerId]
                  ),
                  "f"
                ),
                  ci(this, Jn, "m", si).call(this);
              }),
              ci(this, Kn, "f").on("markTriggersActivated", (e) => {
                e.forEach((e) => {
                  const { trigger: t, isActivated: n } = ci(
                    this,
                    Jn,
                    "m",
                    ni
                  ).call(this, e);
                  t
                    ? n ||
                      (ci(this, Xn, "f").push({ triggerId: e, claimed: !1 }),
                      ci(this, Jn, "m", si).call(this),
                      this._events.emit("activate", { trigger: t }),
                      y.kg.info(
                        `ðŸŽ‰ Trigger activated, ID: ${e}, Tag: ${t.tag}`
                      ))
                    : y.kg.error(`trigger not found, ID: ${e}`);
                });
              }),
              ci(this, Kn, "f").on("markTriggersClaimed", (e) => {
                e.forEach((e) => {
                  const { trigger: t, isClaimed: n } = ci(
                    this,
                    Jn,
                    "m",
                    ni
                  ).call(this, e);
                  t
                    ? n ||
                      (oi(
                        this,
                        Xn,
                        ci(this, Xn, "f").map((t) =>
                          t.triggerId === e
                            ? Object.assign(Object.assign({}, t), {
                                claimed: !0,
                              })
                            : t
                        ),
                        "f"
                      ),
                      ci(this, Jn, "m", si).call(this),
                      this._events.emit("claim", { trigger: t }),
                      y.kg.info(
                        `ðŸŽ‰ Trigger claimed, ID: ${e}, Tag: ${t.tag}`
                      ))
                    : y.kg.error(`trigger not found, ID: ${e}`);
                });
              }),
              this.gp.on("change:language", (e) => {
                ci(this, Zn, "f").forEach((t) => {
                  t.description = t.descriptions[e] || t.descriptions.en;
                }),
                  ci(this, Jn, "m", ri).call(this);
              });
          }
          get list() {
            return [...ci(this, Zn, "f")];
          }
          get activatedList() {
            return [...ci(this, Xn, "f")];
          }
          isActivated(e) {
            return ci(this, Jn, "m", ni).call(this, e).isActivated;
          }
          isClaimed(e) {
            return ci(this, Jn, "m", ni).call(this, e).isClaimed;
          }
          getTrigger(e) {
            return ci(this, Jn, "m", ni).call(this, e);
          }
          claim(e) {
            return ai(this, void 0, void 0, function* () {
              const t = e.id || e.tag,
                n = ci(this, Jn, "m", ti).call(this, t),
                i = (0, a._)();
              try {
                if (!n)
                  throw (
                    (y.kg.error(`trigger not found, ID: ${t}`), new Error(li))
                  );
                const e = yield this._claim({ id: n.id });
                i.done(e);
              } catch (t) {
                const n = (null == t ? void 0 : t.message) || t;
                this._events.emit("error:claim", n, { input: e }), i.abort(n);
              }
              return i.ready;
            });
          }
          _claim({ id: e, tag: t }) {
            return ai(this, void 0, void 0, function* () {
              const n = e || t,
                { isActivated: i, isClaimed: r } = ci(this, Jn, "m", ii).call(
                  this,
                  n
                );
              if (!i)
                throw (
                  (y.kg.error(`trigger is not activated, ID: ${n}`),
                  new Error("trigger_not_activated"))
                );
              if (r)
                throw (
                  (y.kg.error(`trigger is already claimed, ID: ${n}`),
                  new Error("trigger_already_claimed"))
                );
              return (
                ci(this, Kn, "f").addClaimedTrigger(n),
                yield ci(this, Kn, "f").syncPlayer(),
                ci(this, Jn, "m", ni).call(this, n)
              );
            });
          }
        }
        (Kn = new WeakMap()),
          (Zn = new WeakMap()),
          (Xn = new WeakMap()),
          (Hn = new WeakMap()),
          (Qn = new WeakMap()),
          (ei = new WeakMap()),
          (Jn = new WeakSet()),
          (ti = function (e) {
            return ci(this, Hn, "f")[e] || ci(this, Qn, "f")[e];
          }),
          (ni = function (e) {
            const t = { trigger: null, isActivated: !1, isClaimed: !1 },
              n = ci(this, Jn, "m", ti).call(this, e);
            if (!n) return t;
            if (((t.trigger = n), n)) {
              const e = ci(this, ei, "f")[n.id];
              e && ((t.isActivated = !0), (t.isClaimed = e.claimed));
            }
            return t;
          }),
          (ii = function (e) {
            const t = ci(this, ei, "f")[e];
            return t
              ? { isActivated: !0, isClaimed: t.claimed }
              : { isActivated: !1, isClaimed: !1 };
          }),
          (ri = function () {
            oi(this, Hn, {}, "f"),
              oi(this, Qn, {}, "f"),
              ci(this, Zn, "f").forEach((e) => {
                (ci(this, Hn, "f")[e.id] = e), (ci(this, Qn, "f")[e.tag] = e);
              });
          }),
          (si = function () {
            oi(this, ei, {}, "f"),
              ci(this, Xn, "f").forEach((e) => {
                ci(this, ei, "f")[e.triggerId] = e;
              });
          });
        var ui,
          di = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          },
          pi = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          };
        class fi extends T.Z {
          constructor() {
            super(...arguments),
              (this.acceptedRewards = []),
              (this.givenRewards = []),
              (this.unlockedAchievements = []),
              (this.purchasedProducts = []),
              (this.claimedTriggers = []),
              (this.claimedSchedulersDays = []),
              (this.canUpdateServerTime = !0),
              ui.set(this, null);
          }
          addGivenReward(e) {
            const t = this.givenRewards.find((t) => t.id === e.id);
            t ? (t.count += e.count) : this.givenRewards.push(e);
          }
          addAcceptedReward(e) {
            const t = this.acceptedRewards.find((t) => t.id === e.id);
            t ? (t.count += e.count) : this.acceptedRewards.push(e);
          }
          addClaimedTrigger(e) {
            this.claimedTriggers.push(e);
          }
          addClaimedSchedulerDay(e) {
            this.claimedSchedulersDays.push(e);
          }
          addUnlockedAchievement(e) {
            this.unlockedAchievements.push(e);
          }
          setTriggersList(e) {
            this.emit("setTriggersList", { playerTriggers: e });
          }
          setRewardsList(e) {
            this.emit("setRewardsList", {
              playerRewards: e,
              notSentAcceptedList: this.acceptedRewards,
              notSentGivenList: this.givenRewards,
            });
          }
          setAchievementsList(e) {
            this.emit("setAchievementsList", {
              achievements: e,
              notSentIds: this.unlockedAchievements,
            });
          }
          setPurchasedList(e) {
            this.emit("setPurchasedList", {
              playerPurchases: e,
              notSentIds: this.purchasedProducts,
            });
          }
          setExperiments(e) {
            this.emit("setExperiments", { playerExperiments: e });
          }
          setPlayerSegments(e, t, n) {
            this.emit("setPlayerSegments", {
              playerSegments: e,
              leftSegments: n,
              enterSegments: t,
            });
          }
          setPlayerSchedulersList(e) {
            this.emit("setPlayerSchedulersList", { playerSchedulers: e });
          }
          setPlayerEventsList(e) {
            this.emit("setPlayerEventsList", { playerEvents: e });
          }
          setUniques(e) {
            this.emit("setUniques", { uniques: e });
          }
          markTriggersActivated(e) {
            this.emit("markTriggersActivated", e);
          }
          markTriggersClaimed(e) {
            this.emit("markTriggersClaimed", e);
          }
          markRewardsGiven(e) {
            this.emit("markRewardsGiven", e);
          }
          markAchievementsUnlocked(e) {
            this.emit("markAchievementsUnlocked", e);
          }
          markPurchasesGiven(e) {
            this.emit("markPurchasesGiven", e);
          }
          markSchedulersDaysClaimed(e) {
            this.emit("markSchedulersDaysClaimed", e);
          }
          markUniqueRegistered(e) {
            this.emit("markUniqueRegistered", e);
          }
          syncPurchases() {
            const e = (0, a._)();
            return this._events.emit("syncPurchases", e.done), e.ready;
          }
          updateServerTime(e) {
            this._events.emit("updateServerTime", e);
          }
          syncPlayer() {
            if (di(this, ui, "f")) return di(this, ui, "f").ready;
            const e = (0, a._)();
            return (
              pi(this, ui, e, "f"),
              (0, mn.Z)(300).then(() => this._events.emit("syncPlayer")),
              e.ready
            );
          }
          commitSyncPlayer() {
            var e;
            null === (e = di(this, ui, "f")) || void 0 === e || e.done(),
              pi(this, ui, null, "f");
          }
          isDirty() {
            return (
              this.acceptedRewards.length > 0 ||
              this.givenRewards.length > 0 ||
              this.claimedTriggers.length > 0 ||
              this.claimedSchedulersDays.length > 0
            );
          }
          export() {
            return {
              acceptedRewards: this.acceptedRewards,
              givenRewards: this.givenRewards,
              claimedTriggers: this.claimedTriggers,
              claimedSchedulersDays: this.claimedSchedulersDays,
            };
          }
          reset() {
            (this.acceptedRewards = []),
              (this.givenRewards = []),
              (this.claimedTriggers = []),
              (this.claimedSchedulersDays = []);
          }
          emit(e, t) {
            this._events.emit(e, t);
          }
        }
        ui = new WeakMap();
        var mi,
          vi,
          yi,
          gi,
          wi,
          Pi,
          bi,
          Ei,
          Ti,
          Si,
          Ai,
          _i,
          Ii = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          Ci = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          Oi = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const Ri = "scheduler_not_found",
          ki = "wrong_day",
          Di = "day_not_reached",
          Mi = "nothing_to_claim",
          Ni = {
            scheduler: null,
            bonuses: [],
            canClaimAllDay: !1,
            canClaimDay: !1,
            day: 0,
            isAllDayClaimed: !1,
            isDayClaimed: !1,
            isDayComplete: !1,
            isDayReached: !1,
            triggers: [],
          };
        class Li extends T.Z {
          constructor(e, t, n) {
            super(),
              (this.gp = e),
              mi.add(this),
              vi.set(this, void 0),
              yi.set(this, []),
              gi.set(this, []),
              Ci(this, yi, n, "f"),
              Ci(this, vi, t, "f"),
              Oi(this, vi, "f").on(
                "setPlayerSchedulersList",
                ({ playerSchedulers: e }) => {
                  Ci(
                    this,
                    gi,
                    e.filter((e) =>
                      Oi(this, yi, "f").some((t) => t.id === e.schedulerId)
                    ),
                    "f"
                  );
                }
              );
          }
          get list() {
            return [...Oi(this, yi, "f")];
          }
          get activeList() {
            return [...Oi(this, gi, "f")];
          }
          getSchedulersTriggers() {
            return Oi(this, yi, "f").reduce(
              (e, { triggers: t }) => [...e, ...t],
              []
            );
          }
          getScheduler(e) {
            const { scheduler: t, playerScheduler: n } = Oi(
              this,
              mi,
              "m",
              Pi
            ).call(this, e);
            if (!t)
              return {
                scheduler: null,
                currentDay: 0,
                daysClaimed: [],
                isRegistered: !1,
                stats: { activeDays: 0, activeDaysConsecutive: 0 },
              };
            let i = !1,
              r = 0,
              s = [],
              a = { activeDays: 0, activeDaysConsecutive: 0 };
            return (
              n &&
                ((i = !0),
                (a = n.stats),
                (s = n.daysClaimed),
                (r =
                  t.type === un.OB.ActiveDays
                    ? a.activeDays
                    : a.activeDaysConsecutive)),
              {
                scheduler: t,
                isRegistered: i,
                currentDay: r,
                daysClaimed: s,
                stats: a,
              }
            );
          }
          isRegistered(e) {
            return !!Oi(this, mi, "m", Pi).call(this, e).playerScheduler;
          }
          isTodayRewardClaimed(e) {
            const t = this.getScheduler(e);
            if (!t.scheduler) return !1;
            const { currentDay: n, daysClaimed: i } = t;
            return i.includes(n);
          }
          canClaimDay(e, t) {
            return this.getSchedulerDay(e, t).canClaimDay;
          }
          canClaimDayAdditional(e, t, n) {
            const { scheduler: i } = Oi(this, mi, "m", Pi).call(this, e);
            if (!i) return !1;
            const r = i.triggers.find(
              (e) => (e.id === n || e.tag === n) && e.day === t
            );
            return (
              !!r &&
              this.gp.triggers.isActivated(r.id) &&
              !this.gp.triggers.isClaimed(r.id)
            );
          }
          canClaimAllDay(e, t) {
            return this.getSchedulerDay(e, t).canClaimAllDay;
          }
          getSchedulerDay(e, t) {
            var n;
            const i = this.getScheduler(e);
            if (!i.scheduler) return Ni;
            const { scheduler: r, currentDay: s, daysClaimed: a } = i,
              o = r.triggers.filter((e) => e.day === t),
              c = s >= t,
              l = c && o.every((e) => this.gp.triggers.isActivated(e.id)),
              h = a.includes(t),
              u = h && o.every((e) => this.gp.triggers.isClaimed(e.id)),
              d = !!r && !h && c,
              p =
                d ||
                r.triggers.some((n) => this.canClaimDayAdditional(e, t, n.id));
            return {
              scheduler: r,
              day: t,
              isDayReached: c,
              isDayComplete: l,
              isDayClaimed: h,
              isAllDayClaimed: u,
              canClaimDay: d,
              canClaimAllDay: p,
              bonuses:
                (null === (n = r.daysBonuses.find((e) => e.day === t)) ||
                void 0 === n
                  ? void 0
                  : n.bonuses) || [],
              triggers: o,
            };
          }
          getSchedulerCurrentDay(e) {
            const t = this.getScheduler(e);
            if (!t.scheduler) return Ni;
            const { currentDay: n } = t;
            return this.getSchedulerDay(e, n);
          }
          claimDay(e, t) {
            return Ii(this, void 0, void 0, function* () {
              return Oi(this, mi, "m", _i).call(
                this,
                "claimDay",
                Oi(this, mi, "m", Ei).call(this, e, t),
                { schedulerIdOrTag: e, day: t }
              );
            });
          }
          claimDayAdditional(e, t, n) {
            return Ii(this, void 0, void 0, function* () {
              return Oi(this, mi, "m", _i).call(
                this,
                "claimDayAdditional",
                Oi(this, mi, "m", Ti).call(this, e, t, n),
                { schedulerIdOrTag: e, day: t, triggerIdOrTag: n }
              );
            });
          }
          claimAllDay(e, t) {
            return Ii(this, void 0, void 0, function* () {
              return Oi(this, mi, "m", _i).call(
                this,
                "claimAllDay",
                Oi(this, mi, "m", Si).call(this, e, t),
                { schedulerIdOrTag: e, day: t }
              );
            });
          }
          claimAllDays(e) {
            return Ii(this, void 0, void 0, function* () {
              return Oi(this, mi, "m", _i).call(
                this,
                "claimAllDays",
                Oi(this, mi, "m", Ai).call(this, e),
                { schedulerIdOrTag: e }
              );
            });
          }
          register(e) {
            return Ii(this, void 0, void 0, function* () {
              return Oi(this, mi, "m", _i).call(
                this,
                "register",
                Oi(this, mi, "m", wi).call(
                  this,
                  (null == e ? void 0 : e.id) || (null == e ? void 0 : e.tag)
                ),
                e
              );
            });
          }
        }
        (vi = new WeakMap()),
          (yi = new WeakMap()),
          (gi = new WeakMap()),
          (mi = new WeakSet()),
          (wi = function (e) {
            return Ii(this, void 0, void 0, function* () {
              const t = this.getScheduler(e);
              if (!t.scheduler) throw new Error(Ri);
              const { scheduler: n } = t,
                i = yield this.gp._services.schedulersService.register({
                  schedulerId: n.id,
                });
              Oi(this, gi, "f").push(
                Object.assign(Object.assign({}, i), { scheduler: n })
              );
              const r = this.getScheduler(e),
                { scheduler: s } = r;
              return (function (e, t) {
                var n = {};
                for (var i in e)
                  Object.prototype.hasOwnProperty.call(e, i) &&
                    t.indexOf(i) < 0 &&
                    (n[i] = e[i]);
                if (
                  null != e &&
                  "function" == typeof Object.getOwnPropertySymbols
                ) {
                  var r = 0;
                  for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                    t.indexOf(i[r]) < 0 &&
                      Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
                      (n[i[r]] = e[i[r]]);
                }
                return n;
              })(r, ["scheduler"]);
            });
          }),
          (Pi = function (e) {
            const t = { scheduler: null, playerScheduler: null },
              n = Oi(this, yi, "f").find(
                (t) => t.tag === e || t.id === Number(e)
              );
            return n
              ? ((t.scheduler = n),
                n &&
                  (t.playerScheduler = Oi(this, gi, "f").find(
                    (e) => e.schedulerId === n.id
                  )),
                t)
              : t;
          }),
          (bi = function (e, t) {
            return !Number.isNaN(e) && e > 0 && e <= t.days;
          }),
          (Ei = function (e, t) {
            return Ii(this, void 0, void 0, function* () {
              const {
                scheduler: n,
                isDayReached: i,
                isDayClaimed: r,
              } = this.getSchedulerDay(e, t);
              if (!n) throw Ri;
              if (!Oi(this, mi, "m", bi).call(this, t, n)) throw ki;
              if (!i) throw Di;
              if (r) throw "day_already_claimed";
              return (
                Oi(this, vi, "f").addClaimedSchedulerDay({
                  schedulerId: n.id,
                  day: t,
                }),
                yield Oi(this, vi, "f").syncPlayer(),
                this.getSchedulerDay(e, t)
              );
            });
          }),
          (Ti = function (e, t, n) {
            return Ii(this, void 0, void 0, function* () {
              const { scheduler: i, isDayReached: r } = this.getSchedulerDay(
                e,
                t
              );
              if (!i) throw Ri;
              if (!Oi(this, mi, "m", bi).call(this, t, i)) throw ki;
              if (!r) throw Di;
              const s = i.triggers.find((e) => e.id === n || e.tag === n);
              if (!s) throw li;
              const { isClaimed: a } = yield this.gp.triggers._claim({
                id: s.id,
              });
              if (!a) throw "failed_to_claim";
              return this.getSchedulerDay(e, t);
            });
          }),
          (Si = function (e, t) {
            return Ii(this, void 0, void 0, function* () {
              const { scheduler: n, isDayReached: i } = this.getSchedulerDay(
                e,
                t
              );
              if (!n) throw Ri;
              if (!Oi(this, mi, "m", bi).call(this, t, n)) throw ki;
              if (!i) throw Di;
              const r = [];
              if (
                (this.canClaimDay(e, t) &&
                  r.push(Oi(this, mi, "m", Ei).call(this, e, t)),
                n.triggers.forEach((n) => {
                  this.canClaimDayAdditional(e, t, n.id) &&
                    r.push(Oi(this, mi, "m", Ti).call(this, e, t, n.id));
                }),
                0 === r.length)
              )
                throw Mi;
              return yield Promise.all(r), this.getSchedulerDay(e, t);
            });
          }),
          (Ai = function (e) {
            return Ii(this, void 0, void 0, function* () {
              const { scheduler: t } = Oi(this, mi, "m", Pi).call(this, e);
              if (!t) throw Ri;
              const n = [];
              for (let i = 1; i <= t.days; i++)
                this.canClaimAllDay(e, i) &&
                  n.push(this.claimAllDay(e, i).catch(y.kg.warn));
              if (0 === n.length) throw Mi;
              return yield Promise.all(n), this.getScheduler(e);
            });
          }),
          (_i = function (e, t, n) {
            return t
              .then((t) => (this._events.emit(e, t, { input: n }), t))
              .catch((t) => {
                const i = (null == t ? void 0 : t.message) || t;
                throw (this._events.emit(`error:${e}`, i, { input: n }), i);
              });
          });
        var Fi,
          xi,
          ji,
          $i,
          Ui,
          Gi = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          Bi = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class Wi extends T.Z {
          constructor(e, t, n) {
            super(),
              (this.gp = e),
              Fi.add(this),
              xi.set(this, void 0),
              ji.set(this, []),
              $i.set(this, []),
              Gi(
                this,
                ji,
                n.map((t) =>
                  Object.assign(Object.assign({}, t), {
                    name: t.names[e.language] || t.names.en,
                    description:
                      t.descriptions[e.language] || t.descriptions.en,
                    iconSmall: (0, wt.ZP)(t.icon, 48, 48, !1),
                    icon: (0, wt.ZP)(t.icon, 256, 256, !1),
                    get timeLeft() {
                      const n = Date.parse(t.dateEnd) || 1 / 0,
                        i = Math.floor((n - Date.parse(e.serverTime)) / 1e3);
                      return i > 0 ? i : 0;
                    },
                    get isActive() {
                      const n = Date.parse(t.dateStart) || 0;
                      return Date.parse(e.serverTime) >= n && this.timeLeft > 0;
                    },
                  })
                ),
                "f"
              ),
              Gi(this, xi, t, "f"),
              Bi(this, xi, "f").on(
                "setPlayerEventsList",
                ({ playerEvents: e }) => {
                  Gi(
                    this,
                    $i,
                    e.filter((e) =>
                      Bi(this, ji, "f").some((t) => t.id === e.eventId)
                    ),
                    "f"
                  );
                }
              ),
              this.gp.on("change:language", (e) => {
                Bi(this, ji, "f").forEach((t) => {
                  (t.name = t.names[e] || t.names.en),
                    (t.description = t.descriptions[e] || t.descriptions.en);
                });
              });
          }
          get list() {
            return [...Bi(this, ji, "f")];
          }
          get activeList() {
            return [...Bi(this, $i, "f")];
          }
          getEvent(e) {
            const { event: t, playerEvent: n } = Bi(this, Fi, "m", Ui).call(
                this,
                e
              ),
              i = {
                event: t,
                stats: (null == n ? void 0 : n.stats) || {
                  activeDays: 0,
                  activeDaysConsecutive: 0,
                },
                isJoined: !!(null == t ? void 0 : t.isActive) && !!n,
                rewards: [],
                achievements: [],
                products: [],
              };
            return t
              ? (t.triggers.forEach((e) => {
                  e.bonuses.forEach((e) => {
                    switch (e.type) {
                      case un.Do.Reward:
                        const { reward: t } = this.gp.rewards.getReward(e.id);
                        t &&
                          i.rewards.push(
                            Object.assign(Object.assign({}, t), {
                              isExists: this.gp.rewards.has(e.id),
                            })
                          );
                        break;
                      case un.Do.Achievement:
                        const { achievement: n } =
                          this.gp.achievements.getAchievement(e.id);
                        n &&
                          i.achievements.push(
                            Object.assign(Object.assign({}, n), {
                              isExists: this.gp.achievements.has(e.id),
                            })
                          );
                        break;
                      case un.Do.Product:
                        const r = this.gp.payments.getProduct(e.id);
                        r &&
                          i.products.push(
                            Object.assign(Object.assign({}, r), {
                              isExists: this.gp.payments.has(e.id),
                            })
                          );
                    }
                  }, []);
                }),
                i)
              : i;
          }
          has(e) {
            const { event: t } = Bi(this, Fi, "m", Ui).call(this, e);
            return !!(null == t ? void 0 : t.isActive);
          }
          isJoined(e) {
            const { event: t, playerEvent: n } = Bi(this, Fi, "m", Ui).call(
              this,
              e
            );
            return !!(null == t ? void 0 : t.isActive) && !!n;
          }
          join(e) {
            return (
              (t = this),
              (n = void 0),
              (r = function* () {
                const t = Number(e.id) || e.tag,
                  n = (0, a._)(),
                  i = (t) => {
                    const i = "string" == typeof t ? t : t.message;
                    return (
                      n.abort(i),
                      this._events.emit("error:join", i, { input: e }),
                      n.ready
                    );
                  },
                  { event: r, playerEvent: s } = Bi(this, Fi, "m", Ui).call(
                    this,
                    t
                  );
                if (!r) return i("event_not_found");
                if (s) return i("already_joined");
                try {
                  this.gp.loader.inc();
                  const e = yield this.gp._services.eventsService.join({
                      eventId: r.id,
                    }),
                    { __typename: t } = e,
                    i = (function (e, t) {
                      var n = {};
                      for (var i in e)
                        Object.prototype.hasOwnProperty.call(e, i) &&
                          t.indexOf(i) < 0 &&
                          (n[i] = e[i]);
                      if (
                        null != e &&
                        "function" == typeof Object.getOwnPropertySymbols
                      ) {
                        var r = 0;
                        for (
                          i = Object.getOwnPropertySymbols(e);
                          r < i.length;
                          r++
                        )
                          t.indexOf(i[r]) < 0 &&
                            Object.prototype.propertyIsEnumerable.call(
                              e,
                              i[r]
                            ) &&
                            (n[i[r]] = e[i[r]]);
                      }
                      return n;
                    })(e, ["__typename"]);
                  Bi(this, $i, "f").some((e) => e.eventId === i.eventId) ||
                    Bi(this, $i, "f").push(i),
                    n.done({ event: r, playerEvent: i }),
                    this._events.emit("join", { event: r, playerEvent: i });
                } catch (e) {
                  i(e);
                } finally {
                  this.gp.loader.dec();
                }
                return n.ready;
              }),
              new ((i = void 0) || (i = Promise))(function (e, s) {
                function a(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(t) {
                  var n;
                  t.done
                    ? e(t.value)
                    : ((n = t.value),
                      n instanceof i
                        ? n
                        : new i(function (e) {
                            e(n);
                          })).then(a, o);
                }
                c((r = r.apply(t, n || [])).next());
              })
            );
            var t, n, i, r;
          }
        }
        (xi = new WeakMap()),
          (ji = new WeakMap()),
          ($i = new WeakMap()),
          (Fi = new WeakSet()),
          (Ui = function (e) {
            const t = { event: null, playerEvent: null },
              n = Bi(this, ji, "f").find((t) => t.tag === e || t.id === e);
            return n
              ? ((t.event = n),
                n &&
                  (t.playerEvent = Bi(this, $i, "f").find(
                    (e) => e.eventId === n.id
                  )),
                t)
              : t;
          });
        var qi,
          Vi,
          Yi = n(6256);
        class zi {
          constructor() {
            qi.add(this),
              (this.type = (function (e, t, n, i) {
                if ("a" === n && !i)
                  throw new TypeError(
                    "Private accessor was defined without a getter"
                  );
                if ("function" == typeof t ? e !== t || !i : !t.has(e))
                  throw new TypeError(
                    "Cannot read private member from an object whose class did not declare it"
                  );
                return "m" === n
                  ? i
                  : "a" === n
                  ? i.call(e)
                  : i
                  ? i.value
                  : t.get(e);
              })(this, qi, "m", Vi).call(this));
          }
          _satisfies(e) {
            return e.includes(this.type);
          }
        }
        (qi = new WeakSet()),
          (Vi = function () {
            const e = new Yi.UAParser(),
              t = e.getOS(),
              n = e.getDevice();
            return "iOS" === t.name
              ? un.U7.Ios
              : "Android" === t.name
              ? un.U7.Android
              : "smarttv" === n.type
              ? un.U7.Tv
              : un.U7.Desktop;
          });
        var Ji,
          Ki,
          Zi,
          Xi,
          Hi,
          Qi = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          er = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class tr {
          constructor(e, t) {
            (this.gp = e),
              Ji.add(this),
              Ki.set(this, void 0),
              Zi.set(this, []),
              Xi.set(this, {}),
              Qi(this, Ki, t, "f"),
              er(this, Ki, "f").on("setExperiments", (e) =>
                er(this, Ji, "m", Hi).call(this, e.playerExperiments)
              );
          }
          get map() {
            return Object.assign({}, er(this, Xi, "f"));
          }
          has(e, t) {
            return e in er(this, Xi, "f") && er(this, Xi, "f")[e] === t;
          }
        }
        (Ki = new WeakMap()),
          (Zi = new WeakMap()),
          (Xi = new WeakMap()),
          (Ji = new WeakSet()),
          (Hi = function (e) {
            if (0 === e.length) return;
            let t = !1;
            const n = {};
            Qi(
              this,
              Xi,
              e.reduce((e, i, r) => {
                var s;
                return (
                  (e[i.experiment] = i.cohort),
                  (n[`${this.gp.name.toUpperCase()}_AB_${i.experiment}`] =
                    i.cohort),
                  t ||
                    (null === (s = er(this, Zi, "f")[r]) || void 0 === s
                      ? void 0
                      : s.cohort) === i.cohort ||
                    (t = !0),
                  e
                );
              }, {}),
              "f"
            ),
              Qi(this, Zi, e, "f"),
              (this.gp.analytics._experimentsVisitParams = n),
              t &&
                this.gp.analytics.setVisitParams(this.gp.analytics.visitParams);
          });
        var nr,
          ir,
          rr,
          sr,
          ar = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          or = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class cr extends T.Z {
          constructor(e, t) {
            super(),
              (this.gp = e),
              nr.add(this),
              ir.set(this, void 0),
              rr.set(this, []),
              ar(this, ir, t, "f"),
              or(this, ir, "f").on("setPlayerSegments", (e) =>
                or(this, nr, "m", sr).call(
                  this,
                  e.playerSegments,
                  e.enterSegments,
                  e.leftSegments
                )
              );
          }
          get list() {
            return [...or(this, rr, "f")];
          }
          has(e) {
            return or(this, rr, "f").includes(e);
          }
        }
        (ir = new WeakMap()),
          (rr = new WeakMap()),
          (nr = new WeakSet()),
          (sr = function (e, t, n) {
            ((0 === or(this, rr, "f").length && e.length > 0) ||
              t.length > 0 ||
              n.length > 0) &&
              ((this.gp.analytics._segmentsVisitParams = e.reduce(
                (e, t) => ((e[`GP_SEGMENT_${t}`] = "1"), e),
                {}
              )),
              this.gp.analytics.setVisitParams(this.gp.analytics.visitParams)),
              ar(this, rr, e, "f"),
              t.forEach((e) => this._events.emit("enter", e)),
              n.forEach((e) => this._events.emit("leave", e));
          });
        var lr,
          hr,
          ur,
          dr,
          pr = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          fr = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          mr = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const vr = "empty_tag";
        class yr extends T.Z {
          constructor(e, t) {
            super(),
              (this.gp = e),
              lr.add(this),
              hr.set(this, void 0),
              ur.set(this, []),
              fr(this, hr, t, "f"),
              mr(this, hr, "f").on("setUniques", (e) =>
                fr(this, ur, e.uniques, "f")
              );
          }
          get list() {
            return [...mr(this, ur, "f")];
          }
          check({ tag: e, value: t }) {
            return pr(this, void 0, void 0, function* () {
              e || mr(this, lr, "m", dr).call(this, "check", new Error(vr));
              try {
                const n =
                  yield this.gp._services.playerService.checkUniqueValue({
                    tag: e,
                    value: t,
                  });
                return (
                  this._events.emit("check", {
                    tag: e,
                    value: t,
                    success: n.success,
                  }),
                  n.success
                );
              } catch (e) {
                mr(this, lr, "m", dr).call(this, "check", e);
              }
            });
          }
          register({ tag: e, value: t }) {
            return pr(this, void 0, void 0, function* () {
              e || mr(this, lr, "m", dr).call(this, "register", new Error(vr));
              try {
                const n =
                  yield this.gp._services.playerService.registerUniqueValue({
                    tag: e,
                    value: t,
                  });
                return (
                  mr(this, ur, "f").some((e) => e.tag === n.tag)
                    ? fr(
                        this,
                        ur,
                        mr(this, ur, "f").map((e) => (e.tag === n.tag ? n : e)),
                        "f"
                      )
                    : mr(this, ur, "f").push(n),
                  this._events.emit("register", { tag: e, value: t }),
                  !0
                );
              } catch (e) {
                mr(this, lr, "m", dr).call(this, "register", e);
              }
            });
          }
          delete({ tag: e }) {
            return pr(this, void 0, void 0, function* () {
              e || mr(this, lr, "m", dr).call(this, "delete", new Error(vr)),
                mr(this, ur, "f").some((t) => t.tag === e) ||
                  mr(this, lr, "m", dr).call(
                    this,
                    "delete",
                    new Error("unique_value_not_found")
                  );
              try {
                return (
                  yield this.gp._services.playerService.deleteUniqueValue({
                    tag: e,
                  }),
                  fr(
                    this,
                    ur,
                    mr(this, ur, "f").filter((t) => t.tag !== e),
                    "f"
                  ),
                  this._events.emit("delete", { tag: e }),
                  !0
                );
              } catch (e) {
                mr(this, lr, "m", dr).call(this, "delete", e);
              }
            });
          }
          get(e) {
            var t;
            return (
              (null === (t = mr(this, ur, "f").find((t) => t.tag === e)) ||
              void 0 === t
                ? void 0
                : t.value) || ""
            );
          }
        }
        (hr = new WeakMap()),
          (ur = new WeakMap()),
          (lr = new WeakSet()),
          (dr = function (e, t) {
            throw (
              (y.kg.error(t),
              this._events.emit(
                `error:${e}`,
                (null == t ? void 0 : t.message) || t
              ),
              t)
            );
          });
        var gr = function (e, t, n, i) {
          return new (n || (n = Promise))(function (r, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? r(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(a, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        };
        const wr = (e) => `_${e}`;
        class Pr extends T.Z {
          constructor(e) {
            super(), (this.storage = e), (this.type = "platform");
          }
          setStorage(e) {
            this.type = e;
          }
          get storages() {
            return "local" === this.type
              ? this.storage.localStorages
              : this.storage._storages;
          }
          get(e) {
            return gr(this, void 0, void 0, function* () {
              const t = yield this.storage.get(this.storages, wr(e));
              return (
                this._events.emit("get", {
                  key: e,
                  value: null != t ? t : null,
                }),
                null != t ? t : null
              );
            });
          }
          set(e, t) {
            return gr(this, void 0, void 0, function* () {
              yield this.storage.set(this.storages, wr(e), t),
                this._events.emit("set", { key: e, value: t });
            });
          }
          getGlobal(e) {
            return gr(this, void 0, void 0, function* () {
              const t = yield this.storage.getRaw(this.storages, wr(e));
              return (
                this._events.emit("get:global", {
                  key: e,
                  value: null != t ? t : null,
                }),
                null != t ? t : null
              );
            });
          }
          setGlobal(e, t) {
            return gr(this, void 0, void 0, function* () {
              yield this.storage.setRaw(this.storages, wr(e), t),
                this._events.emit("set:global", { key: e, value: t });
            });
          }
        }
        var br,
          Er,
          Tr,
          Sr = n(1961),
          Ar = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          _r = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class Ir extends T.Z {
          constructor(e) {
            super(),
              (this.gp = e),
              br.add(this),
              Er.set(this, void 0),
              this.gp.on("change:language", (e) => {
                _r(this, Er, "f") && _r(this, Er, "f").changeLanguage(e);
              });
          }
          showConfirm({
            title: e,
            description: t,
            textConfirm: n,
            textCancel: i,
            invertButtonColors: r,
            hideCancelButton: s = !1,
          } = {}) {
            return Ar(this, void 0, void 0, function* () {
              this.gp.loader.inc();
              try {
                yield _r(this, br, "m", Tr).call(this);
                const a = yield _r(this, Er, "f").showConfirm({
                  title: e,
                  description: t,
                  textConfirm: n,
                  textCancel: i,
                  invertButtonColors: r,
                  hideCancelButton: s,
                });
                return (
                  this.gp.loader.dec(), this._events.emit("confirm:close", a), a
                );
              } catch (e) {
                this.gp.loader.dec(), _r(this, Er, "f").close(), y.kg.error(e);
              }
            });
          }
        }
        (Er = new WeakMap()),
          (br = new WeakSet()),
          (Tr = function () {
            return Ar(this, void 0, void 0, function* () {
              _r(this, Er, "f") ||
                ((function (e, t, n, i, r) {
                  if ("m" === i)
                    throw new TypeError("Private method is not writable");
                  if ("a" === i && !r)
                    throw new TypeError(
                      "Private accessor was defined without a setter"
                    );
                  if ("function" == typeof t ? e !== t || !r : !t.has(e))
                    throw new TypeError(
                      "Cannot write private member to an object whose class did not declare it"
                    );
                  "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
                })(
                  this,
                  Er,
                  yield Promise.all([n.e(5839), n.e(9278), n.e(1634)])
                    .then(n.bind(n, 8184))
                    .then((e) => e.default(this.gp)),
                  "f"
                ),
                this._events.emit("windows:ready"));
            });
          });
        var Cr,
          Or,
          Rr,
          kr,
          Dr,
          Mr,
          Nr,
          Lr = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class Fr extends T.Z {
          constructor(e) {
            super(),
              (this.gp = e),
              Cr.add(this),
              (this.isSFXMuted = !1),
              (this.isMusicMuted = !1),
              Or.set(this, { isSFXMuted: !1, isMusicMuted: !1 }),
              this.gp._storage.getLocalRaw("_gs_sounds").then((e) => {
                e &&
                  ((function (e, t, n, i, r) {
                    if ("m" === i)
                      throw new TypeError("Private method is not writable");
                    if ("a" === i && !r)
                      throw new TypeError(
                        "Private accessor was defined without a setter"
                      );
                    if ("function" == typeof t ? e !== t || !r : !t.has(e))
                      throw new TypeError(
                        "Cannot write private member to an object whose class did not declare it"
                      );
                    "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
                  })(
                    this,
                    Or,
                    {
                      isSFXMuted: e.isSFXMuted || !1,
                      isMusicMuted: e.isMusicMuted || !1,
                    },
                    "f"
                  ),
                  (this.isSFXMuted = Lr(this, Or, "f").isSFXMuted),
                  (this.isMusicMuted = Lr(this, Or, "f").isMusicMuted));
              }),
              this.gp.on("pause", () => {
                (this.isSFXMuted = !0),
                  (this.isMusicMuted = !0),
                  this._events.emit("mute"),
                  this._events.emit("mute:sfx"),
                  this._events.emit("mute:music");
              }),
              this.gp.on("resume", () => {
                Lr(this, Or, "f").isSFXMuted ||
                  ((this.isSFXMuted = !1), this._events.emit("unmute:sfx")),
                  Lr(this, Or, "f").isMusicMuted ||
                    ((this.isMusicMuted = !1),
                    this._events.emit("unmute:music")),
                  (Lr(this, Or, "f").isSFXMuted &&
                    Lr(this, Or, "f").isMusicMuted) ||
                    this._events.emit("unmute");
              });
          }
          get isMuted() {
            return this.isSFXMuted && this.isMusicMuted;
          }
          mute() {
            const e = this.isMuted;
            let t = !1;
            this.isSFXMuted || (Lr(this, Cr, "m", Rr).call(this, !1), (t = !0)),
              this.isMusicMuted ||
                (Lr(this, Cr, "m", Dr).call(this, !1), (t = !0)),
              t && !e && this._events.emit("mute");
          }
          unmute() {
            let e = !1;
            this.isSFXMuted && (Lr(this, Cr, "m", kr).call(this, !1), (e = !0)),
              this.isMusicMuted &&
                (Lr(this, Cr, "m", Mr).call(this, !1), (e = !0)),
              e && this._events.emit("unmute");
          }
          muteSFX() {
            Lr(this, Cr, "m", Rr).call(this);
          }
          unmuteSFX() {
            Lr(this, Cr, "m", kr).call(this);
          }
          muteMusic() {
            Lr(this, Cr, "m", Dr).call(this);
          }
          unmuteMusic() {
            Lr(this, Cr, "m", Mr).call(this);
          }
        }
        (Or = new WeakMap()),
          (Cr = new WeakSet()),
          (Rr = function (e = !0) {
            if (!this.isSFXMuted) {
              const t = this.isMuted;
              (this.isSFXMuted = !0),
                (Lr(this, Or, "f").isSFXMuted = !0),
                Lr(this, Cr, "m", Nr).call(this),
                this._events.emit("mute:sfx"),
                e && !t && this.isMuted && this._events.emit("mute");
            }
          }),
          (kr = function (e = !0) {
            if (this.isSFXMuted) {
              const t = this.isMuted;
              (this.isSFXMuted = !1),
                (Lr(this, Or, "f").isSFXMuted = !1),
                Lr(this, Cr, "m", Nr).call(this),
                this._events.emit("unmute:sfx"),
                e && t && !this.isMuted && this._events.emit("unmute");
            }
          }),
          (Dr = function (e = !0) {
            if (!this.isMusicMuted) {
              const t = this.isMuted;
              (this.isMusicMuted = !0),
                (Lr(this, Or, "f").isMusicMuted = !0),
                Lr(this, Cr, "m", Nr).call(this),
                this._events.emit("mute:music"),
                e && !t && this.isMuted && this._events.emit("mute");
            }
          }),
          (Mr = function (e = !0) {
            if (this.isMusicMuted) {
              const t = this.isMuted;
              (this.isMusicMuted = !1),
                (Lr(this, Or, "f").isMusicMuted = !1),
                Lr(this, Cr, "m", Nr).call(this),
                this._events.emit("unmute:music"),
                e && t && !this.isMuted && this._events.emit("unmute");
            }
          }),
          (Nr = function () {
            this.gp._storage.setLocalRaw("_gs_sounds", Lr(this, Or, "f"));
          });
        var xr,
          jr,
          $r = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        class Ur {
          constructor(e, t) {
            (this.gp = e),
              (this.app = t),
              xr.add(this),
              (this.userId = ""),
              (this.username = ""),
              (this.isAuthorizedAtPlatform = !1),
              (this.authFinished = Promise.resolve());
          }
          get hasCredetials() {
            return !!this.userId;
          }
          getPlayerAuthInfo() {
            return $r(this, void 0, void 0, function* () {
              const e = (0, a._)();
              return (
                this.gp._services.playerService
                  .getLoginStatus()
                  .then(({ credentials: t }) => {
                    (this.userId = t),
                      (this.username = t),
                      e.done({ credentials: t });
                  })
                  .catch(() => {
                    e.done({});
                  }),
                e.ready
              );
            });
          }
          getPlayerContext() {
            return $r(this, void 0, void 0, function* () {
              return {
                platformData: yield this.getPlayerAuthInfo(),
                key: this.userId,
              };
            });
          }
          loginPlayer(e, t = { isAuthModal: !1 }) {
            return $r(this, void 0, void 0, function* () {
              return (
                (!t.isAuthModal && this.userId) ||
                  (yield (function (e, t, n, i) {
                    if ("a" === n && !i)
                      throw new TypeError(
                        "Private accessor was defined without a getter"
                      );
                    if ("function" == typeof t ? e !== t || !i : !t.has(e))
                      throw new TypeError(
                        "Cannot read private member from an object whose class did not declare it"
                      );
                    return "m" === n
                      ? i
                      : "a" === n
                      ? i.call(e)
                      : i
                      ? i.value
                      : t.get(e);
                  })(this, xr, "m", jr).call(this)),
                this.getPlayer()
              );
            });
          }
          logoutPlayer() {
            return $r(this, void 0, void 0, function* () {
              const { success: e } =
                yield this.gp._services.playerService.logoutPlayer();
              return e && ((this.userId = ""), (this.username = "")), e;
            });
          }
          getPlayer() {
            return $r(this, void 0, void 0, function* () {
              return {
                id: this.userId,
                name: this.username,
                photoSmall: "",
                photoMedium: "",
                photoLarge: "",
              };
            });
          }
          publishRecord(e) {}
          isPlatformAvatar() {
            return !1;
          }
          setCredentials(e) {}
        }
        (xr = new WeakSet()),
          (jr = function () {
            return $r(this, void 0, void 0, function* () {
              const e = (0, a._)(),
                t = yield this.app.login();
              return (
                t
                  ? this.gp._services.playerService
                      .loginPlayer({ token: t })
                      .then(({ success: n }) => {
                        (this.userId = t), (this.username = t), e.done(n);
                      })
                      .catch(() => {
                        e.abort("login failed");
                      })
                  : e.abort("cancel"),
                e.ready
              );
            });
          });
        var Gr,
          Br,
          Wr,
          qr,
          Vr,
          Yr,
          zr,
          Jr,
          Kr = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          Zr = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          },
          Xr = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          };
        const Hr = [
            L.z.CUSTOM,
            L.z.GOOGLE_PLAY,
            L.z.APP_GALLERY,
            L.z.GALAXY_STORE,
            L.z.ONE_STORE,
            L.z.AMAZON_APPSTORE,
            L.z.XIAOMI_GETAPPS,
            L.z.APTOIDE,
            L.z.RUSTORE,
            L.z.ANDROID,
          ],
          Qr = { [de.J1.Google]: !0, [de.J1.Yandex]: !0, [de.J1.Xsolla]: !0 };
        class es extends T.Z {
          constructor({ projectId: e, publicToken: t, onReady: n } = {}, i) {
            var r, s;
            super(),
              Gr.add(this),
              (this.setBackground = nn),
              (this.name = ""),
              (this.isPaused = !1),
              (this.isGameplay = !1),
              (this.isGameStarted = !1),
              (this.logger = y.kg),
              Br.set(this, void 0),
              Wr.set(this, void 0),
              qr.set(this, void 0),
              Vr.set(this, void 0),
              (this._params =
                null ===
                  (s = new URL(
                    (null === (r = document.currentScript) || void 0 === r
                      ? void 0
                      : r.src) || document.URL
                  )) || void 0 === s
                  ? void 0
                  : s.searchParams),
              (this.projectId =
                null != e ? e : Number(this._params.get("projectId"))),
              (this.publicToken =
                null != t ? t : this._params.get("publicToken")),
              (this.onReady = n),
              Zr(this, Gr, "m", Yr).call(this, i);
          }
          get nativeSDK() {
            return this.platform.getNativeSDK();
          }
          get serverTime() {
            return new Date(Zr(this, Vr, "f")).toISOString();
          }
          get isDev() {
            var e;
            return (
              (null === (e = Zr(this, Wr, "f")) || void 0 === e
                ? void 0
                : e.isDev) || !1
            );
          }
          get isAllowedOrigin() {
            var e;
            return (
              (null === (e = Zr(this, Wr, "f")) || void 0 === e
                ? void 0
                : e.isAllowedOrigin) || !1
            );
          }
          get locale() {
            return g.h$[this.language] || "en-US";
          }
          get isPortrait() {
            return dn();
          }
          init(e) {
            return Kr(this, void 0, void 0, function* () {
              this.channels.on("event:connect", ({ hash: e }) => {
                this.player._firstReqHash !== e &&
                  this._events.emit("event:connect");
              });
              const t = () => {
                  this.ads.isAllowedToResumeGameplay && this.resume();
                },
                n = () => {
                  this.pause();
                };
              this.ads.on("fullscreen:start", n),
                this.ads.on("fullscreen:close", t),
                this.ads.on("preloader:start", n),
                this.ads.on("preloader:close", t),
                this.ads.on("rewarded:start", n),
                this.ads.on("rewarded:close", t),
                yield Promise.all([this.ads.checkAdblock()]).catch(y.kg.warn),
                e.done(this);
            });
          }
          loadOverlay() {
            return Kr(this, void 0, void 0, function* () {
              this.overlay ||
                ((this.overlay = yield Promise.all([
                  n.e(5839),
                  n.e(9278),
                  n.e(9026),
                  n.e(9206),
                  n.e(5374),
                  n.e(7415),
                ])
                  .then(n.bind(n, 1030))
                  .then((e) => e.default(this))),
                this._events.emit("overlay:ready"));
            });
          }
          get _overlaySizeOffsets() {
            return {
              top: this.ads._stickyBannerOffsets.top,
              bottom: this.ads._stickyBannerOffsets.bottom,
            };
          }
          changeLanguage(e) {
            return Kr(this, void 0, void 0, function* () {
              if (this.language !== e)
                try {
                  if (!Object.values(g.Uo).includes(e))
                    throw new Error(`Language ${e} not supported`);
                  (this.language = e),
                    this._storage.saveLanguage(e),
                    this.overlay && (yield this.overlay.changeLanguage(e)),
                    Zr(this, qr, "f").setLang(this.language),
                    this._events.emit("change:language", this.language);
                } catch (e) {
                  y.kg.error(e);
                }
            });
          }
          changeAvatarGenerator() {
            return Kr(this, void 0, void 0, function* () {
              y.kg.warn("[DEPRECATED]: changeAvatarGenerator");
            });
          }
          generateAvatar(e, t) {
            return (0, jt.Z)(this.avatarGeneratorTemplate, e, t);
          }
          pause() {
            var e, t, n, i, r;
            return Kr(this, void 0, void 0, function* () {
              this.isPaused ||
                ((this.isPaused = !0),
                this._events.emit("pause"),
                (null !==
                  (n =
                    null ===
                      (t =
                        null === (e = Zr(this, Wr, "f")) || void 0 === e
                          ? void 0
                          : e.platformConfig) || void 0 === t
                      ? void 0
                      : t.showResumeOverlay) && void 0 !== n
                  ? n
                  : null ===
                      (r =
                        null === (i = Zr(this, Wr, "f")) || void 0 === i
                          ? void 0
                          : i.config) || void 0 === r
                  ? void 0
                  : r.showResumeOverlay) &&
                  (yield this.loadOverlay(),
                  yield this.overlay.showResumeOverlay()));
            });
          }
          resume() {
            this.isPaused &&
              ((this.isPaused = !1), this._events.emit("resume"));
          }
          gameStart() {
            return Kr(this, void 0, void 0, function* () {
              yield this.ready,
                this.isGameStarted ||
                  (this._events.emit("gameStart"), (this.isGameStarted = !0));
            });
          }
          gameplayStart() {
            return Kr(this, void 0, void 0, function* () {
              yield this.ready,
                this.isGameplay ||
                  ((this.isGameplay = !0), this._events.emit("gameplayStart"));
            });
          }
          gameplayStop() {
            return Kr(this, void 0, void 0, function* () {
              yield this.ready,
                this.isGameplay &&
                  ((this.isGameplay = !1), this._events.emit("gameplayStop"));
            });
          }
        }
        (Br = new WeakMap()),
          (Wr = new WeakMap()),
          (qr = new WeakMap()),
          (Vr = new WeakMap()),
          (Gr = new WeakSet()),
          (Yr = function (e) {
            var t;
            return Kr(this, void 0, void 0, function* () {
              const i = (0, a._)();
              this.ready = i.ready;
              const c =
                (null === (t = this._params) || void 0 === t
                  ? void 0
                  : t.get("callback")) || "onGPInit";
              this.ready.then((e) => {
                var t, n, i, r;
                this.onReady
                  ? this.onReady(e)
                  : (null === (n = (t = window)[c]) ||
                      void 0 === n ||
                      n.call(t, e),
                    "onGSInit" !== c &&
                      (null === (r = (i = window).onGSInit) ||
                        void 0 === r ||
                        r.call(i, e)));
              }),
                (this.fullscreen = new be()),
                (this.analytics = new Se()),
                (this.leaderboard = new M(this)),
                (this.documents = new lt(this)),
                (this.players = new $t(this)),
                (this.isMobile = r()({ tablet: !0, featureDetect: !0 })),
                (this.device = new zi());
              let { platformType: l, platformKey: h } = yield Ne(),
                u = (0, Sr.Yc)();
              (l !== L.z.GAME_DISTRIBUTION &&
                l !== L.z.GAMEPIX &&
                l !== L.z.WG_PLAYGROUND) ||
                (u = g.Uo.EN);
              const d = ts(
                "https://api.eponesh.com/gs/api,https://api.gamepush.com/gs/api",
                l,
                this.device.type,
                location.protocol
              );
              (this._storage = new E()), (this.storage = new Pr(this._storage));
              const p = e.servicesChunk({
                  apiUrl: d,
                  projectId: this.projectId,
                  publicToken: this.publicToken,
                  lang: u || g.Uo.EN,
                  platformType: l,
                  platformKey: h,
                  storage: this._storage,
                }),
                { apiClient: f, setupAnalytics: m } = p,
                v = (function (e, t) {
                  var n = {};
                  for (var i in e)
                    Object.prototype.hasOwnProperty.call(e, i) &&
                      t.indexOf(i) < 0 &&
                      (n[i] = e[i]);
                  if (
                    null != e &&
                    "function" == typeof Object.getOwnPropertySymbols
                  ) {
                    var r = 0;
                    for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                      t.indexOf(i[r]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
                        (n[i[r]] = e[i[r]]);
                  }
                  return n;
                })(p, ["apiClient", "setupAnalytics"]),
                w = (e) => {
                  f.setPlayerData(e);
                };
              Xr(this, qr, f, "f"),
                (this._services = v),
                (this._pointersManager = new yn()),
                Xr(this, Br, new hn(), "f");
              const P = {
                apiClient: f,
                gp: this,
                setupStorage: (e) => {
                  const t = `gs-db-project-${P.gp.projectId}`,
                    n = [...e],
                    i = [];
                  try {
                    null !== window.localStorage &&
                      n.push(new Ue.Z(this.projectId)),
                      null !== window.indexedDB &&
                        (n.push(new $e.Z(t)), i.push(new $e.Z(t)));
                  } catch (e) {}
                  return this._storage.setStorages(n, i), this._storage.ready;
                },
                fetchConfig: (e) =>
                  Kr(this, void 0, void 0, function* () {
                    yield this._storage.ready;
                    const [t, n, i, r] = yield Promise.all([
                      this._storage.loadLanguage(),
                      this._storage.loadConfig(),
                      this._storage.loadAdsInfo(),
                      Zr(this, Br, "f").getLanguage(this.name),
                    ]);
                    return (
                      t || this._storage.saveLanguage(null),
                      (this.language = r || t || e || u || g.Uo.EN),
                      Zr(this, qr, "f").setLang(this.language),
                      this._services.projectService
                        .fetchConfig()
                        .then((e) => {
                          var t, i;
                          const r = e || n,
                            { platformConfig: s } = r;
                          return (
                            (a =
                              (Hr.includes(s.type) &&
                                (Qr[
                                  null === (t = s.authConfig) || void 0 === t
                                    ? void 0
                                    : t.configs.web.activeService
                                ] ||
                                  Qr[
                                    null === (i = s.authConfig) || void 0 === i
                                      ? void 0
                                      : i.configs.android.activeService
                                  ])) ||
                              e.isDev),
                            f.setWithCookie(a),
                            (l !== L.z.NONE && l) ||
                              l === s.type ||
                              Zr(this, qr, "f").setPlatform(s.type, s.tag),
                            this._storage.setSaveInPlatformStorage(
                              !(0, pe.q)(s.progressSaveFormat).isLocalSave
                            ),
                            r
                          );
                          var a;
                        })
                        .catch((e) => (console.error(e), n))
                    );
                  }),
              };
              if (e.platformType && e.platformType !== l)
                throw new Error("wrong platform type");
              var b, T;
              (e.platformChunk
                ? e.platformChunk(P, l)
                : e.preparePlatform({ platformType: l, tools: P })
              )
                .then((e) =>
                  Kr(this, void 0, void 0, function* () {
                    const {
                      adsAdapter: t,
                      playerAdapter: r,
                      platformAdapter: a,
                      socialsAdapter: c,
                      paymentsAdapter: h,
                      projectConfig: u,
                      appAdapter: d,
                      analyticsCounters: p = [],
                    } = e;
                    if (
                      (Xr(this, Wr, u, "f"),
                      Xr(this, Vr, Date.parse(u.serverTime), "f"),
                      $((e) => {
                        Xr(this, Vr, Zr(this, Vr, "f") + e, "f");
                      }),
                      l !== L.z.GAMEPIX &&
                        l !== L.z.GAME_DISTRIBUTION &&
                        l !== L.z.WG_PLAYGROUND)
                    ) {
                      const { counters: e } = m(u.config);
                      e.forEach((e) => this.analytics.addCounter(e)),
                        p.forEach((e) => this.analytics.addCounter(e));
                    }
                    (this.avatarGenerator = u.config.avatarGenerator),
                      (this.avatarGeneratorTemplate =
                        u.config.avatarGeneratorTemplate),
                      (this.loader = (function (e) {
                        let t = 0;
                        const n = document.createElement("div");
                        function i() {
                          n.style.display = t > 0 ? "flex" : "none";
                        }
                        return (
                          n.classList.add("gs-global-loader"),
                          (n.innerHTML = `<div class="gs-loader ${
                            !e && "gs-loader-hidden"
                          }">\n        <div class="gs-loader__outter"></div>\n        <div class="gs-loader__inner"></div>\n    </div>`),
                          document.body.appendChild(n),
                          {
                            inc() {
                              (t += 1), i();
                            },
                            dec() {
                              (t = t <= 0 ? 0 : t - 1), i();
                            },
                          }
                        );
                      })(u.config.showLoader)),
                      this._storage.saveConfig(u);
                    const f = new fi();
                    if (
                      (f.on("updateServerTime", (e) => {
                        Xr(this, Vr, Date.parse(e), "f");
                      }),
                      (this.gamesCollections = new Be.Z(this, a)),
                      (this.platform = new o.Z(u.platformConfig, a)),
                      (this.ads = new s.Z(this, t, u)),
                      (this.app = new ke.Z(this, d, u)),
                      (this.socials = new Re.Z(c, this, u)),
                      (this.channels = new st(this, u)),
                      (this.player = new Pe({}, u.playerFields, r, this, f, w)),
                      (this.payments = new Ge.Z(this, f, h, u)),
                      (this.variables = new ft(this, a, u.gameVariables || [])),
                      (this.images = new Mt(this, u.acl)),
                      (this.files = new xt(this, u.acl)),
                      (this.achievements = new je.Z(this, f, u)),
                      (this.rewards = new Yn(this, f, a, u.rewards)),
                      (this.triggers = new hi(this, f, u)),
                      (this.schedulers = new Li(this, f, u.schedulers)),
                      (this.segments = new cr(this, f)),
                      (this.events = new Wi(this, f, u.events)),
                      (this.experiments = new tr(this, f)),
                      (this.uniques = new yr(this, f)),
                      (this.windows = new Ir(this)),
                      (this.sounds = new Fr(this)),
                      this.isDev)
                    ) {
                      (this.devtools = yield Promise.all([
                        n.e(5839),
                        n.e(9278),
                        n.e(9026),
                        n.e(5374),
                        n.e(9718),
                      ])
                        .then(n.bind(n, 2645))
                        .then((e) => e.default(this, f, u))),
                        u.config.showReqCounter &&
                          Zr(this, qr, "f").addCounterListener((e) => {
                            this.devtools.showCounter(e);
                          });
                      const e = new Ur(this, this.devtools);
                      this.player._setPlayerAdapter(e);
                    } else y.kg.stopCollect();
                    new Oe(this, this.isDev, Zr(this, Br, "f")),
                      this.player._setupOnBoot(),
                      Zr(this, Gr, "m", Jr).call(this),
                      Zr(this, Gr, "m", zr).call(this),
                      this.init(i);
                  })
                )
                .catch(y.kg.error),
                (b = () => this.pause()),
                (T = () => {
                  var e, t, n, i, r;
                  this.ads &&
                    (this.ads.isFullscreenPlaying ||
                      this.ads.isPreloaderPlaying ||
                      this.ads.isRewardedPlaying ||
                      (null !==
                        (n =
                          null ===
                            (t =
                              null === (e = Zr(this, Wr, "f")) || void 0 === e
                                ? void 0
                                : e.platformConfig) || void 0 === t
                            ? void 0
                            : t.showResumeOverlay) && void 0 !== n
                        ? n
                        : null ===
                            (r =
                              null === (i = Zr(this, Wr, "f")) || void 0 === i
                                ? void 0
                                : i.config) || void 0 === r
                        ? void 0
                        : r.showResumeOverlay) ||
                      this.resume());
                }),
                en.addEventListener("statechange", (e) => {
                  tn.includes(e.newState) ? b() : T();
                });
            });
          }),
          (zr = function () {
            const { showOrientationOverlay: e, orientation: t } = Zr(
                this,
                Wr,
                "f"
              ).config,
              n =
                e &&
                this.isMobile &&
                t != un.LH.Any &&
                this.device.type !== un.U7.Tv,
              i = () =>
                Kr(this, void 0, void 0, function* () {
                  var e;
                  n && !pn(t)
                    ? (yield this.loadOverlay(),
                      pn(t) || this.overlay.showOrientationOverlay(t))
                    : null === (e = this.overlay) ||
                      void 0 === e ||
                      e.closeOrientationOverlay();
                });
            var r;
            (r = (e) => {
              this._events.emit("change:orientation", e), i();
            }),
              window
                .matchMedia("(orientation: portrait)")
                .addEventListener("change", () =>
                  requestAnimationFrame(() => r(dn()))
                ),
              i();
          }),
          (Jr = function () {
            return Kr(this, void 0, void 0, function* () {
              const { showUnsupportedOSOverlay: e, targetOS: t } = Zr(
                this,
                Wr,
                "f"
              ).config;
              this.logger.info(`Running on ${this.device.type}`),
                e
                  ? this.logger.info(`allowed=(${t.join(",")})`)
                  : this.logger.info("no device restrictions"),
                e &&
                  !this.device._satisfies(t) &&
                  (this.logger.info(`${this.device.type} is restricted`),
                  yield this.loadOverlay(),
                  this.overlay.setUnsupportedDeviceOverlay({
                    allowed: t,
                    detected: this.device.type,
                  }));
            });
          });
        const ts = (e, t, n, i) =>
          e
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean)
            .map((e) =>
              ((e, t, n, i) =>
                t === L.z.VK && n === un.U7.Ios && "file:" === i
                  ? e.replace("https", "vkcors")
                  : e)(e, t, n, i)
            );
      },
      3080: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => j, M: () => $ });
        var i,
          r,
          s,
          a,
          o,
          c,
          l,
          h,
          u,
          d,
          p,
          f,
          m,
          v,
          y,
          g,
          w,
          P,
          b,
          E,
          T,
          S,
          A,
          _ = n(6558),
          I = n(1437),
          C = n(4835),
          O = n(8293),
          R = n(6388),
          k = n(6041),
          D = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          M = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          N = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          },
          L = function (e, t) {
            var n = {};
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) &&
                t.indexOf(i) < 0 &&
                (n[i] = e[i]);
            if (
              null != e &&
              "function" == typeof Object.getOwnPropertySymbols
            ) {
              var r = 0;
              for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                t.indexOf(i[r]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
                  (n[i[r]] = e[i[r]]);
            }
            return n;
          };
        const F = "already_unlocked",
          x = "achievement_not_found";
        class j extends R.Z {
          constructor(e, t, n) {
            super(),
              (this.gp = e),
              i.add(this),
              r.set(this, void 0),
              s.set(this, void 0),
              a.set(this, []),
              o.set(this, []),
              c.set(this, []),
              l.set(this, {}),
              h.set(this, {}),
              u.set(this, {}),
              d.set(this, {}),
              p.set(this, {}),
              f.set(this, {}),
              m.set(this, {}),
              v.set(this, new Set()),
              M(this, r, n.project.achievements, "f"),
              n.achievements.forEach((t) => {
                (t.name = t.names[e.language] || t.names.en),
                  (t.description =
                    t.descriptions[e.language] || t.descriptions.en),
                  (t.lockedIcon = (0, k.ZP)(t.lockedIcon, 256, 256, !1)),
                  (t.lockedIconSmall = (0, k.ZP)(t.lockedIcon, 48, 48, !1)),
                  (t.icon = (0, k.ZP)(t.icon, 256, 256, !1)),
                  (t.iconSmall = (0, k.ZP)(t.icon, 48, 48, !1));
              }),
              M(this, a, [...n.achievements], "f"),
              M(this, o, [...n.achievementsGroups], "f"),
              N(this, i, "m", T).call(this),
              N(this, i, "m", S).call(this),
              M(this, s, t, "f"),
              N(this, s, "f").on("setAchievementsList", (e) =>
                N(this, i, "m", b).call(this, e.achievements)
              ),
              N(this, s, "f").on("markAchievementsUnlocked", (e) => {
                e.forEach((e) => {
                  const { achievement: t, playerAchievement: n } = N(
                    this,
                    i,
                    "m",
                    P
                  ).call(this, e);
                  if (!t)
                    return void _.kg.error(`achievement not found, ID: ${e}`);
                  if (n)
                    return void _.kg.error(
                      `player achievement already unlocked, ID: ${e}, Tag: ${t.tag}`
                    );
                  const s = {
                    achievementId: t.id,
                    unlocked: !0,
                    progress: t.maxProgress || 0,
                    createdAt: new Date().toISOString(),
                  };
                  let a;
                  N(this, r, "f").enableUnlockToast &&
                    (a = this.gp.loadOverlay());
                  const o = Object.assign(Object.assign({}, t), s);
                  N(this, i, "m", E).call(this, o),
                    this._events.emit("unlock", o),
                    N(this, r, "f").enableUnlockToast &&
                      Promise.all([a, (0, I.p)($(o)).catch(_.kg.error)]).then(
                        () => {
                          this.gp.overlay.setNotificationDisplayTime(
                            N(this, r, "f").notificationDisplayTime
                          ),
                            this.gp.overlay.unlockAchievement(o);
                        }
                      );
                });
              }),
              this.gp.on("change:language", (e) => {
                N(this, a, "f").forEach((t) => {
                  (t.name = t.names[e] || t.names.en),
                    (t.description = t.descriptions[e] || t.descriptions.en);
                }),
                  N(this, o, "f").forEach((t) => {
                    (t.name = t.names[e] || t.names.en),
                      (t.description = t.descriptions[e] || t.descriptions.en);
                  }),
                  N(this, i, "m", T).call(this);
              });
          }
          get list() {
            return [...N(this, a, "f")];
          }
          get groupsList() {
            return [...N(this, o, "f")];
          }
          get playerAchievementsList() {
            return [...N(this, c, "f")];
          }
          get unlockedList() {
            return [...N(this, c, "f")];
          }
          open({ scrollTo: e } = {}) {
            return D(this, void 0, void 0, function* () {
              this.gp.loader.inc();
              try {
                const [t] = yield Promise.all([
                  this.fetch(),
                  this.gp.loadOverlay(),
                  (0, I.p)(C.Z.app.trophy).catch(_.kg.error),
                ]);
                this.gp.loader.dec(),
                  t.achievements.length > 0
                    ? (this._events.emit("open"),
                      yield this.gp.overlay
                        .openAchievements(t, { scrollTo: e })
                        .catch(_.kg.error),
                      this._events.emit("close"))
                    : _.kg.error(new Error("Empty achievements list"));
              } catch (e) {
                this.gp.loader.dec(), _.kg.error(e);
              }
            });
          }
          fetch() {
            return D(this, void 0, void 0, function* () {
              const e = (0, O._)();
              this.gp.loader.inc();
              try {
                const t = {
                  achievements: this.list,
                  achievementsGroups: this.groupsList,
                  playerAchievements: this.unlockedList,
                };
                e.done(t), this._events.emit("fetch", t);
              } catch (t) {
                e.abort(t), this._events.emit("error:fetch");
              } finally {
                this.gp.loader.dec();
              }
              return e.ready;
            });
          }
          unlock(e) {
            return D(this, void 0, void 0, function* () {
              const t = (0, O._)(),
                n = (n) => (
                  t.done({ success: !1, achievement: null, error: n }),
                  this._events.emit("error:unlock", n, { input: e }),
                  t.ready
                ),
                s = Number(e.id) || e.tag,
                { achievement: a, playerAchievement: o } = N(
                  this,
                  i,
                  "m",
                  P
                ).call(this, s);
              if (!a) return n(x);
              if (null == o ? void 0 : o.unlocked) return n(F);
              if (N(this, v, "f").has(a.id)) return n(F);
              let c;
              (N(this, l, "f")[s] = t),
                this.gp.loader.inc(),
                N(this, r, "f").enableUnlockToast &&
                  (c = this.gp.loadOverlay());
              const h = a.id;
              try {
                const e = yield this.gp._services.achievementsService.unlock({
                    id: h,
                  }),
                  { achievement: n } = e,
                  s = L(e, ["achievement"]),
                  a = Object.assign(Object.assign({}, n), s);
                N(this, i, "m", E).call(this, a),
                  this._events.emit("unlock", a),
                  N(this, r, "f").enableUnlockToast &&
                    Promise.all([c, (0, I.p)($(a)).catch(_.kg.error)]).then(
                      () => {
                        this.gp.overlay.setNotificationDisplayTime(
                          N(this, r, "f").notificationDisplayTime
                        ),
                          this.gp.overlay.unlockAchievement(a);
                      }
                    ),
                  t.done({ achievement: a, success: !0, error: "" });
              } catch (i) {
                "string" == typeof i
                  ? (i === F && N(this, v, "f").add(a.id), _.kg.error(i), n(i))
                  : (t.abort(i),
                    this._events.emit("error:unlock", i, { input: e }));
              } finally {
                this.gp.loader.dec();
              }
              return (
                t.ready.finally(() => {
                  delete N(this, l, "f")[s];
                }),
                t.ready
              );
            });
          }
          getAchievement(e) {
            return N(this, i, "m", P).call(this, e);
          }
          has(e) {
            var t;
            return !!(null ===
              (t = N(this, i, "m", P).call(this, e).playerAchievement) ||
            void 0 === t
              ? void 0
              : t.unlocked);
          }
          setProgress(e) {
            var t;
            return D(this, void 0, void 0, function* () {
              const n = (0, O._)(),
                s = (t) => (
                  n.done({ success: !1, achievement: null, error: t }),
                  this._events.emit("error:progress", t, { input: e }),
                  n.ready
                ),
                a = Number(e.id) || e.tag,
                { achievement: o } = N(this, i, "m", P).call(this, a);
              return o
                ? a in N(this, h, "f")
                  ? ((N(this, h, "f")[a] = e.progress),
                    null === (t = N(this, u, "f")[a]) || void 0 === t
                      ? void 0
                      : t.ready)
                  : ((N(this, h, "f")[a] = e.progress),
                    (N(this, u, "f")[a] = n),
                    setTimeout(
                      () =>
                        D(this, void 0, void 0, function* () {
                          const t = N(this, h, "f")[a],
                            { playerAchievement: c } = N(this, i, "m", P).call(
                              this,
                              a
                            );
                          if (N(this, v, "f").has(o.id)) return s(F);
                          if (null == c ? void 0 : c.unlocked) return s(F);
                          const l = (null == c ? void 0 : c.progress) || 0;
                          if (l === t) return s("progress_the_same");
                          let u;
                          this.gp.loader.inc(),
                            N(this, r, "f").enableUnlockToast &&
                              (u = this.gp.loadOverlay()),
                            yield this.gp._services.achievementsService
                              .setProgress(
                                Object.assign(Object.assign({}, e), {
                                  progress: t,
                                })
                              )
                              .then((e) => {
                                var { achievement: t } = e,
                                  s = L(e, ["achievement"]);
                                const a = Object.assign(
                                    Object.assign({}, t),
                                    s
                                  ),
                                  o = Math.floor(l / a.progressStep),
                                  c = Math.floor(a.progress / a.progressStep);
                                N(this, i, "m", E).call(this, s),
                                  N(this, r, "f").enableUnlockToast &&
                                    (a.unlocked || o < c) &&
                                    Promise.all([
                                      u,
                                      (0, I.p)($(a)).catch(_.kg.error),
                                    ]).then(() => {
                                      this.gp.overlay.setNotificationDisplayTime(
                                        N(this, r, "f").notificationDisplayTime
                                      ),
                                        this.gp.overlay.unlockAchievement(a);
                                    }),
                                  a.unlocked && this._events.emit("unlock", a),
                                  this._events.emit("progress", a),
                                  n.done({
                                    achievement: a,
                                    success: !0,
                                    error: "",
                                  });
                              })
                              .catch((t) => {
                                "string" == typeof t
                                  ? (t === F && N(this, v, "f").add(o.id),
                                    _.kg.error(t),
                                    s(t))
                                  : (n.abort(t),
                                    this._events.emit("error:progress", t, {
                                      input: e,
                                    }));
                              }),
                            this.gp.loader.dec();
                        }),
                      1e3
                    ),
                    n.ready.finally(() => {
                      delete N(this, u, "f")[a], delete N(this, h, "f")[a];
                    }),
                    n.ready)
                : s(x);
            });
          }
          getProgress(e) {
            const { achievement: t, playerAchievement: n } = N(
              this,
              i,
              "m",
              P
            ).call(this, e);
            return t && n ? n.progress : 0;
          }
        }
        function $(e) {
          let t = "";
          return (
            (t =
              window.devicePixelRatio > 1
                ? e.unlocked
                  ? e.icon || e.lockedIcon
                  : e.lockedIcon || e.icon
                : e.unlocked
                ? e.iconSmall || e.lockedIconSmall
                : e.lockedIconSmall || e.iconSmall),
            t || C.Z.cdn.trophy
          );
        }
        (r = new WeakMap()),
          (s = new WeakMap()),
          (a = new WeakMap()),
          (o = new WeakMap()),
          (c = new WeakMap()),
          (l = new WeakMap()),
          (h = new WeakMap()),
          (u = new WeakMap()),
          (d = new WeakMap()),
          (p = new WeakMap()),
          (f = new WeakMap()),
          (m = new WeakMap()),
          (v = new WeakMap()),
          (i = new WeakSet()),
          (y = function (e) {
            return N(this, d, "f")[e] || N(this, p, "f")[e];
          }),
          (g = function (e) {
            return N(this, f, "f")[e];
          }),
          (w = function (e) {
            return N(this, o, "f")[e];
          }),
          (P = function (e) {
            const t = {
                achievement: null,
                playerAchievement: null,
                achievementGroup: null,
              },
              n = N(this, i, "m", y).call(this, e);
            if (!n) return t;
            t.achievement = n;
            const r = N(this, i, "m", g).call(this, n.id);
            r && (t.playerAchievement = r);
            const s = N(this, i, "m", w).call(this, n.id);
            return s && (t.achievementGroup = s), t;
          }),
          (b = function (e) {
            M(this, c, [...e], "f"), N(this, i, "m", A).call(this);
          }),
          (E = function (e) {
            N(this, c, "f").some((t) => t.achievementId === e.achievementId)
              ? M(
                  this,
                  c,
                  N(this, c, "f").map((t) =>
                    t.achievementId === e.achievementId ? e : t
                  ),
                  "f"
                )
              : N(this, c, "f").push(e),
              N(this, i, "m", A).call(this);
          }),
          (T = function () {
            M(this, d, {}, "f"),
              M(this, p, {}, "f"),
              N(this, a, "f").forEach((e) => {
                (N(this, d, "f")[e.id] = e), (N(this, p, "f")[e.tag] = e);
              });
          }),
          (S = function () {
            M(this, m, {}, "f"),
              N(this, o, "f").forEach((e) => {
                N(this, m, "f")[e.id] = e;
              });
          }),
          (A = function () {
            M(this, f, {}, "f"),
              N(this, c, "f").forEach((e) => {
                N(this, f, "f")[e.achievementId] = e;
              });
          });
      },
      7791: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => p });
        var i = n(6558),
          r = n(1437),
          s = n(4835),
          a = n(8293),
          o = n(5942),
          c = n(6388),
          l = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        const h = (e) => {
            var t;
            return (
              (null === (t = null == e ? void 0 : e.resources[0]) ||
              void 0 === t
                ? void 0
                : t.src) || ""
            );
          },
          u = (e) => {
            var { assets: t } = e,
              n = (function (e, t) {
                var n = {};
                for (var i in e)
                  Object.prototype.hasOwnProperty.call(e, i) &&
                    t.indexOf(i) < 0 &&
                    (n[i] = e[i]);
                if (
                  null != e &&
                  "function" == typeof Object.getOwnPropertySymbols
                ) {
                  var r = 0;
                  for (i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                    t.indexOf(i[r]) < 0 &&
                      Object.prototype.propertyIsEnumerable.call(e, i[r]) &&
                      (n[i[r]] = e[i[r]]);
                }
                return n;
              })(e, ["assets"]);
            return Object.assign(Object.assign({}, n), { icon: h(t.icon) });
          },
          d = [o.z.YANDEX, o.z.VK, o.z.OK, o.z.GAMEPIX, o.z.Y8];
        class p extends c.Z {
          constructor(e, t) {
            super(), (this.gp = e), (this.adapter = t);
          }
          get isAvailable() {
            var e;
            return null !== (e = this.adapter.isGamesCollectionsAllowed) &&
              void 0 !== e
              ? e
              : this.gp.platform.isExternalLinksAllowed ||
                  d.includes(this.gp.platform.type);
          }
          open(
            { id: e, tag: t, shareParams: n } = { tag: "ALL", shareParams: {} }
          ) {
            return l(this, void 0, void 0, function* () {
              if (this.isAvailable) {
                this.gp.loader.inc();
                try {
                  const [a] = yield Promise.all([
                    this.fetch({ id: e, tag: t, shareParams: n }),
                    this.gp.loadOverlay(),
                    (0, r.p)(s.Z.app.trophy).catch(i.kg.error),
                  ]);
                  this.gp.loader.dec(),
                    a.games.length > 0 &&
                      (this._events.emit("open"),
                      yield this.gp.overlay
                        .openGamesCollections(a)
                        .catch(i.kg.error),
                      this._events.emit("close"));
                } catch (e) {
                  this.gp.loader.dec(), i.kg.error(e);
                }
              } else i.kg.warn(`Not available on ${this.gp.platform.type}`);
            });
          }
          fetch(
            { id: e, tag: t = "ALL", shareParams: n = {} } = {
              tag: "ALL",
              shareParams: {},
            }
          ) {
            return l(this, void 0, void 0, function* () {
              if (!this.isAvailable)
                return void i.kg.warn(
                  `Not available on ${this.gp.platform.type}`
                );
              const r = (0, a._)();
              this.gp.loader.inc();
              try {
                const s = yield this.gp._services.gamesCollectionsService.fetch(
                  { id: e, tag: t, urlFrom: this.gp.app.url }
                );
                if (!s) throw new Error("can't fetch GamesCollections list");
                const a = yield this.adapter.mapGamesCollections(s.games),
                  o = Object.assign(Object.assign({}, s), {
                    games: a.filter((e) => e.url).map(u),
                  });
                Object.keys(n).length > 0 &&
                  (o.games = o.games.map((e) =>
                    Object.assign(Object.assign({}, e), {
                      url: this.gp.socials.addShareParamsToUrl(e.url, n),
                    })
                  )),
                  o.games || i.kg.warn("empty games collection"),
                  r.done(o),
                  this._events.emit("fetch", o);
              } catch (e) {
                r.abort(e), this._events.emit("error:fetch");
              } finally {
                this.gp.loader.dec();
              }
              return r.ready;
            });
          }
        }
      },
      4687: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => k });
        var i,
          r,
          s,
          a,
          o,
          c,
          l,
          h,
          u,
          d,
          p,
          f,
          m,
          v,
          y,
          g,
          w = n(6558),
          P = n(8293),
          b = n(1438),
          E = n(6388),
          T = n(5942),
          S = n(6041),
          A = n(8866),
          _ = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          I = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          C = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        const O = "product_not_found",
          R = "product price empty";
        class k extends E.Z {
          constructor(e, t, n, f) {
            super(),
              (this.gp = e),
              (this.adapter = n),
              i.add(this),
              r.set(this, void 0),
              s.set(this, []),
              a.set(this, []),
              o.set(this, {}),
              c.set(this, {}),
              l.set(this, {}),
              h.set(this, {}),
              u.set(this, {}),
              I(this, a, f.products, "f"),
              C(this, i, "m", y).call(this),
              I(this, r, t, "f"),
              C(this, r, "f").on("setPurchasedList", (e) =>
                C(this, i, "m", v).call(this, e.playerPurchases)
              ),
              C(this, r, "f").on("markPurchasesGiven", (e) => {
                e.forEach((e) => {
                  const { product: t } = C(this, i, "m", p).call(this, e);
                  if (!t) return void w.kg.error(`product not found, ID: ${e}`);
                  const n = {
                    productId: t.id,
                    tag: t.tag,
                    payload: {},
                    createdAt: this.gp.serverTime,
                    expiredAt: t.isSubscription
                      ? ((r = this.gp.serverTime),
                        (a = t.period),
                        D(new Date(r), a).toISOString())
                      : "",
                    gift: !0,
                    subscribed: t.isSubscription,
                    orderStatus: b.i.Paid,
                  };
                  var r, a;
                  C(this, s, "f").push(n),
                    C(this, i, "m", g).call(this),
                    this._events.emit(
                      t.isSubscription ? "subscribe" : "purchase",
                      { product: t, purchase: n }
                    );
                });
              }),
              C(this, r, "f").on("syncPurchases", (e) =>
                C(this, i, "m", d).call(this).finally(e)
              ),
              this.gp.on("change:language", (e) => {
                C(this, a, "f").forEach((t) => {
                  (t.name = t.names[e] || t.names.en),
                    (t.description = t.descriptions[e] || t.descriptions.en);
                }),
                  C(this, i, "m", y).call(this);
              }),
              this.adapter.mapProducts(this.gp, this.products).then((t) => {
                I(this, a, t, "f"),
                  C(this, a, "f").forEach((t) => {
                    (t.name = t.names[e.language] || t.names.en),
                      (t.description =
                        t.descriptions[e.language] || t.descriptions.en),
                      (t.icon = (0, S.ZP)(t.icon, 256, 256, !1)),
                      (t.iconSmall = (0, S.ZP)(t.icon, 48, 48, !1));
                  }),
                  C(this, i, "m", y).call(this);
              });
          }
          get isAvailable() {
            return this.adapter.isSupportsPayments;
          }
          get isSubscriptionsAvailable() {
            return this.adapter.isSupportsSubscriptions;
          }
          get products() {
            return [...C(this, a, "f")];
          }
          get purchases() {
            return [...C(this, s, "f")];
          }
          fetchProducts() {
            return _(this, void 0, void 0, function* () {
              const e = (0, P._)();
              this.gp.loader.inc();
              try {
                const t = this.purchases,
                  n = yield this.adapter.mapProducts(this.gp, this.products);
                I(this, a, n, "f"),
                  C(this, i, "m", y).call(this),
                  e.done({ products: n, playerPurchases: t }),
                  this._events.emit("fetchProducts", {
                    products: n,
                    playerPurchases: t,
                  });
              } catch (t) {
                e.abort(t), this._events.emit("error:fetchProducts", t);
              } finally {
                this.gp.loader.dec();
              }
              return e.ready;
            });
          }
          purchase(e) {
            return _(this, void 0, void 0, function* () {
              const t = Number(e.id) || e.tag;
              if (C(this, o, "f")[t]) throw new Error("payment_in_progress");
              const n = (0, P._)(),
                r = (t) => (
                  n.abort(t),
                  this._events.emit("error:purchase", t, { input: e }),
                  n.ready
                ),
                { product: a } = C(this, i, "m", p).call(this, t);
              if (!a) return r(O);
              if (!a.price) return r(R);
              n.ready.finally(() => {
                delete C(this, o, "f")[t];
              }),
                (C(this, o, "f")[t] = n),
                this.gp.loader.inc();
              try {
                let e,
                  t,
                  o = !0,
                  c = null,
                  l = "";
                if (
                  !this.gp.player.isLoggedInByPlatform &&
                  this.adapter.isNeedAuthorizeBeforePurchase
                )
                  if (
                    this.gp.platform.type === T.z.YANDEX ||
                    this.gp.platform.type === T.z.PARTNER ||
                    this.gp.isDev
                  ) {
                    if (!(yield this.gp.player.login({ withSecretCode: !1 })))
                      return r("user_not_logged_in");
                  } else yield this.gp.player.sync({ silent: !1 });
                else
                  this.gp.player.isLoggedInByPlatform &&
                    !this.gp.player.credentials &&
                    (yield this.gp.player.sync());
                try {
                  t = yield this.adapter.purchase(a);
                } catch (e) {
                  throw e;
                }
                if (this.adapter.isServerValidation) {
                  try {
                    c = yield this.checkPurchaseStatus(
                      this.gp.projectId,
                      "",
                      t,
                      this.gp.player.id,
                      a.id,
                      null == t ? void 0 : t.withOrderStatus
                    );
                  } catch (e) {
                    (o = !1), (l = e.message);
                  }
                  e = {
                    _id: (null == c ? void 0 : c._id) || "",
                    productId: a.id,
                    tag: a.tag,
                    payload: t,
                    createdAt: this.gp.serverTime,
                    expiredAt: "",
                    gift: !1,
                    orderStatus: b.i.Paid,
                    subscribed: !1,
                  };
                } else
                  try {
                    e = (yield this.gp._services.paymentsService.purchase({
                      id: a.id,
                      payload: t,
                    })).purchase;
                  } catch (e) {
                    (o = !1), (l = e.message);
                  }
                if (!o) throw l;
                C(this, s, "f").push({
                  _id:
                    (null == c ? void 0 : c._id) ||
                    (null == e ? void 0 : e._id) ||
                    "",
                  productId: a.id,
                  tag: a.tag,
                  createdAt: e.createdAt,
                  expiredAt: e.expiredAt,
                  payload: e.payload,
                  gift: e.gift,
                  orderStatus: e.orderStatus,
                  subscribed: e.subscribed,
                }),
                  C(this, i, "m", g).call(this),
                  this._events.emit("purchase", { product: a, purchase: e }),
                  this.gp.analytics.trackPurchase(e, a),
                  this.gp.analytics.goal("money_spent", {
                    value: a.price,
                    currency: a.currency,
                  }),
                  n.done({ success: o, product: a, purchase: e, error: l });
              } catch (e) {
                r(e);
              } finally {
                this.gp.loader.dec();
              }
              return n.ready;
            });
          }
          consume(e) {
            return _(this, void 0, void 0, function* () {
              const t = Number(e.id) || e.tag;
              C(this, c, "f")[t] && (yield C(this, c, "f")[t]);
              const n = (0, P._)(),
                r = (t) => (
                  n.abort(t),
                  this._events.emit("error:consume", t, { input: e }),
                  n.ready
                );
              let { purchase: a, product: o } = C(this, i, "m", p).call(
                this,
                t
              );
              if (!o) return r(O);
              (C(this, c, "f")[t] = n), this.gp.loader.inc();
              const l = o.id;
              try {
                if (!(null == a ? void 0 : a.needConsumeOnlyOnPlatform)) {
                  const e = yield this.gp._services.paymentsService.consume({
                    id: l,
                  });
                  (a = e.purchase), (o = e.product);
                }
                a.gift || (yield this.adapter.consume(a));
                const e = C(this, s, "f").findIndex(
                  (e) => e.productId === o.id
                );
                -1 !== e &&
                  (C(this, s, "f").splice(e, 1), C(this, i, "m", g).call(this)),
                  this._events.emit("consume", { product: o, purchase: a }),
                  n.done({ product: o, purchase: a, success: !0, error: "" });
              } catch (e) {
                r(e);
              } finally {
                this.gp.loader.dec();
              }
              return (
                n.ready.finally(() => {
                  delete C(this, c, "f")[t];
                }),
                n.ready
              );
            });
          }
          subscribe(e) {
            return _(this, void 0, void 0, function* () {
              const t = Number(e.id) || e.tag;
              if (C(this, o, "f")[t]) return C(this, o, "f")[t];
              const n = (0, P._)(),
                r = (t) => (
                  n.abort(t),
                  this._events.emit("error:subscribe", t, { input: e }),
                  n.ready
                ),
                { product: a, purchase: c } = C(this, i, "m", p).call(this, t);
              if (!a) return r(O);
              if (!a.price) return r(R);
              (C(this, o, "f")[t] = n), this.gp.loader.inc();
              try {
                if (!a.isSubscription)
                  throw new Error(
                    `Not subscription "${t}", please enable subscription on the product`
                  );
                let e,
                  o,
                  l = !0,
                  h = null,
                  u = "";
                if (
                  !this.gp.player.isLoggedInByPlatform &&
                  this.adapter.isNeedAuthorizeBeforePurchase
                )
                  if (
                    this.gp.platform.type === T.z.YANDEX ||
                    this.gp.platform.type === T.z.PARTNER
                  ) {
                    if (!(yield this.gp.player.login({ withSecretCode: !1 })))
                      return r("user_not_logged_in");
                  } else yield this.gp.player.sync({ silent: !1 });
                else
                  this.gp.player.isLoggedInByPlatform &&
                    !this.gp.player.credentials &&
                    (yield this.gp.player.sync());
                try {
                  o = yield this.adapter.subscribe(a, c);
                } catch (e) {
                  throw e;
                }
                if (this.adapter.isServerValidation) {
                  try {
                    h = yield this.checkPurchaseStatus(
                      this.gp.projectId,
                      "",
                      o,
                      this.gp.player.id,
                      a.id,
                      null == o ? void 0 : o.withOrderStatus
                    );
                  } catch (e) {
                    (l = !1), (u = e.message);
                  }
                  e = {
                    _id: (null == h ? void 0 : h._id) || "",
                    productId: a.id,
                    tag: a.tag,
                    payload: o,
                    createdAt: this.gp.serverTime,
                    expiredAt: "",
                    gift: !1,
                    orderStatus: b.i.Paid,
                    subscribed: !1,
                  };
                } else
                  try {
                    e = (yield this.gp._services.paymentsService.purchase({
                      id: a.id,
                      payload: o,
                    })).purchase;
                  } catch (e) {
                    (l = !1), (u = e.message);
                  }
                l
                  ? (c &&
                      I(
                        this,
                        s,
                        C(this, s, "f").filter(
                          (e) => e.productId !== c.productId
                        ),
                        "f"
                      ),
                    C(this, s, "f").push({
                      _id:
                        (null == h ? void 0 : h._id) ||
                        (null == e ? void 0 : e._id) ||
                        "",
                      tag: a.tag,
                      productId: a.id,
                      createdAt: e.createdAt,
                      expiredAt: e.expiredAt,
                      payload: e.payload,
                      gift: e.gift,
                      subscribed: !0,
                      orderStatus: e.orderStatus,
                    }),
                    C(this, i, "m", g).call(this),
                    this.gp.analytics.trackPurchase(e, a),
                    this._events.emit("subscribe", { product: a, purchase: e }))
                  : w.kg.error(u),
                  n.done({ success: l, product: a, purchase: e, error: u });
              } catch (e) {
                r(e);
              } finally {
                this.gp.loader.dec();
              }
              return (
                n.ready.finally(() => {
                  delete C(this, o, "f")[t];
                }),
                n.ready
              );
            });
          }
          unsubscribe(e) {
            return _(this, void 0, void 0, function* () {
              const t = Number(e.id) || e.tag;
              if (C(this, o, "f")[t]) return C(this, o, "f")[t];
              const n = (0, P._)(),
                r = (t) => (
                  n.abort(t),
                  this._events.emit("error:unsubscribe", t, { input: e }),
                  n.ready
                ),
                { product: a, purchase: c } = C(this, i, "m", p).call(this, t);
              if (!a) return r(O);
              (C(this, o, "f")[t] = n), this.gp.loader.inc();
              try {
                if (!a.isSubscription)
                  throw new Error(
                    `Not subscription "${t}", please enable subscription on the product`
                  );
                if (!c || !c.subscribed)
                  throw new Error("already_unsubscribed");
                let e = !0,
                  r = Object.assign({}, c),
                  o = "";
                try {
                  yield this.adapter.unsubscribe(a, c);
                } catch (e) {
                  throw (w.kg.error(o), e);
                }
                (r.subscribed = !1),
                  I(
                    this,
                    s,
                    C(this, s, "f").map((e) =>
                      e.productId !== c.productId
                        ? e
                        : Object.assign(Object.assign({}, e), {
                            subscribed: !1,
                          })
                    ),
                    "f"
                  ),
                  C(this, i, "m", g).call(this),
                  this._events.emit("unsubscribe", { product: a, purchase: r }),
                  n.done({ success: e, product: a, purchase: r, error: o });
              } catch (e) {
                r(e);
              } finally {
                this.gp.loader.dec();
              }
              return (
                n.ready.finally(() => {
                  delete C(this, o, "f")[t];
                }),
                n.ready
              );
            });
          }
          checkPurchaseStatus(e, t, n, i, r, s = !0) {
            return _(this, void 0, void 0, function* () {
              const a = (0, P._)();
              let o = 0;
              const c = () =>
                _(this, void 0, void 0, function* () {
                  try {
                    const o =
                      yield this.gp._services.paymentsService.getPlayerPurchase(
                        {
                          projectId: e,
                          purchaseId: t,
                          payload: n,
                          playerId: i,
                          productId: r,
                          orderStatus: s ? b.i.Paid : void 0,
                        }
                      );
                    return (
                      (!0 === o.subscribed || o.orderStatus === b.i.Paid) &&
                      (a.done(o), !0)
                    );
                  } catch (e) {
                    if ("internal_error" === e)
                      throw new Error(`purchase:error ${e}`);
                    if ("db: Ð½Ð¸Ñ‡ÐµÐ³Ð¾ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾" === e) return !1;
                    throw new Error(`Error during purchase status check: ${e}`);
                  }
                });
              for (; o < 15; )
                try {
                  if (yield c()) break;
                  if ((o++, o >= 15)) {
                    a.abort("purchase_timeout");
                    break;
                  }
                  yield (0, A.Z)(5e3);
                } catch (e) {
                  a.abort(e);
                  break;
                }
              return a.ready;
            });
          }
          has(e) {
            return !!C(this, i, "m", p).call(this, e).purchase;
          }
          getProduct(e) {
            return C(this, i, "m", p).call(this, e).product;
          }
          getPurchase(e) {
            return C(this, i, "m", p).call(this, e).purchase;
          }
        }
        function D(e, t) {
          const n = new Date(e);
          return n.setDate(n.getDate() + t), n;
        }
        (r = new WeakMap()),
          (s = new WeakMap()),
          (a = new WeakMap()),
          (o = new WeakMap()),
          (c = new WeakMap()),
          (l = new WeakMap()),
          (h = new WeakMap()),
          (u = new WeakMap()),
          (i = new WeakSet()),
          (d = function () {
            return _(this, void 0, void 0, function* () {
              const { purchases: e, payload: t } =
                yield this.adapter.fetchPurchases();
              if (0 === e.length) return;
              const { purchases: n } =
                yield this.gp._services.paymentsService.sync({
                  purchases: e,
                  payload: t,
                });
              C(this, i, "m", v).call(this, n),
                this.adapter.consumeAllExpired(this.products, e, n);
            });
          }),
          (p = function (e) {
            const t = { product: null, purchase: null },
              n = C(this, i, "m", f).call(this, e);
            if (!n) return t;
            t.product = n;
            const r = C(this, i, "m", m).call(this, n.id);
            return r && (t.purchase = r), t;
          }),
          (f = function (e) {
            return C(this, l, "f")[e] || C(this, h, "f")[e];
          }),
          (m = function (e) {
            return C(this, u, "f")[e];
          }),
          (v = function (e) {
            I(
              this,
              s,
              e.map((e) =>
                Object.assign(Object.assign({}, e), { id: e.productId })
              ),
              "f"
            ),
              C(this, i, "m", g).call(this);
          }),
          (y = function () {
            I(this, l, {}, "f"),
              I(this, h, {}, "f"),
              C(this, a, "f").forEach((e) => {
                (C(this, l, "f")[e.id] = e), (C(this, h, "f")[e.tag] = e);
              });
          }),
          (g = function () {
            I(
              this,
              s,
              C(this, s, "f").reduce((e, t) => {
                const n = C(this, i, "m", f).call(this, t.productId);
                return (
                  n &&
                    e.push(
                      Object.assign(Object.assign({}, t), {
                        id: n.id,
                        tag: n.tag,
                      })
                    ),
                  e
                );
              }, []),
              "f"
            ),
              I(this, u, {}, "f"),
              C(this, s, "f").forEach((e) => {
                C(this, u, "f")[e.productId] = e;
              });
          });
      },
      8276: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => d, o: () => f });
        var i,
          r = n(6438),
          s = n(180),
          a = n(6388),
          o = n(6558),
          c = n(8866),
          l = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          h = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          },
          u = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class d extends a.Z {
          constructor(e, t, n) {
            super(),
              (this.gp = e),
              (this.adapter = t),
              (this.config = n),
              (this.isAdblockEnabled = !1),
              (this.fullscreenDisplayIntervalId = 0),
              (this.stickyRefreshIntervalId = 0),
              (this.isStickyPlaying = !1),
              (this.isRewardedPlaying = !1),
              (this.isFullscreenPlaying = !1),
              (this.isPreloaderPlaying = !1),
              i.set(this, 0),
              (this.adsInfo = e._storage.temp.adsInfo);
            const r = this.config.platformConfig.banners;
            (this.stickyBanner = r.find((e) => e.type === s.$.STICKY)),
              (this.fullscreenBanner = r.find(
                (e) => e.type === s.$.FULLSCREEN
              )),
              (this.rewardedVideo = r.find((e) => e.type === s.$.REWARDED)),
              (this.preloaderBanner = r.find((e) => e.type === s.$.PRELOADER)),
              (this.banners = r.reduce((e, t) => ((e[t.type] = t), e), {})),
              this._checkLimitsExpired(!0),
              setInterval(() => this._checkLimitsExpired(!1), 1e3);
          }
          get needToLeaveFullscreenBeforeAds() {
            return this.adapter.needToLeaveFullscreenBeforeAds;
          }
          get isAllowedToResumeGameplay() {
            return (
              !this.isPreloaderPlaying &&
              !this.isFullscreenPlaying &&
              !this.isRewardedPlaying
            );
          }
          get isStickyAvailable() {
            var e;
            return (
              this.adapter.isStickyAvailable &&
              (null === (e = this.stickyBanner) || void 0 === e
                ? void 0
                : e.enabled) &&
              !this.isBannerLimitReached(s.$.STICKY)
            );
          }
          get isFullscreenAvailable() {
            var e;
            return (
              !this.isFullscreenPlaying &&
              !this.isRewardedPlaying &&
              !this.isPreloaderPlaying &&
              this.adapter.isFullscreenAvailable &&
              (null === (e = this.fullscreenBanner) || void 0 === e
                ? void 0
                : e.enabled) &&
              !this.fullscreenDisplayIntervalId &&
              !this.isBannerLimitReached(s.$.FULLSCREEN)
            );
          }
          get isRewardedAvailable() {
            var e;
            return (
              !this.isFullscreenPlaying &&
              !this.isRewardedPlaying &&
              !this.isPreloaderPlaying &&
              this.adapter.isRewardedAvailable &&
              (null === (e = this.rewardedVideo) || void 0 === e
                ? void 0
                : e.enabled) &&
              !this.isBannerLimitReached(s.$.REWARDED)
            );
          }
          get isPreloaderAvailable() {
            var e;
            return (
              !this.isFullscreenPlaying &&
              !this.isRewardedPlaying &&
              !this.isPreloaderPlaying &&
              this.adapter.isPreloaderAvailable &&
              (null === (e = this.preloaderBanner) || void 0 === e
                ? void 0
                : e.enabled) &&
              !this.isBannerLimitReached(s.$.PRELOADER)
            );
          }
          get isCountdownOverlayEnabled() {
            return this.config.project.ads.showCountdownOverlay;
          }
          get isRewardedFailedOverlayEnabled() {
            return this.config.project.ads.showRewardedFailedOverlay;
          }
          get canShowFullscreenBeforeGamePlay() {
            return this.adapter.canShowFullscreenBeforeGamePlay;
          }
          get needToShowResumeOverlay() {
            var e;
            return null !==
              (e = this.config.platformConfig.showResumeOverlay) && void 0 !== e
              ? e
              : this.config.config.showResumeOverlay;
          }
          checkAdblock() {
            return l(this, void 0, void 0, function* () {
              return (
                (this.isAdblockEnabled = yield (0, r.Z)()),
                this.gp.logger.info(
                  "adblock is " +
                    (this.isAdblockEnabled ? "detected" : "not detected")
                ),
                this.isAdblockEnabled
              );
            });
          }
          sendShowAdsInfo(e, t = 0) {
            if (this.config.acl.canCollectStats)
              try {
                const n =
                  "https://api.eponesh.com/gs/api,https://api.gamepush.com/gs/api"
                    .split(",")
                    .map((e) => e.trim())
                    .filter(Boolean);
                if (t >= n.length) return void h(this, i, 0, "f");
                const r = n[u(this, i, "f")];
                fetch(
                  `${r}/t/b/?q=${btoa(
                    JSON.stringify(
                      Object.assign(Object.assign({}, e), {
                        platformType: this.gp.platform.type,
                        customPlatformTag: this.gp.platform.tag,
                        projectId: this.gp.projectId,
                      })
                    )
                  )}`
                ).catch((n) => {
                  if (
                    String(null == n ? void 0 : n.message).includes(
                      "Failed to fetch"
                    )
                  )
                    return (
                      h(this, i, t + 1, "f"),
                      this.sendShowAdsInfo(e, u(this, i, "f"))
                    );
                  throw n;
                });
              } catch (e) {
                console.error(e);
              }
          }
          showFullscreen({ showCountdownOverlay: e = !1 } = {}) {
            return l(this, void 0, void 0, function* () {
              if (
                (yield this.gp._pointersManager.waitForPointersUp(),
                !this.isFullscreenAvailable)
              )
                return (
                  this._events.emit("close", !1),
                  this._events.emit("fullscreen:close", !1),
                  !1
                );
              this._events.emit("start"),
                this._events.emit("fullscreen:start"),
                this.sendShowAdsInfo({ type: "FULLSCREEN", action: "REQUEST" }),
                this.gp.analytics.goal("ad_request", "FULLSCREEN"),
                (this.fullscreenDisplayIntervalId = window.setTimeout(() => {
                  this.fullscreenDisplayIntervalId = 0;
                }, 1e3 * this.fullscreenBanner.frequency)),
                (this.isFullscreenPlaying = !0);
              const t = e || this.isCountdownOverlayEnabled,
                n = this.gp.fullscreen.isEnabled,
                i = n && this.adapter.needToLeaveFullscreenBeforeAds;
              (t || i) && (yield this.gp.loadOverlay()),
                t &&
                  (yield this.gp.loadOverlay(),
                  this.gp.overlay.showPreAdCountdownOverlay(),
                  yield (0, c.Z)(2e3)),
                i && (this.gp.fullscreen.close(), yield (0, c.Z)(200));
              let r = !1;
              try {
                r = !!(yield this.adapter.showFullscreen(
                  this.fullscreenBanner
                ));
              } catch (e) {
                o.kg.error(e);
              }
              return (
                this.sendShowAdsInfo({
                  type: "FULLSCREEN",
                  action: r ? "DISPLAY" : "ERROR",
                }),
                t || i
                  ? (this.gp.overlay.closePreAdCountdownOverlay(),
                    yield this.gp.overlay.showPreAdCountdownOverlayFinish(n))
                  : ((this.isFullscreenPlaying = !1),
                    this.needToShowResumeOverlay &&
                      (yield this.gp.loadOverlay(),
                      yield this.gp.overlay.showResumeOverlay())),
                (this.isFullscreenPlaying = !1),
                this._events.emit("close", r),
                this._events.emit("fullscreen:close", r),
                r
                  ? (this.gp.analytics.goal("ad_show", "FULLSCREEN"),
                    this._trackBannerDisplay(s.$.FULLSCREEN))
                  : this.gp.analytics.goal("ad_error", "FULLSCREEN"),
                r
              );
            });
          }
          showRewardedVideo({ showRewardedFailedOverlay: e = !1 } = {}) {
            return l(this, void 0, void 0, function* () {
              if (
                (yield this.gp._pointersManager.waitForPointersUp(),
                !this.isRewardedAvailable)
              )
                return (
                  this._events.emit("close", !1),
                  this._events.emit("rewarded:close", !1),
                  !1
                );
              const t = this.gp.fullscreen.isEnabled,
                n = t && this.adapter.needToLeaveFullscreenBeforeAds;
              n &&
                (yield this.gp.loadOverlay(),
                this.gp.fullscreen.close(),
                yield (0, c.Z)(200)),
                this._events.emit("start"),
                this._events.emit("rewarded:start"),
                this.sendShowAdsInfo({ type: "REWARDED", action: "REQUEST" }),
                this.gp.analytics.goal("ad_request", "REWARDED"),
                (this.isRewardedPlaying = !0);
              const i = !!(yield this.adapter
                .showRewardedVideo(this.rewardedVideo)
                .catch(() => !1));
              n &&
                (this.gp.overlay.closePreAdCountdownOverlay(),
                yield this.gp.overlay.showPreAdCountdownOverlayFinish(t)),
                this.sendShowAdsInfo({
                  type: "REWARDED",
                  action: i ? "DISPLAY" : "ERROR",
                });
              const r = e || this.isRewardedFailedOverlayEnabled;
              return (
                !i && r
                  ? (yield this.gp.loadOverlay(),
                    yield this.gp.overlay.showRewardedFailedOverlay())
                  : ((this.isRewardedPlaying = !1),
                    this.needToShowResumeOverlay &&
                      (yield this.gp.loadOverlay(),
                      yield this.gp.overlay.showResumeOverlay())),
                (this.isRewardedPlaying = !1),
                this._events.emit("close", i),
                this._events.emit("rewarded:close", i),
                this._trackBannerDisplay(s.$.REWARDED),
                i
                  ? (this.gp.analytics.goal("ad_show", "REWARDED"),
                    this._events.emit("rewarded:reward"))
                  : this.gp.analytics.goal("ad_error", "REWARDED"),
                i
              );
            });
          }
          showPreloader() {
            return l(this, void 0, void 0, function* () {
              if (
                (yield this.gp._pointersManager.waitForPointersUp(),
                !this.isPreloaderAvailable)
              )
                return (
                  this._events.emit("close", !1),
                  this._events.emit("preloader:close", !1),
                  !1
                );
              const e = this.gp.fullscreen.isEnabled,
                t = e && this.adapter.needToLeaveFullscreenBeforeAds;
              t &&
                (yield this.gp.loadOverlay(),
                this.gp.fullscreen.close(),
                yield (0, c.Z)(200)),
                this.sendShowAdsInfo({ type: "PRELOADER", action: "REQUEST" }),
                this.gp.analytics.goal("ad_request", "PRELOADER"),
                this._events.emit("start"),
                this._events.emit("preloader:start"),
                (this.isPreloaderPlaying = !0);
              const n = !!(yield this.adapter
                .showPreloader(this.preloaderBanner)
                .catch(() => !1));
              return (
                t &&
                  (this.gp.overlay.closePreAdCountdownOverlay(),
                  yield this.gp.overlay.showPreAdCountdownOverlayFinish(e)),
                this.sendShowAdsInfo({
                  type: "PRELOADER",
                  action: n ? "DISPLAY" : "ERROR",
                }),
                (this.isPreloaderPlaying = !1),
                this._events.emit("close", n),
                this._events.emit("preloader:close", n),
                n
                  ? (this.gp.analytics.goal("ad_show", "PRELOADER"),
                    this._trackBannerDisplay(s.$.PRELOADER))
                  : this.gp.analytics.goal("ad_error", "PRELOADER"),
                n
              );
            });
          }
          showSticky() {
            var e;
            return l(this, void 0, void 0, function* () {
              if (!this.isStickyAvailable)
                return (
                  this._events.emit("close", !1),
                  this._events.emit("sticky:close", !1),
                  !1
                );
              !this.stickyRefreshIntervalId &&
                this.stickyBanner.refreshInterval &&
                (this.stickyRefreshIntervalId = window.setInterval(
                  () => this.refreshSticky(),
                  1e3 * this.stickyBanner.refreshInterval
                )),
                this._events.emit("start"),
                this._events.emit("sticky:start"),
                this.sendShowAdsInfo({ type: "STICKY", action: "REQUEST" }),
                this.gp.analytics.goal("ad_request", "STICKY");
              const t = yield this.adapter
                .showSticky(this.stickyBanner)
                .catch(() => !1);
              return (
                this.sendShowAdsInfo({
                  type: "STICKY",
                  action: t ? "DISPLAY" : "ERROR",
                }),
                (this.isStickyPlaying = t),
                this._events.emit("sticky:render", t),
                t
                  ? (this._trackBannerDisplay(s.$.STICKY),
                    this.gp.analytics.goal("ad_show", "STICKY"))
                  : this.gp.analytics.goal("ad_error", "STICKY"),
                null === (e = this.gp.overlay) ||
                  void 0 === e ||
                  e.setSizeOffsets(this.gp._overlaySizeOffsets),
                t
              );
            });
          }
          refreshSticky() {
            var e;
            return l(this, void 0, void 0, function* () {
              if (!this.isStickyAvailable)
                return (
                  this._events.emit("close", !1),
                  this._events.emit("sticky:close", !1),
                  !1
                );
              clearInterval(this.stickyRefreshIntervalId),
                this.stickyBanner.refreshInterval &&
                  (this.stickyRefreshIntervalId = window.setInterval(
                    () => this.refreshSticky(),
                    1e3 * this.stickyBanner.refreshInterval
                  )),
                this._events.emit("sticky:refresh"),
                this.sendShowAdsInfo({ type: "STICKY", action: "REQUEST" });
              const t = yield this.adapter
                .refreshSticky(this.stickyBanner)
                .catch(() => !1);
              return (
                this.sendShowAdsInfo({
                  type: "STICKY",
                  action: t ? "DISPLAY" : "ERROR",
                }),
                (this.isStickyPlaying = t),
                this._events.emit("sticky:render", t),
                t && this._trackBannerDisplay(s.$.STICKY),
                null === (e = this.gp.overlay) ||
                  void 0 === e ||
                  e.setSizeOffsets(this.gp._overlaySizeOffsets),
                t
              );
            });
          }
          closeSticky() {
            var e;
            return l(this, void 0, void 0, function* () {
              const t = yield this.adapter.closeSticky();
              return (
                (this.isStickyPlaying = !1),
                this._events.emit("close", !0),
                this._events.emit("sticky:close", !0),
                clearInterval(this.stickyRefreshIntervalId),
                null === (e = this.gp.overlay) ||
                  void 0 === e ||
                  e.setSizeOffsets(this.gp._overlaySizeOffsets),
                t
              );
            });
          }
          get _stickyBannerOffsets() {
            const { height: e, isOverlapping: t } =
                this.adapter.stickyBannerConfig,
              { position: n } = this.stickyBanner;
            return {
              top: this.isStickyPlaying && t && "top" === n ? e : 0,
              bottom: this.isStickyPlaying && t && "bottom" === n ? e : 0,
            };
          }
          _trackBannerDisplay(e) {
            const t = this.adsInfo.limits[e];
            (t.hour.count += 1),
              (t.day.count += 1),
              (t.session.count += 1),
              t.day.timestamp || (t.day.timestamp = Date.now()),
              t.hour.timestamp || (t.hour.timestamp = Date.now()),
              this._saveAdsInfo();
          }
          _checkLimitsExpired(e) {
            let t = !1;
            Object.values(this.adsInfo.limits).forEach((n) => {
              e && (n.session.count = 0),
                p(n.hour.timestamp, 36e5) &&
                  ((n.hour.timestamp = 0), (n.hour.count = 0), (t = !0)),
                p(n.day.timestamp, 864e5) &&
                  ((n.day.timestamp = 0), (n.hour.count = 0), (t = !0));
            }),
              t && this._saveAdsInfo();
          }
          _saveAdsInfo() {
            this.gp._storage.saveAdsInfo(this.adsInfo);
          }
          isBannerLimitReached(e) {
            return (
              this.isBannerLimitTypeReached(e, "hour") ||
              this.isBannerLimitTypeReached(e, "day") ||
              this.isBannerLimitTypeReached(e, "session")
            );
          }
          isBannerLimitTypeReached(e, t) {
            const n = this.banners[e].limits[t];
            return !!n && this.adsInfo.limits[e][t].count >= n;
          }
        }
        function p(e, t) {
          return !!e && new Date().getTime() - new Date(e).getTime() > t;
        }
        i = new WeakMap();
        const f = (e, t) => (t ? e.mobileConfig : e.desktopConfig);
      },
      6316: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(4917),
          r = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        class s {
          constructor({ counterId: e }) {
            (this.visitParams = {}), (this.counterId = e);
            const t = window;
            (t.dataLayer = t.dataLayer || []),
              (t.gtag = function () {
                t.dataLayer.push(arguments);
              }),
              this.gtag("js", new Date()),
              this.gtag("config", e, { send_page_view: !1 }),
              (0, i.Z)({ src: `//www.googletagmanager.com/gtag/js?id=${e}` });
          }
          get gtag() {
            return window.gtag;
          }
          hit(e) {
            return r(this, void 0, void 0, function* () {
              this.gtag("event", "page_view", {
                page_location: e,
                send_to: this.counterId,
              });
            });
          }
          goal(e, t) {
            return r(this, void 0, void 0, function* () {
              "object" == typeof t && null !== t && (t = JSON.stringify(t)),
                this.gtag(
                  "event",
                  e,
                  t
                    ? Object.assign(Object.assign({}, this.visitParams), {
                        value: t,
                      })
                    : Object.assign({}, this.visitParams)
                );
            });
          }
          setVisitParams(e) {
            this.visitParams = e;
          }
        }
      },
      8266: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(4917),
          r = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        class s {
          constructor({ counterId: e }) {
            (this.visitParams = {}), (this.counterId = e);
            const t = window;
            (t.dataLayer = t.dataLayer || []),
              (t.ym =
                t.ym ||
                function () {
                  (t.ym.a = t.ym.a || []).push(arguments),
                    (t.ym.l = Date.now());
                }),
              t.ym(e, "init", {
                accurateTrackBounce: !0,
                ecommerce: "dataLayer",
              }),
              (this.ym = t.ym),
              (0, i.Z)({ src: "https://mc.yandex.ru/metrika/tag.js" });
          }
          hit(e) {
            return r(this, void 0, void 0, function* () {
              this.ym(this.counterId, "hit", e, { params: this.visitParams });
            });
          }
          goal(e, t) {
            return r(this, void 0, void 0, function* () {
              "object" == typeof t &&
                null !== t &&
                (t = Object.values(t).join("_")),
                this.ym(
                  this.counterId,
                  "reachGoal",
                  t ? `${e}_${t}` : e,
                  this.visitParams
                );
            });
          }
          setVisitParams(e) {
            (this.visitParams = e), this.ym(this.counterId, "params", e);
          }
        }
      },
      2954: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(6388),
          r = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        class s extends i.Z {
          constructor(e, t, n) {
            super(),
              (this.gp = e),
              (this.adapter = t),
              (this.config = n),
              (this.title = this.config.project.name),
              (this.description = this.config.project.description),
              (this.image = this.config.project.icon);
          }
          get url() {
            return (
              this.config.platformConfig.gameLink ||
              this.gp.platform.getSDK().appUrl ||
              ""
            );
          }
          get canAddShortcut() {
            return this.adapter.canAddShortcut;
          }
          get canRequestReview() {
            return this.adapter.canRequestReview;
          }
          get isAlreadyReviewed() {
            return this.adapter.isAlreadyReviewed;
          }
          addShortcut() {
            return r(this, void 0, void 0, function* () {
              const e = yield this.adapter.addShortcut();
              return this._events.emit("addShortcut", e), e;
            });
          }
          requestReview() {
            return r(this, void 0, void 0, function* () {
              const e = yield this.adapter.requestReview();
              return (
                e.success
                  ? this._events.emit("review", e)
                  : this._events.emit("error:review", e.error),
                e
              );
            });
          }
          requestGameUrl() {
            return this.adapter.requestGameUrl();
          }
        }
      },
      6388: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(5585),
          r = n.n(i);
        class s {
          constructor() {
            this._events = new (r())();
          }
          on(e, t) {
            this._events.on(e, t);
          }
          off(e, t) {
            this._events.off(e, t);
          }
          once(e, t) {
            this._events.once(e, t);
          }
        }
      },
      5979: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(180),
          r = n(3357);
        class s {
          constructor(e, t) {
            (this.config = e),
              (this.adapter = t),
              t.isSupportsCloudSaves ||
                e.progressSaveFormat !== i.pQ.Platform ||
                (e.progressSaveFormat = i.pQ.Local),
              (this.saveFormat = (0, r.q)(e.progressSaveFormat));
          }
          get hasIntegratedAuth() {
            return this.adapter.hasIntegratedAuth;
          }
          get hasAccountLinkingFeature() {
            return this.adapter.hasAccountLinkingFeature;
          }
          get isSecretCodeAuthAvailable() {
            return this.adapter.isSecretCodeAuthAvailable;
          }
          get _hasAuthModal() {
            return this.adapter._hasAuthModal;
          }
          get isLogoutAvailable() {
            return this.adapter.isLogoutAvailable;
          }
          get isExternalLinksAllowed() {
            return this.adapter.isExternalLinksAllowed;
          }
          get type() {
            return this.adapter.type;
          }
          get tag() {
            var e;
            return (
              (null === (e = this.adapter) || void 0 === e ? void 0 : e.tag) ||
              ""
            );
          }
          get availableSocialNetworks() {
            return this.adapter.socialNetworks;
          }
          get isSupportsCloudSaves() {
            return this.adapter.isSupportsCloudSaves;
          }
          get isBackendAllowed() {
            return this.adapter.isBackendAllowed;
          }
          getSDK() {
            return this.adapter.getSDK();
          }
          getNativeSDK() {
            return this.adapter.getNativeSDK();
          }
          get isSupportsImageUploading() {
            return this.adapter.isSupportsImageUploading;
          }
          requestPermissions(e) {
            return (
              (t = this),
              (n = void 0),
              (r = function* () {
                return this.adapter.requestPermissions(e);
              }),
              new ((i = void 0) || (i = Promise))(function (e, s) {
                function a(e) {
                  try {
                    c(r.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function o(e) {
                  try {
                    c(r.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(t) {
                  var n;
                  t.done
                    ? e(t.value)
                    : ((n = t.value),
                      n instanceof i
                        ? n
                        : new i(function (e) {
                            e(n);
                          })).then(a, o);
                }
                c((r = r.apply(t, n || [])).next());
              })
            );
            var t, n, i, r;
          }
          uploadImage(e) {
            return this.adapter.uploadImage(e);
          }
        }
      },
      264: (e, t, n) => {
        "use strict";
        n.d(t, { t: () => d, Z: () => p });
        var i,
          r,
          s,
          a,
          o = n(6558),
          c = n(6388),
          l = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          },
          h = function (e, t, n, i, r) {
            if ("m" === i)
              throw new TypeError("Private method is not writable");
            if ("a" === i && !r)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" == typeof t ? e !== t || !r : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n
            );
          };
        const u = {
            data: (e) => String(e || ""),
            stats: (e) => Number(e) || 0,
            flag: (e) => Boolean(e) || !1,
            service: null,
            accounts: null,
          },
          d = ["name", "avatar"];
        class p extends c.Z {
          constructor(e = {}, t, n) {
            super(),
              (this.coreSdk = n),
              i.add(this),
              (this.credentials = ""),
              (this.modifiedAt = ""),
              (this.saveFormat = ""),
              r.set(this, {}),
              s.set(this, []),
              (this._wasReset = !1),
              (this.isPublicFieldsDirty = !1),
              l(this, i, "m", a).call(this, t),
              this.fromJSON(e);
          }
          get id() {
            return this.state.id;
          }
          get score() {
            return this.get("score");
          }
          set score(e) {
            this.set("score", e);
          }
          get name() {
            return this.get("name");
          }
          set name(e) {
            this.set("name", e);
          }
          get avatar() {
            return this.get("avatar");
          }
          set avatar(e) {
            this.set("avatar", e);
          }
          get isStub() {
            return !this.fields
              .filter(
                (e) => !e.key.endsWith(":timestamp") && !d.includes(e.key)
              )
              .some((e) => this.get(e.key) !== e.default);
          }
          fromJSON(e) {
            var t, n, i;
            (this.state = {
              id: e.id || 0,
              active: null === (t = e.active) || void 0 === t || t,
              removed: null !== (n = e.removed) && void 0 !== n && n,
              test: null !== (i = e.test) && void 0 !== i && i,
              name: e.name || "",
              avatar: e.avatar || "",
              score: e.score || 0,
              credentials: e.credentials || "",
            }),
              e.credentials && (this.credentials = String(e.credentials)),
              e.modifiedAt && (this.modifiedAt = String(e.modifiedAt)),
              e.saveFormat && (this.saveFormat = e.saveFormat || ""),
              this.fields.forEach((t) => {
                if (!(t.key in e)) return void (this.state[t.key] = t.default);
                const n = u[t.type];
                if (!n) return void (this.state[t.key] = e[t.key] || t.default);
                const i = n(e[t.key]);
                (this.state[t.key] =
                  t.variants.length && !t.variants.some((e) => e.value === i)
                    ? t.default
                    : i),
                  t.intervalIncrement &&
                    (function (e, t, n, i) {
                      Object.defineProperty(i, `${n.key}:secondsLeft`, {
                        enumerable: !1,
                        get: () => {
                          const i = t.get(`${n.key}:incrementValue`) < 0,
                            r = i ? t.getMinValue(n.key) : t.getMaxValue(n.key),
                            s = t.get(n.key);
                          if (void 0 !== r) {
                            if (i && s <= r) return 0;
                            if (!i && s >= r) return 0;
                          }
                          const a = t.get(`${n.key}:timestamp`);
                          if (!a) return 0;
                          const o = new Date(a);
                          if (isNaN(o.getTime())) return 0;
                          const c =
                              new Date(e.serverTime).getTime() - o.getTime(),
                            l =
                              t.get(`${n.key}:incrementInterval`) -
                              Math.ceil(c / 1e3);
                          return l >= 0 ? l : 0;
                        },
                      }),
                        Object.defineProperty(i, `${n.key}:secondsLeftTotal`, {
                          enumerable: !1,
                          get: () => {
                            const e = t.get(`${n.key}:incrementValue`),
                              i = e < 0,
                              r = i
                                ? t.getMinValue(n.key)
                                : t.getMaxValue(n.key),
                              s = t.get(n.key);
                            if (void 0 !== r) {
                              if (i && s <= r) return 0;
                              if (!i && s >= r) return 0;
                            }
                            const a = t.get(`${n.key}:incrementInterval`),
                              o = i ? s - r : r - s,
                              c =
                                Math.ceil(o / Math.abs(e)) * a -
                                (a - t.get(`${n.key}:secondsLeft`));
                            return c >= 0 ? c : 0;
                          },
                        });
                    })(this.coreSdk, this, t, this.state);
              }),
              this._events.emit("change");
          }
          toJSON() {
            return Object.assign(Object.assign({}, this.state), {
              modifiedAt: this.coreSdk.serverTime,
              saveFormat: this.coreSdk.platform.saveFormat.format,
              credentials: this.credentials,
            });
          }
          getField(e) {
            const t = l(this, r, "f")[e];
            if (!t) {
              const t = `Field "${e}" not exists on player model`;
              throw (o.kg.error(t), new Error(t));
            }
            return t;
          }
          getFieldName(e) {
            return this.getField(e).name || "";
          }
          getFieldVariantName(e, t) {
            var n;
            return (
              (null ===
                (n = this.getField(e).variants.find((e) => e.value === t)) ||
              void 0 === n
                ? void 0
                : n.name) || ""
            );
          }
          getMinValue(e) {
            var t;
            if (
              null ==
              (null === (t = this.getField(e).limits) || void 0 === t
                ? void 0
                : t.min)
            ) {
              const t = `minValue not exists on field "${e}"`;
              throw (o.kg.error(t), new Error(t));
            }
            return this.get(`${e}:min`);
          }
          getMaxValue(e) {
            var t;
            if (
              null ==
              (null === (t = this.getField(e).limits) || void 0 === t
                ? void 0
                : t.max)
            ) {
              const t = `maxValue not exists on field "${e}"`;
              throw (o.kg.error(t), new Error(t));
            }
            return this.get(`${e}:max`);
          }
          get(e) {
            return this.state[e];
          }
          set(e, t) {
            var n, i;
            const r = this.state[e];
            if (((this.state[e] = this._convert(e, t)), r !== this.state[e])) {
              this.updateTime = Date.now();
              const t = this.getField(e);
              if ((t.public && (this.isPublicFieldsDirty = !0), t.limits)) {
                const { couldGoOverLimit: r } = t.limits,
                  s = this.get(`${e}:max`),
                  a = this.get(`${e}:min`),
                  o = this.get(`${t.key}:incrementValue`),
                  c = this.get(t.key),
                  l = `${t.key}:timestamp`;
                null !== t.limits.max && c >= s
                  ? (r || (this.state[e] = s),
                    this._events.emit("field:maximum", { field: t }),
                    t.intervalIncrement && o > 0 && (this.state[l] = ""))
                  : null !== t.limits.min &&
                    c <= a &&
                    ((this.state[e] = a),
                    this._events.emit("field:minimum", { field: t }),
                    t.intervalIncrement && o < 0 && (this.state[l] = ""));
                const h = !!(null === (n = this.state[l]) || void 0 === n
                  ? void 0
                  : n.length);
                t.intervalIncrement &&
                  !h &&
                  ((o > 0 && c < s) || (o < 0 && c > a)) &&
                  (this.state[`${t.key}:timestamp`] = new Date(
                    null === (i = this.coreSdk) || void 0 === i
                      ? void 0
                      : i.serverTime
                  ).toISOString());
              }
              this._events.emit("change");
            }
          }
          add(e, t) {
            return this.set(e, this.get(e) + this._convert(e, t));
          }
          toggle(e) {
            return this.set(e, !this.get(e));
          }
          has(e) {
            return Boolean(this.get(e));
          }
          reset() {
            (this._wasReset = !0),
              this.fields.forEach((e) => this.set(e.key, e.default));
          }
          remove() {
            (this.state.id = 0), this.reset();
          }
          _convert(e, t) {
            const n = this.getField(e),
              i = u[n.type];
            if (!i) {
              const t = `Cannot mutate "${e}", it's readonly`;
              throw (o.kg.error(t), new Error(t));
            }
            const r = i(t);
            if (n.variants.length && !n.variants.some((e) => e.value === r)) {
              const t = `Invalid variant ${r} of "${e}"`;
              throw (o.kg.error(t), new Error(t));
            }
            return r;
          }
          _initializeIncrementFields() {
            l(this, s, "f").forEach((e) => {
              e.intervalIncrement && this._incrementField(e);
            });
          }
          _incrementField(e) {
            const t = this.get(e.key),
              n = this.get(`${e.key}:max`),
              i = this.get(`${e.key}:min`),
              r = this.get(`${e.key}:incrementInterval`),
              s = this.get(`${e.key}:incrementValue`),
              a = Date.parse(this.coreSdk.serverTime),
              o = Date.parse(this.get(`${e.key}:timestamp`)) || a,
              c = (a - o) / 1e3,
              l = Math.floor(c / r);
            if (l > 0 && ((s > 0 && t < n) || (s < 0 && t > i))) {
              let a = t + l * s;
              (a = Math.min(Math.max(a, i), n)),
                this._events.emit("field:increment", {
                  field: e,
                  oldValue: t,
                  newValue: a,
                }),
                this.set(e.key, a);
              const c = r * l * 1e3 + o;
              this.state[`${e.key}:timestamp`] = new Date(c).toISOString();
            }
          }
          _syncIncrementVariable() {
            this._initializeIncrementFields();
          }
        }
        (r = new WeakMap()),
          (s = new WeakMap()),
          (i = new WeakSet()),
          (a = function (e) {
            (this.fields = e),
              h(
                this,
                s,
                e.filter((e) => !!e.limits),
                "f"
              ),
              h(this, r, {}, "f"),
              e.forEach((e) => {
                l(this, r, "f")[e.key] = e;
              });
          });
      },
      2447: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => h });
        var i,
          r,
          s,
          a = n(6558),
          o = n(6388),
          c = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          l = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class h extends o.Z {
          constructor(e, t, n) {
            super(),
              (this.adapter = e),
              (this.gp = t),
              (this.config = n),
              i.add(this);
          }
          get isSupportsShare() {
            return this.adapter.isSupportsShare;
          }
          get isSupportsNativeShare() {
            return this.adapter.isSupportsNativeShare;
          }
          get isSupportsNativePosts() {
            return this.adapter.isSupportsNativePosts;
          }
          get isSupportsNativeInvite() {
            return this.adapter.isSupportsNativeInvite;
          }
          get isSupportShareParams() {
            return this.adapter.isSupportShareParams;
          }
          get isSupportsNativeCommunityJoin() {
            return this.adapter.isSupportsNativeCommunityJoin;
          }
          get canJoinCommunity() {
            return this.adapter.canJoinCommunity && !!this.communityLink;
          }
          get communityLink() {
            return this.adapter.getCommunityLink(l(this, i, "a", s));
          }
          get shareParams() {
            return this.adapter.shareParams || {};
          }
          _getShareOptions(e) {
            return c(this, void 0, void 0, function* () {
              return (
                yield this.gp.app.requestGameUrl(),
                {
                  text: e.text || this.gp.app.title,
                  image: e.image || "",
                  url: e.url || this.gp.app.url,
                }
              );
            });
          }
          _shareByOverlay(e, t) {
            var n;
            return c(this, void 0, void 0, function* () {
              if (this.gp.isMobile)
                try {
                  const e = yield this._getShareOptions(t),
                    i = Object.assign({}, e);
                  if (e.image) {
                    const t = yield fetch(e.image).then((e) => e.blob());
                    i.files = [
                      new File([t], "image.png", {
                        type: t.type,
                        lastModified: new Date().getTime(),
                      }),
                    ];
                  }
                  const r = window.navigator;
                  if (
                    null === (n = r.canShare) || void 0 === n
                      ? void 0
                      : n.call(r, i)
                  )
                    return r.share(i);
                } catch (e) {
                  a.kg.warn(e);
                }
              return (
                yield this.gp.loadOverlay(),
                this.gp.overlay.share(e, yield this._getShareOptions(t))
              );
            });
          }
          share(e = {}) {
            return c(this, void 0, void 0, function* () {
              if (!this.isSupportsShare)
                return this._events.emit("share", !1), !1;
              const t = this.isSupportsNativeShare
                  ? this.adapter.share(yield this._getShareOptions(e))
                  : this._shareByOverlay("share", e),
                n = yield t.catch(() => !1);
              return this._events.emit("share", n), n;
            });
          }
          post(e = {}) {
            return c(this, void 0, void 0, function* () {
              if (!this.isSupportsShare)
                return this._events.emit("post", !1), !1;
              const t = this.isSupportsNativePosts
                  ? this.adapter.post(yield this._getShareOptions(e))
                  : this._shareByOverlay("post", e),
                n = yield t.catch(() => !1);
              return this._events.emit("post", n), n;
            });
          }
          invite(e = {}) {
            return c(this, void 0, void 0, function* () {
              if (!this.isSupportsShare)
                return this._events.emit("invite", !1), !1;
              const t = this.isSupportsNativeInvite
                  ? this.adapter.invite(yield this._getShareOptions(e))
                  : this._shareByOverlay("invite", e),
                n = yield t.catch(() => !1);
              return this._events.emit("invite", n), n;
            });
          }
          joinCommunity() {
            return c(this, void 0, void 0, function* () {
              if (!this.canJoinCommunity)
                return this._events.emit("joinCommunity", !1), !1;
              let e = !0;
              return (
                this.isSupportsNativeCommunityJoin &&
                  (e = yield this.adapter.joinCommunity(l(this, i, "a", r))),
                window.open(this.communityLink, "_blank"),
                this._events.emit("joinCommunity", e),
                e
              );
            });
          }
          addShareParamsToUrl(e, t = {}) {
            return this.adapter.addShareParamsToUrl(e, t);
          }
          makeShareUrl(e = {}) {
            return (
              !!this.isSupportShareParams &&
              (0 === Object.keys(e).length
                ? this.gp.app.url
                : this.adapter.makeShareUrl(e))
            );
          }
          getShareParam(e) {
            var t;
            return (
              !!this.isSupportShareParams &&
              (null !== (t = this.adapter.getShareParam(e)) && void 0 !== t
                ? t
                : "")
            );
          }
        }
        (i = new WeakSet()),
          (r = function () {
            return (
              this.config.platformConfig.communityLinks[this.gp.language] ||
              this.config.platformConfig.communityLinks.en ||
              ""
            );
          }),
          (s = function () {
            return (
              l(this, i, "a", r) ||
              this.config.config.communityLinks[this.gp.language] ||
              this.config.config.communityLinks.en ||
              ""
            );
          });
      },
      2231: (e, t, n) => {
        "use strict";
        function i(e) {
          return new Promise(function (t, n) {
            (e.oncomplete = e.onsuccess =
              function () {
                return t(e.result);
              }),
              (e.onabort = e.onerror =
                function () {
                  return n(e.error);
                });
          });
        }
        function r(e, t) {
          var n = indexedDB.open(e);
          n.onupgradeneeded = function () {
            return n.result.createObjectStore(t);
          };
          var r = i(n);
          return function (e, n) {
            return r.then(function (i) {
              return n(i.transaction(t, e).objectStore(t));
            });
          };
        }
        var s;
        function a() {
          return s || (s = r("keyval-store", "keyval")), s;
        }
        n.d(t, { Z: () => l });
        var o = n(6558),
          c = n(8293);
        class l {
          constructor(e) {
            (this.dbName = e), (this.isLocal = !0);
            try {
              this.store = r(this.dbName, "storage");
            } catch (e) {
              o.kg.error(e);
            }
          }
          set(e, t) {
            return this.store
              ? (function (e, t) {
                  return (
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : a()
                  )("readwrite", function (n) {
                    return n.put(t, e), i(n.transaction);
                  });
                })(e, t, this.store).catch(() => null)
              : Promise.resolve();
          }
          get(e) {
            if (!this.store) return Promise.resolve(null);
            const t = (0, c._)({ timeout: 2e3 });
            return (
              (function (e) {
                return (
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : a()
                )("readonly", function (t) {
                  return i(t.get(e));
                });
              })(e, this.store)
                .then(t.done)
                .catch(() => t.done(null)),
              t.ready
            );
          }
          remove(e) {
            return (
              (t = this),
              (n = void 0),
              (s = function* () {
                if (!this.store) return Promise.resolve();
                try {
                  yield (function (e) {
                    return (
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : a()
                    )("readwrite", function (t) {
                      return t.delete(e), i(t.transaction);
                    });
                  })(e, this.store);
                } catch (e) {
                  o.kg.error(e);
                }
              }),
              new ((r = void 0) || (r = Promise))(function (e, i) {
                function a(e) {
                  try {
                    c(s.next(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function o(e) {
                  try {
                    c(s.throw(e));
                  } catch (e) {
                    i(e);
                  }
                }
                function c(t) {
                  var n;
                  t.done
                    ? e(t.value)
                    : ((n = t.value),
                      n instanceof r
                        ? n
                        : new r(function (e) {
                            e(n);
                          })).then(a, o);
                }
                c((s = s.apply(t, n || [])).next());
              })
            );
            var t, n, r, s;
          }
        }
      },
      2665: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => a });
        var i,
          r = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          },
          s = function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          };
        class a {
          constructor(e) {
            (this.projectId = e), i.set(this, void 0), (this.isLocal = !0);
            try {
              !(function (e, t, n, i, r) {
                if ("m" === i)
                  throw new TypeError("Private method is not writable");
                if ("a" === i && !r)
                  throw new TypeError(
                    "Private accessor was defined without a setter"
                  );
                if ("function" == typeof t ? e !== t || !r : !t.has(e))
                  throw new TypeError(
                    "Cannot write private member to an object whose class did not declare it"
                  );
                "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
              })(this, i, window.localStorage, "f");
            } catch (e) {}
          }
          getKey(e) {
            return `gs-db-project-${this.projectId}-${e}`;
          }
          set(e, t) {
            return r(this, void 0, void 0, function* () {
              s(this, i, "f").setItem(this.getKey(e), JSON.stringify(t));
            });
          }
          get(e) {
            return r(this, void 0, void 0, function* () {
              try {
                return JSON.parse(
                  s(this, i, "f").getItem(this.getKey(e)) || "null"
                );
              } catch (e) {}
            });
          }
          remove(e) {
            return r(this, void 0, void 0, function* () {
              try {
                s(this, i, "f").removeItem(this.getKey(e));
              } catch (e) {}
            });
          }
        }
        i = new WeakMap();
      },
      8751: (e, t, n) => {
        "use strict";
        var i;
        n.d(t, { p: () => i }),
          (function (e) {
            (e.SUCCESS = "success"),
              (e.INFO = "info"),
              (e.WARNING = "warning"),
              (e.ERROR = "error");
          })(i || (i = {}));
      },
      3793: (e, t, n) => {
        "use strict";
        n.d(t, {
          Do: () => w,
          F: () => S,
          LH: () => B,
          W2: () => ce,
          x1: () => le,
          OB: () => ke,
          U7: () => Ue,
        });
        var i,
          r,
          s,
          a,
          o,
          c,
          l,
          h,
          u,
          d,
          p,
          f,
          m,
          v,
          y,
          g,
          w,
          P,
          b,
          E,
          T,
          S,
          A,
          _,
          I,
          C,
          O,
          R,
          k,
          D,
          M,
          N,
          L,
          F,
          x,
          j,
          $,
          U,
          G,
          B,
          W,
          q,
          V,
          Y,
          z,
          J,
          K,
          Z,
          X,
          H,
          Q,
          ee,
          te,
          ne,
          ie,
          re,
          se,
          ae,
          oe,
          ce,
          le,
          he,
          ue,
          de,
          pe,
          fe,
          me,
          ve,
          ye,
          ge,
          we,
          Pe,
          be,
          Ee,
          Te,
          Se,
          Ae,
          _e,
          Ie,
          Ce,
          Oe,
          Re,
          ke,
          De,
          Me,
          Ne,
          Le,
          Fe,
          xe,
          je,
          $e,
          Ue,
          Ge,
          Be,
          We,
          qe,
          Ve,
          Ye,
          ze,
          Je,
          Ke = n(4809);
        !(function (e) {
          (e.UnlockPlayerAchievement = "UnlockPlayerAchievement"),
            (e.PlayerSetAchievementProgress = "PlayerSetAchievementProgress"),
            (e.FetchPlayerAchievements = "FetchPlayerAchievements"),
            (e.SyncPlayer = "SyncPlayer"),
            (e.GetPlayer = "GetPlayer"),
            (e.GetPlayerLoginStatus = "GetPlayerLoginStatus"),
            (e.FetchPlayerFields = "FetchPlayerFields"),
            (e.CheckPlayerCode = "CheckPlayerCode"),
            (e.PlayerFetchPlayers = "PlayerFetchPlayers"),
            (e.SyncPlayerPurchases = "SyncPlayerPurchases"),
            (e.PurchasePlayerPurchase = "PurchasePlayerPurchase"),
            (e.ConsumePlayerPurchase = "ConsumePlayerPurchase"),
            (e.UnsubscribePlayerSubscription = "UnsubscribePlayerSubscription"),
            (e.ResumePlayerSubscription = "ResumePlayerSubscription"),
            (e.FetchPlayerPurchases = "FetchPlayerPurchases"),
            (e.FindPlayerPurchase = "FindPlayerPurchase"),
            (e.PlayerGetPaymentLink = "PlayerGetPaymentLink"),
            (e.FetchPlayerProjectVariables = "FetchPlayerProjectVariables"),
            (e.FetchPlayerProjectConfig = "FetchPlayerProjectConfig"),
            (e.GivePlayerReward = "GivePlayerReward"),
            (e.FetchPlayerRewards = "FetchPlayerRewards"),
            (e.PlayerPublishRecord = "PlayerPublishRecord"),
            (e.FetchTop = "FetchTop"),
            (e.FetchPlayerRating = "FetchPlayerRating"),
            (e.UploadPlayerImage = "UploadPlayerImage"),
            (e.FetchPlayerImages = "FetchPlayerImages"),
            (e.UploadPlayerFile = "UploadPlayerFile"),
            (e.FetchPlayerFiles = "FetchPlayerFiles"),
            (e.FetchPlayerGamesCollection = "FetchPlayerGamesCollection"),
            (e.PlayerJoinEvent = "PlayerJoinEvent"),
            (e.PlayerRegisterOnScheduler = "PlayerRegisterOnScheduler"),
            (e.FetchPlayerDocument = "FetchPlayerDocument"),
            (e.PlayerCreateChannel = "PlayerCreateChannel"),
            (e.PlayerUpdateChannel = "PlayerUpdateChannel"),
            (e.PlayerDeleteChannel = "PlayerDeleteChannel"),
            (e.PlayerMutePlayerInChannel = "PlayerMutePlayerInChannel"),
            (e.PlayerUnmutePlayerInChannel = "PlayerUnmutePlayerInChannel"),
            (e.PlayerSendPersonalMessage = "PlayerSendPersonalMessage"),
            (e.PlayerSendFeedMessage = "PlayerSendFeedMessage"),
            (e.PlayerSendMessage = "PlayerSendMessage"),
            (e.PlayerEditMessage = "PlayerEditMessage"),
            (e.PlayerDeleteMessage = "PlayerDeleteMessage"),
            (e.PlayerFetchChannelMessages = "PlayerFetchChannelMessages"),
            (e.PlayerFetchPersonalMessages = "PlayerFetchPersonalMessages"),
            (e.PlayerFetchFeedMessages = "PlayerFetchFeedMessages"),
            (e.PlayerKickFromChannel = "PlayerKickFromChannel"),
            (e.PlayerFetchChannelMembers = "PlayerFetchChannelMembers"),
            (e.PlayerJoinChannel = "PlayerJoinChannel"),
            (e.PlayerLeaveChannel = "PlayerLeaveChannel"),
            (e.PlayerCancelJoinChannel = "PlayerCancelJoinChannel"),
            (e.PlayerAcceptJoinRequestToChannel =
              "PlayerAcceptJoinRequestToChannel"),
            (e.PlayerRejectJoinRequestToChannel =
              "PlayerRejectJoinRequestToChannel"),
            (e.PlayerFetchChannelJoinRequests =
              "PlayerFetchChannelJoinRequests"),
            (e.PlayerFetchSentJoinRequests = "PlayerFetchSentJoinRequests"),
            (e.PlayerSendInviteToChannel = "PlayerSendInviteToChannel"),
            (e.PlayerCancelInviteToChannel = "PlayerCancelInviteToChannel"),
            (e.PlayerAcceptInviteToChannel = "PlayerAcceptInviteToChannel"),
            (e.PlayerRejectInviteToChannel = "PlayerRejectInviteToChannel"),
            (e.PlayerFetchChannelInvites = "PlayerFetchChannelInvites"),
            (e.PlayerFetchPlayerSentInvites = "PlayerFetchPlayerSentInvites"),
            (e.PlayerFetchPlayerInvites = "PlayerFetchPlayerInvites"),
            (e.CheckPlayerUniqueValue = "CheckPlayerUniqueValue"),
            (e.RegisterPlayerUniqueValue = "RegisterPlayerUniqueValue"),
            (e.DeletePlayerUniqueValue = "DeletePlayerUniqueValue"),
            (e.CreateAchievement = "CreateAchievement"),
            (e.UpdateAchievement = "UpdateAchievement"),
            (e.DeleteAchievement = "DeleteAchievement"),
            (e.CreateAchievementsGroup = "CreateAchievementsGroup"),
            (e.UpdateAchievementsGroup = "UpdateAchievementsGroup"),
            (e.DeleteAchievementsGroup = "DeleteAchievementsGroup"),
            (e.AddAchievementToPlayer = "AddAchievementToPlayer"),
            (e.RemoveAchievementFromPlayer = "RemoveAchievementFromPlayer"),
            (e.FetchAchievements = "FetchAchievements"),
            (e.FetchAchievementsGroups = "FetchAchievementsGroups"),
            (e.FetchPlayersAchievements = "FetchPlayersAchievements"),
            (e.FetchAdminPlayerAchievements = "FetchAdminPlayerAchievements"),
            (e.FetchAchievementStats = "FetchAchievementStats"),
            (e.FetchChannelInvites = "FetchChannelInvites"),
            (e.SendInviteToChannel = "SendInviteToChannel"),
            (e.CancelInviteToChannel = "CancelInviteToChannel"),
            (e.FetchChannelJoinRequests = "FetchChannelJoinRequests"),
            (e.RejectJoinRequestToChannel = "RejectJoinRequestToChannel"),
            (e.FetchChannelMembers = "FetchChannelMembers"),
            (e.KickFromChannel = "KickFromChannel"),
            (e.AddToChannel = "AddToChannel"),
            (e.FetchChannelMessages = "FetchChannelMessages"),
            (e.FetchPrivateMessages = "FetchPrivateMessages"),
            (e.FetchFeedMessages = "FetchFeedMessages"),
            (e.CreateChannelMessage = "CreateChannelMessage"),
            (e.UpdateChannelMessage = "UpdateChannelMessage"),
            (e.DeleteChannelMessage = "DeleteChannelMessage"),
            (e.SendPersonalMessage = "SendPersonalMessage"),
            (e.SendFeedMessage = "SendFeedMessage"),
            (e.FetchPlayerMute = "FetchPlayerMute"),
            (e.MutePlayerInChannel = "MutePlayerInChannel"),
            (e.UnmutePlayerInChannel = "UnmutePlayerInChannel"),
            (e.FetchChannelTemplate = "FetchChannelTemplate"),
            (e.FetchChannelTemplates = "FetchChannelTemplates"),
            (e.CreateChannelTemplate = "CreateChannelTemplate"),
            (e.UpdateChannelTemplate = "UpdateChannelTemplate"),
            (e.DeleteChannelTemplate = "DeleteChannelTemplate"),
            (e.FetchChannels = "FetchChannels"),
            (e.FetchChannel = "FetchChannel"),
            (e.CreateChannel = "CreateChannel"),
            (e.UpdateChannel = "UpdateChannel"),
            (e.DeleteChannel = "DeleteChannel"),
            (e.FetchDocuments = "FetchDocuments"),
            (e.SaveDocument = "SaveDocument"),
            (e.FetchEvents = "FetchEvents"),
            (e.CheckEventExists = "CheckEventExists"),
            (e.FetchAdminPlayerEvents = "FetchAdminPlayerEvents"),
            (e.FetchEventsStats = "FetchEventsStats"),
            (e.UpsertEvent = "UpsertEvent"),
            (e.DeleteEvent = "DeleteEvent"),
            (e.AddEventToPlayer = "AddEventToPlayer"),
            (e.RemoveEventFromPlayer = "RemoveEventFromPlayer"),
            (e.FetchFiles = "FetchFiles"),
            (e.UploadFile = "UploadFile"),
            (e.UpdateFile = "UpdateFile"),
            (e.DeleteFiles = "DeleteFiles"),
            (e.FetchGamesCollections = "FetchGamesCollections"),
            (e.CreateGamesCollection = "CreateGamesCollection"),
            (e.UpdateGamesCollection = "UpdateGamesCollection"),
            (e.DeleteGamesCollection = "DeleteGamesCollection"),
            (e.FetchImages = "FetchImages"),
            (e.UploadImage = "UploadImage"),
            (e.UpdateImage = "UpdateImage"),
            (e.DeleteImages = "DeleteImages"),
            (e.FetchLeaderboards = "FetchLeaderboards"),
            (e.FetchLeaderboard = "FetchLeaderboard"),
            (e.FetchLeaderboardVariant = "FetchLeaderboardVariant"),
            (e.FetchLeaderboardsVariants = "FetchLeaderboardsVariants"),
            (e.FetchLeaderboardRecords = "FetchLeaderboardRecords"),
            (e.FetchAdminPlayerRecords = "FetchAdminPlayerRecords"),
            (e.CreateLeaderboard = "CreateLeaderboard"),
            (e.UpdateLeaderboard = "UpdateLeaderboard"),
            (e.DeleteLeaderboard = "DeleteLeaderboard"),
            (e.DeleteLeaderboardVariant = "DeleteLeaderboardVariant"),
            (e.UpdateLeaderboardRecord = "UpdateLeaderboardRecord"),
            (e.DeleteLeaderboardRecord = "DeleteLeaderboardRecord"),
            (e.DeleteAdminPlayerRecords = "DeleteAdminPlayerRecords"),
            (e.FetchModel = "FetchModel"),
            (e.FetchModels = "FetchModels"),
            (e.UpdateModel = "UpdateModel"),
            (e.FetchPlatforms = "FetchPlatforms"),
            (e.AddPlatform = "AddPlatform"),
            (e.UpdatePlatform = "UpdatePlatform"),
            (e.UpdatePlatformBanners = "UpdatePlatformBanners"),
            (e.UpdatePlatformAds = "UpdatePlatformAds"),
            (e.DeletePlatform = "DeletePlatform"),
            (e.FindPlayerStateById = "FindPlayerStateByID"),
            (e.FindPlayerById = "FindPlayerByID"),
            (e.FetchPlayers = "FetchPlayers"),
            (e.FetchPlayersReports = "FetchPlayersReports"),
            (e.UpdatePlayer = "UpdatePlayer"),
            (e.DeletePlayer = "DeletePlayer"),
            (e.RestorePlayer = "RestorePlayer"),
            (e.BanPlayer = "BanPlayer"),
            (e.UnbanPlayer = "UnbanPlayer"),
            (e.RestorePlayerFromArchive = "RestorePlayerFromArchive"),
            (e.UpdatePlayerModifiedAt = "UpdatePlayerModifiedAt"),
            (e.FetchPlayersPurchases = "FetchPlayersPurchases"),
            (e.FetchAdminPlayerPurchases = "FetchAdminPlayerPurchases"),
            (e.FetchProducts = "FetchProducts"),
            (e.FetchPlayerPurchasesStats = "FetchPlayerPurchasesStats"),
            (e.GetPlayerPurchase = "GetPlayerPurchase"),
            (e.AddPurchaseToPlayer = "AddPurchaseToPlayer"),
            (e.UpdatePlayerPurchase = "UpdatePlayerPurchase"),
            (e.RemovePurchaseFromPlayer = "RemovePurchaseFromPlayer"),
            (e.CreateProduct = "CreateProduct"),
            (e.UpdateProduct = "UpdateProduct"),
            (e.DeleteProduct = "DeleteProduct"),
            (e.UpsertProjectVariable = "UpsertProjectVariable"),
            (e.DeleteProjectVariable = "DeleteProjectVariable"),
            (e.FetchRewards = "FetchRewards"),
            (e.FetchPlayersRewards = "FetchPlayersRewards"),
            (e.FetchAdminPlayerRewards = "FetchAdminPlayerRewards"),
            (e.CheckRewardExists = "CheckRewardExists"),
            (e.FetchRewardStats = "FetchRewardStats"),
            (e.CreateReward = "CreateReward"),
            (e.UpdateReward = "UpdateReward"),
            (e.DeleteReward = "DeleteReward"),
            (e.AddRewardToPlayer = "AddRewardToPlayer"),
            (e.SubstractRewardFromPlayer = "SubstractRewardFromPlayer"),
            (e.DropRewardsForPlayer = "DropRewardsForPlayer"),
            (e.FetchSchedulers = "FetchSchedulers"),
            (e.FetchSchedulerTriggers = "FetchSchedulerTriggers"),
            (e.CheckSchedulerExists = "CheckSchedulerExists"),
            (e.FetchPlayersSchedulers = "FetchPlayersSchedulers"),
            (e.UpsertScheduler = "UpsertScheduler"),
            (e.SaveSchedulerTriggersOnDay = "SaveSchedulerTriggersOnDay"),
            (e.DeleteScheduler = "DeleteScheduler"),
            (e.AddSchedulerToPlayer = "AddSchedulerToPlayer"),
            (e.RemoveSchedulerFromPlayer = "RemoveSchedulerFromPlayer"),
            (e.UpdatePlayerScheduler = "UpdatePlayerScheduler"),
            (e.FetchSegments = "FetchSegments"),
            (e.CreateSegment = "CreateSegment"),
            (e.UpdateSegment = "UpdateSegment"),
            (e.DeleteSegment = "DeleteSegment"),
            (e.FetchCommonTriggers = "FetchCommonTriggers"),
            (e.FetchAdminPlayerTriggers = "FetchAdminPlayerTriggers"),
            (e.CheckTriggerExists = "CheckTriggerExists"),
            (e.FetchTriggersStats = "FetchTriggersStats"),
            (e.CreateCommonTrigger = "CreateCommonTrigger"),
            (e.UpdateCommonTrigger = "UpdateCommonTrigger"),
            (e.DeleteCommonTrigger = "DeleteCommonTrigger"),
            (e.ActivateTriggerForPlayer = "ActivateTriggerForPlayer"),
            (e.DeactivateTriggerForPlayer = "DeactivateTriggerForPlayer"),
            (e.FetchAdsStats = "FetchAdsStats"),
            (e.FetchDwmStats = "FetchDWMStats"),
            (e.FetchFilesStats = "FetchFilesStats"),
            (e.FetchHostingStats = "FetchHostingStats"),
            (e.FetchImagesStats = "FetchImagesStats"),
            (e.FetchOnlineStats = "FetchOnlineStats"),
            (e.FetchStatsRequests = "FetchStatsRequests"),
            (e.FetchRetentionStats = "FetchRetentionStats"),
            (e.FetchSessionsStats = "FetchSessionsStats"),
            (e.FetchUniqueValues = "FetchUniqueValues"),
            (e.CreateUniqueValue = "CreateUniqueValue"),
            (e.UpdateUniqueValue = "UpdateUniqueValue"),
            (e.DeleteUniqueValue = "DeleteUniqueValue"),
            (e.FetchUniqueValuesRules = "FetchUniqueValuesRules"),
            (e.CreateUniqueValueRule = "CreateUniqueValueRule"),
            (e.UpdateUniqueValueRule = "UpdateUniqueValueRule"),
            (e.DeleteUniqueValueRule = "DeleteUniqueValueRule"),
            (e.PlayerAiCheckCensor = "PlayerAICheckCensor"),
            (e.AiCensor = "AICensor"),
            (e.UploadProjectBuild = "UploadProjectBuild"),
            (e.PublishProjectBuild = "PublishProjectBuild"),
            (e.UnpublishProjectBuild = "UnpublishProjectBuild"),
            (e.CreateDistributionRequest = "CreateDistributionRequest"),
            (e.SendDistributionMessage = "SendDistributionMessage"),
            (e.CommitDistributionChanges = "CommitDistributionChanges");
        })(i || (i = {})),
          (function (e) {
            (e.Skip = "SKIP"), (e.Analytics = "ANALYTICS"), (e.Ai = "AI");
          })(r || (r = {})),
          (function (e) {
            (e.Any = "ANY"),
              (e.Player = "PLAYER"),
              (e.Admin = "ADMIN"),
              (e.Developer = "DEVELOPER"),
              (e.Analytic = "ANALYTIC"),
              (e.ContentManager = "CONTENT_MANAGER"),
              (e.GamePlatform = "GAME_PLATFORM"),
              (e.GamePlatformPlayer = "GAME_PLATFORM_PLAYER"),
              (e.InternalDeveloper = "INTERNAL_DEVELOPER"),
              (e.InternalModerator = "INTERNAL_MODERATOR"),
              (e.InternalApi = "INTERNAL_API"),
              (e.Marketer = "MARKETER");
          })(s || (s = {})),
          (function (e) {
            (e.Achievement = "ACHIEVEMENT"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Project = "PROJECT");
          })(a || (a = {})),
          (function (e) {
            (e.Achievement = "ACHIEVEMENT"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Total = "TOTAL");
          })(o || (o = {})),
          (function (e) {
            (e.YandexSimpleMonetization = "YandexSimpleMonetization"),
              (e.Adfox = "ADFOX"),
              (e.Advertonic = "ADVERTONIC"),
              (e.Adsense = "ADSENSE"),
              (e.Rtb = "RTB"),
              (e.Gpt = "GPT"),
              (e.Adsgram = "ADSGRAM"),
              (e.Tmads = "TMADS"),
              (e.Adsonar = "ADSONAR");
          })(c || (c = {})),
          (function (e) {
            (e.External = "EXTERNAL"), (e.Internal = "INTERNAL");
          })(l || (l = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.BannerType = "BANNER_TYPE"),
              (e.Project = "PROJECT");
          })(h || (h = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.BannerType = "BANNER_TYPE"),
              (e.Requests = "REQUESTS"),
              (e.Displays = "DISPLAYS"),
              (e.Errors = "ERRORS"),
              (e.FillRate = "FILL_RATE"),
              (e.Revenue = "REVENUE");
          })(u || (u = {})),
          (function (e) {
            (e.GamepushLlc = "GAMEPUSH_LLC"),
              (e.GamepushFzco = "GAMEPUSH_FZCO");
          })(d || (d = {})),
          (function (e) {
            (e.External = "EXTERNAL"),
              (e.Internal = "INTERNAL"),
              (e.Pikabu = "PIKABU"),
              (e.ExtranalToken = "EXTRANAL_TOKEN");
          })(p || (p = {})),
          (function (e) {
            (e.Xsolla = "XSOLLA"),
              (e.Google = "GOOGLE"),
              (e.GooglePlay = "GOOGLE_PLAY"),
              (e.Yandex = "YANDEX");
          })(f || (f = {})),
          (function (e) {
            (e.Preloader = "PRELOADER"),
              (e.Fullscreen = "FULLSCREEN"),
              (e.Rewarded = "REWARDED"),
              (e.Sticky = "STICKY"),
              (e.VbMain = "VB_MAIN"),
              (e.Inline = "INLINE"),
              (e.InlineSmall = "INLINE_SMALL");
          })(m || (m = {})),
          (function (e) {
            (e.Banner = "BANNER"),
              (e.Combo = "COMBO"),
              (e.Inpage = "INPAGE"),
              (e.Instream = "INSTREAM"),
              (e.Empty = "EMPTY");
          })(v || (v = {})),
          (function (e) {
            (e.String = "STRING"), (e.Number = "NUMBER");
          })(y || (y = {})),
          (function (e) {
            (e.Active = "ACTIVE"),
              (e.Inactive = "INACTIVE"),
              (e.Deleted = "DELETED");
          })(g || (g = {})),
          (function (e) {
            (e.Reward = "REWARD"),
              (e.Achievement = "ACHIEVEMENT"),
              (e.Product = "PRODUCT");
          })(w || (w = {})),
          (function (e) {
            (e.Awaits = "AWAITS"),
              (e.Running = "RUNNING"),
              (e.Succeed = "SUCCEED"),
              (e.Failed = "FAILED");
          })(P || (P = {})),
          (function (e) {
            (e.Eq = "EQ"),
              (e.Ne = "NE"),
              (e.In = "IN"),
              (e.Lt = "LT"),
              (e.Gt = "GT"),
              (e.Lte = "LTE"),
              (e.Gte = "GTE");
          })(b || (b = {})),
          (function (e) {
            (e.PlayerStat = "PLAYER_STAT"),
              (e.EntityStat = "ENTITY_STAT"),
              (e.PlayerField = "PLAYER_FIELD");
          })(E || (E = {})),
          (function (e) {
            (e.Webhook = "WEBHOOK"), (e.ClientSide = "CLIENT_SIDE");
          })(T || (T = {})),
          (function (e) {
            (e.Rub = "RUB"),
              (e.Usd = "USD"),
              (e.Eur = "EUR"),
              (e.Aed = "AED"),
              (e.Inr = "INR"),
              (e.Krw = "KRW"),
              (e.Gbp = "GBP"),
              (e.Jpy = "JPY"),
              (e.Cny = "CNY"),
              (e.Try = "TRY"),
              (e.Brl = "BRL"),
              (e.Idr = "IDR");
          })(S || (S = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.Project = "PROJECT");
          })(A || (A = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.StickyFactor = "STICKY_FACTOR"),
              (e.Dau = "DAU"),
              (e.Wau = "WAU"),
              (e.Mau = "MAU"),
              (e.NewUsersDay = "NEW_USERS_DAY"),
              (e.NewUsersWeek = "NEW_USERS_WEEK"),
              (e.NewUsersMonth = "NEW_USERS_MONTH");
          })(_ || (_ = {})),
          (function (e) {
            (e.System = "SYSTEM"), (e.Developer = "DEVELOPER");
          })(I || (I = {})),
          (function (e) {
            (e.ChangeStatus = "CHANGE_STATUS"),
              (e.ChangeProgressStatus = "CHANGE_PROGRESS_STATUS"),
              (e.Message = "MESSAGE");
          })(C || (C = {})),
          (function (e) {
            (e.New = "NEW"),
              (e.CreatingDraft = "CREATING_DRAFT"),
              (e.RequestForUpdate = "REQUEST_FOR_UPDATE"),
              (e.ReadyForTest = "READY_FOR_TEST"),
              (e.ChangesRequired = "CHANGES_REQUIRED"),
              (e.WaitingForDeveloper = "WAITING_FOR_DEVELOPER"),
              (e.Testing = "TESTING"),
              (e.SendingToModeration = "SENDING_TO_MODERATION"),
              (e.WaitingForModeration = "WAITING_FOR_MODERATION"),
              (e.WaitingForRelease = "WAITING_FOR_RELEASE"),
              (e.Published = "PUBLISHED"),
              (e.Rejected = "REJECTED"),
              (e.Cancelled = "CANCELLED");
          })(O || (O = {})),
          (function (e) {
            (e.AdsRevenueSum = "AdsRevenueSum"),
              (e.PurchasesRevenueSum = "PurchasesRevenueSum"),
              (e.TotalRevenue = "TotalRevenue"),
              (e.DeveloperRevenue = "DeveloperRevenue");
          })(R || (R = {})),
          (function (e) {
            (e.Purchases = "Purchases"), (e.Ads = "Ads");
          })(k || (k = {})),
          (function (e) {
            (e.Created = "CREATED"),
              (e.Accepted = "ACCEPTED"),
              (e.ReadyForTest = "READY_FOR_TEST"),
              (e.PreTest = "PRE_TEST"),
              (e.WaitingForDeveloper = "WAITING_FOR_DEVELOPER"),
              (e.Tested = "TESTED"),
              (e.SigningDocs = "SIGNING_DOCS"),
              (e.Distributing = "DISTRIBUTING"),
              (e.DistributingPartner = "DISTRIBUTING_PARTNER"),
              (e.Cancelled = "CANCELLED");
          })(D || (D = {})),
          (function (e) {
            (e.Raw = "RAW"), (e.Txt = "TXT"), (e.Html = "HTML");
          })(M || (M = {})),
          (function (e) {
            e.PlayerPrivacyPolicy = "PLAYER_PRIVACY_POLICY";
          })(N || (N = {})),
          (function (e) {
            (e.Name = "NAME"),
              (e.Description = "DESCRIPTION"),
              (e.Review = "REVIEW"),
              (e.FullDescription = "FULL_DESCRIPTION"),
              (e.HowToPlay = "HOW_TO_PLAY"),
              (e.ShareText = "SHARE_TEXT"),
              (e.DocumentContent = "DOCUMENT_CONTENT");
          })(L || (L = {})),
          (function (e) {
            (e.Project = "PROJECT"),
              (e.GamePlatform = "GAME_PLATFORM"),
              (e.Internal = "INTERNAL"),
              (e.Support = "SUPPORT"),
              (e.SupportProject = "SUPPORT_PROJECT");
          })(F || (F = {})),
          (function (e) {
            (e.Image = "IMAGE"),
              (e.File = "FILE"),
              (e.Channel = "CHANNEL"),
              (e.ChannelMessage = "CHANNEL_MESSAGE"),
              (e.ChannelTemplate = "CHANNEL_TEMPLATE"),
              (e.Achievement = "ACHIEVEMENT"),
              (e.AchievementsGroup = "ACHIEVEMENTS_GROUP"),
              (e.Product = "PRODUCT"),
              (e.Project = "PROJECT"),
              (e.Leaderboard = "LEADERBOARD"),
              (e.Reward = "REWARD"),
              (e.Trigger = "TRIGGER"),
              (e.Events = "EVENTS"),
              (e.Document = "DOCUMENT"),
              (e.GamesCollections = "GAMES_COLLECTIONS"),
              (e.GamePlatform = "GAME_PLATFORM"),
              (e.GamePlatformCollection = "GAME_PLATFORM_COLLECTION"),
              (e.GamePlatformPage = "GAME_PLATFORM_PAGE"),
              (e.GamePlatformMenu = "GAME_PLATFORM_MENU"),
              (e.Article = "ARTICLE");
          })(x || (x = {})),
          (function (e) {
            (e.Event = "EVENT"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Project = "PROJECT");
          })(j || (j = {})),
          (function (e) {
            (e.Event = "EVENT"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Count = "COUNT");
          })($ || ($ = {})),
          (function (e) {
            (e.Date = "DATE"), (e.Plan = "PLAN"), (e.Project = "PROJECT");
          })(U || (U = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Plan = "PLAN"),
              (e.Count = "COUNT"),
              (e.Size = "SIZE");
          })(G || (G = {})),
          (function (e) {
            (e.Any = "ANY"),
              (e.Portrait = "PORTRAIT"),
              (e.Landscape = "LANDSCAPE");
          })(B || (B = {})),
          (function (e) {
            (e.Standard = "STANDARD"), (e.PopOut = "POP_OUT");
          })(W || (W = {})),
          (function (e) {
            (e.MainSlider = "MAIN_SLIDER"),
              (e.LargeHorizontalTiles = "LARGE_HORIZONTAL_TILES"),
              (e.LargeVerticalTiles = "LARGE_VERTICAL_TILES"),
              (e.SmallSquareTiles = "SMALL_SQUARE_TILES"),
              (e.SmallHorizontalTiles = "SMALL_HORIZONTAL_TILES"),
              (e.MediumHorizontalTiles = "MEDIUM_HORIZONTAL_TILES"),
              (e.MediumMasonry_1B_2STiles = "MEDIUM_MASONRY_1B_2S_TILES"),
              (e.ExtraSmallSquareTiles = "EXTRA_SMALL_SQUARE_TILES");
          })(q || (q = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.PlayersMau = "PLAYERS_MAU"),
              (e.Online = "ONLINE"),
              (e.Rating = "RATING"),
              (e.RelevanceSimple = "RELEVANCE_SIMPLE");
          })(V || (V = {})),
          (function (e) {
            (e.Collection = "COLLECTION"),
              (e.Category = "CATEGORY"),
              (e.Categories = "CATEGORIES"),
              (e.Game = "GAME"),
              (e.GameFrame = "GAME_FRAME"),
              (e.Page = "PAGE"),
              (e.MainPage = "MAIN_PAGE"),
              (e.Search = "SEARCH"),
              (e.Tag = "TAG"),
              (e.Tags = "TAGS");
          })(Y || (Y = {})),
          (function (e) {
            (e.Premium = "PREMIUM"), (e.App = "APP");
          })(z || (z = {})),
          (function (e) {
            (e.Link = "LINK"),
              (e.Collection = "COLLECTION"),
              (e.Game = "GAME"),
              (e.Page = "PAGE"),
              (e.Category = "CATEGORY"),
              (e.Tag = "TAG");
          })(J || (J = {})),
          (function (e) {
            (e.Aside = "ASIDE"), (e.Footer = "FOOTER");
          })(K || (K = {})),
          (function (e) {
            (e.Content = "CONTENT"),
              (e.Custom = "CUSTOM"),
              (e.Collection = "COLLECTION"),
              (e.Tag = "TAG"),
              (e.Category = "CATEGORY"),
              (e.MyGames = "MY_GAMES");
          })(Z || (Z = {})),
          (function (e) {
            (e.InApp = "IN_APP"), (e.OnPlatform = "ON_PLATFORM");
          })(X || (X = {})),
          (function (e) {
            (e.Available = "AVAILABLE"), (e.OnPlatform = "ON_PLATFORM");
          })(H || (H = {})),
          (function (e) {
            (e.Day = "DAY"), (e.Month = "MONTH"), (e.Year = "YEAR");
          })(Q || (Q = {})),
          (function (e) {
            (e.Date = "DATE"), (e.Plan = "PLAN"), (e.Project = "PROJECT");
          })(ee || (ee = {})),
          (function (e) {
            (e.Date = "DATE"), (e.Plan = "PLAN"), (e.Count = "COUNT");
          })(te || (te = {})),
          (function (e) {
            (e.GameIcon = "GAME_ICON"),
              (e.GameIcon4X3 = "GAME_ICON4X3"),
              (e.GameIcon3X4 = "GAME_ICON3X4"),
              (e.GameCover = "GAME_COVER"),
              (e.GameCoverPortrait = "GAME_COVER_PORTRAIT"),
              (e.GameBackground = "GAME_BACKGROUND"),
              (e.GameScreenshotAlbum = "GAME_SCREENSHOT_ALBUM"),
              (e.GameScreenshotPortrait = "GAME_SCREENSHOT_PORTRAIT");
          })(ne || (ne = {})),
          (function (e) {
            (e.Date = "DATE"), (e.Plan = "PLAN"), (e.Project = "PROJECT");
          })(ie || (ie = {})),
          (function (e) {
            (e.Date = "DATE"), (e.Plan = "PLAN"), (e.Count = "COUNT");
          })(re || (re = {})),
          (function (e) {
            (e.En = "EN"),
              (e.Fr = "FR"),
              (e.It = "IT"),
              (e.De = "DE"),
              (e.Es = "ES"),
              (e.Zh = "ZH"),
              (e.Pt = "PT"),
              (e.Ko = "KO"),
              (e.Ja = "JA"),
              (e.Ru = "RU"),
              (e.Tr = "TR"),
              (e.Ar = "AR"),
              (e.Hi = "HI"),
              (e.Id = "ID");
          })(se || (se = {})),
          (function (e) {
            (e.Google = "GOOGLE"),
              (e.Yandex = "YANDEX"),
              (e.XsollaLogin = "XSOLLA_LOGIN"),
              (e.Social = "SOCIAL"),
              (e.Email = "EMAIL"),
              (e.Phone = "PHONE"),
              (e.Device = "DEVICE");
          })(ae || (ae = {})),
          (function (e) {
            e.Android = "ANDROID";
          })(oe || (oe = {})),
          (function (e) {
            (e.Add = "ADD"), (e.Remove = "REMOVE"), (e.Set = "SET");
          })(ce || (ce = {})),
          (function (e) {
            e.PlayerField = "PLAYER_FIELD";
          })(le || (le = {})),
          (function (e) {
            (e.InvitationSent = "INVITATION_SENT"),
              (e.InProject = "IN_PROJECT");
          })(he || (he = {})),
          (function (e) {
            (e.News = "NEWS"),
              (e.DistributionUpdate = "DISTRIBUTION_UPDATE"),
              (e.SupportMessage = "SUPPORT_MESSAGE");
          })(ue || (ue = {})),
          (function (e) {
            (e.ExchangeToken = "ExchangeToken"),
              (e.AccessToken = "AccessToken");
          })(de || (de = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.Project = "PROJECT");
          })(pe || (pe = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.Avg = "AVG"),
              (e.Peak = "PEAK");
          })(fe || (fe = {})),
          (function (e) {
            (e.New = "NEW"), (e.Paid = "PAID");
          })(me || (me = {})),
          (function (e) {
            (e.Company = "COMPANY"),
              (e.Individual = "INDIVIDUAL"),
              (e.SoleProprietor = "SOLE_PROPRIETOR"),
              (e.SelfEmployed = "SELF_EMPLOYED");
          })(ve || (ve = {})),
          (function (e) {
            (e.External = "EXTERNAL"), (e.Internal = "INTERNAL");
          })(ye || (ye = {})),
          (function (e) {
            (e.Xsolla = "XSOLLA"),
              (e.Robokassa = "ROBOKASSA"),
              (e.GooglePlay = "GOOGLE_PLAY"),
              (e.Stripe = "STRIPE"),
              (e.Onestore = "ONESTORE");
          })(ge || (ge = {})),
          (function (e) {
            (e.Playdia = "PLAYDIA"),
              (e.Coolmath = "COOLMATH"),
              (e.Y8 = "Y8"),
              (e.Fotostrana = "FOTOSTRANA"),
              (e.JioGames = "JIO_GAMES"),
              (e.Telegram = "TELEGRAM"),
              (e.GooglePlay = "GOOGLE_PLAY"),
              (e.Yandex = "YANDEX"),
              (e.Vk = "VK"),
              (e.Ok = "OK"),
              (e.GameMonetize = "GAME_MONETIZE"),
              (e.GameDistribution = "GAME_DISTRIBUTION"),
              (e.CrazyGames = "CRAZY_GAMES"),
              (e.Smartmarket = "SMARTMARKET"),
              (e.Fb = "FB"),
              (e.Poki = "POKI"),
              (e.Gamepix = "GAMEPIX"),
              (e.VkPlay = "VK_PLAY"),
              (e.WgPlayground = "WG_PLAYGROUND"),
              (e.Beeline = "BEELINE"),
              (e.Kongregate = "KONGREGATE"),
              (e.Playdeck = "PLAYDECK"),
              (e.Custom = "CUSTOM"),
              (e.Partner = "PARTNER"),
              (e.AppGallery = "APP_GALLERY"),
              (e.GalaxyStore = "GALAXY_STORE"),
              (e.OneStore = "ONE_STORE"),
              (e.AmazonAppstore = "AMAZON_APPSTORE"),
              (e.XiaomiGetapps = "XIAOMI_GETAPPS"),
              (e.Aptoide = "APTOIDE"),
              (e.Rustore = "RUSTORE"),
              (e.Android = "ANDROID"),
              (e.Pikabu = "PIKABU"),
              (e.XiaomiGamecenter = "XIAOMI_GAMECENTER"),
              (e.None = "NONE");
          })(we || (we = {})),
          (function (e) {
            (e.InGame = "IN_GAME"),
              (e.CurrencyBundle = "CURRENCY_BUNDLE"),
              (e.Vip = "VIP"),
              (e.SkipAd = "SKIP_AD");
          })(Pe || (Pe = {})),
          (function (e) {
            (e.Local = "LOCAL"), (e.Platform = "PLATFORM"), (e.Cloud = "CLOUD");
          })(be || (be = {})),
          (function (e) {
            (e.Category = "CATEGORY"), (e.Tag = "TAG"), (e.Engine = "ENGINE");
          })(Ee || (Ee = {})),
          (function (e) {
            (e.Player = "PLAYER"),
              (e.Profile = "PROFILE"),
              (e.Product = "PRODUCT"),
              (e.Platform = "PLATFORM"),
              (e.Consumed = "CONSUMED"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Project = "PROJECT");
          })(Te || (Te = {})),
          (function (e) {
            (e.Player = "PLAYER"),
              (e.Product = "PRODUCT"),
              (e.Platform = "PLATFORM"),
              (e.Consumed = "CONSUMED"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Total = "TOTAL"),
              (e.Price = "PRICE");
          })(Se || (Se = {})),
          (function (e) {
            (e.Common = "COMMON"),
              (e.Uncommon = "UNCOMMON"),
              (e.Rare = "RARE"),
              (e.Epic = "EPIC"),
              (e.Legendary = "LEGENDARY"),
              (e.Mythic = "MYTHIC");
          })(Ae || (Ae = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.Project = "PROJECT");
          })(_e || (_e = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.RetentionDay = "RETENTION_DAY"),
              (e.RetentionWeek = "RETENTION_WEEK"),
              (e.RetentionMonth = "RETENTION_MONTH"),
              (e.NewUsersDay = "NEW_USERS_DAY"),
              (e.NewUsersWeek = "NEW_USERS_WEEK"),
              (e.NewUsersMonth = "NEW_USERS_MONTH"),
              (e.ReturnedUsersDay = "RETURNED_USERS_DAY"),
              (e.ReturnedUsersWeek = "RETURNED_USERS_WEEK"),
              (e.ReturnedUsersMonth = "RETURNED_USERS_MONTH");
          })(Ie || (Ie = {})),
          (function (e) {
            e.Common = "COMMON";
          })(Ce || (Ce = {})),
          (function (e) {
            (e.Reward = "REWARD"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Project = "PROJECT");
          })(Oe || (Oe = {})),
          (function (e) {
            (e.Reward = "REWARD"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.GivenCount = "GIVEN_COUNT"),
              (e.AcceptedCount = "ACCEPTED_COUNT");
          })(Re || (Re = {})),
          (function (e) {
            (e.ActiveDays = "ACTIVE_DAYS"),
              (e.ActiveDaysConsecutive = "ACTIVE_DAYS_CONSECUTIVE");
          })(ke || (ke = {})),
          (function (e) {
            (e.Gamepush = "GAMEPUSH"), (e.Spellsync = "SPELLSYNC");
          })(De || (De = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.Project = "PROJECT");
          })(Me || (Me = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.SessionTime = "SESSION_TIME"),
              (e.SessionsCount = "SESSIONS_COUNT"),
              (e.InGameTime = "IN_GAME_TIME");
          })(Ne || (Ne = {})),
          (function (e) {
            (e.Px = "PX"), (e.Percent = "PERCENT");
          })(Le || (Le = {})),
          (function (e) {
            (e.Asc = "ASC"), (e.Desc = "DESC");
          })(Fe || (Fe = {})),
          (function (e) {
            (e.Account = "Account"),
              (e.Project = "Project"),
              (e.Platform = "Platform");
          })(xe || (xe = {})),
          (function (e) {
            (e.System = "SYSTEM"), (e.Developer = "DEVELOPER");
          })(je || (je = {})),
          (function (e) {
            e.Message = "MESSAGE";
          })($e || ($e = {})),
          (function (e) {
            (e.Desktop = "Desktop"),
              (e.Ios = "IOS"),
              (e.Android = "Android"),
              (e.Tv = "TV");
          })(Ue || (Ue = {})),
          (function (e) {
            (e.Honorary = "HONORARY"),
              (e.Release = "RELEASE"),
              (e.Absolute = "ABSOLUTE"),
              (e.Start = "START"),
              (e.Advanced = "ADVANCED"),
              (e.Pro = "PRO"),
              (e.Enterprise = "ENTERPRISE"),
              (e.Premium = "PREMIUM"),
              (e.Unlimited = "UNLIMITED");
          })(Ge || (Ge = {})),
          (function (e) {
            (e.Common = "COMMON"),
              (e.Scheduler = "SCHEDULER"),
              (e.Event = "EVENT");
          })(Be || (Be = {})),
          (function (e) {
            (e.Trigger = "TRIGGER"),
              (e.Type = "TYPE"),
              (e.Entity = "ENTITY"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Project = "PROJECT");
          })(We || (We = {})),
          (function (e) {
            (e.Trigger = "TRIGGER"),
              (e.Type = "TYPE"),
              (e.Entity = "ENTITY"),
              (e.Platform = "PLATFORM"),
              (e.Dev = "DEV"),
              (e.Date = "DATE"),
              (e.Count = "COUNT");
          })(qe || (qe = {})),
          (function (e) {
            e.Player = "PLAYER";
          })(Ve || (Ve = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Platform = "PLATFORM"),
              (e.Plan = "PLAN"),
              (e.Action = "ACTION"),
              (e.Project = "PROJECT");
          })(Ye || (Ye = {})),
          (function (e) {
            (e.Date = "DATE"),
              (e.Action = "ACTION"),
              (e.Requests = "REQUESTS"),
              (e.Plan = "PLAN"),
              (e.Platform = "PLATFORM");
          })(ze || (ze = {})),
          (function (e) {
            (e.PurchasePlayerPurchase = "PurchasePlayerPurchase"),
              (e.ConsumePlayerPurchase = "ConsumePlayerPurchase"),
              (e.ExpirePlayerSubscription = "ExpirePlayerSubscription"),
              (e.CancelPlayerSubscription = "CancelPlayerSubscription"),
              (e.ResumePlayerSubscription = "ResumePlayerSubscription"),
              (e.UnlockPlayerAchievement = "UnlockPlayerAchievement"),
              (e.PlayerSetAchievementProgress = "PlayerSetAchievementProgress"),
              (e.PlayerSendInviteToChannel = "PlayerSendInviteToChannel"),
              (e.PlayerCancelInviteToChannel = "PlayerCancelInviteToChannel"),
              (e.PlayerAcceptInviteToChannel = "PlayerAcceptInviteToChannel"),
              (e.PlayerRejectInviteToChannel = "PlayerRejectInviteToChannel"),
              (e.PlayerJoinChannel = "PlayerJoinChannel"),
              (e.PlayerLeaveChannel = "PlayerLeaveChannel"),
              (e.PlayerCancelJoinChannel = "PlayerCancelJoinChannel"),
              (e.PlayerAcceptJoinRequestToChannel =
                "PlayerAcceptJoinRequestToChannel"),
              (e.PlayerRejectJoinRequestToChannel =
                "PlayerRejectJoinRequestToChannel"),
              (e.PlayerKickFromChannel = "PlayerKickFromChannel"),
              (e.PlayerSendPersonalMessage = "PlayerSendPersonalMessage"),
              (e.PlayerSendFeedMessage = "PlayerSendFeedMessage"),
              (e.PlayerSendMessage = "PlayerSendMessage"),
              (e.PlayerEditMessage = "PlayerEditMessage"),
              (e.PlayerDeleteMessage = "PlayerDeleteMessage"),
              (e.PlayerMutePlayerInChannel = "PlayerMutePlayerInChannel"),
              (e.PlayerUnmutePlayerInChannel = "PlayerUnmutePlayerInChannel"),
              (e.PlayerCreateChannel = "PlayerCreateChannel"),
              (e.PlayerUpdateChannel = "PlayerUpdateChannel"),
              (e.PlayerDeleteChannel = "PlayerDeleteChannel"),
              (e.UploadPlayerFile = "UploadPlayerFile"),
              (e.UploadPlayerImage = "UploadPlayerImage"),
              (e.PlayerPublishRecord = "PlayerPublishRecord"),
              (e.SyncPlayer = "SyncPlayer"),
              (e.GetPlayer = "GetPlayer"),
              (e.GivePlayerReward = "GivePlayerReward"),
              (e.RegisterPlayerUniqueValue = "RegisterPlayerUniqueValue"),
              (e.DeletePlayerUniqueValue = "DeletePlayerUniqueValue"),
              (e.PlayerActivateTrigger = "PlayerActivateTrigger");
          })(Je || (Je = {}));
        const Ze = Ke.ZP`
    fragment imageAsset on Asset {
  __typename
  ... on ImageAsset {
    type
    resources {
      src
      crop {
        left
        top
        width
        height
      }
    }
  }
}
    `,
          Xe = Ke.ZP`
    fragment project on Project {
  id
  name
  icon
  publicToken
  orderedAchievementsGroups
  achievements {
    isLockedVisible
    isLockedDescriptionVisible
    enableUnlockToast
  }
  origins {
    origin
    isDev
    isActive
  }
  config {
    lang
    avatarGenerator
    ymCounterId
    gtagCounterId
    showLoader
    showReqCounter
  }
  assets {
    icon {
      ...imageAsset
    }
  }
}
    ${Ze}`;
        Ke.ZP`
    mutation createProject($input: CreateProjectInput!) {
  result: CreateProject(input: $input) {
    ...project
  }
}
    ${Xe}`;
      },
      6438: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => s });
        var i = n(8293);
        const r = [
          "adsbox",
          "advertisement",
          "pub_300x250",
          "pub_300x250m",
          "pub_728x90",
          "text-ad",
          "textAd",
          "text_ad",
          "text_ads",
          "text-ads",
          "text-ad-links",
        ];
        function s() {
          const e = (0, i._)(),
            t = document.createElement("div");
          return (
            (t.innerHTML = "&nbsp;"),
            (t.className = r.join(" ")),
            (t.id = "text_ad"),
            (t.style.padding = "1px 0 0 0"),
            document.body.appendChild(t),
            setTimeout(() => {
              e.done(0 === t.offsetHeight), document.body.removeChild(t);
            }, 10),
            e.ready
          );
        }
      },
      1049: (e, t, n) => {
        "use strict";
        function i(e, t, n) {
          return e.replace(/{{hash}}/gi, t).replace(/{{size}}/gi, n);
        }
        n.d(t, { Z: () => i });
      },
      5239: (e, t, n) => {
        "use strict";
        n.d(t, { X: () => i, S: () => r });
        function i(e) {
          return (
            (t = this),
            (n = void 0),
            (r = function* () {
              const t = new TextEncoder().encode(e),
                n = yield crypto.subtle.digest("SHA-256", t);
              return Array.from(new Uint8Array(n))
                .map((e) => e.toString(16).padStart(2, "0"))
                .join("");
            }),
            new ((i = void 0) || (i = Promise))(function (e, s) {
              function a(e) {
                try {
                  c(r.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(r.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(t) {
                var n;
                t.done
                  ? e(t.value)
                  : ((n = t.value),
                    n instanceof i
                      ? n
                      : new i(function (e) {
                          e(n);
                        })).then(a, o);
              }
              c((r = r.apply(t, n || [])).next());
            })
          );
          var t, n, i, r;
        }
        function r(e) {
          for (var t = 0, n = 9; t < e.length; )
            n = Math.imul(n ^ e.charCodeAt(t++), 387420489);
          return (n ^ (n >>> 9)).toString(16);
        }
      },
      6480: (e, t, n) => {
        "use strict";
        function i(e, t) {
          return !e || (t && "none" !== t) ? t : "last";
        }
        function r(e) {
          return e > 10 ? 10 : e;
        }
        function s(e, t) {
          return e || t.limit;
        }
        function a(e, t) {
          const n = new Set([...e.map((e) => e.id), ...t.map((e) => e.id)]);
          return (
            e.forEach((e) => {
              n.has(e.id) && n.delete(e.id);
            }),
            n.size
          );
        }
        n.d(t, { oo: () => i, pY: () => r, wQ: () => s, q3: () => a });
      },
      1961: (e, t, n) => {
        "use strict";
        n.d(t, { vf: () => s, hF: () => a, Yc: () => o });
        var i = n(9503),
          r = function (e, t, n, i) {
            return new (n || (n = Promise))(function (r, s) {
              function a(e) {
                try {
                  c(i.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(i.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t);
                        })).then(a, o);
              }
              c((i = i.apply(e, t || [])).next());
            });
          };
        function s(e) {
          return r(this, void 0, void 0, function* () {
            const { default: t } = yield n(6958)(`./${e}.json`);
            return t;
          });
        }
        function a(e) {
          return r(this, void 0, void 0, function* () {
            const { default: t } = yield n(4618)(`./${e}.json`);
            return t;
          });
        }
        function o() {
          const e = navigator.language.slice(0, 2).toLowerCase();
          return Object.values(i.Uo).includes(e) ? e : null;
        }
      },
      4917: (e, t, n) => {
        "use strict";
        function i({ src: e, check: t }) {
          return new Promise((n, i) => {
            let r = 0;
            if (null == t ? void 0 : t(window)) return void n();
            function s() {
              t ? t(window) && (clearInterval(r), n()) : n();
            }
            if (document.querySelector(`script[src="${e}"]`) && t)
              return void (r = setInterval(s, 100));
            var a = document.getElementsByTagName("script")[0];
            const o = document.createElement("script");
            (o.src = e),
              (o.onload = s),
              (o.onerror = i),
              (o.onabort = i),
              a.parentNode.insertBefore(o, a),
              t && (r = setInterval(s, 100));
          });
        }
        n.d(t, { Z: () => i });
      },
      6558: (e, t, n) => {
        "use strict";
        n.d(t, { Yd: () => i, kg: () => r, EK: () => s });
        class i {
          constructor() {
            (this.isCollectingLogs = !0),
              (this.logs = []),
              (this.log = (...e) => {
                this.collectLogs("log", e), console.log(this.name, ...e);
              }),
              (this.info = (...e) => {
                this.collectLogs("info", e), console.info(this.name, ...e);
              }),
              (this.warn = (...e) => {
                this.collectLogs("warn", e), console.warn(this.name, ...e);
              }),
              (this.error = (...e) => {
                this.collectLogs("error", e), console.error(this.name, ...e);
              }),
              (this.assert = (...e) => {
                this.collectLogs("assert", e),
                  console.assert(...e, { name: this.name });
              });
          }
          get name() {
            return `${globalThis.__SDKProvider || "SDK"}`;
          }
          stopCollect() {
            (this.isCollectingLogs = !1), (this.logs = []);
          }
          collectLogs(e, t) {
            this.isCollectingLogs && this.logs.push({ type: e, args: t });
          }
        }
        let r = new i();
        const s = (e) => (r = e);
      },
      1437: (e, t, n) => {
        "use strict";
        n.d(t, { p: () => r });
        var i = n(8293);
        function r(e) {
          const t = (0, i._)(i.s),
            n = new Image();
          return (
            (n.onload = () => t.done(n)),
            (n.onerror = () => t.abort()),
            (n.onabort = () => t.abort()),
            (n.src = e),
            t.ready
          );
        }
      },
      3357: (e, t, n) => {
        "use strict";
        n.d(t, { q: () => r });
        var i = n(180);
        const r = (e) => ({
          isLocalSave: e === i.pQ.Local,
          isCloudSave: e === i.pQ.Cloud,
          isPlatformSave: e === i.pQ.Platform,
          format: e,
        });
      },
      6041: (e, t, n) => {
        "use strict";
        n.d(t, { ZP: () => a, Ls: () => o, OG: () => c });
        const i = 2048,
          r =
            /cdn.(eponesh|gamepush|spellsync).com\/static(\/([\d\-]+.)([\d\-]+.)|)\/(.*)/,
          s = /-(\d+)x(\d+)\.\w+$/;
        function a(e, t, n, a) {
          const o = r.exec(e);
          if (!o) return e;
          const [c, l] = (function (e) {
            const t = s.exec(e);
            return t ? [Number(t[1]) || 0, Number(t[2]) || 0] : [0, 0];
          })(e);
          c && t > c && (t = c),
            l && n > l && (n = l),
            t > i && (t = i),
            n > i && (n = i);
          const [, h, , , , u] = o;
          return `https://cdn.${h}.com/static/${t || "-"}x${n || "-"}${
            a ? "crop" : ""
          }/${u}`;
        }
        function o(e, t) {
          if (!r.exec(e)) return e;
          const n = new URL(e);
          return (
            (n.pathname = n.pathname.replace(/(\.[^.]*)$/, `.${t}`)),
            n.toString()
          );
        }
        function c(e) {
          return r.exec(e)
            ? e
                .replace(/\/static\/[^\/]+\/images\//, "/static/images/")
                .replace("eponesh.com", "gamepush.com")
            : e;
        }
      },
      8866: (e, t, n) => {
        "use strict";
        function i(e) {
          return new Promise((t) => setTimeout(t, e));
        }
        n.d(t, { Z: () => i });
      },
      4835: (e, t, n) => {
        "use strict";
        n.d(t, { Z: () => i });
        const i = {
          app: { trophy: "https://gs.eponesh.com/sdk/static/icons/trophy.svg" },
          cdn: { trophy: "https://gs.eponesh.com/sdk/static/icons/reward.png" },
        };
      },
      8293: (e, t, n) => {
        "use strict";
        n.d(t, { s: () => r, _: () => s });
        var i = n(6558);
        const r = { timeout: 5e3 };
        function s({ timeout: e = 0 } = {}) {
          let t = !1;
          const n = {},
            r = new Promise((e, s) => {
              (n.done = (n) => {
                if (!t) return (t = !0), e(n), r;
              }),
                (n.abort = (e) => {
                  if (!t) return (t = !0), i.kg.error(e), s(e), r;
                });
            });
          return (
            e &&
              setTimeout(() => {
                t || n.abort(`Timeout ${e}ms exceeded`);
              }, e),
            (n.ready = r),
            n
          );
        }
      },
      3607: (e, t, n) => {
        "use strict";
        n.d(t, { _X: () => i._ }), n(433), n(264);
        var i = n(8293);
      },
      5942: (e, t, n) => {
        "use strict";
        var i;
        n.d(t, { z: () => i }),
          (function (e) {
            (e.TELEGRAM = "TELEGRAM"),
              (e.YANDEX = "YANDEX"),
              (e.VK = "VK"),
              (e.OK = "OK"),
              (e.GAME_MONETIZE = "GAME_MONETIZE"),
              (e.GAME_DISTRIBUTION = "GAME_DISTRIBUTION"),
              (e.WG_PLAYGROUND = "WG_PLAYGROUND"),
              (e.CRAZY_GAMES = "CRAZY_GAMES"),
              (e.SMARTMARKET = "SMARTMARKET"),
              (e.GAMEPIX = "GAMEPIX"),
              (e.POKI = "POKI"),
              (e.VK_PLAY = "VK_PLAY"),
              (e.BEELINE = "BEELINE"),
              (e.KONGREGATE = "KONGREGATE"),
              (e.CUSTOM = "CUSTOM"),
              (e.PLAYDECK = "PLAYDECK"),
              (e.GOOGLE_PLAY = "GOOGLE_PLAY"),
              (e.APP_GALLERY = "APP_GALLERY"),
              (e.GALAXY_STORE = "GALAXY_STORE"),
              (e.ONE_STORE = "ONE_STORE"),
              (e.AMAZON_APPSTORE = "AMAZON_APPSTORE"),
              (e.XIAOMI_GETAPPS = "XIAOMI_GETAPPS"),
              (e.APTOIDE = "APTOIDE"),
              (e.RUSTORE = "RUSTORE"),
              (e.ANDROID = "ANDROID"),
              (e.FOTOSTRANA = "FOTOSTRANA"),
              (e.Y8 = "Y8"),
              (e.PARTNER = "PARTNER"),
              (e.COOLMATH = "COOLMATH"),
              (e.XIAOMI_GAMECENTER = "XIAOMI_GAMECENTER"),
              (e.PLAYDIA = "PLAYDIA"),
              (e.YOUTUBE = "YOUTUBE"),
              (e.ARKADIUM = "ARKADIUM"),
              (e.PLAYGAMA = "PLAYGAMA"),
              (e.NONE = "NONE");
          })(i || (i = {}));
      },
      1438: (e, t, n) => {
        "use strict";
        var i;
        n.d(t, { i: () => i }),
          (function (e) {
            (e.New = "NEW"), (e.Paid = "PAID");
          })(i || (i = {}));
      },
      180: (e, t, n) => {
        "use strict";
        n.d(t, {
          $: () => i,
          L_: () => r,
          qr: () => s,
          h5: () => a,
          Fl: () => o,
          tM: () => c,
          pQ: () => l,
          BT: () => h,
          MU: () => u,
          cu: () => d,
          J1: () => p,
          iA: () => v,
        });
        var i,
          r,
          s,
          a,
          o,
          c,
          l,
          h,
          u,
          d,
          p,
          f = n(5942);
        !(function (e) {
          (e.PRELOADER = "PRELOADER"),
            (e.FULLSCREEN = "FULLSCREEN"),
            (e.REWARDED = "REWARDED"),
            (e.STICKY = "STICKY");
        })(i || (i = {})),
          (function (e) {
            (e.Xsolla = "XSOLLA"),
              (e.Robokassa = "ROBOKASSA"),
              (e.Stripe = "STRIPE"),
              (e.OneStore = "ONESTORE"),
              (e.GooglePlay = "GOOGLE_PLAY");
          })(r || (r = {})),
          (function (e) {
            (e.Webhook = "WEBHOOK"), (e.ClientSide = "CLIENT_SIDE");
          })(s || (s = {})),
          (function (e) {
            (e.Y8Minimal = "Y8_MINIMAL"), (e.Adsense = "ADSENSE");
          })(a || (a = {})),
          (function (e) {
            (e.YandexSimpleMonetization = "YandexSimpleMonetization"),
              (e.Adfox = "ADFOX"),
              (e.Gpt = "GPT"),
              (e.Rtb = "RTB"),
              (e.Advertonic = "ADVERTONIC"),
              (e.Adsense = "ADSENSE"),
              (e.TmAds = "TMADS"),
              (e.Adsgram = "ADSGRAM"),
              (e.Adsonar = "ADSONAR");
          })(o || (o = {})),
          (function (e) {
            (e.top = "TOP"), (e.bottom = "BOTTOM");
          })(c || (c = {})),
          (function (e) {
            (e.Local = "LOCAL"), (e.Platform = "PLATFORM"), (e.Cloud = "CLOUD");
          })(l || (l = {})),
          (function (e) {
            (e.External = "EXTERNAL"), (e.Internal = "INTERNAL");
          })(h || (h = {})),
          (function (e) {
            (e.External = "EXTERNAL"), (e.Internal = "INTERNAL");
          })(u || (u = {})),
          (function (e) {
            (e.External = "EXTERNAL"),
              (e.Internal = "INTERNAL"),
              (e.Pikabu = "PIKABU"),
              (e.ExternalToken = "EXTRANAL_TOKEN");
          })(d || (d = {})),
          (function (e) {
            (e.Xsolla = "XSOLLA"), (e.Google = "GOOGLE"), (e.Yandex = "YANDEX");
          })(p || (p = {}));
        const m = () => ({
            type: i.STICKY,
            enabled: !1,
            enabledDesktop: !1,
            adServer: null,
            adServerDesktop: null,
            name: "",
            description: "",
            bannerId: "",
            desktopBannerId: "",
            frequency: 0,
            refreshInterval: 0,
            maxWidth: 0,
            maxHeight: 0,
            maxWidthDimension: "PX",
            maxHeightDimension: "PX",
            desktopMaxWidth: 0,
            desktopMaxHeight: 0,
            desktopMaxWidthDimension: "PX",
            desktopMaxHeightDimension: "PX",
            fitCanvas: !1,
            position: "bottom",
            limits: { hour: 0, day: 0, session: 0 },
            useNative: !0,
          }),
          v = {
            appId: "",
            communityLinks: { en: "" },
            gameLink: "",
            tag: "",
            publicKey: "",
            currencyPluralisations: { en: "" },
            progressSaveFormat: l.Platform,
            alwaysSyncPublicFields: !1,
            customAdsConfig: {
              id: "",
              name: "",
              adFoxOwnerId: "",
              advertonicUserId: "",
              adsenseClientId: "",
              tmAdsAppKey: "",
              adSonarAppId: "",
              description: "",
              configs: {
                web: {
                  implementation: h.Internal,
                  bidders: [],
                  banners: [
                    Object.assign(Object.assign({}, m()), {
                      type: i.FULLSCREEN,
                    }),
                    Object.assign(Object.assign({}, m()), {
                      type: i.PRELOADER,
                    }),
                    Object.assign(Object.assign({}, m()), { type: i.REWARDED }),
                    Object.assign(Object.assign({}, m()), { type: i.STICKY }),
                  ],
                },
                android: {
                  implementation: h.Internal,
                  banners: [
                    Object.assign(Object.assign({}, m()), {
                      type: i.FULLSCREEN,
                    }),
                    Object.assign(Object.assign({}, m()), {
                      type: i.PRELOADER,
                    }),
                    Object.assign(Object.assign({}, m()), { type: i.REWARDED }),
                    Object.assign(Object.assign({}, m()), { type: i.STICKY }),
                  ],
                },
                telegram: {
                  implementation: h.Internal,
                  banners: [
                    Object.assign(Object.assign({}, m()), {
                      type: i.FULLSCREEN,
                    }),
                    Object.assign(Object.assign({}, m()), {
                      type: i.PRELOADER,
                    }),
                    Object.assign(Object.assign({}, m()), { type: i.REWARDED }),
                    Object.assign(Object.assign({}, m()), { type: i.STICKY }),
                  ],
                },
              },
            },
            payload: {},
            customAdsConfigId: "",
            paymentsConfig: {
              id: "",
              name: "",
              description: "",
              sandbox: !0,
              oneStoreConfig: { publicKey: "" },
              configs: {
                web: { implementation: u.Internal, activeService: null },
                android: { implementation: u.Internal, activeService: null },
              },
            },
            paymentsConfigId: "",
            authConfig: {
              id: "",
              name: "",
              description: "",
              xsollaConfig: { loginProjectId: "" },
              googleConfig: { clientID: "" },
              yandexConfig: { clientID: "" },
              configs: {
                web: { implementation: d.Internal, activeService: null },
                android: { implementation: d.Internal, activeService: null },
              },
            },
            authConfigId: "",
            type: f.z.NONE,
            banners: [
              Object.assign(Object.assign({}, m()), {
                type: i.FULLSCREEN,
                enabled: !0,
                frequency: 60,
              }),
              Object.assign(Object.assign({}, m()), {
                type: i.PRELOADER,
                enabled: !1,
              }),
              Object.assign(Object.assign({}, m()), {
                type: i.REWARDED,
                enabled: !0,
              }),
              Object.assign(Object.assign({}, m()), {
                type: i.STICKY,
                enabled: !1,
              }),
            ],
            ymCounterId: 0,
            gtagCounterId: "",
            showResumeOverlay: null,
          };
      },
      6045: (e, t, n) => {
        "use strict";
        var i, r;
        n.d(t, { B8: () => i, Sb: () => r }),
          (function (e) {
            (e.ExchangeToken = "ExchangeToken"),
              (e.AccessToken = "AccessToken");
          })(i || (i = {})),
          (function (e) {
            (e.Server = "Server"), (e.Client = "Client");
          })(r || (r = {}));
      },
      9503: (e, t, n) => {
        "use strict";
        n.d(t, { Uo: () => i, h$: () => a, lR: () => o, GH: () => c });
        var i,
          r = n(180),
          s = n(3793);
        !(function (e) {
          (e.EN = "en"),
            (e.FR = "fr"),
            (e.IT = "it"),
            (e.DE = "de"),
            (e.ES = "es"),
            (e.ZH = "zh"),
            (e.PT = "pt"),
            (e.KO = "ko"),
            (e.JA = "ja"),
            (e.RU = "ru"),
            (e.TR = "tr"),
            (e.AR = "ar"),
            (e.HI = "hi"),
            (e.ID = "id");
        })(i || (i = {}));
        const a = {
            [i.EN]: "en-US",
            [i.FR]: "fr-FR",
            [i.IT]: "it-IT",
            [i.DE]: "de-DE",
            [i.ES]: "es-ES",
            [i.ZH]: "zh-CN",
            [i.PT]: "pt-BR",
            [i.KO]: "ko-KR",
            [i.JA]: "ja-JP",
            [i.RU]: "ru-RU",
            [i.TR]: "tr-TR",
            [i.AR]: "ar-SA",
            [i.HI]: "hi-IN",
            [i.ID]: "id-ID",
          },
          o = {
            isDev: !1,
            isAllowedOrigin: !0,
            config: {
              avatarGenerator: "dicebear_retro",
              avatarGeneratorTemplate: "",
              enableUserUploadFiles: !1,
              enableUserUploadImages: !1,
              ymCounterId: 0,
              gtagCounterId: "",
              showLoader: !1,
              showReqCounter: !1,
              orientation: s.LH.Any,
              showOrientationOverlay: !1,
              showUnsupportedOSOverlay: !1,
              targetOS: [],
              communityLinks: { en: "" },
              showResumeOverlay: !1,
            },
            platformConfig: r.iA,
            playerFields: [],
            serverTime: new Date().toISOString(),
            gameVariables: [],
            acl: {
              canUploadFiles: !1,
              canUploadImages: !1,
              canConnectOnline: !1,
              canCollectStats: !1,
            },
            project: {
              icon: "",
              description: "",
              name: "",
              enableMainChat: !1,
              mainChatId: 0,
              achievements: {
                isLockedVisible: !1,
                isLockedDescriptionVisible: !1,
                enableUnlockToast: !1,
                notificationDisplayTime: 0,
              },
              ads: { showCountdownOverlay: !1, showRewardedFailedOverlay: !1 },
            },
            rewards: [],
            triggers: [],
            products: [],
            achievements: [],
            achievementsGroups: [],
            schedulers: [],
            events: [],
          },
          c = {
            limits: {
              [r.$.PRELOADER]: {
                hour: { timestamp: 0, count: 0 },
                day: { timestamp: 0, count: 0 },
                session: { count: 0 },
              },
              [r.$.FULLSCREEN]: {
                hour: { timestamp: 0, count: 0 },
                day: { timestamp: 0, count: 0 },
                session: { count: 0 },
              },
              [r.$.REWARDED]: {
                hour: { timestamp: 0, count: 0 },
                day: { timestamp: 0, count: 0 },
                session: { count: 0 },
              },
              [r.$.STICKY]: {
                hour: { timestamp: 0, count: 0 },
                day: { timestamp: 0, count: 0 },
                session: { count: 0 },
              },
            },
          };
      },
      4618: (e, t, n) => {
        var i = {
          "./ar.json": [9582, 7808],
          "./de.json": [3268, 9459],
          "./en.json": [7772, 2932],
          "./es.json": [9533, 3968],
          "./fr.json": [1674, 3746],
          "./hi.json": [5262, 7637],
          "./id.json": [6599, 2513],
          "./it.json": [7001, 1159],
          "./ja.json": [8257, 848],
          "./ko.json": [3677, 9670],
          "./pt.json": [3449, 4047],
          "./ru.json": [5207, 5964],
          "./tr.json": [4905, 5066],
          "./zh.json": [2621, 5929],
        };
        function r(e) {
          if (!n.o(i, e))
            return Promise.resolve().then(() => {
              var t = new Error("Cannot find module '" + e + "'");
              throw ((t.code = "MODULE_NOT_FOUND"), t);
            });
          var t = i[e],
            r = t[0];
          return n.e(t[1]).then(() => n.t(r, 3));
        }
        (r.keys = () => Object.keys(i)), (r.id = 4618), (e.exports = r);
      },
      6958: (e, t, n) => {
        var i = {
          "./ar.json": [6278, 7808],
          "./de.json": [9717, 9459],
          "./devtools/en.json": [1868, 8897],
          "./devtools/ru.json": [3845, 5606],
          "./en.json": [7630, 2932],
          "./es.json": [1662, 3968],
          "./external-sdk/ar.json": [9582, 2038],
          "./external-sdk/de.json": [3268, 6215],
          "./external-sdk/en.json": [7772, 8463],
          "./external-sdk/es.json": [9533, 1999],
          "./external-sdk/fr.json": [1674, 4436],
          "./external-sdk/hi.json": [5262, 1036],
          "./external-sdk/id.json": [6599, 3406],
          "./external-sdk/it.json": [7001, 5483],
          "./external-sdk/ja.json": [8257, 9852],
          "./external-sdk/ko.json": [3677, 9843],
          "./external-sdk/pt.json": [3449, 7883],
          "./external-sdk/ru.json": [5207, 5836],
          "./external-sdk/tr.json": [4905, 423],
          "./external-sdk/zh.json": [2621, 7426],
          "./fr.json": [5997, 3746],
          "./hi.json": [5513, 7637],
          "./id.json": [159, 2513],
          "./it.json": [1043, 1159],
          "./ja.json": [3125, 848],
          "./ko.json": [7344, 9670],
          "./pt.json": [8365, 4047],
          "./ru.json": [4313, 5964],
          "./tr.json": [2877, 5066],
          "./zh.json": [5113, 5929],
        };
        function r(e) {
          if (!n.o(i, e))
            return Promise.resolve().then(() => {
              var t = new Error("Cannot find module '" + e + "'");
              throw ((t.code = "MODULE_NOT_FOUND"), t);
            });
          var t = i[e],
            r = t[0];
          return n.e(t[1]).then(() => n.t(r, 3));
        }
        (r.keys = () => Object.keys(i)), (r.id = 6958), (e.exports = r);
      },
    },
    s = {};
  function a(e) {
    var t = s[e];
    if (void 0 !== t) return t.exports;
    var n = (s[e] = { id: e, loaded: !1, exports: {} });
    return r[e].call(n.exports, n, n.exports, a), (n.loaded = !0), n.exports;
  }
  (a.m = r),
    (a.amdD = function () {
      throw new Error("define cannot be used indirect");
    }),
    (a.amdO = {}),
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
    (t = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__),
    (a.t = function (n, i) {
      if ((1 & i && (n = this(n)), 8 & i)) return n;
      if ("object" == typeof n && n) {
        if (4 & i && n.__esModule) return n;
        if (16 & i && "function" == typeof n.then) return n;
      }
      var r = Object.create(null);
      a.r(r);
      var s = {};
      e = e || [null, t({}), t([]), t(t)];
      for (var o = 2 & i && n; "object" == typeof o && !~e.indexOf(o); o = t(o))
        Object.getOwnPropertyNames(o).forEach((e) => (s[e] = () => n[e]));
      return (s.default = () => n), a.d(r, s), r;
    }),
    (a.d = (e, t) => {
      for (var n in t)
        a.o(t, n) &&
          !a.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (a.f = {}),
    (a.e = (e) =>
      Promise.all(Object.keys(a.f).reduce((t, n) => (a.f[n](e, t), t), []))),
    (a.u = (e) =>
      (({
        72: "utils/centrifuge.protobuf",
        369: "platforms/platform.gm",
        423: "i18n/external-sdk-tr-json",
        477: "platforms/platform.gp",
        630: "platforms/platform.playgama",
        836: "platforms/platform.playdia",
        848: "i18n/ja-json",
        851: "platforms/platform.vk.app",
        1036: "i18n/external-sdk-hi-json",
        1159: "i18n/it-json",
        1634: "gs.windows",
        1764: "platforms/platform.xiaomi_gc",
        1911: "platforms/platform.vk",
        1999: "i18n/external-sdk-es-json",
        2038: "i18n/external-sdk-ar-json",
        2513: "i18n/id-json",
        2767: "platforms/platform.playdeck",
        2932: "i18n/en-json",
        3300: "platforms/platform.partner",
        3406: "i18n/external-sdk-id-json",
        3529: "platforms/platform.youtube",
        3746: "i18n/fr-json",
        3968: "i18n/es-json",
        4047: "i18n/pt-json",
        4341: "platforms/platform.fotostrana",
        4436: "i18n/external-sdk-fr-json",
        4552: "platforms/platform.smartmarket",
        4614: "platforms/platform.ok",
        4773: "platforms/platform.one",
        4971: "external.app",
        5066: "i18n/tr-json",
        5433: "platforms/platform.cg",
        5483: "i18n/external-sdk-it-json",
        5606: "i18n/devtools-ru-json",
        5836: "i18n/external-sdk-ru-json",
        5860: "platforms/platform.gd",
        5929: "i18n/zh-json",
        5964: "i18n/ru-json",
        6215: "i18n/external-sdk-de-json",
        6551: "platforms/platform.poki",
        6658: "platforms/platform.beeline",
        6696: "platforms/platform.partner.pure",
        6702: "platforms/platform.cm",
        6755: "platforms/platform.yandex",
        7415: "gs.overlay",
        7426: "i18n/external-sdk-zh-json",
        7573: "platforms/platform.kongregate",
        7637: "i18n/hi-json",
        7808: "i18n/ar-json",
        7883: "i18n/external-sdk-pt-json",
        7982: "platforms/platform.custom.pure",
        8366: "platforms/platform.arkadium",
        8417: "platforms/platform.custom",
        8463: "i18n/external-sdk-en-json",
        8662: "platforms/platform.y8",
        8897: "i18n/devtools-en-json",
        9070: "platforms/platform.vkplay",
        9084: "platforms/platform.wg",
        9459: "i18n/de-json",
        9670: "i18n/ko-json",
        9718: "gs.devtools",
        9843: "i18n/external-sdk-ko-json",
        9852: "i18n/external-sdk-ja-json",
        9885: "platforms/platform.gamepix",
        9967: "platforms/platform.telegram",
      }[e] || e) +
      "." +
      a.h() +
      ".js")),
    (a.h = () => "8b53d72a18d3f03fa838"),
    (a.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n = {}),
    (i = "game-score-sdk:"),
    (a.l = (e, t, r, s) => {
      if (n[e]) n[e].push(t);
      else {
        var o, c;
        if (void 0 !== r)
          for (
            var l = document.getElementsByTagName("script"), h = 0;
            h < l.length;
            h++
          ) {
            var u = l[h];
            if (
              u.getAttribute("src") == e ||
              u.getAttribute("data-webpack") == i + r
            ) {
              o = u;
              break;
            }
          }
        o ||
          ((c = !0),
          ((o = document.createElement("script")).charset = "utf-8"),
          (o.timeout = 120),
          a.nc && o.setAttribute("nonce", a.nc),
          o.setAttribute("data-webpack", i + r),
          (o.src = e),
          0 !== o.src.indexOf(window.location.origin + "/") &&
            (o.crossOrigin = "anonymous")),
          (n[e] = [t]);
        var d = (t, i) => {
            (o.onerror = o.onload = null), clearTimeout(p);
            var r = n[e];
            if (
              (delete n[e],
              o.parentNode && o.parentNode.removeChild(o),
              r && r.forEach((e) => e(i)),
              t)
            )
              return t(i);
          },
          p = setTimeout(
            d.bind(null, void 0, { type: "timeout", target: o }),
            12e4
          );
        (o.onerror = d.bind(null, o.onerror)),
          (o.onload = d.bind(null, o.onload)),
          c && document.head.appendChild(o);
      }
    }),
    (a.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (a.j = 8821),
    (() => {
      var e;
      a.g.importScripts && (e = a.g.location + "");
      var t = a.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var n = t.getElementsByTagName("script");
        n.length && (e = n[n.length - 1].src);
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser"
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (a.p = e);
    })(),
    (() => {
      var e = { 8821: 0, 8742: 0, 11: 0 };
      a.f.j = (t, n) => {
        var i = a.o(e, t) ? e[t] : void 0;
        if (0 !== i)
          if (i) n.push(i[2]);
          else {
            var r = new Promise((n, r) => (i = e[t] = [n, r]));
            n.push((i[2] = r));
            var s = a.p + a.u(t),
              o = new Error();
            a.l(
              s,
              (n) => {
                if (a.o(e, t) && (0 !== (i = e[t]) && (e[t] = void 0), i)) {
                  var r = n && ("load" === n.type ? "missing" : n.type),
                    s = n && n.target && n.target.src;
                  (o.message =
                    "Loading chunk " + t + " failed.\n(" + r + ": " + s + ")"),
                    (o.name = "ChunkLoadError"),
                    (o.type = r),
                    (o.request = s),
                    i[1](o);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = (t, n) => {
          var i,
            r,
            [s, o, c] = n,
            l = 0;
          for (i in o) a.o(o, i) && (a.m[i] = o[i]);
          for (c && c(a), t && t(n); l < s.length; l++)
            (r = s[l]), a.o(e, r) && e[r] && e[r][0](), (e[s[l]] = 0);
        },
        n = (self.webpackChunkgame_score_sdk =
          self.webpackChunkgame_score_sdk || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })(),
    (() => {
      "use strict";
      a(2096);
      var e = a(433);
      const t =
        " fragment translations on Translations { en fr it de es zh pt ko ja ru tr ar id hi }";
      var n,
        i = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const r =
          "\n    id\n    icon(w: 256, h: 256, crop: false)\n    y8Id\n    tag\n    rare\n    progress\n    maxProgress\n    unlocked\n    lockedIcon(w: 256, h: 256, crop: false)\n    progressStep\n    isPublished\n    isLockedVisible\n    isLockedDescriptionVisible\n",
        s =
          "\n    name(lang: $lang)\n    description(lang: $lang)\n    names { ...translations }\n    iconSmall: icon(w: 48, h: 48, crop: false)\n    lockedIconSmall: lockedIcon(w: 48, h: 48, crop: false)\n",
        o = "\n    achievementId\n    createdAt\n    progress\n    unlocked\n",
        c = `${t} mutation ($input: UnlockPlayerAchievementInput!, $lang: Lang) {\n    result: UnlockPlayerAchievement(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on PlayerAchievement {\n            ${o}\n            achievement { ${r} ${s} }\n        }\n    }\n}`,
        l = `${t} mutation ($input: PlayerSetAchievementProgressInput!, $lang: Lang){\n    result: PlayerSetAchievementProgress(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on PlayerAchievement {\n            ${o}\n            achievement { ${r} ${s} }\n        }\n    }\n}`;
      class h {
        constructor(e) {
          n.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, n, e, "f");
        }
        setProgress({ id: e, tag: t, progress: r }) {
          return i(this, n, "f").fetch(l, { id: e, tag: t, progress: r });
        }
        unlock({ id: e, tag: t }) {
          return i(this, n, "f").fetch(c, { id: e, tag: t, v: 2 });
        }
      }
      n = new WeakMap();
      var u = a(6558);
      const d = (e) =>
          `\n    __typename\n    ... on Problem { message }\n    ${e}\n`,
        p = new TextEncoder();
      var f,
        m = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const v =
          "\n    id\n    icon\n    tag\n    price\n    isSubscription\n    period\n    trialPeriod\n    currency\n    currencySymbol\n    yandexId\n    onestoreId\n    googlePlayId\n",
        y =
          "\n    name(lang: $lang)\n    description(lang: $lang)\n    iconSmall: icon(w: 48, h: 48, crop: false)\n",
        g =
          "_id, productId, payload, gift, subscribed, createdAt, orderStatus, expiredAt, needConsumeOnlyOnPlatform",
        w = `{\n    __typename\n    ... on Problem { message }\n    ... on PlayerPurchaseOutput {\n        product { ${v} ${y} }\n        purchase { ${g} }\n    }\n}`,
        P = `query ($input: FindPlayerPurchaseInput!, $lang: Lang) {\n    result: FindPlayerPurchase(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on PlayerPurchaseOutput {\n            product { ${v} ${y} }\n        }\n    }\n}`,
        b = `mutation ($input: SyncPlayerPurchasesInput!) {\n    result: SyncPlayerPurchases(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on PlayerProductsPurchasedOutput {\n            purchases { ${g} }\n        }\n    }\n}`,
        E = `mutation ($input: PurchasePlayerPurchaseInput!, $lang: Lang) {\n    result: PurchasePlayerPurchase(input: $input) ${w}\n}`,
        T = `mutation ($input: ConsumePlayerPurchaseInput!, $lang: Lang) {\n    result: ConsumePlayerPurchase(input: $input) ${w}\n}`,
        S = `mutation ($input: CancelPlayerSubscriptionInput!, $lang: Lang) {\n    result: CancelPlayerSubscription(input: $input) ${w}\n}`,
        A = `mutation ($input: ResumePlayerSubscriptionInput!, $lang: Lang) {\n    result: ResumePlayerSubscription(input: $input) ${w}\n}`,
        _ = `query ($lang: Lang) {\n    result: FetchPlayerPurchases {\n        __typename\n        ... on Problem { message }\n        ... on PlayerPurchasesOutput {\n            products { ${v} ${y} }\n            playerPurchases { ${g} }\n        }\n    }\n}`,
        I = `query ($input: GetPlayerPurchaseInput!) {\n    result: GetPlayerPurchase(input: $input) {\n        __typename\n        ... on PlayerPurchase {\n            ${g}\n        }\n        ... on Problem { message }\n    }\n}`;
      class C {
        constructor(e) {
          f.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, f, e, "f");
        }
        sync({ purchases: e, payload: t }) {
          return m(this, f, "f").fetch(b, { purchases: e, payload: t });
        }
        fetch() {
          return m(this, f, "f").fetch(_);
        }
        getPaymentLink(e) {
          return m(this, f, "f").fetch(
            "query ($input: PlayerGetPaymentLinkInput!) {\n    result: PlayerGetPaymentLink(input: $input) {\n        __typename\n        ... on PlayerPaymentLink { link }\n        ... on Problem { message }\n    }\n}",
            e
          );
        }
        purchase({ payload: e, id: t, tag: n }) {
          return m(this, f, "f").fetch(E, { payload: e, id: t, tag: n });
        }
        getPlayerPurchase({
          projectId: e,
          purchaseId: t,
          payload: n,
          playerId: i,
          productId: r,
          orderStatus: s,
        }) {
          return m(this, f, "f").fetch(I, {
            projectId: e,
            purchaseId: t,
            payload: n,
            playerId: i,
            productId: r,
            orderStatus: s,
          });
        }
        findProduct({ id: e, tag: t }) {
          return m(this, f, "f").fetch(P, { id: e, tag: t });
        }
        consume({ id: e, tag: t }) {
          return m(this, f, "f").fetch(T, { id: e, tag: t });
        }
        cancelSubscription({ payload: e, id: t, tag: n }) {
          return m(this, f, "f").fetch(S, { payload: e, id: t, tag: n });
        }
        resumeSubscription({ payload: e, id: t, tag: n }) {
          return m(this, f, "f").fetch(A, { payload: e, id: t, tag: n });
        }
      }
      f = new WeakMap();
      var O;
      const R =
          "\n    id\n    icon\n    tag\n    isAutoAccept\n    platformId\n    mutations { type key action value }\n",
        k = "\n    rewardId\n    countTotal\n    countAccepted\n",
        D = `mutation ($input: GivePlayerRewardInput!, $lang: Lang) {\n    result: GivePlayerReward(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on PlayerReward {\n            ${k}\n            reward { ${R} \n    name(lang: $lang)\n    description(lang: $lang)\n    iconSmall: icon(w: 48, h: 48, crop: false)\n }\n        }\n    }\n}`;
      class M {
        constructor(e) {
          O.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, O, e, "f");
        }
        give({ id: e, tag: t }) {
          return (function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          })(this, O, "f").fetch(D, { id: e, tag: t });
        }
      }
      O = new WeakMap();
      const N =
        "\n    id\n    tag\n    isAutoClaim\n    description(lang: $lang)\n    descriptions { ...translations }\n    conditions { \n    type\n    key\n    operator\n    value\n }\n    bonuses { id type }\n";
      var L;
      const F = `\n    id\n    tag\n    icon\n    dateStart\n    dateEnd\n    isAutoJoin\n    triggers { ${N} }\n`,
        x =
          "\n    eventId\n    stats {\n        activeDays\n        activeDaysConsecutive\n    }\n",
        j = `mutation ($input: PlayerJoinEventInput!) {\n    result: PlayerJoinEvent(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on PlayerEvent { ${x} }\n    }\n}`;
      class $ {
        constructor(e) {
          L.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, L, e, "f");
        }
        join(e) {
          return (
            (t = this),
            (n = void 0),
            (r = function* () {
              return (function (e, t, n, i) {
                if ("a" === n && !i)
                  throw new TypeError(
                    "Private accessor was defined without a getter"
                  );
                if ("function" == typeof t ? e !== t || !i : !t.has(e))
                  throw new TypeError(
                    "Cannot read private member from an object whose class did not declare it"
                  );
                return "m" === n
                  ? i
                  : "a" === n
                  ? i.call(e)
                  : i
                  ? i.value
                  : t.get(e);
              })(this, L, "f").fetch(j, e);
            }),
            new ((i = void 0) || (i = Promise))(function (e, s) {
              function a(e) {
                try {
                  c(r.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(r.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(t) {
                var n;
                t.done
                  ? e(t.value)
                  : ((n = t.value),
                    n instanceof i
                      ? n
                      : new i(function (e) {
                          e(n);
                        })).then(a, o);
              }
              c((r = r.apply(t, n || [])).next());
            })
          );
          var t, n, i, r;
        }
      }
      L = new WeakMap();
      var U,
        G = function (e, t, n, i) {
          return new (n || (n = Promise))(function (r, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? r(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(a, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
        B = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const W =
          "\n    name(lang: $lang)\n    key\n    type\n    default\n    important\n    public\n    intervalIncrement {\n        interval\n        increment\n    }\n    limits {\n        min\n        max\n        couldGoOverLimit\n    }\n    variants {\n        value\n        name(lang: $lang)\n    }\n",
        q = `\n... on Player {\n    selected\n    state\n    stats {\n        playtimeAll\n        playtimeToday\n        activeDays\n        activeDaysConsecutive\n    }\n    achievementsList { ${o} }\n    purchasesListV2 { ${g} }\n    rewards { ${k} }\n    triggers { triggerId claimed }\n    segments\n    leftSegments\n    newSegments\n    playerSchedulers {\n        schedulerId\n        daysClaimed\n        stats {\n            activeDays\n            activeDaysConsecutive\n        }\n    }\n    playerEvents { ${x} }\n    experiments  {\n    experiment\n    cohort\n}\n    rewardsData {\n        activatedTriggersNow\n        claimedTriggersNow\n        claimedSchedulersDaysNow { schedulerId day }\n        givenAchievements\n        givenRewards\n        givenProducts\n    }\n    uniques { tag value }\n    sessionStart\n    serverTime\n    token @include(if: $withToken)\n}\n... on Problem { message }\n`,
        V = `\nmutation ($input: SyncPlayerInput!, $lang: Lang, $withToken: Boolean!) {\n    result: SyncPlayer(input: $input) {\n        __typename\n        ${q}\n        ... on PlayerSyncConflict {\n            players\n            fields { ${W} }\n        }\n    }\n}`,
        Y = `\nquery ($input: GetPlayerInput!, $withToken: Boolean!) {\n    result: GetPlayer(input: $input) {\n        __typename\n        ${q}\n    }\n}`,
        z = `query ($lang: Lang) {\n    result: FetchPlayerFields {\n        __typename\n        ... on Problem { message }\n        ... on ModelFieldsList {\n            items { ${W} }\n        }\n    }\n}`,
        J = `query($input: PlayerFetchPlayersInput!) {\n    result: PlayerFetchPlayers(input: $input) { ${d(
          "\n    ... on FullPlayersList {\n        players {\n            state\n            isOnline\n        }\n    }\n"
        )} }\n}`;
      let K = !0;
      class Z {
        constructor(e) {
          U.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, U, e, "f");
        }
        sync(
          {
            playerState: e,
            override: t,
            acceptedRewards: n,
            givenRewards: i,
            claimedTriggers: r,
            claimedSchedulersDays: s,
          },
          { withToken: a }
        ) {
          ((e, t, n) => {
            const i = p.encode(JSON.stringify(e)).length;
            if (
              (i > 1048576 &&
                u.kg.warn(
                  `Maximum size exceeded: sending data must be maximum 1MB, your size is: ${
                    Math.round((i / 1024 / 1024) * 100) / 100
                  } MB`
                ),
              i > 2097152)
            )
              throw new Error("max_data_limit_exceeded");
          })(e);
          const o = B(this, U, "f").fetch(
            V,
            {
              playerState: e,
              override: t,
              acceptedRewards: n,
              givenRewards: i,
              claimedTriggers: r,
              claimedSchedulersDays: s,
              isFirstRequest: K,
            },
            { withToken: a }
          );
          return (K = !1), o;
        }
        getPlayer({ withToken: e }) {
          const t = B(this, U, "f").fetch(
            Y,
            { isFirstRequest: K },
            { withToken: e }
          );
          return (K = !1), t;
        }
        getLoginStatus() {
          return B(this, U, "f").fetch(
            "\nquery {\n    result: GetPlayerLoginStatus {\n        __typename\n        ... on Problem { message }\n        ... on PlayerLoginStatus { credentials }\n    }\n}",
            {}
          );
        }
        loginPlayer({ token: e, tokenType: t, redirectUri: n }) {
          return G(this, void 0, void 0, function* () {
            return B(this, U, "f").fetch(
              "\nmutation ($input: LoginPlayerInput!) {\n    result: LoginPlayer(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on Success { success }\n    }\n}",
              { token: e, tokenType: t, redirectUri: n }
            );
          });
        }
        logoutPlayer() {
          return G(this, void 0, void 0, function* () {
            return B(this, U, "f").fetch(
              "\nmutation {\n    result: LogoutPlayer {\n        __typename\n        ... on Problem { message }\n        ... on Success { success }\n    }\n}"
            );
          });
        }
        fetchFields() {
          return G(this, void 0, void 0, function* () {
            return B(this, U, "f").fetch(z);
          });
        }
        checkCode({ secretCode: e }) {
          return B(this, U, "f").fetch(
            "query ($input: CheckPlayerCodeInput!) {\n    result: CheckPlayerCode(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on Success { success }\n    }\n}",
            { secretCode: e }
          );
        }
        checkUniqueValue({ tag: e, value: t }) {
          return B(this, U, "f").fetch(
            "query ($input: CheckPlayerUniqueValueInput!) {\n    result: CheckPlayerUniqueValue(input: $input) {\n        __typename\n       ... on Problem { message }\n       ... on Success { success }\n    }\n}",
            { tag: e, value: t }
          );
        }
        registerUniqueValue({ tag: e, value: t }) {
          return B(this, U, "f").fetch(
            "mutation ($input: RegisterPlayerUniqueValueInput!) {\n    result: RegisterPlayerUniqueValue(input: $input) {\n        __typename\n       ... on UniqueValue { tag value }\n       ... on Problem { message }\n    }\n}",
            { tag: e, value: t }
          );
        }
        deleteUniqueValue({ tag: e }) {
          return B(this, U, "f").fetch(
            "mutation ($input: DeletePlayerUniqueValueInput!) {\n    result: DeletePlayerUniqueValue(input: $input) {\n        __typename\n       ... on Success { success }\n       ... on Problem { message }\n    }\n}",
            { tag: e }
          );
        }
        fetchPlayers({ ids: e }) {
          return B(this, U, "f").fetch(J, { ids: e });
        }
      }
      U = new WeakMap();
      var X,
        H = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const Q = "\n    key\n    value(lang: $lang)\n    type\n",
        ee = `\n${t}\nquery ($lang: Lang) {\n    result: FetchPlayerProjectConfig {\n        __typename\n        ... on Problem { message }\n        ... on PlayerProjectConfig {\n            isDev\n            isAllowedOrigin\n            config {\n                lang\n                avatarGenerator\n                avatarGeneratorTemplate\n                ymCounterId\n                gtagCounterId\n                showLoader\n                showReqCounter\n                orientation\n                showOrientationOverlay\n                targetOS\n                showUnsupportedOSOverlay\n                communityLinks { ...translations }\n                showResumeOverlay\n            }\n            project {\n                name(lang: $lang)\n                description(lang: $lang)\n                icon(w: 256, h: 256, crop: false)\n                mainChatId\n                enableMainChat\n                achievements {\n                    isLockedVisible\n                    isLockedDescriptionVisible\n                    enableUnlockToast\n                    notificationDisplayTime\n                }\n                ads {\n                    showCountdownOverlay\n                    showRewardedFailedOverlay\n                }\n            }\n            platformConfig {\n                type\n                tag\n                appId\n                gameLink\n                publicKey\n                progressSaveFormat\n                alwaysSyncPublicFields\n                communityLinks { ...translations }\n                banners { ...banner }\n                payload\n                customAdsConfig { ...customAdsConfig }\n                customAdsConfigId\n                paymentsConfig { ...paymentConfig }\n                paymentsConfigId\n                authConfig { ...authConfig }\n                authConfigId\n                ymCounterId\n                gtagCounterId\n                currencyPluralisations { ...translations }\n                showResumeOverlay\n            }\n            playerFields { ${W} }\n            serverTime\n            gameVariables { ${Q} }\n            rewards {\n                ${R}\n                names { ...translations }\n                descriptions { ...translations }\n            }\n            triggers {\n                ${N}\n            }\n            achievements {\n                ${r}\n                names { ...translations }\n                descriptions { ...translations }\n            }\n            achievementsGroups {\n                id tag name(lang: $lang) description(lang: $lang) achievements\n                names { ...translations }\n                descriptions { ...translations }\n            }\n            products {\n                ${v}\n                names { ...translations }\n                descriptions { ...translations }\n            }\n            products {\n                ${v}\n                names { ...translations }\n                descriptions { ...translations }\n            }\n            schedulers { \n    id\n    tag\n    type\n    days\n    isRepeat\n    daysBonuses {\n        day\n        bonuses { id type }\n    }\n    triggers {\n        ${N}\n        day\n    }\n    isAutoRegister\n }\n            events {\n                ${F}\n                names { ...translations }\n                descriptions { ...translations }\n            }\n            acl {\n                canUploadImages\n                canUploadFiles\n                canConnectOnline\n                canCollectStats\n            }\n        }\n    }\n}\nfragment customAdsConfig on AdsConfig {\n  id\n  name\n  description\n  adFoxOwnerId\n  advertonicUserId\n  adsenseClientId\n  tmAdsAppKey\n  adSonarAppId\n  configs {\n    web {\n      implementation\n      bidders {\n        id\n        key\n        adServer\n        adServerBidderId\n        cpmAdjustment\n        params { key type }\n      }\n      banners {\n        ...banner\n        mobileConfig { ...bannerConfig }\n        desktopConfig { ...bannerConfig }\n      }\n    },\n    android {\n      implementation\n      banners {\n        ...banner\n      }\n    }\n    telegram {\n      implementation\n      banners {\n        ...banner\n      }\n    }\n  }\n}\n\nfragment bannerConfig on BannerConfig {\n    enableWrapper\n    wrapperCountdown\n    frequency\n    refreshInterval\n    position\n    biddersConfig { codeType sizes }\n    bidders {\n        key\n        adServer\n        params { key value }\n    }\n}\n\n\nfragment banner on Banner {\n    type\n    enabled\n    enabledDesktop\n    bannerId\n    desktopBannerId\n    adServer\n    adServerDesktop\n    frequency\n    refreshInterval\n    maxWidth\n    maxHeight\n    maxWidthDimension\n    maxHeightDimension\n    desktopMaxWidth\n    desktopMaxHeight\n    desktopMaxWidthDimension\n    desktopMaxHeightDimension\n    fitCanvas\n    position\n    limits { hour day session }\n    useNative\n}\nfragment paymentConfig on PaymentsConfig {\n    id\n    name\n    description\n    sandbox\n    oneStoreConfig {\n        publicKey\n    }\n    configs {\n      web {\n        implementation\n        activeService\n      }\n      android {\n        implementation\n        activeService\n      }\n    }\n  }\n  \nfragment authConfig on AuthConfig {\n    id\n    name\n    description\n    xsollaConfig {\n        loginProjectId\n    }\n    googleConfig {\n        clientID\n    }\n    yandexConfig {\n        clientID\n    }\n    configs {\n      web {\n        implementation\n        activeService\n      }\n      android {\n        implementation\n        activeService\n      }\n    }\n  }\n  \n`,
        te = `query ($lang: Lang) {\n    result: FetchPlayerProjectVariables {\n        __typename\n        ... on Problem { message }\n        ... on ProjectVariablesList {\n            items { ${Q} }\n        }\n    }\n}`;
      class ne {
        constructor(e) {
          X.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, X, e, "f");
        }
        fetchConfig() {
          return H(this, X, "f").fetch(ee);
        }
        fetchVariables() {
          return H(this, X, "f").fetch(te);
        }
      }
      X = new WeakMap();
      var ie;
      class re {
        constructor(e) {
          ie.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, ie, e, "f");
        }
        fetch({ id: e, tag: t, urlFrom: n }) {
          return (function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          })(this, ie, "f").fetch(
            "\nfragment project on Project {\n    id\n    url(from: $url)\n    name(lang: $lang)\n    description(lang: $lang)\n    assets {\n        icon(lang: $lang) {\n            resources { src(w: 256, h: 256, crop: true) }\n        }\n    }\n}\nquery ($input: FetchPlayerGamesCollectionInput!, $lang: Lang, $url: String) {\n    result: FetchPlayerGamesCollection(input: $input) {\n        __typename\n        ... on GamesCollection {\n            id\n            tag\n            name(lang: $lang)\n            description(lang: $lang)\n            games { ...project }\n        }\n        ... on Problem { message }\n    }\n}",
            { id: e, tag: t, urlFrom: n },
            { url: n }
          );
        }
      }
      ie = new WeakMap();
      var se,
        ae = function (e, t, n, i) {
          return new (n || (n = Promise))(function (r, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? r(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(a, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
        oe = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const ce = `\n    ... on PlayersTop {\n        leaderboard {\n            id\n            tag\n            name(lang: $lang),\n            description(lang: $lang),\n            shareText(lang: $lang),\n            isAuthorizedOnly,\n            limit\n        }\n        players\n        fields { ${W} }\n    }\n`,
        le = `\n    ... on PlayerTop {\n        player\n        abovePlayers\n        belowPlayers\n        fields { ${W} }\n    }\n`,
        he = `\n    ... on PlayerRecord {\n        record\n        fields { ${W} }\n    }\n`,
        ue = `query ($input: FetchTopInput!, $lang: Lang, $withMe: Boolean!) {\n    result: FetchTop(input: $input) {${d(
          ce
        )}}\n    playerResult: FetchPlayerRating(input: $input) @include(if: $withMe) {${d(
          le
        )}}\n}`,
        de = `query ($input: FetchTopInput!, $lang: Lang) {\n    result: FetchPlayerRating(input: $input) {${d(
          le
        )}}\n}`,
        pe = `query ($input: FetchPlayerTopScopedInput!, $lang: Lang, $withMe: Boolean!) {\n    result: FetchPlayerTopScoped(input: $input) {${d(
          ce
        )}}\n    playerResult: FetchPlayerRatingScoped(input: $input) @include(if: $withMe) {${d(
          le
        )}}\n}`,
        fe = `query ($input: FetchPlayerTopScopedInput!, $lang: Lang) {\n    result: FetchPlayerRatingScoped(input: $input) {${d(
          le
        )}}\n}`,
        me = `mutation ($input: PlayerPublishRecordInput!, $lang: Lang) {\n    result: PlayerPublishRecord(input: $input) {${d(
          he
        )}}\n}`;
      class ve {
        constructor(e) {
          se.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, se, e, "f");
        }
        getRating({
          orderBy: e = ["score"],
          includeFields: t = [],
          order: n = "DESC",
          limit: i = 10,
          withMe: r = "none",
          showNearest: s,
        }) {
          return ae(this, void 0, void 0, function* () {
            return oe(this, se, "f").fetchMany(
              ue,
              {
                orderBy: e,
                order: n,
                limit: i,
                includeFields: t,
                showNearest: s,
              },
              { withMe: "none" !== r }
            );
          });
        }
        getPlayerRating({
          orderBy: e = ["score"],
          includeFields: t = [],
          order: n = "DESC",
          limit: i = 10,
          showNearest: r,
        }) {
          return ae(this, void 0, void 0, function* () {
            return oe(this, se, "f").fetch(de, {
              orderBy: e,
              order: n,
              limit: i,
              includeFields: t,
              showNearest: r,
            });
          });
        }
        getRatingVariant({
          id: e,
          tag: t,
          variant: n,
          includeFields: i = [],
          limit: r = 10,
          withMe: s = "none",
          order: a,
          showNearest: o,
        }) {
          return ae(this, void 0, void 0, function* () {
            return oe(this, se, "f").fetchMany(
              pe,
              {
                id: e,
                tag: t,
                variant: n,
                limit: r,
                includeFields: i,
                order: a,
                showNearest: o,
              },
              { withMe: "none" !== s }
            );
          });
        }
        getPlayerRatingVariant({
          id: e,
          tag: t,
          variant: n,
          includeFields: i = [],
          limit: r = 10,
          order: s,
          showNearest: a,
        }) {
          return ae(this, void 0, void 0, function* () {
            return oe(this, se, "f").fetch(fe, {
              id: e,
              tag: t,
              variant: n,
              limit: r,
              includeFields: i,
              order: s,
              showNearest: a,
            });
          });
        }
        publishRecord({ id: e, tag: t, variant: n, record: i, override: r }) {
          return ae(this, void 0, void 0, function* () {
            return oe(this, se, "f").fetch(me, {
              id: e,
              tag: t,
              variant: n,
              record: i,
              override: r,
            });
          });
        }
      }
      se = new WeakMap();
      var ye;
      class ge {
        constructor(e) {
          ye.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, ye, e, "f");
        }
        fetch({ type: e, format: t }) {
          return (function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          })(this, ye, "f").fetch(
            "query($input: FetchPlayerDocumentInput!, $lang: Lang, $format: DocumentFormat) {\n    result: FetchPlayerDocument(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on Document {\n            type\n            content(lang: $lang, format: $format)\n        }\n    }\n}",
            { type: e },
            { format: t }
          );
        }
      }
      ye = new WeakMap();
      var we,
        Pe = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const be =
          "\n    id: _id\n    playerId\n    src\n    tags\n    width\n    height\n",
        Ee = `\n    ... on Image { ${be} }\n`,
        Te = `query($input: FetchPlayerImagesInput!) {\n    result: FetchPlayerImages(input: $input) { ${d(
          `\n    ... on ImagesList {\n        items { ${be} }\n    }\n`
        )} }\n}`,
        Se = `mutation($input: UploadPlayerImageInput!) {\n    result: UploadPlayerImage(input: $input) { ${d(
          Ee
        )} }\n}`,
        Ae = `mutation($input: UploadPlayerImageByURLInput!) {\n    result: UploadPlayerImageByURL(input: $input) {\n        ${d(
          "... on ResponseBody { body }"
        )}\n    }\n}`,
        _e = `mutation($input: SavePlayerImageByURLInput!) {\n    result: SavePlayerImageByURL(input: $input) {\n        ${d(
          Ee
        )}\n    }\n}`;
      class Ie {
        constructor(e) {
          we.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, we, e, "f");
        }
        fetch({ playerId: e, limit: t, offset: n, tags: i }) {
          return Pe(this, we, "f").fetch(Te, {
            playerId: e,
            limit: t,
            offset: n,
            tags: i,
          });
        }
        upload({ file: e, tags: t, accessPayload: n }) {
          return Pe(this, we, "f").fetch(Se, {
            file: e,
            tags: t,
            accessPayload: n,
          });
        }
        uploadByURL({ fieldName: e, file: t, uploadUrl: n }) {
          return Pe(this, we, "f").fetch(Ae, {
            fieldName: e,
            file: t,
            uploadUrl: n,
          });
        }
        saveByURL({ src: e, crop: t, tags: n }) {
          return Pe(this, we, "f").fetch(_e, { src: e, crop: t, tags: n });
        }
      }
      we = new WeakMap();
      var Ce,
        Oe = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const Re =
          "\n    id: _id\n    playerId\n    src\n    size\n    name\n    tags\n",
        ke = `\n    ... on File { ${Re} }\n`,
        De = `query($input: FetchPlayerFilesInput!) {\n    result: FetchPlayerFiles(input: $input) { ${d(
          `\n    ... on FilesList {\n        items { ${Re} }\n    }\n`
        )} }\n}`,
        Me = `mutation($input: UploadPlayerFileInput!) {\n    result: UploadPlayerFile(input: $input) { ${d(
          ke
        )} }\n}`;
      class Ne {
        constructor(e) {
          Ce.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, Ce, e, "f");
        }
        fetch({ playerId: e, limit: t, offset: n, tags: i }) {
          return Oe(this, Ce, "f").fetch(De, {
            playerId: e,
            limit: t,
            offset: n,
            tags: i,
          });
        }
        upload({ file: e, tags: t }) {
          return Oe(this, Ce, "f").fetch(Me, { file: e, tags: t });
        }
      }
      Ce = new WeakMap();
      var Le;
      class Fe {
        constructor(e) {
          Le.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, Le, e, "f");
        }
        register(e) {
          return (
            (t = this),
            (n = void 0),
            (r = function* () {
              return (function (e, t, n, i) {
                if ("a" === n && !i)
                  throw new TypeError(
                    "Private accessor was defined without a getter"
                  );
                if ("function" == typeof t ? e !== t || !i : !t.has(e))
                  throw new TypeError(
                    "Cannot read private member from an object whose class did not declare it"
                  );
                return "m" === n
                  ? i
                  : "a" === n
                  ? i.call(e)
                  : i
                  ? i.value
                  : t.get(e);
              })(this, Le, "f").fetch(
                "\n    mutation ($input: PlayerRegisterOnSchedulerInput!) {\n        result: PlayerRegisterOnScheduler(input: $input) {\n            __typename\n            ... on Problem { message }\n            ... on PlayerScheduler { \n    daysClaimed\n    schedulerId\n    stats {\n        activeDays\n        activeDaysConsecutive\n    }\n }\n        }\n    }\n",
                e
              );
            }),
            new ((i = void 0) || (i = Promise))(function (e, s) {
              function a(e) {
                try {
                  c(r.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function o(e) {
                try {
                  c(r.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(t) {
                var n;
                t.done
                  ? e(t.value)
                  : ((n = t.value),
                    n instanceof i
                      ? n
                      : new i(function (e) {
                          e(n);
                        })).then(a, o);
              }
              c((r = r.apply(t, n || [])).next());
            })
          );
          var t, n, i, r;
        }
      }
      Le = new WeakMap();
      var xe,
        je,
        $e,
        Ue,
        Ge,
        Be = a(5239),
        We = function (e, t, n, i) {
          return new (n || (n = Promise))(function (r, s) {
            function a(e) {
              try {
                c(i.next(e));
              } catch (e) {
                s(e);
              }
            }
            function o(e) {
              try {
                c(i.throw(e));
              } catch (e) {
                s(e);
              }
            }
            function c(e) {
              var t;
              e.done
                ? r(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(a, o);
            }
            c((i = i.apply(e, t || [])).next());
          });
        },
        qe = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        },
        Ve = function (e, t, n, i, r) {
          if ("m" === i) throw new TypeError("Private method is not writable");
          if ("a" === i && !r)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if ("function" == typeof t ? e !== t || !r : !t.has(e))
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n), n;
        };
      const Ye = "... on Success { success }";
      class ze {
        constructor(e) {
          xe.set(this, ""),
            je.set(this, !1),
            $e.set(this, 0),
            Ue.set(this, () => {}),
            Ge.set(this, 0),
            (this.apiUrl = ""),
            (this.config = {
              apiUrl: e.apiUrl,
              projectId: e.projectId,
              publicToken: e.publicToken,
              lang: e.lang,
              platformType: e.platformType,
              platformKey: e.platformKey,
            });
        }
        get reqCounter() {
          return qe(this, $e, "f");
        }
        set reqCounter(e) {
          Ve(this, $e, e, "f"), qe(this, Ue, "f").call(this, e);
        }
        getOptions() {
          return Object.assign({}, this.config);
        }
        getApiUrl() {
          return this.apiUrl;
        }
        addCounterListener(e) {
          Ve(this, Ue, e, "f");
        }
        setLang(e) {
          this.config.lang = e;
        }
        setWithCookie(e) {
          Ve(this, je, e, "f");
        }
        setPlayerData(e) {
          Ve(this, xe, btoa(JSON.stringify(e)), "f");
        }
        setPlatform(e, t) {
          (this.config.platformType = e), (this.config.platformKey = t);
        }
        ping(e) {
          fetch(`${this.config.apiUrl[qe(this, Ge, "f")]}/ping?t=${e}`);
        }
        signQuery(e = null) {
          return We(this, void 0, void 0, function* () {
            const t = {
                projectId: this.config.projectId,
                query: Je(e),
                token: this.config.publicToken,
              },
              n = yield (0, Be.X)(JSON.stringify(t));
            return { input: e, hash: n };
          });
        }
        fetch(e, t, n) {
          return We(this, void 0, void 0, function* () {
            return this.fetchMany(e, t, n).then(
              ({ result: e }) => (
                ((e) => {
                  if ("Problem" === (null == e ? void 0 : e.__typename))
                    throw e.message;
                })(e),
                e
              )
            );
          });
        }
        fetchWithFailover(e, t, n, i = 0) {
          return We(this, void 0, void 0, function* () {
            if (i >= this.config.apiUrl.length)
              throw (Ve(this, Ge, 0, "f"), "connection_error");
            const r = this.config.apiUrl[i];
            this.apiUrl = r;
            try {
              const s = yield fetch(`${r}/graphql/${this.config.projectId}`, {
                body: e,
                method: "POST",
                headers: Object.assign(Object.assign({}, t), {
                  "X-Transaction-Token": n,
                  "X-Platform": this.config.platformType,
                  "X-Platform-Key": this.config.platformKey || "",
                  "X-Project-ID": String(this.config.projectId),
                  "X-Project-Token": this.config.publicToken,
                  "X-Language": this.config.lang,
                  "X-Player-Data":
                    qe(this, xe, "f") || btoa(JSON.stringify({})),
                }),
                credentials: qe(this, je, "f") ? "include" : "omit",
              });
              if (!s.ok) {
                const e = yield s.text();
                throw new Error(`${s.status}. ${e}`);
              }
              return Ve(this, Ge, i, "f"), s;
            } catch (r) {
              if (
                String(null == r ? void 0 : r.message).includes(
                  "Failed to fetch"
                )
              )
                return this.fetchWithFailover(e, t, n, i + 1);
              throw r;
            }
          });
        }
        fetchMany(e, t, n = {}) {
          var i;
          return We(this, void 0, void 0, function* () {
            const { input: r, hash: s } = yield this.signQuery(t);
            let a,
              o = {};
            const c = JSON.stringify({
                query: e,
                variables: Object.assign(
                  { input: r, lang: this.config.lang.toUpperCase() },
                  n
                ),
              }),
              l = (function (e = {}) {
                return Object.keys(e).filter((t) => e[t] instanceof File);
              })(t);
            if (l.length > 0) {
              (a = new FormData()), a.append("operations", c);
              const e = {};
              l.forEach((t, n) => {
                e[n] = [`variables.input.${t}`];
              }),
                a.append("map", JSON.stringify(e)),
                l.forEach((e, n) => {
                  a.append(n, t[e]);
                });
            } else (o = { "Content-Type": "application/json;charset=utf-8" }), (a = c);
            const h = yield this.fetchWithFailover(a, o, s, qe(this, Ge, "f")),
              u = yield h.json();
            if (
              (null === (i = u.errors) || void 0 === i ? void 0 : i.length) > 0
            )
              throw new Error(u.errors[0].message);
            return (
              Object.values(u.data || {}).forEach((e) => {
                "Problem" != e.__typename && this.reqCounter++;
              }),
              u.data
            );
          });
        }
      }
      function Je(e) {
        var t;
        return Array.isArray(e)
          ? e.map(Je)
          : null !== e && "object" == typeof e
          ? (Object.getOwnPropertySymbols(e).length > 0 &&
              (e = JSON.parse(JSON.stringify(e))),
            (t = {}),
            Object.keys(e)
              .sort()
              .forEach((n) => (t[n] = Je(e[n]))),
            t)
          : e;
      }
      (xe = new WeakMap()),
        (je = new WeakMap()),
        ($e = new WeakMap()),
        (Ue = new WeakMap()),
        (Ge = new WeakMap());
      var Ke,
        Ze = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const Xe =
          "\n    id\n    tags\n    projectId\n    capacity\n    ownerId\n    name(lang: $lang)\n    description(lang: $lang)\n    private\n    visible\n    hasPassword\n    membersCount\n",
        He = `... on ChannelInvitesList {\n    items {\n        channel { ${Xe} }\n        channelId\n        playerTo\n        date\n    }\n}`,
        Qe = `query($input: PlayerFetchPlayerInvitesInput!, $lang: Lang) {\n    result: PlayerFetchInvites(input: $input) { ${d(
          `... on ChannelInvitesList {\n    items {\n        channel { ${Xe} }\n        channelId\n        playerFrom\n        date\n    }\n}`
        )} }\n}`,
        et = `query($input: PlayerFetchPlayerSentInvitesInput!, $lang: Lang) {\n    result: PlayerFetchSentInvites(input: $input) { ${d(
          He
        )} }\n}`,
        tt = `query($input: PlayerFetchChannelInvitesInput!) {\n    result: PlayerFetchChannelInvites(input: $input) { ${d(
          "... on ChannelInvitesList {\n    items {\n        channelId\n        playerTo\n        playerFrom\n        date\n    }\n}"
        )} }\n}`,
        nt = `mutation($input: PlayerSendInviteToChannelInput!) {\n    result: PlayerSendInviteToChannel(input: $input) { ${d(
          "... on ChannelInvite {\n    channelId\n    playerToId\n    playerFromId\n    date\n }"
        )} }\n}`,
        it = `mutation($input: PlayerCancelInviteToChannelInput!) {\n    result: PlayerCancelInviteToChannel(input: $input) { ${d(
          Ye
        )} }\n}`,
        rt = `mutation($input: PlayerAcceptInviteToChannelInput!) {\n    result: PlayerAcceptInviteToChannel(input: $input) { ${d(
          Ye
        )} }\n}`,
        st = `mutation($input: PlayerRejectInviteToChannelInput!) {\n    result: PlayerRejectInviteToChannel(input: $input) { ${d(
          Ye
        )} }\n}`;
      class at {
        constructor(e) {
          Ke.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, Ke, e, "f");
        }
        fetchInvites({ limit: e, offset: t }) {
          return Ze(this, Ke, "f").fetch(Qe, { limit: e, offset: t });
        }
        fetchChannelInvites({ channelId: e, limit: t, offset: n }) {
          return Ze(this, Ke, "f").fetch(tt, {
            channelId: e,
            limit: t,
            offset: n,
          });
        }
        fetchSentInvites({ limit: e, offset: t }) {
          return Ze(this, Ke, "f").fetch(et, { limit: e, offset: t });
        }
        sendInvite({ channelId: e, playerId: t }) {
          return Ze(this, Ke, "f").fetch(nt, { channelId: e, playerId: t });
        }
        cancelInvite({ channelId: e, playerId: t }) {
          return Ze(this, Ke, "f").fetch(it, { channelId: e, playerId: t });
        }
        acceptInvite({ channelId: e }) {
          return Ze(this, Ke, "f").fetch(rt, { channelId: e });
        }
        rejectInvite({ channelId: e }) {
          return Ze(this, Ke, "f").fetch(st, { channelId: e });
        }
      }
      Ke = new WeakMap();
      var ot,
        ct = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const lt =
          "\n    canViewMessages\n    canAddMessage\n    canEditMessage\n    canDeleteMessage\n    canViewMembers\n    canInvitePlayer\n    canKickPlayer\n    canAcceptJoinRequest\n    canMutePlayer\n",
        ht = `\n    id\n    tags\n    messageTags\n    projectId\n    capacity\n    ownerId\n    name(lang: $lang)\n    description(lang: $lang)\n    private\n    visible\n    permanent\n    hasPassword\n    password\n    templateId\n    membersCount\n    membersOnlineCount\n    isJoined\n    isRequestSent\n    isInvited\n    messageLimits { \n    length\n    timeoutPeriod\n }\n    mute { isMuted, unmuteAt }\n    ownerAcl { ${lt} }\n    memberAcl { ${lt} }\n    guestAcl { ${lt} }\n    censor { \n    links\n    spam\n    ageRestriction\n }\n`,
        ut = `... on Channel { ${ht} }`,
        dt = `... on Channel { ${ht}, fields { \n    name(lang: $lang)\n    key\n    type\n    default\n    important\n    public\n    intervalIncrement {\n        interval\n        increment\n    }\n    limits {\n        min\n        max\n        couldGoOverLimit\n    }\n    variants {\n        value\n        name(lang: $lang)\n    }\n }, state }`,
        pt = `... on ChannelsList {\n    items { ${ht} }\n}`,
        ft = `query($input: PlayerFetchChannelInput!, $lang: Lang) {\n    result: PlayerFetchChannel(input: $input) { ${d(
          dt
        )} }\n}`,
        mt = `query($input: PlayerFetchPersonalChannelInput!, $lang: Lang) {\n    result: PlayerFetchPersonalChannel(input: $input) { ${d(
          ut
        )} }\n}`,
        vt = `query($input: PlayerFetchChannelsInput!, $lang: Lang) {\n    result: PlayerFetchChannels(input: $input) { ${d(
          pt
        )} }\n}`,
        yt = `query($input: PlayerFetchFeedChannelInput!, $lang: Lang) {\n    result: PlayerFetchFeedChannel(input: $input) { ${d(
          ut
        )} }\n}`,
        gt = `mutation($input: PlayerCreateChannelInput!, $lang: Lang) {\n    result: PlayerCreateChannel(input: $input) { ${d(
          dt
        )} }\n}`,
        wt = `mutation($input: PlayerUpdateChannelInput!, $lang: Lang) {\n    result: PlayerUpdateChannel(input: $input) { ${d(
          dt
        )} }\n}`,
        Pt = `mutation($input: PlayerDeleteChannelInput!) {\n    result: PlayerDeleteChannel(input: $input) { ${d(
          Ye
        )} }\n}`;
      class bt {
        constructor(e) {
          ot.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, ot, e, "f");
        }
        fetchChannel({ channelId: e }) {
          return ct(this, ot, "f").fetch(ft, { channelId: e }).then(Et);
        }
        fetchPersonalChannel({ playerId: e }) {
          return ct(this, ot, "f").fetch(mt, { playerId: e }).then(Et);
        }
        fetchFeedChannel({ playerId: e }) {
          return ct(this, ot, "f").fetch(yt, { playerId: e }).then(Et);
        }
        fetchChannels({
          ids: e,
          onlyJoined: t,
          onlyOwned: n,
          tags: i,
          search: r,
          limit: s,
          offset: a,
        }) {
          return ct(this, ot, "f")
            .fetch(vt, {
              ids: e,
              onlyJoined: t,
              onlyOwned: n,
              tags: i,
              search: r,
              limit: s,
              offset: a,
            })
            .then(Tt);
        }
        createChannel({
          template: e,
          tags: t,
          capacity: n,
          name: i,
          description: r,
          password: s,
          ownerAcl: a,
          memberAcl: o,
          guestAcl: c,
          visible: l,
          private: h,
        }) {
          return ct(this, ot, "f")
            .fetch(gt, {
              template: e,
              tags: t,
              capacity: n,
              name: i,
              description: r,
              password: s,
              ownerAcl: a,
              memberAcl: o,
              guestAcl: c,
              visible: l,
              private: h,
            })
            .then(Et);
        }
        updateChannel({
          channelId: e,
          tags: t,
          capacity: n,
          name: i,
          description: r,
          password: s,
          ownerAcl: a,
          memberAcl: o,
          guestAcl: c,
          ownerId: l,
          visible: h,
          private: u,
        }) {
          return ct(this, ot, "f")
            .fetch(wt, {
              channelId: e,
              tags: t,
              capacity: n,
              name: i,
              description: r,
              password: s,
              ownerAcl: a,
              memberAcl: o,
              guestAcl: c,
              ownerId: l,
              visible: h,
              private: u,
            })
            .then(Et);
        }
        deleteChannel({ channelId: e }) {
          return ct(this, ot, "f").fetch(Pt, { channelId: e });
        }
      }
      function Et(e) {
        return (e.isMuted = e.mute.isMuted), e;
      }
      function Tt(e) {
        return (e.items = e.items.map(Et)), e;
      }
      ot = new WeakMap();
      var St,
        At = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const _t = `... on ChannelJoinRequestsList {\n    items {\n        date\n        channelId\n        channel { ${ht} }\n    }\n}`,
        It = `query($input: PlayerFetchChannelJoinRequestsInput!) {\n    result: PlayerFetchChannelJoinRequests(input: $input) { ${d(
          "... on ChannelJoinRequestsList {\n    items {\n        channelId\n        player\n        date\n    }\n}"
        )} }\n}`,
        Ct = `query($input: PlayerFetchPlayerSentJoinRequestsInput!, $lang: Lang) {\n    result: PlayerFetchSentJoinRequests(input: $input) { ${d(
          _t
        )} }\n}`,
        Ot = `mutation($input: PlayerAcceptJoinRequestToChannelInput!) {\n    result: PlayerAcceptJoinRequestToChannel(input: $input) { ${d(
          "... on ChannelMember {\n    id\n    state\n    channelId\n    isOnline\n    mute {\n        isMuted\n        unmuteAt\n    }\n}"
        )} }\n}`,
        Rt = `mutation($input: PlayerRejectJoinRequestToChannelInput!) {\n    result: PlayerRejectJoinRequestToChannel(input: $input) { ${d(
          Ye
        )} }\n}`;
      class kt {
        constructor(e) {
          St.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, St, e, "f");
        }
        fetchJoinRequests({ channelId: e, search: t, limit: n, offset: i }) {
          return At(this, St, "f").fetch(It, {
            channelId: e,
            search: t,
            limit: n,
            offset: i,
          });
        }
        fetchSentJoinRequests({ limit: e, offset: t }) {
          return At(this, St, "f").fetch(Ct, { limit: e, offset: t });
        }
        acceptJoinRequest({ channelId: e, playerId: t }) {
          return At(this, St, "f").fetch(Ot, { channelId: e, playerId: t });
        }
        rejectJoinRequest({ channelId: e, playerId: t }) {
          return At(this, St, "f").fetch(Rt, { channelId: e, playerId: t });
        }
      }
      St = new WeakMap();
      var Dt,
        Mt = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const Nt = `mutation($input: PlayerMutePlayerInChannelInput!) {\n    result: PlayerMutePlayerInChannel(input: $input) { ${d(
          Ye
        )} }\n}`,
        Lt = `mutation($input: PlayerUnmutePlayerInChannelInput!) {\n    result: PlayerUnmutePlayerInChannel(input: $input) { ${d(
          Ye
        )} }\n}`,
        Ft = `query($input: PlayerFetchChannelMembersInput!) {\n    result: PlayerFetchChannelMembers(input: $input) { ${d(
          "... on ChannelMembersList {\n    players {\n        id\n        state\n        isOnline\n        mute {\n            isMuted\n            unmuteAt\n        }\n    }\n}"
        )} }\n}`,
        xt = `mutation($input: PlayerKickFromChannelInput!) {\n    result: PlayerKickFromChannel(input: $input) { ${d(
          Ye
        )} }\n}`,
        jt = `mutation($input: PlayerJoinChannelInput!) {\n    result: PlayerJoinChannel(input: $input) { ${d(
          Ye
        )} }\n}`,
        $t = `mutation($input: PlayerLeaveChannelInput!) {\n    result: PlayerLeaveChannel(input: $input) { ${d(
          Ye
        )} }\n}`,
        Ut = `mutation($input: PlayerCancelJoinChannelInput!) {\n    result: PlayerCancelJoinChannel(input: $input) { ${d(
          Ye
        )} }\n}`;
      class Gt {
        constructor(e) {
          Dt.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, Dt, e, "f");
        }
        mute({ channelId: e, playerId: t, unmuteAt: n }) {
          return Mt(this, Dt, "f").fetch(Nt, {
            channelId: e,
            playerId: t,
            unmuteAt: n,
          });
        }
        unmute({ channelId: e, playerId: t }) {
          return Mt(this, Dt, "f").fetch(Lt, { channelId: e, playerId: t });
        }
        fetchMembers({
          channelId: e,
          onlyOnline: t,
          search: n,
          limit: i,
          offset: r,
        }) {
          return Mt(this, Dt, "f").fetch(Ft, {
            channelId: e,
            onlyOnline: t,
            search: n,
            limit: i,
            offset: r,
          });
        }
        join({ channelId: e, password: t }) {
          return Mt(this, Dt, "f").fetch(jt, { channelId: e, password: t });
        }
        cancelJoin({ channelId: e }) {
          return Mt(this, Dt, "f").fetch(Ut, { channelId: e });
        }
        leave({ channelId: e }) {
          return Mt(this, Dt, "f").fetch($t, { channelId: e });
        }
        kick({ channelId: e, playerId: t }) {
          return Mt(this, Dt, "f").fetch(xt, { channelId: e, playerId: t });
        }
      }
      Dt = new WeakMap();
      var Bt,
        Wt = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const qt =
          "\n    id\n    channelId\n    authorId\n    text\n    tags\n    player\n    createdAt\n",
        Vt = `... on ChannelMessage { ${qt} }`,
        Yt = `... on ChannelMessagesList {\n    items { ${qt} }\n}`,
        zt = `query($input: PlayerFetchChannelMessagesInput!) {\n    result: PlayerFetchChannelMessages(input: $input) { ${d(
          Yt
        )} }\n}`,
        Jt = `query($input: PlayerFetchPersonalMessagesInput!) {\n    result: PlayerFetchPersonalMessages(input: $input) { ${d(
          Yt
        )} }\n}`,
        Kt = `query($input: PlayerFetchFeedMessagesInput!) {\n    result: PlayerFetchFeedMessages(input: $input) { ${d(
          Yt
        )} }\n}`,
        Zt = `mutation($input: PlayerSendMessageInput!) {\n    result: PlayerSendMessage(input: $input) { ${d(
          Vt
        )} }\n}`,
        Xt = `mutation($input: PlayerSendFeedMessageInput!) {\n    result: PlayerSendFeedMessage(input: $input) { ${d(
          Vt
        )} }\n}`,
        Ht = `mutation($input: PlayerSendPersonalMessageInput!) {\n    result: PlayerSendPersonalMessage(input: $input) { ${d(
          Vt
        )} }\n}`,
        Qt = `mutation($input: PlayerEditMessageInput!) {\n    result: PlayerEditMessage(input: $input) { ${d(
          Vt
        )} }\n}`,
        en = `mutation($input: PlayerDeleteMessageInput!) {\n    result: PlayerDeleteMessage(input: $input) { ${d(
          Ye
        )} }\n}`;
      class tn {
        constructor(e) {
          Bt.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, Bt, e, "f");
        }
        fetchMessages({ channelId: e, tags: t, limit: n, offset: i }) {
          return Wt(this, Bt, "f").fetch(zt, {
            channelId: e,
            tags: t,
            limit: n,
            offset: i,
          });
        }
        fetchPersonalMessages({ playerId: e, tags: t, limit: n, offset: i }) {
          return Wt(this, Bt, "f").fetch(Jt, {
            playerId: e,
            tags: t,
            limit: n,
            offset: i,
          });
        }
        fetchFeedMessages({
          playerId: e,
          authorId: t,
          tags: n,
          limit: i,
          offset: r,
        }) {
          return Wt(this, Bt, "f").fetch(Kt, {
            playerId: e,
            authorId: t,
            tags: n,
            limit: i,
            offset: r,
          });
        }
        sendMessage({ channelId: e, tags: t, text: n }) {
          return Wt(this, Bt, "f").fetch(Zt, {
            channelId: e,
            tags: t,
            text: n,
          });
        }
        sendFeedMessage({ playerId: e, text: t, tags: n }) {
          return Wt(this, Bt, "f").fetch(Xt, { playerId: e, text: t, tags: n });
        }
        sendPersonalMessage({ playerId: e, text: t, tags: n }) {
          return Wt(this, Bt, "f").fetch(Ht, { playerId: e, text: t, tags: n });
        }
        editMessage({ messageId: e, text: t }) {
          return Wt(this, Bt, "f").fetch(Qt, { messageId: e, text: t });
        }
        deleteMessage({ messageId: e }) {
          return Wt(this, Bt, "f").fetch(en, { messageId: e });
        }
      }
      Bt = new WeakMap();
      function nn(e, t, n, i) {
        return (
          (r = this),
          (s = void 0),
          (c = function* () {
            const r = [
                { transport: "websocket", endpoint: t },
                { transport: "http_stream", endpoint: n },
                { transport: "sse", endpoint: i },
              ],
              { default: s } = yield a.e(72).then(a.bind(a, 9965));
            return new s(r, { token: e, protocol: "protobuf", debug: !0 });
          }),
          new ((o = void 0) || (o = Promise))(function (e, t) {
            function n(e) {
              try {
                a(c.next(e));
              } catch (e) {
                t(e);
              }
            }
            function i(e) {
              try {
                a(c.throw(e));
              } catch (e) {
                t(e);
              }
            }
            function a(t) {
              var r;
              t.done
                ? e(t.value)
                : ((r = t.value),
                  r instanceof o
                    ? r
                    : new o(function (e) {
                        e(r);
                      })).then(n, i);
            }
            a((c = c.apply(r, s || [])).next());
          })
        );
        var r, s, o, c;
      }
      var rn,
        sn = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      const an =
          "... on ChannelStateValue {\n    channelId\n    key\n    value\n}",
        on = `mutation($input: ChannelStateValueInput!) {\n    result: SetChannelStateValue(input: $input) { ${d(
          an
        )} }\n}`,
        cn = `mutation($input: ChannelStateValueInput!) {\n    result: IncrementChannelStateValue(input: $input) { ${d(
          an
        )} }\n}`;
      class ln {
        constructor(e) {
          rn.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, rn, e, "f");
        }
        setChannelStateValue({ channelId: e, key: t, value: n }) {
          return sn(this, rn, "f").fetch(on, {
            channelId: e,
            key: t,
            value: n,
          });
        }
        incrementChannelStateValue({ channelId: e, key: t, value: n }) {
          return sn(this, rn, "f").fetch(cn, {
            channelId: e,
            key: t,
            value: n,
          });
        }
      }
      rn = new WeakMap();
      var hn,
        un = function (e, t, n, i) {
          if ("a" === n && !i)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof t ? e !== t || !i : !t.has(e))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? i : "a" === n ? i.call(e) : i ? i.value : t.get(e);
        };
      class dn {
        constructor(e) {
          hn.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, hn, e, "f"),
            (this.channels = new bt(un(this, hn, "f"))),
            (this.messages = new tn(un(this, hn, "f"))),
            (this.members = new Gt(un(this, hn, "f"))),
            (this.invites = new at(un(this, hn, "f"))),
            (this.joinRequests = new kt(un(this, hn, "f"))),
            (this.state = new ln(un(this, hn, "f"))),
            (this.createCentrifugeClient = nn);
        }
        ping(e) {
          un(this, hn, "f").ping(e);
        }
      }
      hn = new WeakMap();
      var pn,
        fn = a(8266),
        mn = a(6316);
      class vn {
        constructor(e) {
          pn.set(this, void 0),
            (function (e, t, n, i, r) {
              if ("m" === i)
                throw new TypeError("Private method is not writable");
              if ("a" === i && !r)
                throw new TypeError(
                  "Private accessor was defined without a setter"
                );
              if ("function" == typeof t ? e !== t || !r : !t.has(e))
                throw new TypeError(
                  "Cannot write private member to an object whose class did not declare it"
                );
              "a" === i ? r.call(e, n) : r ? (r.value = n) : t.set(e, n);
            })(this, pn, e, "f");
        }
        checkCensor({ text: e, options: t }) {
          return (function (e, t, n, i) {
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" == typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === n
              ? i
              : "a" === n
              ? i.call(e)
              : i
              ? i.value
              : t.get(e);
          })(this, pn, "f").fetch(
            "query ($input: PlayerAICensorInput!) {\n    result: PlayerAICheckCensor(input: $input) {\n        __typename\n        ... on Problem { message }\n        ... on Success { success }\n    }\n}",
            { text: e, options: t }
          );
        }
      }
      pn = new WeakMap();
      var yn = a(5942);
      const gn = {
        [yn.z.YANDEX]: () => a.e(6755).then(a.bind(a, 9699)),
        [yn.z.TELEGRAM]: () => a.e(9967).then(a.bind(a, 5943)),
        [yn.z.VK]: () => a.e(1911).then(a.bind(a, 1029)),
        [yn.z.OK]: () => a.e(4614).then(a.bind(a, 9753)),
        [yn.z.GAME_MONETIZE]: () => a.e(369).then(a.bind(a, 3978)),
        [yn.z.GAMEPIX]: () => a.e(9885).then(a.bind(a, 5940)),
        [yn.z.POKI]: () => a.e(6551).then(a.bind(a, 449)),
        [yn.z.GAME_DISTRIBUTION]: () => a.e(5860).then(a.bind(a, 8708)),
        [yn.z.WG_PLAYGROUND]: () => a.e(9084).then(a.bind(a, 6219)),
        [yn.z.CRAZY_GAMES]: () =>
          Promise.all([a.e(8880), a.e(5433)]).then(a.bind(a, 5186)),
        [yn.z.SMARTMARKET]: () => a.e(4552).then(a.bind(a, 3689)),
        [yn.z.VK_PLAY]: () => a.e(9070).then(a.bind(a, 558)),
        [yn.z.BEELINE]: () => a.e(6658).then(a.bind(a, 5367)),
        [yn.z.KONGREGATE]: () => a.e(7573).then(a.bind(a, 4685)),
        [yn.z.PLAYDECK]: () => a.e(2767).then(a.bind(a, 4954)),
        [yn.z.GOOGLE_PLAY]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.APP_GALLERY]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.GALAXY_STORE]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.ONE_STORE]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.AMAZON_APPSTORE]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.XIAOMI_GETAPPS]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.APTOIDE]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.RUSTORE]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.ANDROID]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(4773)]).then(
            a.bind(a, 5102)
          ),
        [yn.z.CUSTOM]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(8122), a.e(8417)]).then(
            a.bind(a, 4656)
          ),
        [yn.z.FOTOSTRANA]: () => a.e(4341).then(a.bind(a, 5974)),
        [yn.z.Y8]: () =>
          Promise.all([a.e(8880), a.e(8662)]).then(a.bind(a, 8240)),
        [yn.z.PARTNER]: () =>
          Promise.all([a.e(8880), a.e(4328), a.e(4183), a.e(3300)]).then(
            a.bind(a, 311)
          ),
        [yn.z.COOLMATH]: () => a.e(6702).then(a.bind(a, 5881)),
        [yn.z.PLAYDIA]: () => a.e(836).then(a.bind(a, 3178)),
        [yn.z.XIAOMI_GAMECENTER]: () => a.e(1764).then(a.bind(a, 8177)),
        [yn.z.YOUTUBE]: () => a.e(3529).then(a.bind(a, 8646)),
        [yn.z.NONE]: () => a.e(477).then(a.bind(a, 4495)),
        [yn.z.ARKADIUM]: () => a.e(8366).then(a.bind(a, 2931)),
        [yn.z.PLAYGAMA]: () => a.e(630).then(a.bind(a, 9721)),
      };
      class wn extends e.Z {
        constructor() {
          super(...arguments), (this.name = "gp");
        }
      }
      (window.__SDKProvider = "GamePush"),
        new wn(void 0, {
          preparePlatform: function ({ platformType: e, tools: t }) {
            return (function (e, t) {
              return (gn[e] || gn[yn.z.NONE])().then((n) => n.default(t, e));
            })(e, t);
          },
          servicesChunk: function (e) {
            const t = new ze(e);
            return {
              apiClient: t,
              setupAnalytics: (e) => {
                const t = [];
                return (
                  e.ymCounterId &&
                    t.push(new fn.Z({ counterId: e.ymCounterId })),
                  e.gtagCounterId &&
                    e.gtagCounterId
                      .split(",")
                      .map((e) => e.trim())
                      .forEach((e) => {
                        t.push(new mn.Z({ counterId: e }));
                      }),
                  { counters: t }
                );
              },
              projectService: new ne(t),
              achievementsService: new h(t),
              paymentsService: new C(t),
              gamesCollectionsService: new re(t),
              leaderboardsService: new ve(t),
              documentsService: new ge(t),
              imagesService: new Ie(t),
              filesService: new Ne(t),
              rewardsService: new M(t),
              eventsService: new $(t),
              schedulersService: new Fe(t),
              playerService: new Z(t),
              channelsService: new dn(t),
              aiService: new vn(t),
            };
          },
        });
    })();
})();
