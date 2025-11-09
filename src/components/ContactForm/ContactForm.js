import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Configuración de EmailJS - El usuario necesitará reemplazar estos valores
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    try {
      // Verificar si EmailJS está configurado
      if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
        throw new Error('EmailJS no está configurado. Por favor, crea un archivo .env con las variables REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID y REACT_APP_EMAILJS_PUBLIC_KEY. Ver README.md para más información.');
      }

      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      
      setAlertType('success');
      setAlertMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
      setShowAlert(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Ocultar alerta después de 5 segundos
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      // Error al enviar el formulario
      setAlertType('danger');
      setAlertMessage('Error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente.');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section" id="contacto">
      <div className="contact-form-wrapper">
        <h2 className="section-title">Contacto</h2>
        <p className="text-center mb-4 contact-form-intro">
          ¿Tienes un proyecto en mente? ¡Contáctanos y trabajemos juntos!
        </p>
        
        {showAlert && (
          <Alert 
            variant={alertType} 
            onClose={() => setShowAlert(false)} 
            dismissible
            className="mb-4"
          >
            {alertMessage}
          </Alert>
        )}

        <Form ref={form} onSubmit={handleSubmit} className="contact-form">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 123 456 789"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mensaje *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </Form.Group>
              <div className="text-center">
                <Button 
                  type="submit" 
                  variant="outline-light" 
                  size="lg"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </div>
            </Form>
      </div>
    </section>
  );
};

export default ContactForm;

