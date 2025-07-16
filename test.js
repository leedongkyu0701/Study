

개념	설명
복사 (객체 아니라면 그냥 주소값 새로생기면서 복사됌)
참조	그냥 주소만 복사, 아예 같은 객체를 가리킴 값바꾸면 다른것도 바뀜 
얕은 복사	1단계만 새 객체, 중첩 객체는 같은 참조
깊은 복사	모든 레벨의 객체가 새로운 복사본



🔍 이벤트 리스너에서 this, e.target, e.currentTarget의 차이점
<ul id="list">
  <li>🍎 Apple</li>
  <li>🍌 Banana</li>
  <li>🍇 Grape</li>
</ul>

<script>
  const list = document.getElementById("list");

  list.addEventListener("click", function (e) {
    console.log("this: ", this);
    console.log("e.target: ", e.target);
    console.log("e.currentTarget: ", e.currentTarget);
  });
</script>
🔍 이 상태에서 🍌을 클릭하면:
this 👉 <ul>

e.currentTarget 👉 <ul>

e.target 👉 <li>🍌 Banana</li>

✅ 각 항목 설명
🔸 this
function() {} 안에서만 유효

리스너가 연결된 요소를 가리킴

위 예시에서는 list.addEventListener에 연결되었으므로 this는 <ul>

🔸 e.target
실제 이벤트가 발생한 요소

위 예시에서는 <>를 클릭했으니 → e.target은 <li>🍌 Banana</li>

🔸 e.currentTarget
항상 이벤트 리스너가 바인딩된 요소

즉, 이 리스너가 걸린 대상이 뭔지를 항상 알려줌
target은 "누가 클릭됐는지",
currentTarget은 **"누가 이벤트를 듣고 있었는지"**를 알려줍니다.

대부분의 경우 this와 동일하지만, 화살표 함수를 쓰면 this가 바뀌므로 e.currentTarget이 더 안전함



 this가 window에서 다른 값으로 바뀌는 대표적인 상황들
상황	this가 가리키는 대상
1. 객체의 메서드 호출	✅ 그 객체
2. DOM 이벤트 핸들러 (function)	✅ 이벤트가 발생한 요소 (예: 버튼)
3. 생성자 함수 (new 키워드)	✅ 새로 생성된 인스턴스 객체
4. call / apply / bind 사용 시	✅ 명시적으로 지정한 값
5. 클래스 메서드 호출	✅ 인스턴스 (클래스 기반 객체)


상황	보통 쓰는 속성
입력 요소	e.target.value
체크박스/라디오	e.target.checked
셀렉트박스	e.target.value, e.target.selectedIndex
클릭된 요소 감지	e.target, e.target.tagName, e.target.classList
커스텀 속성(data-*)	e.target.dataset.속성이름
 (단, e.currentTarget을 쓰는 게 더 안전할 때 많음)



// promise && async/await
 function checkPassword(input) {
  return new Promise((resolve, reject) => {
    const realPassword = "1234";

    if (input === realPassword) {
      resolve("로그인 성공!");
    } else {
      reject("비밀번호가 틀렸습니다.");
    }
  });
}

// ✅ async/await 사용
async function runCheck(input) {
  try {
    const msg = await checkPassword(input);
    console.log("✅", msg);
  } catch (err) {
    console.error("❌", err);
  }
}

// 사용 예
runCheck("1234"); // 👉 로그인 성공!
runCheck("wrong"); // 👉 비밀번호가 틀렸습니다.



async function getWeather(city) {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=${city}`);
    const data = await res.json();
    console.log("🌤️ 날씨:", data);
  } catch (err) {
    console.error("❌ 에러 발생:", err);
  }
}

✅ 1. 기본 개념
● 배열 구조 분해
js
코드 복사
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a); // 1
console.log(b); // 2
➡️ 배열 요소들을 순서대로 꺼내서 변수에 저장

● 객체 구조 분해
js
코드 복사
const user = {
  name: '동규',
  age: 25,
};
const { name, age } = user;
console.log(name); // '동규'
console.log(age);  // 25
➡️ 객체의 키 이름으로 변수에 저장

✅ 2. 변수 이름 바꾸기 (객체)
js
코드 복사
const user = { name: '동규' };
const { name: userName } = user;
console.log(userName); // '동규'
➡️ user.name을 userName이라는 이름으로 꺼냄

✅ 3. 기본값 설정
값이 없을 경우 기본값으로 대체 가능:

● 배열
js
코드 복사
const [a = 1, b = 2] = [10];
console.log(a); // 10
console.log(b); // 2 (기본값)
● 객체
js
코드 복사
const { age = 20 } = {};
console.log(age); // 20 (기본값)