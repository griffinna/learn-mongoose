# learn-mongoose

## mongodb 설치
```console
╰─$ brew tap mongodb/brew
╰─$ brew install mongodb-community
```
## mongodb 실행
```console
╰─$ brew services start mongodb-community   
==> Successfully started `mongodb-community` (label: homebrew.mxcl.mongodb-community)

╰─$ mongo
MongoDB shell version v4.4.3
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
...
> use admin
switched to db admin
> db.createUser({ user: 'root', pwd: '****', roles: ['root']})
Successfully added user: { "user" : "root", "roles" : [ "root" ] }
```

## mongodb 인증사용
1. mongodb 종료
```console
╰─$ brew services stop mongodb-community
Stopping `mongodb-community`... (might take a while)
==> Successfully stopped `mongodb-community` (label: homebrew.mxcl.mongodb-community)
```
2. /usr/local/etc/mongod.conf 에 security 추가
```
security:
  authorization: enabled 
```
3. mongodb 실행 후 접속
```console
╰─$ brew services start mongodb-community
╰─$ mongo admin -u [이름] -p [비밀번호]
```