/**
 * Перевод секунд во время.
 * @param sec Время в секундах.
 * @example
 * req > 150
 * res > '02:30'
 */
const transferSecInTime = (sec: number): string => {
    const minutes: number = Math.floor(sec / 60);
    const seconds: number = sec - minutes * 60;

    const minutesStr: string = minutes + '';
    const secondsStr: string = seconds + '';

    const resalt: string = minutesStr.padStart(2, '0') + ':' + secondsStr.padStart(2, '0');

    return resalt;
}

export default transferSecInTime;
