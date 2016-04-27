__author__ = 'tyler'



def spark_tokenize(tweet):
    import re
    import string
    from itertools import groupby
    from nltk.tokenize import word_tokenize
    from nltk.corpus import stopwords
    hash_ptn = re.compile(r'#([^\s]+)')
    other_ptn = re.compile(r'(www\d{0,3}\.[^\s]+)|(https?://[^\s]+))')
    punct = set(string.punctuation)
    stop = set(stopwords.words('english'))
    tokens = []
    text = hash_ptn.sub(r'\1', other_ptn.sub('', tweet))
    for token in word_tokenize(text):
        if token not in stop and token not in punct:
            tokens.append(''.join(''.join(s)[:2] for _, s in groupby(token)))
    return tokens