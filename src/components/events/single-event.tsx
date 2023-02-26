import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SingleEvent = ({ data, pageName }: any) => {
    const inputEmail = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [message, setMessage] = useState('');

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const email = inputEmail.current?.value;
        const eventId = router?.query.id;
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email && !emailRegex.test(email)) {
            setMessage('Please introduce a valid email address');
            return;
        }

        try {
            const response = await fetch('/api/email-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, eventId }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setMessage(data.message);
            
            if (inputEmail.current) {
                inputEmail.current.value = '';
            }
        } catch (err) {
            console.log('Error', err);
        }
    };

    return (
        <div className='event_single_page'>
            <h1>{data.title}</h1>
            <Image
                src={data.image}
                width={1000}
                height={500}
                alt={data.title}
            />
            <p>{data.description}</p>
            <form onSubmit={onSubmit} className='email_registration'>
                <label>Get registered for this event!</label>
                <input
                    ref={inputEmail}
                    type='email'
                    id='email'
                    placeholder='Please insert your email here'
                />
                <button type='submit'> Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default SingleEvent;
