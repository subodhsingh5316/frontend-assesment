import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Logger from './Component/Logger';
import { useDispatch, useSelector } from 'react-redux';
import { GetData } from './redux/User/action';
function App() {
  const [data, setData] = useState([]);
  let dispatch = useDispatch();
  const [loading, setLoading ] =useState(false)
  const [ currentPage,setCurrentPage]  = useState(1)
  const [dataPerPage, setDataPerPage] = useState(7)

  useEffect(() => {
    // getData()
 
  },[dispatch,currentPage,dataPerPage])
  return (
    <div className="">
      {loading && (
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      )}
      <div className='shadow-sm p-3 mb-3 bg-body rounded'>
        <Logger />
      </div>
     <div>
       {/* <div className='float-end mx-5'>
        <Pagination 
        variant ='outlined'
        color='primary'
        count={10}
        onChange={(event,value)=>{
          setCurrentPage(value)
        }}
         />
      </div> */}
     </div>
    </div>
  );
}

export default App;
