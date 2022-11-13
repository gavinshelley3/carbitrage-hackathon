import Head from "next/head";
import { Col, Row } from "reactstrap";
import ProjectTables from "../src/components/dashboard/ProjectTable";
import Blog from "../src/components/dashboard/Blog";

import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/config";
import { useState, useEffect, useRef } from "react";

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
      {/* <FirebaseDataFetchingDemo /> */}
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
