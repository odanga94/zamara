import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Platform,
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import DashboardScreen, { screenOptions } from "../Screens/Dashboard";
import StaffScreen, { staffScreenOptions } from "../Screens/Staff";
import EditStaffScreen, {
  editStaffScreenOptions,
} from "../Screens/Staff/EditStaff";
import ContinentsScreen, {
  continentsScreenOptions,
} from "../Screens/Continents";
import Button from "../Components/UI/Button";
import { logOut } from "../store/actions/auth";
import constants, { defaultStackNavOptions } from "../utils/constants";

const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={defaultStackNavOptions}
      // headerMode={"none"}
    >
      <HomeStackNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={screenOptions}
      />
    </HomeStackNavigator.Navigator>
  );
};

const StaffStackNavigator = createStackNavigator();

export const StaffNavigator = () => {
  return (
    <StaffStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <StaffStackNavigator.Screen
        name="Staff"
        component={StaffScreen}
        options={staffScreenOptions}
      />
      <StaffStackNavigator.Screen
        name="Edit Staff"
        component={EditStaffScreen}
        options={editStaffScreenOptions}
      />
    </StaffStackNavigator.Navigator>
  );
};

const ContinentsStackNavigator = createStackNavigator();

export const ContinentsNavigator = () => {
  return (
    <ContinentsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <ContinentsStackNavigator.Screen
        name="Staff"
        component={ContinentsScreen}
        options={continentsScreenOptions}
      />
    </ContinentsStackNavigator.Navigator>
  );
};

const MenuDrawerNavigator = createDrawerNavigator();

export const MenuNavigator = () => {
  const dispatch = useDispatch();
  const [logOutLoading, setLogOutLoading] = useState(false);

  return (
    <MenuDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, marginTop: 25 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                {logOutLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={constants.primaryColor}
                  />
                ) : (
                  <Button
                    style={styles.fourthView}
                    onPress={async () => {
                      setLogOutLoading(true);
                      await dispatch(logOut());
                      props.navigation.reset({
                        index: 0,
                        routes: [{ name: "Auth" }],
                      });
                    }}
                  >
                    <Text style={styles.sixthText}>SIGN OUT</Text>
                  </Button>
                )}
              </View>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: constants.primaryColor,
        labelStyle: {
          fontFamily: "poppins-bold",
        },
      }}
      hideStatusBar
    >
      <MenuDrawerNavigator.Screen
        name="HOME"
        component={HomeNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "home" : "ios-home"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <MenuDrawerNavigator.Screen
        name="STAFF"
        component={StaffNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "people" : "ios-people"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <MenuDrawerNavigator.Screen
        name="CONTINENTS"
        component={ContinentsNavigator}
        options={{
          drawerIcon: (props) => (
            <Fontisto name={"world"} size={23} color={props.color} />
          ),
        }}
      />
    </MenuDrawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  fourthView: {
    height: 50,
    width: constants.styleGuide.width / 2,
    backgroundColor: constants.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 50,
    alignSelf: "center",
  },
  sixthText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
