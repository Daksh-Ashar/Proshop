import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col,Button } from "react-bootstrap";
import {FaEdit,FaTrash} from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
    const {pageNumber} = useParams();
    const {data,isLoading,error, refetch} = useGetProductsQuery({pageNumber});
    const [createProduct, {isLoading: LoadingCreate, error: loadingError}] = useCreateProductMutation();
    const [updateProduct, {isLoading: LoadingUpdate, error: updateProductError}] = useUpdateProductMutation();
    const [deleteProduct, {isLoading: LoadingDelete, error: deleteProductError}] = useDeleteProductMutation();
    const deleteHandler = async (id)=> {
        if(window.confirm("Are you sure you want to delete a product?"))
            {
                try{
                    await deleteProduct(id);
                    refetch();
                    toast.success("Product deleted Successfully.")
                }catch(err){
                    toast.error(err.data.message || err.message)
                }
            }
    }

    const createProductHandler = async () => {
        if(window.confirm("Are you sure you want to create a new product?"))
            {
                try{
                    await createProduct();
                    refetch();
                    toast.success("Product created Successfully.")
                }catch(err){
                    toast.error(err.data.message || err.message)
                }
            }
    }
    return (
        <Row>
            <Col>
                    <h1>Produts</h1>
            </Col>
            <Col className="text-end">
                <Button className="btn-sm m-3" onClick={createProductHandler}>
                    <FaEdit/>Create Product
                </Button>
            </Col>
            { (LoadingCreate || LoadingDelete) && <Loader/>}
            {
                        isLoading ? <Loader/> : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
                            <>
                            <Table striped hover responsive className="table-sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {data?.products?.map((product)=>{
                                           return <tr key={product._id}>
                                                <td>{product._id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.category}</td>
                                                <td>{product.brand}</td>
                                                <td>
                                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                        <Button variant="light" className="btn-sn mx-2">
                                                            <FaEdit/>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button variant="danger" className="btn-sn mx-2" onClick={()=>deleteHandler(product._id)}>
                                                            <FaTrash style={{color:"white"}}/>
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                </tbody>
                            </Table>
                            <Paginate 
                            pages={data.pages}
                            page={data.page}
                            isAdmin={true}
                            />
                            </>
                        )
                    }
        </Row>
    )
}

export default ProductListScreen;