import React from "react";
import { 
    View, Image, StyleSheet 
} from "react-native";


// images 


type TabIconParamsType = {
  route: string;
  focused: boolean;
  size: number;
  color: string;
};

function TabIcon(params: TabIconParamsType): React.JSX.Element {
  const routeName = params.route;
  const iconSize = params.size;
  const tintColor = params.color;

  
  const getImageSource = (route: string) => {
    if (route === 'HomeScreen') {
      return require("../../assets/images/home.png");
    } else if (route === 'Calendar') {
      return require("../../assets/images/calendar.png");
    } else {
      
      return require("../../assets/images/user.png");
    }
  };

  return (
    <View style={[style.iconView, { borderWidth: 1, borderColor: tintColor }]}>
      <Image
        style={[style.iconImg, { height: iconSize, width: iconSize }]}
        source={getImageSource(routeName)}
        alt="Tab Icon"
      />
    </View>
  );
}

const style = StyleSheet.create({
  iconView: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    marginTop: 15,
  },
  iconImg: {
    resizeMode: 'contain',
  },
});

export default TabIcon;
