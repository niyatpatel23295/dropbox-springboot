import React from "react";
import * as API from '../api/API';
import { Link } from "react-router";
export default class Homepage extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }
    
    componentWillMount(){
        this.state = this.props.location.state;
    }

    handleUpload(e){
        var fd = new FormData();    
        fd.append('file', this.refs.file.getDOMNode().files[0]);
        API.uploadFile(fd).then((data) => {
            console.log(data);
        });
        e.preventDefault();
    }

    render() {
        console.log(JSON.stringify(this.props));
        return (
            <div class="container-fluid" >
                <div class="row">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 homepage_left" >
                        <div class="row">
                            <svg class="" aria-label="Home" xmlns="http://www.w3.org/2000/svg" role="img" width="32px" height="32px" viewBox="0 0 32 32" style={{fill:"#0062ff"}} data-reactid="12"><title data-reactid="13"></title><path d="M8 2.4l8 5.1-8 5.1-8-5.1 8-5.1zm16 0l8 5.1-8 5.1-8-5.1 8-5.1zM0 17.7l8-5.1 8 5.1-8 5.1-8-5.1zm24-5.1l8 5.1-8 5.1-8-5.1 8-5.1zM8 24.5l8-5.1 8 5.1-8 5.1-8-5.1z" data-reactid="14"></path></svg>

                        </div>
                        <div class="row" >
                            <Link to="/" class="homepage_left_text">Home </Link>
                        </div>
                        <div class="row">
                            <Link to="/" class="homepage_left_text">Files </Link>
                        </div>
                    </div>

                    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 homepage_right">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{padding: "40px 0px 0px 40px", fontSize: "25px" }}>
                            <div class="row" >
                                Home
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        Hi
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
                        <label class="btn btn-default btn-file" style={{backgroundColor: "#0070e0", borderRadius: "5px", width: "200px"}}>
                            Upload files <input type="file" ref="file" style={{display: "none"}} onChange={() => this.handleUpload(event)}/>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

