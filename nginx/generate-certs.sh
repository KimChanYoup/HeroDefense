#!/bin/bash
# Generate self-signed SSL certificate for development
# Run this script once before starting Docker Compose

CERT_DIR="$(dirname "$0")/certs"
mkdir -p "$CERT_DIR"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$CERT_DIR/key.pem" \
  -out "$CERT_DIR/cert.pem" \
  -subj "/C=KR/ST=Seoul/L=Seoul/O=42Seoul/CN=localhost"

echo "Certificates generated in $CERT_DIR"
echo "  cert.pem - Certificate"
echo "  key.pem  - Private key"
