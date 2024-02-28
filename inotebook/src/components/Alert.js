import React from "react";

function Alert(props) {
  // const [alert,setalert]=useState({display:"",mess:""});
  return (

    <div className=" alert alert-warning alert-dismissible fade show " style={{display:props.alert.display}} role="alert">
    <strong>{props.alert.mess}</strong> 
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
    </div>
  )
}

export default Alert;
