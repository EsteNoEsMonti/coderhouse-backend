import { MongoClient } from 'mongodb'

const cnxStr = "mongodb+srv://coder39710:coder39710@cluster0.o0eqf.mongodb.net/coderhouse?retryWrites=true&w=majority"

const client = new MongoClient(cnxStr)

await client.connect()

const personasDb = client.db().collection("personas")

// const resultadoInsert = await personasDb.insertOne({
//     nombre: 'ezequiel',
//     rol: 'estudiante'
// })
// console.log(resultadoInsert)

const persona = await personasDb.findOne()

const personas = await personasDb.find().toArray()
console.log(personas)

await client.close()
