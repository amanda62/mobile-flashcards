import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator } from "react-navigation";

import HomeView from "../screens/HomeView";
import DeckView from "../screens/DeckView";
import CreateDeckView from "../screens/CreateDeckView";
import CreateCardView from "../screens/CreateCardView";
import QuizView from "../screens/QuizView";

const switchNavigator = createSwitchNavigator({
  Main: { screen: HomeView },
  Deck: { screen: DeckView },
  CreateDeck: { screen: CreateDeckView },
  CreateCard: { screen: CreateCardView },
  Quiz: { screen: QuizView }
});
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
