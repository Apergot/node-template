import {UserRepository} from "../core/repositories/userRepository";
import {UserRegistrationRequest, UserRegistrationResponse} from "./dtos";
import {Email} from "../core/valueObjects/email";
import {ValidationError} from "../core/common/validationError";
import {Id} from "../core/valueObjects/id";
import {Password} from "../core/valueObjects/password";
import {User} from "../core/entities/user";

export class UserRegistrationService {
    public USER_ALREADY_EXISTS_WITH_EMAIL = 'An user already exists with this email'

    constructor(private userRepo: UserRepository) {
    }

    async register(request: UserRegistrationRequest): Promise<UserRegistrationResponse> {
        await this.ensureThatUserDoesNotExist(request);
        const user = this.createUser(request);
        await this.userRepo.save(user);
        return user.toDto();
    }

    private async ensureThatUserDoesNotExist(request: UserRegistrationRequest) {
        const isUserFound = await this.userRepo.findByEmail(Email.create(request.email))
        if (isUserFound) throw new ValidationError(this.USER_ALREADY_EXISTS_WITH_EMAIL)
    }

    private createUser(request: UserRegistrationRequest) {
        const id = Id.generateUniqueIdentifier();
        const email = Email.create(request.email);
        const password = Password.create(request.password);
        return new User(id, email, password);
    }
}
