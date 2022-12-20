import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  // Pagination,
} from '@material-ui/core';
import { Pagination, Skeleton } from '@material-ui/lab';
import "./TableData.css";
import { useDispatch, useSelector } from 'react-redux';
import { dataSucces, GetData } from '../redux/User/action';
import { VerticalAlignBottomOutlined } from '@material-ui/icons';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableData = (props) => {
  const { data } = props;

  console.log("length",data.length)
  console.log("table", data)
  const classes = useStyles();
  let dispatch = useDispatch();
  let [userData, setUserData] = useState([]);
  let [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [uparraow, setUparrow] = useState(false)


  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data?.slice(indexOfFirstData, indexOfLastData);



  const sortDEC = (val) => {

    if (val == "DEC") {
      console.log("dec", val);
      let newData = data.sort((a, b) => {
        return Number(b.logId) - Number(a.logId)
      })
      setUserData(newData);
      console.log("userData", userData)
      console.log(userData, "u");
    }
    if (val == "action") {
      console.log(val);
      const newData = data.sort((a, b) => {
        return b.actionType.charCodeAt(0) - a.actionType.charCodeAt(0);;
      });
      setUserData(newData);

      console.log(userData, "u");
    }
    if (val == "applicationType") {
      console.log(val);
      const newData = data.sort((a, b) => {
        if (a.applicationType !== null && b.applicationType !== null) {
          console.log("1223434", a.applicationType.charCodeAt(0))
          return b.applicationType.charCodeAt(0) - a.applicationType.charCodeAt(0);;
        }

      });
      setUserData(newData);

      console.log(userData, "u");
    }
    if (val == "applicationId") {
      console.log(val);
      const newData = data.sort((a, b) => {
        if (a.applicationId !== null && b.applicationId !== null) {
          return Number(b.applicationId) - Number(a.applicationId)
        }
      });
      setUserData(newData);

      console.log(userData, "u");
    }
    if (val == "Date") {
      console.log(val);
      const newData = data.sort((a, b) => {
        if (a.creationTimestamp !== null && b.creationTimestamp !== null) {
          let created = new Date(a.creationTimestamp).getTime();
          console.log("wwww", created)
          return Number(new Date(b.creationTimestamp).getTime()) - Number(new Date(a.creationTimestamp).getTime())
        }
      });
      setUserData(newData);

      console.log(userData, "u");
    }
    setUserData(data)
    //  return setUserData(newData)
  }

  const sortASC = (val) => {

    if (val == "DEC") {
      console.log("dec", val);
      let newData = data.sort((a, b) => {
        return Number(a.logId) - Number(b.logId)
      })
      setUserData(newData);
      console.log("userData", userData)
      console.log(userData, "u");
    }
    if (val == "action") {
      console.log(val);
      const newData = data.sort((a, b) => {
        return a.actionType.charCodeAt(0) - b.actionType.charCodeAt(0);;
      });
      setUserData(newData);

      console.log(userData, "u");
    }
    if (val == "applicationType") {
      console.log(val);
      const newData = data.sort((a, b) => {
        if (a.applicationType !== null && b.applicationType !== null) {
          console.log("1223434", a.applicationType.charCodeAt(0))
          return a.applicationType.charCodeAt(0) - b.applicationType.charCodeAt(0);;
        }

      });
      setUserData(newData);

      console.log(userData, "u");
    }
    if (val == "applicationId") {
      console.log(val);
      const newData = data.sort((a, b) => {
        if (a.applicationId !== null && b.applicationId !== null) {
          return Number(a.applicationId) - Number(b.applicationId)
        }
      });
      setUserData(newData);

      console.log(userData, "u");
    }
    if (val == "Date") {
      console.log(val);
      const newData = data.sort((a, b) => {
        if (a.creationTimestamp !== null && b.creationTimestamp !== null) {
          let created = new Date(a.creationTimestamp).getTime();
          console.log("wwww", created)
          return Number(new Date(a.creationTimestamp).getTime()) - Number(new Date(b.creationTimestamp).getTime())
        }
      });
      setUserData(newData);

      console.log(userData, "u");
    }
    setUserData(data)
    //  return setUserData(newData)
  }
  //pagination .....
  const selectPageHandler = (val) => {
    if (val >= 1 && val <= data.length / 10 && val !== page) {
      setPage(val)
    }
  }


  useEffect(() => {
    if (data?.length < 0) {
      setLoading(true)
    } else {
      setLoading()
    }
    setUserData(currentData)
    dispatch(GetData())
  }, [])
  const handleSort = (val) => {

    if (!uparraow) {
      sortDEC(val)
      setUparrow(!uparraow)
    } else {
      console.log(uparraow)
      sortASC(val)
      setUparrow(false)
    }
  }
  // if(loading){
  //   return <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" />
  // }
  // if(error){
  //   return <h1>Error......</h1>
  // }
  return (
    <Container>
      {loading && (<div className={classes.root}>
        <Skeleton />
        <Skeleton animation={false} />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>)}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='fw-bold !important' align='center'>Log ID
                <span className='rounded-circle border border-primary' onClick={() => { handleSort("DEC") }}>
                  {
                    !uparraow ? (<i className='fa fa-arrow-up text-primary p-1'></i>) : (<i className='fa fa-arrow-down text-primary p-1'></i>)
                  }</span>
              </TableCell>
              <TableCell className='fw-bold !important' align='center'>Application Type <span className='rounded-circle border border-primary' onClick={() => { handleSort("applicationType") }}>{
                !uparraow ? (<i className='fa fa-arrow-up text-primary p-1'></i>) : (<i className='fa fa-arrow-down text-primary p-1'></i>)
              }</span>
              </TableCell>
              <TableCell className='fw-bold !important' align='center'>Application ID <span className='rounded-circle border border-primary' onClick={() => { handleSort("applicationId") }}  >{
                !uparraow ? (<i className='fa fa-arrow-up text-primary p-1'></i>) : (<i className='fa fa-arrow-down text-primary p-1'></i>)
              }</span> &nbsp;
              </TableCell>
              <TableCell className='fw-bold !important' align='center'>Action&nbsp; <span className='rounded-circle border border-primary' onClick={() => { handleSort("action") }}>{
                !uparraow ? (<i className='fa fa-arrow-up text-primary p-1'></i>) : (<i className='fa fa-arrow-down text-primary p-1'></i>)
              }</span>
              </TableCell>
              <TableCell className='fw-bold !important' align='center'>Action Details&nbsp; <span className='rounded-circle border border-primary'>{
                !uparraow ? (<i className='fa fa-arrow-up text-primary p-1'></i>) : (<i className='fa fa-arrow-down text-primary p-1'></i>)
              }</span>
              </TableCell>
              <TableCell className='fw-bold !important' align='center'>Date: Time&nbsp; <span className='rounded-circle border border-primary' onClick={() => { handleSort("Date") }}>{
                !uparraow ? (<i className='fa fa-arrow-up text-primary p-1'></i>) : (<i className='fa fa-arrow-down text-primary p-1'></i>)
              }</span></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData && currentData?.map((row, index) => {
              return (
                <TableRow key={row?.logId}>
                  <TableCell component="th" scope="row">
                    {row?.logId}
                  </TableCell>
                  <TableCell align="center">{row.applicationType}</TableCell>
                  <TableCell align="center">{row.applicationId}</TableCell>
                  <TableCell align="center">{row.actionType}</TableCell>
                  <TableCell align="center">{"../.."}</TableCell>
                  <TableCell align="center">{row.creationTimestamp}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='float-end mx-5'>
        <Pagination
          variant='outlined'
          color='primary'
          count={Math.ceil(data?.length/10)}
          onChange={(event, value) => {
            setCurrentPage(value)
          }}
        />
      </div>
    </Container>
  )
}

export default TableData