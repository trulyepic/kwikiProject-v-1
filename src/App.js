import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Featured from "./components/Featured";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilteredPage from "./components/FilteredPage";
import DetailPage from "./components/DetailPage";
import InformationPage from "./components/information-page/InformationPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route>
            {/*Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Featured />
                  <Grid />
                  <Footer />
                </>
              }
            />
            <Route
              path="/filtered"
              element={
                <>
                  <FilteredPage />
                  <Footer />
                </>
              }
            />

            {/*series detail page*/}
            <Route path="/series/:title" element={<DetailPage />} />
            <Route path="/information/:title" element={<InformationPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
