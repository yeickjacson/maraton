import { useState } from 'react';
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
  const [resultado, setResultado] = useState();

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
      dolorPecho
    };
    console.log(result);

    setResultado(true);
  };

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

  const calcularIMC = () => {
    if (altura && peso) {
      const alturaMetros = altura / 100;
      const imcCalculado = peso / (alturaMetros * alturaMetros);
      setImc(imcCalculado.toFixed(2));
    } else {
      setImc('');
    }
  };

  const clasificarImc = () => {
    const imc = calcularIMC();
    if (imc < 18.5) {
      setImc('Bajo peso');
    } else if (imc >= 18.5 && imc < 24.9) {
      setImc('Normal');
    } else if (imc >= 25 && imc < 29.9) {
      setImc('Sobrepeso');
    } else if (imc >= 30 && imc < 34.9) {
      setImc('Obesidad grado 1');
    } else if (imc >= 35 && imc < 39.9) {
      setImc('Obesidad grado 2');
    } else if (imc >= 40) {
      setImc('Obesidad morbida o grado 3');
    } else {
      setImc('');
    }
  };



  return (
    <div className="Form">
     
      <div className="container">

      <h1>MEDIA MARATÓN ABURRÁ DE LOS YAMESÍES</h1>

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
          <input 
          type="text" 
          name="city" 
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          />

          <br/>

          <label>Altura(mts):</label>
          <input 
          type="number" 
          name="height" 
          value={altura}
          onChange={(e) => { setAltura(e.target.value); clasificarImc(); }}
          step="0.01" />

          <br/>

          <label>Peso (kg):</label>
          <input 
          type="number" 
          name="weight"
          value={peso}
          onChange={(e) => { setPeso(e.target.value); clasificarImc(); }}
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
          readOnly/>

          <br/>

          <button type="reset" name="reset" className='buttonDelete' onClick={handleDelete}>Cancelar</button>
          <button type="submit" name="submit" className='buttonSave'>Guardar</button>


        </form>

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
          </div>
        )}



      </div>
    </div>
  );
}

export default Form;
