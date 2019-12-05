import React, { Component } from 'react';
import Checkbox from './Checkbox';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion';
import { mix } from 'chroma-js';
import { sortBy, orderBy, fromPairs, toPairs } from 'lodash';

class DotMatrixChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nrc: true,
            telegraaf: true,
            nu: true,
            joop: true,
            nos: true,
            perKrant: false,
            articles: [],
            hover: false,
            hoverArticle: null,
            hoverPrevArticle: null,
        }
    }

    componentDidMount() {
        this.setArticles();
    }

    componentDidUpdate() {

    }

    toggleCheckBox = (paper) => {
        this.setState({ [paper]: !this.state[paper] });
    }

    setArticles = () => {
        let newArticles = this.props.articles;
        // let papers = ['nrc', 'telegraaf', 'nu', 'joop', 'nos'];

        // for (let i = 0; i < 500; i++) {
        //     let randomSwipes = Math.floor(Math.random() * (5000 - 0 + 1) + 0);
        //     let randomYes = Math.random() * randomSwipes;
        //     let randomNo = randomSwipes - randomYes;
        //     newArticles.push({
        //         id: '12123',
        //         paper: papers[(Math.floor(Math.random() * (4 - 0 + 1) + 0))],
        //         title: 'Dit gebeurt er wanneer je een auto met automaat bij 100 km/u in zijn achteruit zet.',
        //         url: 'https://test.com',
        //         timestamp: '05/11/2019',
        //         swipes: randomSwipes,
        //         yes: randomYes,
        //         no: randomNo,
        //         totalYesPercent: (randomYes / randomSwipes)
        //     })
        // }
        // console.log(newArticles);

        // newArticles = orderBy(newArticles, ['clickbait.yes'], ['asc'])

        this.setState({ articles: newArticles });
    }

    dropdownFilterDots = (event) => {
        let filterDots = this.state.articles;
        switch (event.target.value) {
            case 'yesToNo':
                filterDots = orderBy(filterDots, ['totalYesPercent'], ['asc']);
                break;
            case 'noToYes':
                filterDots = orderBy(filterDots, ['totalYesPercent'], ['desc']);
                break;
        }

        this.setState({ articles: filterDots });
    }

    hoverDot = (article) => {
        this.setState({
            hover: true,
            hoverArticle: article
        })
    }

    leaveDot = (article) => {
        this.setState({
            hover: false,
            hoverPrevArticle: article
        })
    }

    decode(data) {
        const parser = new DOMParser();
        let decodedString = parser.parseFromString(`<!doctype html><body>${window.atob(data)}`, 'text/html').body.textContent;
        decodedString = this.decodeSpecialCharacters(decodedString);
        return decodedString;
    }

    decodeSpecialCharacters(decodedString) {
        decodedString = decodedString.split('Ã«').join('ë');
        decodedString = decodedString.split('Ã©').join('é');
        decodedString = decodedString.split('Ã¨').join('è');
        decodedString = decodedString.split(`Ã `).join('à');
        decodedString = decodedString.split('Ã¡').join('á');
        decodedString = decodedString.split('Ã¤').join('ä');
        decodedString = decodedString.split('Ã¹').join('ù');
        decodedString = decodedString.split('Ãº').join('ú');
        decodedString = decodedString.split('Ã¼').join('ü');
        decodedString = decodedString.split('Ã¶').join('ö');
        decodedString = decodedString.split('Â©').join('©');
        decodedString = decodedString.split('Â®').join('®');
        decodedString = decodedString.split('Ã').join('À');
        decodedString = decodedString.split('Ã').join('Á');
        decodedString = decodedString.split('Ã').join('Ä');
        decodedString = decodedString.split('Ã').join('È');
        decodedString = decodedString.split('Ã').join('É');
        decodedString = decodedString.split('Ã').join('Ë');
        decodedString = decodedString.split('Ã').join('Ö');
        decodedString = decodedString.split('Ä').join('ć');
        decodedString = decodedString.split('Ä').join('Ć');
        decodedString = decodedString.split('Ã').join('Ù');
        decodedString = decodedString.split('Ã').join('Ú');
        decodedString = decodedString.split('Ã').join('Ü');
        decodedString = decodedString.split('Ã¯').join('ï');
        decodedString = decodedString.split('â¬Ü').join('‘');
        decodedString = decodedString.split('â¬"').join('’');
        decodedString = decodedString.split('â').join('’');
        decodedString = decodedString.split('â').join('‘');

        return decodedString;
    }

    render() {
        const currentArticleDate = this.state.hoverArticle !== null ? new Date(this.state.hoverArticle.timestamp) : null;
        return (
            <div className="dot-matrix-chart">
                <div className="row">
                    <div className="col-xs-12 col-md-7">
                        <h4>Kranten:</h4>
                        <div className="dot-matrix-chart__papers">
                            <Checkbox label="NRC" checked={this.state.nrc} onClick={() => { this.toggleCheckBox('nrc') }} />
                            {/* <Checkbox label="Telegraaf" checked={this.state.telegraaf} onClick={() => { this.toggleCheckBox('telegraaf') }} /> */}
                            <Checkbox label="Nu.nl" checked={this.state.nu} onClick={() => { this.toggleCheckBox('nu') }} />
                            <Checkbox label="Joop" checked={this.state.joop} onClick={() => { this.toggleCheckBox('joop') }} />
                            <Checkbox label="NOS" checked={this.state.nos} onClick={() => { this.toggleCheckBox('nos') }} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-5">
                        <h4>Filters:</h4>
                        <div className="dot-matrix-chart__filters">
                            <select className="dropdown" onChange={this.dropdownFilterDots}>
                                <option value="yesToNo">Ja naar Nee</option>
                                <option value="noToYes">Nee naar Ja</option>
                                {/* <option>Datum</option> */}
                            </select>
                            {/* <Checkbox label="Per krant" checked={this.state.perKrant} onClick={() => { this.toggleCheckBox('perKrant') }} /> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="dot-matrix-chart__container">
                            {this.state.hover && (
                                <div className="dot-matrix-chart__info">
                                    <div className="dot-matrix-chart__info-container">
                                        <div className="dot-matrix-chart__info-title">
                                            <p>{this.decode(this.state.hoverArticle.title)}</p>
                                        </div>
                                        <div className="dot-matrix-chart__info-details">
                                            <a href={this.state.hoverArticle.url}>{this.state.hoverArticle.source}</a>
                                            <span className="dot-matrix-chart__info-date">{currentArticleDate.getDate()}/{currentArticleDate.getMonth()}/{currentArticleDate.getYear()}</span>
                                        </div>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Swipes</td>
                                                    <td>
                                                        <span className="dot-matrix-chart__info-number--swipes">
                                                            <CountUp
                                                                start={this.state.hoverPrevArticle !== null ? this.state.hoverPrevArticle.clickbait.total : 0}
                                                                end={this.state.hoverArticle.clickbait.total} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Ja</td>
                                                    <td>
                                                        <span className="dot-matrix-chart__info-number--yes">
                                                            <CountUp
                                                                start={this.state.hoverPrevArticle !== null ? this.state.hoverPrevArticle.clickbait.yes : 0}
                                                                end={this.state.hoverArticle.clickbait.yes} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Nee</td>
                                                    <td>
                                                        <span className="dot-matrix-chart__info-number--no">
                                                            <CountUp
                                                                start={this.state.hoverPrevArticle !== null ? this.state.hoverPrevArticle.clickbait.no : 0}
                                                                end={this.state.hoverArticle.clickbait.no} />
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="dot-matrix-chart__info-chart">
                                        <div
                                            className="dot-matrix-chart__info-chart-no"
                                            style={{ width: Math.round((this.state.hoverArticle.clickbait.yes / this.state.hoverArticle.clickbait.total) * 100) + '%' }}>
                                            <CountUp
                                                start={this.state.hoverPrevArticle !== null ? Math.round((this.state.hoverPrevArticle.clickbait.yes / this.state.hoverPrevArticle.clickbait.total) * 100) : 0}
                                                end={Math.round((this.state.hoverArticle.clickbait.yes / this.state.hoverArticle.clickbait.total) * 100)} />%
                                        </div>
                                        <div
                                            className="dot-matrix-chart__info-chart-yes"
                                            style={{ width: Math.round((this.state.hoverArticle.clickbait.no / this.state.hoverArticle.clickbait.total) * 100) + '%' }}>
                                            <CountUp
                                                start={this.state.hoverPrevArticle !== null ? Math.round((this.state.hoverPrevArticle.clickbait.no / this.state.hoverPrevArticle.clickbait.total) * 100) : 0}
                                                end={Math.round((this.state.hoverArticle.clickbait.no / this.state.hoverArticle.clickbait.total) * 100)} />%
                                        </div>
                                    </div>
                                </div>
                            )}
                            {this.props.articles.length > 0 &&
                                <AnimatePresence>
                                    {this.state.articles.map((article, index) => {
                                        // return <span>test</span>;
                                        if ((article.source === 'Nos' && !this.state.nos) ||
                                            (article.source === 'Nrc' && !this.state.nrc) ||
                                            (article.source === 'Telegraaf' && !this.state.telegraaf) ||
                                            (article.source === 'NuNL' && !this.state.nu) ||
                                            (article.source === 'Joop' && !this.state.joop)) {
                                            return;
                                        }
                                        let clickbaitColor;
                                        const clickbaitSum = article.clickbait.yes / article.clickbait.total;
                                        if (article.clickbait.yes > 0 && article.clickbait.no > 0) {
                                            clickbaitColor = mix('#26BFBF', '#FFD747', clickbaitSum);
                                        } else if (article.clickbait.yes > 0 && article.clickbait.no === 0) {
                                            clickbaitColor = '#FFD747';
                                        } else if (article.clickbait.no > 0 && article.clickbait.yes === 0) {
                                            clickbaitColor = '#26BFBF';
                                        } else {
                                            clickbaitColor = '#B2B2B2';
                                        }

                                        return (
                                            <motion.div
                                                positionTransition={{ duration: 0.3, type: "tween" }}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                className="dot-matrix-chart__dot-container"
                                                key={index}
                                                onMouseEnter={() => { this.hoverDot(article) }}
                                                onMouseLeave={() => { this.leaveDot(article) }}>
                                                <div className="dot-matrix-chart__dot" style={{ backgroundColor: clickbaitColor }}></div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            }
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default DotMatrixChart;