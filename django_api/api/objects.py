import datetime

class CandidateObject(object):                                                                                                                                                                  
    candidate = 'Default'
    created = datetime.datetime.now()
    sentiment = 0
    text = ''

    def __init__(self, subject, content, **attrs):
        if 'candidate' in attrs:
            self.candidate = attrs['candidate']
        if 'created_at' in attrs:
            self.created = attrs['created_at']
        if 'sentiment' in attrs:
            self.sentiment = attrs['sentiment']
        if 'text' in attrs:
            self.text = attrs['text']
        if 'user' in attrs:
            self.user = attrs['user']
        if 'tid' in attrs:
            self.tid = attrs['tid']
        self.candidate = candidate
        self.created = created
        self.sentiment = sentiment
        self.text = text 
        self.user = user
        self.tid = tid

