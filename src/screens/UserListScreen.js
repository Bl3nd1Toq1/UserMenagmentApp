import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, deleteUser } from '../store/userSlice';

const UserListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, searchQuery } = useSelector((state) => state.users);
  const [localSearchQuery, setLocalSearchQuery] = useState('');


  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const handleSearch = (text) => {
    setLocalSearchQuery(text);
    dispatch(setSearchQuery(text));
  };

  const handleDeleteUser = (userId, userName) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Are you sure you want to delete ${userName}?`);
      if (confirmed) {
        dispatch(deleteUser(userId));
      }
      return;
    }

    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => dispatch(deleteUser(userId))
        },
      ]
    );
  };

  const renderUserItem = ({ item }) => (
    <Pressable
      style={styles.userItem}
      onPress={() => navigation.navigate('UserDetails', { user: item })}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userCompany}>{item.company?.name || 'No Company'}</Text>
        {item.isLocal && (
          <Text style={styles.localBadge}>Local User</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={(e) => { e?.stopPropagation?.(); handleDeleteUser(item.id, item.name); }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </Pressable>
  );

  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email..."
          value={localSearchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>+ Add New User</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        bounces={Platform.OS !== 'web'}
        scrollEnabled={true}
        nestedScrollEnabled={Platform.OS !== 'web'}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  userItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  userCompany: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  localBadge: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
 
});

export default UserListScreen;
