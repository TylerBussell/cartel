__author__ = 'tyler'


import re

from itertools import groupby
from nltk.corpus import stopwords
from nltk.stem.snowball import EnglishStemmer
from nltk.tokenize.casual import TweetTokenizer


_url_ptn = re.compile(r'(www\d{0,3}\.[^\s]+)|(https?://[^\s]+)')
_at_ptn = re.compile(r'\.?@([^\s]+)')
_hash_ptn = re.compile(r'#([^\s]+)')
_stop_words = set(stopwords.words('english'))
_tokenizer = TweetTokenizer(preserve_case=False)



def remove_all(tweet):
    return _url_ptn.sub('', _hash_ptn.sub(r'\1', _at_ptn.sub(r'\1', tweet)))

def remove_at(text):
    return _at_ptn.sub(r'\1', text)

def remove_hash(text):
    return _hash_ptn.sub(r'\1', text)

def remove_url(text):
    return _url_ptn.sub('', text)

def remove_repeats(text):
    return ''.join(''.join(s)[:2] for _, s in groupby(text))