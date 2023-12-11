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
import Book from "./Book";

const Books = () => {
  const Images = [
    {
      id: 1,
      title: "Atomic Habits",
      ImgSource: AtomicHabit,
    },
    {
      id: 2,
      title: "Die Hard",
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
  ];

  function onComponentClick(id) {
    console.log("this is in books part", id);
    const d = id;
    <Book Id={d} />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="mx-1 fs-5" style={{ fontFamily: "sans-serif" }}>
            Recommended Books
          </h3>
          <ScrollingCarousel className="m-1">
            {Images.map((image) => {
              return (
                <div key={image.id}>
                  {console.log(image.id)}
                  <Link className="text-decoration-none" to={`/book/${image.id}`}>
                    <img
                      src={image.ImgSource}
                      className="img-fluid rounded mx-2 img-hover img-center"
                      style={{ height: "200px", width: "150px" }}
                      alt="...."
                      onClick={onComponentClick(image.id)}
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
