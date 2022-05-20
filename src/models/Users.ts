import { prop as Property, getModelForClass } from "@typegoose/typegoose"
import { ObjectType, Field,ID, InputType} from "type-graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../scalars/objectId.scalar"
import { GraphQLTimestamp } from "type-graphql";

@ObjectType()
@InputType("ProjectInput")
export class Project {
    @Field(_type => ObjectIdScalar, { defaultValue: new ObjectId() })
    readonly _id?: ObjectId;

    @Field(_type => String)
    name!: string

    @Field(_type => String)
    status!: string

    @Field(_type => String)
    leadproject!: string

    @Field(_type => String)
    business!: string

    @Field(_type => GraphQLTimestamp, { defaultValue: new Date() })
    dateend!: Date;

}


@ObjectType()
export class User {
    @Field(_type => ID)
    readonly _id: string;

    @Field(_type => String)
    @Property({ unique: true, required: [true, "Le nom est requis"] })
    name: string

    @Field(_type => String)
    @Property({ required: [true, "La ville est requise"] })
    lastname: string

    @Field(_type => [Project], { nullable: true })
    @Property({ required: false })
    projects?: Project[]

    @Field(_type => String)
    @Property({ required: false })
    business: string

    @Field(_type => String)
    @Property({ unique: true, required: [true, "Le mail est requis"] })
    mail: string

    @Field(_type => String)
    @Property({ unique: true, required: [true, "Le mot de passe est requis"] })
    password: string

    @Field(_type => String)
    @Property({required: [true, "Le role est requis"] })
    role: string
}


@InputType()
export class UserCreateInput {
    @Field()
    name: String

    @Field()
    lastname: String

    @Field(_type => [Project], {nullable: true})
    projects?: Project[]

    @Field()
    business: String

    @Field()
    mail: String

    @Field()
    password: String

    @Field()
    role: String

}

export const UserModel = getModelForClass(User, { schemaOptions: { versionKey: false } })
