__author__ = 'tyler'

from interface import predictTweet
import json
import sys
import pyspark_cassandra

def clean_str(str):
    import re
    str=str+" "
    str=re.sub("http[^ ]*[\\\]","\\\\",str)                    #Remove hyperlinks
    str=re.sub("http[^ ]* "," ",str)                           #Remove hyperlinks
    str=str.replace('\\n',' ')
    arr=re.findall(r"\w+(?:[-']\w+)*|'|[:)-.(]+|\S\w*", str)   #Single punctuation mark is removed, smileys remain intact
    arr=[i for i in arr if len(i)>1 and i[0]!='@']             #Remove words starting with @ (Twitter mentions)
    arr=[i if i[0]!='#' else i[1:] for i in arr]               #Remove '#' from hashtags
    #arr=[i for i in arr if i!='http' and i!='com' and i!='org']
    res=" ".join(arr)
    return res.lower().strip()

fp, out = sys.argv[1].split(',')

sc = pyspark_cassandra.CassandraSparkContext()

data = sc.textFile(fp, 36)

clean_text = data.map(json.loads) \
                 .map(lambda x: (x, clean_str(x['text'])))

json_preds = clean_text.map(lambda x: (x[0], predictTweet(x[1])['pos'])) \
                       .map(json.dumps)

json_preds.saveAsTextFile(out)
