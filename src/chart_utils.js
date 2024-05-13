class ChartUtils{
    constructor(){
        this.colors = [ 
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(201, 203, 207, 0.6)'
        ];
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
        const chart = new Chart(ctx, config);
        ctx.style.transform = "scale(0.9)";
        return chart;
    }

    linechart(ctx, title, labels, xdata, ydata){
        const datasets = [];

        for(let i=0; i<labels.length; i++){
            const product = labels[i];

            datasets.push({
                label: product,
                data: ydata[i],
                borderColor: this.colors[i],
                pointBackgroundColor: this.colors[i],
                pointBorderColor: this.colors[i],
                pointRadius: 5,
                tension: 0.1,
            })
        }

        const data = {
            labels: xdata,
            datasets: datasets
        }

        const config = {
            type: 'line',
            data : data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
            },
        }

        const chart = new Chart(ctx, config);
        ctx.style.transform = "scale(0.9)";
        return chart;
    }

    linechart_point(ctx, title, xdata, ydata, point_color, point_date, point_data){
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
     
        const chart = new Chart(ctx, config);
        ctx.style.transform = "scale(0.8)";
        return chart;

    }

    stackbarchart(ctx, title, labels, xdata, ydata){
        let datasets = [];

        for(let i=0; i<labels.length; i++){
            const section = labels[i];
            const color = this.colors[i];

            datasets.push({
                label: section,
                data : ydata[i],
                backgroundColor: color,
            })
        }

        const data = {
            labels: xdata,
            datasets: datasets,
        };

        console.log(data);

        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    title: {
                    display: true,
                    text: title,
                    },
                },
                responsive: true,
                scales: {
                    x: {
                    stacked: true,
                    },
                    y: {
                    stacked: true
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        ctx.style.transform = "scale(0.9)";
        return chart;
    }
    
    stackbarNlinechart(ctx, title, barlabels, barxdata, barydata, linelabels, linexdata, lineydata){
        let datasets = [];

        for(let i=0; i<barlabels.length; i++){
            const section = barlabels[i];
            const color = this.colors[i];

            datasets.push({
                type: 'bar',
                label: section,
                data : barydata[i],
                backgroundColor: color,
            })
        }

        for(let i=0; i<linelabels.length; i++){
            const section = linelabels[i];
            const color = "red";

            datasets.push({
                type: 'line',
                label: section,
                data: lineydata[i],
                fill: false,
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: color,
                pointRadius: 5,
                tension: 0.1
            })
        }

        const data = {
            labels: barxdata,
            datasets: datasets,
        };

        console.log(data);

        const config = {
            type: 'bar',
            data: data,
            options: {
                plugins: {
                    title: {
                    display: true,
                    text: title,
                    },
                },
                responsive: true,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        beginAtZero: true,
                        stacked: true
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        ctx.style.transform = "scale(0.9)";
        return chart;
    }
}

export default ChartUtils;