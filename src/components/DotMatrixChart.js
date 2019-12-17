import React, { Component } from 'react';
import Checkbox from './Checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { mix } from 'chroma-js';
import DotMatrixChartHover from './DotMatrixChartHover';
import { orderBy, reverse } from 'lodash';

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

    toggleCheckBox = (paper) => {
        this.setState({ [paper]: !this.state[paper] });
    }

    setArticles = () => {
        let newArticles = this.props.articles;
        newArticles = reverse(orderBy(newArticles, ['clickbait.yesPercentage', 'clickbait.noPercentage'], ['asc']));
        this.setState({ articles: newArticles });
    }

    dropdownFilterDots = (event) => {
        let filterDots = this.state.articles;
        switch (event.target.value) {
            case 'yesToNo':
                filterDots = reverse(orderBy(filterDots, ['clickbait.yesPercentage', 'clickbait.noPercentage'], ['asc']));
                break;
            case 'noToYes':
                filterDots = reverse(orderBy(filterDots, ['clickbait.noPercentage', 'clickbait.yesPercentage'], ['asc']));
                break;
            case 'mostSwipes':
                filterDots = orderBy(filterDots, ['clickbait.total'], ['desc']);
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
                                <option value="mostSwipes">Meeste geswiped</option>
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
                                <DotMatrixChartHover
                                    article={this.state.hoverArticle}
                                    prevArticle={this.state.hoverPrevArticle}
                                />
                            )}
                            {this.props.articles.length > 0 &&
                                <>
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
                                                // initial={{ opacity: 0, scale: 0 }}
                                                // animate={{ opacity: 1, scale: 1 }}
                                                // exit={{ opacity: 0, scale: 0 }}
                                                className="dot-matrix-chart__dot-container"
                                                key={index}
                                                onMouseEnter={() => { this.hoverDot(article) }}
                                                onMouseLeave={() => { this.leaveDot(article) }}>
                                                <div className="dot-matrix-chart__dot" style={{ backgroundColor: clickbaitColor }}></div>
                                            </motion.div>
                                        );
                                    })}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default DotMatrixChart;