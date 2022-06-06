const btnLogin = document.getElementById('login');
const btnRegister = document.getElementById('register');
const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');

btnRegister.onclick = function showFormR () {
    formRegister.removeAttribute('class','hidden');
    formLogin.setAttribute('class','hidden');
}

btnLogin.onclick = function showFormL () {
    formLogin.removeAttribute('class','hidden');
    formRegister.setAttribute('class','hidden');
}

const emailUsed = document.getElementById('emailUsed');
setTimeout(()=>emailUsed.remove(),3000);
