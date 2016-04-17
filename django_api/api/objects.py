import datetime

class TweetObject(object):                                                                                                                                                                  
    candidate = 'Default'
    created = datetime.datetime.now()
    sentiment = 0
    text = ''


    def __init__(self, subject, content, **attrs):
        if 'candidate' in attrs:
            self.candidate = attrs['candidate']
        if 'created' in attrs:
            self.created = attrs['created']
        if 'sentiment' in attrs:
            self.sentiment = attrs['sentiment']
        if 'text' in attrs:
            self.text = attrs['text']
        self.candidate = candidate
        self.created = created
        self.sentiment = sentiment
        self.text = text 