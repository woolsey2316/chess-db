import Head from 'next/head';
import * as React from 'react';
import { ReactElement, useState } from 'react';
import '@/lib/env';

import EngineLinesPanel from '@/components/EngineLinesPanel';
import Layout from '@/components/Layout';
import Referee from '@/components/Referee';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [moves, setMoves] = useState('');
  return (
    <main>
      <Head>
        <title>Home Page</title>
      </Head>
      <section className='bg-[#262522]'>
        <div className='layout flex min-h-screen flex-row items-center justify-center py-12 text-center space-x-4'>
          <Referee setMoves={setMoves} />
          <EngineLinesPanel moves={moves}></EngineLinesPanel>
        </div>
      </section>
    </main>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
