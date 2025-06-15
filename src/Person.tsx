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
  index: number | null;
}

// helper function to help determine the position on screen of the person box
function position(indent: String | null, row: number | null) {
  let indent_str: string;
  let row_str: string;
  if (indent === null || row === null) {
    // If indent or col is null, default to 0
    indent_str = "0vw";
    row_str = "0vh";
    return {
    //   left: indent_str,
      top: row_str,
    };
  } else {
    // change this based on how large we want it
    let row1: number = row * 5.5;
    // let indent1: number = indent * 5.5;

    // indent_str = indent1.toString() + "vw";
    row_str = row1.toString() + "vh";

    return {
    //   left: indent_str,
      top: row_str,
    };
  }
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

  // aria-label for accessibility
  const aria_label = "Person: " + props.name;

  return (
    <>
      <div
        aria-label={aria_label}
        aria-description="a person in the family tree"
        className="Person"
        style={position(props.generation, props.index)}
        onClick={handleClick}
      >
        {props.name}: {props.birth} {props.birth_place} - {props.death}{" "}
        {props.death_place}
      </div>
      {/* Info box should appear only when clicked */}
      {clicked ? (
        <div className="Info">
          <p className="Info_par">father: {props.father}</p>
          <p className="Info_par">mother: {props.mother}</p>
          <p className="Info_par">spouse: {props.spouse}</p>
          <p className="Info_par">marriage_place: {props.marriage_place}</p>
          <p className="Info_par">marriage_date: {props.marriage_date}</p>
          <p className="Info_par">children: {props.children}</p>
          <p className="Info_par">spouse2: {props.spouse2}</p>
          <p className="Info_par">marriage_place2: {props.marriage_place2}</p>
          <p className="Info_par">marriage_date2: {props.marriage_date2}</p>
          <p className="Info_par">children2: {props.children2}</p>
          <p className="Info_par">Info: {props.info}</p>
        </div>
      ) : null}

      {/* <Person
        name={props.spouse?.name || "Unknown Spouse"}
        birth={props.spouse?.birth || null}
        death={props.spouse?.death || null}
        marriage_date={props.spouse?.marriage_date || null}
        father={props.spouse?.father || null}
        mother={props.spouse?.mother || null}
        spouse={props.spouse?.spouse || null}
        children={props.spouse?.children || []}
        info={props.spouse?.info || null}
        birth_place={props.spouse?.birth_place || null}
        death_place={props.spouse?.death_place || null}
        marriage_place={props.spouse?.marriage_place || null}
        indent={props.spouse?.indent || null}
        row={props.spouse?.row || null}
      /> */}

      {/* list of children - posX and posY are for css styling */}
      {/* {props.children.map((child, index) => (
        <Person
          name={child.name}
          birth={child.birth}
          death={child.death}
          marriage_date={child.marriage_date}
          father={child.father}
          mother={child.mother}
          spouse={child.spouse}
          children={child.children}
          info={child.info}
          birth_place={child.birth_place}
          death_place={child.death_place}
          marriage_place={child.marriage_place}
          indent={props.indent}
          row={props.row}
        />
      ))} */}
    </>
  );
}
