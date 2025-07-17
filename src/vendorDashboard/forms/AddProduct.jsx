import React,{useState} from 'react';
import { API_URL } from '../data/ApiPath';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [Category, setCategory] = useState([]);
  const [bestseller, setBestseller] = useState(false);

    const handleCategoryChange = (event)=>{
    const value = event.target.value;
    if(Category.includes(value)){
      setCategory(Category.filter((item)=> item !==value))
    }else{
      setCategory([...Category,value])
    }
  }

  const handleBestsellerChange = (event)=>{
    const value = event.target.value === "true"
    setBestseller(value);
  }
    const handleImageChange =(event)=>{
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  }


  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const LoginToken = localStorage.getItem('LoginToken');
      const firmId = localStorage.getItem('MyfirmId');
      if(!LoginToken || !firmId) {
        alert('Token or Firm ID not found');
        console.log('Token or Firm ID not found');
      }

      const formData = new FormData();
      formData.append('ProductName', productName); // fixed
      formData.append('Price', price);             // fixed
      formData.append('Description', description);
      formData.append('Image', Image);
      formData.append('BestSeller', bestseller);
      Category.forEach((value)=>{
      formData.append('Category',value)
      })

      //API call to add product
      const response = await fetch(`${API_URL}/product/addproduct/${firmId}`,{
        method: 'POST',
        body: formData
      })
      const data = await response.json();
      if(response.ok){
        alert('Product added Successfully');
        console.log('Product added successfully',data);
        setProductName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setCategory([]);
        setBestseller(false);

        
      }
      

    } catch (error) {
      console.error("Error adding product:", error);
      alert('Error:',error.message);
    }
  }




  return (
    <div className="page-center">
      <div className="Addproduct-section">
        <h1>Add Product</h1>

        <form onSubmit={handleAddProductSubmit} method='POST'>
          
          <label>Product Name</label>
          <input type="text" value={productName} onChange={(e)=> setProductName(e.target.value)} />

          <label>Price</label>
          <input type="text" value={price} onChange={(e)=> setPrice(e.target.value)} />

          <label>Category</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="Category" value="veg" checked={Category.includes('veg')} onChange={handleCategoryChange} />
              Veg
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Category" value="non-veg" checked={Category.includes('non-veg')} onChange={handleCategoryChange} />
              Non-Veg
            </label>
          </div>

          <label>Bestseller</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="bestseller" value="true" checked={bestseller === true} onChange={handleBestsellerChange} />
              Yes
            </label>
            <label className="radio-label">
              <input type="radio" name="bestseller" value="false" checked={bestseller === false} onChange={handleBestsellerChange} />
              No
            </label>
          </div>

          <label>Description</label>
          <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} />

          <label>File Image</label>
          <input type="file" name='Image' onChange={handleImageChange}/>

          <button type="submit">Submit</button> 

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
