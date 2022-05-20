import { GraphQLScalarType, Kind } from "graphql";

import { ObjectId } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
    name: "ObjectId",
    description: "Type scalair pour un ObjectId de Mongo",
    parseValue(value: string) {
        return new ObjectId(value); // valeur des variables inputs du client 
    },
    serialize(value: ObjectId) {
        return value.toHexString(); //valeur renvoyée au client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new ObjectId(ast.value); // valeur depuis la requête client
        }
        return null;
    },
});