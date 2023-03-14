import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthNavigator } from "./AuthNavigator";
import { MenuNavigator } from "./MenuNavigator";

const RootStack = createStackNavigator();
const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Menu"
          component={MenuNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
