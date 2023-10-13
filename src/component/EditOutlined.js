import react, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditOutlined=function(){
    var user={};
    const [author,setAuthor]=useState()
    const [country,setCountry]=useState()
    const [language,setLanguages]=useState()
    const [link,setLink]=useState()
    const [pages,setPages]=useState()
    const [title,setTitle]=useState()
    const [year,setYear]=useState()
    const [id,setId]=useState()

    const params = useParams();
    console.log(params)
    const ids=params.id
async function getData(){
      const resposne=await axios.get(`http://localhost:8000/api/books/${ids}`);
      const data=resposne.data.data;
      setAuthor(data.author)
      setCountry(data.country);
      setLanguages(data.language)
      setLink(data.link)
      setPages(data.pages)
      setTitle(data.title);
      setYear(data.year);
      setId(data.id)
    user=data;
      console.log(user)

}


    useEffect(()=>{
        getData();
    },[])

    const handelSubmit=async function(e){
        e.preventDefault()
        const editdata=await axios.post(`http://localhost:8000/api/books/${id}`,{author,country,language,link,pages,title,year,id})
        console.log(editdata)
        if(editdata.status==200){
            window.location.href="http://localhost:3000/"
        }
    }

return ( author!="" &&
    <div style={{display:"flex"}}>
    <h1>Edit book here</h1>
    <form  onSubmit={handelSubmit}>
        <input type="text" name="author" value={author} onChange={(e)=>{setAuthor(e.target.value)}} placeholder='enter name Author name '/>
        <input type="text" name="country" value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder='enter country  name '/>
        <input type="text" name="language" value={language} onChange={(e)=>{setLanguages(e.target.value)}} placeholder='enter language '/>
        <input type="text" name="link" value={link} onChange={(e)=>{setLink(e.target.value)}} placeholder='enter the link  '/>
        <input type="Number" name="pages" value={pages} onChange={(e)=>{setPages(e.target.value)}} placeholder='enter no of pages in the book '/>
        <input type="text" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='enter title of book '/>
        <input type="text" name="year" value={year} onChange={(e)=>{setYear(e.target.value)}} placeholder='enter year of publishing'/>
        <input type="Number" name="id" value={id} onChange={(e)=>{setId(e.target.value)}} placeholder='enter id of the book '/>
        <button type="submit">Add book</button>
    </form>
</div>
)
}
export default EditOutlined