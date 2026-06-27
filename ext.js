(function(Scratch) {
    'use strict';

    class Extras {

        getInfo() {
            return {
                id: "extras",
                name: "Extras",
                color1: "#00FFBF",
                color2: "#00F7B9",
                color3: "#00E8AE",

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
                    
                    {
                        opcode: "substring",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "substring [TEXT] from [START] to [END]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hello"
                            },
                            START: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            END: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 5
                            }
                        }
                    },

                    {
                        opcode: "instring",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "instring [TEXT] in [STR]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hello world"
                            },
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "world"
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

                    {
                        opcode: "gcd",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "gcd [N] [X]",
                        arguments: {
                            N: {type: Scratch.ArgumentType.NUMBER, defaultValue: 48},
                            X: {type: Scratch.ArgumentType.NUMBER, defaultValue: 6 }
                        }
                    },

                    {
                        opcode: "lcm",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "lcm [N] [X]",
                        arguments: {
                            N: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 12
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 18
                            }
                        }
                    },

                    {
                        opcode: "xroot",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[N]th root of [X]",
                        arguments: {
                            N: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            X: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 27
                            }
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

        substring(args) {
            return String(args.TEXT).slice(
                Number(args.START) - 1,
                Number(args.END),
            );
        }

        instring(args) {
            return String(args.TEXT).includes(String(args.STR));
        }

        clamp(args) {
            return Math.max(args.MIN, Math.min(args.MAX, args.N));
        }

        gcd(args) {
            let a = Math.abs(Number(args.N));
            let b = Math.abs(Number(args.X));

            while (b !== 0) {
                let t = b;
                b = a % b;
                a = t;
            }

            return a;
        }

        lcm(args) {
            let a = Math.abs(Number(args.N));
            let b = Math.abs(Number(args.X));

            if (a === 0 || b === 0) return 0;

            let x = a;
            let y = b;

            while (y !== 0) {
                let t = y;
                y = x % y;
                x = t;
            }

            return (a * b) / x;
        }

        xroot(args) {
            return Number(args.N) ** (1 / Number(args.X))
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
