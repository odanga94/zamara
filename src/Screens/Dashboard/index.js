import { useEffect, useCallback, useState } from "react";
import { View, Text, Platform, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../Components/UI/HeaderButton";
import constants from "../../utils/constants";
import styles from "./styles";
import { fetchUserData } from "../../store/actions/user";
import Spinner from "../../Components/UI/Spinner";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  // console.log("id", userId);
  const {
    firstName,
    lastName,
    age,
    gender,
    email,
    phone,
    birthDate,
    bloodGroup,
    height,
    weight,
    eyeColor,
  } = useSelector(state => state.user);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadUserData = useCallback(async () => {
    // console.log("LOAD PRODUCTS!");
    setErrorMessage("");
    // setIsRefreshing(true);
    try {
      await dispatch(fetchUserData(userId));
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
    // setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadUserData().then(() => setIsLoading(false));
  }, [loadUserData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Welcome
          <Text style={styles.userFullName}> {`${firstName} ${lastName}`}</Text>
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>Your profile details are:</Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Age:  </Text>
          {age}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Gender:  </Text>
          {gender}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Email:  </Text>
          {email}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Phone:  </Text>
          {phone}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Birth Date:  </Text>
          {birthDate}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Blood Group:  </Text>
          {bloodGroup}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Height:  </Text>
          {height}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Weight:  </Text>
          {weight}
        </Text>
        <Text style={styles.userInfo}>
          <Text style={styles.userFullName}>Eye Color:  </Text>
          {eyeColor}
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
