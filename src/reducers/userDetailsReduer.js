let userDetails = null
const userDetailReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            userDetails = action.payload
            break;
        case 'REMOVE_ISER_ID':
            userDetails = null
        default:
            break;
    }
    return userDetails
}

export default userDetailReducer