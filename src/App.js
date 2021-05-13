import React from 'react';
import { useEffect, useState} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import TeamBuildPage from './TeamBuilderPage';
import CharacterBrowsePage from './CharacterBrowsePage';
import PlannerPage from './WeeklyDomainPlannerPage';
import './App.css';

function App() 
{
  //const [allData, setData] = useState({});

  const initialState = {
    teamList: [],
    teamSubmitted: false,
    currentCharacter: '',
    allData: {}
};

const teamReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case 'teamList/addCharacter':
          console.log(`Adding character: ${action.payload}`);
          let newList = [...state.teamList, action.payload];
          console.log("New list: ", newList);
            return {
                ...state,
                teamList: newList
            };
        case 'teamList/removeCharacter':
          console.log(`Removing character: ${action.payload}`);
            let index = [...store.getState().teamList].indexOf(action.payload);
            let updatedList = [...state.teamList].splice(index, 1);
            return {
                ...state,
                teamList: updatedList
            };
        case 'teamSubmitted/toggleSubmitted':
            console.log(`Changing teamSubmitted to: ${!state.teamSubmitted}`);
            return {
                ...state,
                teamSubmitted: !state.teamSubmitted
            };
        case 'currentCharacter/changeCurrentCharacter':
            console.log(`Changing current character to: ${action.payload}`);
            return {
                ...state,
                currentCharacter: action.payload
            }
        case 'allData/dataReceived':
          return {
              ...state,
              allData: action.payload
          }
        default:
            return state;
    }
}

const store = createStore(teamReducer);
let allData = store.getState().allData;
//const [state, updateState] = useState({});
//store.subscribe(() => {updateState(store.getState())});

  useEffect(() => {
    getInfo();
  }, []);
  
  async function getInfo()
  {
      const url = 'http://127.0.0.1:5000/characters/all';
      const apiCall = await fetch(url);
      const response = await apiCall.json();
      //setData(response);
      store.dispatch({type: 'allData/dataReceived', payload: response});
  }

  function startPage()
  {
    return(
    <div className="container-fluid justify-content-center text-center start-page">
        <h1 className="startTitle">Welcome to Genshin Info!</h1>
        <h2 className="start-header">I want to...</h2>
        <Link to="/team-builder" >Build a Team!</Link>
        <br/>
        <Link to="/planner" >Plan for Weekly Domains!</Link>
        <br/>
        <Link to="/browse" >Browse all Characters!</Link>
      </div>
    );
  }
    
  return(
    <Provider store={ store }>
      <BrowserRouter>
      <Switch>

        <Route exact path="/" >
          { startPage }
        </Route>

        <Route exact path="/team-builder">
          <TeamBuildPage allData={ store.getState().allData } />
          <Link to="/" >Back to Home</Link>
        </Route>
        
        <Route exact path="/browse" >
          <CharacterBrowsePage allData={ store.getState().allData } />
          <Link to="/" >Back to Home</Link>
        </Route>

        <Route exact path="/planner" >
          <PlannerPage />
          <Link to="/" >Back to Home</Link>
        </Route>

      </Switch>
      
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;