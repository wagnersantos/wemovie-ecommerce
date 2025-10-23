'use client';

import Image, { type StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import EmptyStateImg from '@/icon/empty-state.svg';
import { Button } from './ui/button';

export interface ShowStateProps {
  imageToLoad?: StaticImageData | string | (() => React.JSX.Element);
  text?: string;
  textButton?: string;
  classImg?: string;
}

export default function ShowState({
  imageToLoad = EmptyStateImg,
  text = "Parece que não há nada por aqui :(",
  textButton = "Recarregar página",
}: ShowStateProps) {
  const route = useRouter();
  return (
    <div className="flex flex-col items-center justify-items-start bg-white rounded-xl gap-6 px-[4.8438rem] py-16">
      <p className="text-center text-[#2F2E41] font-bold mb-4 px-3">
        {text}
      </p>

      {typeof imageToLoad === 'function' ? (
        <div className="w-44.75 h-66.5 mb-4 relative">
          {imageToLoad()}
        </div>
      ) : (
        <div className="w-44.75 h-66.5 mb-4 relative">
          <Image src={imageToLoad as StaticImageData} alt="Imagem não há nada por aqui" fill className="object-contain" />
        </div>
      )}

      <Button
        onClick={() => route.push('/')}
        className="px-6 py-2 text-white transition rounded cursor-pointer"
      >
       {textButton}
      </Button>
    </div>
  );
}
