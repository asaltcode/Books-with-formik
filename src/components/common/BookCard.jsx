import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

const BookCard = ({id, navigate, title, author, Dob , published, ISBN, Bio}) => {
  return (
    <Card  style={{ width: '18rem' }} className='book-Card BookBox' >
      <Card.Body className='text-content'>
        <Card.Title className='book-title text-center'>{title}</Card.Title>
        <Card.Text className='book-description'><b>Author : </b>{author}</Card.Text>
        <Card.Text className='book-description'><b>Date Of Birth : </b>{Dob}</Card.Text>
        <Card.Text className='book-description'><b>Published : </b>{published}</Card.Text>
        <Card.Text className='book-description'><b>ISBN : </b>{ISBN}</Card.Text>
        <Card.Text className='book-description'><b>Biography : </b><Button onClick={()=> navigate(`/full-details/${id}`)} variant="dark">More</Button></Card.Text>
      </Card.Body>
    </Card>
  )
}
export default BookCard