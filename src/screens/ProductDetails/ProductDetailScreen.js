import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const ProductList = (props) => {
  const [expandedId, setExpandedId] = useState(null);
  const { navigation, route } = props;

  const products = route.params?.products || [];

  const toggleExpand = (productId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === productId ? null : productId);
  };

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={[styles.productItem, expandedId === product.id && styles.expanded]}
          onPress={() => toggleExpand(product.id)}>
          <Text style={styles.productName}>{product.name}</Text>
          {expandedId === product.id && (
            <View style={styles.productDetails}>
              <Text style={styles.detailText}>Description: {product.description}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
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
