import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TagInput = ({selectedItems}) => {
  const [tags, setTags] = useState(selectedItems? selectedItems : []);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <View style={styles.container}>
        {
                tags.length > 0 && 
        <ScrollView style={styles.tagsContainerwrapper} showsVerticalScrollIndicator={false}>
                <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleRemoveTag(index)}
                    style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
                ))}
                </View>
        </ScrollView>
        }

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={tagInput}
          placeholder="Add custom allergic contents..."
          onChangeText={(text) => setTagInput(text)}
          onSubmitEditing={handleAddTag}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 50,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  tagsContainerwrapper : {
    height: 80,
    maxHeight: 200

  },
  tagsContainer: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    height: 80
},
  tag: {
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default TagInput;
