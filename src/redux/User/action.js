import axios from "axios"
import { DATAFAIL, DATALOADING, DATASUCCESS } from "./actionType"



export const dataLoading=()=>{
    return{
        type: DATALOADING ,    
    }
}


 export const dataSucces=(payload)=>{
    console.log("data");
    return {
        type:DATASUCCESS,
        payload
    }
}



const dataFail=(payload)=>{
    return{
        type: DATAFAIL ,
        payload
    }
}



export const GetSingleData=()=>(dispatch,payload)=>{
    // console.log(payload,"p")
    dispatch(dataLoading());
 return   axios.post(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f/?${payload}`)
    .then((res)=>dispatch(dataSucces(res.data)))
    .catch((err)=>dispatch(dataFail(err)))
}




export const GetData=(payload)=>(dispatch)=>{
    console.log("get",payload)
    // dispatch(dataLoading());
return  axios(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`)
    .then((res)=>dispatch(dataSucces(res.data)))
    .catch((err)=>dispatch(dataFail(err)))
}




export const AddData=(payload)=>(dispatch)=>{
    dispatch(dataLoading());
 return   axios.post("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f",payload)
    .then((res)=>dispatch(dataSucces(res.data)))
    .then((err)=>dispatch(dataFail(err)))
}


