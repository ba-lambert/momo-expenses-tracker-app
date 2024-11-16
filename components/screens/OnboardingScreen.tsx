import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Button } from '../common/Button';
import { colors } from '../../constants/colors';

const OnboardingScreen = ({ navigation }: any) => {
  const handleGetStarted = () => {
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ExpenseTracker</Text>
      <Text style={styles.subtitle}>Track your expenses with ease</Text>
      <Button 
        title="Get Started" 
        onPress={handleGetStarted}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.7,
    marginBottom: 30,
  },
  button: {
    width: '100%',
  },
});

export default OnboardingScreen;