import React from 'react';
import { Provider } from 'react-redux';
import { Platform, StyleSheet, View } from 'react-native';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
 

export default function App() {
  const AppContent = () => (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );

  // Web-specific wrapper for better scrolling
  if (Platform.OS === 'web') {
    // On web, do not constrain the root View height; let body handle scrolling
    return <AppContent />;
  }

  return <AppContent />;
}

const styles = StyleSheet.create({});
