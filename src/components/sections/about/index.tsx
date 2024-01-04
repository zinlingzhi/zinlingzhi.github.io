import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';


const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const 
About = () => {
  const skills = ['C#', '.NET', 'ASP.NET', 'Entity Framework', 'Web3', 'Solidty', 'QuantConnect', 'GraphQL', 'SQL', 'Azure', 'JavaScript (ES6+)', 'Angular'];
  return (
    <StyledAboutSection id="about">
      <h2 className='numbered-heading'>About me</h2>

      <div className='inner'>
        <StyledText>
          <div>
            <p>
              Hello! I am Bruce, a passionate software engineer with a strong background in web and desktop application development.
              My journey in development began in 2013 when I relocate to the UK. Since then I've honed my skills in 
              C#, JavaScript and delved into various industry domains, including Fintech and ServiceNow, and HealthCare.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://www.scottlogic.com/">software consulting company</a>,{' '} and {' '}
              <a href="https://spd.tech/">startup studio</a>. My
              main focus these days is implementing advanced AI-driven mechanisms to detect and prevent 
              fraudulent activities in financial transactions at {' '}
              <a href="https://upwwork.com/"> Upwork</a> for a variety of
              clients.
            </p>

            <p>
              I also {' '}
              <a href="https://www.educative.io/projects/build-a-rest-api-using-asp-net-core-6">
                launched a course
              </a>{' '}
              that covers everything you need to build a REST API using ASP.NET 6 for Restraunt Receipt Service.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>
          <ul className='skills-list'>
            {skills && skills.map((skill: any, i: number) => <li key={i}> {skill} </li>)}
          </ul>
        </StyledText>
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../../images/me.png"
              width={500}
              quality={95}
              formats={['auto', 'webp', 'avif']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  )
}

export default About;