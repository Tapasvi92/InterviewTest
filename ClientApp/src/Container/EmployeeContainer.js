import Employee from "../Component/Employee";
import { connect } from 'react-redux';
// import { login } from '../Service/Actions/action';
//import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { environment } from "../environment";

let auth = null;
let user1 = null;
const mapStatetoProps = state => ({
    data:state
})

const mapDispatchToProps = dispatch => ({

    EmpListHandler: async () => {
        let result = await fetch(environment.SERVER_URL + "/Employees", {
            method: 'get',
          });
          result = await result.json();
       
        return result;

    },

    IncrementHandler: async (data) => {
        let result = await fetch(environment.SERVER_URL + "/Employees/"+ data, {
            method: 'post',
          });
          result = await result.json();
       
         

       
        return result;

    },

    ListofSumHandler: async () => {
        let result = await fetch(environment.SERVER_URL + "/Employees/1", {
            method: 'get',
          });
          result = await result.json();
          
        return result;

    },

    AddEmpHandler: async (data) => {
        if (localStorage.getItem('authUser')) {
            auth = JSON.parse(localStorage.getItem('authUser'));
             
        }
      
        let result = await fetch(environment.SERVER_URL+"/Employees", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
      
        return result;

    },

    UpdateEmpHandler: async (data,user) => {
        if (localStorage.getItem('authUser')) {
            auth = JSON.parse(localStorage.getItem('authUser'));
          

        }
       
        let result = await fetch(environment.SERVER_URL+"/Employees", {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
        
        return result;

    },

    DeleteEmpsHandler: async (data) => {
        if (localStorage.getItem('authUser')) {
            auth = JSON.parse(localStorage.getItem('authUser'));
        }
      
        let result = await fetch(environment.SERVER_URL+"/Employees/"+data, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json();
       
        return result;

    },
})

export default connect(mapStatetoProps,mapDispatchToProps)(Employee)