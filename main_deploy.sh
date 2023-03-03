
#!/bin/bash
set -e

echo "Deploying application ..."

# ssh root@191.101.234.188 "cd menuOnline-frontend/ && git pull origin main && make build"


mkdir /home/$USER/.ssh
cd /home/$USER/.ssh

ls

echo -e  ${{ secrets.ftp_host }} >> id_rsa_teste

 ssh root@191.101.234.188 "cd menuOnline-frontend/ && git pull origin main && make build"