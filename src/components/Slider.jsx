import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { get } from '../services/authService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {

    const [items, setItem] = useState([]);

    const getAllProducts = () => {
        get("/items")
          .then((response) => {
            const Arr = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item) => {
                return item
            })
            setItem(Arr)
          })
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllProducts();
      },[])
  return (
    <div className=" w-full shadow-xl">
      <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000}>
        {items.map((newItem, index) => (
          <Link to={`/product-details/${newItem._id}`}>
          <div key={index}>
            <img className=' h-80 md:h-screen w-48 shadow-xl' src={newItem.image} alt={`Slide ${index}`} />
          </div>
            </Link>
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
