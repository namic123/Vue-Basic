# JSON server
JSON server는 프론트엔드 개발자들이 백엔드 개발 없이도 REST API를 작성할 수 있게 해주는 툴이다.
Node.js를 기반으로 작동하며, JSON 파일을 사용하여 데이터를 저장한다.
이 도구는 개발 초기 단계에서 실제 서버 백엔드 없이도 API를 설계하고 테스트할 수 있게 해준다.

## JSON Server 특징
### [간편한 설치 및 설정]
* Node.js와 NPM이 설치되어 있다면, 몇줄의 명령어로 JSON Server를 설치하고 실행할 수 있다. 
  * npm install -g json-server -> 설치
  * json-server --watch db.json -> 실행
  * 이 명령어는 db.json 파일을 기반으로 한 서버를 시작하고 기본적으로 'localhost:3000'에서 접근할 수 있다.
  * posts, comments, profile 등의 경로로 HTTP 요청을 보내 데이터를 조회하거나 수정할 수 있다.
* 작은 규모 프로젝트나 개발 초기 단계에서 빠르게 API를 구축하고 테스트할 수 있다.
* REST API 모의: GET,POST,PUT,DELETE 등의 HTTP 요청 메서드를 지원하여, RESTful API를 모의할 수 있다.
* JSON파일을 사용하여 데이터를 저장하고 관리할 수 있고 이 파일은 서버가 재시작되더라도 유지된다.
* 사용자 정의 라우트를 설정햐여, 실제 백엔드 서버의 API 경로를 모방할 수 있다.
* 사용자 정의 미들웨어를 통해 요청과 응답을 조작할 수 있기 때문에 인증과 같은 추가적인 로직을 구현할 수 있다.