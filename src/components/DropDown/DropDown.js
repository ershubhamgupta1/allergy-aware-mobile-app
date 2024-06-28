/* eslint-disable no-undef */
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DropDown(props)  {
    const {data, onSelect, defaultValue, defaultValueByIndex, defaultButtonText, renderDropDown, renderSelectLabel} = props;
    return (
      <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        onSelect({selectedItem, index});
      }}
      defaultButtonText={defaultButtonText}
      defaultValue={defaultValue}
      defaultValueByIndex={defaultValueByIndex}
      buttonTextAfterSelection={renderSelectLabel}
      rowTextForSelection={renderDropDown}
      buttonStyle={styles.dropdown2BtnStyle}
      buttonTextStyle={styles.dropdown2BtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown2DropdownStyle}
      rowStyle={styles.dropdown2RowStyle}
      rowTextStyle={styles.dropdown2RowTxtStyle}
    />


    )
};


const styles = StyleSheet.create({
    dropdown2BtnStyle: {
      width: '100%',
      height: 50,
      backgroundColor: '#444',
      borderRadius: 8,
      marginBottom: 20
    },
    dropdown2BtnTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
      backgroundColor: '#444',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    }
  });