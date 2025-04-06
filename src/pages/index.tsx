import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function Section({title, children}: {title: string; children: ReactNode}) {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>{title}</Heading>
        <div className={styles.sectionContent}>{children}</div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Hyperlink London"
      description="Student-led organisation pioneering the future of transportation through Hyperloop technology">
      <HomepageHeader />
      <main>
        <Section title="Overview">
          <p>
            Hyperlink London is a student-led organisation based at Queen Mary University of London, 
            dedicated to pioneering the future of transportation through the development of Hyperloop technology. 
            Our multidisciplinary team comprises over 70 talented individuals from various academic backgrounds 
            and universities across London, all united by a shared vision to revolutionize high-speed travel.
          </p>
        </Section>

        <Section title="Mission">
          <p>
            Our mission is to accelerate the implementation of Hyperloop systems in Europe by designing 
            and constructing operational prototypes and conducting comprehensive research on their scalability 
            and integration into existing infrastructures.
          </p>
        </Section>

        <Section title="Current Projects">
          <h3>Hyperloop Pod Prototype</h3>
          <p>
            We are in the process of building London's first fully operational Hyperloop pod. 
            This project focuses on creating a financially viable prototype that demonstrates 
            the potential for future scalability and real-world application.
          </p>
        </Section>

        <Section title="Achievements">
          <ul>
            <li><strong>2023-2024:</strong> 1st Place Award for the Braking Subsystem at Hyperloop Global.</li>
            <li><strong>2022-2023:</strong> Sustainability and Innovation Society Award from Queen Mary University of London and the Innovation Award from Bright Network.</li>
            <li><strong>2021-2022:</strong> 1st Place Award for the Low Power Electronics Subsystem and 2nd Place Award for the Propulsion Subsystem at the Canadian Hyperloop Conference.</li>
          </ul>
        </Section>

        <Section title="Departments">
          <ul>
            <li><strong>Engineering:</strong> Focused on the design and development of core systems for the Hyperloop pod, ensuring efficient and safe operations.</li>
            <li><strong>Research:</strong> Conducting studies on the feasibility, safety, and societal impact of Hyperloop technology, with dedicated teams in Biomedical and Scalability research.</li>
            <li><strong>Operations:</strong> Managing partnerships, marketing, logistics, and outreach to ensure smooth project execution and community engagement.</li>
            <li><strong>Associates Team:</strong> Providing new members with opportunities to explore various departments, build skills through training sessions and workshops, and contribute to innovative projects.</li>
          </ul>
        </Section>
      </main>
    </Layout>
  );
}
