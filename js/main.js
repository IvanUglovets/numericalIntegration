const left = document.getElementById('left');
const right = document.getElementById('right');
const step = document.getElementById('step');
const integralRectangle = document.getElementById('content_rectangle');
const integralTrap = document.getElementById('content_trap');
const integralParabol = document.getElementById('content_parabol');
const btnRectangle = document.getElementById('btn_rectangle');
const btnTrap = document.getElementById('btn_trap');
const btnParabol = document.getElementById('btn_parabol');
const calculateTools =document.querySelector('.calculate__tools');
const calculateList =document.querySelector('.calculate__list'); 

// delete MAth
function takeAwayMath(){
    let math_methods = Object.getOwnPropertyNames(Math);
    for (var i in math_methods){
        this[math_methods[i]] = Math[math_methods[i]];
    }
}  

//Метод ЦП
const centralRectangle =()=>{
    let x = [];
    const  a = Number(left.value.trim());
    const  b = Number(right.value.trim());
    const  N = Number(step.value.trim());
    takeAwayMath();
    function F(x){
        let func = document.getElementById('func').value;
        let expr = eval(func);
        return expr;
    }
    function calculate(F,a,b,N){
        let sum = 0;
        let h=(b-a)/N;
        for(let i=1; i <= N; i++){
            x[i]=a+i*h;
            sum += F(x[i]-(h/2));
        }
        return h*sum;
    }
    const result = calculate(F,a,b,N);
    isNaN(result) ? integralRectangle.innerHTML = "Ошибка!!!Проверьте ввод данных." : integralRectangle.innerHTML = "Метод ЦП: "+String(result.toPrecision(10));
};
//Метод трапеций
const methodTrap = () =>{
    let x = [];
    const  a = Number(left.value.trim());
    const  b = Number(right.value.trim());
    const  N = Number(step.value.trim());
    takeAwayMath();
    function F(x){
        let func = document.getElementById('func').value;
        let expr = eval(func);
        return expr;
    }
    let pieceFunc = (F(a)+F(b))/2;
    function calculate(F,a,b,N){
        let sum = 0;
        let h=(b-a)/N;
        for (let i = 0; i < N; i++){
        x[i] = a+i*h;
        //if (sum == Number.NEGATIVE_INFINITY || sum == Number.POSITIVE_INFINITY || sum == isNaN(sum)) continue;
        sum += (F(a + h * i) + F(a + h * (i + 1))) / 2 * h;
    }

        return sum;

    }
    const result = calculate(F,a,b,N);
    isNaN(result) ? integralTrap.innerHTML = "Ошибка!!!Проверьте ввод данных." : integralTrap.innerHTML = "Метод трапеций: "+String(result.toPrecision(10));
}



//Метод Симпсона
const methodParabol = () => {
    let x = [];
    const a = Number(left.value.trim());
    const b = Number(right.value.trim());
    const N = Number(step.value.trim());
    takeAwayMath();
    function F(x){
        let func = document.getElementById('func').value;
        let expr = eval(func);
        return expr;
    }
    function calculate(F,a,b,N){
        let sum = 0;
        let h = (b-a)/N;
        for (let i = 1, sign = 1; i < N; i++, sign *= -1) {
        x[i] = a+i*h;
        sum += (3 + sign) * F(x[i]);
        }
     return h / 3 * (F(a) + sum + F(b));
    }
    let result = calculate(F,a,b,N);
    isNaN(result) ? integralParabol.innerHTML = "Ошибка!!!Проверьте ввод данных." : integralParabol.innerHTML = "Метод Симпсона: "+String(result.toPrecision(10));
}

btnTrap.addEventListener('click', methodTrap);
btnRectangle.addEventListener('click',centralRectangle);
btnParabol.addEventListener('click',methodParabol);

