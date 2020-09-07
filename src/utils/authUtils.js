const isLoggedIn = () => {
    if (localStorage.getItem("userId")) {
        return true
    }
    else {
        return false
    }
}

export default isLoggedIn