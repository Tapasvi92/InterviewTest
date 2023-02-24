import React,{useEffect} from 'react';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Item,
  IconButton,
  Button
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
  imgproduct: {
    width: '20px',
    height: 'auto',
  },
});

export default function Employee(props) {
  console.warn("Employee props",props)
  const classes = useStyles();
  const dispatch = useDispatch()
  const [AddEmp, setAddEmp] = React.useState(false);
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState('');
  const [Flag, setFlag] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [employees,setEmployees]=React.useState([]);
  const [listofsum,setlistofsum]=React.useState([]);

  const handleAddEmpModalClose = () => setAddEmp(false);
  const handleAddEmpModalShow = () => setAddEmp(true);

  //let listofsum = {};

  useEffect(()=>{
    getEmpList();
    onListOfSum();
  },[])

  const getEmpList = () =>{
    props.EmpListHandler().then((res) =>{
      
        setEmployees(res);
        // dispatch(Employee(res))
        console.warn("propsss",props);
    })
  }

  const onCancel = () => {
    handleAddEmpModalClose();
    setName('');
    setValue('');
  }
  const AddEmployee = () => {
    setFlag(false);
    handleAddEmpModalShow()
  }

  const UpdateEmployee = (data) => {
    setName(data.name);
    setValue(data.value);
    console.warn("dataaa",data);
    setFlag(true);
    handleAddEmpModalShow()
  }

  const onSave = () => {
    if (!name || !value) {
      setError(true);
      return false;
    } else {
      props.AddEmpHandler({name,value}).then((res)=>{
        console.warn("add emp",res);
        handleAddEmpModalClose();
        getEmpList();
        onListOfSum();
        setName('');
        setValue('');
      })
      console.warn("name,value", name, value);
    }
  }

  const onUpdate = () => {
    if (!name || !value) {
      setError(true);
      return false;
    } else {
      props.UpdateEmpHandler({name,value}).then((res)=>{
        console.warn("add emp",res);
        handleAddEmpModalClose();
        getEmpList();
        onListOfSum();
        setName('');
        setValue('');
      })
      console.warn("name,value", name, value);
    }
  }

  const DeleteEmployee = (data) => {

    props.DeleteEmpsHandler(data.name).then((res)=>{
      console.warn("Delete",res)
      getEmpList();
      onListOfSum();
    })

  }

  const onIncrement = (data) =>{
    props.IncrementHandler(data.name).then((res)=>{
      getEmpList();
      onListOfSum();
    })
  }

  const onListOfSum = (data) =>{
    props.ListofSumHandler().then((res)=>{
     
     setlistofsum(res);
   
    })
  }
  return (
    <React.Fragment>
      <Grid container spacing={3}  className='SetFont'>
        <Grid item >
          <Card style={{ width: '1000px',  marginTop: '50px', marginBottom: '70px', marginLeft: '400px' }}>
            <CardContent>
              <div>
                <span style={{ fontSize: '16px' }} className='setFontFamily'><b>Employee List</b></span>
               
                <Button variant="contained" style={{ float: 'right', backgroundColor: 'cornflowerblue' }} onClick={AddEmployee}><span className='addButton'>Add New</span></Button>
              </div>
             <br></br><hr></hr>
             <span style={{float:'left',marginLeft:'30px'}}> <h4>A = {listofsum.a}</h4></span>
              <span style={{float:'left',marginLeft:'30px'}}> <h4>B = {listofsum.b}</h4></span>
              <span style={{float:'left',marginLeft:'30px'}}> <h4>C = {listofsum.c}</h4></span>            
             
              <br></br><br></br><br></br><hr></hr>
              

             

              <Dialog open={AddEmp} onClose={handleAddEmpModalClose} sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "500px",  // Set your width here
                  },
                },
              }}>
                {
                  Flag
                    ?
                    <> <DialogTitle><span className='SetFont'>Edit Employee</span></DialogTitle></>
                    :
                    <> <DialogTitle><span className='SetFont'>Add Employee</span></DialogTitle></>
                }

                <Divider></Divider>
                <DialogContent>
                  <DialogContentText>
                    <span className='setFontFamily'>Name</span>
                  </DialogContentText>
                  <input type='text' placeholder='Enter Name' className='form-control'
                    value={name} onChange={(e) => { setName(e.target.value) }} disabled={Flag ? true : false}></input>
                  {error && !name && <><span className='error-label'>Name is required</span><br></br></>}

                  <DialogContentText style={{ marginTop: '15px' }}>
                    <span className='setFontFamily'>Value</span>
                  </DialogContentText>
                  <input type='number' placeholder='Enter Value' className='form-control'
                    value={value} onChange={(e) => { setValue(e.target.value) }}></input>
                  {error && !value && <span className='error-label'>Value is required</span>}
                </DialogContent>
                <Divider></Divider>
                <DialogActions>
                  {
                    Flag
                      ?
                      <><Button variant="contained" onClick={onUpdate} style={{ backgroundColor: 'cornflowerblue' }}><span className='addButton'>Update</span></Button></>
                      :
                      <><Button variant="contained" onClick={onSave} style={{ backgroundColor: 'cornflowerblue' }}><span className='addButton'>Save</span></Button></>

                  }

                  <Button variant="contained" onClick={onCancel} style={{ backgroundColor: 'cornflowerblue' }}><span className='addButton'>Cancel</span></Button>
                </DialogActions>

              </Dialog>

              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '100px', textAlign: 'center', fontSize: '15px' }}><b>#</b></TableCell>
                      <TableCell style={{ width: '200px', textAlign: 'center', fontSize: '15px' }}><b>Name</b></TableCell>
                      <TableCell style={{ width: '200px', textAlign: 'center', fontSize: '15px' }}><b>Value</b></TableCell>
                      <TableCell style={{ width: '200px', textAlign: 'center', fontSize: '15px' }}><b>Increment</b></TableCell>
                      <TableCell style={{ width: '200px', textAlign: 'center', fontSize: '15px' }}><b>Action</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.length >0 
                    ?
                    employees.map((res,i)=>(
                      <TableRow style={{ textAlign: 'center' }}>
                      <TableCell style={{ textAlign: 'center' }}>{i+1}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{res.name}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} >{res.value}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} ><Button variant="contained" onClick={() => onIncrement(res)} style={{ backgroundColor: 'cornflowerblue' }}><span className='addButton'>+</span></Button></TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <IconButton color="primary">
                          <EditOutlinedIcon onClick={()=>UpdateEmployee(res)} />
                        </IconButton>
                        <IconButton color="inherit">
                          <DeleteOutlineOutlinedIcon onClick={()=>DeleteEmployee(res)} />
                        </IconButton>
                      </TableCell>
                      </TableRow>
                    )
                    )
                    :''
                    }

                  </TableBody>
                </Table>
              </TableContainer>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </React.Fragment>
  )
}
