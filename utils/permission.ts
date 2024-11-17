import { Platform, PermissionsAndroid } from 'react-native';

export const requestSMSPermission = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions);

    return Object.values(granted).every(
      (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
    );

  } catch (error) {
    console.error('Error requesting SMS permissions:', error);
    return false;
  }
};

// Optional: Check if permissions are already granted
export const checkSMSPermissions = async () => {
  if (Platform.OS !== 'android') {
    return false;
  }

  try {
    const readSMS = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    const receiveSMS = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );

    return readSMS && receiveSMS;
  } catch (error) {
    console.error('Error checking SMS permissions:', error);
    return false;
  }
};