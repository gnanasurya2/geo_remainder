//react-navigation-stack and are react-navigation are the packages that we require to use navigation in the app.
import {
  createStackNavigator
} from "react-navigation-stack";
import {
  createAppContainer
} from "react-navigation";
// import all the screen that you are going to use in the app to add it into navigator.
import HomeScreen from "../screen/HomeScreen";
import RemainderScreen from "../screen/RemainderScreen";

import Color from "../constants/colors";
import LoginScreen from "../screen/LoginScreen";
const MainNavigator = createStackNavigator({
  //syntax : display_name:screen_name
  login: LoginScreen,
  home: HomeScreen,
  remainder: RemainderScreen
}, {
  //defaultNavigationOptions is used to add styles and add default value to the navigator.
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Color.primary
    },
    //headerTintColor is used to change the color of the text in the navigator.
    headerTintColor: "white"
  }
});
//exporting the navigator to be used in the app.
export default createAppContainer(MainNavigator);