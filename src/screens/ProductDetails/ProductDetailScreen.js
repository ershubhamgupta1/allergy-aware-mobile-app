import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getHealthInfo = (healthInfo)=>{
    const {healthRisksFound, allergensFound} = healthInfo;
    // let healthInfoArray = [{id: 1, name: 'Recommendation', description: recommendation}];
    let healthRiskInfoArray = [];
    let allergenInfoArray = [];


    for(let disease in healthRisksFound){
        healthRiskInfoArray.push({id: healthRiskInfoArray.length+1, name: disease, description: healthRisksFound[disease].join(', ')})
    }
    for(let ingredient in allergensFound){
        allergenInfoArray.push({id: allergenInfoArray.length+1, name: ingredient, description: allergensFound[ingredient].join(',' )})
    }
    return {healthRiskInfoArray, allergenInfoArray};

   
}
const ProductList = (props) => {
  const [healthRiskExpandedId, setHealthRiskExpandedId] = useState(null);
  const [allergenInfoExpandedId, setAllergenInfoExpandedId] = useState(null);

  const { navigation, route } = props;

  const productInfo = route.params?.productInfo || {};
  const {recommendation, healthRisksFound, allergensFound} = JSON.parse(productInfo)

  const {healthRiskInfoArray, allergenInfoArray} = getHealthInfo(JSON.parse(productInfo));

  const toggleHealthRiskExpand = (productId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAllergenInfoExpandedId(null);
    setHealthRiskExpandedId(healthRiskExpandedId === productId ? null : productId);

  };
  const toggleAllergenInfoExpand = (productId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHealthRiskExpandedId(null);
    setAllergenInfoExpandedId(allergenInfoExpandedId === productId ? null : productId);
  };

  console.log('healthRiskInfoArray--------', healthRiskInfoArray);
  console.log('allergenInfoArray--------', allergenInfoArray);

  return (
    <ScrollView style={styles.container}>
        <View  style={{marginVertical: 40}}>
            <Text style={{fontSize:18, fontWeight: 'bold', marginBottom: 10}}>Recommendation </Text>
            <View style={styles.productDetails}>
                <Text style={styles.detailText}>{recommendation}</Text>
            </View>
        </View>
        <View style={{marginVertical: 40}}>
            <Text style={{fontSize:18, fontWeight: 'bold', marginBottom: 10, color: 'red'}}>Health Risk found </Text>
            <Text style={{fontSize:14, marginBottom: 10}}>Please avoid consuming this product as ingredient used in this product is not good for the following disease. Click on below tiles to know more. </Text>
            {healthRiskInfoArray.map((riskInfo) => {
                return (
                    <TouchableOpacity
                    key={riskInfo.id}
                    style={[styles.productItem, healthRiskExpandedId === riskInfo.id && styles.expanded]}
                    onPress={() => toggleHealthRiskExpand(riskInfo.id)}>
                    <Text style={styles.productName}>{riskInfo.name}</Text>
                    {healthRiskExpandedId === riskInfo.id && (
                        <View style={styles.productDetails}>
                        <Text style={styles.detailText}><Text style={{fontWeight: 'bold'}}>Ingredients we should avoid in {riskInfo.name}</Text> : {riskInfo.description}</Text>
                        </View>
                    )}
                    </TouchableOpacity>
                )
            })}
        </View>
        <View  style={{marginVertical: 40}}>
            <Text style={{fontSize:18, fontWeight: 'bold', marginBottom: 10, color: 'red'}}>Allergen ingredients of this product</Text>
            {allergenInfoArray.map((allergenInfo) => {
                return (
                    <TouchableOpacity
                    key={allergenInfo.id}
                    style={[styles.productItem, allergenInfoExpandedId === allergenInfo.id && styles.expanded]}
                    onPress={() => toggleAllergenInfoExpand(allergenInfo.id)}>
                    <Text style={styles.productName}>{allergenInfo.name}</Text>
                    {allergenInfoExpandedId === allergenInfo.id && (
                        <View style={styles.productDetails}>
                        <Text style={styles.detailText}>Description: {allergenInfo.description}</Text>
                        </View>
                    )}
                    </TouchableOpacity>
                )
            })}
        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  expanded: {
    marginBottom: 20, // Increase margin when expanded
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  detailText: {
    fontSize: 16,
  },
});

export default ProductList;
