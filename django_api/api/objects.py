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
        if 'anger' in attrs:
            self.anger = attrs['anger']
        if 'disgust' in attrs:
            self.disgust = attrs['disgust']
        if 'fear' in attrs:
            self.fear = attrs['fear']
        if 'joy' in attrs:
            self.joy = attrs['joy']
        if 'sadness' in attrs:
            self.sadness = attrs['sadness']
        if 'openness' in attrs:
            self.openness = attrs['openness']
        if 'conscientiousness' in attrs:
            self.conscientiousness = attrs['conscientiousness']
        if 'extraversion' in attrs:
            self.extraversion = attrs['extraversion']
        if 'agreeableness' in attrs:
            self.agreeableness = attrs['agreeableness']
        if 'range' in attrs:
            self.range = attrs['range']
        self.candidate = candidate
        self.created = created
        self.sentiment = sentiment
        self.text = text 
        self.user = user
        self.tid = tid
        self.anger = anger
        self.disgust = disgust
        self.fear = fear
        self.joy = joy
        self.sadness = sadness
        self.openness = openness
        self.conscientiousness = conscientiousness
        self.extraversion = extraversion
        self.agreeableness = agreeableness
        self.range = range

class AggregateObject(object):

    def __init__(self, subject, content, **attrs):
        if 'candidate' in attrs:
            self.candidate = attrs['candidate']
        if 'datetime_block' in attrs:
            self.candidate = attrs['datetime_block']
        if 'count_pos_sentiment' in attrs:
            self.candidate = attrs['count_pos_sentiment']
        if 'count_neg_sentiment' in attrs:
            self.candidate = attrs['count_neg_sentiment']
        if 'avg_pos_sentiment' in attrs:
            self.candidate = attrs['avg_pos_sentiment']
        if 'avg_neg_sentiment' in attrs:
            self.candidate = attrs['avg_neg_sentiment']
        self.candidate = candidate
        self.datetime_block = datetime_block
        self.count_pos_sentiment = count_pos_sentiment
        self.count_neg_sentiment = count_neg_sentiment
        self.avg_pos_sentiment = avg_pos_sentiment
        self.avg_neg_sentiment = avg_neg_sentiment

class WordObject(object):

    def __init__(self, subject, content, **attrs):
        if 'candidate' in attrs:
            self.candidate = attrs['candidate']
        if 'text' in attrs:
            self.text = attrs['text']
        if 'count' in attrs:
            self.candidate = attrs['count']
        if 'tf' in attrs:
            self.candidate = attrs['tf']
        self.candidate = candidate
        self.text = text
        self.count = count
        self.tf = tf
