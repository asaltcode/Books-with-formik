import React,{useState, useEffect} from 'react'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AxiosService from './utils/ApiService'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard =  () => {
   let navigate = useNavigate()
   let [book, setBook] = useState([])

   const getData = async ()=>{
    try {
      let res = await AxiosService.get('books')
      if(res.status === 200){
       setBook(res.data)
      }
    } catch (error) {
      
    }
  }

  const handleDelete = async (id) =>{
     try {
      let res = await AxiosService.delete(`/books/${id}`)
      getData()
      toast.success("Book Deleted Successfully")
    } catch (error) {
      
      toast.error("Internal Server Error")
     }
  }
 
  useEffect(()=>{
    getData()
  })
  return (
    <div className="Table-container">
    <Table striped bordered hover>
        <thead>
            <tr className="text-center">
                <th>#</th>
                <th>author</th>
                <th>Title</th>
                <th>Date of birth</th>
                <th>Published</th>
                <th>Status</th>
                {/* <th>Action</th> */}
            </tr>
        </thead>
        <tbody className="tableBody">
            {book.map((e) => {
            return (
            <tr key={e.id} className="text-center">
                <td>{e.id}</td>
                <td>{e.author}</td>
                <td>{e.title}</td>
                <td>{e.authorInfo.birthDate}</td>
                <td>{e.publicationDate}</td>
                <td>
                    <Button onClick={()=> navigate(`/edit/${e.id}`)} variant="info">Edit</Button>{" "}
                    &nbsp;
                    <Button onClick={()=> handleDelete(e.id)} variant="danger">Delete</Button>
                </td>
            </tr>);
            })}
        </tbody>
    </Table>
</div>
  )
}

export default Dashboard