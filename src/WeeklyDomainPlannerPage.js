import React from 'react';


// 0 = Mon, 1 = Tues, 2 = Wed, 3 = Thurs, 4 = Fri, 5 = Sat, 6 = Sun
const day_map = 
{
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
}

export default function PlannerPage(props)
{
    return(
        <div class="container-fluid px-0 planner-page">
            <div class="row planner-cols">
                <div class="col-md-1 week-col">
                    <h2>Sunday</h2>
                    <img className='tal-img' src='/images/Decarabian.png' alt='Decarabian Set'/>
                    <img className='tal-img' src='/images/Boreal.png' alt='Boreal Wolf Set'/>
                    <img className='tal-img' src='/images/Dandelion.png' alt='Dandelion Gladiator Set'/>
                    <img className='tal-img' src='/images/Guyun.png' alt='Guyun Set'/>
                    <img className='tal-img' src='/images/Elixir.png' alt='Mist Veiled Elixir Set'/>
                    <img className='tal-img' src='/images/Aerosiderite.png' alt='Aerosiderite Set'/>
                </div>
                <div class="col-md-1 week-col">
                    <h2>Monday</h2>
                    <img className='tal-img' src='/images/Decarabian.png' alt='Decarabian Set'/>
                    <img className='tal-img' src='/images/Guyun.png' alt='Guyun Set'/>
                </div>
                <div class="col-md-1 week-col">
                    <h2>Tuesday</h2>
                    <img className='tal-img' src='/images/Elixir.png' alt='Mist Veiled Elixir Set'/>
                </div>
                <div class="col-md-1 week-col">
                    <h2>Wednesday</h2>
                    <img className='tal-img' src='/images/Boreal.png' alt='Boreal Wolf Set'/>
                    <img className='tal-img' src='/images/Dandelion.png' alt='Dandelion Gladiator Set'/>
                    <img className='tal-img' src='/images/Aerosiderite.png' alt='Aerosiderite Set'/>
                </div>
                <div class="col-md-1 week-col">
                    <h2>Thursday</h2>
                    <img className='tal-img' src='/images/Decarabian.png' alt='Decarabian Set'/>
                    <img className='tal-img' src='/images/Guyun.png' alt='Guyun Set'/>
                </div>
                <div class="col-md-1 week-col">
                    <h2>Friday</h2>
                    <img className='tal-img' src='/images/Boreal.png' alt='Boreal Wolf Set'/>
                    <img className='tal-img' src='/images/Elixir.png' alt='Mist Veiled Elixir Set'/>
                </div>
                <div class="col-md-1 week-col">
                    <h2>Saturday</h2>
                    <img className='tal-img' src='/images/Dandelion.png' alt='Dandelion Gladiator Set'/>
                    <img className='tal-img' src='/images/Aerosiderite.png' alt='Aerosiderite Set'/>
                </div>
            </div>
        </div>
    );
}