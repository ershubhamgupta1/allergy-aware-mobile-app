import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

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
  
export default styles;
