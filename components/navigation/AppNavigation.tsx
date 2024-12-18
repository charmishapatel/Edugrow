import React from "react";

import {
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import Assignment from "../screens/Assignment";
import ToDoList from "../screens/ToDoList";
import ToDoListAdd from "../screens/ToDoListAdd";
import AssignmentDetails from "../screens/AssignmentDetails";
import Grades from "../screens/Grades";
import FlashScreen from "../screens/FlashScreen";


import TabIcon from "../utility/TabIcon";
import CustomHeader from "../utility/customheader";

// Profile Authentication
import LoginScreen from "../profileAuth/Login";
import SignUpScreen from "../profileAuth/Signup";
import TabNavigation from "./TabNavigation";
import CalendarScreen from "../screens/Calender";


const Stack = createStackNavigator();

function AppNavigation(): React.JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: true,
                }}>
              
                <Stack.Screen 
                 name="Login" 
                 component={LoginScreen}
                 options={{
                  headerShown: false,
                  }} 
                />
                
                <Stack.Screen           
                 name="Signup" 
                 component={SignUpScreen}
                 options={{
                  headerShown: false,
                  }}
                />


                <Stack.Screen  
                 name="HomeScreen" component={HomeScreen}
                 options={{
                    header: () => {
                      return <CustomHeader title="EDUGROW" />;
                    },
                  }} 
                />


                <Stack.Screen  
                 name="FlashScreen" component={FlashScreen} 
                />

                <Stack.Screen 
                 name="AssignmentDetails" component={AssignmentDetails} 
                 options={{
                    header: () => {
                      return <CustomHeader title="Assignment" />;
                    },
                  }} 
                />

                <Stack.Screen 
                 name="Grades" 
                 component={Grades}
                 options={{
                    header: () => {
                      return <CustomHeader title="Grades"/>;
                    },
                  }}  
                />


                <Stack.Screen 
                 name="ToDoList" component={ToDoList}
                 options={({ navigation }) => ({
                    header: () => <CustomHeader title="To Do" />,
                  })}
                />

                <Stack.Screen 
                 name="ToDoListAdd" component={ToDoListAdd} 
                 options={{
                    header: () => {
                      return <CustomHeader title="To Do" />;
                    },
                  }} 
                />

                <Stack.Screen 
                 name="Assignment" component={Assignment} 
                 options={{
                    header: () => {
                      return <CustomHeader title="Assignment" />;
                    },
                  }} 
                />

                <Stack.Screen 
                 name="Calendar" component={CalendarScreen} 
                 options={{
                   header: () => {
                    return <CustomHeader title="Calendar" />;
                  },
                  }} 
                />

                <Stack.Screen 
                 name="MainTabs" component={TabNavigation}
                 options={{
                    header: () => {
                      return <CustomHeader title="EDUGROW" />;
                    },
                  }} 
                
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    headerRightContainer: {
      marginRight: 15, 
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    headerText: {
      color: 'black', 
      fontSize: 16, 
    },
  });
  

export default AppNavigation;
