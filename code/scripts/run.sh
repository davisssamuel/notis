#! /bin/bash
source ${HOME}/.bashrc

cd /home/notis/Code/notis/code/frontend
export NODE_ENV=development
bun start
