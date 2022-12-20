import { DATAFAIL, DATALOADING, DATASUCCESS } from "./actionType";

  const initStore = {
    loading: false,
    error: false,
    fetchData:[] ,
  };
  
  export const dataReducer = (store = initStore, { type, payload }) => {
 
    switch (type) {
      case DATALOADING :
        return {
          ...store,
          loading: true,
          error: false,
        };
  
      case DATASUCCESS :
        return {
          ...store,
          loading: false,
          error: false,
          fetchData: payload,
        };
  
      case DATAFAIL : 
        return {
          ...store,
          error: true,
          loading: false,
        };
  
    
      default:
        return{
            store

        } 
    }
  };
  

  export default dataReducer;