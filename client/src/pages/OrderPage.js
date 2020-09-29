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

export default function DataTableExample() {

  const [shop, setShop] = useState(getCookie("shop"));
  const [data, setData] = useState([]);

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
				if (Array.isArray(data.data)) {
					setData(data.data);
				}
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

  return (
    <Page title="Order by product">
      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'text',
          ]}
          headings={[
            'Order Id',
            'Create At',
            'Customer Name',
            'Item',
            'Status',
          ]}
          rows={data}
          // totals={['', '', '', 255, '$155,830.00']}
        />
      </Card>
    </Page>
  );
}
