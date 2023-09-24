export class InputError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "InputError";
        Object.setPrototypeOf(this, InputError.prototype);  // https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
    }
}

export class NotFoundError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "NotFoundError";
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class AuthenticationError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "AuthenticationError";
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}

export class AlreadyExistError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "AlreadyExistError";
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}

export class RangeError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "RangeError";
        Object.setPrototypeOf(this, RangeError.prototype);
    }
}

export class InvalidOperationError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "InvalidOperationError";
        Object.setPrototypeOf(this, InvalidOperationError.prototype);
    }
}

export class ExpiredError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "ExpiredError";
        Object.setPrototypeOf(this, ExpiredError.prototype);
    }
}