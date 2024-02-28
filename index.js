const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');



const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.get('/', (request, response) => {
  response.send('hello world')
})


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
         }
    else if (agent.parameters.locationhk=="Tsing Yi" && agent.parameters.cuisine=="Korean") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: MeokBang Korean BBQ & BAR")
        agent.add("Address:Shop 4-6, G/F,Shop 119B, 1/F, Maritime Square 1, 33 Tsing King Road, Tsing Yi")
        agent.add("Price:$100-$200") 
         }
    else if (agent.parameters.locationhk=="Sha Tin" && agent.parameters.cuisine=="Japanese") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: Mi-Ne Sushi")
        agent.add("3/F, New Town Plaza Phase 3, 18 Sha Tin Centre Street, Sha Tin")
        agent.add("Price:$100-$200") 
         }
     else if (agent.parameters.locationhk=="Tsuen Wan" && agent.parameters.cuisine=="Taiwan") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: TeaWood")
        agent.add("Shop S7-8A, 2/F, Luk Yeung Galleria, 22-66 Wai Tsuen Road, Tsuen Wan")
        agent.add("Price:$51-100") 
         }
     else if (agent.parameters.locationhk=="Sha Tin" && agent.parameters.cuisine=="Taiwan") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: Din Tai Fung")
        agent.add(" Shop 166, 1/F., New Town Plaza Phase 1, 18 Sha Tin Centre Street, Sha Tin")
        agent.add("Price: $101-200") 
         }
     else if (agent.parameters.locationhk=="Tsuen Wan" && agent.parameters.cuisine=="Japanese") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: Toriyamana")
        agent.add("Shop 1025-1026, 1/F, Discovery Park, 398 Castle Peak Road, Tsuen Wan")
        agent.add("Price:$201-400") 
         }
      else if (agent.parameters.locationhk=="Mong Kok" && agent.parameters.cuisine=="Japanese") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: ISHINABE CAFE")
        agent.add("Shop D, G/F, Hung Kwong Building, 2A-2P Tung Choi Street, Mong Kok")
        agent.add("Price:$51-100") 
         }
       else if (agent.parameters.locationhk=="Mong Kok" && agent.parameters.cuisine=="Western") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: Double Cafe")
        agent.add("4/F, Ko's House, 577 Nathan Road, Mong Kok")
        agent.add("Price:$101-200") 
         }

     else if (agent.parameters.locationhk=="Sha Tin" && agent.parameters.cuisine=="Japanese") {  
        agent.add("Location is: " + agent.parameters.locationhk)
        agent.add("Chosen cuisine is: " +agent.parameters.cuisine)
        agent.add("Suggested restaurant: Mi-Ne Sushi")
        agent.add("3/F, New Town Plaza Phase 3, 18 Sha Tin Centre Street, Sha Tin")
        agent.add("Price:$100-$200") 
         }
      
    else {
        agent.add("No restaurant is suggested")
        agent.add("Please enter another cusine")
        }


    }
 

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("cuisineEnquiry", findLoc)

    agent.handleRequest(intentMap);
    

}

