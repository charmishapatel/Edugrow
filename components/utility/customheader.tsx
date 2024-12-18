import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type CustomHeaderProps = {
  title: string;
}

function CustomHeader(props: CustomHeaderProps): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();

  
  const isHomeScreen = route.name === 'HomeScreen' || route.name === 'MainTabs';
  

  return (
    <SafeAreaView style={styles.header}>
      
      {!isHomeScreen && (
        <TouchableOpacity 
          style={styles.headerBackIcon} 
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={require("../../assets/images/backIcon.png")} 
            style={{ width: 20, height: 20 }}/>
        </TouchableOpacity>
      )}

      <Text style={styles.headerTxt}>{props.title}</Text>

      {/* <TouchableOpacity style={[CommonStyle.header]}>
                      <Text style={[CommonStyle.headerTxt]}>To Do</Text>
                  </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E7CCCC',
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  headerBackIcon: {
    position: 'absolute',
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5, 
  },

  headerTxt: {
    fontSize: 30,
    color: '#000',
    fontWeight: '400',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});

export default CustomHeader;
