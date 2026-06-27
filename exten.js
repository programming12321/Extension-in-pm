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
                    }
                ]
            };
        }

        int(args) {
            return parseInt(args.VALUE, 10);
        }
    }

    Scratch.extensions.register(new MiExtension());

})(Scratch);
