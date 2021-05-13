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

export default function PlannerPage()
{
    return(
        <div class="container planner-page">
            <div class="row planner-cols">
                <div class="col-md-1">Sunday</div>
                <div class="col-md-1">Monday</div>
                <div class="col-md-1">Tuesday</div>
                <div class="col-md-1">Wednesday</div>
                <div class="col-md-1">Thursday</div>
                <div class="col-md-1">Friday</div>
                <div class="col-md-1">Saturday</div>
            </div>
        </div>
    );
}