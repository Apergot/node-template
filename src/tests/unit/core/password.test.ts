import {ValidationError} from "../../../core/validationError";

class Password {

    public static TOO_SHORT_ERROR_MSG = 'Password is too short';
    public static NO_SPECIAL_CHARACTER_ERROR_MSG = 'Password does not contain any special character';
    public static MISSING_UPPERCASE_LETTER_ERROR_MSG = 'Password does not contain any uppercase letter';
    public static MISSING_NUMBER_ERROR_MSG = 'Password does not contain at least one number';

    private constructor(private value: string) {}

    static create(value: string) {
        this.ensureIsStrongEnough(value)
        return new Password(value);
    }

    private static ensureIsStrongEnough(value: string) {
        this.containsAtLeastEightCharacters(value);
        this.containsAtLeastOneSpecialCharacter(value);
        this.containsAtLeastOneUppercaseLetter(value);
        this.containsAtLeastOneNumber(value);
    }

    private static containsAtLeastOneUppercaseLetter(value: string) {
        const regex = /\p{Lu}/u;
        if (!regex.test(value)) throw new ValidationError(Password.MISSING_UPPERCASE_LETTER_ERROR_MSG);
    }

    private static containsAtLeastOneSpecialCharacter(value: string) {
        const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!regex.test(value)) throw new ValidationError(Password.NO_SPECIAL_CHARACTER_ERROR_MSG);
    }

    private static containsAtLeastEightCharacters(value: string) {
        if (value.length < 8) throw new ValidationError(Password.TOO_SHORT_ERROR_MSG);
    }

    private static containsAtLeastOneNumber(value: string) {
        const regex = /\d/;
        if (!regex.test(value)) throw new ValidationError(Password.MISSING_NUMBER_ERROR_MSG);
    }
}

describe('The Password', () => {
    it('should create a password whenever matched strong password criteria', () => {
        expect(Password.create('strongPassword_123.')).toBeInstanceOf(Password);
    });

    it('length should be greater than eight', () => {
        expect(() => {
            Password.create('1Aa.');
        }).toThrow(Password.TOO_SHORT_ERROR_MSG);
    });

    it('should contains at least one special character', () => {
        expect(() => {
            Password.create('1bcdeditT2');
        }).toThrow(Password.NO_SPECIAL_CHARACTER_ERROR_MSG);
    });

    it('should contains at least one uppercase letter', () => {
        expect(() => {
            Password.create('1.bcdedit')
        }).toThrow(Password.MISSING_UPPERCASE_LETTER_ERROR_MSG)
    });

    it('should contains at least one number', () => {
        expect(() => {
            Password.create('A.bcdedit')
        }).toThrow(Password.MISSING_NUMBER_ERROR_MSG)
    });
})