const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const {grapghqlExpress, graphiqlExpress} = require('graphql-server-express');
//const {makeExectuableSchema} = require('graphql-tools');

const { merge } = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');

const Reserva = require('./models/reservas');
const Lugar = require('./models/lugares');
const Viaje = require('./models/viajes');

mongoose.connect('mongodb+srv://hansbarnert:1234@uai.prktf.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

const typeDefs = gql`

type Reserva{
    id: ID!
    nombre: String!
    rut: String!
    tour: String!
    telefono: String!
    fecha: String!
 }

 type Viaje{
    id: ID!
    nombre: String!
    descripcion: String!
    foto: String!
 }

 type Lugar{
    id: ID!
    nombre: String!
    descripcion: String!
    foto: String!
 }

 type Alert{
    message: String
 }

 input ReservaInput{
    nombre: String!
    rut: String!
    tour: String!
    telefono: String!
    fecha: String!
 }
 input Viajeinput{
    nombre: String!
    descripcion: String!
    foto: String!
 }

 input Lugarinput{
    nombre: String!
    descripcion: String!
    foto: String!
 }

 type Query{
   getReservas: [Reserva] 
   getReserva(id: ID!): Reserva
   getLugares: [Viaje]
   getViajes: [Lugar]
 }

 type Mutation{
    addReserva(input: ReservaInput): Reserva
    updateReserva(id: ID!, input: ReservaInput): Reserva
    deleteReserva(id: ID!): Alert
    addLugar(input: Lugarinput): Lugar
    addViaje(input: Viajeinput): Viaje
 }
`;

const resolvers = {
    Query: {
        async getReservas(obj) {
            const reservas = await Reserva.find();
            return reservas;
        },
        async getReserva(obj, { id }) {
            const reservas = await Reserva.findById(id);
            return reservas;
        },
        async getLugares(obj) {
            const lugares = await Lugar.find();
            return lugares;
        },
        async getViajes(obj) {
            const viajes = await Viaje.find();
            return viajes;
        }
    },
    Mutation: {
        async addReserva(obj, { input }) {
            const reserva = new Reserva(input);
            await reserva.save();
            return reserva;
        },

        async updateReserva(obj, { id, input }) {
            const reserva = await Reserva.findByIdAndUpdate(id, input);
            return reserva;
        },

        async deleteReserva(obj, { id }) {
            await reserva, deleteOne({ _id: id });
            return {
                message: "Reserva eliminada"
            }
        },
        async addLugar(obj, { input }) {
            const lugar = new Lugar(input);
            await lugar.save();
            return lugar;
        },
        async addViaje(obj, { input }) {
            const viaje = new Viaje(input);
            await viaje.save();
            return viaje;
        }
    }
}

let apolloServer = null;
const corsOptions = {
    origin: "http://localhost:8090",
    credentials: false
}


// Proceso para conectar apollo con exrpess
async function startServer() {
    const apolloServer = new ApolloServer({ typeDefs, resolvers, corsOptions })
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false })
}

startServer();

const app = express(); // levantar la web
app.use(cors()); // ejecutar las "validaciones de seguridad"
app.listen(8090, function () {
    console.log("Servidor iniciado")
});


