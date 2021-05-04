import React from 'react';

export default function CharacterCard(props)
{
    return(
        <div className="card flex-row">
            <img className="card-img-left chara-card-img" src={ props.info.img_src } alt={ props.info.name }/>
            <div className="card-body">
                <h4>{ props.info.name }</h4>
                <p>Element: { props.info.element }</p>
                <p>Weapon: { props.info.weapon }</p>
            </div>
        </div>
    );
}
