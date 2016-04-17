from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from api.models import *
from api.serializers import *
from rest_framework.response import Response
from rest_framework import viewsets, status


@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def tweets_list(request):                                                                                                                                                           
    if request.method == 'GET':
        tweets = Tweet.objects.all()
        serializer = TweetSerializer(tweets, many=True)                                                                                                                                      
        return Response(serializer.data)
    elif request.method == 'POST':
        tweet = Tweet()
        serializer = TweetSerializer(data=request.DATA)
        if serializer.is_valid():
            tweet.candidate = serializer.data['candidate']
            tweet.created = serializer.data['created']
            tweet.sentiment = serializer.data['sentiment']
            tweet.text = serializer.data['text']
            tweet.save()
            return Response(
                status=status.HTTP_201_CREATED
            )