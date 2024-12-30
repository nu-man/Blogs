import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the blog ID from the URL
import { Grid } from "@mui/material"; // MUI components for better styling

const SingleBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

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
    <div className="container">
      <h1 className="title">{blog.title}</h1>
      <div
        className="grid-container"
        style={{ margin: 0, padding: 0, boxSizing: "border-box" }}
      >
        <Grid container spacing={2}>
          <Grid item lg={8} md={6} className="grid-item">
            <div>
              {/* Render HTML content from the blog */}
              <div
                className="blog-content2"
                dangerouslySetInnerHTML={{ __html: blog.content }} // Safely render HTML
              />
            </div>
          </Grid>
          <Grid item lg={4} md={4} className="grid-item">
            {/* Check if cover image exists */}
            {blog.coverImageSrc && (
              <img
                src={blog.coverImageSrc}
                alt={`Cover for ${blog.title}`}
                className="cover-image"
              />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SingleBlog;
