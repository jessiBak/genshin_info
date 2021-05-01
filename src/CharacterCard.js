import React from 'react';

export default function CharacterCard(props)
{
    return(
        <div className="card">
            <img className="card-img-top" src={ props.src } alt={ props.name }/>
            <div className="card-body">
                <h4>{ props.name }</h4>
                <p>Element: { props.element }</p>
                <p>Weapon: { props.weapon }</p>
            </div>
        </div>
    );
}
