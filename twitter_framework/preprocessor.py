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

def remove_hash(self, text):
    return self.re_ptns['HASH'][0].sub(r'\1', text)

def remove_url(self, text):
    return self.re_ptns['URL'].sub('', text)

def remove_repeats(self, text):
    return ''.join(''.join(s)[:2] for _, s in groupby(text))