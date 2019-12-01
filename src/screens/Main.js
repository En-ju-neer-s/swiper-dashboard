import React from 'react';
import CountUp from 'react-countup';
import DotMatrixChart from '../components/DotMatrixChart';
import LineChart from '../components/LineChart'
import { Line } from 'react-chartjs-2';
class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const gebruikersData = {
            labels: ['25/11/2019', '26/11/2019', '27/11/2019', '28/11/2019', '29/11/2019', '30/11/2019', '1/12/2019'],
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    borderColor: '#FFD747',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        const swipesData = {
            labels: ['25/11/2019', '26/11/2019', '27/11/2019', '28/11/2019', '29/11/2019', '30/11/2019', '1/12/2019'],
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    borderColor: '#26BFBF',
                    data: [200, 350, 255, 321, 221, 432, 333]
                }
            ]
        };
        return (
            <div className="main wrap container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Swiper Dashboard (Mock data!)</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <h2>Artikel overzicht</h2>
                        <DotMatrixChart />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h2>Statistieken</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h3>Mensen gespeeld:</h3>
                                        <span className="statistics__number">
                                            <CountUp
                                                start={0}
                                                end={374} />
                                        </span>
                                    </div>
                                    <div className="col-xs-6">
                                        <h3>Artikelen geswiped:</h3>
                                        <span className="statistics__number">
                                            <CountUp
                                                start={0}
                                                end={2936} />
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h3>Gem. swipes p.p:</h3>
                                        <span className="statistics__number">
                                            <CountUp
                                                start={0}
                                                end={38} />
                                        </span>
                                    </div>
                                    <div className="col-xs-6">
                                        <h3>Dagen tot resultaat:</h3>
                                        <span className="statistics__number">
                                            <CountUp
                                                start={0}
                                                end={42} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <h2>Voortgang</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Aantal swipes per dag</h2>
                                <Line
                                    data={swipesData}
                                    legend={{ display: false }}
                                    width={100}
                                    height={50}
                                    options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Aantal gebruikers per dag</h2>
                                <Line
                                    data={gebruikersData}
                                    legend={{ display: false }}
                                    width={100}
                                    height={50}
                                    options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;