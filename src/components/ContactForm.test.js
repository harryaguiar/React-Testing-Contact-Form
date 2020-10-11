import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from "./ContactForm";


test('user can fill out and submit the form', async () => {
    //render the component
    render(<ContactForm />);

// query the virtual DOM, so we can work with the inputs
const firstNameInput = screen.getByPlaceholderText(/edd/i);
const lastNameInput = screen.getByPlaceholderText(/burke/i);
const emailInput = screen.getByPlaceholderText(/bluebill/i);
//console.log(emailInput) //this helped me find a bug the palceholder should be on the email input not the label
const messageInput = screen.getByTestId(/message/i);
  //console.log(messageInput);
  const button = screen.getByTestId("input-submit");

  //check to see if you can fill out form inputs

fireEvent.change(firstNameInput, {target: {value: "Harrison"}});
fireEvent.change(lastNameInput, {target: {value: "Aguiar"}});
fireEvent.change(emailInput, {target: {value: "harryaguiar@gmail.com"}});
fireEvent.change(messageInput, {target: {value: "This is a test..."}});

  //assertion to make sure the inputs comtain the values typed in
  expect(firstNameInput).toHaveValue("Harrison"); 
  expect(lastNameInput).toHaveValue("Aguiar");
  expect(emailInput).toHaveValue("harryaguiar@gmail.com");

  //check to see if the message input is required 
  expect(messageInput).toBeRequired();//this helps me make the message area required since imo is important on the contact form to know what it is that the user is looking for

  //check to see if you can submit the form 
  fireEvent.click(button);


  //tests that check validation and the maxLength on the name input
  //helped me see that the form can not submit since the name input has a name bigger then the maxLength and the form can not submit at that point
  //test error message maxLength issue on the first name input
  //so i corrected the code and now the form can submit and the test is passing
  //this test checks to see if on the screen/ document there is a data coming back from the server
  const formData = await screen.findByText(/harrison/i) ;
  expect(formData).toHaveTextContent("Harrison");
  expect(formData).toBeTruthy();
  expect(formData).toBeInTheDocument();

})
test("test for the api call post request", async () => {
  render(<ContactForm />)

  //check for async calls and the post request
const apiCall = require("./ContactForm");
const axios = require("axios");
jest.mock("axios");
async () => {
  axios.post({
    data: [
      {
        id: 1,
        firstName: "harrison",
        lastName: "aguiar",
        email: "harryaguiar@gmail.com",
        message: "this is a test"
      }
    ]
  });
  const firstName = await apiCall();
  expect(firstName).toEqual("harrison");
}
})