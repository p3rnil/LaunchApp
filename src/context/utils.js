import AsyncStorage from '@react-native-community/async-storage';

// Retrieve stored data
const getStoredData = async (key) => {
  let data = null;
  // Check for stored data
  data = await AsyncStorage.getItem(key);
  if (data) {
    // Stored data found
    data = JSON.parse(data);

    return data;
  }
};

// Store data
const storeData = async (key, data) => {
  const jsonData = JSON.stringify(data);
  await AsyncStorage.setItem(key, jsonData);
};

export { getStoredData, storeData };
