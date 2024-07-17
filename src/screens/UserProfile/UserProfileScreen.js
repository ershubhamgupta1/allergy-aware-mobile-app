import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { db } from '../../firebase/config.js';
import { getAuth } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import styles from './styles.js';
import MultiSelectDropdown from '../../components/MultiDropDown/MultiDropDown'

import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Tags from '../../components/Tags/Tags.js';
import FileUploadComponent from '../../FileUpload/FileUpload.js';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase/config';
import * as FileSystem from 'expo-file-system';
const storage = getStorage(app);
import MenuImage from "../../components/MenuImage/MenuImage";

const allergicIngredients = [
    "Peanuts", "Tree nuts", "Milk", "Eggs", "Soybeans", "Wheat", "Fish", "Shellfish",
    "Sesame seeds", "Mustard", "Celery", "Sulfites", "Lupin", "Molluscan shellfish",
    "Corn", "Kiwi", "Avocado", "Bell peppers", "Pineapple", "Bananas", "Papaya",
    "Mango", "Coconut", "Sorghum", "Pork", "Chicken", "Cherries", "Peaches", "Plums",
    "Sunflower seeds", "Honey", "Garlic", "Onions", "Chocolate", "Artificial food colorings",
    "Artificial food preservatives", "MSG", "Quinoa", "Rye", "Barley", "Oats", "Chia seeds",
    "Buckwheat", "Peas", "Tomatoes", "Coffee", "Tea", "Spinach", "Kale", "Broccoli",
    "Brussels sprouts", "Turnips", "Asparagus", "Cabbage", "Carrots", "Cauliflower",
    "Cucumber", "Eggplant", "Green beans", "Lettuce", "Mushrooms", "Radishes", "Zucchini",
    "Beef", "Lamb", "Turkey", "Venison", "Clams", "Crab", "Lobster", "Octopus", "Scallops",
    "Squid", "Trout", "Tuna", "Salmon", "Anchovies", "Sardines", "Catfish", "Mackerel",
    "Pistachios", "Almonds", "Walnuts", "Hazelnuts", "Cashews", "Macadamia nuts",
    "Brazil nuts", "Pecans", "Pine nuts", "Ginkgo nuts", "Chestnuts", "Butternuts",
    "Kola nuts", "Hickory nuts", "Acorns", "Cocoa beans", "Quassia bark"
  ];
  const commonDiseases = [
    "Acne",
    "Allergies",
    "Alzheimer's disease",
    "Anemia",
    "Anxiety",
    "Arthritis",
    "Asthma",
    "Atherosclerosis",
    "Back pain",
    "Bipolar disorder",
    "Bladder infection",
    "Bronchitis",
    "Cancer",
    "Celiac disease",
    "Chronic obstructive pulmonary disease (COPD)",
    "Chronic kidney disease",
    "Chronic pain",
    "Cirrhosis",
    "Colds",
    "Colitis",
    "Conjunctivitis",
    "Coronary artery disease",
    "Crohn's disease",
    "Cystic fibrosis",
    "Dementia",
    "Depression",
    "Diabetes",
    "Diarrhea",
    "Diverticulitis",
    "Ear infection",
    "Eczema",
    "Emphysema",
    "Endometriosis",
    "Epilepsy",
    "Fibromyalgia",
    "Flu",
    "Gallstones",
    "Gastritis",
    "Gastroenteritis",
    "Gastroesophageal reflux disease (GERD)",
    "Glaucoma",
    "Gout",
    "Hay fever",
    "Heart disease",
    "Hepatitis",
    "Hernia",
    "Herpes",
    "High blood pressure",
    "High cholesterol",
    "HIV/AIDS",
    "Hyperthyroidism",
    "Hypothyroidism",
    "Irritable bowel syndrome (IBS)",
    "Kidney stones",
    "Leukemia",
    "Liver disease",
    "Lupus",
    "Lyme disease",
    "Malaria",
    "Meningitis",
    "Menopause",
    "Migraine",
    "Mononucleosis",
    "Multiple sclerosis",
    "Obesity",
    "Obsessive-compulsive disorder (OCD)",
    "Osteoarthritis",
    "Osteoporosis",
    "Pancreatitis",
    "Parkinson's disease",
    "Peptic ulcer",
    "Pneumonia",
    "Polycystic ovary syndrome (PCOS)",
    "Prostate disease",
    "Psoriasis",
    "Rheumatoid arthritis",
    "Rosacea",
    "Schizophrenia",
    "Sexually transmitted infections (STIs)",
    "Shingles",
    "Sinusitis",
    "Skin cancer",
    "Sleep apnea",
    "Stroke",
    "Thyroid disease",
    "Tonsillitis",
    "Tuberculosis",
    "Ulcerative colitis",
    "Urinary tract infection (UTI)",
    "Varicose veins",
    "Vertigo",
    "Viral infections",
    "Vitamin deficiency",
    "Yeast infection",
    "Zika virus",
    "Zollinger-Ellison syndrome"
];
  const getAllergicItems = ()=>{
    const items = allergicIngredients.map((name, i)=>{
        return {id: i, name};
    });
    return items;
  }

  const getAvailableCommonDiseaseItems = ()=>{
    const items = commonDiseases.map((name, i)=>{
        return {id: i, name};
    });
    return items;
  }

  const getSelectedCommonAllergicContent = (items)=>{
    const ids = items.map((selectedName, i)=> {
        if(allergicIngredients.includes(selectedName)) return allergicIngredients.indexOf(selectedName);
    })
    return ids;
}

