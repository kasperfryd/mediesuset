import React, {useState, useEffect} from 'react'
import Style from '../../styles/mytickets.module.scss'
import { Redirect } from 'react-router-dom';


function MyTickets(props) {

    const [allTickets, setAllTickets] = useState(null)
    const [shouldReturn, setShouldReturn] = useState(false)
    const [msg, setMsg] = useState("")
       
    const getAllTickets = () => {
        let id = props.loginData && props.loginData.user_id
        let url = `https://api.mediehuset.net/mediesuset/usertickets/${id}`
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${props.loginData && props.loginData.access_token}`
            },
        })
        .then(response => response.json())
        .then(json => setAllTickets(json))
        .catch(error => redirect(error))
    }

    const deleteTicket = (id) => {
        let url = `https://api.mediehuset.net/mediesuset/usertickets/${id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${props.loginData && props.loginData.access_token}`
            },
        })
        .then(response => response.json())
        .then(json => console.log(json))

        setMsg("Billetten er afbestilt")
    }

    const redirect = (error) => {
        console.log("Something went wrong.... Redirecting")
        console.log(error)    
        setShouldReturn(true);
    }
    
    useEffect(() => {
        getAllTickets()
    }, [])
    
    if (shouldReturn){
        return (
            <Redirect to='/' />
        )
    }

    if (msg === "Billetten er afbestilt"){
        setTimeout(() => {
            setMsg("")
            getAllTickets()
        }, 2000);
    }

    console.log(allTickets)
    return (
        <>
        <div>
        <h2>Mine Billetter</h2>
        <p>{msg}</p>
        </div>
        <section className={Style.ticketgrid}>
            {allTickets && allTickets.items && allTickets.items.map((item) => {
                
               return (
               <div className={Style.ticketitem}>
                    <p>Navn: {item.name}</p>
                    <p>Adresse: {item.address}</p>
                    <p>Postnummer: {item.zipcode}</p>
                    <p>Email: {item.email}</p>
                    <p>Antal: {item.quantity} x {item.ticket_name}</p>
                    <p>Pris: {item.quantity} x {item.ticket_price}</p>
                    <p>Total: {parseInt(item.quantity * item.ticket_price)}</p>
                <button onClick={()=>{deleteTicket(item.id)}}>Afbestil</button>
                </div>
               )
            })}
        </section>
        </>
    )
}

export default MyTickets