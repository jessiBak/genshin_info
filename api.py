import flask
from flask import request, jsonify, render_template, json, make_response
from flask_cors import CORS
from datetime import date
from data import characters, artifacts

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
        tal_type = characters[k]['talent_ascension_costs']['from_domains'][0].split(' ')[2]
        v['talent_avail_days'] = {tal_type : talent_times[tal_type]}
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
    return "Genshin Info\nOptions:\n/characters/all\n/characters/[NAME]\n/characters/today"

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

@app.route('/artifacts', methods=['GET'])
def artifacts():
    return jsonify(artifacts)


app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
if __name__=="__main__":
    app.run(
        debug=True
    )
