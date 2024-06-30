// Importing Bootstrap items
import Card from 'react-bootstrap/Card';
// Importing React router items
import { Link } from 'react-router-dom';
//Importing Components
import Rating from './Rating.jsx';

const productCard = ({product}) => {
    return (
        <Card>
            <Link>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" className='product-title'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                    <Card.Text as="h3">
                        ${product.price}
                    </Card.Text>
                    <Card.Text as="div">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}>
                            </Rating>
                    </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default productCard;