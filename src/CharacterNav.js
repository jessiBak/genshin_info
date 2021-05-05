import React from 'react';

export default function CharacterNav(props)
{
    const btns = [];
    for(let i = 0; i < props.team.length; i++)
    {
        let src = "/images/" + props.team[i] + ".png";
        //console.log(`i = ${i}, props.team[i] = ${props.team[i]} `);
        btns.push(<button className="btn btn-secondary" id={props.team[i] + "-chara-nav-btn"} value={ props.team[i] } key= { i } onClick={ props.navClick } >
                    <img className="chara-nav-img" src={ src } alt={ props.team[i] } /></button>);
    }
    return(
        <div className="btn-group-vertical chara-nav">
            { btns }
        </div>
    );
}