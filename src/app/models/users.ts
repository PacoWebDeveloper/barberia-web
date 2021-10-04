export class User {
    constructor(
        public _id: string,
        public user: string,
        public email: string,
        public password: string,
        public type: string
    ) { }
}