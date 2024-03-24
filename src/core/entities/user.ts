import {Id} from "../valueObjects/id";
import {Email} from "../valueObjects/email";
import {Password} from "../valueObjects/password";
import {ValidationError} from "../common/validationError";

export class User {

    public static CANNOT_REUSE_SAME_PASS_ERROR_MSG = 'New password must be different';

    constructor(
        private readonly id: Id,
        private readonly email: Email,
        private password: Password
    ) {
    }

    changePassword(newPassword: Password) {
        if (this.isMatchingPassword(newPassword)) throw new ValidationError(User.CANNOT_REUSE_SAME_PASS_ERROR_MSG);
        this.password = newPassword;
    }

    isMatchingPassword(password: Password) {
        return this.password.equals(password);
    }
}