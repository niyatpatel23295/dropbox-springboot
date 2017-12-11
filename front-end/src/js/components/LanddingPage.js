import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Redirect} from 'react-router';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import SignUp from "./SignUp"
class LanddingPage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((res) => {
                if (res.status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "",
                        username: userdata.username
                    });
                    res.json().then(function(res_json){

                        localStorage.setItem('isLoggedIn', true);
                        localStorage.setItem('username', res_json.data.username);
                        localStorage.setItem('email', res_json.data.email);
                        localStorage.setItem('firstname', res_json.data.firstname);
                        localStorage.setItem('lastname', res_json.data.lastname);
                        localStorage.setItem('activity', res_json.data.activity);

                    });
                     this.props.history.push("/welcome");

                } else if (res.status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status === 200){
                    localStorage.removeItem('username');
                    localStorage.removeItem('isLoggedIn');
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }
            });
    };

    handleSignUp = (userdata) => {
        API.doSignUp(userdata)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        isLoggedIn: true,
                        firstname: userdata.firstname,
                        lastname: userdata.lastname,
                        email: userdata.email,
                        username: userdata.username
                    });
                    localStorage.setItem('isLoggedIn', true);
                    res.json().then(function(res_json){
                        console.log(res_json);
                        localStorage.setItem('isLoggedIn', true);
                        localStorage.setItem('username', res_json.data.username);
                        localStorage.setItem('email', res_json.data.email);
                        localStorage.setItem('firstname', res_json.data.firstname);
                        localStorage.setItem('lastname', res_json.data.lastname);
                        localStorage.setItem('activity', res_json.data.activity);
                    });
                    this.props.history.push("/welcome");
                } else if (res.status === 500) {
                    this.setState({
                        isLoggedIn: false,
                        message: "username already exists"
                    });
                }
            });
    };

    handleDownload = (path) => {
        API.doDownload(path)
            .then((res) => {
                this.props.history.push("/welcome");
            });
    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <Redirect to="/login" />
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                       <Message message={this.state.message} />
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <Welcome handleLogout={this.handleLogout} username={this.state.username}/>
                )}/>

                <Route exact path="/signup" render={() => (
                    <div>
                    <SignUp handleSignUp={this.handleSignUp} />
                    <Message message={this.state.message} />
                    </div>
                )} />

            </div>
        );
    }
}

export default withRouter(LanddingPage);