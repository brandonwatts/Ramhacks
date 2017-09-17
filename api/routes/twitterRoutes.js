'use strict';
module.exports = function(app) {

  app
  .route('/tweets/:username')
  .get(function(req, res) {

    var Twit = require('twit')
    var config = require('/Users/brandonwatts/Desktop/TwitterAPIExample/config.js')
    var T = new Twit(config);
    var params = {
      q: req.params.username,
      lang: 'en',
      count: 100
    }

    T.get('search/tweets', params, searchedData);

    function searchedData(err, data, response) {
      if (err)
        res.send(err);
      res.json(data);
    }
  });

  app
  .route('/tone/:textArray')
  .get(function(req, res) {

    var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
    var tone_analyzer = new ToneAnalyzerV3({username: 'a093b58d-d57f-4d72-a22d-a55cdffe7f6c', password: '5K5Ty46HcoxD', version_date: '2016-05-19'});

    tone_analyzer.tone({
      text: req.params.textArray
    }, function(err, tone) {
      if (err)
        res.send(err);
      else
        res.send(JSON.stringify(tone, null, 2));
      }
    );
  });
}
