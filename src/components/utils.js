

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import axios from 'axios';

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

//:%H-%M-%s
const parseDate = timeParse("%Y-%m-%d:%H-%M-%s");


export function getData2() {
   const promiseCandleData = axios.get('/api/candle')
   .then(function (response) {

   // handle success
   
    response.data.data.map((item, key) => {
      item.date = parseDate(item.date)
    });
    
    console.log("Loaded data")

    return response.data.data

 })
   .catch(function (error) {

   // handle error

   console.log(error);

 });

 return promiseCandleData;
}

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)))
    console.log(promiseMSFT)
	return promiseMSFT;
}
