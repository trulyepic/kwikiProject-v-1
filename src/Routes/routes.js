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
];

export default routes;
