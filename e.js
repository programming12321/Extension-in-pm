(function (Scratch) {
    'use strict';

    class BrainfuckExtension {
        constructor() {
            this.reset();
        }

        reset() {
            this.tape = new Uint8Array(30000);
            this.ptr = 0;
        }

        getInfo() {
            return {
                id: 'brainfuck',
                name: 'Brainfuck',
                blocks: [
                    {
                        opcode: 'run',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'run bf [CODE]',
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '++>+++++++++<[->+<]>[-]++++++++++ +++++++++++ +.++++++++++ +++++++++++ +.'
                            }
                        }
                    },
                    {
                        opcode: 'reset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset bf'
                    }
                ]
            };
        }

        reset() {
            this.tape = new Uint8Array(30000);
            this.ptr = 0;
        }

        run(args) {
            const code = args.CODE;
            let ip = 0;
            let output = '';
            let input = '';
            let inputPtr = 0;

            const loopMap = new Map();
            const stack = [];

            // Precompute loops
            for (let i = 0; i < code.length; i++) {
                if (code[i] === '[') stack.push(i);
                else if (code[i] === ']') {
                    const start = stack.pop();
                    loopMap.set(start, i);
                    loopMap.set(i, start);
                }
            }

            while (ip < code.length) {
                const cmd = code[ip];

                switch (cmd) {
                    case '>': this.ptr++; break;
                    case '<': this.ptr--; break;
                    case '+': this.tape[this.ptr] = (this.tape[this.ptr] + 1) & 255; break;
                    case '-': this.tape[this.ptr] = (this.tape[this.ptr] - 1) & 255; break;
                    case '.': output += String.fromCharCode(this.tape[this.ptr]); break;
                    case ',': this.tape[this.ptr] = inputPtr < input.length ? input.charCodeAt(inputPtr++) : 0; break;

                    case '[':
                        if (this.tape[this.ptr] === 0) ip = loopMap.get(ip);
                        break;

                    case ']':
                        if (this.tape[this.ptr] !== 0) ip = loopMap.get(ip);
                        break;
                }

                ip++;
            }

            return output;
        }
    }

    Scratch.extensions.register(new BrainfuckExtension());
})(Scratch);
