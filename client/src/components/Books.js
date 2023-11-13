import { Link } from "react-router-dom";
import BookCard from "./booksDir/BookCard";

const Books = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 d-xs-table-cell" style={{ width: "100%" }}>
            <BookCard />
        </div>
      </div>
    </div>
  );
};

export default Books;
