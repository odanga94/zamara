import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Platform,
  SafeAreaView,
  Button,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { useDispatch } from "react-redux";

import DashboardScreen from "./Dashboard";
/* import ProductDetailsScreen, {
  detailsScreenOptions,
} from "../screens/shop/ProductDetailsScreen";
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";
import OrdersScreen, {
  ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, { authScreenOptions } from "../screens/user/AuthScreen"; */
// import { logOut } from "../store/actions/auth";

import constants from "../utils/constants";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? constants.secondaryColor : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : constants.secondaryColor,
};

const DashboardStackNavigator = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <DashboardStackNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={screenOptions}
      />

    </DashboardStackNavigator.Navigator>
  );
};

/* const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
}; */

const MenuDrawerNavigator = createDrawerNavigator();

export const MenuNavigator = () => {
  // const dispatch = useDispatch();
  const [logOutLoading, setLogOutLoading] = useState(false);

  return (
    <MenuDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
                {logOutLoading ? (
                  <ActivityIndicator size="large" color={Colors.primaryColor} />
                ) : (
                  <Button
                    title="Log Out"
                    color={constants.primaryColor}
                    onPress={async () => {
                      setLogOutLoading(true);
                      // await dispatch(logOut());
                      // props.navigation.navigate("Auth");
                    }}
                  />
                )}
              </View>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: constants.secondaryColor,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
      hideStatusBar
    >
      <MenuDrawerNavigator.Screen
        name="Dashboard"
        component={DashboardNavigator}
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
      {/* <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      /> */}
    </MenuDrawerNavigator.Navigator>
  );
};


