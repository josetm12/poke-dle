import { useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { ImageWithFallbackProps } from '@/lib/types';
import { LoaderCircle } from 'lucide-react';

const colorMap: Record<string, string> = {
  black: '#2c2c2c',
  blue: '#89CFF0',
  brown: '#D2B48C',
  gray: '#B0C4DE',
  green: '#98FB98',
  pink: '#FFB6C1',
  purple: '#DDA0DD',
  red: '#FF7F7F',
  white: '#F8F8FF',
  yellow: '#FFFFE0',
  'dark-black': '#1a1a1a',
  'dark-blue': '#528aa3',
  'dark-brown': '#8c6d4a',
  'dark-gray': '#6c7b8b',
  'dark-green': '#5d8b5f',
  'dark-pink': '#d68a9b',
  'dark-purple': '#8c5d8b',
  'dark-red': '#b55a5a',
  'dark-white': '#e0e0e0',
  'dark-yellow': '#bfbf7f',
};

export default function ImageWithFallback({
  pokedexNumber = 0,
  gameWin = false,
  spriteBaseColor = 'gray',
  className,
  fallBack,
  alt = 'Pokemon Sprite',
}: ImageWithFallbackProps) {
  const { theme } = useTheme();
  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`
  );
  const [loading, setLoading] = useState(true);

  console.log('pokedexNumber ', pokedexNumber);
  const filterMaskStyle = !gameWin
    ? 'brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%)'
    : '';

  const colorKey = `${theme === 'dark' ? 'dark-' : ''}${spriteBaseColor}`;
  const shadowColor = colorMap[colorKey] || colorMap.gray;

  const style = {
    scale: gameWin ? 1.5 : 1,
    transition: 'scale 500ms ease-in',
    filter: `${filterMaskStyle} drop-shadow(.5rem .5rem 2rem ${shadowColor})`,
  };

  return (
    <div className={className + ''}>
      {true && <LoaderCircle className="animate-spin ml-auto mx-auto pt-5" />}
      <Image
        src={imgSrc}
        priority
        alt={alt}
        sizes="(max-width: 200px) 9rem"
        style={style}
        fill
        onLoad={() => setLoading(false)}
        onError={() => setImgSrc(fallBack)}
      />
    </div>
  );
}
