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

  const [data, setData] = useState([]);

  useEffect(()=>{
    getData()
  },[])
  

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
	};

  const rows = [
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    [
      'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      '$445.00',
      124518,
      32,
      '$14,240.00',
    ],
  ];

  return (
    <Page title="Sales by product">
      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Order Id',
            'Create At',
            'Customer Name',
            '',
            'Net sales',
          ]}
          rows={rows}
          totals={['', '', '', 255, '$155,830.00']}
        />
      </Card>
    </Page>
  );
}
