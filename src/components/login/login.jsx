import React,{useState} from 'react'
import Style from '../../styles/login.module.scss'

function Login(props) {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState("Indtast login oplysninger")

    const sendLoginRequest = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
      
        let url = 'https://api.mediehuset.net/token';
        
        console.log(formData)
        fetch(url, {
          method: "POST",
          body : formData,  
        })
        .then(response => response.json())
        .then(json => handleSessionData(json))
        .catch(error => setMessage(error))
    }
    
    const handleSessionData = (key) => {
        if (!key.message){
            props.setLoginData(key)
            console.log(key)
            localStorage.setItem('token', JSON.stringify(key)) 
        }
  
        if (key.message === "No authorization"){
            setMessage("Forkert brugernavn eller password - prøv igen")
        }
      }

    return (
    <div>
        <h2>login</h2>
        <section className={Style.form}>
            <h4>{!props.loginData ? message : `Du er logget ind som ${props.loginData.username}`}</h4>
            <>
            <label>Email/brugernavn</label>
            <input type="username" onChange={(e)=>{setUsername(e.target.value)}} required placeholder="Indtast din email"></input>
            <label>Adgangskode</label>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} required placeholder="Indtast din adgangskode"></input>
            <button onClick={(e)=>sendLoginRequest(e)}>LOGIN</button>
            </>
            <p>Glemt adgangskode?</p>
        </section>
    </div>
    )
}

export default Login