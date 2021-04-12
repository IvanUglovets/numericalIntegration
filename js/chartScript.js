const btnChart = document.getElementById('btn_chart');
const buildChart = () =>{
    const  a = Number(left.value.trim());
    const  b = Number(right.value.trim());
    const  N = 20;
    let h = (b-a)/N;

    takeAwayMath();

    function calculatePointsX(){
        let x = [];
        for (let i = 0; i <= N; i++){
            x[i] = a+i*h;   
        }
        return x; 
    }

    function F(x){
        let func = document.getElementById('func').value;
        let expr = eval(func);
        return expr;
    }

    function calculationPointsY(pointX){
        let y = [];
        for (let i = 0; i <= N; i++){
            y[i] = F(pointX[i]);
        }
        return y;
    }
    
    function createChart(){
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: calculatePointsX(),
            datasets: [{
                label: `График функции: ${document.getElementById('func').value} при N = 20`,
                data: calculationPointsY(calculatePointsX()),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    }
    createChart();
}

btnChart.addEventListener('click',buildChart);
