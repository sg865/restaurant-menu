const mobile=document.getElementById('mobile');

const signin= (e)=>{
    e.preventDefault();
    const mob=sessionStorage.getItem('mobile');
    if(mob===mobile.value){
        window.location.href='./index.html';
        }else{
            alert('Invalid Mobile Number');
        }
}

const signupBtn=document.getElementById('signin-button');
signupBtn.addEventListener('click',(e)=>{signin(e)});