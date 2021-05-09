import React from 'react';
import CharacterCard from './CharacterCard';

export default function CharacterBrowsePage(props)
{
    const characterList = ['Traveler (Anemo)', 'Traveler (Geo)', 'Zhongli', 'Hu Tao', 'Xiao', 'Qiqi', 'Keqing', 'Tartaglia', 'Diluc', 'Mona', 'Beidou', 'Xingqiu', 'Chongyun', 'Ningguang', 'Xiangling', 'Bennett', 'Fischl', 'Xinyan', 'Diona', 'Barbara'];
    const allData = props.allData;
    let allCards = [];

    for(let i = 0; i < characterList.length; i++)
    {
        if(i === 0)
        {
            allCards.push(<div class="carousel-item active"><CharacterCard info={allData[characterList[i]]} /></div>);
        }
        else
        {
            allCards.push(<div class="carousel-item"><CharacterCard info={allData[characterList[i]]} /> </div>);
        }   
    }

    return(
        <div className="container-fluid chara-browse-page">
            <div id="carouselExampleControls" class="carousel slide" data-mdb-ride="carousel">
                <div class="carousel-inner">
                    { allCards }
                </div>
                <button
                class="carousel-control-prev"
                type="button"
                data-mdb-target="#carouselExampleControls"
                data-mdb-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button
                class="carousel-control-next"
                type="button"
                data-mdb-target="#carouselExampleControls"
                data-mdb-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>    
    );
}