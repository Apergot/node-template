import {generateUuid} from "./common/uuid";

import {Id} from "../../../core/id";

function expectIdIsUuid(id: Id) {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    expect(id.toString()).toMatch(regex);
}

describe('The Id', () => {
    it('should generate a valid identifier', () => {
        const id = Id.generateUniqueIdentifier();
        expectIdIsUuid(id);
    });

    it('creates an ID from a valid identifier', () => {
        const validId = generateUuid();
        const id = Id.createFrom(validId);

        expect(id.toString()).toBe(validId);
    });

    it('does not allow to create an ID from a non valid identifier', () => {
        const nonValidId = '1234-1234';

        expect(() => {
            Id.createFrom(nonValidId)
        }).toThrow(Id.NON_VALID_ID_ERROR_MSG)
    });

    it('identifies same two ids as equals', () => {
        const uuid = generateUuid();
        const idA = Id.createFrom(uuid);
        const idB = Id.createFrom(uuid);

        expect(idA.equals(idB)).toBe(true);
    });

    it('identifies between two different ids', () => {
        const idA = Id.createFrom(generateUuid());
        const idB = Id.createFrom(generateUuid());

        expect(idA.equals(idB)).toBe(false);
    });
})