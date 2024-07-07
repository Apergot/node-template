import {UserRegistrationService} from "../../application/UserRegistrationService";
import {InMemoryUserRepository, UserRepository} from "../../core/repositories/userRepository";
import {UserRegistrationRequest, UserRegistrationResponse} from "../../application/dtos";
import {HttpRequest, HttpResponse} from "../../infrastructure/http";
import {UserRegistrationController} from "../../infrastructure/UserRegistrationController";

describe('The User Registration Controller', () => {
    let controller: UserRegistrationController;

    beforeEach(() => {
        const userRepo : UserRepository = new InMemoryUserRepository()
        const service = new UserRegistrationService(userRepo)
        controller = new UserRegistrationController(service)
    })

    it('should register a new user when email and password are valid', async () => {
        const email = 'test@test.com';
        const password = 'TestPass123_';
        const request = createRequestStub(email, password);
        const response = createResponseSpy();

        await controller.register(request, response)

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({
            id: expect.any(String),
            email
        });
    });

    it('should reject register when emails it not valid', async () => {
        const password = 'TestPass123_'
        const request = createRequestStub(undefined, password);
        const response = createResponseSpy();

        await controller.register(request, response)

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            message: controller.NOT_VALID_EMAIL_OR_PASSWORD_PROVIDED
        });
    });

    it('should reject register when password it not valid', async () => {
        const email = 'test@test.com';
        const request = createRequestStub(email, undefined);
        const response = createResponseSpy();

        await controller.register(request, response)

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            message: controller.NOT_VALID_EMAIL_OR_PASSWORD_PROVIDED
        });
    });
});

function createRequestStub(email: string, password: string) {
    return {
        body: {email, password}
    } as HttpRequest<UserRegistrationRequest>;
}

function createResponseSpy() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    } as HttpResponse<UserRegistrationResponse>;
}
