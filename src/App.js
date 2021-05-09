import React from 'react';
import { useEffect, useState} from 'react';
import TeamBuildPage from './TeamBuilderPage';
import CharacterBrowsePage from './CharacterBrowsePage';
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

  if(isStart)
  {
    return(
      <div className="container start-page">
        <h1 className="startTitle">Welcome to Genshin Info!</h1>
        <h2 className="start-header">I want to...</h2>
        <button className="btn btn-secondary team-btn" onClick={ teamClicked } >Build a Team!</button>
        <button className="btn btn-secondary plan-btn" onClick={ planClicked }>Plan for Weekly Domains!</button>
        <button className="btn btn-secondary browse-btn" onClick={ browseClicked }>Browse all Characters!</button>
      </div>
    );
  }

  if(isBrowse)
  {
    console.log("Dislaying Character Browsing Page...");
    return(< CharacterBrowsePage allData={allData}/>);
  }
  else if(isPlan)
  {
    console.log("Dislaying Weekly Domain Planner Page...");
    return(<h1>Weekly Domain Planner Page In Progress!</h1>);
  }
  else if( isTeamBuild)
  {
    console.log("Dislaying Team Builder Page...");
    return(<TeamBuildPage allData={ allData }/>);
  }
  else
  {
    console.log("s: ", isStart);
    console.log("p: ", isPlan);
    console.log("t: ", isTeamBuild);
    console.log("b: ", isBrowse);
    return(
      <div>
        <h1>Uh oh...</h1>
        <h2>Check console for log...</h2>
      </div>
    );
  }
}

export default App;
