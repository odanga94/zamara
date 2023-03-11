import { View, Text } from "react-native";

const Dashboard = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dashboard Screen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
    return {
      headerTitle: "Dashboard",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconName={Platform.OS === "android" ? "home" : "ios-home"}
            onPress={() => 
              navData.navigation.navigate("Cart")
            }
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Drawer"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    };
  };

export default Dashboard;
