import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const DocumentUpload = ({handleFileUpload}) => {
  const [selectedDocument, setSelectedDocument] = useState({name: 'sss'});

  const handlePickDocument = async () => {

    try {
        let result = await DocumentPicker.getDocumentAsync({multiple: false, type: ['image/*', 'pdf/*', 'txt/*']});
        console.log('result=========', result);
        setSelectedDocument(result?.assets?.[0]);
        handleFileUpload(result?.assets?.[0].uri);
    } catch (err) {
        console.log('err=========', err);
    }
  };

  const handleUpload = async () => {
    if (!selectedDocument) {
      alert('Please select a document first');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('document', {
        uri: selectedDocument.uri,
        type: selectedDocument.type,
        name: selectedDocument.name,
      });

      const response = await fetch('https://example.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log('Upload successful:', data);
      setSelectedDocument(null); // Clear selected document after successful upload
      alert('Document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading document:', error);
      alert('Failed to upload document');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePickDocument}>
        <Text style={styles.buttonText}>Select Prescription doc</Text>
      </TouchableOpacity>
      {/* <View>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#009688' }]} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View> */}
      {selectedDocument && (
        <View>
          <Text style={styles.documentInfoText}>Selected file: {selectedDocument.name}</Text>
          <Text style={styles.documentInfoText}>Type: {selectedDocument.mimeType}</Text>
          <Text style={styles.documentInfoText}>Size: {selectedDocument.size} bytes</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 200,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 20,
    // backgroundColor: '#ffffff',

    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#fff',

},
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  documentInfo: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 10,
    borderRadius: 5,
  },
  documentInfoText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default DocumentUpload;
