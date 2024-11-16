export interface Expense {
    id: string;
    amount: number;
    category: string;
    date: Date;
    description?: string;
    type: 'income' | 'expense';
    title: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
  }
  
  export interface UserPreferences {
    currency: string;
    language: string;
    notifications: boolean;
  }