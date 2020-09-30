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

export default function SettingPage() {

  const [tagValue, setTagValue] = useState("")
  const [inputValue, setInputValue] = useState("")
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
			const data = await axios.get(`/order/setting/demo-mojito.myshopify.com`);
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


  let submitFunction = async(e)=>{
    e.preventDefault();
    console.log({tagValue, inputValue});

    let makeInputArray = inputValue.split(',')
    let settingdata = await axios.post('/order/setting/demo-mojito.myshopify.com', {tagValue, makeInputArray})
      console.log(settingdata);
      getData()

  }

  return (

    <div>

    <form class="form-inline" onSubmit={submitFunction}>
        <div class="form-group mb-2">
          <label for="staticEmail2" class="sr-only">Tag Number</label>
          <input type="text" class="form-control" id="staticEmail2" value={tagValue} placeholder=" input tag0" onChange={(e)=>setTagValue(e.target.value)}/>
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputPassword2" class="sr-only">Status Value</label>
          <input type="text" class="form-control" id="inputPassword2" placeholder="new, fulfilled, delivered, cancelled" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary mb-2">save</button>
    </form>

    <br/>
    <br/>

    <h4>Saved List :</h4>

    <Table striped bordered hover size="sm">
<thead>
  <tr>
    <th>#</th>
    <th>Tag</th>
    <th>Input Value</th>
  </tr>
  </thead>
  <tbody>
  {data &&
    data.map((setting, key) => (

      <tr>
        <td>{key+1}</td>
        <td data-column="First Name">{setting.tag}</td>
        <td data-column="First Name">{setting.inputValue}</td>
      </tr>
    ))}
  </tbody>
  </Table>

    </div>


  );
}
