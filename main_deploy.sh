
#!/bin/bash
echo "Deploying application ..."

sudo ssh root@191.101.234.188 "cd menuOnline-frontend/ && git pull origin main && make build"