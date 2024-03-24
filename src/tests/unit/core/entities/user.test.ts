import {generateUuid} from "../../../../core/common/generateUuid";
import {Id} from "../../../../core/valueObjects/id";
import {Email} from "../../../../core/valueObjects/email";
import {Password} from "../../../../core/valueObjects/password";
import {User} from "../../../../core/entities/user";

describe('The User', () => {
    it('should be able to update its own password', () => {
        const initialPassword = Password.create('strong_paSs123.');
        const user = createUser(initialPassword);
        const newPassword = Password.create('Other_strong_pass123');
        user.changePassword(newPassword);
        expect(user.isMatchingPassword(newPassword)).toBe(true);
    });

    it('should not allow to update password using old one', () => {
        const initialPassword = Password.create('strong_paSs123.');
        const user = createUser(initialPassword);
        expect(() => {
            user.changePassword(initialPassword);
        }).toThrow(User.CANNOT_REUSE_SAME_PASS_ERROR_MSG)
    });
})

function createUser(password: Password) {
    const id = Id.createFrom(generateUuid());
    const email = Email.create('test@test.com');
    return new User(id, email, password);
}
