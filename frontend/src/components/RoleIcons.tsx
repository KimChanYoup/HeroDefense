
// ────────────────────────────────────────────────
// WoW 역할 아이콘 (SVG)
// ────────────────────────────────────────────────
export const TankIcon = () => (
  <svg className="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);

export const MeleeIcon = () => (
  <svg className="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.68 13L16 11.68l5.46 5.46c.39.39.39 1.02 0 1.41l-1.41 1.41c-.39.39-1.02.39-1.41 0L14.68 13zM13 14.68L11.68 16l5.46 5.46c.39.39 1.02.39 1.41 0l1.41-1.41c.39-.39.39-1.02 0-1.41L13 14.68zM3.54 3.54a1 1 0 000 1.41L11.68 13l1.41-1.41L4.95 3.54a1 1 0 00-1.41 0zM3.54 19.05a1 1 0 001.41 0L13 11l-1.41-1.41-8.05 8.05a1 1 0 000 1.41z"/>
  </svg>
);

export const RangedIcon = () => (
  <svg className="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.88 12L17 8.12V11H7.41l1.59-1.59L7.59 8 4 11.59l3.59 3.59 1.41-1.41L7.41 13H17v2.88l3.88-3.88z"/>
  </svg>
);

export const StaffIcon = () => (
  <svg className="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5.27 5.27L3.86 3.86c-.78.78-.78 2.05 0 2.83l1.41 1.41c.78-.78.78-2.05 0-2.83zm14.87 0c-.78-.78-2.05-.78-2.83 0l-1.41 1.41c.78.78.78 2.05 0 2.83l1.41 1.41c.78-.78.78-2.05 0-2.83zM3.86 20.14c.78.78 2.05.78 2.83 0l1.41-1.41c-.78-.78-.78-2.05 0-2.83l-1.41-1.41c-.78.78-.78 2.05 0 2.83zm14.87 0l1.41 1.41c.78.78 2.05.78 2.83 0l-1.41-1.41c-.78-.78-.78-2.05 0-2.83l1.41 1.41zM22 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM4 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"/>
  </svg>
);

export const HealerIcon = () => (
  <svg className="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

export const CCIcon = () => (
  <svg className="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

/** 루트 이름에 따른 아이콘 렌더링 */
export function getRouteIcon(routeName: string) {
  const name = routeName.toLowerCase();
  if (name.includes('방어') || name.includes('수호') || name.includes('혈기') || name.includes('보호') || name.includes('양조') || name.includes('복수')) {
    return <TankIcon />;
  }
  if (name.includes('분노') || name.includes('무기') || name.includes('야성') || name.includes('고양') || name.includes('생존') || name.includes('무법') || name.includes('도검') || name.includes('부정') || name.includes('징벌') || name.includes('풍운') || name.includes('파멸') || name.includes('포식') || name.includes('사냥') || name.includes('암살') || name.includes('잠입') || name.includes('인술')) {
    return <MeleeIcon />;
  }
  if (name.includes('야수') || name.includes('사격') || name.includes('생존냥꾼')) {
    return <RangedIcon />;
  }
  if (name.includes('화염') || name.includes('조화') || name.includes('정기') || name.includes('파열') || name.includes('파흑') || name.includes('악흑') || name.includes('고흑') || name.includes('집정관') || name.includes('공허') || name.includes('비전')) {
    return <StaffIcon />;
  }
  if (name.includes('수양') || name.includes('회복') || name.includes('복원') || name.includes('신성') || name.includes('운무') || name.includes('증강')) {
    return <HealerIcon />;
  }
  if (name.includes('냉기')) {
    return <StaffIcon />;
  }
  return null;
}
