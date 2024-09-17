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
        if (!formData.name) formErrors.name = 'El nombre es obligatorio';
        if (!formData.email) {
            formErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'El correo electrónico es inválido';
        }
        if (!formData.message) formErrors.message = 'El mensaje es obligatorio';

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
            backgroundColor: '#004d40',
            padding: '40px',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: '#ffffff',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            }}>
                <h2 style={{ color: '#004d40', marginBottom: '20px' }}>Contáctanos</h2>
                <p style={{ color: '#004d40', fontWeight: 'bold' }}>Teléfono: 
                    <a href="tel:952667788" style={{ color: '#009688', textDecoration: 'none' }}> 952 667 788</a>
                </p>
                <p style={{ color: '#004d40', fontWeight: 'bold' }}>Email: 
                    <a href="mailto:wildhike@gmail.com" style={{ color: '#009688', textDecoration: 'none' }}> wildhike@gmail.com</a>
                </p>

                {submitted ? (
                    <div className="thank-you-message" style={{ marginTop: '30px', color: '#004d40' }}>
                        <h3>¡Gracias por contactar con nosotros!</h3>
                        <p>Nos comunicaremos con usted pronto.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ color: '#004d40', fontWeight: 'bold' }}>Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    margin: '5px 0',
                                    borderRadius: '8px',
                                    border: '2px solid #009688',
                                    outline: 'none',
                                    fontSize: '15px',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#00796b'}
                                onBlur={(e) => e.target.style.borderColor = '#009688'}
                            />
                            {errors.name && <p style={{ color: 'red', fontSize: '14px' }}>{errors.name}</p>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ color: '#004d40', fontWeight: 'bold' }}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    margin: '5px 0',
                                    borderRadius: '8px',
                                    border: '2px solid #009688',
                                    outline: 'none',
                                    fontSize: '15px',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#00796b'}
                                onBlur={(e) => e.target.style.borderColor = '#009688'}
                            />
                            {errors.email && <p style={{ color: 'red', fontSize: '14px' }}>{errors.email}</p>}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ color: '#004d40', fontWeight: 'bold' }}>Mensaje:</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    margin: '5px 0',
                                    borderRadius: '8px',
                                    border: '2px solid #009688',
                                    outline: 'none',
                                    fontSize: '15px',
                                    transition: 'border-color 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#00796b'}
                                onBlur={(e) => e.target.style.borderColor = '#009688'}
                            />
                            {errors.message && <p style={{ color: 'red', fontSize: '14px' }}>{errors.message}</p>}
                        </div>
                        <button type="submit" style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#004d40',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#009688'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#004d40'}
                        >
                            Enviar
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contacto;
