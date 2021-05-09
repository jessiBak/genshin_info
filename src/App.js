import React from 'react';
import { useEffect, useState} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import TeamBuildPage from './TeamBuilderPage';
import CharacterBrowsePage from './CharacterBrowsePage';
import PlannerPage from './WeeklyDomainPlannerPage';
import './App.css';

function App() 
{
  const [allData, setData] = useState({});
  const [isStart, setStart] = useState(true);
  const [isTeamBuild, setTeamBuild] = useState(false);
  const [isPlan, setPlan] = useState(false);
  const [isBrowse, setBrowse] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);
  
  async function getInfo()
  {
      const url = 'http://127.0.0.1:5000/characters/all';
      const apiCall = await fetch(url);
      const response = await apiCall.json();
      setData(response);
  }

  function teamClicked()
  {
    setTeamBuild(true);
    setStart(false);
    setBrowse(false);
    setPlan(false);
  }

  function planClicked()
  {
    setPlan(true);
    setStart(false);
    setTeamBuild(false);
    setBrowse(false);
  }

  function browseClicked()
  {
    setBrowse(true);
    setStart(false);
    setPlan(false);
    setTeamBuild(false);
  }

  function startPage()
  {
    return(
    <div className="container start-page">
        <h1 className="startTitle">Welcome to Genshin Info!</h1>
        <h2 className="start-header">I want to...</h2>
        <Link to="/team-builder" >Build a Team!</Link>
        <Link to="/planner" >Plan for Weekly Domains!</Link>
        <Link to="/browse" >Browse all Characters!</Link>
      </div>
    );
  }
    
  return(
    <BrowserRouter>
      <Switch>

        <Route exact path="/" >
          { startPage }
        </Route>

        <Route exact path="/team-builder">
          <TeamBuildPage allData={ allData } />
        </Route>
        
        <Route exact path="/browse" >
          <CharacterBrowsePage allData={ allData } />
        </Route>

        <Route exact path="/planner" >
          <PlannerPage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
