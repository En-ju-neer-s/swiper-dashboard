import React, { Component } from 'react';
import CountUp from 'react-countup';
import decode from '../utils/decode';

class DotMatrixChartHover extends Component {
    render() {
        const { article, prevArticle } = this.props;

        const articleDate = article !== null ? new Date(article.timestamp) : null;

        const prevArticleTotal = prevArticle !== null ? prevArticle.clickbait.total : 0;
        const prevArticleYes = prevArticle !== null ? prevArticle.clickbait.yes : 0;
        const prevArticleYesPercentage = prevArticle !== null ? prevArticle.clickbait.yesPercentage : 0;
        const prevArticleNo = prevArticle !== null ? prevArticle.clickbait.no : 0;
        const prevArticleNoPercentage = prevArticle !== null ? prevArticle.clickbait.noPercentage : 0;

        const yesPercentage = Math.round(article.clickbait.yesPercentage * 100);
        const noPercentage = Math.round(article.clickbait.noPercentage * 100);
        const bothNo = yesPercentage === 0 && noPercentage === 0;
        const yesWidthPercentage = bothNo ? 50 : Math.round(article.clickbait.yesPercentage * 100);
        const noWidthPercentage = bothNo ? 50 : Math.round(article.clickbait.noPercentage * 100);

        return (
            <div className="dot-matrix-chart__info">
                <div className="dot-matrix-chart__info-container">
                    <div className="dot-matrix-chart__info-title">
                        <p>{decode(article.title)}</p>
                    </div>
                    <div className="dot-matrix-chart__info-details">
                        <a href={article.url}>{article.source}</a>
                        <span className="dot-matrix-chart__info-date">{articleDate.getDate()}/{articleDate.getMonth()}/{articleDate.getYear()}</span>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Swipes</td>
                                <td>
                                    <span className="dot-matrix-chart__info-number--swipes">
                                        <CountUp
                                            start={prevArticleTotal}
                                            end={article.clickbait.total} />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Ja</td>
                                <td>
                                    <span className="dot-matrix-chart__info-number--yes">
                                        <CountUp
                                            start={prevArticleYes}
                                            end={article.clickbait.yes} />
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Nee</td>
                                <td>
                                    <span className="dot-matrix-chart__info-number--no">
                                        <CountUp
                                            start={prevArticleNo}
                                            end={article.clickbait.no} />
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="dot-matrix-chart__info-chart">
                    <div
                        className="dot-matrix-chart__info-chart-no"
                        style={{
                            width: yesWidthPercentage + '%'
                        }}>
                        <CountUp
                            start={prevArticleYesPercentage}
                            end={yesPercentage} />%
                    </div>
                    <div
                        className="dot-matrix-chart__info-chart-yes"
                        style={{
                            width: noWidthPercentage + '%'
                        }}>
                        <CountUp
                            start={prevArticleNoPercentage}
                            end={noPercentage} />%
                    </div>
                </div>
            </div>
        );
    }
}

export default DotMatrixChartHover;