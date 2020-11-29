import React from "react";

import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

// import logo from "./logo.svg";
// import "./App.css";`

// function Record(props) {
//   return (
//     <>
//       <div style={{ border: "1px solid black", marginBottom: "10px" }}>
//         <div> Name: {props.name} </div>
//         <div> Lessons: {props.lessons} </div>
//         <div> Passed: {props.passed ? "Passed" : "Keep Going!"} </div>
//       </div>
//       <div>{props.children}</div>
//     </>
//   );
// }

function App() {
  const schoolEndpoint = "https://divya-school-api.uc.r.appspot.com/";
  const [school, setSchool] = React.useState([]);

  //Add new student form state
  const [name, setName] = React.useState("");
  const [lessons, setLessons] = React.useState(0);
  const [passed, setPassed] = React.useState(false);

  //Get request
  const getSchool = () => {
    fetch(schoolEndpoint)
      .then((response) => response.json())
      .then((data) => setSchool(data));
  };

  //Post request
  const postStudent = () => {
    let student = {
      name: name,
      passed: passed,
      lessons: lessons,
    };
    console.log(student);
    fetch(schoolEndpoint, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",

      body: JSON.stringify(student),
    }).then(() => {
      getSchool();
    });
    // setSchool([...school, student]);
  };

  //on page load
  React.useEffect(() => {
    getSchool();
  }, []);

  //render page
  return (
    <div className="App">
      {school.map((student) => {
        return (
          <>
            <Paper style={{ marginBottom: "10px" }}>
              <TextField label="Name" value={student.name} />
              <TextField
                label="Lessons"
                type="Number"
                value={student.lessons}
              />
              <FormControlLabel
                control={<Checkbox checked={student.passed} />}
                label="Passed"
              />
            </Paper>
          </>
        );
      })}
      <Divider />
      {/* Add student form */}
      <div style={{backgroundColor:"yellow"}}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Lessons"
          type="number"
          value={lessons}
          onChange={(e) => {
            setLessons(e.target.value);
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={passed}
              onChange={(e) => {
                setPassed(e.target.checked);
              }}
              name="checkedB"
              color="primary"
            />
          }
          label="Passed"
        />

        <Button onClick={postStudent}> Submit </Button>
      </div>
    </div>
  );
}

export default App;
