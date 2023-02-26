import CatEvent from '@/src/components/events/catEvent';

const EventsCatPage = ({ data, pageName }: any) => {
    return <CatEvent data={data} pageName={pageName} />;
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
            pageName: id,
        },
    };
}
