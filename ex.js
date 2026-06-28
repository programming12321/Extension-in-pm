(function (Scratch) {
    'use strict';

    class JavaExtension {

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
    }

    Scratch.extensions.register(new JavaExtension());

})(Scratch);
