import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


// Screens
import CalendarScreen from "../screens/Calender";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";


import CustomHeader from "../utility/customheader";
import TabIcon from "../utility/TabIcon";


const TabNav = createBottomTabNavigator();


function TabNavigation(): React.JSX.Element {
    return (
        <TabNav.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
              return (
                <TabIcon
                  route={route.name}
                  focused={focused}
                  color={color}
                  size={size}
                />
              );
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'orange',
            tabBarInactiveTintColor: 'grey',
            headerShown: false,
          })}
        >
            <TabNav.Screen
             name="HomeScreen" 
             component={HomeScreen} 
             options={{
                header: () => <CustomHeader title="EDUGROW" />,
            }}
            />

            <TabNav.Screen
             name="Calendar" 
             component={CalendarScreen}
             options={{
                header: () => <CustomHeader title="Calendar" />,
            }} 
            />
            
            <TabNav.Screen 
             name="Profile" 
             component={Profile}
             options={{
                header: () => <CustomHeader title="Profile" />,
             }} 
            />
        </TabNav.Navigator>
    );
}

export default TabNavigation;
