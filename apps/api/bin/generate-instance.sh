#!/usr/bin/env bash
nest g mo "$1" --no-spec
nest g co "$1" --no-spec
nest g s "$1" --no-spec
