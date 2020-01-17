import React, { Component } from 'react';
import decode from '../utils/decode';
import Chart from "react-apexcharts";
import { map, slice, reverse, orderBy } from 'lodash';
import ArrowLeft from '../assets/images/left.svg';
import ArrowRight from '../assets/images/right.svg';
import ArrowStart from '../assets/images/first.svg';
import ArrowEnd from '../assets/images/last.svg';

export default class ArticlesGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: 0,
            end: 50,
            increment: 50,
            max: this.props.rawArticles.length,
            articles: this.props.rawArticles
        }
    }

    shiftData = (direction) => {
        const { start, end, increment, max } = this.state;

        let nextStart;
        let nextEnd;
        switch (direction) {
            case 'start':
                this.setState({
                    start: 0,
                    end: increment
                });
                break;
            case 'up':
                nextStart = start + increment;
                nextEnd = end + increment;

                this.setState({
                    start: ((nextEnd >= max) ? (max - increment) : nextStart),
                    end: ((nextEnd >= max) ? max : nextEnd)
                });
                break;
            case 'down':
                nextStart = start - increment;
                nextEnd = end - increment;

                this.setState({
                    start: ((nextStart <= 0) ? 0 : nextStart),
                    end: ((nextStart <= 0) ? increment : nextEnd)
                });
                break;
            case 'end':
                this.setState({
                    start: (max - increment),
                    end: max
                });
                break;
        }
    }

    dropdownFilterDots = (event) => {
        let filterData = this.state.articles;
        switch (event.target.value) {
            case 'yesToNo':
                filterData = reverse(orderBy(filterData, ['clickbait.yesPercentage', 'clickbait.noPercentage'], ['asc']));
                break;
            case 'noToYes':
                filterData = reverse(orderBy(filterData, ['clickbait.noPercentage', 'clickbait.yesPercentage'], ['asc']));
                break;
            case 'mostSwipes':
                filterData = orderBy(filterData, ['clickbait.total'], ['desc']);
                break;
        }

        this.setState({ articles: filterData });
    }

    render() {
        const articles = slice(this.state.articles, this.state.start, this.state.end);

        const dataYes = map(articles, 'clickbait.yes');
        const dataNo = map(articles, 'clickbait.no');

        let dataLabels = [];
        articles.map((article) => {
            const articleTitle = (article.title || article.title !== "") ? article.title : article['og-title'];
            dataLabels.push(decode(articleTitle));
        });

        const series = [
            {
                name: 'Ja',
                type: 'column',
                data: dataYes,
            },
            {
                name: 'Nee',
                type: 'column',
                data: dataNo,
            }
        ];

        const options = {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false,
                    type: 'x',
                }
            },
            colors: ["#FFD747", "#26BFBF"],
            labels: dataLabels,
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetY: 20
            },
            fill: {
                opacity: 1
            },
            xaxis: {
                labels: {
                    show: false,
                }
            },
            annotations: {
                yaxis: [
                    {
                        y: this.props.calculatedAverage,
                        borderColor: "#775DD0",
                        label: {
                            borderColor: "#775DD0",
                            style: {
                                color: "#fff",
                                background: "#775DD0"
                            },
                            text: "Average swipes"
                        }
                    }
                ]
            }
        };

        return (
            <>
                <div className="articles-graph__filters">
                    <div className="articles-graph__controller">
                        <img onClick={() => { this.shiftData('start') }} src={ArrowStart} alt="arrow start" />
                        <img onClick={() => { this.shiftData('down') }} src={ArrowLeft} alt="arrow left" />
                        <span className="articles-graph__progress">
                            {this.state.start}/{this.state.end}
                        </span>
                        <img onClick={() => { this.shiftData('up') }} src={ArrowRight} alt="arrow right" />
                        <img onClick={() => { this.shiftData('end') }} src={ArrowEnd} alt="arrow end" />
                    </div>
                    <div className="dot-matrix-chart__filters">
                        <select className="dropdown" onChange={this.dropdownFilterDots}>
                            <option>Filter</option>
                            <option value="yesToNo">Ja naar Nee</option>
                            <option value="noToYes">Nee naar Ja</option>
                            <option value="mostSwipes">Meeste geswiped</option>
                        </select>
                    </div>
                </div>
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                />
            </>
        )
    }
}
