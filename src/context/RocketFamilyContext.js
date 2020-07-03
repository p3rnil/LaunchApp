import React, { createContext, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const RocketFamilyStateContext = createContext();
const RocketFamilyDispatchContext = createContext();

const rocketFamilyReducer = (state, action) => {
  switch (action.type) {
    case 'start update': {
      return { status: 'loading' };
    }
    case 'finish update': {
      return { status: 'finish', rocketFamilies: action.payload };
    }
    case 'fail update': {
      return { status: 'error', error: action.payload };
    }
    case 'getRocketFamily': {
      return { status: 'finish', rocketFamily: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const RocketFamilyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rocketFamilyReducer, {
    rocketFamilies: null,
    rocketFamily: null,
    status: '',
    error: '',
  });
  return (
    <RocketFamilyStateContext.Provider value={state}>
      <RocketFamilyDispatchContext.Provider value={dispatch}>
        {children}
      </RocketFamilyDispatchContext.Provider>
    </RocketFamilyStateContext.Provider>
  );
};

const useRocketFamilyState = () => {
  const context = useContext(RocketFamilyStateContext);
  if (context === undefined) {
    throw new Error(
      'useRocketFamilyState must be used within a RocketFamilyProvider',
    );
  }
  return context;
};

const useRocketFamilyDispatch = () => {
  const context = useContext(RocketFamilyDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useRocketFamilyDispatch must be used within a RocketFamilyProvider',
    );
  }
  return context;
};

// Retrieve stored data dor rocket families
const getStoredData = async () => {
  let rocketFamilies = null;
  // Check for stored data
  rocketFamilies = await AsyncStorage.getItem('rocketFamilies');
  if (rocketFamilies) {
    // Stored data found
    rocketFamilies = JSON.parse(rocketFamilies);

    return rocketFamilies;
  }
};

// Store rocket families
const storeData = async (data) => {
  const jsonData = JSON.stringify(data);
  await AsyncStorage.setItem('rocketFamilies', jsonData);
};

// TODO: Update data after x days
const getRocketFamilies = async (dispatch, callback = null) => {
  dispatch({ type: 'start update' });

  try {
    // Check for stored data
    const storedRocketFamilies = await getStoredData();
    if (storedRocketFamilies) {
      if (callback !== null) {
        callback(rocketFamilies);
      }
      return;
    }

    // Prepare request
    // DISCLAIMER: API doesn't have a list for rocket all families,
    // there are some id that are undefined.
    // See: https://launchlibrary.net/docs/1.4.1/api.html#rocket
    const totalRocketFamilies = await axios
      .get('https://launchlibrary.net/1.4/rocketfamily')
      .then((response) => response.data.total + 50);

    let requests = [];
    for (let index = 1; index < totalRocketFamilies; index++) {
      requests.push(
        axios
          .get(`https://launchlibrary.net/1.4/rocketfamily/${index}`)
          .then((response) => {
            return response.data.RocketFamilies[0];
          }),
      );
    }

    // Requests sent
    const rocketFamilies = await axios.all(requests);

    // Filter data
    const filteredRocketFamilies = rocketFamilies.filter(
      (x) => x !== undefined,
    );

    // Store data
    await storeData(filteredRocketFamilies);

    if (callback !== null) {
      callback(filteredRocketFamilies);
    }

    dispatch({ type: 'finish update', payload: filteredRocketFamilies });
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
    console.error(error);
  }
};

const getRocketFamily = async (id, dispatch) => {
  const rocketFamilies = await getStoredData();

  if (rocketFamilies) {
    const rocketFamily = rocketFamilies.find((x) => x.id === id);
    dispatch({ type: 'getRocketFamily', payload: rocketFamily });
  } else {
    dispatch({ type: 'error', payload: 'Data not found' });
  }
};

export {
  RocketFamilyProvider,
  useRocketFamilyState,
  useRocketFamilyDispatch,
  getRocketFamilies,
  getRocketFamily,
};
