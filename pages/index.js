import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Col, Row } from "reactstrap";
import SalesChart from "../src/components/dashboard/SalesChart";
import Feeds from "../src/components/dashboard/Feeds";
import ProjectTables from "../src/components/dashboard/ProjectTable";
import TopCards from "../src/components/dashboard/TopCards";
import Blog from "../src/components/dashboard/Blog";
import bg1 from "../src/assets/images/bg/bg1.jpg";
import bg2 from "../src/assets/images/bg/bg2.jpg";
import bg3 from "../src/assets/images/bg/bg3.jpg";
import bg4 from "../src/assets/images/bg/bg4.jpg";

import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/config";
import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const FirebaseDataFetchingDemo = () => {
  const [data, setData] = useState(null);

  const handleFetchData = async () => {
    // use firebase to get data from the cars collection
    // and set it to the data state variable

    const carsCollection = collection(db, "cars");
    const carsSnapshot = await getDocs(carsCollection);

    const carsList = carsSnapshot.docs.map((doc) => doc.data());

    setData(carsList);
  };

  return (
    <div>
      <button onClick={handleFetchData}>get data</button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default function Home() {
  const [data, setData] = useState(null);
  const [recentCars, setRecentCars] = useState(null);
  const [email, setEmail] = useState('')
  
  // const SendMail = async (e) => {
  //   e.preventDefault();
  //   console.log('call')
  //   axios.post('http://localhost:3000/api/email',{email})
  //  .then(
    
  //  (res)=>{
  //    alert('Send Mail To You')
  //    setEmail('')
 
  //  }
 
  //  ).catch(
  //    (e)=>console.log(e)
  //  )
  // }
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('default_service', 'template_9u1c8xp', form.current, 'jjnfbJCzvk3o7ev0W')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const handleFetchData = async () => {
    // use firebase to get data from the cars collection
    // and set it to the data state variable

    const carsCollection = collection(db, "cars");
    const carsSnapshot = await getDocs(carsCollection);

    const carsList = carsSnapshot.docs.map((doc) => doc.data());

    setData(carsList);
  };


  useEffect(() => {
    handleFetchData();
  }, [])

  useEffect(() => {
    setRecentCars(data?.slice().sort((a,b) => a.createTime - b.createTime).slice(1,5))
  }, [data])

  return (
    <div >     
      <Head>
        <title>Carbitrage</title>
        <meta
          name="description"
          content="Carbitrage"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FirebaseDataFetchingDemo />
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
      </form>
      {/* <main className={styles.main}>
       <form>
      <input type="email" placeholder="Enter Mail" required value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <button onClick={SendMail}>Send</button>
        </form>
     </main> */}
      {/***Blog Cards***/}
      <h5 className="mb-3 mt-3">Recently Added</h5>
        <Row>
          { recentCars && recentCars.map((car) => (
            <Col sm="6" lg="6" xl="3" key={car.vin}>
              <Blog
                image={car?.photo?.[0] ? car.photo[0].id : 'https://www.iconpacks.net/icons/2/free-car-icon-2901-thumb.png'}
                title={`${car.make}, ${car.model}`}
                subtitle={car.makeYear}
                text={`${car.city}, ${car.state}`}
                color="primary"
              />
            </Col>
          ))}
        </Row>
      <div>
        {/***Table ***/}
        <Row>
          <Col lg="12" sm="12">
            {data && <ProjectTables carData={data}/>}
          </Col>
        </Row>
        
      </div>
    </div>
  );
}
