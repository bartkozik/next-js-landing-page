'use client';

import { useIsMobile } from '@/core/hooks';
import Sticker from '@/core/theme/atoms/sticker';
import { motion } from 'framer-motion';
import { JSX, useEffect, useState } from 'react';
import styles from './FlyingStickers.module.scss';

interface FlyingStickersProps {
  stickers: string[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const STICKER_WIDTH = 130;
const STICKER_HEIGHT = 36.5;
const SAFE_PADDING_X = 20;
const SAFE_PADDING_X_RIGHT = 60;
const MAX_SAFE_PADDING_X_RIGHT = 280;
const SAFE_PADDING_Y = 6;

const FlyingStickers = ({ stickers, containerRef }: FlyingStickersProps): JSX.Element => {
  const isMobile = useIsMobile();
  const isViewport = typeof window !== 'undefined';

  const [positions, setPositions] = useState<{ left: string; top: string; transform: string }[]>([]);

  useEffect(() => {
    const calculatePositions = (): void => {
      const newPositions = stickers.map((_, index) => {
        if (isMobile) {
          const containerWidth = containerRef?.current?.offsetWidth ?? (isViewport ? window.innerWidth : 375);

          const viewportWidth = isViewport ? window.innerWidth : containerWidth;

          const maxLeftContainer = containerWidth - STICKER_WIDTH - SAFE_PADDING_X;
          const maxLeftViewport = viewportWidth - STICKER_WIDTH - SAFE_PADDING_X;
          const maxLeft = Math.max(SAFE_PADDING_X, Math.min(maxLeftContainer, maxLeftViewport));

          const left = SAFE_PADDING_X + Math.random() * (maxLeft - SAFE_PADDING_X);

          const VERTICAL_GAP = STICKER_HEIGHT + 15;
          const top = SAFE_PADDING_Y + index * VERTICAL_GAP + Math.random() * 10;

          return { left: `${left}px`, top: `${top}px`, transform: 'none' } as const;
        }

        const viewportWidth = isViewport ? window.innerWidth : 1440;
        const isMaxViewPort = viewportWidth >= 1920;
        const isBelowUltraWide = viewportWidth <= 2200;
        const isUltraWideViewPort = viewportWidth >= 2500;

        const band = isMaxViewPort ? viewportWidth / 2 : viewportWidth;
        const bandExpandRatio = isMaxViewPort && isBelowUltraWide ? 0.3 : 0.25;

        const bandWidth = band * bandExpandRatio;
        const verticalGap = 40;
        const baseY = 35;
        const maxSafePaddingRight = isUltraWideViewPort ? SAFE_PADDING_X_RIGHT : MAX_SAFE_PADDING_X_RIGHT;

        const inLeftZone = index % 2 === 0;
        const availableXRange = Math.random() * (bandWidth - STICKER_WIDTH - SAFE_PADDING_X * 2);
        const maxScreenRightRenderZone = viewportWidth / 2 + maxSafePaddingRight + availableXRange;

        const left = inLeftZone
          ? SAFE_PADDING_X + availableXRange
          : isMaxViewPort
            ? maxScreenRightRenderZone
            : viewportWidth - bandWidth - SAFE_PADDING_X_RIGHT + availableXRange;

        const offsetY = baseY + index * verticalGap + Math.floor(Math.random() * 30);

        return {
          left: `${left}px`,
          top: `${offsetY}px`,
          transform: 'translateY(-50%)',
        } as const;
      });

      setPositions(newPositions);
    };

    calculatePositions();

    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, [isMobile, stickers, containerRef, isViewport]);

  return (
    <>
      {stickers.map((text, index) => {
        const positionStyle = positions[index];

        return (
          <motion.div
            key={text}
            aria-hidden="true"
            animate={{ x: [0, -10, 0, 10, 0], opacity: [0, 1, 1, 1, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 4,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
            className={styles.floatingStickers}
            style={{ position: 'absolute', ...positionStyle }}
          >
            <Sticker text={text} />
          </motion.div>
        );
      })}
    </>
  );
};

export default FlyingStickers;
