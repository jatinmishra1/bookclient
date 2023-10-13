import react, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import EditOutlined from './EditOutlined'
const Searchbar=()=>{
const [val,setVal]=useState()
const [books,setBooks]=useState([])
const [storedBooks,setStoredBooks]=useState([]);





async function handelChange(value){
    // e.preventDefault();
    setVal(value)
    const  response =await axios.get("http://68.178.162.203:8080/application-test-v1.1/books")
    // console.log(response.data.data)
    const allBooks=response.data.data
    const finalBooks=allBooks.filter((book)=>{
        return val && book&&book.title && book.title.toLowerCase().includes(val)
    })
    setBooks(finalBooks)
    // console.log(finalBooks)
}

async function getStoredBooks(){
    const temp=await axios.get("http://localhost:8000/api/books");
    // console.log(temp.data.data)
    const allthestoredbooks=await temp.data.data
    const tt=allthestoredbooks
    console.log(tt)
    // console.log(allthestoredbooks)
    setStoredBooks(tt)
    console.log(storedBooks)
}
// useEffect(()=>{
//     getStoredBooks()
// },[])
useEffect(()=>{
handelChange(val)
getStoredBooks()
},[val])

const handelSubmit=async function(event){
    const formData = new FormData(event.currentTarget);
    // console.log(formData.entries())
    event.preventDefault();
    const newBook={}
    for (let [key, value] of formData.entries()) {
        // console.log(key, value);
    newBook[key]=value
      }
    //   console.log(newBook)
      const resposne=await axios.post("http://localhost:8000/api/books",{newBook})
    //   console.log(resposne)
      getStoredBooks()
      
}

async function handelEdit(id){
   
    // window.location.href=`http://localhost:3000/books/${id}`
    //  const resposne=await axios.get(`http://localhost:8000/api/books/${id}`);
    //  console.log(resposne)

}


    return (
        <div style={{ }}>
        <div>search bar</div>
        <form >
        <input type="text"  onChange={(e)=>{handelChange(e.target.value)}} value={val}/>
        <button type='submit' >Submit</button>
        </form>
        <div>
            <ul>
                {books.map((b)=>{
                    return(
                        <div>
                            <li>{b.title}</li>
                        </div>
                        
                    )
                })}
            </ul>
        </div>

        <div style={{display:"flex"}}>
            <h1>Add book here</h1>
            <form onSubmit={handelSubmit}>
                <input type="text" name="author" placeholder='enter name Author name '/>
                <input type="text" name="country" placeholder='enter country  name '/>
                <input type="text" name="language" placeholder='enter language '/>
                <input type="text" name="link" placeholder='enter the link  '/>
                <input type="Number" name="pages" placeholder='enter no of pages in the book '/>
                <input type="text" name="title" placeholder='enter title of book '/>
                <input type="text" name="year" placeholder='enter year of publishing'/>
                <input type="Number" name="id" placeholder='enter id of the book '/>
                <button type="submit">Add book</button>
            </form>
        </div>


        <div>
           
            {storedBooks.length>0 && storedBooks.map((data1)=>{
                return (
                   <div style={{border:"2px solid red" }}>
                <li>Title:{data1.title}</li>
                <li>Author:{data1.author}</li>
                {/* <button onClick={handelEdit()}>Edit Book</button> */}
                <Link to={`/books/${data1.id}`}>
                    click to edit
                    </Link>
                </div>
                )
                
            })}
        </div>
        </div>
    )

}


export default Searchbar