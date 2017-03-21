export const set_directions = (directionsObj) => {
    return {
        type: 'SET_DIRECTIONS',
        directionsObj: directionsObj,
        isGettingDirs: true
    };
}