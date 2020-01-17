import React, { Component } from 'react'
import decode from '../utils/decode';
import Chart from "react-apexcharts";
import { map, sortBy } from 'lodash';

export default class UsageGraph extends Component {
    render() {

        const users = this.props.usersData;
        const swipes = this.props.swipesData;
        // Order data by date
        const usersSorted = sortBy(users, function (dateObj) { return new Date(dateObj['_id']); });
        const swipesSorted = sortBy(swipes, function (dateObj) { return new Date(dateObj['_id']); });
        // Select only count data
        const usersData = map(usersSorted, 'count');
        const swipesData = map(swipesSorted, 'count');

        const series = [
            {
                name: 'Users',
                type: 'line',
                data: usersData,
            },
            {
                name: 'Swipes',
                type: 'line',
                data: swipesData,
            }
        ];

        const options = {
            chart: {
                type: 'line',
                height: 300,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ["#FFD747", "#26BFBF"],
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                categories: map(usersSorted, '_id'),
            },
            yaxis: [
                {
                    seriesName: 'Users',
                    axisTicks: {
                        show: true,
                    },
                    title: {
                        text: "Gebruikers",
                        style: {
                            color: '#FFD747',
                        }
                    },
                },
                {
                    seriesName: 'Swipes',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    title: {
                        text: "Swipes",
                        style: {
                            color: '#26BFBF',
                        }
                    },
                },
            ],
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetY: 20
            },
            fill: {
                opacity: 1
            },
        };

        return (
            <Chart
                options={options}
                series={series}
                type="line"
            />
        )
    }
}
