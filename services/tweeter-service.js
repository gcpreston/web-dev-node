const dao = require('../tweets/tweet-dao');

module.exports = (app) => {
  const findAllTweets = (req, res) =>
    dao
      .findAllTweets()
      .then(tweets => res.json(tweets));

  app.get('/api/tweets', findAllTweets);

  const postNewTweet = (req, res) => {
    const newTweet = {
      "topic": "Web Development",
      "userName": "ReactJS",
      "verified": false,
      "handle": "ReactJS",
      "time": "2h",
      "avatar-image": "../../../images/react.png",
      "logo-image": "../../../images/react.png",
      "stats": {
        "comments": 123,
        "retweets": 234,
        "likes": 345
      },
      ...req.body,
    }
    dao.createTweet(newTweet).then(insertedTweet => res.json(insertedTweet));
  }

  app.post('/api/tweets', postNewTweet);

  const deleteTweet = (req, res) => {
    const id = req.params['id'];
    dao.deleteTweet(id).then(status => res.sendStatus(status));
  }
  app.delete('/api/tweets/:id', deleteTweet);

  const likeTweet = (req, res) => {
    const id = req.params['id'];
    dao.findTweetById(id).then(tweet => {
      console.log('like tweet found tweet', tweet);

      let updatedFields = {};
      if (tweet.liked === true) {
        updatedFields = {
          stats: {
            ...tweet.stats,
            likes: tweet.stats.likes - 1
          },
          liked: false
        };
      } else {
        updatedFields = {
          stats: {
            ...tweet.stats,
            likes: tweet.stats.likes + 1
          },
          liked: true
        };
      }

      dao.updateTweet(id, updatedFields).then(updateRes => {
        console.log('update response', updateRes);
        return res.json(updateRes);
      });
    });
  }
  app.put('/api/tweets/:id/like', likeTweet);

};
