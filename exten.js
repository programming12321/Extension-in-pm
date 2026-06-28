function parseComplex(expr) {
    expr = expr.replace(/\s+/g, "");

    let re = 0;
    let im = 0;

    // detectar i*y
    const imMatch = expr.match(/([+-]?\d*)\*?i\*?(\d+)?/);

    if (imMatch) {
        let coeff = imMatch[1];
        let num = imMatch[2];

        if (coeff === "" || coeff === "+") coeff = 1;
        if (coeff === "-") coeff = -1;

        if (!num) num = 1;

        im = Number(coeff) * Number(num);

        expr = expr.replace(imMatch[0], "");
    }

    // lo que queda es real
    if (expr.length > 0) {
        re = Number(expr);
    }

    return { re, im };
}

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
                        opcode: 'ascii',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'ascii [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'A'
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
                    },
                    {
                        opcode: 'i',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'i'
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
            const expr = args.EXPR.replace(/\s+/g, "");

            let re = 0;
            let im = 0;

            const imMatch = expr.match(/([+-]?\d*)\*?i\*?(\d+)?/);

            let rest = expr;

            if (imMatch) {
                let coeff = imMatch[1];
                let num = imMatch[2] || 1;

                if (coeff === "" || coeff === "+") coeff = 1;
                if (coeff === "-") coeff = -1;

                im = Number(coeff) * Number(num);

                rest = rest.replace(imMatch[0], "");
            }

            if (rest !== "") {
                re = Number(rest);
            }

            return `${re}${im >= 0 ? "+" : ""}${im}i`;
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

        ascii(args) {
            const text = String(args.TEXT);

            if (text.length !== 1) {
                return "";
            }

            return text.charCodeAt(0);
        }

        i() {
            return "i";
        }
    }

    Scratch.extensions.register(new MiExtension());

})(Scratch);
