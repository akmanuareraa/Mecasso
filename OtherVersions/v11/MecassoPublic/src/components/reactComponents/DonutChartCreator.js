import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function DonutChartCreator(props) {

    let delayed;

    let chartRef = React.createRef()

    useEffect(() => {

        let newLabelArray = ["Creator Tokens", "Community Tokens"]
        //let newBalanceArray = [7000,13000]
        let newBalanceArray = [props.creatorProfile.creatorbal,props.creatorProfile.supply - props.creatorProfile.creatorbal]

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
                            "rgb(212,184,1,0.6)",
                            "rgb(212,184,1,0.3)"
                        // "rgb(60,186,159,1.0)",
                        // "rgb(255,165,0,1.0)",
                        // "rgb(196,88,80,1.0)",
                        // "rgb(36, 108, 242,1.0)"
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

        // if (props.mainState.balanceRetrieved) {
        //     let newLabelArray = []
        //     let newBalanceArray = []

        //     props.mainState.tokenBalance.forEach(ele => {
        //         newLabelArray.push(ele.name)
        //         newBalanceArray.push(ele.balance)
        //     })

        //     const ctx = chartRef.current.getContext("2d");

        //     new Chart(ctx, {
        //         type: 'doughnut',
        //         data: {
        //             labels: newLabelArray, //this.props.labelArray
        //             pointRadius: 2,
        //             datasets: [{
        //                 data: newBalanceArray,
        //                 borderColor: [
        //                     "#3cba9f",
        //                     "#ffa500",
        //                     "#c45850",
        //                 ],
        //                 backgroundColor: [
        //                     "rgb(60,186,159,1.0)",
        //                     "rgb(255,165,0,1.0)",
        //                     "rgb(196,88,80,1.0)",
        //                 ],
        //                 borderWidth: 5,
        //             }]
        //         },
        //         options: {
        //             animation: {
        //                 onComplete: () => {
        //                     delayed = true;
        //                 },
        //                 delay: (context) => {
        //                     let delay = 0;
        //                     if (context.type === 'data' && context.mode === 'default' && !delayed) {
        //                         delay = context.dataIndex * 1000 + context.datasetIndex * 500;
        //                     }
        //                     return delay;
        //                 },
        //             },
        //             plugins: {
        //                 title: {
        //                     display: false,
        //                     text: 'SocTok',
        //                 },
        //                 legend: {
        //                     //onHover: handleHover,
        //                     //onLeave: handleLeave,
        //                     maxWidth: 250,
        //                     position: "right",
        //                     labels: {
        //                         font: {
        //                             size: 15
        //                         }
        //                     }
        //                 },
        //                 tooltip: {
        //                     usePointStyle: true,
        //                 }
        //             },
        //             cutout: 75,
        //             responsive: false,
        //             scales: {
        //                 xAxes: [{
        //                     display: false,
        //                 }],
        //                 yAxes: [{
        //                     display: false,
        //                 }],
        //             }
        //         },
        //     });
        // }
    //}, [props.mainState.balanceRetrieved])
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

export default DonutChartCreator;