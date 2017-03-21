export const directions_error = (err) => {
    return {
        type: 'DIRECTIONS_ERROR',
        isGettingDirs: false,
        error: err
    };
}