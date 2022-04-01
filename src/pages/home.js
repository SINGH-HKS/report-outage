import React, {  useRef, useReducer } from 'react'
import { TextField, FormControl, Button, Paper } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Form } from 'react-bootstrap';


export default function Home(props) {
    const nameRef = useRef()
    const companyRef = useRef()
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: "",
            company: "",
            nameErrorStatus: false,
            nameErrorMessage: "",
            companyErrorStatus: false,
            companyErrorMessage: "",
            formError: "",
            successMessage:"",
            formValidated: false,
            startDateTime: new Date(),
            endDateTime: new Date()

        }
    );
    const handleName = (value) => {
        // console.log(value)
        if (value === '') {
            setState({ name: value, nameErrorStatus: true, nameErrorMessage: 'Please enter your name',successMessage:"" })
        }
        else {
            setState({ name: value, nameErrorStatus: false, nameErrorMessage: '',successMessage:"" })
        }

    }
    const handleCompany = (value) => {
        if (value === '') {
            setState({ company: value, companyErrorStatus: true, companyErrorMessage: 'Please enter application name',successMessage:"" })
        }
        else {
            setState({ company: value, companyErrorStatus: false, companyErrorMessage: '',successMessage:"" })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var start = Date.parse(state.startDateTime)
        var end = Date.parse(state.endDateTime)
        var current = Date.parse(new Date())
        // console.log(Date.parse(state.startDateTime))
        // console.log(Date.parse(state.endDateTime))
        // console.log(Date.parse(new Date()))
        if (start < current && end < current) {
            if (start === end) {
                // console.log("start<current && end<current---->" + 'Start and End Time cannot be same')
                setState({ formError: "Start and End Time cannot be same" })
            }
            else if (start < end) {
                // console.log('start<current && end<current----->' + 'Time is correct')
                var records = JSON.parse(localStorage.getItem("records"))
                var obj1 = {
                    "name": state.name,
                    "application": state.company,
                    "outageStart": state.startDateTime,
                    "outageEnd": state.endDateTime
                }
                records = [...records, obj1]
                // console.log('records being printed', records)
                localStorage.setItem("records",JSON.stringify(records))
                setState({ formError: "", name: "", company: "", nameErrorMessage: "", companyErrorMessage: "",successMessage:"Record saved successfully!" })
            }
            else {
                // console.log("start<current && end<current---->" + 'Start time cannot past the end time')
                setState({ formError: "Start time cannot past the end time" })
            }
        }
        if (start == current && end == current) {
            // console.log("start==current && end==current----->" + 'Start and End Time cannot be same')
            setState({ formError: "Start and End Time cannot be same as current time" })
        }
        if (start > current || end > current) {
            // console.log("start>current || end>current---->" + 'Start or End Time cannot past the current time')
            setState({ formError: "Start or End Time cannot past the current time" })
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={`${props.mode=='light'?'bg-light':'bg-dark'}`} style={{height:'100vh'}}>
                <div className='d-flex justify-content-center'>
                    <h1 className={`${props.mode=='light'?'text-dark':'text-light'} display-3`}>Register Outage</h1>
                </div>
                <div className='d-flex justify-content-center mt-4'>
                
                    <Form onSubmit={(e) => handleSubmit(e)} component={Paper}>
                        <div className='mb-4'>
                            <FormControl fullWidth>
                                <TextField
                                    ref={nameRef}
                                    error={state.nameErrorStatus}
                                    label="Enter your name"
                                    id="outlined-error-helper-text"
                                    value={state.name}
                                    helperText={state.nameErrorMessage}
                                    variant="outlined"
                                    onChange={(e) => handleName(e.target.value)}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-4'>
                            <FormControl fullWidth>
                                <TextField
                                    ref={companyRef}
                                    error={state.companyErrorStatus}
                                    label="Application Name"
                                    id="outlined-error-helper-text"
                                    helperText={state.companyErrorMessage}
                                    variant="outlined"
                                    value={state.company}
                                    onChange={(e) => handleCompany(e.target.value)}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-4'>
                            <FormControl fullWidth>
                                <DateTimePicker
                                    label="Start Date and Time"
                                    value={state.startDateTime}
                                    onChange={(value) => setState({ startDateTime: value })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-4'>
                            <FormControl fullWidth>
                                <DateTimePicker
                                    label="End Date and Time"
                                    value={state.endDateTime}
                                    onChange={(value) => setState({ endDateTime: value })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                        </div>
                        <div className='mb-2'>
                            <FormControl fullWidth>
                                <Button variant="contained" type='submit' disabled={!(state.name && state.company)}>
                                    Save Record
                                </Button>
                            </FormControl>

                        </div>
                        {state.successMessage?
                         <div className="text-success text-wrap">
                         <FormControl fullWidth>
                             {state.successMessage}
                         </FormControl>
                     </div>: <div className="text-danger text-wrap">
                            <FormControl fullWidth>
                                {state.formError}
                            </FormControl>
                        </div>}
                       

                    </Form>


                </div>
            </div>
        </LocalizationProvider>
    )
}
