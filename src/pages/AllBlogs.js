import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../App.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const scrollRef = useRef();

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
                        .map((blog, i, _id) => (
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
                          />
                        ))}
                    </>
                  ) : (
                    <img
                      src={blogs[config.index]?.coverImageSrc}
                      alt={`Cover of blog titled ${blogs[config.index]?.title}`}
                      style={{
                        width: "100%",
                        height: config.height,
                        borderRadius: "8px",
                        marginBottom: colIndex === 2 ? "3vh" : "0",
                      }}
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
      <div className="headings">
        <h4>
          Most viewed <span>Blogs</span>
        </h4>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
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
                <div className="moving-section ">
                  <img
                    src={blog.coverImageSrc}
                    alt="img"
                    style={{
                      height: "150px",
                      width: "150px",
                      borderRadius: "8px",
                      // marginBottom: "10px",
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
                      {blog.summary?.slice(0, 100)}...
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
    </Container>
    </>
  );
};

export default AllBlogs;
