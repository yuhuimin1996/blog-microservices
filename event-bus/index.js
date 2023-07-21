const express = require ('express');
const bodyParser = require ('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Build a seperate DB for event-bus, storing all the events.
const events = [];

app.post('/events',(req,res)=>{ 
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events',event); //post service
    axios.post('http://comments-srv:4001/events',event); //comment service
    axios.post('http://query-srv:4002/events',event); //query service
    axios.post('http://moderation-srv:4003/events',event); //moderation service
    console.log()
 
    res.send({status:'OK'});
    
});


app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005,()=>{
    console.log('listening to port 4005');
});