import React, { useState, useCallback, useEffect } from "react";
import {
	Layout,
	Page,
	Card,
	DataTable,

	Toast,
	Frame,
  Select
} from "@shopify/polaris";
import axios from "axios";

import {Button, Table} from 'react-bootstrap';

export default function DataTableExample() {

  const [shop, setShop] = useState(getCookie("shop"));
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('today');
	const [status, setStatus] = useState('')

	const [message, setMessage] = useState(null);
	const [active, setActive] = useState(false);
		const [error, setError] = useState(null);

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  useEffect(()=>{
    let myShop = getCookie("shop");
		setShop(myShop);
    getData()

  },[])

  function getCookie(name) {
		var cookieArr = document.cookie.split(";");
		for (var i = 0; i < cookieArr.length; i++) {
			var cookiePair = cookieArr[i].split("=");
			if (name == cookiePair[0].trim()) {
				return decodeURIComponent(cookiePair[1]);
			}
		}
		return null;
	}

  const getData = async () => {
		// if (shop && shop.length > 10) {
			// const data = await axios.get(`/order/record/${shop}`);
			const data = await axios.get(`/order/record/${shop}`);
			if (data.data.length>0) {

				setData(data.data)
				// if (Array.isArray(data.data)) {
				// 	setData(data.data);
				// 	setStatus(data.data.status)
				// }
				console.log(data.data);
			}
			else {
				setData([])
			}
	};


  // const rows = [
  //   ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
  //   ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
  //   [
  //     'Navy Merino Wool Blazer with khaki chinos and yellow belt',
  //     '$445.00',
  //     124518,
  //     32,
  //     '$14,240.00',
  //   ],
  // ];



		const toggleActive = useCallback(() => setActive((active) => !active), []);

	const showToast = (msg, err) => {
			err ? setError(true) : setError(false);
			setMessage(msg);
			toggleActive();
		};


	let orderUpdate = async(orderId, item, status)=>{
		let obj = {
			orderId,
			item,
			status
		}
		axios.put(`/order/record/${shop}`, obj)
		.then(data=>{
			console.log(data);
			showToast("Uploaded Successfully", false);
			getData()
		})
		.catch(error=>{
			showToast("Something Wrong", true);
		})
	}

  return (

    <div>
    <Table striped bordered hover size="sm">
<thead>
  <tr>
    <th>#</th>
    <th>Order Id</th>
    <th>Create At</th>
    <th>Customer Name</th>
    <th>Product Name & Action</th>

  </tr>
</thead>
<tbody>

  {data.length>0?(
    data.map((order, key) => (

      <tr>

        <td>{key+1}</td>
        <td data-column="First Name">{order.order.orderId}</td>
        <td data-column="Last Name">{order.order.created_at}</td>
        <td data-column="Job Title">{order.order.first_name} {order.order.last_name}</td>
        <td data-column="Twitter">{order.order.item.map((item, x)=>(
					<tr><td>{item.name}</td>
					<td data-column="Twitter">
	            <select value={item.status} onChange={(e)=>setStatus(e.target.value)}>
								{item.tagValue.map((tag, l) => (
									<option value={tag}>{tag}</option>
								))
								}

	            </select>
	        </td>

					<td><Button onClick={()=>orderUpdate(order.order.orderId, item, status)}>Save</Button></td>
					</tr>

				))}</td>


      </tr>
    ))):("No Order Found")}
</tbody>
</Table>
    </div>


  );
}
