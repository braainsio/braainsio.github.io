function printStackTrace(t) {
    t = t || {
        guess: !0
    };
    for (var e = t.e || null, i = !!t.guess, n = new printStackTrace.implementation, s = n.run(e), o = i ? n.guessAnonymousFunctions(s) : s, r = 0; 4 > r; r++) o.shift();
    return o
}

function shareOnFB() {
    FB.ui({
        method: "feed",
        link: "http://www.braains.io",
        picture: "https://i.redd.it/rv6qyefuj0tx.png",
        name: "braains.io - Survive the zombie attack!!",
        caption: "braains.io",
        description: "braains.io is the best html5 zombie game out there!"
    }, function(t) {
        var e = JSON.stringify(t),
            i = JSON.parse(e);
        i.post_id != "" && ($.cookie("fb-shared", !0), $(".btn-buy-skin").removeClass("disabled"))
    })
}

function prerollComplete() {
    gameStarted || (console.log("ad completed. starting game"), pathArray = window.location.href.split("/"), host = pathArray[2], host == "localhost" ? ige.client.connectToLocalhost() : ige.client.startGame(), gameStarted = !0), isShoppingTime && $("#shopping-modal").modal("show"), ige.client.adsDue = !1, adIsPlaying = !1
}

function showAipPreroll() {
    typeof aipPlayer != "undefined" ? (adplayer = new aipPlayer({
        AD_WIDTH: 960,
        AD_HEIGHT: 540,
        AD_FULLSCREEN: !1,
        PREROLL_ELEM: document.getElementById("preroll"),
        AIP_COMPLETE: function() {
            prerollComplete()
        }
    }), adIsPlaying = !0, adplayer.startPreRoll()) : prerollComplete()
}

function showAipMidroll() {
    typeof aipPlayer != "undefined" ? (adplayer = new aipPlayer({
        AD_WIDTH: 960,
        AD_HEIGHT: 540,
        AD_FULLSCREEN: !1,
        PREROLL_ELEM: document.getElementById("preroll"),
        AIP_COMPLETE: function() {
            prerollComplete()
        }
    }), adIsPlaying = !0, $("#shopping-modal").modal("hide"), adplayer.startMidRoll()) : prerollComplete()
}

function getScript(t) {
    var e = document.getElementsByTagName("script"),
        i = document.createElement("script"),
        n = !0;
    i.async = "async", i.type = "text/javascript", i.charset = "UTF-8", i.src = t, i.onload = i.onreadystatechange = function() {
        !n || i.readyState && !/loaded|complete/.test(i.readyState) || (n = !1, i.onload = i.onreadystatechange = null)
    }, e[0].parentNode.insertBefore(i, e[0])
}
printStackTrace.implementation = function() {}, printStackTrace.implementation.prototype = {
    run: function(t) {
        t = t || this.createException();
        var e = this.mode(t);
        return e === "other" ? this.other(arguments.callee) : this[e](t)
    },
    createException: function() {
        try {
            return this.undef(), null
        } catch (t) {
            return t
        }
    },
    mode: function(t) {
        return this._mode = t.arguments && t.stack ? "chrome" : t.message && typeof window != "undefined" && window.opera ? t.stacktrace ? "opera10" : "opera" : t.stack ? "firefox" : "other"
    },
    instrumentFunction: function(t, e, i) {
        t = t || window;
        var n = t[e];
        t[e] = function() {
            return i.call(this, printStackTrace().slice(4)), t[e]._instrumented.apply(this, arguments)
        }, t[e]._instrumented = n
    },
    deinstrumentFunction: function(t, e) {
        t[e].constructor === Function && t[e]._instrumented && t[e]._instrumented.constructor === Function && (t[e] = t[e]._instrumented)
    },
    chrome: function(t) {
        var e = (t.stack + "\n").replace(/^\S[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}()@$1").split("\n");
        return e.pop(), e
    },
    firefox: function(t) {
        return t.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n")
    },
    opera10: function(t) {
        var e, i, n, s = t.stacktrace,
            o = s.split("\n"),
            r = "{anonymous}",
            a = /.*line (\d+), column (\d+) in ((<anonymous function\:?\s*(\S+))|([^\(]+)\([^\)]*\))(?: in )?(.*)\s*$/i;
        for (e = 2, i = 0, n = o.length; n - 2 > e; e++)
            if (a.test(o[e])) {
                var h = RegExp.$6 + ":" + RegExp.$1 + ":" + RegExp.$2,
                    d = RegExp.$3;
                d = d.replace(/<anonymous function\:?\s?(\S+)?>/g, r), o[i++] = d + "@" + h
            }
        return o.splice(i, o.length - i), o
    },
    opera: function(t) {
        var e, i, n, s = t.message.split("\n"),
            o = "{anonymous}",
            r = /Line\s+(\d+).*script\s+(http\S+)(?:.*in\s+function\s+(\S+))?/i;
        for (e = 4, i = 0, n = s.length; n > e; e += 2) r.test(s[e]) && (s[i++] = (RegExp.$3 ? RegExp.$3 + "()@" + RegExp.$2 + RegExp.$1 : o + "()@" + RegExp.$2 + ":" + RegExp.$1) + " -- " + s[e + 1].replace(/^\s+/, ""));
        return s.splice(i, s.length - i), s
    },
    other: function(t) {
        var e, i, n = "{anonymous}",
            s = /function\s*([\w\-$]+)?\s*\(/i,
            o = [],
            r = 10;
        while (t && r > o.length) e = s.test(t + "") ? RegExp.$1 || n : n, i = Array.prototype.slice.call(t.arguments || []), o[o.length] = e + "(" + this.stringifyArguments(i) + ")", t = t.caller;
        return o
    },
    stringifyArguments: function(t) {
        for (var e = Array.prototype.slice, i = 0; t.length > i; ++i) {
            var n = t[i];
            n === void 0 ? t[i] = "undefined" : n === null ? t[i] = "null" : n.constructor && (n.constructor === Array ? t[i] = 3 > n.length ? "[" + this.stringifyArguments(n) + "]" : "[" + this.stringifyArguments(e.call(n, 0, 1)) + "..." + this.stringifyArguments(e.call(n, -1)) + "]" : n.constructor === Object ? t[i] = "#object" : n.constructor === Function ? t[i] = "#function" : n.constructor === String && (t[i] = '"' + n + '"'))
        }
        return t.join(",")
    },
    sourceCache: {},
    ajax: function(t) {
        var e = this.createXMLHTTPObject();
        if (e) return e.open("GET", t, !1), e.send(""), e.responseText
    },
    createXMLHTTPObject: function() {
        for (var t, e = [function() {
                return new XMLHttpRequest
            }, function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function() {
                return new ActiveXObject("Msxml3.XMLHTTP")
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }], i = 0; e.length > i; i++) try {
            return t = e[i](), this.createXMLHTTPObject = e[i], t
        } catch (n) {}
    },
    isSameDomain: function(t) {
        return t.indexOf(location.hostname) !== -1
    },
    getSource: function(t) {
        return t in this.sourceCache || (this.sourceCache[t] = this.ajax(t).split("\n")), this.sourceCache[t]
    },
    guessAnonymousFunctions: function(t) {
        for (var e = 0; t.length > e; ++e) {
            var i = /\{anonymous\}\(.*\)@(\w+:\/\/([\-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/,
                n = t[e],
                s = i.exec(n);
            if (s) {
                var o = s[1],
                    r = s[4],
                    a = s[7] || 0;
                if (o && this.isSameDomain(o) && r) {
                    var h = this.guessAnonymousFunction(o, r, a);
                    t[e] = n.replace("{anonymous}", h)
                }
            }
        }
        return t
    },
    guessAnonymousFunction: function(t, e) {
        var i;
        try {
            i = this.findFunctionName(this.getSource(t), e)
        } catch (n) {
            i = "getSource failed with url: " + t + ", exception: " + (n + "")
        }
        return i
    },
    findFunctionName: function(t, e) {
        for (var i, n, s = /function\s+([^(]*?)\s*\(([^)]*)\)/, o = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function\b/, r = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(?:eval|new Function)\b/, a = "", h = 10, d = 0; h > d; ++d)
            if (i = t[e - d]) {
                if (a = i + a, n = o.exec(a), n && n[1]) return n[1];
                if (n = s.exec(a), n && n[1]) return n[1];
                if (n = r.exec(a), n && n[1]) return n[1]
            }
        return "(?)"
    }
}, ige = null, igeVersion = "v1.6.0@2015-04-29.001", igeClassStore = {}, igeConfig = {
    debug: {
        _enabled: !1,
        _node: typeof module != "undefined" && module.exports !== void 0,
        _level: ["log", "warning", "error"],
        _stacks: !0,
        _throwErrors: !0,
        _timing: !0,
        enabled: function(t) {
            return t !== void 0 ? (this._enabled = t, t || (this._timing = !1, ige && ige.showStats(0)), this) : this._enabled
        }
    }
}, igeConfig.debug._node && (igeConfig.debug._util = require("util")), Object.defineProperty(Object.prototype, "tween", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Object.prototype.tween = function(t, e, i) {
    var n = (new $i_53).targetObj(this).properties(t).duration(e);
    return i && (i.beforeTween && n.beforeTween(i.beforeTween), i.afterTween && n.afterTween(i.afterTween), i.easing && n.easing(i.easing), i.startTime && n.startTime(i.startTime)), n
}, Object.defineProperty(Object.prototype, "theSameAs", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Object.prototype.theSameAs = function(t) {
    return JSON.stringify(this) === JSON.stringify(t)
}, Object.defineProperty(Array.prototype, "clone", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.clone = function() {
    var t, e = [];
    for (t in this) this.hasOwnProperty(t) && (e[t] = this[t] instanceof Array ? this[t].clone() : this[t]);
    return e
}, Object.defineProperty(Array.prototype, "pull", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.pull = function(t) {
    var e = this.indexOf(t);
    return e > -1 ? (this.splice(e, 1), e) : -1
}, Object.defineProperty(Array.prototype, "pushUnique", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.pushUnique = function(t) {
    var e = this.indexOf(t);
    return e === -1 ? (this.push(t), !0) : !1
}, Object.defineProperty(Array.prototype, "each", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.each = function(t) {
    var e, i = this.length;
    for (e = 0; i > e; e++) t(this[e])
}, Object.defineProperty(Array.prototype, "eachReverse", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.eachReverse = function(t) {
    var e, i = this.length;
    for (e = i - 1; e >= 0; e--) t(this[e])
}, Object.defineProperty(Array.prototype, "destroyAll", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.destroyAll = function() {
    var t, e = this.length;
    for (t = e - 1; t >= 0; t--) typeof this[t].destroy == "function" && this[t].destroy()
}, Object.defineProperty(Array.prototype, "eachIsolated", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.eachIsolated = function(t) {
    var e, i = [],
        n = i.length;
    for (e = 0; n > e; e++) i[e] = this[e];
    for (e = 0; n > e; e++) t(i[e])
}, Object.defineProperty(Math, "PI180", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Math.PI180 = Math.PI / 180, Object.defineProperty(Math, "PI180R", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Math.PI180R = 180 / Math.PI, Object.defineProperty(Math, "toIso", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Math.toIso = function(t, e, i) {
    var n = t - e,
        s = -i * 1.2247 + (t + e) * .5;
    return {
        x: n,
        y: s
    }
}, Object.defineProperty(Math, "radians", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Math.radians = function(t) {
    return t * Math.PI180
}, Object.defineProperty(Math, "degrees", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Math.degrees = function(t) {
    return t * Math.PI180R
}, Object.defineProperty(Math, "distance", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Math.distance = function(t, e, i, n) {
    return Math.sqrt((t - i) * (t - i) + (e - n) * (e - n))
}, typeof CanvasRenderingContext2D != "undefined" && (Object.defineProperty(CanvasRenderingContext2D.prototype, "circle", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Object.defineProperty(CanvasRenderingContext2D.prototype, "strokeCircle", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Object.defineProperty(CanvasRenderingContext2D.prototype, "fillCircle", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), CanvasRenderingContext2D.prototype.circle = function(t, e, i) {
    this.arc(t, e, i, 0, 2 * Math.PI, !1)
}, CanvasRenderingContext2D.prototype.strokeCircle = function(t, e, i) {
    this.save(), this.beginPath(), this.arc(t, e, i, 0, 2 * Math.PI, !1), this.stroke(), this.restore()
}, CanvasRenderingContext2D.prototype.fillCircle = function(t, e, i) {
    this.save(), this.beginPath(), this.arc(t, e, i, 0, 2 * Math.PI, !1), this.fill(), this.restore()
}), typeof ImageData != "undefined" && (Object.defineProperty(ImageData.prototype, "pixelAt", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), ImageData.prototype.pixelAt = function(t, e) {
    var i = this.data,
        n = e * this.width * 4 + t * 4;
    return {
        r: i[n],
        g: i[n + 1],
        b: i[n + 2],
        a: i[n + 3]
    }
}, Object.defineProperty(ImageData.prototype, "isTransparent", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), ImageData.prototype.isTransparent = function(t, e) {
    var i = this.data,
        n = e * this.width * 4 + t * 4;
    return i[n + 3] === 0
}, Object.defineProperty(ImageData.prototype, "makeTransparent", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), ImageData.prototype.makeTransparent = function(t, e) {
    var i = this.data,
        n = e * this.width * 4 + t * 4;
    i[n + 3] = 0
});
var disableContextMenu = function(t) {
    t !== null && (t.oncontextmenu = function() {
        return !1
    })
};
Array.prototype.indexOf || (Object.defineProperty(Array.prototype, "indexOf", {
    enumerable: !1,
    writable: !0,
    configurable: !0
}), Array.prototype.indexOf = function(t) {
    var e, i = this.length;
    for (e = 0; i > e; e++)
        if (this[e] === t) return e;
    return -1
}), requestAnimFrame = typeof window != "undefined" ? function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
        setTimeout(function() {
            t((new Date).getTime())
        }, 1e3 / 60)
    }
}() : function() {
    return function(t) {
        setTimeout(function() {
            t((new Date).getTime())
        }, 1e3 / 60)
    }
}(), typeof console == "object" ? typeof console.log == "function" && (console.info === void 0 && (console.info = console.log), console.warn === void 0 && (console.warn = console.log)) : console = {
    log: function() {},
    warn: function() {},
    info: function() {},
    error: function() {}
};
var $i_2 = function() {
    var t = !1,
        e = (/xyz/.test(function() {}) ? /\b_super\b/ : /.*/, function() {}),
        i = function(t, e, i) {
            if (igeConfig.debug._enabled) {
                var n, s, o = "";
                if (s = this._id !== void 0 ? ":" + this._id : "", e = e || "log", i !== void 0 && console.warn(i), (e === "warning" || e === "error") && igeConfig.debug._stacks && (igeConfig.debug._node ? console.trace ? console.trace() : (n = Error().stack, console.log(color.magenta("Stack:"), color.red(n)), console.log("Stack:", n)) : typeof printStackTrace == "function" && console.log("Stack:", printStackTrace().join("\n ---- "))), e === "error") {
                    if (typeof ige != "undefined" && (console.log(o + "IGE *" + e + "* [" + (this._classId || this.prototype._classId) + s + "] : " + "Error encountered, stopping engine to prevent console spamming..."), ige.stop()), igeConfig.debug._throwErrors) throw o + "IGE *" + e + "* [" + (this._classId || this.prototype._classId) + s + "] : " + t;
                    console.log(o + "IGE *" + e + "* [" + (this._classId || this.prototype._classId) + s + "] : " + t)
                } else console.log(o + "IGE *" + e + "* [" + (this._classId || this.prototype._classId) + s + "] : " + t)
            }
            return this
        },
        n = function() {
            return this._classId
        },
        s = function(t, e) {
            var i = new t(this, e);
            return this[i.componentId] = i, this._components = this._components || [], this._components.push(i), this
        },
        o = function(t) {
            return this[t] && this[t].destroy && this[t].destroy(), this._components && this._components.pull(this[t]), delete this[t], this
        },
        r = function(t, e) {
            var i, n = t.prototype || t;
            for (i in n) n.hasOwnProperty(i) && (e || this[i] === void 0) && (this[i] = n[i]);
            return this
        },
        a = function(t, e) {
            return t !== void 0 ? e !== void 0 ? (this._data = this._data || {}, this._data[t] = e, this) : this._data ? this._data[t] : null : void 0
        };
    return e.extend = function() {
        function e() {
            !t && this.init && this.init.apply(this, arguments)
        }
        var h, d, l, u, c, _, g, p = arguments[arguments.length - 1],
            m = arguments[0];
        if (!p.classId) throw console.log(p), "Cannot create a new class without giving the class a classId property!";
        if (igeClassStore[p.classId]) throw 'Cannot create class with classId "' + p.classId + '" because a class with that ID has already been created!';
        t = !0, d = new this, t = !1;
        for (h in p) p.hasOwnProperty(h) && (d[h] = p[h]);
        if (arguments.length > 1 && m && m.length)
            for (c = 0; m.length > c; c++) {
                l = m[c], g = l.extension.prototype || l.extension, u = l.overwrite;
                for (_ in g) g.hasOwnProperty(_) && (u || d[_] === void 0) && (d[_] = g[_])
            }
        return e.prototype = d, e.prototype.constructor = e, e.extend = arguments.callee, e.prototype.log = i, e.prototype.data = a, e.prototype.classId = n, e.prototype._classId = p.classId || "$i_2", e.prototype.addComponent = s, e.prototype.removeComponent = o, e.prototype.implement = r, e.prototype.__igeEditor = p.editorOptions, igeClassStore[p.classId] = e, e
    }, e.vanilla = function(t) {
        var e = t.init || function() {},
            h = new this;
        for (name in t) t.hasOwnProperty(name) && name !== "init" && (h[name] = t[name]);
        return e.prototype = h, e.prototype.constructor = e, e.extend = this.extend, e.prototype.log = i, e.prototype.data = a, e.prototype.classId = n, e.prototype._classId = t.classId || "$i_2", e.prototype.addComponent = s, e.prototype.removeComponent = o, e.prototype.implement = r, igeClassStore[t.classId] = e, e
    }, e.prototype._classId = "$i_2", e
}();
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_2);
var $i_3 = $i_2.extend({
    classId: "$i_3",
    on: function(t, e, i, n, s) {
        var o, r, a, h, d, l, u, c, _, g = this;
        if (this._eventListeners = this._eventListeners || {}, typeof e == "function") {
            if (typeof t == "string") return o = {
                call: e,
                context: i,
                oneShot: n,
                sendEventName: s
            }, h = this._eventListeners[t] = this._eventListeners[t] || [], r = !0, a = h.indexOf(o), a > -1 && (r = !1), r && h.push(o), o;
            if (t.length) {
                d = [], d[0] = 0, d[1] = 0, d[3] = function() {
                    d[1]++, d[0] === d[1] && e.apply(i || g)
                };
                for (l in t) t.hasOwnProperty(l) && (u = t[l], c = u[0], _ = u[1], d[0]++, c.on(_, d[3], null, !0, !0))
            }
        } else typeof t != "string" && (t = "*Multi-Event*"), this.log('Cannot register event listener for event "' + t + '" because the passed callback is not a function!', "error")
    },
    off: function(t, e, i) {
        if (this._eventListeners) {
            if (this._eventListeners._processing) return this._eventListeners._removeQueue = this._eventListeners._removeQueue || [], this._eventListeners._removeQueue.push([t, e, i]), -1;
            if (this._eventListeners[t]) {
                var n = this._eventListeners[t].indexOf(e);
                if (n > -1) return this._eventListeners[t].splice(n, 1), i && i(!0), !0;
                this.log('Failed to cancel event listener for event named "' + t + '" !', "warning", e)
            } else this.log("Failed to cancel event listener!")
        }
        return i && i(!1), !1
    },
    emit: function(t, e) {
        if (this._eventListeners && this._eventListeners[t]) {
            var i, n, s, o, r, a, h = this._eventListeners[t].length,
                d = this._eventListeners[t].length - 1;
            if (h) {
                if (i = [], typeof e == "object" && e !== null && e[0] !== null && e[0] !== void 0)
                    for (n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
                else i = [e];
                s = !1, this._eventListeners._processing = !0;
                while (h--) o = d - h, r = this._eventListeners[t][o], r.sendEventName && (i = [t]), a = r.call.apply(r.context || this, i), a === !0 && (s = !0), r.oneShot && this.off(t, r) === !0 && d--;
                if (this._eventListeners && (this._eventListeners._processing = !1, this._processRemovals()), s) return 1
            }
        }
    },
    eventList: function() {
        return this._eventListeners
    },
    _processRemovals: function() {
        if (this._eventListeners) {
            var t, e, i, n = this._eventListeners._removeQueue;
            if (n) {
                t = n.length;
                while (t--) e = n[t], i = this.off(e[0], e[1]), typeof n[2] == "function" && n[2](i)
            }
            delete this._eventListeners._removeQueue
        }
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_3);
var $i_4 = $i_2.extend({
    classId: "$i_4",
    init: function(t, e, i) {
        return this.x = t = t !== void 0 ? t : 0, this.y = e = e !== void 0 ? e : 0, this._floor = i !== void 0, this._floor ? (this.x2 = Math.floor(t / 2), this.y2 = Math.floor(e / 2)) : (this.x2 = t / 2, this.y2 = e / 2), this
    },
    floor: function(t) {
        return t !== void 0 ? (this._floor = t, this) : this._floor
    },
    compare: function(t) {
        return t && this.x === t.x && this.y === t.y
    },
    copy: function(t) {
        return this.x = t.x, this.y = t.y, this.z = t.z, this
    },
    toIso: function() {
        var t = this.x - this.y,
            e = (this.x + this.y) * .5;
        return {
            x: t,
            y: e
        }
    },
    thisToIso: function() {
        var t = this.toIso();
        return this.x = t.x, this.y = t.y, this
    },
    to2d: function() {
        var t = this.y + this.x / 2,
            e = this.y - this.x / 2;
        return {
            x: t,
            y: e
        }
    },
    thisTo2d: function() {
        var t = this.to2d();
        return this.x = t.x, this.y = t.y, this
    },
    addPoint: function(t) {
        return new $i_4(this.x + t.x, this.y + t.y)
    },
    thisAddPoint: function(t) {
        return this.x += t.x, this.y += t.y, this
    },
    minusPoint: function(t) {
        return new $i_4(this.x - t.x, this.y - t.y)
    },
    thisMinusPoint: function(t) {
        return this.x -= t.x, this.y -= t.y, this
    },
    multiply: function(t, e) {
        return new $i_4(this.x * t, this.y * e)
    },
    multiplyPoint: function(t) {
        return new $i_4(this.x * t.x, this.y * t.y)
    },
    thisMultiply: function(t, e) {
        return this.x *= t, this.y *= e, this
    },
    divide: function(t, e) {
        return new $i_4(this.x / t, this.y / e)
    },
    dividePoint: function(t) {
        var e = this.x,
            i = this.y;
        return t.x && (e = this.x / t.x), t.y && (i = this.y / t.y), new $i_4(e, i)
    },
    thisDivide: function(t, e) {
        return this.x /= t, this.y /= e, this
    },
    clone: function() {
        return new $i_4(this.x, this.y)
    },
    interpolate: function(t, e, i, n) {
        var s = t.x - this.x,
            o = t.y - this.y,
            r = n - e,
            a = r - (i - e),
            h = a / r;
        return new $i_4(t.x - s * h, t.y - o * h)
    },
    rotate: function(t) {
        var e = Math.sin(t),
            i = Math.cos(t),
            n = i * this.x - e * this.y,
            s = e * this.x - i * this.y;
        return new $i_4(n, s)
    },
    thisRotate: function(t) {
        var e = Math.sin(t),
            i = Math.cos(t),
            n = this.x,
            s = this.y;
        return this.x = i * n - e * s, this.y = e * n - i * s, this
    },
    toString: function(t) {
        return t === void 0 && (t = 2), this.x == void 0 || this.y == void 0 ? "0,0" : parseFloat(this.x).toFixed(t) + "," + parseFloat(this.y).toFixed(t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_4);
var $i_5 = $i_2.extend({
    classId: "$i_5",
    init: function(t, e, i, n) {
        return this.x = t = t !== void 0 ? t : 0, this.y = e = e !== void 0 ? e : 0, this.z = i = i !== void 0 ? i : 0, this._floor = n !== void 0, this._floor ? (this.x2 = Math.floor(t / 2), this.y2 = Math.floor(e / 2), this.z2 = Math.floor(i / 2)) : (this.x2 = t / 2, this.y2 = e / 2, this.z2 = i / 2), this
    },
    floor: function(t) {
        return t !== void 0 ? (this._floor = t, this) : this._floor
    },
    compare: function(t) {
        return t && this.x === t.x && this.y === t.y && this.z === t.z
    },
    copy: function(t) {
        return this.x = t.x, this.y = t.y, this.z = t.z, this
    },
    toIso: function() {
        var t = this.x - this.y,
            e = -this.z * 1.2247 + (this.x + this.y) * .5;
        return {
            x: t,
            y: e
        }
    },
    thisToIso: function() {
        var t = this.toIso();
        return this.x = t.x, this.y = t.y, this
    },
    to2d: function() {
        var t = this.y + this.x / 2,
            e = this.y - this.x / 2;
        return {
            x: t,
            y: e
        }
    },
    thisTo2d: function() {
        var t = this.to2d();
        return this.x = t.x, this.y = t.y, this.z = 0, this
    },
    addPoint: function(t) {
        return new $i_5(this.x + t.x, this.y + t.y, this.z + t.z)
    },
    thisAddPoint: function(t) {
        return this.x += t.x, this.y += t.y, this.z += t.z, this
    },
    minusPoint: function(t) {
        return new $i_5(this.x - t.x, this.y - t.y, this.z - t.z)
    },
    thisMinusPoint: function(t) {
        return this.x -= t.x, this.y -= t.y, this.z -= t.z, this
    },
    multiply: function(t, e, i) {
        return new $i_5(this.x * t, this.y * e, this.z * i)
    },
    multiplyPoint: function(t) {
        return new $i_5(this.x * t.x, this.y * t.y, this.z * t.z)
    },
    thisMultiply: function(t, e, i) {
        return this.x *= t, this.y *= e, this.z *= i, this
    },
    divide: function(t, e, i) {
        return new $i_5(this.x / t, this.y / e, this.z / i)
    },
    dividePoint: function(t) {
        var e = this.x,
            i = this.y,
            n = this.z;
        return t.x && (e = this.x / t.x), t.y && (i = this.y / t.y), t.z && (n = this.z / t.z), new $i_5(e, i, n)
    },
    thisDivide: function(t, e, i) {
        return this.x /= t, this.y /= e, this.z /= i, this
    },
    clone: function() {
        return new $i_5(this.x, this.y, this.z)
    },
    interpolate: function(t, e, i, n) {
        var s = t.x - this.x,
            o = t.y - this.y,
            r = t.z - this.z,
            a = n - e,
            h = a - (i - e),
            d = h / a;
        return new $i_5(t.x - s * d, t.y - o * d, t.z - r * d)
    },
    rotate: function(t) {
        var e = Math.sin(t),
            i = Math.cos(t),
            n = i * this.x - e * this.y,
            s = e * this.x - i * this.y;
        return new $i_5(n, s, this.z)
    },
    thisRotate: function(t) {
        var e = Math.sin(t),
            i = Math.cos(t),
            n = this.x,
            s = this.y;
        return this.x = i * n - e * s, this.y = e * n - i * s, this
    },
    toString: function(t) {
        return t === void 0 && (t = 2), this.x == void 0 || this.y == void 0 || this.z == void 0 ? "0,0,0" : parseFloat(this.x).toFixed(t) + "," + parseFloat(this.y).toFixed(t) + "," + parseFloat(this.z).toFixed(t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_5);
var $i_6 = $i_2.extend({
    classId: "$i_6",
    init: function() {
        this._poly = [], this._scale = new $i_4(1, 1)
    },
    scale: function(t, e) {
        return t !== void 0 && e !== void 0 ? (this._scale.x = t, this._scale.y = e, this) : this._scale
    },
    multiply: function(t) {
        if (t !== void 0) {
            var e, i = this._poly,
                n = i.length;
            for (e = 0; n > e; e++) i[e].x *= t, i[e].y *= t
        }
        return this
    },
    divide: function(t) {
        if (t !== void 0) {
            var e, i = this._poly,
                n = i.length;
            for (e = 0; n > e; e++) i[e].x /= t, i[e].y /= t
        }
        return this
    },
    addPoint: function(t, e) {
        return this._poly.push(new $i_4(t, e)), this
    },
    length: function() {
        return this._poly.length
    },
    pointInPoly: function(t) {
        var e, i = this._poly,
            n = i.length,
            s = n - 1,
            o = 0;
        for (e = 0; n > e; s = e++) i[e].y > t.y != i[s].y > t.y && (i[s].x - i[e].x) * (t.y - i[e].y) / (i[s].y - i[e].y) + i[e].x > t.x && (o = !o);
        return Boolean(o)
    },
    xyInside: function(t, e) {
        var i, n = this._poly,
            s = n.length,
            o = s - 1,
            r = 0;
        for (i = 0; s > i; o = i++) n[i].y > e != n[o].y > e && (n[o].x - n[i].x) * (e - n[i].y) / (n[o].y - n[i].y) + n[i].x > t && (r = !r);
        return Boolean(r)
    },
    aabb: function() {
        var t, e, i, n, s, o = [],
            r = [],
            a = this._poly,
            h = a.length;
        for (s = 0; h > s; s++) o.push(a[s].x), r.push(a[s].y);
        return t = Math.min.apply(Math, o), e = Math.min.apply(Math, r), i = Math.max.apply(Math, o), n = Math.max.apply(Math, r), new $i_7(t, e, i - t, n - e)
    },
    clone: function() {
        var t, e = new $i_6,
            i = this._poly,
            n = i.length;
        for (t = 0; n > t; t++) e.addPoint(i[t].x, i[t].y);
        return e.scale(this._scale.x, this._scale.y), e
    },
    clockWiseTriangle: function() {
        var t, e, i, n, s = this._poly;
        return e = s[0], i = s[1], n = s[2], t = e.x * i.y + i.x * n.y + n.x * e.y - i.y * n.x - n.y * e.x - e.y * i.x, t > 0
    },
    makeClockWiseTriangle: function() {
        if (!this.clockWiseTriangle()) {
            var t = (this._poly[0], this._poly[1]),
                e = this._poly[2];
            this._poly[2] = t, this._poly[1] = e
        }
    },
    triangulate: function() {
        var t, e, i, n, s, o = this._poly,
            r = [],
            a = this.triangulationIndices();
        for (t = 0; a.length > t; t += 3) e = o[a[t]], i = o[a[t + 1]], n = o[a[t + 2]], s = new $i_6, s.addPoint(e.x, e.y), s.addPoint(i.x, i.y), s.addPoint(n.x, n.y), s.makeClockWiseTriangle(), r.push(s);
        return r
    },
    triangulationIndices: function() {
        var t, e, i, n, s, o, r, a, h, d, l = [],
            u = this._poly.length,
            c = [],
            _ = [];
        if (3 > u) return l;
        if (this._area() > 0)
            for (c = 0; u > c; c++) _[c] = c;
        else
            for (c = 0; u > c; c++) _[c] = u - 1 - c;
        for (t = u, e = 2 * t, i = 0, c = t - 1; t > 2;) {
            if (0 >= e--) return l;
            if (n = c, t > n || (n = 0), c = n + 1, t > c || (c = 0), s = c + 1, t > s || (s = 0), this._snip(n, c, s, t, _)) {
                for (o = _[n], r = _[c], a = _[s], l.push(o), l.push(r), l.push(a), i++, h = c, d = c + 1; t > d; d++) _[h] = _[d], h++;
                t--, e = 2 * t
            }
        }
        return l.reverse(), l
    },
    _area: function() {
        var t, e, i, n = this._poly.length,
            s = 0,
            o = 0;
        for (t = n - 1; n > o; t = o++) e = this._poly[t], i = this._poly[o], s += e.x * i.y - i.x * e.y;
        return s * .5
    },
    _snip: function(t, e, i, n, s) {
        var o, r, a = this._poly[s[t]],
            h = this._poly[s[e]],
            d = this._poly[s[i]];
        if (1e-5 > (h.x - a.x) * (d.y - a.y) - (h.y - a.y) * (d.x - a.x)) return !1;
        for (o = 0; n > o; o++)
            if (o != t && o != e && o != i && (r = this._poly[s[o]], this._insideTriangle(a, h, d, r))) return !1;
        return !0
    },
    _insideTriangle: function(t, e, i, n) {
        var s, o, r, a, h, d, l, u, c, _, g, p, m, f, y;
        return s = i.x - e.x, o = i.y - e.y, r = t.x - i.x, a = t.y - i.y, h = e.x - t.x, d = e.y - t.y, l = n.x - t.x, u = n.y - t.y, c = n.x - e.x, _ = n.y - e.y, g = n.x - i.x, p = n.y - i.y, y = s * _ - o * c, m = h * u - d * l, f = r * p - a * g, y >= 0 && f >= 0 && m >= 0
    },
    render: function(t, e) {
        var i, n = this._poly,
            s = n.length,
            o = this._scale.x,
            r = this._scale.y;
        for (t.beginPath(), t.moveTo(n[0].x * o, n[0].y * r), i = 1; s > i; i++) t.lineTo(n[i].x * o, n[i].y * r);
        return t.lineTo(n[0].x * o, n[0].y * r), e && t.fill(), t.stroke(), this
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_6);
var $i_7 = $i_2.extend({
    classId: "$i_7",
    init: function(t, e, i, n) {
        return this.x = t = t !== void 0 ? t : 0, this.y = e = e !== void 0 ? e : 0, this.width = i = i !== void 0 ? i : 0, this.height = n = n !== void 0 ? n : 0, this.x2 = this.x / 2, this.y2 = this.y / 2, this
    },
    combineRect: function(t) {
        var e = this.x + this.width,
            i = this.y + this.height,
            n = t.x + t.width,
            s = t.y + t.height,
            o = Math.min(this.x, t.x),
            r = Math.min(this.y, t.y),
            a = Math.max(e - this.x, n - this.x),
            h = Math.max(i - this.y, s - this.y);
        return new $i_7(o, r, a, h)
    },
    thisCombineRect: function(t) {
        var e = this.x + this.width,
            i = this.y + this.height,
            n = t.x + t.width,
            s = t.y + t.height;
        this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.width = Math.max(e - this.x, n - this.x), this.height = Math.max(i - this.y, s - this.y)
    },
    minusPoint: function(t) {
        return new $i_7(this.x - t.x, this.y - t.y, this.width, this.height)
    },
    compare: function(t) {
        return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height
    },
    xyInside: function(t, e) {
        return t >= this.x && e > this.y && this.x + this.width >= t && this.y + this.height >= e
    },
    pointInside: function(t) {
        return t.x >= this.x && t.y > this.y && this.x + this.width >= t.x && this.y + this.height >= t.y
    },
    rectIntersect: function(t) {
        return this.log('rectIntersect has been renamed to "intersects". Please update your code. rectIntersect will be removed in a later version of IGE.', "warning"), this.intersects(t)
    },
    intersects: function(t) {
        if (t) {
            var e = this.x,
                i = this.y,
                n = this.width,
                s = this.height,
                o = t.x,
                r = t.y,
                a = t.width,
                h = t.height,
                d = e + n,
                l = i + s,
                u = o + a,
                c = r + h;
            if (u > e && d > o && c > i && l > r) return !0
        }
        return !1
    },
    multiply: function(t, e, i, n) {
        return new $i_7(this.x * t, this.y * e, this.width * i, this.height * n)
    },
    thisMultiply: function(t, e, i, n) {
        return this.x *= t, this.y *= e, this.width *= i, this.height *= n, this
    },
    clone: function() {
        return new $i_7(this.x, this.y, this.width, this.height)
    },
    toString: function(t) {
        return t === void 0 && (t = 2), this.x.toFixed(t) + "," + this.y.toFixed(t) + "," + this.width.toFixed(t) + "," + this.height.toFixed(t)
    },
    render: function(t, e) {
        return t.rect(this.x, this.y, this.width, this.height), e && t.fill(), t.stroke(), this
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_7);
var $i_8 = function() {
    this.matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1], this._rotateOrigin = new $i_5(0, 0, 0), this._scaleOrigin = new $i_5(0, 0, 0)
};
$i_8.prototype = {
    matrix: null,
    transformCoord: function(t, e) {
        var i = t.x,
            n = t.y,
            s = this.matrix;
        return t.x = i * s[0] + n * s[1] + s[2], t.y = i * s[3] + n * s[4] + s[5], (isNaN(s[0]) || isNaN(s[1]) || isNaN(s[2]) || isNaN(s[3]) || isNaN(s[4]) || isNaN(s[5])) && e.log("The matrix operation produced a NaN value!", "error"), t
    },
    transformCoordInverse: function(t, e) {
        var i = t.x,
            n = t.y,
            s = this.matrix;
        return t.x = i * s[0] - n * s[1] + s[2], t.y = i * s[3] + n * s[4] - s[5], (isNaN(s[0]) || isNaN(s[1]) || isNaN(s[2]) || isNaN(s[3]) || isNaN(s[4]) || isNaN(s[5])) && e.log("The matrix operation produced a NaN value!", "error"), t
    },
    transform: function(t, e) {
        var i, n = t.length;
        for (i = 0; n > i; i++) this.transformCoord(t[i], e);
        return t
    },
    _newRotate: function(t) {
        var e = new $i_8;
        return e.rotateTo(t), e
    },
    rotateBy: function(t) {
        var e = new $i_8;
        return e.translateBy(this._rotateOrigin.x, this._rotateOrigin.y), e.rotateTo(t), e.translateBy(-this._rotateOrigin.x, -this._rotateOrigin.y), this.multiply(e), this
    },
    rotateTo: function(t) {
        var e = this.matrix,
            i = Math.cos(t),
            n = Math.sin(t);
        return e[0] = i, e[1] = -n, e[3] = n, e[4] = i, (isNaN(e[0]) || isNaN(e[1]) || isNaN(e[2]) || isNaN(e[3]) || isNaN(e[4]) || isNaN(e[5])) && console.log("The matrix operation produced a NaN value!", "error"), this
    },
    rotationRadians: function() {
        return Math.asin(this.matrix[3])
    },
    rotationDegrees: function() {
        return Math.degrees(Math.acos(this.matrix[0]))
    },
    _newScale: function(t, e) {
        var i = new $i_8;
        return i.matrix[0] = t, i.matrix[4] = e, i
    },
    scaleBy: function(t, e) {
        var i = new $i_8;
        return i.matrix[0] = t, i.matrix[4] = e, this.multiply(i), this
    },
    scaleTo: function(t, e) {
        var i = this.matrix;
        return i[0] = t, i[4] = e, (isNaN(i[0]) || isNaN(i[1]) || isNaN(i[2]) || isNaN(i[3]) || isNaN(i[4]) || isNaN(i[5])) && this.log("The matrix operation produced a NaN value!", "error"), this
    },
    _newTranslate: function(t, e) {
        var i = new $i_8;
        return i.matrix[2] = t, i.matrix[5] = e, i
    },
    translateBy: function(t, e) {
        var i = new $i_8;
        return i.matrix[2] = t, i.matrix[5] = e, this.multiply(i), this
    },
    translateTo: function(t, e) {
        var i = this.matrix;
        return i[2] = t, i[5] = e, (isNaN(i[0]) || isNaN(i[1]) || isNaN(i[2]) || isNaN(i[3]) || isNaN(i[4]) || isNaN(i[5])) && this.log("The matrix operation produced a NaN value!", "error"), this
    },
    copy: function(t) {
        t = t.matrix;
        var e = this.matrix;
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], this
    },
    compare: function(t) {
        for (var e = this.matrix, i = t.matrix, n = 0; 9 > n; n++)
            if (e[n] !== i[n]) return !1;
        return !0
    },
    identity: function() {
        var t = this.matrix;
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, this
    },
    multiply: function(t) {
        var e = this.matrix,
            i = t.matrix,
            n = e[0],
            s = e[1],
            o = e[2],
            r = e[3],
            a = e[4],
            h = e[5],
            d = e[6],
            l = e[7],
            u = e[8],
            c = i[0],
            _ = i[1],
            g = i[2],
            p = i[3],
            m = i[4],
            f = i[5],
            y = i[6],
            v = i[7],
            x = i[8];
        return e[0] = n * c + s * p + o * y, e[1] = n * _ + s * m + o * v, e[2] = n * g + s * f + o * x, e[3] = r * c + a * p + h * y, e[4] = r * _ + a * m + h * v, e[5] = r * g + a * f + h * x, e[6] = d * c + l * p + u * y, e[7] = d * _ + l * m + u * v, e[8] = d * g + l * f + u * x, this
    },
    premultiply: function(t) {
        var e = t.matrix[0] * this.matrix[0] + t.matrix[1] * this.matrix[3] + t.matrix[2] * this.matrix[6],
            i = t.matrix[0] * this.matrix[1] + t.matrix[1] * this.matrix[4] + t.matrix[2] * this.matrix[7],
            n = t.matrix[0] * this.matrix[2] + t.matrix[1] * this.matrix[5] + t.matrix[2] * this.matrix[8],
            s = t.matrix[3] * this.matrix[0] + t.matrix[4] * this.matrix[3] + t.matrix[5] * this.matrix[6],
            o = t.matrix[3] * this.matrix[1] + t.matrix[4] * this.matrix[4] + t.matrix[5] * this.matrix[7],
            r = t.matrix[3] * this.matrix[2] + t.matrix[4] * this.matrix[5] + t.matrix[5] * this.matrix[8],
            a = t.matrix[6] * this.matrix[0] + t.matrix[7] * this.matrix[3] + t.matrix[8] * this.matrix[6],
            h = t.matrix[6] * this.matrix[1] + t.matrix[7] * this.matrix[4] + t.matrix[8] * this.matrix[7],
            d = t.matrix[6] * this.matrix[2] + t.matrix[7] * this.matrix[5] + t.matrix[8] * this.matrix[8];
        return this.matrix[0] = e, this.matrix[1] = i, this.matrix[2] = n, this.matrix[3] = s, this.matrix[4] = o, this.matrix[5] = r, this.matrix[6] = a, this.matrix[7] = h, this.matrix[8] = d, this
    },
    getInverse: function() {
        var t = this.matrix,
            e = t[0],
            i = t[1],
            n = t[2],
            s = t[3],
            o = t[4],
            r = t[5],
            a = t[6],
            h = t[7],
            d = t[8],
            l = new $i_8,
            u = e * (o * d - h * r) - s * (i * d - h * n) + a * (i * r - o * n);
        if (u === 0) return null;
        var c = l.matrix;
        return c[0] = o * d - r * h, c[1] = n * h - i * d, c[2] = i * r - n * o, c[3] = r * a - s * d, c[4] = e * d - n * a, c[5] = n * s - e * r, c[6] = s * h - o * a, c[7] = i * a - e * h, c[8] = e * o - i * s, l.multiplyScalar(1 / u), l
    },
    multiplyScalar: function(t) {
        var e;
        for (e = 0; 9 > e; e++) this.matrix[e] *= t;
        return this
    },
    transformRenderingContextSet: function(t) {
        var e = this.matrix;
        return t.setTransform(e[0], e[3], e[1], e[4], e[2], e[5]), this
    },
    transformRenderingContext: function(t) {
        var e = this.matrix;
        return t.transform(e[0], e[3], e[1], e[4], e[2], e[5]), this
    }
}, typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_8);
var $i_9 = $i_3.extend({
    classId: "$i_9",
    componentId: "time",
    init: function(t) {
        this._entity = t, this._timers = [], this._additions = [], this._removals = [], t.addBehaviour("time", this._update)
    },
    addTimer: function(t) {
        return t && (this._updating ? this._additions.push(t) : this._timers.push(t)), this
    },
    removeTimer: function(t) {
        return t && (this._updating ? this._removals.push(t) : this._timers.pull(t)), this
    },
    _update: function() {
        var t = ige.time,
            e = ige._tickDelta,
            i = t._timers,
            n = i.length;
        while (n--) i[n].addTime(e).update();
        return t._processRemovals(), t._processAdditions(), t
    },
    _processAdditions: function() {
        var t = this._additions,
            e = t.length;
        if (e) {
            while (e--) this._timers.push(t[e]);
            this._additions = []
        }
        return this
    },
    _processRemovals: function() {
        var t = this._removals,
            e = t.length;
        if (e) {
            while (e--) this._timers.pull(t[e]);
            this._removals = []
        }
        return this
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_9);
var $i_11 = $i_2.extend({
    classId: "$i_11",
    componentId: "velocity",
    init: function(t) {
        this._entity = t, this._velocity = new $i_5(0, 0, 0), this._friction = new $i_5(1, 1, 1), t.addBehaviour("velocity", this._behaviour)
    },
    _behaviour: function(t) {
        this.velocity != void 0 && this.velocity.tick(t)
    },
    byAngleAndPower: function(t, e, i) {
        var n = this._velocity,
            s = Math.cos(t) * e,
            o = Math.sin(t) * e,
            r = 0;
        return i ? (n.x += s, n.y += o, n.z += r) : (n.x = s, n.y = o, n.z = r), this._entity
    },
    xyz: function(t, e, i, n) {
        var s = this._velocity;
        return n ? (s.x += t, s.y += e, s.z += i) : (s.x = t, s.y = e, s.z = i), this._entity
    },
    x: function(t, e) {
        var i = this._velocity;
        return e ? i.x += t : i.x = t, this._entity
    },
    y: function(t, e) {
        var i = this._velocity;
        return e ? i.y += t : i.y = t, this._entity
    },
    z: function(t, e) {
        var i = this._velocity;
        return e ? i.z += t : i.z = y, this._entity
    },
    vector3: function(t, e) {
        typeof t.scale != "number" && (t.scale = 1);
        var i = this._velocity,
            n = t.x,
            s = t.y,
            o = t.z;
        return e ? (i.x += n, i.y += s, i.z += o) : (i.x = n, i.y = s, i.z = o), this._entity
    },
    friction: function(t) {
        var e = 1 - t;
        return 0 > e && (e = 0), this._friction = new $i_5(e, e, e), this._entity
    },
    linearForce: function(t, e) {
        e /= 1e3;
        var i = t * Math.PI / 180,
            n = Math.cos(i) * e,
            s = Math.sin(i) * e,
            o = n * s;
        return this._linearForce = new $i_5(n, s, o), this._entity
    },
    linearForceXYZ: function(t, e, i) {
        return this._linearForce = new $i_5(t, e, i), this._entity
    },
    linearForceVector3: function(t, e, i) {
        var n = this._linearForce = this._linearForce || new $i_5(0, 0, 0),
            s = t.x / 1e3,
            o = t.y / 1e3,
            r = t.z / 1e3;
        return i ? (n.x += s || 0, n.y += o || 0, n.z += r || 0) : (n.x = s || 0, n.y = o || 0, n.z = r || 0), this._entity
    },
    _applyLinearForce: function(t) {
        if (this._linearForce) {
            var e = this._velocity;
            e.x += this._linearForce.x * t, e.y += this._linearForce.y * t, e.z += this._linearForce.z * t
        }
    },
    _applyFriction: function() {
        var t = this._velocity,
            e = this._friction;
        t.x *= e.x, t.y *= e.y, t.z *= e.z
    },
    tick: function() {
        var t, e, i, n = ige._tickDelta,
            s = this._velocity;
        n && (this._applyLinearForce(n), t = s.x * n, e = s.y * n, i = s.z * n, (t || e || i) && this._entity.translateBy(t, e, i))
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_11);
var $i_12 = $i_2.extend({
    classId: "$i_12",
    componentId: "tween",
    init: function(t) {
        this._entity = t, this._transform = t.transform, this._tweens = [], t.addBehaviour("tween", this.update)
    },
    start: function(t) {
        return t._startTime > ige._currentTime ? this._tweens.push(t) : (t._currentStep = 0, this._setupStep(t, !1) && this._tweens.push(t)), this.enable(), t
    },
    _setupStep: function(t, e) {
        var i, n, s, o = t._targetObj,
            r = t._steps[t._currentStep],
            a = [];
        if (r && (i = r.props), o) {
            t._currentStep !== 0 || e ? t._startTime = ige._currentTime : t._startTime === void 0 && (t._startTime = ige._currentTime), n = r.durationMs ? r.durationMs : t._durationMs, t._selectedEasing = r.easing ? r.easing : t._easing, t._endTime = t._startTime + n;
            for (s in i) i.hasOwnProperty(s) && a.push({
                targetObj: o,
                propName: s,
                deltaVal: i[s] - (r.isDelta ? 0 : o[s]),
                oldDelta: 0
            });
            return t._targetData = a, t._destTime = t._endTime - t._startTime, t
        }
        this.log('Cannot start tweening properties of the specified object "' + obj + '" because it does not exist!', "error")
    },
    stop: function(t) {
        return this._tweens.pull(t), this._tweens.length || this.disable(), this
    },
    stopAll: function() {
        return this.disable(), delete this._tweens, this._tweens = [], this
    },
    enable: function() {
        return this._tweening || (this._tweening = !0), this
    },
    disable: function() {
        return this._tweening && (this._tweening = !1), this
    },
    update: function() {
        var t = this.tween;
        if (t._tweens && t._tweens.length) {
            var e, i, n, s, o, r, a, h, d, l, u, c, _ = ige._tickStart,
                g = t._tweens,
                p = g.length;
            while (p--)
                if (e = g[p], u = !1, e._started || _ >= e._startTime)
                    if (e._started || (e._currentStep === -1 && (e._currentStep = 0, t._setupStep(e, !1)), typeof e._beforeTween == "function" && (e._beforeTween(e), delete e._beforeTween), typeof e._beforeStep == "function" && (l = e._stepDirection ? e._steps.length - (e._currentStep + 1) : e._currentStep, e._beforeStep(e, l)), e._started = !0), i = _ - e._startTime, n = e._destTime, s = e._selectedEasing, n > i) {
                        h = e._targetData;
                        for (d in h)
                            if (h.hasOwnProperty(d)) {
                                o = h[d];
                                var c = t.easing[s](i, o.deltaVal, n);
                                o.targetObj[o.propName] += c - o.oldDelta, o.oldDelta = c
                            }
                        typeof e._afterChange == "function" && e._afterChange(e, l)
                    } else {
                        h = e._targetData;
                        for (d in h)
                            if (h.hasOwnProperty(d)) {
                                o = h[d], r = o.targetObj, a = r[o.propName], c = n !== 0 ? t.easing[s](n, o.deltaVal, n) : o.deltaVal, a += c - o.oldDelta;
                                var m = Math.pow(10, 15 - (a.toFixed(0) + "").length);
                                r[o.propName] = Math.round(a * m) / m
                            }
                        typeof e._afterStep == "function" && (l = e._stepDirection ? e._steps.length - (e._currentStep + 1) : e._currentStep, e._afterStep(e, l)), e._steps.length === e._currentStep + 1 ? (e._repeatMode ? (e._repeatCount !== -1 && (e._repeatedCount++, e._repeatCount === e._repeatedCount && (u = !0)), u || (e._repeatMode === 1 && (e._currentStep = 0), e._repeatMode === 2 && (e._stepDirection = !e._stepDirection, e._steps.reverse(), e._currentStep = 1), typeof e._stepsComplete == "function" && e._stepsComplete(e, e._currentStep), typeof e._beforeStep == "function" && (l = e._stepDirection ? e._steps.length - (e._currentStep + 1) : e._currentStep, e._beforeStep(e, l)), t._setupStep(e, !0))) : u = !0, u && (e.stop(), typeof e._afterTween == "function" && (e._afterTween(e), delete e._afterTween))) : (e._currentStep++, typeof e._beforeStep == "function" && (l = e._stepDirection ? e._steps.length - (e._currentStep + 1) : e._currentStep, e._beforeStep(e, l)), t._setupStep(e, !0)), typeof e._afterChange == "function" && e._afterChange(e, l)
                    }
        }
    },
    easing: {
        none: function(t, e, i) {
            return e * t / i
        },
        inQuad: function(t, e, i) {
            return e * (t /= i) * t
        },
        outQuad: function(t, e, i) {
            return -e * (t /= i) * (t - 2)
        },
        inOutQuad: function(t, e, i) {
            return 1 > (t /= i / 2) ? e / 2 * t * t : -e / 2 * (--t * (t - 2) - 1)
        },
        inCubic: function(t, e, i) {
            return e * (t /= i) * t * t
        },
        outCubic: function(t, e, i) {
            return e * ((t = t / i - 1) * t * t + 1)
        },
        inOutCubic: function(t, e, i) {
            return 1 > (t /= i / 2) ? e / 2 * t * t * t : e / 2 * ((t -= 2) * t * t + 2)
        },
        outInCubic: function(t, e, i) {
            return i / 2 > t ? this.outCubic(t * 2, e / 2, i) : this.inCubic(t * 2 - i, e / 2, e / 2, i)
        },
        inQuart: function(t, e, i) {
            return e * (t /= i) * t * t * t
        },
        outQuart: function(t, e, i) {
            return -e * ((t = t / i - 1) * t * t * t - 1)
        },
        inOutQuart: function(t, e, i) {
            return 1 > (t /= i / 2) ? e / 2 * t * t * t * t : -e / 2 * ((t -= 2) * t * t * t - 2)
        },
        outInQuart: function(t, e, i) {
            return i / 2 > t ? this.outQuart(t * 2, e / 2, i) : this.inQuart(t * 2 - i, e / 2, e / 2, i)
        },
        inQuint: function(t, e, i) {
            return e * (t /= i) * t * t * t * t
        },
        outQuint: function(t, e, i) {
            return e * ((t = t / i - 1) * t * t * t * t + 1)
        },
        inOutQuint: function(t, e, i) {
            return 1 > (t /= i / 2) ? e / 2 * t * t * t * t * t : e / 2 * ((t -= 2) * t * t * t * t + 2)
        },
        outInQuint: function(t, e, i) {
            return i / 2 > t ? this.outQuint(t * 2, e / 2, i) : this.inQuint(t * 2 - i, e / 2, e / 2, i)
        },
        inSine: function(t, e, i) {
            return -e * Math.cos(t / i * (Math.PI / 2)) + e
        },
        outSine: function(t, e, i) {
            return e * Math.sin(t / i * (Math.PI / 2))
        },
        inOutSine: function(t, e, i) {
            return -e / 2 * (Math.cos(Math.PI * t / i) - 1)
        },
        outInSine: function(t, e, i) {
            return i / 2 > t ? this.outSine(t * 2, e / 2, i) : this.inSine(t * 2 - i, e / 2, e / 2, i)
        },
        inExpo: function(t, e, i) {
            return t === 0 ? 0 : e * Math.pow(2, 10 * (t / i - 1)) - e * .001
        },
        outExpo: function(t, e, i) {
            return t === i ? e : e * 1.001 * (-Math.pow(2, -10 * t / i) + 1)
        },
        inOutExpo: function(t, e, i) {
            return t === 0 ? 0 : t === i ? e : 1 > (t /= i / 2) ? e / 2 * Math.pow(2, 10 * (t - 1)) - e * 5e-4 : e / 2 * 1.0005 * (-Math.pow(2, -10 * --t) + 2)
        },
        outInExpo: function(t, e, i) {
            return i / 2 > t ? this.outExpo(t * 2, e / 2, i) : this.inExpo(t * 2 - i, e / 2, e / 2, i)
        },
        inCirc: function(t, e, i) {
            return -e * (Math.sqrt(1 - (t /= i) * t) - 1)
        },
        outCirc: function(t, e, i) {
            return e * Math.sqrt(1 - (t = t / i - 1) * t)
        },
        inOutCirc: function(t, e, i) {
            return 1 > (t /= i / 2) ? -e / 2 * (Math.sqrt(1 - t * t) - 1) : e / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        },
        outInCirc: function(t, e, i) {
            return i / 2 > t ? this.outCirc(t * 2, e / 2, i) : this.inCirc(t * 2 - i, e / 2, e / 2, i)
        },
        inElastic: function(t, e, i, n, s) {
            var o;
            return t === 0 ? 0 : (t /= i) === 1 ? e : (s || (s = i * .3), !n || Math.abs(e) > n ? (n = e, o = s / 4) : o = s / (2 * Math.PI) * Math.asin(e / n), -(n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * 2 * Math.PI / s)))
        },
        outElastic: function(t, e, i, n, s) {
            var o;
            return t === 0 ? 0 : (t /= i) === 1 ? e : (s || (s = i * .3), !n || Math.abs(e) > n ? (n = e, o = s / 4) : o = s / (2 * Math.PI) * Math.asin(e / n), n * Math.pow(2, -10 * t) * Math.sin((t * i - o) * 2 * Math.PI / s) + e)
        },
        inOutElastic: function(t, e, i, n, s) {
            var o;
            return t === 0 ? 0 : (t /= i / 2) === 2 ? e : (s || (s = i * .3 * 1.5), !n || Math.abs(e) > n ? (n = e, o = s / 4) : o = s / (2 * Math.PI) * Math.asin(e / n), 1 > t ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - o) * 2 * Math.PI / s) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - o) * 2 * Math.PI / s) * .5 + e)
        },
        outInElastic: function(t, e, i, n, s) {
            return i / 2 > t ? this.outElastic(t * 2, e / 2, i, n, s) : this.inElastic(t * 2 - i, e / 2, e / 2, i, n, s)
        },
        inBack: function(t, e, i, n) {
            return n === void 0 && (n = 1.70158), e * (t /= i) * t * ((n + 1) * t - n)
        },
        outBack: function(t, e, i, n) {
            return n === void 0 && (n = 1.70158), e * ((t = t / i - 1) * t * ((n + 1) * t + n) + 1)
        },
        inOutBack: function(t, e, i, n) {
            return n === void 0 && (n = 1.70158), 1 > (t /= i / 2) ? e / 2 * t * t * (((n *= 1.525) + 1) * t - n) : e / 2 * ((t -= 2) * t * (((n *= 1.525) + 1) * t + n) + 2)
        },
        outInBack: function(t, e, i, n) {
            return i / 2 > t ? this.outBack(t * 2, e / 2, i, n) : this.inBack(t * 2 - i, e / 2, e / 2, i, n)
        },
        inBounce: function(t, e, i) {
            return e - this.outBounce(i - t, 0, e, i)
        },
        outBounce: function(t, e, i) {
            return 1 / 2.75 > (t /= i) ? e * 7.5625 * t * t : 2 / 2.75 > t ? e * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? e * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : e * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        },
        inOutBounce: function(t, e, i) {
            return i / 2 > t ? this.inBounce(t * 2, 0, e, i) * .5 : this.outBounce(t * 2 - i, 0, e, i) * .5 + e * .5
        },
        outInBounce: function(t, e, i) {
            return i / 2 > t ? this.outBounce(t * 2, e / 2, i) : this.inBounce(t * 2 - i, e / 2, e / 2, i)
        }
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_12);
var $i_14 = $i_3.extend({
    classId: "$i_14",
    componentId: "input",
    init: function() {
        this._eventQueue = [], this._eventControl = {
            _cancelled: !1,
            stopPropagation: function() {
                this._cancelled = !0
            }
        }, this.tick(), this.mouse = {
            dblClick: -302,
            down: -301,
            up: -300,
            move: -259,
            wheel: -258,
            wheelUp: -257,
            wheelDown: -256,
            x: -255,
            y: -254,
            button1: -253,
            button2: -252,
            button3: -251
        }, this.pad1 = {
            button1: -250,
            button2: -249,
            button3: -248,
            button4: -247,
            button5: -246,
            button6: -245,
            button7: -244,
            button8: -243,
            button9: -242,
            button10: -241,
            button11: -240,
            button12: -239,
            button13: -238,
            button14: -237,
            button15: -236,
            button16: -235,
            button17: -234,
            button18: -233,
            button19: -232,
            button20: -231,
            stick1: -230,
            stick2: -229,
            stick1Up: -228,
            stick1Down: -227,
            stick1Left: -226,
            stick1Right: -225,
            stick2Up: -224,
            stick2Down: -223,
            stick2Left: -222,
            stick2Right: -221
        }, this.pad2 = {
            button1: -220,
            button2: -219,
            button3: -218,
            button4: -217,
            button5: -216,
            button6: -215,
            button7: -214,
            button8: -213,
            button9: -212,
            button10: -211,
            button11: -210,
            button12: -209,
            button13: -208,
            button14: -207,
            button15: -206,
            button16: -205,
            button17: -204,
            button18: -203,
            button19: -202,
            button20: -201,
            stick1: -200,
            stick2: -199,
            stick1Up: -198,
            stick1Down: -197,
            stick1Left: -196,
            stick1Right: -195,
            stick2Up: -194,
            stick2Down: -193,
            stick2Left: -192,
            stick2Right: -191
        }, this.key = {
            shift: -3,
            ctrl: -2,
            alt: -1,
            backspace: 8,
            tab: 9,
            enter: 13,
            escape: 27,
            space: 32,
            pageUp: 33,
            pageDown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            insert: 45,
            del: 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90
        }, this._controlMap = [], this._state = [], this._state[this.mouse.x] = 0, this._state[this.mouse.y] = 0
    },
    debug: function(t) {
        return t !== void 0 ? (this._debug = t, this) : this._debug
    },
    setupListeners: function(t) {
        this.log("Setting up input event listeners..."), this._canvas = t;
        var e = this;
        this._evRef = {
            mousedown: function(t) {
                t.igeType = "mouse", e._rationalise(t), e._mouseDown(t)
            },
            mouseup: function(t) {
                t.igeType = "mouse", e._rationalise(t), e._mouseUp(t)
            },
            mousemove: function(t) {
                t.igeType = "mouse", e._rationalise(t), e._mouseMove(t)
            },
            mousewheel: function(t) {
                t.igeType = "mouse", e._rationalise(t), e._mouseWheel(t)
            },
            touchmove: function(t) {
                t.igeType = "touch", e._rationalise(t, !0), e._mouseMove(t)
            },
            touchstart: function(t) {
                t.igeType = "touch", e._rationalise(t, !0), e._mouseDown(t)
            },
            touchend: function(t) {
                t.igeType = "touch", e._rationalise(t, !0), e._mouseUp(t)
            },
            contextmenu: function(t) {
                t.preventDefault(), t.igeType = "mouse", e._rationalise(t), e._contextMenu(t)
            },
            keydown: function(t) {
                t.igeType = "key", e._rationalise(t), e._keyDown(t)
            },
            keyup: function(t) {
                t.igeType = "key", e._rationalise(t), e._keyUp(t)
            }
        }, t.addEventListener("mousedown", this._evRef.mousedown, !1), t.addEventListener("mouseup", this._evRef.mouseup, !1), t.addEventListener("mousemove", this._evRef.mousemove, !1), t.addEventListener("mousewheel", this._evRef.mousewheel, !1), t.addEventListener("touchmove", this._evRef.touchmove, !1), t.addEventListener("touchstart", this._evRef.touchstart, !1), t.addEventListener("touchend", this._evRef.touchend, !1), t.addEventListener("contextmenu", this._evRef.contextmenu, !1), window.addEventListener("keydown", this._evRef.keydown, !1), window.addEventListener("keyup", this._evRef.keyup, !1)
    },
    destroyListeners: function() {
        this.log("Removing input event listeners...");
        var t = this._canvas;
        t.removeEventListener("mousedown", this._evRef.mousedown, !1), t.removeEventListener("mouseup", this._evRef.mouseup, !1), t.removeEventListener("mousemove", this._evRef.mousemove, !1), t.removeEventListener("mousewheel", this._evRef.mousewheel, !1), t.removeEventListener("touchmove", this._evRef.touchmove, !1), t.removeEventListener("touchstart", this._evRef.touchstart, !1), t.removeEventListener("touchend", this._evRef.touchend, !1), t.removeEventListener("contextmenu", this._evRef.contextmenu, !1), window.removeEventListener("keydown", this._evRef.keydown, !1), window.removeEventListener("keyup", this._evRef.keyup, !1)
    },
    fireManualEvent: function(t, e) {
        t && e ? this._evRef[t] ? this._evRef[t](e) : this.log('Cannot fire manual event "' + t + '" because no listener exists in the engine for this event type!', "warning") : this.log("Cannot fire manual event because both eventName and eventObj params are required.", "warning")
    },
    _rationalise: function(t, e) {
        if (t.igeType === "key" && t.keyCode === 8) {
            var i = t.srcElement || t.target;
            i.tagName.toLowerCase() === "body" && t.preventDefault()
        }
        t.igeType === "touch" && t.preventDefault(), e ? (t.button = 0, t.changedTouches && t.changedTouches.length && (t.igePageX = t.changedTouches[0].pageX, t.igePageY = t.changedTouches[0].pageY)) : (t.igePageX = t.pageX, t.igePageY = t.pageY), t.igeX = t.igePageX - ige._canvasPosition().left, t.igeY = t.igePageY - ige._canvasPosition().top, this.emit("inputEvent", t)
    },
    _mouseDown: function(t) {
        this._debug && console.log("Mouse Down", t), this._updateMouseData(t);
        var e = t.igeX - ige._bounds2d.x2,
            i = t.igeY - ige._bounds2d.y2,
            n = this;
        t.button === 0 && (this._state[this.mouse.button1] = !0), t.button === 1 && (this._state[this.mouse.button2] = !0), t.button === 2 && (this._state[this.mouse.button3] = !0), this.mouseDown = t, n.emit("preMouseDown", [t, e, i, t.button + 1]) || this.queueEvent(this, function() {
            n.emit("mouseDown", [t, e, i, t.button + 1])
        })
    },
    _mouseUp: function(t) {
        this._debug && console.log("Mouse Up", t), this._updateMouseData(t);
        var e = t.igeX - ige._bounds2d.x2,
            i = t.igeY - ige._bounds2d.y2,
            n = this;
        t.button === 0 && (this._state[this.mouse.button1] = !1), t.button === 1 && (this._state[this.mouse.button2] = !1), t.button === 2 && (this._state[this.mouse.button3] = !1), this.mouseUp = t, n.emit("preMouseUp", [t, e, i, t.button + 1]) || this.queueEvent(this, function() {
            n.emit("mouseUp", [t, e, i, t.button + 1])
        })
    },
    _contextMenu: function(t) {
        this._debug && console.log("Context Menu", t), this._updateMouseData(t);
        var e = t.igeX - ige._bounds2d.x2,
            i = t.igeY - ige._bounds2d.y2,
            n = this;
        t.button === 0 && (this._state[this.mouse.button1] = !1), t.button === 1 && (this._state[this.mouse.button2] = !1), t.button === 2 && (this._state[this.mouse.button3] = !1), this.contextMenu = t, n.emit("preContextMenu", [t, e, i, t.button + 1]) || this.queueEvent(this, function() {
            n.emit("contextMenu", [t, e, i, t.button + 1])
        })
    },
    _mouseMove: function(t) {
        ige._mouseOverVp = this._updateMouseData(t);
        var e = t.igeX - ige._bounds2d.x2,
            i = t.igeY - ige._bounds2d.y2,
            n = this;
        this._state[this.mouse.x] = e, this._state[this.mouse.y] = i, this.mouseMove = t, n.emit("preMouseMove", [t, e, i, t.button + 1]) || this.queueEvent(this, function() {
            n.emit("mouseMove", [t, e, i, t.button + 1])
        })
    },
    _mouseWheel: function(t) {
        this._updateMouseData(t);
        var e = t.igeX - ige._bounds2d.x2,
            i = t.igeY - ige._bounds2d.y2,
            n = this;
        this._state[this.mouse.wheel] = t.wheelDelta, t.wheelDelta > 0 ? this._state[this.mouse.wheelUp] = !0 : this._state[this.mouse.wheelDown] = !0, this.mouseWheel = t, n.emit("preMouseWheel", [t, e, i, t.button + 1]) || this.queueEvent(this, function() {
            n.emit("mouseWheel", [t, e, i, t.button + 1])
        })
    },
    _keyDown: function(t) {
        var e = this;
        this._state[t.keyCode] = !0, this._debug && console.log("Key Down", t), e.emit("preKeyDown", [t, t.keyCode]) || this.queueEvent(this, function() {
            e.emit("keyDown", [t, t.keyCode])
        })
    },
    _keyUp: function(t) {
        var e = this;
        this._state[t.keyCode] = !1, this._debug && console.log("Key Up", t), e.emit("preKeyUp", [t, t.keyCode]) || this.queueEvent(this, function() {
            e.emit("keyUp", [t, t.keyCode])
        })
    },
    _updateMouseData: function(t) {
        var e, i, n = ige._children,
            s = n.length,
            o = t.igeX - ige._bounds2d.x2 - ige._translate.x,
            r = t.igeY - ige._bounds2d.y2 - ige._translate.y;
        ige._mousePos.x = o, ige._mousePos.y = r;
        while (s--)
            if (e = n[n.length - (s + 1)], o > e._translate.x - e._bounds2d.x / 2 && e._translate.x + e._bounds2d.x / 2 > o && r > e._translate.y - e._bounds2d.y / 2 && e._translate.y + e._bounds2d.y / 2 > r) {
                e._mousePos = new $i_5(Math.floor((o - e._translate.x) / e.camera._scale.x + e.camera._translate.x), Math.floor((r - e._translate.y) / e.camera._scale.y + e.camera._translate.y), 0), i = e, t.igeViewport = e;
                break
            }
        return i
    },
    mapAction: function(t, e) {
        this._controlMap[t] = e
    },
    actionVal: function(t) {
        return this._state[this._controlMap[t]]
    },
    actionState: function(t) {
        var e = this._state[this._controlMap[t]];
        return !!e
    },
    val: function(t) {
        return this._state[t]
    },
    state: function(t) {
        return !!this._state[t]
    },
    stopPropagation: function() {
        return this._eventControl._cancelled = !0, this
    },
    queueEvent: function(t, e, i) {
        return e !== void 0 && this._eventQueue.push([t, e, i]), this
    },
    tick: function() {
        var t = this._eventQueue,
            e = t.length,
            i = this._eventControl;
        while (e--)
            if (t[e][1].apply(t[e][0], [i, t[e][2]]), i._cancelled) break;
        this._eventQueue = [], this._eventControl._cancelled = !1, this.dblClick = !1, this.mouseMove = !1, this.mouseDown = !1, this.mouseUp = !1, this.mouseWheel = !1
    },
    emit: function(t, e) {
        if (this._eventListeners && this._eventListeners[t]) {
            var i, n, s, o, r, a, h = this._eventListeners[t].length,
                d = this._eventListeners[t].length - 1,
                l = this._eventControl;
            if (h) {
                if (i = [], typeof e == "object" && e !== null && e[0] !== null)
                    for (n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
                else i = [e];
                s = !1, this._eventListeners._processing = !0;
                while (h--) {
                    if (l._cancelled) break;
                    o = d - h, r = this._eventListeners[t][o], r.sendEventName && (i = [t]), a = r.call.apply(r.context || this, i), (a === !0 || l._cancelled === !0) && (s = !0), r.oneShot && this.off(t, r)
                }
                if (this._eventListeners._processing = !1, this._processRemovals(), s) return 1
            }
        }
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_14);
var $i_18 = $i_2.extend({
    classId: "$i_18",
    componentId: "tiled",
    init: function(t, e) {
        this._entity = t, this._options = e
    },
    loadJson: function(t, e) {
        var i, n = this;
        typeof t == "string" ? ige.isClient ? (i = document.createElement("script"), i.src = t, i.onload = function() {
            n.log("Tiled data loaded, processing..."), n._processData(tiled, e)
        }, document.getElementsByTagName("head")[0].appendChild(i)) : this.log("URL-based Tiled data is only available client-side. If you want to load Tiled map data on the server please include the map file in your ServerConfig.js file and then specify the map's data object instead of the URL.", "error") : n._processData(t, e)
    },
    _processData: function(t, e) {
        var i, n, s, o, r, a, h, d, l, u, c, _, g, p, m, f = ige.isServer === !0 ? $i_67 : $i_54Map,
            y = t.width,
            v = t.height,
            x = t.layers,
            b = x.length,
            w = [],
            C = {},
            I = t.tilesets,
            T = I.length,
            S = T,
            k = 0,
            M = [],
            P = [];
        if (u = function() {
                for (c = 0; b > c; c++) {
                    if (i = x[c], n = i.type, n === "tilelayer") {
                        if (s = i.data, w[c] = (new f).id(i.name).tileWidth(t.tilewidth).tileHeight(t.tilewidth).depth(c), w[c].type = n, t.orientation === "isometric" && w[c].isometricMounts(!0), C[i.name] = w[c], T = I.length, ige.isClient)
                            for (_ = 0; T > _; _++) w[c].addTexture(P[_]);
                        for (o = s.length, p = 0; v > p; p++)
                            for (g = 0; y > g; g++) m = g + p * y, s[m] > 0 && s[m] !== 2147483712 && (ige.isClient ? (a = M[s[m]], a && (h = s[m] - (a._tiledStartingId - 1), w[c].paintTile(g, p, w[c]._textureList.indexOf(a), h))) : w[c].occupyTile(g, p, 1, 1, s[m]))
                    }
                    n === "objectgroup" && (w[c] = i, C[i.name] = w[c])
                }
                e(w, C)
            }, ige.isClient) {
            d = function(t, e, i) {
                return function() {
                    var e, n;
                    new $i_55(i.image, this.width / i.tilewidth, this.height / i.tileheight).id(i.name).on("loaded", function() {
                        for (n = this.cellCount(), this._tiledStartingId = i.firstgid, e = 0; n > e; e++) M[this._tiledStartingId + e] = this;
                        t.push(this), k++, k === S && u()
                    })
                }
            };
            while (T--) l = new Image, r = I[T], l.onload = d(P, T, r), l.src = r.image
        } else u()
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_18);
var $i_19 = $i_2.extend({
        classId: "$i_19",
        componentId: "ui",
        init: function(t, e) {
            var i = this;
            this._entity = t, this._options = e, this._focus = null, this._caret = null, this._register = [], this._styles = {}, this._elementsByStyle = {}, ige.input.on("keyDown", function(t) {
                i._keyDown(t)
            })
        },
        style: function(t, e) {
            return t !== void 0 ? e !== void 0 ? (this._styles[t] = e, this) : this._styles[t] : this
        },
        registerElement: function(t) {
            this._register.push(t)
        },
        unRegisterElement: function(t) {
            this._register.pull(t), delete this._styles["#" + t._id], delete this._styles["#" + t._id + ":active"], delete this._styles["#" + t._id + ":focus"], delete this._styles["#" + t._id + ":hover"]
        },
        registerElementStyle: function(t) {
            t && t._styleClass && (this._elementsByStyle[t._styleClass] = this._elementsByStyle[t._styleClass] || [], this._elementsByStyle[t._styleClass].push(t))
        },
        unRegisterElementStyle: function(t) {
            t && t._styleClass && (this._elementsByStyle[t._styleClass] = this._elementsByStyle[t._styleClass] || [], this._elementsByStyle[t._styleClass].push(t))
        },
        canFocus: function(t) {
            return t._allowFocus
        },
        focus: function(t) {
            if (t !== void 0) {
                if (t === this._focus) return !0;
                var e = this._focus;
                if (!(e && e.emit("blur", t) || (e && (e._focused = !1, e.blur()), t.emit("focus", e)))) return this._focus = t, t._focused = !0, !0
            }
            return !1
        },
        blur: function(t) {
            return t === void 0 || t !== this._focus || t.emit("blur") ? !1 : (this._focus = null, t._focused = !1, t._updateStyle(), !0)
        },
        _keyUp: function(t) {
            this._focus && (this._focus.emit("keyUp", t), ige.input.stopPropagation())
        },
        _keyDown: function(t) {
            this._focus && (this._focus.emit("keyDown", t), ige.input.stopPropagation())
        }
    }),
    $i_22 = $i_3.extend({
        classId: "$i_22",
        componentId: "editor",
        init: function(t, e) {
            var i = this;
            this._entity = t, this._options = e, this._showStats = 0, this._templateCache = {}, this._cacheTemplates = !0, this.ui = {}, this._interceptMouse = !1, this._activateKeyHandle = ige.input.on("keyUp", function(t) {
                return t.keyIdentifier === "U+00BB" ? (i.toggle(), !0) : void 0
            }), this._activateKeyHandle = ige.input.on("keyUp", function(t) {
                return t.keyIdentifier === "U+00BD" ? (i.toggleStats(), !0) : void 0
            }), this._mouseUpHandle = ige.input.on("preMouseUp", function(t) {
                return i._enabled && i._interceptMouse ? (i.emit("mouseUp", t), !0) : void 0
            }), this._mouseDownHandle = ige.input.on("preMouseDown", function(t) {
                return i._enabled && i._interceptMouse ? (i.emit("mouseDown", t), !0) : void 0
            }), this._mouseMoveHandle = ige.input.on("preMouseMove", function(t) {
                return i._enabled && i._interceptMouse ? (i.emit("mouseMove", t), !0) : void 0
            }), this._contextMenuHandle = ige.input.on("preContextMenu", function(t) {
                return i._enabled && i._interceptMouse ? (i.emit("contextMenu", t), !0) : void 0
            }), ige.requireScript(igeRoot + "components/editor/vendor/jsRender.js"), ige.requireScript(igeRoot + "components/editor/vendor/jquery.2.0.3.min.js"), ige.on("allRequireScriptsLoaded", function() {
                $(function() {
                    $("body").on("dragover", function(t) {
                        t.preventDefault()
                    }).on("drop", function(t) {
                        t.preventDefault()
                    })
                }), i.loadHtml(igeRoot + "components/editor/root.html", function(t) {
                    $("body").append($(t)), ige.requireScript(igeRoot + "components/editor/vendor/jsrender-helpers.js"), ige.requireScript(igeRoot + "components/editor/vendor/observe.js"), ige.requireStylesheet(igeRoot + "components/editor/vendor/glyphicons/css/halflings.css"), ige.requireStylesheet(igeRoot + "components/editor/vendor/glyphicons/css/glyphicons.css"), ige.requireStylesheet(igeRoot + "components/editor/vendor/treeview_simple/css/style.css"), ige.requireStylesheet(igeRoot + "components/editor/css/editor.css"), ige.on("sgTreeSelectionChanged", function(t) {
                        i._objectSelected(ige.$(t))
                    }), ige.on("allRequireScriptsLoaded", function() {
                        ige.sync(ige.requireScript, igeRoot + "components/editor/ui/dialogs/dialogs.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/ui/scenegraph/scenegraph.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/ui/menu/menu.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/ui/toolbox/toolbox.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/ui/panels/panels.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/ui/textures/textures.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/ui/textureEditor/textureEditor.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/ui/animationEditor/animationEditor.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/vendor/autoback.jquery.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/vendor/tree/tree.jquery.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/vendor/tabs/tabs.jquery.js"), ige.sync(ige.requireScript, igeRoot + "components/editor/vendor/treeview_simple/treeview_simple.jquery.js"), ige.on("syncComplete", function() {
                            setInterval(function() {
                                $("#editorFps").html(ige._fps + " fps"), $("#editorDps").html(ige._dps + " dps"), $("#editorDpf").html(ige._dpf + " dpf"), $("#editorUd").html(ige._updateTime + " ud/ms"), $("#editorRd").html(ige._renderTime + " rd/ms"), $("#editorTd").html(ige._tickTime + " td/ms")
                            }, 1e3), $(".backed").autoback();
                            for (var t in i.ui) i.ui.hasOwnProperty(t) && i.ui[t].ready && i.ui[t].ready();
                            $(".tabGroup").tabs(), $("#statsToggle").on("click", function() {
                                ige.editor.toggleStats()
                            }), $("#editorToggle").on("click", function() {
                                ige.editor.toggle()
                            })
                        }, null, !0)
                    }, null, !0)
                })
            }, null, !0), this._enabled = !1, this._show = !1, this.objectDefault = {
                $i_54Map: {
                    drawGrid: 100
                }
            }, this.log("Init complete")
        },
        interceptMouse: function(t) {
            this._interceptMouse = t
        },
        enabled: function(t) {
            return t !== void 0 ? (this._enabled = t, this._entity) : this._enabled
        },
        toggle: function() {
            var t = $("#editorToggle");
            t.hasClass("active") ? ige.editor.hide() : ige.editor.show()
        },
        show: function() {
            this.enabled(!0), this._show = !0, $("#editorToggle").html("Editor On").removeClass("active").addClass("active"), $(".editorElem.toggleHide").addClass("shown")
        },
        hide: function() {
            this.enabled(!1), this._show = !1, $("#editorToggle").html("Editor Off").removeClass("active"), $(".editorElem.toggleHide").removeClass("shown")
        },
        toggleStats: function() {
            var t = $("#statsToggle");
            t.hasClass("active") ? ige.editor.hideStats() : ige.editor.showStats()
        },
        showStats: function() {
            $("#statsToggle").html("Stats On").removeClass("active").addClass("active"), $(".counter").show()
        },
        hideStats: function() {
            $("#statsToggle").html("Stats Off").removeClass("active"), $(".counter").hide()
        },
        loadHtml: function(t, e) {
            $.ajax({
                url: t,
                success: e,
                dataType: "html"
            })
        },
        template: function(t, e) {
            var i = this;
            this._cacheTemplates && this._templateCache[t] ? e && e(!1, this._templateCache[t]) : (this.log("Loading template data from: " + t), $.ajax(t, {
                async: !0,
                dataType: "text",
                complete: function(n, s) {
                    if (s === "success") {
                        var o = jsviews.templates(n.responseText);
                        i._cacheTemplates && (i._templateCache[t] = o), e && e(!1, o)
                    } else e && e(!0, s)
                }
            }))
        },
        renderTemplate: function(t, e, i) {
            this.template(t, function(t, n) {
                t ? i(t) : i(t, $($.parseHTML(n.render(e))))
            })
        },
        selectObject: function(t) {
            t !== void 0 && (t ? (this._selectedObject = ige.$(t), this._objectSelected(this._selectedObject)) : delete this._selectedObject)
        },
        _objectSelected: function(t) {
            if (t) {
                ige.editor.ui.panels.showPanelByInstance(t), this._selectedObjectClassList = ige.getClassDerivedList(t), $("[data-active-for]").removeClass("disabled").addClass("disabled");
                var e, i = this._selectedObjectClassList;
                for (e = 0; i.length > e; e++) $('[data-active-for~="' + i[e] + '"]').removeClass("disabled");
                this.emit("selectedObject", t.id())
            }
        },
        destroySelected: function() {
            this._selectedObject && (this._selectedObject.destroy(), this.selectObject(null))
        },
        createObject: function(t, e) {
            if (this._selectedObject) {
                var i = ige.newClassInstance(t);
                if (i.mount(this._selectedObject), this.ui.scenegraph.updateSceneGraph(), e && (this.selectObject(i.id()), this.ui.toolbox.select("toolSelect")), this.objectDefault[t])
                    for (var n in this.objectDefault[t]) this.objectDefault[t].hasOwnProperty(n) && (this.objectDefault[t][n] instanceof Array ? i[n].apply(i, this.objectDefault[t][n]) : i[n].call(i, this.objectDefault[t][n]))
            }
        },
        _statsTick: function() {
            var t = ige.editor;
            if (t._showStats && !t._statsPauseUpdate) switch (t._showStats) {
                case 1:
            }
        },
        addToSgTree: function(t) {
            var e, i, n, s, o, r, a = document.createElement("li");
            if (s = function(t) {
                    t.stopPropagation();
                    var e = document.getElementsByClassName("sgItem selected");
                    for (n = 0; e.length > n; n++) e[n].className = "sgItem";
                    this.className += " selected", ige._sgTreeSelected = this.id, ige._currentViewport.drawBounds(!0), this.id !== "ige" ? ige._currentViewport.drawBoundsLimitId(this.id) : ige._currentViewport.drawBoundsLimitId(""), ige.emit("sgTreeSelectionChanged", ige._sgTreeSelected)
                }, o = function(t) {
                    t.stopPropagation()
                }, a.addEventListener("mouseup", s, !1), a.addEventListener("dblclick", o, !1), a.id = t.id, a.innerHTML = t.text, a.className = "sgItem", ige._sgTreeSelected === t.id && (a.className += " selected"), igeConfig.debug._timing && ige._timeSpentInTick[t.id] && (r = "<span>" + ige._timeSpentInTick[t.id] + "ms</span>", a.innerHTML += " " + r), document.getElementById(t.parentId + "_items").appendChild(a), t.items)
                for (a = document.createElement("ul"), a.id = t.id + "_items", document.getElementById(t.id).appendChild(a), e = t.items, i = e.length, n = 0; i > n; n++) ige.addToSgTree(e[n])
        },
        toggleShowEditor: function() {
            if (this._showSgTree = !this._showSgTree, this._showSgTree) {
                var t, e, i = this,
                    n = document.createElement("div");
                e = ige._canvasPosition(), n.id = "igeSgTree", n.style.top = parseInt(e.top) + 5 + "px", n.style.left = parseInt(e.left) + 5 + "px", n.style.height = ige._bounds2d.y - 30 + "px", n.style.overflow = "auto", n.addEventListener("mousemove", function(t) {
                    t.stopPropagation()
                }), n.addEventListener("mouseup", function(t) {
                    t.stopPropagation()
                }), n.addEventListener("mousedown", function(t) {
                    t.stopPropagation()
                }), t = document.createElement("ul"), t.id = "sceneGraph_items", n.appendChild(t), document.body.appendChild(n);
                var s = document.createElement("div"),
                    o = document.createElement("input"),
                    r = document.createElement("div"),
                    a = document.createElement("iframe");
                s.id = "igeSgConsoleHolder", s.innerHTML = "<div><b>Console</b>: Double-Click a SceneGraph Object to Script it Here</div>", o.type = "text", o.id = "igeSgConsole", r.id = "igeSgItemClassChain", a.id = "igeSgDocPage", a.name = "igeSgDocPage", s.appendChild(o), s.appendChild(r), s.appendChild(a), document.body.appendChild(s), this.sgTreeUpdate();
                var h = document.createElement("input");
                h.type = "button", h.id = "igeSgRefreshTree", h.style.position = "absolute", h.style.top = "0px", h.style.right = "0px", h.value = "Refresh", h.addEventListener("click", function() {
                    i.sgTreeUpdate()
                }, !1), document.getElementById("igeSgTree").appendChild(h);
                var d = document.createElement("div"),
                    l = document.createElement("input"),
                    u = document.createElement("input"),
                    c = document.createElement("input"),
                    _ = document.createElement("span");
                d.id = "igeSgEditorRoot", _.id = "igeSgEditorStatus", l.type = "button", l.id = "igeSgEditorTranslate", l.value = "Translate", l.addEventListener("click", function() {
                    ige.editorRotate.enabled(!1), ige.editorTranslate.enabled() ? (ige.editorTranslate.enabled(!1), i.log("Editor: Translate mode disabled")) : (ige.editorTranslate.enabled(!0), i.log("Editor: Translate mode enabled"))
                }), u.type = "button", u.id = "igeSgEditorRotate", u.value = "Rotate", u.addEventListener("click", function() {
                    ige.editorTranslate.enabled(!1), ige.editorRotate.enabled() ? (ige.editorRotate.enabled(!1), i.log("Editor: Rotate mode disabled")) : (ige.editorRotate.enabled(!0), i.log("Editor: Rotate mode enabled"))
                }), c.type = "button", c.id = "igeSgEditorScale", c.value = "Scale", d.appendChild(l), d.appendChild(u), d.appendChild(c), d.appendChild(_), document.body.appendChild(d), ige.addComponent(IgeEditorTranslateComponent), ige.addComponent(IgeEditorRotateComponent), ige._sgTreeUpdateInterval = setInterval(function() {
                    i.sgTreeUpdate()
                }, 1e3)
            } else {
                clearInterval(ige._sgTreeUpdateInterval);
                var g = document.getElementById("igeSgTree");
                g.parentNode.removeChild(g), g = document.getElementById("igeSgConsoleHolder"), g.parentNode.removeChild(g), g = document.getElementById("igeSgEditorRoot"), g.parentNode.removeChild(g), ige.removeComponent("editorTranslate"), ige.removeComponent("editorRotate")
            }
        },
        sgTreeUpdate: function() {
            document.getElementById("sceneGraph_items").innerHTML = "", this.addToSgTree(this.getSceneGraphData(this, !0))
        }
    }),
    $i_26 = {
        timeSyncInterval: function(t) {
            return t !== void 0 ? (this._timeSyncInterval = t, this._entity) : this._timeSyncInterval
        },
        _sendTimeSync: function(t, e) {
            t || (t = ige._currentTime), this.send("_igeNetTimeSync", t, e)
        },
        timeToServerTime: function(t) {
            return t !== void 0 ? t + this._latency : this._latency
        },
        _onTimeSync: function(t) {
            var e, i = Math.floor(ige._currentTime);
            ige.isClient && (e = parseInt(t, 10), this._latency = i - e, this._sendTimeSync([t, i]))
        }
    };
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_26);
var $i_27 = $i_3.extend({
    classId: "$i_27",
    componentId: "stream",
    init: function(t, e) {
        this._entity = t, this._options = e;
        var i = this;
        this._sectionDesignator = "Â¬", ige.isClient && (this._entity.define("_igeStreamCreate", function() {
            i._onStreamCreate.apply(i, arguments)
        }), this._entity.define("_igeStreamDestroy", function() {
            i._onStreamDestroy.apply(i, arguments)
        }), this._entity.define("_igeStreamData", function() {
            i._onStreamData.apply(i, arguments)
        }), this._entity.define("_igeStreamTime", function() {
            i._onStreamTime.apply(i, arguments)
        }), this._entity.define("_alexBatch", function() {
            i._onAlexBatch.apply(i, arguments)
        })), this._renderLatency = 350, this._streamInterval = 150
    },
    renderLatency: function(t) {
        return t !== void 0 ? (this._renderLatency = t, this._entity) : this._renderLatency
    },
    _onStreamTime: function(t) {
        this._streamDataTime = t
    },
    _onStreamCreate: function(t) {
        var e, i, n = t[0],
            s = t[1],
            o = t[2],
            r = t[3],
            a = t[4],
            h = ige.$(o);
        h ? ige.$(s) || (e = igeClassStore[n], e ? (i = new e(a).id(s).mount(h), i.streamSectionData("transform", r, !0), i._streamJustCreated = !0, i._streamEmitCreated && i.emit("streamCreated"), this.emit("entityCreated", i)) : (ige.network.stop(), ige.stop(), this.log("Network stream cannot create entity with class " + n + " because the class has not been defined! The engine will now stop.", "error"))) : this.log("Cannot properly handle network streamed entity with id " + s + " because it's parent with id " + o + " does not exist on the scenegraph!", "warning")
    },
    _onStreamDestroy: function(t) {
        var e = ige.$(t[1]),
            i = this;
        if (e) {
            var n = ige.network.stream._renderLatency + (ige._currentTime - t[0]);
            n > 0 ? e.lifeSpan(n, function() {
                i.emit("entityDestroyed", e)
            }) : (i.emit("entityDestroyed", e), e.destroy())
        }
    },
    _onAlexBatch: function(t) {
        console.log("ALEX BATCH", t)
    },
    _onStreamData: function(t) {
        var e, i, n, s, o, r = t.split(ige.network.stream._sectionDesignator),
            a = r.length;
        if (e = r.shift(), i = ige.$(e)) {
            for (o = i._streamJustCreated, n = i._streamSections, s = 0; a > s; s++) i.streamSectionData(n[s], r[s], o);
            delete i._streamJustCreated
        } else this.log("+++ Stream: Data received for unknown entity (" + e + ")")
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_27);
var $i_32 = {};
$i_32._debug = {
    _enabled: !0,
    _node: typeof module != "undefined" && module.exports !== void 0,
    _level: ["log", "warning", "error"],
    _stacks: !1,
    _throwErrors: !0,
    _trace: {
        setup: !1,
        enabled: !1,
        match: ""
    },
    enabled: function(t) {
        return t !== void 0 ? (this._enabled = t, this) : this._enabled
    }
}, $i_32.Class = $i_2, $i_32.EventingClass = $i_3, $i_32.Client = $i_32.EventingClass.extend({
    classId: "$i_32.Client",
    init: function(t, e) {
        this.log("Net.io client starting..."), this._options = e || {}, this._socket = null, this._state = 0, this._debug = !1, this._connectionAttempts = 0, this._options.connectionRetry === void 0 && (this._options.connectionRetry = !0), this._options.connectionRetryMax === void 0 && (this._options.connectionRetryMax = 10), this._options.reconnect === void 0 && (this._options.reconnect = !0), t !== void 0 && this.connect(t)
    },
    debug: function(t) {
        return t !== void 0 ? (this._debug = t, this) : this._debug
    },
    connect: function(t) {
        this.log("Connecting to server at " + t);
        var e = this;
        this._state = 1, t = t.replace("http://", "ws://"), this._socket = new WebSocket(t, "netio1"), this._socket.onopen = function() {
            e._onOpen.apply(e, arguments)
        }, this._socket.onmessage = function() {
            e._onData.apply(e, arguments)
        }, this._socket.onclose = function() {
            e._onClose.apply(e, arguments)
        }, this._socket.onerror = function() {
            e._onError.apply(e, arguments)
        }
    },
    disconnect: function(t) {
        this._socket.close(1e3, t), this.emit("_igeStreamDestroy"), $("#disconnected-modal").modal("show"), console.log("disconnected")
    },
    send: function(t) {
        this._socket.readyState == 1 ? this._socket.send(this._encode(t)) : this.disconnect()
    },
    _onOpen: function() {
        this._state = 2
    },
    _onData: function(t) {
        var e = this._decode(t.data);
        if (this._debug && console.log("Incoming data (event, decoded data):", t, e), e._netioCmd) switch (e._netioCmd) {
            case "id":
                this.id = e.data, this._state = 3, this.emit("connect", this.id);
                break;
            case "close":
                this._disconnectReason = e.data
        } else this.emit("message", [e])
    },
    _onClose: function(t, e, i) {
        this._state === 3 && (this._state = 0, this.emit("disconnect", {
            reason: this._disconnectReason,
            wasClean: i,
            code: t
        })), this._state === 2 && (this._state = 0, this.emit("disconnect", {
            reason: this._disconnectReason,
            wasClean: i,
            code: t
        })), this._state === 1 && (this._state = 0, this.emit("error", {
            reason: "Cannot establish connection, is server running?"
        })), delete this._disconnectReason
    },
    _onError: function() {
        this.log("An error occurred with the net.io socket!", "error", arguments), this.emit("error", arguments)
    },
    _encode: function(t) {
        return JSON.stringify(t)
    },
    _decode: function(t) {
        return JSON.parse(t)
    }
});
var Ige$i_32Client = {
    version: "1.0.0",
    _initDone: !1,
    _idCounter: 0,
    _requests: {},
    _state: 0,
    id: function() {
        return this._id || ""
    },
    start: function(t, e) {
        if (this._state === 3) typeof e == "function" && e();
        else {
            var i = this;
            i._startCallback = e, t !== void 0 && (this._url = t), this.log('Connecting to net.io server at "' + this._url + '"...'), typeof WebSocket != "undefined" && (this._io = new $i_32.Client(t), i._state = 1, this._io.on("connect", function(t) {
                i._state = 2, i._id = t, i._onConnectToServer.apply(i, arguments)
            }), this._io.on("message", function(t) {
                if (i._initDone) i._onMessageFromServer.apply(i, arguments);
                else {
                    var e, n = 0;
                    if (t.cmd === "init") {
                        i._initDone = !0, i._state = 3, i._networkCommandsLookup = t.ncmds;
                        for (e in i._networkCommandsLookup) i._networkCommandsLookup.hasOwnProperty(e) && (i._networkCommandsIndex[i._networkCommandsLookup[e]] = e, n++);
                        i.define("_igeRequest", function() {
                            i._onRequest.apply(i, arguments)
                        }), i.define("_igeResponse", function() {
                            i._onResponse.apply(i, arguments)
                        }), i.define("_igeNetTimeSync", function() {
                            i._onTimeSync.apply(i, arguments)
                        }), i.log("Received network command list with count: " + n), ige.timeScale(parseFloat(t.ts)), ige._currentTime = parseInt(t.ct), typeof i._startCallback == "function" && (i._startCallback(), delete i._startCallback)
                    }
                }
            }), this._io.on("disconnect", function() {
                i._state = 0, i._onDisconnectFromServer.apply(i, arguments)
            }), this._io.on("error", function() {
                i._onError.apply(i, arguments)
            }))
        }
    },
    stop: function() {
        self._state === 3 && this._io.disconnect("Client requested disconnect")
    },
    define: function(t, e) {
        return t !== void 0 && e !== void 0 ? (this._networkCommandsLookup[t] !== void 0 ? this._networkCommands[t] = e : this.log('Cannot define network command "' + t + '" because it does not exist on the server. Please edit your server code and define the network command there before trying to define it on the client!', "error"), this._entity) : (this.log("Cannot define network command either the commandName or callback parameters were undefined!", "error"), void 0)
    },
    send: function(t, e) {
        var i, n = this._networkCommandsLookup[t];
        n !== void 0 ? (this.debug() && (console.log('Sending "' + t + '" (index ' + n + ") with data:", e), this._debugCounter++), i = String.fromCharCode(n), this._io.send([i, e])) : this.log('Cannot send network packet with command "' + t + '" because the command has not been defined!', "error")
    },
    request: function(t, e, i) {
        var n = {
            id: this.newIdHex(),
            cmd: t,
            data: e,
            callback: i,
            timestamp: (new Date).getTime()
        };
        this._requests[n.id] = n, this.send("_igeRequest", {
            id: n.id,
            cmd: t,
            data: n.data
        })
    },
    response: function(t, e) {
        var i = this._requests[t];
        i && (this.send("_igeResponse", {
            id: t,
            cmd: i.commandName,
            data: e
        }), delete this._requests[t])
    },
    newIdHex: function() {
        return this._idCounter++, (this._idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16)
    },
    _onRequest: function(t) {
        this._requests[t.id] = t, this.debug() && (console.log("onRequest", t), this._debugCounter++), this._networkCommands[t.cmd] && this._networkCommands[t.cmd](t.id, t.data), this.emit(t.cmd, [t.id, t.data])
    },
    _onResponse: function(t) {
        var e, i;
        e = t.id, i = this._requests[e], this.debug() && (console.log("onResponse", t), this._debugCounter++), i && (i.callback(i.cmd, t.data), delete this._requests[e])
    },
    _onConnectToServer: function() {
        this.log("Connected to server!"), this.emit("connected")
    },
    _onMessageFromServer: function(t) {
        var e = t[0].charCodeAt(0),
            i = this._networkCommandsIndex[e];
        if (i === "_alexBatch")
            for (var n = 0; t[1].length > n; n++) {
                var s = t[1][n],
                    e = s[0].charCodeAt(0),
                    i = this._networkCommandsIndex[e];
                this._networkCommands[i] && (this.debug() && (console.log('Received #BATCHED "' + i + '" (index ' + e + ") with data:", s[1]), this._debugCounter++), this._networkCommands[i](s[1])), this.emit(i, s[1])
            } else this._networkCommands[i] && (this.debug() && (console.log('Received "' + i + '" (index ' + e + ") with data:", t[1]), this._debugCounter++), this._networkCommands[i](t[1])), this.emit(i, t[1])
    },
    _onDisconnectFromServer: function(t) {
        t === "booted" ? this.log("Server rejected our connection because it is not accepting connections at this time!", "warning") : this.log("Disconnected from server!"), this.emit("disconnected")
    },
    _onError: function(t) {
        this.log("Error with connection: " + t.reason, "error")
    }
};
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Ige$i_32Client);
var Ige$i_32Server = {
    _idCounter: 0,
    _requests: {},
    snapshot: [],
    start: function(t, e) {
        var i = this;
        return this._socketById = {}, this._socketsByRoomId = {}, t !== void 0 && (this._port = t), this.log("Starting net.io listener on port " + this._port), this._io = new this._netio(this._port, e), this._io.on("connection", function() {
            i._onClientConnect.apply(i, arguments)
        }), this.define("_igeRequest", function() {
            i._onRequest.apply(i, arguments)
        }), this.define("_igeResponse", function() {
            i._onResponse.apply(i, arguments)
        }), this.define("_igeNetTimeSync", function() {
            i._onTimeSync.apply(i, arguments)
        }), this.define("_alexBatch", function() {
            i._alexBatch(i, arguments)
        }), this.timeSyncStart(), this._entity
    },
    define: function(t, e) {
        if (t !== void 0) {
            this._networkCommands[t] = e;
            var i = this._networkCommandsIndex.length;
            return this._networkCommandsIndex[i] = t, this._networkCommandsLookup[t] = i, this._entity
        }
        this.log("Cannot define a network command without a commandName parameter!", "error")
    },
    clientJoinRoom: function(t, e) {
        return t !== void 0 ? e !== void 0 ? (this._clientRooms[t] = this._clientRooms[t] || [], this._clientRooms[t].push(e), this._socketsByRoomId[e] = this._socketsByRoomId[e] || {}, this._socketsByRoomId[e][t] = this._socketById[t], this.debug() && this.log("Client " + t + " joined room " + e), this._entity) : (this.log("Cannot add client to room because no roomId was provided!", "warning"), this._entity) : (this.log("Cannot add client to room because no clientId was provided!", "warning"), this._entity)
    },
    clientLeaveRoom: function(t, e) {
        return t !== void 0 ? e !== void 0 ? (console.log("removing client " + t + " from a room " + e), this._clientRooms[t] && (this._clientRooms[t].pull(e), delete this._socketsByRoomId[e][t]), this._entity) : (this.log("Cannot remove client from room because no roomId was provided!", "warning"), this._entity) : (this.log("Cannot remove client from room because no clientId was provided!", "warning"), this._entity)
    },
    clientLeaveAllRooms: function(t) {
        if (t != void 0) {
            var e = this._clientRooms[t];
            if (e != void 0) {
                for (var i = e.length - 1; i >= 0; i--) console.log("client " + t + " is leaving the room " + e[i] + "(" + i + ")"), this.clientLeaveRoom(t, e[i]);
                return delete this._clientRooms[t], this._entity
            }
        } else this.log("Cannot remove client from room because no clientId was provided!", "warning");
        return this._entity
    },
    clientRooms: function(t) {
        return t !== void 0 ? this._clientRooms[t] || [] : (this.log("Cannot get/set the clientRoom id because no clientId was provided!", "warning"), [])
    },
    clients: function(t) {
        return t !== void 0 ? this._socketsByRoomId[t] : this._socketById
    },
    socket: function(t) {
        return this._socketById[t]
    },
    acceptConnections: function(t) {
        return t !== void 0 ? (this._acceptConnections = t, t ? this.log("Server now accepting connections!") : this.log("Server no longer accepting connections!"), this._entity) : this._acceptConnections
    },
    send: function(t, e, i) {
        var n, s = this._networkCommandsLookup[t];
        s !== void 0 ? (n = String.fromCharCode(s), this._io.send([n, e], i)) : this.log('Cannot send network packet with command "' + t + '" because the command has not been defined!', "error")
    },
    begin: function() {},
    add: function(t, e) {
        var i, n = this._networkCommandsLookup[t];
        n !== void 0 ? (i = String.fromCharCode(n), this.snapshot.push([i, e])) : this.log('Cannot send network packet with command "' + t + '" because the command has not been defined!', "error")
    },
    flush: function(t) {
        var e, i = this._networkCommandsLookup._alexBatch;
        i !== void 0 ? (e = String.fromCharCode(i), this._io.send([e, this.snapshot], t), this.snapshot = []) : this.log("_alexBatch error @ flush")
    },
    request: function(t, e, i) {
        var n = {
            id: this.newIdHex(),
            cmd: t,
            data: e,
            callback: i,
            timestamp: (new Date).getTime()
        };
        this._requests[n.id] = n, this.send("_igeRequest", {
            id: n.id,
            cmd: t,
            data: n.data
        })
    },
    response: function(t, e) {
        var i = this._requests[t];
        i && (this.send("_igeResponse", {
            id: t,
            cmd: i.commandName,
            data: e
        }, i.clientId), delete this._requests[t])
    },
    newIdHex: function() {
        return this._idCounter++, (this._idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16)
    },
    _originIsAllowed: function() {
        return !0
    },
    _onClientConnect: function(t) {
        var e = this,
            i = t._socket.remoteAddress,
            n = ige.server.bannedIps,
            s = !1;
        for (index in n) n[i] != void 0 && (console.log("banned player detected! IP " + i), s = !0);
        var o = !1;
        ige.server.maxPlayersAllowed > ige.server.playerUnits.length || (o = !0), !this._acceptConnections || s || o ? (this.log("Rejecting connection with id " + t.id + " - we are not accepting connections at the moment!"), t.close()) : this.emit("connect", t) ? t.close() : (this.log("Accepted connection with socket id " + t.id + " ip " + i), this._socketById[t.id] = t, this._clientRooms[t.id] = this._clientRooms[t.id] || [], t.on("message", function(i) {
            e._onClientMessage.apply(e, [i, t.id])
        }), t.on("disconnect", function(i) {
            e._onClientDisconnect.apply(e, [i, t])
        }), t.send({
            cmd: "init",
            ncmds: this._networkCommandsLookup,
            ts: ige._timeScale,
            ct: ige._currentTime
        }), this._sendTimeSync(void 0, t.id))
    },
    _onClientMessage: function(t, e) {
        if (t[0] != void 0 && t[0].charCodeAt(0) != void 0) {
            var i = t[0].charCodeAt(0),
                n = this._networkCommandsIndex[i];
            this._networkCommands[n] && this._networkCommands[n](t[1], e), this.emit(n, [t[1], e])
        }
    },
    _onRequest: function(t, e) {
        t.clientId = e, this._requests[t.id] = t, this.debug() && (console.log("onRequest", t), console.log("emitting", t.cmd, [t.id, t.data]), this._debugCounter++), this._networkCommands[t.cmd] && this._networkCommands[t.cmd](t.data, e, t.id), this.emit(t.cmd, [t.id, t.data, e])
    },
    _onResponse: function(t, e) {
        id = t.id, req = this._requests[id], this.debug() && (console.log("onResponse", t), this._debugCounter++), req && (req.callback(req.cmd, [t.data, e]), delete this._requests[id])
    },
    _onClientDisconnect: function(t, e) {
        this.log("Client disconnected with id " + e.id), this.emit("disconnect", e.id), this.clientLeaveAllRooms(e.id), delete this._socketById[e.id]
    }
};
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Ige$i_32Server);
var Ige$i_32Component = $i_3.extend([{
    extension: $i_26,
    overwrite: !1
}], {
    classId: "Ige$i_32Component",
    componentId: "network",
    init: function(t, e) {
        this._entity = t, this._options = e, this._networkCommands = {}, this._networkCommandsIndex = [], this._networkCommandsLookup = {}, this._port = 8e3, this._debug = !1, this._debugCounter = 0, this._debugMax = 0, this._clientRooms = {}, this._timeSyncInterval = 1e4, this._timeSyncLog = {}, this._latency = 0, ige.isClient && (this._netio = Ige$i_32Client, this.implement(Ige$i_32Client)), this.log("Network component initiated with Net.IO version: " + this._netio.version)
    },
    debug: function(t) {
        return t !== void 0 ? (this._debug = t, this._entity) : (this._debugMax > 0 && this._debugCounter >= this._debugMax && (this._debug = !1, this._debugCounter = 0), this._debug)
    },
    debugMax: function(t) {
        return t !== void 0 ? (this._debugMax = t, this._entity) : this._debugMax
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Ige$i_32Component);
var $i_36 = {
    joinRoom: function(t) {
        ige.network.send("igeChatJoinRoom", t)
    },
    sendToRoom: function(t, e, i) {
        t !== void 0 && e !== void 0 && (msg = {
            roomId: t,
            text: e,
            to: i
        }, ige.network.send("igeChatMsg", msg))
    },
    _onMessageFromServer: function(t) {
        var e = ige.chat;
        !e.emit("messageFromServer", [t])
    },
    _onJoinedRoom: function(t) {
        var e = ige.chat;
        e.emit("joinedRoom", [t]) || t.joined === !0
    },
    _onLeftRoom: function(t) {
        var e = ige.chat;
        e.emit("leftRoom", [t]) || console.log("We have left room:", t)
    },
    _onServerSentRoomList: function(t) {
        var e = ige.chat;
        e.emit("roomList", [t]) || console.log("Server sent room list:", t)
    },
    _onServerSentRoomUserList: function(t) {
        var e = ige.chat;
        e.emit("roomUserList", [t]) || console.log("Server sent room user list:", t)
    },
    _onRoomCreated: function(t) {
        var e = ige.chat;
        e.emit("roomCreated", [t]) || console.log("Server told us room was created:", t)
    },
    _onRoomRemoved: function(t) {
        var e = ige.chat;
        e.emit("roomRemoved", [t]) || console.log("Server told us room was removed:", t)
    }
};
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_36);
var $i_37 = {
    createRoom: function(t, e, i) {
        var n = ige.chat,
            s = i || ige.newIdHex();
        return n._rooms[i] = {
            id: s,
            name: t,
            options: e,
            users: []
        }, n._entity.network.send("igeChatRoomCreated", i), i
    },
    removeRoom: function(t) {
        var e = ige.chat;
        return e._rooms[t] ? (e._entity.network.send("igeChatRoomRemoved", t), delete e._rooms[t], !0) : !1
    },
    sendToRoom: function(t, e, i, n) {
        var s = ige.chat;
        if (!this.isSpamming(n, e))
            if (s._rooms[t]) {
                var o, r = s._rooms[t];
                e !== void 0 ? (o = {
                    roomId: t,
                    text: e,
                    from: n,
                    to: i
                }, i ? r.users.indexOf(i) > -1 ? s._entity.network.send("igeChatMsg", o, i) : s.log("Cannot send to user because specified user is not in room: " + i) : s._entity.network.send("igeChatMsg", o, r.users)) : s.log("Cannot send message to room with blank message!")
            } else s.log('Cannot send message to room with id "' + t + '" because it does not exist!')
    },
    isSpamming: function(t, e) {
        if (now = new Date, this.lastMessageSentAt[t] == void 0) return this.lastMessageSentAt[t] = now, this.sentMessages[t] = [], !1;
        if (now - this.lastMessageSentAt[t] > 1e3) {
            if (this.lastMessageSentAt[t] = now, this.sentMessages[t].push({
                    time: new Date,
                    message: e
                }), this.sentMessages[t].length > 2) {
                timeElapsed = 0, charCount = 0;
                for (i in this.sentMessages[t]) timeElapsed += now - this.sentMessages[t][i].time, charCount += this.sentMessages[t][i].message.length;
                if (charCount > 80 && 5e3 > timeElapsed) return console.log("Spam detected from the user" + t + " sending " + charCount + " characters in last " + timeElapsed / 1e3 + " seconds"), this.lastMessageSentAt[t] = new Date(now.getTime() + 6e4), !0;
                this.sentMessages[t].shift()
            }
            return !1
        }
        return !0
    },
    _onMessageFromClient: function(t, e) {
        var i, n = ige.chat,
            s = require("sanitizer");
        if (t.text = s.sanitize(t.text), t.text = s.escape(t.text), !n.emit("messageFromClient", [t, e]))
            if (console.log("Message from client: (" + e + ")", t), t.roomId)
                if (i = n._rooms[t.roomId])
                    if (i.users.indexOf(e) > -1) {
                        var o = t.text;
                        o ? (o = s.sanitize(o), n.sendToRoom(t.roomId, t.text, t.to, e)) : console.log("Cannot send message because message text is empty!", t)
                    } else console.log("User tried to send message to room they are not joined in!", t);
        else console.log("User tried to send message to room that doesn't exist!", t);
        else console.log("User tried to send message to room but didn't specify room id!", t)
    },
    _onJoinRoomRequestFromClient: function(t, e) {
        var i = ige.chat;
        if (!i.emit("clientJoinRoomRequest", [t, e])) {
            var n = i._rooms[t];
            i.log("Client wants to join room: (" + e + ")", t), n && (n.users[e] || (n.users.push(e), ige.network.send("igeChatJoinRoom", {
                roomId: t,
                joined: !0
            }, e), console.log('User "' + e + '" joined room ' + t)))
        }
    },
    _onLeaveRoomRequestFromClient: function(t, e) {
        self.emit("clientLeaveRoomRequest", [t, e]) || console.log("Client wants to leave room: (" + e + ")", t)
    },
    _onClientWantsRoomList: function(t, e) {
        self.emit("clientRoomListRequest", [t, e]) || console.log("Client wants the room list: (" + e + ")", t)
    },
    _onClientWantsRoomUserList: function(t, e) {
        self.emit("clientRoomUserListRequest", [t, e]) || console.log("Client wants the room user list: (" + e + ")", t)
    }
};
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_37);
var $i_38 = $i_3.extend({
    classId: "$i_38",
    componentId: "chat",
    init: function(t, e) {
        this._entity = t, this._options = e, this._rooms = {}, this.lastMessageSentAt = [], this.sentMessages = [], ige.isClient && (this.implement($i_36), this._entity.network.define("igeChatMsg", this._onMessageFromServer).network.define("igeChatJoinRoom", this._onJoinedRoom).network.define("igeChatLeaveRoom", this._onLeftRoom).network.define("igeChatRoomList", this._onServerSentRoomList).network.define("igeChatRoomUserList", this._onServerSentRoomUserList).network.define("igeChatRoomCreated", this._onRoomCreated).network.define("igeChatRoomRemoved", this._onRoomRemoved)), this.log("Chat component initiated!")
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_38);
var $i_43 = $i_3.extend({
        classId: "$i_43",
        componentId: "cocoonJs",
        init: function() {
            this.detected = typeof ext != "undefined" && ext.IDTK_APP !== void 0, this.detected && this.log("CocoonJS support enabled!")
        },
        showInputDialog: function(t, e, i, n, s, o) {
            this.detected ? (t = t || "", e = e || "", i = i || "", n = n || "text", s = s || "Cancel", o = o || "OK", ext.IDTK_APP.makeCall("showTextDialog", t, e, i, n, s, o)) : this.log("Cannot open CocoonJS input dialog! CocoonJS is not detected!", "error")
        },
        showWebView: function(t) {
            this.detected && (ext.IDTK_APP.makeCall("forward", "ext.IDTK_APP.makeCall('loadPath', '" + t + "')"), ext.IDTK_APP.makeCall("forward", "ext.IDTK_APP.makeCall('show');"))
        },
        hideWebView: function() {
            this.detected && ext.IDTK_APP.makeCall("forward", "ext.IDTK_APP.makeCall('hide');")
        }
    }),
    $i_44 = {
        left: function(t, e) {
            if (t !== void 0) {
                if (t === null) delete this._uiLeft, delete this._uiLeftPercent;
                else if (delete this._uiCenter, delete this._uiCenterPercent, typeof t == "string") {
                    this._uiLeftPercent = t;
                    var i, n, s = parseInt(t, 10);
                    i = this._parent ? this._parent._bounds2d.x : ige._bounds2d.x, n = i / 100 * s | 0, this._uiLeft = n
                } else this._uiLeft = t, delete this._uiLeftPercent;
                return e || this._updateUiPosition(), this
            }
            return this._uiLeft
        },
        right: function(t, e) {
            if (t !== void 0) {
                if (t === null) delete this._uiRight, delete this._uiRightPercent;
                else if (delete this._uiCenter, delete this._uiCenterPercent, typeof t == "string") {
                    this._uiRightPercent = t;
                    var i, n, s = parseInt(t, 10);
                    i = this._parent ? this._parent._bounds2d.x : ige._bounds2d.x, n = i / 100 * s | 0, this._uiRight = n
                } else this._uiRight = t, delete this._uiRightPercent;
                return e || this._updateUiPosition(), this
            }
            return this._uiRight
        },
        center: function(t, e) {
            if (t !== void 0) {
                if (t === null) delete this._uiCenter, delete this._uiCenterPercent;
                else if (delete this._uiLeft, delete this._uiLeftPercent, delete this._uiRight, delete this._uiRightPercent, typeof t == "string") {
                    this._uiCenterPercent = t;
                    var i, n, s = parseInt(t, 10);
                    i = this._parent ? this._parent._bounds2d.x2 : ige._bounds2d.x2, n = i / 100 * s | 0, this._uiCenter = n
                } else this._uiCenter = t, delete this._uiCenterPercent;
                return e || this._updateUiPosition(), this
            }
            return this._uiCenter
        },
        top: function(t, e) {
            if (t !== void 0) {
                if (t === null) delete this._uiTop, delete this._uiTopPercent;
                else if (delete this._uiMiddle, delete this._uiMiddlePercent, typeof t == "string") {
                    this._uiTopPercent = t;
                    var i, n, s = parseInt(t, 10);
                    i = this._parent ? this._parent._bounds2d.y : ige._bounds2d.y, n = i / 100 * s | 0, this._uiTop = n
                } else this._uiTop = t, delete this._uiTopPercent;
                return e || this._updateUiPosition(), this
            }
            return this._uiTop
        },
        bottom: function(t, e) {
            if (t !== void 0) {
                if (t === null) delete this._uiBottom, delete this._uiBottomPercent;
                else if (delete this._uiMiddle, delete this._uiMiddlePercent, typeof t == "string") {
                    this._uiBottomPercent = t;
                    var i, n, s = parseInt(t, 10);
                    i = this._parent ? this._parent._bounds2d.y : ige._bounds2d.y, n = i / 100 * s | 0, this._uiBottom = n
                } else this._uiBottom = t, delete this._uiBottomPercent;
                return e || this._updateUiPosition(), this
            }
            return this._uiBottom
        },
        middle: function(t, e) {
            if (t !== void 0) {
                if (t === null) delete this._uiMiddle, delete this._uiMiddlePercent;
                else if (delete this._uiTop, delete this._uiTopPercent, delete this._uiBottom, delete this._uiBottomPercent, typeof t == "string") {
                    this._uiMiddlePercent = t;
                    var i, n, s = parseInt(t, 10);
                    i = this._parent ? this._parent._bounds2d.y2 : ige._bounds2d.y2, n = i / 100 * s | 0, this._uiMiddle = n
                } else this._uiMiddle = t, delete this._uiMiddlePercent;
                return e || this._updateUiPosition(), this
            }
            return this._uiMiddle
        },
        width: function(t, e, i, n) {
            if (t !== void 0) {
                if (t === null) delete this._uiWidth, this._bounds2d.x = 0, this._bounds2d.x2 = 0;
                else if (this._uiWidth = t, this._widthModifier = i !== void 0 ? i : 0, typeof t == "string")
                    if (this._parent) {
                        var s, o, r = this._parent._bounds2d.x,
                            a = parseInt(t, 10);
                        s = r / 100 * a + this._widthModifier | 0, e && (o = s / this._bounds2d.x, this.height(this._bounds2d.y / o, !1, 0, n)), this._bounds2d.x = s, this._bounds2d.x2 = Math.floor(this._bounds2d.x / 2)
                    } else {
                        var r = ige._bounds2d.x,
                            a = parseInt(t, 10);
                        this._bounds2d.x = r / 100 * a + this._widthModifier | 0, this._bounds2d.x2 = Math.floor(this._bounds2d.x / 2)
                    }
                else {
                    if (e) {
                        var o = t / this._bounds2d.x;
                        this.height(this._bounds2d.y * o, !1, 0, n)
                    }
                    this._bounds2d.x = t, this._bounds2d.x2 = Math.floor(this._bounds2d.x / 2)
                }
                return n || this._updateUiPosition(), this
            }
            return this._bounds2d.x
        },
        height: function(t, e, i, n) {
            if (t !== void 0) {
                if (t === null) delete this._uiHeight, this._bounds2d.y = 0, this._bounds2d.y2 = 0;
                else if (this._uiHeight = t, this._heightModifier = i !== void 0 ? i : 0, typeof t == "string")
                    if (this._parent) {
                        var s, o, r = this._parent._bounds2d.y,
                            a = parseInt(t, 10);
                        s = r / 100 * a + this._heightModifier | 0, e && (o = s / this._bounds2d.y, this.width(this._bounds2d.x / o, !1, 0, n)), this._bounds2d.y = s, this._bounds2d.y2 = Math.floor(this._bounds2d.y / 2)
                    } else {
                        var r = ige._bounds2d.y,
                            a = parseInt(t, 10);
                        this._bounds2d.y = r / 100 * a + this._heightModifier | 0, this._bounds2d.y2 = Math.floor(this._bounds2d.y / 2)
                    }
                else {
                    if (e) {
                        var o = t / this._bounds2d.y;
                        this.width(this._bounds2d.x * o, !1, 0, n)
                    }
                    this._bounds2d.y = t, this._bounds2d.y2 = Math.floor(this._bounds2d.y / 2)
                }
                return n || this._updateUiPosition(), this
            }
            return this._bounds2d.y
        },
        autoScaleX: function(t, e) {
            return t !== void 0 ? (this._autoScaleX = t, this._autoScaleLockAspect = e, this._updateUiPosition(), this) : this._autoScaleX
        },
        autoScaleY: function(t, e) {
            return t !== void 0 ? (this._autoScaleY = t, this._autoScaleLockAspect = e, this._updateUiPosition(), this) : this._autoScaleY
        },
        updateUiChildren: function() {
            var t, e, i = this._children;
            if (i) {
                t = i.length;
                while (t--) e = i[t], e._updateUiPosition && e._updateUiPosition(), typeof e.updateUiChildren == "function" && e.updateUiChildren()
            }
            return this
        },
        _updateUiPosition: function() {
            if (this._parent) {
                var t, e, i, n = this._parent._bounds2d,
                    s = this._bounds2d.multiplyPoint(this._scale);
                this._autoScaleX && (t = parseInt(this._autoScaleX, 10), e = n.x / 100 * t, i = e / this._bounds2d.x, this._scale.x = i, this._autoScaleLockAspect && (this._scale.y = i)), this._autoScaleY && (t = parseInt(this._autoScaleY, 10), e = n.y / 100 * t, i = e / this._bounds2d.y, this._scale.y = i, this._autoScaleLockAspect && (this._scale.x = i)), this._uiWidth && this.width(this._uiWidth, !1, this._widthModifier, !0), this._uiHeight && this.height(this._uiHeight, !1, this._heightModifier, !0), this._uiCenterPercent && this.center(this._uiCenterPercent, !0), this._uiMiddlePercent && this.middle(this._uiMiddlePercent, !0), this._uiLeftPercent && this.left(this._uiLeftPercent, !0), this._uiRightPercent && this.right(this._uiRightPercent, !0), this._uiTopPercent && this.top(this._uiTopPercent, !0), this._uiBottomPercent && this.bottom(this._uiBottomPercent, !0), this._uiCenter !== void 0 ? this._translate.x = Math.floor(this._uiCenter) : this._uiLeft !== void 0 && this._uiRight !== void 0 ? (this.width(n.x - this._uiLeft - this._uiRight, !1, 0, !0), this._translate.x = Math.floor(this._uiLeft + s.x2 - n.x2)) : (this._uiLeft !== void 0 && (this._translate.x = Math.floor(this._uiLeft + s.x2 - n.x2)), this._uiRight !== void 0 && (this._translate.x = Math.floor(n.x2 - s.x2 - this._uiRight))), this._uiMiddle !== void 0 ? this._translate.y = Math.floor(this._uiMiddle) : this._uiTop !== void 0 && this._uiBottom !== void 0 ? (this.height(n.y - this._uiTop - this._uiBottom, !1, 0, !0), this._translate.y = Math.floor(this._uiTop + s.y2 - n.y2)) : (this._uiTop !== void 0 && (this._translate.y = Math.floor(this._uiTop + s.y2 - n.y2)), this._uiBottom !== void 0 && (this._translate.y = Math.floor(n.y2 - s.y2 - this._uiBottom))), this.emit("uiUpdate"), this.cacheDirty(!0)
            }
        }
    };
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_44);
var $i_45 = {
    color: function(t) {
        return t !== void 0 ? (this._color = t, this.cacheDirty(!0), this) : this._color
    },
    backgroundImage: function(t, e) {
        if (t && t.image) {
            if (e || (e = "no-repeat"), this._patternRepeat = e, this._patternTexture = t, this._backgroundSize ? (t.resize(this._backgroundSize.x, this._backgroundSize.y), this._patternWidth = this._backgroundSize.x, this._patternHeight = this._backgroundSize.y) : (this._patternWidth = t.image.width, this._patternHeight = t.image.height), this._cell > 1) {
                var i = document.createElement("canvas"),
                    n = i.getContext("2d"),
                    s = t._cells[this._cell];
                i.width = s[2], i.height = s[3], n.drawImage(t.image, s[0], s[1], s[2], s[3], 0, 0, s[2], s[3]), this._patternFill = ige._ctx.createPattern(i, e)
            } else this._patternFill = ige._ctx.createPattern(t.image, e);
            return t.restoreOriginal(), this.cacheDirty(!0), this
        }
        return this._patternFill
    },
    backgroundSize: function(t, e) {
        return t !== void 0 && e !== void 0 ? (typeof t == "string" && t !== "auto" && (t = this._bounds2d.x / 100 * parseInt(t, 10)), typeof e == "string" && e !== "auto" && (e = this._bounds2d.y / 100 * parseInt(e, 10)), t === "auto" && e === "auto" ? (this.log("Cannot set background x and y both to auto!", "error"), this) : (t === "auto" ? t = this._patternTexture && this._patternTexture.image ? this._patternTexture.image.width * (e / this._patternTexture.image.height) : this._bounds2d.x * (e / this._bounds2d.y) : e === "auto" && (e = this._patternTexture && this._patternTexture.image ? this._patternTexture.image.height * (t / this._patternTexture.image.width) : this._bounds2d.y * (t / this._bounds2d.x)), t !== 0 && e !== 0 ? (this._backgroundSize = {
            x: t,
            y: e
        }, this._patternTexture && this._patternRepeat && this.backgroundImage(this._patternTexture, this._patternRepeat), this.cacheDirty(!0)) : this.log("Cannot set background to zero-sized x or y!", "error"), this)) : this._backgroundSize
    },
    backgroundColor: function(t) {
        return t !== void 0 ? (this._backgroundColor = t, this.cacheDirty(!0), this) : this._backgroundColor
    },
    backgroundPosition: function(t, e) {
        return t !== void 0 && e !== void 0 ? (this._backgroundPosition = {
            x: t,
            y: e
        }, this.cacheDirty(!0), this) : this._backgroundPosition
    },
    borderColor: function(t) {
        return t !== void 0 ? (this._borderColor = t, this._borderLeftColor = t, this._borderTopColor = t, this._borderRightColor = t, this._borderBottomColor = t, this.cacheDirty(!0), this) : this._borderColor
    },
    borderLeftColor: function(t) {
        return t !== void 0 ? (this._borderLeftColor = t, this.cacheDirty(!0), this) : this._borderLeftColor
    },
    borderTopColor: function(t) {
        return t !== void 0 ? (this._borderTopColor = t, this.cacheDirty(!0), this) : this._borderTopColor
    },
    borderRightColor: function(t) {
        return t !== void 0 ? (this._borderRightColor = t, this.cacheDirty(!0), this) : this._borderRightColor
    },
    borderBottomColor: function(t) {
        return t !== void 0 ? (this._borderBottomColor = t, this.cacheDirty(!0), this) : this._borderBottomColor
    },
    borderWidth: function(t) {
        return t !== void 0 ? (this._borderWidth = t, this._borderLeftWidth = t, this._borderTopWidth = t, this._borderRightWidth = t, this._borderBottomWidth = t, this.cacheDirty(!0), this) : this._borderWidth
    },
    borderLeftWidth: function(t) {
        return t !== void 0 ? (this._borderLeftWidth = t, this.cacheDirty(!0), this) : this._borderLeftWidth
    },
    borderTopWidth: function(t) {
        return t !== void 0 ? (this._borderTopWidth = t, this.cacheDirty(!0), this) : this._borderTopWidth
    },
    borderRightWidth: function(t) {
        return t !== void 0 ? (this._borderRightWidth = t, this.cacheDirty(!0), this) : this._borderRightWidth
    },
    borderBottomWidth: function(t) {
        return t !== void 0 ? (this._borderBottomWidth = t, this.cacheDirty(!0), this) : this._borderBottomWidth
    },
    borderRadius: function(t) {
        return t !== void 0 ? (this._borderRadius = t, this._borderTopLeftRadius = t, this._borderTopRightRadius = t, this._borderBottomRightRadius = t, this._borderBottomLeftRadius = t, this.cacheDirty(!0), this) : this._borderRadius
    },
    padding: function(t, e, i, n) {
        return this._paddingLeft = t, this._paddingTop = e, this._paddingRight = i, this._paddingBottom = n, this.cacheDirty(!0), this
    },
    paddingLeft: function(t) {
        return t !== void 0 ? (this._paddingLeft = t, this.cacheDirty(!0), this) : this._paddingLeft
    },
    paddingTop: function(t) {
        return t !== void 0 ? (this._paddingTop = t, this.cacheDirty(!0), this) : this._paddingTop
    },
    paddingRight: function(t) {
        return t !== void 0 ? (this._paddingRight = t, this.cacheDirty(!0), this) : this._paddingRight
    },
    paddingBottom: function(t) {
        return t !== void 0 ? (this._paddingBottom = t, this.cacheDirty(!0), this) : this._paddingBottom
    }
};
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_45);
var nullMethod = function() {},
    $i_49 = function() {
        this.dummy = !0, this.width = 0, this.height = 0
    };
$i_49.prototype.getContext = function() {
    return $i_50
}, typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_49);
var nullMethod = function() {},
    $i_50 = {
        dummy: !0,
        save: nullMethod,
        restore: nullMethod,
        translate: nullMethod,
        rotate: nullMethod,
        scale: nullMethod,
        drawImage: nullMethod,
        fillRect: nullMethod,
        strokeRect: nullMethod,
        stroke: nullMethod,
        fill: nullMethod,
        rect: nullMethod,
        moveTo: nullMethod,
        lineTo: nullMethod,
        arc: nullMethod,
        clearRect: nullMethod,
        beginPath: nullMethod,
        clip: nullMethod,
        transform: nullMethod,
        setTransform: nullMethod,
        fillText: nullMethod
    };
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_50);
var $i_53 = $i_2.extend({
    classId: "$i_53",
    init: function(t, e, i, n) {
        this._targetObj = t, this._steps = [], this._currentStep = -1, e !== void 0 && this.stepTo(e), this._durationMs = i !== void 0 ? i : 0, this._started = !1, this._stepDirection = !1, n && n.easing ? this.easing(n.easing) : this.easing("none"), n && n.startTime !== void 0 && this.startTime(n.startTime), n && n.beforeTween !== void 0 && this.beforeTween(n.beforeTween), n && n.afterTween !== void 0 && this.afterTween(n.afterTween)
    },
    targetObj: function(t) {
        return t !== void 0 && (this._targetObj = t), this
    },
    properties: function(t) {
        return t !== void 0 && (this._steps = [], this._currentStep = -1, this.stepTo(t)), this
    },
    repeatMode: function(t, e) {
        return t !== void 0 ? (this._repeatMode = t, this.repeatCount(e), this) : this._repeatMode
    },
    repeatCount: function(t) {
        return t !== void 0 ? (this._repeatCount = t, this._repeatedCount = 0, this) : this._repeatCount
    },
    step: function(t, e, i) {
        return this.log("The step method has been renamed to stepTo(). Please update your code as the step() method will soon be removed.", "warning"), this.stepTo(t, e, i), this
    },
    stepTo: function(t, e, i, n) {
        return t !== void 0 && this._steps.push({
            props: t,
            durationMs: e,
            easing: i,
            isDelta: n
        }), this
    },
    stepBy: function(t, e, i) {
        return this.stepTo(t, e, i, !0), this
    },
    duration: function(t) {
        return t !== void 0 && (this._durationMs = t), this
    },
    beforeTween: function(t) {
        return t !== void 0 && (this._beforeTween = t), this
    },
    afterTween: function(t) {
        return t !== void 0 && (this._afterTween = t), this
    },
    beforeStep: function(t) {
        return t !== void 0 && (this._beforeStep = t), this
    },
    afterStep: function(t) {
        return t !== void 0 && (this._afterStep = t), this
    },
    afterChange: function(t) {
        return t !== void 0 && (this._afterChange = t), this
    },
    targetObject: function() {
        return this._targetObj
    },
    easing: function(t) {
        return t !== void 0 && (ige.tween.easing[t] ? this._easing = t : this.log("The easing method you have selected does not exist, please use a valid easing method. For a list of easing methods please inspect ige.tween.easing from your console.", "error", ige.tween.easing)), this
    },
    startTime: function(t) {
        return t !== void 0 && (this._startTime = t), this
    },
    start: function(t) {
        return t !== void 0 && this.startTime(t + ige._currentTime), ige.tween.start(this), this._targetObj._tweenArr = this._targetObj._tweenArr || [], this._targetObj._tweenArr.push(this), this
    },
    stop: function() {
        return ige.tween.stop(this), this._targetObj._tweenArr && this._targetObj._tweenArr.pull(this), this
    },
    startAll: function() {
        return this._targetObj._tweenArr && this._targetObj._tweenArr.eachReverse(function(t) {
            t.start()
        }), this
    },
    stopAll: function() {
        return this._targetObj._tweenArr && this._targetObj._tweenArr.eachReverse(function(t) {
            t.stop()
        }), this
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_53);
var $i_54 = $i_3.extend({
    classId: "$i_54",
    $i_54: !0,
    init: function(t) {
        this._loaded = !1, this._cells = [], this._smoothing = ige._globalSmoothing, this._applyFilters = [], this._applyFiltersData = [], this._preFilters = [], this._preFiltersData = [];
        var e = typeof t;
        e === "string" && t && this.url(t), e === "object" && this.assignSmartTextureImage(t)
    },
    id: function(t) {
        if (t !== void 0) {
            if (!ige._register[t]) return this._id && ige._register[this._id] && ige.unRegister(this), this._id = t, ige.register(this), this;
            if (ige._register[t] === this) return this;
            this.log('Cannot set ID of object to "' + t + '" because that ID is already in use by another object!', "error")
        }
        return this._id || (this._id = this._url ? ige.newIdFromString(this._url) : ige.newIdHex(), ige.register(this)), this._id
    },
    url: function(t) {
        return t !== void 0 ? (this._url = t, t.substr(t.length - 2, 2) === "js" ? this._loadScript(t) : this._loadImage(t), this) : this._url
    },
    _loadImage: function(t) {
        var e, i = this;
        ige.isClient && (ige.textureLoadStart(t, this), ige._textureImageStore[t] ? (e = this.image = this._originalImage = ige._textureImageStore[t], e._igeTextures.push(this), e._loaded && (i._mode = 0, i.sizeX(e.width), i.sizeY(e.height), e.width % 2 && this.log("This texture's width is not divisible by 2 which will cause the texture to use sub-pixel rendering resulting in a blurred image. This may also slow down the renderer on some browsers. Image file: " + this._url, "warning"), e.height % 2 && this.log("This texture's height is not divisible by 2 which will cause the texture to use sub-pixel rendering resulting in a blurred image. This may also slow down the renderer on some browsers. Image file: " + this._url, "warning"), i._cells[1] = [0, 0, i._sizeX, i._sizeY], i._textureLoaded())) : (e = ige._textureImageStore[t] = this.image = this._originalImage = new Image, e._igeTextures = e._igeTextures || [], e._igeTextures.push(this), e.onload = function() {
            e._loaded = !0, ige.log("Texture image (" + t + ") loaded successfully");
            var i, n, s = e._igeTextures,
                o = s.length;
            for (i = 0; o > i; i++) n = s[i], n._mode = 0, n.sizeX(e.width), n.sizeY(e.height), n._cells[1] = [0, 0, n._sizeX, n._sizeY], n._textureLoaded()
        }, e.src = t))
    },
    _textureLoaded: function() {
        var t = this;
        setTimeout(function() {
            t._loaded = !0, t.emit("loaded"), ige.textureLoadEnd(t.image.src, t)
        }, 5)
    },
    _loadScript: function(scriptUrl) {
        var textures = ige.textures,
            rs_sandboxContext, self = this,
            scriptElem;
        ige.textureLoadStart(scriptUrl, this), ige.isClient && (scriptElem = document.createElement("script"), scriptElem.onload = function(data) {
            self.log('Texture script "' + scriptUrl + '" loaded successfully'), eval(data), self._mode = 1, self.script = image, typeof image.init == "function" && image.init.apply(image, [self]), self._loaded = !0, self.emit("loaded"), ige.textureLoadEnd(scriptUrl, self)
        }, scriptElem.addEventListener("error", function() {
            self.log("Error loading smart texture script file: " + scriptUrl, "error")
        }, !0), scriptElem.src = scriptUrl, document.getElementsByTagName("head")[0].appendChild(scriptElem))
    },
    assignSmartTextureImage: function(t) {
        var e = (ige.textures, this);
        typeof t.render == "function" ? (e._mode = 1, e.script = t, typeof t.init == "function" && t.init.apply(t, [e]), e._loaded = !0, e.emit("loaded")) : this.log("Cannot assign smart texture because it doesn't have a render() method!", "error")
    },
    _setImage: function(t) {
        var e;
        ige.isClient && (e = this.image = this._originalImage = t, e._igeTextures = e._igeTextures || [], e._loaded = !0, this._mode = 0, this.sizeX(e.width), this.sizeY(e.height), this._cells[1] = [0, 0, this._sizeX, this._sizeY])
    },
    textureFromCell: function(t) {
        var e = new $i_54,
            i = this;
        return this._loaded ? this._textureFromCell(e, t) : this.on("loaded", function() {
            i._textureFromCell(e, t)
        }), e
    },
    _textureFromCell: function(t, e) {
        var i, n, s, o;
        i = typeof e == "string" ? this.cellIdToIndex(e) : e, this._cells[i] ? (n = this._cells[i], s = document.createElement("canvas"), o = s.getContext("2d"), this._smoothing ? (o.imageSmoothingEnabled = !0, o.mozImageSmoothingEnabled = !0) : (o.imageSmoothingEnabled = !1, o.mozImageSmoothingEnabled = !1), s.width = n[2], s.height = n[3], o.drawImage(this._originalImage, n[0], n[1], n[2], n[3], 0, 0, n[2], n[3]), t._setImage(s), t._loaded = !0, setTimeout(function() {
            t.emit("loaded")
        }, 1)) : this.log("Unable to create new texture from passed cell index (" + e + ") because the cell does not exist!", "warning")
    },
    sizeX: function(t) {
        this._sizeX = t
    },
    sizeY: function(t) {
        this._sizeY = t
    },
    resize: function(t, e, i) {
        this._originalImage && (this._loaded ? (this._textureCtx || (this._textureCanvas = document.createElement("canvas")), this._textureCanvas.width = t, this._textureCanvas.height = e, this._textureCtx = this._textureCanvas.getContext("2d"), this._smoothing ? (this._textureCtx.imageSmoothingEnabled = !0, this._textureCtx.webkitImageSmoothingEnabled = !0, this._textureCtx.mozImageSmoothingEnabled = !0) : (this._textureCtx.imageSmoothingEnabled = !1, this._textureCtx.webkitImageSmoothingEnabled = !1, this._textureCtx.mozImageSmoothingEnabled = !1), i || this._textureCtx.drawImage(this._originalImage, 0, 0, this._originalImage.width, this._originalImage.height, 0, 0, t, e), this.image = this._textureCanvas) : this.log("Cannot resize texture because the texture image (" + this._url + ") has not loaded into memory yet!", "error"))
    },
    resizeByPercent: function(t, e, i) {
        this._originalImage && (this._loaded ? (t = Math.floor(this.image.width / 100 * t), e = Math.floor(this.image.height / 100 * e), this._textureCtx || (this._textureCanvas = document.createElement("canvas")), this._textureCanvas.width = t, this._textureCanvas.height = e, this._textureCtx = this._textureCanvas.getContext("2d"), this._smoothing ? (this._textureCtx.imageSmoothingEnabled = !0, this._textureCtx.webkitImageSmoothingEnabled = !0, this._textureCtx.mozImageSmoothingEnabled = !0) : (this._textureCtx.imageSmoothingEnabled = !1, this._textureCtx.webkitImageSmoothingEnabled = !1, this._textureCtx.mozImageSmoothingEnabled = !1), i || this._textureCtx.drawImage(this._originalImage, 0, 0, this._originalImage.width, this._originalImage.height, 0, 0, t, e), this.image = this._textureCanvas) : this.log("Cannot resize texture because the texture image (" + this._url + ") has not loaded into memory yet!", "error"))
    },
    restoreOriginal: function() {
        this.image = this._originalImage, delete this._textureCtx, delete this._textureCanvas, this.removeFilters()
    },
    smoothing: function(t) {
        return t !== void 0 ? (this._smoothing = t, this) : this._smoothing
    },
    render: function(t, e) {
        if (e._cell !== null) {
            if (this._smoothing ? (ige._ctx.imageSmoothingEnabled = !0, ige._ctx.mozImageSmoothingEnabled = !0) : (ige._ctx.imageSmoothingEnabled = !1, ige._ctx.mozImageSmoothingEnabled = !1), this._mode === 0) {
                var i = this._cells[e._cell],
                    n = e._bounds2d,
                    s = e._renderPos;
                if (i) {
                    if (this._preFilters.length > 0 && this._textureCtx) {
                        this._textureCtx.clearRect(0, 0, this._textureCanvas.width, this._textureCanvas.height), this._textureCtx.drawImage(this._originalImage, 0, 0);
                        var o = this;
                        this._applyFilters.forEach(function(t, e) {
                            o._textureCtx.save(), t(o._textureCanvas, o._textureCtx, o._originalImage, o, o._applyFiltersData[e]), o._textureCtx.restore()
                        }), this._preFilters.forEach(function(t, e) {
                            o._textureCtx.save(), t(o._textureCanvas, o._textureCtx, o._originalImage, o, o._preFiltersData[e]), o._textureCtx.restore()
                        })
                    }
                    t.drawImage(this.image, i[0], i[1], i[2], i[3], s.x, s.y, n.x, n.y), ige._drawCount++
                } else this.log("Cannot render texture using cell " + e._cell + " because the cell does not exist in the assigned texture!", "error")
            }
            this._mode === 1 && (t.save(), this.script.render(t, e, this), t.restore(), ige._drawCount++)
        }
    },
    removeFilter: function(t) {
        var e;
        while ((e = this._preFilters.indexOf(t)) > -1) this._preFilters[e] = void 0, this._preFiltersData[e] = void 0;
        while ((e = this._applyFilters.indexOf(t)) > -1) this._applyFilters[e] = void 0, this._applyFiltersData[e] = void 0;
        this._preFilters = this._preFilters.clean(), this._preFiltersData = this._preFiltersData.clean(), this._applyFilters = this._applyFilters.clean(), this._applyFiltersData = this._applyFiltersData.clean(), this._rerenderFilters()
    },
    removeFilters: function() {
        this._applyFilters = [], this._applyFiltersData = [], this._preFilters = [], this._preFiltersData = [], this._rerenderFilters()
    },
    _rerenderFilters: function() {
        if (this._textureCanvas) {
            this.resize(this._textureCanvas.width, this._textureCanvas.height, !1);
            var t = this;
            this._applyFilters.forEach(function(e, i) {
                t._textureCtx.save(), e(t._textureCanvas, t._textureCtx, t._originalImage, t, t._applyFiltersData[i]), t._textureCtx.restore()
            })
        }
    },
    preFilter: function(t, e) {
        return t !== void 0 ? (this._originalImage && (this._textureCtx || (this._textureCanvas = document.createElement("canvas"), this._textureCanvas.width = this._originalImage.width, this._textureCanvas.height = this._originalImage.height, this._textureCtx = this._textureCanvas.getContext("2d"), this._smoothing ? (this._textureCtx.imageSmoothingEnabled = !0, this._textureCtx.webkitImageSmoothingEnabled = !0, this._textureCtx.mozImageSmoothingEnabled = !0) : (this._textureCtx.imageSmoothingEnabled = !1, this._textureCtx.webkitImageSmoothingEnabled = !1, this._textureCtx.mozImageSmoothingEnabled = !1)), this.image = this._textureCanvas, this._preFilters[this._preFilters.length] = t, this._preFiltersData[this._preFiltersData.length] = e ? e : {}), this) : (this.log("Cannot use pre-filter, no filter method was passed!", "warning"), this._preFilters[this._preFilters.length - 1])
    },
    applyFilter: function(t, e) {
        return this._loaded ? t !== void 0 ? this._originalImage && (this._textureCtx || (this._textureCanvas = document.createElement("canvas"), this._textureCanvas.width = this._originalImage.width, this._textureCanvas.height = this._originalImage.height, this._textureCtx = this._textureCanvas.getContext("2d"), this._textureCtx.clearRect(0, 0, this._textureCanvas.width, this._textureCanvas.height), this._textureCtx.drawImage(this._originalImage, 0, 0), this._smoothing ? (this._textureCtx.imageSmoothingEnabled = !0, this._textureCtx.webkitImageSmoothingEnabled = !0, this._textureCtx.mozImageSmoothingEnabled = !0) : (this._textureCtx.imageSmoothingEnabled = !1, this._textureCtx.webkitImageSmoothingEnabled = !1, this._textureCtx.mozImageSmoothingEnabled = !1)), this.image = this._textureCanvas, this._preFilters.length > 0 || (this._textureCtx.save(), t(this._textureCanvas, this._textureCtx, this._originalImage, this, e), this._textureCtx.restore()), this._applyFilters[this._applyFilters.length] = t, this._applyFiltersData[this._applyFiltersData.length] = e ? e : {}) : this.log("Cannot apply filter, no filter method was passed!", "warning") : this.log("Cannot apply filter, the texture you are trying to apply the filter to has not yet loaded!", "error"), this
    },
    pixelData: function(t, e) {
        if (this._loaded) {
            if (this.image) return this._textureCtx ? this._textureCtx = this._textureCtx : (this._textureCanvas = document.createElement("canvas"), this._textureCanvas.width = this.image.width, this._textureCanvas.height = this.image.height, this._textureCtx = this._textureCanvas.getContext("2d"), this._smoothing ? (this._textureCtx.imageSmoothingEnabled = !0, this._textureCtx.webkitImageSmoothingEnabled = !0, this._textureCtx.mozImageSmoothingEnabled = !0) : (this._textureCtx.imageSmoothingEnabled = !1, this._textureCtx.webkitImageSmoothingEnabled = !1, this._textureCtx.mozImageSmoothingEnabled = !1), this._textureCtx.drawImage(this.image, 0, 0)), this._textureCtx.getImageData(t, e, 1, 1).data
        } else this.log("Cannot read pixel data, the texture you are trying to read data from has not yet loaded!", "error");
        return this
    },
    clone: function() {
        return this.textureFromCell(1)
    },
    stringify: function() {
        var t = "new " + this.classId() + "('" + this._url + "')";
        return t += this._stringify()
    },
    _stringify: function() {
        return ""
    },
    destroy: function() {
        delete this._eventListeners, this.image && this.image._igeTextures && this.image._igeTextures.pull(this), ige._textureStore.pull(this), delete this.image, delete this.script, delete this._textureCanvas, delete this._textureCtx, this._destroyed = !0
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_54);
var $i_55 = $i_54.extend({
    classId: "$i_55",
    $i_56: !0,
    init: function(t, e, i) {
        var n = this;
        n.horizontalCells(e || 1), n.verticalCells(i || 1), $i_54.prototype.init.call(this, t)
    },
    _textureLoaded: function() {
        this.image ? (this._sheetImage = this.image, this._applyCells()) : this.log("Cannot create cell-sheet because texture has not loaded an image!", "error"), $i_54.prototype._textureLoaded.call(this)
    },
    cellCount: function() {
        return this.horizontalCells() * this.verticalCells()
    },
    horizontalCells: function(t) {
        return t !== void 0 ? (this._cellColumns = t, this) : this._cellColumns
    },
    verticalCells: function(t) {
        return t !== void 0 ? (this._cellRows = t, this) : this._cellRows
    },
    _applyCells: function() {
        var t, e, i, n, s, o, r, a, h;
        if (this.image && this._cellRows && this._cellColumns)
            if (t = this._sizeX, e = this._sizeY, i = this._cellRows, n = this._cellColumns, s = this._cellWidth = t / n, o = this._cellHeight = e / i, s !== parseInt(s, 10) && this.log("Cell width is a floating-point number! (Image Width " + t + " / Number of Columns " + n + " = " + s + ") in file: " + this._url, "warning"), o !== parseInt(o, 10) && this.log("Cell height is a floating-point number! (Image Height " + e + " / Number of Rows " + i + " = " + o + ")  in file: " + this._url, "warning"), i > 1 || n > 1)
                for (r = 1; i * n >= r; r++) h = Math.ceil(r / n) - 1, a = r - n * h - 1, this._cells[r] = [a * s, h * o, s, o];
            else this._cells[1] = [0, 0, this._sizeX, this._sizeY]
    },
    stringify: function() {
        var t = "new " + this.classId() + "('" + this.url() + "', " + this.horizontalCells() + ", " + this.verticalCells() + ")";
        return t
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_54);
var $i_56 = $i_54.extend({
    classId: "$i_56",
    $i_56: !0,
    init: function(t, e) {
        this._spriteCells = e, $i_54.prototype.init.call(this, t)
    },
    _textureLoaded: function() {
        if (this.image) {
            this._sheetImage = this.image;
            var t, e = this._spriteCells;
            for (e || (this.log("No cell data provided for sprite sheet, attempting to automatically detect sprite bounds..."), e = this.detectCells(this._sheetImage)), t = 0; e.length > t; t++) this._cells[t + 1] = e[t], this._checkModulus && (e[t][2] % 2 && this.log("This texture's cell definition defines a cell width is not divisible by 2 which can cause the texture to use sub-pixel rendering resulting in a blurred image. This may also slow down the renderer on some browsers. Image file: " + this._url, "warning", e[t]), e[t][3] % 2 && this.log("This texture's cell definition defines a cell height is not divisible by 2 which can cause the texture to use sub-pixel rendering resulting in a blurred image. This may also slow down the renderer on some browsers. Image file: " + this._url, "warning", e[t]))
        } else this.log("Cannot create cell-sheet because texture has not loaded an image!", "error");
        $i_54.prototype._textureLoaded.call(this)
    },
    detectCells: function(t) {
        var e, i, n, s, o = document.createElement("canvas"),
            r = o.getContext("2d"),
            a = [];
        for (o.width = t.width, o.height = t.height, r.drawImage(t, 0, 0), e = r.getImageData(0, 0, o.width, o.height), n = 0; o.height > n; n++)
            for (i = 0; o.width > i; i++)
                if (!e.isTransparent(i, n) && !this._pixelInRects(a, i, n)) {
                    if (s = this._determineRect(e, i, n), !s) return this.log("Cannot automatically determine sprite bounds!", "warning"), [];
                    a.push(s)
                }
        return a
    },
    _pixelInRects: function(t, e, i) {
        var n, s, o = t.length;
        for (n = 0; o > n; n++)
            if (s = t[n], !(s.x > e || e > s.x + s.width || s.y > i || i > s.y + s.height)) return !0;
        return !1
    },
    _determineRect: function(t, e, i) {
        var n, s = [{
                x: e,
                y: i
            }],
            o = {
                x: e,
                y: i,
                width: 1,
                height: 1
            };
        while (s.length) n = s.shift(), n.x > o.x + o.width && (o.width = n.x - o.x + 1), n.y > o.y + o.height && (o.height = n.y - o.y + 1), o.x > n.x && (o.width += o.x - n.x, o.x = n.x), o.y > n.y && (o.height += o.y - n.y, o.y = n.y), t.isTransparent(n.x - 1, n.y - 1) || (t.makeTransparent(n.x - 1, n.y - 1), s.push({
            x: n.x - 1,
            y: n.y - 1
        })), t.isTransparent(n.x, n.y - 1) || (t.makeTransparent(n.x, n.y - 1), s.push({
            x: n.x,
            y: n.y - 1
        })), t.isTransparent(n.x + 1, n.y - 1) || (t.makeTransparent(n.x + 1, n.y - 1), s.push({
            x: n.x + 1,
            y: n.y - 1
        })), t.isTransparent(n.x - 1, n.y) || (t.makeTransparent(n.x - 1, n.y), s.push({
            x: n.x - 1,
            y: n.y
        })), t.isTransparent(n.x + 1, n.y) || (t.makeTransparent(n.x + 1, n.y), s.push({
            x: n.x + 1,
            y: n.y
        })), t.isTransparent(n.x - 1, n.y + 1) || (t.makeTransparent(n.x - 1, n.y + 1), s.push({
            x: n.x - 1,
            y: n.y + 1
        })), t.isTransparent(n.x, n.y + 1) || (t.makeTransparent(n.x, n.y + 1), s.push({
            x: n.x,
            y: n.y + 1
        })), t.isTransparent(n.x + 1, n.y + 1) || (t.makeTransparent(n.x + 1, n.y + 1), s.push({
            x: n.x + 1,
            y: n.y + 1
        }));
        return [o.x, o.y, o.width, o.height]
    },
    cellCount: function() {
        return this._cells.length
    },
    cellIdToIndex: function(t) {
        var e, i = this._cells;
        for (e = 1; i.length > e; e++)
            if (i[e][4] === t) return e;
        return -1
    },
    stringify: function() {
        var t = "new " + this.classId() + "('" + this.url() + "', " + (this._cells + "") + ")";
        return t
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_56);
var $i_57 = $i_54.extend({
    classId: "$i_57",
    init: function(t) {
        $i_54.prototype.init.call(this, t), arguments[1] && this.log("Font sheets no longer accept a caching limit value. All font output is now cached by default via the actual font entity - fontEntity.cache(true);", "warning"), this._noDimensions = !0, this.on("loaded", function() {
            if (this.image)
                if (this._sheetImage = this.image, this._fontData = this.decodeHeader(), this._charCodeMap = this._fontData.characters.charCodes, this._charPosMap = this._fontData.characters.charPosition, this._measuredWidthMap = this._fontData.characters.measuredWidth, this._pixelWidthMap = this._fontData.characters.pixelWidth, this._fontData) {
                    var t = this._fontData.font;
                    this.log("Loaded font sheet for font: " + t.fontName + " @ " + t.fontSize + t.fontSizeUnit + " in " + t.fontColor)
                } else this.log("Could not load data header for font sheet: " + this.image.src, "error")
        })
    },
    decodeHeader: function() {
        var t = document.createElement("canvas"),
            e = t.getContext("2d");
        return t.width = this.image.width, t.height = 1, e.drawImage(this.image, 0, 0), this._decode(t, 0, 0, this.image.width)
    },
    _decode: function(t, e, i, n) {
        "use strict";
        var s, o = t.getContext("2d"),
            r = o.getImageData(e, i, n, t.height).data,
            a = !0,
            h = 0,
            d = "";
        while (a) {
            if (s = r[h] + "" + " " + (r[h + 1] + "") + " " + (r[h + 2] + ""), s === "3 2 1") return a = !1, JSON.parse(d);
            d += String.fromCharCode(r[h]) + String.fromCharCode(r[h + 1]) + String.fromCharCode(r[h + 2]), h += 4, h > r.length && (a = !1, console.log("Image JSON Decode Error!"))
        }
    },
    lineHeightModifier: function(t) {
        t !== void 0 && (this._lineHeightModifier = t)
    },
    measureTextWidth: function(t) {
        if (this._loaded) {
            var e, i, n, s, o = this._charCodeMap,
                r = this._measuredWidthMap,
                a = [],
                h = 0;
            for (t.indexOf("\n") > -1 ? a = t.split("\n") : a.push(t), n = 0; a.length > n; n++) {
                for (s = 0, e = 0; a[n].length > e; e++) i = o[a[n].charCodeAt(e)], s += r[i] || 0;
                s > h && (h = s)
            }
            return s
        }
        return -1
    },
    render: function(t, e) {
        if (e._renderText && this._loaded) {
            var i, n, s, o, r, a = t,
                h = e._renderText,
                d = [],
                l = this._charCodeMap,
                u = this._charPosMap,
                c = this._measuredWidthMap,
                _ = this._pixelWidthMap,
                g = 0,
                p = 0,
                m = 0,
                f = 0,
                y = 0,
                v = 0,
                x = [],
                b = this._sizeY - 2,
                w = 0,
                C = 0;
            switch (h.indexOf("\n") > -1 ? d = h.split("\n") : d.push(h), o = b * d.length, e._textAlignY) {
                case 0:
                    f = -(b * d.length / 2) - e._textLineSpacing * ((d.length - 1) / 2);
                    break;
                case 1:
                    f = -(b * d.length / 2) - e._textLineSpacing * ((d.length - 1) / 2);
                    break;
                case 2:
                    f = -(b * d.length / 2) - e._textLineSpacing * ((d.length - 1) / 2)
            }
            for (n = 0; d.length > n; n++) {
                for (i = d[n], s = 0; i.length > s; s++) r = l[i.charCodeAt(s)], w += c[r] || 0;
                x[n] = w, w > C && (C = w), w = 0
            }
            switch (e._textAlignX) {
                case 0:
                    m = -e._bounds2d.x2;
                    break;
                case 1:
                    m = -C / 2;
                    break;
                case 2:
                    m = e._bounds2d.x2 - C
            }
            for (n = 0; d.length > n; n++) {
                switch (i = d[n], p = b * n + e._textLineSpacing * n, e._textAlignX) {
                    case 0:
                        g = -e._bounds2d.x2;
                        break;
                    case 1:
                        g = -x[n] / 2;
                        break;
                    case 2:
                        g = e._bounds2d.x2 - x[n]
                }
                for (s = 0; i.length > s; s++) r = l[i.charCodeAt(s)], a.drawImage(this.image, u[r], 2, _[r], this._sizeY - 2, Math.floor(y + g), Math.floor(v + f + p), _[r], this._sizeY - 2), e._colorOverlay && (a.save(), a.globalCompositeOperation = "source-atop", a.fillStyle = e._colorOverlay, a.fillRect(Math.floor(y + g), Math.floor(v + f + p), _[r], this._sizeY - 2), a.restore()), g += c[r] || 0, ige._drawCount++;
                g = 0
            }
        }
    },
    destroy: function() {
        this.image = null, this.script = null
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_57);
var $i_58 = {
        measureTextWidth: function(t, e) {
            if (e._nativeFont) {
                var i, n, s = [],
                    o = 0,
                    r = document.createElement("canvas"),
                    a = r.getContext("2d");
                for (t.indexOf("\n") > -1 ? s = t.split("\n") : s.push(t), a.font = e._nativeFont, a.textBaseline = "middle", e._nativeStroke && (a.lineWidth = e._nativeStroke, a.strokeStyle = e._nativeStrokeColor ? e._nativeStrokeColor : e._colorOverlay), i = 0; s.length > i; i++) n = a.measureText(s[i]).width, n > o && (o = n);
                return o
            }
            return -1
        },
        render: function(t, e) {
            if (e._nativeFont && e._renderText) {
                var i, n, s, o, r, a = e._renderText,
                    h = [];
                for (t.font = e._nativeFont, t.textBaseline = "middle", e._colorOverlay && (t.fillStyle = e._colorOverlay), e._textAlignX === 0 && (t.textAlign = "left", t.translate(-e._bounds2d.x2, 0)), e._textAlignX === 1 && (t.textAlign = "center"), e._textAlignX === 2 && (t.textAlign = "right", t.translate(e._bounds2d.x2, 0)), e._nativeStroke && (t.lineWidth = e._nativeStroke, t.strokeStyle = e._nativeStrokeColor ? e._nativeStrokeColor : e._colorOverlay), a.indexOf("\n") > -1 ? h = a.split("\n") : h.push(a), o = Math.floor(e._bounds2d.y / h.length), n = -((o + e._textLineSpacing) / 2) * (h.length - 1), r = 0; h.length > r; r++) s = n + o * r + e._textLineSpacing * r, i = t.measureText(h[r]), e._nativeStroke && t.strokeText(h[r], 0, s), t.fillText(h[r], 0, s)
            }
        }
    },
    $i_59 = $i_3.extend({
        classId: "$i_59",
        init: function() {
            this._newBorn = !0, this._alive = !0, this._mode = 0, this._mountMode = 0, this._parent = null, this._children = [], this._layer = 0, this._depth = 0, this._depthSortMode = 0, this._timeStream = [], this._inView = !0, this._managed = 1, this._specialProp = ["_id", "_parent", "_children"]
        },
        alive: function(t) {
            return t !== void 0 ? (this._alive = t, this) : this._alive
        },
        managed: function(t) {
            return t !== void 0 ? (this._managed = t, this) : this._managed
        },
        id: function(t) {
            if (t !== void 0) {
                if (t === this._id) return this;
                if (!ige._register[t]) return this._id && ige._register[this._id] && ige.unRegister(this), this._id = t, ige.register(this), this;
                ige._register[t] !== this && this.log('Cannot set ID of object to "' + t + '" because that ID is already in use by another object!', "error")
            }
            return this._id || (this._id = ige.newIdHex(), ige.register(this)), this._id
        },
        category: function(t) {
            return t !== void 0 ? (this._category && this._category !== t && ige.categoryUnRegister(this), this._category = t, t && ige.categoryRegister(this), this) : this._category
        },
        group: function() {
            this.log("The group() method has been renamed to category(). Please update your code.", "error")
        },
        addGroup: function() {
            var t, e, i = arguments.length;
            while (i--)
                if (t = arguments[i], t instanceof Array) {
                    e = t.length;
                    while (e--) this._groups && this._groups.indexOf(t[e]) !== -1 || (this._groups = this._groups || [], this._groups.push(t[e]), ige.groupRegister(this, t[e]))
                } else this._groups && this._groups.indexOf(t) !== -1 || (this._groups = this._groups || [], this._groups.push(t), ige.groupRegister(this, t));
            return this
        },
        inGroup: function(t, e) {
            return t ? e ? this.inAllGroups(t) : this.inAnyGroup(t) : !1
        },
        inAllGroups: function(t) {
            var e, i;
            if (!(t instanceof Array)) return this._groups && this._groups.indexOf(t) !== -1;
            i = t.length;
            while (i--)
                if (e = t[i], e && (!this._groups || this._groups.indexOf(e) === -1)) return !1;
            return !0
        },
        inAnyGroup: function(t) {
            var e, i;
            if (!(t instanceof Array)) return this._groups && this._groups.indexOf(t) > -1;
            i = t.length;
            while (i--)
                if (e = t[i], e && this._groups && this._groups.indexOf(e) > -1) return !0;
            return !1
        },
        groups: function() {
            return this._groups || []
        },
        groupCount: function() {
            return this._groups ? this._groups.length : 0
        },
        removeGroup: function() {
            if (this._groups) {
                var t, e, i = arguments.length;
                while (i--)
                    if (t = arguments[i], t instanceof Array) {
                        e = t.length;
                        while (e--) this._groups.pull(t[e]), ige.groupUnRegister(this, t[e])
                    } else this._groups.pull(t), ige.groupUnRegister(this, t)
            }
            return this
        },
        removeAllGroups: function() {
            if (this._groups) {
                var t = this._groups,
                    e = t.length;
                while (e--) ige.groupUnRegister(this, t[e]);
                delete this._groups
            }
            return this
        },
        addBehaviour: function(t, e, i) {
            if (typeof t == "string") {
                if (typeof e == "function") return i ? (this._tickBehaviours = this._tickBehaviours || [], this._tickBehaviours.push({
                    id: t,
                    method: e
                })) : (this._updateBehaviours = this._updateBehaviours || [], this._updateBehaviours.push({
                    id: t,
                    method: e
                })), this;
                this.log("The behaviour you passed is not a function! The second parameter of the call must be a function!", "error")
            } else this.log("Cannot add behaviour to object because the specified behaviour id is not a string. You must provide two parameters with the addBehaviour() call, an id:String and a behaviour:Function. Adding a behaviour with an id allows you to remove it by it's id at a later stage!", "error");
            return !1
        },
        removeBehaviour: function(t, e) {
            if (t !== void 0) {
                var i, n;
                if (i = e ? this._tickBehaviours : this._updateBehaviours) {
                    n = i.length;
                    while (n--)
                        if (i[n].id === t) return i.splice(n, 1), this
                }
            }
            return !1
        },
        hasBehaviour: function(t, e) {
            if (t !== void 0) {
                var i, n;
                if (i = e ? this._tickBehaviours : this._updateBehaviours) {
                    n = i.length;
                    while (n--)
                        if (i[n].id === t) return !0
                }
            }
            return !1
        },
        drawBounds: function(t) {
            return t !== void 0 ? (this._drawBounds = t, this) : this._drawBounds
        },
        drawBoundsData: function(t) {
            return t !== void 0 ? (this._drawBoundsData = t, this) : this._drawBoundsData
        },
        drawMouse: function(t) {
            return t !== void 0 ? (this._drawMouse = t, this) : this._drawMouse
        },
        drawMouseData: function(t) {
            return t !== void 0 ? (this._drawMouseData = t, this) : this._drawMouseData
        },
        $: function(t) {
            var e = ige.$(t);
            if (e._parent === this) return e;
            var i = e.parent(this.id());
            return i ? e : void 0
        },
        $$: function(t) {
            var e, i = ige.$$(t),
                n = i.length,
                s = [],
                o = this.id();
            while (n--) e = i[n], (e._parent === this || e.parent(o)) && s.push(e);
            return s
        },
        parent: function(t) {
            return t ? this._parent ? this._parent.id() === t ? this._parent : this._parent.parent(t) : void 0 : this._parent
        },
        children: function() {
            return this._children
        },
        mount: function(t) {
            if (t) {
                if (t === this) return this.log("Cannot mount an object to itself!", "error"), this;
                if (t._children) {
                    if (this.id(), this._parent) {
                        if (this._parent === t) return this;
                        this.unMount()
                    }
                    return this._parent = t, !this._ignoreCamera && this._parent._ignoreCamera && (this._ignoreCamera = this._parent._ignoreCamera), this._parent._streamRoomId && (this._streamRoomId = this._parent._streamRoomId), t._children.push(this), this._parent._childMounted(this), t.updateTransform && (t.updateTransform(), t.aabb(!0)), t._compositeCache ? this._compositeParent = !0 : delete this._compositeParent, this._mounted(this._parent), this.emit("mounted", this._parent), this
                }
                return this.log("Cannot mount object because it has no _children array! If you are mounting to a custom class, ensure that you have called the prototype.init() method of your super-class during the init of your custom class.", "warning"), !1
            }
            this.log("Cannot mount non-existent object!", "error")
        },
        unMount: function() {
            if (this._parent) {
                var t = this._parent._children,
                    e = t.indexOf(this),
                    i = this._parent;
                return e > -1 ? (t.splice(e, 1), this._parent._childUnMounted(this), this._parent = null, this._unMounted(i), this) : !1
            }
            return !1
        },
        hasParent: function(t, e) {
            var i = !1;
            return !e && this._hasParent && this._hasParent[t] !== void 0 ? this._hasParent[t] : (this._parent && (i = this._parent.id() === t ? !0 : this._parent.hasParent(t, e)), this._hasParent = this._hasParent || {}, this._hasParent[t] = i, i)
        },
        clone: function(options) {
            options === void 0 && (options = {}), options.id === void 0 && (options.id = !1), options.mount === void 0 && (options.mount = !1), options.transform === void 0 && (options.transform = !0);
            var newObject = eval(this.stringify(options));
            return newObject
        },
        mode: function(t) {
            return t !== void 0 ? (this._mode = t, this) : this._mode
        },
        isometric: function(t) {
            return t === !0 ? (this._mode = 1, this) : t === !1 ? (this._mode = 0, this) : this._mode === 1
        },
        isometricMounts: function(t) {
            return t === !0 ? (this._mountMode = 1, this) : t === !1 ? (this._mountMode = 0, this) : this._mountMode === 1
        },
        indestructible: function(t) {
            return t !== void 0 ? (this._indestructible = t, this) : this._indestructible
        },
        layer: function(t) {
            return t !== void 0 ? (this._layer = t, this) : this._layer
        },
        depth: function(t) {
            return t !== void 0 ? (this._depth = t, this) : this._depth
        },
        destroyChildren: function() {
            var t, e = this._children;
            if (e) {
                t = e.length;
                while (t--) e[t].destroy()
            }
            return this._children = [], this
        },
        destroyBehaviours: function() {
            delete this._updateBehaviours, delete this._tickBehaviours
        },
        destroyComponents: function() {
            var t, e = this._components;
            if (e) {
                t = e.length;
                while (t--) e[t].destroy && e[t].destroy()
            }
            return delete this._components, this
        },
        depthSortMode: function(t) {
            return t !== void 0 ? (this._depthSortMode = t, this) : this._depthSortMode
        },
        depthSortChildren: function() {
            if (this._depthSortMode !== -1) {
                var t, e, i, n, s = this._children;
                if (s && (t = s.length, t > 1))
                    if (this._mountMode === 1) {
                        if (this._depthSortMode === 0) {
                            for (e = {
                                    adj: [],
                                    c: [],
                                    p: [],
                                    order: [],
                                    order_ind: t - 1
                                }, i = 0; t > i; ++i)
                                for (e.c[i] = 0, e.p[i] = -1, n = i + 1; t > n; ++n) e.adj[i] = e.adj[i] || [], e.adj[n] = e.adj[n] || [], s[i]._inView && s[n]._inView && s[i]._projectionOverlap && s[n]._projectionOverlap && s[i]._projectionOverlap(s[n]) && (s[i].isBehind(s[n]) ? e.adj[n].push(i) : e.adj[i].push(n));
                            for (i = 0; t > i; ++i) e.c[i] === 0 && this._depthSortVisit(i, e);
                            for (i = 0; e.order.length > i; i++) s[e.order[i]].depth(i);
                            this._children.sort(function(t, e) {
                                var i = e._layer - t._layer;
                                return i === 0 ? e._depth - t._depth : i
                            })
                        }
                        if (this._depthSortMode === 1 && this._children.sort(function(t, e) {
                                var i = e._layer - t._layer;
                                return i === 0 ? t.isBehind(e) ? -1 : 1 : i
                            }), this._depthSortMode === 2) {
                            while (t--) e = s[t], n = e._translate, n && (e._depth = n.x + n.y + n.z);
                            this._children.sort(function(t, e) {
                                var i = e._layer - t._layer;
                                return i === 0 ? e._depth - t._depth : i
                            })
                        }
                    } else this._children.sort(function(t, e) {
                        var i = e._layer - t._layer;
                        return i === 0 ? e._depth - t._depth : i
                    })
            }
        },
        viewChecking: function(t) {
            return t !== void 0 ? (this._viewChecking = t, this) : this._viewChecking
        },
        viewCheckChildren: function() {
            if (ige._currentViewport) {
                var t, e = this._children,
                    i = e.length,
                    n = ige._currentViewport.viewArea();
                while (i--) t = e[i], t._inView = t._alwaysInView ? !0 : t.aabb ? n.intersects(t.aabb(!0)) ? !0 : !1 : !1
            }
            return this
        },
        update: function(t, e) {
            if (this._alive) {
                this._newBorn && (this._newBorn = !1);
                var i, n, s, o = this._children;
                if (o)
                    if (i = o.length, i && !ige._headless && (igeConfig.debug._timing ? (ige._timeSpentLastTick[this.id()] || (ige._timeSpentLastTick[this.id()] = {}), n = (new Date).getTime(), this.depthSortChildren(), s = (new Date).getTime() - n, ige._timeSpentLastTick[this.id()].depthSortChildren = s) : this.depthSortChildren()), igeConfig.debug._timing)
                        while (i--) n = (new Date).getTime(), o[i].update(t, e), s = (new Date).getTime() - n, o[i] && (ige._timeSpentInTick[o[i].id()] || (ige._timeSpentInTick[o[i].id()] = 0), ige._timeSpentLastTick[o[i].id()] || (ige._timeSpentLastTick[o[i].id()] = {}), ige._timeSpentInTick[o[i].id()] += s, ige._timeSpentLastTick[o[i].id()].tick = s);
                    else
                        while (i--) o[i].update(t, e)
            }
        },
        tick: function(t) {
            if (this._alive) {
                var e, i, n, s = this._children;
                if (this._viewChecking && this.viewCheckChildren(), s)
                    if (e = s.length, igeConfig.debug._timing)
                        while (e--) s[e] ? s[e]._newBorn || (t.save(), i = (new Date).getTime(), s[e].tick(t), n = (new Date).getTime() - i, s[e] && (ige._timeSpentInTick[s[e].id()] || (ige._timeSpentInTick[s[e].id()] = 0), ige._timeSpentLastTick[s[e].id()] || (ige._timeSpentLastTick[s[e].id()] = {}), ige._timeSpentInTick[s[e].id()] += n, ige._timeSpentLastTick[s[e].id()].tick = n), t.restore()) : this.log("Object _children is undefined for index " + e + " and _id: " + this._id, "error");
                    else
                        while (e--) s[e] ? s[e]._newBorn || (t.save(), s[e].tick(t), t.restore()) : this.log("Object _children is undefined for index " + e + " and _id: " + this._id, "error")
            }
        },
        _depthSortVisit: function(t, e) {
            var i, n, s = e.adj[t],
                o = s.length;
            for (e.c[t] = 1, i = 0; o > i; ++i) n = s[i], e.c[n] === 0 && (e.p[n] = t, this._depthSortVisit(n, e));
            e.c[t] = 2, e.order[e.order_ind] = t, --e.order_ind
        },
        _resizeEvent: function(t) {
            var e, i = this._children;
            if (i) {
                e = i.length;
                while (e--) i[e]._resizeEvent(t)
            }
        },
        _processUpdateBehaviours: function() {
            var t, e = this._updateBehaviours;
            if (e) {
                t = e.length;
                while (t--) e[t].method.apply(this, arguments)
            }
        },
        _processTickBehaviours: function() {
            var t, e = this._tickBehaviours;
            if (e) {
                t = e.length;
                while (t--) e[t].method.apply(this, arguments)
            }
        },
        _childMounted: function() {
            this._resizeEvent(null)
        },
        _childUnMounted: function() {},
        _mounted: function() {},
        _unMounted: function() {},
        destroy: function() {
            return this.unMount(), this._children && this.destroyChildren(), this.destroyComponents(), this.destroyBehaviours(), ige.unRegister(this), ige.categoryUnRegister(this), ige.groupUnRegister(this), this._alive = !1, delete this._eventListeners, this
        },
        objSave: function() {
            return {
                igeClass: this.classId(),
                data: this._objSaveReassign(this, [])
            }
        },
        objLoad: function(t) {
            this._objLoadReassign(this, t.data)
        },
        saveSpecialProp: function(t, e) {
            switch (e) {
                case "_id":
                    if (t._id) return {
                        _id: t._id
                    };
                    break;
                case "_parent":
                    if (t._parent) return {
                        _parent: t._parent.id()
                    };
                    break;
                case "_children":
                    if (t._children.length) {
                        var i, n, s = [];
                        for (i = 0; t._children.length > i; i++) n = t._children[i], s.push(n.objSave());
                        return {
                            _children: s
                        }
                    }
            }
            return void 0
        },
        loadSpecialProp: function(t, e) {
            switch (e) {
                case "_id":
                    return {
                        _id: t[e]
                    };
                case "_parent":
                    return {
                        _parent: t[e]
                    };
                case "_children":
                    return {
                        _children: t[e]
                    }
            }
            return void 0
        },
        loadGraph: function(t) {
            if (t.igeClass && t.data) {
                var e, i, n, s, o = ige.newClassInstance(t.igeClass);
                if (o.objLoad(t), o._parent && (s = o._parent, delete o._parent), o._id && (e = o._id, delete o._id, o.id(e)), o._children && o._children.length)
                    for (i = o._children, o._children = [], n = 0; i.length > n; n++) o.loadGraph(i[n]);
                o.mount(this)
            }
        },
        _objSaveReassign: function(t, e) {
            var i, n, s, o, r, a = this._specialProp;
            if (typeof t != "object" || t instanceof Array) return t;
            i = {};
            for (r in t)
                if (t.hasOwnProperty(r))
                    if (typeof t[r] == "object") {
                        if (a.indexOf(r) === -1) n = e.indexOf(t[r]), n > -1 ? (i[r] = "{ref:" + n + "}", this.log("Possible circular reference for property " + r)) : (e.push(t[r]), i[r] = this._objSaveReassign(t[r], e));
                        else if (s = this.saveSpecialProp(t, r))
                            if (typeof s != "object" || s instanceof Array) i[r] = s;
                            else
                                for (o in s) s.hasOwnProperty(o) && (i[o] = s[o])
                    } else i[r] = t[r];
            return i
        },
        _objLoadReassign: function(t, e) {
            var i, n, s, o = this._specialProp;
            for (s in e)
                if (e.hasOwnProperty(s))
                    if (o.indexOf(s) === -1) typeof e[s] == "object" && t[s] ? this._objLoadReassign(t[s], e[s]) : t[s] = e[s];
                    else if (i = this.loadSpecialProp(e, s))
                if (typeof i != "object" || i instanceof Array) t[s] = i;
                else
                    for (n in i) i.hasOwnProperty(n) && (t[n] = i[n])
        },
        stringify: function(t) {
            t === void 0 && (t = {});
            var e = "new " + this.classId() + "()";
            return t.id !== !1 && (e += ".id('" + this.id() + "')"), t.mount !== !1 && this.parent() && (e += ".mount(ige.$('" + this.parent().id() + "'))"), e += this._stringify(t)
        },
        _stringify: function(t) {
            t === void 0 && (t = {});
            var e, i = "";
            for (e in this)
                if (this.hasOwnProperty(e) && this[e] !== void 0) switch (e) {
                    case "_category":
                        i += ".category(" + this.category() + ")";
                        break;
                    case "_drawBounds":
                        i += ".drawBounds(" + this.drawBounds() + ")";
                        break;
                    case "_drawBoundsData":
                        i += ".drawBoundsData(" + this.drawBoundsData() + ")";
                        break;
                    case "_drawMouse":
                        i += ".drawMouse(" + this.drawMouse() + ")";
                        break;
                    case "_mode":
                        i += ".mode(" + this.mode() + ")";
                        break;
                    case "_isometricMounts":
                        i += ".isometricMounts(" + this.isometricMounts() + ")";
                        break;
                    case "_indestructible":
                        i += ".indestructible(" + this.indestructible() + ")";
                        break;
                    case "_layer":
                        i += ".layer(" + this.layer() + ")";
                        break;
                    case "_depth":
                        i += ".depth(" + this.depth() + ")"
                }
                return i
        }
    });
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_59);
var $i_60 = $i_59.extend({
    classId: "$i_60",
    init: function() {
        $i_59.prototype.init.call(this), this._specialProp.push("_texture"), this._specialProp.push("_eventListeners"), this._specialProp.push("_aabb"), this._anchor = new $i_4(0, 0), this._renderPos = {
            x: 0,
            y: 0
        }, this._computedOpacity = 1, this._opacity = 1, this._cell = 1, this._deathTime = void 0, this._bornTime = ige._currentTime, this._translate = new $i_5(0, 0, 0), this._oldTranslate = new $i_5(0, 0, 0), this._rotate = new $i_5(0, 0, 0), this._scale = new $i_5(1, 1, 1), this._origin = new $i_5(.5, .5, .5), this._bounds2d = new $i_4(40, 40), this._bounds3d = new $i_5(0, 0, 0), this._oldBounds2d = new $i_4(40, 40), this._oldBounds3d = new $i_5(0, 0, 0), this._highlight = !1, this._mouseEventsActive = !1, this._velocity = new $i_5(0, 0, 0), this._localMatrix = new $i_8, this._worldMatrix = new $i_8, this._oldWorldMatrix = new $i_8, this._inView = !0, this._hidden = !1, this.streamSections(["transform"])
    },
    show: function() {
        return this._hidden = !1, this
    },
    hide: function() {
        return this._hidden = !0, this
    },
    isVisible: function() {
        return this._hidden === !1
    },
    isHidden: function() {
        return this._hidden === !0
    },
    cache: function(t) {
        if (t !== void 0) {
            if (this._cache = t, t) {
                this._cacheCanvas = ige.isClient ? document.createElement("canvas") : new $i_49, this._cacheCtx = this._cacheCanvas.getContext("2d"), this._cacheDirty = !0;
                var e = this._cacheSmoothing !== void 0 ? this._cacheSmoothing : ige._globalSmoothing;
                e ? (this._cacheCtx.imageSmoothingEnabled = !0, this._cacheCtx.mozImageSmoothingEnabled = !0) : (this._cacheCtx.imageSmoothingEnabled = !1, this._cacheCtx.mozImageSmoothingEnabled = !1), this.compositeCache() && this.compositeCache(!1)
            } else delete this._cacheCanvas;
            return this
        }
        return this._cache
    },
    cacheSmoothing: function(t) {
        return t !== void 0 ? (this._cacheSmoothing = t, this) : this._cacheSmoothing
    },
    compositeCache: function(t) {
        if (ige.isClient) {
            if (t !== void 0) {
                if (t) {
                    this.cache(!1), this._cacheCanvas = document.createElement("canvas"), this._cacheCtx = this._cacheCanvas.getContext("2d"), this._cacheDirty = !0;
                    var e = this._cacheSmoothing !== void 0 ? this._cacheSmoothing : ige._globalSmoothing;
                    e ? (this._cacheCtx.imageSmoothingEnabled = !0, this._cacheCtx.webkitImageSmoothingEnabled = !0, this._cacheCtx.mozImageSmoothingEnabled = !0) : (this._cacheCtx.imageSmoothingEnabled = !1, this._cacheCtx.webkitImageSmoothingEnabled = !1, this._cacheCtx.mozImageSmoothingEnabled = !1)
                }
                return this._children.each(function() {
                    t ? this._compositeParent = !0 : delete this._compositeParent
                }), this._compositeCache = t, this
            }
            return this._compositeCache
        }
        return this
    },
    cacheDirty: function(t) {
        return t !== void 0 ? (this._cacheDirty = t, t && this._compositeParent && this._parent && (this._parent.cacheDirty(t), this._cache || this._compositeCache || (this._cacheDirty = !1)), this) : this._cacheDirty
    },
    mousePos: function(t) {
        if (t = t || ige._currentViewport) {
            var e = t._mousePos.clone();
            return this._ignoreCamera, e.x += t._translate.x, e.y += t._translate.y, this._transformPoint(e), e
        }
        return new $i_5(0, 0, 0)
    },
    mousePosAbsolute: function(t) {
        if (t = t || ige._currentViewport) {
            var e = t._mousePos.clone();
            return this._transformPoint(e), e
        }
        return new $i_5(0, 0, 0)
    },
    mousePosWorld: function(t) {
        t = t || ige._currentViewport;
        var e = this.mousePos(t);
        return this.localToWorldPoint(e, t), this._ignoreCamera, e
    },
    rotateToPoint: function(t) {
        var e = this.worldPosition();
        return this.rotateTo(this._rotate.x, this._rotate.y, Math.atan2(e.y - t.y, e.x - t.x) - this._parent._rotate.z + Math.radians(270)), this
    },
    backgroundPattern: function(t, e, i, n) {
        return t !== void 0 ? (this._backgroundPattern = t, this._backgroundPatternRepeat = e || "repeat", this._backgroundPatternTrackCamera = i, this._backgroundPatternIsoTile = n, this._backgroundPatternFill = null, this) : this._backgroundPattern
    },
    widthByTile: function(t, e) {
        if (this._parent && this._parent._tileWidth !== void 0 && this._parent._tileHeight !== void 0) {
            var i, n = this._mode === 0 ? this._parent._tileWidth : this._parent._tileWidth * 2;
            this.width(t * n), e && (this._texture ? (i = this._texture._sizeX / this._bounds2d.x, this.height(this._texture._sizeY / i)) : this.log("Cannot set height based on texture aspect ratio and new width because no texture is currently assigned to the entity!", "error"))
        } else this.log("Cannot set width by tile because the entity is not currently mounted to a tile map or the tile map has no tileWidth or tileHeight values.", "warning");
        return this
    },
    heightByTile: function(t, e) {
        if (this._parent && this._parent._tileWidth !== void 0 && this._parent._tileHeight !== void 0) {
            var i, n = this._mode === 0 ? this._parent._tileHeight : this._parent._tileHeight * 2;
            this.height(t * n), e && (this._texture ? (i = this._texture._sizeY / this._bounds2d.y, this.width(this._texture._sizeX / i)) : this.log("Cannot set width based on texture aspect ratio and new height because no texture is currently assigned to the entity!", "error"))
        } else this.log("Cannot set height by tile because the entity is not currently mounted to a tile map or the tile map has no tileWidth or tileHeight values.", "warning");
        return this
    },
    occupyTile: function(t, e, i, n) {
        if (this._parent && this._parent.$i_67)
            if (t !== void 0 && e !== void 0) this._parent.occupyTile(t, e, i, n, this);
            else {
                var s = new $i_5(this._translate.x - (this._tileWidth / 2 - .5) * this._parent._tileWidth, this._translate.y - (this._tileHeight / 2 - .5) * this._parent._tileHeight, 0),
                    o = this._parent.pointToTile(s);
                this._parent._mountMode === 1 && o.thisToIso(), this._parent.occupyTile(o.x, o.y, this._tileWidth, this._tileHeight, this)
            }
        return this
    },
    unOccupyTile: function(t, e, i, n) {
        if (this._parent && this._parent.$i_67)
            if (t !== void 0 && e !== void 0) this._parent.unOccupyTile(t, e, i, n);
            else {
                var s = new $i_5(this._translate.x - (this._tileWidth / 2 - .5) * this._parent._tileWidth, this._translate.y - (this._tileHeight / 2 - .5) * this._parent._tileHeight, 0),
                    o = this._parent.pointToTile(s);
                this._parent._mountMode === 1 && o.thisToIso(), this._parent.unOccupyTile(o.x, o.y, this._tileWidth, this._tileHeight)
            }
        return this
    },
    overTiles: function() {
        if (this._parent && this._parent.$i_67) {
            var t, e, i = this._tileWidth || 1,
                n = this._tileHeight || 1,
                s = this._parent.pointToTile(this._translate),
                o = [];
            for (t = 0; i > t; t++)
                for (e = 0; n > e; e++) o.push(new $i_5(s.x + t, s.y + e, 0));
            return o
        }
    },
    anchor: function(t, e) {
        return t !== void 0 && e !== void 0 ? (this._anchor = new $i_4(t, e), this) : this._anchor
    },
    width: function(t, e) {
        if (t !== void 0) {
            if (e) {
                var i = t / this._bounds2d.x;
                this.height(this._bounds2d.y * i)
            }
            return this._bounds2d.x = t, this._bounds2d.x2 = t / 2, this
        }
        return this._bounds2d.x
    },
    height: function(t, e) {
        if (t !== void 0) {
            if (e) {
                var i = t / this._bounds2d.y;
                this.width(this._bounds2d.x * i)
            }
            return this._bounds2d.y = t, this._bounds2d.y2 = t / 2, this
        }
        return this._bounds2d.y
    },
    bounds2d: function(t, e) {
        return t !== void 0 && e !== void 0 ? (this._bounds2d = new $i_4(t, e, 0), this) : (t !== void 0 && e === void 0 && (this._bounds2d = new $i_4(t.x, t.y)), this._bounds2d)
    },
    bounds3d: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._bounds3d = new $i_5(t, e, i), this) : this._bounds3d
    },
    size3d: function() {
        this.log("size3d has been renamed to bounds3d but is exactly the same so please search/replace your code to update calls.", "warning")
    },
    lifeSpan: function(t, e) {
        return t !== void 0 ? (this.deathTime(ige._currentTime + t, e), this) : this.deathTime() - ige._currentTime
    },
    deathTime: function(t, e) {
        return t !== void 0 ? (this._deathTime = t, e !== void 0 && (this._deathCallBack = e), this) : this._deathTime
    },
    opacity: function(t) {
        return t !== void 0 ? (this._opacity = t, this) : this._opacity
    },
    noAabb: function(t) {
        return t !== void 0 ? (this._noAabb = t, this) : this._noAabb
    },
    texture: function(t) {
        return t !== void 0 ? (this._texture = t, this) : this._texture
    },
    cell: function(t) {
        return t > 0 || t === null ? (this._cell = t, this) : this._cell
    },
    cellById: function(t) {
        if (t !== void 0)
            if (this._texture) {
                var e, i = this._texture,
                    n = i._cells;
                for (e = 1; n.length > e; e++)
                    if (n[e][4] === t) return this.cell(e), this;
                this.log('Could not find the cell id "' + t + '" in the assigned entity texture ' + i.id() + ', please check your sprite sheet (texture) cell definition to ensure the cell id "' + t + '" has been assigned to a cell!', "error")
            } else this.log("Cannot assign cell index from cell ID until an $i_56 has been set as the texture for this entity. Please set the texture before calling cellById().", "error");
        return this._cell
    },
    dimensionsFromTexture: function(t) {
        return this._texture && (t === void 0 ? (this.width(this._texture._sizeX), this.height(this._texture._sizeY)) : (this.width(Math.floor(this._texture._sizeX / 100 * t)), this.height(Math.floor(this._texture._sizeY / 100 * t))), this.localAabb(!0)), this
    },
    dimensionsFromCell: function(t) {
        return this._texture && this._texture._cells && this._texture._cells.length && (t === void 0 ? (this.width(this._texture._cells[this._cell][2]), this.height(this._texture._cells[this._cell][3])) : (this.width(Math.floor(this._texture._cells[this._cell][2] / 100 * t)), this.height(Math.floor(this._texture._cells[this._cell][3] / 100 * t))), this.localAabb(!0)), this
    },
    highlight: function(t) {
        return t !== void 0 ? (this._highlight = t, this) : this._highlight
    },
    worldPosition: function() {
        return new $i_5(this._worldMatrix.matrix[2], this._worldMatrix.matrix[5], 0)
    },
    worldRotationZ: function() {
        return this._worldMatrix.rotationRadians()
    },
    localToWorld: function(t, e, i) {
        e = e || ige._currentViewport, this._adjustmentMatrix && this._worldMatrix.multiply(this._adjustmentMatrix), i ? this._localMatrix.transform(t, this) : this._worldMatrix.transform(t, this), this._ignoreCamera
    },
    localToWorldPoint: function(t, e) {
        e = e || ige._currentViewport, this._worldMatrix.transform([t], this)
    },
    screenPosition: function() {
        return new $i_5(Math.floor((this._worldMatrix.matrix[2] - ige._currentCamera._translate.x) * ige._currentCamera._scale.x + ige._bounds2d.x2), Math.floor((this._worldMatrix.matrix[5] - ige._currentCamera._translate.y) * ige._currentCamera._scale.y + ige._bounds2d.y2), 0)
    },
    localIsoBoundsPoly: function() {},
    localBounds3dPolygon: function(t) {
        if (this._bounds3dPolygonDirty || !this._localBounds3dPolygon || t) {
            var e = this._bounds3d,
                i = new $i_6,
                n = Math.toIso(+e.x2, -e.y2, -e.z2),
                s = Math.toIso(+e.x2, +e.y2, -e.z2),
                o = Math.toIso(-e.x2, +e.y2, -e.z2),
                r = Math.toIso(-e.x2, -e.y2, e.z2),
                a = Math.toIso(+e.x2, -e.y2, e.z2),
                h = Math.toIso(-e.x2, +e.y2, e.z2);
            i.addPoint(r.x, r.y).addPoint(a.x, a.y).addPoint(n.x, n.y).addPoint(s.x, s.y).addPoint(o.x, o.y).addPoint(h.x, h.y).addPoint(r.x, r.y), this._localBounds3dPolygon = i, this._bounds3dPolygonDirty = !1
        }
        return this._localBounds3dPolygon
    },
    isoBoundsPoly: function() {},
    bounds3dPolygon: function(t) {
        if (this._bounds3dPolygonDirty || !this._bounds3dPolygon || t) {
            var e = this.localBounds3dPolygon(t).clone();
            this.localToWorld(e._poly), this._bounds3dPolygon = e
        }
        return this._bounds3dPolygon
    },
    mouseInIsoBounds: function() {},
    mouseInBounds3d: function(t) {
        var e = this.localBounds3dPolygon(t),
            i = this.mousePos();
        return e.pointInside(i)
    },
    aabb: function(t, e) {
        if (this._aabbDirty || !this._aabb || t) {
            var i, n, s, o, r, a, h, d, l, u, c = new $i_6,
                _ = this._anchor,
                g = _.x,
                p = _.y;
            a = this._bounds2d, h = a.x2, d = a.y2, l = h, u = d, c.addPoint(-l + g, -u + p), c.addPoint(l + g, -u + p), c.addPoint(l + g, u + p), c.addPoint(-l + g, u + p), this._renderPos = {
                x: -l + g,
                y: -u + p
            }, this.localToWorld(c._poly, null, e), i = Math.min(c._poly[0].x, c._poly[1].x, c._poly[2].x, c._poly[3].x), n = Math.min(c._poly[0].y, c._poly[1].y, c._poly[2].y, c._poly[3].y), s = Math.max(c._poly[0].x, c._poly[1].x, c._poly[2].x, c._poly[3].x), o = Math.max(c._poly[0].y, c._poly[1].y, c._poly[2].y, c._poly[3].y), r = new $i_7(i, n, s - i, o - n), this._aabb = r, this._aabbDirty = !1
        }
        return this._aabb
    },
    localAabb: function(t) {
        if (!this._localAabb || t) {
            var e = this.aabb();
            this._localAabb = new $i_7(-Math.floor(e.width / 2), -Math.floor(e.height / 2), Math.floor(e.width), Math.floor(e.height))
        }
        return this._localAabb
    },
    compositeAabb: function(t) {
        var e, i, n = this._children;
        if (i = t ? this.aabb(!0, t).clone() : this.aabb().clone(), n) {
            e = n.length;
            while (e--) i.thisCombineRect(n[e].compositeAabb(t))
        }
        return i
    },
    compositeStream: function(t) {
        return t !== void 0 ? (this._compositeStream = t, this) : this._compositeStream
    },
    _childMounted: function(t) {
        this.compositeStream() && (t.compositeStream(!0), t.streamMode(this.streamMode()), t.streamControl(this.streamControl())), $i_59.prototype._childMounted.call(this, t), this.compositeCache() && this.cacheDirty(!0)
    },
    _swapVars: function(t, e) {
        return [e, t]
    },
    _internalsOverlap: function(t, e, i, n) {
        var s;
        return t > e && (s = this._swapVars(t, e), t = s[0], e = s[1]), i > n && (s = this._swapVars(i, n), i = s[0], n = s[1]), t > i && (s = this._swapVars(t, i), t = s[0], i = s[1], s = this._swapVars(e, n), e = s[0], n = s[1]), e > i
    },
    _projectionOverlap: function(t) {
        var e = this._bounds3d,
            i = {
                x: this._translate.x - e.x / 2,
                y: this._translate.y - e.y / 2,
                z: this._translate.z - e.z
            },
            n = {
                x: this._translate.x + e.x / 2,
                y: this._translate.y + e.y / 2,
                z: this._translate.z + e.z
            },
            s = t._bounds3d,
            o = {
                x: t._translate.x - s.x / 2,
                y: t._translate.y - s.y / 2,
                z: t._translate.z - s.z
            },
            r = {
                x: t._translate.x + s.x / 2,
                y: t._translate.y + s.y / 2,
                z: t._translate.z + s.z
            };
        return this._internalsOverlap(i.x - n.y, n.x - i.y, o.x - r.y, r.x - o.y) && this._internalsOverlap(i.x - n.z, n.x - i.z, o.x - r.z, r.x - o.z) && this._internalsOverlap(i.z - n.y, n.z - i.y, o.z - r.y, r.z - o.y)
    },
    isBehind: function(t) {
        var e = this._bounds3d,
            i = t._bounds3d,
            n = this._translate.clone(),
            s = t._translate.clone();
        (this._origin.x !== .5 || this._origin.y !== .5) && (n.x += this._bounds2d.x * (.5 - this._origin.x), n.y += this._bounds2d.y * (.5 - this._origin.y)), (t._origin.x !== .5 || t._origin.y !== .5) && (s.x += t._bounds2d.x * (.5 - t._origin.x), s.y += t._bounds2d.y * (.5 - t._origin.y));
        var o = n.x,
            r = n.y,
            a = s.x,
            h = s.y,
            d = new $i_5(o - e.x / 2, r - e.y / 2, this._translate.z),
            l = new $i_5(o + e.x / 2, r + e.y / 2, this._translate.z + e.z),
            u = new $i_5(a - i.x / 2, h - i.y / 2, t._translate.z),
            c = new $i_5(a + i.x / 2, h + i.y / 2, t._translate.z + i.z);
        return l.x > u.x ? c.x > d.x ? l.y > u.y ? c.y > d.y ? l.z > u.z ? c.z > d.z ? o + r + this._translate.z > a + h + t._translate.z : !0 : !1 : !0 : !1 : !0 : !1
    },
    mouseEventsActive: function(t) {
        return t !== void 0 ? (this._mouseEventsActive = t, this) : this._mouseEventsActive
    },
    ignoreCameraComposite: function(t) {
        var e, i = this._children,
            n = i.length;
        for (this._ignoreCamera = t, e = 0; n > e; e++) i[e].ignoreCameraComposite && i[e].ignoreCameraComposite(t)
    },
    newFrame: function() {
        return ige._frameAlternator !== this._frameAlternatorCurrent
    },
    _transformContext: function(t, e) {
        t.globalAlpha = this._computedOpacity = this._parent ? this._parent._computedOpacity * this._opacity : this._opacity, e ? this._localMatrix.getInverse().transformRenderingContext(t) : this._localMatrix.transformRenderingContext(t)
    },
    mouseAlwaysInside: function(t) {
        return t !== void 0 ? (this._mouseAlwaysInside = t, this) : this._mouseAlwaysInside
    },
    update: function(t, e) {
        this._deathTime === void 0 || this._deathTime > ige._tickStart ? this._bornTime !== void 0 && this._bornTime > ige._currentTime ? (this._birthMount = this._parent.id(), this.unMount(), ige.spawnQueue(this)) : (delete this._streamDataCache, this._processUpdateBehaviours(t, e), (this._velocity.x || this._velocity.y) && (this._translate.x += this._velocity.x / 16 * e, this._translate.y += this._velocity.y / 16 * e), this._timeStream.length && this._processInterpolate(ige._tickStart - ige.network.stream._renderLatency), this.updateTransform(), !this._noAabb && this._aabbDirty && this.aabb(), this._oldTranslate = this._translate.clone(), this._frameAlternatorCurrent = ige._frameAlternator) : (this._deathCallBack && (this._deathCallBack.apply(this), delete this._deathCallback), this.destroy()), $i_59.prototype.update.call(this, t, e)
    },
    tick: function(t, e) {
        this._hidden || !this._inView || this._parent && !this._parent._inView || this._streamJustCreated || (this._processTickBehaviours(t), this._mouseEventsActive && (this._processTriggerHitTests() ? ige.input.queueEvent(this, this._mouseInTrigger, null) : ige.input.mouseMove && this._handleMouseOut(ige.input.mouseMove)), this._dontRender || (this._cache || this._compositeCache ? (this._cacheDirty && this._refreshCache(e), this._renderCache(t)) : (e || this._transformContext(t), this._renderEntity(t, e))), this._streamMode === 1 && this.streamSync(), this._compositeCache ? this._cacheDirty && ($i_59.prototype.tick.call(this, this._cacheCtx), this._renderCache(t), this._cacheDirty = !1) : $i_59.prototype.tick.call(this, t))
    },
    _processTriggerHitTests: function() {
        var t, e;
        if (ige._currentViewport) {
            if (this._mouseAlwaysInside) return !0;
            if (t = this.mousePosWorld()) return e = this._triggerPolygon && this[this._triggerPolygon] ? this[this._triggerPolygon](t) : this._parent && this._parent._mountMode === 1 ? this.bounds3dPolygon() : this.aabb(), e.xyInside(t.x, t.y)
        }
        return !1
    },
    _refreshCache: function(t) {
        var e = this._cacheCanvas,
            i = this._cacheCtx;
        if (this._compositeCache) {
            var n = this.compositeAabb(!0);
            this._compositeAabbCache = n, n.width > 0 && n.height > 0 ? (e.width = Math.ceil(n.width), e.height = Math.ceil(n.height)) : (e.width = 2, e.height = 2), i.translate(-n.x, -n.y), this.emit("compositeReady")
        } else this._bounds2d.x > 0 && this._bounds2d.y > 0 ? (e.width = this._bounds2d.x, e.height = this._bounds2d.y) : (e.width = 1, e.height = 1), i.translate(this._bounds2d.x2, this._bounds2d.y2), this._cacheDirty = !1;
        t || this._transformContext(i), this._renderEntity(i, t)
    },
    _renderEntity: function(t) {
        if (this._opacity > 0) {
            this._backgroundPattern && (this._backgroundPatternFill || t && (this._backgroundPatternFill = t.createPattern(this._backgroundPattern.image, this._backgroundPatternRepeat)), this._backgroundPatternFill && (t.save(), t.fillStyle = this._backgroundPatternFill, t.translate(-this._bounds2d.x2, -this._bounds2d.y2), t.rect(0, 0, this._bounds2d.x, this._bounds2d.y), this._backgroundPatternTrackCamera && (t.translate(-ige._currentCamera._translate.x, -ige._currentCamera._translate.y), t.scale(ige._currentCamera._scale.x, ige._currentCamera._scale.y)), t.fill(), ige._drawCount++, this._backgroundPatternIsoTile && (t.translate(-Math.floor(this._backgroundPattern.image.width) / 2, -Math.floor(this._backgroundPattern.image.height / 2)), t.fill(), ige._drawCount++), t.restore()));
            var e = this._texture;
            e && e._loaded && (e.render(t, this, ige._tickDelta), this._highlight && (t.globalCompositeOperation = "lighter", e.render(t, this))), this._compositeCache && ige._currentViewport._drawCompositeBounds && (t.fillStyle = "rgba(0, 0, 255, 0.3)", t.fillRect(-this._bounds2d.x2, -this._bounds2d.y2, this._bounds2d.x, this._bounds2d.y), t.fillStyle = "#ffffff", t.fillText("Composite Entity", -this._bounds2d.x2, -this._bounds2d.y2 - 15), t.fillText(this.id(), -this._bounds2d.x2, -this._bounds2d.y2 - 5))
        }
    },
    _renderCache: function(t) {
        if (t.save(), this._compositeCache) {
            var e = this._compositeAabbCache;
            t.translate(this._bounds2d.x2 + e.x, this._bounds2d.y2 + e.y), this._parent && this._parent._ignoreCamera && ige._currentCamera
        }
        t.drawImage(this._cacheCanvas, -this._bounds2d.x2, -this._bounds2d.y2), ige._currentViewport._drawCompositeBounds && (t.fillStyle = "rgba(0, 255, 0, 0.5)", t.fillRect(-this._bounds2d.x2, -this._bounds2d.y2, this._cacheCanvas.width, this._cacheCanvas.height), t.fillStyle = "#ffffff", t.fillText("Composite Cache", -this._bounds2d.x2, -this._bounds2d.y2 - 15), t.fillText(this.id(), -this._bounds2d.x2, -this._bounds2d.y2 - 5)), ige._drawCount++, this._highlight && (t.globalCompositeOperation = "lighter", t.drawImage(this._cacheCanvas, -this._bounds2d.x2, -this._bounds2d.y2), ige._drawCount++), t.restore()
    },
    _transformPoint: function(t) {
        if (this._parent) {
            var e = new $i_8;
            e.copy(this._parent._worldMatrix), e.multiply(this._localMatrix), e.getInverse().transformCoord(t, this)
        } else this._localMatrix.transformCoord(t, this);
        return t
    },
    _transformPoints: function(t) {
        var e, i = t.length;
        while (i--)
            if (e = t[i], this._parent) {
                var n = new $i_8;
                n.copy(this._parent._worldMatrix), n.multiply(this._localMatrix), n.getInverse().transformCoord(e, this)
            } else this._localMatrix.transformCoord(e, this)
    },
    _stringify: function(t) {
        t === void 0 && (t = {});
        var e, i = $i_59.prototype._stringify.call(this, t);
        for (e in this)
            if (this.hasOwnProperty(e) && this[e] !== void 0) switch (e) {
                case "_opacity":
                    i += ".opacity(" + this.opacity() + ")";
                    break;
                case "_texture":
                    i += ".texture(ige.$('" + this.texture().id() + "'))";
                    break;
                case "_cell":
                    i += ".cell(" + this.cell() + ")";
                    break;
                case "_translate":
                    t.transform !== !1 && t.translate !== !1 && (i += ".translateTo(" + this._translate.x + ", " + this._translate.y + ", " + this._translate.z + ")");
                    break;
                case "_rotate":
                    t.transform !== !1 && t.rotate !== !1 && (i += ".rotateTo(" + this._rotate.x + ", " + this._rotate.y + ", " + this._rotate.z + ")");
                    break;
                case "_scale":
                    t.transform !== !1 && t.scale !== !1 && (i += ".scaleTo(" + this._scale.x + ", " + this._scale.y + ", " + this._scale.z + ")");
                    break;
                case "_origin":
                    t.origin !== !1 && (i += ".originTo(" + this._origin.x + ", " + this._origin.y + ", " + this._origin.z + ")");
                    break;
                case "_anchor":
                    t.anchor !== !1 && (i += ".anchor(" + this._anchor.x + ", " + this._anchor.y + ")");
                    break;
                case "_width":
                    i += typeof this.width() == "string" ? ".width('" + this.width() + "')" : ".width(" + this.width() + ")";
                    break;
                case "_height":
                    i += typeof this.height() == "string" ? ".height('" + this.height() + "')" : ".height(" + this.height() + ")";
                    break;
                case "_bounds3d":
                    i += ".bounds3d(" + this._bounds3d.x + ", " + this._bounds3d.y + ", " + this._bounds3d.z + ")";
                    break;
                case "_deathTime":
                    t.deathTime !== !1 && t.lifeSpan !== !1 && (i += ".deathTime(" + this.deathTime() + ")");
                    break;
                case "_highlight":
                    i += ".highlight(" + this.highlight() + ")"
            }
            return i
    },
    destroy: function() {
        this._alive = !1, this.emit("destroyed", this), $i_59.prototype.destroy.call(this)
    },
    saveSpecialProp: function(t, e) {
        switch (e) {
            case "_texture":
                if (t._texture) return {
                    _texture: t._texture.id()
                };
                break;
            default:
                return $i_59.prototype.saveSpecialProp.call(this, t, e)
        }
        return void 0
    },
    loadSpecialProp: function(t, e) {
        switch (e) {
            case "_texture":
                return {
                    _texture: ige.$(t[e])
                };
            default:
                return $i_59.prototype.loadSpecialProp.call(this, t, e)
        }
        return void 0
    },
    mouseMove: function(t) {
        return t ? (this._mouseMove = t, this._mouseEventsActive = !0, this) : this._mouseMove
    },
    mouseOver: function(t) {
        return t ? (this._mouseOver = t, this._mouseEventsActive = !0, this) : this._mouseOver
    },
    mouseOut: function(t) {
        return t ? (this._mouseOut = t, this._mouseEventsActive = !0, this) : this._mouseOut
    },
    mouseUp: function(t) {
        return t ? (this._mouseUp = t, this._mouseEventsActive = !0, this) : this._mouseUp
    },
    mouseDown: function(t) {
        return t ? (this._mouseDown = t, this._mouseEventsActive = !0, this) : this._mouseDown
    },
    mouseWheel: function(t) {
        return t ? (this._mouseWheel = t, this._mouseEventsActive = !0, this) : this._mouseWheel
    },
    mouseMoveOff: function() {
        return delete this._mouseMove, this
    },
    mouseOverOff: function() {
        return delete this._mouseOver, this
    },
    mouseOutOff: function() {
        return delete this._mouseOut, this
    },
    mouseUpOff: function() {
        return delete this._mouseUp, this
    },
    mouseDownOff: function() {
        return delete this._mouseDown, this
    },
    mouseWheelOff: function() {
        return delete this._mouseWheel, this
    },
    triggerPolygon: function(t) {
        return t !== void 0 ? (this._triggerPolygon = t, this) : this._triggerPolygon
    },
    mouseEventTrigger: function() {
        this.log("mouseEventTrigger is no longer in use. Please see triggerPolygon() instead.", "warning")
    },
    _handleMouseIn: function(t, e, i) {
        this._mouseStateOver || (this._mouseStateOver = !0, this._mouseOver && this._mouseOver(t, e, i), this.emit("mouseOver", [t, e, i])), this._mouseMove && this._mouseMove(t, e, i), this.emit("mouseMove", [t, e, i])
    },
    _handleMouseOut: function(t, e, i) {
        this._mouseStateDown = !1, this._mouseStateOver && (this._mouseStateOver = !1, this._mouseOut && this._mouseOut(t, e, i), this.emit("mouseOut", [t, e, i]))
    },
    _handleMouseWheel: function(t, e, i) {
        this._mouseWheel && this._mouseWheel(t, e, i), this.emit("mouseWheel", [t, e, i])
    },
    _handleMouseUp: function(t, e, i) {
        this._mouseStateDown = !1, this._mouseUp && this._mouseUp(t, e, i), this.emit("mouseUp", [t, e, i])
    },
    _handleMouseDown: function(t, e, i) {
        this._mouseStateDown || (this._mouseStateDown = !0, this._mouseDown && this._mouseDown(t, e, i), this.emit("mouseDown", [t, e, i]))
    },
    _mouseInTrigger: function(t, e) {
        ige.input.mouseMove && this._handleMouseIn(ige.input.mouseMove, t, e), ige.input.mouseDown && this._handleMouseDown(ige.input.mouseDown, t, e), ige.input.mouseUp && this._handleMouseUp(ige.input.mouseUp, t, e), ige.input.mouseWheel && this._handleMouseWheel(ige.input.mouseWheel, t, e)
    },
    debugTransforms: function() {
        return ige.traceSet(this._translate, "x", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._translate, "y", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._translate, "z", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._rotate, "x", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._rotate, "y", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._rotate, "z", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._scale, "x", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._scale, "y", 1, function(t) {
            return isNaN(t)
        }), ige.traceSet(this._scale, "z", 1, function(t) {
            return isNaN(t)
        }), this
    },
    velocityTo: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._velocity.x = t, this._velocity.y = e, this._velocity.z = i) : this.log("velocityTo() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    velocityBy: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._velocity.x += t, this._velocity.y += e, this._velocity.z += i) : this.log("velocityBy() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    translateBy: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._translate.x += t, this._translate.y += e, this._translate.z += i) : this.log("translateBy() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    translateTo: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._translate.x = t, this._translate.y = e, this._translate.z = i) : this.log("translateTo() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    translateToPoint: function(t) {
        return t !== void 0 ? (this._translate.x = t.x, this._translate.y = t.y, this._translate.z = t.z) : this.log("translateToPoint() called with a missing or undefined point parameter!", "error"), this._entity || this
    },
    translateToTile: function(t, e, i) {
        if (this._parent && this._parent._tileWidth !== void 0 && this._parent._tileHeight !== void 0) {
            var n;
            n = i !== void 0 ? i * this._parent._tileWidth : this._translate.z, this.translateTo(t * this._parent._tileWidth + this._parent._tileWidth / 2, e * this._parent._tileHeight + this._parent._tileWidth / 2, n)
        } else this.log("Cannot translate to tile because the entity is not currently mounted to a tile map or the tile map has no tileWidth or tileHeight values.", "warning");
        return this
    },
    translate: function() {
        return arguments.length && this.log("You called translate with arguments, did you mean translateTo or translateBy instead of translate?", "warning"), this.x = this._translateAccessorX, this.y = this._translateAccessorY, this.z = this._translateAccessorZ, this._entity || this
    },
    _translateAccessorX: function(t) {
        return t !== void 0 ? (this._translate.x = t, this._entity || this) : this._translate.x
    },
    _translateAccessorY: function(t) {
        return t !== void 0 ? (this._translate.y = t, this._entity || this) : this._translate.y
    },
    _translateAccessorZ: function(t) {
        return t !== void 0 ? (this._translate.z = t, this._entity || this) : this._translate.z
    },
    rotateBy: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._rotate.x += t, this._rotate.y += e, this._rotate.z += i) : this.log("rotateBy() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    rotateTo: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._rotate.x = t, this._rotate.y = e, this._rotate.z = i) : this.log("rotateTo() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    rotate: function() {
        return arguments.length && this.log("You called rotate with arguments, did you mean rotateTo or rotateBy instead of rotate?", "warning"), this.x = this._rotateAccessorX, this.y = this._rotateAccessorY, this.z = this._rotateAccessorZ, this._entity || this
    },
    _rotateAccessorX: function(t) {
        return t !== void 0 ? (this._rotate.x = t, this._entity || this) : this._rotate.x
    },
    _rotateAccessorY: function(t) {
        return t !== void 0 ? (this._rotate.y = t, this._entity || this) : this._rotate.y
    },
    _rotateAccessorZ: function(t) {
        return t !== void 0 ? (this._rotate.z = t, this._entity || this) : this._rotate.z
    },
    scaleBy: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._scale.x += t, this._scale.y += e, this._scale.z += i) : this.log("scaleBy() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    scaleTo: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._scale.x = t, this._scale.y = e, this._scale.z = i) : this.log("scaleTo() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    scale: function() {
        return arguments.length && this.log("You called scale with arguments, did you mean scaleTo or scaleBy instead of scale?", "warning"), this.x = this._scaleAccessorX, this.y = this._scaleAccessorY, this.z = this._scaleAccessorZ, this._entity || this
    },
    _scaleAccessorX: function(t) {
        return t !== void 0 ? (this._scale.x = t, this._entity || this) : this._scale.x
    },
    _scaleAccessorY: function(t) {
        return t !== void 0 ? (this._scale.y = t, this._entity || this) : this._scale.y
    },
    _scaleAccessorZ: function(t) {
        return t !== void 0 ? (this._scale.z = t, this._entity || this) : this._scale.z
    },
    originBy: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._origin.x += t, this._origin.y += e, this._origin.z += i) : this.log("originBy() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    originTo: function(t, e, i) {
        return t !== void 0 && e !== void 0 && i !== void 0 ? (this._origin.x = t, this._origin.y = e, this._origin.z = i) : this.log("originTo() called with a missing or undefined x, y or z parameter!", "error"), this._entity || this
    },
    origin: function() {
        return this.x = this._originAccessorX, this.y = this._originAccessorY, this.z = this._originAccessorZ, this._entity || this
    },
    _originAccessorX: function(t) {
        return t !== void 0 ? (this._origin.x = t, this._entity || this) : this._origin.x
    },
    _originAccessorY: function(t) {
        return t !== void 0 ? (this._origin.y = t, this._entity || this) : this._origin.y
    },
    _originAccessorZ: function(t) {
        return t !== void 0 ? (this._origin.z = t, this._entity || this) : this._origin.z
    },
    _rotatePoint: function(t, e, i) {
        var n = Math.cos(e),
            s = Math.sin(e);
        return {
            x: i.x + (t.x - i.x) * n + (t.y - i.y) * s,
            y: i.y - (t.x - i.x) * s + (t.y - i.y) * n
        }
    },
    updateTransform: function() {
        if (this._localMatrix.identity(), this._mode === 0 && this._localMatrix.multiply(this._localMatrix._newTranslate(this._translate.x, this._translate.y)), this._mode === 1) {
            var t = this._translateIso = new $i_5(this._translate.x, this._translate.y, this._translate.z + this._bounds3d.z / 2).toIso();
            this._parent && this._parent._bounds3d.z && (t.y += this._parent._bounds3d.z / 1.6), this._localMatrix.multiply(this._localMatrix._newTranslate(t.x, t.y))
        }
        return this._localMatrix.rotateBy(this._rotate.z), this._localMatrix.scaleBy(this._scale.x, this._scale.y), (this._origin.x !== .5 || this._origin.y !== .5) && this._localMatrix.translateBy(this._bounds2d.x * (.5 - this._origin.x), this._bounds2d.y * (.5 - this._origin.y)), this._parent ? (this._worldMatrix.copy(this._parent._worldMatrix), this._worldMatrix.multiply(this._localMatrix)) : this._worldMatrix.copy(this._localMatrix), this._worldMatrix.compare(this._oldWorldMatrix) ? this._transformChanged = !1 : (this._oldWorldMatrix.copy(this._worldMatrix), this._transformChanged = !0, this._aabbDirty = !0, this._bounds3dPolygonDirty = !0), this._oldBounds2d.compare(this._bounds2d) || (this._aabbDirty = !0, this._oldBounds2d.copy(this._bounds2d)), this._oldBounds3d.compare(this._bounds3d) || (this._bounds3dPolygonDirty = !0, this._oldBounds3d.copy(this._bounds3d)), this
    },
    disableInterpolation: function(t) {
        return t !== void 0 ? (this._disableInterpolation = t, this) : this._disableInterpolation
    },
    streamSections: function(t) {
        return t !== void 0 ? (this._streamSections = t, this) : this._streamSections
    },
    streamSectionsPush: function(t) {
        return this._streamSections = this._streamSections || [], this._streamSections.push(t), this
    },
    streamSectionsPull: function(t) {
        return this._streamSections && this._streamSections.pull(t), this
    },
    streamProperty: function(t, e) {
        return this._streamProperty = this._streamProperty || {}, t !== void 0 ? e !== void 0 ? (this._streamProperty[t] = e, this) : this._streamProperty[t] : void 0
    },
    streamSectionData: function(t, e, i) {
        switch (t) {
            case "transform":
                if (!e) return this._translate.toString(this._streamFloatPrecision) + "," + this._scale.toString(this._streamFloatPrecision) + "," + this._rotate.toString(this._streamFloatPrecision) + ",";
                var n = e.split(",");
                this._disableInterpolation || i || this._streamJustCreated ? (n[0] && (this._translate.x = parseFloat(n[0])), n[1] && (this._translate.y = parseFloat(n[1])), n[2] && (this._translate.z = parseFloat(n[2])), n[3] && (this._scale.x = parseFloat(n[3])), n[4] && (this._scale.y = parseFloat(n[4])), n[5] && (this._scale.z = parseFloat(n[5])), n[6] && (this._rotate.x = parseFloat(n[6])), n[7] && (this._rotate.y = parseFloat(n[7])), n[8] && (this._rotate.z = parseFloat(n[8])), this._compositeCache && this.cacheDirty(!0)) : (n[0] && (n[0] = parseFloat(n[0])), n[1] && (n[1] = parseFloat(n[1])), n[2] && (n[2] = parseFloat(n[2])), n[3] && (n[3] = parseFloat(n[3])), n[4] && (n[4] = parseFloat(n[4])), n[5] && (n[5] = parseFloat(n[5])), n[6] && (n[6] = parseFloat(n[6])), n[7] && (n[7] = parseFloat(n[7])), n[8] && (n[8] = parseFloat(n[8])), this._timeStream.push([ige.network.stream._streamDataTime + ige.network._latency, n]), this._timeStream.length > 10 && this._timeStream.shift());
                break;
            case "depth":
                if (e === void 0) return this.depth() + "";
                ige.isClient && this.depth(parseInt(e));
                break;
            case "layer":
                if (e === void 0) return this.layer() + "";
                ige.isClient && this.layer(parseInt(e));
                break;
            case "bounds2d":
                if (e === void 0) return this._bounds2d.x + "," + this._bounds2d.y + "";
                if (ige.isClient) {
                    var s = e.split(",");
                    this.bounds2d(parseFloat(s[0]), parseFloat(s[1]))
                }
                break;
            case "bounds3d":
                if (e === void 0) return this._bounds3d.x + "," + this._bounds3d.y + "," + this._bounds3d.z + "";
                if (ige.isClient) {
                    var s = e.split(",");
                    this.bounds3d(parseFloat(s[0]), parseFloat(s[1]), parseFloat(s[2]))
                }
                break;
            case "hidden":
                if (e === void 0) return this.isHidden() + "";
                ige.isClient && (e == "true" ? this.hide() : this.show());
                break;
            case "mount":
                if (e === void 0) {
                    var o = this.parent();
                    return o ? this.parent().id() : ""
                }
                if (ige.isClient)
                    if (e) {
                        var r = ige.$(e);
                        r && this.mount(r)
                    } else this.unMount();
                break;
            case "origin":
                if (e === void 0) return this._origin.x + "," + this._origin.y + "," + this._origin.z + "";
                if (ige.isClient) {
                    var s = e.split(",");
                    this.origin(parseFloat(s[0]), parseFloat(s[1]), parseFloat(s[2]))
                }
                break;
            case "props":
                var a, h, d;
                if (e === void 0) {
                    a = {};
                    for (d in this._streamProperty) this._streamProperty.hasOwnProperty(d) && (a[d] = this._streamProperty[d]);
                    return JSON.stringify(a)
                }
                if (ige.isClient) {
                    var l = JSON.parse(e);
                    for (d in l) h = !1, l.hasOwnProperty(d) && (this._streamProperty[d] != l[d] && (h = !0), this._streamProperty[d] = l[d], this.emit("streamPropChange", [d, l[d]]))
                }
        }
    },
    interpolateValue: function(t, e, i, n, s) {
        var o = e - t,
            r = s - i,
            a = n - i,
            h = a / r;
        return 0 > h ? h = 0 : h > 1 && (h = 1), o * h + t
    },
    _processInterpolate: function(t, e) {
        e || (e = 200);
        var i, n, s, o, r, a, h, d = this._timeStream,
            l = [],
            u = 1;
        while (d[u]) {
            if (d[u][0] > t) {
                i = d[u - 1], n = d[u];
                break
            }
            u++
        }
        n || i ? d.splice(0, u - 1) : d.length > 2 && t > d[d.length - 1][0] && (i = d[d.length - 2], n = d[d.length - 1], d.shift(), this.emit("interpolationLag")), n && i && (isNaN(i[0]) && (i[0] = n[0]), this._timeStreamPreviousData = i, this._timeStreamNextData = n, s = n[0] - i[0], o = t - i[0], this._timeStreamDataDelta = Math.floor(s), this._timeStreamOffsetDelta = Math.floor(o), r = o / s, this._timeStreamCurrentInterpolateTime = r, a = i[1], h = n[1], l[0] = this.interpolateValue(a[0], h[0], i[0], t, n[0]), l[1] = this.interpolateValue(a[1], h[1], i[0], t, n[0]), l[2] = this.interpolateValue(a[2], h[2], i[0], t, n[0]), l[3] = this.interpolateValue(a[3], h[3], i[0], t, n[0]), l[4] = this.interpolateValue(a[4], h[4], i[0], t, n[0]), l[5] = this.interpolateValue(a[5], h[5], i[0], t, n[0]), l[6] = this.interpolateValue(a[6], h[6], i[0], t, n[0]), l[7] = this.interpolateValue(a[7], h[7], i[0], t, n[0]), l[8] = this.interpolateValue(a[8], h[8], i[0], t, n[0]), this.translateTo(parseFloat(l[0]), parseFloat(l[1]), parseFloat(l[2])), this.scaleTo(parseFloat(l[3]), parseFloat(l[4]), parseFloat(l[5])), this.rotateTo(parseFloat(l[6]), parseFloat(l[7]), parseFloat(l[8])), this._lastUpdate = (new Date).getTime())
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_60);
var $i_61 = $i_60.extend([{
    extension: $i_45,
    overwrite: !0
}, {
    extension: $i_44,
    overwrite: !0
}], {
    classId: "$i_61",
    init: function() {
        $i_60.prototype.init.call(this), this._color = "#000000", this._borderLeftWidth = 0, this._borderTopWidth = 0, this._borderRightWidth = 0, this._borderBottomWidth = 0, this._borderTopLeftRadius = 0, this._borderTopRightRadius = 0, this._borderBottomRightRadius = 0, this._borderBottomLeftRadius = 0, this._backgroundPosition = {
            x: 0,
            y: 0
        }, this._paddingLeft = 0, this._paddingTop = 0, this._paddingRight = 0, this._paddingBottom = 0
    },
    disabled: function(t) {
        return t !== void 0 ? (this._disabled = t, this) : this._disabled
    },
    overflow: function(t) {
        return t !== void 0 ? (this._overflow = t, this) : this._overflow
    },
    _renderBackground: function(t) {
        var e, i, n, s, o = this._bounds2d;
        (this._backgroundColor || this._patternFill) && (e = -(o.x / 2) | 0, i = -(o.y / 2) | 0, n = o.x, s = o.y, t.save(), t.beginPath(), this._borderTopRightRadius || this._borderBottomRightRadius || this._borderBottomLeftRadius || this._borderTopLeftRadius ? (t.moveTo(e + this._borderTopLeftRadius, i), t.lineTo(e + n - this._borderTopRightRadius, i), this._borderTopRightRadius > 0 && t.arcTo(e + n, i, e + n, i + this._borderTopRightRadius, this._borderTopRightRadius), t.lineTo(e + n, i + s - this._borderBottomRightRadius), this._borderBottomRightRadius > 0 && t.arcTo(e + n, i + s, e + n - this._borderBottomRightRadius, i + s, this._borderBottomRightRadius), t.lineTo(e + this._borderBottomLeftRadius, i + s), this._borderBottomLeftRadius > 0 && t.arcTo(e, i + s, e, i + s - this._borderBottomLeftRadius, this._borderBottomLeftRadius), t.lineTo(e, i + this._borderTopLeftRadius), this._borderTopLeftRadius > 0 && t.arcTo(e, i, e + this._borderTopLeftRadius, i, this._borderTopLeftRadius), t.clip()) : t.rect(e, i, n, s), this._backgroundColor && (t.fillStyle = this._backgroundColor, t.fill()), this._patternFill && (t.translate(-(n / 2 | 0) + this._backgroundPosition.x, -(s / 2 | 0) + this._backgroundPosition.y), t.fillStyle = this._patternFill, t.fill()), t.restore())
    },
    _renderBorder: function(t) {
        var e, i = this._bounds2d,
            n = (-i.x2 | 0) + .5,
            s = (-i.y2 | 0) + .5,
            o = i.x - 1,
            r = i.y - 1;
        if (this._borderTopRightRadius || this._borderBottomRightRadius || this._borderBottomLeftRadius || this._borderTopLeftRadius || this._borderLeftWidth !== this._borderWidth || this._borderTopWidth !== this._borderWidth || this._borderRightWidth !== this._borderWidth || this._borderBottomWidth !== this._borderWidth) {
            var a = function() {
                t.stroke(), t.beginPath()
            };
            e = Math.PI / 180, t.beginPath(), this._borderTopWidth && (t.strokeStyle = this._borderTopColor, t.lineWidth = this._borderTopWidth, this._borderTopLeftRadius > 0 && t.arc(n + this._borderTopLeftRadius, s + this._borderTopLeftRadius, this._borderTopLeftRadius, 225 * e, 270 * e), t.moveTo(n + this._borderTopLeftRadius, s), t.lineTo(n + o - this._borderTopRightRadius, s), this._borderTopRightRadius > 0 && t.arc(n + o - this._borderTopRightRadius, s + this._borderTopRightRadius, this._borderTopRightRadius, -90 * e, -44 * e)), this._borderRightWidth && this._borderTopColor == this._borderRightColor && this._borderTopWidth == this._borderRightWidth || a(), this._borderRightWidth && (t.strokeStyle = this._borderRightColor, t.lineWidth = this._borderRightWidth, this._borderTopRightRadius > 0 && t.arc(n + o - this._borderTopRightRadius, s + this._borderTopRightRadius, this._borderTopRightRadius, -45 * e, 0), t.moveTo(n + o, s + this._borderTopRightRadius), t.lineTo(n + o, s + r - this._borderBottomRightRadius), this._borderBottomRightRadius > 0 && t.arc(n + o - this._borderBottomRightRadius, s + r - this._borderBottomRightRadius, this._borderTopRightRadius, 0, 46 * e)), this._borderBottomWidth && this._borderRightColor == this._borderBottomColor && this._borderRightWidth == this._borderBottomWidth || a(), this._borderBottomWidth && (t.strokeStyle = this._borderBottomColor, t.lineWidth = this._borderBottomWidth, this._borderBottomRightRadius > 0 && t.arc(n + o - this._borderBottomRightRadius, s + r - this._borderBottomRightRadius, this._borderBottomRightRadius, 45 * e, 90 * e), t.moveTo(n + o - this._borderBottomRightRadius, s + r), t.lineTo(n + this._borderBottomLeftRadius, s + r), this._borderBottomLeftRadius > 0 && t.arc(n + this._borderBottomLeftRadius, s + r - this._borderBottomLeftRadius, this._borderBottomLeftRadius, 90 * e, 136 * e)), this._borderLeftWidth && this._borderBottomColor == this._borderLeftColor && this._borderBottomWidth == this._borderLeftWidth || a(), this._borderLeftWidth && (t.strokeStyle = this._borderLeftColor, t.lineWidth = this._borderLeftWidth, this._borderBottomLeftRadius > 0 && t.arc(n + this._borderBottomLeftRadius, s + r - this._borderBottomLeftRadius, this._borderBottomLeftRadius, 135 * e, 180 * e), t.moveTo(n, s + r - this._borderBottomLeftRadius), t.lineTo(n, s + this._borderTopLeftRadius), this._borderTopLeftRadius > 0 && t.arc(n + this._borderTopLeftRadius, s + this._borderTopLeftRadius, this._borderTopLeftRadius, 180 * e, 226 * e)), t.stroke()
        } else t.strokeStyle = this._borderColor, t.lineWidth = this._borderWidth, t.strokeRect(n, s, o, r)
    },
    cell: function(t) {
        var e = $i_60.prototype.cell.call(this, t);
        return e === this && this._patternTexture && this.backgroundImage(this._patternTexture, this._patternRepeat), e
    },
    mount: function(t) {
        var e = $i_60.prototype.mount.call(this, t);
        return this._parent && (this._updateUiPosition && this._updateUiPosition(), this._children.length && this.updateUiChildren(), this._updateStyle && this._updateStyle()), e
    },
    tick: function(t, e) {
        if (!this._hidden && this._inView && (!this._parent || this._parent._inView) && !this._streamJustCreated) {
            if (e || this._transformContext(t), this._renderBackground(t), this._renderBorder(t), this._overflow === "hidden") {
                var i = this._bounds2d,
                    n = -(i.x / 2) + this._paddingLeft | 0,
                    s = -(i.y / 2) + this._paddingTop | 0,
                    o = i.x + this._paddingRight,
                    r = i.y + this._paddingBottom;
                t.rect(n, s, o, r), t.clip()
            }
            t.translate(this._paddingLeft, this._paddingTop), $i_60.prototype.tick.call(this, t, !0)
        }
    },
    _resizeEvent: function(t) {
        this._updateUiPosition && this._updateUiPosition(), this._updateStyle && this._updateStyle(), $i_60.prototype._resizeEvent.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_61);
var $i_62 = $i_61.extend({
    classId: "$i_62",
    init: function() {
        var t = this;
        $i_61.prototype.init.call(this), ige.ui.registerElement(this), this._focused = !1, this._allowHover = !0, this._allowFocus = !0, this._allowActive = !0;
        var e = function() {
            t._updateStyle()
        };
        this.on("mouseOver", function() {
            this._allowHover ? (e(), ige.input.stopPropagation()) : this._mouseStateOver = !1
        }), this.on("mouseOut", function() {
            this._allowHover ? (e(), ige.input.stopPropagation()) : this._mouseStateOver = !1
        }), this.on("mouseDown", function() {
            this._allowActive ? (e(), ige.input.stopPropagation()) : this._mouseStateDown = !1
        }), this.on("mouseUp", function() {
            this._allowFocus ? t.focus() ? ige.input.stopPropagation() : e() : this._allowActive && e()
        }), this.mouseEventsActive(!0)
    },
    allowHover: function(t) {
        return t !== void 0 ? (this._allowHover = t, this) : this._allowHover
    },
    allowFocus: function(t) {
        return t !== void 0 ? (this._allowFocus = t, this) : this._allowFocus
    },
    allowActive: function(t) {
        return t !== void 0 ? (this._allowActive = t, this) : this._allowActive
    },
    styleClass: function(t) {
        return t !== void 0 ? (t = "." + t, this._styleClass && this._styleClass !== t && ige.ui.unRegisterElementStyle(this), this._styleClass = t, ige.ui.registerElementStyle(this), this._updateStyle(), this) : this._styleClass
    },
    _updateStyle: function() {
        this._processStyle(this._classId), this._processStyle(this._styleClass), this._processStyle("#" + this._id), this._focused && (this._processStyle(this._classId, "focus"), this._processStyle(this._styleClass, "focus"), this._processStyle("#" + this._id, "focus")), this._mouseStateOver && (this._processStyle(this._classId, "hover"), this._processStyle(this._styleClass, "hover"), this._processStyle("#" + this._id, "hover")), this._mouseStateDown && (this._processStyle(this._classId, "active"), this._processStyle(this._styleClass, "active"), this._processStyle("#" + this._id, "active"))
    },
    _processStyle: function(t, e) {
        if (t) {
            e && (t += ":" + e);
            var i = ige.ui.style(t);
            i && this.applyStyle(i)
        }
    },
    applyStyle: function(t) {
        var e;
        if (t !== void 0)
            for (var i in t) t.hasOwnProperty(i) && typeof this[i] == "function" && (e = t[i] instanceof Array ? t[i] : [t[i]], this[i].apply(this, e));
        return this
    },
    focus: function() {
        return ige.ui.focus(this) ? (this._updateStyle(), !0) : !1
    },
    blur: function() {
        return ige.ui.blur(this) ? (this._updateStyle(), !0) : !1
    },
    focused: function() {
        return this._focused
    },
    value: function(t) {
        return t !== void 0 ? (this._value = t, this) : this._value
    },
    _mounted: function() {
        this._updateStyle()
    },
    destroy: function() {
        ige.ui.unRegisterElement(this), $i_61.prototype.destroy.call(this)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_62);
var $i_63 = $i_61.extend({
    classId: "$i_63",
    init: function() {
        $i_61.prototype.init.call(this), this._renderText = void 0, this._text = void 0, this._textAlignX = 1, this._textAlignY = 1, this._textLineSpacing = 0, this._nativeMode = !1, this.cache(!0)
    },
    width: function(t, e, i, n) {
        t !== void 0 && this._bounds2d.x !== t && this.clearCache();
        var s = $i_61.prototype.width.call(this, t, e, i, n);
        return this._autoWrap && this._applyAutoWrap(), s
    },
    height: function(t, e, i, n) {
        return t !== void 0 && this._bounds2d.y !== t && this.clearCache(), $i_61.prototype.height.call(this, t, e, i, n)
    },
    text: function(t) {
        if (t !== void 0) {
            var e = !1;
            return t += "", this._text !== t && (this.clearCache(), e = !0), this._text = t, this._autoWrap && e ? this._applyAutoWrap() : this._renderText = t, this
        }
        return this._text
    },
    bindData: function(t, e, i, n) {
        return t !== void 0 && e !== void 0 && (this._bindDataObject = t, this._bindDataProperty = e, this._bindDataPreText = i || "", this._bindDataPostText = n || ""), this
    },
    textAlignX: function(t) {
        return t !== void 0 ? (this._textAlignX !== t && this.clearCache(), this._textAlignX = t, this) : this._textAlignX
    },
    textAlignY: function(t) {
        return t !== void 0 ? (this._textAlignY !== t && this.clearCache(), this._textAlignY = t, this) : this._textAlignY
    },
    textLineSpacing: function(t) {
        return t !== void 0 ? (this._textLineSpacing !== t && this.clearCache(), this._textLineSpacing = t, this) : this._textLineSpacing
    },
    colorOverlay: function(t) {
        return t !== void 0 ? (this._colorOverlay !== t && this.clearCache(), this._colorOverlay = t, this) : this._colorOverlay
    },
    color: function(t) {
        return this.colorOverlay(t)
    },
    clearCache: function() {
        this._cache && this.cacheDirty(!0), this._texture && this._texture._caching && this._texture._cacheText[this._renderText] && delete this._texture._cacheText[this._renderText]
    },
    nativeFont: function(t) {
        if (t !== void 0) {
            this._nativeFont !== t && this.clearCache(), this._nativeFont = t;
            var e = new $i_54($i_58);
            return this.texture(e), this._nativeMode = !0, this
        }
        return this._nativeFont
    },
    nativeStroke: function(t) {
        return t !== void 0 ? (this._nativeStroke !== t && this.clearCache(), this._nativeStroke = t, this) : this._nativeStroke
    },
    nativeStrokeColor: function(t) {
        return t !== void 0 ? (this._nativeStrokeColor !== t && this.clearCache(), this._nativeStrokeColor = t, this) : this._nativeStrokeColor
    },
    autoWrap: function(t) {
        return t !== void 0 ? (this._autoWrap = t, this._text && (this._applyAutoWrap(), this.clearCache()), this) : this._autoWrap
    },
    _applyAutoWrap: function() {
        if (this._text) {
            var t, e, i, n = this._text.replace(/\n/g, " "),
                s = [],
                o = "";
            for (t = n.split(" "), e = 0; t.length > e; e++) o && (o += " "), o += t[e], i = this.measureTextWidth(o), this._bounds2d.x > i ? s.push(t[e]) : (o = t[e], s.push("\n" + t[e]));
            this._renderText = s.join(" ")
        }
    },
    measureTextWidth: function(t) {
        return t = t || this._text, this._texture._mode === 0 ? this._texture.measureTextWidth(t) : this._texture.script.measureTextWidth(t, this)
    },
    tick: function(t) {
        this._bindDataObject && this._bindDataProperty && (this._bindDataObject._alive === !1 ? delete this._bindDataObject : this.text(this._bindDataPreText + this._bindDataObject[this._bindDataProperty] + this._bindDataPostText)), $i_61.prototype.tick.call(this, t)
    },
    _stringify: function() {
        var t, e = $i_61.prototype._stringify.call(this);
        for (t in this)
            if (this.hasOwnProperty(t) && this[t] !== void 0) switch (t) {
                case "_text":
                    e += ".text(" + this.text() + ")";
                    break;
                case "_textAlignX":
                    e += ".textAlignX(" + this.textAlignX() + ")";
                    break;
                case "_textAlignY":
                    e += ".textAlignY(" + this.textAlignY() + ")";
                    break;
                case "_textLineSpacing":
                    e += ".textLineSpacing(" + this.textLineSpacing() + ")"
            }
            return e
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_63);
var $i_66 = $i_2.extend({
    classId: "$i_66",
    init: function(t) {
        this._mapData = t || []
    },
    tileData: function(t, e, i) {
        if (t !== void 0 && e !== void 0) {
            if (i !== void 0) return this._mapData[e] = this._mapData[e] || [], this._mapData[e][t] = i, this;
            if (this._mapData[e]) return this._mapData[e][t]
        }
        return void 0
    },
    clearData: function(t, e) {
        return t !== void 0 && e !== void 0 && this._mapData[e] !== void 0 ? (delete this._mapData[e][t], !0) : !1
    },
    collision: function(t, e, i, n) {
        var s, o;
        if (i === void 0 && (i = 1), n === void 0 && (n = 1), t !== void 0 && e !== void 0)
            for (o = 0; n > o; o++)
                for (s = 0; i > s; s++)
                    if (this.tileData(t + s, e + o)) return !0;
        return !1
    },
    collisionWith: function(t, e, i, n, s) {
        var o, r;
        if (i === void 0 && (i = 1), n === void 0 && (n = 1), t !== void 0 && e !== void 0)
            for (r = 0; n > r; r++)
                for (o = 0; i > o; o++)
                    if (this.tileData(t + o, e + r) === s) return !0;
        return !1
    },
    collisionWithOnly: function(t, e, i, n, s) {
        var o, r, a, h = !1;
        if (i === void 0 && (i = 1), n === void 0 && (n = 1), t !== void 0 && e !== void 0)
            for (r = 0; n > r; r++)
                for (o = 0; i > o; o++)
                    if (a = this.tileData(t + o, e + r)) {
                        if (this.tileData(t + o, e + r) !== s) return !1;
                        h = !0
                    }
        return h
    },
    mapData: function(t, e, i) {
        if (t !== void 0) {
            if (e || i) {
                var n, s;
                for (s in t)
                    for (n in t[s]) this._mapData[i + parseInt(s)][e + parseInt(n)] = t[s][n]
            } else this._mapData = t;
            return this
        }
        return this._mapData
    },
    sortedMapDataAsArray: function() {
        var t, e, i, n, s, o, r = this.mapData(),
            a = {};
        for (n = this._sortKeys(r), s = 0; n.length > s; s++)
            for (e = n[s], i = this._sortKeys(r[e]), a[e] = a[e] || {}, o = 0; i.length > o; o++) t = i[o], a[e][t] = r[e][t];
        return a
    },
    _sortKeys: function(t) {
        var e = [];
        for (var i in t) e.push(i);
        return e.sort(), e
    },
    mapDataString: function() {
        return JSON.stringify(this.mapData())
    },
    insertMapData: function() {},
    rotateData: function(t, e) {
        switch (e) {
            case -90:
                break;
            case 180:
                break;
            case 90:
            default:
        }
    },
    translateDataBy: function(t, e) {
        var i, n, s, o, r, a = this.mapData(),
            h = [];
        for (n in a)
            if (a.hasOwnProperty(n)) {
                o = parseInt(n, 10), s = a[o], h[o + e] = h[o + e] || {};
                for (i in s) s.hasOwnProperty(i) && (r = parseInt(i, 10), h[o + e][r + t] = a[n][i])
            }
        this.mapData(h, 0, 0)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_66);
var $i_67 = $i_60.extend({
    classId: "$i_67",
    $i_67: !0,
    init: function(t, e) {
        $i_60.prototype.init.call(this), t = t !== void 0 ? t : 40, e = e !== void 0 ? e : 40;
        var i = this;
        if (!ige.isServer) {
            var n = new $i_54($i_67SmartTexture);
            i.texture(n)
        }
        i.map = new $i_66, i._adjustmentMatrix = new $i_8, i.tileWidth(t), i.tileHeight(e), i.gridSize(3, 3), i._drawGrid = 0, i._gridColor = "#ffffff"
    },
    highlightOccupied: function(t) {
        return t !== void 0 ? (this._highlightOccupied = t, this) : this._highlightOccupied
    },
    highlightTileRect: function(t) {
        return t !== void 0 ? (this._highlightTileRect = t, this) : this._highlightTileRect
    },
    tileWidth: function(t) {
        return t !== void 0 ? (this._tileWidth = t, this._gridSize && this._gridSize.x && (this.width(this._tileWidth * this._gridSize.x), this._updateAdjustmentMatrix()), this) : this._tileWidth
    },
    tileHeight: function(t) {
        return t !== void 0 ? (this._tileHeight = t, this._gridSize && this._gridSize.y && (this.height(this._tileHeight * this._gridSize.y), this._updateAdjustmentMatrix()), this) : this._tileHeight
    },
    gridSize: function(t, e) {
        return t !== void 0 && e !== void 0 ? (this._gridSize = new $i_4(t, e), this._mountMode === 0 && this._tileWidth && this.width(this._tileWidth * this._gridSize.x), this._mountMode === 1 && this._tileWidth && this.width(this._tileWidth * 2 * this._gridSize.x), this._tileHeight && this.height(this._tileHeight * this._gridSize.y), this._updateAdjustmentMatrix(), this) : this._gridSize
    },
    drawGrid: function(t) {
        return t !== void 0 ? (this._drawGrid = t, this) : this._drawGrid
    },
    gridColor: function(t) {
        return t !== void 0 ? (this._gridColor = t, this) : this._gridColor
    },
    occupyTile: function(t, e, i, n, s) {
        var o, r;
        if (i === void 0 && (i = 1), n === void 0 && (n = 1), t = Math.floor(t), e = Math.floor(e), i = Math.floor(i), n = Math.floor(n), t !== void 0 && e !== void 0) {
            for (o = 0; i > o; o++)
                for (r = 0; n > r; r++) this.map.tileData(t + o, e + r, s);
            s._classId && (s._occupiedRect = new $i_7(t, e, i, n))
        }
        return this
    },
    unOccupyTile: function(t, e, i, n) {
        var s, o, r;
        if (i === void 0 && (i = 1), n === void 0 && (n = 1), t = Math.floor(t), e = Math.floor(e), i = Math.floor(i), n = Math.floor(n), t !== void 0 && e !== void 0)
            for (s = 0; i > s; s++)
                for (o = 0; n > o; o++) r = this.map.tileData(t + s, e + o), r && r._occupiedRect && delete r._occupiedRect, this.map.clearData(t + s, e + o);
        return this
    },
    isTileOccupied: function(t, e, i, n) {
        return i === void 0 && (i = 1), n === void 0 && (n = 1), this.map.collision(t, e, i, n)
    },
    tileOccupiedBy: function(t, e) {
        return this.map.tileData(t, e)
    },
    pointToTile: function(t) {
        var e, i, n, s = t.x,
            o = t.y;
        return this._mountMode === 0 && (e = s, i = o, n = new $i_5(Math.floor(e / this._tileWidth), Math.floor(i / this._tileWidth), 0)), this._mountMode === 1 && (e = s, i = o, n = new $i_5(Math.floor(e / this._tileWidth), Math.floor(i / this._tileHeight), 0)), n
    },
    mouseTilePoint: function() {
        var t = this.mouseToTile().thisMultiply(this._tileWidth, this._tileHeight, 1);
        return t.x += this._tileWidth / 2, t.y += this._tileHeight / 2, t
    },
    tileToPoint: function(t, e) {
        var i;
        return this._mountMode === 0 && (i = new $i_5(t, e, 0).thisMultiply(this._tileWidth, this._tileHeight, 1), i.x -= this._bounds2d.x2 - this._tileWidth / 2, i.y -= this._bounds2d.y2 - this._tileHeight / 2), this._mountMode === 1 && (i = new $i_5(t * this._tileWidth + this._tileWidth / 2, e * this._tileHeight + this._tileHeight / 2, 0), i.x -= this._bounds2d.x2 / 2, i.y -= this._bounds2d.y2), i.x2 = i.x / 2, i.y2 = i.y / 2, i
    },
    mouseToTile: function() {
        var t;
        return t = this._mountMode === 0 ? this.pointToTile(this.mousePos()) : this.pointToTile(this.mousePos().to2d())
    },
    scanRects: function(t) {
        var e, i, n = [],
            s = this.map._mapData.clone();
        for (i in s)
            if (s.hasOwnProperty(i))
                for (e in s[i]) s[i].hasOwnProperty(e) && s[i][e] && (!t || t && t(s[i][e], e, i)) && n.push(this._scanRects(s, parseInt(e, 10), parseInt(i, 10), t));
        return n
    },
    _scanRects: function(t, e, i, n) {
        var s = {
                x: e,
                y: i,
                width: 1,
                height: 1
            },
            o = e + 1,
            r = i + 1;
        t[i][e] = 0;
        while (t[i][o] && (!n || n && n(t[i][o], o, i))) s.width++, t[i][o] = 0, o++;
        while (t[r] && t[r][e] && (!n || n && n(t[r][e], e, r))) {
            if (t[r][e - 1] && (!n || n && n(t[r][e - 1], e - 1, r)) || t[r][e + s.width] && (!n || n && n(t[r][e + s.width], e + s.width, r))) return s;
            for (o = e; e + s.width > o; o++)
                if (!t[r][o] || n && !n(t[r][o], o, r)) return s;
            for (o = e; e + s.width > o; o++) t[r][o] = 0;
            s.height++, r++
        }
        return s
    },
    inGrid: function(t, e, i, n) {
        return i === void 0 && (i = 1), n === void 0 && (n = 1), !(0 > t || 0 > e || t + i > this._gridSize.x || e + n > this._gridSize.y)
    },
    hoverColor: function(t) {
        return t !== void 0 ? (this._hoverColor = t, this) : this._hoverColor
    },
    loadMap: function(t) {
        return this.map.mapData(t.data, 0, 0), this
    },
    saveMap: function() {
        var t, e, i = 0,
            n = 0,
            s = this.map._mapData;
        for (e in s)
            if (s.hasOwnProperty(e))
                for (t in s[e]) s[e].hasOwnProperty(t) && (parseInt(i) > parseInt(t) && (i = parseInt(t)), parseInt(n) > parseInt(e) && (n = parseInt(e)));
        return JSON.stringify({
            data: this.map.sortedMapDataAsArray(),
            dataXY: [parseInt(i, 10), parseInt(n, 10)]
        })
    },
    isometricMounts: function(t) {
        return t !== void 0 ? ($i_60.prototype.isometricMounts.call(this, t), this.tileWidth(this._tileWidth), this.tileHeight(this._tileHeight), this.gridSize(this._gridSize.x, this._gridSize.y), this._updateAdjustmentMatrix(), this) : this._mountMode
    },
    tileMapHitPolygon: function() {
        if (this._mountMode === 0) return this.aabb();
        if (this._mountMode === 1) {
            var t = this.aabb(),
                e = new $i_6;
            return e.addPoint(t.x + t.width / 2, t.y), e.addPoint(t.x + t.width, t.y + t.height / 2), e.addPoint(t.x + t.width / 2, t.y + t.height - 1), e.addPoint(t.x - 1, t.y + t.height / 2 - 1), e
        }
    },
    _processTriggerHitTests: function() {
        if (this._mouseEventsActive && ige._currentViewport) {
            if (this._mouseAlwaysInside) return !0;
            var t = this.mouseToTile();
            return t.x >= 0 && t.y >= 0 && this._gridSize.x > t.x && this._gridSize.y > t.y ? !0 : !1
        }
        return !1
    },
    _updateAdjustmentMatrix: function() {
        this._bounds2d.x2 && this._bounds2d.y2 && this._tileWidth && this._tileHeight && (this._mountMode === 0 && this._adjustmentMatrix.translateTo(this._bounds2d.x2, this._bounds2d.y2), this._mountMode === 1 && this._adjustmentMatrix.translateTo(0, this._bounds2d.y2))
    },
    _childMounted: function(t) {
        t.tileWidth = t.tileWidth || this.tileWidth, t.tileHeight = t.tileHeight || this.tileHeight, t._tileWidth = t._tileWidth || 1, t._tileHeight = t._tileHeight || 1, $i_60.prototype._childMounted.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_67);
var $i_54Map = $i_67.extend({
    classId: "$i_54Map",
    init: function(t, e) {
        $i_67.prototype.init.call(this, t, e), this.map = new $i_66, this._textureList = [], this._renderCenter = new $i_5(0, 0, 0), this._cacheDirty = !0
    },
    autoSection: function(t) {
        return t !== void 0 ? (this._autoSection = t, this) : this._autoSection
    },
    drawSectionBounds: function(t) {
        return t !== void 0 ? (this._drawSectionBounds = t, this) : this._drawSectionBounds
    },
    cacheForceFrame: function() {
        this._cacheDirty = !0
    },
    negate: function(t) {
        if (t !== void 0) {
            var e, i, n = t.map._mapData,
                s = this.map._mapData;
            for (i in n)
                if (n.hasOwnProperty(i))
                    for (e in n[i]) n[i].hasOwnProperty(e) && s[i] && s[i][e] && delete s[i][e]
        }
        return this
    },
    addTexture: function(t) {
        return this._textureList.push(t), t._loaded || (this._allTexturesLoaded = !1), this._textureList.length - 1
    },
    allTexturesLoaded: function() {
        if (!this._allTexturesLoaded) {
            var t = this._textureList,
                e = t.length;
            while (e--)
                if (!t[e]._loaded) return !1
        }
        return this._allTexturesLoaded = !0, !0
    },
    paintTile: function(t, e, i, n) {
        t !== void 0 && e !== void 0 && i !== void 0 && ((n === void 0 || 1 > n) && (n = 1), this.map.tileData(t, e, [i, n]))
    },
    clearTile: function(t, e) {
        this.map.clearData(t, e)
    },
    loadMap: function(map) {
        if (map.textures) {
            this._textureList = [];
            var tex = [],
                i, self = this;
            for (i = 0; map.textures.length > i; i++) eval("tex[" + i + "] = " + map.textures[i]), self.addTexture(tex[i]);
            self.map.mapData(map.data)
        } else this.map.mapData(map.data);
        return this
    },
    saveMap: function() {
        var t, e, i, n = [],
            s = 0,
            o = 0,
            r = this.map._mapData;
        for (t = 0; this._textureList.length > t; t++) n.push(this._textureList[t].stringify());
        for (i in r)
            if (r.hasOwnProperty(i))
                for (e in r[i]) r[i].hasOwnProperty(e) && (s > e && (s = e), o > i && (o = i));
        return JSON.stringify({
            textures: n,
            data: this.map.mapData(),
            dataXY: [s, o]
        })
    },
    clearMap: function() {
        return this.map.mapData([]), this
    },
    reset: function() {
        return this.clearMap(), this._textureList = [], this
    },
    tileTextureIndex: function(t, e, i) {
        if (t !== void 0 && e !== void 0) {
            var n = this.map.tileData(t, e);
            if (i === void 0) return n[0];
            n[0] = i
        }
    },
    tileTextureCell: function(t, e, i) {
        if (t !== void 0 && e !== void 0) {
            var n = this.map.tileData(t, e);
            if (i === void 0) return n[1];
            n[1] = i
        }
    },
    convertHorizontalData: function(t) {
        var e, i, n = [];
        for (e in t)
            if (t.hasOwnProperty(e))
                for (i in t[e]) t[e].hasOwnProperty(i) && (n[i] = n[i] || [], n[i][e] = t[e][i]);
        return n
    },
    tick: function(t) {
        $i_67.prototype.tick.call(this, t);
        var e, i, n, s, o, r, a, h, d, l, u, c, _, g, p, m, f, y = this.map._mapData,
            v = this._newTileEntity();
        if (this._autoSection > 0) {
            if (this._cacheDirty && this.allTexturesLoaded()) {
                this._sections = [], this._sectionCtx = [];
                for (i in y)
                    if (y.hasOwnProperty(i))
                        for (e in y[i])
                            if (y[i].hasOwnProperty(e) && (o = parseInt(e), r = parseInt(i), this._mountMode === 0 && (a = o, h = r), this._mountMode === 1 && (n = o * this._tileWidth, s = r * this._tileHeight, a = (n - s) / this._tileWidth, h = (n + s) * .5 / this._tileHeight), d = y[i][e], l = Math.floor(a / this._autoSection), u = Math.floor(h / this._autoSection), this._ensureSectionExists(l, u), g = this._sectionCtx[l][u], d && (p = this._renderTile(g, o, r, d, v, null, l, u))))
                                for (f = 0; p.length > f; f++) m = p[f], c = l, _ = u, m.x && (c += m.x), m.y && (_ += m.y), this._ensureSectionExists(c, _), g = this._sectionCtx[c][_], this._sectionTileRegion = this._sectionTileRegion || [], this._sectionTileRegion[c] = this._sectionTileRegion[c] || [], this._sectionTileRegion[c][_] = this._sectionTileRegion[c][_] || [], this._sectionTileRegion[c][_][o] = this._sectionTileRegion[c][_][o] || [], this._sectionTileRegion[c][_][o][r] || (this._sectionTileRegion[c][_][o][r] = !0, this._renderTile(g, o, r, d, v, null, c, _));
                this._cacheDirty = !1, delete this._sectionTileRegion
            }
            this._drawSectionsToCtx(t)
        } else if (this.allTexturesLoaded())
            for (i in y)
                if (y.hasOwnProperty(i))
                    for (e in y[i]) y[i].hasOwnProperty(e) && (d = y[i][e], d && this._renderTile(t, e, i, d, v))
    },
    _ensureSectionExists: function(t, e) {
        var i;
        this._sections[t] = this._sections[t] || [], this._sectionCtx[t] = this._sectionCtx[t] || [], this._sections[t][e] || (this._sections[t][e] = document.createElement("canvas"), this._sections[t][e].width = this._tileWidth * this._autoSection, this._sections[t][e].height = this._tileHeight * this._autoSection, i = this._sectionCtx[t][e] = this._sections[t][e].getContext("2d"), ige._globalSmoothing ? (i.imageSmoothingEnabled = !0, i.mozImageSmoothingEnabled = !0) : (i.imageSmoothingEnabled = !1, i.mozImageSmoothingEnabled = !1), i.translate(this._tileWidth / 2, this._tileHeight / 2))
    },
    _drawSectionsToCtx: function(t) {
        var e, i, n, s, o, r, a, h, d, l = ige._currentViewport.viewArea();
        h = this._tileWidth * this._autoSection, d = this._tileHeight * this._autoSection;
        for (e in this._sections)
            if (this._sections.hasOwnProperty(e))
                for (i in this._sections[e]) this._sections[e].hasOwnProperty(i) && (s = e * this._tileWidth * this._autoSection, o = i * this._tileHeight * this._autoSection, r = this._translate.x + s - ige._currentCamera._translate.x, a = this._translate.y + o - ige._currentCamera._translate.y, this._mountMode === 1 && (r -= this._tileWidth / 2, a -= this._tileHeight / 2), -(l.width / 2) > r + h + this._tileHeight / 2 || r - this._tileWidth / 2 > l.width / 2 || -(l.height / 2) > a + d + this._tileHeight / 2 || a > l.height / 2 || (n = this._sections[e][i], t.drawImage(n, 0, 0, h, d, s, o, h, d), ige._drawCount++, this._drawSectionBounds && (t.strokeStyle = "#ff00f6", t.strokeRect(e * this._tileWidth * this._autoSection, i * this._tileHeight * this._autoSection, this._tileWidth * this._autoSection, this._tileHeight * this._autoSection))))
    },
    _renderTile: function(t, e, i, n, s, o, r, a) {
        var h, d, l, u, c, _, g, p, m, f, y, v, x, b = this._mountMode === 1 ? this._tileWidth / 2 : 0;
        return this._mountMode === 1 ? this._tileHeight / 2 : 0, this._mountMode === 0 && (h = e * this._tileWidth, d = i * this._tileHeight), this._mountMode === 1 && (m = e * this._tileWidth, f = i * this._tileHeight, y = m - f, v = (m + f) * .5, h = y - this._tileWidth / 2, d = v), r !== void 0 && (h -= r * this._autoSection * this._tileWidth), a !== void 0 && (d -= a * this._autoSection * this._tileHeight), !o || o.xyInside(h, d) ? (0 > h - b && (l = l || [], l.push({
            x: -1
        }), u = !0, p = p || {}, p.x = -1), h + b > t.canvas.width - this._tileWidth && (l = l || [], l.push({
            x: 1
        }), c = !0, p = p || {}, p.x = 1), 0 > d - 0 && (l = l || [], l.push({
            y: -1
        }), _ = !0, p = p || {}, p.y = -1), d + 0 > t.canvas.height - this._tileHeight && (l = l || [], l.push({
            y: 1
        }), g = !0, p = p || {}, p.y = 1), (u || _ || c || g) && l.push(p), t.save(), t.translate(h, d), x = this._textureList[n[0]], s._cell = n[1], x && x.render(t, s, ige._tickDelta), t.restore(), l) : void 0
    },
    _newTileEntity: function() {
        return this._mountMode === 0 ? {
            _cell: 1,
            _bounds2d: {
                x: this._tileWidth,
                y: this._tileHeight
            },
            _renderPos: {
                x: -this._tileWidth / 2,
                y: -this._tileHeight / 2
            }
        } : this._mountMode === 1 ? {
            _cell: 1,
            _bounds2d: {
                x: this._tileWidth * 2,
                y: this._tileHeight
            },
            _renderPos: {
                x: -this._tileWidth,
                y: -this._tileHeight / 2
            }
        } : void 0
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_54Map);
var $i_67SmartTexture = {
        render: function(t, e) {
            var i = e._tileWidth,
                n = e._tileHeight,
                s = (e.bounds2d(), e._gridSize),
                o = 0,
                r = 0;
            if (e._drawGrid) {
                t.strokeStyle = e._gridColor;
                var a, h, d, l = o + i * s.x,
                    u = r + n * s.y;
                for (o = 0, r = 0, a = 0; s.y >= a; a++) h = new $i_4(o, r + n * a), d = new $i_4(l, r + n * a), e._mountMode === 1 && (h = h.toIso(), d = d.toIso()), t.beginPath(), t.moveTo(h.x, h.y), t.lineTo(d.x, d.y), t.stroke();
                for (a = 0; s.x >= a; a++) h = new $i_4(o + i * a, r), d = new $i_4(o + i * a, u), e._mountMode === 1 && (h = h.toIso(), d = d.toIso()), t.beginPath(), t.moveTo(h.x, h.y), t.lineTo(d.x, d.y), t.stroke()
            }
            if (e._highlightOccupied) {
                t.fillStyle = "#ff0000";
                for (r in e.map._mapData)
                    if (e.map._mapData[r])
                        for (o in e.map._mapData[r]) e.map._mapData[r][o] && (c = new $i_4(i * o, n * r), e._mountMode === 0 && t.fillRect(c.x, c.y, i, n), e._mountMode === 1 && (c.thisToIso(), t.beginPath(), t.moveTo(c.x, c.y), t.lineTo(c.x + i, c.y + n / 2), t.lineTo(c.x, c.y + n), t.lineTo(c.x - i, c.y + n / 2), t.lineTo(c.x, c.y), t.fill()))
            }
            if (e._highlightTileRect)
                for (t.fillStyle = "#e4ff00", r = e._highlightTileRect.y; e._highlightTileRect.y + e._highlightTileRect.height > r; r++)
                    for (o = e._highlightTileRect.x; e._highlightTileRect.x + e._highlightTileRect.width > o; o++) c = new $i_4(i * o, n * r), e._mountMode === 0 && t.fillRect(c.x, c.y, i, n), e._mountMode === 1 && (c.thisToIso(), t.beginPath(), t.moveTo(c.x, c.y - n / 2), t.lineTo(c.x + i, c.y), t.lineTo(c.x, c.y + n / 2), t.lineTo(c.x - i, c.y), t.lineTo(c.x, c.y - n / 2), t.fill());
            if (e._drawMouse) {
                var c, _, g, p = e.mousePos(),
                    m = e.mouseToTile();
                m.x >= 0 && m.y >= 0 && s.x > m.x && s.y > m.y && (t.fillStyle = e._hoverColor || "#6000ff", e._mountMode === 0 && t.fillRect(m.x * i, m.y * n, i, n), e._mountMode === 1 && (c = m.clone().thisMultiply(i, n, 0).thisToIso(), c.y += n / 2, t.beginPath(), t.moveTo(c.x, c.y - n / 2), t.lineTo(c.x + i, c.y), t.lineTo(c.x, c.y + n / 2), t.lineTo(c.x - i, c.y), t.lineTo(c.x, c.y - n / 2), t.fill()), e._drawMouseData && (_ = "Tile X: " + m.x + " Y: " + m.y, g = t.measureText(_), t.fillStyle = "rgba(0, 0, 0, 0.8)", t.fillRect(Math.floor(p.x - g.width / 2 - 5), Math.floor(p.y - 40), Math.floor(g.width + 10), 14), t.fillStyle = "#ffffff", t.fillText(_, Math.floor(p.x - g.width / 2), Math.floor(p.y - 30))))
            }
        }
    },
    $i_71 = $i_60.extend({
        classId: "$i_71",
        init: function(t) {
            $i_60.prototype.init.call(this), this._trackRotateTarget = void 0, this._trackTranslateTarget = void 0, this._trackRotateSmoothing = void 0, this._trackTranslateSmoothing = void 0, this._entity = t
        },
        limit: function(t) {
            return t !== void 0 ? (this._limit = t, this._entity) : this._limit
        },
        panTo: function(t, e, i) {
            return t !== void 0 && this._translate.tween().properties({
                x: t.x,
                y: t.y,
                z: t.z
            }).duration(e).easing(i).start(), this._entity
        },
        panBy: function(t, e, i) {
            return t !== void 0 && this._translate.tween().properties({
                x: t.x + this._translate.x,
                y: t.y + this._translate.y,
                z: t.z + this._translate.z
            }).duration(e).easing(i).start(), this._entity
        },
        trackTranslate: function(t, e, i) {
            return t !== void 0 ? (this.log("Camera on viewport " + this._entity.id() + " is now tracking translation target " + t.id()), i !== void 0 && (this._trackTranslateRounding = i), e !== void 0 && (this._trackTranslateSmoothing = 1 > e ? 0 : e), this._trackTranslateTarget = t, this._entity) : this._trackTranslateTarget
        },
        trackTranslateSmoothing: function(t) {
            return t !== void 0 ? (this._trackTranslateSmoothing = t, this) : this._trackTranslateSmoothing
        },
        trackTranslateRounding: function(t) {
            return t !== void 0 ? (this._trackTranslateRounding = t, this) : this._trackTranslateRounding
        },
        unTrackTranslate: function() {
            delete this._trackTranslateTarget
        },
        trackRotate: function(t, e) {
            return t !== void 0 ? (this.log("Camera on viewport " + this._entity.id() + " is now tracking rotation of target " + t.id()), this._trackRotateSmoothing = 1 > e ? 0 : e, this._trackRotateTarget = t, this._entity) : this._trackRotateTarget
        },
        trackRotateSmoothing: function(t) {
            return t !== void 0 ? (this._trackRotateSmoothing = t, this) : this._trackRotateSmoothing
        },
        unTrackRotate: function() {
            delete this._trackRotateTarget
        },
        lookAt: function(t, e, i) {
            return t !== void 0 && (t.updateTransform(), e ? this._translate.tween().properties({
                x: Math.floor(t._worldMatrix.matrix[2]),
                y: Math.floor(t._worldMatrix.matrix[5]),
                z: 0
            }).duration(e).easing(i).start() : (this._translate.x = Math.floor(t._worldMatrix.matrix[2]), this._translate.y = Math.floor(t._worldMatrix.matrix[5])), this.updateTransform()), this
        },
        update: function(t) {
            if (this._processUpdateBehaviours(t), this._trackTranslateTarget) {
                var e, i, n, s, o, r, a = this._trackTranslateTarget,
                    h = a._worldMatrix.matrix,
                    d = h[2],
                    l = h[5];
                this._trackTranslateSmoothing ? (e = this._translate.x, i = this._translate.y, n = Math.round(d - e), s = Math.round(l - i), this._trackTranslateRounding ? (o = this._translate.x + Math.round(n / this._trackTranslateSmoothing), r = this._translate.y + Math.round(s / this._trackTranslateSmoothing)) : (o = this._translate.x + n / this._trackTranslateSmoothing, r = this._translate.y + s / this._trackTranslateSmoothing), this._limit && (this._limit.x > o && (o = this._limit.x), o > this._limit.x + this._limit.width && (o = this._limit.x + this._limit.width), this._limit.y > r && (r = this._limit.y), r > this._limit.y + this._limit.height && (r = this._limit.y + this._limit.height)), this._translate.x = o, this._translate.y = r) : this.lookAt(this._trackTranslateTarget)
            }
            if (this._trackRotateTarget) {
                var u, c, _ = this._trackRotateTarget._parent !== void 0 ? this._trackRotateTarget._parent._rotate.z : 0,
                    g = -(_ + this._trackRotateTarget._rotate.z);
                this._trackRotateSmoothing ? (u = this._rotate.z, c = g - u, this._rotate.z += c / this._trackRotateSmoothing) : this._rotate.z = g
            }
            this.updateTransform()
        },
        tick: function(t) {
            this._processTickBehaviours(t), this._localMatrix.transformRenderingContext(t)
        },
        updateTransform: function() {
            this._localMatrix.identity(), this._localMatrix.multiply(this._localMatrix._newRotate(this._rotate.z)), this._localMatrix.multiply(this._localMatrix._newScale(this._scale.x, this._scale.y)), this._localMatrix.multiply(this._localMatrix._newTranslate(-this._translate.x, -this._translate.y)), this._parent ? (this._worldMatrix.copy(this._parent._worldMatrix), this._worldMatrix.multiply(this._localMatrix)) : this._worldMatrix.copy(this._localMatrix)
        },
        _stringify: function() {
            var t, e = $i_60.prototype._stringify.call(this);
            for (t in this)
                if (this.hasOwnProperty(t) && this[t] !== void 0) switch (t) {
                    case "_trackTranslateTarget":
                        e += ".trackTranslate(ige.$('" + this._trackTranslateTarget.id() + "'), " + this.trackTranslateSmoothing() + ")";
                        break;
                    case "_trackRotateTarget":
                        e += ".trackRotate(ige.$('" + this._trackRotateTarget.id() + "'), " + this.trackRotateSmoothing() + ")"
                }
                return e
        }
    });
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_71);
var $i_72 = $i_60.extend([{
    extension: $i_45,
    overwrite: !0
}, {
    extension: $i_44,
    overwrite: !0
}], {
    classId: "$i_72",
    $i_72: !0,
    init: function(t) {
        var e, i;
        this._alwaysInView = !0, $i_60.prototype.init.call(this), this._mouseAlwaysInside = !0, this._mousePos = new $i_5(0, 0, 0), this._overflow = "", this._clipping = !0, this._bornTime = void 0, t && (e = t.width, i = t.height, t && t.scaleToWidth && t.scaleToHeight && (this._lockDimension = new $i_5(t.scaleToWidth, t.scaleToHeight, 0))), this._bounds2d = new $i_5(e || ige._bounds2d.x, i || ige._bounds2d.y, 0), this.camera = new $i_71(this), this.camera._entity = this
    },
    minimumVisibleArea: function(t, e) {
        return this._lockDimension = new $i_5(t, e, 0), ige.isClient && this._resizeEvent({}), this
    },
    autoSize: function(t) {
        return t !== void 0 ? (this._autoSize = t, this) : this._autoSize
    },
    scene: function(t) {
        return t !== void 0 ? (this._scene = t, this) : this._scene
    },
    mousePos: function() {
        return this._mousePos.clone()
    },
    mousePosWorld: function() {
        return this._transformPoint(this._mousePos.clone())
    },
    viewArea: function() {
        var t = this.aabb(),
            e = this.camera._translate,
            i = this.camera._scale,
            n = t.width * (1 / i.x),
            s = t.height * (1 / i.y);
        return new $i_7(e.x - n / 2, e.y - s / 2, n, s)
    },
    update: function(t, e) {
        this._scene && (ige._currentCamera = this.camera, ige._currentViewport = this, this._scene._parent = this, this.camera.update(t, e), $i_60.prototype.update.call(this, t, e), this._scene.newFrame() && this._scene.update(t, e))
    },
    tick: function(t) {
        if (this._scene) {
            if (ige._currentCamera = this.camera, ige._currentViewport = this, this._scene._parent = this, $i_60.prototype.tick.call(this, t), t.translate(-(this._bounds2d.x * this._origin.x) | 0, -(this._bounds2d.y * this._origin.y) | 0), t.clearRect(0, 0, this._bounds2d.x, this._bounds2d.y), (this._clipping || this._borderColor) && (t.beginPath(), t.rect(0, 0, this._bounds2d.x / ige._scale.x, this._bounds2d.y / ige._scale.x), this._borderColor && (t.strokeStyle = this._borderColor, t.stroke()), this._clipping && t.clip()), t.translate((this._bounds2d.x / 2 | 0) + ige._translate.x, (this._bounds2d.y / 2 | 0) + ige._translate.y), (ige._scale.x !== 1 || ige._scale.y !== 1) && t.scale(ige._scale.x, ige._scale.y), this.camera.tick(t), t.save(), this._scene.tick(t), t.restore(), this._drawGuides && t === ige._ctx && (t.save(), t.translate(-this._translate.x, -this._translate.y), this.paintGuides(t), t.restore()), this._drawBounds && t === ige._ctx && (t.save(), t.translate(-this._translate.x, -this._translate.y), this.paintAabbs(t, this._scene, 0), t.restore()), this._drawMouse && t === ige._ctx) {
                t.save();
                var e, i, n, s, o = this.mousePos();
                t.scale(1 / this.camera._scale.x, 1 / this.camera._scale.y), i = Math.floor(o.x * this.camera._scale.x), n = Math.floor(o.y * this.camera._scale.y), t.fillStyle = "#fc00ff", t.fillRect(i - 5, n - 5, 10, 10), e = this.id() + " X: " + i + ", Y: " + n, s = t.measureText(e), t.fillStyle = "rgba(0, 0, 0, 0.8)", t.fillRect(Math.floor(i - s.width / 2 - 5), Math.floor(n - 25), Math.floor(s.width + 10), 14), t.fillStyle = "#ffffff", t.fillText(e, i - s.width / 2, n - 15), t.restore()
            }
            if (this._drawViewArea) {
                t.save();
                var r = this.viewArea();
                t.rect(r.x, r.y, r.width, r.height), t.stroke(), t.restore()
            }
        }
    },
    screenPosition: function() {
        return new $i_5(Math.floor(this._worldMatrix.matrix[2] + ige._bounds2d.x2), Math.floor(this._worldMatrix.matrix[5] + ige._bounds2d.y2), 0)
    },
    drawViewArea: function(t) {
        return t !== void 0 ? (this._drawViewArea = t, this) : this._drawViewArea
    },
    drawBoundsLimitId: function(t) {
        return t !== void 0 ? (this._drawBoundsLimitId = t, this) : this._drawBoundsLimitId
    },
    drawBoundsLimitCategory: function(t) {
        return t !== void 0 ? (this._drawBoundsLimitCategory = t, this) : this._drawBoundsLimitCategory
    },
    drawCompositeBounds: function(t) {
        return t !== void 0 ? (this._drawCompositeBounds = t, this) : this._drawCompositeBounds
    },
    drawGuides: function(t) {
        return t !== void 0 ? (this._drawGuides = t, this) : this._drawGuides
    },
    paintGuides: function(t) {
        var e = ige._bounds2d;
        this._drawGuides && (t.strokeStyle = "#ffffff", t.translate(.5, .5), t.beginPath(), t.moveTo(0, -e.y2), t.lineTo(0, e.y), t.stroke(), t.beginPath(), t.moveTo(-e.x2, 0), t.lineTo(e.x, 0), t.stroke())
    },
    paintAabbs: function(t, e, i) {
        var n, s, o, r, a, h, d, l, u, c, _, g, p, m, f, y, v, x, b, w, C, I = e._children;
        if (I) {
            n = I.length;
            while (n--) s = I[n], i++, s._shouldRender !== !1 && ((s._classId !== "$i_73" && !this._drawBoundsLimitId && !this._drawBoundsLimitCategory || this._drawBoundsLimitId && (this._drawBoundsLimitId instanceof Array ? this._drawBoundsLimitId.indexOf(s.id()) > -1 : this._drawBoundsLimitId === s.id()) || this._drawBoundsLimitCategory && this._drawBoundsLimitCategory === s.category()) && typeof s.aabb == "function" && (o = s.aabb(), this._drawCompositeBounds && s._compositeCache && (r = s.compositeAabb(), t.strokeStyle = "#ff0000", t.strokeRect(r.x, r.y, r.width, r.height)), o && ((s._drawBounds || s._drawBounds === void 0) && (t.strokeStyle = "#00deff", t.strokeRect(o.x, o.y, o.width, o.height), s._parent && s._parent._mountMode === 1 && (a = s.bounds3dPolygon().aabb(), t.save(), t.strokeStyle = "#0068b8", t.strokeRect(a.x, a.y, a.width, a.height), t.restore(), t.save(), t.translate(a.x + a.width / 2, a.y + a.height / 2), d = s._bounds3d, l = new $i_5(-(d.x / 2), 0, 0).toIso(), u = new $i_5(+(d.x / 2), 0, 0).toIso(), c = new $i_5(0, -(d.y / 2), 0).toIso(), _ = new $i_5(0, +(d.y / 2), 0).toIso(), g = new $i_5(0, 0, -(d.z / 2)).toIso(), p = new $i_5(0, 0, +(d.z / 2)).toIso(), m = new $i_5(-(d.x / 2), -(d.y / 2), -(d.z / 2)).toIso(), f = new $i_5(+(d.x / 2), -(d.y / 2), -(d.z / 2)).toIso(), y = new $i_5(+(d.x / 2), +(d.y / 2), -(d.z / 2)).toIso(), v = new $i_5(-(d.x / 2), +(d.y / 2), -(d.z / 2)).toIso(), x = new $i_5(-(d.x / 2), -(d.y / 2), d.z / 2).toIso(), b = new $i_5(+(d.x / 2), -(d.y / 2), d.z / 2).toIso(), w = new $i_5(+(d.x / 2), +(d.y / 2), d.z / 2).toIso(), C = new $i_5(-(d.x / 2), +(d.y / 2), d.z / 2).toIso(), h = t.globalAlpha, t.globalAlpha = 1, t.strokeStyle = "#ff0000", t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(u.x, u.y), t.stroke(), t.strokeStyle = "#00ff00", t.beginPath(), t.moveTo(c.x, c.y), t.lineTo(_.x, _.y), t.stroke(), t.strokeStyle = "#fffc00", t.beginPath(), t.moveTo(g.x, g.y), t.lineTo(p.x, p.y), t.stroke(), t.strokeStyle = "#a200ff", t.globalAlpha = s._highlight ? .9 : .6, t.fillStyle = "#545454", t.beginPath(), t.moveTo(y.x, y.y), t.lineTo(v.x, v.y), t.lineTo(C.x, C.y), t.lineTo(w.x, w.y), t.lineTo(y.x, y.y), t.fill(), t.stroke(), t.fillStyle = "#282828", t.beginPath(), t.moveTo(y.x, y.y), t.lineTo(f.x, f.y), t.lineTo(b.x, b.y), t.lineTo(w.x, w.y), t.lineTo(y.x, y.y), t.fill(), t.stroke(), t.fillStyle = "#676767", t.beginPath(), t.moveTo(x.x, x.y), t.lineTo(b.x, b.y), t.lineTo(w.x, w.y), t.lineTo(C.x, C.y), t.lineTo(x.x, x.y), t.fill(), t.stroke(), t.globalAlpha = h, t.restore())), this._drawBoundsData && (s._drawBounds || s._drawBoundsData === void 0) && (t.globalAlpha = 1, t.fillStyle = "#f6ff00", t.fillText("ID: " + s.id() + " " + "(" + s.classId() + ") " + s.layer() + ":" + s.depth().toFixed(0), o.x + o.width + 3, o.y + 10), t.fillText("X: " + s._translate.x.toFixed(2) + ", " + "Y: " + s._translate.y.toFixed(2) + ", " + "Z: " + s._translate.z.toFixed(2), o.x + o.width + 3, o.y + 20), t.fillText("Num Children: " + s._children.length, o.x + o.width + 3, o.y + 40)))), this.paintAabbs(t, s, i))
        }
    },
    _resizeEvent: function(t) {
        if (this._autoSize && this._parent && (this._bounds2d = this._parent._bounds2d.clone()), this._updateUiPosition(), this._scene && this._scene._resizeEvent(t), this._lockDimension) {
            var e, i, n = 1;
            this._bounds2d.x > this._lockDimension.x && this._bounds2d.y > this._lockDimension.y ? (e = this._bounds2d.x / this._lockDimension.x, i = this._bounds2d.y / this._lockDimension.y, n = i > e ? e : i) : (this._bounds2d.x > this._lockDimension.x && this._lockDimension.y > this._bounds2d.y && (n = this._bounds2d.y / this._lockDimension.y), this._lockDimension.x > this._bounds2d.x && this._bounds2d.y > this._lockDimension.y && (n = this._bounds2d.x / this._lockDimension.x), this._lockDimension.x > this._bounds2d.x && this._lockDimension.y > this._bounds2d.y && (e = this._bounds2d.x / this._lockDimension.x, i = this._bounds2d.y / this._lockDimension.y, n = i > e ? e : i)), this.camera.scaleTo(n, n, n)
        }
    },
    _stringify: function() {
        var t, e = $i_60.prototype._stringify.call(this);
        for (t in this)
            if (this.hasOwnProperty(t) && this[t] !== void 0) switch (t) {
                case "_autoSize":
                    e += ".autoSize(" + this._autoSize + ")";
                    break;
                case "_scene":
                    e += ".scene(ige.$('" + this.scene().id() + "'))"
            }
            return e
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_72);
var $i_73 = $i_60.extend({
    classId: "$i_73",
    init: function() {
        this._mouseAlwaysInside = !0, this._alwaysInView = !0, $i_60.prototype.init.call(this), this._shouldRender = !0, this._autoSize = !0, this._bounds2d.x = ige._bounds2d.x, this._bounds2d.y = ige._bounds2d.y, this.streamSections(["transform", "ignoreCamera"])
    },
    streamRoomId: function(t) {
        return t !== void 0 ? (this._streamRoomId = t, this) : this._streamRoomId
    },
    streamSectionData: function(t, e) {
        switch (t) {
            case "ignoreCamera":
                if (e === void 0) return this._ignoreCamera + "";
                e === "false" ? this.ignoreCamera(!1) : this.ignoreCamera(!0);
                break;
            default:
                $i_60.prototype.streamSectionData.call(this, t, e)
        }
    },
    autoSize: function(t) {
        return t !== void 0 ? (this._autoSize = t, this) : this._autoSize
    },
    shouldRender: function(t) {
        return t !== void 0 ? (this._shouldRender = t, this) : this._shouldRender
    },
    ignoreCamera: function(t) {
        return t !== void 0 ? (this._ignoreCamera = t, this) : this._ignoreCamera
    },
    update: function(t, e) {
        if (this._ignoreCamera) {
            var i = ige._currentCamera;
            this.translateTo(i._translate.x, i._translate.y, i._translate.z), this.scaleTo(1 / i._scale.x, 1 / i._scale.y, 1 / i._scale.z), this.rotateTo(-i._rotate.x, -i._rotate.y, -i._rotate.z)
        }
        $i_60.prototype.update.call(this, t, e)
    },
    tick: function(t) {
        this._shouldRender && $i_60.prototype.tick.call(this, t)
    },
    _resizeEvent: function(t) {
        this._autoSize && (this._bounds2d = ige._bounds2d.clone());
        var e = this._children,
            i = e.length;
        while (i--) e[i]._resizeEvent(t)
    },
    _stringify: function() {
        var t, e = $i_60.prototype._stringify.call(this);
        for (t in this)
            if (this.hasOwnProperty(t) && this[t] !== void 0) switch (t) {
                case "_shouldRender":
                    e += ".shouldRender(" + this.shouldRender() + ")";
                    break;
                case "_autoSize":
                    e += ".autoSize(" + this.autoSize() + ")"
            }
            return e
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_73);
var $i_79 = function() {};
$i_79.prototype = [];
for (var methodName in $i_60.prototype) $i_60.prototype.hasOwnProperty(methodName) && methodName !== "init" && ($i_79.prototype[methodName] = function(t) {
    return function() {
        for (var e = this.length, i = 0; e > i; i++) this[i][t].apply(this[i], arguments)
    }
}(methodName));
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_79);
var $i_60Box2d = $i_60.extend({
    classId: "$i_60Box2d",
    init: function(t) {
        $i_60.prototype.init.call(this), t ? (typeof t == "string" && (t = ige.box2d.world(t)), this._box2dWorld = t, this._b2dRef = t) : this._b2dRef = ige.box2d, ige.box2d && (this._b2dRef._networkDebugMode ? (this._translateToProto = function() {}, this._translateByProto = function() {}, this._rotateToProto = function() {}, this._rotateByProto = function() {}, this._updateProto = this.update, this.update = this._update) : (this._translateToProto = this.translateTo, this._translateByProto = this.translateBy, this._rotateToProto = this.rotateTo, this._rotateByProto = this.rotateBy, this.translateTo = this._translateTo, this.translateBy = this._translateBy, this.rotateTo = this._rotateTo, this.rotateBy = this._rotateBy))
    },
    box2dActive: function(t) {
        return this._box2dBody ? t !== void 0 ? (this._box2dBody.SetActive(t), this) : this._box2dBody.IsActive() : this
    },
    box2dBody: function(t) {
        return t !== void 0 ? (this._box2dBodyDef = t, ige.box2d ? this._box2dBody = this._b2dRef.createBody(this, t) : this.log("You are trying to create a box2d entity but you have not added the box2d component to the ige instance!", "error"), this) : this._box2dBodyDef
    },
    gravitic: function(t) {
        return this._box2dBody ? t !== void 0 ? (this._box2dBody.m_nonGravitic = !t, this._box2dBodyDef.gravitic = t, this._box2dBody.SetAwake(!0), this) : !this._box2dBody.m_nonGravitic : void 0
    },
    on: function() {
        if (arguments.length === 3) {
            var t, e = arguments[0],
                i = arguments[1],
                n = arguments[2];
            switch (i.substr(0, 1)) {
                case "#":
                    t = 0;
                    break;
                case ".":
                    t = 1
            }
            switch (i = i.substr(1, i.length - 1), e) {
                case "collisionStart":
                    this._collisionStartListeners = this._collisionStartListeners || [], this._collisionStartListeners.push({
                        type: t,
                        target: i,
                        callback: n
                    }), this._contactListener || (this._contactListener = this._setupContactListeners());
                    break;
                case "collisionEnd":
                    this._collisionEndListeners = this._collisionEndListeners || [], this._collisionEndListeners.push({
                        type: t,
                        target: i,
                        callback: n
                    }), this._contactListener || (this._contactListener = this._setupContactListeners());
                    break;
                default:
                    this.log("Cannot add event listener, event type " + e + " not recognised", "error")
            }
        } else $i_60.prototype.on.apply(this, arguments)
    },
    off: function() {
        arguments.length === 3 || $i_60.prototype.off.apply(this, arguments)
    },
    _setupContactListeners: function() {
        var t = this;
        ige.box2d.contactListener(function(e) {
            var i = t._collisionStartListeners;
            i && t._checkContact(e, i)
        }, function(e) {
            var i = t._collisionEndListeners;
            i && t._checkContact(e, i)
        })
    },
    _checkContact: function(t, e) {
        var i, n, s, o = this,
            r = e.length;
        if (t.igeEntityA()._id === o._id) i = t.igeEntityB();
        else {
            if (t.igeEntityB()._id !== o._id) return;
            i = t.igeEntityA()
        }
        for (s = 0; r > s; s++) n = e[s], n.type === 0 && i._id === n.target && n.callback(t), e[s].type === 1 && i._category === n.target && n.callback(t)
    },
    _translateTo: function(t, e, i) {
        var n = this._box2dBody;
        return this._translateToProto(t, e, i), n && !n.updating && (n.SetPosition({
            x: t / this._b2dRef._scaleRatio,
            y: e / this._b2dRef._scaleRatio
        }), n.SetAwake(!0)), this
    },
    _translateBy: function(t, e, i) {
        this._translateTo(this._translate.x + t, this._translate.y + e, this._translate.z + i)
    },
    _rotateTo: function(t, e, i) {
        var n = this._box2dBody;
        return this._rotateToProto(t, e, i), n && !n.updating && (n.SetAngle(i), n.SetAwake(!0)), this
    },
    _rotateBy: function(t, e, i) {
        this._rotateTo(this._rotate.x + t, this._rotate.y + e, this._rotate.z + i)
    },
    _update: function(t) {
        this._updateProto(t), this._translateTo(this._translate.x, this._translate.y, this._translate.z), this._rotateTo(this._rotate.x, this._rotate.y, this._rotate.z)
    },
    box2dNoDebug: function(t) {
        return t !== void 0 ? (this._box2dNoDebug = t, this) : this._box2dNoDebug
    },
    destroy: function() {
        this._box2dBody && this._b2dRef.destroyBody(this._box2dBody), $i_60.prototype.destroy.call(this)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_60Box2d);
var $i_93 = $i_62.extend({
        classId: "$i_93",
        init: function() {
            $i_62.prototype.init.call(this), this._value = "", this._fontEntity = (new $i_63).left(0).middle(0).textAlignX(0).textAlignY(0).mount(this), this.font("10px Verdana"), this.paddingLeft(5), this.allowActive(!1), this.allowFocus(!1), this.allowHover(!1)
        },
        width: function(t, e, i, n) {
            var s;
            return s = $i_62.prototype.width.call(this, t, e, i, n), this._fontEntity.width(t - 10, e, i, n), s
        },
        height: function(t, e, i, n) {
            var s;
            return s = $i_62.prototype.height.call(this, t, e, i, n), this._fontEntity.height(t, e, i, n), s
        },
        value: function(t) {
            return t !== void 0 ? (this._value !== t && (this._value = t, !t && this._placeHolder ? (this._fontEntity.text(this._placeHolder), this._fontEntity.color(this._placeHolderColor)) : (this._mask ? this._fontEntity.text(Array(this._value.length + 1).join(this._mask)) : this._fontEntity.text(this._value), this._fontEntity.color(this._color)), this.emit("change", this._value)), this) : this._value
        },
        fontSheet: function(t) {
            return t !== void 0 ? (this._fontSheet = t, this._fontEntity.texture(this._fontSheet), this) : this._fontSheet
        },
        font: function(t) {
            return t !== void 0 ? typeof t == "string" ? this.nativeFont(t) : this.fontSheet(t) : this._fontEntity._nativeMode ? this.nativeFont() : this.fontSheet()
        },
        nativeFont: function(t) {
            return t !== void 0 ? (this._fontEntity.nativeFont(t), this) : this._fontEntity.nativeFont()
        },
        nativeStroke: function(t) {
            return t !== void 0 ? (this._fontEntity.nativeStroke(t), this) : this._fontEntity.nativeStroke()
        },
        nativeStrokeColor: function(t) {
            return t !== void 0 ? (this._fontEntity.nativeStrokeColor(t), this) : this._fontEntity.nativeStrokeColor()
        },
        color: function(t) {
            return t !== void 0 ? (this._color = t, !this._value && this._placeHolder && this._placeHolderColor ? this._fontEntity.color(this._placeHolderColor) : this._fontEntity.color(t), this) : this._color
        },
        _mounted: function() {
            !this._value && this._placeHolder && (this._fontEntity.text(this._placeHolder), this._fontEntity.color(this._placeHolderColor)), $i_62.prototype._mounted.call(this)
        }
    }),
    $i_114 = $i_60.extend({
        classId: "$i_114",
        init: function() {
            igeConfig.debug && (igeConfig.debug._enabled || (igeConfig.debug._timing = !1)), this._alwaysInView = !0, this._id = "ige", this.basePath = "", this.isServer = typeof module != "undefined" && module.exports !== void 0, this.isClient = !this.isServer, ige = this, $i_60.prototype.init.call(this), this.isClient && this.addComponent($i_43), this._textureStore = [], this._idCounter = (new Date).getTime(), this.isServer, this.addComponent($i_14), this.addComponent($i_12), this.addComponent($i_9), this.isClient && this.addComponent($i_19), this._renderModes = ["2d", "three"], this._requireScriptTotal = 0, this._requireScriptLoading = 0, this._loadingPreText = void 0, this._enableUpdates = !0, this._enableRenders = !0, this._showSgTree = !1, this._debugEvents = {}, this._renderContext = "2d", this._renderMode = this._renderModes[this._renderContext], this._tickTime = "NA", this._updateTime = "NA", this._renderTime = "NA", this._tickDelta = 0, this._fpsRate = 60, this._state = 0, this._textureImageStore = {}, this._texturesLoading = 0, this._texturesTotal = 0, this._dependencyQueue = [], this._drawCount = 0, this._dps = 0, this._dpf = 0, this._frames = 0, this._fps = 0, this._clientNetDiff = 0, this._frameAlternator = !1, this._viewportDepth = !1, this._mousePos = new $i_5(0, 0, 0), this._currentViewport = null, this._currentCamera = null, this._currentTime = 0, this._globalSmoothing = !1, this._register = {
                ige: this
            }, this._categoryRegister = {}, this._groupRegister = {}, this._postTick = [], this._timeSpentInUpdate = {}, this._timeSpentLastUpdate = {}, this._timeSpentInTick = {}, this._timeSpentLastTick = {}, this._timeScale = 1, this._globalScale = new $i_5(1, 1, 1), this._graphInstances = [], this._spawnQueue = [], this._ctx = $i_50, this._headless = !0, this.dependencyTimeout(3e4), this._dependencyQueue.push(this.texturesLoaded), this._secondTimer = setInterval(this._secondTick, 1e3)
        },
        $: function(t) {
            return typeof t == "string" ? this._register[t] : typeof t == "object" ? t : this
        },
        $$: function(t) {
            return this._categoryRegister[t] || new $i_79
        },
        $$$: function(t) {
            return this._groupRegister[t] || new $i_79
        },
        register: function(t) {
            return t !== void 0 ? this._register[t.id()] ? (t._registered = !1, this.log('Cannot add object id "' + t.id() + '" to scenegraph because there is already another object in the graph with the same ID!', "error"), !1) : (this._register[t.id()] = t, t._registered = !0, this) : this._register
        },
        unRegister: function(t) {
            return t !== void 0 && this._register[t.id()] && (delete this._register[t.id()], t._registered = !1), this
        },
        categoryRegister: function(t) {
            return t !== void 0 && (this._categoryRegister[t._category] = this._categoryRegister[t._category] || new $i_79, this._categoryRegister[t._category].push(t), t._categoryRegistered = !0), this._register
        },
        categoryUnRegister: function(t) {
            return t !== void 0 && this._categoryRegister[t._category] && (this._categoryRegister[t._category].pull(t), t._categoryRegistered = !1), this
        },
        groupRegister: function(t, e) {
            return t !== void 0 && (this._groupRegister[e] = this._groupRegister[e] || new $i_79, this._groupRegister[e].push(t), t._groupRegistered = !0), this._register
        },
        groupUnRegister: function(t, e) {
            return t !== void 0 && (e !== void 0 ? this._groupRegister[e] && (this._groupRegister[e].pull(t), t.groupCount() || (t._groupRegister = !1)) : t.removeAllGroups()), this
        },
        sync: function(t, e) {
            typeof e == "string" && (e = [e]), this._syncArr = this._syncArr || [], this._syncArr.push({
                method: t,
                attrArr: e
            }), this._syncArr.length === 1 && (this._syncIndex = 0, this._processSync())
        },
        _processSync: function() {
            var t;
            ige._syncArr.length > ige._syncIndex ? (t = ige._syncArr[ige._syncIndex], t.attrArr.push(function() {
                ige._syncIndex++, setTimeout(ige._processSync, 1)
            }), t.method.apply(ige, t.attrArr)) : (delete ige._syncArr, delete ige._syncIndex, ige.emit("syncComplete"))
        },
        requireScript: function(t, e) {
            if (t !== void 0) {
                var i = this;
                i._requireScriptTotal++, i._requireScriptLoading++;
                var n = document.createElement("script");
                n.addEventListener("load", function() {
                    i._requireScriptLoaded(this), e && setTimeout(function() {
                        e()
                    }, 100)
                }), document.body.appendChild(n), n.src = t, this.log("Loading script from: " + t), this.emit("requireScriptLoading", t)
            }
        },
        _requireScriptLoaded: function(t) {
            this._requireScriptLoading--, this.emit("requireScriptLoaded", t.src), this._requireScriptLoading === 0 && this.emit("allRequireScriptsLoaded")
        },
        requireStylesheet: function(t) {
            if (t !== void 0) {
                var e = document.createElement("link");
                e.rel = "stylesheet", e.type = "text/css", e.media = "all", e.href = t, document.getElementsByTagName("head")[0].appendChild(e), this.log("Load css stylesheet from: " + t)
            }
        },
        addGraph: function(t, e) {
            if (t !== void 0) {
                var i, n = this.getClass(t);
                n ? (this.log("Loading SceneGraph data class: " + t), i = this.newClassInstance(t), typeof i.addGraph == "function" && typeof i.removeGraph == "function" ? (i.addGraph(e), this._graphInstances[t] = i) : this.log('Could not load graph for class name "' + t + '" because the class does not implement both the require methods "addGraph()" and "removeGraph()".', "error")) : this.log('Cannot load graph for class name "' + t + '" because the class could not be found. Have you included it in your server/clientConfig.js file?', "error")
            }
            return this
        },
        removeGraph: function(t, e) {
            if (t !== void 0) {
                var i = this._graphInstances[t];
                i ? (this.log("Removing SceneGraph data class: " + t), i.removeGraph(e), delete this._graphInstances[t]) : this.log('Cannot remove graph for class name "' + t + '" because the class instance could not be found. Did you add it via ige.addGraph() ?', "error")
            }
            return this
        },
        enableUpdates: function(t) {
            return t !== void 0 ? (this._enableUpdates = t, this) : this._enableUpdates
        },
        enableRenders: function(t) {
            return t !== void 0 ? (this._enableRenders = t, this) : this._enableRenders
        },
        debugEnabled: function(t) {
            return t !== void 0 ? (igeConfig.debug && (igeConfig.debug._enabled = t), this) : igeConfig.debug._enabled
        },
        debugTiming: function(t) {
            return t !== void 0 ? (igeConfig.debug && (igeConfig.debug._timing = t), this) : igeConfig.debug._timing
        },
        debug: function(t) {
            this._debugEvents[t] === !0 || this._debugEvents[t] === ige._frames
        },
        debugEventOn: function(t) {
            this._debugEvents[t] = !0
        },
        debugEventOff: function(t) {
            this._debugEvents[t] = !1
        },
        triggerDebugEventFrame: function(t) {
            this._debugEvents[t] = ige._frames
        },
        hideAllExcept: function(t) {
            var e, i = this._register;
            for (e in i) e !== t && i[e].opacity(0)
        },
        showAll: function() {
            var t, e = this._register;
            for (t in e) e[t].show()
        },
        setFps: function(t) {
            t !== void 0 && (this.isServer ? requestAnimFrame = function(e) {
                setTimeout(function() {
                    e((new Date).getTime())
                }, 1e3 / t)
            } : window.requestAnimFrame = function(e) {
                setTimeout(function() {
                    e((new Date).getTime())
                }, 1e3 / t)
            })
        },
        showStats: function() {
            this.log("showStats has been removed from the ige in favour of the new editor component, please remove this call from your code.")
        },
        defineClass: function(t, e) {
            igeClassStore[t] = e
        },
        getClass: function(t) {
            return igeClassStore[t]
        },
        classDefined: function(t) {
            return Boolean(igeClassStore[t])
        },
        newClassInstance: function(t, e) {
            return new igeClassStore[t](e)
        },
        dependencyCheck: function() {
            var t = this._dependencyQueue,
                e = t.length;
            while (e--)
                if (!this._dependencyQueue[e]()) return !1;
            return !0
        },
        viewportDepth: function(t) {
            return t !== void 0 ? (this._viewportDepth = t, this) : this._viewportDepth
        },
        dependencyTimeout: function(t) {
            this._dependencyCheckTimeout = t
        },
        updateProgress: function() {
            if (typeof document != "undefined" && document.getElementById) {
                var t = document.getElementById("loadingProgressBar"),
                    e = document.getElementById("loadingText");
                if (t) {
                    var i = parseInt(t.parentNode.offsetWidth),
                        n = Math.floor(i / this._texturesTotal * (this._texturesTotal - this._texturesLoading));
                    t.style.width = n + "px", e && (this._loadingPreText === void 0 && (this._loadingPreText = e.innerHTML), e.innerHTML = this._loadingPreText + " " + Math.floor(100 / this._texturesTotal * (this._texturesTotal - this._texturesLoading)) + "%")
                }
            }
        },
        textureLoadStart: function(t, e) {
            this._texturesLoading++, this._texturesTotal++, this.updateProgress(), this.emit("textureLoadStart", e)
        },
        textureLoadEnd: function(t, e) {
            var i = this;
            e._destroyed || this._textureStore.push(e), this._texturesLoading--, this.updateProgress(), this.emit("textureLoadEnd", e), this._texturesLoading === 0 && (this.updateProgress(), setTimeout(function() {
                i._allTexturesLoaded()
            }, 100))
        },
        textureFromUrl: function(t) {
            var e, i = this._textureStore,
                n = i.length;
            while (n--)
                if (e = i[n], e._url === t) return e
        },
        texturesLoaded: function() {
            return ige._texturesLoading === 0
        },
        _allTexturesLoaded: function() {
            this._loggedATL || (this._loggedATL = !0, this.log("All textures have loaded")), this.emit("texturesLoaded")
        },
        globalSmoothing: function(t) {
            return t !== void 0 ? (this._globalSmoothing = t, this) : this._globalSmoothing
        },
        canvasReady: function() {
            return ige._canvas !== void 0 || ige.isServer
        },
        newId: function() {
            return this._idCounter++, this._idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17)) + ""
        },
        newIdHex: function() {
            return this._idCounter++, (this._idCounter + (Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17) + Math.random() * Math.pow(10, 17))).toString(16)
        },
        newIdFromString: function(t) {
            if (t !== void 0) {
                var e, i, n = 0,
                    s = t.length;
                for (i = 0; s > i; i++) n += t.charCodeAt(i) * Math.pow(10, 17);
                e = n.toString(16);
                while (ige.$(e)) n += Math.pow(10, 17), e = n.toString(16);
                return e
            }
        },
        start: function(t) {
            if (!ige._state)
                if (ige.dependencyCheck()) {
                    if (ige.log("Starting engine..."), ige._state = 1, this.isClient && document.getElementsByClassName && document.getElementsByClassName("igeLoading")) {
                        var e = document.getElementsByClassName("igeLoading"),
                            i = e.length;
                        while (i--) e[i].parentNode.removeChild(e[i])
                    }
                    requestAnimFrame(ige.engineStep), ige.log("Engine started"), typeof t == "function" && t(!0)
                } else {
                    var n = (new Date).getTime();
                    ige._dependencyCheckStart || (ige._dependencyCheckStart = n), n - ige._dependencyCheckStart > this._dependencyCheckTimeout ? (this.log("Engine start failed because the dependency check timed out after " + this._dependencyCheckTimeout / 1e3 + " seconds", "error"), typeof t == "function" && t(!1)) : setTimeout(function() {
                        ige.start(t)
                    }, 200)
                }
        },
        stop: function() {
            return this._state ? (this.log("Stopping engine..."), this._state = 0, !0) : !1
        },
        autoSize: function(t) {
            return t !== void 0 ? (this._autoSize = t, this) : this._autoSize
        },
        pixelRatioScaling: function(t) {
            return t !== void 0 ? (this._pixelRatioScaling = t, this) : this._pixelRatioScaling
        },
        renderContext: function(t) {
            return t !== void 0 ? (this._renderContext = t, this._renderMode = this._renderModes[t], this.log("Rendering mode set to: " + t), this) : this._renderContext
        },
        createFrontBuffer: function(t, e) {
            this.isClient && (this._canvas || (this._createdFrontBuffer = !0, this._pixelRatioScaling = !e, this._frontBufferSetup(t, e)))
        },
        _frontBufferSetup: function(t) {
            var e = document.createElement("canvas");
            e.id = "igeFrontBuffer", this.canvas(e, t), document.getElementById("game-div").appendChild(e)
        },
        canvas: function(t, e) {
            return t !== void 0 && (this._canvas || (this._canvas = t, this._ctx = this._canvas.getContext(this._renderContext), this._pixelRatioScaling ? (this._devicePixelRatio = window.devicePixelRatio || 1, this._backingStoreRatio = this._ctx.webkitBackingStorePixelRatio || this._ctx.mozBackingStorePixelRatio || this._ctx.msBackingStorePixelRatio || this._ctx.oBackingStorePixelRatio || this._ctx.backingStorePixelRatio || 1, this._deviceFinalDrawRatio = this._devicePixelRatio / this._backingStoreRatio) : (this._devicePixelRatio = 1, this._backingStoreRatio = 1, this._deviceFinalDrawRatio = 1), e && (this._autoSize = e), window.addEventListener("resize", this._resizeEvent), this._resizeEvent(), this._ctx = this._canvas.getContext(this._renderContext), this._headless = !1, this.input.setupListeners(this._canvas))), this._canvas
        },
        clearCanvas: function() {
            this._ctx && this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
        },
        removeCanvas: function() {
            this.input && this.input.destroyListeners(), window.removeEventListener("resize", this._resizeEvent), this._createdFrontBuffer && document.body.removeChild(this._canvas), delete this._canvas, delete this._ctx, this._ctx = $i_50, this._headless = !0
        },
        openUrl: function(t) {
            t !== void 0 && (ige.cocoonJs && ige.cocoonJs.detected ? ige.cocoonJs.openUrl(t) : window.open(t))
        },
        showWebView: function(t) {
            if (ige.cocoonJs && ige.cocoonJs.detected) ige.cocoonJs.showWebView(t);
            else {
                var e = document.getElementById("igeOverlay");
                e || (e = document.createElement("iframe"), e.id = "igeOverlay", e.style.position = "absolute", e.style.border = "none", e.style.left = "0px", e.style.top = "0px", e.style.width = "100%", e.style.height = "100%", document.body.appendChild(e)), t !== void 0 && (e.src = t), e.style.display = "block"
            }
            return this
        },
        hideWebView: function() {
            if (ige.cocoonJs && ige.cocoonJs.detected) ige.cocoonJs.hideWebView();
            else {
                var t = document.getElementById("igeOverlay");
                t && (t.style.display = "none")
            }
            return this
        },
        layerCall: function(js) {
            js !== void 0 && eval(js)
        },
        mousePos: function() {
            return this._mousePos.clone()
        },
        mouseOverList: function(t, e) {
            var i, n, s, o, r = !1;
            if (t || (t = ige, e = [], r = !0), t === ige) {
                if (i = t._children) {
                    n = i.length;
                    while (n--) i[n]._scene && i[n]._scene._shouldRender && this.mouseOverList(i[n]._scene, e)
                }
            } else if (s = this.mousePosWorld(), s && t.aabb && (o = t.aabb(), o.xyInside(s.x, s.y) && e.push(t)), i = t._children) {
                n = i.length;
                while (n--) this.mouseOverList(i[n], e)
            }
            return r && e.reverse(), e
        },
        _resizeEvent: function(t) {
            var e;
            if (ige._autoSize) {
                var i = window.innerWidth,
                    n = window.innerHeight,
                    s = ige._children,
                    o = s.length;
                ige._canvas && (e = ige._canvasPosition(), i -= parseInt(e.left), n -= parseInt(e.top), i % 2 && i--, n % 2 && n--, ige._canvas.width = i * ige._deviceFinalDrawRatio, ige._canvas.height = n * ige._deviceFinalDrawRatio, ige._deviceFinalDrawRatio !== 1 && (ige._canvas.style.width = i + "px", ige._canvas.style.height = n + "px", ige._ctx.scale(ige._deviceFinalDrawRatio, ige._deviceFinalDrawRatio))), ige._bounds2d = new $i_5(i, n, 0);
                while (o--) s[o]._resizeEvent(t)
            } else ige._canvas && (ige._bounds2d = new $i_5(ige._canvas.width, ige._canvas.height, 0));
            if (ige._showSgTree) {
                var r = document.getElementById("igeSgTree");
                e = ige._canvasPosition(), r.style.top = parseInt(e.top) + 5 + "px", r.style.left = parseInt(e.left) + 5 + "px", r.style.height = ige._bounds2d.y - 30 + "px"
            }
            ige._resized = !0
        },
        _canvasPosition: function() {
            try {
                return ige._canvas.getBoundingClientRect()
            } catch (t) {
                return {
                    top: ige._canvas.offsetTop,
                    left: ige._canvas.offsetLeft
                }
            }
        },
        toggleFullScreen: function() {
            var t = this._canvas;
            t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen && t.webkitRequestFullscreen()
        },
        watchStart: function(t) {
            return this._watch = this._watch || [], this._watch.push(t), this._watch.length - 1
        },
        watchStop: function(t) {
            this._watch = this._watch || [], this._watch.splice(t, 1)
        },
        traceSet: function(t, e, i, n) {
            t.___igeTraceCurrentVal = t.___igeTraceCurrentVal || {}, t.___igeTraceCurrentVal[e] = t[e], t.___igeTraceMax = i || 1, t.___igeTraceCount = 0, Object.defineProperty(t, e, {
                get: function() {
                    return t.___igeTraceCurrentVal[e]
                },
                set: function(i) {
                    n && n(i), t.___igeTraceCurrentVal[e] = i, t.___igeTraceCount++, t.___igeTraceCount === t.___igeTraceMax && ige.traceSetOff(t, e)
                }
            })
        },
        traceSetOff: function(t, e) {
            Object.defineProperty(t, e, {
                set: function(t) {
                    this.___igeTraceCurrentVal[e] = t
                }
            })
        },
        findBaseClass: function(t) {
            return t && t._classId ? t._classId.substr(0, 3) === "Ige" ? t._classId : t.__proto__._classId ? this.findBaseClass(t.__proto__) : "" : ""
        },
        getClassDerivedList: function(t, e) {
            return e ? t._classId && e.push(t._classId) : e = [], t.__proto__._classId && this.getClassDerivedList(t.__proto__, e), e
        },
        spawnQueue: function(t) {
            return t !== void 0 ? (this._spawnQueue.push(t), this) : this._spawnQueue
        },
        _secondTick: function() {
            var t = ige;
            t._fps = t._frames, t._dps = t._dpf * t._fps, t._frames = 0, t._drawCount = 0
        },
        timeScale: function(t) {
            return t !== void 0 ? (this._timeScale = t, this) : this._timeScale
        },
        incrementTime: function(t, e) {
            return this._pause || (e || (e = t), this._currentTime += (t - e) * this._timeScale), this._currentTime
        },
        currentTime: function() {
            return this._currentTime
        },
        pause: function(t) {
            return t !== void 0 ? (this._pause = t, this) : this._pause
        },
        useManualTicks: function(t) {
            return t !== void 0 ? (this._useManualTicks = t, this) : this._useManualTicks
        },
        manualTick: function() {
            this._manualFrameAlternator !== this._frameAlternator && (this._manualFrameAlternator = this._frameAlternator, requestAnimFrame(this.engineStep))
        },
        useManualRender: function(t) {
            return t !== void 0 ? (this._useManualRender = t, this) : this._useManualRender
        },
        manualRender: function() {
            this._manualRender = !0
        },
        engineStep: function(t, e) {
            var i, n, s, o, r, a, h, d, l, u = ige,
                c = u._postTick,
                _ = c.length;
            if (u.incrementTime(t, u._timeScaleLastTimestamp), u._timeScaleLastTimestamp = t, t = Math.floor(u._currentTime), igeConfig.debug._timing && (i = (new Date).getTime()), u._state) {
                for (e === void 0 && (e = u._ctx), u._frameAlternator = !u._frameAlternator, ige._useManualTicks ? u._manualFrameAlternator = !u._frameAlternator : requestAnimFrame(u.engineStep), u._tickStart = t, u._tickStart -= u._clientNetDiff, u.lastTick ? u._tickDelta = u._tickStart - u.lastTick : (u.lastTick = 0, u._tickDelta = 0), a = ige._spawnQueue, h = a.length, d = h - 1; d >= 0; d--) l = a[d], l._bornTime > ige._currentTime || (l.mount(ige.$(l._birthMount)), a.splice(d, 1));
                for (u._enableUpdates && (igeConfig.debug._timing ? (s = (new Date).getTime(), u.updateSceneGraph(e), ige._updateTime = (new Date).getTime() - s) : u.updateSceneGraph(e)), u._enableRenders && (u._useManualRender ? u._manualRender && (igeConfig.debug._timing ? (o = (new Date).getTime(), u.renderSceneGraph(e), ige._renderTime = (new Date).getTime() - o) : u.renderSceneGraph(e), u._manualRender = !1) : igeConfig.debug._timing ? (o = (new Date).getTime(), u.renderSceneGraph(e), ige._renderTime = (new Date).getTime() - o) : u.renderSceneGraph(e)), r = 0; _ > r; r++) c[r]();
                u.lastTick = u._tickStart, u._frames++, u._dpf = u._drawCount, u._drawCount = 0, u.input.tick()
            }
            u._resized = !1, igeConfig.debug._timing && (n = (new Date).getTime(), ige._tickTime = n - i)
        },
        updateSceneGraph: function(t) {
            var e, i, n, s = this._children,
                o = ige._tickDelta;
            if (this._processUpdateBehaviours(t, o), s)
                if (e = s.length, igeConfig.debug._timing)
                    while (e--) i = (new Date).getTime(), s[e].update(t, o), n = (new Date).getTime() - i, s[e] && (ige._timeSpentInUpdate[s[e].id()] || (ige._timeSpentInUpdate[s[e].id()] = 0), ige._timeSpentLastUpdate[s[e].id()] || (ige._timeSpentLastUpdate[s[e].id()] = {}), ige._timeSpentInUpdate[s[e].id()] += n, ige._timeSpentLastUpdate[s[e].id()].ms = n);
                else
                    while (e--) s[e].update(t, o)
        },
        renderSceneGraph: function(t) {
            var e, i;
            this._processTickBehaviours(t), this._viewportDepth && (igeConfig.debug._timing ? (e = (new Date).getTime(), this.depthSortChildren(), i = (new Date).getTime() - e, ige._timeSpentLastTick[this.id()] || (ige._timeSpentLastTick[this.id()] = {}), ige._timeSpentLastTick[this.id()].depthSortChildren = i) : this.depthSortChildren()), t.save(), t.translate(this._bounds2d.x2, this._bounds2d.y2);
            var n, s = this._children;
            if (s)
                if (n = s.length, igeConfig.debug._timing)
                    while (n--) t.save(), e = (new Date).getTime(), s[n].tick(t), i = (new Date).getTime() - e, s[n] && (ige._timeSpentInTick[s[n].id()] || (ige._timeSpentInTick[s[n].id()] = 0), ige._timeSpentLastTick[s[n].id()] || (ige._timeSpentLastTick[s[n].id()] = {}), ige._timeSpentInTick[s[n].id()] += i, ige._timeSpentLastTick[s[n].id()].ms = i), t.restore();
                else
                    while (n--) t.save(), s[n].tick(t), t.restore();
            t.restore()
        },
        fps: function() {
            return this._fps
        },
        dpf: function() {
            return this._dpf
        },
        dps: function() {
            return this._dps
        },
        analyseTiming: function() {
            igeConfig.debug._timing || this.log("Cannot analyse timing because the igeConfig.debug._timing flag is not enabled so no timing data has been recorded!", "warning")
        },
        saveSceneGraph: function(t) {
            var e, i, n;
            if (t || (t = this.getSceneGraphData()), t.obj.stringify ? t.str = t.obj.stringify() : console.log("Class " + t.classId + " has no stringify() method! For object: " + t.id, t.obj), e = t.items)
                for (i = e.length, n = 0; i > n; n++) this.saveSceneGraph(e[n]);
            return t
        },
        sceneGraph: function(t, e) {
            var i, n, s, o, r = "";
            for (e === void 0 && (e = 0), t || (t = ige), i = 0; e > i; i++) r += "----";
            if (igeConfig.debug._timing ? (n = "", n += "T: " + ige._timeSpentInTick[t.id()], ige._timeSpentLastTick[t.id()] && (typeof ige._timeSpentLastTick[t.id()].ms == "number" && (n += " | LastTick: " + ige._timeSpentLastTick[t.id()].ms), typeof ige._timeSpentLastTick[t.id()].depthSortChildren == "number" && (n += " | ChildDepthSort: " + ige._timeSpentLastTick[t.id()].depthSortChildren)), console.log(r + t.id() + " (" + t._classId + ") : " + t._inView + " Timing(" + n + ")")) : console.log(r + t.id() + " (" + t._classId + ") : " + t._inView), e++, t === ige) {
                if (s = t._children) {
                    o = s.length;
                    while (o--) s[o]._scene && s[o]._scene._shouldRender && (igeConfig.debug._timing ? (n = "", n += "T: " + ige._timeSpentInTick[s[o].id()], ige._timeSpentLastTick[s[o].id()] && (typeof ige._timeSpentLastTick[s[o].id()].ms == "number" && (n += " | LastTick: " + ige._timeSpentLastTick[s[o].id()].ms), typeof ige._timeSpentLastTick[s[o].id()].depthSortChildren == "number" && (n += " | ChildDepthSort: " + ige._timeSpentLastTick[s[o].id()].depthSortChildren)), console.log(r + "----" + s[o].id() + " (" + s[o]._classId + ") : " + s[o]._inView + " Timing(" + n + ")")) : console.log(r + "----" + s[o].id() + " (" + s[o]._classId + ") : " + s[o]._inView), this.sceneGraph(s[o]._scene, e + 1))
                }
            } else if (s = t._children) {
                o = s.length;
                while (o--) this.sceneGraph(s[o], e)
            }
        },
        getSceneGraphData: function(t, e) {
            var i, n, s, o, r, a, h = [];
            if (t || (t = ige), i = {
                    text: "[" + t._classId + "] " + t.id(),
                    id: t.id(),
                    classId: t.classId()
                }, e ? i.parentId = t._parent ? t._parent.id() : "sceneGraph" : (i.parent = t._parent, i.obj = t), t === ige) {
                if (r = t._children) {
                    a = r.length;
                    while (a--) n = {
                        text: "[" + r[a]._classId + "] " + r[a].id(),
                        id: r[a].id(),
                        classId: r[a].classId()
                    }, e ? r[a]._parent && (n.parentId = r[a]._parent.id()) : (n.parent = r[a]._parent, n.obj = r[a]), r[a].camera ? (o = {
                        text: "[$i_71] " + r[a].id(),
                        id: r[a].camera.id(),
                        classId: r[a].camera.classId()
                    }, e ? o.parentId = r[a].id() : (o.parent = r[a], o.obj = r[a].camera), r[a]._scene && (s = this.getSceneGraphData(r[a]._scene, e), n.items = [o, s])) : r[a]._scene && (s = this.getSceneGraphData(r[a]._scene, e), n.items = [s]), h.push(n)
                }
            } else if (r = t._children) {
                a = r.length;
                while (a--) n = this.getSceneGraphData(r[a], e), h.push(n)
            }
            return h.length > 0 && (i.items = h), i
        },
        _childMounted: function(t) {
            t.$i_72 && (ige._currentViewport || (ige._currentViewport = t, ige._currentCamera = t.camera)), $i_60.prototype._childMounted.call(this, t)
        },
        destroy: function() {
            this.stop(), this.isClient && this.removeCanvas(), $i_60.prototype.destroy.call(this), this.log("Engine destroy complete.")
        }
    });
typeof module != "undefined" && module.exports !== void 0 && (module.exports = $i_114);
var PlayerUnit = $i_60Box2d.extend({
    classId: "PlayerUnit",
    init: function(t) {
        this.stats = t, this._currentTransform = [], this._previousTransform = [], this.name = "player", $i_60Box2d.prototype.init.call(this);
        var e = this;
        this.streamSectionData = function(t, i, n) {
            return i && t === "transform" && e._fixRotationInterpolation({
                transformData: i.split(",")
            }), $i_60.prototype.streamSectionData.call(this, t, i, n)
        }, ige.isServer && (this.addComponent(PlayerComponent), this.addComponent($i_11)), ige.isClient && (this.stats.currentJoint = void 0, this.depth(3).layer(2), ige.ui.style(".player-name", {
            font: "1.3em Open Sans",
            "margin-left": "auto",
            color: "#FFF",
            width: 60,
            height: 50,
            top: 10
        }), e.playerName = (new $i_93).styleClass("player-name").value(e.stats.playerName).layer(20).mount(e), this.updateTexture())
    },
    zombify: function(t) {
        t == void 0 && (t = "zombie"), this.stats.state = t, this.stats.items = {}, ige.network.send("updatePlayerUnitTexture", {
            unitId: this.id(),
            stats: this.stats
        })
    },
    addItem: function(t) {
        this.clearInventory(), this.stats.items[t] = {}
    },
    clearInventory: function() {
        var t = this.stats.items.pill;
        this.stats.items = {}, this.stats.items.pill = t
    },
    streamCreateData: function() {
        return this.stats
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    },
    updateTexture: function() {
        if (ige.isClient) {
            if (this.stats.state == "sick") {
                if (this.stats.skin == "man") var t = new $i_54("../assets/spritesheet/" + this.stats.skin + "_sick.png")
            } else if (this.stats.state == "zombieKing")
                if (this.stats.skin == "man") var t = new $i_54("../assets/spritesheet/" + this.stats.skin + "_zombie_king.png");
                else var t = new $i_54("../assets/spritesheet/" + this.stats.skin + "_zombie.png");
            else if (this.stats.state == "zombie") var t = new $i_54("../assets/spritesheet/" + this.stats.skin + "_zombie.png");
            else if (this.stats.items.pill != void 0 && this.stats.skin == "man") var t = new $i_54("../assets/spritesheet/" + this.stats.skin + "_immune.png");
            else var t = new $i_54("../assets/spritesheet/" + this.stats.skin + ".png");
            this.texture(t)
        }
    },
    _fixRotationInterpolation: function(t) {
        this._previousTransform = this._currentTransform, this._currentTransform = t.transformData;
        var e = 5,
            i = Math.abs(this._currentTransform[8] - this._previousTransform[8]);
        i > e && (this._transform(this._previousTransform), this._timeStream = [])
    },
    _transform: function(t) {
        this.translateTo(t[0], t[1], t[2]), this.scaleTo(t[3], t[4], t[5]), this.rotateTo(t[6], t[7], t[8])
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = PlayerUnit);
var ClientScore = $i_63.extend({
        classId: "ClientScore",
        init: function(t) {
            $i_63.prototype.init.call(this), this.depth(1).layer(2e4).width(400).height(80).texture(ige.client.fontTexture).textLineSpacing(0).text(t).hide()
        },
        start: function(t) {
            var e = this;
            return t ? (setTimeout(function() {
                e.start()
            }, t), void 0) : (this.show(), this._translate.tween().duration(1e3).properties({
                y: this._translate.y - 25
            }).afterTween(function() {
                e.tween().duration(300).properties({
                    _opacity: 0
                }).afterTween(function() {
                    e.destroy()
                }).start()
            }).start(), void 0)
        }
    }),
    Stick = $i_60Box2d.extend({
        classId: "Stick",
        init: function(t) {
            $i_60Box2d.prototype.init.call(this);
            var e, i = this;
            i.original = t, ige.isServer ? i.width(t.width).height(t.height).box2dBody({
                type: "dynamic",
                linearDamping: 1,
                angularDamping: 1,
                allowSleep: !0,
                bullet: !1,
                fixedRotation: !1,
                fixtures: [{
                    density: 4,
                    friction: 1,
                    restitution: .1,
                    shape: {
                        type: "rectangle"
                    }
                }]
            }).streamMode(1).mount(ige.$("baseScene")) : ige.isClient && (e = new $i_54("../assets/spritesheet/stick.png"), i.depth(3).layer(2).width(t.width).height(t.height).texture(e))
        },
        streamCreateData: function() {
            return this.original
        },
        tick: function(t) {
            $i_60Box2d.prototype.tick.call(this, t)
        }
    });
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Stick);
var BaseballBat = $i_60Box2d.extend({
    classId: "BaseballBat",
    init: function(t) {
        $i_60Box2d.prototype.init.call(this);
        var e, i = this;
        i.original = t, ige.isServer ? i.width(t.width).height(t.height).box2dBody({
            type: "dynamic",
            linearDamping: 5,
            angularDamping: 1,
            allowSleep: !0,
            bullet: !1,
            fixedRotation: !1,
            fixtures: [{
                density: 5.5,
                friction: 1,
                restitution: .1,
                shape: {
                    type: "rectangle"
                }
            }]
        }).streamMode(1).mount(ige.$("baseScene")) : ige.isClient && (e = new $i_54("../assets/spritesheet/baseball_bat.png"), i.depth(3).layer(2).width(t.width).height(t.height).texture(e))
    },
    streamCreateData: function() {
        return this.original
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = BaseballBat);
var Nunchucks = $i_60Box2d.extend({
    classId: "Nunchucks",
    init: function(t) {
        $i_60Box2d.prototype.init.call(this);
        var e, i = this;
        i.original = t, ige.isServer ? i.width(t.width).height(t.height).box2dBody({
            type: "dynamic",
            linearDamping: 3,
            angularDamping: 1,
            allowSleep: !0,
            bullet: !1,
            fixedRotation: !1,
            fixtures: [{
                density: 3,
                friction: 1,
                restitution: .1,
                shape: {
                    type: "rectangle"
                }
            }]
        }).streamMode(1).mount(ige.$("baseScene")) : ige.isClient && (e = new $i_54("../assets/spritesheet/nunchucks.png"), i.depth(3).layer(2).width(t.width).height(t.height).texture(e))
    },
    streamCreateData: function() {
        return this.original
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Nunchucks);
var Uzi = $i_60Box2d.extend({
    classId: "Uzi",
    init: function(t) {
        $i_60Box2d.prototype.init.call(this);
        var e, i = this;
        i.original = t, ige.isServer ? i.width(t.width).height(t.height).box2dBody({
            type: "dynamic",
            linearDamping: 1,
            angularDamping: .1,
            allowSleep: !0,
            bullet: !1,
            fixedRotation: !1,
            fixtures: [{
                density: 1,
                friction: 1,
                restitution: .1,
                fixedRotation: !1,
                shape: {
                    type: "rectangle"
                }
            }]
        }).streamMode(1).mount(ige.$("baseScene")) : ige.isClient && (e = new $i_54("../assets/spritesheet/uzi.png"), i.depth(3).layer(2).width(t.width).height(t.height).texture(e))
    },
    streamCreateData: function() {
        return this.original
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Uzi);
var PotatoGun = $i_60Box2d.extend({
    classId: "PotatoGun",
    init: function(t) {
        $i_60Box2d.prototype.init.call(this);
        var e, i = this;
        i.original = t, ige.isServer ? i.width(t.width).height(t.height).box2dBody({
            type: "dynamic",
            linearDamping: 5,
            angularDamping: .1,
            allowSleep: !0,
            bullet: !1,
            fixedRotation: !1,
            fixtures: [{
                density: 10,
                friction: 1,
                restitution: .1,
                fixedRotation: !1,
                shape: {
                    type: "rectangle"
                }
            }]
        }).streamMode(1).mount(ige.$("baseScene")) : ige.isClient && (e = new $i_54("../assets/spritesheet/potato_gun.png"), i.depth(3).layer(2).width(t.width).height(t.height).texture(e))
    },
    streamCreateData: function() {
        return this.original
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = PotatoGun);
var Potato = $i_60Box2d.extend({
    classId: "Potato",
    init: function(t) {
        $i_60Box2d.prototype.init.call(this);
        var e, i = this;
        i.original = t, ige.isServer && this.addComponent($i_11), ige.isClient && (e = new $i_54("../assets/spritesheet/potato.png"), i.depth(3).layer(2).width(t.width - 2).height(t.height - 2).texture(e))
    },
    streamCreateData: function() {
        return this.original
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Potato);
var BulletUzi = $i_60Box2d.extend({
    classId: "BulletUzi",
    init: function(t) {
        $i_60Box2d.prototype.init.call(this);
        var e, i = this;
        i.original = t, i.isBullet = !0, ige.isServer && this.addComponent($i_11), ige.isClient && (e = new $i_54("../assets/spritesheet/uzi_bullet.png"), i.depth(3).layer(2).width(t.width).height(t.height).texture(e))
    },
    streamCreateData: function() {
        return this.original
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = BulletUzi);
var ClientNetworkEvents = {
    _onUpdatePlayerUnitTexture: function(t) {
        unit = ige.$(t.unitId), unit != void 0 && t != void 0 && unit.stats != void 0 && t.stats != void 0 && (unit.stats = t.stats, unit.updateTexture())
    },
    _onGameOver: function() {
        isShoppingTime = !1, $("#gameover-label").show(), ige.client.adsDue && (setTimeout(function() {
            showAipMidroll()
        }, 3e3), ige.client.adsDue = !1);
        var t = !1,
            e = ige.client.scores;
        $("#survivor-list").html("");
        var i = [];
        for (var n in e) e[n].isZombie || (t = !0, e.hasOwnProperty(n) && i.push({
            key: n,
            value: e[n]
        }));
        for (i.sort(function(t, e) {
                return t.value.survivalTime - e.value.survivalTime
            }), n = i.length - 1; n >= 0; n--) t = !0, $("#survivor-list").append("<li class='text-left list-group-item " + (n == i.length - 1 ? "list-group-item-warning" : "") + "'>" + i[n].value.name + " <span class='badge '>" + ige.client.toHHMMSS(i[n].value.survivalTime) + "</span></li>");
        t ? ($("#gameover-label").removeClass("text-danger"), $("#gameover-label").addClass("text-success").html("Survivors WIN!!"), $("#gameover-modal").modal("show")) : ($("#gameover-label").removeClass("text-success"), $("#gameover-label").addClass("text-danger").html("ZOMBIES WIN!!"))
    },
    _onReset: function() {
        isShoppingTime = !0, $("#gameover-modal").modal("hide"), $("#gameover-label").hide(), $("#buy-item-pill").html("Buy (200)"), $("#buy-item-stick").html("Buy (500)"), $("#buy-item-baseball-bat").html("Buy (1000)"), $("#buy-item-nunchucks").html("Buy (1500)"), $("#buy-item-uzi").html("Buy (1500)"), $("#buy-item-potato-gun").html("Buy (2000)"), $("#buy-skin-taro").html("Buy (4000)"), $("#buy-skin-hobo").html("Buy (6000)"), $("#buy-skin-clown").html("Buy (8000)"), $("#buy-skin-ghost").html("Buy (10000)"), $("#buy-skin-mummy").html("Buy (12000)"), $("#buy-skin-dracula").html("Buy (14000)"), $("#buy-skin-harambe").html("Buy (20000)"), $("#store-button").show(), adIsPlaying || $("#shopping-modal").modal("show"), $("#play-button").addClass("disabled");
        for (var t in ige.client.scores) unit = ige.$(ige.client.scores[t].unitId), unit != void 0 && (unit.stats.state = "human", unit.updateTexture())
    },
    _onPlayerScores: function(t) {
        var e = t.state,
            i = "";
        e.gameState == PREOUTBREAK ? i = "Outbreak in " + e.time + " seconds" : e.gameState == POSTOUTBREAK ? (ige.client.playerUnit != void 0 && (i = ige.client.playerUnit.stats.state != "human" ? "Infect all humans in " + e.time + " seconds" : "Stay alive for " + e.time + " seconds"), $("#shopping-modal").modal("hide"), $("#store-button").hide()) : e.gameState == GAMEOVER && (i = "Game restarting in " + e.time + " seconds"), $("#counter-div").text(i), ige.client.scores = t.scores;
        var n = 0;
        ige.client.scores[ige.client.clientId] != void 0 && (n = Math.floor(ige.client.scores[ige.client.clientId].gold));
        var s = ige.client.playerUnit;
        if (n != ige.client.previousScore) {
            var o = n - ige.client.previousScore,
                r = "lime";
            0 > o && (r = "#ff6f6f"), new ClientScore(o).colorOverlay(r).translateTo(s._translate.x, s._translate.y - 20, 0).mount(ige.client.objectScene).start(), ige.client.previousScore = n
        }
        $("#player-gold").text(n), $("#player-score").text(n), $("#player-speed-buff").text((1 + n / 8e3).toFixed(2));
        var a = 0,
            h = "",
            d = [];
        for (var l in ige.client.scores) ige.client.scores[l].isZombie && a++, ige.client.scores.hasOwnProperty(l) && d.push({
            key: l,
            value: ige.client.scores[l]
        });
        for (d.sort(function(t, e) {
                return t.value.gold - e.value.gold
            }), l = d.length - 1; l >= 0 && l >= d.length - 10; l--) {
            if (h += d[l].key == ige.client.clientId ? "<div class='text-primary'>" : d[l].value.isZombie ? "<div class='text-danger'>" : "<div>", ige.client.players != void 0) var u = ige.client.players[d[l].key];
            u != void 0 && (h += u.name + " <small><span class='text-warning'>" + d[l].value.gold.toFixed(0) + "</span></small></div>")
        }
        ige.client.clientCount = d.length;
        var c = ige.client.clientCount - a;
        $("#zombie-count").html(a), $("#survivor-count").html(c), $("#scoreboard").html(h)
    },
    _onPlayerEntity: function(t) {
        if (ige.client.clientId = t.clientId, ige.$(t.unitId)) ige.client.playerUnit = ige.$(t.unitId), ige.client.playerUnit.addComponent(PlayerComponent), console.log("data1", ige.$(t.unitId));
        else {
            var e = this;
            e._eventListener = ige.network.stream.on("entityCreated", function(i) {
                i.id() === t.unitId && (ige.client.playerUnit = ige.$(t.unitId), ige.client.playerUnit.addComponent(PlayerComponent), ige.ui.style(".my-name", {
                    color: "lime"
                }), ige.client.playerUnit.playerName.styleClass("my-name"), ige.network.stream.off("entityCreated", e._eventListener, function(t) {
                    t || this.log("Could not disable event listener!", "warning")
                }), ige.client.vp1.camera.lookAt(ige.client.playerUnit, 0, ""), ige.client.vp1.camera.trackTranslate(ige.client.playerUnit, 15))
            })
        }
    },
    _onKillStreakMessage: function(t) {
        ige.client.showKillStreakMessage(t.playerName, t.killStreakCount)
    },
    _onUpdatePlayers: function(t) {
        ige.client.players = t
    },
    _onBuyItem: function(t) {
        t === "pill" && $("#buy-item-pill").html("Purchased"), t === "stick" && $("#buy-item-stick").html("Purchased"), t === "baseballBat" && $("#buy-item-baseball-bat").html("Purchased"), t === "nunchucks" && $("#buy-item-nunchucks").html("Purchased"), t === "potatoGun" && $("#buy-item-potato-gun").html("Purchased"), t === "uzi" && $("#buy-item-uzi").html("Purchased"), t === "taro" && $("#buy-item-taro").html("Purchased"), t === "hobo" && $("#buy-skin-hobo").html("Purchased"), t === "clown" && $("#buy-skin-clown").html("Purchased")
    },
    _onMaxPlayers: function(t) {
        console.log("max player reached", t), alert("Server is full. Please join another server")
    },
    _onNoDuplicateIps: function(t) {
        console.log("duplicate ip", t), alert("Max 2 duplicate IP's allowed")
    },
    _onAfkKick: function(t) {
        console.log("afk kick", t), alert("Disconnected for being AFK for over 200 seconds")
    },
    _onUpdatePlayerName: function(t) {
        console.log(t)
    }
};
typeof module != "undefined" && module.exports !== void 0 && (module.exports = ClientNetworkEvents);
var PlayerComponent = $i_60.extend({
    classId: "PlayerComponent",
    componentId: "playerControl",
    init: function(t, e) {
        this._entity = t, this._unit = t, this._options = e, this.controls = {
            moveKeyPressed: !1,
            direction: 0,
            left: !1,
            right: !1,
            up: !1,
            down: !1,
            mouseButton1: !1
        }, this._facingAngle = 0, this._speedBonus = 4, ige.input.mapAction("mouseButton1", ige.input.mouse.button1), ige.input.mapAction("a", ige.input.key.a), ige.input.mapAction("d", ige.input.key.d), ige.input.mapAction("w", ige.input.key.w), ige.input.mapAction("s", ige.input.key.s), ige.input.mapAction("left", ige.input.key.left), ige.input.mapAction("right", ige.input.key.right), ige.input.mapAction("up", ige.input.key.up), ige.input.mapAction("down", ige.input.key.down), ige.input.mapAction("enter", ige.input.key.enter), this._entity.addBehaviour("playerComponent_behaviour", this._behaviour)
    },
    _behaviour: function() {
        if (ige.isClient) {
            var t = 90 * Math.PI / 180,
                e = Math.atan2(ige.mousePos().y, ige.mousePos().x) + t;
            ige.network.send("playerMouseMoved", e), ige.input.actionState("enter") || ige.input.actionState("enter") ? this.playerControl.controls.enter || (this.playerControl.controls.enter = !0) : this.playerControl.controls.enter && (this.playerControl.controls.enter = !1, $("#message").is(":focus") ? $("#message").blur() : $("#message").focus()), ige.input.actionState("mouseButton1") ? (this.playerControl.controls.mouseButton1 = !0, ige.network.send("playerControlMouseButton1Down")) : (this.playerControl.controls.mouseButton1 = !1, ige.network.send("playerControlMouseButton1Up")), ige.input.actionState("left") || ige.input.actionState("a") ? this.playerControl.controls.left || $("#message").is(":focus") || (this.playerControl.controls.left = !0, ige.network.send("playerControlLeftDown")) : this.playerControl.controls.left && (this.playerControl.controls.left = !1, ige.network.send("playerControlLeftUp")), ige.input.actionState("right") || ige.input.actionState("d") ? this.playerControl.controls.right || $("#message").is(":focus") || (this.playerControl.controls.right = !0, ige.network.send("playerControlRightDown")) : this.playerControl.controls.right && (this.playerControl.controls.right = !1, ige.network.send("playerControlRightUp")), ige.input.actionState("up") || ige.input.actionState("w") ? this.playerControl.controls.up || $("#message").is(":focus") || (this.playerControl.controls.up = !0, ige.network.send("playerControlUpDown")) : this.playerControl.controls.up && (this.playerControl.controls.up = !1, ige.network.send("playerControlUpUp")), ige.input.actionState("down") || ige.input.actionState("s") ? this.playerControl.controls.down || $("#message").is(":focus") || (this.playerControl.controls.down = !0, ige.network.send("playerControlDownDown")) : this.playerControl.controls.down && (this.playerControl.controls.down = !1, ige.network.send("playerControlDownUp"))
        }
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = PlayerComponent);
var Debris = $i_60Box2d.extend({
    classId: "Debris",
    init: function(t) {
        $i_60Box2d.prototype.init.call(this);
        var e = this;
        if (e.original = t, ige.isServer && this.addComponent($i_11), ige.isClient) {
            if (ige.client.map == "two_houses-0.10") var i = [
                ["tilesheet.png", 27, 20, 1],
                ["2x1.png", 1, 3, 541],
                ["2x3.png", 2, 1, 544],
                ["3x1.png", 1, 3, 546],
                ["3x4.png", 2, 1, 549]
            ];
            else if (ige.client.map == "halloween-0.10") var i = [
                ["tilesheet.png", 27, 20, 1],
                ["2x3.png", 1, 2, 541],
                ["2x2.png", 2, 1, 543],
                ["1x3.png", 1, 3, 545],
                ["3x4.png", 2, 1, 548]
            ];
            else if (ige.client.map == "lab_escape-0.10") var i = [
                ["tilesheet.png", 27, 20, 1],
                ["1x8.png", 1, 1, 541],
                ["2x1.png", 5, 1, 542],
                ["5x3.png", 2, 1, 547],
                ["1x2.png", 1, 6, 549],
                ["1x3.png", 1, 6, 555]
            ];
            else if (ige.client.map == "huthut-0.10") var i = [
                ["tilesheet.png", 27, 20, 1],
                ["1x8.png", 1, 1, 541],
                ["2x1.png", 5, 1, 542],
                ["5x3.png", 2, 1, 547],
                ["1x2.png", 1, 6, 549],
                ["1x3.png", 1, 6, 555]
            ];
            for (var n = 0; i.length - 1 > n; n++) {
                var s = i[n],
                    o = i[n + 1];
                if (e.original.gid >= s[3] && o[3] > e.original.gid) var r = s
            }
            if (r == void 0) var r = i[i.length - 1];
            var a = new $i_55("../assets/maps/" + ige.client.map + "/" + r[0], r[1], r[2]),
                h = a.textureFromCell(e.original.gid - (r[3] - 1));
            e.depth(3).layer(2).width(t.width - 2).height(t.height - 2).texture(h)
        }
    },
    setTexture: function(t) {
        this.cellSheets = t
    },
    streamCreateData: function() {
        return this.original
    },
    tick: function(t) {
        $i_60Box2d.prototype.tick.call(this, t)
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Debris);
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
    }
};
isMobile.Android() ? window.location.replace("https://play.google.com/store/apps/details?id=com.jaeyunnoh.braainsio") : isMobile.iOS() && window.location.replace("https://itunes.apple.com/us/app/braains.io/id1177022124?mt=8"), $.cookie("fb-shared") || ($("#unlock-skin-button").removeClass("hidden"), $(".btn-buy-skin").addClass("disabled")), $(".fb-share").on("click", function() {
    shareOnFB()
});
var adIsPlaying = !1,
    isShoppingTime = !1,
    gameStarted = !1;
getScript("//api.adinplay.com/player/v2/BRN/braains.io/player.min.js");
const PREOUTBREAK = 0,
    POSTOUTBREAK = 1,
    GAMEOVER = 2;
var Client = $i_2.extend({
    classId: "Client",
    init: function() {
        var t = this;
        t.score = 0, t.previousScore = 0, t.maxPlayers = 24, this.clientId = "", $("#disconnected-modal").modal({
            show: !1,
            backdrop: "static",
            keyboard: !1
        }), $("#invite-a-friend-modal").modal({
            show: !1,
            backdrop: "static",
            keyboard: !1
        }), $("#reconnect-button").on("click", function() {
            location.reload()
        }), $("#refresh-server-list-button").on("click", function() {
            t.refreshServerList()
        }), $("#max-players").on("change", function() {
            t.refreshServerList()
        }), $("#map-list").on("change", function() {
            t.refreshServerList()
        }), $("#login-modal").modal({
            show: !0,
            backdrop: "static",
            keyboard: !1
        }).on("hidden.bs.modal", function() {
            $("#footer").hide()
        }), $("#gameover-modal").modal({
            show: !1
        }), $("#shopping-modal").modal({
            show: !1,
            backdrop: "static",
            keyboard: !1
        }).on("hidden.bs.modal", function() {
            $("#footer").hide()
        }), ige.showStats(1), this.obj = [], this.scores = {}, this.clientCount = 0, this.fontTexture = new $i_57("../assets/fonts/verdana_12pt.png"), ige.addComponent(Ige$i_32Component), this.implement(ClientNetworkEvents), $("#player-name").keyup(function(t) {
            t.keyCode == 13 && ige.client.login()
        }), $("#play-button").on("click", function() {
            ige.client.login()
        }), ige.createFrontBuffer(!0), ige.on("texturesLoaded", function() {
            ige.start(function(e) {
                if (e) {
                    console.log("textures loaded"), t.mainScene = (new $i_73).id("baseScene").translateTo(20, 0, 0).drawBounds(!0), t.objectScene = (new $i_73).id("objectScene").mount(t.mainScene), t.vp1 = (new $i_72).id("vp1").autoSize(!0).scene(t.mainScene).drawBounds(!1).minimumVisibleArea(700, 700).mount(ige);
                    var i = t.getUrlVars().id;
                    i == void 0 || isNaN(parseFloat(i)) ? t.updateTotalPlayerCount() : (ige.client.serverId = i, t.login())
                }
            })
        })
    },
    updateTotalPlayerCount: function() {
        var t = this,
            e = 0;
        $.ajax({
            url: "http://registryget.azurewebsites.net/server_list_by_region",
            dataType: "jsonp",
            jsonpCallback: "callback",
            type: "GET",
            success: function(i) {
                for (var n in i) {
                    var s = i[n].playerCount;
                    e += s
                }
                $("#player-count").text(e + " players online"), t.refreshServerList()
            }
        })
    },
    refreshServerList: function() {
        $("#server-list").html("<option>loading... </option>"), $.ajax({
            url: "http://registryget.azurewebsites.net/server_list_by_region",
            data: {
                map: $("#map-list").find(":selected").val(),
                maxPlayers: $("#max-players").find(":selected").val()
            },
            dataType: "jsonp",
            jsonpCallback: "callback",
            type: "GET",
            success: function(t) {
                $("#server-list").html("");
                for (var e in t) {
                    var i = t[e].playerCount,
                        n = t[e].maxPlayers,
                        s = $("<option/>", {
                            val: e,
                            "class": "server",
                            text: e + " (" + i + " / " + n + " players) "
                        });
                    i > n && s.attr("disabled", "disabled"), $("#server-list").append(s)
                }
            }
        })
    },
    login: function() {
        var t = this;
        t.adsDue = !0, showAipPreroll(), setInterval(function() {
            t.adsDue = !0
        }, 3e5)
    },
    startGame: function() {
        var t = this;
        $(".game-ui").show();
        var e = $("#server-list").find(":selected").val(),
            i = $("#max-players").find(":selected").val(),
            n = $("#map-list").find(":selected").val(),
            s = ige.client.serverId;
        $("#play-button").text("Connecting...").attr("disabled", "disabled"), console.log("fetching available server"), $.ajax({
            url: "http://registryget.azurewebsites.net/available_server?region=" + e + "&map=" + n + "&maxPlayers=" + i + "&id=" + s,
            dataType: "jsonp",
            jsonpCallback: "callback",
            type: "GET",
            success: function(e) {
                t.connectToServer(e)
            }
        })
    },
    connectToLocalhost: function() {
        var t = {
            url: "ws://149.56.107.89:2000",
            map: "two_houses-0.10",
            id: -1
        };
        this.connectToServer(t)
    },
    connectToServer: function(t) {
        var e = this;
        return console.log("connecting to server", t), t == "" || t == void 0 || t.url == void 0 ? ($("#play-button").html("Play Br<u>aa</u>ins.io").removeAttr("disabled"), alert("Cannot connect to that server.\nPlease choose a different server"), void 0) : (e.map = t.map, console.log("map ", e.map), $("#server-id").html(t.id), $("#server-link").html("http://www.braains.io/app?id=" + t.id), $.when($.getScript("../assets/maps/" + e.map + "/map.js"), $.Deferred(function(t) {
            $(t.resolve)
        })).done(function() {
            ige.addComponent($i_18).tiled.loadJson(Map, function(t) {
                for (i = 0; t.length > i; i++) t[i].name !== "debris" && t[i].layer(i).autoSection(20).drawBounds(!1).drawBoundsData(!1).mount(e.mainScene)
            }), e.serverUrl = t.url != void 0 ? t.url : t, ige.network.start(e.serverUrl, function() {
                $("#login-modal").modal("hide"), $(".footer").hide(), $("#credits").hide();
                var t = $("#player-name").val();
                t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), ige.network.define("updatePlayerName", e._onUpdatePlayerName), ige.network.send("updatePlayerName", t), ige.network.define("noDuplicateIps", e._onNoDuplicateIps), ige.network.define("maxPlayers", e._onMaxPlayers), ige.network.define("afkKick", e._onAfkKick), ige.network.define("killStreakMessage", e._onKillStreakMessage), ige.network.define("playerEntity", e._onPlayerEntity), ige.network.define("playerScores", e._onPlayerScores), ige.network.define("updatePlayerUnitTexture", e._onUpdatePlayerUnitTexture), ige.network.define("gameOver", e._onGameOver), ige.network.define("reset", e._onReset), ige.network.define("updatePlayers", e._onUpdatePlayers), ige.network.define("buyItem", e._onBuyItem), ige.network.addComponent($i_27).stream.renderLatency(100).stream.on("entityCreated", function() {}), ige.network.send("playerEntity"), ige.addComponent($i_38), ige.network.send("igeChatJoinRoom", "1"), ige.chat.on("messageFromServer", function(t) {
                    e.receiveChatMessage(t)
                }), $("#send-message").on("click", function() {
                    e.sendChatMessage()
                }), $("#hide-chat").on("click", function() {
                    $("#show-chat").show(), $("#chat-box").hide()
                }), $("#show-chat").on("click", function() {
                    $("#show-chat").hide(), $("#chat-box").show()
                }), $("#message").keyup(function(t) {
                    t.keyCode == 13 && e.sendChatMessage()
                }), $("#buy-item-pill").on("click", function() {
                    ige.network.send("buyItem", "pill")
                }), $("#buy-item-stick").on("click", function() {
                    ige.network.send("buyItem", "stick")
                }), $("#buy-item-baseball-bat").on("click", function() {
                    ige.network.send("buyItem", "baseballBat")
                }), $("#buy-item-potato-gun").on("click", function() {
                    ige.network.send("buyItem", "potatoGun")
                }), $("#buy-item-nunchucks").on("click", function() {
                    ige.network.send("buyItem", "nunchucks")
                }), $("#buy-item-uzi").on("click", function() {
                    ige.network.send("buyItem", "uzi")
                }), $("#buy-skin-taro").on("click", function() {
                    ige.network.send("buyItem", "taro")
                }), $("#buy-skin-hobo").on("click", function() {
                    ige.network.send("buyItem", "hobo")
                }), $("#buy-skin-clown").on("click", function() {
                    ige.network.send("buyItem", "clown")
                }), $("#buy-skin-ghost").on("click", function() {
                    ige.network.send("buyItem", "ghost")
                }), $("#buy-skin-mummy").on("click", function() {
                    ige.network.send("buyItem", "mummy")
                }), $("#buy-skin-dracula").on("click", function() {
                    ige.network.send("buyItem", "dracula")
                }), $("#buy-skin-harambe").on("click", function() {
                    ige.network.send("buyItem", "harambe")
                })
            })
        }), void 0)
    },
    showKillStreakMessage: function(t, e) {
        var i = "",
            n = 30;
        switch ($("#kill-streak-message").show(), e) {
            case 2:
                i = t + "'s got a DOUBLE KILL", n = 30;
                break;
            case 3:
                i = t + "'s got a TRIPLE KILL", n = 35;
                break;
            case 4:
                i = t + " is a PLAGUE", n = 40;
                break;
            case 5:
            default:
                i = t + " is the RAPTURE!!!", n = 60
        }
        $("#kill-streak-message").css({
            fontSize: n
        }).text(i).delay(5e3).fadeOut("slow")
    },
    sendChatMessage: function() {
        var t = $("#message").val();
        t.length > 80 && (t = t.substr(0, 80)), ige.network.send("igeChatMsg", {
            text: t,
            roomId: "1"
        }), $("#message").val("")
    },
    receiveChatMessage: function(t) {
        playerName = "player", ige.client.players[t.from].name !== "undefined" && (playerName = ige.client.players[t.from].name), msgDiv = $("<div/>", {
            text: playerName + ": " + t.text
        }).delay(3e4).fadeOut("slow"), messageCount = $("#chat-history div").length, messageCount > 20 && $("#chat-history div:first-child").remove(), $("#chat-history").append(msgDiv)
    },
    toHHMMSS: function(t) {
        var e = Math.floor(t / 3600),
            i = Math.floor((t - e * 3600) / 60),
            t = t - e * 3600 - i * 60;
        return 10 > e && (e = "0" + e), 10 > i && (i = "0" + i), 10 > t && (t = "0" + t), e + ":" + i + ":" + t
    },
    getUrlVars: function() {
        var t = {};
        return window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(e, i, n) {
            t[i] = n
        }), t
    }
});
typeof module != "undefined" && module.exports !== void 0 && (module.exports = Client);
var Game = $i_2.extend({
    classId: "Game",
    init: function(t, e) {
        ige = new $i_114, ige.isClient && (ige.client = new t), ige.isServer && (ige.server = new t(e))
    }
});
if (typeof module != "undefined" && module.exports !== void 0) module.exports = Game;
else var game = new Game(Client)