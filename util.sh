#!/bin/bash

# add your USER to 'group' array
# group[USER]="username"
# run 'echo ${USER}' to find your 'USER'
# use your ssh remote username as 'username'

declare -A group
group[gabriele]="gabriele.fulgaro"
group[mattia]="mattia.polverini"

# add your remote host
# hosts[USER]="host"
# use different host for performance
# http://www.informatica.unibo.it/it/servizi-informatici/accesso-da-remoto

declare -A hosts
hosts[gabriele]="hansel"
hosts[mattia]="marullo"



# don't touch from here

cd ${PWD}

username=${group[${USER}]}
site=${username}
hostname=@${hosts[${USER}]}.cs.unibo.it
login=${username}${hostname}
frontname=`grep -Po '"name": "\K[^"]+' package.json`
docname=documentation
backname=server
webdir=/home/web/${site}/html
dist=${PWD}/dist
frontdir=${dist}/${frontname}
docdir=${dist}/${docname}
backdir=${dist}/${backname}
sshctl=~/.ssh/ctl
sshopts="-C -o ControlPath=${sshctl}/%L-%r@%h:%p"



function help() {
	echo "Upload to a webspace front-end and/or back-end."
	echo ""
	echo "USAGE: util.sh OPTIONS [EXTRA]"
	echo "OPTIONS:"
	echo -e "\t -h \t show this"
	echo -e "\t -f \t front-end ('ng build' if not exist)"
	echo -e "\t -b \t back-end (make a symlink in dist if not exist)"
	echo "EXTRA:"
	echo -e "\t -c \t clean folder/folders on webspace"
	echo -e "\t -s \t site1826 (by default is your personal webspace)"
	echo -e "\t -k \t keep connection open (don't ask for password the next time)"
	echo ""
}

function error() {
	help
	echo "ERROR: ${BASH_LINENO}: $1"
	exit ${LINENO};
}



if [[ "${username}" == "" ]]; then
	error "you need to add ${USER} to 'group'!"
fi
if [[ "${hostname}" == "@.cs.unibo.it" ]]; then
	error "you need to add ${USER} to 'hosts'!"
fi



while getopts ":hfbcsk" opt; do
  case $opt in
    h)
    	help
    	exit 0
      ;;
    f)
    	front=1
      ;;
    b)
    	back=1
      ;;
    c)
    	clean=1
      ;;
    s)
    	site=site1826
    	webdir=/home/web/${site}/html
      ;;
    k)
    	keep=1
      ;;
    \?)
      error "Invalid option: -${OPTARG}"
      ;;
    # ~ :)
      # ~ echo "Option -${OPTARG} requires an argument."
      # ~ exit 1
      # ~ ;;
    # ~ *)
      # ~ echo "${opt} was triggered, Parameter: ${OPTARG}"
      # ~ ;;
  esac
done

if [[ ${OPTIND} -eq 1 ]]; then
	error "No options were passed!"
elif [[ "${front}" == "" ]] && [[ "${back}" == "" ]]; then
	error "few arguments"
fi



if [[ ${front} == 1 ]] && [ ! -d ${frontdir} ]; then
	${PWD}/node_modules/@angular/cli/bin/ng build
fi
if [[ ${front} == 1 ]] && [ ! -d ${docdir} ]; then
	ln -s ${PWD}/${docname} ${dist}
fi
if [[ ${back} == 1 ]] && [ ! -d ${backdir} ]; then
	ln -s ${PWD}/${backname} ${dist}
fi

if [ ! -d ${sshctl} ]; then
	mkdir -p ${sshctl}
fi

ssh -q -O check ${sshopts} ${login}
if [[ ${?} != 0 ]]; then
	ssh -nNf -o ControlMaster=yes ${sshopts} ${login}
fi

if [[ ${clean} == 1 ]]; then
	if [[ ${front} == 1 ]]; then
		ssh ${sshopts} ${login} "rm -rf ${webdir}/${frontname}"
		ssh ${sshopts} ${login} "rm -rf ${webdir}/${docname}"
	fi
	if [[ ${back} == 1 ]]; then
		ssh ${sshopts} ${login} "rm -rf ${webdir}/${backname}"
	fi
fi

if [[ ${front} == 1 ]]; then
	echo ""
	echo "FRONT-END:"
	chmod -R g+w ${frontdir}
	scp ${sshopts} -p -r ${frontdir} ${login}:${webdir}/${frontname}
	echo ""
	echo "DOCS:"
	ssh ${sshopts} ${login} "mkdir -p ${webdir}/${docname}"
	chmod -R g+w ${docdir}
	scp ${sshopts} -p -r ${docdir} ${login}:${webdir}/${docname}/docs
fi
if [[ ${back} == 1 ]]; then
	echo ""
	echo "BACK-END:"
	chmod -R g+w ${backdir}
	scp ${sshopts} -p -r ${backdir} ${login}:${webdir}/${backname}
	echo ""
	echo "WARNING: You have to run 'restart ${site}' on gocker."
fi

if [[ ${keep} != 1 ]]; then
	echo ""
	ssh -O stop ${sshopts} ${login}
fi
