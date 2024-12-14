import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the blog ID from the URL
import { Row,Col, Container } from "react-bootstrap";

const SingleBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://campusroot.com/api/v1/public/blog/${id}`
        );
        setBlog(response.data.data); // Set the blog data
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog. Please try again later.");
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error message
  }

  return (
    <Container>
      <h1
        style={{
          fontWeight: 600,
          fontSize: "48px",
          lineHeight: "55px",
          margin: "40px",
          textAlign:"center",
          color:"rgba(0, 0, 0, 1)"
        }}
      >
        {blog.title}
      </h1>

     

   <div className="d-flex">
   <Row>
    <Col
     lg={8}>
      <div>
        {/* Render HTML content from the blog */}
        <div
          style={{
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "30px",
            color: "rgba(106, 106, 106, 1)",
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }} // Safely render HTML
        />
      </div>
       

     </Col>
     <Col lg={4}>
     {/* Check if cover image exists */}
     {blog.coverImageSrc && (
        <img
          src={blog.coverImageSrc}
          alt={`Cover for ${blog.title}`}
          style={{ width: "fit-content%", height: "auto", borderRadius: "8px"  }}
        />
      )}</Col>
   </Row>
   </div>
    </Container>
  );
};

export default SingleBlog;
