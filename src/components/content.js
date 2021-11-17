import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../redux/reducers/storeReducer';
import './content.scss';

const Content = () => {
    const dispatch = useDispatch();
    return (
        <div className='Content'>
            <Link className='link' to='/post' onClick={() => dispatch(getPost())}>GET</Link>
        </div>
    )
}

export default Content;