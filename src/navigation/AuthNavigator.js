import { createStackNavigator } from "@react-navigation/stack";

import AuthScreen, { authScreenOptions } from "../Screens/Auth";
import { defaultStackNavOptions } from "../utils/constants";

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
