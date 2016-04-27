__author__ = 'tyler'

import pyspark_cassandra
import json
import sys

def db_dict(d, sent, cand):
    d.update({'sentiment':sent, 'candidate':cand, 'user':d['uid']})
    return d

fp, candidate = sys.argv[1].split(',')

sc = pyspark_cassandra.CassandraSparkContext()

data = sc.textFile('/home/ubuntu/data/sent/{}'.format(fp), 16).distinct()

j_data = data.map(lambda x: json.loads(x))

out_data = j_data.map(lambda x: db_dict(x[0], x[1], candidate)) \
                 .saveToCassandra('db', candidate)