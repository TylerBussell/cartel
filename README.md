<p align="center">
  <img src="https://raw.githubusercontent.com/CUBigDataClass/cartel/master/web_frontend/app/img/readme.png">
</p>
# Twittical
[Website](http://ec2-52-39-21-222.us-west-2.compute.amazonaws.com:61621), [REST API] (http://ec2-52-37-162-218.us-west-2.compute.amazonaws.com:8888/api/) + [Endpoint] (https://github.com/CUBigDataClass/cartel/blob/master/django_api/api/urls.py)

We're currently going through a changed election cycle. There's an unprecedented ability to broadcast information to voters, and to organize. Candidates have learned to adapt, some better than others, to this new landscape. Wars are waged across the battlefields of the Internet and we chose to focus on the battle for Twitter. With the unprecedented ability to broadcast information, we've also gained the ability to crowdsource massive amounts of data as the Internet opened up the gates to a 2-way information highway. We collected millions of Tweets over the course of weeks and processed them to try and unlock this information.

---

# Results

With aggregate sentiment data of milions of tweets from every minute of every day of every week, we were able to reach a few conclusions. The insurgent campaigns of Bernie Sanders and Donald Trump have heavily relied on their Internet presence to capitalize on their momentum, as shown by the difference in tweet counts between them and their respective primary contenders whom rely on a traditional base of support (which has significant less internet representation). However, the average sentiment for both Trump and Sanders is primarily negative. Overall, negativity is the name of the game. From allegations of election fraud, deeply divisive statements, and inter-party friendly fire, we had about 4 negative tweets to 1 positive tweet.

The old adage that any publicity is good publicity seems to hold. The insurgence of both Bernie and Trump would've been considerably more difficult, if not impossible, in 2008's internet landscape (re: Ron Paul).

One takeaway that should be noted is that your sentiment analysis is only as good as your preprocessing and nowhere near human intuition. Whilst our sentiment analysis CNN model registered an average of 84% accuracy across 3 different test datasets, it was hard to attribute the sentiment to a specific candidate. Many tweets included were negative attacks towards other candidates, but were ultimately positive towards the candidate mentioned that we attributed it to. So whilst the tweet itself was a negative attack and would register as a negative tweet, it was positive in favour of our candidate. Humans themselves can only agree on sentiment 80% of time for precisely this case, as shown by several studies, so our creations are only as flawed as we are.

---
![alt text](https://raw.githubusercontent.com/CUBigDataClass/cartel/master/web_frontend/app/img/techstack.png "Twittical")

# How?

## Spark + GNIP

## Cassandra

## Django

## LSTM language model with CNN

## AWS

## AngularJS
