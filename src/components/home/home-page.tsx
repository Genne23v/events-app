import Image from 'next/image';
import Link from 'next/link';

const HomePage = ({ data }: any) => {
    return (
        <div className='home_body'>
            {data?.map((e: any) => (
                <Link
                    className='card'
                    key={e.id}
                    href={`/events/${e.id}`}
                    passHref>
                    <div className='image'>
                        <Image
                            src={e.image}
                            alt={e.title}
                            width={500}
                            height={300}
                        />
                    </div>
                    <div className='content'>
                        <h2>{e.title}</h2>
                        <p>{e.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default HomePage;
