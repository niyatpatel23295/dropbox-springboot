const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';


const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
    .catch(error => {
        console.log(JSON.stringify(error));
        return "Internal Server Error";
    });

export const doSignup = (payload) =>
    fetch(`${api}/user/add`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
    .catch(error => {
        console.log(JSON.stringify(error));
        return "Internal Server Error";
    });

export const uploadFile = (payload) =>
    fetch(`${api}/file/upload`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include',
        body: payload
    }).then(res => {
        return res.json();
    })
    .catch(error => {
        console.log(JSON.stringify(error));
        return "Internal Server Error";
    });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const ShareFile = (payload) =>
    fetch(`${api}/user/sharefile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log(error);
            return error;
        });

export const getUsersemails = () =>
    fetch(`${api}/getusersemails`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const updateProfile = (payload) =>
    fetch(`${api}/users/updateprofile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log(error);
            return error;
        });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doDownload = (payload) =>
    fetch(`${api}/file/downloaddir`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log(error);
            return error;
        });

export const createFolder = (payload) =>
    fetch(`${api}/users/createFolder`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: (payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error in create folder");
        return error;
    });

export const createSharedFolder = (payload) =>
    fetch(`${api}/users/createSharedFolder`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: (payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error in creating Shared folder");
        return error;
    });

export const deleteFile = (payload) =>
    fetch(`${api}/users/deleteFile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error in deleting File");
        return error;
    });



