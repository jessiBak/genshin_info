import React from 'react';
import { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import CharacterCard from './CharacterCard';

export default function CharacterBrowsePage(props)
{
    const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Xiao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
    const store = useStore();
    const [state, updateState] = useState({});
    store.subscribe(() => {updateState(store.getState())});
    const allData = store.getState().allData;
    console.log("allData in Chara-Browse: ", allData);
    console.log("allData's length: ", allData.length);
    let allCards = [];

    //const mapStateToProps = (state) => ({allData: state.allData});

    for(let i = 0; i < characterList.length; i++)
    {
        if(i === 0)
        {
            allCards.push(<div class="carousel-item col-md-4 active chara-browse-card"><CharacterCard info={ allData[characterList[i]] } /></div>);
        }
        else
        {
            allCards.push(<div class="carousel-item col-md-4 chara-browse-card"><CharacterCard info={ allData[characterList[i]] } /> </div>);
        }   
    }

    return(
        <div className="container-fluid chara-browse-page justify-content-center">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner row w-100 mx-auto">
                    { allCards }
                </div>
                <button class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                <span class="sr-only">Previous</span>
                </button>
                <button class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="false"></span>
                <span class="sr-only">Next</span> 
                </button>
            </div>
        </div>    
    );
}