import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Post from './post'

import './get.scss'

const Get = () => {
// pagination
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPage] = useState(11)
    const lastPostIndex = currentPage * postPage
    const firsPostIndex = lastPostIndex - postPage
    const currentPost = post.slice(firsPostIndex, lastPostIndex)

    
    useEffect(() => {
        const getPosts = async () => {
            setLoading(true)
            const res = await axios.get('http://localhost:8090/api/posts')
            setPost(res.data)
            setLoading(false)
        }
        getPosts()
    }, [])

    const pageNumbers = []
    const total = (post.length)
    for (let i = 1; i <= Math.ceil(total / postPage); i++) {
        pageNumbers.push(i)
    }
    const pagination = pageNumber => setCurrentPage(pageNumber)

    const [value, setValue] = useState('')
    const search = post.filter((el) => {
        return el.id == value
    })
    console.log(search);

    
    if(loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div>
            <form className='search-form'>
                <input onChange={(e) => setValue(e.target.value)} className='search' type='text' placeholder='ID'/>
                <button className='search-btn'>search</button>
            </form>
            <Post setPost={setPost} currentPost={currentPost}/>
            <ul className='pagination'>
                {pageNumbers.map(el => (
                    <li className='page-item' key={el}>
                        <a href='#' className='page-link' onClick={() => pagination(el)}>
                            {el}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Get;