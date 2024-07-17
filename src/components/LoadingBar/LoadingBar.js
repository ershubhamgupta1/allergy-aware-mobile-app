import React from "react";
import {useHeaderHeight} from '@react-navigation/elements';
import { Text, View, ActivityIndicator, Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = width > height ? width: height;

export default function LoadingBar(props){
    const headerHeight = useHeaderHeight();
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT - headerHeight}} >
            <ActivityIndicator />
        </View>
    )
}