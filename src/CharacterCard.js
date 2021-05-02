import React from 'react';

export default function CharacterCard(props)
{
    return(
        <div className="card flex-row">
            <img className="card-img-left chara-card-img" src={ props.src } alt={ props.name }/>
            <div className="card-body">
                <h4>{ props.name }</h4>
                <p>Element: { props.element }</p>
                <p>Weapon: { props.weapon }</p>
            </div>
        </div>
    );
}
