from django.db import models

# Create your models here.
# myapp/models.py

import uuid
import datetime
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

class Tweet(Model):
    created = columns.DateTime(required = True, primary_key = True, default = datetime.datetime.now())
    sentiment = columns.Float()
    candidate = columns.Text(required = True)
    text = columns.Text(required = True)