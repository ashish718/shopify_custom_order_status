import React, { useState, useCallback, useEffect } from "react";
import {
	Layout,
	Page,
	Card,
	DataTable,
	Button,
	Toast,
	Frame,
} from "@shopify/polaris";
import axios from "axios";

export default function Cresentials() {
	const [shop, setShop] = useState(getCookie("shop"));
	const [data, setData] = useState([]);

	const [active, setActive] = useState(false);

	const toggleActive = useCallback(() => setActive((active) => !active), []);

	const toastMarkup = active ? (
		<Toast content="Requested successfully, refresh now" onDismiss={toggleActive} />
	) : null;
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

	useEffect(() => {
		let myShop = getCookie("shop");
		setShop(myShop);
		getData();
		console.log(shop);
	}, []);
	// const getData = useCallback(async () => {
	// 	if (shop && shop.length > 10) {
	// 		const data = await axios.get(`/order/failed/${shop}`);
	// 		if (data.data.length>0) {
	// 			if (Array.isArray(data.data)) {
	// 				setData(data.data);
	// 			}
	// 			console.log(data.data);
	// 		}
	// 		else {
	// 			setData([])
	// 		}
	// 	}
	// }, []);
	// const orderFailed = useCallback(async () => {
	// 	try {
	// 		let res = await axios.get(`/order/trigger/failed/${shop}`);
	// 		console.log(res);
	// 		getData();
	// 		if (res) {
	//
	// 			toggleActive();
	// 		}
	// 	} catch (error) {
	//
	// 		console.log(error);
	// 	}
	// }, []);

	const getData = async () => {
		// if (shop && shop.length > 10) {
			// const data = await axios.get(`/order/record/${shop}`);
			const data = await axios.get(`/order/record/demo-mojito.myshopify.com`);
			if (data.data.length>0) {
				if (Array.isArray(data.data)) {
					setData(data.data);
				}
				console.log(data.data);
			}
			else {
				setData([])
			}
		//}
	};



	return (
		<Frame>
			<Page title="Orders">
				<br />
				<br />
				<Layout>
					{data.length > 0 ? (
						<Card sectioned>


							<table>
								<thead>
									<tr>

										<th>Order Id</th>
										<th>Created at</th>
										<th>Customer Name</th>
										<th>Order items</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data.map((order) => (
											<tr>
												<td data-column="First Name">{order.order.name}</td>
												<td data-column="Last Name">{order.order.created_at}</td>
												<td data-column="Job Title">{order.order.customer.first_name} {order.order.customer.last_name}</td>
												<td data-column="Twitter">
												{order.order.line_items.map((item, i) =>
													 (
													<li style={{}}>{item.name}</li>
												))
												}
												</td>
												<td data-column="Twitter">
														<select value="Change">
															<option value="Orange">Change Status</option>
															<option value="Orange">Status 1</option>
															<option value="Radish">Status 2</option>
															<option value="Cherry">Status 3</option>
														</select>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</Card>
					) : (
						<p style={{ marginTop: 100, fontSize: 20 }}>No Order yet</p>
					)}
					{toastMarkup}
				</Layout>
			</Page>
		</Frame>
	);
}

//trigger
