import "../styles/search.css"
import { useEffect, useState } from "react";
import data from "../data.json"

const Search = ({onSubmit}) => {
    const [drop,setDrop] = useState(false)
    const [value,setValue] = useState('Kolkata');
    const [latitude,setLatitude] = useState('22.56263');
    const [longitude,setLongitude] = useState('88.36304');
    const onClick=()=>{
        setDrop(true)
    }
    document.addEventListener("click", function(e) {
        if (!e.target.closest(".input")) {
            setDrop(false) 
        }
    });
    const handleChange = (e)=>{
        setValue(e.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value,latitude,longitude);
    };
    const onSearch= (searchTerm)=>{
        setLongitude(searchTerm.lng)
        setLatitude(searchTerm.lat)
        setValue(searchTerm.name)
        setDrop(false)
    }
    return (
        <>
        <br />
            <form onSubmit={handleSubmit} className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <input onClick={onClick} autoComplete="off" value={value} onChange={handleChange} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input" placeholder="Search for cities" required />
                </div>
                <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
                {drop &&<div className="dropdown">
                    {data.filter(item =>{
                        const searchTerm = value.toLowerCase();
                        const name = item.name.toLowerCase();
                        return searchTerm && name.startsWith(searchTerm)
                    }).slice(0,7).map((item)=>(<div onClick={()=>onSearch(item)} className="dropdown-row">
                     {item.name},{item.country}  
                    </div>))}
                </div>}
            </form>
        </>
    )
}

export default Search;