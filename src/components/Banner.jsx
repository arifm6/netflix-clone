import React from "react";
import "./Banner.css";
export default function Banner() {
  function truncate(string, numOfChars) {
    return string?.length > numOfChars
      ? string.substr(0, numOfChars - 1) + "..."
      : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAA1BMVEUAAACnej3aAAAASElEQVR4nO3BMQEAAADCoPVPbQhfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeA8XKAAFZcBBuAAAAAElFTkSuQmCC')",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
          <h1 className="banner__description">
            {truncate(
              "This is a test description This is a test descriptionThis is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description",
              150
            )}
          </h1>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
