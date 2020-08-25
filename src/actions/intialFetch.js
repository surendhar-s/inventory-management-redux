const initialDataFetch = (data)=>{
    return {
        type: "INITIAL_FETCH",
        payload: data.list
    }
}
export default initialDataFetch