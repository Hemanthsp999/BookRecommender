import AtomicHabits from "../images/BooksImg/atomicHabits.jpg";
import DieHard from "../images/BooksImg/DieHard.jpg";
import HungerGames from "../images/BooksImg/TheHungerGames.jpg";
import WorldWarZ from "../images/BooksImg/WorldWarZ.jpg";
import Martian from "../images/BooksImg/TheMartian.jpg";

const BookCard = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-2 col-sm-3 col-md-3 flex-row" style={{cursor:"pointer"}}>
          <img
            className="img-fluid img-thumbnail rounded d-flex flex-sm-row"
            style={{ height: "auto", maxWidth: "100%" }}
            src={AtomicHabits}
            alt="Atomic Habits.jpg"
          />
        </div>
        <div className="col-xs-2 col-sm-3 col-md-3 flex-row" style={{cursor:"pointer"}}>
          <img
            className="img-fluid img-thumbnail rounded mx-1 d-flex flex-nowrap flex-sm-column"
            style={{ height: "95%", maxWidth: "100%" }}
            src={DieHard}
            alt="Die Hard.jpg"
          />
        </div>
        <div className="col-xs-2 col-sm-3 col-md-3" style={{cursor:"pointer"}}>
          <img
            className="img-fluid img-thumbnail rounded d-flex flex-row flex-wrap"
            style={{ height: "auto", maxWidth: "100%" }}
            src={HungerGames}
            alt="Hunger Games.jpg"
          />
        </div>
        <div className="col-xs-2 col-sm-3 col-md-3 flex-row">
          <img
            className="img-fluid img-thumbnail rounded d-flex flex-row flex-wrap"
            src={WorldWarZ}
            alt="World War Z.jpg"
          />
        </div>
        <div className="col-xs-4 col-sm-3 col-md-3">
          <img
            className="img-fluid img-thumbnail rounded d-flex flex-row flex-wrap"
            src={Martian}
            alt="World War Z.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
