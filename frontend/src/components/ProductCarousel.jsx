import { Carousel } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";
import {Image} from "react-bootstrap";
const ProductCarousel = () => {
    const {data:products, isLoading, error} = useGetTopProductsQuery();
    return (
        isLoading ? <Loader/> : error ? <Message variant={"danger"}>{error}</Message> : 
        (
            <Carousel pause="hover" className="bg-primary mb-4">
                {
                    products.map((products)=> {
                      return  <Carousel.Item key={products._id}>
                            <Link to={`/product/${products._id}`}>
                                <Image src={products.image} alt={products.name} fluid/>
                                <Carousel.Caption className="carousel-caption">
                                    <h2>{products.name} (${products.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    })
                }
            </Carousel>
        )
    )
}

export default ProductCarousel;