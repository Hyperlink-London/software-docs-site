import React from 'react';
import Layout from '@theme/Layout';
import styles from './team.module.css';

const TeamMember = ({ name, imageUrl, role, githubUrl }) => (
  <div className={styles.teamMember}>
    <img src={imageUrl} alt={name} className={styles.teamMemberImage} />
    <h3>{name}</h3>
    <p>{role}</p>
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
      <svg
        className={styles.githubIcon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#000000"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
  </div>
);

export default function Team() {
  const leadership = [
    {
      name: 'Harry Barnish',
      imageUrl: 'https://avatars.githubusercontent.com/u/49901436?v=4',
      role: 'Head of Electrical',
      githubUrl: 'https://github.com/HarryB05',
    },
    {
      name: 'Bernard Lee',
      imageUrl: 'https://avatars.githubusercontent.com/u/34589202?v=4',
      role: 'Head of Software',
      githubUrl: 'https://github.com/Bernard-LTW',
    },
  ];

  const members = [
    {
      name: 'Sam Chen Yu',
      imageUrl: 'https://avatars.githubusercontent.com/u/150127006?v=4',
      role: 'Software Engineer',
      githubUrl: 'https://github.com/SamChenYu',
    },
    {
      name: 'Ivet',
      imageUrl: 'https://avatars.githubusercontent.com/u/154210365?v=4',
      role: 'Software Engineer',
      githubUrl: 'https://github.com/ivetLobo',
    },
  ];
  const associates = [
    {
      name: 'Eniola F',
      imageUrl: 'https://avatars.githubusercontent.com/u/184549130?v=4',
      role: 'Associate',
      githubUrl: 'https://github.com/eavkf',
    },
  ];

  return (
    <Layout title="Hyperlink Software Team" description="Get to know the Hyperlink Software team">
      <div className={styles.teamPage}>
        <h1>Hyperlink Software Team</h1>
        
        <div className={styles.teamSection}>
          <h2>Leadership</h2>
          <div className={styles.teamGrid}>
            {leadership.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>

        <div className={styles.teamSection}>
          <h2>Members</h2>
          <div className={styles.teamGrid}>
            {members.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>

        <div className={styles.teamSection}>
          <h2>Associates</h2>
          <div className={styles.teamGrid}>
            {associates.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 