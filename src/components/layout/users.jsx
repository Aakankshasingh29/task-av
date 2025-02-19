import React from 'react'; 
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.css';



export default function TableExample() { 
return ( 
	<> 

<h3>Default Variant Small Size Theme Table</h3> 

<Table stripped bordered hover size="sm"> 
<thead> 
	<tr> 
	<th width="170">Student Name</th> 
	<th width="170">Reg.no</th> 
	<th width="170">Course</th> 
	<th width="870">City Name</th> 
	<th width="1950">Percentage</th> 

	</tr> 
</thead> 
<tbody> 
	<tr> 
	<td>Rakesh</td> 
	<td>1123</td> 
	<td>CSE</td> 
	<td>Mumbai</td> 
	<td>86.9%</td> 

	</tr> 
	<tr> 
	<td>Jackson</td> 
	<td>1124</td> 
	<td>ECE</td> 
	<td>Hyderabad</td> 
	<td>72.4%</td> 

	</tr> 
	<tr> 
	<td>Keshav</td> 
	<td>1124</td> 
	<td>CSE</td> 
	<td>Chennai</td> 
	<td>88%</td> 

	</tr> 
	<tr> 
	<td>Neilesh Jain</td> 
	<td>1125</td> 
	<td>EEE</td> 
	<td>Gwalior</td> 
	<td>66.9%</td> 

	</tr> 
	<tr> 
	<td>Akbar sheikh</td> 
	<td>1126</td> 
	<td>Mechanical</td> 
	<td>Indore</td> 
	<td>96.5%</td> 

	</tr> 
	<tr> 
	<td>Sarita</td> 
	<td>1127</td> 
	<td>CSE</td> 
	<td>Delhi</td> 
	<td>96.9%</td> 

	</tr> 

</tbody> 
</Table> 
	</> 
); 
}
