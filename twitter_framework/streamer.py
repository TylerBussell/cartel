__author__ = 'tyler'

from config import CONSUMER_KEY, CONSUMER_SECRET, API_KEY, API_SECRET
from datetime import datetime
import logging
import tweepy

logger = logging.getLogger(__name__)
logger.setLevel(logging.WARNING)
logger.addHandler(logging.FileHandler(__name__+'.log'))


class StreamListener(tweepy.StreamListener):


    def on_status(self, status):
        data = {}

        data['uid'] = status.user.id_str
        data['tid'] = status.id_str
        data['time'] = status.created_at
        data['text'] = status.text

    def on_error(self, status_code):
        logger.critical('Error: %s %s' % (status_code, datetime.now()))
        return False

    def on_timeout(self):
        import time
        time.sleep(60)

    def on_warning(self, notice):
        try:
            if notice['percent_full'] >= 90:
                logger.critical('Fell behind at: %s' % datetime.now())
                return False
        except KeyError:
            logger.critical(notice['code'] + notice['message'] + str(datetime.now()))


class Streamer:


    def __init__(self, stream, producer):
        self.stream = stream
        self.producer = producer


# auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
# auth.set_access_token(API_KEY, API_SECRET)
# stream = tweepy.Stream(auth=auth, listener=StreamListener())

