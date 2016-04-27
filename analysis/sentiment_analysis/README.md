CNN (Convolutional Neural Network) based text classifier, based off [this](http://arxiv.org/abs/1408.5882) and [this](https://github.com/flipkart-incubator/optimus), trained on 100k+ tweets with consistent accuracy of 84%.

# Overview

Convolutional Neural Networks (CNN) are biologically-inspired models gleaned from research on animal and human brain functions. We know the visual cortex contains a complex arrangement of cells. These cells are sensitive to small sub-regions of the visual field, called a receptive field. The sub-regions are tiled to cover the entire visual field. These cells act as local filters over the input space and are well-suited to exploit the strong spatially local correlation present in natural images. Additionally, two basic cell types have been identified: Simple cells respond maximally to specific edge-like patterns within their receptive field. Complex cells have larger receptive fields and are locally invariant to the exact position of the pattern.

Long Short Term Memory (LSTM) are a special kind of Neural Network (NN), capable of learning long-term dependencies. [LSTMs are explicitly designed to avoid the long-term dependency problem. Remembering information for long periods of time is practically their default behavior, not something they struggle to learn!](https://colah.github.io/posts/2015-08-Understanding-LSTMs/). Humans are able to retain information for long periods of time, and what oft happens with NNs is that an influx of new data changes the model so significantly that it essentially has a very short memory span (aka it'll forget history after a short while and solely believe new data, not unlike humans in certain aspects of life).

# Model
Download [this](https://www.dropbox.com/s/umhp88624tomkm6/third.p?dl=0) (~700MB) and place in sample folder.

# Requirements:

- `sudo apt-get install unzip curl git gcc g++ python2.7 python-virtualenv build-essential python-dev python-setuptools libatlas-dev libatlas3gf-base gfortran libblas-dev liblapack-dev python-numpy python-scipy python-matplotlib ipython ipython-notebook python-pandas python-sympy python-nose`
- `pip install -U numpy scipy scikit-learn nltk; pip install theano flask gunicorn pandas; pip install -r requirements.txt`. Your scipy installation might be janky on ubuntu, just follow the error messages and google.
- Run `./downloadWordVecs.sh` (1.5 GB)
- Ready to go!

# Usage
Training:

Please use theano flags to fast-run this on a GPU. Saves the planet and your hair. Just prepend your python command with something like: `THEANO_FLAGS=mode=FAST_RUN,device=gpu`

`python train.py <model config file path> <training data file path> <file path to store classifier model> <true/false(preprocessing flag)>`

Testing:

`python test.py <model file path> <testing file path> <folder to store detailed output analysis> <preprocess? (true/false)> <load word vectors? (true/false)>`

Usage:

`import interface`

`predictTweet(“I love Theano”)`

`predictList([“I love Theano”, “I hate Theano”])`

Note, you can change the model used within interface.py.
