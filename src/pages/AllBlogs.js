import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../App.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const scrollRef = useRef();
  const navigate = useNavigate(); // Hook to programmatically navigate

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

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleBlogClick = (blogId) => {
    // Navigate to the blog details page
    navigate(`/blog/${blogId}`);
  };

  return (
    <>
      <div className="gradient">
        <center>
          <h1>Welcome to our Blog</h1>
          <p>Explore insights, tips, and stories about studying abroad.</p>
        </center>
        <Container>
          {blogs.length >= 4 ? (
            <Row>
              {[
                { index: 0, height: "620px", lg: 4 },
                { index: 1, height: "305px", lg: 4, double: true },
                { index: 3, height: "620px", lg: 4 },
              ].map((config, colIndex) => (
                <Col lg={config.lg} key={colIndex}>
                  {config.double ? (
                    <>
                      {blogs
                        .slice(config.index, config.index + 2)
                        .map((blog, i) => (
                          <img
                            key={i}
                            src={blog?.coverImageSrc}
                            alt={`Cover of blog titled ${blog?.title}`}
                            style={{
                              width: "100%",
                              height: config.height,
                              borderRadius: "8px",
                              objectFit: "fill",
                              marginBottom: i === 0 ? "10px" : "0",
                            }}
                            onClick={() => handleBlogClick(blog._id)} // Add onClick handler
                          />
                        ))}
                    </>
                  ) : (
                    <img
                      key={config.index}
                      src={blogs[config.index]?.coverImageSrc}
                      alt={`Cover of blog titled ${blogs[config.index]?.title}`}
                      style={{
                        width: "100%",
                        height: config.height,
                        borderRadius: "8px",
                        marginBottom: colIndex === 2 ? "3vh" : "0",
                      }}
                      onClick={() => handleBlogClick(blogs[config.index]?._id)} // Add onClick handler
                    />
                  )}
                </Col>
              ))}
            </Row>
          ) : (
            <p>Loading blogs...</p>
          )}
        </Container>
      </div>

      <Container>
        {/* Most viewed blogs section */}
        <div className="headings">
          <h4>
            Most viewed <span>Blogs</span>
          </h4>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            style={{
              position: "absolute",
              left: "-10px",
              zIndex: 10,
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#333",
            }}
          >
            &#8592;
          </button>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              overflowX: "auto",
              flexWrap: "nowrap",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
              scrollBehavior: "smooth",
            }}
            ref={scrollRef}
          >
            {/* Hide scrollbar for Webkit browsers */}
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <Row>
              {blogs.slice(5, 8).map((blog, _id) => (
                <Col key={_id}>
                  <div
                    className="moving-section"
                    onClick={() => handleBlogClick(blog._id)} // Add onClick handler
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={blog.coverImageSrc}
                      alt="img"
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        lineHeight: "15px",
                        marginLeft: "10px",
                      }}
                    >
                      {blog.title} <br />
                      <br />
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "400",
                          lineHeight: "12px",
                        }}
                      >
                        {blog.summary?.slice(0, 70)}...
                      </span>
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            style={{
              position: "absolute",
              right: "-10px",
              zIndex: 10,
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#333",
            }}
          >
            &#8594;
          </button>
        </div>

        {/* What new today section */}
        <div>
          <div className="headings">
            <h4>
              What new <span>today</span>
            </h4>
          </div>
          <Row>
            {[
              { index: 0, count: 1, height: "660px", lg: 4 },
              { index: 1, count: 3, lg: 4, triple: true },
              { index: 4, count: 1, height: "660px", lg: 4 },
            ].map((config, colIndex) => (
              <Col lg={config.lg} key={colIndex}>
                {config.triple ? (
                  blogs
                    .slice(config.index, config.index + config.count)
                    .map((blog, _id) => (
                      <div
                        className="moving-section-2"
                        key={_id}
                        onClick={() => handleBlogClick(blog._id)} // Add onClick handler
                        style={{ cursor: "pointer", marginBottom: "20px" }}
                      >
                        <img
                          src={blog.coverImageSrc}
                          alt={`Cover of blog titled ${blog?.title}`}
                          style={{
                            height: "100px",
                            width: "100px",
                            borderRadius: "8px",
                          }}
                        />
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            lineHeight: "15px",
                            marginLeft: "10px",
                          }}
                        >
                          {blog.title} <br />
                          <br />
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: "400",
                              lineHeight: "12px",
                            }}
                          >
                            {blog.summary?.slice(0, 300)}...
                          </span>
                        </p>
                      </div>
                    ))
                ) : (
                  <img
                    key={config.index}
                    src={blogs[config.index]?.coverImageSrc}
                    alt={`Cover of blog titled ${blogs[config.index]?.title}`}
                    style={{
                      width: "100%",
                      height: config.height,
                      borderRadius: "8px",
                      marginBottom: colIndex === 2 ? "3vh" : "0",
                    }}
                    onClick={() => handleBlogClick(blogs[config.index]?._id)} // Add onClick handler
                  />
                )}
              </Col>
            ))}
          </Row>
        </div>

        {/* All Blogs Section */}
        <div>
          <div className="headings">
            <h4>
              All <span>Blogs</span>
            </h4>
          </div>
          <Row>
            {blogs.slice(13).map((blog, index) => (
              <Col
                lg={6}
                md={6}
                sm={12}
                key={index}
                style={{
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor:
                      index % 2 === 0
                        ? "rgba(240, 240, 255, 1)"
                        : "rgba(255, 247, 233, 1)",
                    cursor: "pointer", // Add the cursor style here
                  }}
                  onClick={() => handleBlogClick(blog._id)} // Add onClick handler
                >
                  <h4
                    style={{
                      fontWeight: 600,
                      size: "32px",
                      lineHeight: "42px",
                    }}
                  >
                    {blog.title}
                  </h4>
                  <p
                    style={{
                      fontWeight: 400,
                      size: "16px",
                      lineHeight: "25px",
                    }}
                  >
                    {blog.summary.slice(0, 120)}...
                  </p>
                  <h6
                    style={{
                      background: "rgba(48, 51, 99, 1)",
                      width: "fit-content",
                      color: "white",
                      borderRadius: "10px",
                      padding: "5px",
                      margin: "20px",
                    }}
                  >
                    View details
                  </h6>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default AllBlogs;
