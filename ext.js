(function(Scratch) {
    'use strict';

    class Extras {

        getInfo() {
            return {
                id: "extras",
                name: "Extras",
                color1: "rgb(0, 255, 191)",
                color2: "rgb(0, 247, 185)",

                blocks: [

                    // Texto
                    {
                        opcode: "reverse",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "reverse [TEXT]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hello"
                            }
                        }
                    },

                    {
                        opcode: "uppercase",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "uppercase [TEXT]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hello"
                            }
                        }
                    },

                    {
                        opcode: "lowercase",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "lowercase [TEXT]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "HELLO"
                            }
                        }
                    },

                    // Matemáticas
                    {
                        opcode: "clamp",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "clamp [N] between [MIN] and [MAX]",
                        arguments: {
                            N: {type: Scratch.ArgumentType.NUMBER, defaultValue: 15},
                            MIN: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0},
                            MAX: {type: Scratch.ArgumentType.NUMBER, defaultValue: 10}
                        }
                    },

                    // Colores
                    {
                        opcode: "randomColor",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "random color"
                    },

                    // Sistema
                    {
                        opcode: "timestamp",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "timestamp"
                    }

                ]
            };
        }

        reverse(args) {
            return args.TEXT.split("").reverse().join("");
        }

        uppercase(args) {
            return args.TEXT.toUpperCase();
        }

        lowercase(args) {
            return args.TEXT.toLowerCase();
        }

        clamp(args) {
            return Math.max(args.MIN, Math.min(args.MAX, args.N));
        }

        randomColor() {
            return "#" + Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0");
        }

        timestamp() {
            return Date.now();
        }

    }

    Scratch.extensions.register(new Extras());

})(Scratch);
