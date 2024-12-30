import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../App.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post(
          "https://campusroot.com/api/v1/public/listings/blogs"
        );
        setBlogs(response.data.data.list);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        alert("Failed to fetch blogs. Please try again later.");
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const sliderRef = useRef();

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -500, // Scroll amount
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 500, // Scroll amount
        behavior: "smooth", // Smooth scrolling
      });
    }
  };
  return (
    <div className="all-blogs">
      {/* Section 1 */}
      <div className="gradient">
        <center style={{ marginBottom: "5.5rem" }}>
          <h1>Welcome to our Blog</h1>
          <p>Explore insights, tips, and stories about studying abroad.</p>
        </center>
        <div>
          {blogs?.length >= 4 ? (
            <Grid container spacing={2}>
              {[0, 1, 3].map((index, colIndex) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={colIndex}>
                  {index === 1 ? (
                    blogs
                      .slice(index, index + 2)
                      .map((blog, i) => (
                        <img
                          key={i}
                          src={blog?.coverImageSrc}
                          alt={`Cover of blog titled ${blog?.title}`}
                          loading="lazy"
                          className={
                            i === 0 ? "small-blog margin-bottom" : "small-blog"
                          }
                          onClick={() => handleBlogClick(blog?._id)}
                        />
                      ))
                  ) : (
                    <img
                      src={blogs[index]?.coverImageSrc}
                      alt={`Cover of blog titled ${blogs[index]?.title}`}
                      loading="lazy"
                      className="large-blog"
                      onClick={() => handleBlogClick(blogs[index]?._id)}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          ) : blogs.length === 0 ? (
            <div className="loading-section">
              <CircularProgress />
              <p>Loading blogs...</p>
            </div>
          ) : (
            <p>No blogs available at the moment. Please check back later.</p>
          )}
        </div>
      </div>

      {/* Section 2 */}
      <div className="section-2">
        <div className="headings">
          <h2>
            Most viewed <span>Blogs</span>
          </h2>
        </div>
        <div className="moving-cards">
          <KeyboardArrowLeftIcon
            onClick={scrollLeft}
            style={{ cursor: "pointer" }}
          />

          <div className="blog-slider" ref={sliderRef}>
            <Grid container spacing={2}>
              {blogs.slice(5, 8).map((blog) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={blog._id}
                  onClick={() => handleBlogClick(blog._id)}
                >
                  <div className="blog-card">
                    <img
                      src={blog.coverImageSrc}
                      alt={`Cover of blog titled ${blog.title}`}
                      className="blog-image"
                    />
                    <div className="blog-content">
                      <h3 className="blog-title">
                        {blog.title.slice(0, 30)}...
                      </h3>
                      <p className="blog-summary">
                        {blog.summary?.slice(0, 70)}...
                      </p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>

          <KeyboardArrowRightIcon
            onClick={scrollRight}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="section-3">
        <div className="headings">
          <h2>
            What new <span>today</span>
          </h2>
        </div>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {[
            { index: 0, count: 1, height: "600px", lg: 4 },
            { index: 1, count: 3, lg: 4, triple: true },
            { index: 4, count: 1, height: "600px", lg: 4 },
          ].map((config, colIndex) => (
            <Grid item lg={config.lg} md={6} sm={12} key={colIndex}>
              {config.triple ? (
                blogs
                  .slice(config.index, config.index + config.count)
                  .map((blog: any, _id: number) => (
                    <div
                      className="section-3-container"
                      key={_id}
                      onClick={() => handleBlogClick(blog?._id)} // Add onClick handler
                    >
                      <img
                        src={blog?.coverImageSrc}
                        alt={`Cover of blog titled ${blog?.title}`}
                      />
                      <h5>
                        {blog?.title.slice(0, 25)}... <br />
                        <br />
                        <p>{blog?.summary?.slice(0, 150)}....</p>
                      </h5>
                    </div>
                  ))
              ) : (
                <img
                  key={config.index}
                  src={blogs[config?.index]?.coverImageSrc}
                  alt={`Cover of blog titled ${blogs[config?.index]?.title}`}
                  style={{
                    width: "100%",
                    height: config.height,
                    borderRadius: "8px",
                    marginBottom: colIndex === 2 ? "3vh" : "0",
                  }}
                  onClick={() => handleBlogClick(blogs[config.index]?._id)} // Add onClick handler
                />
              )}
            </Grid>
          ))}
        </Grid>
      </div>

      {/*All Blogs Section*/}
      <div className="all-blogs">
        <div className="headings">
          <h2>
            All <span>Blogs</span>
          </h2>
        </div>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {blogs?.slice(13).map((blog: any, index: number) => (
            <Grid item lg={6} md={6} sm={12} key={index}>
              <div
                className={`all-blogs-card ${index % 2 === 0 ? "even" : "odd"}`}
                onClick={() => handleBlogClick(blog._id)}
              >
                <h4>{blog?.title.slice(0, 40)}...</h4>
                <h5>{blog?.summary?.slice(0, 120)}...</h5>
                <h6>View details</h6>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default AllBlogs;
