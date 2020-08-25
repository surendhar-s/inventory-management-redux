const editProductInList = (data) => {
    return {
        type: "EDIT_PRODUCT",
        payload: data.updatedData
    }
}

export default editProductInList