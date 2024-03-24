import {Password} from "../../../../core/valueObjects/password";

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

    it('should tell every validation error', () => {
        expect(() => {
            Password.create('abc')
        }).toThrow(
            `${Password.TOO_SHORT_ERROR_MSG}, ` +
            `${Password.NO_SPECIAL_CHARACTER_ERROR_MSG}, ` +
            `${Password.MISSING_UPPERCASE_LETTER_ERROR_MSG}, ` +
            `${Password.MISSING_NUMBER_ERROR_MSG}`
        );
    });

    it('ensures password is hashed', () => {
        const plainText = 'strongPassword_123.';
        const password = Password.create(plainText);
        const hashedPassword = password.toString();

        expect(hashedPassword).not.toBe(plainText);
        expect(hashedPassword.length).toBe(64);
        expectIsHashed(hashedPassword) ;
    });

    it('matches when some given passwords are the same', () => {
        const plainText = 'strongPassword_123.';
        const passwordA = Password.create(plainText);
        const passwordB = Password.create(plainText);

        expect(passwordA.equals(passwordB)).toBe(true);
    });

    it('unmatched when some given passwords are not the same', () => {
        const passwordA = Password.create('strongPassword_123.');
        const passwordB = Password.create('strongPassword_123.4');

        expect(passwordA.equals(passwordB)).toBe(false);
    });
})

function expectIsHashed(hashedPassword: string) {
    expect(/^[a-f-F0-9]{64}$/.test(hashedPassword)).toBe(true);
}