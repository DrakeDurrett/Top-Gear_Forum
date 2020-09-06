import React, { Component } from 'react';
import axios from 'axios';

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
        const mappedCars = this.state.cars.map( (cars, index) => {
            return <div key={index}>
                <h1>{cars.car_name}</h1>
                <img src={cars.car_picture} alt="404 Not Found"></img>
                <h2>{cars.lap_time}</h2>
            </div>
        })
        return <div>
            {mappedCars}
        </div>
    }
}

export default Cars;
