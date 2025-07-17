import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/ApiPath';

const AllProducts = () => {
  const [firms, setFirms] = useState([]);
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all firms on component mount
  useEffect(() => {
    fetchAllFirms();
  }, []);

  const fetchAllFirms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/firm/getfirms`);
      const data = await response.json();
      
      if (response.ok) {
        setFirms(data.firms || data);
        setError(null);
      } else {
        setError('Failed to fetch firms');
        console.error('Failed to fetch firms:', data);
      }
    } catch (error) {
      setError('Error fetching firms');
      console.error('Error fetching firms:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFirmProducts = async (firmId) => {
    try {
      setProductsLoading(true);
      const response = await fetch(`${API_URL}/product/getproducts/${firmId}`);
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data.products || data);
        setError(null);
      } else {
        setError('Failed to fetch products');
        console.error('Failed to fetch products:', data);
      }
    } catch (error) {
      setError('Error fetching products');
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleFirmClick = (firm) => {
    setSelectedFirm(firm);
    fetchFirmProducts(firm._id);
  };

  const handleBackToFirms = () => {
    setSelectedFirm(null);
    setProducts([]);
  };

  if (loading) {
    return (
      <div className="page-center">
        <div className="loading">Loading firms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-center">
        <div className="error">Error: {error}</div>
        <button onClick={fetchAllFirms}>Retry</button>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="all-products-section">
        {!selectedFirm ? (
          // Display all firms
          <div className="firms-container">
            <h1>All Firms</h1>
            {firms.length === 0 ? (
              <p>No firms found.</p>
            ) : (
              <div className="firms-grid">
                {firms.map((firm) => (
                  <div 
                    key={firm._id} 
                    className="firm-card"
                    onClick={() => handleFirmClick(firm)}
                  >
                    <div className="firm-image">
                      {firm.Image ? (
                        <img 
                          src={`${API_URL}/uploads/${firm.Image}`} 
                          alt={firm.FirmName}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <div className="firm-info">
                      <h3>{firm.FirmName}</h3>
                      <p className="firm-area">{firm.Area}</p>
                      <div className="firm-categories">
                        {firm.Category && firm.Category.map((cat, index) => (
                          <span key={index} className="category-tag">{cat}</span>
                        ))}
                      </div>
                      <div className="firm-regions">
                        {firm.Region && firm.Region.map((region, index) => (
                          <span key={index} className="region-tag">{region}</span>
                        ))}
                      </div>
                      {firm.Offer && (
                        <div className="firm-offer">
                          <span className="offer-tag">🎉 {firm.Offer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Display products for selected firm
          <div className="products-container">
            <div className="products-header">
              <button onClick={handleBackToFirms} className="back-button">
                ← Back to Firms
              </button>
              <h1>Products from {selectedFirm.FirmName}</h1>
              <p className="firm-location">{selectedFirm.Area}</p>
            </div>

            {productsLoading ? (
              <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
              <p>No products found for this firm.</p>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      {product.Image ? (
                        <img 
                          src={`${API_URL}/uploads/${product.Image}`} 
                          alt={product.ProductName}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                      {product.BestSeller && (
                        <div className="bestseller-badge">Bestseller</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{product.ProductName}</h3>
                      <p className="product-price">₹{product.Price}</p>
                      <p className="product-description">{product.Description}</p>
                      <div className="product-categories">
                        {product.Category && product.Category.map((cat, index) => (
                          <span key={index} className="category-tag">{cat}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;