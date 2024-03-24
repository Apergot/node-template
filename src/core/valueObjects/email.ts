import {ValidationError} from "../common/validationError";

export class Email {

    public static INVALID_FORMAT_ERROR_MSG = 'Invalid email format';

    private constructor(private address: string) {}

    static create(address: string) {
        this.isValidAddress(address);
        return new Email(address);
    }

    private static isValidAddress(address: string) {
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!regex.test(address)) throw new ValidationError(Email.INVALID_FORMAT_ERROR_MSG)
    }

    toString() {
        return this.address;
    }

    equals(email: Email) {
        return email.address === this.address
    }
}