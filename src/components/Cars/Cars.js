import React, { Component } from 'react';
import axios from 'axios';
import './Cars.scss';

class Cars extends Component {
    constructor() {
        super();

        this.state = {
            cars: [],
            currentCar: 0
        };

        this.nextCar = this.nextCar.bind(this);
        this.prevCar = this.prevCar.bind(this);
    };

    
    componentDidMount(){
        this.getCars();
        // console.log(this.state.cars)
    };

    getCars = () => {
        axios.get('/api/cars').then(res => {
            this.setState({ cars: res.data })
        }).catch(err => console.log(err))
    };

    nextCar(e) {
        const currentCar = this.state.currentCar;
        if(currentCar === this.state.cars.length - 1) {
        e.preventDefault()
        } else {
          this.setState ({
            currentCar: currentCar + 1
          })
        }
    };

    prevCar(e) {
        const currentCar = this.state.currentCar;
        if(currentCar === 0) {
          e.preventDefault();
        } else {
          this.setState({
            currentCar: currentCar - 1
          })
        }
    };

    render() {
        const {currentCar, cars} = this.state;
        const mappedCars = cars.map( (car, index ) => {
            if(index === currentCar) {
                return <div className="car-table" key={car.car_id} >
                    <div className="car-title">
                        <p>#{car.car_id}</p>
                        <h1> {car.name}</h1> 
                    </div>
                    <img src={car.image} alt='Car' />
                    <p>{car.lap_time}</p>
                </div>
            } else {
                return null;
            }
        })
        return <div className="car">
            <h1 className="table-title">Power Lap Board</h1>
            <div className="power-lap-board">
                {mappedCars}
                <button onClick={e => this.prevCar(e)}> Previous </button>
                <button onClick={e => this.nextCar(e)} > Next </button>
            </div>            
        </div>
    } 
}

export default Cars;
