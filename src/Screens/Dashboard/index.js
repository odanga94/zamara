import { View, Text, Platform, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../Components/UI/HeaderButton";
import constants from "../../utils/constants";
import styles from "./styles";

const Dashboard = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Welcome
          <Text style={styles.userFullName}> {`<firstName lastName>`}</Text>
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>Your profile details are:</Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Age:  </Text>
          50
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Gender:  </Text>
          Male
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Email:  </Text>
          atuny0@sohu.com
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Phone:  </Text>
          +637916758914
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Birth Date:  </Text>
          2000-12-25
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Blood Group:  </Text>
          A-
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Height:  </Text>
          189
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Weight:  </Text>
          75.4
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Eye Color:  </Text>
          Green
        </Text>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "ZAMARA APP",
    headerTitleAlign: "center",
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

export default Dashboard;
