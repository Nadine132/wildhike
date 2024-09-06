import React, { useState } from 'react';

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email address is invalid';
        }
        if (!formData.message) formErrors.message = 'Message is required';

        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            setSubmitted(true);
            console.log('Form submitted:', formData);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div style={{
            backgroundImage: `url('https://images.pexels.com/photos/26860473/pexels-photo-26860473/free-photo-of-madera-ligero-carretera-paisaje.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '50px',
            color: 'white',
            textAlign: 'center'
        }}>
            <h2>Te Contactamos</h2>
            <p>Teléfono: <a href="tel:952667788" style={{ color: 'white', textDecoration: 'none' }}>952 667 788</a></p>
            <p>Email: <a href="mailto:wildhike@gmail.com" style={{ color: 'white', textDecoration: 'none' }}>wildhike@gmail.com</a></p>
            {submitted ? (
                <div className="thank-you-message">
                    <h3>Gracias por contactar con nosotros!</h3>
                    <p>Nos comunicaremos con usted.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '20px',
                    borderRadius: '10px',
                    display: 'inline-block',
                    maxWidth: '600px',
                    width: '100%'
                }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                margin: '5px 0',
                                borderRadius: '5px',
                                border: 'none'
                            }}
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                margin: '5px 0',
                                borderRadius: '5px',
                                border: 'none'
                            }}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Mensaje:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            style={{
                                width: '100%',
                                padding: '8px',
                                margin: '5px 0',
                                borderRadius: '5px',
                                border: 'none'
                            }}
                        />
                        {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
                    </div>
                    <button type="submit" style={{
                        padding: '10px 15px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}>
                        Enviar
                    </button>
                </form>
            )}
        </div>
    );
};

export default Contacto;
