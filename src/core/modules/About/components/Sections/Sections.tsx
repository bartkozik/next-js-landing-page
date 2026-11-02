import { motion, AnimatePresence, useInView } from 'framer-motion';
import { JSX, useEffect, useRef, useState, useLayoutEffect } from 'react';
import React from 'react';
import { Section } from '../../sectionContent';
import styles from './Sections.module.scss';

declare global {
  interface Window {
    scrollingViaNav?: boolean;
  }
}

interface CalloutBlocks {
  callout: CalloutBlock;
  content: ContentBlock[];
}

interface CalloutBlock {
  type: 'callout';
  text: string;
}

interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

interface ListBlock {
  type: 'list';
  items: string[];
}

interface BulletsBlock {
  type: 'bullets';
  entries: {
    title: string;
    content: string;
  }[];
}

type ContentBlock = ParagraphBlock | ListBlock | BulletsBlock;

interface SectionBlocksProps {
  blocks: Section['blocks'];
  index: number;
  activeSection: number;
  hasVisited: boolean;
}

const groupBlocksByCallout = (blocks: SectionBlocksProps['blocks']): CalloutBlocks[] => {
  return blocks.reduce<CalloutBlocks[]>((groups, block) => {
    switch (block.type) {
      case 'callout':
        return [...groups, { callout: block, content: [] }];
      case 'paragraph':
      case 'list':
      case 'bullets':
        if (groups.length === 0) return groups;
        return [
          ...groups.slice(0, -1),
          {
            ...groups[groups.length - 1],
            content: [...groups[groups.length - 1].content, block],
          },
        ];
      default:
        return groups;
    }
  }, []);
};

const renderContentBlock = (block: ContentBlock, groupIdx: number, idx: number): JSX.Element | null => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={`paragraph-${groupIdx}-${idx}`} className={styles.sectionParagraph}>
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul key={`list-${groupIdx}-${idx}`} className={styles.sectionList}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'bullets':
      return (
        <div key={`bullets-${groupIdx}-${idx}`} className={styles.sectionBullets}>
          {block.entries.map((entry, eIdx) => (
            <div key={eIdx}>
              <strong>{entry.title}</strong>
              <div>{entry.content}</div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};
interface CalloutGroupProps {
  group: CalloutBlocks;
  groupIdx: number;
  isOpen: boolean;
  onToggle?: () => void;
}

const CalloutGroup = ({ group, groupIdx, isOpen, onToggle }: CalloutGroupProps): JSX.Element => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(ref, { margin: '-15% 0px -15% 0px', once: true });

  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (isOpen && isInView && contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, isInView]);

  return (
    <>
      <motion.p
        layout="position"
        className={styles.sectionCallout}
        key={`callout-${groupIdx}`}
        ref={ref}
        onClick={onToggle}
      >
        {group.callout.text}
      </motion.p>

      <AnimatePresence>
        {isOpen && isInView && group.content.length > 0 && (
          <motion.div
            key={`content-${groupIdx}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: measuredHeight ?? 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ overflow: 'hidden', display: 'block' }}
          >
            <div ref={contentRef}>{group.content.map((block, idx) => renderContentBlock(block, groupIdx, idx))}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface SectionBlocksProps {
  blocks: Section['blocks'];
  index: number;
  activeSection: number;
  hasVisited: boolean;
  isMobile: boolean;
}

const SectionBlock = ({ blocks, index, activeSection, hasVisited, isMobile }: SectionBlocksProps): JSX.Element[] => {
  const isOpen = index <= activeSection || hasVisited;
  const groups = groupBlocksByCallout(blocks);

  const [openGroups, setOpenGroups] = useState<Set<number>>(new Set());

  const toggleGroup = (idx: number): void => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);

      return next;
    });
  };

  return groups.map((group, groupIdx) => (
    <CalloutGroup
      group={group}
      groupIdx={groupIdx}
      isOpen={isMobile ? openGroups.has(groupIdx) : isOpen}
      onToggle={isMobile ? () => toggleGroup(groupIdx) : undefined}
      key={groupIdx}
    />
  ));
};

interface SectionsProps {
  sections: Section[];
  isSectionInView: boolean;
  isMobile?: boolean;
}

const Sections = ({ sections, isSectionInView, isMobile = false }: SectionsProps): JSX.Element => {
  const containerRef = React.useRef<HTMLElement | null>(null);
  const sectionRefs = React.useRef<HTMLElement[]>([]);

  const [activeSection, setActiveSection] = React.useState(-1);
  const [visitedSections, setVisitedSections] = React.useState<Set<number>>(new Set());

  useEffect(() => {
    if (!isSectionInView) return;

    const handleScroll = (): void => {
      if (window.scrollingViaNav) return;

      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;

      if (window.scrollY === 0 && activeSection === -1) return;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;

        if (sectionTop <= windowHeight && sectionBottom >= windowHeight) {
          if (activeSection !== i) {
            setVisitedSections((prev) => {
              if (prev.has(i)) return prev;
              const next = new Set(prev);
              next.add(i);
              return next;
            });
            setActiveSection(i);
          }
          break;
        }
      }
    };

    const container = containerRef.current;
    if (container) container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSectionInView, activeSection]);

  return (
    <section ref={containerRef} className={styles.root}>
      {sections.map((section, index) => {
        return (
          <article
            key={section.id}
            className={styles.section}
            aria-labelledby={`section-title-${section.id}`}
            ref={(el) => {
              if (el) sectionRefs.current[index] = el;
            }}
          >
            <h2 id={`section-title-${section.id}`} className={styles.sectionTitle}>
              {section.title}
            </h2>
            <SectionBlock
              blocks={section.blocks}
              index={index}
              activeSection={activeSection}
              hasVisited={visitedSections.has(index)}
              isMobile={isMobile}
            />
          </article>
        );
      })}
    </section>
  );
};

export default Sections;
