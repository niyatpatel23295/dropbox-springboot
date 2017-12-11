import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import * as API from '../api/API';
import folderIcon from '../folder.png';
import NewFolder from "./NewFolder";
import NewSharedFolder from "./NewSharedFolder";

import Icon from '../tinyfolder.png';
import CreateNewFolder from '../CNF.png';


class FileList extends Component {

    static propTypes = {
        // classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired,
        listFiles: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired


    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            images: [],
            filename: '',
            starredfile: [],
            imageStarred: false,
            newfolder: false,
            newSharedfolder: false

        }
    }

    componentWillMount() {
        console.log('compoennt will mount', this.state.username);


        API.getImages()
            .then((data) => {
                this.setState({
                    images: data.resArray,
                    username: data.objectSession,
                    imageStarred: data.resArray.starred
                });
            });


    }

    createFolder = (payload) => {
        API.createFolder(payload)
            .then((status) => {
                if (status === 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray,
                                newfolder: false
                            });
                        });
                }
            });
    };

    handleFileUpload = (event) => {
        console.log('hangle File Upload func', this.state.username);
        const payload = new FormData();
        payload.append('username', this.state.username);
        payload.append('mypic', event.target.files[0]);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray
                            });
                        });
                }
            });
    };

    handleDelete = (payload) => {
        console.log("delete", payload);
        API.deleteFile(payload)
            .then((status) => {
                if (status === 201) {
                    console.log("deleted");
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray,
                                username: data.objectSession,
                                imageStarred: data.resArray.starred
                            });
                        });
                }
            });

    };


    createSharedFolder = (payload) => {
        console.log("In Shared foldered");
        API.createSharedFolder(payload)
            .then((status) => {
                if (status === 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data.resArray,
                                newSharedfolder: false

                            });
                        });
                }
            });
    };

    handleStar = (payload) => {

        this.state.starredfile.push(payload[0]);
    };

    handleUnStar = (payload) => {
        console.log('unstar');

        this.state.starredfile.pop(payload[0]);

    };


    render() {
        const classes = this.props;


        return (

            <div className={classes.root}>
                <div className="row">
                    <div className="col-md-9 imageGridStyle ">
                        <h3 className="myStyle-main">Home</h3><br/>
                        <h5 className="myStyle-main2">Starred</h5>
                        {this.state.starredfile.map(tile => (

                            <div className="imageGridStyle " key={tile.img}>
                                <a className="myStyle-main3" href={'http://localhost:3001/' + tile.img}
                                   alt={'myimage'}>
                                    <img alt="myImg" src={folderIcon}/>{tile.myfileName}</a>

                                <div className="download-button">
                                    <div>
                                        <div className="dropdown">
                                                <span className="bold dropdownOption" data-toggle="dropdown">
                                                    ...
                                                </span>

                                            <ul className="dropdown-menu">
                                                <li className={'ddleft'}><a href={'http://localhost:3001/' + tile.img}
                                                                            download> Download </a></li>
                                                <li className={'ddleft'}><a onClick={() => {
                                                    this.handleDelete({"path_to_delete": tile.img})
                                                }}>Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <br/>
                                <div className="myStyle-main4">
                                    <hr/>
                                </div>
                            </div>
                        ))}
                        
                        
                        <div className="myStyle-main4">
                            <hr/>
                        </div>
                        
                        
                        
                        <br/>
                        <div className="myStyle-main4">
                            <hr/>
                        </div>
                        
                        
                        
                        
                        <h5 className="myStyle-main2">Recent</h5>
                        <div className="myStyle-main4">
                        </div>
                        <div>
                            {
                                this.state.newfolder
                                    ? <NewFolder createFolder={this.createFolder}/>
                                    : null
                            }
                        </div>

                        <div>
                            {
                                this.state.newSharedfolder
                                    ? <NewSharedFolder createSharedFolder={this.createSharedFolder}/>
                                    : null
                            }
                        </div>

                        {
                            this.state.images.map(tile => (

                                <div className="imageGridStyle toggleVisibility" key={tile.img} cols={tile.cols || 1}>
                                    <br/>
                                    <a className="myStyle-main3" href={'http://localhost:3001/' + tile.img}
                                       alt={'myimage'}>
                                        <img alt="myImg" src={folderIcon}/>{tile.myfileName}</a>

                                    <div className="download-button">
                                        <span className="ddo play">
                                        Share
                                        </span>

                                        <div className="dropdown ">
                                                <span className="bold dropdownOption" data-toggle="dropdown">
                                                    ...
                                                </span>

                                            <ul className="dropdown-menu">
                                                <li className={'ddleft'}><a href={'http://localhost:3001/' + tile.img}
                                                                            download> Download </a></li>
                                                <li className={'ddleft'}><a onClick={() => {
                                                    this.handleDelete({"path_to_delete": tile.img})
                                                }}>Delete...</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="myStyle-main4">
                                        <hr/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-3">
                        <div className="nav_container">
                            <div className="nav_panel">
                                <button className="btn btn-primary logout" onClick={this.props.handleLogout}>Logout
                                </button>
                                <br/><br/>

                                <div className="maestro-nav__contents">
                                    <ul className="maestro-nav__products">
                                        <li>
                                            <label className="btn btn-primary uploadbtn">
                                                Upload Files<input type="file" hidden onChange={this.handleFileUpload}/>
                                            </label>
                                        </li>

                                        <a>
                                            <li data-reactid="20">
                                                <br/><span onClick={() => {
                                                this.setState({newfolder: !this.state.newfolder});
                                            }}><img src={CreateNewFolder} alt={'Create New Folder'}/> Create New Folder
                                        </span>

                                            </li>
                                            <li data-reactid="25">
                                                <br/><span onClick={() => {
                                                this.setState({newSharedfolder: !this.state.newSharedfolder});
                                            }}><img alt="myImg" src={Icon}/> New Shared Folder</span>
                                            </li>
                                        </a>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-10 mainpart ">

                        <FileList handleStar={this.handleStar} newfolder={this.state.newfolder} images={this.state.images}
                                  newSharedfolder={this.state.newSharedfolder} listFiles={this.listFiles} handleLogout={this.props.handleLogout}/>
                    </div>

                </div>
            </div>
        )
    }
}


export default FileList;
