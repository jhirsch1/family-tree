import { useState } from "react";
import "../styles/Person.css";
import { number } from "yargs";
import { NullableDate } from "./types";

// interface containing the React inputs to the class
interface PersonProps {
  name: String;
  birth: NullableDate | null;
  death: NullableDate | null;
  marriage_date: Date | null;
  father: PersonProps | null;
  mother: PersonProps | null;
  spouse: PersonProps | null;
  spouse2: PersonProps | null;
  children: PersonProps[];
  info: String | null;
  birth_place: String | null;
  death_place: String | null;
  marriage_place: String | null;
  indent: number | null;
  row: number | null;
}

// helper function to help determine the position on screen of the person box
function position(indent: number | null, row: number | null) {
  let indent_str: string;
  let row_str: string;
  if (indent === null || row === null) {
    // If indent or col is null, default to 0
    indent_str = "0vw";
    row_str = "0vh";
    return {
      left: indent_str,
      top: row_str,
    };
  } else {
    // change this based on how large we want it
    let row1: number = row * 5.5;
    let indent1: number = indent * 5.5;

    indent_str = indent1.toString() + "vw";
    row_str = row1.toString() + "vh";

    return {
      left: indent_str,
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
        style={position(props.indent, props.row)}
        onClick={handleClick}
      >
        {props.name}: {JSON.stringify(props.birth)} {props.birth_place} -{" "}
        {JSON.stringify(props.death)} {props.death_place}
      </div>
      {/* Info box should appear only when clicked */}
      {!clicked ? (
        <div className="info">
          <p>father: {JSON.stringify(props.father?.name)}</p>
          <p>mother: {JSON.stringify(props.mother?.name)}</p>
          <p>spouse: {JSON.stringify(props.spouse?.name)}</p>
          <p>spouse2: {JSON.stringify(props.spouse2?.name)}</p>
          <p>marriage_place: {JSON.stringify(props.marriage_place)}</p>
          <p>marriage_date: {JSON.stringify(props.marriage_date)}</p>
          <p>
            children:{" "}
            {JSON.stringify(props.children.map((child) => child.name))}
          </p>
          <p>{props.info}</p>
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
