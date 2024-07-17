import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Home"
          icon={<FontAwesome name="home" size={20}/>}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Camera"
          icon={<FontAwesome name="camera" size={20}/>}
          onPress={() => {
            navigation.navigate("Camera");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="User Profile"
          icon={<FontAwesome name="user" size={20}/>}
          onPress={() => {
            navigation.navigate("Profile");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Logout"
          icon={<FontAwesome name="sign-out" size={20}/>}
          onPress={() => {
            const auth = getAuth();
            signOut(auth);
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
