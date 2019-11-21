# fedNewsPushServer

前端推送服务

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
yarn
yarn dev
open http://localhost:7001/
```

### Deploy

```bash
yarn --production
tar -zcvf ../release.tgz .

# 将压缩文件拷贝到服务器

# 启动
yarn start

# 停止
yarn stop
```

### Deploy Docker

```bash
git clone xxx

docker-compose up --build -d
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org
