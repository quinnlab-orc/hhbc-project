import { useEffect, useState } from "react";
const axios = require("axios");

const Account = (props) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (props.onLoggedIn.firstname) {
      setProfileInfo(props.onLoggedIn);
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/users/getUser")
      .then(function (response) {
        setProfileInfo(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const logOut = () => {
    axios
      .get("http://localhost:5000/api/users/logout")
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };

  const editAccount = () => {
    setIsEdit(!isEdit);
  };

  const [editedAccount, setEditedAccount] = useState({
    _id: props.onLoggedIn._id,
    firstname: props.onLoggedIn.firstname,
    lastname: props.onLoggedIn.lastname,
    email: props.onLoggedIn.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/editUser", editedAccount)
      .then(function (response) {
        console.log(response);
        setProfileInfo(editedAccount);
        setIsEdit(!isEdit);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={() => logOut()}>
          <button type="submit">Log Out</button>
        </form>
        <button onClick={() => editAccount()}>Edit</button>

        {isEdit === true ? (
          <div>
            <div className="profile">
              <span className="profileinfo">Name: {profileInfo.firstname}</span>
              <span className="profileinfo">Last: {profileInfo.lastname}</span>
              <span className="profileinfo">Email: {profileInfo.email}</span>
            </div>
            <div>
              <form onSubmit={(e) => handleSubmit(e)} className="profileEdit">
                <input
                  className="editInput"
                  placeholder="Name"
                  defaultValue={profileInfo.firstname}
                  onChange={(event) => {
                    setEditedAccount({
                      _id: props.onLoggedIn._id,
                      firstname: event.target.value,
                      lastname: editedAccount.lastname,
                      email: editedAccount.email,
                    });
                  }}
                ></input>
                <input
                  className="editInput"
                  placeholder="Last"
                  defaultValue={profileInfo.lastname}
                  onChange={(event) => {
                    setEditedAccount({
                      _id: props.onLoggedIn._id,
                      firstname: editedAccount.firstname,
                      lastname: event.target.value,
                      email: editedAccount.email,
                    });
                  }}
                ></input>
                <input
                  className="editInput"
                  placeholder="Email"
                  defaultValue={profileInfo.email}
                  type="email"
                  onChange={(event) => {
                    setEditedAccount({
                      _id: props.onLoggedIn._id,
                      firstname: editedAccount.firstname,
                      lastname: editedAccount.lastname,
                      email: event.target.value,
                    });
                  }}
                ></input>
                <button type="submit" className="editInputButton">
                  Submit
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="profile">
            <span className="profileinfo">Name: {profileInfo.firstname}</span>
            <span className="profileinfo">Last: {profileInfo.lastname}</span>
            <span className="profileinfo">Email: {profileInfo.email}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
