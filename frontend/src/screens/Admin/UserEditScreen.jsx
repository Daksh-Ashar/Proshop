import { useState,useEffect } from "react";
import { Link, useNavigate,  useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Message from "../../components/Message";
import { Form,Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {useGetUserDetailsQuery,useUpdateUserDetailsMutation} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
    const {id: userId} = useParams();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [isAdmin,setIsAdmin] = useState(false);
    

    const {data: user, isLoading, refetch, error} = useGetUserDetailsQuery(userId);
    const [updateUser, {isLoading: LoadingUpdate}] = useUpdateUserDetailsMutation();
    const navigate = useNavigate();
    const SubmitHandler = async (e)=> {
        e.preventDefault();
        const Obj = {
            userId,
            name,
            email,
            isAdmin
        }
        const result = await updateUser(Obj);
        if(result.error)
        {
            toast.error(result.error);
        }else{
            toast.success("User updated");
            navigate('/admin/userlist')
        }
    }

    useEffect(()=>{
        if(user)
        {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[user])
    return <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
        GO Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
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
                     <Form.Group controlId="Email" className="my-2">
                         <Form.Label>Email</Form.Label>
                         <Form.Control
                             type="email"
                             placeholder="Enter Email"
                             value={email}
                             onChange={(e)=>{setEmail(e.target.value)}}
                             ></Form.Control>
                     </Form.Group>
                     <Form.Group controlId="isAdmin" className="my-2">
                         <Form.Check
                             type="checkbox"
                             label="Is Admin"
                             checked={isAdmin}
                             onChange={(e)=>{setIsAdmin(e.target.checked)}}
                             ></Form.Check>
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

export default UserEditScreen;