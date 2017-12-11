import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link,} from 'react-router-dom';
import { Redirect} from 'react-router';
class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: ''
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: ''
        });
    }


    render() {
        if(localStorage.getItem('username')){
            console.log('YESSS');
            return(
                <Redirect to="/welcome" />
            )
        }
        else{
            return (
                <div>
                    <div className="row justify-content-md-center">
                    <span className="dropbox-2015 dropbox-logo-2015 container">
                    <header className="mast-head">
                        <nav className="mast-head__nav mast-head-nav">
                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg"
                                alt="" className="dropbox-logo__glyph"/>

                            <img
                                src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg"
                                alt="" className="dropbox-logo__type"/>
                        </nav>
                        </header>
                    </span>
                    </div>

                    <br/><br/><br/><br/><br/><br/>


                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <img src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo-vfl_t3XMB.png"

                                 alt="" className="login-or-register-img"/>
                        </div>

                        <div className="col-md-4">

                            <form>
                                <div className="form-group">
                                    <div className="login-register-header">Sign in</div>
                                </div>
                                <div className="login-register-switch">
                                    <label className="login-register-switch-link"
                                           onClick={()=>{
                                               this.setState({
                                                   signIn: false
                                               });
                                           }
                                           }
                                    >
                                        <Link to="/signup" >
                                                or create an account
                                        </Link>

                                    </label>


                                </div>

                                <br/>
                                <div className="form-group">
                                    <hr/>
                                    <input
                                        className="form-control"
                                        type="text"
                                        label="Username"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={(event) => {
                                            this.setState({
                                                username: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        label="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.setState({
                                                password: event.target.value
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <br/>
                                            <input className="checkbox_label" type="checkbox" id="cb" name="remember me"/>

                                            <label className="checkbox_label">Remember me</label>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={() => this.props.handleSubmit(this.state)}>
                                                    SignIn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default Login;