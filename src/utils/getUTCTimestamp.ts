export const getUtcTimestamp = (date?: Date, time?: Date, isAlert?: boolean) => {
    if(date === undefined || time === undefined) return 0;
    const d = new Date(date);
    d.setHours(time.getHours(), time.getMinutes(), 0, 0);
    if (isAlert) {

        return Math.floor(d.getTime() / 1000);
    }
    return Math.floor((d.getTime() + (5.5 * 3600 * 1000)) / 1000);
};