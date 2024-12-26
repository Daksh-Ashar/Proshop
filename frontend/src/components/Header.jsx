import {Badge,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from '../assets/logo.png'
// Importing react router bootstrap
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
const Header = () => {
  const {cartItems} = useSelector( (state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const [logoutApicall]  = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      await logoutApicall().unwrap();
      dispatch(logout())
      navigate('/login')
    }catch(e){
      console.log(e);
    }
  }
    return (
        <Navbar expand="md" bg="dark" data-bs-theme="light" variant="light" collapseOnSelect className="bg-body-tertiary">
            <Container>
              <LinkContainer to='/'>
                    <Navbar.Brand>
                      <b>Proshop</b>
                    </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <SearchBox/>
                <LinkContainer to='/cart'>
                          <Nav.Link><FaShoppingCart/> Cart
                          {cartItems.length > 0 && <Badge pill bg="success" style={{marginLeft:'5px'}}>
                                    {cartItems.reduce((a,c) => a + c.qty, 0)}
                            </Badge>}
                          </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>) : 
                (<LinkContainer to='/login'>
                          <Nav.Link><FaUser/> Sign In</Nav.Link>
                </LinkContainer>)}
                {userInfo && userInfo.isAdmin && (
                <NavDropdown title={"Admin"} id="username">
                  <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Product List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>User List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Order List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/AdminDashboard">
                  <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>)}
                </Nav>
              </Navbar.Collapse>
              
            </Container>
        </Navbar>
    )
}

export default Header;