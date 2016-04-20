from collections import OrderedDict
import json
import sys
import numpy
from cnn_text_trainer.rw.datasets import clean_str
import pickle


# config variables
model      = "sample/third.p"
preprocess = True
load_word_vecs = True

def predictTweet(string):
    tweet=string.lower()
    if model not in models:
        print "Model not in memory: ", model
        print "Loading model"
        models[model]=pickle.load(open(model,"rb"))
        if(load_word_vecs):
            print "Adding wordvecs"
            models[model].add_global_word_vecs(wordvecs)
        print "Done"

    if preprocess == True:
        tweet = clean_str(tweet)

    [y_pred,prob_pred] = models[model].classify([{'text':tweet}])
    labels = models[model].labels
    label_to_prob={}
    for i in range(len(labels)):
        if(isinstance(prob_pred[0][i], numpy.float32) or isinstance(prob_pred[0][i], numpy.float64)):
            label_to_prob[labels[i]]=prob_pred[0][i].item()
        else:
            label_to_prob[labels[i]] = prob_pred[0][i]
    return label_to_prob

def predictList(tweetList):
    probList = []
    if model not in models:
        print "Model not in memory: ", model
        print "Loading model"
        models[model]=pickle.load(open(model,"rb"))
        if(load_word_vecs):
            print "Adding wordvecs"
            models[model].add_global_word_vecs(wordvecs)
        print "Done"

    if preprocess == True:
        for tweet in tweetList:
            tweet = clean_str(tweet.lower())
    for tweet in tweetList:
        [y_pred,prob_pred] = models[model].classify([{'text':tweet}])
        labels = models[model].labels
        label_to_prob={}
        for i in range(len(labels)):
            if(isinstance(prob_pred[0][i], numpy.float32) or isinstance(prob_pred[0][i], numpy.float64)):
                label_to_prob[labels[i]]=prob_pred[0][i].item()
            else:
                label_to_prob[labels[i]] = prob_pred[0][i]
        probList.append(label_to_prob)

    return probList

class LimitedSizeDict(OrderedDict):
  def __init__(self, *args, **kwds):
    self.size_limit = kwds.pop("size_limit", None)
    OrderedDict.__init__(self, *args, **kwds)
    self._check_size_limit()

  def __setitem__(self, key, value):
    OrderedDict.__setitem__(self, key, value)
    self._check_size_limit()

  def _check_size_limit(self):
    if self.size_limit is not None:
      while len(self) > self.size_limit:
        self.popitem(last=False)
#In memory dictionary which will load all the models lazily
models=LimitedSizeDict(size_limit=10)
#In memory dictionary which will load all the word vectors lazily
wordvecs={}
