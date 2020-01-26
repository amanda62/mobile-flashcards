import { createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeView from "../screens/HomeView";
import DeckView from "../screens/DeckView";
import CreateCardView from "../screens/CreateCardView";
import CreateDeckView from "../screens/NewDeckView";
import QuizView from "../screens/QuizView";

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: { screen: HomeView },
      Deck: { screen: DeckView },
      CreateDeck: { screen: CreateDeckView },
      CreateCard: { screen: CreateCardView },
      Quiz: { screen: QuizView }
    },
    {
      initialRouteName: "Main"
    }
  )
);
