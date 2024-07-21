import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
//imprt './index.css'
import './style.css'


const { useState, useEffect } = React;

const loadPhotos = async() => {
    // Task 1A
    // Load the data from:
    // GET https://picsum.photos/v2/list?limit=10
    // Display the photo and the author's name underneath
    const resp = await fetch("https://picsum.photos/v2/list?limit=10");
    const data = await resp.json();
    return data;
    
};



const onPhotoClick = () => {
    // Task 2A
    // When a user clicks the image, add a green border to it
    // When they click it again, remove the green border
};

const SelectedPhotoCounter = () => {
    // Task 2B
    // Display a count of the number of selected images
    return (
        <div>Number of selected photos: 0</div>
    );
};

const SearchBar = () => {
    // Task 3
    // Build a live search bar that filters the list of photos
    // by author name
    return (
        <div>Add a search bar here</div>
    );
};

const GalleryItem = ({photo}) => {
    
    return (
      <div className="gallery-item" onClick={onPhotoClick}>
      {/* <span>{photo.author}</span>
      <img src={photo.download_url} style={{width:100, border: selectedItem == photo.id? "3px solid green" : '1px solid white'}} onClick={()=>handleClick(photo)}/> */}
  </div>
    );
};

const Gallery = ({photos}) => {
    
    const [selectedItem, setSelectedItem] = useState([]);
    function handleClick(photo)
    {
        console.log(photo)
        setSelectedItem([...selectedItem, photo]);
        console.log(selectedItem);
    }
    
    return (
        <div className="gallery">
          {photos.map((photo) =>{
            return <GalleryItem key={photo.id} photo={photo} />
          })}
        </div>
    );
};

const App = () => {
    
    const [data, setData] = useState([]);

    
    useEffect(()=>
    {
        loadPhotos().then(response=>{
          console.log(response)
          setData(response);
    });

    },[]);
    
    // const photos = [
    //     { id: 1, author: 'Alice' },
    //     { id: 2, author: 'Bob'},
    //     { id: 3, author: 'Charlie'}
    // ];
    
    return (
        <div id="app">
            <SearchBar />
            <SelectedPhotoCounter />
            <Gallery photos={data} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
