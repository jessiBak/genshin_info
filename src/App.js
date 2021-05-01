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
  const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
  useEffect(() =>{
    getInfo();
  });

  function onCharaButtonClick(e)
  {
    if(teamList.length < 4 && !teamList.includes(e.target.value))
    {
      setTeamList([...teamList], e.target.value);
      alert(e.target.value + "added!");
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
        alert(e.target.value + "removed!");
      } 
    }  
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
  //let myTeam = ["Zhongli", "Fischl", "Hu Tao", "Xingqiu"];
  //let chara_cards = [];
  /*for(let i = 0; i < myTeam.length; i++)
  {
    getInfo(myTeam[i]);
    chara_cards.push(<CharacterCard key={ i } name={ info.name } src={ info.img_src } element={ info.element } weapon={ info.weapon } />);
  }*/
  const character_btns = [];
  for(let i = 0; i < characterList.length; i++)
  {
    character_btns.push((<CharacterButton name={ characterList[i] } onClick={ onCharaButtonClick } key={ i }/>))
  }
  
  //getInfo("Zhongli");
  //<CharacterCard name={ info.name } src={ info.img_src } element={ info.element } weapon={ info.weapon } />
  return (
    <div class="container">
      <div class="row row-cols-4">
      { character_btns }
      </div>
    </div>
    
  );
}

export default App;
