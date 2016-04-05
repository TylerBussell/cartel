__author__ = 'tyler'


import re
from collections import OrderedDict
from itertools import groupby
from nltk.corpus import stopwords


class Preprocessor:


    def __init__(self, tokenizer=None, stemmer=None):
        from nltk.stem.snowball import EnglishStemmer
        from nltk.tokenize.casual import TweetTokenizer
        self.tokenizer = tokenizer or TweetTokenizer(preserve_case=False)
        self.stemmer = stemmer or EnglishStemmer()
        self.re_ptns = OrderedDict([
            ('URL',(re.compile(r'(www\d{0,3}\.[^\s]+) | (https?://[^\s]+)'), '')),
            ('AT', (re.compile(r'\.?@([^\s]+)'), r'\1')),
            ('HASH',(re.compile(r'#([^\s]+)'), r'\1')),
        ])
        self.stop_words = set(stopwords.words('english'))

    def process_tweet(self, tweet):
        removed_tweet = self._remove_all(tweet)
        tokens = self.tokenizer.tokenize(removed_tweet)
        stops_removed = filter(lambda x: x not in self.stop_words, tokens)
        return [self.stemmer.stem(token) for token in stops_removed]

    def _remove_all(self, tweet):
        for ptn, sub in self.re_ptns.values():
            tweet = ptn.sub(sub, tweet)
        return self._remove_repeats(tweet)

    def _remove_at(self, text):
        return self.re_ptns['AT'].sub(r'\1', text)

    def _remove_hash(self, text):
        return self.re_ptns['HASH'][0].sub(r'\1', text)

    def _remove_url(self, text):
        return self.re_ptns['URL'].sub('', text)

    def _remove_repeats(self, text):
        return ''.join(''.join(s)[:2] for _, s in groupby(text))