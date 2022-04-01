import React, { useState,  useEffect } from 'react'
import {  CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { Grid } from '@mui/material';


export default function View_graph(props) {
    const [data, setData] = useState()
    const [data1, setData1] = useState()
    const [barWidth,setBarWidth]=useState(10)

    useEffect(() => {
        var fetchedData = JSON.parse(localStorage.getItem('records'))
        var obj1 = {}
        fetchedData.forEach(element => {
            if (obj1[element.application]) {
                obj1[element.application] += 1
            }
            else {
                obj1[element.application] = 1
            }
        });
        var op1 = Object.keys(obj1).map(data => {

            return { 'application': data, 'complaints': obj1[data] }
        })
        setData(op1)
        setData1(op1)
        setBarWidth(Math.floor(window.innerWidth/op1.length))
        // console.log('op1', op1)
    }, [])

    const handleChange = (e) => {
        if (e.target.value == "Select any one") {
            setData1(data)

        }
        else {
            setData1(data.filter(obj => obj.application == e.target.value))
        }
    }

    // const data1 = [{ name: 'Page A', uv: 10, pv: 2400, amt: 2400 }];
    return (
        <div className={`${props.mode == 'light' ? 'bg-light' : 'bg-dark'} `} style={{ height: '100vh' }}>
            <div className='d-flex justify-content-center mb-4'>
                <h1 className={`${props.mode == 'light' ? 'text-dark' : 'text-light'} display-3`}>Graphical Representation</h1>
            </div>
            <div className=' d-flex justify-content-center ' style={{  width: window.innerWidth }}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent=""
                    
                // style={{ minHeight: '100vh' }}
                >
                    {/* <Grid item xs={3}> */}

                    <BarChart width={window.innerWidth-Math.floor(window.innerWidth*0.1)}  height={400} data={data1} >
                        <Bar dataKey="complaints" barSize={barWidth?barWidth:100} color="#32a897" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="application" />
                        <YAxis />
                        <Tooltip  />
                    </BarChart>
                    </Grid>
                {/* </Grid> */}
                </div>
            <select className="form-select container" aria-label="Default select example" onChange={(e) => handleChange(e)}>
                <option value="Select any one">Select any one</option>
                {data ? data.map(val => {
                    return <option key={val.application + 'company'} value={val.application}>{val.application}</option>
                }) : null}
                {/* <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option> */}
            </select>
            
        </div>

     
    )
}
