import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
const axios = require("axios");

const SetNewPassword = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    email: "",
    pass: "",
  });
  const [passConfirm, setPassConfirm] = useState({
    pass: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.pass !== passConfirm.pass) {
      Swal.fire({
        title: "Passwords do not match",
        icon: "warning",
        timer: 2000,
      });
    } else {
      axios
        .post("/api/users/resetPassword", userInfo)
        .then(function (response) {
        //   console.log(response);
          if (response.data === "No matching email in database") {
            Swal.fire({
              title: "No matching email in database",
              icon: "error",
              timer: 2000,
            });
          }
          if (response.data === "New password set") {
            Swal.fire({
              title: "Password succesfully reset!",
              icon: "success",
              timer: 2000,
            });
            history.push("/signin");
          }
        })

        .catch(function (err) {
          console.error(err.message);
        });
    }
  };

  return (
    <div className="newpwDiv">
      <span>Password Reset</span>
      <form className="newpwForm" onSubmit={(e) => handleSubmit(e)}>
          <br />
        <label>Email</label>
        <input
          type="email"
          className="newpwInput"
          onChange={(e) =>
            setUserInfo({
              email: e.target.value,
              pass: userInfo.pass,
            })
          }
        ></input>
        <label>New Password</label>
        <input
          type="password"
          className="newpwInput"
          onChange={(e) =>
            setUserInfo({
              email: userInfo.email,
              pass: e.target.value,
            })
          }
        ></input>
        <label>Confirm Password</label>
        <input
          type="password"
          className="newpwInput"
          onChange={(e) =>
            setPassConfirm({
              pass: e.target.value,
            })
          }
        ></input>
        <button type="submit" className="signupbutton">Submit</button>
      </form>
    </div>
  );
};

export default SetNewPassword;
