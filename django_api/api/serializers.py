from rest_framework import serializers
from api.objects import CandidateObject

from .models import *

class CandidateSerializer(serializers.Serializer):
    candidate = serializers.CharField(required = True)
    created_at = serializers.DateTimeField(required = True)
    sentiment = serializers.FloatField(required = True)
    text = serializers.CharField(required = True)
    user = serializers.CharField(required = True)
    tid = serializers.CharField(required = True)

    def restore_object(self, attrs, instance = None):
        if instance is not None:
            instance.candidate = attrs.get('candidate', instance.candidate)
            instance.created_at = attrs.get('created_at', instance.created_at)
            instance.sentiment = attrs.get('sentiment', instance.sentiment)
            instance.text = attrs.get('text', instance.text)
            instance.user = attrs.get('user', instance.user)
            instance.tid = attrs.get('tid', instance.tid)
            instance.anger = attrs.get('anger', instance.anger)
            instance.disgust = attrs.get('disgust', instance.disgust)
            instance.fear = attrs.get('fear', instance.fear)
            instance.joy = attrs.get('joy', instance.joy)
            instance.sadness = attrs.get('sadness', instance.sadness)
            instance.openness = attrs.get('openness', instance.openness)
            instance.conscientiousness = attrs.get('conscientiousness', instance.conscientiousness)
            instance.extraversion = attrs.get('extraversion', instance.extraversion)
            instance.agreeableness = attrs.get('agreeableness', instance.agreeableness)
            instance.range = attrs.get('range', instance.range)
        return CandidateObject(**attrs)

class AggregateSerializer(serializers.Serializer):
    candidate = serializers.CharField(required = True)
    datetime_block = serializers.IntegerField(required = True)
    count_pos_sentiment = serializers.IntegerField(required = False)
    count_neg_sentiment = serializers.IntegerField(required = False)
    avg_pos_sentiment = serializers.FloatField(required = False)
    avg_neg_sentiment = serializers.FloatField(required = False)

    def restore_object(self, attrs, instance = None):
        if instance is not None:
            instance.candidate = attrs.get('candidate', instance.candidate)
            instance.datetime_block = attrs.get('datetime_block', instance.datetime_block)
            instance.count_pos_sentiment = attrs.get('count_pos_sentiment', instance.count_pos_sentiment)
            instance.count_neg_sentiment = attrs.get('count_neg_sentiment', instance.count_neg_sentiment)
            instance.avg_pos_sentiment = attrs.get('avg_pos_sentiment', instance.avg_pos_sentiment)
            instance.avg_neg_sentiment = attrs.get('avg_neg_sentiment', instance.avg_neg_sentiment)
        return AggregateObject(**attrs)

class WordSerializer(serializers.Serializer):
    candidate = serializers.CharField(required = True)
    text = serializers.CharField(required = True)
    count = serializers.IntegerField(required = False)
    tf = serializers.FloatField(required = False)

    def restore_object(self, attrs, instance = None):
        if instance is not None:
            instance.candidate = attrs.get('candidate', instance.candidate)
            instance.text = attrs.get('text', instance.text)
            instance.count = attrs.get('count', instance.count)
            instance.tf = attrs.get('tf', instance.tf)
        return WordObject(**attrs)