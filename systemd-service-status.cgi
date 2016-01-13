#! /bin/bash

service="$(cat | tr -d '\n')";

generate-output(){
    { echo '{"Entries":['; sudo journalctl --output="json" --no-pager --unit "${service}" | head -n -1 | tail -n 50 | json_reformat -s | sed 's/^\s*$/,/g'; echo ']}'; } | json_reformat -m;
}

output="$(generate-output)";

echo "Content-Type: application/json";
echo "Content-Length: ${#output}";
echo "X-WebApp-Name: SystemD_Interface";
echo "X-WebApp-Author: Charles Lentz";
echo;
echo "${output}";
