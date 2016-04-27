__author__ = 'tyler'

from datetime import datetime
from logging.handlers import RotatingFileHandler
import logging
import os
import json
from pykafka import KafkaClient
import tweepy

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
fh = logging.FileHandler(__name__+'.log')
fh.setLevel(logging.WARNING)
logger.addHandler(fh)
logger.addHandler(RotatingFileHandler('data/centipede.json', maxBytes=5*(10**8), backupCount=100))



class KafkaListener(tweepy.StreamListener):


    def __init__(self, kafka_topic):
        self.kafka_topic = kafka_topic
        super().__init__()

    def on_status(self, status):
        data = {
                'candidate':candidate
                'uid':status.user.screen_name,
                'tid': status.id_str,
                'created_at': str(status.created_at),
                'text': status.text
                }

        json_data = json.dumps(data)
        logger.debug(json_data)

        with self.kafka_topic.get_producer() as prod:
            prod.produce(bytes(json_data, 'utf-8'))

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


class Aggregator:


    def __init__(self, listener, filters, stream=None):
        self.listener = listener
        self.filters = filters
        self.stream = stream or self._build_stream()

    def _build_stream(self):
        auth = tweepy.OAuthHandler(os.getenv('CONSUMER_KEY2'), os.getenv('CONSUMER_SECRET2'))
        auth.set_access_token(os.getenv('API_KEY2'), os.getenv('API_SECRET2'))
        return tweepy.Stream(auth=auth, listener=self.listener)


    def execute(self):
        self.stream.filter(track=self.filters, languages=['en'])

