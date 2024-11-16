import React from 'react';
import { View, ScrollView,Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {ExpenseCard} from '../expenses/ExpenseCard';
import { colors } from '../../constants/colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, John</Text>
            <Text style={styles.subGreeting}>Track your expenses</Text>
          </View>
          <MaterialCommunityIcons 
            name="bell-outline" 
            size={24} 
            color={colors.text} 
          />
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$2,548.00</Text>
          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name="arrow-up-circle" 
                size={20} 
                color={colors.success} 
              />
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statAmount}>$1,840</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name="arrow-down-circle" 
                size={20} 
                color={colors.notification} 
              />
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statAmount}>$284</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <ExpenseCard
            amount={42.5}
            category="Food"
            date="Today"
            title="Grocery Shopping"
            type="expense"
          />
          <ExpenseCard
            amount={1500}
            category="Salary"
            date="Yesterday"
            title="Monthly Salary"
            type="income"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subGreeting: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.7,
  },
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  balanceAmount: {
    color: colors.background,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  statAmount: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
});