const getSelectedCommonDiseases = (items)=>{
    const ids = items.map((selectedName, i)=> {
        if(commonDiseases.includes(selectedName)) return commonDiseases.indexOf(selectedName);
    })
    return ids;
}

export default function UserProfileScreen({navigation}) {
    const [fullName, setFullName] = useState('');
    const [user, setUser] = useState({});

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
    
    useEffect(()=>{
        (async () => {
            const auth = getAuth();
            const uid = auth?.currentUser?.uid;
            if(uid){
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);
                const user = docSnap.data();
                let initialSelectedAllergicItems = user && user.allergicInfo && getSelectedCommonAllergicContent(user.allergicInfo)
                let initialSelectedDiseasesItems = user && user.diseases && getSelectedCommonDiseases(user.diseases)
                
                initialSelectedDiseasesItems = initialSelectedDiseasesItems.filter(item => !!item);
                initialSelectedAllergicItems = initialSelectedAllergicItems.filter(item => !!item);
                setUser(user);
                setFullName(user.fullName);

                setSelectedCommonDiseaseItems(initialSelectedDiseasesItems || []);
                setSelectedCommonAllergicItems(initialSelectedAllergicItems || []);
            }
              })();
    }, []);

    const [selectedCommonAllergicItems, setSelectedCommonAllergicItems] = useState([]);
    const [selectedCommonDiseaseItems, setSelectedCommonDiseaseItems] = useState([]);

    const [image, setImage] = useState(null);


    const onSave = async() => {
        const docRef = doc(db, "users", user.id.toString());
        const payload = {fullName};
        payload.allergicInfo = selectedCommonAllergicItems.map(item=> allergicIngredients[item]);
        payload.diseases = selectedCommonDiseaseItems.map(item=> commonDiseases[item]);
        const res = await updateDoc(docRef, payload);
        alert('Profile saved successfully')
    }
    const uriToBlob = async (uri) => {
        return await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        }).then((base64String) => {
          return `data:image/jpeg;base64,${base64String}`;
        });
      };
      async function uploadImageAsync(uri) {
        try{
            const blobString = await uriToBlob(uri);
            const base64Response = await fetch(blobString);
            const blob = await base64Response.blob();
    
            const filename = uri.substring(uri.lastIndexOf('/') + 1);
        
            const storageRef = ref(storage, `allergic-app-ingredients/${filename}`);
    
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            console.log('Image uploaded to Firebase:', downloadURL);
    
        }
        catch(err){
            console.log('err-----------', err);
        }
      }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}
                style={{ flex: 1, width: '100%' }}>
                <View style={{alignItems : 'center'}}>
                    {user.profilePic && <Image source={{ uri: user.profilePic }} style={styles.avatar} />}
                    <Button title="Choose Profile" onPress={pickImage} />
                </View>
                <View>
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => {
                        console.log('text========', text);
                        setFullName(text)
                    }}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    editable={false}
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    value={user.email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <MultiSelectDropdown showSelectedItems={true} dropDownStyle={{height: 100}} defaultButtonText=' Select disease if any' displayKey='name' data={getAvailableCommonDiseaseItems()} selectedItems={selectedCommonDiseaseItems} onSelect={(selectedIds)=>{
                    setSelectedCommonDiseaseItems(selectedIds);
                }} />
                <MultiSelectDropdown showSelectedItems={true} dropDownStyle={{height: 100}} defaultButtonText=' Select allergic ingredient if any' displayKey='name' data={getAllergicItems()} selectedItems={selectedCommonAllergicItems} onSelect={(selectedIds)=>{
                    setSelectedCommonAllergicItems(selectedIds);
                }} />
                <Tags selectedItems = {user.customAllergicInfo} />
                </View>
                <View style={{flex:1}}>



                    <FileUploadComponent handleFileUpload={async(uri)=>{
                            const url = await uploadImageAsync(uri);
                            let formdata = new FormData();

                            formdata.append("file", {uri: uri, name: 'image.jpg', type: 'image/jpeg'})
                            fetch('https://allergyaware.onrender.com/api/analyze-prescription', {
                                method: 'POST',
                                headers: {
                                },
                                'Content-Type': 'multipart/form-data',
                                body: formdata
                            })
                            .then((response, aa) => response.text())
                            .then((result) => {
                            if(result) result = JSON.parse(result);

                            if(result && (result.potentialHealthConditions || result.potentialAllergies)){
                            let potentialHealthConditions  = result.potentialAllergies && getSelectedCommonDiseases(result.potentialAllergies)
                            let potentialAllergies = result.potentialHealthConditions && getSelectedCommonDiseases(result.potentialHealthConditions)
                            potentialHealthConditions = potentialHealthConditions.filter(item => !!item);

                            potentialAllergies = potentialAllergies.filter(item => !!item);
                            let finalDieases = [];
                            if(potentialHealthConditions){
                                finalDieases = [...finalDieases, ...potentialHealthConditions];
                            }
                            if(potentialAllergies) {
                            finalDieases = [...finalDieases, ...potentialAllergies];
                            }
                            setSelectedCommonDiseaseItems(finalDieases);
                            }

                            else{
                            alert('There is some error in image processing, can you Try again!')
                            }
                            })
                            .catch(err => {
                            setLoading(false);
                            console.log("err========", err);
                            })
                        }}
                    />
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onSave()}>
                        <Text style={styles.buttonTitle}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}