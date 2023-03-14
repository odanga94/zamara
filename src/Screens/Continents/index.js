import { useState, useEffect, useCallback } from "react";
import { View, Text, Platform, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../Components/UI/HeaderButton";
import constants from "../../utils/constants";
import Spinner from "../../Components/UI/Spinner";
import ErrorMessage from "../../Components/UI/ErrorMessage";
import styles from "./styles";

const Continents = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [continents, setContinents] = useState([]);

  const fetchContinents = async () => {
    try {
      const response = await fetch(
        `http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfContinentsByName/JSON/`,
        {
          headers: {
            "Content-Type": "application/json",
            Host: "webservices.oorsprong.org",
          },
        }
      );

      const resData = await response.json();
      console.log("continentsData", resData);

      setContinents(resData);
    } catch (err) {
      console.log("err", err.message);
      throw err;
    }
  };

  const loadContinents = useCallback(async () => {
    // console.log("LOAD PRODUCTS!");
    setErrorMessage("");
    setIsLoading(true);
    try {
      await fetchContinents();
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadContinents();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && errorMessage) {
    return <ErrorMessage message={errorMessage} pressed={loadStaff} />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.tableRow}>
        <View style={styles.codeContainer}>
          <Text style={{ ...styles.userInfo, ...styles.userFullName }}>
            CODE
          </Text>
        </View>
        <View style={styles.codeContainer}>
          <Text style={{ ...styles.userInfo, ...styles.userFullName }}>
            NAME
          </Text>
        </View>
      </View>
      {continents.map((continent) => (
        <View key={continent.sCode} style={styles.tableRow}>
          <View style={styles.codeContainer}>
            <Text style={styles.userInfo}>{continent.sCode}</Text>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.userInfo}>{continent.sName}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export const continentsScreenOptions = (navData) => {
  return {
    headerTitle: "CONTINENTS",
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

export default Continents;
