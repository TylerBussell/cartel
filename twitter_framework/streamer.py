__author__ = 'tyler'

from config import API_KEY, API_SECRET
import tweepy


class StreamListener(tweepy.StreamListener):

    def on_status(self, status):
        print(status)
        print(status.text)


if __name__ == "main":
    listener = StreamListener()
    auth = tweepy.AppAuthHandler(API_KEY, API_SECRET)
    stream = tweepy.Stream(auth=auth, listern=StreamListener())
    stream.filter(follow='_TsunamiSB')
