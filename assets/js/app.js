// --------------------------------------
// 
//    _  _ _/ .  _  _/ /_ _  _  _        
//   /_|/_ / /|//_  / / //_ /_// /_/     
//   https://stfkolev.com    _/      
// 
// --------------------------------------
//   8/12/19 10:57a
// --------------------------------------

"undefined" == typeof console && (window.console = {}, console.log = console.error = console.info = console.debug = console.warn = console.trace = function () {}), window.performance = window.performance && window.performance.now ? window.performance : Date, Date.now = Date.now || function () {
        return +new Date
    }, window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function () {
        const start = Date.now();
        return function (callback) {
            window.setTimeout(() => callback(Date.now() - start), 1e3 / 60)
        }
    }()), window.defer = window.requestAnimationFrame, window.clearTimeout = function () {
        const _clearTimeout = clearTimeout;
        return function (ref) {
            return window.Timer ? Timer.__clearTimeout(ref) || _clearTimeout(ref) : _clearTimeout(ref)
        }
    }(), window.requestIdleCallback = function () {
        const _requestIdleCallback = window.requestIdleCallback;
        return function (callback, max) {
            return _requestIdleCallback ? _requestIdleCallback(callback, max ? {
                timeout: max
            } : null) : defer(() => {
                callback({
                    didTimeout: !1
                })
            }, 0)
        }
    }(), window.onIdle = window.requestIdleCallback, "undefined" == typeof Float32Array && (Float32Array = Array), Math.sign = function (x) {
        return 0 == (x = +x) || isNaN(x) ? Number(x) : x > 0 ? 1 : -1
    }, Math._round = Math.round, Math.round = function (value, precision = 0) {
        let p = Math.pow(10, precision);
        return Math._round(value * p) / p
    }, Math._random = Math.random, Math.rand = Math.random = function (min, max, precision = 0) {
        return void 0 === min ? Math._random() : min === max ? min : (min = min || 0, max = max || 1, Math.round(min + Math._random() * (max - min), precision))
    }, Math.degrees = function (radians) {
        return radians * (180 / Math.PI)
    }, Math.radians = function (degrees) {
        return degrees * (Math.PI / 180)
    }, Math.clamp = function (value, min = 0, max = 1) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
    }, Math.map = Math.range = function (value, oldMin = -1, oldMax = 1, newMin = 0, newMax = 1, isClamp) {
        const newValue = (value - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
        return isClamp ? Math.clamp(newValue, Math.min(newMin, newMax), Math.max(newMin, newMax)) : newValue
    }, Math.mix = function (a, b, alpha) {
        return a * (1 - alpha) + b * alpha
    }, Math.step = function (edge, value) {
        return value < edge ? 0 : 1
    }, Math.smoothStep = function (min, max, value) {
        const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x)
    }, Math.fract = function (value) {
        return value - Math.floor(value)
    }, Math.mod = function (value, n) {
        return (value % n + n) % n
    }, Array.prototype.shuffle = function () {
        let temp, r, i = this.length - 1;
        for (; 0 !== i;) r = Math.random(0, i, 0), temp = this[i -= 1], this[i] = this[r], this[r] = temp;
        return this
    }, Array.storeRandom = function (arr) {
        arr.randomStore = []
    }, Array.prototype.random = function (range) {
        let value = Math.random(0, this.length - 1);
        if (arguments.length && !this.randomStore && Array.storeRandom(this), !this.randomStore) return this[value];
        if (range > this.length - 1 && (range = this.length), range > 1) {
            for (; ~this.randomStore.indexOf(value);)(value += 1) > this.length - 1 && (value = 0);
            this.randomStore.push(value), this.randomStore.length >= range && this.randomStore.shift()
        }
        return this[value]
    }, Array.prototype.remove = function (element) {
        if (!this.indexOf) return;
        const index = this.indexOf(element);
        return ~index ? this.splice(index, 1) : void 0
    }, Array.prototype.last = function () {
        return this[this.length - 1]
    }, window.Promise = window.Promise || {}, Promise.create = function () {
        const promise = new Promise((resolve, reject) => {
            this.temp_resolve = resolve, this.temp_reject = reject
        });
        return promise.resolve = this.temp_resolve, promise.reject = this.temp_reject, delete this.temp_resolve, delete this.temp_reject, promise
    }, String.prototype.includes = function (str) {
        if (!Array.isArray(str)) return !!~this.indexOf(str);
        for (let i = str.length - 1; i >= 0; i--)
            if (~this.indexOf(str[i])) return !0;
        return !1
    }, String.prototype.strpos = function (str) {
        return console.warn("strpos deprecated: use .includes()"), this.includes(str)
    }, String.prototype.clip = function (num, end) {
        return this.length > num ? this.slice(0, num) + end : this
    }, String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }, String.prototype.replaceAll = function (find, replace) {
        return this.split(find).join(replace)
    }, (!window.fetch || window.nativeHydra && !window._AURA_) && (window.fetch = function (url, options) {
        function response() {
            let header, keys = [],
                all = [],
                headers = {};
            return request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, (m, key, value) => {
                keys.push(key = key.toLowerCase()), all.push([key, value]), header = headers[key], headers[key] = header ? `${header},${value}` : value
            }), {
                ok: 1 == (request.status / 200 | 0),
                status: request.status,
                statusText: request.statusText,
                url: request.responseURL,
                clone: response,
                text: () => Promise.resolve(request.responseText),
                json: () => Promise.resolve(request.responseText).then(JSON.parse),
                xml: () => Promise.resolve(request.responseXML),
                blob: () => Promise.resolve(new Blob([request.response])),
                headers: {
                    keys: () => keys,
                    entries: () => all,
                    get: n => headers[n.toLowerCase()],
                    has: n => n.toLowerCase() in headers
                }
            }
        }
        options = options || {};
        const promise = Promise.create(),
            request = new XMLHttpRequest;
        request.open(options.method || "get", url);
        for (let i in options.headers) request.setRequestHeader(i, options.headers[i]);
        return request.onload = (() => {
            promise.resolve(response())
        }), request.onerror = promise.reject, request.send(options.body), promise
    }), window.get = function (url, options = {
        credentials: "same-origin"
    }) {
        let promise = Promise.create();
        return options.method = "GET", fetch(url, options).then(function handleResponse(e) {
            if (!e.ok) return promise.reject(e);
            e.text().then(text => {
                if (text.charAt(0).includes(["[", "{"])) try {
                    promise.resolve(JSON.parse(text))
                } catch (err) {
                    promise.resolve(text)
                } else promise.resolve(text)
            })
        }).catch(promise.reject), promise
    }, window.post = function (url, body, options = {}) {
        let promise = Promise.create();
        return options.method = "POST", options.body = JSON.stringify(body), fetch(url, options).then(function handleResponse(e) {
            if (!e.ok) return promise.reject(e);
            e.text().then(text => {
                if (text.charAt(0).includes(["[", "{"])) try {
                    promise.resolve(JSON.parse(text))
                } catch (err) {
                    promise.resolve(text)
                } else promise.resolve(text)
            })
        }).catch(promise.reject), promise
    }, window.Class = function (_class, _type, _static) {
        const _this = this || window,
            _name = _class.name || _class.toString().match(/function ?([^\(]+)/)[1];
        "function" == typeof _type && (_static = _type, _type = null), (_type = (_type || "").toLowerCase()) ? "static" == _type ? _this[_name] = new _class : "singleton" == _type && (_this[_name] = _class, function () {
            let _instance;
            _this[_name].instance = function (a, b, c) {
                return _instance || (_instance = new _class(a, b, c)), _instance
            }
        }(), _static && _static()) : (_this[_name] = _class, _static && _static()), this && this !== window && (this[_name]._namespace = this.__namespace)
    }, window.Inherit = function (child, parent) {
        const args = [].slice.call(arguments, 2);
        parent.apply(child, args);
        const save = {};
        for (let method in child) save[method] = child[method];
        defer(() => {
            for (let method in child) save[method] && child[method] !== save[method] && (child["_" + method] = save[method])
        })
    }, window.Namespace = function (obj) {
        "string" == typeof obj ? window[obj] = {
            Class: Class,
            __namespace: obj
        } : (obj.Class = Class, obj.__namespace = obj.constructor.name || obj.constructor.toString().match(/function ([^\(]+)/)[1])
    }, window.Global = {}, window.THREAD = !1, Class(function Hydra() {
        function initLoad() {
            return document && window ? window._NODE_ ? setTimeout(loaded, 1) : window._AURA_ ? window.Main ? setTimeout(loaded, 1) : setTimeout(initLoad, 1) : void window.addEventListener("load", loaded, !1) : setTimeout(initLoad, 1)
        }

        function loaded() {
            if (window.removeEventListener("load", loaded, !1), _readyPromise.resolve(), window.Main) {
                if (window._AURA_) return void setTimeout(() => Hydra.Main = new window.Main, 50);
                _readyPromise.then(() => Hydra.Main = new window.Main)
            }
        }
        const _readyPromise = Promise.create();
        this.HASH = window.location.hash.slice(1), this.LOCAL = !window._BUILT_ && (location.hostname.indexOf("local") > -1 || "10" == location.hostname.split(".")[0] || "192" == location.hostname.split(".")[0]), initLoad(), this.__triggerReady = function () {
            loaded()
        }, this.ready = function (callback) {
            if (!callback) return _readyPromise;
            _readyPromise.then(callback)
        }
    }, "Static"), Class(function Utils() {
        this.query = function (key) {
            const str = decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            return str.length && "0" != str && "false" != str ? str : location.search.includes(key)
        }, this.getConstructorName = function (obj) {
            return obj ? obj.constructor.name || obj.constructor.toString().match(/function ([^\(]+)/)[1] : obj
        }, this.nullObject = function (object) {
            if (object.destroy || object.div)
                for (var key in object) void 0 !== object[key] && (object[key] = null);
            return null
        }, this.cloneObject = function (obj) {
            return JSON.parse(JSON.stringify(obj))
        }, this.headsTails = function (n0, n1) {
            return Math.random(0, 1) ? n1 : n0
        }, this.mergeObject = function () {
            for (var obj = {}, i = 0; i < arguments.length; i++) {
                var o = arguments[i];
                for (var key in o) obj[key] = o[key]
            }
            return obj
        }, this.timestamp = function () {
            return (Date.now() + Math.random(0, 99999, 0)).toString()
        }, this.randomColor = function () {
            var color = "#" + Math.floor(16777215 * Math.random()).toString(16);
            return color.length < 7 && (color = this.randomColor()), color
        }, this.numberWithCommas = function (num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }, this.padInt = function (num, digits, isLimit) {
            isLimit && (num = Math.min(num, Math.pow(10, digits) - 1));
            let str = Math.floor(num).toString();
            return Math.pow(10, Math.max(0, digits - str.length)).toString().slice(1) + str
        }
    }, "Static"), Class(function Render() {
        function render(tsl) {
            let delta = tsl - _last;
            delta = Math.min(_skipLimit, delta), _last = tsl, _this.TIME = tsl, _this.DELTA = delta;
            for (let i = _render.length - 1; i >= 0; i--) {
                var callback = _render[i];
                if (callback)
                    if (callback.fps) {
                        if (tsl - callback.last < 1e3 / callback.fps) continue;
                        callback(++callback.frame), callback.last = tsl
                    } else callback(tsl, delta);
                else _render.remove(callback)
            }
            THREAD || _this.isPaused || rAF(render)
        }
        const _this = this,
            _render = [];
        let _last = performance.now(),
            _skipLimit = 200;
        var rAF = requestAnimationFrame;
        THREAD || rAF(render), this.start = function (callback, fps) {
            fps && (callback.fps = fps, callback.last = -1 / 0, callback.frame = -1), ~_render.indexOf(callback) || _render.unshift(callback)
        }, this.stop = function (callback) {
            _render.remove(callback)
        }, this.tick = function () {
            THREAD && (this.TIME = performance.now(), render(this.TIME))
        }, this.Worker = function (_callback, _budget = 4) {
            function loop() {
                for (; _elapsed < _budget;) {
                    if (_scope.dead) return;
                    const start = performance.now();
                    _callback && _callback(), _elapsed += performance.now() - start
                }
                _elapsed = 0
            }
            Inherit(this, Component);
            let _scope = this,
                _elapsed = 0;
            this.startRender(loop), this.stop = function () {
                this.dead = !0, this.stopRender(loop)
            }, this.pause = function () {
                this.stopRender(loop)
            }, this.resume = function () {
                this.startRender(loop)
            }
        }, this.pause = function () {
            _this.isPaused = !0
        }, this.resume = function () {
            _this.isPaused && (_this.isPaused = !1, rAF(render))
        }, this.useRAF = function (raf) {
            rAF = raf
        }
    }, "Static"), Class(function Timer() {
        function loop(t, delta) {
            for (let i = _discard.length - 1; i >= 0; i--) {
                let obj = _discard[i];
                obj.callback = null, _callbacks.remove(obj)
            }
            _discard.length && (_discard.length = 0);
            for (let i = _callbacks.length - 1; i >= 0; i--) {
                let obj = _callbacks[i];
                obj ? (obj.current += delta) >= obj.time && (obj.callback && obj.callback.apply(this, obj.args), _discard.push(obj)) : _callbacks.remove(obj)
            }
        }

        function find(ref) {
            for (let i = _callbacks.length - 1; i > -1; i--)
                if (_callbacks[i].ref == ref) return _callbacks[i]
        }
        const _this = this,
            _callbacks = [],
            _discard = [];
        Render.start(loop), this.__clearTimeout = function (ref) {
            const obj = find(ref);
            return !!obj && (obj.callback = null, _callbacks.remove(obj), !0)
        }, this.create = function (callback, time) {
            if (window._NODE_) return setTimeout(callback, time);
            const obj = {
                time: Math.max(1, time || 1),
                current: 0,
                ref: Utils.timestamp(),
                callback: callback,
                args: [].slice.call(arguments, 2)
            };
            return _callbacks.unshift(obj), obj.ref
        }, window.defer = this.defer = function (callback) {
            if (!callback) {
                let promise = Promise.create();
                return _this.create(promise.resolve, 1), promise
            }
            _this.create(callback, 1)
        }
    }, "static"), Class(function Events() {
        this.events = {};
        const _e = {},
            _linked = [];
        let _emitter;
        this.events.sub = function (obj, evt, callback) {
            if ("object" != typeof obj && (callback = evt, evt = obj, obj = null), !obj) return Events.emitter._addEvent(evt, callback.resolve ? callback.resolve : callback, this), callback;
            let emitter = obj.events.emitter();
            return emitter._addEvent(evt, callback.resolve ? callback.resolve : callback, this), emitter._saveLink(this), _linked.push(emitter), callback
        }, this.events.unsub = function (obj, evt, callback) {
            if ("object" != typeof obj && (callback = evt, evt = obj, obj = null), !obj) return Events.emitter._removeEvent(evt, callback.resolve ? callback.resolve : callback);
            obj.events.emitter()._removeEvent(evt, callback.resolve ? callback.resolve : callback)
        }, this.events.fire = function (evt, obj, isLocalOnly) {
            (obj = obj || _e).target = this, Events.emitter._check(evt), _emitter && _emitter._fireEvent(evt, obj) || isLocalOnly || Events.emitter._fireEvent(evt, obj)
        }, this.events.bubble = function (obj, evt) {
            let _this = this;
            _this.sub(obj, evt, e => _this.fire(evt, e))
        }, this.events.destroy = function () {
            return Events.emitter._destroyEvents(this), _linked && _linked.forEach(emitter => emitter._destroyEvents(this)), _emitter && _emitter.links && _emitter.links.forEach(obj => obj.events && obj.events._unlink(_emitter)), null
        }, this.events.emitter = function () {
            return _emitter || (_emitter = Events.emitter.createLocalEmitter()), _emitter
        }, this.events._unlink = function (emitter) {
            _linked.remove(emitter)
        }
    }, () => {
        function Emitter() {
            const prototype = Emitter.prototype;
            this.events = [], void 0 === prototype._check && (prototype._check = function (evt) {
                if (void 0 === evt) throw "Undefined event"
            }, prototype._addEvent = function (evt, callback, object) {
                this._check(evt), this.events.push({
                    evt: evt,
                    object: object,
                    callback: callback
                })
            }, prototype._removeEvent = function (eventString, callback) {
                this._check(eventString);
                let _this = this,
                    marked = !1;
                for (let i = this.events.length - 1; i >= 0; i--) this.events[i].evt == eventString && this.events[i].callback == callback && (this.events[i].markedForDeletion = !0, marked = !0);
                marked && defer(() => _this._sweepEvents())
            }, prototype._sweepEvents = function () {
                for (let i = 0; i < this.events.length; i++) this.events[i].markedForDeletion && this.events.remove(this.events[i])
            }, prototype._fireEvent = function (eventString, obj) {
                this._check && this._check(eventString), obj = obj || _e;
                let called = !1;
                for (let i = 0; i < this.events.length; i++) {
                    let evt = this.events[i];
                    evt.evt != eventString || evt.markedForDeletion || (evt.callback(obj), called = !0)
                }
                return called
            }, prototype._destroyEvents = function (object) {
                for (var i = this.events.length - 1; i >= 0; i--) this.events[i].object == object && (this.events.splice(i, 1)[0] = null)
            }, prototype._saveLink = function (obj) {
                this.links || (this.links = []), ~this.links.indexOf(obj) || this.links.push(obj)
            }, prototype.createLocalEmitter = function () {
                return new Emitter
            })
        }
        Events.emitter = new Emitter, Events.VISIBILITY = "hydra_visibility", Events.HASH_UPDATE = "hydra_hash_update", Events.COMPLETE = "hydra_complete", Events.PROGRESS = "hydra_progress", Events.UPDATE = "hydra_update", Events.LOADED = "hydra_loaded", Events.END = "hydra_end", Events.FAIL = "hydra_fail", Events.SELECT = "hydra_select", Events.ERROR = "hydra_error", Events.READY = "hydra_ready", Events.RESIZE = "hydra_resize", Events.CLICK = "hydra_click", Events.HOVER = "hydra_hover", Events.MESSAGE = "hydra_message", Events.ORIENTATION = "orientation", Events.BACKGROUND = "background", Events.BACK = "hydra_back", Events.PREVIOUS = "hydra_previous", Events.NEXT = "hydra_next", Events.RELOAD = "hydra_reload", Events.FULLSCREEN = "hydra_fullscreen";
        const _e = {};
        Hydra.ready(() => {
            function updateStage() {
                Stage.width = document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth, Stage.height = document.body.clientHeight || document.documentElement.offsetHeight || window.innerHeight
            }! function () {
                function onfocus() {
                    "focus" != _last && Events.emitter._fireEvent(Events.VISIBILITY, {
                        type: "focus"
                    }), _last = "focus"
                }

                function onblur() {
                    "blur" != _last && Events.emitter._fireEvent(Events.VISIBILITY, {
                        type: "blur"
                    }), _last = "blur"
                }
                let _last, _lastTime = performance.now();
                Timer.create(function addVisibilityHandler() {
                    let hidden, eventName;
                    if ([
                            ["msHidden", "msvisibilitychange"],
                            ["webkitHidden", "webkitvisibilitychange"],
                            ["hidden", "visibilitychange"]
                        ].forEach(d => {
                            void 0 !== document[d[0]] && (hidden = d[0], eventName = d[1])
                        }), !eventName) {
                        const root = "ie" == Device.browser ? document : window;
                        return root.onfocus = onfocus, void(root.onblur = onblur)
                    }
                    document.addEventListener(eventName, () => {
                        const time = performance.now();
                        time - _lastTime > 10 && (!1 === document[hidden] ? onfocus() : onblur()), _lastTime = time
                    })
                }, 250)
            }(), window.Stage = window.Stage || {}, updateStage(), window.onresize = function () {
                updateStage(), Events.emitter._fireEvent(Events.RESIZE)
            }, window.onorientationchange = window.onresize, defer(window.onresize)
        })
    }), Class(function Dispatch() {
        const _instances = {};
        this.registerInstance = function (object) {
            let ref = Utils.getConstructorName(object);
            _instances[ref] = object, object.removeDispatch = function () {
                delete _instances[ref]
            }
        }, this.lookup = function (_class) {
            let name = _class.toString().match(/function ([^\(]+)/)[1];
            return _instances[name] || console.error(`No instance ${name} found`)
        }
    }, "static"), Class(function Device() {
        var _this = this;
        this.agent = navigator.userAgent.toLowerCase(), this.detect = function (match) {
            return this.agent.includes(match)
        }, this.touchCapable = !!("ontouchstart" in window), this.pixelRatio = window.devicePixelRatio, this.system = {}, this.system.retina = window.devicePixelRatio > 1, this.system.webworker = void 0 !== window.Worker, this.system.offline = void 0 !== window.applicationCache, window._NODE_ || (this.system.geolocation = void 0 !== navigator.geolocation), window._NODE_ || (this.system.pushstate = void 0 !== window.history.pushState), this.system.webcam = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia), this.system.language = window.navigator.userLanguage || window.navigator.language, this.system.webaudio = void 0 !== window.AudioContext, this.system.vr = function () {
            if (!navigator.getVRDisplays) return !1;
            navigator.getVRDisplays().then(displays => {
                _this.system.vr = displays.length > 0
            })
        }();
        try {
            this.system.localStorage = void 0 !== window.localStorage
        } catch (e) {
            this.system.localStorage = !1
        }
        this.system.fullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled, this.system.os = _this.detect(["ipad", "iphone"]) ? "ios" : _this.detect(["android", "kindle"]) ? "android" : _this.detect(["blackberry"]) ? "blackberry" : _this.detect(["mac os"]) ? "mac" : _this.detect(["windows", "iemobile"]) ? "windows" : _this.detect(["linux"]) ? "linux" : "unknown", this.system.version = function () {
            try {
                if ("ios" == _this.system.os) {
                    var num = _this.agent.split("os ")[1].split("_"),
                        main = num[0],
                        sub = num[1].split(" ")[0];
                    return Number(main + "." + sub)
                }
                if ("android" == _this.system.os) {
                    var version = _this.agent.split("android ")[1].split(";")[0];
                    return version.length > 3 && (version = version.slice(0, -2)), "." == version.charAt(version.length - 1) && (version = version.slice(0, -1)), Number(version)
                }
                if ("blackberry" == _this.system.os) return _this.agent.includes("rv:11") ? 11 : Number(_this.agent.split("windows phone ")[1].split(";")[0])
            } catch (e) {}
            return -1
        }(), this.system.browser = "ios" == _this.system.os ? _this.detect(["twitter", "fbios"]) ? "social" : _this.detect(["crios"]) ? "chrome" : _this.detect(["safari"]) ? "safari" : "unknown" : "android" == _this.system.os ? _this.detect(["twitter", "fb", "facebook"]) ? "social" : _this.detect(["chrome"]) ? "chrome" : _this.detect(["firefox"]) ? "firefox" : "browser" : _this.detect(["msie"]) ? "ie" : _this.detect(["trident"]) && _this.detect(["rv:"]) ? "ie" : _this.detect(["windows"]) && _this.detect(["edge"]) ? "ie" : _this.detect(["chrome"]) ? "chrome" : _this.detect(["safari"]) ? "safari" : _this.detect(["firefox"]) ? "firefox" : "unknown", this.system.browserVersion = function () {
            try {
                if ("chrome" == _this.system.browser) return Number(_this.agent.split("chrome/")[1].split(".")[0]);
                if ("firefox" == _this.system.browser) return Number(_this.agent.split("firefox/")[1].split(".")[0]);
                if ("safari" == _this.system.browser) return Number(_this.agent.split("version/")[1].split(".")[0].split(".")[0]);
                if ("ie" == _this.system.browser) return _this.detect(["msie"]) ? Number(_this.agent.split("msie ")[1].split(".")[0]) : _this.detect(["rv:"]) ? Number(_this.agent.split("rv:")[1].split(".")[0]) : Number(_this.agent.split("edge/")[1].split(".")[0])
            } catch (e) {
                return -1
            }
        }(), this.mobile = !(window._NODE_ || !("ontouchstart" in window || "onpointerdown" in window) || !this.detect(["ios", "iphone", "ipad", "windows phone", "android", "blackberry"])) && {}, this.mobile && this.detect(["windows"]) && !this.detect(["touch"]) && (this.mobile = !1), this.mobile && (this.mobile.tablet = Math.max(window.screen ? screen.width : window.innerWidth, window.screen ? screen.height : window.innerHeight) > 1e3, this.mobile.phone = !this.mobile.tablet, this.mobile.pwa = !(!window.matchMedia || !window.matchMedia("(display-mode: standalone)").matches) || !!window.navigator.standalone, Hydra.ready(() => {
            _this.mobile.native = !(!Mobile.NativeCore || !Mobile.NativeCore.active) || !!window._AURA_
        })), this.media = {}, this.media.audio = !!document.createElement("audio").canPlayType && (_this.detect(["firefox", "opera"]) ? "ogg" : "mp3"), this.media.video = function () {
            var vid = document.createElement("video");
            return !!vid.canPlayType && (vid.canPlayType("video/webm;") ? "webm" : "mp4")
        }(), this.media.webrtc = !!(window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection || window.oRTCPeerConnection || window.RTCPeerConnection), this.graphics = {}, this.graphics.webgl = function () {
            let DISABLED = !1;
            Object.defineProperty(_this.graphics, "webgl", {
                get: () => {
                    if (DISABLED) return !1;
                    if (window._AURA_) return _this.graphics._webglContext = {
                        detect: _ => !1
                    }, _this.graphics._webglContext;
                    if (_this.graphics._webglContext) return _this.graphics._webglContext;
                    try {
                        const names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
                            canvas = document.createElement("canvas");
                        let gl;
                        for (let i = 0; i < names.length && !(gl = canvas.getContext(names[i])); i++);
                        let info = gl.getExtension("WEBGL_debug_renderer_info"),
                            output = {};
                        if (info) {
                            let gpu = info.UNMASKED_RENDERER_WEBGL;
                            output.gpu = gl.getParameter(gpu).toLowerCase()
                        }
                        return output.renderer = gl.getParameter(gl.RENDERER).toLowerCase(), output.version = gl.getParameter(gl.VERSION).toLowerCase(), output.glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION).toLowerCase(), output.extensions = gl.getSupportedExtensions(), output.detect = function (matches) {
                            if (output.gpu && output.gpu.toLowerCase().includes(matches)) return !0;
                            if (output.version && output.version.toLowerCase().includes(matches)) return !0;
                            for (let i = 0; i < output.extensions.length; i++)
                                if (output.extensions[i].toLowerCase().includes(matches)) return !0;
                            return !1
                        }, _this.graphics._webglContext = output, output
                    } catch (e) {
                        return !1
                    }
                },
                set: v => {
                    !1 === v && (DISABLED = !0)
                }
            })
        }(), this.graphics.canvas = !!document.createElement("canvas").getContext;
        const checkForStyle = function () {
            let _tagDiv;
            return function (prop) {
                const vendors = ["Khtml", "ms", "O", "Moz", "Webkit"];
                if (prop in (_tagDiv = _tagDiv || document.createElement("div")).style) return !0;
                prop = prop.replace(/^[a-z]/, val => val.toUpperCase());
                for (let i = vendors.length - 1; i >= 0; i--)
                    if (vendors[i] + prop in _tagDiv.style) return !0;
                return !1
            }
        }();
        this.styles = {}, this.styles.filter = checkForStyle("filter"), this.styles.blendMode = checkForStyle("mix-blend-mode"), this.tween = {}, this.tween.transition = checkForStyle("transition"), this.tween.css2d = checkForStyle("transform"), this.tween.css3d = checkForStyle("perspective")
    }, "Static"), Class(function Component() {
        function defineSetter(_this, prop) {
            _setters[prop] = {}, Object.defineProperty(_this, prop, {
                set: function (v) {
                    _setters[prop] && _setters[prop].s && _setters[prop].s.call(_this, v), v = null
                },
                get: function () {
                    if (_setters[prop] && _setters[prop].g) return _setters[prop].g.apply(_this)
                }
            })
        }

        function internalLoop(a, b, c, d) {
            if (!1 !== _this.visible && (!_this.group || !1 !== _this.group.visible))
                for (let i = 0; i < _loops.length; i++) _loops[i](a, b, c, d)
        }
        Inherit(this, Events);
        const _this = this,
            _setters = {},
            _flags = {},
            _timers = [],
            _loops = [];
        this.classes = {}, this.set = function (prop, callback) {
            _setters[prop] || defineSetter(this, prop), _setters[prop].s = callback
        }, this.get = function (prop, callback) {
            _setters[prop] || defineSetter(this, prop), _setters[prop].g = callback
        }, this.initClass = function (clss) {
            if (!clss) throw "unable to locate class";
            const args = [].slice.call(arguments, 1),
                child = Object.create(clss.prototype);
            if (child.parent = this, clss.apply(child, args), child.destroy) {
                const id = Utils.timestamp();
                this.classes[id] = child, this.classes[id].__id = id
            }
            if (child.element) {
                const last = arguments[arguments.length - 1];
                Array.isArray(last) && 1 == last.length && last[0] instanceof HydraObject ? last[0].add(child.element) : this.element && null !== last && this.element.add(child.element)
            }
            if (child.group) {
                const last = arguments[arguments.length - 1];
                this.group && null !== last && this.group.add(child.group)
            }
            return child
        }, this.delayedCall = function (callback, time) {
            const args = [].slice.call(arguments, 2),
                timer = Timer.create(() => {
                    _this && _this.destroy && callback && callback.apply(this, args)
                }, time);
            return _timers.push(timer), _timers.length > 50 && _timers.shift(), timer
        }, this.clearTimers = function () {
            for (let i = _timers.length - 1; i >= 0; i--) clearTimeout(_timers[i]);
            _timers.length = 0
        }, this.startRender = function (callback) {
            -1 == _loops.indexOf(callback) && _loops.push(callback), Render.start(internalLoop)
        }, this.stopRender = function (callback) {
            _loops.remove(callback), _loops.length || Render.stop(internalLoop)
        }, this.clearRenders = function () {
            _loops.length = 0, Render.stop(internalLoop)
        }, this.wait = function (object, key, callback) {
            function test() {
                if (!object) return _this.stopRender(test);
                object[key] && (callback(), _this.stopRender(test))
            }
            const promise = Promise.create();
            if ("number" == typeof object && !key) return _this.delayedCall(promise.resolve, object), promise;
            if ("function" == typeof object && "function" != typeof callback) {
                let _object = object;
                object = key, key = callback, callback = _object
            }
            return callback = callback || promise.resolve, _this.startRender(test), promise
        }, this.flag = function (name, value, time) {
            if (void 0 === value) return _flags[name];
            _flags[name] = value, time && this.delayedCall(() => {
                _flags[name] = !_flags[name]
            }, time)
        }, this.destroy = function () {
            this.removeDispatch && this.removeDispatch(), this.onDestroy && this.onDestroy();
            for (let id in this.classes) {
                var clss = this.classes[id];
                clss && clss.destroy && clss.destroy()
            }
            return this.classes = null, this.clearRenders && this.clearRenders(), this.clearTimers && this.clearTimers(), this.events && (this.events = this.events.destroy()), this.parent && this.parent.__destroyChild && this.parent.__destroyChild(this.__id), Utils.nullObject(this)
        }, this.__destroyChild = function (name) {
            delete this.classes[name]
        }
    }), Class(function Model() {
        Inherit(this, Component), Namespace(this);
        const _this = this,
            _storage = {};
        let _data = 0,
            _triggered = 0;
        this.push = function (name, val) {
            _storage[name] = val
        }, this.pull = function (name) {
            return _storage[name]
        }, this.waitForData = this.promiseData = function (num = 1) {
            _data += num
        }, this.fulfillData = this.resolveData = function () {
            ++_triggered == _data && (_this.dataReady = !0)
        }, this.ready = function (callback) {
            let promise = Promise.create();
            return callback && promise.then(callback), _this.wait(_this, "dataReady").then(promise.resolve), promise
        }, this.initWithData = function (data) {
            _this.STATIC_DATA = data;
            for (var key in _this) {
                var model = _this[key],
                    init = !1;
                for (var i in data) i.toLowerCase().replace(/-/g, "") == key.toLowerCase() && (init = !0, model.init && model.init(data[i]));
                !init && model.init && model.init()
            }
            _this.init && _this.init(data)
        }, this.loadData = function (url, callback) {
            let promise = Promise.create();
            callback || (callback = promise.resolve);
            var _this = this;
            return get(url + "?" + Utils.timestamp()).then(d => {
                defer(() => {
                    _this.initWithData(d), callback(d)
                })
            }), promise
        }
    }), Class(function Modules() {
        function exec() {
            for (let m in _modules)
                for (let key in _modules[m]) {
                    let module = _modules[m][key];
                    module._ready || (module._ready = !0, module.exec && module.exec())
                }
        }

        function requireModule(root, path) {
            let module = _modules[root];
            if (!module) throw `Module ${root} not found`;
            return (module = module[path])._ready || (module._ready = !0, module.exec && module.exec()), module
        }
        const _modules = {};
        defer(exec), this.Module = function (module) {
            let m = new module,
                name = module.toString().slice(0, 100).match(/function ([^\(]+)/);
            name ? (m._ready = !0, name = name[1], _modules[name] = {
                index: m
            }) : (_modules[m.module] || (_modules[m.module] = {}), _modules[m.module][m.path] = m)
        }, this.require = function (path) {
            let root;
            return path.includes("/") ? (root = path.split("/")[0], path = path.replace(root + "/", "")) : (root = path, path = "index"), requireModule(root, path).exports
        }, window.Module = this.Module, window._NODE_ && !window.EJECTA || (window.requireNative = window.require, window.require = this.require)
    }, "Static"), Class(function LinkedList() {
        var prototype = LinkedList.prototype;
        this.length = 0, this.first = null, this.last = null, this.current = null, this.prev = null, void 0 === prototype.push && (prototype.push = function (obj) {
            this.first ? (obj.__next = this.first, obj.__prev = this.last, this.last.__next = obj, this.last = obj) : (this.first = obj, this.last = obj, obj.__prev = obj, obj.__next = obj), this.length++
        }, prototype.remove = function (obj) {
            obj && obj.__next && (this.length <= 1 ? this.empty() : (obj == this.first ? (this.first = obj.__next, this.last.__next = this.first, this.first.__prev = this.last) : obj == this.last ? (this.last = obj.__prev, this.last.__next = this.first, this.first.__prev = this.last) : (obj.__prev.__next = obj.__next, obj.__next.__prev = obj.__prev), this.length--), obj.__prev = null, obj.__next = null)
        }, prototype.empty = function () {
            this.first = null, this.last = null, this.current = null, this.prev = null, this.length = 0
        }, prototype.start = function () {
            return this.current = this.first, this.prev = this.current, this.current
        }, prototype.next = function () {
            if (this.current && (this.current = this.current.__next, 1 != this.length && this.prev.__next != this.first)) return this.prev = this.current, this.current
        }, prototype.destroy = function () {
            return Utils.nullObject(this), null
        })
    }), Class(function ObjectPool(_type, _number = 10) {
        var _pool = [];
        this.array = _pool,
            function () {
                if (_type)
                    for (var i = 0; i < _number; i++) _pool.push(new _type)
            }(), this.get = function () {
                return _pool.shift() || (_type ? new _type : null)
            }, this.empty = function () {
                _pool.length = 0
            }, this.put = function (obj) {
                obj && _pool.push(obj)
            }, this.insert = function (array) {
                void 0 === array.push && (array = [array]);
                for (var i = 0; i < array.length; i++) _pool.push(array[i])
            }, this.length = function () {
                return _pool.length
            }, this.destroy = function () {
                for (let i = _pool.length - 1; i >= 0; i--) _pool[i].destroy && _pool[i].destroy();
                return _pool = null
            }
    }), Hydra.ready(function () {
        window.__window = $(window), window.__document = $(document), window.__body = $(document.getElementsByTagName("body")[0]), window.Stage = window.Stage && window.Stage.style ? $(window.Stage) : __body.create("#Stage"), Stage.size("100%"), Stage.__useFragment = !0, Stage.width = document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth, Stage.height = document.body.clientHeight || document.documentElement.offsetHeight || window.innerHeight
    }), Class(function CSS() {
        function objToCSS(key) {
            var match = key.match(/[A-Z]/),
                camelIndex = match ? match.index : null;
            return camelIndex && (key = key.slice(0, camelIndex) + "-" + key.slice(camelIndex).toLowerCase()), key
        }

        function cssToObj(key) {
            var match = key.match(/\-/),
                camelIndex = match ? match.index : null;
            if (camelIndex) {
                var start = key.slice(0, camelIndex),
                    end = key.slice(camelIndex).slice(1),
                    letter = end.charAt(0);
                end = end.slice(1), key = start + (end = letter.toUpperCase() + end)
            }
            return key
        }

        function setHTML() {
            _obj.innerHTML = _style, _needsUpdate = !1
        }
        var _obj, _style, _needsUpdate, _this = this;
        Hydra.ready(function () {
            _style = "", (_obj = document.createElement("style")).type = "text/css", document.getElementsByTagName("head")[0].appendChild(_obj)
        }), this._read = function () {
            return _style
        }, this._write = function (css) {
            _style = css, _needsUpdate || (_needsUpdate = !0, defer(setHTML))
        }, this.style = function (selector, obj) {
            var s = selector + " {";
            for (var key in obj) {
                var prop = objToCSS(key),
                    val = obj[key];
                "string" != typeof val && "opacity" != key && (val += "px"), s += prop + ":" + val + "!important;"
            }
            s += "}", _this._write(_style + s)
        }, this.get = function (selector, prop) {
            for (var values = new Object, string = _obj.innerHTML.split(selector + " {"), i = 0; i < string.length; i++) {
                var str = string[i];
                if (str.length) {
                    var split = str.split("!important;");
                    for (var j in split)
                        if (split[j].includes(":")) {
                            var fsplit = split[j].split(":");
                            "px" == fsplit[1].slice(-2) && (fsplit[1] = Number(fsplit[1].slice(0, -2))), values[cssToObj(fsplit[0])] = fsplit[1]
                        }
                }
            }
            return prop ? values[prop] : values
        }, this.textSize = function ($obj) {
            var $clone = $obj.clone();
            $clone.css({
                position: "relative",
                cssFloat: "left",
                styleFloat: "left",
                marginTop: -99999,
                width: "",
                height: ""
            }), __body.addChild($clone);
            var width = $clone.div.offsetWidth,
                height = $clone.div.offsetHeight;
            return $clone.remove(), {
                width: width,
                height: height
            }
        }, this.prefix = function (style) {
            return "" == _this.styles.vendor ? style.charAt(0).toLowerCase() + style.slice(1) : _this.styles.vendor + style
        }, this._toCSS = objToCSS
    }, "Static"), Class(function HydraObject(_selector, _type, _exists, _useFragment) {
        this._children = new LinkedList, this.__useFragment = _useFragment, this._initSelector(_selector, _type, _exists)
    }, () => {
        var prototype = HydraObject.prototype;
        prototype._initSelector = function (_selector, _type, _exists) {
            if (_selector && "string" != typeof _selector) this.div = _selector;
            else {
                var first = _selector ? _selector.charAt(0) : null,
                    name = _selector ? _selector.slice(1) : null;
                if ("." != first && "#" != first && (name = _selector, first = "."), _exists) {
                    if ("#" != first) throw "Hydra Selectors Require #ID";
                    this.div = document.getElementById(name)
                } else this._type = _type || "div", "svg" == this._type ? (this.div = document.createElementNS("http://www.w3.org/2000/svg", this._type), this.div.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")) : (this.div = document.createElement(this._type), first && ("#" == first ? this.div.id = name : this.div.className = name))
            }
            this.div.hydraObject = this
        }, prototype.add = function (child) {
            var div = this.div,
                _this = this,
                createFrag = function () {
                    _this.__useFragment && (_this._fragment || (_this._fragment = document.createDocumentFragment(), defer(function () {
                        if (!_this._fragment || !_this.div) return _this._fragment = null;
                        _this.div.appendChild(_this._fragment), _this._fragment = null
                    })), div = _this._fragment)
                };
            return child.element && child.element instanceof HydraObject ? (createFrag(), div.appendChild(child.element.div), this._children.push(child.element), child.element._parent = this, child.element.div.parentNode = this.div) : child.div ? (createFrag(), div.appendChild(child.div), this._children.push(child), child._parent = this, child.div.parentNode = this.div) : child.nodeName && (createFrag(), div.appendChild(child), child.parentNode = this.div), this
        }, prototype.clone = function () {
            return $(this.div.cloneNode(!0))
        }, prototype.create = function (name, type) {
            var $obj = $(name, type);
            return this.add($obj), $obj
        }, prototype.empty = function () {
            for (var child = this._children.start(); child;) child && child.remove && child.remove(), child = this._children.next();
            return this.div.innerHTML = "", this
        }, prototype.parent = function () {
            return this._parent
        }, prototype.children = function () {
            return this.div.children ? this.div.children : this.div.childNodes
        }, prototype.removeChild = function (object, keep) {
            try {
                object.div.parentNode.removeChild(object.div)
            } catch (e) {}
            keep || this._children.remove(object)
        }, prototype.remove = prototype.destroy = function () {
            this.removed = !0;
            var parent = this._parent;
            parent && !parent.removed && parent.removeChild && parent.removeChild(this, !0);
            for (var child = this._children.start(); child;) child && child.remove && child.remove(), child = this._children.next();
            this._children.destroy(), this.div.hydraObject = null, Utils.nullObject(this)
        }, window.$ = function (selector, type, exists) {
            return new HydraObject(selector, type, exists)
        }, $.fn = HydraObject.prototype
    }), $.fn.text = function (text) {
        return void 0 !== text ? (this.__cacheText != text && (this.div.textContent = text), this.__cacheText = text, this) : this.div.textContent
    }, $.fn.html = function (text, force) {
        return !text || text.includes("<") || force ? void 0 !== text ? (this.div.innerHTML = text, this) : this.div.innerHTML : this.text(text)
    }, $.fn.hide = function () {
        return this.div.style.display = "none", this
    }, $.fn.show = function () {
        return this.div.style.display = "", this
    }, $.fn.visible = function () {
        return this.div.style.visibility = "visible", this
    }, $.fn.invisible = function () {
        return this.div.style.visibility = "hidden", this
    }, $.fn.setZ = function (z) {
        return this.div.style.zIndex = z, this
    }, $.fn.clearAlpha = function () {
        return this.div.style.opacity = "", this
    }, $.fn.size = function (w, h, noScale) {
        return "string" == typeof w ? (void 0 === h ? h = "100%" : "string" != typeof h && (h += "px"), this.div.style.width = w, this.div.style.height = h) : (this.div.style.width = w + "px", this.div.style.height = h + "px", noScale || (this.div.style.backgroundSize = w + "px " + h + "px")), this.width = w, this.height = h, this
    }, $.fn.mouseEnabled = function (bool) {
        return this.div.style.pointerEvents = bool ? "auto" : "none", this
    }, $.fn.fontStyle = function (family, size, color, style) {
        var font = {};
        return family && (font.fontFamily = family), size && (font.fontSize = size), color && (font.color = color), style && (font.fontStyle = style), this.css(font), this
    }, $.fn.bg = function (src, x, y, repeat) {
        return src ? (src.includes(".") && (src = Assets.getPath(src)), src.includes(".") ? this.div.style.backgroundImage = "url(" + src + ")" : this.div.style.backgroundColor = src, void 0 !== x && (x = "number" == typeof x ? x + "px" : x, y = "number" == typeof y ? y + "px" : y, this.div.style.backgroundPosition = x + " " + y), repeat && (this.div.style.backgroundSize = "", this.div.style.backgroundRepeat = repeat), "cover" != x && "contain" != x || (this.div.style.backgroundSize = x, this.div.style.backgroundPosition = void 0 !== y ? y + " " + repeat : "center"), this) : this
    }, $.fn.center = function (x, y, noPos) {
        var css = {};
        return void 0 === x ? (css.left = "50%", css.top = "50%", css.marginLeft = -this.width / 2, css.marginTop = -this.height / 2) : (x && (css.left = "50%", css.marginLeft = -this.width / 2), y && (css.top = "50%", css.marginTop = -this.height / 2)), noPos && (delete css.left, delete css.top), this.css(css), this
    }, $.fn.mask = function (arg) {
        return this.div.style[CSS.prefix("Mask")] = (arg.includes(".") ? "url(" + arg + ")" : arg) + " no-repeat", this.div.style[CSS.prefix("MaskSize")] = "contain", this
    }, $.fn.blendMode = function (mode, bg) {
        return bg ? this.div.style["background-blend-mode"] = mode : this.div.style["mix-blend-mode"] = mode, this
    }, $.fn.css = function (obj, value) {
        if ("boolean" == typeof value && (value = null), "object" != typeof obj) {
            if (value) return this.div.style[obj] = value, this;
            var style = this.div.style[obj];
            if ("number" != typeof style) {
                if (!style) return !1;
                style.includes("px") && (style = Number(style.slice(0, -2))), "opacity" == obj && (style = isNaN(Number(this.div.style.opacity)) ? 1 : Number(this.div.style.opacity))
            }
            return style || (style = 0), style
        }
        TweenManager._clearCSSTween(this);
        for (var type in obj) {
            var val = obj[type];
            "string" != typeof val && "number" != typeof val || ("string" != typeof val && "opacity" != type && "zIndex" != type && (val += "px"), this.div.style[type] = val)
        }
        return this
    }, $.fn.transform = function (props) {
        if (!(this.multiTween && this.cssTweens && this._cssTweens.length > 1 && this.__transformTime && Render.TIME - this.__transformTime < 15)) {
            if (this.__transformTime = Render.TIME, TweenManager._clearCSSTween(this), Device.tween.css2d) {
                if (props)
                    for (var key in props) "number" == typeof props[key] && (this[key] = props[key]);
                else props = this;
                var transformString = TweenManager._parseTransform(props);
                this.__transformCache != transformString && (this.div.style[CSS.styles.vendorTransform] = transformString, this.__transformCache = transformString)
            }
            return this
        }
    }, $.fn.willChange = function (props) {
        if ("boolean" == typeof props) this._willChangeLock = !0 === props;
        else if (this._willChangeLock) return;
        var string = "string" == typeof props;
        this._willChange && !string || "null" == typeof props ? (this._willChange = !1, this.div.style["will-change"] = "") : (this._willChange = !0, this.div.style["will-change"] = string ? props : CSS.transformProperty + ", opacity")
    }, $.fn.backfaceVisibility = function (visible) {
        this.div.style[CSS.prefix("BackfaceVisibility")] = visible ? "visible" : "hidden"
    }, $.fn.enable3D = function (perspective, x, y) {
        return Device.tween.css3d ? (this.div.style[CSS.prefix("TransformStyle")] = "preserve-3d", perspective && (this.div.style[CSS.prefix("Perspective")] = perspective + "px"), void 0 !== x && (x = "number" == typeof x ? x + "px" : x, y = "number" == typeof y ? y + "px" : y, this.div.style[CSS.prefix("PerspectiveOrigin")] = x + " " + y), this) : this
    }, $.fn.disable3D = function () {
        return this.div.style[CSS.prefix("TransformStyle")] = "", this.div.style[CSS.prefix("Perspective")] = "", this
    }, $.fn.transformPoint = function (x, y, z) {
        var origin = "";
        return void 0 !== x && (origin += "number" == typeof x ? x + "px " : x + " "), void 0 !== y && (origin += "number" == typeof y ? y + "px " : y + " "), void 0 !== z && (origin += "number" == typeof z ? z + "px" : z), this.div.style[CSS.prefix("TransformOrigin")] = origin, this
    }, $.fn.tween = function (props, time, ease, delay, callback, manual) {
        "boolean" == typeof delay ? (manual = delay, delay = 0, callback = null) : "function" == typeof delay && (callback = delay, delay = 0), "boolean" == typeof callback && (manual = callback, callback = null), delay || (delay = 0);
        var usePromise = null;
        callback && callback instanceof Promise && (usePromise = callback, callback = callback.resolve);
        var tween = TweenManager._detectTween(this, props, time, ease, delay, callback, manual);
        return usePromise || tween
    }, $.fn.clearTransform = function () {
        return "number" == typeof this.x && (this.x = 0), "number" == typeof this.y && (this.y = 0), "number" == typeof this.z && (this.z = 0), "number" == typeof this.scale && (this.scale = 1), "number" == typeof this.scaleX && (this.scaleX = 1), "number" == typeof this.scaleY && (this.scaleY = 1), "number" == typeof this.rotation && (this.rotation = 0), "number" == typeof this.rotationX && (this.rotationX = 0), "number" == typeof this.rotationY && (this.rotationY = 0), "number" == typeof this.rotationZ && (this.rotationZ = 0), "number" == typeof this.skewX && (this.skewX = 0), "number" == typeof this.skewY && (this.skewY = 0), this.div.style[CSS.styles.vendorTransform] = "", this
    }, $.fn.clearTween = function () {
        return this._cssTween && this._cssTween.stop(), this._mathTween && this._mathTween.stop(), this
    }, $.fn.stopTween = function () {
        return console.warn(".stopTween deprecated. use .clearTween instead"), this.clearTween()
    }, $.fn.keypress = function (callback) {
        this.div.onkeypress = function (e) {
            (e = e || window.event).code = e.keyCode ? e.keyCode : e.charCode, callback && callback(e)
        }
    }, $.fn.keydown = function (callback) {
        this.div.onkeydown = function (e) {
            (e = e || window.event).code = e.keyCode, callback && callback(e)
        }
    }, $.fn.keyup = function (callback) {
        this.div.onkeyup = function (e) {
            (e = e || window.event).code = e.keyCode, callback && callback(e)
        }
    }, $.fn.attr = function (attr, value) {
        if (attr && value) "" == value ? this.div.removeAttribute(attr) : this.div.setAttribute(attr, value);
        else if (attr) return this.div.getAttribute(attr);
        return this
    }, $.fn.val = function (value) {
        return void 0 === value ? this.div.value : (this.div.value = value, this)
    }, $.fn.change = function (callback) {
        var _this = this;
        "select" == this._type && (this.div.onchange = function () {
            callback({
                object: _this,
                value: _this.div.value || ""
            })
        })
    }, $.fn.svgSymbol = function (id, width, height) {
        var config = SVG.getSymbolConfig(id),
            svgHTML = '<svg viewBox="0 0 ' + config.width + " " + config.height + '" width="' + width + '" height="' + height + '"><use xlink:href="#' + config.id + '" x="0" y="0" /></svg>';
        this.html(svgHTML, !0)
    }, $.fn.overflowScroll = function (dir) {
        if (Device.mobile) {
            var x = !!dir.x,
                y = !!dir.y,
                overflow = {
                    "-webkit-overflow-scrolling": "touch"
                };
            (!x && !y || x && y) && (overflow.overflow = "scroll"), !x && y && (overflow.overflowY = "scroll", overflow.overflowX = "hidden"), x && !y && (overflow.overflowX = "scroll", overflow.overflowY = "hidden"), this.css(overflow), Mobile._addOverflowScroll(this)
        }
    }, $.fn.removeOverflowScroll = function () {
        Device.mobile && (this.css({
            overflow: "hidden",
            overflowX: "",
            overflowY: "",
            "-webkit-overflow-scrolling": ""
        }), Mobile._removeOverflowScroll(this))
    },
    function () {
        var windowsPointer = !!window.MSGesture,
            translateEvent = function (evt) {
                if (windowsPointer) switch (evt) {
                    case "touchstart":
                        return "pointerdown";
                    case "touchmove":
                        return "MSGestureChange";
                    case "touchend":
                        return "pointerup"
                }
                return evt
            },
            convertTouchEvent = function (e) {
                var touchEvent = {};
                if (touchEvent.x = 0, touchEvent.y = 0, e.windowsPointer) return e;
                if (!e) return touchEvent;
                if (e.touches || e.changedTouches ? e.touches.length ? (touchEvent.x = e.touches[0].pageX, touchEvent.y = e.touches[0].pageY) : (touchEvent.x = e.changedTouches[0].pageX, touchEvent.y = e.changedTouches[0].pageY) : (touchEvent.x = e.pageX, touchEvent.y = e.pageY), Mobile.ScreenLock && Mobile.ScreenLock.isActive && Mobile.orientationSet && Mobile.orientation !== Mobile.orientationSet) {
                    if (90 == window.orientation || 0 === window.orientation) {
                        var x = touchEvent.y;
                        touchEvent.y = touchEvent.x, touchEvent.x = Stage.width - x
                    }
                    if (-90 == window.orientation || 180 === window.orientation) {
                        var y = touchEvent.x;
                        touchEvent.x = touchEvent.y, touchEvent.y = Stage.height - y
                    }
                }
                return touchEvent
            };
        $.fn.click = function (callback) {
            var _this = this;
            return this.div.addEventListener(translateEvent("click"), function click(e) {
                return !!_this.div && !Mouse._preventClicks && (e.object = "hit" == _this.div.className ? _this.parent() : _this, e.action = "click", e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e), void(Mouse.autoPreventClicks && Mouse.preventClicks()))
            }, !0), this.div.style.cursor = "pointer", this
        }, $.fn.hover = function (callback) {
            function hover(e) {
                if (!_this.div) return !1;
                var time = performance.now(),
                    original = e.toElement || e.relatedTarget;
                if (_time && time - _time < 5) return _time = time, !1;
                switch (_time = time, e.object = "hit" == _this.div.className ? _this.parent() : _this, e.type) {
                    case "mouseout":
                    case "mouseleave":
                        e.action = "out";
                        break;
                    default:
                        e.action = "over"
                }
                if (_over) {
                    if (Mouse._preventClicks) return !1;
                    if ("over" == e.action) return !1;
                    if ("out" == e.action && isAChild(_this.div, original)) return !1;
                    _over = !1
                } else {
                    if ("out" == e.action) return !1;
                    _over = !0
                }
                e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e)
            }

            function isAChild(div, object) {
                for (var len = div.children.length - 1, i = len; i > -1; i--)
                    if (object == div.children[i]) return !0;
                for (i = len; i > -1; i--)
                    if (isAChild(div.children[i], object)) return !0
            }
            var _time, _this = this,
                _over = !1;
            return this.div.addEventListener(translateEvent("mouseover"), hover, !0), this.div.addEventListener(translateEvent("mouseout"), hover, !0), this
        }, $.fn.press = function (callback) {
            function press(e) {
                if (!_this.div) return !1;
                switch (e.object = "hit" == _this.div.className ? _this.parent() : _this, e.type) {
                    case "mousedown":
                        e.action = "down";
                        break;
                    default:
                        e.action = "up"
                }
                e.pageX || (e.pageX = e.clientX, e.pageY = e.clientY), callback && callback(e)
            }
            var _this = this;
            return this.div.addEventListener(translateEvent("mousedown"), press, !0), this.div.addEventListener(translateEvent("mouseup"), press, !0), this
        }, $.fn.bind = function (evt, callback) {
            function touchEvent(e) {
                windowsPointer && target.msGesture && "touchstart" == evt && target.msGesture.addPointer(e.pointerId);
                var touch = convertTouchEvent(e);
                if (windowsPointer) {
                    var windowsEvt = e;
                    (e = {}).x = Number(windowsEvt.pageX || windowsEvt.clientX), e.y = Number(windowsEvt.pageY || windowsEvt.clientY), e.target = windowsEvt.target, e.currentTarget = windowsEvt.currentTarget, e.path = [];
                    for (var node = e.target; node;) e.path.push(node), node = node.parentElement || null;
                    e.windowsPointer = !0
                } else e.x = touch.x, e.y = touch.y;
                for (var i = 0; i < _events.length; i++) {
                    var ev = _events[i];
                    ev.target == e.currentTarget && ev.callback(e)
                }
            }
            if (this._events = this._events || {}, windowsPointer && this == __window) return Stage.bind(evt, callback);
            "touchstart" == evt ? Device.mobile || (Device.touchCapable ? this.bind("mousedown", callback) : evt = "mousedown") : "touchmove" == evt ? (Device.mobile || (Device.touchCapable ? this.bind("mousemove", callback) : evt = "mousemove"), windowsPointer && !this.div.msGesture && (this.div.msGesture = new MSGesture, this.div.msGesture.target = this.div)) : "touchend" == evt && (Device.mobile || (Device.touchCapable ? this.bind("mouseup", callback) : evt = "mouseup")), this._events["bind_" + evt] = this._events["bind_" + evt] || [];
            var _events = this._events["bind_" + evt],
                e = {},
                target = this.div;
            return e.callback = callback, e.target = this.div, _events.push(e), this._events["fn_" + evt] || (this._events["fn_" + evt] = touchEvent, this.div.addEventListener(translateEvent(evt), touchEvent, !0)), this
        }, $.fn.unbind = function (evt, callback) {
            if (this._events = this._events || {}, windowsPointer && this == __window) return Stage.unbind(evt, callback);
            "touchstart" == evt ? Device.mobile || (Device.touchCapable ? this.unbind("mousedown", callback) : evt = "mousedown") : "touchmove" == evt ? Device.mobile || (Device.touchCapable ? this.unbind("mousemove", callback) : evt = "mousemove") : "touchend" == evt && (Device.mobile || (Device.touchCapable ? this.unbind("mouseup", callback) : evt = "mouseup"));
            var _events = this._events["bind_" + evt];
            if (!_events) return this;
            for (var i = 0; i < _events.length; i++) _events[i].callback == callback && _events.splice(i, 1);
            return this._events["fn_" + evt] && !_events.length && (this.div.removeEventListener(translateEvent(evt), this._events["fn_" + evt], !Device.mobile || {
                passive: !0
            }), this._events["fn_" + evt] = null), this
        }, $.fn.interact = function (overCallback, clickCallback) {
            this.hit || (this.hit = $(".hit"), this.hit.css({
                width: "100%",
                height: "100%",
                zIndex: 99999,
                top: 0,
                left: 0,
                position: "absolute"
            }), this.add(this.hit)), Device.mobile ? this.hit.touchClick(overCallback, clickCallback) : this.hit.hover(overCallback).click(clickCallback)
        }, $.fn.touchSwipe = function (callback, distance) {
            function touchMove(e) {
                if (!_this.div) return !1;
                if (_moving) {
                    var touch = convertTouchEvent(e),
                        dx = _startX - touch.x,
                        dy = _startY - touch.y;
                    _move.direction = null, _move.moving = null, _move.x = null, _move.y = null, _move.evt = e, Math.abs(dx) >= _distance ? (touchEnd(), _move.direction = dx > 0 ? "left" : "right") : Math.abs(dy) >= _distance ? (touchEnd(), _move.direction = dy > 0 ? "up" : "down") : (_move.moving = !0, _move.x = dx, _move.y = dy), callback && callback(_move, e)
                }
            }

            function touchEnd(e) {
                if (!_this.div) return !1;
                _startX = _startY = _moving = !1, _this.div.removeEventListener(translateEvent("touchmove"), touchMove)
            }
            if (!window.addEventListener) return this;
            var _startX, _startY, _this = this,
                _distance = distance || 75,
                _moving = !1,
                _move = {};
            return Device.mobile && (this.div.addEventListener(translateEvent("touchstart"), function touchStart(e) {
                var touch = convertTouchEvent(e);
                if (!_this.div) return !1;
                1 == e.touches.length && (_startX = touch.x, _startY = touch.y, _moving = !0, _this.div.addEventListener(translateEvent("touchmove"), touchMove, {
                    passive: !0
                }))
            }, {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchend"), touchEnd, {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchcancel"), touchEnd, {
                passive: !0
            })), this
        }, $.fn.touchClick = function (hover, click) {
            function findDistance(p1, p2) {
                var dx = p2.x - p1.x,
                    dy = p2.y - p1.y;
                return Math.sqrt(dx * dx + dy * dy)
            }

            function setTouch(e) {
                var touch = convertTouchEvent(e);
                e.touchX = touch.x, e.touchY = touch.y, _start.x = e.touchX, _start.y = e.touchY
            }
            if (!window.addEventListener) return this;
            var _time, _move, _this = this,
                _start = {},
                _touch = {};
            return Device.mobile && (this.div.addEventListener(translateEvent("touchmove"), function touchMove(e) {
                if (!_this.div) return !1;
                _touch = convertTouchEvent(e), _move = findDistance(_start, _touch) > 5
            }, {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchstart"), function touchStart(e) {
                if (!_this.div) return !1;
                _time = performance.now(), e.action = "over", e.object = "hit" == _this.div.className ? _this.parent() : _this, setTouch(e), hover && !_move && hover(e)
            }, {
                passive: !0
            }), this.div.addEventListener(translateEvent("touchend"), function touchEnd(e) {
                if (!_this.div) return !1;
                var time = performance.now();
                if (e.object = "hit" == _this.div.className ? _this.parent() : _this, setTouch(e), _time && time - _time < 750) {
                    if (Mouse._preventClicks) return !1;
                    click && !_move && (e.action = "click", click && !_move && click(e), Mouse.autoPreventClicks && Mouse.preventClicks())
                }
                hover && (e.action = "out", Mouse._preventFire || hover(e)), _move = !1
            }, {
                passive: !0
            })), this
        }
    }(), Class(function Element() {
        Inherit(this, Component);
        var name = Utils.getConstructorName(this);
        this.element = $("." + name), this.element.__useFragment = !0, this.destroy = function () {
            this.element && this.element.remove && (this.element = this.element.remove()), this._destroy && this._destroy()
        }
    }), Hydra.ready(() => {
        TweenManager.Transforms = ["scale", "scaleX", "scaleY", "x", "y", "z", "rotation", "rotationX", "rotationY", "rotationZ", "skewX", "skewY", "perspective"], TweenManager.CubicEases = [{
            name: "easeOutCubic",
            curve: "cubic-bezier(0.215, 0.610, 0.355, 1.000)"
        }, {
            name: "easeOutQuad",
            curve: "cubic-bezier(0.250, 0.460, 0.450, 0.940)"
        }, {
            name: "easeOutQuart",
            curve: "cubic-bezier(0.165, 0.840, 0.440, 1.000)"
        }, {
            name: "easeOutQuint",
            curve: "cubic-bezier(0.230, 1.000, 0.320, 1.000)"
        }, {
            name: "easeOutSine",
            curve: "cubic-bezier(0.390, 0.575, 0.565, 1.000)"
        }, {
            name: "easeOutExpo",
            curve: "cubic-bezier(0.190, 1.000, 0.220, 1.000)"
        }, {
            name: "easeOutCirc",
            curve: "cubic-bezier(0.075, 0.820, 0.165, 1.000)"
        }, {
            name: "easeOutBack",
            curve: "cubic-bezier(0.175, 0.885, 0.320, 1.275)"
        }, {
            name: "easeInCubic",
            curve: "cubic-bezier(0.550, 0.055, 0.675, 0.190)"
        }, {
            name: "easeInQuad",
            curve: "cubic-bezier(0.550, 0.085, 0.680, 0.530)"
        }, {
            name: "easeInQuart",
            curve: "cubic-bezier(0.895, 0.030, 0.685, 0.220)"
        }, {
            name: "easeInQuint",
            curve: "cubic-bezier(0.755, 0.050, 0.855, 0.060)"
        }, {
            name: "easeInSine",
            curve: "cubic-bezier(0.470, 0.000, 0.745, 0.715)"
        }, {
            name: "easeInCirc",
            curve: "cubic-bezier(0.600, 0.040, 0.980, 0.335)"
        }, {
            name: "easeInBack",
            curve: "cubic-bezier(0.600, -0.280, 0.735, 0.045)"
        }, {
            name: "easeInOutCubic",
            curve: "cubic-bezier(0.645, 0.045, 0.355, 1.000)"
        }, {
            name: "easeInOutQuad",
            curve: "cubic-bezier(0.455, 0.030, 0.515, 0.955)"
        }, {
            name: "easeInOutQuart",
            curve: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
        }, {
            name: "easeInOutQuint",
            curve: "cubic-bezier(0.860, 0.000, 0.070, 1.000)"
        }, {
            name: "easeInOutSine",
            curve: "cubic-bezier(0.445, 0.050, 0.550, 0.950)"
        }, {
            name: "easeInOutExpo",
            curve: "cubic-bezier(1.000, 0.000, 0.000, 1.000)"
        }, {
            name: "easeInOutCirc",
            curve: "cubic-bezier(0.785, 0.135, 0.150, 0.860)"
        }, {
            name: "easeInOutBack",
            curve: "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
        }, {
            name: "easeInOut",
            curve: "cubic-bezier(.42,0,.58,1)"
        }, {
            name: "linear",
            curve: "linear"
        }], TweenManager.useCSSTrans = function (props, ease, object) {
            return !props.math && (("string" != typeof ease || !ease.includes(["Elastic", "Bounce"])) && (!object.multiTween && !TweenManager._inspectEase(ease).path && !!Device.tween.transition))
        }, TweenManager._detectTween = function (object, props, time, ease, delay, callback) {
            return TweenManager.useCSSTrans(props, ease, object) ? new CSSTransition(object, props, time, ease, delay, callback) : new FrameTween(object, props, time, ease, delay, callback)
        }, TweenManager._parseTransform = function (props) {
            var transforms = "",
                translate = "";
            if (props.perspective > 0 && (transforms += "perspective(" + props.perspective + "px)"), void 0 !== props.x || void 0 !== props.y || void 0 !== props.z) {
                var x = props.x || 0,
                    y = props.y || 0,
                    z = props.z || 0;
                translate += x + "px, ", translate += y + "px", Device.tween.css3d ? transforms += "translate3d(" + (translate += ", " + z + "px") + ")" : transforms += "translate(" + translate + ")"
            }
            return void 0 !== props.scale ? transforms += "scale(" + props.scale + ")" : (void 0 !== props.scaleX && (transforms += "scaleX(" + props.scaleX + ")"), void 0 !== props.scaleY && (transforms += "scaleY(" + props.scaleY + ")")), void 0 !== props.rotation && (transforms += "rotate(" + props.rotation + "deg)"), void 0 !== props.rotationX && (transforms += "rotateX(" + props.rotationX + "deg)"), void 0 !== props.rotationY && (transforms += "rotateY(" + props.rotationY + "deg)"), void 0 !== props.rotationZ && (transforms += "rotateZ(" + props.rotationZ + "deg)"), void 0 !== props.skewX && (transforms += "skewX(" + props.skewX + "deg)"), void 0 !== props.skewY && (transforms += "skewY(" + props.skewY + "deg)"), transforms
        }, TweenManager._clearCSSTween = function (obj) {
            obj && !obj._cssTween && obj.div._transition && !obj.persistTween && (obj.div.style[CSS.styles.vendorTransition] = "", obj.div._transition = !1, obj._cssTween = null)
        }, TweenManager._isTransform = function (key) {
            return TweenManager.Transforms.indexOf(key) > -1
        }, TweenManager._getAllTransforms = function (object) {
            for (var obj = {}, i = TweenManager.Transforms.length - 1; i > -1; i--) {
                var tf = TweenManager.Transforms[i],
                    val = object[tf];
                0 !== val && "number" == typeof val && (obj[tf] = val)
            }
            return obj
        };
        const prefix = function () {
            let pre = "",
                dom = "";
            if (window._NODE_ || window._GLES_) pre = "webkit", dom = "WebKit";
            else {
                var styles = window.getComputedStyle(document.documentElement, "");
                pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || "" === styles.OLink && ["", "o"])[1], dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1]
            }
            return {
                unprefixed: "ie" == Device.system.browser && !Device.detect("msie 9"),
                dom: dom,
                lowercase: pre,
                css: "-" + pre + "-",
                js: ("ie" == Device.system.browser ? pre[0] : pre[0].toUpperCase()) + pre.substr(1)
            }
        }();
        CSS.styles = {}, CSS.styles.vendor = prefix.unprefixed ? "" : prefix.js, CSS.styles.vendorTransition = CSS.styles.vendor.length ? CSS.styles.vendor + "Transition" : "transition", CSS.styles.vendorTransform = CSS.styles.vendor.length ? CSS.styles.vendor + "Transform" : "transform", CSS.vendor = prefix.css, CSS.transformProperty = function () {
            switch (prefix.lowercase) {
                case "moz":
                    return "-moz-transform";
                case "webkit":
                    return "-webkit-transform";
                case "o":
                    return "-o-transform";
                case "ms":
                    return "-ms-transform";
                default:
                    return "transform"
            }
        }(), CSS.tween = {}, CSS.tween.complete = prefix.unprefixed ? "transitionend" : prefix.lowercase + "TransitionEnd"
    }), Class(function CSSTransition(_object, _props, _time, _ease, _delay, _callback) {
        function killed() {
            return !_this || _this.kill || !_object || !_object.div
        }

        function initProperties() {
            var transform = TweenManager._getAllTransforms(_object),
                properties = [];
            for (var key in _props) TweenManager._isTransform(key) ? (transform.use = !0, transform[key] = _props[key], delete _props[key]) : ("number" == typeof _props[key] || key.includes("-")) && properties.push(key);
            transform.use && (properties.push(CSS.transformProperty), delete transform.use), _transformProps = transform, _transitionProps = properties
        }

        function initCSSTween(values) {
            if (!killed()) {
                _object._cssTween && (_object._cssTween.kill = !0), _object._cssTween = _this, _object.div._transition = !0;
                var strings = buildStrings(_time, _ease, _delay);
                _object.willChange(strings.props);
                var time = values ? values.time : _time,
                    delay = values ? values.delay : _delay,
                    props = values ? values.props : _props,
                    transformProps = values ? values.transform : _transformProps;
                _this.time = _time, _this.delay = _delay, Timer.create(function () {
                    killed() || (_object.div.style[CSS.styles.vendorTransition] = strings.transition, _this.playing = !0, "safari" == Device.system.browser ? Timer.create(function () {
                        killed() || (_object.css(props), _object.transform(transformProps))
                    }, 16) : (_object.css(props), _object.transform(transformProps)), Timer.create(function () {
                        killed() || (clearCSSTween(), _callback && _callback(), _this.completePromise && _this.completePromise.resolve())
                    }, time + delay))
                }, 35)
            }
        }

        function buildStrings(time, ease, delay) {
            for (var props = "", str = "", len = _transitionProps.length, i = 0; i < len; i++) {
                var transitionProp = _transitionProps[i];
                props += (props.length ? ", " : "") + transitionProp, str += (str.length ? ", " : "") + transitionProp + " " + time + "ms " + TweenManager._getEase(ease) + " " + delay + "ms"
            }
            return {
                props: props,
                transition: str
            }
        }

        function clearCSSTween() {
            killed() || (_this.playing = !1, _object._cssTween = null, _object.willChange(null), _object = _props = null, Utils.nullObject(this))
        }
        const _this = this;
        let _transformProps, _transitionProps;
        this.playing = !0, defer(function () {
            if (_this.overrideValues) {
                let values = _this.overrideValues(_this, _object, _props, _time, _ease, _delay);
                values && (_props = values.props || _props, _time = values.time || _time, _ease = values.ease || _ease, _delay = values.delay || _delay)
            }
            if ("number" != typeof _time) throw "CSSTween Requires object, props, time, ease";
            initProperties(), initCSSTween()
        }), this.stop = function () {
            this.playing && (this.kill = !0, this.playing = !1, _object.div.style[CSS.styles.vendorTransition] = "", _object.div._transition = !1, _object.willChange(null), _object._cssTween = null, Utils.nullObject(this))
        }, this.onComplete = function (callback) {
            return _callback = callback, this
        }, this.promise = function () {
            return _this.completePromise = Promise.create(), _this.completePromise
        }
    }), Class(function FrameTween(_object, _props, _time, _ease, _delay, _callback, _manual) {
        function killed() {
            return _this.kill || !_object || !_object.div
        }

        function initValues() {
            _props.math && delete _props.math, Device.tween.transition && _object.div._transition && (_object.div.style[CSS.styles.vendorTransition] = "", _object.div._transition = !1), _endValues = {}, _transformEnd = {}, _transformStart = {}, _startValues = {}, _object.multiTween || (void 0 === _props.x && (_props.x = _object.x), void 0 === _props.y && (_props.y = _object.y), void 0 === _props.z && (_props.z = _object.z));
            for (var key in _props)
                if (key.includes(["damping", "spring"])) _endValues[key] = _props[key], _transformEnd[key] = _props[key];
                else if (TweenManager._isTransform(key)) _isTransform = !0, _transformStart[key] = _object[key] || ("scale" == key ? 1 : 0), _transformEnd[key] = _props[key];
            else {
                _isCSS = !0;
                var v = _props[key];
                "string" == typeof v ? _object.div.style[key] = v : "number" == typeof v && (_startValues[key] = Number(_object.css(key)), _endValues[key] = v)
            }
        }

        function startTween() {
            !_object._cssTween || _manual || _object.multiTween || (_object._cssTween.kill = !0), _this.time = _time, _this.delay = _delay, _object.multiTween && (_object._cssTweens || (_object._cssTweens = []), _object._cssTweens.push(_this)), _object._cssTween = _this, _this.playing = !0, _props = copy(_startValues), _transformProps = copy(_transformStart), _isCSS && (_cssTween = tween(_props, _endValues, _time, _ease, _delay, _manual).onUpdate(update).onComplete(tweenComplete)), _isTransform && (_transformTween = tween(_transformProps, _transformEnd, _time, _ease, _delay, _manual).onComplete(_isCSS ? null : tweenComplete).onUpdate(_isCSS ? null : update))
        }

        function copy(obj) {
            let newObj = {};
            for (let key in obj) "number" == typeof obj[key] && (newObj[key] = obj[key]);
            return newObj
        }

        function clear() {
            _object._cssTweens && _object._cssTweens.remove(_this), _this.playing = !1, _object._cssTween = null, _object = _props = null
        }

        function update() {
            if (!killed()) {
                if (_isCSS && _object.css(_props), _isTransform)
                    if (_object.multiTween) {
                        for (var key in _transformProps) "number" == typeof _transformProps[key] && (_object[key] = _transformProps[key]);
                        _object.transform()
                    } else _object.transform(_transformProps);
                _update && _update()
            }
        }

        function tweenComplete() {
            _this.playing && (clear(), _callback && _callback())
        }
        var _endValues, _transformEnd, _transformStart, _startValues, _isTransform, _isCSS, _transformProps, _cssTween, _transformTween, _update, _this = this;
        this.playing = !0, defer(function () {
            if (_this.overrideValues) {
                let values = _this.overrideValues(_this, _object, _props, _time, _ease, _delay);
                values && (_props = values.props || _props, _time = values.time || _time, _ease = values.ease || _ease, _delay = values.delay || _delay)
            }
            if ("object" == typeof _ease && (_ease = "easeOutCubic"), _object && _props) {
                if ("number" != typeof _time) throw "FrameTween Requires object, props, time, ease";
                initValues(), startTween()
            }
        }), this.stop = function () {
            this.playing && (_cssTween && _cssTween.stop && _cssTween.stop(), _transformTween && _transformTween.stop && _transformTween.stop(), clear())
        }, this.interpolate = function (elapsed) {
            _cssTween && _cssTween.interpolate(elapsed), _transformTween && _transformTween.interpolate(elapsed), update()
        }, this.getValues = function () {
            return {
                start: _startValues,
                transformStart: _transformStart,
                end: _endValues,
                transformEnd: _transformEnd
            }
        }, this.setEase = function (ease) {
            _cssTween && _cssTween.setEase(ease), _transformTween && _transformTween.setEase(ease)
        }, this.onUpdate = function () {
            return this
        }, this.onComplete = function (callback) {
            return _callback = callback, this
        }
    }), Class(function Interaction(_object) {
        function Vec2() {
            this.x = 0, this.y = 0, this.length = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            }
        }

        function addHandlers() {
            _object == Stage || _object == __window ? Interaction.bind("touchstart", down) : _object.bind("touchstart", down), Interaction.bind("touchmove", move), Interaction.bind("touchend", up)
        }

        function down(e) {
            _this.isTouching = !0, e.touches && "number" == typeof e.touches[0].force && (e.force = e.touches[0].force), _this.x = e.x, _this.y = e.y, _this.hold.x = _this.last.x = e.x, _this.hold.y = _this.last.y = e.y, _this.delta.x = _this.move.x = _this.velocity.x = 0, _this.delta.y = _this.move.y = _this.velocity.y = 0, _distance = 0, _this.events.fire(Interaction.START, e, !0), _timeDown = _timeMove = Render.TIME
        }

        function move(e) {
            _this.isTouching && (_this.move.x = e.x - _this.hold.x, _this.move.y = e.y - _this.hold.y), e.touches && "number" == typeof e.touches[0].force && (e.force = e.touches[0].force), _this.x = e.x, _this.y = e.y, _this.delta.x = e.x - _this.last.x, _this.delta.y = e.y - _this.last.y, _this.last.x = e.x, _this.last.y = e.y, _distance += _this.delta.length();
            let delta = Math.max(.001, Render.TIME - (_timeMove || Render.TIME));
            _timeMove = Render.TIME, _this.velocity.x = Math.abs(_this.delta.x) / delta, _this.velocity.y = Math.abs(_this.delta.y) / delta, _this.events.fire(Interaction.MOVE, e, !0), _this.isTouching && _this.events.fire(Interaction.DRAG, e, !0)
        }

        function up(e) {
            _this.isTouching && (_this.isTouching = !1, _this.move.x = 0, _this.move.y = 0, Math.max(.001, Render.TIME - (_timeMove || Render.TIME)) > 100 && (_this.delta.x = 0, _this.delta.y = 0), _this.events.fire(Interaction.END, e, !0), _distance < 20 && Render.TIME - _timeDown < 2e3 && _this.events.fire(Interaction.CLICK, e, !0))
        }
        Inherit(this, Events);
        const _this = this;
        this.x = 0, this.y = 0, this.hold = new Vec2, this.last = new Vec2, this.delta = new Vec2, this.move = new Vec2, this.velocity = new Vec2;
        let _distance, _timeDown, _timeMove;
        ! function () {
            if (!_object instanceof HydraObject) throw "Interaction.Input requires a HydraObject";
            addHandlers()
        }(), this.destroy = function () {
            return Interaction.unbind("touchstart", down), Interaction.unbind("touchmove", move), Interaction.unbind("touchend", up), _object && _object.unbind && _object.unbind("touchstart", down), this._destroy && this._destroy()
        }
    }, () => {
        function touchMove(e) {
            _events.touchmove.forEach(c => c(e))
        }

        function touchStart(e) {
            _events.touchstart.forEach(c => c(e))
        }

        function touchEnd(e) {
            _events.touchend.forEach(c => c(e))
        }
        Namespace(Interaction), Interaction.CLICK = "interaction_click", Interaction.START = "interaction_start", Interaction.MOVE = "interaction_move", Interaction.DRAG = "interaction_drag", Interaction.END = "interaction_end";
        const _events = {
            touchstart: [],
            touchmove: [],
            touchend: []
        };
        Hydra.ready(() => {
            __window.bind("touchstart", touchStart), __window.bind("touchmove", touchMove), __window.bind("touchend", touchEnd), __window.bind("touchcancel", touchEnd), __window.bind("contextmenu", touchEnd)
        }), Interaction.bind = function (evt, callback) {
            _events[evt].push(callback)
        }, Interaction.unbind = function (evt, callback) {
            _events[evt].remove(callback)
        }
    }), Class(function Mouse() {
        function init() {
            _this.input = new Interaction(__window), _this.events.sub(_this.input, Interaction.START, update), _this.events.sub(_this.input, Interaction.MOVE, update), _this.events.sub(_this.input, Interaction.END, end), _this.hold = _this.input.hold, _this.last = _this.input.last, _this.delta = _this.input.delta, _this.move = _this.input.move, _this.velocity = _this.input.velocity, defer(() => {
                _this.events.sub(Events.RESIZE, resize), resize()
            })
        }

        function update(e) {
            _this.x = e.x, _this.y = e.y, Stage.width && Stage.height && (_this.normal.x = e.x / Stage.width - _offset.x, _this.normal.y = e.y / Stage.height - _offset.y, _this.tilt.x = 2 * _this.normal.x - 1, _this.tilt.y = 1 - 2 * _this.normal.y, _this.inverseNormal.x = _this.normal.x, _this.inverseNormal.y = 1 - _this.normal.y)
        }

        function end(e) {
            Device.mobile && _this.resetOnRelease && update(_this.resetOnRelease)
        }

        function resize() {
            Stage.css("top") && (_offset.y = Stage.css("top") / Stage.height), Stage.css("left") && (_offset.x = Stage.css("left") / Stage.width)
        }
        Inherit(this, Events);
        const _this = this;
        this.x = 0, this.y = 0, this.normal = {
            x: 0,
            y: 0
        }, this.tilt = {
            x: 0,
            y: 0
        }, this.inverseNormal = {
            x: 0,
            y: 0
        }, this.resetOnRelease = !1;
        const _offset = {
            x: 0,
            y: 0
        };
        Hydra.ready(init)
    }, "Static"), Class(function Assets() {
        function parseResolution(path) {
            if (!window.ASSETS || !ASSETS.RES) return path;
            var res = ASSETS.RES[path],
                ratio = Math.min(Device.pixelRatio, 3);
            if (!res) return path;
            if (!res["x" + ratio]) return path;
            var split = path.split("/"),
                file = split[split.length - 1];
            return split = file.split("."), path.replace(file, split[0] + "-" + ratio + "x." + split[1])
        }

        function AssetList(arr) {
            return arr.__proto__ = AssetList.prototype, arr
        }
        const _this = this;
        this.__loaded = [], this.CDN = "", this.CORS = null, this.IMAGES = {}, this.SDF = {}, this.JSON = {
            push: function (prop, value) {
                this[prop] = value, Object.defineProperty(this, prop, {
                    get: () => JSON.parse(JSON.stringify(value))
                })
            }
        }, Object.defineProperty(this.JSON, "push", {
            enumerable: !1,
            writable: !0
        }), this.SVG = {}, AssetList.prototype = new Array, AssetList.prototype.filter = function (items) {
            for (let i = this.length - 1; i >= 0; i--) this[i].includes(items) || this.splice(i, 1);
            return this
        }, AssetList.prototype.exclude = function (items) {
            for (let i = this.length - 1; i >= 0; i--) this[i].includes(items) && this.splice(i, 1);
            return this
        }, AssetList.prototype.prepend = function (prefix) {
            for (let i = this.length - 1; i >= 0; i--) this[i] = prefix + this[i];
            return this
        }, AssetList.prototype.append = function (suffix) {
            for (let i = this.length - 1; i >= 0; i--) this[i] = this[i] + suffix;
            return this
        }, this.list = function () {
            return window.ASSETS || console.warn("ASSETS list not available"), new AssetList(window.ASSETS.slice(0) || [])
        }, this.getPath = function (path) {
            return ~path.indexOf("//") ? path : (path = parseResolution(path), this.CDN && !~path.indexOf(this.CDN) && (path = this.CDN + path), path)
        }, this.loadImage = function (path, isStore) {
            var img = new Image;
            return img.crossOrigin = this.CORS, img.src = _this.getPath(path), img.loadPromise = function () {
                let promise = Promise.create();
                return img.onload = promise.resolve, promise
            }, isStore && (this.IMAGES[path] = img), img
        }, this.decodeImage = function (path) {
            let promise = Promise.create();
            if (window.createImageBitmap && Device.system.browser.includes(["chrome"])) {
                let img = _this.loadImage(path);
                img.onload = function () {
                    createImageBitmap(img, {
                        imageOrientation: "flipY"
                    }).then(imgBmp => {
                        promise.resolve(imgBmp)
                    })
                }
            } else {
                let img = _this.loadImage(path);
                img.onload = (() => promise.resolve(img))
            }
            return promise
        }
    }, "static"), Class(function AssetLoader(_assets, _callback, ASSETS = Assets) {
        function init() {
            if (!_assets.length) return complete();
            for (let i = 0; i < AssetLoader.SPLIT; i++) _assets.length && loadAsset()
        }

        function loadAsset() {
            function loaded() {
                timeout && clearTimeout(timeout), increment(), _assets.length && loadAsset()
            }
            let path = _assets.splice(_assets.length - 1, 1)[0];
            const name = path.split("assets/").last().split(".")[0],
                ext = path.split(".").last().split("?")[0].toLowerCase();
            let timeout = Timer.create(timedOut, AssetLoader.TIMEOUT, path);
            if (~Assets.__loaded.indexOf(path)) return loaded();
            if (ext.includes(["jpg", "jpeg", "png", "gif"])) {
                let image = ASSETS.loadImage(path);
                return image.complete ? loaded() : (image.onload = loaded, void(image.onerror = loaded))
            }
            if (window.AURA && window.AURA.import && "js" == ext) return AURA.import(path), void loaded();
            get(Assets.getPath(path), Assets.HEADERS).then(data => {
                Assets.__loaded.push(path), "json" == ext && ASSETS.JSON.push(name, data), "svg" == ext && (ASSETS.SVG[name] = data), "fnt" == ext && (ASSETS.SDF[name.split("/")[1]] = data), "js" == ext && window.eval(data), ext.includes(["fs", "vs", "glsl"]) && window.Shaders && Shaders.parse(data, path), loaded()
            }).catch(e => {
                console.warn(e), loaded()
            })
        }

        function increment() {
            _this.events.fire(Events.PROGRESS, {
                percent: ++_loaded / _total
            }), _loaded == _total && defer(complete)
        }

        function complete() {
            defer(() => {
                _callback && _callback(), _this.events.fire(Events.COMPLETE)
            })
        }

        function timedOut(path) {
            console.warn("Asset timed out", path)
        }
        Inherit(this, Events);
        const _this = this;
        let _total = _assets.length,
            _loaded = 0;
        ! function () {
            if (!Array.isArray(_assets)) throw "AssetLoader requires array of assets to load";
            _assets = _assets.slice(0).reverse(), init()
        }(), this.add = function (num) {
            _total += num || 1
        }, this.trigger = function (num) {
            for (let i = 0; i < (num || 1); i++) increment()
        }
    }, () => {
        AssetLoader.SPLIT = 2, AssetLoader.TIMEOUT = 5e3, AssetLoader.loadAllAssets = function (callback) {
            let promise = Promise.create();
            return callback || (callback = promise.resolve), promise.loader = new AssetLoader(Assets.list(), () => {
                callback && callback(), promise.loader && promise.loader.destroy && (promise.loader = promise.loader.destroy())
            }), promise
        }, AssetLoader.loadAssets = function (list, callback) {
            let promise = Promise.create();
            return callback || (callback = promise.resolve), promise.loader = new AssetLoader(list, () => {
                callback && callback(), promise.loader && promise.loader.destroy && (promise.loader = promise.loader.destroy())
            }), promise
        }, AssetLoader.waitForLib = function (name, callback) {
            function check() {
                window[name] && (Render.stop(check), callback && callback())
            }
            let promise = Promise.create();
            return callback || (callback = promise.resolve), Render.start(check), promise
        }
    }), Class(function Mobile() {
        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize), Device.mobile.native || window.addEventListener("touchstart", preventNativeScroll, {
                passive: !1
            })
        }

        function preventNativeScroll(e) {
            if (_this.isAllowNativeScroll) return;
            let target = e.target;
            if ("INPUT" == target.nodeName || "TEXTAREA" == target.nodeName || "SELECT" == target.nodeName || "A" == target.nodeName) return;
            let prevent = !0;
            for (; target.parentNode && prevent;) target._scrollParent && (prevent = !1), target = target.parentNode;
            prevent && e.preventDefault()
        }

        function resize() {
            updateOrientation(), checkResizeRefresh(), _this.isAllowNativeScroll || (document.body.scrollTop = 0)
        }

        function updateOrientation() {
            _this.orientation = Stage.width > Stage.height ? "landscape" : "portrait", _this.orientationSet && (window.Fullscreen.isOpen || Device.mobile.pwa) && window.screen && window.screen.orientation.lock && window.screen.orientation.lock(_this.orientationSet)
        }
        Inherit(this, Component), Namespace(this);
        const _this = this;
        Hydra.ready(() => {
            Device.mobile && (addHandlers(), "safari" != Device.system.browser || Device.mobile.native || (__body.css({
                height: "100%"
            }).div.scrollTop = 0))
        });
        const checkResizeRefresh = function () {
            let _lastWidth;
            return function () {
                _this.isPreventResizeReload || _lastWidth != Stage.width && (_lastWidth = Stage.width, ("ios" === Device.system.os || "android" == Device.system.os && Device.system.version >= 7) && (!Device.mobile.tablet || Math.max(Stage.width, Stage.height) > 800 || window.location.reload()))
            }
        }();
        this.vibrate = function (duration) {
            navigator.vibrate && navigator.vibrate(duration)
        }, this.fullscreen = function () {
            if (Device.mobile && !Device.mobile.native && !Device.mobile.pwa && !Dev.emulator) {
                if (!window.Fullscreen) throw "Mobile.fullscreen requires Fullscreen module";
                "android" === Device.system.os && (__window.bind("touchend", () => {
                    Fullscreen.open()
                }), _this.ScreenLock && _this.ScreenLock.isActive && window.onresize())
            }
        }, this.setOrientation = function (orientation, isForce) {
            if (_this.System && _this.NativeCore.active) return _this.System.orientation = _this.System[orientation.toUpperCase()];
            if (_this.orientationSet = orientation, updateOrientation(), isForce) {
                if (!_this.ScreenLock) throw "Mobile.setOrientation isForce argument requires ScreenLock module";
                "any" === orientation ? _this.ScreenLock.unlock() : _this.ScreenLock.lock()
            }
        }, this.allowNativeScroll = function () {
            _this.isAllowNativeScroll = !0
        }, this.preventResizeReload = function () {
            _this.isPreventResizeReload = !0
        }, this._addOverflowScroll = function ($obj) {
            $obj.div._scrollParent = !0, Device.mobile.native || ($obj.div._preventEvent = function (e) {
                e.stopPropagation()
            }, $obj.bind("touchmove", $obj.div._preventEvent))
        }, this._removeOverflowScroll = function ($obj) {
            $obj.unbind("touchmove", $obj.div._preventEvent)
        }, this.get("phone", () => {
            throw "Mobile.phone is removed. Use Device.mobile.phone"
        }), this.get("tablet", () => {
            throw "Mobile.tablet is removed. Use Device.mobile.tablet"
        }), this.get("os", () => {
            throw "Mobile.os is removed. Use Device.system.os"
        })
    }, "Static"), Class(function Dev() {
        function catchErrors() {
            window.onerror = function (message, file, line) {
                var string = message + " ::: " + file + " : " + line;
                _alert && alert(string), _post && post(_post + "/api/data/debug", getDebugInfo(string)), _this.onError && _this.onError(message, file, line)
            }
        }

        function getDebugInfo(string) {
            var obj = {};
            return obj.time = (new Date).toString(), obj.deviceId = _id, obj.err = string, obj.ua = Device.agent, obj.width = Stage.width, obj.height = Stage.height, obj.screenWidth = screen.width, obj.screenHeight = screen.height, obj
        }
        var _post, _alert, _inter, _timerName, _this = this,
            _id = Utils.timestamp();
        this.emulator = Device.mobile && navigator.platform && navigator.platform.toLowerCase().includes(["mac", "windows"]), this.alertErrors = function (url) {
            _alert = !0, "string" == typeof url && (url = [url]);
            for (var i = 0; i < url.length; i++)
                if (location.href.includes(url[i]) || location.hash.includes(url[i])) return catchErrors()
        }, this.postErrors = function (url, post) {
            _post = post, "string" == typeof url && (url = [url]);
            for (var i = 0; i < url.length; i++)
                if (location.href.includes(url[i])) return catchErrors()
        }, this.expose = function (name, val, force) {
            (Hydra.LOCAL || force) && (window[name] = val)
        }, this.logServer = function (msg) {
            _post && post(_post + "/api/data/debug", getDebugInfo(msg))
        }, this.unsupported = function (needsAlert) {
            needsAlert && alert("Hi! This build is not yet ready for this device, things may not work as expected. Refer to build schedule for when this device will be supported.")
        }, this.checkForLeaks = function (flag, array) {
            var matchArray = function (prop) {
                if (!array) return !1;
                for (var i = 0; i < array.length; i++)
                    if (prop.includes(array[i])) return !0;
                return !1
            };
            clearInterval(_inter), flag && (_inter = setInterval(function () {
                for (var prop in window)
                    if (!prop.includes("webkit") && "function" != typeof window[prop] && prop.length > 2) {
                        if (prop.includes("_ga") || prop.includes("_typeface_js") || matchArray(prop)) continue;
                        var char1 = prop.charAt(0),
                            char2 = prop.charAt(1);
                        if (("_" == char1 || "$" == char1) && char2 !== char2.toUpperCase()) throw console.log(window[prop]), "Hydra Warning:: " + prop + " leaking into global scope"
                    }
            }, 1e3))
        }, this.startTimer = function (name) {
            _timerName = name || "Timer", console.time && !window._NODE_ ? console.time(_timerName) : _timer = performance.now()
        }, this.stopTimer = function () {
            console.time && !window._NODE_ ? console.timeEnd(_timerName) : console.log("Render " + _timerName + ": " + (performance.now() - _timer))
        }, this.writeFile = function (file, data) {
            if (!Hydra.LOCAL) return;
            let url = location.protocol + "//" + location.hostname + ":8017" + location.pathname + file;
            post(url, data).then(e => {
                "OK" != e && console.warn(`Unable to write to ${file}`)
            })
        }, Hydra.LOCAL && _this.checkForLeaks(!0)
    }, "Static"), Class(function Service() {
        function initWorker() {
            _this.active = !0, navigator.serviceWorker.register("sw.js").then(handleRegistration).then(handleReady).then(handleError)
        }

        function checkCache() {
            Storage.get("service_cache") != window._CACHE_ && _this.post("clearCache")
        }

        function getSWAssets() {
            if (!window.ASSETS.SW || _this.cached) return [];
            var assets = window.ASSETS.SW;
            return assets.forEach((asset, i) => {
                asset.includes(".js") && (asset = assets[i].replace(".js", ".js?" + window._CACHE_))
            }), assets
        }

        function handleRegistration(e) {}

        function handleReady(e) {
            _this.ready = !0, _this.events.fire(Events.READY, e, !0), _sw = navigator.serviceWorker.controller, checkCache()
        }

        function handleError(e) {
            e && (_this.events.fire(Events.ERROR, e, !0), _this.active = !1)
        }

        function handleMessage(e) {
            var data = e.data;
            data.evt && _this.events.fire(data.evt, data)
        }
        Inherit(this, Component);
        var _sw, _this = this;
        this.active = !1, this.ready = !1, this.cached = !1, this.offline = !1, this.disabled = !1, Hydra.ready(() => {
            !("serviceWorker" in navigator) || Hydra.LOCAL && "" == location.port || window.process || _this.disabled || initWorker()
        }), this.cache = function (assets = []) {
            assets = Array.from(assets);
            _this.active && _this.wait(_this, "ready", function () {
                _this.post("upload", {
                    assets: assets,
                    cdn: Assets.CDN,
                    hostname: location.hostname,
                    sw: getSWAssets(),
                    offline: _this.offline
                }), Storage.set("service_cache", window._CACHE_), _this.cached = !0
            })
        }, this.post = function (fn, data = {}) {
            if (!_this.active) return;
            _this.wait(_this, "ready", function () {
                let mc = new MessageChannel;
                mc.port1.onmessage = handleMessage, data.fn = fn, _sw && _sw.postMessage(data, [mc.port2])
            })
        }
    }, "static"), Class(function Storage() {
        function testStorage() {
            try {
                if (window.localStorage) try {
                    window.localStorage.test = 1, window.localStorage.removeItem("test"), _storage = !0
                } catch (e) {
                    _storage = !1
                } else _storage = !1
            } catch (e) {
                _storage = !1
            }
        }

        function cookie(key, value, expires) {
            var options;
            if (arguments.length > 1 && (null === value || "object" != typeof value)) {
                if (options = {}, options.path = "/", options.expires = expires || 1, null === value && (options.expires = -1), "number" == typeof options.expires) {
                    var days = options.expires,
                        t = options.expires = new Date;
                    t.setDate(t.getDate() + days)
                }
                return document.cookie = [encodeURIComponent(key), "=", options.raw ? String(value) : encodeURIComponent(String(value)), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("")
            }
            var result, decode = (options = value || {}).raw ? function (s) {
                return s
            } : decodeURIComponent;
            return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null
        }
        var _storage;
        testStorage(), this.setCookie = function (key, value, expires) {
            cookie(key, value, expires)
        }, this.getCookie = function (key) {
            return cookie(key)
        }, this.set = function (key, value) {
            null != value && "object" == typeof value && (value = JSON.stringify(value)), _storage ? null === value ? window.localStorage.removeItem(key) : window.localStorage[key] = value : cookie(key, value, 365)
        }, this.get = function (key) {
            var val;
            if (val = _storage ? window.localStorage[key] : cookie(key)) {
                var char0;
                val.charAt && (char0 = val.charAt(0)), "{" != char0 && "[" != char0 || (val = JSON.parse(val)), "true" != val && "false" != val || (val = "true" == val)
            }
            return val
        }
    }, "Static"), Class(function Thread(_class) {
        function init() {
            let file = window._ES5_ ? "assets/js/hydra/hydra-thread-es5.js" : "assets/js/hydra/hydra-thread.js";
            _callbacks = {}, _worker = new Worker(Thread.PATH + file)
        }

        function importClasses() {
            importClass(Utils), importClass(Component), importClass(Events), importClass(_class, !0)
        }

        function importClass(_class, scoped) {
            if (_class) {
                var code;
                if (scoped) {
                    code = (code = _class.toString().replace("{", "!!!")).split("!!!")[1];
                    for (var splitChar = window._MINIFIED_ ? "=" : " "; code.includes("this");) {
                        var name = code.slice(code.indexOf("this.")).split("this.")[1].split(splitChar)[0];
                        code = code.replace("this", "self"), createMethod(name)
                    }
                    code = code.slice(0, -1)
                } else if ("function" != typeof _class) {
                    if ((code = _class.constructor.toString()).includes("[native")) return;
                    code = (_class.constructor._namespace ? _class.constructor._namespace + "." : "") + "Class(" + code + ', "static");'
                } else code = (_class._namespace ? _class._namespace + "." : "") + "Class(" + _class.toString() + ");";
                _worker.postMessage({
                    code: code
                })
            }
        }

        function createMethod(name) {
            _this[name] = function (message = {}, callback) {
                let promise;
                return callback || (callback = (promise = Promise.create()).resolve), _this.send(name, message, callback), promise
            }
        }

        function addListeners() {
            _worker.addEventListener("message", workerMessage)
        }

        function workerMessage(e) {
            if (e.data.console) console.log(e.data.message);
            else if (e.data.id)(callback = _callbacks[e.data.id]) && callback(e.data.message), delete _callbacks[e.data.id];
            else if (e.data.emit)(callback = _callbacks[e.data.evt]) && callback(e.data.msg);
            else {
                var callback = _callbacks.transfer;
                callback && callback(e.data)
            }
        }
        Inherit(this, Component);
        var _worker, _callbacks, _this = this,
            _msg = {};
        init(), importClasses(), addListeners(), this.on = function (evt, callback) {
            _callbacks[evt] = callback
        }, this.off = function (evt) {
            delete _callbacks[evt]
        }, this.loadFunction = function () {
            for (var i = 0; i < arguments.length; i++)(code => {
                var split = (code = (code = code.toString()).replace("(", "!!!")).split("!!!"),
                    name = split[0].split(" ")[1];
                code = "self." + name + " = function(" + split[1], _worker.postMessage({
                    code: code
                }), createMethod(name)
            })(arguments[i])
        }, this.importScript = function (path) {
            _worker.postMessage({
                path: Thread.absolutePath(path),
                importScript: !0
            })
        }, this.importClass = function () {
            for (var i = 0; i < arguments.length; i++) importClass(arguments[i])
        }, this.send = function (name, message, callback) {
            if ("string" == typeof name) {
                (message = message || {}).fn = name
            } else callback = message, message = name;
            var id = Utils.timestamp();
            callback && (_callbacks[id] = callback), message.transfer ? (message.msg.id = id, message.msg.fn = message.fn, message.msg.transfer = !0, _worker.postMessage(message.msg, message.buffer)) : (_msg.message = message, _msg.id = id, _worker.postMessage(_msg))
        }, this.destroy = function () {
            if (_worker.terminate && _worker.terminate(), this._destroy) return this._destroy()
        }
    }, () => {
        Thread.PATH = "", Thread.absolutePath = function (path) {
            if (window.AURA) return path;
            let base;
            try {
                if (document.getElementsByTagName("base").length > 0) {
                    var a = document.createElement("a");
                    a.href = document.getElementsByTagName("base")[0].href, base = a.pathname
                }
            } catch (e) {}
            let pathname = base || location.pathname;
            pathname.includes("/index.html") && (pathname = pathname.replace("/index.html", ""));
            let port = Number(location.port) > 1e3 ? `:${location.port}` : "";
            return path.includes("http") ? path : location.protocol + "//" + (location.hostname + port + pathname + "/" + path).replace("//", "/")
        }
    }), Class(function TweenManager() {
        function updateTweens(time) {
            for (let i = _tweens.length - 1; i >= 0; i--) {
                let tween = _tweens[i];
                tween.update ? tween.update(time) : _this._removeMathTween(tween)
            }
        }

        function stringToValues(str) {
            for (var values = str.split("(")[1].slice(0, -1).split(","), i = 0; i < values.length; i++) values[i] = parseFloat(values[i]);
            return values
        }

        function findEase(name) {
            for (var eases = _this.CubicEases, i = eases.length - 1; i > -1; i--)
                if (eases[i].name == name) return eases[i];
            return !1
        }
        Namespace(this);
        var _this = this,
            _tweens = [];
        this.CubicEases = [], Render.start(updateTweens), this._addMathTween = function (tween) {
            _tweens.push(tween)
        }, this._removeMathTween = function (tween) {
            _tweens.remove(tween)
        }, this._getEase = function (name, values) {
            var ease = findEase(name);
            return !!ease && (values ? ease.path ? ease.path.solve : ease.values : ease.curve)
        }, this._inspectEase = function (name) {
            return findEase(name)
        }, this.tween = function (object, props, time, ease, delay, complete, isManual) {
            "number" != typeof delay && (update = complete, complete = delay, delay = 0);
            const tween = new MathTween(object, props, time, ease, delay, complete, isManual);
            let usePromise = null;
            return complete && complete instanceof Promise && (usePromise = complete, complete = complete.resolve), usePromise || tween
        }, this.clearTween = function (object) {
            if (object._mathTween && object._mathTween.stop && object._mathTween.stop(), object._mathTweens) {
                for (var tweens = object._mathTweens, i = 0; i < tweens.length; i++) {
                    var tw = tweens[i];
                    tw && tw.stop && tw.stop()
                }
                object._mathTweens = null
            }
        }, this.addCustomEase = function (ease) {
            var add = !0;
            if ("object" != typeof ease || !ease.name || !ease.curve) throw "TweenManager :: addCustomEase requires {name, curve}";
            for (var i = _this.CubicEases.length - 1; i > -1; i--) ease.name == _this.CubicEases[i].name && (add = !1);
            if (add) {
                if ("m" == ease.curve.charAt(0).toLowerCase()) {
                    if (!window.EasingPath) throw "Using custom eases requires easingpath module";
                    ease.path = new EasingPath(ease.curve)
                } else ease.values = stringToValues(ease.curve);
                _this.CubicEases.push(ease)
            }
            return ease
        }, Math.interpolate = function (start, end, alpha, ease) {
            const fn = _this.Interpolation.convertEase(ease);
            return Math.mix(start, end, "function" == typeof fn ? fn(alpha) : _this.Interpolation.solve(fn, alpha))
        }, window.tween = this.tween, window.clearTween = this.clearTween
    }, "Static"), TweenManager.Class(function Interpolation() {
        function calculateBezier(aT, aA1, aA2) {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
        }

        function getTForX(aX, mX1, mX2) {
            for (var aGuessT = aX, i = 0; i < 4; i++) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);
                if (0 == currentSlope) return aGuessT;
                aGuessT -= (calculateBezier(aGuessT, mX1, mX2) - aX) / currentSlope
            }
            return aGuessT
        }

        function getSlope(aT, aA1, aA2) {
            return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1)
        }

        function A(aA1, aA2) {
            return 1 - 3 * aA2 + 3 * aA1
        }

        function B(aA1, aA2) {
            return 3 * aA2 - 6 * aA1
        }

        function C(aA1) {
            return 3 * aA1
        }
        this.convertEase = function (ease) {
            var fn = function () {
                switch (ease) {
                    case "easeInQuad":
                        return TweenManager.Interpolation.Quad.In;
                    case "easeInCubic":
                        return TweenManager.Interpolation.Cubic.In;
                    case "easeInQuart":
                        return TweenManager.Interpolation.Quart.In;
                    case "easeInQuint":
                        return TweenManager.Interpolation.Quint.In;
                    case "easeInSine":
                        return TweenManager.Interpolation.Sine.In;
                    case "easeInExpo":
                        return TweenManager.Interpolation.Expo.In;
                    case "easeInCirc":
                        return TweenManager.Interpolation.Circ.In;
                    case "easeInElastic":
                        return TweenManager.Interpolation.Elastic.In;
                    case "easeInBack":
                        return TweenManager.Interpolation.Back.In;
                    case "easeInBounce":
                        return TweenManager.Interpolation.Bounce.In;
                    case "easeOutQuad":
                        return TweenManager.Interpolation.Quad.Out;
                    case "easeOutCubic":
                        return TweenManager.Interpolation.Cubic.Out;
                    case "easeOutQuart":
                        return TweenManager.Interpolation.Quart.Out;
                    case "easeOutQuint":
                        return TweenManager.Interpolation.Quint.Out;
                    case "easeOutSine":
                        return TweenManager.Interpolation.Sine.Out;
                    case "easeOutExpo":
                        return TweenManager.Interpolation.Expo.Out;
                    case "easeOutCirc":
                        return TweenManager.Interpolation.Circ.Out;
                    case "easeOutElastic":
                        return TweenManager.Interpolation.Elastic.Out;
                    case "easeOutBack":
                        return TweenManager.Interpolation.Back.Out;
                    case "easeOutBounce":
                        return TweenManager.Interpolation.Bounce.Out;
                    case "easeInOutQuad":
                        return TweenManager.Interpolation.Quad.InOut;
                    case "easeInOutCubic":
                        return TweenManager.Interpolation.Cubic.InOut;
                    case "easeInOutQuart":
                        return TweenManager.Interpolation.Quart.InOut;
                    case "easeInOutQuint":
                        return TweenManager.Interpolation.Quint.InOut;
                    case "easeInOutSine":
                        return TweenManager.Interpolation.Sine.InOut;
                    case "easeInOutExpo":
                        return TweenManager.Interpolation.Expo.InOut;
                    case "easeInOutCirc":
                        return TweenManager.Interpolation.Circ.InOut;
                    case "easeInOutElastic":
                        return TweenManager.Interpolation.Elastic.InOut;
                    case "easeInOutBack":
                        return TweenManager.Interpolation.Back.InOut;
                    case "easeInOutBounce":
                        return TweenManager.Interpolation.Bounce.InOut;
                    case "linear":
                        return TweenManager.Interpolation.Linear.None
                }
            }();
            if (!fn) {
                var curve = TweenManager._getEase(ease, !0);
                fn = curve || TweenManager.Interpolation.Cubic.Out
            }
            return fn
        }, this.solve = function (values, elapsed) {
            return values[0] == values[1] && values[2] == values[3] ? elapsed : calculateBezier(getTForX(elapsed, values[0], values[2]), values[1], values[3])
        }, this.Linear = {
            None: function (k) {
                return k
            }
        }, this.Quad = {
            In: function (k) {
                return k * k
            },
            Out: function (k) {
                return k * (2 - k)
            },
            InOut: function (k) {
                return (k *= 2) < 1 ? .5 * k * k : -.5 * (--k * (k - 2) - 1)
            }
        }, this.Cubic = {
            In: function (k) {
                return k * k * k
            },
            Out: function (k) {
                return --k * k * k + 1
            },
            InOut: function (k) {
                return (k *= 2) < 1 ? .5 * k * k * k : .5 * ((k -= 2) * k * k + 2)
            }
        }, this.Quart = {
            In: function (k) {
                return k * k * k * k
            },
            Out: function (k) {
                return 1 - --k * k * k * k
            },
            InOut: function (k) {
                return (k *= 2) < 1 ? .5 * k * k * k * k : -.5 * ((k -= 2) * k * k * k - 2)
            }
        }, this.Quint = {
            In: function (k) {
                return k * k * k * k * k
            },
            Out: function (k) {
                return --k * k * k * k * k + 1
            },
            InOut: function (k) {
                return (k *= 2) < 1 ? .5 * k * k * k * k * k : .5 * ((k -= 2) * k * k * k * k + 2)
            }
        }, this.Sine = {
            In: function (k) {
                return 1 - Math.cos(k * Math.PI / 2)
            },
            Out: function (k) {
                return Math.sin(k * Math.PI / 2)
            },
            InOut: function (k) {
                return .5 * (1 - Math.cos(Math.PI * k))
            }
        }, this.Expo = {
            In: function (k) {
                return 0 === k ? 0 : Math.pow(1024, k - 1)
            },
            Out: function (k) {
                return 1 === k ? 1 : 1 - Math.pow(2, -10 * k)
            },
            InOut: function (k) {
                return 0 === k ? 0 : 1 === k ? 1 : (k *= 2) < 1 ? .5 * Math.pow(1024, k - 1) : .5 * (2 - Math.pow(2, -10 * (k - 1)))
            }
        }, this.Circ = {
            In: function (k) {
                return 1 - Math.sqrt(1 - k * k)
            },
            Out: function (k) {
                return Math.sqrt(1 - --k * k)
            },
            InOut: function (k) {
                return (k *= 2) < 1 ? -.5 * (Math.sqrt(1 - k * k) - 1) : .5 * (Math.sqrt(1 - (k -= 2) * k) + 1)
            }
        }, this.Elastic = {
            In: function (k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), -a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p))
            },
            Out: function (k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1)
            },
            InOut: function (k, a = 1, p = .4) {
                var s;
                return 0 === k ? 0 : 1 === k ? 1 : (!a || a < 1 ? (a = 1, s = p / 4) : s = p * Math.asin(1 / a) / (2 * Math.PI), (k *= 2) < 1 ? a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * -.5 : a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * .5 + 1)
            }
        }, this.Back = {
            In: function (k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s)
            },
            Out: function (k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1
            },
            InOut: function (k) {
                var s = 2.5949095;
                return (k *= 2) < 1 ? k * k * ((s + 1) * k - s) * .5 : .5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
            }
        }, this.Bounce = {
            In: function (k) {
                return 1 - this.Bounce.Out(1 - k)
            },
            Out: function (k) {
                return k < 1 / 2.75 ? 7.5625 * k * k : k < 2 / 2.75 ? 7.5625 * (k -= 1.5 / 2.75) * k + .75 : k < 2.5 / 2.75 ? 7.5625 * (k -= 2.25 / 2.75) * k + .9375 : 7.5625 * (k -= 2.625 / 2.75) * k + .984375
            },
            InOut: function (k) {
                return k < .5 ? .5 * this.Bounce.In(2 * k) : .5 * this.Bounce.Out(2 * k - 1) + .5
            }
        }
    }, "Static"), Class(function MathTween(_object, _props, _time, _ease, _delay, _callback, _manual) {
        function start() {
            _object.multiTween || !_object._mathTween || _manual || TweenManager.clearTween(_object), _manual || TweenManager._addMathTween(_this), _this.time = _time, _this.delay = _delay;
            let propString = getPropString();
            _object._mathTween = _this, _object.multiTween && (_object._mathTweens || (_object._mathTweens = []), _object._mathTweens.forEach(t => {
                t.props == propString && t.tween.stop()
            }), _this._tweenWrapper = {
                props: propString,
                tween: _this
            }, _object._mathTweens.push(_this._tweenWrapper)), "string" == typeof _ease && (_ease = TweenManager.Interpolation.convertEase(_ease), _easeFunction = "function" == typeof _ease), _startTime = performance.now(), _startTime += _delay, _endValues = _props, _startValues = {}, _props.spring && (_spring = _props.spring), _props.damping && (_damping = _props.damping), _this.startValues = _startValues;
            for (var prop in _endValues) "number" == typeof _object[prop] && (_startValues[prop] = _object[prop])
        }

        function getPropString() {
            let string = "";
            for (let key in _props) "number" == typeof _props[key] && (string += key + " ");
            return string
        }

        function clear() {
            if (!_object && !_props) return !1;
            _object._mathTween = null, TweenManager._removeMathTween(_this), Utils.nullObject(_this), _object._mathTweens && _object._mathTweens.remove(_this._tweenWrapper)
        }
        var _startTime, _startValues, _endValues, _easeFunction, _paused, _newEase, _spring, _damping, _update, _this = this,
            _elapsed = 0;
        defer(function () {
            if (_this.overrideValues) {
                let values = _this.overrideValues(_this, _object, _props, _time, _ease, _delay);
                values && (_props = values.props || _props, _time = values.time || _time, _ease = values.ease || _ease, _delay = values.delay || _delay)
            }
            if (_object && _props) {
                if ("number" != typeof _time) throw "MathTween Requires object, props, time, ease";
                start()
            }
        }), this.update = function (time) {
            if (_paused || time < _startTime) return;
            _elapsed = (_elapsed = (time - _startTime) / _time) > 1 ? 1 : _elapsed;
            let delta = this.interpolate(_elapsed);
            _update && _update(delta), 1 == _elapsed && (_callback && _callback(), _this.completePromise && _this.completePromise.resolve(), clear())
        }, this.pause = function () {
            _paused = !0
        }, this.resume = function () {
            _paused = !1, _startTime = performance.now() - _elapsed * _time
        }, this.stop = function () {
            return _this.stopped = !0, clear(), null
        }, this.setEase = function (ease) {
            _newEase != ease && (_newEase = ease, _ease = TweenManager.Interpolation.convertEase(ease), _easeFunction = "function" == typeof _ease)
        }, this.getValues = function () {
            return {
                start: _startValues,
                end: _endValues
            }
        }, this.interpolate = function (elapsed) {
            var delta = _easeFunction ? _ease(elapsed, _spring, _damping) : TweenManager.Interpolation.solve(_ease, elapsed);
            for (var prop in _startValues)
                if ("number" == typeof _startValues[prop] && "number" == typeof _endValues[prop]) {
                    var start = _startValues[prop],
                        end = _endValues[prop];
                    _object[prop] = start + (end - start) * delta
                } return delta
        }, this.onUpdate = function (callback) {
            return _update = callback, this
        }, this.onComplete = function (callback) {
            return _callback = callback, this
        }, this.promise = function () {
            return _this.completePromise = Promise.create(), _this.completePromise
        }
    }), Class(function TweenTimeline() {
        function calculate() {
            _tweens.sort(function (a, b) {
                const ta = a.time + a.delay;
                return b.time + b.delay - ta
            });
            const first = _tweens[0];
            _total = first.time + first.delay
        }

        function loop() {
            let time = _this.elapsed * _total;
            for (let i = _tweens.length - 1; i > -1; i--) {
                let t = _tweens[i],
                    relativeTime = time - t.delay,
                    elapsed = Math.clamp(relativeTime / t.time, 0, 1);
                t.interpolate(elapsed)
            }
            _this.events.fire(Events.UPDATE, _this, !0)
        }
        Inherit(this, Component);
        const _this = this;
        let _tween, _total = 0;
        const _tweens = [];
        this.elapsed = 0, this.get("timeRemaining", () => _total - _this.elapsed * _total), this.add = function (object, props, time, ease, delay) {
            let tween;
            return tween = object instanceof HydraObject ? new FrameTween(object, props, time, ease, delay, null, !0) : new MathTween(object, props, time, ease, delay, null, !0), _tweens.push(tween), defer(calculate), tween
        }, this.tween = function (to, time, ease, delay, callback) {
            _this.clearTween(), _tween = tween(_this, {
                elapsed: to
            }, time, ease, delay).onUpdate(loop).onComplete(callback)
        }, this.clearTween = function () {
            _tween && _tween.stop && _tween.stop()
        }, this.startRender = function () {
            Render.start(loop)
        }, this.stopRender = function () {
            Render.stop(loop)
        }, this.update = function () {
            loop()
        }, this.destroy = function () {
            _this.clearTween(), Render.stop(loop);
            for (var i = 0; i < _tweens.length; i++) _tweens[i].stop()
        }
    }), Class(function PushState(_isHash) {
        function addHandlers() {
            if (_isHash) return window.addEventListener("hashchange", () => handleStateChange(getState()), !1);
            window.onpopstate = history.onpushstate = (() => handleStateChange(getState()))
        }

        function getState() {
            return _isHash ? String(window.location.hash.slice(3)) : ("/" !== _root ? location.pathname.split(_root)[1] : location.pathname.slice(1)) || ""
        }

        function handleStateChange(state) {
            if (state !== _store)
                if (_this.isLocked) {
                    if (!_store) return;
                    _isHash ? window.location.hash = "!/" + _store : window.history.pushState(null, null, _root + _store)
                } else _store = state, _this.events.fire(Events.UPDATE, {
                    value: state,
                    split: state.split("/")
                })
        }
        const _this = this;
        let _store, _root = "";
        "boolean" != typeof _isHash && (_isHash = Hydra.LOCAL || !Device.system.pushstate), this.isLocked = !1, addHandlers(), _store = getState(), this.getState = function () {
            return Device.mobile.native ? Storage.get("app_state") || "" : getState()
        }, this.setRoot = function (root) {
            _root = "/" === root.charAt(0) ? root : "/" + root
        }, this.setState = function (state) {
            if (Device.mobile.native && Storage.set("app_state", state), state !== _store) return _store = state, _isHash ? window.location.hash = "!/" + state : window.history.pushState(null, null, _root + state), !0
        }, this.replaceState = function (state) {
            state !== _store && (_store = state, _isHash ? window.location.hash = "!/" + state : window.history.replaceState(null, null, _root + state))
        }, this.setTitle = function (title) {
            document.title = title
        }, this.lock = function () {
            this.isLocked = !0
        }, this.unlock = function () {
            this.isLocked = !1
        }, this.useHash = function () {
            _isHash = !0
        }
    }), Class(function Data() {
        function addListeners() {
            _this.events.sub(_this, Events.UPDATE, stateChange)
        }

        function stateChange(e) {
            _this.events.fire(ATEvents.EXTERNAL_STATE, e)
        }
        Inherit(this, Model), Inherit(this, PushState);
        const _this = this;
        !async function () {
            addListeners(), Hydra.lOCAL || _this.setRoot("/"), await Hydra.ready(), _this.Work = new _this.Content("work"), _this.Lab = new _this.Content("lab"), await _this.loadData(Config.DATA), _this.dataReady = !0
        }(), this.setState = function (state) {
            if (!Global.PLAYGROUND && !Tests.preventHistory()) this._setState(state)
        }, this.currentState = function () {
            let state = this.getState();
            return state.includes(["home", "work", "lab", "about"]) ? state : "home"
        }, this.setNav = function (state) {
            this._setState(state), stateChange({
                value: state,
                split: [state]
            })
        }, this.setTitle = function (title) {
            Global.PLAYGROUND || this._setTitle(title)
        }, this.readyLoadThumbs = function () {
            return _this.wait(_this, "readyToLoadThumbs")
        }
    }, "static"), window.ASSETS = ["assets/images/about/mask.png", "assets/images/about/tex_bricks_bump.jpg", "assets/images/about/tex_bricks_normal.jpg", "assets/images/about/text-mobile.jpg", "assets/images/about/text.jpg", "assets/images/alley/bump.jpg", "assets/images/alley/cloud.jpg", "assets/images/alley/glow.jpg", "assets/images/alley/ibl.jpg", "assets/images/alley/logo-hold.jpg", "assets/images/alley/logo.jpg", "assets/images/alley/matcap.jpg", "assets/images/alley/normal.jpg", "assets/images/alley/normal2.jpg", "assets/images/alley/rgb_texture.jpg", "assets/images/alley/water-normals.jpg", "assets/images/alley/workbutton.png", "assets/images/common/dot.png", "assets/images/fallback/logo.png", "assets/images/ui/arrow-white.png", "assets/images/ui/arrow.png", "assets/images/ui/at-logo.png", "assets/images/ui/fb.png", "assets/images/ui/tw.png", "assets/images/work/awards/awwwards.png", "assets/images/work/awards/cssdesign.png", "assets/images/work/awards/fwa.png", "assets/images/work/hologram.jpg", "assets/js/lib/three.min.js", "assets/geometry/sections/0/combined.json", "assets/geometry/sections/0/curves.json", "assets/geometry/sections/0/geometry.json", "assets/geometry/sections/1/combined.json", "assets/geometry/sections/1/curves.json", "assets/geometry/sections/1/geometry.json", "assets/geometry/sections/2/combined.json", "assets/geometry/sections/2/curves.json", "assets/geometry/sections/2/geometry.json", "assets/geometry/sections/3/combined.json", "assets/geometry/sections/3/curves.json", "assets/geometry/sections/3/geometry.json", "assets/geometry/sections/4/combined.json", "assets/geometry/sections/4/curves.json", "assets/geometry/sections/4/geometry.json", "assets/geometry/sections/5/combined.json", "assets/geometry/sections/5/curves.json", "assets/geometry/sections/5/geometry.json", "assets/data/uil.json", "assets/data/video-lab.json", "assets/data/video-work.json", "assets/shaders/compiled.vs"], ASSETS.SW = ["assets/fonts/muncie-webfont.woff", "assets/fonts/muncie-webfont.woff2", "assets/fonts/nexa_bold-webfont.woff", "assets/fonts/nexa_bold-webfont.woff2", "assets/fonts/nexa_light-webfont.woff", "assets/fonts/nexa_light-webfont.woff2", "assets/fonts/stylesheet.css", "assets/css/style.css", "assets/js/app.js"], Class(function Config() {
        this.DATA = window._DATA_ ? window._DATA_ : "assets/publish/data.json", this.CDN = window._CDN_ ? window._CDN_ : "", this.WORK_AUTO_SELECT = !1, this.UI_OFFSET = Device.mobile.phone ? 30 : 50
    }, "static"), Class(function ATEvents() {
        this.INTERNAL_STATE = "internal_state", this.EXTERNAL_STATE = "external_state", this.LIST_ITEM_HOVER = "list_item_hover", this.LIST_ITEM_CLICK = "list_item_click", this.LIST_ITEM_EXIT = "list_item_exit", this.HOME_BUTTON_HOVER = "home_button_hover"
    }, "static"), Mobile.Class(function Accelerometer() {
        function updateAccel(e) {
            switch (window.orientation) {
                case 0:
                    _this.x = -e.accelerationIncludingGravity.x, _this.y = e.accelerationIncludingGravity.y, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = e.rotationRate.beta * _this.toRadians, _this.rotationRate.beta = -e.rotationRate.alpha * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians);
                    break;
                case 180:
                    _this.x = e.accelerationIncludingGravity.x, _this.y = -e.accelerationIncludingGravity.y, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = -e.rotationRate.beta * _this.toRadians, _this.rotationRate.beta = e.rotationRate.alpha * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians);
                    break;
                case 90:
                    _this.x = e.accelerationIncludingGravity.y, _this.y = e.accelerationIncludingGravity.x, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = e.rotationRate.alpha * _this.toRadians, _this.rotationRate.beta = e.rotationRate.beta * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians);
                    break;
                case -90:
                    _this.x = -e.accelerationIncludingGravity.y, _this.y = -e.accelerationIncludingGravity.x, _this.z = e.accelerationIncludingGravity.z, e.rotationRate && (_this.rotationRate.alpha = -e.rotationRate.alpha * _this.toRadians, _this.rotationRate.beta = -e.rotationRate.beta * _this.toRadians, _this.rotationRate.gamma = e.rotationRate.gamma * _this.toRadians)
            }
            "android" == Device.system.os && (_this.x *= -1, _this.y *= -1, _this.z *= -1)
        }

        function updateOrientation(e) {
            for (var key in e) key.toLowerCase().includes("heading") && (_this.heading = e[key]);
            switch (window.orientation) {
                case 0:
                    _this.alpha = e.beta * _this.toRadians, _this.beta = -e.alpha * _this.toRadians, _this.gamma = e.gamma * _this.toRadians;
                    break;
                case 180:
                    _this.alpha = -e.beta * _this.toRadians, _this.beta = e.alpha * _this.toRadians, _this.gamma = e.gamma * _this.toRadians;
                    break;
                case 90:
                    _this.alpha = e.alpha * _this.toRadians, _this.beta = e.beta * _this.toRadians, _this.gamma = e.gamma * _this.toRadians;
                    break;
                case -90:
                    _this.alpha = -e.alpha * _this.toRadians, _this.beta = -e.beta * _this.toRadians, _this.gamma = e.gamma * _this.toRadians
            }
            _this.tilt = e.beta * _this.toRadians, _this.yaw = e.alpha * _this.toRadians, _this.roll = -e.gamma * _this.toRadians, "android" == Device.system.os && (_this.heading = compassHeading(e.alpha, e.beta, e.gamma))
        }

        function compassHeading(alpha, beta, gamma) {
            var degtorad = Math.PI / 180,
                _x = beta ? beta * degtorad : 0,
                _y = gamma ? gamma * degtorad : 0,
                _z = alpha ? alpha * degtorad : 0,
                cY = (Math.cos(_x), Math.cos(_y)),
                cZ = Math.cos(_z),
                sX = Math.sin(_x),
                sY = Math.sin(_y),
                sZ = Math.sin(_z),
                Vx = -cZ * sY - sZ * sX * cY,
                Vy = -sZ * sY + cZ * sX * cY,
                compassHeading = Math.atan(Vx / Vy);
            return Vy < 0 ? compassHeading += Math.PI : Vx < 0 && (compassHeading += 2 * Math.PI), compassHeading * (180 / Math.PI)
        }
        var _this = this;
        this.x = 0, this.y = 0, this.z = 0, this.alpha = 0, this.beta = 0, this.gamma = 0, this.heading = 0, this.rotationRate = {}, this.rotationRate.alpha = 0, this.rotationRate.beta = 0, this.rotationRate.gamma = 0, this.toRadians = "ios" == Device.system.os ? Math.PI / 180 : 1, this.capture = function () {
            this.active || (this.active = !0, window.ondevicemotion = updateAccel, window.addEventListener("deviceorientation", updateOrientation))
        }, this.stop = function () {
            this.active = !1, window.ondevicemotion = null, _this.x = _this.y = _this.z = 0, window.removeEventListener("deviceorientation", updateOrientation)
        }
    }, "Static"), Class(function Canvas(_width, _height, _retina) {
        function resize(w, h, retina) {
            var ratio = retina && Device.system.retina ? 2 : 1;
            _this.div && (_this.div.width = w * ratio, _this.div.height = h * ratio), _this.width = w, _this.height = h, _this.scale = ratio, _this.element && _this.element.size(_this.width, _this.height), Device.system.retina && retina && (_this.context.scale(ratio, ratio), _this.div.style.width = w + "px", _this.div.style.height = h + "px")
        }
        Inherit(this, Component);
        var _imgData, _this = this;
        this.children = [], this.offset = {
            x: 0,
            y: 0
        }, this.retina = _retina, _this.div = document.createElement("canvas"), _this.context = _this.div.getContext("2d"), _this.element = $(_this.div), _this.width = _width, _this.height = _height, _this.context._matrix = new Matrix2, resize(_width, _height, _retina), this.toDataURL = function (type, quality) {
            return _this.div.toDataURL(type, quality)
        }, this.sort = function () {
            _objects.sort(function (a, b) {
                return a.z - b.z
            })
        }, this.render = function (noClear) {
            "boolean" == typeof noClear && noClear || _this.clear();
            for (var len = _this.children.length, i = 0; i < len; i++) _this.children[i].render();
            this._rendered = Render.TIME
        }, this.clear = function () {
            _this.context.clearRect(0, 0, _this.div.width, _this.div.height)
        }, this.add = function (display) {
            display.setCanvas(this), display._parent = this, this.children.push(display), display._z = this.children.length
        }, this.remove = function (display) {
            if (display) {
                display._canvas = null, display._parent = null;
                var i = this.children.indexOf(display);
                i > -1 && this.children.splice(i, 1)
            }
        }, this.destroy = function () {
            this.stopRender();
            for (var i = 0; i < this.children.length; i++) this.children[i].destroy && this.children[i].destroy();
            return this._destroy && this._destroy()
        }, this.startRender = function () {
            Render.start(_this.render)
        }, this.stopRender = function () {
            Render.stop(_this.render)
        }, this.getImageData = function (x, y, w, h) {
            return this.imageData = this.context.getImageData(x || 0, y || 0, w || this.width, h || this.height), this.imageData
        }, this.getPixel = function (x, y, dirty) {
            this.imageData && !dirty || _this.getImageData(0, 0, _this.width, _this.height), _imgData || (_imgData = {});
            var index = 4 * (x + y * _this.width),
                pixels = this.imageData.data;
            return _imgData.r = pixels[index], _imgData.g = pixels[index + 1], _imgData.b = pixels[index + 2], _imgData.a = pixels[index + 3], _imgData
        }, this.texture = function (src) {
            var img = new Image;
            return img.src = src, img
        }, this.size = resize
    }), Class(function Matrix2() {
        function identity(d) {
            (d = d || _this.data)[0] = 1, d[1] = 0, d[2] = 0, d[3] = 0, d[4] = 1, d[5] = 0, d[6] = 0, d[7] = 0, d[8] = 1
        }

        function noE(n) {
            return n = Math.abs(n) < 1e-6 ? 0 : n
        }
        var a11, a12, a13, a21, a22, a23, a31, a32, a33, b11, b12, b13, b21, b22, b23, b31, b32, b33, _this = this,
            prototype = Matrix2.prototype;
        this.type = "matrix2", this.data = new Float32Array(9), identity(), void 0 === prototype.identity && (prototype.identity = function (d) {
            return identity(d), this
        }, prototype.transformVector = function (v) {
            var d = this.data,
                x = v.x,
                y = v.y;
            return v.x = d[0] * x + d[1] * y + d[2], v.y = d[3] * x + d[4] * y + d[5], v
        }, prototype.setTranslation = function (tx, ty, m) {
            var d = m || this.data;
            return d[0] = 1, d[1] = 0, d[2] = tx, d[3] = 0, d[4] = 1, d[5] = ty, d[6] = 0, d[7] = 0, d[8] = 1, this
        }, prototype.getTranslation = function (v) {
            var d = this.data;
            return v = v || new Vector2, v.x = d[2], v.y = d[5], v
        }, prototype.setScale = function (sx, sy, m) {
            var d = m || this.data;
            return d[0] = sx, d[1] = 0, d[2] = 0, d[3] = 0, d[4] = sy, d[5] = 0, d[6] = 0, d[7] = 0, d[8] = 1, this
        }, prototype.setShear = function (sx, sy, m) {
            var d = m || this.data;
            return d[0] = 1, d[1] = sx, d[2] = 0, d[3] = sy, d[4] = 1, d[5] = 0, d[6] = 0, d[7] = 0, d[8] = 1, this
        }, prototype.setRotation = function (a, m) {
            var d = m || this.data,
                r0 = Math.cos(a),
                r1 = Math.sin(a);
            return d[0] = r0, d[1] = -r1, d[2] = 0, d[3] = r1, d[4] = r0, d[5] = 0, d[6] = 0, d[7] = 0, d[8] = 1, this
        }, prototype.setTRS = function (tx, ty, a, sx, sy) {
            var d = this.data,
                r0 = Math.cos(a),
                r1 = Math.sin(a);
            return d[0] = r0 * sx, d[1] = -r1 * sy, d[2] = tx, d[3] = r1 * sx, d[4] = r0 * sy, d[5] = ty, d[6] = 0, d[7] = 0, d[8] = 1, this
        }, prototype.translate = function (tx, ty) {
            return this.identity(Matrix2.__TEMP__), this.setTranslation(tx, ty, Matrix2.__TEMP__), this.multiply(Matrix2.__TEMP__)
        }, prototype.rotate = function (a) {
            return this.identity(Matrix2.__TEMP__), this.setTranslation(a, Matrix2.__TEMP__), this.multiply(Matrix2.__TEMP__)
        }, prototype.scale = function (sx, sy) {
            return this.identity(Matrix2.__TEMP__), this.setScale(sx, sy, Matrix2.__TEMP__), this.multiply(Matrix2.__TEMP__)
        }, prototype.shear = function (sx, sy) {
            return this.identity(Matrix2.__TEMP__), this.setRotation(sx, sy, Matrix2.__TEMP__), this.multiply(Matrix2.__TEMP__)
        }, prototype.multiply = function (m) {
            var a = this.data,
                b = m.data || m;
            return a11 = a[0], a12 = a[1], a13 = a[2], a21 = a[3], a22 = a[4], a23 = a[5], a31 = a[6], a32 = a[7], a33 = a[8], b11 = b[0], b12 = b[1], b13 = b[2], b21 = b[3], b22 = b[4], b23 = b[5], b31 = b[6], b32 = b[7], b33 = b[8], a[0] = a11 * b11 + a12 * b21 + a13 * b31, a[1] = a11 * b12 + a12 * b22 + a13 * b32, a[2] = a11 * b13 + a12 * b23 + a13 * b33, a[3] = a21 * b11 + a22 * b21 + a23 * b31, a[4] = a21 * b12 + a22 * b22 + a23 * b32, a[5] = a21 * b13 + a22 * b23 + a23 * b33, this
        }, prototype.inverse = function (m) {
            var a = (m = m || this).data,
                b = this.data;
            a11 = a[0], a12 = a[1], a13 = a[2], a21 = a[3], a22 = a[4], a23 = a[5], a31 = a[6], a32 = a[7], a33 = a[8];
            var det = m.determinant();
            Math.abs(det);
            var invdet = 1 / det;
            return b[0] = (a22 * a33 - a32 * a23) * invdet, b[1] = (a13 * a32 - a12 * a33) * invdet, b[2] = (a12 * a23 - a13 * a22) * invdet, b[3] = (a23 * a31 - a21 * a33) * invdet, b[4] = (a11 * a33 - a13 * a31) * invdet, b[5] = (a21 * a13 - a11 * a23) * invdet, b[6] = (a21 * a32 - a31 * a22) * invdet, b[7] = (a31 * a12 - a11 * a32) * invdet, b[8] = (a11 * a22 - a21 * a12) * invdet, m
        }, prototype.determinant = function () {
            var a = this.data;
            return a11 = a[0], a12 = a[1], a13 = a[2], a21 = a[3], a22 = a[4], a23 = a[5], a31 = a[6], a32 = a[7], a33 = a[8], a11 * (a22 * a33 - a32 * a23) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 * a22 * a31)
        }, prototype.copyTo = function (m) {
            var a = this.data,
                b = m.data || m;
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], m
        }, prototype.copyFrom = function (m) {
            var a = this.data,
                b = m.data || m;
            return b[0] = a[0], b[1] = a[1], b[2] = a[2], b[3] = a[3], b[4] = a[4], b[5] = a[5], b[6] = a[6], b[7] = a[7], b[8] = a[8], this
        }, prototype.getCSS = function (force2D) {
            var d = this.data;
            return Device.tween.css3d && !force2D ? "matrix3d(" + noE(d[0]) + ", " + noE(d[3]) + ", 0, 0, " + noE(d[1]) + ", " + noE(d[4]) + ", 0, 0, 0, 0, 1, 0, " + noE(d[2]) + ", " + noE(d[5]) + ", 0, 1)" : "matrix(" + noE(d[0]) + ", " + noE(d[3]) + ", " + noE(d[1]) + ", " + noE(d[4]) + ", " + noE(d[2]) + ", " + noE(d[5]) + ")"
        })
    }, function () {
        Matrix2.__TEMP__ = (new Matrix2).data
    }), Class(function SplitTextfield() {
        function splitLetter($obj) {
            var _array = [],
                split = $obj.div.innerHTML.split("");
            $obj.div.innerHTML = "";
            for (var i = 0; i < split.length; i++) {
                " " == split[i] && (split[i] = "&nbsp;");
                var letter = $("t", "span");
                letter.html(split[i], !0).css(_style), _array.push(letter), $obj.add(letter)
            }
            return _array
        }

        function splitWord($obj) {
            var _array = [],
                text = $obj.div.innerHTML,
                split = (text = text.replace("&nbsp;", " ")).split(" ");
            $obj.empty();
            for (var i = 0; i < split.length; i++) {
                var word = $("t", "span"),
                    empty = $("t", "span");
                word.html(split[i]).css(_style), empty.html("&nbsp", !0).css(_style), _array.push(word), _array.push(empty), $obj.add(word), $obj.add(empty)
            }
            return _array
        }
        var _style = {
            padding: 0,
            margin: 0,
            position: "relative",
            float: "",
            cssFloat: "",
            styleFloat: "",
            display: "inline-block",
            width: "auto",
            height: "auto"
        };
        this.split = function ($obj, by) {
            return "word" == by ? splitWord($obj) : splitLetter($obj)
        }
    }, "Static"), Class(function ImageDecoder() {
        function spawnThreads() {
            for (var i = 0; i < _this.threads; i++) {
                var thread = _this.initClass(Thread, ImageDecoderThread);
                _threads.push(thread)
            }
        }

        function getThread() {
            var thread = _threads[_thread];
            return ++_thread >= _this.threads && (_thread = 0), thread
        }
        Inherit(this, Component);
        var _this = this,
            _threads = [],
            _thread = 0;
        this.threads = 4;
        const ACTIVE = !(!window.fetch || !window.createImageBitmap);
        this.decode = function (path, fallback) {
            let promise = Promise.create();
            return path = Thread.absolutePath(Assets.getPath(path)), ACTIVE && !fallback ? (_threads.length || spawnThreads(), getThread().decode({
                path: path
            }, function (bitmap) {
                var canvas = document.createElement("canvas");
                canvas.context = canvas.getContext("2d"), canvas.width = bitmap.width, canvas.height = bitmap.height, canvas.context.drawImage(bitmap, 0, 0), promise.resolve(canvas)
            })) : Assets.decodeImage(path).then(bitmap => {
                promise.resolve(bitmap)
            }), promise
        }
    }, "static"), Class(function ImageDecoderThread() {
        async function process() {
            var data = _queue.shift();
            if (!data) return;
            let e = await fetch(data.path);
            if (200 != e.status) throw data.path + " not found :: ImageDecoderThread";
            try {
                let blob = await e.blob(),
                    bitmap = await createImageBitmap(blob),
                    message = {
                        post: !0,
                        id: data.id,
                        message: bitmap
                    };
                self.postMessage(message, [bitmap])
            } catch (e) {
                throw data.path + " could not be decoded"
            }
            process()
        }
        Inherit(this, Component);
        var _root = location.pathname.split("/assets/js")[0] + "/",
            _queue = [];
        this.decode = function (data, id) {
            data.path.includes("http") || (data.path = _root + data.path), data.id = id, _queue.push(data), process()
        }
    }), Class(function FontLoader(_fonts, _callback) {
        function initFonts() {
            Array.isArray(_fonts) || (_fonts = [_fonts]), $element = Stage.create("FontLoader");
            for (var i = 0; i < _fonts.length; i++)($f = $element.create("font")).fontStyle(_fonts[i], 12, "#000").text("LOAD").css({
                top: -999
            });
            _baseWidth = $f.div.offsetWidth, Render.start(check, 10), _this.timer = _this.delayedCall(finish, 1e3)
        }

        function check() {
            $f.div.offsetWidth != _baseWidth && (clearTimeout(_this.timer), Render.stop(check, 10), finish())
        }

        function finish() {
            $element.remove && (Render.stop(check, 10), $element.remove(), _callback ? _callback() : _this.events.fire(Events.COMPLETE))
        }
        Inherit(this, Component);
        var $element, $f, _baseWidth, _this = this;
        initFonts()
    }, function () {
        FontLoader.loadFonts = function (fonts, callback) {
            let promise = Promise.create();
            callback || (callback = promise.resolve);
            var loader = new FontLoader(fonts, function () {
                callback && callback(), loader = null
            });
            return promise
        }
    }), Class(function Fullscreen() {
        function addHandlers() {
            ["onfullscreenchange", "onwebkitfullscreenchange", "onmozfullscreenchange", "onmsfullscreenchange", "onfullscreenerror", "onwebkitfullscreenerror", "onmozfullscreenerror", "onmsfullscreenerror"].forEach(evt => {
                void 0 !== document[evt] && (document[evt] = update)
            })
        }

        function update() {
            const isOpen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
            isOpen !== _this.isOpen && (_this.isOpen = isOpen, _this.events.fire(Events.FULLSCREEN, {
                fullscreen: _this.isOpen
            }))
        }
        Inherit(this, Events);
        const _this = this;
        this.isOpen = !1, addHandlers(), this.open = function (element) {
            if (!Device.system.fullscreen) return console.warn("Fullscreen API not supported");
            element = element || document.body, ["requestFullscreen", "webkitRequestFullscreen", "mozRequestFullScreen", "msRequestFullscreen"].every(method => {
                if (void 0 === element[method]) return !0;
                element[method]()
            })
        }, this.close = function () {
            if (!Device.system.fullscreen) return console.warn("Fullscreen API not supported");
            ["exitFullscreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"].every(method => {
                if (void 0 === document[method]) return !0;
                document[method]()
            })
        }
    }, "static"), Class(function GLUI() {
        function init() {
            _this.render2D && !_this.stage && (_this.stage = new GLUIStage), _this.render3D && !_this.stage3d && (_this.stage3d = new GLUIStage3D)
        }
        Inherit(this, Component);
        const _this = this;
        this.render2D = !0, this.render3D = !0, AssetLoader.waitForLib("THREE", init), window.$gl = function (width, height, map) {
            return new GLUIObject(width, height, map)
        }, window.$glText = function (text, fontName, fontSize, options) {
            return new GLUIText(text, fontName, fontSize, options)
        }, this.init = init
    }, "static"), Class(function GLUIElement() {
        Inherit(this, Component);
        this.group = $gl(0, 0), this.create = function (w, h, t) {
            return this.group.create(w, h, t)
        }
    }), Class(function GLUIStageInteraction2D(_camera) {
        function canTest(obj) {
            if (0 == obj.visible) return !1;
            let parent = obj.parent;
            for (; parent;) {
                if (0 == parent.visible) return !1;
                parent = parent.parent
            }
            return !0
        }

        function testObjects() {
            _test.length = 0;
            for (let i = _objects.length - 1; i > -1; i--) {
                let obj = _objects[i];
                canTest(obj) && _test.push(obj)
            }
            return _test
        }

        function addListeners() {
            _this.events.sub(Mouse.input, Interaction.MOVE, move), _this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.END, end)
        }

        function move(e = Mouse) {
            if (!window.Vec3 || GLUI.PREVENT_INTERACTION || _this.parent.preventRender) return;
            _ray || (_ray = new Raycaster(_camera));
            let hit = _ray.checkHit(testObjects(), e);
            if (hit[0]) {
                GLUI.HIT = !0;
                let obj = hit[0].object.glui;
                _over || ((_over = obj)._onOver({
                    action: "over",
                    object: obj
                }), Stage.css("cursor", "pointer")), _over != obj && (_over._onOver({
                    action: "out",
                    object: _over
                }), (_over = obj)._onOver({
                    action: "over",
                    object: obj
                }), Stage.css("cursor", "pointer"))
            } else GLUI.HIT = !1, _over && (_over._onOver({
                action: "out",
                object: _over
            }), _over = null, Stage.css("cursor", "auto"))
        }

        function start(e) {
            let element = document.elementFromPoint(Mouse.x, Mouse.y);
            if (element && "hit" == element.className) return _preventHit = !0;
            GLUI.PREVENT_INTERACTION || _this.parent.preventRender || (Device.mobile && move(e), _over && (_click = _over, _hold.copy(e), _hold.time = Date.now()))
        }

        function end(e) {
            if (_preventHit) return _preventHit = !1;
            if (!GLUI.PREVENT_INTERACTION && !_this.parent.preventRender) {
                if (_preventHit = !1, GLUI.HIT = !1, _click) {
                    if (Date.now() - _hold.time > 750 || _calc.subVectors(e, _hold).length() > 50) return _click = null;
                    _click == _over && _click._onClick({
                        action: "click",
                        object: _click
                    })
                }
                _over && (_over._onOver({
                    action: "out",
                    object: _over
                }), _over = null, Stage.css("cursor", "auto")), _click = null
            }
        }
        Inherit(this, Component);
        const _this = this;
        var _ray, _over, _click, _preventHit, _test = [],
            _objects = [],
            _hold = new THREE.Vector2,
            _calc = new THREE.Vector2;
        addListeners(), Device.mobile || Render.start(_ => move(), 10), this.add = function (obj) {
            _objects.push(obj.mesh)
        }, this.remove = function (obj) {
            _objects.remove(obj.mesh)
        }
    }), Class(function GLUIStageInteraction3D() {
        function loop() {
            if (_camera || (_camera = World.CAMERA), window.Vec3 && _camera && _input) {
                _ray || (_ray = new Raycaster(_camera));
                var hit;
                if ("2d" == _input.type ? hit = _ray.checkHit(_objects, _input.position) : (_v3.set(0, 0, -1).applyQuaternion(_input.quaternion), hit = _ray.checkFromValues(_objects, _input.position, _v3)), hit[0]) {
                    let obj = hit[0].object.glui;
                    !_over && obj && obj._onOver && ((_over = obj)._onOver({
                        action: "over",
                        object: obj
                    }), Stage.css("cursor", "pointer")), _over != obj && _over && _over._onOver && (_over._onOver({
                        action: "out",
                        object: _over
                    }), (_over = obj)._onOver({
                        action: "over",
                        object: obj
                    }), Stage.css("cursor", "pointer"))
                } else _over && _over._onOver && (_over._onOver({
                    action: "out",
                    object: _over
                }), _over = null, Stage.css("cursor", "auto"))
            }
        }

        function start() {
            _over && (_click = _over, _hold.copy(_input.position), _hold.time = Date.now())
        }

        function end() {
            if (_click) {
                if (Date.now() - _hold.time > 750) return _click = null;
                _click == _over && _click._onClick({
                    action: "click",
                    object: _click
                })
            }
            _click = null
        }
        Inherit(this, Component);
        const _this = this;
        var _ray, _camera, _over, _click, _input, _hold, _calc, _objects = [],
            _v3 = new THREE.Vector3;
        new THREE.Euler;
        _this.startRender(loop, 24), this.add = function (obj) {
            _objects.push(obj.mesh)
        }, this.remove = function (group) {
            let index = _objects.length;
            for (; index > 0;) {
                let item = _objects[index];
                group.children.length > 0 && item === group.children[0] && _objects.splice(index, 1), index--
            }
        }, this.set("input", obj => {
            (_input = {}).position = obj.position || obj, _input.quaternion = obj.quaternion, _input.type = "number" == typeof _input.position.z ? "3d" : "2d", "3d" == _input.type ? (_hold = new THREE.Vector3, _calc = new THREE.Vector3) : (_hold = new THREE.Vector2, _calc = new THREE.Vector2), obj == Mouse ? (_this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.END, end)) : (obj.startClick = start, obj.endClick = end)
        })
    }), Class(function GLUIObject(_width, _height, _map) {
        function getAlpha() {
            let alpha = _this.alpha,
                $parent = _this.parent;
            for (; $parent;) alpha *= $parent.alpha, $parent = $parent.parent;
            return alpha
        }
        Inherit(this, Component);
        const _this = this,
            prototype = GLUIObject.prototype;
        var shader = _this.initClass(Shader, "GLUIObject", {
            tMap: {
                value: "string" == typeof _map ? Utils3D.getTexture(_map) : _map
            },
            alpha: {
                type: "f",
                value: 1
            },
            transparent: !0,
            depthWrite: !1,
            depthTest: !1
        });
        this.usingMap = !!_map, this.tMap = shader.uniforms.tMap, this.group = new THREE.Group, this.alpha = 1, this.x = 0, this.y = 0, this.z = 0, this.scaleX = 1, this.scaleY = 1, this.scale = 1, this.rotation = 0, this.multiTween = !0, this.dimensions = new THREE.Vector3(_width, _height, 1), this._shader = shader, this.mesh = new THREE.Mesh(GLUIObject.getGeometry("2d"), _map ? shader.material : new THREE.MeshBasicMaterial({
            transparent: !0,
            opacity: 0
        })), this.mesh.glui = this, this.group.add(this.mesh), this.mesh.frustumCulled = !1, this.mesh.onBeforeRender = (() => {
            this.group.position.x = this.x, this.group.position.y = -this.y, this.group.position.z = this.z, 1 != this.scale && (this.group.position.x += (this.dimensions.x - this.dimensions.x * this.scale) / 2, this.group.position.y -= (this.dimensions.y - this.dimensions.y * this.scale) / 2);
            let shader = this.mesh.material.shader;
            if (this.calcMask) {
                let v = this.isMasked;
                v.copy(v.origin), _this.group.localToWorld(v), v.z = v.width, v.w = v.height
            }
            shader && shader.uniforms && shader.uniforms.alpha && (shader.uniforms.alpha.value = getAlpha()), _map ? (this.mesh.scale.set(1, 1, 1).multiply(this.dimensions), this.group.scale.x = this.scaleX * this.scale, this.group.scale.y = this.scaleY * this.scale) : this.group.scale.set(this.scaleX * this.scale, this.scaleY * this.scale, 1), this.group.rotation.z = Math.radians(this.rotation)
        }), void 0 === prototype.add && (prototype.add = function ($obj) {
            return $obj.parent = this, this.group.add($obj.group), this.isMasked && $obj.mask(this.isMasked, this.maskShader), this
        }, prototype.interact = function (over, click) {
            this._onOver = over, this._onClick = click;
            let stage = this._3d ? GLUI.stage3d : GLUI.stage;
            return over ? stage.interaction.add(this) : stage.interaction.remove(this), this
        }, prototype.remove = function () {
            this.mesh.parent ? this.group.parent.remove(this.group) : this._3d ? GLUI.stage3d.remove(this) : GLUI.stage.remove(this)
        }, prototype.create = function (width, height, map) {
            let $obj = $gl(width, height, map);
            return this.add($obj), this._3d && $obj.enable3D(), $obj
        }, prototype.removeChild = function (obj) {
            return this.group.remove(obj.group), this
        }, prototype.tween = function (obj, time, ease, delay) {
            return tween(this, obj, time, ease, delay)
        }, prototype.enable3D = function () {
            return this._3d = !0, this.mesh.geometry = GLUIObject.getGeometry("3d"), this.dimensions.x *= .005, this.dimensions.y *= .005, this.mesh.material.depthWrite = !0, this.mesh.material.depthTest = !0, this
        }, prototype.setZ = function (z) {
            return this.mesh.renderOrder = z, this
        }, prototype.show = function () {
            return this.group.visible = !0, this
        }, prototype.hide = function () {
            return this.group.visible = !1, this
        }, prototype.useShader = function (shader) {
            this.mesh.material = shader.material
        }, prototype.useGeometry = function (geom) {
            this.mesh.geometry = geom
        }, prototype.updateMap = function (src) {
            this._shader.uniforms.tMap.value = "string" == typeof src ? Utils3D.getTexture(src) : src
        }, prototype.mask = function (d, shaderName) {
            var v;
            if (d instanceof THREE.Vector4 ? (this.isMasked = !0, v = d) : ((v = new THREE.Vector4(d.x, d.y, 0, 1)).origin = (new THREE.Vector4).copy(v), v.width = d.width, v.height = d.height, this.calcMask = !0, this.isMasked = v), this.maskShader = shaderName, this.usingMap) {
                let shader = _this.initClass(Shader, shaderName || "GLUIObjectMask", {
                    tMap: this.tMap,
                    alpha: {
                        value: 1
                    },
                    mask: {
                        type: "v4",
                        value: v
                    },
                    transparent: !0,
                    depthWrite: !1,
                    depthTest: !1
                });
                this.useShader(shader)
            }
            return this.group.traverse(obj => {
                obj.glui && obj.glui != this && obj.glui.mask(v, shaderName)
            }), v
        }, prototype.clearTween = function () {
            return this._mathTweens && this._mathTweens.forEach(t => {
                t.tween.stop()
            }), this
        }, prototype.getScreenCoords = function () {
            let v3 = new Vector3;
            return this.mesh.localToWorld(v3), v3.y *= -1, v3
        })
    }, () => {
        var _geom2d, _geom3d;
        GLUIObject.getGeometry = function (type) {
            return "2d" == type ? (_geom2d || (_geom2d = new THREE.PlaneBufferGeometry(1, 1)).translate(.5, -.5, 0), _geom2d) : (_geom3d || (_geom3d = new THREE.PlaneBufferGeometry(1, 1)), _geom3d)
        }
    }), Class(function GLUIText(_text, _fontName, _fontSize, _options) {
        function getAlpha() {
            let alpha = _this.alpha,
                $parent = _this.parent;
            for (; $parent;) alpha *= $parent.alpha, $parent = $parent.parent;
            return alpha
        }
        Inherit(this, Component);
        const _this = this,
            prototype = GLUIText.prototype;
        let options = {};
        options.font = _fontName, options.text = _text, options.width = _options.width, options.image = `assets/sdf/${_fontName}.png`, options.verticalAlign = _options.verticalAlign || "top", options.lineHeight = _options.lineHeight || 2 * _fontSize, options.vs = _options.vs, options.fs = _options.fs, options.opacity = _options.opacity, options.align = _options.align || "center", options.letterSpacing = _options.letterSpacing || .2;
        let sdf = new SDFText(options);
        sdf.mesh.scale.multiplyScalar(_fontSize / 25), sdf.mesh.scale.x *= -1, this.mesh = sdf.mesh, this.group = new THREE.Group, this.alpha = 1, this.x = 0, this.y = 0, this.z = 0, this.scaleX = 1, this.scaleY = 1, this.scale = 1, this.rotation = 0, this.multiTween = !0, this.mesh.glui = this, this.group.add(this.mesh), this.mesh.frustumCulled = !1, this.mesh.onBeforeRender = (() => {
            this.group.position.x = this.x, this.group.position.y = -this.y, this.group.position.z = this.z;
            this.mesh.material.shader;
            sdf.alpha = getAlpha(), this.group.scale.set(this.scaleX * this.scale, this.scaleY * this.scale, 1), this.group.rotation.z = Math.radians(this.rotation)
        }), void 0 === prototype.add && (prototype.interact = function (over, click) {
            this._onOver = over, this._onClick = click;
            let stage = this._3d ? GLUI.stage3d : GLUI.stage;
            return over ? stage.interaction.add(this) : stage.interaction.remove(this), this
        }, prototype.remove = function () {
            this.mesh.parent ? (this.group.parent.remove(this.group), this.mesh.geometry.dispose()) : this._3d ? GLUI.stage3d.remove(this) : GLUI.stage.remove(this)
        }, prototype.tween = function (obj, time, ease, delay) {
            return tween(this, obj, time, ease, delay)
        }, prototype.enable3D = function () {
            return this._3d = !0, this.dimensions.x *= .005, this.mesh.material.depthWrite = !0, this.mesh.material.depthTest = !0, this
        }, prototype.setZ = function (z) {
            return this.mesh.renderOrder = z, this
        }, prototype.show = function () {
            return this.mesh.visible = !0, this
        }, prototype.hide = function () {
            return this.mesh.visible = !1, this
        }, prototype.useShader = function (shader) {
            this.mesh.material = shader.material
        })
    }), Class(function GLUIStage(_renderer) {
        function loop() {
            if (_this.preventRender) return;
            let clear = World.RENDERER.autoClear;
            World.RENDERER.autoClear = !1, World.RENDERER.render(_scene, _camera, _this.rt), World.RENDERER.autoClear = clear
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            _camera.left = Stage.width / -2, _camera.right = Stage.width / 2, _camera.top = Stage.height / 2, _camera.bottom = Stage.height / -2, _camera.near = .01, _camera.far = 1e3, _camera.updateProjectionMatrix(), _camera.position.x = Stage.width / 2, _camera.position.y = -Stage.height / 2
        }
        Inherit(this, Component);
        const _this = this;
        var _scene = new THREE.Scene,
            _camera = new THREE.OrthographicCamera(1, 1, 1, 1, .1, 1);
        this.interaction = _this.initClass(GLUIStageInteraction2D, _camera), _camera.position.z = 1, addListeners(), resizeHandler(), _this.wait(World, "NUKE", _ => World.instance().postRender(loop)), this.add = function ($obj) {
            _scene.add($obj.group || $obj.mesh)
        }, this.remove = function ($obj) {
            _scene.remove($obj.group)
        }, this.renderTo = function (rtt) {
            let clear = World.RENDERER.autoClear;
            World.RENDERER.autoClear = !1, World.RENDERER.render(_scene, _camera, rtt), World.RENDERER.autoClear = clear
        }, this.set("nuke", nuke => {
            nuke.postRender = loop
        })
    }), Class(function GLUIStage3D() {
        Inherit(this, Object3D);
        this.interaction = new GLUIStageInteraction3D, this.add = function (obj) {
            World.SCENE.add(this.group), obj.parent = this, this.group.add(obj.group || obj.mesh)
        }, this.remove = function (obj) {
            this.interaction.remove(obj.group), this.group.remove(obj.group)
        }
    }), Class(function GPU() {
        function test() {
            function factors(n) {
                var i, out = [],
                    sqrt_n = Math.sqrt(n);
                for (i = 2; i <= sqrt_n; i++) n % i == 0 && out.push(i);
                return out
            }

            function primep(n) {
                return 0 === factors(n).length
            }

            function largest_prime_factor(n) {
                return factors(n).filter(primep).pop()
            }
            let time = performance.now();
            return function getPrime() {
                return largest_prime_factor(1e11)
            }(), 10 * (performance.now() - time)
        }

        function matchiOS() {
            let res = Math.min(screen.width, screen.height) + "x" + Math.max(screen.width, screen.height),
                time = test();
            switch (res) {
                case "320x480":
                    Device.graphics.webgl.gpu = "legacy";
                    break;
                case "320x568":
                    Device.graphics.webgl.gpu = time <= 400 ? "apple a8" : time <= 500 ? "apple a7" : "legacy";
                    break;
                case "375x812":
                case "414x896":
                    Device.graphics.webgl.gpu = time <= 180 ? "apple a12" : "apple a11";
                    break;
                default:
                case "414x736":
                case "375x667":
                case "768x1024":
                    Device.graphics.webgl.gpu = time <= 180 ? "apple a12" : time <= 220 ? "apple a11" : time <= 250 ? "apple a10" : time <= 320 ? "apple a9" : time <= 400 ? "apple a8" : time <= 600 ? "apple a7" : "legacy";
                    break;
                case "834x1112":
                    Device.graphics.webgl.gpu = time <= 180 ? "apple a12" : time <= 220 ? "apple a11" : "apple a10";
                    break;
                case "834x1194":
                    Device.graphics.webgl.gpu = "apple a12";
                    break;
                case "1024x1366":
                    Device.graphics.webgl.gpu = time <= 180 ? "apple a12" : time <= 220 ? "apple a11" : time <= 250 ? "apple a10" : "apple a9"
            }
        }
        Inherit(this, Component);
        var _this = this,
            _split = {};
        Hydra.ready(() => {
            function splitGPU(string) {
                if (_split[string]) return _split[string];
                if (!_this.detect(string)) return -1;
                try {
                    var num = Number(_this.gpu.split(string)[1].split(" ")[0]);
                    return _split[string] = num, num
                } catch (e) {
                    return -1
                }
            }
            _this.detect = function (match) {
                if (Device.graphics.webgl) return Device.graphics.webgl.detect(match)
            }, _this.detectAll = function () {
                if (Device.graphics.webgl) {
                    for (var match = !0, i = 0; i < arguments.length; i++) Device.graphics.webgl.detect(arguments[i]) || (match = !1);
                    return match
                }
            }, _this.matchGPU = function (str, min, max = 99999) {
                let num = splitGPU(str);
                return num >= min && num < max
            }, _this.gpu = Device.graphics.webgl ? Device.graphics.webgl.gpu : "", "ios" == Device.system.os && "apple gpu" == _this.gpu && matchiOS(), Mobile.iOS = require("iOSDevices").find(), _this.BLACKLIST = require("GPUBlacklist").match(), _this.T0 = !Device.mobile && (!!_this.BLACKLIST || (!!_this.detect("radeon(tm) r5") || (_this.detectAll("intel", "hd") ? _this.matchGPU("hd graphics ", 1e3, 4400) : "intel iris opengl engine" === _this.gpu.toLowerCase()))), _this.T1 = !_this.BLACKLIST && (!Device.mobile && (!!_this.matchGPU("iris(tm) graphics ", 540) || (!!_this.matchGPU("hd graphics ", 514, 1e3) || !_this.detect(["nvidia", "amd", "radeon", "geforce"]) && !_this.T0))), _this.T2 = !_this.BLACKLIST && (!Device.mobile && !(!_this.detect(["nvidia", "amd", "radeon", "geforce"]) || _this.T1 || _this.T0)), _this.T3 = !_this.BLACKLIST && (!Device.mobile && (!!_this.detect(["titan", "amd radeon pro", "quadro"]) || (!!_this.matchGPU("gtx ", 940) || (!!_this.matchGPU("radeon (tm) rx ", 400) || !!_this.matchGPU("radeon pro ", 420))))), _this.T4 = !_this.BLACKLIST && (!Device.mobile && (!!_this.detect(["titan", "quadro"]) || !!_this.matchGPU("gtx ", 1040))), _this.MT0 = !!Device.mobile && (!!Mobile.iOS.includes(["legacy", "ipad mini 1", "5x", "ipad 4"]) || (!("android" != Device.system.os || !_this.detect("sgx")) || (_this.detect("adreno") ? _this.matchGPU("adreno (tm) ", 0, 330) : !!_this.detect("mali") && _this.matchGPU("mali-t", 0, 628)))), _this.MT1 = !!Device.mobile && (!!Mobile.iOS.includes(["5s", "ipad air 1"]) || "android" == Device.system.os && !_this.MT0), _this.MT2 = !!Device.mobile && (!!Mobile.iOS.includes(["6x", "ipad air 2"]) || (_this.detect("adreno") ? _this.matchGPU("adreno (tm) ", 399) : !!_this.detect("mali-g"))), _this.MT3 = !!Device.mobile && (!!Mobile.iOS.includes(["6s", "ipad pro", "7x"]) || (!(!_this.detect("nvidia tegra") || !Device.detect("pixel c")) || (_this.detect("adreno") ? _this.matchGPU("adreno (tm) ", 530) : _this.detect("mali-g") ? _this.matchGPU("mali-g", 71) : !!navigator.platform.toLowerCase().includes("mac")))), _this.MT4 = !!Device.mobile && (!("ios" != Device.system.os || !_this.detect(["a10", "a11", "a12", "a13", "a14", "a15", "a16", "a17", "a18"])) || (_this.detect("adreno") ? _this.matchGPU("adreno (tm) ", 540) : !!navigator.platform.toLowerCase().includes("mac"))), _this.lt = function (num) {
                return _this.TIER > -1 && _this.TIER <= num
            }, _this.gt = function (num) {
                return _this.TIER > -1 && _this.TIER >= num
            }, _this.eq = function (num) {
                return _this.TIER > -1 && _this.TIER == num
            }, _this.mobileEq = function (num) {
                return _this.M_TIER > -1 && _this.M_TIER == num
            }, _this.mobileLT = function (num) {
                return _this.M_TIER > -1 && _this.M_TIER <= num
            }, _this.mobileGT = function (num) {
                return _this.M_TIER > -1 && _this.M_TIER >= num
            };
            for (var key in _this) "T" == key.charAt(0) && !0 === _this[key] && (_this.TIER = Number(key.charAt(1))), "MT" == key.slice(0, 2) && !0 === _this[key] && (_this.M_TIER = Number(key.charAt(2)));
            _this.OVERSIZED = !Device.mobile && _this.TIER < 2 && Math.max(window.innerWidth, window.innerHeight) > 1440, _this.initialized = !0
        }), this.ready = function () {
            let promise = Promise.create();
            return _this.wait(() => promise.resolve(), _this, "initialized"), promise
        }
    }, "static"), Module(function GPUBlacklist() {
        this.exports = {
            match: function () {
                return !Device.graphics.webgl || Device.graphics.webgl.detect(["radeon hd 6970m", "radeon hd 6770m", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 5750", "radeon hd 5670", "radeon hd 4850", "radeon hd 4870", "radeon hd 4670", "geforce 9400m", "geforce 320m", "geforce 330m", "geforce gt 130", "geforce gt 120", "geforce gtx 285", "geforce 8600", "geforce 9600m", "geforce 9400m", "geforce 8800 gs", "geforce 8800 gt", "quadro fx 5", "quadro fx 4", "radeon hd 2600", "radeon hd 2400", "radeon hd 2600", "radeon r9 200", "mali-4", "mali-3", "mali-2"])
            }
        }
    }), Module(function iOSDevices() {
        this.exports = {
            find: function () {
                if ("ios" == Device.system.os && navigator.platform.toLowerCase().includes("macintel")) return "";
                if (!Device.graphics.webgl) return "legacy";
                var detect = Device.graphics.webgl.detect;
                return detect(["a9", "a10", "a11", "a12", "a13", "a14", "a15", "a16", "a17", "a18"]) || navigator.platform.toLowerCase().includes("mac") ? Device.mobile.phone ? "6s, 7x" : "ipad pro" : detect("a8") ? Device.mobile.phone ? "6x" : "ipad air 2, ipad mini 4" : detect("a7") ? Device.mobile.phone ? "5s" : "ipad air 1, ipad mini 2, ipad mini 3" : detect(["sgx554", "sgx 554"]) ? Device.mobile.phone ? "" : "ipad 4" : detect(["sgx543", "sgx 543"]) ? Device.mobile.phone ? "5x, 5c, 4s" : "ipad mini 1, ipad 2" : "legacy"
            }
        }
    }), Class(function KeyboardUtil() {
        function addListeners() {
            __window.keydown(keydown), __window.keyup(keyup), __window.keypress(keypress)
        }

        function keydown(e) {
            _this.events.fire(_this.DOWN, e)
        }

        function keyup(e) {
            _this.events.fire(_this.UP, e)
        }

        function keypress(e) {
            _this.events.fire(_this.PRESS, e)
        }
        Inherit(this, Component);
        var _this = this;
        _this.DOWN = "keyboard_down", _this.PRESS = "keyboard_press", _this.UP = "keyboard_up", Hydra.ready(addListeners)
    }, "static"), Class(function Video(_params) {
        function createDiv() {
            let src = _params.src;
            src && !src.includes(["webm", "mp4", "ogv"]) && (src += "." + Device.media.video), _this.div = document.createElement("video"), src && (_this.div.src = src), _this.div.controls = _params.controls, _this.div.id = _params.id || "", _this.div.width = _params.width, _this.div.height = _params.height, _loop = _this.div.loop = _params.loop, _this.muted = !0, _this.object = $(_this.div), _this.width = _params.width, _this.height = _params.height, _this.object.size(_this.width, _this.height), _this.div.muted = !0, Device.mobile && (_this.object.attr("webkit-playsinline", !0), _this.object.attr("playsinline", !0))
        }

        function preload() {
            _this.div.preload = "auto", _this.div.load()
        }

        function tick() {
            if (!_this.div || !_this.events) return _this.stopRender(tick);
            _this.duration = _this.div.duration, _this.time = _this.div.currentTime, _this.div.currentTime == _lastTime ? ++_tick > 30 && !_buffering && (_buffering = !0, _this.events.fire(Events.ERROR, null, !0)) : (_tick = 0, _buffering && (_this.events.fire(Events.READY, null, !0), _buffering = !1)), _lastTime = _this.div.currentTime, _this.div.currentTime >= (_this.duration || _this.div.duration) - .001 && (_loop ? _this.div.currentTime = 0 : (_forceRender || _this.stopRender(tick), _this.events.fire(Events.COMPLETE, null, !0))), _this.div && (_event.time = _this.div.currentTime, _event.duration = _this.div.duration, _event.loaded = _this.loaded, _this.events.fire(Events.UPDATE, _event, !0))
        }

        function checkReady() {
            if (!_this.div) return !1;
            if (_seekTo) {
                let max = -1,
                    seekable = _this.div.seekable;
                if (seekable) {
                    for (let i = 0; i < seekable.length; i++) seekable.start(i) < _seekTo && (max = seekable.end(i) - .5);
                    max >= _seekTo && (_this.buffered = !0)
                } else _this.buffered = !0
            } else _this.buffered = _this.div.readyState == _this.div.HAVE_ENOUGH_DATA;
            _this.buffered && (_this.stopRender(checkReady), _this.events.fire(Events.READY, null, !0))
        }

        function handleProgress() {
            if (!_this.ready()) return;
            let range = 0,
                bf = _this.div.buffered,
                time = _this.div.currentTime;
            for (; !(bf.start(range) <= time && time <= bf.end(range));) range += 1;
            _this.loaded.start = bf.start(range) / _this.div.duration, _this.loaded.end = bf.end(range) / _this.div.duration, _this.loaded.percent = _this.loaded.end - _this.loaded.start, _this.events.fire(Events.PROGRESS, _this.loaded, !0)
        }
        Inherit(this, Component);
        const _this = this;
        let _lastTime, _buffering, _seekTo, _loop, _forceRender, _tick = 0;
        const _event = {};
        this.loop = !1, this.playing = !1, this.loaded = {
            start: 0,
            end: 0,
            percent: 0
        }, this.width = _params.width || 0, this.height = _params.height || 0, createDiv(), !1 !== _params.preload ? preload() : _this.object.attr("preload", "none"), this.set("loop", function (bool) {
            _this.div && (_loop = bool, _this.div.loop = bool)
        }), this.get("loop", function () {
            return _loop
        }), this.set("src", function (src) {
            src && !src.includes(["webm", "mp4", "ogv"]) && (src += "." + Device.media.video), _this.div.src = src
        }), this.get("src", function () {
            return _this.div.src
        }), this.play = function () {
            if (!_this.div) return !1;
            _this.playing = !0, _this.div.play(), _this.startRender(tick)
        }, this.pause = function () {
            if (!_this.div) return !1;
            _this.playing = !1, _this.div.pause(), _this.stopRender(tick)
        }, this.stop = function () {
            if (_this.playing = !1, _this.stopRender(tick), !_this.div) return !1;
            _this.div.pause(), _this.ready() && (_this.div.currentTime = 0)
        }, this.volume = function (v) {
            if (!_this.div) return !1;
            _this.div.volume = v, _this.muted && (_this.muted = !1, _this.div.removeAttribute("muted"))
        }, this.mute = function () {
            if (!_this.div) return !1;
            _this.volume(0), _this.muted = !0, _this.object.attr("muted", !0)
        }, this.seek = function (t) {
            if (!_this.div) return !1;
            _this.div.readyState <= 1 ? Timer.create(function () {
                _this.seek && _this.seek(t)
            }, 32) : _this.div.currentTime = t
        }, this.canPlayTo = function (t) {
            return _seekTo = null, t && (_seekTo = t), !!_this.div && (_this.buffered || _this.startRender(checkReady), this.buffered)
        }, this.ready = this.readyState = function () {
            return !!_this.div && _this.div.readyState >= 2
        }, this.size = function (w, h) {
            if (!_this.div) return !1;
            this.div.width = this.width = w, this.div.height = this.height = h, this.object.css({
                width: w,
                height: h
            })
        }, this.forceRender = function () {
            _forceRender = !0, _this.startRender(tick)
        }, this.trackProgress = function () {
            _this.div.addEventListener("progress", handleProgress)
        }, this.destroy = function () {
            return this.stop(), this.object.remove(), this.div.src = "", this._destroy()
        }
    }), Class(function Webcam(_width, _height, _audio) {
        function createVideo() {
            _this.div = document.createElement("video"), _this.div.width = _width, _this.div.height = _height, _this.div.autoplay = !0, _this.element = $(_this.div), Device.mobile || _this.element.transform({
                scaleX: -1
            })
        }

        function initNavigator() {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
        }

        function establishWebcam() {
            if (_attempts >= 2) return error();
            lookupDevices().then(() => {
                _stream && _config.back && _stream.getTracks()[0].stop(), navigator.getUserMedia({
                    video: _config.back ? _cameras.back : _cameras.front || !0,
                    audio: _audio
                }, success, error)
            }), _attempts += 1
        }

        function lookupDevices() {
            let promise = Promise.create();
            return Device.mobile ? (navigator.mediaDevices.enumerateDevices().then(devices => {
                devices.forEach(device => {
                    device.label.includes("front") && (_cameras.front = {
                        deviceId: {
                            exact: device.deviceId
                        }
                    }), device.label.includes("back") && (_cameras.back = {
                        deviceId: {
                            exact: device.deviceId
                        }
                    }, _back = !0)
                }), _cameras.front || (_cameras.front = {
                    facingMode: "user"
                }), _cameras.back || (_cameras.back = {
                    facingMode: "environment"
                }, _back = !1), promise.resolve()
            }), promise) : Promise.resolve()
        }

        function success(stream) {
            _this.denied = !1, _stream = stream, _config.back && !_back ? establishWebcam() : (_this.div.src = window.URL.createObjectURL(stream), _this.events.fire(Events.READY, null, !0))
        }

        function error() {
            _this.denied = !0, _this.events.fire(Events.ERROR, null, !0)
        }
        Inherit(this, Component);
        var _this = this;
        let _stream, _cameras = {},
            _config = {},
            _back = !1,
            _attempts = 0;
        _this.facing = "back", createVideo(), initNavigator(), this.createStream = function (config) {
            _attempts = 0, _config = config, establishWebcam()
        }, this.flip = function () {
            if (!_back) return;
            let direction;
            "front" === _this.facing ? (_this.facing = "back", direction = _cameras.back) : (_this.facing = "front", direction = _cameras.front), _stream.getTracks()[0].stop(), navigator.getUserMedia({
                video: direction || !0,
                audio: _audio
            }, success, error)
        }, this.get("width", function () {
            return _width
        }), this.get("height", function () {
            return _height
        }), this.size = function (w, h) {
            _this.div.width = _width = w, _this.div.height = _height = h, _this.element.size(w, h)
        }, this.getPixels = function (width = _width, height = _height) {
            return _this.canvas || (_this.canvas = _this.initClass(Canvas, width, height, null)), _this.canvas.context.drawImage(_this.div, 0, 0, width, height), _this.canvas.context.getImageData(0, 0, width, height)
        }, this.ready = function () {
            return _this.div.readyState > 0
        }, this.end = function () {
            _this.active = !1, _this.div.pause(), _stream && (_stream.getTracks()[0].enabled = !1)
        }, this.restart = function () {
            _this.div.play(), _stream && (_stream.getTracks()[0].enabled = !0), _this.active = !0
        }
    }), Class(function Redirect() {
        Inherit(this, Model);
        this.toNaked = function () {
            if (window.location.hostname.indexOf("www.") > -1) {
                let referrer = "";
                return document.referrer && document.referrer.length > 0 && (referrer = (window.location.search.indexOf("?") > -1 ? "&" : "?") + "utm_referrer=" + encodeURIComponent(document.referrer)), window.location.href = window.location.protocol + "//" + window.location.hostname.split("www.")[1] + window.location.pathname + window.location.search + referrer, !0
            }
            return !1
        }
    }, "static"), Class(function RenderGL() {
        function onRenderEye(stage, camera) {
            _evt.stage = stage, _evt.camera = camera, _this.events.fire(_this.RENDER, _evt)
        }

        function resizeHandler() {
            _this.renderer && _this.renderer.setSize(Stage.width, Stage.height)
        }
        Inherit(this, Component);
        const _this = this,
            _evt = {
                stage: null,
                camera: null
            };
        var _dpr = null;
        this.NORMAL = "normal", this.WEBVR = "webvr", this.STEREO = "stereo", this.ARKIT = "ARKit", this.ARCORE = "ARCore", this.AR = "AR", this.DAYDREAM = "daydream", this.GEARVR = "gearVR", this.RENDER = "rendergl_render", this.READY = "render_gl_ready", _this.events.sub(Events.RESIZE, resizeHandler), this.set("DPR", v => {
            _dpr = v, _this.renderer && _this.renderer.setSize(Stage.width, Stage.height)
        }), this.get("DPR", v => _dpr), this.initialize = function (type, params = {}) {
            if (_this.camera && _this.camera.destroy(), _this.renderer && _this.renderer.destroy(), type == _this.AR && (type = "ios" == Device.system.os ? _this.ARKIT : _this.ARCORE), type == _this.ARKIT) {
                if (!window.ARKit) throw "RenderGL.ARKIT requires ARKit module";
                ARKit.init()
            }
            if (type == _this.ARCORE) {
                if (!window.ARCore) throw "RenderGL.ARCORE requires ARCore module";
                ARCore.init()
            }
            if (!_this.threeRenderer) {
                let camera = new THREE.PerspectiveCamera(45, Stage.width / Stage.height, .01, 200);
                _this.threeRenderer = function () {
                    if (window.ARKit && window.ARKit.renderer) return ARKit.renderer;
                    if (window.ARCore && window.ARCore.renderer) return ARCore.renderer;
                    if (window._canvas && (params.canvas = window._canvas), !Device.graphics.webgl) return {
                        render: _ => {},
                        setPixelRatio: _ => {},
                        setSize: _ => {},
                        readRenderTargetPixels: _ => {}
                    };
                    let renderer = new THREE.WebGLRenderer(params);
                    return renderer.setSize(Stage.width, Stage.height), renderer.setPixelRatio(World.DPR), renderer
                }(), _this.scene = window.ARKit && window.ARKit.scene ? ARKit.scene : window.ARCore && window.ARCore.scene ? ARCore.scene : new THREE.Scene, _this.nuke = _this.initClass(Nuke, Stage, Object.assign({
                    renderer: _this.threeRenderer,
                    scene: _this.scene,
                    camera: camera,
                    dpr: World.DPR
                }, params))
            }
            switch (_dpr = _dpr || World.DPR || 1, type) {
                case _this.WEBVR:
                    _this.renderer = _this.initClass(VRRenderer, _this.threeRenderer, _this.nuke), _this.camera = _this.initClass(VRCamera);
                    break;
                case _this.STEREO:
                    _this.renderer = _this.initClass(VRStereoRenderer, _this.threeRenderer, _this.nuke), _this.camera = _this.initClass(VRStereoCamera);
                    break;
                case _this.NORMAL:
                    _this.renderer = _this.initClass(RenderGLRenderer, _this.threeRenderer, _this.nuke), _this.camera = _this.initClass(RenderGLCamera);
                    break;
                case _this.ARKIT:
                    _this.renderer = _this.initClass(RenderGLRenderer, ARKit.renderer, _this.nuke), _this.camera = ARKit;
                    break;
                case _this.ARCORE:
                    _this.renderer = _this.initClass(RenderGLRenderer, ARCore.renderer, _this.nuke), _this.camera = ARCore;
                    break;
                case _this.DAYDREAM:
                    _this.renderer = _this.initClass(DaydreamRenderer, _this.threeRenderer, _this.nuke), _this.camera = _this.initClass(DaydreamCamera)
            }
            _this.type = type, _this.nuke.camera = _this.camera.worldCamera, _this.renderer.onRenderEye = onRenderEye, defer(() => {
                _this.events.fire(_this.READY)
            })
        }, this.render = function (scene, camera, renderTarget, forceClear) {
            _this.renderer.render(scene || _this.scene, camera || _this.camera.worldCamera, renderTarget, forceClear)
        }, this.startRender = function () {
            Render.start(_this.render)
        }, this.stopRender = function () {
            Render.stop(_this.render)
        }, this.requestPresent = function (bool) {
            _this.renderer.requestPresent && _this.renderer.requestPresent(bool)
        }, this.setSize = function (width, height) {
            _this.events.unsub(Events.RESIZE, resizeHandler), _this.renderer.setSize(width, height)
        }, this.set("onRenderEye", callback => {
            _this.renderer.onRenderEye = callback
        })
    }, "static"), Class(function RenderGLCamera() {
        Inherit(this, Component);
        const _this = this;
        this.worldCamera = new THREE.PerspectiveCamera(30, Stage.width / Stage.height, .1, 1e3), _this.events.sub(Events.RESIZE, () => {
            _this.worldCamera.aspect = Stage.width / Stage.height, _this.worldCamera.updateProjectionMatrix()
        })
    }), Class(function RenderGLRenderer(_renderer, _nuke) {
        Inherit(this, Component);
        const _this = this;
        this.render = function (scene, camera) {
            _nuke.camera = camera, _this.onRenderEye && _this.onRenderEye(Stage, camera), _nuke ? _nuke.render() : _renderer.render(scene, camera)
        }, this.setSize = function (width, height) {
            _renderer.setPixelRatio(RenderGL.DPR), _renderer.setSize(width, height)
        }
    }), Class(function Schema() {
        function load(data) {
            var el = document.createElement("script");
            el.type = "application/ld+json", el.text = JSON.stringify(data), document.querySelector("body").appendChild(el)
        }
        Inherit(this, Model);
        get(`${Assets.CDN}assets/schemas/company.json`).then(load)
    }, "static"), Class(function Scroll(_object, _params) {
        function initParams() {
            _object && _object.div || (_params = _object, _object = null), _params || (_params = {}), _this.object = _object, _this.hitObject = _params.hitObject || _this.object, _this.max.y = _params.height || 0, _this.max.x = _params.width || 0, _this.scale = _params.scale || 1, _this.drag = void 0 !== _params.drag ? _params.drag : !!Device.mobile, _this.mouseWheel = !1 !== _params.mouseWheel, _this.limit = !1 !== _params.limit, Array.isArray(_params.axes) && (_axes = _params.axes)
        }

        function style() {
            _this.object.css({
                overflow: "auto"
            })
        }

        function loop() {
            _axes.forEach(axis => {
                _this.isInertia && (_scrollInertia[axis] *= .9, _scrollTarget[axis] += _scrollInertia[axis]), _this.limit && (_scrollTarget[axis] = Math.max(_scrollTarget[axis], 0)), _this.limit && (_scrollTarget[axis] = Math.min(_scrollTarget[axis], _this.max[axis] / _this.scale)), _this.delta[axis] = .6 * (_scrollTarget[axis] * _this.scale - _this[axis]), _this[axis] += _this.delta[axis], _this.object && ("x" == axis && (_this.object.div.scrollLeft = _this.x), "y" == axis && (_this.object.div.scrollTop = _this.y))
            })
        }

        function stopInertia() {
            _this.isInertia = !1, clearTween(_scrollTarget)
        }

        function addHandlers() {
            if (Device.mobile || ("ie" == Device.system.browser ? window.addEventListener("wheel", scroll, !0) : __window.bind("wheel", scroll)), _this.drag) {
                _this.hitObject && _this.hitObject.bind("touchstart", e => e.preventDefault());
                let input = _this.hitObject ? _this.initClass(Interaction, _this.hitObject) : Mouse.input;
                _this.events.sub(input, Interaction.START, down), _this.events.sub(input, Interaction.DRAG, drag), _this.events.sub(input, Interaction.END, up)
            }
            _this.events.sub(Events.RESIZE, resize)
        }

        function scroll(e) {
            _this.enabled && (e.preventDefault && e.preventDefault(), _this.mouseWheel && (stopInertia(), _axes.forEach(axis => {
                let delta = "delta" + axis.toUpperCase();
                if ("mac" == Device.system.os) {
                    if ("firefox" == Device.system.browser) return 1 === e.deltaMode ? (_scrollTarget[axis] += 8 * e[delta], _scrollInertia[axis] = 8 * e[delta], void(_this.isInertia = !0)) : void(_scrollTarget[axis] += e[delta]);
                    if (CHROME_SAFARI) return _scrollTarget[axis] += .33 * e[delta], _scrollInertia[axis] = .33 * e[delta], void(_this.isInertia = !0)
                }
                if ("windows" == Device.system.os && "firefox" == Device.system.browser && 1 === e.deltaMode) return _scrollTarget[axis] += 10 * e[delta], _scrollInertia[axis] = 10 * e[delta], void(_this.isInertia = !0);
                _scrollTarget[axis] += e[delta]
            })))
        }

        function down() {
            _this.enabled && stopInertia()
        }

        function drag() {
            _this.enabled && _axes.forEach(axis => {
                _scrollTarget[axis] -= Mouse.delta[axis]
            })
        }

        function up() {
            if (!_this.enabled) return;
            const m = "android" == Device.system.os ? 35 : 25,
                obj = {};
            _axes.forEach(axis => {
                obj[axis] = _scrollTarget[axis] - Mouse.delta[axis] * m
            }), _this.preventInertia || tween(_scrollTarget, obj, 2500, "easeOutQuint")
        }

        function resize() {
            if (!_this.enabled) return;
            if (stopInertia(), !_this.object) return;
            const p = {};
            Device.mobile && _axes.forEach(axis => p[axis] = _this.max[axis] ? _scrollTarget[axis] / _this.max[axis] : 0), void 0 === _params.height && (_this.max.y = _this.object.div.scrollHeight - _this.object.div.clientHeight), void 0 === _params.width && (_this.max.x = _this.object.div.scrollWidth - _this.object.div.clientWidth), Device.mobile && _axes.forEach(axis => _this[axis] = _scrollTarget[axis] = p[axis] * _this.max[axis])
        }
        Inherit(this, Component);
        const _this = this;
        this.x = 0, this.y = 0, this.max = {
            x: 0,
            y: 0
        }, this.delta = {
            x: 0,
            y: 0
        }, this.enabled = !0;
        const _scrollTarget = {
                x: 0,
                y: 0
            },
            _scrollInertia = {
                x: 0,
                y: 0
            };
        let _axes = ["x", "y"];
        const CHROME_SAFARI = Device.system.browser.includes(["chrome", "safari"]);
        initParams(), _this.object && style(), addHandlers(), resize(), _this.startRender(loop), this.onDestroy = function () {
            __window.unbind("wheel", scroll)
        }, this.stopInertia = stopInertia
    }, _ => {
        Scroll.KEYBOARD = "scroll_keyboard"
    }), Class(function Shaders() {
        function parseSingleShader(code) {
            let uniforms = code.split("#!UNIFORMS")[1].split("#!")[0],
                varyings = code.split("#!VARYINGS")[1].split("#!")[0],
                attributes = code.split("#!ATTRIBUTES")[1].split("#!")[0];
            for (; code.includes("#!SHADER");) {
                let split = (code = code.slice(code.indexOf("#!SHADER"))).split("#!SHADER")[1],
                    br = split.indexOf("\n"),
                    name = split.slice(0, br).split(": ")[1],
                    glsl = split.slice(br);
                glsl = name.includes(".vs") ? attributes + uniforms + varyings + glsl : uniforms + varyings + glsl;
                let splitName = name.split(".");
                _this[splitName[0] + (splitName[1].includes("vs") ? ".vs" : ".fs")] = glsl, code = code.replace("#!SHADER", "$")
            }
        }

        function parseCompiled(shaders) {
            var split = shaders.split("{@}");
            split.shift();
            for (var i = 0; i < split.length; i += 2) {
                var name = split[i],
                    text = split[i + 1];
                text.includes("#!UNIFORMS") ? parseSingleShader(text) : _this[name] = text
            }
        }

        function parseRequirements() {
            for (var key in _this) {
                var obj = _this[key];
                "string" == typeof obj && (_this[key] = require(obj))
            }
        }

        function require(shader) {
            if (!shader.includes("require")) return shader;
            for (shader = shader.replace(/# require/g, "#require"); shader.includes("#require");) {
                var name = shader.split("#require(")[1].split(")")[0];
                if (name = name.replace(/ /g, ""), !_this[name]) throw "Shader required " + name + ", but not found in compiled shaders.\n" + shader;
                shader = shader.replace("#require(" + name + ")", _this[name])
            }
            return shader
        }
        Inherit(this, Component);
        var _this = this;
        this.parse = function (code, file) {
            code.includes("{@}") ? (parseCompiled(code), parseRequirements()) : (file = (file = file.split("/"))[file.length - 1], _this[file] = code), _this.shadersParsed = !0
        }, this.onReady = this.ready = function (callback) {
            let promise = Promise.create();
            return callback && promise.then(callback), _this.wait(() => promise.resolve(), _this, "shadersParsed"), promise
        }, this.getShader = function (string) {
            _this.FALLBACKS && _this.FALLBACKS[string] && (string = _this.FALLBACKS[string]);
            var code = _this[string];
            if (code)
                for (; code.includes("#test ");) try {
                    var test = code.split("#test ")[1],
                        name = test.split("\n")[0],
                        glsl = code.split("#test " + name + "\n")[1].split("#endtest")[0];
                    eval(name) || (code = code.replace(glsl, "")), code = code.replace("#test " + name + "\n", ""), code = code.replace("#endtest", "")
                } catch (e) {
                    throw "Error parsing test :: " + string
                }
            return code
        }
    }, "static"), Class(function Interaction3D(_camera) {
        function parseMeshes(meshes) {
            function checkMesh(obj) {
                (obj.type = obj.isHitMesh) && (obj.mouseEnabled = function (visible) {
                    visible ? ~_meshes.indexOf(obj) || _meshes.push(obj) : _meshes.remove(obj)
                }, output.push(obj)), obj.children.length && obj.children.forEach(checkMesh)
            }
            void 0 === meshes.length && (meshes = [meshes]);
            let output = [];
            return meshes.forEach(checkMesh), output
        }

        function addHandlers() {
            _this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.MOVE, move), _this.events.sub(Mouse.input, Interaction.CLICK, click)
        }

        function start() {
            if (!_this.enabled) return;
            let hit = move();
            hit ? (_click = hit.object).time = Render.TIME : _click = null
        }

        function move() {
            if (!_this.enabled) return void Stage.css("cursor", _this.cursor);
            let hit = _ray.checkHit(_meshes)[0];
            if (hit) {
                let mesh = hit.object;
                return _hover !== mesh && (_hover && triggerHover("out", _hover), triggerHover("over", _hover = mesh), Stage.css("cursor", "pointer")), hit
            }
            return _hover && (triggerHover("out", _hover), _hover = null, Stage.css("cursor", _this.cursor)), !1
        }

        function click() {
            if (!_this.enabled) return;
            if (!_click) return;
            let hit = _ray.checkHit(_meshes, Mouse)[0];
            hit && hit.object === _click && triggerClick(_click), _click = null
        }

        function triggerHover(action, mesh) {
            _event.action = action, _event.mesh = mesh, _this.events.fire(Interaction3D.HOVER, _event, !0), _hover.__hoverCallback && _hover.__hoverCallback(_event)
        }

        function triggerClick(mesh) {
            _event.action = "click", _event.mesh = mesh, _this.events.fire(Interaction3D.CLICK, _event, !0), _click.__clickCallback && _click.__clickCallback(_event)
        }
        Inherit(this, Component);
        const _this = this;
        let _hover, _click;
        _camera = _camera || World.CAMERA;
        let _ray = _this.initClass(Raycaster, _camera),
            _meshes = [];
        const _event = {};
        this.cursor = "auto", addHandlers(), _this.enabled = !0, this.set("camera", c => {
            _ray.camera = c
        }), this.add = function (meshes, hover, click, isParse) {
            (void 0 === meshes.length || isParse) && (meshes = parseMeshes(meshes)), meshes.forEach(mesh => {
                hover && (mesh.__hoverCallback = hover), click && (mesh.__clickCallback = click), _meshes.push(mesh)
            })
        }, this.remove = function (meshes, isParse) {
            (void 0 === meshes.length || isParse) && (meshes = parseMeshes(meshes)), meshes.forEach(mesh => {
                if (_hover == mesh)
                    for (let i = _meshes.length - 1; i >= 0; i--) mesh === _meshes[i] && _meshes.splice(i, 1)
            })
        }, this.set("testVisibility", v => _ray.testVisibility = v)
    }, () => {
        Interaction3D.HOVER = "interaction3d_hover", Interaction3D.CLICK = "interaction3d_click"
    }), Class(function Lighting() {
        function loop() {
            decomposeLights(_lights)
        }

        function decomposeLights(lights) {
            for (var i = lights.length - 1; i > -1; i--) {
                var light = lights[i];
                light.parent || light.updateMatrixWorld(), light._world || (light._world = new THREE.Vector3), light.getWorldPosition(light._world)
            }
        }

        function updateArrays(shader) {
            var light, lights = shader.lights,
                lighting = shader.__lighting;
            lighting.position.length = 0, lighting.color.length = 0, lighting.intensity.length = 0, lighting.distance.length = 0;
            for (var i = 0; i < lights.length; i++) light = lights[i], lighting.position.push(light._world), lighting.color.push(light.color.r, light.color.g, light.color.b), lighting.intensity.push(light.intensity), lighting.distance.push(light.distance);
            for (i = 0; i < _lights.length; i++) light = _lights[i], lighting.position.push(light._world), lighting.color.push(light.color.r, light.color.g, light.color.b), lighting.intensity.push(light.intensity), lighting.distance.push(light.distance)
        }
        Inherit(this, Component);
        var _lights = [];
        this.add = function (light) {
            _lights.push(light), Render.start(loop)
        }, this.remove = function (light) {
            _lights.remove(light)
        }, this.getLighting = function (shader, force) {
            if (shader.__lighting && !force) return shader.__lighting;
            var lighting = {
                position: [],
                color: [],
                intensity: [],
                distance: []
            };
            return shader.__lighting = lighting, _lights[0] && !_lights[0]._world && decomposeLights(_lights), decomposeLights(shader.lights), updateArrays(shader), lighting
        }, this.update = function (shader) {
            decomposeLights(shader.lights), updateArrays(shader)
        }, this.sort = function (callback) {
            _lights.sort(callback)
        }
    }, "static"), Class(function Object3D() {
        Inherit(this, Component);
        var _this = this;
        this.group = new THREE.Group, this.freezeMatrix = function (group) {
            (group = group || _this.group).matrixAutoUpdate = !1, group.updateMatrix()
        }, this.add = function (child) {
            this.group.add(child.group || child)
        }, this.remove = function (child) {
            this.group.remove(child.group || child)
        }, this.onDestroy = function () {
            this.group && this.group.parent && this.group.parent.remove(this.group)
        }
    }), Class(function FXLayer(_parentNuke, _type) {
        function editShader(mesh) {
            let modifyShader = (shader, name) => {
                    shader.material;
                    let fs = shader.fragmentShader,
                        marker = "#drawbuffer " + name;
                    if (fs.includes(marker)) {
                        let split = fs.split(marker + " ");
                        fs = split[0] + split[1]
                    }
                    for (; fs.includes("#drawbuffer");) {
                        fs = fs.split("\n");
                        for (let i = 0; i < fs.length; i++) fs[i].includes("#drawbuffer") && (fs[i] = "");
                        fs = fs.join("\n")
                    }
                    shader.fragmentShader = shader.material.fragmentShader = fs
                },
                shader = mesh.material.shader.clone();
            for (let key in mesh.material.uniforms) shader.uniforms[key] = mesh.material.uniforms[key];
            modifyShader(mesh.material.shader, "Color"), modifyShader(shader, _this.name || _name), mesh.material = shader.material
        }

        function editDBShader(mesh) {
            let modifyMarker = (fs, name, index) => {
                    let marker = "#drawbuffer " + name;
                    if (fs.includes(marker)) {
                        let split = fs.split(marker + " ");
                        split[1] = split[1].replace("gl_FragColor", `gl_FragData[${index}]`), fs = split[0] + split[1]
                    }
                    return fs
                },
                shader = mesh.material.shader,
                fs = shader.fragmentShader;
            fs = modifyMarker(fs = modifyMarker(fs, "Color", 0), _this.name || _name, _textureIndex), shader.fragmentShader = shader.material.fragmentShader = fs
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            _rt.setSize && _rt.setSize(_nuke.stage.width * _this.resolution * _nuke.dpr, _nuke.stage.height * _this.resolution * _nuke.dpr)
        }

        function initRT() {
            if (_useDrawBuffers) {
                let texture = new THREE.Texture;
                texture.minFilter = THREE.LinearFilter, texture.magFilter = THREE.LinearFilter, texture.format = THREE.RGBAFormat, _this.rtType && (texture.type = _this.rtType), texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping, _textureIndex = _parentNuke.attachDrawBuffer(texture), _rt = {
                    texture: texture
                }
            } else _rt = Utils3D.createRT(_nuke.stage.width * _this.resolution * _nuke.dpr, _nuke.stage.height * _this.resolution * _nuke.dpr, _this.rtType);
            _this.rt = _rt
        }
        Inherit(this, Component);
        var _nuke, _rt, _this = this,
            _scene = new THREE.Scene,
            _objects = [],
            _textureIndex = -1,
            _id = Utils.timestamp(),
            _name = Utils.getConstructorName(_this),
            _useDrawBuffers = !0;
        this.resolution = 1, this.autoVisible = !0, this.enabled = !0, this.create = function (nuke, type) {
            nuke && (type && (_this.rtType = type), _useDrawBuffers = nuke.useDrawBuffers, (_this = this).scene = _scene, (_nuke = _this.initClass(Nuke, nuke.stage, {
                renderer: nuke.renderer,
                camera: nuke.camera,
                scene: _scene,
                dpr: nuke.dpr,
                useDrawBuffers: !1
            })).parentNuke = nuke, _parentNuke = nuke, _this.nuke = _nuke, initRT(), addListeners())
        }, this.addObject = this.add = function (object) {
            if (_nuke) {
                if (_useDrawBuffers) editDBShader(object);
                else {
                    var clone = object.clone();
                    object["clone_" + _id] = clone, _scene.add(clone), _objects.push(object), editShader(clone)
                }
                return clone
            }
        }, this.removeObject = function (object) {
            _nuke && (_scene.remove(object["clone_" + _id]), _objects.remove(object), delete object["clone_" + _id])
        }, this.render = this.draw = function (stage, camera) {
            if (_nuke && _this.enabled && !_useDrawBuffers && _parentNuke.enabled && _objects.length) {
                stage && (_nuke.stage = stage, _this.setSize(stage.width, stage.height)), _nuke.camera = camera || _nuke.parentNuke.camera;
                for (var i = _objects.length - 1; i > -1; i--) {
                    var obj = _objects[i],
                        clone = obj["clone_" + _id];
                    if (_this.autoVisible) {
                        clone.visible = !0;
                        for (var parent = obj; parent;)(0 == parent.visible || parent.material && 0 == parent.material.visible) && (clone.visible = !1), parent = parent.parent
                    }
                    _this.forceRender && (clone.material.visible = !0), obj.updateMatrixWorld(), obj.ignoreMatrix || Utils3D.decompose(obj, clone)
                }
                _nuke.rtt = _rt, _nuke.render()
            }
        }, this.addPass = function (pass) {
            _nuke && _nuke.add(pass)
        }, this.removePass = function (pass) {
            _nuke && _nuke.remove(pass)
        }, this.setSize = function (width, height) {
            _nuke && (_rt.width == width && _rt.height == height || (_this.events.unsub(Events.RESIZE, resizeHandler), _rt && _rt.setSize(width * _this.resolution * _nuke.dpr, height * _this.resolution * _nuke.dpr), _nuke.setSize(width * _this.resolution * _nuke.dpr, height * _this.resolution * _nuke.dpr)))
        }, this.setDPR = function (dpr) {
            _nuke && (_nuke.dpr = dpr, resizeHandler())
        }, this.getObjects = function () {
            return _objects
        }, _parentNuke instanceof Nuke && this.create(_parentNuke, _type)
    }), Namespace("FX"), Class(function FXScene(_parentNuke, _type) {
        function initRT() {
            _rt = Utils3D.createRT(_nuke.stage.width * _this.resolution * _nuke.dpr, _nuke.stage.height * _this.resolution * _nuke.dpr, _this.rtType), _this.rt = _rt
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            _rt.setSize && _rt.setSize(_nuke.stage.width * _this.resolution * _nuke.dpr, _nuke.stage.height * _this.resolution * _nuke.dpr)
        }
        Inherit(this, Component);
        var _nuke, _rt, _this = this,
            _scene = new THREE.Scene,
            _id = Utils.timestamp(),
            _objects = [];
        this.resolution = 1, this.autoVisible = !0, this.enabled = !0, this.scene = _scene, this.create = function (nuke) {
            (_this = this).scene = _scene, _this.nuke = _nuke = _this.initClass(Nuke, nuke.stage, {
                renderer: nuke.renderer,
                camera: nuke.camera,
                scene: _scene,
                dpr: nuke.dpr,
                useDrawBuffers: !1
            }), initRT(), addListeners()
        }, this.setSize = function (width, height) {
            _nuke && (_rt.width == width && _rt.height == height || (_this.events.unsub(Events.RESIZE, resizeHandler), _rt && _rt.setSize(width * _this.resolution * _nuke.dpr, height * _this.resolution * _nuke.dpr), _nuke.setSize(width * _this.resolution * _nuke.dpr, height * _this.resolution * _nuke.dpr)))
        }, this.addObject = function (object) {
            let clone = object.clone();
            return object["clone_" + _id] = clone, _scene.add(clone), _objects.push(object), clone
        }, this.removeObject = function (object) {
            _scene.remove(object["clone_" + _id]), _objects.remove(object), delete object["clone_" + _id]
        }, this.render = this.draw = function () {
            var clearColor = null;
            _this.clearColor && (clearColor = _nuke.renderer.getClearColor().getHex(), _nuke.renderer.setClearColor(_this.clearColor)), _this.clearAlpha > -1 && (_nuke.renderer.getClearAlpha(), _nuke.renderer.setClearAlpha(_this.clearAlpha));
            for (var i = _objects.length - 1; i > -1; i--) {
                var obj = _objects[i],
                    clone = obj["clone_" + _id];
                if (_this.autoVisible) {
                    clone.visible = !0;
                    for (var parent = obj; parent;)(0 == parent.visible || parent.material && 0 == parent.material.visible) && (clone.visible = !1), parent = parent.parent
                }
                _this.forceRender && (clone.material.visible = !0), obj.updateMatrixWorld(), obj.ignoreMatrix || (Utils3D.decompose(obj, clone), clone.overrideScale && clone.scale.setScalar(clone.overrideScale))
            }
            _this.preventRTDraw || (_nuke.rtt = _rt, _nuke.render(), _this.clearColor && _nuke.renderer.setClearColor(clearColor), _this.clearAlpha > -1 && _nuke.renderer.setClearAlpha(_this.clearAlpha))
        }, this.setDPR = function (dpr) {
            _nuke && (_nuke.dpr = dpr, resizeHandler())
        }, _parentNuke instanceof Nuke && this.create(_parentNuke, _type)
    }), Class(function BasicPass() {
        Inherit(this, NukePass);
        this.fragmentShader = ["varying vec2 vUv;", "uniform sampler2D tDiffuse;", "void main() {", "gl_FragColor = texture2D(tDiffuse, vUv);", "}"], this.init(this.fragmentShader)
    }), Class(function Nuke(_stage, _params) {
        function initNuke() {
            var width = _this.stage.width * _dpr,
                height = _this.stage.height * _dpr;
            _rttPing = Nuke.getRT(width, height, !1), _rttPong = Nuke.getRT(width, height, !1), _rttBuffer = Nuke.getRT(width, height, _this.useDrawBuffers), _rttCamera = new THREE.OrthographicCamera(_this.stage.width / -2, _this.stage.width / 2, _this.stage.height / 2, _this.stage.height / -2, 1, 1e3), _nukeScene = new THREE.Scene, _nukeMesh = new THREE.Mesh(Nuke.getPlaneGeom(), new THREE.MeshBasicMaterial), _nukeScene.add(_nukeMesh)
        }

        function finalRender(scene, camera) {
            _this.rtt ? _this.renderer.render(scene, camera || _this.camera, _this.rtt) : _this.renderer.render(scene, camera || _this.camera), _this.postRender && _this.postRender()
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            var width = _this.stage.width * _dpr,
                height = _this.stage.height * _dpr;
            _rttPing.dispose(), _rttPong.dispose(), _rttPing.setSize(width, height), _rttPong.setSize(width, height), _rttBuffer.setSize(width, height), _rttCamera.left = _this.stage.width / -2, _rttCamera.right = _this.stage.width / 2, _rttCamera.top = _this.stage.height / 2, _rttCamera.bottom = _this.stage.height / -2, _rttCamera.updateProjectionMatrix()
        }
        Inherit(this, Component);
        var _this = this;
        _params.renderer || console.error("Nuke :: Must define renderer"), _this.stage = _stage, _this.renderer = _params.renderer, _this.camera = _params.camera, _this.scene = _params.scene, _this.rtt = _params.rtt, _this.enabled = 0 != _params.enabled, _this.passes = _params.passes || [], _this.useDrawBuffers = !1;
        var _rttPing, _rttPong, _nukeScene, _nukeMesh, _rttCamera, _rttBuffer, _dpr = _params.dpr || 1,
            _rts = {},
            _rtStack = [],
            _drawBuffers = [];
        initNuke(), addListeners(), _this.add = function (pass, index) {
            pass.pass ? "number" != typeof index ? _this.passes.push(pass) : _this.passes.splice(index, 0, pass) : defer(function () {
                _this.add(pass, index)
            })
        }, _this.remove = function (pass) {
            "number" == typeof pass ? _this.passes.splice(pass) : _this.passes.remove(pass)
        }, _this.renderToTexture = function (clear, rtt) {
            _this.renderer.render(_this.scene, _this.camera, rtt || _rttPing, "boolean" != typeof clear || clear)
        }, _this.render = function () {
            if (_this.enabled && _this.passes.length) {
                _this.renderer.render(_this.scene, _this.camera, _rttBuffer, !0), _this.onBeforePingPong && _this.onBeforePingPong(_rttBuffer);
                for (var usedBuffer = !1, pingPong = !0, i = 0; i < _this.passes.length - 1; i++) _nukeMesh.material = _this.passes[i].pass, usedBuffer = !0, _nukeMesh.material.uniforms.tDiffuse.value = 0 == i ? _rttBuffer.texture : pingPong ? _rttPing.texture : _rttPong.texture, _this.renderer.render(_nukeScene, _rttCamera, pingPong ? _rttPong : _rttPing), pingPong = !pingPong;
                _nukeMesh.material = _this.passes[_this.passes.length - 1].pass, _nukeMesh.material.uniforms.tDiffuse.value = usedBuffer ? pingPong ? _rttPing.texture : _rttPong.texture : _rttBuffer.texture, finalRender(_nukeScene, _rttCamera)
            } else finalRender(_this.scene)
        }, _this.setSize = function (width, height) {
            if (_this.events.unsub(Events.RESIZE, resizeHandler), !_rts[width + "_" + height]) {
                var rttPing = Nuke.getRT(width * _dpr, height * _dpr, _this.useDrawBuffers),
                    rttPong = Nuke.getRT(width * _dpr, height * _dpr, !1),
                    rttBuffer = Nuke.getRT(width * _dpr, height * _dpr, !1);
                if (_rts[width + "_" + height] = {
                        ping: rttPing,
                        pong: rttPong,
                        name: width + "_" + height,
                        buffer: rttBuffer
                    }, _rtStack.push(_rts[width + "_" + height]), _rtStack.length > 3) {
                    let rts = _rtStack.shift();
                    delete _rts[rts.name], rts.ping.dispose(), rts.pong.dispose(), rts.buffer.dispose()
                }
            }
            var rts = _rts[width + "_" + height];
            if (_rttPing = rts.ping, _rttPong = rts.pong, (_rttBuffer = rts.buffer) && _rttBuffer.attachments) {
                _rttBuffer.attachments = [_rttBuffer.attachments[0]];
                for (let i = 0; i < _drawBuffers.length; i++) _rttBuffer.attachments.push(_drawBuffers[i])
            }
        }, _this.attachDrawBuffer = function (texture) {
            if (_drawBuffers.push(texture), _rttBuffer && _rttBuffer.attachments) {
                _rttBuffer.attachments = [_rttBuffer.attachments[0]];
                for (let i = 0; i < _drawBuffers.length; i++) _rttBuffer.attachments.push(_drawBuffers[i])
            }
            return _drawBuffers.length
        }, _this.set("dpr", function (v) {
            _dpr = v || Device.pixelRatio, resizeHandler()
        }), _this.get("dpr", function () {
            return _dpr
        }), _this.get("output", function () {
            return _nukeMesh.material.uniforms ? _nukeMesh.material.uniforms.tDiffuse.value : null
        })
    }, function () {
        var _plane;
        Nuke.getPlaneGeom = function () {
            return _plane || (_plane = new THREE.PlaneBufferGeometry(2, 2, 1, 1)), _plane
        }, Nuke.getRT = function (width, height, multi) {
            return multi ? Utils3D.createMultiRT(width, height) : Utils3D.createRT(width, height)
        }
    }), Class(function NukePass(_fs, _uniforms, _pass) {
        function prefix(code) {
            if (!code) throw `No shader ${_fs} found`;
            let pre = "";
            return pre += "precision highp float;\n", pre += "precision highp int;\n", code.includes("uniform sampler2D tDiffuse") || (pre += "uniform sampler2D tDiffuse;\n", pre += "varying vec2 vUv;\n"), code = pre + code
        }
        Inherit(this, Component);
        var _this = this;
        this.UILPrefix = "string" == typeof _fs ? _fs : Utils.getConstructorName(_fs), this.init = function (fs) {
            if (_this.pass) return;
            _this = this;
            let name = fs || this.constructor.toString().match(/function ([^\(]+)/)[1],
                fragmentShader = Array.isArray(fs) ? fs.join("") : null;
            if (_this.uniforms = _uniforms || {}, _this.uniforms.tDiffuse = {
                    type: "t",
                    value: null
                }, _this.uniforms.unique && (_this.UILPrefix += "_" + _this.uniforms.unique + "_"), window.UILStorage)
                for (let key in _this.uniforms) "unique" !== key && (_this.uniforms[key] = UILStorage.parse(_this.UILPrefix + key) || _this.uniforms[key]);
            _this.pass = new THREE.RawShaderMaterial({
                uniforms: _this.uniforms,
                vertexShader: "\n        precision highp float;\n        precision highp int;\n\n        varying vec2 vUv;\n\n        attribute vec2 uv;\n        attribute vec3 position;\n\n        void main() {\n            vUv = uv;\n            gl_Position = vec4(position, 1.0);\n        }\n        ",
                fragmentShader: fragmentShader || prefix(Shaders.getShader(name + ".fs"))
            }), _this.uniforms = _this.pass.uniforms
        }, this.set = function (key, value) {
            TweenManager.clearTween(_this.uniforms[key]), this.uniforms[key].value = value
        }, this.tween = function (key, value, time, ease, delay, callback, update) {
            return tween(_this.uniforms[key], {
                value: value
            }, time, ease, delay, callback, update)
        }, this.clone = function () {
            return _this.pass || _this.init(_fs), new NukePass(null, null, _this.pass.clone())
        }, "string" == typeof _fs ? _this.init(_fs) : _pass && (_this.pass = _pass, _this.uniforms = _pass.uniforms)
    }), Class(function Raycaster(_camera) {
        function ascSort(a, b) {
            return a.distance - b.distance
        }

        function intersectObject(object, raycaster, intersects, recursive) {
            if (_this.testVisibility) {
                if (!1 === object.visible) return;
                let parent = object.parent;
                for (; parent;) {
                    if (!1 === parent.visible) return;
                    parent = parent.parent
                }
            }
            if (object.raycast && (object.raycast(raycaster, intersects), !0 === recursive)) {
                let children = object.children;
                for (let i = 0, l = children.length; i < l; i++) intersectObject(children[i], raycaster, intersects, !0)
            }
        }

        function intersect(objects) {
            Array.isArray(objects) || (objects = [objects]);
            let intersects = [];
            return objects.forEach(object => {
                intersectObject(object, _raycaster, intersects, !1)
            }), intersects.sort(ascSort), _debug && updateDebug(), intersects
        }

        function updateDebug() {
            let vertices = _debug.geometry.vertices;
            vertices[0].copy(_raycaster.ray.origin.clone()), vertices[1].copy(_raycaster.ray.origin.clone().add(_raycaster.ray.direction.clone().multiplyScalar(1e4))), _debug.geometry.verticesNeedUpdate = !0
        }
        Inherit(this, Component);
        const _this = this;
        let _mouse = new THREE.Vector3,
            _raycaster = new THREE.Raycaster,
            _debug = null;
        this.testVisibility = !0, this.set("camera", function (camera) {
            _camera = camera
        }), this.set("pointsThreshold", function (value) {
            _raycaster.params.Points.threshold = value
        }), this.get("ray", () => _raycaster.ray), this.debug = function (scene) {
            let geom = new THREE.Geometry;
            geom.vertices.push(new THREE.Vector3(-100, 0, 0)), geom.vertices.push(new THREE.Vector3(100, 0, 0));
            let mat = new THREE.LineBasicMaterial({
                color: 16711680
            });
            _debug = new THREE.Line(geom, mat), scene.add(_debug)
        }, this.checkHit = function (objects, mouse) {
            mouse = mouse || Mouse;
            let rect = _this.rect || Stage;
            return mouse === Mouse && rect === Stage ? _mouse.copy(Mouse.tilt) : (_mouse.x = mouse.x / rect.width * 2 - 1, _mouse.y = -mouse.y / rect.height * 2 + 1), _raycaster.setFromCamera(_mouse, _camera), intersect(objects)
        }, this.checkFromValues = function (objects, origin, direction) {
            return _raycaster.set(origin, direction, 0, Number.POSITIVE_INFINITY), intersect(objects)
        }
    }), Class(function ScreenProjection(_camera) {
        Inherit(this, Component);
        var _this = this,
            _v3 = new THREE.Vector3,
            _v32 = new THREE.Vector3,
            _value = new THREE.Vector3;
        this.set("camera", function (v) {
            _camera = v
        }), this.unproject = function (mouse, distance) {
            var rect = _this.rect || Stage;
            _v3.set(mouse.x / rect.width * 2 - 1, -mouse.y / rect.height * 2 + 1, .5), _v3.unproject(_camera);
            var pos = _camera.position;
            _v3.sub(pos).normalize();
            var dist = distance || -pos.z / _v3.z;
            return _value.copy(pos).add(_v3.multiplyScalar(dist)), _value
        }, this.project = function (pos, screen) {
            return screen = screen || Stage, pos instanceof THREE.Object3D ? (pos.updateMatrixWorld(), _v32.set(0, 0, 0).setFromMatrixPosition(pos.matrixWorld)) : _v32.copy(pos), _v32.project(_camera), _v32.x = (_v32.x + 1) / 2 * screen.width, _v32.y = -(_v32.y - 1) / 2 * screen.height, _v32
        }
    }), Class(function Shader(_vertexShader, _fragmentShader, _params) {
        function parseParams() {
            for (let key in _params)
                if ("useShaderMaterial" == key) _this.useShaderMaterial = _params[key];
                else if ("receiveShadow" == key) _this.receiveShadow = _params[key];
            else if ("receiveLight" == key) _this.receiveLight = _params[key];
            else if ("noAttributes" == key) _this.noAttributes = _params[key];
            else if ("defines" == key) _this.defines = _params[key];
            else if ("lights" == key) _this.lights = _params[key];
            else if (void 0 !== _params[key].value) window.UILStorage ? _this.uniforms[key] = UILStorage.parse(_this.UILPrefix + key) || _params[key] : _this.uniforms[key] = _params[key];
            else {
                if ("unique" == key) continue;
                _this.properties[key] = _params[key]
            }
        }

        function parseShaders() {
            _this.vertexShader = process(Shaders.getShader(_vertexShader + ".vs") || _vertexShader, "vs"), _this.fragmentShader = process(Shaders.getShader(_fragmentShader + ".fs") || _fragmentShader, "fs")
        }

        function process(code, type) {
            let header = "";
            _this.useShaderMaterial || _this.receiveShadow ? "fs" == type && (header = ["uniform mat4 modelViewMatrix;"].join("\n")) : header = "vs" == type ? ["precision highp float;", "precision highp int;", _this.noAttributes ? "" : "attribute vec2 uv;", _this.noAttributes ? "" : "attribute vec3 position;", _this.noAttributes ? "" : "attribute vec3 normal;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 modelMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;"].join("\n") : [code.includes("samplerExternalOES") ? "#extension GL_OES_EGL_image_external : require" : "", code.includes("dFdx") ? "#extension GL_OES_standard_derivatives : enable" : "", code.includes(["gl_FragData", "#drawbuffer"]) && World.NUKE.useDrawBuffers && !code.includes("fxlayer") ? "#extension GL_EXT_draw_buffers : require" : "", "precision highp float;", "precision highp int;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 modelMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;"].join("\n"), header += "\n__ACTIVE_THEORY_LIGHTS__\n\n", window.AURA && (header += "#define AURA\n");
            return (code = header + code).replace(/#s?chunk\(\s?(\w+)\s?\);/g, function (a, b) {
                return THREE.ShaderChunk[b] + "\n"
            })
        }

        function addLightingCode() {
            let lightCode = function () {
                if (!_this.receiveLight) return "";
                let numLights = Lighting.getLighting(_this).position.length;
                return 0 == numLights ? (Shader.disableWarnings || console.warn("Lighting enabled but 0 lights added. Be sure to add them before calling shader.material"), "") : [`#define NUM_LIGHTS ${numLights}`, `uniform vec3 lightPos[${numLights}];`, `uniform vec3 lightColor[${numLights}];`, `uniform float lightIntensity[${numLights}];`, `uniform float lightDistance[${numLights}];`, ""].join("\n")
            }();
            _this.vertexShader = _this.vertexShader.replaceAll("__ACTIVE_THEORY_LIGHTS__", lightCode), _this.fragmentShader = _this.fragmentShader.replaceAll("__ACTIVE_THEORY_LIGHTS__", lightCode)
        }

        function updateMaterialLight(lighting) {
            _material.uniforms.lightPos = {
                type: "v3v",
                value: lighting.position
            }, _material.uniforms.lightColor = {
                type: "fv",
                value: lighting.color
            }, _material.uniforms.lightIntensity = {
                type: "fv1",
                value: lighting.intensity
            }, _material.uniforms.lightDistance = {
                type: "fv1",
                value: lighting.distance
            }, _this.startRender(updateLights)
        }

        function updateLights() {
            !1 !== _material.visible && Lighting.update(_this, !0)
        }
        Inherit(this, Component);
        const _this = this;
        let _material;
        this.receiveShadow = !1, this.receiveLight = !1, this.lights = [], this.persists = !1, this.uniforms = {}, this.properties = {}, this.vsName = _vertexShader, this.fsName = _fragmentShader || _vertexShader, "string" != typeof _fragmentShader && (_params = _fragmentShader, _fragmentShader = _vertexShader), _params = _params || {}, _this.UILPrefix = `${_vertexShader}_${_fragmentShader}_${_params.unique?_params.unique+"_":""}`, parseParams(), parseShaders(), this.get("material", function () {
            if (!_material) {
                let params = {};
                if (addLightingCode(), params.vertexShader = _this.vertexShader, params.fragmentShader = _this.fragmentShader, params.uniforms = _this.uniforms, _this.receiveShadow)
                    for (let key in THREE.UniformsLib.lights) params.uniforms[key] = THREE.UniformsLib.lights[key];
                for (let key in _this.properties) params[key] = _this.properties[key];
                (_material = _this.receiveShadow || _this.useShaderMaterial ? new THREE.ShaderMaterial(params) : new THREE.RawShaderMaterial(params)).shader = _this, _this.uniforms = _material.uniforms, _material.defines = _this.defines, _this.receiveLight && updateMaterialLight(_this.__lighting), _this.receiveShadow && (_material.lights = !0, params.vertexShader.includes("dFdx") && (_material.extensions.derivatives = !0))
            }
            return _material
        }), this.set = function (key, value) {
            return void 0 !== value && (_this.uniforms[key].value = value), _this.uniforms[key].value
        }, this.tween = function (key, value, time, ease, delay, callback, update) {
            return tween(_this.uniforms[key], {
                value: value
            }, time, ease, delay, callback, update)
        }, this.getValues = function () {
            let out = {};
            for (let key in _this.uniforms) out[key] = _this.uniforms[key].value;
            return out
        }, this.clone = function () {
            let shader = new Shader(_vertexShader, _fragmentShader, _params);
            shader.receiveLight = _this.receiveLight, shader.receiveShadow = _this.receiveShadow, shader.properties = _this.properties;
            for (let key in _this.uniforms) shader.uniforms[key] = {
                type: _this.uniforms[key].type,
                value: _this.uniforms[key].value
            };
            return shader
        }, this.copyUniformsTo = function (shader) {
            for (let key in _this.uniforms) shader.uniforms[key] = {
                type: _this.uniforms[key].type,
                value: _this.uniforms[key].value
            }
        }, this.updateLighting = function () {
            let lighting = Lighting.getLighting(_this, !0);
            _material.uniforms.lightPos.value = lighting.position, _material.uniforms.lightColor.value = lighting.color, _material.uniforms.lightIntensity.value = lighting.intensity, _material.uniforms.lightDistance.value = lighting.distance
        }, this.onDestroy = function () {
            _this.persists || _material && _material.dispose && _material.dispose()
        }
    }, () => {
        Shader.CustomBasicMaterial = function (vertexShader, fragmentShader, uniforms) {
            function MeshCustomMaterial(parameters) {
                THREE.MeshBasicMaterial.call(this), this.uniforms = THREE.UniformsUtils.merge([THREE.ShaderLib.basic.uniforms, uniforms]), setFlags(this), this.setValues(parameters)
            }

            function setFlags(material) {
                material.vertexShader = Shaders.getShader(vertexShader + ".vs") || vertexShader, material.fragmentShader = Shaders.getShader(fragmentShader + ".fs") || fragmentShader, material.type = "MeshCustomMaterial"
            }
            return "string" != typeof fragmentShader && (uniforms = fragmentShader, fragmentShader = vertexShader), MeshCustomMaterial.prototype = Object.create(THREE.MeshBasicMaterial.prototype), MeshCustomMaterial.prototype.constructor = MeshCustomMaterial, MeshCustomMaterial.prototype.isMeshBasicMaterial = !0, MeshCustomMaterial.prototype.copy = function (source) {
                return THREE.MeshBasicMaterial.prototype.copy.call(this, source), this.uniforms = THREE.UniformsUtils.clone(source.uniforms), setFlags(this), this
            }, MeshCustomMaterial
        }, Shader.CustomStandardMaterial = function (vertexShader, fragmentShader, uniforms) {
            function MeshCustomMaterial(parameters) {
                THREE.MeshStandardMaterial.call(this), this.uniforms = THREE.UniformsUtils.merge([THREE.ShaderLib.standard.uniforms, uniforms]), setFlags(this), this.setValues(parameters)
            }

            function setFlags(material) {
                material.vertexShader = Shaders.getShader(vertexShader + ".vs") || vertexShader, material.fragmentShader = Shaders.getShader(fragmentShader + ".fs") || fragmentShader, material.type = "MeshCustomMaterial"
            }
            return "string" != typeof fragmentShader && (uniforms = fragmentShader, fragmentShader = vertexShader), MeshCustomMaterial.prototype = Object.create(THREE.MeshStandardMaterial.prototype), MeshCustomMaterial.prototype.constructor = MeshCustomMaterial, MeshCustomMaterial.prototype.isMeshStandardMaterial = !0, MeshCustomMaterial.prototype.copy = function (source) {
                return THREE.MeshStandardMaterial.prototype.copy.call(this, source), this.uniforms = THREE.UniformsUtils.clone(source.uniforms), setFlags(this), this
            }, MeshCustomMaterial
        }
    }), Class(function ParticlePhysicsBufferConverter(_geom, _system) {
        Inherit(this, Component);
        var _convert = [],
            _particles = _system.particles;
        _convert.push({
            name: "position",
            props: ["x", "y", "z"],
            size: 3
        }), this.add = function (name, props) {
            let obj = {
                name: name,
                props: props,
                size: props.length
            };
            return _convert.push(obj), obj
        }, this.exec = function () {
            for (var index = 0, p = _particles.start(); p;) {
                for (var i = _convert.length - 1; i > -1; i--) {
                    var obj = _convert[i];
                    if (!obj.disabled) {
                        for (var attribute = _geom.attributes[obj.name], j = 0; j < obj.size; j++) attribute.array[index * obj.size + j] = p[obj.props[j]] || p.pos[obj.props[j]] || 0;
                        attribute.needsUpdate = !0
                    }
                }++index, p = _particles.next()
            }
        }, this.find = function (name) {
            for (let i = 0; i < _convert.length; i++) {
                let obj = _convert[i];
                if (obj.name == name) return obj
            }
        }
    }), Class(function RandomEulerRotation(_container) {
        function initRotation() {
            (_rot = {}).x = Math.random(0, 2), _rot.y = Math.random(0, 2), _rot.z = Math.random(0, 2), _rot.vx = .0025 * Math.random(-5, 5), _rot.vy = .0025 * Math.random(-5, 5), _rot.vz = .0025 * Math.random(-5, 5)
        }
        var _rot, _this = this,
            _euler = ["x", "y", "z"];
        this.speed = 1, initRotation(), this.update = function () {
            for (var time = Render.TIME, i = 0; i < 3; i++) {
                var v = _euler[i];
                switch (_rot[v]) {
                    case 0:
                    case 1:
                        _container.rotation[v] += Math.cos(Math.sin(.25 * time)) * _rot["v" + v] * _this.speed;
                        break;
                    case 2:
                        _container.rotation[v] += Math.cos(Math.cos(.25 * time)) * _rot["v" + v] * _this.speed
                }
            }
        }, this.startRender = function () {
            Render.start(_this.update)
        }, this.stopRender = function () {
            Render.stop(_this.update)
        }, this.onDestroy = function () {
            this.stopRender()
        }
    }), Class(function Utils3D() {
        var _objectLoader, _geomLoader, _bufferGeomLoader, _this = this,
            _textures = {};
        AssetLoader.waitForLib("THREE", () => {
            window.Vector2 || (window.Vector2 = THREE.Vector2, window.Vector3 = THREE.Vector3, window.Vector4 = THREE.Vector4, window.Matrix3 = THREE.Matrix3, window.Matrix4 = THREE.Matrix4, window.Quaternion = THREE.Quaternion), window.Vec2 || (window.Vec2 = THREE.Vector2, window.Vec3 = THREE.Vector3, window.Vec4 = THREE.Vector4, window.Mat3 = THREE.Matrix3, window.Mat4 = THREE.Matrix4, window.Quat = THREE.Quaternion), Hydra.LOCAL || (window.console.warn = function (str, msg) {}, window.console.error = function () {})
        }), this.decompose = function (local, world) {
            local.matrixWorld.decompose(world.position, world.quaternion, world.scale)
        }, this.createDebug = function (size, color) {
            var geom = new THREE.IcosahedronGeometry(size || 40, 1),
                mat = color ? new THREE.MeshBasicMaterial({
                    color: color
                }) : new THREE.MeshNormalMaterial;
            return new THREE.Mesh(geom, mat)
        }, this.createRT = function (width, height, type) {
            var params = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                stencilBuffer: !1,
                type: type
            };
            let rt = new THREE.WebGLRenderTarget(width, height, params);
            return rt.texture.generateMipmaps = !1, rt
        }, this.createMultiRT = function (width, height) {
            var params = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                stencilBuffer: !1
            };
            let rt = new THREE.WebGLMultiRenderTarget(width, height, params);
            return rt.texture.generateMipmaps = !1, rt
        }, this.getFloatType = function () {
            return "android" == Device.system.os ? THREE.FloatType : THREE.HalfFloatType
        }, this.getTexture = function (path) {
            if (!_textures[path]) {
                let texture = new THREE.Texture;
                texture.promise = Promise.create(), texture._dispose = texture.dispose, texture.dispose = function () {
                    delete _textures[path], this._dispose()
                }, _textures[path] = texture, Assets.decodeImage(path).then(imgBmp => {
                    texture.image = imgBmp, texture.needsUpdate = !0, THREE.Math.isPowerOfTwo(imgBmp.width * imgBmp.height) || (texture.minFilter = THREE.LinearFilter), texture.onUpdate = function () {
                        imgBmp.close && imgBmp.close(), texture.onUpdate = null
                    }, texture.promise.resolve(), texture.onload && (texture.onload(), texture.onload = null)
                })
            }
            return _textures[path]
        }, this.setInfinity = function (v) {
            var inf = Number.POSITIVE_INFINITY;
            return v.set(inf, inf, inf), v
        }, this.getCubemap = function (src) {
            var path = "cube_" + (Array.isArray(src) ? src[0] : src);
            if (!_textures[path]) {
                for (var images = [], i = 0; i < 6; i++) {
                    var img = new Image;
                    img.crossOrigin = "", img.src = Assets.getPath(Array.isArray(src) ? src[i] : src), images.push(img), img.onload = function () {
                        _textures[path].needsUpdate = !0
                    }
                }
                let texture = new THREE.Texture;
                texture.image = images, texture.minFilter = THREE.LinearFilter, texture._dispose = texture.dispose, texture.dispose = function () {
                    delete _textures[path], this._dispose()
                }, _textures[path] = texture
            }
            return _textures[path]
        }, this.loadObject = function (name) {
            let json = "object" == typeof name ? name : Assets.JSON[name];
            if ("hydra_c4d" == json.type) {
                let group = new THREE.Group,
                    mat = new THREE.MeshBasicMaterial({
                        wireframe: !0,
                        color: 1044480
                    });
                return json.geometries.forEach(obj => {
                    let data = obj.data,
                        geometry = new THREE.BufferGeometry;
                    geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(data.position), 3)), geometry.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(data.normal), 3)), geometry.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(data.uv), 2));
                    let mesh = new THREE.Mesh(geometry, mat);
                    mesh.position.copy(obj.position), mesh.rotation.x = obj.rotation.x, mesh.rotation.y = obj.rotation.y, mesh.rotation.z = obj.rotation.z, mesh.scale.copy(obj.scale), mesh.name = obj.id, group.add(mesh)
                }), group
            }
            return _objectLoader || (_objectLoader = new THREE.ObjectLoader), _objectLoader.parse(Assets.JSON[name])
        }, this.loadGeometry = function (name) {
            _geomLoader || (_geomLoader = new THREE.JSONLoader), _bufferGeomLoader || (_bufferGeomLoader = new THREE.BufferGeometryLoader);
            var json = Assets.JSON[name];
            return "BufferGeometry" == json.type ? _bufferGeomLoader.parse(json) : _geomLoader.parse(json.data).geometry
        }, this.disposeAllTextures = function () {
            for (var key in _textures) _textures[key].dispose()
        }, this.loadBufferGeometry = function (name) {
            var data = Assets.JSON[name],
                geometry = new THREE.BufferGeometry;
            return data.data && (data = data.data), geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(data.position), 3)), geometry.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(data.normal || data.position.length), 3)), geometry.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(data.uv || data.position.length / 3 * 2), 2)), geometry
        }, this.loadSkinnedGeometry = function (name) {
            var data = Assets.JSON[name],
                geometry = new THREE.BufferGeometry;
            return geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(data.position), 3)), geometry.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(data.normal), 3)), geometry.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(data.uv), 2)), geometry.addAttribute("skinIndex", new THREE.BufferAttribute(new Float32Array(data.skinIndices), 4)), geometry.addAttribute("skinWeight", new THREE.BufferAttribute(new Float32Array(data.skinWeights), 4)), geometry.bones = data.bones.slice(0), geometry
        }, this.loadCurve = function (obj) {
            "string" == typeof obj && (obj = Assets.JSON[obj]);
            for (var data = obj, points = [], j = 0; j < data.length; j += 3) points.push(new THREE.Vector3(data[j + 0], data[j + 1], data[j + 2]));
            return new THREE.CatmullRomCurve3(points)
        }, this.setLightCamera = function (light, size, near, far, texture) {
            light.shadow.camera.left = -size, light.shadow.camera.right = size, light.shadow.camera.top = size, light.shadow.camera.bottom = -size, light.castShadow = !0, near && (light.shadow.camera.near = near), far && (light.shadow.camera.far = far), texture && (light.shadow.mapSize.width = light.shadow.mapSize.height = texture), light.shadow.camera.updateProjectionMatrix()
        }, this.getRepeatTexture = function (src) {
            var texture = this.getTexture(src);
            return texture.onload = function () {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping
            }, texture
        }, this.forceVisible = function (group) {
            let setProperties = obj => {
                void 0 !== obj.visible && (obj.__visible = obj.visible, obj.visible = !0), void 0 !== obj.frustumCulled && (obj.__frustumCulled = obj.frustumCulled, obj.frustumCulled = !1)
            };
            group.children.forEach(child => {
                setProperties(child), child.material && setProperties(child.material), _this.forceVisible(child)
            })
        }, this.resetForceVisible = function (group) {
            let setProperties = obj => {
                void 0 !== obj.__visible && (obj.visible = obj.__visible, delete obj.__visible), void 0 !== obj.__frustumCulled && (obj.frustumCulled = obj.__frustumCulled, delete obj.__frustumCulled)
            };
            group.children.forEach(child => {
                setProperties(child), child.material && setProperties(child.material), _this.resetForceVisible(child)
            })
        }, this.findTexturesByPath = function (path) {
            let array = [];
            for (let key in _textures) key.includes(path) && array.push(_textures[key]);
            return array
        }, this.getHeightFromCamera = function (camera) {
            let dist = camera.position.length(),
                fov = camera.fov;
            return 2 * dist * Math.tan(.5 * Math.radians(fov))
        }, this.getPositionFromCameraSize = function (camera, size) {
            let fov = Math.radians(camera.fov);
            return Math.abs(size / Math.sin(fov / 2))
        }
    }, "static"), Class(function Tracking() {
        function init() {
            Utils.query("tracking") && (_debug = !0, window.gtagConfig || console.warn("gtagConfig required to be set on window to track gtag events.\nE.g. window.gtagConfig = 'UA-XXXXXXXX-X'"))
        }
        Inherit(this, Model);
        let _debug;
        Hydra.ready(init), this.page = function (title, path) {
            if (window.gtag && window.gtagConfig) {
                let data = {};
                title && (data.page_title = title), path && (data.page_path = path), gtag("config", window.gtagConfig, {
                    page_title: title,
                    page_path: path
                }), _debug && console.log(`>>> Track Page: ${title} ${path}`)
            }
        }, this.event = function (category, action, label, value, params) {
            if (window.gtag && window.gtagConfig) {
                let data = {};
                category && (data.event_category = category), action && (data.event_action = action), label && (data.event_label = label), value && (data.value = value), params && (data = Object.assign(params, data)), gtag("event", action, data), _debug && console.log(`>>> Track Event: ${category} ${action} ${label} ${value} ${params}`)
            }
        }, this.redirectToNaked = function () {
            if (window.location.hostname.indexOf("www.") > -1) {
                let referrer = "";
                return document.referrer && document.referrer.length > 0 && (referrer = (window.location.search.indexOf("?") > -1 ? "&" : "?") + "utm_referrer=" + encodeURIComponent(document.referrer)), window.location.href = window.location.protocol + "//" + window.location.hostname.split("www.")[1] + window.location.pathname + window.location.search + referrer, !0
            }
            return !1
        }
    }, "Static"), Class(function UILBase() {
        function initUIL() {
            Global.UIL ? _uil = Global.UIL : (_uil = new UIL.Gui({
                css: "top: 0; right: 50px;",
                size: 300,
                center: !0
            }), Stage.add(_uil), Global.UIL = _uil), addListeners()
        }

        function addListeners() {
            window.addEventListener("contextmenu", openContext), Stage.bind("click", closeContext)
        }

        function openContext() {
            _context && _context.destroy(), _context = new UILContextMenu
        }

        function closeContext() {
            _context && (_context = _context.destroy())
        }
        Inherit(this, Component);
        var _uil, _context;
        Hydra.ready(() => {
            Hydra.LOCAL && (location.search.includes("uil") || location.port > 80) && (Global.UIL_ACTIVE = !0, new AssetLoader(["assets/js/app/modules/uil/_uil.min.js"]), AssetLoader.waitForLib("UIL", initUIL))
        })
    }, "static"), Class(function UILContextMenu() {
        function changePlayground(val) {
            _playground = val, load()
        }

        function changeQuery(query) {
            _query = query, load()
        }

        function load() {
            let loc = window.location.href.split("?")[0].split("#")[0];
            _playground.length ? (loc += `?p=${_playground}`, _query.length && (loc += "&" + _query)) : _query.length && (loc += "?" + _query), window.location = loc
        }

        function reset() {
            window.location = "http://localhost:" + window.location.port
        }
        Inherit(this, Component);
        var _playground = Utils.query("p") || "",
            _query = location.search.split("&")[1] || "",
            _gui = new UIL.Gui({
                width: 300,
                css: `top:${Mouse.y}px; left:${Mouse.x}px;`
            });
        _gui.add("string", {
            name: "Playground",
            value: _playground
        }).onChange(changePlayground), _gui.add("string", {
            name: "Query",
            value: _query
        }).onChange(changeQuery), _gui.add("button", {
            name: "Back to Hydra Root",
            callback: reset
        }), _gui.content.removeChild(_gui.content.children[_gui.content.children.length - 1]), this.onDestroy = function () {
            __body.div.removeChild(_gui.content), _gui.remove()
        }
    }), Class(function UILItem(_name, _value, _params = {}, _callback) {
        function initUIL() {
            if (_this.obj = {
                    name: _name,
                    type: "html",
                    value: _value,
                    callback: callback
                }, _params)
                for (var key in _params) _this.obj[key] = _params[key]
        }

        function callback(v) {
            _value = v, Array.isArray(v) && 1 == v.length && 0 == v[0] && (v = 0), UILStorage.set(_params.prefix + _name, v), _callback && _callback(v)
        }
        Inherit(this, Component);
        var _this = this;
        _params.prefix = _params.prefix ? _params.prefix.slice(0, 100) : "", _value = UILStorage.get(_params.prefix + _name) || _value, "function" == typeof _params && (_callback = _params, _params = null), _callback && _callback(_value), initUIL(), this.clear = function () {
            UILStorage.set(_params.prefix + _name, null)
        }, this.get("value", function () {
            return _value
        })
    }), Class(function UILStorage() {
        function write() {
            Dev.writeFile("assets/data/uil.json", _data), __body.css({
                display: "none"
            }), _this.delayedCall(() => {
                __body.css({
                    display: "block"
                })
            }, 100)
        }
        Inherit(this, Component);
        const _this = this;
        var _data = {};
        Hydra.ready(_ => {
            Hydra.LOCAL && location.search.includes("uil") && __window.bind("keydown", e => {
                (e.ctrlKey || e.metaKey) && 83 == e.keyCode && (e.preventDefault(), write())
            })
        }), this.wait(Assets.JSON, "data/uil", () => {
            _data = Assets.JSON["data/uil"]
        }), this.set = function (key, value) {
            null === value ? delete _data[key] : _data[key] = value
        }, this.setWrite = function (key, value) {
            this.set(key, value), write()
        }, this.clearMatch = function (string) {
            for (let key in _data) key.includes(string) && delete _data[key];
            write()
        }, this.write = function () {
            write()
        }, this.get = function (key) {
            return _data[key]
        }, this.parse = function (key) {
            let data = _data[key];
            return void 0 === data ? null : Array.isArray(data) ? {
                value: (new THREE.Color).setRGB(data[0], data[1], data[2])
            } : {
                value: data
            }
        }
    }, "static"), Class(function MeshUIL() {
        Inherit(this, Component);
        this.add = function (shader) {
            return new MeshUILGroup(shader, Global.UIL)
        }
    }, "static"), Class(function MeshUILGroup(_mesh, _uil) {
        function initVec(key) {
            if (_group) {
                let val = new UILItem(key, _mesh[key].toArray(), {
                    prefix: prefix
                }, val => {
                    _mesh[key].fromArray(val)
                });
                _group.add("number", val.obj)
            }
            let def = "scale" == key ? [1, 1, 1] : [0, 0, 0];
            _mesh[key].fromArray(UILStorage.get(`${prefix}${key}`) || def)
        }
        Inherit(this, Component);
        if (!_mesh.prefix) throw "mesh.prefix required when using MeshUIL";
        var prefix = _mesh.prefix,
            _group = Global.UIL ? Global.UIL.add("group", {
                name: prefix
            }) : null;
        initVec("position"), initVec("scale"), this.initNumber = function initNumber(key, def) {
            if (_group) {
                let val = new UILItem(key, _mesh[key], {
                    prefix: prefix
                }, val => {
                    _mesh[key] = val
                });
                _group.add("number", val.obj)
            }
            _mesh[key] = UILStorage.get(`${prefix}${key}`) || def
        }, this.initColor = function initColor(key) {
            if (_group) {
                let val = new UILItem(key, _mesh[key].getHex(), {
                    prefix: prefix
                }, val => {
                    Array.isArray(val) ? _mesh[key].setRGB(val[0], val[1], val[2]) : _mesh[key].set(val)
                });
                _group.add("color", val.obj)
            }
            _mesh[key].fromArray(UILStorage.get(`${prefix}${key}`) || [1, 1, 1])
        }, this.initVec = initVec
    }), Class(function ShaderUIL() {
        Inherit(this, Component);
        var _groups = [];
        this.add = function (shader) {
            Global.UIL_ACTIVE && this.wait(Global, "UIL", () => {
                let group = new ShaderUILGroup(shader, Global.UIL);
                _groups.push(group)
            })
        }, this.list = function () {
            _groups.forEach(group => group.console())
        }, this.clear = function () {
            _groups.forEach(group => group.clear())
        }
    }, "static"), Class(function ShaderUILGroup(_shader, _uil) {
        function initItems() {
            for (var key in _shader.uniforms) {
                let obj = _shader.uniforms[key];
                obj.ignoreUIL || (obj.value instanceof THREE.Color && createColor(obj, key), "number" == typeof obj.value && createNumber(obj, key))
            }
        }

        function createNumber(obj, key) {
            let val = new UILItem(key, obj.value, {
                prefix: _shader.UILPrefix
            }, val => {
                obj.value = val
            });
            _group.add("number", val.obj), _objects.push({
                key: key,
                obj: obj
            }), _items.push(val)
        }

        function createColor(obj, key) {
            let val = new UILItem(key, obj.value.getHex(), {
                prefix: _shader.UILPrefix
            }, val => {
                Array.isArray(val) ? obj.value.setRGB(val[0], val[1], val[2]) : obj.value.set(val)
            });
            _group.add("color", val.obj), _objects.push({
                key: key,
                obj: obj
            }), _items.push(val)
        }
        Inherit(this, Component);
        var _group = _uil.add("group", {
                name: _shader.UILPrefix.split("_")[0]
            }),
            _objects = [],
            _items = [];
        initItems(), this.console = function () {
            console.log(_shader.UILPrefix), _objects.forEach(obj => {
                "c" == obj.obj.type ? console.log(obj.key, "#" + obj.obj.value.getHexString()) : console.log(obj.key, obj.obj.value)
            }), console.log("----")
        }, this.clear = function () {
            _items.forEach(item => item.clear())
        }
    }), Class(function TimelineUIL() {
        function removeEditor() {
            _editor = _editor.destroy()
        }
        Inherit(this, Component);
        const _this = this;
        var _editor, _created = {};
        this.create = function (name, version) {
            let config = new TimelineUILConfig(name, version, Global.UIL && !_created[name]);
            return Global.UIL && (_created[name] || (_created[name] = config, config.appendUILGroup())), config
        }, this.openEditor = function (name, callbacks) {
            _editor && _editor.destroy(), _editor = new TimelineUILEditor(name, callbacks), _this.events.sub(_editor, Events.COMPLETE, removeEditor)
        }
    }, "static"), Class(function TimelineUILConfig(_name, _version = 1, _store) {
        function updateConfig() {
            _config.version = _version, UILStorage.setWrite("TIMELINE_" + _name + "_config", _config)
        }

        function edit() {
            TimelineUIL.openEditor(_name, _callbacks)
        }
        Inherit(this, Component);
        const _this = this;
        var _callbacks, _config = UILStorage.get("TIMELINE_" + _name + "_config");
        _store && (_callbacks = []), _config ? _config.version != _version && (updateConfig(), UILStorage.clearMatch("TIMELINE_" + _name)) : (_config = {}, updateConfig()), this.add = function (callback, time, name) {
            time = UILStorage.get("TIMELINE_" + _name + "_" + name) || time, _this.delayedCall(callback, time), _store && _callbacks.push({
                name: name,
                time: time
            })
        }, this.appendUILGroup = function () {
            Global.UIL.add("group", {
                name: "TIMELINE_" + _name
            }).add("button", {
                name: "Edit",
                callback: edit
            })
        }
    }), Class(function TimelineUILEditor(_name, _callbacks) {
        function exit() {
            _this.events.fire(Events.COMPLETE)
        }

        function create({
            name: name,
            time: time
        }) {
            _gui.add("string", {
                name: name,
                value: time.toString(),
                fontColor: "#D4B87B",
                height: 20
            }).onChange(val => {
                UILStorage.setWrite("TIMELINE_" + _name + "_" + name, Number(val))
            })
        }
        Inherit(this, Component);
        const _this = this;
        var _gui = new UIL.Gui({
            width: 300,
            css: "top:0px; left:0px;"
        });
        ! function () {
            for (let cb of _callbacks) create(cb);
            _gui.add("button", {
                name: "Exit",
                callback: exit
            })
        }(), this.onDestroy = function () {
            __body.div.removeChild(_gui.content), _gui.remove()
        }
    }), Class(function TweenUIL() {
        function removeEditor() {
            _editor = _editor.destroy()
        }
        Inherit(this, Component);
        const _this = this;
        var _editor, _data = {},
            _created = {};
        this.create = function (name, version = 1) {
            let config = new TweenUILConfig(name, version, Global.UIL && !_created[name]);
            return Global.UIL && (_created[name] || (_created[name] = config, config.appendUILGroup())), config
        }, this.openEditor = function (name, tweens) {
            _editor && _editor.destroy(), _editor = new TweenUILEditor(name, tweens), _this.events.sub(_editor, Events.COMPLETE, removeEditor)
        }, this.set = function (key, value) {
            _data[key] = value
        }, this.get = function (key) {
            return _data[key]
        }
    }, "static"), Class(function TweenUILConfig(_name, _version = 1, _store) {
        function updateConfig() {
            _config.version = _version, UILStorage.setWrite("TWEEN_" + _name + "_config", _config)
        }

        function override(tween, object, props, time, ease, delay) {
            let key = "TWEEN_" + _name + "_" + tween._id,
                storage = UILStorage.get(key),
                obj = {
                    props: props,
                    time: time,
                    ease: ease,
                    delay: delay
                };
            for (let key in storage) obj[key] = storage[key];
            return _store && TweenUIL.set(key, obj), obj
        }

        function edit() {
            TweenUIL.openEditor(_name, _tweens)
        }
        var _tweens, _config = UILStorage.get("TWEEN_" + _name + "_config");
        _store && (_tweens = []), _config ? _config.version != _version && (updateConfig(), UILStorage.clearMatch("TWEEN_" + _name)) : (_config = {}, updateConfig()), this.add = function (tween, name) {
            return tween._id = name || _ids++, tween.overrideValues = override, _tweens && _tweens.push(tween), tween
        }, this.appendUILGroup = function () {
            Global.UIL.add("group", {
                name: "TWEEN_" + _name
            }).add("button", {
                name: "Edit",
                callback: edit
            })
        }
    }), Class(function TweenUILEditor(_name, _tweens) {
        function createGroup(tween) {
            let obj = TweenUIL.get("TWEEN_" + _name + "_" + tween._id),
                group = _gui.add("group", {
                    name: tween._id
                });
            for (let key in obj) createString(obj, key, group, "TWEEN_" + _name + "_" + tween._id);
            group.open()
        }

        function createString(obj, key, group, lookup) {
            let value = obj[key],
                height = "props" == key ? 100 : 20;
            "props" == key && (value = JSON.stringify(value, null, "\t")), group.add("string", {
                name: key,
                value: value.toString(),
                fontColor: "#D4B87B",
                height: height
            }).onChange(val => {
                "props" == key && (val = JSON.parse(val)), "time" != key && "delay" != key || (val = Number(val)), write(lookup, key, val)
            })
        }

        function write(lookup, key, value) {
            let obj = UILStorage.get(lookup) || {};
            obj[key] = value, UILStorage.setWrite(lookup, obj)
        }

        function exit() {
            _this.events.fire(Events.COMPLETE)
        }
        Inherit(this, Component);
        const _this = this;
        var _gui = new UIL.Gui({
            width: 600,
            css: "top:0px; left:0px;"
        });
        this.gui = _gui,
            function () {
                for (let tween of _tweens) createGroup(tween);
                _gui.add("button", {
                    name: "Exit",
                    callback: exit
                })
            }(), this.onDestroy = function () {
                __body.div.removeChild(_gui.content), _gui.remove()
            }
    }), Class(function WiggleBehavior(_position, _angle) {
        Inherit(this, Component);
        var _this = this;
        _angle = _angle || Math.radians(Math.rand(0, 360));
        var _wobble = new Vector3,
            _origin = new Vector3;
        this.target = _wobble, this.scale = 1, this.alpha = .025, this.speed = 1, this.zMove = 2, this.enabled = !0, _position && _origin.copy(_position), this.update = function () {
            if (_this.enabled && !_this.disabled) {
                var t = window.Render ? Render.TIME || Date.now() : Date.now();
                _wobble.x = Math.cos(_angle + t * (75e-5 * _this.speed)) * (_angle + 200 * Math.sin(t * (95e-5 * _this.speed))), _wobble.y = Math.sin(Math.asin(Math.cos(_angle + t * (85e-5 * _this.speed)))) * (150 * Math.sin(_angle + t * (75e-5 * _this.speed))), _wobble.x *= 2 * Math.sin(_angle + t * (75e-5 * _this.speed)), _wobble.y *= 1.75 * Math.cos(_angle + t * (65e-5 * _this.speed)), _wobble.x *= 1.1 * Math.cos(_angle + t * (75e-5 * _this.speed)), _wobble.y *= 1.15 * Math.sin(_angle + t * (25e-5 * _this.speed)), _wobble.z = Math.sin(_angle + .0025 * _wobble.x) * (100 * _this.zMove), _wobble.multiplyScalar(.1 * _this.scale), _wobble.add(_origin), _position && (_this.ease ? _position.interp(_wobble, _this.alpha, _this.ease) : _position.lerp(_wobble, _this.alpha))
            }
        }, this.copyOrigin = function () {
            _origin.copyFrom(_position)
        }, this.startRender = function () {
            Render.start(_this.update)
        }, this.stopRender = function () {
            Render.stop(_this.update)
        }, this.onDestroy = function () {
            Render.stop(_this.update)
        }
    }), Class(function InteractionMask() {
        function initStamp() {
            let shader = _this.initClass(Shader, "InteractionMaskStamp", {
                tMap: {
                    value: Utils3D.getTexture("assets/images/common/dot.png")
                },
                uVelocity: {
                    value: new Vector2
                },
                transparent: !0,
                depthWrite: !1
            });
            (_stamp = new THREE.Mesh(QUAD, shader.material)).frustumCulled = !1, _stamp.shader = shader, _stamp.width = 100 * SCALE, _stamp.height = 94 * SCALE, _stamp.scale.set(_stamp.width, _stamp.height, 1), _this.add(_stamp)
        }

        function initClear() {
            let shader = _this.initClass(Shader, "InteractionMaskClear", {
                transparent: !0,
                depthWrite: !1
            });
            (_clear = new THREE.Mesh(QUAD, shader.material)).frustumCulled = !1, _clear.shader = shader, _clear.scale.setScalar(1e3), _this.add(_clear)
        }

        function loop() {
            _stamp.visible = !1, _clear.visible = !0, _this.draw(), _stage.set(Stage.width, Stage.height), _stamp.visible = !0, _clear.visible = !1, _mouse.lerp(Mouse, 1);
            let delta = _v.subVectors(_mouse, _last).length() / _stage.length();
            _v2.lerp(_v, 1);
            let scale = .4 * Math.range(delta, 0, .005, 0, 1, !0),
                num = Math.range(delta, 0, .18, 1, 10),
                vx = Math.clamp(_v2.x / 15, -1, 1),
                vy = Math.clamp(_v2.y / 15, -1, 1);
            _this.delta.copy(_v2), _this.interactionScale.value += .05 * (Math.range(_this.delta.length(), 4, 5, 0, 1, !0) - _this.interactionScale.value), _stamp.shader.uniforms.uVelocity.value.set(vx, vy);
            let sw = _stamp.width * scale,
                sh = _stamp.height * scale;
            for (let i = 0; i < num; i++) {
                _v2.copy(_last).lerp(_mouse, i / num);
                let x = Math.range(_v2.x, 0, Stage.width, 0, 256),
                    y = Math.range(_v2.y, 0, Stage.height, 0, 256);
                _stamp.scale.set(sw || 1e-4, sh || 1e-4, 1), _stamp.position.set(x, -y, 0), _this.draw()
            }
            _last.copy(_mouse)
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            e.state.includes("alley") ? _this.startRender(loop) : (_this.stopRender(loop), _this.interactionScale.value = 0)
        }
        Inherit(this, InteractionMaskCanvas);
        var _stamp, _clear, _this = this,
            _last = new Vector2,
            _mouse = new Vector2,
            _v = new Vector2,
            _v2 = new Vector2,
            _stage = new Vector2;
        const SCALE = 7,
            QUAD = new THREE.PlaneBufferGeometry(1, 1);
        this.delta = new Vector2, this.interactionScale = {
            value: 0
        }, initStamp(), initClear(), addListeners(), this.stop = function () {
            _this.stopRender(loop)
        }
    }, "singleton"), Class(function InteractionMaskCanvas() {
        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            _camera.left = SIZE / -2, _camera.right = SIZE / 2, _camera.top = SIZE / 2, _camera.bottom = SIZE / -2, _camera.near = .01, _camera.far = 1e3, _camera.updateProjectionMatrix(), _camera.position.x = SIZE / 2, _camera.position.y = -SIZE / 2
        }
        Inherit(this, Component);
        const _this = this;
        var _scene = new THREE.Scene,
            _camera = new THREE.OrthographicCamera(1, 1, 1, 1, .1, 1);
        const SIZE = 256;
        this.rt = Utils3D.createRT(SIZE, SIZE), this.texture = this.rt.texture, _camera.position.z = 1, addListeners(), resizeHandler(), this.add = function (obj) {
            _scene.add(obj)
        }, this.remove = function (obj) {
            _scene.remove(obj)
        }, this.draw = function () {
            let clear = World.RENDERER.autoClear;
            World.RENDERER.autoClear = !1, World.RENDERER.render(_scene, _camera, _this.rt), World.RENDERER.autoClear = clear
        }
    }), Class(function LabelUtil() {
        function findDataByPerma(perma) {
            for (let i = 0; i < _data.length; i++)
                if (_data[i].perma == perma) return _data[i]
        }

        function create(data) {
            return new WorkListTitle(data.name)
        }

        function draw() {
            let perma = "";
            for (; !_labels[perma];) {
                let data = _data[_index];
                if (!data) return _this.finished = !0, void _worker.stop();
                perma = data.perma, _labels[perma] = create(data), _index++
            }
        }
        Inherit(this, Component);
        const _this = this;
        var _worker, _index = 0,
            _data = [],
            _labels = {};
        this.create = async function (data) {
            await AssetLoader.waitForLib("THREE"), data.forEach(d => _data.push(d)), _worker || (_worker = new Render.Worker(draw, 8))
        }, this.findByPerma = function (perma) {
            return _labels[perma] || (_labels[perma] = create(findDataByPerma(perma))), _labels[perma]
        }, this.pause = function () {
            _worker && _worker.pause()
        }, this.complete = function () {
            return !0
        }
    }, "static"), Class(function ProjectionUtil(_section) {
        function initMesh() {
            _mesh = new THREE.Mesh((new THREE.Geometry).fromBufferGeometry(_section.geometry.geometry))
        }

        function project() {
            let hit = _ray.checkHit(_mesh, Mouse);
            if (!hit[0]) return;
            _lastMesh && World.SCENE.remove(_lastMesh);
            let p = hit[0].point,
                camera = World.CAMERA;
            var dir = camera.target.clone();
            dir.sub(camera.position);
            var m = new THREE.Matrix4,
                c = dir.clone();
            c.negate(), c.multiplyScalar(10), c.add(p), m.lookAt(p, c, new Vector3(0, 1, 0)), m = m.extractRotation(m);
            let r = new THREE.Vector3,
                dummy = new THREE.Object3D;
            dummy.rotation.setFromRotationMatrix(m), r.set(dummy.rotation.x, dummy.rotation.y, dummy.rotation.z);
            let s = new THREE.Vector3(14, 10, 10),
                geom = new THREE.DecalGeometry(_mesh, p, r, s, new THREE.Vector3(1, 1, 1)),
                shader = _this.initClass(Shader, "AboutProjection", {
                    tMap: {
                        value: Utils3D.getTexture("assets/images/about/text.png")
                    },
                    depthTest: !0,
                    depthWrite: !1,
                    polygonOffset: !0,
                    polygonOffsetFactor: -4
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            World.SCENE.add(mesh);
            let output = (new THREE.BufferGeometry).fromGeometry(geom).toJSON(),
                values = {};
            ["position", "uv"].forEach(key => {
                let array = [];
                values[key] = array;
                let attrib = output.data.attributes[key].array;
                for (let i = 0; i < attrib.length; i++) array.push(Number(attrib[i].toFixed(3)))
            }), _lastMesh = mesh, Dev.writeFile("assets/data/projection.json?compress", values)
        }
        Inherit(this, Component);
        const _this = this;
        var _mesh, _lastMesh, _ray = new Raycaster(World.CAMERA);
        initMesh(), Stage.bind("click", project)
    }, "singleton"), Class(function Tests() {
        this.bgResolution = function () {
            return 1
        }, this.vfxDOF = function () {
            return !0
        }, this.getAlleyDPR = function () {
            return this.isRecording() || this.isSnapshot() ? 2 : this.fallbackAlley() ? GPU.lt(0) && GPU.OVERSIZED ? .7 : GPU.lt(1) && GPU.OVERSIZED ? .85 : GPU.lt(0) ? 1 : GPU.mobileLT(2) ? 1 : Math.min(Device.pixelRatio, 1.3) : 1
        }, this.getAboutDPR = function () {
            return 1
        }, this.isSnapshot = function () {
            return Utils.query("snapshot")
        }, this.getLightsDPR = function () {
            return this.isRecording() ? 1 : this.getAlleyDPR()
        }, this.getNormalDPR = function () {
            return GPU.OVERSIZED ? .9 : this.isRecording() ? 2 : GPU.mobileGT(2) ? 1.5 : 1
        }, this.getMirrorRes = function () {
            return GPU.lt(3) ? 512 : 1024
        }, this.getFar = function () {
            return 30
        }, this.renderRain = function () {
            return !!this.useVideoTextures() && (!GPU.lt(1) && (!Device.mobile && !(this.fallbackAlley() || !this.renderTreatment())))
        }, this.isRecording = function () {
            return !!Utils.query("record")
        }, this.renderInteraction = function () {
            return !(!this.renderTreatment() || this.isRecording())
        }, this.renderRGB = function () {
            return !this.isRecording()
        }, this.renderTreatment = function () {
            return !0
        }, this.renderFogLight = function () {
            return !this.fallbackAlley()
        }, this.renderMirror = function () {
            return !0
        }, this.fallbackAlley = function () {
            return !!GPU.detect(["gt 650m"]) || ("firefox" == Device.system.browser && "windows" == Device.system.os || ("ie" == Device.system.browser || (!!GPU.lt(1) || !!Device.mobile)))
        }, this.applyTint = function () {
            return !this.fallbackAlley()
        }, this.videoLookupFrames = function () {
            return GPU.lt(3) ? 100 : 5
        }, this.iblLights = function () {
            return !!GPU.gt(2)
        }, this.deferredLighting = function () {
            return !0
        }, this.halfResAlleyVideo = function () {
            return !!GPU.OVERSIZED || (!!GPU.lt(0) || !!GPU.mobileLT(2))
        }, this.halfResVideo = function () {
            return !!GPU.lt(1) || (!!Device.mobile.phone || !!GPU.mobileLT(3))
        }, this.useVideoTextures = function () {
            if (!Utils.query("forceVideo")) {
                if (Device.mobile && !Device.system.browser.includes(["chrome", "safari"])) return !1;
                if ("ios" == Device.system.os && Device.detect("twitter")) return !1
            }
            return !("ie" == Device.system.browser && Device.system.browserVersion <= 11) && !GPU.mobileLT(1)
        }, this.renderHologramLight = function () {
            return !Device.mobile && !GPU.lt(1)
        }, this.simpleUI = function () {
            return !1
        }, this.fallbackWorkVideos = function () {
            return !!GPU.detect(["gt 650m"]) || ("ie" == Device.system.browser || (!!GPU.mobileLT(2) || !!GPU.lt(0)))
        }, this.getWorkGradientRes = function () {
            return .5
        }, this.alwaysRenderWorkBG = function () {
            return (!GPU.mobileLT(2) || "android" != Device.system.os) && ((!GPU.mobileLT(1) || "ios" != Device.system.os) && !GPU.lt(1))
        }, this.showListHolograms = function () {
            return !GPU.mobileLT(1)
        }, this.fillWIL = function () {
            return Device.mobile.phone
        }, this.preventHistory = function () {
            return "ios" == Device.system.os && Device.system.version < 11
        }
    }, "static"), Class(function VideoGen() {
        function initVideos() {
            (_work = _this.initClass(Video, {
                width: 1024,
                height: 1024,
                src: "assets/videos/work-full.mp4",
                loop: !1,
                preload: !1
            })).mute(), _work.texture = new THREE.Texture(_work.div), (_lab = _this.initClass(Video, {
                width: 1024,
                height: 1024,
                src: "assets/videos/lab-full.mp4",
                loop: !1,
                preload: !1
            })).mute(), _lab.texture = new THREE.Texture(_lab.div), _activeVideo = Utils.query("work") ? _work : _lab, _this.events.sub(_activeVideo, Events.COMPLETE, videoComplete)
        }

        function initCanvas() {
            _canvas = _this.initClass(VideoCanvas, 256), _color = _this.initClass(VideoCanvas, 128), _this.texture = _canvas.texture, _this.reducedTexture = _color.texture;
            let shader = _this.initClass(Shader, "ScreenQuad", {
                    tMap: {
                        value: _canvas.texture
                    }
                }),
                mesh = new THREE.Mesh(World.QUAD, shader.material);
            World.SCENE.add(mesh)
        }

        function initThread() {
            (_thread = _this.initClass(Thread)).importScript("assets/js/lib/_colorthief.min.js"), _thread.loadFunction(findColor), _thread.on("color", receiveColor)
        }

        function findColor(e, id) {
            Global.color || (Global.color = new ColorThief);
            Date.now();
            let color = Global.color.getColor(e.pixels, 5);
            emit("color", {
                color: color
            })
        }

        function loop() {
            if (_this.colorValue.lerp(_targetColor, .015), _this.normalizedColor.target.lerp(_targetColor, .02), _this.normalizedColor.target.getHSL(_hsl), _this.normalizedColor.value.setHSL(_hsl.h, .5, .5), _activeVideo.ready()) {
                _activeVideo.texture.needsUpdate = !0;
                let x = _this.active % DIMENSIONS * SIZE,
                    y = Math.floor(_this.active / DIMENSIONS) * SIZE;
                x = 512 - x, y = 512 - y, x -= SIZE / 2, y -= SIZE / 2;
                _canvas.drawImage(_activeVideo.texture, x / 1024, y / 1024, 1.01 * DIMENSIONS), _color.drawImage(_canvas.texture, 0, 0, 1);
                let pixels = _color.getPixels();
                _thread.findColor({
                    transfer: !0,
                    msg: {
                        pixels: pixels,
                        buffers: [pixels.buffer]
                    }
                })
            }
        }

        function videoComplete(e) {
            let obj = {},
                data = _data[_this.active],
                last = "",
                index = 0;
            for (let key in data) {
                let time = Number(Number(key).toFixed(2));
                data[key] == last || index++ % 4 > 0 || (last = data[key], obj[time] = data[key])
            }
            if (_data[_this.active] = obj, _this.active++, _this.active > 24) {
                let name = _activeVideo == _work ? "work" : "lab";
                Dev.writeFile(`assets/data/video-${name}.json?compress`, _data)
            } else _activeVideo.seek(0), _activeVideo.play();
            console.log(_this.active, 25, _this.active / 25)
        }

        function play() {
            _this.startRender(loop), _activeVideo.play()
        }

        function receiveColor(e) {
            let c = e.color;
            _targetColor.setRGB(c[0] / 255, c[1] / 255, c[2] / 255), _data[_this.active] || (_data[_this.active] = {}), _data[_this.active][_activeVideo.time] = _targetColor.getHexString()
        }
        Inherit(this, Component);
        const _this = this;
        var _canvas, _work, _lab, _color, _thread, _activeVideo;
        const DIMENSIONS = 5,
            SIZE = 1024 / DIMENSIONS;
        var _targetColor = new THREE.Color,
            _hsl = {},
            _array = [],
            _data = {};
        this.active = 0, this.colorValue = new THREE.Color, this.color = {
                value: this.colorValue
            }, this.normalizedColor = {
                value: new THREE.Color,
                target: new THREE.Color
            }, this.directColor = _targetColor,
            function () {
                if (Device.graphics.webgl) {
                    for (let i = 0; i < 25; i++) _array.push(i);
                    initVideos(), initCanvas(), initThread(), play()
                }
            }()
    }, "singleton"), Class(function VideoCanvas(_size) {
        function initMesh() {
            VideoCanvas.GEOM || (VideoCanvas.GEOM = new THREE.PlaneBufferGeometry(2, 2)), _rt = Utils3D.createRT(_size, _size), _this.texture = _rt.texture, _shader = _this.initClass(Shader, "VideoCanvas", {
                tMap: {
                    value: null
                },
                uX: {
                    value: 0
                },
                uY: {
                    value: 0
                },
                uScale: {
                    value: 1
                },
                depthWrite: !1
            });
            let mesh = new THREE.Mesh(VideoCanvas.GEOM, _shader.material);
            mesh.frustumCulled = !1, _scene.add(mesh)
        }
        Inherit(this, Component);
        const _this = this;
        var _rt, _shader, _scene = new THREE.Scene,
            _camera = World.CAMERA.clone();
        initMesh(), this.drawImage = function (texture, x, y, scale) {
            _shader.set("tMap", texture), _shader.set("uX", x), _shader.set("uY", y), _shader.set("uScale", scale), World.RENDERER.render(_scene, _camera, _rt)
        }, this.getPixels = function () {
            let buffer = new Uint8Array(_size * _size * 4);
            return World.RENDERER.context.flush(), World.RENDERER.readRenderTargetPixels(_rt, 0, 0, _size, _size, buffer), buffer
        }
    }), Class(function VideoColor() {
        async function initVideos() {
            if (Tests.useVideoTextures() && !Tests.fallbackWorkVideos())(_work = _this.initClass(Video, {
                width: 1024,
                height: 1024,
                src: `assets/videos/work-${Tests.halfResVideo()?"half":"full"}.mp4`,
                loop: !0,
                preload: !1
            })).mute(), Tests.fallbackAlley() || _work.object.attr("autoplay", "autoplay"), _work.texture = new THREE.Texture(_work.div), VideoTextures.instance().append(_work), (_lab = _this.initClass(Video, {
                width: 1024,
                height: 1024,
                src: `assets/videos/lab-${Tests.halfResVideo()?"half":"full"}.mp4`,
                loop: !0,
                preload: !1
            })).mute(), _lab.texture = new THREE.Texture(_lab.div), VideoTextures.instance().append(_lab), "work" == Data.currentState() && _work.object.attr("autoplay", "autoplay"), "lab" == Data.currentState() && _lab.object.attr("autoplay", "autoplay");
            else {
                let ready = !1,
                    lastReady = -1,
                    fakeReady = _ => !!ready && (lastReady != _this.active && (lastReady = _this.active, !0));
                _lab = {
                    play: _ => {},
                    pause: _ => {},
                    seek: _ => {},
                    ready: fakeReady,
                    time: 5
                }, (_work = {
                    play: _ => {},
                    pause: _ => {},
                    seek: _ => {},
                    ready: fakeReady,
                    time: 5
                }).texture = new THREE.Texture, _work.texture.minFilter = _work.texture.magFilter = THREE.LinearFilter, _work.texture.generateMipmaps = !1;
                let canvas = await ImageDecoder.decode("assets/videos/work-still.jpg");
                _work.texture.image = canvas, _work.texture.needsUpdate = !0, _lab.texture = new THREE.Texture, _lab.texture.minFilter = _lab.texture.magFilter = THREE.LinearFilter, _lab.texture.generateMipmaps = !1, canvas = await ImageDecoder.decode("assets/videos/lab-still.jpg"), _lab.texture.image = canvas, _lab.texture.needsUpdate = !0, ready = !0
            }
        }

        function initCanvas() {
            _canvas = _this.initClass(VideoCanvas, 256), _color = _this.initClass(VideoCanvas, 64), _this.texture = _canvas.texture, _this.reducedTexture = _color.texture
        }

        function initThread() {
            (_thread = _this.initClass(Thread)).loadFunction(findColor, loadData), _thread.on("color", receiveColor), _thread.obj = {}, _thread.loadData({
                url: Thread.absolutePath(Assets.getPath("assets/data/video-work.json"))
            }), _thread.loadData({
                url: Thread.absolutePath(Assets.getPath("assets/data/video-lab.json"))
            })
        }

        function findColor(e) {
            let data = Global[e.type];
            if (!data) return;
            data = data[e.video];
            let color = "#ffffff",
                done = _ => emit("color", {
                    color: color
                });
            for (let i = 0; i < data.length; i++) {
                let obj = data[i];
                if (color = "#" + obj.value, obj.time > e.time) return void done()
            }
            done()
        }

        function loadData(e) {
            let name = e.url.split("video-")[1].split(".")[0];
            get(e.url).then(json => {
                for (let index in json) {
                    let video = json[index],
                        data = [];
                    for (let key in video) data.push({
                        time: Number(key),
                        value: video[key]
                    });
                    data.sort((a, b) => a.time - b.time), json[index] = data
                }
                Global[name] = json
            })
        }

        function loop() {
            if (_this.colorValue.lerp(_targetColor, .015), _this.normalizedColor.target.lerp(_targetColor, .1), _this.normalizedColor.target.getHSL(_hsl), _this.normalizedColor.value.setHSL(_hsl.h, .5 * _hsl.s + .25, .5 * _hsl.l + .25), _activeVideo.ready()) {
                _activeVideo.texture.needsUpdate = !0;
                let x = _this.active % DIMENSIONS * SIZE,
                    y = Math.floor(_this.active / DIMENSIONS) * SIZE;
                x = 512 - x, y = 512 - y, x -= SIZE / 2, y -= SIZE / 2;
                _canvas.drawImage(_activeVideo.texture, x / 1024, y / 1024, 1.01 * DIMENSIONS), _color.drawImage(_canvas.texture, 0, 0, 1), _thread.obj.time = _activeVideo.time, _thread.obj.video = _this.active, _thread.obj.type = _activeVideo == _work ? "work" : "lab", _thread.findColor(_thread.obj)
            }
        }

        function play() {
            _this.startRender(loop), _activeVideo.play()
        }

        function pause() {
            _this.stopRender(loop), _activeVideo.pause()
        }

        function swapVideo() {
            _alleyIndex++ >= _array.length - 1 && (_alleyIndex = 0), _this.active = _array[_alleyIndex], startRandom()
        }

        function startRandom() {
            _random = _this.delayedCall(swapVideo, RANDOM_TIME)
        }

        function stopRandom() {
            clearTimeout(_random)
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            switch (e.state) {
                case "alley/about":
                case "alley/alley":
                    _brightnessScale = .5, !e.state.includes("about") && Tests.fallbackAlley() || (_activeVideo && _activeVideo.pause(), _activeVideo = _work, play(), startRandom());
                    break;
                case "work/list":
                    Model = "work" == e.type ? Data.Work : Data.Lab, _brightnessScale = 1, e.type && (_activeVideo && _activeVideo.pause(), _activeVideo = "work" == e.type ? _work : _lab), play(), stopRandom();
                    break;
                case "work/detail":
                    e.type && (_activeVideo && _activeVideo.pause(), _activeVideo = "work" == e.type ? _work : _lab), pause(), stopRandom()
            }
        }

        function receiveColor(e) {
            let lightness = 0,
                data = Model.findByVideo(_this.active);
            data && (lightness = Number(data.brightness) * _brightnessScale || 0), _targetColor.set(e.color), _targetColor.offsetHSL(0, 0, lightness)
        }
        Inherit(this, Component);
        const _this = this;
        var _canvas, _work, _lab, _color, _thread, _random, _activeVideo;
        const DIMENSIONS = 5,
            SIZE = 1024 / DIMENSIONS,
            RANDOM_TIME = 5e3;
        Tests.videoLookupFrames();
        var Model = Data.Work,
            _targetColor = new THREE.Color,
            _hsl = {},
            _array = [21, 6, 11, 12, 13, 14, 15, 0, 1, 3, 5, 8, 7, 10, 18],
            _alleyIndex = 0,
            _brightnessScale = .5;
        this.active = 0, this.colorValue = new THREE.Color, this.color = {
            value: this.colorValue
        }, this.normalizedColor = {
            value: new THREE.Color,
            target: new THREE.Color
        }, this.directColor = _targetColor, Device.graphics.webgl && (initVideos(), initCanvas(), initThread(), addListeners()), this.change = function (index) {
            _this.active = index
        }
    }, "singleton"), Class(function VideoTextures() {
        function VideoTexture(_data) {
            async function initLogo() {
                let texture = new THREE.Texture;
                texture.generateMipmaps = !1, texture.minFilter = texture.magFilter = THREE.LinearFilter, _this.brandTexture = texture;
                let canvas = await ImageDecoder.decode(_data.brand, "ios" == Device.system.os);
                texture.image = canvas, texture.needsUpdate = !0
            }

            function loop() {
                _this.fallback || _video.div.readyState == _video.div.HAVE_ENOUGH_DATA && (_videoTexture.needsUpdate = !0, _this.texture.value = _videoTexture, _imgTexture && (_imgTexture = _imgTexture.dispose()))
            }
            Inherit(this, Component);
            const _this = this;
            var _video, _videoTexture, _imgTexture;
            this.texture = {
                value: null
            }, async function () {
                if (_imgTexture = new THREE.Texture, _imgTexture.minFilter = _imgTexture.magFilter = THREE.LinearFilter, _imgTexture.generateMipmaps = !1, Tests.useVideoTextures()) {
                    (_video = new Video({
                        width: 1024,
                        height: 560,
                        src: _data.video,
                        preload: !1,
                        loop: !0
                    })).div.crossOrigin = "anonymous", _video.mute(), $this.add(_video), _video.object.hide(), (_videoTexture = new THREE.Texture(_video.div)).minFilter = _videoTexture.magFilter = THREE.LinearFilter, _videoTexture.generateMipmaps = !1, _this.texture.value = _videoTexture, await Data.readyLoadThumbs();
                    let canvas = await ImageDecoder.decode(_data.video.replace("mp4", "jpg"), "ios" == Device.system.os);
                    try {
                        _imgTexture.image = canvas, _imgTexture.needsUpdate = !0, _this.texture.value = _imgTexture
                    } catch (e) {}
                    initLogo()
                } else {
                    _this.fallback = !0;
                    let canvas = await ImageDecoder.decode(_data.image, "ios" == Device.system.os);
                    _imgTexture.image = canvas, _imgTexture.needsUpdate = !0, _this.texture.value = _imgTexture, initLogo()
                }
            }(), this.play = function () {
                _video && (_this.load(), _video.play(), _this.startRender(loop), _video.object.show())
            }, this.pause = function () {
                _video && (_video.pause(), _video.src = "", _video.src = _data.video, _this.stopRender(loop), _video.object.hide())
            }, this.load = function () {
                _video && (_this.flag("loaded") || (_video.div.load(), _this.flag("loaded", !0)))
            }
        }
        Inherit(this, Element);
        var $this = this.element,
            _videos = {};
        Device.graphics.webgl && ($this.setZ(-1), Stage.add($this)), this.create = async function (data) {
            if (Device.graphics.webgl) return await AssetLoader.waitForLib("THREE"), _videos[data.perma] = new VideoTexture(data), _videos[data.perma]
        }, this.getVideo = function (perma) {
            return _videos[perma]
        }, this.append = function (video) {
            $this.add(video)
        }
    }, "singleton"), Class(function VideoToTexture(_path, width = 1920, height = 1080) {
        function loop() {
            _video.ready() && (_this.texture.needsUpdate = !0)
        }
        Inherit(this, Component);
        const _this = this;
        var _video;
        (_video = _this.initClass(Video, {
            src: _path,
            width: width,
            height: height,
            loop: !0,
            preload: Tests.fallbackAlley()
        })).mute(), _this.texture = new THREE.Texture(_video.div), _this.texture.minFilter = _this.texture.magFilter = THREE.LinearFilter, _this.texture.generateMipmaps = !1, _this.video = _video, this.set("src", src => {
            src.includes(".") || (src += "." + Device.media.video), _video.div.src != src && (_video.div.src = src, FX.Logo.instance().glitch())
        }), this.start = function () {
            _video.play(), _this.startRender(loop)
        }, this.stop = function () {
            _video.pause(), _this.stopRender(loop)
        }
    }), Data.Class(function Content(_type) {
        function findByPerma(perma) {
            for (let i = 0; i < _data.length; i++)
                if (_data[i].perma == perma) return _data[i]
        }

        function findByOffset(offset) {
            let index = _index + offset;
            return index < 0 && (index = _data.length - 1), index == _data.length && (index = 0), _data[index]
        }
        Inherit(this, Model);
        var _data, _index = 0,
            _videoReference = {};
        this.type = _type, this.init = function (data) {
            data && (_data = data, LabelUtil.create(data), _data.forEach(async (data, i) => {
                data.video.length && data.active || _data.remove(data)
            }), _data.forEach(async (data, i) => {
                if (data.index = i, _videoReference[Number(data.video_offset)] = data, !data.videoTexture) {
                    let videoTexture = await VideoTextures.instance().create(data);
                    data.videoTexture = videoTexture
                }
            }))
        }, this.find = function (perma, dir) {
            if (void 0 === dir) return findByPerma(perma); {
                let current = findByPerma(perma),
                    data = _data[current.index + dir];
                return data || (data = -1 == dir ? _data[_data.length - 1] : _data[0]), data
            }
        }, this.getPrev = function () {
            return findByOffset(-1)
        }, this.getCurrent = function () {
            return findByOffset(0)
        }, this.getNext = function () {
            return findByOffset(1)
        }, this.select = function (perma) {
            _index = findByPerma(perma).index
        }, this.getData = function () {
            return _data
        }, this.findByVideo = function (index) {
            return _videoReference[index + 1]
        }, this.findByIndex = function (index) {
            return _data[index]
        }
    }), Class(function About() {
        function initSEO() {
            ($seo = $("About", "section")).html("\n        <h1>ABOUT</h1>\n        <p>We’re pushing the future of Web Technology.<br/>\n\n        The web is a powerful, frictionless and evolving platform that we use to tell engaging and visually rich stories. Our websites, apps, installations, VR and AR experiences are all grounded in cross-platform JavaScript.<br/>\n\n        We're a small, tightly integrated team that focuses on performance, efficiency and attention to detail. Since opening in 2012, we have iterated on a toolset that encourages iterative collaboration between designers and developers in order to create award-winning work.\n        ")
        }
        Inherit(this, Object3D);
        const _this = this;
        var _view, $seo;
        initSEO(), (_view = _this.initClass(AboutView)).visible = !1, this.activate = function () {
            _this.group.visible = !0, _view.visible = !0, SEO.add($seo), _view.animateIn(), Data.setState("about"), Data.setTitle("About / Stf Kolev"), AboutCamera.instance().animateIn(), Camera.instance().use(AboutCamera.instance())
        }, this.animateOut = function () {
            _view.animateOut(), AboutCamera.instance().animateOut()
        }, this.deactivate = function () {
            _this.group.visible = !1, _view.visible = !1, SEO.remove($seo)
        }, this.prerender = async function () {
            let promise = Promise.create();
            return _this.events.fire(ATEvents.INTERNAL_STATE, {
                state: "alley/about"
            }), _this.flag("prerendered") ? Promise.resolve() : (await AlleyLoader.instance().aboutReady(), Data.setState("about"), Data.setTitle("About / Stf Kolev"), Tracking.page("About", "/about"), _this.group.visible = !0, Utils3D.forceVisible(_this.group), setTimeout(_ => {
                Utils3D.resetForceVisible(_this.group), promise.resolve(), _this.flag("prerendered", !0)
            }, 250), promise)
        }
    }), Class(function AboutCamera() {
        function initGroups() {
            Mobile.Accelerometer.capture(), (_g2 = new THREE.Group).add(_camera), (_g1 = new THREE.Group).wiggle = new WiggleBehavior(_g1.position), _g1.wiggle.startRender(), _g1.wiggle.scale = .025 * .2 * _this.scale, _g1.wiggle.speed = .5 * _this.scale, _g1.wiggle.zMove = 0, _g1.add(_g2), (_g0 = new THREE.Group).position.set(2, -.9, 10), _g0.rotation.x = Math.radians(12), _g0.rotation.y = Math.radians(7), _g0.add(_g1)
        }

        function loop() {
            _mouse.lerp(Mouse.tilt, .2), Device.mobile && (_mouse.x = -Math.range(Mobile.Accelerometer.x, -4, 4, -1, 1, !0), _mouse.y = Math.range(Mobile.Accelerometer.y, -4, 4, -1, 1, !0)), _mouse2.lerp(_mouse, .2), Device.mobile || (_targetPosition.x = .12 * _mouse2.x * _this.scale, _targetPosition.y = .05 * _mouse2.y * _this.scale), _g2.position.lerp(_targetPosition, .1), _g0.updateMatrixWorld(), Utils3D.decompose(_camera, _this.worldCamera)
        }
        Inherit(this, Component);
        var _g0, _g1, _g2, _this = this,
            _targetPosition = new Vector3,
            _camera = new THREE.PerspectiveCamera,
            _mouse = new Vector2,
            _mouse2 = new Vector2;
        this.scale = 1, this.fov = 25, this.worldCamera = new THREE.PerspectiveCamera, this.worldCamera.fov = 25, initGroups(), _this.startRender(loop), this.animateIn = function () {
            _g0.position.y = 2, tween(_g0.position, {
                y: -.8
            }, 1200, "easeOutCubic")
        }, this.animateOut = function () {
            tween(_g0.position, {
                y: -2
            }, 1200, "easeInOutCubic")
        }
    }, "singleton"), Class(function Alley() {
        function initView() {
            (_alley = _this.initClass(FALLBACK ? AlleyVideo : AlleyView)).visible = !1, _this.loaded = !0, FALLBACK || ((_video = _this.initClass(AlleyVideo)).visible = !1, _video.group.visible = !1)
        }

        function initSEO() {
            ($seo = $("Home", "section")).html("\n        <h1>Stf Kolev</h1>\n        <p>Stf Kolev is a designer creative digital experiences. I'm pushing the future of web technology.</p>\n        ")
        }

        function resizeHandler() {
            GPU.gt(4) || FALLBACK || !_video || (Math.max(Stage.width, Stage.height) > 1700 ? (_alley.group.visible = !1, _video.group.visible = !0, _video.show(), VFX.instance().fallbackTreatment(), AlleyCamera.instance().scale = 0) : (_alley.group.visible = !0, _video.group.visible = !1, _video.hide(), AlleyCamera.instance().scale = 1, VFX.instance().restoreTreatment()))
        }
        Inherit(this, Object3D);
        const _this = this;
        var _alley, _video, _ui, $seo;
        const FALLBACK = Tests.fallbackAlley();
        !async function () {
            initSEO(), await AlleyLoader.instance().ready(), initView(), _this.group.visible = !1
        }(), this.activate = async function () {
            SEO.add($seo), await AlleyLoader.instance().ready(), Data.setTitle("Stf Kolev"), resizeHandler(), _this.events.sub(Events.RESIZE, resizeHandler), _this.group.visible = !0, _alley.visible = !0, _alley.animateIn && _alley.animateIn(), _video && _video.animateIn(), _ui = _this.initClass(AlleyUI), _this.delayedCall(_ui.animateIn, 3500), AlleyCamera.instance().animateIn(), Camera.instance().use(AlleyCamera.instance()), FX.Logo.instance().animateIn()
        }, this.animateOut = function () {
            _video && _video.animateOut(), _ui && _ui.animateOut(function () {
                _ui = _ui.destroy()
            }), _alley.animateOut && _alley.animateOut(), AlleyCamera.instance().animateOut(), FX.Logo.instance().animateOut()
        }, this.deactivate = function () {
            _this.group.visible = !1, _alley.visible = !1, _this.events.unsub(Events.RESIZE, resizeHandler), SEO.remove($seo)
        }, this.prerender = async function () {
            let promise = Promise.create();
            return _this.events.fire(ATEvents.INTERNAL_STATE, {
                state: "alley/alley"
            }), _this.flag("prerendered") ? Promise.resolve() : (await AlleyLoader.instance().ready(), Data.setState("home"), Data.setTitle("Stf Kolev"), Tracking.page("Home", "/home"), _this.group.visible = !0, Utils3D.forceVisible(_this.group), setTimeout(_ => {
                Utils3D.resetForceVisible(_this.group), promise.resolve(), LabelUtil.pause(), _this.flag("prerendered", !0)
            }, 100), promise)
        }
    }), Class(function AlleyCamera() {
        function initGroups() {
            (_g2 = new THREE.Group).add(_camera), (_g1 = new THREE.Group).wiggle = new WiggleBehavior(_g1.position), _g1.wiggle.startRender(), _g1.wiggle.scale = .0075 * _this.scale, _g1.wiggle.speed = .5 * _this.scale, _g1.wiggle.zMove = 0, _g1.add(_g2), (_g0 = new THREE.Group).position.set(0, 2, 10), _g0.add(_g1)
        }

        function loop() {
            _mouse.lerp(Mouse.tilt, .25), _mouse2.lerp(_mouse, .25), _targetPosition.x = .4 * _mouse2.x * _this.scale, _targetPosition.y = .4 * _mouse2.y * _this.scale, _g2.position.lerp(_targetPosition, .1), _g2.lookAt(_lookAt), _g0.updateMatrixWorld(), Utils3D.decompose(_camera, _this.worldCamera)
        }
        Inherit(this, Component);
        var _g0, _g1, _g2, _this = this,
            _lookAt = new Vector3(0, 0, 100),
            _targetPosition = new Vector3,
            _camera = new THREE.PerspectiveCamera,
            _mouse = new Vector2,
            _mouse2 = new Vector2;
        this.scale = Tests.fallbackAlley() ? 0 : 1, this.worldCamera = new THREE.PerspectiveCamera, initGroups(), _this.startRender(loop), this.animateIn = function () {
            _g0.position.y = 6, tween(_g0.position, {
                y: 2
            }, 3e3, "easeOutCubic")
        }, this.animateOut = function () {
            tween(_g0.position, {
                y: -2
            }, 2500, "easeInOutCubic")
        }
    }, "singleton"), Class(function AlleyColors() {
        function initUIL(key, color) {
            let val = new UILItem(key, color.getHex(), {
                prefix: key
            }, val => {
                Array.isArray(val) ? color.setRGB(val[0], val[1], val[2]) : color.set(val)
            });
            _group.add("color", val.obj)
        }

        function createSteps(array) {
            for (let i = 0; i < STEPS; i++) {
                let color = new THREE.Color;
                color.copy(_color0).lerp(_color1, i / STEPS), array.push(color)
            }
        }
        Inherit(this, Component);
        const _this = this;
        var _color0 = new THREE.Color,
            _color1 = new THREE.Color,
            _colors = [],
            _origin = [],
            _group = Global.UIL ? Global.UIL.add("group", {
                name: "AlleyLightColors"
            }) : null;
        this.color0 = {
            value: _color0
        }, this.color1 = {
            value: _color1
        };
        const STEPS = 2;
        Global.UIL ? (initUIL("AlleyColors0", _color0), initUIL("AlleyColors1", _color1)) : (_color0.fromArray(UILStorage.get("AlleyColors0AlleyColors0") || [1, 1, 1]), _color1.fromArray(UILStorage.get("AlleyColors1AlleyColors1") || [1, 1, 1])), createSteps(_colors), _origin = _colors.slice(0), this.getRandom = function () {
            return _colors.random()
        }, this.transition = function (color0 = _color0, color1 = _color1) {
            let array = [];
            createSteps(array), _this.tween && _this.tween.stop && _this.tween.stop();
            let t = {
                value: 0
            };
            _this.tween = tween(t, {
                value: 1
            }, 500, "easeOutCubic").onUpdate(_ => {
                for (let i = 0; i < _colors.length; i++) _colors[i].copy(_origin[i]).lerp(array[i], t.value)
            })
        }
    }, "singleton"), Class(function AlleyLoader() {
        async function initThreads() {
            for (let i = 0; i < 5; i++) loadOnThread(i)
        }

        function loadOnThread(i) {
            let thread = new Thread;
            thread.importScript("assets/js/lib/three.min.js"), thread.loadFunction(loadAndParse, getCurve);
            let geometry = Thread.absolutePath(Assets.getPath(`assets/geometry/sections/${i}/geometry.json`)),
                curves = Thread.absolutePath(Assets.getPath(`assets/geometry/sections/${i}/curves.json`));
            thread.loadAndParse({
                geometry: geometry,
                curves: curves
            }).then(async data => {
                await AssetLoader.waitForLib("THREE");
                let geom = new THREE.BufferGeometry;
                geom.addAttribute("position", new THREE.BufferAttribute(new Float32Array(data.position), 3)), geom.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(data.normal), 3)), _this.geometry[i] = geom;
                let tube = new THREE.BufferGeometry;
                tube.addAttribute("position", new THREE.BufferAttribute(new Float32Array(data.tubePos), 3)), tube.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(data.tubeNormal), 3)), _this.tubes[i] = tube, _this.loaded = !0;
                for (let ix = 0; ix < 5; ix++) _this.geometry[ix] || (_this.loaded = !1);
                5 == i && (_aboutPromise || (_aboutPromise = Promise.create()), _aboutPromise.resolve()), thread.destroy()
            })
        }

        function loadAndParse(e, id) {
            (async _ => {
                let [geom, curve] = await Promise.all([get(e.geometry), get(e.curves)]), position = new Float32Array(geom.position), normal = new Float32Array(geom.normal), geometry = null, data = curve.curves;
                for (let i = 0; i < data.length; i++) {
                    let tubeGeom = getCurve(data[i]);
                    0 === i ? geometry = tubeGeom : geometry.merge(tubeGeom)
                }
                let tubePos = geometry.attributes.position.array,
                    tubeNormal = geometry.attributes.normal.array;
                resolve({
                    position: position,
                    normal: normal,
                    tubePos: tubePos,
                    tubeNormal: tubeNormal
                }, id, [position.buffer, normal.buffer, tubePos.buffer, tubeNormal.buffer])
            })()
        }

        function getCurve(data) {
            let points = [];
            for (let j = 0; j < data.length; j += 3) points.push(new THREE.Vector3(data[j], data[j + 1], data[j + 2]));
            let curve = new THREE.CatmullRomCurve3(points);
            curve.tension = .9;
            let length = 0;
            curve.points.forEach((p, i) => {
                i && (length += p.distanceTo(curve.points.last()), length += p.distanceTo(curve.points[i]))
            }), curve.length = length;
            let segments = Math.ceil(length / .6 * .6);
            return (new THREE.BufferGeometry).fromGeometry(new THREE.TubeGeometry(curve, segments, .02, 3))
        }
        Inherit(this, Component);
        const _this = this;
        var _aboutPromise;
        this.geometry = {}, this.tubes = {};
        const ENABLED = !Tests.fallbackAlley();
        ENABLED && initThreads(), this.ready = function () {
            return ENABLED ? this.wait(_this, "loaded") : Promise.resolve()
        }, this.loadAbout = function () {
            loadOnThread(5)
        }, this.aboutReady = function () {
            return _aboutPromise || (_aboutPromise = Promise.create()), _aboutPromise
        }
    }, "singleton"), Class(function AlleyScreens() {
        async function initVideo() {
            _lightTexture = new THREE.Texture;
            let canvas = _this.initClass(Canvas, 16, 16),
                img = Assets.loadImage("assets/images/_temp/uv.jpg");
            await img.loadPromise(), canvas.context.drawImage(img, 0, 0, canvas.width, canvas.height), _lightTexture.image = canvas.div, _lightTexture.needsUpdate = !0
        }
        Inherit(this, Component);
        const _this = this;
        var _lightTexture;
        initVideo(), this.getLightMap = function () {
            return {
                value: _lightTexture
            }
        }
    }, "singleton"), Class(function Camera(_worldCamera) {
        function loop() {
            _locked && (_worldCamera.position.copy(_locked.position), _worldCamera.quaternion.copy(_locked.quaternion))
        }
        Inherit(this, Component);
        var _locked;
        this.startRender(loop), this.use = function (camera) {
            World.CAMERA.fov = camera.fov || 70, World.CAMERA.updateProjectionMatrix(), _locked = camera.worldCamera || camera
        }
    }, "singleton"), Class(function Container() {
        function initHTML() {
            $this.css({
                position: "static"
            }).setZ(0), Stage.add($this)
        }

        function initLoader() {
            _loader = _this.initClass(Loader), _this.events.sub(_loader, Events.READY, initView), _this.events.sub(_loader, Events.COMPLETE, loadComplete)
        }

        function getState() {
            return (Data.currentState() || "home").split("/")[0]
        }

        function getViewFromState(state) {
            switch (state) {
                case "about":
                    return About;
                case "lab":
                case "work":
                    return Work;
                default:
                    return Alley
            }
        }
        async function initView() {
            World.instance(), $this.add(World.ELEMENT);
            let state = getState();
            _active = await getView(state, !0)
        }
        async function getView(state, first) {
            Data.lock(), GLUI.PREVENT_INTERACTION = !0, UI.instance().animateOut(), _active && _active.animateOut && _active.animateOut();
            let completeTransition = await VFX.instance().transition(_active instanceof Alley ? 2e3 : 1e3);
            _active && _active.deactivate(), Stage.css("cursor", "auto");
            let view = _views[state] || _this.initClass(getViewFromState(state), Data[state.capitalize()]);
            return World.SCENE.add(view.group), Device.graphics.webgl && await view.prerender(), _loader && _loader.complete(), completeTransition(), view.activate(), view.state = state, _views[state] = view, UI.instance().animateIn(state), GLUI.PREVENT_INTERACTION = !1, _this.delayedCall(_ => Data.unlock(), 250), view
        }

        function addListeners() {
            _this.events.sub(ATEvents.EXTERNAL_STATE, externalState)
        }
        async function externalState(e) {
            if (!_active) return;
            let state = getState();
            _active.state != state && (_active = await getView(state))
        }

        function loadComplete() {
            _loader = _loader.destroy()
        }
        Inherit(this, Element);
        const _this = this,
            $this = this.element;
        var _active, _loader, _views = {};
        initHTML(), initLoader(), addListeners()
    }, "singleton"), Class(function Fallback() {
        function initHTML() {
            ($this = _this.element).size("100%").bg("#eee"), Stage.add($this), ($wrapper = $this.create(".wrapper")).size(400, 440).center().css({
                textAlign: "center"
            })
        }

        function initLogo() {
            ($logo = $wrapper.create(".logo")).size(270, 270).bg("assets/images/fallback/logo.png"), $logo.css({
                position: "relative",
                display: "block",
                margin: "0 auto"
            })
        }

        function initCopy() {
            ($copy = $wrapper.create(".text")).fontStyle("NexaBold", 14, "#999"), $copy.css({
                position: "relative",
                letterSpacing: 1,
                marginTop: 40,
                display: "block",
                lineHeight: 22,
                textAlign: "center",
                textTransform: "uppercase"
            });
            let text = 'Sorry, but your browser is out of date<br/>Please <a href="http://www.google.com/chrome/">download a better one</a>';
            Device.mobile && (text = "Your device's OS is out of date,<br/>please visit on a computer."), $copy.html(text + '<br/><br/>EMAIL ME: <a href="mailto:inkyzfx@gmail.com">INKYZFX@GMAIL.COM</a>')
        }

        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize)
        }

        function resize() {
            $wrapper.scale = Math.range(Stage.width, 0, 450, 0, 1, !0), $wrapper.transform()
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $wrapper, $logo, $copy;
        initHTML(), initLogo(), initCopy(), addHandlers(), this.animateIn = function () {}
    }, "singleton"), Class(function Loader() {
        function initView() {
            $this.css({
                position: "static"
            }), _view = _this.initClass(LoaderView)
        }

        function getState() {
            return (Data.currentState() || "home").split("/")[0]
        }

        function initLoader() {
            let assets = Assets.list();
            assets.exclude(["geometry.json", "curves.json", "data/video-"]);
            let section = getState().split("/")[0];
            assets.filter(["three", "shaders", "geometry", "data", section, "ui"]), AlleyLoader.instance(), AlleyLoader.instance().loadAbout();
            let loader = _this.initClass(AssetLoader, assets);
            loader.add(2), Data.ready().then(_ => loader.trigger(1)), FontLoader.loadFonts("Muncie", _ => loader.trigger(1)), _this.events.sub(loader, Events.PROGRESS, _view.progress), _this.events.sub(_view, Events.COMPLETE, complete)
        }
        async function complete() {
            for (let key in Assets.JSON)
                if (key.includes("combined"))
                    for (let k in Assets.JSON[key]) Assets.JSON[`${key.split("combined")[0]}${k}`] = Assets.JSON[key][k];
            Data.readyToLoadThumbs = !0, _this.events.fire(Events.READY)
        }
        Inherit(this, Element);
        const _this = this,
            $this = _this.element;
        var _view;
        initView(), initLoader(), this.complete = function () {
            _view.animateOut(_ => {
                AssetLoader.loadAllAssets(), _this.events.fire(Events.COMPLETE)
            })
        }
    }), Class(function Playground() {
        function initThree() {
            Data.readyToLoadThumbs = !0, World.instance(), Stage.add(World.ELEMENT)
        }
        async function initView() {
            let request = Global.PLAYGROUND.split("/")[0],
                view = window["Playground" + request] || window[request] || null;
            if (!view) throw `No Playground class ${request} found.`;
            (_view = view.instance ? view.instance() : _this.initClass(view)).element && Stage.add(_view.element), World.SCENE.add(_view.group || _view.mesh || _view.object3D || new THREE.Group), _view.prerender && (await _view.prerender(), _view.activate && _view.activate()), Dev.expose("view", _view)
        }
        Inherit(this, Component);
        const _this = this;
        let _view;
        ! function () {
            for (let key in Assets.JSON)
                if (key.includes("combined"))
                    for (let k in Assets.JSON[key]) Assets.JSON[`${key.split("combined")[0]}${k}`] = Assets.JSON[key][k];
            Global.PLAYGROUND = Utils.query("p"), initThree(), initView(), defer(window.onresize)
        }()
    }, "singleton"), Class(function SEO() {
        function initHTML() {
            $this = $("TextContent"), __body.div.prepend($this.div), Device.graphics.webgl ? $this.css({
                left: 99999,
                position: "absolute"
            }) : __body.removeChild(Stage, !0)
        }

        function initNav() {
            let base = location.protocol + "//" + location.hostname;
            _this.BASE = base, $this.create("nav", "nav").html(`\n        <ul>\n            <li><a href="${base}/home">Home</a></li>\n            <li><a href="${base}/work">Work</a></li>\n            <li><a href="${base}/lab">Lab</a></li>\n            <li><a href="${base}/about">About</a></li>\n        </ul>\n        `)
        }
        Inherit(this, Component);
        const _this = this;
        var $this;
        !async function () {
            await Hydra.ready(), initHTML(), initNav()
        }(), this.add = function ($obj) {
            $this.add($obj)
        }, this.remove = function ($obj) {
            $this.removeChild($obj, !0)
        }
    }, "static"), Class(function UI() {
        function initHTML() {
            ($this = _this.element).css({
                position: "static"
            }).setZ(5), Stage.add($this), Tests.isRecording() && $this.hide()
        }

        function initNav() {
            _nav = _this.initClass(Nav)
        }

        function initContact() {
            _contact = _this.initClass(Contact), _this.contact = _contact
        }

        function addHandlers() {
            _this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.END, end), _this.events.sub(Mouse.input, Interaction.MOVE, move)
        }

        function start() {
            _this.down = !0, Global.HOVERED_UI || _contact.visible || Device.mobile && "home" == Data.getState() && Mouse.y > .75 * Stage.height || ("home" == Data.getState() ? animateOut(!0) : move())
        }

        function end() {
            _this.down = !1, ("home" === Data.getState() || Global.IN_PROJECT_DETAIL) && animateIn()
        }

        function move() {
            "home" == Data.getState() && _this.down || (animateIn(), clearTimeout(_this.timeout), ("home" === Data.getState() || Global.IN_PROJECT_DETAIL) && (Global.HOVERED_UI || _contact.visible || Device.mobile || "home" !== Data.getState() && Math.abs(Mouse.tilt.y) < .25 && Math.abs(Mouse.tilt.x) < .25 || (_this.timeout = _this.delayedCall(animateOut, 1e3))))
        }

        function animateIn() {
            _this.visible || (_this.visible = !0, clearTimeout(_this.timeout), $this.mouseEnabled(!0).tween({
                opacity: 1
            }, 800, "easeOutSine"))
        }

        function animateOut(fast) {
            _this.visible && (_this.visible = !1, clearTimeout(_this.timeout), $this.mouseEnabled(!1).tween({
                opacity: fast ? 0 : .15
            }, fast ? 50 : 2e3, "easeInOutSine"))
        }
        Inherit(this, Element);
        const _this = this;
        var $this, _nav, _contact;
        _this.visible = !0, initHTML(), initNav(), initContact(), addHandlers(), this.move = move, this.add = function ($element) {
            $this.add($element)
        }, this.showContact = function () {
            move(), _contact.animateIn()
        }, this.animateIn = function (perma) {
            move(), _nav.animateIn(perma)
        }, this.animateOut = function () {
            _nav.animateOut()
        }
    }, "singleton"), Class(function Contact() {
        function initHTML() {
            ($this = _this.element).size("100%").hide().setZ(100), ($overlay = $this.create(".overlay")).size("100%").bg("#000").css({
                opacity: 0
            }), ($wrapper = $this.create(".wrapper")).size("100%", _height).css({
                bottom: 0
            }).transform({
                y: _height
            })
        }

        function initView() {
            _view = _this.initClass(ContactView, [$wrapper])
        }

        function move() {}

        function addHandlers() {
            Stage.touchSwipe(swipe), _this.events.sub(Mouse.input, Interaction.MOVE, move), _this.events.sub(Mouse.input, Interaction.START, move)
        }

        function swipe(e) {
            _this.visible && "down" == e.direction && _this.animateOut()
        }

        function move() {
            _this.visible && Mouse.y < Stage.height - _height && _this.animateOut()
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $overlay, $wrapper, _view, _height = Device.mobile.phone ? 250 : 300;
        initHTML(), initView(), addHandlers(), this.animateIn = function () {
            _this.visible || (_this.visible = !0, Global.HOVERED_UI = !0, $this.show(), _view.animateIn(), $overlay.tween({
                opacity: .85
            }, 600, "easeOutSine"), $wrapper.clearTween().transform({
                y: _height
            }).tween({
                y: 0
            }, 600, "easeOutQuart"))
        }, this.animateOut = function () {
            _this.visible && (_this.visible = !1, Global.HOVERED_UI = !1, $overlay.tween({
                opacity: 0
            }, 500, "easeOutSine"), $wrapper.tween({
                y: _height
            }, 500, "easeOutCubic", function () {
                $this.hide()
            }))
        }
    }), Class(function Nav() {
        function initHTML() {
            ($this = _this.element).css({
                position: "static"
            })
        }

        function initView() {
            _view = _this.initClass(NavView)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, _view;
        initHTML(), initView(), this.animateIn = function (perma) {
            _view.animateIn(perma)
        }, this.animateOut = function () {
            _view.animateOut()
        }
    }), Class(function Work(Model = Data.Work) {
        function initViews() {
            _video = _this.initClass(WorkVideo), _list = _this.initClass(WorkList, Model), _video.from = _list.rt.texture, _video.visible = !1, _list.visible = !1
        }

        function initScroll() {
            _this.scroll = _scroll = _this.initClass(Scroll, Container.instance().element, {
                limit: !1,
                drag: Device.mobile
            }), _this.events.sub(_this.scroll, Scroll.KEYBOARD, keyboardEvent)
        }

        function initUI() {
            _listUI = _this.initClass(WorkUIList, _list, Model.getData()), _this.events.sub(_listUI, Events.HOVER, listUIHover)
        }

        function loop() {
            if (!_isOnWork) return;
            let peel = Math.abs(_scroll.delta.y) * MULTIPLIER;
            _peel += .07 * (peel - _peel), _video.direction = Math.sign(_scroll.delta.y), _peel >= 1 ? (_peel = 0, _this.events.fire(ATEvents.LIST_ITEM_EXIT, {
                fromScroll: !0
            })) : _video.peel(_peel)
        }

        function initState() {
            let state = Data.currentState();
            if (state.includes(Model.type)) {
                let perma = state.split(Model.type + "/")[1];
                _list.trigger(perma) || (Data.setState(Model.type), Data.setTitle(`${Model.type.capitalize()} / Stf Kolev`), Tracking.page(`${Model.type.capitalize()}`, `/${Model.type}`), SEO.add(_list.$seo))
            } else Data.setState(Model.type), Data.setTitle(`${Model.type.capitalize()} / Stf Kolev`), Tracking.page(`${Model.type.capitalize()}`, `/${Model.type}`), SEO.add(_list.$seo)
        }

        function keyboardEvent(e) {
            _isOnWork && (40 == e.keyCode && (_video.direction = 1, _this.events.fire(ATEvents.LIST_ITEM_EXIT, {
                fromList: !0
            })), 38 == e.keyCode && (_video.direction = -1, _this.events.fire(ATEvents.LIST_ITEM_EXIT, {
                fromList: !0
            })))
        }

        function addListeners() {
            _this.events.sub(_list, Events.CLICK, listClick)
        }
        async function listExit(e) {
            e.fromScroll || (_video.direction = 1), e.fromList ? _list.openFromList() : _list.select(Model.find(_activeWork.perma, _video.direction)), SEO.add(_list.$seo), _this.events.fire(ATEvents.INTERNAL_STATE, {
                state: "work/list"
            }), _isOnWork = !1, _peel = 0, _video.lighten(), _scroll.stopInertia(), _scroll.preventInertia = !0, _activeWork && _activeWork.view && (SEO.remove(_activeWork.view.$seo), _activeWork.view.animateOut().then(_ => {
                _activeWork.view = _activeWork.view.destroy()
            })), _activeWork && _activeWork.videoTexture && _activeWork.videoTexture.pause(), _list.preventRender = !1, Data.setState(Model.type), Data.setTitle(`${Model.type.capitalize()} / Stf Kolev`), Tracking.page(`${Model.type.capitalize()}`, `/${Model.type}`), Data.lock(), await _video.transition(!0), _this.delayedCall(_ => Data.unlock(), 250), _list.preventScroll = !1, _scroll.preventInertia = !1, _video.from = _list.rt.texture, _video.reset()
        }
        async function listClick(e) {
            _activeWork && (e.data.index < _activeWork.index ? _video.direction = -1 : _video.direction = 1), SEO.remove(_list.$seo), _this.delayedCall(_ => {
                _list.preventRender = !0, _list.preventScroll = !0
            }, 32);
            let video = e.data.videoTexture;
            _video.to = video ? video.texture : null, video && video.play(), _this.events.fire(ATEvents.INTERNAL_STATE, {
                state: "work/detail"
            }), (_activeWork = e.data).view && (_activeWork.view = _activeWork.view.destroy()), _activeWork.view = _this.initClass(WorkUIProject, e.data, e.item.getClone()), _this.delayedCall(_activeWork.view.animateIn, 200), SEO.add(_activeWork.view.$seo), Data.setState(`${Model.type}/${_activeWork.perma}`), Data.setTitle(`${_activeWork.title} / Stf Kolev`), Tracking.page(`${_activeWork.title}`, `/${Model.type}/${_activeWork.perma}`), Data.lock(), _video.darken(), await _video.transition(), _isOnWork = !0, _this.delayedCall(_ => Data.unlock(), 250), _video.from = video ? video.texture : null, _video.reset(), _video.to = _list.rt.texture
        }

        function listUIHover() {
            _isOnWork && (_video.direction = 1, _this.events.fire(ATEvents.LIST_ITEM_EXIT, {
                fromList: !1
            }))
        }

        function externalState(e) {
            if (!e.value.includes(Model.type)) return;
            let trigger = perma => {
                    _list.trigger(perma) || (Data.setState(Model.type), Data.setTitle(`${Model.type.capitalize()} / Stf Kolev`))
                },
                perma = e.split[1];
            _isOnWork ? (_this.events.fire(ATEvents.LIST_ITEM_EXIT, {
                fromList: !1
            }), perma && perma.length > 1 && trigger(perma)) : trigger(perma)
        }
        async function deactivateWork() {
            _list.openFromList(), _isOnWork = !1, _activeWork.view.animateOut().then(_ => {
                _activeWork.view = _activeWork.view.destroy()
            }), SEO.remove(_activeWork.view.$seo), await _video.transition(), _list.preventScroll = !1, _video.from = _list.rt.texture, _video.reset()
        }

        function keyboardDown(e) {
            switch (e.keyCode) {
                case 13:
                    _isOnWork || _list.enterClick();
                    break;
                case 27:
                    _isOnWork && _this.events.fire(ATEvents.LIST_ITEM_EXIT, {
                        fromList: !1
                    });
                    break;
                case 40:
                    _isOnWork || _list.keyDown();
                    break;
                case 38:
                    _isOnWork || _list.keyUp()
            }
        }
        Inherit(this, Object3D);
        const _this = this;
        var _video, _list, _scroll, _isOnWork, _activeWork, _listUI, _peel = 0;
        const MULTIPLIER = Device.mobile ? .3 : .03;
        initScroll(), initViews(), Device.mobile || initUI(), addListeners(), _this.group.visible = !1, this.activate = function () {
            _video.lighten(), _this.startRender(loop), _this.group.visible = !0, _video.visible = !0, _list.visible = !0, _list.preventRender = !1, _list.show(), _list.animateIn(), _listUI && _listUI.animateIn(), Camera.instance().use(WorkCamera.instance()), initState(), _this.events.sub(ATEvents.EXTERNAL_STATE, externalState), _this.events.sub(ATEvents.LIST_ITEM_EXIT, listExit), _this.events.sub(KeyboardUtil.DOWN, keyboardDown)
        }, this.deactivate = function () {
            _this.stopRender(loop), _this.group.visible = !1, _video.visible = !1, _list.visible = !1, _list.preventRender = !0, _list.hide(), _listUI && _listUI.animateOut(), _isOnWork && deactivateWork(), SEO.remove(_list.$seo), _this.events.unsub(ATEvents.EXTERNAL_STATE, externalState), _this.events.unsub(ATEvents.LIST_ITEM_EXIT, listExit), _this.events.unsub(KeyboardUtil.DOWN, keyboardDown)
        }, this.animateOut = function () {
            _listUI && _listUI.animateOut(), _list.animateOut(), _isOnWork && _activeWork.view.animateOut()
        }, this.prerender = function () {
            _this.events.fire(ATEvents.INTERNAL_STATE, {
                state: "work/list",
                type: Model.type
            });
            let promise = Promise.create();
            return _this.flag("prerendered") ? Promise.resolve() : (Utils3D.forceVisible(_this.group), setTimeout(async _ => {
                await LabelUtil.complete(), Utils3D.resetForceVisible(_this.group), promise.resolve(), _this.flag("prerendered", !0)
            }, 250), promise)
        }
    }), Class(function WorkCamera() {
        function loop() {
            Device.mobile || (_target.x = .2 * Mouse.tilt.x, _this.worldCamera.position.x += .02 * (_target.x - _this.worldCamera.position.x))
        }
        Inherit(this, Component);
        const _this = this;
        this.worldCamera = new THREE.PerspectiveCamera;
        var _target = new Vector3;
        _this.startRender(loop), this.animateIn = function () {
            Device.mobile.phone || (_this.worldCamera.position.y = 3, tween(_this.worldCamera.position, {
                y: 0
            }, 1500, "easeOutCubic"))
        }, this.animateOut = function () {
            Device.mobile.phone || tween(_this.worldCamera.position, {
                y: -3
            }, 1500, "easeInCubic")
        }
    }, "singleton"), Class(function VFX() {
        function initRain() {
            Tests.renderRain() && (_rain = _this.initClass(VideoToTexture, "assets/videos/rain.mp4"))
        }

        function initAbout() {
            let pass = _this.initClass(NukePass, "AboutTreatment", {
                uTransition: {
                    value: -.5
                },
                uTransitionDir: {
                    value: 1
                },
                uLightAdd: {
                    value: 1
                },
                uRainRefraction: {
                    value: 1
                },
                uInteractionScale: InteractionMask.instance().interactionScale,
                tLights: {
                    value: FX.AboutLights.instance().rt.texture
                },
                tInteraction: {
                    value: InteractionMask.instance().texture
                },
                tNormal: {
                    value: FX.Distortion.instance().rt.texture
                },
                tRain: {
                    value: _rain ? _rain.texture : null
                },
                uColor: VideoColor.instance().normalizedColor,
                uColorBlend: {
                    value: .25
                },
                uTime: World.TIME,
                uDPR: World.DPR
            });
            Global.PLAYGROUND && Global.PLAYGROUND.includes("About") && ShaderUIL.add(pass), _passes.about = [pass]
        }

        function initPost(unique) {
            let array = [];
            _passes[unique] = array;
            let pass = _this.initClass(NukePass, "Composite", {
                unique: unique,
                tNormals: {
                    value: FX.Normals.instance().rt.texture
                },
                tPositions: {
                    value: FX.WorldPosition.instance().rt.texture
                },
                tMVPos: {
                    value: FX.MVPos.instance().rt.texture
                },
                tDepth: {
                    value: FX.Depth.instance().rt.texture
                },
                tLight0: {
                    value: FX.Lights.instance().rt.texture
                },
                tLight1: {
                    value: FX.Lights.instance().pos.texture
                },
                tLight2: {
                    value: FX.Lights.instance().blur.texture
                },
                tFog: {
                    value: FX.Fog.instance().rt.texture
                },
                tLogo: {
                    value: FX.Logo.instance().rt.texture
                },
                tNormal: {
                    value: FX.Distortion.instance().rt.texture
                },
                tInteraction: {
                    value: InteractionMask.instance().texture
                },
                tRain: {
                    value: _rain ? _rain.texture : null
                },
                uFogColor: {
                    value: VideoColor.instance().directColor
                },
                uColor: VideoColor.instance().normalizedColor,
                uLightStrength: {
                    value: .4
                },
                uFogStrength: {
                    value: .4
                },
                uBounceStrength: {
                    value: .4
                },
                uFogOverlay: {
                    value: .4
                },
                uFogScreen: {
                    value: .4
                },
                uFadeTransition: {
                    value: _needsFade ? 1 : 0
                },
                uColorBlend: {
                    value: .25
                },
                uTransition: {
                    value: -.5
                },
                uTransitionDir: {
                    value: 1
                },
                uDPR: {
                    value: Math.pow(Device.pixelRatio / World.DPR, 3)
                },
                uHoldInteraction: FX.Logo.instance().hold,
                uHoldTransition: FX.Logo.instance().holdTransition,
                uShowLogo: {
                    value: "alley" == unique ? 1 : 0
                },
                uLogoBrighten: {
                    value: 0
                },
                uRainRefraction: {
                    value: .1
                },
                uRainBrightness: {
                    value: .25
                },
                uInteractionScale: InteractionMask.instance().interactionScale,
                uResolution: World.RESOLUTION,
                uProjectionMatrix: World.PROJECTION_MATRIX,
                uTime: World.TIME
            });
            array.push(pass), Global.PLAYGROUND && Global.PLAYGROUND.toLowerCase().includes(unique) && ShaderUIL.add(pass);
            _this.initClass(NukePass, "Treatment", {
                unique: unique,
                tNormal: {
                    value: FX.Distortion.instance().rt.texture
                },
                tInteraction: {
                    value: InteractionMask.instance().texture
                },
                tLogo: {
                    value: FX.Logo.instance().rt.texture
                },
                tRain: {
                    value: _rain ? _rain.texture : null
                },
                uColor0: {
                    value: new THREE.Color
                },
                uColor1: {
                    value: new THREE.Color
                },
                uColor: VideoColor.instance().normalizedColor,
                uColorBlend: {
                    value: .3
                },
                uRainRefraction: {
                    value: .1
                },
                uRainBrightness: {
                    value: .25
                },
                uTransition: {
                    value: -.5
                },
                uTransitionDir: {
                    value: 1
                },
                uFadeTransition: {
                    value: _needsFade ? 1 : 0
                },
                uHoldInteraction: FX.Logo.instance().hold,
                uHoldTransition: FX.Logo.instance().holdTransition,
                uInteractionScale: InteractionMask.instance().interactionScale,
                uDPR: {
                    value: World.DPR
                },
                uShowLogo: {
                    value: "alley" == unique ? 1 : 0
                },
                uTime: World.TIME
            })
        }

        function initFallback(unique, passes = _passes) {
            let array = [];
            passes[unique] = array;
            let treatment = _this.initClass(NukePass, "Treatment", {
                unique: "fb_" + unique,
                tNormal: {
                    value: FX.Distortion.instance().rt.texture
                },
                tInteraction: {
                    value: InteractionMask.instance().texture
                },
                tLogo: {
                    value: FX.Logo.instance().rt.texture
                },
                uHoldInteraction: FX.Logo.instance().hold,
                uTransition: {
                    value: -.5
                },
                uTransitionDir: {
                    value: 1
                },
                uHoldTransition: FX.Logo.instance().holdTransition,
                uFadeTransition: {
                    value: _needsFade ? 1 : 0
                },
                uDPR: {
                    value: World.DPR
                },
                uShowLogo: {
                    value: "alley" == unique ? 1 : 0
                },
                uInteractionScale: InteractionMask.instance().interactionScale,
                uTime: World.TIME
            });
            array.push(treatment), Global.PLAYGROUND && Global.PLAYGROUND.toLowerCase().includes(unique) && ShaderUIL.add(treatment)
        }

        function initWork() {
            let pass = _this.initClass(NukePass, "WorkTreatment", {
                uTime: World.TIME,
                uColor: VideoColor.instance().normalizedColor,
                uColorBlend: {
                    value: .5
                },
                uTransition: {
                    value: -.5
                },
                uTransitionDir: {
                    value: 1
                },
                uLight: {
                    value: 1
                },
                uLightBlend: FX.HologramLights.instance().blend,
                uLightBrightness: WorkList.lightBrightness,
                tLight: {
                    value: FX.HologramLights.instance().rt.texture
                }
            });
            _passes.work = [pass], Global.PLAYGROUND && Global.PLAYGROUND.toLowerCase().includes("work") && ShaderUIL.add(pass)
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            if (_state = e.state, e.state.includes("alley")) {
                _rain && _rain.start();
                let key = e.state.split("alley/")[1];
                _nuke.passes.length = 0, _passes[key].forEach(pass => _nuke.add(pass))
            } else _rain && _rain.stop(), _nuke.passes.length = 0, e.state.includes("work") && (e.state.includes("list") ? _passes.work[0].tween("uColorBlend", .3, 500, "easeOutCubic") : _passes.work[0].tween("uColorBlend", 0, 500, "easeOutCubic"), _passes.work.forEach(pass => _nuke.add(pass)));
            _this.flag("transition") && (_nuke.passes[0].set("uTransitionDir", -1), _nuke.passes[0].set("uTransition", 1.5))
        }
        Inherit(this, Component);
        const _this = this;
        var _rain, _state, _nuke = World.NUKE,
            _passes = {},
            _fallback = {},
            _needsFade = "home" == Data.currentState();
        FX.Normals.instance(), FX.WorldPosition.instance(), FX.MVPos.instance(), FX.Depth.instance(), initRain(), Tests.fallbackAlley() ? (initFallback("alley"), initFallback("about")) : initPost("alley"), initAbout(), initWork(), addListeners(), this.activate = function (key) {}, this.transition = async function (time = 1e3) {
            _this.flag("transition", !0);
            let pass = _nuke.passes[0];
            pass && Device.graphics.webgl && (pass.set("uTransitionDir", 1), pass.set("uTransition", -.5), await pass.tween("uTransition", 1.5, time, "easeInOutQuad").promise());
            return async _ => {
                Device.graphics.webgl && (pass = _nuke.passes[0], _this.flag("transition", !1), await pass.tween("uTransition", -.5, _needsFade ? 4e3 : 1e3, _needsFade ? "easeInSine" : "easeInOutQuad").promise(), _passes.alley[0].set("uFadeTransition", 0), _needsFade = !1)
            }
        }, this.fallbackTreatment = function (state) {
            _fallback.alley || (initFallback("alley", _fallback), initFallback("about", _fallback));
            let key = _state.split("alley/")[1];
            _nuke.passes.length = 0, _fallback[key].forEach(pass => _nuke.add(pass))
        }, this.restoreTreatment = function () {
            let key = _state.split("alley/")[1];
            _nuke.passes.length = 0, _passes[key].forEach(pass => _nuke.add(pass))
        }
    }, "singleton"), Class(function World() {
        function initWorld() {
            RenderGL.initialize(RenderGL.NORMAL, {
                powerPreference: "high-performance",
                useDrawBuffers: !Tests.fallbackAlley()
            }), _renderer = RenderGL.threeRenderer, _scene = RenderGL.scene, _camera = RenderGL.camera.worldCamera, _nuke = RenderGL.nuke, _camera.fov = 70, _camera.far = Tests.getFar(), _camera.updateProjectionMatrix(), Camera.instance(_camera), World.SCENE = _scene, World.RENDERER = _renderer, World.ELEMENT = $(_renderer.domElement), World.CAMERA = _camera, World.NUKE = _nuke, World.QUAD = new THREE.PlaneBufferGeometry(2, 2), World.TIME = {
                ignoreUIL: !0,
                type: "f",
                value: 0
            }, World.RESOLUTION = {
                ignoreUIL: !0,
                type: "v2",
                value: new THREE.Vector2(Stage.width * World.DPR, Stage.height * World.DPR)
            }, World.PROJECTION_MATRIX = {
                ignoreUIL: !0,
                value: new THREE.Matrix4
            }, VFX.instance(), _nuke.postRender = postRender
        }

        function postRender() {
            for (let i = 0; i < _postRender.length; i++) _postRender[i]()
        }

        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize), _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            e.state.includes("alley") && !_prevState.includes("alley") ? (RenderGL.DPR = findDPR(e.state), RenderGL.render()) : !e.state.includes("alley") && _prevState.includes("alley") && (RenderGL.DPR = Tests.getNormalDPR(), RenderGL.render()), _prevState = e.state
        }

        function findDPR(state = "alley") {
            let dpr = state.includes("about") ? Tests.getAboutDPR() : Tests.getAlleyDPR();
            return GPU.gt(4), dpr
        }

        function resizeDPR() {
            if (!_prevState.includes("alley")) return;
            let newDPR = findDPR(_prevState);
            newDPR != RenderGL.DPR && (RenderGL.DPR = newDPR, RenderGL.render())
        }

        function resize() {
            _renderer.setSize(Stage.width, Stage.height), _camera.aspect = Stage.width / Stage.height, _camera.updateProjectionMatrix(), World.RESOLUTION.value.set(Stage.width * World.DPR, Stage.height * World.DPR), World.PROJECTION_MATRIX.value.multiplyMatrices(_camera.projectionMatrix, _camera.matrixWorld), resizeDPR()
        }

        function loop(t, delta) {
            World.TIME.value += .001 * delta, _controls && _controls.enabled && _controls.update(), RenderGL.render()
        }
        Inherit(this, Component);
        const _this = this;
        let _renderer, _scene, _camera, _nuke, _controls;
        var _postRender = [],
            _prevState = "";
        World.DPR = Tests.getNormalDPR(), initWorld(), addHandlers(), _this.startRender(loop), this.postRender = function (callback) {
            _postRender.push(callback)
        }
    }, function () {
        var _instance;
        World.instance = function () {
            return _instance || (_instance = new World), _instance
        }
    }), Class(function VideoTest() {
        Inherit(this, Object3D);
        const _this = this;
        ! function () {
            let t = new VideoToTexture("assets/videos/home.mp4", 100, 100);
            t.start();
            let geom = new THREE.PlaneBufferGeometry(2, 2),
                shader = _this.initClass(Shader, "ScreenQuad", {
                    tMap: {
                        value: t.texture
                    }
                });
            _this.add(new THREE.Mesh(geom, shader.material))
        }()
    }), Class(function AboutView() {
        function loop() {
            _mouse.copy(Mouse.tilt), Device.mobile && (_mouse.x = -Math.range(Mobile.Accelerometer.x, -4, 4, -1, 1, !0), _mouse.y = Math.range(Mobile.Accelerometer.y, -4, 4, -1, 1, !0));
            Math.radians(3 * _mouse.y);
            let y = Math.radians(10 * _mouse.x);
            _this.group.rotation.y += .03 * (y - _this.group.rotation.y)
        }
        async function initSection() {
            let shader = _this.initClass(Shader, "AboutBase", {
                tNormal: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/normal2.jpg")
                },
                tIBL: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/ibl.jpg")
                },
                uScreenColor: VideoColor.instance().normalizedColor,
                uUVScale: {
                    value: 1
                },
                uNormalStrength: {
                    value: 1
                },
                uNormalScale: {
                    value: 1
                },
                uLightStrength: {
                    value: 1
                },
                uBaseColor: {
                    value: new THREE.Color
                }
            });
            ShaderUIL.add(shader);
            let section = _this.initClass(AlleySection, 5, shader);
            section.group.position.z = 0, section.activate(), FX.AboutLights.instance().add(section.lights.mesh);
            let mesh = await section.getMesh();
            FX.AboutLights.instance().addOccluder(mesh), initOcclusionMask()
        }

        function initOcclusionMask() {
            let geom = new THREE.PlaneBufferGeometry(1, 1),
                shader = _this.initClass(Shader, "WorldQuad", {
                    tMap: {
                        value: Utils3D.getTexture("assets/images/about/mask.png")
                    },
                    transparent: !0
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            mesh.renderOrder = 999, _this.add(mesh), mesh.rotation.x = Math.radians(90), mesh.prefix = "about_mask", MeshUIL.add(mesh)
        }

        function initViews() {
            _brick = _this.initClass(AboutViewBrick), _projection = _this.initClass(AboutViewProjection)
        }

        function start() {
            let element = document.elementFromPoint(Mouse.x, Mouse.y);
            element && "hit" == element.className || Render.start(flicker, 15)
        }

        function end() {
            Render.stop(flicker, 15)
        }

        function flicker() {
            VideoColor.instance().active++, VideoColor.instance().active > 20 && (VideoColor.instance().active = 0)
        }
        Inherit(this, Object3D);
        const _this = this;
        var _brick, _projection, _mouse = new Vector2;
        !async function () {
            AlleyLoader.instance().loadAbout(), await AlleyLoader.instance().aboutReady(), initSection(), initViews(), _this.startRender(loop)
        }(), this.animateIn = function () {
            _projection && (_projection.animateIn(), _this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.END, end))
        }, this.animateOut = function () {
            _this.events.unsub(Mouse.input, Interaction.START, start), _this.events.unsub(Mouse.input, Interaction.END, end)
        }
    }), Class(function AboutViewBrick() {
        function initMesh() {
            let geom = new THREE.PlaneBufferGeometry(1, 1),
                shader = _this.initClass(Shader, "AboutViewBrick", {
                    tBump: {
                        value: Utils3D.getRepeatTexture("assets/images/about/tex_bricks_bump.jpg")
                    },
                    tNormal: {
                        value: Utils3D.getRepeatTexture("assets/images/about/tex_bricks_normal.jpg")
                    },
                    tNormal2: {
                        value: Utils3D.getRepeatTexture("assets/images/alley/normal2.jpg")
                    },
                    tIBL: {
                        value: Utils3D.getRepeatTexture("assets/images/alley/ibl.jpg")
                    },
                    uScreenColor: VideoColor.instance().normalizedColor,
                    uUVScale: {
                        value: 1
                    },
                    uNormalStrength: {
                        value: 1
                    },
                    uLightStrength: {
                        value: 1
                    },
                    uBaseColor: {
                        value: new THREE.Color
                    }
                });
            ShaderUIL.add(shader);
            let mesh = new THREE.Mesh(geom, shader.material);
            _this.add(mesh), mesh.prefix = "brickwall", MeshUIL.add(mesh)
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }), Class(function AboutViewProjection() {
        function initMesh() {
            let geom = new THREE.PlaneBufferGeometry(1, 1, 20, 20),
                shader = _this.initClass(Shader, "AboutViewProjection", {
                    tMap: {
                        value: Utils3D.getTexture(`assets/images/about/${Device.mobile.phone?"text-mobile":"text"}.jpg`)
                    },
                    tBump: {
                        value: Utils3D.getRepeatTexture("assets/images/about/tex_bricks_bump.jpg")
                    },
                    tVideo: {
                        value: VideoColor.instance().texture
                    },
                    uRGBStrength: {
                        value: 1
                    },
                    uBumpScale: {
                        value: 1
                    },
                    uTextBrightness: {
                        value: 1
                    },
                    uTextAnimation: {
                        value: 1
                    },
                    uVideoBlend: {
                        value: 1
                    },
                    uTime: World.TIME,
                    transparent: !0,
                    blending: THREE.AdditiveBlending
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            _this.add(mesh), ShaderUIL.add(shader), mesh.prefix = "projection", MeshUIL.add(mesh), _shader = shader, Device.mobile.phone && (mesh.position.y -= .3, mesh.scale.multiplyScalar(1.3))
        }
        Inherit(this, Object3D);
        const _this = this;
        var _shader;
        initMesh(), this.animateIn = async function () {
            _shader.set("uTextAnimation", 0), _shader.tween("uTextAnimation", 1, 800, "easeOutSine", 500)
        }
    }), Class(function AlleyFog(_index) {
        function initGeometry() {
            _geom = new THREE.InstancedBufferGeometry;
            let shape = (new THREE.BufferGeometry).fromGeometry(new THREE.PlaneGeometry(1, 1));
            for (var key in shape.attributes) _geom.attributes[key] = shape.attributes[key];
            let position = new Float32Array(150),
                attribs = new Float32Array(150),
                width = 5 == _index ? 10 : 3,
                height = 5 == _index ? 12 : 8,
                depth = 5 == _index ? 3 : 5;
            for (let i = 0; i < 50; i++) position[3 * i + 0] = Math.random(-width, width, 5), position[3 * i + 1] = Math.random(0, height, 5), position[3 * i + 2] = Math.random(-depth, depth, 5), attribs[3 * i + 0] = Math.random(0, 1, 4), attribs[3 * i + 1] = Math.random(0, 1, 4), attribs[3 * i + 2] = Math.random(0, 1, 4);
            _geom.addAttribute("offset", new THREE.InstancedBufferAttribute(position, 3, 1)), _geom.addAttribute("attribs", new THREE.InstancedBufferAttribute(attribs, 3, 1))
        }

        function initMesh() {
            _shader = _this.initClass(Shader, "FogInstance", {
                quaternion: {
                    type: "v4",
                    value: new THREE.Vector4
                },
                planeScale: {
                    value: 8
                },
                alpha: {
                    value: 1
                },
                tMap: {
                    type: "t",
                    value: Utils3D.getTexture("assets/images/alley/cloud.jpg")
                },
                time: World.TIME,
                transparent: !0,
                depthWrite: !1,
                depthTest: !1
            }), (_mesh = new THREE.Mesh(_geom, _shader.material)).frustumCulled = !1, _this.group.add(_mesh), FX.Fog.instance().add(_mesh)
        }
        Inherit(this, Object3D);
        const _this = this;
        var _geom, _mesh, _shader;
        initGeometry(), initMesh()
    }, "singleton"), Class(function AlleyGLUI($stage) {
        function initGL() {
            ($this = $gl(200, 100)).x = Stage.width / 2 - 100, $this.y = Stage.height / 2 + 130, _this.element = $this, _this.height = $this.dimensions, $stage.add($this), ($texture = $gl(200, 100, "assets/images/alley/workbutton.png")).mesh.material.blendMode = THREE.AdditiveBlending, $this.add($texture)
        }

        function addHandlers() {
            $texture.interact(hover, click), _this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.END, end)
        }

        function start() {
            $this.hide()
        }

        function end() {
            $this.show()
        }

        function hover(e) {
            e.action
        }

        function click() {
            Data.setNav("work")
        }
        Inherit(this, Component);
        const _this = this;
        var $this, $texture;
        initGL(), addHandlers()
    }), Class(function AlleySection(_index, _shader) {
        function initGeometry() {
            _this.geometry = _this.initClass(AlleySectionGeometry, _index)
        }

        function initAreaLights() {
            _this.lights = _this.initClass(AlleySectionAreaLights, _index)
        }

        function initScreenLights() {
            5 != _index && _this.initClass(AlleySectionScreenLights, _index)
        }

        function initCurves() {
            _this.initClass(AlleySectionCurves, _index)
        }

        function initElements() {
            5 != _index && (_this.initClass(AlleySectionElements, _index), _this.initClass(AlleyFog, _index))
        }
        Inherit(this, Object3D);
        const _this = this;
        this.shader = _shader || AlleySection.getShader(5 == _index), initElements(), initGeometry(), initAreaLights(), initScreenLights(), initCurves(), _this.holdZ = _this.group.position.z, _this.group.visible = !1, _this.group.position.z = -999, this.activate = function () {
            _this.group.visible = !0
        }, this.deactivate = function () {
            _this.holdZ = _this.group.position.z, _this.group.position.z = -999, _this.group.visible = !1
        }, this.getMesh = async function () {
            return await _this.wait(_this.geometry, "mesh"), _this.geometry.mesh
        }
    }, () => {
        let _shader;
        AlleySection.getShader = function (about) {
            _shader || ((_shader = new Shader("AlleyGeometry", {
                unique: about ? "about" : "",
                uTime: World.TIME,
                uResolution: World.RESOLUTION,
                tBump: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/normal.jpg")
                },
                tBump2: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/normal2.jpg")
                },
                tBump3: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/bump.jpg")
                },
                tIBL: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/ibl.jpg")
                },
                tMatcap: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/matcap.jpg")
                },
                tCRT: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/rgb_texture.jpg")
                },
                tInteraction: {
                    value: InteractionMask.instance().texture
                },
                tSky: {
                    value: AlleyBackground.instance().rt.texture
                },
                tBuffer: {
                    value: FX.Output.instance().rt.texture
                },
                uScreenColor: VideoColor.instance().color,
                uNormalStrength: {
                    value: .5
                },
                uNormalScale: {
                    value: 20
                },
                uPointLightStrength: {
                    value: 1
                },
                uLightFalloffDist: {
                    value: 20
                },
                uLightFalloffRange: {
                    value: 5
                },
                uFogDistance: {
                    value: 20
                },
                uFogRange: {
                    value: 5
                },
                uNormalBottom: {
                    value: .5
                },
                uReflScale: {
                    value: 3
                },
                uReflStrength: {
                    value: 1
                },
                uCRTColor: {
                    value: new THREE.Color
                },
                uTextureMatrix: FX.Lights.instance().mirror.textureMatrix,
                tReflection: FX.Lights.instance().mirror.reflection
            })).receiveLight = !0, ShaderUIL.add(_shader));
            let clone = _shader.clone();
            return clone.uniforms.uNormalStrength = _shader.uniforms.uNormalStrength, clone.uniforms.uNormalScale = _shader.uniforms.uNormalScale, clone.uniforms.uPointLightStrength = _shader.uniforms.uPointLightStrength, clone.uniforms.uNormalBottom = _shader.uniforms.uNormalBottom, clone.uniforms.uCRTColor = _shader.uniforms.uCRTColor, clone.uniforms.uLightFalloffDist = _shader.uniforms.uLightFalloffDist, clone.uniforms.uLightFalloffRange = _shader.uniforms.uLightFalloffRange, clone.uniforms.uFogDistance = _shader.uniforms.uFogDistance, clone.uniforms.uFogRange = _shader.uniforms.uFogRange, clone.uniforms.uReflScale = _shader.uniforms.uReflScale, clone.uniforms.uReflStrength = _shader.uniforms.uReflStrength, clone
        }, AlleySection.getFogUniforms = function () {
            return _shader || AlleySection.getShader(), {
                distance: _shader.uniforms.uFogDistance,
                range: _shader.uniforms.uFogRange
            }
        }
    }), Class(function AlleySectionAreaLights(_index) {
        function initMesh() {
            let geometry = AlleySectionAreaLights.getGeometry(_index),
                shader = AlleySectionAreaLights.getShader(),
                mesh = new THREE.Mesh(geometry, shader.material);
            _this.add(mesh), FX.Lights.instance().add(mesh, {
                radius: 2
            }), _this.mesh = mesh
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }, () => {
        let _shader, _geometry = {};
        AlleySectionAreaLights.getGeometry = function (index) {
            return _geometry[index] || (_geometry[index] = Utils3D.loadBufferGeometry(`geometry/sections/${index}/areaLights`)), _geometry[index]
        }, AlleySectionAreaLights.getShader = function () {
            let fog = AlleySection.getFogUniforms();
            return _shader || (_shader = new Shader("AreaLight", {
                transparent: !0,
                uColor: VideoColor.instance().normalizedColor,
                tSky: {
                    value: AlleyBackground.instance().rt.texture
                },
                uFogDistance: fog.distance,
                uFogRange: fog.range,
                uResolution: World.RESOLUTION
            })), _shader.clone()
        }
    }), Class(function AlleySectionCurves(_index) {
        async function initCurves() {
            let geometry = AlleyLoader.instance().tubes[_index];
            await defer();
            let shader = _this.parent.shader,
                mesh = new THREE.Mesh(geometry, shader.material);
            FX.Deferred.instance().add(mesh), _this.add(mesh)
        }
        Inherit(this, Object3D);
        const _this = this;
        initCurves()
    }, () => {
        AlleySectionCurves.geometry = {}
    }), Class(function AlleySectionElements(_index) {
        function initLights(data) {
            data.forEach(d => {
                for (let i = 0; i < d.position.length / 3; i++) "PointLight" == d.class && _this.initClass(PointLight, d, i, _this.parent.shader)
            })
        }

        function initElements() {
            let data = AlleySectionElements.data[_index];
            data || (data = Assets.JSON[`geometry/sections/${_index}/elements`], AlleySectionElements.data[_index] = data), initLights(data), data.forEach(d => {
                for (let i = 0; i < d.position.length / 3; i++) {
                    let element;
                    switch (d.class) {
                        case "Balcony1":
                        case "Balcony2":
                            element = _this.initClass(ElementGeometry, d.class, d, i)
                    }
                }
            })
        }
        Inherit(this, Object3D);
        const _this = this;
        initElements()
    }, () => {
        AlleySectionElements.data = {}
    }), Class(function AlleySectionGeometry(_index) {
        async function initMesh() {
            let geometry = AlleyLoader.instance().geometry[_index],
                shader = _this.parent.shader;
            _this.geometry = geometry, await defer();
            let mesh = new THREE.Mesh(geometry, shader.material);
            5 !== _index && FX.Deferred.instance().add(mesh), _this.add(mesh), _this.mesh = mesh
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }), Class(function AlleySectionScreenLights(_index) {
        function initMesh() {
            let geometry = AlleySectionScreenLights.getGeometry(_index),
                shader = AlleySectionScreenLights.getShader();
            shader.set("tMap", VideoColor.instance().texture);
            let mesh = new THREE.Mesh(geometry, shader.material);
            _this.add(mesh), FX.Lights.instance().add(mesh, {
                radius: 2,
                screen: !0
            })
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }, () => {
        let _shader, _geometry = {};
        AlleySectionScreenLights.getGeometry = function (index) {
            return _geometry[index] || (_geometry[index] = Utils3D.loadBufferGeometry(`geometry/sections/${index}/screenLights`)), _geometry[index]
        }, AlleySectionScreenLights.getShader = function () {
            if (!_shader) {
                let fog = AlleySection.getFogUniforms();
                _shader = new Shader("ScreenLight", {
                    transparent: !0,
                    tMap: {
                        value: null
                    },
                    tSky: {
                        value: AlleyBackground.instance().rt.texture
                    },
                    uFogDistance: fog.distance,
                    uFogRange: fog.range,
                    uResolution: World.RESOLUTION
                })
            }
            return _shader.clone()
        }
    }), Class(function AlleyVideo() {
        function getVideoPath() {
            return "assets/videos/home" + (Tests.halfResAlleyVideo() ? "-half" : "")
        }

        function initVideo() {
            VIDEO ? (_video = _this.initClass(VideoToTexture, getVideoPath()), Tests.fallbackAlley() && (_video.video.object.attr("autoplay", "autoplay"), _video.start()), _this.events.sub(_video.video, Events.UPDATE, videoProgress), VideoTextures.instance().append(_video.video)) : ((_video = {}).texture = Utils3D.getTexture("assets/videos/home-still.jpg"), _video.start = _video.stop = (_ => {}))
        }

        function initMesh() {
            let geom = World.QUAD;
            _shader = _this.initClass(Shader, "AlleyVideo", {
                tMap: {
                    value: _video.texture
                },
                uScale: {
                    value: new Vector2
                },
                uOffset: {
                    value: new Vector2(0, 0)
                }
            });
            let mesh = new THREE.Mesh(geom, _shader.material);
            _this.add(mesh)
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            let width = Stage.width,
                height = width / (1280 / 720);
            height < Stage.height && (width = (height = Stage.height) * (1280 / 720));
            let scaleX = width / Stage.width,
                scaleY = height / Stage.height;
            _shader.uniforms.uScale.value.set(scaleX, scaleY)
        }

        function videoProgress(e) {
            e.duration - e.time < .25 && FX.Logo.instance().glitch()
        }
        Inherit(this, Object3D);
        const _this = this;
        var _shader, _video;
        const VIDEO = Tests.useVideoTextures();
        initVideo(), initMesh(), addListeners(), resizeHandler(), this.hide = function () {
            _video.stop()
        }, this.show = function () {
            _video.start()
        }, this.animateIn = function (time = 1200) {
            if (!VIDEO) return;
            let offset = _shader.uniforms.uOffset.value;
            offset.y = .5, tween(offset, {
                y: 0
            }, 1200, "easeOutCubic")
        }, this.animateOut = function () {
            if (!VIDEO) return;
            let offset = _shader.uniforms.uOffset.value;
            tween(offset, {
                y: -.5
            }, 2500, "easeInOutCubic")
        }
    }), Class(function AlleyView() {
        function initSectionPool() {
            Number(Utils.query("section"));
            for (let i = 0; i < _numPool; i++) {
                let section = _this.initClass(AlleySection, i % 5);
                _sectionPool.push(section)
            }
        }

        function initActive() {
            for (let i = 0; i < _numActive; i++) activateSection((1 - i) * _length)
        }

        function activateSection(posZ) {
            let section = _sectionPool.random(Math.max(_numAvailable, _numActive));
            section.activate(), section.group.position.z = posZ, _activeSections.push(section), _this.delayedCall(sortLights, 50)
        }

        function sortLights() {
            Lighting.sort((a, b) => {
                if (a._world && b._world) return b._world.z - a._world.z
            })
        }

        function initScroll() {
            _scroll = _this.initClass(Scroll, {
                limit: !1,
                drag: !0
            })
        }

        function loop(t, delta) {
            _speed += 15e-5 * Math.abs(_scroll.delta.y), _speed += .004 * Global.HOLD_VALUE, _speed += .075 * (SPEED - _speed);
            for (let i = _activeSections.length - 1; i >= 0; i--) {
                let section = _activeSections[i];
                section.group.position.z += _speed * _acceleration.v, section.group.position.z >= 1.5 * _length && (section.deactivate(), _activeSections.remove(section), activateSection(section.holdZ - _numActive * _length))
            }
        }
        Inherit(this, Object3D);
        const _this = this;
        var _scroll;
        const SPEED = .03;
        var _numActive = 5,
            _numPool = 10,
            _numAvailable = 5,
            _speed = SPEED,
            _length = 10,
            _acceleration = {
                v: 1
            },
            _sectionPool = [],
            _activeSections = [];
        Utils.query("section") && (_numAvailable = Number(Utils.query("section"))), _this.add(AlleyBackground.instance().mesh), initSectionPool(), initActive(), initScroll(), _this.startRender(loop), this.animateIn = function () {
            _acceleration.v = .1, tween(_acceleration, {
                v: 1
            }, 1e4, "easeInOutSine")
        }
    }), Class(function Glow() {
        function addPlane() {
            let geometry = new THREE.PlaneBufferGeometry(2, 2);
            _shader = _this.initClass(Shader, "Glow", {
                uResolution: World.RESOLUTION,
                uRender: {
                    value: null
                }
            });
            let mesh = new THREE.Mesh(geometry, _shader.material);
            _this.scene.add(mesh)
        }

        function render() {
            _shader.uniforms.uRender.value = World.NUKE.output, _this.draw(Stage, _nuke.camera)
        }
        Inherit(this, FXLayer, World.NUKE, !0);
        const _this = this;
        let _nuke, _shader;
        this.resolution = .3, _nuke = World.NUKE, _this.create(_nuke), _nuke.postRender = render, addPlane()
    }), Class(function Rain() {
        function initGeometry() {
            _geometry = new THREE.BufferGeometry;
            let position = [],
                scale = [],
                offset = [],
                speed = [];
            for (let i = 0; i < 200; i++) position.push(Math.random(-2, 2, 3), 0, Math.random(-2, 2, 3)), scale.push(Math.random(.5, 1.5, 3)), offset.push(Math.random(0, 1, 3)), speed.push(Math.random(0, 1, 3));
            _geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(position), 3)), _geometry.addAttribute("scale", new THREE.BufferAttribute(new Float32Array(scale), 1)), _geometry.addAttribute("offset", new THREE.BufferAttribute(new Float32Array(offset), 1)), _geometry.addAttribute("speed", new THREE.BufferAttribute(new Float32Array(speed), 1))
        }

        function initShader() {
            _shader = _this.initClass(Shader, "Rain", {
                uTime: World.TIME,
                uResolution: World.RESOLUTION,
                uTexture: {
                    value: Utils3D.getTexture("assets/images/rain.jpg")
                },
                transparent: !0,
                blending: THREE.AdditiveBlending,
                depthWrite: !1
            })
        }

        function initPoints() {
            _points = new THREE.Points(_geometry, _shader.material), _this.add(_points)
        }
        Inherit(this, Object3D);
        const _this = this;
        let _geometry, _shader, _points;
        initGeometry(), initShader(), initPoints()
    }), Class(function AlleyBackground() {
        function initMesh() {
            let geom = World.QUAD,
                shader = _this.initClass(Shader, "AlleyBackground", {
                    uTime: World.TIME,
                    uMin: {
                        value: 0
                    },
                    uMax: {
                        value: 1
                    },
                    uSpeed: {
                        value: 1
                    }
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            _this.scene.add(mesh), ShaderUIL.add(shader)
        }

        function loop() {
            _this.render()
        }

        function initQuad() {
            let geom = new THREE.PlaneBufferGeometry(2, 2),
                shader = _this.initClass(Shader, "ScreenQuad", {
                    tMap: {
                        value: _this.rt.texture
                    },
                    alpha: {
                        type: "f",
                        value: 1
                    },
                    depthWrite: !1
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            mesh.frustumCulled = !1, _this.mesh = mesh
        }

        function addListeners() {
            _this.events.sub(RenderGL, RenderGL.RENDER, loop)
        }
        Inherit(this, FXScene);
        const _this = this;
        this.resolution = Tests.bgResolution(), _this.create(World.NUKE), _this.setDPR(1), _this.forceRender = !0, initMesh(), initQuad(), addListeners()
    }, "singleton"), Class(function ElementGeometry(_name, _data, _index) {
        async function initMesh() {
            let geometry = ElementGeometry.geometry[_name];
            geometry || (geometry = Utils3D.loadBufferGeometry(`geometry/elements/${_name}`), ElementGeometry.geometry[_name] = geometry), await defer();
            let shader = _this.parent.parent.getShader(),
                mesh = new THREE.Mesh(geometry, shader.material);
            _this.add(mesh), FX.Deferred.instance().add(mesh), _this.group.position.fromArray(_data.position, 3 * _index), _this.group.rotation.setFromVector3((new Vec3).fromArray(_data.rotation, 3 * _index), "YXZ"), _this.group.scale.fromArray(_data.scale, 3 * _index)
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }, () => {
        ElementGeometry.geometry = {}
    }), Class(function HoloScreen(_data, _index) {
        function initMesh() {
            _this.group.position.fromArray(_data.position, 3 * _index), _this.group.rotation.setFromVector3((new Vec3).fromArray(_data.rotation, 3 * _index), "YXZ"), _this.group.scale.fromArray(_data.scale, 3 * _index);
            let geometry = new THREE.PlaneBufferGeometry(1, 1);
            geometry.rotateX(-Math.PI / 2);
            let shader = _this.initClass(Shader, "HoloScreen", {
                uTime: World.TIME,
                uIndexOffset: {
                    value: Math.random(0, 6)
                },
                uMap: {
                    value: Utils3D.getRepeatTexture("assets/images/work.jpg")
                },
                uGlowMap: {
                    value: Utils3D.getRepeatTexture("assets/images/work-glow.jpg")
                },
                uRatio: {
                    value: _this.group.scale.x / _this.group.scale.z
                },
                uScale: {
                    value: new Vec2(_this.group.scale.x, _this.group.scale.z)
                },
                uGlow: {
                    value: .2
                },
                transparent: !0,
                depthWrite: !1
            });
            new THREE.Mesh(geometry, shader.material);
            new THREE.Mesh(geometry, shader.material).position.y = .1
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }), Class(function LightRayDoor1(_data, _index) {
        function initMesh() {
            let geometry = LightRayDoor1.getGeometry(),
                shader = LightRayDoor1.getShader();
            _mesh = new THREE.Mesh(geometry, shader.material), _this.add(_mesh), _this.group.position.fromArray(_data.position, 3 * _index), _this.group.rotation.setFromVector3((new Vec3).fromArray(_data.rotation, 3 * _index), "YXZ"), _this.group.scale.fromArray(_data.scale, 3 * _index)
        }
        Inherit(this, Object3D);
        const _this = this;
        let _mesh;
        initMesh()
    }, () => {
        let _geometry, _shader;
        LightRayDoor1.getGeometry = function () {
            return _geometry || (_geometry = Utils3D.loadBufferGeometry("geometry/elements/LightRayDoor1")), _geometry
        }, LightRayDoor1.getShader = function () {
            return _shader || (_shader = new Shader("LightRay", {
                uResolution: World.RESOLUTION,
                uTexture: {
                    value: Utils3D.getTexture("assets/images/light-ray-door.jpg")
                },
                transparent: !0,
                depthWrite: !1
            })), _shader
        }
    }), Class(function LightReflection(_data, _index) {
        function initMesh() {
            let geometry = LightReflection.getGeometry(),
                shader = LightReflection.getShader(),
                mesh = new THREE.Mesh(geometry, shader.material);
            _this.add(mesh), _this.group.position.fromArray(_data.position, 3 * _index), _this.group.position.y = .3, _this.group.scale.fromArray(_data.scale, 3 * _index), _this.group.scale.z *= 5, _this.group.rotation.y = -.1 * _this.group.position.x
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }, () => {
        let _geometry, _shader;
        LightReflection.getGeometry = function () {
            return _geometry || ((_geometry = new THREE.PlaneBufferGeometry(1, 1)).rotateX(-Math.PI / 2), _geometry.rotateY(Math.PI), _geometry.translate(0, 0, .37)), _geometry
        }, LightReflection.getShader = function () {
            return _shader || (_shader = new Shader("LightReflection", {
                uTime: World.TIME,
                uResolution: World.RESOLUTION,
                uLight: {
                    value: Utils3D.getTexture("assets/images/alley/light-reflection.jpg")
                },
                uBump: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/bump.jpg")
                },
                transparent: !0,
                depthWrite: !1
            })), _shader
        }
    }), Class(function Mist(_data, _index) {
        function initGeometry() {
            _geometry = new THREE.BufferGeometry, addParticles(_data, _index)
        }

        function addParticles(data, index) {
            let s = (new Vec3).fromArray(data.scale, 3 * index).multiplyScalar(.5),
                p = (new Vec3).fromArray(data.position, 3 * index),
                vol = s.x * s.y * s.z,
                num = Math.ceil(50 * vol);
            for (let i = 0; i < num; i++) _position.push(Math.random(p.x - s.x, p.x + s.x, 3), Math.random(p.y - s.y, p.y + s.y, 3), Math.random(p.z - s.z, p.z + s.z, 3)), _scale.push(Math.random(.5, 1.5, 3)), _rotation.push(Math.random(-3.14, 3.14, 3)), _speed.push(Math.random(-1, 1, 3));
            _geometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(_position), 3)), _geometry.addAttribute("scale", new THREE.BufferAttribute(new Float32Array(_scale), 1)), _geometry.addAttribute("rotation", new THREE.BufferAttribute(new Float32Array(_rotation), 1)), _geometry.addAttribute("speed", new THREE.BufferAttribute(new Float32Array(_speed), 1))
        }

        function initShader() {
            _shader = _this.initClass(Shader, "Mist", {
                uTime: World.TIME,
                uResolution: World.RESOLUTION,
                uTexture: {
                    value: Utils3D.getTexture("assets/images/mist.jpg")
                },
                uSwirl: {
                    value: Utils3D.getRepeatTexture("assets/images/swirl.jpg")
                },
                transparent: !0,
                depthWrite: !1
            })
        }

        function initPoints() {
            _points = new THREE.Points(_geometry, _shader.material), _this.add(_points)
        }
        Inherit(this, Object3D);
        const _this = this;
        let _geometry, _shader, _points, _position = [],
            _scale = [],
            _rotation = [],
            _speed = [];
        initGeometry(), initShader(), initPoints(), this.addParticles = addParticles
    }, () => {
        let _shader;
        Mist.getShader = function () {
            return _shader || (_shader = _this.initClass(Shader, "Mist", {
                uTime: World.TIME,
                uResolution: World.RESOLUTION,
                uTexture: {
                    value: Utils3D.getTexture("assets/images/mist.jpg")
                },
                uSwirl: {
                    value: Utils3D.getRepeatTexture("assets/images/swirl.jpg")
                },
                transparent: !0,
                depthWrite: !1
            })), _shader
        }
    }), Class(function PointLight(_data, _index, _shader) {
        function initMesh() {
            let radius = _data.scale[3 * _index],
                light = new THREE.PointLight(VideoColor.instance().directColor, 1, radius);
            Lighting.add(light), _this.add(light), light.section = _this.parent.parent;
            new THREE.Mesh(new THREE.IcosahedronBufferGeometry(1, 1), new THREE.MeshBasicMaterial({
                wireframe: !0,
                color: 16777215
            }));
            _this.group.position.fromArray(_data.position, 3 * _index), _this.group.rotation.setFromVector3((new Vec3).fromArray(_data.rotation, 3 * _index), "YXZ"), _this.group.scale.fromArray(_data.scale, 3 * _index)
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh()
    }), Class(function PostLight(_data, _index) {
        Inherit(this, Object3D)
    }), Class(function AlleyUI() {
        function initHTML() {
            ($this = _this.element).size("100%").css({
                opacity: .6
            }).invisible(), ($wrapper = $this.create(".wrapper")).size("100%"), UI.instance().add($this)
        }

        function initButton() {
            (_button = _this.initClass(UIButton, {
                width: _width,
                height: 56,
                text: "VIEW WORK"
            }, [$wrapper])).element.center(1, 0)
        }

        function initLine() {
            ($line = $wrapper.create(".line")).size(2, 100).css({
                bottom: 0,
                background: "rgba(255,255,255,0.2)"
            }), $line.inner = $line.create(".inner"), $line.inner.size("100%").bg("#fff").transform({
                scaleY: 0
            }).transformPoint("50%", "0%")
        }

        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize), _this.events.sub(_button, Events.HOVER, hover), _this.events.sub(_button, Events.CLICK, click)
        }

        function click() {
            Data.setNav("work")
        }

        function hover(e) {
            switch (_this.events.fire(ATEvents.HOME_BUTTON_HOVER, e), e.action) {
                case "over":
                    _this.over = !0, _this.events.fire(ATEvents.HOME_BUTTON_HOVER), $this.tween({
                        opacity: .9
                    }, 300, "easeOutSine"), $line.inner.clearTween().transform({
                        scaleY: 0
                    }).transformPoint("50%", "0%").tween({
                        scaleY: 1
                    }, 500, "easeInOutQuart");
                    break;
                case "out":
                    _this.over = !1, $this.tween({
                        opacity: .6
                    }, 600, "easeOutSine"), $line.inner.clearTween().transform({
                        scaleY: 1
                    }).transformPoint("50%", "100%").tween({
                        scaleY: 0
                    }, 500, "easeOutQuart")
            }
        }

        function resize() {
            let offset = .25 * Stage.height,
                height = .5 * Stage.height - offset;
            $this.size(_width, height).center().css({
                marginTop: offset
            }), $line.size(2, height - 56).center(1, 0)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $wrapper, $line, _button, _width = 170;
        initHTML(), initButton(), initLine(), addHandlers(), resize(), this.animateIn = function () {
            UI.instance().move(), $this && $this.visible().transform({
                y: 50
            }).tween({
                y: 0
            }, 1200, "easeOutQuart"), _button.animateIn(), $line.transformPoint("50%", "0%").transform({
                scaleY: 0
            }).tween({
                scaleY: 1
            }, 1200, "easeInOutQuart")
        }, this.animateOut = function (callback) {
            _button.animateOut(), $line.transformPoint("50%", "100%").tween({
                scaleY: 0
            }, 600, "easeOutQuart", callback)
        }
    }), Class(function UIButton(_config) {
        function initHTML() {
            ($this = _this.element).size(_config.width, _config.height).invisible().mouseEnabled(!0)
        }

        function initOutline() {
            _outline = _this.initClass(Tests.simpleUI() ? UIButtonOutlineSimple : UIButtonOutline, _config)
        }

        function initText() {
            ($text = $this.create(".text")).fontStyle("NexaBold", _size, "#fff"), $text.css({
                width: "100%",
                top: "50%",
                textAlign: "center",
                letterSpacing: 3,
                marginTop: Math.floor(-_size / 2) + 1,
                lineHeight: _size
            }), $text.text(_config.text), ($bg = $this.create(".bg")).size(_config.width - 8, _config.height - 8).css({
                top: 4,
                left: 4,
                opacity: 0
            }), $bg.transform({
                scaleY: (_config.height - 20) / (_config.height - 10),
                scaleX: (_config.width - 20) / (_config.width - 10)
            }).bg("#fff"), $over = $text.clone(), $this.add($over), $over.css({
                color: "#000",
                opacity: 0
            })
        }

        function addHandlers() {
            $this.interact(hover, click)
        }

        function hover(e) {
            if (_this.visible) switch (_this.events.fire(Events.HOVER, e), e.action) {
                case "over":
                    Global.HOVERED_UI = !0, $over.tween({
                        opacity: 1
                    }, 500, "easeOutSine"), $bg.tween({
                        scaleY: 1,
                        scaleX: 1,
                        opacity: 1
                    }, 300, "easeOutQuart"), _outline.over();
                    break;
                case "out":
                    Global.HOVERED_UI = !1, $over.tween({
                        opacity: 0
                    }, 500, "easeOutSine"), $bg.tween({
                        scaleY: (_config.height - 16) / (_config.height - 10),
                        scaleX: (_config.width - 16) / (_config.width - 10),
                        opacity: 0
                    }, 400, "easeOutQuart"), _outline.out()
            }
        }

        function click() {
            _this.visible && ($over.css({
                opacity: 1
            }).tween({
                opacity: 0
            }, 500, "easeOutSine"), $bg.transform({
                scaleY: 1,
                scaleX: 1
            }).css({
                opacity: 1
            }).tween({
                scaleY: (_config.height - 16) / (_config.height - 10),
                scaleX: (_config.width - 16) / (_config.width - 10),
                opacity: 0
            }, 400, "easeOutQuart"), _this.events.fire(Events.CLICK, _config))
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text, $bg, $over, _outline, _size = .2 * Math.round(_config.height);
        initHTML(), initOutline(), initText(), addHandlers(), this.animateIn = function () {
            _this.visible || (_this.visible = !0, $this.clearAlpha().visible(), $text.css({
                opacity: 0
            }).tween({
                opacity: 1
            }, 1e3, "easeInOutSine"), _outline.animateIn())
        }, this.animateOut = function () {
            _this.visible && (_this.visible = !1, $bg.tween({
                scaleY: 0
            }, 500, "easeOutQuart"), $text.tween({
                opacity: 0
            }, 200, "easeOutSine"), $over.tween({
                opacity: 0
            }, 200, "easeOutSine"), $this.tween({
                opacity: 0
            }, 500, "easeOutSine"), _outline.animateOut())
        }
    }), Class(function UIButtonOutline(_config) {
        function initHTML() {
            ($this = _this.element).size(_config.width, _config.height)
        }

        function initBorder() {
            ($top = $this.create("line")).size(_config.width, 2).css({
                background: "rgba(255,255,255,0.2)"
            }), $top.inner = $top.create(".inner"), $top.inner.size("100%").bg("#fff").transform({
                scaleX: 0
            }), ($left = $this.create("line")).size(2, _config.height - 4).css({
                top: 2,
                left: 0,
                background: "rgba(255,255,255,0.2)"
            }), $left.inner = $left.create(".inner"), $left.inner.size("100%").bg("#fff").transform({
                scaleY: 0
            }).transformPoint("50%", "0%"), ($right = $this.create("line")).size(2, _config.height - 4).css({
                top: 2,
                right: 0,
                background: "rgba(255,255,255,0.2)"
            }), $right.inner = $right.create(".inner"), $right.inner.size("100%").bg("#fff").transform({
                scaleY: 0
            }).transformPoint("50%", "0%"), ($bottomLeft = $this.create("line")).size(.5 * _config.width, 2).css({
                bottom: 0,
                left: 0,
                background: "rgba(255,255,255,0.2)"
            }), $bottomLeft.inner = $bottomLeft.create(".inner"), $bottomLeft.inner.size("100%").bg("#fff").transform({
                scaleX: 0
            }).transformPoint("0%", "50%"), ($bottomRight = $this.create("line")).size(.5 * _config.width, 2).css({
                bottom: 0,
                right: 0,
                background: "rgba(255,255,255,0.2)"
            }), $bottomRight.inner = $bottomRight.create(".inner"), $bottomRight.inner.size("100%").bg("#fff").transform({
                scaleX: 0
            }).transformPoint("100%", "50%")
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $top, $left, $right, $bottomLeft, $bottomRight;
        initHTML(), initBorder(), this.over = function () {
            $top.inner.tween({
                scaleX: 1
            }, 300, "easeOutQuart"), $left.inner.transformPoint("50%", "0%").tween({
                scaleY: 1
            }, 300, "easeOutQuart"), $right.inner.transformPoint("50%", "0%").tween({
                scaleY: 1
            }, 300, "easeOutQuart"), $bottomLeft.inner.transformPoint("0%", "50%").tween({
                scaleX: 1
            }, 300, "easeOutQuart"), $bottomRight.inner.transformPoint("100%", "50%").tween({
                scaleX: 1
            }, 300, "easeOutQuart")
        }, this.out = function () {
            $top.inner.tween({
                scaleX: 0
            }, 500, "easeOutQuart"), $left.inner.transformPoint("50%", "100%").tween({
                scaleY: 0
            }, 500, "easeOutQuart"), $right.inner.transformPoint("50%", "100%").tween({
                scaleY: 0
            }, 500, "easeOutQuart"), $bottomLeft.inner.transformPoint("100%", "50%").tween({
                scaleX: 0
            }, 500, "easeOutQuart"), $bottomRight.inner.transformPoint("0%", "50%").tween({
                scaleX: 0
            }, 500, "easeOutQuart")
        }, this.animateIn = function () {
            $top.transform({
                scaleX: 0
            }).tween({
                scaleX: 1
            }, 1e3, "easeInOutQuart"), $left.transformPoint("50%", "0%").transform({
                scaleY: 0
            }).tween({
                scaleY: 1
            }, 1e3, "easeInOutQuart"), $right.transformPoint("50%", "0%").transform({
                scaleY: 0
            }).tween({
                scaleY: 1
            }, 1e3, "easeInOutQuart"), $bottomLeft.transformPoint("0%", "50%").transform({
                scaleX: 0
            }).tween({
                scaleX: 1
            }, 1e3, "easeInOutQuart"), $bottomRight.transformPoint("100%", "50%").transform({
                scaleX: 0
            }).tween({
                scaleX: 1
            }, 1e3, "easeInOutQuart")
        }, this.animateOut = function () {
            $top.tween({
                scaleX: 0
            }, 500, "easeOutQuart"), $left.tween({
                scaleY: 0
            }, 500, "easeOutQuart"), $right.tween({
                scaleY: 0
            }, 500, "easeOutQuart"), $bottomLeft.tween({
                scaleX: 0
            }, 500, "easeOutQuart"), $bottomRight.tween({
                scaleX: 0
            }, 500, "easeOutQuart")
        }
    }), Class(function UIButtonOutlineSimple(_config) {
        function initHTML() {
            ($this = _this.element).size(_config.width - 4, _config.height - 4).css({
                border: "2px solid #fff",
                opacity: 0
            })
        }
        Inherit(this, Element);
        const _this = this;
        var $this;
        initHTML(), this.over = function () {
            $this.tween({
                opacity: 1
            }, 300, "easeOutSine")
        }, this.out = function () {
            $this.tween({
                opacity: .3
            }, 300, "easeOutSine")
        }, this.animateIn = function () {
            $this.tween({
                opacity: .3
            }, 500, "easeOutSine")
        }, this.animateOut = function () {
            $this.tween({
                opacity: 0
            }, 500, "easeOutSine")
        }
    }), Class(function ContactView() {
        function initHTML() {
            ($this = _this.element).size("100%").bg("#eee").css({
                overflow: "hidden"
            })
        }

        function initLinks() {
            _links = _this.initClass(ContactLinks)
        }

        function initText() {
            ($text = $this.create("Text")).fontStyle("Muncie", _size, "#000"), $text.size(8 * _size, .96 * _size).center(), $text.css({
                lineHeight: _size,
                textAlign: "center"
            }), $text.text((Device.mobile.phone, "CONTACT")), _letters = SplitTextfield.split($text)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text, _links, _letters, _size = Device.mobile.phone ? 240 : 410;
        initHTML(), initText(), initLinks(), this.animateIn = function () {
            _letters.forEach(letter => {
                letter.css({
                    opacity: .05
                }).transform({
                    y: .7 * Math.random(-_size, _size)
                }).tween({
                    opacity: .025,
                    y: 0
                }, 1400, "easeOutQuart")
            }), _links.animateIn()
        }
    }), Class(function ContactLinks() {
        function initHTML() {
            ($this = _this.element).size(600, Device.mobile.phone ? 150 : 200).center().css({
                textAlign: "center"
            })
        }

        function initSocial() {
            ($social = $this.create(".social")).css({
                position: "relative",
                display: "block",
                marginBottom: 0
            }), _tw = _this.initClass(ContactSocialButton, "tw", [$social]), _fb = _this.initClass(ContactSocialButton, "fb", [$social])
        }

        function initItems() {
            _links = [], [{
                text: "+359 876 181 954",
                url: "tel:+359876181954",
                type: "phone"
            }, {
                text: "inkyzfx@gmail.com",
                url: "mailto:inkyzfx@gmail.com",
                type: "email"
            }, {
                text: "ul. Druzky 27, Varna, Bulgaria",
                url: "#",
                type: "address"
            }].forEach(link => {
                let item = _this.initClass(ContactLinksItem, link);
                _links.push(item)
            })
        }

        function initNewsletter() {
            _newsletter = _this.initClass(ContactNewsletter)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $social, _tw, _fb, _links, _newsletter;
        initHTML(), initSocial(), initItems(), Device.mobile || initNewsletter(), this.animateIn = function () {
            _tw.animateIn(), _fb.animateIn(), _newsletter && _newsletter.animateIn(), _links.forEach((link, index) => {
                link.element.transform({
                    y: 40
                }).css({
                    opacity: 0
                }).tween({
                    y: 0,
                    opacity: 1
                }, 700, "easeOutQuart", 80 * index + 300)
            })
        }
    }), Class(function ContactLinksItem(_config) {
        function initHTML() {
            ($this = _this.element).css({
                position: "relative",
                display: "block",
                textAlign: "center",
                padding: "4px 0"
            }), ($inner = $this.create(".inner")).css({
                position: "relative",
                display: "inline-block"
            }), ($line = $inner.create(".line")).size("100%", 2).css({
                bottom: -2
            }).bg("#000").transform({
                scaleX: 0
            })
        }

        function initText() {
            $text = $inner.create(".selectable", "a"), Device.mobile && ($text.attr("href", _config.url), $text.div.target = "_blank", $text.css({
                height: 20
            })), $text.fontStyle("NexaBold", Device.mobile.phone ? 11 : 12, "#000"), $text.css({
                position: "relative",
                display: "inline-block",
                opacity: .6,
                letterSpacing: Device.mobile.phone ? 1 : 1.5,
                textTransform: "uppercase"
            }), $text.text(_config.text)
        }

        function addHandlers() {
            Device.mobile || $text.hover(hover).click(click)
        }

        function hover(e) {
            switch (e.action) {
                case "over":
                    $text.tween({
                        opacity: 1
                    }, 300, "easeOutSine"), $line.tween({
                        scaleX: 1
                    }, 300, "easeOutCubic");
                    break;
                case "out":
                    $text.tween({
                        opacity: .6
                    }, 500, "easeOutSine"), $line.tween({
                        scaleX: 0
                    }, 500, "easeOutCubic")
            }
        }

        function click() {
            if (Tracking.event("contact", "click", _config.type), "phone" === _config.type || "email" === _config.type) return window.location.href = _config.url;
            open(_config.url)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text, $inner, $line;
        initHTML(), initText(), addHandlers(), this.animateIn = function () {}
    }), Class(function ContactNewsletter() {
        function initHTML() {
            ($this = _this.element).size(_width, 50).css({
                margin: "0 auto",
                marginTop: 15,
                position: "relative",
                display: "block"
            }).bg("#e4e4e4").invisible(), ($input = $this.create(".input", "input")).fontStyle("NexaBold", _size, "#111"), $input.size(_width, 50).center(1, 0).bg("#ddd").css({
                opacity: 0,
                border: "none",
                outline: "none",
                letterSpacing: Device.mobile.phone ? 1 : 1.5,
                textAlign: "center",
                textTransform: "uppercase"
            }), ($label = $this.create(".text")).fontStyle("NexaLight", _size, "#888"), $label.size("100%").css({
                letterSpacing: Device.mobile.phone ? 1 : 1.5,
                textAlign: "center",
                top: 18,
                textTransform: "uppercase"
            }).mouseEnabled(!1), $label.text("ENTER EMAIL FOR NEWSLETTER")
        }

        function initSubmit() {
            _submit = _this.initClass(ContactNewsletterSubmit)
        }

        function addHandlers() {
            $input.div.onfocus = focus, $input.div.onblur = blur, $input.div.oninput = change, $input.mouseEnabled(!0), $this.click(focus), _this.events.sub(_submit, Events.CLICK, submit)
        }

        function change() {
            validateEmail($input.div.value) ? _submit.animateIn() : _submit.animateOut()
        }

        function focus() {
            $input.div.focus(), $input.tween({
                opacity: 1
            }, 300, "easeOutSine"), $label.tween({
                opacity: 0
            }, 300, "easeOutSine")
        }

        function blur() {
            "" === $input.div.value && ($input.tween({
                opacity: 0
            }, 300, "easeOutSine"), $label.tween({
                opacity: 1
            }, 300, "easeOutSine"))
        }

        function validateEmail(email) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        }

        function submit() {
            let value = $input.div.value,
                email = "";
            validateEmail(value) ? (email = value, function send() {
                function complete(error) {
                    $input.div.value = "", $input.tween({
                        opacity: 0
                    }, 300, "easeOutSine"), $label.text(error ? "ERROR SUBMITTING EMAIL" : "YOUR EMAIL IS SUBSCRIBED"), $label.tween({
                        opacity: 1
                    }, 300, "easeOutSine"), _this.delayedCall(_ => {
                        $label.tween({
                            opacity: 0
                        }, 300, "easeOutSine", function () {
                            $label.text("ENTER EMAIL FOR NEWSLETTER").tween({
                                opacity: 1
                            }, 300, "easeOutSine")
                        })
                    }, 2e3);
                    let duration = (Date.now() - start) / 1e3;
                    error ? Tracking.event("newsletter", "error", null, duration) : Tracking.event("newsletter", "success", null, duration)
                }
                $input.div.blur(), _submit.animateOut();
                let start = Date.now();
                post("#", {
                    email: email
                }).then(function (response) {
                    response && response.success ? complete() : (complete(!0), console.log("error submitting form", response))
                }).catch(function (error) {
                    complete(!0), console.log("error submitting form", error)
                }), Tracking.event("newsletter", "send")
            }()) : ($label.text("INVALID EMAIL ADDRESS"), $label.stopTween().tween({
                opacity: 1
            }, 300, "easeOutSine", function () {
                $input.tween({
                    opacity: 1
                }, 300, "easeOutSine", 800), $label.tween({
                    opacity: 0
                }, 300, "easeOutSine", 800, function () {
                    $label.text("ENTER EMAIL FOR NEWSLETTER")
                })
            }))
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $input, $label, _submit, _width = Device.mobile.phone ? 340 : 380,
            _size = Device.mobile.phone ? 11 : 12;
        initHTML(), initSubmit(), addHandlers(), this.animateIn = function () {
            $this.visible().transform({
                y: 50
            }).css({
                opacity: 0
            }).tween({
                y: 0,
                opacity: 1
            }, 1e3, "easeOutQuart", 500)
        }
    }), Class(function ContactNewsletterSubmit() {
        function initHTML() {
            ($this = _this.element).size(50, 50).css({
                right: -50
            }).transformPoint("0%", "50%").bg("#000").invisible(), ($bg = $this.create(".bg")).size("100%").bg("#fff").transformPoint("0%", "50%").transform({
                scaleX: 0
            }), ($arrow = $this.create(".arrow")).size(24, 24).center().bg("assets/images/ui/arrow-white.png"), ($arrow2 = $this.create(".arrow")).size(24, 24).center().bg("assets/images/ui/arrow.png").transform({
                x: -20
            }).css({
                opacity: 0
            })
        }

        function addHandlers() {
            $this.interact(hover, click), _this.events.sub(KeyboardUtil.PRESS, press)
        }

        function hover(e) {
            if (_this.visible) switch (e.action) {
                case "over":
                    $arrow.tween({
                        x: 20,
                        opacity: 0
                    }, 300, "easeOutCubic"), $arrow2.tween({
                        x: 0,
                        opacity: 1
                    }, 300, "easeOutCubic"), $bg.tween({
                        scaleX: 1
                    }, 300, "easeOutCubic");
                    break;
                case "out":
                    $arrow.tween({
                        x: 0,
                        opacity: 1
                    }, 300, "easeOutCubic"), $arrow2.tween({
                        x: -20,
                        opacity: 0
                    }, 300, "easeOutCubic"), $bg.tween({
                        scaleX: 0
                    }, 500, "easeOutCubic")
            }
        }

        function press(e) {
            13 == e.keyCode && click()
        }

        function click() {
            _this.visible && _this.events.fire(Events.CLICK)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $bg, $arrow, $arrow2;
        initHTML(), addHandlers(), this.animateIn = function () {
            _this.visible || (_this.visible = !0, $this.visible(), $arrow.transform({
                x: -20
            }).css({
                opacity: 0
            }).tween({
                x: 0,
                opacity: 1
            }, 500, "easeOutCubic"), $this.transform({
                scaleX: 0
            }).tween({
                scaleX: 1
            }, 500, "easeOutCubic"))
        }, this.animateOut = function () {
            _this.visible && (_this.visible = !1, $arrow.tween({
                x: -20,
                opacity: 0
            }, 500, "easeOutCubic"), $this.tween({
                scaleX: 0
            }, 500, "easeOutCubic", function () {
                $this.invisible()
            }))
        }
    }), Class(function ContactSocialButton(_type) {
        function initHTML() {
            ($this = _this.element).size(_size, _size).css({
                position: "relative",
                display: "inline-block"
            }), ($icon = $this.create(".icon")).size(.65 * _size, .65 * _size).center().bg("assets/images/ui/" + _type + ".png").css({
                opacity: .7
            })
        }

        function addHandlers() {
            $this.interact(hover, click)
        }

        function hover(e) {
            switch (e.action) {
                case "over":
                    $icon.tween({
                        opacity: 1
                    }, 300, "easeOutSine");
                    break;
                case "out":
                    $icon.tween({
                        opacity: .7
                    }, 300, "easeOutSine")
            }
        }

        function click() {
            switch (_type) {
                case "tw":
                    open("https://twitter.com/stfkolev");
                    break;
                case "fb":
                    open("https://www.facebook.com/stfkolev")
            }
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $icon, _size = 40;
        initHTML(), addHandlers(), this.animateIn = function () {
            $this.visible().transform({
                y: 50
            }).css({
                opacity: 0
            }).tween({
                y: 0,
                opacity: 1
            }, 1e3, "easeOutQuart")
        }
    }), FX.Class(function Deferred() {
        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            e.state.includes("alley") ? _this.startRender(loop) : _this.stopRender(loop)
        }

        function loop() {
            FX.WorldPosition.instance().render(), FX.Normals.instance().render(), FX.Depth.instance().render()
        }
        Inherit(this, Component);
        const _this = this;
        addListeners(), this.add = function (mesh) {
            FX.WorldPosition.instance().add(mesh), FX.Normals.instance().add(mesh), FX.Depth.instance().add(mesh)
        }
    }, "singleton"), FX.Class(function Depth() {
        Inherit(this, FXLayer);
        const _this = this;
        _this.rtType = Utils3D.getFloatType(), _this.create(World.NUKE)
    }, "singleton"), FX.Class(function MVPos() {
        Inherit(this, FXLayer);
        const _this = this;
        _this.rtType = Utils3D.getFloatType(), _this.create(World.NUKE)
    }, "singleton"), FX.Class(function Normals() {
        Inherit(this, FXLayer);
        const _this = this;
        _this.rtType = Utils3D.getFloatType(), _this.create(World.NUKE)
    }, "singleton"), FX.Class(function WorldPosition() {
        Inherit(this, FXLayer);
        const _this = this;
        _this.rtType = Utils3D.getFloatType(), _this.create(World.NUKE)
    }, "singleton"), FX.Class(function Distortion() {
        function initCopyScene() {
            (_copy = _this.initClass(FXScene, World.NUKE)).setDPR(1);
            let geom = World.QUAD,
                shader = new Shader("ScreenQuad", {
                    tMap: {
                        value: null
                    }
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            mesh.frustumCulled = _copy.shader = shader, _copy.scene.add(mesh), shader.set("tMap", Utils3D.getTexture("assets/images/alley/water-normals.jpg"))
        }

        function getQuad() {
            let geom = World.QUAD,
                shader = new Shader("ScreenQuad", {
                    tMap: {
                        value: null
                    },
                    depthWrite: !1
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            return mesh.frustumCulled = !1, {
                mesh: mesh,
                shader: shader
            }
        }

        function initMesh() {
            let {
                shader: shader,
                mesh: mesh
            } = getQuad();
            _shader = shader, _this.scene.add(mesh), _shader.set("tMap", _copy.rt.texture)
        }

        function initPass() {
            _pass = _this.initClass(NukePass, "DistortionInteraction", {
                uTime: World.TIME,
                uMix: {
                    value: 1
                },
                tInput: {
                    value: InteractionMask.instance().texture
                },
                tNormal: {
                    value: Utils3D.getTexture("assets/images/alley/water-normals.jpg")
                }
            }), _this.nuke.add(_pass)
        }

        function loop() {
            _copy.render(), _this.render();
            let target = 1;
            InteractionMask.instance().delta.lengthSq() < .01 ? _tick++ > 10 && (target = 0) : (_tick = 0, _pass.uniforms.uMix.value = 1), _pass.uniforms.uMix.value += .01 * (target - _pass.uniforms.uMix.value)
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState), _this.events.sub(Events.RESIZE, resizeHandler)
        }
        async function resizeHandler() {
            _copy.shader.set("tMap", Utils3D.getTexture("assets/images/alley/water-normals.jpg")), await _this.wait(50), _copy.shader.set("tMap", _this.rt.texture)
        }

        function internalState(e) {
            e.state.includes("alley") ? _this.startRender(loop) : _this.stopRender(loop)
        }
        Inherit(this, FXScene);
        var _shader, _copy, _pass, _this = this,
            _tick = 0;
        !async function () {
            _this.create(World.NUKE), _this.setDPR(1), initCopyScene(), initMesh(), initPass(), addListeners(), await _this.wait(50), _copy.shader.set("tMap", _this.rt.texture)
        }()
    }, "singleton"), FX.Class(function DOF() {
        function initPasses() {
            [new THREE.Vector2(1 * World.DPR, 0), new THREE.Vector2(0, 1 * World.DPR)].forEach(dir => {
                let pass = _this.initClass(NukePass, "VFXDOF", {
                    resolution: World.RESOLUTION,
                    dir: {
                        value: dir
                    },
                    tDepth: {
                        value: FX.Depth.instance().rt.texture
                    }
                });
                _this.passes.push(pass)
            })
        }
        Inherit(this, Component);
        const _this = this;
        this.passes = [], Tests.vfxDOF() && initPasses()
    }, "singleton"), FX.Class(function Fog() {
        function loop() {
            _this.render()
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            Tests.fallbackAlley() || (e.state.includes("alley/alley") ? _this.startRender(loop) : _this.stopRender(loop))
        }
        Inherit(this, FXScene);
        var _this = this;
        this.resolution = .5, _this.rtType = Utils3D.getFloatType(), _this.autoVisible = !1, _this.create(World.NUKE), _this.setDPR(1), addListeners(), this.add = function (mesh) {
            this.addObject(mesh);
            mesh.visible = !1
        }
    }, "singleton"), FX.Class(function AboutLights() {
        function initPasses() {
            [new THREE.Vector2(2 * World.DPR, 0), new THREE.Vector2(0, 2 * World.DPR)].forEach(dir => {
                let pass = _this.initClass(NukePass, "LightBlur", {
                    resolution: World.RESOLUTION,
                    dir: {
                        value: dir
                    }
                });
                _this.nuke.add(pass)
            });
            let volume = new NukePass("LightVolume", {
                unique: "lv-about",
                lightPos: {
                    type: "v2",
                    value: _lightPos
                },
                fExposure: {
                    type: "f",
                    value: .2
                },
                fDecay: {
                    type: "f",
                    value: .93
                },
                fDensity: {
                    type: "f",
                    value: .96
                },
                fWeight: {
                    type: "f",
                    value: .4
                },
                fClamp: {
                    type: "f",
                    value: 1
                }
            });
            _this.nuke.add(volume), ShaderUIL.add(volume)
        }

        function loop() {
            _lightPos.copy(_proj.project(_light3D)), _lightPos.x /= Stage.width, _lightPos.y /= Stage.height, _lightPos.y = 1 - _lightPos.y, _this.render()
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            Tests.renderHologramLight() && (e.state.includes("about") ? _this.startRender(loop) : _this.stopRender(loop))
        }
        Inherit(this, FXScene);
        const _this = this;
        var _lightPos = new Vector2,
            _light3D = new Vector3(.45, 3.18, -.06),
            _proj = new ScreenProjection(World.CAMERA);
        _this.resolution = .5, _this.create(World.NUKE), _this.setDPR(1), initPasses(), addListeners(), this.add = function (mesh) {
            this.addObject(mesh)
        }, this.addOccluder = function (mesh) {
            let obj = this.addObject(mesh),
                shader = _this.initClass(Shader, "LightOccluder");
            obj.material = shader.material
        }
    }, "singleton"), FX.Class(function HologramLights() {
        function initPasses() {
            [new THREE.Vector2(3 * World.DPR, 0), new THREE.Vector2(0, 3 * World.DPR)].forEach(dir => {
                let pass = _this.initClass(NukePass, "LightBlur", {
                    resolution: World.RESOLUTION,
                    dir: {
                        value: dir
                    }
                });
                _this.nuke.add(pass)
            });
            let volume = new NukePass("LightVolume", {
                unique: "lv-hologram",
                lightPos: {
                    type: "v2",
                    value: new THREE.Vector2(.5, .5)
                },
                fExposure: {
                    type: "f",
                    value: .2
                },
                fDecay: {
                    type: "f",
                    value: .93
                },
                fDensity: {
                    type: "f",
                    value: .96
                },
                fWeight: {
                    type: "f",
                    value: .4
                },
                fClamp: {
                    type: "f",
                    value: 1
                }
            });
            _this.nuke.add(volume), ShaderUIL.add(volume)
        }

        function loop() {
            _this.render()
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            if (!Tests.renderHologramLight()) return !1;
            e.state.includes("list") ? (_this.startRender(loop), tween(_this.blend, {
                value: 1
            }, 500, "easeOutCubic", 250)) : (_this.stopRender(loop), tween(_this.blend, {
                value: 0
            }, 300, "easeOutCubic"))
        }
        Inherit(this, FXScene);
        const _this = this;
        var _list;
        this.invert = {
            value: 0
        }, this.blend = {
            value: 0
        }, _this.create(World.NUKE), _this.setDPR(1), _this.resolution = .5, initPasses(), addListeners(), this.add = function (mesh) {
            this.addObject(mesh)
        }, this.set("list", list => {
            _list = list
        })
    }, "singleton"), FX.Class(function Lights() {
        function initMirror() {
            _mirror = _this.initClass(FX.Mirror), _this.mirror = _mirror
        }

        function createMaterial(mesh, options) {
            let shader = new Shader(options.screen ? "DeferredScreen" : "DeferredLight", {
                tDepth: {
                    value: FX.Depth.instance().rt.texture
                },
                uColor: VideoColor.instance().normalizedColor,
                uRadius: {
                    value: options.radius || 1
                },
                uPos: {
                    value: mesh.position
                },
                uScale: {
                    value: 1.3
                },
                uColorScale: {
                    value: .5
                },
                uResolution: World.RESOLUTION,
                side: THREE.DoubleSide
            });
            return options.screen && (shader.uniforms.tMap = {
                value: VideoColor.instance().reducedTexture
            }), shader.material
        }

        function initBlurScene() {
            let layer = _this.initClass(FXScene, World.NUKE);
            layer.setDPR(Tests.getAlleyDPR()), layer.resolution = .2;
            let geom = World.QUAD,
                shader = new Shader("ScreenQuad", {
                    tMap: {
                        value: _this.rt.texture
                    }
                }),
                mesh = new THREE.Mesh(geom, shader.material);
            layer.scene.add(mesh), _this.blur = layer.rt, [new THREE.Vector2(3 * World.DPR, 0), new THREE.Vector2(0, 3 * World.DPR)].forEach(dir => {
                let pass = _this.initClass(NukePass, "LightBlur", {
                    resolution: World.RESOLUTION,
                    dir: {
                        value: dir
                    }
                });
                layer.nuke.add(pass)
            });
            let volume = new NukePass("LightVolume", {
                lightPos: {
                    type: "v2",
                    value: new THREE.Vector2(.5, .8)
                },
                fExposure: {
                    type: "f",
                    value: .2
                },
                fDecay: {
                    type: "f",
                    value: .93
                },
                fDensity: {
                    type: "f",
                    value: .96
                },
                fWeight: {
                    type: "f",
                    value: .4
                },
                fClamp: {
                    type: "f",
                    value: 1
                }
            });
            layer.nuke.add(volume), ShaderUIL.add(volume), _lightBlurLayer = layer
        }

        function loop() {
            _this.render(), _lightBlurLayer.render(), _position.render(), _mirror.render()
        }

        function initPositionLayer() {
            (_position = _this.initClass(FXLayer, _this.nuke, Utils3D.getFloatType())).name = "LightPosition", _this.pos = _position.rt
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            Tests.fallbackAlley() || (e.state.includes("alley/alley") ? _this.startRender(loop) : _this.stopRender(loop))
        }
        Inherit(this, FXScene);
        const _this = this;
        var _position, _mirror, _lightBlurLayer;
        this.resolution = Tests.getLightsDPR(), _this.rtType = Utils3D.getFloatType(), _this.create(World.NUKE), initMirror(), initPositionLayer(), initBlurScene(), addListeners(), this.add = function (mesh, options) {
            let clone = this.addObject(mesh);
            clone.material = createMaterial(clone, options), _position.add(clone), _mirror.add(clone)
        }
    }, "singleton"), FX.Class(function Mirror() {
        function initMirror() {
            let size = Tests.getMirrorRes();
            (_mirror = new THREE.Mirror(World.RENDERER, World.CAMERA, {
                clipBias: .1,
                textureWidth: size,
                textureHeight: size
            })).rotation.x = Math.radians(-90), _this.scene.add(_mirror), _this.preventRTDraw = !0, _this.reflection = {
                value: _mirror.renderTarget.texture
            }, _this.textureMatrix = {
                value: _mirror.textureMatrix
            }
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            _mirror.updateTextureMatrix()
        }
        Inherit(this, FXScene);
        const _this = this;
        var _mirror;
        const ENABLED = Tests.renderMirror();
        var _objects = [];
        _this.create(World.NUKE), initMirror(), addListeners(), this.set("rotation", v => {
            _mirror.rotation.x = v.x, _mirror.rotation.y = v.y, _mirror.rotation.z = v.z
        }), this.set("position", v => {
            _mirror.position.copy(v)
        }), this.add = function (mesh) {
            let obj = this.addObject(mesh);
            _objects.push(obj)
        }, this.render = function () {
            if (ENABLED && _objects[0]) {
                let uScale = _objects[0].material.shader.uniforms.uScale.value,
                    uColorScale = _objects[0].material.shader.uniforms.uColorScale.value;
                for (let i = 0; i < _objects.length; i++) {
                    let shader = _objects[i].material.shader;
                    shader.set("uScale", .45), shader.set("uColorScale", 1)
                }
                for (_this.draw(), _mirror.render(), i = 0; i < _objects.length; i++) {
                    let shader = _objects[i].material.shader;
                    shader.set("uScale", uScale), shader.set("uColorScale", uColorScale)
                }
            }
        }
    }), FX.Class(function Output() {
        function initMesh() {
            let geom = World.QUAD;
            _shader = _this.initClass(Shader, "ScreenQuad", {
                tMap: {
                    value: World.NUKE.output
                }
            });
            let mesh = new THREE.Mesh(geom, _shader.material);
            _this.scene.add(mesh)
        }

        function loop() {
            _shader.set("tMap", World.NUKE.output), _this.render()
        }
        Inherit(this, FXScene);
        const _this = this;
        var _shader;
        this.resolution = .2, _this.create(World.NUKE), _this.setDPR(1), initMesh(), _this.startRender(loop)
    }, "singleton"), Class(function LoaderView() {
        function initHTML() {
            $this.size(_this.width, _this.height).center().setZ(1), ($text = $this.create("Text")).fontStyle("Muncie", _size, "#fff"), $text.size(_this.width, .95 * _size).center(), $text.css({
                width: "100%",
                lineHeight: _size,
                textAlign: "center"
            }), $text.div.innerHTML = 0, ($solid = $this.create(".solid")).size(_this.width, _this.height).center().transformPoint("0%", "50%").bg("#fff"), $solid.transform({
                scaleX: 0
            }), _slices = [];
            let width = Math.round(_this.width / 6);
            for (var i = 0; i < 6; i++) {
                let $slice = $solid.create(".slice");
                $slice.size(width, _this.height).css({
                    left: width * i - 1
                }).bg("#fff"), _slices.push($slice)
            }
        }

        function loop() {
            $text.div.innerHTML = Math.round(99 * _loaded.v), $solid.scaleX = _loaded.v, $solid.transform(), 1 == _loaded.v && complete()
        }

        function complete() {
            _this.stopRender(loop), _this.events.fire(Events.COMPLETE), $text.html("99")
        }
        Inherit(this, Element);
        const _this = this,
            $this = this.element;
        let $text, $solid;
        var _slices, _loaded = {
                v: 0
            },
            _size = Device.mobile.phone ? 160 : 210;
        _this.width = Math.round(1.5 * _size), _this.height = Math.round(.12 * _this.width), initHTML(), _this.startRender(loop), this.progress = function (e) {
            tween(_loaded, {
                v: e.percent
            }, 1e3, "easeOutSine")
        }, this.animateOut = function (callback) {
            $solid.css({
                background: ""
            });
            let home = "home" == Data.getState(),
                time = home ? 1600 : 500,
                y = home ? 120 : 50;
            $text.html("100").tween({
                opacity: 0
            }, home ? 500 : 200, "easeOutSine", 100), _slices.forEach(slice => {
                slice.tween({
                    y: Math.random(-y, y),
                    scaleY: 0,
                    opacity: 0
                }, time, home ? "easeInOutQuart" : "easeInOutCubic")
            }), _this.delayedCall(callback, time + 100)
        }
    }), FX.Class(function Logo() {
        function loop() {
            _this.render(), Global.HOLD_VALUE = _this.hold.value
        }

        function initMesh() {
            let geom = World.QUAD;
            _shader = _this.initClass(Shader, "LogoTexture", {
                tMap: {
                    value: Utils3D.getTexture("assets/images/alley/logo.jpg")
                },
                tNormal: {
                    value: Utils3D.getTexture("assets/images/alley/water-normals.jpg")
                },
                uTransition: {
                    value: 1
                },
                uAlpha: {
                    value: 1
                }
            });
            let mesh = new THREE.Mesh(geom, _shader.material);
            mesh.scale.setScalar(.5), mesh.position.z = 3, mesh.scale.multiplyScalar(5.8), _this.scene.add(mesh), (_mesh = mesh).visible = !1
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState), _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            Device.mobile.phone && (Stage.width > Stage.height ? (_mesh.scale.setScalar(.5), _mesh.scale.multiplyScalar(6)) : (_mesh.scale.setScalar(.5), _mesh.scale.multiplyScalar(4))), _scale = _mesh.scale.x, _this.nuke.camera.aspect = Stage.width / Stage.height, _this.nuke.camera.updateProjectionMatrix()
        }

        function internalState(e) {
            e.state.includes("alley/alley") ? (_this.events.sub(Mouse.input, Interaction.START, start), _this.events.sub(Mouse.input, Interaction.END, end), _this.events.sub(ATEvents.HOME_BUTTON_HOVER, randomColor), _this.startRender(loop)) : (_this.events.unsub(Mouse.input, Interaction.START, start), _this.events.unsub(Mouse.input, Interaction.END, end), _this.events.unsub(ATEvents.HOME_BUTTON_HOVER, randomColor), _this.stopRender(loop))
        }

        function start() {
            let element = document.elementFromPoint(Mouse.x, Mouse.y);
            element && "hit" == element.className || (_down = !0, _shader.set("tMap", Utils3D.getTexture("assets/images/alley/logo-hold.jpg")), _this.holdTransition.value = 1, tween(_this.holdTransition, {
                value: 0
            }, 500, "easeOutBack"), tween(_this.hold, {
                value: 1
            }, 300, "easeOutBack"), _mesh.scale.multiplyScalar(1.2), tween(_mesh.scale, {
                x: _scale,
                y: _scale,
                z: _scale
            }, 300, "easeOutCubic"), Render.start(randomColor, 12))
        }

        function randomColor() {
            VideoColor.instance().active++, VideoColor.instance().active > 20 && (VideoColor.instance().active = 0)
        }

        function end() {
            _down && (_down = !1, _shader.set("tMap", Utils3D.getTexture("assets/images/alley/logo.jpg")), _this.holdTransition.value = 1, tween(_this.holdTransition, {
                value: 0
            }, 500, "easeOutBack"), tween(_this.hold, {
                value: 0
            }, 300, "easeOutBack"), Render.stop(randomColor))
        }
        Inherit(this, FXScene);
        const _this = this;
        var _shader, _mesh, _down;
        this.hold = {
            value: 0
        }, this.holdTransition = {
            value: 0
        };
        var _scale = 1;
        _this.create(World.NUKE), _this.nuke.camera = new THREE.PerspectiveCamera(70, Stage.width / Stage.height, .1, 100), _this.nuke.camera.position.set(0, 0, 10), initMesh(), addListeners(), resizeHandler(), this.animateIn = function () {
            _mesh.visible = !0, _shader.set("uAlpha", 0), _shader.set("uTransition", 1), _shader.tween("uAlpha", 1, 1e4, "easeInOutSine", 1e3), _shader.tween("uTransition", 0, 2e3, "easeOutCubic", 1e3)
        }, this.animateOut = function () {
            _shader.tween("uAlpha", 0, 600, "easeOutSine")
        }, this.glitch = function () {
            _this.flag("glitch") || (_this.flag("glitch", !0), start(), _this.delayedCall(_ => {
                end(), _this.flag("glitch", !1)
            }, 200))
        }
    }, "singleton"), Class(function NavView() {
        function initHTML() {
            ($this = _this.element).css({
                position: "static"
            }).invisible()
        }

        function initLogo() {
            let size = Device.mobile.phone ? 34 : 40;
            ($logo = $this.create(".logo")).size(size, size).bg("assets/images/ui/at-logo.png"), $logo.interact(e => {
                if ($logo.clicked || !_this.visible) return;
                let over = "over" == e.action;
                $logo.tween({
                    opacity: over ? .7 : 1
                }, over ? 200 : 400, "easeOutSine")
            }, _ => {
                $logo.clicked = !0, Data.setNav("home"), $logo.tween({
                    opacity: 0
                }, 400, "easeOutSine")
            }), $logo.hit.mouseEnabled(!0)
        }

        function initContact() {
            _contact = _this.initClass(NavContact)
        }

        function initItems() {
            $items = $this.create(".items");
            _items = [];
            let x = 0,
                gap = Device.mobile.phone ? 0 : 20;
            [{
                type: "Work",
                width: 70
            }, {
                type: "Lab",
                width: 53
            }, {
                type: "About",
                width: 80
            }].forEach((data, index) => {
                Device.mobile.phone && (data.width *= .9), data.index = index;
                let item = _this.initClass(NavItem, data, [$items]);
                item.type = data.type.toLowerCase(), item.element.css({
                    left: x
                }), x += data.width + gap, _items.push(item)
            }), $items.width = x - gap
        }

        function addHandlers() {
            _this.events.sub(ATEvents.EXTERNAL_STATE, stateChange), _this.events.sub(Events.RESIZE, resize)
        }

        function stateChange(e) {
            let value = e.value.split("/")[0];
            _items.forEach(item => {
                item.type == value ? item.activate() : item.deactivate()
            })
        }

        function resize() {
            $logo.css({
                top: Config.UI_OFFSET,
                left: Config.UI_OFFSET
            });
            let offset = (Device.mobile.phone, 0);
            $items.size($items.width, 30).css({
                left: (Stage.width - $items.width) / 2 + offset,
                top: Config.UI_OFFSET
            }), _contact.element.css({
                top: Stage.height - Config.UI_OFFSET - 10,
                left: Config.UI_OFFSET + 10
            })
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $items, $logo, _items, _contact;
        initHTML(), initItems(), initLogo(), initContact(), addHandlers(), resize(), this.animateIn = function (perma) {
            if (_contact.animateIn(), !perma || "home" == perma) return;
            if (_this.visible) return;
            _this.visible = !0, $this.visible(), $logo.clicked = !1, $logo.css({
                opacity: 0
            }).tween({
                opacity: 1
            }, 2500, "easeInOutSine");
            let state = Data.currentState().split("/")[0];
            _items.forEach((item, i) => {
                _this.delayedCall(item.animateIn, 200 * i + 500, item.type == state)
            })
        }, this.animateOut = function () {
            _contact.animateOut(), _this.visible && (_this.visible = !1, $this.tween({
                opacity: 0
            }, 500, "easeInSine", function () {
                _items.forEach((item, i) => {
                    item.reset()
                }), $logo.css({
                    opacity: 0
                }), $this.invisible().clearAlpha()
            }))
        }
    }), Class(function NavContact() {
        function initHTML() {
            ($this = _this.element).size(_this.width, 16).css({
                opacity: 0
            }), $this.transform({
                rotation: -90
            }).transformPoint("0%", "100%").invisible(), ($line = $this.create(".line")).size(_this.width, 2).css({
                bottom: 0,
                background: "rgba(255,255,255,0.2)"
            }), $line.inner = $line.create(".inner"), $line.inner.size("100%").bg("#fff").transformPoint("100%", "50%").transform({
                scaleX: 0
            }).css({
                opacity: .6
            })
        }

        function initText() {
            ($text = $this.create(".text")).fontStyle("NexaBold", Device.mobile.phone ? 9 : 10, "#fff"), $text.css({
                whiteSpace: "nowrap",
                opacity: .6,
                letterSpacing: Device.mobile.phone ? 3 : 4,
                textTransform: "uppercase",
                textAlign: "left",
                width: "100%"
            }), $text.text("CONTACT")
        }

        function addHandlers() {
            $this.interact(hover, click), $this.hit.size(_this.width + 40, 40).center()
        }

        function hover(e) {
            switch (e.action) {
                case "over":
                    UI.instance().showContact()
            }
        }

        function animateLine() {
            $line.inner.transformPoint("100%", "50%").tween({
                scaleX: 1
            }, 700, "easeInQuart", function () {
                $line.inner.transformPoint("0%", "50%").tween({
                    scaleX: 0
                }, 700, "easeOutQuart", 100)
            })
        }

        function click() {}
        Inherit(this, Element);
        const _this = this;
        var $this, $line, $text;
        _this.width = Device.mobile.phone ? 62 : 73, initHTML(), initText(), addHandlers(), this.animateIn = function () {
            if (_this.visible) return;
            _this.visible = !0;
            let delay = "home" == Data.getState() ? 4e3 : 500;
            $this.visible().css({
                opacity: 0
            }).tween({
                opacity: 1
            }, 2e3, "easeInOutSine", delay), clearTimeout(_this.timeout), _this.timeout = _this.delayedCall(animateLine, delay + 1500)
        }, this.animateOut = function () {
            _this.visible && (_this.visible = !1, $this.tween({
                opacity: 0
            }, 400, "easeInOutSine", function () {
                $this.invisible()
            }))
        }
    }), Class(function NavItem(_data) {
        function initHTML() {
            ($this = _this.element).size(_data.width, _this.height).invisible()
        }

        function initText() {
            ($text = $this.create(".text")).fontStyle("NexaBold", Device.mobile.phone ? 9 : 11, "#fff"), $text.css({
                letterSpacing: "0.4em",
                top: "50%",
                marginTop: -6,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                textAlign: "center",
                width: "100%",
                left: 3,
                opacity: .6
            }), $text.text(_data.type), Tests.simpleUI() || ($text.letters = SplitTextfield.split($text, "letter")), $over = $text.clone(), $this.add($over), $over.css({
                opacity: 0
            }).transform({
                y: 10
            })
        }

        function initLine() {
            ($line = $this.create(".line")).size(_data.width - 20, 2).css({
                left: 10,
                bottom: Device.mobile.phone ? 7 : 8
            }).bg("#fff").transform({
                scaleX: 0
            })
        }

        function initTop() {
            ($top = $this.create(".top")).height = Config.UI_OFFSET, $top.size(1, $top.height).center(1, 0).css({
                bottom: _this.height
            }).bg("#fff").transform({
                scaleY: 0
            }).transformPoint("50%", "0%")
        }

        function addHandlers() {
            $this.interact(hover, click);
            let extra = Device.mobile.phone ? 0 : 30;
            $this.hit.mouseEnabled(!0).size(_data.width + extra, 2 * _this.height).center()
        }

        function hover(e) {
            if (!_this.activated) switch (e.action) {
                case "over":
                    Global.HOVERED_UI = !0, $text.tween({
                        y: -10,
                        opacity: 0,
                        math: !0
                    }, 300, "easeOutQuart"), $over.tween({
                        y: 0,
                        opacity: 1,
                        math: !0
                    }, 500, "easeOutQuart"), $top.tween({
                        scaleY: 1,
                        y: 0
                    }, 300, "easeOutQuart");
                    break;
                case "out":
                    Global.HOVERED_UI = !1, $text.tween({
                        y: 0,
                        opacity: .6,
                        math: !0
                    }, 500, "easeOutQuart"), $over.tween({
                        y: 10,
                        opacity: 0,
                        math: !0
                    }, 300, "easeOutQuart"), $top.transformPoint("50%", "0%").tween({
                        scaleY: 0,
                        y: 0
                    }, 600, "easeOutQuart")
            }
        }

        function click() {
            Data.setNav(_data.type.toLowerCase())
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text, $over, $line, $top;
        _this.height = Device.mobile.phone ? 34 : 40, initHTML(), initText(), initLine(), initTop(), addHandlers(), this.activate = function () {
            _this.activated || (_this.activated = !0, $line.tween({
                scaleX: 1
            }, 500, "easeInOutQuart"), $text.tween({
                y: -10,
                opacity: 0,
                math: !0
            }, 300, "easeOutQuart"), $over.tween({
                y: 0,
                opacity: 1,
                math: !0
            }, 500, "easeOutQuart"), $top.transformPoint("50%", "100%").tween({
                scaleY: 0,
                y: Config.UI_OFFSET - 40
            }, 400, "easeOutQuart"))
        }, this.deactivate = function () {
            _this.activated && (_this.activated = !1, $line.tween({
                scaleX: 0
            }, 500, "easeOutQuart"), hover({
                action: "out"
            }))
        }, this.animateIn = function (active) {
            $this.visible(), $text.letters ? $text.letters.forEach(letter => {
                letter.css({
                    opacity: 0
                }).tween({
                    opacity: 1
                }, 300, "easeOutSine", Math.random(0, 300) + 300)
            }) : $text.css({
                opacity: 0
            }).tween({
                opacity: .6
            }, 300, "easeOutSine", 300), $top.tween({
                scaleY: 1,
                y: 0,
                math: !0
            }, 200, "easeInCubic", function () {
                $top.transformPoint("50%", "100%").tween({
                    scaleY: 0,
                    y: 0,
                    math: !0
                }, 400, "easeOutQuart", function () {
                    $top.transformPoint("50%", "0%")
                })
            }), active && (_this.activated = !0, $line.tween({
                scaleX: 1
            }, 500, "easeInOutQuart", 500), $text.tween({
                y: -8,
                opacity: 0
            }, 400, "easeOutQuart", 200), $over.tween({
                y: 0,
                opacity: 1
            }, 600, "easeOutQuart", 200))
        }, this.reset = function () {
            $this.invisible(), $line.transform({
                scale: 0
            }), $over.transform({
                y: 10
            }).css({
                opacity: 0
            }), $text.transform({
                y: 0
            }).css({
                opacity: .6
            }), $top.transformPoint("50%", "0%").transform({
                y: 0,
                scaleY: 0
            })
        }
    }), Class(function WorkList(Model) {
        function initBG() {
            _gradient = _this.initClass(WorkListGradient), _this.gradient = _gradient, _bg = _this.initClass(WorkListBackground), _this.scene.add(_bg.group)
        }

        function initSEO() {
            let $seo = $("worklist", "section"),
                string = "";
            for (let data of Model.getData()) string += `<li><a href="${SEO.BASE}/${Model.type}/${data.perma}">${data.title}</a>\n`;
            $seo.html(`\n        <h1>${Model.type.toUpperCase()}</h1>\n        <ul>\n        ${string}\n        </ul>\n        `), _this.$seo = $seo
        }

        function initGroup() {
            _uiStage = _this.initClass(GLUIStage, World.RENDERER), $this = $gl(1, 1), ($wrapper = $gl(1, 1)).add($this), _uiStage.add($wrapper), _uiStage.rt = _this.rt, _uiStage.nuke = _this.nuke, GLUI.stage = _uiStage
        }

        function initLayout() {
            let data = Model.getData();
            for (let i = 0; i < data.length; i++) {
                data[i].index = i;
                let item = _this.initClass(WorkListItem, data[i]);
                _this.events.sub(item, Events.HOVER, itemHover), _this.events.sub(item, Events.CLICK, itemClick), $this.add(item.element), _items.push(item)
            }
        }

        function initScroll() {
            _scroll = _this.parent.scroll, _this.scroll = {
                y: 0,
                delta: _scroll.delta
            }
        }

        function loop(t, dt) {
            _this.preventScroll || (_scrollY += -_scroll.delta.y * MULTIPLIER);
            let targetY = _scrollY,
                padding = Stage.height / 2 - _offset / 2;
            _scrollY > padding && (_scroll.stopInertia(), targetY = padding), _scrollY < -_maxHeight - padding && (_scroll.stopInertia(), targetY = -_maxHeight - padding), _scrollY += (targetY - _scrollY) * LERP0, _this.scroll.y = _scrollY;
            let delta = _scrollY - $this.y;
            _scroll.delta.l = -delta, $this.y += delta * LERP1, Global.SCROLL_LIST_Y = $this.y, Math.abs(delta) > 10 && _timer && (clearTimeout(_timer), _timer = null), 0 == _scroll.delta.y || _forceDelta || (_scrollDelta = Math.sign(_scroll.delta.y)), _forceDelta = !1;
            for (let i = 0; i < _items.length; i++) _items[i].update($this.y, delta, dt);
            _preventRender || _this.render()
        }

        function find(perma) {
            for (let item of _items)
                if (item.data.perma == perma) return item
        }

        function centerActive(perma, useTween) {
            let item = find(perma),
                targetY = item.element.y + item.height.y / 2 + $this.y,
                dist = Stage.height / 2 - targetY;
            if (_scrollDelta = -Math.sign(dist), useTween) {
                let target = _scrollY + dist,
                    d = {
                        v: 0
                    };
                tween(d, {
                    v: 1
                }, 200, "easeOutCubic").onUpdate(_ => {
                    _scrollY += (target - _scrollY) * d.v, $this.y += (target - _scrollY) * d.v
                })
            } else _scrollY += dist, $this.y = _scrollY;
            _forceDelta = !0
        }

        function triggerCurrent() {
            _hoveredItem && itemClick({
                item: _hoveredItem
            })
        }

        function centerDisabled() {
            $this.y = _scrollY = Stage.height / 2 - _offset * (_items.length - 1) / 2
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            let width = Math.min(1200, .8 * Stage.width);
            Device.mobile.phone && Stage.height > Stage.width && (width = .9 * Stage.width);
            let height = width * (256 / 1200),
                padding = Device.mobile && Stage.height > Stage.width ? 1 : .85;
            _offset = height * padding, Global.ITEM_HEIGHT = _offset, Global.ITEM_WIDTH = width, _items.forEach((item, i) => {
                item.setSize(width, height), item.element.y = i * _offset
            }), _maxHeight = _offset * _items.length - Stage.height, _offset * _items.length < .7 * Stage.height ? (_scroll.enabled = !1, centerDisabled()) : _scroll.enabled = !0, $this.x = Stage.width / 2 - width / 2, $this.dimensions.set(width, height)
        }

        function itemHover(e) {
            _this.flag("prevent_hover") || 0 == _this.visible || _this.events.fire(ATEvents.LIST_ITEM_HOVER, e)
        }

        function listItemHover(e) {
            if ("over" == e.action) {
                _hoveredItem = _items[e.index], _timer && (clearTimeout(_timer), _timer = null), _items.forEach((item, i) => {
                    i == e.index ? (item.hoverIn(), e.ui && (_scrollY = -(item.element.y + item.height.y / 2) + Stage.height / 2)) : item.hoverOut()
                });
                let data = Model.findByIndex(e.index);
                data.videoTexture && (_bg.logos.texture = data.videoTexture.brandTexture), WorkList.lightBrightness.value = Math.range(Number(data.brightness) || 0, 0, .5, .6, 1, !0)
            } else _hoveredItem = null
        }

        function listItemClick(e) {
            clearTimeout(_timer);
            let item = _items[e.index];
            _scrollY = -(item.element.y + item.height.y / 2) + Stage.height / 2, _this.events.fire(Events.CLICK, {
                data: item.data,
                item: item,
                index: e.index
            })
        }

        function itemClick(e) {
            _this.events.fire(ATEvents.LIST_ITEM_CLICK, e)
        }
        Inherit(this, FXScene);
        const _this = this;
        var $this, $wrapper, _scroll, _offset, _bg, _hoveredItem, _forceDelta, _gradient, _uiStage, _maxHeight, _timer, _preventRender, _scrollY = Stage.height / 2,
            _scrollDelta = 0,
            _items = [];
        const MULTIPLIER = Device.mobile ? 1 : .5,
            LERP0 = .3,
            LERP1 = Device.mobile ? .25 : .15;
        this.items = [], async function () {
            _this.create(World.NUKE), VideoTextures.instance(), initScroll(), initBG(), initSEO(), initGroup(), initLayout(), addListeners(), resizeHandler(), _this.startRender(loop)
        }(), this.select = async function (data) {
            _this.flag("prevent_hover", !0), await _this.wait(250), _this.flag("prevent_hover", !1), Config.WORK_AUTO_SELECT && (_timer = _this.delayedCall(triggerCurrent, 1e3))
        }, this.trigger = function (perma) {
            let success = !1;
            return _items.forEach(item => {
                item.data.perma == perma && (item.click(), success = !0)
            }), success
        }, this.openFromList = function () {}, this.click = function () {}, this.show = function () {
            _offset * _items.length < Stage.height && centerDisabled(), _this.events.sub(ATEvents.LIST_ITEM_HOVER, listItemHover), _this.events.sub(ATEvents.LIST_ITEM_CLICK, listItemClick), _bg.group.visible = !0, _bg.show(), _scroll.enabled && ($this.y = _scrollY = .2 * Stage.height)
        }, this.hide = function () {
            _bg.hide(), _this.events.unsub(ATEvents.LIST_ITEM_HOVER, listItemHover), _this.events.unsub(ATEvents.LIST_ITEM_CLICK, listItemClick), _bg.group.visible = !1
        }, this.animateIn = function () {
            WorkCamera.instance().animateIn(), Device.mobile || _items.forEach((item, i) => {
                item.animateIn(120 * i)
            }), _items[0].hover({
                action: "over"
            })
        }, this.animateOut = function () {
            WorkCamera.instance().animateOut(), Device.mobile || _items.forEach((item, i) => {
                item.animateOut(50 * i)
            })
        }, this.enterClick = function () {
            _hoveredItem && _hoveredItem.click()
        }, this.keyDown = function () {
            let item = _items[_hoveredItem.data.index + 1];
            item && (item.hover({
                action: "over"
            }), centerActive(item.data.perma, !0))
        }, this.keyUp = function () {
            let item = _items[_hoveredItem.data.index - 1];
            item && (item.hover({
                action: "over"
            }), centerActive(item.data.perma, !0))
        }, this.set("preventRender", bool => {
            _preventRender = bool, _uiStage.preventRender = bool, bool || (FX.HologramLights.instance().list = _uiStage)
        })
    }, _ => {
        WorkList.lightBrightness = {
            value: 1
        }
    }), Class(function WorkListGradient() {
        function initMesh() {
            _shader = _this.initClass(Shader, "WorkListGradient", {
                uColor: VideoColor.instance().color,
                uTime: World.TIME,
                uSpeed: {
                    value: 1
                },
                uOffsetY: {
                    value: 0
                },
                uDPR: {
                    value: Math.pow(Device.pixelRatio / World.DPR, 3)
                }
            }), ShaderUIL.add(_shader);
            let geom = new THREE.PlaneBufferGeometry(2, 2),
                mesh = new THREE.Mesh(geom, _shader.material);
            _this.scene.add(mesh)
        }

        function loop() {
            _this.render()
        }

        function addListeners() {
            _this.events.sub(ATEvents.INTERNAL_STATE, internalState)
        }

        function internalState(e) {
            e.state.includes("list") ? _this.startRender(loop) : _this.stopRender(loop)
        }
        Inherit(this, FXScene);
        const _this = this;
        var _shader;
        this.resolution = Tests.getWorkGradientRes(), _this.create(World.NUKE), _this.setDPR(1), initMesh(), Tests.alwaysRenderWorkBG() ? addListeners() : (_this.events.sub(Events.RESIZE, loop), loop()), this.set("y", y => {
            _shader.set("uOffsetY", y)
        }), this.get("y", _ => _shader.uniforms.uOffsetY.value)
    }), Class(function WorkListItem(_data) {
        function initElement() {
            $this = $gl(1200, 256), _this.element = $this, _this.height = $this.dimensions, $texture = $gl(1200, 256, "assets/images/common/dot.png"), $wrapper = $gl(1200, 256), $this.add($wrapper), $wrapper.add($texture);
            let canvas = LabelUtil.findByPerma(_data.perma);
            _data.canvasTitle = canvas, _shader = _this.initClass(Shader, "WorkListItem", {
                tFill: {
                    value: canvas.fill
                },
                tOutline: {
                    value: canvas.outline
                },
                tGrad: {
                    value: _this.parent.gradient.rt.texture
                },
                tRGB: {
                    value: Utils3D.getRepeatTexture("assets/images/alley/rgb_texture.jpg")
                },
                uActive: {
                    value: Device.mobile.phone ? .5 : 0
                },
                uHoverWobble: {
                    value: Device.mobile.phone ? 0 : 1
                },
                uInvert: FX.HologramLights.instance().invert,
                uResolution: World.RESOLUTION,
                uTime: World.TIME,
                transparent: !0,
                depthWrite: !1
            }), $texture.interact(hover, click), $texture.useShader(_shader)
        }

        function getOffset(parentY, y) {
            let screenY = parentY + y,
                screenOffset = screenY - Stage.height / 2;
            return {
                screenY: screenY,
                screenOffset: screenOffset,
                animationOffset: -Math.range(Math.abs(screenOffset), 0, Stage.height / 2.5, 0, 1, !0)
            }
        }

        function hover(e) {
            UI.instance().contact.visible || _this.events.fire(Events.HOVER, {
                index: _data.index,
                action: e.action,
                item: _this
            })
        }

        function click(e) {
            _this.delayedCall(_ => _this.flag("clicked", !1), 500), _this.events.fire(Events.CLICK, {
                item: _this,
                index: _data.index
            })
        }
        Inherit(this, Component);
        const _this = this;
        var $this, $texture, $wrapper, _shader, _width, _height;
        this.data = _data, initElement(), this.hover = hover, this.click = click, this.hoverIn = function () {
            VideoColor.instance().change(_data.video_offset ? Number(_data.video_offset - 1) : 23), $texture.tween({
                scale: 1.015
            }, 300, "easeOutCubic"), _shader.tween("uActive", 1, 300, "easeOutCubic")
        }, this.hoverOut = function () {
            $texture.tween({
                scale: 1
            }, 600, "easeOutCubic"), _shader.tween("uActive", Device.mobile.phone ? .4 : 0, 600, "easeOutCubic")
        }, this.update = function (parentY, delta, dt) {
            let {
                screenY: screenY,
                screenOffset: screenOffset,
                animationOffset: animationOffset
            } = getOffset(parentY, _this.element.y);
            _this.animationOffset = animationOffset, _this.screenY = screenY, _this.screenCenter = screenY + _this.height.y;
            let padding = .2 * Stage.height,
                ty = Math.clamp(.9 * delta * animationOffset, -padding, padding),
                tr = Math.radians(.7 * delta) * animationOffset * .3;
            $texture.y += .05 * (ty - $texture.y) * (dt / 16), $texture.rotation += .05 * (tr - $texture.rotation) * (dt / 16), _this.screenY + 1.5 * _this.height.y < 0 ? $this.hide() : _this.screenY - 1.5 * _this.height.y > Stage.height ? $this.hide() : $this.show()
        }, this.reset = function (y) {
            $this.y = y, $this.hide()
        }, this.setSize = function (width, height) {
            $this.dimensions.set(width, height, 1), $texture.dimensions.set(width, height, 1), _width = width, _height = height
        }, this.deselect = function () {}, this.animateIn = function (delay) {
            $wrapper.y = .3 * Stage.height, $wrapper.scaleY = .75, $wrapper.tween({
                y: 0,
                scaleY: 1
            }, 800, "easeOutCubic", Math.min(500, delay) + 150)
        }, this.animateOut = function (delay) {
            $wrapper.tween({
                y: .3 * -Stage.height
            }, 700, "easeInCubic", Math.min(300, delay))
        }, this.getClone = function () {
            let $clone = $gl(1200, 256, "assets/images/common/dot.png");
            $clone.dimensions.set(_width, _height);
            let coords = $texture.getScreenCoords();
            $clone.x = coords.x, $clone.y = coords.y;
            let shader = _shader.clone();
            return _shader.copyUniformsTo(shader), _shader.tween("uActive", 1, 300, "easeOutCubic"), _shader.material.visible = !1, _this.delayedCall(_ => _shader.material.visible = !0, 200), $clone.useShader(shader), $clone.release = (_ => {
                shader.destroy()
            }), $clone
        }
    }), Class(function WorkListTitle(_text) {
        function initCanvas(type) {
            let canvas = _this.initClass(Canvas, 1200 * SCALE, 256 * SCALE),
                texture = new THREE.Texture(canvas.div);
            return texture.minFilter = texture.magFilter = THREE.LinearFilter, texture.needsUpdate = !0, texture.generateMipmaps = !1, _this[type] = texture, canvas
        }

        function writeFill() {
            let canvas = initCanvas("fill");
            canvas.context.fillStyle = "#ffffff", canvas.context.font = Math.round(214 * SCALE) + "px Muncie", canvas.context.textBaseline = "middle", canvas.context.textAlign = "center", canvas.context.fillText(_text.toUpperCase(), canvas.width / 2, canvas.height / 2)
        }

        function writeOutline() {
            let canvas = initCanvas("outline");
            canvas.context.strokeStyle = "#ffffff", canvas.context.font = Math.round(214 * SCALE) + "px Muncie", canvas.context.textBaseline = "middle", canvas.context.textAlign = "center", canvas.context.lineWidth = 1.6 * SCALE, canvas.context.shadowColor = "#fff", canvas.context.strokeText(_text.toUpperCase(), canvas.width / 2, canvas.height / 2)
        }
        Inherit(this, Component);
        const _this = this,
            SCALE = Math.clamp(Math.range(Stage.width, 900, 1440, .75, 1), .3, 1);
        writeFill(), Tests.fillWIL() || writeOutline()
    }), Class(function WorkListBackground() {
        function initViews() {
            _color = _this.initClass(WorkListBackgroundColor, _this.parent.gradient, _this.parent.scroll), _logos = _this.initClass(WorkListBackgroundLogos, _this.parent.gradient, _this.parent.scroll), Tests.showListHolograms() && (_holo = _this.initClass(WorkListBackgroundHolograms, _this.parent.gradient, _this.parent.scroll)), _this.logos = _logos
        }
        Inherit(this, Object3D);
        const _this = this;
        var _color, _logos, _holo;
        initViews(), this.hide = function () {
            _color.group.visible = !1, _logos.group.visible = !1, _holo && (_holo.cycler.visible = !1, _holo.group.visible = !1)
        }, this.show = function () {
            _color.group.visible = !0, _logos.group.visible = !0, _holo && (_holo.group.visible = !0, _holo.cycler.visible = !0)
        }
    }), Class(function WorkListBackgroundColor(_gradient, _scroll) {
        function initMesh() {
            let shader = _this.initClass(Shader, "WorkListBackgroundColor", {
                tMap: {
                    value: _gradient.rt.texture
                },
                tVideo: {
                    value: VideoColor.instance().texture
                },
                uDarkMin: {
                    value: 0
                },
                uDarkMax: {
                    value: .3
                },
                uDarkSpeed: {
                    value: 1
                },
                uWarpSpeed: {
                    value: 1
                },
                uWarpRange: {
                    value: .2
                },
                uTime: World.TIME,
                depthWrite: !1
            });
            ShaderUIL.add(shader);
            let mesh = new THREE.Mesh(World.QUAD, shader.material);
            mesh.frustumCulled = !1, _this.add(mesh)
        }

        function loop() {
            _gradient.y = 5e-4 * -_scroll.y
        }
        Inherit(this, Object3D);
        const _this = this;
        initMesh(), _this.startRender(loop)
    }), Class(function WorkListBackgroundCycler(_scroll, _offset, _depth, _bound) {
        function loop(t, dt) {
            _scrollY = .25 * -_scroll.y * _offset, _this.group.position.y += .1 * (_scrollY - _this.group.position.y), 0 != _scroll.delta.l && (_scrollDelta = Math.sign(_scroll.delta.l));
            for (let i = 0; i < _groups.length; i++) {
                let group = _groups[i],
                    screenY = _this.group.position.y + group.position.y;
                _scrollDelta > 0 ? screenY > _bound && (group.position.y += 3 * -_bound) : screenY < -_bound && (group.position.y += 3 * _bound)
            }
        }
        Inherit(this, Object3D);
        const _this = this;
        var _groups = [],
            _scrollY = 0,
            _scrollDelta = 0;
        _this.group.position.z = _depth, _this.startRender(loop), this.addObject = function (obj, y) {
            _this.add(obj), obj.position.y = y, _groups.push(obj)
        }
    }), Class(function WorkListBackgroundHolograms(_gradient, _scroll) {
        function initShader() {
            _shader = _this.initClass(Shader, "WorkListBackgroundHolograms", {
                tMap: {
                    value: VideoColor.instance().texture
                },
                tMask: {
                    value: Utils3D.getTexture("assets/images/work/hologram.jpg")
                },
                uResolution: World.RESOLUTION,
                uTime: World.TIME,
                uLineMod: {
                    value: .3
                },
                uLineStep: {
                    value: .5
                },
                uLineAlpha: {
                    value: .5
                },
                uLineSpeed: {
                    value: 1
                },
                uVertScale: {
                    value: 1
                },
                uVertSpeed: {
                    value: 1
                },
                uVertRange: {
                    value: .01
                },
                uWarpSpeed: {
                    value: 1
                },
                uWarpRange: {
                    value: .2
                },
                uFalloff: {
                    value: 1.3
                },
                uAlpha: {
                    value: 1
                },
                uTransparent: {
                    value: Device.mobile.phone ? .5 : 1
                },
                transparent: !0,
                blending: THREE.AdditiveBlending,
                depthWrite: !1
            }), ShaderUIL.add(_shader)
        }

        function initGroups() {
            for (let i = 0; i < 3; i++) _cycler.addObject(createMesh(), Math.range(i, 0, 2, -5, 5))
        }

        function createMesh() {
            let geom = new THREE.InstancedBufferGeometry;
            for (var key in _shape.attributes) geom.addAttribute(key, _shape.attributes[key]);
            let position = new Float32Array(3 * COUNT),
                scale = new Float32Array(4 * COUNT);
            for (let i = 0; i < COUNT; i++) {
                let mult = 0 == i ? 1 : -1;
                Device.mobile.phone && Stage.height > Stage.width && (mult *= .5), position[3 * i + 0] = 1.6 * mult + .3 * Math.random(-1, 1, 4), position[3 * i + 1] = 1.6 * mult + .5 * Math.random(-1, 1, 4), position[3 * i + 2] = .4 * Math.random(-1, 1, 4), scale[4 * i + 0] = Math.random(1, 3, 4), scale[4 * i + 1] = Math.random(1, 3, 4), scale[4 * i + 2] = scale[4 * i + 0] / scale[4 * i + 1], scale[4 * i + 3] = Math.random(0, 1, 4)
            }
            geom.addAttribute("offset", new THREE.InstancedBufferAttribute(position, 3, 1)), geom.addAttribute("scale", new THREE.InstancedBufferAttribute(scale, 4, 1));
            let mesh = new THREE.Mesh(geom, _shader.material);
            return mesh.frustumCulled = !1, FX.HologramLights.instance().add(mesh), mesh
        }
        Inherit(this, Object3D);
        const _this = this;
        var _shader, _cycler = _this.initClass(WorkListBackgroundCycler, _scroll, .01, -3, 5),
            _shape = (new THREE.BufferGeometry).fromGeometry(new THREE.PlaneGeometry(1, 1, 10, 10));
        this.cycler = _cycler;
        const COUNT = 2;
        initShader(), initGroups()
    }), Class(function WorkListBackgroundLogos(_gradient, _scroll) {
        function initShader() {
            _shader = _this.initClass(Shader, "WorkListBackgroundLogos", {
                tMap: {
                    value: null
                },
                tGrad: {
                    value: _gradient.rt.texture
                },
                uResolution: World.RESOLUTION,
                uTime: World.TIME,
                uDarken: {
                    value: 1
                },
                uWarpSpeed: {
                    value: 1
                },
                uWarpRange: {
                    value: .2
                },
                uTransition: {
                    value: 0
                },
                transparent: !0,
                blending: THREE.AdditiveBlending,
                depthWrite: !1
            }), ShaderUIL.add(_shader)
        }

        function initGroups() {
            for (let i = 0; i < 3; i++) _cycler.addObject(createMesh(), Math.range(i, 0, 2, -10, 10))
        }

        function createMesh() {
            let geom = new THREE.InstancedBufferGeometry;
            for (var key in _shape.attributes) geom.addAttribute(key, _shape.attributes[key]);
            let position = new Float32Array(3 * COUNT);
            for (let i = 0; i < COUNT; i++) position[3 * i + 0] = 3 * (0 == i ? 1 : -1) + .3 * Math.random(-1, 1, 4), position[3 * i + 1] = 3 * (0 == i ? 1 : -1) + .5 * Math.random(-1, 1, 4), position[3 * i + 2] = 1.4 * Math.random(-1, 1, 4);
            geom.addAttribute("offset", new THREE.InstancedBufferAttribute(position, 3, 1));
            let mesh = new THREE.Mesh(geom, _shader.material);
            return mesh.frustumCulled = !1, FX.HologramLights.instance().add(mesh), mesh
        }
        Inherit(this, Object3D);
        const _this = this;
        var _shader, _cycler = _this.initClass(WorkListBackgroundCycler, _scroll, .01, -6, 10),
            _shape = (new THREE.BufferGeometry).fromGeometry(new THREE.PlaneGeometry(1, .42));
        const COUNT = 2;
        initShader(), initGroups(), this.set("texture", texture => {
            _shader.uniforms.tMap.value != texture && (_shader.set("uTransition", 1), _shader.tween("uTransition", 0, 300, "easeOutCubic"), _shader.set("tMap", texture))
        })
    }), Class(function WorkProjectTitle() {
        function initMesh() {
            $this = $gl(1200, 600, "assets/images/uv.jpg"), GLUI.stage.add($this), _shader = _this.initClass(Shader, "WorkProjectTitle", {
                tMap: {
                    value: null
                },
                tNormal: {
                    value: FX.Distortion.instance().rt.texture
                },
                tInteraction: {
                    value: InteractionMask.instance().texture
                },
                uTrans: {
                    value: 0
                },
                uTime: World.TIME,
                uResolution: World.RESOLUTION,
                transparent: !0
            }), ShaderUIL.add(_shader), $this.useShader(_shader)
        }
        async function initSelected() {
            let data = Data.Work.getCurrent();
            await _this.wait(data, "canvasTitle"), _shader.set("tMap", data.canvasTitle.texture)
        }
        Inherit(this, Component);
        const _this = this;
        var $this, _shader;
        initMesh(), initSelected()
    }, "singleton"), Class(function WorkUIList(_list, _data) {
        function initHTML() {
            ($this = _this.element).css({
                right: 0
            }).setZ(2).invisible(), UI.instance().add($this)
        }

        function initItems() {
            _items = [];
            let y = 0;
            _data.forEach((data, i) => {
                data.size = _size, data.index = i, data.width = _width;
                let item = _this.initClass(WorkUIListItem, data);
                item.element.transform({
                    y: y
                }), item.index = i, i < _data.length - 1 && (y += _size), _items.push(item)
            }), _this.height = y, $this.size(_width, _this.height).center(0, 1)
        }

        function initScroller() {
            _scroller = _this.initClass(WorkUIScroller, _this.height, _data.length)
        }

        function addListeners() {
            _items.forEach(item => {
                _this.events.sub(item, Events.HOVER, hover)
            })
        }

        function hover(e) {
            e.ui = !0, _this.events.fire(ATEvents.LIST_ITEM_HOVER, e)
        }

        function listHover(e) {
            switch (clearTimeout(_this.timeout), e.action) {
                case "over":
                    Global.HOVERED_UI = !0, _items.forEach((item, index) => {
                        index == e.index ? item.hoverIn() : item.hoverOut()
                    });
                    break;
                case "out":
                    _this.timeout = _this.delayedCall(_ => {
                        Global.HOVERED_UI = !1, _items.forEach(item => {
                            item.hoverOut()
                        })
                    }, 200)
            }
        }

        function listClick(e) {
            UI.instance().move(), clearTimeout(_this.timeout), (_active = _items[e.index]).element.tween({
                y: .5 * _this.height - .5 * _size
            }, 800, "easeInOutQuart"), _items.forEach((item, index) => {
                index == e.index ? item.activate() : item.animateOut()
            }), _scroller.animateOut()
        }

        function returnToList() {
            UI.instance().move(), Global.HOVERED_UI = !1, _scroller.animateIn(100), _active.deactivate(), _active.element.tween({
                y: _active.index * _size
            }, 400, "easeOutCubic"), _items.forEach((item, index) => {
                let delay = 30 * Math.abs(_active.index - index);
                item.animateIn(delay + 50)
            })
        }
        Inherit(this, Element);
        const _this = this;
        var $this, _items, _scroller, _active, _size = 12,
            _width = Config.UI_OFFSET + 5;
        initHTML(), initItems(), initScroller(), addListeners(), this.animateIn = function () {
            $this.visible().css({
                opacity: 0
            }).tween({
                opacity: 1
            }, 300, "easeOutSine"), _scroller.animateIn(500), _items.forEach((item, index) => {
                item.animateIn(30 * index + 400)
            }), _this.events.sub(ATEvents.LIST_ITEM_HOVER, listHover), _this.events.sub(ATEvents.LIST_ITEM_CLICK, listClick), _this.events.sub(ATEvents.LIST_ITEM_EXIT, returnToList)
        }, this.animateOut = function () {
            _active && (_active.deactivate(), _active.element.tween({
                y: _active.index * _size
            }, 400, "easeOutCubic")), $this.tween({
                opacity: 0
            }, 300, "easeOutSine", function () {
                $this.invisible()
            }), _scroller.animateOut(), _items.forEach((item, index) => {
                item.animateOut(20 * index)
            }), _this.events.unsub(ATEvents.LIST_ITEM_HOVER, listHover), _this.events.unsub(ATEvents.LIST_ITEM_CLICK, listClick), _this.events.unsub(ATEvents.LIST_ITEM_EXIT, returnToList)
        }
    }), Class(function WorkUIListClose(_size) {
        function initHTML() {
            ($this = _this.element).size(_size, _size).center().bg("#fff").invisible().mouseEnabled(!0)
        }

        function initLines() {
            ($top = $this.create(".top")).size(.4 * _size, .05 * _size).center().transform({
                rotation: 45
            }), $top.inner = $top.create(".inner"), $top.inner.size("100%").bg("#000"), ($bottom = $this.create(".top")).size(.4 * _size, .05 * _size).center().transform({
                rotation: -45
            }), $bottom.inner = $bottom.create(".inner"), $bottom.inner.size("100%").bg("#000")
        }

        function addHandlers() {
            $this.interact(hover, click), $this.hit && $this.hit.hide()
        }

        function hover(e) {
            if (_this.visible) switch (e.action) {
                case "over":
                    Global.HOVERED_UI = !0, $top.tween({
                        rotation: 0
                    }, 200, "easeOutCubic"), $bottom.tween({
                        rotation: 0
                    }, 200, "easeOutCubic");
                    break;
                case "out":
                    Global.HOVERED_UI = !1, $top.tween({
                        rotation: 45
                    }, 500, "easeOutCubic"), $bottom.tween({
                        rotation: -45
                    }, 500, "easeOutCubic")
            }
        }

        function click() {
            _this.visible && _this.events.fire(ATEvents.LIST_ITEM_EXIT)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $top, $bottom;
        initHTML(), initLines(), addHandlers(), this.animateIn = function () {
            _this.visible || (_this.visible = !0, $top.inner.transformPoint("0%", "50%").transform({
                scaleX: 0
            }).tween({
                scaleX: 1
            }, 1200, "easeInOutQuart"), $bottom.inner.transformPoint("0%", "50%").transform({
                scaleX: 0
            }).tween({
                scaleX: 1
            }, 1200, "easeInOutQuart", 100, function () {
                $this.hit && $this.hit.show()
            }), $this.visible().transform({
                scaleY: 0
            }).tween({
                scaleY: 1
            }, 1e3, "easeInOutQuart"))
        }, this.animateOut = function (callback) {
            _this.visible && (_this.visible = !0, $this.hit && $this.hit.hide(), $top.inner.tween({
                scaleX: 0
            }, 200, "easeOutCubic"), $bottom.inner.tween({
                scaleX: 0
            }, 200, "easeOutCubic"), $this.tween({
                scaleY: 0
            }, 200, "easeOutCubic", callback))
        }
    }), Class(function WorkUIListItem(_data) {
        function initHTML() {
            ($this = _this.element).size(_data.width, _data.size).setZ(2).invisible(), ($wrapper = $this.create(".wrapper")).size("100%"), ($wrapper2 = $this.create(".wrapper2")).size("100%").css({
                opacity: 0
            })
        }

        function initBG() {
            ($bg = $wrapper.create(".bg")).size(_data.width, _data.size - 2).css({
                top: 1
            }).bg("#fff").transformPoint("0%", "50%").transform({
                scaleX: .01
            })
        }

        function addHandlers() {
            $this.interact(hover, click)
        }

        function hover(e) {
            e.index = _data.index, _this.events.fire(Events.HOVER, e)
        }

        function click() {
            _this.events.fire(ATEvents.LIST_ITEM_CLICK, {
                index: _data.index
            })
        }
        Inherit(this, Element);
        var $this, $wrapper, $wrapper2, $bg, _close, _this = this;
        initHTML(), initBG(), addHandlers(), this.activate = function () {
            _this.activated || (_this.activated = !0, $this.hit.hide(), $this.visible().clearAlpha(), _close = _this.initClass(WorkUIListClose, _data.width), defer(_close.animateIn), clearTimeout(_this.timeout2), $bg.tween({
                scaleX: 1
            }, 200, "easeOutCubic"))
        }, this.deactivate = function () {
            _this.activated && (_this.activated = !1, clearTimeout(_this.timeout), _close.animateOut(_ => {
                _close = _close.destroy(), $this.hit.show()
            }), $wrapper.tween({
                x: 0
            }, 500, "easeOutSine"), $bg.tween({
                scaleX: .015
            }, 500, "easeOutCubic"))
        }, this.hoverIn = function () {
            _this.hovered || _this.activated || (_this.hovered = !0, clearTimeout(_this.timeout), $wrapper.tween({
                x: 0
            }, 200, "easeOutSine"), $bg.tween({
                scaleX: 1
            }, 200, "easeOutCubic"))
        }, this.hoverOut = function () {
            _this.hovered && !_this.activated && (_this.hovered = !1, clearTimeout(_this.timeout), _this.timeout = _this.delayedCall(_ => {
                $wrapper.tween({
                    x: 0
                }, 500, "easeOutSine"), $bg.tween({
                    scaleX: .015
                }, 500, "easeOutCubic")
            }, 200))
        }, this.animateIn = function (delay) {
            _this.visible || (_this.visible = !0, clearTimeout(_this.timeout2), _this.timeout2 = _this.delayedCall(_ => {
                Tests.simpleUI() ? ($bg.transform({
                    scaleX: .015
                }), $wrapper.transform({
                    x: 0
                })) : ($bg.transform({
                    scaleX: .5
                }).tween({
                    scaleX: .015
                }, 500, "easeInOutCubic"), $wrapper.transform({
                    x: Math.random(-40, 40)
                }).tween({
                    x: 0
                }, 500, "easeInOutCubic")), $this.visible(), $wrapper2.tween({
                    opacity: 1
                }, 500, "easeOutCubic", function () {
                    $this.hit.show()
                })
            }, delay))
        }, this.animateOut = function (delay) {
            _this.visible && (_this.visible = !1, clearTimeout(_this.timeout2), $this.hit.hide(), $wrapper2.tween({
                opacity: 0
            }, 300, "easeOutSine", function () {
                $this.invisible()
            }))
        }
    }), Class(function WorkUIScroller(_height, _items) {
        function initHTML() {
            ($this = _this.element).size(11, 100).css({
                left: -Math.floor(_this.width / 2) - 2,
                top: -1
            }).setZ(3).invisible()
        }

        function initBorder() {
            ($border = $this.create(".border")).size(11, 98).css({
                borderLeft: "2px solid #fff"
            })
        }

        function initBG() {
            ($bg = $this.create(".bg")).size("100%").bg("#fff").css({
                opacity: 0
            })
        }

        function loop() {
            $this.y = -Global.SCROLL_LIST_Y * (_this.height / Stage.height), $this.transform()
        }

        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize)
        }

        function resize() {
            _this.height = _height * (Stage.height / Global.ITEM_HEIGHT / (_items - 1)), $this.size(_this.width, _this.height), $border.size(_this.width - 2, _this.height - 2)
        }
        Inherit(this, Element);
        var $this, $bg, $border, _this = this;
        _this.width = 13, _this.height = 100, initHTML(), initBG(), initBorder(), addHandlers(), resize(), _this.startRender(loop), this.animateIn = function (delay) {
            clearTimeout(_this.timeout), $border.transform({
                scaleY: 0
            }), _this.timeout = _this.delayedCall(_ => {
                $border.transform({
                    scaleY: 0
                }).tween({
                    scaleY: 1
                }, 500, "easeInOutCubic", delay)
            }, delay), $this.visible()
        }, this.animateOut = function () {
            clearTimeout(_this.timeout), $border.tween({
                scaleY: 0
            }, 600, "easeOutCubic")
        }
    }), Class(function WorkUIProject(_data, $label) {
        function initSEO() {
            let $seo = $("work", "section");
            $seo.html(`\n        <h1>${_data.title}</h1>\n        <p>${_data.details}</p>\n        <p>${_data.tech}</p>\n        `), _this.$seo = $seo
        }

        function initHTML() {
            ($this = _this.element).css({
                position: "static"
            }), Device.mobile && $this.mouseEnabled(!1), UI.instance().add($this)
        }

        function initInfo() {
            _info = _this.initClass(WorkUIProjectInfo, _data)
        }

        function initClose() {
            (_close = _this.initClass(WorkUIListClose, 34)).element.css({
                top: Config.UI_OFFSET,
                right: Config.UI_OFFSET,
                marginTop: "",
                marginLeft: "",
                left: ""
            })
        }
        Inherit(this, Element);
        const _this = this;
        var $this, _info, _close;
        this.data = _data, initHTML(), initSEO(), initInfo(), Device.mobile && initClose(), this.animateIn = function () {
            Global.IN_PROJECT_DETAIL = !0, _info && _info.animateIn(), _close && _close.animateIn()
        }, this.animateOut = function (dir) {
            return Global.IN_PROJECT_DETAIL = !1, $this.tween({
                opacity: 0
            }, 300, "easeOutSine"), _close && _close.animateOut(), Promise.resolve()
        }
    }, _ => {
        var _stage;
        WorkUIProject.getStage = function () {
            return _stage || (_stage = new GLUIStage), _stage
        }
    }), Class(function WorkUIProjectInfo(_data) {
        function initHTML() {
            ($this = _this.element).size(1200, 500).invisible(), ($top = $this.create(".content")).size(700, 100).center().css({
                marginTop: -115
            }), ($bottom = $this.create(".content")).size(700, 300).center().css({
                marginTop: 115
            })
        }

        function initViews() {
            _data.brand ? _brand = _this.initClass(WorkInfoBrand, _data.brand, [$top]) : _client = _this.initClass(WorkInfoClient, _data.client, [$top]), _data.name && (_title = _this.initClass(WorkInfoTitle, _data.name)), _data.tech && (_tech = _this.initClass(WorkInfoTech, _data.tech, [$bottom])), _data.details && (_details = _this.initClass(WorkInfoDetails, _data.details, [$bottom])), _buttons = _this.initClass(WorkInfoButtons, _data, [$bottom])
        }

        function addHandlers() {
            _this.events.sub(Events.RESIZE, resize)
        }

        function resize() {
            let width = Math.min(1200, Device.mobile.phone && Stage.width > Stage.height ? .5 * Stage.width : .8 * Stage.width);
            Device.mobile.phone && Stage.width > Stage.height ? _details.element.hide() : _details.element.show(), _buttons.awards.css({
                display: Device.mobile.phone && Stage.width < Stage.height ? "block" : "inline-block"
            }), Device.mobile.phone && _buttons.awardsList[_buttons.awardsList.length - 1] && _buttons.awardsList[_buttons.awardsList.length - 1].css({
                marginRight: Stage.width > Stage.height ? 20 : 0
            }), _title.element.transform({
                scale: width / 1200
            });
            let offset = Device.mobile.phone && Stage.width < Stage.height ? -80 : 0;
            $this.css({
                top: (Stage.height - 500) / 2 + offset,
                left: (Stage.width - 1200) / 2
            });
            let cWidth = Device.mobile.phone ? .85 * Stage.width : 700;
            $top.size(cWidth, 100).center().css({
                marginTop: -width / 1200 * 95 - 20
            }), $bottom.size(cWidth, 100).center().css({
                marginTop: width / 1200 * 95 + 20
            })
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $top, $bottom, _client, _title, _brand, _details, _tech, _buttons;
        initHTML(), initViews(), addHandlers(), resize(), this.animateIn = function () {
            $this.visible(), _title && _title.animateIn(), _brand && _brand.element.transform({
                y: -20
            }).css({
                opacity: 0
            }).tween({
                y: 0,
                opacity: 1
            }, 1200, "easeOutQuart", 300), _client && _client.element.transform({
                y: -20
            }).css({
                opacity: 0
            }).tween({
                y: 0,
                opacity: 1
            }, 1200, "easeOutQuart", 300), _tech && _tech.element.transform({
                y: 20
            }).css({
                opacity: 0
            }).tween({
                y: 0,
                opacity: 1
            }, 1200, "easeOutQuart", 300), _details && _details.element.transform({
                y: 20
            }).css({
                opacity: 0
            }).tween({
                y: 0,
                opacity: 1
            }, 1200, "easeOutQuart", 500), _buttons && _this.delayedCall(_buttons.animateIn, 700)
        }
    }), Class(function WorkInfoBrand(_image) {
        function initHTML() {
            ($this = _this.element).size(_this.width, _this.height).center(1, 0).css({
                top: -_this.height
            })
        }

        function initText() {
            ($image = $this.create(".image")).size(_this.width, _this.height).bg(_image)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $image;
        _this.scale = Device.mobile.phone ? .3 : .4, _this.width = 350 * _this.scale, _this.height = 150 * _this.scale, initHTML(), initText(), this.animateIn = function () {}
    }), Class(function WorkInfoButtons(_data) {
        function initHTML() {
            ($this = _this.element).css({
                position: "relative",
                display: "block",
                marginTop: Device.mobile.phone ? 15 : 25,
                height: 60,
                textAlign: "center"
            }).invisible()
        }

        function initAwards() {
            ($awards = $this.create(".awards")).css({
                position: "relative",
                display: Device.mobile.phone ? "block" : "inline-block"
            }), _this.awards = $awards, _awards = [];
            let awards = _data.awards.toLowerCase();
            if (awards.includes("fwa")) {
                let $fwa = $awards.create(".fwa");
                $fwa.size(46, 46).css({
                    position: "relative",
                    display: "inline-block",
                    marginRight: 20
                }).bg("assets/images/work/awards/fwa.png"), _awards.push($fwa)
            }
            if (awards.includes("awwward")) {
                let $awwward = $awards.create(".fwa");
                $awwward.size(46, 46).css({
                    position: "relative",
                    display: "inline-block",
                    marginRight: 20
                }).bg("assets/images/work/awards/awwwards.png"), _awards.push($awwward)
            }
            if (awards.includes("cssdesign")) {
                let $cssdesign = $awards.create(".fwa");
                $cssdesign.size(32.2, 46).css({
                    position: "relative",
                    display: "inline-block",
                    marginRight: 20
                }).bg("assets/images/work/awards/cssdesign.png"), _awards.push($cssdesign)
            }
            Device.mobile.phone && _awards[_awards.length - 1] && _awards[_awards.length - 1].css({
                marginRight: 0
            }), _this.awardsList = _awards
        }

        function initLink() {
            (_link = _this.initClass(UIButton, {
                outline: 1,
                width: 80 * _buttonScale,
                height: 46 * _buttonScale,
                text: "LINK"
            })).element.css({
                position: "relative",
                display: "inline-block",
                marginRight: _data.caseLink ? 4 : 0
            })
        }

        function initCaseLink() {
            (_caseLink = _this.initClass(UIButton, {
                outline: 1,
                width: 140 * _buttonScale,
                height: 46 * _buttonScale,
                text: "CASESTUDY"
            })).element.css({
                position: "relative",
                display: "inline-block",
                marginLeft: _data.link ? 4 : 0
            })
        }

        function addHandlers() {
            _link && _this.events.sub(_link, Events.CLICK, linkClick), _caseLink && _this.events.sub(_caseLink, Events.CLICK, caseLinkClick)
        }

        function linkClick() {
            Tracking.event("links", "click", `${_data.perma}-link`, _data.link), open(_data.link)
        }

        function caseLinkClick() {
            Tracking.event("links", "click", `${_data.perma}-case-link`, _data.caseLink), open(_data.caseLink)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $awards, _link, _caseLink, _awards, _buttonScale = Device.mobile.phone ? .85 : 1;
        initHTML(), initAwards(), _data.link && initLink(), _data.caseLink && initCaseLink(), addHandlers(), this.animateIn = function () {
            $this.visible(), _link && _link.animateIn(), _caseLink && _caseLink.animateIn(), _awards.forEach(($award, index) => {
                $award.transform({
                    y: index % 2 == 0 ? 15 : -15
                }).css({
                    opacity: 0
                }).tween({
                    y: 0,
                    opacity: 1
                }, 1e3, "easeOutQuart")
            })
        }
    }), Class(function WorkInfoClient(_text) {
        function initHTML() {
            ($this = _this.element).size(500, _size).center(1, 0).css({
                top: 0
            }).css({
                top: -_size
            })
        }

        function initText() {
            ($text = $this.create(".text")).fontStyle("NexaBold", _size, "#fff"), $text.css({
                width: "100%",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: 4
            }), $text.text(_text)
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text, _size = Device.mobile.phone ? 11 : 14;
        initHTML(), initText(), this.animateIn = function () {}
    }), Class(function WorkInfoDetails(_text) {
        function initHTML() {
            ($this = _this.element).css({
                position: "relative",
                display: "block"
            })
        }

        function initText() {
            ($text = $this.create(".text")).fontStyle("NexaLight", Device.mobile.phone ? 11 : 13, "#fff"), $text.css({
                position: "relative",
                display: "block",
                width: "100%",
                textAlign: "center",
                letterSpacing: 1,
                lineHeight: Device.mobile.phone ? 17 : 22
            }), $text.text(_text)
        }

        function addHandlers() {
            $this.hover(hover), $this.css({
                cursor: ""
            })
        }

        function hover(e) {
            UI.instance().move(), Global.HOVERED_UI = "over" == e.action
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text;
        initHTML(), initText(), addHandlers(), this.animateIn = function () {}
    }), Class(function WorkInfoTech(_text) {
        function initHTML() {
            ($this = _this.element).css({
                position: "relative",
                display: "block",
                marginBottom: 5
            })
        }

        function initText() {
            ($text = $this.create(".text")).fontStyle("NexaBold", Device.mobile.phone ? 12 : 14, "#fff"), $text.css({
                position: "relative",
                display: "block",
                width: "100%",
                textAlign: "center",
                letterSpacing: 1,
                lineHeight: Device.mobile.phone ? 18 : 22
            }), $text.text(_text)
        }

        function addHandlers() {
            $this.hover(hover), $this.css({
                cursor: ""
            })
        }

        function hover(e) {
            UI.instance().move(), Global.HOVERED_UI = "over" == e.action
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text;
        initHTML(), initText(), addHandlers(), this.animateIn = function () {}
    }), Class(function WorkInfoTitle(_text) {
        function initHTML() {
            ($this = _this.element).size(1200, 200).center().invisible()
        }

        function initText() {
            ($text = $this.create(".text")).fontStyle("Muncie", 215, "#fff"), $text.css({
                width: "100%",
                lineHeight: 215,
                whiteSpace: "nowrap",
                textAlign: "center",
                letterSpacing: -.3
            }), $text.text(_text), Tests.simpleUI() || (_letters = SplitTextfield.split($text, "letter"))
        }

        function addHandlers() {
            $this.hover(hover), $this.css({
                cursor: ""
            })
        }

        function hover(e) {
            UI.instance().move(), Global.HOVERED_UI = "over" == e.action
        }
        Inherit(this, Element);
        const _this = this;
        var $this, $text, _letters;
        initHTML(), initText(), addHandlers(), this.animateIn = function () {
            $this.visible().css({
                opacity: 0
            }).tween({
                opacity: 1
            }, 600, "easeInOutSine"), _letters ? _letters.forEach((letter, i) => {
                letter.transform({
                    y: Math.random(-120, 120)
                }).tween({
                    y: 0
                }, 1800, "easeOutQuart")
            }) : $text.transform({
                y: 50
            }).tween({
                y: 0
            }, 1800, "easeOutQuart")
        }
    }), Class(function WorkVideo() {
        function initMesh() {
            let geom = new THREE.PlaneBufferGeometry(2, 2);
            _shader = _this.initClass(Shader, "WorkVideo", {
                tMap0: {
                    value: null
                },
                tMap1: {
                    value: null
                },
                tMap2: {
                    value: null
                },
                uScale0: {
                    value: new THREE.Vector2(1, 1)
                },
                uScale1: {
                    value: new THREE.Vector2(1, 1)
                },
                uTime: World.TIME,
                uTransition: {
                    value: 0
                },
                uDeform: {
                    value: 0
                },
                uDirection: {
                    value: 1
                },
                uDarken: {
                    value: 1
                }
            }), ShaderUIL.add(_shader), TweenManager.addCustomEase({
                name: "workTransition",
                curve: "cubic-bezier(.22,0,.43,.97)"
            });
            let mesh = new THREE.Mesh(geom, _shader.material);
            mesh.frustumCulled = !1, _this.add(mesh)
        }

        function addListeners() {
            _this.events.sub(Events.RESIZE, resizeHandler)
        }

        function resizeHandler() {
            let width = Stage.width,
                height = Stage.width / ASPECT;
            height < Stage.height && (width = (height = Stage.height) * ASPECT), _shader.uniforms.uScale0.value.set(width / Stage.width, height / Stage.height), _shader.uniforms.uScale1.value.set(width / Stage.width, height / Stage.height), _this.flag("list0") && _shader.uniforms.uScale0.value.set(1, 1), _this.flag("list1") && _shader.uniforms.uScale1.value.set(1, 1)
        }
        Inherit(this, Object3D);
        const _this = this;
        var _shader;
        const ASPECT = 1024 / 576;
        initMesh(), addListeners(), resizeHandler(), this.set("from", texture => {
            texture && (_this.flag("list0", !1), texture.value || _this.flag("list0", !0), texture.value ? _shader.uniforms.tMap0 = texture : _shader.uniforms.tMap0 = {
                value: texture
            }, resizeHandler())
        }), this.set("to", texture => {
            texture && (_this.flag("list1", !1), texture.value || _this.flag("list1", !0), texture.value ? _shader.uniforms.tMap1 = texture : _shader.uniforms.tMap1 = {
                value: texture
            }, resizeHandler())
        }), this.set("direction", d => {
            _shader.set("uDirection", d)
        }), this.get("direction", _ => _shader.uniforms.uDirection.value), this.reset = function () {
            _shader.set("uTransition", 0)
        }, this.transition = async function (out) {
            let promise = Promise.create();
            return _shader.tween("uTransition", 1, 850 * (out ? .75 : 1), "workTransition"), _shader.tween("uDeform", 1, 300 * (out ? .75 : 1), "easeOutCubic").onComplete(_ => {
                _shader.tween("uDeform", 0, 850 * (out ? .75 : 1), "easeOutCubic", promise.resolve)
            }), promise
        }, this.darken = function () {
            _shader.tween("uDarken", .7, 500, "easeOutSine")
        }, this.lighten = function () {
            _shader.tween("uDarken", 1, 500, "easeInOutSine")
        }, this.peel = function (val) {
            _shader.set("uTransition", .3 * val)
        }
    }), Class(function Main() {
        async function init() {
            if (Utils.query("p")) return FontLoader.loadFonts("Muncie"), AssetLoader.loadAllAssets(Playground.instance);
            Container.instance(), UI.instance()
        }

        function unsupported() {
            window.location = "./unsupported.html"
        }! function () {
            if (!Redirect.toNaked()) {
                if ("ie" == Device.system.browser && Device.system.browserVersion < 11) return unsupported();
                if ("ios" == Device.system.ios && Device.system.version <= 8) return Fallback.instance();
                (Utils.query("record") || Utils.query("snapshot")) && Stage.css("cursor", "none").bind("click", _ => Fullscreen.open()), TweenManager.addCustomEase({
                    name: "workListItem",
                    curve: "cubic-bezier(.54,.43,.23,1)"
                }), GLUI.render2D = !1, GLUI.render3D = !1, Assets.CDN = Config.CDN, Assets.CORS = "anonymous", Assets.HEADERS = {
                    mode: "cors"
                }, init()
            }
        }()
    });
window._MINIFIED_ = true;
window._BUILT_ = true;