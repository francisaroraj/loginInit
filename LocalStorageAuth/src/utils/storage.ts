import AsyncStorage from '@react-native-community/async-storage';
import { StoreKey } from './asyncStoreKeys';

export const AsyncStorageHelper = {
  storeData: async (key: StoreKey, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error('Persistance Data storage Error');
    }
  },
  retrieveData: async (key: string, callback: (value: any) => void) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && value !== undefined) {
        callback(value);
      } else {
        callback(null);
      }
    } catch (error) {
      callback(error);
    }
  },
  removeItemValue: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  },
};
