import React, { useState, useEffect } from 'react';
import Dog from './Dog.jsx';
import Favs from './Favs.jsx';

const HomePage = () => {
  const [display, useDisplay] = useState([]);
  const [favs, useFavs] = useState([]);
  const [breed, useBreed] = useState('');
  const [colors, useColors] = useState('');
  const [age, useAge] = useState('');
  const [gender, useGender] = useState('');
  
  const dogSearch = () => {
    fetch(`/dogs?breed=${breed}&color=${colors}&age=${age}&gender=${gender}`)
      .then(res => res.json())
      .then(res => useDisplay(res.animals))
      .catch(err => console.log('dogSearch failed'))
  }

  const closeDogs = () => {
    useDisplay([]);
  }

  const dogsArr = [];
  for (let i = 0; i < display.length; i++) {
    dogsArr.push(<Dog key={`dog${i}`} props={display[i]} callback={useFavs} />)
  }
  
  useEffect(() => {
    fetch('/favorite')
      .then(res => res.json())
      .then(res => useFavs(Object.values(res)))
      .catch(err => console.log('error in fetching favs'))
  }, [])

  const favsArr = [];
  for (let i = 0; i < favs.length; i++) {
    favsArr.push(<Favs key={`fav${i}`} props={favs[i]} callback={useFavs}/>)
  }
  
  return(
    <>
    {favs.length !== 0 && <h1 className="welcome" style={{textAlign: 'center'}}>ur fav doggos</h1>}
    <div className="dogContainer">
      {favsArr}
    </div>
    <h1 className="welcome" style={{textAlign: 'center'}}>u lookin for doggo?</h1>
    <h3 className="welcome" style={{textAlign: 'center'}}>well what u want dog to b like</h3>
    <div style={{textAlign: 'center'}}>
      <div className="input">
        Breed 
        <input type='text' id='Breed' onChange={() => useBreed(document.getElementById('Breed').value)}/>
      </div>
      <div className="input">
        Colors 
        <input type='text' id='Colors' onChange={() => useColors(document.getElementById('Colors').value)}/>
      </div>
      <div className="input">
        Age 
        <input type='text' id='Age' onChange={() => useAge(document.getElementById('Age').value)}/>
      </div>
      <div className="input">
        Gender 
        <input type='text' id='Gender' onChange={() => useGender(document.getElementById('Gender').value)}/>
      </div>
      <br/>
      <div>
        <button id="search" onClick={() => dogSearch()}>
          Do the search
        </button>
        <br/>
        <button id="close" onClick={() => closeDogs()}>
          I dont wanna look at the doggos anymore
        </button>
      </div>
    </div>
    <br/>
    <div className="dogContainer">
      {dogsArr}
    </div>
    </>
  )
}
export default HomePage;

