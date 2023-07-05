export function formatISODatetime(datetime: string): string {
    if (!datetime || typeof datetime !== 'string') return '';

    let [date, fulltime] = datetime.split('T');

    if (!fulltime || typeof fulltime !== 'string') {
        [date, fulltime] = datetime.split(' ');

        if (!fulltime || typeof fulltime !== 'string')  return `${date} 00:00:00`;
    }

    const [time, _] = fulltime.split('.');
    return `${date} ${time}`;
}