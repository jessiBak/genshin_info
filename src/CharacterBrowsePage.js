import React from 'react';
import { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import CharacterCard from './CharacterCard';
import './CharacterBrowsePage.css';

export default function CharacterBrowsePage(props) {
    const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Xiao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
    const store = useStore();
    const [state, updateState] = useState({});
    store.subscribe(() => { updateState(store.getState()) });
    const allData = store.getState().allData;
    console.log("allData in Chara-Browse: ", allData);
    console.log("allData's length: ", allData.length);
    let allCards = [];

    for (let i = 0; i < characterList.length; i++) {
        allCards.push(
            <div className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                <CharacterCard info={allData[characterList[i]]} />
            </div>
        );
    }

    return (
        <div className="container-fluid chara-browse-page justify-content-center">
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {allCards}
                </div>
                <button className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </button>
                <button className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </button>
            </div>
        </div>
    );

}
