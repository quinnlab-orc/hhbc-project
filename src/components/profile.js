import { useEffect, useState } from "react";
const axios = require("axios");

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({});
  //     const timestamp = Date.now()
  // //   console.log(Date.now());
  //   console.log(
  //     new Intl.DateTimeFormat("en-US", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //     }).format(timestamp)
  //   );
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

export default Profile;