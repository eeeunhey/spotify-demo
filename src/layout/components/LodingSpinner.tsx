import styled, { keyframes, css } from "styled-components";
import { useTheme } from "@mui/material/styles";

type LoadingSpinnerProps = {
  size?: number;   // 전체 크기(px)
  speed?: number;  // 한 사이클 시간(s)
  color?: string;  // 점 색(없으면 theme.primary.main)
  message?: string;
};

const ellipsis1 = keyframes`
  0% { transform: scale(0); }
  100% { transform: scale(1); }
`;

const ellipsis2 = keyframes`
  0% { transform: translate(0, 0); }
  100% { transform: translate(24px, 0); }
`;

const ellipsis3 = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(0); }
`;

const Wrap = styled.div`
  display: grid;
  place-items: center;
  gap: 12px;
`;

const Stage = styled.div<{ $size: number; $color: string }>`
  display: inline-block;
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ $color }) => $color}; /* currentColor */
`;

const Dot = styled.div<{ $size: number; $speed: number; $nth: 1 | 2 | 3 | 4 }>`
  box-sizing: border-box;
  position: absolute;

  top: ${({ $size }) => Math.round($size * (33.33333 / 80))}px;
  width: ${({ $size }) => Math.round($size * (13.33333 / 80))}px;
  height: ${({ $size }) => Math.round($size * (13.33333 / 80))}px;

  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);

  /* 🔥 브랜드 톤에 맞는 은은한 글로우 */
  box-shadow: 0 0 10px rgba(219, 91, 5, 0.25);

  ${({ $nth, $size, $speed }) => {
    const left1 = Math.round($size * (8 / 80));
    const left3 = Math.round($size * (32 / 80));
    const left4 = Math.round($size * (56 / 80));

    if ($nth === 1) {
      return css`
        left: ${left1}px;
        animation: ${ellipsis1} ${$speed}s infinite;
      `;
    }
    if ($nth === 2) {
      return css`
        left: ${left1}px;
        animation: ${ellipsis2} ${$speed}s infinite;
      `;
    }
    if ($nth === 3) {
      return css`
        left: ${left3}px;
        animation: ${ellipsis2} ${$speed}s infinite;
      `;
    }
    return css`
      left: ${left4}px;
      animation: ${ellipsis3} ${$speed}s infinite;
    `;
  }}
`;

const Text = styled.div`
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  opacity: 0.9;
`;

export default function LoadingSpinner({
  size = 80,
  speed = 0.6,
  color,
  message,
}: LoadingSpinnerProps) {
  const muiTheme = useTheme();

  // ✅ 네 테마 색 자동 반영 (primary.main = #DB5B05)
  const resolvedColor = color ?? muiTheme.palette.primary.main;

  return (
    <Wrap role="status" aria-live="polite">
      <Stage $size={size} $color={resolvedColor} aria-hidden="true">
        <Dot $size={size} $speed={speed} $nth={1} />
        <Dot $size={size} $speed={speed} $nth={2} />
        <Dot $size={size} $speed={speed} $nth={3} />
        <Dot $size={size} $speed={speed} $nth={4} />
      </Stage>

      {message ? <Text>{message}</Text> : null}
    </Wrap>
  );
}
