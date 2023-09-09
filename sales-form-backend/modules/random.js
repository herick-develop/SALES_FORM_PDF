//var num = 1;
var strings = [];
const geraStringAleatoria = () =>{

    let stringAleatoria;

    do {

        stringAleatoria = Date.now() + Math.random().toString().replace('.', '');

        if(strings.includes(stringAleatoria)) continue

        strings.push(stringAleatoria);

        break;

    } while (true)

    return stringAleatoria;
}

const clearStrings = () => {

    strings = [];
}

module.exports = { geraStringAleatoria , clearStrings };