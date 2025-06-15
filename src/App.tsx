import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../styles/main.css";
import { NullableDate } from "./types";
import Person from "./Person";
import csv from "../data/Hirschhorn_Family1.csv?raw";
import Papa from "papaparse";

// console.log(csv.indexOf("\n"));
// console.log(csv.slice(0, 173));

function csvToDictList(csv: string): Array<Record<string, string>> {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const record: Record<string, string> = {};

    headers.forEach((header, i) => {
      record[header.trim()] = values[i]?.trim() ?? "";
    });

    return record;
  });
}


function App() {

    // list of people in the tree, formatted as a list of dictionaries
    // each dictionary is a row in the csv file
    // the keys are the headers of the csv file
    const [peoplelist, setPeopleList] = useState<
        Array<Record<string, string>>
      >(Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
      }).data);

    console.log(peoplelist[0]);


    return (
        <div className="App">
            <h1>Family Tree</h1>
            <p>Click on a person to see their details.</p>

            {peoplelist.map((person, index) => (
            <Person
                name={person.name}
                birth={
                    person.birth
                        // ? {
                        //     year: parseInt(person.birth.split(" ")[0]),
                        //     month: person.birth.split(" ")[1],
                        //     day: parseInt(person.birth.split(" ")[2]),
                        // }
                        // : null
                }
                death={
                    person.death
                        // ? {
                        //     year: parseInt(person.death.split(" ")[0]),
                        //     month: person.death.split(" ")[1],
                        //     day: parseInt(person.death.split(" ")[2]),
                        // }
                        // : null
                }
                marriage_date={
                    person.marriage_date
                        // ? {
                        //     year: parseInt(person.marriage_date.split(" ")[0]),
                        //     month: person.marriage_date.split(" ")[1],
                        //     day: parseInt(person.marriage_date.split(" ")[2]),
                        // }
                        // : null
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
                        // ? {
                        //     year: parseInt(person.marriage_date2.split(" ")[0]),
                        //     month: person.marriage_date2.split(" ")[1],
                        //     day: parseInt(person.marriage_date2.split(" ")[2]),
                        // }
                        // : null
                }
                children2={person.children2}
            />
            ))}

        </div>



    );
}

export default App;