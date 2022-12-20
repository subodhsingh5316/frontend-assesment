import { Button, Container, Input, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableData from './TableData';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { dataSucces, GetData, dataLoading } from '../redux/User/action';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        root: {
            width: 300,
        },
    },
}));

const Logger = (props) => {
    // const {Totaldata} = props
    // // let user = useSelector(store => store.Data);
    // const data = Totaldata?.fetchData?.result?.auditLog
    const [filterData, setFilterData] = useState([])
    const [data, setData] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch()
    console.log("data", data)
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const {logId, actionType, applicationType, applicationId} = params;

    useEffect(() => {
        const getParams = () => {
            let temp = {};
            Object.keys(searchField).forEach((key) => {
                if (params[key]) {
                    temp[key] = params[key]
                }
            })
            return temp;
        }
        setSearchField(s => ({ ...s, ...getParams() }))
        filterCallData(data);
    }, [logId, actionType, applicationType, applicationId])



    const getData = async () => {
        const result = await axios.get(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`)
        // console.log("123",result.data)
        setData(result.data?.result?.auditLog)
        setFilterData(result.data?.result?.auditLog)
    }
    useEffect(() => {
        getData()
        // action()
        // filterCallData(data)
    }, [])
    useEffect(() => {
        action()
        application()
    }, [data])
    const [searchField, setSearchField] = useState({
        logId: "",
        applicationId: "",
        applicationType: '',
        actionType: '',
        fromDate: '',
        toDate: ''
    });
    const [searchShow, setSearchShow] = useState(false);
    const [actionDataType, setActionDataType] = useState()
    const [applicationDataType, setApplicationDataType] = useState()


    const action = async () => {
        const s1 = new Set();
        data.forEach(({ actionType }) => {
            if (actionType !== null) {
                s1.add(actionType)
            }
        })
        setActionDataType([...s1])
    }
    const application = async () => {
        const s1 = new Set();
        data.forEach(({ applicationType }) => {
            if (applicationType !== null) {
                s1.add(applicationType)
            }
        })
        setApplicationDataType([...s1])
    }

    //  setActionDataType(arr)
    // },[])
    //  return setActionDataType(arr)


    console.log("setActionDataType", applicationDataType)
    const findIfBetween = (
        creationTimestamp,
        fromDate,
        toDate
    ) => {
        let created = new Date(creationTimestamp).getTime();
        let from = new Date(fromDate).getTime();
        let to = new Date(toDate).getTime();
        return created >= from && created <= to;
    };

    const filterCallData = (data) => {
        let temp = "?"
        Object.keys(searchField).forEach((key) => {
            if (searchField[key]) {
                temp = temp + `${key}=${searchField[key]}&`
            }
        })
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + temp;
        window.history.pushState({ path: newurl }, '', newurl);
        console.log(temp)
        console.log("ram")
        const currentData = data?.filter((item) => {
            console.log("search", searchField?.logId.length)
            if (searchField?.logId.length === 0 && searchField?.applicationId.length === 0 && searchField?.actionType.length === 0 && searchField?.applicationType.length === 0 && searchField?.fromDate.length === 0 && searchField?.toDate.length === 0) {
                console.log("11", searchField, searchField)
                console.log("item", item)
                return data
            } else {
                console.log("search-", searchField?.logId.length)
                return (
                    item?.logId === Number(searchField.logId) ||
                    findIfBetween(item?.creationTimestamp, searchField.fromDate, searchField.toDate) ||
                    item?.applicationId === Number(searchField.applicationId) ||
                    item?.actionType === searchField.actionType ||
                    item?.applicationType === searchField.applicationType
                )
            }
        })
        console.log(currentData, "filterdata")
        setFilterData(currentData)
    }
    const handleChange = e => {
        console.log('onchange', e.target.value)
        setSearchField({ ...searchField, [e.target.name]: e.target.value });
        action()
    };


    const handleOnsubmit = (e) => {
        e.preventDefault()
        if (e.target.value == "") {
            setSearchShow(false);
        }
        else {
            setSearchShow(true);
            filterCallData(data)
        }
    }



    return (
        <>
            <Container >
                <div>
                    <small><span className='text-primary'>Home</span> {">"} <span className='text-primary'>Administration</span> {">"} <span className='text-secondary'>Logger Search</span></small>
                </div>
                <hr />
                <form onSubmit={(e) => { handleOnsubmit(e) }}>
                    <div >
                        <div className='d-flex justify-content-between'>
                            <div className='my-1 fw-bold'>
                                <Typography variant='inherit' align='left'> Employees name </Typography>
                                <input className='form-control form-control-sm input-sm ' size='small' id="outlined-basic" variant="outlined" name='logId' value={searchField.logId} onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className='m-1 ml-1 fw-bold w-25'>
                                <Typography variant='inherit' align='left'> Action type </Typography>
                                <select className="form-select form-select-sm input-sm" aria-label="Default select example" name='actionType' onChange={(e) => { handleChange(e) }} value={searchField.actionType}>
                                    <option value="action-t">{" "}</option>
                                    {actionDataType?.map(item => (<option>{item}</option>))}
                                </select>
                            </div>
                            <div className='m-1 fw-bold w-25'>
                                <Typography variant='inherit' align='left'> Application Type </Typography>
                                <select className="form-select form-select-sm input-sm" aria-label="Default select example" name='applicationType' value={searchField.applicationType} onChange={(e) => { handleChange(e) }}>
                                    <option value="aplication-type">{" "}</option>
                                    {applicationDataType?.map(item => (
                                        <option>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='m-1 fw-bold'>
                                <Typography variant='inherit' align='left'> From Date </Typography>
                                <input type="date" my-datetime-local-format="DD/MM/YYYY, hh:mm:ss" defaultValue="none" className='form-control form-control-sm input-sm ' size='small' id="outlined-basic" variant="outlined" name='fromDate' value={searchField.fromDate} onChange={(e) => { handleChange(e) }}/>
                            </div>
                            <div className='m-1 fw-bold'>
                                <Typography variant='inherit' align='left'> To Date </Typography>
                                <input type="date" my-datetime-local-format="DD/MM/YYYY, hh:mm:ss" defaultValue="none" className='form-control form-control-sm input-sm ' size='small' id="outlined-basic" variant="outlined" name='toDate' value={searchField.toDate} onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className='m-1 fw-bold'>
                                <Typography variant='inherit' align='left'> Application ID </Typography>
                                <input className='form-control form-control-sm input-sm ' size='small' id="outlined-basic" variant="outlined" name='applicationId' value={searchField.applicationId} onChange={(e) => { handleChange(e) }} />
                            </div>
                            <div className='w-25' style={{ marginTop: "28px" }}>
                                <Button type='submit' fullWidth size='small' variant="contained" color="primary" >Search Logger</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
            <TableData data={filterData} />
        </>
    )
}

export default Logger