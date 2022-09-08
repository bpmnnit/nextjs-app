// our-domain.com/
import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browwse a huge list of highly active React Meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  // This fucntion is called for Static Generation (a type of Pre-rendering) before any component function is called.
  // We need to call this, if let's say we neet to pre-render a page with the data we need to fetch from an API/database.
  const client = await MongoClient.connect(
    'mongodb://gsadmin:harekrishna@localhost:8001/gsdb'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // Validate every 10 secs, on the server side, for changes, new requests get the new page, not the old one. (Incremental Static Generation)
  };
}

export default HomePage;
