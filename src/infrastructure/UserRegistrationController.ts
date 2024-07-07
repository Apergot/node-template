import {UserRegistrationService} from "../application/UserRegistrationService";
import {HttpRequest, HttpResponse} from "./http";
import {UserRegistrationRequest, UserRegistrationResponse} from "../application/dtos";
import {ValidationError} from "../core/common/validationError";

export class UserRegistrationController {
    public NOT_VALID_EMAIL_OR_PASSWORD_PROVIDED = 'Email and password are required'

    constructor(private readonly service: UserRegistrationService) {
    }

    public async register(
        request: HttpRequest<UserRegistrationRequest>,
        response: HttpResponse<UserRegistrationResponse>
    ) {
        try {
            this.ensureThatEmailAndPasswordAreProvided(request);
            await this.handleRegistration(request, response);
        } catch (err) {
            this.handleErrors(err, response);
        }
    }

    private async handleRegistration(
        request: HttpRequest<UserRegistrationRequest>,
        response: HttpResponse<UserRegistrationResponse>
    ) {
        const registrationResponse = await this.service.register(request.body);
        response.status(201).json(registrationResponse);
    }

    private handleErrors(err: ValidationError, response: HttpResponse<UserRegistrationResponse>) {
        if (err instanceof ValidationError) {
            response.status(400).json({message: err.message});
        } else {
            response.status(500).json({message: 'Internal Server Error'});
        }
    }

    private ensureThatEmailAndPasswordAreProvided(request: HttpRequest<UserRegistrationRequest>) {
        if (!request.body.email || !request.body.password) {
            throw new ValidationError(this.NOT_VALID_EMAIL_OR_PASSWORD_PROVIDED);
        }
    }
}
