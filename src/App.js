import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [search, setSearch] = useState("")
  const [Suggestion, setSuggestion] = useState([])
  const [selected, setSelected] = useState([])
  const [unique, setUnique]= useState(new Set())
  const searchRef = useRef()

  const fetchSuggestion = async ()=>{
    const {data} = await axios.get(`https://dummyjson.com/users/search?q=${search}`)
    if(data) {setSuggestion(data.users)}
  }

  const handleSelect = (user) => {
    setSelected([...selected, user])  
     setUnique(new Set([...unique, user.email]))
     setSearch("")
     searchRef.current.focus()
  }

  const handleRemove = (i) => {
    const removed = selected.filter((user)=> user.id !== i.id )
    setSelected(removed)
    const removedUnique = unique.delete(i.email)
 }

 const handleKeyDown = (e) =>{
  if(!search && selected.length > 0 && e.key === "Backspace")
 {
  const lastSelected =selected.length -1

  const dell = selected.filter((e,i)=> i !== lastSelected)
  setSelected(dell)

 }
 }
  useEffect(()=>{
    fetchSuggestion()
  },[search])

  return (
<>
<div className='container'>

  <h2>Please search Here in order to get your Suggestion</h2>
  
  <div className='input-dev'>
 
<div className='selected-single'>   {selected?.map((e, index)=>( <div className='selected-person'>
      {e.firstName + " " + e.lastName} 
      <span className='close' onClick={()=>handleRemove(e)} >X</span>
    </div>
    ))} 
    </div>
<div className='input-portion'>

  <input onKeyDown={handleKeyDown} ref={searchRef} type='text' value={search} placeholder='Enter your Search' onChange={(e)=> setSearch(e.target.value) }
    />
    </div>
 </div>
  
 <div >
  {Suggestion.length>0  && search && 
  <div className='main'>
  {Suggestion?.map((user,index)=>{ 
 return( !unique.has(user.email) ?
   (<div onClick={()=>handleSelect(user)} className='sug-section'  key={index}>
      <img className='sug-img' src={user.image} alt={user.username} />
      <div className='sug-names'>
    <div className='forname'>
        <div>{user.firstName +" " +user.lastName}</div>
     <div>{user.email}</div>
    </div>
        
      </div>
    </div>) : <></>
 )  
    }

  )}
 </div>}
</div>
</div>

 </>

 
 
  )
}

export default App;
