import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO: Fill in your values for the 3 types of auth.
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {

  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("./index.ejs", {content:result});
  } catch (error){
    console.log(error)
    res.render("./index.ejs", {error:error});
  }
  
});

app.get("/basicAuth", async (req, res) => {

  const page = 2;
  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/all?page=${page}`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const data = JSON.stringify(response.data);
    // console.log(data)
    res.render("index.ejs", {content:data});
  } catch (error) {
    console.log(error);
    res.render("index.ejs", {error:error});
  } 
});

app.get("/apiKey", async (req, res) => {

  const score = 5;
  try{
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter`, {
      params: {
        score: score,
        apiKey: yourAPIKey,
      },
    });
    const data = JSON.stringify(response.data);
    // console.log(data)
    res.render("index.ejs", {content:data});
  } catch (error) {
    console.log(error);
    res.render("index.ejs", {error:error});
  } 
});

app.get("/bearerToken", async (req, res) => {

 const id = 42;
 const api = `https://secrets-api.appbrewery.com/secrets/${id}`;

  try{
    const response = await axios.get(api, {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });
    const data = JSON.stringify(response.data);
    res.render("index.ejs", {content:data});
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  } 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
