import React, { useState, useCallback, useEffect } from "react";
import {
	Layout,
	Page,
	Card,
	Button,
	FormLayout,
	TextField,
	Checkbox,
	Toast,
	Frame,
} from "@shopify/polaris";
import axios from "axios";
import CsvDownload from "react-json-to-csv";
export default function Cresentials() {
	const [id, setId] = useState("");
	const [token, setToken] = useState("");
	const [secretKey, setSecretKey] = useState("");
	const [shop, setShop] = useState(getCookie("shop"));
	const [csvData, setCsvData] = useState([]);
	const [includePrice, setIncludePrice] = useState(false);
	const [productCdn, setProductCdn] = useState("");
	const [cartCdn, setCartCdn] = useState("");
	const [pincode, setPincode] = useState(false);
	const [loading, setLoading] = useState({
		one: false,
		two: false,
		three: false,
		four: false,
	});
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);
	const [mappedCSV, setMappedCSV] = useState([]);

	const handleIdChange = useCallback((value) => setId(value), []);
	const handleTokenChange = useCallback((value) => setToken(value), []);
	const handleSecretKeyChange = useCallback((value) => setSecretKey(value), []);

	const handleCartCdnChange = useCallback((value) => setCartCdn(value), []);

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
	const handleProductCdnChange = useCallback(
		(value) => setProductCdn(value),
		[]
	);

	const handleCheckboxChange = useCallback(async (newChecked) => {
		try {
			setIncludePrice(newChecked);
			const res = await axios.post(`/inventory/setting/sync/${shop}`, {
				priceSync: !!newChecked,
			});
			// console.log(res);
			if (res) {
				showToast("Updated Successfully", false);
			}
		} catch (error) {
			console.log(error);
			showToast("Sorry something unexpected happened", true);
			setIncludePrice(!newChecked);
		}
	}, []);
	const handleCheckboxPinCodeChange = useCallback(async (newChecked) => {
		try {
			setPincode(newChecked);
			const res = await axios.post(`/pincode/setting/sync/${shop}`, {
				isPincode: !!newChecked,
			});
			// console.log(res);
			if (res) {
				showToast("Updated Successfully", false);
			}
		} catch (error) {
			setPincode(!newChecked);
			showToast("Sorry something unexpected happened", true);
			console.log(error);
		}
	}, []);
	useEffect(() => {
		let myShop = getCookie("shop");
		setShop(myShop);
		getData();
		// console.log(shop);
	}, []);

	const getData = async () => {
		const res = await axios.get(`/install/get/credentials/${shop}`);
		// console.log(res);

		const { data } = await axios.get(`/install/get/credentials/${shop}`);

		if (data) {
			if (Array.isArray(data)) {
				setMappedCSV(data);
			}
			// console.log(data);
		}

		setId(res.data.application_id);
		setSecretKey(res.data.secretKey);
		setIncludePrice(res.data.priceSync);
		setToken(res.data.application_token);
		setPincode(res.data.isPincode);

		const response = await axios.get(`/install/getting/cdn/${shop}`);
		setCartCdn(response.data.cartCdn && response.data.cartCdn);
		setProductCdn(response.data.productCdn && response.data.productCdn);
	};

	const sendCredentials = async () => {
		setLoading({ ...loading, one: true });

		let myShop = getCookie("shop");
		setShop(myShop);
		if ((id, token, secretKey, shop)) {
			// console.log(id, token, secretKey, shop);
			try {
				const res = await axios.put("/install/credentials", {
					id,
					token,
					secretKey,
					shop,
				});
				// console.log(res);
				if (res) {
					showToast("Updated Successfully", false);

					setLoading({ ...loading, one: false });
				}
			} catch (error) {
				showToast("Something unexpected happened, Please try Again", true);

				setLoading({ ...loading, one: false });
			}
		} else {
			showToast("Fill the credentials first", true);

			setLoading({ ...loading, one: false });
		}
	};

	const sendCdns = async () => {
		setLoading({ ...loading, four: true });

		let myShop = getCookie("shop");
		setShop(myShop);
		if ((cartCdn, productCdn)) {
			// console.log(cartCdn, productCdn);

			try {
				const res = await axios.post(`/install/get/cdn/${shop}`, {
					cartCdn,
					productCdn,
				});
				// console.log(res);
				if (res) {
					showToast("Updated Successfully", false);
					setLoading({ ...loading, four: false });
				}
			} catch (error) {
				showToast("Something unexpected happened, Please try Again", true);
				setLoading({ ...loading, four: false });
			}
		} else {
			showToast("Fill the CDNs first", true);
			setLoading({ ...loading, four: false });
		}
	};

	const syncInventory = async () => {
		setLoading({ ...loading, two: true });

		let myShop = getCookie("shop");
		setShop(myShop);
		try {
			const res = await axios.get(`/inventory/store/sync/${shop}`);
			// console.log(res);
			if (res) {
				showToast("Sync in progress check after half an hour", false);
				setLoading({ ...loading, two: false });
			}
		} catch (error) {
			showToast("Something unexpected happened, Please try Again", true);
			setLoading({ ...loading, two: false });
		}
	};

	const csvUpload = async (e) => {
		setLoading({ ...loading, three: true });
		let myShop = getCookie("shop");
		setShop(myShop);
		e.preventDefault();
		const scvdata = new FormData();
		scvdata.append("file", csvData);
		axios
			.post(`/map/storeMapping/${shop}`, scvdata)
			.then((res) => {
				// console.log(res);
				showToast("Uploaded Successfully", false);
				setLoading({ ...loading, three: false });
			})
			.catch((error) => {
				showToast("There is problem with this CSV", true);
				setLoading({ ...loading, three: false });
			});
	};

	const showToast = (msg, err) => {
		err ? setError(true) : setError(false);
		setMessage(msg);
		toggleActive();
	};

	const [active, setActive] = useState(false);

	const toggleActive = useCallback(() => setActive((active) => !active), []);

	const toastMarkup = active ? (
		<Toast content={message} onDismiss={toggleActive} error={error} />
	) : null;

	return (
		<Frame>
			<Page title="Fynd">
				<Layout>
					<Layout.AnnotatedSection
						title="Your Credentials to access fynd"
						description="You have to create it from fynd's website"
					>
						<Card sectioned>
							<FormLayout>
								<TextField
									value={id}
									label="Application ID"
									placeholder=""
									onChange={handleIdChange}
								/>
								<TextField
									value={token}
									label="Fynd Token"
									placeholder=""
									onChange={handleTokenChange}
								/>
								<TextField
									value={secretKey}
									label="Fynd Token Secret"
									placeholder=""
									onChange={handleSecretKeyChange}
								/>
								<Button primary onClick={sendCredentials} loading={loading.one}>
									Submit
								</Button>
							</FormLayout>
						</Card>
					</Layout.AnnotatedSection>
					<Layout.AnnotatedSection title="Inventory Sync">
						<Card sectioned>
							<FormLayout>
								<Checkbox
									checked={includePrice}
									label="Sync Price Also"
									onChange={handleCheckboxChange}
								/>
								<FormLayout.Group>
									<Button primary onClick={syncInventory} loading={loading.two}>
										Full Sync
									</Button>

									<CsvDownload
										style={{ border: "none", backgroundColor: "transparent" }}
										data={mappedCSV}
									>
										<Button primary>Download mapped products</Button>
									</CsvDownload>
								</FormLayout.Group>
							</FormLayout>
						</Card>
					</Layout.AnnotatedSection>

					<Layout.AnnotatedSection title="CSV sync">
						<Card sectioned>
							<FormLayout>
								<form onSubmit={csvUpload}>
									<input
										type="file"
										className="form-control text-center"
										name="avatar"
										onChange={(e) => {
											setCsvData(e.target.files[0]);
										}}
										encType="multipart/form-data"
										accept=".csv"
									/>
									<br />
									<br />
									<Button
										primary
										onClick={csvUpload}
										type="submit"
										loading={loading.three}
									>
										Upload CSV
									</Button>
								</form>
							</FormLayout>
						</Card>
					</Layout.AnnotatedSection>
					<Layout.AnnotatedSection title="CDN Links">
						<Card sectioned>
							<FormLayout>
								<FormLayout.Group>
									<Button primary>
										<a
											href="https://drive.google.com/uc?export=view&id=1PGClIrbDaM3C6WUJ5S7vdBVHTGAq8AAv"
											style={{ color: "#fff", textDecoration: "none" }}
										>
											Download Cart script
										</a>
									</Button>
									<Button primary>
										<a
											href="https://drive.google.com/uc?export=view&id=1NzcyT-ZP0B5fRVsOSvIpOfE9SfWWJmkg"
											style={{ color: "#fff", textDecoration: "none" }}
										>
											Download Product script
										</a>
									</Button>
								</FormLayout.Group>

								<TextField
									value={cartCdn}
									label="Cart CDN"
									placeholder=""
									onChange={handleCartCdnChange}
								/>
								<TextField
									value={productCdn}
									label="Product CDN"
									placeholder=""
									onChange={handleProductCdnChange}
								/>
								<Checkbox
									checked={pincode}
									label="Ask for pincode on storefront"
									onChange={handleCheckboxPinCodeChange}
								/>
								<Button primary onClick={sendCdns} loading={loading.four}>
									Submit
								</Button>
							</FormLayout>
						</Card>
					</Layout.AnnotatedSection>
					{toastMarkup}
				</Layout>
			</Page>
		</Frame>
	);
}
