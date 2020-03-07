import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import homeScreen from "../screen/homeScreen";

import Color from "../constants/colors";
const MainNavigator = createStackNavigator(
  {
    home: homeScreen
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
