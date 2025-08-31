import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Our AI-Enabled Customer Support System</h1>
            <p>Explore our e-commerce page or get support through our chat system.</p>
            <div>
                <Link to="/ecommerce" style={{ margin: '20px', textDecoration: 'none', color: '#007BFF' }}>
                    Go to E-commerce Page
                </Link>
                <Link to="/support" style={{ margin: '20px', textDecoration: 'none', color: '#007BFF' }}>
                    Go to Support Page
                </Link>
            </div>
        </div>
    );
};

export default Home;