import {
    StyleSheet
} from "react-native";

export const CommonStyle = StyleSheet.create({

    header : {
        backgroundColor : '#E7CCCC',
        height : 60,
        width : '100%',
        justifyContent: 'center',
        //marginTop : 0,
    },


    screen : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    headerTxt : {
        fontSize: 30,
        color: '#000',
        fontWeight: '400',
        margin: 10,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
    },

    headerBackIcon : {
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
})