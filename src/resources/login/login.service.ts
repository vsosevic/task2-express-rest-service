import { getManager } from "typeorm";
import bcrypt from 'bcrypt';
import { User } from "../users/user.model";

async function authenticateUser(user: Partial<User>) {
    const { login, password } = user;
    const userRepository = getManager().getRepository(User);
    const foundUser = await userRepository.findOne({login});
    if (foundUser && await bcrypt.compare(String(password), String(foundUser?.password))) {
        return foundUser;
    }
    return false;
}

export { authenticateUser };
