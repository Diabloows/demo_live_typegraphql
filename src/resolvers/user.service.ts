import { UserModel } from "../models/Users";

export default class UserService {
    getAll = () => {
        return UserModel.find()
    }
    create = (data: any) => {
        return UserModel.create(data)
    }
}