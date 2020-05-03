#!/bin/bash
# Add the New Relic Infrastructure Agent gpg key \

curl -s https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | sudo apt-key add - && \

\

# Create a configuration file and add your license key \

echo "license_key: eeebb0de3479880a3f6bb31c003a9565aa80NRAL" | sudo tee -a /etc/newrelic-infra.yml && \

\

# Create the agent’s yum repository \

printf "deb [arch=amd64] https://download.newrelic.com/infrastructure_agent/linux/apt bionic main" | sudo tee -a /etc/apt/sources.list.d/newrelic-infra.list && \

\

# Update your apt cache \

sudo apt-get update && \

\

# Run the installation script \

sudo apt-get install newrelic-infra -y