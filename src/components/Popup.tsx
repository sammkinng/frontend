import React, { useState } from 'react';
import { TableItem } from '../App';

interface PopupFormProps {
    onClose: () => void;
  }

const PopupForm:React.FC<PopupFormProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<TableItem>({
        name: '',
        email: '',
        phone: '',
        hobbies: ''
    });

    const [phoneError, setPhoneError] = useState(false)
    const [mailError, setMailError] = useState(false)

    const handleChange = (e :React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'email') {
            if (!validateEmail(e.target.value)) {
                setMailError(true)
            }
            else {
                setMailError(false)
            }
        }
        else if (e.target.name === 'phone') {
            if (!validatePhoneNumber(e.target.value)) {
                setPhoneError(true)
            } else {
                setPhoneError(false)
            }
        }
    };

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onClose();
    };

    function validateEmail(email:string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhoneNumber(phoneNumber:string) {
        // Ensure that the phone number contains only numeric characters
        const numericRegex = /^[0-9]+$/;

        // Ensure that the phone number has a length of 10 digits
        const lengthValid = phoneNumber.length === 10;

        return numericRegex.test(phoneNumber) && lengthValid;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded-md">
                <button className="absolute top-4 right-4 text-gray-100 font-black" onClick={onClose}>
                    X
                </button>
                <h2 className="text-2xl font-bold mb-4">Add Data</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='John Doe'
                            className="mt-1 p-2 border rounded-md w-full"
                        />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='johndoe@mail.com'
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                        {mailError && <div className='text-red-600'>Invalid Email</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder='Enter 10 digit number'
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                        {phoneError && <div className='text-red-600'>Inavlid phone</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="hobbies" className="block text-sm font-medium text-gray-700">
                            Hobbies
                        </label>
                        <input
                            type="text"
                            required
                            id="hobbies"
                            name="hobbies"
                            value={formData.hobbies}
                            onChange={handleChange}
                            placeholder='Seperate Each Hobby with Comma'
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;