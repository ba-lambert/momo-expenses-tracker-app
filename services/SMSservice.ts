import * as SMS from 'expo-sms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid } from 'react-native';

export class SMSService {
  static async requestAndroidPermissions() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      ]);

      return Object.values(granted).every(
        (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (error) {
      console.error('Error requesting Android permissions:', error);
      return false;
    }
  }

  static async startMonitoring(phoneNumber: string) {
    try {
      // For Android, request permissions first
      if (Platform.OS === 'android') {
        const permissionsGranted = await this.requestAndroidPermissions();
        if (!permissionsGranted) {
          throw new Error('SMS permissions not granted');
        }
      }

      // Check if SMS is available
      const isAvailable = await SMS.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('SMS is not available on this device');
      }

      // Store the phone number
      await AsyncStorage.setItem('monitoredPhoneNumber', phoneNumber);
      
      return true;
    } catch (error) {
      console.error('Error starting SMS monitoring:', error);
      return false;
    }
  }

  static async stopMonitoring() {
    try {
      await AsyncStorage.removeItem('monitoredPhoneNumber');
      return true;
    } catch (error) {
      console.error('Error stopping SMS monitoring:', error);
      return false;
    }
  }
}