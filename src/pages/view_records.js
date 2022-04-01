import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function View_records(props) {
    const [records, setRecords] = useState()

    useEffect(() => {
        var fetchedData = JSON.parse(localStorage.getItem('records'))
        setRecords(fetchedData)
        // console.log(fetchedData)
    }, [])
    return (
        <div className={`${props.mode == 'light' ? 'bg-light' : 'bg-dark'}`} style={{ height: '100vh' }}>
            <div className='d-flex justify-content-center'>
                <h1 className={`${props.mode == 'light' ? 'text-dark' : 'text-light'} display-3`}>View Records</h1>
            </div>
            <div className='container'>
                {/* <Suspense fallback="Data is being loaded..."> */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell rowSpan={2}>Customer Name</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>Application</StyledTableCell>
                                <StyledTableCell align="center" colSpan={2}>Outage Start (DD/MM/YYYY,HH:MM:SS))</StyledTableCell>

                                <StyledTableCell align="center" colSpan={2}>Outage End (DD/MM/YYYY,HH:MM:SS))</StyledTableCell>
                            </TableRow>
                            <TableRow>

                                <StyledTableCell align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Time</StyledTableCell>


                                <StyledTableCell align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Time</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records && records.length > 0 ? records.map((record,index) => {
                                let date=new Date(record.outageStart)
                                let date1=new Date(record.outageEnd)
                                const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
                                const [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
                                const [month1, day1, year1] = [date.getMonth(), date.getDate(), date.getFullYear()];
                                const [hours1, minutes1, seconds1] = [date1.getHours(), date1.getMinutes(), date1.getSeconds()];
                                // console.log(day+"/"+month+"/"+year)
                                // console.log('record=====<'+record+"------"+start.getTime()+"------"+record.outageStart)
                                return <StyledTableRow key={record.name + record.application+index}>
                                    <StyledTableCell component="th" scope="row">
                                        {record.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{record.application}</StyledTableCell>
                                    <StyledTableCell align="center">{day+"/"+month+"/"+year}</StyledTableCell>
                                    <StyledTableCell align="center">{hours+":"+minutes+":"+seconds}</StyledTableCell>
                                    <StyledTableCell align="center">{day1+"/"+month1+"/"+year1}</StyledTableCell>
                                    <StyledTableCell align="center">{hours1+":"+minutes1+":"+seconds1}</StyledTableCell>
                                </StyledTableRow>
                            }) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* </Suspense> */}
            </div>
        </div>
    )
}
