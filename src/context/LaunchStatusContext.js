import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const LaunchesStatusStateContext = createContext();
const LaunchesStatusDispatchContext = createContext();

function launchesStatusReducer(state, action) {
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
}

function LaunchStatusProvider({ children }) {
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
}

function useLaunchesStatusState() {
  const context = useContext(LaunchesStatusStateContext);
  if (context === undefined) {
    throw new Error(
      'useLaunchesStatusState must be used within a LaunchStatusProvider',
    );
  }
  return context;
}

function useLaunchesStatusDispatch() {
  const context = useContext(LaunchesStatusDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useLaunchesStatusDispatch must be used within a LaunchStatusProvider',
    );
  }
  return context;
}

async function getLaunchesStatus(dispatch, callback = null) {
  try {
    dispatch({ type: 'start update' });
    const response = await axios.get(
      'https://launchlibrary.net/1.4/launchstatus',
    );
    dispatch({ type: 'finish update', payload: response.data.types });

    if (callback != null) {
      callback(response.data.types);
    }

    return response.data.types;
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
    console.error(error);
  }
}

export {
  LaunchStatusProvider,
  useLaunchesStatusState,
  useLaunchesStatusDispatch,
  getLaunchesStatus,
};
