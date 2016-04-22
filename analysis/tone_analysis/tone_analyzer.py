__author__ = 'tyler'

import json
import os
from watson_developer_cloud import ToneAnalyzerV3Beta


def analyze_tone(candidate, in_fn, out_fn):
    tone_analyzer = ToneAnalyzerV3Beta(username=os.getenv('TONE_USER'),
                                       password=os.getenv('TONE_PASS'),
                                       version='2016-02-11')

    with open(in_fn, 'r') as in_f, open(out_fn, 'a') as out_f:
        for i, line in enumerate(in_f):
            try:
                out_data = {'candidate':candidate, 'sentiment':-1.0}
                in_data = json.loads(line)
                tone_data = tone_analyzer.tone(text=in_data['text'])
                emotion = tone_data['document_tone']['tone_categories'][0]['tones']
                # writing = tone_data['document_tone']['tone_categories'][1]['tones']
                social = tone_data['document_tone']['tone_categories'][2]['tones']

                for e in emotion:
                    out_data[e['tone_name'].lower()] = e['score']
                for s in social:
                    out_data[s['tone_name'].lower()] = s['score']

                out_data.update(in_data)
                out_data['user'] = out_data.pop('uid')
                out_data['range'] = out_data.pop('emotional range')
                json.dump(out_data, out_f)
                out_f.write('\n')
            except Exception as e:
                print(e.args, i)


analyze_tone('trump', '/home/ubuntu/centipede.json.1', '/home/ubuntu/tone_test_file')

















