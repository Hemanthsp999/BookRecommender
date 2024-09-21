import { useLocation } from "react-router-dom";

const Book = () => {
  /* individual Books shelf  */

  // Decode the title from Books.js
  const location = useLocation();
  const { title, pdfLink, author, stars } = location.state || {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "monospace",
      }}
    >
      <h4>
        Book Title: <b>{title}</b>
      </h4>
      <small>
        <em>
          Author: <b>{author}</b>, Ratings: <b>{stars}</b>
        </em>
      </small>
      <hr />

      {pdfLink ? (
        <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
          <a href={pdfLink} target="_blank" rel="noopener noreferrer">
            <button
              className="btn btn-primary"
              style={{ marginBottom: "20px" }}
            >
              Open PDF
            </button>
          </a>
          {/* PDF Viewer */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "100%",
              height: "0",
              overflow: "hidden",
              background: "#f1f1f1",
            }}
          >
            <iframe
              src={pdfLink}
              title="PDF viewer"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            >
              This browser does not support PDFs. Please download the PDF to
              view it.
            </iframe>
          </div>
        </div>
      ) : (
        <p>No PDF available for this book.</p>
      )}
    </div>
  );
};

export default Book;
