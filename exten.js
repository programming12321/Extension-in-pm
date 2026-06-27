(function (Scratch) {
    'use strict';

    class MiExtension {

        getInfo() {
            return {
                id: 'miextension',
                name: 'Mi Extension',

                // 🎨 colores del bloque
                color1: '#4C97FF',   // color principal
                color2: '#3373CC',   // borde/sombra
                color3: '#2A65B0',   // opcional (variación)

                blocks: [
                    {
                        opcode: 'print_num',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'print number [NAME]',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 123,
                            }
                        }
                    },
                    {
                        opcode: 'print_str',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'print str [STR]',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello',
                            }
                        }
                    }
                ]
            };
        }

        print_num(args) {
            return Number(args.NAME);
        }

        print_str(args) {
            return String(args.STR);
        }
    }

    Scratch.extensions.register(new MiExtension());

})(Scratch);
