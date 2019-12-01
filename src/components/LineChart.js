import React, { Component } from 'react';
import { Chart } from 'chart.js';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.chart = React.createRef();
        // const node = this.myRef.current;
    }

    componentDidMount() {
        const ctx = this.chart;

        const lineChart = new Chart(ctx, {
            type: 'line',
            data: [10, 20, 30, 40, 50],
            // options: options
        });

    }


    render() {
        return (<div ref={this.chart}>test</div>);
    }
}

export default LineChart;