RASP_IP="192.168.0.178" # ROUTER IP
# RASP_IP="10.3.141.1" # RASP WIFI IP

zip -r saqua-chips-backend.zip ../saqua-chips-backend
scp -i ~/.ssh/id_rsa ~/Projects/saqua-chips-backend/saqua-chips-backend.zip pi@$RASP_IP:
rm saqua-chips-backend.zip
ssh -i ~/.ssh/id_rsa pi@$RASP_IP <<'ENDSSH'
rm -rf saqua-chips-backend
unzip saqua-chips-backend.zip
rm saqua-chips-backend.zip

# bcrypt library only works if we install again, so we need delete it and dependencies.
rm -rf ~/saqua-chips-backend/node_modules/bcrypt
rm -rf ~/saqua-chips-backend/node_modules/node-pre-gyp
rm -rf ~/saqua-chips-backend/node_modules/.bin
npm install --prefix ~/saqua-chips-backend ~/saqua-chips-backend/scripts/bcrypt-1.0.3.tgz

forever stopall
forever start --spinSleepTime 5000 --sourceDir=/home/pi/saqua-chips-backend/ server.js
ENDSSH
