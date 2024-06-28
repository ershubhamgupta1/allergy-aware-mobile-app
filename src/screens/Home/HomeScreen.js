import React, { useLayoutEffect, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
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
        <Text style={{marginHorizontal: 20, marginVertical: 20, fontSize: 16, fontWeight: 'bold'}}>
            Take Picture of product to get the allergic detail.            
        </Text>
        <TouchableHighlight
            style={styles.submit}
            onPress={() => navigation.navigate("Camera", {})}
            underlayColor='#fff'>
                <Text style={[16,styles.submitText]}>Take Picture</Text>
        </TouchableHighlight>
    </View>
  );
}



  const styles = StyleSheet.create({
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
      },
      submitText: {
        color: '#fff',
        textAlign: 'center',
      }
    });