//action
import { ADD_STATE, CLOUD, BIGDATA, BLOCKCHAIN, AI, IOT } from './types'

//view 추가?
export const addstate = () => {
    return {
        type: ADD_STATE,
    }
}

// 1 클라우드
// 2 빅데이터
// 3 블록체인
// 4 인공지능
// 5 사물인터넷

export const keyword = (index) => {
    if (index == 1) {
        return {
            type: CLOUD,
        }
    } else if (index == 2) {
        return {
            type: BIGDATA,
        }
    } else if (index == 3) {
        return {
            type: BLOCKCHAIN,
        }
    } else if (index == 4) {
        return {
            type: AI,
        }
    } else if (index == 5) {
        return {
            type: IOT,
        }
    }
}
