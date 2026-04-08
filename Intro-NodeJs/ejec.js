import os from 'node:os';

const misCpus = os.cpus();  

console.log(misCpus);
console.log(typeof misCpus);

const totalMemoria = os.totalmem();
console.log(totalMemoria);

const memoriaLibre = os.freemem();
console.log(totalMemoria - memoriaLibre);