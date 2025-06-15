import { useState } from "react";
import "../styles/main.css";
import { number } from "yargs";
import { NullableDate } from "./types";

// interface containing the React inputs to the class
interface PersonProps {
  generation: String | null;
  name: String;
  birth: String | null;
  birth_place: String | null;
  death: String | null;
  death_place: String | null;
  father: String | null;
  mother: String | null;
  spouse: String | null;
  marriage_date: String | null;
  marriage_place: String | null;
  children: String | null;
  spouse2: String | null;
  marriage_date2: String | null;
  marriage_place2: String | null;
  children2: String | null;
  info: String | null;
  index: String | null;
}


export default function Person(props: PersonProps) {
  // hook for managing the clicked state
  // This state determines whether the person info is shown or hidden
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    // Handle click event
    console.log(`Clicked on ${props.name}`);
    setClicked(!clicked); // Toggle clicked state
  }

  // aria label for accessibility
  const aria_label = "Person: " + props.name;

  const class_name = "Person_" + props.generation;

  return (
    <>
      <div
        aria-label={aria_label}
        aria-description="a person in the family tree"
        className={class_name}
        onClick={handleClick}
      >
        {props.index} - {props.name}: {props.birth} {props.birth_place} -{" "}
        {props.death} {props.death_place}
      </div>
      {/* Info box should appear only when clicked */}
      {clicked ? (
        <div className="Info_background">
          {/* Each piece of info should only appear when there is data */}
          {props.father ? (
            <p className="Info_par">Father: {props.father}</p>
          ) : null}
          {props.mother ? (
            <p className="Info_par">Mother: {props.mother}</p>
          ) : null}
          {props.spouse ? (
            <p className="Info_par">Spouse: {props.spouse}</p>
          ) : null}
          {props.marriage_date ? (
            <p className="Info_par">Marriage Date: {props.marriage_date}</p>
          ) : null}
          {props.marriage_place ? (
            <p className="Info_par">Marriage Place: {props.marriage_place}</p>
          ) : null}
          {props.children ? (
            <p className="Info_par">Children: {props.children}</p>
          ) : null}
          {props.spouse2 ? (
            <p className="Info_par">Spouse 2: {props.spouse2}</p>
          ) : null}
          {props.marriage_place2 ? (
            <p className="Info_par">
              Marriage Place 2: {props.marriage_place2}
            </p>
          ) : null}
          {props.marriage_date2 ? (
            <p className="Info_par">Marriage Date 2: {props.marriage_date2}</p>
          ) : null}
          {props.children2 ? (
            <p className="Info_par">Children 2: {props.children2}</p>
          ) : null}
          {props.info ? <p className="Info_par">Info: {props.info}</p> : null}
        </div>
      ) : null}
    </>
  );
}
