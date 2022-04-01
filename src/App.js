import React,{useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home";
import View_graph from "./pages/view_graph";
import View_records from "./pages/view_records";
import Header from "./component/header";
import IconButton from '@mui/material/IconButton';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });



function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  
  useEffect(() => {
    if (localStorage.getItem('records') == null) {
      var obj=[
        {
          name:"Aman",
          application:"XYZ",
          outageStart:new Date('2022-03-18T21:00:00'),
          outageEnd:new Date('2022-03-18T22:00:00')
        },
        {
          name:"Jack",
          application:"ABC",
          outageStart:new Date('2022-03-19T21:00:00'),
          outageEnd:new Date('2022-03-18T22:00:00')
        },
        {
          name:"KHUSH",
          application:"XYZ",
          outageStart:new Date('2022-03-22T18:00:00'),
          outageEnd:new Date('2022-03-22T20:00:00')
        },
      ]
      localStorage.setItem('records',JSON.stringify(obj))
  } else {
     
  }
  
  }, [])
  


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home mode={mode}/>} />
            <Route exact path="/view-records" element={<View_records mode={mode}/>} />
            <Route exact path="/view-graph" element={<View_graph mode={mode}/>} />
          </Routes>
        </Router >

      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
