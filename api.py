import flask
from flask import request, jsonify, render_template, json, make_response
from flask_cors import CORS
from datetime import date
from data import characters

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app, support_credentials=True)

# 0 = Mon, 1 = Tues, 2 = Wed, 3 = Thurs, 4 = Fri, 5 = Sat, 6 = Sun
talent_times = {
    'Freedom': [0, 3, 6],
    'Resistance': [2, 4, 6],
    'Ballad': [2, 5, 6],
    'Diligence': [1, 4, 6],
    'Prosperity': [0, 3, 6],
    'Gold': [2, 5, 6]
}

# function to tell if a character's talent acsension materials are available today
def talent_avail(char_name):
    tal_type = characters[char_name]['talent_ascension_costs']['from_domains'][0].split(' ')[2]
    #print(f"A talent material needed is: {tal_type}.")
    if date.today().weekday() in talent_times[tal_type]:
        return True
    else:
        return False
#add talent_avail_today info to each char dict
for k, v in characters.items():
    if isinstance(v, dict):
        v['talent_avail_today'] = talent_avail(k)
    #print(item.items())
    #characters[item] = characters[item] | {'talent_avail_today': talent_avail(item)}

days_map = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
}

#Home page
@app.route('/', methods=['GET'])
def home():
    #return "<h1>Genshin Impact API</h1><p>This is an API for getting character, talent, and weapon ascension material info.</p>"
    return "Genshin Info"

#function that returns info for all characters 
@app.route('/characters/all', methods=['GET'])
def character():
    return jsonify(characters)

#function that returns info for a specified character 
@app.route('/characters/<name>', methods=['GET'])
def all_characters(name):
    response = characters[name]
    #print(response)
    return jsonify(response)

#function that returns info for all characters with available talent materials
@app.route('/characters/today', methods=['GET'])
def today():
    avail_today = {}
    for k, v in characters.items():
        if v['talent_avail_today']:
            avail_today[k] = v
    return avail_today

#function that returns info for all characters in a given team
@app.route('/characters/team', methods=['GET', 'POST'])
def team(input_team):
    avail_today = {}
    for k, v in characters.items():
        if v['talent_avail_today'] and k in input_team:
            avail_today[k] = v
    return avail_today

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
if __name__=="__main__":
    app.run(
        debug=True
    )
