export function formatISODatetime(datetime: string): string {
    const [date, fulltime] = datetime.split('T');
    const [time, _] = fulltime.split('.');
    return `${date} ${time}`;
}