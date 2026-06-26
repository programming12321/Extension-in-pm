(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const renderer = vm.renderer;

  class CanvasLang {

    getInfo() {
      return {
        id: "canvaslang",
        name: "CanvasLang",

        blocks: [
          {
            opcode: "drawRect",
            blockType: Scratch.BlockType.COMMAND,
            text: "draw rect x [X] y [Y] w [W] h [H]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          }
        ]
      };
    }

    drawRect(args) {
      const drawable = renderer._allDrawables[0];

      const ctx = renderer._canvas.getContext("2d");

      // convertir coordenadas Scratch → canvas
      const x = args.X + 240;
      const y = 180 - args.Y;

      ctx.fillStyle = "red";
      ctx.fillRect(x, y, args.W, args.H);
    }

  }

  Scratch.extensions.register(new CanvasLang());

})(Scratch);