/* prebid.js v10.29.0
Updated: 2026-04-23
Modules: consentManagementTcf, tcfControl, consentManagementGpp, appnexusBidAdapter, pairIdSystem, ixBidAdapter, pubmaticBidAdapter, rubiconBidAdapter, sharethroughBidAdapter, gamAdServerVideo, userId, criteoIdSystem, pubProvidedIdSystem, unifiedIdSystem, id5IdSystem, sharedIdSystem, identityLinkIdSystem, lotamePanoramaIdSystem, priceFloors, uid2IdSystem, liveIntentIdSystem, nexx360BidAdapter, hadronIdSystem, ozoneBidAdapter, ttdBidAdapter, atsAnalyticsAdapter, currency, tripleliftBidAdapter, medianetBidAdapter, 33acrossIdSystem, euidIdSystem, publinkIdSystem */
if (window.pbjs && window.pbjs.libLoaded)
  try {
    window.pbjs.getConfig('debug') &&
      console.warn("Attempted to load a copy of Prebid.js that clashes with the existing 'pbjs' instance. Load aborted.");
  } catch (e) {}
else
  ((function () {
    (() => {
      var r,
        e = {
          1490(r, e, t) {
            function n(r) {
              var e, t, o;
              if (Array.isArray(r)) {
                for (t = Array((e = r.length)); e--; ) t[e] = (o = r[e]) && 'object' == typeof o ? n(o) : o;
                return t;
              }
              if ('[object Object]' === Object.prototype.toString.call(r)) {
                for (e in ((t = {}), r))
                  '__proto__' === e
                    ? Object.defineProperty(t, e, { value: n(r[e]), configurable: !0, enumerable: !0, writable: !0 })
                    : (t[e] = (o = r[e]) && 'object' == typeof o ? n(o) : o);
                return t;
              }
              return r;
            }
            t.d(e, { Q: () => n });
          },
          3435(r, e, t) {
            function n(r, e, t) {
              e.split && (e = e.split('.'));
              for (
                var n, o, i = 0, a = e.length, f = r;
                i < a && '__proto__' != (o = '' + e[i++]) && 'constructor' !== o && 'prototype' !== o;

              )
                f = f[o] = i === a ? t : typeof (n = f[o]) == typeof e ? n : 0 * e[i] != 0 || ~('' + e[i]).indexOf('.') ? {} : [];
            }
            t.d(e, { J: () => n });
          },
          3715(r, e, t) {
            t.d(e, { A: () => n });
            const n = {
              pbGlobal: 'pbjs',
              defineGlobal: !0,
              features: { NATIVE: !0, VIDEO: !0, UID2_CSTG: !0, GREEDY: !1, AUDIO: !0, LOG_NON_ERROR: !0, LOG_ERROR: !0 },
              distUrlBase: 'https://cdn.jsdelivr.net/npm/prebid.js@10.29.0/dist/chunks/',
              skipCalls: {},
            };
          },
          5481(r) {
            /*
             * @license MIT
             * Fun Hooks v1.1.0
             * (c) @snapwich
             */
            ((i.SYNC = 1), (i.ASYNC = 2), (i.QUEUE = 4));
            var e = 'fun-hooks',
              t = Object.freeze({ ready: 0 }),
              n = new WeakMap();
            function o(r, e) {
              return Array.prototype.slice.call(r, e);
            }
            function i(r) {
              var a,
                f = {},
                c = [];
              function u(r, e) {
                return 'function' == typeof r
                  ? y.call(null, 'sync', r, e)
                  : 'string' == typeof r && 'function' == typeof e
                    ? y.apply(null, arguments)
                    : 'object' == typeof r
                      ? l.apply(null, arguments)
                      : void 0;
              }
              function l(r, e, t) {
                var n = !0;
                void 0 === e && ((e = Object.getOwnPropertyNames(r).filter((r) => !r.match(/^_/))), (n = !1));
                var o = {},
                  i = ['constructor'];
                do {
                  (e.forEach(function (e) {
                    var n = e.match(/(?:(sync|async):)?(.+)/),
                      a = n[1] || 'sync',
                      f = n[2];
                    if (!o[f] && 'function' == typeof r[f] && -1 === i.indexOf(f)) {
                      var c = r[f];
                      o[f] = r[f] = y(a, c, t ? [t, f] : void 0);
                    }
                  }),
                    (r = Object.getPrototypeOf(r)));
                } while (n && r);
                return o;
              }
              function p(r) {
                var t = Array.isArray(r) ? r : r.split('.');
                return t.reduce(function (n, o, i) {
                  var f = n[o],
                    u = !1;
                  return (
                    f ||
                    (i === t.length - 1
                      ? (a ||
                          c.push(function () {
                            u || console.warn(e + ": referenced '" + r + "' but it was never created");
                          }),
                        (n[o] = s(function (r) {
                          ((n[o] = r), (u = !0));
                        })))
                      : (n[o] = {}))
                  );
                }, f);
              }
              function s(r) {
                var e = [],
                  t = [],
                  o = function () {},
                  i = {
                    before: function (r, t) {
                      return f.call(this, e, 'before', r, t);
                    },
                    after: function (r, e) {
                      return f.call(this, t, 'after', r, e);
                    },
                    getHooks: function (r) {
                      var n = e.concat(t);
                      'object' == typeof r &&
                        (n = n.filter(function (e) {
                          return Object.keys(r).every(function (t) {
                            return e[t] === r[t];
                          });
                        }));
                      try {
                        Object.assign(n, {
                          remove: function () {
                            return (
                              n.forEach(function (r) {
                                r.remove();
                              }),
                              this
                            );
                          },
                        });
                      } catch (r) {
                        console.error('error adding `remove` to array, did you modify Array.prototype?');
                      }
                      return n;
                    },
                    removeAll: function () {
                      return this.getHooks().remove();
                    },
                  },
                  a = {
                    install: function (n, i, a) {
                      ((this.type = n), (o = a), a(e, t), r && r(i));
                    },
                  };
                return (n.set(i.after, a), i);
                function f(r, n, i, a) {
                  var f = {
                    hook: i,
                    type: n,
                    priority: a || 10,
                    remove: function () {
                      var n = r.indexOf(f);
                      -1 !== n && (r.splice(n, 1), o(e, t));
                    },
                  };
                  return (
                    r.push(f),
                    r.sort(function (r, e) {
                      return e.priority - r.priority;
                    }),
                    o(e, t),
                    this
                  );
                }
              }
              function y(t, f, u) {
                var l = f.after && n.get(f.after);
                if (l) {
                  if (l.type !== t) throw e + ': recreated hookable with different type';
                  return f;
                }
                var y,
                  v = u ? p(u) : s(),
                  d = {
                    get: function (r, e) {
                      return v[e] || Reflect.get.apply(Reflect, arguments);
                    },
                  };
                a || c.push(b);
                var h = new Proxy(f, d);
                return (
                  n.get(h.after).install(t, h, function (r, e) {
                    var n,
                      i = [];
                    r.length || e.length
                      ? (r.forEach(a),
                        (n = i.push(void 0) - 1),
                        e.forEach(a),
                        (y = function (r, e, a) {
                          var f,
                            c = i.slice(),
                            u = 0,
                            l = 'async' === t && 'function' == typeof a[a.length - 1] && a.pop();
                          function p(r) {
                            'sync' === t ? (f = r) : l && l.apply(null, arguments);
                          }
                          function s(r) {
                            if (c[u]) {
                              var n = o(arguments);
                              return ((s.bail = p), n.unshift(s), c[u++].apply(e, n));
                            }
                            'sync' === t ? (f = r) : l && l.apply(null, arguments);
                          }
                          return (
                            (c[n] = function () {
                              var n = o(arguments, 1);
                              'async' === t && l && (delete s.bail, n.push(s));
                              var i = r.apply(e, n);
                              'sync' === t && s(i);
                            }),
                            s.apply(null, a),
                            f
                          );
                        }))
                      : (y = void 0);
                    function a(r) {
                      i.push(r.hook);
                    }
                    b();
                  }),
                  h
                );
                function b() {
                  !a && ('sync' !== t || r.ready & i.SYNC) && ('async' !== t || r.ready & i.ASYNC)
                    ? 'sync' !== t && r.ready & i.QUEUE
                      ? (d.apply = function () {
                          var r = arguments;
                          c.push(function () {
                            h.apply(r[1], r[2]);
                          });
                        })
                      : (d.apply = function () {
                          throw e + ': hooked function not ready';
                        })
                    : (d.apply = y);
                }
              }
              return (
                (r = Object.assign({}, t, r)).ready
                  ? (u.ready = function () {
                      ((a = !0),
                        (function (r) {
                          for (var e; (e = r.shift()); ) e();
                        })(c));
                    })
                  : (a = !0),
                (u.get = p),
                u
              );
            }
            r.exports = i;
          },
          8928(r, e, t) {
            function n(r, e, t, n, o) {
              for (e = e.split ? e.split('.') : e, n = 0; n < e.length; n++) r = r ? r[e[n]] : o;
              return r === o ? t : r;
            }
            t.d(e, { A: () => n });
          },
        },
        t = {};
      function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var i = (t[r] = { exports: {} });
        return (e[r](i, i.exports, n), i.exports);
      }
      ((n.m = e),
        (r = []),
        (n.O = (e, t, o, i) => {
          if (!t) {
            var a = 1 / 0;
            for (l = 0; l < r.length; l++) {
              for (var [t, o, i] = r[l], f = !0, c = 0; c < t.length; c++)
                (!1 & i || a >= i) && Object.keys(n.O).every((r) => n.O[r](t[c])) ? t.splice(c--, 1) : ((f = !1), i < a && (a = i));
              if (f) {
                r.splice(l--, 1);
                var u = o();
                void 0 !== u && (e = u);
              }
            }
            return e;
          }
          i = i || 0;
          for (var l = r.length; l > 0 && r[l - 1][2] > i; l--) r[l] = r[l - 1];
          r[l] = [t, o, i];
        }),
        (n.n = (r) => {
          var e = r && r.__esModule ? () => r.default : () => r;
          return (n.d(e, { a: e }), e);
        }),
        (n.d = (r, e) => {
          for (var t in e) n.o(e, t) && !n.o(r, t) && Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
        }),
        (n.o = (r, e) => Object.prototype.hasOwnProperty.call(r, e)),
        (n.r = (r) => {
          ('undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(r, '__esModule', { value: !0 }));
        }),
        (() => {
          var r = { 9673: 0 };
          n.O.j = (e) => 0 === r[e];
          var e = (e, t) => {
              var o,
                i,
                [a, f, c] = t,
                u = 0;
              if (a.some((e) => 0 !== r[e])) {
                for (o in f) n.o(f, o) && (n.m[o] = f[o]);
                if (c) var l = c(n);
              }
              for (e && e(t); u < a.length; u++) ((i = a[u]), n.o(r, i) && r[i] && r[i][0](), (r[i] = 0));
              return n.O(l);
            },
            t = (self.pbjsChunk = self.pbjsChunk || []);
          (t.forEach(e.bind(null, 0)), (t.push = e.bind(null, t.push.bind(t))));
        })());
      var o = n.O(void 0, [802, 7769, 315, 1085], () => n(4367));
      o = n.O(o);
    })();
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [802],
      {
        356(e, t, n) {
          n.d(t, { Bm: () => v, IX: () => C, Xj: () => U, gs: () => A, l6: () => m, mT: () => u, nk: () => b, vO: () => E, yl: () => S });
          var r = n(466),
            i = n(6665),
            o = n(3006),
            s = n(1418),
            a = n(9794),
            d = n(1852),
            c = n(5144),
            l = n(2122);
          const u = [],
            g = {
              image: {
                ortb: {
                  ver: '1.2',
                  assets: [
                    { required: 1, id: 1, img: { type: 3, wmin: 100, hmin: 100 } },
                    { required: 1, id: 2, title: { len: 140 } },
                    { required: 1, id: 3, data: { type: 1 } },
                    { required: 0, id: 4, data: { type: 2 } },
                    { required: 0, id: 5, img: { type: 1, wmin: 20, hmin: 20 } },
                  ],
                },
                image: { required: !0 },
                title: { required: !0 },
                sponsoredBy: { required: !0 },
                clickUrl: { required: !0 },
                body: { required: !1 },
                icon: { required: !1 },
              },
            },
            f = _(s.h0),
            p = _(s.jO);
          function m(e) {
            return null != e.native && 'object' == typeof e.native;
          }
          function h(e) {
            if (
              (e &&
                e.type &&
                (function (e) {
                  if (!e || !Object.keys(g).includes(e)) return ((0, r.logError)(`${e} nativeParam is not supported`), !1);
                  return !0;
                })(e.type) &&
                (e = g[e.type]),
              !e || !e.ortb || y(e.ortb))
            )
              return e;
          }
          function b(e) {
            e.forEach((e) => {
              const t = e.nativeParams || e?.mediaTypes?.native;
              (t && (e.nativeParams = h(t)),
                e.nativeParams &&
                  (e.nativeOrtbRequest =
                    e.nativeParams.ortb ||
                    (function (e) {
                      if (!e && !(0, i.Qd)(e)) return void (0, r.logError)('Native assets object is empty or not an object: ', e);
                      const t = { ver: '1.2', assets: [] };
                      for (const n in e) {
                        if (s._B.includes(n)) continue;
                        if (!s.x5.hasOwnProperty(n)) {
                          (0, r.logError)(`Unrecognized native asset code: ${n}. Asset will be ignored.`);
                          continue;
                        }
                        if ('privacyLink' === n) {
                          t.privacy = 1;
                          continue;
                        }
                        const o = e[n];
                        let a = 0;
                        o.required && (0, i.Lm)(o.required) && (a = Number(o.required));
                        const d = { id: t.assets.length, required: a };
                        if (n in s.h0) ((d.data = { type: s.jO[s.h0[n]] }), o.len && (d.data.len = o.len));
                        else if ('icon' === n || 'image' === n) {
                          if (((d.img = { type: 'icon' === n ? s.oA.ICON : s.oA.MAIN }), o.aspect_ratios))
                            if ((0, i.cy)(o.aspect_ratios))
                              if (o.aspect_ratios.length) {
                                const { min_width: e, min_height: t } = o.aspect_ratios[0];
                                (0, i.Fq)(e) && (0, i.Fq)(t)
                                  ? ((d.img.wmin = e), (d.img.hmin = t))
                                  : (0, r.logError)('image.aspect_ratios min_width or min_height are invalid: ', e, t);
                                const n = o.aspect_ratios
                                  .filter((e) => e.ratio_width && e.ratio_height)
                                  .map((e) => `${e.ratio_width}:${e.ratio_height}`);
                                n.length > 0 && (d.img.ext = { aspectratios: n });
                              } else (0, r.logError)("image.aspect_ratios was passed, but it's empty:", o.aspect_ratios);
                            else (0, r.logError)("image.aspect_ratios was passed, but it's not a an array:", o.aspect_ratios);
                          o.sizes &&
                            (2 === o.sizes.length && (0, i.Fq)(o.sizes[0]) && (0, i.Fq)(o.sizes[1])
                              ? ((d.img.w = o.sizes[0]), (d.img.h = o.sizes[1]), delete d.img.hmin, delete d.img.wmin)
                              : (0, r.logError)('image.sizes was passed, but its value is not an array of integers:', o.sizes));
                        } else 'title' === n ? (d.title = { len: o.len || 140 }) : 'ext' === n && ((d.ext = o), delete d.required);
                        t.assets.push(d);
                      }
                      return t;
                    })(e.nativeParams)));
            });
          }
          function y(e) {
            const t = e.assets;
            if (!Array.isArray(t) || 0 === t.length)
              return ((0, r.logError)("assets in mediaTypes.native.ortb is not an array, or it's empty. Assets: ", t), !1);
            const n = t.map((e) => e.id);
            return t.length !== new Set(n).size || n.some((e) => e !== parseInt(e, 10))
              ? ((0, r.logError)("each asset object must have 'id' property, it must be unique and it must be an integer"), !1)
              : e.hasOwnProperty('eventtrackers') && !Array.isArray(e.eventtrackers)
                ? ((0, r.logError)('ortb.eventtrackers is not an array. Eventtrackers: ', e.eventtrackers), !1)
                : t.every((e) =>
                    (function (e) {
                      if (!(0, i.Qd)(e)) return ((0, r.logError)('asset must be an object. Provided asset: ', e), !1);
                      if (e.img) {
                        if (!(0, i.Et)(e.img.w) && !(0, i.Et)(e.img.wmin))
                          return ((0, r.logError)("for img asset there must be 'w' or 'wmin' property"), !1);
                        if (!(0, i.Et)(e.img.h) && !(0, i.Et)(e.img.hmin))
                          return ((0, r.logError)("for img asset there must be 'h' or 'hmin' property"), !1);
                      } else if (e.title) {
                        if (!(0, i.Et)(e.title.len)) return ((0, r.logError)("for title asset there must be 'len' property defined"), !1);
                      } else if (e.data) {
                        if (!(0, i.Et)(e.data.type)) return ((0, r.logError)("for data asset 'type' property must be a number"), !1);
                      } else if (
                        e.video &&
                        !(
                          Array.isArray(e.video.mimes) &&
                          Array.isArray(e.video.protocols) &&
                          (0, i.Et)(e.video.minduration) &&
                          (0, i.Et)(e.video.maxduration)
                        )
                      )
                        return ((0, r.logError)('video asset is not properly configured'), !1);
                      return !0;
                    })(e),
                  );
          }
          function v(e) {
            let { index: t = o.n.index } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n = t.getAdUnit(e);
            if (!n) return !1;
            const i = n.nativeOrtbRequest;
            return (function (e, t) {
              if (!e?.link?.url) return ((0, r.logError)("native response doesn't have 'link' property. Ortb response: ", e), !1);
              const n = t.assets.filter((e) => 1 === e.required).map((e) => e.id),
                i = e.assets.map((e) => e.id),
                o = n.every((e) => i.includes(e));
              o || (0, r.logError)(`didn't receive a bid with all required assets. Required ids: ${n}, but received ids in response: ${i}`);
              return o;
            })(e.native?.ortb || D(e.native, i), i);
          }
          function E(e, t) {
            const n = t.native.ortb || k(t.native);
            return (
              'click' === e.action
                ? (function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                      { fetchURL: n = r.triggerPixel } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    if (t) {
                      const r = (e.assets || []).filter((e) => e.link).reduce((e, t) => ((e[t.id] = t.link), e), {}),
                        i = e.link?.clicktrackers || [],
                        o = r[t];
                      let s = i;
                      (o && (s = o.clicktrackers || []), s.forEach((e) => n(e)));
                    } else (e.link?.clicktrackers || []).forEach((e) => n(e));
                  })(n, e?.assetId)
                : (function (e) {
                    let { runMarkup: t = (e) => (0, r.insertHtmlIntoIframe)(e), fetchURL: n = r.triggerPixel } =
                        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                      { [l.Ni]: i = [], [l.fR]: o = [] } = (0, l.$T)(e.eventtrackers || [])[l.OA] || {};
                    e.imptrackers && (i = i.concat(e.imptrackers));
                    (i.forEach((e) => n(e)),
                      (o = o.map((e) => `<script async src="${e}"><\/script>`)),
                      e.jstracker && (o = o.concat([e.jstracker])));
                    o.length && t(o.join('\n'));
                  })(n),
              e.action
            );
          }
          function A(e, t) {
            const n = t?.nativeOrtbRequest,
              r = e.native?.ortb;
            if (n && r) {
              const t = (function (e, t) {
                const n = {},
                  r = t?.assets || [];
                ((n.clickUrl = e.link?.url), (n.privacyLink = e.privacy));
                for (const t of e?.assets || []) {
                  const e = r.find((e) => t.id === e.id);
                  t.title
                    ? (n.title = t.title.text)
                    : t.img
                      ? (n[e?.img?.type === s.oA.MAIN ? 'image' : 'icon'] = { url: t.img.url, width: t.img.w, height: t.img.h })
                      : t.data && (n[f[p[e?.data?.type]]] = t.data.value);
                }
                n.impressionTrackers = [];
                let i = [];
                e.imptrackers && n.impressionTrackers.push(...e.imptrackers);
                for (const t of e?.eventtrackers || [])
                  (t.event === l.OA && t.method === l.Ni && n.impressionTrackers.push(t.url),
                    t.event === l.OA && t.method === l.fR && i.push(t.url));
                ((i = i.map((e) => `<script async src="${e}"><\/script>`)), e?.jstracker && i.push(e.jstracker));
                i.length && (n.javascriptTrackers = i.join('\n'));
                return n;
              })(r, n);
              Object.assign(e.native, t);
            }
            ['rendererUrl', 'adTemplate'].forEach((n) => {
              const r = t?.nativeParams?.[n];
              r && (e.native[n] = O(r));
            });
          }
          function w(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            const r = [];
            return (
              Object.entries(e)
                .filter((e) => {
                  let [r, i] = e;
                  return i && ((!1 === n && 'ext' === r) || null == t || t.includes(r));
                })
                .forEach((e) => {
                  let [i, o] = e;
                  !1 === n && 'ext' === i ? r.push(...w(o, t, !0)) : (n || s.x5.hasOwnProperty(i)) && r.push({ key: i, value: O(o) });
                }),
              r
            );
          }
          function I(e, t, n) {
            let { index: r = o.n.index } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            const a = { message: 'assetResponse', adId: e.adId };
            let l = (0, d.vd)(t).native;
            return (
              l
                ? ((a.native = Object.assign({}, l)),
                  (a.renderer = (0, c.kj)(t)),
                  (a.rendererVersion = c.xh),
                  null != n &&
                    (l.assets = l.assets.filter((e) => {
                      let { key: t } = e;
                      return n.includes(t);
                    })))
                : (l = (function (e, t, n) {
                    const r = { ...(0, i.SH)(e.native, ['rendererUrl', 'adTemplate']), assets: w(e.native, n), nativeKeys: s.x5 };
                    return (
                      e.native.ortb ? (r.ortb = e.native.ortb) : t.mediaTypes?.native?.ortb && (r.ortb = D(e.native, t.nativeOrtbRequest)),
                      r
                    );
                  })(t, r.getAdUnit(t), n)),
              Object.assign(a, l)
            );
          }
          const T = Object.fromEntries(
            Object.entries(s.x5).map((e) => {
              let [t, n] = e;
              return [n, t];
            }),
          );
          function C(e, t) {
            const n = e.assets.map((e) => T[e]);
            return I(e, t, n);
          }
          function S(e, t) {
            return I(e, t, null);
          }
          function O(e) {
            return e?.url || e;
          }
          function B(e, t) {
            for (; e && t && e !== t; ) e > t ? (e -= t) : (t -= e);
            return e || t;
          }
          function R(e) {
            if (!y(e)) return;
            const t = {};
            for (const n of e.assets) {
              if (n.title) {
                const e = { required: !!n.required && Boolean(n.required), len: n.title.len };
                t.title = e;
              } else if (n.img) {
                const e = { required: !!n.required && Boolean(n.required) };
                if (n.img.w && n.img.h) e.sizes = [n.img.w, n.img.h];
                else if (n.img.wmin && n.img.hmin) {
                  const t = B(n.img.wmin, n.img.hmin);
                  e.aspect_ratios = [
                    { min_width: n.img.wmin, min_height: n.img.hmin, ratio_width: n.img.wmin / t, ratio_height: n.img.hmin / t },
                  ];
                }
                n.img.type === s.oA.MAIN ? (t.image = e) : (t.icon = e);
              } else if (n.data) {
                const e = Object.keys(s.jO).find((e) => s.jO[e] === n.data.type),
                  r = Object.keys(s.h0).find((t) => s.h0[t] === e);
                ((t[r] = { required: !!n.required && Boolean(n.required) }), n.data.len && (t[r].len = n.data.len));
              }
              e.privacy && (t.privacyLink = { required: !1 });
            }
            return t;
          }
          function U(e) {
            {
              if (!e || !(0, i.cy)(e)) return e;
              if (!e.some((e) => (e?.mediaTypes || {})[a.s6]?.ortb)) return e;
              const t = (0, i.Go)(e);
              for (const e of t)
                e.mediaTypes &&
                  e.mediaTypes[a.s6] &&
                  e.mediaTypes[a.s6].ortb &&
                  ((e.mediaTypes[a.s6] = Object.assign((0, r.pick)(e.mediaTypes[a.s6], s._B), R(e.mediaTypes[a.s6].ortb))),
                  (e.nativeParams = h(e.mediaTypes[a.s6])));
              return t;
            }
          }
          function k(e) {
            const t = { link: {}, eventtrackers: [] };
            return (
              Object.entries(e).forEach((e) => {
                let [n, r] = e;
                switch (n) {
                  case 'clickUrl':
                    t.link.url = r;
                    break;
                  case 'clickTrackers':
                    t.link.clicktrackers = Array.isArray(r) ? r : [r];
                    break;
                  case 'impressionTrackers':
                    (Array.isArray(r) ? r : [r]).forEach((e) => {
                      t.eventtrackers.push({ event: l.OA, method: l.Ni, url: e });
                    });
                    break;
                  case 'javascriptTrackers':
                    t.jstracker = Array.isArray(r) ? r.join('') : r;
                    break;
                  case 'privacyLink':
                    t.privacy = r;
                }
              }),
              t
            );
          }
          function D(e, t) {
            const n = { ...k(e), assets: [] };
            function r(e, r) {
              let o = t.assets.find(e);
              null != o && ((o = (0, i.Go)(o)), r(o), n.assets.push(o));
            }
            return (
              Object.keys(e)
                .filter((t) => !!e[t])
                .forEach((t) => {
                  const n = O(e[t]);
                  switch (t) {
                    case 'title':
                      r(
                        (e) => null != e.title,
                        (e) => {
                          e.title = { text: n };
                        },
                      );
                      break;
                    case 'image':
                    case 'icon':
                      const e = 'image' === t ? s.oA.MAIN : s.oA.ICON;
                      r(
                        (t) => null != t.img && t.img.type === e,
                        (e) => {
                          e.img = { url: n };
                        },
                      );
                      break;
                    default:
                      t in s.h0 &&
                        r(
                          (e) => null != e.data && e.data.type === s.jO[s.h0[t]],
                          (e) => {
                            e.data = { value: n };
                          },
                        );
                  }
                }),
              n
            );
          }
          function _(e) {
            var t = {};
            for (var n in e) t[e[n]] = n;
            return t;
          }
        },
        466(e, t, n) {
          (n.r(t),
            n.d(t, {
              _each: () => ee,
              _map: () => ne,
              _setEventEmitter: () => h,
              binarySearch: () => tt,
              buildUrl: () => Le,
              canAccessWindowTop: () => N,
              checkCookieSupport: () => ke,
              cleanObj: () => Ne,
              compareCodeAndSlot: () => qe,
              compressDataWithGZip: () => at,
              contains: () => te,
              convertObjectToArray: () => Ze,
              createIframe: () => J,
              createInvisibleIframe: () => Y,
              createTrackPixelHtml: () => de,
              createTrackPixelIframeHtml: () => le,
              cyrb53Hash: () => Qe,
              debugTurnedOn: () => Q,
              deepAccess: () => s.A,
              deepClone: () => a.Go,
              deepEqual: () => ze,
              deepSetValue: () => d.J,
              delayExecution: () => De,
              encodeMacroURI: () => ce,
              extractDomainFromHost: () => it,
              flatten: () => ge,
              formatQS: () => Fe,
              generateUUID: () => T,
              getBidIdParameter: () => C,
              getBidRequest: () => fe,
              getBidderCodes: () => me,
              getDefinedParams: () => a.SH,
              getDocument: () => j,
              getDomLoadingDuration: () => Re,
              getFallbackWindow: () => P,
              getParameterByName: () => K,
              getPerformanceNow: () => Be,
              getPrebidInternal: () => E,
              getSafeframeGeometry: () => we,
              getScreenOrientation: () => c.Vv,
              getUniqueIdentifierStr: () => I,
              getUnixTimestampFromNow: () => Xe,
              getUserConfiguredParams: () => xe,
              getValue: () => pe,
              getWinDimensions: () => c.Ot,
              getWindowLocation: () => W,
              getWindowSelf: () => q,
              getWindowTop: () => x,
              groupBy: () => _e,
              hasConsoleLogger: () => V,
              hasDeviceAccess: () => Ue,
              hasNonSerializableProperty: () => nt,
              inIframe: () => Ee,
              insertElement: () => re,
              insertHtmlIntoIframe: () => se,
              insertUserSyncIframe: () => ae,
              internal: () => y,
              isA: () => a.KG,
              isAdUnitCodeMatchingSlot: () => We,
              isApnGetTagDefined: () => be,
              isArray: () => a.cy,
              isArrayOfNums: () => a.Uu,
              isBoolean: () => a.Lm,
              isEmpty: () => X,
              isEmptyStr: () => Z,
              isFn: () => a.fp,
              isGptPubadsDefined: () => he,
              isGzipCompressionSupported: () => st,
              isInteger: () => a.Fq,
              isNumber: () => a.Et,
              isPlainObject: () => a.Qd,
              isSafariBrowser: () => Ie,
              isSafeFrameWindow: () => Ae,
              isStr: () => a.O8,
              isValidMediaTypes: () => $e,
              logError: () => L,
              logInfo: () => F,
              logMessage: () => M,
              logWarn: () => G,
              memoize: () => Ke,
              mergeDeep: () => He,
              parseGPTSingleSizeArray: () => k,
              parseGPTSingleSizeArrayToRtbSize: () => _,
              parseQS: () => Me,
              parseQueryStringParameters: () => S,
              parseSizesInput: () => R,
              parseUrl: () => Ge,
              pick: () => Pe,
              prefixLog: () => z,
              replaceAuctionPrice: () => Ce,
              replaceClickThrough: () => Se,
              replaceMacros: () => Te,
              resetWinDimensions: () => c.Bp,
              safeJSONEncode: () => Ye,
              safeJSONParse: () => Je,
              setOnAny: () => rt,
              setScriptAttributes: () => et,
              shuffle: () => ve,
              sizeTupleToRtbSize: () => D,
              sizeTupleToSizeString: () => U,
              sizesToSizeTuples: () => B,
              sortByHighestCpm: () => ye,
              timestamp: () => Oe,
              transformAdServerTargetingObj: () => O,
              triggerNurlWithCpm: () => ot,
              triggerPixel: () => oe,
              uniques: () => ue,
              unsupportedBidderMessage: () => je,
              waitForElementToLoad: () => ie,
            }));
          var r = n(1933),
            i = n(1418),
            o = n(3064),
            s = n(8928),
            a = n(6665),
            d = n(3435),
            c = n(3958);
          const l = Boolean(window.console),
            u = Boolean(l && window.console.log),
            g = Boolean(l && window.console.info),
            f = Boolean(l && window.console.warn),
            p = Boolean(l && window.console.error);
          let m;
          function h(e) {
            m = e;
          }
          function b() {
            null != m && m(...arguments);
          }
          const y = {
              checkCookieSupport: ke,
              createTrackPixelIframeHtml: le,
              getWindowSelf: q,
              getWindowTop: x,
              canAccessWindowTop: N,
              getWindowLocation: W,
              insertUserSyncIframe: ae,
              insertElement: re,
              isFn: a.fp,
              triggerPixel: oe,
              logError: L,
              logWarn: G,
              logMessage: M,
              logInfo: F,
              parseQS: Me,
              formatQS: Fe,
              deepEqual: ze,
            },
            v = {};
          function E() {
            return v;
          }
          var A,
            w =
              ((A = 0),
              function () {
                return ++A;
              });
          function I() {
            return w() + Math.random().toString(16).substr(2);
          }
          function T(e) {
            return e
              ? (
                  e ^
                  ((window && window.crypto && window.crypto.getRandomValues
                    ? crypto.getRandomValues(new Uint8Array(1))[0] % 16
                    : 16 * Math.random()) >>
                    (e / 4))
                ).toString(16)
              : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, T);
          }
          function C(e, t) {
            return t?.[e] || '';
          }
          function S(e) {
            let t = '';
            for (var n in e) e.hasOwnProperty(n) && (t += n + '=' + encodeURIComponent(e[n]) + '&');
            return ((t = t.replace(/&$/, '')), t);
          }
          function O(e) {
            return e && Object.getOwnPropertyNames(e).length > 0
              ? Object.keys(e)
                  .map((t) => `${t}=${encodeURIComponent(e[t])}`)
                  .join('&')
              : '';
          }
          function B(e) {
            return 'string' == typeof e
              ? e
                  .split(/\s*,\s*/)
                  .map((e) => e.match(/^(\d+)x(\d+)$/i))
                  .filter((e) => e)
                  .map((e) => {
                    let [t, n, r] = e;
                    return [parseInt(n, 10), parseInt(r, 10)];
                  })
              : Array.isArray(e)
                ? $(e)
                  ? [e]
                  : e.filter($)
                : [];
          }
          function R(e) {
            return B(e).map(U);
          }
          function U(e) {
            return e[0] + 'x' + e[1];
          }
          function k(e) {
            if ($(e)) return U(e);
          }
          function D(e) {
            return { w: e[0], h: e[1] };
          }
          function _(e) {
            if ($(e)) return D(e);
          }
          function $(e) {
            return (0, a.cy)(e) && 2 === e.length && !isNaN(e[0]) && !isNaN(e[1]);
          }
          function x() {
            return window.top;
          }
          function q() {
            return window.self;
          }
          function W() {
            return window.location;
          }
          function j() {
            return document;
          }
          function N() {
            try {
              if (y.getWindowTop().location.href) return !0;
            } catch (e) {
              return !1;
            }
          }
          function P(e) {
            return e || (N() ? y.getWindowTop() : y.getWindowSelf());
          }
          function M() {
            Q() && u && console.log.apply(console, H(arguments, 'MESSAGE:'));
          }
          function F() {
            Q() && g && console.info.apply(console, H(arguments, 'INFO:'));
          }
          function G() {
            (Q() && f && console.warn.apply(console, H(arguments, 'WARNING:')), b(i.qY.AUCTION_DEBUG, { type: 'WARNING', arguments }));
          }
          function L() {
            (Q() && p && console.error.apply(console, H(arguments, 'ERROR:')), b(i.qY.AUCTION_DEBUG, { type: 'ERROR', arguments }));
          }
          function z(e) {
            function t(t) {
              return function () {
                for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                t(e, ...r);
              };
            }
            return { logError: t(L), logWarn: t(G), logMessage: t(M), logInfo: t(F) };
          }
          function H(e, t) {
            e = [].slice.call(e);
            const n = r.$W.getCurrentBidder();
            return (t && e.unshift(t), n && e.unshift(i('#aaa')), e.unshift(i('#3b88c3')), e.unshift('%cPrebid' + (n ? `%c${n}` : '')), e);
            function i(e) {
              return `display: inline-block; color: #fff; background: ${e}; padding: 1px 4px; border-radius: 3px;`;
            }
          }
          function V() {
            return u;
          }
          function Q() {
            return !!r.$W.getConfig('debug');
          }
          const J = (() => {
            const e = {
              border: '0px',
              hspace: '0',
              vspace: '0',
              marginWidth: '0',
              marginHeight: '0',
              scrolling: 'no',
              frameBorder: '0',
              allowtransparency: 'true',
            };
            return function (t, n) {
              let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              const i = t.createElement('iframe');
              return (Object.assign(i, Object.assign({}, e, n)), Object.assign(i.style, r), i);
            };
          })();
          function Y() {
            return J(
              document,
              { id: I(), width: 0, height: 0, src: 'about:blank' },
              { display: 'none', height: '0px', width: '0px', border: '0px' },
            );
          }
          function K(e) {
            return Me(W().search)[e] || '';
          }
          function X(e) {
            return !e || ((0, a.cy)(e) || (0, a.O8)(e) ? !(e.length > 0) : Object.keys(e).length <= 0);
          }
          function Z(e) {
            return (0, a.O8)(e) && (!e || 0 === e.length);
          }
          function ee(e, t) {
            if ((0, a.fp)(e?.forEach)) return e.forEach(t, this);
            Object.entries(e || {}).forEach((e) => {
              let [n, r] = e;
              return t.call(this, r, n);
            });
          }
          function te(e, t) {
            return (0, a.fp)(e?.includes) && e.includes(t);
          }
          function ne(e, t) {
            return (0, a.fp)(e?.map)
              ? e.map(t)
              : Object.entries(e || {}).map((n) => {
                  let [r, i] = n;
                  return t(i, r, e);
                });
          }
          function re(e, t, n, r) {
            let i;
            ((t = t || document), (i = n ? t.getElementsByTagName(n) : t.getElementsByTagName('head')));
            try {
              if (((i = i.length ? i : t.getElementsByTagName('body')), i.length)) {
                i = i[0];
                const t = r ? null : i.firstChild;
                return i.insertBefore(e, t);
              }
            } catch (e) {}
          }
          function ie(e, t) {
            let n = null;
            return new o.U9((r) => {
              const i = function () {
                (e.removeEventListener('load', i), e.removeEventListener('error', i), null != n && window.clearTimeout(n), r());
              };
              (e.addEventListener('load', i), e.addEventListener('error', i), null != t && (n = window.setTimeout(i, t)));
            });
          }
          function oe(e, t, n) {
            const r = new Image();
            (t && y.isFn(t) && ie(r, n).then(t), (r.src = e));
          }
          function se(e) {
            if (!e) return;
            const t = Y();
            var n;
            (y.insertElement(t, document, 'body'), (n = t.contentWindow.document).open(), n.write(e), n.close());
          }
          function ae(e, t, n) {
            const r = y.createTrackPixelIframeHtml(e, !1, 'allow-scripts allow-same-origin'),
              i = document.createElement('div');
            i.innerHTML = r;
            const o = i.firstChild;
            (t && y.isFn(t) && ie(o, n).then(t), y.insertElement(o, document, 'html', !0));
          }
          function de(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : encodeURI;
            if (!e) return '';
            let n = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
            return ((n += '<img src="' + t(e) + '"></div>'), n);
          }
          function ce(e) {
            return Array.from(e.matchAll(/\$({[^}]+})/g))
              .map((e) => e[1])
              .reduce((e, t) => e.replace('$' + encodeURIComponent(t), '$' + t), encodeURI(e));
          }
          function le(e) {
            let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
            return e
              ? ((!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && (e = encodeURI(e)),
                t && (t = `sandbox="${t}"`),
                `<iframe ${t} id="${I()}"\n      frameborder="0"\n      allowtransparency="true"\n      marginheight="0" marginwidth="0"\n      width="0" hspace="0" vspace="0" height="0"\n      style="height:0px;width:0px;display:none;"\n      scrolling="no"\n      src="${e}">\n    </iframe>`)
              : '';
          }
          function ue(e, t, n) {
            return n.indexOf(e) === t;
          }
          function ge(e, t) {
            return e.concat(t);
          }
          function fe(e, t) {
            if (e) return t.flatMap((e) => e.bids).find((t) => ['bidId', 'adId', 'bid_id'].some((n) => t[n] === e));
          }
          function pe(e, t) {
            return e[t];
          }
          function me(e) {
            return e
              .map((e) => e.bids.map((e) => e.bidder).reduce(ge, []))
              .reduce(ge, [])
              .filter((e) => void 0 !== e)
              .filter(ue);
          }
          function he() {
            if (window.googletag && (0, a.fp)(window.googletag.pubads) && (0, a.fp)(window.googletag.pubads().getSlots)) return !0;
          }
          function be() {
            if (window.apntag && (0, a.fp)(window.apntag.getTag)) return !0;
          }
          const ye = (e, t) => t.cpm - e.cpm;
          function ve(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = Math.floor(Math.random() * t);
              t--;
              const r = e[t];
              ((e[t] = e[n]), (e[n] = r));
            }
            return e;
          }
          function Ee() {
            try {
              return y.getWindowSelf() !== y.getWindowTop();
            } catch (e) {
              return !0;
            }
          }
          function Ae() {
            if (!Ee()) return !1;
            const e = y.getWindowSelf();
            return !(!e.$sf || !e.$sf.ext);
          }
          function we() {
            try {
              const e = q();
              return 'function' == typeof e.$sf.ext.geom ? e.$sf.ext.geom() : void 0;
            } catch (e) {
              return void L('Error getting SafeFrame geometry', e);
            }
          }
          function Ie() {
            return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
          }
          function Te(e, t) {
            if (e)
              return Object.entries(t).reduce((e, t) => {
                let [n, r] = t;
                return e.replace(new RegExp('\\$\\{' + n + '\\}', 'g'), r || '');
              }, e);
          }
          function Ce(e, t) {
            return Te(e, { AUCTION_PRICE: t });
          }
          function Se(e, t) {
            if (e && t && 'string' == typeof t) return e.replace(/\${CLICKTHROUGH}/g, t);
          }
          function Oe() {
            return new Date().getTime();
          }
          function Be() {
            return (window.performance && window.performance.now && window.performance.now()) || 0;
          }
          function Re(e) {
            let t = -1;
            const n = (e = e || q()).performance;
            if (e.performance?.timing && e.performance.timing.navigationStart > 0) {
              const e = n.timing.domLoading - n.timing.navigationStart;
              e > 0 && (t = e);
            }
            return t;
          }
          function Ue() {
            return !1 !== r.$W.getConfig('deviceAccess');
          }
          function ke() {
            if (window.navigator.cookieEnabled || document.cookie.length) return !0;
          }
          function De(e, t) {
            if (t < 1) throw new Error(`numRequiredCalls must be a positive number. Got ${t}`);
            let n = 0;
            return function () {
              (n++, n === t && e.apply(this, arguments));
            };
          }
          function _e(e, t) {
            return e.reduce(function (e, n) {
              return ((e[n[t]] = e[n[t]] || []).push(n), e);
            }, {});
          }
          function $e(e) {
            const t = ['banner', 'native', 'video', 'audio'],
              n = ['instream', 'outstream', 'adpod'];
            return !!Object.keys(e).every((e) => t.includes(e)) && (!e.video || !e.video.context || n.includes(e.video.context));
          }
          function xe(e, t, n) {
            return e
              .filter((e) => e.code === t)
              .flatMap((e) => e.bids)
              .filter((e) => e.bidder === n)
              .map((e) => e.params || {});
          }
          const qe = (e, t) => e.getAdUnitPath() === t || e.getSlotElementId() === t;
          function We(e) {
            return (t) => qe(e, t);
          }
          function je(e, t) {
            const n = Object.keys(e.mediaTypes || { banner: 'banner' }).join(', ');
            return `\n    ${e.code} is a ${n} ad unit\n    containing bidders that don't support ${n}: ${t}.\n    This bidder won't fetch demand.\n  `;
          }
          function Ne(e) {
            return Object.fromEntries(
              Object.entries(e).filter((e) => {
                let [t, n] = e;
                return void 0 !== n;
              }),
            );
          }
          function Pe(e, t) {
            return 'object' != typeof e
              ? {}
              : t.reduce((n, r, i) => {
                  if ('function' == typeof r) return n;
                  let o = r;
                  const s = r.match(/^(.+?)\sas\s(.+?)$/i);
                  s && ((r = s[1]), (o = s[2]));
                  let a = e[r];
                  return ('function' == typeof t[i + 1] && (a = t[i + 1](a, n)), void 0 !== a && (n[o] = a), n);
                }, {});
          }
          function Me(e) {
            return e
              ? e
                  .replace(/^\?/, '')
                  .split('&')
                  .reduce((e, t) => {
                    let [n, r] = t.split('=');
                    return (/\[\]$/.test(n) ? ((n = n.replace('[]', '')), (e[n] = e[n] || []), e[n].push(r)) : (e[n] = r || ''), e);
                  }, {})
              : {};
          }
          function Fe(e) {
            return Object.keys(e)
              .map((t) => (Array.isArray(e[t]) ? e[t].map((e) => `${t}[]=${e}`).join('&') : `${t}=${e[t]}`))
              .join('&');
          }
          function Ge(e, t) {
            const n = document.createElement('a');
            t && 'noDecodeWholeURL' in t && t.noDecodeWholeURL ? (n.href = e) : (n.href = decodeURIComponent(e));
            const r = t && 'decodeSearchAsString' in t && t.decodeSearchAsString;
            return {
              href: n.href,
              protocol: (n.protocol || '').replace(/:$/, ''),
              hostname: n.hostname,
              port: +n.port,
              pathname: n.pathname.replace(/^(?!\/)/, '/'),
              search: r ? n.search : y.parseQS(n.search || ''),
              hash: (n.hash || '').replace(/^#/, ''),
              host: n.host || window.location.host,
            };
          }
          function Le(e) {
            return (
              (e.protocol || 'http') +
              '://' +
              (e.host || e.hostname + (e.port ? `:${e.port}` : '')) +
              (e.pathname || '') +
              (e.search ? `?${y.formatQS(e.search || '')}` : '') +
              (e.hash ? `#${e.hash}` : '')
            );
          }
          function ze(e, t) {
            let { checkTypes: n = !1 } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (e === t) return !0;
            if ('object' != typeof e || null === e || 'object' != typeof t || null === t) return !1;
            const r = Array.isArray(e),
              i = Array.isArray(t);
            if (r && i) {
              if (e.length !== t.length) return !1;
              for (let r = 0; r < e.length; r++) if (!ze(e[r], t[r], { checkTypes: n })) return !1;
              return !0;
            }
            if (r || i) return !1;
            if (n && e.constructor !== t.constructor) return !1;
            const o = Object.keys(e),
              s = Object.keys(t);
            if (o.length !== s.length) return !1;
            for (const r of o) {
              if (!Object.prototype.hasOwnProperty.call(t, r)) return !1;
              if (!ze(e[r], t[r], { checkTypes: n })) return !1;
            }
            return !0;
          }
          function He(e) {
            for (let t = 0; t < (arguments.length <= 1 ? 0 : arguments.length - 1); t++) {
              const n = t + 1 < 1 || arguments.length <= t + 1 ? void 0 : arguments[t + 1];
              (0, a.Qd)(n) && Ve(e, n);
            }
            return e;
          }
          function Ve(e, t) {
            if (!(0, a.Qd)(e) || !(0, a.Qd)(t)) return;
            const n = Object.keys(t);
            for (let r = 0; r < n.length; r++) {
              const i = n[r];
              if ('__proto__' === i || 'constructor' === i) continue;
              const o = t[i];
              (0, a.Qd)(o)
                ? (e[i] || (e[i] = {}), Ve(e[i], o))
                : Array.isArray(o)
                  ? Array.isArray(e[i])
                    ? o.forEach((t) => {
                        e[i].some((e) => ze(e, t)) || e[i].push(t);
                      })
                    : (e[i] = [...o])
                  : (e[i] = o);
            }
          }
          function Qe(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            const n = function (e, t) {
              if ((0, a.fp)(Math.imul)) return Math.imul(e, t);
              var n = (4194303 & e) * (t |= 0);
              return (4290772992 & e && (n += ((4290772992 & e) * t) | 0), 0 | n);
            };
            let r = 3735928559 ^ t,
              i = 1103547991 ^ t;
            for (let t, o = 0; o < e.length; o++) ((t = e.charCodeAt(o)), (r = n(r ^ t, 2654435761)), (i = n(i ^ t, 1597334677)));
            return (
              (r = n(r ^ (r >>> 16), 2246822507) ^ n(i ^ (i >>> 13), 3266489909)),
              (i = n(i ^ (i >>> 16), 2246822507) ^ n(r ^ (r >>> 13), 3266489909)),
              (4294967296 * (2097151 & i) + (r >>> 0)).toString()
            );
          }
          function Je(e) {
            try {
              return JSON.parse(e);
            } catch (e) {}
          }
          function Ye(e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return '';
            }
          }
          function Ke(e) {
            let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function (e) {
                    return e;
                  };
            const n = new Map(),
              r = function () {
                const r = t.apply(this, arguments);
                return (n.has(r) || n.set(r, e.apply(this, arguments)), n.get(r));
              };
            return ((r.clear = n.clear.bind(n)), r);
          }
          function Xe() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'd';
            if (['m', 'd'].indexOf(t) < 0) return Date.now();
            const n = e / ('m' === t ? 1440 : 1);
            return Date.now() + (e && e > 0 ? 864e5 * n : 0);
          }
          function Ze(e) {
            return Object.keys(e).map((t) => ({ [t]: e[t] }));
          }
          function et(e, t) {
            Object.entries(t).forEach((t) => {
              let [n, r] = t;
              return e.setAttribute(n, r);
            });
          }
          function tt(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : (e) => e,
              r = 0,
              i = e.length && e.length - 1;
            const o = n(t);
            for (; i - r > 1; ) {
              const t = r + Math.round((i - r) / 2);
              o > n(e[t]) ? (r = t) : (i = t);
            }
            for (; e.length > r && o > n(e[r]); ) r++;
            return r;
          }
          function nt(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Set();
            for (const n in e) {
              const r = e[n],
                i = typeof r;
              if (
                void 0 === r ||
                'function' === i ||
                'symbol' === i ||
                r instanceof RegExp ||
                r instanceof Map ||
                r instanceof Set ||
                r instanceof Date ||
                (null !== r && 'object' === i && r.hasOwnProperty('toJSON'))
              )
                return !0;
              if (null !== r && 'object' === i && r.constructor === Object) {
                if (t.has(r)) return !0;
                if ((t.add(r), nt(r, t))) return !0;
              }
            }
            return !1;
          }
          function rt(e, t) {
            for (let n, r = 0; r < e.length; r++) if (((n = (0, s.A)(e[r], t)), n)) return n;
          }
          function it(e) {
            let t = null;
            try {
              const n = /[-\w]+\.([-\w]+|[-\w]{3,}|[-\w]{1,3}\.[-\w]{2})$/i.exec(e);
              if (null != n && n.length > 0) {
                t = n[0];
                for (let e = 1; e < n.length; e++) n[e].length > t.length && (t = n[e]);
              }
            } catch (e) {
              t = null;
            }
            return t;
          }
          function ot(e, t) {
            (0, a.O8)(e.nurl) && '' !== e.nurl && ((e.nurl = e.nurl.replace(/\${AUCTION_PRICE}/, t)), oe(e.nurl));
          }
          const st = (function () {
            let e;
            return function () {
              if (void 0 !== e) return e;
              try {
                void 0 === window.CompressionStream ? (e = !1) : (new window.CompressionStream('gzip'), (e = !0));
              } catch (t) {
                e = !1;
              }
              return e;
            };
          })();
          async function at(e) {
            'string' != typeof e && (e = JSON.stringify(e));
            const t = new TextEncoder().encode(e),
              n = new Blob([t]).stream().pipeThrough(new window.CompressionStream('gzip')),
              r = await new Response(n).blob(),
              i = await r.arrayBuffer();
            return new Uint8Array(i);
          }
        },
        736(e, t, n) {
          n.d(t, { Tn: () => a, fW: () => o, tW: () => i, tp: () => r, zu: () => s });
          const r = 'prebid',
            i = 'bidder',
            o = 'userId',
            s = 'rtd',
            a = 'analytics';
        },
        765(e, t, n) {
          n.d(t, { k: () => i, rT: () => s, uP: () => o });
          var r = n(3715);
          function i() {
            return r.A.pbGlobal;
          }
          function o() {
            return r.A.defineGlobal;
          }
          function s() {
            return r.A.distUrlBase;
          }
        },
        867(e, t, n) {
          n.d(t, { EN: () => d, gR: () => s });
          var r = n(1933),
            i = n(466);
          function o(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
            if (!e) return e;
            if (/\w+:\/\//.exec(e)) return e;
            let n = t.location.protocol;
            try {
              n = t.top.location.protocol;
            } catch (e) {}
            return /^\/\//.exec(e) ? n + e : `${n}//${e}`;
          }
          function s(e) {
            let t,
              { noLeadingWww: n = !1, noPort: r = !1 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            try {
              t = new URL(o(e));
            } catch (e) {
              return;
            }
            return ((t = r ? t.hostname : t.host), n && t.startsWith('www.') && (t = t.substring(4)), t);
          }
          function a(e) {
            try {
              const t = e.querySelector("link[rel='canonical']");
              if (null !== t) return t.href;
            } catch (e) {}
            return null;
          }
          const d = (function (e) {
            let t,
              n,
              r,
              i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
            return i.top !== i
              ? e
              : function () {
                  const o = a(i.document),
                    s = i.location.href;
                  return ((t === o && s === n) || ((t = o), (n = s), (r = e())), r);
                };
          })(
            ((c = window),
            function () {
              const e = [],
                t = (function (e) {
                  try {
                    if (!e.location.ancestorOrigins) return;
                    return e.location.ancestorOrigins;
                  } catch (e) {}
                })(c),
                n = r.$W.getConfig('maxNestedIframes');
              let d,
                l,
                u,
                g,
                f = !1,
                p = 0,
                m = !1,
                h = !1,
                b = !1;
              do {
                const n = d,
                  r = h;
                let o,
                  s = !1,
                  g = null;
                ((h = !1), (d = d ? d.parent : c));
                try {
                  o = d.location.href || null;
                } catch (e) {
                  s = !0;
                }
                if (s)
                  if (r) {
                    const e = n.context;
                    try {
                      ((g = e.sourceUrl), (l = g), (b = !0), (m = !0), d === c.top && (f = !0), e.canonicalUrl && (u = e.canonicalUrl));
                    } catch (e) {}
                  } else {
                    (0, i.logWarn)('Trying to access cross domain iframe. Continuing without referrer and location');
                    try {
                      const e = n.document.referrer;
                      e && ((g = e), d === c.top && (f = !0));
                    } catch (e) {}
                    (!g && t && t[p - 1] && ((g = t[p - 1]), d === c.top && (b = !0)), g && !m && (l = g));
                  }
                else {
                  if (o && ((g = o), (l = g), (m = !1), d === c.top)) {
                    f = !0;
                    const e = a(d.document);
                    e && (u = e);
                  }
                  d.context && d.context.sourceUrl && (h = !0);
                }
                (e.push(g), p++);
              } while (d !== c.top && p < n);
              e.reverse();
              try {
                g = c.top.document.referrer;
              } catch (e) {}
              const y = f || b ? l : null,
                v = r.$W.getConfig('pageUrl') || u || null;
              let E = r.$W.getConfig('pageUrl') || y || o(v, c);
              return (
                y && y.indexOf('?') > -1 && -1 === E.indexOf('?') && (E = `${E}${y.substring(y.indexOf('?'))}`),
                {
                  reachedTop: f,
                  isAmp: m,
                  numIframes: p - 1,
                  stack: e,
                  topmostLocation: l || null,
                  location: y,
                  canonicalUrl: v,
                  page: E,
                  domain: s(E) || null,
                  ref: g || null,
                  legacy: { reachedTop: f, isAmp: m, numIframes: p - 1, stack: e, referer: l || null, canonicalUrl: v },
                }
              );
            }),
          );
          var c;
        },
        869(e, t, n) {
          n.d(t, { uW: () => T, Yl: () => C, iS: () => U });
          var r = n(3006),
            i = n(5482),
            o = n(7156),
            s = n(1933),
            a = n(1418),
            d = n(8014),
            c = n(2592),
            l = n(9794),
            u = n(466),
            g = n(6665),
            f = n(8928),
            p = n(9236),
            m = n(939);
          const h = 3e3;
          const b = (function () {
            let e,
              t,
              n = (0, m.H)({ monotonic: !0, ttl: () => e, slack: 0 });
            s.$W.getConfig('targetingControls', (r) => {
              (({ lock: t, lockTimeout: e = h } = r.targetingControls ?? {}),
                null == t || Array.isArray(t) ? null == t && i() : (t = [t]),
                n.clear());
            });
            const [r, i] = (() => {
              let e = !1;
              function r(e) {
                let { slot: r } = e;
                t?.forEach((e) => r.getTargeting(e)?.forEach(n.delete));
              }
              return [
                () => {
                  null != t && !e && (0, u.isGptPubadsDefined)() && (googletag.pubads().addEventListener?.('slotRenderEnded', r), (e = !0));
                },
                () => {
                  e && (0, u.isGptPubadsDefined)() && (googletag.pubads().removeEventListener?.('slotRenderEnded', r), (e = !1));
                },
              ];
            })();
            return {
              isLocked: (e) => t?.some((t) => null != e[t] && n.has(e[t])) ?? !1,
              lock(e) {
                (r(), t?.forEach((t) => null != e[t] && n.add(e[t])));
              },
            };
          })();
          var y = [];
          const v = 20,
            E = 'targetingControls.allowTargetingKeys',
            A = 'targetingControls.addTargetingKeys',
            w = `Only one of "${E}" or "${A}" can be set`,
            I = Object.keys(a.xS).map((e) => a.xS[e]),
            T = {
              isBidNotExpired: (e) => e.responseTimestamp + 1e3 * (0, i.cT)(e) > (0, u.timestamp)(),
              isUnusedBid: (e) => e && ((e.status && ![a.tl.RENDERED].includes(e.status)) || !e.status),
              isBidNotLocked: (e) => !b.isLocked(e.adserverTargeting),
            };
          function C(e) {
            return !Object.values(T).some((t) => !t(e));
          }
          const S = (0, c.A_)('sync', function (e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
              r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
              i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : u.sortByHighestCpm;
            if (!r) {
              const r = [],
                o = s.$W.getConfig('sendBidsControl.dealPrioritization'),
                a = (0, u.groupBy)(e, 'adUnitCode');
              return (
                Object.keys(a).forEach((e) => {
                  let s = [];
                  const d = (0, u.groupBy)(a[e], 'bidderCode');
                  Object.keys(d).forEach((e) => {
                    s.push(d[e].reduce(t));
                  });
                  const c = 'object' == typeof n ? n[e] : n;
                  c
                    ? ((s = o ? s.sort(O(!0)) : s.sort((e, t) => t.cpm - e.cpm)), r.push(...s.slice(0, c)))
                    : ((s = s.sort(i)), r.push(...s));
                }),
                r
              );
            }
            return e;
          });
          function O() {
            let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            return function (t, n) {
              return void 0 !== t.adserverTargeting.hb_deal && void 0 === n.adserverTargeting.hb_deal
                ? -1
                : void 0 === t.adserverTargeting.hb_deal && void 0 !== n.adserverTargeting.hb_deal
                  ? 1
                  : e
                    ? n.cpm - t.cpm
                    : n.adserverTargeting.hb_pb - t.adserverTargeting.hb_pb;
            };
          }
          function B(e, t) {
            if (!s.$W.getConfig('enableSendAllBids')) return 0;
            const n = s.$W.getConfig('sendBidsControl.bidLimit'),
              i = new Set(e),
              o = {};
            for (const e of r.n.getAdUnits()) i.has(e.code) && (o[e.code] = e?.bidLimit || t || n);
            return o;
          }
          const R = '1.17.2';
          const U = (function (e) {
            const t = {},
              n = {
                setLatestAuctionForAdUnit(e, n) {
                  t[e] = n;
                },
                resetPresetTargetingAST(e) {
                  r(e).forEach(function (e) {
                    const t = window.apntag.getTag(e);
                    if (t && t.keywords) {
                      const n = Object.keys(t.keywords),
                        r = {};
                      (n.forEach((e) => {
                        y.includes(e.toLowerCase()) || (r[e] = t.keywords[e]);
                      }),
                        window.apntag.modifyTag(e, { keywords: r }));
                    }
                  });
                },
                getAllTargeting(t, n, d) {
                  let c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : p.Vk,
                    l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : u.sortByHighestCpm;
                  d ||= i(c, l);
                  const f = r(t),
                    b = B(f, n),
                    { customKeysByUnit: T, filteredBids: C } = (function (e, t) {
                      const n = [],
                        r = {},
                        i = s.$W.getConfig('targetingControls.alwaysIncludeDeals'),
                        a = s.$W.getConfig('bidTargetingExclusion'),
                        d = t.filter((t) => {
                          const n = e.includes(t.adUnitCode),
                            r = !0 === o.u.get(t.bidderCode, 'allowZeroCpmBids') ? t.cpm >= 0 : t.cpm > 0,
                            s = i && t.dealId;
                          return n && (s || r);
                        });
                      return (
                        d.forEach((e) => {
                          let t = !0;
                          if ('function' == typeof a)
                            try {
                              t = a(e, d);
                            } catch (n) {
                              ((0, u.logWarn)(`Error in bidTargetingExclusion function - excluding bid ${e.bidderCode} [${e.adUnitCode}]`),
                                (t = !1));
                            }
                          t &&
                            (n.push(e),
                            Object.keys(e.adserverTargeting)
                              .filter(
                                (function () {
                                  const e = h();
                                  return function (t) {
                                    return -1 === e.indexOf(t);
                                  };
                                })(),
                              )
                              .forEach((t) => {
                                const n = t.substring(0, 20),
                                  i = r[e.adUnitCode] || {},
                                  o = [e.adserverTargeting[t]];
                                (i[n] ? (i[n] = i[n].concat(o).filter(u.uniques)) : (i[n] = o), (r[e.adUnitCode] = i));
                              }));
                        }),
                        { filteredBids: n, customKeysByUnit: r }
                      );
                    })(f, d);
                  let U = (function (t, n, r) {
                    const i = !0 === s.$W.getConfig('targetingControls.allBidsCustomTargeting'),
                      o = m(t, r)
                        .concat(
                          (function (e) {
                            const t = s.$W.getConfig('targetingControls.alwaysIncludeDeals'),
                              n = s.$W.getConfig('enableSendAllBids');
                            return (function (e) {
                              let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                              const r = I.slice(),
                                i = s.$W.getConfig('targetingControls.allowSendAllBidsTargetingKeys'),
                                o = i ? i.map((e) => a.xS[e]) : r;
                              return e.reduce((e, i) => {
                                if (t || (n && i.dealId)) {
                                  const t = (function (e, t) {
                                    return t.reduce(
                                      (t, n) => (
                                        e.adserverTargeting[n] &&
                                          t.push({ [`${n}_${e.bidderCode}`.substring(0, v)]: [e.adserverTargeting[n]] }),
                                        t
                                      ),
                                      [],
                                    );
                                  })(
                                    i,
                                    r.filter((e) => void 0 !== i.adserverTargeting[e] && (n || -1 !== o.indexOf(e))),
                                  );
                                  t && e.push({ [i.adUnitCode]: t });
                                }
                                return e;
                              }, []);
                            })(e, n, t);
                          })(t),
                        )
                        .concat(
                          (function (t) {
                            function n(e) {
                              return e?.[a.iD.ADSERVER_TARGETING];
                            }
                            function r(e) {
                              const t = n(e);
                              return Object.keys(t).map(function (e) {
                                return (
                                  (0, g.O8)(t[e]) && (t[e] = t[e].split(',').map((e) => e.trim())),
                                  (0, g.cy)(t[e]) || (t[e] = [t[e]]),
                                  { [e]: t[e] }
                                );
                              });
                            }
                            return e
                              .getAdUnits()
                              .filter((e) => t.includes(e.code) && n(e))
                              .reduce((e, t) => {
                                const n = r(t);
                                return (n && e.push({ [t.code]: n }), e);
                              }, []);
                          })(r),
                        )
                        .concat(
                          (function (e) {
                            let t = s.$W.getConfig('targetingControls.version');
                            return !1 === t ? [] : e.map((e) => ({ [e]: [{ [a.xS.VERSION]: [t ?? R] }] }));
                          })(r),
                        );
                    i &&
                      o.push(
                        ...(function (e, t) {
                          return e.reduce((e, n) => {
                            const r = Object.assign({}, n),
                              i = t[r.adUnitCode],
                              o = [];
                            return (
                              i &&
                                Object.keys(i).forEach((e) => {
                                  e && i[e] && o.push({ [e]: i[e] });
                                }),
                              e.push({ [r.adUnitCode]: o }),
                              e
                            );
                          }, []);
                        })(t, n),
                      );
                    return (
                      o.forEach((e) => {
                        !(function (e) {
                          Object.keys(e).forEach((t) => {
                            e[t].forEach((e) => {
                              const t = Object.keys(e);
                              -1 === y.indexOf(t[0]) && (y = t.concat(y));
                            });
                          });
                        })(e);
                      }),
                      o
                    );
                  })(S(C, c, b, void 0, l), T, f);
                  const k = Object.keys(Object.assign({}, a.Zh));
                  let D = s.$W.getConfig(E);
                  const _ = s.$W.getConfig(A);
                  if (null != _ && null != D) throw new Error(w);
                  ((D = null != _ ? k.concat(_) : D || k),
                    Array.isArray(D) &&
                      D.length > 0 &&
                      (U = (function (e, t) {
                        const n = Object.assign({}, a.xS),
                          r = Object.keys(a.xS),
                          i = {};
                        ((0, u.logInfo)(`allowTargetingKeys - allowed keys [ ${t.map((e) => n[e]).join(', ')} ]`),
                          e.forEach((e) => {
                            const o = Object.keys(e)[0],
                              s = e[o].filter((e) => {
                                const o = Object.keys(e)[0],
                                  s =
                                    0 === r.filter((e) => 0 === o.indexOf(n[e])).length ||
                                    t.find((e) => {
                                      const t = n[e];
                                      return 0 === o.indexOf(t);
                                    });
                                return ((i[o] = !s), s);
                              });
                            e[o] = s;
                          }));
                        const o = Object.keys(i).filter((e) => i[e]);
                        (0, u.logInfo)(`allowTargetingKeys - removed keys [ ${o.join(', ')} ]`);
                        const s = e.filter((e) => e[Object.keys(e)[0]].length > 0);
                        return s;
                      })(U, D)));
                  let $ = (function (e) {
                    return e
                      .map((e) => ({
                        [Object.keys(e)[0]]: e[Object.keys(e)[0]]
                          .map((e) => ({ [Object.keys(e)[0]]: e[Object.keys(e)[0]].join(',') }))
                          .reduce((e, t) => Object.assign(t, e), {}),
                      }))
                      .reduce(function (e, t) {
                        var n = Object.keys(t)[0];
                        return ((e[n] = Object.assign({}, e[n], t[n])), e);
                      }, {});
                  })(U);
                  const x = s.$W.getConfig('targetingControls.auctionKeyMaxChars');
                  return (
                    x &&
                      ((0, u.logInfo)(
                        `Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ${x} characters.  Running checks on auction keys...`,
                      ),
                      ($ = (function (e, t) {
                        const n = (0, g.Go)(e),
                          r = Object.keys(n)
                            .map((e) => ({ adUnitCode: e, adserverTargeting: n[e] }))
                            .sort(O());
                        return r.reduce(function (e, r, i, o) {
                          let s =
                            ((a = r.adserverTargeting),
                            Object.keys(a).reduce(function (e, t) {
                              return (e += `${t}%3d${encodeURIComponent(a[t])}%26`);
                            }, ''));
                          var a;
                          i + 1 === o.length && (s = s.slice(0, -3));
                          const d = r.adUnitCode,
                            c = s.length;
                          return (
                            c <= t
                              ? ((t -= c),
                                (0, u.logInfo)(
                                  `AdUnit '${d}' auction keys comprised of ${c} characters.  Deducted from running threshold; new limit is ${t}`,
                                  n[d],
                                ),
                                (e[d] = n[d]))
                              : (0, u.logWarn)(
                                  `The following keys for adUnitCode '${d}' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ${c}, the current allotted amount was ${t}.\n`,
                                  n[d],
                                ),
                            i + 1 === o.length &&
                              0 === Object.keys(e).length &&
                              (0, u.logError)(
                                'No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting.',
                              ),
                            e
                          );
                        }, {});
                      })($, x))),
                    f.forEach((e) => {
                      ($[e] || ($[e] = {}), 1 === Object.keys($[e]).length && null != $[e][a.xS.VERSION] && delete $[e][a.xS.VERSION]);
                    }),
                    $
                  );
                },
                setTargetingForGPT: (0, c.A_)(
                  'sync',
                  function (t, r) {
                    const i = n.getAllTargeting(t),
                      o = Object.fromEntries(y.map((e) => [e, null]));
                    (Object.entries(
                      (function (e, t) {
                        return (
                          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => window.googletag.pubads().getSlots()
                        )().reduce(
                          (e, n) => {
                            const r = (0, g.fp)(t) && t(n);
                            return (
                              Object.keys(e)
                                .filter((0, g.fp)(r) ? r : (0, u.isAdUnitCodeMatchingSlot)(n))
                                .forEach((t) => e[t].push(n)),
                              e
                            );
                          },
                          Object.fromEntries(e.map((e) => [e, []])),
                        );
                      })(Object.keys(i), r),
                    ).forEach((e) => {
                      let [t, n] = e;
                      n.forEach((e) => {
                        (Object.keys(i[t]).forEach((e) => {
                          let n = i[t][e];
                          ('string' == typeof n && -1 !== n.indexOf(',') && (n = n.split(',')), (i[t][e] = n));
                        }),
                          (0, u.logMessage)(`Attempting to set targeting-map for slot: ${e.getSlotElementId()} with targeting-map:`, i[t]),
                          e.updateTargetingFromMap(Object.assign({}, o, i[t])),
                          b.lock(i[t]));
                      });
                    }),
                      Object.keys(i).forEach((t) => {
                        Object.keys(i[t]).forEach((n) => {
                          'hb_adid' === n && e.setStatusForBids(i[t][n], a.tl.BID_TARGETING_SET);
                        });
                      }),
                      n.targetingDone(i),
                      d.Ic(a.qY.SET_TARGETING, i));
                  },
                  'setTargetingForGPT',
                ),
                targetingDone: (0, c.A_)(
                  'sync',
                  function (e) {
                    return e;
                  },
                  'targetingDone',
                ),
                getWinningBids(e, t) {
                  let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : p.Vk,
                    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : u.sortByHighestCpm;
                  const a = t || i(n, s),
                    d = r(e);
                  return a
                    .filter((e) => d.includes(e.adUnitCode))
                    .filter((e) => (!0 === o.u.get(e.bidderCode, 'allowZeroCpmBids') ? e.cpm >= 0 : e.cpm > 0))
                    .map((e) => e.adUnitCode)
                    .filter(u.uniques)
                    .map((e) => a.filter((t) => (t.adUnitCode === e ? t : null)).reduce(p.Vk));
                },
                setTargetingForAst(e) {
                  const t = n.getAllTargeting(e);
                  try {
                    n.resetPresetTargetingAST(e);
                  } catch (e) {
                    (0, u.logError)('unable to reset targeting for AST' + e);
                  }
                  Object.keys(t).forEach((e) => {
                    (b.lock(t[e]),
                      Object.keys(t[e]).forEach((n) => {
                        if (
                          ((0, u.logMessage)(`Attempting to set targeting for targetId: ${e} key: ${n} value: ${t[e][n]}`),
                          (0, g.O8)(t[e][n]) || (0, g.cy)(t[e][n]))
                        ) {
                          const r = {},
                            i = /pt[0-9]/;
                          (n.search(i) < 0 ? (r[n.toUpperCase()] = t[e][n]) : (r[n] = t[e][n]),
                            window.apntag.setKeywords(e, r, { overrideKeyValue: !0 }));
                        }
                      }));
                  });
                },
                isApntagDefined() {
                  if (window.apntag && (0, g.fp)(window.apntag.setKeywords)) return !0;
                },
              };
            function r(t) {
              return 'string' == typeof t ? [t] : (0, g.cy)(t) ? t : e.getAdUnitCodes() || [];
            }
            function i() {
              let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p.Bq,
                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
              const i = e.getBidsReceived().reduce((e, n) => {
                const r = s.$W.getConfig('useBidCache'),
                  i = s.$W.getConfig('bidCacheFilterFunction'),
                  o = t[n.adUnitCode] === n.auctionId,
                  a = !(r && !o && 'function' == typeof i) || !!i(n);
                return (
                  (r || o) && a && n?.video?.context !== l.LM && C(n) && ((n.latestTargetedAuctionId = t[n.adUnitCode]), e.push(n)),
                  e
                );
              }, []);
              return S(i, n, void 0, void 0, r);
            }
            function m(e, t) {
              const r = n.getWinningBids(t, e),
                i = h();
              return r.map((e) => ({
                [e.adUnitCode]: Object.keys(e.adserverTargeting)
                  .filter((t) => void 0 === e.sendStandardTargeting || e.sendStandardTargeting || -1 === i.indexOf(t))
                  .reduce((t, n) => {
                    const r = [e.adserverTargeting[n]],
                      i = { [n.substring(0, v)]: r };
                    if (n === a.xS.DEAL) {
                      const o = `${n}_${e.bidderCode}`.substring(0, v),
                        s = { [o]: r };
                      return [...t, i, s];
                    }
                    return [...t, i];
                  }, []),
              }));
            }
            function h() {
              return e
                .getStandardBidderAdServerTargeting()
                .map((e) => e.key)
                .concat(I)
                .filter(u.uniques);
            }
            return (
              s.$W.getConfig('targetingControls', function (e) {
                null != (0, f.A)(e, E) && null != (0, f.A)(e, A) && (0, u.logError)(w);
              }),
              n
            );
          })(r.n);
        },
        939(e, t, n) {
          n.d(t, { H: () => l });
          var r = n(3064),
            i = n(466);
          let o = null,
            s = 0,
            a = [];
          function d() {
            document.hidden
              ? (o = Date.now())
              : ((s += Date.now() - (o ?? 0)),
                (o = null),
                a.forEach((e) => {
                  let { callback: t, startTime: n, setTimerId: r } = e;
                  return r(c(t, s - n)());
                }),
                (a = []));
          }
          function c(e, t) {
            const n = s;
            let r = setTimeout(() => {
              s === n && null == o
                ? e()
                : null != o
                  ? a.push({
                      callback: e,
                      startTime: n,
                      setTimerId(e) {
                        r = e;
                      },
                    })
                  : (r = c(e, s - n)());
            }, t);
            return () => r;
          }
          function l() {
            let {
              startTime: e = i.timestamp,
              ttl: t = () => null,
              monotonic: n = !1,
              slack: o = 5e3,
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const s = new Map(),
              a = [],
              d = [],
              l = n
                ? (e) => d.push(e)
                : (e) =>
                    d.splice(
                      (0, i.binarySearch)(d, e, (e) => e.expiry),
                      0,
                      e,
                    );
            let u, g;
            function f() {
              if ((g && clearTimeout(g), d.length > 0)) {
                const e = (0, i.timestamp)();
                ((u = Math.max(e, d[0].expiry + o)),
                  (g = c(() => {
                    const e = (0, i.timestamp)();
                    let t = 0;
                    for (const n of d) {
                      if (n.expiry > e) break;
                      (a.forEach((e) => {
                        try {
                          e(n.item);
                        } catch (e) {
                          (0, i.logError)(e);
                        }
                      }),
                        s.delete(n.item),
                        t++);
                    }
                    (d.splice(0, t), (g = null), f());
                  }, u - e)));
              } else g = null;
            }
            function p(n) {
              const i = {},
                s = m;
              let a;
              const [d, c] = Object.entries({ start: e, delta: t }).map((e) => {
                  let t,
                    [d, c] = e;
                  return function () {
                    const e = (t = {});
                    r.U9.resolve(c(n)).then((n) => {
                      e === t &&
                        ((i[d] = n),
                        s === m && null != i.start && null != i.delta && ((a = i.start + i.delta), l(p), (null == g || u > a + o) && f()));
                    });
                  };
                }),
                p = {
                  item: n,
                  refresh: c,
                  get expiry() {
                    return a;
                  },
                };
              return (d(), c(), p);
            }
            let m = {};
            return {
              [Symbol.iterator]: () => s.keys(),
              add(e) {
                !s.has(e) && s.set(e, p(e));
              },
              has: (e) => s.has(e),
              delete(e) {
                const t = s.get(e);
                if (t)
                  for (let e = 0; e < d.length && d[e].expiry <= t.expiry; e++)
                    if (d[e] === t) {
                      d.splice(e, 1);
                      break;
                    }
                return s.delete(e);
              },
              clear() {
                ((d.length = 0), f(), s.clear(), (m = {}));
              },
              toArray: () => Array.from(s.keys()),
              refresh() {
                ((d.length = 0), f());
                for (const e of s.values()) e.refresh();
              },
              onExpiry: (e) => (
                a.push(e),
                () => {
                  const t = a.indexOf(e);
                  t >= 0 && a.splice(t, 1);
                }
              ),
            };
          }
          document.addEventListener('visibilitychange', d);
        },
        1124(e, t, n) {
          n.d(t, { j: () => l, q: () => g });
          var r = n(466),
            i = n(1933);
          const o = { buckets: [{ max: 5, increment: 0.5 }] },
            s = { buckets: [{ max: 20, increment: 0.1 }] },
            a = { buckets: [{ max: 20, increment: 0.01 }] },
            d = {
              buckets: [
                { max: 3, increment: 0.01 },
                { max: 8, increment: 0.05 },
                { max: 20, increment: 0.5 },
              ],
            },
            c = {
              buckets: [
                { max: 5, increment: 0.05 },
                { max: 10, increment: 0.1 },
                { max: 20, increment: 0.5 },
              ],
            };
          function l(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
              r = parseFloat(e);
            return (
              isNaN(r) && (r = ''),
              {
                low: '' === r ? '' : u(e, o, n),
                med: '' === r ? '' : u(e, s, n),
                high: '' === r ? '' : u(e, a, n),
                auto: '' === r ? '' : u(e, c, n),
                dense: '' === r ? '' : u(e, d, n),
                custom: '' === r ? '' : u(e, t, n),
              }
            );
          }
          function u(e, t, n) {
            let o = '';
            if (!g(t)) return o;
            const s = t.buckets.reduce((e, t) => (e.max > t.max ? e : t), { max: 0 });
            let a = 0;
            const d = t.buckets.find((t) => {
              if (e > s.max * n) {
                let e = t.precision;
                (void 0 === e && (e = 2), (o = (t.max * n).toFixed(e)));
              } else {
                if (e <= t.max * n && e >= a * n) return ((t.min = a), t);
                a = t.max;
              }
            });
            return (
              d &&
                (o = (function (e, t, n) {
                  const o = void 0 !== t.precision ? t.precision : 2,
                    s = t.increment * n,
                    a = t.min * n;
                  let d = Math.floor;
                  const c = i.$W.getConfig('cpmRoundingFunction');
                  'function' == typeof c && (d = c);
                  const l = Math.pow(10, o + 2),
                    u = (e * l - a * l) / (s * l);
                  let g, f;
                  try {
                    g = d(u) * s + a;
                  } catch (e) {
                    f = !0;
                  }
                  (f || 'number' != typeof g) &&
                    ((0, r.logWarn)('Invalid rounding function passed in config'), (g = Math.floor(u) * s + a));
                  return ((g = Number(g.toFixed(10))), g.toFixed(o));
                })(e, d, n)),
              o
            );
          }
          function g(e) {
            if ((0, r.isEmpty)(e) || !e.buckets || !Array.isArray(e.buckets)) return !1;
            let t = !0;
            return (
              e.buckets.forEach((e) => {
                (e.max && e.increment) || (t = !1);
              }),
              t
            );
          }
        },
        1186(e, t, n) {
          n.d(t, { HN: () => H, NE: () => $, UZ: () => R, mX: () => x, v8: () => P });
          var r = n(466),
            i = n(6665),
            o = n(1124),
            s = n(356),
            a = n(1640),
            d = n(7464),
            c = n(1933),
            l = n(3391),
            u = n(2592),
            g = n(6220),
            f = n(9794),
            p = n(3006),
            m = n(7156),
            h = n(8014),
            b = n(8668),
            y = n(1418),
            v = n(3064),
            E = n(7841),
            A = n(7459),
            w = n(1748),
            I = n(939),
            T = n(5482),
            C = n(3202),
            S = n(5808),
            O = n(736);
          const { syncUsers: B } = l.zt,
            R = 'completed';
          h.on(y.qY.BID_ADJUSTMENT, function (e) {
            !(function (e) {
              const t = (0, A.y)(e.cpm, e);
              t >= 0 && (e.cpm = t);
            })(e);
          });
          const U = {},
            k = {},
            D = [],
            _ = (0, w.m)();
          const $ = (0, u.A_)('sync', (e) => {});
          function x(e) {
            let { adUnits: t, adUnitCodes: n, callback: i, cbTimeout: l, labels: u, auctionId: m, ortb2Fragments: A, metrics: w } = e;
            w = (0, E.BO)(w);
            const C = t,
              S = u,
              O = n,
              x = m || (0, r.generateUUID)(),
              L = l,
              z = new Set(),
              H = (0, v.v6)(),
              V = (0, v.v6)();
            let J = [],
              Y = i,
              K = [];
            const X = (0, I.H)({
              startTime: (e) => e.responseTimestamp,
              ttl: (e) => (null == (0, T.S9)() ? null : 1e3 * Math.max((0, T.S9)(), e.ttl)),
            });
            let Z,
              ee,
              te,
              ne,
              re = [],
              ie = [],
              oe = [];
            function se() {
              return {
                auctionId: x,
                timestamp: Z,
                auctionEnd: ee,
                auctionStatus: ne,
                adUnits: C,
                adUnitCodes: O,
                labels: S,
                bidderRequests: K,
                noBids: re,
                bidsReceived: X.toArray(),
                bidsRejected: J,
                winningBids: ie,
                timeout: L,
                metrics: w,
                seatNonBids: oe,
              };
            }
            function ae(e) {
              if ((e ? h.Ic(y.qY.AUCTION_TIMEOUT, se()) : clearTimeout(te), void 0 === ee)) {
                let n = [];
                (e &&
                  ((0, r.logMessage)(`Auction ${x} timedOut`),
                  (n = K.filter((e) => !z.has(e.bidderRequestId)).flatMap((e) => e.bids)),
                  n.length && h.Ic(y.qY.BID_TIMEOUT, n)),
                  (ne = R),
                  (ee = Date.now()),
                  w.checkpoint('auctionEnd'),
                  w.timeBetween('requestBids', 'auctionEnd', 'requestBids.total'),
                  w.timeBetween('callBids', 'auctionEnd', 'requestBids.callBids'),
                  H.resolve(),
                  h.Ic(y.qY.AUCTION_END, se()),
                  N(C, m, function () {
                    try {
                      if (null != Y) {
                        const t = X.toArray()
                          .filter((e) => O.includes(e.adUnitCode))
                          .reduce(Q, {});
                        (Y.apply(_, [t, e, x]), (Y = null));
                      }
                    } catch (e) {
                      (0, r.logError)('Error executing bidsBackHandler', null, e);
                    } finally {
                      n.length && b.Ay.callTimedOutBidders(t, n, L);
                      const e = c.$W.getConfig('userSync') ?? {};
                      e.enableOverride || B(e.syncDelay);
                    }
                  }));
              }
            }
            function de() {
              (c.$W.resetBidder(), (0, r.logInfo)(`Bids Received for Auction with id: ${x}`, X.toArray()), (ne = R), ae(!1));
            }
            function ce(e) {
              z.add(e);
            }
            function le(e) {
              e.forEach((e) => {
                var t;
                ((t = e), (K = K.concat(t)));
              });
              const t = {},
                n = {
                  bidRequests: e,
                  run: () => {
                    ($(this), (te = setTimeout(() => ae(!0), L)), (ne = 'inProgress'), h.Ic(y.qY.AUCTION_INIT, se()));
                    const n = (function (e, t) {
                      let { index: n = p.n.index } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = 0,
                        l = !1;
                      const u = new Set(),
                        m = {};
                      function b() {
                        (i--, l && 0 === i && e());
                      }
                      function E(e, t, n) {
                        return (
                          (m[t.requestId] = !0),
                          (function (e, t) {
                            let { index: n = p.n.index } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            const r = n.getAdUnit(e);
                            (F(e, { index: n }),
                              Object.assign(e, { cpm: parseFloat(e.cpm) || 0, bidder: e.bidder || e.bidderCode, adUnitCode: t }),
                              null != r?.ttlBuffer && (e.ttlBuffer = r.ttlBuffer));
                          })(t, e),
                          i++,
                          n(b)
                        );
                      }
                      function A(e, i) {
                        E(e, i, (e) => {
                          const l = (function (e) {
                            let { index: t = p.n.index } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            h.Ic(y.qY.BID_ADJUSTMENT, e);
                            const n = t.getAdUnit(e);
                            e.instl = 1 === n?.ortb2Imp?.instl;
                            const r = t.getBidRequest(e)?.renderer || n.renderer,
                              i = e.mediaType,
                              s = t.getMediaTypes(e),
                              a = s && s[i];
                            var l = a && a.renderer,
                              u = null;
                            !l || !l.render || (!0 === l.backupOnly && e.renderer)
                              ? !r || !r.render || (!0 === r.backupOnly && e.renderer) || (u = r)
                              : (u = l);
                            u &&
                              ((e.renderer = d.A4.install({ url: u.url, config: u.options, renderNow: null == u.url })),
                              e.renderer.setRender(u.render));
                            const g = G(e.mediaType, s, c.$W.getConfig('mediaTypePriceGranularity')),
                              f = (0, o.j)(
                                e.cpm,
                                'object' == typeof g ? g : c.$W.getConfig('customPriceBucket'),
                                c.$W.getConfig('currency.granularityMultiplier'),
                              );
                            return (
                              (e.pbLg = f.low),
                              (e.pbMg = f.med),
                              (e.pbHg = f.high),
                              (e.pbAg = f.auto),
                              (e.pbDg = f.dense),
                              (e.pbCg = f.custom),
                              e
                            );
                          })(i);
                          (h.Ic(y.qY.BID_ACCEPTED, l),
                            l.mediaType === f.G_ || l.mediaType === f.FY
                              ? (function (e, t, n) {
                                  let { index: i = p.n.index } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                                    o = !0;
                                  const s = i.getMediaTypes({ requestId: t.originalRequestId || t.requestId, adUnitId: t.adUnitId })?.video,
                                    d = s && s?.context,
                                    l = s && s?.useCacheKey,
                                    { useLocal: u, url: f, ignoreBidderCacheKey: m } = c.$W.getConfig('cache') || {};
                                  u
                                    ? (0, a.Sb)(t)
                                    : f &&
                                      (l || d !== g.H6) &&
                                      (!t.videoCacheKey || m
                                        ? ((o = !1), M(e, t, n, s))
                                        : t.vastUrl ||
                                          ((0, r.logError)('videoCacheKey specified but not required vastUrl for video bid'), (o = !1)));
                                  o && (P(e, t), n());
                                })(t, l, e)
                              : ((0, s.l6)(l) && (0, s.gs)(l, n.getAdUnit(l)), P(t, l), e()));
                        });
                      }
                      function w(e, n, i) {
                        return E(e, n, (e) => {
                          ((n.rejectionReason = i),
                            (0, r.logWarn)(`Bid from ${n.bidder || 'unknown bidder'} was rejected: ${i}`, n),
                            h.Ic(y.qY.BID_REJECTED, n),
                            t.addBidRejected(n),
                            e());
                        });
                      }
                      function I() {
                        const n = this;
                        let o = t.getBidRequests();
                        const s = c.$W.getConfig('auctionOptions');
                        if ((u.add(n), s && !(0, r.isEmpty)(s))) {
                          const e = s.secondaryBidders;
                          e && !o.every((t) => e.includes(t.bidderCode)) && (o = o.filter((t) => !e.includes(t.bidderCode)));
                        }
                        ((l = o.every((e) => u.has(e))),
                          n.bids.forEach((e) => {
                            m[e.bidId] || (F(e), t.addNoBid(e), h.Ic(y.qY.NO_BID, e));
                          }),
                          l && 0 === i && e());
                      }
                      return {
                        addBidResponse: (function () {
                          function e(e, t) {
                            q.call(
                              { dispatch: A },
                              e,
                              t,
                              (() => {
                                let n = !1;
                                return (r) => {
                                  n || (w(e, t, r), (n = !0));
                                };
                              })(),
                            );
                          }
                          return ((e.reject = w), e);
                        })(),
                        adapterDone: function () {
                          W(v.U9.resolve()).finally(() => I.call(this));
                        },
                      };
                    })(de, this);
                    (b.Ay.callBids(
                      C,
                      e,
                      n.addBidResponse,
                      n.adapterDone,
                      {
                        request(e, n) {
                          (l(U, n), l(t, e), k[e] || (k[e] = { SRA: !0, origin: n }), t[e] > 1 && (k[e].SRA = !1));
                        },
                        done(e) {
                          (U[e]--, D[0] && i(D[0]) && D.shift());
                        },
                      },
                      L,
                      ce,
                      A,
                    ),
                      V.resolve());
                  },
                };
              function i(e) {
                let t = !0;
                const n = c.$W.getConfig('maxRequestsPerOrigin') || 4;
                return (
                  e.bidRequests.some((e) => {
                    let r = 1;
                    const i = void 0 !== e.src && e.src === y.RW.SRC ? 's2s' : e.bidderCode;
                    return (
                      !(e.alwaysHasCapacity && !c.$W.getConfig('forceMaxRequestsPerOrigin')) &&
                      (k[i] && (!1 === k[i].SRA && (r = Math.min(e.bids.length, n)), U[k[i].origin] + r > n && (t = !1)), !t)
                    );
                  }),
                  t && e.run(),
                  t
                );
              }
              function l(e, t) {
                void 0 === e[t] ? (e[t] = 1) : e[t]++;
              }
              i(n) || ((0, r.logWarn)('queueing auction due to limited endpoint capacity'), D.push(n));
            }
            return (
              (0, T.lc)(() => X.refresh()),
              h.on(y.qY.SEAT_NON_BID, (e) => {
                var t;
                e.auctionId === x && ((t = e.seatnonbid), (oe = oe.concat(t)));
              }),
              {
                addBidReceived: function (e) {
                  X.add(e);
                },
                addBidRejected: function (e) {
                  J = J.concat(e);
                },
                addNoBid: function (e) {
                  re = re.concat(e);
                },
                callBids: function () {
                  ((ne = 'started'), (Z = Date.now()));
                  const e = w.measureTime('requestBids.makeRequests', () => b.Ay.makeBidRequests(C, Z, x, L, S, A, w));
                  ((0, r.logInfo)(`Bids Requested for Auction with id: ${x}`, e),
                    w.checkpoint('callBids'),
                    e.length < 1
                      ? ((0, r.logWarn)('No valid bid requests returned for auction'), de())
                      : j.call({ dispatch: le, context: this }, e));
                },
                addWinningBid: function (e) {
                  ((ie = ie.concat(e)), b.Ay.callBidWonBidder(e.adapterCode || e.bidder, e, t), e.deferBilling || b.Ay.triggerBilling(e));
                },
                setBidTargeting: function (e) {
                  b.Ay.callSetTargetingBidder(e.adapterCode || e.bidder, e);
                },
                getWinningBids: () => ie,
                getAuctionStart: () => Z,
                getAuctionEnd: () => ee,
                getTimeout: () => L,
                getAuctionId: () => x,
                getAuctionStatus: () => ne,
                getAdUnits: () => C,
                getAdUnitCodes: () => O,
                getBidRequests: () => K,
                getBidsReceived: () => X.toArray(),
                getNoBids: () => re,
                getNonBids: () => oe,
                getFPD: () => A,
                getMetrics: () => w,
                end: H.promise,
                requestsDone: V.promise,
                getProperties: se,
              }
            );
          }
          const q = (0, u.u2)(
              (0, u.A_)(
                'async',
                function (e, t, n) {
                  !(function (e) {
                    const t = c.$W.getConfig('maxBid');
                    return !t || !e.cpm || t >= Number(e.cpm);
                  })(t)
                    ? n(y.Tf.PRICE_TOO_HIGH)
                    : (0, C.io)(
                          S.it,
                          (0, b.sc)(O.tW, t.bidder || t.bidderCode, {
                            bid: t,
                            ortb2: p.n.index.getOrtb2(t),
                            adUnit: p.n.index.getAdUnit(t),
                          }),
                        )
                      ? this.dispatch.call(null, e, t)
                      : n(y.Tf.BIDDER_DISALLOWED);
                },
                'addBidResponse',
              ),
            ),
            W = (0, u.A_)('sync', (e) => e, 'responsesReady'),
            j = (0, u.A_)(
              'sync',
              function (e) {
                this.dispatch.call(this.context, e);
              },
              'addBidderRequests',
            ),
            N = (0, u.A_)(
              'async',
              function (e, t, n) {
                n && n();
              },
              'bidsBackCallback',
            );
          function P(e, t) {
            (!(function (e) {
              let t;
              const n = !0 === m.u.get(e.bidderCode, 'allowZeroCpmBids') ? e.cpm >= 0 : e.cpm > 0;
              e.bidderCode &&
                (n || e.dealId) &&
                (t = (function (e, t) {
                  let { index: n = p.n.index } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                  if (!t) return {};
                  const r = n.getBidRequest(t);
                  var i = {};
                  const o = H(t.mediaType, e);
                  (V(i, o, t, r),
                    e &&
                      m.u.getOwn(e, y.iD.ADSERVER_TARGETING) &&
                      (V(i, m.u.ownSettingsFor(e), t, r), (t.sendStandardTargeting = m.u.get(e, 'sendStandardTargeting'))));
                  return i;
                })(e.bidderCode, e));
              e.adserverTargeting = Object.assign(e.adserverTargeting || {}, t);
            })(t),
              (0, E.BO)(t.metrics).timeSince('addBidResponse', 'addBidResponse.total'),
              e.addBidReceived(t),
              h.Ic(y.qY.BID_RESPONSE, t));
          }
          const M = (0, u.A_)(
            'async',
            function (e, t, n, r) {
              (0, a.X5)(e, t, n);
            },
            'callPrebidCache',
          );
          function F(e) {
            let { index: t = p.n.index } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n = t.getBidderRequest(e),
              i = (n && n.start) || e.requestTimestamp;
            (Object.assign(e, { responseTimestamp: e.responseTimestamp || (0, r.timestamp)(), requestTimestamp: e.requestTimestamp || i }),
              (e.timeToRespond = e.responseTimestamp - e.requestTimestamp));
          }
          function G(e, t, n) {
            if (e && n) {
              if (e === f.G_) {
                const e = t?.[f.G_]?.context ?? 'instream';
                if (n[`${f.G_}-${e}`]) return n[`${f.G_}-${e}`];
              }
              return n[e];
            }
          }
          const L = (e) => (t) => {
            const n =
              e ||
              (function (e) {
                let { index: t = p.n.index } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const n = G(e.mediaType, t.getMediaTypes(e), c.$W.getConfig('mediaTypePriceGranularity'));
                return 'string' == typeof e.mediaType && n ? ('string' == typeof n ? n : 'custom') : c.$W.getConfig('priceGranularity');
              })(t);
            return n === y.UE.AUTO
              ? t.pbAg
              : n === y.UE.DENSE
                ? t.pbDg
                : n === y.UE.LOW
                  ? t.pbLg
                  : n === y.UE.MEDIUM
                    ? t.pbMg
                    : n === y.UE.HIGH
                      ? t.pbHg
                      : n === y.UE.CUSTOM
                        ? t.pbCg
                        : void 0;
          };
          function z(e, t) {
            return {
              key: e,
              val:
                'function' == typeof t
                  ? function (e, n) {
                      return t(e, n);
                    }
                  : function (e) {
                      return e[t];
                    },
            };
          }
          function H(e, t) {
            const n = Object.assign({}, m.u.settingsFor(null));
            if (
              (n[y.iD.ADSERVER_TARGETING] ||
                (n[y.iD.ADSERVER_TARGETING] = [
                  z(y.xS.BIDDER, 'bidderCode'),
                  z(y.xS.AD_ID, 'adId'),
                  z(y.xS.PRICE_BUCKET, L()),
                  z(y.xS.SIZE, 'size'),
                  z(y.xS.DEAL, 'dealId'),
                  z(y.xS.SOURCE, 'source'),
                  z(y.xS.FORMAT, 'mediaType'),
                  z(y.xS.ADOMAIN, (e) =>
                    e.meta && e.meta.advertiserDomains && e.meta.advertiserDomains.length > 0 ? [e.meta.advertiserDomains].flat()[0] : '',
                  ),
                  z(y.xS.ACAT, (e) => {
                    const t = e?.meta?.primaryCatId;
                    return Array.isArray(t) ? t[0] || '' : t || '';
                  }),
                  z(y.xS.DSP, (e) =>
                    e.meta && (e.meta.networkId || e.meta.networkName) ? e?.meta?.networkName || e?.meta?.networkId : '',
                  ),
                  z(y.xS.CRID, (e) => (e.creativeId ? e.creativeId : '')),
                ]),
              'video' === e)
            ) {
              const e = n[y.iD.ADSERVER_TARGETING].slice();
              if (
                ((n[y.iD.ADSERVER_TARGETING] = e),
                [y.xS.UUID, y.xS.CACHE_ID].forEach((t) => {
                  void 0 === e.find((e) => e.key === t) && e.push(z(t, 'videoCacheKey'));
                }),
                c.$W.getConfig('cache.url') && (!t || !1 !== m.u.get(t, 'sendStandardTargeting')))
              ) {
                const t = (0, r.parseUrl)(c.$W.getConfig('cache.url'));
                void 0 === e.find((e) => e.key === y.xS.CACHE_HOST) &&
                  e.push(
                    z(y.xS.CACHE_HOST, function (e) {
                      return e?.adserverTargeting?.[y.xS.CACHE_HOST] || t.hostname;
                    }),
                  );
              }
            }
            return n;
          }
          function V(e, t, n, o) {
            var s = t[y.iD.ADSERVER_TARGETING];
            return (
              (n.size = n.getSize()),
              (s || []).forEach(function (s) {
                var a = s.key,
                  d = s.val;
                if ((e[a] && (0, r.logWarn)('The key: ' + a + ' is being overwritten'), (0, i.fp)(d)))
                  try {
                    d = d(n, o);
                  } catch (e) {
                    (0, r.logError)('bidmanager', 'ERROR', e);
                  }
                ((void 0 === t.suppressEmptyKeys || !0 !== t.suppressEmptyKeys) &&
                  a !== y.xS.DEAL &&
                  a !== y.xS.ACAT &&
                  a !== y.xS.DSP &&
                  a !== y.xS.CRID) ||
                (!(0, r.isEmptyStr)(d) && null != d)
                  ? (e[a] = d)
                  : (0, r.logInfo)("suppressing empty key '" + a + "' from adserver targeting");
              }),
              e
            );
          }
          function Q(e, t) {
            return (e[t.adUnitCode] || (e[t.adUnitCode] = { bids: [] }), e[t.adUnitCode].bids.push(t), e);
          }
        },
        1385(e, t, n) {
          n.d(t, { B1: () => a, SL: () => v, ad: () => m, et: () => h, mW: () => f, o2: () => b, t6: () => p });
          var r = n(466),
            i = n(6665),
            o = n(3064),
            s = n(1933);
          const a = Object.freeze({}),
            d = 'gdpr',
            c = 'gpp',
            l = 'usp',
            u = 'coppa';
          class g {
            #e;
            #t;
            #n;
            #r;
            #i = !0;
            #o;
            constructor() {
              this.reset();
            }
            #s(e) {
              ((this.#r = !0), (this.#t = e), this.#n.resolve(e));
            }
            reset() {
              ((this.#n = (0, o.v6)()), (this.#e = !1), (this.#t = null), (this.#r = !1), (this.generatedTime = null));
            }
            enable() {
              this.#e = !0;
            }
            get enabled() {
              return this.#e;
            }
            get ready() {
              return this.#r;
            }
            get promise() {
              return this.#r ? o.U9.resolve(this.#t) : (this.#e || this.#s(null), this.#n.promise);
            }
            setConsentData(e) {
              let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : (0, r.timestamp)();
              ((this.generatedTime = t), (this.#i = !0), this.#s(e));
            }
            getConsentData() {
              return this.#e ? this.#t : null;
            }
            get hash() {
              return (
                this.#i &&
                  ((this.#o = (0, r.cyrb53Hash)(
                    JSON.stringify(this.#t && this.hashFields ? this.hashFields.map((e) => this.#t[e]) : this.#t),
                  )),
                  (this.#i = !1)),
                this.#o
              );
            }
          }
          const f = new (class extends g {
              hashFields = ['gdprApplies', 'consentString'];
              getConsentMeta() {
                const e = this.getConsentData();
                if (e && e.vendorData && this.generatedTime)
                  return {
                    gdprApplies: e.gdprApplies,
                    consentStringSize: (0, i.O8)(e.vendorData.tcString) ? e.vendorData.tcString.length : 0,
                    generatedAt: this.generatedTime,
                    apiVersion: e.apiVersion,
                  };
              }
            })(),
            p = new (class extends g {
              getConsentMeta() {
                if (this.getConsentData() && this.generatedTime) return { generatedAt: this.generatedTime };
              }
            })(),
            m = new (class extends g {
              hashFields = ['applicableSections', 'gppString'];
              getConsentMeta() {
                if (this.getConsentData() && this.generatedTime) return { generatedAt: this.generatedTime };
              }
            })(),
            h = (() => {
              function e() {
                return !!s.$W.getConfig('coppa');
              }
              return {
                getCoppa: e,
                getConsentData: e,
                getConsentMeta: e,
                reset() {},
                get promise() {
                  return o.U9.resolve(e());
                },
                get hash() {
                  return e() ? '1' : '0';
                },
              };
            })(),
            b = (function () {
              const e = {},
                t = {},
                n = {};
              return {
                register(r, i, o) {
                  o && (((e[i] = e[i] || {})[r] = o), t.hasOwnProperty(i) ? t[i] !== o && (t[i] = n) : (t[i] = o));
                },
                get(r) {
                  const i = { modules: e[r] || {} };
                  return (t.hasOwnProperty(r) && t[r] !== n && (i.gvlid = t[r]), i);
                },
              };
            })(),
            y = { [d]: f, [l]: p, [c]: m, [u]: h };
          const v = (function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y;
            const t = Object.entries(e);
            return Object.assign(
              {
                get promise() {
                  return o.U9.all(
                    t.map((e) => {
                      let [t, n] = e;
                      return n.promise.then((e) => [t, e]);
                    }),
                  ).then((e) => Object.fromEntries(e));
                },
                get hash() {
                  return (0, r.cyrb53Hash)(
                    t
                      .map((e) => {
                        let [t, n] = e;
                        return n.hash;
                      })
                      .join(':'),
                  );
                },
              },
              Object.fromEntries(
                ['getConsentData', 'getConsentMeta', 'reset'].map((e) => {
                  return [
                    e,
                    ((n = e),
                    function () {
                      return Object.fromEntries(
                        t.map((e) => {
                          let [t, r] = e;
                          return [t, r[n]()];
                        }),
                      );
                    }),
                  ];
                  var n;
                }),
              ),
            );
          })();
        },
        1418(e, t, n) {
          n.d(t, {
            IY: () => E,
            M: () => i,
            RW: () => g,
            Tf: () => p,
            UE: () => d,
            Zh: () => l,
            _B: () => y,
            as: () => s,
            cA: () => a,
            h0: () => m,
            iD: () => r,
            jO: () => h,
            nl: () => v,
            oA: () => b,
            qY: () => o,
            tl: () => f,
            x5: () => u,
            xS: () => c,
          });
          const r = {
              PL_CODE: 'code',
              PL_SIZE: 'sizes',
              PL_BIDS: 'bids',
              BD_BIDDER: 'bidder',
              BD_ID: 'paramsd',
              BD_PL_ID: 'placementId',
              ADSERVER_TARGETING: 'adserverTargeting',
              BD_SETTING_STANDARD: 'standard',
            },
            i = 'waf_debug',
            o = {
              AUCTION_INIT: 'auctionInit',
              AUCTION_TIMEOUT: 'auctionTimeout',
              AUCTION_END: 'auctionEnd',
              BID_ADJUSTMENT: 'bidAdjustment',
              BID_TIMEOUT: 'bidTimeout',
              BID_REQUESTED: 'bidRequested',
              BID_RESPONSE: 'bidResponse',
              BID_REJECTED: 'bidRejected',
              NO_BID: 'noBid',
              SEAT_NON_BID: 'seatNonBid',
              BID_WON: 'bidWon',
              BIDDER_DONE: 'bidderDone',
              BIDDER_ERROR: 'bidderError',
              SET_TARGETING: 'setTargeting',
              BEFORE_REQUEST_BIDS: 'beforeRequestBids',
              BEFORE_BIDDER_HTTP: 'beforeBidderHttp',
              REQUEST_BIDS: 'requestBids',
              ADD_AD_UNITS: 'addAdUnits',
              AD_RENDER_FAILED: 'adRenderFailed',
              AD_RENDER_SUCCEEDED: 'adRenderSucceeded',
              TCF2_ENFORCEMENT: 'tcf2Enforcement',
              AUCTION_DEBUG: 'auctionDebug',
              BID_VIEWABLE: 'bidViewable',
              STALE_RENDER: 'staleRender',
              EXPIRED_RENDER: 'expiredRender',
              BILLABLE_EVENT: 'billableEvent',
              BID_ACCEPTED: 'bidAccepted',
              RUN_PAAPI_AUCTION: 'paapiRunAuction',
              PBS_ANALYTICS: 'pbsAnalytics',
              PAAPI_BID: 'paapiBid',
              PAAPI_NO_BID: 'paapiNoBid',
              PAAPI_ERROR: 'paapiError',
              BEFORE_PBS_HTTP: 'beforePBSHttp',
              BROWSI_INIT: 'browsiInit',
              BROWSI_DATA: 'browsiData',
              BROWSER_INTERVENTION: 'browserIntervention',
            },
            s = {
              PREVENT_WRITING_ON_MAIN_DOCUMENT: 'preventWritingOnMainDocument',
              NO_AD: 'noAd',
              EXCEPTION: 'exception',
              CANNOT_FIND_AD: 'cannotFindAd',
              MISSING_DOC_OR_ADID: 'missingDocOrAdid',
            },
            a = { bidWon: 'adUnitCode' },
            d = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', AUTO: 'auto', DENSE: 'dense', CUSTOM: 'custom' },
            c = {
              BIDDER: 'hb_bidder',
              AD_ID: 'hb_adid',
              PRICE_BUCKET: 'hb_pb',
              SIZE: 'hb_size',
              DEAL: 'hb_deal',
              SOURCE: 'hb_source',
              FORMAT: 'hb_format',
              UUID: 'hb_uuid',
              CACHE_ID: 'hb_cache_id',
              CACHE_HOST: 'hb_cache_host',
              ADOMAIN: 'hb_adomain',
              ACAT: 'hb_acat',
              CRID: 'hb_crid',
              DSP: 'hb_dsp',
              VERSION: 'hb_ver',
            },
            l = {
              BIDDER: 'hb_bidder',
              AD_ID: 'hb_adid',
              PRICE_BUCKET: 'hb_pb',
              SIZE: 'hb_size',
              DEAL: 'hb_deal',
              FORMAT: 'hb_format',
              UUID: 'hb_uuid',
              CACHE_HOST: 'hb_cache_host',
              VERSION: 'hb_ver',
            },
            u = {
              title: 'hb_native_title',
              body: 'hb_native_body',
              body2: 'hb_native_body2',
              privacyLink: 'hb_native_privacy',
              privacyIcon: 'hb_native_privicon',
              sponsoredBy: 'hb_native_brand',
              image: 'hb_native_image',
              icon: 'hb_native_icon',
              clickUrl: 'hb_native_linkurl',
              displayUrl: 'hb_native_displayurl',
              cta: 'hb_native_cta',
              rating: 'hb_native_rating',
              address: 'hb_native_address',
              downloads: 'hb_native_downloads',
              likes: 'hb_native_likes',
              phone: 'hb_native_phone',
              price: 'hb_native_price',
              salePrice: 'hb_native_saleprice',
              rendererUrl: 'hb_renderer_url',
              adTemplate: 'hb_adTemplate',
            },
            g = { SRC: 's2s', DEFAULT_ENDPOINT: 'https://prebid.adnxs.com/pbs/v1/openrtb2/auction', SYNCED_BIDDERS_KEY: 'pbjsSyncs' },
            f = { BID_TARGETING_SET: 'targetingSet', RENDERED: 'rendered', BID_REJECTED: 'bidRejected' },
            p = {
              INVALID: 'Bid has missing or invalid properties',
              INVALID_REQUEST_ID: 'Invalid request ID',
              BIDDER_DISALLOWED: 'Bidder code is not allowed by allowedAlternateBidderCodes / allowUnknownBidderCodes',
              FLOOR_NOT_MET: 'Bid does not meet price floor',
              CANNOT_CONVERT_CURRENCY: 'Unable to convert currency',
              DSA_REQUIRED: 'Bid does not provide required DSA transparency info',
              DSA_MISMATCH: 'Bid indicates inappropriate DSA rendering method',
              PRICE_TOO_HIGH: 'Bid price exceeds maximum value',
            },
            m = {
              body: 'desc',
              body2: 'desc2',
              sponsoredBy: 'sponsored',
              cta: 'ctatext',
              rating: 'rating',
              address: 'address',
              downloads: 'downloads',
              likes: 'likes',
              phone: 'phone',
              price: 'price',
              salePrice: 'saleprice',
              displayUrl: 'displayurl',
            },
            h = {
              sponsored: 1,
              desc: 2,
              rating: 3,
              likes: 4,
              downloads: 5,
              price: 6,
              saleprice: 7,
              phone: 8,
              address: 9,
              desc2: 10,
              displayurl: 11,
              ctatext: 12,
            },
            b = { ICON: 1, MAIN: 3 },
            y = ['privacyIcon', 'clickUrl', 'adTemplate', 'rendererUrl', 'type'],
            v = {
              REQUEST: 'Prebid Request',
              RESPONSE: 'Prebid Response',
              NATIVE: 'Prebid Native',
              EVENT: 'Prebid Event',
              INTERVENTION: 'Prebid Intervention',
            },
            E = '__pb_locator__';
        },
        1443(e, t, n) {
          n.d(t, { CK: () => y, X0: () => p, d_: () => v, le: () => h, p6: () => A, qk: () => f, s0: () => m, vM: () => b });
          var r = n(466),
            i = n(7156),
            o = n(736),
            s = n(3202),
            a = n(5291),
            d = n(5808),
            c = n(1933),
            l = n(2592),
            u = n(8668),
            g = n(7610);
          const f = 'html5',
            p = 'cookie';
          let m = [];
          function h() {
            let {
                moduleName: e,
                moduleType: t,
                advertiseKeys: n = !0,
              } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              { isAllowed: i = s.io } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            function l(r, s, l, f) {
              let p = e;
              const m = c.$W.getCurrentBidder();
              m && t === o.tW && u.Ay.aliasRegistry[m] === e && (p = m);
              const h = { [a.Zw]: s, [a.OI]: f };
              n && null != l && (h[a.Ez] = l);
              return r({ valid: i(d.Ue, (0, g.s)(t, p, h)) });
            }
            function h(e, t, n, r, i) {
              if (!i || 'function' != typeof i) return l(e, t, n, r);
              m.push(function () {
                let o = l(e, t, n, r);
                i(o);
              });
            }
            function b(e) {
              const t = e.charAt(0).toUpperCase() + e.substring(1),
                n = () => window[e],
                i = function (t) {
                  return h(
                    function (t) {
                      if (t && t.valid)
                        try {
                          return !!n();
                        } catch (t) {
                          (0, r.logError)(`${e} api disabled`);
                        }
                      return !1;
                    },
                    f,
                    null,
                    !1,
                    t,
                  );
                };
              return {
                [`has${t}`]: i,
                [`${e}IsEnabled`]: (e) =>
                  h(
                    function (e) {
                      if (e && e.valid)
                        try {
                          return (n().setItem('prebid.cookieTest', '1'), '1' === n().getItem('prebid.cookieTest'));
                        } catch (e) {
                        } finally {
                          try {
                            n().removeItem('prebid.cookieTest');
                          } catch (e) {}
                        }
                      return !1;
                    },
                    f,
                    null,
                    !1,
                    e,
                  ),
                [`setDataIn${t}`]: (e, t, r) =>
                  h(
                    function (r) {
                      r && r.valid && i() && n().setItem(e, t);
                    },
                    f,
                    e,
                    !0,
                    r,
                  ),
                [`getDataFrom${t}`]: (e, t) =>
                  h(
                    function (t) {
                      return t && t.valid && i() ? n().getItem(e) : null;
                    },
                    f,
                    e,
                    !1,
                    t,
                  ),
                [`removeDataFrom${t}`]: (e, t) =>
                  h(
                    function (t) {
                      t && t.valid && i() && n().removeItem(e);
                    },
                    f,
                    e,
                    !0,
                    t,
                  ),
              };
            }
            return {
              setCookie: function (e, t, n, r, i, o) {
                return h(
                  function (o) {
                    if (o && o.valid) {
                      const o = i && '' !== i ? ` ;domain=${encodeURIComponent(i)}` : '',
                        s = n && '' !== n ? ` ;expires=${n}` : '',
                        a = 'none' === r?.toLowerCase() ? '; Secure' : '';
                      document.cookie = `${e}=${encodeURIComponent(t)}${s}; path=/${o}${r ? `; SameSite=${r}` : ''}${a}`;
                    }
                  },
                  p,
                  e,
                  !0,
                  o,
                );
              },
              getCookie: function (e, t) {
                return h(
                  function (t) {
                    if (t && t.valid) {
                      let t = window.document.cookie.match('(^|;)\\s*' + e + '\\s*=\\s*([^;]*)\\s*(;|$)');
                      return t ? decodeURIComponent(t[2]) : null;
                    }
                    return null;
                  },
                  p,
                  e,
                  !1,
                  t,
                );
              },
              cookiesAreEnabled: function (e) {
                return h(
                  function (e) {
                    return !(!e || !e.valid) && (0, r.checkCookieSupport)() && v();
                  },
                  p,
                  null,
                  !1,
                  e,
                );
              },
              ...b('localStorage'),
              ...b('sessionStorage'),
              findSimilarCookies: function (e, t) {
                return h(
                  function (t) {
                    if (t && t.valid) {
                      const t = [];
                      if ((0, r.hasDeviceAccess)()) {
                        const n = document.cookie.split(';');
                        for (; n.length; ) {
                          const r = n.pop();
                          let i = r.indexOf('=');
                          i = i < 0 ? r.length : i;
                          decodeURIComponent(r.slice(0, i).replace(/^\s+/, '')).indexOf(e) >= 0 &&
                            t.push(decodeURIComponent(r.slice(i + 1)));
                        }
                      }
                      return t;
                    }
                  },
                  p,
                  e,
                  !1,
                  t,
                );
              },
            };
          }
          function b() {
            let { moduleType: e, moduleName: t, bidderCode: n } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            function r() {
              throw new Error('Invalid invocation for getStorageManager: must set either bidderCode, or moduleType + moduleName');
            }
            return (n ? (((e && e !== o.tW) || t) && r(), (e = o.tW), (t = n)) : (t && e) || r(), h({ moduleType: e, moduleName: t }));
          }
          function y(e) {
            return h({ moduleName: e, moduleType: o.tp });
          }
          const v = (() => {
            const e = y('storage');
            return (0, r.memoize)(function (t) {
              let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e;
              const i = new Date((0, r.timestamp)() + 1e4).toUTCString(),
                o = `_rdc${Date.now()}`,
                s = 'writeable';
              n.setCookie(o, s, i, 'Lax', t);
              return n.getCookie(o) === s && (n.setCookie(o, '', 'Thu, 01 Jan 1970 00:00:01 GMT', void 0, t), !0);
            });
          })();
          function E() {
            if (!(0, r.hasDeviceAccess)()) return { allow: !1 };
          }
          ((0, s.qB)(d.Ue, 'deviceAccess config', E),
            (0, s.qB)(d.yg, 'deviceAccess config', E),
            (0, s.qB)(d.Ue, 'bidderSettings.*.storageAllowed', function (e) {
              let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.u;
              if (e[a.Dk] !== o.tW) return;
              let n = t.get(e[a.q7], 'storageAllowed');
              if (n && !0 !== n) {
                const t = e[a.Zw];
                n = Array.isArray(n) ? n.some((e) => e === t) : n === t;
              } else n = !!n;
              return n ? void 0 : { allow: n };
            }));
          const A = (0, l.A_)('sync', (e, t) => {});
        },
        1640(e, t, n) {
          n.d(t, { Sb: () => l, X5: () => b, kh: () => d });
          var r = n(2201),
            i = n(1933),
            o = n(3006),
            s = n(466),
            a = n(1186);
          const d = new Map();
          function c(e) {
            return e.vastXml
              ? e.vastXml
              : ((t = e.vastUrl),
                (n = e.vastImpUrl),
                `<VAST version="3.0">\n    <Ad>\n      <Wrapper>\n        <AdSystem>prebid.org wrapper</AdSystem>\n        <VASTAdTagURI><![CDATA[${t}]]></VASTAdTagURI>\n        ${(n = n && (Array.isArray(n) ? n : [n])) ? n.map((e) => `<Impression><![CDATA[${e}]]></Impression>`).join('') : ''}\n        <Creatives></Creatives>\n      </Wrapper>\n    </Ad>\n  </VAST>`);
            var t, n;
          }
          const l = (e) => {
              const t = c(e),
                n = URL.createObjectURL(new Blob([t], { type: 'text/xml' }));
              (u(e, n), d.set(e.videoCacheKey, n));
            },
            u = (e, t, n) => {
              ((e.videoCacheKey = n || (0, s.generateUUID)()), e.vastUrl || (e.vastUrl = t));
            },
            g = {
              store: function (e, t) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : r.g4;
                const s = {
                  puts: e.map((e) =>
                    (function (e) {
                      let { index: t = o.n.index } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                      const n = c(e),
                        r = t.getAuction(e),
                        s = { type: 'xml', value: n, ttlseconds: Number(e.ttl) + 15 };
                      return (
                        i.$W.getConfig('cache.vasttrack') && ((s.bidder = e.bidder), (s.bidid = e.requestId), (s.aid = e.auctionId)),
                        null != r && (s.timestamp = r.getAuctionStart()),
                        'string' == typeof e.customCacheKey && '' !== e.customCacheKey && (s.key = e.customCacheKey),
                        s
                      );
                    })(e),
                  ),
                };
                n(i.$W.getConfig('cache.timeout'))(
                  i.$W.getConfig('cache.url'),
                  (function (e) {
                    return {
                      success: function (t) {
                        let n;
                        try {
                          n = JSON.parse(t).responses;
                        } catch (t) {
                          return void e(t, []);
                        }
                        n ? e(null, n) : e(new Error("The cache server didn't respond with a responses property."), []);
                      },
                      error: function (t, n) {
                        e(new Error(`Error storing video ad in the cache: ${t}: ${JSON.stringify(n)}`), []);
                      },
                    };
                  })(t),
                  JSON.stringify(s),
                  { contentType: 'text/plain', withCredentials: !0 },
                );
              },
            };
          function f(e) {
            const t = e.map((e) => e.bidResponse);
            g.store(t, function (n, r) {
              var o;
              n
                ? ((o = n), (0, s.logError)(`Failed to save to the video cache: ${o}. Video bids will be discarded:`, t))
                : e.length !== r.length
                  ? (0, s.logError)(`expected ${e.length} cache IDs, got ${r.length} instead`)
                  : r.forEach((t, n) => {
                      const { auctionInstance: r, bidResponse: o, afterBidAdded: d } = e[n];
                      var c;
                      '' === t.uuid
                        ? (0, s.logWarn)(
                            'Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded.',
                          )
                        : (u(o, ((c = t.uuid), `${i.$W.getConfig('cache.url')}?uuid=${c}`), t.uuid), (0, a.v8)(r, o), d());
                    });
            });
          }
          let p, m, h;
          i.$W.getConfig('cache', (e) => {
            let { cache: t } = e;
            ((p = 'number' == typeof t.batchSize && t.batchSize > 0 ? t.batchSize : 1),
              (m = 'number' == typeof t.batchTimeout && t.batchTimeout > 0 ? t.batchTimeout : 0),
              t.useLocal &&
                !h &&
                (h = o.n.onExpiry((e) => {
                  e.getBidsReceived().forEach((e) => {
                    const t = d.get(e.videoCacheKey);
                    (t && t.startsWith('blob') && URL.revokeObjectURL(t), d.delete(e.videoCacheKey));
                  });
                })));
          });
          const b = (function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : setTimeout,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : f,
              n = [[]],
              r = !1;
            const i = (e) => e();
            return function (o, s, a) {
              const d = m > 0 ? e : i;
              (n[n.length - 1].length >= p && n.push([]),
                n[n.length - 1].push({ auctionInstance: o, bidResponse: s, afterBidAdded: a }),
                r ||
                  ((r = !0),
                  d(() => {
                    (n.forEach(t), (n = [[]]), (r = !1));
                  }, m)));
            };
          })();
        },
        1748(e, t, n) {
          n.d(t, { E: () => a, m: () => s });
          var r = n(765);
          const i = (0, r.uP)() ? window : {},
            o = (i[(0, r.k)()] = i[(0, r.k)()] || {});
          function s() {
            return o;
          }
          function a(e) {
            o.installedModules.push(e);
          }
          ((o.cmd = o.cmd || []),
            (o.que = o.que || []),
            (o.installedModules = o.installedModules || []),
            i === window && ((i._pbjsGlobals = i._pbjsGlobals || []), i._pbjsGlobals.push((0, r.k)())));
        },
        1780(e, t, n) {
          n.d(t, { S: () => s });
          var r = n(466),
            i = n(1443);
          const o = (0, i.CK)('fpdEnrichment'),
            s = (0, r.memoize)(function () {
              let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.host;
              if (!o.cookiesAreEnabled()) return e;
              const t = e.split('.');
              if (2 === t.length) return e;
              let n,
                r,
                s = -2;
              do {
                ((n = t.slice(s).join('.')), (0, i.d_)(n, o) ? (r = !1) : ((s += -1), (r = Math.abs(s) <= t.length)));
              } while (r);
              return n;
            });
        },
        1833(e, t, n) {
          n.d(t, { Dy: () => i, O$: () => s, i8: () => o });
          var r = n(466);
          const i = ['dooh', 'app', 'site'];
          function o(e) {
            return function (t) {
              return (
                i.reduce(
                  (n, i) => (
                    s(t, i) &&
                      (null != n ? ((0, r.logWarn)(`${e} specifies both '${n}' and '${i}'; dropping the latter.`), delete t[i]) : (n = i)),
                    n
                  ),
                  null,
                ),
                t
              );
            };
          }
          function s(e, t) {
            return null != e[t] && Object.keys(e[t]).length > 0;
          }
        },
        1852(e, t, n) {
          n.d(t, {
            $A: () => C,
            BS: () => F,
            Hh: () => j,
            Pk: () => N,
            Uc: () => R,
            XO: () => G,
            bw: () => $,
            n6: () => S,
            qn: () => x,
            vB: () => P,
            vW: () => U,
            vd: () => D,
          });
          var r = n(466),
            i = n(8014),
            o = n(1418),
            s = n(1933),
            a = n(7464),
            d = n(9794),
            c = n(3006),
            l = n(5144),
            u = n(2592),
            g = n(356),
            f = n(8668),
            p = n(7841),
            m = n(869),
            h = n(2122),
            b = n(6652),
            y = n(3064);
          const { AD_RENDER_FAILED: v, AD_RENDER_SUCCEEDED: E, STALE_RENDER: A, BID_WON: w, EXPIRED_RENDER: I } = o.qY,
            { EXCEPTION: T } = o.as,
            C = (0, u.A_)('sync', function (e, t, n) {
              n(c.n.findBidByAdId(e));
            }),
            S = (0, u.A_)('sync', function (e) {
              (((0, h.$T)(e.eventtrackers)[h.RO]?.[h.Ni] || []).forEach((e) => (0, r.triggerPixel)(e)), i.Ic(w, e), c.n.addWinningBid(e));
            });
          function O(e) {
            let { reason: t, message: n, bid: o, id: s } = e;
            const a = { reason: t, message: n };
            (o && ((a.bid = o), (a.adId = o.adId)), s && (a.adId = s), (0, r.logError)(`Error rendering ad (id: ${s}): ${n}`), i.Ic(v, a));
          }
          function B(e) {
            let { doc: t, bid: n, id: r } = e;
            const o = { doc: t, bid: n, adId: r };
            (f.Ay.callAdRenderSucceededBidder(n.adapterCode || n.bidder, n), i.Ic(E, o));
          }
          function R(e, t) {
            switch (e.event) {
              case o.qY.AD_RENDER_FAILED:
                O({ bid: t, id: t.adId, reason: e.info.reason, message: e.info.message });
                break;
              case o.qY.AD_RENDER_SUCCEEDED:
                B({ doc: null, bid: t, id: t.adId });
                break;
              case o.qY.BROWSER_INTERVENTION:
                !(function (e) {
                  const { bid: t, intervention: n } = e;
                  (f.Ay.callOnInterventionBidder(t.adapterCode || t.bidder, t, n), i.Ic(o.qY.BROWSER_INTERVENTION, e));
                })({ bid: t, adId: t.adId, intervention: e.intervention });
                break;
              default:
                (0, r.logError)(`Received event request for unsupported event: '${e.event}' (adId: '${t.adId}')`);
            }
          }
          function U(e, t, n) {
            let { resizeFn: r, fireTrackers: i = g.vO } = n;
            if ('resizeNativeHeight' === e.action) r(e.width, e.height);
            else i(e, t);
          }
          const k = { [o.nl.EVENT]: R };
          k[o.nl.NATIVE] = U;
          const D = (0, u.A_)('sync', function (e, t) {
              const { ad: n, adUrl: i, cpm: o, originalCpm: s, width: a, height: d, instl: c } = e,
                l = { AUCTION_PRICE: s || o, CLICKTHROUGH: t?.clickUrl || '' };
              return { ad: (0, r.replaceMacros)(n, l), adUrl: (0, r.replaceMacros)(i, l), width: a, height: d, instl: c };
            }),
            _ = (0, u.A_)('sync', function (e) {
              let {
                renderFn: t,
                resizeFn: n,
                bidResponse: i,
                options: s,
                doc: a,
                isMainDocument: c = a === document && !(0, r.inIframe)(),
              } = e;
              const l = i.mediaType === d.G_;
              if (c || l)
                return void O({
                  reason: o.as.PREVENT_WRITING_ON_MAIN_DOCUMENT,
                  message: l ? 'Cannot render video ad without a renderer' : 'renderAd was prevented from writing to the main document.',
                  bid: i,
                  id: i.adId,
                });
              const u = D(i, s);
              t(Object.assign({ adId: i.adId }, u));
              const { width: g, height: f } = u;
              null != (g ?? f) && n(g, f);
            });
          function $(e) {
            let { renderFn: t, resizeFn: n, adId: a, options: d, bidResponse: c, doc: l } = e;
            j(c, () => {
              if (null != c) {
                if (
                  (c.status !== o.tl.RENDERED ||
                    ((0, r.logWarn)(`Ad id ${a} has been rendered before`),
                    i.Ic(A, c),
                    !s.$W.getConfig('auctionOptions')?.suppressStaleRender)) &&
                  (m.uW.isBidNotExpired(c) ||
                    ((0, r.logWarn)(`Ad id ${a} has been expired`), i.Ic(I, c), !s.$W.getConfig('auctionOptions')?.suppressExpiredRender))
                )
                  try {
                    _({ renderFn: t, resizeFn: n, bidResponse: c, options: d, doc: l });
                  } catch (e) {
                    O({ reason: o.as.EXCEPTION, message: e.message, id: a, bid: c });
                  }
              } else O({ reason: o.as.CANNOT_FIND_AD, message: `Cannot find ad '${a}'`, id: a });
            });
          }
          function x(e) {
            const t = (0, p.BO)(e.metrics);
            (t.checkpoint('bidRender'),
              t.timeBetween('bidWon', 'bidRender', 'render.deferred'),
              t.timeBetween('auctionEnd', 'bidRender', 'render.pending'),
              t.timeBetween('requestBids', 'bidRender', 'render.e2e'),
              (e.status = o.tl.RENDERED));
          }
          _.before(function (e, t) {
            const { bidResponse: n, doc: r } = t;
            (0, a.J7)(n.renderer) ? ((0, a.Pg)(n.renderer, n, r), B({ doc: r, bid: n, id: n.adId }), e.bail()) : e(t);
          }, 100);
          const q = new WeakMap(),
            W = new WeakSet();
          function j(e, t) {
            null != e ? (q.set(e, t), e.deferRendering || P(e), N(e)) : t();
          }
          function N(e) {
            W.has(e) || (W.add(e), S(e));
          }
          function P(e) {
            const t = q.get(e);
            t && (t(), x(e), q.delete(e));
          }
          let M = !1;
          s.$W.getConfig('auctionOptions', (e) => {
            M = e.auctionOptions?.legacyRender ?? !1;
          });
          const F = (0, b.o1)(
            () => !M,
            function (e, t, n) {
              let i;
              function s(e, n) {
                O(Object.assign({ id: t, bid: i }, { reason: e, message: n }));
              }
              function a(t, n) {
                const r = e.defaultView?.frameElement;
                r &&
                  (t && ((r.width = t), r.style.width && (r.style.width = `${t}px`)),
                  n && ((r.height = n), r.style.height && (r.style.height = `${n}px`)));
              }
              const d =
                ((c = { resizeFn: a }),
                function (e, t, n) {
                  k.hasOwnProperty(e) && k[e](t, n, c);
                });
              var c;
              function u(e) {
                return new y.U9((t) => {
                  'loading' === e.readyState ? e.addEventListener('DOMContentLoaded', t) : t();
                });
              }
              function g(t) {
                t.ad && M
                  ? (e.write(t.ad), e.close(), B({ doc: e, bid: i, id: i.adId }))
                  : y.U9.all([(0, l.HH)(i), u(e)])
                      .then((n) => {
                        let [o] = n;
                        return o(t, { sendMessage: (e, t) => d(e, t, i), mkFrame: r.createIframe }, e.defaultView);
                      })
                      .then(
                        () => B({ doc: e, bid: i, id: i.adId }),
                        (e) => {
                          (s(e?.reason || o.as.EXCEPTION, e?.message), e?.stack && (0, r.logError)(e));
                        },
                      );
                const n = document.createComment(`Creative ${i.creativeId} served by ${i.bidder} Prebid.js Header Bidding`);
                (0, r.insertElement)(n, e, 'html');
              }
              try {
                t && e
                  ? C(t, !0, (r) => {
                      ((i = r), $({ renderFn: g, resizeFn: a, adId: t, options: { clickUrl: n?.clickThrough }, bidResponse: r, doc: e }));
                    })
                  : s(o.as.MISSING_DOC_OR_ADID, 'missing ' + (t ? 'doc' : 'adId'));
              } catch (e) {
                s(T, e.message);
              }
            },
          );
          function G() {
            if (!window.frames[o.IY])
              if (document.body) {
                const e = (0, r.createInvisibleIframe)();
                ((e.name = o.IY), document.body.appendChild(e));
              } else window.requestAnimationFrame(G);
          }
        },
        1933(e, t, n) {
          n.d(t, { $W: () => m, Ov: () => l });
          var r = n(1124),
            i = n(466),
            o = n(8928),
            s = n(6665),
            a = n(1418);
          const d = 'TRUE' === (0, i.getParameterByName)(a.M).toUpperCase(),
            c = {},
            l = 'random',
            u = {};
          ((u[l] = !0), (u.fixed = !0));
          const g = l,
            f = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', AUTO: 'auto', DENSE: 'dense', CUSTOM: 'custom' };
          function p(e) {
            const t =
                !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  ? {
                      priceGranularity: f.MEDIUM,
                      customPriceBucket: {},
                      mediaTypePriceGranularity: {},
                      bidderSequence: g,
                      auctionOptions: {},
                    }
                  : {},
              n = (() => {
                const e = ['secondaryBidders', 'suppressStaleRender', 'suppressExpiredRender', 'legacyRender'],
                  t = ['secondaryBidders'],
                  n = [].concat(e).concat(t);
                return function (r) {
                  if (!(0, s.Qd)(r)) return ((0, i.logWarn)('Auction Options must be an object'), !1);
                  for (const o of Object.keys(r)) {
                    if (!n.includes(o)) return ((0, i.logWarn)(`Auction Options given an incorrect param: ${o}`), !1);
                    if (t.includes(o)) {
                      if (!(0, s.cy)(r[o])) return ((0, i.logWarn)(`Auction Options ${o} must be of type Array`), !1);
                      if (!r[o].every(s.O8)) return ((0, i.logWarn)(`Auction Options ${o} must be only string`), !1);
                    } else if (e.includes(o) && !(0, s.Lm)(r[o]))
                      return ((0, i.logWarn)(`Auction Options ${o} must be of type boolean`), !1);
                  }
                  return !0;
                };
              })();
            function o(e) {
              return t[e];
            }
            function a(n, r) {
              (t.hasOwnProperty(n) || Object.defineProperty(e, n, { enumerable: !0 }), (t[n] = r));
            }
            const d = {
              publisherDomain: {
                set(e) {
                  (null != e && (0, i.logWarn)('publisherDomain is deprecated and has no effect since v7 - use pageUrl instead'),
                    a('publisherDomain', e));
                },
              },
              priceGranularity: {
                set(e) {
                  l(e) &&
                    ('string' == typeof e
                      ? a('priceGranularity', c(e) ? e : f.MEDIUM)
                      : (0, s.Qd)(e) &&
                        (a('customPriceBucket', e), a('priceGranularity', f.CUSTOM), (0, i.logMessage)('Using custom price granularity')));
                },
              },
              customPriceBucket: {},
              mediaTypePriceGranularity: {
                set(e) {
                  null != e &&
                    a(
                      'mediaTypePriceGranularity',
                      Object.keys(e).reduce(
                        (t, n) => (
                          l(e[n])
                            ? 'string' == typeof e
                              ? (t[n] = c(e[n]) ? e[n] : o('priceGranularity'))
                              : (0, s.Qd)(e) && ((t[n] = e[n]), (0, i.logMessage)(`Using custom price granularity for ${n}`))
                            : (0, i.logWarn)(`Invalid price granularity for media type: ${n}`),
                          t
                        ),
                        {},
                      ),
                    );
                },
              },
              bidderSequence: {
                set(e) {
                  u[e] ? a('bidderSequence', e) : (0, i.logWarn)(`Invalid order: ${e}. Bidder Sequence was not set.`);
                },
              },
              auctionOptions: {
                set(e) {
                  n(e) && a('auctionOptions', e);
                },
              },
            };
            return (
              Object.defineProperties(
                e,
                Object.fromEntries(
                  Object.entries(d).map((e) => {
                    let [n, r] = e;
                    return [
                      n,
                      Object.assign(
                        { get: o.bind(null, n), set: a.bind(null, n), enumerable: t.hasOwnProperty(n), configurable: !t.hasOwnProperty(n) },
                        r,
                      ),
                    ];
                  }),
                ),
              ),
              e
            );
            function c(e) {
              return Object.keys(f).find((t) => e === f[t]);
            }
            function l(e) {
              if (!e) return ((0, i.logError)('Prebid Error: no value passed to `setPriceGranularity()`'), !1);
              if ('string' == typeof e)
                c(e) || (0, i.logWarn)('Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.');
              else if ((0, s.Qd)(e) && !(0, r.q)(e))
                return ((0, i.logError)('Invalid custom price value passed to `setPriceGranularity()`'), !1);
              return !0;
            }
          }
          const m = (function () {
            const e = [];
            let t,
              n,
              r,
              a = null;
            function l() {
              t = {};
              const e = p({
                debug: d,
                bidderTimeout: 3e3,
                enableSendAllBids: true,
                useBidCache: false,
                deviceAccess: true,
                disableAjaxTimeout: false,
                maxNestedIframes: 10,
                maxBid: 5e3,
                userSync: { topics: c },
              });
              (n && v(Object.keys(n).reduce((t, r) => (n[r] !== e[r] && (t[r] = e[r] || {}), t), {})), (n = e), (r = {}));
            }
            function u() {
              if (a && r && (0, s.Qd)(r[a])) {
                const e = r[a],
                  t = new Set([...Object.keys(n), ...Object.keys(e)]),
                  o = {};
                for (const r of t) {
                  const t = n[r],
                    a = e[r];
                  o[r] = void 0 === a ? t : void 0 === t ? a : (0, s.Qd)(a) ? (0, i.mergeDeep)({}, t, a) : a;
                }
                return o;
              }
              return { ...n };
            }
            const [g, f] = [
                u,
                function () {
                  const e = u();
                  return (
                    Object.defineProperty(e, 'ortb2', {
                      get: function () {
                        throw new Error("invalid access to 'orbt2' config - use request parameters instead");
                      },
                    }),
                    e
                  );
                },
              ].map(
                (e) =>
                  function () {
                    if (arguments.length <= 1 && 'function' != typeof (arguments.length <= 0 ? void 0 : arguments[0])) {
                      const t = arguments.length <= 0 ? void 0 : arguments[0];
                      return t ? (0, o.A)(e(), t) : u();
                    }
                    return y(...arguments);
                  },
              ),
              [m, h] = [f, g].map(
                (e) =>
                  function () {
                    let t = e(...arguments);
                    return (t && 'object' == typeof t && (t = (0, s.Go)(t)), t);
                  },
              );
            function b(e) {
              if (!(0, s.Qd)(e)) return void (0, i.logError)('setConfig options must be an object');
              const r = Object.keys(e),
                o = {};
              (r.forEach((r) => {
                let a = e[r];
                (0, s.Qd)(t[r]) && (0, s.Qd)(a) && (a = Object.assign({}, t[r], a));
                try {
                  o[r] = n[r] = a;
                } catch (e) {
                  (0, i.logWarn)(`Cannot set config for property ${r} : `, e);
                }
              }),
                v(o));
            }
            function y(t, n) {
              let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = n;
              if (('string' != typeof t && ((o = t), (t = '*'), (r = n || {})), 'function' != typeof o))
                return void (0, i.logError)('listener must be a function');
              const s = { topic: t, callback: o };
              return (
                e.push(s),
                r.init && o('*' === t ? f() : { [t]: f(t) }),
                function () {
                  e.splice(e.indexOf(s), 1);
                }
              );
            }
            function v(t) {
              const n = Object.keys(t);
              (e
                .filter((e) => n.includes(e.topic))
                .forEach((e) => {
                  e.callback({ [e.topic]: t[e.topic] });
                }),
                e.filter((e) => '*' === e.topic).forEach((e) => e.callback(t)));
            }
            function E(e) {
              let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              try {
                (!(function (e) {
                  if (!(0, s.Qd)(e)) throw new Error('setBidderConfig bidder options must be an object');
                  if (!Array.isArray(e.bidders) || !e.bidders.length)
                    throw new Error('setBidderConfig bidder options must contain a bidders list with at least 1 bidder');
                  if (!(0, s.Qd)(e.config)) throw new Error('setBidderConfig bidder options must contain a config object');
                })(e),
                  e.bidders.forEach((n) => {
                    (r[n] || (r[n] = p({}, !1)),
                      Object.keys(e.config).forEach((o) => {
                        const a = e.config[o],
                          d = r[n][o];
                        if ((0, s.Qd)(a) && (null == d || (0, s.Qd)(d))) {
                          const e = t ? i.mergeDeep : Object.assign;
                          r[n][o] = e({}, d || {}, a);
                        } else r[n][o] = a;
                      }));
                  }));
              } catch (e) {
                (0, i.logError)(e);
              }
            }
            function A(e, t) {
              a = e;
              try {
                return t();
              } finally {
                w();
              }
            }
            function w() {
              a = null;
            }
            return (
              l(),
              {
                getCurrentBidder: function () {
                  return a;
                },
                resetBidder: w,
                getConfig: f,
                getAnyConfig: g,
                readConfig: m,
                readAnyConfig: h,
                setConfig: b,
                mergeConfig: function (e) {
                  if (!(0, s.Qd)(e)) return void (0, i.logError)('mergeConfig input must be an object');
                  const t = (0, i.mergeDeep)(u(), e);
                  return (b({ ...t }), t);
                },
                setDefaults: function (e) {
                  (0, s.Qd)(t) ? (Object.assign(t, e), Object.assign(n, e)) : (0, i.logError)('defaults must be an object');
                },
                resetConfig: l,
                runWithBidder: A,
                callbackWithBidder: function (e) {
                  return function (t) {
                    return function () {
                      if ('function' == typeof t) {
                        for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                        return A(e, t.bind(this, ...r));
                      }
                      (0, i.logWarn)('config.callbackWithBidder callback is not a function');
                    };
                  };
                },
                setBidderConfig: E,
                getBidderConfig: function () {
                  return r;
                },
                mergeBidderConfig: function (e) {
                  return E(e, !0);
                },
              }
            );
          })();
        },
        1958(e, t, n) {
          n.d(t, { U: () => s });
          var r = n(1748),
            i = n(466);
          const o = (0, r.m)();
          function s(e, t) {
            ((o.adServers = o.adServers || {}),
              (o.adServers[e] = o.adServers[e] || {}),
              Object.keys(t).forEach((n) => {
                o.adServers[e][n]
                  ? (0, i.logWarn)(`Attempting to add an already registered function property ${n} for AdServer ${e}.`)
                  : (o.adServers[e][n] = t[n]);
              }));
          }
        },
        2122(e, t, n) {
          n.d(t, { $T: () => a, Ni: () => r, OA: () => o, RO: () => s, fR: () => i });
          const r = 1,
            i = 2,
            o = 1,
            s = 500;
          function a(e) {
            return (e ?? []).reduce((e, t) => {
              let { event: n, method: r, url: i } = t;
              const o = (e[n] = e[n] ?? {});
              return ((o[r] = o[r] ?? []).push(i), e);
            }, {});
          }
        },
        2201(e, t, n) {
          n.d(t, { RD: () => h, g4: () => m, hd: () => b, p3: () => g });
          var r = n(5808),
            i = n(7610),
            o = n(3202),
            s = n(1933),
            a = n(2592),
            d = n(466);
          const c = {
              fetch: window.fetch.bind(window),
              makeRequest: (e, t) => new Request(e, t),
              timeout(e, t) {
                const n = new AbortController();
                let r = setTimeout(() => {
                  (n.abort(), (0, d.logError)(`Request timeout after ${e}ms`, t), (r = null));
                }, e);
                return {
                  signal: n.signal,
                  done() {
                    r && clearTimeout(r);
                  },
                };
              },
            },
            l = 'GET',
            u = 'Content-Type',
            g = (0, a.A_)(
              'async',
              function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = arguments.length > 1 ? arguments[1] : void 0,
                  n = arguments.length > 2 ? arguments[2] : void 0;
                return (e.withCredentials && (e.withCredentials = t && n ? (0, o.io)(r.yg, (0, i.s)(t, n)) : (0, d.hasDeviceAccess)()), e);
              },
              'processRequestOptions',
            );
          function f() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3,
              { request: t, done: n } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = arguments.length > 2 ? arguments[2] : void 0,
              i = arguments.length > 3 ? arguments[3] : void 0,
              o = (t, n) => {
                let o;
                (null == e ||
                  null != n?.signal ||
                  s.$W.getConfig('disableAjaxTimeout') ||
                  ((o = c.timeout(e, t)), (n = Object.assign({ signal: o.signal }, n))),
                  g(n, r, i));
                let a = c.fetch(t, n);
                return (null != o?.done && (a = a.finally(o.done)), a);
              };
            return (
              (null == t && null == n) ||
                (o = ((e) =>
                  function (r, i) {
                    const o = new URL(null == r?.url ? r : r.url, document.location).origin;
                    let s = e(r, i);
                    return (t && t(o), n && (s = s.finally(() => n(o))), s);
                  })(o)),
              o
            );
          }
          function p(e, t) {
            let n,
              { status: r, statusText: i = '', headers: o, url: s } = e;
            function a(e) {
              if (void 0 === n)
                try {
                  n = new DOMParser().parseFromString(t, o?.get(u)?.split(';')?.[0]);
                } catch (t) {
                  ((n = null), e && e(t));
                }
              return n;
            }
            return {
              readyState: XMLHttpRequest.DONE,
              status: r,
              statusText: i,
              responseText: t,
              response: t,
              responseType: '',
              responseURL: s,
              get responseXML() {
                return a(d.logError);
              },
              getResponseHeader: (e) => (o?.has(e) ? o.get(e) : null),
              toJSON() {
                return Object.assign({ responseXML: a() }, this);
              },
              timedOut: !1,
            };
          }
          function m() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3e3,
              { request: t, done: n } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const r = f(
              e,
              { request: t, done: n },
              arguments.length > 2 ? arguments[2] : void 0,
              arguments.length > 3 ? arguments[3] : void 0,
            );
            return function (e, t, n) {
              !(function (e, t) {
                const { success: n, error: r } =
                  'object' == typeof t && null != t
                    ? t
                    : { success: 'function' == typeof t ? t : () => null, error: (e, t) => (0, d.logError)('Network error', e, t) };
                e.then((e) => e.text().then((t) => [e, t])).then(
                  (e) => {
                    let [t, i] = e;
                    const o = p(t, i);
                    t.ok || 304 === t.status ? n(i, o) : r(t.statusText, o);
                  },
                  (e) => r('', Object.assign(p({ status: 0 }, ''), { reason: e, timedOut: 'AbortError' === e?.name })),
                );
              })(
                r(
                  (function (e, t) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    const r = n.method || (t ? 'POST' : l);
                    if (r === l && t) {
                      const r = (0, d.parseUrl)(e, n);
                      (Object.assign(r.search, t), (e = (0, d.buildUrl)(r)));
                    }
                    const i = new Headers(n.customHeaders);
                    i.set(u, n.contentType || 'text/plain');
                    const o = { method: r, headers: i };
                    return (
                      r !== l && t && (o.body = t),
                      n.withCredentials && (o.credentials = 'include'),
                      isSecureContext &&
                        (['browsingTopics', 'adAuctionHeaders'].forEach((e) => {
                          n[e] && (o[e] = !0);
                        }),
                        null != n.suppressTopicsEnrollmentWarning &&
                          (o.suppressTopicsEnrollmentWarning = n.suppressTopicsEnrollmentWarning)),
                      n.keepalive && (o.keepalive = !0),
                      c.makeRequest(e, o)
                    );
                  })(e, n, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}),
                ),
                t,
              );
            };
          }
          const h = m(),
            b = f();
        },
        2517(e, t, n) {
          n.d(t, { Cf: () => a, S3: () => i, Tb: () => o, WR: () => s, e4: () => c, pS: () => u, qN: () => d, yB: () => g, zt: () => r });
          const r = ['request', 'imp', 'bidResponse', 'response'],
            [i, o, s, a] = r,
            [d, c] = ['default', 'pbs'],
            l = new Set(r);
          const { registerOrtbProcessor: u, getProcessors: g } = (function () {
            const e = {};
            return {
              registerOrtbProcessor(t) {
                let { type: n, name: i, fn: o, priority: s = 0, dialects: a = [d] } = t;
                if (!l.has(n)) throw new Error(`ORTB processor type must be one of: ${r.join(', ')}`);
                a.forEach((t) => {
                  (e.hasOwnProperty(t) || (e[t] = {}), e[t].hasOwnProperty(n) || (e[t][n] = {}), (e[t][n][i] = { priority: s, fn: o }));
                });
              },
              getProcessors: (t) => e[t] || {},
            };
          })();
        },
        2592(e, t, n) {
          n.d(t, { A_: () => s, Gc: () => d, Y6: () => f, Yn: () => c, bz: () => g, u2: () => p, xG: () => u });
          var r = n(5481),
            i = n.n(r),
            o = n(3064);
          const s = i()({ ready: i().SYNC | i().ASYNC | i().QUEUE }),
            a = (0, o.v6)();
          s.ready = (() => {
            const e = s.ready;
            return function () {
              try {
                return e.apply(s);
              } finally {
                a.resolve();
              }
            };
          })();
          const d = a.promise,
            c = s.get;
          const l = {};
          function u(e, t) {
            let { postInstallAllowed: n = !1 } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            s(
              'async',
              function (r) {
                (r.forEach((e) => t(...e)), n && (l[e] = t));
              },
              e,
            )([]);
          }
          function g(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            const i = l[e];
            if (i) return i(...n);
            c(e).before((e, t) => {
              (t.push(n), e(t));
            });
          }
          function f(e, t) {
            return (
              Object.defineProperties(
                t,
                Object.fromEntries(['before', 'after', 'getHooks', 'removeAll'].map((t) => [t, { get: () => e[t] }])),
              ),
              t
            );
          }
          function p(e) {
            return f(e, function () {
              for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
              return (n.push(function () {}), e.apply(this, n));
            });
          }
        },
        3006(e, t, n) {
          n.d(t, { n: () => l });
          var r = n(466),
            i = n(1186);
          function o(e) {
            Object.assign(this, {
              getAuction(t) {
                let { auctionId: n } = t;
                if (null != n) return e().find((e) => e.getAuctionId() === n);
              },
              getAdUnit(t) {
                let { adUnitId: n } = t;
                if (null != n)
                  return e()
                    .flatMap((e) => e.getAdUnits())
                    .find((e) => e.adUnitId === n);
              },
              getMediaTypes(e) {
                let { adUnitId: t, requestId: n } = e;
                if (null != n) {
                  const e = this.getBidRequest({ requestId: n });
                  if (null != e && (null == t || e.adUnitId === t)) return e.mediaTypes;
                } else if (null != t) {
                  const e = this.getAdUnit({ adUnitId: t });
                  if (null != e) return e.mediaTypes;
                }
              },
              getBidderRequest(t) {
                let { requestId: n, bidderRequestId: r } = t;
                if (null != n || null != r) {
                  let t = e().flatMap((e) => e.getBidRequests());
                  return (
                    null != r && (t = t.filter((e) => e.bidderRequestId === r)),
                    null == n ? t[0] : t.find((e) => e.bids && null != e.bids.find((e) => e.bidId === n))
                  );
                }
              },
              getBidRequest(t) {
                let { requestId: n } = t;
                if (null != n)
                  return e()
                    .flatMap((e) => e.getBidRequests())
                    .flatMap((e) => e.bids)
                    .find((e) => e && e.bidId === n);
              },
              getOrtb2(e) {
                return this.getBidderRequest(e)?.ortb2 || this.getAuction(e)?.getFPD()?.global?.ortb2;
              },
            });
          }
          var s = n(1418),
            a = n(7841),
            d = n(939),
            c = n(5482);
          const l = (function () {
            const e = (0, d.H)({
              startTime: (e) => e.end.then(() => e.getAuctionEnd()),
              ttl: (e) =>
                null == (0, c.S9)() ? null : e.end.then(() => 1e3 * Math.max((0, c.S9)(), ...e.getBidsReceived().map((e) => e.ttl))),
            });
            (0, c.lc)(() => e.refresh());
            const t = { onExpiry: e.onExpiry };
            function n(t) {
              for (const n of e) if (n.getAuctionId() === t) return n;
            }
            function l() {
              return e.toArray().flatMap((e) => e.getBidsReceived());
            }
            return (
              (t.addWinningBid = function (e) {
                const t = (0, a.BO)(e.metrics);
                (t.checkpoint('bidWon'),
                  t.timeBetween('auctionEnd', 'bidWon', 'adserver.pending'),
                  t.timeBetween('requestBids', 'bidWon', 'adserver.e2e'));
                const i = n(e.auctionId);
                i ? i.addWinningBid(e) : (0, r.logWarn)('Auction not found when adding winning bid');
              }),
              Object.entries({
                getAllWinningBids: { name: 'getWinningBids' },
                getBidsRequested: { name: 'getBidRequests' },
                getNoBids: {},
                getAdUnits: {},
                getBidsReceived: { pre: (e) => e.getAuctionStatus() === i.UZ },
                getAdUnitCodes: { post: r.uniques },
              }).forEach((n) => {
                let [r, { name: i = r, pre: o, post: s }] = n;
                const a = null == o ? (e) => e[i]() : (e) => (o(e) ? e[i]() : []),
                  d = null == s ? (e) => e : (e) => e.filter(s);
                t[r] = () => d(e.toArray().flatMap(a));
              }),
              (t.getAllBidsForAdUnitCode = function (e) {
                return l().filter((t) => t && t.adUnitCode === e);
              }),
              (t.createAuction = function (t) {
                const n = (0, i.mX)(t);
                return (
                  (function (t) {
                    e.add(t);
                  })(n),
                  n
                );
              }),
              (t.findBidByAdId = function (e) {
                return l().find((t) => t.adId === e);
              }),
              (t.getStandardBidderAdServerTargeting = function () {
                return (0, i.HN)()[s.iD.ADSERVER_TARGETING];
              }),
              (t.setStatusForBids = function (e, r) {
                const i = t.findBidByAdId(e);
                if ((i && (i.status = r), i && r === s.tl.BID_TARGETING_SET)) {
                  const e = n(i.auctionId);
                  e && e.setBidTargeting(i);
                }
              }),
              (t.getLastAuctionId = function () {
                const t = e.toArray();
                return t.length && t[t.length - 1].getAuctionId();
              }),
              (t.clearAllAuctions = function () {
                e.clear();
              }),
              (t.index = new o(() => e.toArray())),
              t
            );
          })();
        },
        3064(e, t, n) {
          n.d(t, { U9: () => o, cb: () => s, v6: () => a });
          var r = n(1748);
          const i = (0, r.m)().setTimeout ?? setTimeout,
            o = (0, r.m)().Promise ?? Promise;
          function s() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            return new o((t) => {
              i(t, e);
            });
          }
          function a() {
            let e,
              t,
              { promiseFactory: n = (e) => new o(e) } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            function r(e) {
              return (t) => e(t);
            }
            return {
              promise: n((n, r) => {
                ((e = n), (t = r));
              }),
              resolve: r(e),
              reject: r(t),
            };
          }
        },
        3129(e, t, n) {
          n.d(t, { Q: () => r });
          const r = (0, n(2592).A_)('sync', () => {});
        },
        3202(e, t, n) {
          n.d(t, { io: () => s, qB: () => o });
          var r = n(466),
            i = n(5291);
          const [o, s] = (function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, r.prefixLog)('Activity control:');
            const t = {};
            function n(e) {
              return ((t[e] = t[e] || []), t[e]);
            }
            function o(t, n, r, o) {
              let s;
              try {
                s = r(o);
              } catch (r) {
                (e.logError(`Exception in rule ${n} for '${t}'`, r), (s = { allow: !1, reason: r }));
              }
              return s && Object.assign({ activity: t, name: n, component: o[i.Ii] }, s);
            }
            const s = {};
            function a(t) {
              let { activity: n, name: r, allow: i, reason: o, component: a } = t;
              const d = `${r} ${i ? 'allowed' : 'denied'} '${n}' for '${a}'${o ? ':' : ''}`,
                c = s.hasOwnProperty(d);
              if ((c && clearTimeout(s[d]), (s[d] = setTimeout(() => delete s[d], 1e3)), !c)) {
                const t = [d];
                (o && t.push(o), (i ? e.logInfo : e.logWarn).apply(e, t));
              }
            }
            return [
              function (e, t, r) {
                let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 10;
                const o = n(e),
                  s = o.findIndex((e) => {
                    let [t] = e;
                    return i < t;
                  }),
                  a = [i, t, r];
                return (
                  o.splice(s < 0 ? o.length : s, 0, a),
                  function () {
                    const e = o.indexOf(a);
                    e >= 0 && o.splice(e, 1);
                  }
                );
              },
              function (e, t) {
                let r, i;
                for (const [s, d, c] of n(e)) {
                  if (r !== s && i) break;
                  r = s;
                  const n = o(e, d, c, t);
                  if (n) {
                    if (!n.allow) return (a(n), !1);
                    i = n;
                  }
                }
                return (i && a(i), !0);
              },
            ];
          })();
        },
        3320(e, t, n) {
          n.d(t, { O: () => o });
          var r = n(466);
          function i() {
            let {
              src: e = 'client',
              bidder: t = '',
              bidId: n,
              transactionId: i,
              adUnitId: o,
              auctionId: s,
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            var a = e;
            (Object.assign(this, {
              bidderCode: t,
              width: 0,
              height: 0,
              adId: (0, r.getUniqueIdentifierStr)(),
              requestId: n,
              transactionId: i,
              adUnitId: o,
              auctionId: s,
              mediaType: 'banner',
              source: a,
            }),
              (this.getSize = function () {
                return this.width + 'x' + this.height;
              }));
          }
          function o(e) {
            return new i(e);
          }
        },
        3391(e, t, n) {
          n.d(t, { qh: () => g, zt: () => p });
          var r = n(466),
            i = n(6665),
            o = n(1933),
            s = n(1443),
            a = n(3202),
            d = n(5808),
            c = n(5291),
            l = n(736),
            u = n(7610);
          const g = {
            syncEnabled: !0,
            filterSettings: { image: { bidders: '*', filter: 'include' } },
            syncsPerBidder: 5,
            syncDelay: 3e3,
            auctionDelay: 500,
          };
          o.$W.setDefaults({ userSync: (0, i.Go)(g) });
          const f = (0, s.CK)('usersync');
          const p = (function (e) {
            const t = {};
            let n = { image: [], iframe: [] };
            const s = new Set();
            let a = {};
            const g = { image: !0, iframe: !1 };
            let f = e.config;
            function p() {
              if (f.syncEnabled && e.browserSupportsCookies) {
                try {
                  (!(function () {
                    if (!g.iframe) return;
                    m(n.iframe, (e) => {
                      const [t, i] = e;
                      ((0, r.logMessage)(`Invoking iframe user sync for bidder: ${t}`),
                        (0, r.insertUserSyncIframe)(i),
                        (function (e, t) {
                          e.image = e.image.filter((e) => e[0] !== t);
                        })(n, t));
                    });
                  })(),
                    (function () {
                      if (!g.image) return;
                      m(n.image, (e) => {
                        const [t, n] = e;
                        ((0, r.logMessage)(`Invoking image pixel user sync for bidder: ${t}`), (0, r.triggerPixel)(n));
                      });
                    })());
                } catch (e) {
                  return (0, r.logError)('Error firing user syncs', e);
                }
                n = { image: [], iframe: [] };
              }
            }
            function m(e, t) {
              (0, r.shuffle)(e).forEach(t);
            }
            function h(e, t) {
              const n = f.filterSettings;
              if (
                (function (e, t) {
                  if (e.all && e[t])
                    return (
                      (0, r.logWarn)(
                        `Detected presence of the "filterSettings.all" and "filterSettings.${t}" in userSync config.  You cannot mix "all" with "iframe/image" configs; they are mutually exclusive.`,
                      ),
                      !1
                    );
                  const n = e.all ? e.all : e[t],
                    o = e.all ? 'all' : t;
                  if (!n) return !1;
                  const s = n.filter,
                    a = n.bidders;
                  if (s && 'include' !== s && 'exclude' !== s)
                    return (
                      (0, r.logWarn)(
                        `UserSync "filterSettings.${o}.filter" setting '${s}' is not a valid option; use either 'include' or 'exclude'.`,
                      ),
                      !1
                    );
                  if ('*' !== a && !(Array.isArray(a) && a.length > 0 && a.every((e) => (0, i.O8)(e) && '*' !== e)))
                    return (
                      (0, r.logWarn)(
                        `Detected an invalid setup in userSync "filterSettings.${o}.bidders"; use either '*' (to represent all bidders) or an array of bidders.`,
                      ),
                      !1
                    );
                  return !0;
                })(n, e)
              ) {
                g[e] = !0;
                const r = n.all ? n.all : n[e],
                  i = '*' === r.bidders ? [t] : r.bidders,
                  o = { include: (e, t) => !e.includes(t), exclude: (e, t) => e.includes(t) };
                return o[r.filter || 'include'](i, t);
              }
              return !g[e];
            }
            return (
              o.$W.getConfig('userSync', (e) => {
                if (e.userSync) {
                  const t = e.userSync.filterSettings;
                  (0, i.Qd)(t) && (t.image || t.all || (e.userSync.filterSettings.image = { bidders: '*', filter: 'include' }));
                }
                f = Object.assign(f, e.userSync);
              }),
              e.regRule(d.Ml, 'userSync config', (e) => {
                if (!f.syncEnabled) return { allow: !1, reason: 'syncs are disabled' };
                if (e[c.Dk] === l.tW) {
                  const n = e[c.bt],
                    r = e[c.iK];
                  if (!t.canBidderRegisterSync(n, r)) return { allow: !1, reason: `${n} syncs are not enabled for ${r}` };
                }
              }),
              (t.registerSync = (t, o, g) =>
                s.has(o)
                  ? (0, r.logMessage)(`already fired syncs for "${o}", ignoring registerSync call`)
                  : f.syncEnabled && (0, i.cy)(n[t])
                    ? o
                      ? 0 !== f.syncsPerBidder && Number(a[o]) >= f.syncsPerBidder
                        ? (0, r.logWarn)(`Number of user syncs exceeded for "${o}"`)
                        : void (
                            e.isAllowed(d.Ml, (0, u.s)(l.tW, o, { [c.bt]: t, [c.e3]: g })) &&
                            (n[t].push([o, g]),
                            (a = (function (e, t) {
                              return (e[t] ? (e[t] += 1) : (e[t] = 1), e);
                            })(a, o)))
                          )
                      : (0, r.logWarn)('Bidder is required for registering sync')
                    : (0, r.logWarn)(`User sync type "${t}" not supported`)),
              (t.bidderDone = s.add.bind(s)),
              (t.syncUsers = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                if (e) return setTimeout(p, Number(e));
                p();
              }),
              (t.triggerUserSyncs = () => {
                f.enableOverride && t.syncUsers();
              }),
              (t.canBidderRegisterSync = (e, t) => !f.filterSettings || !h(e, t)),
              t
            );
          })(
            Object.defineProperties(
              { config: o.$W.getConfig('userSync'), isAllowed: a.io, regRule: a.qB },
              {
                browserSupportsCookies: {
                  get: function () {
                    return !(0, r.isSafariBrowser)() && f.cookiesAreEnabled();
                  },
                },
              },
            ),
          );
        },
        3448(e, t, n) {
          function r(e) {
            return !e?.gdprApplies || !0 === e?.vendorData?.purpose?.consents?.[1];
          }
          n.d(t, { C: () => r });
        },
        3556(e, t, n) {
          n.d(t, { xb: () => C, a$: () => I });
          var r = n(8668),
            i = n(1933),
            o = n(3320),
            s = n(3391),
            a = n(356),
            d = n(6220),
            c = n(1418),
            l = n(8014),
            u = n(6665),
            g = n(466),
            f = n(2592),
            p = n(3006),
            m = n(7156),
            h = n(7841),
            b = n(3202),
            y = n(7610),
            v = n(736),
            E = n(5808);
          const A = ['cpm', 'ttl', 'creativeId', 'netRevenue', 'currency'],
            w = { auctionId: (e) => e.ortb2?.source?.tid, transactionId: (e) => e.ortb2Imp?.ext?.tid };
          function I(e) {
            const t = Array.isArray(e.supportedMediaTypes) ? { supportedMediaTypes: e.supportedMediaTypes } : void 0;
            function n(e) {
              const n = C(e);
              r.Ay.registerBidAdapter(n, e.code, t);
            }
            (n(e),
              Array.isArray(e.aliases) &&
                e.aliases.forEach((t) => {
                  let i,
                    o,
                    s = t;
                  ((0, u.Qd)(t) && ((s = t.code), (i = t.gvlid), (o = t.skipPbsAliasing)),
                    (r.Ay.aliasRegistry[s] = e.code),
                    n(Object.assign({}, e, { code: s, gvlid: i, skipPbsAliasing: o })));
                }));
          }
          const T = (0, g.memoize)((e) => {
            let { bidderCode: t } = e;
            const n = (0, b.io)(E.VJ, (0, y.s)(v.tW, t));
            function r(e, t, r) {
              return w.hasOwnProperty(t) ? (n ? w[t](e) : null) : Reflect.get(e, t, r);
            }
            function i(e, t) {
              const n = new Proxy(e, t);
              return (
                Object.entries(e)
                  .filter((e) => {
                    let [t, n] = e;
                    return 'function' == typeof n;
                  })
                  .forEach((t) => {
                    let [r, i] = t;
                    n[r] = i.bind(e);
                  }),
                n
              );
            }
            const o = (0, g.memoize)(
              (e) => i(e, { get: r }),
              (e) => e.bidId,
            );
            return { bidRequest: o, bidderRequest: (e) => i(e, { get: (t, n, i) => ('bids' === n ? e.bids.map(o) : r(t, n, i)) }) };
          });
          function C(e) {
            return Object.assign(
              ((t = e.code),
              (n = t),
              {
                callBids: function () {},
                setBidderCode: function (e) {
                  n = e;
                },
                getBidderCode: function () {
                  return n;
                },
              }),
              {
                getSpec: function () {
                  return Object.freeze(Object.assign({}, e));
                },
                registerSyncs: s,
                callBids: function (t, n, f, b, y, v) {
                  if (!Array.isArray(t.bids)) return;
                  const E = T(t),
                    I = {};
                  function C(e, t) {
                    const r = (0, h.BO)(t.metrics);
                    (r.checkpoint('addBidResponse'),
                      (I[e] = !0),
                      r.measureTime('addBidResponse.validate', () =>
                        (function (e, t) {
                          let { index: n = p.n.index } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                          function r() {
                            const e = Object.keys(t);
                            return A.every((n) => e.includes(n) && ![void 0, null].includes(t[n]));
                          }
                          function i(e) {
                            return `Invalid bid from ${t.bidderCode}. Ignoring bid: ${e}`;
                          }
                          if (!e) return ((0, g.logWarn)('No adUnitCode was supplied to addBidResponse.'), !1);
                          if (!t) return ((0, g.logWarn)(`Some adapter tried to add an undefined bid for ${e}.`), !1);
                          if (!r())
                            return (
                              (0, g.logError)(
                                i(
                                  `Bidder ${t.bidderCode} is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params.`,
                                ),
                              ),
                              !1
                            );
                          if ('native' === t.mediaType && !(0, a.Bm)(t, { index: n }))
                            return ((0, g.logError)(i('Native bid missing some required properties.')), !1);
                          if ('video' === t.mediaType && !(0, d.vk)(t, { index: n }))
                            return ((0, g.logError)(i('Video bid does not have required vastUrl or renderer property')), !1);
                          if (
                            'banner' === t.mediaType &&
                            !(function (e, t) {
                              let { index: n = p.n.index } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                              if ((t.width || 0 === parseInt(t.width, 10)) && (t.height || 0 === parseInt(t.height, 10)))
                                return ((t.width = parseInt(t.width, 10)), (t.height = parseInt(t.height, 10)), !0);
                              if (null != t.wratio && null != t.hratio)
                                return ((t.wratio = parseInt(t.wratio, 10)), (t.hratio = parseInt(t.hratio, 10)), !0);
                              const r = n.getBidRequest(t),
                                i = n.getMediaTypes(t),
                                o = (r && r.sizes) || (i && i.banner && i.banner.sizes),
                                s = (0, g.parseSizesInput)(o);
                              if (1 === s.length) {
                                const [e, n] = s[0].split('x');
                                return ((t.width = parseInt(e, 10)), (t.height = parseInt(n, 10)), !0);
                              }
                              return !1;
                            })(e, t, { index: n })
                          )
                            return ((0, g.logError)(i('Banner bids require a width and height')), !1);
                          return !0;
                        })(e, t),
                      )
                        ? n(e, t)
                        : n.reject(e, t, c.Tf.INVALID));
                  }
                  const S = [];
                  function B() {
                    (f(),
                      i.$W.runWithBidder(e.code, () => {
                        (l.Ic(c.qY.BIDDER_DONE, t), s(S, t.gdprConsent, t.uspConsent, t.gppConsent));
                      }));
                  }
                  const k = U(t).measureTime('validate', () =>
                    t.bids.filter((t) =>
                      (function (t) {
                        if (!e.isBidRequestValid(t))
                          return ((0, g.logWarn)(`Invalid bid sent to bidder ${e.code}: ${JSON.stringify(t)}`), !1);
                        return !0;
                      })(E.bidRequest(t)),
                    ),
                  );
                  if (0 === k.length) return void B();
                  const D = {};
                  (k.forEach((e) => {
                    D[e.bidId] = e;
                  }),
                    O(e, k, t, b, v, {
                      onRequest: (e) => l.Ic(c.qY.BEFORE_BIDDER_HTTP, t, e),
                      onResponse: (t) => {
                        (y(e.code), S.push(t));
                      },
                      onPaapi: (e) => {
                        const t = D[e.bidId];
                        t ? R(t, e) : (0, g.logWarn)('Received fledge auction configuration for an unknown bidId', e);
                      },
                      onError: (n, i) => {
                        (i.timedOut || y(e.code),
                          r.Ay.callBidderError(e.code, i, t),
                          l.Ic(c.qY.BIDDER_ERROR, { error: i, bidderRequest: t }),
                          (0, g.logError)(`Server call for ${e.code} failed: ${n} ${i.status}. Continuing without bids.`, {
                            bidRequests: k,
                          }));
                      },
                      onBid: (t) => {
                        const r = D[t.requestId],
                          i = t;
                        if (r) {
                          if (
                            ((i.adapterCode = r.bidder),
                            (function (e, t) {
                              const n = m.u.get(t, 'allowAlternateBidderCodes') || !1;
                              let r = m.u.get(t, 'allowedAlternateBidderCodes');
                              if (
                                e &&
                                t &&
                                t !== e &&
                                ((r = (0, u.cy)(r)
                                  ? r
                                      .map((e) => e.trim().toLowerCase())
                                      .filter((e) => !!e)
                                      .filter(g.uniques)
                                  : r),
                                !n || ((0, u.cy)(r) && '*' !== r[0] && !r.includes(e)))
                              )
                                return !0;
                              return !1;
                            })(t.bidderCode, r.bidder))
                          )
                            return (
                              (0, g.logWarn)(
                                `${t.bidderCode} is not a registered partner or known bidder of ${r.bidder}, hence continuing without bid. If you wish to support this bidder, please mark allowAlternateBidderCodes as true in bidderSettings.`,
                              ),
                              void n.reject(r.adUnitCode, t, c.Tf.BIDDER_DISALLOWED)
                            );
                          ((i.originalCpm = t.cpm),
                            (i.originalCurrency = t.currency),
                            (i.meta = t.meta || Object.assign({}, t[r.bidder])),
                            (i.deferBilling = r.deferBilling),
                            (i.deferRendering = i.deferBilling && (t.deferRendering ?? 'function' != typeof e.onBidBillable)));
                          const s = Object.assign((0, o.O)(r), i, (0, g.pick)(r, Object.keys(w)));
                          C(r.adUnitCode, s);
                        } else
                          ((0, g.logWarn)(`Bidder ${e.code} made bid for unknown request ID: ${t.requestId}. Ignoring.`),
                            n.reject(null, t, c.Tf.INVALID_REQUEST_ID));
                      },
                      onCompletion: B,
                    }));
                },
              },
            );
            var t, n;
            function s(t, n, r, i) {
              B(e, t, n, r, i);
            }
          }
          const S = ['bids', 'paapi'],
            O = (0, f.A_)(
              'async',
              function (e, t, n, r, i, o) {
                let { onRequest: s, onResponse: a, onPaapi: d, onError: l, onBid: f, onCompletion: p } = o;
                const h = U(n);
                p = h.startTiming('total').stopBefore(p);
                const A = T(n);
                let w = h.measureTime('buildRequests', () => e.buildRequests(t.map(A.bidRequest), A.bidderRequest(n)));
                if ((Array.isArray(w) || (w = [w]), !w || 0 === w.length)) return void p();
                const I = (0, g.delayExecution)(p, w.length);
                w.forEach((t) => {
                  const n = h.fork();
                  function o(e) {
                    (null != e && (e.metrics = n.fork().renameWith()), f(e));
                  }
                  const p = i(function (r, i) {
                      w();
                      try {
                        r = JSON.parse(r);
                      } catch (e) {}
                      ((r = { body: r, headers: { get: i.getResponseHeader.bind(i) } }), a(r));
                      try {
                        r = n.measureTime('interpretResponse', () => e.interpretResponse(r, t));
                      } catch (t) {
                        return (
                          (0, g.logError)(`Bidder ${e.code} failed to interpret the server's response. Continuing without bids`, null, t),
                          void I()
                        );
                      }
                      let s, c;
                      (r && !Object.keys(r).some((e) => !S.includes(e)) ? ((s = r.bids), (c = r.paapi)) : (s = r),
                        (0, u.cy)(c) && c.forEach(d),
                        s && ((0, u.cy)(s) ? s.forEach(o) : o(s)),
                        I());
                    }),
                    A = i(function (e, t) {
                      (w(), l(e, t), I());
                    });
                  s(t);
                  const w = n.startTiming('net'),
                    T = 'TRUE' === (0, g.getParameterByName)(c.M).toUpperCase() || (0, g.debugTurnedOn)();
                  function C(n) {
                    const r = t.options;
                    return Object.assign(n, r, {
                      browsingTopics:
                        !(r?.hasOwnProperty('browsingTopics') && !r.browsingTopics) &&
                        (m.u.get(e.code, 'topicsHeader') ?? !0) &&
                        (0, b.io)(E.DL, (0, y.s)(v.tW, e.code)),
                      suppressTopicsEnrollmentWarning: r?.hasOwnProperty('suppressTopicsEnrollmentWarning')
                        ? r.suppressTopicsEnrollmentWarning
                        : !T,
                    });
                  }
                  switch (t.method) {
                    case 'GET':
                      r(
                        `${t.url}${(function (e) {
                          if (e) return `?${'object' == typeof e ? (0, g.parseQueryStringParameters)(e) : e}`;
                          return '';
                        })(t.data)}`,
                        { success: p, error: A },
                        void 0,
                        C({ method: 'GET', withCredentials: !0 }),
                      );
                      break;
                    case 'POST':
                      const n = t.options?.endpointCompression,
                        i = (e) => {
                          let { url: t, payload: n } = e;
                          r(t, { success: p, error: A }, n, C({ method: 'POST', contentType: 'text/plain', withCredentials: !0 }));
                        };
                      (n && T && (0, g.logWarn)(`Skipping GZIP compression for ${e.code} as debug mode is enabled`),
                        n && !T && (0, g.isGzipCompressionSupported)()
                          ? (0, g.compressDataWithGZip)(t.data).then((e) => {
                              const n = new URL(t.url);
                              (n.searchParams.has('gzip') || n.searchParams.set('gzip', '1'), i({ url: n.href, payload: e }));
                            })
                          : i({ url: t.url, payload: 'string' == typeof t.data ? t.data : JSON.stringify(t.data) }));
                      break;
                    default:
                      ((0, g.logWarn)(`Skipping invalid request from ${e.code}. Request type ${t.method} must be GET or POST`), I());
                  }
                });
              },
              'processBidderRequests',
            ),
            B = (0, f.A_)(
              'async',
              function (e, t, n, o, a) {
                const d = i.$W.getConfig('userSync.aliasSyncEnabled');
                if (e.getUserSyncs && (d || !r.Ay.aliasRegistry[e.code])) {
                  let r = e.getUserSyncs(
                    {
                      iframeEnabled: s.zt.canBidderRegisterSync('iframe', e.code),
                      pixelEnabled: s.zt.canBidderRegisterSync('image', e.code),
                    },
                    t,
                    n,
                    o,
                    a,
                  );
                  r &&
                    (Array.isArray(r) || (r = [r]),
                    r.forEach((t) => {
                      s.zt.registerSync(t.type, e.code, t.url);
                    }),
                    s.zt.bidderDone(e.code));
                }
              },
              'registerSyncs',
            ),
            R = (0, f.A_)('sync', (e, t) => {}, 'addPaapiConfig');
          function U(e) {
            return (0, h.BO)(e.metrics).renameWith((t) => [`adapter.client.${t}`, `adapters.client.${e.bidderCode}.${t}`]);
          }
        },
        3958(e, t, n) {
          n.d(t, { Vv: () => d, Ot: () => s, Bp: () => a });
          var r = n(466);
          const i = new (function e(t, n) {
              const r = {};
              let i = {};
              const o = [];
              (Object.entries(n).forEach((n) => {
                let [s, a] = n;
                if (null != a && 'object' == typeof a) {
                  const n = new e(() => t()?.[s], a);
                  ((r[s] = n.obj), o.push(n.reset));
                } else !0 === a && Object.defineProperty(r, s, { get: () => (i.hasOwnProperty(s) || (i[s] = t()?.[s]), i[s]) });
              }),
                (this.obj = r),
                (this.reset = function () {
                  (o.forEach((e) => e()), (i = {}));
                }));
            })(() => ((0, r.canAccessWindowTop)() ? r.internal.getWindowTop() : r.internal.getWindowSelf()), {
              innerHeight: !0,
              innerWidth: !0,
              screen: { width: !0, height: !0 },
              visualViewport: { width: !0, height: !0 },
              document: {
                documentElement: { clientWidth: !0, clientHeight: !0, scrollTop: !0, scrollLeft: !0 },
                body: { scrollTop: !0, scrollLeft: !0, clientWidth: !0, clientHeight: !0 },
              },
            }),
            o = { winDimensions: i },
            s = (() => {
              let e;
              return function () {
                return ((!e || Date.now() - e > 20) && (o.winDimensions.reset(), (e = Date.now())), o.winDimensions.obj);
              };
            })();
          function a() {
            o.winDimensions.reset();
          }
          function d(e) {
            const t = e ?? ((0, r.canAccessWindowTop)() ? r.internal.getWindowTop() : r.internal.getWindowSelf()),
              n = t?.screen ?? r.internal.getWindowSelf()?.screen ?? window?.screen,
              i = Number(n?.width),
              o = Number(n?.height);
            if (Number.isFinite(i) && Number.isFinite(o)) return o >= i ? 'portrait' : 'landscape';
          }
        },
        4367(e, t, n) {
          n.d(t, { xu: () => be, gH: () => Ie });
          var r = n(1748),
            i = n(466),
            o = n(6665),
            s = n(8928),
            a = n(3435),
            d = n(356),
            c = n(1418),
            l = n(1852),
            u = n(5144),
            g = n(3064);
          const { REQUEST: f, RESPONSE: p, NATIVE: m, EVENT: h } = c.nl,
            b = {
              [f]: function (e, t, n) {
                (0, l.bw)({
                  renderFn(t) {
                    e(Object.assign({ message: p, renderer: (0, u.kj)(n), rendererVersion: u.xh }, t));
                  },
                  resizeFn: v(t.adId, n),
                  options: t.options,
                  adId: t.adId,
                  bidResponse: n,
                });
              },
              [h]: function (e, t, n) {
                if (null == n) return void (0, i.logError)(`Cannot find ad '${t.adId}' for x-origin event request`);
                if (n.status !== c.tl.RENDERED)
                  return void (0, i.logWarn)(`Received x-origin event request without corresponding render request for ad '${n.adId}'`);
                return (0, l.Uc)(t, n);
              },
            };
          function y() {
            window.addEventListener(
              'message',
              function (e) {
                !(function (e, t) {
                  var n = e.message ? 'message' : 'data',
                    r = {};
                  try {
                    r = JSON.parse(e[n]);
                  } catch (e) {
                    return;
                  }
                  if (r && r.adId && r.message && b.hasOwnProperty(r.message))
                    (0, l.$A)(r.adId, r.message === c.nl.REQUEST, (n) => {
                      var o, s;
                      (b[r.message](
                        ((o = r.adId),
                        (s = (function (e) {
                          return null == e.origin && 0 === e.ports.length
                            ? function () {
                                const e =
                                  'Cannot post message to a frame with null origin. Please update creatives to use MessageChannel, see https://github.com/prebid/Prebid.js/issues/7870';
                                throw ((0, i.logError)(e), new Error(e));
                              }
                            : e.ports.length > 0
                              ? function (t) {
                                  e.ports[0].postMessage(JSON.stringify(t));
                                }
                              : function (t) {
                                  e.source.postMessage(JSON.stringify(t), e.origin);
                                };
                        })(e)),
                        function (e) {
                          for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                          return s(Object.assign({}, e, { adId: o }), ...n);
                        }),
                        r,
                        n,
                      ),
                        t && t());
                    });
                })(e);
              },
              !1,
            );
          }
          function v(e, t) {
            return function (n, r) {
              !(function (e) {
                let { instl: t, adId: n, adUnitCode: r, width: o, height: s } = e;
                if (t) return;
                function a(e) {
                  if (e) {
                    const t = e.style;
                    ((t.width = E(o)), (t.height = E(s)));
                  } else
                    (0, i.logError)(
                      `Unable to locate matching page element for adUnitCode ${r}.  Can't resize it to ad's dimensions.  Please review setup.`,
                    );
                }
                const d = l('iframe:not([style*="display: none"])');
                a(d);
                const c = d?.closest('ins[data-anchor-status]');
                function l(e) {
                  const t = u(n, r),
                    i = document.getElementById(t);
                  return i && i.querySelector(e);
                }
                function u(e, t) {
                  if ((0, i.isGptPubadsDefined)()) {
                    const t = f(e);
                    if (t) return t;
                  }
                  if ((0, i.isApnGetTagDefined)()) {
                    const e = p(t);
                    if (e) return e;
                  }
                  return t;
                }
                function f(e) {
                  const t = window.googletag
                    .pubads()
                    .getSlots()
                    .find((t) => t.getTargetingKeys().find((n) => t.getTargeting(n).includes(e)));
                  return t ? t.getSlotElementId() : null;
                }
                function p(e) {
                  const t = window.apntag.getTag(e);
                  return t && t.targetId;
                }
                c
                  ? (function (e, t, n) {
                      new g.U9((r, i) => {
                        let o = 10;
                        const s = setInterval(() => {
                          let a = !1;
                          (Object.entries({ width: t, height: n }).forEach((t) => {
                            let [n, r] = t;
                            /\d+px/.test(e.style[n]) && ((e.style[n] = E(r)), (a = !0));
                          }),
                            (a || 0 === o--) && (clearInterval(s), a ? r() : i(new Error('Could not resize anchor'))));
                        }, 50);
                      });
                    })(c, o, s)
                  : a(d?.parentElement);
              })({ ...t, width: n, height: r, adId: e });
            };
          }
          function E(e) {
            return e ? e + 'px' : '100%';
          }
          Object.assign(b, {
            [m]: function (e, t, n) {
              if (null == n) return void (0, i.logError)(`Cannot find ad for x-origin event request: '${t.adId}'`);
              switch (t.action) {
                case 'assetRequest':
                  (0, l.Hh)(n, () => e((0, d.IX)(t, n)));
                  break;
                case 'allAssetRequest':
                  (0, l.Hh)(n, () => e((0, d.yl)(t, n)));
                  break;
                default:
                  ((0, l.vW)(t, n, { resizeFn: v(t.adId, n) }), (0, l.Pk)(n));
              }
            },
          });
          var A = n(3391),
            w = n(1933),
            I = n(3006),
            T = n(869),
            C = n(2592),
            S = n(3320),
            O = n(5049),
            B = n(736),
            R = n(9794),
            U = n(7464),
            k = n(765);
          const D = `__${(0, k.k)()}_debugging__`;
          function _() {
            return (0, r.m)().installedModules.includes('debugging');
          }
          function $(e) {
            return new g.U9((t, n) => {
              (0, O.R)(e, B.tp, 'debugging', { success: t, error: n });
            });
          }
          function x() {
            let { alreadyInstalled: e = _, script: t = $ } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = null;
            return function () {
              return (
                null == n &&
                  (n = new g.U9((n, o) => {
                    setTimeout(() => {
                      if (e()) n();
                      else {
                        const e = `${(0, k.rT)()}debugging-standalone.js`;
                        ((0, i.logMessage)(`Debugging module not installed, loading it from "${e}"...`),
                          ((0, r.m)()._installDebugging = !0),
                          t(e)
                            .then(() => {
                              (0, r.m)()._installDebugging({
                                DEBUG_KEY: D,
                                hook: C.A_,
                                config: w.$W,
                                createBid: S.O,
                                logger: (0, i.prefixLog)('DEBUG:'),
                                utils: i,
                                BANNER: R.D4,
                                NATIVE: R.s6,
                                VIDEO: R.G_,
                                Renderer: U.A4,
                              });
                            })
                            .then(n, o));
                      }
                    });
                  })),
                n
              );
            };
          }
          const q = (function () {
            let { load: e = x(), hook: t = (0, C.Yn)('requestBids') } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = null,
              r = !1;
            function o(e) {
              for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
              return (n || g.U9.resolve())
                .catch((e) => {
                  (0, i.logError)('Could not load debugging module', e);
                })
                .then(() => e.apply(this, r));
            }
            function s() {
              (t.getHooks({ hook: o }).remove(), (r = !1));
            }
            return {
              enable: function () {
                r || ((n = e()), t.before(o, 99), (r = !0));
              },
              disable: s,
              reset: function () {
                ((n = null), s());
              },
            };
          })();
          q.reset;
          w.$W.getConfig('debugging', function (e) {
            let { debugging: t } = e;
            t?.enabled ? q.enable() : q.disable();
          });
          var W = n(1443),
            j = n(8668),
            N = n(8014),
            P = n(7841),
            M = n(8034),
            F = n(1385),
            G = n(9236),
            L = n(6220);
          const z = [
              ['format', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'object' == typeof e)],
              ['w', o.Fq],
              ['h', o.Fq],
              ['btype', o.Uu],
              ['battr', o.Uu],
              ['pos', o.Fq],
              ['mimes', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'string' == typeof e)],
              ['topframe', (e) => [1, 0].includes(e)],
              ['expdir', o.Uu],
              ['api', o.Uu],
              ['id', o.O8],
              ['vcm', (e) => [1, 0].includes(e)],
            ],
            H = new Map(z);
          function V(e, t) {
            var n = this;
            return function () {
              for (var r = arguments.length, o = new Array(r), s = 0; s < r; s++) o[s] = arguments[s];
              return document.prerendering && e()
                ? new Promise((e) => {
                    document.addEventListener(
                      'prerenderingchange',
                      () => {
                        ((0, i.logInfo)('Auctions were suspended while page was prerendering'), e(t.apply(n, o)));
                      },
                      { once: !0 },
                    );
                  })
                : Promise.resolve(t.apply(n, o));
            };
          }
          var Q = n(3556);
          const J = (0, C.A_)('sync', function (e) {
            return (
              [
                Y,
                K('source.schain', 'source.ext.schain', 'source.ext.schain'),
                K('device.sua', 'device.ext.sua', 'device.sua'),
                K('regs.gdpr', 'regs.ext.gdpr', 'regs.ext.gdpr'),
                K('user.consent', 'user.ext.consent', 'user.ext.consent'),
                K('regs.us_privacy', 'regs.ext.us_privacy', 'regs.ext.us_privacy'),
                K('regs.gpp', 'regs.ext.gpp', 'regs.gpp'),
                K('regs.gpp_sid', 'regs.ext.gpp_sid', 'regs.gpp_sid'),
              ].forEach((t) =>
                (function (e, t) {
                  ((t.global = e(t.global, 'global FPD')),
                    Object.entries(t.bidder).forEach((n) => {
                      let [r, i] = n;
                      t.bidder[r] = e(i, `bidder '${r}' FPD`);
                    }));
                })(t, e),
              ),
              e
            );
          });
          function Y(e, t) {
            if (!e) return e;
            const n = [],
              r = [...(e?.user?.eids ?? []).map((e) => [0, e]), ...(e?.user?.ext?.eids ?? []).map((e) => [1, e])].filter((e) => {
                let [r, o] = e;
                return n.findIndex((e) => {
                  let [t, n] = e;
                  return r !== t && (0, i.deepEqual)(n, o);
                }) > -1
                  ? ((0, i.logWarn)(`Found duplicate EID in user.eids and user.ext.eids (${t})`, o), !1)
                  : (n.push([r, o]), !0);
              });
            return (
              r.length > 0 &&
                (0, a.J)(
                  e,
                  'user.ext.eids',
                  r.map((e) => {
                    let [t, n] = e;
                    return n;
                  }),
                ),
              delete e?.user?.eids,
              e
            );
          }
          function K(e, t, n) {
            if (n !== e && n !== t) throw new Error('invalid argument');
            const r = (n === e ? t : e).split('.'),
              o = r.pop(),
              d = r.join('.');
            return function (r, c) {
              if (!r) return r;
              const l = (0, s.A)(r, e),
                u = (0, s.A)(r, t);
              (null == l ||
                null == u ||
                (0, i.deepEqual)(l, u) ||
                (0, i.logWarn)(`Conflicting ${e} and ${t} (${c}), preferring ${e}`, { [e]: l, [t]: u }),
                null != (l ?? u) && (0, a.J)(r, n, l ?? u));
              const g = (0, s.A)(r, d);
              return (null != g && 'object' == typeof g && delete g[o], r);
            };
          }
          var X = n(8417),
            Z = n(6652);
          const ee = (0, r.m)(),
            { triggerUserSyncs: te } = A.zt,
            { ADD_AD_UNITS: ne, REQUEST_BIDS: re, SET_TARGETING: ie } = c.qY;
          function oe(e, t) {
            let n = [];
            return (
              (0, o.cy)(e) &&
                (t ? e.length === t : e.length > 0) &&
                (e.every((e) => (0, o.Uu)(e, 2)) ? (n = e) : (0, o.Uu)(e, 2) && n.push(e)),
              n
            );
          }
          function se(e, t) {
            const n = (0, s.A)(e, `ortb2Imp.${t}`),
              r = (0, s.A)(e, `mediaTypes.${t}`);
            if (!n && !r) return;
            const o = { [R.G_]: L.Zy, [R.D4]: H }[t];
            o &&
              [...o].forEach((n) => {
                let [r, o] = n;
                const d = (0, s.A)(e, `mediaTypes.${t}.${r}`),
                  c = (0, s.A)(e, `ortb2Imp.${t}.${r}`);
                (void 0 === d && void 0 === c) ||
                  (void 0 === d
                    ? (0, a.J)(e, `mediaTypes.${t}.${r}`, c)
                    : void 0 === c
                      ? (0, a.J)(e, `ortb2Imp.${t}.${r}`, d)
                      : (0, i.deepEqual)(d, c) ||
                        ((0, i.logWarn)(
                          `adUnit ${e.code}: specifies conflicting ortb2Imp.${t}.${r} and mediaTypes.${t}.${r}, the latter will be ignored`,
                          e,
                        ),
                        (0, a.J)(e, `mediaTypes.${t}.${r}`, c)));
              });
          }
          function ae(e) {
            const t = (0, o.Go)(e),
              n = t.mediaTypes.banner,
              r = null == n.sizes ? null : oe(n.sizes),
              s = e.ortb2Imp?.banner?.format ?? n?.format;
            let d;
            if (null != s) {
              ((0, a.J)(t, 'ortb2Imp.banner.format', s), (n.format = s));
              try {
                d = s
                  .filter((t) => {
                    let { w: n, h: r, wratio: o, hratio: s } = t;
                    return null != (n ?? r) && null != (o ?? s)
                      ? ((0, i.logWarn)('Ad unit banner.format specifies both w/h and wratio/hratio', e), !1)
                      : (null != n && null != r) || (null != o && null != s);
                  })
                  .map((e) => {
                    let { w: t, h: n, wratio: r, hratio: i } = e;
                    return [t ?? r, n ?? i];
                  });
              } catch (t) {
                (0, i.logError)(`Invalid format definition on ad unit ${e.code}`, s);
              }
              null == d ||
                null == r ||
                (0, i.deepEqual)(r, d) ||
                (0, i.logWarn)(`Ad unit ${e.code} has conflicting sizes and format definitions`, e);
            }
            const c = d ?? r ?? [],
              l = e.ortb2Imp?.banner?.expdir ?? n.expdir;
            return (
              null != l && ((n.expdir = l), (0, a.J)(t, 'ortb2Imp.banner.expdir', l)),
              c.length > 0
                ? ((n.sizes = c), (t.sizes = c))
                : ((0, i.logError)(
                    'Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request.',
                  ),
                  delete t.mediaTypes.banner),
              le(t, 'banner'),
              se(t, 'banner'),
              t
            );
          }
          function de(e) {
            const t = (0, o.Go)(e);
            return (le(t, 'audio'), se(t, 'audio'), t);
          }
          function ce(e) {
            const t = (0, o.Go)(e),
              n = t.mediaTypes.video;
            if (n.playerSize) {
              const e = 'number' == typeof n.playerSize[0] ? 2 : 1,
                r = oe(n.playerSize, e);
              r.length > 0
                ? (2 === e && (0, i.logInfo)("Transforming video.playerSize from [640,480] to [[640,480]] so it's in the proper format."),
                  (n.playerSize = r),
                  (t.sizes = r))
                : ((0, i.logError)(
                    'Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request.',
                  ),
                  delete t.mediaTypes.video.playerSize);
            }
            return (le(t, 'video'), se(t, 'video'), t);
          }
          function le(e, t, n) {
            const r = (e?.mediaTypes || {})[t],
              s = { banner: H, audio: X.Ai, video: L.Zy }[t];
            (0, o.Qd)(r)
              ? null != r &&
                Object.entries(r).forEach((o) => {
                  let [a, d] = o;
                  if (!s.has(a)) return;
                  s.get(a)(d) ||
                    ('function' == typeof n
                      ? n(a, d, e)
                      : (delete r[a],
                        (0, i.logWarn)(
                          `Invalid prop in adUnit "${e.code}": Invalid value for mediaTypes.${t}.${a} ORTB property. The property has been removed.`,
                        )));
                })
              : (0, i.logWarn)(`validateOrtb${t}Fields: ${t}Params must be an object.`);
          }
          function ue(e) {
            function t(t) {
              return (
                (0, i.logError)(`Error in adUnit "${e.code}": ${t}. Removing native request from ad unit`, e),
                delete r.mediaTypes.native,
                r
              );
            }
            function n(e) {
              for (const t of ['types'])
                if (s.hasOwnProperty(t)) {
                  const n = e(t);
                  if (n) return n;
                }
            }
            const r = (0, o.Go)(e),
              s = r.mediaTypes.native;
            if (s.ortb) {
              if (s.ortb.assets?.some((e) => !(0, o.Et)(e.id) || e.id < 0 || e.id % 1 != 0))
                return t('native asset ID must be a nonnegative integer');
              if (n((e) => t(`ORTB native requests cannot specify "${e}"`))) return r;
              const e = Object.keys(c.x5).filter((e) => c.x5[e].includes('hb_native_')),
                a = Object.keys(s).filter((t) => e.includes(t));
              a.length > 0 &&
                ((0, i.logError)(
                  `when using native OpenRTB format, you cannot use legacy native properties. Deleting ${a} keys from request.`,
                ),
                a.forEach((e) => delete r.mediaTypes.native[e]));
            } else n((t) => (0, i.logWarn)(`mediaTypes.native.${t} is deprecated, consider using native ORTB instead`, e));
            return (
              s.image &&
                s.image.sizes &&
                !Array.isArray(s.image.sizes) &&
                ((0, i.logError)(
                  'Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request.',
                ),
                delete r.mediaTypes.native.image.sizes),
              s.image &&
                s.image.aspect_ratios &&
                !Array.isArray(s.image.aspect_ratios) &&
                ((0, i.logError)(
                  'Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request.',
                ),
                delete r.mediaTypes.native.image.aspect_ratios),
              s.icon &&
                s.icon.sizes &&
                !Array.isArray(s.icon.sizes) &&
                ((0, i.logError)(
                  'Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request.',
                ),
                delete r.mediaTypes.native.icon.sizes),
              r
            );
          }
          function ge(e, t) {
            const n = e?.mediaTypes?.[t]?.pos;
            if (!(0, o.Et)(n) || isNaN(n) || !isFinite(n)) {
              const n = `Value of property 'pos' on ad unit ${e.code} should be of type: Number`;
              ((0, i.logWarn)(n), delete e.mediaTypes[t].pos);
            }
            return e;
          }
          function fe(e) {
            const t = (e) => `adUnit.code '${n.code}' ${e}`,
              n = e,
              r = n.mediaTypes,
              s = n.bids;
            return null == s || (0, o.cy)(s)
              ? null == s && null == n.ortb2Imp
                ? ((0, i.logError)(t("has no 'adUnit.bids' and no 'adUnit.ortb2Imp'. Removing adUnit from auction")), null)
                : r && 0 !== Object.keys(r).length
                  ? (null == n.ortb2Imp ||
                      (null != s && 0 !== s.length) ||
                      ((n.bids = [{ bidder: null }]),
                      (0, i.logMessage)(t("defines 'adUnit.ortb2Imp' with no 'adUnit.bids'; it will be seen only by S2S adapters"))),
                    n)
                  : ((0, i.logError)(
                      t(
                        "does not define a 'mediaTypes' object.  This is a required field for the auction, so this adUnit has been removed.",
                      ),
                    ),
                    null)
              : ((0, i.logError)(t("defines 'adUnit.bids' that is not an array. Removing adUnit from auction")), null);
          }
          (!(function () {
            let e = null;
            try {
              e = window.sessionStorage;
            } catch (e) {}
            if (null !== e) {
              const t = q;
              let n = null;
              try {
                n = e.getItem(D);
              } catch (e) {}
              null !== n && t.enable();
            }
          })(),
            (ee.bidderSettings = ee.bidderSettings || {}),
            (ee.libLoaded = !0),
            (ee.version = 'v10.29.0'),
            (0, i.logInfo)('Prebid.js v10.29.0 loaded'),
            (ee.adUnits = ee.adUnits || []),
            (ee.pageViewIdPerBidder = ee.pageViewIdPerBidder || new Map()));
          const pe = { validateAdUnit: fe, validateBannerMediaType: ae, validateSizes: oe };
          (Object.assign(pe, { validateNativeMediaType: ue }),
            Object.assign(pe, { validateVideoMediaType: ce }),
            Object.assign(pe, { validateAudioMediaType: de }));
          const me = (0, C.A_)(
            'sync',
            function (e) {
              const t = [];
              return (
                e.forEach((e) => {
                  const n = fe(e);
                  if (null == n) return;
                  const r = n.mediaTypes;
                  let i, o, s, a;
                  (r.banner && ((i = ae(n)), r.banner.hasOwnProperty('pos') && (i = ge(i, 'banner'))),
                    r.video && ((o = ce(i || n)), r.video.hasOwnProperty('pos') && (o = ge(o, 'video'))),
                    r.native && (s = ue(o || i || n)),
                    r.audio && (a = de(s || n)));
                  const d = Object.assign({}, i, o, s, a);
                  t.push(d);
                }),
                t
              );
            },
            'checkAdUnitSetup',
          );
          function he(e, t) {
            return function () {
              for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
              return ((0, i.logInfo)(`Invoking ${(0, k.k)()}.${e}`, r), t.apply(this, r));
            };
          }
          function be(e, t) {
            let n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            (0, r.m)()[e] = n ? he(e, t) : t;
          }
          function ye(e) {
            return ve(e)[e];
          }
          function ve(e) {
            return T.iS.getAllTargeting(e);
          }
          function Ee(e) {
            return (((e = e.slice()).bids = e), e);
          }
          function Ae(e) {
            const t = I.n[e]().filter((e) => I.n.getAdUnitCodes().includes(e.adUnitCode)),
              n = I.n.getLastAuctionId();
            return t
              .map((e) => e.adUnitCode)
              .filter(i.uniques)
              .map((e) => t.filter((t) => t.auctionId === n && t.adUnitCode === e))
              .filter((e) => e && e[0] && e[0].adUnitCode)
              .map((e) => ({ [e[0].adUnitCode]: Ee(e) }))
              .reduce((e, t) => Object.assign(e, t), {});
          }
          (be('triggerUserSyncs', te),
            be('getAdserverTargetingForAdUnitCodeStr', function (e) {
              if (e) {
                const t = ye(e);
                return (0, i.transformAdServerTargetingObj)(t);
              }
              (0, i.logMessage)('Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode');
            }),
            be('getHighestUnusedBidResponseForAdUnitCode', function (e) {
              if (e) {
                const t = I.n.getAllBidsForAdUnitCode(e).filter(T.Yl);
                return t.length ? t.reduce(G.Vk) : null;
              }
              (0, i.logMessage)('Need to call getHighestUnusedBidResponseForAdUnitCode with adunitCode');
            }),
            be('getAdserverTargetingForAdUnitCode', ye),
            be('getAdserverTargeting', ve),
            be('getConsentMetadata', function () {
              return F.SL.getConsentMeta();
            }),
            be('getNoBids', function () {
              return Ae('getNoBids');
            }),
            be('getNoBidsForAdUnitCode', function (e) {
              return Ee(I.n.getNoBids().filter((t) => t.adUnitCode === e));
            }),
            be('getBidResponses', function () {
              return Ae('getBidsReceived');
            }),
            be('getBidResponsesForAdUnitCode', function (e) {
              return Ee(I.n.getBidsReceived().filter((t) => t.adUnitCode === e));
            }),
            be('setTargetingForGPTAsync', function (e, t) {
              (0, i.isGptPubadsDefined)() ? T.iS.setTargetingForGPT(e, t) : (0, i.logError)('window.googletag is not defined on the page');
            }),
            be('setTargetingForAst', function (e) {
              T.iS.isApntagDefined()
                ? (T.iS.setTargetingForAst(e), N.Ic(ie, T.iS.getAllTargeting()))
                : (0, i.logError)('window.apntag is not defined on the page');
            }),
            be('renderAd', function (e, t, n) {
              (0, l.BS)(e, t, n);
            }),
            be('removeAdUnit', function (e) {
              if (!e) return void (ee.adUnits = []);
              let t;
              ((t = (0, o.cy)(e) ? e : [e]),
                t.forEach((e) => {
                  for (let t = ee.adUnits.length - 1; t >= 0; t--) ee.adUnits[t].code === e && ee.adUnits.splice(t, 1);
                }));
            }));
          const we = (function () {
            function e(e, t) {
              return (
                null == t || Array.isArray(t) || (t = [t]),
                null == t || (Array.isArray(t) && 0 === t.length)
                  ? { included: e, excluded: [], adUnitCodes: e.map((e) => e.code).filter(i.uniques) }
                  : ((t = t.filter(i.uniques)),
                    Object.assign(
                      { adUnitCodes: t },
                      e.reduce(
                        (e, n) => {
                          let { included: r, excluded: i } = e;
                          return ((t.includes(n.code) ? r : i).push(n), { included: r, excluded: i });
                        },
                        { included: [], excluded: [] },
                      ),
                    ))
              );
            }
            const t = (0, C.A_)(
              'async',
              function (t) {
                let {
                  bidsBackHandler: n,
                  timeout: r,
                  adUnits: s,
                  adUnitCodes: a,
                  labels: d,
                  auctionId: c,
                  ttlBuffer: l,
                  ortb2: u,
                  metrics: f,
                  defer: p,
                } = t ?? {};
                const m = r || w.$W.getConfig('bidderTimeout');
                ({ included: s, adUnitCodes: a } = e(s, a));
                let h = {
                  global: (0, i.mergeDeep)({}, w.$W.getAnyConfig('ortb2') || {}, u || {}),
                  bidder: Object.fromEntries(
                    Object.entries(w.$W.getBidderConfig())
                      .map((e) => {
                        let [t, n] = e;
                        return [t, (0, o.Go)(n.ortb2)];
                      })
                      .filter((e) => {
                        let [t, n] = e;
                        return null != n;
                      }),
                  ),
                };
                ((h = J(h)),
                  (0, M.wU)(g.U9.resolve(h.global)).then(
                    (e) => (
                      (h.global = e),
                      Ie({
                        bidsBackHandler: n,
                        timeout: m,
                        adUnits: s,
                        adUnitCodes: a,
                        labels: d,
                        auctionId: c,
                        ttlBuffer: l,
                        ortb2Fragments: h,
                        metrics: f,
                        defer: p,
                      })
                    ),
                  ));
              },
              'requestBids',
            );
            return (0, C.Y6)(
              t,
              he(
                'requestBids',
                V(
                  () => !w.$W.getConfig('allowPrerendering'),
                  function () {
                    let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    const r = n.adUnits || ee.adUnits;
                    n.adUnits = Array.isArray(r) ? r.slice() : [r];
                    const i = (0, P.K7)();
                    i.checkpoint('requestBids');
                    const { included: o, excluded: s, adUnitCodes: a } = e(r, n.adUnitCodes);
                    N.Ic(re, Object.assign(n, { adUnits: o, adUnitCodes: a }));
                    const d = Object.assign({}, n, {
                      adUnits: n.adUnits.slice().concat(s),
                      adUnitCodes: a,
                      metrics: i,
                      defer: (0, g.v6)({ promiseFactory: (e) => new Promise(e) }),
                    });
                    return (t.call(this, d), d.defer.promise);
                  },
                ),
              ),
            );
          })();
          be('requestBids', we, !1);
          const Ie = (0, C.A_)(
            'async',
            function () {
              let {
                bidsBackHandler: e,
                timeout: t,
                adUnits: n,
                ttlBuffer: r,
                adUnitCodes: o,
                labels: s,
                auctionId: a,
                ortb2Fragments: d,
                metrics: c,
                defer: l,
              } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              const u = (0, j.pX)(w.$W.getConfig('s2sConfig') || []);
              !(function (e) {
                (e.forEach((e) => (0, L.V0)(e)), e.forEach((e) => (0, X.kl)(e)));
              })(n);
              const g = (0, P.BO)(c).measureTime('requestBids.validate', () => me(n));
              function f(t, n, r) {
                if ('function' == typeof e)
                  try {
                    e(t, n, r);
                  } catch (e) {
                    (0, i.logError)('Error executing bidsBackHandler', null, e);
                  }
                l.resolve({ bids: t, timedOut: n, auctionId: r });
              }
              const p = {};
              if (
                (g.forEach((e) => {
                  const t = Object.keys(e.mediaTypes || { banner: 'banner' }),
                    n = e.bids.map((e) => e.bidder).filter(Boolean),
                    o = j.Ay.bidderRegistry,
                    s = n.filter((e) => !u.has(e));
                  e.adUnitId = (0, i.generateUUID)();
                  const a = e.ortb2Imp?.ext?.tid;
                  (a &&
                    (p.hasOwnProperty(e.code)
                      ? (0, i.logWarn)(`Multiple distinct ortb2Imp.ext.tid were provided for twin ad units '${e.code}'`)
                      : (p[e.code] = a)),
                    null == r || e.hasOwnProperty('ttlBuffer') || (e.ttlBuffer = r),
                    s.forEach((n) => {
                      const r = o[n],
                        s = r && r.getSpec && r.getSpec(),
                        a = (s && s.supportedMediaTypes) || ['banner'];
                      t.some((e) => a.includes(e)) ||
                        ((0, i.logWarn)((0, i.unsupportedBidderMessage)(e, n)), (e.bids = e.bids.filter((e) => e.bidder !== n)));
                    }));
                }),
                g && 0 !== g.length)
              ) {
                g.forEach((e) => {
                  const t = e.ortb2Imp?.ext?.tid || p[e.code] || (0, i.generateUUID)();
                  (p.hasOwnProperty(e.code) || (p[e.code] = t), (e.transactionId = t));
                });
                const e = I.n.createAuction({
                    adUnits: g,
                    adUnitCodes: o,
                    callback: f,
                    cbTimeout: t,
                    labels: s,
                    auctionId: a,
                    ortb2Fragments: d,
                    metrics: c,
                  }),
                  n = g.length;
                (n > 15 && (0, i.logInfo)(`Current auction ${e.getAuctionId()} contains ${n} adUnits.`, g),
                  o.forEach((t) => T.iS.setLatestAuctionForAdUnit(t, e.getAuctionId())),
                  e.callBids());
              } else ((0, i.logMessage)('No adUnits configured. No bids requested.'), f());
            },
            'startAuction',
          );
          (we.before(function (e, t) {
            function n(e) {
              let t;
              for (; (t = e.shift()); ) t();
            }
            (n(W.s0), n(Se), e.call(this, t));
          }, 49),
            be('addAdUnits', function (e) {
              (ee.adUnits.push(...(Array.isArray(e) ? e : [e])), N.Ic(ne));
            }));
          const Te = {
            bidWon(e) {
              if (
                I.n
                  .getBidsRequested()
                  .map((e) => e.bids.map((e) => e.adUnitCode))
                  .reduce(i.flatten)
                  .filter(i.uniques)
                  .includes(e)
              )
                return !0;
              (0, i.logError)('The "' + e + '" placement is not defined.');
            },
          };
          function Ce(e, t) {
            return Te.hasOwnProperty(e) && Te[e](t);
          }
          (be('onEvent', function (e, t, n) {
            (0, o.fp)(t)
              ? !n || Ce(e, n)
                ? N.on(e, t, n)
                : (0, i.logError)('The id provided is not valid for event "' + e + '" and no handler was set.')
              : (0, i.logError)('The event handler provided is not a function and was not set on event "' + e + '".');
          }),
            be('offEvent', function (e, t, n) {
              (n && !Ce(e, n)) || N.AU(e, t, n);
            }),
            be('getEvents', function () {
              return N.kQ();
            }),
            be('registerBidAdapter', function (e, t, n) {
              try {
                const r = n ? (0, Q.xb)(n) : e();
                j.Ay.registerBidAdapter(r, t);
              } catch (e) {
                (0, i.logError)('Error registering bidder adapter : ' + e.message);
              }
            }),
            be('registerAnalyticsAdapter', function (e) {
              try {
                j.Ay.registerAnalyticsAdapter(e);
              } catch (e) {
                (0, i.logError)('Error registering analytics adapter : ' + e.message);
              }
            }));
          const Se = [],
            Oe = (0, C.A_)(
              'async',
              function (e) {
                e && !(0, i.isEmpty)(e)
                  ? j.Ay.enableAnalytics(e)
                  : (0, i.logError)(`${(0, k.k)()}.enableAnalytics should be called with option {}`);
              },
              'enableAnalyticsCb',
            );
          let Be;
          function Re(e) {
            Be.promise.then(() => {
              if ('function' == typeof e)
                try {
                  e.call();
                } catch (e) {
                  (0, i.logError)('Error processing command :', e.message, e.stack);
                }
              else (0, i.logError)(`Commands written into ${(0, k.k)()}.cmd.push must be wrapped in a function`);
            });
          }
          function Ue(e, t) {
            (0, Z.JE)(
              () => (0, r.m)().yield ?? !0,
              e.map(
                (e) => () =>
                  (function (e) {
                    if (void 0 === e.called)
                      try {
                        (e.call(), (e.called = !0));
                      } catch (e) {
                        (0, i.logError)('Error processing command :', 'prebid.js', e);
                      }
                  })(e),
              ),
              t,
            );
          }
          (be('enableAnalytics', function (e) {
            Se.push(Oe.bind(this, e));
          }),
            be('aliasBidder', function (e, t, n) {
              e && t
                ? j.Ay.aliasBidAdapter(e, t, n)
                : (0, i.logError)('bidderCode and alias must be passed as arguments', `${(0, k.k)()}.aliasBidder`);
            }),
            (ee.aliasRegistry = j.Ay.aliasRegistry),
            w.$W.getConfig('aliasRegistry', (e) => {
              'private' === e.aliasRegistry && delete ee.aliasRegistry;
            }),
            be('getAllWinningBids', function () {
              return I.n.getAllWinningBids();
            }),
            be('getAllPrebidWinningBids', function () {
              return (
                (0, i.logWarn)(
                  'getAllPrebidWinningBids may be removed or renamed in a future version. This function returns bids that have won in prebid and have had targeting set but have not (yet?) won in the ad server. It excludes bids that have been rendered.',
                ),
                I.n.getBidsReceived().filter((e) => e.status === c.tl.BID_TARGETING_SET)
              );
            }),
            be('getHighestCpmBids', function (e) {
              return T.iS.getWinningBids(e);
            }),
            be('clearAllAuctions', function () {
              I.n.clearAllAuctions();
            }),
            be('markWinningBidAsUsed', function (e) {
              let t,
                { adId: n, adUnitCode: r, analytics: o = !1, events: s = !1 } = e;
              (r && null == n
                ? (t = T.iS.getWinningBids(r))
                : n
                  ? (t = I.n.getBidsReceived().filter((e) => e.adId === n))
                  : (0, i.logWarn)('Improper use of markWinningBidAsUsed. It needs an adUnitCode or an adId to function.'),
                t.length > 0 && (o || s ? (0, l.n6)(t[0]) : I.n.addWinningBid(t[0]), (0, l.qn)(t[0])));
            }),
            be('getConfig', w.$W.getAnyConfig),
            be('readConfig', w.$W.readAnyConfig),
            be('mergeConfig', w.$W.mergeConfig),
            be('mergeBidderConfig', w.$W.mergeBidderConfig),
            be('setConfig', w.$W.setConfig),
            be('setBidderConfig', w.$W.setBidderConfig),
            ee.que.push(() => y()),
            (Be = (0, g.v6)()));
          (be(
            'processQueue',
            V(
              () => ee.delayPrerendering,
              async function () {
                ((ee.que.push = ee.cmd.push = Re),
                  (0, l.XO)(),
                  C.A_.ready(),
                  Ue(ee.que, () => {
                    Ue(ee.cmd, () => {
                      Be.resolve();
                    });
                  }));
              },
            ),
            !1,
          ),
            be('triggerBilling', function (e) {
              let { adId: t, adUnitCode: n } = e;
              I.n
                .getAllWinningBids()
                .filter((e) => e.adId === t || (null == t && e.adUnitCode === n))
                .forEach((e) => {
                  (j.Ay.triggerBilling(e), (0, l.vB)(e));
                });
            }),
            be('refreshPageViewId', function () {
              for (const e of ee.pageViewIdPerBidder.keys()) ee.pageViewIdPerBidder.set(e, (0, i.generateUUID)());
            }));
        },
        5049(e, t, n) {
          n.d(t, { R: () => d });
          var r = n(5808),
            i = n(7610),
            o = n(3202),
            s = n(466);
          const a = new WeakMap();
          function d(e, t, n, d, c, l) {
            if (!(0, o.io)(r.pY, (0, i.s)(t, n))) return;
            if (!n || !e) return void (0, s.logError)('cannot load external script without url and moduleCode');
            const u = 'function' == typeof d || 'function' == typeof d?.success || 'function' == typeof d?.error;
            function g(e, t) {
              null == t ? ('function' == typeof e ? e() : e.success?.()) : e.error?.(t);
            }
            c || (c = document);
            const f = h(c, e);
            if (f) return (u && (f.loaded ? g(d, f.error) : f.callbacks.push(d)), f.tag);
            const p = a.get(c) || {},
              m = { error: null, loaded: !1, tag: null, callbacks: [] };
            return (
              (p[e] = m),
              a.set(c, p),
              u && m.callbacks.push(d),
              (0, s.logWarn)(`module ${n} is loading external JavaScript`),
              (function (t, n, r, i) {
                r || (r = document);
                var o = r.createElement('script');
                ((o.type = 'text/javascript'), (o.async = !0));
                const a = h(r, e);
                a && (a.tag = o);
                function d(e) {
                  ((a.error = e), c());
                }
                function c() {
                  (o.removeEventListener('error', d), n());
                }
                (o.addEventListener('error', d),
                  o.readyState
                    ? (o.onreadystatechange = function () {
                        ('loaded' !== o.readyState && 'complete' !== o.readyState) || ((o.onreadystatechange = null), c());
                      })
                    : (o.onload = function () {
                        c();
                      }));
                ((o.src = t), i && (0, s.setScriptAttributes)(o, i));
                return ((0, s.insertElement)(o, r), o);
              })(
                e,
                function () {
                  m.loaded = !0;
                  try {
                    for (let e = 0; e < m.callbacks.length; e++) g(m.callbacks[e], m.error);
                  } catch (e) {
                    (0, s.logError)('Error executing callback', 'adloader.js:loadExternalScript', e);
                  }
                },
                c,
                l,
              )
            );
            function h(e, t) {
              const n = a.get(e);
              return n && n[t] ? n[t] : null;
            }
          }
        },
        5144(e, t, n) {
          n.d(t, { HH: () => c, kj: () => d, xh: () => a });
          var r = n(3064),
            i = n(466),
            o = n(3293),
            s = n(2592);
          const a = 3,
            d = (0, s.A_)('sync', function (e) {
              return o.G;
            }),
            c = (function () {
              const e = {};
              return function (t) {
                const n = d(t);
                return (
                  e.hasOwnProperty(n) ||
                    (e[n] = new r.U9((e) => {
                      const r = (0, i.createInvisibleIframe)();
                      r.srcdoc = `\n            <script>${n}<\/script>\n            <script>\n              window.parent.postMessage(\n                  { type: 'RENDERER_READY_${t.adId}' },\n                  '*'\n            );<\/script>`;
                      const o = (n) => {
                        n.source === r.contentWindow &&
                          n.data?.type === `RENDERER_READY_${t.adId}` &&
                          (window.removeEventListener('message', o), e(r.contentWindow.render));
                      };
                      (window.addEventListener('message', o), document.body.appendChild(r));
                    })),
                  e[n]
                );
              };
            })();
        },
        5291(e, t, n) {
          n.d(t, {
            Dk: () => s,
            Ez: () => l,
            Ii: () => o,
            OI: () => u,
            TQ: () => m,
            U3: () => b,
            XG: () => g,
            ZI: () => h,
            Zw: () => c,
            bt: () => f,
            e3: () => p,
            iK: () => a,
            q7: () => d,
          });
          var r = n(736),
            i = n(2592);
          const o = 'component',
            s = o + 'Type',
            a = o + 'Name',
            d = 'adapterCode',
            c = 'storageType',
            l = 'storageKey',
            u = 'write',
            g = 'configName',
            f = 'syncType',
            p = 'syncUrl',
            m = '_config';
          function h(e) {
            return function (t, n, i) {
              const c = { [s]: t, [a]: n, [o]: `${t}.${n}` };
              return (t === r.tW && (c[d] = e(n)), b(Object.assign(c, i)));
            };
          }
          const b = (0, i.A_)('sync', (e) => e);
        },
        5482(e, t, n) {
          n.d(t, { S9: () => l, cT: () => c, lc: () => u });
          var r = n(1933),
            i = n(466);
          const o = 'minBidCacheTTL';
          let s = 1,
            a = null;
          const d = [];
          function c(e) {
            return e.ttl - (e.hasOwnProperty('ttlBuffer') ? e.ttlBuffer : s);
          }
          function l() {
            return a;
          }
          function u(e) {
            d.push(e);
          }
          (r.$W.getConfig('ttlBuffer', (e) => {
            'number' == typeof e.ttlBuffer ? (s = e.ttlBuffer) : (0, i.logError)('Invalid value for ttlBuffer', e.ttlBuffer);
          }),
            r.$W.getConfig(o, (e) => {
              const t = a;
              ((a = e?.[o]), (a = 'number' == typeof a ? a : null), t !== a && d.forEach((e) => e(a)));
            }));
        },
        5808(e, t, n) {
          n.d(t, {
            DL: () => l,
            Ml: () => i,
            Ue: () => r,
            VJ: () => g,
            hE: () => u,
            hq: () => c,
            it: () => m,
            mo: () => d,
            pY: () => f,
            qX: () => o,
            uc: () => a,
            yg: () => p,
            yl: () => s,
          });
          const r = 'accessDevice',
            i = 'syncUser',
            o = 'enrichUfpd',
            s = 'enrichEids',
            a = 'fetchBids',
            d = 'reportAnalytics',
            c = 'transmitEids',
            l = 'transmitUfpd',
            u = 'transmitPreciseGeo',
            g = 'transmitTid',
            f = 'loadExternalScript',
            p = 'accessRequestCredentials',
            m = 'acceptBid';
        },
        6220(e, t, n) {
          n.d(t, { H6: () => c, V0: () => f, Zy: () => g, mn: () => l, vk: () => p });
          var r = n(466),
            i = n(6665),
            o = n(1933),
            s = n(2592),
            a = n(3006),
            d = n(765);
          const c = 'outstream',
            l = 'instream',
            u = [
              ['mimes', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'string' == typeof e)],
              ['minduration', i.Fq],
              ['maxduration', i.Fq],
              ['startdelay', i.Fq],
              ['maxseq', i.Fq],
              ['poddur', i.Fq],
              ['protocols', i.Uu],
              ['w', i.Fq],
              ['h', i.Fq],
              ['podid', i.O8],
              ['podseq', i.Fq],
              ['rqddurs', i.Uu],
              ['placement', i.Fq],
              ['plcmt', i.Fq],
              ['linearity', i.Fq],
              ['skip', (e) => [1, 0].includes(e)],
              ['skipmin', i.Fq],
              ['skipafter', i.Fq],
              ['sequence', i.Fq],
              ['slotinpod', i.Fq],
              ['mincpmpersec', i.Et],
              ['battr', i.Uu],
              ['maxextended', i.Fq],
              ['minbitrate', i.Fq],
              ['maxbitrate', i.Fq],
              ['boxingallowed', i.Fq],
              ['playbackmethod', i.Uu],
              ['playbackend', i.Fq],
              ['delivery', i.Uu],
              ['pos', i.Fq],
              ['api', i.Uu],
              ['companiontype', i.Uu],
              ['poddedupe', i.Uu],
            ],
            g = new Map(u);
          function f(e) {
            const t = e?.mediaTypes?.video;
            if (null != t) {
              null == t.plcmt &&
                (t.context === c || [2, 3, 4].includes(t.placement)
                  ? (t.plcmt = 4)
                  : t.playbackmethod?.some?.((e) => [2, 6].includes(e)) && (t.plcmt = 2));
              const n = (0, i.Uu)(t.playerSize, 2)
                  ? t.playerSize
                  : Array.isArray(t.playerSize) && (0, i.Uu)(t.playerSize[0])
                    ? t.playerSize[0]
                    : null,
                o = (0, i.Et)(t.w) && (0, i.Et)(t.h) ? [t.w, t.h] : null;
              let s = !1;
              (null == n
                ? null != o && (null != t.playerSize ? (s = !0) : (t.playerSize = [o]))
                : ['w', 'h'].forEach((e, r) => {
                    null != t[e] && t[e] !== n[r] ? (s = !0) : (t[e] = n[r]);
                  }),
                s && (0, r.logWarn)(`Ad unit "${e.code} has conflicting playerSize and w/h`, e));
            }
          }
          function p(e) {
            let { index: t = a.n.index } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n = t.getMediaTypes(e)?.video,
              r = n && n?.context,
              i = n && n?.useCacheKey,
              o = t.getAdUnit(e);
            return m(e, o, n, r, i);
          }
          const m = (0, s.A_)(
            'sync',
            function (e, t, n, i, s) {
              if (n && (s || i !== c)) {
                const { url: t, useLocal: n } = o.$W.getConfig('cache') || {};
                return t || n || !e.vastXml || e.vastUrl
                  ? !(!e.vastUrl && !e.vastXml)
                  : ((0, r.logError)(
                      `\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling either prebid cache with ${(0, d.k)()}.setConfig({ cache: {url: "..."} });\n        or local cache with ${(0, d.k)()}.setConfig({ cache: { useLocal: true }});\n      `,
                    ),
                    !1);
              }
              return !(i === c && !s) || !!(e.renderer || (t && t.renderer) || n.renderer);
            },
            'checkVideoBidSetup',
          );
        },
        6652(e, t, n) {
          n.d(t, { JE: () => s, o1: () => o });
          var r = n(3064);
          function i(e, t) {
            e()
              ? (function () {
                  const e = window.scheduler;
                  return 'function' == typeof e?.yield ? e.yield() : r.U9.resolve();
                })().then(t)
              : t();
          }
          function o(e, t) {
            return function () {
              for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
              i(e, () => {
                t.apply(this, r);
              });
            };
          }
          function s(e, t, n) {
            !(function (e, t) {
              let n = 0;
              function r() {
                e.length > n ? ((n += 1), e[n - 1](r)) : 'function' == typeof t && t();
              }
              r();
            })(
              t.map((t) => (n) => {
                i(e, () => {
                  (t(), n());
                });
              }),
              n,
            );
          }
        },
        6665(e, t, n) {
          n.d(t, {
            Et: () => u,
            Fq: () => p,
            Go: () => i,
            KG: () => a,
            Lm: () => f,
            O8: () => c,
            Qd: () => g,
            SH: () => o,
            Uu: () => m,
            cy: () => l,
            fp: () => d,
          });
          var r = n(1490);
          function i(e) {
            return (0, r.Q)(e) || {};
          }
          function o(e, t) {
            return t.filter((t) => e[t]).reduce((t, n) => Object.assign(t, { [n]: e[n] }), {});
          }
          const s = Object.prototype.toString;
          function a(e, t) {
            return s.call(e) === '[object ' + t + ']';
          }
          function d(e) {
            return a(e, 'Function');
          }
          function c(e) {
            return a(e, 'String');
          }
          const l = Array.isArray.bind(Array);
          function u(e) {
            return a(e, 'Number');
          }
          function g(e) {
            return a(e, 'Object');
          }
          function f(e) {
            return a(e, 'Boolean');
          }
          const p = Number.isInteger.bind(Number);
          function m(e, t) {
            return l(e) && (!t || e.length === t) && e.every((e) => p(e));
          }
        },
        7156(e, t, n) {
          n.d(t, { u: () => a });
          var r = n(466),
            i = n(8928),
            o = n(1748),
            s = n(1418);
          const a = new (class {
            constructor(e, t) {
              ((this.getSettings = e), (this.defaultScope = t));
            }
            get(e, t) {
              let n = this.getOwn(e, t);
              return (void 0 === n && (n = this.getOwn(null, t)), n);
            }
            getOwn(e, t) {
              return ((e = this.#a(e)), (0, i.A)(this.getSettings(), `${e}.${t}`));
            }
            getScopes() {
              return Object.keys(this.getSettings()).filter((e) => e !== this.defaultScope);
            }
            settingsFor(e) {
              return (0, r.mergeDeep)({}, this.ownSettingsFor(null), this.ownSettingsFor(e));
            }
            ownSettingsFor(e) {
              return ((e = this.#a(e)), this.getSettings()[e] || {});
            }
            #a(e) {
              return null == e ? this.defaultScope : e;
            }
          })(() => (0, o.m)().bidderSettings || {}, s.iD.BD_SETTING_STANDARD);
        },
        7459(e, t, n) {
          n.d(t, { y: () => s });
          var r = n(3006),
            i = n(7156),
            o = n(466);
          function s(e, t, n) {
            let { index: s = r.n.index, bs: a = i.u } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            n = n || s.getBidRequest(t);
            const d = t?.adapterCode,
              c = t?.bidderCode || n?.bidder,
              l = a.get(t?.adapterCode, 'adjustAlternateBids'),
              u = a.getOwn(c, 'bidCpmAdjustment') || a.get(l ? d : c, 'bidCpmAdjustment');
            if (u && 'function' == typeof u)
              try {
                return u(e, Object.assign({}, t), n);
              } catch (e) {
                (0, o.logError)('Error during bid adjustment', e);
              }
            return e;
          }
        },
        7464(e, t, n) {
          n.d(t, { A4: () => d, J7: () => c, Pg: () => l });
          var r = n(5049),
            i = n(466),
            o = n(1748),
            s = n(736);
          const a = (0, o.m)();
          function d(e) {
            const { url: t, config: n, id: o, callback: d, loaded: c, adUnitCode: l, renderNow: u } = e;
            ((this.url = t),
              (this.config = n),
              (this.handlers = {}),
              (this.id = o),
              (this.renderNow = u),
              (this.adUnitCode = l),
              (this.loaded = c),
              (this.cmd = []),
              (this.push = (e) => {
                'function' == typeof e
                  ? this.loaded
                    ? e.call()
                    : this.cmd.push(e)
                  : (0, i.logError)('Commands given to Renderer.push must be wrapped in a function');
              }),
              (this.callback =
                d ||
                (() => {
                  ((this.loaded = !0), this.process());
                })),
              (this.render = function () {
                const e = arguments,
                  n = () => {
                    this._render
                      ? this._render.apply(this, e)
                      : (0, i.logWarn)('No render function was provided, please use .setRender on the renderer');
                  };
                !(function (e) {
                  const t = a.adUnits.find((t) => t.code === e);
                  if (!t) return !1;
                  const n = t?.renderer,
                    r = !!(n && n.url && n.render),
                    i = t?.mediaTypes?.video?.renderer,
                    o = !!(i && i.url && i.render);
                  return !!((r && !0 !== n.backupOnly) || (o && !0 !== i.backupOnly));
                })(l)
                  ? u
                    ? n()
                    : (this.cmd.unshift(n), (0, r.R)(t, s.tp, 'outstream', this.callback, this.documentContext))
                  : ((0, i.logWarn)(`External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ${l}`),
                    n());
              }.bind(this)));
          }
          function c(e) {
            return !(!e || (!e.url && !e.renderNow));
          }
          function l(e, t, n) {
            let r = null;
            (e.config && e.config.documentResolver && (r = e.config.documentResolver(t, document, n)),
              r || (r = document),
              (e.documentContext = r),
              e.render(t, e.documentContext));
          }
          ((d.install = function (e) {
            let { url: t, config: n, id: r, callback: i, loaded: o, adUnitCode: s, renderNow: a } = e;
            return new d({ url: t, config: n, id: r, callback: i, loaded: o, adUnitCode: s, renderNow: a });
          }),
            (d.prototype.getConfig = function () {
              return this.config;
            }),
            (d.prototype.setRender = function (e) {
              this._render = e;
            }),
            (d.prototype.setEventHandlers = function (e) {
              this.handlers = e;
            }),
            (d.prototype.handleVideoEvent = function (e) {
              let { id: t, eventName: n } = e;
              ('function' == typeof this.handlers[n] && this.handlers[n](),
                (0, i.logMessage)(`Prebid Renderer event for id ${t} type ${n}`));
            }),
            (d.prototype.process = function () {
              for (; this.cmd.length > 0; )
                try {
                  this.cmd.shift().call();
                } catch (e) {
                  (0, i.logError)(`Error processing Renderer command on ad unit '${this.adUnitCode}':`, e);
                }
            }));
        },
        7610(e, t, n) {
          n.d(t, { s: () => i });
          var r = n(8668);
          const i = (0, n(5291).ZI)((e) => r.Ay.resolveAlias(e));
        },
        7841(e, t, n) {
          n.d(t, { Ak: () => h, BO: () => f, K7: () => p, NL: () => b });
          var r = n(1933);
          const i = 'performanceMetrics',
            o = window.performance && window.performance.now ? () => window.performance.now() : () => Date.now(),
            s = new WeakMap();
          function a(e, t, n) {
            return function () {
              t && t();
              try {
                for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
                return e.apply(this, i);
              } finally {
                n && n();
              }
            };
          }
          function d() {
            let {
              now: e = o,
              mkNode: t = l,
              mkTimer: n = c,
              mkRenamer: r = (e) => e,
              nodes: i = s,
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return function () {
              return (function o(s) {
                let a =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : (e) => ({
                        forEach(t) {
                          t(e);
                        },
                      });
                a = r(a);
                const d =
                  ((c = 'timestamps'),
                  function (e) {
                    return s.dfWalk({
                      visit(t, n) {
                        const r = n[c];
                        if (r.hasOwnProperty(e)) return r[e];
                      },
                    });
                  });
                var c;
                function l(e, t) {
                  const n = a(e);
                  s.dfWalk({
                    follow: (e, t) => t.propagate && (!e || !e.stopPropagation),
                    visit(e, r) {
                      n.forEach((n) => {
                        null == e ? (r.metrics[n] = t) : (r.groups.hasOwnProperty(n) || (r.groups[n] = []), r.groups[n].push(t));
                      });
                    },
                  });
                }
                function u(t) {
                  return n(e, (e) => l(t, e));
                }
                function g() {
                  let e = {};
                  return (
                    s.dfWalk({
                      visit(t, n) {
                        e = Object.assign({}, !t || t.includeGroups ? n.groups : null, n.metrics, e);
                      },
                    }),
                    e
                  );
                }
                const f = {
                  startTiming: u,
                  measureTime: function (e, t) {
                    return u(e).stopAfter(t)();
                  },
                  measureHookTime: function (e, t, n) {
                    const r = u(e);
                    return n(
                      (function (e) {
                        const t = r.stopBefore(e);
                        return ((t.bail = e.bail && r.stopBefore(e.bail)), (t.stopTiming = r), (t.untimed = e), t);
                      })(t),
                    );
                  },
                  checkpoint: function (t) {
                    s.timestamps[t] = e();
                  },
                  timeSince: function (t, n) {
                    const r = d(t),
                      i = null != r ? e() - r : null;
                    return (null != n && l(n, i), i);
                  },
                  timeBetween: function (e, t, n) {
                    const r = d(e),
                      i = d(t),
                      o = null != r && null != i ? i - r : null;
                    return (null != n && l(n, o), o);
                  },
                  setMetric: l,
                  getMetrics: g,
                  fork: function () {
                    let {
                      propagate: e = !0,
                      stopPropagation: n = !1,
                      includeGroups: r = !1,
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return o(t([[s, { propagate: e, stopPropagation: n, includeGroups: r }]]), a);
                  },
                  join: function (e) {
                    let {
                      propagate: t = !0,
                      stopPropagation: n = !1,
                      includeGroups: r = !1,
                    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const o = i.get(e);
                    null != o && o.addParent(s, { propagate: t, stopPropagation: n, includeGroups: r });
                  },
                  newMetrics: function () {
                    return o(s.newSibling(), a);
                  },
                  renameWith: function (e) {
                    return o(s, e);
                  },
                  toJSON: () => g(),
                };
                return (i.set(f, s), f);
              })(t([]));
            };
          }
          function c(e, t) {
            const n = e();
            let r = !1;
            function i() {
              r || (t(e() - n), (r = !0));
            }
            return ((i.stopBefore = (e) => a(e, i)), (i.stopAfter = (e) => a(e, null, i)), i);
          }
          function l(e) {
            return {
              metrics: {},
              timestamps: {},
              groups: {},
              addParent(t, n) {
                e.push([t, n]);
              },
              newSibling: () => l(e.slice()),
              dfWalk() {
                let t,
                  {
                    visit: n,
                    follow: r = () => !0,
                    visited: i = new Set(),
                    inEdge: o,
                  } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!i.has(this)) {
                  if ((i.add(this), (t = n(o, this)), null != t)) return t;
                  for (const [s, a] of e)
                    if (r(o, a) && ((t = s.dfWalk({ visit: n, follow: r, visited: i, inEdge: a })), null != t)) return t;
                }
              },
            };
          }
          const u = (() => {
            const e = function () {},
              t = () => ({}),
              n = { forEach: e },
              r = () => null;
            ((r.stopBefore = (e) => e), (r.stopAfter = (e) => e));
            const i = Object.defineProperties(
              { dfWalk: e, newSibling: () => i, addParent: e },
              Object.fromEntries(['metrics', 'timestamps', 'groups'].map((e) => [e, { get: t }])),
            );
            return d({ now: () => 0, mkNode: () => i, mkRenamer: () => () => n, mkTimer: () => r, nodes: { get: e, set: e } })();
          })();
          let g = !0;
          function f(e) {
            return (g && e) || u;
          }
          r.$W.getConfig(i, (e) => {
            g = !!e[i];
          });
          const p = (() => {
            const e = d();
            return function () {
              return g ? e() : u;
            };
          })();
          function m(e, t) {
            return function (n, r) {
              var i = this;
              return function (o) {
                for (var s = arguments.length, a = new Array(s > 1 ? s - 1 : 0), d = 1; d < s; d++) a[d - 1] = arguments[d];
                return f(t.apply(i, a)).measureHookTime(e + n, o, (e) => r.call(i, e, ...a));
              };
            };
          }
          const h = m('requestBids.', (e) => e.metrics),
            b = m('addBidResponse.', (e, t) => t.metrics);
        },
        8014(e, t, n) {
          n.d(t, { AU: () => p, Ic: () => b, kQ: () => h, on: () => f });
          var r = n(466),
            i = n(1418),
            o = n(939),
            s = n(1933);
          const a = 'eventHistoryTTL';
          let d = null;
          const c = (0, o.H)({ monotonic: !0, ttl: () => d });
          s.$W.getConfig(a, (e) => {
            const t = d,
              n = e?.[a];
            ((d = 'number' == typeof n ? 1e3 * n : null), t !== d && c.refresh());
          });
          let l = Object.values(i.qY);
          const u = i.cA,
            g = (function () {
              const e = {};
              function t(e) {
                return l.includes(e);
              }
              return {
                has: t,
                on: function (n, i, o) {
                  if (t(n)) {
                    const t = e[n] || { que: [] };
                    (o ? ((t[o] = t[o] || { que: [] }), t[o].que.push(i)) : t.que.push(i), (e[n] = t));
                  } else r.logError('Wrong event name : ' + n + ' Valid event names :' + l);
                },
                emit: function (t) {
                  for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];
                  !(function (t, n) {
                    r.logMessage('Emitting event for: ' + t);
                    const i = n[0] || {},
                      o = i[u[t]],
                      s = e[t] || { que: [] };
                    var a = Object.keys(s);
                    const d = [];
                    (c.add({ eventType: t, args: i, id: o, elapsedTime: r.getPerformanceNow() }),
                      o && a.includes(o) && d.push(...s[o].que),
                      d.push(...s.que),
                      (d || []).forEach(function (e) {
                        if (e)
                          try {
                            e(...n);
                          } catch (e) {
                            r.logError('Error executing handler:', 'events.js', e, t);
                          }
                      }));
                  })(t, i);
                },
                off: function (t, n, i) {
                  const o = e[t];
                  r.isEmpty(o) ||
                    (r.isEmpty(o.que) && r.isEmpty(o[i])) ||
                    (i && (r.isEmpty(o[i]) || r.isEmpty(o[i].que))) ||
                    (i
                      ? (o[i].que || []).forEach(function (e) {
                          const t = o[i].que;
                          e === n && t.splice(t.indexOf(e), 1);
                        })
                      : (o.que || []).forEach(function (e) {
                          const t = o.que;
                          e === n && t.splice(t.indexOf(e), 1);
                        }),
                    (e[t] = o));
                },
                get: function () {
                  return e;
                },
                addEvents: function (e) {
                  l = l.concat(e);
                },
                getEvents: function () {
                  return c.toArray().map((e) => Object.assign({}, e));
                },
              };
            })();
          r._setEventEmitter(g.emit.bind(g));
          const { on: f, off: p, get: m, getEvents: h, emit: b, addEvents: y, has: v } = g;
        },
        8034(e, t, n) {
          n.d(t, { wU: () => O });
          var r = n(2592),
            i = n(867),
            o = n(1780),
            s = n(466),
            a = n(3435),
            d = n(8928),
            c = n(6665),
            l = n(3958),
            u = n(3367),
            g = n(1933),
            f = n(3064);
          const p = ['architecture', 'bitness', 'model', 'platformVersion', 'fullVersionList'],
            m = ['brands', 'mobile', 'platform'],
            h = (function () {
              let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.navigator?.userAgentData;
              const t = e && m.some((t) => void 0 !== e[t]) ? Object.freeze(y(1, e)) : null;
              return function () {
                return t;
              };
            })(),
            b = (function () {
              let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.navigator?.userAgentData;
              const t = {},
                n = new WeakMap();
              return function () {
                let r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : p;
                if (!n.has(r)) {
                  const e = Array.from(r);
                  (e.sort(), n.set(r, e.join('|')));
                }
                const i = n.get(r);
                if (!t.hasOwnProperty(i))
                  try {
                    t[i] = e
                      .getHighEntropyValues(r)
                      .then((e) => ((0, s.isEmpty)(e) ? null : Object.freeze(y(2, e))))
                      .catch(() => null);
                  } catch (e) {
                    t[i] = f.U9.resolve(null);
                  }
                return t[i];
              };
            })();
          function y(e, t) {
            function n(e, t) {
              const n = { brand: e };
              return ((0, c.O8)(t) && !(0, s.isEmptyStr)(t) && (n.version = t.split('.')), n);
            }
            const r = { source: e };
            return (
              t.platform && (r.platform = n(t.platform, t.platformVersion)),
              (t.fullVersionList || t.brands) &&
                (r.browsers = (t.fullVersionList || t.brands).map((e) => {
                  let { brand: t, version: r } = e;
                  return n(t, r);
                })),
              void 0 !== t.mobile && (r.mobile = t.mobile ? 1 : 0),
              ['model', 'bitness', 'architecture'].forEach((e) => {
                const n = t[e];
                (0, c.O8)(n) && (r[e] = n);
              }),
              r
            );
          }
          var v = n(1833),
            E = n(3202),
            A = n(7610),
            w = n(5808),
            I = n(736),
            T = n(183);
          const C = {
              getRefererInfo: i.EN,
              findRootDomain: o.S,
              getWindowTop: s.getWindowTop,
              getWindowSelf: s.getWindowSelf,
              getHighEntropySUA: b,
              getLowEntropySUA: h,
              getDocument: s.getDocument,
            },
            S = (0, v.i8)('FPD'),
            O = (0, r.A_)('sync', (e) => {
              const t = [
                e,
                R().catch(() => null),
                f.U9.resolve(
                  'cookieDeprecationLabel' in navigator &&
                    (0, E.io)(w.Ue, (0, A.s)(I.tp, 'cdep')) &&
                    navigator.cookieDeprecationLabel.getValue(),
                ).catch(() => null),
              ];
              return f.U9.all(t).then((e) => {
                let [t, n, r] = e;
                const i = C.getRefererInfo();
                if (
                  (Object.entries(k).forEach((e) => {
                    let [n, r] = e;
                    const o = r(t, i);
                    o && Object.keys(o).length > 0 && (t[n] = (0, s.mergeDeep)({}, o, t[n]));
                  }),
                  n && (0, a.J)(t, 'device.sua', Object.assign({}, n, t.device.sua)),
                  r)
                ) {
                  const e = { cdep: r };
                  (0, a.J)(t, 'device.ext', Object.assign({}, e, t.device.ext));
                }
                const o = C.getDocument().documentElement.lang;
                if (o && ((0, a.J)(t, 'site.ext.data.documentLang', o), !(0, d.A)(t, 'site.content.language'))) {
                  const e = o.split('-')[0];
                  (0, a.J)(t, 'site.content.language', e);
                }
                t = S(t);
                for (const e of v.Dy)
                  if ((0, v.O$)(t, e)) {
                    t[e] = (0, s.mergeDeep)({}, $(t, i), t[e]);
                    break;
                  }
                return t;
              });
            });
          function B(e) {
            try {
              return e(C.getWindowTop());
            } catch (t) {
              return e(C.getWindowSelf());
            }
          }
          function R() {
            const e = g.$W.getConfig('firstPartyData.uaHints');
            return Array.isArray(e) && 0 !== e.length ? C.getHighEntropySUA(e) : f.U9.resolve(C.getLowEntropySUA());
          }
          function U(e) {
            return (0, c.SH)(e, Object.keys(e));
          }
          const k = {
              site(e, t) {
                if (!v.Dy.filter((e) => 'site' !== e).some(v.O$.bind(null, e))) return U({ page: t.page, ref: t.ref });
              },
              device: () =>
                B((e) => {
                  const t = (0, l.Ot)().screen.width,
                    n = (0, l.Ot)().screen.height,
                    { width: r, height: i } = (0, T.M)();
                  return {
                    w: t,
                    h: n,
                    dnt: (0, u.l)() ? 1 : 0,
                    ua: e.navigator.userAgent,
                    language: e.navigator.language.split('-').shift(),
                    ext: { vpw: r, vph: i },
                  };
                }),
              regs() {
                const e = {};
                B((e) => e.navigator.globalPrivacyControl) && (0, a.J)(e, 'ext.gpc', '1');
                const t = g.$W.getConfig('coppa');
                return ('boolean' == typeof t && (e.coppa = t ? 1 : 0), e);
              },
            },
            D = (0, s.memoize)(() =>
              B((e) => {
                const t = e.document,
                  n = Array.from(t.querySelectorAll('script[type="application/ld+json"]'));
                let r = [];
                for (const e of n)
                  try {
                    const t = JSON.parse(e.textContent),
                      n = Array.isArray(t) ? t : [t];
                    for (const e of n)
                      if ('string' == typeof e.keywords) {
                        const t = e.keywords
                          .split(',')
                          .map((e) => e.trim())
                          .filter((e) => e.length > 0);
                        r.push(...t);
                      }
                  } catch (e) {}
                return r;
              }),
            ),
            _ = (0, s.memoize)(() =>
              B((e) =>
                e.document
                  .querySelector('meta[name="keywords"]')
                  ?.content?.split(',')
                  .map((e) => e.trim()),
              ),
            );
          function $(e, t) {
            const n = (0, i.gR)(t.page, { noLeadingWww: !0 }),
              r = new Set();
            return (
              (g.$W.getConfig('firstPartyData.keywords.meta') ?? 1) && (_() ?? []).forEach((e) => r.add(e)),
              (g.$W.getConfig('firstPartyData.keywords.json') ?? 1) && (D() ?? []).forEach((e) => r.add(e)),
              U({
                domain: n,
                keywords: r.size > 0 ? Array.from(r.keys()).join(',') : void 0,
                publisher: U({ domain: C.findRootDomain(n) }),
              })
            );
          }
        },
        8417(e, t, n) {
          n.d(t, { Ai: () => l, kl: () => u });
          var r = n(466),
            i = n(6665),
            o = n(1933),
            s = n(2592),
            a = n(765);
          const d = 'outstream',
            c = [
              ['mimes', (e) => Array.isArray(e) && e.length > 0 && e.every((e) => 'string' == typeof e)],
              ['minduration', i.Fq],
              ['maxduration', i.Fq],
              ['startdelay', i.Fq],
              ['maxseq', i.Fq],
              ['poddur', i.Fq],
              ['protocols', i.Uu],
              ['battr', i.Uu],
              ['maxextended', i.Fq],
              ['minbitrate', i.Fq],
              ['maxbitrate', i.Fq],
              ['delivery', i.Uu],
              ['api', i.Uu],
              ['companiontype', i.Uu],
              ['feed', i.Fq],
              ['stitched', i.Fq],
              ['nvol', i.Fq],
            ],
            l = new Map(c);
          function u(e) {}
          (0, s.A_)(
            'sync',
            function (e, t, n, i, s) {
              if (n && (s || i !== d)) {
                const { url: t, useLocal: n } = o.$W.getConfig('cache') || {};
                return t || n || !e.vastXml || e.vastUrl
                  ? !(!e.vastUrl && !e.vastXml)
                  : ((0, r.logError)(
                      `\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling either prebid cache with ${(0, a.k)()}.setConfig({ cache: {url: "..."} });\n        or local cache with ${(0, a.k)()}.setConfig({ cache: { useLocal: true }});\n      `,
                    ),
                    !1);
              }
              return !(i === d && !s) || !!(e.renderer || (t && t.renderer) || n.renderer);
            },
            'checkAudioBidSetup',
          );
        },
        8668(e, t, n) {
          n.d(t, { sc: () => te, Ay: () => fe, pX: () => ae });
          var r = n(6665),
            i = n(466),
            o = n(356),
            s = n(3556),
            a = n(2201),
            d = n(1933),
            c = n(2592);
          const l = 'requests',
            u = 'wins',
            g = 'auctions';
          let f = {};
          function p(e, t) {
            const n = (f[e] = f[e] || { bidders: {} });
            return t ? ((n.bidders[t] = n.bidders[t] || {}), n.bidders[t]) : n;
          }
          function m(e, t) {
            return function (n, r) {
              const i = p(n, t && r);
              return ((i[e] = (i[e] ?? 0) + 1), i[e]);
            };
          }
          function h(e, t) {
            return function (n, r) {
              return p(n, t && r)[e] ?? 0;
            };
          }
          const b = m(l, !1),
            y = m(l, !0),
            v = m(u, !0),
            E = m(g, !1),
            A = h(l, !1),
            w = h(l, !0),
            I = h(u, !0),
            T = h(g, !1);
          var C = n(867),
            S = n(1385),
            O = n(8014),
            B = n(1418),
            R = n(7841),
            U = n(3006),
            k = n(736),
            D = n(3202),
            _ = n(5808),
            $ = n(5291),
            x = n(8928);
          const q = ['data', 'ext.data', 'yob', 'gender', 'keywords', 'kwarray', 'id', 'buyeruid', 'customdata']
              .map((e) => `user.${e}`)
              .concat('device.ext.cdep'),
            W = ['user.eids', 'user.ext.eids'],
            j = ['user.geo.lat', 'user.geo.lon', 'device.geo.lat', 'device.geo.lon'],
            N = ['device.ip'],
            P = ['device.ipv6'];
          function M(e) {
            return Object.assign(
              {
                get() {},
                run(e, t, n, r, i) {
                  const o = n && n[r];
                  if (
                    (function (e) {
                      return null != e && ('object' != typeof e || Object.keys(e).length > 0);
                    })(o) &&
                    i()
                  ) {
                    const e = this.get(o);
                    void 0 === e ? delete n[r] : (n[r] = e);
                  }
                },
              },
              e,
            );
          }
          function F(e) {
            return (
              e.forEach((e) => {
                e.paths = e.paths.map((e) => {
                  const t = e.split('.'),
                    n = t.pop();
                  return [t.length > 0 ? t.join('.') : null, n];
                });
              }),
              function (t, n) {
                const r = [];
                for (var i = arguments.length, o = new Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++) o[s - 2] = arguments[s];
                const a = (function (e) {
                  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                  return function (t) {
                    return (e.hasOwnProperty(t.name) || (e[t.name] = !!t.applies(...n)), e[t.name]);
                  };
                })(t, ...o);
                return (
                  e.forEach((e) => {
                    if (!1 !== t[e.name])
                      for (const [i, o] of e.paths) {
                        const s = null == i ? n : (0, x.A)(n, i);
                        if ((r.push(e.run(n, i, s, o, a.bind(null, e))), !1 === t[e.name])) return;
                      }
                  }),
                  r.filter((e) => null != e)
                );
              }
            );
          }
          function G(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : D.io;
            return function (n) {
              return !t(e, n);
            };
          }
          function L() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : D.io;
            return [
              { name: _.DL, paths: q, applies: G(_.DL, e) },
              { name: _.hq, paths: W, applies: G(_.hq, e) },
              { name: _.hE, paths: j, applies: G(_.hE, e), get: (e) => Math.round(100 * (e + Number.EPSILON)) / 100 },
              {
                name: _.hE,
                paths: N,
                applies: G(_.hE, e),
                get: (e) =>
                  (function (e) {
                    if (!e) return null;
                    const t = e.split('.').map(Number);
                    if (4 !== t.length) return null;
                    const n = [];
                    for (let e = 0; e < 4; e++) {
                      const t = Math.max(0, Math.min(8, 24 - 8 * e));
                      n.push((255 << (8 - t)) & 255);
                    }
                    return t.map((e, t) => e & n[t]).join('.');
                  })(e),
              },
              {
                name: _.hE,
                paths: P,
                applies: G(_.hE, e),
                get: (e) =>
                  (function (e) {
                    if (!e) return null;
                    let t = e.split(':').map((e) => parseInt(e, 16));
                    for (t = t.map((e) => (isNaN(e) ? 0 : e)); t.length < 8; ) t.push(0);
                    if (8 !== t.length) return null;
                    const n = [];
                    for (let e = 0; e < 8; e++) {
                      const t = Math.max(0, Math.min(16, 64 - 16 * e));
                      n.push((65535 << (16 - t)) & 65535);
                    }
                    return t
                      .map((e, t) => e & n[t])
                      .map((e) => e.toString(16))
                      .join(':');
                  })(e),
              },
              { name: _.VJ, paths: ['source.tid', 'source.ext.tidSource'], applies: G(_.VJ, e) },
            ].map(M);
          }
          const z = (function () {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : D.io;
            const t = F(L(e)),
              n = F(
                (function () {
                  let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : D.io;
                  return [
                    { name: _.hq, paths: ['userId', 'userIdAsEids'], applies: G(_.hq, e) },
                    { name: _.VJ, paths: ['ortb2Imp.ext.tid', 'ortb2Imp.ext.tidSource'], applies: G(_.VJ, e) },
                  ].map(M);
                })(e),
              );
            return function (e) {
              const r = {};
              return { ortb2: (n) => (t(r, n, e), n), bidRequest: (t) => (n(r, t, e), t) };
            };
          })();
          (0, D.qB)(_.VJ, 'enableTIDs config', () => {
            if (!d.$W.getConfig('enableTIDs')) return { allow: !1, reason: 'TIDs are disabled' };
          });
          var H = n(2122),
            V = n(1748);
          const Q = 'pbsBidAdapter',
            J = { CLIENT: 'client', SERVER: 'server' },
            Y = { isAllowed: D.io, redact: z },
            K = {},
            X = {},
            Z = {};
          let ee = [];
          d.$W.getConfig('s2sConfig', (e) => {
            e && e.s2sConfig && (ee = (0, r.cy)(e.s2sConfig) ? e.s2sConfig : [e.s2sConfig]);
          });
          const te = (0, $.ZI)((e) => ce.resolveAlias(e));
          function ne(e) {
            return e.configName ?? e.name;
          }
          const re = ['nativeParams', 'nativeOrtbRequest', 'renderer'];
          function ie(e) {
            let { bidderCode: t, auctionId: n, bidderRequestId: o, adUnits: s, src: a, metrics: d, getTid: c } = e;
            return s
              .reduce((e, s) => {
                const l = s.bids.filter((e) => e.bidder === t);
                return (
                  null == t && 0 === l.length && null != s.s2sBid && l.push({ bidder: null }),
                  e.push(
                    l.reduce((e, l) => {
                      const [u, g] = c(l.bidder, s.transactionId, l.ortb2Imp?.ext?.tid ?? s.ortb2Imp?.ext?.tid),
                        f =
                          null ==
                          (l = Object.assign(
                            {},
                            l,
                            { ortb2Imp: (0, i.mergeDeep)({}, s.ortb2Imp, l.ortb2Imp, { ext: { tid: u, tidSource: g } }) },
                            (0, r.SH)(s, re),
                          )).mediaTypes
                            ? s.mediaTypes
                            : l.mediaTypes;
                      return (
                        (0, i.isValidMediaTypes)(f)
                          ? (l = Object.assign({}, l, { mediaTypes: f }))
                          : (0, i.logError)(`mediaTypes is not correctly configured for adunit ${s.code}`),
                        'client' === a && y(s.code, t),
                        e.push(
                          Object.assign({}, l, {
                            adUnitCode: s.code,
                            transactionId: s.transactionId,
                            adUnitId: s.adUnitId,
                            sizes: f?.banner?.sizes || f?.video?.playerSize || [],
                            bidId: l.bid_id || (0, i.generateUUID)(),
                            bidderRequestId: o,
                            auctionId: n,
                            src: a,
                            metrics: d,
                            auctionsCount: T(s.code),
                            bidRequestsCount: A(s.code),
                            bidderRequestsCount: w(s.code, l.bidder),
                            bidderWinsCount: I(s.code, l.bidder),
                            deferBilling: !!s.deferBilling,
                          }),
                        ),
                        e
                      );
                    }, []),
                  ),
                  e
                );
              }, [])
              .reduce(i.flatten, [])
              .filter((e) => '' !== e);
          }
          const oe = (0, c.A_)(
            'sync',
            function (e, t) {
              let { getS2SBidders: n = ae } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              if (null == t) return e;
              {
                const r = n(t);
                return e.filter((e) => {
                  if (!r.has(e.bidder)) return !1;
                  if (null == e.s2sConfigName) return !0;
                  const n = ne(t);
                  return (Array.isArray(e.s2sConfigName) ? e.s2sConfigName : [e.s2sConfigName]).includes(n);
                });
              }
            },
            'filterBidsForAdUnit',
          );
          const se = (0, c.A_)('sync', (e, t) => e, 'setupAdUnitMediaTypes');
          function ae(e) {
            (0, r.cy)(e) || (e = [e]);
            const t = new Set([null]);
            return (
              e
                .filter((e) => e && e.enabled)
                .flatMap((e) => e.bidders)
                .forEach((e) => t.add(e)),
              t
            );
          }
          const de = (0, c.A_)(
            'sync',
            function (e, t) {
              let { getS2SBidders: n = ae } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              const r = n(t);
              return (0, i.getBidderCodes)(e).reduce((e, t) => (e[r.has(t) ? J.SERVER : J.CLIENT].push(t), e), {
                [J.CLIENT]: [],
                [J.SERVER]: [],
              });
            },
            'partitionBidders',
          );
          const ce = {
            bidderRegistry: K,
            analyticsRegistry: Z,
            aliasRegistry: X,
            makeBidRequests: (0, c.A_)(
              'sync',
              function (e, t, n, s, a) {
                let c = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
                  l = arguments.length > 6 ? arguments[6] : void 0;
                ((l = (0, R.BO)(l)),
                  O.Ic(B.qY.BEFORE_REQUEST_BIDS, e),
                  (0, o.nk)(e),
                  e
                    .map((e) => e.code)
                    .filter(i.uniques)
                    .forEach(E));
                const u = c.global || {},
                  g = c.bidder || {},
                  f = (function () {
                    let e, t;
                    return (
                      d.$W.getConfig('consistentTIDs')
                        ? ((e = 'pbjsStable'), (t = (e) => e))
                        : ((e = 'pbjs'),
                          (t = (() => {
                            const e = {};
                            return (t, n) => (
                              e.hasOwnProperty(n) || (e[n] = {}),
                              e[n].hasOwnProperty(t) || (e[n][t] = `u${(0, i.generateUUID)()}`),
                              e[n][t]
                            );
                          })())),
                      function (n, r, i) {
                        return [i ?? t(r, n), null != i ? 'pub' : e];
                      }
                    );
                  })(),
                  p = (() => {
                    const e = {};
                    return function (t, n, r) {
                      const o = ((e, t) => {
                          const n = null != t ? t[$.XG] : '';
                          return n ? `${e}:${n}` : `${e}:`;
                        })(n, r),
                        s = Y.redact(null != r ? r : te(k.tW, n));
                      if (void 0 !== e[o]) return [e[o], s];
                      const [a, d] = f(n, t, g[n]?.source?.tid ?? u.source?.tid),
                        c = Object.freeze(s.ortb2((0, i.mergeDeep)({}, u, g[n], { source: { tid: a, ext: { tidSource: d } } })));
                      return ((e[o] = c), [c, s]);
                    };
                  })();
                let { [J.CLIENT]: m, [J.SERVER]: h } = de(e, ee);
                const y = new Set();
                (e.forEach((e) => {
                  ((0, r.Qd)(e.mediaTypes) || (e.mediaTypes = {}),
                    (e.bids = e.bids.filter((t) => {
                      if (!t.bidder) return !0;
                      const [r] = p(n, t.bidder),
                        i = h.includes(t.bidder) && !m.includes(t.bidder);
                      return Y.isAllowed(_.uc, te(k.tW, t.bidder, { bid: t, ortb2: r, adUnit: e, auctionId: n, isS2S: i }));
                    })),
                    e.bids.forEach((e) => {
                      y.add(e.bidder);
                    }),
                    b(e.code));
                }),
                  (m = m.filter((e) => y.has(e))),
                  (h = h.filter((e) => y.has(e))),
                  (e = se(e, a)),
                  d.$W.getConfig('bidderSequence') === d.Ov && (m = (0, i.shuffle)(m)));
                const v = (0, C.EN)(),
                  A = [];
                function w(e, t) {
                  const [n, r] = p(e.auctionId, e.bidderCode, t);
                  return ((e.ortb2 = n), (e.bids = e.bids.map((e) => ((e.ortb2 = n), r.bidRequest(e)))), e);
                }
                const I = (0, V.m)();
                function T(e) {
                  return (
                    I.pageViewIdPerBidder.has(e) || I.pageViewIdPerBidder.set(e, (0, i.generateUUID)()),
                    I.pageViewIdPerBidder.get(e)
                  );
                }
                ee.forEach((o) => {
                  const s = (function (e) {
                    return te(k.tp, Q, { [$.XG]: ne(e) });
                  })(o);
                  if (o && o.enabled && Y.isAllowed(_.uc, s)) {
                    const { adUnits: a, hasModuleBids: d } = (function (e, t) {
                        let n = (0, r.Go)(e),
                          o = !1;
                        return (
                          n.forEach((e) => {
                            const n = e.bids.filter((e) => e.module === Q && e.params?.configName === ne(t));
                            (1 === n.length
                              ? ((e.s2sBid = n[0]), (o = !0), (e.ortb2Imp = (0, i.mergeDeep)({}, e.s2sBid.ortb2Imp, e.ortb2Imp)))
                              : n.length > 1 &&
                                (0, i.logWarn)('Multiple "module" bids for the same s2s configuration; all will be ignored', n),
                              (e.bids = oe(e.bids, t).map((e) => ((e.bid_id = (0, i.getUniqueIdentifierStr)()), e))));
                          }),
                          (n = n.filter(
                            (e) =>
                              !(
                                (t.filterBidderlessCalls && 1 === e.bids.length && null == e.bids[0].bidder) ||
                                (0 === e.bids.length && null == e.s2sBid)
                              ),
                          )),
                          { adUnits: n, hasModuleBids: o }
                        );
                      })(e, o),
                      c = (0, i.generateUUID)();
                    ((0 === h.length && d ? [null] : h).forEach((e) => {
                      const d = (0, i.generateUUID)(),
                        u = T(e),
                        g = l.fork(),
                        p = w(
                          {
                            bidderCode: e,
                            auctionId: n,
                            bidderRequestId: d,
                            pageViewId: u,
                            uniquePbsTid: c,
                            bids: ie({
                              bidderCode: e,
                              auctionId: n,
                              bidderRequestId: d,
                              adUnits: (0, r.Go)(a),
                              src: B.RW.SRC,
                              metrics: g,
                              getTid: f,
                            }),
                            auctionStart: t,
                            timeout: o.timeout,
                            src: B.RW.SRC,
                            refererInfo: v,
                            metrics: g,
                            alwaysHasCapacity: o.alwaysHasCapacity,
                          },
                          s,
                        );
                      0 !== p.bids.length && A.push(p);
                    }),
                      a.forEach((e) => {
                        const t = e.bids.filter((e) => A.find((t) => t.bids.find((t) => t.bidId === e.bid_id)));
                        e.bids = t;
                      }),
                      A.forEach((e) => {
                        void 0 === e.adUnitsS2SCopy && (e.adUnitsS2SCopy = a.filter((e) => e.bids.length > 0 || null != e.s2sBid));
                      }));
                  }
                });
                const U = (function (e) {
                  let t = (0, r.Go)(e);
                  return (
                    t.forEach((e) => {
                      e.bids = oe(e.bids, null);
                    }),
                    (t = t.filter((e) => 0 !== e.bids.length)),
                    t
                  );
                })(e);
                return (
                  m.forEach((e) => {
                    const o = (0, i.generateUUID)(),
                      a = T(e),
                      d = l.fork(),
                      c = K[e],
                      u = w({
                        bidderCode: e,
                        auctionId: n,
                        pageViewId: a,
                        bidderRequestId: o,
                        bids: ie({
                          bidderCode: e,
                          auctionId: n,
                          bidderRequestId: o,
                          adUnits: (0, r.Go)(U),
                          src: 'client',
                          metrics: d,
                          getTid: f,
                        }),
                        auctionStart: t,
                        timeout: s,
                        refererInfo: v,
                        metrics: d,
                        src: 'client',
                        alwaysHasCapacity: c?.getSpec?.().alwaysHasCapacity,
                      });
                    (c || (0, i.logError)(`Trying to make a request for bidder that does not exist: ${e}`),
                      c && u.bids && 0 !== u.bids.length && A.push(u));
                  }),
                  A.forEach((e) => {
                    (S.mW.getConsentData() && (e.gdprConsent = S.mW.getConsentData()),
                      S.t6.getConsentData() && (e.uspConsent = S.t6.getConsentData()),
                      S.ad.getConsentData() && (e.gppConsent = S.ad.getConsentData()));
                  }),
                  A
                );
              },
              'makeBidRequests',
            ),
            callBids(e, t, n, r, o, s, c) {
              let l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {};
              if (!t.length) return void (0, i.logWarn)('callBids executed with no bidRequests.  Were they filtered by labels or sizing?');
              const [u, g] = t.reduce((e, t) => (e[Number(void 0 !== t.src && t.src === B.RW.SRC)].push(t), e), [[], []]);
              var f = [];
              g.forEach((e) => {
                for (var t = -1, n = 0; n < f.length; ++n)
                  if (e.uniquePbsTid === f[n].uniquePbsTid) {
                    t = n;
                    break;
                  }
                t <= -1 && f.push(e);
              });
              let p = 0;
              (ee.forEach((e) => {
                if (e && f[p] && ae(e).has(f[p].bidderCode)) {
                  const t = (0, a.g4)(s, o ? { request: o.request.bind(null, 's2s'), done: o.done } : void 0),
                    d = e.bidders,
                    u = K[e.adapter],
                    m = f[p].uniquePbsTid,
                    h = f[p].adUnitsS2SCopy,
                    b = g.filter((e) => e.uniquePbsTid === m);
                  if (u) {
                    const o = { ad_units: h, s2sConfig: e, ortb2Fragments: l, requestBidsTimeout: s };
                    if (o.ad_units.length) {
                      const e = b.map(
                          (e) => (
                            (e.start = (0, i.timestamp)()),
                            function (t) {
                              t || c(e.bidderRequestId);
                              for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];
                              r.apply(e, [t, ...i]);
                            }
                          ),
                        ),
                        s = (0, i.getBidderCodes)(o.ad_units).filter((e) => d.includes(e));
                      ((0, i.logMessage)(
                        `CALLING S2S HEADER BIDDERS ==== ${s.length > 0 ? s.join(', ') : 'No bidder specified, using "ortb2Imp" definition(s) only'}`,
                      ),
                        b.forEach((e) => {
                          O.Ic(B.qY.BID_REQUESTED, { ...e, tid: e.auctionId });
                        }),
                        u.callBids(o, g, n, (t) => e.forEach((e) => e(t)), t));
                    }
                  } else (0, i.logError)('missing ' + e.adapter);
                  p++;
                }
              }),
                u.forEach((e) => {
                  e.start = (0, i.timestamp)();
                  const t = K[e.bidderCode];
                  d.$W.runWithBidder(e.bidderCode, () => {
                    ((0, i.logMessage)('CALLING BIDDER'), O.Ic(B.qY.BID_REQUESTED, e));
                  });
                  const l = (0, a.g4)(s, o ? { request: o.request.bind(null, e.bidderCode), done: o.done } : void 0),
                    u = r.bind(e);
                  try {
                    d.$W.runWithBidder(
                      e.bidderCode,
                      t.callBids.bind(t, e, n, u, l, () => c(e.bidderRequestId), d.$W.callbackWithBidder(e.bidderCode)),
                    );
                  } catch (t) {
                    ((0, i.logError)(`${e.bidderCode} Bid Adapter emitted an uncaught error when parsing their bidRequest`, {
                      e: t,
                      bidRequest: e,
                    }),
                      u());
                  }
                }));
            },
            videoAdapters: [],
            registerBidAdapter(e, t) {
              let { supportedMediaTypes: n = [] } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              e && t
                ? 'function' == typeof e.callBids
                  ? ((K[t] = e),
                    S.o2.register(k.tW, t, e.getSpec?.().gvlid),
                    n.includes('video') && ce.videoAdapters.push(t),
                    n.includes('native') && o.mT.push(t))
                  : (0, i.logError)('Bidder adaptor error for bidder code: ' + t + 'bidder must implement a callBids() function')
                : (0, i.logError)('bidAdapter or bidderCode not specified');
            },
            aliasBidAdapter(e, t, n) {
              if (void 0 === K[t]) {
                const r = K[e];
                if (void 0 === r) {
                  const n = [];
                  (ee.forEach((r) => {
                    if (r.bidders && r.bidders.length) {
                      const i = r && r.bidders;
                      r && i.includes(t) ? (X[t] = e) : n.push(e);
                    }
                  }),
                    n.forEach((e) => {
                      (0, i.logError)('bidderCode "' + e + '" is not an existing bidder.', 'adapterManager.aliasBidAdapter');
                    }));
                } else
                  try {
                    let a;
                    const d = (function (e) {
                      const t = [];
                      ce.videoAdapters.includes(e) && t.push('video');
                      o.mT.includes(e) && t.push('native');
                      return t;
                    })(e);
                    if (r.constructor.prototype !== Object.prototype) ((a = new r.constructor()), a.setBidderCode(t));
                    else {
                      const { useBaseGvlid: o = !1 } = n || {},
                        d = r.getSpec(),
                        c = o ? d.gvlid : n?.gvlid;
                      null == c &&
                        null != d.gvlid &&
                        (0, i.logWarn)(
                          `Alias '${t}' will NOT re-use the GVL ID of the original adapter ('${d.code}', gvlid: ${d.gvlid}). Functionality that requires TCF consent may not work as expected.`,
                        );
                      const l = n && n.skipPbsAliasing;
                      ((a = (0, s.xb)(Object.assign({}, d, { code: t, gvlid: c, skipPbsAliasing: l }))), (X[t] = e));
                    }
                    ce.registerBidAdapter(a, t, { supportedMediaTypes: d });
                  } catch (t) {
                    (0, i.logError)(e + ' bidder does not currently support aliasing.', 'adapterManager.aliasBidAdapter');
                  }
              } else (0, i.logMessage)('alias name "' + t + '" has been already specified.');
            },
            resolveAlias(e) {
              let t,
                n = e;
              for (; X[n] && (!t || !t.has(n)); ) ((n = X[n]), (t = t || new Set()).add(n));
              return n;
            },
            registerAnalyticsAdapter(e) {
              let { adapter: t, code: n, gvlid: r } = e;
              t && n
                ? 'function' == typeof t.enableAnalytics
                  ? ((t.code = n), (Z[n] = { adapter: t, gvlid: r }), S.o2.register(k.Tn, n, r))
                  : (0, i.logError)(
                      `Prebid Error: Analytics adaptor error for analytics "${n}"\n        analytics adapter must implement an enableAnalytics() function`,
                    )
                : (0, i.logError)('Prebid Error: analyticsAdapter or analyticsCode not specified');
            },
            enableAnalytics(e) {
              ((0, r.cy)(e) || (e = [e]),
                e.forEach((e) => {
                  const t = Z[e.provider];
                  t && t.adapter
                    ? Y.isAllowed(_.mo, te(k.Tn, e.provider, { [$.TQ]: e })) && t.adapter.enableAnalytics(e)
                    : (0, i.logError)(`Prebid Error: no analytics adapter found in registry for '${e.provider}'.`);
                }));
            },
            getBidAdapter: (e) => K[e],
            getAnalyticsAdapter: (e) => Z[e],
            callTimedOutBidders(e, t, n) {
              ((t = t.map((t) => ((t.params = (0, i.getUserConfiguredParams)(e, t.adUnitCode, t.bidder)), (t.timeout = n), t))),
                (t = (0, i.groupBy)(t, 'bidder')),
                Object.keys(t).forEach((e) => {
                  ge(e, 'onTimeout', t[e]);
                }));
            },
            callBidWonBidder(e, t, n) {
              ((t.params = (0, i.getUserConfiguredParams)(n, t.adUnitCode, t.bidder)), v(t.adUnitCode, t.bidder), ge(e, 'onBidWon', t));
            },
            triggerBilling: (() => {
              const e = new WeakSet();
              return (t) => {
                e.has(t) ||
                  (e.add(t),
                  ((0, H.$T)(t.eventtrackers)[H.OA]?.[H.Ni] || []).forEach((e) => i.internal.triggerPixel(e)),
                  ge(t.bidder, 'onBidBillable', t));
              };
            })(),
            callSetTargetingBidder(e, t) {
              ge(e, 'onSetTargeting', t);
            },
            callBidViewableBidder(e, t) {
              ge(e, 'onBidViewable', t);
            },
            callBidderError(e, t, n) {
              ge(e, 'onBidderError', { error: t, bidderRequest: n });
            },
            callAdRenderSucceededBidder(e, t) {
              ge(e, 'onAdRenderSucceeded', t);
            },
            callOnInterventionBidder(e, t, n) {
              ge(e, 'onIntervention', { bid: t, intervention: n });
            },
            callDataDeletionRequest: (0, c.A_)('sync', function () {
              for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
              const r = 'onDataDeletionRequest';
              (Object.keys(K)
                .filter((e) => !X.hasOwnProperty(e))
                .forEach((e) => {
                  const n = le(e, r);
                  if (null != n) {
                    const i = U.n.getBidsRequested().filter(
                      (t) =>
                        (function (e) {
                          const t = new Set();
                          for (; X.hasOwnProperty(e) && !t.has(e); ) (t.add(e), (e = X[e]));
                          return e;
                        })(t.bidderCode) === e,
                    );
                    ue(e, r, ...n, i, ...t);
                  }
                }),
                Object.entries(Z).forEach((e) => {
                  let [n, o] = e;
                  const s = o?.adapter?.[r];
                  if ('function' == typeof s)
                    try {
                      s.apply(o.adapter, t);
                    } catch (e) {
                      (0, i.logError)(`error calling ${r} of ${n}`, e);
                    }
                }));
            }),
          };
          function le(e, t) {
            const n = K[e],
              r = n?.getSpec && n.getSpec();
            if (r && r[t] && 'function' == typeof r[t]) return [r, r[t]];
          }
          function ue(e, t, n, r) {
            try {
              (0, i.logInfo)(`Invoking ${e}.${t}`);
              for (var o = arguments.length, s = new Array(o > 4 ? o - 4 : 0), a = 4; a < o; a++) s[a - 4] = arguments[a];
              d.$W.runWithBidder(e, r.bind(n, ...s));
            } catch (n) {
              (0, i.logWarn)(`Error calling ${t} of ${e}`);
            }
          }
          function ge(e, t, n) {
            if (n?.source !== B.RW.SRC) {
              const r = le(e, t);
              null != r && ue(e, t, ...r, n);
            }
          }
          const fe = ce;
        },
        9236(e, t, n) {
          function r(e, t) {
            return e === t ? 0 : e < t ? -1 : 1;
          }
          function i() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (e) => e;
            return (t, n) => r(e(t), e(n));
          }
          function o() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r;
            return (t, n) => -e(t, n) || 0;
          }
          function s() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return function (e, n) {
              for (const r of t) {
                const t = r(e, n);
                if (0 !== t) return t;
              }
              return 0;
            };
          }
          function a() {
            return (function () {
              let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r;
              return (t, n) => (e(n, t) < 0 ? n : t);
            })(o(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r));
          }
          n.d(t, { Bq: () => u, Vk: () => l });
          const d = i((e) => e.cpm),
            c = i((e) => e.responseTimestamp),
            l = a(s(d, o(i((e) => e.timeToRespond)))),
            u = a(s(d, o(c)));
          a(s(d, c));
        },
        9794(e, t, n) {
          n.d(t, { D4: () => o, FY: () => a, GE: () => d, G_: () => i, LM: () => s, s6: () => r });
          const r = 'native',
            i = 'video',
            o = 'banner',
            s = 'adpod',
            a = 'audio',
            d = [r, i, o, a];
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7769],
      {
        183(t, n, e) {
          e.d(n, { M: () => h, g: () => o });
          var c = e(466),
            i = e(3958);
          function o() {
            try {
              const t = (0, c.getWindowTop)(),
                { scrollY: n, scrollX: e } = t,
                { height: i, width: o } = h();
              return { top: n, right: e + o, bottom: n + i, left: e };
            } catch (t) {
              return {};
            }
          }
          function h() {
            const t = (0, i.Ot)();
            try {
              const n = t.innerHeight || t.document.documentElement.clientHeight || t.document.body.clientHeight || 0;
              return { width: t.innerWidth || t.document.documentElement.clientWidth || t.document.body.clientWidth || 0, height: n };
            } catch (t) {
              return {};
            }
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [315],
      {
        3367(o, t, r) {
          function n(o) {
            return (
              '1' === o.navigator.doNotTrack ||
              '1' === o.doNotTrack ||
              '1' === o.navigator.msDoNotTrack ||
              'yes' === o.navigator.doNotTrack?.toLowerCase?.()
            );
          }
          function a() {
            let o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
            try {
              return n(o) || (o !== o.top && n(o.top));
            } catch (o) {
              return !1;
            }
          }
          r.d(t, { l: () => a });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1085],
      {
        3293(e, n, t) {
          t.d(n, { G: () => r });
          const r =
            '(()=>{"use strict";const e="Prebid Event",n="browserIntervention";window.render=function(t,r,i){let{ad:o,adUrl:s,width:d,height:c,instl:h}=t,{mkFrame:l,sendMessage:a}=r;if(function(){const t=window;if("ReportingObserver"in t)try{new t.ReportingObserver(t=>{var r;r=t[0],a(e,{event:n,intervention:r})},{buffered:!0,types:["intervention"]}).observe()}catch(e){}}(),!o&&!s){const e=new Error("Missing ad markup or URL");throw e.reason="noAd",e}{if(null==c){const e=i.document?.body;[e,e?.parentElement].filter(e=>null!=e?.style).forEach(e=>{e.style.height="100%"})}const e=i.document,n={width:d??"100%",height:c??"100%"};if(s&&!o?n.src=s:n.srcdoc=o,e.body.appendChild(l(e,n)),h&&i.frameElement){const e=i.frameElement.style;e.width=d?`${d}px`:"100vw",e.height=c?`${c}px`:"100vh"}}}})();';
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2764],
      {
        8074(o, n, e) {
          function t(o, n) {
            return function () {
              const e = document.domain.split('.'),
                t = `_gd${Date.now()}_${n}`;
              for (let n, i, s = 0; s < e.length; s++) {
                const u = e.slice(s).join('.');
                if (
                  (o.setCookie(t, '1', void 0, void 0, u),
                  (i = o.getCookie(t)),
                  o.setCookie(t, '', 'Thu, 01 Jan 1970 00:00:01 GMT', void 0, u),
                  '1' !== i)
                )
                  return n;
                n = u;
              }
            };
          }
          e.d(n, { w: () => t });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7247],
      {
        3819(r, e, a) {
          a.d(e, { D: () => o });
          var n = a(1833),
            t = a(8928);
          const s = ['user.keywords'].concat(n.Dy.flatMap((r) => ['keywords', 'content.keywords'].map((e) => `${r}.${e}`)));
          function o(r) {
            for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) a[n - 1] = arguments[n];
            return (function () {
              const r = new Set();
              for (var e = arguments.length, a = new Array(e), n = 0; n < e; n++) a[n] = arguments[n];
              return (
                a
                  .filter((r) => r)
                  .flatMap((r) => (Array.isArray(r) ? r : r.split(',')))
                  .map((r) => r.replace(/^\s*/, '').replace(/\s*$/, ''))
                  .filter((r) => r)
                  .forEach((e) => r.add(e)),
                Array.from(r.keys())
              );
            })(...s.map((e) => (0, t.A)(r, e)), ...a);
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5444],
      {
        6614(e, t, n) {
          n.d(t, { DX: () => c, GS: () => a, vk: () => o });
          var r = n(6665);
          function o(e) {
            return e
              .replace(/(?:^|\.?)([A-Z])/g, function (e, t) {
                return '_' + t.toLowerCase();
              })
              .replace(/^_/, '');
          }
          const c = [
            { code: 'appnexusAst', gvlid: 32 },
            { code: 'pagescience', gvlid: 32 },
            { code: 'gourmetads', gvlid: 32 },
            { code: 'newdream', gvlid: 32 },
            { code: 'matomy', gvlid: 32 },
            { code: 'featureforward', gvlid: 32 },
            { code: 'oftmedia', gvlid: 32 },
            { code: 'adasta', gvlid: 32 },
            { code: 'beintoo', gvlid: 618 },
            { code: 'projectagora', gvlid: 1032 },
            { code: 'stailamedia', gvlid: 32 },
            { code: 'uol', gvlid: 32 },
            { code: 'adzymic', gvlid: 723 },
          ];
          function a(e, t) {
            const n = [];
            for (let o = 0; o < t; o++) {
              const t = (0, r.Qd)(e) ? (0, r.Go)(e) : e;
              n.push(t);
            }
            return n;
          }
        },
        8695(e, t, n) {
          n.d(t, { QF: () => g, T_: () => p, gg: () => l });
          var r = n(466),
            o = n(8928),
            c = n(6665),
            a = n(3819),
            i = n(1833);
          const s = { 526: '1plusX', 527: '1plusX', 541: 'captify_segments', 540: 'perid' },
            d = ['user.data'].concat(i.Dy.map((e) => `${e}.content.data`));
          function u(e, t, n) {
            return null == t
              ? n
              : (0, c.O8)(t)
                ? t
                : (0, c.Et)(t)
                  ? t.toString()
                  : void (0, r.logWarn)('Unsuported type for param: ' + e + ' required type: String');
          }
          function l(e) {
            return (0, c.O8)(e) && '' !== e ? f(e.split(/\s*(?:,)\s*/)) : {};
          }
          function f(e) {
            const t = {};
            return (
              e.forEach((e) => {
                if (-1 !== e.indexOf('=')) {
                  const n = e.split('='),
                    r = n[0],
                    o = n[1];
                  t.hasOwnProperty(r) ? t[r].push(o) : (t[r] = [o]);
                } else t.hasOwnProperty(e) || (t[e] = []);
              }),
              t
            );
          }
          function p() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return (function (e) {
              let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'keywords';
              const n = [];
              return (
                (0, r._each)(e, (e, o) => {
                  if ((0, c.cy)(e)) {
                    const n = [];
                    ((0, r._each)(e, (e) => {
                      ((e = u(t + '.' + o, e)) || '' === e) && n.push(e);
                    }),
                      (e = n));
                  } else {
                    if (((e = u(t + '.' + o, e)), !(0, c.O8)(e))) return;
                    e = [e];
                  }
                  e = e.filter((e) => '' !== e);
                  const a = { key: o };
                  (e.length > 0 && (a.value = e), n.push(a));
                }),
                n
              );
            })(
              (0, r.mergeDeep)(
                ...t.map((e) =>
                  Object.fromEntries(
                    Object.entries(e || {}).map((e) => {
                      let [t, n] = e;
                      return [t, (0, c.Et)(n) || (0, c.O8)(n) ? [n] : n];
                    }),
                  ),
                ),
              ),
            );
          }
          function g(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            return p(
              (function (e) {
                return f((0, a.D)(e));
              })(e),
              (function (e) {
                const t = e?.site?.ext?.data?.['ias-brand-safety'];
                if (t && 'object' == typeof t && Object.keys(t).length > 0)
                  return f(
                    Object.entries(t).map((e) => {
                      let [t, n] = e;
                      return `${t}=${n}`;
                    }),
                  );
                return {};
              })(e),
              (function (e) {
                const t = {};
                return (
                  d.forEach((n) => {
                    ((0, o.A)(e, n) || []).forEach((e) => {
                      const n = s[e?.ext?.segtax];
                      n &&
                        e.segment.forEach((e) => {
                          t[n] ? t[n].push(e.id) : (t[n] = [e.id]);
                        });
                    });
                  }),
                  t
                );
              })(e),
              ...n,
            );
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2126],
      {
        3610(e, r, n) {
          n.d(r, { $: () => t });
          var s = n(6665);
          function t(e, r) {
            return (
              Object.keys(e).forEach((n) => {
                var t, u;
                r[n] &&
                  ((0, s.fp)(e[n])
                    ? (r[n] = e[n](r[n]))
                    : (r[n] = ((t = e[n]), (u = r[n]), 'string' === t ? u && u.toString() : 'number' === t ? Number(u) : u)),
                  isNaN(r[n]) && delete r.key);
              }),
              r
            );
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4982],
      {
        8657(s, n, e) {
          function t(s, n) {
            const e = [];
            for (let t = 0; t < Math.ceil(s.length / n); t++) {
              const h = t * n,
                l = h + n;
              e.push(s.slice(h, l));
            }
            return e;
          }
          e.d(n, { i: () => t });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2698],
      {
        3468(A, B, I) {
          I.d(B, { n: () => s });
          const s = {
            1: 'IAB20-3',
            2: 'IAB18-5',
            3: 'IAB10-1',
            4: 'IAB2-3',
            5: 'IAB19-8',
            6: 'IAB22-1',
            7: 'IAB18-1',
            8: 'IAB12-3',
            9: 'IAB5-1',
            10: 'IAB4-5',
            11: 'IAB13-4',
            12: 'IAB8-7',
            13: 'IAB9-7',
            14: 'IAB7-1',
            15: 'IAB20-18',
            16: 'IAB10-7',
            17: 'IAB19-18',
            18: 'IAB13-6',
            19: 'IAB18-4',
            20: 'IAB1-5',
            21: 'IAB1-6',
            22: 'IAB3-4',
            23: 'IAB19-13',
            24: 'IAB22-2',
            25: 'IAB3-9',
            26: 'IAB17-18',
            27: 'IAB19-6',
            28: 'IAB1-7',
            29: 'IAB9-30',
            30: 'IAB20-7',
            31: 'IAB20-17',
            32: 'IAB7-32',
            33: 'IAB16-5',
            34: 'IAB19-34',
            35: 'IAB11-5',
            36: 'IAB12-3',
            37: 'IAB11-4',
            38: 'IAB12-3',
            39: 'IAB9-30',
            41: 'IAB7-44',
            42: 'IAB7-1',
            43: 'IAB7-30',
            50: 'IAB19-30',
            51: 'IAB17-12',
            52: 'IAB19-30',
            53: 'IAB3-1',
            55: 'IAB13-2',
            56: 'IAB19-30',
            57: 'IAB19-30',
            58: 'IAB7-39',
            59: 'IAB22-1',
            60: 'IAB7-39',
            61: 'IAB21-3',
            62: 'IAB5-1',
            63: 'IAB12-3',
            64: 'IAB20-18',
            65: 'IAB11-2',
            66: 'IAB17-18',
            67: 'IAB9-9',
            68: 'IAB9-5',
            69: 'IAB7-44',
            71: 'IAB22-3',
            73: 'IAB19-30',
            74: 'IAB8-5',
            78: 'IAB22-1',
            85: 'IAB12-2',
            86: 'IAB22-3',
            87: 'IAB11-3',
            112: 'IAB7-32',
            113: 'IAB7-32',
            114: 'IAB7-32',
            115: 'IAB7-32',
            118: 'IAB9-5',
            119: 'IAB9-5',
            120: 'IAB9-5',
            121: 'IAB9-5',
            122: 'IAB9-5',
            123: 'IAB9-5',
            124: 'IAB9-5',
            125: 'IAB9-5',
            126: 'IAB9-5',
            127: 'IAB22-1',
            132: 'IAB1-2',
            133: 'IAB19-30',
            137: 'IAB3-9',
            138: 'IAB19-3',
            140: 'IAB2-3',
            141: 'IAB2-1',
            142: 'IAB2-3',
            143: 'IAB17-13',
            166: 'IAB11-4',
            175: 'IAB3-1',
            176: 'IAB13-4',
            182: 'IAB8-9',
            183: 'IAB3-5',
          };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2630],
      {
        4369(e, t, n) {
          n.d(t, { Ay: () => d });
          var l = n(1418),
            s = n(2201),
            a = n(466),
            i = n(8014),
            r = n(1933);
          const o = { ajax: s.RD },
            c = 'analyticsLabels',
            p = { internal: {}, publisher: {} };
          let u = {};
          r.$W.getConfig(c, (e) => {
            ((p.publisher = e[c]), (u = b()));
          });
          const b = () => Object.values(p).reduce((e, t) => ({ ...e, ...t }), {}),
            g = Object.values(l.qY).filter((e) => e !== l.qY.AUCTION_DEBUG);
          let y = 100;
          function d(e) {
            let { url: t, analyticsType: n, global: s, handler: r } = e;
            const p = [];
            let b,
              d,
              f = !1,
              h = !0;
            const v = (() => {
              let e,
                t = !1;
              const n = () => {
                if (!t) {
                  t = !0;
                  try {
                    let e = 0,
                      t = 0;
                    for (; p.length > 0; ) {
                      e++;
                      const n = p.length;
                      if ((p.shift()(), p.length >= n ? t++ : (t = 0), t >= 10))
                        return ((0, a.logError)('Detected probable infinite loop, discarding events', p), void (p.length = 0));
                    }
                    (0, a.logMessage)(`${d} analytics: processed ${e} events`);
                  } finally {
                    t = !1;
                  }
                }
              };
              return function () {
                (null != e && (clearTimeout(e), (e = null)), 0 === y ? n() : (e = setTimeout(n, y)));
              };
            })();
            return Object.defineProperties(
              {
                track: function (e) {
                  const { eventType: n, args: l } = e;
                  'bundle' === this.getAdapterType() && window[s](r, n, l);
                  'endpoint' === this.getAdapterType() &&
                    (function (e) {
                      let { eventType: n, args: l, callback: s } = e;
                      o.ajax(t, s, JSON.stringify({ eventType: n, args: l, labels: u }));
                    })(e);
                },
                enqueue: T,
                enableAnalytics: A,
                disableAnalytics: function () {
                  (Object.entries(b || {}).forEach((e) => {
                    let [t, n] = e;
                    i.AU(t, n);
                  }),
                    (this.enableAnalytics = this._oldEnable ? this._oldEnable : A),
                    (f = !1));
                },
                getAdapterType: () => n,
                getGlobal: () => s,
                getHandler: () => r,
                getUrl: () => t,
              },
              { enabled: { get: () => f } },
            );
            function T(e) {
              let { eventType: t, args: n } = e;
              (p.push(() => {
                (Object.keys(u || []).length > 0 && (n = { [c]: u, ...n }), this.track({ eventType: t, labels: u, args: n }));
              }),
                v());
            }
            function A(e) {
              if (
                ((d = e?.provider),
                (h =
                  'object' != typeof e ||
                  'object' != typeof e.options ||
                  void 0 === e.options.sampling ||
                  Math.random() < parseFloat(e.options.sampling)),
                h)
              ) {
                const t = (() => {
                  const { includeEvents: t = g, excludeEvents: n = [] } = e || {};
                  return new Set(
                    Object.values(l.qY)
                      .filter((e) => t.includes(e))
                      .filter((e) => !n.includes(e)),
                  );
                })();
                (i.kQ().forEach((e) => {
                  if (!e || !t.has(e.eventType)) return;
                  const { eventType: n, args: l } = e;
                  T.call(this, { eventType: n, args: l });
                }),
                  (b = Object.fromEntries(
                    Array.from(t).map((e) => {
                      const t = (t) => this.enqueue({ eventType: e, args: t });
                      return (i.on(e, t), [e, t]);
                    }),
                  )));
              } else (0, a.logMessage)(`Analytics adapter for "${s}" disabled by sampling`);
              ((this._oldEnable = this.enableAnalytics),
                (this.enableAnalytics = function () {
                  return (0, a.logMessage)(`Analytics adapter for "${s}" already enabled, unnecessary call to \`enableAnalytics\`.`);
                }),
                (f = !0));
            }
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7109],
      {
        3254(e, t, n) {
          n.d(t, { c5: () => a, q4: () => i });
          var s = n(3064);
          const r = 0,
            i = 2;
          function a(e) {
            let {
                apiName: t,
                apiVersion: n,
                apiArgs: a = ['command', 'callback', 'parameter', 'version'],
                callbackArgs: l = ['returnValue', 'success'],
                mode: c = r,
              } = e,
              o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
            const p = {},
              u = `${t}Call`,
              m = `${t}Return`;
            function d(e) {
              const t = 'string' == typeof e.data && e.data.includes(m) ? JSON.parse(e.data) : e.data;
              if (t?.[m]?.callId) {
                const e = t[m];
                p.hasOwnProperty(e.callId) && p[e.callId](...l.map((t) => e[t]));
              }
            }
            const [f, g] = (function () {
              let e,
                n = o,
                s = !1;
              for (; null != n; ) {
                try {
                  if ('function' == typeof n[t]) {
                    ((e = n), (s = !0));
                    break;
                  }
                } catch (e) {}
                try {
                  if (n.frames[`${t}Locator`]) {
                    e = n;
                    break;
                  }
                } catch (e) {}
                if (n === o.top) break;
                n = n.parent;
              }
              return [e, s];
            })();
            if (!f) return;
            function h(e) {
              return ((e = Object.assign({ version: n }, e)), a.map((t) => [t, e[t]]));
            }
            function v(e, t, n, s) {
              const r = 'function' == typeof e;
              return function (i, a) {
                if ((s && s(), 1 !== c)) {
                  (null == a || a ? t : n)(r ? void 0 : i);
                }
                r && e.apply(this, arguments);
              };
            }
            let C;
            return (
              g
                ? (C = function () {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return new s.U9((n, s) => {
                      const a = f[t](
                        ...h({ ...e, callback: e.callback || c === i ? v(e.callback, n, s) : void 0 }).map((e) => {
                          let [t, n] = e;
                          return n;
                        }),
                      );
                      (1 === c || (null == e.callback && c === r)) && n(a);
                    });
                  })
                : (o.addEventListener('message', d, !1),
                  (C = function (e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    return new s.U9((n, s) => {
                      const r = Math.random().toString(),
                        i = {
                          [u]: {
                            ...Object.fromEntries(
                              h(e).filter((e) => {
                                let [t] = e;
                                return 'callback' !== t;
                              }),
                            ),
                            callId: r,
                          },
                        };
                      ((p[r] = v(
                        e?.callback,
                        n,
                        s,
                        (t || null == e?.callback) &&
                          (() => {
                            delete p[r];
                          }),
                      )),
                        f.postMessage(i, '*'),
                        1 === c && n());
                    });
                  })),
              Object.assign(C, {
                isDirect: g,
                close() {
                  !g && o.removeEventListener('message', d);
                },
              })
            );
          }
        },
        9708(e, t, n) {
          n.d(t, { Al: () => l });
          var s = n(466);
          class r {
            cmpApi = null;
            listenerId = void 0;
            setCmpApi(e) {
              this.cmpApi = e;
            }
            getCmpApi() {
              return this.cmpApi;
            }
            setCmpListenerId(e) {
              this.listenerId = e;
            }
            getCmpListenerId() {
              return this.listenerId;
            }
            resetCmpApis() {
              ((this.cmpApi = null), (this.listenerId = void 0));
            }
            getRemoveListenerParams() {
              const e = this.getCmpApi(),
                t = this.getCmpListenerId();
              return e && 'function' == typeof e && null != t
                ? { command: 'removeEventListener', callback: () => this.resetCmpApis(), parameter: t }
                : null;
            }
          }
          class i extends r {
            constructor(e) {
              (super(), (this.getConsentData = e || (() => null)));
            }
            removeCmpEventListener() {
              const e = this.getRemoveListenerParams();
              if (e) {
                const t = this.getConsentData();
                ((e.apiVersion = t?.apiVersion || 2), (0, s.logInfo)('Removing TCF CMP event listener'), this.getCmpApi()(e));
              }
            }
          }
          class a extends r {
            removeCmpEventListener() {
              const e = this.getRemoveListenerParams();
              e && ((0, s.logInfo)('Removing GPP CMP event listener'), this.getCmpApi()(e));
            }
          }
          function l(e, t) {
            switch (e) {
              case 'tcf':
                return new i(t);
              case 'gpp':
                return new a();
              default:
                return ((0, s.logError)(`Unknown CMP type: ${e}`), null);
            }
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [10],
      {
        3965(n, e, t) {
          t.d(e, { yq: () => c });
          var o = t(7841),
            a = t(466),
            s = t(6665),
            r = t(3064),
            i = t(5291),
            l = t(2592);
          function c() {
            let n,
              e,
              t,
              {
                namespace: c,
                displayName: u,
                consentDataHandler: m,
                parseConsentData: g,
                getNullConsent: f,
                cmpHandlers: d,
                cmpEventCleanup: p,
                DEFAULT_CMP: C = 'iab',
                DEFAULT_CONSENT_TIMEOUT: D = 1e4,
              } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            function h(n) {
              return `consentManagement.${c} ${n}`;
            }
            function b(n, e) {
              return n(Object.assign({ [`${c}Consent`]: m.getConsentData() }, e));
            }
            function T() {
              return e().then((n) => {
                let { error: e } = n;
                return { error: e, consentData: m.getConsentData() };
              });
            }
            function k() {
              null == n &&
                ((n = (function (n, e) {
                  const t = new WeakSet();
                  return (0, o.Ak)(n, function (n, o) {
                    return e()
                      .then((e) => {
                        let { consentData: s, error: r } = e;
                        (!r || (s && t.has(r)) || (t.add(r), (0, a.logWarn)(r.message, ...(r.args || []))), n.call(this, o));
                      })
                      .catch((e) => {
                        ((0, a.logError)(`${e?.message} Canceling auction as per consentManagement config.`, ...(e?.args || [])),
                          n.stopTiming(),
                          'function' == typeof o.bidsBackHandler
                            ? o.bidsBackHandler()
                            : (0, a.logError)('Error executing bidsBackHandler'));
                      });
                  });
                })(c, () => e())),
                (0, l.Yn)('requestBids').before(n, 50),
                i.U3.before(b),
                (0, a.logInfo)(`${u} consentManagement module has been activated...`));
            }
            function E() {
              null != n &&
                ((0, l.Yn)('requestBids').getHooks({ hook: n }).remove(),
                i.U3.getHooks({ hook: b }).remove(),
                (n = null),
                (0, a.logInfo)(`${u} consentManagement module has been deactivated...`));
            }
            return function (o) {
              const i = o?.[c];
              if (!i || 'object' != typeof i) return ((0, a.logInfo)(h('config not defined, exiting consent manager module')), E(), {});
              if (!1 === i?.enabled)
                return (
                  (0, a.logWarn)(h('config enabled is set to false, disabling consent manager module')),
                  (function () {
                    if ((E(), 'function' == typeof p))
                      try {
                        p();
                      } catch (n) {
                        (0, a.logError)(`Error during CMP event cleanup for ${u}:`, n);
                      }
                  })(),
                  {}
                );
              let l, b;
              ((0, s.O8)(i.cmpApi)
                ? (l = i.cmpApi)
                : ((l = C), (0, a.logInfo)(h(`config did not specify cmp.  Using system default setting (${C}).`))),
                (0, s.Et)(i.timeout)
                  ? (b = i.timeout)
                  : ((b = D), (0, a.logInfo)(h(`config did not specify timeout.  Using system default setting (${D}).`))));
              const y = (0, s.Et)(i.actionTimeout) ? i.actionTimeout : null;
              let $;
              'static' === l
                ? (0, s.Qd)(i.consentData)
                  ? ((t = i.consentData), (b = null), ($ = () => new r.U9((n) => n(m.setConsentData(g(t))))))
                  : (0, a.logError)(
                      h("config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters."),
                    )
                : d.hasOwnProperty(l)
                  ? ($ = d[l])
                  : (m.setConsentData(null),
                    (0, a.logWarn)(
                      `${u} CMP framework (${l}) is not a supported framework.  Aborting consentManagement module and resuming auction.`,
                    ),
                    ($ = () => r.U9.resolve()));
              const w = () =>
                (function (n) {
                  let e,
                    { name: t, consentDataHandler: o, setupCmp: a, cmpTimeout: s, actionTimeout: r, getNullConsent: i } = n;
                  return (
                    o.enable(),
                    new Promise((n, l) => {
                      let c,
                        u = !1;
                      function m(a) {
                        (null != e && clearTimeout(e),
                          (e =
                            null != a
                              ? setTimeout(() => {
                                  const e = o.getConsentData() ?? (u ? c : i()),
                                    a = 'timeout waiting for ' + (u ? 'user action on CMP' : 'CMP to load');
                                  (o.setConsentData(e), n({ consentData: e, error: new Error(`${t} ${a}`) }));
                                }, a)
                              : null));
                      }
                      (a(function (n) {
                        ((c = n), u || ((u = !0), null != r && m(r)));
                      }).then(() => n({ consentData: o.getConsentData() }), l),
                        null != s && m(s));
                    })
                      .finally(() => {
                        e && clearTimeout(e);
                      })
                      .catch((n) => {
                        throw (o.setConsentData(null), n);
                      })
                  );
                })({ name: u, consentDataHandler: m, setupCmp: $, cmpTimeout: b, actionTimeout: y, getNullConsent: f });
              return (
                (e = (() => {
                  let n;
                  return function () {
                    return (
                      null == n &&
                        (n = w().catch((e) => {
                          throw ((n = null), e);
                        })),
                      n
                    );
                  };
                })()),
                k(),
                { cmpHandler: l, cmpTimeout: b, actionTimeout: y, staticConsentData: t, loadConsentData: T, requestBidsHook: n }
              );
            };
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5957],
      {
        6283(e, t, s) {
          function n() {
            const e = new Set();
            return {
              submit(t, s, n) {
                const u = {
                  onResume: s,
                  timerId: setTimeout(() => {
                    (e.delete(u), n());
                  }, t),
                };
                e.add(u);
              },
              resume() {
                for (const t of e) (e.delete(t), clearTimeout(t.timerId), t.onResume());
              },
            };
          }
          s.d(t, { L: () => n });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1912],
      {
        770(e, t, s) {
          s.d(t, { E0: () => g, kz: () => n, wq: () => p });
          var r = s(2201),
            i = s(466);
          const n = '1.1';
          function o(e) {
            return !!(
              'object' == typeof e &&
              null !== e &&
              e.advertising_token &&
              e.identity_expires &&
              e.refresh_from &&
              e.refresh_token &&
              e.refresh_expires
            );
          }
          function a(e) {
            return `UID2 shared library - ${e}`;
          }
          function l(e) {
            for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) s[r - 1] = arguments[r];
            e(a(s[0]), ...s.slice(1));
          }
          class c {
            constructor(e, t, s, r) {
              ((this._baseUrl = e.baseUrl),
                (this._clientVersion = t),
                (this._logInfo = function () {
                  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                  return l(s, ...t);
                }),
                (this._logWarn = r));
            }
            createArrayBuffer(e) {
              const t = new Uint8Array(e.length);
              for (let s = 0; s < e.length; s++) t[s] = e.charCodeAt(s);
              return t;
            }
            hasStatusResponse(e) {
              return 'object' == typeof e && e && e.status;
            }
            isValidRefreshResponse(e) {
              return (
                this.hasStatusResponse(e) &&
                ('optout' === e.status || 'expired_token' === e.status || ('success' === e.status && e.body && o(e.body)))
              );
            }
            ResponseToRefreshResult(e) {
              return this.isValidRefreshResponse(e)
                ? 'success' === e.status
                  ? { status: e.status, identity: e.body }
                  : 'optout' === e.status
                    ? { status: e.status, identity: 'optout' }
                    : e
                : a("Response didn't contain a valid status");
            }
            callRefreshApi(e) {
              const t = this._baseUrl + '/v2/token/refresh';
              let s, i;
              const n = new Promise((e, t) => {
                ((s = e), (i = t));
              });
              return (
                this._logInfo('Sending refresh request', e),
                (0, r.RD)(
                  t,
                  {
                    success: (t) => {
                      try {
                        if (e.refresh_response_key) {
                          this._logInfo('Decrypting refresh API response');
                          const r = this.createArrayBuffer(atob(t));
                          window.crypto.subtle
                            .importKey('raw', this.createArrayBuffer(atob(e.refresh_response_key)), { name: 'AES-GCM' }, !1, ['decrypt'])
                            .then(
                              (e) => {
                                (this._logInfo('Imported decryption key'),
                                  window.crypto.subtle
                                    .decrypt({ name: 'AES-GCM', iv: r.slice(0, 12), tagLength: 128 }, e, r.slice(12))
                                    .then(
                                      (e) => {
                                        const t = String.fromCharCode(...new Uint8Array(e));
                                        this._logInfo('Decrypted to:', t);
                                        const r = JSON.parse(t),
                                          n = this.ResponseToRefreshResult(r);
                                        'string' == typeof n ? i(a(n)) : s(n);
                                      },
                                      (e) => this._logWarn(a('Call to UID2 API failed'), e),
                                    ));
                              },
                              (e) => this._logWarn(a('Call to UID2 API failed'), e),
                            );
                        } else {
                          this._logInfo('No response decryption key available, assuming unencrypted JSON');
                          const e = JSON.parse(t),
                            r = this.ResponseToRefreshResult(e);
                          'string' == typeof r ? i(a(r)) : s(r);
                        }
                      } catch (e) {
                        i(a(t));
                      }
                    },
                    error: (e, t) => {
                      try {
                        this._logInfo('Error status, assuming unencrypted JSON');
                        const e = JSON.parse(t.responseText),
                          r = this.ResponseToRefreshResult(e);
                        'string' == typeof r ? i(a(r)) : s(r);
                      } catch (t) {
                        i(a(e));
                      }
                    },
                  },
                  e.refresh_token,
                  { method: 'POST', customHeaders: { 'X-UID2-Client-Version': this._clientVersion } },
                ),
                n
              );
            }
          }
          class u {
            constructor(e, t, s, r) {
              ((this._storage = e),
                (this._preferLocalStorage = t),
                (this._storageName = s),
                (this._logInfo = function () {
                  for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
                  return l(r, ...t);
                }));
            }
            readCookie(e) {
              return this._storage.cookiesAreEnabled() ? this._storage.getCookie(e) : null;
            }
            readLocalStorage(e) {
              return this._storage.localStorageIsEnabled() ? this._storage.getDataFromLocalStorage(e) : null;
            }
            readModuleCookie() {
              return this.parseIfContainsBraces(this.readCookie(this._storageName));
            }
            writeModuleCookie(e) {
              this._storage.setCookie(this._storageName, JSON.stringify(e), Date.now() + 864e5);
            }
            readModuleStorage() {
              return this.parseIfContainsBraces(this.readLocalStorage(this._storageName));
            }
            writeModuleStorage(e) {
              this._storage.setDataInLocalStorage(this._storageName, JSON.stringify(e));
            }
            readProvidedCookie(e) {
              return JSON.parse(this.readCookie(e));
            }
            parseIfContainsBraces(e) {
              return e?.includes('{') ? JSON.parse(e) : e;
            }
            storeValue(e) {
              this._preferLocalStorage ? this.writeModuleStorage(e) : this.writeModuleCookie(e);
            }
            getStoredValueWithFallback() {
              const e = this._preferLocalStorage ? 'local storage' : 'cookie',
                t = (this._preferLocalStorage ? this.readModuleStorage : this.readModuleCookie).bind(this),
                s = (this._preferLocalStorage ? this.writeModuleStorage : this.writeModuleCookie).bind(this),
                r = (this._preferLocalStorage ? this.readModuleCookie : this.readModuleStorage).bind(this),
                i = t();
              if (i) {
                if ('string' == typeof i) {
                  const t = r();
                  if (t && 'object' == typeof t)
                    return (
                      this._logInfo(
                        `${e} contained a basic token, but found a refreshable token fallback. Copying the fallback value to ${e}.`,
                      ),
                      s(t),
                      t
                    );
                }
              } else {
                const t = r();
                if (t)
                  return (
                    this._logInfo(`${e} was empty, but found a fallback value.`),
                    'object' == typeof t && (this._logInfo(`Copying the fallback value to ${e}.`), s(t)),
                    t
                  );
              }
              return i;
            }
          }
          function d(e, t, s, r, i, n) {
            i('UID2 base url provided: ', e);
            return new c({ baseUrl: e }, s, i, n).callRefreshApi(t).then((e) => {
              i('Refresh endpoint responded with:', e);
              const s = { originalToken: t, latestToken: e.identity },
                n = r.getStoredValueWithFallback();
              return (n?.originalIdentity && (s.originalIdentity = n.originalIdentity), r.storeValue(s), s);
            });
          }
          let h;
          {
            const e = 9;
            h = {
              isCSTGOptionsValid(e, t) {
                if ('object' != typeof e || null === e)
                  return (
                    t(
                      'CSTG is not being used, but is included in the Prebid.js bundle. You can reduce the bundle size by passing "--disable UID2_CSTG" to the Prebid.js build.',
                    ),
                    !1
                  );
                const s = e;
                if (!s.serverPublicKey && !s.subscriptionId) return (t('CSTG has been enabled but its parameters have not been set.'), !1);
                if ('string' != typeof s.serverPublicKey) return (t('CSTG opts.serverPublicKey must be a string'), !1);
                const r = /^(UID2|EUID)-X-[A-Z]-.+/;
                return r.test(s.serverPublicKey)
                  ? 'string' != typeof s.subscriptionId
                    ? (t('CSTG opts.subscriptionId must be a string'), !1)
                    : 0 !== s.subscriptionId.length || (t('CSTG opts.subscriptionId is empty'), !1)
                  : (t(`CSTG opts.serverPublicKey must match the regular expression ${r}`), !1);
              },
              getValidIdentity(e, s) {
                if (e.emailHash)
                  return t.isBase64Hash(e.emailHash) ? { email_hash: e.emailHash } : void s('CSTG opts.emailHash is invalid');
                if (e.phoneHash)
                  return t.isBase64Hash(e.phoneHash) ? { phone_hash: e.phoneHash } : void s('CSTG opts.phoneHash is invalid');
                if (e.email) {
                  const r = t.normalizeEmail(e.email);
                  return void 0 === r ? void s('CSTG opts.email is invalid') : { email: r };
                }
                return e.phone ? (t.isNormalizedPhone(e.phone) ? { phone: e.phone } : void s('CSTG opts.phone is invalid')) : void 0;
              },
              isStoredTokenInvalid(e, t, s, r) {
                if (t) {
                  if ('optout' === t.latestToken) return !0;
                  const r = Object.values(e)[0];
                  if (!this.isStoredTokenFromSameIdentity(t, r))
                    return (s('CSTG supplied new identity - ignoring stored value.', t.originalIdentity, e), !0);
                }
                return !1;
              },
              async generateTokenAndStore(e, t, r, i, n, o) {
                n('UID2 cstg opts provided: ', JSON.stringify(t));
                const a = new s({ baseUrl: e, cstg: t }, n, o),
                  l = await a.generateToken(r);
                n('CSTG endpoint responded with:', l);
                const c = { originalIdentity: this.encodeOriginalIdentity(r), latestToken: l.identity };
                return (i.storeValue(c), c);
              },
              isStoredTokenFromSameIdentity: (e, t) =>
                !!e.originalIdentity && (0, i.cyrb53Hash)(t, e.originalIdentity.salt) === e.originalIdentity.identity,
              encodeOriginalIdentity(e) {
                const t = Object.values(e)[0],
                  s = Math.floor(Math.random() * Math.pow(2, 32));
                return { identity: (0, i.cyrb53Hash)(t, s), salt: s };
              },
            };
            class t {
              static EMAIL_EXTENSION_SYMBOL = '+';
              static EMAIL_DOT = '.';
              static GMAIL_DOMAIN = 'gmail.com';
              static isBase64Hash(e) {
                if (!e || 44 !== e.length) return !1;
                try {
                  return btoa(atob(e)) === e;
                } catch (e) {
                  return !1;
                }
              }
              static isNormalizedPhone(e) {
                return /^\+[0-9]{10,15}$/.test(e);
              }
              static normalizeEmail(e) {
                if (!e || !e.length) return;
                const t = e.trim().toLowerCase();
                if (t.indexOf(' ') > 0) return;
                const s = this.splitEmailIntoAddressAndDomain(t);
                if (!s) return;
                const { address: r, domain: i } = s,
                  n = this.isGmail(i),
                  o = this.normalizeAddressPart(r, n, n);
                return o ? `${o}@${i}` : void 0;
              }
              static splitEmailIntoAddressAndDomain(e) {
                const t = e.split('@');
                if (2 === t.length && !t.some((e) => '' === e)) return { address: t[0], domain: t[1] };
              }
              static isGmail(e) {
                return e === this.GMAIL_DOMAIN;
              }
              static dropExtension(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.EMAIL_EXTENSION_SYMBOL;
                return e.split(t)[0];
              }
              static normalizeAddressPart(e, t, s) {
                let r = e;
                return (t && (r = r.replaceAll(this.EMAIL_DOT, '')), s && (r = this.dropExtension(r)), r);
              }
            }
            class s {
              constructor(e, t, s) {
                ((this._baseUrl = e.baseUrl),
                  (this._serverPublicKey = e.cstg.serverPublicKey),
                  (this._subscriptionId = e.cstg.subscriptionId),
                  (this._logInfo = function () {
                    for (var e = arguments.length, s = new Array(e), r = 0; r < e; r++) s[r] = arguments[r];
                    return l(t, ...s);
                  }),
                  (this._logWarn = s));
              }
              hasStatusResponse(e) {
                return 'object' == typeof e && e && e.status;
              }
              isCstgApiSuccessResponse(e) {
                return this.hasStatusResponse(e) && 'success' === e.status && o(e.body);
              }
              isCstgApiOptoutResponse(e) {
                return this.hasStatusResponse(e) && 'optout' === e.status;
              }
              isCstgApiClientErrorResponse(e) {
                return this.hasStatusResponse(e) && 'client_error' === e.status && 'string' == typeof e.message;
              }
              isCstgApiForbiddenResponse(e) {
                return this.hasStatusResponse(e) && 'invalid_http_origin' === e.status && 'string' == typeof e.message;
              }
              stripPublicKeyPrefix(t) {
                return t.substring(e);
              }
              async generateCstgRequest(e) {
                if ('email_hash' in e || 'phone_hash' in e) return e;
                if ('email' in e) {
                  return { email_hash: await c.hash(e.email) };
                }
                if ('phone' in e) {
                  return { phone_hash: await c.hash(e.phone) };
                }
              }
              async generateToken(e) {
                const t = await this.generateCstgRequest(e);
                this._logInfo('Building CSTG request for', t);
                const s = await n.build(this.stripPublicKeyPrefix(this._serverPublicKey)),
                  r = new TextEncoder(),
                  i = Date.now(),
                  { iv: o, ciphertext: a } = await s.encrypt(r.encode(JSON.stringify(t)), r.encode(JSON.stringify([i]))),
                  l = await c.exportPublicKey(s.clientPublicKey),
                  u = {
                    payload: c.bytesToBase64(new Uint8Array(a)),
                    iv: c.bytesToBase64(new Uint8Array(o)),
                    public_key: c.bytesToBase64(new Uint8Array(l)),
                    timestamp: i,
                    subscription_id: this._subscriptionId,
                  };
                return this.callCstgApi(u, s);
              }
              async callCstgApi(e, t) {
                const s = this._baseUrl + '/v2/token/client-generate';
                let i, n;
                const o = new Promise((e, t) => {
                  ((i = e), (n = t));
                });
                return (
                  this._logInfo('Sending CSTG request', e),
                  (0, r.RD)(
                    s,
                    {
                      success: async (e, s) => {
                        try {
                          const s = c.base64ToBytes(e),
                            r = await t.decrypt(s.slice(0, 12), s.slice(12)),
                            o = new TextDecoder().decode(r),
                            l = JSON.parse(o);
                          this.isCstgApiSuccessResponse(l)
                            ? i({ status: 'success', identity: l.body })
                            : this.isCstgApiOptoutResponse(l)
                              ? i({ status: 'optout', identity: 'optout' })
                              : n(a(`API error: Response body was invalid for HTTP status 200: ${o}`));
                        } catch (e) {
                          n(a(e));
                        }
                      },
                      error: (e, t) => {
                        try {
                          if (400 === t.status) {
                            const e = JSON.parse(t.responseText);
                            this.isCstgApiClientErrorResponse(e)
                              ? n(a(`Client error: ${e.message}`))
                              : n(a(`UID2 API error: Response body was invalid for HTTP status 400: ${t.responseText}`));
                          } else if (403 === t.status) {
                            const e = JSON.parse(t.responseText);
                            this.isCstgApiForbiddenResponse(t)
                              ? n(a(`Forbidden: ${e.message}`))
                              : n(a(`UID2 API error: Response body was invalid for HTTP status 403: ${t.responseText}`));
                          } else n(a(`UID2 API error: Unexpected HTTP status ${t.status}: ${e}`));
                        } catch (t) {
                          n(a(e));
                        }
                      },
                    },
                    JSON.stringify(e),
                    { method: 'POST' },
                  ),
                  o
                );
              }
            }
            class n {
              static _namedCurve = 'P-256';
              constructor(e, t) {
                ((this._clientPublicKey = e), (this._sharedKey = t));
              }
              static async build(e) {
                const t = await c.generateKeyPair(n._namedCurve),
                  s = await c.importPublicKey(e, this._namedCurve),
                  r = await c.deriveKey(s, t.privateKey);
                return new n(t.publicKey, r);
              }
              async encrypt(e, t) {
                const s = window.crypto.getRandomValues(new Uint8Array(12));
                return {
                  iv: s,
                  ciphertext: await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: s, additionalData: t }, this._sharedKey, e),
                };
              }
              async decrypt(e, t) {
                return window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: e }, this._sharedKey, t);
              }
              get clientPublicKey() {
                return this._clientPublicKey;
              }
            }
            class c {
              static base64ToBytes(e) {
                const t = atob(e);
                return Uint8Array.from(t, (e) => e.codePointAt(0));
              }
              static bytesToBase64(e) {
                const t = Array.from(e, (e) => String.fromCodePoint(e)).join('');
                return btoa(t);
              }
              static async generateKeyPair(e) {
                const t = { name: 'ECDH', namedCurve: e };
                return window.crypto.subtle.generateKey(t, !1, ['deriveKey']);
              }
              static async importPublicKey(e, t) {
                const s = { name: 'ECDH', namedCurve: t };
                return window.crypto.subtle.importKey('spki', this.base64ToBytes(e), s, !1, []);
              }
              static exportPublicKey(e) {
                return window.crypto.subtle.exportKey('spki', e);
              }
              static async deriveKey(e, t) {
                return window.crypto.subtle.deriveKey({ name: 'ECDH', public: e }, t, { name: 'AES-GCM', length: 256 }, !1, [
                  'encrypt',
                  'decrypt',
                ]);
              }
              static async hash(e) {
                const t = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(e));
                return this.bytesToBase64(new Uint8Array(t));
              }
            }
          }
          function p(e, t, s, r) {
            const n = function () {
              for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
              return l(s, ...t);
            };
            let o = null;
            const a = 'cookie' !== e.storage,
              c = new u(t, a, e.internalStorage, n);
            n(`Module is using ${a ? 'local storage' : 'cookies'} for internal storage.`);
            const p = h && h.isCSTGOptionsValid(e.cstg, r);
            p
              ? (n('Module is using client-side token generation.'), (o = null))
              : e.paramToken
                ? ((o = e.paramToken), n('Read token from params', o))
                : e.serverCookieName && ((o = c.readProvidedCookie(e.serverCookieName)), n('Read token from server-supplied cookie', o));
            let g = c.getStoredValueWithFallback();
            if ((n('Loaded module-stored tokens:', g), g && 'string' == typeof g)) {
              if (!o && !p) return (n('Returning legacy cookie value.'), { id: g });
              (n('Discarding superseded legacy cookie.'), (g = null));
            }
            if (
              (o &&
                g &&
                g.originalToken?.advertising_token !== o.advertising_token &&
                (n('Server supplied new token - ignoring stored value.', g.originalToken?.advertising_token, o.advertising_token),
                (g = null)),
              p)
            ) {
              const t = h.getValidIdentity(e.cstg, r);
              if (t && (g && h.isStoredTokenInvalid(t, g, n, r) && (g = null), !g || Date.now() > g.latestToken.refresh_expires)) {
                const s = h.generateTokenAndStore(e.apiBaseUrl, e.cstg, t, c, n, r);
                return (
                  n('Generate token using CSTG'),
                  {
                    callback: (e) => {
                      s.then((t) => {
                        (n('Token generation responded, passing the new token on.', t), e(t));
                      }).catch((e) => {
                        (0, i.logError)('error generating token: ', e);
                      });
                    },
                  }
                );
              }
            }
            const y = !g?.latestToken || (o && o.identity_expires > g.latestToken.identity_expires),
              f = y ? o : g.latestToken;
            if ((n('UID2 module selected latest token', y, f), !f || Date.now() > f.refresh_expires))
              return (n('Newest available token is expired and not refreshable.'), { id: null });
            if (Date.now() > f.identity_expires) {
              const t = d(e.apiBaseUrl, f, e.clientId, c, n, r);
              return (
                n('Token is expired but can be refreshed, attempting refresh.'),
                {
                  callback: (e) => {
                    t.then((t) => {
                      (n('Refresh reponded, passing the updated token on.', t), e(t));
                    }).catch((e) => {
                      (0, i.logError)('error refreshing token: ', e);
                    });
                  },
                }
              );
            }
            const b = { originalToken: o ?? g?.originalToken, latestToken: f };
            if ((p && (b.originalIdentity = g?.originalIdentity), c.storeValue(b), Date.now() > f.refresh_from)) {
              n('Refreshing token in background with low priority.');
              const t = d(e.apiBaseUrl, f, e.clientId, c, n, r);
              return {
                id: b,
                callback: (e) => {
                  t.then((t) => {
                    (n('Background token refresh completed, updating ID.', t), e(t));
                  }).catch((e) => {
                    (0, i.logError)('error refreshing token in background: ', e);
                  });
                },
              };
            }
            return { id: b };
          }
          function g(e) {
            const t = ['emailHash', 'phoneHash', 'email', 'phone'];
            for (const s of t) if (e.hasOwnProperty(s)) return { [s]: e[s] };
            return {};
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3005],
      {
        2819(t, e, n) {
          n.d(e, { eu: () => f, p: () => i });
          var u = n(1833),
            a = n(466),
            r = n(8928);
          const l = new Map();
          function s(t) {
            let e;
            return (
              (0, a.isGptPubadsDefined)() &&
                (e = window.googletag
                  .pubads()
                  .getSlots()
                  .find(
                    (function (t) {
                      return (e) => (0, a.compareCodeAndSlot)(e, t);
                    })(t),
                  )),
              e
            );
          }
          function i(t) {
            if (l.has(t)) return l.get(t);
            const e = s(t);
            let n = {};
            return (e && (n = { gptSlot: e.getAdUnitPath(), divId: e.getSlotElementId() }), !(0, a.isEmpty)(n) && l.set(t, n), n);
          }
          const o = ['IAB_AUDIENCE_1_1', 'IAB_CONTENT_2_2'];
          function f(t) {
            return Object.entries({
              [o[0]]: d(t, ['user.data'], 4),
              [o[1]]: d(
                t,
                u.Dy.map((t) => `${t}.content.data`),
                6,
              ),
            })
              .map((t) => {
                let [e, n] = t;
                return n.length ? { taxonomy: e, values: n } : null;
              })
              .filter((t) => t);
          }
          function d(t, e, n) {
            return e
              .flatMap((e) => (0, r.A)(t, e) || [])
              .filter((t) => t.ext?.segtax === n)
              .flatMap((t) => t.segment?.map((t) => t.id))
              .filter((t) => t)
              .filter(a.uniques);
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [41],
      {
        3223(e, r, n) {
          n.d(r, { A: () => i });
          function i() {
            let e, r;
            return {
              parse: function (r) {
                return (e || (e = new DOMParser()), e).parseFromString(r, 'application/xml');
              },
              serialize: function (e) {
                return (r || (r = new XMLSerializer()), r).serializeToString(e);
              },
            };
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7650],
      {
        2145(t, n, e) {
          e.d(n, { Mu: () => o, P8: () => p, QS: () => d });
          var s = e(1385);
          const o = { env: 'vp', gdfp_req: 1, output: 'vast', unviewed_position_start: 1 },
            p = { protocol: 'https', host: 'securepubads.g.doubleclick.net', pathname: '/gampad/ads' };
          function d() {
            const t = s.mW.getConsentData(),
              n = {};
            return (
              t &&
                ('boolean' == typeof t.gdprApplies && (n.gdpr = Number(t.gdprApplies)),
                t.consentString && (n.gdpr_consent = t.consentString),
                t.addtlConsent && (n.addtl_consent = t.addtlConsent)),
              n
            );
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7045],
      {
        4967(e, t, r) {
          r.d(t, { M: () => n });
          const n = {
            tdid: {
              source: 'adserver.org',
              atype: 1,
              getValue: function (e) {
                return e.id ? e.id : e;
              },
              getUidExt: function (e) {
                return { rtiPartner: 'TDID', ...e.ext };
              },
            },
          };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4950],
      {
        5273(e, t, u) {
          u.d(t, { x: () => n });
          const n = {
            uid2: {
              source: 'uidapi.com',
              atype: 3,
              getValue: function (e) {
                return e.id;
              },
              getUidExt: function (e) {
                if (e.ext) return e.ext;
              },
            },
          };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5024],
      {
        2026(e, t, i) {
          (i.r(t), i.d(t, { liveIntentIdSubmodule: () => S, reset: () => M, setEventFiredFlag: () => T, storage: () => w }));
          var n = i(466),
            r = i(2201),
            o = i(1385),
            d = i(2592),
            u = i(4228),
            a = i(1443),
            s = i(736),
            c = i(4967),
            l = i(5273),
            p = i(867),
            f = i(6665);
          const x = 'liveIntentId',
            g = 'liveintent.com',
            v = { nonId: !0 };
          function m(e) {
            function t(e) {
              return Object.entries(e).flatMap((e) => {
                let [t, i] = e;
                return 'boolean' == typeof i && i ? [t] : [];
              });
            }
            return t('object' == typeof e ? { ...v, ...e } : v);
          }
          function b(e) {
            const t = {},
              i = e.nonId || e.unifiedId;
            return (
              (t.lipb = i ? { ...e, lipbid: i } : e),
              delete t.lipb?.unifiedId,
              e.uid2 && (t.uid2 = { id: e.uid2, ext: { provider: g } }),
              e.bidswitch && (t.bidswitch = { id: e.bidswitch, ext: { provider: g } }),
              e.triplelift && (t.triplelift = { id: e.triplelift, ext: { provider: g } }),
              e.zetassp && (t.zetassp = { id: e.zetassp, ext: { provider: g } }),
              e.medianet && (t.medianet = { id: e.medianet, ext: { provider: g } }),
              e.magnite && (t.magnite = { id: e.magnite, ext: { provider: g } }),
              e.index && (t.index = { id: e.index, ext: { provider: g } }),
              e.openx && (t.openx = { id: e.openx, ext: { provider: g } }),
              e.pubmatic && (t.pubmatic = { id: e.pubmatic, ext: { provider: g } }),
              e.sovrn && (t.sovrn = { id: e.sovrn, ext: { provider: g } }),
              e.thetradedesk &&
                ((t.lipb = { ...t.lipb, tdid: e.thetradedesk }),
                (t.tdid = { id: e.thetradedesk, ext: { rtiPartner: 'TDID', provider: (0, p.EN)().domain || g } }),
                delete t.lipb.thetradedesk),
              e.sharethrough && (t.sharethrough = { id: e.sharethrough, ext: { provider: g } }),
              e.sonobi && (t.sonobi = { id: e.sonobi, ext: { provider: g } }),
              e.vidazoo && (t.vidazoo = { id: e.vidazoo, ext: { provider: g } }),
              e.nexxen && (t.nexxen = { id: e.nexxen, ext: { provider: g } }),
              t
            );
          }
          function h(e) {
            if (void 0 === window.liModuleEnabled && e.activatePartialTreatment) {
              const e = (0, f.Et)(window.liTreatmentRate) ? window.liTreatmentRate : 0.95;
              ((window.liModuleEnabled = Math.random() < e), (window.liTreatmentRate = e));
            }
          }
          const y = {
              ...c.M,
              tdid: { ...c.M.tdid, matcher: g },
              ...l.x,
              lipb: {
                getValue: function (e) {
                  return e.lipbid;
                },
                source: 'liveintent.com',
                atype: 3,
                getEidExt: function (e) {
                  if (Array.isArray(e.segments) && e.segments.length) return { segments: e.segments };
                },
              },
              bidswitch: {
                source: 'bidswitch.net',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              medianet: {
                source: 'media.net',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              magnite: {
                source: 'rubiconproject.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              index: {
                source: 'liveintent.indexexchange.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              openx: {
                source: 'openx.net',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              pubmatic: {
                source: 'pubmatic.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              sovrn: {
                source: 'liveintent.sovrn.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              fpid: {
                source: 'fpid.liveintent.com',
                atype: 1,
                getValue: function (e) {
                  return e.id;
                },
              },
              sharethrough: {
                source: 'sharethrough.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              sonobi: {
                source: 'liveintent.sonobi.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              triplelift: {
                source: 'liveintent.triplelift.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              zetassp: {
                source: 'zeta-ssp.liveintent.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              vidazoo: {
                source: 'liveintent.vidazoo.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              nexxen: {
                source: 'liveintent.unrulymedia.com',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
            },
            E = 'pre_lips',
            w = (0, a.vM)({ moduleType: s.fW, moduleName: x }),
            I = {
              ajaxGet: (e, t, i, n, o) => {
                (0, r.g4)(n)(e, { success: t, error: i }, void 0, { method: 'GET', withCredentials: !0, customHeaders: o });
              },
              pixelGet: (e, t) => (0, n.triggerPixel)(e, t),
            };
          let U = !1,
            V = null;
          function M() {
            (window && window.liQ_instances && (window.liQ_instances.forEach((e) => e.eventBus.off(E, T)), (window.liQ_instances = [])),
              S.setModuleMode(null),
              (U = !1),
              (V = null));
          }
          function T() {
            U = !0;
          }
          function z(e) {
            if (V) return V;
            const t = {
              publisherId: (e = e || {}).publisherId || 'any',
              requestedAttributes: m(e.requestedAttributesOverrides),
              extraAttributes: { ipv4: e.ipv4, ipv6: e.ipv6 },
            };
            (e.url && (t.url = e.url), (t.ajaxTimeout = e.ajaxTimeout || 5e3));
            const i = (function (e) {
              const t = {};
              return (
                (e = e || {}).appId && (t.appId = e.appId),
                e.fpiStorageStrategy && (t.storageStrategy = e.fpiStorageStrategy),
                e.fpiExpirationDays && (t.expirationDays = e.fpiExpirationDays),
                e.collectorUrl && (t.collectorUrl = e.collectorUrl),
                (t.ajaxTimeout = e.ajaxTimeout || 5e3),
                t
              );
            })(e.liCollectConfig);
            (!i.appId && e.distributorId
              ? ((i.distributorId = e.distributorId), (t.source = e.distributorId))
              : (t.source = e.partner || 'prebid'),
              (i.wrapperName = 'prebid'),
              (i.trackerVersion = '10.29.0'),
              (i.identityResolutionConfig = t),
              (i.identifiersToResolve = e.identifiersToResolve || []),
              (i.fireEventDelay = e.fireEventDelay));
            const n = o.t6.getConsentData();
            n && (i.usPrivacyString = n);
            const r = o.mW.getConsentData();
            r && ((i.gdprApplies = r.gdprApplies), (i.gdprConsent = r.consentString));
            const d = o.ad.getConsentData();
            (d && ((i.gppString = d.gppString), (i.gppApplicableSections = d.applicableSections)), (V = S.getInitializer()(i, w, I)));
            const u = (function (e) {
              const t = {};
              let i = !1;
              if (
                ('string' == typeof e.emailHash && ((i = !0), (t.emailHash = e.emailHash)),
                'string' == typeof e.ipv4 && ((i = !0), (t.ipv4 = e.ipv4)),
                'string' == typeof e.ipv6 && ((i = !0), (t.ipv6 = e.ipv6)),
                'string' == typeof e.userAgent && ((i = !0), (t.userAgent = e.userAgent)),
                i)
              )
                return t;
            })(e);
            return (null != u && V.push(u), V);
          }
          function D() {
            if (!U && V) {
              const e = V.config.fireEventDelay || 500;
              setTimeout(() => {
                (window.liQ_instances.forEach((e) => e.eventBus.once(E, T)), !U && V && V.fire());
              }, e);
            }
          }
          const S = {
            moduleMode: 'standard',
            name: x,
            gvlid: 148,
            setModuleMode(e) {
              this.moduleMode = e;
            },
            getInitializer() {
              return (e, t, i) => (0, u.DQ)(e, t, i, this.moduleMode);
            },
            decode(e, t) {
              const i = (t && t.params) || {};
              return (
                h(i),
                V || z(i),
                D(),
                (function (e, t) {
                  return t.activatePartialTreatment ? (window.liModuleEnabled ? b(e) : {}) : b(e);
                })(e, i)
              );
            },
            getId(e) {
              const t = (e && e.params) || {};
              h(t);
              const i = z(t);
              if (!i) return;
              D();
              return {
                callback: function (e) {
                  i.resolve(
                    (t) => {
                      e(t);
                    },
                    (t) => {
                      ((0, n.logError)(`${x}: ID fetch encountered an error: `, t), e());
                    },
                  );
                },
              };
            },
            primaryIds: ['libp'],
            eids: y,
          };
          (0, d.bz)('userId', S);
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2316],
      {
        8317(e, n, t) {
          t.d(n, { G: () => l });
          var s = t(4367);
          const u = new Map();
          function l(e) {
            let n;
            return (u.has(e) ? (n = u.get(e)) : ((n = e.getBoundingClientRect()), u.set(e, n)), n);
          }
          s.gH.before((e, n) => {
            (u.clear(), e(n));
          });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1961],
      {
        4969(e, t, n) {
          n.d(t, { Fk: () => c });
          var r = n(9012),
            o = n(466),
            i = n(6665),
            a = n(5568),
            d = n(2201),
            l = n(867),
            u = n(1748);
          function c(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
              n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            const {
                name: d,
                cid: c,
                value: p,
                relatedData: f,
                logData: v,
                project: g,
              } = (0, i.Qd)(e) ? { ...e, logData: t } : { name: e, relatedData: t },
              m = a.dO.refererInfo || (0, l.EN)(),
              h = Object.assign(
                {},
                {
                  logid: 'kfk',
                  evtid: a.lp.PROJECT_EVENTS,
                  project: g || (n ? 'prebidanalytics' : 'prebid'),
                  dn: m.domain || '',
                  requrl: m.topmostLocation || '',
                  pbav: (0, u.m)().medianetGlobals.analyticsEnabled ? a.uI : '',
                  pbver: a.MQ,
                  cid: c || a.dO.configuration.cid || '',
                  event: d || '',
                  value: p || '',
                  rd: f || '',
                },
                v,
              ),
              b = n ? a.ki : a.nn,
              j = n ? (0, r.eP)(h) : (0, o.formatQS)(h);
            function y() {
              return b + '?' + j;
            }
            return {
              send: function () {
                if (!n) return void s(b, j, (0, r.Up)(h, ['cid', 'project', 'name as value']));
                const e = y();
                (a.dO.errorQueue.push(e), (0, o.triggerPixel)(e));
              },
              getUrl: y,
            };
          }
          function s(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            (0, d.RD)(
              e,
              {
                success: () => {},
                error: (e, t) => {
                  let { reason: r } = t;
                  return c(Object.assign(n, { name: 'ajax_log_failed', relatedData: r })).send();
                },
              },
              t,
              { method: 'POST' },
            );
          }
        },
        5568(e, t, n) {
          n.d(t, { AS: () => l, MQ: () => d, P6: () => u, dO: () => r, ki: () => o, lp: () => p, nn: () => i, uI: () => a });
          const r = {
              auctions: {},
              infoByAdIdMap: {},
              bdpMap: {},
              configuration: {},
              logsQueue: [],
              errorQueue: [],
              eventQueue: null,
              refererInfo: null,
            },
            o = 'https://qsearch-a.akamaihd.net/log',
            i = 'https://navvy.media.net/log',
            a = '2.0.0',
            d = '10.29.0',
            l = 'medianet',
            u = 142,
            c = 'APPR',
            s = 'RA',
            p = { [s]: 'pba_aw', [c]: 'prebid_analytics_events_client', PROJECT_EVENTS: 'projectevents' };
        },
        9012(e, t, n) {
          n.d(t, { B8: () => u, RW: () => a, Up: () => l, eP: () => d });
          var r = n(466),
            o = n(8928),
            i = n(6665);
          function a() {
            let e = arguments.length > 1 ? arguments[1] : void 0;
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).filter((t) =>
              Object.entries(e).every((e) => {
                let [n, r] = e;
                return t[n] === r;
              }),
            );
          }
          function d(e) {
            return (0, r._map)(e, (e, t) =>
              void 0 === e ? t + '=' : ((0, i.Qd)(e) && (e = JSON.stringify(e)), t + '=' + encodeURIComponent(e)),
            ).join('&');
          }
          function l(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if ('object' != typeof e || null === e) return {};
            const r = {};
            return (
              t.forEach((i, a) => {
                if ('function' == typeof i) return;
                let d,
                  l,
                  [u, c] = i.split(/\sas\s/i);
                ((u = u.trim()),
                  (l = c?.trim() || u.split('.').pop()),
                  (d = (0, o.A)(e, u)),
                  'function' == typeof t[a + 1] && (d = t[a + 1](d, r, e)),
                  (void 0 === d && n) || (r[l] = d));
              }),
              r
            );
          }
          function u(e) {
            try {
              return e || window.top.document.referrer;
            } catch (e) {
              return document.referrer;
            }
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8139],
      {
        3457(u, e, h) {
          function n(u) {
            return u.reduce((u, e) => (e.h * e.w < u.h * u.w ? e : u));
          }
          h.d(e, { M$: () => n });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8498],
      {
        877(e, t, r) {
          r.d(t, { U: () => i });
          var n = r(2517);
          function i() {
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
            const o = t.shift(),
              s = t.length > 1 ? i(...t) : t[0];
            return Object.fromEntries(n.zt.map((e) => [e, Object.assign({}, o[e], s[e])]));
          }
        },
        7500(e, t, r) {
          r.d(t, { K: () => o, X: () => i });
          var n = r(9794);
          const i = { 1: n.D4, 2: n.G_, 4: n.s6 };
          function o(e, t, r) {
            if (e.mediaType) return;
            const n = r.mediaType;
            if (!n && !i.hasOwnProperty(t.mtype)) throw new Error('Cannot determine mediaType for response');
            e.mediaType = n || i[t.mtype];
          }
        },
        9201(e, t, r) {
          r.d(t, { T: () => b, A: () => f });
          const n = new WeakMap();
          var i = r(466),
            o = r(9794);
          var s = r(6220);
          var a = r(7500),
            d = r(6665);
          var p = r(2517),
            c = r(1833),
            u = r(8417);
          const m = {
            [p.S3]: {
              fpd: {
                priority: 99,
                fn(e, t) {
                  (0, i.mergeDeep)(e, t.ortb2);
                },
              },
              onlyOneClient: { priority: -99, fn: (0, c.i8)('ORTB request') },
              props: {
                fn(e, t) {
                  Object.assign(e, { id: e.id || (0, i.generateUUID)(), test: e.test || 0 });
                  const r = parseInt(t.timeout, 10);
                  isNaN(r) || (e.tmax = r);
                },
              },
            },
            [p.Tb]: {
              fpd: {
                priority: 99,
                fn(e, t) {
                  (0, i.mergeDeep)(e, t.ortb2Imp);
                },
              },
              id: {
                fn(e, t) {
                  e.id = t.bidId;
                },
              },
              banner: {
                fn: function (e, t, r) {
                  if (r.mediaType && r.mediaType !== o.D4) return;
                  const n = t?.mediaTypes?.banner;
                  if (n) {
                    const r = { topframe: !0 === (0, i.inIframe)() ? 0 : 1 };
                    (n.sizes &&
                      null == t.ortb2Imp?.banner?.format &&
                      (r.format = (0, i.sizesToSizeTuples)(n.sizes).map(i.sizeTupleToRtbSize)),
                      n.hasOwnProperty('pos') && (r.pos = n.pos),
                      (e.banner = (0, i.mergeDeep)(r, e.banner)));
                  }
                },
              },
              secure: {
                fn(e, t) {
                  e.secure = e.secure ?? 1;
                },
              },
            },
            [p.WR]: {
              mediaType: { priority: 99, fn: a.K },
              banner: {
                fn: (function () {
                  let { createPixel: e = (e) => (0, i.createTrackPixelHtml)(decodeURIComponent(e), i.encodeMacroURI) } =
                    arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                  return function (t, r) {
                    t.mediaType === o.D4 &&
                      (r.adm && r.nurl ? (t.ad = e(r.nurl) + r.adm) : r.adm ? (t.ad = r.adm) : r.nurl && (t.adUrl = r.nurl));
                  };
                })(),
              },
              props: {
                fn(e, t, r) {
                  (Object.entries({
                    requestId: r.bidRequest?.bidId,
                    seatBidId: t.id,
                    cpm: t.price,
                    currency: r.ortbResponse.cur || r.currency,
                    width: t.w,
                    height: t.h,
                    wratio: t.wratio,
                    hratio: t.hratio,
                    dealId: t.dealid,
                    creative_id: t.crid,
                    creativeId: t.crid,
                    burl: t.burl,
                    ttl: t.exp || r.ttl,
                    netRevenue: r.netRevenue,
                  })
                    .filter((e) => {
                      let [t, r] = e;
                      return void 0 !== r;
                    })
                    .forEach((t) => {
                      let [r, n] = t;
                      e[r] = n;
                    }),
                    e.meta || (e.meta = {}),
                    t.adomain && (e.meta.advertiserDomains = t.adomain),
                    t.ext?.dsa && (e.meta.dsa = t.ext.dsa),
                    t.cat && ((e.meta.primaryCatId = t.cat[0]), (e.meta.secondaryCatIds = t.cat.slice(1))),
                    t.attr && (e.meta.attr = t.attr),
                    t.ext?.eventtrackers && (e.eventtrackers = (e.eventtrackers ?? []).concat(t.ext.eventtrackers)),
                    t.cattax && (e.meta.cattax = t.cattax));
                },
              },
            },
          };
          ((m[p.Tb].native = {
            fn: function (e, t, r) {
              if (r.mediaType && r.mediaType !== o.s6) return;
              let n = t.nativeOrtbRequest;
              n &&
                ((n = Object.assign({}, r.nativeRequest, n)),
                n.assets?.length
                  ? (e.native = (0, i.mergeDeep)({}, { request: JSON.stringify(n), ver: n.ver }, e.native))
                  : (0, i.logWarn)('mediaTypes.native is set, but no assets were specified. Native request skipped.', t));
            },
          }),
            (m[p.WR].native = {
              fn: function (e, t) {
                if (e.mediaType === o.s6) {
                  let r;
                  if (((r = 'string' == typeof t.adm ? JSON.parse(t.adm) : t.adm), !(0, d.Qd)(r) || !Array.isArray(r.assets)))
                    throw new Error('ORTB native response contained no assets');
                  e.native = { ortb: r };
                }
              },
            }),
            (m[p.Tb].video = {
              fn: function (e, t, r) {
                if (r.mediaType && r.mediaType !== o.G_) return;
                const n = t?.mediaTypes?.video;
                if (!(0, i.isEmpty)(n)) {
                  const t = Object.fromEntries(
                    Object.entries(n).filter((e) => {
                      let [t] = e;
                      return s.Zy.has(t);
                    }),
                  );
                  if (n.playerSize) {
                    const e = (0, i.sizesToSizeTuples)(n.playerSize).map(i.sizeTupleToRtbSize);
                    (e.length > 1 && (0, i.logWarn)('video request specifies more than one playerSize; all but the first will be ignored'),
                      Object.assign(t, e[0]));
                  }
                  e.video = (0, i.mergeDeep)(t, e.video);
                }
              },
            }),
            (m[p.WR].video = {
              fn: function (e, t, r) {
                e.mediaType === o.G_ &&
                  (r?.imp?.video?.w && r?.imp?.video?.h && ([e.playerWidth, e.playerHeight] = [r.imp.video.w, r.imp.video.h]),
                  t.adm && (e.vastXml = t.adm),
                  t.nurl && (e.vastUrl = t.nurl));
              },
            }),
            (m[p.Tb].audio = {
              fn: function (e, t, r) {
                if (r.mediaType && r.mediaType !== o.FY) return;
                const n = t?.mediaTypes?.audio;
                if (!(0, i.isEmpty)(n)) {
                  const t = Object.fromEntries(
                    Object.entries(n).filter((e) => {
                      let [t] = e;
                      return u.Ai.has(t);
                    }),
                  );
                  e.audio = (0, i.mergeDeep)(t, e.audio);
                }
              },
            }),
            (m[p.WR].audio = {
              fn: function (e, t) {
                e.mediaType === o.FY && (t.adm && (e.vastXml = t.adm), t.nurl && (e.vastUrl = t.nurl));
              },
            }));
          var l = r(877);
          function f() {
            let {
              context: e = {},
              processors: t = b,
              overrides: r = {},
              imp: o,
              request: s,
              bidResponse: a,
              response: d,
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const c = new WeakMap();
            function u(e, i, o, s) {
              let a;
              return function () {
                null == a &&
                  (a = (function () {
                    let a = o.bind(
                      this,
                      (function (e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        if (!n.has(e)) {
                          const t = Object.entries(e);
                          (t.sort((e, t) => ((e = e[1].priority || 0) === (t = t[1].priority || 0) ? 0 : e > t ? -1 : 1)),
                            n.set(
                              e,
                              t.map((e) => {
                                let [t, r] = e;
                                return [t, r.fn];
                              }),
                            ));
                        }
                        const r = n
                          .get(e)
                          .filter((e) => {
                            let [r] = e;
                            return !t.hasOwnProperty(r) || t[r];
                          })
                          .map(function (e) {
                            let [r, n] = e;
                            return t.hasOwnProperty(r) ? t[r].bind(this, n) : n;
                          });
                        return function () {
                          const e = Array.from(arguments);
                          r.forEach((t) => {
                            t.apply(this, e);
                          });
                        };
                      })(t()[e] || {}, r[e] || {}),
                    );
                    return (
                      i && (a = i.bind(this, a)),
                      function () {
                        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                        try {
                          return a.apply(this, t);
                        } catch (e) {
                          s.call(this, e, ...t);
                        }
                      }
                    );
                  })());
                for (var d = arguments.length, p = new Array(d), c = 0; c < d; c++) p[c] = arguments[c];
                return a.apply(this, p);
              };
            }
            const m = u(
                p.Tb,
                o,
                function (e, t, r) {
                  const n = {};
                  return (e(n, t, r), n);
                },
                function (e, t, r) {
                  (0, i.logError)('Error while converting bidRequest to ORTB imp; request skipped.', {
                    error: e,
                    bidRequest: t,
                    context: r,
                  });
                },
              ),
              l = u(
                p.S3,
                s,
                function (e, t, r, n) {
                  const i = { imp: t };
                  return (e(i, r, n), i);
                },
                function (e, t, r, n) {
                  throw ((0, i.logError)('Error while converting to ORTB request', { error: e, imps: t, bidderRequest: r, context: n }), e);
                },
              ),
              f = u(
                p.WR,
                a,
                function (e, t, r) {
                  const n = {};
                  return (e(n, t, r), n);
                },
                function (e, t, r) {
                  (0, i.logError)('Error while converting ORTB seatbid.bid to bidResponse; bid skipped.', { error: e, bid: t, context: r });
                },
              ),
              y = u(
                p.Cf,
                d,
                function (e, t, r, n) {
                  const i = { bids: t };
                  return (e(i, r, n), i);
                },
                function (e, t, r, n) {
                  throw (
                    (0, i.logError)('Error while converting from ORTB response', {
                      error: e,
                      bidResponses: t,
                      ortbResponse: r,
                      context: n,
                    }),
                    e
                  );
                },
              );
            return {
              toORTB(t) {
                let { bidderRequest: r, bidRequests: n, context: o = {} } = t;
                n = n || r.bids;
                const s = { req: Object.assign({ bidRequests: n }, e, o), imp: {} };
                s.req.impContext = s.imp;
                const a = n
                    .map((t) => {
                      const n = Object.assign({ bidderRequest: r, reqContext: s.req }, e, o),
                        a = m(t, n);
                      if (null != a) {
                        if (a.hasOwnProperty('id')) return (Object.assign(n, { bidRequest: t, imp: a }), (s.imp[a.id] = n), a);
                        (0, i.logError)('Converted ORTB imp does not specify an id, ignoring bid request', t, a);
                      }
                    })
                    .filter(Boolean),
                  d = l(a, r, s.req);
                return ((s.req.bidderRequest = r), null != d && c.set(d, s), d);
              },
              fromORTB(e) {
                let { request: t, response: r } = e;
                const n = c.get(t);
                if (null == n) throw new Error('ortbRequest passed to `fromORTB` must be the same object returned by `toORTB`');
                function o(e) {
                  let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                  return Object.assign(e, { ortbRequest: t }, r);
                }
                const s = Object.fromEntries((t.imp || []).map((e) => [e.id, e])),
                  a = (r?.seatbid || [])
                    .flatMap((e) =>
                      (e.bid || []).map((t) => {
                        if (s.hasOwnProperty(t.impid) && n.imp.hasOwnProperty(t.impid))
                          return f(t, o(n.imp[t.impid], { imp: s[t.impid], seatbid: e, ortbResponse: r }));
                        (0, i.logError)('ORTB response seatbid[].bid[].impid does not match any imp in request; ignoring bid', t);
                      }),
                    )
                    .filter(Boolean);
                return y(a, r, o(n.req));
              },
            };
          }
          const b = (0, i.memoize)(() => (0, l.U)(m, (0, p.yB)(p.qN)));
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9147],
      {
        2808(e, r, n) {
          function u(e) {
            return e?.ortb2?.ext?.prebid?.adServerCurrency;
          }
          n.d(r, { b: () => u });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2068],
      {
        6634(e, t, d) {
          d.d(t, { FY: () => b, M2: () => g, k6: () => I, kD: () => m, xO: () => f, yY: () => x });
          var o = d(466),
            r = d(8928),
            a = d(3435),
            n = d(7464),
            s = d(2808),
            i = d(6220),
            l = d(9794);
          let u = null;
          let c = '',
            p = 0;
          const m = (e, t, d, r) => () => {
            if (!e.localStorageIsEnabled()) return ((0, o.logInfo)(`localstorage not enabled for ${t}`), null);
            const a = e.getDataFromLocalStorage(d);
            if (null === a) {
              const t = { [r]: (0, o.generateUUID)() };
              return (e.setDataInLocalStorage(d, JSON.stringify(t)), t);
            }
            try {
              return JSON.parse(a);
            } catch (e) {
              return ((0, o.logInfo)(`failed to parse localstorage for ${t}:`, e), null);
            }
          };
          function x(e, t, d, o) {
            return 'object' == typeof t &&
              null != t &&
              t.length > 0 &&
              t[0].hasOwnProperty('body') &&
              t[0].body.hasOwnProperty('ext') &&
              t[0].body.ext.hasOwnProperty('cookies') &&
              'object' == typeof t[0].body.ext.cookies
              ? t[0].body.ext.cookies.slice(0, 5)
              : [];
          }
          const h = (e) => {
              let { requestId: t, vastXml: d, divId: r, width: a, height: s } = e;
              if (!d) return void (0, o.logInfo)('No VAST in bidResponse');
              const i = {
                  id: t,
                  url: 'https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js',
                  loaded: !1,
                  adUnitCode: r,
                  targetId: r,
                },
                l = n.A4.install(i);
              return (
                l.setRender(
                  ((e, t, d) => (o) => {
                    o.renderer.push(() => {
                      window.ANOutstreamVideo.renderAd({
                        sizes: [t, d],
                        targetId: e,
                        adResponse: o.vastXml,
                        rendererOptions: {
                          showBigPlayButton: !1,
                          showProgressBar: 'bar',
                          showVolume: !1,
                          allowFullscreen: !0,
                          skippable: !1,
                          content: o.vastXml,
                        },
                      });
                    });
                  })(r, a, s),
                ),
                l
              );
            },
            g = (e, t) => {
              ((0, a.J)(e, 'tagid', t.adUnitCode), (0, a.J)(e, 'ext.adUnitCode', t.adUnitCode));
              const d = t.params.divId || t.adUnitCode;
              if (((0, a.J)(e, 'ext.divId', d), e.video)) {
                const d = (0, r.A)(t, 'mediaTypes.video.playerSize'),
                  o = (0, r.A)(t, 'mediaTypes.video.context');
                ((0, a.J)(e, 'video.ext.playerSize', d), (0, a.J)(e, 'video.ext.context', o));
              }
              return e;
            },
            b = (e, t, d, r) => (
              t &&
                ((0, a.J)(e, 'ext.localStorage.amxId', t),
                e.user || (e.user = {}),
                e.user.ext || (e.user.ext = {}),
                e.user.ext.eids || (e.user.ext.eids = []),
                e.user.ext.eids.push({ source: 'amxdt.net', uids: [{ id: `${t}`, atype: 1 }] })),
              (0, a.J)(e, 'ext.version', '10.29.0'),
              (0, a.J)(e, 'ext.source', 'prebid.js'),
              (0, a.J)(e, 'ext.pageViewId', d),
              (0, a.J)(e, 'ext.bidderVersion', r),
              (0, a.J)(e, 'ext.sessionId', (u || (u = (0, o.generateUUID)()), u)),
              (0, a.J)(e, 'ext.requestCounter', c === window.location.pathname ? ++p : ((c = window.location.pathname), 0)),
              (0, a.J)(e, 'cur', [(0, s.b)(e) || 'USD']),
              e.user || (e.user = {}),
              e
            );
          function y(e, t) {
            let d = l.D4;
            ([i.mn, i.H6].includes(e.ext.mediaType) && (d = l.G_), e.ext.mediaType === l.s6 && (d = l.s6));
            const r = {
              requestId: e.impid,
              cpm: e.price,
              width: e.w,
              height: e.h,
              creativeId: e.crid,
              currency: t.cur,
              netRevenue: !0,
              ttl: 120,
              mediaType: d,
              meta: { advertiserDomains: e.adomain, demandSource: e.ext.ssp },
            };
            if (
              (e.dealid && (r.dealid = e.dealid),
              e.ext.mediaType === l.D4 && (r.ad = e.adm),
              [i.mn, i.H6].includes(e.ext.mediaType) && (r.vastXml = e.adm),
              e.ext.mediaType === i.H6 && (e.ext.divId || e.ext.adUnitCode))
            ) {
              const t = h({
                requestId: r.requestId,
                vastXml: r.vastXml,
                divId: e.ext.divId || e.ext.adUnitCode,
                width: r.width,
                height: r.height,
              });
              t ? ((r.renderer = t), (r.divId = e.ext.divId)) : (0, o.logInfo)('Could not create renderer for outstream bid');
            }
            if (e.ext.mediaType === l.s6)
              try {
                r.native = { ortb: JSON.parse(e.adm) };
              } catch (e) {}
            return r;
          }
          const f = (e) => {
              if (!e.body) return [];
              const t = e.body;
              if (!t.seatbid || 0 === t.seatbid.length) return [];
              const d = [];
              for (let e = 0; e < t.seatbid.length; e++) {
                const o = t.seatbid[e];
                for (let e = 0; e < o.bid.length; e++) {
                  const r = y(o.bid[e], t);
                  d.push(r);
                }
              }
              return d;
            },
            I = (e, t) => {
              if (!e.localStorageIsEnabled()) return ((0, o.logInfo)(`localstorage not enabled for ${t}`), null);
              return e.getDataFromLocalStorage('__amuidpb') || null;
            };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5889],
      {
        9547(r, n, e) {
          e.d(n, { GR: () => g });
          var t = e(466),
            s = e(8928),
            o = e(3435);
          const u = [
            'device.sua',
            'source.schain',
            'regs.gdpr',
            'regs.us_privacy',
            'regs.gpp',
            'regs.gpp_sid',
            'user.consent',
            'user.eids',
          ];
          function c(r) {
            const n = r.split('.'),
              e = n.pop();
            return [n.join('.'), e];
          }
          function i(r, n) {
            return `${r}.ext.${n}`;
          }
          function a(r, n) {
            const [e, t] = c(r);
            if ('ext' !== t) throw new Error('invalid argument');
            return `${e}.${n}`;
          }
          function p(r, n) {
            const [e, t] = c(r);
            return (
              (n = n(e, t)),
              (r) => {
                const u = (0, s.A)(r, e);
                if (null != u?.[t]) return ((0, o.J)(r, n, u[t]), () => delete u[t]);
              }
            );
          }
          const f = Object.freeze([
              ...u.map((r) => p(r, i)),
              ...['app', 'content', 'site', 'user'].map(function (r) {
                return (n) => {
                  const e = n[r]?.kwarray;
                  if (null != e) {
                    const t = (n[r].keywords || '').split(',');
                    return (Array.isArray(e) && t.push(...e), (n[r].keywords = t.join(',')), () => delete n[r].kwarray);
                  }
                };
              }),
            ]),
            l = Object.freeze([...u.map((r) => p(i(...c(r)), a))]);
          function d() {
            let r = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
              n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : f;
            return function (e) {
              return (
                n.forEach((n) => {
                  try {
                    const t = n(e);
                    'function' == typeof t && r && t();
                  } catch (r) {
                    (0, t.logError)('Error translating request to ORTB 2.5', r);
                  }
                }),
                e
              );
            };
          }
          const g = d();
          d(!0, l);
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1225],
      {
        786(r, t, e) {
          e.d(t, { hZ: () => h });
          var n = e(1748);
          function h(r, t, e) {
            let h = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            if (t === e) return r;
            let u = r;
            try {
              u = (0, n.m)().convertCurrency(r, t, e);
            } catch (r) {
              if (!h) throw r;
            }
            return u;
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [259],
      {
        8258(n, e, t) {
          function a() {
            const n =
              'undefined' != typeof window && window.navigator ? window.navigator : 'undefined' != typeof navigator ? navigator : null;
            return (n && (n.connection || n.mozConnection || n.webkitConnection)) || null;
          }
          function o() {
            const n = (function () {
              const n = a();
              return n
                ? {
                    type: n.type ?? null,
                    effectiveType: n.effectiveType ?? null,
                    downlink: 'number' == typeof n.downlink ? n.downlink : null,
                    downlinkMax: 'number' == typeof n.downlinkMax ? n.downlinkMax : null,
                    rtt: 'number' == typeof n.rtt ? n.rtt : null,
                    saveData: 'boolean' == typeof n.saveData ? n.saveData : null,
                    bandwidth: 'number' == typeof n.bandwidth ? n.bandwidth : null,
                  }
                : null;
            })();
            if (!n) return 0;
            switch (n.type) {
              case 'ethernet':
                return 1;
              case 'wifi':
                return 2;
              case 'wimax':
                return 6;
              default:
                switch (n.effectiveType) {
                  case 'slow-2g':
                  case '2g':
                    return 4;
                  case '3g':
                    return 5;
                  case '4g':
                    return 6;
                  case '5g':
                    return 7;
                  default:
                    return 'cellular' === n.type ? 3 : 0;
                }
            }
          }
          t.d(e, { Z: () => o });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4472],
      {
        4621(t, e, o) {
          o.d(e, { gl: () => u, tF: () => r });
          var n = o(466),
            i = o(3958),
            h = o(8317);
          const l = function (t) {
            let { w: e, h: o } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n = (function (t) {
                let { w: e, h: o } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  { width: n, height: i, left: l, top: r, right: u, bottom: f, x: m, y: g } = (0, h.G)(t);
                return (
                  (0 === n || 0 === i) && e && o && ((n = e), (i = o), (u = l + e), (f = r + o)),
                  { width: n, height: i, left: l, top: r, right: u, bottom: f, x: m, y: g }
                );
              })(t, { w: e, h: o }),
              l = (function () {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window,
                  e = 0,
                  o = 0;
                try {
                  for (; null != t?.frameElement; ) {
                    const n = (0, h.G)(t.frameElement);
                    ((e += n.left), (o += n.top), (t = t.parent));
                  }
                } catch (t) {
                  ((e = 0), (o = 0));
                }
                return { x: e, y: o };
              })(t?.ownerDocument?.defaultView);
            ((n.left += l.x), (n.right += l.x), (n.top += l.y), (n.bottom += l.y));
            const r = (0, i.Ot)(),
              u = (function (t) {
                const e = { left: t[0].left, right: t[0].right, top: t[0].top, bottom: t[0].bottom };
                for (let o = 1; o < t.length; ++o) {
                  if (((e.left = Math.max(e.left, t[o].left)), (e.right = Math.min(e.right, t[o].right)), e.left >= e.right)) return null;
                  if (((e.top = Math.max(e.top, t[o].top)), (e.bottom = Math.min(e.bottom, t[o].bottom)), e.top >= e.bottom)) return null;
                }
                return ((e.width = e.right - e.left), (e.height = e.bottom - e.top), e);
              })([{ left: 0, top: 0, right: r.document.documentElement.clientWidth, bottom: r.document.documentElement.clientHeight }, n]);
            let f, m;
            return null !== u ? ((f = u.width * u.height), (m = n.width * n.height), (f / m) * 100) : 0;
          };
          function r(t) {
            return !(0, n.inIframe)() && null !== t;
          }
          function u(t, e, o) {
            return 'visible' === e.document.visibilityState ? l(t, o) : 0;
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7464],
      {
        6685(e, r, n) {
          n.d(r, { k: () => i, z: () => l });
          var a = n(466),
            t = n(6665);
          const l = function (e, r) {
              let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
              if ((0, t.O8)(r) && r.length > 0) {
                const n = r.split('|').filter((e) => e.trim().length > 0);
                ((r = n.map((e) => e.trim()).join('|')), (e.ext.key_val = r));
              } else
                (0, a.logWarn)(n + 'Ignoring param : dctr with value : ' + r + ', expects string-value, found empty or non-string value');
            },
            i = function (e, r) {
              let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
              (0, t.cy)(r)
                ? r.forEach((r) => {
                    'string' == typeof r && r.length > 3
                      ? (e.pmp || (e.pmp = { private_auction: 0, deals: [] }), e.pmp.deals.push({ id: r }))
                      : (0, a.logWarn)(
                          `${n}Error: deal-id present in array bid.params.deals should be a string with more than 3 characters length, deal-id ignored: ${r}`,
                        );
                  })
                : (0, a.logWarn)(`${n}Error: bid.params.deals should be an array of strings.`);
            };
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [7618],
      {
        2599(e, t, i) {
          i.d(t, { m: () => m });
          var d = i(877),
            r = i(2517),
            n = i(6665),
            s = i(466),
            a = i(9794),
            b = i(7500);
          const o = { [a.D4]: 'banner', [a.s6]: 'native', [a.G_]: 'video' };
          var p = i(8668),
            c = i(1933),
            f = i(3435);
          var u = i(1748);
          var l = i(2122);
          const g = {
            [r.S3]: {
              extPrebid: {
                fn: function (e, t) {
                  ((0, f.J)(
                    e,
                    'ext.prebid',
                    (0, s.mergeDeep)(
                      { auctiontimestamp: t.auctionStart, targeting: { includewinners: !0, includebidderkeys: !1 } },
                      e.ext?.prebid,
                    ),
                  ),
                    c.$W.getConfig('debug') && (e.ext.prebid.debug = !0));
                },
              },
              extPrebidChannel: {
                fn: function (e) {
                  (0, f.J)(e, 'ext.prebid.channel', Object.assign({ name: 'pbjs', version: (0, u.m)().version }, e.ext?.prebid?.channel));
                },
              },
              extPrebidAliases: {
                fn: function (e, t, i) {
                  let { am: d = p.Ay } = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                  if (d.aliasRegistry[t.bidderCode]) {
                    const i = d.bidderRegistry[t.bidderCode];
                    if (!i || !i.getSpec().skipPbsAliasing) {
                      (0, f.J)(e, `ext.prebid.aliases.${t.bidderCode}`, d.aliasRegistry[t.bidderCode]);
                      const r = c.$W.getConfig(`gvlMapping.${t.bidderCode}`) || i?.getSpec?.().gvlid;
                      r && (0, f.J)(e, `ext.prebid.aliasgvlids.${t.bidderCode}`, r);
                    }
                  }
                },
              },
              extPrebidPageViewIds: {
                fn: function (e, t) {
                  (0, f.J)(e, `ext.prebid.page_view_ids.${t.bidderCode}`, t.pageViewId);
                },
              },
            },
            [r.Tb]: {
              params: {
                fn: function (e, t) {
                  const i = t.params;
                  i && (0, f.J)(e, `ext.prebid.bidder.${t.bidder}`, i);
                },
              },
              adUnitCode: {
                fn: function (e, t) {
                  const i = t.adUnitCode;
                  i && (0, f.J)(e, 'ext.prebid.adunitcode', i);
                },
              },
            },
            [r.WR]: {
              mediaType: {
                fn: function (e, t, i) {
                  let d = i.mediaType;
                  (d || ((d = b.X.hasOwnProperty(t.mtype) ? b.X[t.mtype] : t.ext?.prebid?.type), o.hasOwnProperty(d) || (d = a.D4)),
                    (e.mediaType = d));
                },
                priority: 99,
              },
              videoCache: {
                fn: function (e, t) {
                  if (e.mediaType === a.G_) {
                    let { cacheId: i, url: d } = t?.ext?.prebid?.cache?.vastXml ?? {};
                    if (!i || !d) {
                      const { hb_uuid: e, hb_cache_host: r, hb_cache_path: n } = t?.ext?.prebid?.targeting ?? {};
                      e && r && n && ((i = e), (d = `https://${r}${n}?uuid=${e}`));
                    }
                    i && d && Object.assign(e, { videoCacheKey: i, vastUrl: d });
                  }
                },
                priority: -10,
              },
              bidderCode: {
                fn(e, t, i) {
                  ((e.bidderCode = i.seatbid.seat),
                    (e.adapterCode = t?.ext?.prebid?.meta?.adaptercode || i.bidRequest?.bidder || e.bidderCode));
                },
              },
              pbsBidId: {
                fn(e, t) {
                  const i = t?.ext?.prebid?.bidid;
                  (0, n.O8)(i) && (e.pbsBidId = i);
                },
              },
              adserverTargeting: {
                fn(e, t) {
                  const i = t?.ext?.prebid?.targeting;
                  (0, n.Qd)(i) && (e.adserverTargeting = i);
                },
              },
              extPrebidMeta: {
                fn(e, t) {
                  e.meta = (0, s.mergeDeep)({}, t?.ext?.prebid?.meta, e.meta);
                },
              },
              pbsWinTrackers: {
                fn: function (e, t) {
                  ((e.eventtrackers = e.eventtrackers || []),
                    [
                      [t.burl, l.OA],
                      [t?.ext?.prebid?.events?.win, l.RO],
                    ]
                      .filter((t) => {
                        let [i, d] = t;
                        return (
                          i &&
                          null ==
                            e.eventtrackers.find((e) => {
                              let { method: t, event: r, url: n } = e;
                              return r === d && t === l.Ni && n === i;
                            })
                        );
                      })
                      .forEach((t) => {
                        let [i, d] = t;
                        e.eventtrackers.push({ method: l.Ni, event: d, url: i });
                      }));
                },
              },
            },
            [r.Cf]: {
              serverSideStats: {
                fn(e, t, i) {
                  const d = i.bidderRequest?.bidderCode,
                    r = t?.ext;
                  if (!r) return;
                  const n = { errors: 'serverErrors', responsetimemillis: 'serverResponseTimeMs' };
                  Object.entries(r).forEach((e) => {
                    let [t, r] = e;
                    if (n[t]) {
                      if (!d) return;
                      const e = r?.[d];
                      if (void 0 !== e) {
                        const d = n[t];
                        ((i.bidderRequest[d] = e),
                          i.bidRequests?.forEach((t) => {
                            t[d] = e;
                          }));
                      }
                    } else void 0 !== r && ((i.bidderRequest.pbsExt = i.bidderRequest.pbsExt || {}), (i.bidderRequest.pbsExt[t] = r));
                  });
                },
              },
            },
          };
          var v = i(9201);
          const m = (0, s.memoize)(() => (0, d.U)((0, v.T)(), g, (0, r.yB)(r.e4)));
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6550],
      {
        9077(p, n, e) {
          function t(p, n, e) {
            const t = {};
            return (
              p &&
                ('boolean' == typeof p.gdprApplies && (t.gdpr = Number(p.gdprApplies)),
                'string' == typeof p.consentString && (t.gdpr_consent = p.consentString)),
              n && (t.us_privacy = encodeURIComponent(n)),
              e?.gppString && ((t.gpp = e.gppString), (t.gpp_sid = e.applicableSections?.toString())),
              t
            );
          }
          e.d(n, { d: () => t });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9965],
      {
        9357(e, t, n) {
          n.d(t, { S_: () => l });
          var r = n(7464),
            i = n(466);
          function o(e) {
            let t = document.getElementById(e.adUnitCode);
            if (!t) return void (0, i.logWarn)(`Magnite: unable to find ad unit element with id "${e.adUnitCode}" for rendering.`);
            const n = t.firstElementChild;
            ('DIV' === n?.tagName && (t = n),
              (function (e) {
                const t = e.querySelector("div[id^='google_ads']");
                t && t.style.setProperty('display', 'none');
              })(t),
              (function (e) {
                const t = e.querySelector("script[id^='sas_script']"),
                  n = t && t.nextSibling;
                n && 'iframe' === n.localName && n.style.setProperty('display', 'none');
              })(t));
            const r = e.renderer.getConfig();
            e.renderer.push(() => {
              globalThis.MagniteApex.renderAd({
                width: e.width,
                height: e.height,
                vastUrl: e.vastUrl,
                placement: { attachTo: t, align: r.align || 'center', position: r.position || 'prepend' },
                closeButton: r.closeButton || !1,
                label: r.label,
                replay: r.replay ?? !0,
              });
            });
          }
          function l(e, t, n) {
            const l = r.A4.install({
              id: e.adId,
              url: t || 'https://video-outstream.rubiconproject.com/apex-2.3.7.js',
              config: n || {},
              loaded: !1,
              adUnitCode: e.adUnitCode,
            });
            try {
              l.setRender(o);
            } catch (e) {
              (0, i.logWarn)('Prebid Error calling setRender on renderer', e);
            }
            return l;
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4577],
      {
        5767(n, e, s) {
          function u(n, e, s) {
            return s ? `${n}${e}=${encodeURIComponent(s)}&` : n;
          }
          s.d(e, { v: () => u });
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [467],
      {
        4603(e, n, t) {
          t.d(n, { Fd: () => r, Wz: () => d, mN: () => i });
          var o = t(5767);
          function r(e, n, t, o, r) {
            const a = [];
            return (
              e.forEach((e) => {
                const s = {},
                  i = function (o, r) {
                    let a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                      i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    const d = (function (e, n, t, o, r) {
                      return e.getFloor?.({ currency: r, mediaType: n, size: [t, o] }).floor || e.params.bidfloor || -1;
                    })(n, o, a, i, t);
                    (s[d] || (s[d] = { ...e, bidfloor: d }),
                      s[d][r] || (s[d][r] = 'banner' === o ? { format: [] } : e[o]),
                      'banner' === o && s[d][r].format.push({ w: a, h: i }));
                  };
                (e.banner?.format?.length && e.banner.format.forEach((e) => i('banner', 'bannerTemp', e?.w, e?.h)),
                  i('native', 'nativeTemp'),
                  i('video', 'videoTemp', e.video?.w, e.video?.h),
                  Object.values(s).forEach((n) => {
                    if (
                      ([
                        ['banner', 'bannerTemp'],
                        ['native', 'nativeTemp'],
                        ['video', 'videoTemp'],
                      ].forEach((e) => {
                        let [t, o] = e;
                        n = (function (e, n, t) {
                          const o = {};
                          for (const r in e)
                            r === n ? Object.prototype.hasOwnProperty.call(e, t) && (o[n] = e[t]) : r !== t && (o[r] = e[r]);
                          return (-1 === o.bidfloor && delete o.bidfloor, o);
                        })(n, t, o);
                      }),
                      n.banner || n.video || n.native)
                    ) {
                      const t = (function () {
                        const e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        let n = 0,
                          t = '';
                        for (; n++ < 14; ) t += e.charAt(Math.floor(62 * Math.random()));
                        return t;
                      })();
                      ((o[t] = n.id),
                        (n.id = t),
                        n.banner && 'stx' === r && ((n.banner.pos = e.banner.pos), (n.banner.topframe = e.banner.topframe)),
                        a.push(n));
                    }
                  }));
              }),
              a
            );
          }
          const a = 'https://apps.smartadserver.com',
            s = `${a}/diff/templates/asset/csync.html`,
            i = 'eqt_pid';
          function d(e, n, t, r, d) {
            if (e.iframeEnabled) {
              window.addEventListener('message', function e(n) {
                n.origin === a &&
                  'getConsent' === n.data.action &&
                  (n.source &&
                    n.source.postMessage &&
                    n.source.postMessage({ action: 'consentResponse', id: n.data.id, consents: t.vendorData.vendor.consents }, n.origin),
                  n.data.pid && d.setDataInLocalStorage(i, n.data.pid),
                  this.removeEventListener('message', e));
              });
              let e = (0, o.v)(s + '?', 'nwid', r);
              return ((e = (0, o.v)(e, 'gdpr', t?.gdprApplies ? '1' : '0')), [{ type: 'iframe', url: e }]);
            }
            return [];
          }
        },
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4262],
      {
        5749(e, o, r) {
          var t = r(1748),
            n = r(466),
            s = r(2201),
            a = r(2592),
            p = r(1385),
            i = r(1443),
            d = r(736),
            c = r(8074);
          const l = '33acrossId',
            u = 'https://lexicon.33across.com/v1/envelope',
            g = '33acrossIdFp',
            v = '33acrossIdTp',
            f = '33acrossIdHm',
            m = !0,
            b = !0,
            h = (0, i.vM)({ moduleType: d.fW, moduleName: l }),
            S = { domainOverride: (0, c.w)(h, l) };
          function C(e) {
            if (h.cookiesAreEnabled()) {
              const o = new Date(0).toUTCString();
              h.setCookie(e, '', o, 'Lax', S.domainOverride());
            }
            h.removeDataFromLocalStorage(e);
          }
          function I(e, o) {
            let r;
            return (o.find((o) => (o === i.X0 ? (r = h.getCookie(e)) : o === i.qk && (r = h.getDataFromLocalStorage(e)), !!r)), r);
          }
          function T(e, o) {
            const [r, t, n] = e;
            n
              ? C(r)
              : t &&
                (function (e, o, r) {
                  let { enabledStorageTypes: t, expires: n } = r;
                  t.forEach((r) => {
                    if (r === i.X0) {
                      const r = 864e5 * n,
                        t = new Date(Date.now() + r);
                      h.setCookie(e, o, t.toUTCString(), 'Lax', S.domainOverride());
                    } else r === i.qk && h.setDataInLocalStorage(e, o);
                  });
                })(r, t, o);
          }
          function D(e, o) {
            let { enabledStorageTypes: r, expires: t, ...n } = o;
            (function (e, o) {
              let { tp: r, fp: t, hem: n } = e,
                { storeFpid: s, storeTpid: a, envelopeAvailable: p } = o;
              const i = [];
              return (s && i.push([g, t, !t], [f, n, !p]), a && i.push([v, r, !r]), i);
            })(e, n).forEach((e) => {
              T(e, { enabledStorageTypes: r, expires: t });
            });
          }
          const y = {
            name: l,
            gvlid: 58,
            decode: (e) => ({ [l]: { envelope: e } }),
            getId(e) {
              let { params: o = {}, enabledStorageTypes: r = [], storage: t = {} } = e,
                { gdpr: a } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if ('string' != typeof o.pid) return void (0, n.logError)(`${l}: Submodule requires a partner ID to be defined`);
              if (!0 === a?.gdprApplies) return void (0, n.logWarn)(`${l}: Submodule cannot be used where GDPR applies`);
              const { storeFpid: i = m, storeTpid: d = b, apiUrl: c = u, pid: h, hem: S } = o,
                T = S || window._33across?.hem?.sha256;
              return {
                callback(e) {
                  (0, s.g4)(1e4)(
                    c,
                    {
                      success(o) {
                        let s = {};
                        try {
                          s = (function (e) {
                            return e.succeeded
                              ? e.data.envelope
                                ? { envelope: e.data.envelope, fp: e.data.fp, tp: e.data.tp }
                                : ((0, n.logMessage)(`${l}: No envelope was received`), {})
                              : ('Cookied User' === e.error
                                  ? (0, n.logMessage)(`${l}: Unsuccessful response`.concat(' ', e.error))
                                  : (0, n.logError)(`${l}: Unsuccessful response`.concat(' ', e.error)),
                                {});
                          })(JSON.parse(o));
                        } catch (e) {
                          (0, n.logError)(`${l}: ID reading error:`, e);
                        }
                        (s.envelope ||
                          ['', '_last', '_exp', '_cst'].forEach((e) => {
                            C(`${l}${e}`);
                          }),
                          D(
                            { fp: s.fp, tp: s.tp, hem: T },
                            { storeFpid: i, storeTpid: d, envelopeAvailable: !!s.envelope, enabledStorageTypes: r, expires: t.expires },
                          ),
                          e(s.envelope));
                      },
                      error(o) {
                        ((0, n.logError)(`${l}: ID error response`, o), e());
                      },
                    },
                    (function (e, o, r) {
                      let { pid: t, pubProvidedHem: n } = e;
                      const s = p.t6.getConsentData(),
                        a = p.et.getCoppa(),
                        i = p.ad.getConsentData(),
                        d = { pid: t, gdpr: 0, src: 'pbjs', ver: '10.29.0', coppa: Number(a) };
                      if ((s && (d.us_privacy = s), i)) {
                        const { gppString: e = '', applicableSections: o = [] } = i;
                        ((d.gpp = e), (d.gpp_sid = encodeURIComponent(o.join(','))));
                      }
                      o?.consentString && (d.gdpr_consent = o.consentString);
                      const c = I(g, r);
                      c && (d.fp = encodeURIComponent(c));
                      const l = I(v, r);
                      l && (d.tp = encodeURIComponent(l));
                      const u = n || I(f, r);
                      return (u && (d.sha256 = encodeURIComponent(u)), d);
                    })({ pid: h, pubProvidedHem: T }, a, r),
                    { method: 'GET', withCredentials: !0 },
                  );
                },
              };
            },
            domainOverride: S.domainOverride,
            eids: {
              '33acrossId': {
                source: '33across.com',
                atype: 1,
                getValue: function (e) {
                  return e.envelope;
                },
              },
            },
          };
          ((0, a.bz)('userId', y), (0, t.E)('33acrossIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 2764], () => {
          return ((o = 5749), e((e.s = o)));
          var o;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4599],
      {
        158(e, t, r) {
          var i = r(1748),
            a = r(466),
            s = r(8928),
            o = r(6665),
            n = r(7464),
            d = r(1933),
            c = r(3556),
            p = r(9794),
            l = r(6220),
            u = r(1443),
            m = r(7156),
            g = r(3448),
            h = r(356),
            _ = r(3468),
            f = r(8695),
            b = r(6614),
            y = r(3610),
            v = r(8657);
          const k = 'appnexus',
            w = 'https://ib.adnxs.com/ut/v3/prebid',
            x = 'https://ib.adnxs-simple.com/ut/v3/prebid',
            I = ['id', 'minduration', 'maxduration', 'skippable', 'playback_method', 'frameworks', 'context', 'skipoffset'],
            C = ['minduration', 'maxduration', 'skip', 'skipafter', 'playbackmethod', 'api', 'startdelay', 'placement', 'plcmt'],
            E = ['age', 'externalUid', 'external_uid', 'segments', 'gender', 'dnt', 'language'],
            T = ['geo', 'device_id'],
            U = ['enabled', 'dongle', 'member_id', 'debug_timeout'],
            O = { apn_debug_dongle: 'dongle', apn_debug_member_id: 'member_id', apn_debug_timeout: 'debug_timeout' },
            S = {
              playback_method: {
                unknown: 0,
                auto_play_sound_on: 1,
                auto_play_sound_off: 2,
                click_to_play: 3,
                mouse_over: 4,
                auto_play_sound_unknown: 5,
              },
              context: {
                unknown: 0,
                pre_roll: 1,
                mid_roll: 2,
                post_roll: 3,
                outstream: 4,
                'in-banner': 5,
                'in-feed': 6,
                interstitial: 7,
                accompanying_content_pre_roll: 8,
                accompanying_content_mid_roll: 9,
                accompanying_content_post_roll: 10,
              },
            },
            A = {
              body: 'description',
              body2: 'desc2',
              cta: 'ctatext',
              image: { serverName: 'main_image', requiredParams: { required: !0 } },
              icon: { serverName: 'icon', requiredParams: { required: !0 } },
              sponsoredBy: 'sponsored_by',
              privacyLink: 'privacy_link',
              salePrice: 'saleprice',
              displayUrl: 'displayurl',
            },
            j = (0, u.vM)({ bidderCode: k }),
            D = new Map([
              [1, 'Mobile/Tablet - General'],
              [2, 'Personal Computer'],
              [3, 'Connected TV'],
              [4, 'Phone'],
              [5, 'Tablet'],
              [6, 'Connected Device'],
              [7, 'Set Top Box'],
              [8, 'OOH Device'],
            ]),
            R = {
              code: k,
              gvlid: 32,
              aliases: b.DX,
              supportedMediaTypes: [p.D4, p.G_, p.s6],
              isBidRequestValid: function (e) {
                return !!(e.params.placementId || e.params.placement_id || (e.params.member && (e.params.invCode || e.params.inv_code)));
              },
              buildRequests: function (e, t) {
                const r = (e = (0, h.Xj)(e)).map(N),
                  i = (e || []).find(P);
                let s = {};
                (!0 === d.$W.getConfig('coppa') && (s = { coppa: !0 }),
                  i &&
                    Object.keys(i.params.user)
                      .filter((e) => E.includes(e))
                      .forEach((e) => {
                        const t = (0, b.vk)(e);
                        if ('segments' === e && (0, o.cy)(i.params.user[e])) {
                          const r = [];
                          (i.params.user[e].forEach((e) => {
                            (0, o.Et)(e) ? r.push({ id: e }) : (0, o.Qd)(e) && r.push(e);
                          }),
                            (s[t] = r));
                        } else 'segments' !== e && (s[t] = i.params.user[e]);
                      }));
                const n = (e || []).find(z);
                let c;
                n &&
                  n.params &&
                  n.params.app &&
                  ((c = {}),
                  Object.keys(n.params.app)
                    .filter((e) => T.includes(e))
                    .forEach((e) => {
                      c[e] = n.params.app[e];
                    }));
                const p = (e || []).find(B);
                let l;
                p && p.params && n.params.app && n.params.app.id && (l = { appid: p.params.app.id });
                let u = {};
                const m = {},
                  _ = j.getCookie('apn_prebid_debug') || null;
                if (_)
                  try {
                    u = JSON.parse(_);
                  } catch (e) {
                    (0, a.logError)('AppNexus Debug Auction Cookie Error:\n\n' + e);
                  }
                else {
                  (Object.keys(O).forEach((e) => {
                    const t = (0, a.getParameterByName)(e);
                    (0, o.O8)(t) && '' !== t && ((u[O[e]] = t), (u.enabled = !0));
                  }),
                    (u = (0, y.$)({ member_id: 'number', debug_timeout: 'number' }, u)));
                  const t = (e || []).find($);
                  t && t.debug && (u = t.debug);
                }
                u &&
                  u.enabled &&
                  Object.keys(u)
                    .filter((e) => U.includes(e))
                    .forEach((e) => {
                      m[e] = u[e];
                    });
                const k = (e || []).find(M),
                  I = k ? parseInt(k.params.member, 10) : 0,
                  C = e[0]?.ortb2?.source?.ext?.schain,
                  S = (e || []).find(L),
                  A = { tags: [...r], user: s, sdk: { source: 'pbjs', version: '10.29.0' }, schain: C };
                (S && (A.iab_support = { omidpn: 'Appnexus', omidpv: '10.29.0' }),
                  I > 0 && (A.member_id = I),
                  n && (A.device = c),
                  p && (A.app = l),
                  t?.ortb2?.device &&
                    ((A.device = A.device || {}),
                    (0, a.mergeDeep)(
                      A.device,
                      (function (e) {
                        const t = {
                          useragent: e.ua,
                          devicetype: D.get(e.devicetype),
                          make: e.make,
                          model: e.model,
                          os: e.os,
                          os_version: e.osv,
                          w: e.w,
                          h: e.h,
                          ppi: e.ppi,
                          pxratio: e.pxratio,
                        };
                        return Object.keys(t).reduce((e, r) => (t[r] && (e[r] = t[r]), e), {});
                      })(t.ortb2.device),
                    )));
                const R = (0, o.Go)(t && t.ortb2),
                  q = (0, o.Go)(d.$W.getConfig('appnexusAuctionKeywords')) || {},
                  H = (0, f.QF)(R, q);
                if (
                  (H.length > 0 && (A.keywords = H),
                  R?.source?.tid && (A.source ? Object.assign({}, A.source, { tid: R.source.tid }) : (A.source = { tid: R.source.tid })),
                  d.$W.getConfig('adpod.brandCategoryExclusion') && (A.brand_category_uniqueness = !0),
                  m.enabled && ((A.debug = m), (0, a.logInfo)('AppNexus Debug Auction Settings:\n\n' + JSON.stringify(m, null, 4))),
                  t &&
                    t.gdprConsent &&
                    ((A.gdpr_consent = { consent_string: t.gdprConsent.consentString, consent_required: t.gdprConsent.gdprApplies }),
                    t.gdprConsent.addtlConsent && -1 !== t.gdprConsent.addtlConsent.indexOf('~')))
                ) {
                  const e = t.gdprConsent.addtlConsent,
                    r = e.substring(e.indexOf('~') + 1);
                  A.gdpr_consent.addtl_consent = r.split('.').map((e) => parseInt(e, 10));
                }
                if (
                  (t && t.uspConsent && (A.us_privacy = t.uspConsent),
                  t?.gppConsent
                    ? (A.privacy = { gpp: t.gppConsent.gppString, gpp_sid: t.gppConsent.applicableSections })
                    : t?.ortb2?.regs?.gpp && (A.privacy = { gpp: t.ortb2.regs.gpp, gpp_sid: t.ortb2.regs.gpp_sid }),
                  t && t.refererInfo)
                ) {
                  const e = {
                      rd_ref: encodeURIComponent(t.refererInfo.topmostLocation),
                      rd_top: t.refererInfo.reachedTop,
                      rd_ifs: t.refererInfo.numIframes,
                      rd_stk: t.refererInfo.stack.map((e) => encodeURIComponent(e)).join(','),
                    },
                    r = t.refererInfo.canonicalUrl;
                  ((0, o.O8)(r) && '' !== r && (e.rd_can = r), (A.referrer_detection = e));
                }
                (e || []).find(G) &&
                  e.filter(G).forEach((e) => {
                    const t = (function (e, t) {
                        const { durationRangeSec: r, requireExactDuration: i } = t.mediaTypes.video,
                          a = (function (e) {
                            const { adPodDurationSec: t, durationRangeSec: r, requireExactDuration: i } = e,
                              a = Math.min(...r),
                              s = Math.floor(t / a);
                            return i ? Math.max(s, r.length) : s;
                          })(t.mediaTypes.video),
                          s = Math.max(...r),
                          o = e.filter((e) => e.uuid === t.bidId),
                          n = (0, b.GS)(...o, a);
                        if (i) {
                          const e = Math.ceil(a / r.length),
                            t = (0, v.i)(n, e);
                          r.forEach((e, r) => {
                            t[r].forEach((t) => {
                              (W(t, 'minduration', e), W(t, 'maxduration', e));
                            });
                          });
                        } else n.forEach((e) => W(e, 'maxduration', s));
                        return n;
                      })(r, e),
                      i = A.tags.filter((t) => t.uuid !== e.bidId);
                    A.tags = [...i, ...t];
                  });
                if (e[0].userIdAsEids?.length > 0) {
                  const t = [];
                  (e[0].userIdAsEids.forEach((e) => {
                    !e ||
                      !e.uids ||
                      e.uids.length < 1 ||
                      e.uids.forEach((r) => {
                        const i = { source: e.source, id: r.id };
                        ('adserver.org' === e.source ? (i.rti_partner = 'TDID') : 'uidapi.com' === e.source && (i.rti_partner = 'UID2'),
                          t.push(i));
                      });
                  }),
                    t.length && (A.eids = t));
                }
                if (t?.ortb2?.regs?.ext?.dsa) {
                  const e = t.ortb2.regs.ext.dsa,
                    r = {};
                  if (
                    (['dsarequired', 'pubrender', 'datatopub'].forEach((t) => {
                      (0, o.Et)(e[t]) && (r[t] = e[t]);
                    }),
                    (0, o.cy)(e.transparency) && e.transparency.every((e) => (0, o.Qd)(e)))
                  ) {
                    const t = [];
                    (e.transparency.forEach((e) => {
                      (0, o.O8)(e.domain) &&
                        '' !== e.domain &&
                        (0, o.cy)(e.dsaparams) &&
                        e.dsaparams.every((e) => (0, o.Et)(e)) &&
                        t.push(e);
                    }),
                      t.length > 0 && (r.transparency = t));
                  }
                  (0, a.isEmpty)(r) || (A.dsa = r);
                }
                r[0].publisher_id && (A.publisher_id = r[0].publisher_id);
                const V = (function (e, t) {
                  let r = [];
                  const i = { withCredentials: !0 };
                  let s = w;
                  (0, g.C)(t?.gdprConsent) || (s = x);
                  ('TRUE' !== (0, a.getParameterByName)('apn_test').toUpperCase() && !0 !== d.$W.getConfig('apn_test')) ||
                    (i.customHeaders = { 'X-Is-Test': 1 });
                  if (e.tags.length > 15) {
                    const a = (0, o.Go)(e);
                    (0, v.i)(e.tags, 15).forEach((e) => {
                      a.tags = e;
                      const o = JSON.stringify(a);
                      r.push({ method: 'POST', url: s, data: o, bidderRequest: t, options: i });
                    });
                  } else {
                    const a = JSON.stringify(e);
                    r = { method: 'POST', url: s, data: a, bidderRequest: t, options: i };
                  }
                  return r;
                })(A, t);
                return V;
              },
              interpretResponse: function (e, t) {
                let { bidderRequest: r } = t;
                e = e.body;
                const i = [];
                if (!e || e.error) {
                  let t = `in response for ${r.bidderCode} adapter`;
                  return (e && e.error && (t += `: ${e.error}`), (0, a.logError)(t), i);
                }
                if (
                  (e.tags &&
                    e.tags.forEach((e) => {
                      const t = (d = e) && d.ads && d.ads.length && (d.ads || []).find((e) => e.rtb);
                      var d;
                      if (t) {
                        if (
                          (!0 === m.u.get(r.bidderCode, 'allowZeroCpmBids') ? t.cpm >= 0 : t.cpm > 0) &&
                          this.supportedMediaTypes.includes(t.ad_type)
                        ) {
                          const d = (function (e, t, r) {
                            const i = (0, a.getBidRequest)(e.uuid, [r]),
                              d = (0, a.getUniqueIdentifierStr)(),
                              c = {
                                adId: d,
                                requestId: e.uuid,
                                cpm: t.cpm,
                                creativeId: t.creative_id,
                                dealId: t.deal_id,
                                currency: 'USD',
                                netRevenue: !0,
                                ttl: 300,
                                adUnitCode: i.adUnitCode,
                                appnexus: { buyerMemberId: t.buyer_member_id, dealPriority: t.deal_priority, dealCode: t.deal_code },
                              };
                            t.adomain && (c.meta = Object.assign({}, c.meta, { advertiserDomains: [t.adomain] }));
                            t.advertiser_id && (c.meta = Object.assign({}, c.meta, { advertiserId: t.advertiser_id }));
                            t.dsa && (c.meta = Object.assign({}, c.meta, { dsa: t.dsa }));
                            function u(e) {
                              return { ver: '1.0', complete: 0, nodes: [{ bsid: e.buyer_member_id.toString() }] };
                            }
                            t.buyer_member_id && (c.meta = Object.assign({}, c.meta, { dchain: u(t) }));
                            t.brand_id && (c.meta = Object.assign({}, c.meta, { brandId: t.brand_id }));
                            if (t.rtb.video) {
                              Object.assign(c, {
                                width: t.rtb.video.player_width,
                                height: t.rtb.video.player_height,
                                vastImpUrl: t.notify_url,
                                ttl: 3600,
                              });
                              switch ((0, s.A)(i, 'mediaTypes.video.context')) {
                                case p.LM:
                                  const i = _.n[t.brand_category_id] ? _.n[t.brand_category_id] : null;
                                  c.meta = Object.assign({}, c.meta, { primaryCatId: i });
                                  const o = t.deal_priority;
                                  ((c.video = { context: p.LM, durationSeconds: Math.floor(t.rtb.video.duration_ms / 1e3), dealTier: o }),
                                    (c.vastUrl = t.rtb.video.asset_url));
                                  break;
                                case l.H6:
                                  if (
                                    ((c.adResponse = e),
                                    (c.adResponse.ad = c.adResponse.ads[0]),
                                    (c.adResponse.ad.video = c.adResponse.ad.rtb.video),
                                    (c.vastXml = t.rtb.video.content),
                                    t.renderer_url)
                                  ) {
                                    const i = (r.bids || []).find((t) => t.bidId === e.uuid);
                                    let o = (0, s.A)(i, 'mediaTypes.video.renderer.options');
                                    (o || (o = (0, s.A)(i, 'renderer.options')),
                                      (c.renderer = (function (e, t) {
                                        let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                        const i = n.A4.install({
                                          id: t.renderer_id,
                                          url: t.renderer_url,
                                          config: r,
                                          loaded: !1,
                                          adUnitCode: e,
                                        });
                                        try {
                                          i.setRender(H);
                                        } catch (e) {
                                          (0, a.logWarn)('Prebid Error calling setRender on renderer', e);
                                        }
                                        return (
                                          i.setEventHandlers({
                                            impression: () => (0, a.logMessage)('AppNexus outstream video impression event'),
                                            loaded: () => (0, a.logMessage)('AppNexus outstream video loaded event'),
                                            ended: () => {
                                              ((0, a.logMessage)('AppNexus outstream renderer video event'),
                                                (document.querySelector(`#${e}`).style.display = 'none'));
                                            },
                                          }),
                                          i
                                        );
                                      })(c.adUnitCode, t, o)));
                                  }
                                  break;
                                case l.mn:
                                  c.vastUrl = t.notify_url + '&redir=' + encodeURIComponent(t.rtb.video.asset_url);
                              }
                            } else if (t.rtb[p.s6]) {
                              const e = t.rtb[p.s6];
                              let r;
                              if (t.viewability?.config.includes('dom_id=%native_dom_id%')) {
                                const e = 'pbjs_adid=' + d + ';pbjs_auc=' + i.adUnitCode;
                                r = t.viewability.config.replace('dom_id=%native_dom_id%', e);
                              }
                              let a = e.javascript_trackers;
                              (null == a ? (a = r) : (0, o.O8)(a) ? (a = [a, r]) : a.push(r),
                                (c[p.s6] = {
                                  title: e.title,
                                  body: e.desc,
                                  body2: e.desc2,
                                  cta: e.ctatext,
                                  rating: e.rating,
                                  sponsoredBy: e.sponsored,
                                  privacyLink: e.privacy_link,
                                  address: e.address,
                                  downloads: e.downloads,
                                  likes: e.likes,
                                  phone: e.phone,
                                  price: e.price,
                                  salePrice: e.saleprice,
                                  clickUrl: e.link.url,
                                  displayUrl: e.displayurl,
                                  clickTrackers: e.link.click_trackers,
                                  impressionTrackers: e.impression_trackers,
                                  video: e.video,
                                  javascriptTrackers: a,
                                }),
                                e.main_img && (c[p.s6].image = { url: e.main_img.url, height: e.main_img.height, width: e.main_img.width }),
                                e.icon && (c[p.s6].icon = { url: e.icon.url, height: e.icon.height, width: e.icon.width }),
                                (c[p.s6].ext = {
                                  video: e.video,
                                  customImage1: e.image1 && { url: e.image1.url, height: e.image1.height, width: e.image1.width },
                                  customImage2: e.image2 && { url: e.image2.url, height: e.image2.height, width: e.image2.width },
                                  customImage3: e.image3 && { url: e.image3.url, height: e.image3.height, width: e.image3.width },
                                  customImage4: e.image4 && { url: e.image4.url, height: e.image4.height, width: e.image4.width },
                                  customImage5: e.image5 && { url: e.image5.url, height: e.image5.height, width: e.image5.width },
                                  customIcon1: e.icon1 && { url: e.icon1.url, height: e.icon1.height, width: e.icon1.width },
                                  customIcon2: e.icon2 && { url: e.icon2.url, height: e.icon2.height, width: e.icon2.width },
                                  customIcon3: e.icon3 && { url: e.icon3.url, height: e.icon3.height, width: e.icon3.width },
                                  customIcon4: e.icon4 && { url: e.icon4.url, height: e.icon4.height, width: e.icon4.width },
                                  customIcon5: e.icon5 && { url: e.icon5.url, height: e.icon5.height, width: e.icon5.width },
                                  customSocialIcon1: e.socialicon1 && {
                                    url: e.socialicon1.url,
                                    height: e.socialicon1.height,
                                    width: e.socialicon1.width,
                                  },
                                  customSocialIcon2: e.socialicon2 && {
                                    url: e.socialicon2.url,
                                    height: e.socialicon2.height,
                                    width: e.socialicon2.width,
                                  },
                                  customSocialIcon3: e.socialicon3 && {
                                    url: e.socialicon3.url,
                                    height: e.socialicon3.height,
                                    width: e.socialicon3.width,
                                  },
                                  customSocialIcon4: e.socialicon4 && {
                                    url: e.socialicon4.url,
                                    height: e.socialicon4.height,
                                    width: e.socialicon4.width,
                                  },
                                  customSocialIcon5: e.socialicon5 && {
                                    url: e.socialicon5.url,
                                    height: e.socialicon5.height,
                                    width: e.socialicon5.width,
                                  },
                                  customTitle1: e.title1,
                                  customTitle2: e.title2,
                                  customTitle3: e.title3,
                                  customTitle4: e.title4,
                                  customTitle5: e.title5,
                                  customBody1: e.body1,
                                  customBody2: e.body2,
                                  customBody3: e.body3,
                                  customBody4: e.body4,
                                  customBody5: e.body5,
                                  customCta1: e.ctatext1,
                                  customCta2: e.ctatext2,
                                  customCta3: e.ctatext3,
                                  customCta4: e.ctatext4,
                                  customCta5: e.ctatext5,
                                  customDisplayUrl1: e.displayurl1,
                                  customDisplayUrl2: e.displayurl2,
                                  customDisplayUrl3: e.displayurl3,
                                  customDisplayUrl4: e.displayurl4,
                                  customDisplayUrl5: e.displayurl5,
                                  customSocialUrl1: e.socialurl1,
                                  customSocialUrl2: e.socialurl2,
                                  customSocialUrl3: e.socialurl3,
                                  customSocialUrl4: e.socialurl4,
                                  customSocialUrl5: e.socialurl5,
                                }));
                            } else {
                              Object.assign(c, { width: t.rtb.banner.width, height: t.rtb.banner.height, ad: t.rtb.banner.content });
                              try {
                                if (t.rtb.trackers)
                                  for (let e = 0; e < t.rtb.trackers[0].impression_urls.length; e++) {
                                    const r = t.rtb.trackers[0].impression_urls[e],
                                      i = (0, a.createTrackPixelHtml)(r);
                                    c.ad += i;
                                  }
                              } catch (e) {
                                (0, a.logError)('Error appending tracking pixel', e);
                              }
                            }
                            return c;
                          })(e, t, r);
                          ((d.mediaType = (function (e) {
                            const t = e.ad_type;
                            return t === p.G_ ? p.G_ : t === p.s6 ? p.s6 : p.D4;
                          })(t)),
                            i.push(d));
                        }
                      }
                    }),
                  e.debug && e.debug.debug_info)
                ) {
                  let t = 'AppNexus Debug Auction for Prebid\n\n' + e.debug.debug_info;
                  ((t = t
                    .replace(/(<td>|<th>)/gm, '\t')
                    .replace(/(<\/td>|<\/th>)/gm, '\n')
                    .replace(/^<br>/gm, '')
                    .replace(/(<br>\n|<br>)/gm, '\n')
                    .replace(/<h1>(.*)<\/h1>/gm, '\n\n===== $1 =====\n\n')
                    .replace(/<h[2-6]>(.*)<\/h[2-6]>/gm, '\n\n*** $1 ***\n\n')
                    .replace(/(<([^>]+)>)/gim, '')),
                    (0, a.logMessage)('https://console.appnexus.com/docs/understanding-the-debug-auction'),
                    (0, a.logMessage)(t));
                }
                return i;
              },
              getUserSyncs: function (e, t, r, i, a) {
                if (e.iframeEnabled && (0, g.C)(r)) return [{ type: 'iframe', url: 'https://acdn.adnxs.com/dmp/async_usersync.html' }];
                if (e.pixelEnabled) {
                  return ['https://px.ads.linkedin.com/setuid?partner=appNexus'].map((e) => ({ type: 'image', url: e }));
                }
              },
            };
          function N(e) {
            const t = {};
            (Object.keys(e.params).forEach((t) => {
              const r = (0, b.vk)(t);
              r !== t && ((e.params[r] = e.params[t]), delete e.params[t]);
            }),
              (t.sizes = q(e.sizes)),
              (t.primary_size = t.sizes[0]),
              (t.ad_types = []),
              (t.uuid = e.bidId),
              e.params.placement_id ? (t.id = parseInt(e.params.placement_id, 10)) : (t.code = e.params.inv_code));
            const r = (0, a.getParameterByName)('ast_override_div');
            if ((0, o.O8)(r) && '' !== r) {
              const i = decodeURIComponent(r)
                .split(',')
                .find((t) => t.startsWith(`${e.adUnitCode}:`));
              if (i) {
                const e = i.split(':')[1];
                e && (t.force_creative_id = parseInt(e, 10));
              }
            }
            ((t.allow_smaller_sizes = e.params.allow_smaller_sizes || !1),
              (t.use_pmt_rule =
                'boolean' == typeof e.params.use_payment_rule
                  ? e.params.use_payment_rule
                  : 'boolean' == typeof e.params.use_pmt_rule && e.params.use_pmt_rule),
              (t.prebid = !0),
              (t.disable_psa = !0));
            const i = (function (e) {
              if (!(0, o.fp)(e.getFloor)) return e.params.reserve ? e.params.reserve : null;
              const t = e.getFloor({ currency: 'USD', mediaType: '*', size: '*' });
              if ((0, o.Qd)(t) && !isNaN(t.floor) && 'USD' === t.currency) return t.floor;
              return null;
            })(e);
            if ((i && (t.reserve = i), e.params.position)) t.position = { above: 1, below: 2 }[e.params.position] || 0;
            else {
              const r = (0, s.A)(e, 'mediaTypes.banner.pos') || (0, s.A)(e, 'mediaTypes.video.pos');
              (0 !== r && 1 !== r && 3 !== r) || (t.position = 3 === r ? 2 : r);
            }
            (e.params.traffic_source_code && (t.traffic_source_code = e.params.traffic_source_code),
              e.params.private_sizes && (t.private_sizes = q(e.params.private_sizes)),
              e.params.supply_type && (t.supply_type = e.params.supply_type),
              e.params.pub_click && (t.pubclick = e.params.pub_click),
              e.params.ext_inv_code && (t.ext_inv_code = e.params.ext_inv_code),
              e.params.publisher_id && (t.publisher_id = parseInt(e.params.publisher_id, 10)),
              e.params.external_imp_id && (t.external_imp_id = e.params.external_imp_id));
            const n = (0, f.T_)((0, f.gg)((0, s.A)(e, 'ortb2Imp.ext.data.keywords')), e.params?.keywords);
            n.length > 0 && (t.keywords = n);
            const d = (0, s.A)(e, 'ortb2Imp.ext.gpid');
            d && (t.gpid = d);
            const c = (0, s.A)(e, 'ortb2Imp.ext.tid');
            if (
              (c && (t.tid = c),
              (e.mediaType === p.s6 || (0, s.A)(e, `mediaTypes.${p.s6}`)) &&
                (t.ad_types.push(p.s6), 0 === t.sizes.length && (t.sizes = q([1, 1])), e.nativeParams))
            ) {
              const r = (function (e) {
                const t = {};
                return (
                  Object.keys(e).forEach((r) => {
                    const i = (A[r] && A[r].serverName) || A[r] || r,
                      a = A[r] && A[r].requiredParams;
                    t[i] = Object.assign({}, a, e[r]);
                    if (!(i !== A.image.serverName && i !== A.icon.serverName) && t[i].sizes) {
                      const e = t[i].sizes;
                      ((0, o.Uu)(e) || ((0, o.cy)(e) && e.length > 0 && e.every((e) => (0, o.Uu)(e)))) && (t[i].sizes = q(t[i].sizes));
                    }
                    i === A.privacyLink && (t.privacy_supported = !0);
                  }),
                  t
                );
              })(e.nativeParams);
              t[p.s6] = { layouts: [r] };
            }
            {
              const r = (0, s.A)(e, `mediaTypes.${p.G_}`),
                i = (0, s.A)(e, 'mediaTypes.video.context');
              ((t.hb_source = r && 'adpod' === i ? 7 : 1),
                (e.mediaType === p.G_ || r) && t.ad_types.push(p.G_),
                (e.mediaType === p.G_ || (r && 'outstream' !== i)) && (t.require_asset_url = !0),
                e.params.video &&
                  ((t.video = {}),
                  Object.keys(e.params.video)
                    .filter((e) => I.includes(e))
                    .forEach((r) => {
                      switch (r) {
                        case 'context':
                        case 'playback_method':
                          let i = e.params.video[r];
                          ((i = (0, o.cy)(i) ? i[0] : i), (t.video[r] = S[r][i]));
                          break;
                        case 'frameworks':
                          break;
                        default:
                          t.video[r] = e.params.video[r];
                      }
                    }),
                  e.params.video.frameworks && (0, o.cy)(e.params.video.frameworks) && (t.video_frameworks = e.params.video.frameworks)),
                r &&
                  ((t.video = t.video || {}),
                  Object.keys(r)
                    .filter((e) => C.includes(e))
                    .forEach((e) => {
                      switch (e) {
                        case 'minduration':
                        case 'maxduration':
                          'number' != typeof t.video[e] && (t.video[e] = r[e]);
                          break;
                        case 'skip':
                          'boolean' != typeof t.video.skippable && (t.video.skippable = 1 === r[e]);
                          break;
                        case 'skipafter':
                          'number' != typeof t.video.skipoffset && (t.video.skippoffset = r[e]);
                          break;
                        case 'playbackmethod':
                          if ('number' != typeof t.video.playback_method) {
                            let i = r[e];
                            ((i = (0, o.cy)(i) ? i[0] : i), i >= 1 && i <= 4 && (t.video.playback_method = i));
                          }
                          break;
                        case 'api':
                          if (!t.video_frameworks && (0, o.cy)(r[e])) {
                            const i = r[e]
                              .map((e) => {
                                const t = 4 === e ? 5 : 5 === e ? 4 : e;
                                if (t >= 1 && t <= 5) return t;
                              })
                              .filter((e) => e);
                            t.video_frameworks = i;
                          }
                          break;
                        case 'startdelay':
                        case 'plcmt':
                        case 'placement':
                          if ('number' != typeof t.video.context) {
                            const e = r.plcmt,
                              i = r.placement,
                              a = r.startdelay,
                              s =
                                (function (e, t) {
                                  if (!e) return;
                                  if (2 === e) {
                                    if (void 0 === t) return;
                                    if (0 === t) return 'accompanying_content_pre_roll';
                                    if (-1 === t) return 'accompanying_content_mid_roll';
                                    if (-2 === t) return 'accompanying_content_post_roll';
                                  } else {
                                    if (3 === e) return 'interstitial';
                                    if (4 === e) return 'outstream';
                                  }
                                })(e, a) ||
                                (function (e) {
                                  if (!e) return;
                                  if (2 === e) return 'in-banner';
                                  if (3 === e) return 'outstream';
                                  if (4 === e) return 'in-feed';
                                  if (5 === e) return 'intersitial';
                                })(i) ||
                                (function (e) {
                                  if (void 0 === e) return;
                                  if (0 === e) return 'pre_roll';
                                  if (-1 === e) return 'mid_roll';
                                  if (-2 === e) return 'post_roll';
                                })(a);
                            t.video.context = S.context[s];
                          }
                      }
                    })),
                e.renderer && (t.video = Object.assign({}, t.video, { custom_renderer_present: !0 })));
            }
            return (
              e.params.frameworks && (0, o.cy)(e.params.frameworks) && (t.banner_frameworks = e.params.frameworks),
              (0, s.A)(e, `mediaTypes.${p.D4}`) && t.ad_types.push(p.D4),
              0 === t.ad_types.length && delete t.ad_types,
              t
            );
          }
          function q(e) {
            const t = [];
            let r = {};
            if ((0, o.cy)(e) && 2 === e.length && !(0, o.cy)(e[0]))
              ((r.width = parseInt(e[0], 10)), (r.height = parseInt(e[1], 10)), t.push(r));
            else if ('object' == typeof e)
              for (let i = 0; i < e.length; i++) {
                const a = e[i];
                ((r = {}), (r.width = parseInt(a[0], 10)), (r.height = parseInt(a[1], 10)), t.push(r));
              }
            return t;
          }
          function P(e) {
            return !!e.params.user;
          }
          function M(e) {
            return !!parseInt(e.params.member, 10);
          }
          function z(e) {
            if (e.params) return !!e.params.app;
          }
          function B(e) {
            return e.params && e.params.app ? !!e.params.app.id : !!e.params.app;
          }
          function $(e) {
            return !!e.debug;
          }
          function G(e) {
            return e.mediaTypes && e.mediaTypes.video && e.mediaTypes.video.context === p.LM;
          }
          function L(e) {
            let t = !1;
            const r = e.params,
              i = e.params.video;
            return (
              r.frameworks && (0, o.cy)(r.frameworks) && (t = e.params.frameworks.includes(6)),
              !t && i && i.frameworks && (0, o.cy)(i.frameworks) && (t = e.params.video.frameworks.includes(6)),
              t
            );
          }
          function W(e, t, r) {
            ((0, a.isEmpty)(e.video) && (e.video = {}), (e.video[t] = r));
          }
          function H(e, t) {
            (!(function (e) {
              try {
                const t = document.getElementById(e).querySelectorAll("div[id^='google_ads']");
                t[0] && t[0].style.setProperty('display', 'none');
              } catch (e) {}
            })(e.adUnitCode),
              (function (e) {
                try {
                  const t = document.getElementById(e).querySelectorAll("script[id^='sas_script']");
                  t[0].nextSibling && 'iframe' === t[0].nextSibling.localName && t[0].nextSibling.style.setProperty('display', 'none');
                } catch (e) {}
              })(e.adUnitCode),
              e.renderer.push(() => {
                (t?.defaultView || window).ANOutstreamVideo.renderAd(
                  {
                    tagId: e.adResponse.tag_id,
                    sizes: [e.getSize().split('x')],
                    targetId: e.adUnitCode,
                    uuid: e.adResponse.uuid,
                    adResponse: e.adResponse,
                    rendererOptions: e.renderer.getConfig(),
                  },
                  V.bind(null, e),
                );
              }));
          }
          function V(e, t, r) {
            e.renderer.handleVideoEvent({ id: t, eventName: r });
          }
          ((0, c.a$)(R), (0, i.E)('appnexusBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 7247, 5444, 2126, 4982, 2698], () => {
          return ((t = 158), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [234],
      {
        2625(e, t, n) {
          var i = n(1748),
            o = n(466),
            s = n(4369),
            r = n(1418),
            a = n(8668),
            c = n(2201),
            l = n(1443),
            d = n(736);
          const m = 'atsAnalytics',
            u = (0, l.vM)({ moduleType: d.Tn, moduleName: m });
          let p = [];
          const g = [],
            f = [
              { test: /googlebot/i, name: 'Googlebot' },
              { test: /opera/i, name: 'Opera' },
              { test: /opr\/|opios/i, name: 'Opera' },
              { test: /SamsungBrowser/i, name: 'Samsung Internet for Android' },
              { test: /Whale/i, name: 'NAVER Whale Browser' },
              { test: /MZBrowser/i, name: 'MZ Browser' },
              { test: /focus/i, name: 'Focus' },
              { test: /swing/i, name: 'Swing' },
              { test: /coast/i, name: 'Opera Coast' },
              { test: /opt\/\d+(?:.?_?\d+)+/i, name: 'Opera Touch' },
              { test: /yabrowser/i, name: 'Yandex Browser' },
              { test: /ucbrowser/i, name: 'UC Browser' },
              { test: /Maxthon|mxios/i, name: 'Maxthon' },
              { test: /epiphany/i, name: 'Epiphany' },
              { test: /puffin/i, name: 'Puffin' },
              { test: /sleipnir/i, name: 'Sleipnir' },
              { test: /k-meleon/i, name: 'K-Meleon' },
              { test: /micromessenger/i, name: 'WeChat' },
              { test: /qqbrowser/i, name: /qqbrowserlite/i.test(window.navigator.userAgent) ? 'QQ Browser Lite' : 'QQ Browser' },
              { test: /msie|trident/i, name: 'Internet Explorer' },
              { test: /\sedg\//i, name: 'Microsoft Edge' },
              { test: /edg([ea]|ios)/i, name: 'Microsoft Edge' },
              { test: /vivaldi/i, name: 'Vivaldi' },
              { test: /seamonkey/i, name: 'SeaMonkey' },
              { test: /sailfish/i, name: 'Sailfish' },
              { test: /silk/i, name: 'Amazon Silk' },
              { test: /phantom/i, name: 'PhantomJS' },
              { test: /slimerjs/i, name: 'SlimerJS' },
              { test: /blackberry|\bbb\d+/i, name: 'BlackBerry' },
              { test: /(web|hpw)[o0]s/i, name: 'WebOS Browser' },
              { test: /bada/i, name: 'Bada' },
              { test: /tizen/i, name: 'Tizen' },
              { test: /qupzilla/i, name: 'QupZilla' },
              { test: /firefox|iceweasel|fxios/i, name: 'Firefox' },
              { test: /electron/i, name: 'Electron' },
              { test: /MiuiBrowser/i, name: 'Miui' },
              { test: /chromium/i, name: 'Chromium' },
              { test: /chrome|crios|crmo/i, name: 'Chrome' },
              { test: /GSA/i, name: 'Google Search' },
              { test: /android/i, name: 'Android Browser' },
              { test: /playstation 4/i, name: 'PlayStation 4' },
              { test: /safari|applewebkit/i, name: 'Safari' },
            ],
            A = ['Safari', 'Chrome', 'Firefox', 'Microsoft Edge'];
          function h() {
            const e = S.getUserAgent();
            try {
              const t = f.filter(function (t) {
                  return t.test.test(e);
                }),
                n = t && t.length ? t[0].name : '';
              return A.indexOf(n) >= 0 ? n : 'Unknown';
            } catch (e) {
              (0, o.logError)('ATS Analytics - Error while checking user browser!', e);
            }
          }
          function y(e) {
            try {
              const t = { Data: e },
                n = JSON.stringify(t);
              ((0, o.logInfo)('ATS Analytics - tried to send analytics data!'),
                (0, c.RD)(
                  'https://analytics.rlcdn.com',
                  function () {
                    (0, o.logInfo)('ATS Analytics - events sent successfully!');
                  },
                  n,
                  { method: 'POST', contentType: 'application/json' },
                ));
            } catch (e) {
              (0, o.logError)('ATS Analytics - request encounter an error: ', e);
            }
          }
          const S = Object.assign((0, s.Ay)({ analyticsType: 'endpoint' }), {
            track(e) {
              let { eventType: t, args: n } = e;
              void 0 !== n && S.callHandler(t, n);
            },
          });
          ((S.originEnableAnalytics = S.enableAnalytics),
            (S.shouldFireRequest = function (e) {
              if (0 !== e) {
                const e = 100 === Math.floor(100 * Math.random() + 1);
                return ((0, o.logInfo)('ATS Analytics - Should Fire Request: ', e), e);
              }
              return ((0, o.logInfo)('ATS Analytics - Should Fire Request: ', !1), !1);
            }),
            (S.getUserAgent = function () {
              return window.navigator.userAgent;
            }),
            (S.setSamplingCookie = function (e) {
              const t = new Date();
              (t.setTime(t.getTime() + 6048e5), u.setCookie('_lr_sampling_rate', e, t.toUTCString()));
            }),
            (S.enableAnalytics = function (e) {
              e.options.pid
                ? ((S.context = { events: [], pid: e.options.pid, bidWonTimeout: e.options.bidWonTimeout }),
                  (0, o.logInfo)('ATS Analytics - adapter enabled! '),
                  S.originEnableAnalytics(e))
                : (0, o.logError)("ATS Analytics - Publisher ID (pid) option is not defined. Analytics won't work");
            }),
            (S.callHandler = function (e, t) {
              if (
                (e === r.qY.BID_REQUESTED
                  ? (p = p.concat(
                      (function (e) {
                        const t = 'true' === u.getCookie('_lr_env_src_ats');
                        let n;
                        return (
                          (n = e.bids.map(function (n) {
                            return {
                              envelope_source: t,
                              has_envelope: (function () {
                                if (n.userIdAsEids && Array.isArray(n.userIdAsEids)) {
                                  const e = n.userIdAsEids.find((e) => 'liveramp.com' === e.source);
                                  if (e && e.uids && e.uids.length > 0) return !0;
                                }
                                return !(!n.userId || !n.userId.idl_env);
                              })(),
                              bidder: n.bidder,
                              bid_id: n.bidId,
                              auction_id: e.auctionId,
                              user_browser: h(),
                              user_platform: navigator.platform,
                              auction_start: new Date(e.auctionStart).toJSON(),
                              domain: window.location.hostname,
                              pid: S.context.pid,
                              adapter_version: 3,
                              bid_won: !1,
                            };
                          })),
                          n
                        );
                      })(t),
                    ))
                  : e === r.qY.BID_RESPONSE &&
                    g.push(
                      (function (e) {
                        return {
                          bid_id: e.requestId,
                          response_time_stamp: new Date(e.responseTimestamp).toJSON(),
                          currency: e.currency,
                          cpm: e.cpm,
                          net_revenue: e.netRevenue,
                        };
                      })(t),
                    ),
                e === r.qY.AUCTION_END)
              ) {
                const e = S.context.bidWonTimeout ? S.context.bidWonTimeout : 2e3;
                let t = [];
                setTimeout(() => {
                  const e = (0, i.m)().getAllWinningBids();
                  if (((0, o.logInfo)('ATS Analytics - winning bids: ', e), p.length)) {
                    const n = {};
                    g.length
                      ? ((t = []),
                        p.forEach((e) => {
                          (g.forEach(function (t) {
                            e.bid_id === t.bid_id && Object.assign(e, t);
                          }),
                            t.push(e));
                        }),
                        e.length &&
                          (t = t.map(
                            (t) => (
                              e.forEach(function (e) {
                                ((n.bid_id = e.requestId), (n.bid_won = !0), t.bid_id === n.bid_id && Object.assign(t, n));
                              }),
                              t
                            ),
                          )))
                      : (t = p);
                    try {
                      const e = u.getCookie('_lr_sampling_rate');
                      (e
                        ? S.shouldFireRequest(parseInt(e)) && ((0, o.logInfo)('ATS Analytics - events to send: ', t), y(t))
                        : (function (e) {
                            ((0, o.logInfo)('ATS Analytics - preflight request!'),
                              (0, c.RD)(
                                'https://check.analytics.rlcdn.com/check/' + S.context.pid,
                                {
                                  success: function (t) {
                                    const n = JSON.parse(t);
                                    (0, o.logInfo)('ATS Analytics - Sampling Rate: ', n);
                                    const i = n.samplingRate;
                                    S.setSamplingCookie(i);
                                    const s = Number(i);
                                    t && i && S.shouldFireRequest(s) && ((0, o.logInfo)('ATS Analytics - events to send: ', e), y(e));
                                  },
                                  error: function () {
                                    (S.setSamplingCookie(0), (0, o.logInfo)('ATS Analytics - Sampling Rate Request Error!'));
                                  },
                                },
                                void 0,
                                { method: 'GET', crossOrigin: !0 },
                              ));
                          })(t),
                        (t = []));
                    } catch (e) {
                      (0, o.logError)('ATS Analytics - preflight request encounter an error: ', e);
                    }
                  }
                }, e);
              }
            }),
            a.Ay.registerAnalyticsAdapter({ adapter: S, code: m, gvlid: 97 }));
          (0, i.E)('atsAnalyticsAdapter');
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 2630], () => {
          return ((t = 2625), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8793],
      {
        9648(e, n, t) {
          var s = t(1748),
            i = t(466),
            a = t(3435),
            r = t(6665),
            p = t(1933),
            o = t(1385),
            l = t(8034),
            c = t(3254),
            u = t(3064),
            d = t(3965),
            g = t(9708);
          let h = {},
            m = null;
          class C {
            constructor(e, n) {
              ((this.message = e), (this.args = null == n ? [] : [n]));
            }
          }
          class f {
            apiVersion = '1.1';
            static get() {
              let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c.c5;
              if (null == this.INST) {
                const n = e({ apiName: '__gpp', apiArgs: ['command', 'callback', 'parameter'], mode: c.q4 });
                if (null == n) throw new C('GPP CMP not found');
                this.INST = new this(n);
              }
              return this.INST;
            }
            #e;
            #n;
            #t = [];
            initialized = !1;
            constructor(e) {
              ((this.cmp = e),
                ([this.#e, this.#n] = ['resolve', 'reject'].map((e) => (n) => {
                  for (; this.#t.length; ) this.#t.pop()[e](n);
                })));
            }
            init(e) {
              const n = this.updateWhenReady(e);
              return (
                this.initialized ||
                  (e.gppVersion !== this.apiVersion &&
                    (0, i.logWarn)(`Unrecognized GPP CMP version: ${e.apiVersion}. Continuing using GPP API version ${this.apiVersion}...`),
                  (this.initialized = !0),
                  m || (m = (0, g.Al)('gpp')),
                  m.setCmpApi(this.cmp),
                  this.cmp({
                    command: 'addEventListener',
                    callback: (e, n) => {
                      (null == n || n
                        ? 'error' === e?.pingData?.cmpStatus
                          ? this.#n(new C('CMP status is "error"; please check CMP setup', e))
                          : this.isCMPReady(e?.pingData || {}) &&
                            ['sectionChange', 'signalStatus'].includes(e?.eventName) &&
                            this.#e(this.updateConsent(e.pingData))
                        : this.#n(new C('Received error response from CMP', e)),
                        null == o.ad.getConsentData() || null == e?.pingData || this.isCMPReady(e.pingData) || o.ad.setConsentData(null),
                        null != e?.listenerId && m?.setCmpListenerId(e?.listenerId));
                    },
                  })),
                n
              );
            }
            refresh() {
              return this.cmp({ command: 'ping' }).then(this.init.bind(this));
            }
            updateConsent(e) {
              return new u.U9((n) => {
                if (null == e || (0, i.isEmpty)(e)) throw new C('Received empty response from CMP', e);
                const t = S(e);
                ((0, i.logInfo)('Retrieved GPP consent from CMP:', t), o.ad.setConsentData(t), n(t));
              });
            }
            nextUpdate() {
              const e = (0, u.v6)();
              return (this.#t.push(e), e.promise);
            }
            updateWhenReady(e) {
              return this.isCMPReady(e) ? this.updateConsent(e) : this.nextUpdate();
            }
            isCMPReady(e) {
              return 'ready' === e.signalStatus;
            }
          }
          const v = {
            iab: function () {
              return new u.U9((e) => e(f.get().refresh()));
            },
          };
          function S(e) {
            if (
              (null != e?.applicableSections && !Array.isArray(e.applicableSections)) ||
              (null != e?.gppString && !(0, r.O8)(e.gppString)) ||
              (null != e?.parsedSections && !(0, r.Qd)(e.parsedSections))
            )
              throw new C('CMP returned unexpected value during lookup process.', e);
            return (
              ['usnatv1', 'uscav1'].forEach((n) => {
                e?.parsedSections?.[n] &&
                  (0, i.logWarn)(`Received invalid section from cmp: '${n}'. Some functionality may not work as expected`, e);
              }),
              P(e)
            );
          }
          function P() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
              gppString: e?.gppString,
              applicableSections: e?.applicableSections || [],
              parsedSections: e?.parsedSections || {},
              gppData: e,
            };
          }
          const y = (0, d.yq)({
            namespace: 'gpp',
            displayName: 'GPP',
            consentDataHandler: o.ad,
            parseConsentData: S,
            getNullConsent: () => P(null),
            cmpHandlers: v,
            cmpEventCleanup: function () {
              (m && (m.removeCmpEventListener(), (m = null)), (h = {}), o.ad.reset(), (f.INST = null));
            },
          });
          (p.$W.getConfig('consentManagement', (e) =>
            (function (e) {
              return ((h = y(e)), h.loadConsentData?.()?.catch?.(() => null));
            })(e.consentManagement),
          ),
            l.wU.before(function (e, n) {
              return e(
                n.then((e) => {
                  const n = o.ad.getConsentData();
                  return (
                    n &&
                      (Array.isArray(n.applicableSections) && (0, a.J)(e, 'regs.gpp_sid', n.applicableSections),
                      (0, a.J)(e, 'regs.gpp', n.gppString)),
                    e
                  );
                }),
              );
            }),
            (0, s.E)('consentManagementGpp'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 7109, 10], () => {
          return ((n = 9648), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5081],
      {
        6264(e, n, t) {
          var s = t(1748),
            o = t(466),
            r = t(3435),
            a = t(6665),
            c = t(1933),
            i = t(1385),
            l = t(2517),
            p = t(8034),
            d = t(3254),
            u = t(3965),
            g = t(9708);
          let f,
            C,
            m = {};
          const v = {
            iab: function (e) {
              return new Promise((n, t) => {
                const s = (0, d.c5)({ apiName: '__tcfapi', apiVersion: 2, apiArgs: ['command', 'version', 'callback', 'parameter'] });
                (s || t(new Error('TCF2 CMP not found.')),
                  s.isDirect
                    ? (0, o.logInfo)('Detected CMP API is directly accessible, calling it now...')
                    : (0, o.logInfo)('Detected CMP is outside the current iframe where Prebid.js is located, calling it now...'),
                  b || (b = (0, g.Al)('tcf', () => i.mW.getConsentData())),
                  b.setCmpApi(s),
                  s({
                    command: 'addEventListener',
                    callback: function (s, r) {
                      if (((0, o.logInfo)('Received a response from CMP', s), r)) {
                        try {
                          e(D(s));
                        } catch (e) {}
                        if (!1 === s.gdprApplies || 'tcloaded' === s.eventStatus || 'useractioncomplete' === s.eventStatus)
                          try {
                            (null !== s.listenerId && void 0 !== s.listenerId && b?.setCmpListenerId(s.listenerId),
                              i.mW.setConsentData(D(s)),
                              n());
                          } catch (e) {
                            t(e);
                          }
                      } else t(Error('CMP unable to register callback function.  Please check CMP setup.'));
                    },
                  }));
              });
            },
          };
          let b = null;
          function D(e) {
            if (
              (function () {
                const n = e && 'boolean' == typeof e.gdprApplies ? e.gdprApplies : f,
                  t = e && e.tcString;
                return !('boolean' == typeof n && (!0 !== n || (t && (0, a.O8)(t))));
              })()
            )
              throw Object.assign(new Error('CMP returned unexpected value during lookup process.'), { args: [e] });
            return A(e);
          }
          function A(e) {
            const n = {
              consentString: e ? e.tcString : void 0,
              vendorData: e || void 0,
              gdprApplies: e && 'boolean' == typeof e.gdprApplies ? e.gdprApplies : f,
              apiVersion: 2,
            };
            return (e && e.addtlConsent && (0, a.O8)(e.addtlConsent) && (n.addtlConsent = e.addtlConsent), n);
          }
          const P = (0, u.yq)({
            namespace: 'gdpr',
            displayName: 'TCF',
            consentDataHandler: i.mW,
            cmpHandlers: v,
            parseConsentData: D,
            getNullConsent: () => A(null),
            cmpEventCleanup: function () {
              (b && (b.removeCmpEventListener(), (b = null)), (m = {}), i.mW.reset());
            },
          });
          (c.$W.getConfig('consentManagement', (e) =>
            (function (e) {
              const n = e && (e.gdpr || e.usp || e.gpp ? e.gdpr : e);
              return (
                null != n?.consentData?.getTCData && (n.consentData = n.consentData.getTCData),
                (f = !0 === n?.defaultGdprScope),
                (C = !!n?.dsaPlatform),
                (m = P({ gdpr: n })),
                m.loadConsentData?.()?.catch?.(() => null)
              );
            })(e.consentManagement),
          ),
            p.wU.before(function (e, n) {
              return e(
                n.then((e) => {
                  const n = i.mW.getConsentData();
                  return (
                    n &&
                      ('boolean' == typeof n.gdprApplies && (0, r.J)(e, 'regs.ext.gdpr', n.gdprApplies ? 1 : 0),
                      (0, r.J)(e, 'user.ext.consent', n.consentString)),
                    C && (0, r.J)(e, 'regs.ext.dsa.dsarequired', 3),
                    e
                  );
                }),
              );
            }),
            (0, l.pS)({
              type: l.S3,
              name: 'gdprAddtlConsent',
              fn: function (e, n) {
                const t = n.gdprConsent?.addtlConsent;
                t && 'string' == typeof t && (0, r.J)(e, 'user.ext.ConsentedProvidersSettings.consented_providers', t);
              },
            }),
            (0, s.E)('consentManagementTcf'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 7109, 10], () => {
          return ((n = 6264), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [931],
      {
        6938(e, t, o) {
          var n = o(1748),
            r = o(466),
            i = o(2201),
            a = o(867),
            c = o(2592),
            s = o(1443),
            d = o(736),
            l = o(1385);
          const p = 'criteo',
            g = (0, s.vM)({ moduleType: d.fW, moduleName: p }),
            u = 'cto_bidid',
            m = 'cto_bundle',
            b = 'html5',
            I = 'cookie',
            y = new Date(0).toString(),
            f = new Date((0, r.timestamp)() + 33696e6).toString();
          function S(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            const o = (0, r.parseUrl)(e, { noDecodeWholeURL: !0 });
            return t ? `${o.hostname}` : `${o.protocol}://${o.hostname}${o.port ? ':' + o.port : ''}/`;
          }
          function h(e, t) {
            return e?.storage?.type === b
              ? g.getDataFromLocalStorage(t)
              : e?.storage?.type === I
                ? g.getCookie(t)
                : g.getCookie(t) || g.getDataFromLocalStorage(t);
          }
          function C(e, t, o, n) {
            t &&
              o &&
              (e?.storage?.type === b
                ? g.setDataInLocalStorage(t, o)
                : (e?.storage?.type === I || g.setDataInLocalStorage(t, o), U(t, o, f, n, !0)));
          }
          function U(e, t, o, n, r) {
            const i = n.split('.');
            for (let n = 0; n < i.length; ++n) {
              const a = i.slice(i.length - n - 1, i.length).join('.');
              try {
                if ((g.setCookie(e, t, o, null, '.' + a), r)) {
                  const o = g.getCookie(e);
                  if (o && o === t) break;
                }
              } catch (e) {}
            }
          }
          function v(e, t, o) {
            const n = (void 0 === e?.storage?.type || e?.storage?.type === I) && g.cookiesAreEnabled(),
              c = (void 0 === e?.storage?.type || e?.storage?.type === b) && g.localStorageIsEnabled(),
              s = S((0, a.EN)().page),
              d = S(document.location.href, !0),
              p = 'undefined' != typeof criteo_pubtag,
              f = (function (e, t, o, n, r, i, a) {
                let c =
                  'https://gum.criteo.com/sid/json?origin=prebid' +
                  (e ? '&topUrl=' + encodeURIComponent(e) : '') +
                  (t ? '&domain=' + encodeURIComponent(t) : '') +
                  (o ? '&bundle=' + encodeURIComponent(o) : '') +
                  (n ? '&info=' + encodeURIComponent(n) : '') +
                  (r ? '&cw=1' : '') +
                  (a ? '&pbt=1' : '') +
                  (i ? '&lsw=1' : '');
                const s = l.t6.getConsentData();
                s && (c += `&us_privacy=${encodeURIComponent(s)}`);
                const d = l.mW.getConsentData();
                d &&
                  ((c = c + '' + (d.consentString ? '&gdprString=' + encodeURIComponent(d.consentString) : '')),
                  (c = c + '&gdpr=' + (!0 === d.gdprApplies ? 1 : 0)));
                const p = l.ad.getConsentData();
                return (
                  p &&
                    ((c = c + '' + (p.gppString ? '&gpp=' + encodeURIComponent(p.gppString) : '')),
                    (c = c + '' + (p.applicableSections ? '&gpp_sid=' + encodeURIComponent(p.applicableSections) : ''))),
                  c
                );
              })(s, d, t.bundle, t.dnaBundle, n, c, p),
              h = {
                success: (t) => {
                  const n = JSON.parse(t);
                  if (
                    (n.pixels &&
                      n.pixels.forEach((t) =>
                        (function (e, t, o) {
                          o.writeBundleInStorage && o.bundlePropertyName && o.storageKeyName
                            ? (0, i.RD)(
                                o.pixelUrl,
                                {
                                  success: (n) => {
                                    if (n) {
                                      const r = JSON.parse(n);
                                      r && r[o.bundlePropertyName] && C(e, o.storageKeyName, r[o.bundlePropertyName], t);
                                    }
                                  },
                                  error: (e) => {
                                    (0, r.logError)('criteoIdSystem: unable to sync user id', e);
                                  },
                                },
                                void 0,
                                { method: 'GET', withCredentials: !0 },
                              )
                            : (0, r.triggerPixel)(o.pixelUrl);
                        })(e, d, t),
                      ),
                    n.acwsUrl)
                  ) {
                    ('string' == typeof n.acwsUrl ? [n.acwsUrl] : n.acwsUrl).forEach((e) => (0, r.triggerPixel)(e));
                  } else n.bundle && C(e, m, n.bundle, d);
                  if (n.bidId) {
                    C(e, u, n.bidId, d);
                    const t = { criteoId: n.bidId };
                    o(t);
                  } else (U((a = u), '', y, d, !0), g.removeDataFromLocalStorage(a), o());
                  var a;
                },
                error: (e) => {
                  ((0, r.logError)('criteoIdSystem: unable to sync user id', e), o());
                },
              };
            (0, i.RD)(f, h, void 0, { method: 'GET', contentType: 'application/json', withCredentials: !0 });
          }
          const D = {
            name: p,
            gvlid: 91,
            decode: (e) => e,
            getId(e) {
              const t = (function (e) {
                return { bundle: h(e, m), dnaBundle: h(e, 'cto_dna_bundle'), bidId: h(e, u) };
              })(e);
              return { id: t.bidId ? { criteoId: t.bidId } : void 0, callback: (o) => v(e, t, o) };
            },
            eids: { criteoId: { source: 'criteo.com', atype: 1 } },
          };
          ((0, c.bz)('userId', D), (0, n.E)('criteoIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((t = 6938), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6466],
      {
        6817(e, r, n) {
          var o = n(1748),
            t = n(466),
            c = n(3435),
            i = n(1418),
            s = n(2201),
            u = n(1933),
            a = n(2592),
            f = n(3064),
            l = n(2517),
            d = n(7841),
            y = n(8014),
            g = n(8034),
            v = n(6283),
            p = n(4367);
          let h,
            C = [],
            b = {},
            $ = !1,
            R = !0,
            m = 'USD';
          var I = !1,
            S = {};
          let U,
            N = {},
            O = (0, f.v6)();
          const T = (0, v.L)();
          let w = 0;
          function D(e) {
            if (
              ((h = 'https://cdn.jsdelivr.net/gh/prebid/currency-file@1/latest.json?date=$$TODAY$$'),
              null !== e.rates && 'object' == typeof e.rates && ((S.conversions = e.rates), ($ = !0), (R = !1)),
              null !== e.defaultRates && 'object' == typeof e.defaultRates && ((U = e.defaultRates), (S.conversions = U), ($ = !0)),
              'string' == typeof e.adServerCurrency)
            ) {
              ((w = e.auctionDelay),
                (0, t.logInfo)('enabling currency support', e),
                (m = e.adServerCurrency),
                e.conversionRateFile &&
                  ((0, t.logInfo)('currency using override conversionRateFile:', e.conversionRateFile), (h = e.conversionRateFile)));
              const r = h.indexOf('$$TODAY$$');
              if (-1 !== r) {
                const e = new Date();
                let n = `${e.getMonth() + 1}`,
                  o = `${e.getDate()}`;
                (n.length < 2 && (n = `0${n}`), o.length < 2 && (o = `0${o}`));
                const t = `${e.getFullYear()}${n}${o}`;
                h = `${h.substring(0, r)}${t}${h.substring(r + 9, h.length)}`;
              }
              ((b = {}),
                I ||
                  ((I = !0),
                  (0, p.xu)('convertCurrency', E, !1),
                  (0, a.Yn)('addBidResponse').before(F, 100),
                  (0, a.Yn)('responsesReady').before(A),
                  g.wU.before(M),
                  (0, a.Yn)('requestBids').before(x, 50),
                  (0, y.on)(i.qY.AUCTION_TIMEOUT, j),
                  (0, y.on)(i.qY.AUCTION_INIT, k),
                  k()));
            } else
              ((w = 0),
                (0, t.logInfo)('disabling currency support'),
                I &&
                  ((0, a.Yn)('addBidResponse').getHooks({ hook: F }).remove(),
                  (0, a.Yn)('responsesReady').getHooks({ hook: A }).remove(),
                  g.wU.getHooks({ hook: M }).remove(),
                  (0, a.Yn)('requestBids').getHooks({ hook: x }).remove(),
                  (0, y.AU)(i.qY.AUCTION_TIMEOUT, j),
                  (0, y.AU)(i.qY.AUCTION_INIT, k),
                  delete (0, o.m)().convertCurrency,
                  (m = 'USD'),
                  (b = {}),
                  (I = !1),
                  ($ = !1),
                  (R = !0),
                  (S = {}),
                  (N = {}),
                  (O = (0, f.v6)())));
            'object' == typeof e.bidderCurrencyDefault && (N = e.bidderCurrencyDefault);
          }
          function Y(e) {
            U
              ? ((0, t.logWarn)(e), (0, t.logWarn)('Currency failed loading rates, falling back to currency.defaultRates'))
              : (0, t.logError)(e);
          }
          function k() {
            R
              ? ((R = !1),
                ($ = !1),
                (0, s.RD)(h, {
                  success: function (e) {
                    try {
                      ((S = JSON.parse(e)),
                        (0, t.logInfo)('currencyRates set to ' + JSON.stringify(S)),
                        (b = {}),
                        ($ = !0),
                        _(),
                        T.resume());
                    } catch (r) {
                      Y('Failed to parse currencyRates response: ' + e);
                    }
                  },
                  error: function (e) {
                    (Y(e), ($ = !0), _(), T.resume(), (R = !0));
                  },
                }))
              : _();
          }
          function E(e, r, n) {
            return parseFloat(e) * W(r, n);
          }
          function A(e, r) {
            e(r.then(() => O.promise));
          }
          u.$W.getConfig('currency', (e) => D(e.currency));
          const F = (0, d.NL)('currency', function (e, r, n, o) {
            if (!n) return e.call(this, r, n, o);
            const c = n.bidderCode || n.bidder;
            if (N[c]) {
              const e = N[c];
              n.currency && e !== n.currency
                ? (0, t.logWarn)(`Currency default '${c}: ${e}' ignored. adapter specified '${n.currency}'`)
                : (n.currency = e);
            }
            if (
              (n.currency || ((0, t.logWarn)('Currency not specified on bid.  Defaulted to "USD"'), (n.currency = 'USD')),
              (n.getCpmInNewCurrency = function (e) {
                return (parseFloat(this.cpm) * W(this.currency, e)).toFixed(3);
              }),
              n.currency === m)
            )
              return e.call(this, r, n, o);
            (C.push([e, this, r, n, o]), (I && !$) || _());
          });
          function j(e) {
            let { auctionId: r } = e;
            C = C.filter((e) => {
              let [n, o, t, c, s] = e;
              return c.auctionId !== r || (s(i.Tf.CANNOT_CONVERT_CURRENCY), !1);
            });
          }
          function _() {
            for (; C.length > 0; ) {
              const [e, r, n, o, c] = C.shift();
              if (void 0 !== o && 'currency' in o && 'cpm' in o) {
                const e = o.currency;
                try {
                  const r = W(e);
                  1 !== r && ((o.cpm = (parseFloat(o.cpm) * r).toFixed(4)), (o.currency = m));
                } catch (e) {
                  ((0, t.logWarn)('getCurrencyConversion threw error: ', e), c(i.Tf.CANNOT_CONVERT_CURRENCY));
                  continue;
                }
              }
              e.call(r, n, o, c);
            }
            O.resolve();
          }
          function W(e) {
            let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : m;
            var n,
              o = null;
            const c = `${e}->${r}`;
            if (c in b) ((o = b[c]), (0, t.logMessage)('Using conversionCache value ' + o + ' for ' + c));
            else if (!1 === I) {
              if ('USD' !== e) throw new Error('Prebid currency support has not been enabled and fromCurrency is not USD');
              o = 1;
            } else if (e === r) o = 1;
            else if (e in S.conversions) {
              if (!(r in (n = S.conversions[e])))
                throw new Error("Specified adServerCurrency in config '" + r + "' not found in the currency rates file");
              ((o = n[r]), (0, t.logInfo)('getCurrencyConversion using direct ' + e + ' to ' + r + ' conversionRate ' + o));
            } else if (r in S.conversions) {
              if (!(e in (n = S.conversions[r])))
                throw new Error("Specified fromCurrency '" + e + "' not found in the currency rates file");
              ((o = q(1 / n[e], 4)), (0, t.logInfo)('getCurrencyConversion using reciprocal ' + e + ' to ' + r + ' conversionRate ' + o));
            } else {
              var i = Object.keys(S.conversions)[0];
              if (!(e in S.conversions[i])) throw new Error("Specified fromCurrency '" + e + "' not found in the currency rates file");
              var s = 1 / S.conversions[i][e];
              if (!(r in S.conversions[i]))
                throw new Error("Specified adServerCurrency in config '" + r + "' not found in the currency rates file");
              ((o = q(s * S.conversions[i][r], 4)),
                (0, t.logInfo)('getCurrencyConversion using intermediate ' + e + ' thru ' + i + ' to ' + r + ' conversionRate ' + o));
            }
            return (c in b || ((0, t.logMessage)('Adding conversionCache value ' + o + ' for ' + c), (b[c] = o)), o);
          }
          function q(e, r) {
            var n = 1;
            for (let e = 0; e < r; e++) n += '0';
            return Math.round(e * n) / n;
          }
          function M(e, r) {
            return e(r.then((e) => ((0, c.J)(e, 'ext.prebid.adServerCurrency', m), e)));
          }
          (0, l.pS)({
            type: l.S3,
            name: 'currency',
            fn: function (e, r, n) {
              I && (e.cur = e.cur || [n.currency || m]);
            },
          });
          const x = (0, d.Ak)('currency', function (e, r) {
            const n = ((o = this), () => e.call(o, r));
            var o;
            !$ && w > 0
              ? T.submit(w, n, () => {
                  ((0, t.logWarn)(`currency: Fetch attempt did not return in time for auction ${r.auctionId}`), n());
                })
              : n();
          });
          (0, o.E)('currency');
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 5957], () => {
          return ((r = 6817), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5594],
      {
        1337(e, n, r) {
          var t = r(1748),
            o = r(466),
            i = r(8928),
            s = r(2592),
            u = r(1443),
            d = r(736),
            a = r(770);
          const p = 'euid',
            l = `PrebidJS-10.29.0-EUIDModule-${a.kz}`,
            c = 'EUID: ';
          function f(e, n) {
            return function () {
              for (var r = arguments.length, t = new Array(r), o = 0; o < r; o++) t[o] = arguments[o];
              e(n + ' ', ...t);
            };
          }
          const g = f(o.logInfo, c),
            m = f(o.logWarn, c),
            v = (0, u.vM)({ moduleType: d.fW, moduleName: p });
          const k = {
            name: p,
            gvlid: 21,
            decode(e) {
              const n = (function (e) {
                if ('string' == typeof e) {
                  g('Found server-only token. Refresh is unavailable for this token.');
                  return { euid: { id: e } };
                }
                if ('optout' === e.latestToken)
                  return (g('Found optout token.  Refresh is unavailable for this token.'), { euid: { optout: !0 } });
                if (Date.now() < e.latestToken.identity_expires) return { euid: { id: e.latestToken.advertising_token } };
                return null;
              })(e);
              return (g('EUID decode returned', n), n);
            },
            getId(e, n) {
              if (!0 !== n?.gdpr?.gdprApplies)
                return void (0, o.logWarn)('EUID is intended for use within the EU. The module will not run when GDPR does not apply.');
              if (
                !(function (e) {
                  const n = !0 === e?.gdprApplies,
                    r = (0, i.A)(e, 'vendorData.purpose.consents.1'),
                    t = (0, i.A)(e, `vendorData.vendor.consents.${(21).toString()}`);
                  return !!(!n || (r && t));
                })(n?.gdpr)
              )
                return void m('Unable to use EUID module due to insufficient consent. The EUID module requires storage permission.');
              const r = {
                apiBaseUrl: e?.params?.euidApiBase ?? 'https://prod.euid.eu',
                paramToken: e?.params?.euidToken,
                serverCookieName: e?.params?.euidCookie,
                storage: e?.params?.storage ?? 'localStorage',
                clientId: l,
                internalStorage: '__euid_advertising_token',
              };
              ((r.cstg = {
                serverPublicKey: e?.params?.serverPublicKey,
                subscriptionId: e?.params?.subscriptionId,
                ...(0, a.E0)(e?.params ?? {}),
              }),
                g('EUID configuration loaded and mapped.', r));
              const t = (0, a.wq)(r, v, g, m);
              return (g('EUID getId returned', t), t);
            },
            eids: {
              euid: {
                source: 'euid.eu',
                atype: 3,
                getValue: function (e) {
                  return e.id;
                },
              },
            },
          };
          ((0, s.bz)('userId', k), (0, t.E)('euidIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 1912], () => {
          return ((n = 1337), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2355],
      {
        242(e, t, r) {
          var a = r(1748),
            n = r(2819),
            o = r(1958),
            i = r(3129),
            s = r(3006),
            c = r(1933),
            l = r(1418),
            d = r(8014),
            u = r(2592),
            p = r(867),
            m = r(869),
            f = r(466),
            g = r(6665),
            h = r(2145),
            b = r(1640),
            y = r(2201),
            v = r(3223),
            A = r(765),
            w = r(1385);
          const S = { ri: p.EN },
            C = 'VASTAdTagURI';
          function U(e) {
            if (!e.params && !e.url)
              return void (0, f.logError)(`A params object or a url is required to use ${(0, A.k)()}.adServers.gam.buildVideoUrl`);
            const t = e.adUnit,
              r = e.bid || m.iS.getWinningBids(t.code)[0];
            let a = {};
            if (e.url && ((a = (0, f.parseUrl)(e.url, { noDecodeWholeURL: !0 })), (0, f.isEmpty)(e.params)))
              return (function (e, t, r) {
                const a = _(t, e, 'search');
                a && (e.search.description_url = a);
                return ((e.search.cust_params = k(t, r, e.search.cust_params)), (0, f.buildUrl)(e));
              })(a, r, e);
            const o = {
                correlator: Date.now(),
                sz: (0, f.parseSizesInput)(t?.mediaTypes?.video?.playerSize).join('|'),
                url: encodeURIComponent(location.href),
              },
              c = a.search,
              l = c && c.sz;
            l && (o.sz = l + '|' + o.sz);
            const d = k(r, e, c && c.cust_params),
              u = Object.assign({}, h.Mu, a.search, o, e.params, { cust_params: d }, (0, h.QS)());
            if (window.google?.ima) {
              const e = w.t6.getConsentData?.(),
                t = w.ad.getConsentData?.();
              if (!e && t) {
                const e = (function (e) {
                  if (!e) return;
                  const t = e.gppData?.parsedSections;
                  if (t) {
                    if (t.uspv1) {
                      const e = t.uspv1;
                      return `${e.Version}${e.Notice}${e.OptOutSale}${e.LspaCovered}`;
                    }
                    {
                      let e, r;
                      if (
                        (Object.values(t).forEach((t) => {
                          (Array.isArray(t) ? t : [t]).forEach((t) => {
                            const a = t.SaleOptOut,
                              n = t.SaleOptOutNotice;
                            void 0 === e && void 0 === r && null != a && null != n && ((e = a), (r = n));
                          });
                        }),
                        void 0 !== e && void 0 !== r)
                      ) {
                        const t = 0 === e ? '-' : 1 === e ? 'Y' : 'N',
                          a = 0 === r ? '-' : 1 === r ? 'Y' : 'N';
                        return `1${a}${t}${'-' === t && '-' === a ? '-' : 'Y'}`;
                      }
                    }
                  }
                  return;
                })(t);
                e && (u.us_privacy = e);
              }
            }
            const p = _(r, e, 'params');
            if ((p && (u.description_url = p), !u.ppid)) {
              const e = (0, i.Q)();
              null != e && (u.ppid = e);
            }
            const b = e.adUnit?.mediaTypes?.video;
            Object.entries({
              plcmt: () => b?.plcmt,
              min_ad_duration: () => ((0, g.Et)(b?.minduration) ? 1e3 * b.minduration : null),
              max_ad_duration: () => ((0, g.Et)(b?.maxduration) ? 1e3 * b.maxduration : null),
              vpos() {
                const e = b?.startdelay;
                if ((0, g.Et)(e)) return -2 === e ? 'postroll' : -1 === e || e > 0 ? 'midroll' : 'preroll';
              },
              vconp: () => (Array.isArray(b?.playbackmethod) && b.playbackmethod.some((e) => 7 === e) ? '2' : void 0),
              vpa() {
                if (Array.isArray(b?.playbackmethod)) {
                  const e = b.playbackmethod.some((e) => 3 === e),
                    t = b.playbackmethod.some((e) => [1, 2, 4, 5, 6].includes(e));
                  if (e && !t) return 'click';
                  if (t && !e) return 'auto';
                }
              },
              vpmute() {
                if (Array.isArray(b?.playbackmethod)) {
                  const e = b.playbackmethod.some((e) => [2, 6].includes(e)),
                    t = b.playbackmethod.some((e) => [1, 3, 4, 5].includes(e));
                  if (e && !t) return '1';
                  if (t && !e) return '0';
                }
              },
            }).forEach((e) => {
              let [t, r] = e;
              if (!u.hasOwnProperty(t)) {
                const e = r();
                null != e && (u[t] = e);
              }
            });
            const y = s.n.index.getBidRequest(e.bid || {})?.ortb2 ?? s.n.index.getAuction(e.bid || {})?.getFPD()?.global,
              v = (0, n.eu)(y);
            return (
              v.length && (u.ppsj = btoa(JSON.stringify({ PublisherProvidedTaxonomySignals: v }))),
              (0, f.buildUrl)(Object.assign({}, h.P8, a, { search: u }))
            );
          }
          function _(e, t, r) {
            return t?.[r]?.description_url || encodeURIComponent(S.ri().page);
          }
          function k(e, t, r) {
            const a = (e && e.adserverTargeting) || {};
            let n = {};
            const o = t && t.adUnit;
            if (o) {
              const e = m.iS.getAllTargeting(o.code);
              n = e ? e[o.code] : {};
            }
            const i = Object.assign({}, { hb_uuid: e && e.videoCacheKey }, { hb_cache_id: e && e.videoCacheKey }, n, a);
            d.Ic(l.qY.SET_TARGETING, { [o.code]: i });
            const s = t?.params?.cust_params,
              c = Object.assign({}, i, s);
            let u = encodeURIComponent((0, f.formatQS)(c));
            return (r && (u = r + '%26' + u), u);
          }
          async function E(e, t) {
            try {
              const r = (0, v.A)(),
                a = r.parse(e),
                n = a.querySelectorAll(C)[0];
              if (!n || !n.textContent) return e;
              const o = new RegExp('[A-Fa-f0-9]{8}-(?:[A-Fa-f0-9]{4}-){3}[A-Fa-f0-9]{12}', 'gi'),
                i = Array.from(n.textContent.matchAll(o))
                  .map((e) => {
                    let [t] = e;
                    return t;
                  })
                  .filter((e) => t.has(e));
              if (1 !== i.length) return ((0, f.logWarn)(`Unable to determine unique uuid in ${C}`), e);
              const s = i[0],
                c = t.get(s),
                l = await (async function (e) {
                  const t = await (0, y.hd)(e);
                  if (!t.ok) throw ((0, f.logError)('Unable to fetch blob'), new Error('Blob not found'));
                  const r = await t.text();
                  return `data://text/xml;base64,${btoa(r)}`;
                })(c),
                d = a.createCDATASection(l);
              return ((n.textContent = ''), n.appendChild(d), r.serialize(a));
            } catch (t) {
              return ((0, f.logWarn)('Unable to process xml', t), e);
            }
          }
          (c.$W.getConfig('brandCategoryTranslation.translationFile') &&
            (0, u.Yn)('registerAdserver').before(function (e) {
              e.call(this, 'dfp');
            }),
            (0, o.U)('gam', {
              buildVideoUrl: U,
              getVastXml: async function (e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : b.kh,
                  r = U(e);
                const a = e.adUnit,
                  n = a?.mediaTypes?.video,
                  o = (n?.api || []).join(','),
                  i = w.t6.getConsentData?.();
                if (c.$W.getConfig('cache.useLocal') && window.google?.ima) {
                  r = new URL(r);
                  const e = `h.${window.google.ima.VERSION}`;
                  (r.searchParams.set('omid_p', `Google1/${e}`),
                    r.searchParams.set('sdkv', e),
                    o && r.searchParams.set('sdk_apis', o),
                    i && r.searchParams.set('us_privacy', i),
                    (r = r.toString()));
                }
                const s = await (0, y.hd)(r);
                if (!s.ok) throw new Error('Unable to fetch GAM VAST wrapper');
                const l = await s.text();
                if (c.$W.getConfig('cache.useLocal')) {
                  return await E(l, t);
                }
                return l;
              },
            }),
            (0, a.E)('gamAdServerVideo'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 3005, 41, 7650], () => {
          return ((t = 242), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6047],
      {
        8374(e, n, o) {
          var t = o(1748),
            r = o(2201),
            a = o(1443),
            d = o(2592),
            s = o(466),
            p = o(6665),
            c = o(1933),
            i = o(736),
            g = o(1385);
          const l = 'hadronId',
            m = `[${l}System]`,
            u = 'auHadronId',
            h = (0, a.vM)({ moduleType: i.fW, moduleName: l });
          const I = c.$W.getConfig('debug') || !1,
            f = {
              name: l,
              gvlid: 561,
              decode: (e) => ({ hadronId: (0, p.O8)(e) ? e : e.hasOwnProperty('id') ? e.id[l] : e[l] }),
              getId(e) {
                ((0, s.logInfo)(m, 'getId is called', e), (0, p.Qd)(e.params) || (e.params = {}));
                let n = '';
                if (((n = h.getDataFromLocalStorage(u)), (0, p.O8)(n) && n.length > 0))
                  return ((0, s.logInfo)(m, `${u} found in localStorage = ${n}`), { id: n });
                const o = 0 | e.params.partnerId;
                return {
                  callback: function (t) {
                    let a = {};
                    const d = {
                      success: (e) => {
                        if (e) {
                          try {
                            a = JSON.parse(e);
                          } catch (e) {
                            ((0, s.logError)(e), t());
                          }
                          ((0, s.logInfo)(m, `Response from backend is ${e}`, a),
                            (0, p.Qd)(a) && a.hasOwnProperty(l) && (n = a[l]),
                            (a = n));
                        }
                        t(a);
                      },
                      error: (e) => {
                        ((0, s.logError)(`${l}: ID fetch encountered an error`, e), t());
                      },
                    };
                    let c = ((e, n) => e + (e.indexOf('?') > -1 ? '&' : '?') + n)(
                      ((i = e.params.url),
                      (u = 'https://id.hadron.ad.gt/api/v1/pbhid'),
                      (h = e.params.urlArg),
                      (0, p.fp)(i) ? i(h) : (0, p.O8)(i) ? i : u),
                      `partner_id=${o}&_it=prebid&t=1&src=id&domain=${document.location.hostname}`,
                    );
                    var i, u, h;
                    I && (c += '&debug=1');
                    const f = g.mW.getConsentData();
                    f &&
                      ((c += '' + (f.consentString ? '&gdprString=' + encodeURIComponent(f.consentString) : '')),
                      (c += '&gdpr=' + (!0 === f.gdprApplies ? 1 : 0)));
                    const S = g.t6.getConsentData();
                    S && (c += `&us_privacy=${encodeURIComponent(S)}`);
                    const b = g.ad.getConsentData();
                    (b &&
                      ((c += '' + (b.gppString ? '&gpp=' + encodeURIComponent(b.gppString) : '')),
                      (c += '' + (b.applicableSections ? '&gpp_sid=' + encodeURIComponent(b.applicableSections) : ''))),
                      (0, s.logInfo)(m, `${l} not found, calling home (${c})`),
                      (0, r.RD)(c, d, void 0, { method: 'GET' }));
                  },
                };
              },
              eids: { hadronId: { source: 'audigent.com', atype: 1 } },
            };
          ((0, d.bz)('userId', f), (0, t.E)('hadronIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((n = 8374), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6497],
      {
        4640(e, t, r) {
          var n = r(1748),
            i = r(466),
            o = r(8928),
            s = r(3435),
            a = r(6665),
            d = r(2201),
            c = r(2592),
            g = r(867),
            u = r(1443),
            p = r(736),
            l = r(3064),
            h = r(5049);
          const f = 'id5id',
            w = 'User ID - ID5 submodule: ',
            m = 'id5-sync.com',
            b = (0, u.vM)({ moduleType: p.fW, moduleName: 'id5Id' }),
            y = {
              id5id: {
                getValue: function (e) {
                  return e.uid;
                },
                source: m,
                atype: 1,
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              euid: {
                getValue: function (e) {
                  return e.uid;
                },
                getSource: function (e) {
                  return e.source;
                },
                atype: 3,
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
              trueLinkId: {
                getValue: function (e) {
                  return e.uid;
                },
                getSource: function () {
                  return 'true-link-id5-sync.com';
                },
                atype: 1,
                getUidExt: function (e) {
                  if (e.ext) return e.ext;
                },
              },
            },
            v = {
              name: 'id5Id',
              gvlid: 131,
              decode(e, t) {
                const r = C(e, t.params);
                return this._decodeResponse(r || e, t);
              },
              _decodeResponse(e, t) {
                if (e && void 0 !== e.ids) {
                  const r = {},
                    n = {};
                  return (
                    Object.entries(e.ids).forEach((e) => {
                      let [t, i] = e;
                      const o = i.eid,
                        s = o?.uids?.[0];
                      ((r[t] = { uid: s?.id, ext: s?.ext }),
                        (n[t] = function () {
                          return o;
                        }));
                    }),
                    (this.eids = n),
                    x(e, t),
                    r
                  );
                }
                let r,
                  n,
                  d = {};
                if (!e || 'string' != typeof e.universal_uid) return;
                ((r = e.universal_uid), (d = e.ext || d), (n = e.publisherTrueLinkId), (this.eids = y));
                const c = { id5id: { uid: r, ext: d } };
                ((0, a.Qd)(d.euid) && (c.euid = { uid: d.euid.uids[0].id, source: d.euid.source, ext: { provider: m } }),
                  n && (c.trueLinkId = { uid: n }));
                switch ((0, o.A)(e, 'ab_testing.result')) {
                  case 'control':
                    ((0, i.logInfo)(w + 'A/B Testing - user is in the Control Group: ID5 ID is NOT exposed'),
                      (0, s.J)(c, 'id5id.ext.abTestingControlGroup', !0));
                    break;
                  case 'error':
                    (0, i.logError)(w + 'A/B Testing ERROR! controlGroupPct must be a number >= 0 and <= 1');
                    break;
                  case 'normal':
                    ((0, i.logInfo)(w + 'A/B Testing - user is NOT in the Control Group'),
                      (0, s.J)(c, 'id5id.ext.abTestingControlGroup', !1));
                }
                return ((0, i.logInfo)(w + 'Decoded ID', c), x(e, t), c);
              },
              getId(e, t, r) {
                if (
                  !(function (e) {
                    if (!e || !e.params || !e.params.partner) return ((0, i.logError)(w + 'partner required to be defined'), !1);
                    const t = e.params.partner;
                    if ('string' == typeof t || t instanceof String) {
                      const r = parseInt(t);
                      if (isNaN(r) || r < 0)
                        return ((0, i.logError)(w + 'partner required to be a number or a String parsable to a positive integer'), !1);
                      e.params.partner = r;
                    } else if ('number' != typeof t)
                      return ((0, i.logError)(w + 'partner required to be a number or a String parsable to a positive integer'), !1);
                    if (!e.storage || !e.storage.type || !e.storage.name) return ((0, i.logError)(w + 'storage required to be set'), !1);
                    e.storage.name !== f && (0, i.logWarn)(w + `storage name recommended to be '${f}'.`);
                    return !0;
                  })(e)
                )
                  return;
                if (!D(t?.gdpr)) return void (0, i.logInfo)(w + 'Skipping ID5 local storage write because no consent given.');
                return {
                  callback: function (n) {
                    new I(e, t?.gdpr, r, t?.usp, t?.gpp)
                      .execute()
                      .then((t) => {
                        n(
                          (function (e, t, r) {
                            let n = {};
                            (0, a.Qd)(r) && (void 0 !== r.universal_uid || (0, a.Qd)(r.pbjs)) && Object.assign(n, (0, a.Go)(r));
                            (Object.assign(n, (0, a.Go)(e)), (n.signature = e.signature), (0, a.Qd)(n.pbjs) || (n.pbjs = {}));
                            return ((n.pbjs[t.partner] = (0, a.Go)(e)), n);
                          })(t, e.params, r),
                        );
                      })
                      .catch((e) => {
                        ((0, i.logError)(w + 'getId fetch encountered an error', e), n());
                      });
                  },
                };
              },
              extendId(e, t, r) {
                if (!D(t?.gdpr))
                  return ((0, i.logInfo)(w + 'No consent given for ID5 local storage writing, skipping nb increment.'), { id: r });
                if (C(r, e.params)) {
                  (0, i.logInfo)(w + 'using cached ID', r);
                  const t = (0, a.Go)(r),
                    n = C(t, e.params);
                  return ((n.nbPage = E(n)), { id: t });
                }
                return ((0, i.logInfo)(w + ' refreshing ID.  Cached object does not have ID for partner', r), this.getId(e, t, r));
              },
              primaryIds: ['id5id', 'trueLinkId'],
              eids: y,
              _reset() {
                this.eids = y;
              },
            };
          class I {
            constructor(e, t, r, n, i) {
              ((this.submoduleConfig = e),
                (this.gdprConsentData = t),
                (this.cacheIdObj = (0, a.Qd)(r?.pbjs) ? r.pbjs[e.params.partner] : r),
                (this.usPrivacyData = n),
                (this.gppData = i));
            }
            async execute() {
              const e = this.#e();
              if (!this.#t()) return this.#r(e);
              try {
                return await this.#n(e);
              } catch (t) {
                return (
                  (0, i.logError)(w + 'Error while performing ID5 external module flow. Continuing with regular flow.', t),
                  this.#r(e)
                );
              }
            }
            #t() {
              return 'string' == typeof this.submoduleConfig.params.externalModuleUrl;
            }
            async #n(e) {
              await (async function (e) {
                return new l.U9((t, r) => {
                  if (window.id5Prebid) t();
                  else
                    try {
                      (0, h.R)(e, p.fW, 'id5', t);
                    } catch (e) {
                      r(e);
                    }
                });
              })(this.submoduleConfig.params.externalModuleUrl);
              const t = await e;
              return this.#i().fetchId5Id(
                t,
                this.submoduleConfig.params,
                (0, g.EN)(),
                this.gdprConsentData,
                this.usPrivacyData,
                this.gppData,
              );
            }
            #i() {
              return window.id5Prebid && window.id5Prebid.integration;
            }
            async #r(e) {
              const t = await e,
                r = await this.#o(t.extensionsCall),
                n = await this.#s(t.fetchCall, r);
              return this.#a(n);
            }
            async #e() {
              const e = this.submoduleConfig.params.configUrl || 'https://id5-sync.com/api/config/prebid',
                t = await (0, d.hd)(e, {
                  method: 'POST',
                  body: JSON.stringify({ ...this.submoduleConfig, bounce: !0 }),
                  credentials: 'include',
                });
              if (!t.ok) throw new Error('Error while calling config endpoint: ', t);
              const r = await t.json();
              return ((0, i.logInfo)(w + 'config response received from the server', r), r);
            }
            async #o(e) {
              if (void 0 === e) return;
              const t = e.url,
                r = e.method || 'GET',
                n = 'GET' === r ? void 0 : JSON.stringify(e.body || {}),
                o = await (0, d.hd)(t, { method: r, body: n });
              if (!o.ok) throw new Error('Error while calling extensions endpoint: ', o);
              const s = await o.json();
              return ((0, i.logInfo)(w + 'extensions response received from the server', s), s);
            }
            async #s(e, t) {
              const r = e.url,
                n = e.overrides || {},
                o = JSON.stringify({ ...this.#d(), ...n, extensions: t }),
                s = await (0, d.hd)(r, { method: 'POST', body: o, credentials: 'include' });
              if (!s.ok) throw new Error('Error while calling fetch endpoint: ', s);
              const a = await s.json();
              return ((0, i.logInfo)(w + 'fetch response received from the server', a), a);
            }
            #d() {
              const e = this.submoduleConfig.params,
                t =
                  this.gdprConsentData && 'boolean' == typeof this.gdprConsentData.gdprApplies && this.gdprConsentData.gdprApplies ? 1 : 0,
                r = (0, g.EN)(),
                n = this.cacheIdObj ? this.cacheIdObj.signature : void 0,
                o = E(this.cacheIdObj),
                s = window.id5Bootstrap ? window.id5Bootstrap.getTrueLinkInfo() : { booted: !1 },
                a = {
                  partner: e.partner,
                  gdpr: t,
                  nbPage: o,
                  o: 'pbjs',
                  tml: r.topmostLocation,
                  ref: r.ref,
                  cu: r.canonicalUrl,
                  top: r.reachedTop ? 1 : 0,
                  u: r.stack[0] || window.location.href,
                  v: '10.29.0',
                  storage: this.submoduleConfig.storage,
                  localStorage: b.localStorageIsEnabled() ? 1 : 0,
                  true_link: s,
                };
              (!t ||
                void 0 === this.gdprConsentData.consentString ||
                (0, i.isEmpty)(this.gdprConsentData.consentString) ||
                (0, i.isEmptyStr)(this.gdprConsentData.consentString) ||
                (a.gdpr_consent = this.gdprConsentData.consentString),
                void 0 === this.usPrivacyData ||
                  (0, i.isEmpty)(this.usPrivacyData) ||
                  (0, i.isEmptyStr)(this.usPrivacyData) ||
                  (a.us_privacy = this.usPrivacyData),
                this.gppData && ((a.gpp_string = this.gppData.gppString), (a.gpp_sid = this.gppData.applicableSections)),
                void 0 === n || (0, i.isEmptyStr)(n) || (a.s = n),
                void 0 === e.pd || (0, i.isEmptyStr)(e.pd) || (a.pd = e.pd),
                void 0 === e.provider || (0, i.isEmptyStr)(e.provider) || (a.provider = e.provider));
              const d = e.abTesting || { enabled: !1 };
              return (d.enabled && (a.ab_testing = { enabled: !0, control_group_pct: d.controlGroupPct }), a);
            }
            #a(e) {
              try {
                e.privacy && window.id5Bootstrap && window.id5Bootstrap.setPrivacy && window.id5Bootstrap.setPrivacy(e.privacy);
              } catch (e) {
                (0, i.logError)(w + 'Error while writing privacy info into local storage.', e);
              }
              return e;
            }
          }
          function E(e) {
            return e && void 0 !== e.nbPage ? e.nbPage + 1 : 1;
          }
          function x(e, t) {
            const r = e.tags;
            r &&
              (t.params.gamTargetingPrefix &&
                ((window.googletag = window.googletag || { cmd: [] }),
                (window.googletag.cmd = window.googletag.cmd || []),
                window.googletag.cmd.push(() => {
                  for (const e in r) window.googletag.setConfig({ targeting: { [t.params.gamTargetingPrefix + '_' + e]: r[e] } });
                })),
              t.params.exposeTargeting &&
                !(0, i.deepEqual)(window.id5tags?.tags, r) &&
                ((window.id5tags = window.id5tags || { cmd: [] }),
                (window.id5tags.cmd = window.id5tags.cmd || []),
                window.id5tags.cmd.forEach((e) => {
                  setTimeout(() => e(r), 0);
                }),
                (window.id5tags.cmd.push = function (e) {
                  (e(r), Array.prototype.push.call(window.id5tags.cmd, e));
                }),
                (window.id5tags.tags = r)));
          }
          function D(e) {
            const t = e && 'boolean' == typeof e.gdprApplies && e.gdprApplies,
              r = (0, o.A)(e, 'vendorData.purpose.consents.1'),
              n = (0, o.A)(e, `vendorData.vendor.consents.${(131).toString()}`);
            return !(t && (!r || !n));
          }
          function C(e, t) {
            if (e?.pbjs && (0, a.Qd)(e.pbjs)) return e.pbjs[t.partner];
          }
          ((0, c.bz)('userId', v), (0, n.E)('id5IdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((t = 4640), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5153],
      {
        240(e, t, n) {
          var i = n(1748),
            o = n(466),
            r = n(2201),
            s = n(2592),
            p = n(1443),
            l = n(736);
          const d = 'identityLink',
            a = (0, p.vM)({ moduleType: l.fW, moduleName: d }),
            c = '_lr_env',
            g = {
              name: d,
              gvlid: 97,
              decode: (e) => ({ idl_env: e }),
              getId(e, t) {
                const n = (e && e.params) || {};
                if (!n || 'string' != typeof n.pid) return void o.logError('identityLink: requires partner id to be defined');
                const { gdpr: i, gpp: r } = t ?? {},
                  s = i && 'boolean' == typeof i.gdprApplies && i.gdprApplies ? 1 : 0,
                  p = s ? i.consentString : '';
                if (s && (!p || '' === p)) return void o.logInfo('identityLink: Consent string is required to call envelope API.');
                const l = !(!r || !r.gppString) && r.gppString,
                  d = !!(r && r.gppString && r.applicableSections.length > 0 && -1 !== r.applicableSections[0]) && r.applicableSections[0],
                  g = l && d,
                  f = `https://api.rlcdn.com/api/identity/envelope?pid=${n.pid}${s ? '&ct=4&cv=' + p : ''}${g ? '&gpp=' + l + '&gpp_sid=' + d : ''}`;
                let y;
                return (
                  (y = function (e) {
                    if (window.ats && window.ats.retrieveEnvelope)
                      (o.logInfo('identityLink: ATS exists!'),
                        window.ats.retrieveEnvelope(function (t) {
                          t
                            ? (o.logInfo('identityLink: An envelope can be retrieved from ATS!'), u(!0), e(JSON.parse(t).envelope))
                            : v(f, e, n);
                        }));
                    else {
                      const t = (function () {
                        const e = a.getCookie(c) || a.getDataFromLocalStorage(c);
                        if (!e) return;
                        try {
                          return window.atob(e);
                        } catch (t) {
                          try {
                            return window.atob(e.replace(/-/g, '+').replace(/_/g, '/'));
                          } catch (e) {
                            return void o.logError('identityLink: invalid envelope format');
                          }
                        }
                      })();
                      t
                        ? (o.logInfo('identityLink: LiveRamp envelope successfully retrieved from storage!'), e(JSON.parse(t).envelope))
                        : v(f, e, n);
                    }
                  }),
                  { callback: y }
                );
              },
              eids: { idl_env: { source: 'liveramp.com', atype: 3 } },
            };
          function v(e, t, n) {
            const i = {
              success: (e) => {
                let n;
                if (e)
                  try {
                    n = JSON.parse(e);
                  } catch (e) {
                    o.logInfo(e);
                  }
                t(n && n.envelope ? n.envelope : '');
              },
              error: (e) => {
                (o.logInfo('identityLink: identityLink: ID fetch encountered an error', e), t());
              },
            };
            n.notUse3P || a.getCookie('_lr_retry_request')
              ? t()
              : (!(function () {
                  const e = new Date();
                  (e.setTime(e.getTime() + 36e5), a.setCookie('_lr_retry_request', 'true', e.toUTCString()));
                })(),
                o.logInfo('identityLink: A 3P retrieval is attempted!'),
                u(!1),
                (0, r.RD)(e, i, void 0, { method: 'GET', withCredentials: !0 }));
          }
          function u(e) {
            const t = new Date();
            (t.setTime(t.getTime() + 2592e6), a.setCookie('_lr_env_src_ats', e, t.toUTCString()));
          }
          ((0, s.bz)('userId', g), (0, i.E)('identityLinkIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((t = 240), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3170],
      {
        73(e, t, i) {
          var r = i(1748),
            n = i(466),
            o = i(8928),
            a = i(3435),
            s = i(6665),
            d = i(9794),
            p = i(1933),
            c = i(1443),
            l = i(3556),
            u = i(6220),
            f = i(7464),
            m = i(2819);
          const g = {};
          function x(e) {
            if (g[e]) return g[e];
            const t = document.getElementById(e) ? e : (0, m.p)(e).divId;
            return ((g[e] = t), t);
          }
          const b = 'ix',
            h = [d.D4, d.G_, d.s6],
            y = [144, 144],
            v = { JPY: 1 },
            I = 'p',
            A = 'x',
            w = {
              SITE: [
                'id',
                'name',
                'domain',
                'cat',
                'sectioncat',
                'pagecat',
                'page',
                'ref',
                'search',
                'mobile',
                'privacypolicy',
                'publisher',
                'content',
                'keywords',
                'ext',
              ],
              USER: ['id', 'buyeruid', 'yob', 'gender', 'keywords', 'customdata', 'geo', 'data', 'ext'],
            },
            C = {
              'liveramp.com': 'idl',
              'netid.de': 'NETID',
              'neustar.biz': 'fabrickId',
              'zeotap.com': 'zeotapIdPlus',
              'uidapi.com': 'UID2',
              'adserver.org': 'TDID',
            },
            O = ['mimes', 'minduration', 'maxduration'],
            U = [
              'mimes',
              'minduration',
              'maxduration',
              'protocols',
              'protocol',
              'startdelay',
              'placement',
              'linearity',
              'skip',
              'skipmin',
              'skipafter',
              'sequence',
              'battr',
              'maxextended',
              'minbitrate',
              'maxbitrate',
              'boxingallowed',
              'playbackmethod',
              'playbackend',
              'delivery',
              'pos',
              'companionad',
              'api',
              'companiontype',
              'ext',
              'playerSize',
              'w',
              'h',
              'plcmt',
            ],
            S = `${b}_features`,
            E = (0, c.vM)({ bidderCode: b }),
            T = {
              REQUESTED_FEATURE_TOGGLES: [],
              featureToggles: {},
              isFeatureEnabled: function (e) {
                return (0, o.A)(this.featureToggles, `features.${e}.activated`, !1);
              },
              getFeatureToggles: function () {
                if (E.localStorageIsEnabled()) {
                  const e = (0, n.safeJSONParse)(E.getDataFromLocalStorage(S));
                  (0, o.A)(e, 'expiry') && e.expiry >= new Date().getTime() ? (this.featureToggles = e) : this.clearFeatureToggles();
                }
              },
              setFeatureToggles: function (e) {
                const t = e.body,
                  i = new Date(),
                  r = (0, o.A)(t, 'ext.features');
                r &&
                  ((this.featureToggles = { expiry: i.setHours(i.getHours() + 1), features: r }),
                  E.localStorageIsEnabled() && E.setDataInLocalStorage(S, JSON.stringify(this.featureToggles)));
              },
              clearFeatureToggles: function () {
                ((this.featureToggles = {}), E.localStorageIsEnabled() && E.removeDataFromLocalStorage(S));
              },
            };
          let D = 0,
            P = '',
            _ = '',
            J = !1;
          const k = 2;
          function F(e) {
            const t = j(e, d.G_),
              i = (0, o.A)(e, 'mediaTypes.video'),
              r = (0, o.A)(e, 'params.video');
            if (W(i, r).length) return {};
            t.video = r ? (0, s.Go)(e.params.video) : {};
            const p = (0, o.A)(e, 'ortb2Imp.ext.tid');
            (p && (0, a.J)(t, 'ext.tid', p),
              (function (e, t) {
                if ((0, o.A)(t, 'mediaTypes.video.context') === u.H6) {
                  let i = (0, o.A)(t, 'mediaTypes.video.renderer');
                  if ((i || (i = (0, o.A)(t, 'renderer')), (0, o.A)(t, 'ortb2.source.ext.schain', !1))) e.displaymanager = 'pbjs_wrapper';
                  else if (i && 'object' == typeof i) {
                    if (void 0 !== i.url) {
                      let t = '';
                      try {
                        t = new URL(i.url).hostname;
                      } catch {
                        return;
                      }
                      t.includes('js-sec.indexww') ? (e.displaymanager = 'ix') : (e.displaymanager = i.url);
                    }
                  } else e.displaymanager = 'ix';
                }
              })(t, e),
              M(t, e));
            for (const e in i) -1 === U.indexOf(e) || t.video.hasOwnProperty(e) || (t.video[e] = i[e]);
            if (t.video.minduration > t.video.maxduration)
              return (
                (0, n.logError)(
                  `IX Bid Adapter: video minduration [${t.video.minduration}] cannot be greater than video maxduration [${t.video.maxduration}]`,
                ),
                {}
              );
            const c = (r && r.context) || (i && i.context);
            if (
              ((function (e) {
                e.video.hasOwnProperty('plcmt') &&
                  (!(0, s.Fq)(e.video.plcmt) || e.video.plcmt < 1 || e.video.plcmt > 4) &&
                  ((0, n.logWarn)(`IX Bid Adapter: video.plcmt [${e.video.plcmt}] must be an integer between 1-4 inclusive`),
                  delete e.video.plcmt);
              })(t),
              c &&
                !t.video.hasOwnProperty('placement') &&
                (c === u.mn
                  ? (t.video.placement = 1)
                  : c === u.H6
                    ? (0, o.A)(r, 'playerConfig.floatOnScroll')
                      ? (t.video.placement = 5)
                      : ((t.video.placement = 3), (J = !0))
                    : (0, n.logWarn)(`IX Bid Adapter: Video context '${c}' is not supported`)),
              !t.video.w || !t.video.h)
            ) {
              const i = X((0, o.A)(t, 'video.playerSize')) || X((0, o.A)(e, 'params.size'));
              if (!i) return ((0, n.logWarn)('IX Bid Adapter: Video size is missing in [mediaTypes.video]'), {});
              ((t.video.w = i[0]), (t.video.h = i[1]));
            }
            return (z(e, t, d.G_), t);
          }
          function j(e, t) {
            const i = {};
            if (
              ((i.id = e.bidId),
              ne() && (0, o.A)(e, 'params.externalId') && (0, a.J)(i, 'ext.externalID', e.params.externalId),
              (0, o.A)(e, `params.${t}.siteId`) && !isNaN(Number(e.params[t].siteId)))
            )
              switch (t) {
                case d.D4:
                  (0, a.J)(i, 'ext.siteID', e.params.banner.siteId.toString());
                  break;
                case d.G_:
                  (0, a.J)(i, 'ext.siteID', e.params.video.siteId.toString());
                  break;
                case d.s6:
                  (0, a.J)(i, 'ext.siteID', e.params.native.siteId.toString());
              }
            else e.params.siteId && (0, a.J)(i, 'ext.siteID', e.params.siteId.toString());
            return (
              !e.params.hasOwnProperty('id') ||
                ('string' != typeof e.params.id && 'number' != typeof e.params.id) ||
                (0, a.J)(i, 'ext.sid', String(e.params.id)),
              i
            );
          }
          function z(e, t, i) {
            let r = null,
              o = null;
            if (
              (e.params.bidFloor && e.params.bidFloorCur && (r = { floor: e.params.bidFloor, currency: e.params.bidFloorCur }),
              (0, s.fp)(e.getFloor))
            ) {
              let r = '*',
                a = '*';
              if (i && (0, n.contains)(h, i)) {
                const { w: e, h: n } = t[i];
                ((r = i), (a = [e, n]));
              }
              try {
                o = e.getFloor({ mediaType: r, size: a });
              } catch (e) {
                (0, n.logWarn)('priceFloors module call getFloor failed, error : ', e);
              }
            }
            let p = !1;
            (o
              ? ((t.bidfloor = o.floor), (t.bidfloorcur = o.currency), (0, a.J)(t, 'ext.fl', I), (p = !0))
              : r && ((t.bidfloor = r.floor), (t.bidfloorcur = r.currency), (0, a.J)(t, 'ext.fl', A), (p = !0)),
              p &&
                (i === d.D4
                  ? ((0, a.J)(t, 'banner.ext.bidfloor', t.bidfloor), (0, a.J)(t, 'banner.ext.fl', t.ext.fl))
                  : i === d.G_
                    ? ((0, a.J)(t, 'video.ext.bidfloor', t.bidfloor), (0, a.J)(t, 'video.ext.fl', t.ext.fl))
                    : ((0, a.J)(t, 'native.ext.bidfloor', t.bidfloor), (0, a.J)(t, 'native.ext.fl', t.ext.fl))));
          }
          function B(e, t, i) {
            const r = {},
              a = !(!(0, o.A)(e, 'exp') || !(0, s.Fq)(e.exp)),
              p = (0, o.A)(e, 'dealid') || (0, o.A)(e, 'ext.dealid');
            (v.hasOwnProperty(t) ? (r.cpm = e.price / v[t]) : (r.cpm = e.price / 100),
              (r.requestId = e.impid),
              p && (r.dealId = p),
              (r.netRevenue = true),
              (r.currency = t),
              (r.creativeId = e.hasOwnProperty('crid') ? e.crid : '-'),
              Number(e.mtype) !== k || ((!e.ext || e.ext.vasturl) && e.ext)
                ? e.ext && e.ext.vasturl && (r.vastUrl = e.ext.vasturl)
                : (r.vastXml = e.adm));
            let c = null;
            if ('string' == typeof e.adm && '{' === e.adm[0] && '}' === e.adm[e.adm.length - 1])
              try {
                c = JSON.parse(e.adm);
              } catch (e) {
                (0, n.logWarn)('adm looks like JSON but failed to parse: ', e);
              }
            return (
              (e.ext && e.ext.vasturl) || Number(e.mtype) === k
                ? ((r.width = i.video.w),
                  (r.height = i.video.h),
                  (r.mediaType = d.G_),
                  (r.mediaTypes = i.mediaTypes),
                  (r.ttl = a ? e.exp : 3600))
                : c && c.native
                  ? ((r.native = { ortb: c.native }),
                    (r.width = e.w ? e.w : 1),
                    (r.height = e.h ? e.h : 1),
                    (r.mediaType = d.s6),
                    (r.ttl = a ? e.exp : 3600))
                  : ((r.ad = e.adm), (r.width = e.w), (r.height = e.h), (r.mediaType = d.D4), (r.ttl = a ? e.exp : 300)),
              (r.meta = {}),
              (r.meta.networkId = (0, o.A)(e, 'ext.dspid')),
              (r.meta.brandId = (0, o.A)(e, 'ext.advbrandid')),
              (r.meta.brandName = (0, o.A)(e, 'ext.advbrand')),
              e.adomain && e.adomain.length > 0 && (r.meta.advertiserDomains = e.adomain),
              e.ext?.dsa && (r.meta.dsa = e.ext.dsa),
              e.ext?.ibv && ((r.ext = r.ext || {}), (r.ext.ibv = e.ext.ibv)),
              r
            );
          }
          function R(e) {
            return Array.isArray(e) && 2 === e.length && (0, s.Fq)(e[0]) && (0, s.Fq)(e[1]);
          }
          function $() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if (R(e)) return e[0] === t[0] && e[1] === t[1];
            for (let i = 0; i < e.length; i++) if (e[i][0] === t[0] && e[i][1] === t[1]) return !0;
            return !1;
          }
          function W(e, t) {
            const i = [];
            e || (0, n.logWarn)('IX Bid Adapter: mediaTypes.video is the preferred location for video params in ad unit');
            for (const r of O) {
              const n = e && e.hasOwnProperty(r),
                o = t && t.hasOwnProperty(r);
              n || o || i.push(`IX Bid Adapter: ${r} is not included in either the adunit or params level`);
            }
            const r = e && e.hasOwnProperty('protocol'),
              o = e && e.hasOwnProperty('protocols'),
              a = t && t.hasOwnProperty('protocol'),
              s = t && t.hasOwnProperty('protocols');
            return (
              r || o || a || s || i.push('IX Bid Adapter: protocol/protcols is not included in either the adunit or params level'),
              i
            );
          }
          function X() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return R(e) ? e : !!R(e[0]) && e[0];
          }
          function q(e, t, i) {
            if (!e) return;
            return { ...i.find((t) => t.bidId === e), ...t.find((t) => t.id === e) };
          }
          function G(e, t, i, r) {
            const d = 'https://htlb.casalemedia.com/openrtb/pbjs',
              c = (function (e) {
                const t = [],
                  i = {};
                if ((0, s.cy)(e))
                  for (const r of e) {
                    const e = C.hasOwnProperty(r.source);
                    if (
                      (0, o.A)(r, 'uids.0') &&
                      ((i[r.source] = !0),
                      e && '' !== C[r.source] && (r.uids[0].ext = { rtiPartner: C[r.source] }),
                      t.push(r),
                      t.length >= 50)
                    )
                      break;
                  }
                return { toSend: t, seenSources: i };
              })((0, o.A)(e, '0.userIdAsEids')),
              l = c.toSend;
            window.headertag &&
              'function' == typeof window.headertag.getIdentityInfo &&
              (function (e, t) {
                const i = window.headertag.getIdentityInfo();
                if (i && 'object' == typeof i)
                  for (const r in i) {
                    if (e.length >= 50) return;
                    if (i.hasOwnProperty(r)) {
                      const n = i[r];
                      !n.responsePending &&
                        n.data &&
                        'object' == typeof n.data &&
                        Object.keys(n.data).length &&
                        !t.seenSources[n.data.source] &&
                        e.push(n.data);
                    }
                  }
              })(l, c);
            const u = [];
            let f = (function (e) {
              const t = {};
              return (
                (t.id = e[0].bidderRequestId.toString()),
                (t.site = {}),
                (t.ext = {}),
                (t.ext.source = 'prebid'),
                (t.ext.ixdiag = {}),
                (t.ext.ixdiag.ls = E.localStorageIsEnabled()),
                (t.imp = []),
                (t.at = 1),
                t
              );
            })(e);
            f = (function (e, t) {
              t.length > 0 &&
                ((e.ext.features = {}),
                t.forEach((t) => {
                  e.ext.features[t] = { activated: T.isFeatureEnabled(t) };
                }));
              return e;
            })(f, T.REQUESTED_FEATURE_TOGGLES);
            const m = (function (e, t) {
              var i = e.map((e) => e.adUnitCode).filter((e, t, i) => i.indexOf(e) === t);
              const r = (0, o.A)(e, '0.userIdAsEids', []),
                n = {
                  mfu: 0,
                  bu: 0,
                  iu: 0,
                  nu: 0,
                  ou: 0,
                  allu: 0,
                  ren: !1,
                  version: '10.29.0',
                  url: window.location.href.split('?')[0],
                  vpd: J,
                  ae: t,
                  eidLength: r.length,
                };
              for (const t of i) {
                const i = e.filter((e) => e.adUnitCode === t)[0];
                (0, o.A)(i, 'mediaTypes') &&
                  (Object.keys(i.mediaTypes).length > 1 && n.mfu++,
                  (0, o.A)(i, 'mediaTypes.native') && n.nu++,
                  (0, o.A)(i, 'mediaTypes.banner') && n.bu++,
                  'outstream' === (0, o.A)(i, 'mediaTypes.video.context') && (n.ou++, re(i) && (n.ren = !0)),
                  'instream' === (0, o.A)(i, 'mediaTypes.video.context') && n.iu++,
                  n.allu++);
              }
              return n;
            })(e, (0, o.A)(t, 'paapi.enabled'));
            for (const e in m) f.ext.ixdiag[e] = m[e];
            ((f = (function (e, t, i, r, n) {
              const a = (0, o.A)(t, 'timeout');
              a && (e.ext.ixdiag.tmax = a);
              p.$W.getConfig('userSync') && (e.ext.ixdiag.syncsPerBidder = p.$W.getConfig('userSync').syncsPerBidder);
              ((e.ext.ixdiag.imps = Object.keys(i).length), (e.source = { tid: t?.ortb2?.source?.tid }));
              const s = r[0]?.ortb2?.source?.ext?.schain;
              s && ((e.source = e.source || {}), (e.source.ext = e.source.ext || {}), (e.source.ext.schain = s));
              n.length > 0 && ((e.user = {}), (e.user.eids = n));
              document.referrer && '' !== document.referrer && (e.site.ref = document.referrer);
              return e;
            })(f, t, i, e, l)),
              (f = (function (e, t) {
                if (t) {
                  (t.gdprConsent &&
                    ((P = t.gdprConsent),
                    P.hasOwnProperty('gdprApplies') && (e.regs = { ext: { gdpr: P.gdprApplies ? 1 : 0 } }),
                    P.hasOwnProperty('consentString') &&
                      ((e.user = e.user || {}),
                      (e.user.ext = { consent: P.consentString || '' }),
                      P.hasOwnProperty('addtlConsent') &&
                        P.addtlConsent &&
                        (e.user.ext.consented_providers_settings = { addtl_consent: P.addtlConsent }))),
                    t.uspConsent && ((0, a.J)(e, 'regs.ext.us_privacy', t.uspConsent), (_ = t.uspConsent)));
                  const i = (0, o.A)(t, 'refererInfo.page');
                  (i && (e.site.page = i),
                    t.gppConsent &&
                      ((0, a.J)(e, 'regs.gpp', t.gppConsent.gppString), (0, a.J)(e, 'regs.gpp_sid', t.gppConsent.applicableSections)));
                }
                p.$W.getConfig('coppa') && (0, a.J)(e, 'regs.coppa', 1);
                return e;
              })(f, t)));
            const g = {};
            e[0].params.siteId && ((D = e[0].params.siteId), (g.s = D));
            const x = Object.keys(i);
            let b = !1;
            for (let r = 0; r < x.length && !(u.length >= 4); r++) {
              f = N(i, x, f, r);
              const a = (0, o.A)(t, 'ortb2') || {},
                c = { ...(a.site || a.context) };
              c.page = L(t);
              const l = { ...a.user };
              ((0, n.isEmpty)(a) ||
                b ||
                ((f = H(t, f, a, c, l)), (f.site = (0, n.mergeDeep)({}, f.site, c)), (f.user = (0, n.mergeDeep)({}, f.user, l)), (b = !0)),
                (f = Q(i, f, x, r, g, d)));
              const m = r === x.length - 1;
              if (((f = ce(f)), (f = se(f)), (f = de(f)), m)) {
                let t = `${d}?`;
                (0 !== D && (t += `s=${D}`),
                  ne() && ((t += 0 !== D ? '&' : ''), (t += `p=${p.$W.getConfig('exchangeId')}`)),
                  u.push({
                    method: 'POST',
                    url: t,
                    data: (0, s.Go)(f),
                    options: { contentType: 'text/plain', withCredentials: !0 },
                    validBidRequests: e,
                  }),
                  (f.imp = []),
                  (b = !1));
              }
            }
            return u;
          }
          function N(e, t, i, r) {
            const n = e[t[r]],
              { missingImps: p = [], ixImps: c = [] } = n,
              l = { ixImps: c, missingBannerImpressions: p },
              u = Object.keys(l)
                .map((e) => l[e])
                .filter((e) => Array.isArray(e))
                .reduce((e, t) => e.concat(...t), []),
              f = e[t[r]].gpid,
              m = e[t[r]].dfp_ad_unit_code,
              g = e[t[r]].tid,
              x = e[t[r]].sid,
              b = e[t[r]].ae,
              h = e[t[r]].paapi,
              y = u.filter((e) => d.D4 in e),
              v = u.filter((e) => !(d.D4 in e));
            if (y.length > 0) {
              const n = y.reduce((e, t) => (e[t.adunitCode] || (e[t.adunitCode] = []), e[t.adunitCode].push(t), e), {});
              for (const d in n) {
                const p = n[d],
                  {
                    id: c,
                    banner: { topframe: l },
                  } = p[0],
                  u = (0, o.A)(p[0], 'ext.externalID'),
                  y = {
                    id: c,
                    banner: {
                      topframe: l,
                      format: p.map((e) => {
                        let {
                          banner: { w: t, h: i },
                          ext: r,
                        } = e;
                        return { w: t, h: i, ext: r };
                      }),
                    },
                  };
                for (let e = 0; e < y.banner.format.length; e++) {
                  (null != y.banner.format[e].ext &&
                    (null != y.banner.format[e].ext.sid && delete y.banner.format[e].ext.sid,
                    null != y.banner.format[e].ext.externalID && delete y.banner.format[e].ext.externalID),
                    'bidfloor' in p[e] && (y.banner.format[e].ext.bidfloor = p[e].bidfloor));
                  const t = y.banner.format[e].ext;
                  t && 0 === Object.keys(t).length && delete y.banner.format[e].ext;
                }
                const v = e[t[r]].pos;
                ((0, s.Fq)(v) && (y.banner.pos = v),
                  (m || f || g || x || b || u || h) &&
                    ((y.ext = {}),
                    (y.ext.dfp_ad_unit_code = m),
                    (y.ext.gpid = f),
                    (y.ext.tid = g),
                    (y.ext.sid = x),
                    (y.ext.externalID = u),
                    1 === Number(b) && ((y.ext.ae = 1), (y.ext.paapi = h))),
                  'bidfloor' in p[0] && (y.bidfloor = p[0].bidfloor),
                  'bidfloorcur' in p[0] && (y.bidfloorcur = p[0].bidfloorcur));
                const I = e[t[r]].adUnitFPD;
                (I && (0, a.J)(y, 'ext.data', I), i.imp.push(y));
              }
            }
            return (
              v.length > 0 &&
                v.forEach((e) => {
                  if ((f && (0, a.J)(e, 'ext.gpid', f), i.imp.length > 0)) {
                    let t = !1;
                    (i.imp.forEach((r, n) => {
                      e.id === r.id && d.G_ in e
                        ? ((r.video = e.video),
                          (r.video.ext = Object.assign({}, e.video.ext, e.ext)),
                          (0, o.A)(r, 'video.ext.bidfloor', !1) &&
                            (0, o.A)(r, 'bidfloor', !1) &&
                            r.video.ext.bidfloor < r.bidfloor &&
                            (r.bidfloor = r.video.ext.bidfloor),
                          !(0, o.A)(r, 'ext.siteID', !1) &&
                            (0, o.A)(e, 'video.ext.siteID') &&
                            ((0, a.J)(r, 'ext.siteID', e.video.ext.siteID), (0, a.J)(i, 'ext.ixdiag.usid', !0)),
                          (t = !0))
                        : e.id === r.id &&
                          d.s6 in e &&
                          ((r.native = e.native),
                          (r.native.ext = Object.assign({}, e.native.ext, e.ext)),
                          (0, o.A)(r, 'native.ext.bidfloor', !1) &&
                            (0, o.A)(r, 'bidfloor', !1) &&
                            r.native.ext.bidfloor < r.bidfloor &&
                            (r.bidfloor = r.native.ext.bidfloor),
                          !(0, o.A)(r, 'ext.siteID', !1) &&
                            (0, o.A)(e, 'native.ext.siteID', !1) &&
                            ((0, a.J)(r, 'ext.siteID', e.native.ext.siteID), (0, a.J)(i, 'ext.ixdiag.usid', !0)),
                          (t = !0));
                    }),
                      t || i.imp.push(e));
                  } else i.imp.push(e);
                }),
              i
            );
          }
          function L(e) {
            const t = (e && e.bidderCode) || 'ix',
              i = p.$W.getConfig(t);
            let r = '';
            if (
              ((r = (0, o.A)(e, 'ortb2.site.page') ? e.ortb2.site.page : (0, o.A)(e, 'refererInfo.page')),
              i && 'object' == typeof i.firstPartyData)
            ) {
              return (function (e, t, i) {
                let r;
                try {
                  r = new URL(t);
                } catch (i) {
                  ((0, n.logWarn)(`IX Bid Adapter: Invalid URL set in ortb2.site.page: ${t}. Using referer URL instead.`),
                    (r = new URL((0, o.A)(e, 'refererInfo.page'))));
                }
                const a = new URLSearchParams(r.search);
                for (const [e, t] of Object.entries(i)) a.has(e) || a.append(e, t);
                return ((r.search = a.toString()), r.toString());
              })(e, r, i.firstPartyData);
            }
            return r;
          }
          function H(e, t, i, r, o) {
            if (
              ((t.ext.ixdiag.fpd = !0),
              Object.keys(r).forEach((e) => {
                -1 === w.SITE.indexOf(e) && delete r[e];
              }),
              Object.keys(o).forEach((e) => {
                -1 === w.USER.indexOf(e) && delete o[e];
              }),
              i.device)
            ) {
              const e = { ...i.device.sua };
              (0, n.isEmpty)(e) || (0, a.J)(t, 'device.sua', e);
              const r = i.device.ip;
              r && (0, a.J)(t, 'device.ip', r);
              const o = i.device.ipv6;
              o && (0, a.J)(t, 'device.ipv6', o);
              const s = i.device.geo;
              s && (0, a.J)(t, 'device.geo', s);
            }
            if (
              i.hasOwnProperty('regs') &&
              !e.gppConsent &&
              (i.regs.hasOwnProperty('gpp') && 'string' == typeof i.regs.gpp && (0, a.J)(t, 'regs.gpp', i.regs.gpp),
              i.regs.hasOwnProperty('gpp_sid') && Array.isArray(i.regs.gpp_sid) && (0, a.J)(t, 'regs.gpp_sid', i.regs.gpp_sid),
              i.regs.ext?.dsa)
            ) {
              const e = i.regs.ext.dsa,
                r = {};
              if (
                (['dsarequired', 'pubrender', 'datatopub'].forEach((t) => {
                  (0, s.Et)(e[t]) && (r[t] = e[t]);
                }),
                (0, s.cy)(e.transparency))
              ) {
                const t = [];
                (e.transparency.forEach((e) => {
                  (0, s.Qd)(e) &&
                    (0, s.O8)(e.domain) &&
                    '' !== e.domain &&
                    (0, s.cy)(e.dsaparams) &&
                    e.dsaparams.every((e) => (0, s.Et)(e)) &&
                    t.push(e);
                }),
                  t.length > 0 && (r.transparency = t));
              }
              (0, n.isEmpty)(r) || (0, a.J)(t, 'regs.ext.dsa', r);
            }
            return t;
          }
          function M(e, t) {
            const i = (0, o.A)(t, 'ortb2Imp.ext.data');
            i && (0, a.J)(e, 'ext.data', i);
          }
          function Q(e, t, i, r, n, o) {
            const a = e[i[r]].tagId,
              s = e[i[r]].adUnitCode,
              d = e[i[r]].divId;
            return ((a || s || d) && ((t.ext.ixdiag.tagid = a), (t.ext.ixdiag.adunitcode = s), (t.ext.ixdiag.divId = d)), t);
          }
          function V(e, t) {
            if (t)
              for (let i = 0; i < e.length; i++) {
                const r = e[i];
                if (t[0] === r[0] && t[1] === r[1]) {
                  e.splice(i, 1);
                  break;
                }
              }
          }
          function Y(e, t) {
            const i = (function (e) {
              const t = j(e, d.s6),
                i = e.nativeOrtbRequest;
              ((i.eventtrackers = [{ event: 1, methods: [1, 2] }]),
                (i.privacy = 1),
                (t.native = { request: JSON.stringify(i), ver: '1.2' }));
              const r = (0, o.A)(e, 'ortb2Imp.ext.tid');
              return (r && (0, a.J)(t, 'ext.tid', r), M(t, e), z(e, t, d.s6), t);
            })(e);
            if (0 !== Object.keys(i).length) {
              ((t[e.adUnitCode] = {}),
                (t[e.adUnitCode].ixImps = []),
                t[e.adUnitCode].ixImps.push(i),
                (t[e.adUnitCode].gpid = (0, o.A)(e, 'ortb2Imp.ext.gpid')),
                (t[e.adUnitCode].dfp_ad_unit_code = (0, o.A)(e, 'ortb2Imp.ext.data.adserver.adslot')),
                (t[e.adUnitCode].tagId = (0, o.A)(e, 'params.tagId')));
              const r = e.adUnitCode,
                n = x(r);
              ((t[e.adUnitCode].adUnitCode = r), (t[e.adUnitCode].divId = n));
            }
          }
          function Z(e, t) {
            const i = F(e);
            if (0 !== Object.keys(i).length) {
              ((t[e.adUnitCode] = {}),
                (t[e.adUnitCode].ixImps = []),
                t[e.adUnitCode].ixImps.push(i),
                (t[e.adUnitCode].gpid = (0, o.A)(e, 'ortb2Imp.ext.gpid')),
                (t[e.adUnitCode].dfp_ad_unit_code = (0, o.A)(e, 'ortb2Imp.ext.data.adserver.adslot')),
                (t[e.adUnitCode].tagId = (0, o.A)(e, 'params.tagId')));
              const r = e.adUnitCode,
                n = x(r);
              ((t[e.adUnitCode].adUnitCode = r), (t[e.adUnitCode].divId = n));
            }
          }
          function K(e, t, i, r) {
            const a = (function (e) {
                const t = j(e, d.D4);
                ((t.banner = {}), (t.adunitCode = e.adUnitCode));
                const i = (0, o.A)(e, 'params.size');
                return (i && ((t.banner.w = i[0]), (t.banner.h = i[1])), (t.banner.topframe = (0, n.inIframe)() ? 0 : 1), z(e, t, d.D4), t);
              })(e),
              p = $((0, o.A)(e, 'mediaTypes.banner.sizes'), (0, o.A)(e, 'params.size'));
            (i.hasOwnProperty(e.adUnitCode) || (i[e.adUnitCode] = {}),
              (i[e.adUnitCode].gpid = (0, o.A)(e, 'ortb2Imp.ext.gpid')),
              (i[e.adUnitCode].dfp_ad_unit_code = (0, o.A)(e, 'ortb2Imp.ext.data.adserver.adslot')),
              (i[e.adUnitCode].tid = (0, o.A)(e, 'ortb2Imp.ext.tid')),
              (i[e.adUnitCode].tagId = (0, o.A)(e, 'params.tagId')),
              (i[e.adUnitCode].pos = (0, o.A)(e, 'mediaTypes.banner.pos')));
            if ((0, o.A)(r, 'paapi.enabled')) {
              const t = (0, o.A)(e, 'ortb2Imp.ext.ae'),
                r = (0, o.A)(e, 'ortb2Imp.ext.paapi');
              (r && (i[e.adUnitCode].paapi = r),
                t &&
                  ((0, s.Fq)(t)
                    ? (i[e.adUnitCode].ae = t)
                    : (0, n.logWarn)('error setting auction environment flag - must be an integer')));
            }
            const c = (0, o.A)(e, 'ortb2Imp.ext.data');
            c && (i[e.adUnitCode].adUnitFPD = c);
            const l = (0, o.A)(e, 'params.id');
            !l || ('string' != typeof l && 'number' != typeof l) || (i[e.adUnitCode].sid = String(l));
            const u = e.adUnitCode,
              f = x(u);
            ((i[e.adUnitCode].adUnitCode = u),
              (i[e.adUnitCode].divId = f),
              p && (i[e.adUnitCode].hasOwnProperty('ixImps') || (i[e.adUnitCode].ixImps = []), i[e.adUnitCode].ixImps.push(a)),
              (function (e, t, i) {
                if (t.hasOwnProperty(e.adUnitCode)) {
                  let i = [];
                  (t[e.adUnitCode].hasOwnProperty('missingSizes') && (i = t[e.adUnitCode].missingSizes),
                    V(i, e.params.size),
                    (t[e.adUnitCode].missingSizes = i));
                } else if ((0, o.A)(e, 'mediaTypes.banner.sizes')) {
                  const r = (0, s.Go)(e.mediaTypes.banner.sizes);
                  V(r, e.params.size);
                  const n = { missingSizes: r, impression: i };
                  t[e.adUnitCode] = n;
                }
              })(e, t, a));
          }
          function ee(e, t, i) {
            const r = (0, s.Go)(t);
            return ((r.banner.w = i[0]), (r.banner.h = i[1]), z(e, r, d.D4), r);
          }
          function te(e) {
            e.renderer.push(function () {
              const t = x(e.adUnitCode);
              t ? window.createIXPlayer(t, e) : (0, n.logWarn)(`IX Bid Adapter: adUnitCode: ${t} not found on page.`);
            });
          }
          function ie(e, t) {
            const i = f.A4.install({ id: e, url: t, loaded: !1 });
            try {
              i.setRender(te);
            } catch (e) {
              return ((0, n.logWarn)('Prebid Error calling setRender on renderer', e), null);
            }
            return t ? i : ((0, n.logWarn)('Outstream renderer URL not found'), null);
          }
          function re(e) {
            if ('outstream' !== (0, o.A)(e, 'mediaTypes.video.context')) return !1;
            let t = (0, o.A)(e, 'mediaTypes.video.renderer');
            t || (t = (0, o.A)(e, 'renderer'));
            return !!('object' != typeof t || !t.url || !t.render) || t.backupOnly;
          }
          function ne() {
            const e = p.$W.getConfig('exchangeId');
            return !('number' != typeof e || !isFinite(e)) || !('string' != typeof e || '' === e.trim() || !isFinite(Number(e)));
          }
          const oe = {
            code: b,
            gvlid: 10,
            supportedMediaTypes: h,
            isBidRequestValid: function (e) {
              const t = (0, o.A)(e, 'params.video'),
                i = (0, o.A)(e, 'params.size'),
                r = (0, o.A)(e, 'mediaTypes.banner.sizes'),
                a = (0, o.A)(e, 'mediaTypes.video'),
                s = (0, o.A)(e, 'mediaTypes.video.playerSize'),
                d = e.params.hasOwnProperty('bidFloor'),
                p = e.params.hasOwnProperty('bidFloorCur');
              if (e.hasOwnProperty('mediaType') && !(0, n.contains)(h, e.mediaType))
                return ((0, n.logWarn)('IX Bid Adapter: media type is not supported.'), !1);
              if ((0, o.A)(e, 'mediaTypes.banner') && !r) return !1;
              if (i) {
                const t = X(i);
                if (!t) return ((0, n.logError)('IX Bid Adapter: size has invalid format.'), !1);
                if (!$(e.sizes, t) && !$(s, t) && !$(r, t))
                  return ((0, n.logError)('IX Bid Adapter: bid size is not included in ad unit sizes or player size.'), !1);
              }
              if (!ne() && (void 0 === e.params.siteId || null === e.params.siteId))
                return ((0, n.logError)('IX Bid Adapter: Invalid configuration - either siteId or exchangeId must be configured.'), !1);
              if (void 0 !== e.params.siteId) {
                if ('string' != typeof e.params.siteId && 'number' != typeof e.params.siteId)
                  return ((0, n.logError)('IX Bid Adapter: siteId must be string or number type.'), !1);
                if ('string' != typeof e.params.siteId && isNaN(Number(e.params.siteId)))
                  return ((0, n.logError)('IX Bid Adapter: siteId must valid value'), !1);
              }
              if (
                (d || p) &&
                !(
                  d &&
                  p &&
                  ((c = e.params.bidFloor),
                  (l = e.params.bidFloorCur),
                  Boolean('number' == typeof c && 'string' == typeof l && l.match(/^[A-Z]{3}$/)))
                )
              )
                return ((0, n.logError)('IX Bid Adapter: bidFloor / bidFloorCur parameter has invalid format.'), !1);
              var c, l;
              if (a && t) {
                const i = F(e).video,
                  r = W(a, t);
                if ((0, o.A)(e, 'mediaTypes.video.context') === u.H6 && re(e) && i) {
                  const e = [(0, o.A)(i, 'w'), (0, o.A)(i, 'h')];
                  if (!(e[0] >= y[0] && e[1] >= y[1]))
                    return ((0, n.logError)(`IX Bid Adapter: ${e} is an invalid size for IX outstream renderer`), !1);
                }
                if (r.length)
                  return (
                    r.forEach((e) => {
                      (0, n.logError)(e);
                    }),
                    !1
                  );
              }
              return (function (e) {
                return (
                  void 0 === (0, o.A)(e, 'mediaTypes.native') ||
                  (e.nativeOrtbRequest && Array.isArray(e.nativeOrtbRequest.assets) && e.nativeOrtbRequest.assets.length > 0)
                );
              })(e);
            },
            resetSiteID: function () {
              D = 0;
            },
            buildRequests: function (e, t) {
              const i = [],
                r = {},
                a = {},
                s = {},
                p = {};
              (T.getFeatureToggles(),
                e.forEach((e) => {
                  const i = Object.keys((0, o.A)(e, 'mediaTypes', {}));
                  for (const o of i)
                    switch (o) {
                      case d.D4:
                        K(e, p, r, t);
                        break;
                      case d.G_:
                        Z(e, a);
                        break;
                      case d.s6:
                        Y(e, s);
                        break;
                      default:
                        (0, n.logWarn)(`IX Bid Adapter: ad unit mediaTypes ${o} is not supported`);
                    }
                }));
              for (const t in p)
                if (p.hasOwnProperty(t)) {
                  const i = p[t].missingSizes;
                  (r.hasOwnProperty(t) || (r[t] = {}),
                    r[t].hasOwnProperty('missingImps') || ((r[t].missingImps = []), (r[t].missingCount = 0)));
                  const n = p[t].impression;
                  for (let o = 0; o < i.length; o++) {
                    const a = ee(e[0], n, i[o]);
                    (r[t].missingImps.push(a), r[t].missingCount++);
                  }
                }
              const c = [];
              return (
                Object.keys(r).length > 0 && c.push(r),
                Object.keys(a).length > 0 && c.push(a),
                Object.keys(s).length > 0 && c.push(s),
                i.push(
                  ...G(
                    e,
                    t,
                    (function (e) {
                      const t = {};
                      return (
                        e.forEach((e) => {
                          Object.keys(e).forEach((i) => {
                            t.hasOwnProperty(i)
                              ? t[i].hasOwnProperty('ixImps') && e[i].hasOwnProperty('ixImps')
                                ? (t[i].ixImps = [...t[i].ixImps, ...e[i].ixImps])
                                : t[i].hasOwnProperty('missingImps') && e[i].hasOwnProperty('missingImps')
                                  ? (t[i].missingImps = [...t[i].missingImps, ...e[i].missingImps])
                                  : e[i].hasOwnProperty('ixImps')
                                    ? (t[i].ixImps = e[i].ixImps)
                                    : e[i].hasOwnProperty('missingImps') && (t[i].missingImps = e[i].missingImps)
                              : (t[i] = e[i]);
                          });
                        }),
                        t
                      );
                    })(c),
                  ),
                ),
                i
              );
            },
            interpretResponse: function (e, t) {
              const i = [];
              let r = null,
                a = (0, o.A)(e, 'body.ext.protectedAudienceAuctionConfigs') || [];
              if ((T.setFeatureToggles(e), !e.hasOwnProperty('body'))) return i;
              const s = e.body,
                p = s.seatbid || [];
              for (let e = 0; e < p.length; e++) {
                if (!p[e].hasOwnProperty('bid')) continue;
                const a = p[e].bid,
                  c = t.data;
                for (let e = 0; e < a.length; e++) {
                  const n = q(a[e].impid, c.imp, t.validBidRequests);
                  if (((r = B(a[e], s.cur, n)), r.mediaType === d.G_ && re(n))) {
                    const t = (0, o.A)(s, 'ext.videoplayerurl');
                    if (((r.renderer = ie(a[e].bidId, t)), !r.renderer)) continue;
                  }
                  i.push(r);
                }
                if ((0, o.A)(c, 'ext.ixdiag.err') && E.localStorageIsEnabled())
                  try {
                    E.removeDataFromLocalStorage('ixdiag');
                  } catch (e) {
                    (0, n.logError)('ix can not clear ixdiag from localStorage.');
                  }
              }
              if (!(Array.isArray(a) && a.length > 0)) return i;
              a = a.filter(
                (e) =>
                  !!(function (e) {
                    return 'object' == typeof e && null !== e;
                  })(e) || ((0, n.logWarn)('Malformed auction config detected:', e), !1),
              );
              try {
                return { bids: i, paapi: a };
              } catch (e) {
                return ((0, n.logWarn)('Error attaching AuctionConfigs', e), i);
              }
            },
            getUserSyncs: function (e, t) {
              const i = [];
              let r = null;
              if ((t.length > 0 && (r = (0, o.A)(t[0], 'body.ext.publishersyncsperbidderoverride')), 0 === r)) return [];
              if (e.iframeEnabled) i.push({ type: 'iframe', url: 'https://js-sec.indexww.com/um/ixmatch.html' });
              else {
                let e = null;
                (p.$W.getConfig('userSync') && (e = p.$W.getConfig('userSync').syncsPerBidder),
                  0 === e && (e = r),
                  (e = r && (0 === e || e) ? (r > e ? e : r) : 1));
                for (let t = 0; t < e; t++) i.push({ type: 'image', url: ae(e, t) });
              }
              return i;
            },
          };
          function ae(e, t) {
            let i = '',
              r = '0';
            (P && P.hasOwnProperty('gdprApplies') && (r = P.gdprApplies ? '1' : '0'),
              P && P.hasOwnProperty('consentString') && (i = P.consentString || ''));
            return (
              'https://dsum.casalemedia.com/pbusermatch?origin=prebid' +
              (0 !== D ? '&site_id=' + D.toString() : '') +
              '&p=' +
              e.toString() +
              '&i=' +
              t.toString() +
              '&gdpr=' +
              r +
              '&gdpr_consent=' +
              i +
              '&us_privacy=' +
              (_ || '')
            );
          }
          function se(e) {
            return (
              e.imp.forEach((t, i) => {
                const r = t.ext;
                if (null == r) return e;
                pe(t) < 2 ||
                  Object.keys(r).forEach((n) => {
                    if (d.D4 in t) {
                      const o = t.banner.ext;
                      if ((void 0 !== o && void 0 !== o[n] && o[n] === r[n] && delete e.imp[i].banner.ext[n], void 0 !== t.banner.format))
                        for (let o = 0; o < t.banner.format.length; o++)
                          t.banner.format[o]?.ext?.[n] === r[n] && delete e.imp[i].banner.format[o].ext[n];
                    }
                    if (d.G_ in t) {
                      const o = t.video.ext;
                      void 0 !== o && void 0 !== o[n] && o[n] === r[n] && delete e.imp[i].video.ext[n];
                    }
                    if (d.s6 in t) {
                      const o = t.native.ext;
                      void 0 !== o && void 0 !== o[n] && o[n] === r[n] && delete e.imp[i].native.ext[n];
                    }
                  });
              }),
              e
            );
          }
          function de(e) {
            return (
              e.imp.forEach((t, i) => {
                const r = t.ext;
                if (null == r) return e;
                if (!(pe(t) < 2)) {
                  if (d.D4 in t) {
                    const r = t.banner.ext;
                    if ((void 0 !== r && void 0 !== r.siteID && delete e.imp[i].banner.ext.siteID, void 0 !== t.banner.format))
                      for (let r = 0; r < t.banner.format.length; r++)
                        void 0 !== t.banner.format[r].ext &&
                          void 0 !== t.banner.format[r].ext.siteID &&
                          ((0, a.J)(e.imp[i], 'ext.siteID', t.banner.format[r].ext.siteID),
                          (0, a.J)(e, 'ext.ixdiag.usid', !0),
                          delete e.imp[i].banner.format[r].ext.siteID);
                  }
                  if (d.G_ in t) {
                    const r = t.video.ext;
                    void 0 !== r && void 0 !== r.siteID && delete e.imp[i].video.ext.siteID;
                  }
                  if (d.s6 in t) {
                    const r = t.native.ext;
                    void 0 !== r && void 0 !== r.siteID && delete e.imp[i].native.ext.siteID;
                  }
                }
              }),
              e
            );
          }
          function pe(e) {
            let t = 0;
            return (void 0 !== e.banner && (t += 1), void 0 !== e.video && (t += 1), void 0 !== e.native && (t += 1), t);
          }
          function ce(e) {
            return (void 0 === e.device && (e.device = {}), (e.device.h = window.screen.height), (e.device.w = window.screen.width), e);
          }
          ((0, l.a$)(oe), (0, r.E)('ixBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 3005], () => {
          return ((t = 73), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2259],
      {
        4228(e, t, r) {
          r.d(t, { DQ: () => bt });
          const n = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', 'i'),
            o = !!String.prototype.trim;
          function i(e, t) {
            return null != e ? t(e) : e;
          }
          function a(e) {
            return 'object' == typeof e ? JSON.stringify(e) : '' + e;
          }
          function s(e) {
            return null != e;
          }
          function c(e) {
            return !!e && n.test(d(e));
          }
          function l(e) {
            return '[object Array]' === Object.prototype.toString.call(e);
          }
          function d(e) {
            return o ? ('' + e).trim() : ('' + e).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
          }
          function u(e) {
            return 'string' == typeof e;
          }
          function h(e, t) {
            return u(e) && u(t) && d(e.toLowerCase()) === d(t.toLowerCase());
          }
          function f(e) {
            return !!e && 'object' == typeof e && !l(e);
          }
          function p(e) {
            return f(e);
          }
          function g(e) {
            return !!e && 'function' == typeof e;
          }
          function m(e, t) {
            return new Date(new Date().getTime() + e * t);
          }
          function w(e) {
            return m(e, 864e5);
          }
          function v(e, t, r) {
            if (f(t)) {
              let n;
              return (
                (n = 'message' in t && 'string' == typeof t.message ? new Error(r || t.message) : new Error(r)),
                (n.name = e),
                'stack' in t && 'string' == typeof t.stack && (n.stack = t.stack),
                'lineNumber' in t && 'number' == typeof t.lineNumber && (n.lineNumber = t.lineNumber),
                'columnNumber' in t && 'number' == typeof t.columnNumber && (n.columnNumber = t.columnNumber),
                n
              );
            }
            {
              const t = Error(r);
              return ((t.name = e), t);
            }
          }
          const C = 'li_errors';
          class y {
            data;
            constructor(e) {
              const t = parseInt(e.toString()) || 5;
              this.data = { h: {}, q: {}, size: t };
            }
            on(e, t, r) {
              const n = { callback: t.bind(r), unbound: t };
              return (
                (this.data = { ...this.data, h: { ...this.data.h, [e]: [...(this.data.h[e] || []), n] } }),
                (this.data.q[e] || []).forEach((e) => t.call(r, e)),
                this
              );
            }
            once(e, t, r) {
              const n = this.data.q[e] || [];
              if (n.length > 0) return (t.call(r, n[0]), this);
              {
                const n = (o) => {
                  (this.off(e, n), t.call(r, o));
                };
                return ((n._ = t), this.on(e, n, r));
              }
            }
            emit(e, t) {
              (this.data.h[e] || []).forEach((e) => e.callback(t));
              const r = this.data.q[e] || [];
              return (
                (this.data = { ...this.data, q: { ...this.data.q, [e]: [...(r.length < this.data.size ? r : r.slice(1)), t] } }),
                this
              );
            }
            off(e, t) {
              const r = this.data.h[e],
                n = (r && t && r.filter((e) => e.unbound !== t)) || [];
              if (n.length) this.data = { ...this.data, h: { ...this.data.h, [e]: n } };
              else {
                const { [e]: t, ...r } = this.data.h;
                this.data = { ...this.data, h: r };
              }
              return this;
            }
            emitErrorWithMessage(e, t, r) {
              const n = v(e, r, t);
              return this.emit(C, n);
            }
            emitError(e, t) {
              const r = v(e, t);
              return this.emit(C, r);
            }
          }
          for (var E = [], S = 0; S < 64; ) E[S] = 0 | (4294967296 * Math.sin(++S % Math.PI));
          function b(e) {
            var t,
              r,
              n,
              o = [(t = 1732584193), (r = 4023233417), ~t, ~r],
              i = [],
              a = unescape(encodeURI(e)) + '',
              s = a.length;
            for (e = (--s / 4 + 2) | 15, i[--e] = 8 * s; ~s; ) i[s >> 2] |= a.charCodeAt(s) << (8 * s--);
            for (S = a = 0; S < e; S += 16) {
              for (
                s = o;
                a < 64;
                s = [
                  (n = s[3]),
                  t +
                    (((n =
                      s[0] +
                      [(t & r) | (~t & n), (n & t) | (~n & r), t ^ r ^ n, r ^ (t | ~n)][(s = a >> 4)] +
                      E[a] +
                      ~~i[S | (15 & [a, 5 * a + 1, 3 * a + 5, 7 * a][s])]) <<
                      (s = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * s + (a++ % 4)])) |
                      (n >>> -s)),
                  t,
                  r,
                ]
              )
                ((t = 0 | s[1]), (r = s[2]));
              for (a = 4; a; ) o[--a] += s[a];
            }
            for (e = ''; a < 32; ) e += ((o[a >> 3] >> (4 * (1 ^ a++))) & 15).toString(16);
            return e;
          }
          function I(e) {
            var t,
              r,
              n,
              o,
              i,
              a = [],
              s = [(r = 1732584193), (n = 4023233417), ~r, ~n, 3285377520],
              c = [],
              l = unescape(encodeURI(e)) + '',
              d = l.length;
            for (c[(e = (--d / 4 + 2) | 15)] = 8 * d; ~d; ) c[d >> 2] |= l.charCodeAt(d) << (8 * ~d--);
            for (t = d = 0; t < e; t += 16) {
              for (
                r = s;
                d < 80;
                r = [
                  r[4] +
                    (a[d] = d < 16 ? ~~c[t + d] : (2 * l) | (l < 0)) +
                    1518500249 +
                    [(n & o) | (~n & i), (l = 341275144 + (n ^ o ^ i)), 882459459 + ((n & o) | (n & i) | (o & i)), l + 1535694389][
                      (d++ / 5) >> 2
                    ] +
                    (((l = r[0]) << 5) | (l >>> 27)),
                  l,
                  (n << 30) | (n >>> 2),
                  o,
                  i,
                ]
              )
                ((l = a[d - 3] ^ a[d - 8] ^ a[d - 14] ^ a[d - 16]), (n = r[1]), (o = r[2]), (i = r[3]));
              for (d = 5; d; ) s[--d] += r[d];
            }
            for (l = ''; d < 40; ) l += ((s[d >> 3] >> (4 * (7 - d++))) & 15).toString(16);
            return l;
          }
          for (var k, x = 18, A = [], L = []; x > 1; x--) for (k = x; k < 320; ) A[(k += x)] = 1;
          function O(e, t) {
            return (4294967296 * Math.pow(e, 1 / t)) | 0;
          }
          for (k = 0; k < 64; ) A[++x] || ((L[k] = O(x, 2)), (A[k++] = O(x, 3)));
          function D(e, t) {
            return (e >>> t) | (e << -t);
          }
          function N(e) {
            var t = L.slice((x = k = 0), 8),
              r = [],
              n = unescape(encodeURI(e)) + '',
              o = n.length;
            for (r[(e = (--o / 4 + 2) | 15)] = 8 * o; ~o; ) r[o >> 2] |= n.charCodeAt(o) << (8 * ~o--);
            for (o = []; x < e; x += 16) {
              for (
                O = t.slice();
                k < 64;
                O.unshift(n + (D((n = O[0]), 2) ^ D(n, 13) ^ D(n, 22)) + ((n & O[1]) ^ (O[1] & O[2]) ^ (O[2] & n)))
              )
                O[3] += n =
                  0 |
                  ((o[k] =
                    k < 16
                      ? ~~r[k + x]
                      : (D((n = o[k - 2]), 17) ^ D(n, 19) ^ (n >>> 10)) +
                        o[k - 7] +
                        (D((n = o[k - 15]), 7) ^ D(n, 18) ^ (n >>> 3)) +
                        o[k - 16]) +
                    O.pop() +
                    (D((n = O[4]), 6) ^ D(n, 11) ^ D(n, 25)) +
                    ((n & O[5]) ^ (~n & O[6])) +
                    A[k++]);
              for (k = 8; k; ) t[--k] += O[k];
            }
            for (n = ''; k < 64; ) n += ((t[k >> 3] >> (4 * (7 - k++))) & 15).toString(16);
            return n;
          }
          class M {
            url;
            timeout;
            calls;
            eventBus;
            retries;
            constructor(e) {
              ((this.url = e.collectorUrl ?? 'https://rp.liadm.com'),
                (this.timeout = e.ajaxTimeout ?? 0),
                (this.calls = e.callHandler),
                (this.eventBus = e.eventBus),
                (this.retries = e.ajaxRetries ?? 3));
            }
            callBakers(e) {
              try {
                const t = JSON.parse(e).bakers;
                if (l(t)) for (let e = 0; e < t.length; e++) this.calls.pixelGet(`${t[e]}?dtstmp=${Date.now()}`);
              } catch (t) {
                this.eventBus.emitErrorWithMessage('CallBakers', `Error while calling bakers with ${e}`, t);
              }
            }
            sendState(e, t, r, n) {
              if (e.sendsPixel()) {
                n && g(n) && n();
                const o = e.asQuery().add('dtstmp', Date.now(), { prepend: !0 }).toQueryString();
                r(`${this.url}/${t}${o}`);
              }
            }
            sendAjax(e, t = {}) {
              this.sendState(
                e,
                'j',
                (r) => {
                  const n = (o) => {
                    const i = e.asHeaders();
                    this.calls.ajaxGet(
                      r,
                      (e) => {
                        (t.onLoad && g(t.onLoad) && t.onLoad(), this.callBakers(e));
                      },
                      (r) => {
                        o <= 0 ? (this.sendPixel(e, t), this.eventBus.emitError('AjaxFailed', r)) : n(o - 1);
                      },
                      this.timeout,
                      i,
                    );
                  };
                  n(this.retries);
                },
                t.onPreSend,
              );
            }
            sendPixel(e, t = {}) {
              this.sendState(e, 'p', (e) => this.calls.pixelGet(e, t.onLoad), t.onPreSend);
            }
          }
          const F = '__li__evt_bus',
            R = 'lips',
            U = 'pre_lips',
            $ = '_li_duid',
            _ = 'https://idx.liadm.com/idex',
            j = [];
          function V(e) {
            return e >= 0 && e < 64 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[e] : void 0;
          }
          function P(e) {
            const t = (function (e) {
              e = `${e}`;
              for (let t = 0; t < e.length; t++) if (e.charCodeAt(t) > 255) return null;
              let t = '';
              for (let r = 0; r < e.length; r += 3) {
                const n = [void 0, void 0, void 0, void 0];
                ((n[0] = e.charCodeAt(r) >> 2),
                  (n[1] = (3 & e.charCodeAt(r)) << 4),
                  e.length > r + 2
                    ? ((n[1] |= e.charCodeAt(r + 1) >> 4),
                      (n[2] = (15 & e.charCodeAt(r + 1)) << 2),
                      (n[2] |= e.charCodeAt(r + 2) >> 6),
                      (n[3] = 63 & e.charCodeAt(r + 2)))
                    : e.length > r + 1 && ((n[1] |= e.charCodeAt(r + 1) >> 4), (n[2] = (15 & e.charCodeAt(r + 1)) << 2)));
                for (let e = 0; e < n.length; e++) {
                  const r = n[e];
                  t += void 0 === r ? '=' : V(r);
                }
              }
              return t;
            })(e);
            return t || '';
          }
          const B = /[+/]|=+$/g,
            T = { '+': '-', '/': '_' };
          function q(e) {
            return T[e] || '';
          }
          function W(e) {
            let t = null;
            const r = encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (e, t) => String.fromCharCode(parseInt('0x' + t, 16)));
            try {
              t = window && g(window.btoa) ? window.btoa : P;
            } catch (e) {
              t = P;
            }
            return t(r).replace(B, q);
          }
          const H = new Map([
            [32, 'md5'],
            [40, 'sha1'],
            [64, 'sha256'],
          ]);
          function Q(e) {
            const t = G(e);
            return !!t && H.has(t.length);
          }
          function G(e) {
            const t = e.match(/(\s+)?[a-f0-9]{32,64}(\s+)?/gi);
            return t && t.map(d)[0];
          }
          function J(e) {
            const t = e.toLowerCase();
            return { md5: b(t), sha1: I(t), sha256: N(t) };
          }
          function z(e) {
            return /\S+(@|%40)\S+\.\S+/.test(e);
          }
          function X(e) {
            return /\S+(@|%40)\S+\.\S+/.test(e);
          }
          function K(e) {
            const t = e.match(/\S+(@|%40)\S+\.\S+/);
            return t && t.map(d)[0];
          }
          function Y(e) {
            const t = (function (e) {
                const t = [],
                  r = new RegExp('([\\w\\d.+-]+(@|%40)[\\w\\d-]+.[\\w\\d.-]+)', 'g');
                let n = r.exec(e);
                for (; n; ) (t.push(d(n[1])), (n = r.exec(e)));
                return t;
              })(e),
              r = [];
            let n = e;
            for (let e = 0; e < t.length; e++) {
              const o = t[e],
                i = J(o);
              ((n = n.replace(o, i.md5)), r.push(i));
            }
            return { stringWithoutRawEmails: n, hashesFromOriginalString: r };
          }
          function Z(e, t) {
            return 'string' == typeof t && z(d(t)) ? '*********' : t;
          }
          function ee(e) {
            return (function (e) {
              return 'false' !== e && ('true' === e || e);
            })(
              (function (e) {
                return 'null' === e || 'undefined' === e ? null : e;
              })(
                (function (e) {
                  return isNaN(+e) ? e : +e;
                })(e),
              ),
            );
          }
          function te(e, t) {
            if (t in e) {
              const r = e[t];
              return l(r) ? r.map((e) => ee(ne(e))) : ee(ne(r));
            }
          }
          function re(e) {
            let t, r, n;
            const o = {};
            return e && -1 !== (t = e.indexOf('?')) && (r = e.slice(t + 1)) && (-1 === (n = r.indexOf('#')) || (r = r.slice(0, n)))
              ? (r.split('&').forEach(function (e) {
                  if (e) {
                    let t;
                    const r = e.split('=');
                    t = r[0];
                    const n = 2 === r.length ? r[1] : 'true';
                    if (('[]' === t.slice(-2) && (t = t.slice(0, -2)), t in o)) {
                      const e = o[t];
                      l(e) ? e.push(n) : (o[t] = [e, n]);
                    } else o[t] = n;
                  }
                }),
                o)
              : o;
          }
          function ne(e) {
            return e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
          }
          class oe {
            hash;
            host;
            hostname;
            pathname;
            port;
            protocol;
            search;
            constructor(e) {
              const t = e.match(/^(https?\:\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
              if (null === t) throw new TypeError(`Failed to parse URL: ${e}`);
              ((this.protocol = t[1] || ''),
                (this.host = t[2] || ''),
                (this.hostname = t[3] || ''),
                (this.port = t[4] || ''),
                (this.pathname = t[5] || ''),
                (this.search = t[6] || ''),
                (this.hash = t[7] || ''));
            }
            toString() {
              return `${this.protocol}${this.host}${this.pathname}${this.search}${this.hash}`;
            }
          }
          const ie = ['items', 'itemids'],
            ae = ['email', 'emailhash', 'hash', 'hashedemail'];
          function se(e) {
            const t = {};
            return (
              Object.keys(e).forEach((r) => {
                const n = r.toLowerCase(),
                  o = e[r];
                ie.indexOf(n) > -1 && l(o) && o.length > 10 ? (t[r] = o.slice(0, 10)) : (t[r] = o);
              }),
              t
            );
          }
          function ce(e) {
            if (p(e)) {
              return {
                ...(function (e) {
                  const t = { eventSource: e };
                  for (const r of Object.keys(e)) {
                    const n = r.toLowerCase();
                    if (ae.indexOf(n) > -1) {
                      const n = d(a(e[r])),
                        o = K(n),
                        i = G(n);
                      if (o) {
                        const e = J(ne(o));
                        t.hashedEmail = [e.md5, e.sha1, e.sha256];
                        break;
                      }
                      if (i && Q(i)) {
                        t.hashedEmail = [i.toLowerCase()];
                        break;
                      }
                    }
                  }
                  return (
                    'string' == typeof e.userAgent && (t.providedUserAgent = e.userAgent),
                    'string' == typeof e.ipv4 && (t.providedIPV4 = e.ipv4),
                    'string' == typeof e.ipv6 && (t.providedIPV6 = e.ipv6),
                    t
                  );
                })(e),
                eventSource: se(e),
              };
            }
            return {};
          }
          class le {
            tuples;
            constructor(e = []) {
              this.tuples = e;
            }
            add(e, t, r = {}) {
              const { stripEmpty: n = !0, prepend: o = !1 } = r;
              return '' === e || (n && '' === t) ? this : o ? (this.tuples.unshift([e, t]), this) : (this.tuples.push([e, t]), this);
            }
            addOptional(e, t, r = {}) {
              return s(t) ? this.add(e, t, r) : this;
            }
            addParamsMap(e) {
              return (
                Object.keys(e).forEach((t) => {
                  const r = e[t];
                  s(r) && (l(r) ? r.forEach((e) => this.add(t, e)) : this.add(t, r));
                }),
                this
              );
            }
            copy() {
              return new le(this.tuples.slice());
            }
            filteredCopy(e) {
              return new le(this.tuples.filter(([t, r]) => e(t, r)));
            }
            toQueryString() {
              let e = '';
              return (
                this.tuples.forEach(([t, r]) => {
                  const n = 0 === e.length ? '?' : '&';
                  e = `${e}${n}${encodeURIComponent(t)}=${encodeURIComponent(r)}`;
                }),
                e
              );
            }
          }
          function de(e) {
            return null === e ? '' : e;
          }
          const ue = 'full',
            he = 'no_path';
          function fe(e) {
            if (void 0 === e.pageUrl || 0 === e.pageUrl.length) return ['', !1, []];
            if (
              (function (e) {
                return !(
                  (void 0 !== e.urlCollectionMode && e.urlCollectionMode !== ue) ||
                  (void 0 !== e.queryParametersFilter && '' !== e.queryParametersFilter)
                );
              })(e)
            )
              return [e.pageUrl, !1, []];
            const t = new oe(e.pageUrl),
              r = (function (e) {
                const t = re(e),
                  r = [];
                return (
                  Object.keys(t).forEach((e) => {
                    r.push([e, te(t, e)]);
                  }),
                  r
                );
              })(t.search),
              n = (function (e, t) {
                return t.urlCollectionMode === he && e.pathname.length > 1;
              })(t, e),
              o = (function (e, t) {
                if (void 0 === t.queryParametersFilter || '' === t.queryParametersFilter) return [];
                const r = new RegExp(t.queryParametersFilter);
                return e.map((e) => e[0]).filter((e) => r.test(e));
              })(r, e);
            return (
              n && (t.pathname = '/'),
              o.length > 0 &&
                (t.search = (function (e, t) {
                  const r = e.filter((e) => -1 === t.indexOf(e[0])).map((e) => `${e[0]}=${e[1]}`);
                  return r.length > 0 ? `?${r.join('&')}` : '';
                })(r, o)),
              [t.toString(), n, o]
            );
          }
          function pe(e) {
            if (0 !== e.length) {
              const t = new oe(e);
              return ((t.pathname = ''), (t.search = ''), t.toString());
            }
          }
          const ge = ['setemail', 'setemailhash', 'sethashedemail'];
          class me {
            data;
            constructor(e, t, r, n) {
              const o = me.safeFiddle(e, t, n);
              (r && (o.errorDetails = r), (this.data = o));
            }
            static safeFiddle(e, t, r) {
              try {
                return (function (e, t) {
                  const r = {};
                  function n(e) {
                    return f(e) ? e : {};
                  }
                  function o(e) {
                    return Object.keys(e);
                  }
                  const i = n(e),
                    a = n(t);
                  return (
                    o(i).forEach((e) => {
                      r[e] = i[e];
                    }),
                    o(a).forEach((e) => {
                      r[e] = a[e];
                    }),
                    r
                  );
                })(e, ce(JSON.parse(JSON.stringify(t))));
              } catch (e) {
                return (
                  console.error(e),
                  null != r && r.emitErrorWithMessage('StateCombineWith', 'Error while extracting event data', e),
                  {}
                );
              }
            }
            static fromEvent(e, t, r) {
              return new me(e, t, void 0, r);
            }
            static fromError(e, t, r) {
              return new me(e, {}, t, r);
            }
            setHashedEmail(e) {
              this.data.hashedEmail = e;
            }
            getHashedEmail() {
              return this.data.hashedEmail || [];
            }
            sendsPixel() {
              const e = f(this.data.eventSource) ? this.data.eventSource : {},
                t = Object.keys(e).filter((e) => 'eventname' === e.toLowerCase() || 'event' === e.toLowerCase()),
                r = t && t.length >= 1 && t[0],
                n = r && d(e[r]);
              return !n || -1 === ge.indexOf(n.toLowerCase());
            }
            asHeaders() {
              return this.data.providedUserAgent ? { 'X-LI-Provided-User-Agent': this.data.providedUserAgent } : {};
            }
            asQuery() {
              const e = this.data,
                t = new le()
                  .addOptional('aid', e.appId)
                  .addOptional('did', e.distributorId)
                  .addOptional(
                    'se',
                    i(e.eventSource, (e) => W(JSON.stringify(e, Z))),
                  )
                  .addOptional('duid', e.liveConnectId)
                  .addOptional('tv', e.trackerVersion);
              if (s(e.pageUrl)) {
                const [r, n, o] = fe(e);
                t.add('pu', r)
                  .addOptional('pu_rp', n ? '1' : void 0)
                  .add('pu_rqp', o.join(','));
              }
              return (
                t.addOptional(
                  'ae',
                  i(e.errorDetails, (e) => W(JSON.stringify(e))),
                ),
                l(e.retrievedIdentifiers) && e.retrievedIdentifiers.forEach((e) => t.add(`ext_${e.name}`, e.value)),
                l(e.hashesFromIdentifiers) && e.hashesFromIdentifiers.forEach((e) => t.add('scre', `${e.md5},${e.sha1},${e.sha256}`)),
                t
                  .addOptional('li_did', e.decisionIds?.join(','))
                  .addOptional('e', e.hashedEmail?.join(','))
                  .addOptional('us_privacy', e.usPrivacyString)
                  .addOptional('wpn', e.wrapperName)
                  .addOptional(
                    'gdpr',
                    i(e.gdprApplies, (e) => (e ? '1' : '0')),
                  )
                  .addOptional('gdpr_consent', e.gdprConsent)
                  .addOptional('refr', e.referrer)
                  .addOptional('gpp_s', e.gppString)
                  .addOptional('gpp_as', e.gppApplicableSections?.join(','))
                  .addOptional('cd', e.cookieDomain)
                  .addOptional('ic', de(e.resolvedIdCookie), { stripEmpty: !1 })
                  .addOptional('c', e.contextElements)
                  .addOptional(
                    'pip',
                    i(e.providedIPV4, (e) => W(e)),
                  )
                  .addOptional(
                    'pip6',
                    i(e.providedIPV6, (e) => W(e)),
                  ),
                t
              );
            }
          }
          function we(e = window) {
            return Ee(() => e.top.document.referrer);
          }
          function ve(e = window) {
            const t = Ee(() => e.location.ancestorOrigins) || [],
              r = [];
            let n,
              o = e;
            for (; o !== top; ) (r.push(o), (o = o.parent));
            r.push(o);
            for (let e = r.length - 1; e >= 0 && !n; e--)
              ((n = Ee(() => r[e].location.href)), 0 !== e && (n || (n = Ee(() => r[e - 1].document.referrer)), n || (n = t[e - 1])));
            return n;
          }
          function Ce(e, t, r) {
            if (!e && t && '' !== t && r) {
              const e = (function (e, t) {
                const r = window.document.querySelectorAll(e);
                let n = '';
                for (let e = 0; e < r.length; e++) {
                  const o = n + Y(r[e].outerHTML).stringWithoutRawEmails;
                  if (!(ye(o) <= t)) return n;
                  n = o;
                }
                return n;
              })(t, r);
              return W(e);
            }
            return '';
          }
          function ye(e) {
            return Math.ceil((4 * new Blob([e]).size) / 3);
          }
          function Ee(e) {
            try {
              return e();
            } catch (e) {
              return;
            }
          }
          function Se(e) {
            let t = [];
            e && (l(e) ? (t = e) : u(e) && (t = e.split(',')));
            for (let e = 0; e < t.length; e++) t[e] = t[e].trim();
            return t;
          }
          function be(e, t) {
            const r = [];
            let n = [];
            for (let o = 0; o < e.length; o++) {
              const i = e[o],
                s = t.getCookie(i) || t.getDataFromLocalStorage(i);
              if (s) {
                const e = Y(a(s));
                (r.push({ name: i, value: e.stringWithoutRawEmails }), (n = n.concat(e.hashesFromOriginalString)));
              }
            }
            return { retrievedIdentifiers: r, hashesFromIdentifiers: Ie(n) };
          }
          function Ie(e) {
            const t = new Set(),
              r = [];
            for (let n = 0; n < e.length; n++) t.has(e[n].md5) || (r.push(e[n]), t.add(e[n].md5));
            return r;
          }
          const ke = (e) => ({ ...e, privacyMode: !!e.gdprApplies || (e.gppApplicableSections ?? []).indexOf(2) > -1 });
          function xe(e, t) {
            if (e && e.appId && e.distributorId) {
              const r = e.distributorId;
              (delete e.distributorId,
                t.emitError(
                  'AppIdAndDistributorIdPresent',
                  new Error(`Event contains both appId: ${e.appId} and distributorId: ${r}. Ignoring distributorId`),
                ));
            }
            return e;
          }
          const Ae = 'idCookie';
          class Le {
            eventBus;
            calls;
            idexConfig;
            externalIds;
            source;
            publisherId;
            url;
            timeout;
            extraAttributes;
            requestedAttributes;
            query;
            privacyMode;
            resolvedIdCookie;
            generateIdCookie;
            peopleVerifiedId;
            pageUrl;
            constructor(e, t, r) {
              const n = e || { identityResolutionConfig: {} };
              ((this.eventBus = r),
                (this.calls = t),
                (this.idexConfig = n.identityResolutionConfig || {}),
                (this.extraAttributes = this.idexConfig.extraAttributes || {}),
                (this.externalIds = n.retrievedIdentifiers || []),
                (this.source = this.idexConfig.source || 'unknown'),
                (this.publisherId = this.idexConfig.publisherId || 'any'),
                (this.url = this.idexConfig.url || _),
                (this.timeout = this.idexConfig.ajaxTimeout || n.ajaxTimeout || 5e3),
                (this.requestedAttributes = this.idexConfig.requestedAttributes || j),
                (this.privacyMode = n.privacyMode ?? !1),
                (this.resolvedIdCookie = n.resolvedIdCookie),
                (this.generateIdCookie = 'generated' === this.idexConfig.idCookieMode),
                (this.peopleVerifiedId = n.peopleVerifiedId),
                (this.pageUrl = n.pageUrl),
                (this.query = new le()
                  .addOptional('duid', n.peopleVerifiedId)
                  .addOptional('us_privacy', n.usPrivacyString)
                  .addOptional(
                    'gdpr',
                    i(n.gdprApplies, (e) => (e ? 1 : 0)),
                  )
                  .addOptional('gdpr_consent', n.gdprConsent)
                  .addOptional('did', n.distributorId)
                  .addOptional('gpp_s', n.gppString)
                  .addOptional('gpp_as', n.gppApplicableSections?.join(','))
                  .addOptional('cd', n.cookieDomain)
                  .addOptional('ic', de(n.resolvedIdCookie), { stripEmpty: !1 })
                  .addOptional('pu', i(n.pageUrl, pe))
                  .addOptional(
                    'pip',
                    i(this.extraAttributes.ipv4, (e) => W(e)),
                  )
                  .addOptional(
                    'pip6',
                    i(this.extraAttributes.ipv6, (e) => W(e)),
                  )),
                this.externalIds.forEach((e) => {
                  this.query.add(e.name, e.value);
                }),
                this.requestedAttributes.forEach((e) => {
                  this.query.add('resolve', e);
                }));
            }
            attributeResolutionAllowed(e) {
              return 'uid2' === e ? !this.privacyMode : e !== Ae;
            }
            filterParams(e) {
              return e.filteredCopy((e, t) => 'resolve' !== e || (!!u(t) && this.attributeResolutionAllowed(t)));
            }
            enrichExtraIdentifiers(e, t) {
              const r = t.tuples.filter(([e]) => 'resolve' === e).map(([, e]) => e);
              const n = { ...e };
              var o;
              return (
                (o = Ae),
                r.indexOf(o) > -1 &&
                  (this.generateIdCookie && this.peopleVerifiedId
                    ? (n[Ae] = this.peopleVerifiedId)
                    : this.resolvedIdCookie && (n[Ae] = this.resolvedIdCookie)),
                n
              );
            }
            responseReceived(e, t) {
              return (r, n) => {
                let o = {};
                if (r)
                  try {
                    const e = JSON.parse(r);
                    f(e) && (o = e);
                  } catch (e) {
                    (console.error('Error parsing response', e), this.eventBus.emitError('IdentityResolverParser', e));
                  }
                const i = (function (e) {
                  if (f(e) && 'getResponseHeader' in e && g(e.getResponseHeader)) {
                    const t = e.getResponseHeader('expires');
                    if (t) return new Date(t);
                  }
                })(n);
                e(this.enrichExtraIdentifiers(o, t), { expiresAt: i });
              };
            }
            buildUrl(e) {
              return `${this.url}/${this.source}/${this.publisherId}${this.filterParams(e).toQueryString()}`;
            }
            getUrl(e) {
              const t = this.query.copy().addParamsMap(e ?? {});
              return this.buildUrl(t);
            }
            resolve(e, t, r) {
              try {
                const n = this.query.copy().addParamsMap(r ?? {});
                this.calls.ajaxGet(this.buildUrl(n), this.responseReceived(e, n), t, this.timeout);
              } catch (e) {
                (console.error('IdentityResolve', e), t && g(t) && t(e), this.eventBus && this.eventBus.emitError('IdentityResolve', e));
              }
            }
          }
          function Oe(e) {
            return new y('number' == typeof e && e >= 0 ? e : 5);
          }
          function De(e) {
            (g(e.emitErrorWithMessage) && g(e.emitError)) ||
              ((e.emitErrorWithMessage = function (t, r, n = {}) {
                const o = v(t, r, n);
                return e.emit(C, o);
              }),
              (e.emitError = function (t, r) {
                return e.emitErrorWithMessage(t, r.message, r);
              }));
          }
          function Ne(e = 5) {
            return Oe(e);
          }
          function Me(e) {
            const t = window[e].eventBus || window[F];
            return (De(t), t);
          }
          const Fe = '_li_dcdm_c';
          function Re(e) {
            const t = e.getCookie(Fe);
            if (t) return t;
            const r =
                document.domain ||
                (document.location && document.location.host) ||
                (window && window.location && window.location.host) ||
                'localhost',
              n = r.split('.');
            for (let t = n.length; t > 0; t--) {
              const r = `.${n.slice(t - 1, n.length).join('.')}`;
              if ((e.setCookie(Fe, r, void 0, 'Lax', r), e.getCookie(Fe))) return r;
            }
            return `.${r}`;
          }
          const Ue = 'cookie',
            $e = 'none',
            _e = 'disabled',
            je = (e) => {
              const t = e.privacyMode ? _e : e.storageStrategy || Ue;
              return { ...e, storageStrategy: t };
            },
            Ve = w(30),
            Pe = 'lidids.',
            Be = (e, t, r) => r.indexOf(e) === t,
            Te = (e) => e && d(e).length > 0;
          function qe(e, t) {
            return (r) => {
              function n(e, r) {
                try {
                  return r();
                } catch (r) {
                  return (t.emitErrorWithMessage('DecisionsResolve', e, r), []);
                }
              }
              const o = n('Error while extracting new decision ids', () => {
                  var e, t;
                  return []
                    .concat((r.pageUrl && ((e = r.pageUrl), (t = 'li_did'), te(re(e), t))) || [])
                    .map(d)
                    .filter(Te)
                    .filter(c)
                    .filter(Be);
                }),
                i = n('Error while retrieving stored decision ids', () => e.findSimilarCookies(Pe).map(d).filter(Te).filter(c));
              return (
                o.forEach((n) => {
                  try {
                    (o = n) && e.setCookie(`${Pe}${o}`, o, Ve, 'Lax', r.cookieDomain);
                  } catch (e) {
                    t.emitErrorWithMessage('DecisionsResolve', 'Error while storing new decision id', e);
                  }
                  var o;
                }),
                { ...r, decisionIds: o.concat(i).filter(Be) }
              );
            };
          }
          const We = '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
            He = Math.pow(2, 48) - 1,
            Qe = (function () {
              const e = 'undefined' != typeof window ? window : null,
                t = e && (e.crypto || e.msCrypto);
              if (t)
                return () => {
                  const e = new Uint8Array(1);
                  return (t.getRandomValues(e), e[0] / 255);
                };
              return () => Math.random();
            })();
          function Ge(e, t) {
            if (e > He)
              throw (function (e) {
                const t = new Error(e);
                return ((t.source = 'Ulid'), t);
              })('cannot encode time greater than ' + He);
            let r,
              n = '';
            for (; t > 0; t--) ((r = e % 32), (n = We.charAt(r) + n), (e = (e - r) / 32));
            return n;
          }
          function Je() {
            let e = Math.floor(32 * Qe());
            return (32 === e && (e = 31), We.charAt(e));
          }
          function ze() {
            return (
              Ge(Date.now(), 10) +
              (function (e) {
                let t = '';
                for (; e > 0; e--) t = Je() + t;
                return t;
              })(16)
            );
          }
          const Xe = '_lc2_fpi';
          function Ke(e, t) {
            return (r) => {
              let n;
              const o = e.get(Xe);
              if (o) n = o.data;
              else {
                const o = t.getCookie(Xe);
                if (o) (e.set(Xe, o), (n = o));
                else {
                  const t = `${(function (e, t = 12) {
                    return I(e.replace(/^\./, '')).substring(0, t);
                  })(r.cookieDomain)}--${ze()}`.toLocaleLowerCase();
                  (e.set(Xe, t), (n = e.get(Xe)?.data));
                }
              }
              return (n && t.setDataInLocalStorage($, n), { ...r, liveConnectId: n, peopleVerifiedId: n });
            };
          }
          function Ye(e) {
            try {
              const t = 1 * e;
              return isNaN(t) ? void 0 : t;
            } catch {}
          }
          function Ze(e) {
            try {
              return u(e) && e.length && e.length > 120 ? `${e.substr(0, 120)}...` : `${e}`;
            } catch {}
          }
          function et(e, t, r) {
            try {
              r.on(C, (n) => {
                const o = me.fromError(
                  e,
                  (function (e) {
                    return p(e)
                      ? {
                          message: Ze(e.message) || '',
                          name: Ze(e.name) || '',
                          stackTrace: Ze(e.stack),
                          lineNumber: Ye(e.lineNumber),
                          columnNumber: Ye(e.columnNumber),
                          fileName: Ze(e.fileName),
                        }
                      : { message: 'Unknown message', name: 'Unknown name' };
                  })(n),
                  r,
                );
                t.sendPixel(o);
              });
            } catch (e) {
              console.error('handlers.error.register', e);
            }
          }
          const tt = () => {};
          class rt {
            obj;
            name;
            errors;
            eventBus;
            constructor(e, t, r) {
              ((this.obj = e), (this.name = t), (this.errors = []), (this.eventBus = r));
            }
            wrap(e) {
              if (f(this.obj)) {
                const t = this.obj[e];
                if (g(t))
                  return (...r) => {
                    try {
                      return t.call(this.obj, ...r);
                    } catch (t) {
                      this.eventBus.emitErrorWithMessage(this.name, `Failed calling ${e}`, t);
                    }
                  };
              }
              return (this.errors.push(e), tt);
            }
            reportErrors() {
              this.errors.length > 0 &&
                this.eventBus.emitErrorWithMessage(this.name, `The functions '${JSON.stringify(this.errors)}' were not provided`);
            }
          }
          const nt = () => {};
          function ot(e, t, r) {
            return h(t, _e) ? nt : e.wrap(r);
          }
          function it(e, t, r) {
            return h(t, $e) ? nt : ot(e, t, r);
          }
          class at {
            minimalFunctions;
            constructor(e, t) {
              this.minimalFunctions = {
                getCookie: ot(t, e, 'getCookie'),
                getDataFromLocalStorage: ot(t, e, 'getDataFromLocalStorage'),
                localStorageIsEnabled: it(t, e, 'localStorageIsEnabled'),
              };
            }
            static make(e, t, r) {
              const n = new rt(t, 'ReadOnlyStorageHandler', r),
                o = new at(e, n);
              return (n.reportErrors(), o);
            }
            localStorageIsEnabled() {
              return !!this.minimalFunctions.localStorageIsEnabled();
            }
            getCookie(e) {
              return this.minimalFunctions.getCookie(e) || null;
            }
            getDataFromLocalStorage(e) {
              return this.minimalFunctions.getDataFromLocalStorage(e) || null;
            }
          }
          class st extends at {
            storageStrategy;
            functions;
            constructor(e, t) {
              (super(e, t),
                (this.storageStrategy = e),
                (this.functions = {
                  setCookie: it(t, e, 'setCookie'),
                  removeDataFromLocalStorage: it(t, e, 'removeDataFromLocalStorage'),
                  setDataInLocalStorage: it(t, e, 'setDataInLocalStorage'),
                  findSimilarCookies: ot(t, e, 'findSimilarCookies'),
                }));
            }
            static make(e, t, r) {
              const n = new rt(t, 'StorageHandler', r),
                o = new st(e, n);
              return (n.reportErrors(), o);
            }
            setCookie(e, t, r, n, o) {
              this.functions.setCookie(e, t, r, n, o);
            }
            setDataInLocalStorage(e, t) {
              this.functions.setDataInLocalStorage(e, t);
            }
            removeDataFromLocalStorage(e) {
              this.functions.removeDataFromLocalStorage(e);
            }
            findSimilarCookies(e) {
              return this.functions.findSimilarCookies(e) || [];
            }
          }
          class ct extends Error {
            constructor(e) {
              (super(e), (this.name = 'ParseError'));
            }
          }
          class lt {
            handler;
            cookieDomain;
            eventBus;
            constructor(e) {
              ((this.handler = e.storageHandler), (this.cookieDomain = e.cookieDomain), (this.eventBus = e.eventBus));
            }
            deleteCookie(e) {
              this.handler.setCookie(e, '', new Date(0), 'Lax', this.cookieDomain);
            }
            parseMetaRecord(e) {
              const t = JSON.parse(e);
              if (!f(t)) throw new ct('Meta record is not an object');
              let r;
              if ('e' in t && ((r = new Date(t.e)), isNaN(r.getTime()))) throw new ct('Invalid expiresAt');
              if (!('w' in t)) throw new ct('Missing writtenAt');
              const n = new Date(t.w);
              if (isNaN(n.getTime())) throw new ct('Invalid writtenAt');
              return { expiresAt: r, writtenAt: n };
            }
            serializeMetaRecord(e) {
              let t;
              return (e.expiresAt && (t = e.expiresAt.getTime()), JSON.stringify({ w: e.writtenAt.getTime(), e: t }));
            }
            getCookieRecord(e, t) {
              const r = this.handler.getCookie(t);
              if (!r || 0 === r.length) return null;
              let n;
              try {
                n = this.parseMetaRecord(r);
              } catch (r) {
                return (
                  this.eventBus.emitErrorWithMessage('Cache', 'Failed reading meta from cookies', r),
                  this.deleteCookie(e),
                  this.deleteCookie(t),
                  null
                );
              }
              const o = n.expiresAt;
              if (o && o.getTime() <= Date.now()) return null;
              const i = this.handler.getCookie(e);
              return i ? { data: i, meta: n } : null;
            }
            getLSRecord(e, t) {
              const r = this.handler.getDataFromLocalStorage(t);
              if (!r || 0 === r.length) return null;
              let n;
              try {
                n = this.parseMetaRecord(r);
              } catch (r) {
                return (
                  this.eventBus.emitErrorWithMessage('Cache', 'Failed reading meta from ls', r),
                  this.handler.removeDataFromLocalStorage(e),
                  this.handler.removeDataFromLocalStorage(t),
                  null
                );
              }
              const o = n.expiresAt;
              if (o && o.getTime() <= Date.now())
                return (this.handler.removeDataFromLocalStorage(e), this.handler.removeDataFromLocalStorage(t), null);
              const i = this.handler.getDataFromLocalStorage(e);
              return i ? { data: i, meta: n } : null;
            }
            get(e) {
              const t = dt(e),
                r = this.getCookieRecord(e, t),
                n = this.getLSRecord(e, t);
              return r && n
                ? r.meta.writtenAt.getTime() === n.meta.writtenAt.getTime()
                  ? r
                  : r.meta.writtenAt > n.meta.writtenAt
                    ? (this.handler.setDataInLocalStorage(e, r.data),
                      this.handler.setDataInLocalStorage(t, this.serializeMetaRecord(r.meta)),
                      r)
                    : (this.handler.setCookie(e, n.data, n.meta.expiresAt, 'Lax', this.cookieDomain),
                      this.handler.setCookie(t, this.serializeMetaRecord(n.meta), n.meta.expiresAt, 'Lax', this.cookieDomain),
                      n)
                : r
                  ? (this.handler.setDataInLocalStorage(e, r.data),
                    this.handler.setDataInLocalStorage(t, this.serializeMetaRecord(r.meta)),
                    r)
                  : n
                    ? (this.handler.setCookie(e, n.data, n.meta.expiresAt, 'Lax', this.cookieDomain),
                      this.handler.setCookie(t, this.serializeMetaRecord(n.meta), n.meta.expiresAt, 'Lax', this.cookieDomain),
                      n)
                    : null;
            }
            set(e, t, r) {
              const n = dt(e),
                o = this.serializeMetaRecord({ writtenAt: new Date(), expiresAt: r });
              (this.handler.setDataInLocalStorage(e, t), this.handler.setDataInLocalStorage(n, o));
              const i = r || w(730);
              (this.handler.setCookie(e, t, i, 'Lax', this.cookieDomain), this.handler.setCookie(n, o, i, 'Lax', this.cookieDomain));
            }
          }
          function dt(e) {
            return `${e}_meta`;
          }
          const ut = () => {};
          function ht(e, t, r) {
            return t ? ut : e.wrap(r);
          }
          class ft {
            functions;
            constructor(e, t, r) {
              const n = new rt(e, 'CallHandler', t);
              ((this.functions = { ajaxGet: ht(n, r, 'ajaxGet'), pixelGet: ht(n, r, 'pixelGet') }), n.reportErrors());
            }
            ajaxGet(e, t, r, n, o) {
              this.functions.ajaxGet(e, t, r, n, o);
            }
            pixelGet(e, t) {
              this.functions.pixelGet(e, t);
            }
          }
          function pt(e) {
            return (t) =>
              'cookie' === t.idCookie?.strategy && 'string' == typeof t.idCookie?.name
                ? { ...t, resolvedIdCookie: e.getCookie(t.idCookie.name) }
                : 'localStorage' === t.idCookie?.strategy && 'string' == typeof t.idCookie?.name
                  ? { ...t, resolvedIdCookie: e.getDataFromLocalStorage(t.idCookie.name) }
                  : t;
          }
          const gt = {};
          function mt(e, t, r, n) {
            if (e && f(e))
              if ('config' in e)
                n.emitErrorWithMessage(
                  'StrayConfig',
                  'Received a config after LC has already been initialised',
                  new Error(JSON.stringify(e)),
                );
              else {
                const o = me.fromEvent(r, e, n);
                o.getHashedEmail().length > 0 ? (gt.hashedEmail = o.getHashedEmail()) : gt.hashedEmail && o.setHashedEmail(gt.hashedEmail);
                const i = () => n.emit(U, '0'),
                  a = () => n.emit(R, r);
                t.sendAjax(o, { onPreSend: i, onLoad: a });
              }
            else n.emitErrorWithMessage('EventNotAnObject', 'Received event was not an object', new Error(e));
          }
          function wt(e, t, r, n) {
            try {
              const i = {
                  ...xe(e, n),
                  identifiersToResolve: e.identifiersToResolve || [],
                  contextSelectors: e.contextSelectors || '',
                  contextElementsLength: e.contextElementsLength || 0,
                },
                a =
                  ((o = je(ke(i))),
                  { ...o, pageUrl: ve(), referrer: we(), contextElements: Ce(o.privacyMode, o.contextSelectors, o.contextElementsLength) }),
                s = new ft(r, n, a.privacyMode),
                c = st.make(a.storageStrategy, t, n),
                d = (function (e) {
                  return (t) => ({ ...t, cookieDomain: Re(e) });
                })(c)(a),
                u = new lt({ storageHandler: c, eventBus: n, cookieDomain: d.cookieDomain }),
                h = pt(c)(
                  Ke(
                    u,
                    c,
                  )(
                    qe(
                      c,
                      n,
                    )(
                      (function (e, t) {
                        return (r) => {
                          try {
                            return { ...r, ...be(Se(r.identifiersToResolve), e) };
                          } catch (e) {
                            return (t.emitError('IdentifiersEnricher', e), { ...r, retrievedIdentifiers: [], hashesFromIdentifiers: [] });
                          }
                        };
                      })(
                        c,
                        n,
                      )(d),
                    ),
                  ),
                ),
                f = new M({ collectorUrl: i.collectorUrl, ajaxTimeout: i.ajaxTimeout, eventBus: n, callHandler: s });
              et(h, f, n);
              const p = new Le(h, s, n),
                g = (...e) =>
                  (function (e, t, r, n) {
                    try {
                      e.forEach((e) => {
                        const o = e;
                        l(o) ? o.forEach((e) => mt(e, t, r, n)) : mt(o, t, r, n);
                      });
                    } catch (e) {
                      (console.error('Error sending events', e), n.emitErrorWithMessage('LCPush', 'Failed sending an event', e));
                    }
                  })(e, f, h, n);
              return {
                push: g,
                fire: () => g({}),
                peopleVerifiedId: h.peopleVerifiedId,
                ready: !0,
                resolve: p.resolve.bind(p),
                resolutionCallUrl: p.getUrl.bind(p),
                config: i,
                eventBus: n,
                storageHandler: c,
                cache: u,
              };
            } catch (e) {
              (console.error(e), n.emitErrorWithMessage('LCConstruction', 'Failed to build LC', e));
            }
            var o;
          }
          function vt(e, t, r, n) {
            const o = window[e.globalVarName] || [],
              i =
                (function (e) {
                  try {
                    if (window && window[e.globalVarName] && window[e.globalVarName].ready) {
                      const t =
                        window[e.globalVarName].config &&
                        (function (e, t) {
                          if (e.appId !== t.appId || e.wrapperName !== t.wrapperName || e.collectorUrl !== t.collectorUrl)
                            return {
                              appId: [e.appId, t.appId],
                              wrapperName: [e.wrapperName, t.wrapperName],
                              collectorUrl: [e.collectorUrl, t.collectorUrl],
                            };
                        })(window[e.globalVarName].config, e);
                      if (t) {
                        const r = new Error();
                        ((r.name = 'ConfigSent'), (r.message = 'Additional configuration received'));
                        const n = Me(e.globalVarName);
                        ((window[e.globalVarName].eventBus = n), n.emitErrorWithMessage('LCDuplication', JSON.stringify(t), r));
                      }
                      return window[e.globalVarName];
                    }
                  } catch (e) {
                    console.error('Could not initialize error bus');
                  }
                })(e) ||
                wt(e, t, r, n) ||
                o;
            if (l(o)) for (let e = 0; e < o.length; e++) i.push(o[e]);
            return (
              (window[i.config.globalVarName] = i),
              (window.liQ_instances = window.liQ_instances || []),
              0 === window.liQ_instances.filter((e) => e.config.globalVarName === i.config.globalVarName).length &&
                window.liQ_instances.push(i),
              i
            );
          }
          function Ct(e, t, r, n) {
            const o = (f(e) && e) || {},
              i = n || Ne();
            let a;
            try {
              a = o.globalVarName
                ? vt(o, t, r, i)
                : (function (e, t, r, n) {
                    const o = wt(e, t, r, n);
                    return ((window.liQ_instances = window.liQ_instances || []), window.liQ_instances.push(o), o);
                  })(o, t, r, i);
            } catch (e) {
              (console.error(e), i.emitErrorWithMessage('LCConstruction', 'Failed to build LC', e));
            }
            return a;
          }
          function yt(e, t) {
            const r = l(e) ? e : a(e).split(','),
              n = [];
            for (let e = 0; e < r.length; e++) {
              const o = d(r[e]),
                i = t.getCookie(o) || t.getDataFromLocalStorage(o);
              !i || X(a(i)) || z(a(i)) || n.push({ name: o, value: a(i) });
            }
            return n;
          }
          function Et(e, t, r, n, o) {
            try {
              const i = { ...xe(e, n), identifiersToResolve: e.identifiersToResolve || [] },
                a = je(ke(i)),
                s = at.make(a.storageStrategy, t, n),
                c = new ft(r, n, a.privacyMode),
                l = (function (e, t) {
                  return (r) => {
                    try {
                      return { ...r, retrievedIdentifiers: yt(r.identifiersToResolve, e) };
                    } catch (e) {
                      return (t.emitError('IdentifiersEnrich', e), { ...r, retrievedIdentifiers: [] });
                    }
                  };
                })(
                  s,
                  n,
                )(
                  pt(s)(
                    (function (e, t) {
                      return (r) => {
                        try {
                          return { ...r, peopleVerifiedId: r.peopleVerifiedId || e.getDataFromLocalStorage($) || void 0 };
                        } catch (e) {
                          return (t.emitError('PeopleVerifiedEnrich', e), r);
                        }
                      };
                    })(
                      s,
                      n,
                    )(a),
                  ),
                ),
                d = new Le(l, c, n);
              return {
                push: (e) => o(e),
                fire: () => o({}),
                peopleVerifiedId: l.peopleVerifiedId,
                ready: !0,
                resolve: d.resolve.bind(d),
                resolutionCallUrl: d.getUrl.bind(d),
                config: i,
                eventBus: n,
                storageHandler: s,
              };
            } catch (e) {
              console.error(e);
            }
          }
          function St(e, t, r, n) {
            const o = (f(e) && e) || {},
              i = n || Ne();
            try {
              return o.globalVarName
                ? (function (e, t, r, n) {
                    const o = (window[e.globalVarName] = window[e.globalVarName] || []),
                      i = Et(e, t, r, n, o.push.bind(o));
                    return (
                      (window.liQ_instances = window.liQ_instances || []),
                      0 === window.liQ_instances.filter((e) => e.config.globalVarName === i.config.globalVarName).length &&
                        window.liQ_instances.push(i),
                      i
                    );
                  })(o, t, r, i)
                : (function (e, t, r, n) {
                    const o = Et(e, t, r, n, () => {});
                    return ((window.liQ_instances = window.liQ_instances || []), window.liQ_instances.push(o), o);
                  })(o, t, r, i);
            } catch (e) {
              console.error(e);
            }
            return {};
          }
          const bt = function (e, t, r, n, o) {
            const i = 'minimal' === n,
              a = o || Ne();
            return (i ? St : Ct)((f(e) && e) || {}, t, r, a);
          };
        },
        8882(e, t, r) {
          var n = r(1748);
          r(2026);
          (0, n.E)('liveIntentIdSystem');
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 7045, 4950, 5024], () => {
          return ((t = 8882), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4426],
      {
        4977(e, t, o) {
          var r = o(1748),
            a = o(466),
            i = o(6665),
            n = o(2201),
            s = o(2592),
            c = o(1443),
            d = o(736);
          const l = 'panoramaId',
            p = `${l}_expiry`,
            m = '_cc_id',
            g = 'lotamePanoramaId',
            u = !1,
            f = (0, c.vM)({ moduleType: d.fW, moduleName: g });
          let v;
          const y = { name: 'lotamePanoramaId', storage: { type: 'cookie&html5', name: 'panoramaId' } };
          function h(e) {
            let t = null;
            return (I(u) && (t = f.getCookie(e, void 0)), null === t && E(u) && (t = f.getDataFromLocalStorage(e, void 0)), t);
          }
          function _(e, t) {
            let o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : (0, a.timestamp)() + 6048e5;
            if (e && t) {
              const r = new Date(o).toUTCString();
              (I() && f.setCookie(e, t, r, 'Lax', v, void 0), E() && f.setDataInLocalStorage(e, t, void 0));
            }
          }
          function x(e) {
            if (e) {
              if (I(u)) {
                const t = new Date(0).toUTCString();
                f.setCookie(e, '', t, 'Lax', v, void 0);
              }
              E(u) && f.removeDataFromLocalStorage(e, void 0);
            }
          }
          function I() {
            return !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
              ? f.cookiesAreEnabled() && y.storage.type.includes('cookie')
              : f.cookiesAreEnabled();
          }
          function E() {
            return !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
              ? f.hasLocalStorage() && y.storage.type.includes('html5')
              : f.hasLocalStorage();
          }
          const C = {
            name: g,
            gvlid: 95,
            decode: (e, t) => ((0, i.O8)(e) ? { lotamePanoramaId: e } : void 0),
            getId(e, t, o) {
              if (
                (function (e) {
                  let t = null;
                  if (void 0 !== e.storage) {
                    Object.assign(y.storage, y.storage, e.storage);
                    const o = 'Lotame ID module',
                      r = ['cookie', 'html5', 'cookie&html5'];
                    void 0 !== e.storage.name && e.storage.name !== l
                      ? ((0, a.logError)(`Misconfigured ${o}, "storage.name" is expected to be "${l}", actual is "${e.storage.name}"`),
                        (t = !0))
                      : 'undefined' === e.storage.type ||
                        r.includes(e.storage.type) ||
                        (0, a.logError)(
                          `Misconfigured ${o}, "storage.type" is expected to be one of "${r.join(', ')}", actual is "${e.storage.type}"`,
                        );
                  }
                  return t;
                })(e)
              )
                return;
              v = C.findRootDomain();
              const r = ((e && e.params) || {}).clientId,
                s = !(0, a.isEmpty)(r),
                c = (function () {
                  let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                  const t = { data: h(l), expiryTimestampMs: 0, clientExpiryTimestampMs: 0 };
                  try {
                    if (e) {
                      const o = h(`${p}_${e}`);
                      (0, i.O8)(o) && (t.clientExpiryTimestampMs = parseInt(o, 10));
                    }
                    const o = h(p);
                    (0, i.O8)(o) && (t.expiryTimestampMs = parseInt(o, 10));
                  } catch (e) {
                    (0, a.logError)(e);
                  }
                  return t;
                })(r),
                d = Date.now() > c.expiryTimestampMs;
              if (s) {
                if (Date.now() < c.clientExpiryTimestampMs) return { id: void 0, reason: 'NO_CLIENT_CONSENT' };
              }
              if (!d) return { id: c.data };
              const g = (function () {
                let e;
                return (I(u) && (e = f.getCookie(m, void 0)), !e && E(u) && (e = f.getDataFromLocalStorage(m, void 0)), e);
              })();
              return {
                callback: function (e) {
                  const o = {};
                  let c;
                  (g && (o.fp = g),
                    t && ((0, i.Lm)(t.gdpr?.gdprApplies) && (o.gdpr_applies = t.gdpr.gdprApplies), (c = t.gdpr?.consentString)),
                    c && (o.gdpr_consent = c),
                    s && (o.c = r));
                  const d = (0, a.buildUrl)({
                    protocol: 'https',
                    host:
                      navigator.userAgent && -1 !== navigator.userAgent.indexOf('Safari') && -1 === navigator.userAgent.indexOf('Chrome')
                        ? 'c.ltmsphrcl.net'
                        : 'id.crwdcntrl.net',
                    pathname: '/id',
                    search: (0, a.isEmpty)(o) ? void 0 : o,
                  });
                  (0, n.RD)(
                    d,
                    (t) => {
                      let o;
                      if (t)
                        try {
                          const n = JSON.parse(t),
                            c = !((0, i.cy)(n.errors) && -1 !== n.errors.indexOf(111));
                          if (s)
                            if (c) x(`${p}_${r}`);
                            else if ((0, i.O8)(n.no_consent) && 'CLIENT' === n.no_consent)
                              return (_(`${p}_${r}`, n.expiry_ts, n.expiry_ts), void e());
                          (_(p, n.expiry_ts, n.expiry_ts),
                            (0, i.O8)(n.profile_id)
                              ? (c &&
                                  (function (e) {
                                    if (I()) {
                                      const t = new Date((0, a.timestamp)() + 23328e6).toUTCString();
                                      f.setCookie(m, e, t, 'Lax', v, void 0);
                                    }
                                    E() && f.setDataInLocalStorage(m, e, void 0);
                                  })(n.profile_id),
                                (0, i.O8)(n.core_id) ? (_(l, n.core_id, n.expiry_ts), (o = n.core_id)) : x(l))
                              : (c && x(m), x(l)));
                        } catch (e) {
                          (0, a.logError)(e);
                        }
                      e(o);
                    },
                    void 0,
                    { method: 'GET', withCredentials: !0 },
                  );
                },
              };
            },
            eids: { lotamePanoramaId: { source: 'crwdcntrl.net', atype: 1 } },
          };
          ((0, s.bz)('userId', C), (0, r.E)('lotamePanoramaIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((t = 4977), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9600],
      {
        9943(t, e, n) {
          var i = n(1748),
            o = n(466),
            r = n(8928),
            a = n(3435),
            s = n(6665),
            d = n(3556),
            c = n(1933),
            u = n(9794),
            p = n(7464),
            l = n(356),
            m = n(2819),
            f = n(183),
            b = n(9012),
            g = n(4969),
            y = n(5568),
            h = n(8317),
            x = n(3457);
          const w = y.AS,
            v = 'trustedstack',
            _ = 'https://prebid.media.net/video/bundle.js',
            I = 0,
            A = 1,
            E = 2,
            O = 'client_timeout',
            S = 'client_bid_won',
            C = 'client_set_targeting',
            T = 'client_bidder_error';
          let $, U;
          ((window.mnet = window.mnet || {}), (window.mnet.queue = window.mnet.queue || []));
          const R = [{ code: v, gvlid: 1288 }];
          function W(t, e) {
            const n = e.refererInfo,
              i = {
                domain: (t = t || {}).domain || n.domain,
                page: t.page || n.page,
                ref: (0, b.B8)(t.ref),
                topMostLocation: n.topmostLocation,
                isTop: t.isTop || n.reachedTop,
              };
            return (
              $ ||
                ($ = (function () {
                  if ($) return $;
                  const t = (function (t, e) {
                    const n = (function (t, e) {
                      try {
                        const n = (0, o.getWindowTop)().document.querySelector(t);
                        if (null !== n && n[e]) return n[e];
                      } catch (t) {}
                    })(t, e);
                    return (
                      n &&
                      (function (t) {
                        const e = (0, o.getWindowTop)().document.createElement('a');
                        return ((e.href = t), e.href);
                      })(n)
                    );
                  })('link[rel="canonical"]', 'href');
                  return (($ = Object.assign({}, t && { canonical_url: t })), $);
                })()),
              Object.assign(i, $)
            );
          }
          function j(t) {
            return { w: parseInt(t[0], 10), h: parseInt(t[1], 10) };
          }
          function M(t, e) {
            const n = (0, r.A)(t, 'params'),
              a = (0, r.A)(e, 'gdprConsent'),
              s = (0, r.A)(e, 'uspConsent'),
              d = (0, r.A)(t, 'userId'),
              u = (0, r.A)(t, 'ortb2.source.ext.schain') || {},
              p = F.getWindowSize(),
              l = !(!a || !a.gdprApplies),
              m = !!s,
              b = !!c.$W.getConfig('coppa'),
              { top: g = -1, right: y = -1, bottom: h = -1, left: x = -1 } = (0, f.g)();
            return Object.assign(
              {},
              { customer_id: n.cid },
              { prebid_version: 'v10.29.0' },
              { gdpr_applies: l },
              l && { gdpr_consent_string: a.consentString || '' },
              { usp_applies: m },
              m && { usp_consent_string: s || '' },
              { coppa_applies: b },
              -1 !== p.w && -1 !== p.h && { screen: p },
              d && { user_id: d },
              (0, i.m)().medianetGlobals.analyticsEnabled && { analytics: !0 },
              !(0, o.isEmpty)(u) && { schain: u },
              { vcoords: { top_left: { x, y: g }, bottom_right: { x: y, y: h } } },
            );
          }
          function P(t, e) {
            const n = (0, m.p)(t.adUnitCode),
              i = {
                id: t.bidId,
                transactionId: t.ortb2Imp?.ext?.tid,
                ext: {
                  dfp_id: t.adUnitCode,
                  display_count: t.auctionsCount,
                  adUnitCode: t.adUnitCode,
                  divId: n.divId,
                  adUnitPath: n.gptSlot,
                },
                all: t.params,
              };
            t.ortb2Imp && (i.ortb2Imp = t.ortb2Imp);
            const a = (0, r.A)(t, 'mediaTypes.banner.sizes') || [],
              d = (0, r.A)(t, 'mediaTypes.video') || {},
              c = (0, r.A)(t, 'params.video') || {},
              p = Object.assign({}, c, d);
            var l;
            if (
              ((0, o.isEmpty)(p) || (i.video = p),
              a.length > 0 && (i.banner = ((l = a), (0, s.cy)(l) && 2 === l.length && !(0, s.cy)(l[0]) ? [j(l)] : l.map((t) => j(t)))),
              t.nativeParams)
            )
              try {
                i.native = JSON.stringify(t.nativeParams);
              } catch (t) {
                (0, o.logError)(`${w} : Incorrect JSON : bidRequest.nativeParams`);
              }
            t.params.crid && (i.tagid = t.params.crid.toString());
            const f = parseFloat(t.params.bidfloor || t.params.bidFloor);
            f && (i.bidfloor = f);
            const b = (function (t) {
              let e = document.getElementById(t);
              if (!e && -1 !== t.indexOf('/')) {
                const { divId: n } = (0, m.p)(t);
                (0, s.O8)(n) && (e = document.getElementById(n));
              }
              if (e) {
                const t = (0, h.G)(e),
                  n = {};
                return ((n.top_left = { y: t.top, x: t.left }), (n.bottom_right = { y: t.bottom, x: t.right }), n);
              }
              return null;
            })(t.adUnitCode);
            if (b && i.banner && 0 !== i.banner.length) {
              const t = (function (t) {
                const { scrollX: e, scrollY: n } = window;
                return {
                  top_left: { x: t.top_left.x + e, y: t.top_left.y + n },
                  bottom_right: { x: t.bottom_right.x + e, y: t.bottom_right.y + n },
                };
              })(b);
              ((i.ext.coordinates = t),
                (i.ext.viewability = q(b.top_left, (0, x.M$)(i.banner))),
                q(t.top_left, (0, x.M$)(i.banner)) > 0.5 ? (i.ext.visibility = A) : (i.ext.visibility = E));
            } else i.ext.visibility = I;
            const g = (function (t) {
              const e = [];
              'function' == typeof t.getFloor &&
                [u.D4, u.G_, u.s6].forEach((n) => {
                  t.mediaTypes.hasOwnProperty(n) &&
                    (n === u.D4
                      ? t.mediaTypes.banner.sizes.forEach((i) => {
                          k(t, n, i, e);
                        })
                      : k(t, n, '*', e));
                });
              return e;
            })(t);
            return (g && g.length > 0 && (i.bidfloors = g), e.paapi?.enabled && (i.ext.ae = t?.ortb2Imp?.ext?.ae), i);
          }
          function k(t, e, n, i) {
            const o = t.getFloor({ currency: 'USD', mediaType: e, size: n }) || {};
            (n.length > 1 && (o.size = n), (o.mediaType = e), i.push(o));
          }
          function q(t, e) {
            const n = e.w * e.h,
              i = F.getWindowSize(),
              o = { x: t.x + e.w, y: t.y + e.h };
            return 0 === n || -1 === i.w || -1 === i.h
              ? 0
              : (function (t, e, n, i) {
                  if (t.x > i.x || e.x < n.x || t.y > i.y || e.y < n.y) return 0;
                  return (Math.min(e.x, i.x) - Math.max(t.x, n.x)) * (Math.min(e.y, i.y) - Math.max(t.y, n.y));
                })(t, o, { x: 0, y: 0 }, { x: i.w, y: i.h }) / n;
          }
          function B(t, e) {
            const n = (0, s.Go)(t),
              i = (0, r.A)(e, '0.userIdAsEids');
            return (i && (0, a.J)(n, 'user.ext.eids', i), n);
          }
          function G(t) {
            const e = {};
            return (
              (0, s.cy)(t) || (t = []),
              t.forEach((t) => {
                const n = (function (t) {
                  const e = {};
                  ((e.acid = t.auctionId || ''),
                    (e.crid = (0, r.A)(t, 'params.crid') || (0, r.A)(t, 'params.0.crid') || t.adUnitCode || ''),
                    (e.ext = (0, o.safeJSONEncode)(t.ext) || ''));
                  const n = (0, s.Go)(t);
                  return (delete n.ad, delete n.vastXml, (e.rawobj = (0, o.safeJSONEncode)(n)), e);
                })(t);
                Object.keys(n).forEach((t) => {
                  ((e[t] = e[t] || []), e[t].push(encodeURIComponent(n[t])));
                });
              }),
              e
            );
          }
          function z(t, e) {
            const n = G(e);
            ((t.cid = U), (0, g.Fk)(t, n, !1).send());
          }
          function D(t) {
            const e = (0, r.A)(t, 'context') || '',
              n = (0, r.A)(t, 'vto');
            'outstream' === e &&
              n &&
              (t.renderer = (function () {
                const t = p.A4.install({ url: _ });
                return (
                  t.setRender(function (t) {
                    window.mnet.queue.push(function () {
                      const e = {
                          width: t.width,
                          height: t.height,
                          vastTimeout: t.vto,
                          maxAllowedVastTagRedirects: t.mavtr,
                          allowVpaid: t.avp,
                          autoPlay: t.ap,
                          preload: t.pl,
                          mute: t.mt,
                        },
                        n = t.dfp_id,
                        i = (0, m.p)(n).divId || n;
                      window.mnet.mediaNetoutstreamPlayer(t, i, e);
                    });
                  }),
                  t
                );
              })());
          }
          (0, i.m)().medianetGlobals = (0, i.m)().medianetGlobals || {};
          const F = {
            code: w,
            gvlid: y.P6,
            aliases: R,
            supportedMediaTypes: [u.D4, u.s6, u.G_],
            isBidRequestValid: function (t) {
              return t.params
                ? t.params.cid && (0, s.O8)(t.params.cid) && !(0, o.isEmptyStr)(t.params.cid)
                  ? ((U = t.params.cid), !0)
                  : ((0, o.logError)(`${w} : cid should be a string`), !1)
                : ((0, o.logError)(`${w} : Missing bid parameters`), !1);
            },
            buildRequests: function (t, e) {
              const n = (function (t, e) {
                return {
                  site: W(t[0].params.site, e),
                  ext: M(t[0], e),
                  id: t[0].auctionId,
                  imp: t.map((t) => P(t, e)),
                  ortb2: B(e.ortb2, t),
                  tmax: e.timeout,
                };
              })((t = (0, l.Xj)(t)), e);
              return {
                method: 'POST',
                url:
                  ((i = e.bidderCode),
                  (o = n.ext.customer_id),
                  (i === v ? 'https://prebid.trustedstack.com/rtb/trustedstack' : 'https://prebid.media.net/rtb/prebid') +
                    '?cid=' +
                    encodeURIComponent(o)),
                data: JSON.stringify(n),
              };
              var i, o;
            },
            interpretResponse: function (t, e) {
              let n = [];
              if (!t || !t.body) return ((0, o.logInfo)(`${w} : response is empty`), n);
              const i = t.body.bidList;
              (0, s.cy)(i) && 0 !== i.length
                ? ((n = i.filter((t) =>
                    (function (t) {
                      return !1 === t.no_bid && parseFloat(t.cpm) > 0;
                    })(t),
                  )),
                  n.forEach(D))
                : (0, o.logInfo)(`${w} : no bids`);
              const a = (0, r.A)(t, 'body.ext.paApiAuctionConfigs') || [],
                d = (0, r.A)(t, 'body.ext.igi') || [];
              return 0 === a.length && 0 === d.length
                ? n
                : (d.length > 0 &&
                    a.push(
                      ...d
                        .map((t) => {
                          let { igs: e } = t;
                          return e || [];
                        })
                        .flat(),
                    ),
                  { bids: n, paapi: a });
            },
            getUserSyncs: function (t, e) {
              const n =
                ((i = e), !(0, o.isEmpty)(i) && i[0].body && i[0].body.ext && (0, s.cy)(i[0].body.ext.csUrl) ? i[0].body.ext.csUrl : []);
              var i;
              return t.iframeEnabled ? (0, b.RW)(n, { type: 'iframe' }) : t.pixelEnabled ? (0, b.RW)(n, { type: 'image' }) : void 0;
            },
            onTimeout: (t) => {
              try {
                z({ name: O, value: t.length, relatedData: t[0].timeout || c.$W.getConfig('bidderTimeout') }, t);
              } catch (t) {}
            },
            onBidWon: (t) => {
              try {
                z({ name: S, value: t.cpm }, [t]);
              } catch (t) {}
            },
            onSetTargeting: (t) => {
              try {
                const e = { name: C, value: t.cpm };
                c.$W.getConfig('enableSendAllBids') || z(e, [t]);
              } catch (t) {}
            },
            onBidderError: (t) => {
              let { error: e, bidderRequest: n } = t;
              try {
                z({ name: T, relatedData: `timedOut:${e.timedOut}|status:${e.status}|message:${e.reason.message}` }, n.bids);
              } catch (t) {}
            },
            clearPageMeta: function () {
              $ = void 0;
            },
            getWindowSize: function () {
              return { w: window.screen.width || -1, h: window.screen.height || -1 };
            },
          };
          ((0, d.a$)(F), (0, i.E)('medianetBidAdapter'));
        },
      },
      (t) => {
        t.O(0, [802, 7769, 315, 1085, 3005, 2316, 1961, 8139], () => {
          return ((e = 9943), t((t.s = e)));
          var e;
        });
        t.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5767],
      {
        4454(e, a, d) {
          var t = d(1748),
            s = d(466),
            i = d(3435),
            r = d(1443),
            n = d(3556),
            o = d(9794),
            p = d(9201),
            m = d(6634),
            l = d(8317),
            g = d(1933);
          const c = 'nexx360',
            x = (0, s.generateUUID)(),
            b = (0, r.vM)({ bidderCode: c }),
            v =
              ((0, m.kD)(b, c, 'nexx360_storage', 'nexx360Id'),
              () => {
                const e = g.$W.getBidderConfig();
                return 'true' === e.nexx360?.gzipEnabled && 'true' === e.nexx360?.gzipEnabled;
              }),
            u = (0, p.A)({
              context: { netRevenue: !0, ttl: 90 },
              imp(e, a, d) {
                let t = e(a, d);
                t = (0, m.M2)(t, a);
                const s = a.params.divId || a.adUnitCode,
                  r = 'string' == typeof s ? document.getElementById(s) : null;
                if (r) {
                  const { width: e, height: a } = (0, l.G)(r);
                  ((0, i.J)(t, 'ext.dimensions.slotW', e),
                    (0, i.J)(t, 'ext.dimensions.slotH', a),
                    (0, i.J)(t, 'ext.dimensions.cssMaxW', r.style?.maxWidth),
                    (0, i.J)(t, 'ext.dimensions.cssMaxH', r.style?.maxHeight));
                }
                return (
                  (0, i.J)(t, 'ext.nexx360', a.params),
                  (0, i.J)(t, 'ext.nexx360.divId', s),
                  a.params.adUnitPath && (0, i.J)(t, 'ext.adUnitPath', a.params.adUnitPath),
                  a.params.adUnitName && (0, i.J)(t, 'ext.adUnitName', a.params.adUnitName),
                  t
                );
              },
              request(e, a, d, t) {
                let s = e(a, d, t);
                const i = (0, m.k6)(b, c);
                return ((s = (0, m.FY)(s, i, x, '7.1')), s);
              },
            }),
            h = {
              code: c,
              gvlid: 965,
              aliases: [
                { code: 'revenuemaker' },
                { code: 'first-id', gvlid: 1178 },
                { code: 'adwebone' },
                { code: 'league-m', gvlid: 965 },
                { code: 'prjads' },
                { code: 'pubtech' },
                { code: '1accord', gvlid: 965 },
                { code: 'easybid', gvlid: 1068 },
                { code: 'prismassp', gvlid: 965 },
                { code: 'spm', gvlid: 965 },
                { code: 'bidstailamedia', gvlid: 965 },
                { code: 'scoremedia', gvlid: 965 },
                { code: 'movingup', gvlid: 1416 },
                { code: 'glomexbidder', gvlid: 967 },
                { code: 'pubxai', gvlid: 1485 },
                { code: 'ybidder', gvlid: 1253 },
                { code: 'netads', gvlid: 965 },
              ],
              supportedMediaTypes: [o.D4, o.G_, o.s6],
              isBidRequestValid: (e) =>
                !e.params.adUnitName || ('string' == typeof e.params.adUnitName && '' !== e.params.adUnitName)
                  ? !e.params.adUnitPath || ('string' == typeof e.params.adUnitPath && '' !== e.params.adUnitPath)
                    ? !e.params.divId || ('string' == typeof e.params.divId && '' !== e.params.divId)
                      ? e.params.allBids && 'boolean' != typeof e.params.allBids
                        ? ((0, s.logError)('bid.params.allBids needs to be a boolean'), !1)
                        : !!(e.params.tagId || e.params.videoTagId || e.params.nativeTagId || e.params.placement) ||
                          ((0, s.logError)(
                            'bid.params.tagId or bid.params.videoTagId or bid.params.nativeTagId or bid.params.placement must be defined',
                          ),
                          !1)
                      : ((0, s.logError)('bid.params.divId needs to be a string'), !1)
                    : ((0, s.logError)('bid.params.adUnitPath needs to be a string'), !1)
                  : ((0, s.logError)('bid.params.adUnitName needs to be a string'), !1),
              buildRequests: (e, a) => ({
                method: 'POST',
                url: 'https://fast.nexx360.io/booster',
                data: u.toORTB({ bidRequests: e, bidderRequest: a }),
                options: { endpointCompression: v() },
              }),
              interpretResponse: m.xO,
              getUserSyncs: m.yY,
            };
          ((0, n.a$)(h), (0, t.E)('nexx360BidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 8498, 2316, 9147, 2068], () => {
          return ((a = 4454), e((e.s = a)));
          var a;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3206],
      {
        4229(e, t, o) {
          var r = o(1748),
            i = o(466),
            n = o(8928),
            s = o(3435),
            a = o(6665),
            d = o(3556),
            l = o(9794),
            g = o(1933),
            u = o(1124),
            p = o(7464),
            c = o(867),
            m = o(9547);
          const f = 'ozone',
            b = 'https://elb.the-ozone-project.com',
            h = 'oz',
            y = '4.0.2',
            I = {
              gvlid: 524,
              version: y,
              code: f,
              supportedMediaTypes: [l.G_, l.D4],
              cookieSyncBag: { publisherId: null, siteId: null, userIdObject: {} },
              propertyBag: { pageId: null, buildRequestsStart: 0, buildRequestsEnd: 0 },
              getAuctionUrl() {
                const e = g.$W.getConfig('ozone.endpointOverride') || {};
                if (e.auctionUrl) return e.auctionUrl;
                return (e.origin || b) + '/openrtb2/auction';
              },
              getCookieSyncUrl() {
                const e = g.$W.getConfig('ozone.endpointOverride') || {};
                if (e.cookieSyncUrl) return e.cookieSyncUrl;
                return (e.origin || b) + '/static/load-cookie.html';
              },
              getRendererUrl: () =>
                (g.$W.getConfig('ozone.endpointOverride') || {}).rendererUrl || 'https://prebid.the-ozone-project.com/ozone-renderer.js',
              getVideoPlacementValue: (e) =>
                ['instream', 'outstream'].indexOf(e) < 0 ? null : (0, n.A)(g.$W.getConfig('ozone.videoParams'), e),
              getBatchRequests() {
                const e = this.getGetParametersAsObject();
                if (e.batchRequests && e.batchRequests.toString().match(/^[0-9]+$/)) return parseInt(e.batchRequests);
                const t = g.$W.getConfig('ozone.batchRequests');
                return !0 === t ? 10 : 'number' == typeof t && t > 0 && t;
              },
              isBidRequestValid(e) {
                const t = 'VALIDATION FAILED';
                (0, i.logInfo)('isBidRequestValid : ', g.$W.getConfig(), e);
                const o = e.adUnitCode,
                  r = `${t} : missing {param} : siteId, placementId and publisherId are REQUIRED`;
                if (!(0, i.getBidIdParameter)('placementId', e.params))
                  return ((0, i.logError)(r.replace('{param}', 'placementId'), o), !1);
                if (!this.isValidPlacementId(e.params.placementId))
                  return ((0, i.logError)(`${t} : placementId must be exactly 10 numbers`, o), !1);
                if (!(0, i.getBidIdParameter)('publisherId', e.params))
                  return ((0, i.logError)(r.replace('{param}', 'publisherId'), o), !1);
                if (!e.params.publisherId.toString().match(/^[a-zA-Z0-9-]{12}$/))
                  return ((0, i.logError)(`${t} : publisherId must be /^[a-zA-Z0-9\\-]{12}$/`, o), !1);
                if (!(0, i.getBidIdParameter)('siteId', e.params)) return ((0, i.logError)(r.replace('{param}', 'siteId'), o), !1);
                if (!e.params.siteId.toString().match(/^[0-9]{10}$/))
                  return ((0, i.logError)(`${t} : siteId must be /^[0-9]{10}$/`, o), !1);
                if (e.params.hasOwnProperty('customParams'))
                  return ((0, i.logError)(`${t} : customParams should be renamed: customData`, o), !1);
                if (e.params.hasOwnProperty('customData')) {
                  if (!(0, a.cy)(e.params.customData)) return ((0, i.logError)(`${t} : customData is not an Array`, o), !1);
                  if (e.params.customData.length < 1) return ((0, i.logError)(`${t} : empty customData`, o), !1);
                  if (!e.params.customData[0].hasOwnProperty('targeting'))
                    return ((0, i.logError)(`${t} :no customData[0].targeting`, o), !1);
                  if ('object' != typeof e.params.customData[0].targeting)
                    return ((0, i.logError)(`${t} : customData[0].targeting is not an Object`, o), !1);
                }
                if (e.hasOwnProperty('mediaTypes') && e.mediaTypes.hasOwnProperty(l.G_)) {
                  if (!e.mediaTypes?.[l.G_]?.context) return ((0, i.logError)(`${t} No video context key/value`), !1);
                  if (['instream', 'outstream'].indexOf(e.mediaTypes?.[l.G_]?.context) < 0)
                    return ((0, i.logError)(`${t} video.context is invalid.`), !1);
                }
                return !0;
              },
              isValidPlacementId: (e) => e.toString().match(/^[0-9]{10}$/),
              buildRequests(e, t) {
                ((0, i.logInfo)('**TESTING CONFIG', g.$W.getConfig()), (this.propertyBag.buildRequestsStart = new Date().getTime()));
                const o = f,
                  r = h;
                if (
                  ((0, i.logInfo)(
                    `buildRequests time: ${this.propertyBag.buildRequestsStart} v ${y} validBidRequests`,
                    (0, a.Go)(e),
                    'bidderRequest',
                    (0, a.Go)(t),
                  ),
                  this.blockTheRequest())
                )
                  return [];
                const d = !!t.fledgeEnabled;
                let u = { publisherId: '', siteId: '' };
                (e.length > 0 &&
                  (Object.assign(this.cookieSyncBag.userIdObject, this.findAllUserIdsFromEids(e[0])),
                  (this.cookieSyncBag.siteId = (0, n.A)(e[0], 'params.siteId')),
                  (this.cookieSyncBag.publisherId = (0, n.A)(e[0], 'params.publisherId')),
                  (u = e[0].params)),
                  (0, i.logInfo)('cookie sync bag', this.cookieSyncBag));
                let p = g.$W.getConfig('ozone.singleRequest');
                p = !1 !== p;
                const b = { site: {}, regs: {}, user: {} },
                  I = (0, n.A)(t, 'ortb2', {}),
                  v = this.pruneToExtPaths(I, { maxTestDepth: 2 });
                ((0, i.logInfo)('got ortb2 fpd: ', I),
                  (0, i.logInfo)('got ortb2 fpdPruned: ', v),
                  (0, i.logInfo)('going to assign the pruned (ext only) FPD ortb2 object to ozoneRequest, wholesale'),
                  (0, i.mergeDeep)(b, v),
                  (0, m.GR)(b));
                const A = this.getGetParametersAsObject(),
                  _ = 'oztestmode',
                  x = A[_] || null;
                (0, i.mergeDeep)(b, { device: t?.ortb2?.device || {} });
                const $ = this.getPlacementIdOverrideFromGetParam();
                let D = null;
                var O = (0, n.A)(e, '0.ortb2.source.tid');
                '0' === O && (O = null);
                const T = e.map((e) => {
                    var t = {};
                    let r = this.pruneToExtPaths(e.ortb2Imp, { maxTestDepth: 2 });
                    ((0, i.logInfo)(
                      'merging into bid[] from pruned ozoneBidRequest.ortb2Imp (this includes adunits ortb2imp and gpid & tid from gptPreAuction if included',
                      r,
                    ),
                      (0, i.mergeDeep)(t, r));
                    const g = $ || this.getPlacementId(e);
                    ((t.id = e.bidId), (t.tagid = g), (t.secure = 'https' === (0, i.parseUrl)((0, c.EN)().page).protocol ? 1 : 0));
                    let u = [];
                    if (e.hasOwnProperty('mediaTypes')) {
                      if (
                        (e.mediaTypes.hasOwnProperty(l.D4) &&
                          ((u = e.mediaTypes[l.D4].sizes),
                          (0, i.logInfo)('setting banner size from mediaTypes.banner for bidId ' + t.id + ': ', u)),
                        e.mediaTypes.hasOwnProperty(l.G_))
                      ) {
                        if (((0, i.logInfo)('openrtb 2.5 compliant video'), 'object' == typeof e.mediaTypes[l.G_])) {
                          const o = (0, n.A)(e, 'params.video', {});
                          ((t.video = this.unpackVideoConfigIntoIABformat(e.mediaTypes[l.G_], o)),
                            (t.video = this.addVideoDefaults(t.video, e.mediaTypes[l.G_], o)));
                        }
                        const o = (function (e) {
                          let t = z(e);
                          if (!t) return null;
                          if (
                            t[0] &&
                            'object' == typeof t[0] &&
                            ((0, i.logInfo)('getWidthAndHeightFromVideoObject found nested array inside playerSize.', t[0]),
                            (t = t[0]),
                            'number' != typeof t[0] && 'string' != typeof t[0])
                          )
                            return (
                              (0, i.logError)(
                                'getWidthAndHeightFromVideoObject found non-number/string type inside the INNER array in playerSize. This is totally wrong - cannot continue.',
                                t[0],
                              ),
                              null
                            );
                          if (2 !== t.length)
                            return (
                              (0, i.logError)(
                                'getWidthAndHeightFromVideoObject found playerSize with length of ' +
                                  t.length +
                                  '. This is totally wrong - cannot continue.',
                              ),
                              null
                            );
                          return { w: t[0], h: t[1] };
                        })(t.video);
                        (0, i.logInfo)(`setting video object ${t.id} from mediaTypes.video: `, t.video, 'wh=', o);
                        const r = 'setting obj.video.format to be ';
                        if (o && 'object' == typeof o) {
                          ((t.video.w = o.w), (t.video.h = o.h));
                          const e = z(t.video);
                          e && Array.isArray(e[0])
                            ? ((0, i.logInfo)(`${r} an array of objects`), (t.video.ext.format = [o]))
                            : ((0, i.logInfo)(`${r} an object`), (t.video.ext.format = o));
                        } else (0, i.logWarn)(`Failed ${r} anything - bad config`);
                      }
                      (e.mediaTypes.hasOwnProperty(l.s6) &&
                        ((t.native = e.mediaTypes[l.s6]),
                        (0, i.logInfo)(`setting native object ${t.id} from mediaTypes.native element:`, t.native)),
                        e.hasOwnProperty('getFloor')
                          ? ((t.floor = this.getFloorObjectForAuction(e)), (0, i.logInfo)('obj.floor is : ', t.floor))
                          : (0, i.logInfo)('no getFloor property'));
                    } else
                      e.hasOwnProperty('sizes')
                        ? (u = e.sizes)
                        : (0, i.logInfo)('no mediaTypes or sizes array. Cannot set sizes for banner type');
                    if (
                      (u.length > 0 &&
                        (t.banner = { topframe: 1, w: u[0][0] || 0, h: u[0][1] || 0, format: u.map((e) => ({ w: e[0], h: e[1] })) }),
                      (t.placementId = g),
                      (0, i.mergeDeep)(t, { ext: { prebid: { storedrequest: { id: g } } } }),
                      (t.ext[o] = t.ext[o] || {}),
                      (t.ext[o].adUnitCode = e.adUnitCode),
                      e.params.hasOwnProperty('customData') && (t.ext[o].customData = e.params.customData),
                      e.params.hasOwnProperty('ozFloor'))
                    ) {
                      const r = parseFloat(e.params.ozFloor);
                      isNaN(r)
                        ? (0, i.logError)(`Ignoring invalid ozFloor value for adunit code: ${e.adUnitCode}`)
                        : (t.ext[o].ozFloor = r);
                    }
                    if (((0, i.logInfo)(`obj.ext.${o} is `, t.ext[o]), null != x))
                      if (((0, i.logInfo)(`setting isTestMode: ${x}`), t.ext[o].hasOwnProperty('customData')))
                        for (let e = 0; e < t.ext[o].customData.length; e++) t.ext[o].customData[e].targeting[_] = x;
                      else ((t.ext[o].customData = [{ settings: {}, targeting: {} }]), (t.ext[o].customData[0].targeting[_] = x));
                    if (
                      (I &&
                        (0, n.A)(I, 'site') &&
                        ((0, i.logInfo)('adding fpd.site'),
                        (0, n.A)(t, `ext.${o}.customData.0.targeting`, !1)
                          ? Object.assign(t.ext[o].customData[0].targeting, I.site)
                          : (0, s.J)(t, `ext.${o}.customData.0.targeting`, I.site)),
                      !D && (0, n.A)(e, 'ortb2.source.ext.schain') && (D = e.ortb2.source.ext.schain),
                      O && (t.ext.auctionId = O),
                      d)
                    ) {
                      const o = (0, n.A)(e, 'ortb2Imp.ext.ae');
                      (0, a.Fq)(o)
                        ? (0, s.J)(t, 'ext.ae', o)
                        : (0, i.logError)(`ignoring ortb2Imp.ext.ae - not an integer for obj.id=${t.id}`);
                    }
                    return t;
                  }),
                  R = {};
                if (((R[o] = {}), (R[o][`${r}_pb_v`] = y), (R[o][`${r}_rw`] = $ ? 1 : 0), e.length > 0)) {
                  const e = this.cookieSyncBag.userIdObject;
                  e.hasOwnProperty('pubcid.org') && (R[o].pubcid = e['pubcid.org']);
                }
                R[o].pv = this.getPageId();
                const w = g.$W.getConfig('ozone.oz_omp_floor');
                ((0, i.logInfo)(`${r}_omp_floor dollar value = `, w),
                  'number' == typeof w
                    ? (R[o][`${r}_omp_floor`] = w)
                    : void 0 !== w && (0, i.logError)(`IF set, ${r}_omp_floor must be a number eg. 1.55. Found:` + typeof w));
                const S = g.$W.getConfig('ozone.oz_whitelist_adserver_keys'),
                  B = (0, a.cy)(S) && S.length > 0;
                R[o].oz_kvp_rw = B ? 1 : 0;
                const P = g.$W.getConfig('ozone.endpointOverride');
                (P?.origin || P?.auctionUrl) && (R[o].origin = P.auctionUrl || P.origin);
                const j = (0, n.A)(e, '0.userIdAsEids', []);
                if (
                  ((0, i.mergeDeep)(b.site, { publisher: { id: u.publisherId }, page: (0, c.EN)().page, id: u.siteId }),
                  (b.test = g.$W.getConfig('debug') ? 1 : 0),
                  t && t.gdprConsent)
                ) {
                  (0, i.logInfo)('ADDING GDPR');
                  const e = (0, n.A)(t, 'gdprConsent.apiVersion', 1);
                  ((0, i.mergeDeep)(b.regs, { ext: { gdpr: t.gdprConsent.gdprApplies ? 1 : 0, apiVersion: e } }),
                    t.gdprConsent.gdprApplies
                      ? (0, s.J)(b, 'user.ext.consent', t.gdprConsent.consentString)
                      : (0, i.logWarn)(
                          '**** Strange CMP info: bidderRequest.gdprConsent exists BUT bidderRequest.gdprConsent.gdprApplies is false. See bidderRequest logged above. ****',
                        ));
                } else (0, i.logInfo)('WILL NOT ADD GDPR info; no bidderRequest.gdprConsent object');
                (t && t.uspConsent
                  ? ((0, i.logInfo)('ADDING USP consent info'), (0, s.J)(b, 'regs.ext.us_privacy', t.uspConsent))
                  : (0, i.logInfo)('WILL NOT ADD USP consent info; no bidderRequest.uspConsent.'),
                  t?.ortb2?.regs?.gpp &&
                    ((0, s.J)(b, 'regs.ext.gpp', t.ortb2.regs.gpp), (0, s.J)(b, 'regs.ext.gpp_sid', t.ortb2.regs.gpp_sid)),
                  D && ((0, i.logInfo)('schain found'), (0, s.J)(b, 'source.ext.schain', D)),
                  !0 === g.$W.getConfig('coppa') && (0, s.J)(b, 'regs.coppa', 1),
                  (R[o].cookieDeprecationLabel = (0, n.A)(t, 'ortb2.device.ext.cdep', 'none')),
                  (0, i.logInfo)(`cookieDeprecationLabel ortb2.device.ext.cdep = ${R[o].cookieDeprecationLabel}`));
                const q = this.getBatchRequests();
                if ('number' == typeof q) {
                  (0, i.logInfo)(`Batching = ${q}`);
                  const e = [];
                  for (let o = 0; o < T.length; o += q)
                    ((b.id = (0, i.generateUUID)()),
                      (0, i.mergeDeep)(b, { user: { ext: { eids: j } } }),
                      O && (0, s.J)(b, 'source.tid', O),
                      (b.imp = T.slice(o, o + q)),
                      (0, i.mergeDeep)(b, { ext: R }),
                      (0, m.GR)(b),
                      b.imp.length > 0 && e.push({ method: 'POST', url: this.getAuctionUrl(), data: JSON.stringify(b), bidderRequest: t }));
                  return (
                    (this.propertyBag.buildRequestsEnd = new Date().getTime()),
                    (0, i.logInfo)(
                      `buildRequests batch request going to return at time ${this.propertyBag.buildRequestsEnd} (took ${this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart}ms):`,
                      e,
                    ),
                    e
                  );
                }
                if (p) {
                  ((0, i.logInfo)('single request starting'),
                    (b.id = (0, i.generateUUID)()),
                    (b.imp = T),
                    (0, i.mergeDeep)(b, { ext: R }),
                    (0, m.GR)(b),
                    (0, i.mergeDeep)(b, { user: { ext: { eids: j } } }),
                    O && (0, s.J)(b, 'source.tid', O));
                  var E = { method: 'POST', url: this.getAuctionUrl(), data: JSON.stringify(b), bidderRequest: t };
                  return (
                    (this.propertyBag.buildRequestsEnd = new Date().getTime()),
                    (0, i.logInfo)(
                      `buildRequests going to return for single at time ${this.propertyBag.buildRequestsEnd} (took ${this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart}ms): `,
                      (0, a.Go)(E),
                    ),
                    E
                  );
                }
                const C = T.map((e) => {
                  (0, i.logInfo)('non-single response, working on imp : ', e);
                  const o = Object.assign({}, b);
                  return (
                    (o.id = (0, i.generateUUID)()),
                    (o.imp = [e]),
                    (0, i.mergeDeep)(o, { ext: R }),
                    (0, i.mergeDeep)(o, { user: { ext: { eids: j } } }),
                    O && (0, s.J)(o, 'source.tid', O),
                    (0, m.GR)(o),
                    { method: 'POST', url: this.getAuctionUrl(), data: JSON.stringify(o), bidderRequest: t }
                  );
                });
                return (
                  (this.propertyBag.buildRequestsEnd = new Date().getTime()),
                  (0, i.logInfo)(
                    `buildRequests going to return for non-single at time ${this.propertyBag.buildRequestsEnd} (took ${this.propertyBag.buildRequestsEnd - this.propertyBag.buildRequestsStart}ms): `,
                    C,
                  ),
                  C
                );
              },
              getFloorObjectForAuction(e) {
                const t = {
                  banner: (0, n.A)(e, 'mediaTypes.banner.sizes', null),
                  video: (0, n.A)(e, 'mediaTypes.video.playerSize', null),
                  native: (0, n.A)(e, 'mediaTypes.native.image.sizes', null),
                };
                (0, i.logInfo)('getFloorObjectForAuction mediaTypesSizes : ', t);
                const o = {};
                return (
                  t.banner && (o.banner = e.getFloor({ mediaType: 'banner', currency: 'USD', size: t.banner[0] })),
                  t.video && (o.video = e.getFloor({ mediaType: 'video', currency: 'USD', size: t.video[0] })),
                  t.native && (o.native = e.getFloor({ mediaType: 'native', currency: 'USD', size: t.native[0] })),
                  (0, i.logInfo)('getFloorObjectForAuction returning : ', (0, a.Go)(o)),
                  o
                );
              },
              interpretResponse(e, t) {
                const o = new Date().getTime(),
                  r = f;
                ((0, i.logInfo)(
                  `interpretResponse time: ${o} . Time between buildRequests done and interpretResponse start was ${o - this.propertyBag.buildRequestsEnd}ms`,
                ),
                  (0, i.logInfo)('serverResponse, request', (0, a.Go)(e), (0, a.Go)(t)));
                const s = (e = e.body || {}).id;
                if (!e.hasOwnProperty('seatbid')) return [];
                if ('object' != typeof e.seatbid) return [];
                const d = [];
                let u,
                  p = g.$W.getConfig('ozone.enhancedAdserverTargeting');
                ((0, i.logInfo)('enhancedAdserverTargeting', p),
                  void 0 === p && (p = !0),
                  (0, i.logInfo)('enhancedAdserverTargeting', p),
                  (e.seatbid = (function (e) {
                    (0, i.logInfo)('injectAdIdsIntoAllBidResponses', (0, a.Go)(e));
                    for (let t = 0; t < e.length; t++) {
                      const o = e[t];
                      for (let e = 0; e < o.bid.length; e++) o.bid[e].adId = `${o.bid[e].impid}-${t}-${h}-${e}`;
                    }
                    return e;
                  })(e.seatbid)),
                  (e.seatbid = this.removeSingleBidderMultipleBids(e.seatbid)));
                const c = g.$W.getConfig('ozone.oz_omp_floor'),
                  m = 'number' == typeof c,
                  b = g.$W.getConfig('ozone.oz_whitelist_adserver_keys'),
                  I = (0, a.cy)(b) && b.length > 0;
                for (let o = 0; o < e.seatbid.length; o++) {
                  const g = e.seatbid[o];
                  for (let f = 0; f < g.bid.length; f++) {
                    const h = this.getBidRequestForBidId(g.bid[f].impid, t.bidderRequest.bids);
                    (0, i.logInfo)(`seatbid:${o}, bid:${f} Going to set default w h for seatbid/bidRequest`, g.bid[f], h);
                    const { defaultWidth: z, defaultHeight: D } = v(h),
                      T = $(g.bid[f], z, D);
                    T.meta = { advertiserDomains: T.adomain || [] };
                    let R = null,
                      w = !1;
                    const S = (0, n.A)(T, 'ext.prebid.type');
                    (0, i.logInfo)(`this bid type is : ${S}`);
                    let B = {};
                    if (S === l.G_)
                      if (
                        ((w = !0),
                        this.setBidMediaTypeIfNotExist(T, l.G_),
                        (R = this.getVideoContextForBidId(T.bidId, t.bidderRequest.bids)),
                        'outstream' === R)
                      )
                        ((0, i.logInfo)('setting thisBid.mediaType = VIDEO & attach a renderer to OUTSTREAM video'),
                          (T.renderer = O(T.bidId)),
                          (T.vastUrl = `https://${(0, n.A)(T, 'ext.prebid.targeting.hb_cache_host', 'missing_host')}${(0, n.A)(T, 'ext.prebid.targeting.hb_cache_path', 'missing_path')}?uuid=${(0, n.A)(T, 'ext.prebid.targeting.hb_uuid', 'missing_uuid')}`),
                          (T.vastXml = T.adm));
                      else if (
                        ((0, i.logInfo)(
                          'not an outstream video (presumably instream), will set thisBid.mediaType = VIDEO and thisBid.vastUrl and not attach a renderer',
                        ),
                        (T.vastUrl = `https://${(0, n.A)(T, 'ext.prebid.targeting.hb_cache_host', 'missing_host')}${(0, n.A)(T, 'ext.prebid.targeting.hb_cache_path', 'missing_path')}?uuid=${(0, n.A)(T, 'ext.prebid.targeting.hb_uuid', 'missing_uuid')}`),
                        T.hasOwnProperty('videoCacheKey'))
                      )
                        (0, i.logInfo)('videoCacheKey already exists on the bid object, will not add it');
                      else {
                        const e = (0, n.A)(T, 'ext.prebid.targeting.hb_uuid', 'no_hb_uuid');
                        ((0, i.logInfo)(`Adding videoCacheKey: ${e}`), (T.videoCacheKey = e));
                      }
                    else this.setBidMediaTypeIfNotExist(T, l.D4);
                    if (((B = Object.assign(B, (0, n.A)(T, 'ext.prebid.targeting', {}))), p)) {
                      const t = _(T.bidId, e.seatbid, z, D);
                      ((0, i.logInfo)('Going to iterate allBidsForThisBidId', (0, a.Go)(t)),
                        Object.keys(t).forEach((e, o, s) => {
                          ((0, i.logInfo)(`adding adserverTargeting for ${e} for bidId ${T.bidId}`),
                            (B['oz_' + e] = e),
                            (B['oz_' + e + '_crid'] = String(t[e].crid)),
                            (B['oz_' + e + '_adv'] = String(t[e].adomain)),
                            (B['oz_' + e + '_adId'] = String(t[e].adId)),
                            (B['oz_' + e + '_pb_r'] = x(t[e].price, t[e].ext.prebid.type)),
                            (B['oz_' + e + '_size'] = String(t[e].width) + 'x' + String(t[e].height)),
                            t[e].hasOwnProperty('dealid') && (B['oz_' + e + '_dealid'] = String(t[e].dealid)),
                            m && (B['oz_' + e + '_omp'] = t[e].price >= c ? '1' : '0'),
                            w && (B['oz_' + e + '_vid'] = R));
                          const a = (0, n.A)(t[e], `ext.bidder.${r}.floor`, null);
                          null != a && (B['oz_' + e + '_flr'] = a);
                          const d = (0, n.A)(t[e], `ext.bidder.${r}.ruleId`, null);
                          (null != d && (B['oz_' + e + '_rid'] = d),
                            e.match(/^ozappnexus/) && (B['oz_' + e + '_sid'] = String(t[e].cid)),
                            (u = (0, n.A)(t[e], 'ext.prebid.labels', null) || (0, n.A)(t[e], 'ext.bidder.prebid.label', null)),
                            u && (B['oz_' + e + '_labels'] = u.join(',')));
                        }));
                    } else {
                      const e = `${r}.enhancedAdserverTargeting is set to false. No per-bid keys will be sent to adserver.`;
                      I ? (0, i.logWarn)(`Your adserver keys whitelist will be ignored - ${e}`) : (0, i.logInfo)(e);
                    }
                    let { seat: P, bid: j } = A(T.bidId, e.seatbid);
                    ((j = $(j, z, D)),
                      (B.oz_auc_id = String(s)),
                      (B.oz_winner = String(P)),
                      (B.oz_bid = 'true'),
                      (B.oz_cache_id = (0, n.A)(T, 'ext.prebid.targeting.hb_cache_id', 'no-id')),
                      (B.oz_uuid = (0, n.A)(T, 'ext.prebid.targeting.hb_uuid', 'no-id')),
                      p &&
                        ((u = (0, n.A)(j, 'ext.prebid.labels', null) || (0, n.A)(j, 'ext.bidder.prebid.label', null)),
                        u && (B.oz_labels = u.join(',')),
                        (B.oz_imp_id = String(j.impid)),
                        (B.oz_pb_v = y),
                        (B.oz_pb = j.price),
                        (B.oz_pb_r = x(j.price, S)),
                        (B.oz_adId = String(j.adId)),
                        (B.oz_size = `${j.width}x${j.height}`)),
                      I &&
                        ((0, i.logInfo)('Filtering out adserver targeting keys not in the whitelist: ', b),
                        Object.keys(B).forEach(function (e) {
                          -1 === b.indexOf(e) && delete B[e];
                        })),
                      (T.adserverTargeting = B),
                      d.push(T));
                  }
                }
                let z = d,
                  D = (0, n.A)(e, 'ext.igi') || [];
                (0, a.cy)(D) &&
                  D.length > 0 &&
                  ((D = D.filter(
                    (e) => ('object' == typeof e && null !== e) || ((0, i.logWarn)('Removing malformed fledge auction config:', e), !1),
                  )),
                  (z = { bids: d, fledgeAuctionConfigs: D }));
                const T = new Date().getTime();
                return (
                  (0, i.logInfo)(
                    `interpretResponse going to return at time ${T} (took ${T - o}ms) Time from buildRequests Start -> interpretRequests End = ${T - this.propertyBag.buildRequestsStart}ms`,
                  ),
                  (0, i.logInfo)('will return: ', (0, a.Go)(z)),
                  z
                );
              },
              setBidMediaTypeIfNotExist(e, t) {
                e.hasOwnProperty('mediaType')
                  ? (0, i.logInfo)(`found value for thisBid.mediaType: ${e.mediaType}`)
                  : ((0, i.logInfo)(`setting thisBid.mediaType = ${t}`), (e.mediaType = t));
              },
              removeSingleBidderMultipleBids(e) {
                var t = [];
                for (let n = 0; n < e.length; n++) {
                  const s = e[n];
                  var o = { seat: s.seat, bid: [] },
                    r = [];
                  for (let e = 0; e < s.bid.length; e++) {
                    var i = s.bid[e];
                    if (!r.includes(i.impid)) {
                      r.push(i.impid);
                      for (let t = e + 1; t < s.bid.length; t++) s.bid[t].impid === i.impid && s.bid[t].price > i.price && (i = s.bid[t]);
                      o.bid.push(i);
                    }
                  }
                  t.push(o);
                }
                return t;
              },
              getUserSyncs(e, t, o, r) {
                let s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
                if (
                  ((0, i.logInfo)(
                    'getUserSyncs optionsType',
                    e,
                    'serverResponse',
                    t,
                    'gdprConsent',
                    o,
                    'usPrivacy',
                    r,
                    'cookieSyncBag',
                    this.cookieSyncBag,
                  ),
                  !t || 0 === t.length)
                )
                  return [];
                const { gppString: a = '', applicableSections: d = [] } = s;
                if (e.iframeEnabled) {
                  const e = [];
                  (g.$W.getConfig('debug') && e.push('pbjs_debug=true'),
                    e.push('gdpr=' + ((0, n.A)(o, 'gdprApplies', !1) ? '1' : '0')),
                    e.push('gdpr_consent=' + (0, n.A)(o, 'consentString', '')),
                    e.push('usp_consent=' + (r || '')),
                    e.push('gpp=' + a),
                    Array.isArray(d) && e.push(`gpp_sid=${d.join()}`));
                  for (const t in this.cookieSyncBag.userIdObject) e.push(t + '=' + this.cookieSyncBag.userIdObject[t]);
                  (e.push('publisherId=' + this.cookieSyncBag.publisherId),
                    e.push('siteId=' + this.cookieSyncBag.siteId),
                    e.push('cb=' + Date.now()),
                    e.push('bidder=' + f));
                  let t = e.join('&');
                  return (
                    t.length > 0 && (t = '?' + t),
                    (0, i.logInfo)('getUserSyncs going to return cookie sync url : ' + this.getCookieSyncUrl() + t),
                    [{ type: 'iframe', url: this.getCookieSyncUrl() + t }]
                  );
                }
              },
              getBidRequestForBidId(e, t) {
                for (let o = 0; o < t.length; o++) if (t[o].bidId === e) return t[o];
                return null;
              },
              getVideoContextForBidId(e, t) {
                const o = this.getBidRequestForBidId(e, t);
                return null != o ? (0, n.A)(o, 'mediaTypes.video.context', 'unknown') : null;
              },
              findAllUserIdsFromEids(e) {
                const t = {};
                let o = e.userIdAsEids || [];
                for (const e of o) t[e.source] = (0, n.A)(e, 'uids.0.id');
                return (this.tryGetPubCidFromOldLocation(t, e), t);
              },
              tryGetPubCidFromOldLocation(e, t) {
                if (!e.hasOwnProperty('pubcid')) {
                  const o = (0, n.A)(t, 'crumbs.pubcid');
                  o && (e['pubcid.org'] = o);
                }
              },
              getPlacementId: (e) => e.params.placementId.toString(),
              getPlacementIdOverrideFromGetParam() {
                const e = this.getGetParametersAsObject();
                if (e.hasOwnProperty('ozstoredrequest')) {
                  if (this.isValidPlacementId(e.ozstoredrequest))
                    return (
                      (0, i.logInfo)(`using GET ${h}storedrequest=` + e.ozstoredrequest + ' to replace placementId'),
                      e.ozstoredrequest
                    );
                  (0, i.logError)(`GET ${h}storedrequest FAILED VALIDATION - will not use it`);
                }
                return null;
              },
              getGetParametersAsObject() {
                const e = (0, i.parseUrl)((0, c.EN)().location);
                return ((0, i.logInfo)('getGetParametersAsObject found:', e.search), e.search);
              },
              blockTheRequest: () =>
                !1 === g.$W.getConfig('ozone.oz_request') &&
                ((0, i.logWarn)('Will not allow the auction : oz_request is set to false'), !0),
              getPageId: function () {
                if (null == this.propertyBag.pageId) {
                  let e = '';
                  const t = '0123456789abcdefghijklmnopqrstuvwxyz';
                  for (let o = 20; o > 0; o--) e += t[Math.floor(36 * Math.random())];
                  this.propertyBag.pageId = new Date().getTime() + '_' + e;
                }
                return this.propertyBag.pageId;
              },
              unpackVideoConfigIntoIABformat(e, t) {
                let o = { ext: {} };
                return ((o = this._unpackVideoConfigIntoIABformat(o, e)), (o = this._unpackVideoConfigIntoIABformat(o, t)), o);
              },
              _unpackVideoConfigIntoIABformat(e, t) {
                const o = [
                  'mimes',
                  'minduration',
                  'maxduration',
                  'protocols',
                  'w',
                  'h',
                  'startdelay',
                  'placement',
                  'plcmt',
                  'linearity',
                  'skip',
                  'skipmin',
                  'skipafter',
                  'sequence',
                  'battr',
                  'maxextended',
                  'minbitrate',
                  'maxbitrate',
                  'boxingallowed',
                  'playbackmethod',
                  'playbackend',
                  'delivery',
                  'pos',
                  'companionad',
                  'api',
                  'companiontype',
                ];
                for (const i in t) {
                  var r = !1;
                  (o.forEach(function (o) {
                    o === i && ((e[i] = t[i]), (r = !0));
                  }),
                    r || (e.ext[i] = t[i]));
                }
                return (
                  t.hasOwnProperty('ext') &&
                    'object' == typeof t.ext &&
                    (e.hasOwnProperty('ext') ? (e.ext = (0, i.mergeDeep)(e.ext, t.ext)) : (e.ext = t.ext)),
                  e
                );
              },
              addVideoDefaults(e, t, o) {
                const r = (t, o) => {
                  if (!t) return;
                  const r = this.getVideoPlacementValue((0, n.A)(t, 'context'));
                  r && (e.placement = r);
                  const i = (0, n.A)(t, 'skippable', null);
                  null == i ? o && !e.hasOwnProperty('skip') && (e.skip = 0) : (e.skip = i ? 1 : 0);
                };
                return (r(t, !1), r(o, !0), e);
              },
              getLoggableBidObject(e) {
                const t = {
                  ad: e.ad,
                  adId: e.adId,
                  adUnitCode: e.adUnitCode,
                  adm: e.adm,
                  adomain: e.adomain,
                  adserverTargeting: e.adserverTargeting,
                  auctionId: e.auctionId,
                  bidId: e.bidId,
                  bidder: e.bidder,
                  bidderCode: e.bidderCode,
                  cpm: e.cpm,
                  creativeId: e.creativeId,
                  crid: e.crid,
                  currency: e.currency,
                  h: e.h,
                  w: e.w,
                  impid: e.impid,
                  mediaType: e.mediaType,
                  params: e.params,
                  price: e.price,
                  transactionId: e.transactionId,
                  ttl: e.ttl,
                  ortb2: (0, n.A)(e, 'ortb2'),
                  ortb2Imp: (0, n.A)(e, 'ortb2Imp'),
                };
                return (e.hasOwnProperty('floorData') && (t.floorData = e.floorData), t);
              },
              pruneToExtPaths: function (e) {
                let { testKey: t = 'ext', maxTestDepth: o = 1 / 0 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const r = (e) => e && 'object' == typeof e && !Array.isArray(e),
                  i = (e) => {
                    if (Array.isArray(e)) return e.map(i);
                    if (r(e)) {
                      const t = {};
                      for (const [o, r] of Object.entries(e)) t[o] = i(r);
                      return t;
                    }
                    return e;
                  },
                  n = (e) => null == e || (Array.isArray(e) ? 0 === e.length : !!r(e) && 0 === Object.keys(e).length);
                const s = (function e(r, s, a) {
                  if (null == r) return;
                  if ('object' != typeof r) return s ? r : void 0;
                  if (s) return i(r);
                  if (Array.isArray(r)) {
                    const t = r.map((t) => e(t, !1, a)).filter((e) => void 0 !== e && !n(e));
                    return t.length ? t : void 0;
                  }
                  const d = {};
                  for (const [i, s] of Object.entries(r)) {
                    const r = a + 1,
                      l = e(s, i === t && r <= o, r);
                    void 0 === l || n(l) || (d[i] = l);
                  }
                  return Object.keys(d).length ? d : void 0;
                })(e, !1, 0);
                return s ?? (Array.isArray(e) ? [] : {});
              },
            };
          function v(e) {
            if (!e)
              return (
                (0, i.logInfo)('defaultSize received empty bid obj! going to return fixed default size'),
                { defaultHeight: 250, defaultWidth: 300 }
              );
            const t = e.sizes || [],
              o = Array.isArray(t[0]) ? t[0] : t;
            return { defaultWidth: o[0], defaultHeight: o[1] };
          }
          function A(e, t) {
            let o = null,
              r = null;
            for (let i = 0; i < t.length; i++) {
              const n = t[i].bid,
                s = t[i].seat;
              for (let t = 0; t < n.length; t++)
                if (n[t].impid === e && (null == o || o.price < n[t].price)) {
                  ((o = n[t]), (r = s));
                  break;
                }
            }
            return { seat: r, bid: o };
          }
          function _(e, t, o, r) {
            const i = {};
            for (let n = 0; n < t.length; n++) {
              const s = t[n].bid,
                a = t[n].seat;
              for (let t = 0; t < s.length; t++)
                s[t].impid === e &&
                  (i.hasOwnProperty(a) ? i[a].price < s[t].price && (i[a] = $(s[t], o, r)) : ((i[a] = s[t]), (i[a] = $(s[t], o, r))));
            }
            return i;
          }
          function x(e, t) {
            const o = g.$W.getConfig(`mediaTypePriceGranularity.${t}`);
            let r = 'auto',
              n = g.$W.getConfig('customPriceBucket');
            if ('string' == typeof o) r = o;
            else if ('object' == typeof o) ((r = 'custom'), (n = o));
            else {
              const e = g.$W.getConfig('priceGranularity');
              ('string' == typeof e && (r = e), 'custom' === e && (r = 'custom'));
            }
            const s = (0, u.j)(e, n, g.$W.getConfig('currency.granularityMultiplier'));
            return (
              (0, i.logInfo)('getRoundedBid price:', e, 'mediaType:', t, 'bucketKey:', r),
              s[{ medium: 'med', custom: 'custom', high: 'high', low: 'low', dense: 'dense' }[r] || 'auto']
            );
          }
          function $(e, t, o) {
            return (
              (e.cpm = e.price),
              (e.bidId = e.impid),
              (e.requestId = e.impid),
              (e.width = e.w || t),
              (e.height = e.h || o),
              (e.ad = e.adm),
              (e.netRevenue = !0),
              (e.creativeId = e.crid),
              (e.currency = 'USD'),
              (e.ttl = 300),
              e
            );
          }
          function z(e) {
            (0, i.logInfo)('getPlayerSizeFromObject received object', e);
            let t = (0, n.A)(e, 'playerSize');
            return (
              t || (t = (0, n.A)(e, 'ext.playerSize')),
              t
                ? 'object' != typeof t
                  ? ((0, i.logError)('getPlayerSizeFromObject FAILED: playerSize is not an object/array', e), null)
                  : t
                : ((0, i.logError)('getPlayerSizeFromObject FAILED: no playerSize in video object or ext', e), null)
            );
          }
          let D;
          function O(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!D) {
              D = p.A4.install({ url: I.getRendererUrl(), config: t, loaded: !1, adUnitCode: e });
              try {
                D.setRender(T);
              } catch (e) {
                (0, i.logError)('Prebid Error calling renderer.setRender', D, e);
              }
              (0, i.logInfo)('created renderer object');
            }
            return D;
          }
          function T(e) {
            ((0, i.logInfo)('outstreamRender got', (0, a.Go)(e)),
              e.renderer.push(() => {
                ((0, i.logInfo)('outstreamRender: Going to execute window.ozoneVideo.outstreamRender'),
                  window.ozoneVideo.outstreamRender(e));
              }));
          }
          ((0, d.a$)(I), (0, i.logInfo)(`*BidAdapter ${y} was loaded`), (0, r.E)('ozoneBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 5889], () => {
          return ((t = 4229), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [9831],
      {
        9174(e, o, r) {
          var a = r(1748),
            t = r(2592),
            n = r(1443),
            i = r(466),
            l = r(736);
          const s = 'pairId',
            d = 'pairId',
            c = (0, n.vM)({ moduleType: l.fW, moduleName: s });
          function p(e) {
            return c.localStorageIsEnabled() ? c.getDataFromLocalStorage(e) : null;
          }
          function f(e) {
            return c.cookiesAreEnabled() ? c.getCookie(e) : null;
          }
          const g = {
            name: s,
            gvlid: 755,
            decode: (e) => (e && Array.isArray(e) ? { pairId: e } : void 0),
            getId(e) {
              const o = p(d) || f(d);
              let r = [];
              if (o && 'string' == typeof o)
                try {
                  r = r.concat(JSON.parse(atob(o)));
                } catch (e) {
                  (0, i.logInfo)(e);
                }
              const a = (e && e.params) || {};
              if (a && a.liveramp) {
                const e = a.liveramp.storageKey || '_lr_pairId',
                  o = p(e) || f(e);
                if (o)
                  try {
                    const e = atob(o);
                    if (e) {
                      const o = JSON.parse(e);
                      o && 'object' == typeof o && o.envelope
                        ? (r = r.concat(o.envelope))
                        : (0, i.logInfo)('Pairid: Parsed object is not valid or does not contain envelope');
                    } else (0, i.logInfo)('Pairid: Decoded value is empty');
                  } catch (e) {
                    (0, i.logInfo)('Pairid: Error parsing JSON: ', e);
                  }
                else (0, i.logInfo)('Pairid: liverampValue for pairId from storage is empty or null');
              }
              if (0 !== r.length) return { id: r };
              (0, i.logInfo)('PairId not found.');
            },
            eids: { pairId: { source: 'google.com', atype: 571187 } },
          };
          ((0, t.bz)('userId', g), (0, a.E)('pairIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((o = 9174), e((e.s = o)));
          var o;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3775],
      {
        4654(e, o, r) {
          var t = r(1748),
            n = r(466),
            i = r(8928),
            a = r(3435),
            l = r(6665),
            s = r(1933),
            d = r(2201),
            c = r(8014),
            u = r(1418),
            f = r(2592),
            m = r(867),
            p = r(7156),
            h = r(3006),
            g = r(2517),
            y = r(7841),
            b = r(7459),
            v = r(2819),
            A = r(786),
            F = r(6283),
            S = r(9794);
          const k = 'not_found',
            C = 'random',
            j = 'Price Floors',
            T = (0, d.g4)(1e4),
            O = Symbol(),
            R = [O, 'gptSlot', 'adUnitCode', 'size', 'domain', 'mediaType'],
            x = new Set();
          function $(e) {
            return 'string' == typeof e && x.has(e);
          }
          let E = !1,
            M = !1,
            U = {};
          const I = (0, F.L)();
          let B = {};
          const D = (() => {
            let e;
            return function () {
              return (null == e && (e = (0, n.parseUrl)((0, m.EN)().topmostLocation, { noDecodeWholeURL: !0 }).hostname), e);
            };
          })();
          function w(e, o) {
            let { index: r = h.n.index } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return e?.adUnitCode || r.getAdUnit(o).code;
          }
          const z = {
            [O]: () => '*',
            size: (e, o) => (0, n.parseGPTSingleSizeArray)(o.size) || '*',
            mediaType: (e, o) => o.mediaType || 'banner',
            gptSlot: (e, o) =>
              (function (e) {
                let { index: o = h.n.index } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                const r = o.getAdUnit({ adUnitId: e });
                return 'gam' === (0, i.A)(r, 'ortb2Imp.ext.data.adserver.name') && r.ortb2Imp.ext.data.adserver.adslot;
              })((e || o).adUnitId) || (0, v.p)(w(e, o)).gptSlot,
            domain: D,
            adUnitCode: (e, o) => w(e, o),
          };
          function W(e, o, r) {
            if (!e.length) return [];
            let t = {};
            return (
              e.filter($).length > 0 &&
                U.userIds &&
                (t = (function (e, o) {
                  if (!e || !o?.userIdAsEid?.length) return {};
                  const r = o.userIdAsEid.reduce((e, o) => (o?.source && e.add(o.source), e), new Set());
                  return Object.entries(e).reduce((e, o) => {
                    let [t, n] = o;
                    const i = Array.isArray(n) && n.some((e) => r.has(e));
                    return ((e[`userId.${t}`] = i ? 1 : 0), e);
                  }, {});
                })(U.userIds, o)),
              e.reduce((e, n) => {
                let i;
                return ((i = $(n) ? String(t[n] ?? '*') : z[n](o, r) || '*'), e.push('*' === i ? ['*'] : [i.toLowerCase(), '*']), e);
              }, [])
            );
          }
          function q(e, o) {
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            const t = W((0, i.A)(e, 'schema.fields') || [], o, r);
            if (!t.length) return { matchingFloor: void 0 };
            const n = t.map((e) => e[0]).join('-'),
              l = (0, i.A)(e, `matchingInputs.${n}`);
            if (l) return { ...l };
            const s =
              ((d = t),
              (c = (0, i.A)(e, 'schema.delimiter') || '|'),
              d
                .reduce((e, o) => {
                  const r = [];
                  return (
                    e.forEach((e) => {
                      o.forEach((o) => {
                        r.push(e + c + o);
                      });
                    }),
                    r
                  );
                })
                .sort((e, o) => e.split('*').length - o.split('*').length));
            var d, c;
            const u = (s || []).find((o) => e.values.hasOwnProperty(o)),
              f = {
                floorMin: e.floorMin || 0,
                floorRuleValue: e.values[u],
                matchingData: s[0],
                matchingRule: u === e.meta?.defaultRule ? void 0 : u,
              },
              m = (0, i.A)(o, 'ortb2Imp.ext.prebid.floors.floorMin');
            return (
              'number' == typeof m && (f.floorMin = m),
              (f.matchingFloor = Math.max(f.floorMin, f.floorRuleValue)),
              (0, a.J)(e, `matchingInputs.${n}`, { ...f }),
              f
            );
          }
          function P(e, o, r) {
            return parseFloat((0, b.y)(e, { ...o, cpm: e }, r));
          }
          const V = {
            banner: (e) => (0, i.A)(e, 'mediaTypes.banner.sizes') || [],
            video: (e) => (0, i.A)(e, 'mediaTypes.video.playerSize') || [],
            native: (e) => ((0, i.A)(e, 'mediaTypes.native.image.sizes') ? [(0, i.A)(e, 'mediaTypes.native.image.sizes')] : []),
          };
          function G() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { currency: 'USD', mediaType: '*', size: '*' };
            const o = this,
              r = B[o.auctionId];
            if (!r || r.skipped) return {};
            e = (function (e, o) {
              const r = Object.keys(e.mediaTypes || {});
              return (
                '*' === o.mediaType && 1 === r.length && (o.mediaType = r[0]),
                '*' === o.size &&
                  -1 !== r.indexOf(o.mediaType) &&
                  V[o.mediaType] &&
                  1 === V[o.mediaType](e).length &&
                  (o.size = V[o.mediaType](e)[0]),
                o
              );
            })(o, e);
            const i = q(r.data, { ...o }, { mediaType: e.mediaType, size: e.size });
            let a = e.currency || r.data.currency;
            if (i.matchingFloor && a !== r.data.currency)
              try {
                i.matchingFloor = (0, t.m)().convertCurrency(i.matchingFloor, r.data.currency, a);
              } catch (e) {
                ((0, n.logWarn)(
                  `${j}: Unable to get currency conversion for getFloor for bidder ${o.bidder}. You must have currency module enabled with defaultRates in your currency config`,
                ),
                  (a = r.data.currency));
              }
            if (r.enforcement.bidAdjustment && i.matchingFloor) {
              const r = p.u.get(o.bidder, 'inverseBidAdjustment');
              if (r) {
                const t = Object.fromEntries(
                  Object.entries(e).filter((e) => {
                    let [o, r] = e;
                    return '*' !== r && ['mediaType', 'size'].includes(o);
                  }),
                );
                i.matchingFloor = r(i.matchingFloor, o, t);
              } else {
                const e = P(i.matchingFloor, null, o);
                i.matchingFloor = e
                  ? (function (e, o) {
                      const r = Math.pow(10, 10);
                      return (((e * r) / (o * r)) * (e * r)) / r;
                    })(i.matchingFloor, e)
                  : i.matchingFloor;
              }
            }
            return null === i.floorRuleValue
              ? null
              : i.matchingFloor
                ? {
                    floor: ((l = i.matchingFloor), (s = 4), Math.ceil((parseFloat(l) * Math.pow(10, s)).toFixed(1)) / Math.pow(10, s)),
                    currency: a,
                  }
                : {};
            var l, s;
          }
          function N(e, o) {
            const r = (0, l.Go)(e);
            return (
              (r.schema.delimiter = e.schema.delimiter || '|'),
              (r.values = (function (e, o) {
                const r = e.schema.fields,
                  t = e.schema.delimiter,
                  n = o && -1 === r.indexOf('adUnitCode') && r.unshift('adUnitCode');
                return Object.keys(e.values).reduce((r, i) => ((r[(n ? `${o}${t}${i}` : i).toLowerCase()] = e.values[i]), r), {});
              })(r, o)),
              (r.currency = r.currency || 'USD'),
              r
            );
          }
          function J(e, o) {
            const r = (0, l.Go)(U);
            if (2 === (0, i.A)(r, 'data.floorsSchemaVersion')) {
              const { modelGroups: e, ...o } = r.data;
              r.data = Object.assign(
                o,
                (function (e, o) {
                  let r = Math.floor(Math.random() * o + 1);
                  for (let o = 0; o < e.length; o++) if (((r -= e[o].modelWeight), r <= 0)) return e[o];
                })(e, o.modelWeightSum),
              );
            }
            const t = 0 === Object.keys((0, i.A)(r, 'data.values') || {}).length;
            if (
              ((r.data = t
                ? (function (e) {
                    const o = e.find((e) => null != e.floors?.schema);
                    return e.reduce((e, r) => {
                      if (null != r.floors?.schema && !(0, n.deepEqual)(r.floors.schema, o?.floors?.schema))
                        return (
                          (0, n.logError)(
                            `${j}: adUnit '${r.code}' declares a different schema from one previously declared by adUnit '${o.code}'. Floor config for '${r.code}' will be ignored.`,
                          ),
                          e
                        );
                      const t = Object.assign({}, o?.floors, { values: void 0 }, r.floors);
                      if (H(t))
                        if (e.values) {
                          const o = N(t, r.code).values;
                          Object.assign(e.values, o);
                        } else (e = N(t, r.code)).location = 'adUnit';
                      else
                        null != r.floors &&
                          (0, n.logWarn)(
                            `adUnit '${r.code}' provides an invalid \`floor\` definition, it will be ignored for floor calculations`,
                            r,
                          );
                      return e;
                    }, {});
                  })(e)
                : N(r.data)),
              0 === Object.keys((0, i.A)(r, 'data.values') || {}).length)
            )
              ((r.skipped = !0), (r.skippedReason = k));
            else {
              const e = (0, n.getParameterByName)('pbjs_skipRate') || ((0, i.A)(r, 'data.skipRate') ?? r.skipRate),
                o = 100 * Math.random() < parseFloat(e);
              ((r.skipped = o), o && (r.skippedReason = C));
            }
            return (
              r.hasOwnProperty('floorMin') && (r.data.floorMin = r.floorMin),
              (function (e, o, r) {
                const t = (function (e) {
                  const { data: o, enforcement: r } = e;
                  return o?.noFloorSignalBidders?.length > 0
                    ? o.noFloorSignalBidders
                    : r?.noFloorSignalBidders?.length > 0
                      ? r.noFloorSignalBidders
                      : [];
                })(o);
                e.forEach((e) => {
                  e.bids?.forEach((e) => {
                    const a = t.some((o) => o === e.bidder);
                    (o.skipped || a ? (a && (0, n.logInfo)(`noFloorSignal to ${e.bidder}`), delete e.getFloor) : (e.getFloor = G),
                      (e.auctionId = r),
                      (e.floorData = {
                        noFloorSignaled: a,
                        skipped: o.skipped,
                        skipRate: (0, i.A)(o, 'data.skipRate') ?? o.skipRate,
                        skippedReason: o.skippedReason,
                        floorMin: o.floorMin,
                        modelVersion: (0, i.A)(o, 'data.modelVersion'),
                        modelWeight: (0, i.A)(o, 'data.modelWeight'),
                        modelTimestamp: (0, i.A)(o, 'data.modelTimestamp'),
                        location: (0, i.A)(o, 'data.location', 'noData'),
                        floorProvider: o.floorProvider,
                        fetchStatus: U.fetchStatus,
                      }));
                  });
                });
              })(e, r, o),
              r
            );
          }
          function L(e) {
            e.hasExited ||
              ((e.reqBidsConfigObj.auctionId = e.reqBidsConfigObj.auctionId || (0, n.generateUUID)()),
              (B[e.reqBidsConfigObj.auctionId] = J(e.reqBidsConfigObj.adUnits || (0, t.m)().adUnits, e.reqBidsConfigObj.auctionId)),
              e.nextFn.apply(e.context, [e.reqBidsConfigObj]),
              (e.hasExited = !0));
          }
          function Y(e) {
            return (
              (e = (function (e) {
                if ((0, l.Et)(e.default)) {
                  let o = '*';
                  const r = (e.schema?.fields || []).length;
                  (r
                    ? (o = Array(r)
                        .fill('*')
                        .join(e.schema?.delimiter || '|'))
                    : (0, a.J)(e, 'schema.fields', [O]),
                    (e.values = e.values || {}),
                    null == e.values[o] && ((e.values[o] = e.default), (e.meta = { defaultRule: o })));
                }
                return e;
              })(e)),
              !!(function (e) {
                if (Array.isArray(e) && e.length > 0) {
                  if (e.every((e) => R.includes(e) || $(e))) return !0;
                  (0, n.logError)(`${j}: Fields received do not match allowed fields`);
                }
                return !1;
              })((0, i.A)(e, 'schema.fields')) &&
                ((o = e),
                (r = e.schema.fields.length),
                (t = e.schema.delimiter || '|'),
                'object' == typeof o.values &&
                  ((o.values = Object.keys(o.values).reduce(
                    (e, n) => (
                      (function (e, o, r, t) {
                        return 'string' == typeof e && e.split(t).length === r && ('number' == typeof o || null === o);
                      })(n, o.values[n], r, t) && (e[n] = o.values[n]),
                      e
                    ),
                    {},
                  )),
                  Object.keys(o.values).length > 0))
            );
            var o, r, t;
          }
          const _ = {
            1: (e) => Y(e),
            2: (e) =>
              !(!Array.isArray(e.modelGroups) || 0 === e.modelGroups.length) &&
              ((e.modelWeightSum = 0),
              e.modelGroups.every((o) => !('number' != typeof o.modelWeight || !Y(o)) && ((e.modelWeightSum += o.modelWeight), !0))),
          };
          function H(e) {
            return (
              'object' == typeof e &&
              ((e.floorsSchemaVersion = e.floorsSchemaVersion || 1),
              'function' != typeof _[e.floorsSchemaVersion]
                ? ((0, n.logError)(`${j}: Unknown floorsSchemaVersion: `, e.floorsSchemaVersion), !1)
                : _[e.floorsSchemaVersion](e))
            );
          }
          function Z(e, o) {
            if (e && 'object' == typeof e && H(e))
              return ((0, n.logInfo)(`${j}: A ${o} set the auction floor data set to `, e), { ...e, location: o });
            (0, n.logError)(`${j}: The floors data did not contain correct values`, e);
          }
          const K = (0, y.Ak)('priceFloors', function (e, o) {
            const r = { reqBidsConfigObj: o, context: this, nextFn: e, hasExited: !1, timer: null };
            U.auctionDelay > 0 && E
              ? I.submit(
                  U.auctionDelay,
                  () => L(r),
                  () => {
                    ((0, n.logWarn)(`${j}: Fetch attempt did not return in time for auction`), (U.fetchStatus = 'timeout'), L(r));
                  },
                )
              : L(r);
          });
          function Q(e) {
            let o;
            ((E = !1), (U.fetchStatus = 'success'));
            try {
              o = JSON.parse(e);
            } catch (r) {
              o = e;
            }
            const r = Z(o, 'fetch');
            (r &&
              ((U.data = r),
              (U.skipRate = (0, l.Et)(r.skipRate) ? r.skipRate : U.skipRate),
              (U.floorProvider = r.floorProvider || U.floorProvider)),
              I.resume());
          }
          function X(e) {
            ((E = !1), (U.fetchStatus = 'error'), (0, n.logError)(`${j}: Fetch errored with: `, e), I.resume());
          }
          function ee(e) {
            var o;
            ((U = (0, n.pick)(e, [
              'floorMin',
              'enabled',
              (e) => !1 !== e,
              'auctionDelay',
              (e) => e || 0,
              'floorProvider',
              (o) => (0, i.A)(e, 'data.floorProvider', o),
              'endpoint',
              (e) => e || {},
              'skipRate',
              () => (isNaN((0, i.A)(e, 'data.skipRate')) ? e.skipRate || 0 : e.data.skipRate),
              'userIds',
              te,
              'enforcement',
              (e) =>
                (0, n.pick)(e || {}, [
                  'enforceJS',
                  (e) => !1 !== e,
                  'enforceBidders',
                  (e) => (Array.isArray(e) && e.length > 0 ? e : ['*']),
                  'enforcePBS',
                  (e) => !0 === e,
                  'floorDeals',
                  (e) => !0 === e,
                  'bidAdjustment',
                  (e) => !1 !== e,
                  'noFloorSignalBidders',
                  (e) => e || [],
                ]),
              'additionalSchemaFields',
              (e) => {
                return 'object' == typeof e && Object.keys(e).length > 0
                  ? ((o = e),
                    void Object.keys(o).forEach((e) => {
                      -1 === R.indexOf(e) && 'function' == typeof o[e] && (R.push(e), (z[e] = o[e]));
                    }))
                  : void 0;
                var o;
              },
              'data',
              (e) => (e && Z(e, 'setConfig')) || void 0,
            ])),
              U.enabled
                ? ((o = U.endpoint).url && !E
                    ? 'GET' !== (o.method || 'GET')
                      ? (0, n.logError)(`${j}: 'GET' is the only request method supported at this time!`)
                      : (T(o.url, { success: Q, error: X }, null, { method: 'GET' }), (E = !0))
                    : E && (0, n.logWarn)(`${j}: A fetch is already occurring. Skipping.`),
                  M ||
                    (c.on(u.qY.AUCTION_END, (e) => {
                      setTimeout(() => delete B[e.auctionId], 3e3);
                    }),
                    (0, f.Yn)('requestBids').before(K, 50),
                    (0, f.Yn)('addBidResponse').before(oe, (0, n.debugTurnedOn)() ? 4 : 50),
                    (M = !0)))
                : ((0, n.logInfo)(`${j}: Turning off module`),
                  (U = {}),
                  (B = {}),
                  (0, f.Yn)('addBidResponse').getHooks({ hook: oe }).remove(),
                  (0, f.Yn)('requestBids').getHooks({ hook: K }).remove(),
                  (M = !1)));
          }
          const oe = (0, y.NL)('priceFloors', function (e, o, r, a) {
            const l = B[r.auctionId];
            if (!l || !r || l.skipped) return e.call(this, o, r, a);
            const s = h.n.index.getBidRequest(r),
              d = q(l.data, s, { ...r, size: [r.width, r.height] });
            if (!d.matchingFloor)
              return (
                0 !== d.matchingFloor && (0, n.logWarn)(`${j}: unable to determine a matching price floor for bidResponse`, r),
                e.call(this, o, r, a)
              );
            let c;
            const f = l.data.currency.toUpperCase(),
              m = r.currency || 'USD';
            if (f === m.toUpperCase()) c = r.cpm;
            else if (r.originalCurrency && f === r.originalCurrency.toUpperCase()) c = r.originalCpm;
            else
              try {
                c = (0, t.m)().convertCurrency(r.cpm, m.toUpperCase(), f);
              } catch (t) {
                return (
                  (0, n.logError)(
                    `${j}: Unable do get currency conversion for bidResponse to Floor Currency. Do you have Currency module enabled? ${r}`,
                  ),
                  e.call(this, o, r, a)
                );
              }
            return (
              (c = P(c, r, s)),
              (function (e, o, r, t) {
                ((r.floorData = {
                  floorValue: o.matchingFloor,
                  floorRule: o.matchingRule,
                  floorRuleValue: o.floorRuleValue,
                  floorCurrency: e.data.currency,
                  cpmAfterAdjustments: t,
                  enforcements: { ...e.enforcement },
                  matchedFields: {},
                }),
                  e.data.schema.fields.forEach((t, n) => {
                    const i = o.matchingData.split(e.data.schema.delimiter)[n];
                    r.floorData.matchedFields[t] = i;
                  }));
              })(l, d, r, c),
              (function (e, o, r) {
                const t = !1 !== (0, i.A)(e, 'enforcement.enforceJS'),
                  n = (0, i.A)(e, 'enforcement.enforceBidders') || ['*'],
                  a = r?.adapterCode || r?.bidderCode || r?.bidder,
                  l = n.includes('*') || (null != a && n.includes(a)),
                  s = !0 === (0, i.A)(e, 'enforcement.floorDeals') || !r.dealId,
                  d = r.floorData.cpmAfterAdjustments < o.matchingFloor;
                return t && l && d && s;
              })(l, d, r)
                ? (a(u.Tf.FLOOR_NOT_MET),
                  void (0, n.logWarn)(
                    `${j}: ${r.bidderCode}'s Bid Response for ${o} was rejected due to floor not met (adjusted cpm: ${r?.floorData?.cpmAfterAdjustments}, floor: ${d?.matchingFloor})`,
                    r,
                  ))
                : e.call(this, o, r, a)
            );
          });
          function re(e, o, r) {
            let { currency: t = s.$W.getConfig('currency.adServerCurrency') || 'USD', mediaType: i = '*', size: a = '*' } = o;
            if ('function' == typeof e.getFloor) {
              let o;
              try {
                o = e.getFloor({ currency: t, mediaType: i, size: a }) || {};
              } catch (o) {
                return void (0, n.logWarn)('Cannot compute floor for bid', e);
              }
              ((o.floor = parseFloat(o.floor)), null != o.currency && o.floor && !isNaN(o.floor) && r(o.floor, o.currency));
            }
          }
          function te(e) {
            if (!e || 'object' != typeof e) return {};
            x.clear();
            return Object.entries(e).some((e) => {
              let [o, r] = e;
              return !Array.isArray(r) || (x.add(`userId.${o}`), !1);
            })
              ? (x.clear(), {})
              : e;
          }
          (s.$W.getConfig('floors', (e) => ee(e.floors)),
            (0, g.pS)({
              type: g.Tb,
              name: 'bidfloor',
              fn: function (e, o, r) {
                re(o, { currency: r.currency, mediaType: r.mediaType || '*', size: '*' }, (o, r) => {
                  Object.assign(e, { bidfloor: o, bidfloorcur: r });
                });
              },
            }),
            (0, g.pS)({
              type: g.Tb,
              name: 'extBidfloor',
              fn: function (e, o, r) {
                function t(o, r) {
                  (o === e.bidfloor && r === e.bidfloorcur) || ((0, a.J)(this, 'ext.bidfloor', o), (0, a.J)(this, 'ext.bidfloorcur', r));
                }
                (Object.values(S.GE)
                  .filter((o) => null != e[o])
                  .forEach((n) => {
                    re(o, { currency: e.bidfloorcur || r?.currency, mediaType: n }, t.bind(e[n]));
                  }),
                  (e[S.D4]?.format || [])
                    .filter((e) => {
                      let { w: o, h: r } = e;
                      return null != o && null != r;
                    })
                    .forEach((n) => {
                      re(o, { currency: e.bidfloorcur || r?.currency, mediaType: S.D4, size: [n.w, n.h] }, t.bind(n));
                    }));
              },
              priority: -10,
            }),
            (0, g.pS)({
              type: g.Tb,
              name: 'extPrebidFloors',
              fn: function (e, o, r) {
                if (null != e.bidfloor) {
                  let { floorMinCur: o, floorMin: t } = r.reqContext.floorMin || {};
                  null == o && (o = e.bidfloorcur);
                  const n = e.ext?.prebid?.floors?.floorMinCur || e.ext?.prebid?.floorMinCur || o,
                    i = e.ext?.prebid?.floors?.floorMin || e.ext?.prebid?.floorMin,
                    l = (0, A.hZ)(e.bidfloor, e.bidfloorcur, o),
                    s = !(!i || !n) && (0, A.hZ)(i, n, o),
                    d = s && s < l ? s : l;
                  ((0, a.J)(e, 'ext.prebid.floors.floorMin', d),
                    (null == t || t > d) && (t = d),
                    (r.reqContext.floorMin = { floorMin: t, floorMinCur: o }));
                }
              },
              dialects: [g.e4],
              priority: -1,
            }),
            (0, g.pS)({
              type: g.S3,
              name: 'extPrebidFloors',
              fn: function (e, o, r) {
                (M && (0, a.J)(e, 'ext.prebid.floors.enabled', e.ext?.prebid?.floors?.enabled || !1),
                  r?.floorMin && (0, n.mergeDeep)(e, { ext: { prebid: { floors: r.floorMin } } }));
              },
              dialects: [g.e4],
            }),
            (0, t.E)('priceFloors'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 3005, 5957, 1225], () => {
          return ((o = 4654), e((e.s = o)));
          var o;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6041],
      {
        1800(d, e, n) {
          var o = n(1748),
            s = n(2592),
            i = n(466),
            t = n(6665);
          const r = {
            name: 'pubProvidedId',
            gvlid: n(1385).B1,
            decode(d) {
              const e = d ? { pubProvidedId: d } : void 0;
              return ((0, i.logInfo)('PubProvidedId: Decoded value ' + JSON.stringify(e)), e);
            },
            getId(d) {
              const e = (d && d.params) || {};
              let n = [];
              return (
                (0, t.cy)(e.eids) && (n = n.concat(e.eids)),
                'function' == typeof e.eidsFunction && (n = n.concat(e.eidsFunction())),
                { id: n }
              );
            },
          };
          ((0, s.bz)('userId', r), (0, o.E)('pubProvidedIdSystem'));
        },
      },
      (d) => {
        d.O(0, [802, 7769, 315, 1085], () => {
          return ((e = 1800), d((d.s = e)));
          var e;
        });
        d.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [6776],
      {
        9023(e, r, t) {
          var n = t(1748),
            s = t(2592),
            i = t(1443),
            a = t(2201),
            p = t(466),
            c = t(736);
          const o = 'publinkId',
            u = (0, i.vM)({ moduleType: c.fW, moduleName: o });
          function l() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              r = arguments.length > 1 ? arguments[1] : void 0,
              t = arguments.length > 2 ? arguments[2] : void 0;
            return function (n) {
              const s = { method: 'GET', withCredentials: !0 },
                i = function (e, r) {
                  if (200 === r.status) {
                    const r = JSON.parse(e);
                    r && n(r.publink);
                  }
                };
              var c;
              (e.params && e.params.e && ((c = e.params.e), /^[A-F0-9]+$/i.test(c))) || t
                ? (0, a.RD)(
                    (function (e, r, t) {
                      const n = (0, p.parseUrl)('https://proc.ad.cpe.dotomi.com/cvx/client/sync/publink/refresh');
                      ((n.search = { mpn: 'Prebid.js', mpv: '10.29.0' }),
                        r?.gdpr && ((n.search.gdpr = r.gdpr.gdprApplies ? 1 : 0), (n.search.gdpr_consent = r.gdpr.consentString)),
                        e &&
                          (e.e && ((n.search.deh = e.e), (n.pathname = '/cvx/client/sync/publink')),
                          e.site_id && (n.search.sid = e.site_id),
                          e.api_key && (n.search.apikey = e.api_key)),
                        t && (n.search.publink = t));
                      const s = r?.usp;
                      return (s && 'string' == typeof s && (n.search.us_privacy = s), (0, p.buildUrl)(n));
                    })(e.params, r, t),
                    i,
                    void 0,
                    s,
                  )
                : e.params.e && (0, p.logError)('params.e must be a hex string');
            };
          }
          const d = {
            name: o,
            gvlid: 24,
            decode: (e) => ({ publinkId: e }),
            getId: function (e, r, t) {
              const n = (function () {
                let e;
                function r(e) {
                  let r;
                  if ((u.hasLocalStorage() && (r = u.getDataFromLocalStorage(e)), r || (r = u.getCookie(e)), 'string' == typeof r)) {
                    if ('{' !== r.charAt(0)) return r;
                    try {
                      const e = JSON.parse(r);
                      if (e) return e.publink;
                    } catch (e) {
                      (0, p.logError)(e);
                    }
                  }
                }
                return ((e = r('_publink_srv')), e || (e = r('_publink')), e);
              })();
              return n ? { id: n } : { callback: l(e, r, t) };
            },
            eids: { publinkId: { source: 'epsilon.com', atype: 3 } },
          };
          ((0, s.bz)('userId', d), (0, n.E)('publinkIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((r = 9023), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [1252],
      {
        755(e, t, r) {
          var i = r(1748),
            n = r(466),
            o = r(8928),
            a = r(3435),
            s = r(6665),
            d = r(3556),
            l = r(9794),
            c = r(1933),
            p = r(7464),
            u = r(4621),
            m = r(7156),
            g = r(9201),
            f = r(1418),
            b = r(6685),
            h = r(8258);
          const y = 'PubMatic: ',
            v = void 0,
            x = 'https://pubmatic.bbvms.com/r/'.concat('$RENDERER', '.js'),
            w = Object.values(f.h0),
            I = !0,
            O = { kadpageurl: '', gender: '', yob: '', lat: '', lon: '', wiid: '' },
            C = { 1: 'PMP', 5: 'PREF', 6: 'PMPG' },
            $ = { banner: 360, video: 1800, native: 1800 };
          let _,
            j = {},
            R = [],
            E = [],
            U = 0;
          const k = (0, g.A)({
              context: { netRevenue: !0, ttl: 360 },
              imp(e, t, r) {
                const { kadfloor: i, currency: n, adSlot: o = '', deals: a, dctr: s, pmzoneid: d, hashedKey: l } = t.params,
                  { adUnitCode: c, mediaTypes: p, rtd: u, ortb2: m } = t,
                  g = e(t, r);
                if (!g.hasOwnProperty('banner') && !g.hasOwnProperty('video') && !g.hasOwnProperty('native')) return null;
                ((g.ext = g.ext || {}), (g.ext.pbcode = c), a && (0, b.k)(g, a, y), s && (0, b.z)(g, s, y));
                const f = A(m);
                if (f) {
                  const e = Object.values(f).filter(Boolean);
                  e.length && (g.ext.key_val = g.ext.key_val ? `${g.ext.key_val}|${e.join('|')}` : e.join('|'));
                }
                return (
                  u?.jwplayer && z(g, u.jwplayer),
                  (g.bidfloor = H('kadfloor', i)),
                  (g.bidfloorcur = n ? H('currency', n) : 'USD'),
                  q(g, t),
                  g.hasOwnProperty('banner') && S(g.banner, o),
                  g.hasOwnProperty('video') && N(p?.video, c, g),
                  g.hasOwnProperty('native') && M(g, p?.native),
                  (g.hasOwnProperty('banner') || g.hasOwnProperty('video')) && Y(g, c, t?.sizes),
                  d && (g.ext.pmZoneId = d),
                  W(g, o.trim(), l),
                  T(g),
                  null != g.ext?.ae && delete g.ext.ae,
                  null != g.ext?.igs && delete g.ext.igs,
                  null != g.ext?.paapi && delete g.ext.paapi,
                  ['banner', 'video', 'native'].forEach((e) => {
                    g[e]?.battr && !Array.isArray(g[e].battr) && delete g[e].battr;
                  }),
                  g
                );
              },
              request(e, t, r, i) {
                const n = (function (e, t) {
                    return e;
                    const r = {};
                    return (
                      t.bids.forEach((t) => {
                        const i = e.find((e) => e.id === t.bidId);
                        if (!i) return;
                        const n = t.adUnitId;
                        if (!r[n]) return void (r[n] = (0, s.Go)(i));
                        const o = r[n];
                        (0, s.O8)(i.tagid) && (o.tagid = i.tagid);
                        const a = (e, t, r) => {
                          i[e] &&
                            i[e][t] &&
                            (o[e] || (o[e] = {}),
                            r ? (o[e][t] || (o[e][t] = []), (o[e][t] = [...o[e][t], ...i[e][t]])) : (o[e][t] = i[e][t]));
                        };
                        (a('ext', 'key_val', !1), a('ext', 'pmZoneId', !1), a('pmp', 'deals', !0));
                      }),
                      Object.values(r)
                    );
                  })(t, r),
                  o = e(n, r, i);
                if (R.length || o.bcat) {
                  const e = V([...(R || []), ...(o.bcat || [])]);
                  e.length && (o.bcat = e);
                }
                if (E.length || o.acat) {
                  const e = X([...(E || []), ...(o.acat || [])]);
                  e.length && (o.acat = e);
                }
                (F(o), D(o, i?.bidRequests), J(o, r));
                return (
                  (r?.bidderCode ? m.u.get(r.bidderCode, 'allowAlternateBidderCodes') : void 0) && B(o, r),
                  r?.ortb2?.ext?.prebid?.previousauctioninfo &&
                    (0, a.J)(o, 'ext.previousAuctionInfo', r.ortb2.ext.prebid.previousauctioninfo),
                  o
                );
              },
              bidResponse(e, t, r) {
                const i = e(t, r);
                (i.meta && (i.meta.mediaType = i.mediaType), G(i, t, r));
                const { mediaType: o, playerWidth: a, playerHeight: s } = i,
                  { params: d, adUnitCode: c, mediaTypes: p } = r?.bidRequest;
                if (o === l.G_) {
                  (i.width || (i.width = a), i.height || (i.height = s));
                  const { context: e, maxduration: t } = p[o];
                  ('outstream' === e &&
                    d.outstreamAU &&
                    c &&
                    ((i.rendererCode = d.outstreamAU), (i.renderer = Z.newRenderer(i.rendererCode, c))),
                    L(i, e, t));
                }
                if (o === l.s6 && t.adm) {
                  try {
                    const e = JSON.parse(t.adm.replace(/\\/g, ''));
                    i.native = { ortb: { ...e.native } };
                  } catch (e) {
                    return void (0, n.logWarn)(`${y}Error: Cannot parse native response for ad response: ${t.adm}`);
                  }
                  ((i.width = t.w || 0), (i.height = t.h || 0));
                }
                return i;
              },
              response: (e, t, r, i) => e(t, r, i),
              overrides: { imp: { bidfloor: !1, extBidfloor: !1 }, bidResponse: { native: !1 } },
            }),
            A = (e) => {
              const t = e?.user?.ext?.data?.im_segments,
                r = e?.site?.ext?.data?.['ias-brand-safety'],
                i = t && (0, s.cy)(t) && t.length,
                n = 'object' == typeof r && Object.keys(r).length,
                o = {};
              return (
                i && (o.im_segments = `im_segments=${t.join(',')}`),
                n &&
                  (o['ias-brand-safety'] = Object.entries(r)
                    .map((e) => {
                      let [t, r] = e;
                      return `${t}=${r}`;
                    })
                    .join('|')),
                Object.keys(o).length ? o : void 0
              );
            };
          const P = (e) => {
              const t = {};
              if (e.aspect_ratios && (0, s.cy)(e.aspect_ratios) && e.aspect_ratios.length) {
                const { min_width: r, min_height: i } = e.aspect_ratios[0];
                ((0, s.Fq)(r) && (0, s.Fq)(i) && ((t.wmin = r), (t.hmin = i)),
                  (t.ext = {
                    aspectratios: e.aspect_ratios
                      .filter((e) => {
                        let { ratio_width: t, ratio_height: r } = e;
                        return t && r;
                      })
                      .map((e) => {
                        let { ratio_width: t, ratio_height: r } = e;
                        return `${t}:${r}`;
                      }),
                  }));
              }
              return (
                (t.w = e.w || e.width),
                (t.h = e.h || e.height),
                e.sizes &&
                  2 === e.sizes.length &&
                  (0, s.Fq)(e.sizes[0]) &&
                  (0, s.Fq)(e.sizes[1]) &&
                  ((t.w = e.sizes[0]), (t.h = e.sizes[1]), delete t.wmin, delete t.hmin),
                e.ext && (t.ext = e.ext),
                e.mimes && (t.mimes = e.mimes),
                t
              );
            },
            T = (e) => {
              ((e.displaymanager ||= 'Prebid.js'), (e.displaymanagerver ||= '10.29.0'));
              const t = e.ext?.data?.adserver?.adslot;
              (t && (e.ext.dfp_ad_unit_code = t), e.ext?.data && 0 === Object.keys(e.ext.data).length && delete e.ext.data);
            };
          const q = (e, t) => {
              let r = -1;
              const i = Object.keys(t.mediaTypes),
                o = i.length > 1;
              ('function' != typeof t.getFloor ||
                c.$W.getConfig('pubmatic.disableFloors') ||
                [l.D4, l.G_, l.s6].forEach((i) => {
                  if (!e.hasOwnProperty(i)) return;
                  ((
                    ('banner' === i
                      ? e[i]?.format?.map((e) => {
                          let { w: t, h: r } = e;
                          return [t, r];
                        })
                      : ['*']) || ['*']
                  ).forEach((a) => {
                    const d = t.getFloor({ currency: e.bidfloorcur, mediaType: i, size: a });
                    if (
                      ((0, n.logInfo)(
                        y,
                        'floor from floor module returned for mediatype:',
                        i,
                        ' and size:',
                        a,
                        ' is: currency',
                        d.currency,
                        'floor',
                        d.floor,
                      ),
                      (0, s.Qd)(d) && d?.currency === e.bidfloorcur && !isNaN(parseInt(d.floor)))
                    ) {
                      const t = parseFloat(d.floor);
                      (o &&
                        i !== l.D4 &&
                        ((0, n.logInfo)(
                          y,
                          'floor from floor module returned for mediatype:',
                          i,
                          'is : ',
                          t,
                          'with currency :',
                          e.bidfloorcur,
                        ),
                        (e[i].ext = { bidfloor: t, bidfloorcur: e.bidfloorcur })),
                        (0, n.logInfo)(y, 'floor from floor module:', t, 'previous floor value', r, 'Min:', Math.min(t, r)),
                        (r = -1 === r ? t : Math.min(t, r)),
                        (0, n.logInfo)(y, 'new floor value:', r));
                    }
                  }),
                    o && i === l.D4 && (e[i].ext = { bidfloor: r, bidfloorcur: e.bidfloorcur }));
                }),
                e.bidfloor &&
                  ((0, n.logInfo)(
                    y,
                    'Comparing floors:',
                    'from floor module:',
                    r,
                    'impObj.bidfloor:',
                    e.bidfloor,
                    'Max:',
                    Math.max(r, e.bidfloor),
                  ),
                  (r = Math.max(r, e.bidfloor))),
                (e.bidfloor = r > 0 ? r : v),
                (0, n.logInfo)(y, 'Updated imp.bidfloor:', e.bidfloor),
                o &&
                  (function (e, t) {
                    t.forEach((t) => {
                      e[t]?.ext && e[t].ext.bidfloor === e.bidfloor && e[t].ext.bidfloorcur === e.bidfloorcur && delete e[t].ext;
                    });
                  })(e, i));
            },
            S = (e, t) => {
              const r = t.split(':');
              let i = r[0]?.split('@');
              i = 2 === i?.length ? i[1].split('x') : 3 === i.length ? i[2].split('x') : [];
              const n = e.format[0];
              (2 !== i.length || (0 === parseInt(i[0]) && 0 === parseInt(i[1]))
                ? ((e.w = n.w), (e.h = n.h))
                : ((e.w = parseInt(i[0])), (e.h = parseInt(i[1]))),
                (e.format = e.format.filter((t) => !(t.w === e.w && t.h === e.h))),
                e.format?.length || delete e.format,
                (e.pos ??= 0));
            },
            W = (e, t, r) => {
              const i = t.split(':')[0].split('@');
              e.tagid = r || i[0];
            },
            M = (e, t) => {
              if (
                (t?.ortb ||
                  (e.native.request = JSON.stringify(
                    ((e) => {
                      const t = { ver: '1.2', assets: [] };
                      for (const r in e) {
                        if (f._B.includes(r)) continue;
                        if (!f.x5.hasOwnProperty(r) && !w.includes(r)) {
                          (0, n.logWarn)(`${y}: Unrecognized asset: ${r}. Ignored.`);
                          continue;
                        }
                        if ('privacyLink' === r) {
                          t.privacy = 1;
                          continue;
                        }
                        const i = e[r],
                          o = i.required && (0, s.Lm)(i.required) ? 1 : 0,
                          a = { id: t.assets.length, required: o };
                        (r in f.h0
                          ? (a.data = { type: f.jO[f.h0[r]], ...(i.len && { len: i.len }), ...(i.ext && { ext: i.ext }) })
                          : 'icon' === r || 'image' === r
                            ? (a.img = { type: 'icon' === r ? f.oA.ICON : f.oA.MAIN, ...P(i) })
                            : 'title' === r
                              ? (a.title = { len: i.len || 140, ...(i.ext && { ext: i.ext }) })
                              : 'ext' === r && ((a.ext = i), delete a.required),
                          t.assets.push(a));
                      }
                      return t;
                    })(t),
                  )),
                t?.ortb)
              ) {
                const t = JSON.parse(e.native.request),
                  { assets: r } = t;
                r?.some((e) => e.title || e.img || e.data || e.video)
                  ? (e.native.request = JSON.stringify({ ver: '1.2', ...t }))
                  : ((0, n.logWarn)(`${y}: Native assets object is empty or contains invalid objects`), delete e.native);
              }
            },
            N = (e, t, r) => {
              const i = r.video;
              ((0, o.A)(e, 'plcmt') || (0, n.logWarn)('Video.plcmt param missing for ' + t),
                (e && (i.w || i.h)) ||
                  (delete r.video,
                  (0, n.logWarn)(
                    `${y}Error: Missing ${e ? 'video size params (playersize or w&h)' : 'video config params'} for adunit: ${t} with mediaType set as video. Ignoring video impression in the adunit.`,
                  )));
            },
            z = (e, t) => {
              const r = t?.targeting;
              if (!r || !r.segments?.length) return;
              const i = `${`jw-id=${r.content.id}`}|${r.segments.map((e) => `jw-${e}=1`).join('|')}`;
              ((e.ext = e.ext || {}), (e.ext.key_val = e.ext.key_val ? `${e.ext.key_val}|${i}` : i));
            },
            B = (e, t) => {
              const r = ['all'],
                i = m.u.get(t.bidderCode, 'allowedAlternateBidderCodes'),
                o = (0, s.cy)(i) ? i.map((e) => e.trim().toLowerCase()).filter(n.uniques) : r;
              e.ext.marketplace = {
                allowedbidders: o.includes('*') || o.includes('all') ? r : [...new Set(['pubmatic', ...o.filter((e) => e && e.trim())])],
              };
            },
            F = (e) => {
              ((0, a.J)(e, 'at', 1),
                (0, a.J)(e, 'cur', ['USD']),
                (e.test = window.location.href.includes('pubmaticTest=true') ? 1 : void 0),
                e.source && !Object.keys(e.source).length && delete e.source,
                e.app?.publisher && (e.app.publisher.id = U));
            },
            D = (e, t) => {
              const { gender: r, yob: i, pubId: n, refURL: a, kadpageurl: s } = j,
                { user: d } = e;
              (e.device && Object.assign(e.device, { js: 1, connectiontype: (0, h.Z)() }),
                (e.user = { ...e.user, gender: d?.gender || r?.trim() || v, yob: d?.yob || H('yob', i) }));
              const l = (0, o.A)(t, '0.userIdAsEids');
              (t.length && l?.length && !e.user.ext?.eids && ((e.user.ext = e.user.ext || {}), (e.user.ext.eids = l)),
                e.site?.publisher && ((e.site.ref = e.site.ref || a), (e.site.publisher.id = n?.trim())),
                e.site?.page && s && (e.site.page = s.trim()),
                e.device.geo && !e.user.geo ? (e.user.geo = e.device.geo) : e.user.geo && !e.device.geo && (e.device.geo = e.user.geo));
            },
            G = (e, t, r) => {
              const { ortbRequest: i, seatbid: n } = r;
              if (
                ((e.referrer = i.site?.ref || ''),
                (e.sspID = e.partnerImpId = t.id || ''),
                (e.ad = t.adm),
                (e.pm_dspid = t.ext?.dspid ? t.ext.dspid : null),
                (e.pm_seat = n.seat),
                e.creativeId || (e.creativeId = t.id),
                360 === Number(e.ttl) && (e.ttl = $[e.mediaType]),
                t.dealid && (e.dealChannel = t.ext?.deal_channel ? C[t.ext.deal_channel] || null : 'PMP'),
                n.ext?.buyid && (e.adserverTargeting = { hb_buyid_pubmatic: n.ext.buyid }),
                t.ext?.marketplace && (e.bidderCode = t.ext.marketplace),
                t.ext)
              ) {
                const { dspid: r, dchain: i, dsa: n, ibv: o } = t.ext;
                (r && (e.meta.networkId = e.meta.demandSource = r),
                  i && (e.meta.dchain = i),
                  n && Object.keys(n).length && (e.meta.dsa = n),
                  o && ((e.ext = e.ext || {}), (e.ext.ibv = o), (e.meta.mediaType = l.G_)));
              }
              const o = n.seat || t.ext?.advid;
              (o && (e.meta.advertiserId = e.meta.agencyId = e.meta.buyerId = o),
                K(t.adomain) && (e.meta.clickUrl = e.meta.brandId = t.adomain[0]),
                t.cat && K(t.cat) && ((e.meta.secondaryCatIds = t.cat), (e.meta.primaryCatId = t.cat[0])));
            },
            J = (e, t) => {
              const { profId: r, verId: i, wiid: n } = j;
              e.ext = {
                epoch: new Date().getTime(),
                wrapper: {
                  profile: r ? parseInt(r) : void 0,
                  version: i ? parseInt(i) : void 0,
                  wiid: n,
                  wv: 'prebid_prebid_10.29.0',
                  wp: 'pbjs',
                  biddercode: t?.bidderCode,
                },
                cpmAdjustment: _,
              };
            },
            L = (e, t, r) => {
              if (!e?.ext?.prebiddealpriority) return;
              if (t !== l.LM) return;
              const i = e?.ext?.video?.duration || r;
              e.video = { context: l.LM, durationSeconds: i, dealTier: e.ext.prebiddealpriority };
            },
            X = (e) => [
              ...new Set(
                e
                  .filter(
                    (e) =>
                      'string' == typeof e || ((0, n.logWarn)(y + 'acat: Each category should be a string, ignoring category: ' + e), !1),
                  )
                  .map((e) => e.trim()),
              ),
            ],
            V = (e) => {
              const t = (e = e.map((e) => ('string' == typeof e ? e.trim() : e))).filter((e) => 'string' != typeof e || e.length < 3);
              return (
                (0, n.logWarn)(y + 'bcat: Each category must be a string with a length greater than 3, ignoring ' + t),
                [...new Set(e.filter((e) => 'string' == typeof e && e.length >= 3))]
              );
            };
          const Z = {
            bootstrapPlayer: function (e) {
              const t = { code: e.adUnitCode, vastXml: e.vastXml || null, vastUrl: e.vastUrl || null };
              if (!t.vastXml && !t.vastUrl) return void (0, n.logWarn)(`${y}: No vastXml or vastUrl on bid, bailing...`);
              const r = Z.getRendererId('pubmatic', e.rendererCode),
                i = document.getElementById(e.adUnitCode),
                o = window.bluebillywig.renderers.find((e) => e._id === r);
              o ? o.bootstrap(t, i) : (0, n.logWarn)(`${y}: Couldn't find a renderer with ${r}`);
            },
            newRenderer: function (e, t) {
              const r = x.replace('$RENDERER', e),
                i = p.A4.install({ url: r, loaded: !1, adUnitCode: t });
              try {
                i.setRender(Z.outstreamRender);
              } catch (e) {
                (0, n.logWarn)(`${y}: Error tying to setRender on renderer`, e);
              }
              return i;
            },
            outstreamRender: function (e) {
              e.renderer.push(() => Z.bootstrapPlayer(e));
            },
            getRendererId: function (e, t) {
              return `${e}-${t}`;
            },
          };
          function H(e, t) {
            if (!(0, s.O8)(t))
              return (t && (0, n.logWarn)(y + 'Ignoring param key: ' + e + ', expects string-value, found ' + typeof t), v);
            const r = {
              pmzoneid: () =>
                t
                  .split(',')
                  .slice(0, 50)
                  .map((e) => e.trim())
                  .join(),
              kadfloor: () => parseFloat(t),
              lat: () => parseFloat(t),
              lon: () => parseFloat(t),
              yob: () => parseInt(t),
            };
            return r[e]?.() || t;
          }
          function K(e) {
            return !0 === (0, s.cy)(e) && e.length > 0;
          }
          function Q() {
            try {
              const e = (0, o.A)(c.$W.getBidderConfig(), 'pubmatic.gzipEnabled');
              if (void 0 !== e) {
                const t = String(e).toLowerCase().trim();
                if ('true' === t || 'false' === t) {
                  const e = 'true' === t;
                  return ((0, n.logInfo)('PubMatic: Using bidder-specific gzipEnabled setting:', e), e);
                }
                (0, n.logWarn)('PubMatic: Invalid gzipEnabled value in bidder config:', e);
              }
            } catch (e) {
              (0, n.logWarn)('PubMatic: Error accessing bidder config:', e);
            }
            return ((0, n.logInfo)('PubMatic: Using default gzipEnabled setting:', I), I);
          }
          const Y = (e, t, r) => {
              let i = { w: 0, h: 0 };
              e.video?.w > 0 && e.video?.h > 0
                ? ((i.w = e.video.w), (i.h = e.video.h))
                : (i = (function (e) {
                    return e && e.length ? e.reduce((e, t) => (t.h * t.w < e.h * e.w ? t : e), e[0]) : { w: 0, h: 0 };
                  })(r));
              const o = document.getElementById(t);
              if (!o) return;
              const a = (0, u.tF)(o) ? (0, u.gl)(o, (0, n.getWindowTop)(), i) : 'na';
              (e.ext || (e.ext = {}), (e.ext.viewability = { amount: isNaN(a) ? a : Math.round(a) }));
            },
            ee = {
              code: 'pubmatic',
              gvlid: 76,
              supportedMediaTypes: [l.D4, l.G_, l.s6],
              alwaysHasCapacity: !0,
              isBidRequestValid: (e) => {
                if (!e || !e.params) return !1;
                const { publisherId: t } = e.params,
                  r = e.mediaTypes || {},
                  i = r[l.G_] || {};
                if (!(0, s.O8)(t))
                  return (
                    (0, n.logWarn)(
                      y +
                        'Error: publisherId is mandatory and cannot be numeric (wrap it in quotes in your config). Call to OpenBid will not be sent for ad unit: ' +
                        JSON.stringify(e),
                    ),
                    !1
                  );
                if (r.hasOwnProperty(l.G_)) {
                  const t = (0, o.A)(e, 'mediaTypes.video.mimes'),
                    a = (0, o.A)(e, 'params.video.mimes');
                  if (!K(t) && !K(a))
                    return (
                      (0, n.logWarn)(
                        y +
                          'Error: For video ads, bid.mediaTypes.video.mimes OR bid.params.video.mimes should be present and must be a non-empty array. Call to OpenBid will not be sent for ad unit:' +
                          JSON.stringify(e),
                      ),
                      !1
                    );
                  if (!i.context) return ((0, n.logError)(`${y}: No context specified in bid. Rejecting bid: `, e), !1);
                  if ('outstream' === i.context && !(0, s.O8)(e.params.outstreamAU) && !e.renderer && !i.renderer)
                    return r.hasOwnProperty(l.D4) || r.hasOwnProperty(l.s6)
                      ? (delete r[l.G_],
                        (0, n.logWarn)(
                          `${y}: for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting mediatype Video of bid: `,
                          e,
                        ),
                        !0)
                      : ((0, n.logError)(
                          `${y}: for "outstream" bids either outstreamAU parameter must be provided or ad unit supplied renderer is required. Rejecting bid: `,
                          e,
                        ),
                        !1);
                }
                return !0;
              },
              buildRequests: (e, t) => {
                const { page: r, ref: i } = t?.refererInfo || {},
                  { publisherId: o, profId: a, verId: d } = t?.bids?.[0]?.params || {};
                var l;
                U =
                  o?.trim() ||
                  ((l = t?.bids),
                  (Array.isArray(l) && l.length > 0 && l.find((e) => e.params?.publisherId?.trim())?.params.publisherId) || null)?.trim();
                const c = (0, n.generateUUID)();
                let p;
                ((R = []),
                  (E = []),
                  (j = {
                    pageURL: r || window.location.href,
                    refURL: i || window.document.referrer,
                    pubId: U,
                    kadpageurl: r || window.location.href,
                    profId: a,
                    verId: d,
                  }),
                  e.forEach((e) => {
                    ((e.params.wiid = e.params.wiid || t.auctionId || c),
                      (p = (0, s.Go)(e)),
                      ((e, t) => {
                        Object.keys(O).forEach((r) => {
                          const i = e[r];
                          i &&
                            ((0, s.O8)(i)
                              ? (t[r] = i)
                              : (0, n.logWarn)(`${y}Ignoring param: ${r} with value: ${O[r]}, expects string value, found ${typeof i}`));
                        });
                      })(p.params, j));
                    const { bcat: r, acat: i } = p.params;
                    (r && (R = R.concat(r)), i && (E = E.concat(i)));
                  }));
                const u = k.toORTB({ validBidRequests: e, bidderRequest: t }),
                  m = {
                    method: 'POST',
                    url: 'https://hbopenbid.pubmatic.com/translator?source=prebid-client',
                    data: u,
                    bidderRequest: t,
                    options: { endpointCompression: Q() },
                  };
                return u?.imp?.length ? m : null;
              },
              interpretResponse: (e, t) => {
                const { bids: r } = k.fromORTB({ response: e.body, request: t.data });
                return r;
              },
              getUserSyncs: (e, t, r, i, n) => {
                let o = U;
                (r && (o += `&gdpr=${r.gdprApplies ? 1 : 0}&gdpr_consent=${encodeURIComponent(r.consentString || '')}`),
                  i && (o += `&us_privacy=${encodeURIComponent(i)}`),
                  n?.gppString &&
                    n?.applicableSections?.length &&
                    (o += `&gpp=${encodeURIComponent(n.gppString)}&gpp_sid=${encodeURIComponent(n.applicableSections.join(','))}`),
                  !0 === c.$W.getConfig('coppa') && (o += '&coppa=1'));
                const a = e.iframeEnabled ? 'iframe' : 'image';
                return [
                  {
                    type: a,
                    url:
                      ('iframe' === a
                        ? 'https://ads.pubmatic.com/AdServer/js/user_sync.html?kdntuid=1&p='
                        : 'https://image8.pubmatic.com/AdServer/ImgSync?p=') + o,
                  },
                ];
              },
              onBidWon: (e) => {
                !(function (e) {
                  if (!e) return;
                  const { originalCurrency: t, currency: r, cpm: i, originalCpm: n, meta: o } = e,
                    a = t !== r && (0, s.fp)(e.getCpmInNewCurrency) ? e.getCpmInNewCurrency(t) : i,
                    d = e.mediaType,
                    l = o?.mediaType;
                  _ = _ || { currency: r, originalCurrency: t, adjustment: [] };
                  const c = { cpmAdjustment: Number(((n - a) / n).toFixed(2)), mediaType: d, metaMediaType: l, cpm: a, originalCpm: n },
                    p = _?.adjustment?.findIndex((e) => e?.mediaType === d && e?.metaMediaType === l);
                  -1 !== p ? _.adjustment.splice(p, 1, c) : _.adjustment.push(c);
                })(e);
              },
            };
          ((0, d.a$)(ee), (0, i.E)('pubmaticBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 8498, 2316, 259, 4472, 7464], () => {
          return ((t = 755), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [2711],
      {
        2326(e, t, r) {
          var i = r(1748),
            n = r(9201),
            o = r(2599),
            s = r(3556),
            a = r(1933),
            d = r(9794),
            c = r(466),
            p = r(8928),
            u = r(3435),
            l = r(6665),
            m = r(3819),
            x = r(9077),
            b = r(9357);
          let g = a.$W.getConfig('rubicon') || {};
          a.$W.getConfig('rubicon', (e) => {
            (0, c.mergeDeep)(g, e.rubicon);
          });
          let f = {};
          var y = {
            1: '468x60',
            2: '728x90',
            5: '120x90',
            7: '125x125',
            8: '120x600',
            9: '160x600',
            10: '300x600',
            13: '200x200',
            14: '250x250',
            15: '300x250',
            16: '336x280',
            17: '240x400',
            19: '300x100',
            31: '980x120',
            32: '250x360',
            33: '180x500',
            35: '980x150',
            37: '468x400',
            38: '930x180',
            39: '750x100',
            40: '750x200',
            41: '750x300',
            42: '2x4',
            43: '320x50',
            44: '300x50',
            48: '300x300',
            53: '1024x768',
            54: '300x1050',
            55: '970x90',
            57: '970x250',
            58: '1000x90',
            59: '320x80',
            60: '320x150',
            61: '1000x1000',
            64: '580x500',
            65: '640x480',
            66: '930x600',
            67: '320x480',
            68: '1800x1000',
            72: '320x320',
            73: '320x160',
            78: '980x240',
            79: '980x300',
            80: '980x400',
            83: '480x300',
            85: '300x120',
            90: '548x150',
            94: '970x310',
            95: '970x100',
            96: '970x210',
            101: '480x320',
            102: '768x1024',
            103: '480x280',
            105: '250x800',
            108: '320x240',
            113: '1000x300',
            117: '320x100',
            125: '800x250',
            126: '200x600',
            144: '980x600',
            145: '980x150',
            152: '1000x250',
            156: '640x320',
            159: '320x250',
            179: '250x600',
            195: '600x300',
            198: '640x360',
            199: '640x200',
            210: '1080x1920',
            213: '1030x590',
            214: '980x360',
            219: '1920x1080',
            221: '1x1',
            229: '320x180',
            230: '2000x1400',
            232: '580x400',
            234: '6x6',
            251: '2x2',
            256: '480x820',
            257: '400x600',
            258: '500x200',
            259: '998x200',
            261: '480x480',
            264: '970x1000',
            274: '1800x200',
            278: '320x500',
            282: '320x400',
            288: '640x380',
            484: '720x1280',
            524: '1x2',
            548: '500x1000',
            550: '980x480',
            552: '300x200',
            558: '640x640',
            562: '300x431',
            564: '320x431',
            566: '320x300',
            568: '300x150',
            570: '300x125',
            572: '250x350',
            574: '620x891',
            576: '610x877',
            578: '980x552',
            580: '505x656',
            622: '192x160',
            632: '1200x450',
            634: '340x450',
            680: '970x570',
            682: '300x240',
            684: '970x550',
            686: '300x210',
            688: '300x220',
            690: '970x170',
            710: '600x250',
            712: '340x430',
          };
          (0, c._each)(y, (e, t) => {
            y[e] = t;
          });
          const _ = (0, n.A)({
              request(e, t, r, n) {
                const { bidRequests: o } = n,
                  s = e(t, r, n);
                var d;
                ((s.cur = ['USD']),
                  (s.test = a.$W.getConfig('debug') ? 1 : 0),
                  (0, u.J)(s, 'ext.prebid.cache', { vastxml: { returnCreative: !0 === g.returnVast } }),
                  (0, u.J)(s, 'ext.prebid.bidders', { rubicon: { integration: g.int_type || 'pbjs' } }),
                  (0, u.J)(s, 'ext.prebid.targeting.pricegranularity', {
                    ranges: {
                      low: [{ max: 5, increment: 0.5 }],
                      medium: [{ max: 20, increment: 0.1 }],
                      high: [{ max: 20, increment: 0.01 }],
                      auto: [
                        { max: 5, increment: 0.05 },
                        { min: 5, max: 10, increment: 0.1 },
                        { min: 10, max: 20, increment: 0.5 },
                      ],
                      dense: [
                        { max: 3, increment: 0.01 },
                        { min: 3, max: 8, increment: 0.05 },
                        { min: 8, max: 20, increment: 0.5 },
                      ],
                      custom: (d = a.$W).getConfig('customPriceBucket') && d.getConfig('customPriceBucket').buckets,
                    }[d.getConfig('priceGranularity')],
                  }));
                const p = (0, i.m)().installedModules;
                (!p ||
                  (p.length && -1 === p.indexOf('rubiconAnalyticsAdapter')) ||
                  (0, u.J)(s, 'ext.prebid.analytics', { rubicon: { 'client-analytics': !0 } }),
                  (function (e, t, r) {
                    let i = {};
                    const n = (0, m.D)(r, ...t.map((e) => e.params.keywords));
                    (t.forEach((t) => {
                      const r = { user: { ext: { data: { ...t.params.visitor } } }, site: { ext: { data: { ...t.params.inventory } } } },
                        n = e.imp.find((e) => e.ext?.prebid?.bidder?.rubicon?.video?.language);
                      (n && (r.site.content = { language: n.ext?.prebid?.bidder?.rubicon?.video?.language }),
                        (i = (0, c.mergeDeep)(i, t.ortb2 || {}, r)));
                      const o = a.$W.getConfig('user.id');
                      i.user.id = i.user.id || o;
                    }),
                      (0, c.mergeDeep)(e, i),
                      n && n.length && (0, u.J)(e, 'site.keywords', n.join(',')));
                    delete e?.ext?.prebid?.storedrequest;
                  })(s, o, r.ortb2),
                  delete s?.ext?.prebid?.storedrequest,
                  !0 === g.disableFloors && delete s.ext.prebid.floors);
                return (o.filter((e) => 'object' == typeof e.floorData).length > 0 && (s.ext.prebid.floors = { enabled: !1 }), s);
              },
              imp(e, t, r) {
                const i = k(t);
                if (i.includes(d.D4) && 1 === i.length) return;
                const n = e(t, r);
                return (
                  (n.id = t.adUnitCode),
                  delete n.banner,
                  'atf' === t.params.position && n.video && (n.video.pos = 1),
                  'btf' === t.params.position && n.video && (n.video.pos = 3),
                  delete n.ext?.prebid?.storedrequest,
                  !0 === t.params.bidonmultiformat && i.length > 1 && (0, u.J)(n, 'ext.prebid.bidder.rubicon.formats', i),
                  (function (e, t) {
                    'USD' !== t.bidfloorcur && (delete t.bidfloor, delete t.bidfloorcur);
                    if (!t.bidfloor) {
                      const r = parseFloat((0, p.A)(e, 'params.floor'));
                      isNaN(r) || ((t.bidfloor = r), (t.bidfloorcur = 'USD'));
                    }
                  })(t, n),
                  (n.id = f[n.id] ? n.id + f[n.id]++ : ((f[n.id] = 2), n.id)),
                  n
                );
              },
              bidResponse(e, t, r) {
                const i = e(t, r);
                i.meta.mediaType = (0, p.A)(t, 'ext.prebid.type');
                const { bidRequest: n } = r,
                  [o, s] = 'outstream' === n.mediaTypes.video?.context ? A(n, d.G_) : [void 0, void 0];
                return (
                  (i.width = t.w || o || i.playerWidth || 0),
                  (i.height = t.h || s || i.playerHeight || 0),
                  i.mediaType === d.G_ &&
                    'outstream' === n.mediaTypes.video.context &&
                    (i.renderer = (0, b.S_)(i, g.rendererUrl, g.rendererConfig)),
                  (0, p.A)(t, 'ext.bidder.rp.advid') && (0, u.J)(i, 'meta.advertiserId', t.ext.bidder.rp.advid),
                  i
                );
              },
              context: { netRevenue: !1 !== g.netRevenue, ttl: 360 },
              processors: o.m,
            }),
            h = {
              code: 'rubicon',
              gvlid: 52,
              supportedMediaTypes: [d.D4, d.G_, d.s6],
              isBidRequestValid: function (e) {
                let t = !0;
                if ('object' != typeof e.params) return !1;
                for (let t = 0, r = ['accountId', 'siteId', 'zoneId']; t < r.length; t++)
                  if (((e.params[r[t]] = parseInt(e.params[r[t]])), isNaN(e.params[r[t]])))
                    return ((0, c.logError)('Rubicon: wrong format of accountId or siteId or zoneId.'), !1);
                const r = k(e, !0);
                if (!r.length) return !1;
                r.includes(d.G_) &&
                  (t = (function (e) {
                    let t = !0;
                    const r = Object.prototype.toString.call([]),
                      i = Object.prototype.toString.call(0);
                    var n = { mimes: r, protocols: r, linearity: i };
                    return (
                      Object.keys(n).forEach(function (r) {
                        Object.prototype.toString.call((0, p.A)(e, 'mediaTypes.video.' + r)) !== n[r] &&
                          ((t = !1), (0, c.logError)('Rubicon: mediaTypes.video.' + r + ' is required and must be of type: ' + n[r]));
                      }),
                      t
                    );
                  })(e));
                const i = [d.D4, d.s6].filter((e) => r.includes(e)).length > 0;
                return i ? t && i : t;
              },
              buildRequests: function (e, t) {
                let r = [];
                const i = [];
                let n;
                if (
                  ((n = e.filter((e) => {
                    const t = k(e) || [],
                      { length: r } = t,
                      { bidonmultiformat: i, video: n } = e.params || {};
                    return (
                      (1 === r && (t.includes(d.G_) || t.includes(d.s6))) ||
                      (2 === r && !t.includes(d.D4)) ||
                      (n && t.includes(d.G_)) ||
                      (i && (t.includes(d.G_) || t.includes(d.s6)))
                    );
                  })),
                  n && n.length)
                ) {
                  const e = _.toORTB({ bidRequests: n, bidderRequest: t });
                  ($(),
                    i.push({
                      method: 'POST',
                      url: `https://${g.videoHost || 'prebid-server'}.rubiconproject.com/openrtb2/auction`,
                      data: e,
                      bidRequest: n,
                    }));
                }
                const o = e.filter((e) => {
                  const t = k(e) || [],
                    { bidonmultiformat: r, video: i } = e.params || {};
                  return t.includes(d.D4) && (1 === t.length || r || (!r && !i) || (!r && i && !t.includes(d.G_)));
                });
                if (!0 !== g.singleRequest)
                  r = i.concat(
                    o.map((e) => {
                      const r = h.createSlotParams(e, t);
                      return {
                        method: 'GET',
                        url: `https://${g.bannerHost || 'fastlane'}.rubiconproject.com/a/api/fastlane.json`,
                        data:
                          h.getOrderedParams(r).reduce((e, t) => {
                            const i = r[t];
                            return ((0, l.O8)(i) && '' !== i) || (0, l.Et)(i) ? `${e}${O(t, i)}&` : e;
                          }, '') + `slots=1&rand=${Math.random()}`,
                        bidRequest: e,
                      };
                    }),
                  );
                else {
                  const e = o.reduce((e, t) => ((e[t.params.siteId] = e[t.params.siteId] || []).push(t), e), {}),
                    n = 10;
                  r = i.concat(
                    Object.keys(e).reduce(
                      (r, i) => (
                        (function (e, t) {
                          const r = [];
                          for (let i = 0; i < e.length; i += t) r.push(e.slice(i, i + t));
                          return r;
                        })(e[i], n).forEach((e) => {
                          const i = h.combineSlotUrlParams(e.map((e) => h.createSlotParams(e, t)));
                          r.push({
                            method: 'GET',
                            url: `https://${g.bannerHost || 'fastlane'}.rubiconproject.com/a/api/fastlane.json`,
                            data:
                              h.getOrderedParams(i).reduce((e, t) => {
                                const r = i[t];
                                return ((0, l.O8)(r) && '' !== r) || (0, l.Et)(r) ? `${e}${O(t, r)}&` : e;
                              }, '') + `slots=${e.length}&rand=${Math.random()}`,
                            bidRequest: e,
                          });
                        }),
                        r
                      ),
                      [],
                    ),
                  );
                }
                return r;
              },
              getOrderedParams: function (e) {
                const t = /^tg_v/,
                  r = /^tg_i/,
                  i = /^eid_|^tpid_/,
                  n = [
                    'account_id',
                    'site_id',
                    'zone_id',
                    'size_id',
                    'alt_size_ids',
                    'p_pos',
                    'gdpr',
                    'gdpr_consent',
                    'us_privacy',
                    'gpp',
                    'gpp_sid',
                    'rp_schain',
                  ]
                    .concat(Object.keys(e).filter((e) => i.test(e)))
                    .concat(['x_liverampidl', 'ppuid', 'rf', 'p_geo.latitude', 'p_geo.longitude', 'kw'])
                    .concat(Object.keys(e).filter((e) => t.test(e)))
                    .concat(Object.keys(e).filter((e) => r.test(e)))
                    .concat(['tk_flint', 'x_source.tid', 'l_pb_bid_id', 'p_screen_res', 'o_cdep', 'rp_floor', 'rp_secure', 'tk_user_key']);
                return n.concat(Object.keys(e).filter((e) => -1 === n.indexOf(e)));
              },
              combineSlotUrlParams: function (e) {
                if (1 === e.length) return e[0];
                const t = e.reduce(function (t, r, i) {
                    return (
                      Object.keys(r).forEach(function (n) {
                        (t.hasOwnProperty(n) || (t[n] = new Array(e.length)), t[n].splice(i, 1, r[n]));
                      }),
                      t
                    );
                  }, {}),
                  r = new RegExp('^([^;]*)(;\\1)+$');
                return (
                  Object.keys(t).forEach(function (e) {
                    const i = t[e].join(';'),
                      n = i.match(r);
                    t[e] = n ? n[1] : i;
                  }),
                  t
                );
              },
              createSlotParams: function (e, t) {
                e.startTime = new Date().getTime();
                const r = e.params,
                  i = A(e, 'banner'),
                  [n, o] = r.latLong || [],
                  s = {
                    account_id: r.accountId,
                    site_id: r.siteId,
                    zone_id: r.zoneId,
                    size_id: i[0],
                    alt_size_ids: i.slice(1).join(',') || void 0,
                    rp_floor: (r.floor = parseFloat(r.floor)) >= 0.01 ? r.floor : void 0,
                    rp_secure: '1',
                    tk_flint: `${g.int_type || 'pbjs_lite'}_v10.29.0`,
                    'x_source.tid': t.ortb2?.source?.tid,
                    'x_imp.ext.tid': e.ortb2Imp?.ext?.tid,
                    l_pb_bid_id: e.bidId,
                    o_cdep: e.ortb2?.device?.ext?.cdep,
                    ip: e.ortb2?.device?.ip,
                    ipv6: e.ortb2?.device?.ipv6,
                    p_screen_res: [window.screen.width, window.screen.height].join('x'),
                    tk_user_key: r.userId,
                    'p_geo.latitude': isNaN(parseFloat(n)) ? void 0 : parseFloat(n).toFixed(4),
                    'p_geo.longitude': isNaN(parseFloat(o)) ? void 0 : parseFloat(o).toFixed(4),
                    'tg_fl.eid': e.code,
                    rf: v(e, t),
                  };
                if ('function' == typeof e.getFloor && !g.disableFloors) {
                  let t;
                  try {
                    t = e.getFloor({ currency: 'USD', mediaType: 'banner', size: '*' });
                  } catch (e) {
                    (0, c.logError)('Rubicon: getFloor threw an error: ', e);
                  }
                  s.rp_hard_floor = (0, l.Qd)(t) && 'USD' === t.currency && !isNaN(parseInt(t.floor)) ? t.floor : void 0;
                }
                !0 === r.bidonmultiformat &&
                  (0, p.A)(e, 'mediaTypes') &&
                  Object.keys(e.mediaTypes).length > 1 &&
                  (s.p_formats = Object.keys(e.mediaTypes).join(','));
                const u = { 1: 'atf', 3: 'btf' }[(0, p.A)(e, 'mediaTypes.banner.pos')] || '';
                s.p_pos = 'atf' === r.position || 'btf' === r.position ? r.position : u;
                const m = a.$W.getConfig('user.id');
                (m && (s.ppuid = m),
                  'number' == typeof e?.ortb2?.site?.mobile && (s['p_site.mobile'] = e.ortb2.site.mobile),
                  e?.ortb2?.user?.ext?.eids &&
                    e.ortb2.user.ext.eids.forEach((e) => {
                      let { source: t, uids: r = [], inserter: i, matcher: n, mm: o, ext: a = {} } = e;
                      try {
                        const e = r[0];
                        if (!e) return;
                        const a = (e) =>
                            [e.id, e.atype || '', '', i || '', n || '', o || '', e?.ext?.rtiPartner || e?.ext?.rtipartner || ''].join('^'),
                          d = a(e);
                        if (((s[`eid_${t}`] = d), !s.ppuid)) {
                          const e = r.find((e) => 'ppuid' === e.ext?.stype);
                          e?.id && (s.ppuid = e.id);
                        }
                      } catch (e) {
                        (0, c.logWarn)('Rubicon: error reading eid:', { source: t, uids: r }, e);
                      }
                    }),
                  t.gdprConsent &&
                    ('boolean' == typeof t.gdprConsent.gdprApplies && (s.gdpr = Number(t.gdprConsent.gdprApplies)),
                    (s.gdpr_consent = t.gdprConsent.consentString)),
                  t.uspConsent && (s.us_privacy = encodeURIComponent(t.uspConsent)),
                  t.gppConsent?.gppString && ((s.gpp = t.gppConsent.gppString), (s.gpp_sid = t.gppConsent?.applicableSections?.toString())),
                  (s.rp_maxbids = t.bidLimit),
                  (function (e, t, r) {
                    const i = { user: { ext: { data: { ...e.params.visitor } } }, site: { ext: { data: { ...e.params.inventory } } } };
                    e.params.keywords && (i.site.keywords = (0, l.cy)(e.params.keywords) ? e.params.keywords.join(',') : e.params.keywords);
                    const n = (0, c.mergeDeep)({}, e.ortb2 || {}, i),
                      o = (0, p.A)(e.ortb2Imp, 'ext') || {},
                      s = (0, p.A)(e.ortb2Imp, 'ext.data') || {},
                      a = (0, p.A)(e, 'ortb2Imp.ext.gpid'),
                      u = (0, p.A)(n, 'regs.ext.dsa'),
                      m = { user: [4], site: [1, 2, 5, 6, 7] },
                      x = { user: 'tg_v.', site: 'tg_i.', adserver: 'tg_i.dfp_ad_unit_code', pbadslot: 'tg_i.pbadslot', keywords: 'kw' },
                      b = function (e, t, r) {
                        return 'data' === t && Array.isArray(e)
                          ? e
                              .filter(
                                (e) => e.segment && (0, p.A)(e, 'ext.segtax') && m[r] && -1 !== m[r].indexOf((0, p.A)(e, 'ext.segtax')),
                              )
                              .map((e) => {
                                const t = e.segment.filter((e) => e.id).reduce((e, t) => (e.push(t.id), e), []);
                                return t.length > 0 ? t.toString() : '';
                              })
                              .toString()
                          : ('object' != typeof e || Array.isArray(e)) && void 0 !== e
                            ? Array.isArray(e)
                              ? e
                                  .filter(
                                    (e) =>
                                      ('object' != typeof e && void 0 !== e) ||
                                      ((0, c.logWarn)(
                                        'Rubicon: Filtered value: ',
                                        e,
                                        'for key',
                                        t,
                                        ': Expected value to be string, integer, or an array of strings/ints',
                                      ),
                                      !1),
                                  )
                                  .map((e) => e.toString())
                                  .toString()
                              : e.toString()
                            : void 0;
                      },
                      f = function (e, t, i) {
                        let n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
                        const o = b(e, i, t),
                          s = x[i] && n ? `${x[i]}` : 'data' === i ? `${x[t]}iab` : `${x[t]}${i}`;
                        r[s] = r[s] ? r[s].concat(',', o) : o;
                      };
                    if (t === d.D4) {
                      (['site', 'user'].forEach((e) => {
                        Object.keys(n[e]).forEach((t) => {
                          'site' === e && 'content' === t && n[e][t].data
                            ? f(n[e][t].data, e, 'data')
                            : 'ext' !== t
                              ? f(n[e][t], e, t)
                              : n[e][t].data &&
                                Object.keys(n[e].ext.data).forEach((t) => {
                                  f(n[e].ext.data[t], e, t, !1);
                                });
                        });
                      }),
                        Object.keys(s).forEach((e) => {
                          'adserver' !== e ? f(s[e], 'site', e) : 'gam' === s[e].name && f(s[e].adslot, name, e);
                        }),
                        a && (r.p_gpid = a),
                        u &&
                          Object.keys(u).length &&
                          (0, c.pick)(u, [
                            'dsainfo',
                            (e) => {
                              r.dsainfo = e;
                            },
                            'dsarequired',
                            (e) => {
                              r.dsarequired = e;
                            },
                            'pubrender',
                            (e) => {
                              r.dsapubrender = e;
                            },
                            'datatopub',
                            (e) => {
                              r.dsadatatopubs = e;
                            },
                            'transparency',
                            (e) => {
                              Array.isArray(e) &&
                                e.length &&
                                (r.dsatransparency = e.reduce((e, t) => {
                                  const r = t.domain || '';
                                  if (!r) return e;
                                  const i = t.dsaparams || t.params;
                                  return Array.isArray(i) && 0 !== i.length ? (e && (e += '~~'), (e += `${r}~${i.join('_')}`)) : e;
                                }, ''));
                            },
                          ]),
                        r['tg_i.pbadslot'] && delete r['tg_i.dfp_ad_unit_code']);
                      const e = (0, p.A)(n, 'device.sua');
                      e &&
                        !1 !== g.chEnabled &&
                        (0, c.pick)(e, [
                          'architecture',
                          (e) => {
                            r.m_ch_arch = e;
                          },
                          'bitness',
                          (e) => {
                            r.m_ch_bitness = e;
                          },
                          'browsers',
                          (e) => {
                            if (!Array.isArray(e)) return;
                            const [t, i] = e.reduce(
                              (e, t) => (
                                e[0].push(`"${t?.brand}"|v="${t?.version?.[0]}"`),
                                t?.version?.length > 1 && e[1].push(`"${t?.brand}"|v="${t?.version?.join?.('.')}"`),
                                e
                              ),
                              [[], []],
                            );
                            ((r.m_ch_ua = t?.join?.(',')), (r.m_ch_full_ver = i?.join?.(',')));
                          },
                          'mobile',
                          (e) => {
                            r.m_ch_mobile = `?${e}`;
                          },
                          'model',
                          (e) => {
                            r.m_ch_model = e;
                          },
                          'platform',
                          (e) => {
                            ((r.m_ch_platform = e?.brand), (r.m_ch_platform_ver = e?.version?.join?.('.')));
                          },
                        ]);
                    } else
                      (Object.keys(o).length && (0, c.mergeDeep)(r.imp[0].ext, o), a && (r.imp[0].ext.gpid = a), (0, c.mergeDeep)(r, n));
                  })(e, d.D4, s),
                  !0 === a.$W.getConfig('coppa') && (s.coppa = 1));
                const x = e?.ortb2?.source?.ext?.schain;
                return (x && R(x) && (s.rp_schain = h.serializeSupplyChain(x)), s);
              },
              serializeSupplyChain: function (e) {
                if (!R(e)) return '';
                const { ver: t, complete: r, nodes: i } = e;
                return `${t},${r}!${h.serializeSupplyChainNodes(i)}`;
              },
              serializeSupplyChainNodes: function (e) {
                const t = ['asi', 'sid', 'hp', 'rid', 'name', 'domain'];
                return e.map((e) => t.map((t) => encodeURIComponent(e[t] || '')).join(',')).join('!');
              },
              interpretResponse: function (e, t) {
                e = e.body;
                const { data: r } = t;
                if (!e || 'object' != typeof e) return [];
                if (e.seatbid) {
                  const t = (0, p.A)(e, 'ext.errors.rubicon');
                  Array.isArray(t) && t.length > 0 && (0, c.logWarn)('Rubicon: Error in video response');
                  return _.fromORTB({ request: r, response: e }).bids;
                }
                let i,
                  n = e.ads,
                  o = 0;
                const { bidRequest: s } = t;
                if (
                  ('object' == typeof s && !Array.isArray(s) && k(s).includes(d.G_) && 'object' == typeof n && (n = n[s.adUnitCode]),
                  !Array.isArray(n) || n.length < 1)
                )
                  return [];
                return n
                  .reduce((t, r, n) => {
                    if ((r.impression_id && i === r.impression_id ? o++ : (i = r.impression_id), 'ok' !== r.status)) return t;
                    const a = Array.isArray(s) ? s[n - o] : s;
                    if (a && 'object' == typeof a) {
                      const e = {
                        requestId: a.bidId,
                        currency: 'USD',
                        creativeId: r.creative_id || `${r.network || ''}-${r.advertiser || ''}`,
                        cpm: r.cpm || 0,
                        dealId: r.deal,
                        ttl: 360,
                        netRevenue: !1 !== g.netRevenue,
                        rubicon: { advertiserId: r.advertiser, networkId: r.network },
                        meta: { advertiserId: r.advertiser, networkId: r.network, mediaType: d.D4 },
                      };
                      (r.creative_type && (e.mediaType = r.creative_type),
                        r.dsa && Object.keys(r.dsa).length && (e.meta.dsa = r.dsa),
                        r.adomain && (e.meta.advertiserDomains = Array.isArray(r.adomain) ? r.adomain : [r.adomain]),
                        r.emulated_format && (e.meta.mediaType = r.emulated_format),
                        r.creative_type === d.G_
                          ? ((e.width = a.params.video.playerWidth),
                            (e.height = a.params.video.playerHeight),
                            (e.vastUrl = r.creative_depot_url),
                            (e.impression_id = r.impression_id),
                            (e.videoCacheKey = r.impression_id))
                          : ((e.ad =
                              ((p = r.script),
                              `<html>\n<head><script type='text/javascript'>inDapIF=true;<\/script></head>\n<body style='margin : 0; padding: 0;'>\n\x3c!-- Rubicon Project Ad Tag --\x3e\n<div data-rp-impression-id='${r.impression_id}'>\n<script type='text/javascript'>${p}<\/script>\n</div>\n</body>\n</html>`)),
                            ([e.width, e.height] = y[r.size_id].split('x').map((e) => Number(e)))),
                        r.bid_cat &&
                          r.bid_cat.length &&
                          ((e.meta.primaryCatId = r.bid_cat[0]), r.bid_cat.length > 1 && (e.meta.secondaryCatIds = r.bid_cat.slice(1))),
                        (e.rubiconTargeting = (Array.isArray(r.targeting) ? r.targeting : []).reduce(
                          (e, t) => ((e[t.key] = t.values[0]), e),
                          { rpfl_elemid: a.adUnitCode },
                        )),
                        t.push(e));
                    } else (0, c.logError)(`Rubicon: bidRequest undefined at index position:${n}`, s, e);
                    var p;
                    return t;
                  }, [])
                  .sort((e, t) => (t.cpm || 0) - (e.cpm || 0));
              },
              getUserSyncs: function (e, t, r, i, n) {
                if (e.iframeEnabled) {
                  let e = (0, x.d)(r, i, n);
                  return (
                    (e = Object.keys(e).length ? `?${(0, c.formatQS)(e)}` : ''),
                    { type: 'iframe', url: `https://${g.syncHost || 'eus'}.rubiconproject.com/usync.html` + e }
                  );
                }
              },
            };
          function v(e, t) {
            let r;
            return ((r = e.params.referrer ? e.params.referrer : t.refererInfo.page), e.params.secure ? r.replace(/^http:/i, 'https:') : r);
          }
          function A(e, t) {
            const r = e.params;
            if (t === d.G_) {
              let t = [];
              return (
                r.video && r.video.playerWidth && r.video.playerHeight
                  ? (t = [r.video.playerWidth, r.video.playerHeight])
                  : Array.isArray((0, p.A)(e, 'mediaTypes.video.playerSize')) && 1 === e.mediaTypes.video.playerSize.length
                    ? (t = e.mediaTypes.video.playerSize[0])
                    : Array.isArray(e.sizes) &&
                      e.sizes.length > 0 &&
                      Array.isArray(e.sizes[0]) &&
                      e.sizes[0].length > 1 &&
                      (t = e.sizes[0]),
                t
              );
            }
            let i = [];
            return (
              Array.isArray(r.sizes)
                ? (i = r.sizes)
                : void 0 !== (0, p.A)(e, 'mediaTypes.banner.sizes')
                  ? (i = j(e.mediaTypes.banner.sizes))
                  : Array.isArray(e.sizes) && e.sizes.length > 0
                    ? (i = j(e.sizes))
                    : (0, c.logWarn)('Rubicon: no sizes are setup or found'),
              (function (e) {
                const t = [15, 2, 9];
                return e.sort((e, r) => {
                  const i = t.indexOf(e),
                    n = t.indexOf(r);
                  return i > -1 || n > -1 ? (-1 === i ? 1 : -1 === n ? -1 : i - n) : e - r;
                });
              })(i)
            );
          }
          function j(e) {
            return (0, c.parseSizesInput)(e).reduce((e, t) => {
              const r = parseInt(y[t], 10);
              return (r && e.push(r), e);
            }, []);
          }
          function k(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            const r = [];
            if (
              (function (e) {
                let t = void 0 !== (0, p.A)(e, `mediaTypes.${d.G_}`);
                const r = void 0 !== (0, p.A)(e, `mediaTypes.${d.D4}`),
                  i = void 0 !== (0, p.A)(e, 'params.bidonmultiformat'),
                  n = 'object' != typeof (0, p.A)(e, 'params.video');
                return !(!t || !i) || (r && n && (t = !1), t && n && (0, u.J)(e, 'params.video', {}), t);
              })(e)
            ) {
              if (-1 === ['outstream', 'instream'].indexOf((0, p.A)(e, `mediaTypes.${d.G_}.context`)))
                return (t && (0, c.logError)('Rubicon: mediaTypes.video.context must be outstream or instream'), r);
              if (A(e, d.G_).length < 2) return (t && (0, c.logError)('Rubicon: could not determine the playerSize of the video'), r);
              (t && (0, c.logMessage)('Rubicon: making video request for adUnit', e.adUnitCode), r.push(d.G_));
            }
            if ((void 0 !== (0, p.A)(e, `mediaTypes.${d.s6}`) && r.push(d.s6), void 0 !== (0, p.A)(e, `mediaTypes.${d.D4}`))) {
              if (0 === A(e, d.D4).length) return (t && (0, c.logError)('Rubicon: could not determine the sizes for banner request'), r);
              (t && (0, c.logMessage)('Rubicon: making banner request for adUnit', e.adUnitCode), r.push(d.D4));
            }
            return r;
          }
          const $ = () => {
            f = {};
          };
          function R(e) {
            let t = !1;
            const r = ['asi', 'sid', 'hp'];
            return e.nodes
              ? ((t = e.nodes.reduce((e, t) => (e ? r.every((e) => t.hasOwnProperty(e)) : e), !0)),
                t || (0, c.logError)('Rubicon: required schain params missing'),
                t)
              : t;
          }
          function O(e, t) {
            return 'rp_schain' === e ? `rp_schain=${t}` : `${e}=${encodeURIComponent(t)}`;
          }
          ((0, s.a$)(h), (0, i.E)('rubiconBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 8498, 7247, 7618, 6550, 9965], () => {
          return ((t = 2326), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [5496],
      {
        8959(e, o, t) {
          var n = t(1748),
            r = t(466),
            d = t(2592),
            i = t(1443),
            a = t(1385),
            u = t(736),
            s = t(8074);
          const c = (0, i.vM)({ moduleType: u.fW, moduleName: 'sharedId' }),
            l = 'cookie',
            m = 'html5',
            p = '_pubcid_optout',
            f = 'PublisherCommonId';
          function g(e, o) {
            if (o === l) return c.getCookie(e);
            if (o === m && c.hasLocalStorage()) {
              const o = c.getDataFromLocalStorage(`${e}_exp`);
              if (!o) return c.getDataFromLocalStorage(e);
              if (new Date(o).getTime() - Date.now() > 0) return c.getDataFromLocalStorage(e);
            }
          }
          function I(e, o) {
            return function (t, n) {
              o
                ? b(o, e, () => {
                    t(n() || e);
                  })()
                : t(e);
            };
          }
          function b(e) {
            let o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
              t = arguments.length > 2 ? arguments[2] : void 0;
            if (!e) return;
            const n = (0, r.parseUrl)(e);
            n.search.id = encodeURIComponent('pubcid:' + o);
            const d = (0, r.buildUrl)(n);
            return function () {
              (0, r.triggerPixel)(d, t);
            };
          }
          function h() {
            return !!((c.cookiesAreEnabled() && g(p, l)) || (c.hasLocalStorage() && g(p, m)));
          }
          const v = {
            name: 'sharedId',
            aliasName: 'pubCommonId',
            gvlid: a.B1,
            disclosureURL: 'local://prebid/sharedId-optout.json',
            decode(e, o) {
              if (h()) return void (0, r.logInfo)('PubCommonId decode: Has opted-out');
              (0, r.logInfo)(' Decoded value PubCommonId ' + e);
              return { pubcid: e };
            },
            getId: function () {
              let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                o = arguments.length > 1 ? arguments[1] : void 0,
                t = arguments.length > 2 ? arguments[2] : void 0;
              if (h()) return void (0, r.logInfo)('PubCommonId: Has opted-out');
              if (o?.coppa) return void (0, r.logInfo)('PubCommonId: IDs not provided for coppa requests, exiting PubCommonId');
              const { params: { create: n = !0, pixelUrl: d } = {} } = e;
              let i = t;
              if (!i) {
                try {
                  'object' == typeof window[f] && (i = window[f].getId());
                } catch (e) {}
                i || (i = n && (0, r.hasDeviceAccess)() ? (0, r.generateUUID)() : void 0);
              }
              return { id: i, callback: I(i, d) };
            },
            extendId: function () {
              let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                o = arguments.length > 1 ? arguments[1] : void 0,
                t = arguments.length > 2 ? arguments[2] : void 0;
              if (h()) return ((0, r.logInfo)('PubCommonId: Has opted-out'), { id: void 0 });
              if (o?.coppa) return void (0, r.logInfo)('PubCommonId: IDs not provided for coppa requests, exiting PubCommonId');
              const { params: { extend: n = !1, pixelUrl: d } = {} } = e;
              if (n) {
                if (d) {
                  return { callback: b(d, t) };
                }
                return { id: t };
              }
            },
            domainOverride: (0, s.w)(c, 'sharedId'),
            eids: {
              pubcid(e, o) {
                const t = { source: 'pubcid.org', uids: e.map((e) => ({ id: e, atype: 1 })) };
                return (null != o?.params?.inserter && (t.inserter = o.params.inserter), t);
              },
            },
          };
          ((0, d.bz)('userId', v), (0, n.E)('sharedIdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 2764], () => {
          return ((o = 8959), e((e.s = o)));
          var o;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [89],
      {
        3240(e, t, r) {
          var a = r(1748),
            n = r(3367),
            i = r(4603),
            s = r(9201),
            o = r(3556),
            d = r(1933),
            p = r(9794),
            l = r(1443),
            u = r(466),
            c = r(8928),
            m = r(6665);
          const g = 'sharethrough';
          let b = {},
            y = 0,
            h = null;
          const v = (0, l.vM)({ bidderCode: g });
          const x = {
              getProtocol: function () {
                return window.location.protocol;
              },
            },
            f = (0, s.A)({ context: { netRevenue: !0, ttl: 360 } }),
            I = {
              code: g,
              supportedMediaTypes: [p.G_, p.D4, p.s6],
              gvlid: 80,
              isBidRequestValid: (e) => !!e.params.pkey,
              buildRequests: (e, t) => {
                const r = t.timeout,
                  a = t.ortb2 || {},
                  s = x.getProtocol().indexOf('http') < 0 || x.getProtocol().indexOf('https') > -1,
                  o = {
                    id: (0, u.generateUUID)(),
                    at: 1,
                    cur: ['USD'],
                    tmax: r,
                    site: {
                      domain: (0, c.A)(t, 'refererInfo.domain', window.location.hostname),
                      page: (0, c.A)(t, 'refererInfo.page', window.location.href),
                      ref: (0, c.A)(t, 'refererInfo.ref'),
                      ...a.site,
                    },
                    device: {
                      ua: navigator.userAgent,
                      language: navigator.language,
                      js: 1,
                      dnt: (0, n.l)() ? 1 : 0,
                      h: window.screen.height,
                      w: window.screen.width,
                      ext: {},
                    },
                    regs: { coppa: !0 === d.$W.getConfig('coppa') ? 1 : 0, ext: {} },
                    source: {
                      tid: t.ortb2?.source?.tid,
                      ext: { version: '10.29.0', str: '4.3.0', schain: e[0]?.ortb2?.source?.ext?.schain },
                    },
                    bcat: (0, c.A)(t.ortb2, 'bcat') || e[0].params.bcat || [],
                    badv: (0, c.A)(t.ortb2, 'badv') || e[0].params.badv || [],
                    test: 0,
                  };
                if (
                  ((o.user = a.user ?? {}),
                  o.user.ext || (o.user.ext = {}),
                  (o.user.ext.eids = e[0].userIdAsEids || []),
                  e[0].params.equativNetworkId)
                ) {
                  ((h = !0),
                    (y = e[0].params.equativNetworkId),
                    (o.site.publisher = { id: e[0].params.equativNetworkId, ...o.site.publisher }));
                  const t = v.getDataFromLocalStorage(i.mN);
                  t && (o.user.buyeruid = t);
                }
                if ((t?.ortb2?.device && (0, u.mergeDeep)(o.device, t.ortb2.device), t.gdprConsent)) {
                  const e = !0 === t.gdprConsent.gdprApplies;
                  ((o.regs.ext.gdpr = e ? 1 : 0), e && (o.user.ext.consent = t.gdprConsent.consentString));
                }
                (t.uspConsent && ((o.regs.ext.us_privacy = t.uspConsent), (o.regs.us_privacy = t.uspConsent)),
                  t?.gppConsent?.gppString
                    ? ((o.regs.gpp = t.gppConsent.gppString), (o.regs.gpp_sid = t.gppConsent.applicableSections))
                    : t?.ortb2?.regs?.gpp && ((o.regs.ext.gpp = t.ortb2.regs.gpp), (o.regs.ext.gpp_sid = t.ortb2.regs.gpp_sid)),
                  t?.ortb2?.regs?.ext?.dsa && (o.regs.ext.dsa = t.ortb2.regs.ext.dsa));
                const p = e
                  .map((e) => {
                    const r = { ext: {} },
                      a = (0, c.A)(e, 'ortb2Imp.ext.tid');
                    a && (r.ext.tid = a);
                    const n = (0, c.A)(e, 'ortb2Imp.ext.gpid');
                    n && (r.ext.gpid = n);
                    const i = (0, c.A)(e, 'mediaTypes.native'),
                      o = (0, c.A)(e, 'mediaTypes.video');
                    if ((t.paapi?.enabled && e.mediaTypes.banner && (0, u.mergeDeep)(r, { ext: { ae: 1 } }), o)) {
                      let [e, t] = [640, 360];
                      o.playerSize && o.playerSize[0] && o.playerSize[0][0] && o.playerSize[0][1] && ([e, t] = o.playerSize[0]);
                      const a = (e, t, r) => {
                        if (['api', 'battr', 'mimes', 'playbackmethod', 'protocols'].includes(e)) {
                          if ((!Array.isArray(t[e]) || 0 === t[e].length) && t[e])
                            return void (0, u.logWarn)(
                              `Sharethrough: Invalid video request property: "${e}" must be an array with at least 1 entry.  Value supplied: "${t[e]}".  This will not be added to the bid request.`,
                            );
                        }
                        t[e] && (r.video[e] = t[e]);
                      };
                      r.video = { pos: o.pos ?? 0, topframe: (0, u.inIframe)() ? 0 : 1, w: e, h: t };
                      const n = [
                        'api',
                        'battr',
                        'companiontype',
                        'delivery',
                        'linearity',
                        'maxduration',
                        'mimes',
                        'minduration',
                        'placement',
                        'playbackmethod',
                        'plcmt',
                        'protocols',
                        'skip',
                        'skipafter',
                        'skipmin',
                        'startdelay',
                      ];
                      (h || n.push('companionad'),
                        n.forEach((e) => {
                          a(e, o, r);
                        }));
                    } else if (h && i) {
                      const a = f.toORTB({ bidRequests: [e], bidderRequest: t });
                      r.native = { ...a.imp[0].native };
                    } else {
                      r.banner = {
                        pos: (0, c.A)(e, 'mediaTypes.banner.pos', 0),
                        topframe: (0, u.inIframe)() ? 0 : 1,
                        format: e.sizes.map((e) => ({ w: +e[0], h: +e[1] })),
                      };
                      const t = (0, c.A)(e, 'mediaTypes.banner.battr', null) || (0, c.A)(e, 'ortb2Imp.banner.battr');
                      t && (r.banner.battr = t);
                    }
                    const d = h ? e.adUnitCode : String(e.params.pkey);
                    return { id: e.bidId, tagid: d, secure: s ? 1 : 0, bidfloor: w(e), ...r };
                  })
                  .filter((e) => !!e);
                let l = [];
                if (h) {
                  const t = e[0],
                    r = d.$W.getConfig('currency.adServerCurrency') || 'USD';
                  l = (0, i.Fd)(p, t, r, b, 'stx');
                }
                return p.map((e) => ({
                  method: 'POST',
                  url: h
                    ? 'https://ssb.smartadserver.com/api/bid?callerId=233'
                    : 'https://btlr.sharethrough.com/universal/v1?supply_id=WYu2BXv1',
                  data: { ...o, imp: h ? l : [e] },
                }));
              },
              interpretResponse: (e, t) => {
                let { body: r } = e;
                if (!r || !r.seatbid || 0 === r.seatbid.length || !r.seatbid[0].bid || 0 === r.seatbid[0].bid.length) return [];
                const a = r.ext?.auctionConfigs,
                  n = t.data.imp[0],
                  i = r.seatbid[0].bid.map((e) => {
                    const t = {
                      requestId: h ? b[e.impid] : e.impid,
                      width: +e.w,
                      height: +e.h,
                      cpm: +e.price,
                      creativeId: e.crid,
                      dealId: e.dealid || null,
                      mediaType: n.video ? p.G_ : n.native ? p.s6 : p.D4,
                      currency: r.cur || 'USD',
                      netRevenue: !0,
                      ttl: 'number' == typeof e.exp && e.exp > 0 ? e.exp : 360,
                      ad: e.adm,
                      nurl: e.nurl,
                      meta: {
                        advertiserDomains: e.adomain || [],
                        networkId: e.ext?.networkId || null,
                        networkName: e.ext?.networkName || null,
                        agencyId: e.ext?.agencyId || null,
                        agencyName: e.ext?.agencyName || null,
                        advertiserId: e.ext?.advertiserId || null,
                        advertiserName: e.ext?.advertiserName || null,
                        brandId: e.ext?.brandId || null,
                        brandName: e.ext?.brandName || null,
                        demandSource: e.ext?.demandSource || null,
                        dchain: e.ext?.dchain || null,
                        primaryCatId: e.ext?.primaryCatId || '',
                        secondaryCatIds: e.ext?.secondaryCatIds || [],
                        mediaType: e.ext?.mediaType || null,
                      },
                    };
                    return (
                      t.mediaType === p.G_
                        ? ((t.ttl = 3600), (t.vastXml = e.adm))
                        : t.mediaType === p.s6 && (t.native = { ortb: JSON.parse(e.adm) }),
                      t
                    );
                  });
                return a && !h ? { bids: i, paapi: r.ext?.auctionConfigs || {} } : i;
              },
              getUserSyncs: (e, t, r) => {
                if (h) return (0, i.Wz)(e, t, r, y, v);
                return e.pixelEnabled && void 0 !== (0, c.A)(t, '0.body.cookieSyncUrls')
                  ? t[0].body.cookieSyncUrls.map((e) => ({ type: 'image', url: e }))
                  : [];
              },
              onTimeout: (e) => {},
              onBidWon: (e) => {},
              onSetTargeting: (e) => {},
            };
          function w(e) {
            let t = null;
            if ('function' == typeof e.getFloor) {
              const r = e.getFloor({
                currency: 'USD',
                mediaType: e.mediaTypes && e.mediaTypes.video ? 'video' : 'banner',
                size: e.sizes.map((e) => ({ w: e[0], h: e[1] })),
              });
              (0, m.Qd)(r) && 'USD' === r.currency && !isNaN(parseFloat(r.floor)) && (t = parseFloat(r.floor));
            }
            return null !== t ? t : 0;
          }
          ((0, o.a$)(I), (0, a.E)('sharethroughBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 8498, 4577, 467], () => {
          return ((t = 3240), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4085],
      {
        1492(e, n, r) {
          var t = r(1748),
            o = r(466),
            s = r(8928),
            u = r(1933),
            p = r(8668),
            i = r(1385),
            l = r(8014),
            c = r(1418),
            d = r(736),
            a = r(5291),
            f = r(3202),
            g = r(5808),
            h = r(2201);
          const v = { purpose: {}, feature: {} },
            m = { purpose: !1, feature: 'specialFeatureOptins' },
            y = {
              storage: {
                type: 'purpose',
                default: { purpose: 'storage', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [] },
                id: 1,
              },
              basicAds: {
                type: 'purpose',
                id: 2,
                default: { purpose: 'basicAds', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [], deferS2Sbidders: !1 },
              },
              personalizedAds: {
                type: 'purpose',
                id: 4,
                default: {
                  purpose: 'personalizedAds',
                  enforcePurpose: !0,
                  enforceVendor: !0,
                  vendorExceptions: [],
                  eidsRequireP4Consent: !1,
                },
              },
              measurement: {
                type: 'purpose',
                id: 7,
                default: { purpose: 'measurement', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [] },
              },
              transmitPreciseGeo: {
                type: 'feature',
                id: 1,
                default: { purpose: 'transmitPreciseGeo', enforcePurpose: !0, enforceVendor: !0, vendorExceptions: [] },
              },
            },
            E = new Set(),
            A = new Set(),
            B = new Set(),
            q = new Set(),
            $ = new Set(),
            b = new Set();
          let k = !1,
            C = !1;
          const S = [d.tW, d.fW, d.Tn, d.zu],
            w = 'TCF2',
            D = [],
            P = [2],
            W = [2, 7, 9, 10];
          function x(e, n, r, t) {
            const o = (0, s.A)(e, `vendorData.${n}`);
            return !!o?.consents?.[r] || (t && !!o?.legitimateInterests?.[r]);
          }
          function O(e, n, r, t) {
            let o;
            if (!1 !== m[n]) o = !!(0, s.A)(e, `vendorData.${m[n]}.${r}`);
            else {
              const [n, s] = t === i.B1 ? ['publisher', W] : ['purpose', P];
              o = x(e, n, r, s.includes(r));
            }
            return { purpose: o, vendor: x(e, 'vendor', t, P.includes(r)) };
          }
          function V(e, n, r, t) {
            let o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            const s = y[e.purpose];
            if ((e.vendorExceptions || []).includes(r)) return !0;
            const u = e.enforceVendor && !(t === i.B1 || (e.softVendorExceptions || []).includes(r)),
              p = o.isS2S && 'basicAds' === e.purpose && e.deferS2Sbidders && !t,
              { purpose: l, vendor: c } = O(n, s.type, s.id, t);
            return (!e.enforcePurpose || l) && (!u || p || c);
          }
          function I(e, n) {
            let r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
              t = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : () => null;
            return function (s) {
              const p = i.mW.getConsentData(),
                l = s[a.iK];
              if (
                (function (e, n, r) {
                  return null == e && i.mW.enabled
                    ? ((0, o.logWarn)(
                        `Attempting operation that requires purpose ${n} consent while consent data is not available${r ? ` (module: ${r})` : ''}. Assuming no consent was given.`,
                      ),
                      !0)
                    : e && e.gdprApplies;
                })(p, e, l)
              ) {
                const e = (function (e, n, r) {
                    if (n) {
                      const t = u.$W.getConfig('gvlMapping');
                      if (t && t[n]) return t[n];
                      if (e === d.tp) return i.B1;
                      {
                        let { gvlid: t, modules: s } = i.o2.get(n);
                        if (null == t && Object.keys(s).length > 0)
                          for (const r of S)
                            if (s.hasOwnProperty(r)) {
                              ((t = s[r]),
                                r !== e &&
                                  (0, o.logWarn)(
                                    `Multiple GVL IDs found for module '${n}'; using the ${r} module's ID (${t}) instead of the ${e}'s ID (${s[e]})`,
                                  ));
                              break;
                            }
                        return (null == t && r && (t = r()), t || null);
                      }
                    }
                    return null;
                  })(s[a.Dk], l, t(s)),
                  c = !!n(p, l, e, s);
                if (!c) return (r && r.add(l), { allow: c });
              }
            };
          }
          function M(e) {
            return I(
              e,
              (n, r, t, o) => !!V(v.purpose[e], n, r, t, o),
              arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
              arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : () => null,
            );
          }
          function T(e) {
            return function (n) {
              if (n[a.Dk] !== d.tp) return e(n);
            };
          }
          const j =
            ((F = M(1, E)),
            function (e) {
              if (e[a.Dk] !== d.tp || C) return F(e);
            });
          var F;
          const N = M(1, E),
            z = M(1, E),
            G = T(M(2, A)),
            R = M(7, B, (e) =>
              (function (e, n) {
                const r = p.Ay.getAnalyticsAdapter(e);
                return ((t) => {
                  if ('function' != typeof t) return t;
                  try {
                    return t.call(r.adapter, n);
                  } catch (n) {
                    (0, o.logError)(`Error invoking ${e} adapter.gvlid()`, n);
                  }
                })(r?.adapter?.gvlid);
              })(e[a.iK], e[a.TQ]),
            ),
            K = M(4, q),
            L = T(
              (() => {
                const e = I(
                    '2-10',
                    function (e, n, r) {
                      for (let t = 2; t <= 10; t++) {
                        if (v.purpose[t]?.vendorExceptions?.includes(n)) return !0;
                        const { purpose: o, vendor: s } = O(e, 'purpose', t, r);
                        if (o && (s || v.purpose[t]?.softVendorExceptions?.includes(n))) return !0;
                      }
                      return !1;
                    },
                    $,
                  ),
                  n = M(4, $);
                return function () {
                  const r = v.purpose[4]?.eidsRequireP4Consent ? n : e;
                  for (var t = arguments.length, o = new Array(t), s = 0; s < t; s++) o[s] = arguments[s];
                  return r.apply(this, o);
                };
              })(),
            ),
            U = I('Special Feature 1', (e, n, r) => V(v.feature[1], e, n, r), b);
          function Y(e) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = arguments.length > 2 ? arguments[2] : void 0,
              t = arguments.length > 3 ? arguments[3] : void 0;
            if (!n.withCredentials || (r && t)) return void e(n);
            const s = i.mW.getConsentData(),
              u = v.purpose[1],
              p = y[u.purpose],
              { purpose: l } = O(s, p.type, p.id, null);
            (!l && u.enforcePurpose && ((n.withCredentials = !1), (0, o.logWarn)(`${w} denied ${g.yg}`)), e(n));
          }
          (l.on(c.qY.AUCTION_END, function () {
            const e = function (e) {
                return Array.from(e.keys()).filter((e) => null != e);
              },
              n = {
                storageBlocked: e(E),
                biddersBlocked: e(A),
                analyticsBlocked: e(B),
                ufpdBlocked: e(q),
                eidsBlocked: e($),
                geoBlocked: e(b),
              };
            (l.Ic(c.qY.TCF2_ENFORCEMENT, n), [E, A, B, q, $, b].forEach((e) => e.clear()));
          }),
            u.$W.getConfig('consentManagement', (e) =>
              (function (e) {
                let n = (0, s.A)(e, 'gdpr.rules');
                ((n = Object.fromEntries((n || []).map((e) => [e.purpose, e]))),
                  (C = !!(0, s.A)(e, 'strictStorageEnforcement')),
                  Object.entries(y).forEach((e) => {
                    let [r, t] = e;
                    v[t.type][t.id] = n[r] ?? t.default;
                  }),
                  k ||
                    (null != v.purpose[1] &&
                      ((k = !0),
                      D.push((0, f.qB)(g.Ue, w, j)),
                      D.push((0, f.qB)(g.Ml, w, N)),
                      D.push((0, f.qB)(g.yl, w, z)),
                      h.p3.after(Y)),
                    null != v.purpose[2] && D.push((0, f.qB)(g.uc, w, G)),
                    null != v.purpose[4] && D.push((0, f.qB)(g.DL, w, K), (0, f.qB)(g.qX, w, K)),
                    null != v.purpose[7] && D.push((0, f.qB)(g.mo, w, R)),
                    null != v.feature[1] && D.push((0, f.qB)(g.hE, w, U)),
                    D.push((0, f.qB)(g.hq, w, L))));
              })(e.consentManagement),
            ),
            (0, t.E)('tcfControl'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((n = 1492), e((e.s = n)));
          var n;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8282],
      {
        6497(e, t, r) {
          var n = r(1748),
            i = r(8928),
            o = r(6665),
            s = r(466),
            a = r(9794),
            d = r(3556),
            p = r(1933),
            c = r(1443),
            l = r(5767);
          const u = 'triplelift';
          let m = null,
            f = null;
          const g = (0, c.vM)({ bidderCode: u }),
            b = {
              gvlid: 28,
              code: u,
              supportedMediaTypes: [a.D4, a.G_],
              isBidRequestValid: function (e) {
                return void 0 !== e.params.inventoryCode;
              },
              buildRequests: function (e, t) {
                let r = 'https://tlx.3lift.com/header/auction?';
                const n = (function (e, t) {
                  const r = {},
                    n = e[0]?.ortb2?.source?.ext?.schain,
                    o = (function (e) {
                      const t = {},
                        r = {},
                        n = {},
                        i = e.ortb2 || {},
                        o = (function () {
                          const e = g.getDataFromLocalStorage('opecloud_ctx');
                          if (!e) return null;
                          try {
                            return JSON.parse(e);
                          } catch (e) {
                            return ((0, s.logError)('Triplelift: error parsing JSON: ', e), null);
                          }
                        })(),
                        a = Object.assign({}, i.site),
                        d = Object.assign({}, i.user);
                      if (o) {
                        d.data = d.data || [];
                        try {
                          d.data.push({ name: 'www.1plusx.com', ext: o });
                        } catch (e) {
                          (0, s.logError)('Triplelift: error adding 1plusX segments: ', e);
                        }
                      }
                      (_(r, a), _(n, d), (0, s.isEmpty)(r) || (t.context = r));
                      (0, s.isEmpty)(n) || (t.user = n);
                      return t;
                    })(t);
                  r.imp = e.map(function (e, t) {
                    const r = { id: t, tagid: e.params.inventoryCode, floor: x(e) };
                    return (
                      y(e) &&
                        (r.video = (function (e) {
                          const t = { ...e.params.video, ...e.mediaTypes.video };
                          try {
                            (t.w || (t.w = t.playerSize[0][0]), t.h || (t.h = t.playerSize[0][1]));
                          } catch (e) {
                            (0, s.logWarn)('Video size not defined', e);
                          }
                          t.playbackmethod &&
                            Number.isInteger(t.playbackmethod) &&
                            (t.playbackmethod = Array.from(String(t.playbackmethod), Number));
                          return (delete t.playerSize, t);
                        })(e)),
                      e.mediaTypes.banner && !v(e) && (r.banner = { format: E(e.sizes) }),
                      (0, s.isEmpty)(e.ortb2Imp) ||
                        ((r.fpd = (function (e) {
                          const t = {},
                            r = {};
                          (_(r, e.ext), (0, s.isEmpty)(r) || (t.context = r));
                          return t;
                        })(e.ortb2Imp)),
                        (0, s.isEmpty)(e.ortb2Imp.ext) || (r.ext = { ...e.ortb2Imp.ext })),
                      r
                    );
                  });
                  let a = [];
                  e[0].userIdAsEids && ((a = i.A(e[0], 'userIdAsEids')), (r.user = { ext: { eids: a } }));
                  const d = (function (e, t) {
                    const r = {};
                    (0, s.isEmpty)(e) || (r.schain = { ...e });
                    (0, s.isEmpty)(t) || (r.fpd = { ...t });
                    return r;
                  })(n, o);
                  (0, s.isEmpty)(d) || (r.ext = d);
                  t?.ortb2?.regs?.gpp && (r.regs = Object.assign({}, t.ortb2.regs));
                  t?.ortb2 && (r.ext.ortb2 = Object.assign({}, t.ortb2));
                  return r;
                })(e, t);
                if (((r = (0, l.v)(r, 'lib', 'prebid')), (r = (0, l.v)(r, 'v', '10.29.0')), t && t.refererInfo)) {
                  const e = t.refererInfo.page;
                  r = (0, l.v)(r, 'referrer', e);
                }
                return (
                  t && t.timeout && (r = (0, l.v)(r, 'tmax', t.timeout)),
                  t &&
                    t.gdprConsent &&
                    ((m = void 0 === t.gdprConsent.gdprApplies || t.gdprConsent.gdprApplies),
                    (r = (0, l.v)(r, 'gdpr', m.toString())),
                    void 0 !== t.gdprConsent.consentString && ((f = t.gdprConsent.consentString), (r = (0, l.v)(r, 'cmp_cs', f)))),
                  t && t.uspConsent && (r = (0, l.v)(r, 'us_privacy', t.uspConsent)),
                  t?.paapi?.enabled && (r = (0, l.v)(r, 'fledge', t.paapi.enabled)),
                  !0 === p.$W.getConfig('coppa') && (r = (0, l.v)(r, 'coppa', !0)),
                  r.lastIndexOf('&') === r.length - 1 && (r = r.substring(0, r.length - 1)),
                  (0, s.logMessage)('tlCall request built: ' + r),
                  { method: 'POST', url: r, data: n, bidderRequest: t }
                );
              },
              interpretResponse: function (e, t) {
                let { bidderRequest: r } = t,
                  n = e.body.bids || [];
                const i = e.body.paapi || [];
                if (
                  ((n = n.map((e) =>
                    (function (e, t) {
                      let r = {};
                      const n = t.width || 1,
                        i = t.height || 1,
                        o = t.deal_id || '',
                        s = t.crid || '',
                        a = e.bids[t.imp_id];
                      0 !== t.cpm &&
                        t.ad &&
                        ((r = {
                          requestId: a.bidId,
                          cpm: t.cpm,
                          width: n,
                          height: i,
                          netRevenue: !0,
                          ad: t.ad,
                          creativeId: s,
                          dealId: o,
                          currency: 'USD',
                          ttl: 300,
                          tl_source: t.tl_source,
                          meta: {},
                        }),
                        y(a) && 'video' === t.media_type && ((r.vastXml = t.ad), (r.mediaType = 'video'), (r.ttl = 3600)),
                        t.advertiser_name && (r.meta.advertiserName = t.advertiser_name),
                        t.adomain && t.adomain.length && (r.meta.advertiserDomains = t.adomain),
                        t.tl_source &&
                          'hdx' === t.tl_source &&
                          (y(a) && 'video' === t.media_type ? (r.meta.mediaType = 'video') : (r.meta.mediaType = 'banner')),
                        t.tl_source && 'tlx' === t.tl_source && (r.meta.mediaType = 'native'),
                        s && (r.meta.networkId = s.slice(0, s.indexOf('_'))));
                      return r;
                    })(r, e),
                  )),
                  i.length > 0)
                ) {
                  const e = i.map((e) => ({ bidId: r.bids[e.imp_id].bidId, config: e.auctionConfig }));
                  return ((0, s.logMessage)('Response with FLEDGE:', { bids: n, fledgeAuctionConfigs: e }), { bids: n, paapi: e });
                }
                return n;
              },
              getUserSyncs: function (e, t, r, n, i) {
                const o = (function (e) {
                  if (!e) return;
                  if (e.iframeEnabled) return 'iframe';
                  if (e.pixelEnabled) return 'image';
                })(e);
                if (!o) return;
                let s = 'https://eb2.3lift.com/sync?';
                return (
                  'image' === o && ((s = (0, l.v)(s, 'px', 1)), (s = (0, l.v)(s, 'src', 'prebid'))),
                  (null !== f || m) && ((s = (0, l.v)(s, 'gdpr', m)), (s = (0, l.v)(s, 'cmp_cs', f))),
                  n && (s = (0, l.v)(s, 'us_privacy', n)),
                  i &&
                    (i.gppString && (s = (0, l.v)(s, 'gpp', i.gppString)),
                    i.applicableSections &&
                      0 !== i.applicableSections.length &&
                      (s = (0, l.v)(s, 'gpp_sid', i.applicableSections.filter((e) => Number.isInteger(e)).join(',')))),
                  [{ type: o, url: s }]
                );
              },
            };
          function y(e) {
            return (
              h(e) &&
              (v(e) ||
                (function (e) {
                  return h(e) && 'outstream' === e.mediaTypes.video.context.toLowerCase();
                })(e))
            );
          }
          function v(e) {
            return h(e) && 'instream' === e.mediaTypes.video.context.toLowerCase();
          }
          function h(e) {
            return e.mediaTypes.video && e.mediaTypes.video.context;
          }
          function x(e) {
            let t = null;
            if ('function' == typeof e.getFloor)
              try {
                const r = e.getFloor({ currency: 'USD', mediaType: y(e) ? 'video' : 'banner', size: '*' });
                o.Qd(r) && 'USD' === r.currency && !isNaN(parseFloat(r.floor)) && (t = parseFloat(r.floor));
              } catch (e) {
                (0, s.logError)('Triplelift: getFloor threw an error: ', e);
              }
            return null !== t ? t : e.params.floor;
          }
          function _(e, t) {
            (0, s.isEmpty)(t) ||
              Object.keys(t).forEach((r) => {
                null != t[r] && (e[r] = t[r]);
              });
          }
          function E(e) {
            return e.filter(S).map(function (e) {
              return { w: e[0], h: e[1] };
            });
          }
          function S(e) {
            return 2 === e.length && 'number' == typeof e[0] && 'number' == typeof e[1];
          }
          ((0, d.a$)(b), (0, n.E)('tripleliftBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 4577], () => {
          return ((t = 6497), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [4183],
      {
        9942(e, r, t) {
          var a = t(1748),
            i = t(466),
            s = t(8928),
            n = t(3435),
            o = t(6665),
            p = t(1933),
            d = t(3556),
            u = t(9794),
            m = t(3367),
            c = t(8258);
          const l = 'ttd',
            b = 1,
            g = 2;
          function f(e) {
            return {
              ttdprebid: {
                ver: 'TTD-PREBID-2025.07.15',
                pbjs: '10.29.0',
                keywords: e.site?.keywords ? e.site.keywords.split(',').map((e) => e.trim()) : [],
              },
            };
          }
          function h(e) {
            const r = {};
            return (
              e.gdprConsent && 'boolean' == typeof e.gdprConsent.gdprApplies && n.J(r, 'ext.gdpr', e.gdprConsent.gdprApplies ? 1 : 0),
              e.uspConsent && n.J(r, 'ext.us_privacy', e.uspConsent),
              !0 === p.$W.getConfig('coppa') && (r.coppa = 1),
              e.ortb2?.regs && i.mergeDeep(r, e.ortb2.regs),
              r
            );
          }
          function v(e, r) {
            const t = { tid: r?.ortb2?.source?.tid },
              a = e[0]?.ortb2?.source?.ext?.schain;
            return (a && n.J(t, 'ext.schain', a), t);
          }
          function y(e) {
            const r = navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage,
              t = { ua: navigator.userAgent, dnt: (0, m.l)() ? 1 : 0, language: r, connectiontype: (0, c.Z)() };
            return (i.mergeDeep(t, e.device), t);
          }
          function I(e, r) {
            const t = {};
            e.gdprConsent && n.J(t, 'ext.consent', e.gdprConsent.consentString);
            var a = s.A(e, 'bids.0.userIdAsEids');
            return (a && a.length && n.J(t, 'ext.eids', a), i.mergeDeep(t, r.user), t);
          }
          function A(e, r) {
            var t = i.mergeDeep(
                {
                  page: s.A(e, 'refererInfo.page'),
                  ref: s.A(e, 'refererInfo.ref'),
                  publisher: { id: s.A(e, 'bids.0.params.publisherId') },
                },
                r.site,
              ),
              a = e.refererInfo.domain;
            return (a && n.J(t, 'publisher.domain', a), t);
          }
          function x(e) {
            const r = { id: e.bidId },
              t = s.A(e, 'ortb2Imp.ext.gpid');
            r.exp = 360;
            const a = t || e.params.placementId;
            a && (r.tagid = a);
            const n = s.A(e, 'mediaTypes.video'),
              p = {};
            (s.A(e, 'mediaTypes.banner') &&
              (p[u.D4] = (function (e) {
                const r = (function (e) {
                    const r = i
                      .parseSizesInput(e)
                      .filter((e) => e)
                      .map((e) => e.split('x'))
                      .map((e) => ({ width: parseInt(e[0]), height: parseInt(e[1]) }));
                    return r;
                  })(e.mediaTypes.banner.sizes).map((e) => ({ w: e.width, h: e.height })),
                  t = parseInt(s.A(e, 'mediaTypes.banner.pos')),
                  a = s.A(e, 'params.banner.expdir'),
                  n = {};
                t && (n.pos = t);
                a && Array.isArray(a) && (n.expdir = a);
                const o = Object.assign({ w: r[0].w, h: r[0].h, format: r }, n),
                  p = s.A(e, 'ortb2Imp.banner.battr');
                p && (o.battr = p);
                return o;
              })(e)),
              n &&
                (p[u.G_] = (function (e) {
                  {
                    const r = e?.mediaTypes?.video;
                    if (!r) return;
                    const {
                        minduration: t = 0,
                        maxduration: a,
                        playerSize: i,
                        api: s,
                        mimes: n,
                        placement: o,
                        plcmt: p,
                        protocols: d,
                        playbackmethod: u,
                        pos: m,
                        startdelay: c,
                        skip: l,
                        skipmin: b,
                        skipafter: g,
                        minbitrate: f,
                        maxbitrate: h,
                      } = r,
                      v = {
                        minduration: t,
                        ...(void 0 !== a && { maxduration: a }),
                        ...(s && { api: s }),
                        ...(n && { mimes: n }),
                        ...(void 0 !== o && { placement: o }),
                        ...(void 0 !== p && { plcmt: p }),
                        ...(d && { protocols: d }),
                        ...(void 0 !== u && { playbackmethod: u }),
                        ...(void 0 !== m && { pos: m }),
                        ...(void 0 !== c && { startdelay: c }),
                        ...(void 0 !== l && { skip: l }),
                        ...(void 0 !== b && { skipmin: b }),
                        ...(void 0 !== g && { skipafter: g }),
                        ...(void 0 !== f && { minbitrate: f }),
                        ...(void 0 !== h && { maxbitrate: h }),
                      };
                    if (i) {
                      const [e, r] = Array.isArray(i[0]) ? i[0] : i;
                      ((v.w = Number(e)), (v.h = Number(r)));
                    }
                    const y = e?.ortb2Imp?.video?.battr;
                    return (y && (v.battr = y), v);
                  }
                })(e)),
              Object.assign(r, p));
            const d = (function (e) {
              if (e.params.bidfloor) return e.params.bidfloor;
              if (!o.fp(e.getFloor)) return null;
              const r = e.getFloor({ currency: 'USD', mediaType: '*', size: '*' });
              return o.Qd(r) && !isNaN(r.floor) && 'USD' === r.currency ? r.floor : null;
            })(e);
            d && ((r.bidfloor = parseFloat(d)), (r.bidfloorcur = 'USD'));
            const m = s.A(e, 'ortb2Imp.secure');
            r.secure = (0, o.Et)(m) ? m : 1;
            const { video: c, ...l } = e.ortb2Imp;
            return (i.mergeDeep(r, l), r);
          }
          const T = {
            code: l,
            gvlid: 21,
            aliases: ['thetradedesk'],
            supportedMediaTypes: [u.D4, u.G_],
            isBidRequestValid: function (e) {
              if (!e || !e.params) return (i.logWarn(l + ': Missing bid parameters'), !1);
              if (!e.params.supplySourceId) return (i.logWarn(l + ': Missing required parameter params.supplySourceId'), !1);
              if (!/^[\w+]+$/.test(e.params.supplySourceId))
                return (i.logWarn(l + ': supplySourceId must only contain alphabetic characters'), !1);
              if (!e.params.publisherId) return (i.logWarn(l + ': Missing required parameter params.publisherId'), !1);
              if (e.params.publisherId.length > 64) return (i.logWarn(l + ': params.publisherId must be 64 characters or less'), !1);
              if (e.params.bidfloor && isNaN(parseFloat(e.params.bidfloor))) return !1;
              const r = s.A(e, 'ortb2Imp.ext.gpid');
              if (!e.params.placementId && !r)
                return (
                  i.logWarn(
                    l +
                      ': one of params.placementId or gpid (via the GPT module https://docs.prebid.org/dev-docs/modules/gpt-pre-auction.html) must be passed',
                  ),
                  !1
                );
              if (
                e.params.customBidderEndpoint &&
                (!e.params.customBidderEndpoint.startsWith('https://') || !e.params.customBidderEndpoint.endsWith('/bid/bidder/'))
              )
                return (
                  i.logWarn(l + ': if params.customBidderEndpoint is provided, it must start with https:// and end with /bid/bidder/'),
                  !1
                );
              const t = s.A(e, 'mediaTypes.banner'),
                a = s.A(e, 'mediaTypes.video');
              if (!t && !a) return (i.logWarn(l + ': one of mediaTypes.banner or mediaTypes.video must be passed'), !1);
              if (a) {
                if (!a.maxduration || !o.Fq(a.maxduration))
                  return (i.logWarn(l + ': mediaTypes.video.maxduration must be set to the maximum video ad duration in seconds'), !1);
                if (!a.api || 0 === a.api.length)
                  return (
                    i.logWarn(
                      l +
                        ': mediaTypes.video.api should be an array of supported api frameworks. See the Open RTB v2.5 spec for valid values',
                    ),
                    !1
                  );
                if (!a.mimes || 0 === a.mimes.length)
                  return (i.logWarn(l + ': mediaTypes.video.mimes should be an array of supported mime types'), !1);
                if (!a.protocols)
                  return (
                    i.logWarn(
                      l +
                        ': mediaTypes.video.protocols should be an array of supported protocols. See the Open RTB v2.5 spec for valid values',
                    ),
                    !1
                  );
              }
              return !0;
            },
            buildRequests: function (e, r) {
              const t = r.ortb2 || {},
                a = r.ortb2Imp || {},
                s = {
                  id: r.bidderRequestId,
                  imp: e.map((e) => x(e)),
                  site: A(r, t),
                  device: y(t),
                  user: I(r, t),
                  at: 1,
                  tmax: Math.max(r.timeout || 400, 400),
                  cur: ['USD'],
                  regs: h(r),
                  source: v(e, r),
                  ext: f(t),
                };
              (t && t.bcat && (s.bcat = t.bcat),
                t && t.badv && (s.badv = t.badv),
                t && t.app && (s.app = t.app),
                ((t && t.pmp) || (a && a.pmp)) &&
                  s.imp.forEach((e) => {
                    e.pmp = i.mergeDeep({}, e.pmp || {}, t?.pmp || {}, a?.pmp || {});
                  }));
              var n;
              return {
                method: 'POST',
                url:
                  ((n = r.bids[0].params).customBidderEndpoint
                    ? n.customBidderEndpoint
                    : n.useHttp2
                      ? 'https://d2.adsrvr.org/bid/bidder/'
                      : 'https://direct.adsrvr.org/bid/bidder/') + r.bids[0].params.supplySourceId,
                data: s,
                options: { withCredentials: !0 },
              };
            },
            interpretResponse: function (e, r) {
              const t = s.A(e, 'body.seatbid'),
                a = s.A(e, 'body.cur');
              if (!t || 0 === t.length) return [];
              const n = [],
                o = s.A(r, 'data.imp');
              return (
                t.forEach((e) => {
                  e.bid.forEach((e) => {
                    const r = o.find((r) => r.id === e.impid),
                      t = e.price || 0,
                      s = {
                        requestId: e.impid,
                        cpm: t,
                        creativeId: e.crid,
                        dealId: e.dealid || null,
                        currency: a || 'USD',
                        netRevenue: !0,
                        ttl: e.ttl || 360,
                        meta: {},
                      };
                    (e.adomain && e.adomain.length > 0 && (s.meta.advertiserDomains = e.adomain),
                      e.ext.mediatype === b
                        ? Object.assign(s, { width: e.w, height: e.h, ad: i.replaceAuctionPrice(e.adm, t), mediaType: u.D4 })
                        : e.ext.mediatype === g &&
                          (Object.assign(s, { width: r.video.w, height: r.video.h, mediaType: u.G_ }),
                          e.nurl ? (s.vastUrl = i.replaceAuctionPrice(e.nurl, t)) : (s.vastXml = i.replaceAuctionPrice(e.adm, t))),
                      n.push(s));
                  });
                }),
                n
              );
            },
            getUserSyncs: function (e, r) {
              let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : '';
              const i = [],
                s = `&gdpr=${t.gdprApplies ? 1 : 0}&gdpr_consent=${encodeURIComponent(t.consentString)}`,
                n = `https://match.adsrvr.org/track/usersync?us_privacy=${encodeURIComponent(a)}${s}`;
              return (
                e.pixelEnabled
                  ? i.push({ type: 'image', url: n + '&ust=image' })
                  : e.iframeEnabled && i.push({ type: 'iframe', url: n + '&ust=iframe' }),
                i
              );
            },
          };
          ((0, d.a$)(T), (0, a.E)('ttdBidAdapter'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 259], () => {
          return ((r = 9942), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [8907],
      {
        9226(e, r, t) {
          var n = t(1748),
            o = t(466),
            i = t(2592),
            a = t(1443),
            s = t(736),
            u = t(770),
            d = t(5273);
          const p = 'uid2',
            l = `PrebidJS-10.29.0-UID2Module-${u.kz}`,
            c = 'UID2: ';
          function f(e, r) {
            return function () {
              for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++) n[o] = arguments[o];
              e(r + ' ', ...n);
            };
          }
          const m = f(o.logInfo, c),
            k = f(o.logWarn, c),
            g = (0, a.vM)({ moduleType: s.fW, moduleName: p }),
            I = {
              name: p,
              decode(e) {
                const r = (function (e) {
                  if ('string' == typeof e) {
                    m('Found server-only token. Refresh is unavailable for this token.');
                    return { uid2: { id: e } };
                  }
                  if ('optout' === e.latestToken)
                    return (m('Found optout token.  Refresh is unavailable for this token.'), { uid2: { optout: !0 } });
                  if (Date.now() < e.latestToken.identity_expires) return { uid2: { id: e.latestToken.advertising_token } };
                  return null;
                })(e);
                return (m('UID2 decode returned', r), r);
              },
              getId(e, r) {
                if (!0 === r?.gdpr?.gdprApplies)
                  return void k('UID2 is not intended for use where GDPR applies. The UID2 module will not run.');
                const t = {
                  apiBaseUrl: e?.params?.uid2ApiBase ?? 'https://prod.uidapi.com',
                  paramToken: e?.params?.uid2Token,
                  serverCookieName: e?.params?.uid2Cookie ?? e?.params?.uid2ServerCookie,
                  storage: e?.params?.storage ?? 'localStorage',
                  clientId: l,
                  internalStorage: '__uid2_advertising_token',
                };
                ((t.cstg = {
                  serverPublicKey: e?.params?.serverPublicKey,
                  subscriptionId: e?.params?.subscriptionId,
                  ...(0, u.E0)(e?.params ?? {}),
                }),
                  m('UID2 configuration loaded and mapped.', t));
                const n = (0, u.wq)(t, g, m, k);
                return (m('UID2 getId returned', n), n);
              },
              eids: d.x,
            };
          ((0, i.bz)('userId', I), (0, n.E)('uid2IdSystem'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085, 1912, 4950], () => {
          return ((r = 9226), e((e.s = r)));
          var r;
        });
        e.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [891],
      {
        8202(r, e, t) {
          var d = t(1748),
            s = t(466),
            o = t(2201),
            i = t(2592),
            n = t(4967);
          const a = 'unifiedId',
            u = {
              name: a,
              gvlid: 21,
              decode: (r) => (r && 'string' == typeof r.TDID ? { tdid: r.TDID } : void 0),
              getId(r) {
                const e = (r && r.params) || {};
                if (!e || ('string' != typeof e.partner && 'string' != typeof e.url))
                  return void (0, s.logError)('User ID - unifiedId submodule requires either partner or url to be defined');
                const t = e.url || `https://match.adsrvr.org/track/rid?ttd_pid=${e.partner}&fmt=json`;
                return {
                  callback: function (r) {
                    const e = {
                      success: (e) => {
                        let t;
                        if (e)
                          try {
                            t = JSON.parse(e);
                          } catch (r) {
                            (0, s.logError)(r);
                          }
                        r(t);
                      },
                      error: (e) => {
                        ((0, s.logError)(`${a}: ID fetch encountered an error`, e), r());
                      },
                    };
                    (0, o.RD)(t, e, void 0, { method: 'GET', withCredentials: !0 });
                  },
                };
              },
              eids: { tdid: { ...n.M.tdid, mm: 4, inserter: 'adserver.org', matcher: 'adserver.org' } },
            };
          ((0, i.bz)('userId', u), (0, d.E)('unifiedIdSystem'));
        },
      },
      (r) => {
        r.O(0, [802, 7769, 315, 1085, 7045], () => {
          return ((e = 8202), r((r.s = e)));
          var e;
        });
        r.O();
      },
    ]);
    (self.pbjsChunk = self.pbjsChunk || []).push([
      [3469],
      {
        7355(e, t, n) {
          var o = n(1748),
            r = n(1933),
            s = n(8014),
            i = n(4367),
            a = n(8668),
            c = n(1418),
            u = n(2592),
            l = n(6665),
            d = n(466);
          const f = new Map();
          function g(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : f;
            const n = {};
            function o(e) {
              const t = JSON.stringify([
                e.source?.toLowerCase(),
                ...Object.keys(e)
                  .filter((e) => !['uids', 'source'].includes(e))
                  .sort()
                  .map((t) => e[t]),
              ]);
              n.hasOwnProperty(t) ? n[t].uids.push(...e.uids) : (n[t] = e);
            }
            return (
              Object.entries(e).forEach((e) => {
                let [n, r] = e;
                r = Array.isArray(r) ? r : [r];
                const s = t.get(n);
                let i;
                if ('pubProvidedId' === n) i = (0, l.Go)(r);
                else if ('function' == typeof s)
                  try {
                    ((i = (0, l.Go)(s(r))),
                      Array.isArray(i) || (i = [i]),
                      i.forEach((e) => {
                        e.uids = e.uids.filter((e) => {
                          let { id: t } = e;
                          return (0, l.O8)(t);
                        });
                      }),
                      (i = i.filter((e) => {
                        let { uids: t } = e;
                        return t?.length > 0;
                      })));
                  } catch (e) {
                    (0, d.logError)(`Could not generate EID for "${n}"`, e);
                  }
                else
                  i = r.map((e) =>
                    (function (e, t, n) {
                      if (n && e) {
                        const t = {};
                        t.source = (0, l.fp)(n.getSource) ? n.getSource(e) : n.source;
                        const o = (0, l.fp)(n.getValue) ? n.getValue(e) : e;
                        if ((0, l.O8)(o)) {
                          const r = { id: o, atype: n.atype };
                          if ((0, l.fp)(n.getUidExt)) {
                            const t = n.getUidExt(e);
                            t && (r.ext = t);
                          }
                          if (((t.uids = [r]), n.inserter || (0, l.fp)(n.getInserter))) {
                            const o = (0, l.fp)(n.getInserter) ? n.getInserter(e) : n.inserter;
                            null != o && (t.inserter = o);
                          }
                          if (n.matcher || (0, l.fp)(n.getMatcher)) {
                            const o = (0, l.fp)(n.getMatcher) ? n.getMatcher(e) : n.matcher;
                            null != o && (t.matcher = o);
                          }
                          if ((null != n.mm && (t.mm = n.mm), (0, l.fp)(n.getEidExt))) {
                            const o = n.getEidExt(e);
                            o && (t.ext = o);
                          }
                          return t;
                        }
                      }
                      return null;
                    })(e, 0, s),
                  );
                Array.isArray(i) && i.filter((e) => null != e).forEach(o);
              }),
              Object.values(n)
            );
          }
          function m(e) {
            const t = new Map(),
              n = {};
            return (
              Object.entries(e).forEach((e) => {
                let [o, r] = e;
                const s = r();
                if (s) {
                  n[o] = s.idObj[o];
                  let e = s.submodule.eids?.[o];
                  ('function' == typeof e &&
                    ((i = e),
                    (e = function () {
                      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                      return i(...t, s.config);
                    })),
                    t.set(o, e));
                }
                var i;
              }),
              g(n, t)
            );
          }
          var b = n(1443),
            h = n(3435),
            p = n(3129),
            y = n(3064),
            I = n(7841),
            w = n(1780),
            E = n(1385),
            v = n(736),
            D = n(3202),
            S = n(5808),
            O = n(7610),
            k = n(3391),
            $ = n(5291),
            j = n(1186);
          const x = 'User ID',
            A = b.X0,
            C = b.qk,
            T = '_pbjs_id_optout',
            U = (0, b.CK)('userId'),
            N = { isAllowed: D.io };
          let P,
            L,
            _,
            W,
            q,
            M = [],
            R = [],
            F = {},
            G = [];
          const J = (() => {
            let e;
            return () => (null == e && (e = (0, I.K7)()), e);
          })();
          function B(e) {
            return J()
              .fork()
              .renameWith((t) => [`userId.mod.${t}`, `userId.mods.${e}.${t}`]);
          }
          function K(e, t) {
            t = t || e.storageMgr;
            const n = 'function' == typeof e.submodule.domainOverride ? e.submodule.domainOverride() : null,
              o = e.config.storage.name;
            return function (e, r, s) {
              t.setCookie(o + (e || ''), r, s, 'Lax', n);
            };
          }
          function Q(e, t) {
            const n = e.config.storage;
            try {
              const o = new Date(Date.now() + 864e5 * n.expires).toUTCString(),
                r = (0, l.Qd)(t) ? JSON.stringify(t) : t;
              e.enabledStorageTypes.forEach((t) => {
                switch (t) {
                  case A:
                    !(function (e, t, n) {
                      const o = e.config.storage,
                        r = K(e);
                      (r(null, t, n), r('_cst', pe(), n), 'number' == typeof o.refreshInSeconds && r('_last', new Date().toUTCString(), n));
                    })(e, r, o);
                    break;
                  case C:
                    !(function (e, t, n) {
                      const o = e.config.storage,
                        r = e.storageMgr;
                      (r.setDataInLocalStorage(`${o.name}_exp`, n),
                        r.setDataInLocalStorage(`${o.name}_cst`, pe()),
                        r.setDataInLocalStorage(o.name, encodeURIComponent(t)),
                        'number' == typeof o.refreshInSeconds && r.setDataInLocalStorage(`${o.name}_last`, new Date().toUTCString()));
                    })(e, r, o);
                }
              });
            } catch (e) {
              (0, d.logError)(e);
            }
          }
          const H = ['', '_last', '_cst'];
          const V = ['', '_last', '_exp', '_cst'];
          function Y(e) {
            (Oe(e),
              e.enabledStorageTypes.forEach((t) => {
                switch (t) {
                  case A:
                    !(function (e) {
                      const t = K(e, U),
                        n = new Date(Date.now() - 864e5).toUTCString();
                      H.forEach((e) => {
                        try {
                          t(e, '', n);
                        } catch (e) {
                          (0, d.logError)(e);
                        }
                      });
                    })(e);
                    break;
                  case C:
                    !(function (e) {
                      V.forEach((t) => {
                        try {
                          U.removeDataFromLocalStorage(e.config.storage.name + t);
                        } catch (e) {
                          (0, d.logError)(e);
                        }
                      });
                    })(e);
                }
              }));
          }
          function Z(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
            const n = e.config.storage,
              o = t ? `${n.name}_${t}` : n.name;
            let r;
            try {
              (e.enabledStorageTypes.find((t) => {
                switch (t) {
                  case A:
                    r = (function (e, t) {
                      return e.storageMgr.getCookie(t);
                    })(e, o);
                    break;
                  case C:
                    r = (function (e, t) {
                      const n = e.storageMgr,
                        o = e.config.storage,
                        r = n.getDataFromLocalStorage(`${o.name}_exp`);
                      return '' === r
                        ? n.getDataFromLocalStorage(t)
                        : r && new Date(r).getTime() - Date.now() > 0
                          ? decodeURIComponent(n.getDataFromLocalStorage(t))
                          : void 0;
                    })(e, o);
                }
                return !!r;
              }),
                'string' == typeof r && '{' === r.trim().charAt(0) && (r = JSON.parse(r)));
            } catch (e) {
              (0, d.logError)(e);
            }
            return r;
          }
          function z(e, t, n) {
            t = J().fork().startTiming('userId.callbacks.total').stopBefore(t);
            const o = (0, d.delayExecution)(() => {
              (clearTimeout(void 0), t());
            }, e.length);
            e.forEach(function (e) {
              const t = B(e.submodule.name).startTiming('callback').stopBefore(o);
              try {
                e.callback(
                  function (o) {
                    (o
                      ? (e.config.storage && Q(e, o), (e.idObj = e.submodule.decode(o, e.config)), n.refresh(), Ie(n))
                      : (0, d.logInfo)(`${x}: ${e.submodule.name} - request id responded with an empty value`),
                      t());
                  },
                  Z.bind(null, e),
                );
              } catch (n) {
                ((0, d.logError)(`Error in userID module '${e.submodule.name}':`, n), t());
              }
              e.callback = void 0;
            });
          }
          function X(e, t, n) {
            const o = {};
            return (
              e.forEach((e) => {
                const r = n(e),
                  s = (function (e) {
                    if (e.primaryIds) return e.primaryIds;
                    const t = Object.keys(e.eids ?? {});
                    if (t.length > 1) throw new Error(`ID submodule ${e.name} can provide multiple IDs, but does not specify 'primaryIds'`);
                    return t;
                  })(r);
                t(e).forEach((t) => {
                  const n = (o[t] = o[t] ?? []),
                    i = F[t]?.indexOf(r.name) ?? (s.includes(t) ? 0 : -1),
                    a = n.findIndex((e) => {
                      let [t] = e;
                      return t < i;
                    });
                  n.splice(-1 === a ? n.length : a, 0, [i, e]);
                });
              }),
              Object.fromEntries(
                Object.entries(o).map((e) => {
                  let [t, n] = e;
                  return [
                    t,
                    n.map((e) => {
                      let [t, n] = e;
                      return n;
                    }),
                  ];
                }),
              )
            );
          }
          function ee() {
            const e = {
              submodules: [],
              global: {},
              bidder: {},
              combined: {},
              refresh() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                const n = new Set(t.map((e) => e.submodule));
                ((e.submodules = e.submodules.filter((e) => !n.has(e.submodule)).concat(t)),
                  (function () {
                    const t = X(
                        e.submodules,
                        (e) => Object.keys(e.idObj ?? {}),
                        (e) => e.submodule,
                      ),
                      n = {},
                      o = {};
                    function r(e, t, n) {
                      return function () {
                        for (const { allowed: o, bidders: r, module: s } of n) {
                          if (!N.isAllowed(S.yl, (0, O.s)(v.fW, s?.config?.name, { init: !1 }))) continue;
                          const i = s.idObj?.[e];
                          if (null != i) {
                            if (o) return s;
                            if (t) {
                              const t = (e) => e.map((e) => e.module.submodule.name).join(', ');
                              return (
                                (0, d.logWarn)(
                                  `userID modules ${t(n)} provide the same ID ('${e}'); ${s.submodule.name} is the preferred source, but it's configured only for some bidders, unlike ${t(n.filter((e) => null == e.bidders))}. Other bidders will not see the "${e}" ID.`,
                                ),
                                null
                              );
                            }
                            if (null == r) return null;
                          }
                        }
                        return null;
                      };
                    }
                    Object.entries(t).forEach((e) => {
                      let [t, s] = e,
                        i = !0;
                      const a = new Set();
                      ((s = s.map((e) => {
                        let t = null;
                        return (
                          Array.isArray(e.config.bidders) && e.config.bidders.length > 0
                            ? ((t = e.config.bidders), t.forEach((e) => a.add(e)))
                            : (i = !1),
                          { module: e, bidders: t }
                        );
                      })),
                        i ||
                          (n[t] = r(
                            t,
                            !0,
                            s.map((e) => {
                              let { bidders: t, module: n } = e;
                              return { allowed: null == t, bidders: t, module: n };
                            }),
                          )),
                        a.forEach((e) => {
                          ((o[e] = o[e] ?? {}),
                            (o[e][t] = r(
                              t,
                              !1,
                              s.map((t) => {
                                let { bidders: n, module: o } = t;
                                return { allowed: n?.includes(e), bidders: n, module: o };
                              }),
                            )));
                        }));
                    });
                    const s = Object.values(o)
                      .concat([n])
                      .reduce((e, t) => Object.assign(e, t), {});
                    Object.assign(e, { global: n, bidder: o, combined: s });
                  })());
              },
            };
            return e;
          }
          function te(e) {
            let { ortb2Fragments: t } = e;
            ((t = t ?? { global: {}, bidder: {} }),
              (function (e) {
                const { global: t, bidder: n } = e,
                  { global: o, bidder: r } = P,
                  s = m(o);
                (s.length > 0 && (0, h.J)(t, 'user.ext.eids', (t.user?.ext?.eids ?? []).concat(s)),
                  Object.entries(r).forEach((e) => {
                    let [t, o] = e;
                    const r = m(o);
                    r.length > 0 && (0, h.J)(n, `${t}.user.ext.eids`, (n[t]?.user?.ext?.eids ?? []).concat(r));
                  }));
              })(t));
          }
          const ne = {};
          let oe;
          function re() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ue() || [];
            const t = W && e.find((e) => e.source === W);
            if (t && 'string' == typeof t?.uids?.[0]?.id) {
              const e = t.uids[0].id.replace(/[\W_]/g, '');
              if (e.length >= 32 && e.length <= 150) return e;
              (0, d.logWarn)(`User ID - Googletag Publisher Provided ID for ${W} is not between 32 and 150 characters - ${e}`);
            }
          }
          const se = (0, I.Ak)('userId', function (e, t) {
            let { mkDelay: n = y.cb, getIds: o = he } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            y.U9.race([o().catch(() => null), n(_)]).then(() => {
              (te(t), J().join((0, I.BO)(t.metrics), { propagate: !1, includeGroups: !0 }), e.call(this, t));
            });
          });
          function ie(e, t) {
            (t.forEach((e) => {
              e.bids.forEach((t) =>
                Object.defineProperty(t, 'userIdAsEids', { configurable: !0, get: () => e.ortb2.user?.ext?.eids ?? [] }),
              );
            }),
              e(t));
          }
          function ae(e, t) {
            const n = {},
              o = t.getFPD()?.global?.user?.ext?.eids ?? [];
            (t
              .getAdUnits()
              .flatMap((e) => e.bids)
              .forEach((e) => {
                const r =
                  null == (s = e.bidder)
                    ? o
                    : (n.hasOwnProperty(s) ||
                        (n[s] = (0, d.mergeDeep)({ eids: [] }, { eids: o }, { eids: t.getFPD()?.bidder?.[s]?.user?.ext?.eids ?? [] }).eids),
                      n[s]);
                var s;
                r.length > 0 && (e.userIdAsEids = r);
              }),
              e(t));
          }
          function ce() {
            return (
              (e = P.combined),
              Object.fromEntries(
                Object.entries(e)
                  .map((e) => {
                    let [t, n] = e;
                    return [t, n()?.idObj?.[t]];
                  })
                  .filter((e) => {
                    let [t, n] = e;
                    return null != n;
                  }),
              )
            );
            var e;
          }
          function ue() {
            return m(P.combined);
          }
          function le(e) {
            return ue().filter((t) => t.source === e)[0];
          }
          function de(e, t, n) {
            return me().then(() => {
              const o = {};
              if ((0, l.fp)(n)) {
                (0, d.logInfo)(`${x} - Getting encrypted signal from custom function : ${n.name} & source : ${e} `);
                const t = n(e);
                o[e] = t ? fe(t) : null;
              } else {
                const n = le(e);
                ((0, d.logInfo)(`${x} - Getting encrypted signal for eids :${JSON.stringify(n)}`),
                  (0, d.isEmpty)(n) || (o[n.source] = !0 === t ? fe(n) : n.uids[0].id));
              }
              return ((0, d.logInfo)(`${x} - Fetching encrypted eids: ${o[e]}`), o[e]);
            });
          }
          function fe(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
              n = '';
            if (1 === t) n = 'object' == typeof e ? window.btoa(JSON.stringify(e)) : window.btoa(e);
            return `${t}||${n}`;
          }
          function ge() {
            if (!(0, d.isGptPubadsDefined)()) return;
            const e = r.$W.getConfig('userSync.encryptedSignalSources');
            if (e) {
              const t = e.registerDelay || 0;
              setTimeout(() => {
                e.sources &&
                  e.sources.forEach((e) => {
                    let { source: t, encrypt: n, customFunc: o } = e;
                    t.forEach((e) => {
                      window.googletag.secureSignalProviders.push({ id: e, collectorFunction: () => de(e, n, o) });
                    });
                  });
              }, t);
            } else (0, d.logWarn)(`${x} - ESP : encryptedSignalSources config not defined under userSync Object`);
          }
          function me(e) {
            return oe(e).then(
              () => ce(),
              (e) => (e === ne ? Promise.resolve().then(he) : ((0, d.logError)('Error initializing userId', e), y.U9.reject(e))),
            );
          }
          function be() {
            let { submoduleNames: e } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            return me({ refresh: !0, submoduleNames: e }).then((e) => (t && (0, l.fp)(t) && t(), e));
          }
          function he() {
            return me();
          }
          function pe() {
            let e = Number(E.SL.hash);
            const t = [];
            for (; e > 0; ) (t.push(String.fromCharCode(255 & e)), (e >>>= 8));
            return btoa(t.join(''));
          }
          function ye(e, t) {
            const n = E.SL.getConsentData();
            if (e.config.storage) {
              let o,
                r = Z(e),
                s = !1;
              if ('number' == typeof e.config.storage.refreshInSeconds) {
                const t = new Date(Z(e, 'last'));
                s = t && Date.now() - t.getTime() > 1e3 * e.config.storage.refreshInSeconds;
              }
              if (
                !r ||
                s ||
                t ||
                (function (e) {
                  const t = Z(e, 'cst');
                  return !t || t !== pe();
                })(e)
              ) {
                const t = Object.assign({ enabledStorageTypes: e.enabledStorageTypes }, e.config);
                o = e.submodule.getId(t, n, r);
              } else 'function' == typeof e.submodule.extendId && (o = e.submodule.extendId(e.config, n, r));
              ((0, l.Qd)(o) && (o.id && (Q(e, o.id), (r = o.id)), 'function' == typeof o.callback && (e.callback = o.callback)),
                r && (e.idObj = e.submodule.decode(r, e.config)));
            } else if (e.config.value) e.idObj = e.config.value;
            else {
              const t = e.submodule.getId(e.config, n);
              (0, l.Qd)(t) &&
                ('function' == typeof t.callback && (e.callback = t.callback), t.id && (e.idObj = e.submodule.decode(t.id, e.config)));
            }
          }
          function Ie(e) {
            const t = m(e.combined);
            if (t.length && W) {
              const e = re(t);
              e &&
                ((0, d.isGptPubadsDefined)()
                  ? window.googletag.pubads().setPublisherProvidedId(e)
                  : ((window.googletag = window.googletag || {}),
                    (window.googletag.cmd = window.googletag.cmd || []),
                    window.googletag.cmd.push(function () {
                      window.googletag.pubads().setPublisherProvidedId(e);
                    })));
            }
          }
          function we(e, t) {
            let n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return J()
              .fork()
              .measureTime('userId.init.modules', function () {
                if (!t.length) return [];
                if (
                  (t.forEach((e) => Oe(e)),
                  !(t = t.filter(
                    (e) => (!e.config.storage || !!e.enabledStorageTypes.length) && N.isAllowed(S.yl, (0, O.s)(v.fW, e.config.name)),
                  )).length)
                )
                  return ((0, d.logWarn)(`${x} - no ID module configured`), []);
                const o = t.reduce(
                  (e, t) =>
                    B(t.submodule.name).measureTime('init', () => {
                      try {
                        (ye(t, n), e.push(t));
                      } catch (e) {
                        (0, d.logError)(`Error in userID module '${t.submodule.name}':`, e);
                      }
                      return e;
                    }),
                  [],
                );
                return (e.refresh(o), Ie(e), o);
              });
          }
          function Ee(e) {
            return e?.storage?.type?.trim().split(/\s*&\s*/) || [];
          }
          function ve(e) {
            function t(e) {
              for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
              (0, d.logWarn)(`Invalid userSync.userId config: ${e}`, ...n);
            }
            return Array.isArray(e)
              ? e.filter((e) => {
                  if (!e?.name) return t('must specify "name"', e);
                  if (e.storage) {
                    if (!e.storage.name || !e.storage.type) return t('must specify "storage.name" and "storage.type"', e);
                    if (
                      !(function (e) {
                        return Ee(e).every((e) => De.has(e));
                      })(e)
                    )
                      return t('invalid "storage.type"', e);
                    ['expires', 'refreshInSeconds'].forEach((n) => {
                      let o = e.storage[n];
                      null != o &&
                        'number' != typeof o &&
                        ((o = Number(o)),
                        isNaN(o) ? (t(`storage.${n} must be a number and will be ignored`, e), delete e.storage[n]) : (e.storage[n] = o));
                    });
                  }
                  return !0;
                })
              : (null != e && t('must be an array', e), []);
          }
          const De = new Set([C, A]);
          const Se = [1, 2, 3, 4, 7];
          function Oe(e) {
            if (e.enabledStorageTypes) return;
            const t = Ee(e.config);
            e.enabledStorageTypes = t.filter((t) => {
              switch (t) {
                case C:
                  return (
                    V.forEach((t) => {
                      (0, b.p6)('userId', { type: 'web', identifier: e.config.storage.name + t, purposes: Se });
                    }),
                    (function (e) {
                      return !(
                        !e.storageMgr.localStorageIsEnabled() ||
                        (U.getDataFromLocalStorage(T) && ((0, d.logInfo)(`${x} - opt-out localStorage found, storage disabled`), 1))
                      );
                    })(e)
                  );
                case A:
                  return (
                    H.forEach((t) => {
                      (0, b.p6)('userId', {
                        type: 'cookie',
                        identifier: e.config.storage.name + t,
                        purposes: Se,
                        maxAgeSeconds: 24 * (e.config.storage.expires ?? 0) * 60 * 60,
                        cookieRefresh: !0,
                      });
                    }),
                    (function (e) {
                      return !(
                        !e.storageMgr.cookiesAreEnabled() ||
                        (U.getCookie(T) && ((0, d.logInfo)(`${x} - opt-out cookie found, storage disabled`), 1))
                      );
                    })(e)
                  );
              }
              return !1;
            });
          }
          function ke(e) {
            (f.clear(),
              Object.entries(
                X(
                  e,
                  (e) => Object.keys(e.eids || {}),
                  (e) => e,
                ),
              ).forEach((e) => {
                let [t, n] = e;
                return f.set(t, n[0].eids[t]);
              }));
          }
          function $e() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            ke(G);
            const t = ve(R);
            if (!t.length) return;
            const n = (function (e, t) {
              let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : M,
                o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : G;
              const { autoRefresh: r, retainConfig: s } = e;
              return o.reduce((e, o) => {
                const { name: i, aliasName: a } = o,
                  c = (e) => [i, a].some((t) => t?.toLowerCase() === e.toLowerCase()),
                  u = t.find((e) => c(e.name));
                if (!u) {
                  if (!s) return e;
                  const t = n.find((e) => c(e.config.name));
                  return t ? [...e, t] : e;
                }
                const l = {
                  submodule: o,
                  config: { ...u, name: o.name },
                  callback: void 0,
                  idObj: void 0,
                  storageMgr: (0, b.le)({ moduleType: v.fW, moduleName: u.name, advertiseKeys: !1 }),
                };
                if (r) {
                  const e = n.find((e) => c(e.config.name));
                  l.refreshIds = !e || !(0, d.deepEqual)(l.config, e.config);
                }
                return [...e, l];
              }, []);
            })(e, t);
            (M.splice(0, M.length),
              M.push(...n),
              M.length &&
                (i.gH.getHooks({ hook: se }).length ||
                  (i.gH.before(se, 100), a.Ay.callDataDeletionRequest.before(je), p.Q.after((e) => e(re()))),
                (0, d.logInfo)(
                  `${x} - usersync config updated for ${M.length} submodules: `,
                  M.map((e) => e.submodule.name),
                )));
          }
          function je(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
            ((0, d.logInfo)('UserID: received data deletion request; deleting all stored IDs...'),
              M.forEach((e) => {
                if ('function' == typeof e.submodule.onDataDeletionRequest)
                  try {
                    e.submodule.onDataDeletionRequest(e.config, e.idObj, ...n);
                  } catch (t) {
                    (0, d.logError)(`Error calling onDataDeletionRequest for ID submodule ${e.submodule.name}`, t);
                  }
                Y(e);
              }),
              e.apply(this, n));
          }
          function xe(e) {
            return function () {
              for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++) n[o] = arguments[o];
              return Promise.resolve(e.apply(this, n));
            };
          }
          const Ae = (e, t) => (n) => {
            if (n[$.Dk] !== v.fW || !n[$.OI]) return;
            const o = e.find((e) => {
              return ((t = e.name), n[$.iK]?.toLowerCase() === t?.toLowerCase());
              var t;
            });
            if (o && o.storage && n[$.Zw] !== o.storage.type) {
              const e = `${o.name} attempts to store data in ${n[$.Zw]} while configuration allows ${o.storage.type}.`;
              if (t) return { allow: !1, reason: e };
              (0, d.logWarn)(e);
            }
          };
          function Ce(e) {
            let t,
              { mkDelay: n = y.cb } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            ((W = void 0),
              (M = []),
              (R = []),
              (P = ee()),
              (oe = (function () {
                let { mkDelay: e = y.cb } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                const t = (0, y.v6)(),
                  n = (0, y.v6)();
                let o,
                  r,
                  i = !1;
                function a(e) {
                  return (
                    (r = J().fork()),
                    null != o && o.reject(ne),
                    (o = (0, y.v6)()),
                    y.U9.race([e, o.promise]).finally(r.startTiming('userId.total'))
                  );
                }
                const d = P,
                  f = M;
                function g(e) {
                  return function () {
                    if (d === P && f === M) return e(...arguments);
                  };
                }
                function m() {
                  return E.SL.promise.finally(r.startTiming('userId.init.consent'));
                }
                let b = a(
                  y.U9.all([u.Gc, t.promise])
                    .then(m)
                    .then(
                      g(() => {
                        we(d, f);
                      }),
                    )
                    .then(() => n.promise.finally(r.startTiming('userId.callbacks.pending')))
                    .then(
                      g(() => {
                        const e = d.submodules.filter((e) => (0, l.fp)(e.callback));
                        if (e.length) return new y.U9((t) => z(e, t, d));
                      }),
                    ),
                );
                return function () {
                  let {
                    refresh: o = !1,
                    submoduleNames: r = null,
                    ready: u = !1,
                  } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                  return (
                    u &&
                      !i &&
                      ((i = !0),
                      t.resolve(),
                      _ > 0
                        ? n.resolve()
                        : s.on(c.qY.AUCTION_END, function t() {
                            (s.AU(c.qY.AUCTION_END, t), e(L).then(n.resolve));
                          })),
                    o &&
                      i &&
                      (b = a(
                        b
                          .catch(() => null)
                          .then(m)
                          .then(
                            g(() => {
                              const e = we(
                                d,
                                f.filter((e) => null == r || r.includes(e.submodule.name)),
                                !0,
                              ).filter((e) => null != e.callback);
                              if (e.length) return new y.U9((t) => z(e, t, d));
                            }),
                          ),
                      )),
                    b
                  );
                };
              })({ mkDelay: n })),
              null != q && q(),
              (G = []),
              (q = e.getConfig('userSync', (e) => {
                const n = e.userSync;
                if (n && ((W = n.ppid), n.userIds)) {
                  const { autoRefresh: e = !1, retainConfig: o = !0, enforceStorageType: r } = n;
                  ((R = n.userIds),
                    (L = (0, l.Et)(n.syncDelay) ? n.syncDelay : k.qh.syncDelay),
                    (_ = (0, l.Et)(n.auctionDelay) ? n.auctionDelay : k.qh.auctionDelay),
                    $e({ retainConfig: o, autoRefresh: e }),
                    t?.(),
                    (t = (0, D.qB)(
                      S.Ue,
                      'enforceStorageTypeRule',
                      Ae(
                        M.map((e) => {
                          let { config: t } = e;
                          return t;
                        }),
                        r,
                      ),
                    )),
                    (function (e, t) {
                      if (e) {
                        const n = {},
                          o = new Map(t.map((e) => (e.aliasName ? [e.aliasName, e.name] : [])));
                        (Object.keys(e).forEach((t) => {
                          const r = (0, l.cy)(e[t]) ? [...e[t]].reverse() : [];
                          n[t] = r.map((e) => (o.has(e) ? o.get(e) : e));
                        }),
                          (F = n));
                      } else F = {};
                      (P.refresh(), ke(t));
                    })(n.idPriority, G),
                    oe({ ready: !0 }));
                  const s = M.filter((e) => e.refreshIds);
                  s.length && be({ submoduleNames: s.map((e) => e.submodule.name) });
                }
              })),
              a.Ay.makeBidRequests.after(ie),
              j.NE.before(ae),
              (0, i.xu)('getUserIds', ce),
              (0, i.xu)('getUserIdsAsEids', ue),
              (0, i.xu)('getEncryptedEidsForSource', xe(de)),
              (0, i.xu)('registerSignalSources', ge),
              (0, i.xu)('refreshUserIds', xe(be)),
              (0, i.xu)('getUserIdsAsync', xe(he)),
              (0, i.xu)('getUserIdsAsEidBySource', le));
          }
          (Ce(r.$W),
            (0, u.xG)(
              'userId',
              function (e) {
                ((e.findRootDomain = w.S),
                  (G || []).find((t) => t.name === e.name) ||
                    (G.push(e), E.o2.register(v.fW, e.name, e.gvlid), $e(), oe({ refresh: !0, submoduleNames: [e.name] })));
              },
              { postInstallAllowed: !0 },
            ),
            (0, o.E)('userId'));
        },
      },
      (e) => {
        e.O(0, [802, 7769, 315, 1085], () => {
          return ((t = 7355), e((e.s = t)));
          var t;
        });
        e.O();
      },
    ]);
  })(),
    pbjs.processQueue());
