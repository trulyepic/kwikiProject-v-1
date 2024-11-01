import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Featured from "./components/Featured";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilteredPage from "./components/FilteredPage";

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
            <Route path="/filtered" element={<FilteredPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
