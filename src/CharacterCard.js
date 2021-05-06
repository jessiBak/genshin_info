import React from 'react';

export default function CharacterCard(props)
{
    console.log("props.info: ", props.info);
    return(
        <div className="card flex-row chara-card-start">
            <div className="chara-card-img-div">
                <img className="card-img-left chara-card-img" src={ props.info.img_src } alt={ props.info.name }/>
            </div>
            <div className="card-body chara-card-body">
                <h4>{ props.info.name }</h4>
                <p>Element: { props.info.element }</p>
                <p>Weapon: { props.info.weapon }</p>
                <DropdownList name="Character Asension Costs" list={ props.info.char_ascension_costs } />
                <br/>
                <DropdownList name="Talent Ascension Materials (From Domains)" list={props.info.talent_ascension_costs.from_domains } />
                <br/>
                <DropdownList name="Talent Ascension Materials (From Common Enemies)" list={props.info.talent_ascension_costs.from_enemies } />
                <br/>
                <DropdownList name="Talent Ascension Materials (From Weekly Bosses)" list={[props.info.talent_ascension_costs.from_boss_fights] } />
                <br/>
                <p>Character Ascension Materials Available Today? { String(props.info.talent_avail_today).charAt(0).toUpperCase() + String(props.info.talent_avail_today).slice(1) }</p>
            </div>
        </div>
    );
}

function DropdownList(props)
{
    let lst = [];
    for(let i = 0; i < props.list.length; i++)
    {
        lst.push((<a class="dropdown-item" href="#">{ String(props.list[i]) }</a>));
    }
    return(
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle drop-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { props.name }
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                { lst }
            </div>
        </div>
    );
}