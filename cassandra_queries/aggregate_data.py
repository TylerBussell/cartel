import sys
from datetime import datetime, timedelta
from cassandra.cluster import Cluster

epoch = datetime.utcfromtimestamp(0)

def getRows(candidate, start_time, end_time):
    
    return session.execute('SELECT * FROM %s WHERE candidate=\'%s\' AND (created_at, sentiment, tid) >= (%s, 0, 0) AND created_at < %s ;' %\
     (candidate, candidate, str(int((start_time - epoch).total_seconds() * 1000.0)),\
    str(int((end_time - epoch).total_seconds() * 1000.0))))

def insertFromRows(index, candidate, rows):
    numRows = 0
    numPos = 0
    numNeg = 0
    sumPos = 0
    sumNeg = 0
    for row in rows:
        numRows += 1
        if row.sentiment > 0.5:
            numPos += 1
            sumPos += row.sentiment 
        else:
            numNeg += 1
            sumNeg += row.sentiment 
    avgPos = 0 if numPos == 0 else sumPos/numPos
    avgNeg = 0 if numNeg == 0 else sumNeg/numNeg
    return ('INSERT INTO %s (candidate,datetime_block,avg_neg_sentiment,avg_pos_sentiment,count_neg_sentiment,count_pos_sentiment) VALUES(\'%s\',%d,%f,%f,%d,%d)\n' %\
     ('aggregate', candidate, index, avgNeg, avgPos, numNeg, numPos))


def aggregate(index, end_time):
    start_time = end_time - timedelta(hours = 1)
    batch = 'BEGIN BATCH '
    batch += insertFromRows(index, 'bernie', getRows('bernie', start_time, end_time))
    batch += insertFromRows(index, 'cruz', getRows('cruz', start_time, end_time))
    batch += insertFromRows(index, 'hillary', getRows('hillary', start_time, end_time))
    batch += insertFromRows(index, 'trump', getRows('trump', start_time, end_time))
    batch += insertFromRows(index, 'republican', getRows('republican', start_time, end_time))
    batch += insertFromRows(index, 'democrat', getRows('democrat', start_time, end_time))
    batch += 'APPLY BATCH'
    session.execute(batch)

# argv[1] = cluster ip of one of the nodes
cluster = Cluster([sys.argv[1]])
# argv[2] = keyspace to use
session = cluster.connect(sys.argv[2])

index = 0
time = datetime(year = 2016, month = 4, day = 16)
time += timedelta(hours = 1)
now = datetime.utcnow()
timediff = now - time

while timediff.days >= 0 or timediff.seconds%3600 < 1:
    aggregate(index, time)
    index += 1
    time += timedelta(hours=1)
    now = datetime.utcnow()
    timediff = now - time


