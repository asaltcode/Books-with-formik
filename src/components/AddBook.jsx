import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AxiosService from "./utils/ApiService";
import { useFormik} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";



const AddBook = () => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      ISBN: "",
      publicationDate: "",
      authorInfo: {
        birthDate: "",
        biography: "",
      },
    },

    validationSchema:Yup.object({
      author:Yup.string().required('Author\'s name is required').max(20,'Name can not exceed 20 characters').min(3,'Name can not be shorter than 3 leters'),
      authorInfo:Yup.object({
        // date of birth validation
        birthDate: Yup.date().required('Date of birth is required').nullable()
        .transform((originalValue, originalObject) => {
        const parsedDate = new Date(originalValue);
        return isNaN(parsedDate) ? null : parsedDate;
      })
      .test('valid-date', 'Invalid date', (value) => value !== null),

    // Biography validation
      biography: Yup.string()
        .required('Biography is required')
        .test('word-count', 'Biography should have 25 words or fewer', value => {
          const wordCount = value.trim().split(/\s+/).length;
          return wordCount <= 25;
        }),
      }),
  //  ISBN validation regex code
      ISBN: Yup.string()
        .required('ISBN is required')
        .matches(/^(\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?\d{1}|\d{13})$/, 'Invalid ISBN format'),
  
      // Publication validation

      publicationDate: Yup.date().required('Publication Date is required').nullable()
      .transform((originalValue, originalObject) => {
      const parsedDate = new Date(originalValue);
      return isNaN(parsedDate) ? null : parsedDate;
    })
    .test('valid-date', 'Invalid date', (value) => value !== null),
    
    // Book title validation
    title: Yup.string()
        .required('Title is required')
        .max(30, 'Title must be 30 characters or fewer'),
    
   
    }),

    onSubmit: async (values)=>{
     try {
      let res = await AxiosService.post("/books", values)
      if(res.status === 201){
        navigate('/home')
        toast.success("Book Added Successfully")
      }
     } catch (error) {
       toast.error("Internal Server Error")
     }
    }
    
  });



  useEffect(() => {
    // getDetails();
  }, []);

  return (
    <>
      <div className="edit-form">
    <div className="Title">
      <h1 className="text-center">
        Add book
        {/*
        <FaUserEdit style={{ paddingBottom: "5px" , fontSize: "60px" , filter: "drop-shadow(1px 1px 20px blue)" }} />
        */}
      </h1>
    </div>
    <Form onSubmit={formik.handleSubmit}>
      <div className="formGroup">
        <Form.Group className="mb-3">
          <Form.Label>Author :</Form.Label>
          <Form.Control type="text" name="author" id="author" placeholder="Enter your name"
            onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur} />
          {formik.touched.author && formik.errors.author ? (<div style={{color:"red"}}>{formik.errors.author}</div>) :
          null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date of birth :</Form.Label>
          <Form.Control type="date" name="authorInfo.birthDate" id="birthDate.birthDate" placeholder="dd/mm/yyyy"
            onChange={formik.handleChange} value={formik.values.birthDate} onBlur={formik.handleBlur} />

          {formik.touched.authorInfo && formik.errors.authorInfo ? (<div style={{color:"red"}}>
            {formik.errors.authorInfo.birthDate}</div>) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book Title :</Form.Label>
          <Form.Control type="text" name="title" id="title" placeholder="Book Title"
            onChange={formik.handleChange}value={formik.values.title} onBlur={formik.handleBlur} />
          {formik.touched.title && formik.errors.title ? (<div style={{color:"red"}}>{formik.errors.title}</div>) :
          null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Published :</Form.Label>
          <Form.Control type="date" name="publicationDate" id="publicationDate" placeholder="dd/mm/yyyy"
            onChange={formik.handleChange} value={formik.values.publicationDate} onBlur={formik.handleBlur} />
          {formik.touched.publicationDate && formik.errors.publicationDate ? (<div style={{color:"red"}}>
            {formik.errors.publicationDate}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ISBN :</Form.Label>
          <Form.Control type="text" name="ISBN" id="ISBN" placeholder="000-0-000-00000-0" onChange={formik.handleChange}
            value={formik.values.ISBN} onBlur={formik.handleBlur} />
          {formik.touched.ISBN && formik.errors.ISBN && <div style={{color:"red"}}>{formik.errors.ISBN}</div>}

        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Biography :</Form.Label>
          <Form.Control as="textarea" rows={3} type="text" name="authorInfo.biography" id="biography"
            placeholder="Enter your email" onChange={formik.handleChange}value={formik.values.biography}
            onBlur={formik.handleBlur} />
          {formik.touched.authorInfo && formik.errors.authorInfo ? (<div style={{color:"red"}}>
            {formik.errors.authorInfo.biography}</div>) : null}
        </Form.Group>
      </div>

      <div className="buttonGroup">
        <Button type="submit" variant="primary">
          Submit
        </Button>
        &nbsp; &nbsp;
        <Button onClick={()=> navigate("/dashboard")} variant="warning">
          Cancel
        </Button>
      </div>
    </Form>
  </div>
    </>
  );
};

export default AddBook;


