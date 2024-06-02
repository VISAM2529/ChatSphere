import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddFriend from "./components/AddFriend";
import { SocketProvider } from "./context/SocketProvider";
import { Main } from "./components/Main";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <SideBar/> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        {/* Wrap the routes that require the socket with SocketProvider */}
        <SocketProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main/:username" element={<Home />} />
            <Route path="/chat/:username/:friend" element={<Chat />} />
            <Route path="/addFriend/:username" element={<AddFriend />} />
          </Routes>
        </SocketProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
