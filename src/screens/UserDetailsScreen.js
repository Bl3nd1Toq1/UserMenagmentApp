import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/userSlice';

const UserDetailsScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: user.name, email: user.email });

  const handleSave = () => {
    if (!editedUser.name.trim() || !editedUser.email.trim()) {
      Alert.alert('Error', 'Both fields required');
      return;
    }
    dispatch(updateUser({ id: user.id, ...editedUser }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ name: user.name, email: user.email });
    setIsEditing(false);
  };

  

  const renderEditableField = (label, value, field, multiline = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={editedUser[field]}
          onChangeText={(text) => setEditedUser({...editedUser, [field]: text})}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
        />
      ) : (
        <Text style={styles.detailText}>{value || 'Not provided'}</Text>
      )}
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
      <View style={styles.header}>
        {isEditing ? (
          <TextInput
            style={[styles.input, { fontSize: 24, textAlign: 'center' }]}
            value={editedUser.name}
            onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
          />
        ) : (
          <Text style={styles.userName}>{user.name}</Text>
        )}
        
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Info</Text>
        {renderEditableField('Email', user.email, 'email')}
      </View>

      

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit User</Text>
          </TouchableOpacity>
        )}
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
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  
  section: {
    backgroundColor: '#fff',
    margin: 16,
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
    marginBottom: 12,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    padding: 16,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
