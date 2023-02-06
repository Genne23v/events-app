import Image from 'next/image';

const EventsCatPage = ({ data }: any) => {
    return (
        <div>
            <h1>Event Page</h1>
            {data.map((e: any) => (
                <a key={e.id} href={`/events/${e.city}/${e.id}`}>
                    <Image
                        src={e.image}
                        width={300}
                        height={300}
                        alt={e.title}
                    />
                    <h2>{e.title}</h2>
                    <p>{e.description}</p>
                </a>
            ))}
        </div>
    );
};

export default EventsCatPage;

export async function getStaticPaths() {
    const { events_categories } = await import('../../../data/data.json');
    const allPaths = events_categories.map((e) => {
        return {
            params: {
                cat: e.id.toString(),
            },
        };
    });
    return {
        paths: allPaths,
        fallback: false,
    };
}

export async function getStaticProps(context: any) {
    const id = context?.params.cat;
    const { allEvents } = await import('../../../data/data.json');
    const data = allEvents.filter((e) => e.city === id);

    return {
        props: {
            data,
        },
    };
}
