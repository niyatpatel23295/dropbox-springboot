import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Redirect} from 'react-router';
var fileDownload = require('react-file-download');
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};
class Welcome extends Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
        handleLogout: PropTypes.func.isRequired
    };

    state = {
        username : '',
        email: '',
        files: [],
        folders: [],
        activity: ["None"]
    };

    componentWillMount(){
        console.log("will mount -->", localStorage.getItem('activity'))
        this.setState({

            username : localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            firstname: localStorage.getItem('firstname'),
            lastname: localStorage.getItem('lastname'),
            activity: ["None","Niyat"]
        });
        //document.title = `Welcome, ${this.state.username} !!`;

    }

    componentDidMount(){
       var self = this;
        document.title = `Welcome, ${this.state.username} !!`;
        fetch(`${api}/listdir`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify({"username": this.state.username})
        }).then(res => {
            res.json().then(function(res_json){

                self.setState({
                    files: res_json.data.files,
                    folders: res_json.data.folders
                });
            })
        })
        .catch(error => {
            console.log(error);
            
        });
    }

    render(){

        if(this.state.username){

            var files = this.state.files;
            var folders = this.state.folders;
            var activity = this.state.activity;
            var self = this;

            files = files.map(function(item, index){
                return(
                        <div>
                            <li className="list-group-item"> <button type="hidden" onClick={self.getFile(item.path)}> {item.file} </button> </li>
                        </div>
                    )
            });
            folders = folders.map(function(item, index){
                return(
                        <li className="list-group-item"> {item} </li>
                    )
            });

            activity = activity.map(function(item, index){
                return(
                    <li className="list-group-item"> {item} </li>
                )
            })

            return(
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        <table className="table table-striped">
                        <tr>
                            <td>Firstname</td>
                            <td>{this.state.firstname}</td>
                        </tr>
                        <tr>
                            <td>Lastname</td>
                            <td>{this.state.lastname}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{this.state.username}</td>
                        </tr>

                        </table>

                        <br />

                        <div>
                                <ul className="list-group"><strong> Files </strong>
                                    {files}
                                </ul>

                                <ul className="list-group"><strong> Folders </strong>
                                    {folders}
                                </ul>

                        </div>
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => this.props.handleLogout(this.state)}>
                            Logout
                        </button>
                    </div>
                </div>

            )
        }
        else{
            return(
                <Redirect to="/login" />
            )
        }
    }

    getFile(path){

        fetch(`${api}/downloadfile`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body: JSON.stringify({"username": this.state.username, "path": path })
        }).then(res => {
                fileDownload(res.data, path.substr(1, path.length-1))

        })
            .catch(error => {
                console.log(error);

            });
    }
}



export default Welcome;