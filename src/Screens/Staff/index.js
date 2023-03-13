import { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../Components/UI/HeaderButton";
import constants from "../../utils/constants";
import Card from "../../Components/UI/Card";
import Button from "../../Components/UI/Button";
import { setStaffData, removeStaff } from "../../store/actions/staff";

const Staff = (props) => {
  const dispatch = useDispatch();
  const staffItems = useSelector((state) => state.staff.staff);
  // console.log("staff", staffItems);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setStaffData());
  }, [dispatch]);

  const deleteStaff = (staffId) => {
    const staffBeingDeleted = staffItems.find(
      (staff) => staff.staffNumber === staffId
    );

    Alert.alert(
      "Are you sure?",
      `Do you really wanna delete ${staffBeingDeleted.staffName} ?`,
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              //await dispatch(deleteProduct(pid));
              dispatch(removeStaff(staffId));
            } catch (err) {
              console;
              setErrorMessage(err.message);
            }
          },
        },
      ]
    );
  };

  const editStaffHandler = (id) => {
    props.navigation.navigate("Edit Staff", {
      staffId: id,
    });
  };

  if (!isLoading && staffItems.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>
          No staff found. Maybe start adding some!
        </Text>
        <Button
          style={{...styles.button, width: constants.styleGuide.width / 1.2, borderRadius: 10 }}
          onPress={() => {
            props.navigation.navigate("Edit Staff");
          }}
        >
          <Text style={styles.sixthText}>Add Staff Member</Text>
        </Button>
      </View>
    );
  }

  return (
    <FlatList
      // contentContainerStyle={styles.staffContainer}
      data={staffItems}
      keyExtractor={(item, index) => {
        // console.log(item);
        // return index;
        return item.staffNumber;
      }}
      renderItem={(itemData) => (
        <Card style={styles.card}>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Ionicons
                name="person-circle-outline"
                size={constants.styleGuide.height / 7}
                color="#8b8680"
              />
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.info}>
                Staff Number:{" "}
                <Text style={styles.staffItems}>
                  {itemData.item.staffNumber}
                </Text>
              </Text>
              <Text style={styles.info}>
                Name:{" "}
                <Text style={styles.staffItems}>{itemData.item.staffName}</Text>
              </Text>
              <Text style={styles.info}>
                Email:{" "}
                <Text style={styles.staffItems}>
                  {itemData.item.staffEmail}
                </Text>
              </Text>
              <Text style={styles.info}>
                Department:{" "}
                <Text style={styles.staffItems}>
                  {itemData.item.department}
                </Text>
              </Text>
              <Text style={styles.info}>
                Salary:{" "}
                <Text style={styles.staffItems}>{itemData.item.salary}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={() => editStaffHandler(itemData.item.staffNumber)}
            >
              <Text style={styles.sixthText}>UPDATE</Text>
            </Button>
            <Button
              style={styles.button}
              onPress={() => deleteStaff(itemData.item.staffNumber)}
            >
              <Text style={styles.sixthText}>DELETE</Text>
            </Button>
          </View>
        </Card>
      )}
    />
  );
};

export const staffScreenOptions = (navData) => {
  return {
    headerTitle: "STAFF",
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Home"
          iconName={
            Platform.OS === "android"
              ? "md-person-add-outline"
              : "ios-person-add-outline"
          }
          onPress={() => {
            // console.log("nav", navData);
            navData.navigation.navigate("Edit Staff");
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Drawer"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          // color={Platform.OS === "android" ? "#fff" : constants.secondaryColor}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  staffContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  card: {
    width: "90%",
    paddingVertical: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // width: "100%",
    /*  flex: 1,
,
    justifyContent: "space-around", */
    // paddingHorizontal: 10
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    flex: 2,
  },
  info: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    marginVertical: 2,
  },
  staffItems: {
    fontFamily: "poppins-bold",
  },
  button: {
    height: 50,
    width: constants.styleGuide.width / 3,
    backgroundColor: constants.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 25,
    // alignSelf: "center",
  },
  sixthText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "poppins-bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "poppins-bold",
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: "center",
  },
});

export default Staff;
