import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import UsuarioServicio from "../services/UsuarioServicio";

export default class Arg extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nuevoCampeon: 0
    }
  }


  render () {
    const {equipo} = this.props;

    let totalHeroes = 0; 
    equipo.forEach(heroe => {
        totalHeroes += 1;
    });

    let totalInteligencia = 0; 
    equipo.forEach(heroe => {
        totalInteligencia += parseInt(heroe.powerstats['intelligence']);
    });
    totalInteligencia /= totalHeroes;

    let totalFuerza = 0; 
    equipo.forEach(heroe => {
        totalFuerza += parseInt(heroe.powerstats['strength']);
    });
    totalFuerza /= totalHeroes;
    let totalVelocidad = 0; 
    equipo.forEach(heroe => {
        totalVelocidad += parseInt(heroe.powerstats['speed']);
    });
    totalVelocidad /= totalHeroes;

    let totalDurabilidad = 0; 
    equipo.forEach(heroe => {
        totalDurabilidad += parseInt(heroe.powerstats['durability']);
    });
    totalDurabilidad /= totalHeroes;

    let totalPoder = 0; 
    equipo.forEach(heroe => {
        totalPoder += parseInt(heroe.powerstats['power']);
    });
    totalPoder /= totalHeroes;

    let totalCombate = 0; 
    equipo.forEach(heroe => {
        totalCombate += parseInt(heroe.powerstats['combat']);
    });
    totalCombate /= totalHeroes;


    let totalKilos = 0; 
    equipo.forEach(heroe => {
        totalKilos += parseInt(heroe.appearance.weight[1]);
    });
    totalKilos /= totalHeroes;

    let totalAlturaCm = 0; 
    equipo.forEach(heroe => {
        totalAlturaCm += parseInt(heroe.appearance.height[1]);
    });
    totalAlturaCm /= totalHeroes;

    let total = {'Inteligencia': totalInteligencia, 'Fuerza': totalFuerza, 'Velocidad': totalVelocidad, 'Durabilidad': totalDurabilidad, 'Poder': totalPoder, 'Combate': totalCombate};

    var ordenado = [];
    for (var poderes in total) {
        ordenado.push([poderes, total[poderes]]);
    }

    ordenado.sort(function(a, b) {
      return b[1] - a[1];
    });


    return (
    <div style={{marginBottom: '40px'}}>
        <h3 class="mb-3">Poder del Equipo</h3>
        <div class="card ">
            <div class="card-body">
            {ordenado?.map(([key,value]) => 
                <>
                    <p><strong>{key}</strong> ({value.toFixed(2)}%)</p>
                    <div class="progress mb-3" style={{height: '15px'}}>
                            <div class={`progress-bar ${value>80 ? 'bg-danger' : value>50 ? 'bg-warning' : 'bg-info' }`} role="progressbar" style={{width: `${value.toFixed(2)}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" ></div>
                    </div>
                </>
            )}
            <p><strong>Altura</strong>: {totalAlturaCm.toFixed(2)} centímetros</p>
            <p><strong>Peso</strong>: {totalKilos.toFixed(2)} kilos</p>
            </div>
        </div>
    </div>
    );
  }
}
