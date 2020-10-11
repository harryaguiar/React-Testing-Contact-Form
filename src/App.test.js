import React from "react";
import { screen, render } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";

test("renders App without crashing", () => {
  render(<App />);
});

test("checking that the test envirountment works", async () => {
  render(<ContactForm />);
  //simple test to see that the test envirounment works properly 
  const button = screen.getByTestId("input-submit");
  //console.log(button)
  expect(button).toBeInTheDocument();

  //check to see if you can submit the form 
  
  
  

})