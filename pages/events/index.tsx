import Image
 from 'next/image';
const EventsPage = ({ data }: any) => {
    return (
        <div>
            <h1>Events Page</h1>
            <div>
                {data.map((e: any) => (
                    <a key={e.id} href={`/events/${e.id}`}>
                        <Image
                            src={e.image}
                            alt={e.title}
                            width={300}
                            height={300}
                        />
                        <h2>{e.title}</h2>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;

export async function getStaticProps() {
    const { events_categories } = await import('../../data/data.json');
    return {
        props: {
            data: events_categories,
        },
    };
}
