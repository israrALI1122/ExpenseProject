import React from "react"
import Form from "../Form"
import Graph from "../Graph"
import "./homepage.css"

const Homepage = ({setLoginUser}) => {
    return (
        <div className="homepage">
            <div className="App">
    <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 bg-slate-600 text-white rounded">Expense Tracker</h1>   
      <div className="grid md:grid-cols-2 gap-4">
          <Graph></Graph>
          <Form></Form>
      </div>
    </div>
  </div>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage