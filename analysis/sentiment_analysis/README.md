CNN (Convolutional Neural Network) based text classifier, based off [this](http://arxiv.org/abs/1408.5882) and [this](https://github.com/flipkart-incubator/optimus), trained on 100k+ tweets with consistent accuracy of 84%.

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
