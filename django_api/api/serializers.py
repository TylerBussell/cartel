from rest_framework import serializers
from api.objects import TweetObject

from .models import *

class TweetSerializer(serializers.Serializer):
    candidate = serializers.CharField(required = True)
    created = serializers.DateTimeField(required = True)
    sentiment = serializers.IntegerField(required = True)
    text = serializers.CharField(required = True)

    def restore_object(self, attrs, instance = None):
        if instance is not None:
            instance.candidate = attrs.get('candidate', instance.candidate)
            instance.created = attrs.get('created', instance.created)
            instance.sentiment = attrs.get('sentiment', instance.sentiment)
            instance.text = attrs.get('text', instance.text)
        return TweetObject(**attrs)
