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
      return { status: 'finish', families: action.payload };
    }
    case 'fail update': {
      return { status: 'error', error: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const RocketFamilyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rocketFamilyReducer, {
    families: null,
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

// TODO: Update data after x days
const getRocketFamilies = async (dispatch, callback = null) => {
  dispatch({ type: 'start update' });

  try {
    // Check for stored data
    const storedRocketFamilies = await AsyncStorage.getItem('rocketFamilies');
    if (storedRocketFamilies !== null) {
      // Stored data found
      const rocketFamilies = JSON.parse(storedRocketFamilies);
      dispatch({ type: 'finish update', payload: rocketFamilies });

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

    // Store data
    const filteredRocketFamilies = rocketFamilies.filter(
      (x) => x !== undefined,
    );
    const jsonRockets = JSON.stringify(filteredRocketFamilies);
    await AsyncStorage.setItem('rocketFamilies', jsonRockets);

    dispatch({ type: 'finish update', payload: filteredRocketFamilies });

    if (callback !== null) {
      callback(filteredRocketFamilies);
    }
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
    console.error(error);
  }
};

export {
  RocketFamilyProvider,
  useRocketFamilyState,
  useRocketFamilyDispatch,
  getRocketFamilies,
};
