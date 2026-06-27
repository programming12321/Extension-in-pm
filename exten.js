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
    }

    Scratch.extensions.register(new MiExtension());

})(Scratch);
