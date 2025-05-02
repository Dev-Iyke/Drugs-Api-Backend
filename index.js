const express = require("express")
const dotenv = require("dotenv")
const { drugs } = require("./data")

const app = express()
dotenv.config()
app.use(express.json())
const port = process.env.PORT
app.listen(port, (e) => {
  if(e){
    console.log('Error occurred: ', e)
  } else {
    console.log(`Server is running at port ${port}`)
  }
})

//Endpoints:
//QUESTION ONE
app.get("/drugs/antibiotics", (request, response) => {
  const antibiotics = drugs.filter((drug) => drug.category === 'Antibiotic')
  response.json({
    success: true,
    antibiotics
  })
})

//QUESTION TWO
app.get("/drugs/names", (request, response) => {
  const drugNamesInLowercase = drugs.map((drug) => drug.name.toLowerCase())
  response.json({
    success: true,
    drugNamesInLowercase
  })
})

//QUESTION THREE
app.post("/drugs/by-category", (request, response) => {
  const userInput = request.body
  if(!userInput){
    response.json({
      success: false,
      details: "Invalid body input"
    })
    return
  }
  const category = userInput.category
  if(!category){
    response.json({
      success: false,
      details: "Invalid category or no category found"
    })
    return
  }
  const drugsByCategory = drugs.filter((drug) => drug.category === category)
  response.json({
    success: true,
    drugsByCategory
  })
})

//QUESTION FOUR
app.get("/drugs/names-manufacturers", (request, response) => {
  const drugsWithManufacturers = drugs.map((drug) => ({name: drug.name, manufacturer: drug.manufacturer}))
  response.json({
    success: true,
    drugsWithManufacturers
  })
})

//QUESTION FIVE
app.get("/drugs/prescription", (request, response) => {
  const drugRequiringPrescription = drugs.filter((drug) => drug.isPrescriptionOnly)
  response.json({
    success: true,
    drugRequiringPrescription
  })
})

//QUESTION SIX
app.get("/drugs/formatted", (request, response) => {
  const formattedDrugs = []
  drugs.forEach((drug) => formattedDrugs.push(`Drug: ${drug['name']} - ${drug['dosageMg']}mg`))

  response.json({
    success: true,
    formattedDrugs
  })
})

//QUESTION SEVEN
app.get("/drugs/low-stock", (request, response) => {
  const drugsStockLessThan50 = drugs.filter(drug => drug.stock < 50)

  response.json({
    success: true,
    drugsStockLessThan50
  })
})

//QUESTION EIGHT
app.get("/drugs/non-prescription", (request, response) => {
  const drugNotRequiringPrescription = drugs.filter((drug) => !drug.isPrescriptionOnly)
  response.json({
    success: true,
    drugNotRequiringPrescription
  })
})

//QUESTION NINE
app.post("/drugs/manufacturer-count", (request, response) => {
  const userInput = request.body
  if(!userInput){
    response.json({
      success: false,
      details: "Invalid body input"
    })
    return
  }
  const manufacturer = userInput.manufacturer
  if(!manufacturer){
    response.json({
      success: false,
      details: "Invalid manufacturer or no manufacturer found"
    })
    return
  }
  const drugsByManufacturer =  drugs.filter(drug => drug.manufacturer === manufacturer)
  const count = drugsByManufacturer.length

  response.json({
    success: true,
    totalDrugs: count
  })
})

//QUESTION TEN
app.get("/drugs/count-analgesics", (request, response) => {
  let count = 0
  drugs.forEach(drug => drug.category === 'Analgesic' ? count ++ : count)

  response.json({
    success: true,
    analgesicDrugs: count
  })
})
