import { Component } from "react";
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

export default class Books extends Component {
  render() {
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
        title: "The Hunger Games",
        ImgSource: HungerGames,
      },
      {
        id: 4,
        title: "World War Z",
        ImgSource: WorldWar,
      },
      {
        id: 5,
        title: "Ready Player One",
        ImgSource: PlayerOne,
      },
      {
        id: 6,
        title: "Dopamine Detox",
        ImgSource: Dopamine,
      },
      {
        id: 7,
        title: "Attitude Is Everything",
        ImgSource: AttitudeIsEveryThing,
      },
      {
        id: 8,
        title: "The Art of being alone",
        ImgSource: Alone,
      },
      {
        id: 9,
        title: "The Monk Who Sold His Ferrari",
        ImgSource: TheMonk,
      },
      {
        id: 10,
        title: "The Subtle Art Of Not Giving A Fuck",
        ImgSource: NotGivingAFuck,
      },
    ];
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
                    <Link onClick="" className="text-decoration-none">
                      <img
                        src={image.ImgSource}
                        className="bg-image hover-zoom img-fluid rounded mx-2 img-center"
                        style={{ height: "200px", width: "150px" }}
                        alt="...."
                      />
                      <div className="flex-wrap" style={{flex: "wrap"}}>
                      <p
                        className="text-center text-black"
                        style={{ overflowWrap: "break-word" }}
                      >
                        {image.title}
                      </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </ScrollingCarousel>
          </div>
        </div>
      </div>
    );
  }
}
