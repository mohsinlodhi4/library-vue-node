<script setup>
    import {ref, watch} from 'vue';
    import { notifyError, notifySuccess, isValidEmail, setUser } from '@/utils/functions.js';
    import { register, login } from '../utils/api/auth';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const registerName = ref('');
    const registerEmail = ref('');
    const registerPassword = ref('');

    const loginEmail = ref('');
    const loginPassword = ref('');

    const handleRegister = async (e)=>{
        e.preventDefault();
        const registerForm = {
            name: registerName.value,
            email: registerEmail.value,
            password: registerPassword.value
        }
        if( !registerForm?.name || !registerForm?.email || !registerForm?.password ){
            notifyError("All Fields are required")
            return;
        }
        if(! isValidEmail(registerForm.email)){
            return notifyError('Please Enter Valid Email')
        }
        register(registerForm).then(data=>{
            if(data?.user && data.user.token){
                setUser(data.user)
                // navigate('/chat')
                router.push('/')
                return
            }
        })
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        const loginForm = {
            email: loginEmail.value,
            password: loginPassword.value,
        }
        if( !loginForm?.email || !loginForm?.password ){
            notifyError("All Fields are required")
            return;
        }
        if(! isValidEmail(loginForm.email)){
            return notifyError('Please Enter Valid Email')
        }
        login(loginForm).then(data=>{
            if(data?.user && data.user.token){
                setUser(data.user)
                router.push('/')
                return
            }
        })
    }

</script>

<template>
    <div class='auth-screen'>
        <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div class="signup">
                    <form v-on:submit="handleRegister">
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input v-model="registerName" placeholder="Name"/>
                        <input v-model="registerEmail" placeholder="Email"/>
                        <input v-model="registerPassword" type="password" placeholder="Password"/>
                        <button>Sign up</button>
                    </form>
                </div>

                <div class="login">
                    <form v-on:submit="handleLogin">
                        <label for="chk" aria-hidden="true">Login</label>
                        <input v-model="loginEmail" placeholder="Email" />
                        <input v-model="loginPassword" type="password" placeholder="Password" />
                        <button>Login</button>
                    </form>
                </div>
        </div>
    </div>
</template>

<style scoped>
.auth-screen{
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	font-family: 'Jost', sans-serif;
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
.main{
	width: 350px;
	height: 500px;
	background: red;
	overflow: hidden;
	background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
}
#chk{
	display: none;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
}
.auth-screen label{
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
.auth-screen input{
	width: 65%;
	height: 30px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
}
.auth-screen button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #573b8a;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
.auth-screen button:hover{
	background: #6d44b8;
}
.login{
	height: 460px;
	background: #eee;
	border-radius: 60% / 10%;
	transform: translateY(-180px);
	transition: .8s ease-in-out;
}
.login label{
	color: #573b8a;
	transform: scale(.6);
}

#chk:checked ~ .login{
	transform: translateY(-500px);
}
#chk:checked ~ .login label{
	transform: scale(1);	
}
#chk:checked ~ .signup label{
	transform: scale(.6);
}
</style>