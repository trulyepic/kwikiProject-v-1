import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Featured from "./components/Featured";
import Grid from "./components/Grid";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <Featured />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
