/* global gtag */

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
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import CookieConsent from "react-cookie-consent";
import routes from "./Routes/routes";
import { UserContext } from "./login/UserContext";

function App() {
  const [cookies, setCookie] = useCookies(["analytics", "marketing"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Current cookies:", cookies);
    // Enable or disable analytics based on cookie
    if (cookies.analytics === true) {
      console.log("Analytics cookie found, initializing consent as granted.");
      handleConsent(true);
    } else {
      console.log(
        "Analytics cookie not found, initializing consent as denied."
      );
      handleConsent(false);
    }

    // if (cookies.marketing === "true") {
    //   initializeMarketing();
    // }
  }, [cookies]);

  const handleConsent = (analyticsConsent) => {
    // if (typeof gtag === "function") {
    //   gtag("consent", "update", {
    //     ad_storage: accepted ? "granted" : "denied",
    //     analytics_storage: accepted ? "granted" : "denied",
    //   });
    //   console.log(`Google Analytics consent set to: ${accepted}`);
    // }
    gtag("consent", "update", {
      ad_storage: analyticsConsent ? "granted" : "denied",
      analytics_storage: analyticsConsent ? "granted" : "denied",
    });
    console.log(`Google Analytics consent set to: ${analyticsConsent}`);
  };

  const initializeAnalytics = () => {
    // Google Analytics initialization using gtag.js
    // const script = document.createElement("script");
    // script.async = true;
    // script.src = "https://www.googletagmanager.com/gtag/js?id=G-2DZV8XEDJY";
    // document.head.appendChild(script);
    // script.onload = () => {
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag() {
    //     window.dataLayer.push(arguments);
    //   }
    //   gtag("js", new Date());
    //   gtag("config", "G-2DZV8XEDJY");
    //   console.log("Google Analytics initialized.");
    // };
    // ReactGA.initialize("G-2DZV8XEDJY");
    // ReactGA.pageview(window.location.pathname + window.location.search);
    // console.log("Google Analytics initialized");
  };

  const initializeMarketing = () => {
    //todo: Add marketing tools initialization code here, e.g., Facebook Pixel.
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="app">
          <Header />
          <div className="app-content">
            <Routes>
              {routes.map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />
              ))}
            </Routes>
            {/* <Routes>
            <Route>
              
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

              
              <Route path="/series/:title" element={<DetailPage />} />
              <Route path="/information/:title" element={<InformationPage />} />
              <Route
                path="/character/:characterName"
                element={<CharacterPage />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Route>
          </Routes> */}
          </div>
          <Footer />
          {/* Cookie Consent Banner */}
          <CookieConsent
            onAccept={(acceptedByScrolling) => {
              setCookie("analytics", "true", {
                path: "/",
                maxAge: 30 * 24 * 60 * 60,
              });
              // initializeAnalytics();
              // setCookie("marketing", "true", {
              //   path: "/",
              //   maxAge: 30 * 24 * 60 * 60,
              // });

              // initializeMarketing();
            }}
            location="bottom"
            buttonText="Accept All"
            cookieName="analytics"
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}
          >
            We use cookies to improve your experience and analyze website
            traffic. By clicking "Accept All," you consent to the use of cookies
            for analytics and marketing purposes. For more information, please
            review our{" "}
            <a href="/privacy-policy" style={{ color: "#FFD700" }}>
              Privacy Policy
            </a>
            .
          </CookieConsent>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
