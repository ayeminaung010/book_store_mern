import axios from 'axios';
import { useEffect, useState } from "react";
import Link from 'react-router-dom'
const Home = () => {
  const [books,setBooks] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
    .then((response) =>{
      setBooks(response.data.data)
      setLoading(false)
    })
    .catch((error) =>{
      console.log(error);
      setLoading(false)
    })
  },[])
  return (
    <div className=" p-4 ">
      <div className=" flex justify-between items-center">
        <h1 className=" text-3xl my-8">Books List</h1>
        <Link to={'/books/create'}>

        </Link>
      </div>
    </div>
  )
}

export default Home
