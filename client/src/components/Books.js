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
import ObjectID from "bson-objectid";

const Books = () => {
  const Images = [

    {
      id: ObjectID("65419a8c6b356c76812b31c2"),
      title: "Atomic Habits",
      ImgSource: AtomicHabit,
    },
    {
      id: ObjectID("65429fbb6b356c76812b31d8"),
      title: "Die Hard",
      ImgSource: DieHard,
    },
    {
      id: ObjectID("65425bd46b356c76812b31d5"),
      title: "Hunger Games",
      ImgSource: HungerGames,
    },
    {
      id: ObjectID("65425bd46b356c76812b31d4"),
      title: "The World War Z",
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

  function getServer(_id) {
    const getData = {
      "_id": _id,
    };
    var Jsondata = JSON.stringify(getData);
    console.log(Jsondata);
    axios
      .get(`http://localhost:8080/book/${_id}`, { params: { _id } })
      .then(function (response) {
        console.log("data", response.data);
      })
      .catch((e) => {
        console.log("Error in fetching", e);
      });
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
                  <Link
                    className="text-decoration-none"
                    to={`/book/${image.id}`}
                  >
                    <img
                      src={image.ImgSource}
                      className="img-fluid rounded mx-2 img-hover img-center"
                      style={{ height: "200px", width: "150px" }}
                      alt="...."
                      onSubmit={getServer(image.id)}
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
