import React, { Component } from 'react';
import Chart from 'chart.js';
import styles from './Modal.module.css';

class Modal extends Component {
    chartRef = React.createRef();

    state = {
        currentChartData: null,
        chart: this.props.chart,
        withdrawTransactionChart: {
            label: 'Withdraw Transactions',
            dates: this.props.withdrawTransaction.dates,
            transaction: this.props.withdrawTransaction.transactions
        },
        depositTransactionChart: {
            label: 'Deposit Transactions',
            dates: this.props.depositTransaction.dates,
            transaction: this.props.depositTransaction.transactions
        }
    }

    componentWillMount() {
        this.prepareDataForChart();
        console.log('Data-->', this.state.withdrawTransactionChart)
    }

    componentDidMount() {
        this.initChart();
    }



    initChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: this.state.currentChartData.dates,
                datasets: [
                    {
                        label: this.state.currentChartData.label,
                        data: [0, ...this.state.currentChartData.transaction],
                    }
                ]
            },
            options: {
                //Customize chart options,
            }
        });
    }

    prepareDataForChart = () => {
        let currentChartData;
        if (this.props.chart === 'Withdraw') {
            currentChartData = {
                label: 'Withdraw Transactions',
                dates: this.state.withdrawTransactionChart.dates,
                transaction: this.state.withdrawTransactionChart.transaction
            }
        } else if (this.props.chart === 'Deposit') {
            currentChartData = {
                label: 'Deposit Transactions',
                dates: this.state.depositTransactionChart.dates,
                transaction: this.state.depositTransactionChart.transaction
            }
        }
        this.setState({ currentChartData })
    }


    render() {
        return (
            <div className={styles.ModalBackground}>
                <div className={styles.Modal}>
                    <div className={styles.ModalHeader}>
                        <div className={styles.ModalHeaderText}>{this.state.currentChartData.label}</div>
                        <div className={styles.CloseButton} onClick={this.props.modalClose}>
                            Close
                        </div>
                    </div>
                    <div className={styles.Bar}></div>
                    <div className={styles.ModalBody}>
                        <div className={styles.GraphContainer}>
                            <canvas
                                id="myChart"
                                ref={this.chartRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

export default Modal;