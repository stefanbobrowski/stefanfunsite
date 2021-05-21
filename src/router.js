import React from "react";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Work from "./pages/Work";
import Personal from "./pages/Personal";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";

import Cinder from "./projects/Cinder/Cinder";
import GotVote from "./projects/GotVote/GotVote";
import DataCenter from "./projects/DataCenter/DataCenter";
import CityLife from "./projects/CityLife/CityLife";
import ToDo from "./projects/ToDo/ToDo";
import ImageSearch from "./projects/ImageSearch/ImageSearch";
import SacredGeometry from "./projects/SacredGeometry/SacredGeometry";
import SoulCollector from "./projects/SoulCollector/SoulCollector";
import Timer from "./projects/Timer/Timer";
import Blackjack from "./projects/Blackjack/Blackjack";
import NewTemplate from "./projects/NewTemplate/NewTemplate";
import DataVisuals from "./projects/DataVisuals/DataVisuals";

const routes = {
  "/": () => <Home />,
  "/learn": () => <Learn />,
  "/work": () => <Work />,
  "/personal": () => <Personal />,
  "/contact": () => <Contact />,
  "/pagenotfound": () => <PageNotFound />,
  "/projects/datacenter": () => <DataCenter />,
  "/projects/citylife": () => <CityLife />,
  "/projects/todo": () => <ToDo />,
  "/projects/cinder": () => <Cinder />,
  "/projects/gotvote": () => <GotVote />,
  "/projects/imagesearch": () => <ImageSearch />,
  "/projects/sacredgeometry": () => <SacredGeometry />,
  "/projects/soulcollector": () => <SoulCollector />,
  "/projects/timer": () => <Timer />,
  "/projects/blackjack": () => <Blackjack />,
  "/projects/newtemplate": () => <NewTemplate />,
  "/projects/data-visuals": () => <DataVisuals />
};

export default routes;
