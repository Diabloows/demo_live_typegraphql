import "reflect-metadata";
import { ApolloServer } from "apollo-server-express"
import * as Express from "express";
import { buildSchema } from "type-graphql";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import UserResolver from "./resolvers"

dotenv.config()

mongoose.connect(`${process.env.MONGO_URI}`, {
    autoIndex: true
})
    .then(() => console.log("Connecté à la base de données"))
    .catch((err: any) => console.log(err))

const main = async () => {
    const schema = await buildSchema({
        resolvers: [UserResolver]
    })

    const apolloServer = await new ApolloServer({ schema })
    apolloServer.start().then(() => {
        const app = Express()

        apolloServer.applyMiddleware({ app })

        app.listen(4000, () => {
            console.log(`Serveur lancé sur http://localhost:4000${apolloServer.graphqlPath}`)
        })

    })
}

main()


