/* eslint-disable no-undef */
import React, {useRef, useState} from 'react';
import MultiSelect from 'react-native-multiple-select';
import {View,  StyleSheet} from 'react-native';

export default function MultiDropDown(props)  {
    let {data, onSelect, selectedItems, displayKey, dropDownStyle, showSelectedItems} = props;

    selectedItems = selectedItems.map(i=> i.toString());
    data = data.map(i=> {
      i.id = i.id.toString();
      return i;
    });
    const selectRef = useRef(null);
    const [refSet, setRefSet] = useState(false);

    return (
      <View>
        <MultiSelect
          hideTags
          // styleDropdownMenuSubsection={{display:'none'}}  
          hideDropdown // this prop added to hide left arrow icon on right side of search input box
          styleItemsContainer={dropDownStyle}
          items={data}
          uniqueKey="id"
          ref={(component) => { 
            selectRef.current = component;
            setRefSet(true);
           }}
           ico
          onSelectedItemsChange={onSelect}
          selectedItems={selectedItems}
          selectText="  Select common allergic content"
          searchInputPlaceholderText="Search common allergic content..."
          onChangeInput={ (text)=> {}}
          // altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="black"
          tagBorderColor="gray"
          tagTextColor="black"
          selectedItemTextColor="black"
          selectedItemIconColor="black"
          itemTextColor="black"
          displayKey={displayKey}
          searchInputStyle={{ color: 'black' }}
          hideSubmitButton={true}
          submitButtonColor="#2cd18a"
          submitButtonText="Done"
        />
        {
          showSelectedItems && selectRef.current &&
          <View>
            {selectRef.current && selectRef.current.getSelectedItemsExt(selectedItems)}
          </View>
        }
        </View>

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