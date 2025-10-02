import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser, setSearchQuery } from '../store/userSlice';

const AddUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = () => {
    const simpleErrors = {};
    if (!formData.name.trim()) simpleErrors.name = 'Name required';
    if (!formData.email.trim()) simpleErrors.email = 'Email required';
    setErrors(simpleErrors);
    if (Object.keys(simpleErrors).length > 0) return;

    dispatch(addUser(formData));
    dispatch(setSearchQuery(''));
    navigation.navigate('UserList');
  };

  const renderInput = (label, field, placeholder, multiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          errors[field] && styles.inputError,
        ]}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={true}
      bounces={Platform.OS !== 'web'}
      scrollEnabled={true}
      contentContainerStyle={styles.scrollContent}
      nestedScrollEnabled={Platform.OS !== 'web'}
      removeClippedSubviews={false}
    >
      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add User</Text>
          {renderInput('Name', 'name', 'Name')}
          {renderInput('Email', 'email', 'Email')}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  form: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    ...Platform.select({
      web: { boxShadow: '0px 1px 3px rgba(0,0,0,0.2)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    padding: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddUserScreen;
