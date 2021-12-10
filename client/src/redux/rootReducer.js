//rootReducer는 여러개의 reducer를 하나로 모으는데 사용됨
import { combineReducers } from "redux";
import loginWindowReducer from "./loginwindow/reducers"
import newsReducer from "./news/reducers";
import drawerReducer from "./drawer/reducers"

const rootReducer = combineReducers({
    loginWindow : loginWindowReducer,
    news: newsReducer,
    drawer : drawerReducer,
})

export default rootReducer