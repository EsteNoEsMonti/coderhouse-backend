import fs from 'fs'

console.log(fs.readFileSync('../timers/timers.js', 'utf-8')); // lee el contenido de un archivo - ruta, con que econding (codificacion) fue escrito el archivo