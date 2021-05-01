import React from 'react';
import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import './CharacterCard.css';
import CharacterButton from './CharacterButton';

function App() 
{
  const [info, setInfo] = useState({});
  const [teamList, setTeamList] = useState([]);
  const character_info = [];
  const [teamSubmitted, setTeamSubmitted] = useState(false);

  const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
  useEffect(() =>{
    getInfo();
  });

  function onCharaButtonClick(e)
  {
    if(teamList.length < 4 && !teamList.includes(e.target.value))
    {
      setTeamList([...teamList, e.target.value]);
      document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.borderRadius = "7px";
      document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.boxShadow = " 0 0 10px #9ecaed";
      alert(e.target.value + " added!");
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
        alert(e.target.value + " removed!");
      } 
    }
    console.log("teamList:", teamList);  
  }

   function getInfo(name)
  {
      const url = 'http://127.0.0.1:5000/characters/' + name;
      return fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log("response: ", response);
        setInfo(response);
        character_info.push(response);
        return;
      }).catch(error =>(console.log(error)));  
  } 
  function teamSubmitClicked()
  {
    setTeamSubmitted(true);
    alert("Team set: " + String(teamList) + "\nGathering info...");
  }
  const character_btns = [];
  for(let i = 0; i < characterList.length; i++)
  {
    character_btns.push((<CharacterButton name={ characterList[i] } onCharaClick={ onCharaButtonClick } key={ i }/>))
  }
  
  //getInfo("Zhongli");
  //<CharacterCard name={ info.name } src={ info.img_src } element={ info.element } weapon={ info.weapon } />
  return (
    <div class="container">
      <h1 class="display-1">Genshin Info</h1>
      <div class="row row-cols-4">
      { character_btns }
      </div>
      <button class="submit-team-btn" onClick = { teamSubmitClicked }>Get Team Info</button>
    </div>
    
  );
}

export default App;
