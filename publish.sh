#!/bin/bash

set -eu

dirname="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
views_dir="$dirname/views"
www_dir="$dirname/docs"

pushd $views_dir

ejs $views_dir/index.ejs -o $www_dir/index.html

ejs $views_dir/posts/2020-02-01-issues-running-headless-chrome-on-heroku/index.ejs -o $www_dir/posts/2020-02-01-issues-running-headless-chrome-on-heroku/index.html

ejs $views_dir/rpgen/index.ejs -o $www_dir/rpgen/index.html
ejs $views_dir/text2emoji/index.ejs -o $www_dir/text2emoji/index.html
ejs $views_dir/drawmoji/index.ejs -o $www_dir/drawmoji/index.html

ejs $views_dir/design/index.ejs -o $www_dir/design/index.html
ejs $views_dir/404.ejs -o $www_dir/404.html

popd
