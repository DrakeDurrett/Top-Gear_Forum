import React, { Component } from 'react';
import axios from 'axios';
import './Cars.css';

class Cars extends Component {
    constructor() {
        super();

        this.state = {
            cars: []
        };

    }

    componentDidMount() {
        this.getCars()
    };

    getCars = () => {
        axios.get('/api/cars').then(res => {
            this.setState({
                cars: res.data
            })
        }).catch(err => console.log(err))
    };

    render() {
        const mappedCars = this.state.cars.map( (cars) => {
            return <div className="car-table" key={cars.car_id}>
                <h1>#{cars.car_id}</h1>
                <span className="car-name">
                    <h1>{cars.name}</h1>
                </span>
                <span className='car-img'>
                    <img src={cars.image} alt="404 Not Found"></img>
                </span>
                <span className="car-lap">
                    <h2>{cars.lap_time}</h2>
                </span>
            </div>
        })
        return <div>
            <h1 className="table-title">Power Lap Board</h1>
            {mappedCars}
        </div>
    }
}

export default Cars;
