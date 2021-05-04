import React from 'react';

export default function CharacterNav(props)
{
    const btns = [];
    for(let i = 0; i < props.team.length; i++)
    {
        let src = "/images/" + props.team[i] + ".png";
        btns.push(<button className="btn btn-secondary" value={ props.team[i] } key= { i + 1 } onClick={ props.navClick } ><img src={ src } alt={ props.team[i] } /></button>)
    }
    return(
        <div className="btn-group-vertical">
            { btns }
        </div>
    );
}