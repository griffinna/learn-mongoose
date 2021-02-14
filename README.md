# learn-mongoose

## NoSQL vs SQL
|SQL (MySQL)|NoSQL (몽고디비)|
|---|---|
규칙에 맞는 데이터 입력 | 자유로운 데이터 입력
테이블 간 JOIN 지원 | 컬렉션 간 JOIN 미지원
안정성, 일관성 | 확장성, 가용성
테이블 | 컬렉션
로우 | 도큐먼트
컬럼 | 필드
----
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
---
# CRUD 작업
컬렉션에 컬럼을 정의하지 않아도 되므로 컬렉션에 아무 데이터나 넣을 수 있음 (장점)  
무엇이 들어올지 모름 (단점)
1. Create (생성)
>db.컬렉션명.save(다큐먼트)
```console
> use nodejs;
switched to db nodejs
> db.users.save({name: 'rio', age: 30, married: false, comment: 'hello', createAt: new Date() });
WriteResult({ "nInserted" : 1 })
> db.users.save({name: 'griffin', age: 32, married: true, comment: 'hi hello', createAt: new Date() });
WriteResult({ "nInserted" : 1 })

> db.users.find({name: 'rio'}, {_id:1});
{ "_id" : ObjectId("6027596465b144f31540b875") }

> db.comments.save({commenter: ObjectId('6027596465b144f31540b875'), comment: 'comment by rio', createdAt: new Date()});
WriteResult({ "nInserted" : 1 })
```
2. Read (조회)
- 전체 조회
```console
> db.users.find({});
{ "_id" : ObjectId("6027596465b144f31540b875"), "name" : "rio", "age" : 30, "married" : false, "comment" : "hello", "createdAt" : ISODate("2021-02-13T04:45:24.003Z") }
{ "_id" : ObjectId("6027596965b144f31540b876"), "name" : "griffin", "age" : 32, "married" : true, "comment" : "hi hello", "createdAt" : ISODate("2021-02-13T04:45:29.971Z") }
```
- 특정 필드 조회
> 1 또는 true 로 표시한 필드만 가져옴
```console
> db.users.find({}, {_id: 0, name: 1, married: 1});
{ "name" : "rio", "married" : false }
{ "name" : "griffin", "married" : true }
```
- 조건 넣어서 조회
> 첫 번째 인수 객체에 조건 기입

|$gt|$gte| $lt| $lte| $ne| $or| $in|
|---|---|---|---|---|---|---|
|초과|이상|미만|이하|같지않음|또는|배열요소중 하나|
 
```console
> db.users.find({age: {$gt:30}, married: true}, {_id:0, name: 1, age: 1});
{ "name" : "griffin", "age" : 32 }

> db.users.find({$or: [{age: {$gt:30}}, {married: false}]}, {_id: 0, name: 1, age: 1});
{ "name" : "rio", "age" : 30 }
{ "name" : "griffin", "age" : 32 }
```

- 정렬
> .sort()  
-1 : 내림차순  
1 : 오름차순
```console
> db.users.find({}, {_id: 0, name: 1, age: 1}).sort({age:-1});
{ "name" : "griffin", "age" : 32 }
{ "name" : "rio", "age" : 30 }
```

- limit
```console
> db.users.find({}, {_id: 0, name: 1, age: 1}).sort({age:-1}).limit(1);
{ "name" : "griffin", "age" : 32 }
```
- skip
```console
> db.users.find({}, {_id: 0, name: 1, age: 1}).sort({age:-1}).limit(1).skip(1);
{ "name" : "rio", "age" : 30 }
```

3. Update (수정)
> $set  
이 연산자를 사용하지 않고 일반 객체를 넣으면 통째로 update 됨
```console
> db.users.update({ name: 'rio'}, { $set: {comment: 'hello update commnet!'}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```