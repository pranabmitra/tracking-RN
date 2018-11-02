export function incrementDistance(distance) {
    return {
        type: 'INCREMENT_DISTANCE',
        distance
    };
}

export function setSpeed(speed) {
    return {
        type: 'SET_SPEED',
        speed
    };
}

export function setDirection(heading) {
    return {
        type: 'SET_DIRECTION',
        heading
    };
}