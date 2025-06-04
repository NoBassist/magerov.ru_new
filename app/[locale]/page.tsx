import { getPayloadServer } from '@/lib/payloadServer';

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Field from "@/components/Field";
import Music from "@/components/Music";
import Contacts from "@/components/Contacts";


export default async function Home({ params: { lang } }: { params: { lang: 'en' | 'ru' } }) {
    const payload = await getPayloadServer();

    const t = await payload.findGlobal({
        slug: 'translations',
        locale: lang,
    });

    return (
        <>
        <main className= 'overflow-hidden'>
            {/*<Navbar />*/}
            <Hero data={t.hero} />
            {/*<About />*/}
            {/*<Field />*/}
            {/*<Music />*/}
            {/*<Contacts />*/}
        </main>
        </>
  );
}

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'ru' }];
}