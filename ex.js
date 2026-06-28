(function (Scratch) {
    'use strict';

    class JavaExtension {

        constructor() {
            this.vars = {};
        }

        getInfo() {
            return {
                id: 'java',
                name: 'Java',

                blocks: [
                    {
                        opcode: "main",
                        blockType: Scratch.BlockType.HAT,
                        text: "public static void main(String[] args)"
                    },
                    {
                        opcode: "println",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "System.out.println([VALUE])",
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hola"
                            }
                        }
                    },
                    {
                        opcode: "intVar",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "int [NAME] = [VALUE]",
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "x"
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: "getInt",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[NAME]",
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "x"
                            }
                        }
                    }
                ]
            };
        }

        main() {
            return true;
        }

        println(args) {
            const expr = args.VALUE.trim();

            // Variable
            if (expr in this.vars) {
                alert(this.vars[expr]);
                return;
            }

            // Número
            if (!isNaN(expr)) {
                alert(Number(expr));
                return;
            }

            // Expresión
            try {
                const nombres = Object.keys(this.vars);
                const valores = Object.values(this.vars);

                const resultado = new Function(
                    ...nombres,
                    `return ${expr};`
                )(...valores);

                alert(resultado);
            } catch {
                // Texto
                alert(expr.replace(/^["']|["']$/g, ""));
            }
        }

        intVar(args) {
            this.vars[args.NAME] = Math.floor(Number(args.VALUE));
        }

        getInt(args) {
            return this.vars[args.NAME] ?? 0;
        }
    }

    Scratch.extensions.register(new JavaExtension());

})(Scratch);
