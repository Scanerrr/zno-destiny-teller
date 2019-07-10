#!/usr/bin/env bash

curl -X POST -H "Content-Type: application/json" 127.0.0.1:8080/bot -d '{ "command": "hello" }'