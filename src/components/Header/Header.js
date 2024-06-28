import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const DRAWER_ICON_WIDTH = 76;
const MARGIN_BW_ICON_AND_TITLE = 12;

const SCREEN_WIDTH = width < height ? width : height;

const Header = (props) => {
   const { navigation, title, children } = props;
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title || children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: SCREEN_WIDTH- DRAWER_ICON_WIDTH*2 - MARGIN_BW_ICON_AND_TITLE,
    marginLeft:0,
    paddingLeft:0,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
});

export default Header;