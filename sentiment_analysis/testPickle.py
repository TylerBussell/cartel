import pickle

from util import (load_data, dump_params)

# pickle_in = open("data/twitter.pkl","rb")
# example_dict = pickle.load(pickle_in)
# print(example_dict[3])

print load_data('data/twitter.pkl')[0]