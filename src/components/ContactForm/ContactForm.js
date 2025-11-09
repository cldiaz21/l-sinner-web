import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Clock } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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

    // Configuración de EmailJS
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    try {
      // Verificar si EmailJS está configurado
      const missingVars = [];
      if (!serviceId) missingVars.push('REACT_APP_EMAILJS_SERVICE_ID');
      if (!templateId) missingVars.push('REACT_APP_EMAILJS_TEMPLATE_ID');
      if (!publicKey) missingVars.push('REACT_APP_EMAILJS_PUBLIC_KEY');

      if (missingVars.length > 0) {
        throw new Error(`EmailJS no está configurado. Faltan las siguientes variables de entorno: ${missingVars.join(', ')}. Por favor, configura estas variables en Vercel y realiza un redeploy.`);
      }

      // Validar formato de los IDs
      if (!serviceId.startsWith('service_')) {
        throw new Error(`El Service ID tiene un formato incorrecto. Debe empezar con "service_". Valor actual: ${serviceId.substring(0, 20)}...`);
      }

      if (!templateId.startsWith('template_')) {
        throw new Error(`El Template ID tiene un formato incorrecto. Debe empezar con "template_". Valor actual: ${templateId.substring(0, 20)}...`);
      }

      // Inicializar EmailJS
      emailjs.init(publicKey);

      // Enviar el formulario
      const response = await emailjs.sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey
      });

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        setAlertType('success');
        setAlertMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
        setShowAlert(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        // Resetear el formulario
        if (form.current) {
          form.current.reset();
        }
        // Ocultar alerta después de 5 segundos
        setTimeout(() => setShowAlert(false), 5000);
      } else {
        throw new Error(`Error al enviar el mensaje. Código de estado: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      
      let errorMessage = 'Error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente.';
      
      if (error.text) {
        // Error de EmailJS
        if (error.text.includes('service ID not found')) {
          errorMessage = `El Service ID "${serviceId}" no fue encontrado en tu cuenta de EmailJS. Por favor, verifica que el Service ID sea correcto en el dashboard de EmailJS (https://dashboard.emailjs.com/admin) y que esté configurado correctamente en las variables de entorno de Vercel.`;
        } else if (error.text.includes('template ID not found')) {
          errorMessage = `El Template ID "${templateId}" no fue encontrado en tu cuenta de EmailJS. Por favor, verifica que el Template ID sea correcto en el dashboard de EmailJS y que esté configurado correctamente en las variables de entorno de Vercel.`;
        } else {
          errorMessage = `Error de EmailJS: ${error.text}. Por favor, verifica la configuración en el dashboard de EmailJS (https://dashboard.emailjs.com/admin).`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setAlertType('danger');
      setAlertMessage(errorMessage);
      setShowAlert(true);
      // Ocultar alerta después de 8 segundos (más tiempo para leer el error)
      setTimeout(() => setShowAlert(false), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Información de Contacto */}
          <div className="contact-info">
            <span className="section-label">CONTACTO</span>
            <h2 className="section-title">Hablemos de tu proyecto</h2>
            <p className="contact-description">
              ¿Tienes preguntas? ¿Necesitas una demo? ¿Quieres integrar L SINN3R en tu proyecto? Estamos aquí para ayudarte.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <Mail size={28} />
                </div>
                <div className="method-info">
                  <div className="method-label">Email</div>
                  <a href="mailto:contacto@lsinn3r.cl" className="method-value">contacto@lsinn3r.cl</a>
                </div>
              </div>
              <div className="contact-method">
                <div className="method-icon">
                  <Clock size={28} />
                </div>
                <div className="method-info">
                  <div className="method-label">Horario</div>
                  <div className="method-value">24/7 Soporte</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="contact-form-container">
            {showAlert && (
              <div className={`alert alert-${alertType}`}>
                {alertMessage}
              </div>
            )}
            <form ref={form} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Asunto</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Tema de consulta</option>
                  <option value="demo">Demo</option>
                  <option value="sales">Ventas</option>
                  <option value="support">Soporte</option>
                  <option value="partnership">Colaboración</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                className="star-border-container"
                style={{ width: '100%', marginTop: '8px' }}
                type="submit"
                disabled={isSubmitting}
              >
                <div className="border-gradient-bottom" style={{ background: 'radial-gradient(circle, white, transparent 10%)', animationDuration: '6s' }}></div>
                <div className="border-gradient-top" style={{ background: 'radial-gradient(circle, white, transparent 10%)', animationDuration: '6s' }}></div>
                <div className="inner-content">
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
