import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Text } from 'react-native';
import { colors } from '../../constants/colors';
import * as SMS from 'expo-sms';
import { requestSMSPermission, checkSMSPermissions } from '../../utils/permission';

interface PhoneNumberDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
}

export const PhoneNumberDialog: React.FC<PhoneNumberDialogProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a valid phone number');
      return;
    }
  
    setLoading(true);
  
    try {
      if (Platform.OS === 'android') {
        // First check if we already have permissions
        const hasExistingPermissions = await checkSMSPermissions();
        
        if (!hasExistingPermissions) {
          // Request permissions if we don't have them
          const permissionsGranted = await requestSMSPermission();
          
          if (!permissionsGranted) {
            alert('SMS permissions are required to track expenses');
            setLoading(false);
            return;
          }
        }
      }
  
      onSubmit(phoneNumber);
      setPhoneNumber('');
      onClose();
    } catch (error) {
      console.error('Error handling permissions:', error);
      alert('Failed to setup SMS monitoring');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.title}>Add Phone Number</Text>
            <Text style={styles.subtitle}>
              Enter your mobile money phone number to track expenses
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor={colors.text + '80'}
            />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 340,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text + '99',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: colors.card,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  addButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '500',
  },
});