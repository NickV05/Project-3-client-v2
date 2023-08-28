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
            console.log("All products:", response.data);
            const Arr = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item) => {
                return item
            })
            console.log("Array ===> ", Arr)
            setItem(Arr)
          })
          .catch((error) => console.log(error));
      };

      useEffect(() => {
        getAllProducts();
      },[])
  return (
    <div className="h-2/3 w-2/3 ml-28 ">
      <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000}>
        {items.map((newItem, index) => (
          <Link to={`/product-details/${newItem._id}`}>
          <div key={index}>
            <p className = "font-bold text-white opacity-75">{newItem.name}</p>
            <img className='h-96 w-48' src={newItem.image} alt={`Slide ${index}`} />
          </div>
            </Link>
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
