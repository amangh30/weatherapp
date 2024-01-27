import "../styles/home.css"
import Search from "./Search";
import Main from "./Main";
import { useState } from "react";

const Home = ()=>{
    const [formData, setFormData] = useState('Kolkata');
    const [formData1, setFormData1] = useState('22.56263');
    const [formData2, setFormData2] = useState('88.36304');
    const handleFormSubmit = (value,latitude,longitude) => {
        setFormData(value);
        setFormData1(latitude)
        setFormData2(longitude)
    };
    const props = {
        formData: formData,
        formData1: formData1,
        formData2: formData2
    }
    return(
        <>
        <div className="phone">
            <p>This service is not available for mobile</p>
            <p>Please use laptop/pc to view</p>
        </div>
        <div className="pc">
            <Search onSubmit={handleFormSubmit}/>    
            <Main props={props}/>
        </div>
        </>
        
    )
}

export default Home;