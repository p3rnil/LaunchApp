// Not in use at all!
// TODO: Check to remove
import React, { createContext, useContext, useReducer } from 'react';
import { agenciesEndpoint } from './config';
import axios from 'axios';

const AgenciesStateContext = createContext();
const AgenciesDispatchContext = createContext();

const agenciesReducer = (state, action) => {
  switch (action.type) {
    case 'start update': {
      return { status: 'loading' };
    }
    case 'finish update': {
      return { status: 'finish', agencies: action.payload };
    }
    case 'fail update': {
      return { status: 'error', error: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const AgencyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(agenciesReducer, {
    agencies: null,
    status: '',
    error: '',
  });
  return (
    <AgenciesStateContext.Provider value={state}>
      <AgenciesDispatchContext.Provider value={dispatch}>
        {children}
      </AgenciesDispatchContext.Provider>
    </AgenciesStateContext.Provider>
  );
};

const useAgenciesState = () => {
  const context = useContext(AgenciesStateContext);
  if (context === undefined) {
    throw new Error('useAgenciesState must be used within a AgencyProvider');
  }
  return context;
};

const useAgenciesDispatch = () => {
  const context = useContext(AgenciesDispatchContext);
  if (context === undefined) {
    throw new Error('useAgenciesDispatch must be used within a AgencyProvider');
  }
  return context;
};

// TODO: Add store
const getAgencies = async (dispatch, callback = null) => {
  try {
    dispatch({ type: 'start update' });
    const response = await axios.get(agenciesEndpoint);
    dispatch({ type: 'finish update', payload: response.data.agencies });

    if (callback !== null) {
      callback(response.data.agencies);
    }
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
    console.error(error);
  }
};

export { AgencyProvider, useAgenciesState, useAgenciesDispatch, getAgencies };
