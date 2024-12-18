
import React from "react";
import {
    Text,
    View,
    Button,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";

function FlashScreen({ route, navigation }: { route: any; navigation: any }) : React.JSX.Element {
    return (
        <TouchableOpacity 
         onPress={() => navigation.navigate("HomeScreen")}
         style = {style.body}>
            <Image source={require("../../assets/images/edugrow_logo.jpg")} style={style.img}></Image>

            <View style = {style.txtContainer}>
                <Text style = {style.txt}>Plan to</Text>
                <Text style = {style.txt}>Study ,</Text>
                <Text style = {style.txt}>Plan to</Text>
                <Text style = {style.txt}>grow</Text>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({

    body : {
        backgroundColor: '#D7E8BE',
        flex: 1,
    },

    img : {
        height : '50%',
        width : 'auto',
    },

    txtContainer : {
        alignContent: 'center',
        marginTop: 40,
    },

    txt : {
        fontSize: 40,
        textAlign: 'center',
    }
});
export default FlashScreen;
