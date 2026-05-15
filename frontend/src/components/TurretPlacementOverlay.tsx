import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT,
  FIELD_Y_MIN, FIELD_Y_MAX, HERO_MIN_X, TOWER_X,
} from '../game/constants';

interface Position { x: number; y: number; }

interface Props {
  maxTurrets: number;
  onConfirm: (positions: Position[]) => void;
}

/**
 * 메카닉 포탑 위치 지정 오버레이.
 * 게임 시작 전 플레이어가 포탑 위치를 클릭으로 지정.
 */
export default function TurretPlacementOverlay({ maxTurrets, onConfirm }: Props) {
  const { t } = useTranslation();
  const [placements, setPlacements] = useState<Position[]>([]);
  const fieldRef = useRef<HTMLDivElement>(null);

  // 배치 가능 영역: X = HERO_MIN_X ~ TOWER_X+40, Y = FIELD_Y_MIN+10 ~ FIELD_Y_MAX-10
  const PLACE_X_MIN = HERO_MIN_X;
  const PLACE_X_MAX = TOWER_X + 40;

  const handleFieldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (placements.length >= maxTurrets) return;
    const rect = fieldRef.current!.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) / rect.width * CANVAS_WIDTH;
    const rawY = (e.clientY - rect.top) / rect.height * CANVAS_HEIGHT;
    const x = Math.max(PLACE_X_MIN, Math.min(PLACE_X_MAX, rawX));
    const y = Math.max(FIELD_Y_MIN + 10, Math.min(FIELD_Y_MAX - 10, rawY));
    setPlacements(prev => [...prev, { x, y }]);
  };

  const isFull = placements.length >= maxTurrets;

  // % positions for CSS
  const xMinPct  = (PLACE_X_MIN / CANVAS_WIDTH)  * 100;
  const xMaxPct  = (PLACE_X_MAX / CANVAS_WIDTH)  * 100;
  const wallPct  = (TOWER_X    / CANVAS_WIDTH)  * 100;
  const yMinPct  = (FIELD_Y_MIN / CANVAS_HEIGHT) * 100;
  const yMaxPct  = (FIELD_Y_MAX / CANVAS_HEIGHT) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border-2 border-cyan-600 shadow-2xl shadow-cyan-900/40 w-full max-w-3xl overflow-hidden">

        {/* Header */}
        <div className="bg-cyan-900/80 px-6 py-3 border-b border-cyan-700">
          <h2 className="text-cyan-300 font-black text-lg tracking-wide">{t('game.turret.title')}</h2>
          <p className="text-gray-400 text-xs mt-0.5">
            {isFull
              ? t('game.turret.allPlaced')
              : t('game.turret.placing', { n: placements.length + 1, max: maxTurrets })}
          </p>
        </div>

        {/* Field */}
        <div className="relative px-4 pt-4 pb-2">
          <div
            ref={fieldRef}
            className="relative bg-gray-800 rounded-xl border border-gray-700 overflow-hidden select-none"
            style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`, cursor: isFull ? 'default' : 'crosshair' }}
            onClick={handleFieldClick}
          >
            {/* Sky gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />

            {/* Field playable area */}
            <div
              className="absolute bg-gray-700/30 border-t border-b border-gray-600/40"
              style={{ top: `${yMinPct}%`, height: `${yMaxPct - yMinPct}%`, left: 0, right: 0 }}
            />

            {/* Placement zone highlight */}
            <div
              className="absolute bg-cyan-500/10 border-r-2 border-dashed border-cyan-400/60"
              style={{
                top: `${yMinPct}%`,
                height: `${yMaxPct - yMinPct}%`,
                left: `${xMinPct}%`,
                width: `${xMaxPct - xMinPct}%`,
              }}
            />

            {/* Wall line */}
            <div
              className="absolute bg-orange-500/80"
              style={{
                left: `${wallPct}%`,
                top: `${yMinPct}%`,
                height: `${yMaxPct - yMinPct}%`,
                width: '3px',
              }}
            />
            <span
              className="absolute text-orange-400 text-[9px] font-bold"
              style={{ left: `${wallPct + 0.3}%`, top: `${yMinPct + 1}%` }}
            >
              {t('game.turret.wallLabel')}
            </span>

            {/* Zone label */}
            <span
              className="absolute text-cyan-400/80 text-[10px] font-bold pointer-events-none"
              style={{ left: `${xMinPct + 0.5}%`, top: `${yMinPct + 1}%` }}
            >
              {t('game.turret.zone')}
            </span>

            {/* Placed turrets */}
            {placements.map((pos, i) => (
              <div
                key={i}
                className="absolute flex items-center justify-center bg-cyan-500 border-2 border-white rounded-full text-white text-[11px] font-black shadow-lg shadow-cyan-500/50 pointer-events-none"
                style={{
                  left: `${(pos.x / CANVAS_WIDTH) * 100}%`,
                  top: `${(pos.y / CANVAS_HEIGHT) * 100}%`,
                  width: 28, height: 28,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                {i + 1}
              </div>
            ))}

            {/* Prompt text */}
            {!isFull && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ paddingLeft: `${xMaxPct}%` }}
              >
                <span className="bg-black/60 text-gray-400 text-xs px-3 py-1 rounded-lg">
                  {t('game.turret.clickPrompt')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center px-4 pb-4">
          <button
            onClick={() => setPlacements(p => p.slice(0, -1))}
            disabled={placements.length === 0}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
          >
            {t('game.turret.undo')}
          </button>
          <span className="text-sm text-gray-500">
            {t('game.turret.placed', { n: placements.length, max: maxTurrets })}
          </span>
          <button
            onClick={() => isFull && onConfirm(placements)}
            disabled={!isFull}
            className={`px-8 py-2 font-bold text-sm rounded-lg transition-all ${
              isFull
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('game.turret.start')}
          </button>
        </div>
      </div>
    </div>
  );
}
