const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const {grapghqlExpress, graphiqlExpress} = require('graphql-server-express');
//const {makeExectuableSchema} = require('graphql-tools');

const { merge } = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');

const Reserva = require('./models/reservas');

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

 type Alert {
    message: String
 }

 input ReservaInput {
    nombre: String!
    rut: String!
    tour: String!
    telefono: String!
    fecha: String!
 }

 type Query {
   getReservas: [Reserva] 
   getReserva(id: ID!): Reserva
 }

 type Mutation {
    addReserva(input: ReservaInput): Reserva
    updateReserva(id: ID!, input: ReservaInput): Reserva
    deleteReserva(id: ID!): Alert
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


