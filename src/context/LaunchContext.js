import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';

const LaunchesStateContext = createContext();
const LaunchesDispatchContext = createContext();

function launchesReducer(state, action) {
  switch (action.type) {
    case 'start update': {
      return { status: 'started' };
    }
    case 'finish update': {
      return { status: 'finish', launches: action.launches };
    }
    case 'fail update': {
      return { status: 'fail' };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LaunchProvider({ children }) {
  const [state, dispatch] = useReducer(launchesReducer, {
    launches: null,
    status: '',
    error: '',
  });
  return (
    <LaunchesStateContext.Provider value={state}>
      <LaunchesDispatchContext.Provider value={dispatch}>
        {children}
      </LaunchesDispatchContext.Provider>
    </LaunchesStateContext.Provider>
  );
}

function useLaunchesState() {
  const context = useContext(LaunchesStateContext);
  if (context === undefined) {
    throw new Error('useLaunchesState must be used within a LaunchProvider');
  }
  return context;
}

function useLaunchesDispatch() {
  const context = useContext(LaunchesDispatchContext);
  if (context === undefined) {
    throw new Error('useLaunchesDispatch must be used within a LaunchProvider');
  }
  return context;
}

async function updateLaunches(dispatch) {
  try {
    dispatch({ type: 'start update' });
    const response = await axios.get('https://launchlibrary.net/1.4/launch');
    dispatch({ type: 'finish update', launches: response.data.launches });

    console.log(response.data.launches);
    return response.data.launches;
  } catch (error) {
    dispatch({ type: 'fail update' });
    console.error(error);
  }
}

// For a post
// async function updateLaunches(dispatch, launches, updates) {
//   try {
//     dispatch({ type: 'start update', updates });
//     const response = await axios.get('https://launchlibrary.net/1.4/launch');
//     dispatch({ type: 'finish update', updatedUser });

//     console.log(response.data.launches);
//     return response.data.launches;
//   } catch (error) {
//     dispatch({ type: 'fail update' });
//     console.error(error);
//   }
// }

// Consume post
// import {
//   useLaunchesState,
//   useLaunchesDispatch,
//   updateLaunches,
// } from './context';

// function updateLaunches() {
//   const {launches, status, error} = useUserState()
//   const launchesDispatch = useLaunchesDispatch();

//   function handleSubmit(event) {
//     event.preventDefault()
//     updateUser(launchesDispatch, launches, formState)
//   }

//   // more code...
// }

export {
  LaunchProvider,
  useLaunchesState,
  useLaunchesDispatch,
  updateLaunches,
};
