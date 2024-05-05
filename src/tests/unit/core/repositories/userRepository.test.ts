import {Id} from "../../../../core/valueObjects/id";
import {generateUuid} from "../../../../core/common/generateUuid";
import {Email} from "../../../../core/valueObjects/email";
import {User} from "../../../../core/entities/user";
import {Password} from "../../../../core/valueObjects/password";
import {InMemoryUserRepository} from "../../../../core/repositories/userRepository";

describe('The In Memory User Repository', () => {

    let repo: InMemoryUserRepository;

    beforeEach(() => {
        repo = new InMemoryUserRepository();
    })

    it('should be able to find an user by id', async () => {
        const id = Id.createFrom(generateUuid());
        const user = createUserById(id);
        await repo.save(user);

        const foundUser = await repo.findById(id);
        expect(foundUser).toEqual(user);
    });

    it('should not be able to find a non-existing user by id', async () => {
        const id = Id.createFrom(generateUuid());

        const foundUser = await repo.findById(id);
        expect(foundUser).toBeUndefined();
    });

    it('should not be able to insert two users with the same email', () => {
        const email = Email.create('test@test.com');
        const aUserId = Id.createFrom(generateUuid());
        const anotherUserId = Id.createFrom(generateUuid());
        const aUser = createUserByEmail(email);
        const anotherUser = createUserByEmail(email);
    });

    it('should be able to find an user by email', async () => {
        const email = Email.create('test@test.com');
        const user = createUserByEmail(email);
        await repo.save(user);

        const foundUser = await repo.findByEmail(email);
        expect(foundUser).toEqual(user);
    });

    it('should not be able to find a non-existing user by email', async () => {
        const email = Email.create('test@test.es');

        const foundUser = await repo.findByEmail(email);
        expect(foundUser).toBeUndefined();
    });

    it('should find all users', async () => {
        const aUser = createUserByEmail(Email.create('test1@test.com'));
        const anotherUser = createUserByEmail(Email.create('test2@test.com'));
        await repo.save(aUser);
        await repo.save(anotherUser);

        const users = await repo.findAll();
        expect(users).toHaveLength(2);
        expect(users).toEqual([aUser, anotherUser]);
    });

    it('should not find users when repo is empty', async () => {
        const users = await repo.findAll();
        expect(users).toHaveLength(0);
        expect(users).toEqual([]);
    });

    it('should remove a user', async () => {
        const email = Email.create('test@test.es');
        const user = createUserByEmail(email);
        await repo.save(user);
        await repo.remove(user);

        const removedUser = await repo.findByEmail(email);

        expect(removedUser).toBeUndefined();
    });

    it('should update an existing user', async () => {
        const email = Email.create('test@test.es');
        const aUser = createUserByEmail(email);
        const sameUser = aUser;
        await repo.save(aUser);
        await repo.save(sameUser)

        const users = await repo.findAll();

        expect(users).toHaveLength(1);
        expect(users).toEqual([aUser])
    });

})

function createUserByEmail(email: Email) {
    const id = Id.createFrom(generateUuid());
    const password = Password.create('StrongPass.1234')
    return new User(id, email, password);
}

function createUserById(id: Id) {
    const email = Email.create('test@test.com')
    const password = Password.create('StrongPass.1324');
    return new User(id, email, password);
}