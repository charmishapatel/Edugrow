import React, { useState } from "react";
import 
{ Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  SafeAreaView, 
  Alert,
  Dimensions,
} from "react-native";


import BouncyCheckbox from "react-native-bouncy-checkbox";
import firestore from "@react-native-firebase/firestore";


function Assignment({ navigation }: { navigation: any }) : React.JSX.Element {

  // local state
  const [userInputAssignTitle, setUserInputAssignTitle] = useState<string>("");
  const [userInputDueDate, setUserInputDueDate] = useState<string>("");
  const [getNotified, setGetNotified] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (userInputAssignTitle && userInputDueDate) {
      try {
        await firestore().collection("assignment").add({
          title: userInputAssignTitle,
          dueDate: userInputDueDate,
          getNotified: getNotified,
        });
        Alert.alert("Success", "Assignment added successfully");
        navigation.navigate("Calendar", {
          title: userInputAssignTitle,
          dueDate: userInputDueDate,
        });
        setUserInputAssignTitle("");
        setUserInputDueDate("");
        setGetNotified(false);
      } catch (error) {
        console.error("Error adding assignment:", error);
        Alert.alert("Error", "Failed to add assignment");
      }
    } else {
      Alert.alert("Please fill all the fields");
    }
  };

  return (
    <SafeAreaView style={style.container}>

      <View>
        {/* Input for title */}
        <Text style={style.headingTxt}>Enter Assignment:</Text>
        <TextInput
          placeholder="Enter Title"
          style={style.inputField}
          value={userInputAssignTitle}
          onChangeText={setUserInputAssignTitle}
        />
      </View>

      <View>
        {/* Input for due date */}
        <Text style={style.headingTxt}>Enter Due Date:</Text>
        <TextInput
          placeholder="Enter Due Date (yyyy-mm-dd)"
          style={style.inputField}
          value={userInputDueDate}
          onChangeText={setUserInputDueDate}
        />
      </View>

      {/* Input for notification */}
      <View style={style.getNotifiedView}>
        <BouncyCheckbox
          style={style.checkbox}
          size={30}
          fillColor="black"
          unFillColor="#FFFFFF"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          isChecked={getNotified}
          onPress={(isChecked: boolean) => setGetNotified(isChecked)}
        />
        <Text style={style.notifiedTxt}>Get Notified</Text>
      </View>

      <View>
        {/* Submit btn */}
        <TouchableOpacity style={style.btn} onPress={handleSubmit}>
          <Text style={style.btnTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { height, width } = Dimensions.get("screen");
const style = StyleSheet.create({
  container: {
    justifyContent: "center", 
    alignItems: "center", 
    paddingTop: 20,
  },
  headingTxt: { 
    fontSize: 20, 
    marginLeft: 10, 
    marginTop: 30 
  },
  inputField: { 
    backgroundColor: "#FEFAE0", 
    marginTop: 10, 
    marginLeft: 10, 
    height: 50, 
    width: 300, 
    borderRadius: 8, 
    paddingLeft: 10 
  },
  btn: { 
    backgroundColor: "#E8EFCF",
    height: 50,
    width: width - 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    
  },
  btnTxt: { 
    fontSize: 20 
  },
  getNotifiedView: { 
    justifyContent: "flex-start", 
    width: "100%", 
    marginTop: 30,
    flexDirection: "row",
    marginLeft: 120,  
  },
  checkbox: { 
    marginRight: 10, 
  },
  notifiedTxt: { 
    fontSize: 20, 
  },
});

export default Assignment;
