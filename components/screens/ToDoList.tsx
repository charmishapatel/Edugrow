import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import firestore from '@react-native-firebase/firestore';

import BouncyCheckbox from "react-native-bouncy-checkbox";

function ToDoList({ route, navigation }: { route: any; navigation: any }): React.JSX.Element {
    const [toDoList, setToDoList] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('todolist')
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    list: doc.data().list,
                    checked: doc.data().checked || false,  
                }));
                setToDoList(data);
            });
        return () => unsubscribe();
    }, []);

    
    const handleDeleteItem = async (id: string) => {
        try {
            await firestore().collection('todolist').doc(id).delete();
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleToggleChecked = async (id: string, isChecked: boolean) => {
        try {
            await firestore().collection('todolist').doc(id).update({
                checked: isChecked,  
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <SafeAreaView>
            <View style={style.listView}>
                {toDoList.map((item) => (
                    <View key={item.id} style={style.listItemRow}>

                        {/* Checkbox */}
                        <BouncyCheckbox
                            size={25}
                            fillColor="black"
                            unFillColor="#FFFFFF"
                            iconStyle={{ borderColor: "blue" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            isChecked={item.checked}  
                            onPress={(isChecked: boolean) => handleToggleChecked(item.id, isChecked)}  
                        />
                        {/* list item */}
                        <Text style={style.listItemText}>{item.list}</Text>

                        {/* Delete btn */}
                        <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                            <Text style={style.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/*  Add btn */}
                <TouchableOpacity
                    style={style.btn}
                    onPress={() => navigation.navigate("ToDoListAdd")}
                >
                    <Text style = {style.btnTxt}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const { height, width } = Dimensions.get("screen");

const style = StyleSheet.create({
    listView: {
        alignItems: "center",
        margin: 10,
        paddingHorizontal: 20,
    },
    listItemRow: {
        flexDirection: "row",
        marginBottom: 10,
        width: width - 30,
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    listItemText: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        color: "#000",
        flexWrap: "wrap",
    },
    deleteText: {
        marginLeft: 10,
        fontSize: 14,
        color: "red",
        marginTop: 10,
    },
    btn: {
        backgroundColor: "#E8EFCF",
        height: 50,
        width: width - 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    btnTxt : {
        fontSize: 20,
    }
});

export default ToDoList;
