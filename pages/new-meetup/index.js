// our-domain.com/new-meetup
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Create Meetup</title>
        <meta
          name='description'
          content='Create you won meetups and meet amazing developers who want to do exciting React Meetups '
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
