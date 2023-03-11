import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "./Auth";
import Menu from "./Dashboard";
import { MenuNavigator } from "./MenuNavigator";
import constants from "../utils/constants";

const RootStack = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? constants.secondaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : constants.secondaryColor,
  headerTitleStyle: {
    fontFamily: "poppins-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "poppins-regular",
  },
};

const MenuStack = () => {
  return (
    <RootStack.Navigator screenOptions={defaultNavOptions} headerMode={'none'}>
      <RootStack.Screen
        name="Menu"
        component={Menu}
        options={{ headerTitleAlign: "center", title: "Zamara App" }}
      />
    </RootStack.Navigator>
  );
};

const AppStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Auth"
      headerMode={"screen"}
      screenOptions={defaultNavOptions}
    >
      <RootStack.Screen
        name="Auth"
        component={Auth}
        options={{
          title: "Sign In",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />
      <RootStack.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          title: "Zamara App",
          headerShown: true,
          headerTitleAlign: "center",
        }}
      />

      {/* <RootStack.Screen
        name="LogOut"
        component={LogOut}
        options={{headerShown: false}}
      /> */}
    </RootStack.Navigator>
  );
};

export default AppStack;
