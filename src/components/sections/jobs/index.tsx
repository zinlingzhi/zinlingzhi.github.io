import React, { useState, useRef, useEffect } from 'react';
import { KEY_CODES } from '@utils/index';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import sr from '@utils/sr';
import { srConfig } from '@config/index';
import usePrefersReducedMotion from '@hooks/usePrefersReducedMotion';
import { CSSTransition } from 'react-transition-group';


const StyledJobsSection = styled.section`
  max-width: 700px;
  .inner {
    display: flex;
    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping

    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button<{isActive: Boolean}>`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: ${({ isActive }) => (isActive ? '2px solid var(--green)' : '2px solid var(--lightest-navy)')};;
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }

  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;


const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({theme}) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;
    .company {
      color: var(--green);
    }
  }

  .range {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
  .skills {
    margin-bottom: 15px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
  }
`;
interface NodeFrontmatter {
  title: string;
  company: string;
  location: string;
  range: string;
  skills: string;
  url: string;
} 

interface GraphQLNode {
  node: {
    frontmatter: NodeFrontmatter;
    html: string;
  }
}

const Jobs = () => {

  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              skills
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData: GraphQLNode[] = data.jobs.edges;
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<number>(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>(Array.from({ length: jobsData.length }, () => null));
  const revealContainer = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollRevealObjectOptions = srConfig()

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    if (revealContainer.current) {
      sr?.reveal(revealContainer.current, scrollRevealObjectOptions)
    }
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus]?.focus();
      return;
    }

    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }

    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  }


  const onKeyDown = (e: any) => {
    switch(e.key) {
      case KEY_CODES.ARROW_UP: 
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      case KEY_CODES.ARROW_DOWN:
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      default:
        break;
    }
  }
  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className='numbered-heading'>Where I've worked</h2>

      <div className='inner'>
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({node}, i: any) => {
              const { company } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id = {`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? 0 : -1}
                  aria-selected={activeTabId === i ? true:false}
                  aria-controls={`panel-${i}`}
                  >
                  <span>{company}</span>
                </StyledTabButton>
              );
            })
          }
        </StyledTabList>
        <StyledTabPanels>
          {jobsData &&
            jobsData.map(({ node }, i: any) => {
              const { frontmatter, html } = node;
              const { title, url, company, range, skills } = frontmatter;
              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? 0: -1}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                      <h3>
                        <span>{title}</span>
                        <span className='company'>
                          &nbsp;@&nbsp;
                          <a href={url} className='inline-link'>
                            {company}
                          </a>
                        </span>
                      </h3>
                      <p className='range'>{range}</p>
                      <p className='skills'>Most Used Skills: {skills}</p>
                      <div dangerouslySetInnerHTML={{__html: html}} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledJobsSection>
  )
};

export default Jobs;