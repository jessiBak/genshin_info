import React from 'react';
import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import CharacterButton from './CharacterButton';
import './App.css';

function App() 
{
  const [info1, setInfo1] = useState({});
  const [info2, setInfo2] = useState({});
  const [info3, setInfo3] = useState({});
  const [info4, setInfo4] = useState({});
  const [teamList, setTeamList] = useState([]);
  const [teamSubmitted, setTeamSubmitted] = useState(false);
  const character_info = [];
  const character_cards = [];

  const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Xiao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
 useEffect(() =>{
    getInfo();
  });

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
        if (elem.innerHTML ==="Add to Team") 
        {
          elem.innerHTML = "Remove from Team";
        }
        else 
        {
          elem.innerHTML = "Add to Team";
        }
        alert(e.target.value + " removed!");
      } 
    }
    console.log("teamList:", teamList);  
  }

  function getInfo(name, index)
  {
      const url = 'http://127.0.0.1:5000/characters/' + name;
      return fetch(url)
      .then(response => response.json())
      .then(response => {
        console.log("response: ", response);
        switch(index)
        {
          case 0:
            setInfo1(response);
            break;
          case 1:
            setInfo2(response);
            break;
          case 2:
            setInfo3(response);
            break;
          case 3:
            setInfo4(response);
            break;
          default:
              console.log(response);
        }
        
        return;
      }).catch(error =>(console.log(error)));  
  } 

  function teamSubmitClicked()
  {
    if(teamList.length > 0)
    {
      setTeamSubmitted(true);
    alert("Team set: " + String(teamList) + "\nGathering info...");
    }
    else
    {
      alert("Team list is empty! Please add some characters and try again.");
    }
    
  }
  const character_btns = [];
  for(let i = 0; i < characterList.length; i++)
  {
    character_btns.push((<CharacterButton name={ characterList[i] } onCharaClick={ onCharaButtonClick } key={ i }/>))
  }
  
  if(!teamSubmitted)
  {
    return (
      <div class="container-fluid start-page text-center">
        <h1 class="title-header">Genshin Info</h1>
        <div class="row row-cols-4">
        { character_btns }
        </div>
        <button class="btn btn-success" onClick = { teamSubmitClicked }>Get Team Info</button>
      </div>
    );
  } 
  else
  {
    let info_map = {
      0: info1,
      1: info2,
      2: info3,
      3: info4,
    };
    console.log("character_info: ", character_info);
    for(let i = 0; i < teamList.length; i++)
    {
      getInfo(teamList[i], i);
      //console.log("info: ", info);
      character_cards.push((<CharacterCard name={ info_map[i].name } src={ info_map[i].img_src } element={ info_map[i].element } weapon={ info_map[i].weapon } />));
    }
    getInfo("Zhongli");
    return(
      <div class="container-fluid start-page text-center">
        <h1 class="title-header">Genshin Info</h1>
        <div class="row row-cols-4">
          { character_cards }
        </div>
      </div>
    );
   
  }
  // return (<h1 class="title-header">Character Info Page in Progress...</h1>);
}

export default App;
