import { useState } from "react";
import "../styles/Person.css";
import { number } from "yargs";

// interface containing the React inputs to the class
interface PersonProps {
  name: String;
  birth: Date | null;
  death: Date | null;
  marriage_date: Date | null;
  father: PersonProps | null;
  mother: PersonProps | null;
  spouse: PersonProps | null;
  children: PersonProps[];
  info: String | null;
  birth_place: String | null;
  death_place: String | null;
  marriage_place: String | null;
  posX: number | null;
  posY: number | null;
}

// helper function to help determine the position on screen of the person box
function position(top: number | null, left: number | null) {
  let top_str: string;
  let left_str: string;
  if (top === null || left === null) {
    // If top or left is null, default to 0
    top_str = "0vh";
    left_str = "0vw";
    return {
      left: left_str,
      top: top_str,
    };
  } else {
    top_str = top.toString() + "vh";
    left_str = left.toString() + "vw";

    return {
      left: left_str,
      top: top_str,
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
        style={position(props.posX, props.posY)}
        onClick={handleClick}
      >
        {props.name}: {JSON.stringify(props.birth)} {props.birth_place} -{" "}
        {JSON.stringify(props.death)} {props.death_place}
      </div>
      {!clicked ? (
        <div className="info">
          <p>{props.info}</p>
        </div>
      ) : null}

      <Person
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
        posX={props.spouse?.posX || null}
        posY={props.spouse?.posY || null}
      />

      {/* list of children - posX and posY are for css styling */}
      {props.children.map((child, index) => (
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
          posX={props.posX}
          posY={props.posY}
        />
      ))}
    </>
  );
}
