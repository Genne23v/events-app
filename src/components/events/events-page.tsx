import Image from 'next/image';
import Link from 'next/link';

const AllEvents = ({ data }: any) => {
    return (
        <div className='events_page'>
            {data?.map((e: any) => (
                <Link
                    className='card'
                    key={e.id}
                    href={`/events/${e.id}`}
                    passHref>
                    <Image
                        src={e.image}
                        alt={e.title}
                        width={420}
                        height={420}
                    />{' '}
                    <h2>{e.title} </h2>
                </Link>
            ))}
        </div>
    );
};

export default AllEvents;
