class PenguinVideoEngine {
    constructor(runtime) {
        this.runtime = runtime;

        this.video = document.createElement("video");
        this.video.crossOrigin = "anonymous";
        this.video.autoplay = false;
        this.video.playsInline = true;

        this.video.style.position = "absolute";
        this.video.style.pointerEvents = "none";
        this.video.style.transformOrigin = "top left";
        this.video.style.zIndex = 9999;

        document.body.appendChild(this.video);

        // stage tracking
        this.stageCanvas = null;

        // sprite-like positioning
        this.x = 0;
        this.y = 0;

        this.width = 480;
        this.height = 270;

        this.visible = true;

        this.zFront = true;

        this._bindStage();
        this._startRenderLoop();
    }

    _bindStage() {
        const tryFind = () => {
            this.stageCanvas =
                document.querySelector("canvas") ||
                document.querySelector("#stageCanvas") ||
                document.querySelector("[class*='stage'] canvas");
        };

        tryFind();
        setTimeout(tryFind, 1000);
    }

    _scratchToScreen(x, y, rect) {
        // Scratch stage: center = 0,0
        const screenX = rect.left + rect.width / 2 + x;
        const screenY = rect.top + rect.height / 2 - y;
        return { x: screenX, y: screenY };
    }

    _startRenderLoop() {
        const loop = () => {
            if (!this.stageCanvas) this._bindStage();
            if (!this.stageCanvas) return requestAnimationFrame(loop);

            const rect = this.stageCanvas.getBoundingClientRect();

            const pos = this._scratchToScreen(this.x, this.y, rect);

            this.video.style.left = pos.x + "px";
            this.video.style.top = pos.y + "px";

            this.video.style.width = this.width + "px";
            this.video.style.height = this.height + "px";

            this.video.style.display = this.visible ? "block" : "none";

            this.video.style.zIndex = this.zFront ? 9999 : 1;

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    getInfo() {
        return {
            id: "penguinVideoEngine",
            name: "Video Stage Engine",
            blocks: [
                {
                    opcode: "load",
                    blockType: "command",
                    text: "load video [URL]",
                    arguments: {
                        URL: { type: "string", defaultValue: "https://example.com/video.mp4" }
                    }
                },

                "---",

                { opcode: "play", blockType: "command", text: "play" },
                { opcode: "pause", blockType: "command", text: "pause" },
                { opcode: "stop", blockType: "command", text: "stop" },

                "---",

                {
                    opcode: "gotoX",
                    blockType: "command",
                    text: "set x [X]",
                    arguments: { X: { type: "number", defaultValue: 0 } }
                },
                {
                    opcode: "gotoY",
                    blockType: "command",
                    text: "set y [Y]",
                    arguments: { Y: { type: "number", defaultValue: 0 } }
                },

                {
                    opcode: "setSize",
                    blockType: "command",
                    text: "set size [W] [H]",
                    arguments: {
                        W: { type: "number", defaultValue: 480 },
                        H: { type: "number", defaultValue: 270 }
                    }
                },

                {
                    opcode: "setVolume",
                    blockType: "command",
                    text: "set volume [V]",
                    arguments: {
                        V: { type: "number", defaultValue: 100 }
                    }
                },

                {
                    opcode: "setSpeed",
                    blockType: "command",
                    text: "set speed [S]",
                    arguments: {
                        S: { type: "number", defaultValue: 1 }
                    }
                },

                {
                    opcode: "seek",
                    blockType: "command",
                    text: "seek [T] seconds",
                    arguments: {
                        T: { type: "number", defaultValue: 0 }
                    }
                },

                {
                    opcode: "loop",
                    blockType: "command",
                    text: "loop video [BOOL]",
                    arguments: {
                        BOOL: { type: "boolean", defaultValue: false }
                    }
                },

                {
                    opcode: "front",
                    blockType: "command",
                    text: "bring video to front"
                },

                {
                    opcode: "back",
                    blockType: "command",
                    text: "send video to back"
                },

                { opcode: "show", blockType: "command", text: "show" },
                { opcode: "hide", blockType: "command", text: "hide" }
            ]
        };
    }

    // ---- actions ----

    load(args) {
        this.video.src = args.URL;
        this.video.load();
    }

    play() {
        this.video.play();
    }

    pause() {
        this.video.pause();
    }

    stop() {
        this.video.pause();
        this.video.currentTime = 0;
    }

    gotoX(args) {
        this.x = args.X;
    }

    gotoY(args) {
        this.y = args.Y;
    }

    setSize(args) {
        this.width = args.W;
        this.height = args.H;
    }

    setVolume(args) {
        this.video.volume = Math.max(0, Math.min(1, args.V / 100));
    }

    setSpeed(args) {
        this.video.playbackRate = args.S;
    }

    seek(args) {
        this.video.currentTime = args.T;
    }

    loop(args) {
        this.video.loop = args.BOOL;
    }

    front() {
        this.zFront = true;
    }

    back() {
        this.zFront = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }
}

(function (Scratch) {
    "use strict";
    Scratch.extensions.register(new PenguinVideoEngine(Scratch.runtime));
})(Scratch);
