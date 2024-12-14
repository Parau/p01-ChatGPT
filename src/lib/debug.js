//Liga ou desliga a apresentacao das mensagem no console
const debugLigado = true;

const escopo = ['RESULT'];


export function consoleLog(...params) {
  if (debugLigado) console.log(...params);
}

export function consoleLogEscopo(e, ...params) {
  if (debugLigado) {
    if (escopo.includes(e))
      console.log(...params);
  }
}