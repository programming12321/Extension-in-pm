(function (Scratch) {
    'use strict';

    class JavaExtension {

        getInfo() {
            return {
                id: 'java',
                name: 'Java',
                color1: '#f89820',
                color2: '#d87c00',

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
                    }
                ]
            };
        }

        run(args) {
            const lines = args.CODE.split("\n");

            for (let line of lines) {
                line = line.trim();

                const match = line.match(/^System\.out\.println\((.*)\);$/);

                if (match) {
                    try {
                        console.log(eval(match[1]));
                    } catch {
                        console.log(match[1]);
                    }
                }
            }
        }
    }

    Scratch.extensions.register(new JavaExtension());

})(Scratch);
