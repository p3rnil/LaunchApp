import React, { createContext, useContext, useReducer } from 'react';
import { getStoredData, storeData } from './utils';
import { rocketsEndpoint } from './config';
import axios from 'axios';

const RocketStateContext = createContext();
const RocketDispatchContext = createContext();

const keysStore = {
  rockets: 'rockets',
};

const rocketReducer = (state, action) => {
  switch (action.type) {
    case 'start update': {
      return { status: 'loading' };
    }
    case 'finish update': {
      return { status: 'finish', rockets: action.payload };
    }
    case 'fail update': {
      return { status: 'error', error: action.payload };
    }
    case 'updateRocket': {
      return { status: 'finish', rocket: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const RocketsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rocketReducer, {
    rockets: null,
    rocket: null,
    status: '',
    error: '',
  });
  return (
    <RocketStateContext.Provider value={state}>
      <RocketDispatchContext.Provider value={dispatch}>
        {children}
      </RocketDispatchContext.Provider>
    </RocketStateContext.Provider>
  );
};

const useRocketsState = () => {
  const context = useContext(RocketStateContext);
  if (context === undefined) {
    throw new Error('useRocketsState must be used within a RocketsProvider');
  }
  return context;
};

const useRocketDispatch = () => {
  const context = useContext(RocketDispatchContext);
  if (context === undefined) {
    throw new Error('useRocketDispatch must be used within a RocketsProvider');
  }
  return context;
};

// TODO: Update data after x days
const getRockets = async (dispatch) => {
  try {
    dispatch({ type: 'start update' });

    // Check for stored data
    const storedRockets = await getStoredData(keysStore.rockets);
    if (storedRockets) {
      dispatch({
        type: 'finish update',
        payload: storedRockets,
      });
    } else {
      // Prepare request
      // DISCLAIMER: API doesn't have a list for all rockets
      // there are some id that are undefined.
      // See: https://launchlibrary.net/docs/1.4.1/api.html#rocket
      const totalRockets = await axios
        .get(`${rocketsEndpoint}`)
        .then((response) => response.data.total + 50);

      let requests = [];
      for (let index = 1; index < totalRockets; index++) {
        requests.push(
          axios
            .get(`${rocketsEndpoint}${index}?mode=verbose`)
            .then((response) => {
              return response.data.rockets[0];
            }),
        );
      }

      // Requests sent
      const rockets = await axios.all(requests);

      // Filter data
      const filteredRockets = rockets.filter((x) => x !== undefined);
      await storeData(keysStore.rockets, filteredRockets);

      dispatch({ type: 'finish update', payload: filteredRockets });
    }
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
    console.error(error);
  }
};

// TODO: Fix cases where _ equals a space
// TODO: Retrieve all extra data
const getRocket = async (id, name, dispatch) => {
  try {
    const nameToSearch = name.split('/').pop();
    const response = await axios.all([
      axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&explaintext&exintro=&titles=${nameToSearch}`,
      ),
    ]);

    const description = Object.values(response[0].data.query.pages)[0].extract;
    dispatch({ type: 'updateRocket', payload: { description } });
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
  }
};

export {
  RocketsProvider,
  useRocketsState,
  useRocketDispatch,
  getRockets,
  getRocket,
};
