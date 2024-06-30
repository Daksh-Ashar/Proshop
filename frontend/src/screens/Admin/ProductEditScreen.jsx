import { useState,useEffect } from "react";
import { Link, useNavigate,  useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Message from "../../components/Message";
import { Form,Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useUpdateProductMutation , useGetProductByIdQuery} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
    const {id: productId} = useParams();
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [image,setImage] = useState("");
    const [brand,setBrand] = useState("");
    const [category,setCategory] = useState("");
    const [countInStock,setCountInStock] = useState("");
    const [description,setDescription] = useState("");

    const {data: product, isLoading, refetch, error} = useGetProductByIdQuery(productId);
    const [updateProduct, {isLoading: LoadingUpdate}] = useUpdateProductMutation();
    const navigate = useNavigate();
    const SubmitHandler = async (e)=> {
        e.preventDefault();
        const Obj = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }
        const result = await updateProduct(Obj);
        if(result.error)
        {
            toast.error(result.error);
        }else{
            toast.success("Product updated");
            navigate('/admin/productlist')
        }
    }

    useEffect(()=>{
        if(product)
        {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    },[product])
    return <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
        GO Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {LoadingUpdate && <Loader/>}

            {
            isLoading ? <Loader/> :  error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : 
            (
                 <Form onSubmit={SubmitHandler}>
                     <Form.Group controlId="name" className="my-2">
                         <Form.Label>Name</Form.Label>
                         <Form.Control
                             type="text"
                             placeholder="Enter name"
                             value={name}
                             onChange={(e)=>{setName(e.target.value)}}
                             ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId="price" className="my-2">
                         <Form.Label>Price</Form.Label>
                         <Form.Control
                             type="number"
                             placeholder="Enter Price"
                             value={price}
                             onChange={(e)=>{setPrice(e.target.value)}}
                             ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId="brand" className="my-2">
                         <Form.Label>Brand</Form.Label>
                         <Form.Control
                             type="text"
                             placeholder="Enter brand"
                             value={brand}
                             onChange={(e)=>{setBrand(e.target.value)}}
                             ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId="category" className="my-2">
                         <Form.Label>Category</Form.Label>
                         <Form.Control
                             type="text"
                             placeholder="Enter category"
                             value={category}
                             onChange={(e)=>{setCategory(e.target.value)}}
                             ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId="countInStock" className="my-2">
                         <Form.Label>Count In Stock</Form.Label>
                         <Form.Control
                             type="number"
                             placeholder="Enter Count In Stock"
                             value={countInStock}
                             onChange={(e)=>{setCountInStock(e.target.value)}}
                             ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId="description" className="my-2">
                         <Form.Label>Description</Form.Label>
                         <Form.Control
                             type="text"
                             placeholder="Enter description"
                             value={description}
                             onChange={(e)=>{setDescription(e.target.value)}}
                             ></Form.Control>
                     </Form.Group>
                     <Button 
                     type="submit"
                     variant="primary"
                     className="my-2"
                     >Update</Button>
                 </Form>
                
            )
            }
        </FormContainer>
    </>
}

export default ProductEditScreen;