import { View, Text, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../Components/UI/HeaderButton";
import constants from "../../utils/constants";

const Continents = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Continents Screen</Text>
    </View>
  );
};

export const continentsScreenOptions = (navData) => {
  return {
    headerTitle: "CONTINENTS",
    headerTitleAlign: "center",
    /* headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Home"
            iconName={Platform.OS === "android" ? "home" : "ios-home"}
            onPress={() => 
              navData.navigation.navigate("")
            }
          />
        </HeaderButtons>
      ), */
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Drawer"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          color={Platform.OS === "android" ? "#fff" : constants.secondaryColor}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Continents;
