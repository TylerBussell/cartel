from django.db import models

# Create your models here.
# myapp/models.py

import uuid
import datetime
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

class Tweet(Model):
    candidate = columns.Text(required = True, primary_key = True)
    created_at = columns.Integer(required = True, primary_key = True)
    sentiment = columns.Float()
    text = columns.Text(required = True)
    user = columns.Text(required = False)
    tid = columns.Text(required = False)
