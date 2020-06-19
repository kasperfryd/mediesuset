import React, {useEffect, useState} from 'react'
import Style from '../../styles/footer.module.scss'
import Logo from '../../images/Hancock-kvalitet-logo.png'

function Footer (props) {

    const [data, saveData] = useState(null)
    const [email, setEmail] = useState(null)
    const [alertContent, setAlertContent] = useState(null)


    const getImage = () => {
        let url = "https://api.mediehuset.net/mediesuset/images"
        fetch(url)
        .then(response => response.json())
        .then(json => saveData(json))
    }
    const signUp = () => {
    
        if (props.loginData && props.loginData.access_token){
    
            if (props.validateEmail(email)){

            let emailForm = new FormData;

            emailForm.append("email", email)

            let url = "https://api.mediehuset.net/mediesuset/newsletter"
        fetch(url, {
            method: "POST", 
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }, 
            body: emailForm
          })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(alert("Du er nu tilmeldt vores nyhedsbrev"))
        }
        else{
            alert("Email adressen er ugyldig")
        }
    }

        else{
            alert("Log ind for at tilmelde dig")
        }
    }
    

    useEffect(() => {
        getImage()
    }, [])

    return (
        <> 
        <section className={Style.footer} style={{backgroundImage:`url(${data && data.items[4].image})`}}>
            <h4>TILMELD NYHEDSBREV</h4>
            <h5>Få seneste nyt sendt direkte til din indbakke</h5>
            <div className={Style.wrapper}>
                <input required onChange={(e)=>{setEmail(e.target.value)}} type="email"></input>
                <button onClick={()=>{signUp()}}>TILMELD NYHEDSBREV</button>
            </div>
            <img className={Style.logo} src={Logo} alt="hancock-logo"></img>
        </section>
        <section className={Style.footerbottom}></section>
        </>
    )

}

export default Footer