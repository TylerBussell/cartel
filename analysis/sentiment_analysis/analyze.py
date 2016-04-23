__author__ = 'tyler'

import interface
import json
import argparse

def analyze(args):
    with open(args.input, 'r') as in_f, open(args.output, 'a') as out_f:
        for line in in_f:
            in_data = json.loads(line)
            sent = interface.predictTweet(in_data['text'])
            in_data['sentiment'] = sent['pos']
            json.dump(in_data, out_f)
            out_f.write('\n')

if __name__ == 'main':
    parser = argparse.ArgumentParser()
    parser.add_argument('input',
                        help='Full path to jsonl file')
    parser.add_argument('output',
                        help='Full path to output file')
    args = parser.parse_args()
    analyze(args)



