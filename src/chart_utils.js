class ChartUtils{
    constructor(){

    }
    async dataReader(file_path){
        return fetch(file_path).then(response => response.json());
    }

    barchart(ctx, title, xdata, ydata){
        const data = {
            labels: xdata,
            datasets: [{
                label: title,
                data: ydata,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        };
    
        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins:{
                    legend:{
                        labels:{
                            font:{
                                size:16
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }

            },
        };
    
        // 차트 그리기
        new Chart(ctx, config);
    }

    linechart(ctx, title, xdata, ydata, point_color, point_date, point_data){
        const explain_window = document.querySelector(".explain_window");
       
        const data = {
            labels: xdata,
            datasets: [{
                label: title,
                data: ydata,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                pointBackgroundColor: point_color,
                pointBorderColor: point_color,
                pointRadius: 5,
                tension: 0.1
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const date = xdata[context.dataIndex]; 

                                for (let i=0; i<26; i++){
                                    if(date === point_date[i]){
                                        explain_window.innerHTML = point_data[i];
                                    }
                                }

                            }
                        }
                    }
                }
            },
        };
     
        new Chart(ctx, config);
        ctx.style.transform = "scale(0.8)";
        

    }
}

export default ChartUtils;