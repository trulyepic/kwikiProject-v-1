import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailPage from "./components/DetailPage";
import InformationPage from "./components/information-page/InformationPage";
import HomePage from "./components/HomePage";
import CharacterPage from "./components/character-info-page/CharacterPage";
import SeriesList from "./components/series-list/SeriesList";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-content">
          <Routes>
            <Route>
              {/*Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <HomePage />
                  </>
                }
              />
              <Route
                path="/seriesList"
                element={
                  <>
                    <SeriesList />
                  </>
                }
              />

              {/*series detail page*/}
              <Route path="/series/:title" element={<DetailPage />} />
              <Route path="/information/:title" element={<InformationPage />} />
              <Route
                path="/character/:characterName"
                element={<CharacterPage />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
