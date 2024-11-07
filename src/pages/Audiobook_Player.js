import "./Audiobook_Player.css";
import play from "../icons/play.svg";
import pause from "../icons/pause.svg";

export default function P_Audiobook_Player() {
  return (
    <>
      <div className="textbook-container">
        <div className="textbook-frame">
          <div className="textbook-content">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem
            Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <span className="textbook-pagenum">100</span>
        </div>
        <div className="textbook-frame">
          <div className="textbook-content"></div>
          <span className="textbook-pagenum"></span>
        </div>
      </div>
      <div className="playbar-container">
        <button className="icon-button">
          <img src={play} alt="play" className="play-icon" />
        </button>
        <button className="icon-button">
          <img src={pause} alt="pause" className="pause-icon" />
        </button>
        <div className="progressbar-background"></div>
      </div>
    </>
  );
}
