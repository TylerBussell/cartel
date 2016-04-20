from django.conf.urls import patterns, include, url
from django.contrib import admin
from rest_framework import routers

from . import views

urlpatterns = [
    url(r'^bernie/$', views.bernie_list, name='tweets_list')
]
