import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import {Row,Col,Image,ListGroup,Button} from 'react-bootstrap';
import Rating from "../components/Rating.jsx";
import { useGetProductByIdQuery, useCreateReviewsMutation } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from '../components/Message.jsx';
import { addToCart } from "../slices/cartSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import Meta from "../components/Meta.jsx";

const ProductScreen = () => {
    const {id: productId} = useParams();
    const {data:product,refetch, isLoading, Error} = useGetProductByIdQuery(productId);
    const [createReview, {isLoading:  LoadingProductReview}] = useCreateReviewsMutation();
    const [qty,setQty] = useState(1);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");
    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = async (e)=> {
        e.preventDefault();
        try{
            await createReview({
                productId,
                rating,
                comment
            }).unwrap();
            refetch();
            toast.success("Review Submitted");
            setRating(0)
            setComment("")
        }catch(err){
            toast.error(err?.data?.message || err?.error)
        }
    }
    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}));
        navigate('/cart')
    }
    return (
        <>
            {isLoading ? (<Loader/>) : Error ? (<Message variant="danger">{Error?.data?.message || Error.Error}</Message>) : (
                <>
                <Meta title={product.name} />
                <Link to="/" className="btn btn-light my-2">
                Go Back
                </Link>
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={4}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>{product.name}</ListGroup.Item>
                      <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`}/></ListGroup.Item>
                      <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                      <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                          <ListGroup.Item>${product.price}</ListGroup.Item>
                          <ListGroup.Item>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</ListGroup.Item>
                         {
                            product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row> 
                                        <Col>QTY:</Col>
                                        <Col> 
                                                <Form.Select  value={qty} onChange={(e)=> setQty(Number(e.target.value))} size="sm">
                                                    {[...Array(product.countInStock).keys()].map((x)=> (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                   ))}
                                                </Form.Select>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                          } 
                          <ListGroup.Item>
                            <Button variant="dark" disabled={product.countInStock === 0}
                            onClick={addToCartHandler}>Add to Cart</Button></ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="review">
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                {
                                    product.reviews.map((review)=>{
                                        return (
                                            <ListGroup.Item key={review._id}>
                                                <strong>review.name</strong>
                                                <Rating value={review.rating}/>
                                                <p>{review.createdAt.substring(0,10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                                <ListGroup.Item>
                                    <h2>Write a customer review</h2>
                                    {LoadingProductReview && <Loader/>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={(e)=>setRating(e.target.value)}>
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment" className="my-2">
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e)=>{setComment(e.target.value)}}
                                                    >
                                                    </Form.Control>
                                            </Form.Group>
                                            <Button
                                            //disabled={LoadingProductReview}
                                            type="submit"
                                            variant="Primary"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                                Please <Link to="/login">sign in</Link> to write a review  
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                </Row>
            </>
            )}
        </>
    )
}

export default ProductScreen;