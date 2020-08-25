const removeProductFromList = (data) => {
    return {
        type: "DELETE_PRODUCT",
        payload: data.productId
    }
}

export default removeProductFromList