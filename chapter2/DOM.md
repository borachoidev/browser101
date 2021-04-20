# DOM이란?

`문서 객체 모델(The Document Object Model)`은 HTML, XML 문서의 프로그래밍 interface 이다. DOM은 문서의 구조화된 표현(structured representation)을 제공하며 <u>프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공</u>하여 그들이 문서 구조, 스타일, 내용 등을 변경할 수 있게 돕는다.

`Node` Object는 `EventTarget` Object를 상속받기 때문에 HTML의 모든 요소들에서 이벤트가 발생할 수 있다.
브리우저가 웹페이지(HTML 파일)을 한 줄 한 줄 읽으면서(파싱) `DOM트리`로 변환한다.  
Document Ojbect Model의 트리로 변환하여 브라우저가 이해할 수 있도록 자신들만의 오브젝트로 만든다.

# 브라우저 콘솔에서 웹페이지 요소 분석

크롬 개발자도구에서 `Elements`의 html 요소를 클릭하고 `console` 탭에 `$0`을 입력하면 선택한 DOM요소를 확인 할 수 있다.
다양한 DOM API를 통해 요소의 부모, 형제, 자식 노드 관계등을 확인할 수 있다.
