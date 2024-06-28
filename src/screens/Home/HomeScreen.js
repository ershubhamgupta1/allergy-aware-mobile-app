import React, { useLayoutEffect, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, RefreshControl } from "react-native";
import MenuImage from "../../components/MenuImage/MenuImage";

export default function HomeScreen(props) {
    const { navigation } = props;
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => <View />,
        });
      }, []);
    
  return (
    <View>
        <Text>Home Screen!!!!</Text>
    </View>
  );
}
