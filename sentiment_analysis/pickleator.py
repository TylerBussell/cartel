import pickle
import csv

data = list(csv.reader(open('./training_set.csv', 'r')))
dict = {}
for x in data:
	dict[x[5]] = x[0]
