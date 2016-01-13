#! /bin/bash

input="$(cat)";

output="$(cat <<EOF
Enviroment Variables:
$(printenv | while read line; do printf '\t%s\n' "${line}"; done)

STDIN:
$(printf '\t')${input}

This concludes the output of this shell script.
EOF
)";

echo "Content-Type: text/plain";
echo "Content-Length: ${#output}";
echo;
echo "${output}";
