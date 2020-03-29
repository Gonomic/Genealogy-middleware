docker run --rm --name GENMW01 -it -d -p 1002:1002 --mount type=bind,source="D:/frans/development/gen/genealogy-frontend/certs",target="/usr/src/app/config/ssl" fransdekkers/genmiddleware:1.0 
