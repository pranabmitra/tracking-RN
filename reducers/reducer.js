const initialState = {
    distance: 0,
    speed: 0,
    heading: ''
};

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case 'INCREMENT_DISTANCE':
            return {
                ...state,
                distance: state.distance + action.distance
            };
        case 'SET_SPEED':
            return {
                ...state,
                speed: action.speed
            }
        case 'SET_DIRECTION':
            let x = action.heading,
                heading = '';
    
            if ((x > 0 && x <= 23) || (x > 338 && x <= 360)) {
                heading = 'N';
            } else if (x > 23 && x <= 65) {
                heading = 'NE';
            } else if (x > 65 && x <= 110) {
                heading = 'E';
            } else if (x > 110 && x <= 155) {
                heading = 'SE';
            } else if (x > 155 && x <= 203) {
                heading = 'S';
            } else if (x > 203 && x <= 248) {
                heading = 'SW';
            } else if (x > 248 && x <= 293) {
                heading = 'W';
            } else if (x > 293 && x <= 338) {
                heading = 'NW';
            }
            
            return {
                ...state,
                heading
            };
        default:
            return state;
    }
}