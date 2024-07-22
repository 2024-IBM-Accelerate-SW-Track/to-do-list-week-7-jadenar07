import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComp from "./component/navigation/NavbarComp";
import * as api from "./services/api";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authUser = async () => {
    const isAuthenticated = await api.authenticate(username, password);
    setAuthenticated(isAuthenticated);
  };

  const createUser = async () => {
    await api.createUser(username, password);
    // Optionally, you can log the user in immediately after account creation
    const isAuthenticated = await api.authenticate(username, password);
    setAuthenticated(isAuthenticated);
  };

  return (
    <div className="App">
      {!authenticated ? (
        <div>
          <label>Username: </label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password: </label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={createUser}>Create User</button>
          <button onClick={authUser}>Login</button>
        </div>
      ) : (
        <NavbarComp />
      )}
    </div>
  );
}

export default App;
