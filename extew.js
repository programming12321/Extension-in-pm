(function(Scratch) {
  'use strict';

  class MiExtension {

    getInfo() {
      return {
        id: 'miExtensionAlert',
        name: 'Alert Demo',
        color1: '#ffcc00',
        blocks: [
          {
            opcode: 'mostrarAlert',
            blockType: Scratch.BlockType.COMMAND,
            text: 'mostrar alerta [MENSAJE]',
            arguments: {
              MENSAJE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hola!'
              }
            }
          }
        ]
      };
    }

    mostrarAlert(args) {
      alert(args.MENSAJE);
    }

  }

  Scratch.extensions.register(new MiExtension());

})(Scratch);
