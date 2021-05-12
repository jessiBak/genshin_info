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
    <BrowserRouter>
      <Switch>

        <Route exact path="/" >
          { startPage }
        </Route>

        <Route exact path="/team-builder">
          <TeamBuildPage allData={ allData } />
          <Link to="/" >Back to Home</Link>
        </Route>
        
        <Route exact path="/browse" >
          <CharacterBrowsePage allData={ allData } />
          <Link to="/" >Back to Home</Link>
        </Route>

        <Route exact path="/planner" >
          <PlannerPage />
          <Link to="/" >Back to Home</Link>
        </Route>

      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
