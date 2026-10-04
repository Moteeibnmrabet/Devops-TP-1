FROM nginx:alpine

COPY motee-portfolio/ /usr/share/nginx/html/

EXPOSE 80