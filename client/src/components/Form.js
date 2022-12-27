import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import List from './List';
import {default as api} from '../store/apiSlice';

export default function Form() {

    const {register, handleSubmit, resetField} = useForm();
    const [addTransaction] = api.useAddTransactionMutation();
   

    const onSubmit = async (data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('amount')
    }

    //categories addition
    const [selectVal , setSelectVal] = useState("")//Value of select

    const [data , setData] = useState("")
    const [newEntry , setNewEntry]= useState([])
   
    const submit = (e)=>{
        e.preventDefault();

        if(data){

            setNewEntry([...newEntry , data])
            console.log(newEntry);
            setData(" ")
        }else{
            alert("plz enter the ADD categories field")
        }

    }

  return (
    <div className="form max-w-sm mx-auto w-96">
        
        <h1 className='font-bold pb-4 text-xl'>ADD categories</h1>

        <form  onSubmit={submit}>
            <div className="grid gap-4 ">
                
        <input type="text" name='text' id='text' autoComplete='off' value={data}  onChange={(e)=> 
              setData(e.target.value)}/>
            </div>
        <button className='border py-2 text-white bg-orange-300 p-4 ' type='submit'>add</button>
        </form>



        <select onChange={(e)=>(setSelectVal(e.target.value))}>
        <option>food</option>
                  <option>fuel</option>
                  <option>Bills</option>
                  <option>Loan Installments</option>
                  <option>Grocery</option>
                  <option>Shopping</option>
                  <option>Transport</option>
                  <option>Medical</option>
                  <option>Family</option>
            {newEntry.map((opt)=>{
                  return <option key={opt} value={opt}>{opt}</option> 
            })}
        </select>


       
        
           <h1 className='font-bold pb-4 text-xl'>Transaction</h1>


        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="input-group">
                    <input type="text" {...register('name')}placeholder='Sallary, House Rend, SIP' className='form-input' value={selectVal} onChange={(e)=>(setSelectVal(e.target.value))}/>
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                </select>
                <div className="input-group">
                    <input type="text" {...register('amount')}  placeholder='Amount' className='form-input' />
                </div>
                <div className="submit-btn">
                    <button className='border py-2 text-white bg-orange-300 w-full'>Make Transaction</button>
                </div>
            </div>    
        </form>

        <List></List>
    </div>
  )
}
