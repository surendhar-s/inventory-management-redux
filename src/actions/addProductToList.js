const addProductToList = (data) => {
    return {
        type: "ADD_PRODUCT",
        payload: data.newData
    }
}

export default addProductToList