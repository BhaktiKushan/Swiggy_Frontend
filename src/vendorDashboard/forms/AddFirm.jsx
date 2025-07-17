import React, { useState } from 'react';
import { API_URL } from '../data/ApiPath';

const AddFirm = ({ showproductHandler }) => {
  const [FirmName, setFirmName] = useState("");
  const [Area, setArea] = useState("");
  const [Offer, setOffer] = useState("");
  const [Category, setCategory] = useState([]);
  const [Region, setRegion] = useState([]);
  const [Image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (Category.includes(value)) {
      setCategory(Category.filter((item) => item !== value));
    } else {
      setCategory([...Category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (Region.includes(value)) {
      setRegion(Region.filter((item) => item !== value));
    } else {
      setRegion([...Region, value]);
    }
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const LoginToken = localStorage.getItem('LoginToken');
      if (!LoginToken) {
        alert('Token not found');
        console.log('Token not found');
        return;
      }

      const formData = new FormData();
      formData.append('FirmName', FirmName);
      formData.append('Area', Area);
      formData.append('Offer', Offer);
      
      Category.forEach((value) => {
        formData.append('Category', value);
      });

      Region.forEach((value) => {
        formData.append('Region', value);
      });

      if (Image) {
        formData.append('Image', Image);
      }

      const response = await fetch(`${API_URL}/firm/addfirm`, {
        method: 'POST',
        headers: {
          'token': `${LoginToken}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert('Firm added successfully');
        console.log('Firm added successfully', data);
        setFirmName("");
        setArea("");
        setOffer("");
        setCategory([]);
        setRegion([]);
        setImage(null);
        showproductHandler();

        console.log("this is firmID", data.firmId);
        const firmid = data.firmId;
        localStorage.setItem('MyfirmId', firmid);
      }

    } catch (error) {
      console.log('Error is:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="page-center">
      <div className="Addfirm-section">
        <h1>Add Firm</h1>
        <form onSubmit={handleFirmSubmit} method="POST">
          <label>FirmName</label>
          <input type="text" name="FirmName" value={FirmName} onChange={(e) => setFirmName(e.target.value)} />

          <label>Area</label>
          <input type="text" name="Area" value={Area} onChange={(e) => setArea(e.target.value)} />

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

          <label>Region</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="Region" value="north-indian" checked={Region.includes('north-indian')} onChange={handleRegionChange} />
              North-Indian
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Region" value="south-indian" checked={Region.includes('south-indian')} onChange={handleRegionChange} />
              South-Indian
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Region" value="chinese" checked={Region.includes('chinese')} onChange={handleRegionChange} />
              Chinese
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="Region" value="bakery" checked={Region.includes('bakery')} onChange={handleRegionChange} />
              Bakery
            </label>
          </div>

          <label>Offer</label>
          <input type="text" name="Offer" value={Offer} onChange={(e) => setOffer(e.target.value)} />

          <label>Firm Image</label>
          <input type="file" name="Image" onChange={handleImageChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddFirm;
