import React from 'react';
import CountUp from 'react-countup';
import DotMatrixChart from '../components/DotMatrixChart';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="main wrap container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Swiper Dashboard</h1>
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
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <h2>Aantal gebruikers per dag</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;