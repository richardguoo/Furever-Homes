import React from 'react';

const Favs = (info) => {

  const deleteFav = () => {
    fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favs_id: info.props.favs_id,
      }),
    })
    .then(resp => resp.json())
    .then(data => {
      info.callback(Object.values(data))
    })
  }
  return (
    <>
    <div className='favs' style={{textAlign: "center"}}>
      <a href={info.props.url} target="_blank"> 
        <h2 id="photo"> 
          <img id='cardImg' src={info.props.image}/>
        </h2>
      </a>
      <h2>Name: {info.props.name}</h2>
      <h2>Breed: {info.props.breed}</h2>
      <h2>Colors: {info.props.color}</h2>
      <h2>Age: {info.props.age}</h2>
      <h2>Gender: {info.props.gender}</h2>
      <button id="delete" onClick={() => {deleteFav()}}>Delete Favorite</button>
    </div>
    </>
  )
}

export default Favs;