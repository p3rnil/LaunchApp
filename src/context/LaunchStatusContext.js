import React, { createContext, useContext, useReducer } from 'react';
import { getStoredData, storeData } from './utils';
import axios from 'axios';

const LaunchesStatusStateContext = createContext();
const LaunchesStatusDispatchContext = createContext();

const keysStore = {
  status: 'launchStatus',
};

const launchesStatusReducer = (state, action) => {
  switch (action.type) {
    case 'start update': {
      return { status: 'loading' };
    }
    case 'finish update': {
      return { status: 'finish', launchesStatus: action.payload };
    }
    case 'fail update': {
      return { status: 'error', error: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const LaunchStatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(launchesStatusReducer, {
    launchesStatus: null,
    status: '',
    error: '',
  });
  return (
    <LaunchesStatusStateContext.Provider value={state}>
      <LaunchesStatusDispatchContext.Provider value={dispatch}>
        {children}
      </LaunchesStatusDispatchContext.Provider>
    </LaunchesStatusStateContext.Provider>
  );
};

const useLaunchesStatusState = () => {
  const context = useContext(LaunchesStatusStateContext);
  if (context === undefined) {
    throw new Error(
      'useLaunchesStatusState must be used within a LaunchStatusProvider',
    );
  }
  return context;
};

const useLaunchesStatusDispatch = () => {
  const context = useContext(LaunchesStatusDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useLaunchesStatusDispatch must be used within a LaunchStatusProvider',
    );
  }
  return context;
};

const getLaunchesStatus = async (dispatch) => {
  try {
    dispatch({ type: 'start update' });

    // Check for stored data
    const storedLaunchStatus = await getStoredData(keysStore.status);

    if (storedLaunchStatus) {
      dispatch({ type: 'finish update', payload: storedLaunchStatus });
    } else {
      const response = await axios.get(
        'https://launchlibrary.net/1.4/launchstatus',
      );

      // Store data
      await storeData(keysStore.families, response.data.types);
      dispatch({ type: 'finish update', payload: response.data.types });
    }
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
    console.error(error);
  }
};

export {
  LaunchStatusProvider,
  useLaunchesStatusState,
  useLaunchesStatusDispatch,
  getLaunchesStatus,
};
