import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface ExpenseCardProps {
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  onPress?: () => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  amount,
  category,
  date,
  type,
  onPress,
}) => {
  const isIncome = type === 'income';

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={isIncome ? 'arrow-up-circle' : 'arrow-down-circle'}
          size={24}
          color={isIncome ? colors.success : colors.notification}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={[
          styles.amount,
          { color: isIncome ? colors.success : colors.notification }
        ]}>
          {isIncome ? '+' : '-'}RWF{amount}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  category: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.6,
    marginTop: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    marginTop: 4,
  },
});