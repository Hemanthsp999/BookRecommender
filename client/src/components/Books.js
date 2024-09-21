import Dopamine from "./images/BooksImg/DopamineDetox.jpg";
import AtomicHabit from "./images/BooksImg/atomicHabits.jpg";
import HungerGames from "./images/BooksImg/TheHungerGames.jpg";
import WorldWar from "./images/BooksImg/WorldWarZ.jpg";
import DieHard from "./images/BooksImg/DieHard.jpg";
import PlayerOne from "./images/BooksImg/TheReadyPlayerOne.jpg";
import TheMonk from "./images/BooksImg/TheMonk.jpg";
import NotGivingAFuck from "./images/BooksImg/NotGivingAFuck.jpg";
import Alone from "./images/BooksImg/TheArtOfBeingAlone.jpg";
import AttitudeIsEveryThing from "./images/BooksImg/AttitudeIsEveryThing.jpg";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { useAuth } from "./authenticate/AuthContext";

const Books = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState([
    {
      title: "Atomic Habits",
      ImgSource: AtomicHabit,
    },
    {
      title: "Die Hard",
      ImgSource: DieHard,
    },
    {
      title: "Hunger Games",
      ImgSource: HungerGames,
    },
    {
      title: "The World War Z",
      ImgSource: WorldWar,
    },
    {
      title: "Ready Player One",
      ImgSource: PlayerOne,
    },
    {
      title: "Die Hard",
      ImgSource: Dopamine,
    },
    {
      title: "Attitude is Everythign",
      ImgSource: AttitudeIsEveryThing,
    },
    {
      title: "Alone",
      ImgSource: Alone,
    },
    {
      title: "The Monk",
      ImgSource: TheMonk,
    },
    {
      title: "Not Giving A Fuck",
      ImgSource: NotGivingAFuck,
    },
  ]);

  const HandleOnClick = async (title) => {
    const URL = "http://localhost:8080/book";

    try {
      const getData = await axios.get(URL, {
        params: { title },
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      const response = await getData.data;
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="mx-1 fs-5" style={{ fontFamily: "sans-serif" }}>
            <b>Most Popular Books</b>
          </h3>
          <ScrollingCarousel className="m-1">
            {books.map((book) => (
              <div key={book.id}>
                {/*{console.log(book.id)} */}
                <Link
                  className="text-decoration-none"
                  to={`/books/${book.id}`}
                  state={{
                    title: book.title,
                    pdfLink: book.pdfLink,
                    author: book.author,
                    stars: book.stars,
                  }}
                >
                  <img
                    src={book.ImgSource}
                    className="img-fluid rounded mx-2 img-hover img-center"
                    style={{ height: "200px", width: "150px" }}
                    onClick={HandleOnClick(book.title)}
                    alt={book.title || "....."}
                  />
                </Link>
              </div>
            ))}
          </ScrollingCarousel>
        </div>
      </div>
    </div>
  );
};

export default Books;
