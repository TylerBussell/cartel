from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers

from . import views

urlpatterns = [
    url(r'^tweets/bernie/$', views.bernie_list, name='tweets_list'),
    url(r'^tweets/cruz/$', views.cruz_list, name='tweets_list'),
    url(r'^tweets/hillary/$', views.hillary_list, name='tweets_list'),
    url(r'^tweets/trump/$', views.trump_list, name='tweets_list'),
    url(r'^tweets/democrat/$', views.democrat_list, name='tweets_list'),
    url(r'^tweets/republican/$', views.republican_list, name='tweets_list'),
    url(r'^aggregate/cruz/$', views.aggregate_cruz, name='aggregate_list'),
    url(r'^aggregate/bernie/$', views.aggregate_bernie, name='aggregate_list'),
    url(r'^aggregate/hillary/$', views.aggregate_hillary, name='aggregate_list'),
    url(r'^aggregate/trump/$', views.aggregate_trump, name='aggregate_list'),
    url(r'^aggregate/democrat/$', views.aggregate_democrat, name='aggregate_list'),
    url(r'^aggregate/republican/$', views.aggregate_republican, name='aggregate_list'),
    url(r'^aggregate/all/$', views.aggregate_all, name='aggregate_list'),
    url(r'^words/bernie/$', views.words_bernie, name='words_list'),
    url(r'^words/cruz/$', views.words_cruz, name='words_list'),
    url(r'^words/hillary/$', views.words_hillary, name='words_list'),
    url(r'^words/trump/$', views.words_trump, name='words_list'),
    url(r'^words/democrat/$', views.words_democrat, name='words_list'),
    url(r'^words/republican/$', views.words_republican, name='words_list'),
    url(r'^words/all/$', views.words_all, name='words_list'),
]
