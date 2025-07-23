export const getUtcTimestamp = (date: Date, time: Date) => {
    const d = new Date(date);
    d.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return Math.floor(d.getTime() / 1000);
};