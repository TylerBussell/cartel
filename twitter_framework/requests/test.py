__author__ = 'tyler'

from config import API_KEY, API_SECRET
import tweepy


auth = tweepy.AppAuthHandler(API_KEY, API_SECRET)
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)


def search_tweets(query, lang='en', **kwargs):
    search_results = api.search(query,lang, kwargs)
