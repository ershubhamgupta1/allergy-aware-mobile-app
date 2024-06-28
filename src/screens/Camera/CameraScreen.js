import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/config';

import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';
const storage = getStorage(app);

const products = [
    { id: 1, name: 'Product 1', description: 'Description of Product 1' },
    { id: 2, name: 'Product 2', description: 'Description of Product 2' },
    { id: 3, name: 'Product 3', description: 'Description of Product 3' },
    { id: 4, name: 'Product 4', description: 'Description of Product 4' },
    { id: 5, name: 'Product 5', description: 'Description of Product 5' },
  ];
  
export default function CameraComp(props) {
  const { navigation, route } = props;
  const [facing, setFacing] = useState('back');
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  const uriToBlob = async (uri) => {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    }).then((base64String) => {
      return `data:image/jpeg;base64,${base64String}`;
    });
  };

async function takePicture() {
    if (cameraRef.current) {
        let photo = await cameraRef.current.takePictureAsync({
            quality: 0.1, // Adjust this value (0.0 - 1.0) for picture quality
            skipProcessing: true, // Set to true to skip processing
        });
        setPreviewVisible(true);
        setCapturedImage(photo);
        console.log(photo);
        // Handle the captured photo (e.g., save it somewhere, display it)
      }
  }
  async function uploadImageAsync(uri) {
    // const response = await fetch(uri);
    // const blob = await response.blob();
    // const filename = uri.substring(uri.lastIndexOf('/') + 1);

    // // Upload image using Firebase SDK
    // const storageRef = firebase.storage().ref().child(`images/${filename}`);
    // await storageRef.put(blob);

    // // Get the download URL
    // const downloadURL = await storageRef.getDownloadURL();
    // // return uriToBlob(uri).then((blob)=>{
    // //     return uploadToFirebase(blob);
    // // }).then((snapshot)=>{
    // //     console.log("File uploaded");

    // // })
    try{
        console.log('storage-----------', uri);
        // const response = await fetch(uri);
        // console.log('response-----------', response);

        // if (!response.ok) {
        //   throw new Error('Failed to fetch image');
        // }
        // const blob = await uriToBlob('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtX8xtTEpzqiVoVCbaC24fZJE1Y5tf7ES7rA&s');
        const blobString = await uriToBlob(uri);
        const base64Response = await fetch(blobString);
        console.log('after ftech--------');
        const blob = await base64Response.blob();

        // const blob = await response.blob();
        console.log('after blob-----------', blob, blob.size);

        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        console.log('after filename-----------', filename);
    
        // Upload image using Firebase Storage SDKgs://react-native-hotel-f182c.appspot.com/allergic-app-ingredients
        const storageRef = ref(storage, `allergic-app-ingredients/${filename}`);
        console.log('after ref-----------');

        await uploadBytes(storageRef, blob);
        console.log('after uploaded-----------');

        const downloadURL = await getDownloadURL(storageRef);
        console.log('Image uploaded to Firebase:', downloadURL);
        // TODO call api to send the "downloadURL" and get the allergic details for each product used in image.
        // const products = fetch('example.com/get-allergic-details')
        navigation.navigate("ProductDetails", { products });

    }
    catch(err){
        console.log('err-----------', err);
    }
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {previewVisible ? (
        <ImageBackground
          source={{ uri: capturedImage && capturedImage.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => setPreviewVisible(false)}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                    uploadImageAsync(capturedImage.uri);
                }}
                style={{
                  width: 130,
                  height: 40,

                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                >
                  Upload & Check details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <CameraView
          style={{ flex: 1 }}
          type={'back'}
          ref={(r) => {
            cameraRef.current = r;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            {/* <TouchableOpacity
              style={{
                position: "absolute",
                top: "5%",
                left: "5%",
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity> */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: "#fff",
                  }}
                />
              </View>
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
}
//   return (
//     <View style={styles.container}>
//       <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//             <Text style={styles.text}>Flip Camera</Text>

//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={takePicture}>
//             <Text style={styles.text}>Take Picture</Text>

//           </TouchableOpacity>
//         </View>
//       </CameraView>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});