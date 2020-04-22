class dateHelper {

    getWeek(inputDate) {
        var date = new Date(inputDate)
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    getMonthFromNumber(monthNumber) {
        switch (monthNumber) {
            case 0:
                return "januari"
            case 1:
                return "februari"
            case 2:
                return "maart"
            case 3:
                return "april"
            case 4:
                return "mei"
            case 5:
                return "juni"
            case 6:
                return "juli"
            case 7:
                return "augustus"
            case 8:
                return "september"
            case 9:
                return "oktober"
            case 10:
                return "november"
            case 11:
                return "december"
            default:
                return "error"
        }
    }
}

export default new dateHelper()