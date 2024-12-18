import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Alert,
} from "react-native";
import firestore from '@react-native-firebase/firestore';


function ToDoListAdd({ navigation }: { navigation: any }): React.JSX.Element {
    const [userInputListItem, setUserInputListItem] = useState("");

    const handleAddItem = async () => {
        if (userInputListItem.trim()) {
            try {
                await firestore().collection('todolist').add({
                    list: userInputListItem,
                });
                setUserInputListItem(""); 
                navigation.navigate("ToDoList"); 
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            Alert.alert("Please enter a value!");
        }
    };

    return (
        <SafeAreaView>
            <View style={style.btnInputView}>

                {/* Input field for list */}
                <TextInput
                    style={[style.listInput, style.txt]}
                    placeholder="Enter list Item"
                    value={userInputListItem}
                    onChangeText={setUserInputListItem}
                />

                {/* Add btn */}
                <TouchableOpacity onPress={handleAddItem} style={[style.addBtn]}>
                    <Text style={[style.txt]}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const { height, width } = Dimensions.get("screen");

const style = StyleSheet.create({
    btnInputView: {
        alignItems: "center",
    },
    listInput: {
        height: 60,
        width: width - 30,
        backgroundColor: "#FEFAE0",
        alignContent: "center",
        marginTop: 20,
        textAlign: "center",
    },
    addBtn: {
        backgroundColor: "#E8EFCF",
        height: 50,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        width: width - 30,
    },
    txt: {
        fontSize: 20,
    },
    btn: {
        backgroundColor: "#E8EFCF",
        height: 50,
        width: width - 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
});

export default ToDoListAdd;
