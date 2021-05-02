import React from 'react';

export default function CharacterButton(props)
{
    let src = "/images/" + props.name + ".png";
    let c_name = "card " + props.name + "-card";
    let b_name = "chara-btn-" + props.name;
    //console.log("c_name: ", c_name);
    return(
    <div class={ c_name } style={{width: "18rem"}} key={ props.key } id={ c_name }>
        <img class="card-img-top" src={ src } alt={ props.name }/>
        <div class="card-body">
          <h5 class="card-title">{ props.name }</h5>
          <button  class="btn btn-primary" id={ b_name } value={ props.name } c_name={ c_name } onClick={ props.onCharaClick }>Add to Team</button>
        </div>
    </div>
    );
}