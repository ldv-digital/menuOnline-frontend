
#!/bin/bash
set -e

echo "Deploying application ..."

ssh root@191.101.234.188 "cd menuOnline-frontend/ && git pull origin main && make build"