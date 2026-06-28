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

                try {
                    alert(eval(m[1]));
                } catch {
                    alert(m[1]);
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
