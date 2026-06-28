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
          },
          {
            opcode: 'ask',
            blockType: Scratch.BlockType.REPORTER,
            text: 'preguntar [MENSAJE]',
            arguments: {
              MENSAJE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Escribe algo:'
              }
            }
          }
        ]
      };
    }

    mostrarAlert(args) {
      alert(args.MENSAJE);
    }

    ask(args) {
      return new Promise(resolve => {
        // crear fondo
        const overlay = document.createElement('div');
        overlay.style = `
          position:fixed;
          top:0;left:0;
          width:100%;height:100%;
          background:rgba(0,0,0,0.5);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:999999;
        `;

        // caja tipo alerta
        const box = document.createElement('div');
        box.style = `
          background:white;
          padding:20px;
          border-radius:12px;
          min-width:250px;
          font-family:Arial;
          text-align:center;
        `;

        const text = document.createElement('div');
        text.innerText = args.MENSAJE;
        text.style.marginBottom = '10px';

        const input = document.createElement('input');
        input.style.width = '90%';

        const btn = document.createElement('button');
        btn.innerText = 'OK';
        btn.style.marginTop = '10px';

        btn.onclick = () => {
          const value = input.value;
          document.body.removeChild(overlay);
          resolve(value);
        };

        input.onkeydown = (e) => {
          if (e.key === 'Enter') btn.click();
        };

        box.appendChild(text);
        box.appendChild(input);
        box.appendChild(btn);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        input.focus();
      });
    }

  }

  Scratch.extensions.register(new MiExtension());

})(Scratch);
