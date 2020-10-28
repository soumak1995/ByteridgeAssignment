import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Navbar, Nav } from 'react-bootstrap';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
class Auditpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dateFormat: '12hr'
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
      }
    componentDidMount() {
        this.props.getUsers();
        localStorage.removeItem('role');
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
   convertDateTo12Hour(d){
    var dformat = [
        d.getFullYear(), d.getDate(),d.getMonth()+1
        ].join('/')+' '+
       [d.getHours()%12|| 12,
        d.getMinutes(),
        d.getSeconds()].join(':');
     return dformat;
   }
  convertDateTo24Hour(date){
   var month = '' + (date.getMonth() + 1);
    var   day = '' + date.getDate();
     var year = date.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

 var dateStr=[year, month, day].join('/');
  let formattedTime = date.getHours() + ":" + date.getMinutes() +":" + date.getSeconds();
        return dateStr+" "+formattedTime;
};
handleDropdownChange(e){
    console.log(e.target.value)
    this.setState({ dateFormat: e.target.value});
}
    // function 
    render() {
        const { user, users } = this.props;
        
        const columns=[
            {dataField:"_id",text:"Id", 
            headerStyle: () => {
                return { width: "30%" };
              }},
            {dataField:"role",text:"Role",sort: true},
            {dataField:"createdDate",text:"CreatedDate", sort: true,
            formatter: (_, col) => {
                return this.convertDateTo12Hour(new Date(col.createdDate));
            }},
            {dataField:"firstName",text:"firstName",
            filter: textFilter()},
            {dataField:"lastName",text:"lastname"},
            {dataField:"",text:"Delete",
            formatter: (_, col) => {
                return col.deleting ? <em> - Deleting...</em>
                : col.deleteError ? <span className="text-danger"> - ERROR: {col.deleteError}</span>
                    : <span> <a onClick={this.handleDeleteUser(col.id)}>Delete</a></span>
            }},
        ];
        
        const hrcolumns=[
            {dataField:"_id",text:"Id", 
            headerStyle: () => {
                return { width: "30%" };
              }},
            {dataField:"role",text:"Role",sort: true},
            {dataField:"createdDate",text:"CreatedDate", sort: true,
            formatter: (_, col) => {
                return this.convertDateTo24Hour(new Date(col.createdDate));
            }},
            {dataField:"firstName",text:"firstName",
            filter: textFilter()},
            {dataField:"lastName",text:"lastname"},
            {dataField:"",text:"Delete",
            formatter: (_, col) => {
                return col.deleting ? <em> - Deleting...</em>
                : col.deleteError ? <span className="text-danger"> - ERROR: {col.deleteError}</span>
                    : <span> <a onClick={this.handleDeleteUser(col.id)}>Delete</a></span>
            }},
        ];
       
        
      
        
        return (

            <div>

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link href="#features">Auditor</Nav.Link>
                        <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar>
                <div className="col-md-12">
                    <section className="col-md-offset-3">
                            <h1>Hi {user.firstName}!</h1>
                            <p>You're logged in with React!!</p>
                           
                            {users.loading && <em>Loading users...</em>}
                            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                   
                    </section>
                    <div className="row">
                        <div className="col-md-8"> 
                           <h3>All login audit :</h3>
                        </div>
                            
                            <div className="col-md-4">
                            <select style={{width:"30!important"}} onClick={this.handleDropdownChange} className="form-control" >
                            
                            <option value="12hr">Date/Time 12hr</option>
                            <option value="24hr">Date/Time 24hr</option>
                        </select>
                            </div>
                    </div>
                   
                    
                   <br/>
                   {users.items && 
                     this.state.dateFormat==='12hr'&&

                     <BootstrapTable
                        keyField="_id"
                        data={users.items}
                        columns={columns}
                        pagination={paginationFactory()
                        }
                        striped  
                            hover  
                        filter={ filterFactory() }
                        />
                       
              }{
                users.items && 
                this.state.dateFormat==='24hr' &&
                <BootstrapTable
                keyField="_id"
                data={users.items}
                columns={hrcolumns}
                pagination={paginationFactory()
                }
                striped  
                    hover  
                filter={ filterFactory() }
                />
              }
                
                </div>
            </div>
        );
    }
}
function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user:user,
        users:users
    }
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };