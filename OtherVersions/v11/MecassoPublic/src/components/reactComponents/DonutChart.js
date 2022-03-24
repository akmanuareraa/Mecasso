import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Web3 from 'web3'

function DonutChart(props) {

    //harcoded dataset for testing purposes
    let delayed;

    // Append '4d' to the colors (alpha channel), except for the hovered index
    // function handleHover(evt, item, legend) {
    //     legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    //         colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
    //     });
    //     legend.chart.update();
    // }

    // // Removes the alpha channel from background colors
    // function handleLeave(evt, item, legend) {
    //     legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
    //         colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    //     });
    //     legend.chart.update();
    // }

    let chartRef = React.createRef()

    useEffect(() => {

        // let newLabelArray = ["PBO-2255", "ADM-541", "EVN-5543", "APSA-7411"]
        // let newBalanceArray = [2255, 541, 5543, 7411]

        let newLabelArray = []
        let newBalanceArray = []


        console.log('donut chart called', props.mainState)

        props.mainState.tokenBalance.forEach(ele => {
            newLabelArray.push(ele.symbol + '-' + Web3.utils.fromWei(ele.balance))
            newBalanceArray.push(Web3.utils.fromWei(ele.balance))
            console.log('Donut', newBalanceArray, newLabelArray)
        })

        // props.mainState.tokenBalance.forEach(ele => {
        //     newLabelArray.push(ele.name)
        //     newBalanceArray.push(ele.balance)
        // })

        const ctx = chartRef.current.getContext("2d");

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: newLabelArray, //this.props.labelArray
                pointRadius: 2,
                datasets: [{
                    data: newBalanceArray,
                    // borderColor: [
                    //     "#3cba9f",
                    //     "#ffa500",
                    //     "#c45850",
                    //     "#246cf2",
                    // ],
                    backgroundColor: [
                        "rgb(255,165,0,1.0)",
                        "rgb(255,165,0,0.8)",
                        "rgb(255,165,0,0.6)",
                        "rgb(255,165,0,0.4)"
                    ],
                    borderWidth: 0,
                }]
            },
            options: {
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 100 + context.datasetIndex * 1000;
                        }
                        return delay;
                    },
                },
                plugins: {
                    title: {
                        display: false,
                        text: 'SocTok',
                    },
                    legend: {
                        display: true,
                        //onHover: handleHover,
                        //onLeave: handleLeave,
                        maxWidth: 250,
                        position: "bottom",
                        labels: {
                            boxWidth: 20,
                            boxHeight: 18,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        usePointStyle: true,
                    }
                },
                cutout: 0,
                responsive: false,
                scales: {
                    xAxes: [{
                        display: false,
                    }],
                    yAxes: [{
                        display: false,
                    }],
                }
            },
        });
}, [])

    return (
        <div>
            <canvas
                width="300"
                height="300"
                id="myChart"
                ref={chartRef}
            />
        </div>
    )
}

export default DonutChart;