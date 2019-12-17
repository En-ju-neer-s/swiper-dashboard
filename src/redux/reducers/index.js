import { combineReducers } from 'redux';
import StatsReducer from './reducer_stats';
import SwipesReducer from './reducer_swipes';
import UsersReducer from './reducer_users';
import ArticlesReducer from './reducer_articles';
import LeaderboardReducer from './reducer_leaderboard';

const rootReducer = combineReducers({
    stats: StatsReducer,
    swipes: SwipesReducer,
    users: UsersReducer,
    articles: ArticlesReducer,
    leaderboard: LeaderboardReducer,
});

export default rootReducer;
