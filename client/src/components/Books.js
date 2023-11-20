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

const Books = () => {
  const Images = Object.assign([
    {
      id: 1,
      ImgSource: AtomicHabit,
    },
    {
      id: 2,
      ImgSource: DieHard,
    },
    {
      id: 3,
      ImgSource: HungerGames,
    },
    {
      id: 4,
      ImgSource: WorldWar,
    },
    {
      id: 5,
      ImgSource: PlayerOne,
    },
    {
      id: 6,
      ImgSource: Dopamine,
    },
    {
      id: 7,
      ImgSource: AttitudeIsEveryThing,
    },
    {
      id: 8,
      ImgSource: Alone,
    },
    {
      id: 9,
      ImgSource: TheMonk,
    },
    {
      id: 10,
      ImgSource: NotGivingAFuck,
    },
  ]);

  const handleOnClick = (id) => {
    try {
      fetch("http://localhost:8080/books/id", {
        method: "GET",
        params: JSON.parse(id),
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    } catch {
      console.log("exception");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="mx-1 fs-5" style={{ fontFamily: "sans-serif" }}>
            Recommended Books
          </h3>
          <ScrollingCarousel className="m-1">
            {Images.map((image) => {
              console.log(typeof image.id);
              return (
                <div key={image.id}>
                  <Link className="text-decoration-none">
                    <img
                      src={image.ImgSource}
                      className="img-fluid rounded mx-2 img-hover img-center"
                      style={{ height: "200px", width: "150px" }}
                      alt="...."
                    />
                  </Link>
                </div>
              );
            })}
          </ScrollingCarousel>
        </div>
      </div>
    </div>
  );
};

export default Books;
