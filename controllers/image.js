// const Clarifai = require('clarifai')



// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id
const handleAPICall = (req, res) => {
  const PAT = 'myTokenHere';
  const USER_ID = 'clarifai';
  const APP_ID = 'main';
  const MODEL_ID = 'face-detection';
  let IMAGE_URL = req.body.input;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(res => res.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleAPICall: handleAPICall
}