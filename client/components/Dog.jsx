import React from 'react';

const Dog = (info) => {

  let imgSrc;
  if (!info.props.photos.length) imgSrc='https://i.redd.it/u9dewehsm0771.jpg'
  else imgSrc = Object.values(info.props.photos[0])[0];

  let color;
  if (!info.props.colors.primary) color = 'Fun-Colored';
  else color = info.props.colors.primary;

  let url;
  //can probably error handle this better
  if (!info.props.url) url = 'https://www.petfinder.com/'
  else url = info.props.url;

  const addFav = () => {
    fetch('/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        favs_id: info.props.id,
        breed: info.props.breeds.primary,
        age: info.props.age,
        gender: info.props.gender,
        color: color,
        image: imgSrc,
        url: url,
        name: info.props.name,
      })
    })
    .then(resp => resp.json())
    .then(data => {
      info.callback(Object.values(data))
    });
  }

  return (
    <>
      <div className='dog' style={{textAlign: "center"}}>
        <a href={url} target="_blank"> 
        <div id="photo"> 
          <img id='cardImg' src={imgSrc}/>
        </div>
        </a>
        <h3 id="name">Name: {info.props.name}</h3>
      {/* <h3 id="breed">Breed: {info.props.breeds.primary}</h3> */}
        <h3 id="colors">Colors: {color}</h3>
        <h3 id="age">Age: {info.props.age}</h3>
        <h3 id="gender">Gender: {info.props.gender}</h3>
        {/*addFav() makes request, callback*/}
        <button className="add" id={`${info.props.id}`} onClick={() => {addFav()}}>Add Favorite</button>
      </div>
    </>
  )
}

export default Dog;