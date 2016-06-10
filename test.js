// respond to post calls from facebook
app.post('/webhook/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;

    if (event.message && event.message.text) {
      var location = event.message.text;
      var witAIEndpoint = 'https://api.wit.ai/message?v=20141022&q=' + location;
      request({
        url: witAIEndpoint,
        json: true,
        headers: {
          'Authorization: Bearer <YOUR TOKEN HERE>'
        }
      }, function(error, response, body) {
        try {
          var firstOutcome = body.outcomes.pop();
          var entities = firstOutcome.entities;
          var location = entities.location.pop().value;
          var weatherEndpoint = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + location + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
          request({
            url: weatherEndpoint,
            json: true
          }, function(error, response, body) {
            try {
              var condition = body.query.results.channel.item.condition;
              sendTextMessage(sender, "Today is " + condition.temp + " and " + condition.text + " in " + location);
            } catch(err) {
              console.error('error caught', err);
              sendTextMessage(sender, "There was an error.");
            }
          });
        } catch(err) {
          console.error('error caught', err);
          sendTextMessage(sender, "There was an error.");
        }
      });
    }
  }
  res.sendStatus(200);
});
