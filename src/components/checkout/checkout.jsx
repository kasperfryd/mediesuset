import React, {useState, useEffect} from 'react'
import Style from '../../styles/checkout.module.scss'
import { Redirect } from 'react-router-dom';

function CheckOut (props) {

    let id = props.ticketId
    const [ticketData, setTicketData] = useState(null)
    const [total, setTotal] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [checkPass, setCheckPass] = useState(null)
    const [name, setName] = useState(null)
    const [address, setAddress] = useState(null)
    const [postal, setPostal] = useState(null)
    const [city, setCity] = useState(null)
    const [shipOption, setShipOption] = useState(null)
    const [shouldReturn, setShouldReturn] = useState(false)
    const [campId, setCampId] = useState(1)
    const [msgColor, setMsgColor] = useState("red")

    const [msg, setMsg] = useState("")

    const getTicketInfo = (id) => {
        let url = `https://api.mediehuset.net/mediesuset/tickets/${id}`
        fetch(url)
        .then(response => response.json())
        .then(json => setTicketData(json))
        .catch(error => redirect(error))
    }

    const updateTotal = (num, price) => {
        setTotal(parseInt(price * num))
    }

    const redirect = (error) => {
            console.log("TicketData not found.... Redirecting")
            console.log(error)    
            setShouldReturn(true);
        }

    const orderTicket = () => {

        console.log("email is " + email)
        console.log("password is " + password)
        console.log("name is " + name)
        console.log("address is " + address)
        console.log("zipcode is " +postal)
        console.log("city is " + city)
        console.log("id is " + id)
        console.log("Quantity is " + quantity)
        console.log("Shipoption is " +shipOption)

        if (email && password && name && address && postal && city && id && quantity && shipOption && campId){
        let formData = new FormData
        formData.append("email", email.toString())
        formData.append("password", password.toString())
        formData.append("name", name.toString())
        formData.append("address", address.toString())
        formData.append("zipcode", parseInt(postal))
        formData.append("city", city.toString())
        formData.append("ticket_id", id.toString())
        formData.append("camp_id",campId.toString())
        formData.append("quantity", parseInt(quantity))
        formData.append("type", shipOption.toString())

        console.log(formData)
        let url = "https://api.mediehuset.net/mediesuset/usertickets"
        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            },
            body : formData,
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(setMsgColor("green"))
        .then(setMsg("Din bestilling er modtaget og du vil modtage en ordrebekærftelse på din mail indenfor få minutter. Du kan også følge eller slette din bestilling fra menuen 'Min billet' "))
            .catch(error => console.log(error))
        }

        else if (!email){
            setMsg("Udfyld email")
        }
        else if (!password){
            setMsg("Udfyld password")
        }
        else if (password != checkPass){
            setMsg("Adgangskoderne er ikke ens")
        }
        else if (!name){
            setMsg("Udfyld navn")
        }
        else if (!address){
            setMsg("Udfyld adresse")
        }
        else if (!postal){
            setMsg("Udfyld postnummer")
        }
        else if (!city){
            setMsg("Udfyld by")
        }
        else if (!quantity){
            setMsg("Udfyld hvor mange camp pladser du ønsker")
        }
        else if (!shipOption){
            setMsg("Udfyld forsendelse mulighed")
        }   
        else if (!id){
            setMsg("Der opstod en fejl. Gå venligts tilbage og forsøg igen")
        }
    }

    useEffect(() => {
        getTicketInfo(id)
        setMsgColor("red")

    }, [])
    
    if(props.loginData === null && msg === ""){
        setMsg("Log ind for at bestille")
    }

    if (shouldReturn){
        return (
            <Redirect to='/' />
        )
    }

    if (total === 0 && ticketData && ticketData.item.price){
        updateTotal(1, ticketData && ticketData.item.price)
    }

    return (
        <section className={Style.wrapper}>
        <h2>KØB BILLET</h2>
        <section className={Style.topbox}>
            <h3>INFORMATION OM DEN VALGTE BILLET</h3>
            <p>{ticketData && ticketData.item.description}</p>
        </section>

        <section className={Style.midbox}>
            <h3>BESTILLING</h3>
            <div className={Style.griditem}>
                <input defaultValue={1} type="number" onChange={(e) => updateTotal(e.target.value, ticketData.item.price)}></input>
                <p>Stk.</p>
                <p>{ticketData && ticketData.item.name}</p>
                <p>á</p>
                <p></p>
                <p>DKK {ticketData && ticketData.item.price}</p>
            </div>
            <div className={Style.total}>
                <div/>
                <p>Pris i alt: </p>
                <p>DKK {total}.00</p>
            </div>
        </section>

        <section className={Style.bottombox}>
            <div className={Style.leftgrid}>
                <h4>Reserver Camp pladser</h4>
                <label className={Style.inline}>Antal:</label>
                <input defaultValue={1} onChange={(e)=>setQuantity(e.target.value)} className={Style.antal} type="number"></input>
                <label className={Style.inline}>Vælg camp:</label>
                <select>
                    {ticketData && ticketData.item.camps.map((camp, index)=>{
                        return (<option key={index} id={camp.id} onChange={(e)=>setCampId(e.target.id)} >{camp.name}</option>)
                    })}
                </select>
                <h4>Indtast brugeroplysninger</h4>
                <label>Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Indtast email"></input>
                <label>Adgangskode
                </label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Indtast din adgangskode"></input>
                <label>Gentag adgangskode
                </label>
                    <input type="password" onChange={(e)=>setCheckPass(e.target.value)} placeholder="Gentag adgangskode"></input>
                <label>Navn
                </label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Indtast dit navn"></input>
                <label>Adresse
                </label>
                    <input onChange={(e)=>setAddress(e.target.value)} placeholder="Indtast din adresse"></input>
                <label>Postnummer
                </label>
                    <input onChange={(e)=>setPostal(e.target.value)} placeholder="Indtast postnummer"></input>
                <label>By
                </label>
                    <input onChange={(e)=>setCity(e.target.value)} placeholder="Indtast by"></input>
            </div>

            <div className={Style.rightgrid}>
                <h4>Vælg forsendelsesmetode</h4>
                <div className={Style.innergrid}>
                <input onChange={(e)=>setShipOption("paper")} type="radio" name="shipping"></input>
                    <p><b>Jeg ønsker billetterne tilsendt.</b> <br/> Vi sender billetterne til dig med posten</p>
                </div>
                <div className={Style.innergrid}>
                <input onChange={(e)=>setShipOption("print")} type="radio" name="shipping"></input>
                    <p><b>Jeg udskriver billetterne selv.</b> <br/> Du modtager billetterne på din e-mail. Du kan selv udskrive dem, og du sparer således forsendelses-gebyret.</p>
                </div>
                <p style={{color:`${msgColor}`}} className={Style.msg}>{msg}</p>
                <button onClick={()=>orderTicket()}>SEND</button>
            </div>
        </section>
    </section>
    )
}

export default CheckOut;