// import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.css';
import "./user.css";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'



// export default function TableExample() { 
// return ( 
// 	<> 

{/* <h3 className='table'>Default Variant Small Size Theme Table</h3>  */}

{/* <div className='user-table'>
<Table stripped bordered hover size="md"> 
<thead > 
	<tr> 
	<th width="170">Distributor</th> 
	
	<th width="1950">shops</th> 

	</tr> 
</thead> 
<tbody> 
	<tr> 
	<td>Rakesh</td> 

	<td>86.9%</td> 

	</tr> 
	<tr> 
	<td>Jackson</td> 
	
	<td>72.4%</td> 

	</tr> 
	<tr> 
	<td>Keshav</td> 
	
	<td>88%</td> 

	</tr> 
	<tr> 
	<td>Neilesh Jain</td> 
	
	<td>66.9%</td> 

	</tr> 
	<tr> 
	<td>Akbar sheikh</td> 

	<td>96.5%</td> 

	</tr> 
	<tr> 
	<td>Sarita</td> 

	<td>96.9%</td> 

	</tr> 

</tbody> 
</Table> 
</div>
	</> 

); */}
{/*  
} */}

const User = () => {
    const [users, setUsers] = useState([]);	

	const { role, id } = useParams()
	console.log(role, "role")
	console.log(id, "id")
 
	const navigate = useNavigate();
    useEffect(()=>
    {
        const fetchData = async ()=>{
            await axios.get("http://localhost:5000/api/getUsers/").then((response) => {
                setUsers(response.data);
            })
        }
        fetchData();

        },[])
		
		// const [shopCount, setShopCount] = useState([]);

		useEffect(() => {
			if (role==="DISTRIBUTOR"){
				const fetchData =async ()=>{
				await axios.get(`http://localhost:5000/api/userInfo/${id}`)
				.then((response) => { setUsers(response.data);}
			)
				}
				fetchData();
			}
			else if (role==="SHOP") {
				const fetchData = async ()=>{
					await axios.get("http://localhost:5000/api/DeviceDetails/").then ((response)=>{
						setUsers(response.data);
					})
				}
				fetchData();
			}
			
			else{
				const fetchData = async ()=>{
					await axios.get("http://localhost:5000/api/getUsers/").then((response) => {
						setUsers(response.data);
					})
				}
				fetchData();
			}

			
		},[role] )


		return (
			<>
			{/* const handleActionItemClick = (item, itemID) => {
    var updateItem = item.toLowerCase();
    if (updateItem === "delete") {
      alert(`#${itemID} item delete`);
    } else if (updateItem === "edit") {
      navigate(`/catalog/product/manage/${itemID}`);
    }
  }; */}
			<div className='user-table'>
				<table border={1} cellPadding={10} cellSpacing={0}>
			
					<thead>
						<tr>
							{ role === "DISTRIBUTOR"? <th>SHOPS</th>: <th>DISTRIBUTORS</th>}
							{role ==="DISTRIBUTOR" ? <th>DEVICE</th>:<th>SHOPS</th>}




						</tr>
					</thead>

					<tbody>
				
							{users.map((user)=> (
								<tr key={user.id}>
								  <td>{user.username}</td>
								  <td className="link-primary text-decoration-underline"  onClick={()  => navigate(`/${user.role}/${user._id}`)}>{user.shopCount}</td>
								</tr>
							  ))}
					</tbody>
				</table>
			</div>
			</>
		  )
		}
		
		export default User;
		
