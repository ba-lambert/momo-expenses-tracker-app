import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants/colors';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    checkFirstTime();
  }, []);

  const checkFirstTime = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      
      setTimeout(() => {
        if (isFirstTime === null) {
          navigation.replace('Onboarding');
        } else {
          navigation.replace('MainApp');
        }
      }, 2000);
    } catch (error) {
      console.error('Error checking first time:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExpenseTracker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.background,
  },
});

export default SplashScreen;