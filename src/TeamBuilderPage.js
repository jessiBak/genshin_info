import React from 'react';
import { useState } from 'react';
import { useStore } from 'react-redux';
import CharacterCard from './CharacterCard';
import CharacterNav from './CharacterNav';
import CharacterButton from './CharacterButton';

export default function TeamBuildPage(props)
{
    //const allData = props.allData;
    const store = useStore();
    const [state, updateState] = useState({});
    store.subscribe(() => {updateState(store.getState())});
    const teamList = store.getState().teamList;
    const teamSubmitted = store.getState().teamSubmitted;
    const currentCharacter = store.getState().currentCharacter;
    const allData = store.getState().allData;

    function addCharacter(character)
    {
        return {
            type: 'teamList/addCharacter',
            payload: character
        };
    }

    function removeCharacter(character)
    {
        return {
            type: 'teamList/removeCharacter',
            payload: character
        };
    }

    function submittedTeam()
    {
        return { type: 'teamSubmitted/toggleSubmitted' }
    }

    function changeCurrentCharacter(character)
    {
        return {
            type: 'currentCharacter/changeCurrentCharacter',
            payload: character
        }
    }

    const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Xiao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];

    function onCharaButtonClick(e)
    {
        let id = "chara-btn-" + e.target.value;
        var elem = document.getElementById(id);
        if(teamList.length < 4 && !teamList.includes(e.target.value))
        {
            store.dispatch(addCharacter(e.target.value));
            document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.borderRadius = "7px";
            document.getElementsByClassName(e.target.getAttribute('c_name'))[0].style.boxShadow = " 0 0 10px #9ecaed";
            if (elem.innerHTML === "Add to Team") 
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
                store.dispatch(removeCharacter(e.target.value));
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

    function teamSubmitClicked()
    {
        if(teamList.length > 0)
        {
            store.dispatch(submittedTeam());
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
        store.dispatch(changeCurrentCharacter(e.currentTarget.value));
    }

    const character_btns = [];
    for(let i = 0; i < characterList.length; i++)
    {
        character_btns.push((<CharacterButton name={ characterList[i] } onCharaClick={ onCharaButtonClick } key={ i }/>))
    }
    
    if(!teamSubmitted)
    {
        return(
            <div class="container-fluid team-page text-center">
                <h1 class="title-header">Genshin Info</h1>
                <div class="row row-cols-4 chara-btns">
                { character_btns }
                </div>
                <button class="btn btn-success" onClick = { teamSubmitClicked }>Get Team Info</button>
            </div>
        );
    } 
    else
    {
        if(currentCharacter === "")
        {
            store.dispatch(changeCurrentCharacter(teamList[0]));
        }
        console.log("currentCharacter: ", currentCharacter);
        console.log("allData[currentCharacter]: ", allData[currentCharacter]);
        return(
            <div class="container-fluid info-page text-center">
                <h1 class="title-header2">Genshin Info</h1>
                <div class="row justify-content-center">
                <div class="col-7 chara-card-outer-div">
                    {<CharacterCard info={ allData[currentCharacter] }/>}
                </div>
                <div class="col-2">
                    <CharacterNav team={ teamList } navClick={ navClicked } />
                </div>
                </div>
            </div>
        ); 
    }
}