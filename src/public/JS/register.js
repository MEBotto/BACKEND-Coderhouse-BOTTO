const form = document.getElementById("registerForm");

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    console.log(data)
    const obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch('/api/sessions/register', {
        method:"POST",
        body: JSON.stringify(obj),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then( result => {
        console.log(result.status)
        if(result.status === 201){
            window.location.replace('/users/login')
        }
    })
})