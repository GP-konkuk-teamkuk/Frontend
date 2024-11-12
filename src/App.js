import "./App.css";
import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider, HomePageContext } from "components/Context";
import P_Main from "pages/Home";
import P_Voice_Upload from "pages/Voice_Upload";
import P_Voice_Encoding from "pages/Voice_Encoding";
import P_Book_List from "pages/Book_List";
import P_Audiobook_Player from "pages/Audiobook_Player";
import P_Book_Detail from "pages/Book_Detail";
import P_Production_Progress from "pages/Production_Progress";
import Layout from "containers/Layout";
import P_Register from "pages/Register";
import P_Production_Complete from "pages/Production_Complete";
export const SERVER_URL = "http://localhost:3001";

function App() {
  const [homePage, setHomePage] = useState("home");
  // const [homePage, setHomePage] = useState("register");
  // const [homePage, setHomePage] = useState("login");

  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <HomePageContext.Provider value={{ homePage, setHomePage }}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<P_Main />} />
                <Route path="/register" element={<P_Register />} />
                <Route path="/voice-upload" element={<P_Voice_Upload />} />
                {/* <Route path="/voice-encoding" element={<P_Voice_Encoding />} /> */} // 2차 발표
                이후 UX 개선 시 구현
                <Route path="/book-list" element={<P_Book_List />} />
                <Route path="/book-detail" element={<P_Book_Detail />} />
                <Route path="/production-progress" element={<P_Production_Progress />} />
                <Route path="/production-complete" element={<P_Production_Complete />} />
                <Route path="/audiobook-player" element={<P_Audiobook_Player />} />
              </Route>
            </Routes>
          </HomePageContext.Provider>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
