from flask import Flask, request
from flask import make_response
from flask import jsonify

app = Flask(__name__)


# default route
@app.route('/')
def hello_world(
):  # this is the home page function that generates the page code
    return "Hello world! Florence Fok!"


@app.route('/getRest', methods=['POST'])
def getRest():
    req = request.get_json(silent=True, force=True)

    query_result = req.get('queryResult')

    locationhk = (query_result.get('parameters').get('locationhk'))
    cuisine = (query_result.get('parameters').get('cuisine'))

    print('Chosen locationhk: ', locationhk)
    print('Chosen cuisine: ', cuisine)

    if (locationhk == "Sha Tin" and cuisine == "Japanese"):
        result = "Japanese food in Shatin"
    elif (locationhk == "Sha Tin" and cuisine == "Taiwan"):
        result = "Taiwan food in Shatin"
    elif (locationhk == "Tsuen Wan" and cuisine == "Taiwan"):
        result = "Taiwan food in Tsuen wan"
    elif (locationhk == "Tsuen Wan" and cuisine == "Japanese"):
        result = "Japanese food in Tsuen Wan"
    else:
        result = "No restaurant is suggested"

    return {"fulfillmentText": 'You choose ' + result, "source": "webhookdata"}


# function for responses
def results():
    # build a request object
    req = request.get_json(force=True)
    #fetch action from json
    action = req.get('queryResult').get('action')
    if action == 'cuisineEnquiry':
        res = restQuery(req)
    return {"fulfillmentText": res, "source": "webhookdata"}


@app.route('/restQuery', methods=['POST'])
def restQuery():
    req = request.get_json(silent=True, force=True)

    query_result = req.get('queryResult')

    locationhk = (query_result.get('parameters').get('locationhk'))
    cuisine = (query_result.get('parameters').get('cuisine'))

    print('Chosen locationhk: ', locationhk)
    print('Chosen cuisine: ', cuisine)

    if (locationhk == "Sha Tin" and cuisine == "Japanese"):
        result = "Suggested restaurant: Waki Shokudo;| Address: Shop 35, G/F, Garden Rivera, 20-30 Tai Chung Kiu Road, Sha Tin; | Price range is: $101-200"
    elif (locationhk == "Sha Tin" and cuisine == "Taiwan"):
        result = "Suggested restaurant: Din Tai Fung; |  Address: Shop 166, 1/F., New Town Plaza Phase 1, 18 Sha Tin Centre Street, Sha Tin; | Price range is: $101-200"
    elif (locationhk == "Tsuen Wan" and cuisine == "Taiwan"):
        result = "Suggested restaurant: TeaWood;|  Address: Shop S7-8A, 2/F, Luk Yeung Galleria, 22-66 Wai Tsuen Road, Tsuen Wan;  | Price Range is: $51-100"
    elif (locationhk == "Tsuen Wan" and cuisine == "Japanese"):
        result = "Suggested restaurant: Toriyamana; | Address: Shop 1025-1026, 1/F, Discovery Park, 398 Castle Peak Road, Tsuen Wan;  | Price range is: $201-400"
        
    elif (locationhk == "Central" and cuisine == "Japanese"):
        result = "Suggested restaurant: Sushi Kumo; | Address: G/F, Tak Woo House, 17-19 D'aguilar Street, Central;  | Price range is: $201-400"
    elif (locationhk == "Central" and cuisine == "Western"):
        result = "Suggested restaurant: Ivan The Kozak; | Address: 1/F, Parekh House, 63 Wyndham Street, Central;  | Price range is: $201-400"
    elif (locationhk == "Mong Kok" and cuisine == "Western"):
        result = "Suggested restaurant: Double Cafe; | Address: 4/F, Ko's House, 577 Nathan Road, Mong Kok;  | Price range is: $101-200"
    elif (locationhk == "Mong Kok" and cuisine == "Japanese"):
        result = "Suggested restaurant: ISHINABE CAFE; | Address: Shop D, G/F, Hung Kwong Building, 2A-2P Tung Choi Street, Mong Kok;  | Price range is: $51-100"  
    else:
        result = "No restaurant is suggested"

    return {"fulfillmentText": '' + result,"source": "webhookdata"}


@app.route('/webhook', methods=['POST'])
def webhook():
    # return response

    return make_response(jsonify(results()))


if __name__ == '__main__':
    app.run(host='0.0.0.0',
            port=8080)  # This line is required to run Flask on repl.it
