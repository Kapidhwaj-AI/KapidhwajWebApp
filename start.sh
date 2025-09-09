#!/bin/bash  
  
# Load NVM and use the correct Node version  
export NVM_DIR="/root/.nvm"  
source "$NVM_DIR/nvm.sh"  
  
cd /root/KapidhwajWebApp  
PORT=3001 npm run start  
