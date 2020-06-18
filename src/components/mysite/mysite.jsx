import React,{useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import Style from '../../styles/mysite.module.scss'
import { FaTrash } from 'react-icons/fa'


function MySite(props) {

    const [userList, setUserList] = useState(null)
    const [message, setMessage] = useState("")


    useEffect(() => {
        getUserList()
        console.log(props.loginData)
    }, [])

    const getUserList = () => {
        let id = props && props.loginData && props.loginData.user_id
        let url =`https://api.mediehuset.net/mediesuset/programme/${id}`
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${props && props.loginData && props.loginData.access_token}`
            },
        })
        .then(response => response.json())
        .then(json => setUserList(json))
        }

        const getDay = (day) => {
            switch(day){
                case "08": 
                    return "Onsdag"
                
                case "09":
                    return "Torsdag"
                
                case "10":
                    return "Fredag"
            
                case "11":
                    return "Lørdag"
            }
        }
    

    const deleteFromUserList = (id) => {
        
      
            let url = `https://api.mediehuset.net/mediesuset/programme/${id}`
            
            fetch(url, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${props.loginData.access_token}`
                },
            })
            .then(response => response.json())
            .then(json => console.log(json)) 
            .then(setMessage("Fjerner koncert fra dit program"))
    }

    if (!message == ""){
        setTimeout(() => {
            setMessage("")
            getUserList()
        }, 2000);
    }

    console.log(userList)
    console.log(props.loginData)

    let schedule = ["Onsdag", "Torsdag", "Fredag", "Lørdag"];    

    const stageColor = (stage) => {
        switch(stage){
            case "Rød scene":
                return "#A63C4F"

            case "Blå scene":
                return "#396999"

            case "Grøn scene":
                return "#728C4A"

            case "Lilla scene":
                return "#8B3B8C"
        }
    }

    if (props.loginData){
       let result = schedule.map((day) => {
            return (
                <section className={Style.gridcontainer}>
                    <h3>{day.toUpperCase()}</h3>
                {
                 userList && userList.items.map((item) => {

                    if (getDay(item.datetime.substring(8, 10)) === day){
                        
                        return (
                            <div className={Style.griditem}>
                                <p style={{backgroundColor: stageColor(item.stage_name)}}>{item.stage_name}</p>
                                <p>{item.datetime.substring(11, 16)}</p>
                                <p>{item.event_title}</p>
                                <p className={Style.trash} onClick={() => deleteFromUserList(item.id)}><FaTrash/></p>
                            </div>
                        )}}
                        )}
                    </section>
                )
            })
            return(
                <>
                <h2>MIT PROGRAM</h2>
                <h4 style={{textAlign: "center"}}>{message}</h4>
                <div className={Style.wrapper}>{result}</div>
                </>
                )
    }

    if (!props.loginData) {
        console.log("LoginData not found.... Redirecting to start")
        return <Redirect to='/' />
    }
}

export default MySite