import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Web3 from 'web3'

function DonutChartCreator(props) {

    let delayed;

    let chartRef = React.createRef()

    useEffect(() => {
        if (props.totalSupply !== undefined && props.balance !== undefined) {
            let newLabelArray = ["Creator","Community"]
            let newBalanceArray = [parseInt(Web3.utils.fromWei(props.balance.toString())), parseInt(props.totalSupply) - parseInt(Web3.utils.fromWei(props.balance.toString()))]
            //let newBalanceArray = [20, 30]

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

                            "rgb(255,165,0,0.4)"

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
        }

    }, [props])

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
