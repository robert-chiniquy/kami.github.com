#!/bin/bash

find _source/images/ -name *.png -type f -print0 | xargs -0 optipng -o5
find _source/images/ -name "*.jp*g" -type f -print0 | xargs -0 jpegoptim --strip-all --overwrite
