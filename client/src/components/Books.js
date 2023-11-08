import { Link } from "react-router-dom";
import AtomicImg from "./images/BooksImg/atomicHabits.jpg";
import HungerGame from "./images/BooksImg/TheHungerGames.jpg";
import DieHard from "./images/BooksImg/DieHard.jpg";
import Martian from "./images/BooksImg/TheMartian.jpg";
import WorlWar from "./images/BooksImg/WorldWarZ.jpg";

const Books = () => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-3">
          <Link onClick="">
            <img
              src={AtomicImg}
              className="img-fluid rounded m-1 d-xs-table-cell pointer"
              alt="Atomic Habits"
            />
          </Link>
        </div>

        <div className="col-md-3 d-xs-table-cell">
          <Link onClick="">
            <img
              src={HungerGame}
              className="img-fluid rounded m-1 d-xs-table-cell"
              alt="Hunger Games"
            />
          </Link>
        </div>
        <div className="col-md-3 d-xs-table-cell">
          <Link onClick="">
            <img
              src={DieHard}
              className="img-fluid rounded m-1"
              alt="Die Hard"
            />
          </Link>
        </div>
        <div className="col-md-3 d-table">
          <Link onClick="">
            <img
              src={Martian}
              className="img-fluid rounded m-1"
              alt="Martian"
            />
          </Link>
        </div>
        <div className="col-md-3 d-table">
          <Link onClick="">
            <img
              src={WorlWar}
              className="img-fluid rounded m-1"
              alt="World War Z"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Books;
