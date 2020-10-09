import React from "react";
import { render } from "@testing-library/react";
import ContactForm from "./ContactForm";


test("renders Contact Form without crashing", () => {
    render(<ContactForm />);
  });
  