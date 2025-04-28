import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  // Hero is now just a centered image on a dark background
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <img src={require('@site/static/img/logo.png').default} alt="Hyperlink London Logo" className={styles.heroLogoImg} />
    </header>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinksSection}>
      <div className="container">
        <div className={styles.quickLinksGrid}>
          <Link className={styles.quickLinkCard} to="/team">
            <span role="img" aria-label="Team" className={styles.quickLinkIcon}>👥</span>
            <span>Team Directory</span>
          </Link>
          <Link className={styles.quickLinkCard} to="/leadership">
            <span role="img" aria-label="Leadership" className={styles.quickLinkIcon}>⭐</span>
            <span>Leadership</span>
          </Link>
          <Link className={styles.quickLinkCard} to="/docs/software-documentation/intro">
            <span role="img" aria-label="Docs" className={styles.quickLinkIcon}>📄</span>
            <span>Software Docs</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InternalUpdates() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Internal Updates</Heading>
        <div className={styles.sectionContent}>
          <ul>
            <li>Check the <Link to="/team">Team Directory</Link> for contact info and roles.</li>
            <li>See <Link to="/docs/software-documentation/intro">Software Docs</Link> for onboarding and technical resources.</li>
            <li>Visit <Link to="/leadership">Leadership</Link> for department heads and responsibilities.</li>
            <li>For announcements, check the #announcements channel on Slack/Discord.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Hyperlink London Internal Portal"
      description="Internal portal for Hyperlink London members to access team, leadership, and documentation resources."
    >
      <HomepageHeader />
      <main>
        <InternalUpdates />
      </main>
    </Layout>
  );
}
