import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider, HomePageContext } from "components/Context";
import P_Main from "pages/Home";
import P_Voice_Upload from "pages/Voice_Upload";
import P_Book_List from "pages/Book_List";
import P_Audiobook_Player from "pages/Audiobook_Player";
import P_Book_Detail from "pages/Book_Detail";
import Layout from "containers/Layout";
import P_Register from "pages/Register";
export const SERVER_URL = "http://localhost:3001";

function App() {
  const [homePage, setHomePage] = useState("home");
  // const [homePage, setHomePage] = useState("register");
  // const [homePage, setHomePage] = useState("login");

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <HomePageContext.Provider value={{ homePage, setHomePage }}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<P_Main />} />
                <Route path="/register" element={<P_Register />} />
                <Route path="/voice-upload" element={<P_Voice_Upload />} />
                <Route path="/book-list" element={<P_Book_List />} />
                <Route path="/book-detail" element={<P_Book_Detail />} />
                <Route path="/audiobook-player" element={<P_Audiobook_Player />} />
              </Route>
            </Routes>
          </HomePageContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
