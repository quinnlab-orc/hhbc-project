import { useEffect, useState } from "react";
const axios = require("axios");

const Account = () => {
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/getUser")
      .then(function (response) {
        // console.log(response);
        if (response.data.email) {
          setProfileInfo({
            email: response.data.email,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const logOut = () => {
    axios
      .get("http://localhost:5000/api/users/logout")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="profile">
        <span className="profileinfo">Name: {profileInfo.firstname}</span>
        <span className="profileinfo">Last: {profileInfo.lastname}</span>
        <span className="profileinfo">Email: {profileInfo.email}</span>
      </div>
      <form>
        <button onClick={() => logOut()}>Log Out</button>
      </form>
    </div>
  );
};

export default Account;