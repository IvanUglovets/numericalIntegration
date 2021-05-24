const left = document.getElementById("left");
const right = document.getElementById("right");
const step = document.getElementById("step");
const integralRectangle = document.getElementById("content_rectangle");
const integralTrap = document.getElementById("content_trap");
const integralParabol = document.getElementById("content_parabol");
const btnRectangle = document.getElementById("btn_rectangle");
const btnTrap = document.getElementById("btn_trap");
const btnParabol = document.getElementById("btn_parabol");
const calculateTools = document.querySelector(".title__input");
const calculateList = document.querySelector(".calculate__list");
const linkUp = document.querySelector(".link__up");
const delta = document.querySelector(".delta");
document.getElementsByClassName;
window.addEventListener("scroll", () => {
  if (this.scrollY > 100) {
    linkUp.classList.add("link__up-active");
  } else {
    linkUp.classList.remove("link__up-active");
  }
});

function takeAwayMath() {
  let math_methods = Object.getOwnPropertyNames(Math);
  for (let i in math_methods) {
    this[math_methods[i]] = Math[math_methods[i]];
  }
}

//Метод ЦП
const centralRectangle = () => {
  let x = [];
  const a = Number(left.value.trim());
  const b = Number(right.value.trim());
  let N = Number(step.value.trim());
  const eps = Number(delta.value.trim());
  takeAwayMath();
  function F(x) {
    let func = document.getElementById("func").value;
    let expr = eval(func);
    return expr;
  }
  function calculate(F, a, b, N) {
    let sum = 0;
    let h = (b - a) / N;
    for (let i = 1; i <= N; i++) {
      x[i] = a + i * h;
      sum += F(x[i] - h / 2);
    }
    return h * sum;
  }

  function absDelta() {
    let resultBack, resultNext;
    resultBack = calculate(F, a, b, N);
    do {
      resultNext = resultBack;
      N = N * 2;
      resultBack = calculate(F, a, b, N);
    } while (Math.abs(resultBack - resultNext) > eps);
    return [resultBack, Math.abs(resultBack - resultNext)];
  }

  const result = absDelta();
  integralRectangle.innerHTML = `Метод ЦП:  ${result[0].toFixed(
    8
  )} Погрешность: ${result[1].toFixed(8)}`;
};
//Метод трапеций
const methodTrap = () => {
  let x = [];
  const a = Number(left.value.trim());
  const b = Number(right.value.trim());
  let N = Number(step.value.trim());
  const eps = Number(delta.value.trim());
  takeAwayMath();
  function F(x) {
    let func = document.getElementById("func").value;
    let expr = eval(func);
    return expr;
  }

  function calculate(F, a, b, N) {
    let sum = 0;
    let h = (b - a) / N;
    for (let i = 0; i < N; i++) {
      x[i] = a + i * h;
      sum += ((F(a + h * i) + F(a + h * (i + 1))) / 2) * h;
    }
    return sum;
  }

  function absDelta() {
    let resultBack, resultNext;
    resultBack = calculate(F, a, b, N);
    do {
      resultNext = resultBack;
      N = N * 2;
      resultBack = calculate(F, a, b, N);
    } while (Math.abs(resultBack - resultNext) > eps);
    return [resultBack, Math.abs(resultBack - resultNext)];
  }

  const result = absDelta();

  integralTrap.innerHTML = `Метод Трапеций:  ${result[0].toFixed(
    8
  )} Погрешность: ${result[1].toFixed(8)}`;
};

//Метод Симпсона
const methodParabol = () => {
  let x = [];
  const a = Number(left.value.trim());
  const b = Number(right.value.trim());
  let N = Number(step.value.trim());
  const eps = Number(delta.value.trim());
  takeAwayMath();
  function F(x) {
    let func = document.getElementById("func").value;
    let expr = eval(func);
    return expr;
  }
  function calculate(F, a, b, N) {
    let sum = 0;
    let h = (b - a) / N;
    for (let i = 1, sign = 1; i < N; i++, sign *= -1) {
      x[i] = a + i * h;
      sum += (3 + sign) * F(x[i]);
    }
    return (h / 3) * (F(a) + sum + F(b));
  }
  function absDelta() {
    let resultBack, resultNext;
    resultBack = calculate(F, a, b, N);
    do {
      resultNext = resultBack;
      N = N * 2;
      resultBack = calculate(F, a, b, N);
    } while (Math.abs(resultBack - resultNext) > eps);
    return [resultBack, Math.abs(resultBack - resultNext)];
  }
  const result = absDelta();

  integralParabol.innerHTML = `Метод Симпсона:  ${result[0].toFixed(
    8
  )} Погрешность: ${result[1].toFixed(8)}`;
};

btnTrap.addEventListener("click", methodTrap);
btnRectangle.addEventListener("click", centralRectangle);
btnParabol.addEventListener("click", methodParabol);
