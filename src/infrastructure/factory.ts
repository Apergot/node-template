import {UserRegistrationController} from "./UserRegistrationController";
import {UserRegistrationService} from "../application/UserRegistrationService";
import {InMemoryUserRepository, UserRepository} from "../core/repositories/userRepository";
import {createRouter, createServer} from "./server";

export class Factory {
    private static userRepository: UserRepository;

    private static getUserRepository() {
        if (this.userRepository == null) {
            this.userRepository = new InMemoryUserRepository();
        }

        return this.userRepository;
    }

    private static createUserRegistrationController() {
        const service = new UserRegistrationService(this.getUserRepository());
        return new UserRegistrationController(service);
    }

    static createServer() {
        return createServer(
            createRouter(this.createUserRegistrationController())
        );
    }
}
