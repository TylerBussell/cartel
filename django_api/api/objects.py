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
