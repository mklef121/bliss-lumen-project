/**
 * Modern-WebcamJS
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/modern-webcamjs
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var modInited = false; // module initialized
    var mediaDevices;
    var devList = []; // available device
    /**
     * defined device's label
     * [
     *  ['Scanner', 'USB Camema'],  // [master, slave] of device
     *  ['S920A3', 'USB CAM2'],  // [master, slave] of optional other device
     * ]
     */
    var labelList = [];
    // device detect
    var pms = init_mod();
    var permission = false;
    var cam = {
        guid: 1,
        _instances: new Map(),
        config: {
            debug: false,
            useDefault: true,
            ctx: '',
            fps: 30,
            previewWidth: 320,
            previewHeight: 240,
            flipHoriz: false,
            width: 0,
            height: 0,
            imageFormat: 'jpeg',
            jpegQuality: 95,
            dataType: 'dataURL',
            switchDelay: 100,
            snapDelay: 0,
            /**
             * defined device's label
             *  ['Scanner', 'USB Camema', ...]
             */
            devLabels: null,
            multiOptions: null,
        },
        streamConfig: {
            streamIdx: -1,
            deviceName: '',
            deviceId: '',
        },
    };
    exports.Webcam = function (config) {
        return exports.Webcam._init(config);
    };
    exports.Webcam.v = '1.0.0';
    var init = function (config) {
        if (config && typeof config === 'object') {
            var inst = this;
            inst.guid = cam.guid;
            inst.ctx = null;
            inst.video = null;
            inst.config = Object.assign({}, cam.config, config);
            inst.inited = false;
            inst.live = false;
            inst.streamMap = new Map();
            inst.streamConfigMap = new Map();
            inst.currStreamIdx = -1;
            inst.retryCount = 0;
            cam.guid++;
            if (inst.config.ctx) {
                if (typeof inst.config.ctx === 'string') {
                    inst.ctx = document.body.querySelector(inst.config.ctx);
                }
                else if (inst.config.ctx instanceof HTMLElement) {
                    if (document.body.contains(inst.config.ctx)) {
                        inst.ctx = inst.config.ctx;
                    }
                }
            }
            else {
                throw new Error('video container ctx not exists');
            }
            _init(inst);
            if (inst.config.multiOptions && Array.isArray(inst.config.multiOptions)) {
                for (var _i = 0, _a = inst.config.multiOptions; _i < _a.length; _i++) {
                    var opts = _a[_i];
                    var sconfig = Object.assign({}, cam.streamConfig, inst.config, opts);
                    sconfig.multiOptions = null;
                    inst._set(sconfig);
                }
            }
            else {
                inst.config.multiOptions = null;
                var sconfig = Object.assign({}, cam.streamConfig, inst.config);
                inst._set(sconfig);
            }
            cam._instances.set(inst.guid, inst);
            // devList maybe empty at this time
            return inst;
        }
        else {
            throw new Error('initialize params missing');
        }
    };
    function _init(inst) {
        var config = inst.config;
        var ctx = inst.ctx;
        ctx.innerHTML = '';
        var div = document.createElement('div');
        ctx.appendChild(div);
        inst.holder = div;
        // set previewWidth previewHeight if not set
        if (!config.previewWidth) {
            config.previewWidth = ctx.offsetWidth;
        }
        if (!config.previewHeight) {
            config.previewHeight = ctx.offsetHeight;
        }
        if (config.previewWidth <= 0 || config.previewHeight <= 0) {
            console.error('previewWidth or previewHeight of preview container invalie');
            return;
        }
        if (config.width <= 0) {
            config.width = config.previewWidth;
        }
        if (config.height <= 0) {
            config.height = config.previewHeight;
        }
        var scaleX = config.previewWidth / config.width;
        var scaleY = config.previewHeight / config.height;
        if (typeof config.fps !== 'number') {
            config.fps = 30;
        }
        if (typeof config.devLabels === 'undefined' || !Array.isArray(config.devLabels)) {
            config.devLabels = null;
        }
        var video = document.createElement('video');
        video.setAttribute('autoplay', 'autoplay');
        if (video.style) {
            video.style.width = '' + config.width + 'px';
            video.style.height = '' + config.height + 'px';
        }
        if ((scaleX !== 1.0) || (scaleY !== 1.0)) {
            if (ctx.style) {
                ctx.style.overflow = 'hidden';
            }
            if (video.style) {
                video.style.transformOrigin = '0px 0px';
                video.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
            }
        }
        ctx.appendChild(video);
        inst.video = video;
        inst.inited = true;
        inst.live = false;
    }
    exports.Webcam.fn = exports.Webcam.prototype;
    // init.fn = init.prototype = Webcam.fn;
    init.fn = init.prototype;
    exports.Webcam.fn.init = init;
    exports.Webcam._init = function (config) {
        try {
            return new exports.Webcam.fn.init(config);
        }
        catch (ex) {
            console.error(ex);
            return;
        }
    };
    function init_mod() {
        if (modInited) {
            return Promise.resolve();
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            mediaDevices = navigator.mediaDevices;
        }
        else {
            return Promise.resolve(new Error('mediaDevices.getUserMedia not support'));
        }
        window.addEventListener('beforeunload', function (event) {
            exports.Webcam.destroy();
        });
        var t;
        return Promise.race([
            new Promise(function (resolve, reject) {
                t = setTimeout(function () {
                    reject(new Error('init timeout failed'));
                }, 30000); // @HARDCODED
            }),
            enumerate_devices().then(function () {
                if (!permission) {
                    // invoke permission
                    return invode_permission();
                }
            }),
        ])
            .then(function (err) {
            clearTimeout(t);
            return err;
        })
            .catch(function (err) {
            clearTimeout(t);
            handleError(err);
            return err;
        });
    }
    function handleError(err) {
        console.error(err);
        return err;
    }
    function gotDevices(deviceInfos) {
        for (var i = 0; i < deviceInfos.length; i++) {
            var dev = deviceInfos[i];
            if (dev.kind === 'videoinput') {
                if (dev.label) {
                    permission = true;
                }
                devList.push(dev);
            }
        }
    }
    exports.Webcam.get_device_list = function () {
        return pms.then(function (err) {
            if (!err) {
                return devList;
            }
        });
    };
    exports.Webcam.get_inst_by_guid = function (guid) {
        var inst = cam._instances.get(+guid);
        if (!inst) {
            console.info('inst empty guid:' + guid);
            return;
        }
        return inst;
    };
    exports.Webcam.get_insts = function () {
        if (!cam._instances.size) {
            return;
        }
        return Array.from(cam._instances.values());
    };
    // destroy Webcam module
    exports.Webcam.destroy = function () {
        var insts = this.get_insts();
        if (insts) {
            for (var _i = 0, insts_1 = insts; _i < insts_1.length; _i++) {
                var inst = insts_1[_i];
                inst.reset();
            }
        }
    };
    /* ---------- static method END -------------- */
    /* ---------- init method START -------------- */
    init.fn.set = function (sconfig) {
        var inst = this;
        if (!sconfig || (Array.isArray(sconfig) && !sconfig.length)) {
            console.error('set() sconfig empty', sconfig);
            return inst;
        }
        if (Array.isArray(sconfig)) {
            for (var i = 0, len = sconfig.length; i < len; i++) {
                inst._set(sconfig[i]);
            }
        }
        else {
            inst._set(sconfig);
        }
        return inst;
    };
    init.fn._set = function (sconfig) {
        var inst = this;
        if (!sconfig) {
            return;
        }
        var sidx;
        if (typeof sconfig.streamIdx === 'undefined') {
            console.error('set() streamIdx must defined');
            return;
        }
        if (sconfig.streamIdx === -1) { // came from init()
            sidx = gen_stream_idx(inst);
        }
        else {
            sidx = +sconfig.streamIdx;
        }
        if (Number.isNaN(sidx)) {
            console.error('set() param streamIdx invalid');
            return;
        }
        var p = {};
        for (var x in sconfig) {
            if (!{}.hasOwnProperty.call(sconfig, x)) {
                continue;
            }
            p[x] = sconfig[x];
        }
        p.streamIdx = sidx;
        p.ctx = inst.config.ctx;
        var sconfigOri = inst.get_stream_config(sidx);
        if (sconfigOri) {
            p = Object.assign({}, sconfigOri, p);
        }
        else if (sconfig.streamIdx !== -1) {
            var defaults = Object.assign({}, cam.streamConfig, inst.config);
            p = Object.assign({}, defaults, p);
        }
        set_stream_config(inst, sidx, p);
    };
    init.fn.sidx_exists = function (sidx) {
        return this.streamConfigMap.has(sidx);
    };
    init.fn.get_stream_config = function (sidx) {
        return this.streamConfigMap.get(sidx);
    };
    init.fn.get_all_stream_idx = function () {
        return Array.from(this.streamConfigMap.keys());
    };
    // connect selected vedio
    init.fn.connect = function (sidx) {
        var inst = this;
        if (typeof sidx === 'undefined') {
            sidx = inst.get_first_sidx();
        }
        sidx = +sidx;
        if (Number.isNaN(sidx) || sidx < 0) {
            console.error('connect() param sidx invalid: not number or less then zero');
            return Promise.resolve(inst);
        }
        if (!inst.sidx_exists(sidx)) { // sidx0 always exists cause of default
            console.error("connect() connecting stream " + sidx + " not exists");
            return Promise.resolve(inst);
        }
        return pms.then(function (err) {
            if (!err) {
                var sconfig = inst.get_stream_config(sidx);
                if (sconfig) {
                    inst._set_stream_device_label(sconfig);
                    return _switch_stream(inst, sidx).then(function () {
                        return inst;
                    }).catch(function (err) {
                        console.error(err);
                        return inst;
                    });
                }
            }
            return inst;
        });
    };
    init.fn._set_stream_device_label = function (sconfig) {
        var inst = this;
        if (!devList || !devList.length) {
            return inst;
        }
        var sidx = +sconfig.streamIdx;
        var name = '';
        if (sconfig.deviceName && typeof sconfig.deviceName === 'string') { // match device by  defined deviceName
            if (inst.config.devLabels) {
                name = match_label_by_arr(sconfig.deviceName, inst.config.devLabels);
            }
            else {
                var arr = [];
                for (var i = 0; i < devList.length; i++) {
                    var label = devList[i].label;
                    label && arr.push(label);
                }
                name = match_label_by_arr(sconfig.deviceName, arr);
            }
        }
        else { // match device by streamIdx
            name = get_label_by_sidx(sidx);
        }
        if (!name && inst.config.useDefault) {
            name = devList[sidx] ? devList[sidx].label : devList[0].label; // maybe empty during file opened directly insteadof through URL
        }
        sconfig.deviceName = name;
        return inst;
    };
    init.fn.reset = function () {
        var inst = this;
        var arr = inst.get_all_stream_idx();
        if (arr && arr.length) {
            for (var i = 0, len = arr.length; i < len; i++) {
                inst._reset(arr[i]);
            }
        }
        if (inst.ctx) {
            inst.ctx.innerHTML = '';
            inst.ctx = null;
        }
        inst.live = true;
        return inst;
    };
    init.fn._reset = function (sidx) {
        var inst = this;
        inst.release_stream(sidx);
        return inst;
    };
    init.fn.release_stream = function (sidx) {
        var inst = this;
        var sconfig = inst.get_stream_config(sidx);
        if (sconfig) {
            inst.stop_media(sidx)
                .streamMap.delete(sidx);
        }
        return inst;
    };
    init.fn.stop_media = function (sidx) {
        var inst = this;
        var stream = inst.streamMap.get(sidx);
        if (stream) {
            if (typeof stream.getVideoTracks === 'function') {
                try {
                    var tracks = stream.getVideoTracks();
                    for (var i = 0, len = tracks.length; i < len; i++) {
                        if (tracks[i] && typeof tracks[i].stop === 'function') {
                            tracks[i].stop();
                        }
                    }
                }
                catch (ex) {
                    console.error(ex);
                }
            }
        }
        return inst;
    };
    init.fn.snap = function (opts) {
        var inst = this;
        if (inst.retryCount > 20) { // @HARDCODED
            inst.retryCount = 0;
            return Promise.resolve('');
        }
        // instance or video not ready
        if (!inst.inited || !inst.live) {
            return new Promise(function (resolve) {
                inst.retryCount += 1;
                setTimeout(resolve, 1500, { inst: inst, opts: opts });
            })
                .then(function (_a) {
                var inst = _a.inst, opts = _a.opts;
                return inst.snap(opts);
            });
        }
        var sopts;
        if (typeof opts === 'number') {
            var sconfig = inst.get_stream_config(+opts);
            if (!sconfig) {
                console.error('snap() param streamIdx invald', opts);
                return Promise.resolve('');
            }
            sopts = inst.prepare_snap_opts(sconfig); // snap opts
        }
        else {
            sopts = inst.prepare_snap_opts(opts); // snap opts
        }
        if (typeof sopts === 'undefined' || !sopts || Number.isNaN(+sopts.streamIdx)) {
            console.error('streamIdx invalid');
            return Promise.resolve('');
        }
        if (!inst.live) {
            console.error('stream not lived');
            return Promise.resolve('');
        }
        if (sopts.streamIdx === inst.currStreamIdx) {
            return new Promise(function (resolve) {
                setTimeout(resolve, sopts.snapDelay, { inst: inst, sopts: sopts });
            }).then(function (_a) {
                var inst = _a.inst, sopts = _a.sopts;
                return snap(inst, sopts);
            });
        }
        else {
            // increase delay during first preview
            var ready = inst.streamMap.get(sopts.streamIdx);
            var delay_1 = ready ? sopts.switchDelay : sopts.switchDelay + 1500;
            return inst.connect(sopts.streamIdx)
                .then(function () {
                return new Promise(function (resolve) {
                    setTimeout(resolve, delay_1, sopts);
                });
            })
                .then(function (sopts) {
                return inst.snap(sopts);
            });
        }
    };
    init.fn.prepare_snap_opts = function (opts) {
        var inst = this;
        var sopts;
        var sidx = 0;
        if (typeof opts === 'undefined' || !opts) {
            sidx = inst.currStreamIdx;
            sopts = inst.get_stream_config(sidx);
        }
        else if (typeof opts === 'object' && opts) {
            sidx = +opts.streamIdx;
            if (Number.isNaN(sidx)) {
                sidx = inst.currStreamIdx;
            }
            var sconfig = inst.get_stream_config(sidx);
            sopts = Object.assign({}, (sconfig ? sconfig : {}), opts);
        }
        else {
            sopts = inst.get_stream_config(sidx);
        }
        if (sopts.switchDelay < 0 || Number.isNaN(+sopts.switchDelay)) {
            sopts.switchDelay = cam.config.switchDelay;
        }
        if (sopts.snapDelay < 0 || Number.isNaN(+sopts.snapDelay)) {
            sopts.snapDelay = cam.config.snapDelay;
        }
        if (typeof sopts.rotation === 'undefined') {
            sopts.rotation = 1;
        }
        sopts.streamIdx = sidx;
        return sopts;
    };
    // toggle next stream if available attached to this instance
    init.fn.connect_next = function (sidx) {
        var inst = this;
        return pms.then(function (err) {
            if (!err) {
                sidx = inst.get_next_sidx(inst.currStreamIdx);
                return inst.connect(sidx);
            }
            return inst;
        });
    };
    // get next streamIdx by defined sidx, if sidx is the last then return the first
    init.fn.get_next_sidx = function (sidx) {
        var inst = this;
        var res;
        if (inst.sidx_exists(sidx)) {
            var arr = inst.get_all_stream_idx();
            var pos = arr.indexOf(sidx);
            if (pos + 1 < arr.length) {
                res = arr[pos + 1];
            }
            else {
                res = arr[0];
            }
        }
        else {
            res = 0;
        }
        return res;
    };
    init.fn.get_first_sidx = function () {
        var inst = this;
        var arr = inst.get_all_stream_idx();
        if (arr[0] >= 0) {
            return arr[0];
        }
    };
    /* ---------- init method END -------------- */
    function set_stream_config(inst, sidx, sconfig) {
        inst.streamConfigMap.set(sidx, sconfig);
    }
    function _switch_stream(inst, sidx) {
        sidx = +sidx;
        if (sidx && inst.currStreamIdx && sidx === inst.currStreamIdx) {
            console.log('switch the same stream. skipped');
            return Promise.resolve();
        }
        var sconfig = inst.get_stream_config(sidx);
        if (!sconfig) {
            return Promise.reject('streamConfig empty');
        }
        // inst.stop_media(inst.currStreamIdx);
        return _switch_stream_html(inst, sidx, sconfig);
    }
    function _switch_stream_html(inst, sidx, sconfig) {
        if (!sconfig.deviceId) {
            if (!sconfig.deviceName) {
                return Promise.reject('_switch_stream_html() deviceName empty');
            }
            sconfig.deviceId = get_deviceid_by_label(sconfig.deviceName);
            if (!sconfig.deviceId) {
                return Promise.resolve('deviceId empty');
            }
        }
        var last = inst.streamMap.get(sidx);
        if (last) {
            return attach_stream(inst, sidx, last);
        }
        // ask user for access to their camera
        var vOpts = {
            width: {
                ideal: sconfig.width,
            },
            height: {
                ideal: sconfig.height,
            },
            deviceId: { exact: sconfig.deviceId },
        };
        return mediaDevices.getUserMedia({
            'audio': false,
            'video': vOpts,
        })
            .then(function (stream) {
            if (stream && inst.video) {
                return attach_stream(inst, sidx, stream);
            }
            else {
                return Promise.reject('vedio or stream blank during switch camera');
            }
        });
    }
    function get_label_by_sidx(sidx) {
        sidx = +sidx;
        if (Number.isNaN(sidx) || sidx < 0) {
            return '';
        }
        return devList[sidx] && devList[sidx].label || '';
    }
    function match_label_by_arr(devName, arr) {
        if (!devName || typeof devName !== 'string') {
            return '';
        }
        var res = '';
        var pos = arr.indexOf(devName);
        if (pos > -1) {
            res = devName;
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                var label = arr[i];
                if (label && label.indexOf(devName) > -1) {
                    res = label;
                    break;
                }
            }
        }
        return res ? res : '';
    }
    function get_deviceid_by_label(name) {
        if (typeof name !== 'string' || !name || !devList.length) {
            return '';
        }
        var arr = name.split(',');
        for (var i = 0, len = arr.length; i < len; i++) {
            arr[i] = arr[i].trim();
        }
        for (var i = 0, len = devList.length; i < len; i++) {
            var dev = devList[i];
            var label = dev && dev.label ? dev.label : '';
            var matched = false;
            if (!label) {
                continue;
            }
            for (var j = 0; j < arr.length; j++) {
                var needle = arr[j];
                if (needle) {
                    if (label.indexOf(needle) > -1) {
                        matched = true;
                    }
                    else {
                        matched = false;
                    }
                }
            }
            if (matched) {
                return dev.deviceId;
            }
        }
        return '';
    }
    function attach_stream(inst, sidx, stream) {
        return new Promise(function (resolve, reject) {
            if (inst && inst.video && stream) {
                inst.video.onloadedmetadata = function (e) {
                    inst.streamMap.set(sidx, stream);
                    inst.currStreamIdx = sidx;
                    inst.live = true;
                    resolve();
                };
                inst.video.srcObject = stream;
            }
            else {
                if (inst) {
                    inst.live = false;
                }
                reject('attach_stream() params inst or stream invalid');
            }
        });
    }
    function drawRotated(cvs, image, degrees) {
        var ctx = cvs.getContext('2d');
        if (!ctx) {
            throw new Error('canvas context invalud');
        }
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        ctx.save();
        // move to the center of the canvas
        ctx.translate(cvs.width / 2, cvs.height / 2);
        // rotate the canvas to the specified degrees
        ctx.rotate(degrees * Math.PI / 180);
        // draw the image
        // since the context is rotated, the image will be rotated also
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        // we’re done with the rotating so restore the unrotated context
        ctx.restore();
    }
    // return ObjectURL or DataURL
    function snap(inst, sopts) {
        var cvs = document.createElement('canvas');
        cvs.width = sopts.width;
        cvs.height = sopts.height;
        var ctx = cvs.getContext('2d');
        if (!ctx) {
            return Promise.reject('canvas-unsupported');
        }
        // flip canvas horizontally if desired
        if (sopts.flipHoriz) {
            ctx.translate(sopts.width, 0);
            ctx.scale(-1, 1);
        }
        var video = inst.video;
        if (video) {
            var cvs2_1 = document.createElement('canvas');
            var rotation = +sopts.rotation;
            var w = cvs.width;
            var h = cvs.height;
            var angular = 0;
            switch (rotation) {
                case 8: // turn left 90
                    w = cvs.height;
                    h = cvs.width;
                    angular = -90;
                    break;
                case 3: // turn right 180
                    w = cvs.width;
                    h = cvs.height;
                    angular = 180;
                    break;
                case 6: // turn right 90
                    w = cvs.height;
                    h = cvs.width;
                    angular = 90;
                    break;
                case 1:
                    w = cvs.width;
                    h = cvs.height;
                    break;
                default:
                    w = cvs.width;
                    h = cvs.height;
                    break;
            }
            cvs2_1.width = w;
            cvs2_1.height = h;
            ctx.drawImage(video, 0, 0, sopts.width, sopts.height);
            drawRotated(cvs2_1, cvs, angular); // rotate image
            cvs.width = cvs.height = 0;
            return new Promise(function (resolve, reject) {
                switch (sopts.dataType) {
                    case 'dataURL':
                    case 'dataurl':
                        return resolve(cvs2_1.toDataURL('image/' + sopts.imageFormat, sopts.jpegQuality / 100));
                    case 'objectURL':
                    case 'objecturl':
                        return cvs2_1.toBlob(function (blob) {
                            // need call URL.revokeObjectURL(ourl) later
                            resolve(blob ? URL.createObjectURL(blob) : '');
                        }, 'image/' + sopts.imageFormat, sopts.jpegQuality / 100);
                    default:
                        return assert_never(sopts.dataType);
                }
            });
        }
        else {
            return Promise.reject('video empty');
        }
    }
    function gen_stream_idx(inst) {
        var arr = inst.get_all_stream_idx();
        if (!arr || !arr.length) {
            return 0;
        }
        var _a = arr.length - 1, sidx = arr[_a];
        sidx += 1;
        if (!inst.sidx_exists(sidx)) {
            return sidx;
        }
        else {
            sidx = Math.max.apply(Math, arr) + 1;
            return sidx;
        }
    }
    function assert_never(x) {
        throw new Error('Unexpected object: ' + x);
    }
    function enumerate_devices() {
        return mediaDevices.enumerateDevices()
            .then(function (devices) {
            gotDevices(devices);
        });
    }
    function invode_permission() {
        return new Promise(function (resolve, reject) {
            mediaDevices.getUserMedia({
                'audio': false,
                'video': true,
            })
                .then(function (stream) {
                devList.length = 0;
                enumerate_devices().then(function () {
                    resolve();
                });
            })
                .catch(function (err) {
                reject(err);
            });
        });
    }
    exports.default = exports.Webcam;
});
