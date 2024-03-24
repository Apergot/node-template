import {Email} from "../../../../core/valueObjects/email";

describe('The Email', () => {
    it('creates an email for a given address in a correct format',  () => {
        const address = 'example@example.com';
        const email = Email.create(address);

        expect(email.toString()).toEqual('example@example.com');
    });

    it('does not allow addresses with wrong format', () => {
        expect(() => {
            Email.create('invalid')
        }).toThrow(Email.INVALID_FORMAT_ERROR_MSG);
    });

    it('considers two emails with same address are the same', () => {
        const email1 = Email.create('example@example.com');
        const email2 = Email.create('example@example.com');

        expect(email1.equals(email2)).toEqual(true);
    });

    it('considers two emails with different address are not the same', () => {
        const email1 = Email.create('example@example.com');
        const email2 = Email.create('example2@example.com');

        expect(email1.equals(email2)).toEqual(false);
    });
});
