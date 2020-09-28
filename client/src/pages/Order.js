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
		if (shop && shop.length > 10) {
			const data = await axios.get(`/order/record/${shop}`);
			if (data.data.length>0) {
				if (Array.isArray(data.data)) {
					setData(data.data);
				}
				console.log(data.data);
			}
			else {
				setData([])
			}
		}
	};

	const orderFailed = async () => {
		try {
			let res = await axios.get(`/order/record/${shop}`);
			console.log(res);

			if (res) {
				getData();
				toggleActive();
			}
		} catch (error) {

			console.log(error);
		}
	};


	return (
		<Frame>
			<Page title="Failed Orders">
				<br />
				<br />
				<Layout>
					{data.length > 0 ? (
						<Card sectioned>
							<Button primary onClick={orderFailed}>
								Trigger failed orders
							</Button>

							<table>
								<thead>
									<tr>
										<th>Created On</th>
										<th>Order Id</th>
										<th>Customer</th>
										<th>Amount Paid</th>
									</tr>
								</thead>
								<tbody>
									{data &&
										data.map((order) => (
											<tr>
												<td data-column="First Name">{order.order.name}</td>
												<td data-column="Last Name">{order.order.created_at}</td>
												<td data-column="Job Title">{order.order.customer.first_name} {order.order.customer.last_name}</td>
												<td data-column="Twitter">{order.line_items[0].title}</td>
												<td data-column="Twitter">
														<select value="Radish">
															<option value="Orange">Orange</option>
															<option value="Radish">Radish</option>
															<option value="Cherry">Cherry</option>
														</select>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</Card>
					) : (
						<p style={{ marginTop: 100, fontSize: 20 }}>No failed Order</p>
					)}
					{toastMarkup}
				</Layout>
			</Page>
		</Frame>
	);
}

//trigger
