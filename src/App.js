import React from 'react';
import { useEffect, useState} from 'react';
import CharacterCard from './CharacterCard';
import CharacterButton from './CharacterButton';
import CharacterNav from './CharacterNav';
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
  const [currentInfo, setCurrentInfo] = useState({});
  //const controller = new AbortController();
  //const signal = controller.signal;


  const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Xiao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
  const getInfo = async (name, index) =>
  {
    const url = 'http://127.0.0.1:5000/characters/' + name;
    const apiCall = await fetch(url);
    const response = await apiCall.json();
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
  }
 
  useEffect(() => {
    getInfo();
 }, []);

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

  function navClicked(e, infoMap)
  {
    const index = e.target.getAttribute('key');
    setCurrentInfo(infoMap[index]);
    alert("Displaying info for " + e.target.value);
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
    const info_map = {
      1: info1,
      2: info2,
      3: info3,
      4: info4,
    };
    setCurrentInfo(info_map[1]);
    console.log("currentInfo: ", currentInfo);
    //console.log("character_info: ", character_info);
    for(let i = 0; i < teamList.length; i++)
    {
      getInfo(teamList[i], i);
      //console.log("info: ", info);
      character_cards.push((<CharacterCard info={ info_map[i + 1] } />));
    }
    //controller.abort();
    return(
      <div class="container-fluid info-page text-center">
        <h1 class="title-header">Genshin Info</h1>
        <div class="row justify-content-center">
          <div class="col-7">
            {/*<CharacterCard info={ info_map[1] }/>*/}
            { character_cards }
          </div>
          <div class="col-4">
            <CharacterNav team={ teamList } navClick={ navClicked }/>
          </div>
        </div>
        
      </div>
    );
   
  }
  // return (<h1 class="title-header">Character Info Page in Progress...</h1>);
}

export default App;
