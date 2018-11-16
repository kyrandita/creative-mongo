var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost/storyDB', {useNewUrlParser: true});

var StorySchema = mongoose.Schema({
  parent_id: String,
  content: String,
}, { _id: true });

var Story = mongoose.model('Comment', StorySchema);

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', () => {
  console.log('Connected');
});

router.get('/', (req, res, next) => {
  console.log('GET stories');
  Story.find((err, commentList) => {
    if (err) return console.error(err);
    res.json(commentList);
  });
});

router.post('/', (req, res, next) => {
  const comment = new Story(req.body);
  console.log(comment);
  comment.save((err, post) => {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.post('/branch', (req, res, next) => {
  const story = new Story(req.body);
  console.log(story);

  story.save((err, post) => {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

// router.delete('/', (req, res, next) => {
//   Story.deleteMany({}, (err) => {
//     if (err) return console.error(err);
//     res.sendStatus(200);
//   }).remove();
// });

module.exports = router;
