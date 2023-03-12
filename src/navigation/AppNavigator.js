import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthNavigator } from "./AuthNavigator";
import { MenuNavigator } from "./MenuNavigator";
// import constants from "../utils/constants";

const RootStack = createStackNavigator();
const AppNavigator = (props) => {
  /* const isAuth = useSelector((state) => !!state.auth.token);
    const didTryAl = useSelector((state) => state.auth.didTryAutoLogin); */

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
      {/* isAuth &&   <AuthNavigator />}
      {/* !isAuth && didTryAl  &&  <MenuNavigator />}
      {/* !isAuth && !didTryAl &&  <StartUpScreen /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
/* 
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
      /> }
    </RootStack.Navigator>
  );
}; */

// export default AppStack;
