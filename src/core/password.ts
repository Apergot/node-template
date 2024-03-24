import {ValidationError} from "./validationError";
import {hash} from "./common/hash";

export class Password {

    public static TOO_SHORT_ERROR_MSG = 'is too short';
    public static NO_SPECIAL_CHARACTER_ERROR_MSG = 'does not contain any special character';
    public static MISSING_UPPERCASE_LETTER_ERROR_MSG = 'does not contain any uppercase letter';
    public static MISSING_NUMBER_ERROR_MSG = 'does not contain at least one number';

    private constructor(private value: string) {}

    static create(value: string) {
        this.ensureIsStrongEnough(value)
        return new Password(this.hashPlainText(value));
    }

    private static hashPlainText(value: string) {
        return hash(value);
    }

    private static ensureIsStrongEnough(value: string) {
        const validationErrors: string[] = [];

        if (this.containsAtLeastEightCharacters(value)) {
            validationErrors.push(Password.TOO_SHORT_ERROR_MSG);
        }

        if (this.containsAtLeastOneSpecialCharacter(value)) {
            validationErrors.push(Password.NO_SPECIAL_CHARACTER_ERROR_MSG);
        }

        if (this.containsAtLeastOneUppercaseLetter(value)) {
            validationErrors.push(Password.MISSING_UPPERCASE_LETTER_ERROR_MSG);
        }

        if (this.containsAtLeastOneNumber(value)) {
            validationErrors.push(Password.MISSING_NUMBER_ERROR_MSG);
        }

        if (validationErrors.length > 0) {
            throw new ValidationError(validationErrors.join(', '))
        }
    }

    private static containsAtLeastOneUppercaseLetter(value: string) {
        const regex = /\p{Lu}/u;
        return !regex.test(value);
    }

    private static containsAtLeastOneSpecialCharacter(value: string) {
        const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return !regex.test(value);
    }

    private static containsAtLeastEightCharacters(value: string) {
        return value.length < 8;
    }

    private static containsAtLeastOneNumber(value: string) {
        const regex = /\d/;
        return !regex.test(value);
    }

    toString() {
        return this.value;
    }

    equals(password: Password) {
        return this.value === password.value;
    }
}