import axios from "axios";

const POST = 'POST';
const ADD__POST = 'ADD_POST';
const DEL__POST = 'DEL__POST'
const UPDATE__POST = 'UPDATE__POST'

const initialState = {
    postData: [],
    addPost: [],
    delPost: [],
    updatePost: []
}

const defFunc = (state = initialState, action) => {
    switch(action.type){
        case POST : {
            return {...state, postData: action.postData}
        }
        case ADD__POST : {
            return {...state, addPost: action.addPost}
        }
        case DEL__POST : {
            return {...state, delPost: action.delPost}
        }
        case UPDATE__POST : {
            return {...state, update: action.updatePost}
        }
        default: return state
    }
}

export const getPost = () => {
    return (dispatch) => {
        axios('http://localhost:8090/api/posts')
            .then(({data}) => dispatch({type: POST, postData: data}))
    }
}

export const addPost = (title, body, id) => {
    const data = JSON.stringify({
        title: title,
        body: body,
        id: id
    })
    return (dispatch) => {
        axios({
            method: 'post',
            url:'http://localhost:8090/api/add/post',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }).then(({data}) => dispatch({type: ADD__POST, addPost: data}))
    }
}

export const delPost = (id) => {
    const userId = Number(id);
    const data = {
        id: userId
    }
    return (dispatch) => {
        axios({
            method: 'delete',
            url: `http://localhost:8090/api/del`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }).then(({data}) => dispatch({type: DEL__POST, delPost: data}))
    }
}

export const updatePost = (id, title, body) => {
    const userId = Number(id);
    const data = {
        id: id,
        title: title,
        body: body
    }
    console.log(data)
    console.log(userId)
    return (dispatch) => {
        axios({
            method: 'patch',
            url: `http://localhost:8090/api/update/${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }).then(({data}) => dispatch({type: UPDATE__POST, updatePost: data}))
    }
}

export default defFunc