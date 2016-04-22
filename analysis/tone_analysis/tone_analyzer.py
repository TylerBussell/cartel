__author__ = 'tyler'

import json
import os
from watson_developer_cloud import ToneAnalyzerV3Beta


def analyze_tone(file_name):
    tone_analyzer = ToneAnalyzerV3Beta(username=os.getenv('TONE_USER'),
                                       password=os.getenv('TONE_PASS'),
                                       version='2016-02-11')

    with open(file_name, 'r') as f:
        for line in f:
            data = json.loads(line)



print(json.dumps(tone_analyzer.tone(text='I am very happy'), indent=2))
