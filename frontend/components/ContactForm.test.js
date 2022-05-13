import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm/>);
});

test('renders the contact form header', () => {
    render(<ContactForm/>)

    const headerElem = screen.queryByText(/Contact Form/i)

    expect(headerElem).toBeInTheDocument()
    expect(headerElem).toBeTruthy()
    expect(headerElem).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstNameField = screen.getByLabelText(/First Name*/i)

    userEvent.type(firstNameField, 'edd');

    const errorMessage = await screen.findAllByTestId('error')
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

   await waitFor(() => {
       const errorMessages = screen.queryAllByTestId('error')
       expect(errorMessages).toHaveLength(3);
   })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const firstNameField = screen.getByLabelText(/First Name*/i)
        userEvent.type(firstNameField, 'kohlten')
    const LastNameField = screen.getByLabelText(/Last Name*/i)
        userEvent.type(LastNameField, 'bills')

    const button = screen.getByRole('button')
        userEvent.click(button)
    
    const errorMessages = await screen.getAllByTestId('error')
        expect(errorMessages).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const emailField = screen.getByLabelText(/email*/i)
        userEvent.type(emailField, 'kohlten@gmail')

    const errorMessage = await screen.findByText(/email must be a valid email address/i)
        expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const subButton = screen.getByRole('button')
        userEvent.click(subButton)
    const errorMessage = await screen.findByText(/lastName is a required field/i)
        expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/first name*/i)
    const LastName = screen.getByLabelText(/last name*/i)
    const emailField = screen.getByLabelText(/email*/i)
        
        userEvent.type(firstName, 'kohlten')
        userEvent.type(LastName, 'bills')
        userEvent.type(emailField, 'kohlten@mail.com')

    const button = screen.getByRole('button')
        userEvent.click(button)
    
    await waitFor(() => {
        const firstName = screen.queryByText('kohlten')
        const lastName = screen.queryByText('bills')
        const emailField = screen.queryByText('kohlten@mail.com')
        // const messageDisplay = screen.queryByTestId('messageDisplay')

        expect(firstName).toBeInTheDocument()
        expect(lastName).toBeInTheDocument()
        expect(emailField).toBeInTheDocument()
        // expect(messageDisplay).toBeInTheDocument()
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/first name*/i)
    const LastName = screen.getByLabelText(/last name*/i)
    const emailField = screen.getByLabelText(/email*/i)
    const messageField = screen.getByLabelText(/message/i)

        userEvent.type(firstName, 'kohlten')
        userEvent.type(LastName, 'bills')
        userEvent.type(emailField, 'kohlten@mail.com')
        userEvent.type(messageField, 'hello world')

    const button = screen.getByRole('button')
        userEvent.click(button)
    
    await waitFor(() => {
        const firstName = screen.queryByText('kohlten')
        const lastName = screen.queryByText('bills')
        const emailField = screen.queryByText('kohlten@mail.com')
        const messageDisplay = screen.queryByText('hello world')

        expect(firstName).toBeInTheDocument()
        expect(lastName).toBeInTheDocument()
        expect(emailField).toBeInTheDocument()
        expect(messageDisplay).toBeInTheDocument()
    })
});
