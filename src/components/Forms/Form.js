import React, { useState, useEffect } from 'react';
import './Form.css';


function Form() {

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [identification, setIdentification] = useState('');
  const [email, setEmail] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState('');
  const [talla, setTalla] = useState(''); 
  const [dolorPecho, setDolorPecho] = useState('');
  const [resultado, setResultado] = useState(false);
  const [ciudades, setCiudades] = useState([]);

  const handleSubmit = (e) => { 
    e.preventDefault(); 

    const result = {
      nombreCompleto,
      identification,
      email,
      ciudad,
      altura,
      peso,
      imc,
      talla,
      dolorPecho,
      ciudades
    };
    console.log(result);

    setResultado(true);
  };

// resetear campos

  const handleDelete = () => {
    setNombreCompleto('');
    setIdentification('');
    setEmail('');
    setCiudad('');
    setAltura('');
    setPeso('');
    setImc('');
    setTalla('');
    setDolorPecho('');
    setResultado(false);
  };

//calcular Imc  

  const calcularIMC = () => {
    if (altura && peso) {
      const alturaMetros = altura / 100;
      const imcCalculado = peso / (alturaMetros * alturaMetros);
      setImc(imcCalculado.toFixed(2));
    } else {
      setImc('');
    }
  };

// Peso ideal
  const pesoIdeal = (imc) => {
    if (imc > 18.5 && imc < 24.9){
      return true
    }
    else{
      return false
    }
  }

// Campo valoracion
  const validarValidacion = () => {
    const pesoIdealCalculado = pesoIdeal(imc);
    if (pesoIdealCalculado && dolorPecho === 'No') {
      return 'Acto';
    } 
    else if (pesoIdealCalculado && dolorPecho === 'Si') {
      return 'No acto';
    } 
    else if (pesoIdealCalculado===false && dolorPecho ){
      return 'No acto';
    }
    else {
      return '';
    }
  }

//consumiendo Api / Departamento Antioquia

  useEffect(() => {
    fetch('https://api-colombia.com/api/v1/Department/2/cities')
      .then(response => response.json())
      .then(data => setCiudades(data))
      .catch(error => console.error(error));
  }, []);


  return (
    <div className="Form">
     
      <div className="container">

      <h1>Media Maratón Aburrá De Los Yamiesíes</h1>

        <form onSubmit={handleSubmit}>
 
          <label>Nombre Completo:</label>
          <input 
          type="text" 
          name="Fullname" 
          value={nombreCompleto} 
          onChange={(e) => setNombreCompleto(e.target.value)}
          required/>

          <br/>

          <label>identification:</label>        
          <input 
          type="number" 
          name="identification"
          value={identification}
          onChange={(e) => setIdentification(e.target.value)}
          required />  

          <br/>   

          <label>Email:</label>
          <input 
          type="email" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>

          <br/>   

          <label>Ciudad:</label>
          <select 
          name="ciudad" 
          onChange={(e) => setCiudad(e.target.value)}>
          {
          (
            ciudades.map(ciudad => (<option key={ciudad.id} value={ciudad.name}>{ciudad.name}</option>))
          )
          }
          </select>

          <br/>

          <label>Altura(mts):</label>
          <input 
          type="number" 
          name="height" 
          value={altura}
          onChange={(e) => { setAltura(e.target.value); calcularIMC(); }}
          step="0.01" />

          <br/>

          <label>Peso (kg):</label>
          <input 
          type="number" 
          name="weight"
          value={peso}
          onChange={(e) => { setPeso(e.target.value); calcularIMC(); }}
          step="0.01" />

          <br/>

          <label>IMC:</label>
          <input 
          type="number" 
          name="imc"
          value={imc}
          onChange={(e) => setImc(e.target.value)}
          readOnly
          />

          <br/>

          <label>Talla Camiseta:</label>
          <select 
          name="talla"
          value={talla}
          onChange={(e) => setTalla(e.target.value)} 
          required>
            <option value="">Seleccione una opción</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <br/>

          <label> ¿Durante el ejercicio o deporte que practica ha tenido dolor en el pecho?:</label><br/>
            <label>
            <input 
            type="radio"
            name="dolorPecho"
            checked={dolorPecho === 'Si'}
            onChange={(e) => setDolorPecho(e.target.value)}
            value="Si"  
            />Si </label>

            <label>
            <input 
            type="radio" 
            name="dolorPecho"
            checked={dolorPecho === 'No'}
            onChange={(e) => setDolorPecho(e.target.value)}
            value="No"  /> No </label>
          
          <br/>

          <label>Valoracion:</label>
          <input type="text" 
          name="valoracion"
          value={validarValidacion()}
          readOnly/>

          <br/>

          <button type="reset" name="reset" className='buttonDelete' onClick={handleDelete}>Cancelar</button>
          <button type="submit" name="submit" className='buttonSave'>Guardar</button>


        </form>

{/* informacion registrada por el participante... */}
        {resultado && (
          <div>
            <h2>Información registrada:</h2>
            <p>Nombre completo: {nombreCompleto}</p>
            <p>Identificación: {identification}</p>
            <p>Email: {email}</p>
            <p>Ciudad: {ciudad}</p>
            <p>Altura: {altura}</p>
            <p>Peso: {peso}</p>
            <p>IMC: {imc}</p>
            <p>Talla: {talla}</p>
            <p>Dolor Pecho: {dolorPecho}</p>
            <p>Valoracion: {validarValidacion()}</p>
          </div>
        )}



      </div>
    </div>
  );
}

export default Form;
