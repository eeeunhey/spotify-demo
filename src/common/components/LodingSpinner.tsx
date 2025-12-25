
import styled, { keyframes } from "styled-components";

type LoadingSpinnerProps = {
  size?: number;           // 전체 크기(px)
  speed?: number;          // 1회전 시간(s)
  colors?: [string, string, string]; // 3개 점 색
  message?: string;
};

const orbit = keyframes`
  0%, 100% { transform: translate(var(--x1), var(--y1)); }
  33.333%  { transform: translate(var(--x2), var(--y2)); }
  66.666%  { transform: translate(var(--x3), var(--y3)); }
`;

const Wrap = styled.div`
  display: grid;
  place-items: center;
  gap: 12px;
`;

const Stage = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  position: relative;

  /* 삼각형 꼭짓점(중앙 기준 이동값) */
  --x1: 0px;                 --y1: calc(-1 * ${({ $size }) => Math.round($size * 0.30)}px); /* top */
  --x2: calc(-1 * ${({ $size }) => Math.round($size * 0.26)}px); --y2: ${({ $size }) => Math.round($size * 0.20)}px; /* left */
  --x3: ${({ $size }) => Math.round($size * 0.26)}px;            --y3: ${({ $size }) => Math.round($size * 0.20)}px; /* right */
`;

const Dot = styled.span<{
  $size: number;
  $speed: number;
  $color: string;
  $delay: number;
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${({ $size }) => Math.max(10, Math.round($size * 0.22))}px;
  height: ${({ $size }) => Math.max(10, Math.round($size * 0.22))}px;
  border-radius: 999px;
  background: ${({ $color }) => $color};
  box-shadow: ${({ $color }) => `0 0 16px ${$color}80`};
  transform: translate(var(--x1), var(--y1));
  animation: ${orbit} ${({ $speed }) => $speed}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  will-change: transform;
`;

const Text = styled.div`
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  opacity: 0.9;
`;

export default function LoadingSpinner({
  size = 84,
  speed = 1.1,
  colors = ["#e5683fff", "#e9c558ff", "#f89b31ff"], // 오렌지/옐로 느낌
  message,
}: LoadingSpinnerProps) {

  const d = speed / 3;

  return (
    <Wrap role="status" aria-live="polite">
      <Stage $size={size} aria-hidden="true">
        <Dot $size={size} $speed={speed} $color={colors[0]} $delay={0} />
        <Dot $size={size} $speed={speed} $color={colors[1]} $delay={-d} />
        <Dot $size={size} $speed={speed} $color={colors[2]} $delay={-2 * d} />
      </Stage>
      {message ? <Text>{message}</Text> : null}
    </Wrap>
  );
}
