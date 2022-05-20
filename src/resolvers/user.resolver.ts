import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { User,UserCreateInput } from "../models/Users"
import UserService from "./user.service";

@Resolver(_of => User)
export default class UserResolver {
    private __userService: UserService

    constructor() {
        this.__userService = new UserService()
    }


    @Query(() => [User], { nullable: true, description: "Récupération des Users !" })
    async getAll() {
        return this.__userService.getAll()
    }

    @Mutation(_returns => User)
    async createUser(@Arg('data') data: UserCreateInput) {
        return this.__userService.create(data)
    }
}