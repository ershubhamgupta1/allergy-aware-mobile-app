import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' 

import DrawerContainer from './screens/DrawerContainer/DrawerContainer';
import Header from './components/Header/Header';

import HomeScreen from './screens/Home/HomeScreen';
import CameraScreen from './screens/Camera/CameraScreen';
import UserProfileScreen from './screens/UserProfile/UserProfileScreen';

import LoginScreen from './screens/Login/LoginScreen';
import RegistrationScreen from './screens/Signup/SignupScreen';

import { db } from './firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import ProductTabs from './screens/ProductDetails/ProductDetailScreen';

const Stack = createStackNavigator();

function MainNavigator() {
    const [user, setUser] = useState(null)
    useEffect(()=>{
      const auth = getAuth();
      onAuthStateChanged(auth, async(userCredential) => {
        if (userCredential) {
          const uid = userCredential.uid;
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          const userInfo = docSnap.data();
          userInfo && setUser(userInfo);
          // usersRef
          //   .doc(user.uid)
          //   .get()
          //   .then((document) => {
          //     const userData = document.data()
          //     setLoading(false)
          //     setUser(userData)
          //   })
          //   .catch((error) => {
          //     setLoading(false)
          //   });
        } else {
          setUser(null)
        }
      });
    }, []);
  
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
    { user ? (
      <>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerTitle: (props) => <Header {...props} title='Home' /> }} />
        <Stack.Screen name='Camera' component={CameraScreen} options={{ headerTitle: (props) => <Header {...props} title='Camera' /> }}/>
        <Stack.Screen name='ProductDetails' component={ProductTabs} options={{ headerTitle: (props) => <Header {...props} title='Product' /> }} />
        <Stack.Screen name='Profile' component={UserProfileScreen} options={{ headerTitle: (props) => <Header {...props} title='Profile' /> }} />
      </>
    ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
      )}



    </Stack.Navigator>
  )
} 



 const Drawer = createDrawerNavigator();

 const MainNavigator1 = ()=>{
  return (<Text>Main Navigator</Text>)
 }

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{headerShown: false}}
      drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} 


 export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>

  )
} 
 

console.disableYellowBox = true;