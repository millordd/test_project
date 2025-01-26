import { Logo } from '@shared/assets/icones/Logo';

export const Header = () => {
  return (
    <div className="bg-[white] h-14  flex items-center justify-between py-8 px-2 sticky z-[9999]">
      <Logo />
    </div>
  );
};
