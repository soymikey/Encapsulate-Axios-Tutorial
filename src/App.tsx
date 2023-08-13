import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { api } from "./axios/api";

function App() {
  async function getUsers() {
    const [e, r] = await api.getUsers();
    if (e || !r) return;
  }

  async function getUsersInfo() {
    const email = "abc@gmail.co1";
    const [e, r] = await api.getUsersInfo(email);
    if (e || !r) return;
  }

  async function checkTokenInvalid() {
    const [e, r] = await api.checkTokenInvalid();
    if (e || !r) return;
  }

  async function checkTokenExpired() {
    const [e, r] = await api.checkTokenExpired();
    if (e || !r) return;
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <button onClick={getUsers}>getUsers</button>
        <button onClick={getUsersInfo}>getUsersInfo</button>
        <button onClick={checkTokenInvalid}>checkTokenInvalid</button>
        <button onClick={checkTokenExpired}>checkTokenExpired</button>
      </div>
    </>
  );
}

export default App;
