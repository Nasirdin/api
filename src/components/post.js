import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { addPost, delPost, getPost, updatePost } from '../redux/reducers/storeReducer';


const Post = ({setPost, currentPost}) => {

    const dispatch = useDispatch();
    const formHandler = (e) => {
        e.preventDefault()
        dispatch(addPost(
            e.target.children[0].value,
            e.target.children[1].value,
        ))
        
        alert('Ура! Ваш Поcт успешно сохранен')
    }
    const delHandler = (e) => {
        const val = e.target.children[0].innerHTML.split(':')[1];
        console.log(val)
        dispatch(delPost(
            e.target.children[0].innerHTML.split(':')[1]
        ))
        const getPosts = async () => {
            const res = await axios.get('http://localhost:8090/api/posts')
            setPost(res.data)
        }
        getPosts()
    }
    const upHandler = (e) => {
        e.preventDefault()
        dispatch(updatePost(
            e.target.children[0].value,
            e.target.children[1].value,
            e.target.children[2].value
        ))
    }

    return (
        <div className='get'>
            <form action='' className='form' onSubmit={formHandler}>
                <input className='form__title' placeholder='title' type='text'/>
                <input className='form__comment' placeholder='comment' type='text'/>
                <button className='form__btn' onClick={() => dispatch(getPost())}>add</button>
            </form>
            {currentPost.map((el) => (
                <div className='post__card card'>
                    <form className='form form2' onSubmit={upHandler}>
                        <h3 className='card__id'>id: {el.id}</h3>
                        <input className='form__title' type="text" placeholder='title'/>
                        <input className='form__comment' type="text" placeholder='body'/>
                        <button className='form__btn' >Update</button>
                    </form>
                    <div className='card__block' onClick={delHandler}>
                        <h3 className='card__id'>id: {el.id}</h3>
                        <p className='card__title'>{el.title}</p>
                        <p className='card__comment'>{el.body}</p>
                    </div>
                </div>
            ))}

        </div>
        )
}

export default Post;