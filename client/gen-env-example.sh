#!/bin/bash

# This script generates or updates a .env.example file based on the .env file.
# It replaces all values in .env with masked placeholders (**** for non-empty values,
# ******** for empty values) while preserving comments, empty lines, and grouping.
# If .env.example already exists, it will only append missing keys without modifying existing ones.

# Check if .env file exists
if [[ ! -f .env ]]; then
    echo ".env file not found!"
    exit 1
fi

# Create .env.example if it doesn't exist
touch .env.example

# Read existing keys from .env.example
declare example_keys=""
while IFS= read -r line || [[ -n "$line" ]]; do
    if [[ "$line" =~ ^([^=]+)= ]]; then
        example_keys+=" ${BASH_REMATCH[1]} "
    fi
done < .env.example

# Temporary file to store updated content
tmp_file=$(mktemp)

# Process each line in .env
while IFS= read -r line || [[ -n "$line" ]]; do
    # Preserve empty lines
    if [[ -z "$line" ]]; then
        echo "" >> "$tmp_file"
        continue
    fi

    # Preserve comments
    if [[ "$line" =~ ^# ]]; then
        echo "$line" >> "$tmp_file"
        continue
    fi

    key=$(echo "$line" | cut -d'=' -f1)
    value=$(echo "$line" | cut -d'=' -f2-)
    
    # Append missing keys to .env.example
    if [[ ! "$example_keys" =~ " $key " ]]; then
        if [[ -z "$value" ]]; then
            echo "$key=********" >> "$tmp_file"
        else
            echo "$key=****" >> "$tmp_file"
        fi
    else
        grep "^$key=" .env.example >> "$tmp_file"
    fi

done < .env

# Replace the old .env.example with the updated one
mv "$tmp_file" .env.example

echo ".env.example has been updated with missing keys while preserving grouping."