(function(Scratch) {
    'use strict';

    class PenguiPopup {
        constructor() {
            this.popupWindow = null;
        }

        getInfo() {
            return {
                id: 'penguipopup',
                name: 'PenguiPopup',
                blocks: [
                    {
                        opcode: 'openPopup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'open popup [URL] width [W] height [H]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://example.com'
                            },
                            W: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 400
                            },
                            H: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 300
                            }
                        }
                    },
                    {
                        opcode: 'closePopup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'close popup'
                    },
                    {
                        opcode: 'isOpen',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'popup is open?'
                    }
                ]
            };
        }

        openPopup(args) {
            const width = args.W;
            const height = args.H;

            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;

            this.popupWindow = window.open(
                args.URL,
                '_blank',
                `width=${width},height=${height},top=${top},left=${left}`
            );
        }

        closePopup() {
            if (this.popupWindow && !this.popupWindow.closed) {
                this.popupWindow.close();
            }
        }

        isOpen() {
            return this.popupWindow && !this.popupWindow.closed;
        }
    }

    Scratch.extensions.register(new PenguiPopup());
})(Scratch);