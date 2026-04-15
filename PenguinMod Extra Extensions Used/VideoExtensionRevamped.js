class PenguinVideoExtension {
    constructor(runtime) {
        this.runtime = runtime;

        this.video = document.createElement("video");
        this.video.style.position = "absolute";
        this.video.style.zIndex = 9999;
        this.video.style.pointerEvents = "none";
        this.video.crossOrigin = "anonymous";
        this.video.autoplay = false;
        this.video.loop = false;
        this.video.volume = 1;

        document.body.appendChild(this.video);

        this.visible = true;

        this.x = 0;
        this.y = 0;
        this.width = 320;
        this.height = 180;

        this.updateStyle();
    }

    updateStyle() {
        this.video.style.left = this.x + "px";
        this.video.style.top = this.y + "px";
        this.video.style.width = this.width + "px";
        this.video.style.height = this.height + "px";
        this.video.style.display = this.visible ? "block" : "none";
    }

    getInfo() {
        return {
            id: "penguinVideo",
            name: "Video URL Stage",
            blocks: [
                { opcode: "loadVideo", blockType: "command", text: "load video from [URL]", arguments: {
                    URL: { type: "string", defaultValue: "https://example.com/video.mp4" }
                }},
                "---",
                { opcode: "play", blockType: "command", text: "play video" },
                { opcode: "pause", blockType: "command", text: "pause video" },
                { opcode: "stop", blockType: "command", text: "stop video" },
                "---",
                { opcode: "setVolume", blockType: "command", text: "set volume to [VOL]", arguments: {
                    VOL: { type: "number", defaultValue: 100 }
                }},
                { opcode: "setLoop", blockType: "command", text: "loop video [BOOL]", arguments: {
                    BOOL: { type: "boolean", defaultValue: true }
                }},
                { opcode: "setSpeed", blockType: "command", text: "set speed to [SPD]", arguments: {
                    SPD: { type: "number", defaultValue: 1 }
                }},
                "---",
                { opcode: "setX", blockType: "command", text: "set video x to [X]", arguments: {
                    X: { type: "number", defaultValue: 0 }
                }},
                { opcode: "setY", blockType: "command", text: "set video y to [Y]", arguments: {
                    Y: { type: "number", defaultValue: 0 }
                }},
                { opcode: "setSize", blockType: "command", text: "set video size to [W] x [H]", arguments: {
                    W: { type: "number", defaultValue: 320 },
                    H: { type: "number", defaultValue: 180 }
                }},
                "---",
                { opcode: "seek", blockType: "command", text: "seek to [TIME] sec", arguments: {
                    TIME: { type: "number", defaultValue: 0 }
                }},
                "---",
                { opcode: "show", blockType: "command", text: "show video" },
                { opcode: "hide", blockType: "command", text: "hide video" }
            ]
        };
    }

    loadVideo(args) {
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

    setVolume(args) {
        this.video.volume = Math.max(0, Math.min(1, args.VOL / 100));
    }

    setLoop(args) {
        this.video.loop = args.BOOL;
    }

    setSpeed(args) {
        this.video.playbackRate = args.SPD;
    }

    setX(args) {
        this.x = args.X;
        this.updateStyle();
    }

    setY(args) {
        this.y = args.Y;
        this.updateStyle();
    }

    setSize(args) {
        this.width = args.W;
        this.height = args.H;
        this.updateStyle();
    }

    seek(args) {
        this.video.currentTime = args.TIME;
    }

    show() {
        this.visible = true;
        this.updateStyle();
    }

    hide() {
        this.visible = false;
        this.updateStyle();
    }
}

(function (Scratch) {
    "use strict";
    Scratch.extensions.register(new PenguinVideoExtension(Scratch.runtime));
})(Scratch);