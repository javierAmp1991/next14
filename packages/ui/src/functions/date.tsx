import moment from "moment";

export function getUpperFirst(name: string) {
    return name[0]!.toUpperCase() + name.substring(1);
}

export function getNameDay(date: Date) {
    let name: string = date.toLocaleString("es-US", {weekday: "long"})
    return getUpperFirst(name)
}

export function getNameMonth(date: Date, short?: boolean) {
    const large = short? "short" : "long"
    let name: string = date.toLocaleString("es-US", {month: large})
    return getUpperFirst(name)
}

export function getNumberDate(date: Date) {
    return date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
}

export function convertHours(hour: string) {
    const newHour = moment(hour, 'HH:mm').format('HH:mm');
    return newHour;
}

export function convertDateFormat(date: Date, format: string){
    return moment(date).format(format);
}

export function convertToDate(d: Date){
    return moment(d).toDate()
}

export function isSameDate(d: Date, fD: string, startOf: 'day' | 'month' | 'year'){
    return moment(d).isSame(moment(fD), startOf )
}