import random
import numpy
import sys
import csv

def split_data(filename):
	data = list(csv.reader(open(filename, 'r'))) #Reads in CSV file and returns 2d data array
	random.shuffle(data)
	value = int(numpy.floor(0.9*len(data)))
	train_data = data[:value]
	test_data = data[value:]
	train_data[0] = ['labels', 'user', 'text']
	test_data[0] = ['labels', 'user', 'text']
	csvWrite(train_data, filename, "train")
	csvWrite(test_data, filename, "test")

def csvWrite(data, filename, types):
	with open(types+'-'+filename, 'wb') as f: #Writes data to new file
	    writer = csv.writer(f)
	    writer.writerows(data)
	return types+'-'+filename #Return filename

def main(argv):
	split_data(argv[-1])

if __name__ == '__main__':
  main(sys.argv)