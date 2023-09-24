# Setting up a proxy server for Bun using [nginx](https://nginx.org/en/)

## Install nginx
Firstly you must ensure nginx is installed. Run this command to do so

```sudo apt install nginx```

## Use systemctl to run the bun react project
In order for a proxy server to effectively work, there must always be an instance of your Bun app running in the background. This can be done using .service files and systemctl on Ubuntu 22.

Firstly, create a bun react project

```
bun create react-app [name]
```

This should create a directory named whatever you put in `[name]`

Next, we need to create a bacj script file to run `bun start` in the proper directory so that our service can easity restart the app if needed. To do so:

```
nano run.sh
```

Paste the following code into th script file:

```bash
#! /bin/bash
source ${HOME}/.bashrc

cd /home/notis/Code/notis/code/frontend
export NODE_ENV=development
bun start
```

Next, create a .service file to always have the bun app running

```
sudo nano /lib/systemd/system/[service name].service
```

Here, you can replace `[service name]` with whatever you want your service to be called. In this example, we will call it `notis`

Copy the following lines into the file you just opened

```
[Unit]
Description=Notis Development Webserver
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=notis
ExecStart=[path/to/script]/run.sh

[Install]
WantedBy=multi-user.target
```

Note that you may have to change the `User` line to whatever user the Bun application is running on.

Also, `ExecStart` may need to be changed based on where your script is located. For this example, our `run.sh` script is located in `/home/notis/Code/notis/code/scripts/run.sh`

To start the service, run the following two commands to (1) enable the service, and (2) automatically start the service when the machine boots up:

```
sudo systemctl start notis
sudo systemctl enable notis
```

Check to make sure the service is running by typing:

```
sudo systemctl status notis
```

Which, if you were successful in the previous steps, should output:

```
● notis.service - Notis Development Webserver
     Loaded: loaded (/lib/systemd/system/notis.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2023-09-20 16:30:56 EDT; 11min ago
   Main PID: 33398 (run.sh)
      Tasks: 44 (limit: 19089)
     Memory: 341.5M
        CPU: 14.416s
     CGroup: /system.slice/notis.service
             ├─33398 /bin/bash /home/notis/Code/notis/code/scripts/run.sh
             ├─33399 "npm start" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
             ├─33415 sh -c "react-scripts start"
             ├─33416 node /home/notis/Code/notis/code/frontend/node_modules/.bin/react-scripts start
             └─33427 /usr/local/bin/node /home/notis/Code/notis/code/frontend/node_modules/react-scripts/scripts/start.js
```

NOTE: If you notice the webserver seems outdated, like you are making changes and they are not showing up, run:

```
sudo systemctl restart notis
```

# Use systemctl to set up a nginx proxy server

Assuming nginx is installed, create and edit the following .conf file:

```
sudo nano /etc/nginx/conf.d/notis.conf
```

Copy and paste the following lines into the file:

```
server {
    location / {
        proxy_pass http://localhost:3000/;
    }
}
```

Test the configuration file with:

```
sudo nginx -t
```

If all is well, this should be the output:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Similar ot before, you can start up the proxy server using systemctl. Run the following two commands:

```
sudo systemctl start nginx
sudo systemctl enable nginx
```

To ensure the service is up ad running, run:

```
sudo systemctl status nginx
```

The output should be something like:

```
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2023-09-20 14:12:58 EDT; 17min ago
       Docs: man:nginx(8)
    Process: 19201 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, s>
    Process: 19202 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/S>
   Main PID: 19203 (nginx)
      Tasks: 17 (limit: 19089)
     Memory: 13.6M
        CPU: 50ms
     CGroup: /system.slice/nginx.service
```

## Visit the server on your browser
Fint the ip address of your machine and visit:
```
http://[your ip]
```

For example:
[`http://163.11.236.128`](http://163.11.236.128)
