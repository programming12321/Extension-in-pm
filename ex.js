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
                        opcode: 'run',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Run Java [CODE]',
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'System.out.println("Hola");'
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

        run(args) {
            const lines = args.CODE.split("\n");

            for (let line of lines) {
                line = line.trim();

                const m = line.match(/^System\.out\.println\((.*)\);$/);
                if (!m) continue;

                let expr = m[1].trim();

                // ¿Es una variable?
                if (expr in this.vars) {
                    alert(this.vars[expr]);
                    continue;
                }

                // ¿Es un número?
                if (!isNaN(expr)) {
                    alert(Number(expr));
                    continue;
                }

                // Intentar evaluar una expresión
                try {
                    const nombres = Object.keys(this.vars);
                    const valores = Object.values(this.vars);

                    const resultado = new Function(...nombres, `return ${expr};`)(...valores);
                    alert(resultado);
                } catch {
                    // Si es un texto entre comillas
                    alert(expr.replace(/^["']|["']$/g, ""));
                }
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
