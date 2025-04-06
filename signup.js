const name=document.getElementById('name');
const email=document.getElementById('email');
const mobile=document.getElementById('mobile');

const signup= (e)=>{
    e.preventDefault();
    sessionStorage.setItem('name',name.value);
    sessionStorage.setItem('email',email.value);
    sessionStorage.setItem('mobile',mobile.value);
    console.log(window.location.href);
    window.location.href='./signin.html';

};

const signupBtn=document.getElementById('signup-button');
signupBtn.addEventListener('click',(e)=>{signup(e)});
 