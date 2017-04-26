#!/bin/bash

if [ $KEYCLOAK_USER ] && [ $KEYCLOAK_PASSWORD ]; then
    keycloak/bin/add-user-keycloak.sh --user $KEYCLOAK_USER --password $KEYCLOAK_PASSWORD
fi

ARGS=$@
touch /opt/jboss/importlog
/opt/jboss/keycloak/bin/standalone.sh -Dkeycloak.migration.action=import -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=keycloak-realm-NodeStar.json -Dkeycloak.migration.strategy=OVERWRITE_EXISTING > importlog &
pid=$!

while sleep 2
do
    if fgrep --quiet "Import finished successfully" "importlog"
    then
        kill $pid
        break;
    fi
done

exec /opt/jboss/keycloak/bin/standalone.sh -b=0.0.0.0 $ARGS

exit $?
