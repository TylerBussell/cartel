from django.db import models

# Create your models here.
# myapp/models.py

import uuid
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

class Tweet(Model):
    id = columns.UUID(primary_key = True, default=uuid.uuid4)
    candidate = columns.Text(required = True)
    created = columns.DateTime(required = True)
    sentiment = columns.Integer()
    text = columns.Text(required = True)