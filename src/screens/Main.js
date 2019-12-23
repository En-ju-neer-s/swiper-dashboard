import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CountUp from 'react-countup';
import DotMatrixChart from '../components/DotMatrixChart';
import { fetchStats } from '../redux/actions/stats';
import { fetchSwipes } from '../redux/actions/swipes';
import { fetchUsers } from '../redux/actions/users';
import { fetchArticles } from '../redux/actions/articles';
import { fetchLeaderboard } from '../redux/actions/leaderboard';
import { Line } from 'react-chartjs-2';
import { map, reverse } from 'lodash';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            prevStats: []
        })

        this.reduxInterval = null;
    }

    componentDidMount() {
        this.fetchData();
        this.reduxInterval = setInterval(() => {
            this.fetchData();
            this.setState({ prevStats: this.props.stats })
        }, 10000);
    }

    fetchData = () => {
        this.props.fetchStats();
        this.props.fetchSwipes();
        this.props.fetchUsers();
        this.props.fetchArticles();
        this.props.fetchLeaderboard();
    }

    componentWillUnmount() {
        if (this.reduxInterval) {
            clearInterval(this.reduxInterval);
        }
    }

    render() {
        let swipesData;
        if (this.props.swipes !== undefined) {
            const dataLabels = reverse(map(this.props.swipes, '_id'));
            const dataCount = reverse(map(this.props.swipes, 'count'));

            swipesData = {
                labels: dataLabels,
                datasets: [
                    {
                        fill: false,
                        lineTension: 0.1,
                        borderColor: '#26BFBF',
                        data: dataCount
                    }
                ]
            };
        }

        let usersData;
        if (this.props.users !== undefined) {
            const dataLabels = reverse(map(this.props.users, '_id'));
            const dataCount = reverse(map(this.props.users, 'count'));

            usersData = {
                labels: dataLabels,
                datasets: [
                    {
                        fill: false,
                        lineTension: 0.1,
                        borderColor: '#FFD747',
                        data: dataCount
                    }
                ]
            };
        }

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
                        {this.props.articles.length > 0 &&
                            <DotMatrixChart articles={this.props.articles} />
                        }
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
                                            {this.props.stats &&
                                                <CountUp
                                                    start={this.state.prevStats ? this.state.prevStats.allUser : 0}
                                                    end={this.props.stats.allUser} />
                                            }
                                        </span>
                                    </div>
                                    <div className="col-xs-6">
                                        <h3>Artikelen geswiped:</h3>
                                        <span className="statistics__number">
                                            {this.props.stats &&
                                                <CountUp
                                                    start={this.state.prevStats ? this.state.prevStats.allSwipes : 0}
                                                    end={this.props.stats.allSwipes} />
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h3>Gem. swipes p.p:</h3>
                                        <span className="statistics__number">
                                            {this.props.stats &&
                                                <CountUp
                                                    start={this.state.stats ? this.state.stats.averageSwipes : 0}
                                                    end={this.props.stats.averageSwipes} />
                                            }
                                        </span>
                                    </div>
                                    <div className="col-xs-6">
                                        {/* <h3>Dagen tot resultaat:</h3>
                                        <span className="statistics__number">
                                            <CountUp
                                                start={0}
                                                end={42} />
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <h2>Leaderboard</h2>
                                <table className="leaderboard">
                                    <tbody>
                                        {this.props.leaderboard &&
                                            this.props.leaderboard.map((item, index) =>
                                                <tr key={item._id}>
                                                    <td>{index + 1}.</td>
                                                    <td><b>{item.count}</b></td>
                                                    <td>{item.username}</td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>

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
                                {this.props.users[0] &&
                                    <Line
                                        data={usersData}
                                        legend={{ display: false }}
                                        width={100}
                                        height={50}
                                        options={{ maintainAspectRatio: false }} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchStats,
        fetchSwipes,
        fetchUsers,
        fetchArticles,
        fetchLeaderboard,
    }, dispatch);
}

function mapStateToProps({ stats, swipes, users, articles, leaderboard }) {
    return { stats, swipes, users, articles, leaderboard };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);