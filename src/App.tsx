import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/main.css";
import { NullableDate } from "./types";
import Person from "./Person";
import csv from "../data/Hirschhorn_Family5.csv?raw";
import Papa from "papaparse";
import { func } from "prop-types";


function App() {

    // list of people in the tree, formatted as a list of dictionaries
    // each dictionary is a row in the csv file
    // the keys are the headers of the csv file
    const [peoplelist, setPeopleList] = useState<
        Array<Record<string, string>>
      >(Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
      }).data as Array<Record<string, string>>);

    console.log(peoplelist[0]);

    const [tree, setTree] = useState("Hirschhorn");

    function handleClickHirschhorn() {
        // Handle click event
        console.log("Clicked on Hirschhorn");
        // setClicked(!clicked); // Toggle clicked state
        setTree("Hirschhorn");
    }
    function handleClickBronsther() {
        // Handle click event
        console.log("Clicked on Bronsther");
        // setClicked(!clicked); // Toggle clicked state
        setTree("Bronsther");
    }


    return (
      <div className="App">
        {/* <div className="button1" onClick={handleClickHirschhorn}> Hirschhorn </div>
        <div className="button2" onClick={handleClickBronsther}>Bronsther</div> */}
        <h1>Family Tree</h1>
        <p>Click on a person to see their details.</p>

        {peoplelist.map((person, index) => (
          <Person
            name={person.name}
            birth={
              person.birth
            }
            death={
              person.death
            }
            marriage_date={
              person.marriage_date
            }
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
            marriage_date2={
              person.marriage_date2
            }
            children2={person.children2}
            index={person.index}
          />
        ))}
      </div>
    );
}

export default App;