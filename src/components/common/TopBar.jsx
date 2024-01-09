import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidBookAdd } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const TopBar = () => {  
    let location = useLocation()
    let active = "activeNav";
    let navigate = useNavigate()
  return (
    <Navbar expand="lg" data-bs-theme="dark" bg='dark' className="bg-body-tertiary">
    <Container>
      <Navbar.Brand><FaUsers className='navIcon' /> User Details</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto  text-center">
          <Nav.Link className={`${location.pathname === '/'? "navItem" : ""}`} onClick={()=>navigate("/")}><AiFillHome className={`navIcon ${location.pathname === '/'? active : ""}`} /> Home</Nav.Link>
          <Nav.Link className={`${location.pathname === '/dashboard'? "navItem" : ""}`} onClick={()=>navigate("/dashboard")}><MdSpaceDashboard className={`navIcon ${location.pathname === '/dashboard'? active : ""}`} /> Dashboard</Nav.Link>          
          <Nav.Link className={`${location.pathname === '/add-book'? "navItem" : ""}`} onClick={()=>navigate("/add-book")}><BiSolidBookAdd className={`navIcon ${location.pathname === '/add-book'? active : ""}`} /> Add Book</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default TopBar