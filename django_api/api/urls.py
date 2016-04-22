from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers

from . import views

urlpatterns = [
    url(r'^bernie/$', views.bernie_list, name='tweets_list'),
    url(r'^hillary/$', views.hillary_list, name='tweets_list'),
    url(r'^trump/$', views.trump_list, name='tweets_list'),
    url(r'^cruz/$', views.cruz_list, name='tweets_list'),
    url(r'^democrat/$', views.democrat_list, name='tweets_list'),
    url(r'^republican/$', views.republican_list, name='tweets_list'),
]
