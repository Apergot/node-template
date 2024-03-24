import {ValidationError} from "../common/validationError";
import {generateUuid} from "../common/generateUuid";

export class Id {

    public static NON_VALID_ID_ERROR_MSG = 'Cannot create an Id value object using non valid id';

    private constructor(private value: string) {
    }

    static generateUniqueIdentifier() {
        return new Id(generateUuid());
    }

    static createFrom(validId: string) {
        this.ensureIsValidId(validId);
        return new Id(validId)
    }

    private static ensureIsValidId(validId: string) {
        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        if (!regex.test(validId)) throw new ValidationError(Id.NON_VALID_ID_ERROR_MSG);
    }

    toString() {
        return this.value;
    }

    equals(id: Id) {
        return this.value === id.value;
    }
}