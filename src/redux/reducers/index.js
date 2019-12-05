import { combineReducers } from 'redux';
import StatsReducer from './reducer_stats';
import SwipesReducer from './reducer_swipes';
import UsersReducer from './reducer_users';
import ArticlesReducer from './reducer_articles';

const rootReducer = combineReducers({
    stats: StatsReducer,
    swipes: SwipesReducer,
    users: UsersReducer,
    articles: ArticlesReducer,
});

export default rootReducer;
