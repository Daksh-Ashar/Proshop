import {Row,Col} from 'react-bootstrap';
import ProductCard from '../components/ProductCard.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import Loader from "../components/Loader.jsx";
import Message from '../components/Message.jsx';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate.jsx';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel.jsx';
import Meta from '../components/Meta.jsx';

const HomeScreen = () => {
    const {pageNumber,keyword} = useParams();
    const {data,isLoading,Error} = useGetProductsQuery({pageNumber,keyword});
    return (
        <>
        {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-dark mb-4">Go Back</Link>}
         {isLoading ? (<Loader/>) : Error ? (<Message variant="danger">{Error?.data?.message || Error.Error}</Message>) : 
            (<>
            <Meta/>
            <h1>Latest products</h1>
            <Row>
                {
                data.products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={3} className='my-2'>
                        <ProductCard product={product} />
                    </Col>
                )
                    //console.log(product.name)
                )
                
                }
            </Row>
            <Paginate 
            pages={data.pages}
            page={data.page}
            keyword={keyword}
            />
            </>)
         }
        </>
    )
}


export default HomeScreen;