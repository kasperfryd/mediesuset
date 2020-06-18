import React, {useState, useEffect} from 'react';
import Style from '../../styles/news.module.scss'
import { faBackward} from '@fortawesome/free-solid-svg-icons'
import { FaArrowLeft } from 'react-icons/fa';

function News (props) {

    useEffect(() => {
        getNews()
        getAllImages()
    }, [])
    
    const [news, setNews] = useState("");
    const [imageData, setImageData] = useState(null)
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState(null)
    const [selectedArticleDate, setSelectedArticleDate] = useState(null)

    const getNews = () => {
        let url = 'https://api.mediehuset.net/mediesuset/news'
        fetch(url)
        .then(response => response.json())
        .then(json => setNews(json))
        .catch(error => console.log(error))
    }

    const getAllImages = () => {
        let url = `https://api.mediehuset.net/mediesuset/images`
        fetch(url)
        .then(response => response.json())
        .then(json => setImageData(json))
        .catch(error=>console.log(error))
    }

    const getSelectedNews = (id) => {
        let url = `https://api.mediehuset.net/mediesuset/news/${id}`
        fetch(url)
        .then(response => response.json())
        .then(json => setSelected(json))
        .then(window.scrollTo(0,400))
        .catch(error=>console.log(error))
    }

    console.log(selected)
    console.log(news)


    return (
    <div className={Style.newswrapper}>
    <div className={Style.bannerimage} style={{backgroundImage:`url(${imageData && imageData.items[4].image})`}}></div>
    {!selected && 
    <>
    <h2>NYHEDER</h2>
    <section className={Style.newscontainer}>
        {news.items && news.items.map((item, index) => {

            if (index < 6){
            return (<div key={index} className={Style.newsitem}>
                        <div className={Style.newsimage} style={{backgroundImage:`url(${item.image})`}} alt={"news-image"+item.title}></div>
                        <h5>{item.title}</h5>
                        <p>{item.teaser.substring(0,100)}</p>
                        <button onClick={()=>{getSelectedNews(item.id); setSelectedArticleDate(item.local_time)}}>Læs mere</button>
                    </div>)
        }})}    

    </section>
    </>
    }

    {selected && 
    <section className={Style.articlecontainer}>
        <h2>{selected.item.title}</h2>
        <img src={selected.item.image}></img>
        <div onClick={()=>setSelected(null)}><FaArrowLeft/></div>
        <p>Skrevet af: </p><b>{selected.item.author}</b>
        <p>Den: {selectedArticleDate}</p>
        <p>{selected.item.content}</p>
    </section>
    }
        <button className={Style.nyhedsarkiv} onClick={() => {active ? setActive(false): setActive(true)}} >Nyhedsarkiv</button>
        <div className={active ? Style.shown: Style.hidden}>
        {news.items && news.items.map((item, index) => {

            return (
            <div key={index} className={Style.newsitemlist}>
                <p>Skrevet d. <p className={Style.newsdate}>{item.local_time.substring(0, 10)}</p></p>
                <p className={Style.newstitle}>{item.title}</p>
                <button onClick={()=>getSelectedNews(item.id)}>Læs mere</button>
            </div>)
        })}            
    </div>
    </div>
    )
}

export default News