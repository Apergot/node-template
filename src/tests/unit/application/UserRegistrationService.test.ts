import {InMemoryUserRepository, UserRepository} from "../../../core/repositories/userRepository";
import {Email} from "../../../core/valueObjects/email";
import {UserRegistrationRequest} from "../../../application/dtos";
import {UserRegistrationService} from "../../../application/UserRegistrationService";

describe('The User Registration Service', () => {

    let userRepo: UserRepository;
    let userRegistrationService: UserRegistrationService;

    beforeEach(() => {
        userRepo = new InMemoryUserRepository();
        userRegistrationService = new UserRegistrationService(userRepo);
    })

    it('should register a new user successfully when given registration request is valid', async () => {
        await userRegistrationService.register(createRegistrationRequest());

        const expectedEmail = Email.create(createRegistrationRequest().email);
        const foundUser = await userRepo.findByEmail(expectedEmail);

        expect(foundUser.isMatchingEmail(expectedEmail)).toBe(true);
    });

    it('should reject user registration when one with same email address exists', async () => {
        await userRegistrationService.register(createRegistrationRequest());

        await expect(userRegistrationService.register(createRegistrationRequest()))
            .rejects
            .toThrow(userRegistrationService.USER_ALREADY_EXISTS_WITH_EMAIL)
    });
});

function createRegistrationRequest() {
    const registrationRequest: UserRegistrationRequest = {
        email: 'test@test.es',
        password: 'TestPass.1234'
    };

    return registrationRequest;
}
