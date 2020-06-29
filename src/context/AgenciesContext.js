import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const AgenciesStateContext = createContext();
const AgenciesDispatchContext = createContext();

function agenciesReducer(state, action) {
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
}

function AgencyProvider({ children }) {
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
}

function useAgenciesState() {
  const context = useContext(AgenciesStateContext);
  if (context === undefined) {
    throw new Error('useAgenciesState must be used within a AgencyProvider');
  }
  return context;
}

function useAgenciesDispatch() {
  const context = useContext(AgenciesDispatchContext);
  if (context === undefined) {
    throw new Error('useAgenciesDispatch must be used within a AgencyProvider');
  }
  return context;
}

async function getAgencies(dispatch, callback) {
  try {
    dispatch({ type: 'start update' });
    const response = await axios.get('https://launchlibrary.net/1.4/agency');
    dispatch({ type: 'finish update', payload: response.data.agencies });
    callback(response.data.agencies);

    return response.data.agencies;
  } catch (error) {
    dispatch({ type: 'fail update', payload: error });
    console.error(error);
  }
}

export { AgencyProvider, useAgenciesState, useAgenciesDispatch, getAgencies };
