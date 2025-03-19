// import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.css';
import "./user.css";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const User = () => {
    const [users, setUsers] = useState([]);	
	const [isOpen, setIsOpen] = useState(false);	

	const { role, id } = useParams()
	const navigate = useNavigate();

	useEffect(() => {
			if (role==="DISTRIBUTOR"){
				const fetchData =async ()=>{
				await axios.get(`http://localhost:5000/api/userInfo/${id}`)
				.then((response) => { console.log(response.data);setUsers(response.data);}
			)
				}
				fetchData();
			}
			else if (role==="SHOP") {
				const fetchData = async ()=>{
					await axios.get(`http://localhost:5000/api/deviceDetails/${id}`)
					.then((response)=> {setUsers(response.data);})
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

		useEffect(()=>{
			try{
			if (isOpen){
				const fetchData = async () => {
					await axios.get(`http://localhost:5000/api/counts/${id}`)
					.then ((response) => {setUsers(response.data);})
				}
				fetchData();
			}
			
			
			} catch (error) {
				console.log(error)
			}
			
		}, [isOpen])
	
	


		return (
			<>
			<div className='user-table'>
				<table border={1} cellPadding={10} cellSpacing={0}>
			
					<thead>
						<tr>
							{
								role === 'DISTRIBUTOR' ? (
									<>
										<th>SHOP'S</th>
										<th>DEVICE'S</th>
									</>
								) : role === 'SHOP' ? (
									<>
										<th>VERSION'S</th>
										<th>MAC-ADDRESS</th>
									</>
								) : (
									<>
										<th>DISTRIBUTOR'S</th>
										<th>SHOP'S</th>
										<th>COUNT'S</th>
									</>
								)
							}
							{/* { role === "DISTRIBUTOR"? <th>SHOPS</th>:<th>DISTRIBUTORS</th>}
							{role ==="DISTRIBUTOR" ? <th>DEVICE</th> :<th>SHOPS</th> } */}
							{/* {role==="SHOP" }  {role==="DISTRIBUTOR"} <th>version</th> <th>mac</th>  */}
						
						</tr>
					</thead>

					<tbody>
				
							{users.map((user)=> (
								role === "SHOP" ? 
								<tr key={`shop_${user.id}`}>
								  <td>{user?.details?.version}</td>
								  <td>{user?.details?.macAddress}</td>
								  {/* <td>{user?.counts}</td> */}

								</tr> : 
								<tr key={user.id}>
								  <td>{user.username}</td>
								  <td className="link-primary text-decoration-underline"  onClick={()  => navigate(`/${user.role}/${user._id}`)}>{user.shopCount}</td>
								  <td> <button class="btn btn-info" onClick={() => setIsOpen(true)} >View</button>
								  <Modal
								  	show={isOpen}
									size="lg"
									aria-labelledby="contained-modal-title-vcenter"
									centered
									>
									<Modal.Header closeButton>
										<Modal.Title id="contained-modal-title-vcenter">
										List
										</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<h4>TOTAL NO. OF COUNT'S</h4>
										<p>
										<div class="modal-body">
									<table class="table table-striped">
									<thead>
									<tr>
									<th>Shop's</th>
									<th>Cashier</th>
									<th>Kiosk</th>
									<th>Machines</th>
									</tr>
									</thead>
									</table>
									</div>
									</p>
									</Modal.Body>
									<Modal.Footer>
										<Button onClick={() => setIsOpen(false)}>Close</Button>
									</Modal.Footer>
									</Modal>
						</td>
	  
					</tr>
								
								
				 ))}
							
				</tbody>
					
					
				</table>
			</div>
		</>
		  )
};
		export default User;
		
