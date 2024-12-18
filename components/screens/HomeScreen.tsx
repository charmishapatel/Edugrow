
import React from "react";
import {
    Text,
    View,
    Button,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";

import { CommonStyle } from "../utility/commonStyles";

function HomeScreen({navigation} : {navigation : any}) : React.JSX.Element {
    return (
        <SafeAreaView>
{/* 
            <TouchableOpacity 
             style = {[CommonStyle.header, ]}>
                <Text 
                 style = {[CommonStyle.headerTxt]}>EDUGROW
                </Text>
            </TouchableOpacity> */}


            <TouchableOpacity
             onPress={() => navigation.navigate("ToDoList")}>
                <Text style = {style.btn1}>To-do-list✔️</Text>
            </TouchableOpacity>


            <TouchableOpacity
             onPress={() => navigation.navigate("Grades")}>
                <Text style = {style.btn2}>Grades📊🅰️</Text>
            </TouchableOpacity>


            <TouchableOpacity 
             onPress={() => navigation.navigate("Assignment")}>
                <Text style = {style.btn3}>Assignment📚📋</Text>
            </TouchableOpacity>


            <TouchableOpacity 
             onPress={() => Alert.alert("This is not set up yet")}>
                <Text style = {style.btn4}>Schedule⏱️📝</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({

    btn1 : {
        height : 60,
        width  : '90%',
        backgroundColor : '#8EACCD',
        textAlign : 'center',
        padding: 10,
        marginTop : 35,
        marginLeft: 15,
        fontSize: 25,
    },

    btn2 : {
        height : 60,
        width  : '90%',
        backgroundColor : '#DEE5D4',
        textAlign : 'center',
        padding: 10,
        marginTop : 35,
        marginLeft: 15,
        fontSize: 25,
    },

    btn3 : {
        height : 60,
        width  : '90%',
        backgroundColor : '#FEF9D9',
        textAlign : 'center',
        padding: 10,
        marginTop : 35,
        marginLeft: 15,
        fontSize: 25,
    },

    btn4 : {
        height : 60,
        width  : '90%',
        backgroundColor : '#D2E0FB',
        textAlign : 'center',
        padding: 10,
        marginTop : 35,
        marginLeft: 15,
        fontSize: 25,
    },

    
    

});
export default HomeScreen;
