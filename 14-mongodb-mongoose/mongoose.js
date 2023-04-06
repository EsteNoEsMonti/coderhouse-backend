import mongoose, { Schema } from 'mongoose';

await mongoose.connect('mongodb://localhost/coderhouse')

// driver nativo a traves de mongoose

// const estudiantesDb = mongoose.connection.db.collection('estudiantes')

// await estudiantesDb.insertOne({
//     nombre: 'pepito',
//     apellido: 'el pistolero'
// })

// await estudiantesDb.insertOne({
//     nombre: 'juancho',
//     email: 'juancho@gmail.com'
// })

// const estudiantes = await estudiantesDb.find().toArray()
// console.log(estudiantes)

const estudianteSchema = new Schema({
    dni: { type: String, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return v.includes('@')
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    rol: { type: String, enum: ['profe', 'estudiante'], required: true },
    edad: { type: Number, min: 0 }
}, { versionKey: false })

const estudiantesDb = mongoose.model('estudiantes', estudianteSchema)

// const estudiantes = await estudiantesDb.deleteMany({})

// await estudiantesDb.create({ // insertOne en version mongoose
//     nombre: 'pepito',
//     apellido: 'el pistolero',
//     rol: 'estudiante',
//     edad: 35
// })

const estudiante = await estudiantesDb.findOne({ edad: { $gt: 5 } })//.lean() // 'lean()' le saca los metodos al resultado!

if (estudiante) {
    estudiante.nombre = 'candela'
    console.log(estudiante)
    // await estudiantesDb.updateOne({ _id: estudiante._id }, estudiante)
    await estudiante.save() // esto es lo mismo que lo de arriba
    const estudianteSinMetodos = JSON.parse(JSON.stringify(estudiante)) // si necesito sacarle los metodos, pq no usé lean()
}

const estudiantes = await estudiantesDb.find()
console.log(estudiantes)

// nunca exporto documentos de mongoose! siempre tengo que devolver objetos sin metodos!
// export async function buscarEstudiantes() {
//     let personas = await estudiantesDb.find()
//                                              .lean() // o le meto lean()
// o le meto el truquito de JSON.parse(JSON.stringify(xxx))
//     // personas = JSON.parse(JSON.stringify(personas))
//     return personas
// }

await mongoose.connection.close()