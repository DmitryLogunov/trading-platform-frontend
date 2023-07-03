const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(13, 202, 240, 1)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
        ],
        fill: true,
    }, {
        label: 'My Second dataset',
        borderColor: 'rgba(25, 135, 84, 1)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: [
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
            random(50, 200),
        ],
    }, {
        label: 'My Third dataset',
        borderColor: 'rgba(220, 53, 69, 1)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        borderDash: [8, 5],
        data: [65, 65, 65, 65, 65, 65, 65],
    }],
};
