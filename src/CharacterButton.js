import React from 'react';

export default function CharacterButton(props)
{
    let src = "/images/" + props.name + ".png";
    console.log(src);
    return(
    <div class="card" style={{width: "18rem"}} key={ props.key }>
        <img class="card-img-top" src={ src } alt={ props.name }/>
        <div class="card-body">
          <h5 class="card-title">{ props.name }</h5>
          <button  class="btn btn-primary" value = { props.name } onClick= { props.onCharaClick }>Add to Team</button>
        </div>
    </div>
    );
}