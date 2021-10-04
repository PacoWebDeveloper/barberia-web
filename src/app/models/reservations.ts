export class Reservation {
    constructor(
        public user_id: string,
        public date_reservation: string,
        public cut_day: number,
        public cut_month: number,
        public cut_year: number,
        public cut_hour: string
    ) { }
}