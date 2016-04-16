__author__ = 'tyler'

from config import CONSUMER_KEY, CONSUMER_SECRET, API_KEY, API_SECRET
from datetime import datetime
from logging.handlers import RotatingFileHandler
import logging
import json
import pykafka
import tweepy

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
fh = logging.FileHandler(__name__+'.log')
fh.setLevel(logging.WARNING)
logger.addHandler(fh)
logger.addHandler(RotatingFileHandler('hilldog.json', maxBytes=5*(10**6), backupCount=5))



class StreamListener(tweepy.StreamListener):

    def __init__(self, kafka_client):
        self.client = kafka_client
        super().__init__()


    def on_status(self, status):
        data = {}

        data['uid'] = status.user.screen_name
        data['tid'] = status.id_str
        data['created_at'] = str(status.created_at)
        data['text'] = status.text
        # client = pykafka.KafkaClient()
        # topic = client.topics['tweets']
        # with topic.get_producer() as prod:
        logger.debug(json.dumps(data))

    def on_error(self, status_code):
        logger.critical('Error: %s %s' % (status_code, datetime.now()))
        return False

    def on_timeout(self):
        import time
        time.sleep(60)

    def on_warning(self, notice):
        print(notice)
        try:
            if notice['percent_full'] >= 90:
                logger.critical('Fell behind at: %s' % datetime.now())
                return False
        except KeyError:
            logger.critical(notice['code'] + notice['message'] + str(datetime.now()))


class Streamer:

    def __init__(self, listener, filters):
        self.listener = listener
        self.filters = filters
        self.stream = None

    def _build_stream(self):
        auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(API_KEY, API_SECRET)
        self.stream = tweepy.Stream(auth=auth, listener=self.listener)


    def execute(self):
        self.stream.filter(track=self.filters, languages=['en'])




auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(API_KEY, API_SECRET)
stream = tweepy.Stream(auth=auth, listener=StreamListener(None))
stream.filter(track=['hillary', "hillary's" 'clinton', "clinton's"], languages=['en'])

