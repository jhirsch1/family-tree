import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/main.css";
import { NullableDate } from "./types";
import Person from "./Person";
import csv_hirschhorn from "../data/Hirschhorn_Family_Hirschhorn.csv?raw";
import csv_both from "../data/Hirschhorn_Family_Both.csv?raw";
import Papa from "papaparse";
import { func } from "prop-types";

function App() {
  // list of people in the tree, formatted as a list of dictionaries
  // each dictionary is a row in the csv file
  // the keys are the headers of the csv file
  const [peoplelist, setPeopleList] = useState<Array<Record<string, string>>>(
    Papa.parse(csv_hirschhorn, {
      header: true,
      skipEmptyLines: true,
    }).data as Array<Record<string, string>>
  );

  // console.log(peoplelist[17]);
  // console.log(peoplelist[17].info.includes("\n"));

  // Password box
  const [textbox, setTextbox] = useState("");
  const [open, setOpen] = useState(false);

  function handleSubmit() {
    if (textbox === "Password") {
      setOpen(true);
    }
  }

  // Family of the family tree - not in use now, maybe in the future
  const [tree, setTree] = useState("Hirschhorn");

  function handleClickHirschhorn() {
      // Handle click event
      console.log("Clicked on Hirschhorn");
      // setClicked(!clicked); // Toggle clicked state
      setTree("Hirschhorn");
      setPeopleList(
        Papa.parse(csv_hirschhorn, {
          header: true,
          skipEmptyLines: true,
        }).data as Array<Record<string, string>>
      );
  }
  function handleClickBoth() {
      // Handle click event
      console.log("Clicked on Bronsther");
      // setClicked(!clicked); // Toggle clicked state
      setTree("Bronsther");
      setPeopleList(
        Papa.parse(csv_both, {
          header: true,
          skipEmptyLines: true,
        }).data as Array<Record<string, string>>
      );
  }

  return (
    <div className="App">
      <header>
        <h1>Family Tree</h1>
        <div className="toggle_tree">
          <div className="toggle_button button2" onClick={handleClickBoth}>
            Both
          </div>
          <div
            className="toggle_button button1"
            onClick={handleClickHirschhorn}
          >
            {" "}
            Hirschhorn{" "}
          </div>
        </div>
        <p>Click on a person to see their details.</p>
      </header>

      {!open ? (
        <div>
          <input
            type="text"
            aria-label="Password input box"
            aria-description="Type password in this input box"
            className="PasswordBox"
            placeholder="Enter Password"
            onChange={(e) => setTextbox(e.target.value)}
            value={textbox}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button
            aria-label="Enter Button"
            aria-description="Click this button to input the password"
            className="password_button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : null}

      {open
        ? peoplelist.map((person, index) => (
            <Person
              name={person.name}
              birth={person.birth}
              death={person.death}
              marriage_date={person.marriage_date}
              father={person.father}
              mother={person.mother}
              spouse={person.spouse}
              children={person.children}
              info={person.info}
              birth_place={person.birth_place}
              death_place={person.death_place}
              marriage_place={person.marriage_place}
              generation={person.generation}
              spouse2={person.spouse2}
              marriage_place2={person.marriage_place2}
              marriage_date2={person.marriage_date2}
              children2={person.children2}
              index={person.index}
            />
          ))
        : null}
    </div>
  );
}

export default App;
