export class Schedule {
    constructor(
        public day: string,
        public open: boolean,
        public openHour: string,
        public closeHour: string
    ) { }
}