import React, {useState, useEffect} from 'react';
//import dataRead from '../data.json';
import {formatDate, textDateToTimeStamp} from '../utils/utilities';
import TimePoint from './stateless/TimePoint';
import Truck from './stateless/Truck';
import VerticalSlider from './stateless/VerticalSlider';
import HorizontalSlider from './stateless/HorizontalSlider';
import axios from 'axios';

function Layout() {
    const offsetDistance = 5; //%
    const laggingDistance = 18;
    const numberOfTimePs = 3;
    const truckStepSize = 15; //vh
    const truckLineOffset= 10;
    const timeStep = 4*60*60*1000; //4 hours
    const timeLineWidth = ((numberOfTimePs - 1)*timeStep*100)/(100 - (offsetDistance + laggingDistance));

    const [data, setData] = useState();
    const [trucks, setTrucks] = useState([]);
    const [orders, setOrders] = useState([]);
    const [displayedTrucks, setDisplayedTrucks] = useState([]);
    const [datesShown, setDatesShown] = useState([]);
    const [verticalPosition, setVerticalPosition] = useState(100);
    const [horizontalPosition, setHorizontalPosition] = useState(0);
    const [filterOn, setFilterOn] = useState(false);

    const calculateAbsoluteT0 = () => {
        const t0 = datesShown[0];
        const absT0 = t0 - (timeLineWidth*(offsetDistance/100));
        return absT0;
    }
    
    const calculateTimePointDistance = (timepoint, t0, tN) => {
        const mainDistance  = tN - t0;
        const hundredPercent = (mainDistance/(100 - (offsetDistance + laggingDistance)))*100;
        const actualT0 = t0 - hundredPercent*(offsetDistance/100);
        if (timepoint < actualT0) return false;
        return ((timepoint - actualT0)/hundredPercent)*100;
    }

    const calculateTimePointOffset = (timepoint) => {
        const t0 = datesShown[0];
        const tN = datesShown[datesShown.length - 1];
        const currOffset =  calculateTimePointDistance(timepoint, t0, tN) + "%";
        return currOffset;
    }

    const calculateMinTime = (ords) => {
        const fromDates = ords.map(order => textDateToTimeStamp(order.from)); // in chrome works even the new Date(order.from).getTime()
        const minTime = Math.min(...fromDates);
        return minTime;
    }

    const calculateMaxTime = () => {
        const toDates = orders.map(order => textDateToTimeStamp(order.to));
        const maxTime = Math.max(...toDates);
        return maxTime;
    }

    const calculateHorizontalUnit = () => {
        const minTime = calculateMinTime(orders);
        const maxTime = calculateMaxTime();
        //calc diff
        const timeDiff = maxTime - minTime;
        //calc and return unit
        const horizontalUnit = Math.floor(timeDiff/100);
        return horizontalUnit;
    }

    const generateDisplayedTimePoints = (firstTimePoint, numberOfTimePs) => {
        //const firstTimeStamp = new Date(firstTimePoint).getTime();
        
        let timepoints = [firstTimePoint];
        let nextTimePoint = Number(firstTimePoint);
        for (let i = 0; i < numberOfTimePs - 1; i++){
            nextTimePoint = nextTimePoint + timeStep;
            timepoints.push(nextTimePoint);
        }
        return timepoints;
    }

    const setDefaults = () => {
        setOrders(data.orders);
        setTrucks(data.trucks);
        let currentTrucksPositions = calculateDefaultPositions();
        setDisplayedTrucks(currentTrucksPositions);
    }

    const handleSearchRequest = (ev) => {
        const text = ev.target.value;
        const truckArray = text.split(" ");
        const truckNames = trucks.map( truck => truck.name);
        const newPositions = [];
        let inx;
        for(let truck of truckArray){
            inx = truckNames.indexOf(truck);
            if (inx > -1) newPositions.push(inx);
        }
        if (newPositions.length > 0){
            setFilterOn(true);
        } else {
            setFilterOn(false);
            setDefaults();
        }

        if (newPositions.length > 4){
            newPositions.splice(0,4);
        }

        setDisplayedTrucks(newPositions);

    }


    const calculateDefaultPositions = () => {
        let currentTrucksPositions = []; 
        for(let i = 0; i < numberOfTimePs; i++){
            currentTrucksPositions.push(i);
        }
        return currentTrucksPositions;
    }

    useEffect(() => {
/*         axios.get("https://nexogenshares.blob.core.windows.net/recruitment/trucktimeline.json")
        .then(response => {
            // setTrucks, setOrders, setData
            }); */
            //because of CORS restriction, data is read from a file
            axios.get("../data.json").then((response) => {
                setData(response.data);
                setOrders(response.data.orders);
                setTrucks(response.data.trucks);
                let currentTrucksPositions = calculateDefaultPositions();
                setDisplayedTrucks(currentTrucksPositions);
              }).catch(error => console.log("request error", error));
        }, []);


    useEffect(() => {
        //setTrucks based on the new position of the vertical slider
        const verticalUnit = 100/(trucks.length);
        const x = Math.floor((100 - verticalPosition)/verticalUnit);
        let newTruckPositions;
        if (x > trucks.length - numberOfTimePs){
            newTruckPositions = [trucks.length - 3, trucks.length - 2, trucks.length - 1];
        } else {
            newTruckPositions = [x, x + 1, x + 2];
        }
        //change the set of trucks
        if (!filterOn) setDisplayedTrucks(newTruckPositions);
    }, [verticalPosition, filterOn, trucks]);

    useEffect(() => {
        //update orders based on new trucks
        if (trucks.length > 0 && data.orders.length > 0){
            let newOrders = [];
            for(let truckPosition of displayedTrucks){
                newOrders.push(...trucks[truckPosition].assignedOrderId);
            }
            const newOrderData = data.orders.filter(order => newOrders.includes(order.id));
            setOrders(newOrderData);
            const firstTimePoint = calculateMinTime(newOrderData);
            const timePoints = generateDisplayedTimePoints(firstTimePoint, numberOfTimePs);
            if (orders.length > 0) setDatesShown(timePoints);
        }

    }, [displayedTrucks]);

    useEffect(() => {
        const horizontalUnit = calculateHorizontalUnit();
        const newFirstTimePoint = calculateMinTime(orders) + horizontalPosition*horizontalUnit;
        const newDisplayedPoints = [];
        for (let i = 0; i < numberOfTimePs; i++){
            newDisplayedPoints.push(newFirstTimePoint + timeStep*i);
        }
        if (orders.length > 0) setDatesShown(newDisplayedPoints);
    }, [horizontalPosition]);


    return (
        <div className="container">
            <nav className="searchField">
                <h1 className="fieldTitle">Truck board</h1>
                <div className="inputGroup">
                    <label htmlFor="searchField">Filter by truck name: </label>
                    <input type="text" id="searchField" className="searchBar" placeholder="filter by truck name(s) max. 4" onChange={handleSearchRequest}></input>
                </div>
            </nav>
            {data && datesShown.length > 0 && !isNaN(datesShown[0]) && <div className="displayField">
                <VerticalSlider position={verticalPosition} changeVerticalPosition={setVerticalPosition} />
                <div className="timeLine">
                    { datesShown.map( date => <TimePoint key={date} date={formatDate(date)} position={calculateTimePointOffset(date)} />) }
                    { orders.length > 0 && trucks.filter((truck,index) => displayedTrucks.includes(index) ).map((truck, inx) => <Truck 
                            key={truck.name}
                            timeLineWidth={Math.floor(timeLineWidth)}
                            truckName={truck.name}
                            fromTop={inx*truckStepSize + truckLineOffset +"vh"}
                            firstCurrentTimePoint={Math.floor(calculateAbsoluteT0())}
                            orders={truck.assignedOrderId.map( order => {
                            let ordArr = data.orders.filter( ord => ord.id === order)
                            return ordArr[0];})}/>
                        )}
                    <HorizontalSlider changeHorizontalPosition={setHorizontalPosition}/>
                </div>
            </div> }
        </div>
    )
}

export default Layout
