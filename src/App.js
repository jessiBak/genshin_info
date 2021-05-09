import React from 'react';
import { useEffect, useState} from 'react';
import CharacterCard from './CharacterCard';
import CharacterButton from './CharacterButton';
import CharacterNav from './CharacterNav';
import './App.css';

function App() 
{
  const [allData, setData] = useState({});
  const [teamList, setTeamList] = useState([]);
  const [teamSubmitted, setTeamSubmitted] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(teamSubmitted ? teamList[0] : "");
  const [isStart, setStart] = useState(true);
  const [isTeamBuild, setTeamBuild] = useState(false);
  const [isPlan, setPlan] = useState(false);
  const [isBrowse, setBrowse] = useState(false);

  const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Xiao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
  
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

  function onCharaButtonClick(e)
  {
    let id = "chara-btn-" + e.target.value;
    var elem = document.getElementById(id);
    if(teamList.length < 4 && !teamList.includes(e.target.value))
    {
      setTeamList([...teamList, e.target.value]);
      document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.borderRadius = "7px";
      document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.boxShadow = " 0 0 10px #9ecaed";
      if (elem.innerHTML ==="Add to Team") 
      {
        elem.innerHTML = "Remove from Team";
      }
      else 
      {
        elem.innerHTML = "Add to Team";
      }
    }
    else if(teamList.length === 4 && !teamList.includes(e.target.value))
    {
      alert("Team has reached max members! Please remove a member to add another.");
    }
    else
    {
      let prevList = [...teamList];
      let index = prevList.indexOf(e.target.value);
      if(index !== -1)
      {
        prevList.splice(index, 1);
        setTeamList(prevList);
        document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.borderRadius = null;
        document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.boxShadow = null;
        if (elem.innerHTML ==="Add to Team") 
        {
          elem.innerHTML = "Remove from Team";
        }
        else 
        {
          elem.innerHTML = "Add to Team";
        }
      } 
    }
  } 

  function teamSubmitClicked()
  {
    if(teamList.length > 0)
    {
      setTeamSubmitted(true);
      alert("Team set: " + String(teamList) + "\nGathering info...");
      console.log("value of allData on submit: ", allData);
    }
    else
    {
      alert("Team list is empty! Please add some characters and try again.");
    }
  }

  function navClicked(e)
  {
    setCurrentCharacter(e.currentTarget.value);
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

  const character_btns = [];
  for(let i = 0; i < characterList.length; i++)
  {
    character_btns.push((<CharacterButton name={ characterList[i] } onCharaClick={ onCharaButtonClick } key={ i }/>))
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

  if(isBrowse && !isStart && !isTeamBuild && !isPlan)
  {
    return(<h1>Character Browse Page In Progress!</h1>);
  }
  else if(isPlan && ! isStart && ! isTeamBuild && !isBrowse)
  {
    return(<h1>Weekly Domain Planner Page In Progress!</h1>);
  }
  else if(!teamSubmitted && isTeamBuild && !isStart && !isPlan && !isBrowse)
  {
    return(
      <div class="container-fluid start-page text-center">
        <h1 class="title-header">Genshin Info</h1>
        <div class="row row-cols-4 chara-btns">
        { character_btns }
        </div>
        <button class="btn btn-success" onClick = { teamSubmitClicked }>Get Team Info</button>
      </div>
    );
  } 
  else if(teamSubmitted && isTeamBuild && !isStart && !isPlan && !isBrowse)
  {
    if(currentCharacter.length === 0)
    {
      setCurrentCharacter(teamList[0]);
    }
    console.log("currentCharacter: ", currentCharacter);
    console.log("allData[currentCharacter]: ", allData[currentCharacter]);
    return(
      <div class="container-fluid info-page text-center">
        <h1 class="title-header2">Genshin Info</h1>
        <h2 class="team-title">Team Builder</h2>
        <div class="row justify-content-center">
          <div class="col-6 chara-card-outer-div">
            {<CharacterCard info={ allData[currentCharacter] }/>}
          </div>
          <div class="col-6">
            <CharacterNav team={ teamList } navClick={ navClicked } />
          </div>
        </div>
      </div>
    ); 
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
