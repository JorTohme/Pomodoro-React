import React from "react";
import './Timer.css';
import { useState, useEffect } from 'react';

function Timer() {

  const [title, setTitle] = useState(" ")
  const [sessionNumber, setSessionNumber] = useState(1)
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [countDown, setCountdown] = useState(false);
  const [pause, setPause] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);

  // Aumenta o disminuye los minutos de 5 en 5 antes de iniciar la cuenta.
  function handleButtons(aument) {
    if (aument) {
      if (minutes !== 60) { setMinutes(minutes + 5); }
    } else {
      if (minutes !== 5) { setMinutes(minutes - 5); }
    }
  }

  // Se activa junto cuando se clickea "Iniciar" e inicia la cuenta regresiva
  useEffect(() => {
    let interval = setInterval(() => {
      if (countDown) {
        clearInterval(interval);
        setTitle("Sesión "+ sessionNumber);
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            setTitle("DESCANSO");
            document.getElementById("clock").style.backgroundColor = '#ff000094';
            setMinutes(5)
            setCountdown(false);
            setPause(true);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
  });

  useEffect(() => {
    let interval = setInterval(() => {
      if (pause) {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            document.getElementById("clock").style.backgroundColor = 'transparent';
            setMinutes(selectedTime);
            setCountdown(true);
            setPause(false);
            setSessionNumber(sessionNumber + 1);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
  });

  // Mejora el cómo se ven los números en el reloj, ya que al pasarles valores de, por ejemplo
  // 0, se vería 15:0; esto lo soluciona.
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  function startCountdown()  {
    setCountdown(true);
    setSelectedTime(minutes);
    document.getElementById("button-1").style.display = 'none';
    document.getElementById("button-2").style.display = 'none';
    document.getElementById("button-3").style.display = 'none';
    document.getElementById("timer-container").style.width = 'auto';
  }

  return (
    <main>
      <h2>{title}</h2>
      <div className="timer-container" id="timer-container">
        <p className="clock not-selectable" id="clock">
          <span id="minutes">{timerMinutes}</span>
          :
          <span id="seconds">{timerSeconds}</span>
        </p>
        <div className="buttons">
          <button id="button-1" onClick={() => handleButtons(true)}>+5 mins</button>
          <button id="button-2" onClick={() => handleButtons(false)}>-5 mins</button>
        </div>
      </div>
      <div id="init-button">
        <button id="button-3" onClick={() => startCountdown()}>INICIAR</button>
      </div>
    </main>
  )
}

export default Timer;