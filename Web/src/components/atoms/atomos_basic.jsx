import { Link } from "react-router-dom";

const InputTextLogin = ({seccion, setFuncion}) => {
    const handler = (e) => {
      setFuncion(e.target.value)
    }
    return(
      <div className="d-flex flex-row align-items-center mb-4">
        <div className="form-outline flex-fill mb-0">
            <input type={seccion==='Password'?'password':'text'} placeholder={seccion} 
            className="form-control" id={seccion} onChange={handler} />
            <label htmlFor={seccion} className="form-label">{seccion}</label>
        </div>
      </div>
    );
  }
  
  const ImagenTweetter = ({clase}) => {
    return(
        <div>
            <img src="./img/tweetter_logo.png" alt="Twitter" className={clase} />
        </div>
    );
  }
  
  const Boton = ({funciondeboton, loguear}) => {
     return(
      <button type="button" className="btn btn-outline-light btn-lg px-5" onClick={loguear}>{funciondeboton}</button>
    );
  }
  
  

  export {InputTextLogin, ImagenTweetter, Boton}