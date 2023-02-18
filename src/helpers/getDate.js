
export default function getDate(date) {
    var newDate = new Date(date);
    return newDate.toISOString().slice(0,10);
}
