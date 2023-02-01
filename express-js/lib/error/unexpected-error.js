export class UnexpectedError extends Error {
    name;
    message;
    constructor(message = 'I have got an undexpected error') {
        super(message);
        this.name = "Unexpected Error";
        this.message = message;
    }
}