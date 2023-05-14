import { Link } from "react-router-dom";

const InputTextLogin = ({seccion, setFuncion}) => {
    const handler = (e) => {
      setFuncion(e.target.value)
    }
    return(
        <div className="form-outline form-white mb-4">
            <input type={seccion==='Password'?'password':'text'} placeholder={seccion} 
            className="form-control" id={seccion} onChange={handler} />
            <label htmlFor={seccion} className="form-label">{seccion}</label>
        </div>
    );
  }
  
  const ImagenTweetter = () => {
    return(
        <div>
            <img src="./img/tweetter_logo.png" alt="Twitter" className="img_logo_25" />
        </div>
    );
  }
  
  const Boton = ({funciondeboton, loguear}) => {
     return(
      <button type="button" className="btn btn-outline-light btn-lg px-5" onClick={loguear}>{funciondeboton}</button>
    );
  }
  
  

  export {InputTextLogin, ImagenTweetter, Boton}