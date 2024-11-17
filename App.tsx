import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './constants/colors';
import { View, StyleSheet } from 'react-native';
import { PhoneNumberDialog } from './components/expenses/PhoneNumberDialog';

import ProfileScreen from './components/screens/ProfileScreen';
import SplashScreen from './components/screens/SplashScreen';
import OnboardingScreen from './components/screens/OnboardingScreen';
import HomeScreen from './components/screens/HomeScreen';
import AnalyticsScreen from './components/screens/AnalyticsScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { SMSService } from './services/SMSservice';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handlePhoneNumberSubmit = async (phoneNumber: string) => {
    try {
      console.log('Attempting to start monitoring for:', phoneNumber); // Debug log
      const success = await SMSService.startMonitoring(phoneNumber);
      
      if (success) {
        console.log('Successfully started monitoring phone number:', phoneNumber);
        setIsDialogOpen(false); // Close the dialog on success
      } else {
        alert('Failed to setup SMS monitoring. Please check permissions and try again.');
      }
    } catch (error) {
      console.error('Error handling phone number:', error);
      alert('Failed to setup SMS monitoring: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };


  const CustomAddButton = () => (
    <TouchableOpacity 
      style={styles.addButtonContainer}
      onPress={() => setIsDialogOpen(true)}
    >
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.addButton}
      >
        <MaterialCommunityIcons 
          name="plus" 
          size={24} 
          color="white" 
        />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 16,
          right: 16,
          borderRadius: 24,
          height: 64,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.1,
          shadowRadius: 24,
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={30}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 24,
            }}
          />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'rgba(31, 41, 55, 0.5)',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: -4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <MaterialCommunityIcons
                name={focused ? "swap-horizontal" : "swap-horizontal"}
                size={24}
                color={color}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <CustomAddButton />,
          tabBarButton: (props) => (
            <TouchableOpacity 
              {...props} 
              onPress={() => setIsDialogOpen(true)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <MaterialCommunityIcons
                name={focused ? "chart-bar" : "chart-bar-stacked"}
                size={24}
                color={color}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={styles.tabIconContainer}>
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                size={24}
                color={color}
              />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    <PhoneNumberDialog visible={isDialogOpen} onClose={()=>setIsDialogOpen(false)} onSubmit={handlePhoneNumberSubmit} />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="MainApp" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}








// Add these styles
const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 32,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  addButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});