// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import db from "../../firebase/config";

// find some place that gives you public data

// get data from craigslist
// https://www.craigslist.org/about/sites

export default async function handler(req, res) {
  // get some sample data from online using axios

  const response = await fetch("https://cars.ksl.com/nextjs-api/proxy?", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-ddm-event-accept-language": "en-US",
      "x-ddm-event-ip-address": "undefined",
      "x-ddm-event-user-agent": "[object Object]",
    },
    referrer: "https://cars.ksl.com/search",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"endpoint":"/classifieds/cars/search/searchByUrlParams","options":{"method":"POST","headers":{"Content-Type":"application/json","User-Agent":"cars-node","X-App-Source":"frontline","X-DDM-EVENT-USER-AGENT":{"ua":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36","browser":{"name":"Chrome","version":"107.0.0.0","major":"107"},"engine":{"name":"Blink","version":"107.0.0.0"},"os":{"name":"Windows","version":"10"},"device":{},"cpu":{"architecture":"amd64"}},"X-DDM-EVENT-ACCEPT-LANGUAGE":"en-US","X-MEMBER-ID":null,"cookie":""},"body":["es_query_group","7615ca67-4bed-4fcb-b93f-5aea947fae9d"]}}',
    method: "POST",
    mode: "cors",
    credentials: "include",
  });

  const data = await response.json();
  const carsCollection = collection(db, "cars");

  const cars = data.data.items;

  console.log(cars, "cars");

  // add data to firestore

  const promises = cars.map((car) => {
    const { id, ...rest } = car;
    return addDoc(carsCollection, { id, ...rest });
  });

  await Promise.all(promises);

  // get cars from public api and load them into firebase

  res.status(200).json(data);
}
