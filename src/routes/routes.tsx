import React from "react";
import LandingPage from "../pages/LandingPage";
import RouteItem from "../models/routes/RouteItem";
import NewReleases from "../pages/NewReleases";
import Top50 from "../pages/Top50";
import SongsWeListen from "../pages/SongsWeListen";
import MyDashboard from "../pages/MyDashboard";
import Settings from "../pages/Settings";
import PlaylistGenerator from "../pages/PlaylistGenerator";
import SpotifyCallback from "../pages/spotify/SpotifyCallback";

const routes: RouteItem[] = [
  {
    path: "/",
    key: "LANDING_PAGE",
    element: <LandingPage />,
  },
  {
    path: "/home",
    key: "HOME_PAGE",
    element: <LandingPage />,
  },
  {
    path: "/new-releases",
    key: "NEW_RELEASES_PAGE",
    element: <NewReleases />,
  },
  {
    path: "/top-50",
    key: "TOP_50_PAGE",
    element: <Top50 />,
  },
  {
    path: "/songs-we-listen",
    key: "SONGS_WE_LISTEN_PAGE",
    element: <SongsWeListen />,
  },
  {
    path: "/my-dashboard",
    key: "MY_DASHBOARD_PAGE",
    element: <MyDashboard />,
  },
  {
    path: "/music-recommendations",
    key: "PLAYLIST_GENERATOR_PAGE",
    element: <PlaylistGenerator />,
  }, 
  {
    path: "/callback",
    key: "SPOTIFY_CALLBACK",
    element: <SpotifyCallback />,
  },
];

export default routes;
