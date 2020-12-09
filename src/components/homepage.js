import { useEffect, useState } from "react";
const axios = require("axios");

const HomePage = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/getUser")
      .then(function (response) {
        console.log(response.data.firstname);
        setName(", " + response.data.firstname + ",");
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="Homepage">
      <h1>Welcome{name} to the Hip Hop Book Club home page!</h1>
      <p>
        Here we can check on all the albums in the list and vote on what album
        will be chosen for the next week.
      </p>
      <div>
        <h3>This week's album is: </h3>
      </div>
    </div>
  );
};

export default HomePage;