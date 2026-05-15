import { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface GameLockContextType {
  isLocked: boolean;  // 게임 진행 중 (종료 전)
  isPaused: boolean;  // 일시정지 상태
  isInfiniteMode: boolean; // 무한모드 진행 중
  setLocked: (v: boolean) => void;
  setPaused: (v: boolean) => void;
  setInfiniteMode: (v: boolean) => void;
  setInfiniteSaveCallback: (cb: ((targetPath: string) => void) | null) => void;
  infiniteSaveCallback: ((targetPath: string) => void) | null;
  /** 같은 페이지에서 '나가기' 클릭 시 게임 상태를 리셋하는 콜백 (GamePage 등록) */
  exitGameCallback: (() => void) | null;
  setExitGameCallback: (cb: (() => void) | null) => void;
}

const GameLockContext = createContext<GameLockContextType>({
  isLocked: false,
  isPaused: false,
  isInfiniteMode: false,
  setLocked: () => {},
  setPaused: () => {},
  setInfiniteMode: () => {},
  setInfiniteSaveCallback: () => {},
  infiniteSaveCallback: null,
  exitGameCallback: null,
  setExitGameCallback: () => {},
});

export function GameLockProvider({ children }: { children: ReactNode }) {
  const [isLocked, setLocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInfiniteMode, setInfiniteMode] = useState(false);
  const callbackRef = useRef<((targetPath: string) => void) | null>(null);
  const exitCallbackRef = useRef<(() => void) | null>(null);
  const [, forceUpdate] = useState(0);

  const setInfiniteSaveCallback = (cb: ((targetPath: string) => void) | null) => {
    callbackRef.current = cb;
    forceUpdate(n => n + 1);
  };

  const setExitGameCallback = (cb: (() => void) | null) => {
    exitCallbackRef.current = cb;
    forceUpdate(n => n + 1);
  };

  return (
    <GameLockContext.Provider value={{
      isLocked, isPaused, isInfiniteMode,
      setLocked, setPaused: setIsPaused,
      setInfiniteMode, setInfiniteSaveCallback,
      infiniteSaveCallback: callbackRef.current,
      exitGameCallback: exitCallbackRef.current,
      setExitGameCallback,
    }}>
      {children}
    </GameLockContext.Provider>
  );
}

export function useGameLock() {
  return useContext(GameLockContext);
}
