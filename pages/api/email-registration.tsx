import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

interface Event {
    id: string;
    title: string;
    city: string;
    description: string;
    image: string;
    emails_registered: [string];
}

function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath: string) {
    const jsonData: Buffer = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData.toString());
    return data;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);

    if (!allEvents) {
        return res.status(404).json({
            status: 404,
            message: 'Events data not found',
        });
    }

    if (method === 'POST') {
        const { email, eventId } = req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
        }

        const newAllEvents = allEvents.map((e: Event) => {
            if (e.id === eventId) {
                if (e.emails_registered.includes(email)) {
                    res.status(409).json({
                        message: 'This email has already been registered',
                    });
                    return e;
                }
                return {
                    ...e,
                    emails_registered: [...e.emails_registered, email],
                };
            }
            return e;
        });

        fs.writeFileSync(
            filePath,
            JSON.stringify({ events_categories, allEvents: newAllEvents })
        );

        res.status(201).json({
            message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
        });
    }
}
