import React, { memo, useState } from 'react';
import { Dimensions, GestureResponderEvent, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');
const DOT_SIZE = 20;
const DOT_SPACING = 100;
const GRID_SIZE = 3;

interface Props {
  handleResponse: () => void;
}

const Screen_Pattern = memo(({ handleResponse }: Props) => {
  const [pattern, setPattern] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);

  const defaultPattern: number[] = [2, 6, 8, 4, 2];

  const getDotPosition = (index: number) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    const startX = width / 2 - DOT_SPACING;
    const startY = height / 2 - DOT_SPACING;

    return {
      x: startX + col * DOT_SPACING,
      y: startY + row * DOT_SPACING,
    };
  };

  const getNearestDot = (x: number, y: number): number => {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const pos = getDotPosition(i);
      const distance = Math.sqrt(
        Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2),
      );
      if (distance < DOT_SIZE * 2) {
        return i;
      }
    }
    return -1;
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    if (isUnlocked) return;
    const { locationX, locationY } = event.nativeEvent;
    const dotIndex = getNearestDot(locationX, locationY);

    if (dotIndex !== -1) {
      setIsDrawing(true);
      setShowError(false);
      setPattern([dotIndex]);
    }
  };

  const handleTouchMove = (event: GestureResponderEvent) => {
    if (!isDrawing || isUnlocked) return;

    const { locationX, locationY } = event.nativeEvent;
    const dotIndex = getNearestDot(locationX, locationY);

    if (dotIndex !== -1 && !pattern.includes(dotIndex)) {
      setPattern(prev => [...prev, dotIndex]);
    }
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (!isDrawing || isUnlocked) return;
    let data = [...pattern];
    const { locationX, locationY } = event.nativeEvent;
    const dotIndex = getNearestDot(locationX, locationY);
    if (dotIndex !== -1 && dotIndex !== data[data.length - 1]) {
      data.push(dotIndex);
    }
    setIsDrawing(false);
    validatePattern(data);
  };

  const validatePattern = (data: number[]) => {
    const p = data.map(i => i + 1);
    const isCorrect = JSON.stringify(p) === JSON.stringify(defaultPattern);

    if (isCorrect) {
      unlockPhone();
    } else {
      showErrorMessage();
    }
  };

  const showErrorMessage = () => {
    setShowError(true);
  };

  const unlockPhone = () => {
    setIsUnlocked(true);
    resetPattern();
    handleResponse();
  };

  const resetPattern = () => {
    setPattern([]);
    setIsUnlocked(false);
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const pos = getDotPosition(i);
      dots.push(
        <Circle
          key={i}
          cx={pos.x}
          cy={pos.y}
          r={DOT_SIZE / 3}
          fill={
            pattern.includes(i) && showError
              ? colors.red
              : pattern.includes(i)
              ? colors.white
              : '#ccc'
          }
        />,
      );
    }
    return dots;
  };

  const renderLines = () => {
    return pattern.slice(0, -1).map((dot, i) => {
      const startPos = getDotPosition(dot);
      const endPos = getDotPosition(pattern[i + 1]);

      return (
        <Line
          key={`line-${i}`}
          x1={startPos.x}
          y1={startPos.y}
          x2={endPos.x}
          y2={endPos.y}
          stroke={showError ? colors.red : 'rgba(255,255,255,0.5)'}
          strokeWidth={4}
          strokeLinecap="round"
        />
      );
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg
        width={width}
        height={height}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderLines()}
        {renderDots()}
      </Svg>
    </View>
  );
});

export default Screen_Pattern;
