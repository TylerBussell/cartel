from django.db import models

# Create your models here.
# myapp/models.py

import uuid
import datetime
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

class Candidate(Model):

    __abstract__ = True

    candidate = columns.Text(required=True, primary_key=True)
    created_at = columns.DateTime(required=True, primary_key=True)
    sentiment = columns.Float(required=True, primary_key=True)
    tid = columns.BigInt(required=True, primary_key=True)
    text = columns.Text(required=True)
    user = columns.Text(required=False)
    anger = columns.Float(required=False)
    disgust = columns.Float(required=False)
    fear = columns.Float(required=False)
    joy = columns.Float(required=False)
    sadness = columns.Float(required=False)
    openness = columns.Float(required=False)
    conscientiousness = columns.Float(required=False)
    extraversion = columns.Float(required=False)
    agreeableness = columns.Float(required=False)
    range = columns.Float(required=False)


class Bernie(Candidate):
    __table_name__ = 'bernie'

class Cruz(Candidate):
    __table_name__ = 'cruz'

class Hillary(Candidate):
    __table_name__ = 'hillary'

class Trump(Candidate):
    __table_name__ = 'trump'

class Dem(Candidate):
    __table_name__ = 'democrat'

class Rep(Candidate):
    __table_name__ = 'republican'

class Aggregate(Model):
    __table_name__ = 'aggregate'

    candidate = columns.Text(required=True, primary_key = True)
    datetime_block = columns.Integer(required=True, primary_key = True)
    count_pos_sentiment = columns.Integer(required=False)
    count_neg_sentiment = columns.Integer(required=False)
    avg_pos_sentiment = columns.Float(required=False)
    avg_neg_sentiment = columns.Float(required=False)

