#! /bin/bash

#   I'm sorry. I'm so very sorry. This thing is a trainwreck and I don't deserve to be allowed to touch a keyboard. I know. 
systemctlOutput="$(systemctl list-units --all --no-legend --no-pager)";
readyToParse="$(echo "${systemctlOutput}" | sed -r -e 's/^(\S?\s*\S+)\s+(\S+)\s+(\S+)\s+(\S+)\s+(\S+.*)/\1\x1e\2\x1e\3\x1e\4\x1e\5\x1e/g')";
fieldTypes=("unit" "load" "active" "sub" "description");
newline=$'\n';
fieldsToJSON(){
    data="$(cat)";
    i=0;
    while read -d $'\x1e' field; do 
        key="${fieldTypes[${i}]}";
        key="${key//\\/\\\\}"; key="${key//\"/\\\"}";
        field="${field//\\/\\\\}"; field="${field//\"/\\\"}";
        [[ ${i} == 0 ]] && printf '\t{\n\t\t"%s":"%s",\n\t\t"%s":"%s",\n\t\t"%s":"%s",\n' "id" "systemd/${field##*.}/${field}" "leaf" "true" "text" "${field}"
        case ${i} in 
            4)  printf '\t\t"%s":"%s"' "${key}" "${field}"; ;;
            0)  printf '\t\t"%s":"%s",\n' "unitType" "${field##*.}"; ;;
            *)  printf '\t\t"%s":"%s",\n' "${key}" "${field}"; ;;
        esac
        [[ ${i} == 4 ]] && printf '\n\t},'
        i=$[${i}+1];
    done <<<"${data}"; 
}
linesToJSON(){
    while read line; do 
        printf '\n';
        echo "${line}" | fieldsToJSON
    done <<<"${readyToParse}"
}
fix-and-minify(){
    jsonOut="$(linesToJSON)";
    echo -n "[${newline}${jsonOut:0:-1}${newline}]" | json_reformat -m | sed -r -e 's/\[\{/[\n{/g' -e 's/\]\}/]\n}/g' -e 's/\},/&\n/g';
}
main(){
    printf '[';
    allNodes="$(fix-and-minify)";
    automountNodes="$(echo "${allNodes}" | grep 'systemd/automount')";
    deviceNodes="$(echo "${allNodes}" | grep 'systemd/device')";
    mountNodes="$(echo "${allNodes}" | grep 'systemd/mount')";
    pathNodes="$(echo "${allNodes}" | grep 'systemd/path')";
    scopeNodes="$(echo "${allNodes}" | grep 'systemd/scope')";
    serviceNodes="$(echo "${allNodes}" | grep 'systemd/service')";
    sliceNodes="$(echo "${allNodes}" | grep 'systemd/slice')";
    socketNodes="$(echo "${allNodes}" | grep 'systemd/socket')";
    swapNodes="$(echo "${allNodes}" | grep 'systemd/swap')";
    targetNodes="$(echo "${allNodes}" | grep 'systemd/target')";
    timerNodes="$(echo "${allNodes}" | grep 'systemd/timer')";
    
    cat <<EOF 

	{
		"id":"systemd/automount",
		"cls":"folder",
		"text":"automount",
		"children":[
${automountNodes:0:-1}
]
	},
	{
		"id":"systemd/device",
		"cls":"folder",
		"text":"device",
		"children":[
${deviceNodes:0:-1}
]
	},
	{
		"id":"systemd/mount",
		"cls":"folder",
		"text":"mount",
		"children":[
${mountNodes:0:-1}
]
	},
	{
		"id":"systemd/path",
		"cls":"folder",
		"text":"path",
		"children":[
${pathNodes:0:-1}
]
	},
	{
		"id":"systemd/scope",
		"cls":"folder",
		"text":"scope",
		"children":[
${scopeNodes:0:-1}
]
	},
	{
		"id":"systemd/service",
		"cls":"folder",
		"text":"service",
		"children":[
${serviceNodes:0:-1}
]
	},
	{
		"id":"systemd/slice",
		"cls":"folder",
		"text":"slice",
		"children":[
${sliceNodes:0:-1}
]
	},
	{
		"id":"systemd/socket",
		"cls":"folder",
		"text":"socket",
		"children":[
${socketNodes:0:-1}
]
	},
	{
		"id":"systemd/swap",
		"cls":"folder",
		"text":"swap",
		"children":[
${swapNodes:0:-1}
]
	},
	{
		"id":"systemd/target",
		"cls":"folder",
		"text":"target",
		"children":[
${targetNodes:0:-1}
]
	},
	{
		"id":"systemd/timer",
		"cls":"folder",
		"text":"timer",
		"children":[
${timerNodes:0:-1}
]
	}
EOF
    
    printf '\n]';
}

output="$(main)";
output="$(echo "${output}" | json_reformat)";

echo "Content-Type: application/json";
echo "Content-Length: ${#output}";
echo;
echo "${output}";
