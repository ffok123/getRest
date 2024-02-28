const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');

app.get('/', (req, res) => {
  res.send('hello world')
})

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response) => {

    dialogflowFulfillment(request, response)

})

app.listen(port, () =>{

    console.log(`Listening on port ${port}`)

})

const dialogflowFulfillment = (request, response) => {

    const agent = new WebhookClient({request, response});


    function sayHello(agent) {
        agent.add("Hi, Welcome student")
    }
    function findLoc(agent) {   

   if(agent.parameters.locationhk=="Central" && agent.parameters.cuisine=="Japanese") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: Tokyo Milk Cheese Factory")
        agent.add("Address:Shop 4-6, G/F, Western Market, 323 Des Voeux Road Central")
        agent.add("Price:$51-$100") 
        agent.add("Do you like this restaurant (Yes/No)?") }
    else if (agent.parameters.locationhk=="Tsing Yi" && agent.parameters.cuisine=="Korean") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: MeokBang Korean BBQ & BAR")
        agent.add("Address:Shop 4-6, G/F,Shop 119B, 1/F, Maritime Square 1, 33 Tsing King Road, Tsing Yi")
        agent.add("Price:$100-$200") 
        agent.add("Do you like this restaurant (Yes/No?)") }
    else if (agent.parameters.locationhk=="Sha Tin" && agent.parameters.cuisine=="Japanese") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: Mi-Ne Sushi")
        agent.add("3/F, New Town Plaza Phase 3, 18 Sha Tin Centre Street, Sha Tin")
        agent.add("Price:$100-$200") 
        agent.add("Do you like this restaurant (Yes/No?)") }
    else {
        agent.add("No restaurant is suggested")
        agent.add("Please enter another cusine")
        }


    }
 

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("locationEnquiry", findLoc)

    agent.handleRequest(intentMap);
    

}

