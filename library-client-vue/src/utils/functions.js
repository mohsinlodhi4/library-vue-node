import {useToast} from 'vue-toast-notification';

const $toast = useToast();
export const notifySuccess = (msg)=>{
    $toast.clear();
    $toast.success(msg);
}
export const notifyError = (msg)=>{
    $toast.clear();
    $toast.error(msg);
}

export const isValidPhone = (num) => {
    return /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(num);
}
export const isValidID = (id) => {
  return id.toString().length==11;
}
export const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const setUser = (user) => {
    localStorage.setItem('user-token', user?.token);
    localStorage.setItem('user', JSON.stringify(user));
}
export const getUser = () => {
  try{

    let user = localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
    }
    return user;
  }catch(e){
    console.log('error: ', e);
    return null;
  }
}
export const logout = (e)=>{
    e?.preventDefault();
    localStorage.removeItem('user-token');
    localStorage.removeItem('user');
    window.location = '/login';
}


export const isWorkDay = (date)=> {
  let curDate = new Date(date);
  let dayOfWeek = curDate.getDay();
  let isWorkDay = true;
  if (dayOfWeek === 0 || dayOfWeek === 5) {
      isWorkDay = false;
  }

  return isWorkDay;
}

export const dateAfterBusinessDays = (addDays)=>{

  let curDate = new Date();
  let realDaysToAdd = 0;
  while (addDays > 0) {
    realDaysToAdd++;
    if (isWorkDay(curDate)) {
        addDays--
    }

    curDate.setDate(curDate.getDate() + 1);
  }

  let date = new Date()
  let afterDate = new Date(date.setDate(date.getDate() + realDaysToAdd));
     
  // return realDaysToAdd;
  return afterDate;
}


export const getRequest = (url, data=null)=>{
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('user-token');
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      let q = '';
      if(token){
        headers['Authorization'] = "Bearer " + token;
      }
      if(data){
        let arr = []
        Object.keys(data).forEach((key)=>{
          arr.push(`${key}=${data[key]}`);
        })
        q = arr.join('&');
      }
  
  
      try {
        fetch(`${url}?${q}`, {
          method: "GET",
          mode: "cors",
          headers,
        }).then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
          return;
        });
      } catch (error) {
        reject(error);
        console.log("Error", error);
      }
    });
  }
  
  
export  const postRequest = (url, data=null) =>{
    return new Promise((resolve, reject) => {
    const token = localStorage.getItem('user-token');
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if(token){ 
        headers['Authorization'] = "Bearer " + token;
      }
  
      try {
        fetch(url, {
          method: "POST",
          mode: "cors",
          headers,
          body:JSON.stringify(data),
        }).then((res) => {
          res.json().then((data) => {
            resolve(data);
          });
          return;
        });
      } catch (error) {
        reject(error);
        console.log("Error", error);
      }
    });
  }