import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UsuarioServicio from "../services/UsuarioServicio";
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



export default class Arg extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nuevoCampeon: 0
    }
  }

  calcularPromedio(equipo){
    let cantidadHeroes = 0; 
    equipo.forEach(heroe => {
        cantidadHeroes += 1;
    });

    let totalInteligencia = 0,
    totalFuerza = 0,
    totalVelocidad = 0,
    totalDurabilidad = 0,
    totalPoder = 0,
    totalCombate = 0,
    totalPesoKilos = 0,
    totalPesoLibras = 0,
    totalAlturaPies = 0,
    totalAlturaCm = 0; 

    equipo.forEach(heroe=> {
        totalInteligencia += parseInt(heroe.powerstats['intelligence']);
        totalFuerza += parseInt(heroe.powerstats['strength']);
        totalVelocidad += parseInt(heroe.powerstats['speed']);
        totalDurabilidad += parseInt(heroe.powerstats['durability']);
        totalPoder += parseInt(heroe.powerstats['power']);
        totalCombate += parseInt(heroe.powerstats['combat']);
    });

    let promedio = {
        'Inteligencia': totalInteligencia,
        'Fuerza': totalFuerza,
        'Velocidad': totalVelocidad,
        'Durabilidad': totalDurabilidad,
        'Poder': totalPoder, 
        'Combate': totalCombate
    };

    for (const key in promedio) {
        promedio[key] /= cantidadHeroes;
    }
    var promedioOrdenado = [];
    for (var poderes in promedio) {
        promedioOrdenado.push([poderes, promedio[poderes]]);
    }
    promedioOrdenado.sort(function(a, b) {
      return b[1] - a[1];
    });

    return promedioOrdenado;
  }



  calcularPesoAltura(equipo){
    let cantidadHeroes = 0; 
    equipo.forEach(heroe => {
        cantidadHeroes += 1;
    });

    let totalPesoKilos = 0,
    totalPesoLibras = 0,
    totalAlturaPies = 0,
    totalAlturaCm = 0; 

    equipo.forEach(heroe=> {
        totalPesoLibras += parseInt(heroe.appearance.weight[0]);
        totalPesoKilos += parseInt(heroe.appearance.weight[1]);
        totalAlturaPies += parseInt(heroe.appearance.height[0]);
        totalAlturaCm += parseInt(heroe.appearance.height[1]);
    });


    let promedio = {
        'Libras': totalPesoLibras,
        'Kilos': totalPesoKilos,
        'Pies': totalAlturaPies,
        'CM': totalAlturaCm
    };
    for (const key in promedio) {
        promedio[key] /= cantidadHeroes;
    }

    return promedio;
  }




  render () {
    const {equipo} = this.props;


    let promedioOrdenado = this.calcularPromedio(equipo);
    let promedioPesoAltura = this.calcularPesoAltura(equipo);

    return (
    <div style={{marginBottom: '40px'}}>
        <h3 class="mb-3">Estadísticas del Equipo Creado</h3>
        <div class="">
            <div className="circleStats">
            <div class="row">
                    {promedioOrdenado?.map(([key,value]) => 
                        <span class="col-6 col-sm-6 col-md-4 col-lg-3 m-0 p-0">
                        <div className="card d-flex flex-column align-items-center text-center ">
                                <div class="card-body">
                                    <CircularProgressbarWithChildren 
                                        value={value}
                                        strokeWidth={50}
                                          styles={buildStyles({
                                            pathColor: `${value>80 ? '#dc3545' : value>50 ? '#fac107' : '#0dcaf0' }`,
                                            strokeLinecap: "butt",
                                            trailColor: '#212529'
                                          })}
                                        >
                                      <div style={{ fontSize: 30 }} >
                                        <strong>{Math.floor(value)}%</strong>
                                      </div>
                                    </CircularProgressbarWithChildren>
                                    <h4 style={{paddingTop: '20px', textTransform: 'uppercase'}}><strong>{key}</strong></h4>
                                </div>
                        </div>      
                        </span>
                    )}
            </div>
            <span className="text-center">
                <h2><strong>Peso</strong>: {promedioPesoAltura['Kilos'].toFixed(2)} Kg, {' '}
                {promedioPesoAltura['Libras'].toFixed(2)} Lb</h2>
                <h2><strong>Altura</strong>: {promedioPesoAltura['CM'].toFixed(2)} CM, 
                {' '}{promedioPesoAltura['Pies'].toFixed(2)} pies</h2>
            </span>
            </div>
        </div>
    </div>
    );
  }
}
