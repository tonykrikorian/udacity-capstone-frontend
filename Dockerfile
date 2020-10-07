#Stage build the application

FROM node:10.22.1 AS build
RUN mkdir /app
WORKDIR /app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ARG getlanguages
ARG urltranslate

# RUN echo "${getlanguages}"
# RUN echo "${urltranslate}"

ENV REACT_APP_GET_LANGUAGES=$getlanguages
ENV REACT_APP_TRANSLATE=$urltranslate

COPY . /app
RUN npm install --silent
RUN npm install react-scripts -g --silent
RUN npm run build

#Stage execute nginx
FROM nginx:1.19.2-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

