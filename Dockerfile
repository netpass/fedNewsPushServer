FROM node:12.13.0-alpine

# 设置时区为上海时间
RUN apk add --no-cache tzdata && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

# 创建app目录
RUN rm -rf /usr/src/node-app/fednewspush-server
RUN mkdir -p /usr/src/node-app/fednewspush-server
# 设置工作目录
WORKDIR /usr/src/node-app/fednewspush-server
COPY package.json yarn.lock /usr/src/node-app/fednewspush-server/

RUN yarn --production

COPY . /usr/src/node-app/fednewspush-server

EXPOSE 7001
CMD ["yarn", "docker:start"]