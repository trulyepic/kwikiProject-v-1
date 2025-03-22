import React from "react";
import HomePage from "../components/HomePage";
import SeriesList from "../components/series-list/SeriesList";
import DetailPage from "../components/DetailPage";
import InformationPage from "../components/information-page/InformationPage";
import CharacterPage from "../components/character-info-page/CharacterPage";
import Contact from "../components/Contact";
import PrivacyPolicy from "../components/PrivacyPolicy";
import AddSeries from "../components/add-series/AddSeries";
import AddSeriesCharacter from "../components/AddSeriesCharacters/AddSeriesCharacter";
import AddSeriesDetails from "../components/add-series-detail/AddSeriesDetails";
import AddCharacterDetails from "../components/add-character-details/AddCharacterDetails";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../login/RegisterForm";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/seriesList", element: <SeriesList /> },
  { path: "/series/:title", element: <DetailPage /> },
  { path: "/information/:title", element: <InformationPage /> },
  { path: "/character/:characterName", element: <CharacterPage /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/addSeries", element: <AddSeries /> },
  { path: "/addSeriesCharacter", element: <AddSeriesCharacter /> },
  { path: "/addSeriesDetails/:title", element: <AddSeriesDetails /> },
  {
    path: "/addCharacterDetails/:characterName",
    element: <AddCharacterDetails />,
  },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegisterForm /> },
];

export default routes;
