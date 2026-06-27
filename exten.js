(function (Scratch) {
    'use strict';

    class MiExtension {

        getInfo() {
            return {
                id: 'mini',
                name: 'MINI',
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#2A65B0',

                blocks: [
                    {
                        opcode: 'input',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'input[PROMPT]',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '¿Nombre?'
                            }
                        }
                    },
                    {
                        opcode: 'int',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'int[VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123'
                            }
                        }
                    },
                    {
                        opcode: 'str',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'str[TXT]',
                        arguments: {
                            TXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello'
                            }
                        }
                    },
                    {
                        opcode: 'float',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'float[FLOAT]',
                        arguments: {
                            FLOAT: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3.141592
                            }
                        }
                    },
                    {
                        opcode: 'complex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'complex[REAL][IMAG]',
                        arguments: {
                            REAL: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            },
                            IMAG: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4
                            }
                        }
                    },
                    {
                        opcode: 'type',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'type[VALUE]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '123'
                            }
                        }
                    }
                ]
            };
        }

        int(args) {
            return parseInt(args.VALUE, 10);
        }

        str(args) {
            if (!isNaN(Number(args.TXT))) {
                return NaN;
            } else {
                return String(args.TXT);
            }
        }

        float(args) {
            return parseFloat(args.FLOAT);
        }

        complex(args) {
            const real = Number(args.REAL);
            const imag = Number(args.IMAG);

            if (imag >= 0) {
                return `${real}+${imag}i`;
            } else {
                return `${real}${imag}i`;
            }
        }

        type(args) {
            const value = String(args.VALUE).trim();

            if (value === "") {
                return "empty";
            }

            if (!isNaN(Number(value))) {
                if (Number.isInteger(Number(value))) {
                    return "int";
                }
                return "float";
            }

            if (value === "true" || value === "false") {
                return "bool";
            }

            if (/^-?\d+(\.\d+)?[+-]\d+(\.\d+)?i$/.test(value)) {
                return "complex";
            }

            return "str";
        }

        input(args) {
            return prompt(args.PROMPT) ?? "";
        }
    }

    Scratch.extensions.register(new MiExtension());

})(Scratch);
