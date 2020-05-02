#!/bin/bash
ANSIBLE_SSH_ARGS="-C -o ControlMaster=auto -o ControlPersist=60s -o ControlPath=/tmp/ans-%h-%r" ansible -vvvv -i servers all -m ping
