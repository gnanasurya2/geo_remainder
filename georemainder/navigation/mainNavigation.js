import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "../screen/HomeScreen";
import RemainderScreen from "../screen/RemainderScreen";

import Color from "../constants/colors";
const MainNavigator = createStackNavigator(
  {
    home: HomeScreen,
    remainder: RemainderScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.primary
      },
      headerTintColor: "white"
    }
  }
);

export default createAppContainer(MainNavigator);
